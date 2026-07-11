# G6 New Building Review — Library Batch 002 Triage

日期：2026-07-12  
范围：`graduation-new-building-queue-001` 中 15 个 `library-next` 案例  
状态：初筛已转入正式审核；14 条通过，CASE-079 保留为 `no_safe_image_yet`

## 初筛结论

- 15 个官方来源首次实时访问：14 个 HTTP 200，CASE-112 的旧 RIBA URL 跳转后为 404。
- 15 个 Commons 作品页：12 个当前文件与声明许可直接一致；CASE-130 的真实许可为 CC BY 3.0 NL；CASE-137 原文件不存在；CASE-113 API 短暂异常，但作品页确认文件存在、作者 Ninlil、CC BY-SA 3.0。
- 14 张可取得图片全部完成人工视觉检查；没有把“许可正确”直接当成“图片正确”。
- 明确阻断 5 条：CASE-079、CASE-112、CASE-113、CASE-130、CASE-137。
- CASE-101 图片正确且是 Commons featured/quality/valued image，但当前 credit 漏掉摄影者 Villy Fink Isaksen，迁移前必须补全。

## 逐条状态

| CASE | 初筛 | 图片与版权结论 | 下一步 |
|---|---|---|---|
| CASE-036 | 可继续 | 多摩美术大学图书馆标志性拱形混凝土外观；Wiiii，CC BY-SA 4.0 | 核验官方年份、城市与 Toyo Ito 关系 |
| CASE-076 | 可继续 | Kozakai Kifukan 完整外观，清晰；Asturio Cantabrio，CC BY-SA 4.0 | 核验复合用途与 2021 完成年份 |
| CASE-079 | 阻断 | 现图拍于 2015，展示 2021 改造前的旧外观，不能代表当前改造项目 | 年份改为 2021；寻找改造后可追溯图片 |
| CASE-081 | 可继续 | tette 外观与现场标识一致；Suikotei，CC BY-SA 4.0 | 核验联合建筑师与 library/community-center 多用途 |
| CASE-092 | 可继续 | 2022 石川县立图书馆外观局部与官方建筑一致；Asturio Cantabrio，CC BY-SA 4.0 | 核验 Mitsuru Senda 的准确主体名称 |
| CASE-095 | 可继续 | 中岛图书馆木构阅读大厅，内容价值高；Mariwlqs，CC BY-SA 4.0 | 核验 2008 与建筑师归属 |
| CASE-098 | 可继续但建议优化 | Oodi 建筑正确、CC0；公交车与树遮挡较多但仍可识别 | 先完成事实审核，若有更佳同许可图再替换 |
| CASE-101 | 需修正署名 | Dokk1 完整外观，Commons featured/quality/valued image；CC BY-SA 4.0 | credit 改为 Villy Fink Isaksen / Wikimedia Commons |
| CASE-105 | 可继续 | Deichman Bjørvika 当前馆舍外观；charlotte henard，CC BY-SA 2.0 | 核验 Lundhagem + Atelier Oslo 联合关系 |
| CASE-112 | 阻断 | Peckham Library 图片正确；Mcginnly，CC BY-SA 3.0；旧 RIBA 来源 404 | 更换可访问的一手建筑/机构来源，不用搜索摘要代替 |
| CASE-113 | 阻断 | 建筑正确但只有 519×692，且仅为文字墙局部；Ninlil，CC BY-SA 3.0 | 换成清晰、完整、可追溯的馆舍主图 |
| CASE-114 | 可继续 | LocHal 改造后外观与工业厂房特征一致；OlafJanssen，CC BY-SA 4.0 | 核验 Civic + Braaksma & Roos + Mecanoo 关系 |
| CASE-115 | 可继续 | Idea Store Whitechapel 彩色立面正确；Mcginnly，CC BY-SA 3.0 | 核验 2005 与 Adjaye Associates |
| CASE-130 | 阻断 | Book Mountain 内景正确但只有 470×470；当前“See image source”不合格，真实许可 CC BY 3.0 NL | 优先换高分辨率图；否则补 Centrum Hout 与准确许可 |
| CASE-137 | 阻断 | `Library of Birmingham 2013.jpg` 当前不存在，无法审片 | 换成可用的 Commons 外观图并重新核验作者、许可、构图 |

## 已确认的纠错证据

CASE-079 的建筑师官网将海老名市立有马图书馆改修记为 2021 年 3 月；海老名市官方资料记录改修工期为 2020-06-19 至 2021-03-17，并于 2021-05-01 重新开放。因此当前 `year=2020` 与 2015 年旧外观图都不能进入统一主体。

CASE-101 的 Commons 作品页明确要求署名 Villy Fink Isaksen 并采用 CC BY-SA 4.0。当前只写 Wikimedia Commons 会丢失作者，必须修正。

CASE-130 的 Commons 作品页列出摄影/来源为 Centrum Hout，许可为 CC BY 3.0 NL。`See image source` 不是可发布的许可证字段。

## 下一步

1. 为 CASE-079/113/130/137 搜索并逐张审核替代图片。
2. 为 CASE-112 更换可访问的一手来源。
3. 对其余 10 条核验规范名称、建筑师、年份、城市、国家和多用途关系。
4. 全部通过后才生成 `graduation-new-buildings-library-002.json` 决策文件；在此之前不生成 apply SQL。

## 后续结果

上述图片替换、版权署名、年份、来源与设计责任均已完成复核。正式结论见 `GRADUATION_NEW_BUILDING_LIBRARY_002_REVIEW.md`。
