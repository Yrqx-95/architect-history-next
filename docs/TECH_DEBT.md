# TECH_DEBT.md — 技术债清单

> 按优先级分级：🔴 高 → 🟡 中 → 🟢 低  
> 每个条目包含：问题、位置、影响、建议修复方向

---

## 🔴 高优先级（影响用户体验或数据正确性）

### 1. 部分旧数据仍用显示名作为 type_slug

- **位置**：`src/app/[lang]/browse/type/[slug]/page.tsx`
- **问题**：页面已 slug 优先并兼容旧显示名，但数据库值仍需统一
- **影响**：后续移除兼容逻辑前需要先做数据迁移
- **修复**：将 buildings.type_slug 统一迁移为 building_types.slug

### 2. Proxy 语言匹配策略仍较简单

- **位置**：`src/proxy.ts`
- **问题**：已支持 Accept-Language 的 zh/en/ja 协商，但不处理区域域名、用户显式偏好 cookie 或缓存 vary 策略
- **影响**：复杂部署场景下语言入口仍不够精细
- **修复**：按需要引入语言偏好 cookie、`Vary: Accept-Language` 或域名级语言策略

---

## 🟡 中优先级（代码质量 / 可维护性）

### 3. 两个图片域名列表重复

- **位置**：`src/lib/image-loader.ts` + `src/lib/proxy-image.ts`
- **影响**：新增图片来源需同步修改两处
- **修复**：抽取 `EXTERNAL_IMAGE_DOMAINS` 常量到共享文件

### 4. `data.ts` 与 `relations.ts` 关系查询逻辑重复

- **位置**：`src/lib/data.ts` (getRelatedArchitects, getRelatedBuildings) + `src/lib/relations.ts`
- **影响**：同一类查询有两套实现，修改时可能不同步
- **修复**：废弃 data.ts 中的关系函数，全部走 relations.ts

### 5. `getBuildingsWithCovers()` 在首页被重复调用

- **位置**：`src/app/[lang]/page.tsx`
- **问题**：`getFeaturedBuildingsWithCovers()` 内部调用 `getBuildingsWithCovers()`，首页又单独调用一次
- **影响**：冗余 Supabase 查询，增加首页加载时间
- **修复**：重构为单次查询，传入筛选参数

### 6. 组件目录无分类（24 个文件平铺）

- **位置**：`src/components/`
- **影响**：随组件增加查找和维护困难
- **修复**：按功能分目录（layout/ navigation/ cards/ image/ search/ animation/ ui/ home/）

### 7. ImageGallery 体积过大（250 行）

- **位置**：`src/components/ImageGallery.tsx`
- **问题**：混合图片展示、缩略图列表、灯箱、键盘导航、触摸滑动
- **影响**：难以单独修改某个功能，测试困难
- **修复**：拆分为 ImageGallery / Lightbox / ThumbnailStrip 子组件

### 8. Search 结果组件已拆分，仍可继续精炼

- **位置**：`src/components/SearchResults.tsx`, `src/components/search/`
- **现状**：SearchResults 已从 229 行拆为 110 行 client shell，展示层拆为 SearchInput / SearchSuggestions / SearchSummary / SearchEmptyState / SearchArchitectResults / SearchBuildingResults
- **剩余问题**：状态和请求逻辑仍集中在 SearchResults；后续加入筛选、分页或高亮匹配时可继续抽 hook
- **修复**：需要时抽取 `useSearchResults()`，并为搜索结果排序添加测试

---

## 🟢 低优先级（改进 / 优化）

### 9. `Building.location` 类型为 `unknown`

- **位置**：`src/lib/types.ts`
- **影响**：放弃类型检查
- **修复**：定义 `GeoPoint` 或 `{ lat: number; lng: number } | null`

### 10. `quality.ts` 中 hasProperName 与 hasValidName 重复

- **位置**：`src/lib/quality.ts`
- **影响**：相似但不完全相同的逻辑分散
- **修复**：合并为一个函数，通过参数控制严格程度

### 11. `i18n.ts` 与 `types.ts` 的回退链不一致

- **位置**：`t()` 回退 zh → key；`displayText()` 回退 en → zh → first value
- **影响**：边缘情况下翻译回退行为不一致
- **修复**：统一回退链为：指定语言 → en → zh → key

### 12. `supabase.ts` 环境变量用非空断言

- **位置**：`src/lib/supabase.ts`
- **影响**：运行时变量缺失时静默传递 undefined
- **修复**：添加运行时检查 + 有意义错误消息

### 13. `local-image-overrides.json` 数据质量问题

