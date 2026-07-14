# Architect introductory P1 data batch 001

日期：2026-07-14
状态：reviewed 决策、migration、rollback 与隔离 dry-run 已完成；生产前置检查通过；尚未写入生产

## 结论

本批处理 PR #160 审核中确认的 6 位建筑师身份/官网缺口与 7 座既有建筑的三语名称、年份、地点和官方来源。它与内容 PR 分离，不授权合并 PR #160，也不新增建筑或图片。

| 范围 | 决定 |
|---|---|
| Anna Heringer | 补中日名称与官网；METI School 补三语、Rudrapur、Bangladesh、2005 与项目页 |
| Pierre Chareau | 补中文名与 Centre Pompidou 人物页；Maison de verre 补 1928–1931、Paris 与项目页；Beauvallon 会所补 1927、Grimaud 与法国文化部页面 |
| Geoffrey Bawa | 中文统一为简体“杰弗里·巴瓦”，补 Trust 官网；Lunuganga 补 Bentota/1948，议会大厦补 Kotte/1982 与议会官方资料 |
| Tod Williams Billie Tsien Architects | 修复生产日文仅写 Billie Tsien 的不完整身份；中文保留官方品牌名；Obama Center 与 C.V. Starr Library 补 2026/2008、地点与事务所项目页 |
| Studio Mumbai | 补中日显示名与官网；不虚构关联建筑 |
| Võ Trọng Nghĩa / VTN | 中文转为简体，补官网；不虚构关联建筑 |

## 新发现的全库问题

7 座目标建筑的 `architect_id` 都是空值，但这不是本批局部损坏：生产 942 座建筑中有 856 座只有 `architect_slug`、没有 `architect_id`；69 座同时有两者，17 座两者都没有。若只给这 7 座补 UUID，会制造新的局部口径。因此本批明确不动 `architect_id`，另行评估全库关系模型是否应统一。

Studio Mumbai 与 VTN 的常见代表作在当前 942 座生产建筑中没有匹配记录。这不是可以通过补关系解决的问题；如要加入 Palmyra House、Farming Kindergarten 等，必须进入新建筑收录、来源、图片、分类和去重流程。

## 年份边界

- Maison de verre 使用 Centre Pompidou 的 realized `1928–1931`，保留开始年并补结束年。
- Lunuganga 的 `1948` 表示 Bawa 购入土地并开始长期改造，不宣称庄园在单一年份“竣工”。
- Sri Lankan Parliament 使用议会官方说明的完成年 `1982`。
- Obama Presidential Center 使用 TWBTA 的 `2026`，并由 Obama Foundation 确认 2026-06-19 对公众开放。
- 本批仍不把这些个案机械推广成全库统一 `year_start` 语义。

## 证据

- [Anna Heringer：About](https://www.anna-heringer.com/about/)
- [Anna Heringer：METI School](https://www.anna-heringer.com/projects/meti-school-bangladesh/)
- [Centre Pompidou：Maison de verre](https://www.centrepompidou.fr/fr/ressources/oeuvre/cKxjGX8)
- [法国文化部：Club-house du golf de Beauvallon](https://www.culture.gouv.fr/regions/drac-provence-alpes-cote-d-azur/politique-et-actions-culturelles/architecture-contemporaine-remarquable-en-provence-alpes-cote-d-azur/le-label-architecture-contemporaine-remarquable-en-provence-alpes-cote-d-azur/label-acr-var/grimaud/grimaud-club-house-du-golf-de-beauvallon)
- [Geoffrey Bawa Trust：Lunuganga](https://geoffreybawa.com/lunuganga)
- [Sri Lanka Parliament：Evolution of the Parliamentary System](https://www.parliament.lk/en/learn/handbook-of-parliament/evolution-of-the-parliamentary-system)
- [TWBTA：Obama Presidential Center](https://twbta.com/work/cultural/the-obama-presidential-center/)
- [Obama Foundation：Opening FAQ](https://www.obama.org/visit/grand-opening/faq/)
- [TWBTA：C.V. Starr East Asian Library](https://twbta.com/work/academic/c-v-starr-east-asian-library/)
- [Studio Mumbai](https://studiomumbai.com/)
- [VTN Architects](http://vtnarchitects.net/)

## 明确不做

- 不新增、删除或替换任何图片；
- 不新增建筑，不为 Studio Mumbai / VTN 猜测代表作关系；
- 不局部补 `architect_id`；
- 不改任何公开 slug；
- 不改 type/function 分类；
- 不把本批视为 PR #160 整体内容审核通过。

## 验证状态

- 隔离 PostgreSQL dry-run 已验证 forward migration 与精确 rollback 各执行两轮；重复 forward / rollback 均被拒绝；目标记录遭遇后续编辑时 rollback 会整批原子拒绝；无关记录、slug 与关系字段保持不变。
- 2026-07-14 生产前置检查确认 6/6 建筑师和 7/7 建筑仍与审查快照逐字段一致。
- 写前生产基线：148 architects、942 buildings、7289 images；关系形态为 856 slug-only、69 slug + id、17 unlinked、0 id-only。
- 生产 `trg_building_search` 会在 building 更新时调用 `update_building_search()`，本批名称、城市和国家更新会同步重建 `search_vector`。
- 写入仍须在本批 PR 合并后执行；写后还要复核目标字段、全库计数、关系/图片/type 不变量与线上三语页面。

## 工件

- 决策：`db/review-decisions/architect-intro-p1-data-001.json`
- migration：`supabase/migrations/20260714123500_architect_intro_p1_data_001.sql`
- rollback：`db/manual-operations/architect-intro-p1-data-001-rollback.sql`
- 隔离验证：`scripts/verify-architect-intro-p1-data-001-dry-run.mjs`
