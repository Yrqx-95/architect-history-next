'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { t } from '@/lib/i18n'
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
  const learnLabel = t(lang, 'learn')
  const archiveToolsLabel = lang === 'en' ? 'Archive tools' : lang === 'ja' ? '資料ツール' : '资料工具'
  const languageLabel = lang === 'en' ? 'Language' : lang === 'ja' ? '言語' : '语言'
  const settingsLabel = lang === 'en' ? 'Settings' : lang === 'ja' ? '設定' : '设置'
  const scriptLabel = lang === 'zh' ? '中文显示' : ''
  const primaryLinks = [
    { href: '/browse', label: learnLabel },
    { href: '/browse/buildings', label: t(lang, 'buildings') },
    { href: '/timeline', label: t(lang, 'timeline') },
    { href: '/search', label: t(lang, 'search') },
  ]
  const learnLinks = [
    { href: '/graduation', label: t(lang, 'graduation') },
    { href: '/code', label: t(lang, 'code') },
    { href: '/glossary', label: t(lang, 'glossary') },
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
        className="min-h-10 min-w-10 rounded-lg p-2 text-primary transition-colors hover:bg-surface-muted xl:hidden"
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
          className="fixed inset-0 z-[80] h-dvh w-screen overflow-hidden bg-black/35 backdrop-blur-[2px] xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <button
            type="button"
            className="absolute inset-0 h-full w-full cursor-default"
            aria-label="Close menu backdrop"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute inset-x-0 bottom-0 flex max-h-[calc(100dvh-0.75rem)] flex-col overflow-hidden rounded-t-xl border border-subtle bg-surface shadow-modal"
          >
            <div className="flex min-h-14 items-center justify-between border-b border-subtle px-4">
              <div>
                <p className="text-base font-semibold text-primary">Archistory</p>
                <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted">
                  {lang === 'en' ? 'Architecture archive' : lang === 'ja' ? '建築資料館メニュー' : '建筑资料馆菜单'}
                </p>
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

            <div className="flex-1 overflow-y-auto px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4">
              <section className="border-b border-subtle pb-4">
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

              <section className="border-b border-subtle py-4">
                <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">Archistory</p>
                <div className="space-y-1">
                  {primaryLinks.map(item => (
                    <Link
                      key={item.href}
                      href={prefix + item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center justify-between border-b border-subtle px-1 text-sm font-medium text-primary transition-colors last:border-b-0 hover:text-accent"
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-soft">→</span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="border-b border-subtle py-4">
                <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{archiveToolsLabel}</p>
                <div className="space-y-1">
                  {learnLinks.map(item => (
                    <Link
                      key={`${item.href}-${item.label}`}
                      href={prefix + item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center justify-between border-b border-subtle px-1 text-sm font-medium text-secondary transition-colors last:border-b-0 hover:text-primary"
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-soft">→</span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="pt-4">
                <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{settingsLabel}</p>
                <div className="space-y-4 rounded-md border border-subtle bg-surface-raised p-3 shadow-semantic-card">
                  <div>
                    <p className="mb-2 text-xs font-medium text-secondary">{languageLabel}</p>
                    <div className="grid grid-cols-3 gap-2">
                      {LANGS.map(l => (
                        <Link
                          key={l}
                          href={localizedPath(l)}
                          onClick={() => setOpen(false)}
                          className={`flex min-h-11 items-center justify-center rounded-md border px-2 text-sm transition-colors ${lang === l ? 'border-default bg-[color:var(--ui-text-primary)] text-inverse' : 'border-subtle bg-surface-raised text-secondary hover:bg-surface-muted hover:text-primary'}`}
                        >
                          {LANGUAGE_LABELS[l]}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {lang === 'zh' && (
                    <div>
                      <p className="mb-2 text-xs font-medium text-secondary">{scriptLabel}</p>
                      <ChineseScriptToggle lang={lang} compact />
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
