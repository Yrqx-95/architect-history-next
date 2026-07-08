import Link from 'next/link'
import { formatDisplayLocation } from '@/lib/display'
import { hasCjk, isProbablySimplifiedChinese } from '@/lib/locale'
import { displayTaxonomyName } from '@/lib/taxonomy-display'
import type { BuildingWithCover } from '@/lib/types'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers } from '@/lib/data'
import { getArchitectRelations } from '@/lib/relations'
import {
  getResolvedArchitectKnowledgeRelations, relationText, ResolvedArchitectKnowledgeRelation, } from '@/lib/architect-knowledge-relations'
import { displayName } from '@/lib/display'
import { getArchitectContent, localizedContent } from '@/lib/architect-content'
import { getArchitectFallbackSummary, localizedNationality } from '@/lib/fallback-content'
import { getArchitectImageOverride } from '@/lib/architect-images'
import PageShell from '@/components/PageShell'
import Breadcrumb from '@/components/Breadcrumb'
import Reveal from '@/components/Reveal'
import ContinueExploring from '@/components/ContinueExploring'
import BuildingCard from '@/components/BuildingCard'
import ArchitectDeepArticle from '@/components/ArchitectDeepArticle'
import ArchitectPortraitFigure from '@/components/ArchitectPortraitFigure'

export const dynamicParams = false

