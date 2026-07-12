import fs from 'node:fs'
import path from 'node:path'

import { PGlite } from '@electric-sql/pglite'
import { describe, expect, it } from 'vitest'

const generator = fs.readFileSync(
  path.join(process.cwd(), 'scripts/prepare-graduation-library-batch-002.mjs'),
  'utf8',
)

describe('graduation shared canonical-building generator', () => {
  it('keeps legacy decisions as creates and accepts explicit existing-building reuse', () => {
    expect(generator).toContain("item.migration_mode || 'create_canonical_building'")
    expect(generator).toContain("migrationMode(item) === 'reuse_existing_canonical_building'")
    expect(generator).toContain('cannot reuse missing production building')
    expect(generator).toContain('existing building UUID drift')
  })

  it('does not recreate building-owned rows for reused canonical buildings', () => {
    expect(generator).toContain('const buildings = createDecisions.map')
    expect(generator).toContain('const images = createDecisions.map')
    expect(generator).toContain('const assignments = createDecisions.flatMap')
    expect(generator).toContain('const profiles = decisions.decisions.map')
  })

  it('allows several CASE profiles to reference one building and rolls back only those profiles', async () => {
    const db = await PGlite.create()
    try {
      await db.exec(`
        CREATE TABLE buildings (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE);
        CREATE TABLE graduation_case_profiles (
          case_id text PRIMARY KEY,
          building_id uuid NOT NULL REFERENCES buildings(id) ON DELETE CASCADE,
          concept_zh text NOT NULL,
          keywords_zh text[] NOT NULL
        );
        INSERT INTO buildings VALUES ('00000000-0000-4000-8000-000000000037', 'home-for-all-rikuzentakata');
        INSERT INTO graduation_case_profiles VALUES
          ('CASE-037', '00000000-0000-4000-8000-000000000037', '共同客厅', ARRAY['灾后复兴', '木造']),
          ('CASE-090', '00000000-0000-4000-8000-000000000037', '社区记忆', ARRAY['共同客厅', '小尺度']);
      `)

      const shared = await db.query(`
        SELECT building_id, count(*)::integer AS profile_count,
          count(DISTINCT concept_zh)::integer AS concept_count
        FROM graduation_case_profiles GROUP BY building_id
      `)
      expect(shared.rows).toEqual([expect.objectContaining({ profile_count: 2, concept_count: 2 })])

      await db.exec(`
        DELETE FROM graduation_case_profiles
        WHERE case_id IN ('CASE-037', 'CASE-090')
          AND building_id = '00000000-0000-4000-8000-000000000037';
      `)
      expect((await db.query('SELECT count(*)::integer AS count FROM buildings')).rows[0]).toEqual({ count: 1 })
      expect((await db.query('SELECT count(*)::integer AS count FROM graduation_case_profiles')).rows[0]).toEqual({ count: 0 })
    } finally {
      await db.close()
    }
  })

  it('retains the external-profile rollback guard for newly created shared buildings', () => {
    expect(generator).toContain('LEFT JOIN profile_rollback expected ON target.case_id = expected.case_id')
    expect(generator).toContain("RAISE EXCEPTION 'Rollback refused: found % external relations")
    expect(generator).toContain('CREATE TEMP TABLE profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL)')
  })
})
