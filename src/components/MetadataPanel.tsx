interface MetaRow {
  label: string
  value: React.ReactNode
}

/** Quiet metadata panel — no borders, minimal visual weight. */
export default function MetadataPanel({ rows }: { rows: MetaRow[] }) {
  if (!rows.length) return null
  return (
    <div className="bg-paper-100/50 dark:bg-charcoal-800/50 rounded-lg divide-y divide-warm-200/50 dark:divide-charcoal-700/50">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col px-3.5 py-2">
          <span className="mb-0.5 text-[0.7rem] uppercase tracking-widest text-warm-600 dark:text-warm-300 sm:text-[0.65rem]">{row.label}</span>
          <span className="text-sm text-warm-700 dark:text-warm-200 break-words">{row.value}</span>
        </div>
      ))}
    </div>
  )
}
