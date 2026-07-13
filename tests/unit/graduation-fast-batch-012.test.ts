import fs from 'node:fs'

import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-fast-batch-012.json'
import pack from '../../db/review-packets/graduation-fast-batch-012.json'
import cases from '../../src/content/graduation/cases.json'

const apply = fs.readFileSync('db/manual-operations/graduation-fast-batch-012-apply.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260713031753_graduation_fast_batch_012.sql', 'utf8')

describe('graduation fast batch 012 review', () => {
  it('reviews seven records while migrating only the three evidence-complete cases', () => {
    expect(decisions.summary).toMatchObject({ reviewed: 7, migration_candidates: 3, blocked: 4 })
    expect(decisions.decisions.map(item => item.case_id)).toEqual(['CASE-068', 'CASE-077', 'CASE-089'])
    expect(decisions.excluded.map(item => item.case_id)).toEqual(['CASE-009', 'CASE-017', 'CASE-063', 'CASE-071'])
  })

  it('keeps functions and historical identities bounded', () => {
    const [miyashita, pasona, hof] = decisions.decisions
    expect(miyashita.canonical_building).toMatchObject({ slug: 'miyashita-park-2011', type_slug: 'public-space' })
    expect(miyashita.function_slugs).toEqual(['public-space'])
    expect(pasona.canonical_building.type_slug).toBe('office')
    expect(pasona.function_slugs).toEqual(['mixed-use'])
    expect(hof.canonical_building.type_slug).toBe('office')
    expect(hof.function_slugs).toEqual(['mixed-use', 'public-space'])
  })

  it('preserves exact approved image rights', () => {
    expect(decisions.decisions.map(item => [item.case_id, item.image.license])).toEqual([
      ['CASE-068', 'CC BY 3.0'],
      ['CASE-077', 'CC BY-SA 3.0'],
      ['CASE-089', 'CC BY-SA 2.0'],
    ])
  })

  it('builds one combined guarded migration with exact primary functions', () => {
    expect(pack.counts).toEqual({ architects: 3, new_architects: 3, buildings: 3, images: 3, profiles: 3, assignments: 4 })
    expect(pack.assignments.filter(item => item.is_primary).map(item => [item.building_slug, item.function_slug])).toEqual([
      ['miyashita-park-2011', 'public-space'],
      ['pasona-urban-farm', 'mixed-use'],
      ['het-hof-van-cartesius', 'mixed-use'],
    ])
    expect(pack.images.find(item => item.case_id === 'CASE-089')).toMatchObject({ photographer: 'nandasluijsmans', source: 'Flickr' })
    expect(cases.find(item => item.id === 'CASE-089')?.architect).toBe('Hof van Cartesius Cooperative')
    expect(migration).toBe(apply)
  })
})
