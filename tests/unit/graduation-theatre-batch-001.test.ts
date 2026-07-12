import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import pack from '../../db/review-packets/graduation-theatre-batch-001.json'
import decisions from '../../db/review-decisions/graduation-new-buildings-theatre-001.json'

const root = process.cwd()
const applySql = fs.readFileSync(path.join(root, 'db/manual-operations/graduation-theatre-batch-001-apply.sql'), 'utf8')
const rollbackSql = fs.readFileSync(path.join(root, 'db/manual-operations/graduation-theatre-batch-001-rollback.sql'), 'utf8')

describe('graduation theatre batch 001 migration pack', () => {
  it('matches the four migration-approved decisions and deterministic counts', () => {
    expect(pack.mode).toBe('reviewed-dry-run-output-no-database-write')
    expect(pack.counts).toEqual({
      architects: 4,
      new_architects: 1,
      buildings: 4,
      images: 4,
      profiles: 4,
      assignments: 6,
    })
    expect(pack.buildings.map(item => item.case_id).sort()).toEqual(decisions.decisions.map(item => item.case_id).sort())
    expect(new Set(pack.buildings.map(item => item.id)).size).toBe(4)
    expect(new Set(pack.images.map(item => item.id)).size).toBe(4)
    expect(new Set(pack.assignments.map(item => `${item.building_id}:${item.function_slug}`)).size).toBe(6)
  })

  it('has one theatre primary function and one primary image per building', () => {
    for (const building of pack.buildings) {
      const assignments = pack.assignments.filter(item => item.building_id === building.id)
      expect(assignments.filter(item => item.is_primary)).toEqual([
        expect.objectContaining({ function_slug: 'theatre' }),
      ])
      expect(pack.images.filter(item => item.building_id === building.id && item.is_primary)).toHaveLength(1)
    }
  })

  it('contains guarded forward and exact rollback SQL', () => {
    expect(applySql).toContain('Graduation theatre batch 001')
    expect(applySql).toContain('requires empty target keys')
    expect(applySql).toContain('post-write verification failed')
    expect(rollbackSql).toContain('Rollback graduation theatre batch 001 only')
    expect(rollbackSql).toContain('Rollback refused: reviewed batch rows are missing or changed')
    expect(rollbackSql).toContain('external relations')
  })
})
