import Link from 'next/link'

type LearnEntryCardProps = {
  href: string
  eyebrow: string
  title: string
  description: string
  meta?: string
}

export default function LearnEntryCard({ href, eyebrow, title, description, meta }: LearnEntryCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-[13rem] flex-col justify-between border-t border-subtle bg-transparent py-5 transition-colors hover:border-default"
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="mt-5 text-2xl font-medium leading-tight text-primary transition-colors group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary">{description}</p>
      </div>
      <div className="mt-8 flex items-center justify-between gap-4 text-xs text-muted">
        <span>{meta}</span>
        <span className="text-primary transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
      </div>
    </Link>
  )
}
