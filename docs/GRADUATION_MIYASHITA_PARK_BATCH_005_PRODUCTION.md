# Graduation MIYASHITA PARK batch 005 production record

日期：2026-07-12

## 范围与 PR

- CASE-040 MIYASHITA PARK。
- PR #79：只读身份、联合设计角色、用途与图片审核。
- PR #80：错误 Tower Records 图片替换为 Nesnad / CC BY 4.0 准确图片。
- PR #81：guarded migration pack、rollback 与完整历史 dry-run。
- PR #82：76-profile E2E 基线与 CASE-040 canonical 回归断言。

## 生产迁移

- Supabase project：`usuqjsjluietcnudxwvz`。
- migration：`graduation_miyashita_park_batch_005`。
- production version：`20260712124927`。
- 写前：75 profiles / 929 buildings / 7278 images / 124 assignments。
- 写入：1 joint architect / 1 building / 1 image / 1 profile / 3 assignments。
- 写后：76 profiles / 930 buildings / 7279 images / 127 assignments。

## 核验

- 目标计数全部精确匹配；orphan、primary image/function 异常均为 0。
- `mixed-use` primary；`retail`、`public-space` secondary。
- Takenaka lead architect 与 Nikken project architect 通过联合实体和官方角色证据完整保留。
- profile concept 与中英日 keywords 保持毕业分析层原值。
- RLS 正常；advisors 保持既有 13 security / 27 performance。

## 发布

- 图片静态 Reviewed release：`29192872574`，成功，9m30s；线上图片 2000×1500，SHA-256 与仓库一致。
- 数据库写后 Reviewed release：`29193418710`，成功，9m55s。
- 三语 CASE 路由 3/3、building 路由 3/3、图片 1/1 全部 HTTP 200。
- API：`source=supabase+json`、101 cases、76 profiles、0 missing fallback/building。
- CASE-040 返回宫下公园 / Takenaka Corporation + Nikken Sekkei / 2020 / CC BY 4.0 / Photo: Nesnad / Wikimedia Commons。

## G6 进度

- 已迁移：55/118。
- 尚未迁移：63。
- 尚未正式审核队列：40。
