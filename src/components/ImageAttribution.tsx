export default function ImageAttribution({
  photographer,
  license,
  sourceUrl,
  tone = 'light',
  lang = 'en',
}: {
  photographer?: string | null
  license?: string | null
  sourceUrl?: string | null
  tone?: 'light' | 'dark'
  lang?: string
}) {
  if (!photographer && !license && !sourceUrl) return null

  const sourceLabel = lang === 'ja' ? '出典' : lang === 'zh' ? '来源' : 'Source'
  const textClass = tone === 'light'
    ? 'text-paper-100/56 hover:text-paper-100'
    : 'text-muted hover:text-accent'

  const content = (
    <>
      {photographer && <span>{photographer}</span>}
      {photographer && license && <span> · </span>}
      {license && <span>{license}</span>}
      {(photographer || license) && sourceUrl && <span> · </span>}
      {sourceUrl && <span className="underline underline-offset-2">{sourceLabel}</span>}
    </>
  )

  if (sourceUrl) {
    return (
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-[0.68rem] leading-relaxed transition-colors ${textClass}`}
      >
        {content}
      </a>
    )
  }

  return (
    <p className={`text-[0.68rem] leading-relaxed ${textClass}`}>
      {content}
    </p>
  )
}
