#!/usr/bin/env node

import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key. Run with: node --env-file=.env.local scripts/build-image-fill-queue.mjs')
  process.exit(1)
}

const args = new Set(process.argv.slice(2))
const limitArg = process.argv.find(arg => arg.startsWith('--limit='))
const limit = limitArg ? Number(limitArg.split('=')[1]) : 20
const searchCommons = args.has('--search-commons')
const advance = args.has('--advance')
const lockPath = path.join('reports', 'image-fill-queue.lock')
const statePath = path.join('reports', 'image-fill-queue-state.json')
const catalogPath = path.join('reports', 'image-fill-catalog.json')
const staleLockMs = 2 * 60 * 60 * 1000
const requestedExternalRequestGapMs = Number(process.env.IMAGE_QUEUE_REQUEST_GAP_MS || 250)
const externalRequestGapMs = Number.isFinite(requestedExternalRequestGapMs) && requestedExternalRequestGapMs >= 0
  ? requestedExternalRequestGapMs
  : 250
let lastExternalRequestAt = 0

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
})

await fs.mkdir('reports', { recursive: true })

async function acquireLock() {
  try {
    const handle = await fs.open(lockPath, 'wx')
    await handle.writeFile(JSON.stringify({ pid: process.pid, started_at: new Date().toISOString() }, null, 2))
    return handle
  } catch (error) {
    if (error?.code !== 'EEXIST') throw error
    const stat = await fs.stat(lockPath).catch(() => null)
    const previousLock = await fs.readFile(lockPath, 'utf8')
      .then(value => JSON.parse(value))
      .catch(() => null)
    const previousPid = Number(previousLock?.pid)
    const previousPidIsValid = Number.isInteger(previousPid) && previousPid > 0
    let previousProcessIsRunning = false
    if (previousPidIsValid) {
      try {
        process.kill(previousPid, 0)
        previousProcessIsRunning = true
      } catch (pidError) {
        previousProcessIsRunning = pidError?.code === 'EPERM'
      }
    }
    const lockIsFresh = stat && Date.now() - stat.mtimeMs < staleLockMs
    if (previousProcessIsRunning || (!previousPidIsValid && lockIsFresh)) {
      console.log(JSON.stringify({
        skipped: true,
        reason: 'previous-image-fill-queue-run-still-active',
        lockPath,
      }, null, 2))
      process.exit(0)
    }
    await fs.unlink(lockPath).catch(() => {})
    return acquireLock()
  }
}

const lockHandle = await acquireLock()

async function releaseLock() {
  await lockHandle.close().catch(() => {})
  await fs.unlink(lockPath).catch(() => {})
}

process.on('exit', () => {
  try {
    fsSync.unlinkSync(lockPath)
  } catch {}
})

const trustedSources = new Set(['Wikimedia Commons', 'Museum Open Access', 'IIIF', 'Local Curated'])
const acceptedLicensePrefixes = ['CC0', 'Public domain', 'CC BY', 'CC BY-SA']
const rejectedLicenseFragments = ['NC', 'NonCommercial', 'NoDerivatives']
const nonImageExtensions = new Set(['.djv', '.djvu', '.epub', '.mp3', '.mp4', '.oga', '.ogg', '.pdf', '.svg', '.webm', '.zip'])
const unusableCoverFiles = new Set(['european-court-of-human-rights-1024.jpg', 'fileicon-ogg.png', 'villa_savoye.jpg'])

function acceptedLicense(license) {
  if (!license) return false
  if (rejectedLicenseFragments.some(fragment => license.includes(fragment))) return false
  return acceptedLicensePrefixes.some(prefix => {
    if (!license.startsWith(prefix)) return false
    const after = license.slice(prefix.length)
    return after === '' || after.startsWith(' ') || after.startsWith('-')
  })
}

function isDisplayableImageUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false
  const clean = value.split('?')[0].toLowerCase()
  const filename = clean.split('/').pop() || ''
  if (unusableCoverFiles.has(filename)) return false
  return !Array.from(nonImageExtensions).some(extension => clean.endsWith(extension))
}

function hasTrustedImage(image) {
  return trustedSources.has(image.source) &&
    acceptedLicense(image.license) &&
    Boolean(image.source_url) &&
    isDisplayableImageUrl(image.url_original || image.url_thumb_400)
}

