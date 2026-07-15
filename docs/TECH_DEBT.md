# TECH_DEBT.md — 技术债清单

> 按优先级分级：🔴 高 → 🟡 中 → 🟢 低  
> 每个条目包含：问题、位置、影响、建议修复方向

## 2026-07-15 生产发布后确认的运维债

### A. Cloudflare token 的 route 管理权限不完整

- **证据**：Reviewed production release `29349915435` 成功部署 `architect-history-next`，但 Wrangler 报告 token 没有 `All Zones` 权限。
- **影响**：当前目标 routes 已成功部署并保持，但以后跨 zone 管理 routes 时可能无法完整读取或维护既有 route。
- **下一步**：单独补齐最小必要的 Cloudflare zone 权限并重新验证；不在文档同步或 PR #165 范围内处理。

### B. GitHub Actions 使用 Node 20 的 deprecation warning

- **证据**：release run 对 `actions/checkout@v4` 与 `actions/setup-node@v4` 报 Node.js 20 deprecation warning；runner 强制使用 Node 24，本次 workflow 成功。
- **影响**：未来 runner 兼容策略变化可能使发布工作流出现新的 warning 或失败。
- **下一步**：单独评估 action 版本升级与 release workflow 回归，不在本阶段修改 workflow。

### C. Full WebKit E2E 尚未进入 CI

- **证据**：PR #165 只做了 390px WebKit 定向检查；完整 Playwright E2E 仍为 Chromium 29 / 29，WebKit 未永久加入项目或 release workflow。
- **影响**：跨浏览器键盘、布局和字体差异仍有未覆盖面。
- **下一步**：单独评估 CI 安装时间、缓存和失败诊断成本，再决定是否加入 WebKit 项目。

### D. 图片权威未确定前不迁移

- **证据**：当前发布与状态同步没有改变图片权威，也没有执行 curated image registry 迁移。
- **影响**：`images` 表、JSON 注册表和 curated image 迁移之间仍需保持清晰边界。
- **下一步**：先完成图片权威决策和 reviewed migration 设计；在此之前不得把“迁移 v3 并导入 JSON”当作当前默认动作。

### E. E5 release 后的新增运行时与内容债

- **Full E2E 的 NoFallbackError 噪音**：E5 release 的完整 E2E 为 33 / 33，但日志仍出现过 `NoFallbackError`。它没有阻塞本次发布，仍需要单独定位触发路径，不应被历史 warning 误写成 release failure。
- **内部 RSC glossary 预取取消**：两个 zh detail QA 观察到 `net::ERR_ABORTED` 的内部 Next RSC glossary prefetch；页面仍 HTTP 200、主体完整且无 pageerror，精确根因尚未确认。先保留观察，不在此 docs-only PR 中修改 fetch/retry。
- **Parc.1 英文名称一致性**：本次 reviewed migration 有意只修改 `name_zh` / `name_ja` 等字段；生产英文显示仍为 `Parc1`，若要统一为 `Parc.1` 需要另一个 reviewed decision。
- **NMWA image authority / crop**：当前生产仍使用已有 Alexander Abero / Unsplash gallery，image selection 与 crop authority 尚未关闭；不因当前 QA 通过就宣称图片治理完成。
- **RSHP 外部可达性不确定**：bounded curl 对 RSHP 官方 URL 返回 403；页面中的 official source link 存在。该结果记录为外部反爬/权限不确定，不写成官方来源失效。

---

## 🔴 高优先级（影响用户体验或数据正确性）

### 当前：Next.js 内嵌 PostCSS 的中等风险告警

- **位置**：`next@16.2.6` 的传递依赖 `postcss`
- **状态**：2026-07-10 `npm audit --omit=dev` 报告 2 个 moderate、0 high、0 critical。
- **边界**：这是构建链风险，不是用户请求能直接触发的站内 API 漏洞；`npm audit fix --force` 没有给出安全的兼容修复路径。
- **下一步**：单开一次受控 Next.js 升级，先在分支跑 `typecheck`、`lint`、全量 e2e 和生产构建，再更新生产版本。

