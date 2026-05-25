'use client'

import { useState } from 'react'
import Link from 'next/link'
import SafeImage from '@/components/SafeImage'
import type { BuildingWithCover } from '@/lib/types'
import { safeDisplayName } from '@/lib/quality'

export default function BuildingCard({ building, lang, architectName }: {
  building: BuildingWithCover; lang: string; architectName?: string
}) {
  const prefix = `/${lang}`
  const name = safeDisplayName(building, lang)
  const coverUrl = building.cover_url
  const location = [building.city, building.country].filter(Boolean).join(', ')
  const [imgError, setImgError] = useState(false)

  const showImage = coverUrl && !imgError

  return (
    <Link href={`${prefix}/building/${building.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-warm-400 focus-visible:ring-offset-4 focus-visible:ring-offset-paper-100 dark:focus-visible:ring-offset-charcoal-950">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-warm-100 dark:bg-charcoal-900 sm:aspect-[3/2]">
        {showImage ? (
          <SafeImage
            src={coverUrl}
            alt={name}
            fill
            className="object-cover transition duration-500 ease-out group-hover:scale-[1.015]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="img-placeholder h-full px-6 text-center text-sm text-warm-600 dark:text-warm-300">{name}</div>
        )}
      </div>
      <div className="pt-3 sm:pt-4">
        {architectName && (
          <p className="mb-1.5 truncate text-[0.68rem] uppercase tracking-[0.12em] text-warm-600 dark:text-warm-300">{architectName}</p>
        )}
        <h3 className="text-base font-medium leading-snug text-warm-800 transition-colors group-hover:text-warm-600 dark:text-paper-100 dark:group-hover:text-warm-300 sm:text-lg line-clamp-2 break-words">{name}</h3>
        {(location || building.year_start) && (
          <p className="mt-2 text-xs leading-relaxed text-warm-600 dark:text-warm-300">{[location, building.year_start].filter(Boolean).join(' · ')}</p>
        )}
      </div>
    </Link>
  )
}
