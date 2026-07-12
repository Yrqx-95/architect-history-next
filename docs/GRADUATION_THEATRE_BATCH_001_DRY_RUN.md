# Graduation theatre batch 001 dry-run

日期：2026-07-12

## 迁移包

- 4 个 canonical architect 引用，其中 3 个生产既有、1 个新联合主体。
- 4 个 buildings。
- 4 个 primary images。
- 4 个 published graduation profiles。
- 6 个 approved function assignments：4 个主 `theatre`，Harpa 与 The Shed 各有 1 个次 `mixed-use`。
- CASE-091 不在写入种子中。

## 隔离 PostgreSQL 重放顺序

1. Graduation unification foundation。
2. Graduation unification batch 001。
3. Graduation library batch 001。
4. Graduation library batch 002。
5. Graduation museum batch 001。
6. Graduation theatre batch 001。

验证器会区分“迁移开始前就存在的建筑师”和“由前序批次创建、当前批次复用的建筑师”，确保 Snøhetta 与 Henning Larsen 只在对应历史迁移中创建。

## 结果

- PostgreSQL engine：180003。
- 第一次 forward：1 new architect、4 buildings、4 images、4 profiles、6 assignments，通过。
- 注入外部 `curated_images` 关系后，rollback 正确拒绝删除仍被外部数据引用的建筑。
- 删除注入关系后，精确 rollback 通过。
- 第二次 forward 通过。
- 第二次 rollback 通过。
- library batch 002 与 museum batch 001 的旧 dry-run 同时重跑通过。

## 结论

迁移包具备可重复的正向写入、外部依赖保护与精确回滚证据；仍需通过 PR 合并、生产只读冲突复查后才可应用。
