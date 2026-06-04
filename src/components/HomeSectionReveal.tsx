'use client'

import { motion, useReducedMotion } from 'framer-motion'

type HomeSectionRevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  scale?: boolean
}

export default function HomeSectionReveal({ children, className, delay = 0, scale = false }: HomeSectionRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: scale ? 0.98 : 1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{
        duration: 0.42,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
