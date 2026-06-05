'use client'

import { useEffect, useState } from 'react'

type ThemeChoice = 'system' | 'light' | 'dark'

function getStoredTheme(): ThemeChoice {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem('theme')
  return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system'
}

function applyTheme(theme: ThemeChoice) {
  const html = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  html.dataset.theme = theme
  html.classList.toggle('dark', theme === 'dark' || (theme === 'system' && prefersDark))
}

export default function ThemeToggle({ labels, compact = false }: { labels: { system: string; dark: string; light: string }; compact?: boolean }) {
  const [theme, setTheme] = useState<ThemeChoice>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const storedTheme = getStoredTheme()
    applyTheme(storedTheme)
    const readyTimer = window.setTimeout(() => {
      setTheme(storedTheme)
      setMounted(true)
    }, 0)

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (getStoredTheme() === 'system') applyTheme('system')
    }
    media.addEventListener('change', handleChange)
    return () => {
      window.clearTimeout(readyTimer)
      media.removeEventListener('change', handleChange)
    }
  }, [])

  const chooseTheme = (nextTheme: ThemeChoice) => {
    localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }

  const options: Array<{ value: ThemeChoice; label: string }> = [
    { value: 'system', label: labels.system },
    { value: 'light', label: labels.light },
    { value: 'dark', label: labels.dark },
  ]
  const renderedTheme = mounted ? theme : 'system'

  return (
    <div className={`inline-flex rounded-full border border-default bg-surface-muted p-0.5 text-xs text-muted shadow-semantic-card ${compact ? 'w-full' : ''}`} aria-label="Theme" suppressHydrationWarning>
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          onClick={() => chooseTheme(option.value)}
          className={`min-h-8 rounded-full px-2.5 py-1 transition-colors ${compact ? 'flex-1' : 'sm:px-3'} ${
            renderedTheme === option.value
              ? 'bg-surface-raised text-primary shadow-subtle'
              : 'hover:bg-surface hover:text-primary'
          }`}
          aria-pressed={renderedTheme === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
