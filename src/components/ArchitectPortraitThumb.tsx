'use client'

import { useState } from 'react'
import SafeImage from '@/components/SafeImage'

export default function ArchitectPortraitThumb({
  src,
  fallbackSrc,
  alt,
  fallback,
  className = '',
  sizes = '6rem',
  priority = false,
}: {
  src?: string | null
  fallbackSrc?: string | null
  alt: string
  fallback: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  const [failedPrimary, setFailedPrimary] = useState(false)
  const [failedFallback, setFailedFallback] = useState(false)
  const imageSrc = src && !failedPrimary ? src : fallbackSrc && !failedFallback ? fallbackSrc : null

  return (
    <div className={`image-frame ${className}`}>
      {imageSrc ? (
        <SafeImage
          src={imageSrc}
          alt={alt}
          fill
          priority={priority}
          className="image-zoom object-cover grayscale-[18%]"
          sizes={sizes}
          onError={() => {
            if (imageSrc === src) setFailedPrimary(true)
            else setFailedFallback(true)
          }}
        />
      ) : (
        <div className="img-placeholder h-full px-3 text-center text-[0.68rem] leading-tight text-muted">
          {fallback}
        </div>
      )}
    </div>
  )
}
