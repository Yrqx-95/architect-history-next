import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getBuildings } from '@/lib/data'
import { getBuildingRelations } from '@/lib/relations'
import { displayName, displayText, formatCountryName, formatDisplayLocation, isProbablySimplifiedChinese, type Architect, type Building, type Era, type Style } from '@/lib/types'
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

  const nameText = displayName(building, lang)
  const cleanText = (text: string) => (lang === 'ja' && isProbablySimplifiedChinese(text) ? '' : text)
  const buildingLocation = formatDisplayLocation({
    city: building.city,
    country: building.country,
    countryCode: building.country_code,
    lang,
  })
  const sigText = cleanText(displayText(building.significance, lang))
  const spatialText = cleanText(displayText(building.spatial_feat, lang))
  const lightText = cleanText(displayText(building.light_feat, lang))
  const circulationText = cleanText(displayText(building.circulation, lang))

  const metaRows = [
    { label: t(lang, 'architects'), value: architect ? <Link href={`${prefix}/architect/${architect.slug}`} className="underline decoration-[color:var(--ui-border)] underline-offset-2 transition-colors hover:text-accent">{displayName(architect, lang)}</Link> : null },
    { label: t(lang, 'year'), value: building.year_start ? `${building.year_start}${building.year_end ? ` – ${building.year_end}` : ''}` : null },
    { label: t(lang, 'location'), value: buildingLocation || null },
    { label: t(lang, 'type'), value: building.type_slug && !(lang === 'ja' && isProbablySimplifiedChinese(building.type_slug)) ? building.type_slug : null },
    { label: t(lang, 'structure'), value: building.structure && !(lang === 'ja' && isProbablySimplifiedChinese(building.structure)) ? building.structure : null },
    { label: t(lang, 'materials'), value: building.materials?.length && lang !== 'ja' ? building.materials.join(', ') : null },
    { label: t(lang, 'area'), value: building.area_sqm ? `${building.area_sqm.toLocaleString()} m²` : null },
    { label: t(lang, 'style'), value: buildingStyles.length ? buildingStyles.map(style => displayName(style, lang)).join(', ') : null },
    { label: t(lang, 'eras'), value: era ? displayName(era, lang) : null },
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
        <ImageGallery images={images} alt={nameText} />
      </div>

      {/* Title + content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 section">
        <div className="lg:col-span-2 flow">
          <h1 className="heading-display">{nameText}</h1>
          {building.name_en !== nameText && (
            <p className="text-sm leading-relaxed text-secondary">{building.name_en}</p>
          )}

          {sigText && <PullQuote>{sigText}</PullQuote>}

          {/* ============================================================
              Deep Analysis — layered content sections with reading anchors
              ============================================================ */}
          <div className="space-y-14 sm:space-y-16 mt-8">
            {spatialText && (
              <Reveal>
                <ArticleSection id="spatial-analysis" title={t(lang, 'spatial')}>
                  <div className="prose prose-stone dark:prose-invert body max-w-none">{spatialText}</div>
                </ArticleSection>
              </Reveal>
            )}

            {/* Image break between analysis sections */}
            {spatialText && lightText && images.length > 1 && (
              <ImageBreak src={images[1]?.url_original || images[0].url_original} alt={nameText}
                photographer={images[1]?.photographer} license={images[1]?.license} sourceUrl={images[1]?.source_url} />
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
          </div>
        </div>

        {/* Sticky sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20">
            <p className="eyebrow mb-3">{t(lang, 'overview')}</p>
            <MetadataPanel rows={metaRows} />
          </div>
        </div>
      </div>

      <BuildingKnowledgeNetwork
        lang={lang}
        prefix={prefix}
        architect={architect}
        styles={buildingStyles}
        era={era}
        building={building}
        related={related}
      />

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
