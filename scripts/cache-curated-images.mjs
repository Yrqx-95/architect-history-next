#!/usr/bin/env node

/**
 * Wikimedia 限速操作经验 (2026-05-25):
 *   delay=4000 + 批量8 → 第3-4个请求开始 429
 *   delay=6000           → ~50% 概率 429
 *   delay=8000 + 批量2   → 基本稳定，偶发 429
 *   delay=10000 + 批量2  → 稳定，推荐日常使用
 *   429 错误码 0fa5166 = 普通限速，增加 delay 可恢复
 *   429 错误码 0c640b1 = 文件级持久限制，需更换文件或等待数小时
 *   Wikimedia API 搜索每 4-5 次后需 sleep 3-5s
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import registry from '../db/image-registry.generated.json' with { type: 'json' }
import manualOverrides from '../src/lib/image-overrides.json' with { type: 'json' }

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const limitArg = Number(process.argv.find(arg => arg.startsWith('--limit='))?.split('=')[1] || 36)
const widthArg = Number(process.argv.find(arg => arg.startsWith('--width='))?.split('=')[1] || 1600)
const delayArg = Number(process.argv.find(arg => arg.startsWith('--delay='))?.split('=')[1] || 1800)
const slugsArg = process.argv.find(arg => arg.startsWith('--slugs='))?.split('=')[1]
const requestedSlugs = slugsArg ? new Set(slugsArg.split(',').map(slug => slug.trim()).filter(Boolean)) : null

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Run with: node --env-file=.env.local scripts/cache-curated-images.mjs')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const publicDir = 'public/images/curated'
const overridePath = 'src/lib/local-image-overrides.json'

function extensionFromContentType(contentType) {
  if (contentType?.includes('png')) return 'png'
  if (contentType?.includes('webp')) return 'webp'
  return 'jpg'
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function fileNameFromSource(sourceUrl) {
  if (!sourceUrl) return null
  const decoded = decodeURIComponent(sourceUrl)
  if (decoded.includes('/wiki/File:')) return decoded.split('/wiki/File:')[1]
  return null
}

function toWikimediaDownload(url, sourceUrl, width) {
  const parsed = new URL(url)
  if (parsed.hostname !== 'upload.wikimedia.org') return url
  const marker = '/wikipedia/commons/'
  if (!parsed.pathname.startsWith(marker)) return url
  const rest = parsed.pathname.slice(marker.length)
  const parts = rest.split('/')
  if (parts.length < 3) return url
  const filename = parts[parts.length - 1]
  const fileFromSource = fileNameFromSource(sourceUrl) || decodeURIComponent(filename)
  return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileFromSource)}?width=${width}`
}

function safeName(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function isMachineSlug(slug) {
  return /^q\d+$/i.test(slug)
}

async function fetchBuildingsBySlug(slugs) {
  const result = new Map()
  for (let i = 0; i < slugs.length; i += 200) {
    const chunk = slugs.slice(i, i + 200)
    const { data, error } = await supabase
      .from('buildings')
      .select('slug,year_start')
      .in('slug', chunk)
    if (error) throw new Error(error.message)
    for (const row of data || []) result.set(row.slug, row)
  }
  return result
}

async function download(record) {
  const originalUrl = record.cover_url || record.url_original
  const candidates = [
    toWikimediaDownload(originalUrl, record.cover_source_url, widthArg),
    originalUrl,
  ]

  let response
  let downloadUrl
  let lastError
  for (const candidate of candidates) {
    downloadUrl = candidate
    response = await fetch(candidate, {
      headers: {
        'User-Agent': 'ArchitectHistoryNextImageCache/1.0 (local editorial curation; contact: local)',
      },
    })
    if (response.ok) break
    lastError = `${response.status} ${response.statusText}`
    if (response.status === 429) break
  }

  if (!response?.ok) {
    throw new Error(lastError || 'download failed')
  }

  const contentType = response.headers.get('content-type') || ''
  if (!contentType.startsWith('image/')) {
    throw new Error(`unexpected content-type ${contentType}`)
  }
  const ext = extensionFromContentType(contentType)
  const filename = `${safeName(record.building_slug)}-${widthArg}.${ext}`
  const diskPath = path.join(publicDir, filename)
  const bytes = Buffer.from(await response.arrayBuffer())
  await fs.writeFile(diskPath, bytes)

  return {
    publicPath: `/images/curated/${filename}`,
    bytes: bytes.length,
    downloadUrl,
  }
}

await fs.mkdir(publicDir, { recursive: true })

let existingOverrides = {}
try {
  existingOverrides = JSON.parse(await fs.readFile(overridePath, 'utf8'))
} catch {
  existingOverrides = {}
}

const primaryRecords = registry.images
  .filter(record => record.is_primary)
  .filter(record => !isMachineSlug(record.building_slug))
  .map(record => ({
    building_slug: record.building_slug,
    url_original: record.url_original,
    cover_url: record.url_original,
    cover_photographer: record.photographer,
    cover_license: record.license,
    cover_source_url: record.source_url,
  }))

const manualRecords = Object.entries(manualOverrides).map(([slug, record]) => ({
  building_slug: slug,
  ...record,
  url_original: record.cover_url,
}))

const bySlug = new Map()
for (const record of primaryRecords) {
  if (!bySlug.has(record.building_slug)) bySlug.set(record.building_slug, record)
}
for (const record of manualRecords) {
  bySlug.set(record.building_slug, record)
}

const years = await fetchBuildingsBySlug([...bySlug.keys()])
let selected = [...bySlug.values()]
  .sort((a, b) => (years.get(b.building_slug)?.year_start || 0) - (years.get(a.building_slug)?.year_start || 0))

if (requestedSlugs) {
  selected = selected.filter(record => requestedSlugs.has(record.building_slug))
} else {
  selected = selected.slice(0, limitArg)
}

const nextOverrides = { ...existingOverrides }
const report = []

for (const record of selected) {
  if (nextOverrides[record.building_slug]?.cover_url?.startsWith('/images/curated/')) {
    report.push({ slug: record.building_slug, status: 'already-cached' })
    continue
  }

  try {
    const cached = await download(record)
    nextOverrides[record.building_slug] = {
      cover_url: cached.publicPath,
      cover_photographer: record.cover_photographer || null,
      cover_license: record.cover_license || null,
      cover_source_url: record.cover_source_url || null,
    }
    report.push({ slug: record.building_slug, status: 'cached', bytes: cached.bytes, source: cached.downloadUrl })
  } catch (error) {
    report.push({ slug: record.building_slug, status: 'failed', error: error.message })
  }
  await sleep(delayArg)
}

await fs.writeFile(overridePath, `${JSON.stringify(nextOverrides, null, 2)}\n`)
await fs.writeFile('db/image-cache-report.json', `${JSON.stringify({
  generated_at: new Date().toISOString(),
  requested: selected.length,
  cached: report.filter(item => item.status === 'cached').length,
  alreadyCached: report.filter(item => item.status === 'already-cached').length,
  failed: report.filter(item => item.status === 'failed').length,
  report,
}, null, 2)}\n`)
console.log(JSON.stringify({
  requested: selected.length,
  cached: report.filter(item => item.status === 'cached').length,
  alreadyCached: report.filter(item => item.status === 'already-cached').length,
  failed: report.filter(item => item.status === 'failed').length,
  report,
}, null, 2))
