export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const q = quality || 85

  // For external images, proxy through our API to ensure accessibility
  if (
    src.includes('images.unsplash.com') ||
    src.includes('upload.wikimedia.org') ||
    src.includes('commons.wikimedia.org')
  ) {
    const params = new URLSearchParams({ url: src, w: String(width) })
    return `/api/image-proxy?${params.toString()}`
  }

  // For local images, use Next.js built-in optimization
  if (src.startsWith('/') || src.startsWith('_next')) {
    // Let Next.js handle local images normally
    const params = new URLSearchParams({
      url: src,
      w: String(width),
      q: String(q),
    })
    return `/_next/image?${params.toString()}`
  }

  return src
}
