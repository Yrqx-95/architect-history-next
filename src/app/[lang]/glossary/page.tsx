import type { Metadata } from 'next'
import Link from 'next/link'
import GlossaryIndex from '@/components/GlossaryIndex'
import { glossaryTerms } from '@/lib/glossary'

const COPY = {
  zh: {
    title: '建筑术语表',
    eyebrow: 'Glossary',
    intro: '以日语建筑学习为中心，把法规、图纸、构造和空间阅读中反复出现的术语整理成一个轻量索引。',
    back: '返回 Learn',
    count: '个术语',
  },
  en: {
    title: 'Architecture Glossary',
    eyebrow: 'Glossary',
    intro: 'A lightweight multilingual index of terms that appear repeatedly in Japanese architecture study, drawings, code reading, and design criticism.',
    back: 'Back to Learn',
    count: 'terms',
  },
  ja: {
    title: '建築用語集',
    eyebrow: 'Glossary',
    intro: '日本の建築学習、図面、法規、設計批評で繰り返し出てくる用語を、多言語で読める軽量な索引として整理します。',
    back: 'Learn に戻る',
    count: '用語',
  },
}

function copyFor(lang: string) {
  return COPY[lang as keyof typeof COPY] || COPY.zh
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const copy = copyFor(lang)
  return {
    title: copy.title,
    description: copy.intro,
  }
}

export default async function GlossaryPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>
  searchParams?: Promise<{ term?: string }>
}) {
  const { lang } = await params
  const query = await searchParams
  const prefix = `/${lang}`
  const copy = copyFor(lang)
  const initialTerm = query?.term?.trim() || ''

  return (
    <div className="pb-20">
      <section className="section-lg grid gap-8 border-b border-subtle pb-10 pt-8 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <Link href={`${prefix}/learn`} className="caption transition-colors hover:text-primary">← {copy.back}</Link>
          <p className="eyebrow mt-8">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-primary sm:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
            {copy.intro}
          </p>
        </div>
        <div className="border-t border-subtle pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <p className="font-serif-display text-6xl leading-none text-primary">{glossaryTerms.length}</p>
          <p className="label mt-2">{copy.count}</p>
        </div>
      </section>

      <GlossaryIndex terms={glossaryTerms} lang={lang} prefix={prefix} initialTerm={initialTerm} />
    </div>
  )
}
