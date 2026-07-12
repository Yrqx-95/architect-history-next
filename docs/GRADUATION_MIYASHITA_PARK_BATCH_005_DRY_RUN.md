# Graduation MIYASHITA PARK batch 005 dry-run

日期：2026-07-12

## 生成结果

- 1 new joint architect：`49dee726-4fa3-5f25-a7d0-0a0dfb2a8d71 / takenaka-corporation-nikken-sekkei`。
- 1 building：`2558b8fa-1cb6-55f4-9f32-710d3005ea74 / miyashita-park`。
- 1 primary image：`b442816c-953f-5f0c-9e79-186c0b2c5f6a`。
- 1 published profile：CASE-040。
- 3 assignments：`mixed-use` primary，`retail` 与 `public-space` secondary。

## 隔离 PostgreSQL 演练

PostgreSQL 18.3 / engine `180003` 完整历史演练通过：forward；注入外部 curated-image 后 rollback 拒绝；删除外部关系后 exact rollback；second forward；second rollback。

## 生产只读预检

- 基线：75 profiles / 929 buildings / 7278 images / 124 assignments。
- architect/building/image/profile/assignment conflicts：全部 0。
- required functions：3/3。
- required mixed-use type：1/1。
- 预期写后：76 profiles / 930 buildings / 7279 images / 127 assignments。

## 文件一致性

`db/manual-operations/graduation-miyashita-park-batch-005-apply.sql` 与 `supabase/migrations/20260712214548_graduation_miyashita_park_batch_005.sql` 字节一致。

本文不授权生产写入。先合并 migration PR，随后重复生产预检、检查 advisors，再决定是否应用 migration。
