import Link from 'next/link'
import type { Architect } from '@/lib/types'
import { safeDisplayName } from '@/lib/quality'

export default function ArchitectCard({ architect, lang, eraLabel }: { architect: Architect; lang: string; eraLabel?: string }) {
  const prefix = `/${lang}`
  const name = safeDisplayName(architect, lang)
  const years = architect.birth_year
    ? `${architect.birth_year}–${architect.death_year || ''}`
    : ''
  const eraText = eraLabel || (lang === 'ja' ? '' : architect.era_slug || '')

  return (
    <Link href={`${prefix}/architect/${architect.slug}`}
      className="group block min-h-[6.25rem] rounded-md border border-subtle bg-surface px-3.5 py-3 transition-colors hover:border-default hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ui-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--ui-bg)] sm:py-3.5">
      <h3 className="line-clamp-2 break-words text-sm font-medium leading-snug text-primary transition-colors group-hover:text-accent sm:text-[0.95rem]">{name}</h3>
      {(years || eraText) && (
        <p className="mt-1.5 text-[0.7rem] leading-relaxed text-muted">
          {years}
          {years && eraText && <span className="block sm:inline sm:ml-1"> &middot; {eraText}</span>}
          {!years && eraText}
        </p>
      )}
    </Link>
  )
}
