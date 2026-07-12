import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-theatre-001.json'

describe('graduation new-building theatre batch 001 decisions', () => {
  it('approves four migration-ready cases and blocks the image-unsafe case', () => {
    expect(decisions.summary).toMatchObject({
      reviewed: 5,
      identity_approved: 5,
      migration_approved: 4,
      image_approved: 4,
      no_safe_image_yet: 1,
    })
    expect(decisions.decisions.map(item => item.case_id)).toEqual([
      'CASE-057', 'CASE-117', 'CASE-122', 'CASE-139',
    ])
    expect(decisions.excluded).toEqual([
      expect.objectContaining({ case_id: 'CASE-091', decision: 'no_safe_image_yet' }),
    ])
  })

  it('requires canonical multilingual facts, theatre classification and explicit image rights', () => {
    const slugs = new Set<string>()
    const imageSources = new Set<string>()

    for (const item of decisions.decisions) {
      expect(item.decision).toBe('approved')
      expect(item.canonical_building.name_zh).toBeTruthy()
      expect(item.canonical_building.name_en).toBeTruthy()
      expect(item.canonical_building.name_ja).toBeTruthy()
      expect(item.canonical_building.official_url).toMatch(/^https:\/\//)
      expect(item.function_slugs).toContain('theatre')
      expect(item.image.license).toMatch(/^CC (?:BY|BY-SA) /)
      expect(item.image.credit).not.toBe('Wikimedia Commons')
      expect(item.image.visual_evidence.length).toBeGreaterThan(50)
      expect(slugs.has(item.canonical_building.slug)).toBe(false)
      expect(imageSources.has(item.image.source_url)).toBe(false)
      slugs.add(item.canonical_building.slug)
      imageSources.add(item.image.source_url)
    }
  })

  it('keeps production writes gated behind a guarded migration dry-run', () => {
    expect(decisions.write_status).toContain('no production insert authorized')
    expect(decisions.new_architects).toEqual([
      expect.objectContaining({ slug: 'diller-scofidio-renfro-rockwell-group' }),
    ])
  })
})
