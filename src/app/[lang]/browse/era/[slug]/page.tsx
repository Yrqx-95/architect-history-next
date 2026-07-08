import type { Architect, Building, Era, Style } from '@/lib/types'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { t } from '@/lib/i18n'
import { getEras } from '@/lib/data'
import { getEraRelations } from '@/lib/relations'
import { displayName, formatDisplayLocation } from '@/lib/display'
import { findTimelinePeriodForEra, localizedTimelineText, type TimelinePeriod } from '@/lib/timeline-periods'
import PageShell from '@/components/PageShell'
import Badge from '@/components/Badge'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import ArchitectCard from '@/components/ArchitectCard'
import BuildingCard from '@/components/BuildingCard'

export const dynamicParams = true

function EraHistoricalQuestion({
  lang,
  prefix,
  period,
}: {
  lang: string
  prefix: string
  period: TimelinePeriod | null
}) {
  if (!period) return null

  const copy = {
    eyebrow: { zh: '历史问题', en: 'Historical question', ja: '歴史上の問い' },
    transition: { zh: '时代转向', en: 'Historical turn', ja: '時代の転換' },
    vocabulary: { zh: '关键词', en: 'Vocabulary', ja: 'キーワード' },
    timeline: { zh: '在时间轴中查看', en: 'View in timeline', ja: '時間軸で見る' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en

  return (
    <Reveal>
      <section className="section-sm border-t border-subtle pt-8 sm:pt-10">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(18rem,0.38fr)]">
          <div className="rounded-md border border-subtle bg-surface p-5 shadow-semantic-card sm:p-6">
            <p className="eyebrow mb-4">{l('eyebrow')}</p>
            <h2 className="max-w-3xl text-2xl font-medium leading-tight text-primary sm:text-3xl">
              {localizedTimelineText(period.question, lang)}
            </h2>
            <p className="body-sm mt-5 max-w-3xl text-secondary">
              {localizedTimelineText(period.summary, lang)}
            </p>
          </div>
          <aside className="rounded-md border border-subtle bg-surface-muted p-5 sm:p-6">
            <p className="label mb-3">{l('transition')}</p>
            <p className="body-sm text-secondary">{localizedTimelineText(period.transition, lang)}</p>
            <div className="mt-5 border-t border-subtle pt-5">
              <p className="label mb-3">{l('vocabulary')}</p>
              <div className="flex flex-wrap gap-1.5">
                {localizedTimelineText(period.movements, lang).map(item => (
                  <span key={item} className="rounded-full bg-surface px-2.5 py-1 text-[0.72rem] text-secondary">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <Link href={`${prefix}/timeline#period-${period.id}`} className="mt-5 inline-flex text-sm font-medium text-accent underline underline-offset-4">
              {l('timeline')}
            </Link>
          </aside>
        </div>
      </section>
    </Reveal>
  )
}

function EraReadingPaths({
  lang,
  prefix,
  previousEra,
  nextEra,
  styles,
  architects,
  buildings,
}: {
  lang: string
  prefix: string
  previousEra: Era | null
  nextEra: Era | null
  styles: Style[]
  architects: Architect[]
  buildings: Building[]
}) {
  const copy = {
    eyebrow: { zh: '知识网络', en: 'Knowledge network', ja: '知識ネットワーク' },
    title: { zh: '阅读路径', en: 'Reading paths', ja: '読み進める経路' },
    intro: {
      zh: '从前后时代、关键风格、代表人物和作品理解这一时期在建筑史中的位置。',
      en: 'Read this period through adjacent periods, key styles, figures, and works.',
      ja: '前後の時代、主要な様式、人物、作品から、この時代の位置を読む。',
    },
    previous: { zh: '上一时期', en: 'Previous period', ja: '前の時代' },
    next: { zh: '下一时期', en: 'Next period', ja: '次の時代' },
    style: { zh: '关键风格', en: 'Key style', ja: '主要様式' },
    architect: { zh: '代表人物', en: 'Figure', ja: '代表人物' },
    building: { zh: '代表作品', en: 'Work', ja: '代表作' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
  const periodMeta = (era: Era) => era.year_start ? `${era.year_start}${era.year_end ? `–${era.year_end}` : ''}` : ''
  const cards = [
    previousEra && {
      key: `previous-${previousEra.slug}`,
      href: `${prefix}/browse/era/${previousEra.slug}`,
      label: l('previous'),
      title: displayName(previousEra, lang),
      meta: periodMeta(previousEra),
    },
    nextEra && {
      key: `next-${nextEra.slug}`,
      href: `${prefix}/browse/era/${nextEra.slug}`,
      label: l('next'),
      title: displayName(nextEra, lang),
      meta: periodMeta(nextEra),
    },
    ...styles.slice(0, 2).map(style => ({
      key: `style-${style.slug}`,
      href: `${prefix}/browse/style/${style.slug}`,
      label: l('style'),
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
  const rels = await getEraRelations(slug)
  if (!rels) return { title: 'Not Found' }
  const name = displayName(rels.era, lang)
  return { title: name, description: `${rels.architects.length} architects · ${rels.buildings.length} buildings` }
}

export async function generateStaticParams() {
  const eras = await getEras()
  return ['zh','en','ja'].flatMap(lang => eras.map(e => ({ lang, slug: e.slug })))
}

export default async function EraPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const rels = await getEraRelations(slug)
  if (!rels) notFound()

  const { era, architects, buildings, styles } = rels
  const prefix = `/${lang}`
  const archMap = new Map(architects.map(a => [a.slug, a.name_zh || a.name_en]))
  const eraName = displayName(era, lang)
  const allEras = await getEras()
  const sortedEras = [...allEras].sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))
  const currentEraIndex = sortedEras.findIndex(item => item.slug === era.slug)
  const previousEra = currentEraIndex > 0 ? sortedEras[currentEraIndex - 1] : null
  const nextEra = currentEraIndex >= 0 && currentEraIndex < sortedEras.length - 1 ? sortedEras[currentEraIndex + 1] : null
  const timelinePeriod = findTimelinePeriodForEra(era)

  return (
    <PageShell>
      <header className="section">
        <p className="eyebrow mb-4">{t(lang, 'eras')}</p>
        <h1 className="heading-display mb-3">{eraName}</h1>
        {era.year_start && <p className="body-sm">{era.year_start} – {era.year_end || ''}</p>}
      </header>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {[
          [architects.length, t(lang, 'architects')],
          [buildings.length, t(lang, 'buildings')],
          [styles.length, t(lang, 'styles')],
        ].map(([value, label]) => (
          <div key={label} className="rounded-md border border-subtle bg-surface px-4 py-3 shadow-semantic-card">
            <p className="label">{label}</p>
            <p className="mt-3 font-serif-display text-4xl leading-none text-primary">{value}</p>
          </div>
        ))}
      </div>

      <EraHistoricalQuestion lang={lang} prefix={prefix} period={timelinePeriod} />

      <EraReadingPaths
        lang={lang}
        prefix={prefix}
        previousEra={previousEra}
        nextEra={nextEra}
        styles={styles}
        architects={architects}
        buildings={buildings}
      />

      {styles.length > 0 && (
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <SectionHeading title={t(lang, 'styles')} description={lang === 'en' ? 'Movements and vocabularies active in this period.' : lang === 'ja' ? 'この時代に関わる様式と語彙。' : '这一时期相关的风格与空间词汇。'} />
          <div className="flex flex-wrap gap-2">
            {styles.map(s => (
              <Link key={s.id} href={`${prefix}/browse/style/${s.slug}`}>
                <Badge>{displayName(s, lang)}</Badge>
              </Link>
            ))}
          </div>
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
          </section>
        </Reveal>
      )}
    </PageShell>
  )
}
