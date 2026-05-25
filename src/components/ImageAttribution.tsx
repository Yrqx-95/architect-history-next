export default function ImageAttribution({
  photographer,
  license,
  sourceUrl,
  tone = 'light',
}: {
  photographer?: string | null
  license?: string | null
  sourceUrl?: string | null
  tone?: 'light' | 'dark'
}) {
  if (!photographer && !license && !sourceUrl) return null

  const textClass = tone === 'light'
    ? 'text-paper-100/56 hover:text-paper-100'
    : 'text-warm-600 hover:text-warm-800 dark:text-warm-300 dark:hover:text-paper-100'

  const content = (
    <>
      {photographer && <span>{photographer}</span>}
      {photographer && license && <span> · </span>}
      {license && <span>{license}</span>}
      {(photographer || license) && sourceUrl && <span> · </span>}
      {sourceUrl && <span className="underline underline-offset-2">Source</span>}
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
