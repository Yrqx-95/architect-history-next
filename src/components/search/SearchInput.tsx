import type { CSSProperties } from 'react'
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
          className="w-full rounded-md border border-default bg-surface-raised py-3.5 pl-11 pr-4 text-base text-primary shadow-semantic-card transition-colors placeholder:text-muted focus:border-default focus:outline-none focus:ring-2 sm:py-4"
          style={{ boxShadow: 'var(--ui-shadow-card)', '--tw-ring-color': 'var(--ui-focus)' } as CSSProperties}
        />
        <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </form>
  )
}
