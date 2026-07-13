import { describe, expect, it } from 'vitest'
import localImageOverrides from '@/lib/local-image-overrides.json'
import decisions from '../../db/review-decisions/content-trust-batch-001.json'

describe('3 World Trade Center runtime cover', () => {
  it('does not let the rejected legacy local cover shadow the reviewed Supabase primary', () => {
    const decision = decisions.decisions.find(item => item.building_slug === '3-world-trade-center')

    expect(decision?.image_review.decision).toBe('reject-as-primary')
    expect(decision?.image_review.replacement_candidate?.photographer).toBe('JJBers')
    expect(localImageOverrides).not.toHaveProperty('3-world-trade-center')
  })
})
