import Link from 'next/link'
import type { Metadata } from 'next'

const labels = {
  zh: {
    title: '页面没有找到',
    body: '这个档案入口暂时不存在，可以回到首页、档案或搜索继续浏览。',
    home: '回到首页',
    browse: '进入档案',
    search: '搜索',
  },
  en: {
    title: 'Page not found',
    body: 'This archive entry does not exist yet. Return home, browse the archive, or search for another clue.',
    home: 'Home',
    browse: 'Archive',
    search: 'Search',
  },
  ja: {
    title: 'ページが見つかりません',
    body: 'このアーカイブ項目はまだ存在しません。ホーム、アーカイブ、検索から続けてください。',
    home: 'ホーム',
    browse: 'アーカイブ',
    search: '検索',
  },
}

function normalizeLang(lang: string) {
  return lang === 'en' || lang === 'ja' || lang === 'zh' ? lang : 'zh'
}

export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: false },
}

export default async function MissingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params
  const lang = normalizeLang(rawLang)
  const prefix = `/${lang}`
  const text = labels[lang]

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="heading-1 mb-4">{text.title}</h1>
      <p className="body mx-auto max-w-xl text-secondary">{text.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={prefix} className="rounded-full bg-[color:var(--ui-text-primary)] px-4 py-2 text-sm text-inverse transition-opacity hover:opacity-85">
          {text.home}
        </Link>
        <Link href={`${prefix}/browse`} className="rounded-full border border-default px-4 py-2 text-sm text-primary transition-colors hover:bg-surface-muted">
          {text.browse}
        </Link>
        <Link href={`${prefix}/search`} className="rounded-full border border-default px-4 py-2 text-sm text-primary transition-colors hover:bg-surface-muted">
          {text.search}
        </Link>
      </div>
    </div>
  )
}
