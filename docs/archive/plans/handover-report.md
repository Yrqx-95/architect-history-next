# 项目接手报告 — architect-history-next

> 产出日期：2026-05-26 | 基于 docs/ 全部文档 + src/ 核心代码 + 配置文件完整阅读

---

## 1. 当前项目是什么

**世界建筑史档案 (World Architecture Archive)** —— 一个以"建筑杂志感"为设计语言的三语（简体中文 / English / 日本語）建筑知识平台。

- **定位**：面向建筑爱好者的深度阅读档案库，提供建筑师生平、建筑作品分析、设计思想解读
- **数据规模**：~780+ 建筑、~400+ 建筑师、~7276 张图片、~3177 个静态页面
- **当前阶段**：Phase 4 内容精品化（75% 完成），Phase 5 数据层升级未启动
- **部署**：Vercel，ISR 策略（首页 3600s，详情页 86400s）

---

## 2. 技术栈

| 层级 | 技术 | 版本 | 备注 |
|------|------|------|------|
| 框架 | Next.js App Router | 16.2.6 | **⚠️ 非你训练数据中的版本，API 有破坏性变更** |
| 运行时 | React | 19.2.4 | Server Components 优先 |
| 数据库 | Supabase (PostgreSQL) | - | 公开 ANON_KEY，无认证 |
| CSS | Tailwind CSS v4 | 4.x | `@theme` 令牌系统，非旧版 config |
| 动画 | framer-motion | 12.40 | `whileInView` + `once:true` |
| 中文简繁 | opencc-js | 1.3 | 台湾繁体规则，localStorage 持久化 |
| 平滑滚动 | lenis | 1.3 | 全局平滑滚动 |
| 排版 | @tailwindcss/typography | 0.5 | `.prose` 文章正文 |
| 语言 | TypeScript | 5.x | 有 `as T` 滥用问题 |
| ESLint | ESLint 9 | - | `eslint.config.mjs` 扁平配置 |

---

## 3. 主要目录和文件用途

### 3.1 `docs/` — 项目文档（10 篇，必读）

| 文档 | 用途 | 关键程度 |
|------|------|---------|
| [`PROJECT.md`](docs/PROJECT.md:1) | 项目定位、设计哲学、禁止事项、开发原则 | 🔴 必读 |
| [`STATUS.md`](docs/STATUS.md:1) | 16 阶段开发历史、当前进度、待修复项、下一步 | 🔴 必读 |
| [`DATA_SCHEMA.md`](docs/DATA_SCHEMA.md:1) | ER 图、表字段定义、overlay 结构、slug 规则 | 🔴 必读 |
| [`CONTENT_RULES.md`](docs/CONTENT_RULES.md:1) | 内容写作规范、最低长度、结构模板、翻译优先级 | 🔴 必读 |
| [`FILE_STRUCTURE.md`](docs/FILE_STRUCTURE.md:1) | 目录结构注解、已知问题、重复/死代码清单 | 🟡 参考 |
| [`TECH_DEBT.md`](docs/TECH_DEBT.md:1) | 28 条技术债，按优先级排列 | 🟡 参考 |
| [`PERFORMANCE.md`](docs/PERFORMANCE.md:1) | 性能现状、已知问题、缓存策略 | 🟡 参考 |
| [`DESIGN_TOKENS.md`](docs/DESIGN_TOKENS.md:1) | 颜色/字体/间距/圆角/阴影/动画令牌 | 🟡 参考 |
| [`UI_RULES.md`](docs/UI_RULES.md:1) | 组件结构、卡片规范、搜索/浏览 UX、响应式 | 🟡 参考 |
| [`AI_AGENT_RULES.md`](docs/AI_AGENT_RULES.md:1) | AI 开发规范、禁止行为、已知陷阱 | 🔴 必读 |

### 3.2 `src/lib/` — 核心库（⚠️ 修改需特别谨慎）

