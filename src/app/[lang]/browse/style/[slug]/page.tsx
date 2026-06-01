import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { t } from '@/lib/i18n'
import { getEras } from '@/lib/data'
import { getStyleRelations } from '@/lib/relations'
import { displayName, type Architect, type Building, type Era, type Style } from '@/lib/types'
import { findTimelinePeriodForEra, localizedTimelineText, type TimelinePeriod } from '@/lib/timeline-periods'
import PageShell from '@/components/PageShell'
import Badge from '@/components/Badge'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import ArchitectCard from '@/components/ArchitectCard'
import BuildingCard from '@/components/BuildingCard'

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
        <div className="rounded-md border border-subtle bg-surface p-5 shadow-semantic-card sm:p-6">
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
      meta: [building.year_start, building.city || building.country].filter(Boolean).join(' · '),
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
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(card => (
            <Link key={card.key} href={card.href} className="group rounded-md border border-subtle bg-surface p-4 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted">
              <p className="label mb-4">{card.label}</p>
              <h3 className="text-lg font-medium leading-snug text-primary transition-colors group-hover:text-accent">{card.title}</h3>
              {card.meta && <p className="caption mt-2">{card.meta}</p>}
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
  const name = displayName(rels.style, lang)
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
  const archMap = new Map(architects.map(a => [a.slug, a.name_zh || a.name_en]))
  const styleName = displayName(style, lang)
  const allEras = await getEras()
  const contextEra = era || inferEraFromStyleWorks(buildings, allEras)
  const timelinePeriod = contextEra ? findTimelinePeriodForEra(contextEra) : null

  return (
    <PageShell>
      <header className="section">
        <p className="eyebrow mb-4">{t(lang, 'styles')}</p>
        <h1 className="heading-display mb-3">{styleName}</h1>
        {era && <p className="body-sm">{displayName(era, lang)}</p>}
      </header>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {[
          [architects.length, t(lang, 'architects')],
          [buildings.length, t(lang, 'buildings')],
          [childStyles.length, lang === 'en' ? 'Substyles' : lang === 'ja' ? '下位様式' : '子风格'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-md border border-subtle bg-surface px-4 py-3 shadow-semantic-card">
            <p className="label">{label}</p>
            <p className="mt-3 font-serif-display text-4xl leading-none text-primary">{value}</p>
          </div>
        ))}
      </div>

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

      {(parentStyle || childStyles.length > 0) && (
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <SectionHeading title={lang === 'en' ? 'Style relations' : lang === 'ja' ? '様式の関係' : '风格关系'} />
          {parentStyle && (
            <p className="body-sm">
              ← <Link href={`${prefix}/browse/style/${parentStyle.slug}`} className="text-accent underline underline-offset-4">{displayName(parentStyle, lang)}</Link>
            </p>
          )}
          {childStyles.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {childStyles.map(cs => (
                <Link key={cs.id} href={`${prefix}/browse/style/${cs.slug}`}>
                  <Badge>→ {displayName(cs, lang)}</Badge>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {architects.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <SectionHeading title={`${t(lang, 'architects')} (${architects.length})`} />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {architects.map(a => <ArchitectCard key={a.id} architect={a} lang={lang} />)}
            </div>
          </section>
        </Reveal>
      )}

      {buildings.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <SectionHeading title={`${t(lang, 'buildings')} (${buildings.length})`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {buildings.slice(0, 18).map(b => (
                <BuildingCard key={b.id} building={b} lang={lang}
                  architectName={archMap.get(b.architect_slug || '') || ''} />
              ))}
            </div>
            {buildings.length > 18 && <p className="caption mt-4 text-center">+{buildings.length - 18} more</p>}
          </section>
        </Reveal>
      )}
    </PageShell>
  )
}
