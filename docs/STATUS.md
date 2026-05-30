# STATUS.md — 项目当前状态

> 最后更新：2026-05-30
> 基于代码实际分析，非模板填充

## 总体进度

**当前阶段：Phase 4 — 内容扩展、图片治理与检索体验**

- Phase 0：项目初始化 ✅
- Phase 1：数据模型与 Supabase 集成 ✅
- Phase 2：路由与页面骨架 ✅
- Phase 3：国际化与设计系统 ✅
- Phase 4：图片治理、内容补全与检索体验 🔄 (80%)
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

## 数据统计（截至 2026-05-26）

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
| 精品建筑师长文 | 55（12 批，含 BIG / SANAA 等组合型建筑实践） |

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
- ✅ 部署验证：提交 `0bffb58` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-ju8wht35i-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`/zh/search?q=tokyo` 与 `/zh/architect/aalto` 均返回 200，并输出简繁启动脚本与中文显示控件
- ⏳ 待验证：移动端 375/390/430px 截图

### 第十二阶段：移动端首屏与建筑师内容第二批
- ✅ 移动端首页 hero 调整安全边距：文字不再与白色装饰边框同线贴合，metadata 改为带轻背景的独立信息块
- ✅ 建筑师精品页肖像上移并缩小：桌面端放在 overview/metadata 上方，移动端放在姓名后、正文前；长文章区移除重复大肖像
- ✅ 新增第二批 5 位精品建筑师 overlay：`le-corbusier`、`mies-van-der-rohe`、`frank-lloyd-wright`、`louis-kahn`、`tadao-ando`
- ✅ 每位第二批建筑师包含中文/日文摘要、3 个长文 section、核心思想、人物肖像、3 个代表作导读和文末来源
- ✅ 第二批代表作均使用站内已有 building slug，并确认 Supabase 主图或已有图片 override 可回填作品图
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3177 页面）
- ✅ 本地响应验证：`/zh`、`/zh/architect/le-corbusier`、`/ja/architect/tadao-ando` 均返回 200；中文/日文长文、代表作导读和参考资料已输出
- ⚠️ 移动端截图待补：Browser 插件创建本地 tab 时停在 `about:blank` 超时，本轮先完成命令层验证
- ✅ 部署验证：提交 `227c516` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-3aasyty3o-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`/zh`、`/zh/architect/le-corbusier`、`/ja/architect/tadao-ando` 均返回 200，并输出首页移动端安全边距 class 与第二批精品内容

### 第十三阶段：人物字段语义修正与分类浏览层级化
- ✅ 建筑师详情页 metadata 修正：人物使用 `生卒年份`、`国籍 / 地区`，不再复用建筑详情的 `建成年份`、`位置`
- ✅ `/browse` 重做为分层档案入口：顶部路径卡、建筑师谱系、建筑作品索引、历史/风格/类型索引、地域入口
- ✅ 建筑师索引卡增加 surface、边框和作品/时代信息，减少纯文本堆叠感
- ✅ era/style/type/country 分类详情页统一为分段式浏览：统计块、关联分类、建筑师、建筑作品各自成区
- ✅ 文档同步：`UI_RULES.md` 记录分类浏览必须先给路径与层级，禁止无序平铺
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3177 页面）
- ✅ 本地响应验证：`/zh/architect/le-corbusier` 输出 `生卒年份`、`国籍 / 地区`；`/zh/browse` 输出 `建筑师谱系`、`建筑作品索引`、`历史、风格与类型`
- ⚠️ Browser 插件仍在创建本地 tab 时停在 `about:blank` 超时，本轮未完成截图级验证

### 第十四阶段：截图反馈修复与分类可用性补强
- ✅ 首页与卡片图片在暗色模式下保持原图亮度、对比和饱和度，不再被主题整体压暗
- ✅ 首页 hero/精选区移动端间距调整：图片、标题、metadata 和署名之间保留更清晰的呼吸感
- ✅ 新增 `taxonomy.ts`，分类匹配兼容 slug、name_en、name_zh、name_ja，修复旧数据用显示名导致的空分类
- ✅ `/browse` 过滤无内容的 era/style/type 入口，并省略 `0 建筑师`、`0 建筑` 等失望计数
- ✅ `/browse/type/[slug]` 与 relations 查询同步使用 taxonomy 匹配，分类详情页能找到旧数据对应内容
- ✅ 非中文页面清除中文简繁状态；日文 `displayText` 不再回退到中文，避免日语页出现繁体中文
- ✅ 文档同步：`UI_RULES.md` 增加图片暗色规则、分类页空入口/0 计数禁用规则
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3177 页面）
- ✅ 本地响应验证：`/zh`、`/ja`、`/zh/browse`、`/ja/browse` 均返回 200；`/zh/browse` 不再输出真实 `0 建筑师 / 0 建筑` 计数；日语页未检出繁体中文泄漏

