# Architect introductory P0 data batch 001

日期：2026-07-14  
状态：生产迁移、Reviewed release 与线上验收已完成

## 结论

本批处理 PR #160 人工审核发现的三组 P0 数据问题，并补入审核中继续发现的 Town House 错图问题。它与内容 PR 分离，不授权合并 PR #160。

| 范围 | 决定 |
|---|---|
| Grafton Architects | 中文名改为“格拉夫顿建筑事务所”，补官方站点 |
| Kingston University Town House | 将 `q135641257` 规范化为正式 slug 和三语名称，补 2020、金斯顿、英国、教育建筑及官方来源 |
| Town House 图片 | 3 张 Unsplash 图均拒绝：1 张原图 404，2 张肉眼确认是其他建筑；删除并保留 `no_safe_image_yet` |
| Toulouse School of Economics | 补三语、建筑师 UUID、地点和官方来源；`2006` 改为新楼迁入/完成年 `2019`，国家码 `ES` 改为 `FR` |
| UNEMORI ARCHITECTS | `畷森` 纠正为官方写法 `畝森` |
| Book Mountain | 建筑、CASE-130 profile、3 条 function assignment 与 compatibility payload 的截断链接一起改正 |
| 旧路径 | 三种语言的 building 页面及 v1 building API 保留永久 308 跳转 |

## 年份判断

`year_start` 在现有单年份建成建筑中实际承担完成/投入使用年份。TSE 的官方资料说明新楼在 2019 年 11 月迁入；2020 年 9 月是 European Heritage Days 面向公众开放活动，不是建筑竣工。因此本批采用 2019，不采用 2020，也不保留属于学校机构历史的 2006。

## 图片判断

Town House 的生产记录目前有 3 张 Unsplash 图片：

- `e4278dee-4a40-58b2-9b40-9c8cc04075d9`：原图 URL 已返回 404；
- `e49e961b-f159-56ca-9e1b-07726ed95cf7`：画面是封闭的白色混凝土体块建筑；
- `f04ca9bc-34e1-5a43-9f48-c1c901e8ec6c`：画面是曲面金属外廊建筑。

两张可见图片都不符合 Kingston University 官方资料中 Town House 的六层混凝土柱廊、开放阳台和校园入口形象。Commons/Openverse 快速复核没有得到可确认开放许可的精确替代图，所以本批不补图。迁移删除错图；rollback 若发现后来新增了安全图片会拒绝执行，避免把错图重新带回。

## 证据

- [Pritzker 中文：2020 获奖者](https://www.pritzkerprize.com/cn/laureates/2020)
- [Grafton Architects 官网](https://www.graftonarchitects.ie/)
- [Kingston University：Town House 获 Stirling Prize](https://www.kingston.ac.uk/about/news/kingston-universitys-flagship-town-house-building-wins-2021-riba-stirling-prize)
- [TSE Building](https://www.tse-fr.eu/tse-building)
- [UNEMORI ARCHITECTS Profile](https://unemori-archi.com/?page_id=26)
- [UNEMORI ARCHITECTS Office](https://unemori-archi.com/?page_id=23)
- [MVRDV：Book Mountain](https://www.mvrdv.com/projects/126/book-mountain)

## 工件

- 决策：`db/review-decisions/architect-intro-p0-data-001.json`
- migration：`supabase/migrations/20260714103105_architect_intro_p0_data_001.sql`
- rollback：`db/manual-operations/architect-intro-p0-data-001-rollback.sql`
- 隔离验证：`scripts/verify-architect-intro-p0-data-001-dry-run.mjs`

## 验证状态

- 隔离 PostgreSQL forward / rollback：通过，两轮精确恢复
- migration replay 拒绝：通过
- rollback replay 拒绝：通过
- 新增安全图片后的 rollback 拒绝：通过，外部图片保持不变
- unit：73 files / 250 tests 通过
- typecheck / lint：通过
- production build：4446 个静态页面生成通过
- E2E：完整 24/24 通过；新增 Town House 页面/API 308 用例单独通过
- 生产只读冲突复查：通过；2 architect、3 building、3 Town House image、1 profile、3 assignment、1 compatibility 行全部与 migration 锁定快照一致，canonical slug 冲突为 0
- PR #162：已 squash merge，commit `19a94a1e458dda00746fa8d4aa62847b133e3a62`
- 生产 migration：`architect_intro_p0_data_001`，版本 `20260714112158`，已应用
- 写后数据：Grafton / UNEMORI、Town House、TSE 与 Book Mountain 全部符合 reviewed postcondition；Town House 旧 slug 和 3 张错图均为 0，Book Mountain 旧截断链接为 0
- 稳定总量：148 architects、942 buildings、88 graduation profiles；images 仅按决策从 7292 降为 7289
- RLS / policy：6 张涉及表均保持 RLS 开启且各有 1 条只读策略
- Supabase advisors：维持迁移前基线 13 security / 27 performance，本批没有新增
- Reviewed production release：run [`29328686040`](https://github.com/Yrqx-95/architect-history-next/actions/runs/29328686040) 成功，用时 10m49s
- 线上路由：三语旧 Town House slug 与旧 v1 API 均永久 308；三语新 Town House、TSE 与 Book Mountain 页面均 200
- 线上 API：Town House / TSE 返回规范 UUID、slug 与三语标题；Book Mountain 返回完整 MVRDV 官方来源；错误 Unsplash ID 不再出现

## 明确不做

- 不为 Town House 使用未确认许可或未确认建筑身份的图片；
- 不改 PR #160 的内容成熟度判断；
- 不清理 Anna Heringer、Pierre Chareau、Studio Mumbai 等 P1 缺口；
- 不把历史已执行 migration 当作可改写文件；本批通过新 migration 修正线上状态。
