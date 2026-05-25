'use client'

import { useEffect } from 'react'

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('=== [LangError] Page Error ===')
    console.error('Name:', error.name)
    console.error('Message:', error.message)
    console.error('Stack:', error.stack)
    if ('digest' in error) console.error('Digest:', (error as Record<string, unknown>).digest)
  }, [error])

  return (
    <div className="py-20 text-center">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Something went wrong</h1>
      <p className="text-stone-500 mb-2">{error.name}: {error.message || 'An unexpected error occurred'}</p>
      <details className="mt-4 mx-auto max-w-2xl text-left">
        <summary className="text-xs text-stone-400 cursor-pointer hover:text-stone-600 dark:hover:text-stone-300">Stack trace</summary>
        <pre className="mt-2 p-4 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs overflow-auto whitespace-pre-wrap">{error.stack}</pre>
      </details>
      <button onClick={reset} className="mt-6 px-6 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-full text-sm hover:opacity-80 transition-opacity">
        Try again
      </button>
    </div>
  )
}
