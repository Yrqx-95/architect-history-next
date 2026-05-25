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

export default function ThemeToggle({ labels }: { labels: { system: string; dark: string; light: string } }) {
  const [theme, setTheme] = useState<ThemeChoice>(getStoredTheme)

  useEffect(() => {
    applyTheme(getStoredTheme())

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (getStoredTheme() === 'system') applyTheme('system')
    }
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
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

  return (
    <div className="inline-flex rounded-full border border-default bg-surface-muted p-0.5 text-xs text-muted shadow-semantic-card" aria-label="Theme" suppressHydrationWarning>
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          onClick={() => chooseTheme(option.value)}
          className={`rounded-full px-2.5 py-1 transition-colors sm:px-3 ${
            theme === option.value
              ? 'bg-surface-raised text-primary shadow-subtle'
              : 'hover:bg-surface hover:text-primary'
          }`}
          aria-pressed={theme === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
