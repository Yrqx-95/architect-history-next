# Graduation Museum Batch 001 — Dry Run

日期：2026-07-12
状态：版本化迁移包与隔离 PostgreSQL dry-run 已通过；尚未写生产数据库

## 范围

- 14 个 museum new-building cases。
- 12 个相关主体建筑师：复用生产 3 个，新建 9 个。
- 14 个 `buildings`。
- 14 个 primary `images`。
- 14 个 `graduation_case_profiles`。
- 16 个 approved `building_function_assignments`。

## 数据修正

- CASE-051：拒绝施工中图片，改为 Souka Kinmei / CC0 的 2024 完工照片；本地化后为 2000×1123、613KB、无 EXIF。
- CASE-124：官方来源更新为现行 Henning Larsen 项目页；署名改为 Gardar Rurak / Wikimedia Commons，CC BY-SA 4.0。
- CASE-132：署名改为 Michael Rowe / Wikimedia Commons，CC BY-SA 4.0。
- CASE-052/053/054/055/058/060：保留原作者与许可证，只补齐 `/ Wikimedia Commons` 来源平台，避免 CASE 页与统一主体署名格式漂移。

## 生产只读预检

- building slug conflict：0。
- CASE profile conflict：0。
- `museum` function：存在且 active。
- 已存在主体建筑师：Kengo Kuma、Shigeru Ban、Zaha Hadid。
- 其余九个建筑师按 slug 与姓名复查均无重复。

## Dry-run 顺序

PGlite PostgreSQL 兼容引擎按生产依赖顺序重放：

1. graduation unification foundation；
2. graduation unification batch 001；
3. graduation library batch 001；
4. graduation library batch 002；
5. graduation museum batch 001。

## 验证结果

- 第一次前向迁移通过。
- 写后数量与主图 / 主用途唯一性通过。
- 注入外部 curated image relation 后，rollback 正确拒绝。
- 删除外部关系后，精确 rollback 通过。
- 第二次前向迁移通过。
- 第二次精确 rollback 通过。
- PostgreSQL engine：180003。

## 文件

- 决策：`db/review-decisions/graduation-new-buildings-museum-001.json`
- 数据包：`db/review-packets/graduation-museum-batch-001.json`
- apply：`db/manual-operations/graduation-museum-batch-001-apply.sql`
- rollback：`db/manual-operations/graduation-museum-batch-001-rollback.sql`
- 验证命令：`npm run graduation:verify-museum-001`

## 下一步

通过 PR 合并本批次审核数据、公开图片修正和迁移包。合并后先做生产冲突复查，再执行版本化 Supabase migration；写后审计通过后才运行 Reviewed production release。
