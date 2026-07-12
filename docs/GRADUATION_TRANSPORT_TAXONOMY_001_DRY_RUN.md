# Transport-hub taxonomy 001 dry-run

日期：2026-07-12

## 范围

本阶段只为 transport batch 001 建立准确的细用途前置项，并同步两条已审核图片：

- 新增 `transport-hub`，broad type 为现有 `transportation`；
- 新增 zh / zh-Hant / en / ja 共 17 个 alias；
- CASE-094 替换为清晰站体外观，江戸村のとくぞう / CC BY-SA 4.0；
- CASE-133 本地化准确码头屋顶照片，Syced / CC0。

本阶段不插入 building、profile 或 function assignment。

## 生产只读预检

- 现有 functions：9；
- 现有 aliases：122；
- 现有 assignments：101；
- `transport-hub` function conflict：0；
- 17 个目标 locale/normalized_alias conflict：0；
- 现有 `transport-hub` assignment：0。

## 隔离 PostgreSQL 演练

使用 PGlite PostgreSQL 18.3 重放 foundation 与 graduation unification batch 001 后：

1. forward 成功新增 1 function 与 17 aliases；
2. 四个 locale 均存在；
3. 注入一条依赖 assignment 后，rollback 按预期拒绝；
4. 删除外部依赖后精确 rollback；
5. 第二次 forward 与第二次 rollback 均通过；
6. 最终 function / alias 数恢复到基线。

## 图片验证

- CASE-094：原始 5715×3797，优化为 2000×1328、588249 bytes；人工确认显示站体、膜屋顶和玻璃站厅。
- CASE-133：原始 4032×3024，优化为 2000×1500、849421 bytes；人工确认显示连续木平台、折叠屋面和邮轮泊位。
- Graduation content QA：100 issues / 50 site types / 139 cases，0 problem；published image metadata missing 为 0。

## 安全边界

- apply 在 function、alias 或 broad type 冲突时拒绝；
- rollback 在 taxonomy 行漂移或出现任何 building assignment 时拒绝；
- Supabase migration 文件由 `npx supabase migration new building_function_transport_hub_001` 生成，不手写时间戳；
- 生产写入前仍需再次执行同一冲突预检；写后必须核对 10 functions / 139 aliases、RLS/policy 和 anon 可见性，并运行 advisors。

## 下一步

通过 PR 合并 taxonomy、图片与 migration 文件。合并后执行生产前复查，再应用 migration；随后运行 Reviewed production release，确认 Cloudflare 图片部署和真实 CASE-094/133 路由。只有这一步完成后才生成三条 transport building/profile migration pack。
