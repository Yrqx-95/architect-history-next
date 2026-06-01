import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildings } from '@/lib/data'
import { displayName } from '@/lib/types'
import { localizedTimelineText, timelinePeriods } from '@/lib/timeline-periods'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'
import TimelineRail from '@/components/TimelineRail'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return { title: t(lang, 'timeline'), description: t(lang, 'timelineTitle') }
}

export default async function TimelinePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const [architects, buildings] = await Promise.all([getArchitects(), getBuildings()])

  const datedBuildings = buildings.filter(building => building.year_start)
  const sortedBldgs = [...datedBuildings].sort((a, b) => (a.year_start || 0) - (b.year_start || 0))
  const architectMap = new Map(architects.map(architect => [architect.slug, architect]))

  const byDecade = new Map<number, typeof buildings>()
  sortedBldgs.forEach(b => {
    const decade = Math.floor((b.year_start || 0) / 10) * 10
    if (!byDecade.has(decade)) byDecade.set(decade, [])
    byDecade.get(decade)!.push(b)
  })

  const decades = [...byDecade.entries()].sort(([a], [b]) => a - b)
  const firstYear = sortedBldgs[0]?.year_start
  const latestYear = sortedBldgs[sortedBldgs.length - 1]?.year_start
  const featuredDecades = decades
    .filter(([, bldgs]) => bldgs.length >= 3)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 4)
  const railItems = decades.map(([decade, bldgs]) => ({
    id: `${decade}`,
    href: `#decade-${decade}`,
    label: `${decade}s`,
    meta: `${bldgs.length} ${lang === 'en' ? 'works' : lang === 'ja' ? '作品' : '作品'}`,
  }))
  const periodSummaries = timelinePeriods.map(period => {
    const [start, end] = period.range
    const periodBuildings = sortedBldgs.filter(building => {
      const year = building.year_start || 0
      return year >= start && year <= end
    })
    const activeArchitects = architects.filter(architect => {
      const birth = architect.birth_year || 9999
      const death = architect.death_year || latestYear || 2030
      return birth <= end && death >= start
    })
    return {
      ...period,
      buildings: periodBuildings.slice(0, 4),
      buildingCount: periodBuildings.length,
      architects: activeArchitects.slice(0, 4),
      architectCount: activeArchitects.length,
    }
  }).filter(period => period.buildingCount > 0 || period.architectCount > 0)

  return (
    <PageShell className="!max-w-[86rem]">
      <header className="section grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(20rem,0.55fr)] lg:items-end">
        <div>
          <p className="eyebrow mb-4">{lang === 'en' ? 'Timeline system' : lang === 'ja' ? '時間システム' : '时间系统'}</p>
          <h1 className="heading-display mb-4">{t(lang, 'timeline')}</h1>
          <p className="body-large max-w-2xl">
            {lang === 'en'
              ? 'Read architectural history in two ways: a continuous historical narrative, and a dense decade-by-decade atlas.'
              : lang === 'ja'
              ? '連続する歴史の流れと、年代ごとの密度ある索引の二つから建築史を読む。'
              : '用两种方式阅读建筑史：连续的历史叙事，以及按十年组织的密集索引。'}
          </p>
        </div>
        <div className="grid grid-cols-3 overflow-hidden rounded-md border border-subtle bg-surface shadow-semantic-card">
          <TimelineMetric value={decades.length} label={lang === 'en' ? 'decades' : lang === 'ja' ? '年代' : '年代段'} />
          <TimelineMetric value={datedBuildings.length} label={t(lang, 'buildings')} />
          <TimelineMetric value={firstYear && latestYear ? `${firstYear}-${latestYear}` : '—'} label={lang === 'en' ? 'range' : lang === 'ja' ? '範囲' : '范围'} />
        </div>
      </header>

      {featuredDecades.length > 0 && (
        <Reveal>
          <section className="section pt-0">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {featuredDecades.map(([decade, bldgs]) => (
                <a key={decade} href={`#decade-${decade}`} className="group rounded-md border border-subtle bg-surface p-4 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted">
                  <p className="label">{lang === 'en' ? 'high-density decade' : lang === 'ja' ? '高密度の年代' : '高密度年代'}</p>
                  <p className="mt-4 font-serif-display text-4xl leading-none text-primary transition-colors group-hover:text-accent">{decade}s</p>
                  <p className="caption mt-2">{bldgs.length} {t(lang, 'buildings')}</p>
                </a>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {railItems.length > 0 && (
        <Reveal>
          <TimelineRail
            title={lang === 'en' ? 'Time navigator' : lang === 'ja' ? '時間ナビゲーター' : '时间导航'}
            description={
              lang === 'en'
                ? 'Drag the rail to scan active decades, then jump directly to the works in that period.'
                : lang === 'ja'
                ? '横にドラッグして年代を眺め、その時期の作品へ直接移動する。'
                : '横向拖动浏览有效年代，并直接跳到对应时期的作品。'
            }
            items={railItems}
          />
        </Reveal>
      )}

      <Reveal>
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2">{lang === 'en' ? 'Historical chain' : lang === 'ja' ? '歴史の連鎖' : '历史链条'}</p>
              <h2 className="heading-3">{lang === 'en' ? 'Why one period becomes the next' : lang === 'ja' ? '時代はなぜ次へ移るのか' : '时代为什么会进入下一段'}</h2>
            </div>
            <p className="caption max-w-sm sm:text-right">
              {lang === 'en'
                ? 'Each period is framed as a historical question and a transition, so the timeline reads as a chain of problems.'
                : lang === 'ja'
                ? '各時代を問いと移行として読み、時間軸を問題の連鎖として捉える。'
                : '把每个时代读成一个问题和一次转向，让时间轴成为问题链，而不是年份表。'}
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {periodSummaries.map((period, index) => (
              <a
                key={period.id}
                href={`#period-${period.id}`}
                className="group rounded-md border border-subtle bg-surface p-4 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="metadata mb-2">{period.range[0]}-{period.range[1]}</p>
                    <h3 className="text-lg font-medium leading-snug text-primary transition-colors group-hover:text-accent">
                      {localizedTimelineText(period.label, lang)}
                    </h3>
                  </div>
                  <span className="font-serif-display text-3xl leading-none text-soft">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="body-sm font-medium text-primary">{localizedTimelineText(period.question, lang)}</p>
                <p className="caption mt-3 border-t border-subtle pt-3">{localizedTimelineText(period.transition, lang)}</p>
              </a>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2">{lang === 'en' ? 'Narrative timeline' : lang === 'ja' ? '叙述の時間軸' : '叙事时间轴'}</p>
              <h2 className="heading-3">{lang === 'en' ? 'How architectural history moves' : lang === 'ja' ? '建築史の流れ' : '建筑史如何推进'}</h2>
            </div>
            <p className="caption max-w-sm sm:text-right">
              {lang === 'en'
                ? 'Use this layer for historical continuity, then jump into the decade atlas below for exact works.'
                : lang === 'ja'
                ? 'まず歴史の連続性を読み、下の年代索引から具体的な作品へ入る。'
                : '先看历史连续性，再进入下方年代索引查具体作品。'}
            </p>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-3 top-0 w-px bg-[color:var(--ui-border-subtle)] sm:left-4" />
            <div className="space-y-4">
              {periodSummaries.map(period => (
                <section id={`period-${period.id}`} key={period.id} className="relative grid scroll-mt-28 gap-4 pl-10 sm:pl-14 lg:grid-cols-[minmax(12rem,0.42fr)_minmax(0,1fr)]">
                  <div className="absolute left-[0.45rem] top-2 h-4 w-4 rounded-full border-4 border-[color:var(--ui-bg)] bg-[color:var(--ui-accent)] sm:left-[0.7rem]" />
                  <div className="rounded-md border border-subtle bg-surface p-4 shadow-semantic-card">
                    <p className="metadata mb-3">{period.range[0]}-{period.range[1]}</p>
                    <h3 className="text-xl font-medium leading-snug text-primary">{localizedTimelineText(period.label, lang)}</h3>
                    <p className="body-sm mt-3 font-medium text-primary">{localizedTimelineText(period.question, lang)}</p>
                    <p className="body-sm mt-3 text-secondary">{localizedTimelineText(period.summary, lang)}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {localizedTimelineText(period.movements, lang).map(movement => (
                        <span key={movement} className="rounded-full bg-surface-muted px-2.5 py-1 text-[0.68rem] text-secondary">
                          {movement}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-md border border-subtle bg-surface p-4">
                      <p className="label mb-3">{t(lang, 'architects')} · {period.architectCount}</p>
                      <div className="space-y-2">
                        {period.architects.map(architect => (
                          <Link key={architect.id} href={`/${lang}/architect/${architect.slug}`} className="block text-sm font-medium text-primary transition-colors hover:text-accent">
                            {displayName(architect, lang)}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-md border border-subtle bg-surface p-4">
                      <p className="label mb-3">{t(lang, 'buildings')} · {period.buildingCount}</p>
                      <div className="space-y-2">
                        {period.buildings.map(building => (
                          <Link key={building.id} href={`/${lang}/building/${building.slug}`} className="grid grid-cols-[3.2rem_minmax(0,1fr)] gap-3 text-sm transition-colors hover:text-accent">
                            <span className="metadata tabular-nums">{building.year_start}</span>
                            <span className="truncate font-medium text-primary">{displayName(building, lang)}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">{lang === 'en' ? 'Chronology' : lang === 'ja' ? '年代順' : '年代序列'}</p>
              <h2 className="heading-3">{lang === 'en' ? 'Decade index' : lang === 'ja' ? '年代索引' : '年代索引'}</h2>
            </div>
            <p className="caption text-right">{decades.length} {lang === 'en' ? 'active periods' : lang === 'ja' ? '項目' : '有效年代'}</p>
          </div>

          <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          {decades.map(([decade, bldgs], eraIdx) => (
            <Reveal key={decade} delay={eraIdx * 0.05}>
              <section id={`decade-${decade}`} className="w-full scroll-mt-28 rounded-md border border-subtle bg-surface p-4 shadow-semantic-card">
                <div className="mb-5 flex items-end justify-between gap-3 border-b border-subtle pb-4">
                  <h3 className="font-serif-display text-4xl leading-none text-primary">{decade}s</h3>
                  <p className="caption text-right">
                    {bldgs.length} {lang === 'en' ? 'buildings' : lang === 'ja' ? '作品' : '座建筑'}
                  </p>
                </div>

                <div className="divide-y divide-[color:var(--ui-border-subtle)]">
                  {bldgs.slice(0, 7).map(b => {
                    const arch = b.architect_slug ? architectMap.get(b.architect_slug) : null
                    return (
                      <Link key={b.id} href={`/${lang}/building/${b.slug}`}
                        className="group grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 py-3 transition-colors first:pt-0 last:pb-0 hover:text-accent">
                        <span className="metadata pt-0.5 tabular-nums">{b.year_start}</span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-primary transition-colors group-hover:text-accent">
                            {displayName(b, lang)}
                          </span>
                          <span className="caption mt-1 block truncate">
                            {[arch ? displayName(arch, lang) : '', b.city].filter(Boolean).join(' · ')}
                          </span>
                        </span>
                      </Link>
                    )
                  })}
                  {bldgs.length > 7 && (
                    <p className="caption py-3">+ {bldgs.length - 7} {lang === 'en' ? 'more works in this decade' : lang === 'ja' ? '件の作品' : '个更多作品'}</p>
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
        </section>
      </Reveal>
    </PageShell>
  )
}

function TimelineMetric({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="border-r border-subtle px-3 py-4 last:border-r-0 sm:px-4">
      <p className="font-serif-display text-2xl leading-none text-primary sm:text-3xl">{value}</p>
      <p className="caption mt-2">{label}</p>
    </div>
  )
}
