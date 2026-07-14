import fs from 'node:fs'
import path from 'node:path'
import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const migration = read('supabase/migrations/20260714123500_architect_intro_p1_data_001.sql')
const rollback = read('db/manual-operations/architect-intro-p1-data-001-rollback.sql')
const decision = JSON.parse(read('db/review-decisions/architect-intro-p1-data-001.json'))

const originalArchitects = [
  ['fdbf1205-9bb9-46b4-aef8-c58cc15d6cbb', 'anna-heringer', '', 'Anna Heringer', '', null, '2026-05-24T00:40:28.647253+00:00'],
  ['6f935355-56b9-4d88-b71e-617fafaf4798', 'geoffrey-bawa', '喬佛瑞·包瓦', 'Geoffrey Bawa', 'ジェフリー・バワ', null, '2026-05-23T17:07:34.894891+00:00'],
  ['6f918395-d66d-45ba-b68f-85d161f947f0', 'pierre-chareau', '', 'Pierre Chareau', 'ピエール・シャロー', null, '2026-05-23T17:09:09.633822+00:00'],
  ['cdf50a7a-f6f3-4d65-b04e-51db2cc8a890', 'studio-mumbai', '', 'Studio Mumbai', '', null, '2026-05-24T00:40:19.695417+00:00'],
  ['24686f23-fd8c-4c80-9977-4e8f2ea5c930', 'tod-williams-billie-tsien-architects', '陶德·威廉斯·比利·簡建築事務所', 'Tod Williams Billie Tsien Architects', 'ビリー・ツィン', null, '2026-05-23T15:38:00.915463+00:00'],
  ['6baf6323-e506-4691-8020-a3236b87806e', 'vo-trong-nghia', '武重義', 'Vo Trong Nghia', 'ヴォ・チョン・ギア', null, '2026-05-24T01:10:11.244858+00:00'],
]

const originalBuildings = [
  ['46fbc372-2931-4001-b6fe-4d54ec4c1ec6', 'barack-obama-presidential-center', 'Barack Obama Presidential Center', '', '', null, 'tod-williams-billie-tsien-architects', null, null, null, null, 'US', null, '2026-05-23T15:38:16.112492+00:00'],
  ['b60c6ff1-0ddc-4c17-9aec-cf4cac8cd386', 'c-v-starr-east-asian', 'C. V. Starr East Asian Library', '', '', null, 'tod-williams-billie-tsien-architects', null, null, null, null, 'US', null, '2026-05-23T15:38:16.171567+00:00'],
  ['6e14d3b4-56a0-4092-aceb-335c2cb86264', 'club-house-du-golf-de-beauvallon', 'Club-house du golf de Beauvallon', '', '', null, 'pierre-chareau', null, null, null, null, 'FR', null, '2026-05-23T17:09:12.62827+00:00'],
  ['0f6093e0-d761-44de-9d72-9b2139b1820a', 'lunuganga-country-estate', 'Lunuganga Country Estate', '', '', null, 'geoffrey-bawa', 1948, null, null, null, 'LK', null, '2026-05-23T17:07:37.470456+00:00'],
  ['d5933764-c744-4e61-a862-241187129af6', 'maison-de-verre', 'Maison de Verre', '', '', null, 'pierre-chareau', 1928, null, null, null, 'FR', null, '2026-07-08T15:49:49.358174+00:00'],
  ['1692e27b-8d94-4739-811e-f87ce1634805', 'meti-handmade-school', 'METI Handmade School', '', '', null, 'anna-heringer', 2005, null, null, null, 'BD', null, '2026-07-08T16:11:20.896254+00:00'],
  ['87bba6e1-ed94-4b53-b73e-fdac30586555', 'sri-lankan-parliament-building', 'Sri Lankan Parliament Building', '', '', null, 'geoffrey-bawa', null, null, null, null, 'LK', null, '2026-05-23T17:07:37.533962+00:00'],
]

const db = await PGlite.create()

try {
  await db.exec(`
    CREATE TABLE public.architects (
      id uuid PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      name_zh text,
      name_en text NOT NULL,
      name_ja text,
      official_url text,
      updated_at timestamptz
    );

    CREATE TABLE public.buildings (
      id uuid PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      name_en text NOT NULL,
      name_zh text,
      name_ja text,
      architect_id uuid REFERENCES public.architects(id),
      architect_slug text,
      year_start integer,
      year_end integer,
      city text,
      country text,
      country_code text,
      official_url text,
      updated_at timestamptz
    );
  `)

  await insertRows(
    'architects',
    ['id', 'slug', 'name_zh', 'name_en', 'name_ja', 'official_url', 'updated_at'],
    originalArchitects,
  )
  await insertRows(
    'buildings',
    ['id', 'slug', 'name_en', 'name_zh', 'name_ja', 'architect_id', 'architect_slug', 'year_start', 'year_end', 'city', 'country', 'country_code', 'official_url', 'updated_at'],
    originalBuildings,
  )

  await db.exec(migration)
  await assertReviewed()
  await expectRefusal(migration, 'forward migration replay')

  await db.exec(rollback)
  await assertOriginal()
  await expectRefusal(rollback, 'rollback replay')

  await db.exec(migration)
  await db.exec("UPDATE public.buildings SET official_url = 'https://example.com/later-edit' WHERE slug = 'meti-handmade-school'")
  await expectRefusal(rollback, 'rollback after a later target edit')
  await assertScalar("SELECT count(*) FROM public.architects WHERE name_zh = '安娜·赫林格'", 1, 'refused rollback was not atomic')
  await db.exec("UPDATE public.buildings SET official_url = 'https://www.anna-heringer.com/projects/meti-school-bangladesh/' WHERE slug = 'meti-handmade-school'")

  await db.exec(`
    INSERT INTO public.architects
      (id, slug, name_zh, name_en, name_ja, official_url, updated_at)
    VALUES
      ('11111111-1111-4111-8111-111111111111', 'external-reviewer', '外部记录', 'External Reviewer', '外部記録', 'https://example.com/', now());
  `)
  await db.exec(rollback)
  await assertOriginal()
  await assertScalar("SELECT count(*) FROM public.architects WHERE slug = 'external-reviewer'", 1, 'rollback removed an unrelated row')

  console.log('Architect introductory P1 data 001 isolated PostgreSQL dry-run passed.')
  console.log('- guarded forward and exact rollback passed twice')
  console.log('- forward and rollback replay were refused')
  console.log('- rollback refused a later target edit atomically')
  console.log('- unrelated rows, slugs and architect relationships were preserved')
} finally {
  await db.close()
}

