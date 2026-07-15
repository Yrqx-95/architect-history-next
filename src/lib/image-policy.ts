import type { BuildingImage } from '@/lib/types'

const TRUSTED_SOURCES = new Set([
  'Wikimedia Commons',
  'Museum Open Access',
  'IIIF',
  'Local Curated',
])

const ACCEPTED_LICENSE_PREFIXES = [
  'CC0',
  'Public domain',
  'CC BY',
  'CC BY-SA',
]

const LOW_CONFIDENCE_SOURCES = new Set([
  'Unsplash',
  'Pexels',
])

// Reviewed content-trust decisions can explicitly suppress every image path
// when the current primary and supporting rows are not safe representations of
// the building. Keep this policy centralized so callers cannot accidentally
// resurrect a rejected DB primary through a local override or gallery fallback.
const NO_SAFE_PRIMARY_IMAGE_SLUGS = new Set(['parc1'])

export function isAcceptedOpenLicense(license?: string | null) {
  if (!license) return false
  return ACCEPTED_LICENSE_PREFIXES.some(prefix => {
    if (!license.startsWith(prefix)) return false
    const after = license.slice(prefix.length)
    // Accept exact match or word-boundary; reject "CC BY-NC" matching "CC BY"
    return after === '' || after.startsWith(' ')
  })
}

export function isTrustedImageSource(source?: string | null) {
  return Boolean(source && TRUSTED_SOURCES.has(source))
}

export function isLowConfidenceImageSource(source?: string | null) {
  return Boolean(source && LOW_CONFIDENCE_SOURCES.has(source))
}

export function hasNoSafePrimaryImage(slug?: string | null) {
  return Boolean(slug && NO_SAFE_PRIMARY_IMAGE_SLUGS.has(slug))
}

export function shouldSuppressBuildingCover(slug?: string | null) {
  return hasNoSafePrimaryImage(slug)
}

export function resolveBuildingGalleryImages({
  slug,
  images,
  curatedCoverImage,
}: {
  slug: string
  images: BuildingImage[]
  curatedCoverImage: BuildingImage | null
}) {
  if (hasNoSafePrimaryImage(slug)) return []

  const curatedCoverUrl = curatedCoverImage?.url_original
  const supportingImages = images
    .filter(image => image.url_original !== curatedCoverUrl)
    .filter(image => image.source !== 'Unsplash' || !curatedCoverImage)

  return curatedCoverImage ? [curatedCoverImage] : supportingImages.slice(0, 1)
}

export function isTrustedEditorialImage(image: {
  source?: string | null
  license?: string | null
  source_url?: string | null
  cover_source_url?: string | null
}) {
  const sourceUrl = image.source_url || image.cover_source_url
  return isTrustedImageSource(image.source) &&
    isAcceptedOpenLicense(image.license) &&
    Boolean(sourceUrl)
}
