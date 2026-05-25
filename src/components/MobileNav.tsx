'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { t } from '@/lib/i18n'

const LANGS = ['zh', 'en', 'ja'] as const

export default function MobileNav({ lang }: { lang: string }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const prefix = `/${lang}`
  const localizedPath = (nextLang: string) => {
    const parts = pathname.split('/')
    if (LANGS.includes(parts[1] as (typeof LANGS)[number])) {
      parts[1] = nextLang
      return parts.join('/') || `/${nextLang}`
    }
    return `/${nextLang}`
  }

  return (
    <>
      <button
        className="sm:hidden p-1.5 rounded-lg hover:bg-warm-100 dark:hover:bg-charcoal-800 transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          }
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 top-14 z-40 sm:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative bg-paper-100 dark:bg-charcoal-900 border-t border-warm-200 dark:border-charcoal-700 shadow-elevated">
            <div className="px-4 py-3 space-y-1">
              <Link href={prefix + '/'} onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-warm-100 dark:hover:bg-charcoal-800">{t(lang, 'home')}</Link>
              <Link href={prefix + '/browse'} onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm hover:bg-warm-100 dark:hover:bg-charcoal-800">{t(lang, 'browse')}</Link>
              <Link href={prefix + '/timeline'} onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-sm hover:bg-warm-100 dark:hover:bg-charcoal-800">{t(lang, 'timeline')}</Link>

              <hr className="my-2 border-warm-200 dark:border-charcoal-700" />

              <form action={prefix + '/search'} className="px-3" onSubmit={() => setOpen(false)}>
                <input type="text" name="q" placeholder={t(lang, 'searchPlaceholder')}
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-full border border-warm-300 dark:border-charcoal-700 bg-warm-50 dark:bg-charcoal-800 focus:outline-none focus:border-warm-500" />
              </form>

              <div className="flex gap-1 px-3 pt-2">
                {LANGS.map(l => (
                  <Link key={l} href={localizedPath(l)} onClick={() => setOpen(false)}
                    className={`rounded px-2.5 py-1.5 text-xs transition-colors ${lang === l ? 'bg-warm-800 text-paper-100 dark:bg-paper-100 dark:text-warm-900' : 'text-warm-700 hover:bg-warm-100 dark:text-warm-300 dark:hover:bg-charcoal-800'}`}>
                    {l === 'zh' ? '中文' : l === 'en' ? 'EN' : '日本語'}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
