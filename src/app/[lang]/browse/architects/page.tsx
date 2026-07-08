import type { Metadata } from 'next'
import { displayTaxonomyName } from '@/lib/taxonomy-display'
import type { Architect, BuildingWithCover, Era, Style } from '@/lib/types'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers, getEras, getStyles } from '@/lib/data'
import { displayName } from '@/lib/display'
import { localizedNationality } from '@/lib/fallback-content'
import { matchesTaxonomy } from '@/lib/taxonomy'
import { getArchitectImageOverride } from '@/lib/architect-images'
import PageShell from '@/components/PageShell'
import ArchitectExplorer, { type ArchitectExplorerGroup, type ArchitectExplorerItem, type ArchitectExplorerMode } from '@/components/ArchitectExplorer'

const UNRELIABLE_ARCHITECT_VISUALS = new Set([
  'alberti',
  'bernini',
  'fumihiko-maki',
  'fujimoto',
  'j-rn-utzon',
  'louis-kahn',
  'renzo-piano',
  'richard-neutra',
  'sanaa',
  'toyo-ito',
])

const FEATURED_ARCHITECT_SLUGS = [
  'le-corbusier',
  'frank-lloyd-wright',
  'mies-van-der-rohe',
  'tadao-ando',
  'zaha-hadid',
  'norman-foster',
  'koolhaas',
  'kenzo-tange',
  'alvar-aalto',
  'frank-gehry',
  'zumthor',
  'alvaro-siza-vieira',
]

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: t(lang, 'architects'),
    description: lang === 'en'
      ? 'Browse all architects in the Archistory archive.'
      : lang === 'ja'
        ? 'Archistory に収録された建築家を一覧する。'
        : '浏览 Archistory 收录的全部建筑师。',
  }
}

export default async function ArchitectsIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const [architects, buildings, eras, styles] = await Promise.all([getArchitects(), getBuildingsWithCovers(), getEras(), getStyles()])
  const workCount = new Map<string, number>()
  buildings.forEach(building => {
    if (building.architect_slug) workCount.set(building.architect_slug, (workCount.get(building.architect_slug) || 0) + 1)
  })
  const architectVisualBySlug = buildArchitectVisualMap(buildings)
  const sortedArchitects = [...architects].sort((a, b) => {
    const countDiff = (workCount.get(b.slug) || 0) - (workCount.get(a.slug) || 0)
    if (countDiff !== 0) return countDiff
    return displayName(a, lang).localeCompare(displayName(b, lang))
  })
  const visualArchitects = sortedArchitects.filter(architect => hasReliableVisual(architect, architectVisualBySlug))
  const featured = buildFeaturedArchitects(visualArchitects, architectVisualBySlug, workCount, lang)
  const groups = buildExplorerGroups({
    architects: sortedArchitects,
    architectVisualBySlug,
    workCount,
    eras,
    styles,
    lang,
  })

  return (
    <PageShell width="archive">
      <ArchitectExplorer lang={lang} featured={featured} groups={groups} copy={explorerCopy(lang)} />
    </PageShell>
  )
}

function buildArchitectVisualMap(buildings: BuildingWithCover[]): Map<string, string> {
  const visuals = new Map<string, string>()
  buildings.forEach(building => {
    if (!building.architect_slug || !building.cover_url || visuals.has(building.architect_slug)) return
    visuals.set(building.architect_slug, building.cover_url)
  })
  return visuals
}

function buildFeaturedArchitects(
  visualArchitects: Architect[],
  visuals: Map<string, string>,
  workCount: Map<string, number>,
  lang: string
): ArchitectExplorerItem[] {
  const bySlug = new Map(visualArchitects.map(architect => [architect.slug, architect]))
  const curated = FEATURED_ARCHITECT_SLUGS
    .map(slug => bySlug.get(slug))
    .filter((architect): architect is Architect => Boolean(architect))
  const fill = visualArchitects.filter(architect => !FEATURED_ARCHITECT_SLUGS.includes(architect.slug))
  return [...curated, ...fill].slice(0, 12).map(architect => toExplorerItem(architect, visuals, workCount, lang))
}

