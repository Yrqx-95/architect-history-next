import { t } from '@/lib/i18n'
import { selectFeaturedBuildingsWithCovers } from '@/lib/data'
import { displayName, displayText, formatDisplayLocation } from '@/lib/display'
import { isProbablySimplifiedChinese } from '@/lib/locale'
import { isMinimallyComplete } from '@/lib/quality'
import type { Architect, BuildingWithCover, Style } from '@/lib/types'
import { getHomeCopy, getHomeLearningCopy, HOME_ARCHITECT_SLUGS } from './home-copy'

export function cleanHomeSnippet(value: string, lang: string): string {
  if (lang === 'en' && /[\u3400-\u9fff]/.test(value)) return ''
  if (lang === 'ja' && isProbablySimplifiedChinese(value)) return ''
  return value
}

export function countBuildingsByArchitect(buildings: BuildingWithCover[]) {
  const counts = new Map<string, number>()
  buildings.forEach(building => {
    if (!building.architect_slug) return
    counts.set(building.architect_slug, (counts.get(building.architect_slug) || 0) + 1)
  })
  return counts
}

export function buildArchitectVisualMap(buildings: BuildingWithCover[]) {
  const visuals = new Map<string, string>()
  buildings.forEach(building => {
    if (!building.architect_slug || !building.cover_url || visuals.has(building.architect_slug)) return
    visuals.set(building.architect_slug, building.cover_url)
  })
  return visuals
}

export function buildHomeData({
  lang,
  allBuildings,
  architects,
  styles,
}: {
  lang: string
  allBuildings: BuildingWithCover[]
  architects: Architect[]
  styles: Style[]
}) {
  const featured = selectFeaturedBuildingsWithCovers(allBuildings, 14)
  const prefix = `/${lang}`
  const copy = getHomeCopy(lang)
  const learningCopy = getHomeLearningCopy(lang)
  const visibleBuildings = allBuildings.filter(b => isMinimallyComplete(b))
  const visibleCountries = new Set(visibleBuildings.map(b => b.country_code || b.country).filter(Boolean))
  const cleanSnippet = (value: string) => cleanHomeSnippet(value, lang)

  const uniqueFeatured = featured.filter((building, index, all) =>
    building.cover_url &&
    all.findIndex(item => item.cover_url === building.cover_url) === index
  )
  const heroBuilding = uniqueFeatured[0] || featured[0]
  const editorialBuilding = uniqueFeatured.find(building =>
    building.slug !== heroBuilding?.slug &&
    building.cover_url !== heroBuilding?.cover_url
  ) || uniqueFeatured[1] || featured[1] || heroBuilding
  const featuredRest = uniqueFeatured
    .filter(building =>
      building.slug !== heroBuilding?.slug &&
      building.slug !== editorialBuilding?.slug
    )
    .slice(0, 9)
  const studyBuilding = editorialBuilding
  const exploreBuilding = featuredRest.find(building =>
    building.cover_url !== studyBuilding?.cover_url
  ) || featuredRest[1] || editorialBuilding
  const selectedFeatured = featuredRest.filter(building =>
    building.slug !== exploreBuilding?.slug &&
    building.cover_url !== exploreBuilding?.cover_url
  )
  const featuredLead = selectedFeatured[0] || featuredRest[0]
  const secondaryFeatured = selectedFeatured.slice(1, 5)
  const heroImage = heroBuilding?.cover_url || null
  const heroArchitect = heroBuilding
    ? architects.find(architect => architect.slug === heroBuilding.architect_slug)
    : null
  const heroName = heroBuilding ? displayName(heroBuilding, lang) : t(lang, 'hero')
  const heroArchitectName = heroArchitect ? displayName(heroArchitect, lang) : ''
  const heroLocation = heroBuilding
    ? formatDisplayLocation({ city: heroBuilding.city, country: heroBuilding.country, countryCode: heroBuilding.country_code, lang })
    : ''
  const heroYear = heroBuilding?.year_start ? String(heroBuilding.year_start) : ''
  const heroMeta = [heroArchitectName, heroYear, heroLocation].filter(Boolean)
  const heroDescription = heroBuilding
    ? cleanSnippet(displayText(heroBuilding.description, lang) || displayText(heroBuilding.significance, lang)) ||
      [heroName, heroArchitectName, heroLocation, heroYear].filter(Boolean).join(' · ')
    : ''
  const featuredLabel = lang === 'en' ? 'Selected works' : lang === 'ja' ? '選定作品' : '精选作品'
  const architectVisualBySlug = buildArchitectVisualMap(visibleBuildings)
  const buildingCountByArchitect = countBuildingsByArchitect(visibleBuildings)
  const majorArchitects = HOME_ARCHITECT_SLUGS
    .map(slug => architects.find(architect => architect.slug === slug))
    .filter((architect): architect is Architect => Boolean(architect))

  return {
    prefix,
    copy,
    learningCopy,
    visibleBuildings,
    visibleCountries,
    cleanSnippet,
    heroBuilding,
    studyBuilding,
    exploreBuilding,
    featuredLead,
    secondaryFeatured,
    heroImage,
    heroName,
    heroArchitectName,
    heroLocation,
    heroYear,
    heroMeta,
    heroDescription,
    featuredLabel,
    architectVisualBySlug,
    buildingCountByArchitect,
    majorArchitects,
    styles,
  }
}
