import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import exactLinks from '../../db/review-decisions/graduation-building-links-001.json'
import fuzzyLinks from '../../db/review-decisions/graduation-building-links-002.json'
import functionLinks from '../../db/review-decisions/building-function-library-001.json'
import pack from '../../db/review-packets/graduation-unification-batch-001.json'

const root = process.cwd()
const applySql = fs.readFileSync(
  path.join(root, 'db/manual-operations/graduation-unification-batch-001-apply.sql'),
  'utf8',
)
const rollbackSql = fs.readFileSync(
  path.join(root, 'db/manual-operations/graduation-unification-batch-001-rollback.sql'),
  'utf8',
)

describe('graduation unification batch 001', () => {
  it('contains exactly the reviewed profile and function decisions', () => {
    const approvedCases = [...exactLinks.decisions, ...fuzzyLinks.decisions]
      .filter(item => item.decision === 'approved')
      .map(item => item.case_id)
      .sort()
    const approvedAssignments = functionLinks.decisions
      .flatMap(item => item.approved_functions.map(functionSlug => `${item.building_id}:${functionSlug}`))
      .sort()

    expect(pack.counts).toEqual({ profiles: 21, functions: 9, aliases: 122, assignments: 23 })
    expect(pack.profiles.map(item => item.case_id).sort()).toEqual(approvedCases)
    expect(pack.assignments.map(item => `${item.building_id}:${item.function_slug}`).sort()).toEqual(approvedAssignments)
    expect(new Set(pack.profiles.map(item => item.building_id)).size).toBe(21)
    expect(new Set(approvedAssignments).size).toBe(23)
  })

  it('keeps profile-only analysis complete and canonical facts out of the seed', () => {
    for (const profile of pack.profiles) {
      expect(profile.case_id).toMatch(/^CASE-[0-9]{3}$/)
      expect(profile.publication_status).toBe('published')
      expect(profile.concept_zh.length).toBeGreaterThan(20)
      expect(profile.keywords_zh.length).toBeGreaterThan(0)
      expect(profile.source_url).toMatch(/^https:\/\//)
      expect(profile).not.toHaveProperty('name')
      expect(profile).not.toHaveProperty('architect')
      expect(profile).not.toHaveProperty('image_url')
      expect(profile).not.toHaveProperty('year')
      expect(profile).not.toHaveProperty('location')
    }
  })

  it('guards exact references and never mutates canonical buildings or images', () => {
    expect(applySql).toContain("to_regclass('public.graduation_case_profiles')")
    expect(applySql).toContain('building.id = seed.building_id AND building.slug = seed.building_slug')
    expect(applySql).toContain('Post-write count mismatch')
    expect(applySql).not.toMatch(/(?:UPDATE|DELETE FROM|INSERT INTO) public\.(?:buildings|images)\b/i)
    expect(rollbackSql).not.toMatch(/(?:UPDATE|DELETE FROM|INSERT INTO|DROP TABLE IF EXISTS) public\.(?:buildings|images)\b/i)
  })

  it('executes foundation, seed, RLS checks, rollback and a second forward run in isolated PostgreSQL', () => {
    const output = execFileSync(process.execPath, ['scripts/verify-graduation-unification-dry-run.mjs'], {
      cwd: root,
      encoding: 'utf8',
    })

    expect(output).toContain('isolated PostgreSQL dry-run passed')
    expect(output).toContain('draft/inactive/candidate rows hidden')
    expect(output).toContain('anon INSERT rejected')
    expect(output).toContain('foundation rollback passed')
  })
})
