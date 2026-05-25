'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { t } from '@/lib/i18n'
import ThemeToggle from '@/components/ThemeToggle'
import ChineseScriptToggle from '@/components/ChineseScriptToggle'

const LANGS = ['zh', 'en', 'ja'] as const
const LANGUAGE_LABELS: Record<(typeof LANGS)[number], string> = {
  zh: '中文',
  en: 'EN',
  ja: '日本語',
}

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
        className="min-h-10 min-w-10 rounded-lg p-2 text-primary transition-colors hover:bg-surface-muted sm:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        aria-expanded={open}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open
            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          }
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 top-14 z-40 sm:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/35 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-[calc(100dvh-3.5rem)] w-full max-w-[24rem] overflow-y-auto border-l border-subtle bg-surface shadow-elevated">
            <div className="flex items-center justify-between border-b border-subtle px-4 py-3">
              <p className="text-sm font-medium text-primary">{t(lang, 'siteName')}</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="min-h-10 min-w-10 rounded-lg p-2 text-primary transition-colors hover:bg-surface-muted"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6 px-4 py-5">
              <section className="space-y-2">
                <p className="metadata">{t(lang, 'search')}</p>
                <form action={prefix + '/search'} onSubmit={() => setOpen(false)}>
                  <label className="relative block">
                    <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      name="q"
                      placeholder={t(lang, 'searchPlaceholder')}
                      className="min-h-11 w-full rounded-full border border-default bg-surface-raised py-2 pl-10 pr-3 text-sm text-primary placeholder:text-muted focus:border-default focus:outline-none focus:ring-2 focus:ring-[color:var(--ui-focus)]"
                    />
                  </label>
                </form>
              </section>

              <section className="space-y-2">
                <p className="metadata">{t(lang, 'browse')}</p>
                <div className="grid gap-1">
                  <Link href={prefix + '/'} onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-primary hover:bg-surface-muted">{t(lang, 'home')}</Link>
                  <Link href={prefix + '/browse'} onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-lg px-3 text-sm text-secondary hover:bg-surface-muted hover:text-primary">{t(lang, 'browse')}</Link>
                  <Link href={prefix + '/timeline'} onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-lg px-3 text-sm text-secondary hover:bg-surface-muted hover:text-primary">{t(lang, 'timeline')}</Link>
                </div>
              </section>

              <section className="space-y-2">
                <p className="metadata">Language</p>
                <div className="grid grid-cols-3 gap-2">
                  {LANGS.map(l => (
                    <Link key={l} href={localizedPath(l)} onClick={() => setOpen(false)}
                      className={`flex min-h-11 items-center justify-center rounded-lg border px-2 text-xs transition-colors ${lang === l ? 'border-default bg-[color:var(--ui-text-primary)] text-inverse' : 'border-subtle text-secondary hover:bg-surface-muted hover:text-primary'}`}>
                      {LANGUAGE_LABELS[l]}
                    </Link>
                  ))}
                </div>
              </section>

              {lang === 'zh' && (
                <section className="space-y-2">
                  <p className="metadata">中文显示</p>
                  <ChineseScriptToggle lang={lang} compact />
                </section>
              )}

              <section className="space-y-2">
                <p className="metadata">{lang === 'en' ? 'Theme' : lang === 'ja' ? 'テーマ' : '主题'}</p>
                <ThemeToggle
                  compact
                  labels={{
                    system: lang === 'en' ? 'System' : lang === 'ja' ? '自動' : '系统',
                    dark: t(lang, 'dark'),
                    light: t(lang, 'light'),
                  }}
                />
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
