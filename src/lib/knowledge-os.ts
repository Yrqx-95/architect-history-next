import { getArchitects, getBuildingsWithCovers, getEras, getStyles, getTypes } from '@/lib/data'
import { displayName, displayText, formatDisplayLocation } from '@/lib/display'
import { getBuildingContent, localizedBuildingContent } from '@/lib/building-content'
import { displayTaxonomyName } from '@/lib/taxonomy-display'
import type { Architect, BuildingType, BuildingWithCover, Era, Lang, Style } from '@/lib/types'

export type KnowledgeEntityType =
  | 'building'
  | 'architect'
  | 'style'
  | 'period'
  | 'project_type'
  | 'source'
  | 'claim'
export type SourceTrustTier = 'S' | 'A' | 'B' | 'C' | 'D'

export type KnowledgeSource = {
  source_id: string
  source_type: string
  title: string
  publisher: string | null
  url: string | null
  license: string | null
  accessed_at: string
  is_primary: boolean
  trust_tier: SourceTrustTier
  permalink: string
}

export type ClaimCitation = {
  source_id: string
  permalink: string
  url: string | null
  locator: { type: string; value: string } | null
  support_type: 'supports' | 'context'
  evidence_score: number
}

export type KnowledgeClaim = {
  claim_id: string
  subject_type: KnowledgeEntityType
  subject_id: string
  predicate: string
  object_type: KnowledgeEntityType | 'literal' | null
  object_id: string | null
  value_text: string
  value_normalized: string | number | string[] | Record<string, string> | null
  confidence: number
  review_status: 'derived' | 'draft' | 'approved' | 'needs_review'
  last_verified_at: string
  permalink: string
  citations: ClaimCitation[]
}

export type BuildingEvidenceBundle = {
  entity: {
    id: string
    type: 'building'
    slug: string
    canonical_title: string
    title_i18n: Record<Lang, string>
    summary_i18n: Record<Lang, string>
    permalink: string
    last_updated: string
  }
  sources: KnowledgeSource[]
  claims: KnowledgeClaim[]
  related_entities: Array<{
    entity_id: string
    type: KnowledgeEntityType
    label: string
    reason: string
  }>
  meta: {
    schema_version: '0.1.0'
    generated_at: string
    source_mode: 'derived_from_current_archive'
  }
}

type KnowledgeContext = {
  architects: Architect[]
  styles: Style[]
  eras: Era[]
  types: BuildingType[]
}

const DEFAULT_BASE_URL = 'https://archistory.app'

function nowIso() {
  return new Date().toISOString()
}

function publicBaseUrl(baseUrl?: string) {
  return (baseUrl || process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_BASE_URL).replace(/\/$/, '')
}

function compactHash(input: string) {
  let hash = 5381
  for (let i = 0; i < input.length; i += 1) {
    hash = ((hash << 5) + hash) ^ input.charCodeAt(i)
  }
  return Math.abs(hash).toString(36).slice(0, 10)
}

function normalizeLang(lang?: string): Lang {
  return lang === 'en' || lang === 'ja' || lang === 'zh' ? lang : 'zh'
}

function sourceTypeForUrl(url: string | null) {
  if (!url) return 'archive_record'
  if (/wikidata\.org/i.test(url)) return 'linked_open_data'
  if (/wikipedia\.org/i.test(url)) return 'reference_encyclopedia'
  if (/commons\.wikimedia\.org|upload\.wikimedia\.org/i.test(url)) return 'media_archive'
  if (/unesco\.org|nps\.gov|culture|bunka\.go\.jp|gsi\.go\.jp/i.test(url)) return 'official_source'
  return 'external_source'
}

function trustTierForUrl(url: string | null): SourceTrustTier {
  if (!url) return 'C'
  if (/unesco\.org|nps\.gov|culture|bunka\.go\.jp|gsi\.go\.jp|official/i.test(url)) return 'S'
  if (/wikidata\.org|wikipedia\.org|commons\.wikimedia\.org|upload\.wikimedia\.org/i.test(url)) return 'B'
  return 'A'
}

function sourceTitleFromUrl(url: string | null, fallback: string) {
  if (!url) return fallback
  if (/wikidata\.org/i.test(url)) return fallback.includes('Wikidata') ? fallback : `Wikidata: ${fallback}`
  if (/wikipedia\.org/i.test(url)) return fallback.includes('Wikipedia') ? fallback : `Wikipedia: ${fallback}`
  if (/commons\.wikimedia\.org|upload\.wikimedia\.org/i.test(url)) return fallback.includes('image') ? fallback : `Image source: ${fallback}`
  return fallback
}

