import fs from 'node:fs'

import decisions from '../../db/review-decisions/graduation-new-buildings-public-space-001.json'
import pack from '../../db/review-packets/graduation-public-space-batch-001.json'

import { describe, expect, it } from 'vitest'

const apply = fs.readFileSync('db/manual-operations/graduation-public-space-batch-001-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/graduation-public-space-batch-001-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260712064643_graduation_public_space_batch_001.sql', 'utf8')

describe('graduation public-space batch 001 migration pack', () => {
  it('matches four approved decisions and deterministic counts', () => {
    expect(pack.counts).toEqual({ architects: 4, new_architects: 3, buildings: 4, images: 4, profiles: 4, assignments: 5 })
    expect(pack.buildings.map(item => item.case_id)).toEqual(['CASE-050', 'CASE-056', 'CASE-110', 'CASE-111'])
    expect(pack.profiles.map(item => item.case_id)).toEqual(decisions.decisions.map(item => item.case_id))
    expect(pack.architects.find(item => item.slug === 'mvrdv')).toMatchObject({ is_new: false })
    expect(pack.architects.filter(item => item.is_new).map(item => item.slug)).toEqual([
      'taisei-design-nikken-sekkei',
      'field-operations-dsr-piet-oudolf',
      'big-topotek1-superflex',
    ])
  })

  it('creates one primary public-space assignment per canonical building', () => {
    const primary = pack.assignments.filter(item => item.is_primary)
    expect(primary).toHaveLength(4)
    expect(primary.every(item => item.function_slug === 'public-space')).toBe(true)
    expect(pack.assignments.filter(item => item.function_slug === 'mixed-use')).toEqual([
      expect.objectContaining({ building_slug: 'hisaya-odori-park', is_primary: false }),
    ])
  })

  it('uses the four reviewed primary images and corrected rights metadata', () => {
    expect(pack.images).toEqual(expect.arrayContaining([
      expect.objectContaining({ case_id: 'CASE-050', photographer: 'KKPCW', license: 'CC BY-SA 4.0' }),
      expect.objectContaining({ case_id: 'CASE-056', photographer: 'Pbdragonwang', license: 'CC BY-SA 4.0' }),
      expect.objectContaining({ case_id: 'CASE-110', photographer: 'Beyond My Ken', license: 'CC BY-SA 4.0' }),
      expect.objectContaining({ case_id: 'CASE-111', photographer: 'Emily', license: 'CC BY 2.0' }),
    ]))
  })

  it('keeps CASE-014 outside every migration seed', () => {
    expect(decisions.excluded).toEqual([expect.objectContaining({ case_id: 'CASE-014', decision: 'identity_not_bounded' })])
    expect(pack.buildings.some(item => item.case_id === 'CASE-014')).toBe(false)
    expect(pack.profiles.some(item => item.case_id === 'CASE-014')).toBe(false)
  })

  it('contains guarded forward and dependency-aware exact rollback SQL', () => {
    expect(apply).toContain('Graduation public space batch 001')
    expect(apply).toContain('requires empty target keys')
    expect(apply).toContain('post-write verification failed')
    expect(rollback).toContain('Rollback graduation public space batch 001 only')
    expect(rollback).toContain('reviewed batch rows are missing or changed')
    expect(rollback).toContain('external relations')
    expect(migration).toBe(apply)
  })
})