| 文件 | 职责 | 禁止随意改? |
|------|------|:---:|
| [`types.ts`](src/lib/types.ts:1) | 所有实体类型、关系类型、displayName/displayText/lifeSpan 工具函数 | ✅ |
| [`data.ts`](src/lib/data.ts:1) | Supabase 数据访问层，300s TTL 内存缓存，图片覆盖合并逻辑 | ✅ |
| [`i18n.ts`](src/lib/i18n.ts:1) | 集中式三语字典（80+ key），`t(lang, key)` 函数 | ✅ |
| [`relations.ts`](src/lib/relations.ts:1) | 知识图谱关系查询，React `cache()` 请求级缓存，全表摄入+JS 过滤 | ✅ |
| [`image-policy.ts`](src/lib/image-policy.ts:1) | 图片许可证校验、可信来源判断 | ✅ |
| [`quality.ts`](src/lib/quality.ts:1) | 内容质量过滤（乱码检测、Wikidata ID、完整性检查） | ✅ |
| [`architect-content.ts`](src/lib/architect-content.ts:1) | 20 位建筑师长文 overlay（~1548 行），`localizedContent()` 回退链 | ⚠️ 新增 overlay 时编辑 |
| [`taxonomy.ts`](src/lib/taxonomy.ts:1) | slug/name 匹配工具，用于 style/era 关联解析 | ✅ |
| [`image-loader.ts`](src/lib/image-loader.ts:1) | 自定义 Next.js 图片 loader（代理外部图片） | ⚠️ 域名列表与 proxy-image.ts 重复 |
| [`proxy-image.ts`](src/lib/proxy-image.ts:1) | `isExternalImage()` / `proxySrc()` | ⚠️ 域名列表与 image-loader.ts 重复 |
| [`supabase.ts`](src/lib/supabase.ts:1) | Supabase 客户端（非空断言，公开 anon key） | ⚠️ |
| `local-image-overrides.json` | 198 条本地缓存图片覆盖 | 通过脚本管理 |
| `image-overrides.json` | 39 条手工精选远程图片覆盖 | 手动维护 |

### 3.3 `src/app/` — 路由层

| 路由 | 文件 | ISR | 说明 |
|------|------|-----|------|
| `/` (重定向) | [`proxy.ts`](src/proxy.ts:1) | - | 语言前缀检测 + Accept-Language 协商 |
| `/[lang]` | `page.tsx` | 3600s | 首页：CinematicHero + 精选建筑 + 建筑师索引 + 时代/风格 + 引导 |
| `/[lang]/architect/[slug]` | `page.tsx` | 86400s | 建筑师详情：肖像 + 元数据 + 长文 overlay(如有) + 代表作 + 关系图 |
| `/[lang]/building/[slug]` | `page.tsx` | 86400s | 建筑详情：ImageGallery + PullQuote + 深度分析(空间/光线/动线) + 元数据面板 |
| `/[lang]/browse/...` | 5 个页面 | - | 分类浏览：按国家/时代/风格/类型 + 总览 |
| `/[lang]/search` | `page.tsx` | - | 搜索页（CSR 调用 `/api/search`） |
| `/[lang]/timeline` | `page.tsx` | - | 时间轴 |
| `/api/image-proxy` | `route.ts` | 86400s | Edge Runtime，代理 wikimedia/unsplash 图片（中国可访问） |
| `/api/search` | `route.ts` | - | 全文本搜索 API，建筑师 12 条 + 建筑 18 条 |

### 3.4 `src/components/` — 组件层（32 个，⚠️ 无分类平铺）

