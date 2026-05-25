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
      <header className="section">
        <p className="eyebrow mb-4">{t(lang, 'eras')}</p>
        <h1 className="heading-display mb-3">{eraName}</h1>
        {era.year_start && <p className="body-sm">{era.year_start} – {era.year_end || ''}</p>}
      </header>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {[
          [architects.length, t(lang, 'architects')],
          [buildings.length, t(lang, 'buildings')],
          [styles.length, t(lang, 'styles')],
        ].map(([value, label]) => (
          <div key={label} className="rounded-md border border-subtle bg-surface px-4 py-3 shadow-semantic-card">
            <p className="label">{label}</p>
            <p className="mt-3 font-serif-display text-4xl leading-none text-primary">{value}</p>
          </div>
        ))}
      </div>

      {styles.length > 0 && (
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <SectionHeading title={t(lang, 'styles')} description={lang === 'en' ? 'Movements and vocabularies active in this period.' : lang === 'ja' ? 'この時代に関わる様式と語彙。' : '这一时期相关的风格与空间词汇。'} />
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
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <SectionHeading title={`${t(lang, 'architects')} (${architects.length})`} />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {architects.map(a => <ArchitectCard key={a.id} architect={a} lang={lang} />)}
            </div>
          </section>
        </Reveal>
      )}

      {buildings.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
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
