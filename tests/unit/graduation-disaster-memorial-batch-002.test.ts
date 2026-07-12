import { describe, expect, it } from 'vitest'

import pack from '../../db/review-packets/graduation-disaster-memorial-batch-002.json'

describe('graduation disaster memorial batch 002 migration pack', () => {
  it('reuses Kengo Kuma and creates exactly one canonical building', () => {
    expect(pack.counts).toEqual({
      architects: 1,
      new_architects: 0,
      buildings: 1,
      images: 1,
      profiles: 1,
      assignments: 1,
    })
    expect(pack.architects).toEqual([
      expect.objectContaining({ id: '51797239-be38-4dbd-9d7e-e413ddf3c78a', slug: 'kengo-kuma', is_new: false }),
    ])
    expect(pack.buildings).toEqual([
      expect.objectContaining({ case_id: 'CASE-015', slug: 'minamisanriku-311-memorial', type_slug: 'cultural' }),
    ])
  })

  it('preserves the CASE analysis and assigns museum as the only primary function', () => {
    expect(pack.profiles).toEqual([
      expect.objectContaining({ case_id: 'CASE-015', building_slug: 'minamisanriku-311-memorial' }),
    ])
    expect(pack.profiles[0].concept_zh).toContain('灾后公共设施')
    expect(pack.profiles[0].keywords_zh).toEqual(['防灾', '复兴', '公共设施', '平灾结合', '避难'])
    expect(pack.assignments).toEqual([
      expect.objectContaining({ function_slug: 'museum', is_primary: true }),
    ])
  })

  it('seeds the reviewed Commons image without changing rights evidence', () => {
    expect(pack.images).toEqual([
      expect.objectContaining({
        url_original: '/images/graduation/cases/case-015-minamisanriku-311-memorial.jpg',
        photographer: 'Yasu',
        source: 'Wikimedia Commons',
        license: 'CC BY-SA 3.0',
        source_url: 'https://commons.wikimedia.org/wiki/File:Minamisanriku_311_Memorial.jpg',
      }),
    ])
  })
})
