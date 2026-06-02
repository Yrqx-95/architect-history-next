'use client'

import { useEffect, useState } from 'react'
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
  const title = lang === 'en' ? 'Menu' : lang === 'ja' ? 'メニュー' : '菜单'
  const searchLabel = lang === 'en' ? 'Search' : lang === 'ja' ? '検索' : '搜索'
  const navLabel = lang === 'en' ? 'Navigate' : lang === 'ja' ? 'ナビゲーション' : '导航'
  const languageLabel = lang === 'en' ? 'Language' : lang === 'ja' ? '言語' : '语言'
  const displayLabel = lang === 'en' ? 'Reading settings' : lang === 'ja' ? '表示設定' : '阅读设置'
  const scriptLabel = lang === 'zh' ? '中文显示' : ''
  const mainLinks = [
    { href: '/', label: t(lang, 'home') },
    { href: '/browse', label: t(lang, 'browse') },
    { href: '/paths', label: t(lang, 'paths') },
    { href: '/graph', label: t(lang, 'graph') },
    { href: '/map', label: t(lang, 'map') },
    { href: '/timeline', label: t(lang, 'timeline') },
  ]

  const localizedPath = (nextLang: string) => {
    const parts = pathname.split('/')
    if (LANGS.includes(parts[1] as (typeof LANGS)[number])) {
      parts[1] = nextLang
      return parts.join('/') || `/${nextLang}`
    }
    return `/${nextLang}`
  }

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <>
      <button
        className="min-h-10 min-w-10 rounded-lg p-2 text-primary transition-colors hover:bg-surface-muted sm:hidden"
        onClick={() => setOpen(true)}
        aria-label="Menu"
        aria-expanded={open}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed bottom-0 left-0 right-0 top-0 z-[80] h-dvh w-screen overflow-hidden sm:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          style={{ background: 'var(--ui-surface)' }}
        >
          <div className="flex h-full flex-col">
            <div className="flex min-h-16 items-center justify-between border-b border-subtle px-5">
              <div>
                <p className="text-base font-semibold text-primary">Archistory</p>
                <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted">{title}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-subtle bg-surface-raised text-primary shadow-semantic-card transition-colors hover:bg-surface-muted"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-5">
              <section className="border-b border-subtle pb-5">
                <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{searchLabel}</p>
                <form action={prefix + '/search'} onSubmit={() => setOpen(false)}>
                  <label className="relative block">
                    <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      name="q"
                      placeholder={t(lang, 'searchPlaceholder')}
                      className="min-h-12 w-full rounded-full border border-default bg-surface-raised py-2 pl-10 pr-3 text-base text-primary shadow-semantic-card placeholder:text-muted focus:border-default focus:outline-none focus:ring-2 focus:ring-[color:var(--ui-focus)]"
                    />
                  </label>
                </form>
              </section>

              <section className="border-b border-subtle py-5">
                <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{navLabel}</p>
                <div className="grid grid-cols-2 gap-2">
                  {mainLinks.map(item => (
                    <Link
                      key={item.href}
                      href={prefix + item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center justify-between rounded-md border border-subtle bg-surface-raised px-3 text-sm font-medium text-primary shadow-semantic-card transition-colors hover:bg-surface-muted"
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-soft">→</span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="border-b border-subtle py-5">
                <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{languageLabel}</p>
                <div className="grid grid-cols-3 gap-2">
                  {LANGS.map(l => (
                    <Link
                      key={l}
                      href={localizedPath(l)}
                      onClick={() => setOpen(false)}
                      className={`flex min-h-12 items-center justify-center rounded-md border px-2 text-sm transition-colors ${lang === l ? 'border-default bg-[color:var(--ui-text-primary)] text-inverse' : 'border-subtle bg-surface-raised text-secondary hover:bg-surface-muted hover:text-primary'}`}
                    >
                      {LANGUAGE_LABELS[l]}
                    </Link>
                  ))}
                </div>
              </section>

              <section className="pt-5">
                <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{displayLabel}</p>
                <div className="space-y-4 rounded-md border border-subtle bg-surface-raised p-3 shadow-semantic-card">
                  {lang === 'zh' && (
                    <div>
                      <p className="mb-2 text-xs font-medium text-secondary">{scriptLabel}</p>
                      <ChineseScriptToggle lang={lang} compact />
                    </div>
                  )}
                  <div>
                    <p className="mb-2 text-xs font-medium text-secondary">{lang === 'en' ? 'Theme' : lang === 'ja' ? 'テーマ' : '主题'}</p>
                    <ThemeToggle
                      compact
                      labels={{
                        system: lang === 'en' ? 'System' : lang === 'ja' ? '自動' : '系统',
                        dark: t(lang, 'dark'),
                        light: t(lang, 'light'),
                      }}
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