function buildExplorerGroups({
  architects,
  architectVisualBySlug,
  workCount,
  eras,
  styles,
  lang,
}: {
  architects: Architect[]
  architectVisualBySlug: Map<string, string>
  workCount: Map<string, number>
  eras: Era[]
  styles: Style[]
  lang: string
}): Record<ArchitectExplorerMode, ArchitectExplorerGroup[]> {
  return {
    country: buildCountryGroups(architects, architectVisualBySlug, workCount, lang),
    era: withUngrouped(
      eras.map(era => {
        const groupArchitects = architects.filter(architect => matchesTaxonomy(architect.era_slug, era))
        return toGroup(era.slug, displayName(era, lang), groupArchitects, architectVisualBySlug, workCount, lang)
      }),
      toGroup(
        'uncategorized-era',
        uncategorizedLabel(lang),
        architects.filter(architect => !eras.some(era => matchesTaxonomy(architect.era_slug, era))),
        architectVisualBySlug,
        workCount,
        lang
      )
    ),
    style: withUngrouped(
      styles.map(style => {
        const groupArchitects = architects.filter(architect => architect.style_slugs?.some(slug => matchesTaxonomy(slug, style)))
        const label = displayTaxonomyName(style, lang) || displayName(style, lang)
        return toGroup(style.slug, label, groupArchitects, architectVisualBySlug, workCount, lang)
      }).sort((a, b) => b.count - a.count),
      toGroup('uncategorized-style', uncategorizedLabel(lang), architects.filter(architect => !architect.style_slugs?.length), architectVisualBySlug, workCount, lang)
    ),
  }
}

function buildCountryGroups(
  architects: Architect[],
  visuals: Map<string, string>,
  workCount: Map<string, number>,
  lang: string
): ArchitectExplorerGroup[] {
  const grouped = new Map<string, Architect[]>()
  architects.forEach(architect => {
    const country = normalizeNationality(architect.nationalities?.[0]) || 'uncategorized'
    const list = grouped.get(country) || []
    list.push(architect)
    grouped.set(country, list)
  })

  const preferred = ['Japan', 'United States', 'Germany', 'France', 'Italy', 'United Kingdom', 'Netherlands', 'Spain', 'Portugal', 'Switzerland', 'Finland', 'Austria']
  return [...grouped.entries()]
    .sort((a, b) => {
      const ai = preferred.indexOf(a[0])
      const bi = preferred.indexOf(b[0])
      if (a[0] === 'uncategorized') return 1
      if (b[0] === 'uncategorized') return -1
      if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
      return b[1].length - a[1].length
    })
    .map(([country, architects]) => toGroup(country, country === 'uncategorized' ? uncategorizedLabel(lang) : countryLabel(country, lang), architects, visuals, workCount, lang))
}

function toGroup(
  id: string,
  label: string,
  architects: Architect[],
  visuals: Map<string, string>,
  workCount: Map<string, number>,
  lang: string
): ArchitectExplorerGroup {
  const sorted = [...architects].sort((a, b) => (workCount.get(b.slug) || 0) - (workCount.get(a.slug) || 0))
  return {
    id,
    label,
    count: architects.length,
    items: sorted.map(architect => toExplorerItem(architect, visuals, workCount, lang)),
  }
}

function withUngrouped(groups: ArchitectExplorerGroup[], ungrouped: ArchitectExplorerGroup) {
  const visible = groups.filter(group => group.count > 0)
  return ungrouped.count > 0 ? [...visible, ungrouped] : visible
}

function hasReliableVisual(architect: Architect, visuals: Map<string, string>) {
  return Boolean(getArchitectImageOverride(architect.slug)?.url || (visuals.has(architect.slug) && !UNRELIABLE_ARCHITECT_VISUALS.has(architect.slug)))
}

