import { describe, expect, it } from 'vitest'
import decisions from '../../db/review-decisions/graduation-new-buildings-shiroiya-hotel-006.json'
import packet from '../../db/review-packets/graduation-new-building-shiroiya-hotel-006.json'

describe('graduation Shiroiya Hotel batch 006 decisions', () => {
  it('covers only CASE-028 as one hotel complex', () => {
    expect(packet.items.map(item => item.case_id)).toEqual(['CASE-028'])
    expect(decisions.decisions[0].canonical_building.slug).toBe('shiroiya-hotel')
  })
  it('requires hotel primary taxonomy rather than mixed-use substitution', () => {
    expect(decisions.taxonomy_prerequisite).toMatchObject({slug:'hotel',broad_type_slug:'commercial'})
    expect(decisions.decisions[0].function_slugs).toEqual(['hotel','retail'])
  })
  it('preserves exact image authorship and license', () => {
    expect(decisions.decisions[0].image).toMatchObject({status:'approved_existing_local_asset',license:'CC BY 4.0',credit:'こやまひろ'})
  })
})
