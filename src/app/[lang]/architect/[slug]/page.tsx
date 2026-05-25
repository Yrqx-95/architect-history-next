import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers } from '@/lib/data'
import { getArchitectRelations } from '@/lib/relations'
import { displayName } from '@/lib/types'
import { getArchitectContent, localizedContent } from '@/lib/architect-content'
import PageShell from '@/components/PageShell'
import Breadcrumb from '@/components/Breadcrumb'
import MetadataPanel from '@/components/MetadataPanel'
import Badge from '@/components/Badge'
import Reveal from '@/components/Reveal'
import ContinueExploring from '@/components/ContinueExploring'
import BuildingCard from '@/components/BuildingCard'
import ArchitectCard from '@/components/ArchitectCard'
import ArchitectDeepArticle from '@/components/ArchitectDeepArticle'

export const revalidate = 86400
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const rels = await getArchitectRelations(slug)
  if (!rels) return { title: 'Not Found' }
  const name = displayName(rels.architect, lang)
  const overlay = getArchitectContent(slug)
  const details = overlay
    ? localizedContent(overlay.summary, lang)
    : [rels.architect.birth_year, rels.architect.nationalities?.join(', ')].filter(Boolean).join(' · ')
  return { title: name, description: details || undefined }
}

export async function generateStaticParams() {
  const architects = await getArchitects()
  return ['zh', 'en', 'ja'].flatMap(lang => architects.map(a => ({ lang, slug: a.slug })))
}

