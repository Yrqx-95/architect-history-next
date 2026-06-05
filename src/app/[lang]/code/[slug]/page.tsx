import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getLearningTopic, getLearningTopics, getLocalizedLearningTopic } from '@/lib/learning-topics'
import { getGlossaryTermTitle, getGlossaryTermsForCodeTopic } from '@/lib/glossary'
import type { LearningComparisonTable, LearningDiagramNote, LearningFormula, LearningStep, LearningWorkedExample } from '@/lib/learning-topics'
import SourceBadge from '@/components/SourceBadge'
import StatusBadge from '@/components/StatusBadge'
import VerificationBlock from '@/components/VerificationBlock'
import CodeTopicDiagrams, { hasCodeTopicDiagrams } from '@/components/CodeTopicDiagrams'

const LABELS = {
  zh: {
    code: '建筑法规',
    japaneseTerm: '日语关键词',
    definition: '定义',
    overview: '概要',
    whyItExists: '为什么存在',
    keyFormula: '关键公式',
    calculationSteps: '计算步骤',
    workedExamples: '例题',
    comparisonTable: '对比表',
    diagramNotes: '图解说明',
    memoryTips: '记忆提示',
    keyTerms: '关键术语',
    keyConcepts: '核心概念',
    officialSource: '官方来源',
    examSnapshot: '考试速览',
    coreDiagram: '核心图解',
    variablesTerms: '变量与术语',
    variables: '变量',
    terms: '术语',
    applicabilityCheck: '适用性检查',
    relatedGlossary: '相关术语',
    relatedCodeTopics: '相关法规主题',
    problem: '题目',
    answer: '答案',
    rules: '计算与规则',
    examples: '示例',
    mistakes: '常见错误',
    reading: '延伸阅读',
    exam: '考试重点',
    back: '返回建筑法规',
    status: '状态',
    quality: '质量',
    lastReviewed: '最后审查',
    notReviewed: '未审查',
    sourceType: '来源类型',
    lawName: '法规名',
    articleNumber: '条文编号',
    sourceUrl: '来源链接',
    originalJapaneseTitle: '日文原题',
    verificationState: '验证状态',
    sourceNote: '说明',
    openOfficialSource: '打开官方出处',
    detailInfo: '详细信息',
    disclaimerTitle: '学习用途声明',
    disclaimerBody: '本内容仅用于学习参考，不构成法律建议，也不应作为许可申请、设计审批或法律判断的唯一依据。请务必同时查阅官方来源、地方规定，并咨询具备资格的专业人士。',
  },
  en: {
    code: 'Building Code',
    japaneseTerm: 'Japanese Term',
    definition: 'Definition',
    overview: 'Overview',
    whyItExists: 'Why It Exists',
    keyFormula: 'Key Formula',
    calculationSteps: 'Calculation Process',
    workedExamples: 'Worked Examples',
    comparisonTable: 'Comparison Table',
    diagramNotes: 'Diagram Notes',
    memoryTips: 'Memory Tips',
    keyTerms: 'Key Terms',
    keyConcepts: 'Key Concepts',
    officialSource: 'Official Source',
    examSnapshot: 'Exam Snapshot',
    coreDiagram: 'Core Diagram',
    variablesTerms: 'Variables & Terms',
    variables: 'Variables',
    terms: 'Terms',
    applicabilityCheck: 'Applicability Check',
    relatedGlossary: 'Related Glossary',
    relatedCodeTopics: 'Related Code Topics',
    problem: 'Problem',
    answer: 'Answer',
    rules: 'Calculation / Rules',
    examples: 'Examples',
    mistakes: 'Common Mistakes',
    reading: 'Further Reading',
    exam: 'Exam Preparation',
    back: 'Back to Code',
    status: 'Status',
    quality: 'Quality',
    lastReviewed: 'Last Reviewed',
    notReviewed: 'Not Reviewed',
    sourceType: 'Source Type',
    lawName: 'Regulation',
    articleNumber: 'Article Number',
    sourceUrl: 'Source URL',
    originalJapaneseTitle: 'Original Japanese Title',
    verificationState: 'Verification State',
    sourceNote: 'Note',
    openOfficialSource: 'Open Official Source',
    detailInfo: 'Details',
    disclaimerTitle: 'Educational Disclaimer',
    disclaimerBody: 'This content is provided for educational purposes. It is not legal advice and must not be used as the sole basis for permit applications, design approval, or legal determinations. Always consult official sources, local regulations, and qualified professionals.',
  },
  ja: {
    code: '建築法規',
    japaneseTerm: '日本語キーワード',
    definition: '定義',
    overview: '概要',
    whyItExists: 'なぜ必要か',
    keyFormula: '重要公式',
    calculationSteps: '計算手順',
    workedExamples: '例題',
    comparisonTable: '比較表',
    diagramNotes: '図解メモ',
    memoryTips: '記憶のコツ',
    keyTerms: '重要用語',
    keyConcepts: '重要ポイント',
    officialSource: '公式情報',
    examSnapshot: '試験速覧',
    coreDiagram: '基本図解',
    variablesTerms: '変数と用語',
    variables: '変数',
    terms: '用語',
    applicabilityCheck: '適用チェック',
    relatedGlossary: '関連用語',
    relatedCodeTopics: '関連法規テーマ',
    problem: '問題',
    answer: '答え',
    rules: '計算と規定',
    examples: '例',
    mistakes: 'よくある間違い',
    reading: '参考資料',
    exam: '試験対策',
    back: '建築法規に戻る',
    status: 'ステータス',
    quality: '品質',
    lastReviewed: '最終レビュー',
    notReviewed: '未レビュー',
    sourceType: '情報種別',
    lawName: '法規名',
    articleNumber: '条文番号',
    sourceUrl: '参照URL',
    originalJapaneseTitle: '日本語原題',
    verificationState: '検証状態',
    sourceNote: '説明',
    openOfficialSource: '公式情報を開く',
    detailInfo: '詳細情報',
    disclaimerTitle: '学習用コンテンツについて',
    disclaimerBody: 'この内容は学習目的で提供されています。法的助言ではなく、確認申請、設計承認、法的判断の唯一の根拠として使用しないでください。必ず公式情報、地域の規定、資格を持つ専門家に確認してください。',
  },
}

