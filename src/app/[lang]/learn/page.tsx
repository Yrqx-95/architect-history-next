import type { Metadata } from 'next'
import Link from 'next/link'
import LearnEntryCard from '@/components/LearnEntryCard'
import LearningTopicCard from '@/components/LearningTopicCard'
import SectionHeading from '@/components/SectionHeading'
import { core100TermsBySlug, type CoreLearningTerm } from '@/content/core-learning-terms/core-100-terms'
import { learningPathSections } from '@/content/learning-product/path-sections'
import { getGlossaryTerm, getGlossaryTermTitle } from '@/lib/glossary'
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
  recommendedTerms: string
  glossaryPending: string
  continueLearning: string
  primaryPath: string
  examLater: string
  glossaryEyebrow: string
  examEyebrow: string
  archiveAction: string
  archiveTitle: string
  archiveBody: string
}

type LocalizedPathDisplay = {
  targetUser: string
  whatUserWillLearn: string
  estimatedTime: string
  stages: Record<string, {
    title: string
    topicLabels: Record<string, string>
  }>
}

const COPY: Record<string, LearnCopy> = {
  zh: {
    title: '建筑学习中心',
    eyebrow: '学习',
    intro: '从建筑案例进入概念、法规与术语。这里不是题库，而是把建筑史档案和建筑学习连接起来的阅读入口。',
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
    recommendedTerms: '推荐术语',
    glossaryPending: '术语表待接入',
    continueLearning: '继续学习',
    primaryPath: '主要路径',
    examLater: '考试准备稍后展开；当前先以建筑学习档案为主。',
    glossaryEyebrow: '术语表',
    examEyebrow: '考试准备',
    archiveAction: '探索建筑档案',
    archiveTitle: '回到建筑档案',
    archiveBody: '学习概念之后，可以继续从建筑师、建筑作品、风格和地域阅读案例。',
  },
  en: {
    title: 'Architecture Learning Center',
    eyebrow: 'Learn',
    intro: 'Move from architectural works into concepts, code literacy, and vocabulary without losing the editorial character of the archive.',
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
    recommendedTerms: 'Recommended Terms',
    glossaryPending: 'Glossary pending',
    continueLearning: 'Continue Learning',
    primaryPath: 'Primary route',
    examLater: 'Exam preparation stays secondary for now; start with the architecture learning archive.',
    glossaryEyebrow: 'Glossary',
    examEyebrow: 'Exam Preparation',
    archiveAction: 'Explore Archive',
    archiveTitle: 'Return to the Archive',
    archiveBody: 'After learning the concepts, continue through architects, buildings, styles, and regions.',
  },
  ja: {
    title: '建築学習センター',
    eyebrow: '学習',
    intro: '建築作品から概念、法規、用語へ進むための入口です。問題集ではなく、建築アーカイブと学習を接続します。',
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
    recommendedTerms: '推奨用語',
    glossaryPending: '用語集は準備中',
    continueLearning: '学習を続ける',
    primaryPath: '主要ルート',
    examLater: '試験対策は後で拡張します。まずは建築学習アーカイブとして読み進めます。',
    glossaryEyebrow: '用語集',
    examEyebrow: '試験対策',
    archiveAction: '建築アーカイブを見る',
    archiveTitle: 'アーカイブへ戻る',
    archiveBody: '概念を学んだ後は、建築家、作品、様式、地域から事例を読み続けます。',
  },
}

const PUBLIC_LEARNING_PATH_IDS = [
  'architecture-student',
  'absolute-beginner',
  'architecture-history-explorer',
]

