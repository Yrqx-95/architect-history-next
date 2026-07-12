import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-zero-waste-003.json'
import packet from '../../db/review-packets/graduation-new-building-zero-waste-003.json'

describe('graduation new-building zero-waste batch 003 decisions', () => {
  it('covers only CASE-002 and authorizes no migration', () => {
    expect(packet.items.map(item => item.case_id)).toEqual(['CASE-002'])
    expect(decisions.summary).toMatchObject({ reviewed: 1, identity_approved: 1, migration_approved: 0 })
    expect(decisions.decisions).toEqual([])
    expect(decisions.excluded).toHaveLength(1)
  })

  it('does not convert the uploader into a photographer', () => {
    const image = decisions.excluded[0].image_review
    expect(image).toMatchObject({ license: 'CC0', photographer: null, uploader: 'Sorrysorry' })
    expect(image.rights_evidence).toContain('author information is missing')
  })

  it('requires a principal recycling or waste-management function', () => {
    expect(decisions.excluded[0].function_review).toMatchObject({
      status: 'taxonomy_gap',
      insufficient_existing_function: 'community-center',
    })
    expect(decisions.excluded[0].required_resolution).toContain('recycling-center or waste-management function taxonomy')
  })
})
