'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const labels = {
  zh: { title: '页面出了问题', body: '请重试一次。如果问题继续出现，可以从档案或搜索重新进入。', retry: '重试' },
  en: { title: 'Something went wrong', body: 'Try again. If the issue continues, return through the archive or search.', retry: 'Try again' },
  ja: { title: '問題が発生しました', body: 'もう一度お試しください。続く場合はアーカイブや検索から入り直してください。', retry: '再試行' },
}

function currentLang(pathname: string) {
  const lang = pathname.split('/')[1]
  return lang === 'en' || lang === 'ja' || lang === 'zh' ? lang : 'zh'
}

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const lang = currentLang(usePathname())
  const text = labels[lang]

  useEffect(() => {
    console.error('=== [LangError] Page Error ===')
    console.error('Name:', error.name)
    console.error('Message:', error.message)
    console.error('Stack:', error.stack)
    if ('digest' in error) console.error('Digest:', (error as Record<string, unknown>).digest)
  }, [error])

  return (
    <div className="mx-auto max-w-2xl py-20 text-center">
      <p className="eyebrow mb-4">{error.name}</p>
      <h1 className="heading-2 mb-4">{text.title}</h1>
      <p className="body mx-auto max-w-xl text-secondary">{text.body}</p>
      <details className="mx-auto mt-6 max-w-2xl text-left">
        <summary className="cursor-pointer text-xs text-muted transition-colors hover:text-primary">Diagnostic details</summary>
        <pre className="mt-2 max-h-64 overflow-auto rounded-md border border-subtle bg-surface-muted p-4 text-xs whitespace-pre-wrap text-secondary">{error.message}</pre>
      </details>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full bg-[color:var(--ui-text-primary)] px-5 py-2 text-sm text-inverse transition-opacity hover:opacity-85"
      >
        {text.retry}
      </button>
    </div>
  )
}
