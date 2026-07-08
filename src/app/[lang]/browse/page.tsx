import Link from 'next/link'
import type { Metadata } from 'next'
import { formatCountryName, isProbablySimplifiedChinese } from '@/lib/locale'
import { displayTaxonomyName } from '@/lib/taxonomy-display'
import type { Architect, Building, BuildingType, BuildingWithCover, Era } from '@/lib/types'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers, getEras, getStyles, getTypes } from '@/lib/data'
import { isMinimallyComplete } from '@/lib/quality'
import { displayName } from '@/lib/display'
import { listMatchesTaxonomy, matchesTaxonomy } from '@/lib/taxonomy'
import PageShell from '@/components/PageShell'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import BuildingCard from '@/components/BuildingCard'
import ArchitectCard from '@/components/ArchitectCard'
import ArchitectPortraitThumb from '@/components/ArchitectPortraitThumb'
import { localizedNationality } from '@/lib/fallback-content'
import { getArchitectImageOverride } from '@/lib/architect-images'

type BrowseItem = {
  id: string
  href: string
  label: string
  meta: string
  count?: number
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: t(lang, 'browse'),
    description: lang === 'en' ? 'Enter Archistory through architects, works, periods, styles, types, and regions.' : lang === 'ja' ? '建築家、作品、時代、様式、類型、地域から Archistory へ入る。' : '从建筑师、作品、时代、风格、类型与地域进入 Archistory。',
  }
}

