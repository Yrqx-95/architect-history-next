import fs from 'node:fs'

import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-final-review-batch-014.json'
import pack from '../../db/review-packets/graduation-final-review-batch-014.json'
import cases from '../../public/data/graduation/cases.json'

const apply = fs.readFileSync('db/manual-operations/graduation-final-review-batch-014-apply.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260713033609_graduation_final_review_batch_014.sql', 'utf8')

describe('graduation final review batch 014', () => {
  it('closes the formal review queue without converting blockers into buildings', () => {
    expect(decisions.summary).toEqual({ reviewed: 6, migration_candidates: 3, blocked: 3, formally_unreviewed_remaining: 0 })
    expect(decisions.decisions.map(item => item.case_id)).toEqual(['CASE-100', 'CASE-126', 'CASE-136'])
    expect(decisions.excluded.map(item => item.case_id)).toEqual(['CASE-012', 'CASE-020', 'CASE-134'])
  })

  it('preserves exact approved rights and bounded functions', () => {
    expect(decisions.decisions.map(item => [item.case_id, item.image.license])).toEqual([
      ['CASE-100', 'CC BY-SA 4.0'],
      ['CASE-126', 'CC BY-SA 3.0'],
      ['CASE-136', 'CC BY-SA 2.0'],
    ])
    expect(decisions.decisions.map(item => [item.case_id, item.canonical_building.type_slug, item.function_slugs])).toEqual([
      ['CASE-100', 'cultural', ['public-space']],
      ['CASE-126', 'mixed-use', ['mixed-use', 'public-space', 'museum', 'retail']],
      ['CASE-136', 'civic-public', ['public-space', 'mixed-use']],
    ])
  })

  it('builds the guarded pack and aligns localized compatibility images', () => {
    expect(pack.counts).toEqual({ architects: 3, new_architects: 2, buildings: 3, images: 3, profiles: 3, assignments: 7 })
    expect(pack.assignments.filter(item => item.is_primary).map(item => [item.building_slug, item.function_slug])).toEqual([
      ['portland-japanese-garden-cultural-village', 'public-space'],
      ['metropol-parasol', 'mixed-use'],
      ['federation-square', 'public-space'],
    ])
    expect(cases.find(item => item.id === 'CASE-126')).toMatchObject({ image_url: '/images/graduation/cases/case-126-metropol-parasol.jpg', image_license: 'CC BY-SA 3.0' })
    expect(cases.find(item => item.id === 'CASE-136')).toMatchObject({ image_url: '/images/graduation/cases/case-136-federation-square.jpg', image_license: 'CC BY-SA 2.0' })
    expect(migration).toBe(apply)
  })
})
