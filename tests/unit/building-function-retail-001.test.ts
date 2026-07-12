import fs from 'node:fs'

import taxonomy from '../../db/taxonomies/building-functions-v1.json'

import { describe, expect, it } from 'vitest'

const apply = fs.readFileSync('db/manual-operations/building-function-retail-001-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/building-function-retail-001-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260712101126_building_function_retail_001.sql', 'utf8')

describe('retail function taxonomy', () => {
  const retail = taxonomy.functions.find(item => item.slug === 'retail')

  it('defines one retail function with four complete locales', () => {
    expect(retail?.broad_type_slug).toBe('commercial')
    expect(Object.keys(retail?.names || {}).sort()).toEqual(['en', 'ja', 'zh', 'zh-Hant'].sort())
    expect(Object.values(retail?.aliases || {}).reduce((total, values) => total + values.length, 0)).toBe(20)
  })

  it('supports multilingual retail intent without claiming bare shop or store', () => {
    expect(retail?.aliases.zh).toEqual(expect.arrayContaining(['零售商业', '商业设施', '购物中心']))
    expect(retail?.aliases['zh-Hant']).toEqual(expect.arrayContaining(['零售商業', '商業設施', '購物中心']))
    expect(retail?.aliases.en).toEqual(expect.arrayContaining(['retail', 'retail complex', 'shopping street']))
    expect(retail?.aliases.ja).toEqual(expect.arrayContaining(['小売施設', '商業施設', '商店街']))
    expect(retail?.aliases.en).not.toEqual(expect.arrayContaining(['shop', 'store']))
    expect(retail?.aliases.ja).not.toContain('店舗')
  })

  it('has guarded apply and dependency-aware rollback SQL', () => {
    expect(apply).toContain('retail alias conflicts with existing taxonomy')
    expect(apply).toContain('retail taxonomy post-write verification failed')
    expect(rollback).toContain('retail has building assignments')
    expect(rollback).toContain('retail taxonomy rows are missing or changed')
    expect(migration).toBe(apply)
    expect(migration).toContain("('retail', 'ja', '商店街')")
  })
})
