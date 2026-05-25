# STATUS.md — 项目当前状态

> 最后更新：2026-05-25  
> 基于代码实际分析，非模板填充

## 总体进度

**当前阶段：Phase 4 — 内容扩展、图片治理与检索体验**

- Phase 0：项目初始化 ✅
- Phase 1：数据模型与 Supabase 集成 ✅
- Phase 2：路由与页面骨架 ✅
- Phase 3：国际化与设计系统 ✅
- Phase 4：图片治理、内容补全与检索体验 🔄 (75%)
- Phase 5：深度内容与优化 ⏳

## 已完成

### 数据层
- Supabase 数据连接（buildings / architects / images / styles / eras 表）
- 类型系统完整（types.ts, 250 行, 15+ 接口）
- 数据访问层带请求级缓存（data.ts, 170 行）
- 关系图谱查询（relations.ts, 131 行）
- 关联表迁移 v2（architect_styles, building_styles, architect_eras 等）

### 页面路由（17 个文件 + proxy）
- `/` 通过 `src/proxy.ts` 重定向到 `/zh`
- `/[lang]` 首页（ISR, 3600s）
- `/[lang]/architect/[slug]` 建筑师详情（ISR, 86400s）
- `/[lang]/building/[slug]` 建筑详情（ISR, 86400s）
- `/[lang]/browse` 浏览索引
- `/[lang]/browse/era/[slug]` 时代页
- `/[lang]/browse/style/[slug]` 风格页
- `/[lang]/browse/type/[slug]` 类型页
- `/[lang]/browse/country` 国家索引页
- `/[lang]/browse/country/[slug]` 国家页
- `/[lang]/search` 搜索页
- `/[lang]/timeline` 时间轴（ISR, 3600s）
- `/api/image-proxy` 图片代理（Edge Runtime）
- `/api/search` 搜索 API（建筑 / 建筑师 / 城市 / 国家 / 年份 / 类型 / 风格 / 时代）
- loading / error / not-found 状态页

### 组件（32 个）
- 图片系统：SafeImage, EditorialImage, ImageGallery, ImageBreak, ImageAttribution
- 布局：PageShell, PageTransition, SectionHeading, ArticleSection, Reveal
- 内容：BuildingCard, ArchitectCard, BrowseListing, SearchResults, ContinueExploring
- 导航：MobileNav, LanguageSwitcher, Breadcrumb, ThemeToggle, SmoothScroll
- 特效：CinematicHero, PullQuote
- 通用：Badge, MetadataPanel

### 设计系统
- 完整 Tailwind v4 token（globals.css, 599 行）
- 色彩系统：paper / warm / charcoal + 强调色 clay / terracotta / ochre
- 排版层级：heading-display → heading-1/2/3/4 + body + caption + metadata
- 容器层级：wide (1280px) / content (1024px) / read (672px) / narrow (448px)
- 间距系统：section-sm/ section/ section-lg/ section-xl + gutter + rhythm
- 动画：page-enter / reveal / fade-in（滚动驱动）
- 暗色模式全支持
- 主题系统重做为 `system / light / dark` 三态，默认跟随系统
- 新增语义色 token：页面背景、surface、输入框、边框、正文、辅助文字、反白文字和交互强调成套切换

### 图片治理（截至 2026-05-25）
- 图片策展策略：image-policy.ts（受信任来源 + 开放许可检查）
- 图片审计：audit-images.mjs（7276 张图片，4794 张可信）
- 图片注册表：build-image-registry.mjs（632 建筑，4794 图片）
- 本地缓存脚本：cache-curated-images.mjs
- 本地缓存：218 张图片（76MB），覆盖 198 个建筑
- 手动策展：image-overrides.json（39 条目）
- 本地缓存映射：local-image-overrides.json（198 条目）
- 图片署名组件：ImageAttribution（首页 hero、精选、详情页）

## 已知问题

### 严重（影响用户体验）

当前无已确认的严重阻断项。

### 中等（影响特定场景）

1. **部分旧数据仍用显示名作为 type_slug**：类型页已兼容 slug 与旧显示名，但数据层仍需统一迁移。
   - 位置：`src/app/[lang]/browse/type/[slug]/page.tsx`

### 轻微（代码质量）

3. **error.tsx 和 not-found.tsx 无法获取 lang 参数**，错误信息始终是英文。
    - 位置：`src/app/[lang]/error.tsx`, `src/app/[lang]/not-found.tsx`

