# 图书馆用途首批审核（library-001）

审核日期：2026-07-12

状态：20 条全部完成用途审核；未写入生产数据库

## 结论

- library 候选：20
- `approved library`：20
- `rejected` / `needs-research`：0
- 同时批准 museum：3
- 主体元数据 warning：5
- 证据链接可访问：20 / 20

名称只用于发现候选，批准依据来自 16 个 Wikidata `instance of` 关系和 4 个官方机构或建筑师基金会页面。用途批准不会自动改写主体名称、国家、年份或一级类型。

## 审核结果

| Building | Approved functions | Evidence | Metadata follow-up |
|---|---|---|---|
| atlanta-fulton-county-central-library | library | [Wikidata Q105751960](https://www.wikidata.org/wiki/Q105751960) | — |
| beinecke-rare-book-manuscript-library | library | [Wikidata Q814779](https://www.wikidata.org/wiki/Q814779) | — |
| biblioteca-comunale-centrale-antonio-tiraboschi | library | [Wikidata Q3639566](https://www.wikidata.org/wiki/Q3639566) | country CH→IT；年份需区分机构与建筑 |
| biblioteca-municipal-de-viana-do | library | [Wikidata Q17318051](https://www.wikidata.org/wiki/Q17318051) | — |
| c-v-starr-east-asian | library | [Wikidata Q118903541](https://www.wikidata.org/wiki/Q118903541) | — |
| central-library-des-moines | library | [Wikidata Q66042452](https://www.wikidata.org/wiki/Q66042452) | — |
| dortmund-city-and-state-library | library | [Dortmund official](https://www.dortmund.de/themen/bildung/stadt-und-landesbibliothek/) | country NL→DE |
| grosse-pointe-public-library-central | library | [Wikidata Q106900422](https://www.wikidata.org/wiki/Q106900422) | — |
| hill-museum-manuscript-library | library + museum | [Wikidata Q5762205](https://www.wikidata.org/wiki/Q5762205) | — |
| laurentian-library | library | [Biblioteca Medicea Laurenziana](https://www.bmlonline.it/) | — |
| library-of-the-university-of | library | [Wikidata Q3755932](https://www.wikidata.org/wiki/Q3755932) | 年份 1986 / 2009 需区分；缺一级类型 |
| lyndon-baines-johnson-library-and | library + museum | [LBJ Library official](https://www.lbjlibrary.org/) | country MX→US |
| musashino-art-museum | library + museum | [MAU Museum & Library](https://mauml.musabi.ac.jp/en/) | 英文名缺少 Museum |
| new-york-public-library-for | library | [Wikidata Q7013890](https://www.wikidata.org/wiki/Q7013890) | — |
| niagara-falls-public-library | library | [Wikidata Q65068973](https://www.wikidata.org/wiki/Q65068973) | — |
| r-dovre-library | library | [Wikidata Q21098720](https://www.wikidata.org/wiki/Q21098720) | — |
| rovaniemi-city-library | library | [Wikidata Q10547804](https://www.wikidata.org/wiki/Q10547804) | — |
| schocken-library | library | [Wikidata Q6756158](https://www.wikidata.org/wiki/Q6756158) | — |
| seattle-central-library | library | [Seattle Public Library](https://www.spl.org/hours-and-locations/central-library) | — |
| vyborg-library | library | [Alvar Aalto Foundation](https://www.alvaraalto.fi/en/architecture/alvar-aalto-library/) | — |

## 四语一致性

以下查询全部解析为标准用途 `library`，再读取同一组 20 个 approved building slugs：

- zh：`图书馆`
- zh-Hant：`圖書館`
- en：`library`
- ja：`図書館`

单元测试不会分别维护四份结果；它先通过 alias resolver 得到同一个 function slug，再按批准关系取集合，从结构上避免四语结果漂移。

## 多用途验证

Hill Museum & Manuscript Library、LBJ Library and Museum、Musashino Art University Museum & Library 的来源都明确支持 `library + museum`。这三条证明 `building_function_assignments` 必须是多对多关系，不能用单一 `type_slug` 覆盖或互相排斥。

## 留给 G5

G5 只会把本决策文件中的批准关系转成 guarded migration，并先完成 dry-run、UUID/slug 对照、行数断言、回滚和 anon 只读测试。本文件发现的主体元数据 warning 必须走独立纠错批次，不与用途关系写入混合。
