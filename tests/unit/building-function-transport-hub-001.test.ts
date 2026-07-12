import fs from 'node:fs'

import taxonomy from '../../db/taxonomies/building-functions-v1.json'

import { describe, expect, it } from 'vitest'

const apply = fs.readFileSync('db/manual-operations/building-function-transport-hub-001-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/building-function-transport-hub-001-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260712052847_building_function_transport_hub_001.sql', 'utf8')

describe('transport-hub function taxonomy', () => {
  const transport = taxonomy.functions.find(item => item.slug === 'transport-hub')

  it('defines one transportation function with four complete locales', () => {
    expect(transport?.broad_type_slug).toBe('transportation')
    expect(Object.keys(transport?.names || {}).sort()).toEqual(['en', 'ja', 'zh', 'zh-Hant'].sort())
    expect(Object.values(transport?.aliases || {}).every(values => values.length > 0)).toBe(true)
  })

  it('supports equivalent Chinese, English and Japanese transport queries', () => {
    expect(transport?.aliases.zh).toContain('交通枢纽')
    expect(transport?.aliases.en).toContain('transport hub')
    expect(transport?.aliases.en).toContain('station')
    expect(transport?.aliases.ja).toContain('交通拠点')
    expect(transport?.aliases.ja).toContain('駅')
  })

  it('has guarded apply and dependency-aware rollback SQL', () => {
    expect(apply).toContain('transport-hub alias conflicts with existing taxonomy')
    expect(apply).toContain('transport-hub taxonomy post-write verification failed')
    expect(rollback).toContain('transport-hub has building assignments')
    expect(rollback).toContain('transport-hub taxonomy rows are missing or changed')
    expect(migration).toContain('transport-hub alias conflicts with existing taxonomy')
    expect(migration).toContain("('transport-hub', 'ja', '客船ターミナル')")
    expect(migration).toContain('transport-hub taxonomy post-write verification failed')
  })
})
