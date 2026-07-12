# Graduation transport batch 001 dry-run

日期：2026-07-12

## 生成包

- existing architects：Shigeru Ban、Kengo Kuma；
- new architect：Foreign Office Architects 1 条；
- buildings：3；
- primary images：3；
- published profiles：3；
- approved function assignments：5，其中 3 条 primary `transport-hub`、2 条 secondary `mixed-use`。

## 生产只读冲突预检

- target building UUID / slug conflict：0；
- image UUID / source URL conflict：0；
- CASE profile conflict：0；
- new architect UUID / slug conflict：0；
- required active functions：2/2；
- required transportation type：1/1。

## 隔离 PostgreSQL 演练

PostgreSQL 18.3 依次重放：

1. graduation foundation；
2. unification batch 001；
3. library 001 / 002；
4. museum 001；
5. theatre 001；
6. community-civic 001；
7. transport-hub taxonomy 001；
8. transport batch 001。

验证结果：

- 第一次 forward 成功；
- 注入外部 curated-image relation 后 rollback 正确拒绝；
- 删除外部关系后精确 rollback；
- 第二次 forward 与第二次 rollback 通过；
- 最终恢复历史基线。

## 写入边界

本 dry-run 不授权生产写入。先通过 PR 合并生成包；生产写前重新执行 conflict query，再应用 Supabase migration。写后必须检查 65 profiles、3 new buildings/images、5 assignments、0 orphan、RLS/policy 和 anon API；之后再运行 Reviewed production release 与六条真实路由检查。
