import SafeImage from '@/components/SafeImage'

/** Full-bleed image that interrupts reading flow. Cinematic pause. */
export default function ImageBreak({
  src, alt, caption, photographer, license, sourceUrl
}: {
  src: string
  alt: string
  caption?: string | null
  photographer?: string | null
  license?: string | null
  sourceUrl?: string | null
}) {
  return (
    <figure className="my-10 sm:my-16 -mx-3 sm:-mx-4 lg:-mx-8">
      <div className="relative w-full aspect-[21/9] sm:aspect-[2/1] rounded-none sm:rounded-lg overflow-hidden">
        <SafeImage
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      {(caption || photographer) && (
        <figcaption className="container-read mt-3 caption">
          {caption && <span>{caption}</span>}
          {photographer && <span> &mdash; {photographer}</span>}
          {license && <span> &middot; {license}</span>}
          {sourceUrl && (
            <> &middot; <a href={sourceUrl} className="underline hover:text-warm-600 dark:hover:text-warm-300" target="_blank" rel="noopener noreferrer">Source</a></>
          )}
        </figcaption>
      )}
    </figure>
  )
}
