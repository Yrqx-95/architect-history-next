import fs from 'node:fs'
import path from 'node:path'

import { PGlite } from '@electric-sql/pglite'

const ROOT = process.cwd()
const verifyKey = process.env.GRADUATION_VERIFY_BATCH || 'library-002'
const verifyConfigs = {
  'library-002': {
    pack_path: 'db/review-packets/graduation-library-batch-002.json',
    prior_pack_paths: ['db/review-packets/graduation-library-batch-001.json'],
    prior_seed_paths: ['db/manual-operations/graduation-library-batch-001-apply.sql'],
    apply_path: 'db/manual-operations/graduation-library-batch-002-apply.sql',
    rollback_path: 'db/manual-operations/graduation-library-batch-002-rollback.sql',
    label: 'Graduation library batch 002',
  },
  'museum-001': {
    pack_path: 'db/review-packets/graduation-museum-batch-001.json',
    prior_pack_paths: [
      'db/review-packets/graduation-library-batch-001.json',
      'db/review-packets/graduation-library-batch-002.json',
    ],
    prior_seed_paths: [
      'db/manual-operations/graduation-library-batch-001-apply.sql',
      'db/manual-operations/graduation-library-batch-002-apply.sql',
    ],
    apply_path: 'db/manual-operations/graduation-museum-batch-001-apply.sql',
    rollback_path: 'db/manual-operations/graduation-museum-batch-001-rollback.sql',
    label: 'Graduation museum batch 001',
  },
  'theatre-001': {
    pack_path: 'db/review-packets/graduation-theatre-batch-001.json',
    prior_pack_paths: [
      'db/review-packets/graduation-library-batch-001.json',
      'db/review-packets/graduation-library-batch-002.json',
      'db/review-packets/graduation-museum-batch-001.json',
    ],
    prior_seed_paths: [
      'db/manual-operations/graduation-library-batch-001-apply.sql',
      'db/manual-operations/graduation-library-batch-002-apply.sql',
      'db/manual-operations/graduation-museum-batch-001-apply.sql',
    ],
    apply_path: 'db/manual-operations/graduation-theatre-batch-001-apply.sql',
    rollback_path: 'db/manual-operations/graduation-theatre-batch-001-rollback.sql',
    label: 'Graduation theatre batch 001',
  },
  'community-civic-001': {
    pack_path: 'db/review-packets/graduation-community-civic-batch-001.json',
    prior_pack_paths: [
      'db/review-packets/graduation-library-batch-001.json',
      'db/review-packets/graduation-library-batch-002.json',
      'db/review-packets/graduation-museum-batch-001.json',
      'db/review-packets/graduation-theatre-batch-001.json',
    ],
    prior_seed_paths: [
      'db/manual-operations/graduation-library-batch-001-apply.sql',
      'db/manual-operations/graduation-library-batch-002-apply.sql',
      'db/manual-operations/graduation-museum-batch-001-apply.sql',
      'db/manual-operations/graduation-theatre-batch-001-apply.sql',
    ],
    apply_path: 'db/manual-operations/graduation-community-civic-batch-001-apply.sql',
    rollback_path: 'db/manual-operations/graduation-community-civic-batch-001-rollback.sql',
    label: 'Graduation community civic batch 001',
  },
  'transport-001': {
    pack_path: 'db/review-packets/graduation-transport-batch-001.json',
    prior_pack_paths: [
      'db/review-packets/graduation-library-batch-001.json',
      'db/review-packets/graduation-library-batch-002.json',
      'db/review-packets/graduation-museum-batch-001.json',
      'db/review-packets/graduation-theatre-batch-001.json',
      'db/review-packets/graduation-community-civic-batch-001.json',
    ],
    prior_seed_paths: [
      'db/manual-operations/graduation-library-batch-001-apply.sql',
      'db/manual-operations/graduation-library-batch-002-apply.sql',
      'db/manual-operations/graduation-museum-batch-001-apply.sql',
      'db/manual-operations/graduation-theatre-batch-001-apply.sql',
      'db/manual-operations/graduation-community-civic-batch-001-apply.sql',
      'db/manual-operations/building-function-transport-hub-001-apply.sql',
    ],
    apply_path: 'db/manual-operations/graduation-transport-batch-001-apply.sql',
    rollback_path: 'db/manual-operations/graduation-transport-batch-001-rollback.sql',
    label: 'Graduation transport batch 001',
  },
}
const verifyConfig = verifyConfigs[verifyKey]
if (!verifyConfig) throw new Error(`Unknown graduation verify batch: ${verifyKey}`)

