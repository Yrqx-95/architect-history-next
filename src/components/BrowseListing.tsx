import Link from 'next/link'
import { formatDisplayLocation } from '@/lib/display'
import type { Architect, Building, BuildingWithCover } from '@/lib/types'
import { t } from '@/lib/i18n'
import { displayName } from '@/lib/display'
import PageShell from './PageShell'
import Reveal from './Reveal'
import ArchitectPortraitThumb from './ArchitectPortraitThumb'
import SafeImage from './SafeImage'
import { getArchitectImageOverride } from '@/lib/architect-images'

export default function BrowseListing({ lang, displayName: displayTitle, description, architects, buildings, architectMap }: {
  lang: string
  displayName: string
  description?: string
  architects: Architect[]
  buildings: Building[]
  architectMap?: Map<string, string>
}) {
  const sortedArchitects = [...architects].sort((a, b) => displayName(a, lang).localeCompare(displayName(b, lang)))
  const sortedBuildings = [...buildings].sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))

  return (
    <PageShell width="archive">
      <header className="section border-b border-subtle pb-8 sm:pb-10">
        <p className="eyebrow mb-4">{lang === 'en' ? 'Browse path' : lang === 'ja' ? '閲覧経路' : '浏览路径'}</p>
        <h1 className="heading-display mb-3">{displayTitle}</h1>
        {description && <p className="body-large max-w-3xl">{description}</p>}
        <div className="mt-7 grid gap-3 border-y border-subtle py-4 sm:grid-cols-2">
          <IndexStat value={sortedArchitects.length} label={t(lang, 'architects')} />
          <IndexStat value={sortedBuildings.length} label={t(lang, 'buildings')} />
        </div>
      </header>

      {sortedArchitects.length > 0 && (
        <Reveal>
          <section className="section pt-8 sm:pt-10">
            <ListHeader
              title={t(lang, 'architects')}
              description={lang === 'en' ? 'Figures connected to this browse path.' : lang === 'ja' ? 'この閲覧経路に関連する建築家。' : '与当前路径相关的建筑师。'}
            />
            <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {sortedArchitects.map(architect => (
                <ArchitectRow key={architect.id} architect={architect} lang={lang} />
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {sortedBuildings.length > 0 && (
        <Reveal>
          <section className="section border-t border-subtle pt-10 sm:pt-12">
            <ListHeader
              title={t(lang, 'buildings')}
              description={lang === 'en' ? 'Works in this category.' : lang === 'ja' ? 'このカテゴリに含まれる作品。' : '属于当前分类的建筑作品。'}
            />
            <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {sortedBuildings.map(building => (
                <BuildingRow
                  key={building.id}
                  building={building}
                  lang={lang}
                  architectName={architectMap?.get(building.architect_slug || '') || ''}
                />
              ))}
            </div>
          </section>
        </Reveal>
      )}
    </PageShell>
  )
}

function IndexStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="min-w-0">
      <p className="font-serif-display text-3xl leading-none text-primary">{value}</p>
      <p className="caption mt-2">{label}</p>
    </div>
  )
}

function ListHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow mb-2">{title}</p>
        <h2 className="heading-3">{title}</h2>
      </div>
      <p className="caption max-w-lg sm:text-right">{description}</p>
    </div>
  )
}

function ArchitectRow({ architect, lang }: { architect: Architect; lang: string }) {
  const portrait = getArchitectImageOverride(architect.slug)
  const years = architect.birth_year ? `${architect.birth_year}-${architect.death_year || (lang === 'en' ? 'present' : lang === 'ja' ? '現在' : '至今')}` : ''
  const name = displayName(architect, lang)
  return (
    <Link href={`/${lang}/architect/${architect.slug}`} className="interactive-row group grid min-h-20 grid-cols-[4.25rem_minmax(0,1fr)] gap-3 border-t border-subtle px-2 py-3">
      <ArchitectPortraitThumb
        src={portrait?.url}
        alt={portrait?.alt[lang as keyof typeof portrait.alt] || portrait?.alt.en || name}
        fallback={name}
        className="h-16 w-16 rounded-sm"
        sizes="4rem"
      />
      <span className="min-w-0 self-center">
        <span className="block truncate text-sm font-medium text-primary transition-colors group-hover:text-accent">{name}</span>
        {years && <span className="caption mt-1 block truncate">{years}</span>}
      </span>
    </Link>
  )
}

function BuildingRow({
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
  const coverUrl = (building as BuildingWithCover).cover_url
  const name = displayName(building, lang)
  return (
    <Link
      href={`/${lang}/building/${building.slug}`}
      className="interactive-row group grid min-h-20 grid-cols-[4.25rem_minmax(0,1fr)] gap-3 border-t border-subtle px-2 py-3"
    >
      <span className="relative h-16 w-16 overflow-hidden rounded-sm bg-surface-muted">
        {coverUrl ? (
          <SafeImage src={coverUrl} alt={name} fill className="object-cover transition duration-500 ease-out group-hover:scale-[1.04]" sizes="4rem" />
        ) : (
          <span className="flex h-full w-full items-center justify-center px-1 text-center text-[0.62rem] leading-tight text-muted">
            {name}
          </span>
        )}
      </span>
      <span className="min-w-0 self-center">
        <span className="block truncate text-sm font-medium text-primary transition-colors group-hover:text-accent">
          {name}
        </span>
        <span className="caption mt-1 block truncate">
          {[architectName, location].filter(Boolean).join(' · ')}
          {building.year_start ? `${architectName || location ? ' · ' : ''}${building.year_start}` : ''}
        </span>
      </span>
    </Link>
  )
}
