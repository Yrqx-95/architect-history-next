# Graduation Library Batch 002 Production Record

日期：2026-07-12

结论：Library batch 002 已完成生产迁移、Cloudflare 发布与线上验收。

## 生产迁移

- Supabase project：`architect-history` (`usuqjsjluietcnudxwvz`)。
- Migration：`graduation_library_batch_002`。
- Version：`20260711233931`。
- 写入：11 new architects、14 buildings、14 primary images、14 published graduation profiles、36 approved function assignments。
- CASE-079 不在 migration pack 中，继续保持 `no_safe_image_yet`。

写后审计：

- 批次 architect/building/image/profile/assignment 计数为 11/14/14/14/36。
- 14 张 primary image，14 条 primary `library` function。
- orphan profile：0。
- orphan assignment：0。
- architect UUID/slug mismatch：0。
- duplicate primary image group：0。
- duplicate primary function group：0。

## 发布

- 首次 Reviewed production release `29172505927` 在 E2E 被拦截：测试仍假设 profile 数为旧基线 29，生产正确值已是 43。该次未执行 Cloudflare deploy。
- PR #24 将基线更新为 43，显式断言 14 个 batch 002 CASE 存在、CASE-079 不存在，并补 Bibliotheca Alexandrina 规范事实回归。
- 第二次 Reviewed production release `29172691510` 成功：质量门、68 unit tests、19 E2E tests、Cloudflare build/deploy 和生产 200/404 路由语义检查全部通过。

## 线上验收

- `/api/v1/graduation/cases`：`source=supabase+json`，100 个公开案例，43 profiles，43 unified CASE IDs。
- `missingFallbackCaseIds=[]`，`missingBuildingCaseIds=[]`。
- canonical image takeover 仍为 0，43 个 CASE 按准入门继续使用已审核 JSON fallback image。
- 14 个 batch 002 CASE 路由均返回 HTTP 200。
- 14 个新 building 路由均返回 HTTP 200。
- CASE-113、130、137 的本地替换图均返回 HTTP 200 / `image/jpeg`。
- CASE-101、113、130、137 在线 HTML 分别显示 Villy Fink Isaksen、Mahmoud Saaid、G.Lanting 和 Fatih Renkligil 署名。

## 剩余边界

Library 子集已达到 22/23 生产迁移。唯一剩余 CASE-079 不是技术失败，而是内容诚信门：尚未找到能合法复用、且真正展示 2021 改造后项目的图片。
