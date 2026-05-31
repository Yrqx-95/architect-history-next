import Link from 'next/link'
import { t } from '@/lib/i18n'
import { displayName, formatDisplayLocation, type Architect, type Building, type BuildingWithCover } from '@/lib/types'
import PageShell from './PageShell'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import BuildingCard from './BuildingCard'
import ArchitectCard from './ArchitectCard'

export default function BrowseListing({ lang, displayName, description, architects, buildings, architectMap }: {
  lang: string
  displayName: string
  description?: string
  architects: Architect[]
  buildings: Building[]
  architectMap?: Map<string, string>
}) {
  const buildingsWithCovers = buildings.filter(hasCover)
  const buildingsWithoutCovers = buildings.filter(building => !hasCover(building))

  return (
    <PageShell className="!max-w-[80rem]">
      <header className="section">
        <p className="eyebrow mb-4">{lang === 'en' ? 'Browse path' : lang === 'ja' ? '閲覧経路' : '浏览路径'}</p>
        <h1 className="heading-display mb-3">{displayName}</h1>
        {description && <p className="body-large max-w-3xl">{description}</p>}
      </header>

      <div className="mb-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-subtle bg-surface px-4 py-3 shadow-semantic-card">
          <p className="label">{t(lang, 'architects')}</p>
          <p className="mt-3 font-serif-display text-4xl leading-none text-primary">{architects.length}</p>
        </div>
        <div className="rounded-md border border-subtle bg-surface px-4 py-3 shadow-semantic-card">
          <p className="label">{t(lang, 'buildings')}</p>
          <p className="mt-3 font-serif-display text-4xl leading-none text-primary">{buildings.length}</p>
        </div>
      </div>

      {architects.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <SectionHeading title={t(lang, 'architects')} description={lang === 'en' ? 'Figures connected to this browse path.' : lang === 'ja' ? 'この閲覧経路に関連する建築家。' : '与当前路径相关的建筑师。'} />
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {architects.map(a => <ArchitectCard key={a.id} architect={a} lang={lang} />)}
            </div>
          </section>
        </Reveal>
      )}

      {buildings.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <SectionHeading title={t(lang, 'buildings')} description={lang === 'en' ? 'Works in this category.' : lang === 'ja' ? 'このカテゴリに含まれる作品。' : '属于当前分类的建筑作品。'} />
            {buildingsWithCovers.length > 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {buildingsWithCovers.map(b => (
                <BuildingCard key={b.id} building={b} lang={lang}
                  architectName={architectMap?.get(b.architect_slug || '') || ''} />
              ))}
              </div>
            )}
            {buildingsWithoutCovers.length > 0 && (
              <div className={buildingsWithCovers.length > 0 ? 'mt-10' : ''}>
                <p className="eyebrow mb-4">
                  {lang === 'en' ? 'Text index' : lang === 'ja' ? '文字索引' : '文字索引'}
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {buildingsWithoutCovers.map(building => (
                    <CompactBuildingRow
                      key={building.id}
                      building={building}
                      lang={lang}
                      architectName={architectMap?.get(building.architect_slug || '') || ''}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </Reveal>
      )}
    </PageShell>
  )
}

function hasCover(building: Building): building is BuildingWithCover {
  return Boolean((building as BuildingWithCover).cover_url)
}

function CompactBuildingRow({
  building,
  lang,
  architectName,
}: {
  building: Building
  lang: string
  architectName: string
}) {
  const location = formatDisplayLocation({
    city: building.city,
    country: building.country,
    countryCode: building.country_code,
    lang,
  })
  return (
    <Link
      href={`/${lang}/building/${building.slug}`}
      className="group grid grid-cols-[4rem_minmax(0,1fr)] gap-4 rounded-md border border-subtle bg-surface px-4 py-3 transition-colors hover:border-default hover:bg-surface-muted"
    >
      <div className="pt-0.5">
        <p className="metadata tabular-nums">{building.year_start || '—'}</p>
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-sm font-medium text-primary transition-colors group-hover:text-accent">
          {displayName(building, lang)}
        </h3>
        <p className="caption mt-1 truncate">
          {[architectName, location].filter(Boolean).join(' · ')}
        </p>
      </div>
    </Link>
  )
}
