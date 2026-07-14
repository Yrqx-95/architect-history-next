import fs from 'node:fs'
import path from 'node:path'

import { PGlite } from '@electric-sql/pglite'

const root = process.cwd()
const migration = read('supabase/migrations/20260714020710_content_trust_product_core_batch_002.sql')
const rollback = read('db/manual-operations/content-trust-product-core-batch-002-rollback.sql')
const db = await PGlite.create()

try {
  await db.exec(`
    CREATE TABLE public.buildings (
      id uuid PRIMARY KEY,
      slug text NOT NULL UNIQUE,
      name_en text NOT NULL,
      name_zh text,
      name_ja text,
      city text,
      country text,
      description jsonb,
      significance jsonb,
      official_url text,
      updated_at timestamptz NOT NULL
    );

    INSERT INTO public.buildings (id, slug, name_en, name_zh, name_ja, city, country, description, significance, official_url, updated_at)
    VALUES
      ('4161d99d-3605-4548-8630-fca802a370dc'::uuid, 'apple-park', 'Apple Park', '苹果公园', 'アップル・パーク', '库比蒂诺', '美国', NULL, '{"en":"世界上最大的曲面玻璃建筑——完美的圆环，科技与自然的共生"}', NULL, '2026-07-08T16:11:20.896254+00:00'::timestamptz),
      ('8e1d9cf8-1d57-427d-becb-d8355461f602'::uuid, 'fallingwater', 'Fallingwater', '流水别墅', '落水荘', '宾夕法尼亚州', '美国', NULL, '{"en":"有机建筑的终极宣言——建筑与瀑布融为一体，悬臂看似违背重力"}', NULL, '2026-07-08T15:49:49.358174+00:00'::timestamptz),
      ('0b7585a7-139c-43b3-82e0-73fd05e793e0'::uuid, 'marsk-tower', 'Marsk Tower', '马什塔', 'マルスクタワー', '斯科尔拜克', '丹麦', NULL, '{"en":"DNA双螺旋的观景塔——一步一景的垂直景观之旅"}', NULL, '2026-07-08T16:11:20.896254+00:00'::timestamptz);
  `)

  await db.exec(migration)
  await assertForward()

  let replayRefused = false
  try {
    await db.exec(migration)
  } catch (error) {
    replayRefused = String(error).includes('precondition failed')
  }
  if (!replayRefused) throw new Error('migration replay was not refused')

  await db.exec(rollback)
  await assertRollback()
  await db.exec(migration)
  await assertForward()
  await db.exec(rollback)
  await assertRollback()

  console.log('Content trust product-core batch 002 isolated PostgreSQL dry-run passed.')
  console.log(`- PostgreSQL engine: ${await scalar("select current_setting('server_version_num')::integer")}`)
  console.log('- forward: three guarded source-backed records with trilingual content')
  console.log('- guards: exact null-source/null-description snapshot, replay refusal, exact rollback')
} finally {
  await db.close()
}

async function assertForward() {
  if (await scalar(`select count(*) from public.buildings where slug in ('apple-park','fallingwater','marsk-tower') and official_url is not null and description ?& array['zh','en','ja'] and significance ?& array['zh','en','ja']`) !== 3) {
    throw new Error('forward content mismatch')
  }
  if (await scalar(`select count(*) from public.buildings where slug = 'fallingwater' and city = 'Mill Run'`) !== 1) throw new Error('Fallingwater location mismatch')
  if (await scalar(`select count(*) from public.buildings where slug = 'marsk-tower' and city = 'Skærbæk'`) !== 1) throw new Error('Marsk Tower location mismatch')
}

async function assertRollback() {
  if (await scalar(`select count(*) from public.buildings where slug in ('apple-park','fallingwater','marsk-tower') and official_url is null and description is null and significance ?& array['en']`) !== 3) {
    throw new Error('rollback content mismatch')
  }
  if (await scalar(`select count(*) from public.buildings where slug = 'fallingwater' and city = '宾夕法尼亚州'`) !== 1) throw new Error('rollback Fallingwater mismatch')
  if (await scalar(`select count(*) from public.buildings where slug = 'marsk-tower' and city = '斯科尔拜克'`) !== 1) throw new Error('rollback Marsk Tower mismatch')
}

async function scalar(sql) {
  const result = await db.query(sql)
  return Number(Object.values(result.rows[0])[0])
}

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8')
}
