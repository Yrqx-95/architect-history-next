import fs from 'node:fs'
import path from 'node:path'
import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const migration = read('supabase/migrations/20260715033636_content_trust_parc1_nmwa_001.sql')
const apply = read('db/manual-operations/content-trust-parc1-nmwa-001-apply.sql')
const rollback = read('db/manual-operations/content-trust-parc1-nmwa-001-rollback.sql')

if (migration !== apply) throw new Error('versioned migration differs from reviewed apply SQL')

const PARC_ID = '39a3d5b5-0308-47e3-b2fe-aebb164353bf'
const NMWA_ID = '17b396f4-6a4c-4e33-963d-dcc697879221'
const PARC_UNSAFE_IDS = [
  'e93d4cdd-cc96-5de1-94a9-f1f545ece711',
  '648c05b4-77a9-58ec-b7b7-5e6969b4852c',
  '06dfee2c-4c2f-5dd3-8d25-8e3c0c27f6c3',
]
const NMWA_PRIMARY_IDS = [
  'cbf9a81a-c87d-51d2-8da0-954cce0d7f5e',
  'f8a78374-d972-5da2-8d2f-9204a7a68310',
]

try {
  const db = await createSeededDb()
  try {
    await db.exec(apply)
    await assertForward(db)

    const replayError = await expectRefusal(db, apply, 'forward replay')
    if (!replayError.includes('precondition drifted')) throw new Error(`unexpected replay error: ${replayError}`)

    await db.exec(rollback)
    await assertRollback(db)
    await db.exec(apply)
    await assertForward(db)
    await db.exec(rollback)
    await assertRollback(db)
  } finally {
    await db.close()
  }

  await runDriftChecks()
  console.log('Parc.1 + NMWA content-trust isolated PostgreSQL dry-run passed.')
  console.log('- PostgreSQL engine: 18 (PGlite server_version_num 180003)')
  console.log('- forward: Parc.1 metadata plus exact three unsafe-primary suppression; NMWA canonical metadata only')
  console.log('- rollback: exact preflight metadata and Parc.1 primary flags restored; NMWA image rows unchanged')
  console.log('- replay refusal: forward replay rejected')
  console.log('- drift refusal: building-field, primary-state, extra-row, rollback-building, rollback-text, and rollback-extra-row cases rejected')
} catch (error) {
  console.error(error)
  process.exitCode = 1
}

