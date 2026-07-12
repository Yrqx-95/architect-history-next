# Graduation retail mixed-use batch 002 dry-run

日期：2026-07-12

## 范围

- CASE-074 Daikanyama T-SITE。
- CASE-116 Markthal Rotterdam。
- 两栋独立 canonical buildings；两条 CASE route、concept 和 keywords 保持独立。

## 生成结果

- architects：2，其中 1 new Klein Dytham、1 existing MVRDV。
- buildings：2。
- primary images：2。
- graduation profiles：2。
- approved function assignments：5。

用途：

- 两栋 broad `type_slug`：`mixed-use`。
- 两栋 primary function：`retail`。
- T-SITE secondary：`mixed-use`。
- Markthal secondary：`mixed-use`、`public-space`。

## 图片发布前置项

- PR #69 已发布两张本地图与正式 rights metadata。
- Reviewed static release `29190460042` 成功。
- CASE-074/116 中英日 6 条 CASE routes 与两张图片全部 HTTP 200。
- 线上尺寸及 SHA-256 与仓库逐字节一致。

## 生产只读预检

- 基线：72 profiles / 926 buildings / 7275 images / 118 assignments。
- new Klein Dytham conflict：0。
- existing MVRDV UUID/slug match：1。
- building/image/profile/assignment conflicts：全部 0。
- required functions：3/3。
- required `mixed-use` type：1/1。
- 预期写后：74 profiles / 928 buildings / 7277 images / 123 assignments。

## 隔离 PostgreSQL dry-run

命令：`npm run graduation:verify-retail-mixed-use-002`

结果：通过。

- PostgreSQL engine：18.3（`server_version_num=180003`）。
- 按完整历史顺序重放所有先前 graduation packs 与四个追加 taxonomies。
- 第一次 forward 精确新增 1 architect / 2 buildings / 2 images / 2 profiles / 5 assignments。
- 注入外部 curated image 后，guarded rollback 按预期拒绝。
- 精确 rollback、第二次 forward 与第二次 rollback 全部通过。
- migration `20260712112526_graduation_retail_mixed_use_batch_002.sql` 与 reviewed apply SQL 字节一致。

## 安全门

- 当前只生成 migration pack，不授权生产写入。
- 必须先通过 PR 合并 pack、guarded SQL、验证器配置、测试与 dry-run 记录。
- 合并后重复生产冲突预检；仍为 0 才允许应用 migration。
- 写后核验精确数量、RLS、profile/building/architect/image/function 关系与 advisors，再更新 E2E 基线并运行 Reviewed release。
