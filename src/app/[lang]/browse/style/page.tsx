import Link from 'next/link'
import type { Metadata } from 'next'
import { displayTaxonomyName } from '@/lib/taxonomy-display'
import type { Architect, BuildingWithCover, Era, Style } from '@/lib/types'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers, getEras, getStyles } from '@/lib/data'
import { displayName } from '@/lib/display'
import { listMatchesTaxonomy, matchesTaxonomy } from '@/lib/taxonomy'
import { dedupeBuildings, isMinimallyComplete } from '@/lib/quality'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'

type StyleSummary = {
  style: Style
  label: string
  description: string
  era: Era | null
  architects: Architect[]
  buildings: BuildingWithCover[]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: t(lang, 'styles'),
    description: lang === 'en'
      ? 'Browse architectural styles and formal languages in Archistory.'
      : lang === 'ja'
      ? 'Archistory の建築様式と形式言語を一覧する。'
      : '浏览 Archistory 中的建筑风格与形式语言。',
  }
}

export default async function StyleIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const [architects, buildings, eras, styles] = await Promise.all([
    getArchitects(),
    getBuildingsWithCovers(),
    getEras(),
    getStyles(),
  ])
  const qualityBuildings = dedupeBuildings(buildings.filter(building => isMinimallyComplete(building)))
  const prefix = `/${lang}`
  const summaries: StyleSummary[] = styles
    .map(style => {
      const label = displayTaxonomyName(style, lang)
      const era = style.era_slug ? eras.find(item => matchesTaxonomy(style.era_slug, item)) || null : null
      const styleArchitects = architects.filter(architect => listMatchesTaxonomy(architect.style_slugs, style))
      const styleBuildings = qualityBuildings.filter(building => listMatchesTaxonomy(building.style_slugs, style))
      return {
        style,
        label,
        description: localizedDescription(style, lang),
        era,
        architects: styleArchitects,
        buildings: styleBuildings,
      }
    })
    .filter(summary => summary.label && hasEnoughStyleMaterial(summary))
    .sort((a, b) =>
      (b.architects.length + b.buildings.length) - (a.architects.length + a.buildings.length) ||
      a.label.localeCompare(b.label)
    )

  const grouped = eras
    .map(era => ({
      era,
      styles: summaries.filter(summary => summary.era && matchesTaxonomy(summary.era.slug, era)),
    }))
    .filter(group => group.styles.length > 0)
  const ungrouped = summaries.filter(summary => !summary.era)
  const ungroupedGroups = chunk(ungrouped, Math.ceil(ungrouped.length / 2)).map((items, index) => ({
    id: `ungrouped-${index}`,
    title: index === 0
      ? lang === 'en' ? 'Major styles' : lang === 'ja' ? '主要な様式' : '主要风格'
      : lang === 'en' ? 'More styles' : lang === 'ja' ? 'その他の様式' : '更多风格',
    subtitle: '',
    styles: items,
  }))

  return (
    <PageShell width="archive">
      <header className="section border-b border-subtle pb-8 sm:pb-10">
        <p className="eyebrow mb-4">{lang === 'en' ? 'Style index' : lang === 'ja' ? '様式索引' : '风格索引'}</p>
        <h1 className="heading-display mb-4">{t(lang, 'styles')}</h1>
        <p className="body-large max-w-3xl">
          {lang === 'en'
            ? 'Styles are recurring formal languages: shared ways of handling structure, ornament, material, space, and historical references.'
            : lang === 'ja'
            ? '様式とは、構造、装飾、素材、空間、歴史的参照をめぐる反復的な形式言語です。'
            : '风格指反复出现的形式语言：结构、装饰、材料、空间和历史参照的共同处理方式。'}
        </p>
        <div className="mt-7 grid gap-3 border-y border-subtle py-4 sm:grid-cols-3">
          <IndexStat value={summaries.length} label={t(lang, 'styles')} />
          <IndexStat value={architects.length} label={t(lang, 'architects')} />
          <IndexStat value={qualityBuildings.length} label={t(lang, 'buildings')} />
        </div>
      </header>

      <Reveal>
        <section className="section pt-8 sm:pt-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2">{lang === 'en' ? 'Archive paths' : lang === 'ja' ? 'アーカイブ入口' : '档案入口'}</p>
              <h2 className="heading-3">{lang === 'en' ? 'Read by period and style' : lang === 'ja' ? '時代と様式から読む' : '按时代与风格阅读'}</h2>
            </div>
            <p className="caption max-w-lg sm:text-right">
              {lang === 'en'
                ? 'Open a style, then compare its architects and works from the detail page.'
                : lang === 'ja'
                ? '様式を開くと、関連する建築家と作品を詳細ページで比較できます。'
                : '打开一个风格后，可以在详情页比较相关建筑师与作品。'}
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2">
            {grouped.map(group => (
              <StyleGroup
                key={group.era.id}
                title={displayName(group.era, lang)}
                subtitle={formatYears(group.era)}
                summaries={group.styles}
                lang={lang}
                prefix={prefix}
              />
            ))}
            {ungroupedGroups.map(group => (
              <StyleGroup
                key={group.id}
                title={group.title}
                subtitle={group.subtitle}
                summaries={group.styles}
                lang={lang}
                prefix={prefix}
              />
            ))}
          </div>
        </section>
      </Reveal>
    </PageShell>
  )
}

function StyleGroup({
  title,
  subtitle,
  summaries,
  lang,
  prefix,
}: {
  title: string
  subtitle: string
  summaries: StyleSummary[]
  lang: string
  prefix: string
}) {
  return (
    <section className="border-t border-subtle pt-4">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-medium leading-snug text-primary">{title}</h2>
          {subtitle && <p className="caption mt-1">{subtitle}</p>}
        </div>
        <p className="caption tabular-nums">{summaries.length}</p>
      </div>
      <div className="grid divide-y divide-[color:var(--ui-border-subtle)]">
        {summaries.map(summary => (
          <Link
            key={summary.style.id}
            href={`${prefix}/browse/style/${summary.style.slug}`}
            className="interactive-row group grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start"
          >
            <span className="min-w-0">
              <span className="block text-base font-medium text-primary transition-colors group-hover:text-accent">
                {summary.label}
              </span>
              {summary.description && (
                <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-secondary">
                  {summary.description}
                </span>
              )}
            </span>
            <span className="caption sm:text-right">
              {[
                summary.architects.length > 0 ? `${summary.architects.length} ${t(lang, 'architects')}` : '',
                summary.buildings.length > 0 ? `${summary.buildings.length} ${t(lang, 'buildings')}` : '',
              ].filter(Boolean).join(' · ')}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

function IndexStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-0">
      <p className="font-serif-display text-3xl leading-none text-primary">{value}</p>
      <p className="caption mt-2">{label}</p>
    </div>
  )
}

function localizedDescription(style: Style, lang: string) {
  const description = style.description || {}
  return description[lang] || description.en || description.zh || ''
}

function hasEnoughStyleMaterial(summary: StyleSummary) {
  if (summary.architects.length > 0 && summary.buildings.length > 0) return true
  if (summary.buildings.length >= 3) return true
  if (summary.architects.length >= 2) return true
  return false
}

function formatYears(era: Era) {
  if (!era.year_start) return ''
  return `${era.year_start}${era.year_end ? `-${era.year_end}` : ''}`
}

function chunk<T>(items: T[], size: number) {
  if (size <= 0) return []
  const groups: T[][] = []
  for (let index = 0; index < items.length; index += size) {
    groups.push(items.slice(index, index + size))
  }
  return groups
}
