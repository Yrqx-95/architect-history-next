import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getBuildings, getBuildingsWithCovers, getEras } from '@/lib/data'
import { getBuildingRelations } from '@/lib/relations'
import { displayName, displayText, formatCountryName, formatDisplayLocation, isProbablySimplifiedChinese, type Architect, type Building, type Era, type Style } from '@/lib/types'
import { findTimelinePeriodForEra, findTimelinePeriodForRange, localizedTimelineText, type TimelinePeriod } from '@/lib/timeline-periods'
import { getBuildingFallbackContent } from '@/lib/fallback-content'
import PageShell from '@/components/PageShell'
import Breadcrumb from '@/components/Breadcrumb'
import ImageGallery from '@/components/ImageGallery'
import ImageBreak from '@/components/ImageBreak'
import MetadataPanel from '@/components/MetadataPanel'
import PullQuote from '@/components/PullQuote'
import ArticleSection from '@/components/ArticleSection'
import Reveal from '@/components/Reveal'
import ContinueExploring from '@/components/ContinueExploring'
import BuildingCard from '@/components/BuildingCard'

export const revalidate = 86400
export const dynamicParams = true

function findEraForBuildingYear(building: Building, eras: Era[]): Era | null {
  if (building.year_start == null) return null
  return eras.find(era => {
    if (era.year_start == null) return false
    const end = era.year_end ?? era.year_start
    return building.year_start! >= era.year_start && building.year_start! <= end
  }) || null
}

