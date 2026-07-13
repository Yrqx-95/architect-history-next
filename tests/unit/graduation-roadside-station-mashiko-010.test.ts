import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-roadside-station-mashiko-010.json'

describe('graduation Roadside Station Mashiko batch 010 review', () => {
  it('keeps the roadside-station identity and functions bounded', () => {
    const decision = decisions.decisions[0]
    expect(decision.case_id).toBe('CASE-043')
    expect(decision.canonical_building).toMatchObject({
      slug: 'roadside-station-mashiko',
      type_slug: 'transportation',
      architect_slug: 'mount-fuji-architects-studio',
    })
    expect(decision.function_slugs).toEqual(['transport-hub', 'retail'])
    expect(decision.function_slugs).not.toContain('community-center')
    expect(decision.function_slugs).not.toContain('public-space')
  })

  it('preserves the reviewed Commons image evidence', () => {
    expect(decisions.decisions[0].image).toMatchObject({
      license: 'CC BY-SA 4.0',
      credit: 'アラツク',
      width: 4522,
      height: 1129,
      local_width: 1600,
      local_height: 399,
    })
  })
})
