import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getTypes, getBuildingsWithCovers, getArchitects } from '@/lib/data'
import { displayName } from '@/lib/types'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'
import BuildingCard from '@/components/BuildingCard'

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
  const archMap = new Map(architects.map(a => [a.slug, a.name_zh || a.name_en]))
  const validTypeKeys = new Set([type.slug, type.name_en, type.name_zh].filter(Boolean))
  const filteredBldgs = buildings.filter(b => b.type_slug ? validTypeKeys.has(b.type_slug) : false)

  return (
    <PageShell>
      <h1 className="heading-1 mb-2">{nameText}</h1>
      <p className="caption mb-6">{filteredBldgs.length} {t(lang, 'buildings')}</p>

      {filteredBldgs.length > 0 ? (
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredBldgs.map(b => (
              <BuildingCard key={b.id} building={b} lang={lang}
                architectName={archMap.get(b.architect_slug || '') || ''} />
            ))}
          </div>
        </Reveal>
      ) : (
        <p className="text-stone-400 py-8 text-center">{t(lang, 'noResults')}</p>
      )}
    </PageShell>
  )
}
