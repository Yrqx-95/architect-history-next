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
            <p className="mb-2 hidden text-[0.68rem] font-medium uppercase tracking-[0.16em] text-paper-100/62 sm:mb-4 sm:block sm:text-xs">
              {copy.featuredWork}
            </p>
            <h1 className="line-clamp-2 max-w-[20ch] text-[2.35rem] font-semibold leading-[1.04] text-paper-100 sm:max-w-4xl sm:line-clamp-none sm:text-6xl sm:leading-[1.02] lg:text-7xl">
              {heroName}
            </h1>
            {heroDescription && (
              <p className="mt-3 line-clamp-2 max-w-[34ch] text-xs leading-relaxed text-paper-100/78 sm:mt-6 sm:max-w-2xl sm:line-clamp-none sm:text-base">
                {heroDescription}
              </p>
            )}
          </div>
          {heroMeta.length > 0 && (
            <dl className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-paper-100/22 pt-3 text-paper-100/76 sm:block sm:border-l sm:border-t-0 sm:border-r-0 sm:border-b-0 sm:pt-0 sm:pl-6">
              {heroArchitectName && (
                <div className="flex items-center gap-1 sm:mb-5 sm:block">
                  <dt className="sr-only text-[0.62rem] uppercase tracking-[0.16em] text-paper-100/42 sm:not-sr-only">
                    {copy.architect}
                  </dt>
                  <dd className="text-xs text-paper-100 sm:mt-1 sm:text-sm">{heroArchitectName}</dd>
                </div>
              )}
              {heroYear && (
                <div className="flex items-center gap-1 sm:mb-5 sm:block">
                  <dt className="sr-only text-[0.62rem] uppercase tracking-[0.16em] text-paper-100/42 sm:not-sr-only">
                    {copy.year}
                  </dt>
                  <dd className="text-xs text-paper-100 sm:mt-1 sm:text-sm">{heroYear}</dd>
                </div>
              )}
              {heroLocation && (
                <div className="flex items-center gap-1 sm:block">
                  <dt className="sr-only text-[0.62rem] uppercase tracking-[0.16em] text-paper-100/42 sm:not-sr-only">
                    {copy.location}
                  </dt>
                  <dd className="text-xs text-paper-100 sm:mt-1 sm:text-sm">{heroLocation}</dd>
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

      <HomeSectionReveal scale className="order-3">
        <section className="mb-8 sm:mb-16">
          <div className="mb-4 grid gap-3 md:mb-6 md:grid-cols-[minmax(0,1fr)_22rem] md:items-end">
            <div>
              <p className="eyebrow mb-3">{lang === 'en' ? 'Choose a path' : lang === 'ja' ? '入口を選ぶ' : '选择进入方式'}</p>
              <h2 className="heading-2">{lang === 'en' ? 'Find what you need without guessing' : lang === 'ja' ? '迷わずに探す' : '不用猜，从这里开始'}</h2>
            </div>
            <p className="caption line-clamp-2 md:text-right">
              {lang === 'en'
                ? 'Start from the state you are in now: known target, open browsing, or thesis direction.'
                : lang === 'ja'
                  ? '名前がわかる、広く見たい、卒業設計を考える。その状態から入ります。'
                  : '按你现在的状态进入：知道名字、随便浏览、或正在找毕设方向。'}
            </p>
          </div>
          <div className="grid border-y border-subtle md:grid-cols-3 md:divide-x md:divide-[color:var(--ui-border-subtle)]">
            {[
              {
                href: `${prefix}/search`,
                index: '01',
                title: lang === 'en' ? 'I know what I want' : lang === 'ja' ? '名前で探す' : '我知道想找什么',
                body: lang === 'en' ? 'Search a building, architect, city, period, type, or style.' : lang === 'ja' ? '建築、建築家、都市、時代、用途、様式を検索します。' : '搜索建筑、建筑师、城市、年代、类型或风格。',
                action: t(lang, 'search'),
              },
              {
                href: `${prefix}/browse`,
                index: '02',
                title: lang === 'en' ? 'I want to browse' : lang === 'ja' ? '広く見たい' : '我想随便看看',
                body: lang === 'en' ? 'Enter through architects, works, periods, regions, and building types.' : lang === 'ja' ? '建築家、作品、時代、地域、用途から入ります。' : '从建筑师、作品、时代、地区和建筑类型进入。',
                action: t(lang, 'browse'),
              },
              {
                href: `${prefix}/graduation`,
                index: '03',
                title: lang === 'en' ? 'I need a thesis direction' : lang === 'ja' ? '卒業設計を考える' : '我在找毕设方向',
                body: lang === 'en' ? 'Start from social issues, site types, programs, and reference cases.' : lang === 'ja' ? '社会課題、敷地、用途、事例から方向を探します。' : '从社会问题、场地、用途和案例里找方向。',
                action: t(lang, 'graduation'),
              },
            ].map(item => {
              const isPrimary = item.index === '01'
              return (
              <Link
                key={item.href}
                href={item.href}
                className={isPrimary
                  ? 'interactive-row group flex min-h-[10.5rem] flex-col justify-between px-3 py-4 transition-colors hover:bg-surface-muted/45 md:min-h-[13rem] md:px-4 md:py-5'
                  : 'interactive-row group flex min-h-14 items-center justify-between gap-4 border-t border-subtle px-3 py-3 transition-colors hover:bg-surface-muted/45 md:min-h-[13rem] md:flex-col md:items-stretch md:justify-between md:border-t-0 md:px-4 md:py-5'}
              >
                <div className={isPrimary ? '' : 'min-w-0'}>
                  <p className={isPrimary ? 'caption tabular-nums' : 'hidden caption tabular-nums md:block'}>{item.index}</p>
                  <h3 className={isPrimary ? 'mt-3 text-2xl font-semibold leading-tight text-primary transition-colors group-hover:text-accent md:mt-5' : 'text-base font-semibold leading-tight text-primary transition-colors group-hover:text-accent md:mt-5 md:text-2xl'}>
                    {item.title}
                  </h3>
                  <p className={isPrimary ? 'mt-3 text-sm leading-relaxed text-secondary md:mt-4' : 'mt-4 hidden text-sm leading-relaxed text-secondary md:block'}>{item.body}</p>
                </div>
                <div className={isPrimary ? 'mt-6 flex items-center justify-between border-t border-subtle pt-3 text-sm font-medium text-primary md:mt-8 md:pt-4' : 'flex items-center gap-3 text-sm font-medium text-primary md:mt-8 md:justify-between md:border-t md:border-subtle md:pt-4'}>
                  <span>{item.action}</span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </div>
              </Link>
              )
            })}
          </div>
        </section>
      </HomeSectionReveal>

      <HomeSectionReveal className="order-4">
        <section className="mb-8 sm:mb-16">
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
                {secondaryFeatured.slice(0, 4).map((b, index) => {
                  const arch = architects.find(a => a.slug === b.architect_slug)
                  const desc = cleanSnippet(displayText(b.description, lang) || displayText(b.significance, lang))
                  return (
                    <Link key={b.id} href={`${prefix}/building/${b.slug}`} className={`${index >= 2 ? 'hidden lg:grid' : 'grid'} interactive-row group grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-t border-subtle px-2 py-4`}>
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

      <section className="section-sm order-5 mx-auto max-w-7xl sm:order-2 sm:w-full sm:max-w-none sm:pt-6">
        <HomeStats
          prefix={prefix}
          copy={copy}
          visibleBuildings={visibleBuildings.length}
          architects={architects.length}
          styles={styles.length}
          countries={visibleCountries.size}
        />
      </section>

      <HomeSectionReveal className="order-6">
        <section className="mb-8 pb-4 sm:mb-16 sm:pb-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="heading-3">{t(lang, 'architects')}</h2>
              <p className="mt-2 hidden max-w-2xl text-sm leading-relaxed text-secondary sm:block">{copy.architectsDescription}</p>
            </div>
            <Link href={`${prefix}/browse/architects`} className="inline-flex text-xs text-muted transition-colors hover:text-primary sm:text-sm">
              {t(lang, 'viewAll')} →
            </Link>
          </div>
          <div className="grid gap-0 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
            {majorArchitects.map((architect, index) => (
              <HomeArchitectCard
                key={architect.id}
                architect={architect}
                lang={lang}
                prefix={prefix}
                visualUrl={architectVisualBySlug.get(architect.slug)}
                count={buildingCountByArchitect.get(architect.slug) || 0}
                className={index >= 3 ? 'hidden sm:grid' : undefined}
              />
            ))}
          </div>
        </section>
      </HomeSectionReveal>
    </div>
  )
}

function HomeStats({
  prefix,
  copy,
  visibleBuildings,
  architects,
  styles,
  countries,
}: {
  prefix: string
  copy: ReturnType<typeof getHomeCopy>
  visibleBuildings: number
  architects: number
  styles: number
  countries: number
}) {
  const items = [
    [visibleBuildings, copy.stats.buildings, `${prefix}/browse/buildings`],
    [architects, copy.stats.architects, `${prefix}/browse/architects`],
    [styles, copy.stats.styles, `${prefix}/browse/style`],
    [countries, copy.stats.countries, `${prefix}/browse/country`],
  ] as const
  return (
    <div className="border-y border-subtle py-5">
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {items.map(([value, label, href]) => (
          <Link key={label} href={href} className="interactive-row min-w-0 rounded-sm px-2 py-1">
            <p className="font-serif-display text-lg leading-none text-primary sm:text-3xl">{value}</p>
            <p className="mt-1 truncate text-[0.58rem] text-muted sm:text-[0.68rem]">{label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function HomeArchitectCard({
  architect,
  lang,
  prefix,
  visualUrl,
  count,
  className,
}: {
  architect: Architect
  lang: string
  prefix: string
  visualUrl?: string | null
  count: number
  className?: string
}) {
  const portrait = getArchitectImageOverride(architect.slug)
  const portraitAlt = portrait?.alt[lang as keyof typeof portrait.alt] || portrait?.alt.en || displayName(architect, lang)
  const years = architect.birth_year ? `${architect.birth_year}–${architect.death_year || (lang === 'en' ? 'present' : lang === 'ja' ? '現在' : '至今')}` : ''
  const country = architect.nationalities?.[0] ? localizedNationality(architect.nationalities[0], lang) : ''
  return (
    <Link href={`${prefix}/architect/${architect.slug}`} className={`group grid min-h-16 grid-cols-[3.5rem_minmax(0,1fr)] overflow-hidden border-y border-subtle transition-colors hover:bg-surface-muted/45 sm:min-h-[10.5rem] sm:grid-cols-[7rem_minmax(0,1fr)] ${className || ''}`}>
      <ArchitectPortraitThumb
        src={portrait?.url}
        fallbackSrc={visualUrl}
        alt={portraitAlt}
        fallback={displayName(architect, lang)}
        className="h-full rounded-none"
        sizes="(max-width: 640px) 4rem, 8rem"
      />
      <div className="flex min-w-0 flex-col justify-between py-3 pl-3 pr-2 sm:py-4 sm:pl-4">
        <div>
          <p className="caption mb-1">{[years, country].filter(Boolean).join(' · ')}</p>
          <h3 className="text-lg font-medium leading-snug text-primary transition-colors group-hover:text-accent">{displayName(architect, lang)}</h3>
        </div>
        {count > 0 && (
          <p className="mt-4 hidden text-xs text-muted sm:block">{count} {lang === 'en' ? 'works' : lang === 'ja' ? '作品' : '作品'}</p>
        )}
      </div>
    </Link>
  )
}
