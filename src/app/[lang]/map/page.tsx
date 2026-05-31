import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers } from '@/lib/data'
import { displayName, formatCountryName, formatDisplayLocation, hasCjk, isProbablySimplifiedChinese, type BuildingWithCover } from '@/lib/types'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'
import SafeImage from '@/components/SafeImage'

export const revalidate = 3600

type CountryCluster = {
  code: string
  name: string
  buildingCount: number
  architectCount: number
  cities: Map<string, number>
  featured: BuildingWithCover[]
}

type CityCluster = {
  key: string
  label: string
  query: string
  buildingCount: number
  countryCode?: string | null
  featured?: BuildingWithCover
}

const copy = {
  eyebrow: { zh: '地域档案', en: 'Geographic Archive', ja: '地域アーカイブ' },
  title: { zh: '建筑地图', en: 'Architecture Map', ja: '建築地図' },
  intro: {
    zh: '从国家、城市和代表作品进入档案，观察建筑如何在地理、气候、学院与城市更新之间形成密度。',
    en: 'Enter the archive through countries, cities, and representative works, and read architecture through geographic density.',
    ja: '国、都市、代表作からアーカイブへ入り、建築を地理的な密度として読む。',
  },
  countryIndex: { zh: '国家与地区', en: 'Countries and Regions', ja: '国・地域' },
  cityIndex: { zh: '城市线索', en: 'City Clues', ja: '都市の手がかり' },
  featuredRoutes: { zh: '可直接进入的路径', en: 'Ready Routes', ja: 'すぐ入れる経路' },
  buildings: { zh: '建筑', en: 'buildings', ja: '建築' },
  architects: { zh: '建筑师', en: 'architects', ja: '建築家' },
  cities: { zh: '城市', en: 'cities', ja: '都市' },
  searchCity: { zh: '搜索此城市', en: 'Search this city', ja: 'この都市を検索' },
  viewCountry: { zh: '进入地域档案', en: 'Open region archive', ja: '地域アーカイブへ' },
  density: { zh: '档案密度', en: 'Archive density', ja: 'アーカイブ密度' },
}

const indexImageDenylist = new Set(['louis-vuitton-fondation'])

function c(lang: string, key: keyof typeof copy) {
  return copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
}

function mapCityLabel(building: BuildingWithCover, lang: string) {
  const country = formatCountryName(building.country_code, building.country, lang)
  if (lang === 'en') {
    const city = building.city && !hasCjk(building.city) ? building.city : ''
    return [city, country].filter(Boolean).join(', ') || country || ''
  }
  if (lang === 'ja') {
    const city = building.city && !isProbablySimplifiedChinese(building.city) ? building.city : ''
    return [city, country].filter(Boolean).join(', ') || country || ''
  }
  return formatDisplayLocation({
    city: building.city,
    country: building.country,
    countryCode: building.country_code,
    lang,
  })
}

function localCover(buildings: BuildingWithCover[]) {
  return buildings.find(building =>
    building.cover_url?.startsWith('/images/curated/') && !indexImageDenylist.has(building.slug)
  )
}

function isLocalCover(building?: BuildingWithCover) {
  return Boolean(
    building?.cover_url?.startsWith('/images/curated/') && !indexImageDenylist.has(building.slug)
  )
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: t(lang, 'mapTitle'),
    description: t(lang, 'mapSub'),
  }
}

