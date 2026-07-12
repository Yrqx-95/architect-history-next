import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import pack from '../../db/review-packets/graduation-museum-batch-001.json'
import decisions from '../../db/review-decisions/graduation-new-buildings-museum-001.json'

const root = process.cwd()
const applySql = fs.readFileSync(path.join(root, 'db/manual-operations/graduation-museum-batch-001-apply.sql'), 'utf8')
const rollbackSql = fs.readFileSync(path.join(root, 'db/manual-operations/graduation-museum-batch-001-rollback.sql'), 'utf8')

describe('graduation museum batch 001 migration pack', () => {
  it('matches the fourteen approved decisions and deterministic counts', () => {
    expect(pack.mode).toBe('reviewed-dry-run-output-no-database-write')
    expect(pack.counts).toEqual({
      architects: 12,
      new_architects: 9,
      buildings: 14,
      images: 14,
      profiles: 14,
      assignments: 16,
    })
    expect(pack.buildings.map(item => item.case_id).sort()).toEqual(decisions.decisions.map(item => item.case_id).sort())
    expect(new Set(pack.buildings.map(item => item.id)).size).toBe(14)
    expect(new Set(pack.images.map(item => item.id)).size).toBe(14)
    expect(new Set(pack.assignments.map(item => `${item.building_id}:${item.function_slug}`)).size).toBe(16)
  })

  it('has one museum primary function and one primary image per building', () => {
    for (const building of pack.buildings) {
      const assignments = pack.assignments.filter(item => item.building_id === building.id)
      expect(assignments.filter(item => item.is_primary)).toEqual([
        expect.objectContaining({ function_slug: 'museum' }),
      ])
      expect(pack.images.filter(item => item.building_id === building.id && item.is_primary)).toHaveLength(1)
    }
  })

  it('contains guarded forward and exact rollback SQL', () => {
    expect(applySql).toContain('Graduation museum batch 001')
    expect(applySql).toContain("requires empty target keys")
    expect(applySql).toContain("post-write verification failed")
    expect(rollbackSql).toContain('Rollback graduation museum batch 001 only')
    expect(rollbackSql).toContain('Rollback refused: reviewed batch rows are missing or changed')
    expect(rollbackSql).toContain('external relations')
  })
})