### 1. 历史：孤儿 style_slugs 曾阻断数据审计（当前已解除）

- **位置**：Supabase `buildings.style_slugs` + `styles.slug`
- **问题**：2026-06 时曾有 22 个 style assignments 指向不存在的 `styles.slug`
- **影响**：搜索、筛选、推荐和后续全文索引都会把错误 taxonomy 固化进去
- **进展**：A 类已通过 `scripts/style-slug-aliases.json` 显式映射并执行 `npm run data:normalize-styles -- --write`；135 个建筑、191 条 assignment 已修正，并生成 `db/migrations/v5-normalize-style-slugs.sql`
- **当前状态**：2026-07-10 的 `npm run data:audit` 为 0 error。本条保留为数据迁移记录，不再视为发布阻断。

### 2. 部分旧数据仍用显示名作为 type_slug（2026-06-08 已修复）

- **位置**：`src/app/[lang]/browse/type/[slug]/page.tsx`
- **问题**：页面已 slug 优先并兼容旧显示名，数据库中曾有大量旧显示名
- **进展**：已新增 `db/migrations/v4-building-type-taxonomy-additions.sql`，补充 `civic-public` / `research-institute` / `observation`
- **状态**：已执行 `npm run data:normalize-types -- --write`，135 个建筑完成迁移；当前 dry-run 为 0 planned / 0 unmapped
- **剩余**：确认线上稳定后，可再考虑移除类型页里的旧显示名兼容逻辑

### 3. Proxy 语言匹配策略仍较简单

- **位置**：`src/proxy.ts`
- **问题**：已支持 Accept-Language 的 zh/en/ja 协商，但不处理区域域名、用户显式偏好 cookie 或缓存 vary 策略
- **影响**：复杂部署场景下语言入口仍不够精细
- **修复**：按需要引入语言偏好 cookie、`Vary: Accept-Language` 或域名级语言策略

---

## 🟡 中优先级（代码质量 / 可维护性）

### 4. 两个图片域名列表重复（2026-07-03 已清理）

- **位置**：旧 `src/lib/image-loader.ts` + `src/lib/proxy-image.ts`
- **影响**：新增图片来源需同步修改两处
- **修复**：旧 `image-loader.ts` 已移除。当前图片路径统一走 `SafeImage` -> `proxy-image.ts` -> `image-domains.ts`，API route 也复用同一个域名判断。

### 5. `data.ts` 与 `relations.ts` 关系查询逻辑重复（2026-07-03 已清理）

- **位置**：`src/lib/data.ts` (getRelatedArchitects, getRelatedBuildings) + `src/lib/relations.ts`
- **影响**：同一类查询有两套实现，修改时可能不同步
- **修复**：已从 `data.ts` 移除未引用的旧关系导出；建筑详情仍使用的关联建筑查询已收进 `relations.ts` 内部 helper。

### 6. `getBuildingsWithCovers()` 在首页被重复调用（2026-06-08 已修复）

- **位置**：`src/app/[lang]/page.tsx`
- **问题**：`getFeaturedBuildingsWithCovers()` 内部调用 `getBuildingsWithCovers()`，首页又单独调用一次
- **影响**：冗余 Supabase 查询，增加首页加载时间
- **修复**：已抽出 `selectFeaturedBuildingsWithCovers()`，首页只取一次 `getBuildingsWithCovers()`，再从同一份数据中筛选 featured

### 7. 组件目录无分类（24 个文件平铺）

- **位置**：`src/components/`
- **影响**：随组件增加查找和维护困难
- **修复**：按功能分目录（layout/ navigation/ cards/ image/ search/ animation/ ui/ home/）

### 8. ImageGallery 体积过大（2026-06-08 已修复）