### 第十五阶段：建筑师内容精品化第三批
- ✅ 新增第三批 5 位精品建筑师 overlay：`zaha-hadid`、`im-pei`、`renzo-piano`、`frank-gehry`、`lina-bo-bardi`
- ✅ 每位包含中文/日文摘要、3 个长文 section、核心思想、人物肖像、3 个代表作导读和文末来源
- ✅ 第三批代表作均确认存在于站内 image registry：Hadid、Pei、Piano、Gehry、Bo Bardi 各 3 个作品 slug 有作品图记录
- ✅ 肖像采用 Wikimedia Commons 或可追溯机构来源，记录 author、license、source_url 与三语 alt
- ✅ 文档同步：`CONTENT_RULES.md` 与 `DATA_SCHEMA.md` 记录第三批对象与 overlay 范围
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3177 页面）
- ✅ 本地响应验证：`/zh/architect/zaha-hadid`、`/ja/architect/zaha-hadid`、`/zh/architect/im-pei`、`/zh/architect/renzo-piano`、`/zh/architect/frank-gehry`、`/zh/architect/lina-bo-bardi` 均返回 200，并输出长文、肖像、代表作和来源

### 第十六阶段：建筑师内容精品化第四批
- ✅ 新增第四批 5 位精品建筑师 overlay：`norman-foster`、`shigeru-ban`、`carlo-scarpa`、`kengo-kuma`、`niemeyer`
- ✅ 每位包含中文/日文摘要、3 个长文 section、核心思想、人物肖像、3 个代表作导读和文末来源
- ✅ 第四批共确认 15 个代表作 slug 均存在于站内建筑数据，并有 image registry 作品图记录
- ✅ 肖像采用 Wikimedia Commons 或可追溯来源，记录 author、license、source_url 与三语 alt
- ✅ 内容筛选修正：暂缓 Toyo Ito 精品页，因为站内第三个候选代表作归属疑似错误，先避免把错误数据写入长文
- ✅ 文档同步：`CONTENT_RULES.md` 与 `DATA_SCHEMA.md` 记录第四批对象与数据质量口径
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3177 页面）
- ✅ 本地响应验证：`/zh/architect/norman-foster`、`/ja/architect/norman-foster`、`/zh/architect/shigeru-ban`、`/zh/architect/carlo-scarpa`、`/zh/architect/kengo-kuma`、`/zh/architect/niemeyer` 均返回 200，并输出长文、肖像、代表作和来源

### 第十七阶段：建筑师内容精品化第五批
- ✅ 新增第五批 5 位精品建筑师 overlay：`gaudi`、`gropius`、`sullivan`、`eero-saarinen`、`zumthor`
- ✅ 新增前通过 Supabase CLI 验证所有建筑 slug 和 architect-building 关联关系
- ✅ 验证过程中发现并修正 2 处 slug 错误：Sullivan 的 `carson-pirie-scott`（非 `carson-pirie-scott-building`）、Saarinen 的 `twa-terminal`（非 `twa-flight-center`）
- ✅ 每位包含中文/日文摘要、3 个长文 section、核心思想、人物肖像、3 个代表作导读和文末来源
- ✅ 肖像采用 Wikimedia Commons 或可追溯来源，记录 author、license、source_url 与三语 alt
- ✅ 代表作用已验证的 building slug，确保 Supabase 图片和本地缓存可回填
- ✅ `npm run build` 通过（3177 页面）
- ✅ 部署验证：非阻塞，部署后通过正式域名验证

### 第十八阶段：建筑师详情页 UI 重构
- **原因**：原页面留白过多、信息密度不足、缺乏建筑感和高级视觉层级，更像 wiki 而非设计档案馆
- **影响文件**：
  - [`src/app/[lang]/architect/[slug]/page.tsx`](../src/app/[lang]/architect/[slug]/page.tsx) — Hero 区域完全重构、元数据改为内联 ribbon、整体 grid 从 3 列改为 12 列非对称布局
  - [`src/components/ArchitectDeepArticle.tsx`](../src/components/ArchitectDeepArticle.tsx) — 文章区域改为 8 列居中 grid、section 间距加大、核心思想卡片增加序号、代表作区域重构
