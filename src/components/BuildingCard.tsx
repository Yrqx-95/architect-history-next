'use client'

import { useState } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import { formatDisplayLocation, type BuildingWithCover } from '@/lib/types'
import { safeDisplayName } from '@/lib/quality'

export default function BuildingCard({ building, lang, architectName }: {
  building: BuildingWithCover; lang: string; architectName?: string
}) {
  const prefix = `/${lang}`
  const name = safeDisplayName(building, lang)
  const coverUrl = building.cover_url
  const location = formatDisplayLocation({
    city: building.city,
    country: building.country,
    countryCode: building.country_code,
    lang,
  })
  const [imgError, setImgError] = useState(false)

  const showImage = coverUrl && !imgError

  return (
    <Link href={`${prefix}/building/${building.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ui-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--ui-bg)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-surface-muted sm:aspect-[3/2]">
        {showImage ? (
          <SafeImage
            src={coverUrl}
            alt={name}
            fill
            className="object-cover opacity-100 brightness-100 contrast-100 saturate-100 transition duration-500 ease-out group-hover:scale-[1.015]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="img-placeholder h-full px-6 text-center text-sm text-muted">{name}</div>
        )}
      </div>
      <div className="pt-3 sm:pt-4">
        {architectName && (
          <p className="mb-1.5 truncate text-[0.68rem] uppercase tracking-[0.12em] text-muted">{architectName}</p>
        )}
        <h3 className="line-clamp-2 break-words text-base font-medium leading-snug text-primary transition-colors group-hover:text-accent sm:text-lg">{name}</h3>
        {(location || building.year_start) && (
          <p className="mt-2 text-xs leading-relaxed text-muted">{[location, building.year_start].filter(Boolean).join(' · ')}</p>
        )}
      </div>
    </Link>
  )
}