function makeSource({
  title,
  url,
  baseUrl,
  isPrimary = false,
  license = null,
}: {
  title: string
  url: string | null
  baseUrl: string
  isPrimary?: boolean
  license?: string | null
}): KnowledgeSource {
  const sourceId = `src_${compactHash(`${url || title}`)}`
  return {
    source_id: sourceId,
    source_type: sourceTypeForUrl(url),
    title: sourceTitleFromUrl(url, title),
    publisher: null,
    url,
    license,
    accessed_at: nowIso(),
    is_primary: isPrimary,
    trust_tier: trustTierForUrl(url),
    permalink: `${baseUrl}/api/v1/sources/${sourceId}`,
  }
}

function uniqueSources(sources: KnowledgeSource[]) {
  const seen = new Map<string, KnowledgeSource>()
  sources.forEach(source => {
    const key = source.url || source.source_id
    if (!seen.has(key)) seen.set(key, source)
  })
  return Array.from(seen.values())
}

function sourceConfidence(source: KnowledgeSource | undefined) {
  if (!source) return 0.55
  if (source.trust_tier === 'S') return 0.94
  if (source.trust_tier === 'A') return 0.88
  if (source.trust_tier === 'B') return 0.78
  if (source.trust_tier === 'C') return 0.64
  return 0.45
}

function claimId(subjectType: KnowledgeEntityType, subjectId: string, predicate: string, value: unknown) {
  return `clm_${subjectType}_${subjectId}_${predicate}_${compactHash(JSON.stringify(value))}`
}

function makeClaim({
  subjectType,
  subjectId,
  predicate,
  valueText,
  valueNormalized,
  objectType = 'literal',
  objectId = null,
  source,
  baseUrl,
  confidence,
}: {
  subjectType: KnowledgeEntityType
  subjectId: string
  predicate: string
  valueText: string
  valueNormalized: KnowledgeClaim['value_normalized']
  objectType?: KnowledgeClaim['object_type']
  objectId?: string | null
  source: KnowledgeSource | undefined
  baseUrl: string
  confidence?: number
}): KnowledgeClaim {
  const id = claimId(subjectType, subjectId, predicate, valueNormalized ?? valueText)
  return {
    claim_id: id,
    subject_type: subjectType,
    subject_id: subjectId,
    predicate,
    object_type: objectType,
    object_id: objectId,
    value_text: valueText,
    value_normalized: valueNormalized,
    confidence: confidence ?? sourceConfidence(source),
    review_status: 'derived',
    last_verified_at: nowIso(),
    permalink: `${baseUrl}/api/v1/claims/${id}`,
    citations: source ? [{
      source_id: source.source_id,
      permalink: source.permalink,
      url: source.url,
      locator: null,
      support_type: 'supports',
      evidence_score: Math.min(sourceConfidence(source), 0.95),
    }] : [],
  }
}

function bestPrimarySource(sources: KnowledgeSource[]) {
  return sources.find(source => source.is_primary) || sources[0]
}

function localizedRecord(building: BuildingWithCover, overlay: ReturnType<typeof getBuildingContent>) {
  const overlaySummary = overlay?.summary
  const summary = {
    zh: overlaySummary ? localizedBuildingContent(overlaySummary, 'zh') : displayText(building.description, 'zh'),
    en: overlaySummary ? localizedBuildingContent(overlaySummary, 'en') : displayText(building.description, 'en'),
    ja: overlaySummary ? localizedBuildingContent(overlaySummary, 'ja') : displayText(building.description, 'ja'),
  }
  return {
    title: {
      zh: building.name_zh || building.name_en,
      en: building.name_en,
      ja: building.name_ja || building.name_en,
    },
    summary,
  }
}

function sourcesForBuilding(building: BuildingWithCover, baseUrl: string) {
  const overlay = getBuildingContent(building.slug)
  const overlaySources = overlay?.sources.map((source, index) => makeSource({
    title: source.title,
    url: source.url,
    baseUrl,
    isPrimary: index === 0,
  })) || []
  const entitySources = [
    building.official_url && makeSource({ title: `${building.name_en} official source`, url: building.official_url, baseUrl, isPrimary: true }),
    building.wikipedia_url && makeSource({ title: `Wikipedia: ${building.name_en}`, url: building.wikipedia_url, baseUrl }),
    building.cover_source_url && makeSource({
      title: `${building.name_en} image source`,
      url: building.cover_source_url,
      baseUrl,
      license: building.cover_license || null,
    }),
  ].filter(Boolean) as KnowledgeSource[]

  return uniqueSources([...overlaySources, ...entitySources])
}

function isRelatedEntity(
  item: BuildingEvidenceBundle['related_entities'][number] | false | null | undefined,
): item is BuildingEvidenceBundle['related_entities'][number] {
  return Boolean(item)
}