**核心组件**：
| 组件 | 类型 | 说明 |
|------|------|------|
| `SafeImage` | Client | 包装 next/image + proxySrc |
| `BuildingCard` | Client | 建筑卡片：图片 + 建筑师 + 名称 + 地点/年份 |
| `PageShell` | Server | 页面容器：container-content + page-enter 动画 |
| `CinematicHero` | Client | 首页大图 Hero（原生 `<img>`） |
| `EditorialImage` | Client | 编辑图片（外部图片，降级处理） |
| `ImageGallery` | Client | 建筑详情图库（250 行，太大） |
| `ImageAttribution` | Server | 图片署名（photographer + license + source） |
| `ImageBreak` | Server | 文章内全出血插图 |
| `PullQuote` | Server | 引用块 |
| `Reveal` | Client | 滚动触发入场动画 |
| `MetadataPanel` | Server | 技术参数表 |
| `ArchitectDeepArticle` | Server | 建筑师长文 overlay 渲染 |
| `ArticleSection` | Server | 文章小节 |
| `Breadcrumb` | Server | 面包屑 |
| `SectionHeading` | Server | section 标题 |
| `ContinueExploring` | Server | "继续探索"推荐区 |
| `MobileNav` | Client | 移动端抽屉导航 |
| `PageTransition` | Client | 页面切换动画 |
| `SmoothScroll` | Client | Lenis 平滑滚动 |
| `ChineseScriptProvider` | Client | 简繁切换 Context |
| `ChineseScriptToggle` | Client | 简/繁切换按钮 |
| `LanguageSwitcher` | Client | 语言切换（zh/en/ja） |
| `ThemeToggle` | Client | 主题切换（system/light/dark） |
| `SearchResults` | Client | 搜索结果容器 |
| `search/` (7 个文件) | - | 搜索子组件（已拆分） |

### 3.5 脚本与数据

| 目录/文件 | 用途 |
|-----------|------|
| `scripts/audit-images.mjs` | 图片审计：检查许可证、来源 |
| `scripts/build-image-registry.mjs` | 构建图片注册表 |
| `scripts/cache-curated-images.mjs` | 缓存精选图片到本地 |
| `db/image-registry.generated.json` | 4.1MB 图片注册表（⚠️ 应入 .gitignore） |
| `db/migrations/` | v2 关联表、v3 精选图（未执行） |
| `public/images/curated/` | ~90+ 本地缓存图片（⚠️ 应入 .gitignore） |

---

## 4. Codex / 前任 Agent 已完成的工作

根据 [`STATUS.md`](docs/STATUS.md:124) 记录的 16 个阶段（2026-05-25 至今）：

| 阶段 | 内容 |
|------|------|
| **Phase 1: Bug 修复** | 图片加载、构建错误、搜索崩溃、暗色模式 |
| **Phase 2: 文档系统** | 10 篇 docs 文档建立 |
| **Phase 3: 代码清理** | 移除死代码、统一命名、修复 imports |
| **Phase 4: 检测同步** | 质量检测、数据完整性验证 |
| **Phase 5: 高优技术债** | 关键 bug 修复 |
| **Phase 6: SEO 修复** | 语言根布局、canonical URL、sitemap |
| **Phase 7: 搜索改造** | 搜索 UI/UX 重做，支持多维查询 |
| **Phase 8: 颜色对比** | 可读性与 WCAG 对比度修复 |
| **Phase 9: 主题系统** | 语义主题 token + "奢侈品极简" UI 重做 |
| **Phase 10: 内容精品化 ①** | 第一批 5 位建筑师长文（Kahn, Corbusier, Wright, Mies, Ando） |
| **Phase 11: 简繁+导航** | 中文简繁切换 + 移动端导航重做 |
| **Phase 12: 移动端+内容 ②** | 移动端首屏优化 + 第二批 5 位（Hadid, Piano, Pei, Foster, Barragan） |
| **Phase 13: 语义修正** | 人物字段语义修正 + 分类浏览层级化 |
| **Phase 14: 反馈修复** | 截图反馈修复 + 分类可用性补强 |
| **Phase 15: 内容精品化 ③** | 第三批 5 位（Aalto, Scarpa, Pallasmaa, Holl, Siza） |
| **Phase 16: 内容精品化 ④** | 第四批 5 位（Jacobsen, Utzon, Lewerentz, Fehn, Tange） |

**当前 architect-content.ts 中 20 位建筑师**：
Kahn, Le Corbusier, Wright, Mies van der Rohe, Tadao Ando, Zaha Hadid, Renzo Piano, I.M. Pei, Norman Foster, Luis Barragán, Alvar Aalto, Carlo Scarpa, Juhani Pallasmaa, Steven Holl, Álvaro Siza, Arne Jacobsen, Jørn Utzon, Sigurd Lewerentz, Sverre Fehn, Kenzo Tange

