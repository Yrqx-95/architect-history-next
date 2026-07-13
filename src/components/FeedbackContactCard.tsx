'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { buildFeedbackMailto, sanitizeFeedbackPath } from '@/lib/feedback'

export default function FeedbackContactCard({
  lang,
  email,
  subject,
  body,
  emailLabel,
  deliveryNote,
  contextLabel,
  notes,
}: {
  lang: string
  email: string
  subject: string
  body: string
  emailLabel: string
  deliveryNote: string
  contextLabel: string
  notes: string[]
}) {
  const searchParams = useSearchParams()
  const pagePath = sanitizeFeedbackPath(searchParams.get('from'), lang)
  const href = buildFeedbackMailto({ email, subject, body, pagePath })

  return (
    <div className="rounded-md border border-subtle bg-surface p-5 shadow-subtle">
      <p className="label">{emailLabel}</p>
      {pagePath && (
        <div className="mt-4 border-y border-subtle py-3">
          <p className="text-xs text-muted">{contextLabel}</p>
          <Link href={pagePath} className="mt-1 block break-all text-sm text-secondary underline decoration-subtle underline-offset-4 hover:text-primary">
            {pagePath}
          </Link>
        </div>
      )}
      <a href={href} className="mt-4 inline-flex rounded-full bg-[color:var(--ui-text-primary)] px-5 py-3 text-sm font-medium text-inverse transition-opacity hover:opacity-85">
        {email}
      </a>
      <p className="mt-4 text-xs leading-relaxed text-muted">{deliveryNote}</p>
      <div className="mt-6 grid gap-2">
        {notes.map(note => (
          <p key={note} className="border-t border-subtle py-2.5 text-sm text-secondary">{note}</p>
        ))}
      </div>
    </div>
  )
}
