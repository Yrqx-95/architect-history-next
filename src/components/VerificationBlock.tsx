import type { ContentStatus, QualityLevel } from '@/lib/learning-topics'
import StatusBadge from '@/components/StatusBadge'

type VerificationBlockProps = {
  status: ContentStatus
  qualityLevel: QualityLevel
  lastReviewed?: string
  reviewer?: string
  lang: string
}

const COPY = {
  zh: {
    status: '状态',
    quality: '质量',
    lastReviewed: '最后审查',
    reviewer: '审查人',
    notReviewed: '未审查',
    educationalDraft: '此主题目前为学习用草稿，不应作为法律判断依据。',
    qualityLabels: {
      basic: '基础',
      standard: '标准',
      high: '高级',
    },
  },
  en: {
    status: 'Status',
    quality: 'Quality',
    lastReviewed: 'Last Reviewed',
    reviewer: 'Reviewer',
    notReviewed: 'Not Reviewed',
    educationalDraft: 'This topic is currently an educational draft and should not be used as a legal determination.',
    qualityLabels: {
      basic: 'Basic',
      standard: 'Standard',
      high: 'High',
    },
  },
  ja: {
    status: 'ステータス',
    quality: '品質',
    lastReviewed: '最終レビュー',
    reviewer: 'レビュー担当',
    notReviewed: '未レビュー',
    educationalDraft: 'このテーマは現在、学習用の下書きです。法的判断の根拠として使用しないでください。',
    qualityLabels: {
      basic: '基本',
      standard: '標準',
      high: '高度',
    },
  },
}

function copyFor(lang: string) {
  return COPY[lang as keyof typeof COPY] || COPY.en
}

export default function VerificationBlock({ status, qualityLevel, lastReviewed, reviewer, lang }: VerificationBlockProps) {
  const copy = copyFor(lang)
  return (
    <aside className="border-y border-subtle px-2 py-4">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={status} lang={lang} />
        <span className="rounded-full border border-subtle px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-muted">
          {copy.quality}: {copy.qualityLabels[qualityLevel]}
        </span>
        <span className="rounded-full border border-subtle px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-muted">
          {copy.lastReviewed}: {lastReviewed || copy.notReviewed}
        </span>
        {reviewer && (
          <span className="rounded-full border border-subtle px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-muted">
            {copy.reviewer}: {reviewer}
          </span>
        )}
      </div>
      {status === 'draft' && <p className="mt-3 text-xs leading-relaxed text-muted">{copy.educationalDraft}</p>}
    </aside>
  )
}
