import decisions from '../../db/review-decisions/graduation-new-buildings-public-toilet-001.json'
import packet from '../../db/review-packets/graduation-new-building-public-toilet-001.json'

import { describe, expect, it } from 'vitest'

describe('G6 public-toilet batch 001 decisions', () => {
  it('reviews the bounded three-case batch exactly once', () => {
    expect(packet.case_ids).toEqual(['CASE-031', 'CASE-044', 'CASE-049'])

    const reviewed = [...decisions.decisions, ...decisions.excluded].map((item) => item.case_id)
    expect(reviewed.sort()).toEqual([...packet.case_ids].sort())
    expect(new Set(reviewed).size).toBe(3)
  })

  it('does not collapse the multi-site CASE-031 initiative into one building', () => {
    const item = decisions.excluded.find((candidate) => candidate.case_id === 'CASE-031')
    expect(item?.decision).toBe('project_scope_not_single_building')
    expect(item?.image_review.status).toBe('specific_building_but_wrong_scope_for_case')
    expect(item?.image_review.required_action).toContain('neutral placeholder')
  })

  it('keeps CASE-049 out until identity and image evidence are safe', () => {
    const item = decisions.excluded.find((candidate) => candidate.case_id === 'CASE-049')
    expect(item?.decision).toBe('no_safe_image_yet')
    expect(item?.image_review.status).toBe('no_safe_image_yet')
  })

  it('approves only the exact Nabeshima facility and requires public-toilet taxonomy', () => {
    expect(decisions.taxonomy_prerequisite).toMatchObject({
      slug: 'public-toilet',
      broad_type_slug: 'civic-public',
    })

    expect(decisions.decisions).toHaveLength(1)
    expect(decisions.decisions[0]).toMatchObject({
      case_id: 'CASE-044',
      decision: 'approved',
      canonical_building: {
        slug: 'nabeshima-shoto-park-toilet',
        architect_slug: 'kengo-kuma',
        type_slug: 'public-toilet',
      },
      function_slugs: ['public-toilet', 'public-space'],
      image: {
        status: 'approved',
        license: 'CC BY-SA 4.0',
        credit: 'Photo: 鋸香具師 / Wikimedia Commons',
      },
    })
  })
})
