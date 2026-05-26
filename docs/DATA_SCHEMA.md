# DATA_SCHEMA.md — 数据结构工程文档

> 基于 `src/lib/types.ts`（250行）和 Supabase 实际 schema 分析  
> 所有列名使用 snake_case，与 Supabase 列名直接对应

## Entity Relationship Diagram

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│   Era    │────→│ Building │←────│  Style   │
│          │     │          │     │          │
│ id       │     │ era_slug │     │ id       │
│ slug ←───┼──┐  │style_slgs│  ┌──│ slug ←───┼──┐
│ name_*   │  │  │ type_slug│  │  │ parent   │  │
│ year_st/ │  │  │archt_slug│  │  │ era_slug │  │
│  end     │  │  └──────────┘  │  └──────────┘  │
└──────────┘  │                │                │
              │  ┌──────────┐  │                │
              └─→│Architect │←─┘                │
                 │          │                   │
                 │ era_slug │                   │
                 │style_slgs│                   │
                 │influences│───────────────────┘
                 │influenced│
                 └──────────┘
                      │
                      │ architect_slug
                      ▼
                 ┌──────────┐
                 │ Building │
                 │  Image   │
                 │          │
                 │building_id│
                 │is_primary│
                 │img_type  │
                 └──────────┘
```

## 核心实体

### Architect（建筑师）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | UUID | ✅ | 主键 |
| slug | string | ✅ | URL 标识符，如 `le-corbusier` |
| wikidata_id | string \| null | | Wikidata Q-ID |
| name_zh / name_en / name_ja | string \| null | ✅(en) | 三语名称，name_en 为必填回退 |
| alt_names | string[] | | 别名列表 |
| birth_year / death_year | number \| null | | 生卒年份 |
| nationalities | string[] | | 国籍列表 |
| era_slug | string \| null | | 关联时代 slug |
| style_slugs | string[] | | 关联风格 slug 列表 |
| bio_zh / bio_en / bio_ja | string \| null | | 三语生平 |
| core_ideas | string[] | | 核心设计思想（关键词列表） |
| education | string \| null | | 教育背景文本 |
| influences / influenced | string[] | | 影响关系（slug 列表） |
| wikipedia_url / official_url | string \| null | | 外部链接 |

**当前问题：**
- `bio_*` 字段很多条目 < 20 字符，质量阈值过低（`quality.ts` 仅要求 > 20 字符）
- `influences` / `influenced` 使用 slug 列表；`relations.ts` 已统一风格/时代的 slug-based 匹配
- `core_ideas` 是自由的 string[]，缺少结构化的 id/key 引用

### Architect Content Overlay（仓库内容层）

第一阶段精品内容不修改 Supabase schema，使用 `src/lib/architect-content.ts` 按 `architect.slug` 提供长文 overlay。该层用于承载 Supabase 当前不适合存放的编辑型内容。

| 字段 | 类型 | 说明 |
|------|------|------|
| slug | string | 对应 architects.slug |
| summary | Record<zh/ja/en,string> | 页头摘要、SEO 描述 |
| core_ideas | Record<zh/ja/en,string[]> | 本地化核心思想 |
| portrait | object | 人物肖像 URL、author、license、source_url、alt |
| sections | array | 长文 section，每节含本地化标题和段落数组 |
| representative_works | array | 3 个站内 building slug + 本地化导读 |
| sources | array | 文末来源标题和 URL |

第二批精品内容新增 `le-corbusier`、`mies-van-der-rohe`、`frank-lloyd-wright`、`louis-kahn`、`tadao-ando`；第三批新增 `zaha-hadid`、`im-pei`、`renzo-piano`、`frank-gehry`、`lina-bo-bardi`；第四批新增 `norman-foster`、`shigeru-ban`、`carlo-scarpa`、`kengo-kuma`、`niemeyer`。每个代表作 slug 必须能被 `getBuildingsWithCovers()` 解析到站内建筑，并应有 Supabase 主图或审核后的本地/远程图片 override。

**迁移方向：**
稳定后可迁移为 `architect_articles`、`architect_portraits`、`architect_representative_works` 三张表，或一个 `architect_content` JSONB 表。迁移前仓库 overlay 仍是唯一编辑源。

### Chinese Script Overlay（中文简繁显示层）

繁体中文第一阶段不新增 Supabase 字段，也不新增 `/zh-tw` 路由。中文页面仍使用 `/zh`，运行时通过 `localStorage.chineseScript` 控制显示形态：

| 值 | 说明 |
|------|------|
| system | 默认值；`zh-TW`、`zh-Hant`、`zh-HK`、`zh-MO` 浏览器语言显示繁体，其余显示简体 |
| hans | 强制简体 |
| hant | 强制台湾繁体 |

显示层使用 `opencc-js` 的 `cn -> twp` 转换规则覆盖 UI 文案、Supabase 中文字段、仓库 overlay 长文、placeholder、alt 与 aria-label。未来精品内容可增加 `zh_hant`、`summary_hant`、`sections_hant` 等人工繁体字段；读取规则为人工繁体优先，没有时自动从简体转换。

### Building（建筑）

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | UUID | ✅ | 主键 |
| slug | string | ✅ | URL 标识符 |
| wikidata_id | string \| null | | Wikidata Q-ID |
| name_zh / name_en / name_ja | string \| null | ✅(en) | 三语名称 |
| architect_id / architect_slug | string \| null | | 关联建筑师 |
| year_start / year_end | number \| null | | 建造年份范围 |
| status | string \| null | | 状态（existing/demolished/proposed） |
| city / country / country_code | string \| null | | 位置信息 |
| location | unknown | | ⚠️ 类型为 unknown，应为 GeoPoint |
| type_slug | string \| null | | 建筑类型 |
| style_slugs | string[] | | 关联风格列表 |
| era_slug | string \| null | | 关联时代 |
| area_sqm | number \| null | | 面积（平方米） |
| materials | string[] | | 材料列表 |
| structure | string \| null | | 结构类型 |
| description / significance | Record<string,string> \| null | | 多语言描述 |
| spatial_feat / light_feat / circulation | Record<string,string> \| null | | 三模块深度分析 |
| heritage | string \| null | | 遗产状态 |
| wikipedia_url / official_url | string \| null | | 外部链接 |

**当前问题：**
- `location` 类型为 `unknown`，失去类型安全
- `year_start || 0` 在时间轴中导致缺失数据显示为 "0年"
- `year_start || 2000` 在 decade 计算中掩盖缺失数据
- `type_slug` 页面查询已 slug 优先并兼容旧显示名数据；数据库值仍需统一迁移为 slug
- 日本建筑的 `name_ja` 和日文分析字段经常为空

### Style（风格）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| slug | string | URL 标识符 |
| name_zh / name_en / name_ja | string \| null | 三语名称 |
| parent_slug | string \| null | 父风格 slug（用于层级关系） |
| era_slug | string \| null | 所属时代 |
| description | Record<string,string> \| null | 多语言描述 |
| keywords | string[] | 关键词标签 |

### Era（时代）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| slug | string | URL 标识符 |
| name_zh / name_en / name_ja | string \| null | 三语名称 |
| year_start / year_end | number \| null | 起止年份 |

### BuildingImage（建筑图片）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| building_id | string | 关联建筑 ID |
| url_original | string | 原始图片 URL |
| url_thumb_400 | string \| null | 400px 缩略图 |
| photographer | string \| null | 摄影师 |
| source | string | 图片来源 |
| license | string \| null | 许可类型 |
| source_url | string | 来源 URL |
| img_type | string | 图片类型（exterior/interior/floor_plan/...） |
| is_primary | boolean | 是否为主图 |

**图片治理体系：**
```
优先级（data.ts 中的实现顺序）：
  local-image-overrides.json (本地缓存)
  → image-overrides.json (手动策展远程URL)
  → Supabase images 表 (原始记录)
  → 无可信图片 (降级占位符)
