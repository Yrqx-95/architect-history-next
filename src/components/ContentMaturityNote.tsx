type ContentMaturityNoteProps = {
  lang: string
  subject: 'building' | 'architect'
}

const COPY = {
  building: {
    zh: '内容状态：入门导读。此页部分分析由现有元数据整理，用于帮助开始阅读，尚未完成逐条来源核查。',
    en: 'Content status: introductory guide. Parts of this page are assembled from existing metadata to support initial reading and have not yet received claim-by-claim source review.',
    ja: 'コンテンツ状態：入門ガイド。このページの一部は既存メタデータから読解の手がかりとして構成されており、記述ごとの出典確認はまだ完了していません。',
  },
  architect: {
    zh: '内容状态：入门导读。当前人物说明用于快速定位其生涯与作品，尚未完成逐条来源核查。',
    en: 'Content status: introductory guide. This profile provides initial orientation to the architect and their works and has not yet received claim-by-claim source review.',
    ja: 'コンテンツ状態：入門ガイド。この人物紹介は経歴と作品を把握するための案内であり、記述ごとの出典確認はまだ完了していません。',
  },
} as const

export default function ContentMaturityNote({ lang, subject }: ContentMaturityNoteProps) {
  const localized = COPY[subject][lang as 'zh' | 'en' | 'ja'] || COPY[subject].en

  return (
    <aside
      aria-label={lang === 'zh' ? '内容状态' : lang === 'ja' ? 'コンテンツ状態' : 'Content status'}
      className="mt-5 max-w-3xl border-l-2 border-[color:var(--ui-border)] pl-4 text-xs leading-6 text-muted"
      data-testid="content-maturity-note"
    >
      {localized}
    </aside>
  )
}
