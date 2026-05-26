import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getTypes, getBuildingsWithCovers, getArchitects } from '@/lib/data'
import { displayName } from '@/lib/types'
import { matchesTaxonomy } from '@/lib/taxonomy'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'
import BuildingCard from '@/components/BuildingCard'
import SectionHeading from '@/components/SectionHeading'

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
  const filteredBldgs = buildings.filter(b => matchesTaxonomy(b.type_slug, type))

  return (
    <PageShell>
      <header className="section">
        <p className="eyebrow mb-4">{t(lang, 'types')}</p>
        <h1 className="heading-display mb-3">{nameText}</h1>
        <p className="body-sm">{filteredBldgs.length} {t(lang, 'buildings')}</p>
      </header>

      {filteredBldgs.length > 0 ? (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <SectionHeading
              title={t(lang, 'buildings')}
              description={lang === 'en' ? 'Works grouped by program and use.' : lang === 'ja' ? '用途とプログラムで束ねた作品。' : '按建筑用途与功能组织的作品。'}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {filteredBldgs.map(b => (
              <BuildingCard key={b.id} building={b} lang={lang}
                architectName={archMap.get(b.architect_slug || '') || ''} />
            ))}
            </div>
          </section>
        </Reveal>
      ) : (
        <p className="body-sm py-8 text-center">{t(lang, 'noResults')}</p>
      )}
    </PageShell>
  )
}
