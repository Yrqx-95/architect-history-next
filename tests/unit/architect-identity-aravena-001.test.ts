import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import decision from '../../db/review-decisions/architect-identity-aravena-001.json'
import overrides from '../../src/lib/architect-image-overrides.json'

const root = process.cwd()
const migration = fs.readFileSync(
  path.join(root, 'supabase/migrations/20260714073151_architect_identity_aravena_001.sql'),
  'utf8',
)
const rollback = fs.readFileSync(
  path.join(root, 'db/manual-operations/architect-identity-aravena-001-rollback.sql'),
  'utf8',
)
const nextConfig = fs.readFileSync(path.join(root, 'next.config.ts'), 'utf8')

describe('Alejandro Aravena identity review', () => {
  it('keeps the complete canonical identity and limits the merge to two reviewed buildings', () => {
    expect(decision.status).toBe('reviewed-ready-for-production')
    expect(decision.decision).toMatchObject({
      action: 'merge-duplicate-identity',
      keep_architect_id: '5000f72e-c893-4df6-84fe-33617581cd24',
      remove_architect_id: '4a93c6b4-c020-4291-bbbf-cb2bd94f5257',
      canonical_name: 'Alejandro Aravena',
      reassign_buildings_to_slug: 'aravena',
      confidence: 'high',
    })
    expect(decision.scope.reviewed_building_slugs).toEqual([
      'center-of-innovation-anacleto-angelini',
      'edp-headquarters-ii',
    ])
    expect(decision.evidence.some(item => item.url === 'https://www.elementalchile.cl/en/works/edp-headquarters')).toBe(true)
    expect(decision.production).toMatchObject({
      written: false,
      post_write_verified: false,
      isolated_postgres_dry_run: 'passed',
    })
  })

  it('guards the production migration and rollback against snapshot drift and replay', () => {
    expect(migration).toContain('Reviewed Aravena building set changed')
    expect(migration).toContain('Misspelled Aravena duplicate gained protected references')
    expect(migration).toContain('Aravena identity merge postcondition failed')
    expect(rollback).toContain('Rollback refused: duplicate or conflicting Aravena record already exists')
    expect(rollback).toContain('Rollback Aravena identity postcondition failed')
  })

  it('removes the duplicate portrait override while preserving the canonical portrait', () => {
    expect(overrides.aravena).toMatchObject({
      author: 'Centro de Políticas Públicas UC',
      license: 'CC BY 3.0',
      wikidata_id: 'Q3609433',
    })
    expect('alejandro-alavena' in overrides).toBe(false)
  })

  it('preserves the misspelled public URL as a permanent redirect in every language', () => {
    expect(nextConfig).toContain("return ['zh', 'en', 'ja'].map")
    expect(nextConfig).toContain('source: `/${lang}/architect/alejandro-alavena`')
    expect(nextConfig).toContain('destination: `/${lang}/architect/aravena`')
    expect(nextConfig).toContain('permanent: true')
  })
})
