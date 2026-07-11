import { describe, expect, it } from 'vitest'
import cases from '../../src/content/graduation/cases.json'
import decisions from '../../db/review-decisions/graduation-building-links-001.json'

const safeLicense = /^(CC0|CC BY(?:-SA)?(?: [\w.-]+)+|Public domain)$/
const expectedExactMatchCaseIds = [
  'CASE-007', 'CASE-046', 'CASE-061', 'CASE-099', 'CASE-103', 'CASE-104',
  'CASE-106', 'CASE-108', 'CASE-119', 'CASE-120', 'CASE-123', 'CASE-125',
  'CASE-127', 'CASE-128', 'CASE-129', 'CASE-131', 'CASE-135', 'CASE-138',
].sort()

describe('graduation building link decisions', () => {
  it('covers every exact match exactly once', () => {
    const reviewedCaseIds = decisions.decisions.map(item => item.case_id).sort()

    expect(decisions.summary).toEqual({ approved: 18, rejected: 0, needs_research: 0 })
    expect(reviewedCaseIds).toEqual(expectedExactMatchCaseIds)
    expect(new Set(reviewedCaseIds).size).toBe(reviewedCaseIds.length)
  })

  it('does not reuse one canonical building for two cases', () => {
    const slugs = decisions.decisions.map(item => item.building_slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('requires traceable identity and image evidence for approved links', () => {
    for (const item of decisions.decisions) {
      expect(item.decision).toBe('approved')
      expect(item.case_source_url).toMatch(/^https:\/\//)
      expect(item.canonical_source_status).toContain('missing-official-url')
      expect(item.identity_evidence.length).toBeGreaterThanOrEqual(2)
      expect(item.image.status).toMatch(/^approved/)
      expect(item.image.source_url).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
      expect(item.image.license).toMatch(safeLicense)
      expect(item.image.credit).not.toBe('Wikimedia Commons')
      expect(item.image.visual_evidence.length).toBeGreaterThan(30)
    }
  })

  it('keeps approved public image metadata synchronized with the reviewed decision', () => {
    const casesById = new Map(cases.map(item => [item.id, item]))
    for (const item of decisions.decisions) {
      const graduationCase = casesById.get(item.case_id)
      expect(graduationCase).toBeDefined()
      expect(graduationCase?.source_url).toBe(item.case_source_url)
      expect(graduationCase?.image_source_url).toBe(item.image.source_url)
      expect(graduationCase?.image_license).toBe(item.image.license)
      expect(graduationCase?.image_credit).toBe(item.image.credit)
    }
  })
})
