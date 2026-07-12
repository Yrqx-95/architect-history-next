import fs from 'node:fs'

import pack from '../../db/review-packets/graduation-retail-mixed-use-batch-002.json'

import { describe, expect, it } from 'vitest'

const apply = fs.readFileSync('db/manual-operations/graduation-retail-mixed-use-batch-002-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/graduation-retail-mixed-use-batch-002-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260712112526_graduation_retail_mixed_use_batch_002.sql', 'utf8')

describe('graduation retail mixed-use batch 002 migration pack', () => {
  it('creates two distinct buildings and preserves two CASE profiles', () => {
    expect(pack.counts).toEqual({ architects: 2, new_architects: 1, buildings: 2, images: 2, profiles: 2, assignments: 5 })
    expect(pack.buildings.map(item => item.case_id)).toEqual(['CASE-074', 'CASE-116'])
    expect(new Set(pack.buildings.map(item => item.id)).size).toBe(2)
    expect(pack.profiles.map(item => item.case_id)).toEqual(['CASE-074', 'CASE-116'])
  })

  it('reuses MVRDV and creates only Klein Dytham', () => {
    expect(pack.architects).toEqual([
      expect.objectContaining({ slug: 'klein-dytham-architecture', is_new: true }),
      expect.objectContaining({ id: '4a1fdf1b-ed02-45f6-9b9c-95ae623972df', slug: 'mvrdv', is_new: false }),
    ])
  })

  it('uses mixed-use broad type and retail primary functions', () => {
    expect(pack.buildings.every(item => item.type_slug === 'mixed-use')).toBe(true)
    expect(pack.assignments.filter(item => item.is_primary).map(item => `${item.building_slug}:${item.function_slug}`)).toEqual([
      'daikanyama-t-site:retail',
      'markthal-rotterdam:retail',
    ])
    expect(pack.assignments.map(item => `${item.building_slug}:${item.function_slug}`)).toContain('markthal-rotterdam:public-space')
  })

  it('uses the localized reviewed images and exact rights metadata', () => {
    expect(pack.images).toEqual([
      expect.objectContaining({ case_id: 'CASE-074', url_original: '/images/graduation/cases/case-074-daikanyama-t-site.jpg', photographer: 'Jonathan Lin', license: 'CC BY-SA 2.0' }),
      expect.objectContaining({ case_id: 'CASE-116', url_original: '/images/graduation/cases/case-116-markthal-rotterdam.jpg', photographer: 'Michielverbeek', license: 'CC BY-SA 4.0' }),
    ])
  })

  it('contains guarded forward and dependency-aware exact rollback SQL', () => {
    expect(apply).toContain('Graduation retail mixed-use batch 002')
    expect(apply).toContain("ARRAY['mixed-use']::text[]")
    expect(apply).toContain('requires empty target keys')
    expect(rollback).toContain('reviewed batch rows are missing or changed')
    expect(rollback).toContain('external relations')
    expect(migration).toBe(apply)
  })
})
