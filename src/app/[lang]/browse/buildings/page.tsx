import type { Metadata } from 'next'
import { formatDisplayLocation } from '@/lib/display'
import { formatCountryName } from '@/lib/locale'
import { displayTaxonomyName } from '@/lib/taxonomy-display'
import type { BuildingType, BuildingWithCover, Architect, Era, Style } from '@/lib/types'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers, getEras, getStyles, getTypes } from '@/lib/data'
import { displayName } from '@/lib/display'
import { isMinimallyComplete } from '@/lib/quality'
import { matchesTaxonomy } from '@/lib/taxonomy'
import PageShell from '@/components/PageShell'
import BuildingExplorer, {
  type BuildingExplorerGroup,
  type BuildingExplorerItem,
  type BuildingExplorerMode,
} from '@/components/BuildingExplorer'

const FEATURED_BUILDING_SLUGS = [
  'villa-savoye',
  'fallingwater',
  'barcelona-pavilion',
  'church-of-light',
  'centre-pompidou',
  'sydney-opera-house',
  'guggenheim-bilbao',
  'salk-institute',
  'hiroshima-peace-museum',
  'apple-park',
  '8-house',
  'guggenheim-nyc',
]

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: t(lang, 'buildings'),
    description: lang === 'en'
      ? 'Browse all visible works in the Archistory archive.'
      : lang === 'ja'
        ? 'Archistory で閲覧できる建築作品を一覧する。'
        : '浏览 Archistory 当前可查看的建筑作品。',
  }
}

export default async function BuildingsIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const [buildings, architects, eras, styles, types] = await Promise.all([
    getBuildingsWithCovers(),
    getArchitects(),
    getEras(),
    getStyles(),
    getTypes(),
  ])
  const architectMap = new Map(architects.map(architect => [architect.slug, displayName(architect, lang)]))
  const architectBySlug = new Map(architects.map(architect => [architect.slug, architect]))
  const visibleBuildings = buildings
    .filter(building => isMinimallyComplete(building))
    .sort((a, b) => {
      const yearDiff = (b.year_start || 0) - (a.year_start || 0)
      if (yearDiff !== 0) return yearDiff
      return displayName(a, lang).localeCompare(displayName(b, lang))
    })
  const featured = buildFeaturedBuildings(visibleBuildings, architectMap, lang)
  const groups = buildExplorerGroups({
    buildings: visibleBuildings,
    architectMap,
    architectBySlug,
    eras,
    styles,
    types,
    lang,
  })

  return (
    <PageShell width="archive">
      <BuildingExplorer lang={lang} featured={featured} groups={groups} copy={explorerCopy(lang)} />
    </PageShell>
  )
}

function buildFeaturedBuildings(
  buildings: BuildingWithCover[],
  architectMap: Map<string, string>,
  lang: string
): BuildingExplorerItem[] {
  const visualBuildings = buildings.filter(hasReliableBuildingVisual)
  const bySlug = new Map(visualBuildings.map(building => [building.slug, building]))
  const curated = FEATURED_BUILDING_SLUGS
    .map(slug => bySlug.get(slug))
    .filter((building): building is BuildingWithCover => Boolean(building))
  const fill = visualBuildings.filter(building => !FEATURED_BUILDING_SLUGS.includes(building.slug))
  return [...curated, ...fill].slice(0, 12).map(building => toExplorerItem(building, architectMap, lang))
}

