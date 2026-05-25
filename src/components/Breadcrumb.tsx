import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 metadata">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-soft">/</span>}
          {item.href
            ? <Link href={item.href} className="transition-colors hover:text-accent">{item.label}</Link>
            : <span className="text-primary">{item.label}</span>
          }
        </span>
      ))}
    </nav>
  )
}
