'use client'

import { useState } from 'react'
import Image from 'next/image'

interface CinematicHeroProps {
  imageUrl: string | null
  imageAlt?: string
  children: React.ReactNode
}

export default function CinematicHero({ imageUrl, imageAlt = '', children }: CinematicHeroProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const hasImage = imageUrl && !imageFailed

  return (
    <section className="relative mb-8 sm:mb-16">
      <div className="relative h-[56svh] min-h-[24rem] max-h-[30rem] overflow-hidden bg-warm-900 dark:bg-charcoal-950 sm:h-[74vh] sm:min-h-[620px] sm:max-h-[820px]">
        {hasImage ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-100 brightness-100 contrast-100 saturate-100"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#17130f_0%,#3f3328_48%,#9a8772_100%)] dark:bg-[linear-gradient(115deg,#080807_0%,#1e1d1a_52%,#4a4035_100%)]" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_24%,rgba(255,255,255,0.1),transparent_28%),linear-gradient(to_bottom,rgba(23,19,15,0.08),rgba(23,19,15,0.12)_38%,rgba(23,19,15,0.72))] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(to_bottom,rgba(8,8,7,0.04),rgba(8,8,7,0.12)_38%,rgba(8,8,7,0.72))]" />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-950/62 via-warm-950/24 to-warm-950/4 dark:from-charcoal-950/56 dark:via-charcoal-950/22 dark:to-charcoal-950/4" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-paper-100/50 dark:bg-charcoal-700/70" />
        <div className="absolute inset-4 border border-paper-100/12 dark:border-paper-100/8 sm:left-8 sm:right-8 sm:top-8 sm:bottom-8" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-7xl mx-auto px-4 pb-8 sm:px-8 sm:pb-20 lg:px-12">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
