import fs from 'node:fs'

import pack from '../../db/review-packets/graduation-shimokitazawa-retail-batch-001.json'

import { describe, expect, it } from 'vitest'

const apply = fs.readFileSync('db/manual-operations/graduation-shimokitazawa-retail-batch-001-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/graduation-shimokitazawa-retail-batch-001-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260712103506_graduation_shimokitazawa_retail_batch_001.sql', 'utf8')

describe('graduation Shimokitazawa retail batch 001 migration pack', () => {
  it('creates two distinct buildings while preserving both CASE profiles', () => {
    expect(pack.counts).toEqual({ architects: 2, new_architects: 2, buildings: 2, images: 2, profiles: 2, assignments: 5 })
    expect(pack.buildings.map(item => item.case_id)).toEqual(['CASE-038', 'CASE-039'])
    expect(new Set(pack.buildings.map(item => item.id)).size).toBe(2)
    expect(pack.profiles.map(item => item.case_id)).toEqual(['CASE-038', 'CASE-039'])
    expect(pack.profiles[0].concept_zh).not.toBe(pack.profiles[1].concept_zh)
    expect(pack.profiles[0].keywords_zh).not.toEqual(pack.profiles[1].keywords_zh)
  })

  it('uses commercial broad type and retail as each primary function', () => {
    expect(pack.buildings.every(item => item.type_slug === 'commercial')).toBe(true)
    expect(pack.assignments.filter(item => item.is_primary)).toEqual([
      expect.objectContaining({ building_slug: 'bonus-track-shimokitazawa', function_slug: 'retail' }),
      expect.objectContaining({ building_slug: 'mikan-shimokita', function_slug: 'retail' }),
    ])
    expect(pack.assignments.map(item => `${item.building_slug}:${item.function_slug}`)).toEqual([
      'bonus-track-shimokitazawa:retail',
      'bonus-track-shimokitazawa:mixed-use',
      'bonus-track-shimokitazawa:public-space',
      'mikan-shimokita:retail',
      'mikan-shimokita:mixed-use',
    ])
  })

  it('keeps MDPI and Commons image provenance distinct', () => {
    expect(pack.images).toEqual([
      expect.objectContaining({ case_id: 'CASE-038', source: 'MDPI', license: 'CC BY 4.0', is_primary: true }),
      expect.objectContaining({ case_id: 'CASE-039', source: 'Wikimedia Commons', license: 'CC0', photographer: 'Souka Kinmei', is_primary: true }),
    ])
  })

  it('contains guarded forward and dependency-aware exact rollback SQL', () => {
    expect(apply).toContain('Graduation Shimokitazawa retail batch 001')
    expect(apply).toContain("ARRAY['commercial']::text[]")
    expect(apply).toContain('requires empty target keys')
    expect(apply).toContain('post-write verification failed')
    expect(rollback).toContain('Rollback graduation shimokitazawa retail batch 001 only')
    expect(rollback).toContain('reviewed batch rows are missing or changed')
    expect(rollback).toContain('external relations')
    expect(migration).toBe(apply)
  })
})