const PATH_DISPLAY_COPY: Record<string, Record<string, LocalizedPathDisplay>> = {
  en: {
    'architecture-student': {
      targetUser: 'Architecture students who need reusable concepts for studio, history, and technical classes.',
      whatUserWillLearn: 'Core planning, drawing, structure, materials, and building-code concepts.',
      estimatedTime: '20-30 hours',
      stages: {
        drawings: {
          title: 'Drawing literacy',
          topicLabels: { scale: 'scale', 'site plan': 'site plan', 'floor plan': 'floor plan', 'interior elevation': 'interior elevation', 'grid planning': 'grid planning' },
        },
        structure: {
          title: 'Structure',
          topicLabels: { slab: 'slab', 'wall structure': 'wall structure', frame: 'frame', concrete: 'concrete', strength: 'strength' },
        },
        materials: {
          title: 'Materials',
          topicLabels: { concrete: 'concrete', cement: 'cement', hydration: 'hydration', aggregate: 'aggregate', 'water-cement ratio': 'water-cement ratio' },
        },
        planning: {
          title: 'Planning',
          topicLabels: { grouping: 'grouping', 'core plan': 'core plan', 'courtyard house': 'courtyard house', 'cul-de-sac': 'cul-de-sac', zoning: 'zoning' },
        },
        'building-code': {
          title: 'Building Code',
          topicLabels: { 'floor area': 'floor area', coverage: 'coverage', 'building area': 'building area', 'road access': 'road access', 'front road': 'front road' },
        },
      },
    },
    'absolute-beginner': {
      targetUser: 'Curious users and first-year students who need a map of architecture vocabulary.',
      whatUserWillLearn: 'How to read buildings through site, plan, section, structure, material, and historical context.',
      estimatedTime: '6-8 hours',
      stages: {
        see: {
          title: 'See the building',
          topicLabels: { 'building form': 'building form', site: 'site', approach: 'approach' },
        },
        read: {
          title: 'Read the drawing',
          topicLabels: { scale: 'scale', plan: 'plan', section: 'section' },
        },
        connect: {
          title: 'Connect to history',
          topicLabels: { style: 'style', period: 'period', architect: 'architect' },
        },
      },
    },
    'architecture-history-explorer': {
      targetUser: 'Users entering through architects, works, styles, and periods.',
      whatUserWillLearn: 'How styles, typologies, and historical movements connect to buildings in the archive.',
      estimatedTime: '15-25 hours',
      stages: {
        'ancient-to-medieval': {
          title: 'Ancient to medieval',
          topicLabels: { orders: 'orders', temples: 'temples', vaults: 'vaults' },
        },
        modern: {
          title: 'Modern architecture',
          topicLabels: { 'international style': 'international style', metabolism: 'metabolism' },
        },
      },
    },
  },
  zh: {
    'architecture-student': {
      targetUser: '需要把课程、设计、建筑史和技术课知识串起来的建筑学生。',
      whatUserWillLearn: '核心的规划、图纸、结构、材料与建筑法规概念。',
      estimatedTime: '20-30 小时',
      stages: {
        drawings: {
          title: '图纸读解',
          topicLabels: { scale: '比例尺', 'site plan': '配置图', 'floor plan': '平面图', 'interior elevation': '展开图', 'grid planning': '网格规划' },
        },
        structure: {
          title: '结构',
          topicLabels: { slab: '楼板', 'wall structure': '墙式结构', frame: '刚架', concrete: '钢筋混凝土', strength: '设计强度' },
        },
        materials: {
          title: '材料',
          topicLabels: { concrete: '混凝土', cement: '水泥', hydration: '水化', aggregate: '骨料', 'water-cement ratio': '水灰比' },
        },
        planning: {
          title: '规划',
          topicLabels: { grouping: '功能分组', 'core plan': '核心筒平面', 'courtyard house': '庭院住宅', 'cul-de-sac': '尽端式道路', zoning: '用途地域' },
        },
        'building-code': {
          title: '建筑法规',
          topicLabels: { 'floor area': '楼面面积', coverage: '建蔽率', 'building area': '建筑面积', 'road access': '接道义务', 'front road': '前面道路' },
        },
      },
    },
    'absolute-beginner': {
      targetUser: '需要建筑词汇地图的好奇读者和一年级学生。',
      whatUserWillLearn: '通过场地、平面、剖面、结构、材料和历史背景阅读建筑。',
      estimatedTime: '6-8 小时',
      stages: {
        see: {
          title: '观看建筑',
          topicLabels: { 'building form': '建筑形态', site: '场地', approach: '进入方式' },
        },
        read: {
          title: '阅读图纸',
          topicLabels: { scale: '比例尺', plan: '平面', section: '剖面' },
        },
        connect: {
          title: '连接历史',
          topicLabels: { style: '风格', period: '时代', architect: '建筑师' },
        },
      },
    },
    'architecture-history-explorer': {
      targetUser: '从建筑师、作品、风格和时代进入 Archistory 的读者。',
      whatUserWillLearn: '风格、类型和历史运动如何与档案中的建筑作品互相连接。',
      estimatedTime: '15-25 小时',
      stages: {
        'ancient-to-medieval': {
          title: '古代至中世纪',
          topicLabels: { orders: '柱式', temples: '神庙', vaults: '拱顶' },
        },
        modern: {
          title: '现代建筑',
          topicLabels: { 'international style': '国际式', metabolism: '新陈代谢派' },
        },
      },
    },
  },
  ja: {
    'architecture-student': {
      targetUser: '設計課題、建築史、技術科目に使える概念を整理したい建築学生。',
      whatUserWillLearn: '計画、図面、構造、材料、建築法規の基本概念。',
      estimatedTime: '20-30時間',
      stages: {
        drawings: {
          title: '図面リテラシー',
          topicLabels: { scale: '縮尺', 'site plan': '配置図', 'floor plan': '平面図', 'interior elevation': '展開図', 'grid planning': 'グリッドプランニング' },
        },
        structure: {
          title: '構造',
          topicLabels: { slab: 'スラブ', 'wall structure': '壁式構造', frame: 'ラーメン構造', concrete: '鉄筋コンクリート', strength: '設計基準強度' },
        },
        materials: {
          title: '材料',
          topicLabels: { concrete: 'コンクリート', cement: 'セメント', hydration: '水和', aggregate: '骨材', 'water-cement ratio': '水セメント比' },
        },
        planning: {
          title: '計画',
          topicLabels: { grouping: 'グルーピング', 'core plan': 'コアプラン', 'courtyard house': 'コートハウス', 'cul-de-sac': 'クルドサック', zoning: '用途地域' },
        },
        'building-code': {
          title: '建築法規',
          topicLabels: { 'floor area': '延べ面積', coverage: '建蔽率', 'building area': '建築面積', 'road access': '接道義務', 'front road': '前面道路' },
        },
      },
    },
    'absolute-beginner': {
      targetUser: '建築語彙の地図が必要な初学者や一年生。',
      whatUserWillLearn: '敷地、平面、断面、構造、材料、歴史的文脈から建築を読む方法。',
      estimatedTime: '6-8時間',
      stages: {
        see: {
          title: '建築を見る',
          topicLabels: { 'building form': '建築形態', site: '敷地', approach: 'アプローチ' },
        },
        read: {
          title: '図面を読む',
          topicLabels: { scale: '縮尺', plan: '平面', section: '断面' },
        },
        connect: {
          title: '歴史につなげる',
          topicLabels: { style: '様式', period: '時代', architect: '建築家' },
        },
      },
    },
    'architecture-history-explorer': {
      targetUser: '建築家、作品、様式、時代からアーカイブに入る読者。',
      whatUserWillLearn: '様式、類型、歴史運動がアーカイブ内の建築作品とどう結びつくか。',
      estimatedTime: '15-25時間',
      stages: {
        'ancient-to-medieval': {
          title: '古代から中世へ',
          topicLabels: { orders: 'オーダー', temples: '神殿', vaults: 'ヴォールト' },
        },
        modern: {
          title: '近代建築',
          topicLabels: { 'international style': 'インターナショナルスタイル', metabolism: 'メタボリズム' },
        },
      },
    },
  },
}

