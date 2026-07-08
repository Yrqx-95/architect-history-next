export const EXTERNAL_IMAGE_DOMAINS = [
  'images.unsplash.com',
  'plus.unsplash.com',
  'upload.wikimedia.org',
  'commons.wikimedia.org',
] as const

export function isExternalImageHost(host: string): boolean {
  return EXTERNAL_IMAGE_DOMAINS.some(domain => host === domain || host.endsWith('.' + domain))
}
