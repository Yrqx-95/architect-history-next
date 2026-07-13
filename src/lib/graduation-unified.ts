import { cache } from 'react'

import {
  type GraduationCase,
} from '@/lib/graduation'
import { isTrustedEditorialImage } from '@/lib/image-policy'
import { createClient } from '@/lib/supabase'

export type GraduationProfileRow = {
  case_id: string
  building_id: string
  concept_zh: string
  concept_zh_hant: string | null
  concept_en: string | null
  concept_ja: string | null
  keywords_zh: string[]
  keywords_zh_hant: string[]
  keywords_en: string[]
  keywords_ja: string[]
  plan_url: string | null
  section_url: string | null
  source_url: string
  publication_status: 'draft' | 'published' | 'archived'
}

export type GraduationBuildingRow = {
  id: string
  slug: string
  name_zh: string | null
  name_en: string
  name_ja: string | null
  architect_id: string | null
  architect_slug: string | null
  year_start: number | null
  city: string | null
  country: string | null
  official_url?: string | null
  wikipedia_url?: string | null
}

export type GraduationArchitectRow = {
  id: string
  slug: string
  name_en: string
}

export type GraduationImageRow = {
  building_id: string
  url_original: string
  photographer: string | null
  source: string
  license: string | null
  source_url: string
  is_primary: boolean
}

export type GraduationDualReadDiagnostics = {
  profileCount: number
  unifiedCaseIds: string[]
  missingFallbackCaseIds: string[]
  missingBuildingCaseIds: string[]
  canonicalImageCaseIds: string[]
  fallbackImageCaseIds: string[]
}

export type GraduationDualReadResult = {
  cases: GraduationCase[]
  source: 'supabase'
  diagnostics: GraduationDualReadDiagnostics
  error?: string
}

function locationText(building: GraduationBuildingRow) {
  return [building.city, building.country]
    .filter((value, index, values): value is string => Boolean(value) && values.indexOf(value) === index)
    .join(' ')
}

function canonicalImageForBuilding(
  images: GraduationImageRow[],
  approvedSourceUrls: ReadonlySet<string>,
) {
  const primary = images.filter(image => image.is_primary)
  if (primary.length !== 1) return null
  const image = primary[0]
  if (!approvedSourceUrls.has(image.source_url)) return null
  const hasTraceableCommonsPage = image.source !== 'Wikimedia Commons' ||
    /commons\.wikimedia\.org\/wiki\/File:/i.test(image.source_url)
  if (
    !image.url_original ||
    !image.photographer ||
    !image.license ||
    !hasTraceableCommonsPage ||
    !isTrustedEditorialImage(image)
  ) return null
  return image
}

export function mergeGraduationCases({
  fallbackCases,
  profiles,
  buildings,
  architects,
  images,
  approvedCanonicalImageSourceUrls = new Set<string>(),
}: {
  fallbackCases: GraduationCase[]
  profiles: GraduationProfileRow[]
  buildings: GraduationBuildingRow[]
  architects: GraduationArchitectRow[]
  images: GraduationImageRow[]
  approvedCanonicalImageSourceUrls?: ReadonlySet<string>
}): GraduationDualReadResult {
  const fallbackById = new Map(fallbackCases.map(item => [item.id, item]))
  const buildingsById = new Map(buildings.map(item => [item.id, item]))
  const architectsById = new Map(architects.map(item => [item.id, item]))
  const architectsBySlug = new Map(architects.map(item => [item.slug, item]))
  const imagesByBuilding = new Map<string, GraduationImageRow[]>()
  for (const image of images) {
    const group = imagesByBuilding.get(image.building_id) || []
    group.push(image)
    imagesByBuilding.set(image.building_id, group)
  }

  const replacements = new Map<string, GraduationCase>()
  const diagnostics: GraduationDualReadDiagnostics = {
    profileCount: profiles.length,
    unifiedCaseIds: [],
    missingFallbackCaseIds: [],
    missingBuildingCaseIds: [],
    canonicalImageCaseIds: [],
    fallbackImageCaseIds: [],
  }

  for (const profile of profiles) {
    if (profile.publication_status !== 'published') continue
    const fallback = fallbackById.get(profile.case_id)
    if (!fallback) {
      diagnostics.missingFallbackCaseIds.push(profile.case_id)
      continue
    }
    const building = buildingsById.get(profile.building_id)
    if (!building) {
      diagnostics.missingBuildingCaseIds.push(profile.case_id)
      continue
    }

    const architect = building.architect_id
      ? architectsById.get(building.architect_id)
      : building.architect_slug
        ? architectsBySlug.get(building.architect_slug)
        : null
    const canonicalImage = canonicalImageForBuilding(
      imagesByBuilding.get(building.id) || [],
      approvedCanonicalImageSourceUrls,
    )
    const canonicalLocation = locationText(building)
    const canonicalArchitect = architect?.name_en || building.architect_slug || ''
    const fallbackArchitect = fallback.architect || ''
    const canonicalArchitectKey = canonicalArchitect.toLocaleLowerCase()
    const fallbackArchitectKey = fallbackArchitect.toLocaleLowerCase()
    const canonicalOnlyCases = new Set(['CASE-016', 'CASE-033', 'CASE-034', 'CASE-100'])
    const mergedArchitect = canonicalArchitectKey === fallbackArchitectKey || canonicalOnlyCases.has(profile.case_id)
      ? canonicalArchitect || fallbackArchitect || undefined
      : fallbackArchitect || canonicalArchitect || undefined

    const merged: GraduationCase = {
      ...fallback,
      id: profile.case_id,
      name: building.name_zh || building.name_en || fallback.name,
      name_en: building.name_en || fallback.name_en,
      name_ja: building.name_ja || fallback.name_ja,
      location: canonicalLocation || fallback.location,
      location_en: fallback.location_en || canonicalLocation,
      location_ja: fallback.location_ja || canonicalLocation,
      // The canonical schema currently models one architect, while several
      // reviewed cases have documented collaborators. Preserve the richer
      // reviewed string until a building_architects relation exists.
      architect: mergedArchitect,
      year: building.year_start ?? fallback.year,
      concept: profile.concept_zh,
      concept_en: profile.concept_en || fallback.concept_en,
      concept_ja: profile.concept_ja || fallback.concept_ja,
      keywords: profile.keywords_zh,
      keywords_en: profile.keywords_en,
      keywords_ja: profile.keywords_ja,
      plan_url: profile.plan_url || '',
      section_url: profile.section_url || '',
      source_url: profile.source_url,
      building_slug: building.slug,
      building_official_url: building.official_url || undefined,
      building_wikipedia_url: building.wikipedia_url || undefined,
      status: 'published',
      ...(canonicalImage ? {
        image_url: canonicalImage.url_original,
        image_source_url: canonicalImage.source_url,
        image_license: canonicalImage.license || undefined,
        image_credit: `${canonicalImage.photographer} / ${canonicalImage.source}`,
        image_note: undefined,
      } : {}),
    }

    replacements.set(profile.case_id, merged)
    diagnostics.unifiedCaseIds.push(profile.case_id)
    if (canonicalImage) diagnostics.canonicalImageCaseIds.push(profile.case_id)
    else diagnostics.fallbackImageCaseIds.push(profile.case_id)
  }

  return {
    cases: fallbackCases.map(item => replacements.get(item.id) || item),
    source: 'supabase',
    diagnostics,
  }
}

