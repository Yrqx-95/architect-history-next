# G6 Fast Batch 012 审核记录

日期：2026-07-13

## 结果

- 一次审核 7 条剩余案例，不以凑批数量降低身份、设计责任或图片标准。
- 批准进入 migration dry-run：CASE-068、CASE-077、CASE-089。
- 正式阻塞并退出未审核队列：CASE-009、CASE-017、CASE-063、CASE-071。
- 本阶段不写生产。

## 批准项

- CASE-068：2011 年 Atelier Bow-Wow＋东京工业大学塚本研究室的历史 Miyashita Park；与生产中 2020 `miyashita-park` 明确区分。`public-space` primary，CC BY 3.0 图片准确。
- CASE-077：Kono Designs 的 Pasona HQ 改造，将办公、食堂、礼堂、屋顶花园和都市农场整合。broad type `office`，`mixed-use` primary；螺钉 own work / CC BY-SA 3.0 图片准确。
- CASE-089：合作社自建的循环材料创意工作社区，公开庭院承接社会文化活动。broad type `office`，`mixed-use` primary、`public-space` secondary；nandasluijsmans / Flickr / CC BY-SA 2.0 图片准确。

## 阻塞项

- CASE-009：场馆和图片正确，但 canonical 设计责任没有可靠证据，禁止空 architect 迁移。
- CASE-017：当前图主要是历史起重机和停车区，不足以代表客运码头＋商业建筑。
- CASE-063：当前图是旧道之驿，不是 2025 隈研吾重建项目。
- CASE-071：原建筑设计者妻木赖黄和图片已确认，但 CASE 研究的是 2002 文化商业改修，改修设计责任尚未查清。

## 队列影响

- G6 已迁移仍为 61/118，尚未迁移 57。
- 尚未正式审核队列从 34 降至 27。
- 下一步将三个批准项合并生成一个 migration pack、guarded rollback 和全历史隔离 PostgreSQL dry-run；四个阻塞项不会拖住该 migration。
