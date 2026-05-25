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
      className="group block border-t border-subtle px-0 py-3 transition-colors hover:border-default focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ui-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--ui-bg)] sm:py-3.5">
      <h3 className="line-clamp-2 break-words text-sm font-medium leading-snug text-primary transition-colors group-hover:text-accent sm:text-[0.95rem]">{name}</h3>
      {(years || architect.era_slug) && (
        <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted">
          {years}
          {years && architect.era_slug && <span className="block sm:inline sm:ml-1"> &middot; {architect.era_slug}</span>}
          {!years && architect.era_slug && architect.era_slug}
        </p>
      )}
    </Link>
  )
}