export default async function MapPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const prefix = `/${lang}`
  const [architects, buildings] = await Promise.all([getArchitects(), getBuildingsWithCovers()])
  const countryClusters = new Map<string, CountryCluster>()
  const cityClusters = new Map<string, CityCluster>()

  buildings.forEach(building => {
    const code = building.country_code?.toLowerCase()
    if (code) {
      const countryName = formatCountryName(code, building.country, lang) || building.country || code.toUpperCase()
      const cluster = countryClusters.get(code) || {
        code,
        name: countryName,
        buildingCount: 0,
        architectCount: 0,
        cities: new Map<string, number>(),
        featured: [],
      }
      cluster.name = countryName
      cluster.buildingCount += 1
      if (building.city) cluster.cities.set(building.city, (cluster.cities.get(building.city) || 0) + 1)
      if (cluster.featured.length < 8 && building.cover_url) cluster.featured.push(building)
      countryClusters.set(code, cluster)
    }

    const locationLabel = mapCityLabel(building, lang)
    if (!locationLabel || !building.city) return
    const cityKey = `${building.city}-${building.country_code || building.country || ''}`.toLowerCase()
    const city = cityClusters.get(cityKey) || {
      key: cityKey,
      label: locationLabel,
      query: building.city,
      buildingCount: 0,
      countryCode: building.country_code,
      featured: undefined,
    }
    city.buildingCount += 1
    if (!city.featured && isLocalCover(building)) city.featured = building
    cityClusters.set(cityKey, city)
  })

  architects.forEach(architect => {
    architect.nationalities?.forEach(nationality => {
      const cluster = countryClusters.get(nationality.toLowerCase())
      if (cluster) cluster.architectCount += 1
    })
  })

  const countries = [...countryClusters.values()]
    .filter(country => country.buildingCount > 0)
    .sort((a, b) => b.buildingCount - a.buildingCount || a.name.localeCompare(b.name))
  const cities = [...cityClusters.values()]
    .sort((a, b) => b.buildingCount - a.buildingCount || a.label.localeCompare(b.label))
    .slice(0, 18)
  const maxCountryCount = Math.max(...countries.map(country => country.buildingCount), 1)
  const featuredRoutes = countries
    .filter(country => country.featured.length > 0)
    .slice(0, 6)

  return (
    <PageShell className="!max-w-[86rem]">
      <header className="section grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(20rem,0.55fr)] lg:items-end">
        <div>
          <p className="eyebrow mb-4">{c(lang, 'eyebrow')}</p>
          <h1 className="heading-display mb-4">{c(lang, 'title')}</h1>
          <p className="body-large max-w-3xl">{c(lang, 'intro')}</p>
        </div>
        <div className="grid grid-cols-3 overflow-hidden rounded-md border border-subtle bg-surface shadow-semantic-card">
          <Metric value={countries.length} label={t(lang, 'countries')} />
          <Metric value={cities.length} label={c(lang, 'cities')} />
          <Metric value={buildings.length} label={t(lang, 'buildings')} />
        </div>
      </header>

      <Reveal>
        <section className="section pt-0">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">{c(lang, 'density')}</p>
              <h2 className="heading-3">{c(lang, 'countryIndex')}</h2>
            </div>
            <Link href={`${prefix}/browse/country`} className="body-sm text-accent underline underline-offset-4">
              {t(lang, 'viewAll')}
            </Link>
          </div>

          <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
            {countries.slice(0, 12).map(country => {
              const cover = localCover(country.featured)
              return (
                <Link
                  key={country.code}
                  href={`${prefix}/browse/country/${country.code}`}
                  className="group w-full rounded-md border border-subtle bg-surface p-4 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="metadata mb-2 uppercase">{country.code}</p>
                      <h3 className="text-xl font-medium leading-snug text-primary transition-colors group-hover:text-accent">{country.name}</h3>
                    </div>
                    <p className="caption text-right tabular-nums">
                      {country.buildingCount} {c(lang, 'buildings')}
                      {country.architectCount > 0 && <><br />{country.architectCount} {c(lang, 'architects')}</>}
                    </p>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
                    <div
                      className="h-full rounded-full bg-[color:var(--ui-accent)]"
                      style={{ width: `${Math.max(8, Math.round((country.buildingCount / maxCountryCount) * 100))}%` }}
                    />
                  </div>
                  {cover && (
                    <div className="relative mt-5 h-32 overflow-hidden rounded-sm bg-surface-muted sm:h-36">
                      <SafeImage
                        src={cover.cover_url || ''}
                        alt={displayName(cover, lang)}
                        fill
                        className="object-cover transition duration-500 ease-out group-hover:scale-[1.015]"
                        sizes="(min-width: 1280px) 26rem, (min-width: 768px) 45vw, 100vw"
                      />
                    </div>
                  )}
                  <p className={`${cover ? 'mt-4' : 'mt-5'} caption border-t border-subtle pt-4`}>
                    {country.cities.size} {c(lang, 'cities')} · {c(lang, 'viewCountry')}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>
      </Reveal>

      {featuredRoutes.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <div className="mb-6">
              <p className="eyebrow mb-2">{c(lang, 'featuredRoutes')}</p>
              <h2 className="heading-3">{lang === 'en' ? 'Regional routes' : lang === 'ja' ? '地域の入口' : '地域入口'}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {featuredRoutes.map(country => {
                const cover = localCover(country.featured)
                return (
                <Link key={country.code} href={`${prefix}/browse/country/${country.code}`} className="group grid grid-cols-[7rem_minmax(0,1fr)] gap-4 rounded-md border border-subtle bg-surface p-3 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface-muted">
                    {cover ? (
                      <SafeImage
                        src={cover.cover_url || ''}
                        alt={displayName(cover, lang)}
                        fill
                        className="object-cover transition duration-500 ease-out group-hover:scale-[1.015]"
                        sizes="7rem"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.18em] text-muted">{country.code}</div>
                    )}
                  </div>
                  <div className="min-w-0 self-center">
                    <h3 className="body-sm font-medium text-primary transition-colors group-hover:text-accent">{country.name}</h3>
                    <p className="caption mt-1">{country.buildingCount} {c(lang, 'buildings')} · {country.cities.size} {c(lang, 'cities')}</p>
                    <p className="mt-3 text-xs text-accent underline underline-offset-4">{c(lang, 'viewCountry')}</p>
                  </div>
                </Link>
                )
              })}
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <div className="mb-6">
            <p className="eyebrow mb-2">{t(lang, 'search')}</p>
            <h2 className="heading-3">{c(lang, 'cityIndex')}</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {cities.map(city => (
              <Link
                key={city.key}
                href={`${prefix}/search?q=${encodeURIComponent(city.query)}`}
                className="group grid min-h-[7.25rem] grid-cols-[5.5rem_minmax(0,1fr)] gap-3 rounded-md border border-subtle bg-surface p-3 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted"
              >
                <div className="relative overflow-hidden rounded-sm bg-surface-muted">
                  {city.featured?.cover_url ? (
                    <SafeImage
                      src={city.featured.cover_url}
                      alt={displayName(city.featured, lang)}
                      fill
                      className="object-cover"
                      sizes="6rem"
                    />
                  ) : (
                    <div className="img-placeholder h-full px-2 text-center text-xs text-muted">{city.label}</div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="line-clamp-2 text-sm font-medium leading-snug text-primary transition-colors group-hover:text-accent">{city.label}</h3>
                  <p className="caption mt-2">{city.buildingCount} {c(lang, 'buildings')}</p>
                  <p className="mt-3 text-xs text-accent underline underline-offset-4">{c(lang, 'searchCity')}</p>
                </div>
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
