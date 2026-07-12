import fs from 'node:fs'
import path from 'node:path'

import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const forwardSql = read('db/migrations/v24-graduation-profile-many-to-one.sql')
const rollbackSql = read('db/migrations/v24-graduation-profile-many-to-one-rollback.sql')
const db = await PGlite.create()

try {
  await db.exec(`
    CREATE ROLE anon NOLOGIN;
    CREATE ROLE authenticated NOLOGIN;
    CREATE TABLE public.buildings (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE);
    CREATE TABLE public.graduation_case_profiles (
      case_id text PRIMARY KEY,
      building_id uuid NOT NULL UNIQUE REFERENCES public.buildings(id) ON DELETE RESTRICT,
      concept_zh text NOT NULL,
      source_url text NOT NULL,
      publication_status text NOT NULL DEFAULT 'draft'
    );
    ALTER TABLE public.graduation_case_profiles ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "public read published graduation profiles"
      ON public.graduation_case_profiles
      FOR SELECT TO anon, authenticated
      USING (publication_status = 'published');
    GRANT SELECT ON public.graduation_case_profiles TO anon, authenticated;
    INSERT INTO public.buildings VALUES ('00000000-0000-4000-8000-000000000001', 'shared-project');
    INSERT INTO public.graduation_case_profiles VALUES
      ('CASE-024', '00000000-0000-4000-8000-000000000001', 'analysis A', 'https://example.com/a', 'published');
  `)

  const baseline = await state()
  assert(baseline.profileCount === 1, 'Legacy baseline profile count drifted')
  assert(baseline.uniqueConstraintCount === 1, 'Legacy unique constraint is missing')
  assert(baseline.rlsEnabled, 'Legacy RLS is not enabled')

  await db.exec(forwardSql)
  await assertForward('first forward')

  await db.exec(`
    INSERT INTO public.graduation_case_profiles VALUES
      ('CASE-065', '00000000-0000-4000-8000-000000000001', 'analysis B', 'https://example.com/b', 'published');
  `)
  await db.exec('SET ROLE anon;')
  assert(await scalar('select count(*) from public.graduation_case_profiles') === 2, 'anon cannot read both published profiles')
  await db.exec('RESET ROLE;')

  let refused = false
  try {
    await db.exec(rollbackSql)
  } catch (error) {
    refused = String(error).includes('multiple CASE profiles already reference one building')
    await db.exec('ROLLBACK;')
  }
  assert(refused, 'Rollback did not refuse a live many-profile building relation')

  await db.exec("DELETE FROM public.graduation_case_profiles WHERE case_id = 'CASE-065';")
  await db.exec(rollbackSql)
  const rolledBack = await state()
  assert(rolledBack.uniqueConstraintCount === 1, 'Rollback did not restore the legacy unique constraint')
  assert(rolledBack.nonUniqueIndexCount === 0, 'Rollback left the V24 lookup index behind')
  assert(rolledBack.rlsEnabled, 'Rollback changed RLS state')

  await db.exec(forwardSql)
  await assertForward('second forward')

  console.log('Graduation profile many-to-one isolated PostgreSQL dry-run passed.')
  console.log(`- PostgreSQL engine: ${await scalar("select current_setting('server_version_num')::integer")}`)
  console.log('- two CASE profiles referenced one building and remained visible through the published-only RLS policy')
  console.log('- rollback refused live duplicate building references')
  console.log('- exact rollback and second forward passed without changing RLS')
} finally {
  await db.close()
}

async function assertForward(label) {
  const current = await state()
  assert(current.uniqueConstraintCount === 0, `${label}: unique constraint still exists`)
  assert(current.nonUniqueIndexCount === 1, `${label}: non-unique lookup index is missing`)
  assert(current.rlsEnabled, `${label}: RLS state changed`)
}

async function state() {
  return {
    profileCount: await scalar('select count(*) from public.graduation_case_profiles'),
    uniqueConstraintCount: await scalar("select count(*) from pg_constraint where conrelid='public.graduation_case_profiles'::regclass and conname='graduation_case_profiles_building_id_key' and contype='u'"),
    nonUniqueIndexCount: await scalar("select count(*) from pg_indexes where schemaname='public' and tablename='graduation_case_profiles' and indexname='idx_graduation_case_profiles_building_id' and indexdef not like 'CREATE UNIQUE INDEX%'"),
    rlsEnabled: Boolean(await scalar("select relrowsecurity::integer from pg_class where oid='public.graduation_case_profiles'::regclass")),
  }
}

async function scalar(query) {
  const result = await db.query(query)
  return Number(Object.values(result.rows[0])[0])
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}