function toExplorerItem(
  architect: Architect,
  visuals: Map<string, string>,
  workCount: Map<string, number>,
  lang: string
): ArchitectExplorerItem {
  const portrait = getArchitectImageOverride(architect.slug)?.url
  const representativeWork = visuals.get(architect.slug) || ''
  return {
    slug: architect.slug,
    name: displayName(architect, lang),
    years: architect.birth_year ? `${architect.birth_year}–${architect.death_year || ''}` : '',
    meta: normalizeNationality(architect.nationalities?.[0]) ? countryLabel(normalizeNationality(architect.nationalities?.[0]), lang) : undefined,
    imageUrl: portrait || representativeWork,
    fallbackImageUrl: portrait ? representativeWork : undefined,
    workCount: workCount.get(architect.slug) || 0,
  }
}

function normalizeNationality(value?: string | null) {
  if (!value) return ''
  const aliases: Record<string, string> = {
    Italy: 'Italy',
    '意大利': 'Italy',
    Japan: 'Japan',
    日本: 'Japan',
    Finland: 'Finland',
    '芬兰': 'Finland',
    France: 'France',
    '法国': 'France',
    Germany: 'Germany',
    '德国': 'Germany',
    Spain: 'Spain',
    '西班牙': 'Spain',
    Portugal: 'Portugal',
    '葡萄牙': 'Portugal',
    Switzerland: 'Switzerland',
    '瑞士': 'Switzerland',
    'United States': 'United States',
    USA: 'United States',
    '美国': 'United States',
    'United Kingdom': 'United Kingdom',
    UK: 'United Kingdom',
    '英国': 'United Kingdom',
    Netherlands: 'Netherlands',
    '荷兰': 'Netherlands',
    Austria: 'Austria',
    '奥地利': 'Austria',
    Denmark: 'Denmark',
    '丹麦': 'Denmark',
    Mexico: 'Mexico',
    '墨西哥': 'Mexico',
    Brazil: 'Brazil',
    '巴西': 'Brazil',
    India: 'India',
    '印度': 'India',
    Belgium: 'Belgium',
    '比利时': 'Belgium',
    Greece: 'Greece',
    '希腊': 'Greece',
    Turkey: 'Turkey',
    '土耳其': 'Turkey',
    Egypt: 'Egypt',
    '埃及': 'Egypt',
    Australia: 'Australia',
    '澳大利亚': 'Australia',
    Korea: 'Korea',
    '韩国': 'Korea',
  }
  return aliases[value] || value
}

function countryLabel(country: string, lang: string) {
  return localizedNationality(country, lang)
}

function uncategorizedLabel(lang: string) {
  if (lang === 'ja') return '未分類'
  if (lang === 'en') return 'Uncategorized'
  return '未分类'
}

function explorerCopy(lang: string) {
  if (lang === 'en') {
    return {
      featuredLabel: 'Architects / highlights',
      featuredTitle: 'Start with the names that shaped the canon',
      browseTitle: 'Change the lens',
      browseDescription: 'Every architect stays visible; the switch only changes how the archive is grouped.',
      country: 'Country',
      era: 'Period',
      style: 'Style',
      works: 'works',
      open: 'Open',
      more: 'more',
    }
  }
  if (lang === 'ja') {
    return {
      featuredLabel: '建築家 / 主要人物',
      featuredTitle: 'まずは建築史の主役から入る',
      browseTitle: '見方を切り替える',
      browseDescription: '建築家を省かず、国・時代・様式ごとに並び替えます。',
      country: '国',
      era: '時代',
      style: '様式',
      works: '作品',
      open: '開く',
      more: '件',
    }
  }
  return {
    featuredLabel: '建筑家 / 重点人物',
    featuredTitle: '先看建筑史里最重要的名字',
    browseTitle: '切换浏览方式',
    browseDescription: '切换只改变分组方式，不会把建筑家从索引里删掉。',
    country: '国家',
    era: '时代',
    style: '风格',
    works: '作品',
    open: '打开',
    more: '个',
  }
}
