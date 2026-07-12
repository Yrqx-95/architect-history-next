import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-social-care-001.json'

describe('graduation new-building social-care batch 001 decisions', () => {
  it('does not approve a migration without a safe image or canonical building identity', () => {
    expect(decisions.summary).toEqual({
      reviewed_cases: 8,
      unique_built_projects: 6,
      identity_approved_cases: 7,
      migration_approved: 0,
      no_safe_image_yet_cases: 7,
      not_a_single_building: 1,
      duplicate_case_pairs: 1,
      schema_gap_found: 1,
    })
    expect(decisions.decisions).toEqual([])
    expect(decisions.excluded).toHaveLength(8)
  })

  it('keeps both duplicate CASE routes and requires a many-profiles-per-building schema', () => {
    expect(decisions.schema_gap.case_ids).toEqual(['CASE-024', 'CASE-065'])
    expect(decisions.schema_gap.required_resolution).toContain('allow multiple graduation profiles')
    expect(decisions.schema_gap.required_resolution).toContain('preserve both CASE routes')
    expect(decisions.excluded.filter(item => item.decision === 'duplicate_identity_and_no_safe_image_yet')).toEqual([
      expect.objectContaining({ case_id: 'CASE-024', duplicate_of_case_id: 'CASE-065' }),
      expect.objectContaining({ case_id: 'CASE-065', duplicate_of_case_id: 'CASE-024' }),
    ])
  })

  it('rejects the programme-level record and the noncommercial no-derivatives image', () => {
    expect(decisions.excluded).toEqual(expect.arrayContaining([
      expect.objectContaining({ case_id: 'CASE-011', decision: 'not_a_single_building' }),
      expect.objectContaining({ case_id: 'CASE-097', decision: 'no_safe_image_yet' }),
    ]))
    expect(decisions.excluded.find(item => item.case_id === 'CASE-097')?.reason).toContain('CC BY-NC-ND')
    expect(decisions.write_status).toContain('no production insert authorized')
  })
})