- **位置**：`src/components/ImageGallery.tsx`
- **问题**：混合图片展示、缩略图列表、灯箱、键盘导航、触摸滑动
- **影响**：难以单独修改某个功能，测试困难
- **修复**：已拆分为主控组件和 `src/components/image-gallery/` 下的 labels / ImageSkeleton / GalleryMainImage / ThumbnailStrip / Lightbox，外部 props 保持不变

### 9. Search 结果组件已拆分，仍可继续精炼

- **位置**：`src/components/SearchResults.tsx`, `src/components/search/`
- **现状**：SearchResults 已从 229 行拆为 110 行 client shell，展示层拆为 SearchInput / SearchSuggestions / SearchSummary / SearchEmptyState / SearchArchitectResults / SearchBuildingResults
- **剩余问题**：状态和请求逻辑仍集中在 SearchResults；后续加入筛选、分页或高亮匹配时可继续抽 hook
- **修复**：需要时抽取 `useSearchResults()`，并为搜索结果排序添加测试

---

## 🟢 低优先级（改进 / 优化）

### 10. `Building.location` 类型为 `unknown`

- **位置**：`src/lib/types.ts`
- **影响**：放弃类型检查
- **修复**：定义 `GeoPoint` 或 `{ lat: number; lng: number } | null`

### 11. `quality.ts` 中 hasProperName 与 hasValidName 重复

- **位置**：`src/lib/quality.ts`
- **影响**：相似但不完全相同的逻辑分散
- **修复**：合并为一个函数，通过参数控制严格程度

### 12. `i18n.ts` 与 `types.ts` 的回退链不一致

- **位置**：`t()` 回退 zh → key；`displayText()` 回退 en → zh → first value
- **影响**：边缘情况下翻译回退行为不一致
- **修复**：统一回退链为：指定语言 → en → zh → key

### 13. `supabase.ts` 环境变量用非空断言（2026-06-08 已修复）

- **位置**：`src/lib/supabase.ts`
- **影响**：运行时变量缺失时静默传递 undefined
- **修复**：已添加 `requiredEnv()`，缺少 Supabase URL 或 anon key 时会抛出明确错误

### 14. `local-image-overrides.json` 数据质量问题（2026-06-08 已修复）

- **位置**：`src/lib/local-image-overrides.json`
- **问题**：`european-court-of-human-rights` 指向音频/文件类型图标，`basilica-palladiana` 的来源与作者信息不完整
- **修复**：已移除错误的人权法院本地覆盖；数据层会通过 `isDisplayableImageUrl()` 拒绝 `.ogg` / `.svg` / 文件类型图标作为封面和画廊图片；Basilica Palladiana 已补正 Wikimedia Commons 来源、作者和许可证

### 15. `ContinueExploring.tsx` 死字段（2026-06-08 已修复）

- **位置**：`src/components/ContinueExploring.tsx`
- **问题**：`ExploreGroup.items[].image` 定义但未使用
- **修复**：已删除该未使用字段，避免后续误以为组件会渲染图片

### 16. `image-overrides.json` 中 chrysler-building URL 不准确

- **位置**：`src/lib/image-overrides.json`
- **问题**：克莱斯勒大厦的图片实际上是曼哈顿天际线全景，建筑的辨识度低
- **建议**：后续替换为克莱斯勒大厦特写图片

### 17. v3 数据库迁移未执行

- **位置**：`db/migrations/v3-curated-image-registry.sql`
- **问题**：SQL 写了但表未在 Supabase 创建
- **影响**：curated_images 数据继续以 JSON 文件形式存在
- **当前决定**：图片权威未确定前不执行迁移，也不将 JSON 数据导入生产。待权威决策、dry-run、rollback 和 release 门禁齐备后再单独评估。

### 18. `db/image-registry.generated.json` 应加入 .gitignore

- **问题**：4.1MB 生成文件在版本控制中
- **影响**：仓库膨胀，每次重新生成都有大 diff
- **修复**：加入 .gitignore，在构建流程中生成

