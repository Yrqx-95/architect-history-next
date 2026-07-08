import SafeImage from '@/components/SafeImage'

/** Full-bleed image that interrupts reading flow. Cinematic pause. */
export default function ImageBreak({
  src, alt, caption, photographer, license, sourceUrl, lang = 'en'
}: {
  src: string
  alt: string
  caption?: string | null
  photographer?: string | null
  license?: string | null
  sourceUrl?: string | null
  lang?: string
}) {
  const sourceLabel = lang === 'ja' ? '出典' : lang === 'zh' ? '来源' : 'Source'

  return (
    <figure className="group my-10 -mx-3 sm:my-16 sm:-mx-4 lg:-mx-8">
      <div className="image-frame aspect-[21/9] w-full rounded-none sm:aspect-[2/1] sm:rounded-lg">
        <SafeImage
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="image-zoom object-cover"
        />
      </div>
      {(caption || photographer) && (
        <figcaption className="container-read mt-3 caption">
          {caption && <span>{caption}</span>}
          {photographer && <span> &mdash; {photographer}</span>}
          {license && <span> &middot; {license}</span>}
          {sourceUrl && (
            <> &middot; <a href={sourceUrl} className="underline hover:text-warm-600 dark:hover:text-warm-300" target="_blank" rel="noopener noreferrer">{sourceLabel}</a></>
          )}
        </figcaption>
      )}
    </figure>
  )
}
