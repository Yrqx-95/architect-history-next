import { t } from '@/lib/i18n'

interface SearchInputProps {
  lang: string
  query: string
  onQueryChange: (value: string) => void
}

export default function SearchInput({ lang, query, onQueryChange }: SearchInputProps) {
  return (
    <form onSubmit={e => e.preventDefault()} className="mb-5">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          placeholder={t(lang, 'searchPlaceholder')}
          autoFocus
          className="w-full rounded-md border border-warm-300 bg-paper-100 py-3.5 pl-11 pr-4 text-base text-warm-800 shadow-card transition-colors placeholder:text-warm-600 focus:border-warm-500 focus:outline-none focus:ring-1 focus:ring-warm-500/50 dark:border-charcoal-600 dark:bg-charcoal-800 dark:text-paper-100 dark:placeholder:text-warm-300 sm:py-4"
        />
        <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-warm-600 dark:text-warm-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </form>
  )
}
