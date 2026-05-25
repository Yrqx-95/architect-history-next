'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (reduced || touch) return

    const lenis = new Lenis({
      duration: 0.4,
      smoothWheel: true,
    })

    let cancelled = false

    function raf(time: number) {
      if (cancelled) return
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      cancelled = true
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
