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
          className="rounded-full border border-warm-200/80 px-3 py-1.5 text-xs text-warm-600 transition-colors hover:border-warm-400 hover:text-warm-800 dark:border-charcoal-700 dark:text-warm-300 dark:hover:border-charcoal-500 dark:hover:text-paper-100"
        >
          {suggestion.label}
        </button>
      ))}
    </div>
  )
}
