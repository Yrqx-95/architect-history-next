import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers, getStyles } from '@/lib/data'
import { displayName, displayText, formatDisplayLocation } from '@/lib/display'
import SectionHeading from '@/components/SectionHeading'
import CinematicHero from '@/components/CinematicHero'
import HomeSectionReveal from '@/components/HomeSectionReveal'
import EditorialImage from '@/components/EditorialImage'
import ImageAttribution from '@/components/ImageAttribution'
import ArchitectPortraitThumb from '@/components/ArchitectPortraitThumb'
import { getArchitectImageOverride } from '@/lib/architect-images'
import { localizedNationality } from '@/lib/fallback-content'
import type { Architect } from '@/lib/types'
import { getHomeCopy } from './home-copy'
import { buildHomeData } from './home-data'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const copy = getHomeCopy(lang)
  return {
    title: t(lang, 'hero'),
    description: copy.metaDescription,
  }
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const [allBuildings, architects, styles] = await Promise.all([
    getBuildingsWithCovers(),
    getArchitects(),
    getStyles(),
  ])
  const {
    prefix,
    copy,
    learningCopy,
    visibleBuildings,
    visibleCountries,
    cleanSnippet,
    heroBuilding,
    studyBuilding,
    exploreBuilding,
    featuredLead,
    secondaryFeatured,
    heroImage,
    heroName,
    heroArchitectName,
    heroLocation,
    heroYear,
    heroMeta,
    heroDescription,
    featuredLabel,
    architectVisualBySlug,
    buildingCountByArchitect,
    majorArchitects,
  } = buildHomeData({ lang, allBuildings, architects, styles })

  return (
    <div className="home-editorial-surface">
      <CinematicHero imageUrl={heroImage} imageAlt={heroName}>
        <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_18rem] sm:items-end sm:gap-8">
          <div>
            <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-paper-100/62 sm:text-xs">
              {copy.featuredWork}
            </p>
            <h1 className="max-w-4xl text-[2.35rem] font-semibold leading-[1.04] text-paper-100 sm:text-6xl sm:leading-[1.02] lg:text-7xl">
              {heroName}
            </h1>
            {heroDescription && (
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-paper-100/78 sm:mt-6 sm:text-base">
                {heroDescription}
              </p>
            )}
          </div>
          {heroMeta.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-5 gap-y-4 rounded-sm border border-paper-100/18 bg-warm-950/12 p-4 text-paper-100/76 backdrop-blur-[2px] sm:block sm:border-l sm:border-t-0 sm:border-r-0 sm:border-b-0 sm:bg-transparent sm:p-0 sm:pl-6 sm:backdrop-blur-none">
              {heroArchitectName && (
                <div className="sm:mb-5">
                  <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-paper-100/42">
                    {copy.architect}
                  </dt>
                  <dd className="mt-1 text-sm text-paper-100">{heroArchitectName}</dd>
                </div>
              )}
              {heroYear && (
                <div className="sm:mb-5">
                  <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-paper-100/42">
                    {copy.year}
                  </dt>
                  <dd className="mt-1 text-sm text-paper-100">{heroYear}</dd>
                </div>
              )}
              {heroLocation && (
                <div className="col-span-2">
                  <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-paper-100/42">
                    {copy.location}
                  </dt>
                  <dd className="mt-1 text-sm text-paper-100">{heroLocation}</dd>
                </div>
              )}
            </dl>
          )}
          <div className="sm:col-span-2">
            <ImageAttribution
              photographer={heroBuilding?.cover_photographer}
              license={heroBuilding?.cover_license}
              sourceUrl={heroBuilding?.cover_source_url}
              tone="light"
              lang={lang}
            />
          </div>
        </div>
      </CinematicHero>

      <section className="section-sm pt-6 sm:pt-8">
        <div className="border-y border-subtle py-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              [visibleBuildings.length, copy.stats.buildings, `${prefix}/browse/buildings`],
              [architects.length, copy.stats.architects, `${prefix}/browse/architects`],
              [styles.length, copy.stats.styles, `${prefix}/browse/style`],
              [visibleCountries.size, copy.stats.countries, `${prefix}/browse/country`],
            ].map(([value, label, href]) => (
              <Link key={label} href={String(href)} className="interactive-row min-w-0 rounded-sm px-2 py-1">
                <p className="font-serif-display text-2xl leading-none text-primary sm:text-3xl">{value}</p>
                <p className="mt-1 truncate text-[0.68rem] text-muted">{label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HomeSectionReveal scale>
        <section className="section">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="heading-2">{lang === 'en' ? 'Enter the archive' : lang === 'ja' ? '資料館へ入る' : '从资料馆进入'}</h2>
            </div>
          </div>
          <div className="grid border-y border-subtle lg:grid-cols-2 lg:divide-x lg:divide-[color:var(--ui-border-subtle)]">
            <Link href={`${prefix}/browse/buildings`} className="group grid min-h-[16rem] gap-5 py-5 transition-colors hover:bg-surface-muted/45 md:grid-cols-[minmax(0,1fr)_14rem] lg:pr-5">
              <div className="flex flex-col justify-between px-1 sm:px-2">
                <div>
                  <p className="eyebrow">01 / Archive Room</p>
                  <h3 className="mt-5 text-3xl font-semibold leading-tight text-primary transition-colors group-hover:text-accent">
                    {learningCopy.freeTitle}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary">
                    {learningCopy.freeBody}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-subtle pt-4 text-sm font-medium text-primary">
                  <span>{learningCopy.freeMeta}</span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
              </div>
              {studyBuilding?.cover_url && (
                <div className="image-frame aspect-[16/10] rounded-sm md:aspect-auto md:h-full md:min-h-[16rem]">
                  <EditorialImage
                    src={studyBuilding.cover_url}
                    alt={displayName(studyBuilding, lang)}
                    label={displayName(studyBuilding, lang)}
                    sizes="(max-width: 1024px) 100vw, 32vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </Link>

            <Link href={`${prefix}/browse`} className="group grid min-h-[16rem] gap-5 border-t border-subtle py-5 transition-colors hover:bg-surface-muted/45 md:grid-cols-[minmax(0,1fr)_14rem] lg:border-t-0 lg:pl-5">
              <div className="flex flex-col justify-between px-1 sm:px-2">
                <div>
                  <p className="eyebrow">02 / Index</p>
                  <h3 className="mt-5 text-3xl font-semibold leading-tight text-primary transition-colors group-hover:text-accent">
                    {t(lang, 'browse')}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary">
                    {lang === 'en'
                      ? 'Enter by architect, building, period, style, type, or region. The archive stays broad, but the entry points stay clear.'
                      : lang === 'ja'
                        ? '建築家、作品、時代、様式、類型、地域から入る。アーカイブは広く、入口は明快に。'
                        : '从建筑师、作品、时代、风格、类型或地域进入。档案可以很大，入口必须清楚。'}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-subtle pt-4 text-sm font-medium text-primary">
                  <span>{lang === 'en' ? 'Open the index' : lang === 'ja' ? '索引を開く' : '打开索引'}</span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
              </div>
              {exploreBuilding?.cover_url && (
                <div className="image-frame aspect-[16/10] rounded-sm md:aspect-auto md:h-full md:min-h-[16rem]">
                  <EditorialImage
                    src={exploreBuilding.cover_url}
                    alt={displayName(exploreBuilding, lang)}
                    label={displayName(exploreBuilding, lang)}
                    sizes="(max-width: 1024px) 100vw, 32vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </Link>
          </div>
        </section>
      </HomeSectionReveal>

      <HomeSectionReveal>
        <section className="section">
          <SectionHeading
            title={featuredLabel}
            description={learningCopy.latestDescription}
            action={<Link href={`${prefix}/browse`} className="text-xs text-muted transition-colors hover:text-primary sm:text-sm">{t(lang, 'viewAll')} →</Link>}
          />
          {featuredLead && (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)]">
              <article className="group">
                <Link href={`${prefix}/building/${featuredLead.slug}`} className="block">
                  <div className="image-frame aspect-[16/10] rounded-lg">
                    <EditorialImage
                      src={featuredLead.cover_url}
                      alt={displayName(featuredLead, lang)}
                      label={displayName(featuredLead, lang)}
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="image-zoom h-full w-full"
                    />
                  </div>
                </Link>
                <div className="mt-4">
                  <ImageAttribution
                    photographer={featuredLead.cover_photographer}
                    license={featuredLead.cover_license}
                    sourceUrl={featuredLead.cover_source_url}
                    tone="dark"
                    lang={lang}
                  />
                </div>
                <Link href={`${prefix}/building/${featuredLead.slug}`} className="interactive-row mt-5 grid gap-3 border-y border-subtle px-2 py-5 sm:grid-cols-[minmax(0,1fr)_13rem]">
                  <div>
                    <p className="label mb-2">{copy.featuredBuilding}</p>
                    <h3 className="text-2xl font-medium leading-tight text-primary transition-colors group-hover:text-accent sm:text-3xl">
                      {displayName(featuredLead, lang)}
                    </h3>
                  </div>
                  <p className="caption sm:text-right">
                    {[architects.find(a => a.slug === featuredLead.architect_slug) ? displayName(architects.find(a => a.slug === featuredLead.architect_slug) || {}, lang) : '', featuredLead.year_start, formatDisplayLocation({ city: featuredLead.city, country: featuredLead.country, countryCode: featuredLead.country_code, lang })].filter(Boolean).join(' · ')}
                  </p>
                </Link>
              </article>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {secondaryFeatured.slice(0, 4).map(b => {
                  const arch = architects.find(a => a.slug === b.architect_slug)
                  const desc = cleanSnippet(displayText(b.description, lang) || displayText(b.significance, lang))
                  return (
                    <Link key={b.id} href={`${prefix}/building/${b.slug}`} className="interactive-row group grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-t border-subtle px-2 py-4">
                      <div className="image-frame aspect-[4/3] rounded-md">
                        <EditorialImage src={b.cover_url} alt={displayName(b, lang)} label={displayName(b, lang)} sizes="8rem" className="image-zoom h-full w-full" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-muted">{arch ? displayName(arch, lang) : b.year_start}</p>
                        <h3 className="mt-1 text-base font-medium leading-snug text-primary transition-colors group-hover:text-accent">{displayName(b, lang)}</h3>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-secondary">{desc || [formatDisplayLocation({ city: b.city, country: b.country, countryCode: b.country_code, lang }), b.year_start].filter(Boolean).join(' · ')}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </section>
      </HomeSectionReveal>

      <HomeSectionReveal>
        <section className="section pb-8 sm:pb-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="heading-3">{t(lang, 'architects')}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">{copy.architectsDescription}</p>
            </div>
            <Link href={`${prefix}/browse/architects`} className="hidden text-sm text-muted transition-colors hover:text-primary sm:inline-flex">
              {t(lang, 'viewAll')} →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {majorArchitects.map(architect => (
              <HomeArchitectCard
                key={architect.id}
                architect={architect}
                lang={lang}
                prefix={prefix}
                visualUrl={architectVisualBySlug.get(architect.slug)}
                count={buildingCountByArchitect.get(architect.slug) || 0}
              />
            ))}
          </div>
        </section>
      </HomeSectionReveal>
    </div>
  )
}

function HomeArchitectCard({
  architect,
  lang,
  prefix,
  visualUrl,
  count,
}: {
  architect: Architect
  lang: string
  prefix: string
  visualUrl?: string | null
  count: number
}) {
  const portrait = getArchitectImageOverride(architect.slug)
  const portraitAlt = portrait?.alt[lang as keyof typeof portrait.alt] || portrait?.alt.en || displayName(architect, lang)
  const years = architect.birth_year ? `${architect.birth_year}–${architect.death_year || (lang === 'en' ? 'present' : lang === 'ja' ? '現在' : '至今')}` : ''
  const country = architect.nationalities?.[0] ? localizedNationality(architect.nationalities[0], lang) : ''
  return (
    <Link href={`${prefix}/architect/${architect.slug}`} className="group grid min-h-[10.5rem] grid-cols-[7rem_minmax(0,1fr)] overflow-hidden border-y border-subtle transition-colors hover:bg-surface-muted/45">
      <ArchitectPortraitThumb
        src={portrait?.url}
        fallbackSrc={visualUrl}
        alt={portraitAlt}
        fallback={displayName(architect, lang)}
        className="h-full rounded-none"
        sizes="8rem"
      />
      <div className="flex min-w-0 flex-col justify-between py-4 pl-4 pr-2">
        <div>
          <p className="caption mb-2">{[years, country].filter(Boolean).join(' · ')}</p>
          <h3 className="text-lg font-medium leading-snug text-primary transition-colors group-hover:text-accent">{displayName(architect, lang)}</h3>
        </div>
        {count > 0 && (
          <p className="mt-4 text-xs text-muted">{count} {lang === 'en' ? 'works' : lang === 'ja' ? '作品' : '作品'}</p>
        )}
      </div>
    </Link>
  )
}
