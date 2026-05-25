const EXTERNAL_HOSTS = [
  'images.unsplash.com',
  'upload.wikimedia.org',
  'commons.wikimedia.org',
]

export function isExternalImage(src: string): boolean {
  try {
    const host = new URL(src).hostname
    return EXTERNAL_HOSTS.some(h => host === h || host.endsWith('.' + h))
  } catch {
    return false
  }
}

/** Wrap external image URLs through our proxy API for China-accessible delivery. */
export function proxySrc(src: string, width = 1200): string {
  if (!isExternalImage(src)) return src
  const params = new URLSearchParams({ url: src, w: String(width) })
  return `/api/image-proxy?${params.toString()}`
}
