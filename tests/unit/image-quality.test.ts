import { describe, expect, it } from 'vitest'
import { isDisplayableImageUrl } from '@/lib/data'
import { isExternalImageHost } from '@/lib/image-domains'

describe('image safety helpers', () => {
  it('allows configured external image hosts and subdomains only', () => {
    expect(isExternalImageHost('images.unsplash.com')).toBe(true)
    expect(isExternalImageHost('upload.wikimedia.org')).toBe(true)
    expect(isExternalImageHost('static.upload.wikimedia.org')).toBe(true)
    expect(isExternalImageHost('example.com')).toBe(false)
    expect(isExternalImageHost('upload.wikimedia.org.example.com')).toBe(false)
  })

  it('rejects known non-displayable image URLs', () => {
    expect(isDisplayableImageUrl('https://upload.wikimedia.org/file.ogg')).toBe(false)
    expect(isDisplayableImageUrl('https://upload.wikimedia.org/floorplan.svg')).toBe(false)
    expect(isDisplayableImageUrl('/images/curated/fileicon-ogg.png')).toBe(false)
    expect(isDisplayableImageUrl('/images/curated/european-court-of-human-rights-1024.jpg')).toBe(false)
    expect(isDisplayableImageUrl('/images/curated/villa_savoye.jpg')).toBe(false)
  })

  it('allows ordinary local and remote image URLs', () => {
    expect(isDisplayableImageUrl('/images/curated/villa-savoye-exterior-1024.jpg')).toBe(true)
    expect(isDisplayableImageUrl('https://images.unsplash.com/photo-123.jpg?w=1200')).toBe(true)
  })
})
