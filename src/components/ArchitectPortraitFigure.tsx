'use client'

import { useState } from 'react'
import SafeImage from '@/components/SafeImage'
import ImageAttribution from '@/components/ImageAttribution'

type Portrait = {
  url: string
  author: string
  license: string
  source_url: string
  alt: string
}

const FALLBACK_COPY = {
  zh: '暂无肖像',
  en: 'Portrait unavailable',
  ja: '肖像画像はありません',
}

export default function ArchitectPortraitFigure({
  portrait,
  lang,
  className = '',
  priority = false,
}: {
  portrait: Portrait | null
  lang: string
  className?: string
  priority?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const fallbackLabel = FALLBACK_COPY[lang as keyof typeof FALLBACK_COPY] || FALLBACK_COPY.en
  const hasImage = Boolean(portrait) && !failed

  return (
    <figure className={`overflow-hidden rounded-sm ${className}`}>
      <div
        className={
          hasImage
            ? 'relative aspect-[3/4] bg-surface-muted'
            : 'flex min-h-36 items-center justify-center border border-subtle bg-surface-muted px-6 py-10 sm:min-h-44'
        }
      >
        {!hasImage ? (
          <div className="text-center">
            <svg className="mx-auto h-8 w-8 text-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M4 19h16M7 16V8l5-3 5 3v8M10 16v-5h4v5" />
            </svg>
            <p className="mt-3 text-sm text-muted">{fallbackLabel}</p>
          </div>
        ) : portrait ? (
          <SafeImage
            src={portrait.url}
            alt={portrait.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 36rem"
            priority={priority}
            onError={() => setFailed(true)}
          />
        ) : null}
      </div>
      {hasImage && portrait && (
        <figcaption className="mt-2.5 flex items-start justify-between gap-3">
          <p className="max-w-[70%] text-xs leading-relaxed text-muted">{portrait.alt}</p>
          <ImageAttribution
            photographer={portrait.author}
            license={portrait.license}
            sourceUrl={portrait.source_url}
            tone="dark"
            lang={lang}
          />
        </figcaption>
      )}
    </figure>
  )
}
