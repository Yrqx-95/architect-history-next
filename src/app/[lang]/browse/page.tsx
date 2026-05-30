import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildingsWithCovers, getEras, getStyles, getTypes } from '@/lib/data'
import { isMinimallyComplete } from '@/lib/quality'
import { displayName, formatCountryName, isProbablySimplifiedChinese, type Architect, type Building, type BuildingType, type Era } from '@/lib/types'
import { listMatchesTaxonomy, matchesTaxonomy } from '@/lib/taxonomy'
import PageShell from '@/components/PageShell'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'
import BuildingCard from '@/components/BuildingCard'
import ArchitectCard from '@/components/ArchitectCard'

export const revalidate = 3600

type BrowseItem = {
  id: string
  href: string
  label: string
  meta: string
  count?: number
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: t(lang, 'browse'),
    description: lang === 'en' ? 'Enter Archistory through architects, works, periods, styles, types, and regions.' : lang === 'ja' ? '建築家、作品、時代、様式、類型、地域から Archistory へ入る。' : '从建筑师、作品、时代、风格、类型与地域进入 Archistory。',
  }
}

export default async function BrowsePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const [architects, buildings, styles, eras, types] = await Promise.all([
    getArchitects(), getBuildingsWithCovers(), getStyles(), getEras(), getTypes()
  ])
  const prefix = `/${lang}`
  const qualityBuildings = buildings.filter(b => isMinimallyComplete(b))
  const buildingCountByArchitect = countBy(buildings, building => building.architect_slug)
  const architectBySlug = new Map(architects.map(architect => [architect.slug, architect]))
  const eraLabelFor = (value?: string | null) => {
    if (!value) return ''
    const era = eras.find(item => matchesTaxonomy(value, item))
    if (era) return displayName(era, lang)
    return lang === 'ja' && isProbablySimplifiedChinese(value) ? '' : value
  }

  const architectsForEra = (era: Era) => architects.filter(architect => matchesTaxonomy(architect.era_slug, era))
  const buildingsForEra = (era: Era) => buildings.filter(building => {
    if (matchesTaxonomy(building.era_slug, era)) return true
    const architect = building.architect_slug ? architectBySlug.get(building.architect_slug) : null
    return matchesTaxonomy(architect?.era_slug, era)
  })
  const architectsForStyle = (style: { slug: string; name_en?: string | null; name_zh?: string | null; name_ja?: string | null }) =>
    architects.filter(architect => listMatchesTaxonomy(architect.style_slugs, style))
  const typeCountFor = (type: BuildingType) => buildings.filter(building => matchesTaxonomy(building.type_slug, type)).length

  const rankedArchitects = [...architects].sort((a, b) =>
    (buildingCountByArchitect.get(b.slug) || 0) - (buildingCountByArchitect.get(a.slug) || 0)
  )
  const featuredArchitects = rankedArchitects.slice(0, 8)
  const compactArchitects = rankedArchitects.slice(8, 32)

  const eraGroups = [...eras]
    .sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))
    .map(era => ({
      era,
      architects: rankedArchitects.filter(architect => matchesTaxonomy(architect.era_slug, era)).slice(0, 5),
    }))
    .filter(group => group.architects.length > 0)

  const eraItems: BrowseItem[] = [...eras]
    .sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))
    .map(era => {
      const architectCount = architectsForEra(era).length
      const buildingCount = buildingsForEra(era).length
      return {
        id: era.id,
        href: `${prefix}/browse/era/${era.slug}`,
        label: displayName(era, lang),
        meta: [
          era.year_start ? `${era.year_start}${era.year_end ? `-${era.year_end}` : ''}` : '',
          architectCount > 0 ? `${architectCount} ${t(lang, 'architects')}` : '',
          buildingCount > 0 ? `${buildingCount} ${t(lang, 'buildings')}` : '',
        ].filter(Boolean).join(' · '),
        count: architectCount + buildingCount,
      }
    })
    .filter(item => item.count > 0)

  const styleItems: BrowseItem[] = [...styles]
    .map(style => ({ style, count: architectsForStyle(style).length }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 18)
    .map(({ style, count }) => ({
      id: style.id,
      href: `${prefix}/browse/style/${style.slug}`,
      label: displayName(style, lang),
        meta: [eraLabelFor(style.era_slug), `${count} ${t(lang, 'architects')}`].filter(Boolean).join(' · '),
    }))

  const typeItems: BrowseItem[] = [...types]
    .map(type => ({ type, count: typeCountFor(type) }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 16)
    .map(({ type, count }) => ({
      id: type.id,
      href: `${prefix}/browse/type/${type.slug}`,
      label: displayName(type, lang),
      meta: `${count} ${t(lang, 'buildings')}`,
    }))

  const styleFamilies = styles
    .filter(style => !style.parent_slug)
    .map(style => ({
      style,
      children: styles
        .filter(child => child.parent_slug === style.slug)
        .filter(child => architectsForStyle(child).length > 0)
        .sort((a, b) => displayName(a, lang).localeCompare(displayName(b, lang)))
        .slice(0, 5),
      count: architectsForStyle(style).length,
    }))
    .filter(group => group.count > 0 || group.children.length > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  const countryItems = topCountries(buildings, lang).map(country => ({
    id: country.name,
    href: `${prefix}/browse/country/${country.code}`,
    label: country.name,
    meta: `${country.count} ${t(lang, 'buildings')}`,
  }))

  const architectMap = new Map(architects.map(a => [a.slug, displayName(a, lang)]))
  const featuredBuildings = qualityBuildings.slice(0, 6)
  const historyPathCount = eraItems.length + styleItems.length

  return (
    <PageShell>
      <header className="section">
        <p className="eyebrow mb-4">{lang === 'en' ? 'Archive index' : lang === 'ja' ? 'アーカイブ索引' : '档案索引'}</p>
        <h1 className="heading-display mb-4">{t(lang, 'browse')}</h1>
        <p className="body-large max-w-3xl">
          {lang === 'en'
            ? 'Choose a path into the archive: architects, works, periods, styles, building types, or regions.'
            : lang === 'ja'
            ? '建築家、作品、時代、様式、建築種別、地域からアーカイブへ入る。'
            : '选择一条进入档案的路径：建筑师、作品、时代、风格、类型或地域。'}
        </p>
      </header>

      <Reveal>
        <section className="section pt-0">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <EntryCard href="#architect-lineage" label={t(lang, 'architects')} value={`${architects.length}`} meta={lang === 'en' ? 'people' : lang === 'ja' ? '人' : '人物'} />
            <EntryCard href="#building-index" label={lang === 'en' ? 'Works' : lang === 'ja' ? '作品' : '建筑作品'} value={`${qualityBuildings.length}`} meta={t(lang, 'buildings')} />
            <EntryCard href="#history-index" label={lang === 'en' ? 'Periods and styles' : lang === 'ja' ? '時代と様式' : '时代与风格'} value={`${historyPathCount}`} meta={lang === 'en' ? 'active paths' : lang === 'ja' ? '入口' : '可浏览入口'} />
            <EntryCard href={`${prefix}/browse/country`} label={t(lang, 'countries')} value={`${countryItems.length}`} meta={lang === 'en' ? 'regions' : lang === 'ja' ? '地域' : '地区'} />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="architect-lineage" className="section border-t border-subtle pt-10 sm:pt-12">
          <SectionHeading
            title={t(lang, 'architects')}
            description={lang === 'en' ? 'Start with major figures, then continue by period.' : lang === 'ja' ? '主要な建築家から入り、時代別にたどる。' : '先看重要建筑师，再按时代继续浏览。'}
          />
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-start">
            <div className="grid gap-3 sm:grid-cols-2">
              {featuredArchitects.map(architect => (
                <FeaturedArchitect key={architect.id} architect={architect} count={buildingCountByArchitect.get(architect.slug) || 0} lang={lang} prefix={prefix} eraLabel={eraLabelFor(architect.era_slug)} />
              ))}
            </div>
            {eraGroups.length > 0 && (
              <div className="rounded-md border border-subtle bg-surface p-4 shadow-semantic-card sm:p-5">
                <p className="eyebrow mb-4">{lang === 'en' ? 'By period' : lang === 'ja' ? '時代別' : '按时期'}</p>
                <div className="space-y-5">
                  {eraGroups.slice(0, 6).map(group => (
                    <EraLineage key={group.era.id} era={group.era} architects={group.architects} lang={lang} prefix={prefix} />
                  ))}
                </div>
              </div>
            )}
          </div>
          {compactArchitects.length > 0 && (
            <div className="mt-8">
              <p className="eyebrow mb-3">{lang === 'en' ? 'More architects' : lang === 'ja' ? 'その他の建築家' : '更多建筑师'}</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {compactArchitects.map(architect => (
                  <ArchitectCard
                    key={architect.id}
                    architect={architect}
                    lang={lang}
                    eraLabel={eraLabelFor(architect.era_slug)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </Reveal>

      <Reveal>
        <section id="building-index" className="section border-t border-subtle pt-10 sm:pt-12">
          <SectionHeading
            title={lang === 'en' ? 'Works' : lang === 'ja' ? '作品' : '建筑作品'}
            description={lang === 'en' ? 'Read representative works through type, place, and authorship.' : lang === 'ja' ? '代表作を、類型、場所、作者性から読む。' : '从类型、地域与作者关系阅读代表作品。'}
          />
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBuildings.map(building => (
                <BuildingCard key={building.id} building={building} lang={lang} architectName={architectMap.get(building.architect_slug || '') || ''} />
              ))}
            </div>
            <div className="space-y-5">
              <IndexList title={t(lang, 'types')} items={typeItems} />
              <IndexList title={t(lang, 'countries')} items={countryItems.slice(0, 8)} moreHref={`${prefix}/browse/country`} moreLabel={t(lang, 'viewAll')} />
            </div>
          </div>
        </section>
      </Reveal>

      {(eraItems.length > 0 || styleItems.length > 0 || styleFamilies.length > 0) && (
        <Reveal>
          <section id="history-index" className="section border-t border-subtle pt-10 sm:pt-12">
            <SectionHeading
              title={lang === 'en' ? 'Periods, styles, types' : lang === 'ja' ? '時代・様式・類型' : '时代、风格与类型'}
              description={lang === 'en' ? 'Use historical period, movement, and program as three ways to read the archive.' : lang === 'ja' ? '時代、運動、用途からアーカイブを読む。' : '用时代、流派和用途三条线索阅读档案。'}
            />
            <div className="grid gap-6 lg:grid-cols-3">
              <IndexList title={t(lang, 'eras')} items={eraItems} />
              <IndexList title={t(lang, 'styles')} items={styleItems} />
              {styleFamilies.length > 0 && (
                <div className="rounded-md border border-subtle bg-surface p-4 shadow-semantic-card">
                  <p className="eyebrow mb-4">{lang === 'en' ? 'Style groups' : lang === 'ja' ? '様式グループ' : '风格组'}</p>
                  <div className="space-y-4">
                    {styleFamilies.map(({ style, children, count }) => (
                      <div key={style.id} className="border-b border-subtle pb-4 last:border-b-0 last:pb-0">
                        <Link href={`${prefix}/browse/style/${style.slug}`} className="body-sm font-medium text-primary transition-colors hover:text-accent">
                          {displayName(style, lang)}
                        </Link>
                        <p className="caption mt-1">{count} {t(lang, 'architects')}</p>
                        {children.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {children.map(child => (
                              <Link key={child.id} href={`${prefix}/browse/style/${child.slug}`} className="rounded-full border border-subtle px-2.5 py-1 text-[0.68rem] leading-none text-secondary transition-colors hover:border-default hover:text-primary">
                                {displayName(child, lang)}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </Reveal>
      )}
    </PageShell>
  )
}

function countBy<T>(items: T[], getKey: (item: T) => string | null | undefined): Map<string, number> {
  const counts = new Map<string, number>()
  items.forEach(item => {
    const key = getKey(item)
    if (key) counts.set(key, (counts.get(key) || 0) + 1)
  })
  return counts
}

function topCountries(buildings: Building[], lang: string): Array<{ code: string; name: string; count: number }> {
  const countries = new Map<string, { code: string; name: string; count: number }>()
  buildings.forEach(building => {
    const code = building.country_code?.toLowerCase()
    const name = building.country
    if (!code || !name) return
    const current = countries.get(code) || { code, name, count: 0 }
    current.count += 1
    current.name = formatCountryName(code, name, lang) || name
    countries.set(code, current)
  })
  return [...countries.values()].sort((a, b) => b.count - a.count).slice(0, 12)
}

function EntryCard({ href, label, value, meta }: { href: string; label: string; value: string; meta: string }) {
  return (
    <Link href={href} className="group rounded-md border border-subtle bg-surface px-4 py-4 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted">
      <p className="label">{label}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <span className="font-serif-display text-4xl leading-none text-primary">{value}</span>
        <span className="caption text-right">{meta}</span>
      </div>
    </Link>
  )
}

function FeaturedArchitect({
  architect,
  count,
  lang,
  prefix,
  eraLabel,
}: {
  architect: Architect
  count: number
  lang: string
  prefix: string
  eraLabel: string
}) {
  const years = architect.birth_year ? `${architect.birth_year}-${architect.death_year || (lang === 'en' ? 'present' : lang === 'ja' ? '現在' : '至今')}` : ''
  return (
    <Link href={`${prefix}/architect/${architect.slug}`} className="group rounded-md border border-subtle bg-surface p-4 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted">
      <p className="caption mb-5">{[years, architect.nationalities?.[0]].filter(Boolean).join(' · ')}</p>
      <h3 className="text-lg font-medium leading-snug text-primary transition-colors group-hover:text-accent">{displayName(architect, lang)}</h3>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {eraLabel && (
          <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[0.68rem] text-secondary">
            {eraLabel}
          </span>
        )}
        {count > 0 && <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[0.68rem] text-secondary">{count} {lang === 'en' ? 'works' : lang === 'ja' ? '作品' : '作品'}</span>}
      </div>
    </Link>
  )
}

function EraLineage({ era, architects, lang, prefix }: { era: Era; architects: Architect[]; lang: string; prefix: string }) {
  return (
    <div>
      <Link href={`${prefix}/browse/era/${era.slug}`} className="body-sm font-medium text-primary transition-colors hover:text-accent">
        {displayName(era, lang)}
      </Link>
      <p className="caption mt-1">{era.year_start ? `${era.year_start}${era.year_end ? `-${era.year_end}` : ''}` : ''}</p>
      <div className="mt-2 space-y-1.5">
        {architects.map(architect => (
          <Link key={architect.id} href={`${prefix}/architect/${architect.slug}`} className="block text-sm leading-relaxed text-secondary transition-colors hover:text-primary">
            {displayName(architect, lang)}
          </Link>
        ))}
      </div>
    </div>
  )
}

function IndexList({ title, items, moreHref, moreLabel }: { title: string; items: BrowseItem[]; moreHref?: string; moreLabel?: string }) {
  if (items.length === 0) return null
  return (
    <div className="rounded-md border border-subtle bg-surface p-4 shadow-semantic-card">
      <p className="eyebrow mb-4">{title}</p>
      <div className="divide-y divide-[color:var(--ui-border-subtle)]">
        {items.map(item => (
          <Link key={item.id} href={item.href} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-3 transition-colors first:pt-0 last:pb-0 hover:text-accent">
            <span className="body-sm font-medium text-primary">{item.label}</span>
            <span className="caption text-right">{item.meta}</span>
          </Link>
        ))}
      </div>
      {moreHref && moreLabel && (
        <Link href={moreHref} className="mt-4 inline-flex body-sm text-accent underline underline-offset-4">
          {moreLabel}
        </Link>
      )}
    </div>
  )
}
