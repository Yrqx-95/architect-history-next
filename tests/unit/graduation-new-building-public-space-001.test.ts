import decisions from '../../db/review-decisions/graduation-new-buildings-public-space-001.json'
import packet from '../../db/review-packets/graduation-new-building-public-space-001.json'

import { describe, expect, it } from 'vitest'

describe('graduation new-building urban public-space batch 001', () => {
  it('keeps a narrow five-case public-space boundary', () => {
    expect(packet.case_ids).toEqual(['CASE-014', 'CASE-050', 'CASE-056', 'CASE-110', 'CASE-111'])
    expect(packet.items.map(item => item.case_id)).toEqual(packet.case_ids)
    expect(new Set(packet.items.map(item => item.case_id)).size).toBe(5)
  })

  it('approves four bounded identities and preserves the Sumida evidence gap', () => {
    expect(decisions.summary).toEqual({
      reviewed: 5,
      identity_approved: 4,
      function_approved: 4,
      image_approved: 4,
      migration_approved: 4,
      evidence_gap: 1,
      image_replacement_required: 1,
      image_metadata_correction_required: 1,
      new_function_required: 1,
    })
    expect(decisions.decisions.map(item => item.case_id)).toEqual(['CASE-050', 'CASE-056', 'CASE-110', 'CASE-111'])
    expect(decisions.excluded).toEqual([
      expect.objectContaining({
        case_id: 'CASE-014',
        decision: 'identity_not_bounded',
      }),
    ])
    expect(decisions.write_status).toContain('no production insert authorized')
  })

  it('uses public-space as the primary semantic function', () => {
    expect(decisions.taxonomy_prerequisite).toMatchObject({ slug: 'public-space', broad_type_slug: 'public-space' })
    expect(decisions.decisions.every(item => item.function_slugs[0] === 'public-space')).toBe(true)
    expect(decisions.decisions.map(item => item.canonical_building.type_slug)).toEqual([
      'public-space',
      'public-space',
      'public-space',
      'public-space',
    ])
    expect(decisions.decisions.find(item => item.case_id === 'CASE-050')?.function_slugs).toEqual(['public-space', 'mixed-use'])
  })

  it('requires the verified image corrections before migration', () => {
    const byCase = new Map(decisions.decisions.map(item => [item.case_id, item]))
    expect(byCase.get('CASE-050')?.image).toMatchObject({ license: 'CC BY-SA 4.0', credit: 'Photo: KKPCW / Wikimedia Commons' })
    expect(byCase.get('CASE-056')?.image).toMatchObject({ license: 'CC BY-SA 4.0', credit: 'Photo: Pbdragonwang / Wikimedia Commons' })
    expect(byCase.get('CASE-110')?.image).toMatchObject({
      status: 'approved_metadata_correction_required',
      license: 'CC BY-SA 4.0',
      credit: 'Photo: Beyond My Ken / Wikimedia Commons',
    })
    expect(byCase.get('CASE-111')?.image).toMatchObject({
      status: 'approved_replacement_required',
      license: 'CC BY 2.0',
      credit: 'Photo: Emily / Wikimedia Commons',
    })
  })
})
