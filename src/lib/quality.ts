/**
 * Content quality filtering utilities.
 * Ensures only complete, well-formed content is prominently displayed.
 */

import { isProbablySimplifiedChinese } from './locale'
import type { Architect, Building, BuildingWithCover } from './types'

/** Checks for common encoding artifacts. */
export function isGarbled(text: string): boolean {
  return text.includes('�') || text.includes('\x00')
}

/** Wikidata Q-ID pattern -- bulk-imported entries without proper names. */
export function isWikidataId(text: string): boolean {
  return /^Q\d+$/i.test(text.trim())
}

function hasCleanName(names: Array<string | null | undefined>): boolean {
  return names.some(name => {
    const value = name?.trim() || ''
    return Boolean(value) && !isWikidataId(value) && !isGarbled(value)
  })
}

/** A building name is real (not a raw Wikidata ID, not garbled, not empty). */
export function hasProperName(obj: { name_en?: string | null; name_zh?: string | null }): boolean {
  return hasCleanName([obj.name_en, obj.name_zh])
}

/** Public archive links need a real slug; empty slugs collapse to /building. */
export function hasUsableSlug(obj: { slug?: string | null }): boolean {
  const slug = obj.slug?.trim() || ''
  if (!slug) return false
  if (slug.includes('/')) return false
  if (isGarbled(slug)) return false
  return true
}

/** Minimally complete: has a real name and at least location or year. */
export function isMinimallyComplete(b: {
  slug?: string | null
  name_en?: string | null; name_zh?: string | null
  city?: string | null; country?: string | null; year_start?: number | null
}): boolean {
  if ('slug' in b && !hasUsableSlug(b)) return false
  if (!hasProperName(b)) return false
  if (!b.city && !b.country && !b.year_start) return false
  return true
}

/** A building is "showcase quality" if it has a cover image and a proper name. */
export function isShowcaseBuilding(b: Building | BuildingWithCover): b is BuildingWithCover {
  const cover = (b as BuildingWithCover).cover_url
  if (!cover) return false
  return hasValidName(b)
}

/** Checks that at least one name field is non-empty and not garbled or a Wikidata ID. */
export function hasValidName(obj: { name_zh?: string | null; name_en?: string | null; name_ja?: string | null }): boolean {
  return hasCleanName([obj.name_zh, obj.name_en, obj.name_ja])
}

/** Filter buildings to only those with quality content. */
export function filterQualityBuildings(buildings: BuildingWithCover[]): BuildingWithCover[] {
  return buildings.filter(b => isShowcaseBuilding(b) && isMinimallyComplete(b))
}

export function dedupeBuildings<T extends {
  id: string
  slug: string
  name_zh?: string | null
  name_en?: string | null
  name_ja?: string | null
  year_start?: number | null
  country_code?: string | null
}>(buildings: T[]): T[] {
  const seen = new Set<string>()
  const result: T[] = []
  buildings.forEach(building => {
    const name = [building.name_ja, building.name_en, building.name_zh]
      .find(value => value && value.trim() && !isWikidataId(value) && !isGarbled(value))
    const normalizedName = (name || building.slug)
      .toLowerCase()
      .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/gi, '')
    const key = [normalizedName, building.year_start || '', building.country_code || ''].join(':')
    if (seen.has(key)) return
    seen.add(key)
    result.push(building)
  })
  return result
}

/** An architect has meaningful content if they have a bio or core ideas. */
export function hasArchitectContent(a: Architect): boolean {
  const bio = a.bio_zh || a.bio_en || a.bio_ja
  const ideas = Array.isArray(a.core_ideas) ? a.core_ideas : []
  return (bio && bio.trim().length > 20) || ideas.length > 0
}

/** Safe text display -- returns fallback if text is empty, null, or garbled. */
export function safeText(text: string | null | undefined, fallback?: string): string {
  if (!text || !text.trim()) return fallback || ''
  if (isGarbled(text)) return fallback || ''
  if (isWikidataId(text)) return fallback || ''
  return text
}

/** Safe display name with fallback chain. */
export function safeDisplayName(
  obj: { name_zh?: string | null; name_en?: string | null; name_ja?: string | null },
  lang: string
): string {
  const names = [
    lang === 'ja' ? obj.name_ja : null,
    lang === 'zh' ? obj.name_zh : null,
    obj.name_en,
    lang === 'ja' ? null : obj.name_zh,
    obj.name_ja,
  ].filter(Boolean)
  for (const name of names) {
    if (name && name.trim() && !isGarbled(name) && !isWikidataId(name) && !(lang === 'ja' && isProbablySimplifiedChinese(name))) return name
  }
  return 'Untitled'
}
