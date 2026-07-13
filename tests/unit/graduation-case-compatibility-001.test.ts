import fs from 'node:fs'

import { describe, expect, it } from 'vitest'

import cases from '../../public/data/graduation/cases.json'

const apply = fs.readFileSync('db/manual-operations/graduation-case-compatibility-001-apply.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260713042650_graduation_case_compatibility_001.sql', 'utf8')

describe('graduation CASE compatibility 001', () => {
  it('seeds every and only published compatibility CASE', () => {
    const published = cases.filter(item => item.status === 'published')
    expect(published).toHaveLength(101)
    for (const item of published) expect(apply).toContain(`('${item.id}',`)
    expect(apply.match(/\('CASE-\d{3}',/g)).toHaveLength(101)
  })

  it('keeps the reviewed migration byte-identical and rollback guarded', () => {
    expect(migration).toBe(apply)
    const rollback = fs.readFileSync('db/manual-operations/graduation-case-compatibility-001-rollback.sql', 'utf8')
    expect(rollback).toContain("row count drifted from 101")
  })
})
