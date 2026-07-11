import Link from 'next/link'
import { t } from '@/lib/i18n'

interface SearchNextStepsProps {
  lang: string
  prefix: string
  architectCount: number
  buildingCount: number
}

export default function SearchNextSteps({ lang, prefix, architectCount, buildingCount }: SearchNextStepsProps) {
  const items = [
    buildingCount > 0 && {
      href: '#search-buildings',
      label: lang === 'en' ? 'Read building results' : lang === 'ja' ? '建築の結果を見る' : '看建筑结果',
      meta: `${buildingCount} ${t(lang, 'buildings')}`,
    },
    architectCount > 0 && {
      href: '#search-architects',
      label: lang === 'en' ? 'Read architect results' : lang === 'ja' ? '建築家の結果を見る' : '看建筑师结果',
      meta: `${architectCount} ${t(lang, 'architects')}`,
    },
    {
      href: `${prefix}/browse`,
      label: lang === 'en' ? 'Open the archive index' : lang === 'ja' ? 'アーカイブ索引を開く' : '打开档案索引',
      meta: lang === 'en' ? 'Browse instead of searching' : lang === 'ja' ? '検索ではなく入口から探す' : '不搜索，按入口浏览',
    },
  ].filter(Boolean) as Array<{ href: string; label: string; meta: string }>

  return (
    <nav className="mb-8 border-y border-subtle py-4" aria-label={lang === 'en' ? 'Search next steps' : lang === 'ja' ? '検索後の次のステップ' : '搜索后的下一步'}>
      <p className="eyebrow mb-3">{lang === 'en' ? 'Next step' : lang === 'ja' ? '次に見る' : '下一步'}</p>
      <div className="grid gap-0 sm:grid-cols-3 sm:divide-x sm:divide-[color:var(--ui-border-subtle)]">
        {items.map(item => (
          <Link key={item.href} href={item.href} className="interactive-row group flex min-h-16 items-center justify-between gap-4 border-t border-subtle px-2 py-3 first:border-t-0 sm:border-t-0">
            <span>
              <span className="block text-sm font-medium text-primary transition-colors group-hover:text-accent">{item.label}</span>
              <span className="caption mt-1 block">{item.meta}</span>
            </span>
            <span className="text-sm text-soft transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
