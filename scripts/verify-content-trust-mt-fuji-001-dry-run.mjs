import fs from 'node:fs';
import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';

const root = process.cwd();
const migration = fs.readFileSync(path.join(root, 'supabase/migrations/20260714033425_content_trust_mt_fuji_001.sql'), 'utf8');
const rollback = fs.readFileSync(path.join(root, 'db/manual-operations/content-trust-mt-fuji-001-rollback.sql'), 'utf8');
const db = await PGlite.create();

try {
  await db.exec(`
    CREATE TABLE public.buildings (
      id uuid primary key, slug text unique, architect_slug text, year_start integer,
      official_url text, description jsonb, significance jsonb, updated_at timestamptz not null
    );
    CREATE TABLE public.images (id uuid primary key, building_id uuid, is_primary boolean);
    INSERT INTO public.buildings VALUES (
      '0b67c6cf-d44c-4149-8331-6450dc580bdb', 'mt-fuji-center', 'shigeru-ban', 2017,
      NULL, NULL, jsonb_build_object('en', '倒置的富士山——木格锥体在水池中的倒影构成完整的山形'),
      '2026-07-08T16:11:20.896254+00:00'
    );
    INSERT INTO public.images VALUES ('11111111-1111-4111-8111-111111111111', '0b67c6cf-d44c-4149-8331-6450dc580bdb', true);
  `);

  await db.exec(migration);
  if (await scalar("select count(*) from public.buildings where official_url is not null and description ?& array['zh','en','ja'] and significance ?& array['zh','en','ja']") !== 1) throw new Error('forward content verification failed');

  let replayRefused = false;
  try { await db.exec(migration); } catch { replayRefused = true; }
  if (!replayRefused) throw new Error('replay was not refused');

  await db.exec(rollback);
  if (await scalar("select count(*) from public.buildings where official_url is null and description is null and significance = jsonb_build_object('en', '倒置的富士山——木格锥体在水池中的倒影构成完整的山形')") !== 1) throw new Error('rollback verification failed');
  console.log('Mt. Fuji World Heritage Centre isolated PostgreSQL dry-run passed.');
} finally {
  await db.close();
}

async function scalar(query) {
  const result = await db.query(query);
  return Number(Object.values(result.rows[0])[0]);
}
