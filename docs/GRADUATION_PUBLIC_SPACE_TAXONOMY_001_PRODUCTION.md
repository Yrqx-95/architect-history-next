# Public-space taxonomy 001 生产记录

日期：2026-07-12

## 数据库

- Supabase project：`architect-history` (`usuqjsjluietcnudxwvz`)。
- Migration：`building_function_public_space_001`，version `20260712062946`。
- PR #49 合并 taxonomy、guarded migration、CASE-110 元数据修正和 CASE-111 本地图。
- 写前：10 functions / 139 aliases / 106 assignments。
- 写后：11 functions / 165 aliases / 106 assignments。
- `public-space`：1 active function、26 aliases、4 locales、0 assignments。
- `building_functions` 与 `building_function_aliases` 的 RLS 均保持开启，各保留 1 条公开只读 policy。
- anon / authenticated 对两表的 SELECT 权限保持；anon REST 实测 function 1 条、aliases 26 条，均返回 HTTP 200。

## Advisors

Security 与 performance advisors 未报告本迁移新增问题。现有提示仍为历史项，包括 PostGIS/extension public schema、`spatial_ref_sys`、无公开 policy 的内部事件表、PostGIS `st_estimatedextent` security-definer 暴露，以及若干 unused/unindexed index；本次只插入 taxonomy 数据，不改变这些对象。

相关 remediation：

- https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy
- https://supabase.com/docs/guides/database/database-linter?lint=0013_rls_disabled_in_public
- https://supabase.com/docs/guides/database/database-linter?lint=0014_extension_in_public
- https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable
- https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable
- https://supabase.com/docs/guides/database/database-linter?lint=0001_unindexed_foreign_keys
- https://supabase.com/docs/guides/database/database-linter?lint=0005_unused_index

## 发布与线上验收

- Reviewed production release `29182787593` 成功；质量门、完整测试、Cloudflare deploy 与 route semantics 全部通过。
- CASE-110 与 CASE-111 页面均 HTTP 200。
- CASE-111 本地图 HTTP 200 / 730822 bytes / JPEG。
- 线上 graduation API：`source=supabase+json`、101 public cases、65 profiles、0 missing building relation。
- CASE-110 返回 Beyond My Ken / CC BY-SA 4.0、Field Operations 项目来源与完整设计合作方。
- CASE-111 返回 Emily / CC BY 2.0、本地 Black Square 全景和现行 BIG 项目来源。

## 下一步

生成并审核 urban public-space batch 001 的 3 个联合/新 architect（MVRDV 复用）、4 buildings、4 primary images、4 profiles 与 5 assignments migration pack；生产 conflict 必须再次为 0 后才能写入。
