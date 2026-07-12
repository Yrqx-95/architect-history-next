import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-yu-no-eki-ohyu-008.json'
import pack from '../../db/review-packets/graduation-yu-no-eki-ohyu-batch-008.json'
import cases from '../../src/content/graduation/cases.json'

describe('graduation Yu no Eki Ohyu batch 008', () => {
  it('keeps the roadside-station identity above the attached open-air theater', () => {
    const decision = decisions.decisions[0]
    expect(decision.case_id).toBe('CASE-033')
    expect(decision.canonical_building).toMatchObject({
      slug: 'yu-no-eki-ohyu',
      type_slug: 'transportation',
      architect_slug: 'kengo-kuma',
    })
    expect(decisions.summary.theatre_false_positive_rejected).toBe(1)
    expect(decision.function_slugs).toEqual(['transport-hub', 'community-center', 'retail', 'public-space'])
    expect(decision.function_slugs).not.toContain('theatre')
  })

  it('reuses Kengo Kuma and creates one building with four reviewed functions', () => {
    expect(pack.counts).toMatchObject({
      architects: 1,
      new_architects: 0,
      buildings: 1,
      images: 1,
      profiles: 1,
      assignments: 4,
    })
    expect(pack.architects[0]).toMatchObject({
      id: '51797239-be38-4dbd-9d7e-e413ddf3c78a',
      slug: 'kengo-kuma',
      is_new: false,
    })
    expect(pack.assignments.map(item => [item.function_slug, item.is_primary])).toEqual([
      ['transport-hub', true],
      ['community-center', false],
      ['retail', false],
      ['public-space', false],
    ])
  })

  it('preserves the exact reviewed image and canonical compatibility architect', () => {
    expect(pack.images[0]).toMatchObject({
      url_original: '/images/graduation/cases/case-033-yu-no-eki-ohyu.jpg',
      photographer: '掬茶',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 4.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Roadside_Station_Oyu_20180915a.jpg',
    })
    expect(cases.find(item => item.id === 'CASE-033')?.architect).toBe('Kengo Kuma')
    expect(cases.find(item => item.id === 'CASE-030')?.architect).toBe('Kengo Kuma and Associates')
  })
})
