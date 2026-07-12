# Retail Taxonomy 001 Production Record

日期：2026-07-12  
范围：G6 Shimokitazawa retail batch 001 的 taxonomy 前置项与 CASE-038 图片发布

## 合并与迁移

- PR #62：合并 CASE-038/039 只读审核决策。
- PR #63：合并 `retail` 四语 taxonomy、guarded apply/rollback、Supabase migration、隔离 PostgreSQL dry-run、CASE-038 高清图片与生成数据。
- Supabase project：`usuqjsjluietcnudxwvz`。
- migration：`building_function_retail_001`。
- production version：`20260712102033`。

## 写前门槛

- `commercial` building type：存在。
- `retail` function：不存在。
- 20 个拟新增 `(locale, normalized_alias)` 冲突：0。
- 基线：12 functions / 189 aliases。
- `building_functions` 与 `building_function_aliases` RLS 均开启，共 2 条只读 policy。
- security/performance advisors 已记录；本迁移不新增表、函数、策略或索引。

## 写后核验

- 总数：13 functions / 209 aliases。
- `retail`：1 条 active function，`broad_type_slug = commercial`。
- alias：20 条；`zh`、`zh-Hant`、`en`、`ja` 各 5 条。
- `retail` building assignments：0，建筑批次尚未写入。
- 两张 taxonomy 表 RLS 保持开启、policy 数保持 2、anon SELECT 保持可用。
- 写后 advisor cache keys 与写前一致，没有本迁移新增问题。

## 发布与真实路由

- Reviewed production release：`29188986536`，成功，耗时 8m28s。
- publication quality gate、完整测试、Cloudflare build/deploy、生产 200/404 路由语义检查全部通过。
- CASE-038 与 CASE-039 的中英日 6 条 CASE 路由全部 HTTP 200。
- CASE-038 图片 HTTP 200，线上尺寸 2000×1340，SHA-256 与仓库文件同为 `3c8e69c37dd52f02412def84d2214d9aa34cddc01c2f0fc65c90cd32f0c44cf4`。
- 线上 API：`source=supabase+json`、101 cases、70 profiles、0 missing relation；CASE-038 返回 `CC BY 4.0` 与 morinakayasuaki / MDPI Figure 3 的完整署名。

## 下一步

生成 CASE-038/039 migration pack。两条 CASE 保留各自 concept/keywords；分别创建两个 canonical buildings，不复用或重复任何既有 building。用途 assignment 使用已上线的 `retail` primary，并按审核决策附加 `mixed-use`、`public-space` secondary。
