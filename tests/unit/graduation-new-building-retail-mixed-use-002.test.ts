import decisions from '../../db/review-decisions/graduation-new-buildings-retail-mixed-use-002.json'
import packet from '../../db/review-packets/graduation-new-building-retail-mixed-use-002.json'

import { describe, expect, it } from 'vitest'

describe('retail-led mixed-use batch 002 review', () => {
  it('covers only CASE-074 and CASE-116 with no excluded records', () => {
    expect(packet.items.map(item => item.case_id)).toEqual(['CASE-074', 'CASE-116'])
    expect(decisions.decisions.map(item => item.case_id)).toEqual(['CASE-074', 'CASE-116'])
    expect(decisions.excluded).toEqual([])
  })

  it('keeps mixed-use broad type and retail primary intent', () => {
    expect(decisions.decisions.every(item => item.canonical_building.type_slug === 'mixed-use')).toBe(true)
    expect(decisions.decisions.every(item => item.function_slugs[0] === 'retail')).toBe(true)
    expect(decisions.decisions.find(item => item.case_id === 'CASE-116')?.function_slugs).toEqual(['retail', 'mixed-use', 'public-space'])
  })

  it('records exact image authorship and licenses while requiring localization', () => {
    expect(decisions.decisions.map(item => item.image)).toEqual([
      expect.objectContaining({ status: 'approved_localization_required', credit: 'Photo: Jonathan Lin / Wikimedia Commons', license: 'CC BY-SA 2.0', width: 4608, height: 3126 }),
      expect.objectContaining({ status: 'approved_localization_required', credit: 'Photo: Michielverbeek / Wikimedia Commons', license: 'CC BY-SA 4.0', width: 4352, height: 3264 }),
    ])
  })

  it('does not authorize production writes', () => {
    expect(decisions.write_status).toContain('no production insert authorized')
    expect(packet.write_policy).toContain('No image localization, migration generation or production write')
  })
})
