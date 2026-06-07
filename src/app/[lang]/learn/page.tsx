import type { Metadata } from 'next'
import Link from 'next/link'
import LearnEntryCard from '@/components/LearnEntryCard'
import LearningTopicCard from '@/components/LearningTopicCard'
import SectionHeading from '@/components/SectionHeading'
import { learningPathSections } from '@/content/learning-product/path-sections'
import { getLocalizedLearningTopics } from '@/lib/learning-topics'

type LearnCopy = {
  title: string
  eyebrow: string
  intro: string
  code: string
  codeBody: string
  codeMeta: string
  glossary: string
  glossaryBody: string
  glossaryMeta: string
  exam: string
  examBody: string
  examMeta: string
  topicsTitle: string
  topicsBody: string
  pathsTitle: string
  pathsBody: string
  targetUser: string
  whatUserWillLearn: string
  estimatedTime: string
  stages: string
  topics: string
  terms: string
  archiveTitle: string
  archiveBody: string
}

const COPY: Record<string, LearnCopy> = {
  zh: {
    title: '建筑学习中心',
    eyebrow: 'Learn',
    intro: '从建筑案例进入概念、法规与考试知识。这里不是题库，而是把建筑史档案和建筑学习连接起来的阅读入口。',
    code: '建筑法规',
    codeBody: '理解日本建筑法规中的核心概念：用途、密度、道路、防火与高度控制。',
    codeMeta: '日本法规入门',
    glossary: '术语表',
    glossaryBody: '把常见建筑术语整理成可阅读的短条目，帮助你读懂图纸、评论与法规文本。',
    glossaryMeta: '建筑语汇索引',
    exam: '考试准备',
    examBody: '面向建筑学生和一二级建筑士备考者，整理高频概念、误区和阅读顺序。',
    examMeta: '学习路径提示',
    topicsTitle: '热门学习主题',
    topicsBody: '先从最常见的日本建筑法规关键词开始。',
    pathsTitle: '学习路径',
    pathsBody: '从已有的学习路径开始，按目标用户和阅读阶段进入 Archistory。',
    targetUser: '适合对象',
    whatUserWillLearn: '你会学到',
    estimatedTime: '预计时间',
    stages: '阶段',
    topics: '主题',
    terms: '术语',
    archiveTitle: '回到建筑档案',
    archiveBody: '学习概念之后，可以继续从建筑师、建筑作品、风格和地域阅读案例。',
  },
  en: {
    title: 'Architecture Learning Center',
    eyebrow: 'Learn',
    intro: 'Move from architectural works into concepts, code literacy, and exam-oriented reading without losing the editorial character of the archive.',
    code: 'Building Code',
    codeBody: 'Learn core Japanese building regulation concepts around use, density, road access, fire planning, and height controls.',
    codeMeta: 'Japanese code literacy',
    glossary: 'Glossary',
    glossaryBody: 'A readable vocabulary layer for drawings, criticism, regulations, and architectural history.',
    glossaryMeta: 'Vocabulary layer',
    exam: 'Exam Preparation',
    examBody: 'High-frequency concepts, common mistakes, and reading order for students and architecture licensing study.',
    examMeta: 'Study orientation',
    topicsTitle: 'Popular Learning Topics',
    topicsBody: 'Start with frequently used Japanese building code terms.',
    pathsTitle: 'Learning Paths',
    pathsBody: 'Start from existing guided paths organized by learner intent and reading stage.',
    targetUser: 'For',
    whatUserWillLearn: 'What you will learn',
    estimatedTime: 'Estimated time',
    stages: 'Stages',
    topics: 'Topics',
    terms: 'Terms',
    archiveTitle: 'Return to the Archive',
    archiveBody: 'After learning the concepts, continue through architects, buildings, styles, and regions.',
  },
  ja: {
    title: '建築学習センター',
    eyebrow: 'Learn',
    intro: '建築作品から概念、法規、試験の読み方へ進むための入口です。問題集ではなく、建築アーカイブと学習を接続します。',
    code: '建築法規',
    codeBody: '用途、密度、道路、防火、高さ制限など、日本の建築法規の基本概念を読む。',
    codeMeta: '日本法規の基礎',
    glossary: '用語集',
    glossaryBody: '図面、批評、法規、建築史を読むための語彙を短い項目として整理します。',
    glossaryMeta: '建築語彙の索引',
    exam: '試験対策',
    examBody: '建築学生、一級・二級建築士試験の学習者に向けた頻出概念、誤解、読み順。',
    examMeta: '学習の方向づけ',
    topicsTitle: 'よく使う学習テーマ',
    topicsBody: 'まずは日本の建築法規で頻出する語から始めます。',
    pathsTitle: '学習パス',
    pathsBody: '学習者の目的と読む順序に沿って、既存のパスから始めます。',
    targetUser: '対象',
    whatUserWillLearn: '学べること',
    estimatedTime: '目安時間',
    stages: '段階',
    topics: 'テーマ',
    terms: '用語',
    archiveTitle: 'アーカイブへ戻る',
    archiveBody: '概念を学んだ後は、建築家、作品、様式、地域から事例を読み続けます。',
  },
}

const PUBLIC_LEARNING_PATH_IDS = [
  'architecture-student',
  'absolute-beginner',
  'architecture-history-explorer',
]

function copyFor(lang: string) {
  return COPY[lang] || COPY.zh
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const copy = copyFor(lang)
  return {
    title: copy.title,
    description: copy.intro,
  }
}

