import Link from 'next/link'
import { t } from '@/lib/i18n'
import type { SearchArchitect } from './types'
import { displayName } from './utils'

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
        {t(lang, 'architects')} <span className="font-normal text-warm-600 dark:text-warm-300">({architects.length})</span>
      </h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {architects.map(architect => (
          <Link
            key={architect.slug}
            href={`${prefix}/architect/${architect.slug}`}
            className="group block border-t border-warm-200/70 py-3 transition-colors hover:border-warm-400/70 dark:border-charcoal-700 dark:hover:border-charcoal-500"
          >
            <span className="text-sm font-medium dark:text-paper-100">{displayName(architect, lang)}</span>
            <span className="mt-0.5 block text-xs text-warm-600 dark:text-warm-300">
              {architect.birth_year || '?'}-{architect.death_year || ''}{architect.era_slug ? ` · ${architect.era_slug}` : ''}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
