import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers } from '@/lib/data'
import PageShell from '@/components/PageShell'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'

export const revalidate = 3600

type CountrySummary = {
  code: string
  name: string
  architectCount: number
  buildingCount: number
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: t(lang, 'countries'),
    description: t(lang, 'countriesDescription'),
  }
}

export default async function CountriesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const [architects, buildings] = await Promise.all([getArchitects(), getBuildingsWithCovers()])
  const countries = new Map<string, CountrySummary>()

  buildings.forEach(building => {
    const code = building.country_code?.toLowerCase()
    if (!code) return
    const current = countries.get(code) || {
      code,
      name: building.country || code.toUpperCase(),
      architectCount: 0,
      buildingCount: 0,
    }
    current.name = current.name || building.country || code.toUpperCase()
    current.buildingCount += 1
    countries.set(code, current)
  })

  architects.forEach(architect => {
    architect.nationalities?.forEach(nationality => {
      const code = nationality.toLowerCase()
      const current = countries.get(code)
      if (current) current.architectCount += 1
    })
  })

  const list = [...countries.values()]
    .filter(country => country.buildingCount > 0)
    .sort((a, b) => b.buildingCount - a.buildingCount || a.name.localeCompare(b.name))

  const prefix = `/${lang}/browse/country`

  return (
    <PageShell>
      <header className="section">
        <h1 className="heading-display mb-4">{t(lang, 'countries')}</h1>
        <p className="body-large max-w-2xl">
          {t(lang, 'countriesIntro')}
        </p>
      </header>

      <Reveal>
        <section className="section">
          <SectionHeading
            title={t(lang, 'countries')}
            description={`${list.length} ${t(lang, 'countriesAndRegions')}`}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {list.map(country => (
              <Link
                key={country.code}
                href={`${prefix}/${country.code}`}
                className="group block border-t border-warm-200/70 py-4 transition-colors hover:border-warm-400/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-warm-400 focus-visible:ring-offset-4 focus-visible:ring-offset-paper-100 dark:border-charcoal-700/80 dark:hover:border-charcoal-500 dark:focus-visible:ring-offset-charcoal-950"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-medium leading-snug text-warm-800 transition-colors group-hover:text-warm-600 dark:text-paper-100 dark:group-hover:text-warm-300">
                      {country.name}
                    </h2>
                    <p className="metadata mt-1 uppercase">{country.code}</p>
                  </div>
                  <span className="metadata tabular-nums">
                    {country.buildingCount}
                  </span>
                </div>
                <p className="caption mt-3">
                  {country.buildingCount} {t(lang, 'buildings')}
                  {country.architectCount > 0 && <> · {country.architectCount} {t(lang, 'architects')}</>}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>
    </PageShell>
  )
}
