# G6 New Building Review — Library Batch 001

日期：2026-07-12

状态：8 条身份与图片审核完成；未生成数据库写入

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

输出保存在 `docs/reports/graduation-new-building-library-001-live-audit.json`。这份快照只证明 2026-07-12 的来源状态；正式迁移前仍需再跑一次，避免来源或许可后来改变。

## 尚未授权的动作

本批没有生产 INSERT。下一步先为 8 个主体和 4 个当前缺失的建筑师实体生成 guarded migration、rollback 与 PGlite dry-run；还要解决主体 schema 只支持一个 architect 的限制，不能丢掉 CASE-070 的共同设计信息。
