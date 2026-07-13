import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-placeholder-batch-013.json'
import cases from '../../public/data/graduation/cases.json'

describe('graduation placeholder batch 013 review', () => {
  it('formally reviews exactly 21 records without authorizing migration', () => {
    expect(decisions.summary).toEqual({ reviewed: 21, migration_candidates: 0, no_safe_image_yet: 21 })
    expect(decisions.decisions).toHaveLength(21)
    expect(new Set(decisions.decisions.map(item => item.case_id)).size).toBe(21)
    expect(decisions.decisions.every(item => item.decision === 'no_safe_image_yet')).toBe(true)
  })

  it('proves each decision is bounded to a placeholder with no provenance', () => {
    for (const decision of decisions.decisions) {
      const record = cases.find(item => item.id === decision.case_id)
      expect(record?.image_url).toBe('/images/graduation/case-placeholder.svg')
      expect(record?.image_source_url).toBeFalsy()
      expect(record?.image_license).toBeFalsy()
      expect(record?.image_credit).toBeFalsy()
    }
  })
})