export default async function ArchitectPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const rels = await getArchitectRelations(slug)
  if (!rels) notFound()

  const { architect, buildings, relatedArchitects: related, relatedBuildings, influencesList, influencedList, era } = rels
  const prefix = `/${lang}`
  const contentOverlay = getArchitectContent(slug)
  const allBuildingsWithCovers = contentOverlay ? await getBuildingsWithCovers() : []
  const coverBySlug = new Map(allBuildingsWithCovers.map(building => [building.slug, building]))
  const buildingsWithCovers = buildings.map(building => coverBySlug.get(building.slug) || building)

  const nameText = displayName(architect, lang)
  const bioText = contentOverlay
    ? localizedContent(contentOverlay.summary, lang)
    : lang === 'ja' ? (architect.bio_ja || architect.bio_en) : lang === 'en' ? architect.bio_en : (architect.bio_zh || architect.bio_en)
  const coreIdeas: string[] = contentOverlay ? [] : Array.isArray(architect.core_ideas) ? architect.core_ideas : []
  const sortedBuildings = [...buildings].sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))

  const metaRows = [
    { label: t(lang, 'year'), value: architect.birth_year ? `${architect.birth_year} – ${architect.death_year || t(lang, 'present')}` : null },
    { label: t(lang, 'location'), value: architect.nationalities?.join(', ') || null },
    { label: t(lang, 'style'), value: architect.style_slugs?.join(', ') || null },
    { label: t(lang, 'eras'), value: architect.era_slug || null },
    { label: t(lang, 'education'), value: architect.education || null },
  ].filter(r => r.value)

  return (
    <PageShell>
      <Breadcrumb items={[
        { label: t(lang, 'home'), href: `/${lang}` },
        { label: t(lang, 'architects'), href: `/${lang}/browse` },
        { label: nameText },
      ]} />

      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 section">
        <div className="lg:col-span-2 flow">
          <h1 className="heading-display">{nameText}</h1>
          {architect.name_en !== nameText && <p className="text-sm leading-relaxed text-secondary">{architect.name_en}</p>}

          {bioText && (
            <div className="prose prose-stone dark:prose-invert body-large max-w-none">
              {bioText}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {architect.era_slug && <Badge active>{architect.era_slug}</Badge>}
            {architect.style_slugs?.map(s => <Badge key={s}>{s}</Badge>)}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20">
            <p className="eyebrow mb-3">{t(lang, 'overview')}</p>
            <MetadataPanel rows={metaRows} />
          </div>
        </div>
      </div>

      {/* Core Ideas */}
      {contentOverlay && (
        <Reveal>
          <ArchitectDeepArticle content={contentOverlay} lang={lang} works={allBuildingsWithCovers} />
        </Reveal>
      )}

      {/* Core Ideas */}
      {coreIdeas.length > 0 && (
        <Reveal>
          <section className="section">
            <h2 className="heading-3 mb-5">{t(lang, 'coreIdeas')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreIdeas.map((idea, i) => (
                <div key={i} className="rounded-md border border-subtle bg-surface px-5 py-4 body-sm shadow-semantic-card">
                  {idea}
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* Influences */}
      {(influencesList.length > 0 || influencedList.length > 0) && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <h2 className="heading-3 mb-6">{t(lang, 'relatedArchitects')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {influencesList.length > 0 && (
                <div>
                  <p className="eyebrow mb-3">{t(lang, 'influences')}</p>
                  <div className="space-y-2">
                    {influencesList.map(a => <ArchitectCard key={a.slug} architect={a} lang={lang} />)}
                  </div>
                </div>
              )}
              {influencedList.length > 0 && (
                <div>
                  <p className="eyebrow mb-3">{t(lang, 'influenced')}</p>
                  <div className="space-y-2">
                    {influencedList.map(a => <ArchitectCard key={a.slug} architect={a} lang={lang} />)}
                  </div>
                </div>
              )}
            </div>
          </section>
        </Reveal>
      )}

      {/* Works */}
      {buildings.length > 0 && (
        <Reveal>
          <section className="border-t border-subtle pt-10 sm:pt-12">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="heading-3">{t(lang, 'works')}</h2>
                <p className="caption mt-1">{buildings.length} {lang === 'en' ? 'buildings' : lang === 'ja' ? '作品' : '座建筑'}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative mb-10 border-l-2 border-subtle pl-6 sm:pl-8">
              <div className="space-y-4 sm:space-y-5">
                {sortedBuildings.slice(0, 15).map(b => (
                  <Link key={b.id} href={`${prefix}/building/${b.slug}`} className="block relative group">
                    <div className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-[color:var(--ui-text-soft)] bg-app transition-colors group-hover:border-[color:var(--ui-accent)] sm:-left-[34px]" />
                    <span className="mr-2 font-mono text-xs text-muted">{b.year_start || '?'}</span>
                    <span className="text-sm font-medium text-primary transition-colors group-hover:text-accent">{b.name_zh || b.name_en}</span>
                    {b.city && <span className="ml-2 text-xs text-muted">{b.city}</span>}
                  </Link>
                ))}
              </div>
            </div>

            <p className="eyebrow mb-4">{lang === 'en' ? 'All works' : lang === 'ja' ? '全作品' : '全部作品'}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {buildingsWithCovers.map(b => <BuildingCard key={b.id} building={b} lang={lang} />)}
            </div>
          </section>
        </Reveal>
      )}

      {/* ============================================================
          Continue Exploring — curated cross-links
          ============================================================ */}
      <ContinueExploring groups={[
        ...(influencesList.length > 0 ? [{
          label: t(lang, 'influences'),
          items: influencesList.map(a => ({
            id: a.slug,
            href: `${prefix}/architect/${a.slug}`,
            title: displayName(a, lang),
            subtitle: a.birth_year ? `${a.birth_year} – ${a.death_year || ''}` : undefined,
          }))
        }] : []),
        ...(influencedList.length > 0 ? [{
          label: t(lang, 'influenced'),
          items: influencedList.map(a => ({
            id: a.slug,
            href: `${prefix}/architect/${a.slug}`,
            title: displayName(a, lang),
            subtitle: a.birth_year ? `${a.birth_year} – ${a.death_year || ''}` : undefined,
          }))
        }] : []),
        ...(related.filter(a => era && a.era_slug === architect.era_slug).length > 0 ? [{
          label: lang === 'en' ? 'From the Same Era' : lang === 'ja' ? '同時代の建築家' : '同时代建筑师',
          items: related.filter(a => era && a.era_slug === architect.era_slug).map(a => ({
            id: a.slug,
            href: `${prefix}/architect/${a.slug}`,
            title: displayName(a, lang),
            subtitle: a.era_slug || undefined,
          }))
        }] : []),
        ...(relatedBuildings && relatedBuildings.length > 0 ? [{
          label: t(lang, 'relatedBuildings'),
          items: relatedBuildings.map(b => ({
            id: b.slug,
            href: `${prefix}/building/${b.slug}`,
            title: b.name_zh || b.name_en,
            subtitle: b.city ? `${b.city}, ${b.year_start || ''}` : undefined,
          }))
        }] : []),
      ]} />
    </PageShell>
  )
}
