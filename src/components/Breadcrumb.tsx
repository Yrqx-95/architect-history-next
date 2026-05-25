import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-2 metadata mb-6 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span>/</span>}
          {item.href
            ? <Link href={item.href} className="hover:text-warm-600 dark:hover:text-warm-300">{item.label}</Link>
            : <span className="text-warm-700 dark:text-warm-200">{item.label}</span>
          }
        </span>
      ))}
    </nav>
  )
}
