# G6 Library Batch 001 — Production Record

日期：2026-07-12  
范围：CASE-018、CASE-021、CASE-022、CASE-023、CASE-027、CASE-029、CASE-042、CASE-070

## 写入前条件

- PR #17 完成 8 个案例的建筑身份、官方来源、用途与图片逐项审核；CASE-027 更换低价值横置图，CASE-070 修正旧馆误配。
- 12 个官方证据 URL 实时访问 0 failure；8 个 Wikimedia Commons 文件作者与许可 0 mismatch。
- PR #18 合并固定 UUID 的 apply、rollback、review packet 与 PGlite dry-run。
- 两次生产只读预检均为 0 冲突；PGlite 完成 forward、外部关系回滚阻断、exact rollback、第二轮 forward/rollback。

## 生产迁移

- 名称：`graduation_library_batch_001`
- 版本：`20260711201728`
- 结果：成功
- 新增：4 architects、8 buildings、8 primary images、8 published graduation profiles、17 approved function assignments。

写后 SQL 核验：

- 8/8 建筑固定 UUID、slug、architect slug 与年份一致；
- 8/8 主用途为 `library`，复合用途关系共 17 条；
- 8/8 主图带作者、来源页与 CC BY-SA 4.0 或 CC0 许可；
- orphan image/profile/function、architect mapping mismatch、building field mismatch 均为 0；
- duplicate primary image group 与 duplicate primary function group 均为 0。

Supabase Advisors 没有显示由本批数据写入新增的问题；现有提示仍是历史 PostGIS/RLS 与未使用索引项目，本批未擅自扩大范围处理。参考 [Security Advisor](https://supabase.com/docs/guides/database/database-linter) 与 [Performance Advisor](https://supabase.com/docs/guides/database/database-linter?lint=0001_unindexed_foreign_keys)。

## 发布与线上验收

- 首次 release run `29166788611` 被旧的 21-profile E2E 基线拦截，没有部署。
- PR #19 将统一数量更新为 29，明确断言本批 8 个 CASE，并把移动布局断言与 JSON fallback 解耦；专项 4 个 E2E 与 ESLint 通过。
- Reviewed production release run `29167078871` 成功：质量门、62 个 unit、19 个 E2E、Cloudflare build/deploy 与线上 404 语义检查全部通过。
- 线上 API：`source=supabase+json`、100 个公开案例、29 个 unified profile、0 missing fallback/building、29 个 reviewed JSON image fallback。
- 8 个 CASE 页面与 8 个主体建筑页全部 HTTP 200；8 个 CASE 页面均显示已审核图片许可署名。

## 保留风险与下一步

本批图片虽然已经进入统一 `images` 表，但 canonical image takeover 的准入集合仍为空，因此毕业制作页面继续使用内容相同且已审核的 JSON 图片。这是有意的安全门，不是丢失数据；统一图片读取留在 G8 完成。

G6 当前完成 8/118，剩余 110。下一步建立 library batch 002，审核剩余 15 个 library 相关 new-building candidates；未完成身份、来源和版权复核前不生成生产写入。
