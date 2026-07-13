'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function labelFor(lang: string) {
  if (lang === 'en') return 'Report this page'
  if (lang === 'ja') return 'このページを報告'
  return '反馈当前页面'
}

export default function ContextualFeedbackLink({ lang, className }: { lang: string; className?: string }) {
  const pathname = usePathname()
  const href = `/${lang}/feedback?from=${encodeURIComponent(pathname)}`

  return <Link href={href} className={className}>{labelFor(lang)}</Link>
}
