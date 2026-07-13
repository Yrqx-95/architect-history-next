# G6 Roadside Station Mashiko batch 010 审核记录

日期：2026-07-13

## 结论

- `CASE-043 Roadside Station Mashiko` 的身份、设计者、2016 年、地点、用途和图片均通过只读审核。
- broad type：`transportation`。
- functions：`transport-hub` primary、`retail` secondary。
- 不添加 `community-center` 或 `public-space`：现有一手证据只足以确认道之驿、停车、餐饮、物产销售和信息服务。
- 本批批准进入 migration dry-run；尚未生成 migration 或写入生产。

## 身份与图片

- MOUNT FUJI ARCHITECTS STUDIO 官方项目资料：栃木、2016、主要用途为道之驿、地上一层、延床 1,328.84 m²，施工期至 2016 年 9 月。
- 道之驿官方与关东道之驿资料确认地址为栃木县芳贺郡益子町长堤 2271，并包含停车、餐厅和物产销售。
- Commons 图片为アラツク own work，4522×1129，CC BY-SA 4.0。
- 仓库文件为 1600×399，SHA-256 `1c394fdd6f0b128d69f7a2153ac84c10bde48c25b2a87ac65372922a686a4e53`；人工确认准确展示主体、连续屋顶和“道の駅ましこ”标识。

## 生产只读预检

- architect / building / image / CASE-043 profile conflicts：全部 0。
- required functions：2/2 active。
- required `transportation` type：1/1。

## 下一步

- 正式未审核队列从 36 减至 35；G6 已迁移仍为 59/118。
- 通过 PR 固化本决策后，生成 1 architect / 1 building / 1 image / 1 profile / 2 assignments 的 guarded migration 与 rollback，并执行全历史隔离 PostgreSQL dry-run。