const basePack = readJson('db/review-packets/graduation-unification-batch-001.json')
const priorPacks = verifyConfig.prior_pack_paths.map(readJson)
const pack = readJson(verifyConfig.pack_path)
const foundationSql = readText('db/migrations/v23-graduation-building-unification.sql')
const baseSeedSql = readText('db/manual-operations/graduation-unification-batch-001-apply.sql')
const priorSeedSqls = verifyConfig.prior_seed_paths.map(readText)
const applySql = readText(verifyConfig.apply_path)
const rollbackSql = readText(verifyConfig.rollback_path)

const db = await PGlite.create()
let priorCounts

try {
  await db.exec(`
    CREATE ROLE anon NOLOGIN;
    CREATE ROLE authenticated NOLOGIN;
    CREATE ROLE service_role NOLOGIN BYPASSRLS;

    CREATE TABLE public.building_types (slug text PRIMARY KEY);
    CREATE TABLE public.architects (
      id uuid PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      name_zh text,
      name_en text NOT NULL,
      name_ja text,
      official_url text
    );
    CREATE TABLE public.buildings (
      id uuid PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      name_zh text,
      name_en text NOT NULL,
      name_ja text,
      architect_id uuid REFERENCES public.architects(id) ON DELETE SET NULL,
      architect_slug text REFERENCES public.architects(slug) ON DELETE SET NULL,
      year_start integer,
      status text,
      city text,
      country text,
      country_code text,
      type_slug text REFERENCES public.building_types(slug) ON DELETE SET NULL,
      official_url text
    );
    CREATE TABLE public.images (
      id uuid PRIMARY KEY,
      building_id uuid NOT NULL REFERENCES public.buildings(id) ON DELETE CASCADE,
      url_original text NOT NULL,
      url_thumb_400 text,
      photographer text,
      source text NOT NULL,
      license text,
      source_url text NOT NULL,
      img_type text NOT NULL DEFAULT 'exterior',
      is_primary boolean NOT NULL DEFAULT false
    );
    CREATE TABLE public.building_styles (building_id uuid REFERENCES public.buildings(id) ON DELETE CASCADE, style_slug text, PRIMARY KEY (building_id, style_slug));
    CREATE TABLE public.building_eras (building_id uuid REFERENCES public.buildings(id) ON DELETE CASCADE, era_slug text, PRIMARY KEY (building_id, era_slug));
    CREATE TABLE public.curated_images (id uuid PRIMARY KEY, building_id uuid REFERENCES public.buildings(id) ON DELETE CASCADE, url_original text NOT NULL, source text NOT NULL, source_url text NOT NULL, license text NOT NULL);
    CREATE TABLE public.architect_styles (architect_id uuid REFERENCES public.architects(id) ON DELETE CASCADE, style_slug text, PRIMARY KEY (architect_id, style_slug));
    CREATE TABLE public.architect_eras (architect_id uuid REFERENCES public.architects(id) ON DELETE CASCADE, era_slug text, PRIMARY KEY (architect_id, era_slug));
    CREATE TABLE public.architect_influences (architect_id uuid REFERENCES public.architects(id) ON DELETE CASCADE, influenced_id uuid REFERENCES public.architects(id) ON DELETE CASCADE, PRIMARY KEY (architect_id, influenced_id));
  `)

  const broadTypes = [...new Set([
    ...basePack.functions.map(item => item.broad_type_slug),
    ...pack.buildings.map(item => item.type_slug),
  ])]
  await db.exec(`INSERT INTO public.building_types (slug) VALUES ${broadTypes.map(slug => `(${sqlText(slug)})`).join(', ')};`)

  const priorNewArchitectIds = new Set(
    priorPacks.flatMap(item => item.architects).filter(item => item.is_new).map(item => item.id),
  )
  const priorNewArchitectSlugs = new Set(
    priorPacks.flatMap(item => item.architects).filter(item => item.is_new).map(item => item.slug),
  )
  const existingArchitects = [...new Map(
    [
      ...priorPacks.flatMap(item => item.architects).filter(item => (
        !item.is_new
        && !priorNewArchitectIds.has(item.id)
        && !priorNewArchitectSlugs.has(item.slug)
      )),
      ...pack.architects.filter(item => (
        !item.is_new
        && !priorNewArchitectIds.has(item.id)
        && !priorNewArchitectSlugs.has(item.slug)
      )),
    ].map(item => [item.id, item]),
  ).values()]
  if (existingArchitects.length) await db.exec(`INSERT INTO public.architects (id, slug, name_zh, name_en, name_ja, official_url) VALUES ${existingArchitects.map(item => `(${sqlText(item.id)}::uuid, ${sqlText(item.slug)}, ${sqlNullable(item.name_zh)}, ${sqlText(item.name_en)}, ${sqlNullable(item.name_ja)}, ${sqlNullable(item.official_url)})`).join(', ')};`)

  const baseBuildings = new Map()
  for (const item of [...basePack.profiles, ...basePack.assignments]) baseBuildings.set(item.building_id, item.building_slug)
  for (const item of pack.reused_buildings || []) baseBuildings.set(item.id, item.slug)
  await db.exec(`INSERT INTO public.buildings (id, slug, name_en, status) VALUES ${[...baseBuildings].map(([id, slug]) => `(${sqlText(id)}::uuid, ${sqlText(slug)}, ${sqlText(slug)}, 'published')`).join(', ')};`)

  await db.exec(foundationSql)
  await db.exec(baseSeedSql)
  for (const priorSeedSql of priorSeedSqls) await db.exec(priorSeedSql)
  priorCounts = await readCounts()
  await db.exec(applySql)
  await assertForwardState('first forward')

  const guardedBuilding = pack.buildings[0]
  if (guardedBuilding) {
    await db.exec(`INSERT INTO public.curated_images (id, building_id, url_original, source, source_url, license) VALUES ('00000000-0000-4000-8000-000000000077'::uuid, ${sqlText(guardedBuilding.id)}::uuid, 'https://example.com/external.jpg', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/File:External.jpg', 'CC BY 4.0');`)
    let rollbackRefused = false
    try {
      await db.exec(rollbackSql)
    } catch (error) {
      rollbackRefused = String(error).includes('external relations')
      await db.exec('ROLLBACK;')
    }
    if (!rollbackRefused) throw new Error('Rollback did not refuse an external curated image relation')
    await db.exec(`DELETE FROM public.curated_images WHERE id = '00000000-0000-4000-8000-000000000077'::uuid;`)
  }

  await db.exec(rollbackSql)
  await assertBaseState('first rollback')
  await db.exec(applySql)
  await assertForwardState('second forward')
  await db.exec(rollbackSql)
  await assertBaseState('second rollback')

  console.log(`${verifyConfig.label} isolated PostgreSQL dry-run passed.`)
  console.log(`- PostgreSQL engine: ${await scalar("select current_setting('server_version_num')::integer")}`)
  console.log(`- forward: ${pack.counts.new_architects} new architects, ${pack.counts.buildings} buildings, ${pack.counts.images} images, ${pack.counts.profiles} profiles, ${pack.counts.assignments} assignments`)
  console.log(guardedBuilding ? '- rollback refused an injected external curated-image relation' : '- reused canonical building survived exact profile-only rollback')
  console.log('- exact rollback, second forward, and second rollback passed')
} finally {
  await db.close()
}

