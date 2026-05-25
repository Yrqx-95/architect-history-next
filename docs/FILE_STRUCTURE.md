# FILE_STRUCTURE.md — 目录结构与文件说明

> 基于实际项目扫描，标注合理/混乱之处

## 总览

```
architect-history-next/
├── docs/                  # 📖 项目文档（本目录）
├── src/
│   ├── app/              # 🌐 Next.js App Router
│   │   ├── [lang]/       #   多语言路由组
│   │   │   ├── architect/[slug]/  # 建筑师详情
│   │   │   ├── building/[slug]/   # 建筑详情
│   │   │   ├── browse/            # 分类浏览
│   │   │   │   ├── country/[slug]/
│   │   │   │   ├── era/[slug]/
│   │   │   │   ├── style/[slug]/
│   │   │   │   └── type/[slug]/
│   │   │   ├── search/
│   │   │   └── timeline/
│   │   ├── api/          # API Routes
│   │   │   ├── image-proxy/  # Edge 图片代理
│   │   │   └── search/       # 搜索 API（档案检索）
│   │   ├── globals.css   # 🎨 设计系统（599行）
│   │   └── [lang]/layout.tsx # 根 HTML/body 布局，按语言输出 lang
│   ├── components/       # 🧩 32 个组件（多数平铺，search 已分目录）
│   └── lib/              # 📚 核心库（11 个文件）
│       ├── data.ts           # 数据访问层
│       ├── types.ts          # 类型定义
│       ├── relations.ts      # 关系图谱查询
│       ├── quality.ts        # 内容质量筛选
│       ├── i18n.ts           # 国际化
│       ├── image-policy.ts   # 图片许可策略
│       ├── image-loader.ts   # Next.js 图片 loader
│       ├── proxy-image.ts    # 图片代理辅助
│       ├── supabase.ts       # Supabase 客户端
│       ├── image-overrides.json      # 手动策展图片 (39条)
│       └── local-image-overrides.json # 本地缓存映射 (198条)
├── public/
│   └── images/curated/  # 🖼️ 本地缓存图片 (218 文件, 76MB)
├── scripts/             # 🔧 图片管理脚本
│   ├── audit-images.mjs
│   ├── build-image-registry.mjs
│   └── cache-curated-images.mjs
├── db/                  # 🗄️ 数据库
│   ├── migrations/
│   │   ├── v2-junction-tables.sql
│   │   └── v3-curated-image-registry.sql
│   ├── image-registry.generated.json  # ⚠️ 4.1MB 生成文件
│   └── image-cache-report.json
├── next.config.ts
├── vercel.json
├── tsconfig.json
├── package.json
├── .env.local           # ⚠️ 含 service_role key，勿提交
├── CLAUDE.md → AGENTS.md
└── README.md
```

## 各目录详细分析

### `src/app/` — 路由层 ✅

**结构合理。** 使用 Next.js App Router 约定，`[lang]` 动态段处理三语路由。每个路由有明确的职责。SSG/ISR 策略正确使用。

**问题：**
- `src/proxy.ts` 已负责语言前缀重定向与 Accept-Language 协商
- `/browse/country` 索引页已实现，国家详情页静态参数从建筑数据生成
- 顶层 `layout.tsx` / `page.tsx` 已删除，根布局在 `[lang]` 段中以保证 `<html lang>` 正确

### `src/components/` — 组件层 ⚠️

**多数文件仍平铺在单一目录中，搜索组件已先行拆入 `components/search/`。** 这是当前最大的结构问题之一。

**合理：** 大多数组件职责清晰、体积适中（<70 行）。SafeImage 作为 next/image 的统一包装器是好的抽象。

**混乱之处：**
- **分类不完整**：导航组件（MobileNav, LanguageSwitcher, Breadcrumb, ThemeToggle）、内容组件（BuildingCard, ArchitectCard）、布局组件（PageShell, ArticleSection）、特效组件（Reveal, PageTransition, SmoothScroll）仍在顶层
- **ImageGallery.tsx (250 行)** 体积过大，SearchResults 已拆为 110 行 shell + `components/search/` 展示组件
- **ContinueExploring.tsx** 的 `ExploreGroup.items[].image` 字段定义但从未使用（死代码）

