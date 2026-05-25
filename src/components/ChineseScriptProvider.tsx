'use client'

import { useEffect } from 'react'
import { Converter } from 'opencc-js'

export type ChineseScriptChoice = 'system' | 'hans' | 'hant'
export type ChineseScript = 'hans' | 'hant'

const STORAGE_KEY = 'chineseScript'
const EVENT_NAME = 'chinese-script-change'
const originalText = new WeakMap<Text, string>()
const originalAttrs = new WeakMap<Element, Map<string, string>>()
const toTaiwanTraditional = Converter({ from: 'cn', to: 'twp' })
let isApplying = false

declare global {
  interface Window {
    applyChineseScript?: () => void
  }
}

function getStoredChoice(): ChineseScriptChoice {
  if (typeof window === 'undefined') return 'system'
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'hans' || stored === 'hant' || stored === 'system' ? stored : 'system'
}

function preferredSystemScript(): ChineseScript {
  if (typeof navigator === 'undefined') return 'hans'
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  return languages.some(language => /zh-(tw|hk|mo|hant)/i.test(language)) ? 'hant' : 'hans'
}

function resolveScript(choice = getStoredChoice()): ChineseScript {
  return choice === 'system' ? preferredSystemScript() : choice
}

function isSkippableElement(element: Element) {
  const tag = element.tagName
  return tag === 'SCRIPT' ||
    tag === 'STYLE' ||
    tag === 'NOSCRIPT' ||
    tag === 'CODE' ||
    tag === 'PRE' ||
    tag === 'SVG' ||
    element.classList.contains('ignore-opencc') ||
    element.closest('[data-no-script-convert="true"]')
}

function convertTextNode(node: Text, script: ChineseScript) {
  const source = originalText.get(node) ?? node.nodeValue ?? ''
  if (!originalText.has(node)) originalText.set(node, source)
  node.nodeValue = script === 'hant' ? toTaiwanTraditional(source) : source
}

function convertAttributes(element: Element, script: ChineseScript) {
  const attrs = ['placeholder', 'aria-label', 'alt', 'title']
  for (const attr of attrs) {
    if (!element.hasAttribute(attr)) continue
    let saved = originalAttrs.get(element)
    if (!saved) {
      saved = new Map()
      originalAttrs.set(element, saved)
    }
    if (!saved.has(attr)) saved.set(attr, element.getAttribute(attr) || '')
    const source = saved.get(attr) || ''
    const nextValue = script === 'hant' ? toTaiwanTraditional(source) : source
    if (element.getAttribute(attr) !== nextValue) {
      element.setAttribute(attr, nextValue)
    }
  }
}

function walk(node: Node, script: ChineseScript) {
  if (node.nodeType === Node.TEXT_NODE) {
    convertTextNode(node as Text, script)
    return
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return

  const element = node as Element
  if (isSkippableElement(element)) return
  convertAttributes(element, script)
  element.childNodes.forEach(child => walk(child, script))
}

export function setChineseScript(choice: ChineseScriptChoice) {
  localStorage.setItem(STORAGE_KEY, choice)
  const script = resolveScript(choice)
  document.documentElement.dataset.zhScriptChoice = choice
  document.documentElement.dataset.zhScript = script
  window.applyChineseScript?.()
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: { choice, script } }))
}

export function getChineseScriptChoice() {
  return getStoredChoice()
}

export function getResolvedChineseScript() {
  return resolveScript()
}

export function subscribeChineseScript(listener: () => void) {
  window.addEventListener(EVENT_NAME, listener)
  return () => window.removeEventListener(EVENT_NAME, listener)
}

export default function ChineseScriptProvider({ lang }: { lang: string }) {
  useEffect(() => {
    if (lang !== 'zh') return

    const apply = () => {
      const choice = getStoredChoice()
      const script = resolveScript(choice)
      document.documentElement.dataset.zhScriptChoice = choice
      document.documentElement.dataset.zhScript = script
      isApplying = true
      try {
        walk(document.body, script)
      } finally {
        isApplying = false
      }
    }

    window.applyChineseScript = apply
    apply()

    const observer = new MutationObserver(mutations => {
      if (isApplying) return
      const script = resolveScript()
      isApplying = true
      try {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach(node => walk(node, script))
          if (mutation.type === 'attributes' && mutation.target.nodeType === Node.ELEMENT_NODE) {
            walk(mutation.target, script)
          }
        }
      } finally {
        isApplying = false
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['placeholder', 'aria-label', 'alt', 'title'],
    })

    const mediaListener = () => {
      if (getStoredChoice() === 'system') apply()
    }
    window.addEventListener('languagechange', mediaListener)

    return () => {
      observer.disconnect()
      window.removeEventListener('languagechange', mediaListener)
      delete window.applyChineseScript
    }
  }, [lang])

  return null
}
