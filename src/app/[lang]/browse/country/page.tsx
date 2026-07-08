import Link from 'next/link'
import type { Metadata } from 'next'
import { formatCountryName } from '@/lib/locale'
import type { BuildingWithCover } from '@/lib/types'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers } from '@/lib/data'
import { displayName, formatDisplayCity } from '@/lib/display'
import { dedupeBuildings, isMinimallyComplete } from '@/lib/quality'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'
import SafeImage from '@/components/SafeImage'

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
  const qualityBuildings = dedupeBuildings(buildings.filter(building => isMinimallyComplete(building)))
  const countries = new Map<string, CountrySummary>()

  qualityBuildings.forEach(building => {
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

  const list = [...countries.values()]
    .filter(country => country.buildingCount > 0)
    .sort((a, b) => b.buildingCount - a.buildingCount || a.name.localeCompare(b.name))

  architects.forEach(architect => {
    list.forEach(country => {
      if (architectMatchesCountry(architect.nationalities, country.code, country.name, lang)) {
        country.architectCount += 1
      }
    })
  })

  const prefix = `/${lang}/browse/country`

  return (
    <PageShell width="archive">
      <header className="section border-b border-subtle pb-8 sm:pb-10">
        <div>
          <p className="eyebrow mb-4">{lang === 'en' ? 'Regional index' : lang === 'ja' ? '地域索引' : '地域索引'}</p>
          <h1 className="heading-display mb-4">{t(lang, 'countries')}</h1>
          <p className="body-large max-w-3xl">
            {t(lang, 'countriesIntro')}
          </p>
          <div className="mt-7 grid gap-3 border-y border-subtle py-4 sm:grid-cols-3">
            <IndexStat value={list.length} label={t(lang, 'countries')} />
            <IndexStat value={qualityBuildings.length} label={t(lang, 'buildings')} />
            <IndexStat value={architects.length} label={t(lang, 'architects')} />
          </div>
        </div>
      </header>

      <Reveal>
        <section className="section pt-8 sm:pt-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2">{lang === 'en' ? 'Archive paths' : lang === 'ja' ? 'アーカイブ入口' : '档案入口'}</p>
              <h2 className="heading-3">{`${list.length} ${t(lang, 'countriesAndRegions')}`}</h2>
            </div>
            <p className="caption max-w-lg sm:text-right">
              {lang === 'en'
                ? 'Each row opens a regional archive, with representative works shown only as quick visual anchors.'
                : lang === 'ja'
                ? '各行から地域アーカイブへ。代表作の画像は入口を見分けるための小さな手がかりです。'
                : '每一行进入一个地域档案，代表作品图片只作为快速识别线索。'}
            </p>
          </div>

          <div className="grid gap-x-6 gap-y-10 lg:grid-cols-2 xl:grid-cols-3">
            {list.map(country => (
              <section key={country.code} className="border-t border-subtle pt-4">
                <Link
                  href={`${prefix}/${country.code}`}
                  className="interactive-row group grid gap-4 border-b border-subtle pb-4 sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:items-start"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-surface-muted text-xs font-medium uppercase tracking-[0.08em] text-secondary">
                    {country.code}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-xl font-medium leading-snug text-primary transition-colors group-hover:text-accent">{country.name}</h2>
                    <p className="caption mt-2">
                      {[
                        `${country.buildingCount} ${t(lang, 'buildings')}`,
                        country.architectCount > 0 ? `${country.architectCount} ${t(lang, 'architects')}` : '',
                        `${country.cities.size} ${lang === 'en' ? 'cities' : lang === 'ja' ? '都市' : '城市'}`,
                      ].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <span className="hidden text-sm font-medium text-accent sm:block">
                    {lang === 'en' ? 'Open' : lang === 'ja' ? '開く' : '打开'} →
                  </span>
                </Link>
                <div className="grid divide-y divide-[color:var(--ui-border-subtle)]">
                  {country.featured.length > 0
                    ? country.featured.slice(0, 4).map(building => (
                      <Link
                        key={building.id}
                        href={`${prefix}/${country.code}`}
                        className="interactive-row group grid min-h-[4.5rem] grid-cols-[4rem_minmax(0,1fr)] gap-3 py-2"
                      >
                        <span className="relative h-14 w-14 overflow-hidden rounded-sm bg-surface-muted">
                          <SafeImage
                            src={building.cover_url || ''}
                            alt={displayName(building, lang)}
                            fill
                            className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                            sizes="3.5rem"
                          />
                        </span>
                        <span className="min-w-0 self-center">
                          <span className="block truncate text-sm font-medium text-primary transition-colors group-hover:text-accent">
                            {displayName(building, lang)}
                          </span>
                          <span className="caption mt-1 block truncate">
                            {[formatDisplayCity(building.city, lang), building.year_start].filter(Boolean).join(' · ')}
                          </span>
                        </span>
                      </Link>
                    ))
                    : [...country.cities.entries()]
                      .map(([city, count]) => [formatDisplayCity(city, lang), count] as const)
                      .filter(([city]) => Boolean(city))
                      .slice(0, 4)
                      .map(([city, count]) => (
                        <Link key={city} href={`${prefix}/${country.code}`} className="interactive-row grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3">
                          <span className="truncate text-sm font-medium text-primary">{city}</span>
                          <span className="caption">{count}</span>
                        </Link>
                      ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </Reveal>
    </PageShell>
  )
}

function architectMatchesCountry(nationalities: string[] | null | undefined, code: string, countryName: string, lang: string) {
  if (!nationalities?.length) return false
  const names = new Set(
    ['en', 'ja', 'zh', lang]
      .map(locale => formatCountryName(code, countryName, locale))
      .concat([countryName, code, code.toUpperCase()])
      .filter(Boolean)
      .map(value => value.toLowerCase())
  )
  return nationalities.some(value => names.has(value.toLowerCase()))
}

function IndexStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-0">
      <p className="font-serif-display text-3xl leading-none text-primary">{value}</p>
      <p className="caption mt-2">{label}</p>
    </div>
  )
}
