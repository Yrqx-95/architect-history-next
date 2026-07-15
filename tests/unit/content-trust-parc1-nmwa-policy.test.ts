import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import localImageOverrides from '@/lib/local-image-overrides.json'
import ImageGallery, { shouldRenderNoSafeImageState } from '@/components/ImageGallery'
import {
  hasNoSafePrimaryImage,
  resolveBuildingGalleryImages,
  shouldSuppressBuildingCover,
} from '@/lib/image-policy'

const dataSource = readFileSync('src/lib/data.ts', 'utf8')
const homeSource = readFileSync('src/app/[lang]/home-data.ts', 'utf8')
const browseSource = readFileSync('src/app/[lang]/browse/buildings/page.tsx', 'utf8')
const detailSource = readFileSync('src/app/[lang]/building/[slug]/page.tsx', 'utf8')
const gallerySource = readFileSync('src/components/ImageGallery.tsx', 'utf8')
const galleryMainSource = readFileSync('src/components/image-gallery/GalleryMainImage.tsx', 'utf8')
const migrationSource = readFileSync('supabase/migrations/20260715033636_content_trust_parc1_nmwa_001.sql', 'utf8')
const applySource = readFileSync('db/manual-operations/content-trust-parc1-nmwa-001-apply.sql', 'utf8')
const rollbackSource = readFileSync('db/manual-operations/content-trust-parc1-nmwa-001-rollback.sql', 'utf8')
const decisionArtifact = JSON.parse(readFileSync('db/review-decisions/content-trust-parc1-nmwa-001.json', 'utf8')) as {
  scope: string[]
  production_write: { applied: boolean; database_write_performed: boolean; release_or_deploy_performed: boolean }
}

const parcImage = {
  id: 'parc-image',
  building_id: 'parc1',
  url_original: 'https://example.com/parc.jpg',
  url_thumb_400: null,
  photographer: 'Example',
  source: 'Wikimedia Commons',
  license: 'CC BY 2.0',
  source_url: 'https://example.com/source',
  img_type: 'exterior',
  is_primary: true,
} as const

const ordinaryImage = { ...parcImage, id: 'ordinary-image', building_id: 'ordinary-building' } as const

function renderGallery(
  images: typeof ordinaryImage[] = [ordinaryImage],
  reviewedNoSafeImage = false,
  lang = 'en',
) {
  return renderToStaticMarkup(
    createElement(ImageGallery, {
      images,
      alt: 'Ordinary building',
      lang,
      reviewedNoSafeImage,
    }),
  )
}

