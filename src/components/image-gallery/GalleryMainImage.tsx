import type { TouchEvent } from 'react'
import SafeImage from '@/components/SafeImage'
import type { BuildingImage } from '@/lib/types'
import ImageSkeleton from './ImageSkeleton'

interface GalleryMainImageProps {
  current: BuildingImage
  alt: string
  typeLabel: string
  sourceLabel: string
  unavailableLabel: string
  viewLabel: string
  hasError: boolean | undefined
  loaded: boolean | undefined
  priority?: boolean
  onOpen: () => void
  onLoad: () => void
  onError: () => void
  onTouchStart: (event: TouchEvent<HTMLDivElement>) => void
  onTouchEnd: (event: TouchEvent<HTMLDivElement>) => void
}

export default function GalleryMainImage({
  current,
  alt,
  typeLabel,
  sourceLabel,
  unavailableLabel,
  viewLabel,
  hasError,
  loaded,
  priority = false,
  onOpen,
  onLoad,
  onError,
  onTouchStart,
  onTouchEnd,
}: GalleryMainImageProps) {
  return (
    <div className="mb-3">
      <button
        type="button"
        onClick={() => !hasError && onOpen()}
        className={`group block w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 ${hasError ? 'cursor-default' : 'cursor-zoom-in'}`}
        aria-label={viewLabel}
      >
        <div
          className={`image-frame w-full rounded-lg ${
            hasError ? 'h-36 sm:h-44' : 'aspect-[16/9] sm:aspect-[2/1]'
          }`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {hasError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-warm-100 dark:bg-charcoal-900">
              <div className="px-6 text-center">
                <svg className="mx-auto h-8 w-8 text-warm-500 dark:text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M4 19h16M6 16V8l6-3 6 3v8M9 16v-4h6v4" />
                </svg>
                <p className="mt-2 text-sm text-warm-600 dark:text-warm-300">{unavailableLabel}</p>
              </div>
            </div>
          ) : (
            <>
              {!loaded && <ImageSkeleton />}
              <SafeImage
                src={current.url_original}
                alt={`${alt} — ${typeLabel || ''}`}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, 800px"
                className={`image-zoom object-cover ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={onLoad}
                onError={onError}
              />
            </>
          )}
        </div>
      </button>

      <div className="mt-2 flex items-center justify-between gap-3 text-xs text-stone-400">
        <span className="min-w-0">
          {typeLabel && <span className="font-medium text-stone-500">{typeLabel}</span>}
          {current.photographer && (
            <> · {current.photographer}</>
          )}
          {current.license && <> &middot; {current.license}</>}
        </span>
        {current.source_url && (
          <a
            href={current.source_url}
            className="shrink-0 underline underline-offset-2 hover:text-stone-600 dark:hover:text-stone-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            {sourceLabel}
          </a>
        )}
      </div>
    </div>
  )
}
