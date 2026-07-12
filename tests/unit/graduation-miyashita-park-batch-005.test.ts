import { describe, expect, it } from 'vitest'

import pack from '../../db/review-packets/graduation-miyashita-park-batch-005.json'

describe('graduation Miyashita Park batch 005 migration pack', () => {
  it('creates one traceable joint architect and canonical building', () => {
    expect(pack.counts).toEqual({ architects: 1, new_architects: 1, buildings: 1, images: 1, profiles: 1, assignments: 3 })
    expect(pack.architects[0]).toMatchObject({ slug: 'takenaka-corporation-nikken-sekkei', name_en: 'Takenaka Corporation + Nikken Sekkei', is_new: true })
    expect(pack.buildings[0]).toMatchObject({ case_id: 'CASE-040', slug: 'miyashita-park', type_slug: 'mixed-use' })
  })

  it('preserves the graduation analysis and reviewed image rights', () => {
    expect(pack.profiles[0].keywords_zh).toEqual(['屋上公园', '商业复合', '运动', '公共性', '无障碍'])
    expect(pack.images[0]).toMatchObject({ photographer: 'Nesnad', license: 'CC BY 4.0', source: 'Wikimedia Commons' })
  })

  it('assigns mixed-use primary with retail and public-space secondary', () => {
    expect(pack.assignments.map(item => `${item.function_slug}:${item.is_primary}`)).toEqual([
      'mixed-use:true', 'retail:false', 'public-space:false',
    ])
  })
})
