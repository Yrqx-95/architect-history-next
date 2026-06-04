import type { ContentStatus } from '@/lib/learning-topics'

const STATUS_LABELS: Record<string, Record<ContentStatus, string>> = {
  zh: {
    draft: '草稿',
    reviewed: '已审查',
    verified: '已验证',
  },
  en: {
    draft: 'Draft',
    reviewed: 'Reviewed',
    verified: 'Verified',
  },
  ja: {
    draft: '下書き',
    reviewed: 'レビュー済み',
    verified: '検証済み',
  },
}

const STATUS_CLASSES: Record<ContentStatus, string> = {
  draft: 'border-subtle bg-surface-muted text-muted',
  reviewed: 'border-default bg-surface-raised text-secondary',
  verified: 'border-default bg-[color:var(--ui-text-primary)] text-inverse',
}

function labelsFor(lang?: string) {
  return STATUS_LABELS[lang || 'en'] || STATUS_LABELS.en
}

export function getStatusLabel(status: ContentStatus, lang = 'en') {
  return labelsFor(lang)[status]
}

export default function StatusBadge({ status, lang = 'en' }: { status: ContentStatus; lang?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.08em] ${STATUS_CLASSES[status]}`}>
      {getStatusLabel(status, lang)}
    </span>
  )
}
