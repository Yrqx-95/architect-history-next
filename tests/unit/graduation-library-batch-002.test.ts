import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-library-002.json'
import pack from '../../db/review-packets/graduation-library-batch-002.json'
import cases from '../../src/content/graduation/cases.json'

const root = process.cwd()
const applySql = fs.readFileSync(path.join(root, 'db/manual-operations/graduation-library-batch-002-apply.sql'), 'utf8')
const rollbackSql = fs.readFileSync(path.join(root, 'db/manual-operations/graduation-library-batch-002-rollback.sql'), 'utf8')

describe('graduation library batch 002 migration pack', () => {
  it('contains fourteen approved cases and never includes CASE-079', () => {
    expect(pack.mode).toBe('reviewed-dry-run-output-no-database-write')
    expect(pack.counts).toEqual({ architects: 13, new_architects: 11, buildings: 14, images: 14, profiles: 14, assignments: 36 })
    expect(pack.buildings.map(item => item.case_id)).not.toContain('CASE-079')
    expect(new Set(pack.architects.map(item => item.id)).size).toBe(13)
    expect(new Set(pack.buildings.map(item => item.id)).size).toBe(14)
    expect(new Set(pack.buildings.map(item => item.slug)).size).toBe(14)
    expect(new Set(pack.images.map(item => item.id)).size).toBe(14)
    expect(new Set(pack.profiles.map(item => item.case_id)).size).toBe(14)
    expect(new Set(pack.assignments.map(item => `${item.building_id}:${item.function_slug}`)).size).toBe(36)
  })

  it('keeps decisions, public cases, buildings, images and profiles synchronized', () => {
    const decisionsByCase = new Map(decisions.decisions.map(item => [item.case_id, item]))
    const casesById = new Map(cases.map(item => [item.id, item]))
    const buildingsByCase = new Map(pack.buildings.map(item => [item.case_id, item]))
    const profilesByCase = new Map(pack.profiles.map(item => [item.case_id, item]))

    for (const image of pack.images) {
      const decision = decisionsByCase.get(image.case_id)
      const sourceCase = casesById.get(image.case_id)
      const building = buildingsByCase.get(image.case_id)
      const profile = profilesByCase.get(image.case_id)
      expect(building?.slug).toBe(decision?.canonical_building.slug)
      expect(building?.country_code).toBe(decision?.canonical_building.country_code)
      expect(image.building_id).toBe(building?.id)
      expect(image.url_original).toBe(sourceCase?.image_url)
      expect(image.source_url).toBe(decision?.image.source_url)
      expect(image.license).toBe(decision?.image.license)
      expect(profile?.building_id).toBe(building?.id)
      expect(profile?.source_url).toBe(sourceCase?.source_url)
      expect(pack.assignments.filter(item => item.building_id === building?.id && item.is_primary)).toHaveLength(1)
      expect(pack.assignments.find(item => item.building_id === building?.id && item.is_primary)?.function_slug).toBe('library')
    }
  })

  it('uses guarded transactional apply and dependency-aware rollback', () => {
    expect(applySql).toMatch(/^-- Graduation library batch 002/)
    expect(applySql).toContain('BEGIN;')
    expect(applySql).toContain('required_type_matches')
    expect(applySql).toContain('requires empty target keys')
    expect(applySql).toContain('post-write verification failed')
    expect(applySql.trimEnd()).toMatch(/COMMIT;$/)
    expect(rollbackSql).toContain('Rollback refused: reviewed batch rows are missing or changed')
    expect(rollbackSql).toContain('Rollback refused: found % external relations added after batch 002')
    expect(rollbackSql).toContain('public.curated_images')
    expect(rollbackSql).toContain('public.architect_influences')
    expect(rollbackSql.trimEnd()).toMatch(/COMMIT;$/)
  })
})