function bestName(building) {
  return building.name_en || building.name_zh || building.name_ja || building.slug
}

function compactBuilding(building) {
  return {
    id: building.id,
    slug: building.slug,
    wikidata_id: building.wikidata_id,
    name_en: building.name_en,
    name_zh: building.name_zh,
    name_ja: building.name_ja,
    architect_slug: building.architect_slug,
    year_start: building.year_start,
    city: building.city,
    country: building.country,
    wikipedia_url: building.wikipedia_url,
    official_url: building.official_url,
  }
}

async function fetchAll(table, select) {
  const rows = []
  const pageSize = 1000
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase.from(table).select(select).range(from, from + pageSize - 1)
    if (error) throw new Error(`${table}: ${error.message}`)
    if (!data?.length) break
    rows.push(...data)
    if (data.length < pageSize) break
  }
  return rows
}

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'))
  } catch {
    return fallback
  }
}

function pause(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function retryDelayMs(response) {
  const retryAfterSeconds = Number(response.headers.get('retry-after'))
  return Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
    ? retryAfterSeconds * 1000
    : 2000
}

async function fetchExternal(url, options) {
  const waitMs = Math.max(0, lastExternalRequestAt + externalRequestGapMs - Date.now())
  if (waitMs > 0) await pause(waitMs)
  lastExternalRequestAt = Date.now()
  let response = await fetch(url, options)

  if (response.status === 429) {
    await pause(retryDelayMs(response))
    lastExternalRequestAt = Date.now()
    response = await fetch(url, options)
  }

  return response
}

async function getWikidataP18Filename(wikidataId) {
  if (!wikidataId || !/^Q\d+$/.test(wikidataId)) return null
  const url = `https://www.wikidata.org/wiki/Special:EntityData/${encodeURIComponent(wikidataId)}.json`
  const response = await fetchExternal(url, {
    headers: { 'User-Agent': 'ArchistoryImageQueue/1.0 (local data quality script)' },
  })
  if (!response.ok) throw new Error(`Wikidata lookup failed: HTTP ${response.status}`)
  const payload = await response.json()
  const claims = payload.entities?.[wikidataId]?.claims?.P18
  const value = claims?.[0]?.mainsnak?.datavalue?.value
  return typeof value === 'string' ? value : null
}

async function getCommonsFileInfo(filename) {
  if (!filename) return null
  const title = filename.startsWith('File:') ? filename : `File:${filename}`
  const params = new URLSearchParams({
    action: 'query',
    titles: title,
    prop: 'imageinfo',
    iiprop: 'url|extmetadata|mime',
    iiurlwidth: '400',
    format: 'json',
    origin: '*',
  })
  const response = await fetchExternal(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { 'User-Agent': 'ArchistoryImageQueue/1.0 (local data quality script)' },
  })
  if (!response.ok) throw new Error(`Commons file lookup failed: HTTP ${response.status}`)
  const payload = await response.json()
  const page = Object.values(payload.query?.pages || {})[0]
  const imageinfo = page?.imageinfo?.[0]
  if (!imageinfo) return null
  const ext = imageinfo.extmetadata || {}
  const license = ext.LicenseShortName?.value || ext.UsageTerms?.value || null
  return {
    page_title: page.title,
    url_original: imageinfo.url,
    url_thumb_400: imageinfo.thumburl || null,
    mime: imageinfo.mime || null,
    photographer: stripHtml(ext.Artist?.value || ext.Credit?.value || ''),
    source: 'Wikimedia Commons',
    license,
    license_url: ext.LicenseUrl?.value || null,
    source_url: imageinfo.descriptionurl,
    object_name: stripHtml(ext.ObjectName?.value || ''),
    description: stripHtml(ext.ImageDescription?.value || ''),
  }
}

async function searchCommonsCandidates(building, max = 3) {
  const terms = [bestName(building), building.city, building.country].filter(Boolean).join(' ')
  if (!terms.trim()) return []
  const params = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: terms,
    gsrnamespace: '6',
    gsrlimit: String(max),
    prop: 'imageinfo',
    iiprop: 'url|extmetadata|mime',
    iiurlwidth: '400',
    format: 'json',
    origin: '*',
  })
  const response = await fetchExternal(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { 'User-Agent': 'ArchistoryImageQueue/1.0 (local data quality script)' },
  })
  if (!response.ok) throw new Error(`Commons search lookup failed: HTTP ${response.status}`)
  const payload = await response.json()
  const pages = Object.values(payload.query?.pages || {})
  return pages
    .map(page => page.imageinfo?.[0] ? commonsPageToCandidate(page) : null)
    .filter(Boolean)
}

