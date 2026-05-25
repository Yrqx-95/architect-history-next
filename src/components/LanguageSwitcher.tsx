'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LANGS = ['zh', 'en', 'ja'] as const

function localizedPath(pathname: string, nextLang: string) {
  const parts = pathname.split('/')
  if (LANGS.includes(parts[1] as (typeof LANGS)[number])) {
    parts[1] = nextLang
    return parts.join('/') || `/${nextLang}`
  }
  return `/${nextLang}`
}

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname()

  return (
    <div className="hidden sm:flex gap-1.5 sm:gap-2">
      {LANGS.map(l => (
        <Link key={l} href={localizedPath(pathname, l)}
          className={`text-xs px-1.5 sm:px-2 py-1 rounded transition-colors ${lang === l ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900' : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'}`}>
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
