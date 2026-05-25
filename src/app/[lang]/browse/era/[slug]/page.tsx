import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { t } from '@/lib/i18n'
import { getEraRelations } from '@/lib/relations'
import { displayName } from '@/lib/types'
import PageShell from '@/components/PageShell'
import Badge from '@/components/Badge'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import ArchitectCard from '@/components/ArchitectCard'
import BuildingCard from '@/components/BuildingCard'

export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const rels = await getEraRelations(slug)
  if (!rels) return { title: 'Not Found' }
  const name = displayName(rels.era, lang)
  return { title: name, description: `${rels.architects.length} architects · ${rels.buildings.length} buildings` }
}

export async function generateStaticParams() {
  const { getEras } = await import('@/lib/data')
  const eras = await getEras()
  return ['zh','en','ja'].flatMap(lang => eras.map(e => ({ lang, slug: e.slug })))
}

export default async function EraPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const rels = await getEraRelations(slug)
  if (!rels) notFound()

  const { era, architects, buildings, styles } = rels
  const prefix = `/${lang}`
  const archMap = new Map(architects.map(a => [a.slug, a.name_zh || a.name_en]))
  const eraName = displayName(era, lang)

  return (
    <PageShell>
      <h1 className="heading-display mb-2">{eraName}</h1>
      {era.year_start && <p className="text-sm text-stone-400 mb-1">{era.year_start} – {era.year_end}</p>}

      <div className="flex items-center gap-3 mb-8 mt-4 text-sm flex-wrap">
        <Badge active>{architects.length} {t(lang, 'architects')}</Badge>
        <Badge active>{buildings.length} {t(lang, 'buildings')}</Badge>
        {styles.length > 0 && <Badge active>{styles.length} {t(lang, 'styles')}</Badge>}
      </div>

      {styles.length > 0 && (
        <section className="mb-10">
          <h2 className="overline mb-3">{t(lang, 'styles')}</h2>
          <div className="flex flex-wrap gap-2">
            {styles.map(s => (
              <Link key={s.id} href={`${prefix}/browse/style/${s.slug}`}>
                <Badge>{displayName(s, lang)}</Badge>
              </Link>
            ))}
          </div>
        </section>
      )}

      {architects.length > 0 && (
        <Reveal>
          <section className="mb-10">
            <SectionHeading title={`${t(lang, 'architects')} (${architects.length})`} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {architects.map(a => <ArchitectCard key={a.id} architect={a} lang={lang} />)}
            </div>
          </section>
        </Reveal>
      )}

      {buildings.length > 0 && (
        <Reveal>
          <section>
            <SectionHeading title={`${t(lang, 'buildings')} (${buildings.length})`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {buildings.slice(0, 18).map(b => (
                <BuildingCard key={b.id} building={b} lang={lang}
                  architectName={archMap.get(b.architect_slug || '') || ''} />
              ))}
            </div>
          </section>
        </Reveal>
      )}
    </PageShell>
  )
}
