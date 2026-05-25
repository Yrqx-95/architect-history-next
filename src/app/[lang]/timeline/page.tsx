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

  const sortedBldgs = [...buildings].sort((a, b) => (a.year_start || 0) - (b.year_start || 0))

  const byDecade = new Map<number, typeof buildings>()
  sortedBldgs.forEach(b => {
    const decade = Math.floor((b.year_start || 2000) / 10) * 10
    if (!byDecade.has(decade)) byDecade.set(decade, [])
    byDecade.get(decade)!.push(b)
  })

  const decades = [...byDecade.entries()].sort(([a], [b]) => a - b)

  return (
    <PageShell>
      <header className="section">
        <h1 className="heading-display mb-4">{t(lang, 'timeline')}</h1>
        <p className="body-large max-w-2xl">
          {lang === 'en'
            ? 'A chronological journey through architectural history — from antiquity to the present day.'
            : lang === 'ja'
            ? '建築史の年代的旅路 — 古代から現代まで。'
            : '建筑史的年代之旅 — 从古代到当代。'}
        </p>
      </header>

      <div className="relative">
        {/* Central timeline line */}
        <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-warm-200 dark:bg-charcoal-700" />

        <div className="space-y-16 sm:space-y-20">
          {decades.map(([decade, bldgs], eraIdx) => (
            <Reveal key={decade} delay={eraIdx * 0.05}>
              <section className="relative pl-10 sm:pl-16">
                {/* Decade marker */}
                <div className="absolute left-[11px] sm:left-[27px] top-0 w-3 h-3 rounded-full bg-warm-400 dark:bg-charcoal-500 ring-4 ring-paper-100 dark:ring-charcoal-950" />

                {/* Decade header */}
                <div className="mb-5">
                  <span className="text-2xl sm:text-3xl font-bold text-warm-800 dark:text-paper-100 font-mono tracking-tight">
                    {decade}s
                  </span>
                  <span className="caption ml-3">
                    {bldgs.length} {lang === 'en' ? 'buildings' : lang === 'ja' ? '作品' : '座建筑'}
                  </span>
                </div>

                {/* Buildings in this decade */}
                <div className="space-y-2">
                  {bldgs.slice(0, 30).map(b => {
                    const arch = architects.find(a => a.slug === b.architect_slug)
                    return (
                      <Link key={b.id} href={`/${lang}/building/${b.slug}`}
                        className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-sm py-2 px-3 -mx-3 rounded-lg hover:bg-warm-100 dark:hover:bg-charcoal-800/60 transition-colors group">
                        <span className="w-16 shrink-0 font-mono text-xs text-warm-600 dark:text-warm-300">{b.year_start}</span>
                        <span className="font-medium text-warm-700 dark:text-warm-200 group-hover:text-warm-900 dark:group-hover:text-paper-100 transition-colors">
                          {b.name_zh || b.name_en}
                        </span>
                        <span className="text-xs text-warm-600 dark:text-warm-300">{b.city}</span>
                        {arch && (
                          <span className="hidden text-xs text-warm-600 dark:text-warm-300 sm:inline">
                            {displayName(arch, lang)}
                          </span>
                        )}
                      </Link>
                    )
                  })}
                  {bldgs.length > 30 && (
                    <p className="caption pl-[4.25rem] py-1">+ {bldgs.length - 30} more buildings in this decade</p>
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  )
}
