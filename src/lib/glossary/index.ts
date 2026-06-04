import type { GlossaryCategory, GlossaryTerm } from './types'
import { glossaryTerms } from './terms'

export * from './types'
export { glossaryTerms } from './terms'

export function getGlossaryTerms(category?: GlossaryCategory) {
  return glossaryTerms.filter(term => !category || term.category === category)
}

export function getGlossaryTerm(slug: string) {
  return glossaryTerms.find(term => term.slug === slug)
}

const keyTermSlugsByCodeTopic: Record<string, string[]> = {
  'floor-area-ratio': ['floor-area-ratio', 'total-floor-area', 'site-area', 'front-road', 'road-width'],
  'building-coverage-ratio': ['building-coverage-ratio', 'building-area', 'site-area', 'corner-lot-relaxation'],
  'zoning-districts': ['zoning-districts', 'commercial-district', 'category-one-low-rise-residential-district', 'apartment-house'],
  'road-access-obligation': ['road-access-obligation', 'front-road', 'road-width', 'evacuation'],
  'road-slant-restriction': ['road-slant-restriction', 'front-road', 'road-width', 'sky-factor'],
  'north-side-slant-restriction': ['north-side-slant-restriction', 'shadow-regulation', 'sky-factor'],
  'fire-prevention-district': ['fire-prevention-district', 'fire-resistant-building', 'major-structural-parts'],
  'quasi-fire-prevention-district': ['quasi-fire-prevention-district', 'quasi-fire-resistant-building', 'fire-protective-construction', 'opening', 'exterior-wall'],
}

export function getGlossaryTermsForCodeTopic(topicSlug: string) {
  const slugs = keyTermSlugsByCodeTopic[topicSlug] || []
  return slugs
    .map(slug => getGlossaryTerm(slug))
    .filter((term): term is GlossaryTerm => Boolean(term))
}

export function getGlossaryTermTitle(term: GlossaryTerm, lang: string) {
  if (lang === 'en') return term.termEn
  if (lang === 'ja') return term.termJa
  return term.termZh
}

export function getGlossaryTermDefinition(term: GlossaryTerm, lang: string) {
  if (lang === 'en') return term.shortDefinitionEn
  if (lang === 'ja') return term.shortDefinitionJa
  return term.shortDefinitionZh
}

export function getGlossaryRelatedTopicLabel(term: GlossaryTerm, lang: string) {
  const localized = getGlossaryTermTitle(term, lang)
  if (lang === 'ja' || localized === term.termJa) return term.termJa
  return `${localized} / ${term.termJa}`
}
