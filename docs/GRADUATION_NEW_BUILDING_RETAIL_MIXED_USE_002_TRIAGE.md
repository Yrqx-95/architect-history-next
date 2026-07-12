# Graduation new-building retail / mixed-use batch 002 triage

日期：2026-07-12

## 结论

- CASE-074 Daikanyama T-SITE：通过身份、用途与图片双重门槛。
- CASE-116 Markthal Rotterdam：通过身份、用途与图片双重门槛。
- 两条都是零售主导、同时含住宅或其他城市功能的单一建成项目；canonical broad type 使用 `mixed-use`，细用途 `retail` 为 primary。
- 本阶段只记录正式决策，不本地化图片、不生成 migration、不写生产。

## 身份与用途

- Klein Dytham 官方页确认 T-SITE 位于东京代官山，principal use 为 retail / apartments，2011 年 12 月开放，并由 Klein Dytham architecture 负责建筑与室内设计。
- MVRDV 官方页确认 Markthal 位于鹿特丹、2004–2014、状态 realised，整合 food / leisure / living / parking，并将市场大厅描述为公有使用的 covered square。
- T-SITE assignments：`retail` primary，`mixed-use` secondary。
- Markthal assignments：`retail` primary，`mixed-use`、`public-space` secondary。

## 图片审核

- CASE-074：Jonathan Lin，4608×3126，CC BY-SA 2.0；人工确认展示 T-SITE 本体与步行庭院。
- CASE-116：Michielverbeek own work，4352×3264，CC BY-SA 4.0；人工确认展示 Markthal 玻璃入口、住宅拱体和市场大厅。远处 Pencil building 只是透过大厅可见，不改变主体身份。
- 两张现为远程 Commons URL；迁移前必须本地化、优化并同步正式 credit，不能直接让 canonical image 依赖远程 hotlink。

## 生产只读查重

- MVRDV 已存在：`4a1fdf1b-ed02-45f6-9b9c-95ae623972df / mvrdv`，后续复用。
- Klein Dytham architecture：生产无匹配，后续新增。
- 两个 building slug：0 conflict。
- CASE-074/116 profiles：0 conflict。

## 下一步

通过 PR 固化只读决策；随后本地化并人工复核两张图片、同步权威 CSV 与生成数据，再扩展 migration generator 配置并执行隔离 PostgreSQL dry-run。
