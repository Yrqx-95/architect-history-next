import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-disaster-memorial-002.json'
import packet from '../../db/review-packets/graduation-new-building-disaster-memorial-002.json'

describe('graduation new-building disaster memorial batch 002 decisions', () => {
  it('covers only CASE-015 and approves one bounded canonical building', () => {
    expect(packet.items.map(item => item.case_id)).toEqual(['CASE-015'])
    expect(decisions.summary).toMatchObject({ reviewed: 1, migration_approved: 1 })
    expect(decisions.excluded).toEqual([])
    expect(decisions.decisions).toHaveLength(1)
  })

  it('uses the existing museum taxonomy without overclaiming community-center', () => {
    const decision = decisions.decisions[0]
    expect(decision.canonical_building).toMatchObject({
      slug: 'minamisanriku-311-memorial',
      architect_slug: 'kengo-kuma',
      type_slug: 'cultural',
      year_start: 2022,
    })
    expect(decision.function_slugs).toEqual(['museum'])
  })

  it('preserves exact local image authorship, license and checksum evidence', () => {
    expect(decisions.decisions[0].image).toMatchObject({
      status: 'approved_existing_local_asset',
      license: 'CC BY-SA 3.0',
      credit: 'Photo: Yasu / Wikimedia Commons',
      local_width: 1600,
      local_height: 1066,
      local_sha256: '4c65257beed887a72068ad2df001fffab1cc966ade2484e2af256f8d49158fa1',
    })
  })
})
