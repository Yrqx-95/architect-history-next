import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import localImageOverrides from '@/lib/local-image-overrides.json'
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

  it('removes the local override and keeps cover consumers on the shared suppression path', () => {
    expect(localImageOverrides).not.toHaveProperty('parc1')
    expect(dataSource).toContain('shouldSuppressBuildingCover')
    expect(dataSource).toContain('const override = suppressCover ? null')
    expect(homeSource).toContain('selectFeaturedBuildingsWithCovers')
    expect(browseSource).toContain('getBuildingsWithCovers')
    expect(detailSource).toContain('resolveBuildingGalleryImages')
    expect(detailSource).not.toContain('supportingImages.slice(0, 1)')
  })

  it('renders an accessible empty state instead of hiding a suppressed gallery', () => {
    expect(gallerySource).toContain('if (!images.length)')
    expect(gallerySource).toContain('aria-label={labels.noSafeImageTitle}')
    expect(gallerySource).toContain('labels.noSafeImageDescription')
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
    expect(migrationSource).toContain('Parc.1 unsafe primary suppression postcondition failed')
    expect(rollbackSource).toContain('Parc.1 rollback refused')
    expect(rollbackSource).toContain('NMWA rollback refused')
    expect(rollbackSource).toContain('Parc.1 primary restoration postcondition failed')
    expect(migrationSource).not.toMatch(/apple[- ]park|l[- ]arbre[- ]blanc|fallingwater/i)
  })
})
