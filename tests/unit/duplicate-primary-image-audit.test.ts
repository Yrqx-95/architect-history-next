import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const queuePath = path.join(process.cwd(), 'db/review-queues/duplicate-primary-image-review-001.json')
const queue = JSON.parse(fs.readFileSync(queuePath, 'utf8'))
const decisionPath = path.join(process.cwd(), 'db/review-decisions/duplicate-primary-image-review-001.json')
const decisions = JSON.parse(fs.readFileSync(decisionPath, 'utf8'))
const migration = fs.readFileSync(path.join(process.cwd(), 'supabase/migrations/20260713113717_duplicate_primary_image_review_001.sql'), 'utf8')
const rollback = fs.readFileSync(path.join(process.cwd(), 'db/manual-operations/duplicate-primary-image-review-001-rollback.sql'), 'utf8')
const decisions002 = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'db/review-decisions/duplicate-primary-image-review-002.json'), 'utf8'))
const migration002 = fs.readFileSync(path.join(process.cwd(), 'supabase/migrations/20260713132300_duplicate_primary_image_review_002.sql'), 'utf8')
const rollback002 = fs.readFileSync(path.join(process.cwd(), 'db/manual-operations/duplicate-primary-image-review-002-rollback.sql'), 'utf8')
const decisions003 = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'db/review-decisions/duplicate-primary-image-review-003.json'), 'utf8'))
const migration003 = fs.readFileSync(path.join(process.cwd(), 'supabase/migrations/20260713134524_duplicate_primary_image_review_003.sql'), 'utf8')
const rollback003 = fs.readFileSync(path.join(process.cwd(), 'db/manual-operations/duplicate-primary-image-review-003-rollback.sql'), 'utf8')
const localOverrides = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/lib/local-image-overrides.json'), 'utf8'))

describe('duplicate primary image audit snapshot', () => {
  it('keeps every conflict in review-required state', () => {
    expect(queue.writes_database).toBe(false)
    expect(queue.summary).toMatchObject({
      duplicate_primary_buildings: 493,
      commons_vs_unsplash: 493,
      commons_vs_commons: 0,
      safe_auto_apply: 0,
      formally_reviewed: 0,
    })
    expect(queue.items).toHaveLength(493)
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

  it('keeps runtime override attribution aligned with reviewed Commons metadata', () => {
    expect(localOverrides['finlandia-hall']).toMatchObject({
      cover_photographer: 'Thermos',
      cover_license: 'CC BY 2.5',
      cover_source_url: 'https://commons.wikimedia.org/wiki/File:Finlandia_Wiki.jpg',
    })
    expect(queue.items.every((item: { runtime_cover_source: string }) => [
      'local-override',
      'curated-override',
      'supabase-primary-selection',
    ].includes(item.runtime_cover_source))).toBe(true)
  })

  it('records the second batch as three applied decisions and two license deferrals', () => {
    expect(decisions002.status).toBe('reviewed-applied')
    expect(decisions002.scope).toMatchObject({
      reviewed_buildings: 5,
      approved_buildings: 3,
      deferred_buildings: 2,
      approved_primary_rows: 6,
    })
    expect(decisions002.decisions.filter((item: { decision: string }) => item.decision === 'defer')).toHaveLength(2)
    expect(decisions002.verification).toMatchObject({
      production_written: true,
      production_migration_version: '20260713132011',
    })
    expect(migration002).toContain("RAISE EXCEPTION 'Reviewed primary image rows changed'")
    expect(migration002).toContain("RAISE EXCEPTION 'Unexpected primary image row exists in reviewed buildings'")
    expect(rollback002).toContain("RAISE EXCEPTION 'Reviewed image state changed; refusing rollback'")
  })

  it('records the third batch as two applied decisions and three strict deferrals', () => {
    expect(decisions003.status).toBe('reviewed-applied')
    expect(decisions003.scope).toMatchObject({
      reviewed_buildings: 5,
      approved_buildings: 2,
      deferred_buildings: 3,
      approved_primary_rows: 4,
    })
    expect(decisions003.decisions.filter((item: { decision: string }) => item.decision === 'defer')).toHaveLength(3)
    expect(decisions003.verification).toMatchObject({
      production_written: true,
      production_migration_version: '20260713134754',
    })
    expect(migration003).toContain("RAISE EXCEPTION 'Reviewed primary image rows changed'")
    expect(migration003).toContain("RAISE EXCEPTION 'Unexpected primary image row exists in reviewed buildings'")
    expect(rollback003).toContain("RAISE EXCEPTION 'Reviewed image state changed; refusing rollback'")
  })
})
