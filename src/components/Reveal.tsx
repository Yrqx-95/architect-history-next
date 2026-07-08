'use client'

import { motion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
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
