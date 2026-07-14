'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/SafeImage'

export type BuildingExplorerMode = 'country' | 'era' | 'style' | 'type'

export type BuildingExplorerItem = {
  slug: string
  name: string
  year?: string
  meta?: string
  architectName?: string
  imageUrl?: string | null
}

export type BuildingExplorerGroup = {
  id: string
  label: string
  count: number
  items: BuildingExplorerItem[]
  textItems?: BuildingExplorerItem[]
}

export type BuildingExplorerCopy = {
  featuredLabel: string
  featuredTitle: string
  browseTitle: string
  browseDescription: string
  country: string
  era: string
  style: string
  type: string
}

const WIDE_GROUP_ITEM_COUNT = 12

function groupShellClass(group: BuildingExplorerGroup, groupCount: number) {
  if (groupCount === 1 || group.count >= WIDE_GROUP_ITEM_COUNT) {
    return 'lg:col-span-2 xl:col-span-3'
  }

  return ''
}

function groupItemsClass(group: BuildingExplorerGroup, groupCount: number) {
  if (groupCount === 1 || group.count >= WIDE_GROUP_ITEM_COUNT) {
    return 'sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
  }

  return 'sm:grid-cols-2'
}

export default function BuildingExplorer({
  lang,
  featured,
  groups,
  copy,
}: {
  lang: string
  featured: BuildingExplorerItem[]
  groups: Record<BuildingExplorerMode, BuildingExplorerGroup[]>
  copy: BuildingExplorerCopy
}) {
  const [mode, setMode] = useState<BuildingExplorerMode>('country')
  const activeGroups = groups[mode]
  const heroLead = featured[0]
  const heroRest = featured.slice(1, 5)
  const modeOptions = useMemo<Array<{ id: BuildingExplorerMode; label: string }>>(() => [
    { id: 'country', label: copy.country },
    { id: 'era', label: copy.era },
    { id: 'style', label: copy.style },
    { id: 'type', label: copy.type },
  ], [copy.country, copy.era, copy.style, copy.type])

  return (
    <div className="space-y-12">
      {heroLead && (
        <section className="section border-b border-subtle pb-10 pt-4 sm:pt-8">
          <div className="mb-6 grid gap-4 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-end">
            <div>
              <p className="eyebrow mb-4">{copy.featuredLabel}</p>
              <h1 className="heading-display mb-4">{copy.featuredTitle}</h1>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
            <HeroBuilding item={heroLead} lang={lang} />
            <div className="border-y border-subtle lg:border-y-0 lg:border-l lg:pl-5">
              {heroRest.map(item => (
                <FeatureBuilding key={item.slug} item={item} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section pt-0">
        <div className="mb-6 flex flex-col gap-4 border-b border-subtle pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="heading-3">{copy.browseTitle}</h2>
            <p className="caption mt-1 max-w-2xl">{copy.browseDescription}</p>
          </div>
          <div className="flex w-full gap-1 overflow-x-auto border-b border-subtle text-sm sm:w-auto" role="tablist" aria-label={copy.browseTitle}>
            {modeOptions.map(option => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id)}
                className={`min-h-10 shrink-0 border-b-2 px-3 font-medium transition-colors sm:px-4 ${
                  mode === option.id
                    ? 'border-[color:var(--ui-text-primary)] text-primary'
                    : 'border-transparent text-secondary hover:border-default hover:text-primary'
                }`}
                aria-pressed={mode === option.id}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className={`grid gap-x-6 gap-y-10 ${activeGroups.length === 1 ? 'grid-cols-1' : 'lg:grid-cols-2 xl:grid-cols-3'}`}>
          {activeGroups.map(group => (
            <section
              key={`${mode}-${group.id}`}
              className={`scroll-mt-24 border-t border-subtle pt-4 ${groupShellClass(group, activeGroups.length)}`}
            >
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-semibold text-primary">{group.label}</h3>
                <p className="caption tabular-nums">{group.count}</p>
              </div>
              <div className={`grid gap-x-5 gap-y-1 ${groupItemsClass(group, activeGroups.length)}`}>
                {group.items.map(item => (
                  <CompactBuilding key={`${group.id}-${item.slug}`} item={item} lang={lang} />
                ))}
                {group.textItems?.map(item => (
                  <CompactBuilding key={`${group.id}-text-${item.slug}`} item={item} lang={lang} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}

function HeroBuilding({ item, lang }: { item: BuildingExplorerItem; lang: string }) {
  return (
    <Link href={`/${lang}/building/${item.slug}`} className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ui-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--ui-bg)]">
      <div className="image-frame aspect-[16/11] rounded-sm">
        <ResilientBuildingImage item={item} sizes="(min-width: 1024px) 50vw, 100vw" loading="eager" priority />
      </div>
      <div className="interactive-row mt-4 border-y border-subtle px-2 py-5">
        <p className="caption mb-2">{[item.architectName, item.meta, item.year].filter(Boolean).join(' · ')}</p>
        <h2 className="text-3xl font-semibold leading-tight text-primary transition-colors group-hover:text-accent">{item.name}</h2>
      </div>
    </Link>
  )
}

function FeatureBuilding({ item, lang }: { item: BuildingExplorerItem; lang: string }) {
  return (
    <Link href={`/${lang}/building/${item.slug}`} className="interactive-row group grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-subtle px-2 py-4 transition-colors first:border-t lg:first:border-t-0">
      <div className="image-frame aspect-[4/3] rounded-sm">
        <ResilientBuildingImage item={item} sizes="(min-width: 1024px) 25vw, 50vw" />
      </div>
      <div className="min-w-0 self-center">
        <p className="caption mb-1">{[item.architectName, item.year].filter(Boolean).join(' · ')}</p>
        <h3 className="line-clamp-2 text-base font-semibold text-primary transition-colors group-hover:text-accent">{item.name}</h3>
      </div>
    </Link>
  )
}

function CompactBuilding({ item, lang }: { item: BuildingExplorerItem; lang: string }) {
  const hasImage = Boolean(item.imageUrl)

  return (
    <Link href={`/${lang}/building/${item.slug}`} className={`motion-reveal-row group border-b border-subtle py-2 transition-colors hover:border-default ${hasImage ? 'grid min-h-16 grid-cols-[3.75rem_minmax(0,1fr)]' : 'block'}`}>
      {hasImage && (
        <div className="image-frame h-14 w-14 overflow-hidden rounded-sm">
          <ResilientBuildingImage item={item} sizes="6rem" />
        </div>
      )}
      <div className={`flex min-w-0 flex-col justify-center ${hasImage ? '' : 'min-h-12'}`}>
        <p className="caption mb-1 truncate">{[item.architectName, item.year].filter(Boolean).join(' · ')}</p>
        <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-primary transition-colors group-hover:text-accent">{item.name}</h4>
        {item.meta && <p className="caption mt-1 truncate">{item.meta}</p>}
      </div>
    </Link>
  )
}

function ResilientBuildingImage({
  item,
  sizes,
  loading,
  priority,
}: {
  item: BuildingExplorerItem
  sizes: string
  loading?: 'eager' | 'lazy'
  priority?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const src = item.imageUrl && !failed ? item.imageUrl : ''

  if (!src) {
    return (
      <div className="flex h-full min-h-full items-center justify-center bg-surface-muted px-3 text-center text-xs text-muted">
        {item.name}
      </div>
    )
  }

  return (
    <SafeImage
      src={src}
      alt={item.name}
      fill
      sizes={sizes}
      loading={priority ? undefined : loading}
      priority={priority}
      className="image-zoom object-cover"
      onError={() => setFailed(true)}
    />
  )
}