4. **getBuildingsWithCovers() 在首页被重复调用**，与 getFeaturedBuildingsWithCovers() 产生冗余数据库查询。
    - 位置：`src/app/[lang]/page.tsx`

5. **ContinueExploring 组件有死字段**：`ExploreGroup.items[].image` 在类型中定义但从未渲染。

6. **ImageGallery 体积过大**：250 行，混合图片展示、缩略图、灯箱、键盘与触摸导航。

## 未完成模块

| 模块 | 状态 | 说明 |
|------|------|------|
| `/[lang]/map` | ⏳ 未实现 | 空目录已删除，地图功能仍在长期规划 |
| Proxy (proxy.ts) | ✅ 已实现 | 根路径与无语言前缀路径重定向到 `/zh` |
| curated_images 表 | ❌ 迁移已写但未执行 | v3 迁移 SQL 存在但表未在 Supabase 创建 |
| biography 深度内容 | ⚠️ 部分 | 建筑师 biography 字段存在但很多条目内容少于 20 字 |
| 日文内容 | ⚠️ 不完整 | 许多建筑的 name_ja / 日文分析字段为空 |
| 图片注册表 → Supabase 迁移 | ⏳ 未开始 | 当前仍用 JSON 文件，中期计划迁移到 curated_images 表 |
| 对象存储迁移 | ⏳ 未开始 | public/images/curated/ → R2 或 Supabase Storage |
| Ronchamp 本地缓存 | ⚠️ 待补 | 因 Wikimedia IP 限速未能下载，现用远程 fallback |

## 数据统计（截至 2026-05-25）

| 指标 | 数值 |
|------|------|
| 图片总量（Supabase） | 7,276 |
| Wikimedia Commons 图片 | 4,858 |
| Unsplash 图片 | 2,418 |
| 可信开放授权图片 | 4,794 |
| Registry 覆盖建筑 | 632 |
| 本地缓存图片 | 218 |
| 本地覆盖建筑 | 198 |
| 静态生成页面 | 3,177 |
| 支持语言 | 3 (zh/en/ja) |

## 2026-05-25 工程化整理记录

### 第一阶段：Bug 修复
- ✅ 搜索 API 添加 name_ja 搜索支持
- ✅ image-policy.ts 修复 CC BY-NC 误判
- ✅ 删除 7 个未使用组件
- ✅ 删除空 `map/` 路由目录

### 第二阶段：文档系统建立
- ✅ `docs/DESIGN_TOKENS.md` — 基于 globals.css 实际令牌
- ✅ `docs/DATA_SCHEMA.md` — 数据结构、ER 图、数据质量问题
- ✅ `docs/CONTENT_RULES.md` — biography/图片/metadata/tag 规范
- ✅ `docs/PERFORMANCE.md` — 性能审计（图片/bundle/client components/cache）
- ✅ `docs/AI_AGENT_RULES.md` — AI 工作协议
- ✅ `UI_RULES.md` 修正与实际代码不符的 4 处描述
- ✅ 删除旧 AI_WORKFLOW.md（被 AI_AGENT_RULES.md 取代）

### 第三阶段：代码清理
- ✅ 5 个 PNG 图片转为 JPG（节省 ~2MB）
- ✅ 5 个 overrides 中 .png 引用更新为 .jpg
- ✅ 构建验证通过（3172 页面）

### 第四阶段：检测与文档同步
- ✅ 修复 ImageGallery 的 React lint 阻断项
- ✅ 清理 image-proxy 未使用 catch 参数
- ✅ 调整 SafeImage alt 传递方式，消除 a11y lint warning
- ✅ `npm run lint` 通过（剩余 2 个 `<img>` 性能 warning）
- ✅ `npm run build` 通过（当前为 3177 页面）
- ✅ `npm run images:audit` 通过（7276 图片，4794 可信开放授权）
- ✅ 同步 docs 中过期状态：日语搜索、PNG、map 空目录、组件数量

### 第五阶段：高优先级技术债修复
- ✅ 新增 `/[lang]/browse/country` 国家索引页，修复分类页国家入口 404
- ✅ 语言切换保留当前深层路径（桌面 LanguageSwitcher + 移动 MobileNav）
- ✅ relations.ts 改为 slug-based 风格/时代匹配
- ✅ 国家详情页 `generateStaticParams()` 改为从建筑数据动态生成国家代码
- ✅ 类型页改为 slug 优先匹配，并兼容旧显示名数据
- ✅ `next.config.ts` 添加 `/images/curated/**` localPatterns，修复本地缓存图运行时错误
- ✅ 浏览器验证 `/zh/browse/country/jp`、`/zh/browse/type/cultural`、深层页语言切换通过

