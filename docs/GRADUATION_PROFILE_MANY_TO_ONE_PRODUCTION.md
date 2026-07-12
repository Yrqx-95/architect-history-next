# Graduation profile many-to-one 生产记录

日期：2026-07-12

## 结论

- PR #39 已合并，将 `graduation_case_profiles.building_id` 从唯一关系改为普通外键索引。
- Supabase migration `graduation_profile_many_to_one`（`20260712042433`）已应用。
- 本次不插入、修改或删除任何案例数据。
- 一个 canonical building 现在可以被多个 `CASE-xxx` profile 引用，各 CASE 仍保留自己的 concept、keywords 和路由。

## 生产前后验证

- published profiles：62。
- distinct building references：62。
- duplicate building references：0。
- `building_id` 唯一约束：已移除。
- `idx_graduation_case_profiles_building_id` 普通索引：存在。
- CASE 主键、building 外键：存在。
- RLS：仍开启。
- anon/authenticated 只读 published policy：未变。

Supabase advisors 未报告本次迁移新增的安全问题。新索引刚创建即被标记为 unused 属正常初始状态。

## 发布与线上验收

- Reviewed production release `29179669891` 成功，耗时 8m28s。
- 质量门、完整测试、Cloudflare Worker 构建部署和生产路由语义验证全部通过。
- 线上 API：`source=supabase+json`、101 个公开案例、62 profiles、62 unified CASE IDs、0 missing fallback/building relation。
- CASE-096 和对应 building 页均 HTTP 200；伪造毕业路径仍 HTTP 404。

## 剩余边界

- 数据结构已支持多 CASE 共享一建筑，但现有批次生成器还需要在首个真实重复案例迁移前支持“复用已有 building”。
- CASE-024 与 CASE-065 的共享建筑身份已确认，但仍因缺少可安全复用的准确图片而不进入生产数据。
