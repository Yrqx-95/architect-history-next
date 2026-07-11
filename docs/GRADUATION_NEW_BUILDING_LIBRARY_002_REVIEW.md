# G6 New Building Review — Library Batch 002

日期：2026-07-12

范围：`graduation-new-building-queue-001` 中 15 个 `library-next` 案例

状态：14 条完成事实、用途、图片与版权审核；CASE-079 保留为 `no_safe_image_yet`

## 审核决定

| CASE | 规范主体 | 年份 / 城市 | 主要责任方 | 细粒度用途 | 结论 |
|---|---|---|---|---|---|
| CASE-036 | Tama Art University Hachioji Library | 2007 / Hachioji | Toyo Ito and Associates | library, university | 通过 |
| CASE-076 | Kozakai Kifukan Community Center | 2021 / Toyokawa | CAn Yasuyuki Ito / Coelacanth and Associates | library, community-center, mixed-use | 通过 |
| CASE-079 | Ebina City Arima Library and Community Center Renovation | 2021 / Ebina | MIKAMI Architects | library, community-center | 暂缓；2015 图只能作为改造前历史上下文 |
| CASE-081 | Sukagawa Community Center tette | 2018 / Sukagawa | Ishimoto Architectural & Engineering Firm + UNEMORI ARCHITECTS | library, community-center, mixed-use | 通过；年份从 2019 纠正为 2018 |
| CASE-092 | Ishikawa Prefectural Library | 2022 / Kanazawa | Mitsuru Senda / Environment Design Institute | library, community-center | 通过 |
| CASE-095 | Nakajima Library, Akita International University | 2008 / Akita | Mitsuru Senda | library, university | 通过 |
| CASE-098 | Helsinki Central Library Oodi | 2018 / Helsinki | ALA Architects | library, community-center, mixed-use | 通过；现图可用，构图优化留作非阻断后续 |
| CASE-101 | Dokk1 | 2015 / Aarhus | Schmidt Hammer Lassen | library, community-center, mixed-use | 通过；补 Villy Fink Isaksen 署名 |
| CASE-105 | Deichman Bjørvika | 2020 / Oslo | Lundhagem + Atelier Oslo | library | 通过 |
| CASE-112 | Peckham Library | 2000 / London | Alsop and Störmer | library, community-center | 通过；替换已 404 的 RIBA 链接 |
| CASE-113 | Bibliotheca Alexandrina | 2002 / Alexandria | Snøhetta | library, museum, mixed-use | 通过；替换为完整倾斜圆盘建筑图 |
| CASE-114 | LocHal Public Library | 2019 / Tilburg | Civic Architects; Braaksma & Roos restoration; Mecanoo library interiors | library, community-center, mixed-use | 通过；拆分事务所责任 |
| CASE-115 | Idea Store Whitechapel | 2005 / London | Adjaye Associates | library, community-center, mixed-use | 通过 |
| CASE-130 | Book Mountain | 2012 / Spijkenisse | MVRDV | library, community-center, mixed-use | 通过；替换高清内景与准确授权 |
| CASE-137 | Library of Birmingham | 2013 / Birmingham | Mecanoo | library, theatre, mixed-use | 通过；替换失效文件 |

## 图片与版权

- CASE-113：`BA outside view.jpg`，1024×768，Mahmoud Saaid，CC BY 2.5。画面展示图书馆完整的倾斜圆盘屋面；排除了画面主体其实是会议中心和天文馆的备选图。
- CASE-130：`Boekenberg DSCF1911.JPG`，2816×2112，G.Lanting，CC BY-SA 3.0。画面清楚展示连续的阶梯式书山与玻璃屋面。
- CASE-137：`Exterior Library of Birmingham England.jpg`，8192×6144，Fatih Renkligil，CC BY-SA 4.0。画面完整显示 Mecanoo 的金色体量和金属环幕墙。
- CASE-101：`Dokk1 version 3.jpg`，Villy Fink Isaksen，CC BY-SA 4.0。原数据只写 Wikimedia Commons，不满足署名要求，已更正。
- CASE-079：目前只找到 2015 年改造前影像。不把“地点相同”当作“项目影像正确”，不进入本批数据库迁移。

## 一手事实核对

- 多摩美术大学确认八王子图书馆由伊东丰雄设计，新馆 2007 年开馆。
- C+A 确认 Kozakai Kifukan 2021 年 3 月完成，包含图书馆、社区中心、儿童中心和市政府分支。
- UNEMORI 官网记录 tette 2018 年 8 月竣工，由石本建筑事务所与 UNEMORI 共同设计，主要用途含图书馆、终身学习、育儿和市民活动支援。
- 石川县立图书馆记录 2022 年 7 月开馆，并明确列出仙田满／环境设计研究所的设计责任。
- 国际教养大学确认中嶋记念图书馆由仙田满设计；大学报告记录图书馆棟于 2008 年 3 月竣工。
- Oodi、Dokk1、Deichman Bjørvika、Idea Store Whitechapel、Book Mountain 与 Library of Birmingham 的年份、城市、设计方和复合用途均由运营机构或设计事务所官网复核。
- Southwark Council 当前图书馆页替换失效 RIBA 链接；市政府步行资料同时记录 Peckham Library 由 Will Alsop 设计并获 2000 年 Stirling Award。
- Civic Architects 明确列出 LocHal 的主创、改造修复和图书馆室内职责，不再把合作方混写成同一设计职责。

## 下一道门

1. 用这 14 条决定生成版本化 review decision JSON。
2. 实时查询生产库中建筑、建筑师、CASE ID、图片 URL 和用途 slug 冲突。
3. 只有干跑零冲突后才生成 apply / rollback SQL；CASE-079 不得夹带进入。
