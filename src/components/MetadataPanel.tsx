interface MetaRow {
  label: string
  value: React.ReactNode
}

/** Quiet metadata panel with real theme surface and readable hierarchy. */
export default function MetadataPanel({ rows }: { rows: MetaRow[] }) {
  if (!rows.length) return null
  return (
    <div className="divide-y divide-[color:var(--ui-border-subtle)] rounded-md border border-subtle bg-surface shadow-semantic-card">
      {rows.map((row, i) => (
        <div key={i} className="flex flex-col px-3.5 py-2.5">
          <span className="label mb-1">{row.label}</span>
          <span className="break-words text-sm leading-relaxed text-secondary">{row.value}</span>
        </div>
      ))}
    </div>
  )
}
