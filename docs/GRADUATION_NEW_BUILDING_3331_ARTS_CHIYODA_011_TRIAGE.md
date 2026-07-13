# G6 3331 Arts Chiyoda batch 011 审核记录

日期：2026-07-13

## 结论

- `CASE-005 3331 Arts Chiyoda` 的建筑身份、2010 年开放、东京旧练成中学校改修、改修设计责任、历史运营状态和现有图片均通过只读审核。
- canonical architect 决定为联合实体 `Shinya Sato + Mejiro Studio`，slug 为 `shinya-sato-mejiro-studio`；不能继续保留空 architect，也不能只写其中一方。
- broad type 为 `cultural`。现有用途词表没有准确表达该项目核心用途的条目，本批要求先新增窄义四语 `art-center` taxonomy。
- 本批尚未修改公开 CASE 数据、生成 migration 或写入生产；只有 taxonomy 审核、隔离 dry-run 和生产写前复查全部通过后，才允许准备建筑 migration。

## 身份、设计与历史状态

- 3331 官方资料确认该项目由旧千代田区立练成中学校改修而成，2010 年开放，是面向社区的独立 art center。
- 官方 `3331 Architectural Document` 明确写明，旧校舍改修设计由佐藤慎也＋Mejiro Studio 负责。新建筑数据库应保存准确的改修设计者，而不是运营方、艺术总监或原校舍未知设计者。
- 新建筑资料可采用 `Shinya Sato + Mejiro Studio` 作为英文 canonical 联合名称；中文为 `佐藤慎也＋目白工作室`，日文为 `佐藤慎也＋メジロスタジオ`。
- 官方资料确认 3331 Arts Chiyoda 已于 2023 年闭馆；后续 `3331` 活动体仍持续，但不能把旧校舍内的该设施描述为仍在运营。
- 官方页面对具体闭馆日存在 3 月 15 日与 3 月 31 日两种表述，因此 canonical 建筑资料只记录“2023 年闭馆”，不在未消解前写死具体日期。

## 用途决定

- broad type：`cultural`。
- 待新增 primary function：`art-center`。
- 建议四语名称：简体中文“艺术中心”、繁体中文“藝術中心”、英文“Art Center”、日文“アートセンター”。
- 建议只纳入窄义 aliases：`艺术中心`、`藝術中心`、`art center`、`arts center`、`art centre`、`arts centre`、`アートセンター`、`芸術センター`。
- 不把 `cultural center` / `文化中心` / `文化センター` 作为同义词：其范围明显更广，会把文化会馆、市民馆和综合表演设施错误合并进同一搜索意图。
- 不批准 `museum`：3331 官方自称独立 art center，承担展览、制作、工作室、活动和社区开放，不是以收藏、保存和博物馆制度为核心。
- 不批准 `mixed-use`：多种运营内容共同服务于同一艺术中心，不应以宽泛复合用途掩盖核心用途。
- 不单独批准 `community-center`、`retail` 或 `public-space`：社区空间、咖啡和商店是明确存在的附属内容，但不足以成为本批 canonical function assignment。

## 图片审核

- Commons 文件：`3331_Arts_Chiyoda.JPG`。
- 摄影者：Ootahara；来源：own work；拍摄日期：2011-09-07。
- 原始尺寸：4608×3440；原始文件 4,195,729 bytes；许可：CC0 1.0。
- 仓库文件：`public/images/graduation/cases/case-005-3331-arts-chiyoda.jpg`，1600×1194，SHA-256 `3a4fad3c48d68feeab9570b25243c8662d2981e4c0b5dc576779698159ed1bb2`。
- 已人工查看本地文件：画面准确展示旧校舍正立面、3331 入口标识和前庭，不是无关建筑、室内局部或运营活动替代图；可继续使用。

## 生产只读预检

- `shinya-sato-mejiro-studio`、`Shinya Sato` 或 `Mejiro` architect matches：0。
- `3331-arts-chiyoda` / 3331 Arts Chiyoda building conflicts：0。
- CASE-005 profile conflict：0。
- 本地图路径或 Commons source image conflict：0。
- `art-center` function：0；相关四语 alias conflict：0。
- required `cultural` broad type：1/1。

## 来源

- 3331 官方 About：https://www.3331.jp/en/about/
- 3331 官方 Architectural Document：https://www.3331.jp/schedule/000361.html
- 3331 现行活动体说明：https://www.3331.jp/index.html
- 千代田区历史设施说明：https://www.city.chiyoda.lg.jp/koho/bunka/bunka/bunkashisetsu/artsquare-katsudo.html
- Wikimedia Commons：https://commons.wikimedia.org/wiki/File:3331_Arts_Chiyoda.JPG

## 队列影响与下一门槛

- 本批正式审核 1 条；G6 已迁移仍为 60/118，尚未迁移 58；尚未正式审核队列从 35 减至 34。
- 下一步先通过 PR 固化本审核；随后单独建立 `art-center` 四语 taxonomy 的 guarded apply、rollback 和隔离 PostgreSQL dry-run。
- taxonomy 完成生产迁移与验收后，才同步 CASE-005 compatibility architect，并生成 1 joint architect / 1 building / 1 primary image / 1 profile / 1 `art-center` primary assignment 的 migration pack。
- 生产写入前必须重复冲突预检；任何身份、图片、许可或 taxonomy alias 冲突都应暂停。
