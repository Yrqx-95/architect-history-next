'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface CinematicHeroProps {
  imageUrl: string | null
  imageAlt?: string
  children: React.ReactNode
}

export default function CinematicHero({ imageUrl, imageAlt = '', children }: CinematicHeroProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const hasImage = imageUrl && !imageFailed

  return (
    <section className="relative -mx-3 sm:-mx-4 -mt-4 sm:-mt-8 mb-8 sm:mb-12">
      <div className="relative h-[68vh] min-h-[540px] sm:h-[74vh] sm:min-h-[620px] max-h-[820px] overflow-hidden bg-warm-900 dark:bg-charcoal-950">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#17130f_0%,#3f3328_48%,#9a8772_100%)] dark:bg-[linear-gradient(115deg,#080807_0%,#1e1d1a_52%,#4a4035_100%)]" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_24%,rgba(255,255,255,0.16),transparent_28%),linear-gradient(to_bottom,rgba(23,19,15,0.14),rgba(23,19,15,0.04)_42%,rgba(23,19,15,0.62))] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(255,255,255,0.1),transparent_28%),linear-gradient(to_bottom,rgba(8,8,7,0.28),rgba(8,8,7,0.12)_42%,rgba(8,8,7,0.82))]" />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-950/58 via-warm-950/18 to-transparent dark:from-charcoal-950/70 dark:via-charcoal-950/24 dark:to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-paper-100/50 dark:bg-charcoal-700/70" />
        <div className="absolute left-5 right-5 top-5 bottom-5 border border-paper-100/12 dark:border-paper-100/8 sm:left-8 sm:right-8 sm:top-8 sm:bottom-8" />

        <motion.div
          className="absolute inset-0 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="w-full max-w-7xl mx-auto px-5 pb-20 sm:px-8 sm:pb-20 lg:px-12">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