export default async function BrowsePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const [architects, buildings, styles, eras, types] = await Promise.all([
    getArchitects(), getBuildingsWithCovers(), getStyles(), getEras(), getTypes()
  ])
  const prefix = `/${lang}`
  const qualityBuildings = buildings.filter(b => isMinimallyComplete(b))
  const buildingCountByArchitect = countBy(buildings, building => building.architect_slug)
  const architectVisualBySlug = buildArchitectVisualMap(qualityBuildings)
  const architectBySlug = new Map(architects.map(architect => [architect.slug, architect]))
  const eraLabelFor = (value?: string | null) => {
    if (!value) return ''
    const era = eras.find(item => matchesTaxonomy(value, item))
    if (era) return displayName(era, lang)
    return lang === 'ja' && isProbablySimplifiedChinese(value) ? '' : value
  }

  const architectsForEra = (era: Era) => architects.filter(architect => matchesTaxonomy(architect.era_slug, era))
  const buildingsForEra = (era: Era) => buildings.filter(building => {
    if (matchesTaxonomy(building.era_slug, era)) return true
    const architect = building.architect_slug ? architectBySlug.get(building.architect_slug) : null
    return matchesTaxonomy(architect?.era_slug, era)
  })
  const architectsForStyle = (style: { slug: string; name_en?: string | null; name_zh?: string | null; name_ja?: string | null }) =>
    architects.filter(architect => listMatchesTaxonomy(architect.style_slugs, style))
  const typeCountFor = (type: BuildingType) => buildings.filter(building => matchesTaxonomy(building.type_slug, type)).length

  const rankedArchitects = [...architects].sort((a, b) =>
    (buildingCountByArchitect.get(b.slug) || 0) - (buildingCountByArchitect.get(a.slug) || 0)
  )
  const visualArchitects = rankedArchitects.filter(architect => architectVisualBySlug.get(architect.slug))
  const featuredArchitects = visualArchitects.slice(0, 8)
  const compactArchitects = visualArchitects.slice(8, 24)

  const eraGroups = [...eras]
    .sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))
    .map(era => ({
      era,
      architects: rankedArchitects.filter(architect => matchesTaxonomy(architect.era_slug, era)).slice(0, 5),
    }))
    .filter(group => group.architects.length > 0)

  const eraItems: BrowseItem[] = [...eras]
    .sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))
    .map(era => {
      const architectCount = architectsForEra(era).length
      const buildingCount = buildingsForEra(era).length
      return {
        id: era.id,
        href: `${prefix}/browse/era/${era.slug}`,
        label: displayName(era, lang),
        meta: [
          era.year_start ? `${era.year_start}${era.year_end ? `-${era.year_end}` : ''}` : '',
          architectCount > 0 ? `${architectCount} ${t(lang, 'architects')}` : '',
          buildingCount > 0 ? `${buildingCount} ${t(lang, 'buildings')}` : '',
        ].filter(Boolean).join(' · '),
        count: architectCount + buildingCount,
      }
    })
    .filter(item => item.count > 0)

  const styleItems: BrowseItem[] = [...styles]
    .map(style => ({ style, count: architectsForStyle(style).length }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count)
    .map(({ style, count }) => ({
      id: style.id,
      href: `${prefix}/browse/style/${style.slug}`,
      label: displayTaxonomyName(style, lang),
      meta: [eraLabelFor(style.era_slug), `${count} ${t(lang, 'architects')}`].filter(Boolean).join(' · '),
    }))
    .filter(item => item.label)
    .slice(0, 18)

  const typeItems: BrowseItem[] = [...types]
    .map(type => ({ type, count: typeCountFor(type) }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 16)
    .map(({ type, count }) => ({
      id: type.id,
      href: `${prefix}/browse/type/${type.slug}`,
      label: displayTaxonomyName(type, lang),
      meta: `${count} ${t(lang, 'buildings')}`,
    }))
    .filter(item => item.label)

  const countryItems = topCountries(buildings, lang).map(country => ({
    id: country.name,
    href: `${prefix}/browse/country/${country.code}`,
    label: country.name,
    meta: `${country.count} ${t(lang, 'buildings')}`,
  }))

  const architectMap = new Map(architects.map(a => [a.slug, displayName(a, lang)]))
  const featuredBuildings = qualityBuildings.slice(0, 6)
  const historyPathCount = eraItems.length + styleItems.length
  const archiveGroups = [
    {
      title: lang === 'en' ? 'Periods' : lang === 'ja' ? '時代' : '时代',
      body: lang === 'en' ? 'Read works and architects through time.' : lang === 'ja' ? '時代ごとに建築家と作品を読む。' : '按时代阅读建筑师与作品。',
      items: eraItems.slice(0, 8),
    },
    {
      title: t(lang, 'styles'),
      body: lang === 'en' ? 'Open formal languages and related works.' : lang === 'ja' ? '様式や形式言語から関連作品へ入る。' : '从风格与形式语言进入相关作品。',
      items: styleItems.slice(0, 10),
      actionHref: `${prefix}/browse/style`,
    },
    {
      title: t(lang, 'types'),
      body: lang === 'en' ? 'Browse by program and use.' : lang === 'ja' ? '用途・建築種別から作品を探す。' : '按用途和建筑类型浏览。',
      items: typeItems.slice(0, 8),
    },
    {
      title: t(lang, 'countries'),
      body: lang === 'en' ? 'Jump by country or region.' : lang === 'ja' ? '国・地域から建築を探す。' : '按国家和地区进入。',
      items: countryItems.slice(0, 8),
      actionHref: `${prefix}/browse/country`,
    },
  ]

  return (
    <PageShell width="archive">
      <header className="section">
        <p className="eyebrow mb-4">{lang === 'en' ? 'Archive index' : lang === 'ja' ? 'アーカイブ索引' : '档案索引'}</p>
        <h1 className="heading-display mb-4">{t(lang, 'browse')}</h1>
        <p className="body-large max-w-3xl">
          {lang === 'en'
            ? 'Choose a path into the archive: architects, works, periods, styles, building types, or regions.'
            : lang === 'ja'
            ? '建築家、作品、時代、様式、建築種別、地域からアーカイブへ入る。'
            : '选择一条进入档案的路径：建筑师、作品、时代、风格、类型或地域。'}
        </p>
      </header>

      <Reveal>
        <section className="section pt-0">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <EntryCard href={`${prefix}/browse/architects`} label={t(lang, 'architects')} value={`${architects.length}`} meta={lang === 'en' ? 'people' : lang === 'ja' ? '人' : '人物'} />
            <EntryCard href={`${prefix}/browse/buildings`} label={lang === 'en' ? 'Works' : lang === 'ja' ? '作品' : '建筑作品'} value={`${qualityBuildings.length}`} meta={t(lang, 'buildings')} />
            <EntryCard href={`${prefix}/browse/style`} label={lang === 'en' ? 'Periods and styles' : lang === 'ja' ? '時代と様式' : '时代与风格'} value={`${historyPathCount}`} meta={lang === 'en' ? 'archive entries' : lang === 'ja' ? '入口' : '可浏览入口'} />
            <EntryCard href={`${prefix}/browse/country`} label={t(lang, 'countries')} value={`${countryItems.length}`} meta={lang === 'en' ? 'regions' : lang === 'ja' ? '地域' : '地区'} />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="architect-lineage" className="section border-t border-subtle pt-10 sm:pt-12">
          <SectionHeading
            title={t(lang, 'architects')}
            description={lang === 'en' ? 'Start with major figures, then continue by period.' : lang === 'ja' ? '主要な建築家から入り、時代別にたどる。' : '先看重要建筑师，再按时代继续浏览。'}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredArchitects.map((architect, index) => (
              <FeaturedArchitect
                key={architect.id}
                architect={architect}
                count={buildingCountByArchitect.get(architect.slug) || 0}
                lang={lang}
                prefix={prefix}
                eraLabel={eraLabelFor(architect.era_slug)}
                visualUrl={architectVisualBySlug.get(architect.slug)}
                priority={index < 4}
              />
            ))}
          </div>
          {eraGroups.length > 0 && (
            <PeriodPath
              groups={eraGroups.slice(0, 6)}
              lang={lang}
              prefix={prefix}
            />
          )}
          {compactArchitects.length > 0 && (
            <div className="mt-8">
              <p className="eyebrow mb-3">{lang === 'en' ? 'More architects' : lang === 'ja' ? 'その他の建築家' : '更多建筑师'}</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {compactArchitects.map(architect => (
                  <ArchitectCard
                    key={architect.id}
                    architect={architect}
                    lang={lang}
                    eraLabel={eraLabelFor(architect.era_slug)}
                    visualUrl={architectVisualBySlug.get(architect.slug)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </Reveal>

      <Reveal>
        <section id="building-index" className="section border-t border-subtle pt-10 sm:pt-12">
          <SectionHeading
            title={lang === 'en' ? 'Works' : lang === 'ja' ? '作品' : '建筑作品'}
            description={lang === 'en' ? 'Read representative works through type, place, and authorship.' : lang === 'ja' ? '代表作を、類型、場所、作者性から読む。' : '从类型、地域与作者关系阅读代表作品。'}
          />
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBuildings.map(building => (
                <BuildingCard key={building.id} building={building} lang={lang} architectName={architectMap.get(building.architect_slug || '') || ''} />
              ))}
            </div>
            <Link href={`${prefix}/browse/buildings`} className="interactive-row group flex items-center justify-between gap-4 border-y border-subtle px-2 py-4">
              <span>
                <span className="label block">{lang === 'en' ? 'Open the complete works index' : lang === 'ja' ? '作品アーカイブを開く' : '打开完整建筑作品索引'}</span>
                <span className="mt-1 block text-sm text-secondary">{qualityBuildings.length} {t(lang, 'buildings')}</span>
              </span>
              <span className="text-lg text-primary transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </Reveal>

      {(eraItems.length > 0 || styleItems.length > 0 || typeItems.length > 0 || countryItems.length > 0) && (
        <Reveal>
          <section id="history-index" className="section scroll-mt-20 border-t border-subtle pt-10 sm:pt-12">
            <SectionHeading
              title={lang === 'en' ? 'Other ways in' : lang === 'ja' ? 'ほかの入口' : '其他入口'}
              description={lang === 'en' ? 'Use period, style, program, or region only when they help you narrow the archive.' : lang === 'ja' ? '時代、様式、用途、地域は、作品や建築家を絞り込むための入口として使います。' : '时代、风格、用途和地域只作为筛选建筑师与作品的入口。'}
            />
            <div className="grid items-start gap-4 md:grid-cols-2">
              {archiveGroups.map(group => (
                <ArchiveGroup key={group.title} {...group} actionLabel={t(lang, 'viewAll')} />
              ))}
            </div>
          </section>
        </Reveal>
      )}
    </PageShell>
  )
}

function countBy<T>(items: T[], getKey: (item: T) => string | null | undefined): Map<string, number> {
  const counts = new Map<string, number>()
  items.forEach(item => {
    const key = getKey(item)
    if (key) counts.set(key, (counts.get(key) || 0) + 1)
  })
  return counts
}

function buildArchitectVisualMap(buildings: BuildingWithCover[]): Map<string, string> {
  const visuals = new Map<string, string>()
  buildings.forEach(building => {
    if (!building.architect_slug || !building.cover_url || visuals.has(building.architect_slug)) return
    visuals.set(building.architect_slug, building.cover_url)
  })
  return visuals
}

function topCountries(buildings: Building[], lang: string): Array<{ code: string; name: string; count: number }> {
  const countries = new Map<string, { code: string; name: string; count: number }>()
  buildings.forEach(building => {
    const code = building.country_code?.toLowerCase()
    const name = building.country
    if (!code || !name) return
    const current = countries.get(code) || { code, name, count: 0 }
    current.count += 1
    current.name = formatCountryName(code, name, lang) || name
    countries.set(code, current)
  })
  return [...countries.values()].sort((a, b) => b.count - a.count).slice(0, 12)
}

function EntryCard({ href, label, value, meta }: { href: string; label: string; value: string; meta: string }) {
  return (
    <Link href={href} className="interactive-row group border-y border-subtle px-2 py-4">
      <p className="label">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <span className="font-serif-display text-4xl leading-none text-primary">{value}</span>
        <span className="caption text-right">{meta}</span>
      </div>
    </Link>
  )
}

function FeaturedArchitect({
  architect,
  count,
  lang,
  prefix,
  eraLabel,
  visualUrl,
  priority = false,
}: {
  architect: Architect
  count: number
  lang: string
  prefix: string
  eraLabel: string
  visualUrl?: string | null
  priority?: boolean
}) {
  const years = architect.birth_year ? `${architect.birth_year}-${architect.death_year || (lang === 'en' ? 'present' : lang === 'ja' ? '現在' : '至今')}` : ''
  const portrait = getArchitectImageOverride(architect.slug)
  const portraitAlt = portrait?.alt[lang as keyof typeof portrait.alt] || portrait?.alt.en || displayName(architect, lang)
  return (
    <Link href={`${prefix}/architect/${architect.slug}`} className="group block border-y border-subtle pb-4 transition-colors hover:bg-surface-muted/45">
      <ArchitectPortraitThumb
        src={portrait?.url}
        fallbackSrc={visualUrl}
        alt={portraitAlt}
        fallback={displayName(architect, lang)}
        className="aspect-[4/3] rounded-sm"
        sizes="(max-width: 1024px) 50vw, 20vw"
        priority={priority}
      />
      <div className="pt-4">
        <p className="caption mb-3">{[years, architect.nationalities?.[0] ? localizedNationality(architect.nationalities[0], lang) : ''].filter(Boolean).join(' · ')}</p>
        <h3 className="text-lg font-medium leading-snug text-primary transition-colors group-hover:text-accent">{displayName(architect, lang)}</h3>
        {(eraLabel || count > 0) && (
          <p className="mt-4 text-xs leading-relaxed text-muted">
            {[eraLabel, count > 0 ? `${count} ${lang === 'en' ? 'works' : lang === 'ja' ? '作品' : '作品'}` : ''].filter(Boolean).join(' · ')}
          </p>
        )}
      </div>
    </Link>
  )
}

function PeriodPath({ groups, lang, prefix }: { groups: Array<{ era: Era; architects: Architect[] }>; lang: string; prefix: string }) {
  return (
    <div className="mt-10 border-y border-subtle py-7">
      <div className="mb-6 grid gap-3 md:grid-cols-[16rem_minmax(0,1fr)] md:items-end">
        <div>
          <p className="eyebrow mb-2">{lang === 'en' ? 'Period route' : lang === 'ja' ? '時代別' : '时代路径'}</p>
          <h3 className="heading-3">{lang === 'en' ? 'Read by turning points' : lang === 'ja' ? '時代の入口から読む' : '按时代入口阅读'}</h3>
        </div>
        <p className="caption max-w-2xl md:justify-self-end md:text-right">
          {lang === 'en'
            ? 'Each row is a doorway into one period: open the period, then compare the key architects beside it.'
            : lang === 'ja'
              ? '各行は時代ページへの入口です。時代を開き、横に並ぶ代表的な建築家と比較します。'
              : '每一行都是进入某个时代的入口：先打开时代，再对照旁边的代表建筑师。'}
        </p>
      </div>
      <div className="grid gap-0">
        {groups.map((group, index) => (
          <EraLineage key={group.era.id} era={group.era} architects={group.architects.slice(0, 4)} lang={lang} prefix={prefix} index={index + 1} />
        ))}
      </div>
    </div>
  )
}

function EraLineage({ era, architects, lang, prefix, index }: { era: Era; architects: Architect[]; lang: string; prefix: string; index: number }) {
  return (
    <div className="grid gap-4 border-t border-subtle py-4 first:border-t-0 md:grid-cols-[3rem_12rem_minmax(0,1fr)_5rem] md:items-start">
      <p className="caption tabular-nums">{String(index).padStart(2, '0')}</p>
      <div>
        <Link href={`${prefix}/browse/era/${era.slug}`} className="body-sm font-medium text-primary transition-colors hover:text-accent">
          {displayName(era, lang)}
        </Link>
        <p className="caption mt-1">{era.year_start ? `${era.year_start}${era.year_end ? `-${era.year_end}` : ''}` : ''}</p>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {architects.map(architect => (
          <Link key={architect.id} href={`${prefix}/architect/${architect.slug}`} className="text-sm leading-relaxed text-secondary transition-colors hover:text-primary">
            {displayName(architect, lang)}
          </Link>
        ))}
      </div>
      <Link href={`${prefix}/browse/era/${era.slug}`} className="text-xs font-medium text-accent md:text-right">
        {lang === 'en' ? 'Open' : lang === 'ja' ? '開く' : '打开'} →
      </Link>
    </div>
  )
}

function ArchiveGroup({
  title,
  body,
  items,
  actionHref,
  actionLabel,
}: {
  title: string
  body: string
  items: BrowseItem[]
  actionHref?: string
  actionLabel: string
}) {
  if (items.length === 0) return null
  return (
    <div className="border-t border-subtle pt-4">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium text-primary">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-secondary">{body}</p>
        </div>
        {actionHref && (
          <Link href={actionHref} className="shrink-0 text-xs text-accent underline underline-offset-4">
            {actionLabel}
          </Link>
        )}
      </div>
      <div className="divide-y divide-[color:var(--ui-border-subtle)]">
        {items.map(item => (
          <Link key={item.id} href={item.href} className="interactive-row group grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-2 py-3">
            <span className="min-w-0 truncate text-sm font-medium text-primary transition-colors group-hover:text-accent">{item.label}</span>
            <span className="caption text-right">{item.meta}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
