import { createClient } from './supabase'
import type {
  Architect, Building, BuildingWithCover, BuildingImage,
  Era, Style, BuildingType,
} from './types'
import { isMinimallyComplete, isWikidataId } from './quality'
import { isTrustedEditorialImage } from './image-policy'
import imageOverrides from './image-overrides.json'
import localImageOverrides from './local-image-overrides.json'

type ImageOverride = {
  cover_url?: string
  cover_photographer?: string | null
  cover_license?: string | null
  cover_source_url?: string | null
}

const curatedImageOverrides = imageOverrides as Record<string, ImageOverride>
const cachedImageOverrides = localImageOverrides as Record<string, ImageOverride>

// Simple in-memory cache for the request lifecycle
const cache = new Map<string, { data: unknown; ts: number }>()
const TTL = 300_000

async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const entry = cache.get(key)
  if (entry && Date.now() - entry.ts < TTL) return entry.data as T
  const data = await fn()
  cache.set(key, { data, ts: Date.now() })
  return data
}

async function fetchAll<T>(table: string): Promise<T[]> {
  const supabase = createClient()
  const results: T[] = []
  let from = 0
  while (true) {
    const { data, error } = await supabase.from(table).select('*').range(from, from + 999)
    if (error) throw new Error(`${table}: ${error.message}`)
    if (!data || !data.length) break
    results.push(...(data as T[]))
    if (data.length < 999) break
    from += 999
  }
  return results
}

export async function getArchitects() { return cached('architects', () => fetchAll<Architect>('architects')) }
export async function getBuildings() { return cached('buildings', () => fetchAll<Building>('buildings')) }

export async function getCounts() {
  return cached('counts', async () => {
    const supabase = createClient()
    const [a, b, s, e] = await Promise.all([
      supabase.from('architects').select('*', { count: 'exact', head: true }),
      supabase.from('buildings').select('*', { count: 'exact', head: true }),
      supabase.from('styles').select('*', { count: 'exact', head: true }),
      supabase.from('eras').select('*', { count: 'exact', head: true }),
    ])
    const { data: countries } = await supabase.from('buildings').select('country')
    const uniqueCountries = new Set((countries || []).map(c => c.country).filter(Boolean)).size

    return {
      architects: a.count || 0,
      buildings: b.count || 0,
      styles: s.count || 0,
      eras: e.count || 0,
      countries: uniqueCountries,
    }
  })
}

export async function getFeaturedBuildings(limit = 6) {
  const supabase = createClient()
  const { data } = await supabase.from('buildings').select('*').order('year_start', { ascending: false }).limit(limit)
  return (data || []) as Building[]
}

/** Quality-filtered featured buildings: proper names + cover images + complete data. */
export async function getFeaturedBuildingsWithCovers(limit = 7): Promise<BuildingWithCover[]> {
  const all = await getBuildingsWithCovers()
  return all
    .filter(b => b.cover_url && isMinimallyComplete(b) && !isWikidataId(b.slug) && isTrustedEditorialImage({
      source: b.cover_source_url?.includes('commons.wikimedia.org') ? 'Wikimedia Commons' : null,
      license: b.cover_license,
      cover_source_url: b.cover_source_url,
    }))
    .sort((a, b) => (b.year_start || 0) - (a.year_start || 0))
    .slice(0, limit)
}

/** All buildings with covers, excluding Wikidata Q-ID entries and incomplete records. */
export async function getQualityBuildings(): Promise<BuildingWithCover[]> {
  const all = await getBuildingsWithCovers()
  return all.filter(b => isMinimallyComplete(b) && !isWikidataId(b.name_en || ''))
}

/** Feature a specific curated set by slug. Returns buildings with covers in specified order. */
export async function getCuratedBuildings(slugs: string[]): Promise<BuildingWithCover[]> {
  const all = await getBuildingsWithCovers()
  const bySlug = new Map(all.map(b => [b.slug, b]))
  return slugs.map(s => bySlug.get(s)).filter(Boolean) as BuildingWithCover[]
}

export async function getBuildingsWithCovers(): Promise<BuildingWithCover[]> {
  return cached('buildings-covers', async () => {
    const supabase = createClient()
    const buildings = await fetchAll<Building>('buildings')
    const { data: images } = await supabase.from('images')
      .select('building_id, url_original, photographer, license, source_url')
      .eq('is_primary', true)
    const imgMap = new Map<string, Record<string, unknown>>()
    if (images) images.forEach((i: Record<string, unknown>) => imgMap.set(i.building_id as string, i))
    return buildings.map(b => {
      const image = imgMap.get(b.id)
      const override = cachedImageOverrides[b.slug] || curatedImageOverrides[b.slug]
      return {
        ...b,
        cover_url: override?.cover_url || (image?.url_original as string) || null,
        cover_photographer: override?.cover_photographer || (image?.photographer as string) || null,
        cover_license: override?.cover_license || (image?.license as string) || null,
        cover_source_url: override?.cover_source_url || (image?.source_url as string) || null,
      }
    })
  })
}

export async function getEras() { return cached('eras', () => fetchAll<Era>('eras')) }
export async function getStyles() { return cached('styles', () => fetchAll<Style>('styles')) }
export async function getTypes() { return cached('types', () => fetchAll<BuildingType>('building_types')) }

export async function getArchitectBySlug(slug: string): Promise<Architect | null> {
  const { data } = await createClient().from('architects').select('*').eq('slug', slug).single()
  return data
}

export async function getBuildingBySlug(slug: string): Promise<Building | null> {
  const { data } = await createClient().from('buildings').select('*').eq('slug', slug).single()
  return data
}

export async function getBuildingsByArchitect(slug: string): Promise<Building[]> {
  const { data } = await createClient().from('buildings').select('*').eq('architect_slug', slug)
  return data || []
}

export async function getBuildingImages(buildingId: string): Promise<BuildingImage[]> {
  const { data } = await createClient().from('images').select('*').eq('building_id', buildingId).order('is_primary', { ascending: false })
  return data || []
}

export async function getRelatedArchitects(slug: string): Promise<Architect[]> {
  const arch = await getArchitectBySlug(slug)
  if (!arch) return []
  const ids = new Set([...(arch.influences || []), ...(arch.influenced || [])])
  if (!ids.size) return []
  return (await getArchitects()).filter(a => ids.has(a.slug) && a.slug !== slug)
}

export async function getRelatedBuildings(slug: string): Promise<Building[]> {
  const b = await getBuildingBySlug(slug)
  if (!b) return []
  return (await getBuildings()).filter(x =>
    x.id !== b.id &&
    (x.architect_slug === b.architect_slug ||
     x.style_slugs?.some(s => b.style_slugs?.includes(s)) ||
     x.type_slug === b.type_slug)
  ).slice(0, 6)
}
