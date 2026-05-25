import Link from 'next/link'
import { t } from '@/lib/i18n'
import SafeImage from '@/components/SafeImage'
import type { SearchBuilding } from './types'
import { displayName } from './utils'

interface SearchBuildingResultsProps {
  lang: string
  prefix: string
  buildings: SearchBuilding[]
}

export default function SearchBuildingResults({ lang, prefix, buildings }: SearchBuildingResultsProps) {
  if (buildings.length === 0) return null

  return (
    <section>
      <h2 className="heading-3 mb-4">
        {t(lang, 'buildings')} <span className="font-normal text-muted">({buildings.length})</span>
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {buildings.map(building => (
          <Link
            key={building.slug}
            href={`${prefix}/building/${building.slug}`}
            className="group grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-t border-subtle pt-4 transition-colors hover:border-default"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-surface-muted">
              {building.cover_url ? (
                <SafeImage
                  src={building.cover_url}
                  alt={displayName(building, lang)}
                  fill
                  sizes="7rem"
                  className="object-cover transition duration-500 ease-out group-hover:scale-[1.015]"
                />
              ) : (
                <div className="img-placeholder h-full px-3 text-center text-xs text-muted">
                  {displayName(building, lang)}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <span className="text-sm font-medium leading-snug text-primary transition-colors group-hover:text-accent">
                {displayName(building, lang)}
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                {[building.city, building.country].filter(Boolean).join(', ')} · {building.year_start || ''}
              </span>
              {building.type_slug && (
                <span className="metadata mt-2 block">{building.type_slug}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
