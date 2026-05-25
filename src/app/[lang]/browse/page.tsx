import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers, getEras, getStyles, getTypes } from '@/lib/data'
import { isMinimallyComplete } from '@/lib/quality'
import { displayName } from '@/lib/types'
import PageShell from '@/components/PageShell'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import BuildingCard from '@/components/BuildingCard'
import ArchitectCard from '@/components/ArchitectCard'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: t(lang, 'browse'),
    description: lang === 'en' ? 'Browse architects, buildings, styles, eras, and building types.' : lang === 'ja' ? '建築家、建築、様式、時代、建築種別を閲覧。' : '浏览建筑師、建筑、风格、时代与建筑类型。',
  }
}

export default async function BrowsePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const [architects, buildings, styles, eras, types] = await Promise.all([
    getArchitects(), getBuildingsWithCovers(), getStyles(), getEras(), getTypes()
  ])
  // Filter out Q-ID and incomplete entries
  const qualityBuildings = buildings.filter(b => isMinimallyComplete(b))
  const prefix = `/${lang}`

  // Sort architects: those with more buildings first (a proxy for "importance")
  const bldgCount = new Map<string, number>()
  buildings.forEach(b => {
    if (b.architect_slug) bldgCount.set(b.architect_slug, (bldgCount.get(b.architect_slug) || 0) + 1)
  })
  const ranked = [...architects].sort((a, b) => (bldgCount.get(b.slug) || 0) - (bldgCount.get(a.slug) || 0))
  const top12 = ranked.slice(0, 12)
  const rest = ranked.slice(12)

  return (
    <PageShell>
      <header className="section">
        <h1 className="heading-display mb-4">{t(lang, 'browse')}</h1>
        <p className="body-large max-w-2xl">
          {lang === 'en'
            ? 'Explore the full collection of architects and buildings, organized by style, era, type, and geography.'
            : lang === 'ja'
            ? '建築家と建築の全コレクションを、様式、時代、類型、地域別に探索します。'
            : '按风格、时代、类型与地域，探索全部建筑师与建筑收藏。'}
        </p>
      </header>

      {/* ============================================================
          Prominent Architects — larger, featured grid
          ============================================================ */}
      <Reveal>
        <section className="section">
          <SectionHeading
            title={t(lang, 'architects')}
            description={`${architects.length} ${lang === 'en' ? 'architects in database' : lang === 'ja' ? '名の建築家' : '位建筑师'}`}
          />

          {/* Top architects: larger cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {top12.map(a => {
              const count = bldgCount.get(a.slug) || 0
              const name = displayName(a, lang)
              return (
                <Link key={a.id} href={`${prefix}/architect/${a.slug}`}
                  className="group block border-t border-subtle py-4 transition-colors hover:border-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ui-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--ui-bg)] sm:py-5">
                  <h3 className="text-base font-medium leading-snug text-primary transition-colors group-hover:text-accent">{name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {a.birth_year || '?'} – {a.death_year || t(lang, 'present')}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] leading-relaxed text-muted">
                    {count > 0 && <span>{count} {lang === 'en' ? 'buildings' : lang === 'ja' ? '作品' : '座建筑'}</span>}
                    {a.era_slug && <span>{a.era_slug}</span>}
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Rest: compact cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
            {rest.map(a => <ArchitectCard key={a.id} architect={a} lang={lang} />)}
          </div>
        </section>
      </Reveal>

      {/* ============================================================
          Buildings — with featured large item
          ============================================================ */}
      <Reveal>
        <section className="section">
          <SectionHeading
            title={t(lang, 'buildings')}
            description={`${qualityBuildings.length} ${lang === 'en' ? 'buildings in database' : lang === 'ja' ? '作品' : '座建筑'}`}
          />

          {/* First building: featured large */}
          {qualityBuildings.length > 0 && (
            <div className="mb-5">
              <BuildingCard building={qualityBuildings[0]} lang={lang}
                architectName={architects.find(a => a.slug === qualityBuildings[0].architect_slug)?.name_zh || architects.find(a => a.slug === qualityBuildings[0].architect_slug)?.name_en || ''} />
            </div>
          )}

          {/* Rest: grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {qualityBuildings.slice(1, 19).map(b => {
              const arch = architects.find(a => a.slug === b.architect_slug)
              return <BuildingCard key={b.id} building={b} lang={lang} architectName={arch?.name_zh || arch?.name_en} />
            })}
          </div>

          {qualityBuildings.length > 18 && (
            <div className="text-center mt-8">
              <p className="body-sm">{lang === 'en' ? `+${qualityBuildings.length - 18} more buildings` : lang === 'ja' ? `さらに${qualityBuildings.length - 18}作品` : `还有 ${qualityBuildings.length - 18} 座建筑`}</p>
            </div>
          )}
        </section>
      </Reveal>

      {/* ============================================================
          Browse by category — filter sections
          ============================================================ */}
      <Reveal>
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <SectionHeading
            title={lang === 'en' ? 'Browse by category' : lang === 'ja' ? 'カテゴリで探す' : '按分类浏览'}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FilterBlock title={t(lang, 'eras')} items={eras} lang={lang} prefix={`${prefix}/browse/era`} />
            <FilterBlock title={t(lang, 'styles')} items={styles} lang={lang} prefix={`${prefix}/browse/style`} showAll />
            <FilterBlock title={t(lang, 'types')} items={types} lang={lang} prefix={`${prefix}/browse/type`} />
            <div>
              <h3 className="mb-3 font-semibold text-primary">{t(lang, 'countries')}</h3>
              <Link href={`${prefix}/browse/country`} className="body-sm transition-colors hover:text-accent">
                {t(lang, 'viewAll')} →
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </PageShell>
  )
}

function FilterBlock({ title, items, lang, prefix, showAll }: {
  title: string
  items: { id: string; slug: string; name_zh: string | null; name_en: string; name_ja: string | null }[]
  lang: string
  prefix: string
  showAll?: boolean
}) {
  const display = showAll ? items : items.slice(0, 10)
  return (
    <div>
      <h3 className="mb-3 font-semibold text-primary">{title}</h3>
      <div className="space-y-1">
        {display.map(item => (
          <Link key={item.id} href={`${prefix}/${item.slug}`}
            className="block body-sm py-0.5 transition-colors hover:text-accent">
            {displayName(item, lang)}
          </Link>
        ))}
      </div>
      {!showAll && items.length > 10 && (
        <p className="caption mt-1">+{items.length - 10} more</p>
      )}
    </div>
  )
}
