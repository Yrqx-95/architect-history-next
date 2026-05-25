import { t } from '@/lib/i18n'

interface SearchSummaryProps {
  lang: string
  total: number
}

export default function SearchSummary({ lang, total }: SearchSummaryProps) {
  return (
    <div className="mb-8 border-y border-subtle py-3 text-sm text-secondary">
      <span className="font-medium text-primary">{total}</span> {t(lang, 'resultsFound')}
    </div>
  )
}
