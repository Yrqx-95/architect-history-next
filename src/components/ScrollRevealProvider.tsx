'use client'

import { useEffect } from 'react'

const REVEAL_SELECTOR = [
  'main .interactive-card',
  'main .motion-reveal-card',
  'main .motion-reveal-row',
  'main .taxonomy-panel',
  'main .shadow-semantic-card',
  'main .diagram-light-theme',
].join(',')

const MAX_STAGGER = 3
const CLEANUP_DELAY_MS = 1000
const HYDRATION_SETTLE_DELAY_MS = 240

export default function ScrollRevealProvider() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const root = document.documentElement
    const tracked = new WeakSet<Element>()
    let initialRegisterComplete = false

    root.classList.add('motion-scroll-ready')

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const element = entry.target as HTMLElement
          observer.unobserve(element)
          element.classList.add('is-scroll-revealed')

          window.setTimeout(() => {
            element.classList.remove('scroll-reveal-target', 'scroll-reveal-initial', 'is-scroll-revealed')
            element.style.removeProperty('--scroll-reveal-index')
            element.dataset.scrollRevealed = 'true'
          }, CLEANUP_DELAY_MS)
        })
      },
      {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12,
      },
    )

    const hasRevealParent = (element: HTMLElement) => {
      let parent = element.parentElement
      while (parent && parent !== document.body) {
        if (parent.matches(REVEAL_SELECTOR)) return true
        parent = parent.parentElement
      }
      return false
    }

    const register = () => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
        .filter(element =>
          !tracked.has(element) &&
          !element.dataset.scrollRevealed &&
          !hasRevealParent(element) &&
          !element.closest('[data-motion-scope="reveal"]')
        )

      elements.forEach((element, index) => {
        tracked.add(element)
        element.classList.add('scroll-reveal-target')
        if (!initialRegisterComplete) element.classList.add('scroll-reveal-initial')
        element.style.setProperty('--scroll-reveal-index', String(Math.min(index % 6, MAX_STAGGER)))
        observer.observe(element)
      })

      initialRegisterComplete = true
    }

    const mutationObserver = new MutationObserver(register)
    let startTimer = 0

    const start = () => {
      register()
      mutationObserver.observe(document.body, { childList: true, subtree: true })
    }

    startTimer = window.setTimeout(start, HYDRATION_SETTLE_DELAY_MS)

    return () => {
      window.clearTimeout(startTimer)
      observer.disconnect()
      mutationObserver.disconnect()
      root.classList.remove('motion-scroll-ready')
    }
  }, [])

  return null
}
