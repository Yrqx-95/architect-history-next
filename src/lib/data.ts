import { createClient } from './supabase'
import type {
  Architect, Building, BuildingWithCover, BuildingImage,
  Era, Style, BuildingType,
} from './types'
import { isMinimallyComplete, isWikidataId } from './quality'
import { isTrustedEditorialImage } from './image-policy'
import imageOverrides from './image-overrides.json'
import localImageOverrides from './local-image-overrides.json'
import graduationCases from '@/content/graduation/cases.json'
import graduationIssues from '@/content/graduation/issues.json'

type ImageOverride = {
  cover_url?: string
  cover_photographer?: string | null
  cover_license?: string | null
  cover_source_url?: string | null
  cover_img_type?: string | null
}

type PrimaryImage = Pick<BuildingImage,
  'id' | 'building_id' | 'url_original' | 'photographer' | 'license' | 'source_url' | 'img_type'
>

const curatedImageOverrides = imageOverrides as Record<string, ImageOverride>
const cachedImageOverrides = localImageOverrides as Record<string, ImageOverride>

// Simple in-memory cache for the request lifecycle
const cache = new Map<string, { data: unknown; ts: number }>()
const pendingCache = new Map<string, Promise<unknown>>()
const TTL = 300_000
const FETCH_PAGE_SIZE = 500
const FETCH_MAX_ATTEMPTS = 6
const NON_IMAGE_EXTENSIONS = new Set(['.ogg', '.oga', '.mp3', '.mp4', '.webm', '.pdf', '.svg'])
const UNUSABLE_COVER_FILES = new Set([
  'european-court-of-human-rights-1024.jpg',
  'fileicon-ogg.png',
  'villa_savoye.jpg',
])

function isTransientSupabaseError(message: string) {
  return /Bad control character|JSON|522|Connection timed out|Cloudflare|DOCTYPE|fetch failed|network|timeout/i.test(message)
}

async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const entry = cache.get(key)
  if (entry && Date.now() - entry.ts < TTL) return entry.data as T
  const pending = pendingCache.get(key)
  if (pending) return pending as Promise<T>

  const request = fn().then(data => {
    cache.set(key, { data, ts: Date.now() })
    return data
  }).finally(() => {
    pendingCache.delete(key)
  })
  pendingCache.set(key, request)
  return request
}

async function fetchAll<T>(table: string, select = '*'): Promise<T[]> {
  const supabase = createClient()
  const results: T[] = []
  let from = 0
  while (true) {
    const to = from + FETCH_PAGE_SIZE - 1
    let data: T[] | null = null
    let error: { message: string } | null = null
    for (let attempt = 0; attempt < FETCH_MAX_ATTEMPTS; attempt += 1) {
      const response = await supabase.from(table).select(select).range(from, to)
      data = (response.data as T[] | null) || null
      error = response.error ? { message: response.error.message } : null
      if (!error || !isTransientSupabaseError(error.message) || attempt === FETCH_MAX_ATTEMPTS - 1) break
      await new Promise(resolve => setTimeout(resolve, 300 * 2 ** attempt))
    }
    if (error) throw new Error(`${table}: ${error.message}`)
    if (!data || !data.length) break
    results.push(...(data as T[]))
    if (data.length < FETCH_PAGE_SIZE) break
    from += FETCH_PAGE_SIZE
  }
  return results
}

export async function collectPagedRows<T>(fetchPage: (from: number, to: number) => Promise<T[]>): Promise<T[]> {
  const results: T[] = []
  let from = 0
  while (true) {
    const to = from + FETCH_PAGE_SIZE - 1
    const data = await fetchPage(from, to)
    results.push(...data)
    if (data.length < FETCH_PAGE_SIZE) return results
    from += FETCH_PAGE_SIZE
  }
}

export function preserveExistingPrimarySelections<T extends { building_id: string }>(
  existingRows: T[],
  completeRows: T[],
): T[] {
  const selected = new Map<string, T>()
  for (const row of existingRows) selected.set(row.building_id, row)
  for (const row of completeRows) if (!selected.has(row.building_id)) selected.set(row.building_id, row)
  return [...selected.values()]
}

async function fetchAllPrimaryImages(): Promise<PrimaryImage[]> {
  const supabase = createClient()
  const fetchPage = async (from: number, to: number, ordered: boolean) => {
    let data: PrimaryImage[] | null = null
    let error: { message: string } | null = null
    for (let attempt = 0; attempt < FETCH_MAX_ATTEMPTS; attempt += 1) {
      const query = supabase.from('images')
        .select('id,building_id,url_original,photographer,license,source_url,img_type')
        .eq('is_primary', true)
      const response = ordered
        ? await query.order('building_id', { ascending: true }).order('id', { ascending: true }).range(from, to)
        : await query.range(from, to)
      data = (response.data as PrimaryImage[] | null) || null
      error = response.error ? { message: response.error.message } : null
      if (!error || !isTransientSupabaseError(error.message) || attempt === FETCH_MAX_ATTEMPTS - 1) break
      await new Promise(resolve => setTimeout(resolve, 300 * 2 ** attempt))
    }
    if (error) throw new Error(`images: ${error.message}`)
    return data || []
  }

  const [existingRows, completeRows] = await Promise.all([
    fetchPage(0, 999, false),
    collectPagedRows((from, to) => fetchPage(from, to, true)),
  ])
  return preserveExistingPrimarySelections(existingRows, completeRows)
}

