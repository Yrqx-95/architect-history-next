import type { SourceType } from '@/lib/learning-topics'

type SourceBadgeType = SourceType | 'example'

const SOURCE_LABELS: Record<string, Record<SourceBadgeType, string>> = {
  zh: {
    official_source: '官方来源',
    government_guide: '政府资料',
    editorial_explanation: '学习说明',
    exam_reference: '考试参考',
    example: '示例',
  },
  en: {
    official_source: 'Official Source',
    government_guide: 'Government Guide',
    editorial_explanation: 'Editorial Explanation',
    exam_reference: 'Exam Reference',
    example: 'Example',
  },
  ja: {
    official_source: '公式情報',
    government_guide: '行政資料',
    editorial_explanation: '学習解説',
    exam_reference: '試験参考',
    example: '例',
  },
}

function labelsFor(lang?: string) {
  return SOURCE_LABELS[lang || 'en'] || SOURCE_LABELS.en
}

export function getSourceTypeLabel(sourceType: SourceBadgeType, lang = 'en') {
  return labelsFor(lang)[sourceType]
}

export default function SourceBadge({ sourceType, lang = 'en' }: { sourceType: SourceBadgeType; lang?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-subtle bg-surface-raised px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-muted">
      {getSourceTypeLabel(sourceType, lang)}
    </span>
  )
}
