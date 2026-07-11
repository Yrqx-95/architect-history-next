# Graduation Unification Batch 001 — Production Record

日期：2026-07-12

Supabase project：`usuqjsjluietcnudxwvz`

状态：数据库迁移已完成；应用双轨读取待 Reviewed production release

## 已执行迁移

| 顺序 | Migration | Version |
|---|---|---|
| 1 | `graduation_building_unification_foundation` | `20260711190612` |
| 2 | `graduation_unification_batch_001` | `20260711190655` |

两次迁移均通过已版本化的 guarded SQL 执行。回滚文件仍保留在仓库；本次没有删除旧 JSON，也没有切断既有 CASE 路由。

## 写入后查询

- `graduation_case_profiles`：21 行，21 个唯一 CASE ID，21 个唯一 building ID；
- `building_functions`：9 行；
- `building_function_aliases`：122 行，其中 en 37、ja 31、zh 27、zh-Hant 27；
- `building_function_assignments`：23 行，其中 library 20、museum 3；
- orphan profile / assignment / alias：0；
- 非 published profile：0；
- 非 approved assignment：0；
- anon Data API 返回数量与版本化数据包完全一致，缺失 profile / assignment：0。

## 权限与安全

四张新表均启用 RLS。`anon` 与 `authenticated` 只有符合发布状态的 `SELECT`，没有写权限；`service_role` 保留数据库默认特权。Supabase security/performance advisor 没有发现由四张新表引入的 critical issue。

advisor 仍显示一组项目原有问题，包括扩展位于 `public`、旧表缺索引或存在未使用索引，以及 `spatial_ref_sys` 的 RLS 提示。这些不由本批迁移产生，也未在本批顺手修改。

## 应用双轨读取

运行时保留 100 个既有公开 JSON 案例，只用 21 个 published profile 覆盖已经审核的 canonical 基础事实和毕业研究字段。Supabase 不可用、返回空集合或关系查询失败时，页面和 API 会回退到完整 JSON。

新增 `/api/v1/graduation/cases`，公开返回当前合并结果、来源模式和关系诊断；既有 `/[lang]/graduation/cases/CASE-xxx` 路由不变。

## 图片版权闸门

本批 canonical 图片批准数为 `0 / 21`。所有 21 个已统一 CASE 继续读取 G1/G2 审核过的 JSON 图片，不会因为主体关联建立而自动换图。逐项问题与准入条件见 `docs/GRADUATION_CANONICAL_IMAGE_GATE_001.md`。

## 发布前验证

- 全量 unit：12 个文件、54 项通过；
- 全量 E2E：19 项通过；
- production build：通过；
- typecheck：通过；
- lint：通过；
- 双轨运行时抽查：100 个公开案例、21 个已统一 CASE、0 个缺失主体关系、21 个图片 fallback。

Reviewed production release 完成后，必须再次从线上 API 和 CASE-104 页面验证以上结果，才能把 G5 标记为已完成。
