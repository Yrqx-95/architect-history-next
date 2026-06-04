import type { Metadata } from 'next'
import Link from 'next/link'
import LearningTopicCard from '@/components/LearningTopicCard'
import Reveal from '@/components/Reveal'
import { getLocalizedLearningTopics } from '@/lib/learning-topics'

const COPY = {
  zh: {
    title: '建筑法规',
    subtitle: '日本建筑法规关键词',
    intro: '从建筑设计最常遇到的法规概念开始：用途、密度、道路、高度与防火。页面以百科解释为主，考试提示作为辅助阅读。',
    back: '返回 Learn',
    count: '个主题',
  },
  en: {
    title: 'Building Code',
    subtitle: 'Japanese architectural regulation terms',
    intro: 'Start with the code concepts most often encountered in design: use, density, road access, height, and fire planning. Articles are written as references first, with exam notes as a secondary layer.',
    back: 'Back to Learn',
    count: 'topics',
  },
  ja: {
    title: '建築法規',
    subtitle: '日本の建築法規キーワード',
    intro: '用途、密度、道路、高さ、防火など、設計で頻出する法規概念から読み始めます。百科的な説明を主とし、試験対策は補助的に扱います。',
    back: 'Learn に戻る',
    count: 'テーマ',
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

export default async function CodePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const prefix = `/${lang}`
  const copy = copyFor(lang)
  const topics = getLocalizedLearningTopics(lang, 'code')

  return (
    <div className="pb-20">
      <section className="section-lg grid gap-8 border-b border-subtle pb-10 pt-8 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <div>
          <Link href={`${prefix}/learn`} className="caption transition-colors hover:text-primary">← {copy.back}</Link>
          <p className="eyebrow mt-8">{copy.subtitle}</p>
          <h1 className="mt-5 text-5xl font-semibold leading-none text-primary sm:text-7xl">{copy.title}</h1>
        </div>
        <div>
          <p className="body-large">{copy.intro}</p>
          <p className="mt-6 font-serif-display text-5xl leading-none text-primary">{topics.length}</p>
          <p className="label mt-1">{copy.count}</p>
        </div>
      </section>

      <Reveal>
        <section className="grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
          {topics.map(topic => (
            <LearningTopicCard key={topic.id} topic={topic} href={`${prefix}/code/${topic.slug}`} />
          ))}
        </section>
      </Reveal>
    </div>
  )
}