export function isDisplayableImageUrl(value: unknown): value is string {
  if (typeof value !== 'string' || !value.trim()) return false
  const clean = value.split('?')[0].toLowerCase()
  const filename = clean.split('/').pop() || ''
  if (UNUSABLE_COVER_FILES.has(filename)) return false
  return !Array.from(NON_IMAGE_EXTENSIONS).some(extension => clean.endsWith(extension))
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
export function selectFeaturedBuildingsWithCovers(all: BuildingWithCover[], limit = 7): BuildingWithCover[] {
  return all
    .filter(b => b.cover_url && isMinimallyComplete(b) && !isWikidataId(b.slug) && isTrustedEditorialImage({
      source: b.cover_source_url?.includes('commons.wikimedia.org') ? 'Wikimedia Commons' : null,
      license: b.cover_license,
      cover_source_url: b.cover_source_url,
    }))
    .sort((a, b) => (b.year_start || 0) - (a.year_start || 0))
    .slice(0, limit)
}

/** Quality-filtered featured buildings: proper names + cover images + complete data. */
export async function getFeaturedBuildingsWithCovers(limit = 7): Promise<BuildingWithCover[]> {
  const all = await getBuildingsWithCovers()
  return selectFeaturedBuildingsWithCovers(all, limit)
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
    const buildings = await fetchAll<Building>('buildings')
    const images = await fetchAllPrimaryImages()
    const imgMap = new Map<string, Record<string, unknown>>()
    images.forEach(i => imgMap.set(i.building_id, i))
    return buildings.map(b => {
      const image = imgMap.get(b.id)
      const override = cachedImageOverrides[b.slug] || curatedImageOverrides[b.slug]
      const overrideCoverUrl = isDisplayableImageUrl(override?.cover_url) ? override.cover_url : null
      const imageCoverUrl = isDisplayableImageUrl(image?.url_original) ? image?.url_original as string : null
      const useOverride = Boolean(overrideCoverUrl)
      const useImage = !useOverride && Boolean(imageCoverUrl)
      return {
        ...b,
        cover_url: overrideCoverUrl || imageCoverUrl || null,
        cover_photographer: useOverride ? override?.cover_photographer || null : useImage ? image?.photographer as string || null : null,
        cover_license: useOverride ? override?.cover_license || null : useImage ? image?.license as string || null : null,
        cover_source_url: useOverride ? override?.cover_source_url || null : useImage ? image?.source_url as string || null : null,
        cover_img_type: useOverride ? override?.cover_img_type || null : useImage ? image?.img_type as string || null : null,
      }
    })
  })
}

export type SearchArchitect = Pick<Architect,
  'slug' | 'name_zh' | 'name_en' | 'name_ja' | 'birth_year' | 'death_year' |
  'era_slug' | 'nationalities' | 'style_slugs' | 'core_ideas'
>

export type SearchBuilding = Pick<Building,
  'id' | 'slug' | 'name_zh' | 'name_en' | 'name_ja' | 'year_start' | 'year_end' |
  'city' | 'country' | 'country_code' | 'type_slug' | 'architect_slug' | 'era_slug' |
  'style_slugs' | 'description' | 'significance'
> & Pick<BuildingWithCover, 'cover_url' | 'cover_photographer' | 'cover_license' | 'cover_source_url'>
  & {
    function_slugs: string[]
    function_aliases: string[]
    graduation_case_ids: string[]
    graduation_keywords: string[]
    graduation_issue_ids: string[]
  }

