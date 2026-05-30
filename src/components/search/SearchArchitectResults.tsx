import Link from 'next/link'
import { t } from '@/lib/i18n'
import type { SearchArchitect } from './types'
import { displayMetadataText, displayName } from './utils'

interface SearchArchitectResultsProps {
  lang: string
  prefix: string
  architects: SearchArchitect[]
}

export default function SearchArchitectResults({ lang, prefix, architects }: SearchArchitectResultsProps) {
  if (architects.length === 0) return null

  return (
    <section className="mb-8">
      <h2 className="heading-3 mb-4">
        {t(lang, 'architects')} <span className="font-normal text-muted">({architects.length})</span>
      </h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {architects.map(architect => {
          const eraText = displayMetadataText(architect.era_slug, lang)
          return (
            <Link
              key={architect.slug}
              href={`${prefix}/architect/${architect.slug}`}
              className="group block border-t border-subtle py-3 transition-colors hover:border-default"
            >
              <span className="text-sm font-medium text-primary">{displayName(architect, lang)}</span>
              <span className="mt-0.5 block text-xs text-muted">
                {architect.birth_year || '?'}-{architect.death_year || ''}{eraText ? ` · ${eraText}` : ''}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
