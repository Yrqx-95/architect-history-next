# Content Trust Batch 001 — Formal Review

日期：2026-07-13  
状态：已完成只读调查与正式分流；未授权数据库写入  
范围：Top 50 队列中首批 8 条非毕业设计关联建筑

## 结论

- 4 条可进入内容准备：`apple-park`、`fallingwater`、`marsk-tower`、`reinhard-ernst-museum`。
- 4 条必须先完成身份、字段或图片纠正：`parc1`、`3-world-trade-center`、`l-arbre-blanc`、`national-museum-of-western-art`。
- 0 条获准写入生产数据库；本批次没有 SQL、migration、图片下载或部署。
- 已明确拒绝两张主图：`parc1` 当前图是当山铁路桥与远景天际线；`3-world-trade-center` 当前图是宽泛的下曼哈顿天际线，主体不明确。

## 正式分流

| 建筑 | 决策 | 核心原因 | 下一步 |
|---|---|---|---|
| Parc.1 | 先修元数据与主图 | RSHP 官方页确认首尔 mixed-use；当前主图不是主体建筑 | 补 Seoul / South Korea / mixed-use / official URL，另找开放许可主体图 |
| L'Arbre Blanc | 先定联合署名模型 | 官方来源明确是 Sou Fujimoto、Nicolas Laisné 与 OXO 协作 | 不得继续显示为藤本壮介单独设计；先决定多建筑师表达方式 |
| 3 World Trade Center | 先修元数据与主图 | WTC 官方页确认 RSHP、纽约、office、2018；当前图主体不明确 | 补城市、国家、类型、官方来源，另找主体图 |
| Museum Reinhard Ernst | 可准备内容 | 馆方与槇综合计官方来源一致，现图为可保留候选 | 准备有来源的多语正文并补 Wiesbaden |
| Marsk Tower | 可准备内容 | BIG 官方项目页确认地点与身份 | 准备有来源的多语正文，写前复核 Commons 文件页 |
| Apple Park | 可准备内容 | Foster + Partners 与 Apple 官方来源一致 | 修复 `significance.en` 中的中文占位并补来源 |
| National Museum of Western Art | 先修 canonical architect | 馆方明确主楼设计者为 Le Corbusier，前川国男等为监理 | 改为现有 `le-corbusier`；保留监理语境；重新审图 |
| Fallingwater | 可准备内容 | Fallingwater 官方来源确认 Wright 与项目身份 | 修复 `significance.en` 中的中文占位并补精确地点 |

## 被阻止的错误写法

1. 不把 L'Arbre Blanc 简化成单一作者。
2. 不把前川国男继续写成国立西洋美术馆 1959 主楼的 sole designer。
3. 不因图片许可完整就默认图片主体正确。
4. 不把“可准备内容”等同于“可直接写生产”。
5. 不触碰已完成的 G6–G10、51 条 evidence gap 或受保护 image-fill 批次。

## 下一道门

先处理两个不涉及多作者模型的高置信度修复包：

1. `parc1`：元数据修正 + 新图片候选审核。
2. `3-world-trade-center`：元数据修正 + 新图片候选审核。

二者都必须完成图片来源、摄影者、许可与主体一致性复核，之后才能进入隔离 PostgreSQL dry-run。`l-arbre-blanc` 与 `national-museum-of-western-art` 单独进入 attribution decision，不与普通内容补全混写。

机器可读决策：`db/review-decisions/content-trust-batch-001.json`
