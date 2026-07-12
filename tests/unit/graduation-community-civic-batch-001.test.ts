import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import pack from '../../db/review-packets/graduation-community-civic-batch-001.json'
import decisions from '../../db/review-decisions/graduation-new-buildings-community-civic-001.json'

const root = process.cwd()
const applySql = fs.readFileSync(path.join(root, 'db/manual-operations/graduation-community-civic-batch-001-apply.sql'), 'utf8')
const rollbackSql = fs.readFileSync(path.join(root, 'db/manual-operations/graduation-community-civic-batch-001-rollback.sql'), 'utf8')

describe('graduation community/civic batch 001 migration pack', () => {
  it('matches the single migration-approved decision and deterministic counts', () => {
    expect(pack.mode).toBe('reviewed-dry-run-output-no-database-write')
    expect(pack.counts).toEqual({
      architects: 1,
      new_architects: 1,
      buildings: 1,
      images: 1,
      profiles: 1,
      assignments: 3,
    })
    expect(pack.buildings.map(item => item.case_id)).toEqual(decisions.decisions.map(item => item.case_id))
    expect(pack.buildings[0]).toMatchObject({
      case_id: 'CASE-096',
      slug: 'japanese-american-cultural-community-center',
      year_start: 1983,
    })
    expect(pack.images[0]).toMatchObject({
      photographer: 'Another Believer',
      license: 'CC BY-SA 4.0',
      is_primary: true,
    })
  })

  it('has community-center primary and reviewed theatre/mixed-use secondary functions', () => {
    expect(pack.assignments).toEqual(expect.arrayContaining([
      expect.objectContaining({ function_slug: 'community-center', is_primary: true }),
      expect.objectContaining({ function_slug: 'theatre', is_primary: false }),
      expect.objectContaining({ function_slug: 'mixed-use', is_primary: false }),
    ]))
    expect(new Set(pack.assignments.map(item => `${item.building_id}:${item.function_slug}`)).size).toBe(3)
  })

  it('contains guarded forward and exact rollback SQL', () => {
    expect(applySql).toContain('Graduation community civic batch 001')
    expect(applySql).toContain('requires empty target keys')
    expect(applySql).toContain('post-write verification failed')
    expect(rollbackSql).toContain('Rollback graduation community civic batch 001 only')
    expect(rollbackSql).toContain('Rollback refused: reviewed batch rows are missing or changed')
    expect(rollbackSql).toContain('external relations')
  })
})
