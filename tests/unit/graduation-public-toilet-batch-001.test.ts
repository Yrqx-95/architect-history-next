import fs from 'node:fs'

import decisions from '../../db/review-decisions/graduation-new-buildings-public-toilet-001.json'
import pack from '../../db/review-packets/graduation-public-toilet-batch-001.json'

import { describe, expect, it } from 'vitest'

const apply = fs.readFileSync('db/manual-operations/graduation-public-toilet-batch-001-apply.sql', 'utf8')
const rollback = fs.readFileSync('db/manual-operations/graduation-public-toilet-batch-001-rollback.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260712094040_graduation_public_toilet_batch_001.sql', 'utf8')

describe('graduation public-toilet batch 001 migration pack', () => {
  it('contains only the approved CASE-044 canonical entity', () => {
    expect(pack.counts).toEqual({ architects: 1, new_architects: 0, buildings: 1, images: 1, profiles: 1, assignments: 2 })
    expect(pack.buildings.map(item => item.case_id)).toEqual(['CASE-044'])
    expect(pack.profiles.map(item => item.case_id)).toEqual(['CASE-044'])
    expect(pack.architects).toEqual([
      expect.objectContaining({ id: '51797239-be38-4dbd-9d7e-e413ddf3c78a', slug: 'kengo-kuma', is_new: false }),
    ])
  })

  it('uses civic-public as broad building type and public-toilet as primary function', () => {
    expect(pack.buildings[0]).toMatchObject({
      slug: 'nabeshima-shoto-park-toilet',
      type_slug: 'civic-public',
      architect_slug: 'kengo-kuma',
    })
    expect(pack.assignments).toEqual([
      expect.objectContaining({ function_slug: 'public-toilet', is_primary: true }),
      expect.objectContaining({ function_slug: 'public-space', is_primary: false }),
    ])
  })

  it('uses the exact reviewed image and rights metadata', () => {
    expect(pack.images).toEqual([
      expect.objectContaining({
        case_id: 'CASE-044',
        photographer: '鋸香具師',
        license: 'CC BY-SA 4.0',
        source_url: 'https://commons.wikimedia.org/wiki/File:Shoto_park_2302.jpg',
        is_primary: true,
      }),
    ])
  })

  it('keeps CASE-031 and CASE-049 outside every migration seed', () => {
    expect(decisions.excluded.map(item => item.case_id).sort()).toEqual(['CASE-031', 'CASE-049'])
    expect(pack.buildings.some(item => item.case_id === 'CASE-031' || item.case_id === 'CASE-049')).toBe(false)
    expect(pack.profiles.some(item => item.case_id === 'CASE-031' || item.case_id === 'CASE-049')).toBe(false)
  })

  it('contains guarded forward and dependency-aware exact rollback SQL', () => {
    expect(apply).toContain('Graduation public toilet batch 001')
    expect(apply).toContain("ARRAY['civic-public']::text[]")
    expect(apply).toContain('requires empty target keys')
    expect(apply).toContain('post-write verification failed')
    expect(rollback).toContain('Rollback graduation public toilet batch 001 only')
    expect(rollback).toContain('reviewed batch rows are missing or changed')
    expect(rollback).toContain('external relations')
    expect(migration).toBe(apply)
  })
})
