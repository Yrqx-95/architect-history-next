import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const queuePath = path.join(process.cwd(), 'db/review-queues/duplicate-primary-image-review-001.json')
const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'))
const decisionPath = path.join(process.cwd(), 'db/review-decisions/duplicate-primary-image-review-001.json')
const decisions = JSON.parse(fs.readFileSync(decisionPath, 'utf8'))
const migration = fs.readFileSync(path.join(process.cwd(), 'supabase/migrations/20260713113717_duplicate_primary_image_review_001.sql'), 'utf8')
const rollback = fs.readFileSync(path.join(process.cwd(), 'db/manual-operations/duplicate-primary-image-review-001-rollback.sql'), 'utf8')

describe('duplicate primary image audit snapshot', () => {
  it('keeps every conflict in review-required state', () => {
    expect(queue.writes_database).toBe(false)
    expect(queue.summary).toMatchObject({
      duplicate_primary_buildings: 498,
      commons_vs_unsplash: 498,
      commons_vs_commons: 0,
      safe_auto_apply: 0,
      formally_reviewed: 0,
    })
    expect(queue.items).toHaveLength(498)
    expect(queue.items.every((item: { safe_auto_apply: boolean }) => item.safe_auto_apply === false)).toBe(true)
    expect(queue.items.every((item: { review_status: string }) => item.review_status === 'needs-visual-identity-review')).toBe(true)
  })

  it('preserves completed 3 WTC work outside the duplicate queue', () => {
    expect(queue.items.some((item: { building_slug: string }) => item.building_slug === '3-world-trade-center')).toBe(false)
  })

  it('limits the first formal decision to the four Commons conflicts', () => {
    expect(decisions.status).toBe('reviewed-applied')
    expect(decisions.scope).toMatchObject({
      reviewed_buildings: 4,
      reviewed_primary_rows: 8,
      remaining_unreviewed_buildings: 498,
    })
    expect(decisions.decisions).toHaveLength(4)
    expect(new Set(decisions.decisions.map((item: { keep_image_id: string }) => item.keep_image_id)).size).toBe(4)
    expect(decisions.decisions.flatMap((item: { demote_image_ids: string[] }) => item.demote_image_ids)).toHaveLength(4)
    expect(decisions.verification).toMatchObject({
      production_written: true,
      production_migration_version: '20260713114101',
    })
  })

  it('keeps forward and rollback SQL guarded', () => {
    expect(migration).toContain("RAISE EXCEPTION 'Reviewed primary image rows changed'")
    expect(migration).toContain("RAISE EXCEPTION 'Unexpected primary image row exists in reviewed buildings'")
    expect(rollback).toContain("RAISE EXCEPTION 'Reviewed image state changed; refusing rollback'")
    expect(migration).toContain("'CC BY 2.5', true")
    expect(migration).toContain("'Tiia Monto', 'CC BY-SA 4.0', true")
    expect(migration).toContain("'Rs1421', 'CC BY-SA 3.0', true")
  })
})
