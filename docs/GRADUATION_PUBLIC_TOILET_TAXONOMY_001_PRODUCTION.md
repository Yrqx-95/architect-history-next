# Graduation public-toilet taxonomy 001 生产记录

日期：2026-07-12

## 生产内容

- Supabase migration：`building_function_public_toilet_001`。
- Version：`20260712075921`。
- 新增 1 个细用途 `public-toilet`，复用现有 `civic-public` broad type。
- 新增中、繁中、英、日四语共 24 aliases，每种语言 6 条。
- function assignments 保持不变；本 migration 不写 building、image 或 graduation profile。

## 写前与写后

最终生产冲突预检：

- function conflict：0。
- 24 个 `(locale, normalized_alias)` conflict：0。
- `civic-public` type：1。
- target assignment：0。
- 基线：11 functions / 165 aliases / 111 assignments。

写后：

- 12 functions / 189 aliases / 111 assignments。
- `public-toilet`：1 function / 24 aliases / 4 locales / 0 assignments。
- `building_functions` 与 `building_function_aliases`：RLS 均为 true，公开读取 policy 各 1 条。
- anon/authenticated 对两表 SELECT 均为 true；匿名 REST 读取 `public-toilet` 返回 HTTP 200 和正确四语名称。
- Supabase security/performance advisors 无本迁移新增问题；现有提示仍是历史 PostGIS extension/metadata、内部 event 表及既有未使用索引等非本批事项。

## CASE-031 图片纠偏与发布失败修复

- 只读审核确认旧图是恵比寿公園厕所单体，不是多地点 THE TOKYO TOILET 项目的可代表 canonical cover。
- 权威 CSV 与生成 JSON 已改为 `/images/graduation/case-placeholder.svg`，并清空虚假的图片来源、许可与摄影者；CASE route、concept、keywords 与 published 状态保留。
- 首次 Reviewed release `29184612266` 在完整 E2E 阶段失败：公开过滤器把 placeholder CASE 排除，API 从 101 降为 100。该次运行未部署 Cloudflare，生产数据库当时也尚未写入。
- PR #57 修复公开策略：显式 placeholder 可以保留 published CASE 路由；任何非 placeholder 真实图片仍必须同时具备 source、license、credit。新增回归测试确认 CASE-031 保持公开且没有虚构图片元数据。
- 修复后的静态 Reviewed release `29184818646` 成功，完整测试、Cloudflare deploy 和 route semantics 全部通过。

## 最终发布与线上验收

- migration 写后 Reviewed production release `29185134025` 成功，job 用时 8m48s。
- `/api/v1/graduation/cases?verify=29185134025` 返回 `source=supabase+json`、101 cases、69 profiles。
- `missingFallbackCaseIds=[]`，`missingBuildingCaseIds=[]`。
- CASE-031 API 返回 placeholder，image source/license/credit 均为 null。
- CASE-031 中英日三个路由与 placeholder SVG 均返回 HTTP 200。

## 剩余边界

- taxonomy 已上线，但 CASE-044 building/profile 尚未写入；必须另建 guarded migration pack，并在全历史隔离 PostgreSQL 演练后走生产预检。
- CASE-049 继续 `no_safe_image_yet`，不得因为 taxonomy 已存在而迁移。
- CASE-031 仍是项目级研究 CASE，不建立虚构的单一 canonical building；未使用的旧本地图保留但不再公开引用。