function buildExplorerGroups({
  buildings,
  architectMap,
  architectBySlug,
  eras,
  styles,
  types,
  lang,
}: {
  buildings: BuildingWithCover[]
  architectMap: Map<string, string>
  architectBySlug: Map<string, Architect>
  eras: Era[]
  styles: Style[]
  types: BuildingType[]
  lang: string
}): Record<BuildingExplorerMode, BuildingExplorerGroup[]> {
  return {
    country: buildCountryGroups(buildings, architectMap, lang),
    era: withUngrouped(
      eras.map(era => {
        const groupBuildings = buildings.filter(building => matchesBuildingEra(building, era, architectBySlug))
        return toGroup(era.slug, displayName(era, lang), groupBuildings, architectMap, lang)
      }),
      toGroup(
        'uncategorized-era',
        uncategorizedLabel(lang),
        buildings.filter(building => !eras.some(era => matchesBuildingEra(building, era, architectBySlug))),
        architectMap,
        lang
      )
    ),
    style: withUngrouped(
      styles.map(style => {
        const groupBuildings = buildings.filter(building => building.style_slugs?.some(slug => matchesTaxonomy(slug, style)))
        const label = displayTaxonomyName(style, lang) || displayName(style, lang)
        return toGroup(style.slug, label, groupBuildings, architectMap, lang)
      }).sort((a, b) => b.count - a.count),
      toGroup(
        'uncategorized-style',
        uncategorizedLabel(lang),
        buildings.filter(building => !styles.some(style => building.style_slugs?.some(slug => matchesTaxonomy(slug, style)))),
        architectMap,
        lang
      )
    ),
    type: withUngrouped(
      types.map(type => {
        const groupBuildings = buildings.filter(building => matchesTaxonomy(building.type_slug, type))
        return toGroup(type.slug, displayName(type, lang), groupBuildings, architectMap, lang)
      }).sort((a, b) => b.count - a.count),
      toGroup(
        'uncategorized-type',
        uncategorizedLabel(lang),
        buildings.filter(building => !types.some(type => matchesTaxonomy(building.type_slug, type))),
        architectMap,
        lang
      )
    ),
  }
}

function matchesBuildingEra(building: BuildingWithCover, era: Era, architectBySlug: Map<string, Architect>) {
  if (matchesTaxonomy(building.era_slug, era)) return true
  const architect = building.architect_slug ? architectBySlug.get(building.architect_slug) : null
  if (matchesTaxonomy(architect?.era_slug, era)) return true
  if (!building.year_start || era.year_start === null || era.year_end === null) return false
  return building.year_start >= era.year_start && building.year_start <= era.year_end
}

function buildCountryGroups(
  buildings: BuildingWithCover[],
  architectMap: Map<string, string>,
  lang: string
): BuildingExplorerGroup[] {
  const grouped = new Map<string, BuildingWithCover[]>()
  buildings.forEach(building => {
    const country = normalizeCountry(building.country_code, building.country) || 'uncategorized'
    const list = grouped.get(country) || []
    list.push(building)
    grouped.set(country, list)
  })

  const preferred = ['JP', 'US', 'FR', 'GB', 'IT', 'DE', 'ES', 'CN', 'HK', 'IN', 'BR', 'AU', 'CH', 'FI', 'DK']
  return [...grouped.entries()]
    .sort((a, b) => {
      const ai = preferred.indexOf(a[0])
      const bi = preferred.indexOf(b[0])
      if (a[0] === 'uncategorized') return 1
      if (b[0] === 'uncategorized') return -1
      if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
      return b[1].length - a[1].length
    })
    .map(([country, groupBuildings]) => toGroup(country, country === 'uncategorized' ? uncategorizedLabel(lang) : countryLabel(country, groupBuildings[0], lang), groupBuildings, architectMap, lang))
}

function toGroup(
  id: string,
  label: string,
  buildings: BuildingWithCover[],
  architectMap: Map<string, string>,
  lang: string
): BuildingExplorerGroup {
  const sorted = [...buildings].sort((a, b) => {
    const imageDiff = Number(hasReliableBuildingVisual(b)) - Number(hasReliableBuildingVisual(a))
    if (imageDiff !== 0) return imageDiff
    const yearDiff = (b.year_start || 0) - (a.year_start || 0)
    if (yearDiff !== 0) return yearDiff
    return displayName(a, lang).localeCompare(displayName(b, lang))
  })
  return {
    id,
    label,
    count: buildings.length,
    items: sorted.map(building => toExplorerItem(building, architectMap, lang)),
  }
}

