import type { Metadata } from 'next'
import { getArchitects, getBuildingsWithCovers } from '@/lib/data'
import BrowseListing from '@/components/BrowseListing'

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return { title: `Buildings in ${slug.toUpperCase()}` }
}

export async function generateStaticParams() {
  const buildings = await getBuildingsWithCovers()
  const countries = [...new Set(
    buildings
      .map(b => b.country_code?.toLowerCase())
      .filter((code): code is string => Boolean(code))
  )]
  return ['zh','en','ja'].flatMap(lang => countries.map(c => ({ lang, slug: c })))
}

export default async function CountryPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const [architects, buildings] = await Promise.all([getArchitects(), getBuildingsWithCovers()])

  const fn = (c: string) => c.toLowerCase() === slug
  const filteredArchs = architects.filter(a => a.nationalities?.some(fn))
  const filteredBldgs = buildings.filter(b => b.country_code ? fn(b.country_code.toLowerCase()) : false)
  const archMap = new Map(architects.map(a => [a.slug, a.name_zh || a.name_en]))
  const countryName = filteredBldgs.find(b => b.country)?.country || slug.toUpperCase()

  return <BrowseListing lang={lang} displayName={countryName} architects={filteredArchs} buildings={filteredBldgs} architectMap={archMap} />
}
