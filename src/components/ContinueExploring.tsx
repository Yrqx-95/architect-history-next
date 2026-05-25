import Link from 'next/link'

interface ExploreGroup {
  label: string
  href?: string
  items: {
    id: string
    href: string
    title: string
    subtitle?: string
    image?: string
  }[]
}

export default function ContinueExploring({ groups }: { groups: ExploreGroup[] }) {
  const visible = groups.filter(g => g.items.length > 0)
  if (!visible.length) return null

  return (
    <section className="border-t border-warm-200 dark:border-charcoal-700 pt-12 sm:pt-16 pb-8">
      <p className="eyebrow mb-8">Continue Exploring</p>

      <div className="space-y-10 sm:space-y-12">
        {visible.map(group => (
          <div key={group.label}>
            <div className="flex items-end justify-between mb-4">
              <h3 className="heading-4">{group.label}</h3>
              {group.href && (
                <Link href={group.href} className="text-xs text-warm-600 transition-colors hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100">
                  View all &rarr;
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {group.items.slice(0, 4).map(item => (
                <Link key={item.id} href={item.href}
                  className="card-hover group block p-4 bg-paper-100 dark:bg-charcoal-800 rounded-lg">
                  <span className="block text-sm font-medium text-warm-700 dark:text-warm-200 group-hover:text-warm-600 dark:group-hover:text-warm-300 transition-colors line-clamp-2">
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span className="block caption mt-1">{item.subtitle}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
