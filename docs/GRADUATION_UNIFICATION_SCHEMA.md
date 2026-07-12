# 毕业案例与主体建筑统一结构设计（G3）

状态：已通过隔离 PostgreSQL 双向演练，待 reviewed production migration

对应迁移：`db/migrations/v23-graduation-building-unification.sql`

对应回滚：`db/migrations/v23-graduation-building-unification-rollback.sql`

## 设计结论

毕业案例不再复制建筑本体。`graduation_case_profiles.building_id` 引用 `buildings.id`，而稳定且唯一的 `case_id` 继续作为 `CASE-xxx` 路由标识。同一主体可以对应多个毕业分析 profile，用来保留不同 CASE 的研究概念与关键词；建筑事实仍只存在一份。

用途不是替换现有 `building_types`：

- `building_types`：一座建筑的宽泛一级类型，例如 `cultural`、`educational`。
- `building_functions`：可多选的细粒度实际用途，例如 `library`、`community-center`、`elderly-care`。
- `building_function_aliases`：把“图书馆 / 圖書館 / library / 図書館”等词解析为同一个用途 slug。
- `building_function_assignments`：把一座建筑连接到一个或多个用途，并保留置信度、证据和审核状态。

因此“图书馆”查询最终通过 alias 解析成 `library`，再查询所有已批准的 `library` assignments，而不是依赖建筑名称里是否出现“图书馆”。

## 字段所有权

| 信息 | 唯一事实源 | 毕业页面如何使用 |
|---|---|---|
| 建筑名称、别名 | `buildings` | 按当前语言读取主体字段 |
| 建筑师 | `buildings` → `architects` | 读取主体关系 |
| 年份、地点、状态 | `buildings` | 读取主体字段 |
| 建筑图片、摄影者、许可、来源 | `images` | 与主体页面共享同一图片记录 |
| 一级建筑类型 | `buildings.type_slug` → `building_types` | 作为宽泛类型与筛选项 |
| 细粒度用途 | `building_function_assignments` → `building_functions` | 支持多用途与智能搜索 |
| CASE 地址 | `graduation_case_profiles.case_id` | 保留 `/graduation/cases/CASE-xxx` |
| 毕业研究概念、关键词 | `graduation_case_profiles` | 仅在毕业制作语境展示与搜索 |
| 平面、剖面与毕业专题来源 | `graduation_case_profiles` | 仅属于毕业分析层 |

旧 `cases.json` 的 `name`、`architect`、`year`、`location` 和图片字段在迁移后只作为兼容导出的派生字段，不再作为第二套事实源。`image_note` 属于审核记录，不进入公开 profile；图片审核证据继续留在版本化决策文件和数据治理报告中。

## CASE 兼容规则

- `case_id` 是主键，并强制匹配 `CASE-000` 格式。
- `building_id` 使用普通索引而非唯一约束；多个 CASE 可以共享同一主体，但每个 CASE 仍有独立分析与稳定 URL。
- 删除主体使用 `ON DELETE RESTRICT`，不能在不处理 CASE 兼容性的情况下删除建筑。
- 旧 URL 解析时先按 `case_id` 找 profile，再按 `building_id` 读取主体。
- G5 双轨期继续保留 JSON；新查询失败时回退旧 JSON，直到 G9 完成差异监测。

## 发布与权限边界

- 四张新表全部启用 RLS。
- `anon` 与 `authenticated` 只有显式 `SELECT` 权限，没有写权限。
- profile 只公开 `published`；用途分配只公开 `approved`；候选和拒绝项不会进入搜索。
- 用途词表只公开 `is_active = true` 的条目，alias 通过父用途活跃状态联动过滤。
- `service_role` 获得结构所需的增删改查权限，只允许在服务端迁移或受控脚本使用。
- 本草案没有 view 或 `SECURITY DEFINER` 函数；未来如增加 view，必须设置 `security_invoker = true`。

## 索引与完整性

- 主键覆盖 CASE 查询；普通 `building_id` 索引覆盖主体到全部毕业分析的反查；唯一约束继续覆盖 alias 查询和 building 的用途关系。
- 所有未被主键左前缀覆盖的外键都建立索引。
- 已批准用途使用 `(function_slug, building_id)` 部分索引，直接服务“查全部图书馆”路径。
- 每座建筑最多一个已批准的 primary function；其他用途仍可并存。
- 已批准或拒绝的 assignment 必须有 `reviewed_at`，候选项不得伪装成已审核。
- `updated_at` 由限定 `search_path` 的触发器维护；公开角色没有执行权限。

## G3 不做的事情

- 不把 139 个案例写入 Supabase。
- 不自动新建 101+ 个建筑主体。
- 不迁移或替换任何图片。
- 不生成 875 座建筑的用途写入结果。
- 不改变页面读取逻辑，也不触发生产部署。

这些操作分别属于 G4、G5、G6 和 G8，必须在独立审核、dry-run 与回滚证据齐全后推进。

## 应用前检查

1. 用生产 schema-only dump 对照 `buildings.id`、`building_types.slug` 和现有触发器名称。
2. 在隔离数据库执行前向迁移、结构验证、回滚，再次执行前向迁移确认可重复演练。
3. 用 anon key 验证只能读取 published/active/approved，且所有写操作被拒绝。
4. 用 service role 在服务器环境验证受控写入，确认密钥不会进入客户端 bundle。
5. 在 G5 migration 中使用批准决策文件解析真实 UUID，禁止凭名称或模糊匹配写入。

## 2026-07-12 只读核验记录

- 线上项目 `usuqjsjluietcnudxwvz` 当前有 875 个 `buildings`、20 个 `building_types`。
- `buildings.id` 为 UUID 主键，`building_types.slug` 为唯一文本列，符合本草案外键设计。
- 四张目标表当前均不存在，`set_archistory_updated_at` 函数名也没有冲突。
- `buildings`、`building_types`、`images` 均已启用 RLS，`anon` / `authenticated` 只有 `SELECT`，与本草案权限模型一致。
- 本轮只执行 metadata 和权限查询，没有执行 DDL 或 DML，也没有修改生产数据库。
- Supabase 仍提示 PostGIS 管理表 `public.spatial_ref_sys` 未启用 RLS。仓库的 v11/v14 已撤销其公开权限，应用也不依赖该表；这不是 G3 新增问题，本轮不擅自启用 RLS，避免影响扩展管理。
