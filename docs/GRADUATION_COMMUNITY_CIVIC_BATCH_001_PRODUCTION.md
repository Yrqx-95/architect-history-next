# Graduation community / civic batch 001 生产记录

日期：2026-07-12

## 批次结论

- 审核 6 个候选：CASE-019、064、067、069、088、096。
- CASE-096 通过建筑身份、用途、图片内容、作者与 CC BY-SA 4.0 审核并完成生产统一。
- CASE-019/064/067/069/088 保持 `no_safe_image_yet`，没有进入迁移。
- CASE-019 现图是错误建筑；CASE-069 的源数据年份应由 2012 修正为 2009。

## 生产迁移

- Supabase migration：`graduation_community_civic_batch_001`。
- Version：`20260712023102`。
- 写入：1 个新联合 architect、1 building、1 primary image、1 published graduation profile、3 approved function assignments。
- 主用途：`community-center`；次用途：`theatre`、`mixed-use`。

写后审计：

- published profiles：62。
- 本批 architect/building/primary image/profile/assignment：1/1/1/1/3。
- primary function：1 条 `community-center`。
- orphan profile：0。
- true orphan architect relation：0。
- orphan function assignment：0。

## 合并与发布

1. PR #34 合并只读队列、正式审核决策和图片版权结论。
2. PR #35 合并 guarded apply/rollback、全历史 dry-run 和验证器时间顺序修正。
3. 生产冲突复查为 0 后应用 migration `20260712023102`。
4. PR #36 将生产 E2E 基线从 61 更新为 62。
5. Reviewed production release `29176957382` 成功：质量门、完整测试、Cloudflare deploy 和生产 200/404 路由语义检查全部通过。

## 线上验收

- `/api/v1/graduation/cases` 返回 `source=supabase+json`、101 个公开案例、62 profiles。
- CASE-096 存在于 unified CASE IDs；`missingFallbackCaseIds=[]`，`missingBuildingCaseIds=[]`。
- API 返回规范名称“日美文化与社区中心”、1983、CC BY-SA 4.0 和 `Photo: Another Believer / Wikimedia Commons`。
- `/zh/graduation/cases/CASE-096` 返回 HTTP 200。
- `/zh/building/japanese-american-cultural-community-center` 返回 HTTP 200。
- 本地图片返回 HTTP 200、`image/jpeg`、313521 bytes。

## 剩余边界

- 本批未因图片缺失降低版权标准；5 条身份正确但图片不安全的记录仍未创建主体。
- CASE-019 的错误建筑图仍存在于旧 JSON 展示层，不能进入 canonical image；应在后续图片修正批次找到准确许可图或改回占位图。
- canonical image takeover 仍在 G8 安全门之后，CASE-096 当前继续使用内容相同的已审核 JSON fallback image。
