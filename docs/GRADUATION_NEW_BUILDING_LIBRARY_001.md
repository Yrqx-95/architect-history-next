# G6 New Building Review — Library Batch 001

日期：2026-07-12

状态：8 条身份与图片审核完成；图片修正已发布；数据库迁移包已进入 dry-run 阶段

## 数量校正

G6 的真实剩余数是 118，不是旧清单中的 101：

- 139 个毕业案例；
- G1/G2 共 21 个已链接 canonical building；
- 139 - 21 = 118 个需要新建主体；
- 当前匹配报告中它们由 102 个 `new-building-candidate` 与 16 个已判定错误的 `identity-review` 组成。

`scripts/build-graduation-new-building-queue.mjs` 现在用集合差计算这个数字并生成 `db/review-packets/graduation-new-building-queue-001.json`。专项测试要求 21 + 118 恰好覆盖 139 个 CASE，防止旧数字继续漏项。

## 第一批选择

首批优先审核 8 个图书馆相关案例，因为它们直接改善“图书馆 / library / 図書館”的用途搜索覆盖，同时都已有官方机构或建筑师来源与 Commons 图片候选：

- CASE-018 Kanazawa Umimirai Library
- CASE-021 Toyama Kirari
- CASE-022 Minna no Mori Gifu Media Cosmos
- CASE-023 Nakanoshima Children's Book Forest
- CASE-027 Yusuhara Community Library / Yururi Yusuhara
- CASE-029 Musashino Place
- CASE-042 Nasushiobara City Library Miruru
- CASE-070 Tonami Public Library

8 条建筑身份全部获准进入迁移准备；用途全部包含 `library`，其中 Toyama Kirari 同时属于 `museum` 与 `mixed-use`，五条复合公共设施另有 `community-center` 或 `mixed-use`。详细字段、证据 URL 与逐图结论见 `db/review-decisions/graduation-new-buildings-library-001.json`。

## 图片检查结果

逐张打开本地图片，并用 Commons API 复核当前文件描述、摄影者和许可。6 张原图继续使用，2 张替换：

- CASE-027：旧图确实是梼原图书馆，但画面横置且只拍入口天花，不适合主图；换成同一作者 Asset utilitist 的清晰木构室内图，CC0。
- CASE-070：旧图是砺波市表町旧馆，和 2020 年幸町新馆不是同一建筑；换成 Whatsfb 拍摄的新馆图，Commons 描述明确记录 2020-11-01 移转开馆，CC BY-SA 4.0。

新图均与建筑师官方页面可见的空间或外形一致。旧图没有作为新主体图片进入任何迁移。

## 自动复核

`scripts/audit-graduation-new-building-library-001.mjs` 的实时结果：

- 8 个 CASE；
- 12 个官方证据 URL，0 failure；
- 8 个 Commons 文件，0 missing；
- 作者与许可比对，0 mismatch。

输出保存在 `docs/reports/graduation-new-building-library-001-live-audit.json`。生产迁移前已再次运行，结果仍为 12 个来源 URL 0 failure、8 个 Commons 文件 0 metadata mismatch。

## 生产迁移状态

8 个主体和 4 个当前缺失建筑师实体的 guarded migration、rollback 与 PGlite dry-run 均已通过；生产迁移 `graduation_library_batch_001`（`20260711201728`）已执行。写后核验得到 4 个新建筑师、8 个主体、8 张主图、8 个 published profile、17 个 approved assignment，所有孤儿、建筑师映射错误和重复主图/主用途均为 0。主体 schema 仍只支持一个 architect，因此迁移以 MIKAMI Architects 为主关系，同时保留 graduation profile 中 CASE-070 的共同设计字符串，不能丢掉押田建筑设计事务所的参与信息。

## 图片修正发布

PR #17 合并为 `88655f3a1808bab04871b6927522e15059874bef`；Reviewed production release run `29166038170` 成功。线上 CASE-027 与 CASE-070 均返回 HTTP 200；两张线上图片的 SHA-1 与审核后的仓库文件完全一致，公开 JSON 也返回新的作者、许可、作品页和纠错说明。

PR #18 合并迁移包；PR #19 更新 29 个 unified profile 的生产回归基线。Reviewed production release run `29167078871` 成功；线上 8 个 CASE 页面和 8 个主体建筑页全部返回 HTTP 200。完整写入和验收证据见 `GRADUATION_LIBRARY_BATCH_001_PRODUCTION.md`。
