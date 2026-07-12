import fs from 'node:fs'

import taxonomy from '../../db/taxonomies/building-functions-v1.json'

import { describe, expect, it } from 'vitest'

const apply = fs.readFileSync('db/manual-operations/building-function-public-space-001-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/building-function-public-space-001-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260712062347_building_function_public_space_001.sql', 'utf8')

describe('public-space function taxonomy', () => {
  const publicSpace = taxonomy.functions.find(item => item.slug === 'public-space')

  it('defines one public-space function with four complete locales', () => {
    expect(publicSpace?.broad_type_slug).toBe('public-space')
    expect(Object.keys(publicSpace?.names || {}).sort()).toEqual(['en', 'ja', 'zh', 'zh-Hant'].sort())
    expect(Object.values(publicSpace?.aliases || {}).reduce((total, values) => total + values.length, 0)).toBe(26)
  })

  it('supports equivalent public-space, park, plaza and promenade queries', () => {
    expect(publicSpace?.aliases.zh).toEqual(expect.arrayContaining(['公共空间', '公园', '广场', '滨水步道', '线性公园']))
    expect(publicSpace?.aliases.en).toEqual(expect.arrayContaining(['public space', 'park', 'plaza', 'promenade', 'linear park']))
    expect(publicSpace?.aliases.ja).toEqual(expect.arrayContaining(['公共空間', '公園', '広場', '水辺遊歩道', '線形公園']))
    expect(publicSpace?.aliases.en).not.toContain('public')
  })

  it('has guarded apply and dependency-aware rollback SQL', () => {
    expect(apply).toContain('public-space alias conflicts with existing taxonomy')
    expect(apply).toContain('public-space taxonomy post-write verification failed')
    expect(rollback).toContain('public-space has building assignments')
    expect(rollback).toContain('public-space taxonomy rows are missing or changed')
    expect(migration).toContain('public-space alias conflicts with existing taxonomy')
    expect(migration).toContain("('public-space', 'ja', '線形公園')")
    expect(migration).toContain('public-space taxonomy post-write verification failed')
  })
})
