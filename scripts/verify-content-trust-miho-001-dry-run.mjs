import fs from 'node:fs';
import path from 'node:path';
import { PGlite } from '@electric-sql/pglite';

const root = process.cwd();
const migration = fs.readFileSync(path.join(root, 'supabase/migrations/20260714041451_content_trust_miho_001.sql'), 'utf8');
const rollback = fs.readFileSync(path.join(root, 'db/manual-operations/content-trust-miho-001-rollback.sql'), 'utf8');
const db = await PGlite.create();

try {
  await db.exec(`
    CREATE TABLE public.buildings (
      id uuid primary key, slug text unique, name_zh text, name_ja text,
      architect_slug text, year_start integer, official_url text,
      description jsonb, significance jsonb, updated_at timestamptz not null
    );
    CREATE TABLE public.images (id uuid primary key, building_id uuid, is_primary boolean);
    INSERT INTO public.buildings VALUES (
      '425a209f-944d-4acf-88e0-695653e3e451', 'miho-museum', '', '', 'im-pei', 1997,
      NULL, NULL, jsonb_build_object('en', '桃花源记的建筑转译——隧道与桥的仪式性抵达'),
      '2026-07-08T23:13:38.866069+00:00'
    );
    INSERT INTO public.images VALUES ('22222222-2222-4222-8222-222222222222', '425a209f-944d-4acf-88e0-695653e3e451', true);
  `);

  await db.exec(migration);
  if (await scalar("select count(*) from public.buildings where name_zh='美秀美术馆' and name_ja='MIHO MUSEUM' and official_url is not null and description ?& array['zh','en','ja'] and significance ?& array['zh','en','ja']") !== 1) throw new Error('forward content verification failed');

  let replayRefused = false;
  try { await db.exec(migration); } catch { replayRefused = true; }
  if (!replayRefused) throw new Error('replay was not refused');

  await db.exec(rollback);
  if (await scalar("select count(*) from public.buildings where name_zh='' and name_ja='' and official_url is null and description is null and significance = jsonb_build_object('en', '桃花源记的建筑转译——隧道与桥的仪式性抵达')") !== 1) throw new Error('rollback verification failed');
  console.log('Miho Museum isolated PostgreSQL dry-run passed.');
} finally {
  await db.close();
}

async function scalar(query) {
  const result = await db.query(query);
  return Number(Object.values(result.rows[0])[0]);
}
