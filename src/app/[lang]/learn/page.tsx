import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/PageShell'
import EditorialImage from '@/components/EditorialImage'
import { getArchitects, getBuildingsWithCovers, getEras, getStyles, getTypes } from '@/lib/data'
import { displayName, formatDisplayLocation } from '@/lib/display'
import { t } from '@/lib/i18n'
import type { Architect, BuildingType, BuildingWithCover, Era, Style } from '@/lib/types'

type Lang = 'zh' | 'en' | 'ja'

type ArchiveCopy = {
  metaTitle: string
  metaDescription: string
  label: string
  title: string
  line: string
  primaryAction: string
  secondaryAction: string
  collectionTitle: string
  roomsTitle: string
  shelvesTitle: string
  featuredLabel: string
  works: string
  people: string
  time: string
  terms: string
  code: string
  archive: string
}

const COPY: Record<Lang, ArchiveCopy> = {
  zh: {
    metaTitle: '建筑资料馆',
    metaDescription: 'Archistory 建筑资料馆：建筑、人物、时代、术语与法规的安静入口。',
    label: '资料馆',
    title: '建筑资料馆',
    line: '建筑、人物、时代、术语，都放在这里。',
    primaryAction: '看建筑',
    secondaryAction: '看人物',
    collectionTitle: '馆藏入口',
    roomsTitle: '进入不同展厅',
    shelvesTitle: '索引',
    featuredLabel: '当前展品',
    works: '建筑',
    people: '建筑师',
    time: '时间',
    terms: '术语',
    code: '法规',
    archive: '档案',
  },
  en: {
    metaTitle: 'Architecture Archive Room',
    metaDescription: 'Archistory archive room: a quiet entry for buildings, people, time, terms, and code notes.',
    label: 'Archive Room',
    title: 'Architecture Archive Room',
    line: 'Buildings, people, time, terms, and code notes are placed here.',
    primaryAction: 'View buildings',
    secondaryAction: 'View architects',
    collectionTitle: 'Collection entries',
    roomsTitle: 'Enter the rooms',
    shelvesTitle: 'Index',
    featuredLabel: 'Current object',
    works: 'Buildings',
    people: 'Architects',
    time: 'Time',
    terms: 'Terms',
    code: 'Code',
    archive: 'Archive',
  },
  ja: {
    metaTitle: '建築資料館',
    metaDescription: 'Archistory 建築資料館：建築、人物、時間、用語、法規への静かな入口。',
    label: '資料館',
    title: '建築資料館',
    line: '建築、人物、時間、用語、法規をここに並べます。',
    primaryAction: '建築を見る',
    secondaryAction: '人物を見る',
    collectionTitle: '所蔵入口',
    roomsTitle: '展示室へ',
    shelvesTitle: '索引',
    featuredLabel: '現在の展示',
    works: '建築',
    people: '建築家',
    time: '時間',
    terms: '用語',
    code: '法規',
    archive: 'アーカイブ',
  },
}

type ArchiveObject = {
  href: string
  label: string
  image?: string | null
  meta?: string
}

function normalizeLang(lang: string): Lang {
  if (lang === 'en' || lang === 'ja') return lang
  return 'zh'
}

function copyFor(lang: string) {
  return COPY[normalizeLang(lang)]
}

function yearRange(item: { year_start?: number | null; year_end?: number | null }) {
  if (!item.year_start) return ''
  return item.year_end ? `${item.year_start}-${item.year_end}` : String(item.year_start)
}

function selectHero(buildings: BuildingWithCover[]) {
  return buildings.find(building => building.slug === 'villa-savoye' && building.cover_url)
    || buildings.find(building => building.cover_url)
    || buildings[0]
}

function topObjects({
  buildings,
  architects,
  lang,
  prefix,
}: {
  buildings: BuildingWithCover[]
  architects: Architect[]
  lang: string
  prefix: string
}) {
  const architectBySlug = new Map(architects.map(architect => [architect.slug, architect]))
  return buildings
    .filter(building => building.cover_url && building.slug)
    .slice(0, 6)
    .map(building => {
      const architect = building.architect_slug ? architectBySlug.get(building.architect_slug) : null
      return {
        href: `${prefix}/building/${building.slug}`,
        label: displayName(building, lang),
        image: building.cover_url,
        meta: [architect ? displayName(architect, lang) : '', yearRange(building)].filter(Boolean).join(' · '),
      }
    })
}

function archiveRooms(copy: ArchiveCopy, prefix: string) {
  return [
    { href: `${prefix}/browse/buildings`, label: copy.works },
    { href: `${prefix}/browse/architects`, label: copy.people },
    { href: `${prefix}/timeline`, label: copy.time },
    { href: `${prefix}/glossary`, label: copy.terms },
    { href: `${prefix}/code`, label: copy.code },
    { href: `${prefix}/browse`, label: copy.archive },
  ]
}

function shelfItems({
  eras,
  styles,
  types,
  lang,
  prefix,
}: {
  eras: Era[]
  styles: Style[]
  types: BuildingType[]
  lang: string
  prefix: string
}) {
  const eraItems = eras
    .filter(era => era.slug)
    .sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))
    .slice(0, 5)
    .map(era => ({ href: `${prefix}/browse/era/${era.slug}`, label: displayName(era, lang), meta: yearRange(era) }))

  const styleItems = styles
    .filter(style => style.slug)
    .slice(0, 5)
    .map(style => ({ href: `${prefix}/browse/style/${style.slug}`, label: displayName(style, lang), meta: '' }))

  const typeItems = types
    .filter(type => type.slug)
    .slice(0, 5)
    .map(type => ({ href: `${prefix}/browse/type/${type.slug}`, label: displayName(type, lang), meta: '' }))

  return [...eraItems, ...styleItems, ...typeItems]
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const copy = copyFor(lang)
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
  }
}

