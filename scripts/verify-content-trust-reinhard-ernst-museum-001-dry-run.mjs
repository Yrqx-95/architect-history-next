import fs from 'node:fs'
import path from 'node:path'

import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const apply = read('db/manual-operations/content-trust-reinhard-ernst-museum-001-apply.sql')
const rollback = read('db/manual-operations/content-trust-reinhard-ernst-museum-001-rollback.sql')
const migration = read('supabase/migrations/20260714012057_content_trust_reinhard_ernst_museum_001.sql')

if (apply !== migration) throw new Error('versioned migration differs from reviewed apply SQL')

const db = await PGlite.create()

try {
  await db.exec(`
    CREATE TABLE public.buildings (
      id uuid PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      name_en text NOT NULL,
      name_zh text,
      name_ja text,
      architect_slug text,
      year_start integer,
      country_code text,
      type_slug text,
      era_slug text,
      city text,
      country text,
      description jsonb,
      significance jsonb,
      official_url text,
      updated_at timestamptz NOT NULL
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

    INSERT INTO public.buildings (
      id, slug, name_en, name_zh, name_ja, architect_slug, year_start,
      country_code, type_slug, era_slug, city, country, description,
      significance, official_url, updated_at
    ) VALUES (
      'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid,
      'reinhard-ernst-museum', 'Reinhard Ernst Museum', '', '',
      'fumihiko-maki', 2024, 'DE', 'cultural', 'contemporary',
      NULL, NULL, NULL, NULL, NULL,
      '2026-07-08T16:11:20.896254+00:00'::timestamptz
    );

    INSERT INTO public.images (
      id, building_id, url_original, url_thumb_400, photographer,
      source, license, source_url, img_type, is_primary
    ) VALUES
      (
        '0e6b2f3b-9eab-5983-9b9c-772ba382bc96'::uuid,
        'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid,
        'https://images.unsplash.com/photo-1508826882284-54625969a042?w=1200&q=85',
        'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60',
        'Casey Horner', 'Unsplash', 'Unsplash License',
        'https://unsplash.com/photos/KR03PvYv3Fs', 'exterior', true
      ),
      (
        '47fa4a36-934a-53f4-9e85-957a4c6c6f0d'::uuid,
        'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid,
        'https://upload.wikimedia.org/wikipedia/commons/8/88/Ernst_Museum%2C_Wiesbaden%2C_atrium.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Ernst_Museum%2C_Wiesbaden%2C_atrium.jpg/400px-Ernst_Museum%2C_Wiesbaden%2C_atrium.jpg',
        'Gerda Arendt', 'Wikimedia Commons', 'CC0',
        'https://commons.wikimedia.org/wiki/File:Ernst_Museum,_Wiesbaden,_atrium.jpg',
        'exterior', true
      ),
      (
        '30f76ca8-b065-5763-9b13-c7936c694ae8'::uuid,
        'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid,
        'https://example.com/secondary.jpg', NULL, 'Redd Francisco',
        'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/wPMvPMD9KBI',
        'exterior', false
      );
  `)

  await db.exec(apply)
  await assertForward()

  let replayRefused = false
  try {
    await db.exec(apply)
  } catch (error) {
    replayRefused = String(error).includes('prior metadata changed')
    await db.exec('ROLLBACK;')
  }
  if (!replayRefused) throw new Error('apply replay was not refused')

  await db.exec(rollback)
  await assertRollback()

  await db.exec(apply)
  await assertForward()
  await db.exec(rollback)
  await assertRollback()

  console.log('Museum Reinhard Ernst content-trust isolated PostgreSQL dry-run passed.')
  console.log(`- PostgreSQL engine: ${await scalar("select current_setting('server_version_num')::integer")}`)
  console.log('- forward: trilingual identity and content, official source, one reviewed CC0 primary')
  console.log('- guards: exact building timestamp, exact two-primary IDs, image source and license metadata')
  console.log('- rollback: exact metadata and image state restored; replay refusal and second cycle passed')
} finally {
  await db.close()
}

async function assertForward() {
  if (await scalar(`select count(*) from public.buildings where slug = 'reinhard-ernst-museum' and city = '威斯巴登' and description ?& array['zh','en','ja'] and significance ?& array['zh','en','ja']`) !== 1) {
    throw new Error('forward building mismatch')
  }
  if (await scalar(`select count(*) from public.images where building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid and is_primary`) !== 1) {
    throw new Error('forward primary count mismatch')
  }
  if (await scalar(`select count(*) from public.images where id = '47fa4a36-934a-53f4-9e85-957a4c6c6f0d'::uuid and is_primary and img_type = 'interior' and license = 'CC0'`) !== 1) {
    throw new Error('forward reviewed primary mismatch')
  }
}

async function assertRollback() {
  if (await scalar(`select count(*) from public.buildings where slug = 'reinhard-ernst-museum' and name_zh = '' and name_ja = '' and city is null and country is null and description is null and significance is null and official_url is null`) !== 1) {
    throw new Error('rollback building mismatch')
  }
  if (await scalar(`select count(*) from public.images where building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid and is_primary`) !== 2) {
    throw new Error('rollback primary count mismatch')
  }
  if (await scalar(`select count(*) from public.images where id = '47fa4a36-934a-53f4-9e85-957a4c6c6f0d'::uuid and img_type = 'exterior'`) !== 1) {
    throw new Error('rollback reviewed image type mismatch')
  }
}

async function scalar(sql) {
  const result = await db.query(sql)
  return Number(Object.values(result.rows[0])[0])
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8')
}
