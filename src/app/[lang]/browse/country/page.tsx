import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers } from '@/lib/data'
import { displayName, formatCountryName, type BuildingWithCover } from '@/lib/types'
import PageShell from '@/components/PageShell'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import SafeImage from '@/components/SafeImage'

export const revalidate = 3600

type CountrySummary = {
  code: string
  name: string
  architectCount: number
  buildingCount: number
  cities: Map<string, number>
  featured: BuildingWithCover[]
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
      name: formatCountryName(code, building.country, lang) || building.country || code.toUpperCase(),
      architectCount: 0,
      buildingCount: 0,
      cities: new Map<string, number>(),
      featured: [],
    }
    current.name = formatCountryName(code, building.country, lang) || current.name || building.country || code.toUpperCase()
    current.buildingCount += 1
    if (building.city) current.cities.set(building.city, (current.cities.get(building.city) || 0) + 1)
    if (current.featured.length < 4 && building.cover_url?.startsWith('/images/curated/')) current.featured.push(building)
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
  const maxCount = Math.max(...list.map(country => country.buildingCount), 1)

  const prefix = `/${lang}/browse/country`

  return (
    <PageShell className="!max-w-[86rem]">
      <header className="section grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(20rem,0.5fr)] lg:items-end">
        <div>
          <p className="eyebrow mb-4">{lang === 'en' ? 'Regional index' : lang === 'ja' ? '地域索引' : '地域索引'}</p>
        <h1 className="heading-display mb-4">{t(lang, 'countries')}</h1>
        <p className="body-large max-w-2xl">
          {t(lang, 'countriesIntro')}
        </p>
        </div>
        <div className="grid grid-cols-3 overflow-hidden rounded-md border border-subtle bg-surface shadow-semantic-card">
          <Metric value={list.length} label={t(lang, 'countries')} />
          <Metric value={buildings.length} label={t(lang, 'buildings')} />
          <Metric value={architects.length} label={t(lang, 'architects')} />
        </div>
      </header>

      <Reveal>
        <section className="section pt-0">
          <SectionHeading
            title={t(lang, 'countries')}
            description={`${list.length} ${t(lang, 'countriesAndRegions')}`}
          />

          <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
            {list.map(country => (
              <Link
                key={country.code}
                href={`${prefix}/${country.code}`}
                className="group mb-4 block break-inside-avoid rounded-md border border-subtle bg-surface p-4 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ui-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--ui-bg)]"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="metadata mb-2 uppercase">{country.code}</p>
                    <h2 className="text-xl font-medium leading-snug text-primary transition-colors group-hover:text-accent">
                      {country.name}
                    </h2>
                  </div>
                  <p className="caption text-right tabular-nums">
                    {country.buildingCount} {t(lang, 'buildings')}
                    {country.architectCount > 0 && <><br />{country.architectCount} {t(lang, 'architects')}</>}
                  </p>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-[color:var(--ui-accent)]"
                    style={{ width: `${Math.max(8, Math.round((country.buildingCount / maxCount) * 100))}%` }}
                  />
                </div>
                {country.featured.length > 0 ? (
                  <div className="mt-5 grid grid-cols-2 gap-1.5">
                    {country.featured.slice(0, 4).map(building => (
                      <div key={building.id} className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface-muted">
                        <SafeImage
                          src={building.cover_url || ''}
                          alt={displayName(building, lang)}
                          fill
                          className="object-cover transition duration-500 ease-out group-hover:scale-[1.015]"
                          sizes="12rem"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 grid grid-cols-2 gap-2 border-t border-subtle pt-4">
                    {[...country.cities.entries()].slice(0, 4).map(([city, count]) => (
                      <span key={city} className="caption truncate">{city} · {count}</span>
                    ))}
                  </div>
                )}
                <p className="caption mt-4 border-t border-subtle pt-4">
                  {country.cities.size} {lang === 'en' ? 'cities' : lang === 'ja' ? '都市' : '城市'} · {lang === 'en' ? 'Open region archive' : lang === 'ja' ? '地域アーカイブへ' : '进入地域档案'}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>
    </PageShell>
  )
}

function Metric({ value, label }: { value: number; label: string }) {
  return (
    <div className="border-r border-subtle px-3 py-4 last:border-r-0 sm:px-4">
      <p className="font-serif-display text-3xl leading-none text-primary sm:text-4xl">{value}</p>
      <p className="caption mt-2">{label}</p>
    </div>
  )
}
