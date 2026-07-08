import Link from 'next/link'
import type { Architect } from '@/lib/types'
import { safeDisplayName } from '@/lib/quality'
import { getArchitectImageOverride } from '@/lib/architect-images'
import ArchitectPortraitThumb from '@/components/ArchitectPortraitThumb'

export default function ArchitectCard({
  architect,
  lang,
  eraLabel,
  visualUrl,
}: {
  architect: Architect
  lang: string
  eraLabel?: string
  visualUrl?: string | null
}) {
  const prefix = `/${lang}`
  const name = safeDisplayName(architect, lang)
  const years = architect.birth_year
    ? `${architect.birth_year}–${architect.death_year || ''}`
    : ''
  const eraText = eraLabel || (lang === 'ja' ? '' : architect.era_slug || '')
  const portrait = getArchitectImageOverride(architect.slug)
  const portraitAlt = portrait?.alt[lang as keyof typeof portrait.alt] || portrait?.alt.en || name

  return (
    <Link href={`${prefix}/architect/${architect.slug}`}
      className="interactive-row group grid min-h-[5.75rem] grid-cols-[4.5rem_minmax(0,1fr)] items-stretch gap-3 border-y border-subtle px-2 py-3 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ui-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[color:var(--ui-bg)]">
      <ArchitectPortraitThumb
        src={portrait?.url}
        fallbackSrc={visualUrl}
        alt={portraitAlt}
        fallback={name.slice(0, 2)}
        className="h-full min-h-[5rem] rounded-sm"
        sizes="5rem"
      />
      <div className="flex min-w-0 flex-col justify-center">
        <h3 className="line-clamp-2 break-words text-sm font-medium leading-snug text-primary transition-colors group-hover:text-accent sm:text-[0.95rem]">{name}</h3>
        {(years || eraText) && (
          <p className="mt-1.5 line-clamp-2 text-[0.7rem] leading-relaxed text-muted">
            {years}
            {years && eraText && <span className="block sm:inline sm:ml-1"> &middot; {eraText}</span>}
            {!years && eraText}
          </p>
      )}
      </div>
    </Link>
  )
}
