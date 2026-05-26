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
    <section className="relative -mx-3 sm:-mx-4 -mt-4 sm:-mt-8 mb-12 sm:mb-16">
      <div className="relative h-[66vh] min-h-[500px] max-h-[760px] overflow-hidden bg-warm-900 dark:bg-charcoal-950 sm:h-[74vh] sm:min-h-[620px] sm:max-h-[820px]">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center opacity-100 brightness-100 contrast-100 saturate-100"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(115deg,#17130f_0%,#3f3328_48%,#9a8772_100%)] dark:bg-[linear-gradient(115deg,#080807_0%,#1e1d1a_52%,#4a4035_100%)]" />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_24%,rgba(255,255,255,0.14),transparent_28%),linear-gradient(to_bottom,rgba(23,19,15,0.04),rgba(23,19,15,0)_42%,rgba(23,19,15,0.56))] dark:bg-[radial-gradient(circle_at_74%_24%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(to_bottom,rgba(8,8,7,0.02),rgba(8,8,7,0)_42%,rgba(8,8,7,0.58))]" />
        <div className="absolute inset-0 bg-gradient-to-r from-warm-950/46 via-warm-950/10 to-transparent dark:from-charcoal-950/40 dark:via-charcoal-950/8 dark:to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-paper-100/50 dark:bg-charcoal-700/70" />
        <div className="absolute inset-4 border border-paper-100/12 dark:border-paper-100/8 sm:left-8 sm:right-8 sm:top-8 sm:bottom-8" />

        <motion.div
          className="absolute inset-0 flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="w-full max-w-7xl mx-auto px-8 pb-14 sm:px-8 sm:pb-20 lg:px-12">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
