import Link from 'next/link'
import type { Architect } from '@/lib/types'
import { safeDisplayName } from '@/lib/quality'

export default function ArchitectCard({ architect, lang }: { architect: Architect; lang: string }) {
  const prefix = `/${lang}`
  const name = safeDisplayName(architect, lang)
  const years = architect.birth_year
    ? `${architect.birth_year}–${architect.death_year || ''}`
    : ''

  return (
    <Link href={`${prefix}/architect/${architect.slug}`}
      className="group block border-t border-warm-200/70 px-0 py-3 transition-colors hover:border-warm-400/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-warm-400 focus-visible:ring-offset-4 focus-visible:ring-offset-paper-100 dark:border-charcoal-700/80 dark:hover:border-charcoal-500 dark:focus-visible:ring-offset-charcoal-950 sm:py-3.5">
      <h3 className="text-sm font-medium leading-snug text-warm-800 transition-colors group-hover:text-warm-600 dark:text-paper-100 dark:group-hover:text-warm-300 sm:text-[0.95rem] line-clamp-2 break-words">{name}</h3>
      {(years || architect.era_slug) && (
        <p className="mt-1.5 text-[0.7rem] leading-relaxed text-warm-600 dark:text-warm-300">
          {years}
          {years && architect.era_slug && <span className="block sm:inline sm:ml-1"> &middot; {architect.era_slug}</span>}
          {!years && architect.era_slug && architect.era_slug}
        </p>
      )}
    </Link>
  )
}
