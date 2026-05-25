#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Run with: node --env-file=.env.local scripts/build-image-registry.mjs')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const outPath = process.argv[2] || 'db/image-registry.generated.json'

const trustedSources = new Set(['Wikimedia Commons', 'Museum Open Access', 'IIIF', 'Local Curated'])
const acceptedLicenses = ['CC0', 'Public domain', 'CC BY', 'CC BY-SA']

function acceptedLicense(license) {
  return Boolean(license && acceptedLicenses.some(prefix => license.startsWith(prefix)))
}

async function fetchAll(table, select) {
  const rows = []
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase.from(table).select(select).range(from, from + 999)
    if (error) throw new Error(`${table}: ${error.message}`)
    if (!data?.length) break
    rows.push(...data)
    if (data.length < 1000) break
  }
  return rows
}

const [images, buildings] = await Promise.all([
  fetchAll('images', 'id,building_id,url_original,url_thumb_400,photographer,source,license,source_url,img_type,is_primary'),
  fetchAll('buildings', 'id,slug,name_en,name_zh,name_ja,year_start,city,country,architect_slug'),
])

const buildingById = new Map(buildings.map(building => [building.id, building]))

const records = images
  .filter(image => trustedSources.has(image.source))
  .filter(image => acceptedLicense(image.license))
  .filter(image => image.source_url && image.url_original)
  .map(image => {
    const building = buildingById.get(image.building_id)
    return building ? {
      id: image.id,
      building_id: image.building_id,
      building_slug: building.slug,
      building_name_en: building.name_en,
      architect_slug: building.architect_slug,
      role: image.is_primary ? 'primary' : image.img_type || 'supporting',
      url_original: image.url_original,
      url_thumb_400: image.url_thumb_400,
      photographer: image.photographer,
      source: image.source,
      license: image.license,
      source_url: image.source_url,
      is_primary: image.is_primary,
      storage_status: 'external-verified-metadata',
    } : null
  })
  .filter(Boolean)
  .sort((a, b) => {
    if (a.building_slug !== b.building_slug) return a.building_slug.localeCompare(b.building_slug)
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1
    return a.role.localeCompare(b.role)
  })

const registry = {
  generated_at: new Date().toISOString(),
  policy: {
    trusted_sources: [...trustedSources],
    accepted_license_prefixes: acceptedLicenses,
    note: 'This registry includes images with traceable source URLs and accepted open licenses. It does not prove local caching has happened yet.',
  },
  counts: {
    images: records.length,
    buildings: new Set(records.map(record => record.building_slug)).size,
    primary_images: records.filter(record => record.is_primary).length,
  },
  images: records,
}

await fs.mkdir(path.dirname(outPath), { recursive: true })
await fs.writeFile(outPath, `${JSON.stringify(registry, null, 2)}\n`)

console.log(JSON.stringify(registry.counts, null, 2))
console.log(`Wrote ${outPath}`)
