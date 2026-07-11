import { t } from '@/lib/i18n'

interface SearchEmptyStateProps {
  lang: string
  mode: 'empty' | 'no-results'
}

export default function SearchEmptyState({ lang, mode }: SearchEmptyStateProps) {
  const isNoResults = mode === 'no-results'

  return (
    <div className="border-t border-subtle py-12">
      <h2 className="heading-3">{isNoResults ? t(lang, 'noResults') : t(lang, 'searchEmptyTitle')}</h2>
      <p className="body-sm mt-3 max-w-xl">
        {isNoResults ? t(lang, 'searchNoResultsHint') : t(lang, 'searchEmptyBody')}
      </p>
      {isNoResults && (
        <p className="mt-5 text-sm text-muted">
          {lang === 'en'
            ? 'Use the archive entry points below if you want to browse instead.'
            : lang === 'ja'
              ? '下の入口からアーカイブを見ても大丈夫です。'
              : '也可以直接从下面的档案入口继续。'}
        </p>
      )}
    </div>
  )
}
