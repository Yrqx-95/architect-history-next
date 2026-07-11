# Graduation Unification Batch 001 — Dry-run Record

日期：2026-07-12

状态：隔离 PostgreSQL 演练通过；未执行生产数据库写入

## 输入

- G1 exact approvals：18
- G2 alias approvals：3
- graduation profiles：21
- building functions：9
- multilingual aliases：122
- approved function assignments：23（20 library + 3 additional museum）

所有 CASE 都是 `published`，CASE ID、building slug 和 building UUID 一一唯一；概念、关键词、来源 URL 完整。当前 21 条的平面和剖面 URL 都为空，因此迁移数据明确使用 `NULL`，不生成占位链接。

## 演练方法

使用开源 PGlite 在内存中启动真实 PostgreSQL WASM 引擎，建立与生产外键相关的最小 `buildings` / `building_types` 数据，然后依次执行：

1. G3 foundation schema；
2. batch 001 guarded seed；
3. 写后行数与关系查询；
4. anon / authenticated RLS 读取；
5. anon 非法写入；
6. batch rollback；
7. 第二次 forward migration；
8. 第二次 rollback 与 foundation rollback。

## 结果

- forward：21 profiles、9 functions、122 aliases、23 assignments。
- 40 个涉及的 canonical buildings 全部保留且没有字段变更。
- `published` / `active` / `approved` 行可由 anon 与 authenticated 读取。
- 人工加入的 `draft` profile、inactive function/alias、candidate assignment 均被 RLS 隐藏。
- anon INSERT 被权限层拒绝。
- seed rollback 后四张目标表均为 0 行。
- rollback 后再次 forward 成功，排除一次性顺序依赖。
- foundation rollback 删除四张新表，但保留 canonical buildings。

## 适用边界

PGlite 当前使用 PostgreSQL 18 引擎，线上 Supabase 是 PostgreSQL 17.6。本批次只使用 PostgreSQL 17 已支持的表、generated column、RLS、trigger、约束和部分索引语法；上线前仍需在生产变更窗口再次做 schema preflight 和写后查询。

这次演练没有验证 Next.js 双轨读取，因为相应运行时代码属于 G5 后半段。foundation 已在演练通过后进入正式 migration 评审，但在 Supabase 写后验证完成前仍不能视为已上线。

## 依赖安全

新增 `@electric-sql/pglite` 仅作为 devDependency。`npm audit --omit=dev` 仍报告 Next.js 内嵌 PostCSS 的既有 moderate advisory；自动修复建议会降级到破坏性 Next.js 版本，因此本阶段不执行 `npm audit fix --force`，另行处理依赖升级。
