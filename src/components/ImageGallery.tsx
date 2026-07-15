'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import type { BuildingImage } from '@/lib/types'
import { tImageType } from '@/lib/i18n'
import GalleryMainImage from '@/components/image-gallery/GalleryMainImage'
import Lightbox from '@/components/image-gallery/Lightbox'
import ThumbnailStrip from '@/components/image-gallery/ThumbnailStrip'
import { getImageGalleryLabels } from '@/components/image-gallery/labels'

interface ImageGalleryProps {
  images: BuildingImage[]
  alt: string
  lang: string
  reviewedNoSafeImage?: boolean
}

export function shouldRenderNoSafeImageState(imagesLength: number, reviewedNoSafeImage: boolean) {
  return imagesLength === 0 && reviewedNoSafeImage
}

export default function ImageGallery({ images, alt, lang, reviewedNoSafeImage = false }: ImageGalleryProps) {
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

  if (!images.length) {
    if (!shouldRenderNoSafeImageState(images.length, reviewedNoSafeImage)) return null

    const labels = getImageGalleryLabels(lang)
    return (
      <section data-testid="no-safe-image-state" aria-label={labels.noSafeImageTitle} className="border-y border-subtle px-4 py-8 text-center sm:px-6 sm:py-10">
        <p className="eyebrow">{labels.noSafeImageTitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-secondary">{labels.noSafeImageDescription}</p>
      </section>
    )
  }

  const labels = getImageGalleryLabels(lang)
  const current = images[active]
  const hasError = errors[active]
  const typeLabel = tImageType(lang, current.img_type)
  return (
    <>
      <GalleryMainImage
        current={current}
        alt={alt}
        typeLabel={typeLabel}
        sourceLabel={labels.sourceLabel}
        unavailableLabel={labels.unavailableLabel}
        viewLabel={labels.viewLabel}
        hasError={hasError}
        loaded={loaded[active]}
        priority={active === 0}
        onOpen={() => setLightbox(true)}
        onLoad={() => setLoaded(l => ({ ...l, [active]: true }))}
        onError={() => setErrors(e => ({ ...e, [active]: true }))}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      />

      <ThumbnailStrip
        images={images}
        active={active}
        imageLabel={labels.imageLabel}
        photosLabel={labels.photosLabel}
        onSelect={setActive}
      />

      {lightbox && (
        <Lightbox
          images={images}
          current={current}
          active={active}
          alt={alt}
          sourceLabel={labels.sourceLabel}
          closeLabel={labels.closeLabel}
          previousLabel={labels.previousLabel}
          nextLabel={labels.nextLabel}
          keyboardHint={labels.keyboardHint}
          setLightbox={setLightbox}
          prev={prev}
          next={next}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      )}
    </>
  )
}
