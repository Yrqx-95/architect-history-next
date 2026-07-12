# G6 social-care / community-support batch 001 审核

日期：2026-07-12

## 结论

审核 8 个 CASE，识别出 6 个真实唯一建筑项目、1 个非建筑级服务模式、1 对重复 CASE。没有项目同时通过图片内容与开放许可要求，因此本批不生成 building migration。

| CASE | 身份结论 | 图片与版权 | 决策 |
| --- | --- | --- | --- |
| CASE-001 | GOI 确认 Share Kanazawa，2014-03 竣工 | Commons/Openverse 精确 0；其他金泽建筑图已排除 | `no_safe_image_yet` |
| CASE-011 | “富山型日间照护”是从 1993 年起推广的服务模式，不是唯一建筑 | 不存在可对应这一复数模式的单一建筑图 | `not_a_single_building` |
| CASE-024 | 与 CASE-065 是同一 AU Childcare Support | 官方图无开放许可；Commons/Openverse 精确 0 | duplicate + `no_safe_image_yet` |
| CASE-026 | TD Atelier 确认 2019–2020 新宫市旧服装店改造 | 官方摄影 Matsumura Kohei；Commons/Openverse 精确 0 | `no_safe_image_yet` |
| CASE-065 | 与 CASE-024 是同一建筑、不同毕业分析 | 同上 | duplicate + `no_safe_image_yet` |
| CASE-086 | YKDW 确认八千代老人日间照护中心 | 官方摄影 Naoomi Kurozumi；Commons/Openverse 精确 0 | `no_safe_image_yet` |
| CASE-087 | UNEMORI + teco 确认 2021 北上保健育儿复合设施改造 | 官方摄影 Kai Nakamura；Commons/Openverse 精确 0 | `no_safe_image_yet` |
| CASE-097 | Sharon Davis Design 确认 2013 Kayonza 女性机会中心 | 官方摄影 Elizabeth Felicella / Iwan Baan；Openverse 唯一图为 CC BY-NC-ND，拒绝 | `no_safe_image_yet` |

## 新发现的结构缺口

CASE-024 与 CASE-065 拥有相同项目名称、地点、建筑师和来源 URL，但概念与关键词不同。它们应当是：

- 一个 canonical building；
- 两个保留原地址的 graduation profiles；
- 两套各自独立的毕业分析。

当前 `graduation_case_profiles.building_id UNIQUE` 无法表达这一关系。删除其中一个 CASE、把两份分析静默拼接、或创建两栋假建筑都不符合统一数据源目标。正确修复是保留 `case_id` 唯一，移除 `building_id` 唯一约束并改为普通索引，使多个 CASE profile 可引用同一建筑。

## 安全边界

- 本批没有下载、替换或删除图片。
- 官方网页上的摄影者署名只证明权利归属，不等于开放许可。
- CC BY-NC-ND 不进入可复用图库。
- 下一步先以独立 schema migration 修复“一栋建筑可对应多个毕业分析”，完成 rollback、dry-run、RLS 与双轨读取回归后再继续 G6。