export default async function LearnPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const prefix = `/${lang}`
  const copy = copyFor(lang)
  const topics = getLocalizedLearningTopics(lang, 'code')
  const comingSoonLabel = lang === 'en' ? 'Coming Soon' : lang === 'ja' ? '準備中' : '即将推出'
  const publicLearningPaths = PUBLIC_LEARNING_PATH_IDS
    .map(id => learningPathSections.find(path => path.id === id))
    .filter((path): path is NonNullable<typeof path> => Boolean(path))

  return (
    <div className="pb-20">
      <section className="section-lg grid gap-10 border-b border-subtle pb-12 pt-8 sm:pt-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,1.1fr)] lg:items-end">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-primary sm:text-6xl">
            {copy.title}
          </h1>
        </div>
        <p className="body-large max-w-2xl">{copy.intro}</p>
      </section>

      <section className="section grid gap-7 md:grid-cols-3">
        <LearnEntryCard href={`${prefix}/code`} eyebrow="01" title={copy.code} description={copy.codeBody} meta={copy.codeMeta} />
        <LearnEntryCard href={`${prefix}/glossary`} eyebrow="02" title={copy.glossary} description={copy.glossaryBody} meta={copy.glossaryMeta} />
        <LearnEntryCard eyebrow="03" title={copy.exam} description={copy.examBody} meta={copy.examMeta} comingSoonLabel={comingSoonLabel} />
      </section>

      <section className="section grid gap-8 border-t border-subtle pt-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <SectionHeading title={copy.pathsTitle} description={copy.pathsBody} />
        <div className="grid gap-5">
          {publicLearningPaths.map((path, pathIndex) => (
            <article key={path.id} id={path.id} className="border-t border-subtle py-6">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
                <div>
                  <p className="eyebrow">{String(pathIndex + 1).padStart(2, '0')}</p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary">
                    {path.title[lang as keyof typeof path.title] || path.title.en}
                  </h2>
                  <dl className="mt-5 grid gap-4 text-sm text-secondary sm:grid-cols-2">
                    <div>
                      <dt className="label">{copy.targetUser}</dt>
                      <dd className="mt-1 leading-relaxed">{path.targetUser}</dd>
                    </div>
                    <div>
                      <dt className="label">{copy.whatUserWillLearn}</dt>
                      <dd className="mt-1 leading-relaxed">{path.whatUserWillLearn}</dd>
                    </div>
                  </dl>
                </div>
                <div className="border-t border-subtle pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                  <p className="font-serif-display text-4xl leading-none text-primary">{path.estimatedTime}</p>
                  <p className="label mt-2">{copy.estimatedTime}</p>
                </div>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {path.stages.map(stage => (
                  <div key={stage.id} className="rounded-md border border-subtle bg-surface p-4 shadow-semantic-card">
                    <p className="label">{copy.stages}</p>
                    <h3 className="mt-2 text-base font-medium leading-snug text-primary">{stage.title}</h3>
                    <div className="mt-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{copy.topics}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {stage.topicOrder.map(topic => (
                          <span key={topic} className="rounded-full border border-subtle px-2.5 py-1 text-xs text-secondary">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{copy.terms}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {stage.requiredGlossaryTerms.map(term => (
                          <Link
                            key={term}
                            href={`${prefix}/glossary?term=${encodeURIComponent(term)}`}
                            className="rounded-full border border-subtle bg-surface-raised px-2.5 py-1 text-xs text-primary transition-colors hover:bg-surface-muted hover:text-accent"
                          >
                            {term}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section grid gap-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <SectionHeading title={copy.topicsTitle} description={copy.topicsBody} />
        <div className="grid gap-x-8 border-b border-subtle md:grid-cols-2">
          {topics.map(topic => (
            <LearningTopicCard key={topic.id} topic={topic} href={`${prefix}/code/${topic.slug}`} compact />
          ))}
        </div>
      </section>

      <section id="glossary" className="section grid gap-8 border-t border-subtle pt-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div>
          <p className="eyebrow">Glossary</p>
          <h2 className="heading-3 mt-3">{copy.glossary}</h2>
        </div>
        <div>
          <p className="body max-w-2xl">{copy.glossaryBody}</p>
          <Link href={`${prefix}/glossary`} className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-default px-5 text-sm font-medium text-primary transition-colors hover:bg-surface-muted">
            {copy.glossary}
          </Link>
        </div>
      </section>

      <section id="exam" className="section grid gap-8 border-t border-subtle pt-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div>
          <p className="eyebrow">Exam</p>
          <h2 className="heading-3 mt-3">{copy.exam}</h2>
          <p className="mt-3 inline-flex rounded-full border border-subtle px-3 py-1 text-xs font-medium text-muted">{comingSoonLabel}</p>
        </div>
        <p className="body max-w-2xl">{copy.examBody}</p>
      </section>

      <section className="section grid gap-5 border-t border-subtle pt-8 md:grid-cols-[minmax(0,1fr)_16rem] md:items-center">
        <div>
          <h2 className="heading-3">{copy.archiveTitle}</h2>
          <p className="caption mt-2 max-w-xl">{copy.archiveBody}</p>
        </div>
        <Link href={`${prefix}/browse`} className="inline-flex min-h-11 items-center justify-center rounded-full border border-default px-5 text-sm font-medium text-primary transition-colors hover:bg-surface-muted">
          Explore Archive
        </Link>
      </section>
    </div>
  )
}
