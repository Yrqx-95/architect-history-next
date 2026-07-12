# Graduation urban public-space batch 001 生产记录

日期：2026-07-12

## 批次结论

- 审核 5 个候选：CASE-014、050、056、110、111。
- CASE-050/056/110/111 通过建筑身份、用途、图片内容、摄影者和开放许可审核并完成生产统一。
- CASE-014 是跨七区持续整备的隅田川防洪与步行系统，缺少边界明确的完成年份和设计作者，保持 `identity_not_bounded`，没有创建虚构主体。
- 新增四语 `public-space` taxonomy 后再写入本批主体，避免用宽泛旧分类代替城市公共空间用途。

## 生产迁移

- Supabase migration：`graduation_public_space_batch_001`。
- Version：`20260712065152`。
- 写入：3 个新联合 architect、4 buildings、4 primary images、4 published graduation profiles、5 approved function assignments。
- 复用：MVRDV 既有 architect；没有重复创建 architect 或 building。
- 主用途：4 条 `public-space`；CASE-050 另有 `park` 次用途。

写后审计：

- published profiles：65 → 69。
- buildings：919 → 923。
- images：7268 → 7272。
- function assignments：106 → 111。
- 本批 architect/building/primary image/profile/assignment：3/4/4/4/5。
- orphan profile、architect mismatch、duplicate primary image、duplicate primary function：均为 0。
- profile/assignment RLS 启用，公开读取 policy 各 1 条；Supabase advisors 无本迁移新增问题。

## 合并与发布

1. PR #48 合并只读队列、正式审核决策与图片版权结论。
2. PR #49 合并 `public-space` taxonomy、CASE-110 权利元数据修正和 CASE-111 新图片；migration `building_function_public_space_001`（`20260712062946`）及 Reviewed release `29182787593` 均成功。
3. PR #51 合并 guarded apply/rollback、全历史 PostgreSQL 18.3 dry-run 和 migration 文件；外部 curated image 注入时 rollback 会安全拒绝。
4. 生产冲突复查为 0 后应用 migration `20260712065152`，写后数量、关系、RLS、policy 与 advisors 全部通过。
5. PR #52 将生产 E2E 基线从 65 更新为 69；Reviewed production release `29183395825` 成功。
6. 线上验收发现 graduation API 的建筑师仍由 JSON compatibility fallback 提供：CASE-050 与 CASE-111 的字符串分别漂移为旧值。PR #53 将 fallback 修正为 canonical 值并加入回归断言；最终 Reviewed production release `29183774782` 在 10m02s 内完成质量门、完整测试、Cloudflare deploy 和生产路由语义检查。

## 线上验收

- `/api/v1/graduation/cases?verify=29183774782` 返回 `source=supabase+json`、101 个公开案例、69 profiles。
- `missingFallbackCaseIds=[]`，`missingBuildingCaseIds=[]`。
- CASE-050 architect 为 `TAISEI DESIGN + Nikken Sekkei`；CASE-111 architect 为 `BIG + Topotek 1 + Superflex`，与 canonical building 一致。
- CASE-050/056/110/111 的 4 个 CASE 路由与 `hisaya-odori-park`、`tainan-spring`、`the-high-line`、`superkilen` 的 4 个 building 路由均返回 HTTP 200。
- CASE-111 本地图片返回 HTTP 200、`image/jpeg`、730822 bytes。

## 剩余边界

- CASE-014 已完成正式审核但没有迁移，不得为了提高完成数虚构单一 building、年份或设计作者。
- graduation API 的建筑师所有权仍部分位于 JSON compatibility layer；本批已做精确同步和回归保护，系统性切换到 canonical building 读取属于 G8。
- G6 累计迁移 48/118，尚未迁移 70；版本化队列中尚未完成正式审核的记录为 51。
