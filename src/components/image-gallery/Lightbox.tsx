import type { Dispatch, SetStateAction, TouchEvent } from 'react'
import SafeImage from '@/components/SafeImage'
import type { BuildingImage } from '@/lib/types'

interface LightboxProps {
  images: BuildingImage[]
  current: BuildingImage
  active: number
  alt: string
  sourceLabel: string
  closeLabel: string
  previousLabel: string
  nextLabel: string
  keyboardHint: string
  setLightbox: Dispatch<SetStateAction<boolean>>
  prev: () => void
  next: () => void
  onTouchStart: (event: TouchEvent<HTMLDivElement>) => void
  onTouchEnd: (event: TouchEvent<HTMLDivElement>) => void
}

export default function Lightbox({
  images,
  current,
  active,
  alt,
  sourceLabel,
  closeLabel,
  previousLabel,
  nextLabel,
  keyboardHint,
  setLightbox,
  prev,
  next,
  onTouchStart,
  onTouchEnd,
}: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in duration-200"
      onClick={() => setLightbox(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3">
        <span className="text-white/50 text-sm tabular-nums">
          {active + 1} / {images.length}
        </span>
        <button
          onClick={() => setLightbox(false)}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label={closeLabel}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="relative w-full h-full flex items-center justify-center px-4" onClick={e => e.stopPropagation()}>
        <SafeImage
          src={current.url_original}
          alt={alt}
          width={1920}
          height={1080}
          className="max-w-full max-h-[85vh] object-contain select-none"
          priority
          draggable={false}
        />
      </div>

      {current.photographer && (
        <div className="absolute bottom-8 left-4 text-white/40 text-xs">
          {current.photographer}
          {current.license && <> &middot; {current.license}</>}
          {current.source_url && (
            <> &middot; <a href={current.source_url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/70">{sourceLabel}</a></>
          )}
        </div>
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors"
            aria-label={previousLabel}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors"
            aria-label={nextLabel}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/30 text-xs hidden sm:block">
        {keyboardHint}
      </div>
    </div>
  )
}
