import fs from 'node:fs'
import path from 'node:path'

import { PGlite } from '@electric-sql/pglite'

const ROOT = process.cwd()
const pack = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'db/review-packets/graduation-unification-batch-001.json'), 'utf8'),
)
const foundationSql = fs.readFileSync(
  path.join(ROOT, 'db/migrations/v23-graduation-building-unification.sql'),
  'utf8',
)
const foundationRollbackSql = fs.readFileSync(
  path.join(ROOT, 'db/migrations/v23-graduation-building-unification-rollback.sql'),
  'utf8',
)
const seedSql = fs.readFileSync(
  path.join(ROOT, 'db/manual-operations/graduation-unification-batch-001-apply.sql'),
  'utf8',
)
const seedRollbackSql = fs.readFileSync(
  path.join(ROOT, 'db/manual-operations/graduation-unification-batch-001-rollback.sql'),
  'utf8',
)

function sqlText(value) {
  return `'${String(value).replaceAll("'", "''")}'`
}

async function scalar(db, query) {
  const result = await db.query(query)
  return Number(Object.values(result.rows[0])[0])
}

async function targetCounts(db) {
  return {
    profiles: await scalar(db, 'select count(*) from public.graduation_case_profiles'),
    functions: await scalar(db, 'select count(*) from public.building_functions'),
    aliases: await scalar(db, 'select count(*) from public.building_function_aliases'),
    assignments: await scalar(db, 'select count(*) from public.building_function_assignments'),
  }
}

function assertCounts(actual, expected, phase) {
  for (const [key, value] of Object.entries(expected)) {
    if (actual[key] !== value) {
      throw new Error(`${phase}: expected ${key}=${value}, got ${actual[key]}`)
    }
  }
}

const db = await PGlite.create()

try {
  await db.exec(`
    CREATE ROLE anon NOLOGIN;
    CREATE ROLE authenticated NOLOGIN;
    CREATE ROLE service_role NOLOGIN BYPASSRLS;

    CREATE TABLE public.building_types (
      slug text PRIMARY KEY
    );

    CREATE TABLE public.buildings (
      id uuid PRIMARY KEY,
      slug text NOT NULL UNIQUE
    );
  `)

  const broadTypes = [...new Set(pack.functions.map(item => item.broad_type_slug))]
  await db.exec(`INSERT INTO public.building_types (slug) VALUES ${broadTypes.map(slug => `(${sqlText(slug)})`).join(', ')};`)

  const buildingMap = new Map()
  for (const item of [...pack.profiles, ...pack.assignments]) {
    const existing = buildingMap.get(item.building_id)
    if (existing && existing !== item.building_slug) {
      throw new Error(`Pack maps UUID ${item.building_id} to multiple slugs`)
    }
    buildingMap.set(item.building_id, item.building_slug)
  }
  await db.exec(`INSERT INTO public.buildings (id, slug) VALUES ${[...buildingMap]
    .map(([id, slug]) => `(${sqlText(id)}::uuid, ${sqlText(slug)})`)
    .join(', ')};`)

  const canonicalBuildingCount = buildingMap.size
  await db.exec(foundationSql)
  await db.exec(seedSql)

  assertCounts(await targetCounts(db), pack.counts, 'forward migration')

  const hiddenBuildingId = '00000000-0000-4000-8000-000000000001'
  await db.exec(`
    INSERT INTO public.buildings (id, slug) VALUES ('${hiddenBuildingId}'::uuid, 'rls-hidden-fixture');
    INSERT INTO public.graduation_case_profiles (
      case_id, building_id, concept_zh, source_url, publication_status
    ) VALUES (
      'CASE-999', '${hiddenBuildingId}'::uuid, 'RLS fixture', 'https://example.com/rls-fixture', 'draft'
    );
    INSERT INTO public.building_functions (
      slug, broad_type_slug, name_zh, name_zh_hant, name_en, name_ja, is_active
    ) VALUES (
      'hidden-function', 'cultural', '隐藏', '隱藏', 'Hidden', '非公開', false
    );
    INSERT INTO public.building_function_aliases (function_slug, locale, alias)
    VALUES ('hidden-function', 'en', 'hidden alias');
    INSERT INTO public.building_function_assignments (
      building_id, function_slug, confidence, review_status, assignment_method
    ) VALUES (
      '${hiddenBuildingId}'::uuid, 'library', 0.5, 'candidate', 'ai-suggested'
    );
  `)

  await db.exec('SET ROLE anon;')
  assertCounts(await targetCounts(db), pack.counts, 'anon RLS read')
  let anonWriteRejected = false
  try {
    await db.exec(`INSERT INTO public.building_functions (
      slug, name_zh, name_zh_hant, name_en, name_ja
    ) VALUES ('should-fail', '禁止', '禁止', 'Forbidden', '禁止');`)
  } catch {
    anonWriteRejected = true
  }
  await db.exec('RESET ROLE;')
  if (!anonWriteRejected) throw new Error('anon unexpectedly wrote to building_functions')

  await db.exec('SET ROLE authenticated;')
  assertCounts(await targetCounts(db), pack.counts, 'authenticated RLS read')
  await db.exec('RESET ROLE;')

  await db.exec(`
    DELETE FROM public.building_function_assignments WHERE building_id = '${hiddenBuildingId}'::uuid;
    DELETE FROM public.graduation_case_profiles WHERE case_id = 'CASE-999';
    DELETE FROM public.building_functions WHERE slug = 'hidden-function';
    DELETE FROM public.buildings WHERE id = '${hiddenBuildingId}'::uuid;
  `)

  await db.exec(seedRollbackSql)
  assertCounts(await targetCounts(db), { profiles: 0, functions: 0, aliases: 0, assignments: 0 }, 'seed rollback')
  if (await scalar(db, 'select count(*) from public.buildings') !== canonicalBuildingCount) {
    throw new Error('Seed rollback changed canonical buildings')
  }

  await db.exec(seedSql)
  assertCounts(await targetCounts(db), pack.counts, 'second forward migration after rollback')
  await db.exec(seedRollbackSql)
  await db.exec(foundationRollbackSql)

  if (await scalar(db, "select count(*) from pg_tables where schemaname='public' and tablename in ('graduation_case_profiles','building_functions','building_function_aliases','building_function_assignments')") !== 0) {
    throw new Error('Foundation rollback left unification tables behind')
  }
  if (await scalar(db, 'select count(*) from public.buildings') !== canonicalBuildingCount) {
    throw new Error('Foundation rollback changed canonical buildings')
  }

  console.log('Graduation unification isolated PostgreSQL dry-run passed.')
  console.log(`- PostgreSQL engine: ${await scalar(db, "select current_setting('server_version_num')::integer")}`)
  console.log(`- canonical buildings preserved: ${canonicalBuildingCount}`)
  console.log(`- forward counts: ${JSON.stringify(pack.counts)}`)
  console.log('- draft/inactive/candidate rows hidden from anon and authenticated')
  console.log('- anon SELECT allowed; anon INSERT rejected')
  console.log('- seed rollback, second forward run, and foundation rollback passed')
} finally {
  await db.close()
}
