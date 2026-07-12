# G6 Shimokitazawa retail / mixed-use batch 001 审核记录

日期：2026-07-12

## 结论

- 批次覆盖 CASE-038 BONUS TRACK Shimokitazawa 与 CASE-039 MIKAN SHIMOKITA；两条是下北泽地区两个不同地点、不同设计团队、不同年份的建成项目，不得合并为一栋建筑。
- 两条的建筑身份、地点、年份、设计责任、用途、图片内容、作者和开放许可均通过，可进入 taxonomy 与 migration 准备；本记录不授权生产写入。
- 生产只读查重：两个目标 building、两个 architect slug、两个 CASE profile 均无冲突；`commercial` broad building type 已存在。
- BONUS TRACK 现有 550×369 图片内容准确，但只是论文 Figure 3 的低清缩图；已取得并人工核对 2340×1568 原始 figure，migration 前必须替换。
- 现有细用途没有零售/商业设施。只用 `mixed-use` 会丢失两条案例最重要的购物街、商店群与商业设施搜索意图，因此先新增 `retail` function。

## CASE-038 BONUS TRACK Shimokitazawa

- TSUBAME ARCHITECTS 官方页把项目定义为支持个人开设小店、延续下北泽街区性格的新商店街，记录完成时间为 2020 年 4 月。
- DOI `10.3390/su17177583` 对应 Hiroki Nakajima 的 Shimokitazawa 研究。Crossref 与 MDPI JATS 均确认 Version of Record 为 CC BY 4.0。
- JATS Figure 3 图注明确为 `Bonus Track (photo by morinakayasuaki)`，没有第三方材料排除声明。
- MDPI 静态资源中的 Figure 3 TIFF 为 2340×1568；人工查看与现有 550×369 本地图完全一致，清楚展示灰色低层店铺、共享庭院、绿化、桌椅与实际使用状态。
- 建议 canonical building 使用 `commercial` broad type；functions 为 `retail` primary、`mixed-use` 和 `public-space` secondary。

## CASE-039 MIKAN SHIMOKITA

- Taiju Yamashita Design and Architecture 官方页确认项目 2022 年开放，位于下北泽站京王井之头线高架下，是包含零售、共享办公和街区文化用途的 shopping complex。
- Commons 文件说明为“商业设施ミカン下北”；人工查看可见连续彩色商铺立面、步行通道和高架结构，主体准确。
- MediaWiki API 返回 Souka Kinmei 自有作品、2800×1572、CC0。
- 建议 canonical building 使用 `commercial` broad type；functions 为 `retail` primary、`mixed-use` secondary。

## 用途词表缺口

迁移前新增：

- slug：`retail`
- broad type：`commercial`
- 核心名称：零售商业／零售商業、Retail、商業施設
- 别名应覆盖商业设施／商業施設、商场／商場、商业街／商業街、购物综合体／購物綜合體、retail complex、shopping complex、shopping street、小売施設、商店街、店舗群。
- 不加入过度泛化的 `shop`、`store`、店、店舗单词，避免室内单店和非建筑查询误命中。

## 下一步

先通过 PR 固化本批只读决策。随后用已审核 MDPI Figure 3 替换 BONUS TRACK 低清本地图，并为 `retail` 建立四语 taxonomy、alias 冲突预检、guarded rollback 与隔离 PostgreSQL dry-run。上述步骤完成前不允许生产写入。
