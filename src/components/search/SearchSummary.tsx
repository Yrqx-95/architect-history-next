import { t } from '@/lib/i18n'

interface SearchSummaryProps {
  lang: string
  total: number
}

export default function SearchSummary({ lang, total }: SearchSummaryProps) {
  return (
    <div className="mb-8 border-y border-warm-200/70 py-3 text-sm text-warm-600 dark:border-charcoal-700 dark:text-warm-300">
      <span className="font-medium text-warm-800 dark:text-paper-100">{total}</span> {t(lang, 'resultsFound')}
    </div>
  )
}
