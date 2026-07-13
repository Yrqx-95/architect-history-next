import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-fast-batch-012.json'

describe('graduation fast batch 012 review', () => {
  it('reviews seven records while migrating only the three evidence-complete cases', () => {
    expect(decisions.summary).toMatchObject({ reviewed: 7, migration_candidates: 3, blocked: 4 })
    expect(decisions.decisions.map(item => item.case_id)).toEqual(['CASE-068', 'CASE-077', 'CASE-089'])
    expect(decisions.excluded.map(item => item.case_id)).toEqual(['CASE-009', 'CASE-017', 'CASE-063', 'CASE-071'])
  })

  it('keeps functions and historical identities bounded', () => {
    const [miyashita, pasona, hof] = decisions.decisions
    expect(miyashita.canonical_building).toMatchObject({ slug: 'miyashita-park-2011', type_slug: 'public-space' })
    expect(miyashita.function_slugs).toEqual(['public-space'])
    expect(pasona.canonical_building.type_slug).toBe('office')
    expect(pasona.function_slugs).toEqual(['mixed-use'])
    expect(hof.canonical_building.type_slug).toBe('office')
    expect(hof.function_slugs).toEqual(['mixed-use', 'public-space'])
  })

  it('preserves exact approved image rights', () => {
    expect(decisions.decisions.map(item => [item.case_id, item.image.license])).toEqual([
      ['CASE-068', 'CC BY 3.0'],
      ['CASE-077', 'CC BY-SA 3.0'],
      ['CASE-089', 'CC BY-SA 2.0'],
    ])
  })
})
