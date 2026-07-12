# Graduation community / civic batch 001 dry-run

日期：2026-07-12

## 迁移包

- 1 个新联合 architect：Kazumi Adachi + Kiyoshi Sawano + Hideo Matsunaga + Isamu Noguchi。
- 1 个 building：CASE-096 Japanese American Cultural & Community Center。
- 1 张 primary image：Another Believer / Wikimedia Commons / CC BY-SA 4.0。
- 1 个 published graduation profile。
- 3 条 approved function assignments：主 `community-center`，次 `theatre` 与 `mixed-use`。

## 全历史重放

隔离 PostgreSQL 18.3 按真实生产顺序执行：

1. Graduation unification foundation。
2. Graduation unification batch 001。
3. Graduation library batch 001。
4. Graduation library batch 002。
5. Graduation museum batch 001。
6. Graduation theatre batch 001。
7. Graduation community / civic batch 001。

验证通过：

- 第一次 forward 的 1 architect、1 building、1 image、1 profile、3 assignments 计数正确。
- 注入外部 `curated_images` 关系后，rollback 正确拒绝删除被外部引用的 reviewed building。
- 移除外部关系后，精确 rollback 恢复到 theatre batch 001 后的基线。
- 第二次 forward 与第二次 rollback 均通过，证明迁移可重复演练且无残留。
- library 002、museum 001、theatre 001 的旧 dry-run 同时回归通过。

## 验证器修正

加入第四个后续批次后，历史重放暴露出建筑师状态的时间顺序问题：某建筑师在早期批次首次创建，到后期批次会被标记为 existing；旧验证器会把后期的 existing 状态提前预置到早期。验证器现已排除所有在任一 prior pack 中以 `is_new` 首次出现的 UUID/slug，只预置真正早于全部批次存在的建筑师。该修正由四条历史 dry-run 共同验证。

## 安全边界

- 生成的 apply/rollback 仍是版本化审核产物，尚未写入生产。
- apply 在目标 UUID、slug、CASE ID、图片来源或用途关系任一冲突时拒绝执行。
- rollback 在 reviewed 行发生漂移或存在外部关系时拒绝执行。
