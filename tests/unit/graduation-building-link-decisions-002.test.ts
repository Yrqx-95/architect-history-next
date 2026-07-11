import { describe, expect, it } from 'vitest'
import cases from '../../src/content/graduation/cases.json'
import exactDecisions from '../../db/review-decisions/graduation-building-links-001.json'
import decisions from '../../db/review-decisions/graduation-building-links-002.json'

const expectedReviewedCaseIds = [
  'CASE-001', 'CASE-036', 'CASE-041', 'CASE-045', 'CASE-052', 'CASE-053',
  'CASE-055', 'CASE-058', 'CASE-060', 'CASE-070', 'CASE-092', 'CASE-098',
  'CASE-102', 'CASE-107', 'CASE-109', 'CASE-114', 'CASE-116', 'CASE-117',
  'CASE-121', 'CASE-122',
].sort()

const expectedApprovedMappings = new Map([
  ['CASE-102', 'kiasma'],
  ['CASE-107', 'taichung-metropolitan-opera'],
  ['CASE-121', 'hamburg-elbphilharmonie'],
])

describe('graduation building link decisions v2', () => {
  it('resolves every original probable and identity-review item exactly once', () => {
    const reviewedIds = decisions.decisions.map(item => item.case_id).sort()
    expect(reviewedIds).toEqual(expectedReviewedCaseIds)
    expect(new Set(reviewedIds).size).toBe(20)
    expect(decisions.summary).toEqual({ approved: 3, rejected: 17, needs_research: 0, routed_to_new_building: 17 })
  })

  it('approves only the three corroborated aliases', () => {
    const approved = decisions.decisions.filter(item => item.decision === 'approved')
    expect(approved).toHaveLength(3)
    for (const item of approved) {
      if (!item.building_slug || !item.identity_evidence || !item.image) throw new Error(`Incomplete approved decision: ${item.case_id}`)
      expect(item.building_slug).toBe(expectedApprovedMappings.get(item.case_id))
      expect(item.identity_evidence).toHaveLength(4)
      expect(item.case_source_url).toMatch(/^https:\/\//)
      expect(item.image.source_url).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
      expect(item.image.credit).toContain('Wikimedia Commons')
      expect(item.image.visual_evidence.length).toBeGreaterThan(40)
    }
  })

  it('routes every rejected fuzzy candidate to canonical-building research', () => {
    const rejected = decisions.decisions.filter(item => item.decision === 'rejected')
    expect(rejected).toHaveLength(17)
    for (const item of rejected) {
      if (!item.rejected_building_slug || !item.outcome || !item.reason) throw new Error(`Incomplete rejected decision: ${item.case_id}`)
      expect(item.outcome).toBe('new-building-candidate')
      expect(item.rejected_building_slug.length).toBeGreaterThan(2)
      expect(item.case_source_url).toMatch(/^https:\/\//)
      expect(item.reason.length).toBeGreaterThan(60)
    }
  })

  it('keeps approved image metadata synchronized and avoids duplicate links across review batches', () => {
    const casesById = new Map(cases.map(item => [item.id, item]))
    const approvedV2 = decisions.decisions.filter(item => item.decision === 'approved')
    for (const item of approvedV2) {
      if (!item.building_slug || !item.image) throw new Error(`Incomplete approved decision: ${item.case_id}`)
      const graduationCase = casesById.get(item.case_id)
      expect(graduationCase?.image_source_url).toBe(item.image.source_url)
      expect(graduationCase?.image_license).toBe(item.image.license)
      expect(graduationCase?.image_credit).toBe(item.image.credit)
    }

    const allApprovedCaseIds = [
      ...exactDecisions.decisions.map(item => item.case_id),
      ...approvedV2.map(item => item.case_id),
    ]
    const allApprovedSlugs = [
      ...exactDecisions.decisions.map(item => item.building_slug),
      ...approvedV2.map(item => item.building_slug),
    ]
    expect(new Set(allApprovedCaseIds).size).toBe(allApprovedCaseIds.length)
    expect(new Set(allApprovedSlugs).size).toBe(allApprovedSlugs.length)
  })
})
