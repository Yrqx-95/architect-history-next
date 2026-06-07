'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import SafeImage from '@/components/SafeImage'
import type { BuildingImage } from '@/lib/types'
import { tImageType } from '@/lib/i18n'

interface ImageGalleryProps {
  images: BuildingImage[]
  alt: string
  lang: string
}

function Skeleton() {
  return (
    <div className="absolute inset-0 animate-pulse bg-warm-200 dark:bg-charcoal-800" />
  )
}

export default function ImageGallery({ images, alt, lang }: ImageGalleryProps) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})
  const [errors, setErrors] = useState<Record<number, boolean>>({})
  const touchStart = useRef<number | null>(null)

  const prev = useCallback(() => {
    setActive(i => (i > 0 ? i - 1 : images.length - 1))
  }, [images.length])

  const next = useCallback(() => {
    setActive(i => (i < images.length - 1 ? i + 1 : 0))
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightbox, prev, next])

  // Lock scroll during lightbox
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  // Touch swipe for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return
    const diff = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev()
      else next()
    }
    touchStart.current = null
  }

  if (!images.length) return null

  const current = images[active]
  const hasError = errors[active]
  const typeLabel = tImageType(lang, current.img_type)
  const sourceLabel = lang === 'ja' ? '出典' : lang === 'zh' ? '来源' : 'Source'
  const unavailableLabel = lang === 'ja' ? '画像はありません' : lang === 'zh' ? '图片暂不可用' : 'Image unavailable'
  const viewLabel = lang === 'ja' ? '画像を拡大' : lang === 'zh' ? '查看大图' : 'View full size'
  const imageLabel = lang === 'ja' ? '画像' : lang === 'zh' ? '图片' : 'Image'
  const photosLabel = lang === 'ja' ? '枚' : lang === 'zh' ? '张图片' : 'photos'
  const closeLabel = lang === 'ja' ? '閉じる' : lang === 'zh' ? '关闭' : 'Close'
  const previousLabel = lang === 'ja' ? '前の画像' : lang === 'zh' ? '上一张图片' : 'Previous image'
  const nextLabel = lang === 'ja' ? '次の画像' : lang === 'zh' ? '下一张图片' : 'Next image'
  const keyboardHint = lang === 'ja'
    ? '← → で移動 · Esc で閉じる'
    : lang === 'zh'
      ? '← → 切换 · Esc 关闭'
      : '← → to navigate · Esc to close'

  return (
    <>
      {/* Main image */}
      <div className="mb-3">
        <button
          onClick={() => !hasError && setLightbox(true)}
          className={`block w-full overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 ${hasError ? 'cursor-default' : 'cursor-zoom-in'}`}
          aria-label={viewLabel}
        >
          <div
            className={`relative w-full overflow-hidden rounded-lg bg-warm-100 dark:bg-charcoal-900 ${
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
                {!loaded[active] && <Skeleton />}
                <SafeImage
                  src={current.url_original}
                  alt={`${alt} — ${typeLabel || ''}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className={`object-cover transition-opacity duration-300 ${
                    loaded[active] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setLoaded(l => ({ ...l, [active]: true }))}
                  onError={() => setErrors(e => ({ ...e, [active]: true }))}
                />
              </>
            )}
          </div>
        </button>

        {/* Image credit */}
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

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              className={`shrink-0 w-16 h-12 rounded overflow-hidden transition-all duration-150 focus:outline-none
                ${i === active
                  ? 'ring-2 ring-warm-500 dark:ring-warm-400 opacity-100 scale-105'
                  : 'opacity-50 hover:opacity-80 hover:scale-105'
                }`}
              aria-label={`${imageLabel} ${i + 1}`}
            >
              <SafeImage
                src={img.url_original}
                alt=""
                width={64}
                height={48}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
          {/* Image count badge */}
          <span className="shrink-0 self-center ml-2 text-xs text-stone-400 tabular-nums">
            {images.length} {photosLabel}
          </span>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in duration-200"
          onClick={() => setLightbox(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Top bar */}
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

          {/* Image */}
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

          {/* Credit */}
          {current.photographer && (
            <div className="absolute bottom-8 left-4 text-white/40 text-xs">
              {current.photographer}
              {current.license && <> &middot; {current.license}</>}
              {current.source_url && (
                <> &middot; <a href={current.source_url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/70">{sourceLabel}</a></>
              )}
            </div>
          )}

          {/* Prev / Next */}
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

          {/* Keyboard hint */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/30 text-xs hidden sm:block">
            {keyboardHint}
          </div>
        </div>
      )}
    </>
  )
}