function relatedEntitiesForBuilding(
  building: BuildingWithCover,
  context: KnowledgeContext,
  lang: Lang,
): BuildingEvidenceBundle['related_entities'] {
  const architect = context.architects.find(item => item.slug === building.architect_slug)
  const era = context.eras.find(item => item.slug === building.era_slug)
  const styles = context.styles.filter(style => building.style_slugs?.includes(style.slug))
  const type = context.types.find(item => item.slug === building.type_slug)
  const candidates: Array<BuildingEvidenceBundle['related_entities'][number] | undefined> = [
    architect && {
      entity_id: architect.slug,
      type: 'architect' as const,
      label: displayName(architect, lang),
      reason: 'designed_by',
    },
    era && {
      entity_id: era.slug,
      type: 'period' as const,
      label: displayName(era, lang),
      reason: 'belongs_to_period',
    },
    type && {
      entity_id: type.slug,
      type: 'project_type' as const,
      label: displayName(type, lang),
      reason: 'has_project_type',
    },
    ...styles.map(style => ({
      entity_id: style.slug,
      type: 'style' as const,
      label: displayTaxonomyName(style, lang) || displayName(style, lang),
      reason: 'has_style',
    })),
  ]
  return candidates.filter(isRelatedEntity)
}

export async function getKnowledgeContext(): Promise<KnowledgeContext> {
  const [architects, styles, eras, types] = await Promise.all([
    getArchitects(),
    getStyles(),
    getEras(),
    getTypes(),
  ])
  return { architects, styles, eras, types }
}

export async function getBuildingEvidenceBundle({
  slug,
  lang = 'zh',
  baseUrl,
}: {
  slug: string
  lang?: string
  baseUrl?: string
}): Promise<BuildingEvidenceBundle | null> {
  const locale = normalizeLang(lang)
  const base = publicBaseUrl(baseUrl)
  const [buildings, context] = await Promise.all([
    getBuildingsWithCovers(),
    getKnowledgeContext(),
  ])
  const building = buildings.find(item => item.slug === slug)
  if (!building) return null

  const overlay = getBuildingContent(building.slug)
  const localized = localizedRecord(building, overlay)
  const sources = sourcesForBuilding(building, base)
  const primarySource = bestPrimarySource(sources)
  const architect = context.architects.find(item => item.slug === building.architect_slug)
  const era = context.eras.find(item => item.slug === building.era_slug)
  const styles = context.styles.filter(style => building.style_slugs?.includes(style.slug))
  const type = context.types.find(item => item.slug === building.type_slug)
  const subjectId = building.slug
  const claims: KnowledgeClaim[] = []
  const add = (claim: KnowledgeClaim | false | null | undefined) => {
    if (claim) claims.push(claim)
  }

  if (building.year_start) {
    add(makeClaim({
      subjectType: 'building',
      subjectId,
      predicate: 'completion_year',
      valueText: `${displayName(building, locale)} was completed in ${building.year_start}.`,
      valueNormalized: building.year_start,
      source: primarySource,
      baseUrl: base,
    }))
  }
  add(architect && makeClaim({
    subjectType: 'building',
    subjectId,
    predicate: 'designed_by',
    objectType: 'architect',
    objectId: architect.slug,
    valueText: `${displayName(building, locale)} was designed by ${displayName(architect, locale)}.`,
    valueNormalized: architect.slug,
    source: primarySource,
    baseUrl: base,
  }))
  if (building.city || building.country) {
    add(makeClaim({
      subjectType: 'building',
      subjectId,
      predicate: 'located_in',
      valueText: `${displayName(building, locale)} is located in ${formatDisplayLocation({
        city: building.city,
        country: building.country,
        countryCode: building.country_code,
        lang: locale,
      })}.`,
      valueNormalized: { city: building.city || '', country: building.country || '', country_code: building.country_code || '' },
      source: primarySource,
      baseUrl: base,
    }))
  }
  add(type && makeClaim({
    subjectType: 'building',
    subjectId,
    predicate: 'has_project_type',
    objectType: 'project_type',
    objectId: type.slug,
    valueText: `${displayName(building, locale)} is categorized as ${displayName(type, locale) || type.slug}.`,
    valueNormalized: type.slug,
    source: primarySource,
    baseUrl: base,
  }))
  add(era && makeClaim({
    subjectType: 'building',
    subjectId,
    predicate: 'belongs_to_period',
    objectType: 'period',
    objectId: era.slug,
    valueText: `${displayName(building, locale)} belongs to ${displayName(era, locale)}.`,
    valueNormalized: era.slug,
    source: primarySource,
    baseUrl: base,
  }))
  styles.forEach(style => add(makeClaim({
    subjectType: 'building',
    subjectId,
    predicate: 'has_style',
    objectType: 'style',
    objectId: style.slug,
    valueText: `${displayName(building, locale)} is associated with ${displayTaxonomyName(style, locale) || displayName(style, locale)}.`,
    valueNormalized: style.slug,
    source: primarySource,
    baseUrl: base,
  })))
  if (building.materials?.length) {
    add(makeClaim({
      subjectType: 'building',
      subjectId,
      predicate: 'uses_material',
      valueText: `${displayName(building, locale)} uses ${building.materials.join(', ')}.`,
      valueNormalized: building.materials,
      source: primarySource,
      baseUrl: base,
    }))
  }
  if (building.structure) {
    add(makeClaim({
      subjectType: 'building',
      subjectId,
      predicate: 'uses_structure',
      valueText: `${displayName(building, locale)} uses ${building.structure}.`,
      valueNormalized: building.structure,
      source: primarySource,
      baseUrl: base,
    }))
  }
  if (localized.summary[locale]) {
    add(makeClaim({
      subjectType: 'building',
      subjectId,
      predicate: 'archive_summary',
      valueText: localized.summary[locale],
      valueNormalized: localized.summary,
      source: primarySource,
      baseUrl: base,
      confidence: Math.min(sourceConfidence(primarySource), 0.82),
    }))
  }

  return {
    entity: {
      id: building.id,
      type: 'building',
      slug: building.slug,
      canonical_title: building.name_en,
      title_i18n: localized.title,
      summary_i18n: localized.summary,
      permalink: `${base}/${locale}/building/${building.slug}`,
      last_updated: nowIso(),
    },
    sources,
    claims,
    related_entities: relatedEntitiesForBuilding(building, context, locale),
    meta: {
      schema_version: '0.1.0',
      generated_at: nowIso(),
      source_mode: 'derived_from_current_archive',
    },
  }
}

