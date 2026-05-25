'use client'

import { useState } from 'react'

export default function EditorialImage({
  src,
  alt,
  className = '',
  sizes = '100vw',
  label,
  loading,
}: {
  src?: string | null
  alt: string
  className?: string
  sizes?: string
  label?: string
  loading?: 'eager' | 'lazy'
}) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className={`img-placeholder ${className}`}>
        <span className="px-5 text-center text-sm text-warm-600 dark:text-warm-300">
          {label || alt}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={loading || 'lazy'}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  )
}