function BuildingPeriodContext({
  lang,
  prefix,
  building,
  era,
  period,
}: {
  lang: string
  prefix: string
  building: Building
  era: Era | null
  period: TimelinePeriod | null
}) {
  if (!period) return null

  const copy = {
    eyebrow: { zh: '历史背景', en: 'Historical context', ja: '歴史背景' },
    title: { zh: '这座建筑所在的问题', en: 'The question around this work', ja: 'この建築を囲む問い' },
    turn: { zh: '时代转向', en: 'Historical turn', ja: '時代の転換' },
    timeline: { zh: '在时间轴中查看', en: 'View in timeline', ja: '時間軸で見る' },
    era: { zh: '进入时代页', en: 'Open period page', ja: '時代ページへ' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
  const contextMeta = [
    building.year_start,
    era ? displayName(era, lang) : localizedTimelineText(period.label, lang),
  ].filter(Boolean).join(' · ')

  return (
    <Reveal>
      <section className="section-sm border-t border-subtle pt-8 sm:pt-10">
        <div className="rounded-md border border-subtle bg-surface p-5 shadow-semantic-card sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,0.68fr)_minmax(16rem,0.32fr)]">
            <div>
              <p className="eyebrow mb-3">{l('eyebrow')}</p>
              {contextMeta && <p className="metadata mb-4">{contextMeta}</p>}
              <h2 className="heading-3 mb-4">{l('title')}</h2>
              <p className="text-xl font-medium leading-snug text-primary sm:text-2xl">
                {localizedTimelineText(period.question, lang)}
              </p>
              <p className="body-sm mt-4 max-w-3xl text-secondary">
                {localizedTimelineText(period.summary, lang)}
              </p>
            </div>
            <aside className="border-t border-subtle pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="label mb-3">{l('turn')}</p>
              <p className="caption">{localizedTimelineText(period.transition, lang)}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {era && (
                  <Link href={`${prefix}/browse/era/${era.slug}`} className="text-sm font-medium text-accent underline underline-offset-4">
                    {l('era')}
                  </Link>
                )}
                <Link href={`${prefix}/timeline#period-${period.id}`} className="text-sm font-medium text-accent underline underline-offset-4">
                  {l('timeline')}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Reveal>
  )
}

function BuildingKnowledgeNetwork({
  lang,
  prefix,
  architect,
  styles,
  era,
  building,
  related,
}: {
  lang: string
  prefix: string
  architect: Architect | null
  styles: Style[]
  era: Era | null
  building: Building
  related: Building[]
}) {
  const copy = {
    eyebrow: { zh: '知识网络', en: 'Knowledge network', ja: '知識ネットワーク' },
    title: { zh: '阅读路径', en: 'Reading paths', ja: '読み進める経路' },
    intro: {
      zh: '从作者、时代、风格、地点和相近作品继续理解这座建筑的位置。',
      en: 'Continue through authorship, period, style, place, and nearby works.',
      ja: '作者、時代、様式、場所、近い作品から、この建築の位置を読み進める。',
    },
    architect: { zh: '作者', en: 'Architect', ja: '設計者' },
    period: { zh: '时代', en: 'Period', ja: '時代' },
    style: { zh: '风格', en: 'Style', ja: '様式' },
    region: { zh: '地域', en: 'Region', ja: '地域' },
    similar: { zh: '相近作品', en: 'Related work', ja: '近い作品' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
  const countryCode = building.country_code?.toLowerCase()
  const countryName = countryCode && building.country
    ? formatCountryName(countryCode, building.country, lang) || building.country
    : ''
  const cards = [
    architect && {
      key: `architect-${architect.slug}`,
      href: `${prefix}/architect/${architect.slug}`,
      label: l('architect'),
      title: displayName(architect, lang),
      meta: architect.birth_year ? `${architect.birth_year}–${architect.death_year || (lang === 'en' ? 'present' : lang === 'ja' ? '現在' : '至今')}` : '',
    },
    era && {
      key: `era-${era.slug}`,
      href: `${prefix}/browse/era/${era.slug}`,
      label: l('period'),
      title: displayName(era, lang),
      meta: era.year_start ? `${era.year_start}${era.year_end ? `–${era.year_end}` : ''}` : '',
    },
    ...styles.slice(0, 2).map(style => ({
      key: `style-${style.slug}`,
      href: `${prefix}/browse/style/${style.slug}`,
      label: l('style'),
      title: displayName(style, lang),
      meta: style.era_slug || '',
    })),
    countryCode && countryName && {
      key: `country-${countryCode}`,
      href: `${prefix}/browse/country/${countryCode}`,
      label: l('region'),
      title: countryName,
      meta: building.city || '',
    },
    ...related.slice(0, 2).map(item => ({
      key: `building-${item.slug}`,
      href: `${prefix}/building/${item.slug}`,
      label: l('similar'),
      title: displayName(item, lang),
      meta: [item.year_start, formatDisplayLocation({ city: item.city, country: item.country, countryCode: item.country_code, lang })].filter(Boolean).join(' · '),
    })),
  ].filter(Boolean) as Array<{ key: string; href: string; label: string; title: string; meta: string }>

  if (cards.length === 0) return null

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
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(card => (
            <Link
              key={card.key}
              href={card.href}
              className="group rounded-md border border-subtle bg-surface p-4 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted"
            >
              <p className="label mb-4">{card.label}</p>
              <h3 className="text-lg font-medium leading-snug text-primary transition-colors group-hover:text-accent">{card.title}</h3>
              {card.meta && <p className="caption mt-2">{card.meta}</p>}
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  )
}

function BuildingStudyMap({
  lang,
  building,
  hasSpatial,
  hasLight,
  hasCirculation,
}: {
  lang: string
  building: Building
  hasSpatial: boolean
  hasLight: boolean
  hasCirculation: boolean
}) {
  const copy = {
    eyebrow: { zh: '作品研究', en: 'Study map', ja: '作品研究' },
    title: { zh: '从这些维度阅读', en: 'Read through these lenses', ja: 'この視点から読む' },
    intro: {
      zh: '先定位历史问题，再进入空间、光线、动线、结构与来源；已开放的维度可以直接跳转阅读。',
      en: 'Start with the historical question, then read space, light, circulation, structure, and sources.',
      ja: '歴史的な問いを確認し、空間、光、動線、構造、出典へ進む。',
    },
    spatial: { zh: '空间组织', en: 'Spatial organization', ja: '空間構成' },
    light: { zh: '光线', en: 'Light', ja: '光' },
    circulation: { zh: '动线', en: 'Circulation', ja: '動線' },
    structure: { zh: '结构 / 材料', en: 'Structure / materials', ja: '構造・素材' },
    sources: { zh: '来源', en: 'Sources', ja: '出典' },
    available: { zh: '已整理', en: 'Available', ja: '整理済み' },
    pending: { zh: '待补充', en: 'Pending', ja: '追加予定' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
  const hasLocalizedStructure = Boolean(
    building.structure && !(lang === 'ja' && isProbablySimplifiedChinese(building.structure))
  )
  const hasLocalizedMaterials = Boolean(building.materials?.length && lang !== 'ja')
  const structureReady = Boolean(hasLocalizedStructure || hasLocalizedMaterials || building.area_sqm)
  const sourcesReady = Boolean(building.wikipedia_url || building.official_url)
  const items = [
    { href: '#spatial-analysis', title: l('spatial'), ready: hasSpatial },
    { href: '#light-analysis', title: l('light'), ready: hasLight },
    { href: '#circulation-analysis', title: l('circulation'), ready: hasCirculation },
    { href: '#technical-notes', title: l('structure'), ready: structureReady },
    { href: '#building-sources', title: l('sources'), ready: sourcesReady },
  ]

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
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {items.map(item => {
            const className = `rounded-md border p-4 transition-colors ${
              item.ready
                ? 'border-subtle bg-surface shadow-semantic-card hover:border-default hover:bg-surface-muted'
                : 'border-subtle bg-surface-muted'
            }`
            const content = (
              <>
                <p className="text-sm font-medium leading-snug text-primary">{item.title}</p>
                <p className="caption mt-3">{item.ready ? l('available') : l('pending')}</p>
              </>
            )

            return item.ready ? (
              <a key={item.href} href={item.href} className={className}>
                {content}
              </a>
            ) : (
              <div key={item.href} className={className} aria-disabled="true">
                {content}
              </div>
            )
          })}
        </div>
      </section>
    </Reveal>
  )
}

function BuildingTechnicalNotes({ lang, building }: { lang: string; building: Building }) {
  const copy = {
    title: { zh: '结构与材料', en: 'Structure and materials', ja: '構造と素材' },
    structure: { zh: '结构', en: 'Structure', ja: '構造' },
    materials: { zh: '材料', en: 'Materials', ja: '素材' },
    area: { zh: '面积', en: 'Area', ja: '面積' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
  const structure =
    building.structure && !(lang === 'ja' && isProbablySimplifiedChinese(building.structure))
      ? building.structure
      : null
  const materials = building.materials?.length && lang !== 'ja' ? building.materials.join(', ') : null
  const rows = [
    structure && { label: l('structure'), value: structure },
    materials && { label: l('materials'), value: materials },
    building.area_sqm && { label: l('area'), value: `${building.area_sqm.toLocaleString()} m²` },
  ].filter(Boolean) as Array<{ label: string; value: string }>
  if (rows.length === 0) return null

  return (
    <Reveal>
      <ArticleSection id="technical-notes" title={l('title')}>
        <div className="divide-y divide-[color:var(--ui-border-subtle)] rounded-md border border-subtle bg-surface">
          {rows.map(row => (
            <div key={row.label} className="grid gap-2 px-4 py-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
              <p className="label">{row.label}</p>
              <p className="body-sm text-primary">{row.value}</p>
            </div>
          ))}
        </div>
      </ArticleSection>
    </Reveal>
  )
}

function BuildingSources({
  lang,
  building,
  galleryImages,
}: {
  lang: string
  building: Building
  galleryImages: Array<{ source_url: string; photographer: string | null; license: string | null }>
}) {
  const imageSource = galleryImages.find(image => image.source_url)
  const sources = [
    building.official_url && { label: lang === 'en' ? 'Official site' : lang === 'ja' ? '公式サイト' : '官方网站', href: building.official_url },
    building.wikipedia_url && { label: 'Wikipedia', href: building.wikipedia_url },
    building.wikidata_id && { label: 'Wikidata', href: `https://www.wikidata.org/wiki/${building.wikidata_id}` },
    !building.official_url && !building.wikipedia_url && imageSource && {
      label: lang === 'en' ? 'Image source' : lang === 'ja' ? '画像資料' : '图片来源',
      href: imageSource.source_url,
    },
  ].filter(Boolean) as Array<{ label: string; href: string }>

  if (sources.length === 0) return null

  return (
    <Reveal>
      <section id="building-sources" className="section-sm border-t border-subtle pt-8 sm:pt-10">
        <p className="eyebrow mb-3">{lang === 'en' ? 'Sources' : lang === 'ja' ? '出典' : '来源'}</p>
        <div className="flex flex-wrap gap-3">
          {sources.map(source => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent underline underline-offset-4">
              {source.label}
            </a>
          ))}
        </div>
      </section>
    </Reveal>
  )
}

export async function generateStaticParams() {
  const buildings = await getBuildings()
  return ['zh', 'en', 'ja'].flatMap(lang => buildings.map(b => ({ lang, slug: b.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const rels = await getBuildingRelations(slug)
  if (!rels) return { title: 'Not Found' }
  const name = displayName(rels.building, lang)
  const arch = rels.architect ? displayName(rels.architect, lang) : ''
  const desc = [name, rels.building.city, rels.building.country, rels.building.year_start, arch].filter(Boolean).join(' · ')
  return { title: name, description: desc }
}

export default async function BuildingPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const rels = await getBuildingRelations(slug)
  if (!rels) notFound()

  const { building, architect, relatedBuildings: related, images, styles: buildingStyles, era } = rels
  const prefix = `/${lang}`
  const [allEras, buildingsWithCovers] = await Promise.all([getEras(), getBuildingsWithCovers()])
  const buildingWithCover = buildingsWithCovers.find(item => item.slug === building.slug)
  const curatedCoverImage = buildingWithCover?.cover_url
    ? {
        id: `${building.id}-curated-cover`,
        building_id: building.id,
        url_original: buildingWithCover.cover_url,
        url_thumb_400: buildingWithCover.cover_url,
        photographer: buildingWithCover.cover_photographer || null,
        source: 'curated',
        license: buildingWithCover.cover_license || null,
        source_url: buildingWithCover.cover_source_url || '',
        img_type: 'exterior',
        is_primary: true,
      }
    : null
  const curatedCoverUrl = curatedCoverImage?.url_original
  const supportingImages = images
    .filter(image => image.url_original !== curatedCoverUrl)
    .filter(image => image.source !== 'Unsplash' || !curatedCoverImage)
  const galleryImages = curatedCoverImage ? [curatedCoverImage] : supportingImages.slice(0, 1)
  const contextEra = era || findEraForBuildingYear(building, allEras)
  const timelinePeriod = contextEra
    ? findTimelinePeriodForEra(contextEra)
    : findTimelinePeriodForRange(building.year_start, building.year_end)

  const nameText = displayName(building, lang)
  const cleanText = (text: string) => (lang === 'ja' && isProbablySimplifiedChinese(text) ? '' : text)
  const buildingLocation = formatDisplayLocation({
    city: building.city,
    country: building.country,
    countryCode: building.country_code,
    lang,
  })
  const fallbackContent = getBuildingFallbackContent({
    building,
    architect,
    styles: buildingStyles,
    era: contextEra,
    lang,
  })
  const descriptionText = cleanText(displayText(building.description, lang)) || fallbackContent.summary
  const sigText = cleanText(displayText(building.significance, lang)) || fallbackContent.significance
  const spatialText = cleanText(displayText(building.spatial_feat, lang)) || fallbackContent.spatial
  const lightText = cleanText(displayText(building.light_feat, lang)) || fallbackContent.light
  const circulationText = cleanText(displayText(building.circulation, lang)) || fallbackContent.circulation

  const metaRows = [
    { label: t(lang, 'architects'), value: architect ? <Link href={`${prefix}/architect/${architect.slug}`} className="underline decoration-[color:var(--ui-border)] underline-offset-2 transition-colors hover:text-accent">{displayName(architect, lang)}</Link> : null },
    { label: t(lang, 'year'), value: building.year_start ? `${building.year_start}${building.year_end ? ` – ${building.year_end}` : ''}` : null },
    { label: t(lang, 'location'), value: buildingLocation || null },
    { label: t(lang, 'type'), value: building.type_slug && !(lang === 'ja' && isProbablySimplifiedChinese(building.type_slug)) ? building.type_slug : null },
    { label: t(lang, 'structure'), value: building.structure && !(lang === 'ja' && isProbablySimplifiedChinese(building.structure)) ? building.structure : null },
    { label: t(lang, 'materials'), value: building.materials?.length && lang !== 'ja' ? building.materials.join(', ') : null },
    { label: t(lang, 'area'), value: building.area_sqm ? `${building.area_sqm.toLocaleString()} m²` : null },
    { label: t(lang, 'style'), value: buildingStyles.length ? buildingStyles.map(style => displayName(style, lang)).join(', ') : null },
    { label: t(lang, 'eras'), value: contextEra ? displayName(contextEra, lang) : null },
  ].filter(r => r.value)

  return (
    <PageShell>
      <Breadcrumb items={[
        { label: t(lang, 'home'), href: `/${lang}` },
        { label: t(lang, 'buildings'), href: `/${lang}/browse` },
        { label: nameText },
      ]} />

      {/* Hero: image gallery */}
      <div className="section-sm">
        <ImageGallery images={galleryImages} alt={nameText} />
      </div>

      {/* Title + metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 section">
        <div className="lg:col-span-2 flow">
          <h1 className="heading-display">{nameText}</h1>
          {building.name_en !== nameText && (
            <p className="text-sm leading-relaxed text-secondary">{building.name_en}</p>
          )}
          {descriptionText && (
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
              {descriptionText}
            </p>
          )}

          {sigText && <PullQuote>{sigText}</PullQuote>}
        </div>

        {/* Sticky sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20">
            <p className="eyebrow mb-3">{t(lang, 'overview')}</p>
            <MetadataPanel rows={metaRows} />
          </div>
        </div>
      </div>

      <BuildingPeriodContext
        lang={lang}
        prefix={prefix}
        building={building}
        era={contextEra}
        period={timelinePeriod}
      />

      <BuildingStudyMap
        lang={lang}
        building={building}
        hasSpatial={Boolean(spatialText)}
        hasLight={Boolean(lightText)}
        hasCirculation={Boolean(circulationText)}
      />

      {/* Deep Analysis — layered content sections with reading anchors */}
      <div className="section-sm space-y-14 sm:space-y-16">
        {spatialText && (
          <Reveal>
            <ArticleSection id="spatial-analysis" title={t(lang, 'spatial')}>
              <div className="prose prose-stone dark:prose-invert body max-w-none">{spatialText}</div>
            </ArticleSection>
          </Reveal>
        )}

        {spatialText && lightText && galleryImages.length > 1 && (
          <ImageBreak src={galleryImages[1]?.url_original || galleryImages[0].url_original} alt={nameText}
            photographer={galleryImages[1]?.photographer} license={galleryImages[1]?.license} sourceUrl={galleryImages[1]?.source_url} />
        )}

        {lightText && (
          <Reveal>
            <ArticleSection id="light-analysis" title={t(lang, 'lighting')}>
              <div className="prose prose-stone dark:prose-invert body max-w-none">{lightText}</div>
            </ArticleSection>
          </Reveal>
        )}

        {circulationText && (
          <Reveal>
            <ArticleSection id="circulation-analysis" title={t(lang, 'circulation')}>
              <div className="prose prose-stone dark:prose-invert body max-w-none">{circulationText}</div>
            </ArticleSection>
          </Reveal>
        )}

        <BuildingTechnicalNotes lang={lang} building={building} />
      </div>

      <BuildingKnowledgeNetwork
        lang={lang}
        prefix={prefix}
        architect={architect}
        styles={buildingStyles}
        era={contextEra}
        building={building}
        related={related}
      />

      <BuildingSources lang={lang} building={building} galleryImages={galleryImages} />

      {/* Related buildings */}
      {related.length > 0 && (
        <Reveal>
          <section className="border-t border-subtle pt-10 sm:pt-12">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="heading-3">{t(lang, 'relatedBuildings')}</h2>
                <p className="caption mt-1">{related.length} {lang === 'en' ? 'similar buildings' : lang === 'ja' ? '件の関連建築' : '座相关建筑'}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {related.slice(0, 6).map(b => {
                const relArch = architect && b.architect_slug === architect.slug ? displayName(architect, lang) : ''
                return <BuildingCard key={b.id} building={b} lang={lang} architectName={relArch} />
              })}
            </div>
          </section>
        </Reveal>
      )}

      {/* Continue Exploring */}
      <ContinueExploring lang={lang} groups={[
        ...(architect ? [{
          label: lang === 'en' ? `More by ${displayName(architect, lang)}` : lang === 'ja' ? `${displayName(architect, lang)}の他の作品` : `${displayName(architect, lang)}的其他作品`,
          href: `/${lang}/architect/${architect.slug}`,
          items: related.filter(b => b.architect_slug === architect.slug).slice(0, 4).map(b => ({
            id: b.slug,
            href: `${prefix}/building/${b.slug}`,
            title: displayName(b, lang),
            subtitle: [formatDisplayLocation({ city: b.city, country: b.country, countryCode: b.country_code, lang }), b.year_start].filter(Boolean).join(', ') || undefined,
          }))
        }] : []),
        ...(related.filter(b => b.architect_slug !== architect?.slug).length > 0 ? [{
          label: lang === 'en' ? 'Similar Buildings' : lang === 'ja' ? '類似の建築' : '相似建筑',
          items: related.filter(b => b.architect_slug !== architect?.slug).slice(0, 4).map(b => ({
            id: b.slug,
            href: `${prefix}/building/${b.slug}`,
            title: displayName(b, lang),
            subtitle: [formatDisplayLocation({ city: b.city, country: b.country, countryCode: b.country_code, lang }), b.year_start].filter(Boolean).join(', '),
          }))
        }] : []),
        ...(buildingStyles.length > 0 ? [{
          label: lang === 'en' ? 'Explore This Style' : lang === 'ja' ? 'この様式を探索' : '探索此风格',
          items: buildingStyles.slice(0, 4).map(s => ({
            id: s.slug,
            href: `${prefix}/browse/style/${s.slug}`,
            title: displayName(s, lang),
          }))
        }] : []),
      ]} />
    </PageShell>
  )
}
