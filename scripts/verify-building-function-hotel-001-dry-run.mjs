import fs from 'node:fs'
import path from 'node:path'

import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const foundation = read('db/migrations/v23-graduation-building-unification.sql')
const baseApply = read('db/manual-operations/graduation-unification-batch-001-apply.sql')
const publicSpaceApply = read('db/manual-operations/building-function-public-space-001-apply.sql')
const publicToiletApply = read('db/manual-operations/building-function-public-toilet-001-apply.sql')
const retailApply = read('db/manual-operations/building-function-retail-001-apply.sql')
const apply = read('db/manual-operations/building-function-hotel-001-apply.sql')
const rollback = read('db/manual-operations/building-function-hotel-001-rollback.sql')
const basePack = JSON.parse(read('db/review-packets/graduation-unification-batch-001.json'))
const db = await PGlite.create()

try {
  await db.exec(`
    CREATE ROLE anon NOLOGIN;
    CREATE ROLE authenticated NOLOGIN;
    CREATE ROLE service_role NOLOGIN BYPASSRLS;
    CREATE TABLE public.building_types (slug text PRIMARY KEY);
    CREATE TABLE public.buildings (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE, name_en text NOT NULL, status text);
    INSERT INTO public.building_types (slug) VALUES
      ('cultural'), ('educational'), ('civic-public'), ('healthcare'), ('residential'), ('mixed-use'), ('transportation'), ('public-space'), ('commercial');
  `)
  const buildings = new Map()
  for (const item of [...basePack.profiles, ...basePack.assignments]) buildings.set(item.building_id, item.building_slug)
  await db.exec(`INSERT INTO public.buildings (id, slug, name_en, status) VALUES ${[...buildings].map(([id, slug]) => `('${id}'::uuid, '${slug}', '${slug}', 'published')`).join(', ')};`)
  await db.exec(foundation)
  await db.exec(baseApply)
  await db.exec(publicSpaceApply)
  await db.exec(publicToiletApply)
  await db.exec(retailApply)
  const beforeFunctions = await count('public.building_functions')
  const beforeAliases = await count('public.building_function_aliases')

  await db.exec(apply)
  if (await count('public.building_functions') !== beforeFunctions + 1) throw new Error('forward function count mismatch')
  if (await count('public.building_function_aliases') !== beforeAliases + 20) throw new Error('forward alias count mismatch')

  const buildingId = [...buildings.keys()][0]
  await db.exec(`INSERT INTO public.building_function_assignments (building_id, function_slug, is_primary, confidence, review_status, assignment_method, evidence_url, evidence_note, reviewed_at) VALUES ('${buildingId}'::uuid, 'hotel', true, 1, 'approved', 'manual', 'https://example.com', 'rollback guard', now());`)
  let refused = false
  try {
    await db.exec(rollback)
  } catch (error) {
    refused = String(error).includes('has building assignments')
    await db.exec('ROLLBACK;')
  }
  if (!refused) throw new Error('rollback did not refuse a dependent assignment')
  await db.exec(`DELETE FROM public.building_function_assignments WHERE function_slug = 'hotel';`)

  await db.exec(rollback)
  if (await count('public.building_functions') !== beforeFunctions || await count('public.building_function_aliases') !== beforeAliases) throw new Error('first rollback mismatch')
  await db.exec(apply)
  await db.exec(rollback)
  if (await count('public.building_functions') !== beforeFunctions || await count('public.building_function_aliases') !== beforeAliases) throw new Error('second rollback mismatch')

  console.log('Hotel taxonomy isolated PostgreSQL dry-run passed.')
  console.log(`- PostgreSQL engine: ${await scalar("select current_setting('server_version_num')::integer")}`)
  console.log('- historical order: base taxonomy, public-space, public-toilet, then retail')
  console.log('- forward: 1 function, 20 aliases across 4 locales')
  console.log('- rollback refused a dependent assignment; exact rollback and replay passed')
} finally {
  await db.close()
}

async function count(table) { return scalar(`select count(*) from ${table}`) }
async function scalar(sql) { const result = await db.query(sql); return Number(Object.values(result.rows[0])[0]) }
function read(relative) { return fs.readFileSync(path.join(root, relative), 'utf8') }
