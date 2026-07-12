# Transport batch 001 生产记录

日期：2026-07-12

## 范围

- CASE-008 → `onagawa-station-yupoppo`
- CASE-094 → `takanawa-gateway-station`
- CASE-133 → `yokohama-international-passenger-terminal`
- 保留三个 CASE 路由和各自的毕业分析层；每条 profile 引用一个新建 canonical building。

## 写前保护与演练

- 生产只读预检：0 building slug conflict、0 primary image conflict、0 CASE profile conflict、0 architect conflict。
- 依赖检查：`transport-hub` 与 `mixed-use` 2/2，`transportation` building type 1/1。
- 隔离 PostgreSQL 18.3 重放全部历史迁移后，第一次 forward、共享/外部引用 rollback guard、精确 rollback、第二次 forward 与第二次 rollback 全部通过。
- guarded rollback 只删除本批拥有且未被外部 CASE/profile/关系复用的记录；存在共享引用时会拒绝破坏性回滚。

## 生产迁移

- Supabase project：`architect-history` (`usuqjsjluietcnudxwvz`)。
- Migration：`graduation_transport_batch_001`，version `20260712055147`。
- PR #45 合并 migration pack。
- 写前总数：62 profiles / 916 buildings / 7265 images / 101 assignments。
- 写后总数：65 profiles / 919 buildings / 7268 images / 106 assignments。
- 本批写入：1 architect、3 buildings、3 primary images、3 published profiles、5 approved assignments。
- 三个 building 均以 `transport-hub` 为 primary function；Onagawa 与 Yokohama 另有 secondary `mixed-use`。

## 写后核验

- 3/3 target buildings、images、profiles 与 primary `transport-hub` assignments 存在。
- orphan profiles：0。
- architect mismatch：0。
- duplicate primary images：0。
- duplicate primary functions：0。
- `graduation_case_profiles` 与 `building_function_assignments` 的 RLS 均保持开启，各保留一条公开只读 policy。
- Security / performance advisors 无本迁移新增问题；仅保留既有 PostGIS、内部事件表及历史索引提示。

## 发布与线上验收

- PR #46 将生产读取基线从 62 更新为 65，并加入 CASE-008/094/133 unified CASE 断言。
- 最终 Reviewed production release `29181886192` 成功；质量门、完整测试、Cloudflare deploy 与 route semantics 全部通过。
- 线上 graduation API 已返回 `source=supabase+json`、101 public cases、65 profiles、0 missing building/fallback relation。
- 三个 CASE 路由与三个 canonical building 路由均返回 HTTP 200；三种语言下的 building 路由共 9/9 为 HTTP 200。
- 三张本地图均返回 HTTP 200：CASE-008 217689 bytes、CASE-094 588249 bytes、CASE-133 849421 bytes。
- API 中 CASE-008 为 Mister0124 / CC BY-SA 4.0，CASE-094 为 江戸村のとくぞう / CC BY-SA 4.0，CASE-133 为 Syced / CC0；名称、建筑师、年份与一手来源均符合审核决策。

## G6 进度与下一步

- 已迁移 canonical candidates：44/118。
- 尚未迁移：74/118；其中包括已审核但因图片授权或身份边界未进入 migration 的记录。
- 版本化 new-building queue 中尚未完成正式审核的记录：56。
- 下一步只选择一个边界清晰的小批次，先做只读身份、用途和图片许可审核，再决定是否生成 migration。
