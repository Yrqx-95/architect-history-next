# Graduation Library Batch 001 — Migration Dry Run

日期：2026-07-12

状态：迁移包已生成并完成隔离 PostgreSQL 双轮演练；未写入生产数据库

## 写入范围

- 4 个新 architect：Coelacanth K&H、kw+hg architects、Mari Ito + UAo、MIKAMI Architects；
- 8 个 canonical building；
- 8 张已审核 primary image；
- 8 个 graduation profile；
- 17 条 approved function assignment；
- 每个建筑恰好一条 primary `library` 用途。

既有 Kengo Kuma、Toyo Ito、Tadao Ando 继续引用生产 UUID，不重复新建。

## 生产只读预检

通过 anon Data API 在生成迁移包后复核：

- 8 个 building slug 冲突：0；
- 4 个新 architect slug 冲突：0；
- 3 个既有 architect UUID/slug：全部与数据包一致；
- 8 个 CASE profile 冲突：0；
- 8 个 image source URL 冲突：0；
- 17 个 assignment building ID 冲突：0；
- `library`、`museum`、`community-center`、`mixed-use`：4/4 active；
- `cultural` broad type：存在。

## Apply 保护

`db/manual-operations/graduation-library-batch-001-apply.sql` 在同一事务内：

1. 检查结构与基础表存在；
2. 检查固定种子数量；
3. 验证既有 architect UUID/slug；
4. 验证用途和 broad type；
5. 要求目标 UUID、slug、CASE、image source 和 assignment key 全部为空；
6. 批量写入 architect → building → image → profile → assignment；
7. 写后检查所有数量、8 张唯一主图和8条唯一主用途；
8. 任一步失败则事务整体回滚。

## Rollback 保护

`db/manual-operations/graduation-library-batch-001-rollback.sql` 只认固定 UUID 和键。它会拒绝以下情况：

- 批次行被改名、改 UUID、删除或替换；
- 新建筑后来新增了图片、毕业 profile、用途、style、era 或 curated image；
- 新 architect 后来新增 style、era、影响关系或批次外建筑。

这样可避免未来编辑发生后仍机械删除主体。

## PGlite 结果

`npm run graduation:verify-library-001` 使用 PostgreSQL 18.3 兼容引擎，先安装 G5 foundation 与 batch 001 基线，再执行：

1. forward：通过；
2. 人工插入一条外部 curated-image 关系；
3. rollback：按预期拒绝；
4. 清除测试关系后精确 rollback：通过；
5. 第二次 forward：通过；
6. 第二次 rollback：通过。

最终回到 40 个基线建筑、21 profiles、9 functions、122 aliases、23 assignments、0 新图片和 0 新 architect，证明没有残留。

## 尚未执行

生产数据库尚未应用。下一步先让迁移包、回滚、验证器和结构测试通过 PR；合并后再次运行实时来源与生产冲突预检，才决定是否执行写入。
