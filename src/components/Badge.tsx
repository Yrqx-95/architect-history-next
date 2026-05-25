import Link from 'next/link'

interface BadgeProps {
  children: React.ReactNode
  href?: string
  active?: boolean
  className?: string
}

/** Subtle badge — borderless, understated. */
export default function Badge({ children, href, active, className = '' }: BadgeProps) {
  const base = `inline-block px-3 py-1 text-xs rounded-full transition-colors
    ${active
      ? 'bg-warm-800 dark:bg-paper-100 text-paper-100 dark:text-warm-900'
      : 'bg-warm-100/70 text-warm-700 hover:bg-warm-200 dark:bg-charcoal-800/70 dark:text-warm-300 dark:hover:bg-charcoal-700'
    } ${className}`

  if (href) {
    return <Link href={href} className={base}>{children}</Link>
  }
  return <span className={base}>{children}</span>
}
