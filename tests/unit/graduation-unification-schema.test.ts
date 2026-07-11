import { describe, expect, it } from 'vitest'

import { validateFiles, validateGraduationUnificationSchema } from '../../scripts/validate-graduation-unification-schema.mjs'

describe('graduation unification schema draft', () => {
  it('passes all structure, permission and rollback guards', () => {
    expect(validateFiles()).toEqual([])
  })

  it('rejects a migration that writes case data during G3', () => {
    const errors = validateGraduationUnificationSchema(
      "DRAFT ONLY\nBEGIN;\nINSERT INTO public.graduation_case_profiles VALUES ('CASE-001');\nCOMMIT;",
      'BEGIN;\nCOMMIT;',
    )

    expect(errors.some(error => error.includes('data mutation'))).toBe(true)
  })
})