function commonsPageToCandidate(page) {
  const imageinfo = page.imageinfo[0]
  const ext = imageinfo.extmetadata || {}
  const license = ext.LicenseShortName?.value || ext.UsageTerms?.value || null
  return {
    page_title: page.title,
    url_original: imageinfo.url,
    url_thumb_400: imageinfo.thumburl || null,
    mime: imageinfo.mime || null,
    photographer: stripHtml(ext.Artist?.value || ext.Credit?.value || ''),
    source: 'Wikimedia Commons',
    license,
    license_url: ext.LicenseUrl?.value || null,
    source_url: imageinfo.descriptionurl,
    object_name: stripHtml(ext.ObjectName?.value || ''),
    description: stripHtml(ext.ImageDescription?.value || ''),
  }
}

function stripHtml(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function candidatePolicyState(candidate) {
  if (!candidate) return { ok: false, reason: 'missing-candidate' }
  if (!candidate.source_url) return { ok: false, reason: 'missing-source-url' }
  if (candidate.mime && !candidate.mime.startsWith('image/')) return { ok: false, reason: 'not-image-mime' }
  if (!isDisplayableImageUrl(candidate.url_original)) return { ok: false, reason: 'not-displayable-image' }
  if (!acceptedLicense(candidate.license)) return { ok: false, reason: 'unsupported-license' }
  return { ok: true, reason: 'accepted-open-license' }
}

function toSafeCandidate(building, candidate, discovery) {
  return {
    building: compactBuilding(building),
    discovery,
    confidence: discovery === 'wikidata-p18' ? 'safe_auto_candidate' : 'needs_review',
    candidate,
    proposed_insert: {
      building_id: building.id,
      url_original: candidate.url_original,
      url_thumb_400: candidate.url_thumb_400,
      photographer: candidate.photographer || null,
      source: 'Wikimedia Commons',
      license: candidate.license,
      source_url: candidate.source_url,
      img_type: 'exterior',
      is_primary: true,
    },
    required_attribution: {
      photographer: candidate.photographer || null,
      license: candidate.license,
      license_url: candidate.license_url,
      source_url: candidate.source_url,
    },
  }
}

const [buildings, images] = await Promise.all([
  fetchAll('buildings', 'id,slug,wikidata_id,name_en,name_zh,name_ja,architect_slug,year_start,city,country,wikipedia_url,official_url'),
  fetchAll('images', 'id,building_id,url_original,url_thumb_400,source,license,source_url,is_primary'),
])

const [manualOverrides, localOverrides] = await Promise.all([
  readJson('src/lib/image-overrides.json', {}),
  readJson('src/lib/local-image-overrides.json', {}),
])

const imagesByBuilding = new Map()
for (const image of images) {
  if (!imagesByBuilding.has(image.building_id)) imagesByBuilding.set(image.building_id, [])
  imagesByBuilding.get(image.building_id).push(image)
}

const missing = []
for (const building of buildings) {
  const override = localOverrides[building.slug] || manualOverrides[building.slug]
  const hasOverride = isDisplayableImageUrl(override?.cover_url)
  const relatedImages = imagesByBuilding.get(building.id) || []
  const trustedImages = relatedImages.filter(hasTrustedImage)
  if (hasOverride || trustedImages.length > 0) continue
  missing.push({
    building,
    existing_images: relatedImages.map(image => ({
      id: image.id,
      source: image.source,
      license: image.license,
      source_url: image.source_url,
      is_primary: image.is_primary,
      displayable: isDisplayableImageUrl(image.url_original || image.url_thumb_400),
      policy_ok: hasTrustedImage(image),
    })),
  })
}

missing.sort((a, b) => a.building.slug.localeCompare(b.building.slug))

const effectiveLimit = Number.isFinite(limit) && limit > 0 ? limit : 20
const previousState = advance ? await readJson(statePath, {}) : {}
let processedSlugs = new Set(Array.isArray(previousState.processed_slugs) ? previousState.processed_slugs : [])
let cycleStartedAt = previousState.cycle_started_at || new Date().toISOString()
let completedCycles = Number(previousState.completed_cycles || 0)
let cycleReset = false
let availableInCycle = advance
  ? missing.filter(item => !processedSlugs.has(item.building.slug))
  : missing

if (advance && availableInCycle.length === 0 && missing.length > 0) {
  processedSlugs = new Set()
  availableInCycle = missing
  cycleStartedAt = new Date().toISOString()
  completedCycles += 1
  cycleReset = true
}

const targetMissing = availableInCycle.slice(0, effectiveLimit)
const safeAutoCandidates = []
const needsReview = []
const noSafeImageYet = []

for (const item of targetMissing) {
  const { building } = item
  let wikidataCandidate = null
  let p18Filename = null
  try {
    p18Filename = await getWikidataP18Filename(building.wikidata_id)
    wikidataCandidate = await getCommonsFileInfo(p18Filename)
  } catch (error) {
    needsReview.push({
      building: compactBuilding(building),
      discovery: 'wikidata-p18',
      reason: 'lookup-error',
      error: error instanceof Error ? error.message : String(error),
      existing_images: item.existing_images,
    })
    continue
  }

  const wikidataPolicy = candidatePolicyState(wikidataCandidate)
  if (wikidataPolicy.ok) {
    safeAutoCandidates.push(toSafeCandidate(building, wikidataCandidate, 'wikidata-p18'))
    continue
  }

  const reviewItem = {
    building: compactBuilding(building),
    discovery: 'wikidata-p18',
    reason: wikidataPolicy.reason,
    wikidata_p18_filename: p18Filename,
    candidate: wikidataCandidate,
    existing_images: item.existing_images,
  }

  if (searchCommons) {
    let searchCandidates = []
    try {
      searchCandidates = await searchCommonsCandidates(building)
    } catch (error) {
      needsReview.push({
        ...reviewItem,
        reason: 'commons-search-lookup-error',
        error: error instanceof Error ? error.message : String(error),
      })
      continue
    }
    const acceptedSearchCandidates = searchCandidates
      .map(candidate => ({ candidate, policy: candidatePolicyState(candidate) }))
      .filter(item => item.policy.ok)
      .map(item => toSafeCandidate(building, item.candidate, 'commons-search'))

    if (acceptedSearchCandidates.length > 0) {
      needsReview.push({
        ...reviewItem,
        reason: 'search-candidates-need-human-entity-check',
        search_candidates: acceptedSearchCandidates,
      })
      continue
    }
  }

  noSafeImageYet.push(reviewItem)
}

const report = {
  generated_at: new Date().toISOString(),
  mode: {
    writes_database: false,
    searches_commons: searchCommons,
    advances_between_runs: advance,
    processed_missing_limit: targetMissing.length,
  },
  cycle: advance ? {
    started_at: cycleStartedAt,
    reset_this_run: cycleReset,
    completed_cycles: completedCycles,
    processed_before_run: processedSlugs.size,
    remaining_after_run: Math.max(0, availableInCycle.length - targetMissing.length),
  } : null,
  policy: {
    trusted_sources: [...trustedSources],
    accepted_license_prefixes: acceptedLicensePrefixes,
    rejected_license_fragments: rejectedLicenseFragments,
    safe_auto_rule: 'Only Wikidata P18 images with accepted Wikimedia Commons license metadata enter safe_auto_candidates. Commons text-search matches remain needs_review.',
  },
  totals: {
    buildings: buildings.length,
    images: images.length,
    buildings_missing_policy_safe_image: missing.length,
    processed_missing: targetMissing.length,
    safe_auto_candidates: safeAutoCandidates.length,
    needs_review: needsReview.length,
    no_safe_image_yet: noSafeImageYet.length,
  },
  safe_auto_candidates: safeAutoCandidates,
  needs_review: needsReview,
  no_safe_image_yet: noSafeImageYet,
  remaining_missing_after_limit: availableInCycle.slice(targetMissing.length).map(item => compactBuilding(item.building)),
}

await fs.writeFile('reports/image-fill-queue.json', `${JSON.stringify(report, null, 2)}\n`)

const previousCatalog = await readJson(catalogPath, { items: [] })
const catalogByBuilding = new Map(
  (Array.isArray(previousCatalog.items) ? previousCatalog.items : []).map(item => [item.building?.id, item])
)
const missingBuildingIds = new Set(missing.map(item => item.building.id))

for (const [buildingId, item] of catalogByBuilding) {
  if (buildingId && !missingBuildingIds.has(buildingId)) {
    catalogByBuilding.set(buildingId, {
      ...item,
      status: 'resolved_or_no_longer_missing',
      last_checked_at: report.generated_at,
    })
  }
}

function updateCatalog(status, item) {
  const previous = catalogByBuilding.get(item.building.id)
  const preserveSafeCandidate = previous?.status === 'safe_auto_candidate' &&
    status === 'needs_review' &&
    item.reason === 'lookup-error'
  catalogByBuilding.set(item.building.id, {
    ...(preserveSafeCandidate ? previous : item),
    status: preserveSafeCandidate ? previous.status : status,
    first_seen_at: previous?.first_seen_at || report.generated_at,
    last_checked_at: report.generated_at,
    ...(preserveSafeCandidate ? { last_lookup_error: item.error || 'lookup-error' } : {}),
  })
}

for (const item of safeAutoCandidates) updateCatalog('safe_auto_candidate', item)
for (const item of needsReview) updateCatalog('needs_review', item)
for (const item of noSafeImageYet) updateCatalog('no_safe_image_yet', item)

const catalogItems = [...catalogByBuilding.values()].sort((a, b) => a.building.slug.localeCompare(b.building.slug))
const catalogStatusCounts = catalogItems.reduce((counts, item) => {
  counts[item.status] = (counts[item.status] || 0) + 1
  return counts
}, {})
const catalog = {
  updated_at: report.generated_at,
  writes_database: false,
  status_counts: catalogStatusCounts,
  items: catalogItems,
}
await fs.writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`)

if (advance) {
  for (const item of targetMissing) processedSlugs.add(item.building.slug)
  const state = {
    updated_at: report.generated_at,
    cycle_started_at: cycleStartedAt,
    completed_cycles: completedCycles,
    processed_slugs: [...processedSlugs].sort(),
    remaining_in_cycle: Math.max(0, availableInCycle.length - targetMissing.length),
  }
  await fs.writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`)
}

