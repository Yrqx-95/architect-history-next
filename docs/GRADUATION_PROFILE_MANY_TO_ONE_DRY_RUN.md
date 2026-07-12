# Graduation profile many-to-one schema dry-run

日期：2026-07-12

## 修复目标

同一 canonical building 可以被多个 `graduation_case_profiles` 引用；每个 profile 仍以唯一 `case_id` 保留 CASE 路由、概念与关键词。建筑名称、建筑师、年份、地点和图片继续只有一份主体事实。

## 结构变更

- 移除 `graduation_case_profiles_building_id_key` 唯一约束。
- 保留 `graduation_case_profiles_pkey (case_id)`。
- 保留 `graduation_case_profiles_building_id_fkey` 与 `ON DELETE RESTRICT`。
- 新增普通索引 `idx_graduation_case_profiles_building_id`。
- 不修改 RLS、published-only policy、表权限或已有数据。

## 隔离 PostgreSQL 演练

在 PostgreSQL 18.3 兼容引擎中从生产旧结构开始：

1. 创建一栋 canonical building 与 CASE-024 profile。
2. 执行 V24 forward，确认唯一约束消失、普通索引存在、RLS 保持启用。
3. 为同一 building 插入 CASE-065，确认两条 published profile 均可由 anon policy 读取。
4. 执行 rollback，确认因已有多 profile 关系而拒绝，防止破坏数据。
5. 删除演练的 CASE-065 后执行 rollback，唯一约束精确恢复、普通索引删除、RLS 不变。
6. 第二次执行 forward，再次通过。

## 运行时回归

`mergeGraduationCases` 新增两 profile / 一 building 测试，确认：

- 两条 CASE ID 均保留；
- 两页读取同一 canonical 名称；
- 两套 concept 与 keywords 不互相覆盖；
- diagnostics 同时列出两个 unified CASE。

## 生产安全门

- 生产当前 62 profiles / 62 distinct buildings，尚无重复 building reference，V24 可安全回滚。
- 应用生产 migration 后必须复核：CASE 主键、building 外键、非唯一索引、RLS、policy、profile 行数全部不变。
- 一旦未来写入同 building 的第二个 CASE，rollback 将有意拒绝；回滚前必须先处理这些 CASE 关系，不能静默删分析。
