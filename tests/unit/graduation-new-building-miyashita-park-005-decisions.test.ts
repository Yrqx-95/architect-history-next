import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-miyashita-park-005.json'
import packet from '../../db/review-packets/graduation-new-building-miyashita-park-005.json'

describe('graduation new-building Miyashita Park batch 005 decisions', () => {
  it('covers only CASE-040 and preserves both architect roles', () => {
    expect(packet.items.map(item => item.case_id)).toEqual(['CASE-040'])
    expect(decisions.decisions[0].architect_identity.name_en).toBe('Takenaka Corporation + Nikken Sekkei')
    expect(decisions.decisions[0].architect_identity.roles).toHaveLength(2)
  })

  it('uses mixed-use with retail and public-space functions', () => {
    expect(decisions.decisions[0].canonical_building.type_slug).toBe('mixed-use')
    expect(decisions.decisions[0].function_slugs).toEqual(['mixed-use', 'retail', 'public-space'])
  })

  it('rejects the current wrong-subject image and approves an exact replacement', () => {
    expect(decisions.decisions[0].current_image.status).toBe('rejected_wrong_subject')
    expect(decisions.decisions[0].image).toMatchObject({
      status: 'approved_replacement_pending_localization',
      license: 'CC BY 4.0',
      credit: 'Photo: Nesnad / Wikimedia Commons',
      width: 4032,
      height: 3024,
    })
  })
})
