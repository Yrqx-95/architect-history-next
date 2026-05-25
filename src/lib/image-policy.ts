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
