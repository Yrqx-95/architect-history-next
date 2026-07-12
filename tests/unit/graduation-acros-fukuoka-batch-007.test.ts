import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-acros-fukuoka-007.json'
import pack from '../../db/review-packets/graduation-acros-fukuoka-batch-007.json'
import cases from '../../src/content/graduation/cases.json'

describe('graduation ACROS Fukuoka batch 007', () => {
  it('keeps formal design responsibility separate from the basic-concept credit', () => {
    const decision = decisions.decisions[0]
    expect(decision.case_id).toBe('CASE-016')
    expect(decision.canonical_building.architect_slug).toBe('nihon-sekkei-takenaka-corporation')
    expect(decision.architect_identity.roles).toContain('Nihon Sekkei and Takenaka Corporation: formal design')
    expect(decision.architect_identity.roles).toContain('Emilio Ambasz, Nihon Sekkei and Takenaka Corporation: basic concept')
    expect(decision.architect_identity.role_boundary).toContain('not misrepresented as the sole architect')
  })

  it('creates one bounded canonical building and four reviewed functions', () => {
    expect(pack.counts).toMatchObject({
      architects: 1,
      new_architects: 1,
      buildings: 1,
      images: 1,
      profiles: 1,
      assignments: 4,
    })
    expect(pack.buildings[0]).toMatchObject({
      case_id: 'CASE-016',
      slug: 'acros-fukuoka',
      type_slug: 'mixed-use',
      architect_slug: 'nihon-sekkei-takenaka-corporation',
    })
    expect(pack.assignments.map(item => [item.function_slug, item.is_primary])).toEqual([
      ['mixed-use', true],
      ['theatre', false],
      ['retail', false],
      ['public-space', false],
    ])
  })

  it('preserves the exact reviewed local image and compatibility architect', () => {
    expect(pack.images[0]).toMatchObject({
      url_original: '/images/graduation/cases/case-016-acros-fukuoka.jpg',
      photographer: 'Kenta Mabuchi',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 2.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:ACROS_Fukuoka_2011.jpg',
    })
    expect(cases.find(item => item.id === 'CASE-016')?.architect).toBe('Nihon Sekkei + Takenaka Corporation')
  })
})