function copyFor(lang: string) {
  return COPY[lang] || COPY.zh
}

function pathDisplayFor(lang: string, pathId: string) {
  return PATH_DISPLAY_COPY[lang]?.[pathId] || PATH_DISPLAY_COPY.en[pathId]
}

function coreTermTitle(term: CoreLearningTerm, lang: string) {
  if (lang === 'en') return term.termEn
  if (lang === 'ja') return term.termJa
  return term.termZh
}

function stageAnchor(pathId: string, stageId: string) {
  return `${pathId}-${stageId}`
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

      <section className="section grid gap-7 md:grid-cols-2">
        <LearnEntryCard href={`${prefix}/code`} eyebrow="01" title={copy.code} description={copy.codeBody} meta={copy.codeMeta} />
        <LearnEntryCard href={`${prefix}/glossary`} eyebrow="02" title={copy.glossary} description={copy.glossaryBody} meta={copy.glossaryMeta} />
        <div className="border-t border-subtle py-5 text-sm text-secondary md:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label">{copy.exam}</span>
            <span className="rounded-full border border-subtle px-2.5 py-1 text-xs text-muted">{comingSoonLabel}</span>
          </div>
          <p className="mt-3 max-w-2xl leading-relaxed">{copy.examLater}</p>
        </div>
      </section>

      <section className="section grid gap-8 border-t border-subtle pt-8 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <SectionHeading title={copy.pathsTitle} description={copy.pathsBody} />
        <div className="grid gap-5">
          {publicLearningPaths.map((path, pathIndex) => {
            const isPrimary = path.id === 'architecture-student'
            const pathDisplay = pathDisplayFor(lang, path.id)
            return (
              <article
                key={path.id}
                id={path.id}
                className={`rounded-md border bg-surface-muted p-5 ${isPrimary ? 'border-default' : 'border-subtle'}`}
              >
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-start">
                <div>
                  <p className="eyebrow">{isPrimary ? copy.primaryPath : String(pathIndex + 1).padStart(2, '0')}</p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary">
                    {path.title[lang as keyof typeof path.title] || path.title.en}
                  </h2>
                  <dl className="mt-5 grid gap-4 text-sm text-secondary sm:grid-cols-2">
                    <div>
                      <dt className="label">{copy.targetUser}</dt>
                      <dd className="mt-1 leading-relaxed">{pathDisplay.targetUser}</dd>
                    </div>
                    <div>
                      <dt className="label">{copy.whatUserWillLearn}</dt>
                      <dd className="mt-1 leading-relaxed">{pathDisplay.whatUserWillLearn}</dd>
                    </div>
                  </dl>
                </div>
                <div className="border-t border-subtle pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                  <p className="font-serif-display text-4xl leading-none text-primary">{pathDisplay.estimatedTime}</p>
                  <p className="label mt-2">{copy.estimatedTime}</p>
                </div>
              </div>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {path.stages.map((stage, stageIndex) => {
                  const stageDisplay = pathDisplay.stages[stage.id]
                  const recommendedTerms = isPrimary
                    ? (stage.coreTermSlugs || [])
                      .map(slug => core100TermsBySlug[slug])
                      .filter((term): term is CoreLearningTerm => Boolean(term))
                    : []
                  const nextStage = isPrimary ? path.stages[stageIndex + 1] : null
                  return (
                    <div
                      key={stage.id}
                      id={isPrimary ? stageAnchor(path.id, stage.id) : undefined}
                      className="scroll-mt-28 rounded-md border border-subtle bg-surface p-4 shadow-semantic-card"
                    >
                      <p className="label">{copy.stages}</p>
                      <h3 className="mt-2 text-base font-medium leading-snug text-primary">{stageDisplay?.title || stage.title}</h3>
                      <div className="mt-4">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">{copy.topics}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {stage.topicOrder.map(topic => (
                            <span key={topic} className="rounded-full border border-subtle px-2.5 py-1 text-xs text-secondary">
                              {stageDisplay?.topicLabels[topic] || topic}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">
                          {isPrimary ? copy.recommendedTerms : copy.terms}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {isPrimary ? recommendedTerms.map(term => {
                            const glossaryTerm = getGlossaryTerm(term.slug)
                            const title = glossaryTerm ? getGlossaryTermTitle(glossaryTerm, lang) : coreTermTitle(term, lang)
                            if (!glossaryTerm) {
                              return (
                                <span key={term.slug} className="rounded-full border border-subtle px-2.5 py-1 text-xs text-muted">
                                  {title}
                                </span>
                              )
                            }
                            return (
                              <Link
                                key={term.slug}
                                href={`${prefix}/glossary?term=${encodeURIComponent(glossaryTerm.slug)}`}
                                className="rounded-full border border-subtle bg-surface-raised px-2.5 py-1 text-xs text-primary hover:bg-surface-muted hover:text-accent"
                              >
                                {title}
                              </Link>
                            )
                          }) : stage.requiredGlossaryTerms.map(term => (
                            <Link
                              key={term}
                              href={`${prefix}/glossary?term=${encodeURIComponent(term)}`}
                              className="rounded-full border border-subtle bg-surface-raised px-2.5 py-1 text-xs text-primary transition-colors hover:bg-surface-muted hover:text-accent"
                            >
                              {term}
                            </Link>
                          ))}
                        </div>
                        {isPrimary && recommendedTerms.some(term => !getGlossaryTerm(term.slug)) && (
                          <p className="mt-2 text-xs text-muted">{copy.glossaryPending}</p>
                        )}
                      </div>
                      {nextStage && (
                        <Link
                          href={`#${stageAnchor(path.id, nextStage.id)}`}
                          className="mt-4 inline-flex text-xs font-medium text-secondary hover:text-primary"
                        >
                          {copy.continueLearning}: {pathDisplay.stages[nextStage.id]?.title || nextStage.title}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </article>
            )
          })}
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
          <p className="eyebrow">{copy.glossaryEyebrow}</p>
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
          <p className="eyebrow">{copy.examEyebrow}</p>
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
          {copy.archiveAction}
        </Link>
      </section>
    </div>
  )
}