**推荐重构：**
```
components/
├── layout/      PageShell, ArticleSection, SectionHeading
├── navigation/  MobileNav, LanguageSwitcher, Breadcrumb, ThemeToggle
├── cards/       BuildingCard, ArchitectCard, ContinueExploring
├── image/       SafeImage, EditorialImage, ImageGallery, ImageBreak,
│                ImageAttribution
├── search/      SearchInput, SearchSuggestions, SearchSummary,
│                SearchEmptyState, SearchArchitectResults, SearchBuildingResults
├── animation/   Reveal, PageTransition, SmoothScroll
├── ui/          Badge, MetadataPanel, PullQuote
└── home/        CinematicHero
```

### `src/lib/` — 核心库 ⚠️

**职责相对清晰，但存在重复和 bug。**

| 文件 | 评价 |
|------|------|
| `types.ts` (249行) | ✅ 完整，但 Building.location 类型为 unknown |
| `data.ts` (169行) | ✅ 数据层缓存合理，但类型转换过多 (as T) |
| `relations.ts` (131行) | ⚠️ 与 data.ts 有重复逻辑；slug 匹配 bug 已修复 |
| `quality.ts` (90行) | ⚠️ hasProperName 与 hasValidName 重复 |
| `i18n.ts` (105行) | ✅ 集中式管理好，回退链与 displayText 不一致 |
| `image-policy.ts` (28行) | ✅ CC BY-NC 前缀误判已修复 |
| `image-loader.ts` (35行) | ⚠️ 与 proxy-image.ts 域名列表重复 |
| `proxy-image.ts` (22行) | ⚠️ 同上 |
| `supabase.ts` (10行) | ✅ 简洁，但环境变量用非空断言 |
| `image-overrides.json` | ⚠️ 与 local-image-overrides.json 有重叠条目 |
| `local-image-overrides.json` | ⚠️ 1190 行，存在无效 URL（.ogg 文件作为图片） |

### `scripts/` — 工具脚本 ✅

结构合理。三个脚本组成图片治理流水线：审计 → 注册表 → 缓存。

### `db/` — 数据库 ⚠️

**问题：**
- `image-registry.generated.json` (4.1MB) 是生成产物，不应提交到 Git
- `image-cache-report.json` 内容过时
- 缺少 v1 迁移（基础表创建 SQL 不在版本控制中）
- v3 迁移写了但未在 Supabase 执行

### `public/images/curated/` — 图片缓存 ⚠️

218 个文件，76MB。属于构建产物，应在 `.gitignore` 中（需确认）。

## 重复与死代码

### 确认重复

| 位置 | 内容 | 建议 |
|------|------|------|
| `image-loader.ts` + `proxy-image.ts` | 外部图片域名列表 | 抽取为共享常量 |
| `data.ts` + `relations.ts` | 关系查询逻辑 | 仅保留 relations.ts |
| `quality.ts` | `hasProperName` ≈ `hasValidName` | 合并为一个 |
| `image-overrides.json` ∩ `local-image-overrides.json` | 重叠条目 | 明确优先级规则 |

### 确认死代码

| 位置 | 内容 | 建议 |
|------|------|------|
| `ContinueExploring.tsx` | `ExploreGroup.items[].image` 字段 | 删除或实现 |
| `/[lang]/map` | 路由未实现 | 空目录已删除，后续如需要再实现 |
| `db/image-cache-report.json` | 过时快照 | 加入 .gitignore |

### 命名问题

- `BrowseListing` 与 `BrowseListing` 组件用途不够直观
- `q118539028` 作为 building slug 暴露了 Wikidata ID

## .gitignore 建议

应确保以下路径不在版本控制中：
```
public/images/curated/
db/image-registry.generated.json
db/image-cache-report.json
.env.local
.next/
node_modules/
```