- **位置**：`src/lib/local-image-overrides.json`
- **问题**：
  - `european-court-of-human-rights` 指向 .ogg 音频文件
  - `basilica-palladiana` 的 source_url 有双斜线路径
  - `basilica-palladiana` 的 cover_photographer 为 null
- **修复**：运行数据校验脚本清理

### 14. `ContinueExploring.tsx` 死字段

- **位置**：`src/components/ContinueExploring.tsx`
- **问题**：`ExploreGroup.items[].image` 定义但未使用
- **修复**：删除字段或实现图片渲染

### 15. `image-overrides.json` 中 chrysler-building URL 不准确

- **位置**：`src/lib/image-overrides.json`
- **问题**：克莱斯勒大厦的图片实际上是曼哈顿天际线全景，建筑的辨识度低
- **建议**：后续替换为克莱斯勒大厦特写图片

### 16. v3 数据库迁移未执行

- **位置**：`db/migrations/v3-curated-image-registry.sql`
- **问题**：SQL 写了但表未在 Supabase 创建
- **影响**：curated_images 数据继续以 JSON 文件形式存在
- **建议**：执行迁移并将 JSON 数据导入

### 17. `db/image-registry.generated.json` 应加入 .gitignore

- **问题**：4.1MB 生成文件在版本控制中
- **影响**：仓库膨胀，每次重新生成都有大 diff
- **修复**：加入 .gitignore，在构建流程中生成

### 18. `public/images/curated/` 应加入 .gitignore

- **问题**：218 个文件 (76MB) 的生成产物
- **修复**：加入 .gitignore 或迁移到对象存储

### 19. 缺少 v1 数据库迁移

- **问题**：基础表 (buildings, architects, images, styles, eras) 的创建 SQL 不在版本控制中
- **影响**：无法从零重建数据库
- **建议**：导出当前 schema 作为 v1 迁移补充

---

## 性能相关

### 20. 关系查询全表摄入

- **位置**：`src/lib/relations.ts` — 每个函数拉取全部表数据再 JS 过滤
- **影响**：随着数据增长，内存和响应时间线性增加
- **建议**：使用 Supabase 的 `.in()` 过滤，将计算下推到数据库

### 21. `getFeaturedBuildingsWithCovers()` 无 LIMIT

- **位置**：`src/lib/data.ts`
- **问题**：内部调用 `getBuildingsWithCovers()` 获取全部建筑，然后仅取前 N 个
- **建议**：在数据库层面添加 LIMIT

### 22. 请求级缓存无跨请求共享

- **位置**：`src/lib/data.ts` — `cached()` 使用 Map，每个请求周期独立
- **影响**：高频访问的 eras/styles 数据在每次请求时重新获取
- **建议**：使用 Next.js `unstable_cache` 或 React `cache()` 配合 ISR

### 23. 原生 `<img>` 保留在首页/编辑图片组件

- **位置**：`src/components/CinematicHero.tsx`, `src/components/EditorialImage.tsx`
- **问题**：`npm run lint` 仍提示 `@next/next/no-img-element` 性能 warning
- **建议**：若后续 LCP 或带宽压力变高，再评估迁移到 `next/image` 或在文档中显式豁免

---

## 扩展风险

### 24. 搜索 API 仍缺少缓存和排序策略

- **位置**：`src/app/api/search/route.ts`
- **问题**：当前为了更完整的查询体验，会拉取建筑和建筑师数据后在 JS 端过滤；结果排序只按原始数据顺序截断
- **影响**：数据量继续增长后响应时间和结果相关性会下降
- **建议**：添加短 TTL 缓存、字段权重排序和必要的 Supabase / Postgres 全文索引

### 25. Proxy 语言协商仍可增强

- **影响**：已有 `src/proxy.ts` 处理语言前缀重定向和 Accept-Language 检测，但还没有缓存头或用户偏好 cookie
- **建议**：在 proxy 中补充语言协商和必要的缓存策略

### 26. 图片系统三层不一致

- **当前**：Supabase images 表 + JSON 注册表 + curated_images 迁移（未执行）
- **风险**：新团队成员不清楚哪个是权威数据源
- **建议**：尽快执行 v3 迁移，以数据库表为单一权威源

### 27. 无自动化测试

- **影响**：重构风险高，回归难以发现
- **建议**：至少为关键路径（首页、搜索 API、图片代理）添加集成测试

### 28. TypeScript `as T` 滥用

- **位置**：`src/lib/data.ts` — `fetchAll` 和 `cached` 中多处 `as T`
- **风险**：运行时类型不匹配不会被捕获
- **建议**：使用 Zod 或类似库添加运行时验证
