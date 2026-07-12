# Graduation retail-led mixed-use batch 002 production record

日期：2026-07-12

## 范围与 PR

- CASE-074 Daikanyama T-SITE。
- CASE-116 Markthal Rotterdam。
- PR #68：只读身份、用途与图片审核决策。
- PR #69：图片本地化与公开数据更新。
- PR #70：建筑 migration pack、guarded rollback 与完整历史 dry-run。
- PR #71：74-profile E2E 基线与 CASE-074/116 canonical 回归断言。

## 生产迁移

- Supabase project：`usuqjsjluietcnudxwvz`。
- migration：`graduation_retail_mixed_use_batch_002`。
- production version：`20260712113024`。
- 写前基线：72 profiles / 926 buildings / 7275 images / 118 assignments。
- 写前 new architect 与 building/image/profile/assignment conflicts：全部 0。
- existing MVRDV exact match：1；required functions：3/3；required `mixed-use` type：1/1。

写入：

- 1 new Klein Dytham architect，并复用既有 MVRDV architect。
- 2 distinct canonical buildings。
- 2 primary images。
- 2 published graduation profiles。
- 5 approved function assignments。

写后总数：74 profiles / 928 buildings / 7277 images / 123 assignments。

## 写后核验

- 目标 1 new architect / 2 buildings / 2 images / 2 profiles / 5 assignments 全部精确匹配。
- orphan profiles：0。
- architect relation mismatch：0。
- primary image count 异常：0。
- primary function count 异常：0。
- 两条 profile 分别只指向自己的 canonical building，concept 与 keywords 保持独立。
- graduation profile/function assignment RLS 与 published-only policy 正常。
- Supabase advisors 保持写前 13 security / 27 performance 的既有基线，没有本迁移新增问题。

## 发布与线上验收

- 静态图片与公开数据 Reviewed release：`29190460042`，成功。
- 数据库写后 Reviewed production release：`29191052908`，成功，耗时 8m19s。
- publication gate、完整 unit/E2E、Cloudflare build/deploy 与生产路由语义检查全部通过。
- CASE-074/116 中英日 6 条 CASE 路由：全部 HTTP 200。
- 两栋 building 中英日 6 条路由：全部 HTTP 200。
- 两张图片：全部 HTTP 200。
- API：`source=supabase+json`、101 cases、74 profiles、74 unified CASE IDs、0 missing fallback、0 missing building。
- CASE-074 返回 Klein Dytham architecture / 2011 / CC BY-SA 2.0 / Jonathan Lin。
- CASE-116 返回 MVRDV / 2014 / CC BY-SA 4.0 / Michielverbeek。

## G6 进度

- 已迁移：53/118。
- 尚未迁移：65。
- 尚未正式审核队列：44。
