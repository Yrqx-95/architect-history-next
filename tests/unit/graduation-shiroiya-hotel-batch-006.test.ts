import fs from 'node:fs'

import { describe, expect, it } from 'vitest'

import pack from '../../db/review-packets/graduation-shiroiya-hotel-batch-006.json'

const apply = fs.readFileSync('db/manual-operations/graduation-shiroiya-hotel-batch-006-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/graduation-shiroiya-hotel-batch-006-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260712145038_graduation_shiroiya_hotel_batch_006.sql', 'utf8')

describe('graduation Shiroiya Hotel batch 006 migration pack', () => {
  it('reuses Sou Fujimoto and creates one canonical hotel complex', () => {
    expect(pack.counts).toEqual({ architects: 1, new_architects: 0, buildings: 1, images: 1, profiles: 1, assignments: 2 })
    expect(pack.architects[0]).toMatchObject({ id: '009373b5-61c8-4621-b128-9934f77d681c', slug: 'fujimoto', is_new: false })
    expect(pack.buildings[0]).toMatchObject({ case_id: 'CASE-028', slug: 'shiroiya-hotel', type_slug: 'commercial', architect_slug: 'fujimoto' })
  })

  it('preserves the graduation analysis and exact reviewed image rights', () => {
    expect(pack.profiles[0].keywords_zh).toEqual(['地方再生', '住宿', '艺术', '中心市街地', '再利用'])
    expect(pack.images[0]).toMatchObject({
      photographer: 'こやまひろ',
      license: 'CC BY 4.0',
      source: 'Wikimedia Commons',
      source_url: 'https://commons.wikimedia.org/wiki/File:Shiroiya_Hotel.jpg',
    })
  })

  it('assigns hotel primary and retail secondary without inserting a duplicate architect', () => {
    expect(pack.assignments.map(item => `${item.function_slug}:${item.is_primary}`)).toEqual(['hotel:true', 'retail:false'])
    expect(apply).toContain('SELECT id, slug, name_zh, name_en, name_ja, official_url FROM architect_seed WHERE is_new')
    expect(apply).toContain('0 new architects, 1 buildings, 1 images')
  })

  it('keeps migration byte-identical and rollback guarded against external relations', () => {
    expect(migration).toBe(apply)
    expect(rollback).toContain('Rollback refused: found % external relations added after graduation-shiroiya-hotel-batch-006')
    expect(rollback).toContain('reviewed batch rows are missing or changed')
  })
})
