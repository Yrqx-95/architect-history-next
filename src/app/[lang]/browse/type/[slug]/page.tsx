import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTypes, getBuildingsWithCovers, getArchitects } from '@/lib/data'
import { displayName } from '@/lib/types'
import { matchesTaxonomy } from '@/lib/taxonomy'
import BrowseListing from '@/components/BrowseListing'

export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const types = await getTypes()
  const type = types.find(t => t.slug === slug)
  if (!type) return { title: 'Not Found' }
  return { title: displayName(type, lang) }
}

export async function generateStaticParams() {
  const types = await getTypes()
  return ['zh','en','ja'].flatMap(lang => types.map(ty => ({ lang, slug: ty.slug })))
}

export default async function TypePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const [types, buildings, architects] = await Promise.all([
    getTypes(), getBuildingsWithCovers(), getArchitects()
  ])
  const type = types.find(t => t.slug === slug)
  if (!type) notFound()

  const nameText = displayName(type, lang)
  const archMap = new Map(architects.map(a => [a.slug, displayName(a, lang)]))
  const filteredBldgs = buildings.filter(b => matchesTaxonomy(b.type_slug, type))

  return <BrowseListing
    lang={lang}
    displayName={nameText}
    description={lang === 'en' ? 'Works grouped by program and use.' : lang === 'ja' ? '用途とプログラムから作品を読む。' : '从建筑用途与功能进入作品。'}
    architects={[]}
    buildings={filteredBldgs}
    architectMap={archMap}
  />
}