### 19. `public/images/curated/` 应加入 .gitignore

- **问题**：218 个文件 (76MB) 的生成产物
- **修复**：加入 .gitignore 或迁移到对象存储

### 20. 缺少 v1 数据库迁移（2026-06-08 已补 baseline）

- **问题**：基础表 (buildings, architects, images, styles, eras) 的创建 SQL 不在版本控制中
- **影响**：无法从零重建数据库
- **状态**：已新增 `db/migrations/v1-baseline.sql`，覆盖当前应用使用的核心表、索引、外键与公开 select RLS policy
- **剩余**：生产灾备前仍需用 live DB 的 schema-only dump 对照并补齐 Supabase 平台侧 grants / policies / functions 差异

---

## 性能相关

### 21. 关系查询全表摄入（部分已优化）

- **位置**：`src/lib/relations.ts` — 每个函数拉取全部表数据再 JS 过滤
- **影响**：随着数据增长，内存和响应时间线性增加
- **已完成**：建筑详情页 related buildings 已通过 `getRelatedBuildingsForBuilding()` 按 architect/type/style 小查询下推
- **剩余**：建筑师详情、style / era / type 列表页仍需逐步减少全表摄入

### 22. `getFeaturedBuildingsWithCovers()` 无 LIMIT

- **位置**：`src/lib/data.ts`
- **问题**：内部调用 `getBuildingsWithCovers()` 获取全部建筑，然后仅取前 N 个
- **建议**：在数据库层面添加 LIMIT

### 23. 请求级缓存无跨请求共享

- **位置**：`src/lib/data.ts` — `cached()` 使用 Map，每个请求周期独立
- **影响**：高频访问的 eras/styles 数据在每次请求时重新获取
- **建议**：使用 Next.js `unstable_cache` 或 React `cache()` 配合 ISR

### 24. 原生 `<img>` 保留在首页/编辑图片组件（已完成）

- **位置**：`src/components/CinematicHero.tsx`, `src/components/EditorialImage.tsx`
- **状态**：2026-06-08 已迁移到 `next/image`
- **验证**：`npm run lint` 已无 `@next/next/no-img-element` warning

---

## 扩展风险

### 25. 搜索 API 仍缺数据库全文索引

- **位置**：`src/app/api/search/route.ts`
- **已完成**：短 TTL 内存缓存、`Cache-Control`、字段权重排序、精确/前缀/包含匹配和图片结果轻微加权
- **剩余问题**：当前仍会拉取建筑和建筑师数据后在 JS 端计算相关性
- **影响**：数据量继续增长后响应时间会受限于全量数据读取
- **建议**：后续添加 Supabase / Postgres 全文索引，把多字段搜索和排序下推到数据库

### 26. Proxy 语言协商仍可增强

- **影响**：已有 `src/proxy.ts` 处理语言前缀重定向和 Accept-Language 检测，但还没有缓存头或用户偏好 cookie
- **建议**：在 proxy 中补充语言协商和必要的缓存策略

### 27. 图片系统三层不一致

- **当前**：Supabase images 表 + JSON 注册表 + curated_images 迁移（未执行）
- **风险**：新团队成员不清楚哪个是权威数据源
- **建议**：尽快执行 v3 迁移，以数据库表为单一权威源

### 28. 无自动化测试（2026-06-08 已建立最小安全网）

- **影响**：重构风险高，回归难以发现
- **状态**：已新增 Vitest 与 Playwright；覆盖首页、建筑/建筑师详情 200/404、搜索 API、图片代理 API、语言跳转
- **剩余**：后续应继续补数据审计、查询优化和迁移脚本测试

### 29. TypeScript `as T` 滥用

- **位置**：`src/lib/data.ts` — `fetchAll` 和 `cached` 中多处 `as T`
- **风险**：运行时类型不匹配不会被捕获
- **建议**：使用 Zod 或类似库添加运行时验证
