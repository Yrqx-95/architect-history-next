# G6 MIYASHITA PARK batch 005 审核记录

日期：2026-07-12

## 结论

- `CASE-040 MIYASHITA PARK` 的建筑身份、2020 年份、东京涩谷地点、联合设计角色和 mixed-use 用途通过。
- 现图虽然为 Syced 自有作品、CC0，但主体是 Tower Records 和铁路，仅为“从宫下公园看到的景观”，不批准继续使用。
- 新图 `Miyashita Park 2025 May 26 various 01.jpg` 为 Nesnad 自有作品、4032×3024、CC BY 4.0；人工确认展示项目本体、屋顶绿化和标识。
- 本批批准进入图片替换准备，但在新图本地化和 QA 前不生成 migration。

## 身份与用途

Nikken Sekkei 官方页确认 MIYASHITA PARK 是 2020 年完成的 PPP 复合设施：重建公共公园和停车场，同时加入四层零售和十八层酒店。broad type 为 `mixed-use`；functions 为 `mixed-use` primary、`retail` 与 `public-space` secondary。

官方角色不能简化：Takenaka Corporation 是 lead architect；Nikken Sekkei 是 project architect。现有单 architect_id 模型需使用可追溯联合实体 `Takenaka Corporation + Nikken Sekkei`，并保留两者角色证据。

## 生产只读预检

- Takenaka 与 Nikken 独立 architect 均存在。
- 联合 architect：0。
- target building/profile conflict：0。
- required functions：3/3。
- required mixed-use type：1/1。

## 队列影响

- 本批正式审核 1 条，批准在图片替换后进入 migration 准备。
- G6 已迁移仍为 54/118；尚未正式审核队列从 41 减至 40。
