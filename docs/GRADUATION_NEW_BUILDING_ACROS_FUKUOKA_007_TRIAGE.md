# G6 ACROS Fukuoka batch 007 审核记录

日期：2026-07-13

## 结论

- `CASE-016 ACROS Fukuoka` 的建筑身份、1995 年、福冈市中央区天神 1-1-1、公民复合设施属性和现有图片均通过只读审核。
- 当前公开记录把建筑师简化为 `Emilio Ambasz`，不批准直接继承。ACROS 官方建筑概要明确区分：基本构想为日本设计、竹中工务店、Emilio Ambasz；正式设计为日本设计、竹中工务店。
- canonical architect 应建立可追溯联合实体 `Nihon Sekkei + Takenaka Corporation`。Emilio Ambasz 必须在 building 的来源说明中保留为 basic concept contributor，但不应与正式设计者无差别并入单一 architect 字段。
- 生产可复用既有 `takenaka-corporation`；`Nihon Sekkei` 与目标联合实体均不存在。目标 building/profile conflict 为 0。
- 本批批准进入 migration 准备，但尚未生成 migration、修改公开 CASE 数据或写入生产。

## 身份与设计角色证据

- ACROS Fukuoka 官方说明确认设施于 1995-04-29 开放，是旧福冈县厅旧址上的“国际、文化、信息交流据点”公民复合设施。
- 官方建筑概要确认地址、1992-01 至 1995-03 施工期、地上 14 层/地下 4 层及 97,493 m² 延床面积。
- 官方角色表与竹中工务店项目页一致：
  - 基本构想：日本设计、竹中工务店、Emilio Ambasz。
  - 设计：日本设计、竹中工务店。
  - 监理：日本设计。
  - 施工：竹中工务店等共同企业体。
- 因统一模型当前只有一个 `architect_id`，联合实体只表达正式设计责任；基本构想角色另存于可追溯文字与来源，避免把概念贡献误写成完整建筑设计归属。

## 图片审核

- Commons 文件：`ACROS_Fukuoka_2011.jpg`。
- 摄影者：Kenta Mabuchi；来源：Flickr；拍摄日期：2011-07-10。
- 原始尺寸：2426×1625；许可：CC BY-SA 2.0；Commons FlickreviewR 于 2013-02-26 确认 Flickr 许可。
- 仓库文件：`public/images/graduation/cases/case-016-acros-fukuoka.jpg`，1600×1071，SHA-256 `727d509be398b9d841055476dbd0c6ca9e59c637e0a6df37fe84f1cb8345666b`。
- 已人工查看本地文件：画面准确展示 ACROS Fukuoka 建筑本体、阶梯绿化立面和玻璃中庭，不是邻近建筑或仅有远景背景；可继续使用。

## 用途决定

- broad type：`mixed-use`。
- functions：`mixed-use` primary；`theatre`、`retail`、`public-space` secondary。
- 依据：官方明确列出交响音乐厅、活动厅、国际会议、商店、餐厅、办公室、展览与文化旅游信息设施；Step Garden 是建筑核心公共绿化空间。
- 不使用 `community-center`：官方的“公民复合设施”描述的是公私复合与文化交流据点，不足以把它缩窄成现有 taxonomy 中的社区中心。
- 当前 taxonomy 没有 office function；本批不为单一案例临时创造用途，也不让这个缺口阻塞已经准确表达核心检索意图的 mixed-use/theatre/retail/public-space 组合。

## 生产只读预检

- 既有 `takenaka-corporation` architect：1。
- 既有 `Nihon Sekkei` architect：0。
- 既有 `Emilio Ambasz` architect：0；本批不需要为 basic concept 角色创建该实体。
- 目标 `acros-fukuoka` / 名称冲突：0。
- CASE-016 profile conflict：0。
- required functions：4/4 active。
- required broad type：1/1。

## 来源

- ACROS Fukuoka 官方设施与建筑概要：https://www.acros.or.jp/r_facilities/about.html
- ACROS Fukuoka English building outline：https://acros.or.jp/english/floor/buildingoutline.html
- 竹中工务店项目页：https://www.takenaka.co.jp/majorworks/60200891995.html
- Wikimedia Commons 文件页：https://commons.wikimedia.org/wiki/File:ACROS_Fukuoka_2011.jpg

## 队列影响与下一门槛

- 本批正式审核 1 条；G6 已迁移仍为 56/118，尚未迁移 62；尚未正式审核队列从 39 减至 38。
- 下一步先通过 PR 固化本审核决策；随后才可同步 CASE-016 compatibility architect、生成联合 architect/building/image/profile/4 assignments 的 guarded migration 与 rollback，并运行全历史隔离 PostgreSQL dry-run。
- 生产写入前必须再次执行相同冲突预检；任何角色、图片或用途断言发生漂移都应暂停。
