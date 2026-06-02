import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@supabase/supabase-js'
import architectPortraits from '../src/lib/architect-image-overrides.json' with { type: 'json' }
import localImageOverrides from '../src/lib/local-image-overrides.json' with { type: 'json' }
import imageOverrides from '../src/lib/image-overrides.json' with { type: 'json' }

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)

async function fetchAll(table, select = '*') {
  const rows = []
  let from = 0
  const size = 1000
  while (true) {
    const { data, error } = await supabase.from(table).select(select).range(from, from + size - 1)
    if (error) throw new Error(`${table}: ${error.message}`)
    if (!data?.length) break
    rows.push(...data)
    if (data.length < size) break
    from += size
  }
  return rows
}

function hasTextRecord(record) {
  return Boolean(
    record?.bio_zh ||
    record?.bio_ja ||
    record?.bio_en ||
    record?.description ||
    record?.significance ||
    record?.spatial_feat ||
    record?.light_feat ||
    record?.circulation
  )
}

const [architects, buildings, images] = await Promise.all([
  fetchAll('architects', 'slug,name_en,name_zh,name_ja,bio_zh,bio_ja,bio_en'),
  fetchAll('buildings', 'id,slug,name_en,name_zh,name_ja,architect_slug,description,significance,spatial_feat,light_feat,circulation'),
  fetchAll('images', 'building_id,url_original,is_primary'),
])

const imagesByBuilding = new Map()
for (const image of images) {
  if (!image.url_original) continue
  if (!imagesByBuilding.has(image.building_id)) imagesByBuilding.set(image.building_id, [])
  imagesByBuilding.get(image.building_id).push(image)
}

const buildingsByArchitect = new Map()
for (const building of buildings) {
  if (!building.architect_slug) continue
  if (!buildingsByArchitect.has(building.architect_slug)) buildingsByArchitect.set(building.architect_slug, [])
  buildingsByArchitect.get(building.architect_slug).push(building)
}

const imageOverrideBySlug = {
  ...imageOverrides,
  ...localImageOverrides,
}

const buildingsMissingImage = buildings.filter(building =>
  !imageOverrideBySlug[building.slug]?.cover_url && !imagesByBuilding.has(building.id)
)
const buildingsMissingSourceText = buildings.filter(building => !hasTextRecord(building))

const architectsMissingSourceText = architects.filter(architect => !hasTextRecord(architect))
const architectsMissingDisplayImage = architects.filter(architect => {
  if (architectPortraits[architect.slug]?.url) return false
  const works = buildingsByArchitect.get(architect.slug) || []
  return !works.some(work => imageOverrideBySlug[work.slug]?.cover_url || imagesByBuilding.has(work.id))
})

const report = {
  generated_at: new Date().toISOString(),
  totals: {
    architects: architects.length,
    buildings: buildings.length,
    images: images.length,
  },
  displayCoverage: {
    architectTextCoveredByFallback: architects.length,
    buildingTextCoveredByFallback: buildings.length,
    buildingsMissingAnyImage: buildingsMissingImage.length,
    architectsMissingPortraitOrRepresentativeWorkImage: architectsMissingDisplayImage.length,
  },
  sourceCoverage: {
    architectPortraitOverrides: Object.keys(architectPortraits).length,
    architectsMissingSourceBio: architectsMissingSourceText.length,
    buildingsMissingSourceText: buildingsMissingSourceText.length,
  },
  gaps: {
    buildingsMissingAnyImage: buildingsMissingImage.map(building => ({
      slug: building.slug,
      name: building.name_en || building.name_zh || building.name_ja,
    })),
    architectsMissingPortraitOrRepresentativeWorkImage: architectsMissingDisplayImage.map(architect => ({
      slug: architect.slug,
      name: architect.name_en || architect.name_zh || architect.name_ja,
    })),
  },
}

const output = path.join(root, 'db/display-coverage-report.json')
fs.writeFileSync(output, JSON.stringify(report, null, 2))
console.log(JSON.stringify(report.displayCoverage, null, 2))
console.log(`Wrote ${output}`)
