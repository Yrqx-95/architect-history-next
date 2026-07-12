# G6 Yu no Eki Ohyu batch 008 审核记录

日期：2026-07-13

## 结论

- `CASE-033 Yu no Eki Ohyu` 的建筑身份、2018 年、秋田县鹿角市、Kengo Kuma 设计、道路休息站/地域交流设施用途和现有图片均通过只读审核。
- 该记录此前只因文字出现“open-air theater”而从 theatre 候选中排除；这不等于已经完成 canonical building 审核。本批首次形成正式 G6 建筑决策。
- 生产可复用既有 `51797239-be38-4dbd-9d7e-e413ddf3c78a` / `kengo-kuma`；目标 building/profile conflict 为 0。
- 本批批准进入 migration 准备，但尚未修改公开 CASE 数据、生成 migration 或写入生产。

## 身份与用途证据

- Kengo Kuma and Associates 官方页确认项目位于 Akita、2018 年完成、1,026 m²、单层，并归入 Commercial。
- 事务所明确描述它是为鹿角市大湯温泉设计的 community center，在同一大屋顶下组合 shop、café、open-air theater、park、footbath 和 biotope。
- 鹿角市官方页确认正式名称为“道の駅おおゆ（湯の駅おおゆ）”，地址为秋田県鹿角市十和田大湯字中谷地19番地，并提供停车、快速充电、24 小时厕所、市场、咖啡和足汤。
- `open-air theater` 是复合设施中的一个活动空间，不足以把整栋道路休息站归为 `theatre`。

## 用途决定

- broad type：`transportation`。
- functions：`transport-hub` primary；`community-center`、`retail`、`public-space` secondary。
- `transport-hub` 表达其法定道路休息站和机动车旅行节点身份；`community-center` 对应建筑师明确的地域交流设施定义；`retail` 对应商店、市场和咖啡；`public-space` 对应公园、足汤、露天活动与生态水景。
- 不增加 `theatre` assignment，避免一个附属露天活动空间压过建筑整体用途。

## 图片审核

- Commons 文件：`Roadside_Station_Oyu_20180915a.jpg`。
- 摄影者：掬茶；来源：own work；拍摄日期：2018-09-15。
- 原始尺寸：6000×3376；许可：CC BY-SA 4.0。
- 仓库文件：`public/images/graduation/cases/case-033-yu-no-eki-ohyu.jpg`，1600×900，SHA-256 `1c05cee4ba22b67887c9ba14c4640546f71a5fac1f95c0cb214ebfb7878d0a8d`。
- 已人工查看本地文件：画面准确展示道路休息站主体、连续木构大屋顶、入口和前方道路，不是邻近温泉设施或无关景观；可继续使用。

## 生产只读预检

- 既有 `kengo-kuma` architect exact match：1。
- 目标 `yu-no-eki-ohyu` / `michinoeki-oyu` / `roadside-station-oyu` 和 Oyu 名称冲突：0。
- CASE-033 profile conflict：0。
- required functions：4/4 active。
- required `transportation` broad type：1/1。

## 来源

- Kengo Kuma and Associates：https://kkaa.co.jp/en/project/yu-no-eki-ohyu/
- 鹿角市：https://www.city.kazuno.lg.jp/soshiki/kankou_koutsu/kankokoryu/gyomu/2/3/2/2002.html
- Wikimedia Commons：https://commons.wikimedia.org/wiki/File:Roadside_Station_Oyu_20180915a.jpg

## 队列影响与下一门槛

- 本批正式审核 1 条；G6 已迁移仍为 57/118，尚未迁移 61；尚未正式审核队列从 38 减至 37。
- 下一步先通过 PR 固化审核决策；随后同步 CASE-033 compatibility architect 为 canonical `Kengo Kuma`，生成 1 building / 1 primary image / 1 profile / 4 assignments 的 guarded migration 与 rollback，并运行全历史隔离 PostgreSQL dry-run。
- 生产写入前必须重复冲突预检；任何身份、图片或用途证据漂移都应暂停。
