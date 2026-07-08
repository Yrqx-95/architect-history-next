'use client'

import { useState } from 'react'
import SafeImage from '@/components/SafeImage'

export default function BuildingCoverFrame({
  src,
  alt,
}: {
  src?: string | null
  alt: string
}) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(src) && !failed

  return (
    <div className="image-frame aspect-[4/3] rounded-md sm:aspect-[3/2]">
      {showImage && src ? (
        <SafeImage
          src={src}
          alt={alt}
          fill
          className="image-zoom object-cover opacity-100 brightness-100 contrast-100 saturate-100"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="img-placeholder h-full px-6 text-center text-sm text-muted">{alt}</div>
      )}
    </div>
  )
}
