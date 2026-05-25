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
    <div className="border-t border-subtle py-12">
      <h2 className="heading-3">{isNoResults ? t(lang, 'noResults') : t(lang, 'searchEmptyTitle')}</h2>
      <p className="body-sm mt-3 max-w-xl">
        {isNoResults ? t(lang, 'searchNoResultsHint') : t(lang, 'searchEmptyBody')}
      </p>
      {isNoResults && (
        <Link href={`${prefix}/browse`} className="mt-5 inline-flex text-sm text-accent underline underline-offset-4 hover:text-primary">
          {t(lang, 'browseCategory')}
        </Link>
      )}
    </div>
  )
}
