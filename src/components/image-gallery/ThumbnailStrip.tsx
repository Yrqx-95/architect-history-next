import SafeImage from '@/components/SafeImage'
import type { BuildingImage } from '@/lib/types'

interface ThumbnailStripProps {
  images: BuildingImage[]
  active: number
  imageLabel: string
  photosLabel: string
  onSelect: (index: number) => void
}

export default function ThumbnailStrip({ images, active, imageLabel, photosLabel, onSelect }: ThumbnailStripProps) {
  if (images.length <= 1) return null

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
      {images.map((img, i) => (
        <button
          key={img.id}
          onClick={() => onSelect(i)}
          className={`image-frame shrink-0 h-12 w-16 rounded focus:outline-none
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
            className="image-zoom h-full w-full object-cover"
          />
        </button>
      ))}
      <span className="shrink-0 self-center ml-2 text-xs text-stone-400 tabular-nums">
        {images.length} {photosLabel}
      </span>
    </div>
  )
}
