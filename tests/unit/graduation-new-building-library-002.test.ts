import { describe, expect, it } from 'vitest'

import functions from '../../db/taxonomies/building-functions-v1.json'
import decisions from '../../db/review-decisions/graduation-new-buildings-library-002.json'
import queue from '../../db/review-packets/graduation-new-building-queue-001.json'
import cases from '../../src/content/graduation/cases.json'

const safeLicense = /^(CC0|CC BY(?:-SA)?(?: [\w.-]+)+)$/

describe('graduation new-building library batch 002 decisions', () => {
  it('accounts for every remaining library candidate without authorizing a write', () => {
    const expected = queue.items
      .filter(item => item.priority === 'library-next')
      .map(item => item.case_id)
      .sort()
    const accounted = [
      ...decisions.decisions.map(item => item.case_id),
      ...decisions.excluded.map(item => item.case_id),
    ].sort()

    expect(accounted).toEqual(expected)
    expect(new Set(accounted).size).toBe(15)
    expect(decisions.decisions).toHaveLength(14)
    expect(decisions.excluded).toEqual([
      expect.objectContaining({ case_id: 'CASE-079', decision: 'no_safe_image_yet' }),
    ])
    expect(decisions.write_status).toContain('no production insert authorized')
  })

  it('requires canonical facts and known fine-grained functions', () => {
    const knownFunctions = new Set(functions.functions.map(item => item.slug))
    const slugs = decisions.decisions.map(item => item.canonical_building.slug)
    expect(new Set(slugs).size).toBe(slugs.length)

    for (const item of decisions.decisions) {
      expect(item.decision).toBe('approved')
      expect(item.canonical_building.name_en.length).toBeGreaterThan(4)
      expect(item.canonical_building.year_start).toBeGreaterThanOrEqual(2000)
      expect(item.canonical_building.country_code).toMatch(/^[A-Z]{2}$/)
      expect(item.canonical_building.official_url).toMatch(/^https:\/\//)
      expect(item.identity_evidence.length).toBeGreaterThan(0)
      expect(item.evidence_urls.length).toBeGreaterThan(0)
      expect(item.function_slugs).toContain('library')
      for (const slug of item.function_slugs) expect(knownFunctions.has(slug)).toBe(true)
    }
  })

  it('keeps approved image metadata synchronized with the public case data', () => {
    const casesById = new Map(cases.map(item => [item.id, item]))
    for (const item of decisions.decisions) {
      const graduationCase = casesById.get(item.case_id)
      expect(graduationCase).toBeDefined()
      expect(graduationCase?.source_url).toBe(item.canonical_building.official_url)
      expect(graduationCase?.image_source_url).toBe(item.image.source_url)
      expect(graduationCase?.image_license).toBe(item.image.license)
      expect(graduationCase?.image_credit).toBe(item.image.credit)
      expect(item.image.source_url).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
      expect(item.image.license).toMatch(safeLicense)
      expect(item.image.credit).not.toBe('Wikimedia Commons')
      expect(item.image.visual_evidence.length).toBeGreaterThan(30)
    }
  })
})
