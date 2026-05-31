import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildings } from '@/lib/data'
import { displayName } from '@/lib/types'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'

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

  return (
    <PageShell className="!max-w-[86rem]">
      <header className="section grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(20rem,0.55fr)] lg:items-end">
        <div>
          <p className="eyebrow mb-4">{lang === 'en' ? 'Time atlas' : lang === 'ja' ? '時間の地図' : '时间图谱'}</p>
          <h1 className="heading-display mb-4">{t(lang, 'timeline')}</h1>
          <p className="body-large max-w-2xl">
            {lang === 'en'
              ? 'A dense chronological index of buildings, periods, and authorship. Browse by decade, then enter the work.'
              : lang === 'ja'
              ? '建築、時代、作者性を年代ごとに読むための密度ある索引。'
              : '把建筑、时代与作者关系压缩进年代索引，从一个十年进入一组作品。'}
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

      <Reveal>
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">{lang === 'en' ? 'Chronology' : lang === 'ja' ? '年代順' : '年代序列'}</p>
              <h2 className="heading-3">{lang === 'en' ? 'Decade index' : lang === 'ja' ? '年代索引' : '年代索引'}</h2>
            </div>
            <p className="caption text-right">{decades.length} {lang === 'en' ? 'active periods' : lang === 'ja' ? '項目' : '有效年代'}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {decades.map(([decade, bldgs], eraIdx) => (
            <Reveal key={decade} delay={eraIdx * 0.05}>
              <section id={`decade-${decade}`} className="rounded-md border border-subtle bg-surface p-4 shadow-semantic-card scroll-mt-28">
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