async function assertForwardState(phase) {
  const expected = {
    architects: priorCounts.architects + pack.counts.new_architects,
    buildings: priorCounts.buildings + pack.counts.buildings,
    images: priorCounts.images + pack.counts.images,
    profiles: priorCounts.profiles + pack.counts.profiles,
    functions: priorCounts.functions,
    aliases: priorCounts.aliases,
    assignments: priorCounts.assignments + pack.counts.assignments,
    primary_images: priorCounts.primary_images + pack.counts.images,
    primary_functions: priorCounts.primary_functions + pack.counts.buildings,
  }
  await assertCounts(expected, phase)
  await db.exec('SET ROLE anon;')
  if (await scalar('select count(*) from public.graduation_case_profiles') !== expected.profiles) throw new Error(`${phase}: anon profile visibility mismatch`)
  if (await scalar('select count(*) from public.building_function_assignments') !== expected.assignments) throw new Error(`${phase}: anon assignment visibility mismatch`)
  await db.exec('RESET ROLE;')
}

async function assertBaseState(phase) {
  await assertCounts(priorCounts, phase)
}

async function assertCounts(expected, phase) {
  const actual = await readCounts()
  for (const [key, value] of Object.entries(expected)) {
    if (actual[key] !== value) throw new Error(`${phase}: expected ${key}=${value}, got ${actual[key]}`)
  }
}

async function readCounts() {
  return {
    architects: await scalar('select count(*) from public.architects'),
    buildings: await scalar('select count(*) from public.buildings'),
    images: await scalar('select count(*) from public.images'),
    profiles: await scalar('select count(*) from public.graduation_case_profiles'),
    functions: await scalar('select count(*) from public.building_functions'),
    aliases: await scalar('select count(*) from public.building_function_aliases'),
    assignments: await scalar('select count(*) from public.building_function_assignments'),
    primary_images: await scalar('select count(*) from public.images where is_primary'),
    primary_functions: await scalar("select count(*) from public.building_function_assignments where is_primary and review_status = 'approved'"),
  }
}

async function scalar(query) {
  const result = await db.query(query)
  return Number(Object.values(result.rows[0])[0])
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath))
}

function readText(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), 'utf8')
}

function sqlText(value) {
  return `'${String(value).replaceAll("'", "''")}'`
}

function sqlNullable(value) {
  return value === null || value === undefined || value === '' ? 'NULL' : sqlText(value)
}
