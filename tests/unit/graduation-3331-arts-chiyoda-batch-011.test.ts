import fs from 'node:fs'

import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-3331-arts-chiyoda-011.json'
import pack from '../../db/review-packets/graduation-3331-arts-chiyoda-batch-011.json'
import cases from '../../src/content/graduation/cases.json'

const apply = fs.readFileSync('db/manual-operations/graduation-3331-arts-chiyoda-batch-011-apply.sql', 'utf8')
const migration = fs.readFileSync('supabase/migrations/20260713024255_graduation_3331_arts_chiyoda_batch_011.sql', 'utf8')

describe('graduation 3331 Arts Chiyoda batch 011', () => {
  it('keeps the historical art-center identity and renovation authorship explicit', () => {
    const decision = decisions.decisions[0]
    expect(decision.case_id).toBe('CASE-005')
    expect(decision.canonical_building).toMatchObject({
      slug: '3331-arts-chiyoda',
      type_slug: 'cultural',
      architect_slug: 'shinya-sato-mejiro-studio',
    })
    expect(decision.architect_identity.name_en).toBe('Shinya Sato + Mejiro Studio')
    expect(decision.canonical_building.historical_status).toContain('closed in 2023')
  })

  it('requires a narrow art-center taxonomy without broader false synonyms', () => {
    expect(decisions.taxonomy_prerequisite.slug).toBe('art-center')
    expect(decisions.taxonomy_prerequisite.broad_type_slug).toBe('cultural')
    expect(decisions.taxonomy_prerequisite.excluded_aliases).toEqual(
      expect.arrayContaining(['文化中心', '文化センター', 'cultural center', 'cultural centre']),
    )
    expect(decisions.decisions[0].function_slugs).toEqual(['art-center'])
    expect(decisions.decisions[0].rejected_function_slugs).toEqual(
      expect.arrayContaining(['museum', 'mixed-use', 'community-center', 'retail', 'public-space']),
    )
  })

  it('preserves the reviewed CC0 image evidence', () => {
    expect(decisions.decisions[0].image).toMatchObject({
      local_path: '/images/graduation/cases/case-005-3331-arts-chiyoda.jpg',
      source_url: 'https://commons.wikimedia.org/wiki/File:3331_Arts_Chiyoda.JPG',
      license: 'CC0',
      credit: 'Ootahara / Wikimedia Commons',
      source_width: 4608,
      source_height: 3440,
      local_width: 1600,
      local_height: 1194,
      local_sha256: '3a4fad3c48d68feeab9570b25243c8662d2981e4c0b5dc576779698159ed1bb2',
    })
  })

  it('builds one exact canonical migration and preserves historical status', () => {
    expect(pack.counts).toEqual({ architects: 1, new_architects: 1, buildings: 1, images: 1, profiles: 1, assignments: 1 })
    expect(pack.architects[0]).toMatchObject({ slug: 'shinya-sato-mejiro-studio', name_en: 'Shinya Sato + Mejiro Studio', is_new: true })
    expect(pack.assignments).toEqual([expect.objectContaining({ function_slug: 'art-center', is_primary: true })])
    expect(pack.profiles[0].concept_en).toContain('closed in 2023')
    expect(cases.find(item => item.id === 'CASE-005')?.architect).toBe('Shinya Sato + Mejiro Studio')
  })

  it('keeps the reviewed migration byte-identical', () => {
    expect(migration).toBe(apply)
    expect(migration).toContain("'CASE-005'")
    expect(migration).toContain("'art-center'")
  })
})
