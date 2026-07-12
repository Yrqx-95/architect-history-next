# Graduation public-toilet batch 001 生产记录

日期：2026-07-12

## 批次结论

- CASE-044 Nabeshima Shoto Park Toilet 已完成 canonical building 统一。
- CASE-031 保留项目级 CASE 路由与中性 placeholder，不建立虚构的单一 building。
- CASE-049 继续 `no_safe_image_yet`，没有进入任何迁移 seed。

## 生产迁移

- Supabase migration：`graduation_public_toilet_batch_001`。
- Version：`20260712094552`。
- 复用 architect：`51797239-be38-4dbd-9d7e-e413ddf3c78a / kengo-kuma`。
- 新增：1 building、1 primary image、1 published graduation profile、2 approved function assignments。
- building broad type：`civic-public`。
- primary function：`public-toilet`。
- secondary function：`public-space`。

写后数量：

- profiles：69 → 70。
- buildings：923 → 924。
- images：7272 → 7273。
- assignments：111 → 113。

关系核验：

- target building/image/profile/assignments：1/1/1/2。
- primary `public-toilet`：1。
- orphan profile：0。
- architect mismatch：0。
- duplicate primary image：0。
- duplicate primary function：0。
- profile/assignment RLS：true；公开读取 policy 各 1 条。
- Supabase advisors 无本迁移新增问题。

## Broad type 预检修正

第一次生产预检发现 decision 把细用途 `public-toilet` 用作 `buildings.type_slug`，但生产 `building_types` 不存在该 slug。

处理：

- building broad type 修正为现有 `civic-public`。
- `public-toilet` 保持 primary function，不降低用途搜索精度。
- 隔离验证器改为只从版本化 function taxonomy 派生允许的 broad types，不再从当前 pack 动态创建 type，避免测试环境掩盖生产缺失。
- 修正后两次生产预检均为 architect exact 1、所有目标冲突 0、functions 2/2、type 1/1。

## 合并与发布

1. PR #59 合并 reviewed migration pack、guarded SQL、验证器修正、图片署名同步和测试。
2. 生产冲突复查为 0 后应用 migration `20260712094552`。
3. PR #60 将 E2E profile 基线从 69 更新为 70，并加入 CASE-044 canonical 字段和图片版权断言。
4. Reviewed production release `29188112986` 成功，质量门、完整测试、Cloudflare deploy 与 route semantics 全部通过；总用时 8m37s。

## 线上验收

- `/api/v1/graduation/cases?verify=29188112986` 返回 `source=supabase+json`、101 cases、70 profiles。
- `missingFallbackCaseIds=[]`，`missingBuildingCaseIds=[]`。
- CASE-044 返回规范名称“锅岛松涛公园厕所”、Kengo Kuma、2021、CC BY-SA 4.0、`Photo: 鋸香具師 / Wikimedia Commons`。
- CASE-044 中英日三个 CASE 路由：3/3 HTTP 200。
- canonical building 中英日三个路由：3/3 HTTP 200。
- 本地图片：HTTP 200、`image/jpeg`、89881 bytes。

## G6 进度

- 已迁移：49/118。
- 尚未迁移：69/118。
- 尚未完成正式审核的版本化队列：48 条。
