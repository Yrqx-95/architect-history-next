# Graduation disaster memorial batch 002 production record

日期：2026-07-12

## 范围与 PR

- CASE-015 Minamisanriku 311 Memorial。
- PR #73：只读身份、用途与图片审核决策。
- PR #74：guarded migration pack、dependency-aware rollback 与完整历史 dry-run。
- PR #75：75-profile E2E 基线、CASE-015 canonical 回归断言与 compatibility JSON 修正。

## 生产迁移

- Supabase project：`usuqjsjluietcnudxwvz`。
- migration：`graduation_disaster_memorial_batch_002`。
- production version：`20260712115840`。
- 写前基线：74 profiles / 928 buildings / 7277 images / 123 assignments。
- 写前 target building/image/profile/assignment conflicts：全部 0。
- existing Kengo Kuma exact match：1；required `museum` function：1/1；required `cultural` type：1/1。

写入：

- 复用既有 Kengo Kuma architect。
- 1 canonical building。
- 1 primary image。
- 1 published graduation profile。
- 1 approved `museum` primary assignment。

写后总数：75 profiles / 929 buildings / 7278 images / 124 assignments。

## 写后核验

- 目标 building / image / profile / assignment 各 1，全部精确匹配。
- orphan profiles：0。
- architect relation mismatch：0。
- primary image count 异常：0。
- primary function count 异常：0。
- CASE-015 concept 与中英日 keywords 保持毕业分析层原值。
- graduation profile/function assignment RLS 与 published-only policy 正常。
- Supabase advisors 保持写前 13 security / 27 performance 的既有基线，没有本迁移新增问题。

## Compatibility 修正

数据库写后、发布前的生产目标 E2E 发现 API 仍从旧 JSON compatibility layer 返回 `Kengo Kuma and Associates` 与裸 `Yasu`。PR #75 修正权威 `content/cases.csv` 和生成数据，使其与 canonical `Kengo Kuma` 以及标准 `Photo: Yasu / Wikimedia Commons` 署名一致；没有通过放宽断言隐藏差异。

## 发布与线上验收

- Reviewed production release：`29191945706`，成功，耗时 8m27s。
- publication gate、完整 unit/E2E、Cloudflare build/deploy 与生产路由语义检查全部通过。
- CASE-015 中英日 3 条 CASE 路由：全部 HTTP 200。
- canonical building 中英日 3 条路由：全部 HTTP 200。
- 本地审核图片：HTTP 200。
- API：`source=supabase+json`、101 cases、75 profiles、75 unified CASE IDs、0 missing fallback、0 missing building。
- CASE-015 返回南三陆311纪念馆 / Kengo Kuma / 2022 / CC BY-SA 3.0 / Photo: Yasu / Wikimedia Commons。

## G6 进度

- 已迁移：54/118。
- 尚未迁移：64。
- 尚未正式审核队列：43。
