/**
 * Architecture Knowledge OS — Unified Type System
 *
 * All types use snake_case to match Supabase column names directly.
 * This is the single source of truth for all entity and relation types.
 */

// ============================================================
// Base entity types (matching Supabase schema columns)
// ============================================================

export interface Architect {
  id: string
  slug: string
  wikidata_id: string | null
  name_zh: string | null
  name_en: string
  name_ja: string | null
  alt_names: string[]
  birth_year: number | null
  death_year: number | null
  nationalities: string[]
  era_slug: string | null
  style_slugs: string[]
  bio_zh: string | null
  bio_en: string | null
  bio_ja: string | null
  core_ideas: string[]
  education: string | null
  influences: string[]
  influenced: string[]
  wikipedia_url: string | null
  official_url: string | null
}

export interface Building {
  id: string
  slug: string
  wikidata_id: string | null
  name_zh: string | null
  name_en: string
  name_ja: string | null
  architect_id: string | null
  architect_slug: string | null
  year_start: number | null
  year_end: number | null
  status: string | null
  city: string | null
  country: string | null
  country_code: string | null
  location: unknown
  type_slug: string | null
  style_slugs: string[]
  era_slug: string | null
  area_sqm: number | null
  materials: string[]
  structure: string | null
  description: Record<string, string> | null
  significance: Record<string, string> | null
  spatial_feat: Record<string, string> | null
  light_feat: Record<string, string> | null
  circulation: Record<string, string> | null
  heritage: string | null
  wikipedia_url: string | null
  official_url: string | null
}

export interface BuildingWithCover extends Building {
  cover_url?: string | null
  cover_photographer?: string | null
  cover_license?: string | null
  cover_source_url?: string | null
}

export interface Style {
  id: string
  slug: string
  name_zh: string | null
  name_en: string
  name_ja: string | null
  parent_slug: string | null
  era_slug: string | null
  description: Record<string, string> | null
  keywords: string[]
}

export interface Era {
  id: string
  slug: string
  name_zh: string | null
  name_en: string
  name_ja: string | null
  year_start: number | null
  year_end: number | null
}

export interface BuildingImage {
  id: string
  building_id: string
  url_original: string
  url_thumb_400: string | null
  photographer: string | null
  source: string
  license: string | null
  source_url: string
  img_type: string
  is_primary: boolean
}

export interface BuildingType {
  id: string
  slug: string
  name_zh: string | null
  name_en: string
  name_ja: string | null
}

// ============================================================
// Deep content model — for future long-form editorial expansion
// ============================================================

/** Block-level content section in an article (future rich-text model) */
export interface ContentSection {
  id: string
  type: 'prose' | 'pullquote' | 'image-break' | 'gallery' | 'footnote' | 'reference'
  title?: Record<string, string>        // i18n title
  body?: Record<string, string>         // i18n body (markdown or plain text)
  imageUrl?: string                     // for image-break / gallery
  imageCaption?: Record<string, string>
  attribution?: string                  // quote attribution
  sourceUrl?: string                    // reference link
}

/** Extended architect content — future schema expansion */
export interface ArchitectDeepContent {
  architectId: string
  quotes: { text: Record<string, string>; source?: string }[]
  furtherReading: { title: string; url: string; lang?: string }[]
  stylisticCharacteristics: Record<string, string>
  materialTendencies: Record<string, string>
  spatialTendencies: Record<string, string>
  historicalContext: Record<string, string>
  impactOnLater: Record<string, string>
}

/** Extended building content — future schema expansion */
export interface BuildingDeepContent {
  buildingId: string
  historicalContext: Record<string, string>
  culturalSignificance: Record<string, string>
  structuralInnovation: Record<string, string>
  urbanContext: Record<string, string>
  awards: string[]
  timelineEvents: { year: number; event: Record<string, string> }[]
  relatedProjects: { slug: string; relationship: string }[]
}

/** Extended era/movement content — future schema expansion */
export interface EraDeepContent {
  eraId: string
  socialContext: Record<string, string>
  technologicalContext: Record<string, string>
  philosophicalBackground: Record<string, string>
  materialEvolution: Record<string, string>
  spatialEvolution: Record<string, string>
  urbanInfluence: Record<string, string>
  transitionFrom: Record<string, string>
  transitionTo: Record<string, string>
  keyInnovations: string[]
  representativeFigures: { architectSlug: string; contribution: Record<string, string> }[]
}

// ============================================================
// Knowledge Graph relation types
// ============================================================

export interface ArchitectRelations {
  architect: Architect
  styles: Style[]
  era: Era | null
  buildings: Building[]
  influencesList: Architect[]
  influencedList: Architect[]
  relatedArchitects: Architect[]
  relatedBuildings: Building[]
}

export interface BuildingRelations {
  building: Building
  architect: Architect | null
  styles: Style[]
  era: Era | null
  relatedBuildings: Building[]
  images: BuildingImage[]
}

export interface StyleRelations {
  style: Style
  architects: Architect[]
  buildings: Building[]
  parentStyle: Style | null
  childStyles: Style[]
  era: Era | null
}

export interface EraRelations {
  era: Era
  styles: Style[]
  architects: Architect[]
  buildings: Building[]
}

// ============================================================
// i18n
// ============================================================

export type Lang = 'zh' | 'en' | 'ja'

// ============================================================
// Display helpers
// ============================================================

export function displayName(
  obj: { name_zh?: string | null; name_en?: string; name_ja?: string | null },
  lang: string
): string {
  if (lang === 'ja' && obj.name_ja) return obj.name_ja
  if (lang === 'en' && obj.name_en) return obj.name_en
  if (lang === 'zh' && obj.name_zh) return obj.name_zh
  return obj.name_en || obj.name_zh || ''
}

export function displayText(
  obj: Record<string, string> | null | undefined,
  lang: string
): string {
  if (!obj) return ''
  return obj[lang] || obj['en'] || obj['zh'] || Object.values(obj)[0] || ''
}

export function lifeSpan(birth: number | null, death: number | null): string {
  if (!birth && !death) return ''
  return `${birth || '?'} – ${death || 'Present'}`
}

export function formatLocation(city?: string | null, country?: string | null): string {
  if (city && country) return `${city}, ${country}`
  return city || country || ''
}
