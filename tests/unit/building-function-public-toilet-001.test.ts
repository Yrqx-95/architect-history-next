import fs from 'node:fs'

import taxonomy from '../../db/taxonomies/building-functions-v1.json'

import { describe, expect, it } from 'vitest'

const apply = fs.readFileSync('db/manual-operations/building-function-public-toilet-001-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/building-function-public-toilet-001-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260712073708_building_function_public_toilet_001.sql', 'utf8')

describe('public-toilet function taxonomy', () => {
  const publicToilet = taxonomy.functions.find(item => item.slug === 'public-toilet')

  it('defines one public-toilet function with four complete locales', () => {
    expect(publicToilet?.broad_type_slug).toBe('civic-public')
    expect(Object.keys(publicToilet?.names || {}).sort()).toEqual(['en', 'ja', 'zh', 'zh-Hant'].sort())
    expect(Object.values(publicToilet?.aliases || {}).reduce((total, values) => total + values.length, 0)).toBe(24)
  })

  it('supports multilingual public-toilet intent without claiming bare toilet', () => {
    expect(publicToilet?.aliases.zh).toEqual(expect.arrayContaining(['公共厕所', '公厕', '公共卫生间']))
    expect(publicToilet?.aliases['zh-Hant']).toEqual(expect.arrayContaining(['公共廁所', '公廁', '公共洗手間']))
    expect(publicToilet?.aliases.en).toEqual(expect.arrayContaining(['public toilet', 'public restroom', 'washroom']))
    expect(publicToilet?.aliases.ja).toEqual(expect.arrayContaining(['公共トイレ', '公衆トイレ', '公衆便所']))
    expect(publicToilet?.aliases.en).not.toContain('toilet')
  })

  it('has guarded apply and dependency-aware rollback SQL', () => {
    expect(apply).toContain('public-toilet alias conflicts with existing taxonomy')
    expect(apply).toContain('public-toilet taxonomy post-write verification failed')
    expect(rollback).toContain('public-toilet has building assignments')
    expect(rollback).toContain('public-toilet taxonomy rows are missing or changed')
    expect(migration).toBe(apply)
    expect(migration).toContain("('public-toilet', 'ja', '公園トイレ')")
  })
})