### 第六阶段：语言根布局与 SEO 修复
- ✅ 将 root layout 移入 `src/app/[lang]/layout.tsx`，按路由参数输出 `<html lang>`
- ✅ 删除顶层 `src/app/layout.tsx` 与 `src/app/page.tsx`
- ✅ 新增 `src/proxy.ts`，按 Next 16 proxy 约定将 `/` 与无语言前缀路径重定向到 `/zh`
- ✅ `src/proxy.ts` 支持 Accept-Language：ja/en 浏览器分别进入 `/ja`、`/en`，其他语言回退 `/zh`
- ✅ SSR 验证 `/en` 输出 `lang="en"`，`/ja` 输出 `lang="ja"`，`/` 返回 307 → `/zh`
- ✅ `npm run build` 通过（3177 页面）

### 第七阶段：搜索 UI/UX 改造
- ✅ `/api/search` 改为基于本地数据层的广义档案搜索，覆盖建筑名、建筑师名、城市、国家、年份、类型、风格、时代和日文名
- ✅ 搜索 API 返回建筑封面和图片署名字段，搜索结果可直接展示视觉线索
- ✅ `/[lang]/search` 增加说明导语、常用入口 chip、结果数量和更清晰的空状态
- ✅ 建筑搜索结果改为紧凑图文列表，展示封面、地点、年份、类型与建筑师入口
- ✅ 无结果状态增加替代搜索建议和分类浏览入口，避免搜索页成为死路
- ✅ SearchResults 从 229 行拆为 110 行 client shell + `components/search/` 展示组件
- ✅ 浏览器验证 `/zh/search?q=tokyo` 有 11 个建筑图文结果，`zzzzzzzz` 显示无结果恢复路径
- ✅ `npm run lint` 通过（剩余 2 个 `<img>` 性能 warning），`npm run build` 通过（3177 页面）

### 第八阶段：可读性与颜色对比修复
- ✅ 全局 `.body-sm` / `.caption` / `.metadata` / `.eyebrow` 提升到更高对比色阶
- ✅ 首页、搜索页、浏览页、时间轴、详情页和页脚的辅助文字从 `warm-400/charcoal-400` 提升到 `warm-600/warm-300`
- ✅ 搜索输入框 placeholder、图标、结果计数和元信息增强可读性
- ✅ 本地验证 `/zh`、`/zh/search?q=tokyo`、`/zh/browse`、`/zh/timeline` 响应正常，SSR HTML 不再包含主要低对比文字类
- ✅ `npm run lint` 通过（剩余 2 个 `<img>` 性能 warning），`npm run build` 通过（3177 页面）

### 第九阶段：主题系统与奢侈品极简 UI 重做
- ✅ `ThemeToggle` 改为三态 segmented control：系统 / 亮 / 暗
- ✅ `localStorage.theme` 支持 `system | light | dark`，根布局首屏脚本按用户选择或系统偏好设置 `.dark`
- ✅ `globals.css` 新增语义主题 token，暗色模式同步切换背景、surface、输入框、边框、正文和辅助文字
- ✅ 搜索页 header、搜索框、suggestion chip、结果计数、空状态和分类浏览入口改用可读语义层级
- ✅ 建筑师档案页 biography、英文名、metadata panel、core ideas、timeline 年份/城市和 works count 改用语义层级
- ✅ 浏览页、建筑详情页、共用卡片、面包屑、语言切换和移动菜单同步接入语义色，减少同类低对比回归
- ✅ 本轮验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3177 页面）
- ✅ 本地访问验证：`/zh/search?q=tokyo`、`/zh/architect/aalto`、`/zh/browse`、`/zh` 均返回 200，搜索页/建筑师页/浏览页不再输出旧低对比 `dark:text-warm-300`
- ✅ 部署验证：提交 `5a60682` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-8a3kyuvsd-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://architect-history-next.vercel.app/zh/search?q=tokyo`、`/zh/architect/aalto`、`/zh/browse`、`/zh` 均返回 200；搜索页、建筑师页、浏览页已输出语义主题层级

