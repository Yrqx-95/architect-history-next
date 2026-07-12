import decisions from '../../db/review-decisions/graduation-new-buildings-education-001.json'
import packet from '../../db/review-packets/graduation-new-building-education-001.json'

import { describe, expect, it } from 'vitest'

describe('graduation new-building education batch 001', () => {
  it('contains only the explicit remaining education-building candidate', () => {
    expect(packet.counts.candidates).toBe(1)
    expect(packet.items.map(item => item.case_id)).toEqual(['CASE-006'])
    expect(packet.selection_policy).toContain('Keyword-only education references are excluded')
  })

  it('approves identity and school function without authorizing migration', () => {
    expect(decisions.summary).toEqual({
      reviewed: 1,
      identity_approved: 1,
      function_approved: 1,
      migration_approved: 0,
      no_safe_image_yet: 1,
      exact_images_with_unproven_relicense_authority: 2,
    })
    expect(decisions.decisions).toEqual([])
    expect(decisions.excluded[0]).toMatchObject({
      case_id: 'CASE-006',
      decision: 'no_safe_image_yet',
      function_slugs: ['school'],
    })
  })

  it('does not confuse a license label with proof that the uploader owns relicense rights', () => {
    const candidates = decisions.excluded[0].image_candidates_rejected
    expect(candidates).toHaveLength(2)
    expect(candidates.every(item => item.license_claim === 'CC BY 2.0')).toBe(true)
    expect(candidates.every(item => item.rejection === 'relicense_authority_unproven')).toBe(true)
    expect(decisions.write_status).toContain('no production insert authorized')
  })
})
