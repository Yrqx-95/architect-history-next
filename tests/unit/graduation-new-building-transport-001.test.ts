import decisions from '../../db/review-decisions/graduation-new-buildings-transport-001.json'
import packet from '../../db/review-packets/graduation-new-building-transport-001.json'

import { describe, expect, it } from 'vitest'

describe('graduation new-building transport batch 001 review', () => {
  it('has a narrow deterministic transport boundary', () => {
    expect(packet.items.map(item => item.case_id)).toEqual(['CASE-008', 'CASE-094', 'CASE-133'])
    expect(packet.selection_policy).toContain('two completed railway stations and one completed international passenger terminal')
  })

  it('approves three identities while retaining explicit migration prerequisites', () => {
    expect(decisions.summary).toEqual({
      reviewed: 3,
      identity_approved: 3,
      function_approved: 3,
      image_approved: 3,
      migration_approved: 3,
      image_replacement_required: 1,
      image_metadata_correction_required: 1,
      new_function_required: 1,
    })
    expect(decisions.write_status).toContain('no production insert authorized')
    expect(decisions.taxonomy_prerequisite).toMatchObject({ slug: 'transport-hub', broad_type_slug: 'transportation' })
  })

  it('requires exact, attributable and openly licensed images', () => {
    const byCase = new Map(decisions.decisions.map(item => [item.case_id, item]))
    expect(byCase.get('CASE-008')?.image).toMatchObject({ license: 'CC BY-SA 4.0', credit: 'Photo: Mister0124 / Wikimedia Commons' })
    expect(byCase.get('CASE-094')?.image).toMatchObject({ status: 'approved_replacement_required', license: 'CC BY-SA 4.0' })
    expect(byCase.get('CASE-133')?.image).toMatchObject({ status: 'approved_metadata_correction_required', license: 'CC0', credit: 'Photo: Syced / Wikimedia Commons' })
  })

  it('uses transport-hub as the primary semantic function rather than generic mixed-use', () => {
    expect(decisions.decisions.every(item => item.function_slugs[0] === 'transport-hub')).toBe(true)
    expect(decisions.decisions.map(item => item.canonical_building.type_slug)).toEqual(['transportation', 'transportation', 'transportation'])
  })
})