### 第十阶段：建筑师与作品内容精品化第一阶段
- ✅ 新增仓库内容 overlay：5 位首批建筑师 `alvar-aalto`、`kenzo-tange`、`richard-neutra`、`marcel-breuer`、`alvaro-siza-vieira`
- ✅ `aalto` 作为 `alvar-aalto` 的页面 alias，共用 Aalto 精品内容
- ✅ 每位建筑师包含中文/日文摘要、长文 sections、核心思想、人物肖像、3 个代表作导读和文末来源
- ✅ 建筑师详情页新增精品长文区、人物肖像、代表作导读和 Sources/参考资料
- ✅ 人物肖像采用 Wikimedia Commons/Wikidata 可追溯文件，记录 author、license、source_url
- ✅ 代表作卡片复用现有 BuildingCard，并通过本地 cover 数据合并显示可信作品图
- ✅ `npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3177 页面）
- ✅ 本地访问验证：`/zh/architect/aalto`、`/ja/architect/aalto`、`/zh/architect/kenzo-tange`、`/ja/architect/kenzo-tange` 均显示长文、肖像、代表作和参考资料；`/zh/architect/adolf-loos` 不显示空精品区
- ✅ 部署验证：提交 `5b2d382` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-oinu7cak2-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`/zh/architect/aalto`、`/ja/architect/aalto`、`/zh/architect/kenzo-tange`、`/ja/architect/kenzo-tange` 均返回 200 并显示精品内容；`/zh/architect/adolf-loos` 保持普通页面

### 第十一阶段：中文简繁切换与移动端导航重做
- ✅ 中文 `/zh` 保持单一路由，新增页内 `简 / 繁 / 系统` 显示选择，不新增 `/zh-tw`
- ✅ `localStorage.chineseScript` 支持 `system | hans | hant`，首屏脚本根据浏览器语言设置 `data-zh-script`
- ✅ 使用 `opencc-js` 台湾繁体规则自动转换 UI 文案、内容文字、placeholder、alt 与 aria-label
- ✅ 桌面端语言切换保持中文/英文/日文，中文页额外显示简繁 segmented control
- ✅ 移动端 MobileNav 改为抽屉菜单，搜索、主导航、语言、中文显示和主题分区展示，触控高度按 44px 设计
- ✅ 文档同步：`DATA_SCHEMA.md`、`UI_RULES.md`、`CONTENT_RULES.md` 记录简繁模型、移动端规则和内容口径
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3177 页面）
- ✅ 本地响应验证：`/zh/search?q=tokyo`、`/zh/architect/aalto` 均返回 200，并输出简繁启动脚本与中文显示控件
- ⏳ 待验证：移动端 375/390/430px 截图与正式部署 `/zh/search?q=tokyo`、`/zh/architect/aalto`

### 当前 docs/ 结构（10 个文档）
```
docs/
├── PROJECT.md          — 项目定位与技术栈
├── STATUS.md           — 项目当前状态（本文件）
├── DESIGN_TOKENS.md    — 设计令牌系统
├── UI_RULES.md         — UI 设计与组件规范
├── DATA_SCHEMA.md      — 数据结构与 ER 关系
├── CONTENT_RULES.md    — 内容系统规范
├── FILE_STRUCTURE.md   — 目录结构与命名
├── TECH_DEBT.md        — 28 条技术债清单
├── PERFORMANCE.md      — 性能审计与优化
└── AI_AGENT_RULES.md   — AI 工作协议
```

### 仍待修复（按优先级）
1. 🟡 类型页兼容旧显示名 type_slug，数据需迁移为 slug
2. 🟡 22 个 overrides 重叠条目待清理
3. 🟢 首页 40 处内联三语字符串待迁移
4. 🟢 首页 358 行待拆分
5. 🟢 搜索 API 短缓存与相关性排序待补

## 下一步优先级

### 立即（本周）
1. 完成建筑师内容精品化第一阶段部署验证
2. 统一数据库中的 type_slug 为 slug
3. 清理 22 个 overrides 重叠条目

### 短期（两周内）
4. 拆分 ImageGallery 过大组件
5. 首页内联三语字符串迁移到 i18n
6. 首页拆分为子组件
7. 压缩 1MB 以上本地缓存 JPG

### 中期（一月内）
8. 执行 v3 迁移，创建 curated_images 表
9. 将 local-image-overrides.json 数据迁移入表
10. 补全缺少 biography 的建筑师
11. Ronchamp 本地缓存（等 IP 解封）
12. 继续补充 registry 中剩余 ~430 个建筑的本地缓存

### 长期
15. 2418 Unsplash 图片替换为 Wikimedia 可信图片
16. 对象存储迁移
17. 地图功能实现