- **设计变更摘要**：
  - Hero：名字使用 clamp 响应式 serif 超大标题（2.5rem–4.5rem），肖像 3:4 比例全宽，bio 加左侧 accent 竖线成为 editorial pull-text，元数据改为紧凑 inline ribbon（非卡片），风格/时代标签改为细边框 outline 样式
  - 核心思想：2x2 grid，每卡右上角加 `01`–`04` 序号，更精致的 border-subtle 卡片
  - 文章区域：从全宽改为 8/12 列居中（col-start-3），section 间距 16 + border-t 分割线，标题从 heading-3 升级为 serif text-2xl/3xl
  - 代表作品：卡片 + 导读 + 链接三段式，间距增大到 gap-10
  - 移除对 MetadataPanel 组件的依赖（在架构师页中内联替代），MetadataPanel 仍保留供其他页使用
- ✅ `npm run build` 通过（3177 页面），TypeScript 0 错误
- ✅ 暗色模式兼容：所有新增 class 使用语义 token（`--ui-*`），暗色自动切换

### 第十九阶段：建筑师内容精品化第六批
- ✅ 新增第六批 5 位精品建筑师 overlay：`j-rn-utzon`、`luis-barragan`、`arne-jacobsen`、`giuseppe-terragni`、`rafael-moneo`
- ✅ 通过 Supabase CLI 验证所有 15 个建筑 slug，修正 `cathedral-of-our-lady-of-the-angels` → `cathedral-of-our-lady-of`
- ✅ 每位包含 3 个完整 section（约 3000–4000 字三语长文）
- ✅ `npm run build` 通过
- ✅ 部署到 Vercel

### 第二十阶段：建筑师内容精品化第七批
- ✅ 新增第七批 5 位精品建筑师 overlay：`mario-botta`、`richard-rogers`、`erich-mendelsohn`、`david-chipperfield`、`gordon-bunshaft`
- ✅ 通过 Supabase CLI 验证所有 15 个建筑 slug
- ✅ 每位包含 3 个完整 section（约 2500–3500 字三语长文）
- ✅ 入选标准：Supabase 建筑数 >= 3 且尚未有 overlay，按建筑数量降序选取（Botta 44 栋, Rogers 29, Mendelsohn 24, Chipperfield 22, Bunshaft 15）
- ✅ 修复 Chinese single quotes 在 JS 字符串中导致的编译错误（`\u2018` / `\u2019`）
- ✅ `npm run build` 通过（35 位建筑师，3181 页面）
- ✅ 部署到 Vercel

### 第二十一阶段：建筑师内容精品化第八批
- ✅ 新增第八批 4 位精品建筑师 overlay：`fumihiko-maki`、`christian-de-portzamparc`、`steven-holl`、`bernard-tschumi`
- ✅ `carlo-scarpa` 因已在第四批完成，Batch 8 重复版本已移除（保留早期简短版本）
- ✅ 通过 Supabase CLI 验证所有建筑 slug
- ✅ 每位包含 3 个完整 section（约 3000–4000 字三语长文）
- ✅ 修复 `alt` 字段格式：从纯字符串改为 `Record<ContentLang, string>` 三语格式
- ✅ `npm run build` 通过（39 位建筑师）
- ✅ 部署到 Vercel

### 第二十二阶段：建筑师内容精品化第九批
- ✅ 新增第九批 5 位精品建筑师 overlay：`paul-rudolph`、`john-lautner`、`kunio-maekawa`、`eduardo-souto-de-moura`、`peter-eisenman`
- ✅ 通过 Supabase CLI 验证所有建筑 slug（Rudolph 28栋, Lautner 31, Maekawa 30, Souto de Moura 13, Eisenman 13）
- ✅ 每位包含 3 个完整 section（约 3000–4000 字三语长文）
- ✅ `npm run build` 通过（44 位建筑师）
- ✅ 部署到 Vercel