function ArchitectKnowledgeNetwork({
  relations,
  lang,
  prefix,
}: {
  relations: ResolvedArchitectKnowledgeRelation[]
  lang: string
  prefix: string
}) {
  if (relations.length === 0) return null

  const copy = {
    eyebrow: { zh: '知识网络', en: 'Knowledge network', ja: '知識ネットワーク' },
    title: { zh: '人物关系', en: 'Architect relations', ja: '建築家の関係' },
    intro: {
      zh: '沿着师承、同代人与后继者，继续阅读这位建筑师所在的历史网络。',
      en: 'Follow mentors, peers, and successors to continue through this architect’s historical network.',
      ja: '師、同時代人、後継者をたどり、この建築家が属する歴史的ネットワークへ進む。',
    },
    from: { zh: '来自', en: 'from', ja: '由来' },
    to: { zh: '指向', en: 'to', ja: 'へ' },
    source: { zh: '关系来源', en: 'Relationship source', ja: '関係の出典' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en

  return (
    <Reveal>
      <section className="section-sm border-t border-subtle pt-8 sm:pt-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2">{l('eyebrow')}</p>
            <h2 className="heading-3">{l('title')}</h2>
          </div>
          <p className="caption max-w-lg sm:text-right">{l('intro')}</p>
        </div>
        <div className="overflow-hidden rounded-md border border-subtle bg-surface shadow-semantic-card">
          {relations.map(relation => (
            <Link
              key={`${relation.from}-${relation.to}-${relation.kind}`}
              href={`${prefix}/architect/${relation.architect.slug}`}
              className="group grid gap-3 border-b border-subtle px-4 py-4 transition-colors last:border-b-0 hover:bg-surface-muted sm:grid-cols-[10rem_minmax(0,1fr)_minmax(10rem,0.55fr)] sm:items-center"
            >
              <div>
                <p className="label">{relationText(relation.label, lang)}</p>
                <p className="caption mt-1">{relation.direction === 'incoming' ? l('from') : l('to')}</p>
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-medium leading-snug text-primary transition-colors group-hover:text-accent">
                  {displayName(relation.architect, lang)}
                </h3>
                <p className="body-sm mt-1 line-clamp-2 text-secondary">{relationText(relation.note, lang)}</p>
              </div>
              <p className="caption sm:text-right" title={relation.source.title}>{l('source')}</p>
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  )
}

function localizedEducation(value: string | null | undefined, lang: string): string {
  if (!value) return ''
  const normalized = value.trim()
  const map: Record<string, Record<string, string>> = {
    '东京大学': { zh: '东京大学', ja: '東京大学', en: 'University of Tokyo' },
    '東京大学': { zh: '东京大学', ja: '東京大学', en: 'University of Tokyo' },
    'University of Tokyo': { zh: '东京大学', ja: '東京大学', en: 'University of Tokyo' },
    '威斯康星大学麦迪逊分校（未毕业）': { zh: '威斯康星大学麦迪逊分校（未毕业）', ja: 'ウィスコンシン大学マディソン校（未卒業）', en: 'University of Wisconsin-Madison (did not graduate)' },
    '苏黎世联邦理工学院（ETH）': { zh: '苏黎世联邦理工学院（ETH）', ja: 'チューリッヒ工科大学（ETH）', en: 'ETH Zurich' },
  }
  const mapped = map[normalized]?.[lang]
  if (mapped) return mapped
  if (lang === 'ja' && isProbablySimplifiedChinese(normalized)) return ''
  return normalized
}

function visibleCoreIdeasForLanguage(ideas: string[], lang: string): string[] {
  if (lang === 'zh') return ideas
  if (lang === 'en') return ideas.filter(idea => !hasCjk(idea))
  if (lang === 'ja') {
    return ideas.filter(idea => /[ぁ-ゟァ-ヿー]/.test(idea) && !isProbablySimplifiedChinese(idea))
  }
  return ideas
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const rels = await getArchitectRelations(slug)
  if (!rels) return { title: 'Not Found' }
  const name = displayName(rels.architect, lang)
  const overlay = getArchitectContent(slug)
  const details = overlay
    ? localizedContent(overlay.summary, lang)
    : [
        rels.architect.birth_year,
        rels.architect.nationalities?.map(nationality => localizedNationality(nationality, lang)).join(lang === 'en' ? ', ' : '、'),
      ].filter(Boolean).join(' · ')
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
  const allArchitects = await getArchitects()
  const knowledgeRelations = getResolvedArchitectKnowledgeRelations(slug, allArchitects)
  const allBuildingsWithCovers = contentOverlay ? await getBuildingsWithCovers() : []
  const coverBySlug = new Map(allBuildingsWithCovers.map(building => [building.slug, building]))
  const buildingsWithCovers: BuildingWithCover[] = buildings.map(building => coverBySlug.get(building.slug) || building)

  const nameText = displayName(architect, lang)
  const cleanText = (text: string) => (lang === 'ja' && isProbablySimplifiedChinese(text) ? '' : text)
  const rawBioText = contentOverlay
    ? localizedContent(contentOverlay.summary, lang)
    : lang === 'ja'
      ? (architect.bio_ja || architect.bio_en)
      : lang === 'en'
        ? architect.bio_en
        : (architect.bio_zh || architect.bio_en)
  const fallbackBioText = getArchitectFallbackSummary({
    architect,
    buildings: buildingsWithCovers,
    era,
    styles,
    lang,
  })
  const rawBioClean = cleanText(rawBioText || '')
  const hasLocalizedBio = lang === 'en'
    ? rawBioClean.length >= 60
    : /[\u3400-\u9fffぁ-ゟァ-ヿ]/.test(rawBioClean) && rawBioClean.length >= 40
  const bioText = contentOverlay ? (rawBioText || '') : (hasLocalizedBio ? rawBioClean : fallbackBioText)
  const coreIdeas: string[] = contentOverlay
    ? []
    : visibleCoreIdeasForLanguage(Array.isArray(architect.core_ideas) ? architect.core_ideas : [], lang)
  const sortedBuildings = [...buildings].sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))
  const worksWithImages = buildingsWithCovers.filter(building => building.cover_url)
  const worksWithoutImages = buildingsWithCovers.filter(building => !building.cover_url)
  const verifiedPortrait = getArchitectImageOverride(slug)
  const overlayPortrait = contentOverlay?.portrait && !contentOverlay.portrait.url.startsWith('/images/architects/')
    ? contentOverlay.portrait
    : null
  const fallbackVisualWork = worksWithImages.find(work =>
    work.cover_url?.startsWith('/images/curated/') ||
    work.cover_source_url?.includes('commons.wikimedia.org') ||
    work.cover_license?.toLowerCase().includes('public domain') ||
    work.cover_license?.toLowerCase().includes('cc by')
  )
  const fallbackWorkPortrait = fallbackVisualWork
    ? {
        url: fallbackVisualWork.cover_url!,
        author: fallbackVisualWork.cover_photographer || 'Wikimedia Commons',
        license: fallbackVisualWork.cover_license || '',
        source_url: fallbackVisualWork.cover_source_url || '',
        alt: {
          zh: `${nameText}代表作图像：${displayName(fallbackVisualWork, 'zh')}`,
          ja: `${nameText}の代表作画像：${displayName(fallbackVisualWork, 'ja')}`,
          en: `Representative work image for ${nameText}: ${displayName(fallbackVisualWork, 'en')}`,
        },
      }
    : null
  const portrait = verifiedPortrait || overlayPortrait || fallbackWorkPortrait
  const visibleStyles = styles.filter(style => {
    const styleName = displayTaxonomyName(style, lang)
    return Boolean(styleName)
  })
  const primaryStyle = visibleStyles[0]
  const readingPathLinks = [
    era && {
      href: `${prefix}/browse/era/${era.slug}`,
      label: lang === 'en' ? 'Period' : lang === 'ja' ? '時代' : '时代',
      title: displayName(era, lang),
    },
    primaryStyle && {
      href: `${prefix}/browse/style/${primaryStyle.slug}`,
      label: lang === 'en' ? 'Style' : lang === 'ja' ? '様式' : '风格',
      title: displayTaxonomyName(primaryStyle, lang),
    },
    architect.nationalities?.[0] && {
      href: `${prefix}/search?q=${encodeURIComponent(architect.nationalities[0])}`,
      label: lang === 'en' ? 'Region' : lang === 'ja' ? '地域' : '地区',
      title: localizedNationality(architect.nationalities[0], lang),
    },
    sortedBuildings[0] && {
      href: `${prefix}/timeline#decade-${Math.floor((sortedBuildings[0].year_start || 0) / 10) * 10}`,
      label: lang === 'en' ? 'Chronology' : lang === 'ja' ? '年表' : '时间',
      title: sortedBuildings[0].year_start ? `${sortedBuildings[0].year_start}s` : t(lang, 'timeline'),
    },
  ].filter(Boolean) as Array<{ href: string; label: string; title: string }>

  const metaRows = [
    { label: t(lang, 'lifeSpan'), value: architect.birth_year ? `${architect.birth_year} – ${architect.death_year || t(lang, 'present')}` : null },
    {
      label: t(lang, 'nationality'),
      value: architect.nationalities?.length
        ? architect.nationalities.map(nationality => localizedNationality(nationality, lang)).join(lang === 'en' ? ', ' : '、')
        : null,
    },
    { label: t(lang, 'style'), value: visibleStyles.length ? visibleStyles.map(style => displayTaxonomyName(style, lang)).filter(Boolean).join(', ') : null },
    { label: t(lang, 'eras'), value: era ? displayName(era, lang) : null },
    { label: t(lang, 'education'), value: localizedEducation(architect.education, lang) || null },
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
            <div className="mt-8 lg:hidden">
              <ArchitectPortraitFigure
                portrait={portrait ? { ...portrait, alt: localizedContent(portrait.alt, lang) } : null}
                lang={lang}
                priority
              />
            </div>

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
              {visibleStyles.map(style => (
                <span key={style.id} className="inline-flex items-center rounded-full border border-subtle bg-surface-muted px-3 py-1 text-[0.7rem] uppercase tracking-wider text-soft">
                  {displayTaxonomyName(style, lang)}
                </span>
              ))}
            </div>
          </div>

          {/* —— Right column: portrait (5/12) —— */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="ml-auto max-w-[21rem] lg:sticky lg:top-24">
              <ArchitectPortraitFigure
                portrait={portrait ? { ...portrait, alt: localizedContent(portrait.alt, lang) } : null}
                lang={lang}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <ArchitectKnowledgeNetwork relations={knowledgeRelations} lang={lang} prefix={prefix} />

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
      {knowledgeRelations.length === 0 && (influencesList.length > 0 || influencedList.length > 0) && (
        <Reveal>
          <section className="section border-t border-subtle">
            <h2 className="heading-3 mb-6">{t(lang, 'relatedArchitects')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {influencesList.length > 0 && (
                <div>
                  <p className="eyebrow mb-3">{t(lang, 'influences')}</p>
                  <div className="divide-y divide-[color:var(--ui-border-subtle)] rounded-md border border-subtle bg-surface shadow-semantic-card">
                    {influencesList.map(a => <CompactArchitectLink key={a.slug} architect={a} lang={lang} prefix={prefix} />)}
                  </div>
                </div>
              )}
              {influencedList.length > 0 && (
                <div>
                  <p className="eyebrow mb-3">{t(lang, 'influenced')}</p>
                  <div className="divide-y divide-[color:var(--ui-border-subtle)] rounded-md border border-subtle bg-surface shadow-semantic-card">
                    {influencedList.map(a => <CompactArchitectLink key={a.slug} architect={a} lang={lang} prefix={prefix} />)}
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

            <div className="grid gap-6 lg:grid-cols-[minmax(18rem,0.58fr)_minmax(0,1fr)] lg:items-start">
              <aside className="rounded-md border border-subtle bg-surface p-4 shadow-semantic-card sm:p-5">
                <p className="eyebrow mb-4">{lang === 'en' ? 'Chronology' : lang === 'ja' ? '年表' : '作品年表'}</p>
                <div className="relative border-l-2 border-subtle pl-6 sm:pl-7">
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
                {readingPathLinks.length > 0 && (
                  <div className="mt-6 border-t border-subtle pt-5">
                    <p className="eyebrow mb-3">{lang === 'en' ? 'Reading route' : lang === 'ja' ? '読書経路' : '阅读路径'}</p>
                    <div className="grid gap-2">
                      {readingPathLinks.map(link => (
                        <Link
                          key={`${link.label}-${link.href}`}
                          href={link.href}
                          className="group grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 rounded-sm border border-subtle px-3 py-2.5 transition-colors hover:border-default hover:bg-surface-muted"
                        >
                          <span className="caption">{link.label}</span>
                          <span className="truncate text-sm font-medium text-primary transition-colors group-hover:text-accent">{link.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>

              <div>
                <p className="eyebrow mb-4">{lang === 'en' ? 'All works' : lang === 'ja' ? '全作品' : '全部作品'}</p>
                {worksWithImages.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    {worksWithImages.map(b => <BuildingCard key={b.id} building={b} lang={lang} />)}
                  </div>
                )}
                {worksWithoutImages.length > 0 && (
                  <div className={worksWithImages.length > 0 ? 'mt-8' : ''}>
                    <p className="caption mb-3">
                      {lang === 'en' ? 'Text index' : lang === 'ja' ? 'テキスト索引' : '文字索引'}
                    </p>
                    <div className="grid gap-x-6 gap-y-0 border-t border-subtle sm:grid-cols-2">
                      {worksWithoutImages.map(b => (
                        <Link
                          key={b.id}
                          href={`${prefix}/building/${b.slug}`}
                          className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-subtle py-3 text-sm transition-colors hover:text-accent"
                        >
                          <span className="font-medium text-primary">{displayName(b, lang)}</span>
                          <span className="text-muted">{b.year_start || ''}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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

function CompactArchitectLink({ architect, lang, prefix }: { architect: Awaited<ReturnType<typeof getArchitects>>[number]; lang: string; prefix: string }) {
  const years = architect.birth_year
    ? `${architect.birth_year}–${architect.death_year || (lang === 'en' ? 'present' : lang === 'ja' ? '現在' : '至今')}`
    : ''

  return (
    <Link
      href={`${prefix}/architect/${architect.slug}`}
      className="group grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-3 transition-colors hover:bg-surface-muted"
    >
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-primary transition-colors group-hover:text-accent">
          {displayName(architect, lang)}
        </span>
        {years && <span className="caption mt-1 block">{years}</span>}
      </span>
      <span className="self-center text-soft transition-colors group-hover:text-accent" aria-hidden="true">→</span>
    </Link>
  )
}