/** Compact search corpus: avoids hydrating full buildings and galleries on a search cache miss. */
export async function getSearchIndex(): Promise<{ architects: SearchArchitect[]; buildings: SearchBuilding[] }> {
  return cached('search-index-v1', async () => {
    const [architects, buildings, images, functions, aliases, assignments, profiles] = await Promise.all([
      fetchAll<SearchArchitect>('architects', 'slug,name_zh,name_en,name_ja,birth_year,death_year,era_slug,nationalities,style_slugs,core_ideas'),
      fetchAll<Pick<Building, 'id' | 'slug' | 'name_zh' | 'name_en' | 'name_ja' | 'year_start' | 'year_end' | 'city' | 'country' | 'country_code' | 'type_slug' | 'architect_slug' | 'era_slug' | 'style_slugs' | 'description' | 'significance'>>('buildings', 'id,slug,name_zh,name_en,name_ja,year_start,year_end,city,country,country_code,type_slug,architect_slug,era_slug,style_slugs,description,significance'),
      fetchAllPrimaryImages(),
      fetchAll<{ slug: string; name_zh: string; name_zh_hant: string; name_en: string; name_ja: string }>('building_functions', 'slug,name_zh,name_zh_hant,name_en,name_ja'),
      fetchAll<{ function_slug: string; locale: string; alias: string }>('building_function_aliases', 'function_slug,locale,alias'),
      fetchAll<{ building_id: string; function_slug: string; review_status: string }>('building_function_assignments', 'building_id,function_slug,review_status'),
      fetchAll<{ case_id: string; building_id: string; publication_status: string }>('graduation_case_profiles', 'case_id,building_id,publication_status'),
    ])
    const imageByBuilding = new Map<string, Record<string, unknown>>()
    for (const image of images) imageByBuilding.set(image.building_id, image)
    const functionNames = new Map(functions.map(item => [item.slug, [item.slug, item.name_zh, item.name_zh_hant, item.name_en, item.name_ja]]))
    for (const alias of aliases) functionNames.set(alias.function_slug, [...(functionNames.get(alias.function_slug) || []), alias.alias])
    const functionsByBuilding = new Map<string, string[]>()
    for (const assignment of assignments.filter(item => item.review_status === 'approved')) functionsByBuilding.set(assignment.building_id, [...(functionsByBuilding.get(assignment.building_id) || []), assignment.function_slug])
    const profilesByBuilding = new Map<string, string[]>()
    for (const profile of profiles.filter(item => item.publication_status === 'published')) profilesByBuilding.set(profile.building_id, [...(profilesByBuilding.get(profile.building_id) || []), profile.case_id])
    const caseById = new Map(graduationCases.map(item => [item.id, item]))
    const issuesByCase = new Map<string, string[]>()
    for (const issue of graduationIssues) for (const caseId of issue.reference_case_ids) issuesByCase.set(caseId, [...(issuesByCase.get(caseId) || []), issue.id])

    return {
      architects,
      buildings: buildings.map(building => {
        const image = imageByBuilding.get(building.id)
        const override = cachedImageOverrides[building.slug] || curatedImageOverrides[building.slug]
        const overrideCoverUrl = isDisplayableImageUrl(override?.cover_url) ? override.cover_url : null
        const imageCoverUrl = isDisplayableImageUrl(image?.url_original) ? image?.url_original as string : null
        const useOverride = Boolean(overrideCoverUrl)
        const useImage = !useOverride && Boolean(imageCoverUrl)
        const functionSlugs = functionsByBuilding.get(building.id) || []
        const caseIds = profilesByBuilding.get(building.id) || []
        const cases = caseIds.map(caseId => caseById.get(caseId)).filter(Boolean)
        return {
          ...building,
          cover_url: overrideCoverUrl || imageCoverUrl || null,
          cover_photographer: useOverride ? override?.cover_photographer || null : useImage ? image?.photographer as string || null : null,
          cover_license: useOverride ? override?.cover_license || null : useImage ? image?.license as string || null : null,
          cover_source_url: useOverride ? override?.cover_source_url || null : useImage ? image?.source_url as string || null : null,
          cover_img_type: useOverride ? override?.cover_img_type || null : useImage ? image?.img_type as string || null : null,
          function_slugs: functionSlugs,
          function_aliases: functionSlugs.flatMap(slug => functionNames.get(slug) || []),
          graduation_case_ids: caseIds,
          graduation_keywords: cases.flatMap(item => [
            ...(item?.keywords || []), ...(item?.keywords_en || []), ...(item?.keywords_ja || []),
            item?.concept, item?.concept_en, item?.concept_ja,
          ].filter((value): value is string => Boolean(value))),
          graduation_issue_ids: [...new Set(caseIds.flatMap(caseId => issuesByCase.get(caseId) || []))],
        }
      }),
    }
  })
}

export async function getPublishedGraduationProfilesByBuildingId(buildingId: string): Promise<{ case_id: string }[]> {
  const { data, error } = await createClient()
    .from('graduation_case_profiles')
    .select('case_id')
    .eq('building_id', buildingId)
    .eq('publication_status', 'published')
    .order('case_id')
  if (error) throw new Error(`graduation_case_profiles: ${error.message}`)
  return (data || []) as { case_id: string }[]
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

export async function getBuildingImages(buildingId: string): Promise<BuildingImage[]> {
  const { data } = await createClient().from('images').select('*').eq('building_id', buildingId).order('is_primary', { ascending: false })
  return (data || []).filter(image => isDisplayableImageUrl(image.url_original))
}