async function runDriftChecks() {
  const buildingDrift = await createSeededDb()
  try {
    await buildingDrift.exec(`UPDATE public.buildings SET city = 'Drifted city' WHERE id = '${PARC_ID}'::uuid`)
    const message = await expectRefusal(buildingDrift, apply, 'building drift')
    if (!message.includes('Parc.1 building precondition')) throw new Error(`building drift was refused for the wrong reason: ${message}`)
  } finally {
    await buildingDrift.close()
  }

  const primaryDrift = await createSeededDb()
  try {
    await primaryDrift.exec(`UPDATE public.images SET is_primary = false WHERE id = '${PARC_UNSAFE_IDS[0]}'::uuid`)
    const message = await expectRefusal(primaryDrift, apply, 'primary drift')
    if (!message.includes('Parc.1 image precondition')) throw new Error(`primary drift was refused for the wrong reason: ${message}`)
  } finally {
    await primaryDrift.close()
  }

  const extraRowDrift = await createSeededDb()
  try {
    await extraRowDrift.exec(`INSERT INTO public.images (id, building_id, url_original, source, license, source_url, img_type, is_primary) VALUES ('00000000-0000-0000-0000-000000000099'::uuid, '${PARC_ID}'::uuid, 'https://example.com/unknown.jpg', 'Wikimedia Commons', 'CC BY 4.0', 'https://example.com/unknown', 'exterior', false)`)
    const message = await expectRefusal(extraRowDrift, apply, 'extra image row drift')
    if (!message.includes('Parc.1 image precondition')) throw new Error(`extra-row drift was refused for the wrong reason: ${message}`)
  } finally {
    await extraRowDrift.close()
  }

  const rollbackBuildingDrift = await createSeededDb()
  try {
    await rollbackBuildingDrift.exec(apply)
    await rollbackBuildingDrift.exec(`UPDATE public.buildings SET city = 'Drifted after apply' WHERE id = '${NMWA_ID}'::uuid`)
    const message = await expectRefusal(rollbackBuildingDrift, rollback, 'rollback building drift')
    if (!message.includes('NMWA rollback refused')) throw new Error(`rollback building drift was refused for the wrong reason: ${message}`)
  } finally {
    await rollbackBuildingDrift.close()
  }

  const rollbackTextDrift = await createSeededDb()
  try {
    await rollbackTextDrift.exec(apply)
    await rollbackTextDrift.exec(`UPDATE public.buildings SET description = jsonb_set(description, '{en}', '"Changed after apply"') WHERE id = '${NMWA_ID}'::uuid`)
    const message = await expectRefusal(rollbackTextDrift, rollback, 'rollback text drift')
    if (!message.includes('NMWA rollback refused')) throw new Error(`rollback text drift was refused for the wrong reason: ${message}`)
  } finally {
    await rollbackTextDrift.close()
  }

  const rollbackExtraRowDrift = await createSeededDb()
  try {
    await rollbackExtraRowDrift.exec(apply)
    await rollbackExtraRowDrift.exec(`INSERT INTO public.images (id, building_id, url_original, source, license, source_url, img_type, is_primary) VALUES ('00000000-0000-0000-0000-000000000098'::uuid, '${PARC_ID}'::uuid, 'https://example.com/unknown-after.jpg', 'Wikimedia Commons', 'CC BY 4.0', 'https://example.com/unknown-after', 'exterior', false)`)
    const message = await expectRefusal(rollbackExtraRowDrift, rollback, 'rollback extra-row drift')
    if (!message.includes('Parc.1 rollback refused')) throw new Error(`rollback extra-row drift was refused for the wrong reason: ${message}`)
  } finally {
    await rollbackExtraRowDrift.close()
  }
}

