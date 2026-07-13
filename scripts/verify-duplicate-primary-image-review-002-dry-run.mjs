import fs from 'node:fs'
import path from 'node:path'

import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const migration = read('supabase/migrations/20260713132300_duplicate_primary_image_review_002.sql')
const rollback = read('db/manual-operations/duplicate-primary-image-review-002-rollback.sql')
const seedSql = migration.match(/CREATE TEMP TABLE reviewed_image_seed[\s\S]*?;\n\nINSERT INTO reviewed_image_seed VALUES[\s\S]*?;\n/)

if (!seedSql) throw new Error('Could not extract reviewed image fixture from migration')

const db = await PGlite.create()

try {
  await db.exec(`
    CREATE TABLE public.buildings (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE);
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
    INSERT INTO public.images (id, building_id, url_original, url_thumb_400, photographer, source, license, source_url, img_type, is_primary)
    SELECT id, building_id, url_original, pre_thumb, photographer, source, license, source_url, pre_img_type, true
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

  console.log('Duplicate primary image review 002 isolated PostgreSQL dry-run passed.')
  console.log(`- PostgreSQL engine: ${await scalar("select current_setting('server_version_num')::integer")}`)
  console.log('- forward: 3 buildings reduced from 6 primary rows to 3 reviewed Commons primary rows')
  console.log('- metadata: 3 live Commons thumbnails normalized; Dymaxion corrected to interior')
  console.log('- guards: exact building identity, all 6 prior rows, extra-primary refusal and replay refusal')
  console.log('- rollback: exact 6-row prior state restored; second forward/rollback cycle passed')
} finally {
  await db.close()
}

async function assertForward() {
  if (await scalar('select count(*) from public.images where is_primary') !== 3) throw new Error('Forward primary count mismatch')
  if (await scalar("select count(*) from public.images where source = 'Wikimedia Commons' and is_primary") !== 3) throw new Error('Forward source mismatch')
  if (await scalar("select count(*) from public.images where id = 'b6ad1be6-7e6b-5a4a-8961-a57347fcd8fd' and is_primary and img_type = 'interior'") !== 1) throw new Error('Dymaxion forward mismatch')
}

async function assertRollback() {
  if (await scalar('select count(*) from public.images where is_primary') !== 6) throw new Error('Rollback primary count mismatch')
  if (await scalar("select count(*) from public.images where id = 'b6ad1be6-7e6b-5a4a-8961-a57347fcd8fd' and img_type = 'exterior' and url_thumb_400 = url_original") !== 1) throw new Error('Dymaxion rollback mismatch')
}

async function scalar(sql) {
  const result = await db.query(sql)
  return Number(Object.values(result.rows[0])[0])
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8')
}
