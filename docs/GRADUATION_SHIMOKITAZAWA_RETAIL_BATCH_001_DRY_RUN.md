# Graduation Shimokitazawa retail batch 001 dry-run

日期：2026-07-12

## 范围

- CASE-038 BONUS TRACK Shimokitazawa。
- CASE-039 MIKAN SHIMOKITA。
- 两条 CASE 是下北泽不同地点、年份和设计团队的独立建成项目，因此创建两个 canonical buildings，不做 shared-building reuse。
- 两条 CASE 路由及各自 concept/keywords 保持独立。

## 生成结果

- new architects：2。
- buildings：2。
- primary images：2。
- graduation profiles：2。
- approved function assignments：5。

用途：

- 两栋 building broad `type_slug` 均为 `commercial`。
- 两栋 primary function 均为 `retail`。
- BONUS TRACK secondary：`mixed-use`、`public-space`。
- MIKAN SHIMOKITA secondary：`mixed-use`。

图片：

- CASE-038：MDPI Figure 3 / morinakayasuaki / CC BY 4.0；repository 明确写为 `MDPI`。
- CASE-039：Souka Kinmei / Wikimedia Commons / CC0。
- 生成器不再把非 Commons 图片统一误标为 Wikimedia Commons。

## 生产只读预检

- 基线：70 profiles / 924 buildings / 7273 images / 113 assignments。
- architect/building/image/profile/assignment conflicts：全部 0。
- required active functions：3/3。
- required `commercial` type：1/1。
- 预期写后：72 profiles / 926 buildings / 7275 images / 118 assignments。

## 隔离 PostgreSQL dry-run

命令：`npm run graduation:verify-shimokitazawa-retail-001`

结果：通过。

- PostgreSQL engine：18.3（`server_version_num=180003`）。
- 按完整历史顺序重放所有先前 graduation packs，以及 transport/public-space/public-toilet/retail taxonomies。
- 第一次 forward 精确新增 2 architects / 2 buildings / 2 images / 2 profiles / 5 assignments。
- 注入外部 curated image 后，guarded rollback 按预期拒绝。
- 删除注入关系后，精确 rollback、第二次 forward、第二次 rollback 全部通过。
- migration `20260712103506_graduation_shimokitazawa_retail_batch_001.sql` 与 reviewed apply SQL 字节一致。

## 安全门

- 当前只生成 migration pack，不授权生产写入。
- 必须先通过 PR 合并 pack、guarded SQL、生成器修正、测试和 dry-run 记录。
- 合并后再次生产冲突复查；仍为 0 才允许应用 migration。
- 写后必须核验精确数量、RLS/profile 关系、architect relation、primary image/function 和 advisors；随后更新生产 E2E 基线、运行 Reviewed release，并检查 6 条 CASE 路由、6 条 building 路由与 2 张图片。
