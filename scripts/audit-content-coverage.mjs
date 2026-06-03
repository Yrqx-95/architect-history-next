import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs/promises'
import { buildingContentOverlays } from '../src/lib/building-content.ts'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Run with: node --env-file=.env.local scripts/audit-content-coverage.mjs')
  process.exit(1)
}

const supabase = createClient(url, key)

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

function hasRecordText(value, lang) {
  if (!value || typeof value !== 'object') return false
  const text = value[lang]
  return typeof text === 'string' && text.trim().length >= 60
}

function hasText(value, min = 60) {
  return typeof value === 'string' && value.trim().length >= min
}

function imageKey(image) {
  return image.url_original || image.url_thumb_400 || ''
}

function isDisplayableImage(image) {
  const url = imageKey(image)
  if (!url) return false
  const clean = url.split('?')[0].toLowerCase()
  if (clean.endsWith('.svg')) return false
  if (clean.includes('villa_savoye.jpg') || clean.includes('villasavoye_floorplan.svg')) return false
  return true
}

const [architects, buildings, images] = await Promise.all([
  fetchAll('architects', 'id,slug,wikidata_id,name_en,name_zh,name_ja,bio_zh,bio_ja,bio_en,wikipedia_url,official_url'),
  fetchAll('buildings', 'id,slug,wikidata_id,name_en,name_zh,name_ja,description,significance,spatial_feat,light_feat,circulation,wikipedia_url,official_url'),
  fetchAll('images', 'id,building_id,url_original,url_thumb_400,license,source,source_url,is_primary'),
])

let localOverrides = {}
try {
  localOverrides = JSON.parse(await fs.readFile('src/lib/local-image-overrides.json', 'utf8'))
} catch {}

let manualOverrides = {}
try {
  manualOverrides = JSON.parse(await fs.readFile('src/lib/image-overrides.json', 'utf8'))
} catch {}

const imagesByBuilding = new Map()
for (const image of images) {
  if (!imagesByBuilding.has(image.building_id)) imagesByBuilding.set(image.building_id, [])
  imagesByBuilding.get(image.building_id).push(image)
}

const architectGaps = architects.map(architect => ({
  slug: architect.slug,
  wikidata_id: architect.wikidata_id,
  name_en: architect.name_en,
  missing: {
    zh: !hasText(architect.bio_zh),
    ja: !hasText(architect.bio_ja),
    en: !hasText(architect.bio_en),
    source: !architect.wikipedia_url && !architect.official_url && !architect.wikidata_id,
  },
})).filter(item => Object.values(item.missing).some(Boolean))

const buildingContentOverlaySlugs = Object.keys(buildingContentOverlays).sort()
const buildingContentOverlaySet = new Set(buildingContentOverlaySlugs)

const buildingGaps = buildings.map(building => {
  const relatedImages = (imagesByBuilding.get(building.id) || []).filter(isDisplayableImage)
  const hasOverride = Boolean(localOverrides[building.slug]?.cover_url || manualOverrides[building.slug]?.cover_url)
  const hasFormalOverlay = buildingContentOverlaySet.has(building.slug)
  return {
    slug: building.slug,
    wikidata_id: building.wikidata_id,
    name_en: building.name_en,
    missing: {
      zh: !hasFormalOverlay && !hasRecordText(building.description, 'zh'),
      ja: !hasFormalOverlay && !hasRecordText(building.description, 'ja'),
      en: !hasRecordText(building.description, 'en'),
      image: !hasOverride && relatedImages.length === 0,
      source: !hasFormalOverlay && !building.wikipedia_url && !building.official_url && !building.wikidata_id,
    },
  }
}).filter(item => Object.values(item.missing).some(Boolean))

const summary = {
  generated_at: new Date().toISOString(),
  totals: {
    architects: architects.length,
    buildings: buildings.length,
    images: images.length,
  },
  architect_gaps: {
    any: architectGaps.length,
    zh: architectGaps.filter(item => item.missing.zh).length,
    ja: architectGaps.filter(item => item.missing.ja).length,
    en: architectGaps.filter(item => item.missing.en).length,
    source: architectGaps.filter(item => item.missing.source).length,
  },
  building_gaps: {
    any: buildingGaps.length,
    zh: buildingGaps.filter(item => item.missing.zh).length,
    ja: buildingGaps.filter(item => item.missing.ja).length,
    en: buildingGaps.filter(item => item.missing.en).length,
    image: buildingGaps.filter(item => item.missing.image).length,
    source: buildingGaps.filter(item => item.missing.source).length,
    formal_overlay: buildingContentOverlaySlugs.length,
  },
  building_content_overlays: buildingContentOverlaySlugs,
  samples: {
    architect_gaps: architectGaps.slice(0, 30),
    building_gaps: buildingGaps.slice(0, 50),
  },
}

await fs.mkdir('db', { recursive: true })
await fs.writeFile('db/content-coverage-report.json', `${JSON.stringify({
  ...summary,
  architect_gaps: architectGaps,
  building_gaps: buildingGaps,
}, null, 2)}\n`)

console.log(JSON.stringify(summary, null, 2))