function queryScore(value: unknown, query: string) {
  const text = String(value || '').toLowerCase()
  const q = query.toLowerCase().trim()
  if (!text || !q) return 0
  if (text === q) return 100
  if (text.includes(q)) return 70
  const tokens = q.split(/[\s,.;:/|]+/).filter(Boolean)
  return tokens.filter(token => text.includes(token)).length * 15
}

export async function resolveGroundingQuery({
  query,
  lang = 'zh',
  baseUrl,
}: {
  query: string
  lang?: string
  baseUrl?: string
}) {
  const locale = normalizeLang(lang)
  const buildings = await getBuildingsWithCovers()
  const ranked = buildings
    .map(building => ({
      slug: building.slug,
      score:
        queryScore(building.name_zh, query) +
        queryScore(building.name_en, query) +
        queryScore(building.name_ja, query) +
        queryScore(building.slug, query) +
        queryScore(building.city, query) +
        queryScore(building.country, query) +
        queryScore(building.style_slugs?.join(' '), query),
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
  const best = ranked[0]
  const bundle = best ? await getBuildingEvidenceBundle({ slug: best.slug, lang: locale, baseUrl }) : null
  const evidence = bundle?.claims
    .filter(claim => claim.citations.length > 0)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 10) || []
  const supportScore = evidence.length
    ? Number((evidence.reduce((sum, claim) => sum + claim.confidence, 0) / evidence.length).toFixed(3))
    : 0

  return {
    query,
    resolved_entities: bundle ? [{
      entity_id: bundle.entity.slug,
      type: bundle.entity.type,
      label: bundle.entity.title_i18n[locale] || bundle.entity.canonical_title,
      confidence: Math.min((best?.score || 0) / 100, 0.98),
      permalink: bundle.entity.permalink,
    }] : [],
    answerable: supportScore >= 0.55,
    support_score: supportScore,
    evidence_bundle: evidence,
    related_entities: bundle?.related_entities || [],
    meta: {
      schema_version: '0.1.0',
      generated_at: nowIso(),
      provider_hints: {
        should_cite_every_claim: true,
        fallback_if_insufficient_support: 'Say that Archistory currently lacks enough verified evidence.',
      },
    },
  }
}

export async function findDerivedClaimById({
  claimId,
  lang = 'zh',
  baseUrl,
}: {
  claimId: string
  lang?: string
  baseUrl?: string
}) {
  const buildings = await getBuildingsWithCovers()
  for (const building of buildings) {
    const bundle = await getBuildingEvidenceBundle({ slug: building.slug, lang, baseUrl })
    const claim = bundle?.claims.find(item => item.claim_id === claimId)
    if (claim) return claim
  }
  return null
}

export async function findDerivedSourceById({
  sourceId,
  lang = 'zh',
  baseUrl,
}: {
  sourceId: string
  lang?: string
  baseUrl?: string
}) {
  const buildings = await getBuildingsWithCovers()
  for (const building of buildings) {
    const bundle = await getBuildingEvidenceBundle({ slug: building.slug, lang, baseUrl })
    const source = bundle?.sources.find(item => item.source_id === sourceId)
    if (source) return source
  }
  return null
}