function withUngrouped(groups: BuildingExplorerGroup[], ungrouped: BuildingExplorerGroup) {
  const visible = groups.filter(group => group.count > 0)
  return ungrouped.count > 0 ? [...visible, ungrouped] : visible
}

function hasReliableBuildingVisual(building: BuildingWithCover) {
  return Boolean(building.cover_url?.startsWith('/images/'))
}

function toExplorerItem(
  building: BuildingWithCover,
  architectMap: Map<string, string>,
  lang: string
): BuildingExplorerItem {
  const architectName = architectMap.get(building.architect_slug || '') || ''
  const location = formatDisplayLocation({
    city: building.city,
    country: building.country,
    countryCode: building.country_code,
    lang,
  })
  return {
    slug: building.slug,
    name: displayName(building, lang),
    year: building.year_start ? String(building.year_start) : undefined,
    meta: location || undefined,
    architectName: architectName || undefined,
    imageUrl: hasReliableBuildingVisual(building) ? building.cover_url : null,
  }
}

function normalizeCountry(code?: string | null, country?: string | null) {
  if (code) return code.toUpperCase()
  if (!country) return ''
  const aliases: Record<string, string> = {
    Japan: 'JP',
    日本: 'JP',
    'United States': 'US',
    USA: 'US',
    US: 'US',
    美国: 'US',
    アメリカ合衆国: 'US',
    France: 'FR',
    法国: 'FR',
    フランス: 'FR',
    'United Kingdom': 'GB',
    UK: 'GB',
    英国: 'GB',
    イギリス: 'GB',
    Italy: 'IT',
    意大利: 'IT',
    イタリア: 'IT',
    Germany: 'DE',
    德国: 'DE',
    ドイツ: 'DE',
    Spain: 'ES',
    西班牙: 'ES',
    スペイン: 'ES',
    China: 'CN',
    中国: 'CN',
    'Hong Kong': 'HK',
    中華人民共和国香港特別行政区: 'HK',
    India: 'IN',
    印度: 'IN',
    Brazil: 'BR',
    巴西: 'BR',
    Australia: 'AU',
    Switzerland: 'CH',
    瑞士: 'CH',
    スイス: 'CH',
    Finland: 'FI',
    芬兰: 'FI',
    フィンランド: 'FI',
    Denmark: 'DK',
  }
  return aliases[country] || country
}

function countryLabel(country: string, sample: BuildingWithCover | undefined, lang: string) {
  if (country.length === 2) return formatCountryName(country, sample?.country, lang) || country
  return country
}

function uncategorizedLabel(lang: string) {
  if (lang === 'ja') return '未分類'
  if (lang === 'en') return 'Uncategorized'
  return '未分类'
}

function explorerCopy(lang: string) {
  if (lang === 'en') {
    return {
      featuredLabel: 'Works / highlights',
      featuredTitle: 'Start with the buildings everyone recognizes',
      browseTitle: 'Change the lens',
      browseDescription: 'Switch the view and keep every work in the archive visible inside its group.',
      country: 'Country',
      era: 'Period',
      style: 'Style',
      type: 'Program',
    }
  }
  if (lang === 'ja') {
    return {
      featuredLabel: '作品 / 代表作',
      featuredTitle: 'まずは建築史の代表作から入る',
      browseTitle: '見方を切り替える',
      browseDescription: '切り替えても作品は省かず、各グループの画像カードと文字索引からすべて開けます。',
      country: '国',
      era: '時代',
      style: '様式',
      type: '用途',
    }
  }
  return {
    featuredLabel: '建筑作品 / 代表作',
    featuredTitle: '先看最有辨识度的建筑作品',
    browseTitle: '切换浏览方式',
    browseDescription: '切换后不会少作品；每个分组先给有图作品，剩下的继续以文字索引保留。',
    country: '国家',
    era: '时代',
    style: '风格',
    type: '用途',
  }
}