---

## 5. 当前已完成的功能

- ✅ 三语路由系统（zh/en/ja）+ Accept-Language 自动协商
- ✅ 中文简繁页内切换（台湾繁体，opencc-js）
- ✅ 建筑师详情页：Supabase 数据 + overlay 长文（20 位）
- ✅ 建筑详情页：图库、深度分析（空间/光线/动线）、技术参数、PullQuote
- ✅ 分类浏览：按时代/风格/国家/类型 + 总览
- ✅ 全文本搜索：建筑师+建筑，支持多维过滤
- ✅ 时间轴：建筑师编年 + 建筑编年
- ✅ 图片代理：Edge Runtime 代理 wikimedia/unsplash
- ✅ 图片治理：审计→注册表→缓存 pipeline
- ✅ 主题系统：语义 token（paper/warm/charcoal/clay）+ 三态切换
- ✅ 移动端响应式：单列布局、抽屉导航、触控优化
- ✅ 设计系统：DESIGN_TOKENS.md + UI_RULES.md 完整规范
- ✅ 首页：CinematicHero + 精选建筑 + 建筑师索引 + 时代/风格
- ✅ 知识图谱关系：architect↔building↔style↔era 四维关联
- ✅ ISR 部署：Vercel CDN + 300s 内存缓存

---

## 6. 当前明显存在的问题

### 🔴 高优先级
1. **部分旧数据 type_slug 用显示名而非 slug**（如 `"博物馆"` 而非 `"museum"`）—— 需迁移
2. **Proxy 语言匹配策略简单** —— 仅检查路径前缀，未用更复杂协商
3. **首页 358 行过大** —— 需拆分组件
4. **`getBuildingsWithCovers()` 在首页被重复调用** —— 浪费数据库查询
5. **ImageGallery 250 行太大** —— 需拆分
6. **`data.ts` 与 `relations.ts` 关系查询逻辑重复**
7. **两个图片域名列表重复**（image-loader.ts 和 proxy-image.ts）

### 🟡 中优先级
8. **组件目录无分类** —— 32 个文件平铺在 `src/components/`
9. **关系查询全表摄入** —— 每次查询都加载全部数据后在 JS 中过滤
10. **`getFeaturedBuildingsWithCovers()` 无 LIMIT** —— 先拿全量再截断
11. **搜索 API 缺少缓存和排序策略**
12. **图片系统三层不一致**（Supabase + curated + local 覆盖合并逻辑分散）
13. **`local-image-overrides.json` 数据质量问题** —— 部分条目可能引用了不存在的图片文件

### 🟢 低优先级
14. **TypeScript `as T` 滥用**
15. **无自动化测试**
16. **`Building.location` 类型为 `unknown`**
17. **v3 数据库迁移未执行**
18. **`image-registry.generated.json` 和 `public/images/curated/` 应入 .gitignore**
19. **缺少 v1 数据库迁移记录**
20. **原生 `<img>` 仍保留在首页 hero 和编辑图片组件**

---

## 7. 哪些地方不要随便改

按照 [`AI_AGENT_RULES.md`](docs/AI_AGENT_RULES.md:118) 核心架构文件清单：

| 文件 | 原因 |
|------|------|
| [`src/lib/types.ts`](src/lib/types.ts:1) | 所有类型定义来源，修改会影响全站 |
| [`src/lib/data.ts`](src/lib/data.ts:1) | 数据访问层，缓存逻辑、图片覆盖合并都在此 |
| [`src/lib/i18n.ts`](src/lib/i18n.ts:1) | 三语字典（80+ key），新增 key 必须三语齐全 |
| [`src/lib/relations.ts`](src/lib/relations.ts:1) | 知识图谱查询，全表摄入+JS过滤模式不能随意改为 SQL JOIN |
| [`src/lib/image-policy.ts`](src/lib/image-policy.ts:1) | 许可证校验逻辑，CC BY-NC 拦截规则不可删除 |
| [`src/lib/quality.ts`](src/lib/quality.ts:1) | 内容质量过滤，被多处引用 |

