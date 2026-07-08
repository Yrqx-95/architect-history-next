import { formatDisplayLocation } from '@/lib/display'
import { displayTaxonomyName } from '@/lib/taxonomy-display'
import type { Architect, Building, BuildingWithCover, Era, Style } from '@/lib/types'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { t } from '@/lib/i18n'
import { getEras } from '@/lib/data'
import { getStyleRelations } from '@/lib/relations'
import { displayName } from '@/lib/display'
import { findTimelinePeriodForEra, localizedTimelineText, type TimelinePeriod } from '@/lib/timeline-periods'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'
import ArchitectPortraitThumb from '@/components/ArchitectPortraitThumb'
import SafeImage from '@/components/SafeImage'
import { getArchitectImageOverride } from '@/lib/architect-images'

export const dynamicParams = true

function inferEraFromStyleWorks(buildings: Building[], eras: Era[]): Era | null {
  const scores = new Map<string, number>()
  const bySlug = new Map(eras.map(era => [era.slug, era]))

  buildings.forEach(building => {
    if (building.era_slug && bySlug.has(building.era_slug)) {
      scores.set(building.era_slug, (scores.get(building.era_slug) || 0) + 3)
      return
    }

    if (building.year_start == null) return
    const era = eras.find(item => {
      if (item.year_start == null) return false
      const end = item.year_end ?? item.year_start
      return building.year_start! >= item.year_start && building.year_start! <= end
    })
    if (era) scores.set(era.slug, (scores.get(era.slug) || 0) + 1)
  })

  const winner = [...scores.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
  return winner ? bySlug.get(winner) || null : null
}

function StylePeriodContext({
  lang,
  prefix,
  era,
  period,
}: {
  lang: string
  prefix: string
  era: Era | null
  period: TimelinePeriod | null
}) {
  if (!era || !period) return null

  const copy = {
    eyebrow: { zh: '时代背景', en: 'Period context', ja: '時代背景' },
    question: { zh: '这个风格回应的问题', en: 'Question behind this style', ja: 'この様式が応答した問い' },
    turn: { zh: '历史转向', en: 'Historical turn', ja: '歴史の転換' },
    eraLink: { zh: '进入时代页', en: 'Open period page', ja: '時代ページへ' },
    timelineLink: { zh: '查看时间轴', en: 'View timeline', ja: '時間軸を見る' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en

  return (
    <Reveal>
      <section className="section-sm border-t border-subtle pt-8 sm:pt-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.68fr)_minmax(16rem,0.32fr)]">
          <div>
            <p className="eyebrow mb-3">{l('eyebrow')}</p>
            <p className="metadata mb-4">
              {displayName(era, lang)} · {era.year_start}{era.year_end ? `-${era.year_end}` : ''}
            </p>
            <h2 className="text-2xl font-medium leading-tight text-primary sm:text-3xl">
              {localizedTimelineText(period.question, lang)}
            </h2>
            <p className="body-sm mt-4 max-w-3xl text-secondary">
              {localizedTimelineText(period.summary, lang)}
            </p>
          </div>
          <aside className="border-t border-subtle pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="label mb-3">{l('turn')}</p>
            <p className="caption">{localizedTimelineText(period.transition, lang)}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={`${prefix}/browse/era/${era.slug}`} className="text-sm font-medium text-accent underline underline-offset-4">
                {l('eraLink')}
              </Link>
              <Link href={`${prefix}/timeline#period-${period.id}`} className="text-sm font-medium text-accent underline underline-offset-4">
                {l('timelineLink')}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </Reveal>
  )
}

function StyleReadingPaths({
  lang,
  prefix,
  parentStyle,
  childStyles,
  era,
  architects,
  buildings,
}: {
  lang: string
  prefix: string
  parentStyle: Style | null
  childStyles: Style[]
  era: Era | null
  architects: Architect[]
  buildings: Building[]
}) {
  const copy = {
    eyebrow: { zh: '知识网络', en: 'Knowledge network', ja: '知識ネットワーク' },
    title: { zh: '阅读路径', en: 'Reading paths', ja: '読み進める経路' },
    intro: {
      zh: '从上级风格、时代背景、分支、代表人物和作品继续理解这个风格。',
      en: 'Continue through parent styles, period context, branches, figures, and works.',
      ja: '上位様式、時代背景、分岐、代表的な人物と作品から、この様式を読み進める。',
    },
    parent: { zh: '上级风格', en: 'Parent style', ja: '上位様式' },
    period: { zh: '时代背景', en: 'Period context', ja: '時代背景' },
    branch: { zh: '风格分支', en: 'Style branch', ja: '様式の分岐' },
    architect: { zh: '代表人物', en: 'Figure', ja: '代表人物' },
    building: { zh: '代表作品', en: 'Work', ja: '代表作' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
  const cards = [
    parentStyle && {
      key: `parent-${parentStyle.slug}`,
      href: `${prefix}/browse/style/${parentStyle.slug}`,
      label: l('parent'),
      title: displayName(parentStyle, lang),
      meta: '',
    },
    era && {
      key: `era-${era.slug}`,
      href: `${prefix}/browse/era/${era.slug}`,
      label: l('period'),
      title: displayName(era, lang),
      meta: era.year_start ? `${era.year_start}${era.year_end ? `–${era.year_end}` : ''}` : '',
    },
    ...childStyles.slice(0, 2).map(style => ({
      key: `child-${style.slug}`,
      href: `${prefix}/browse/style/${style.slug}`,
      label: l('branch'),
      title: displayName(style, lang),
      meta: '',
    })),
    ...architects.slice(0, 2).map(architect => ({
      key: `architect-${architect.slug}`,
      href: `${prefix}/architect/${architect.slug}`,
      label: l('architect'),
      title: displayName(architect, lang),
      meta: architect.birth_year ? `${architect.birth_year}–${architect.death_year || (lang === 'en' ? 'present' : lang === 'ja' ? '現在' : '至今')}` : '',
    })),
    ...buildings.slice(0, 2).map(building => ({
      key: `building-${building.slug}`,
      href: `${prefix}/building/${building.slug}`,
      label: l('building'),
      title: displayName(building, lang),
      meta: [
        building.year_start,
        formatDisplayLocation({
          city: building.city,
          country: building.country,
          countryCode: building.country_code,
          lang,
        }),
      ].filter(Boolean).join(' · '),
    })),
  ].filter(Boolean) as Array<{ key: string; href: string; label: string; title: string; meta: string }>

  if (cards.length === 0) return null

  return (
    <Reveal>
      <section className="section-sm border-t border-subtle pt-8 sm:pt-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2">{l('eyebrow')}</p>
            <h2 className="heading-3">{l('title')}</h2>
          </div>
          <p className="caption max-w-lg sm:text-right">{l('intro')}</p>
        </div>
        <div className="grid gap-x-8 gap-y-6 lg:grid-cols-2">
          {cards.map(card => (
            <Link key={card.key} href={card.href} className="interactive-row group grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-t border-subtle py-4">
              <p className="label">{card.label}</p>
              <span className="min-w-0">
                <span className="block text-base font-medium leading-snug text-primary transition-colors group-hover:text-accent">{card.title}</span>
                {card.meta && <span className="caption mt-1 block">{card.meta}</span>}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const rels = await getStyleRelations(slug)
  if (!rels) return { title: 'Not Found' }
  const name = displayTaxonomyName(rels.style, lang)
  return { title: name, description: `${rels.architects.length} architects · ${rels.buildings.length} buildings` }
}

export async function generateStaticParams() {
  const { getStyles } = await import('@/lib/data')
  const styles = await getStyles()
  return ['zh','en','ja'].flatMap(lang => styles.map(s => ({ lang, slug: s.slug })))
}

export default async function StylePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const rels = await getStyleRelations(slug)
  if (!rels) notFound()

  const { style, architects, buildings, parentStyle, childStyles, era } = rels
  const prefix = `/${lang}`
  const archMap = new Map(architects.map(a => [a.slug, displayName(a, lang)]))
  const styleName = displayTaxonomyName(style, lang)
  const allEras = await getEras()
  const contextEra = era || inferEraFromStyleWorks(buildings, allEras)
  const timelinePeriod = contextEra ? findTimelinePeriodForEra(contextEra) : null

  return (
    <PageShell>
      <header className="section border-b border-subtle pb-8 sm:pb-10">
        <p className="eyebrow mb-4">{t(lang, 'styles')}</p>
        <h1 className="heading-display mb-3">{styleName}</h1>
        <p className="body-large max-w-3xl">{styleIntro(style, styleName, architects, buildings, contextEra, lang)}</p>
        <div className="mt-7 grid gap-3 border-y border-subtle py-4 sm:grid-cols-3">
          <IndexStat value={architects.length} label={t(lang, 'architects')} />
          <IndexStat value={buildings.length} label={t(lang, 'buildings')} />
          <IndexStat value={childStyles.length} label={lang === 'en' ? 'Substyles' : lang === 'ja' ? '下位様式' : '子风格'} />
        </div>
      </header>

      <StyleDossier
        lang={lang}
        style={style}
        styleName={styleName}
        era={contextEra}
        architects={architects}
        buildings={buildings}
      />

      <StylePeriodContext lang={lang} prefix={prefix} era={contextEra} period={timelinePeriod} />

      <StyleReadingPaths
        lang={lang}
        prefix={prefix}
        parentStyle={parentStyle}
        childStyles={childStyles}
        era={era}
        architects={architects}
        buildings={buildings}
      />

      {architects.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <ListHeader
              title={`${t(lang, 'architects')} (${architects.length})`}
              description={lang === 'en' ? 'People most directly connected to this style in the current archive.' : lang === 'ja' ? '現在のアーカイブで、この様式に直接結びつく人物。' : '当前档案中与这一风格直接相关的人物。'}
            />
            <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2">
              {architects.map(a => <ArchitectRow key={a.id} architect={a} lang={lang} />)}
            </div>
          </section>
        </Reveal>
      )}

      {buildings.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <ListHeader
              title={`${t(lang, 'buildings')} (${buildings.length})`}
              description={lang === 'en' ? 'Verified works associated with this style.' : lang === 'ja' ? 'この様式に関連づけられた確認済みの作品。' : '与这一风格相关的已确认作品。'}
            />
            <div className="grid gap-x-8 gap-y-10 lg:grid-cols-2">
              {buildings.map(b => (
                <BuildingRow key={b.id} building={b as BuildingWithCover} lang={lang}
                  architectName={archMap.get(b.architect_slug || '') || ''} />
              ))}
            </div>
          </section>
        </Reveal>
      )}
    </PageShell>
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

function StyleDossier({
  lang,
  style,
  styleName,
  era,
  architects,
  buildings,
}: {
  lang: string
  style: Style
  styleName: string
  era: Era | null
  architects: Architect[]
  buildings: Building[]
}) {
  const keywords = style.keywords?.filter(Boolean).slice(0, 8) || []
  const years = buildings.map(building => building.year_start).filter((year): year is number => typeof year === 'number')
  const range = years.length ? `${Math.min(...years)}-${Math.max(...years)}` : ''
  const leadArchitects = architects.slice(0, 4).map(architect => displayName(architect, lang)).filter(Boolean)
  const leadWorks = buildings.slice(0, 4).map(building => displayName(building, lang)).filter(Boolean)

  return (
    <Reveal>
      <section className="section-sm pt-8 sm:pt-10">
        <div className="grid gap-8 border-t border-subtle pt-6 lg:grid-cols-[minmax(0,0.64fr)_minmax(16rem,0.36fr)]">
          <div>
            <p className="eyebrow mb-3">{lang === 'en' ? 'Dossier' : lang === 'ja' ? '資料概要' : '资料概要'}</p>
            <h2 className="heading-3">{lang === 'en' ? `How to read ${styleName}` : lang === 'ja' ? `${styleName}の読み方` : `如何阅读${styleName}`}</h2>
            <p className="body-sm mt-4 max-w-3xl text-secondary">
              {styleDossierText({ lang, styleName, era, range, leadArchitects, leadWorks })}
            </p>
          </div>
          <aside className="border-t border-subtle pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="label mb-3">{lang === 'en' ? 'Archive signals' : lang === 'ja' ? 'アーカイブ上の手がかり' : '档案线索'}</p>
            <div className="grid divide-y divide-[color:var(--ui-border-subtle)]">
              {era && <SignalRow label={lang === 'en' ? 'Period' : lang === 'ja' ? '時代' : '时代'} value={displayName(era, lang)} />}
              {range && <SignalRow label={lang === 'en' ? 'Works range' : lang === 'ja' ? '作品年代' : '作品年代'} value={range} />}
              {keywords.length > 0 && <SignalRow label={lang === 'en' ? 'Keywords' : lang === 'ja' ? 'キーワード' : '关键词'} value={keywords.join(' · ')} />}
            </div>
          </aside>
        </div>
      </section>
    </Reveal>
  )
}

function SignalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-3 py-3">
      <p className="caption">{label}</p>
      <p className="body-sm text-primary">{value}</p>
    </div>
  )
}

function ListHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow mb-2">{title}</p>
        <h2 className="heading-3">{title}</h2>
      </div>
      <p className="caption max-w-lg sm:text-right">{description}</p>
    </div>
  )
}

function ArchitectRow({ architect, lang }: { architect: Architect; lang: string }) {
  const portrait = getArchitectImageOverride(architect.slug)
  const years = architect.birth_year ? `${architect.birth_year}-${architect.death_year || (lang === 'en' ? 'present' : lang === 'ja' ? '現在' : '至今')}` : ''
  const name = displayName(architect, lang)
  return (
    <Link href={`/${lang}/architect/${architect.slug}`} className="interactive-row group grid min-h-[4.75rem] grid-cols-[4rem_minmax(0,1fr)] gap-3 border-t border-subtle py-3">
      <ArchitectPortraitThumb
        src={portrait?.url}
        alt={portrait?.alt[lang as keyof typeof portrait.alt] || portrait?.alt.en || name}
        fallback={name}
        className="h-14 w-14 rounded-sm"
        sizes="3.5rem"
      />
      <span className="min-w-0 self-center">
        <span className="block truncate text-sm font-medium text-primary transition-colors group-hover:text-accent">{name}</span>
        {years && <span className="caption mt-1 block truncate">{years}</span>}
      </span>
    </Link>
  )
}

function BuildingRow({ building, lang, architectName }: { building: BuildingWithCover; lang: string; architectName: string }) {
  const name = displayName(building, lang)
  const location = formatDisplayLocation({
    city: building.city,
    country: building.country,
    countryCode: building.country_code,
    lang,
  })
  return (
    <Link href={`/${lang}/building/${building.slug}`} className="interactive-row group grid min-h-[4.75rem] grid-cols-[4rem_minmax(0,1fr)] gap-3 border-t border-subtle py-3">
      <span className="relative h-14 w-14 overflow-hidden rounded-sm bg-surface-muted">
        {building.cover_url ? (
          <SafeImage src={building.cover_url} alt={name} fill className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]" sizes="3.5rem" />
        ) : (
          <span className="flex h-full w-full items-center justify-center px-1 text-center text-[0.62rem] leading-tight text-muted">{name}</span>
        )}
      </span>
      <span className="min-w-0 self-center">
        <span className="block truncate text-sm font-medium text-primary transition-colors group-hover:text-accent">{name}</span>
        <span className="caption mt-1 block truncate">
          {[architectName, location, building.year_start].filter(Boolean).join(' · ')}
        </span>
      </span>
    </Link>
  )
}

function styleIntro(style: Style, styleName: string, architects: Architect[], buildings: Building[], era: Era | null, lang: string) {
  const description = style.description || {}
  const localized = description[lang] || description.en || description.zh
  if (localized) return localized
  if (lang === 'en') return `${styleName} is represented here through ${architects.length} architect${architects.length === 1 ? '' : 's'} and ${buildings.length} verified work${buildings.length === 1 ? '' : 's'}${era ? ` connected to ${displayName(era, lang)}` : ''}.`
  if (lang === 'ja') return `${styleName}は、現在のアーカイブでは${architects.length}人の建築家と${buildings.length}件の確認済み作品${era ? `、${displayName(era, lang)}の文脈` : ''}から読むことができます。`
  return `${styleName}目前可通过 ${architects.length} 位建筑师与 ${buildings.length} 个已确认作品${era ? `，以及${displayName(era, lang)}的历史语境` : ''}来阅读。`
}

function styleDossierText({
  lang,
  styleName,
  era,
  range,
  leadArchitects,
  leadWorks,
}: {
  lang: string
  styleName: string
  era: Era | null
  range: string
  leadArchitects: string[]
  leadWorks: string[]
}) {
  const eraText = era ? displayName(era, lang) : ''
  if (lang === 'en') {
    return [
      `${styleName} is best read as a set of formal decisions rather than a single visual label.`,
      eraText ? `Its current archive context is ${eraText}.` : '',
      range ? `The verified works in this archive span ${range}.` : '',
      leadArchitects.length ? `Key figures include ${leadArchitects.join(', ')}.` : '',
      leadWorks.length ? `Begin with ${leadWorks.join(', ')} to compare space, structure, and historical intent.` : '',
    ].filter(Boolean).join(' ')
  }
  if (lang === 'ja') {
    return [
      `${styleName}は、単なる見た目の分類ではなく、構造、空間、装飾、都市的意図のまとまりとして読むと整理しやすくなります。`,
      eraText ? `現在の資料では${eraText}の文脈と結びついています。` : '',
      range ? `確認済み作品の年代は${range}に広がります。` : '',
      leadArchitects.length ? `代表的な人物として${leadArchitects.join('、')}を比較できます。` : '',
      leadWorks.length ? `まず${leadWorks.join('、')}を見ると、形式と空間の違いが読み取りやすくなります。` : '',
    ].filter(Boolean).join('')
  }
  return [
    `${styleName}不只是外观标签，更适合被理解为结构、空间、装饰和城市意图的组合方式。`,
    eraText ? `当前资料主要连接到${eraText}的历史语境。` : '',
    range ? `已确认作品的年代范围为 ${range}。` : '',
    leadArchitects.length ? `可先比较${leadArchitects.join('、')}等人物。` : '',
    leadWorks.length ? `再从${leadWorks.join('、')}等作品进入具体空间。` : '',
  ].filter(Boolean).join('')
}
