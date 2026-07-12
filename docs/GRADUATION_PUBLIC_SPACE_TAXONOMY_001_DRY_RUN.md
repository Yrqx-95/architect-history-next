# Public-space taxonomy 001 dry-run

日期：2026-07-12

## 范围

本阶段只为 urban public-space batch 001 建立准确的细用途前置项，并同步两条已审核图片信息：

- 新增 `public-space`，broad type 为现有 `public-space`；
- 新增 zh / zh-Hant / en / ja 共 26 个 alias；
- CASE-110 修正为 Beyond My Ken / CC BY-SA 4.0，并更新为 Field Operations 项目来源；
- CASE-111 替换为 Black Square 全景，Emily / CC BY 2.0，并本地化为 2000×1333。

本阶段不插入 building、profile 或 function assignment。

## 生产只读预检

- 现有 functions：10；
- 现有 aliases：139；
- 现有 assignments：106；
- `public-space` function conflict：0；
- 26 个目标 locale / normalized_alias conflict：0；
- 现有 `public-space` assignment：0；
- broad type `public-space`：1。

## 隔离 PostgreSQL 演练

使用 PGlite PostgreSQL 18.3 重放 foundation 与 graduation unification batch 001 后：

1. forward 成功新增 1 function 与 26 aliases；
2. 四个 locale 均存在；
3. 注入一条依赖 assignment 后，rollback 按预期拒绝；
4. 删除外部依赖后精确 rollback；
5. 第二次 forward 与第二次 rollback 均通过；
6. 最终 function / alias 数恢复到基线。

## 图片验证

- CASE-110：画面准确展示 West 20th Street 高架结构、植栽步道和城市关系；MediaWiki API 当前元数据为 Beyond My Ken 自有作品 / CC BY-SA 4.0。
- CASE-111：原始 3562×2375、1212760 bytes；优化为 2000×1333、730822 bytes，EXIF/IPTC/XMP 已移除。
- CASE-111 替代图人工确认完整展示 Black Square 的条纹地面、起伏、家具与 Nørrebro 街区，优于原标牌近景。
- Graduation content QA：100 issues / 50 site types / 139 cases，0 problem；published image metadata missing 为 0。
- CASE-111 已加入 image manifest；新增本地图不会扩大 manifest gap。

## 安全边界

- apply 在 function、alias 或 broad type 冲突时拒绝；
- rollback 在 taxonomy 行漂移或出现任何 building assignment 时拒绝；
- 不提供单独的 `public` 泛词 alias，避免过宽召回；
- Supabase migration 文件由 `npx supabase migration new building_function_public_space_001` 生成，不手写时间戳；
- 生产写入前必须再次执行同一冲突预检；写后核对 11 functions / 165 aliases、RLS/policy 与 anon 可见性，并运行 advisors。

## 下一步

通过 PR 合并 taxonomy、两条图片数据修正、本地图片与 migration 文件。合并后执行生产前复查，再应用 taxonomy migration；随后运行 Reviewed production release，确认 CASE-110/111 路由与图片。只有 taxonomy 和图片生产验收完成后，才生成 4 条 public-space building/profile migration pack。
