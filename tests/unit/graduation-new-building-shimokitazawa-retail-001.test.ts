import decisions from '../../db/review-decisions/graduation-new-buildings-shimokitazawa-retail-001.json'
import packet from '../../db/review-packets/graduation-new-building-shimokitazawa-retail-001.json'

import { describe, expect, it } from 'vitest'

describe('G6 Shimokitazawa retail batch 001 decisions', () => {
  it('keeps an exact two-project boundary', () => {
    expect(packet.case_ids).toEqual(['CASE-038', 'CASE-039'])
    expect(packet.items.map(item => item.case_id)).toEqual(packet.case_ids)
    expect(decisions.decisions.map(item => item.case_id)).toEqual(packet.case_ids)
    expect(decisions.excluded).toEqual([])
  })

  it('keeps the two independent canonical identities separate', () => {
    expect(decisions.decisions.map(item => item.canonical_building.slug)).toEqual([
      'bonus-track-shimokitazawa',
      'mikan-shimokita',
    ])
    expect(decisions.decisions.map(item => item.canonical_building.architect_slug)).toEqual([
      'tsubame-architects',
      'taiju-yamashita-design-and-architecture',
    ])
    expect(decisions.decisions.every(item => item.canonical_building.type_slug === 'commercial')).toBe(true)
  })

  it('requires retail as primary function instead of hiding intent in mixed-use', () => {
    expect(decisions.taxonomy_prerequisite).toMatchObject({ slug: 'retail', broad_type_slug: 'commercial' })
    expect(decisions.decisions.every(item => item.function_slugs[0] === 'retail')).toBe(true)
    expect(decisions.decisions.every(item => item.function_slugs.includes('mixed-use'))).toBe(true)
  })

  it('records exact open image evidence and the BONUS TRACK replacement', () => {
    expect(decisions.decisions[0].image).toMatchObject({
      status: 'approved_replacement_required',
      license: 'CC BY 4.0',
      credit: 'Photo: morinakayasuaki / Figure 3 in Hiroki Nakajima, Sustainability 17(17), MDPI',
      width: 2340,
      height: 1568,
    })
    expect(decisions.decisions[1].image).toMatchObject({
      status: 'approved',
      license: 'CC0',
      credit: 'Photo: Souka Kinmei / Wikimedia Commons',
      width: 2800,
      height: 1572,
    })
  })
})
