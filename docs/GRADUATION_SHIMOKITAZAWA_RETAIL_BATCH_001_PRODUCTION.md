# Graduation Shimokitazawa retail batch 001 production record

日期：2026-07-12

## 范围与 PR

- CASE-038 BONUS TRACK Shimokitazawa。
- CASE-039 MIKAN SHIMOKITA。
- PR #62：只读审核决策。
- PR #63：`retail` taxonomy 与 CASE-038 高清图片。
- PR #64：taxonomy 生产记录。
- PR #65：建筑 migration pack、guarded rollback、完整历史 dry-run。
- PR #66：72-profile E2E 基线与 CASE-039 JSON fallback architect 修正。

## 生产迁移

- Supabase project：`usuqjsjluietcnudxwvz`。
- migration：`graduation_shimokitazawa_retail_batch_001`。
- production version：`20260712104005`。
- 写前基线：70 profiles / 924 buildings / 7273 images / 113 assignments。
- 写前 architect/building/image/profile/assignment conflicts：全部 0。
- required functions：3/3；required `commercial` type：1/1。

写入：

- 2 new architects。
- 2 distinct canonical buildings。
- 2 primary images。
- 2 published graduation profiles。
- 5 approved function assignments。

写后总数：72 profiles / 926 buildings / 7275 images / 118 assignments。

## 写后核验

- 目标 2 architects / 2 buildings / 2 images / 2 profiles / 5 assignments 全部精确匹配。
- orphan profiles：0。
- architect relation mismatch：0。
- primary image count 异常：0。
- primary function count 异常：0。
- CASE-038 与 CASE-039 分别只指向自己的 canonical building。
- 两条 profile 的 concept 与 keywords 均保持两套独立值。
- graduation profile/function assignment RLS 与 published-only policy 正常。
- 写后 advisor cache keys 与写前一致，没有本迁移新增问题。

## Compatibility fallback 修正

数据库写后、正式发布前的生产目标 E2E 发现 CASE-039 API architect 仍由 JSON compatibility fallback 返回旧 `Taiju Yamashita Design and Associates`，与官方身份和 canonical `Taiju Yamashita Design and Architecture` 不一致。

PR #66 修正权威 `content/cases.csv` 与所有生成数据，并加入 CASE-038/039 canonical 名称、建筑师、年份、许可和署名的生产 E2E 断言。没有通过放宽断言隐藏差异。

## 发布与线上验收

- Reviewed production release：`29189628666`，成功，耗时 9m13s。
- publication gate、完整 unit/E2E、Cloudflare build/deploy 与生产路由语义检查全部通过。
- CASE-038/039 中英日 6 条 CASE 路由：全部 HTTP 200。
- 两栋 building 中英日 6 条路由：全部 HTTP 200。
- 两张图片：全部 HTTP 200。
- API：`source=supabase+json`、101 cases、72 profiles、0 missing fallback、0 missing building。
- CASE-038 返回 TSUBAME ARCHITECTS / 2020 / CC BY 4.0 / morinakayasuaki + MDPI Figure 3。
- CASE-039 返回 Taiju Yamashita Design and Architecture / 2022 / CC0 / Souka Kinmei。

## G6 进度

- 已迁移：51/118。
- 尚未迁移：67。
- 尚未正式审核队列：46。
