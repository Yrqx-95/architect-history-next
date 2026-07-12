import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-community-civic-001.json'

describe('graduation new-building community/civic batch 001 decisions', () => {
  it('approves only the image-safe JACCC case and blocks five unsafe-image cases', () => {
    expect(decisions.summary).toEqual({
      reviewed: 6,
      identity_approved: 6,
      migration_approved: 1,
      image_approved: 1,
      wrong_image_rejected: 1,
      no_safe_image_yet: 5,
      metadata_corrections_required: 2,
    })
    expect(decisions.decisions.map(item => item.case_id)).toEqual(['CASE-096'])
    expect(decisions.excluded.map(item => item.case_id)).toEqual([
      'CASE-019', 'CASE-064', 'CASE-067', 'CASE-069', 'CASE-088',
    ])
    expect(decisions.excluded.every(item => item.decision === 'no_safe_image_yet')).toBe(true)
  })

  it('records multilingual canonical facts, multi-use functions and explicit image rights', () => {
    const item = decisions.decisions[0]
    expect(item.decision).toBe('approved')
    expect(item.canonical_building).toMatchObject({
      slug: 'japanese-american-cultural-community-center',
      year_start: 1983,
      country_code: 'US',
      type_slug: 'cultural',
    })
    expect(item.canonical_building.name_zh).toBeTruthy()
    expect(item.canonical_building.name_en).toBeTruthy()
    expect(item.canonical_building.name_ja).toBeTruthy()
    expect(item.function_slugs).toEqual(['community-center', 'theatre', 'mixed-use'])
    expect(item.image).toMatchObject({
      status: 'approved',
      license: 'CC BY-SA 4.0',
      credit: 'Another Believer / Wikimedia Commons',
    })
    expect(item.image.visual_evidence.length).toBeGreaterThan(80)
  })

  it('keeps writes gated and preserves the two source-backed metadata corrections', () => {
    expect(decisions.write_status).toContain('no production insert authorized')
    expect(decisions.new_architects).toEqual([
      expect.objectContaining({
        slug: 'kazumi-adachi-kiyoshi-sawano-hideo-matsunaga-isamu-noguchi',
      }),
    ])
    expect(decisions.excluded.find(item => item.case_id === 'CASE-019')?.required_correction).toContain('2018')
    expect(decisions.excluded.find(item => item.case_id === 'CASE-069')?.required_correction).toContain('2009')
  })
})
