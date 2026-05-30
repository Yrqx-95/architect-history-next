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

export default function ContinueExploring({ groups, lang = 'en' }: { groups: ExploreGroup[]; lang?: string }) {
  const visible = groups.filter(g => g.items.length > 0)
  if (!visible.length) return null
  const heading = lang === 'zh' ? '继续阅读' : lang === 'ja' ? 'さらに見る' : 'Continue Exploring'
  const viewAll = lang === 'zh' ? '查看全部' : lang === 'ja' ? 'すべて見る' : 'View all'

  return (
    <section className="border-t border-subtle pb-8 pt-12 sm:pt-16">
      <p className="eyebrow mb-8">{heading}</p>

      <div className="space-y-10 sm:space-y-12">
        {visible.map(group => (
          <div key={group.label}>
            <div className="flex items-end justify-between mb-4">
              <h3 className="heading-4">{group.label}</h3>
              {group.href && (
                <Link href={group.href} className="text-xs text-muted transition-colors hover:text-accent">
                  {viewAll} &rarr;
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {group.items.slice(0, 4).map(item => (
                <Link key={item.id} href={item.href}
                  className="card-hover group block rounded-md border border-subtle bg-surface p-4">
                  <span className="line-clamp-2 block text-sm font-medium text-primary transition-colors group-hover:text-accent">
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
