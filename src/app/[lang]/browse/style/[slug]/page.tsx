import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { t } from '@/lib/i18n'
import { getStyleRelations } from '@/lib/relations'
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
  const rels = await getStyleRelations(slug)
  if (!rels) return { title: 'Not Found' }
  const name = displayName(rels.style, lang)
  return { title: name, description: `${rels.architects.length} architects · ${rels.buildings.length} buildings` }
}

export async function generateStaticParams() {
  const { getStyles } = await import('@/lib/data')
  const styles = await getStyles()
  return ['zh','en','ja'].flatMap(lang => styles.map(s => ({ lang, slug: s.slug })))
}

export default async function StylePage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const rels = await getStyleRelations(slug)
  if (!rels) notFound()

  const { style, architects, buildings, parentStyle, childStyles, era } = rels
  const prefix = `/${lang}`
  const archMap = new Map(architects.map(a => [a.slug, a.name_zh || a.name_en]))
  const styleName = displayName(style, lang)

  return (
    <PageShell>
      <header className="section">
        <p className="eyebrow mb-4">{t(lang, 'styles')}</p>
        <h1 className="heading-display mb-3">{styleName}</h1>
        {era && <p className="body-sm">{displayName(era, lang)}</p>}
      </header>

      <div className="mb-8 grid gap-3 sm:grid-cols-3">
        {[
          [architects.length, t(lang, 'architects')],
          [buildings.length, t(lang, 'buildings')],
          [childStyles.length, lang === 'en' ? 'Substyles' : lang === 'ja' ? '下位様式' : '子风格'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-md border border-subtle bg-surface px-4 py-3 shadow-semantic-card">
            <p className="label">{label}</p>
            <p className="mt-3 font-serif-display text-4xl leading-none text-primary">{value}</p>
          </div>
        ))}
      </div>

      {(parentStyle || childStyles.length > 0) && (
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <SectionHeading title={lang === 'en' ? 'Style relations' : lang === 'ja' ? '様式の関係' : '风格关系'} />
          {parentStyle && (
            <p className="body-sm">
              ← <Link href={`${prefix}/browse/style/${parentStyle.slug}`} className="text-accent underline underline-offset-4">{displayName(parentStyle, lang)}</Link>
            </p>
          )}
          {childStyles.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {childStyles.map(cs => (
                <Link key={cs.id} href={`${prefix}/browse/style/${cs.slug}`}>
                  <Badge>→ {displayName(cs, lang)}</Badge>
                </Link>
              ))}
            </div>
          )}
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
            {buildings.length > 18 && <p className="caption mt-4 text-center">+{buildings.length - 18} more</p>}
          </section>
        </Reveal>
      )}
    </PageShell>
  )
}
