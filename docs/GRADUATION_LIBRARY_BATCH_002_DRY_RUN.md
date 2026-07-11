# Graduation Library Batch 002 Dry Run

日期：2026-07-12

状态：本地 PostgreSQL 干跑与生产只读冲突预检通过；本文档不授权生产写入。

## 迁移范围

- 13 个 architect 引用，其中 11 个新建、2 个复用生产 UUID/slug。
- 14 个新 building。
- 14 张已审核 primary image。
- 14 个 published graduation profile。
- 36 条 approved function assignment，每个主体只有一个 primary `library`。
- CASE-079 保持 `no_safe_image_yet`，迁移包中不存在该 CASE ID。

## PostgreSQL 干跑

`npm run graduation:verify-library-002` 使用 PGlite PostgreSQL 18.0.3，按生产顺序执行：

1. 统一模式 foundation。
2. graduation unification batch 001。
3. graduation library batch 001。
4. graduation library batch 002 apply。
5. 注入一条外部 curated image 关系，验证 rollback 拒绝误删。
6. 移除测试关系后，执行 rollback、第二次 apply、第二次 rollback。

结果：两轮往返计数、anon 可见性、主图和主用途均精确一致；rollback 依赖保护正常生效。

## 生产只读预检

预检时生产表基线：110 architects、883 buildings、7232 images、29 profiles、40 assignments。

- 已有 architect UUID/slug 精确匹配：2/2。
- 必需 function：`library`、`university`、`community-center`、`mixed-use`、`museum`、`theatre`，6/6 存在且启用。
- 必需 building type：`educational`、`civic-public`、`cultural`，3/3 存在。
- 新 architect ID/slug 冲突：0。
- building ID/slug 冲突：0。
- image ID/source URL 冲突：0。
- CASE ID/building profile 冲突：0。
- building/function assignment 冲突：0。

## 安全门

Apply SQL 在一个 transaction 内重新核对 seed 计数、已有 architect 对、必需 type/function、全部目标键与写后计数。Rollback 会在发现批次外关系、行被修改或行缺失时拒绝执行。

下一步是让 PR 检查通过并合并，然后在真实写入前再跑一次同样的生产冲突预检。
