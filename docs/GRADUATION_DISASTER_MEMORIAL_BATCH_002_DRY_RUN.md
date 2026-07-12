# Graduation disaster memorial batch 002 dry-run

日期：2026-07-12

## 范围

- CASE-015 Minamisanriku 311 Memorial。
- 只生成版本化 migration pack、guarded apply、dependency-aware rollback 与 Supabase CLI migration；本文不授权生产写入。

## 生成结果

- existing architects：1（`51797239-be38-4dbd-9d7e-e413ddf3c78a / kengo-kuma`）。
- new architects：0。
- canonical buildings：1（`c63e9862-b1e9-554c-8765-5fff3f65d408 / minamisanriku-311-memorial`）。
- primary images：1（`fc630fa4-832d-5edc-b5e8-2772697b14b1`）。
- published profiles：1（CASE-015）。
- approved function assignments：1（`museum` primary）。

CASE-015 的 concept 与中英日 keywords 直接保留现有毕业分析层，没有由 canonical building 覆盖。

## PostgreSQL 隔离演练

使用 PostgreSQL 18.3 / engine `180003`，加载完整历史 foundation、G6 既有 pack 与 taxonomy migrations 后运行：

1. forward：0 new architects / 1 building / 1 image / 1 profile / 1 assignment，成功；
2. 注入外部 curated-image relation 后 rollback：按预期拒绝；
3. 删除外部关系后 exact rollback：成功；
4. second forward：成功；
5. second rollback：成功。

apply 与 rollback 均只处理本批确定性 UUID。rollback 会在目标 building 出现外部 profile、图片、architect relation 或 function assignment 时拒绝删除。

## 生产只读预检

写前基线：74 profiles / 928 buildings / 7277 images / 123 assignments。

- existing architect UUID/slug exact match：1。
- target building UUID/slug conflict：0。
- target image UUID/source conflict：0。
- CASE-015 profile conflict：0。
- target assignment conflict：0。
- required `museum` function：1/1。
- required `cultural` type：1/1。

预期写后：75 profiles / 929 buildings / 7278 images / 124 assignments。

## 文件一致性

- `db/manual-operations/graduation-disaster-memorial-batch-002-apply.sql`
- `supabase/migrations/20260712205500_graduation_disaster_memorial_batch_002.sql`

两份 forward SQL 字节一致。

## 下一步

先通过 PR 合并 migration pack。合并后重新执行生产只读预检；只有冲突仍为 0 时，才允许应用 Supabase migration，并在写后核验计数、关系、RLS、advisors、Reviewed release 与真实路由。
