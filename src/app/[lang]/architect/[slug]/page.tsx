import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers } from '@/lib/data'
import { getArchitectRelations } from '@/lib/relations'
import { displayName, formatDisplayLocation, isProbablySimplifiedChinese } from '@/lib/types'
import { getArchitectContent, localizedContent } from '@/lib/architect-content'
import PageShell from '@/components/PageShell'
import Breadcrumb from '@/components/Breadcrumb'
import Reveal from '@/components/Reveal'
import ContinueExploring from '@/components/ContinueExploring'
import BuildingCard from '@/components/BuildingCard'
import ArchitectCard from '@/components/ArchitectCard'
import ArchitectDeepArticle from '@/components/ArchitectDeepArticle'
import SafeImage from '@/components/SafeImage'
import ImageAttribution from '@/components/ImageAttribution'

export const revalidate = 86400
export const dynamicParams = true

function ArchitectPortraitFigure({
  content,
  lang,
  className = '',
}: {
  content: NonNullable<ReturnType<typeof getArchitectContent>>
  lang: string
  className?: string
}) {
  return (
    <figure className={`overflow-hidden rounded-sm ${className}`}>
      <div className="relative aspect-[3/4] bg-surface-muted">
        <SafeImage
          src={content.portrait.url}
          alt={localizedContent(content.portrait.alt, lang)}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 36rem"
        />
      </div>
      <figcaption className="mt-2.5 flex items-start justify-between gap-3">
        <p className="text-xs leading-relaxed text-muted max-w-[70%]">{localizedContent(content.portrait.alt, lang)}</p>
        <ImageAttribution
          photographer={content.portrait.author}
          license={content.portrait.license}
          sourceUrl={content.portrait.source_url}
          tone="dark"
        />
      </figcaption>
    </figure>
  )
}

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

  const { architect, buildings, relatedArchitects: related, relatedBuildings, influencesList, influencedList, era, styles } = rels
  const prefix = `/${lang}`
  const contentOverlay = getArchitectContent(slug)
  const allBuildingsWithCovers = contentOverlay ? await getBuildingsWithCovers() : []
  const coverBySlug = new Map(allBuildingsWithCovers.map(building => [building.slug, building]))
  const buildingsWithCovers = buildings.map(building => coverBySlug.get(building.slug) || building)

  const nameText = displayName(architect, lang)
  const cleanText = (text: string) => (lang === 'ja' && isProbablySimplifiedChinese(text) ? '' : text)
  const rawBioText = contentOverlay
    ? localizedContent(contentOverlay.summary, lang)
    : lang === 'ja' ? (architect.bio_ja || architect.bio_en) : lang === 'en' ? architect.bio_en : (architect.bio_zh || architect.bio_en)
  const bioText = cleanText(rawBioText || '')
  const coreIdeas: string[] = contentOverlay ? [] : Array.isArray(architect.core_ideas) ? architect.core_ideas : []
  const sortedBuildings = [...buildings].sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))

  const metaRows = [
    { label: t(lang, 'lifeSpan'), value: architect.birth_year ? `${architect.birth_year} – ${architect.death_year || t(lang, 'present')}` : null },
    { label: t(lang, 'nationality'), value: architect.nationalities?.join(', ') || null },
    { label: t(lang, 'style'), value: styles.length ? styles.map(style => displayName(style, lang)).join(', ') : null },
    { label: t(lang, 'eras'), value: era ? displayName(era, lang) : null },
    { label: t(lang, 'education'), value: architect.education ? cleanText(architect.education) : null },
  ].filter(r => r.value)

  return (
    <PageShell>
      <Breadcrumb items={[
        { label: t(lang, 'home'), href: `/${lang}` },
        { label: t(lang, 'architects'), href: `/${lang}/browse` },
        { label: nameText },
      ]} />

      {/* ============================================================
          Hero — asymmetric editorial grid
          ============================================================ */}
      <section className="section-sm pb-0 sm:section">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-start">

          {/* —— Left column: text content (7/12) —— */}
          <div className="lg:col-span-7">

            {/* Name block */}
            <div>
              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-serif font-normal leading-[1.08] tracking-normal text-primary">
                {nameText}
              </h1>
              {architect.name_en && architect.name_en !== nameText && (
                <p className="mt-2 text-sm font-medium tracking-widest uppercase text-muted">{architect.name_en}</p>
              )}
            </div>

            {/* Portrait — mobile only, after name */}
            {contentOverlay && (
              <div className="mt-8 lg:hidden">
                <ArchitectPortraitFigure content={contentOverlay} lang={lang} />
              </div>
            )}

            {/* Bio — editorial pull-text with subtle left accent */}
            {bioText && (
              <div className="mt-8 border-l-2 border-[color:var(--ui-accent)] pl-5 sm:pl-6">
                <p className="text-base leading-relaxed text-secondary max-w-[52rem] sm:text-lg sm:leading-relaxed">
                  {bioText}
                </p>
              </div>
            )}

            {/* Metadata ribbon — horizontal, no card */}
            {metaRows.length > 0 && (
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs">
                {metaRows.map((row, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-muted">
                    <span className="font-medium uppercase tracking-widest text-soft" style={{ fontSize: '0.625rem' }}>{row.label}</span>
                    <span className="text-secondary">{row.value}</span>
                    {i < metaRows.length - 1 && (
                      <span className="ml-1.5 inline-block h-1 w-1 rounded-full bg-[color:var(--ui-border)]" aria-hidden="true" />
                    )}
                  </span>
                ))}
              </div>
            )}

            {/* Style / Era tags */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {era && (
                <span className="inline-flex items-center rounded-full border border-subtle bg-surface-muted px-3 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-muted">
                  {displayName(era, lang)}
                </span>
              )}
              {styles.map(style => (
                <span key={style.id} className="inline-flex items-center rounded-full border border-subtle bg-surface-muted px-3 py-1 text-[0.7rem] uppercase tracking-wider text-soft">
                  {displayName(style, lang)}
                </span>
              ))}
            </div>
          </div>

          {/* —— Right column: portrait (5/12) —— */}
          <div className="hidden lg:block lg:col-span-5">
            {contentOverlay && (
              <div className="lg:sticky lg:top-24">
                <ArchitectPortraitFigure content={contentOverlay} lang={lang} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          Deep Article — overlay content
          ============================================================ */}
      {contentOverlay && (
        <Reveal>
          <ArchitectDeepArticle content={contentOverlay} lang={lang} works={allBuildingsWithCovers} />
        </Reveal>
      )}

      {/* ============================================================
          Core Ideas — non-overlay fallback
          ============================================================ */}
      {coreIdeas.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle">
            <h2 className="heading-3 mb-6">{t(lang, 'coreIdeas')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {coreIdeas.map((idea, i) => (
                <div key={i} className="rounded-sm border border-subtle bg-surface px-5 py-4 body-sm shadow-semantic-card">
                  {idea}
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ============================================================
          Influences / Influenced
          ============================================================ */}
      {(influencesList.length > 0 || influencedList.length > 0) && (
        <Reveal>
          <section className="section border-t border-subtle">
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

      {/* ============================================================
          Works — timeline + card grid
          ============================================================ */}
      {buildings.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="heading-3">{t(lang, 'works')}</h2>
                <p className="caption mt-1">{buildings.length} {lang === 'en' ? 'buildings' : lang === 'ja' ? '作品' : '座建筑'}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative mb-12 border-l-2 border-subtle pl-6 sm:pl-8">
              <div className="space-y-4 sm:space-y-5">
                {sortedBuildings.slice(0, 15).map(b => (
                  <Link key={b.id} href={`${prefix}/building/${b.slug}`} className="block relative group">
                    <div className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-[color:var(--ui-text-soft)] bg-app transition-colors group-hover:border-[color:var(--ui-accent)] sm:-left-[34px]" />
                    <span className="mr-2 font-mono text-xs text-muted">{b.year_start || '?'}</span>
                    <span className="text-sm font-medium text-primary transition-colors group-hover:text-accent">{displayName(b, lang)}</span>
                    {formatDisplayLocation({ city: b.city, country: b.country, countryCode: b.country_code, lang }) && (
                      <span className="ml-2 text-xs text-muted">
                        {formatDisplayLocation({ city: b.city, country: b.country, countryCode: b.country_code, lang })}
                      </span>
                    )}
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
          Continue Exploring
          ============================================================ */}
      <ContinueExploring lang={lang} groups={[
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
            subtitle: era ? displayName(era, lang) : undefined,
          }))
        }] : []),
        ...(relatedBuildings && relatedBuildings.length > 0 ? [{
          label: t(lang, 'relatedBuildings'),
          items: relatedBuildings.map(b => ({
            id: b.slug,
            href: `${prefix}/building/${b.slug}`,
            title: displayName(b, lang),
            subtitle: [formatDisplayLocation({ city: b.city, country: b.country, countryCode: b.country_code, lang }), b.year_start].filter(Boolean).join(', ') || undefined,
          }))
        }] : []),
      ]} />
    </PageShell>
  )
}
