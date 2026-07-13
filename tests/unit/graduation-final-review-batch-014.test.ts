import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-final-review-batch-014.json'

describe('graduation final review batch 014', () => {
  it('closes the formal review queue without converting blockers into buildings', () => {
    expect(decisions.summary).toEqual({ reviewed: 6, migration_candidates: 3, blocked: 3, formally_unreviewed_remaining: 0 })
    expect(decisions.decisions.map(item => item.case_id)).toEqual(['CASE-100', 'CASE-126', 'CASE-136'])
    expect(decisions.excluded.map(item => item.case_id)).toEqual(['CASE-012', 'CASE-020', 'CASE-134'])
  })

  it('preserves exact approved rights and bounded functions', () => {
    expect(decisions.decisions.map(item => [item.case_id, item.image.license])).toEqual([
      ['CASE-100', 'CC BY-SA 4.0'],
      ['CASE-126', 'CC BY-SA 3.0'],
      ['CASE-136', 'CC BY-SA 2.0'],
    ])
    expect(decisions.decisions.map(item => [item.case_id, item.canonical_building.type_slug, item.function_slugs])).toEqual([
      ['CASE-100', 'cultural', ['public-space']],
      ['CASE-126', 'mixed-use', ['mixed-use', 'public-space', 'museum', 'retail']],
      ['CASE-136', 'civic-public', ['public-space', 'mixed-use']],
    ])
  })
})
