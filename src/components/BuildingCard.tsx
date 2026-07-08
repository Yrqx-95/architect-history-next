import Link from 'next/link'
import BuildingCoverFrame from '@/components/BuildingCoverFrame'
import { formatDisplayLocation } from '@/lib/display'
import type { BuildingWithCover } from '@/lib/types'
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

  return (
    <Link href={`${prefix}/building/${building.slug}`}
      className="group block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ui-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--ui-bg)]">
      <BuildingCoverFrame src={coverUrl} alt={name} />
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
