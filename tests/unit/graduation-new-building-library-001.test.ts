import { describe, expect, it } from 'vitest'

import functions from '../../db/taxonomies/building-functions-v1.json'
import decisions from '../../db/review-decisions/graduation-new-buildings-library-001.json'
import queue from '../../db/review-packets/graduation-new-building-queue-001.json'
import cases from '../../src/content/graduation/cases.json'

const safeLicense = /^(CC0|CC BY(?:-SA)?(?: [\w.-]+)+)$/

describe('graduation new-building library batch 001 decisions', () => {
  it('reviews the complete first batch exactly once without authorizing a write', () => {
    const expected = queue.items
      .filter(item => item.priority === 'batch-001')
      .map(item => item.case_id)
      .sort()
    const reviewed = decisions.decisions.map(item => item.case_id).sort()

    expect(reviewed).toEqual(expected)
    expect(new Set(reviewed).size).toBe(8)
    expect(decisions.summary).toEqual({
      reviewed: 8,
      identity_approved: 8,
      image_approved: 8,
      image_replaced: 2,
      needs_research: 0,
    })
    expect(decisions.write_status).toContain('no production insert authorized')
  })

  it('requires canonical facts, primary sources and approved function slugs', () => {
    const knownFunctions = new Set(functions.functions.map(item => item.slug))
    const buildingSlugs = decisions.decisions.map(item => item.canonical_building.slug)
    expect(new Set(buildingSlugs).size).toBe(buildingSlugs.length)

    for (const item of decisions.decisions) {
      expect(item.decision).toBe('approved')
      expect(item.canonical_building.name_en.length).toBeGreaterThan(4)
      expect(item.canonical_building.year_start).toBeGreaterThanOrEqual(2011)
      expect(item.canonical_building.city.length).toBeGreaterThan(1)
      expect(item.canonical_building.country).toBe('日本')
      expect(item.canonical_building.official_url).toMatch(/^https:\/\//)
      expect(item.identity_evidence).toHaveLength(2)
      expect(item.evidence_urls.length).toBeGreaterThan(0)
      expect(item.function_slugs).toContain('library')
      for (const slug of item.function_slugs) expect(knownFunctions.has(slug)).toBe(true)
    }
  })

  it('keeps the reviewed image decision synchronized with the public case source', () => {
    const casesById = new Map(cases.map(item => [item.id, item]))
    for (const item of decisions.decisions) {
      const graduationCase = casesById.get(item.case_id)
      expect(graduationCase).toBeDefined()
      expect(graduationCase?.image_source_url).toBe(item.image.source_url)
      expect(graduationCase?.image_license).toBe(item.image.license)
      expect(graduationCase?.image_credit).toBe(item.image.credit)
      expect(item.image.source_url).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
      expect(item.image.license).toMatch(safeLicense)
      expect(item.image.credit).not.toBe('Wikimedia Commons')
      expect(item.image.visual_evidence.length).toBeGreaterThan(80)
    }
  })
})