describe('Parc.1 no-safe-primary-image policy', () => {
  it('marks only the reviewed slug as image-suppressed', () => {
    expect(hasNoSafePrimaryImage('parc1')).toBe(true)
    expect(shouldSuppressBuildingCover('parc1')).toBe(true)
    expect(hasNoSafePrimaryImage('national-museum-of-western-art')).toBe(false)
  })

  it('does not allow a curated, database, or supporting image to reappear in the gallery', () => {
    expect(resolveBuildingGalleryImages({
      slug: 'parc1',
      images: [parcImage],
      curatedCoverImage: parcImage,
    })).toEqual([])
  })

  it('keeps the normal non-empty gallery resolver behavior for other buildings', () => {
    expect(resolveBuildingGalleryImages({
      slug: 'ordinary-building',
      images: [ordinaryImage],
      curatedCoverImage: null,
    })).toEqual([ordinaryImage])
  })

  it('removes the local override and keeps cover consumers on the shared suppression path', () => {
    expect(localImageOverrides).not.toHaveProperty('parc1')
    expect(dataSource).toContain('shouldSuppressBuildingCover')
    expect(dataSource).toContain('const override = suppressCover ? null')
    expect(homeSource).toContain('selectFeaturedBuildingsWithCovers')
    expect(browseSource).toContain('getBuildingsWithCovers')
    expect(detailSource).toContain('resolveBuildingGalleryImages')
    expect(detailSource).not.toContain('supportingImages.slice(0, 1)')
  })

  it('requires explicit reviewed suppression before rendering the no-safe empty state', () => {
    expect(gallerySource).toContain('reviewedNoSafeImage?: boolean')
    expect(gallerySource).toContain('shouldRenderNoSafeImageState(images.length, reviewedNoSafeImage)')
    expect(gallerySource).toContain('data-testid="no-safe-image-state"')
    expect(gallerySource).toContain('aria-label={labels.noSafeImageTitle}')
    expect(gallerySource).toContain('labels.noSafeImageDescription')
    expect(detailSource).toContain('const reviewedNoSafeImage = hasNoSafePrimaryImage(building.slug)')
    expect(detailSource).toContain('reviewedNoSafeImage={reviewedNoSafeImage}')
  })

  it('distinguishes ordinary empty, reviewed empty, and non-empty gallery states', () => {
    expect(shouldRenderNoSafeImageState(0, false)).toBe(false)
    expect(shouldRenderNoSafeImageState(0, true)).toBe(true)
    expect(shouldRenderNoSafeImageState(1, true)).toBe(false)
  })

  it('keeps the gallery trigger as a native button for pointer and keyboard activation', () => {
    expect(galleryMainSource).toContain('<button')
    expect(galleryMainSource).toContain('type="button"')
    expect(galleryMainSource).toContain('const openIfAvailable = () =>')
    expect(galleryMainSource).toContain('if (!hasError) onOpen()')
    expect(galleryMainSource).toContain('const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) =>')
    expect(galleryMainSource).toContain("if (event.key !== 'Enter' && event.key !== ' ') return")
    expect(galleryMainSource).toContain('event.preventDefault()')
    expect(galleryMainSource).toContain('onClick={openIfAvailable}')
    expect(galleryMainSource).toContain('onKeyDown={handleKeyDown}')
  })

  it('renders the normal gallery for non-empty images, even with the reviewed flag set', () => {
    const markup = renderGallery([ordinaryImage], true)

    expect(markup).toContain('aria-label="View full size"')
    expect(markup).toContain('Ordinary building')
    expect(markup).toContain('Example')
    expect(markup).toContain('Source')
    expect(markup).not.toContain('no-safe-image-state')
  })

  it('does not render a reviewed no-safe state for an ordinary empty gallery', () => {
    const markup = renderGallery([], false)

    expect(markup).toBe('')
    expect(markup).not.toContain('no-safe-image-state')
  })

  it('renders the reviewed no-safe state with localized accessible labels', () => {
    const expectedTitles = {
      zh: '暂无已确认的安全主图',
      en: 'No reviewed safe primary image',
      ja: '確認済みの安全な主画像はありません',
    }

    for (const [lang, title] of Object.entries(expectedTitles)) {
      const markup = renderGallery([], true, lang)

      expect(markup).toContain('data-testid="no-safe-image-state"')
      expect(markup).toContain(`aria-label="${title}"`)
      expect(markup).toContain(title)
    }
  })

  it('keeps the reviewed decision scope and guarded SQL artifacts aligned', () => {
    expect(decisionArtifact.scope).toEqual(['parc1', 'national-museum-of-western-art'])
    expect(decisionArtifact.production_write).toEqual({
      applied: false,
      database_write_performed: false,
      release_or_deploy_performed: false,
    })
    expect(migrationSource).toBe(applySource)
    expect(migrationSource).toContain('Parc.1 building precondition drifted')
    expect(migrationSource).toContain('NMWA building precondition drifted')
    expect(migrationSource).toContain('architect_id IS NULL')
    expect(migrationSource).toContain("architect_id = 'fbdda76b-fde9-4203-8b68-475d7e40e09a'::uuid")
    expect(migrationSource).toContain('Parc.1 unsafe primary suppression postcondition failed')
    expect(rollbackSource).toContain('Parc.1 rollback refused')
    expect(rollbackSource).toContain('NMWA rollback refused')
    expect(rollbackSource).toContain('architect_id = NULL')
    expect(rollbackSource).toContain('Parc.1 primary restoration postcondition failed')
    expect(migrationSource).not.toMatch(/apple[- ]park|l[- ]arbre[- ]blanc|fallingwater/i)
  })
})