```

## Junction Tables（v2 迁移）

```
architect_styles   (architect_id, style_slug)
building_styles    (building_id, style_slug)
architect_eras     (architect_id, era_slug)
building_eras      (building_id, era_slug)
style_eras         (style_id, era_slug)
architect_influences (architect_id, influenced_id, relationship_type)
```

## Curated Images（v3 迁移，未执行）

表 `curated_images` 的 SQL 已写好但未在 Supabase 创建。该表设计用于存储审核后的图片，状态机为：
- `storage_status`: external-verified-metadata → cached → rejected
- `quality_status`: candidate → approved → rejected

**当前状态**：数据继续以 `local-image-overrides.json` (198条) + `image-overrides.json` (39条) 形式存储在 JSON 文件中。22 个建筑在两个文件中均有条目（本地优先）。

## Portrait Images（人物肖像）

人物肖像当前不在 Supabase `images` 表中，因为该表只关联 `building_id`。第一阶段肖像随 `Architect Content Overlay` 存储，字段包含 `url`、`author`、`license`、`source_url` 和本地化 `alt`。

后续若迁移数据库，建议新增 `architect_images` 或通用 `entity_images` 表，支持：
- `entity_type`: architect/building/style/era
- `entity_slug`
- `image_role`: portrait/hero/supporting
- `url_original`, `photographer`, `license`, `source_url`

## 数据质量问题

| 问题 | 影响 | 优先级 |
|------|------|--------|
| bio_* < 20 字符的建筑师过多 | 建筑师生平页内容空洞 | 🟡 中 |
| name_ja 大量为空 | 日文版用户体验差 | 🟡 中 |
| year_start = null/0 的建筑被 decade=2000 处理 | 时间轴数据不准确 | 🟢 低 |
| location 字段 unused（类型为 unknown） | 地图功能无法实现 | 🟢 低 |
| european-court-of-human-rights 指向 .ogg 音频 | 图片数据错误 | 🟢 低 |
| 本地缓存目录仍有 1MB+ JPG | 部署包偏大 | 🟢 低 |

## Slug 规则

- building slug: 英文名 kebab-case，如 `empire-state-building`
- architect slug: 英文名 kebab-case，如 `le-corbusier`
- style slug: 英文名 kebab-case，如 `international-style`
- era slug: 英文名 kebab-case，如 `modern-era`
- **禁止** Wikidata Q-ID 作为 slug（如 `q118539028`）
- slug 不可更改（会破坏所有现有 URL）

## 关联查询性能注意事项

- `relations.ts` 使用全表摄入后 JS 端过滤，数据增长后需要改为 Supabase `.in()` 查询
- `getBuildingsWithCovers()` 在首页被重复调用（featured + all）
- `getFeaturedBuildingsWithCovers()` 内部无 LIMIT，拉取全部建筑后仅取前 N