async function assertReviewed() {
  await assertScalar('SELECT count(*) FROM public.architects', 6, 'architect row count changed')
  await assertScalar('SELECT count(*) FROM public.buildings', 7, 'building row count changed')
  await assertScalar('SELECT count(*) FROM public.buildings WHERE architect_id IS NULL', 7, 'architect_id was changed')

  for (const item of decision.architect_decisions) {
    const result = await db.query(
      'SELECT slug, name_zh, name_ja, official_url FROM public.architects WHERE slug = $1',
      [item.slug],
    )
    const row = result.rows[0]
    if (!row || row.name_zh !== item.approved.name_zh || row.name_ja !== item.approved.name_ja || row.official_url !== item.approved.official_url) {
      throw new Error(`${item.slug} reviewed architect state mismatch`)
    }
  }

  for (const item of decision.building_decisions) {
    const result = await db.query(
      `SELECT slug, name_zh, name_ja, year_start, year_end, city, country,
              country_code, official_url, architect_id
       FROM public.buildings WHERE slug = $1`,
      [item.slug],
    )
    const row = result.rows[0]
    const approved = item.approved
    if (
      !row ||
      row.name_zh !== approved.name_zh ||
      row.name_ja !== approved.name_ja ||
      row.year_start !== approved.year_start ||
      row.year_end !== approved.year_end ||
      row.city !== approved.city ||
      row.country !== approved.country ||
      row.country_code !== approved.country_code ||
      row.official_url !== approved.official_url ||
      row.architect_id !== null
    ) {
      throw new Error(`${item.slug} reviewed building state mismatch`)
    }
  }
}

async function assertOriginal() {
  for (const [id, slug, nameZh, , nameJa, officialUrl, updatedAt] of originalArchitects) {
    const result = await db.query(
      'SELECT id, slug, name_zh, name_ja, official_url, updated_at FROM public.architects WHERE id = $1',
      [id],
    )
    const row = result.rows[0]
    if (
      !row ||
      row.slug !== slug ||
      row.name_zh !== nameZh ||
      row.name_ja !== nameJa ||
      row.official_url !== officialUrl ||
      iso(row.updated_at) !== iso(updatedAt)
    ) {
      throw new Error(`${slug} architect rollback mismatch`)
    }
  }

  for (const [id, slug, , nameZh, nameJa, architectId, architectSlug, yearStart, yearEnd, city, country, countryCode, officialUrl, updatedAt] of originalBuildings) {
    const result = await db.query(
      `SELECT id, slug, name_zh, name_ja, architect_id, architect_slug,
              year_start, year_end, city, country, country_code, official_url, updated_at
       FROM public.buildings WHERE id = $1`,
      [id],
    )
    const row = result.rows[0]
    if (
      !row ||
      row.slug !== slug ||
      row.name_zh !== nameZh ||
      row.name_ja !== nameJa ||
      row.architect_id !== architectId ||
      row.architect_slug !== architectSlug ||
      row.year_start !== yearStart ||
      row.year_end !== yearEnd ||
      row.city !== city ||
      row.country !== country ||
      row.country_code !== countryCode ||
      row.official_url !== officialUrl ||
      iso(row.updated_at) !== iso(updatedAt)
    ) {
      throw new Error(`${slug} building rollback mismatch`)
    }
  }
}

async function insertRows(table, columns, rows) {
  for (const row of rows) {
    await db.query(
      `INSERT INTO public.${table} (${columns.join(', ')}) VALUES (${columns.map((_, index) => `$${index + 1}`).join(', ')})`,
      row,
    )
  }
}

async function expectRefusal(sql, label) {
  let refused = false
  try {
    await db.exec(sql)
  } catch {
    refused = true
    try {
      await db.exec('ROLLBACK')
    } catch {
      // PGlite may already have rolled the failed multi-statement exec back.
    }
  }
  if (!refused) throw new Error(`${label} was not refused`)
}

async function assertScalar(query, expected, label) {
  const result = await db.query(query)
  const actual = Number(Object.values(result.rows[0])[0])
  if (actual !== expected) throw new Error(`${label}: expected ${expected}, got ${actual}`)
}

function iso(value) {
  return value === null ? null : new Date(value).toISOString()
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}
