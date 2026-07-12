# Graduation public-toilet batch 001 dry-run

日期：2026-07-12

## 范围

- 只迁移已批准的 CASE-044 Nabeshima Shoto Park Toilet。
- CASE-031 是项目级参考，不建立单一 canonical building。
- CASE-049 继续 `no_safe_image_yet`，不进入任何 seed。
- 复用生产 architect `kengo-kuma`，不新增 architect。

## 生成结果

- existing architects：1。
- new architects：0。
- buildings：1。
- primary images：1。
- graduation profiles：1。
- approved function assignments：2。

主体：

- building slug：`nabeshima-shoto-park-toilet`。
- broad `type_slug`：`civic-public`。
- primary function：`public-toilet`。
- secondary function：`public-space`。
- architect：复用 `51797239-be38-4dbd-9d7e-e413ddf3c78a / kengo-kuma`。
- 图片：鋸香具師 / Wikimedia Commons / CC BY-SA 4.0，750×500，SHA-256 `2c46371f83de086d4673917e8c1d9a92e380f605ad8e0f692c6abaf9cf1abd5c`。

## 验证器修正

第一次生产预检发现 reviewed decision 把细用途 `public-toilet` 错写成 building broad `type_slug`；生产 `building_types` 中不存在该 slug。

修正：

- canonical building `type_slug` 改为 `civic-public`。
- `public-toilet` 只作为 primary function assignment。
- 隔离验证器不再从当前 pack 动态创建 type；改为只从版本化 function taxonomy 的 `broad_type_slug` 集合建立测试 broad types，防止未来 pack 自创不存在的生产 type。

## 生产只读预检

- existing architect UUID/slug exact match：1。
- building conflict：0。
- image UUID/source conflict：0。
- CASE profile conflict：0。
- assignment conflict：0。
- required active functions：2/2。
- required `civic-public` type：1/1。
- 当前基线：69 profiles / 923 buildings / 7272 images / 111 assignments。

预期写后：70 profiles / 924 buildings / 7273 images / 113 assignments。

## 隔离 PostgreSQL dry-run

命令：`npm run graduation:verify-public-toilet-001`

结果：通过。

- PostgreSQL engine：18.3（`server_version_num=180003`）。
- 按完整历史顺序重放所有先前 graduation packs、transport/public-space taxonomies 和 public-toilet taxonomy。
- 第一次 forward 精确新增 1 building / 1 image / 1 profile / 2 assignments，0 new architect。
- 注入外部 curated image 后，guarded rollback 按预期拒绝。
- 删除注入关系后，精确 rollback、第二次 forward、第二次 rollback 全部通过。
- migration `20260712094040_graduation_public_toilet_batch_001.sql` 与 reviewed apply SQL 字节一致。

## 其他验证

- Unit：42 files / 149 tests 全部通过。
- TypeScript：通过。
- Graduation content QA：139 cases / 0 problems。
- 目标脚本 ESLint：通过。

## 安全门

- 当前只生成 migration pack，不授权生产写入。
- 必须先通过 PR 合并 pack、guarded SQL、验证器修正、图片署名同步与测试。
- 合并后再次生产冲突复查；仍为 0 才允许应用 migration。
- 写后核验数量、RLS/profile 关系、architect relation、primary image/function、advisors，再更新 E2E 基线并运行 Reviewed production release。