export default async function ArchiveRoomPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params
  const lang = normalizeLang(rawLang)
  const prefix = `/${lang}`
  const copy = copyFor(lang)
  const [buildings, architects, eras, styles, types] = await Promise.all([
    getBuildingsWithCovers(),
    getArchitects(),
    getEras(),
    getStyles(),
    getTypes(),
  ])

  const hero = selectHero(buildings)
  const heroName = hero ? displayName(hero, lang) : 'Archistory'
  const heroArchitect = hero?.architect_slug ? architects.find(architect => architect.slug === hero.architect_slug) : null
  const heroMeta = hero
    ? [
      heroArchitect ? displayName(heroArchitect, lang) : '',
      yearRange(hero),
      formatDisplayLocation({ city: hero.city, country: hero.country, countryCode: hero.country_code, lang }),
    ].filter(Boolean).join(' · ')
    : ''
  const objects = topObjects({ buildings, architects, lang, prefix })
  const rooms = archiveRooms(copy, prefix)
  const shelves = shelfItems({ eras, styles, types, lang, prefix })

  return (
    <PageShell width="archive" className="space-y-16 sm:space-y-20">
      <header className="border-b border-subtle pb-12 pt-8 sm:min-h-[calc(100vh-8rem)] sm:pb-0 sm:pt-12">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">{copy.label}</p>
          <h1 className="mt-5 text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-none tracking-normal text-primary">
            {copy.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-secondary sm:text-xl sm:leading-8">
            {copy.line}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`${prefix}/browse/buildings`}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[color:var(--ui-text-primary)] px-5 text-sm font-medium text-inverse transition-opacity hover:opacity-85"
            >
              {copy.primaryAction}
            </Link>
            <Link href={`${prefix}/browse/architects`} className="inline-flex min-h-11 items-center justify-center px-3 text-sm font-medium text-primary transition-colors hover:text-accent">
              {copy.secondaryAction}
            </Link>
          </div>
        </div>

        {hero && (
          <Link href={`${prefix}/building/${hero.slug}`} className="group mx-auto mt-10 block max-w-6xl sm:mt-12">
            <div className="relative aspect-[16/9] overflow-hidden bg-surface-muted">
              <EditorialImage
                src={hero.cover_url}
                alt={heroName}
                label={heroName}
                sizes="(max-width: 1280px) 100vw, 72rem"
                className="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
              />
            </div>
            <div className="mt-4 flex flex-col gap-1 text-center sm:flex-row sm:items-baseline sm:justify-center sm:gap-4">
              <p className="text-sm font-medium text-primary">{heroName}</p>
              {heroMeta && <p className="text-xs text-muted">{heroMeta}</p>}
            </div>
          </Link>
        )}
      </header>

      <section aria-labelledby="collection-title">
        <div className="mb-7 flex items-end justify-between gap-4 border-b border-subtle pb-4">
          <h2 id="collection-title" className="text-2xl font-semibold text-primary sm:text-3xl">{copy.collectionTitle}</h2>
          <Link href={`${prefix}/browse/buildings`} className="text-sm text-secondary transition-colors hover:text-primary">
            {t(lang, 'viewAll')}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {objects.map(object => (
            <ArchiveObjectLink key={object.href} object={object} />
          ))}
        </div>
      </section>

      <section aria-labelledby="rooms-title" className="border-y border-subtle py-8">
        <h2 id="rooms-title" className="mb-6 text-2xl font-semibold text-primary sm:text-3xl">{copy.roomsTitle}</h2>
        <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
          {rooms.map(room => (
            <Link key={room.href} href={room.href} className="group px-1">
              <span className="block text-xl font-semibold leading-tight text-primary transition-colors group-hover:text-accent sm:text-2xl">
                {room.label}
              </span>
              <span aria-hidden="true" className="mt-2 block text-sm text-muted transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="shelves-title" className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <h2 id="shelves-title" className="text-2xl font-semibold text-primary sm:text-3xl">{copy.shelvesTitle}</h2>
        <div className="grid border-t border-subtle sm:grid-cols-2 lg:grid-cols-3 lg:border-t-0">
          {shelves.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-14 items-center justify-between gap-4 border-b border-subtle px-1 py-3 text-sm text-primary transition-colors hover:text-accent"
            >
              <span>{item.label}</span>
              <span className="shrink-0 text-xs text-muted" aria-hidden={!item.meta}>
                {item.meta || '→'}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

function ArchiveObjectLink({ object }: { object: ArchiveObject }) {
  return (
    <Link href={object.href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
        <EditorialImage
          src={object.image}
          alt={object.label}
          label={object.label}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 12rem"
          className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <p className="mt-3 text-sm font-medium leading-snug text-primary transition-colors group-hover:text-accent">{object.label}</p>
      {object.meta && <p className="mt-1 line-clamp-1 text-xs text-muted">{object.meta}</p>}
    </Link>
  )
}
