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
        className="rounded-lg p-1.5 transition-colors hover:bg-surface-muted sm:hidden"
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
          <div className="relative border-t border-subtle bg-surface shadow-elevated">
            <div className="px-4 py-3 space-y-1">
              <Link href={prefix + '/'} onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-primary hover:bg-surface-muted">{t(lang, 'home')}</Link>
              <Link href={prefix + '/browse'} onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-secondary hover:bg-surface-muted hover:text-primary">{t(lang, 'browse')}</Link>
              <Link href={prefix + '/timeline'} onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-secondary hover:bg-surface-muted hover:text-primary">{t(lang, 'timeline')}</Link>

              <hr className="my-2 border-subtle" />

              <form action={prefix + '/search'} className="px-3" onSubmit={() => setOpen(false)}>
                <input type="text" name="q" placeholder={t(lang, 'searchPlaceholder')}
                  className="w-full rounded-full border border-default bg-surface-raised py-2 pl-8 pr-3 text-sm text-primary placeholder:text-muted focus:border-default focus:outline-none focus:ring-2 focus:ring-[color:var(--ui-focus)]" />
              </form>

              <div className="flex gap-1 px-3 pt-2">
                {LANGS.map(l => (
                  <Link key={l} href={localizedPath(l)} onClick={() => setOpen(false)}
                    className={`rounded px-2.5 py-1.5 text-xs transition-colors ${lang === l ? 'bg-[color:var(--ui-text-primary)] text-inverse' : 'text-muted hover:bg-surface-muted hover:text-primary'}`}>
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