async function createSeededDb() {
  const db = await PGlite.create()
  const parcExtras = Array.from({ length: 27 }, (_, index) => {
    const suffix = String(index + 1).padStart(12, '0')
    return `('00000000-0000-0000-0000-${suffix}'::uuid, '${PARC_ID}'::uuid, 'https://example.com/parc-${index + 1}.jpg', 'Wikimedia Commons', 'CC BY 4.0', 'https://example.com/parc-${index + 1}', 'exterior', false)`
  }).join(',\n')
  const nmwaExtras = Array.from({ length: 4 }, (_, index) => {
    const suffix = String(index + 40).padStart(12, '0')
    return `('00000000-0000-0000-0000-${suffix}'::uuid, '${NMWA_ID}'::uuid, 'https://example.com/nmwa-${index + 1}.jpg', 'Wikimedia Commons', 'CC BY 4.0', 'https://example.com/nmwa-${index + 1}', 'exterior', false)`
  }).join(',\n')

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
      id uuid PRIMARY KEY,
      building_id uuid NOT NULL REFERENCES public.buildings(id),
      url_original text NOT NULL,
      source text NOT NULL,
      license text,
      source_url text NOT NULL,
      img_type text NOT NULL,
      is_primary boolean NOT NULL DEFAULT false
    );
    INSERT INTO public.buildings (id, slug, name_en, name_zh, name_ja, architect_slug, year_start, country_code, era_slug, city, country, type_slug, description, significance, official_url, updated_at) VALUES
      ('${PARC_ID}'::uuid, 'parc1', 'Parc1', '', '', 'richard-rogers', 2020, 'KR', 'contemporary', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-08T16:11:20.896254+00:00'::timestamptz),
      ('${NMWA_ID}'::uuid, 'national-museum-of-western-art', 'National Museum of Western Art', '', '', 'kunio-maekawa', 1959, 'JP', NULL, NULL, NULL, 'cultural', NULL, NULL, NULL, '2026-05-24T00:02:34.681443+00:00'::timestamptz);
    INSERT INTO public.images (id, building_id, url_original, source, license, source_url, img_type, is_primary) VALUES
      ('${PARC_UNSAFE_IDS[0]}'::uuid, '${PARC_ID}'::uuid, 'https://example.com/parc-unsafe-1.jpg', 'Wikimedia Commons', 'CC BY 2.0', 'https://example.com/parc-unsafe-1', 'exterior', true),
      ('${PARC_UNSAFE_IDS[1]}'::uuid, '${PARC_ID}'::uuid, 'https://example.com/parc-unsafe-2.jpg', 'Wikimedia Commons', 'CC BY 2.0', 'https://example.com/parc-unsafe-2', 'exterior', true),
      ('${PARC_UNSAFE_IDS[2]}'::uuid, '${PARC_ID}'::uuid, 'https://example.com/parc-unsafe-3.jpg', 'Unsplash', 'Unsplash License', 'https://example.com/parc-unsafe-3', 'exterior', true),
      ${parcExtras},
      ('${NMWA_PRIMARY_IDS[0]}'::uuid, '${NMWA_ID}'::uuid, 'https://example.com/nmwa-banner.jpg', 'Wikimedia Commons', 'CC BY 2.5', 'https://example.com/nmwa-banner', 'exterior', true),
      ('${NMWA_PRIMARY_IDS[1]}'::uuid, '${NMWA_ID}'::uuid, 'https://example.com/nmwa-unsplash.jpg', 'Unsplash', 'Unsplash License', 'https://example.com/nmwa-unsplash', 'detail', true),
      ${nmwaExtras};
  `)
  return db
}

async function assertForward(db) {
  if (await scalar(db, `SELECT count(*) FROM public.buildings WHERE slug = 'parc1' AND city = 'Seoul' AND country = 'South Korea' AND type_slug = 'mixed-use' AND description ?& array['zh', 'en', 'ja'] AND significance ?& array['zh', 'en', 'ja']`) !== 1) throw new Error('forward Parc.1 mismatch')
  if (await scalar(db, `SELECT count(*) FROM public.images WHERE building_id = '${PARC_ID}'::uuid AND is_primary`) !== 0) throw new Error('forward Parc.1 primary mismatch')
  if (await scalar(db, `SELECT count(*) FROM public.buildings WHERE slug = 'national-museum-of-western-art' AND architect_slug = 'le-corbusier' AND city = 'Tokyo' AND country = 'Japan' AND era_slug = 'modern' AND description ?& array['zh', 'en', 'ja'] AND significance ?& array['zh', 'en', 'ja']`) !== 1) throw new Error('forward NMWA mismatch')
  if (await scalar(db, `SELECT count(*) FROM public.images WHERE building_id = '${NMWA_ID}'::uuid AND is_primary`) !== 2) throw new Error('forward NMWA image state changed')
}

async function assertRollback(db) {
  if (await scalar(db, `SELECT count(*) FROM public.buildings WHERE slug = 'parc1' AND name_zh = '' AND name_ja = '' AND city IS NULL AND country IS NULL AND type_slug IS NULL AND description IS NULL AND significance IS NULL AND official_url IS NULL AND updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz`) !== 1) throw new Error('rollback Parc.1 mismatch')
  if (await scalar(db, `SELECT count(*) FROM public.images WHERE building_id = '${PARC_ID}'::uuid AND is_primary`) !== 3) throw new Error('rollback Parc.1 primary mismatch')
  if (await scalar(db, `SELECT count(*) FROM public.buildings WHERE slug = 'national-museum-of-western-art' AND name_zh = '' AND name_ja = '' AND architect_slug = 'kunio-maekawa' AND city IS NULL AND country IS NULL AND era_slug IS NULL AND description IS NULL AND significance IS NULL AND official_url IS NULL AND updated_at = '2026-05-24T00:02:34.681443+00:00'::timestamptz`) !== 1) throw new Error('rollback NMWA mismatch')
  if (await scalar(db, `SELECT count(*) FROM public.images WHERE building_id = '${NMWA_ID}'::uuid AND is_primary`) !== 2) throw new Error('rollback NMWA image state changed')
}

async function expectRefusal(db, sql, label) {
  try {
    await db.exec(sql)
  } catch (error) {
    const message = String(error?.message || error)
    try { await db.exec('ROLLBACK;') } catch {}
    return message
  }
  throw new Error(`${label} was not refused`)
}

async function scalar(db, sql) {
  const result = await db.query(sql)
  return Number(Object.values(result.rows[0])[0])
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8')
}