function labelsFor(lang: string) {
  return LABELS[lang as keyof typeof LABELS] || LABELS.zh
}

export function generateStaticParams() {
  const langs = ['zh', 'en', 'ja']
  return langs.flatMap(lang => getLearningTopics('code').map(topic => ({ lang, slug: topic.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const topic = getLocalizedLearningTopic(slug, lang)
  if (!topic) return {}
  return {
    title: `${topic.title} | Building Code`,
    description: topic.summary,
  }
}

function ArticleBlock({ title, badge, children }: { title: string; badge?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="border-t border-subtle py-8">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-medium text-primary">{title}</h2>
        {badge}
      </div>
      {children}
    </section>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map(item => (
        <li key={item} className="grid grid-cols-[1rem_minmax(0,1fr)] gap-3 text-sm leading-relaxed text-secondary">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[color:var(--ui-accent)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ExamSnapshot({ items }: { items: string[] }) {
  const snapshotItems = items.slice(0, 4)
  if (snapshotItems.length === 0) return null

  return (
    <div className="rounded-md border border-subtle bg-surface-raised p-5 shadow-semantic-card">
      <ul className="grid gap-3 sm:grid-cols-2">
        {snapshotItems.map((item, index) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-secondary">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-muted text-xs font-medium text-primary">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function FormulaCards({ formulas }: { formulas: LearningFormula[] }) {
  return (
    <div className="space-y-4">
      {formulas.map(formula => (
        <div key={formula.expression} className="rounded-md border border-subtle bg-surface-raised p-5 shadow-semantic-card">
          <p className="label">{formula.title}</p>
          <p className="mt-4 break-words font-serif-display text-3xl leading-tight text-primary sm:text-4xl">{formula.expression}</p>
          {formula.note && <p className="mt-4 text-xs leading-relaxed text-muted">{formula.note}</p>}
          <dl className="mt-5 grid gap-3 border-t border-subtle pt-4 sm:grid-cols-3">
            {formula.variables.map(variable => (
              <div key={variable.label}>
                <dt className="text-xs font-medium text-primary">{variable.label}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-secondary">{variable.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}

function VariablesAndTerms({
  formulas,
  keyConcepts,
  labels,
}: {
  formulas?: LearningFormula[]
  keyConcepts: string[]
  labels: ReturnType<typeof labelsFor>
}) {
  const variables = formulas?.flatMap(formula => formula.variables) || []

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {variables.length > 0 && (
        <div className="rounded-md border border-subtle bg-surface-raised p-5 shadow-semantic-card">
          <p className="label mb-4">{labels.variables}</p>
          <dl className="space-y-4">
            {variables.map(variable => (
              <div key={`${variable.label}-${variable.description}`} className="border-b border-subtle pb-3 last:border-b-0 last:pb-0">
                <dt className="text-sm font-medium text-primary">{variable.label}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-secondary">{variable.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
      <div className="rounded-md border border-subtle bg-surface-raised p-5 shadow-semantic-card">
        <p className="label mb-4">{labels.terms}</p>
        <BulletList items={keyConcepts} />
      </div>
    </div>
  )
}

function StepList({ steps }: { steps: LearningStep[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li key={step.title} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 rounded-md border border-subtle bg-surface-raised p-4 shadow-semantic-card">
          <span className="label">Step {index + 1}</span>
          <div>
            <p className="text-sm font-medium text-primary">{step.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-secondary">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

function splitExampleDescription(description: string) {
  return description
    .split(/(?<=[。.!?])\s+/)
    .map(step => step.trim())
    .filter(Boolean)
}

function WorkedExampleCards({ examples, labels }: { examples: LearningWorkedExample[]; labels: ReturnType<typeof labelsFor> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {examples.map(example => {
        const steps = splitExampleDescription(example.description)
        const answer = steps.length > 1 ? steps[steps.length - 1] : example.description
        const processSteps = steps.length > 1 ? steps.slice(0, -1) : []

        return (
          <div key={example.title} className="rounded-md border border-subtle bg-surface-raised p-5 shadow-semantic-card">
            <p className="label">{example.label}</p>
            <div className="mt-4 rounded border border-subtle bg-surface-muted p-3">
              <p className="label">{labels.problem}</p>
              <h3 className="mt-2 text-base font-medium text-primary">{example.title}</h3>
            </div>
            {processSteps.length > 0 && (
              <ol className="mt-4 space-y-2">
                {processSteps.map((step, index) => (
                  <li key={step} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3 text-sm leading-relaxed text-secondary">
                    <span className="label">Step {index + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            )}
            <div className="mt-4 border-t border-subtle pt-4">
              <p className="label">{labels.answer}</p>
              <p className="mt-2 text-sm leading-relaxed text-primary">{answer}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ComparisonTables({ tables }: { tables: LearningComparisonTable[] }) {
  return (
    <div className="space-y-5">
      {tables.map(table => (
        <div key={table.title}>
          <h3 className="mb-3 text-sm font-medium text-primary">{table.title}</h3>
          <div className="overflow-x-auto rounded-md border border-subtle bg-surface-raised shadow-semantic-card">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-subtle">
                  <th className="w-1/3 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted"></th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted">{table.columns[0]}</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted">{table.columns[1]}</th>
                </tr>
              </thead>
              <tbody>
                {table.rows.map(row => (
                  <tr key={row.label} className="border-b border-subtle last:border-b-0">
                    <th className="px-4 py-3 text-xs font-medium text-primary">{row.label}</th>
                    <td className="px-4 py-3 text-secondary">{row.values[0]}</td>
                    <td className="px-4 py-3 text-secondary">{row.values[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

function DiagramNoteBlocks({ notes }: { notes: LearningDiagramNote[] }) {
  return (
    <div className="space-y-4">
      {notes.map(note => (
        <div key={note.title} className="rounded-md border border-dashed border-subtle bg-surface-muted p-5">
          <p className="label">{note.title}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {note.items.map(item => (
              <span key={item} className="rounded-full border border-subtle bg-surface-raised px-3 py-1 text-xs text-secondary">{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function OfficialSources({ topic, labels, lang }: {
  topic: NonNullable<ReturnType<typeof getLocalizedLearningTopic>>
  labels: ReturnType<typeof labelsFor>
  lang: string
}) {
  return (
    <div className="space-y-3">
      {topic.references.map(reference => (
        <details
          key={`${reference.lawName}-${reference.articleNumber}-${reference.sourceType}`}
          className="rounded-md border border-subtle bg-surface-raised p-4 shadow-semantic-card"
        >
          <summary className="cursor-pointer list-none">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">{reference.originalJapaneseTitle || reference.lawName}</p>
                <p className="mt-1 text-xs leading-relaxed text-secondary">{reference.articleNumber}</p>
              </div>
              <SourceBadge sourceType={reference.sourceType} lang={lang} />
            </div>
          </summary>
          <dl className="mt-5 grid gap-4 border-t border-subtle pt-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="label">{labels.lawName}</dt>
              <dd className="mt-1 text-secondary">{reference.lawName}</dd>
            </div>
            <div>
              <dt className="label">{labels.articleNumber}</dt>
              <dd className="mt-1 text-secondary">{reference.articleNumber}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="label">{labels.sourceNote}</dt>
              <dd className="mt-1 text-secondary">{reference.note}</dd>
            </div>
            <div>
              <dt className="label">{labels.verificationState}</dt>
              <dd className="mt-1 text-secondary">
                <StatusBadge status={reference.verificationStatus} lang={lang} />
              </dd>
            </div>
            <div>
              <dt className="label">{labels.lastReviewed}</dt>
              <dd className="mt-1 text-secondary">{reference.lastReviewed || labels.notReviewed}</dd>
            </div>
            <div className="sm:col-span-2">
              <a href={reference.sourceUrl} className="inline-flex min-h-10 items-center rounded-full border border-subtle bg-surface-muted px-4 text-sm font-medium text-primary transition-colors hover:bg-surface-raised hover:text-accent" target="_blank" rel="noreferrer">
                {labels.openOfficialSource}
              </a>
            </div>
          </dl>
        </details>
      ))}
    </div>
  )
}

export default async function CodeDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const topic = getLocalizedLearningTopic(slug, lang)
  if (!topic) notFound()
  const prefix = `/${lang}`
  const labels = labelsFor(lang)
  const keyTerms = getGlossaryTermsForCodeTopic(topic.slug)
  const relatedCodeTopics = Array.from(new Set(
    keyTerms
      .map(term => term.relatedCodeTopicSlug)
      .filter((relatedSlug): relatedSlug is string => Boolean(relatedSlug && relatedSlug !== topic.slug))
  ))
    .map(relatedSlug => getLearningTopic(relatedSlug))
    .filter((relatedTopic): relatedTopic is NonNullable<ReturnType<typeof getLearningTopic>> => Boolean(relatedTopic))

  return (
    <article className="container-content pb-20 pt-8 sm:pt-16">
      <Link href={`${prefix}/code`} className="caption transition-colors hover:text-primary">← {labels.back}</Link>

      <header className="section-lg mt-8 grid gap-8 border-b border-subtle pb-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <p className="eyebrow">{labels.code}</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-primary sm:text-6xl">{topic.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">{topic.summary}</p>
        </div>
        <dl className="border-t border-subtle pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <dt className="label">{labels.japaneseTerm}</dt>
          <dd className="mt-2 text-2xl font-medium text-primary">{topic.japaneseTerm}</dd>
          <dd className="mt-1 text-sm text-muted">（{topic.reading}）</dd>
        </dl>
      </header>

      <div className="mx-auto max-w-3xl">
        <div className="-mt-8 mb-8">
          <VerificationBlock
            status={topic.verificationStatus}
            qualityLevel={topic.qualityLevel}
            lastReviewed={topic.lastReviewed}
            reviewer={topic.reviewer}
            lang={lang}
          />
        </div>

        {(topic.overview || topic.definition || topic.whyItExists) && (
          <ArticleBlock title={labels.overview} badge={<SourceBadge sourceType="editorial_explanation" lang={lang} />}>
            <div className="space-y-4">
              {topic.overview && <p className="body text-lg font-medium text-primary">{topic.overview}</p>}
              <p className="body">{topic.definition}</p>
              {topic.whyItExists && <p className="body">{topic.whyItExists}</p>}
            </div>
          </ArticleBlock>
        )}

        <ArticleBlock title={labels.examSnapshot} badge={<SourceBadge sourceType="exam_reference" lang={lang} />}>
          <ExamSnapshot items={topic.examPreparation} />
        </ArticleBlock>

        {hasCodeTopicDiagrams(topic.slug) || (topic.diagramNotes && topic.diagramNotes.length > 0) ? (
          <ArticleBlock title={labels.coreDiagram} badge={<SourceBadge sourceType="editorial_explanation" lang={lang} />}>
            <div className="space-y-5">
              <CodeTopicDiagrams topicSlug={topic.slug} lang={lang} />
              {topic.diagramNotes && topic.diagramNotes.length > 0 ? <DiagramNoteBlocks notes={topic.diagramNotes} /> : null}
            </div>
          </ArticleBlock>
        ) : null}

        {topic.formulas && topic.formulas.length > 0 && (
          <ArticleBlock title={labels.keyFormula} badge={<SourceBadge sourceType="editorial_explanation" lang={lang} />}>
            <FormulaCards formulas={topic.formulas} />
          </ArticleBlock>
        )}

        <ArticleBlock title={labels.variablesTerms} badge={<SourceBadge sourceType="editorial_explanation" lang={lang} />}>
          <VariablesAndTerms formulas={topic.formulas} keyConcepts={topic.keyConcepts} labels={labels} />
        </ArticleBlock>

        <ArticleBlock title={labels.applicabilityCheck} badge={<SourceBadge sourceType="editorial_explanation" lang={lang} />}>
          <BulletList items={topic.rules} />
        </ArticleBlock>

        {topic.calculationSteps && topic.calculationSteps.length > 0 ? (
          <ArticleBlock title={labels.calculationSteps} badge={<SourceBadge sourceType="editorial_explanation" lang={lang} />}>
            <StepList steps={topic.calculationSteps} />
          </ArticleBlock>
        ) : null}

        {topic.workedExamples && topic.workedExamples.length > 0 ? (
          <ArticleBlock title={labels.workedExamples} badge={<SourceBadge sourceType="example" lang={lang} />}>
            <WorkedExampleCards examples={topic.workedExamples} labels={labels} />
          </ArticleBlock>
        ) : null}

        <ArticleBlock title={labels.examples} badge={<SourceBadge sourceType="example" lang={lang} />}>
          <BulletList items={topic.examples} />
        </ArticleBlock>

        {topic.comparisonTables && topic.comparisonTables.length > 0 ? (
          <ArticleBlock title={labels.comparisonTable} badge={<SourceBadge sourceType="editorial_explanation" lang={lang} />}>
            <ComparisonTables tables={topic.comparisonTables} />
          </ArticleBlock>
        ) : null}

        <ArticleBlock title={labels.exam} badge={<SourceBadge sourceType="exam_reference" lang={lang} />}>
          <BulletList items={topic.examPreparation} />
        </ArticleBlock>

        <ArticleBlock title={labels.mistakes} badge={<SourceBadge sourceType="editorial_explanation" lang={lang} />}>
          <BulletList items={topic.commonMistakes} />
        </ArticleBlock>

        {topic.memoryTips && topic.memoryTips.length > 0 ? (
          <ArticleBlock title={labels.memoryTips} badge={<SourceBadge sourceType="exam_reference" lang={lang} />}>
            <BulletList items={topic.memoryTips} />
          </ArticleBlock>
        ) : null}

        {keyTerms.length > 0 && (
          <ArticleBlock title={labels.relatedGlossary}>
            <div className="flex flex-wrap gap-2">
              {keyTerms.map(term => {
                const title = getGlossaryTermTitle(term, lang)
                const label = lang === 'ja' || title === term.termJa ? term.termJa : `${title} / ${term.termJa}`
                return (
                  <Link
                    key={term.id}
                    href={`${prefix}/glossary?term=${encodeURIComponent(term.slug)}`}
                    className="inline-flex min-h-9 items-center rounded-full border border-subtle bg-surface-muted px-3 text-xs font-medium text-secondary transition-colors hover:bg-surface-raised hover:text-primary"
                  >
                    {label}
                  </Link>
                )
              })}
            </div>
          </ArticleBlock>
        )}

        {relatedCodeTopics.length > 0 && (
          <ArticleBlock title={labels.relatedCodeTopics}>
            <div className="grid gap-3 sm:grid-cols-2">
              {relatedCodeTopics.map(relatedTopic => (
                <Link
                  key={relatedTopic.slug}
                  href={`${prefix}/code/${relatedTopic.slug}`}
                  className="rounded-md border border-subtle bg-surface-raised p-4 text-sm font-medium text-primary shadow-semantic-card transition-colors hover:bg-surface-muted hover:text-accent"
                >
                  {relatedTopic.japaneseTerm}
                </Link>
              ))}
            </div>
          </ArticleBlock>
        )}

        <ArticleBlock title={labels.reading}>
          <ul className="space-y-2 text-sm text-secondary">
            {topic.furtherReading.map(item => <li key={item}>{item}</li>)}
          </ul>
        </ArticleBlock>

        <ArticleBlock title={labels.officialSource}>
          <OfficialSources topic={topic} labels={labels} lang={lang} />
        </ArticleBlock>

        <div className="mt-8 rounded-md border border-subtle bg-surface-muted p-4">
          <p className="text-sm font-medium text-primary">{labels.disclaimerTitle}</p>
          <p className="mt-2 text-xs leading-relaxed text-secondary">{labels.disclaimerBody}</p>
        </div>
      </div>
    </article>
  )
}
