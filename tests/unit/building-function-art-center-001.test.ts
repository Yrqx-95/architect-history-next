import fs from 'node:fs'

import taxonomy from '../../db/taxonomies/building-functions-v1.json'

import { describe, expect, it } from 'vitest'

const apply = fs.readFileSync('db/manual-operations/building-function-art-center-001-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/building-function-art-center-001-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260713021549_building_function_art_center_001.sql', 'utf8')

describe('art-center function taxonomy', () => {
  const artCenter = taxonomy.functions.find(item => item.slug === 'art-center')

  it('defines one art-center function with four complete locales', () => {
    expect(artCenter?.broad_type_slug).toBe('cultural')
    expect(Object.keys(artCenter?.names || {}).sort()).toEqual(['en', 'ja', 'zh', 'zh-Hant'].sort())
    expect(Object.values(artCenter?.aliases || {}).reduce((total, values) => total + values.length, 0)).toBe(8)
  })

  it('supports narrow multilingual art-center intent without claiming broader cultural centers', () => {
    expect(artCenter?.aliases.zh).toEqual(['艺术中心'])
    expect(artCenter?.aliases['zh-Hant']).toEqual(['藝術中心'])
    expect(artCenter?.aliases.en).toEqual(expect.arrayContaining(['art center', 'arts center', 'art centre', 'arts centre']))
    expect(artCenter?.aliases.ja).toEqual(expect.arrayContaining(['アートセンター', '芸術センター']))
    expect(artCenter?.aliases.en).not.toContain('cultural center')
    expect(artCenter?.aliases.en).not.toContain('cultural centre')
    expect(artCenter?.aliases.zh).not.toContain('文化中心')
    expect(artCenter?.aliases.ja).not.toContain('文化センター')
  })

  it('has guarded apply and dependency-aware rollback SQL', () => {
    expect(apply).toContain('art-center alias conflicts with existing taxonomy')
    expect(apply).toContain('art-center taxonomy post-write verification failed')
    expect(rollback).toContain('art-center has building assignments')
    expect(rollback).toContain('art-center taxonomy rows are missing or changed')
    expect(migration).toBe(apply)
    expect(migration).toContain("('art-center', 'ja', '芸術センター')")
  })
})
