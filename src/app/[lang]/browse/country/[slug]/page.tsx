import type { Metadata } from 'next'
import { formatCountryName } from '@/lib/locale'
import { getArchitects, getBuildingsWithCovers } from '@/lib/data'
import { displayName } from '@/lib/display'
import { dedupeBuildings, isMinimallyComplete } from '@/lib/quality'
import BrowseListing from '@/components/BrowseListing'

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  return { title: formatCountryName(slug, slug.toUpperCase(), lang) || `Buildings in ${slug.toUpperCase()}` }
}

export async function generateStaticParams() {
  const buildings = await getBuildingsWithCovers()
  const countries = [...new Set(
    buildings
      .filter(building => isMinimallyComplete(building))
      .map(b => b.country_code?.toLowerCase())
      .filter((code): code is string => Boolean(code))
  )]
  return ['zh','en','ja'].flatMap(lang => countries.map(c => ({ lang, slug: c })))
}

export default async function CountryPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const [architects, buildings] = await Promise.all([getArchitects(), getBuildingsWithCovers()])
  const qualityBuildings = dedupeBuildings(buildings.filter(building => isMinimallyComplete(building)))

  const fn = (c: string) => c.toLowerCase() === slug
  const filteredBldgs = qualityBuildings.filter(b => b.country_code ? fn(b.country_code.toLowerCase()) : false)
  const archMap = new Map(architects.map(a => [a.slug, displayName(a, lang)]))
  const fallbackName = filteredBldgs.find(b => b.country)?.country || slug.toUpperCase()
  const countryName = formatCountryName(slug, fallbackName, lang) || fallbackName
  const filteredArchs = architects.filter(a => architectMatchesCountry(a.nationalities, slug, countryName, fallbackName, lang))

  return <BrowseListing lang={lang} displayName={countryName} architects={filteredArchs} buildings={filteredBldgs} architectMap={archMap} />
}

function architectMatchesCountry(nationalities: string[] | null | undefined, code: string, countryName: string, fallbackName: string, lang: string) {
  if (!nationalities?.length) return false
  const names = new Set(
    ['en', 'ja', 'zh', lang]
      .map(locale => formatCountryName(code, fallbackName, locale))
      .concat([countryName, fallbackName, code, code.toUpperCase()])
      .filter(Boolean)
      .map(value => value.toLowerCase())
  )
  return nationalities.some(value => names.has(value.toLowerCase()))
}
