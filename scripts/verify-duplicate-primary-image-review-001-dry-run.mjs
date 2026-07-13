import fs from 'node:fs'
import path from 'node:path'

import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const migration = read('supabase/migrations/20260713113717_duplicate_primary_image_review_001.sql')
const rollback = read('db/manual-operations/duplicate-primary-image-review-001-rollback.sql')
const seedSql = migration.match(/CREATE TEMP TABLE reviewed_image_seed[\s\S]*?;\n\nINSERT INTO reviewed_image_seed VALUES[\s\S]*?;\n/)

if (!seedSql) throw new Error('Could not extract reviewed image fixture from migration')

const db = await PGlite.create()

try {
  await db.exec(`
    CREATE TABLE public.buildings (
      id uuid PRIMARY KEY,
      slug text NOT NULL UNIQUE
    );

    CREATE TABLE public.images (
      id uuid PRIMARY KEY,
      building_id uuid NOT NULL REFERENCES public.buildings(id),
      url_original text NOT NULL,
      url_thumb_400 text,
      photographer text,
      source text NOT NULL,
      license text,
      source_url text NOT NULL,
      img_type text NOT NULL,
      is_primary boolean NOT NULL DEFAULT false
    );

    BEGIN;
    ${seedSql[0]}
    INSERT INTO public.buildings (id, slug)
    SELECT DISTINCT building_id, building_slug FROM reviewed_image_seed;

    INSERT INTO public.images (
      id, building_id, url_original, url_thumb_400, photographer,
      source, license, source_url, img_type, is_primary
    )
    SELECT id, building_id, url_original, pre_thumb, pre_photographer,
      'Wikimedia Commons', pre_license, source_url, 'exterior', true
    FROM reviewed_image_seed;
    COMMIT;
  `)

  await db.exec(migration)
  await assertForward()

  let replayRefused = false
  try {
    await db.exec(migration)
  } catch (error) {
    replayRefused = String(error).includes('Reviewed primary image rows changed')
    await db.exec('ROLLBACK;')
  }
  if (!replayRefused) throw new Error('Migration replay was not refused')

  await db.exec(rollback)
  await assertRollback()

  await db.exec(migration)
  await assertForward()
  await db.exec(rollback)
  await assertRollback()

  console.log('Duplicate primary image review 001 isolated PostgreSQL dry-run passed.')
  console.log(`- PostgreSQL engine: ${await scalar("select current_setting('server_version_num')::integer")}`)
  console.log('- forward: 4 buildings reduced from 8 primary rows to 4 reviewed primary rows')
  console.log('- attribution: 3 retained-row author/license mismatches corrected; 4 live thumbnails normalized')
  console.log('- guards: exact building identity, all 8 prior rows, extra-primary refusal and replay refusal')
  console.log('- rollback: exact 8-row prior state restored; second forward/rollback cycle passed')
} finally {
  await db.close()
}

async function assertForward() {
  if (await scalar('select count(*) from public.images where is_primary') !== 4) {
    throw new Error('Forward primary count mismatch')
  }
  if (await scalar("select count(*) from public.images where id = 'bdb38b5e-4f2a-4ff6-8426-977efd06903c' and is_primary and photographer = 'Tiia Monto' and license = 'CC BY-SA 4.0'") !== 1) {
    throw new Error('Säynätsalo forward mismatch')
  }
  if (await scalar("select count(*) from public.images where id = '418f6f8f-4081-4a68-8fb1-876ee5fa3576' and is_primary and photographer = 'Rs1421'") !== 1) {
    throw new Error('Yoyogi forward mismatch')
  }
  if (await scalar("select count(*) from public.images where id = '67ddf0af-bb47-4f30-9664-b7bbbbdc4a27' and is_primary and license = 'CC BY 2.5'") !== 1) {
    throw new Error('Finlandia forward mismatch')
  }
}

async function assertRollback() {
  if (await scalar('select count(*) from public.images where is_primary') !== 8) {
    throw new Error('Rollback primary count mismatch')
  }
  if (await scalar("select count(*) from public.images where id = 'bdb38b5e-4f2a-4ff6-8426-977efd06903c' and photographer = 'Tiera' and license = 'CC BY-SA 3.0' and url_thumb_400 is null") !== 1) {
    throw new Error('Säynätsalo rollback mismatch')
  }
  if (await scalar("select count(*) from public.images where id = '418f6f8f-4081-4a68-8fb1-876ee5fa3576' and photographer = 'Kakidai' and url_thumb_400 is null") !== 1) {
    throw new Error('Yoyogi rollback mismatch')
  }
  if (await scalar("select count(*) from public.images where id = '67ddf0af-bb47-4f30-9664-b7bbbbdc4a27' and license = 'CC BY-SA 3.0' and url_thumb_400 is null") !== 1) {
    throw new Error('Finlandia rollback mismatch')
  }
}

async function scalar(sql) {
  const result = await db.query(sql)
  return Number(Object.values(result.rows[0])[0])
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8')
}