**此外**：
- `next.config.ts` 中的图片域名配置影响全局图片加载
- `src/proxy.ts` 中的语言协商逻辑影响所有用户的首页跳转
- `src/app/globals.css` 中的 `@theme` 令牌是设计系统的基础
- 不要创建重复组件，优先复用 `BuildingCard` / `SafeImage` / `PageShell`
- 不要在组件中硬编码文本，必须用 `t(lang, key)` 或 `displayText`/`displayName`
- 不要修改 Supabase 数据库 schema（没有迁移权限或迁移未执行）
- 不要 force push

---

## 8. 下一步最合理的开发顺序

基于 [`STATUS.md`](docs/STATUS.md:300) 的下一步建议，结合当前上下文：

### 立即可做（Batch 5 建筑师内容）
1. **切换到 Code 模式**，通过 Supabase 客户端验证 5 位候选人的 slug 存在性
2. 在 [`architect-content.ts`](src/lib/architect-content.ts:1) 中新增 5 个 overlay：
   - Antoni Gaudí (`antoni-gaudi`) —— 5 作品，3 本地缓存
   - Walter Gropius (`walter-gropius`) —— 3 作品，2 本地缓存
   - Louis Sullivan (`louis-sullivan`) —— 3 作品，1 本地缓存
   - Eero Saarinen (`eero-saarinen`) —— 4 作品，2 本地缓存
   - Peter Zumthor (`peter-zumthor`) —— 4 作品，0 本地缓存
3. 按 [`CONTENT_RULES.md`](docs/CONTENT_RULES.md:46) 规范编写：summary + ≥3 sections + core_ideas + portrait + 3 representative_works + sources
4. `npm run build` → 本地验证 → Vercel 部署 → 更新 [`STATUS.md`](docs/STATUS.md:1)

### 短期（后续 1-2 批）
5. **type_slug 迁移** —— 将显示名转为 slug 格式
6. **图片域名列表去重** —— 统一 image-loader.ts 和 proxy-image.ts
7. **`getBuildingsWithCovers()` 去重调用** —— 首页和 relations 共享缓存
8. **组件目录分类重组** —— 按 FILE_STRUCTURE.md 建议分为 cards/ layout/ search/ 等

### 中期
9. **v3 数据库迁移执行** —— curated_images 表
10. **首页拆分** —— 358 行 → 多个 section 组件
11. **ImageGallery 拆分** —— 250 行 → 子组件
12. **搜索 API 加缓存和排序**

### 长期
13. **自动化测试**
14. **TypeScript 严格模式** —— 消除 `as T` 和 `unknown`
15. **Phase 5 完整启动** —— 建筑深度内容、时代/风格编辑内容

---

## 9. 需要确认的问题

1. **Batch 5 建筑师优先级**：以上 5 位（Gaudí, Gropius, Sullivan, Saarinen, Zumthor）是否确认？还是有其他优先人选？

2. **Supabase 访问方式**：当前使用公开 ANON_KEY，是否需要确认这 5 位的 slug 在数据库中确实存在？（可通过 Code 模式执行 Supabase 查询验证）

3. **图片缓存策略**：Zumthor 的 4 个作品在 `local-image-overrides.json` 中没有缓存条目。是否需要先运行 `npm run images:cache` 补充缓存，还是直接使用 Supabase 远程图片？

4. **部署频率**：是否每完成一批（5 位）就部署一次，还是积累多批后统一部署？

5. **git 仓库状态**：当前是否有未提交的修改？（Architect 模式无法执行 git 命令，请在终端中运行 `git status --short` 确认）

6. **Vercel 部署权限**：是否可以直接执行 `vercel deploy --prod`，还是需要通过其他流程？

7. **内容版权审查**：新增长文内容是否有版权来源要求？目前规范是"原创改写，附参考来源"，是否需要更严格审查？

---

> 📋 **建议**：请先确认以上问题后，在 Code 模式中从"验证 Supabase 数据 → 编写 5 个 overlay → 构建 → 部署 → 更新 STATUS.md"开始执行。
