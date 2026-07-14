import fs from 'node:fs'
import path from 'node:path'
import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const migration = fs.readFileSync(
  path.join(root, 'supabase/migrations/20260714073151_architect_identity_aravena_001.sql'),
  'utf8',
)
const rollback = fs.readFileSync(
  path.join(root, 'db/manual-operations/architect-identity-aravena-001-rollback.sql'),
  'utf8',
)
const db = await PGlite.create()

try {
  await db.exec(`
    CREATE TABLE public.architects (
      id uuid PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      wikidata_id text,
      name_zh text,
      name_en text NOT NULL,
      name_ja text,
      alt_names text[] DEFAULT '{}',
      birth_year integer,
      death_year integer,
      nationalities text[] DEFAULT '{}',
      era_slug text,
      style_slugs text[] DEFAULT '{}',
      bio_zh text,
      bio_en text,
      bio_ja text,
      core_ideas jsonb DEFAULT '[]'::jsonb,
      education text,
      influences text[] DEFAULT '{}',
      influenced text[] DEFAULT '{}',
      wikipedia_url text,
      archdaily_url text,
      official_url text,
      structurae_id text,
      ai_tags jsonb DEFAULT '{}'::jsonb,
      ai_quality integer DEFAULT 0,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    CREATE TABLE public.buildings (
      id uuid PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      architect_id uuid REFERENCES public.architects(id),
      architect_slug text,
      updated_at timestamptz
    );
    CREATE TABLE public.sources (
      id uuid PRIMARY KEY,
      architect_id uuid REFERENCES public.architects(id) ON DELETE CASCADE
    );
    CREATE TABLE public.architect_styles (
      architect_id uuid REFERENCES public.architects(id) ON DELETE CASCADE,
      style_slug text
    );
    CREATE TABLE public.architect_eras (
      architect_id uuid REFERENCES public.architects(id) ON DELETE CASCADE,
      era_slug text
    );
    CREATE TABLE public.architect_influences (
      architect_id uuid REFERENCES public.architects(id) ON DELETE CASCADE,
      influenced_id uuid REFERENCES public.architects(id) ON DELETE CASCADE
    );

    INSERT INTO public.architects (
      id, slug, name_zh, name_en, name_ja, alt_names, birth_year,
      nationalities, era_slug, style_slugs, bio_zh, bio_en, bio_ja,
      core_ideas, education, influences, influenced, ai_tags, ai_quality,
      created_at, updated_at
    ) VALUES
    (
      '5000f72e-c893-4df6-84fe-33617581cd24',
      'aravena',
      '亚历杭德罗·阿拉维纳',
      'Alejandro Aravena',
      'アレハンドロ・アラベナ',
      ARRAY[]::text[],
      1967,
      ARRAY['智利']::text[],
      '当代',
      ARRAY['当代建筑', '生态建筑']::text[],
      'canonical zh biography',
      'canonical English biography',
      'canonical ja biography',
      '["canonical idea"]'::jsonb,
      '智利天主教大学',
      ARRAY[]::text[],
      ARRAY[]::text[],
      '{}'::jsonb,
      0,
      '2026-05-23T11:39:25.939222+00:00',
      '2026-05-23T11:39:25.939222+00:00'
    ),
    (
      '4a93c6b4-c020-4291-bbbf-cb2bd94f5257',
      'alejandro-alavena',
      '亚历杭德罗·阿拉维纳',
      'Alejandro Alavena',
      'アレハンドロ・アラベナ',
      ARRAY[]::text[],
      1967,
      ARRAY['Chile']::text[],
      NULL,
      ARRAY[]::text[],
      NULL,
      'Chilean architect',
      NULL,
      '[]'::jsonb,
      NULL,
      ARRAY[]::text[],
      ARRAY[]::text[],
      '{}'::jsonb,
      0,
      '2026-05-24T01:10:19.80023+00:00',
      '2026-05-24T01:10:19.80023+00:00'
    );

    INSERT INTO public.buildings (id, slug, architect_slug, updated_at) VALUES
      (
        'b6762624-0430-4ab7-afe1-09c594ad8706',
        'center-of-innovation-anacleto-angelini',
        'alejandro-alavena',
        '2026-07-08T16:11:20.896254+00:00'
      ),
      (
        'a064774d-bbc5-4a83-ae8e-41e866e8953b',
        'edp-headquarters-ii',
        'alejandro-alavena',
        '2026-05-24T01:10:22.866879+00:00'
      );
  `)

  await db.exec(migration)

  if (await scalar("SELECT count(*) FROM public.architects WHERE slug = 'alejandro-alavena'") !== 0) {
    throw new Error('forward migration kept the duplicate architect')
  }
  if (await scalar("SELECT count(*) FROM public.buildings WHERE architect_slug = 'aravena'") !== 2) {
    throw new Error('forward migration did not reassign both reviewed buildings')
  }
  if (await scalar("SELECT count(*) FROM public.architects WHERE slug = 'aravena' AND bio_en = 'canonical English biography'") !== 1) {
    throw new Error('forward migration changed canonical architect content')
  }

  let replayRefused = false
  try {
    await db.exec(migration)
  } catch {
    replayRefused = true
  }
  if (!replayRefused) throw new Error('forward migration replay was not refused')

  await db.exec(rollback)

  if (await scalar("SELECT count(*) FROM public.architects WHERE slug = 'alejandro-alavena' AND name_en = 'Alejandro Alavena'") !== 1) {
    throw new Error('rollback did not restore the duplicate snapshot')
  }
  if (await scalar("SELECT count(*) FROM public.buildings WHERE architect_slug = 'alejandro-alavena'") !== 2) {
    throw new Error('rollback did not restore both reviewed building relations')
  }

  let rollbackReplayRefused = false
  try {
    await db.exec(rollback)
  } catch {
    rollbackReplayRefused = true
  }
  if (!rollbackReplayRefused) throw new Error('rollback replay was not refused')

  console.log('Alejandro Aravena identity merge isolated PostgreSQL dry-run passed.')
} finally {
  await db.close()
}

async function scalar(query) {
  const result = await db.query(query)
  return Number(Object.values(result.rows[0])[0])
}
