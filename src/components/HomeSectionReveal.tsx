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
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: scale ? 0.98 : 1, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-96px' }}
      transition={{
        duration: 0.82,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-motion-scope="reveal"
      className={className}
    >
      {children}
    </motion.div>
  )
}
