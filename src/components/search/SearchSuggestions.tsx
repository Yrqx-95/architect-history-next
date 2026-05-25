import { t } from '@/lib/i18n'

interface SearchSuggestion {
  label: string
  value: string
}

interface SearchSuggestionsProps {
  lang: string
  suggestions: SearchSuggestion[]
  onSelect: (value: string) => void
}

export default function SearchSuggestions({ lang, suggestions, onSelect }: SearchSuggestionsProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      <span className="metadata mr-1">{t(lang, 'searchSuggestions')}</span>
      {suggestions.map(suggestion => (
        <button
          key={suggestion.label}
          type="button"
          onClick={() => onSelect(suggestion.value)}
          className="rounded-full border border-default bg-surface px-3 py-1.5 text-xs text-secondary transition-colors hover:bg-surface-muted hover:text-primary"
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  )
}
