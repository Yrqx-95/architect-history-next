import { Suspense } from 'react'
import Link from 'next/link'
import { t } from '@/lib/i18n'
import SearchResults from '@/components/SearchResults'

export default async function SearchPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const prefix = `/${lang}`
  const archivePaths = [
    {
      href: `${prefix}/browse/buildings`,
      label: lang === 'en' ? 'Works' : lang === 'ja' ? '作品' : '建筑作品',
      hint: lang === 'en' ? 'Start from specific buildings.' : lang === 'ja' ? '具体的な作品から探す。' : '从具体建筑开始。',
    },
    {
      href: `${prefix}/browse/architects`,
      label: t(lang, 'architects'),
      hint: lang === 'en' ? 'Follow people and lineages.' : lang === 'ja' ? '人物と系譜から探す。' : '按人物和谱系浏览。',
    },
    {
      href: `${prefix}/browse/style`,
      label: lang === 'en' ? 'Periods / Styles' : lang === 'ja' ? '時代 / 様式' : '时代 / 风格',
      hint: lang === 'en' ? 'Narrow by time and language.' : lang === 'ja' ? '時代と形式で絞る。' : '按年代和形式收窄。',
    },
    {
      href: `${prefix}/browse/country`,
      label: t(lang, 'countries'),
      hint: lang === 'en' ? 'Enter by country or region.' : lang === 'ja' ? '国・地域から探す。' : '按国家和地区进入。',
    },
  ]

  return (
    <div className="container-content page-enter pb-8 sm:pb-12">
      <header className="section-sm">
        <p className="eyebrow mb-3">{t(lang, 'siteName')}</p>
        <h1 className="heading-display mb-4">{t(lang, 'search')}</h1>
        <p className="body-large max-w-2xl">{t(lang, 'searchIntro')}</p>
      </header>

      {/* Search input */}
      <Suspense fallback={<div className="skeleton h-12 w-full mb-8" />}>
        <SearchResults lang={lang} />
      </Suspense>

      {/* Discovery entry points — shown before search */}
      <div id="search-discover" className="mt-6 border-t border-subtle pt-10 sm:pt-12">
        <p className="eyebrow mb-6">
          {lang === 'en' ? 'Or enter the archive' : lang === 'ja' ? 'またはアーカイブへ' : '或进入档案'}
        </p>

        <div className="grid border-y border-subtle sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-[color:var(--ui-border-subtle)]">
          {archivePaths.map(item => (
            <Link key={item.href} href={item.href} className="interactive-row group block min-h-24 border-t border-subtle px-2 py-4 first:border-t-0 sm:px-3 lg:border-t-0">
              <span className="text-base font-medium text-primary transition-colors group-hover:text-accent">{item.label}</span>
              <span className="mt-2 block text-xs leading-relaxed text-secondary">{item.hint}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
