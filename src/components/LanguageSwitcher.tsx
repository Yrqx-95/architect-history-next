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
          className={`rounded px-1.5 py-1 text-xs transition-colors sm:px-2 ${lang === l ? 'bg-[color:var(--ui-text-primary)] text-inverse' : 'text-muted hover:text-primary'}`}>
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}
