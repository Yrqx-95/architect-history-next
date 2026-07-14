import fs from 'node:fs'
import path from 'node:path'
import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const migration = fs.readFileSync(path.join(root, 'supabase/migrations/20260714023448_content_trust_unite_habitation_001.sql'), 'utf8')
const rollback = fs.readFileSync(path.join(root, 'db/manual-operations/content-trust-unite-habitation-001-rollback.sql'), 'utf8')
const db = await PGlite.create()
try {
  await db.exec(`
    CREATE TABLE public.buildings (id uuid PRIMARY KEY, slug text UNIQUE NOT NULL, name_en text NOT NULL, city text, country text, description jsonb, significance jsonb, official_url text, updated_at timestamptz NOT NULL);
    INSERT INTO public.buildings VALUES ('e3a966b9-e9d3-4389-97db-a8e4b07f4cad', 'unite-habitation', 'Unité d''Habitation', '马赛', '法国', NULL, jsonb_build_object('en', '柯布"垂直城市"理念的实体化——337户公寓+商业街+屋顶花园一体化的居住机器'), NULL, '2026-05-23T11:39:25.939222+00:00');
  `)
  await db.exec(migration)
  if (await scalar("select count(*) from public.buildings where slug='unite-habitation' and official_url is not null and description ?& array['zh','en','ja'] and significance ?& array['zh','en','ja']") !== 1) throw new Error('forward mismatch')
  let refused = false
  try { await db.exec(migration) } catch { refused = true }
  if (!refused) throw new Error('replay was not refused')
  await db.exec(rollback)
  if (await scalar("select count(*) from public.buildings where slug='unite-habitation' and official_url is null and description is null") !== 1) throw new Error('rollback mismatch')
  console.log('Content trust Unité d\'Habitation isolated PostgreSQL dry-run passed.')
  console.log(`- PostgreSQL engine: ${await scalar("select current_setting('server_version_num')::integer")}`)
  console.log('- forward, replay refusal, and rollback passed')
} finally { await db.close() }
async function scalar(sql) { const result = await db.query(sql); return Number(Object.values(result.rows[0])[0]) }
