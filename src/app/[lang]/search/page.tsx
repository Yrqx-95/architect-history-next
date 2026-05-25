import { Suspense } from 'react'
import Link from 'next/link'
import { t } from '@/lib/i18n'
import { getEras, getStyles, getTypes } from '@/lib/data'
import { displayName } from '@/lib/types'
import SearchResults from '@/components/SearchResults'

export default async function SearchPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const prefix = `/${lang}`
  const [eras, styles, types] = await Promise.all([getEras(), getStyles(), getTypes()])

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
      <div id="search-discover" className="border-t border-warm-200 dark:border-charcoal-700 pt-10 sm:pt-12 mt-6">
        <p className="eyebrow mb-6">
          {lang === 'en' ? 'Or browse by category' : lang === 'ja' ? 'またはカテゴリで探す' : '或按分类浏览'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Eras */}
          <div>
            <h3 className="heading-4 mb-3">{t(lang, 'eras')}</h3>
            <div className="space-y-1">
              {eras.slice(0, 8).map(e => (
                <Link key={e.id} href={`${prefix}/browse/era/${e.slug}`}
                  className="block body-sm py-0.5 hover:text-warm-600 dark:hover:text-warm-300 transition-colors">
                  {displayName(e, lang)}
                </Link>
              ))}
            </div>
          </div>

          {/* Styles */}
          <div>
            <h3 className="heading-4 mb-3">{t(lang, 'styles')}</h3>
            <div className="space-y-1">
              {styles.slice(0, 8).map(s => (
                <Link key={s.id} href={`${prefix}/browse/style/${s.slug}`}
                  className="block body-sm py-0.5 hover:text-warm-600 dark:hover:text-warm-300 transition-colors">
                  {displayName(s, lang)}
                </Link>
              ))}
            </div>
          </div>

          {/* Types + Countries */}
          <div>
            <h3 className="heading-4 mb-3">{t(lang, 'types')}</h3>
            <div className="space-y-1 mb-4">
              {types.slice(0, 6).map(ty => (
                <Link key={ty.id} href={`${prefix}/browse/type/${ty.slug}`}
                  className="block body-sm py-0.5 hover:text-warm-600 dark:hover:text-warm-300 transition-colors">
                  {displayName(ty, lang)}
                </Link>
              ))}
            </div>
            <h3 className="heading-4 mb-3 mt-5">{t(lang, 'countries')}</h3>
            <Link href={`${prefix}/browse/country`}
              className="body-sm hover:text-warm-600 dark:hover:text-warm-300 transition-colors">
              {t(lang, 'viewAll')} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
