import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers, getEras, getStyles, getCounts, getFeaturedBuildingsWithCovers } from '@/lib/data'
import { displayName, displayText, formatDisplayLocation, isProbablySimplifiedChinese } from '@/lib/types'
import { matchesTaxonomy } from '@/lib/taxonomy'
import SectionHeading from '@/components/SectionHeading'
import CinematicHero from '@/components/CinematicHero'
import Reveal from '@/components/Reveal'
import EditorialImage from '@/components/EditorialImage'
import ImageAttribution from '@/components/ImageAttribution'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: t(lang, 'hero'),
    description: lang === 'en'
      ? 'Archistory is an online archive of architecture, people, and time.'
      : lang === 'ja'
      ? 'Archistory は、建築、人物、時代を読むオンライン・アーカイブです。'
      : 'Archistory 是建筑、人物与时代的在线档案。',
  }
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const [counts, featured, eras, styles, architects] = await Promise.all([
    getCounts(),
    getFeaturedBuildingsWithCovers(14),
    getEras(),
    getStyles(),
    getArchitects(),
  ])
  const prefix = `/${lang}`

  const activeEras = eras.filter(e =>
    architects.some(a => matchesTaxonomy(a.era_slug, e))
  ).slice(0, 8)
  const eraLabelFor = (value?: string | null) => {
    if (!value) return ''
    const era = eras.find(item => matchesTaxonomy(value, item))
    if (era) return displayName(era, lang)
    return lang === 'ja' && isProbablySimplifiedChinese(value) ? '' : value
  }
  const cleanSnippet = (value: string) => (lang === 'ja' && isProbablySimplifiedChinese(value) ? '' : value)

  const allBuildings = await getBuildingsWithCovers()
  const architectBuildingCount = new Map<string, number>()
  allBuildings.forEach(b => {
    if (b.architect_slug) architectBuildingCount.set(b.architect_slug, (architectBuildingCount.get(b.architect_slug) || 0) + 1)
  })
  const activeArchitects = architects
    .filter(a => architectBuildingCount.has(a.slug))
    .slice(0, 16)

  const uniqueFeatured = featured.filter((building, index, all) =>
    building.cover_url &&
    all.findIndex(item => item.cover_url === building.cover_url) === index
  )
  const heroBuilding = uniqueFeatured[0] || featured[0]
  const editorialBuilding = uniqueFeatured.find(building =>
    building.slug !== heroBuilding?.slug &&
    building.cover_url !== heroBuilding?.cover_url
  ) || uniqueFeatured[1] || featured[1] || heroBuilding
  const featuredRest = uniqueFeatured
    .filter(building =>
      building.slug !== heroBuilding?.slug &&
      building.slug !== editorialBuilding?.slug
    )
    .slice(0, 9)
  const featuredLead = featuredRest[0]
  const secondaryFeatured = featuredRest.slice(1, 5)
  const compactFeatured = featuredRest.slice(5, 9)
  const heroImage = heroBuilding?.cover_url || null
  const heroArchitect = heroBuilding
    ? architects.find(architect => architect.slug === heroBuilding.architect_slug)
    : null
  const heroName = heroBuilding ? displayName(heroBuilding, lang) : t(lang, 'hero')
  const heroArchitectName = heroArchitect ? displayName(heroArchitect, lang) : ''
  const heroLocation = heroBuilding
    ? formatDisplayLocation({ city: heroBuilding.city, country: heroBuilding.country, countryCode: heroBuilding.country_code, lang })
    : ''
  const heroYear = heroBuilding?.year_start ? String(heroBuilding.year_start) : ''
  const heroMeta = [heroArchitectName, heroYear, heroLocation].filter(Boolean)
  const heroDescription = heroBuilding
    ? displayText(heroBuilding.description, lang) ||
      displayText(heroBuilding.significance, lang) ||
      [heroName, heroArchitectName, heroLocation, heroYear].filter(Boolean).join(' · ')
    : ''
  const guideItems = [
    {
      title: lang === 'en' ? 'Read by period' : lang === 'ja' ? '時代から読む' : '按时代阅读',
      body: lang === 'en'
        ? 'Move through eras as a structured historical index, from classical orders to contemporary practice.'
        : lang === 'ja'
        ? '古典的秩序から現代の実践まで、時代を手がかりに建築をたどる。'
        : '以时代为线索，从古典秩序到当代实践梳理建筑脉络。',
      href: `${prefix}/timeline`,
    },
    {
      title: lang === 'en' ? 'Trace authorship' : lang === 'ja' ? '作者性をたどる' : '阅读人物谱系',
      body: lang === 'en'
        ? 'Follow architects through built works, movements, influences, and recurring spatial questions.'
        : lang === 'ja'
        ? '建築家、作品、運動、影響関係から空間思想を読み解く。'
        : '从建筑师、作品、运动与影响关系中阅读空间思想。',
      href: `${prefix}/browse`,
    },
    {
      title: lang === 'en' ? 'Search the archive' : lang === 'ja' ? 'アーカイブを検索' : '检索档案',
      body: lang === 'en'
        ? 'Use names, places, styles, or building types to enter the collection directly.'
        : lang === 'ja'
        ? '名称、場所、様式、建築種別からコレクションへ入る。'
        : '通过名称、地点、风格或类型直接进入档案。',
      href: `${prefix}/search`,
    },
  ]

  return (
    <div>
      <CinematicHero imageUrl={heroImage} imageAlt={heroName}>
        <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_18rem] sm:items-end sm:gap-8">
          <div>
            <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-paper-100/62 sm:text-xs">
              {lang === 'en' ? 'Featured work' : lang === 'ja' ? '特集作品' : '本期作品'}
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
                    {lang === 'en' ? 'Architect' : lang === 'ja' ? '建築家' : '建筑师'}
                  </dt>
                  <dd className="mt-1 text-sm text-paper-100">{heroArchitectName}</dd>
                </div>
              )}
              {heroYear && (
                <div className="sm:mb-5">
                  <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-paper-100/42">
                    {lang === 'en' ? 'Year' : lang === 'ja' ? '竣工年' : '年份'}
                  </dt>
                  <dd className="mt-1 text-sm text-paper-100">{heroYear}</dd>
                </div>
              )}
              {heroLocation && (
                <div className="col-span-2">
                  <dt className="text-[0.62rem] uppercase tracking-[0.16em] text-paper-100/42">
                    {lang === 'en' ? 'Location' : lang === 'ja' ? '所在地' : '地点'}
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
            />
          </div>
        </div>
      </CinematicHero>

      {/* Archive entry */}
      <section className="section pt-4 sm:pt-0">
        <div className="grid gap-4 border-y border-warm-200/80 py-5 dark:border-charcoal-700/80 lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              [counts.buildings, lang === 'en' ? 'Buildings' : lang === 'ja' ? '建築' : '建筑'],
              [counts.architects, lang === 'en' ? 'Architects' : lang === 'ja' ? '建築家' : '建筑师'],
              [counts.styles, lang === 'en' ? 'Styles' : lang === 'ja' ? '様式' : '风格'],
              [counts.countries, lang === 'en' ? 'Countries' : lang === 'ja' ? '地域' : '国家 / 地区'],
            ].map(([value, label]) => (
              <div key={label} className="min-w-0">
                <p className="font-serif-display text-3xl leading-none text-primary">{value}</p>
                <p className="label mt-1">{label}</p>
              </div>
            ))}
          </div>
          <form action={`${prefix}/search`}>
            <div className="relative">
              <input type="text" name="q" placeholder={t(lang, 'searchPlaceholder')}
                className="w-full rounded-full border border-warm-200/80 bg-paper-100 px-10 py-3.5 text-sm text-warm-700 shadow-card transition-colors placeholder:text-warm-600 dark:placeholder:text-warm-300 focus:border-warm-500 focus:outline-none focus:ring-1 focus:ring-warm-500 dark:border-charcoal-600/80 dark:bg-charcoal-800 dark:text-warm-200"
              />
              <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-600 dark:text-warm-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Buildings */}
      <Reveal>
        <section className="section">
          <SectionHeading
            title={t(lang, 'featured')}
            description={lang === 'en' ? 'A current edit of buildings with distinct visual and historical entry points.' : lang === 'ja' ? '視覚的・歴史的な入口をもつ建築の編集セレクション。' : '从图像、年代与地点进入建筑档案的编辑精选。'}
            action={<Link href={`${prefix}/browse`} className="text-xs sm:text-sm text-warm-600 hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100 transition-colors">{t(lang, 'viewAll')} →</Link>}
          />
          {featuredLead && (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start">
              <Link href={`${prefix}/building/${featuredLead.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-warm-100 dark:bg-charcoal-900">
                  <EditorialImage
                    src={featuredLead.cover_url}
                    alt={displayName(featuredLead, lang)}
                    label={displayName(featuredLead, lang)}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="h-full w-full transition duration-500 ease-out group-hover:scale-[1.012]"
                  />
                </div>
                <div className="mt-4">
                  <ImageAttribution
                    photographer={featuredLead.cover_photographer}
                    license={featuredLead.cover_license}
                    sourceUrl={featuredLead.cover_source_url}
                    tone="dark"
                  />
                </div>
                <div className="mt-6 grid gap-4 border-b border-subtle pb-7 sm:grid-cols-[minmax(0,1fr)_12rem]">
                  <div>
                    <p className="label mb-2">
                      {lang === 'en' ? 'Featured building' : lang === 'ja' ? '特集建築' : '精选建筑'}
                    </p>
                    <h2 className="text-2xl font-medium leading-tight text-primary sm:text-3xl">{displayName(featuredLead, lang)}</h2>
                  </div>
                  <p className="caption">
                    {[architects.find(a => a.slug === featuredLead.architect_slug) ? displayName(architects.find(a => a.slug === featuredLead.architect_slug) || {}, lang) : '', featuredLead.year_start, formatDisplayLocation({ city: featuredLead.city, country: featuredLead.country, countryCode: featuredLead.country_code, lang })].filter(Boolean).join(' · ')}
                  </p>
                </div>
              </Link>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {secondaryFeatured.slice(0, 3).map(b => {
                  const arch = architects.find(a => a.slug === b.architect_slug)
                  const desc = cleanSnippet(displayText(b.description, lang) || displayText(b.significance, lang))
                  return (
                    <Link key={b.id} href={`${prefix}/building/${b.slug}`} className="group grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 border-t border-warm-200/70 pt-4 dark:border-charcoal-700">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-warm-100 dark:bg-charcoal-900">
                        <EditorialImage src={b.cover_url} alt={displayName(b, lang)} label={displayName(b, lang)} sizes="8rem" className="h-full w-full transition duration-500 ease-out group-hover:scale-[1.015]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[0.66rem] uppercase tracking-[0.12em] text-warm-600 dark:text-warm-300">{arch ? displayName(arch, lang) : b.year_start}</p>
                        <h3 className="mt-1 text-base font-medium leading-snug text-warm-800 group-hover:text-warm-600 dark:text-paper-100 dark:group-hover:text-warm-300">{displayName(b, lang)}</h3>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-warm-600 dark:text-warm-300">{desc || [formatDisplayLocation({ city: b.city, country: b.country, countryCode: b.country_code, lang }), b.year_start].filter(Boolean).join(' · ')}</p>
                        <div className="mt-2">
                          <ImageAttribution
                            photographer={b.cover_photographer}
                            license={b.cover_license}
                            sourceUrl={b.cover_source_url}
                            tone="dark"
                          />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
          {compactFeatured.length > 0 && (
            <div className="mt-9 grid gap-x-8 gap-y-3 border-y border-warm-200/70 py-4 dark:border-charcoal-700 sm:grid-cols-2">
              {compactFeatured.map(b => (
                <Link key={b.id} href={`${prefix}/building/${b.slug}`} className="group flex items-baseline justify-between gap-4 py-2">
                  <span className="text-sm font-medium text-warm-800 group-hover:text-warm-600 dark:text-paper-100 dark:group-hover:text-warm-300">{displayName(b, lang)}</span>
                  <span className="shrink-0 text-xs text-warm-600 dark:text-warm-300">{b.year_start || formatDisplayLocation({ city: b.city, country: b.country, countryCode: b.country_code, lang })}</span>
                </Link>
              ))}
            </div>
          )}
        </section>
      </Reveal>

      {/* Featured Architects */}
      <Reveal>
        <section className="section grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <div>
            <p className="font-serif-display text-6xl leading-none text-warm-200 dark:text-charcoal-700">{counts.architects}</p>
            <h2 className="heading-2 mt-3">{t(lang, 'architects')}</h2>
            <p className="caption mt-3 max-w-xs">
              {lang === 'en' ? 'A compact index of authorship, chronology, and recurring spatial positions.' : lang === 'ja' ? '作者性、年代、空間的立場を横断するコンパクトな索引。' : '以作者、年代与空间立场组织的建筑师索引。'}
            </p>
          </div>
          <div className="grid gap-x-8 border-t border-warm-200/70 dark:border-charcoal-700 sm:grid-cols-2">
            {activeArchitects.slice(0, 10).map(a => {
              const years = a.birth_year ? `${a.birth_year}–${a.death_year || ''}` : ''
              const count = architectBuildingCount.get(a.slug) || 0
              return (
                <Link key={a.id} href={`${prefix}/architect/${a.slug}`} className="group grid grid-cols-[minmax(0,1fr)_4rem] gap-4 border-b border-warm-200/70 py-4 dark:border-charcoal-700">
                  <div>
                    <h3 className="text-base font-medium leading-snug text-warm-800 group-hover:text-warm-600 dark:text-paper-100 dark:group-hover:text-warm-300">{displayName(a, lang)}</h3>
                    <p className="mt-1 text-xs text-warm-600 dark:text-warm-300">{[years, eraLabelFor(a.era_slug)].filter(Boolean).join(' · ')}</p>
                  </div>
                  <p className="text-right font-serif-display text-2xl leading-none text-warm-300 dark:text-charcoal-600">{count}</p>
                </Link>
              )
            })}
          </div>
        </section>
      </Reveal>

      {/* Timeline and Movements */}
      <Reveal>
        <section className="section grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <SectionHeading
              title={t(lang, 'timeline')}
              description={lang === 'en' ? 'A preview of architectural history as a browsable chronology.' : lang === 'ja' ? '閲覧できる年代記としての建築史。' : '以可浏览的年代线索进入建筑史。'}
              action={<Link href={`${prefix}/timeline`} className="text-xs sm:text-sm text-warm-600 hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100 transition-colors">{t(lang, 'viewAll')} →</Link>}
            />
            <div className="space-y-0 border-y border-warm-200/70 dark:border-charcoal-700">
              {activeEras.slice(0, 7).map(e => (
                <Link key={e.id} href={`${prefix}/browse/era/${e.slug}`} className="group grid grid-cols-[5.5rem_minmax(0,1fr)] gap-5 border-b border-warm-200/70 py-4 last:border-b-0 dark:border-charcoal-700 sm:grid-cols-[8rem_minmax(0,1fr)]">
                  <span className="font-mono text-xs text-warm-600 dark:text-warm-300">{e.year_start || ''}</span>
                  <span className="text-lg font-medium leading-tight text-warm-800 group-hover:text-warm-600 dark:text-paper-100 dark:group-hover:text-warm-300">{displayName(e, lang)}</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading
              title={t(lang, 'styles')}
              description={lang === 'en' ? 'Movements, tendencies, and formal languages.' : lang === 'ja' ? '運動、傾向、形式言語。' : '运动、倾向与形式语言。'}
            />
            <div className="flex flex-wrap gap-2">
              {styles.slice(0, 18).map(s => (
                <Link key={s.id} href={`${prefix}/browse/style/${s.slug}`}
                  className="rounded-full border border-warm-200/80 px-3.5 py-2 text-sm text-warm-600 transition-colors hover:border-warm-400 hover:text-warm-800 dark:border-charcoal-700 dark:text-warm-300 dark:hover:border-charcoal-500 dark:hover:text-paper-100">
                  {displayName(s, lang)}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Knowledge Guides */}
      <Reveal>
        <section className="section pb-20">
          <SectionHeading
            title={lang === 'en' ? 'Knowledge guides' : lang === 'ja' ? '知識ガイド' : '知识导览'}
            description={lang === 'en' ? 'Ways into the archive beyond a single gallery view.' : lang === 'ja' ? '単なるギャラリーではない、アーカイブへの入口。' : '不止于图片画廊的档案入口。'}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {guideItems.map(item => (
              <Link key={item.title} href={item.href} className="group border-t border-warm-200/80 pt-5 dark:border-charcoal-700">
                <h3 className="text-lg font-medium text-warm-800 group-hover:text-warm-600 dark:text-paper-100 dark:group-hover:text-warm-300">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-warm-600 dark:text-warm-300">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  )
}
