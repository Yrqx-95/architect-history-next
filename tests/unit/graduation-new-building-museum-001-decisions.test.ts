import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-museum-001.json'
import queue from '../../db/review-packets/graduation-new-building-museum-001.json'
import functions from '../../db/taxonomies/building-functions-v1.json'

describe('graduation new-building museum batch 001 decisions', () => {
  it('accounts for the complete review queue without duplicate cases or buildings', () => {
    const expected = queue.items.map(item => item.case_id).sort()
    const actual = decisions.decisions.map(item => item.case_id).sort()

    expect(actual).toEqual(expected)
    expect(decisions.decisions).toHaveLength(14)
    expect(decisions.excluded).toEqual([])
    expect(new Set(actual).size).toBe(14)
    expect(new Set(decisions.decisions.map(item => item.canonical_building.slug)).size).toBe(14)
    expect(decisions.write_status).toContain('no production insert authorized')
  })

  it('requires canonical facts, museum assignments, official evidence and exact image attribution', () => {
    const knownFunctions = new Set(functions.functions.map(item => item.slug))

    for (const item of decisions.decisions) {
      expect(item.decision).toBe('approved')
      expect(item.canonical_building.type_slug).toBe('cultural')
      expect(item.canonical_building.country_code).toMatch(/^[A-Z]{2}$/)
      expect(item.canonical_building.year_start).toBeGreaterThanOrEqual(1900)
      expect(item.canonical_building.official_url).toMatch(/^https:\/\//)
      expect(item.function_slugs).toContain('museum')
      expect(item.function_slugs.every(slug => knownFunctions.has(slug))).toBe(true)
      expect(item.evidence_urls.length).toBeGreaterThan(0)
      expect(item.image.source_url).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
      expect(item.image.license).toMatch(/^(CC0|CC BY)/)
      expect(item.image.credit).toContain('Wikimedia Commons')
      expect(item.image.credit).not.toBe('Wikimedia Commons')
      expect(item.image.visual_evidence.length).toBeGreaterThan(40)
    }
  })

  it('records the reviewed corrections instead of inheriting unsafe legacy metadata', () => {
    const byCase = new Map(decisions.decisions.map(item => [item.case_id, item]))

    expect(byCase.get('CASE-051')?.image).toMatchObject({
      status: 'replaced-and-approved',
      license: 'CC0',
      credit: 'Souka Kinmei / Wikimedia Commons',
    })
    expect(byCase.get('CASE-051')?.image.source_url).toContain('本棟から角川武蔵野ミュージアムを写す')
    expect(byCase.get('CASE-124')?.canonical_building.official_url).toBe('https://www.henninglarsen.com/projects/moesgaard')
    expect(byCase.get('CASE-124')?.image).toMatchObject({ license: 'CC BY-SA 4.0', credit: 'Gardar Rurak / Wikimedia Commons' })
    expect(byCase.get('CASE-132')?.image).toMatchObject({ license: 'CC BY-SA 4.0', credit: 'Michael Rowe / Wikimedia Commons' })
    expect(byCase.get('CASE-118')?.canonical_building.official_url).toContain('zha.com/projects/architecture/maxxi')
  })

  it('matches the read-only production preflight', () => {
    expect(decisions.production_preflight).toMatchObject({
      building_slug_conflicts: 0,
      case_profile_conflicts: 0,
      museum_function_active: true,
    })
    expect(decisions.production_preflight.existing_primary_architects).toHaveLength(3)
    expect(decisions.production_preflight.new_primary_architects).toHaveLength(9)
  })
})
