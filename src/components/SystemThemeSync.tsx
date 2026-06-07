'use client'

import { useEffect } from 'react'

export default function SystemThemeSync() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const applySystemTheme = () => {
      document.documentElement.classList.toggle('dark', media.matches)
    }

    applySystemTheme()
    media.addEventListener('change', applySystemTheme)
    return () => media.removeEventListener('change', applySystemTheme)
  }, [])

  return null
}
