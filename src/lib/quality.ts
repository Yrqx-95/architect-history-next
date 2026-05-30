/**
 * Content quality filtering utilities.
 * Ensures only complete, well-formed content is prominently displayed.
 */

import { isProbablySimplifiedChinese, type Architect, type Building, type BuildingWithCover } from './types'

/** Checks for common encoding artifacts. */
export function isGarbled(text: string): boolean {
  return text.includes('�') || text.includes('\x00')
}

/** Wikidata Q-ID pattern -- bulk-imported entries without proper names. */
export function isWikidataId(text: string): boolean {
  return /^Q\d+$/i.test(text.trim())
}

/** A building name is real (not a raw Wikidata ID, not garbled, not empty). */
export function hasProperName(obj: { name_en?: string | null; name_zh?: string | null }): boolean {
  const name = obj.name_en || obj.name_zh || ''
  if (!name.trim()) return false
  if (isWikidataId(name)) return false
  if (isGarbled(name)) return false
  return true
}

/** Minimally complete: has a real name and at least location or year. */
export function isMinimallyComplete(b: {
  name_en?: string | null; name_zh?: string | null
  city?: string | null; country?: string | null; year_start?: number | null
}): boolean {
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
  const name = obj.name_zh || obj.name_en || obj.name_ja || ''
  if (!name.trim()) return false
  if (isWikidataId(name)) return false
  if (isGarbled(name)) return false
  return true
}

/** Filter buildings to only those with quality content. */
export function filterQualityBuildings(buildings: BuildingWithCover[]): BuildingWithCover[] {
  return buildings.filter(b => isShowcaseBuilding(b) && isMinimallyComplete(b))
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
