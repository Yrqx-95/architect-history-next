import decisions from '../../db/review-decisions/graduation-new-buildings-disaster-community-001.json'
import packet from '../../db/review-packets/graduation-new-building-disaster-community-001.json'
import cases from '../../src/content/graduation/cases.json'

import { describe, expect, it } from 'vitest'

describe('graduation disaster/community batch 001', () => {
  it('has a deliberately narrow two-CASE boundary', () => {
    expect(packet.items.map(item => item.case_id)).toEqual(['CASE-037', 'CASE-090'])
    expect(decisions.summary).toEqual({
      reviewed: 2,
      identity_approved: 2,
      shared_canonical_groups: 1,
      migration_approved: 0,
      no_safe_image_yet: 2,
    })
  })

  it('maps two distinct graduation analyses to one future canonical building', () => {
    expect(decisions.shared_identity.case_ids).toEqual(['CASE-037', 'CASE-090'])
    expect(new Set(decisions.decisions.map(item => item.canonical_slug))).toEqual(new Set(['home-for-all-rikuzentakata']))
    const sourceCases = cases.filter(item => decisions.shared_identity.case_ids.includes(item.id))
    expect(sourceCases).toHaveLength(2)
    expect(new Set(sourceCases.map(item => item.concept))).toHaveLength(2)
    expect(new Set(sourceCases.map(item => item.keywords.join('|')))).toHaveLength(2)
  })

  it('does not authorize migration or an unsafe exhibition/model cover', () => {
    expect(decisions.write_status).toContain('no production insert authorized')
    expect(decisions.decisions.every(item => item.image_status === 'no_safe_image_yet')).toBe(true)
    expect(decisions.decisions.every(item => item.profile_policy === 'retain_case_route_concept_and_keywords')).toBe(true)
  })
})
