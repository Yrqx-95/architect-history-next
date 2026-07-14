import fs from 'node:fs'
import path from 'node:path'
import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const migration = read('supabase/migrations/20260714103105_architect_intro_p0_data_001.sql')
const rollback = read('db/manual-operations/architect-intro-p0-data-001-rollback.sql')
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
      wikidata_id text,
      name_zh text,
      name_en text NOT NULL,
      name_ja text,
      architect_id uuid REFERENCES public.architects(id),
      architect_slug text,
      year_start integer,
      status text,
      city text,
      country text,
      country_code text,
      type_slug text,
      era_slug text,
      official_url text,
      updated_at timestamptz
    );

    CREATE TABLE public.images (
      id uuid PRIMARY KEY,
      building_id uuid NOT NULL REFERENCES public.buildings(id),
      url_thumb_200 text,
      url_thumb_400 text,
      url_display text,
      url_original text NOT NULL,
      photographer text,
      source text,
      license text,
      license_url text,
      source_url text,
      attribution text,
      img_type text,
      is_primary boolean NOT NULL DEFAULT false,
      width integer,
      height integer,
      blur_hash text,
      created_at timestamptz
    );

    CREATE TABLE public.graduation_case_profiles (
      case_id text PRIMARY KEY,
      building_id uuid NOT NULL REFERENCES public.buildings(id),
      source_url text NOT NULL,
      publication_status text NOT NULL,
      updated_at timestamptz
    );

    CREATE TABLE public.building_function_assignments (
      building_id uuid NOT NULL REFERENCES public.buildings(id),
      function_slug text NOT NULL,
      is_primary boolean NOT NULL,
      confidence numeric(4,3) NOT NULL,
      review_status text NOT NULL,
      assignment_method text NOT NULL,
      evidence_url text,
      evidence_note text,
      reviewed_at timestamptz,
      updated_at timestamptz,
      PRIMARY KEY (building_id, function_slug)
    );

    CREATE TABLE public.graduation_case_compatibility (
      case_id text PRIMARY KEY,
      payload jsonb NOT NULL,
      publication_status text NOT NULL,
      updated_at timestamptz
    );

    INSERT INTO public.architects
      (id, slug, name_zh, name_en, name_ja, official_url, updated_at)
    VALUES
      (
        'a6c98656-452a-4fb5-98c3-01b371e3ee41',
        'grafton-architects',
        '',
        'Grafton Architects',
        'グラフトン・アーキテクツ',
        NULL,
        '2026-05-24T00:39:42.031873+00:00'
      ),
      (
        '4ec76862-cf0a-505f-82fc-e01b8fca9274',
        'unemori-architects',
        '畷森泰行建筑设计事务所',
        'UNEMORI ARCHITECTS',
        '畷森泰行建築設計事務所',
        'https://unemori-archi.com/',
        '2026-07-11T23:39:31.772406+00:00'
      ),
      (
        '4a1fdf1b-ed02-45f6-9b9c-95ae623972df',
        'mvrdv',
        'MVRDV',
        'MVRDV',
        'MVRDV',
        NULL,
        '2026-05-23T11:39:25.939222+00:00'
      );

    INSERT INTO public.buildings
      (id, slug, wikidata_id, name_zh, name_en, name_ja, architect_id,
       architect_slug, year_start, status, city, country, country_code,
       type_slug, era_slug, official_url, updated_at)
    VALUES
      (
        'f393a02c-4c5d-4683-9a32-fda4c04f185b',
        'q135641257',
        'Q135641257',
        '',
        'Q135641257',
        '',
        NULL,
        'grafton-architects',
        NULL,
        'built',
        NULL,
        NULL,
        'GB',
        NULL,
        NULL,
        NULL,
        '2026-05-24T00:39:45.231234+00:00'
      ),
      (
        'dd094698-5762-467a-b967-c9651ddd8c1b',
        'toulouse-school-of-economics',
        'Q3532921',
        '',
        'Toulouse School of Economics',
        '',
        NULL,
        'grafton-architects',
        2006,
        'built',
        NULL,
        NULL,
        'ES',
        'educational',
        'contemporary',
        NULL,
        '2026-07-08T16:11:20.896254+00:00'
      ),
      (
        '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248',
        'book-mountain-spijkenisse',
        NULL,
        '斯派克尼瑟书山图书馆',
        'Book Mountain Spijkenisse',
        'ブック・マウンテン・スパイケニッセ',
        '4a1fdf1b-ed02-45f6-9b9c-95ae623972df',
        'mvrdv',
        2012,
        'published',
        '斯派克尼瑟',
        '荷兰',
        'NL',
        'cultural',
        NULL,
        'https://www.mvrdv.com/projects/126/book-',
        '2026-07-11T23:39:31.772406+00:00'
      );

    INSERT INTO public.images
      (id, building_id, url_thumb_400, url_original, photographer, source,
       license, source_url, img_type, is_primary, created_at)
    VALUES
      (
        'e4278dee-4a40-58b2-9b40-9c8cc04075d9',
        'f393a02c-4c5d-4683-9a32-fda4c04f185b',
        'https://images.unsplash.com/photo-6pUdMJVGSOE?w=400&q=60',
        'https://images.unsplash.com/photo-6pUdMJVGSOE?w=1200&q=85',
        'James Lansbury',
        'Unsplash',
        'Unsplash License',
        'https://unsplash.com/photos/6pUdMJVGSOE',
        'exterior',
        true,
        '2026-05-24T10:40:37.189051+00:00'
      ),
      (
        'e49e961b-f159-56ca-9e1b-07726ed95cf7',
        'f393a02c-4c5d-4683-9a32-fda4c04f185b',
        'https://images.unsplash.com/photo-1614595737683-1740e41bfaac?w=400&q=60',
        'https://images.unsplash.com/photo-1614595737683-1740e41bfaac?w=1200&q=85',
        'Paul Menz',
        'Unsplash',
        'Unsplash License',
        'https://unsplash.com/photos/jh_KHWamObU',
        'exterior',
        false,
        '2026-05-24T10:40:37.285368+00:00'
      ),
      (
        'f04ca9bc-34e1-5a43-9f48-c1c901e8ec6c',
        'f393a02c-4c5d-4683-9a32-fda4c04f185b',
        'https://images.unsplash.com/photo-1453586857165-eb78d44460ca?w=400&q=60',
        'https://images.unsplash.com/photo-1453586857165-eb78d44460ca?w=1200&q=85',
        'Michael Seh',
        'Unsplash',
        'Unsplash License',
        'https://unsplash.com/photos/S66mTqg0nM8',
        'exterior',
        false,
        '2026-05-24T10:40:37.41342+00:00'
      );

    INSERT INTO public.graduation_case_profiles
      (case_id, building_id, source_url, publication_status, updated_at)
    VALUES (
      'CASE-130',
      '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248',
      'https://www.mvrdv.com/projects/126/book-',
      'published',
      '2026-07-11T23:39:31.772406+00:00'
    );

    INSERT INTO public.building_function_assignments
      (building_id, function_slug, is_primary, confidence, review_status,
       assignment_method, evidence_url, evidence_note, reviewed_at, updated_at)
    VALUES
      (
        '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248',
        'library',
        true,
        1.000,
        'approved',
        'source-derived',
        'https://www.mvrdv.com/projects/126/book-',
        'reviewed evidence',
        '2026-07-12T00:00:00+00:00',
        '2026-07-11T23:39:31.772406+00:00'
      ),
      (
        '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248',
        'community-center',
        false,
        1.000,
        'approved',
        'source-derived',
        'https://www.mvrdv.com/projects/126/book-',
        'reviewed evidence',
        '2026-07-12T00:00:00+00:00',
        '2026-07-11T23:39:31.772406+00:00'
      ),
      (
        '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248',
        'mixed-use',
        false,
        1.000,
        'approved',
        'source-derived',
        'https://www.mvrdv.com/projects/126/book-',
        'reviewed evidence',
        '2026-07-12T00:00:00+00:00',
        '2026-07-11T23:39:31.772406+00:00'
      );

    INSERT INTO public.graduation_case_compatibility
      (case_id, payload, publication_status, updated_at)
    VALUES (
      'CASE-130',
      '{"name":"Book Mountain","source_url":"https://www.mvrdv.com/projects/126/book-"}'::jsonb,
      'published',
      '2026-07-13T04:30:11.314723+00:00'
    );
  `)

  verifyActiveRepositorySources()

  await db.exec(migration)
  await assertRepaired()
  await expectRefusal(migration, 'forward migration replay')

  await db.exec(rollback)
  await assertOriginal()
  await expectRefusal(rollback, 'rollback replay')

  await db.exec(migration)
  await db.exec(`
    INSERT INTO public.images
      (id, building_id, url_original, photographer, source, license,
       source_url, img_type, is_primary, created_at)
    VALUES (
      '11111111-1111-4111-8111-111111111111',
      'f393a02c-4c5d-4683-9a32-fda4c04f185b',
      'https://example.com/reviewed-town-house.jpg',
      'External reviewer',
      'External review',
      'CC BY 4.0',
      'https://example.com/reviewed-town-house',
      'exterior',
      true,
      now()
    );
  `)
  await expectRefusal(rollback, 'rollback after an external Town House image')
  await assertRepaired(1)
  if (await scalar("SELECT count(*) FROM public.images WHERE id = '11111111-1111-4111-8111-111111111111'::uuid") !== 1) {
    throw new Error('refused rollback removed the external Town House image')
  }

  await db.exec("DELETE FROM public.images WHERE id = '11111111-1111-4111-8111-111111111111'::uuid")
  await db.exec(rollback)
  await assertOriginal()

  console.log('Architect introductory P0 data 001 isolated PostgreSQL dry-run passed.')
  console.log('- guarded forward and exact rollback passed twice')
  console.log('- forward and rollback replay were refused')
  console.log('- rollback refused an externally added Town House image')
  console.log('- active fallback sources and legacy redirects are corrected')
} finally {
  await db.close()
}

async function assertRepaired(expectedTownHouseImages = 0) {
  if (await scalar("SELECT count(*) FROM public.architects WHERE slug = 'grafton-architects' AND name_zh = '格拉夫顿建筑事务所'") !== 1) {
    throw new Error('Grafton Architects was not repaired')
  }
  if (await scalar("SELECT count(*) FROM public.architects WHERE slug = 'unemori-architects' AND name_ja = '畝森泰行建築設計事務所'") !== 1) {
    throw new Error('UNEMORI ARCHITECTS was not repaired')
  }
  if (await scalar("SELECT count(*) FROM public.buildings WHERE slug = 'kingston-university-town-house' AND year_start = 2020 AND country_code = 'GB'") !== 1) {
    throw new Error('Town House was not canonicalized')
  }
  if (await scalar("SELECT count(*) FROM public.buildings WHERE slug = 'q135641257'") !== 0) {
    throw new Error('raw Town House slug remains')
  }
  if (await scalar("SELECT count(*) FROM public.images WHERE building_id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid") !== expectedTownHouseImages) {
    throw new Error('Town House image count differs from the guarded scenario')
  }
  if (await scalar("SELECT count(*) FROM public.buildings WHERE slug = 'toulouse-school-of-economics' AND year_start = 2019 AND country_code = 'FR'") !== 1) {
    throw new Error('Toulouse School of Economics was not repaired')
  }
  if (await scalar("SELECT count(*) FROM public.building_function_assignments WHERE evidence_url = 'https://www.mvrdv.com/projects/126/book-mountain'") !== 3) {
    throw new Error('Book Mountain assignment source chain was not repaired')
  }
  if (await scalar("SELECT count(*) FROM public.graduation_case_compatibility WHERE payload ->> 'source_url' = 'https://www.mvrdv.com/projects/126/book-mountain'") !== 1) {
    throw new Error('Book Mountain compatibility source was not repaired')
  }
}

async function assertOriginal() {
  if (await scalar("SELECT count(*) FROM public.architects WHERE slug = 'grafton-architects' AND name_zh = '' AND official_url IS NULL") !== 1) {
    throw new Error('Grafton Architects rollback mismatch')
  }
  if (await scalar("SELECT count(*) FROM public.architects WHERE slug = 'unemori-architects' AND name_ja = '畷森泰行建築設計事務所'") !== 1) {
    throw new Error('UNEMORI ARCHITECTS rollback mismatch')
  }
  if (await scalar("SELECT count(*) FROM public.buildings WHERE slug = 'q135641257' AND year_start IS NULL") !== 1) {
    throw new Error('Town House rollback mismatch')
  }
  if (await scalar("SELECT count(*) FROM public.images WHERE building_id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid") !== 3) {
    throw new Error('Town House images rollback mismatch')
  }
  if (await scalar("SELECT count(*) FROM public.buildings WHERE slug = 'toulouse-school-of-economics' AND year_start = 2006 AND country_code = 'ES'") !== 1) {
    throw new Error('Toulouse School of Economics rollback mismatch')
  }
  if (await scalar("SELECT count(*) FROM public.building_function_assignments WHERE evidence_url = 'https://www.mvrdv.com/projects/126/book-'") !== 3) {
    throw new Error('Book Mountain assignment rollback mismatch')
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

async function scalar(query) {
  const result = await db.query(query)
  return Number(Object.values(result.rows[0])[0])
}

function verifyActiveRepositorySources() {
  const sourceFiles = [
    'db/review-decisions/graduation-new-buildings-library-002.json',
    'db/review-packets/graduation-library-batch-002.json',
    'src/content/graduation/cases.json',
    'public/data/graduation/cases.json',
  ]
  for (const file of sourceFiles) {
    const content = read(file)
    if (content.includes('https://www.mvrdv.com/projects/126/book-"')) {
      throw new Error(`${file} still contains the truncated Book Mountain URL`)
    }
  }

  const activeUnemoriSources = [
    read('scripts/prepare-graduation-library-batch-002.mjs'),
    read('db/review-packets/graduation-library-batch-002.json'),
  ]
  if (activeUnemoriSources.some(content => content.includes('畷森泰行'))) {
    throw new Error('an active graduation source still contains the UNEMORI name typo')
  }

  const nextConfig = read('next.config.ts')
  if (!nextConfig.includes('/building/q135641257') || !nextConfig.includes('/api/v1/buildings/q135641257')) {
    throw new Error('legacy Town House page/API redirects are missing')
  }
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}
