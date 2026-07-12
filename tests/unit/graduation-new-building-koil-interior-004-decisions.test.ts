import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-koil-interior-004.json'
import packet from '../../db/review-packets/graduation-new-building-koil-interior-004.json'

describe('graduation new-building KOIL interior batch 004 decisions', () => {
  it('covers only CASE-035 and authorizes no building migration', () => {
    expect(packet.items.map(item => item.case_id)).toEqual(['CASE-035'])
    expect(decisions.summary).toMatchObject({ reviewed: 1, canonical_building_approved: 0, migration_approved: 0 })
    expect(decisions.decisions).toEqual([])
  })

  it('records the verified project as an interior fit-out', () => {
    expect(decisions.excluded[0].verified_project).toMatchObject({ scope: 'innovation-center interior design', area_m2: 2576, date: '2014-04' })
    expect(decisions.excluded[0].required_resolution).toContain('interior-project entity')
  })

  it('rejects a rights-safe image of the wrong KOIL facility', () => {
    expect(decisions.excluded[0].image_review).toMatchObject({ status: 'wrong_project_object', license: 'CC0', photographer: 'Souka Kinmei' })
    expect(decisions.excluded[0].image_review.visual_evidence).toContain('KOIL GARDEN')
  })
})
