# Graduation public-toilet taxonomy 001 dry-run

日期：2026-07-12

## 范围

- 为 G6 public-toilet batch 001 新增细用途 `public-toilet`。
- broad type 使用现有 `civic-public`，不新增 building type。
- 新增中、繁中、英、日四语共 24 个 alias。
- 本 migration 不写入 building、image、graduation profile 或 function assignment。
- 同步把 CASE-031 的误导性单体图片恢复为中性占位图；保留 CASE 路由、concept、keywords 与项目级研究内容。

## 生产只读预检

项目：`usuqjsjluietcnudxwvz`

- `public-toilet` function conflict：0。
- 24 个目标 `(locale, normalized_alias)` conflict：0。
- `civic-public` building type：1。
- `public-toilet` assignment：0。
- 当前总数：11 functions / 165 aliases / 111 assignments。

预期 taxonomy 写后总数：12 functions / 189 aliases / 111 assignments。

## 隔离 PostgreSQL dry-run

命令：`npm run graduation:verify-public-toilet-taxonomy`

结果：通过。

- PostgreSQL engine：18.3（`server_version_num=180003`）。
- 按历史顺序重放 foundation、base taxonomy 与已上线 `public-space` taxonomy 后再运行本 migration。
- forward 精确新增 1 function / 24 aliases / 4 locales。
- 注入依赖 `public-toilet` 的 building assignment 后，rollback 按预期拒绝。
- 删除注入依赖后，精确 rollback、第二次 forward、第二次 rollback 均通过，数量恢复到运行前基线。
- `supabase/migrations/20260712073708_building_function_public_toilet_001.sql` 与 reviewed apply SQL 字节一致。

## CASE-031 图片纠偏

- Commons 候选 `Tokyo Toilet Project 04.jpg` 的许可本身安全，但文件说明明确指向恵比寿公園厕所，由片山正通与 Wonderwall 设计。
- CASE-031 研究对象是多地点、多设计者的 THE TOKYO TOILET 项目体系；使用该单体作为项目总称封面会制造身份粒度误导。
- 权威 CSV 与两个生成 JSON 已恢复 `/images/graduation/case-placeholder.svg`，并清空 source、license、credit、note；未删除原始本地图或其他窗口文件。

## 验证

- public-toilet taxonomy 与审核决策单测：7/7。
- TypeScript：通过。
- Graduation content QA：139 cases，0 problems。
- CASE-031 生成结果：placeholder，图片来源、许可、摄影者与说明均为 `null`。

## 安全门

- 当前只准备 migration 文件，不授权生产执行。
- 必须先通过 PR 合并 taxonomy、guarded rollback、migration、CASE-031 fallback 修正和测试。
- 合并并完成 Reviewed 静态发布后，再做生产冲突复查；仍为 0 才允许应用 taxonomy migration。
- 生产写后必须核验 12/189/111、RLS/policy、anon/authenticated SELECT、Supabase advisors，再运行 Reviewed release。
- CASE-044 building/profile migration 必须在 taxonomy 生产上线后另建 migration pack；CASE-049 继续 `no_safe_image_yet`。