export const getUnifiedPublicGraduationCases = cache(async (): Promise<GraduationDualReadResult> => {
  const supabase = createClient({ cacheVersion: 'graduation-runtime-v88-compat-v1' })
  const [compatibilityResponse, profilesResponse] = await Promise.all([
    supabase
      .from('graduation_case_compatibility')
      .select('case_id,payload')
      .eq('publication_status', 'published')
      .order('case_id'),
    supabase
      .from('graduation_case_profiles')
      .select('*')
      .eq('publication_status', 'published')
      .order('case_id'),
  ])
    if (compatibilityResponse.error) throw compatibilityResponse.error
    if (profilesResponse.error) throw profilesResponse.error
    const compatibilityCases = (compatibilityResponse.data || []).map(row => row.payload as GraduationCase)
    if (compatibilityCases.length !== 101) throw new Error(`Expected 101 published compatibility cases, received ${compatibilityCases.length}`)
    const profiles = (profilesResponse.data || []) as GraduationProfileRow[]
    if (profiles.length !== 88) throw new Error(`Expected 88 published graduation profiles, received ${profiles.length}`)

    const buildingIds = [...new Set(profiles.map(item => item.building_id))]
    const [buildingsResponse, imagesResponse] = await Promise.all([
      supabase
        .from('buildings')
        .select('id,slug,name_zh,name_en,name_ja,architect_id,architect_slug,year_start,city,country,official_url,wikipedia_url')
        .in('id', buildingIds),
      supabase
        .from('images')
        .select('building_id,url_original,photographer,source,license,source_url,is_primary')
        .in('building_id', buildingIds)
        .eq('is_primary', true),
    ])
    if (buildingsResponse.error) throw buildingsResponse.error
    if (imagesResponse.error) throw imagesResponse.error
    const buildings = (buildingsResponse.data || []) as GraduationBuildingRow[]
    const architectIds = [...new Set(buildings.map(item => item.architect_id).filter((id): id is string => Boolean(id)))]
    const architectSlugs = [...new Set(buildings.map(item => item.architect_slug).filter((slug): slug is string => Boolean(slug)))]
    const architectsResponse = architectIds.length || architectSlugs.length
      ? await supabase
          .from('architects')
          .select('id,slug,name_en')
          .or([
            architectIds.length ? `id.in.(${architectIds.join(',')})` : '',
            architectSlugs.length ? `slug.in.(${architectSlugs.join(',')})` : '',
          ].filter(Boolean).join(','))
      : { data: [], error: null }
    if (architectsResponse.error) throw architectsResponse.error

    return mergeGraduationCases({
      fallbackCases: compatibilityCases,
      profiles,
      buildings,
      architects: (architectsResponse.data || []) as GraduationArchitectRow[],
      images: (imagesResponse.data || []) as GraduationImageRow[],
      // Batch 001 found no canonical primary image with fully matching current
      // Commons authorship, license, availability and single-primary status.
      // Keep the reviewed JSON image until an image-specific decision file
      // explicitly approves a source URL.
      // Compatibility payloads are now stored in Supabase and retain the
      // separately reviewed CASE image. A canonical image may take over only
      // after an image-specific approval, never merely because it is primary.
      approvedCanonicalImageSourceUrls: new Set<string>(),
    })
})
