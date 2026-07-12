# G6 community / civic batch 001 审核

日期：2026-07-12

## 结论

6 条候选的建筑身份与 community / civic 用途都能由市政府、机构或建筑师来源确认，但只有 CASE-096 同时满足准确建筑图片、作者和开放许可要求。CASE-019 的现图明确是另一座国分寺市役所；CASE-064/067/069/088 的官方照片均标明摄影者版权，Commons 与 Openverse 未找到准确开放替代图。因此本批仅批准 CASE-096 进入 guarded migration 准备，其余 5 条保持 `no_safe_image_yet`。

## 逐条结论

| CASE | 身份与用途 | 图片与版权 | 决策 |
| --- | --- | --- | --- |
| CASE-019 | 国分寺市确认 cocobunji WEST 5F 的市民文化与活动设施，2018-04-01 开馆 | 当前 Hykw-a4 / CC BY-SA 3.0 图片拍摄于 2005 年，内容是旧国分寺市役所；精确 Commons/Openverse 0 命中 | `no_safe_image_yet`，未来修正年份为 2018 |
| CASE-064 | KKAA 确认 2000 年新潟 Takayanagi Community Center，Civic | 官方图 © Mitsumasa Fujitsuka；精确 Commons/Openverse 0 命中 | `no_safe_image_yet` |
| CASE-067 | KKAA 确认 2024-01 完成，Community / Civic / Educational / Cultural 复合 | 官方图 © Kawasumi-Kobayashi Kenji Photograph Office；精确 Commons/Openverse 0 命中 | `no_safe_image_yet` |
| CASE-069 | KKAA 确认 2009-05 完成，是 museum + community center 复合 | 当前 2012 年错误；官方图 © Takeshi Yamagishi；精确 Commons/Openverse 0 命中 | `no_safe_image_yet`，未来修正年份为 2009 |
| CASE-088 | 十和田市与 KKAA 确认隈研吾设计、2014-10 开馆的市民交流设施 | 官方图 © Kenta Hasegawa；Commons 唯一英文命中是无关高速交流道，Openverse 0 命中 | `no_safe_image_yet` |
| CASE-096 | JACCC 与 LA Conservancy 确认 1978–1983 建成的中心建筑、Noguchi 广场与剧场 | Another Believer，CC BY-SA 4.0；人工审片确认中心建筑、砖广场和 Noguchi 玄武岩雕塑 | 批准 |

## CASE-096 多用途决策

- 主用途：`community-center`。
- 次用途：`theatre`、`mixed-use`。
- 规范建筑名：Japanese American Cultural & Community Center / 日米文化会館。
- 建筑责任：Kazumi Adachi、Kiyoshi Sawano、Hideo Matsunaga 负责 Center Building；Isamu Noguchi 负责广场。首批主体关系用联合 architect 实体保留完整责任，不把广场作者误写成整栋楼的唯一建筑师。

## 安全边界

- Commons API 限频属于 `lookup-error`，没有被写成无图结论；限频恢复后才完成 CASE-096 元数据核验。
- 5 条 `no_safe_image_yet` 都有独立的精确 Commons 搜索与 Openverse 0 结果，或明确的无关命中排除。
- 本文件和决策 JSON 不授权生产写入。下一步只能为 CASE-096 准备 apply、rollback 与全历史 dry-run。
