interface MetaRow {
  label: string
  value: React.ReactNode
}

export default function MetadataPanel({ rows }: { rows: MetaRow[] }) {
  if (!rows.length) return null
  return (
    <dl className="divide-y divide-[color:var(--ui-border-subtle)] border-y border-subtle">
      {rows.map((row, i) => (
        <div key={i} className="grid gap-1 py-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
          <dt className="label">{row.label}</dt>
          <dd className="break-words text-sm leading-relaxed text-secondary">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}
