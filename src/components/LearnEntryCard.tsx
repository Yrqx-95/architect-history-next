import Link from 'next/link'

type LearnEntryCardProps = {
  href?: string
  eyebrow: string
  title: string
  description: string
  meta?: string
  comingSoonLabel?: string
  className?: string
}

export default function LearnEntryCard({ href, eyebrow, title, description, meta, comingSoonLabel, className = '' }: LearnEntryCardProps) {
  const content = (
    <>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h3 className={`mt-5 text-2xl font-medium leading-tight text-primary transition-colors ${href ? 'group-hover:text-accent' : ''}`}>
          {title}
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary">{description}</p>
      </div>
      <div className="mt-8 flex items-center justify-between gap-4 text-xs text-muted">
        <span>{comingSoonLabel || meta}</span>
        {href && <span className="text-primary transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>}
      </div>
    </>
  )

  const baseClass = `flex min-h-[13rem] flex-col justify-between border-t border-subtle bg-transparent py-5 transition ${className}`

  if (!href) {
    return (
      <div className={`${baseClass} opacity-70`} aria-disabled="true">
        {content}
      </div>
    )
  }

  return (
    <Link
      href={href}
      className={`group ${baseClass} hover:border-default`}
    >
      {content}
    </Link>
  )
}
