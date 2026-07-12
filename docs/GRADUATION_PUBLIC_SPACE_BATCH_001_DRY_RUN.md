# Urban public-space batch 001 migration dry-run

日期：2026-07-12

## 范围

正式决策中的 4 条 approved CASE 进入 migration pack：

- CASE-050 → `hisaya-odori-park`
- CASE-056 → `tainan-spring`
- CASE-110 → `the-high-line`
- CASE-111 → `superkilen`

CASE-014 保持 `identity_not_bounded`，没有进入任何 architect、building、image、profile 或 assignment seed。

## 生成结果

- architects：4，其中 3 条新联合设计主体，MVRDV 复用生产 UUID；
- buildings：4；
- primary images：4；
- published profiles：4；
- approved assignments：5；
- primary `public-space`：4；
- secondary `mixed-use`：1，仅属于 Hisaya-odori Park。

生成器对建筑 slug、CASE、图片来源/许可/署名、architect UUID/slug 与生产 function 做强校验。首次生成因 CASE-050 的公开署名仍为笼统 `KKPCW` 而拒绝；同步为审核过的 `Photo: KKPCW / Wikimedia Commons` 后才生成成功。

## 生产只读预检

生成时读取生产数据库并确认：

- 4 个目标 building slug 不存在；
- 4 个 CASE profile 不存在；
- 4 个目标 primary image source 不存在；
- 3 个新 architect slug/UUID 不存在；
- MVRDV 的生产 UUID/slug 精确匹配；
- `public-space` 与 `mixed-use` 均 active；
- broad type `public-space` 存在。

正式生产写入前仍须重复同一预检。

## 全历史隔离 PostgreSQL dry-run

使用 PGlite PostgreSQL 18.3 重放 foundation、首批统一、library 001/002、museum 001、theatre 001、community-civic 001、transport taxonomy/batch 与 public-space taxonomy 后：

1. 第一次 forward 新增 3 architects、4 buildings、4 images、4 profiles、5 assignments；
2. anon 可见 profile / assignment 总数与预期一致；
3. 向目标 building 注入外部 curated image 后，rollback 按预期拒绝；
4. 删除外部关系后精确 rollback，恢复历史基线；
5. 第二次 forward 与第二次 rollback 均通过；
6. CASE-014 始终不在迁移 seed 中。

第一次全历史演练暴露验证器只预置“首批 + 当前批次” broad types，导致重放旧 `transport-hub` taxonomy 时缺少 `transportation`。验证器已修正为汇总所有 prior packs 的 building types；没有跳过任何历史迁移。

## 安全边界

- apply 在任何目标 architect/building/image/profile/assignment key 冲突时拒绝；
- existing architect 必须 UUID 与 slug 同时匹配；
- rollback 在审核行漂移、外部图片、额外 profile、额外 function、style/era/curated image 或 architect 外部关系存在时拒绝；
- rollback 仅删除本批新建的 3 architect，绝不删除复用的 MVRDV；
- Supabase migration 文件由 CLI 创建，并与 reviewed apply SQL 字节一致。

## 下一步

通过 PR 合并 migration pack；合并后重新执行生产冲突预检，再应用 `graduation_public_space_batch_001`。写后核验目标行、orphan、architect、primary image/function、RLS/policy 和 advisors；随后把 profile 读取基线从 65 更新为 69，运行最终 Reviewed release，并验收 4 CASE + 4 building 路由。