### 第二十三阶段：建筑师内容精品化第十批
- ✅ 新增第十批 5 位精品建筑师 overlay：`harry-seidler`、`junzo-sakakura`、`yoshinobu-ashihara`、`buckminster-fuller`、`eladio-dieste`
- ✅ 通过 Supabase CLI 验证所有建筑 slug（Seidler 13栋, Sakakura 10, Ashihara 9, Fuller 7, Dieste 6）
- ✅ 每位包含 3 个完整 section（约 3000–4000 字三语长文）
- ✅ `npm run build` 通过（49 位建筑师）
- ✅ 部署到 Vercel

### 第二十四阶段：建筑师内容精品化第十一批
- ✅ 新增第十一批 5 位精品建筑师 overlay：`koolhaas`、`palladio`、`paulo-mendes-da-rocha`、`felix-candela`、`sanaa`
- ✅ 通过 Supabase CLI 验证所有建筑 slug（Koolhaas 21栋, Palladio 11, Mendes da Rocha 14, Candela 6, SANAA 7）
- ✅ 每位包含 3 个完整 section（约 3000–4000 字三语长文）
- ✅ `npm run build` 通过（54 位建筑师）
- ☐ 部署到 Vercel

### 第二十五阶段：建筑师内容精品化第十二批
- ✅ 新增第十二批 5 位精品建筑师 overlay：`richard-neutra`、`marcel-breuer`、`lina-bo-bardi`、`big`、`norman-foster`
- ✅ 通过 Supabase CLI 验证所有建筑 slug
- ✅ 每位包含 3 个完整 section（约 3000–4000 字三语长文）
- ✅ 清理 `marcel-breuer`、`lina-bo-bardi`、`norman-foster` 旧版简化 overlay（之前有重复属性）
- ✅ `npm run build` 通过（55 位建筑师）
- ☐ 部署到 Vercel

### 第二十六阶段：Archistory 品牌文案 Step 1
- ✅ 主品牌统一为 `Archistory`
- ✅ 中文正式名统一为 `建筑时间档案`，日文正式名统一为 `建築時間アーカイブ`
- ✅ 英文传播口径统一为 `Architecture in Time`
- ✅ 导航栏目从工具站口径改为策展口径：`分类浏览` → `档案`，`时间轴` → `时间`
- ✅ 建筑师详情阅读区文案统一：`建筑师长文` → `建筑师档案`，`代表作导读` → `作品阅读`，`核心思想` → `思想线索`
- ✅ 参考方向：MoMA / CCA 的 collection/archive 入口逻辑，Dezeen 的短导航口径，Aesop/COS 式克制品牌语言
- ✅ 本地验证：`npm run lint` 通过（仅保留既有 `<img>` warning），`npm run build` 通过（3177 pages）
- ✅ 已推送 GitHub `main` 并完成 Vercel 生产部署
- ✅ 正式域名验证：`https://archistory.app/zh`、`/zh/search?q=tokyo`、`/zh/architect/aalto` 均输出新的 Archistory 品牌文案

### 第二十七阶段：日语页面中文 fallback 清理
- ✅ 日语显示层新增疑似简体中文检测：`displayName()`、`displayText()`、搜索 metadata、卡片 metadata 不再把中文字段当作日语内容展示
- ✅ 建筑详情页改用本地化建筑师、风格、时代与地点格式；日语缺失的类型、结构、材料和深度分析不会继续用中文补位
- ✅ 建筑师详情页作品时间轴、相关作品与继续阅读区改用本地化标题和地点，`Continue Exploring / View all` 改为对应语言文案
- ✅ 首页、浏览页、搜索结果、建筑师卡片和建筑卡片统一使用安全显示 helper，日语页不显示中文简繁切换控件
- ✅ 地点显示对日语优先使用 `Intl.DisplayNames` 的国家/地区名称；没有可靠国家代码且字段明显是中文时，只保留年份或隐藏地点
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3177 页面）
- ✅ 本地响应验证：`/ja`、`/ja/browse`、`/ja/building/beijing-daxing-airport` 未再显示首页中文说明、中文简繁控件或中文深度分析；建筑详情相关卡片不再显示 `波尔图 / 葡萄牙 / 华盛顿 / 美国` 等中文地点
- ☐ 部署到 Vercel 并验证 `https://archistory.app/ja`、`/ja/browse`、`/ja/building/beijing-daxing-airport`

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
1. 统一数据库中的 type_slug 为 slug
2. 清理 22 个 overrides 重叠条目

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
