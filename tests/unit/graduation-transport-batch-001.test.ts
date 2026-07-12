import fs from 'node:fs'

import decisions from '../../db/review-decisions/graduation-new-buildings-transport-001.json'
import pack from '../../db/review-packets/graduation-transport-batch-001.json'

import { describe, expect, it } from 'vitest'

const apply = fs.readFileSync('db/manual-operations/graduation-transport-batch-001-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/graduation-transport-batch-001-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260712054802_graduation_transport_batch_001.sql', 'utf8')

describe('graduation transport batch 001 migration pack', () => {
  it('matches three approved decisions and deterministic counts', () => {
    expect(pack.counts).toEqual({ architects: 3, new_architects: 1, buildings: 3, images: 3, profiles: 3, assignments: 5 })
    expect(pack.buildings.map(item => item.case_id)).toEqual(['CASE-008', 'CASE-094', 'CASE-133'])
    expect(pack.profiles.map(item => item.case_id)).toEqual(decisions.decisions.map(item => item.case_id))
    expect(pack.architects.find(item => item.slug === 'foreign-office-architects')).toMatchObject({ is_new: true })
  })

  it('creates one primary transport-hub assignment per canonical building', () => {
    const primary = pack.assignments.filter(item => item.is_primary)
    expect(primary).toHaveLength(3)
    expect(primary.every(item => item.function_slug === 'transport-hub')).toBe(true)
    expect(pack.assignments.filter(item => item.function_slug === 'mixed-use')).toHaveLength(2)
  })

  it('uses the three reviewed primary images and corrected rights metadata', () => {
    expect(pack.images).toEqual(expect.arrayContaining([
      expect.objectContaining({ case_id: 'CASE-008', photographer: 'Mister0124', license: 'CC BY-SA 4.0' }),
      expect.objectContaining({ case_id: 'CASE-094', photographer: '江戸村のとくぞう', license: 'CC BY-SA 4.0' }),
      expect.objectContaining({ case_id: 'CASE-133', photographer: 'Syced', license: 'CC0' }),
    ]))
  })

  it('contains guarded forward and dependency-aware exact rollback SQL', () => {
    expect(apply).toContain('Graduation transport batch 001')
    expect(apply).toContain('requires empty target keys')
    expect(apply).toContain('post-write verification failed')
    expect(rollback).toContain('Rollback graduation transport batch 001 only')
    expect(rollback).toContain('reviewed batch rows are missing or changed')
    expect(rollback).toContain('external relations')
    expect(migration).toContain('Graduation transport batch 001')
    expect(migration).toContain('requires empty target keys')
    expect(migration).toContain('post-write verification failed')
  })
})
