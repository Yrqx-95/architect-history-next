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
      <h1 className="heading-display mb-2">{styleName}</h1>

      <div className="flex items-center gap-3 mb-6 mt-4 text-sm flex-wrap">
        <Badge active>{architects.length} {t(lang, 'architects')}</Badge>
        <Badge active>{buildings.length} {t(lang, 'buildings')}</Badge>
        {era && <Badge active>{displayName(era, lang)}</Badge>}
      </div>

      {(parentStyle || childStyles.length > 0) && (
        <div className="mb-8 text-sm">
          {parentStyle && (
            <p className="text-stone-500">
              ← <Link href={`${prefix}/browse/style/${parentStyle.slug}`} className="hover:text-stone-700 dark:hover:text-stone-300 underline">{displayName(parentStyle, lang)}</Link>
            </p>
          )}
          {childStyles.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {childStyles.map(cs => (
                <Link key={cs.id} href={`${prefix}/browse/style/${cs.slug}`}>
                  <Badge>→ {displayName(cs, lang)}</Badge>
                </Link>
              ))}
            </div>
          )}
        </div>
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
            {buildings.length > 18 && <p className="text-center text-sm text-stone-400 mt-4">+{buildings.length - 18} more</p>}
          </section>
        </Reveal>
      )}
    </PageShell>
  )
}
