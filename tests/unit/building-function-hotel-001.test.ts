import fs from 'node:fs'

import taxonomy from '../../db/taxonomies/building-functions-v1.json'

import { describe, expect, it } from 'vitest'

const apply = fs.readFileSync('db/manual-operations/building-function-hotel-001-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/building-function-hotel-001-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260712142813_building_function_hotel_001.sql', 'utf8')

describe('hotel function taxonomy', () => {
  const hotel = taxonomy.functions.find(item => item.slug === 'hotel')

  it('defines one hotel function with four complete locales', () => {
    expect(hotel?.broad_type_slug).toBe('commercial')
    expect(Object.keys(hotel?.names || {}).sort()).toEqual(['en', 'ja', 'zh', 'zh-Hant'].sort())
    expect(Object.values(hotel?.aliases || {}).reduce((total, values) => total + values.length, 0)).toBe(20)
  })

  it('supports multilingual lodging intent without claiming broad tourism or housing', () => {
    expect(hotel?.aliases.zh).toEqual(expect.arrayContaining(['酒店', '住宿设施', '精品酒店']))
    expect(hotel?.aliases['zh-Hant']).toEqual(expect.arrayContaining(['旅館', '住宿設施']))
    expect(hotel?.aliases.en).toEqual(expect.arrayContaining(['hotel', 'lodging', 'boutique hotel']))
    expect(hotel?.aliases.ja).toEqual(expect.arrayContaining(['ホテル', '宿泊施設', '旅館']))
    expect(hotel?.aliases.en).not.toContain('tourism')
    expect(hotel?.aliases.zh).not.toContain('住宅')
  })

  it('has guarded apply and dependency-aware rollback SQL', () => {
    expect(apply).toContain('hotel alias conflicts with existing taxonomy')
    expect(apply).toContain('hotel taxonomy post-write verification failed')
    expect(rollback).toContain('hotel has building assignments')
    expect(rollback).toContain('hotel taxonomy rows are missing or changed')
    expect(migration).toBe(apply)
    expect(migration).toContain("('hotel', 'ja', 'デザインホテル')")
  })
})
