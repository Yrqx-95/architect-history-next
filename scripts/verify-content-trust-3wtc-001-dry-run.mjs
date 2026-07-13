import fs from 'node:fs'
import path from 'node:path'

import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const apply = read('db/manual-operations/content-trust-3wtc-001-apply.sql')
const rollback = read('db/manual-operations/content-trust-3wtc-001-rollback.sql')
const db = await PGlite.create()

try {
  await db.exec(`
    CREATE TABLE public.building_types (slug text PRIMARY KEY);
    INSERT INTO public.building_types (slug) VALUES ('office');

    CREATE TABLE public.buildings (
      id uuid PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      name_en text NOT NULL,
      name_zh text,
      name_ja text,
      architect_slug text,
      year_start integer,
      country_code text,
      era_slug text,
      city text,
      country text,
      type_slug text,
      description jsonb,
      significance jsonb,
      official_url text,
      updated_at timestamptz NOT NULL
    );

    CREATE TABLE public.images (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
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
      country_code, era_slug, city, country, type_slug, description,
      significance, official_url, updated_at
    ) VALUES (
      'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid,
      '3-world-trade-center',
      '3 World Trade Center',
      '',
      '',
      'richard-rogers',
      2018,
      'US',
      'contemporary',
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      NULL,
      '2026-07-08T16:11:20.896254+00:00'::timestamptz
    );

    INSERT INTO public.images (
      id, building_id, url_original, url_thumb_400, photographer,
      source, license, source_url, img_type, is_primary
    ) VALUES
      (
        'da5718d0-7a9b-5077-8680-0b9ee919596c'::uuid,
        'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid,
        'https://example.com/old-commons.jpg',
        'https://example.com/old-commons-thumb.jpg',
        'Famartin',
        'Wikimedia Commons',
        'CC BY-SA 4.0',
        'https://commons.wikimedia.org/wiki/File:old-commons.jpg',
        'exterior',
        true
      ),
      (
        'a01e8696-1a6c-56e6-9f86-a57e7bdef7b4'::uuid,
        'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid,
        'https://example.com/old-unsplash.jpg',
        'https://example.com/old-unsplash-thumb.jpg',
        'Scott Szarapka',
        'Unsplash',
        'Unsplash License',
        'https://unsplash.com/photos/8lQ252pO1xM',
        'exterior',
        true
      ),
      (
        '48797278-f9d7-5b44-9ad3-e00180be09c6'::uuid,
        'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid,
        'https://example.com/secondary.jpg',
        NULL,
        'Kidfly182',
        'Wikimedia Commons',
        'CC BY-SA 4.0',
        'https://commons.wikimedia.org/wiki/File:secondary.jpg',
        'exterior',
        false
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

  console.log('3 WTC content-trust isolated PostgreSQL dry-run passed.')
  console.log(`- PostgreSQL engine: ${await scalar("select current_setting('server_version_num')::integer")}`)
  console.log('- forward: multilingual metadata, official source, two old primaries demoted, one reviewed primary inserted')
  console.log('- guards: identity, prior metadata timestamp, exact old primary IDs, duplicate candidate')
  console.log('- rollback: exact prior metadata and two-primary state restored; replay refusal and second cycle passed')
} finally {
  await db.close()
}

async function assertForward() {
  if (await scalar(`select count(*) from public.buildings where slug = '3-world-trade-center' and type_slug = 'office' and description ?& array['zh','en','ja'] and significance ?& array['zh','en','ja']`) !== 1) {
    throw new Error('forward building mismatch')
  }
  if (await scalar(`select count(*) from public.images where building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid and is_primary`) !== 1) {
    throw new Error('forward primary count mismatch')
  }
  if (await scalar(`select count(*) from public.images where source_url = 'https://commons.wikimedia.org/wiki/File:Three_World_Trade_Center,_New_York,_NY.jpg' and is_primary and license = 'CC BY 4.0'`) !== 1) {
    throw new Error('forward candidate mismatch')
  }
}

async function assertRollback() {
  if (await scalar(`select count(*) from public.buildings where slug = '3-world-trade-center' and name_zh = '' and name_ja = '' and city is null and country is null and type_slug is null and description is null and significance is null and official_url is null`) !== 1) {
    throw new Error('rollback building mismatch')
  }
  if (await scalar(`select count(*) from public.images where id in ('da5718d0-7a9b-5077-8680-0b9ee919596c'::uuid, 'a01e8696-1a6c-56e6-9f86-a57e7bdef7b4'::uuid) and is_primary`) !== 2) {
    throw new Error('rollback primary mismatch')
  }
  if (await scalar(`select count(*) from public.images where source_url = 'https://commons.wikimedia.org/wiki/File:Three_World_Trade_Center,_New_York,_NY.jpg'`) !== 0) {
    throw new Error('rollback candidate remained')
  }
}

async function scalar(sql) {
  const result = await db.query(sql)
  return Number(Object.values(result.rows[0])[0])
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8')
}

