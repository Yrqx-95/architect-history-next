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
      ? 'bg-[color:var(--ui-text-primary)] text-inverse'
      : 'bg-surface-muted text-secondary hover:bg-surface hover:text-primary'
    } ${className}`

  if (href) {
    return <Link href={href} className={base}>{children}</Link>
  }
  return <span className={base}>{children}</span>
}
