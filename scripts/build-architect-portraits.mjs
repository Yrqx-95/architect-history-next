import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs/promises'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Run with: node --env-file=.env.local scripts/build-architect-portraits.mjs')
  process.exit(1)
}

const supabase = createClient(url, key)
const outPath = 'src/lib/architect-image-overrides.json'
const reportPath = 'db/architect-portrait-report.json'

const acceptedLicense = license => {
  if (!license) return false
  const text = String(license).toLowerCase()
  return (
    text.includes('public domain') ||
    text.includes('cc0') ||
    text.includes('cc-by') ||
    text.includes('cc by') ||
    text.includes('cc-by-sa') ||
    text.includes('cc by-sa')
  ) && !text.includes('noncommercial') && !text.includes('non-commercial') && !text.includes('by-nc')
}

async function fetchAll(table, select = '*') {
  const out = []
  let from = 0
  const pageSize = 500
  while (true) {
    const { data, error } = await supabase.from(table).select(select).range(from, from + pageSize - 1)
    if (error) throw new Error(`${table}: ${error.message}`)
    if (!data?.length) break
    out.push(...data)
    if (data.length < pageSize) break
    from += pageSize
  }
  return out
}

async function getJson(apiUrl) {
  const response = await fetch(apiUrl, {
    headers: {
      'User-Agent': 'Archistory content coverage audit/1.0 (https://archistory.app)',
    },
  })
  if (!response.ok) throw new Error(`${response.status} ${apiUrl}`)
  return response.json()
}

async function searchWikidata(name) {
  const searchUrl = new URL('https://www.wikidata.org/w/api.php')
  searchUrl.searchParams.set('action', 'wbsearchentities')
  searchUrl.searchParams.set('format', 'json')
  searchUrl.searchParams.set('language', 'en')
  searchUrl.searchParams.set('limit', '5')
  searchUrl.searchParams.set('search', name)
  const data = await getJson(searchUrl)
  const candidates = data.search || []
  return candidates.find(item => /architect|architecture|architectural|designer/i.test(`${item.label || ''} ${item.description || ''}`)) || null
}

async function getEntity(id) {
  const entityUrl = new URL('https://www.wikidata.org/w/api.php')
  entityUrl.searchParams.set('action', 'wbgetentities')
  entityUrl.searchParams.set('format', 'json')
  entityUrl.searchParams.set('ids', id)
  entityUrl.searchParams.set('props', 'labels|descriptions|claims')
  entityUrl.searchParams.set('languages', 'en|zh|ja')
  const data = await getJson(entityUrl)
  return data.entities?.[id] || null
}

function imageNameFromEntity(entity) {
  return entity?.claims?.P18?.[0]?.mainsnak?.datavalue?.value || ''
}

async function getCommonsInfo(filename) {
  const commonsUrl = new URL('https://commons.wikimedia.org/w/api.php')
  commonsUrl.searchParams.set('action', 'query')
  commonsUrl.searchParams.set('format', 'json')
  commonsUrl.searchParams.set('titles', `File:${filename}`)
  commonsUrl.searchParams.set('prop', 'imageinfo')
  commonsUrl.searchParams.set('iiprop', 'url|extmetadata')
  const data = await getJson(commonsUrl)
  const page = Object.values(data.query?.pages || {})[0]
  return page?.imageinfo?.[0] || null
}

function cleanMeta(value) {
  if (!value) return ''
  return String(value)
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function commonsFilePage(filename) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename).replaceAll('%20', '_')}`
}

const architects = await fetchAll('architects', 'slug,name_en,name_zh,name_ja,wikidata_id')
let existing = {}
try {
  existing = JSON.parse(await fs.readFile(outPath, 'utf8'))
} catch {}

const overrides = { ...existing }
const report = []

for (const architect of architects) {
  if (overrides[architect.slug]?.url) {
    report.push({ slug: architect.slug, status: 'kept-existing' })
    continue
  }

  try {
    const candidate = architect.wikidata_id
      ? { id: architect.wikidata_id }
      : await searchWikidata(architect.name_en)

    if (!candidate?.id) {
      report.push({ slug: architect.slug, name: architect.name_en, status: 'no-wikidata-match' })
      continue
    }

    const entity = await getEntity(candidate.id)
    const filename = imageNameFromEntity(entity)
    if (!filename || /\.svg$/i.test(filename)) {
      report.push({ slug: architect.slug, name: architect.name_en, wikidata: candidate.id, status: 'no-p18-image' })
      continue
    }

    const info = await getCommonsInfo(filename)
    const license = cleanMeta(info?.extmetadata?.LicenseShortName?.value || info?.extmetadata?.UsageTerms?.value)
    if (!info?.url || !acceptedLicense(license)) {
      report.push({ slug: architect.slug, name: architect.name_en, wikidata: candidate.id, status: 'unsupported-license', license })
      continue
    }

    const author = cleanMeta(info.extmetadata?.Artist?.value || info.extmetadata?.Credit?.value || 'Wikimedia Commons')
    overrides[architect.slug] = {
      url: info.url,
      author: author || 'Wikimedia Commons',
      license,
      source_url: commonsFilePage(filename),
      wikidata_id: candidate.id,
      alt: {
        zh: `${architect.name_zh || architect.name_en}肖像`,
        ja: `${architect.name_ja || architect.name_en}の肖像`,
        en: `Portrait of ${architect.name_en}`,
      },
    }
    report.push({ slug: architect.slug, name: architect.name_en, wikidata: candidate.id, status: 'added', file: filename, license })
  } catch (error) {
    report.push({ slug: architect.slug, name: architect.name_en, status: 'error', error: error.message })
  }

  await new Promise(resolve => setTimeout(resolve, 80))
}

await fs.writeFile(outPath, `${JSON.stringify(overrides, null, 2)}\n`)
await fs.mkdir('db', { recursive: true })
await fs.writeFile(reportPath, `${JSON.stringify({
  generated_at: new Date().toISOString(),
  total_architects: architects.length,
  overrides: Object.keys(overrides).length,
  added: report.filter(item => item.status === 'added').length,
  skipped: report.filter(item => !['added', 'kept-existing'].includes(item.status)).length,
  report,
}, null, 2)}\n`)

console.log(JSON.stringify({
  total_architects: architects.length,
  overrides: Object.keys(overrides).length,
  added: report.filter(item => item.status === 'added').length,
  kept: report.filter(item => item.status === 'kept-existing').length,
  skipped: report.filter(item => !['added', 'kept-existing'].includes(item.status)).length,
}, null, 2))
