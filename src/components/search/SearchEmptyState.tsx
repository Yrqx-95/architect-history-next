import Link from 'next/link'
import { t } from '@/lib/i18n'

interface SearchEmptyStateProps {
  lang: string
  prefix: string
  mode: 'empty' | 'no-results'
}

export default function SearchEmptyState({ lang, prefix, mode }: SearchEmptyStateProps) {
  const isNoResults = mode === 'no-results'

  return (
    <div className="border-t border-warm-200/70 py-12 dark:border-charcoal-700">
      <h2 className="heading-3">{isNoResults ? t(lang, 'noResults') : t(lang, 'searchEmptyTitle')}</h2>
      <p className="body-sm mt-3 max-w-xl">
        {isNoResults ? t(lang, 'searchNoResultsHint') : t(lang, 'searchEmptyBody')}
      </p>
      {isNoResults && (
        <Link href={`${prefix}/browse`} className="mt-5 inline-flex text-sm text-warm-600 underline underline-offset-4 hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100">
          {t(lang, 'browseCategory')}
        </Link>
      )}
    </div>
  )
}