const md = [
  '# Image Fill Queue',
  '',
  `Generated: ${report.generated_at}`,
  '',
  '## Summary',
  '',
  `- Buildings: ${report.totals.buildings}`,
  `- Images: ${report.totals.images}`,
  `- Buildings missing policy-safe image: ${report.totals.buildings_missing_policy_safe_image}`,
  `- Processed this run: ${report.totals.processed_missing}`,
  `- Safe auto candidates: ${report.totals.safe_auto_candidates}`,
  `- Needs review: ${report.totals.needs_review}`,
  `- No safe image yet: ${report.totals.no_safe_image_yet}`,
  '',
  '## Policy',
  '',
  '- This script is read-only and does not write database rows.',
  '- Safe auto candidates must come from Wikidata P18 and pass Wikimedia Commons license metadata checks.',
  '- Commons keyword-search candidates, when enabled, are never auto-safe because entity accuracy still needs review.',
  '- Rejected license fragments: NC, NonCommercial, NoDerivatives.',
  '',
  '## Safe Auto Candidates',
  '',
  ...safeAutoCandidates.slice(0, 25).flatMap(item => [
    `- ${item.building.slug} — ${bestName(item.building)} (${item.candidate.license})`,
    `  - Source: ${item.candidate.source_url}`,
  ]),
  safeAutoCandidates.length === 0 ? '- None in this run.' : '',
  '',
  '## Needs Review',
  '',
  ...needsReview.slice(0, 25).map(item => `- ${item.building.slug} — ${bestName(item.building)}: ${item.reason}`),
  needsReview.length === 0 ? '- None in this run.' : '',
  '',
  '## No Safe Image Yet',
  '',
  ...noSafeImageYet.slice(0, 25).map(item => `- ${item.building.slug} — ${bestName(item.building)}: ${item.reason}`),
  noSafeImageYet.length === 0 ? '- None in this run.' : '',
  '',
].join('\n')

await fs.writeFile('reports/image-fill-queue.md', md)
await releaseLock()

console.log(JSON.stringify(report.totals, null, 2))
console.log('Wrote reports/image-fill-queue.json')
console.log('Wrote reports/image-fill-queue.md')
console.log('Updated reports/image-fill-catalog.json')
if (advance) console.log('Updated reports/image-fill-queue-state.json')
