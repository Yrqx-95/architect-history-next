# Transport-hub taxonomy 001 生产记录

日期：2026-07-12

## 数据库

- Supabase project：`architect-history` (`usuqjsjluietcnudxwvz`)。
- Migration：`building_function_transport_hub_001`，version `20260712053356`。
- 写前：9 functions / 122 aliases / 101 assignments。
- 写后：10 functions / 139 aliases / 101 assignments。
- `transport-hub`：1 active function、17 aliases、4 locales。
- `building_functions` 与 `building_function_aliases` 的 RLS 仍开启，各保留 1 条公开只读 policy。
- anon / authenticated 对两表的 SELECT 权限保持；anon REST 实测 function 1 条、aliases 17 条并返回 HTTP 200。

## Advisors

Security 与 performance advisors 未报告本迁移新增问题。现有提示仍为历史项，包括 PostGIS/extension public schema、`spatial_ref_sys`、无 policy 的内部事件表，以及若干 unused/unindexed index；本次只插入 taxonomy 数据，不改变这些对象。

相关 remediation：

- https://supabase.com/docs/guides/database/database-linter?lint=0013_rls_disabled_in_public
- https://supabase.com/docs/guides/database/database-linter?lint=0014_extension_in_public
- https://supabase.com/docs/guides/database/database-linter?lint=0001_unindexed_foreign_keys
- https://supabase.com/docs/guides/database/database-linter?lint=0005_unused_index

## 发布与线上验收

- PR #44 合并 taxonomy、migration、CASE-094 正确站体图和 CASE-133 CC0 本地图。
- Reviewed production release `29181377729` 成功；质量门、完整测试、Cloudflare deploy 与 route semantics 全部通过。
- CASE-094 页面 HTTP 200；图片 HTTP 200 / 588249 bytes / JPEG。
- CASE-133 页面 HTTP 200；图片 HTTP 200 / 849421 bytes / JPEG。
- 线上 graduation API：`source=supabase+json`、101 public cases、62 profiles、0 missing relation。
- CASE-094 返回 江戸村のとくぞう / CC BY-SA 4.0；CASE-133 返回 Syced / CC0。

## 下一步

生成并审核 transport batch 001 的 1 architect、3 buildings、3 images、3 profiles 与 5 assignments migration pack；生产 conflict 必须再次为 0 后才能写入。
