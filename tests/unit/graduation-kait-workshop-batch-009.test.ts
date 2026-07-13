import { describe, expect, it } from 'vitest'

import decisions from '../../db/review-decisions/graduation-new-buildings-kait-workshop-009.json'
import pack from '../../db/review-packets/graduation-kait-workshop-batch-009.json'
import cases from '../../src/content/graduation/cases.json'

describe('graduation KAIT Workshop batch 009', () => {
  it('keeps the university workshop identity bounded', () => {
    const decision = decisions.decisions[0]
    expect(decision.case_id).toBe('CASE-034')
    expect(decision.canonical_building).toMatchObject({
      slug: 'kait-workshop',
      type_slug: 'educational',
      architect_slug: 'junya-ishigami',
    })
    expect(decision.function_slugs).toEqual(['university'])
    expect(decision.function_slugs).not.toContain('mixed-use')
    expect(decision.function_slugs).not.toContain('community-center')
  })

  it('creates one architect, one building and one university assignment', () => {
    expect(pack.counts).toMatchObject({
      architects: 1,
      new_architects: 1,
      buildings: 1,
      images: 1,
      profiles: 1,
      assignments: 1,
    })
    expect(pack.architects[0]).toMatchObject({ slug: 'junya-ishigami', name_en: 'Junya Ishigami', is_new: true })
    expect(pack.assignments).toEqual([
      expect.objectContaining({ function_slug: 'university', is_primary: true }),
    ])
  })

  it('preserves the exact reviewed interior image and compatibility architect', () => {
    expect(pack.images[0]).toMatchObject({
      url_original: '/images/graduation/cases/case-034-kait-workshop.jpg',
      photographer: 'Epiq',
      source: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0',
      img_type: 'interior',
      source_url: 'https://commons.wikimedia.org/wiki/File:KAIT_Workshop_Junya_Ishigami_internal_view.JPG',
    })
    expect(cases.find(item => item.id === 'CASE-034')?.architect).toBe('Junya Ishigami')
  })
})
