import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

const root = process.cwd()
const forward = fs.readFileSync(path.join(root, 'db/migrations/v24-graduation-profile-many-to-one.sql'), 'utf8')
const rollback = fs.readFileSync(path.join(root, 'db/migrations/v24-graduation-profile-many-to-one-rollback.sql'), 'utf8')

describe('graduation profile many-to-one schema migration', () => {
  it('drops only the building uniqueness and installs a non-unique lookup index', () => {
    expect(forward).toContain('DROP CONSTRAINT IF EXISTS graduation_case_profiles_building_id_key')
    expect(forward).toContain('CREATE INDEX IF NOT EXISTS idx_graduation_case_profiles_building_id')
    expect(forward).toContain("conname = 'graduation_case_profiles_pkey'")
    expect(forward).toContain("conname = 'graduation_case_profiles_building_id_fkey'")
    expect(forward).not.toMatch(/DROP (?:TABLE|POLICY)/)
    expect(forward).not.toMatch(/(?:INSERT INTO|UPDATE public\.|DELETE FROM) /)
  })

  it('refuses rollback after multiple CASE profiles share a building', () => {
    expect(rollback).toContain('HAVING count(*) > 1')
    expect(rollback).toContain('Rollback refused: multiple CASE profiles already reference one building')
    expect(rollback).toContain('ADD CONSTRAINT graduation_case_profiles_building_id_key UNIQUE (building_id)')
  })
})
