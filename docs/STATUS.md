# STATUS.md — 项目当前状态

> 最后更新：2026-05-31
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
- `/[lang]/map` 地域档案 / 地图入口（按国家、城市与代表作品进入档案）

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

### 图片治理（截至 2026-06-02）
- 图片策展策略：image-policy.ts（受信任来源 + 开放许可检查）
- 图片审计：audit-images.mjs（7276 张图片，4794 张可信）
- 图片注册表：build-image-registry.mjs（632 建筑，4794 图片）
- 本地缓存脚本：cache-curated-images.mjs
- 本地缓存：220 张图片（约 75MB），覆盖 198 个建筑
- 远程审核策展：image-overrides.json（20 条目，已去除与本地缓存重复的条目）
- 本地缓存映射：local-image-overrides.json（198 条目）
- 图片署名组件：ImageAttribution（首页 hero、精选、详情页）

## 已知问题

### 严重（影响用户体验）

当前无已确认的严重阻断项。

### 中等（影响特定场景）

1. **部分旧数据仍用显示名作为 type_slug**：类型页已兼容 slug 与旧显示名，但数据层仍需统一迁移。
   - 位置：`src/app/[lang]/browse/type/[slug]/page.tsx`

### 轻微（代码质量）

3. **getBuildingsWithCovers() 在首页被重复调用**，与 getFeaturedBuildingsWithCovers() 产生冗余数据库查询。
    - 位置：`src/app/[lang]/page.tsx`

4. **ContinueExploring 组件有死字段**：`ExploreGroup.items[].image` 在类型中定义但从未渲染。

5. **ImageGallery 体积过大**：250 行，混合图片展示、缩略图、灯箱、键盘与触摸导航。

## 未完成模块

| 模块 | 状态 | 说明 |
|------|------|------|
| `/[lang]/map` | ✅ 第一版 | 地域档案入口，按国家密度、地域路径和城市线索进入档案 |
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
| 静态生成页面 | 3,180 |
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
- ✅ 部署验证：提交 `b1416f0` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-1hlfe6tez-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/ja`、`/ja/browse`、`/ja/building/beijing-daxing-airport` 均返回 200；可见 HTML 未检出中文简繁控件、中文深度分析或中文地点 fallback

### 第二十八阶段：地域档案 / 地图入口第一版
- ✅ 新增 `/[lang]/map`：不使用空地图 SDK 占位，先以国家密度、可直接进入的地域路径和城市线索组成可用的地域档案入口
- ✅ 桌面导航、移动抽屉和页脚同步加入 `地图 / Map / 地図` 入口，避免地图功能藏在未完成页面里
- ✅ 国家索引与国家详情页使用 `Intl.DisplayNames` 本地化国家/地区名，`/ja/browse/country/us` 显示 `アメリカ合衆国`，`/en/browse/country/jp` 显示 `Japan`
- ✅ 非中文页面收紧中文 fallback：英语/日语地图页不显示中文城市或中文国家名；没有可靠国家代码且字段明显是中文时隐藏该地点线索
- ✅ 新增 `[lang]/[...missing]` 缺页兜底，`/ja/*` 未知路径显示日语 404，不再落到 Next 默认英文 404
- ✅ 本轮参考方向：CCA / MoMA / Letterform Archive 等 archive 入口采用可筛选、可进入的地理/分类路径，第一版优先真实可点内容而非空交互
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3180 页面）
- ✅ 本地响应验证：`/zh/map`、`/ja/map`、`/en/map`、`/ja/browse/country/us`、`/en/browse/country/jp`、`/zh/browse/country/us`、`/ja/not-a-real-page` 均通过可见文本检查
- ✅ 部署验证：提交 `7882e57` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-aws585nr1-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/map`、`/ja/map`、`/en/map`、`/ja/browse/country/us`、`/ja/not-a-real-page` 均返回 200，并通过混语/缺页可见文本检查

### 第二十九阶段：地图 / 时间 / 档案页密度与对齐优化
- ✅ 参考文化档案与集合可视化产品的组织方式：先给总览指标，再用时间、地域、主题等可进入路径组成密集索引，避免空地图、空列表或纯字段清单
- ✅ `/[lang]/timeline` 从稀疏竖线改为 `Time atlas`：顶部指标、高密度年代入口、三列 decade card 索引，一屏内可扫视更多有效年代与作品
- ✅ `/[lang]/map` 从长列表 + 高侧栏改为地域地图册：国家密度卡、地域入口、城市线索；入口图片只使用本地已治理图片，不适合做索引封面的图会被排除
- ✅ `/[lang]/browse` 放宽桌面内容宽度，作品区和历史/风格/类型区改为 `items-start`，右侧索引 sticky，避免卡片被拉伸成大空白面板
- ✅ 搜索 API 新增 60s 内存缓存、`Cache-Control: public, s-maxage=60, stale-while-revalidate=300` 和字段权重排序；`2024` 不再因为封面加权返回大量无关建筑
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3180 页面）
- ✅ 本地浏览器验证：`/zh/map`、`/zh/timeline`、`/zh/browse` 桌面和 390px 手机宽无横向溢出；主入口未出现 `0 建筑师 · 0 建筑` 失望信息
- ✅ 部署验证：提交 `e1b0127` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-qyawdi0ou-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/map`、`/zh/timeline`、`/zh/browse` 均返回 200；`/api/search?q=2024` 只返回 `reinhard-ernst-museum:2024` 建筑结果

### 第三十阶段：P0 时间轴双模式与知识网络产品路线
- ✅ 新增 `docs/PRODUCT_STRATEGY.md`：把 Archistory 明确为建筑史知识网络，而不是建筑索引或图片站
- ✅ `/[lang]/timeline` 加回连续历史叙事层：古典世界、中世纪、文艺复兴到巴洛克、工业革命与现代主义、20世纪现代主义、当代
- ✅ `/[lang]/timeline` 保留现有 decade atlas，并把 decade card 容器改为 columns，避免等高网格造成截图中的大块空白
- ✅ `/[lang]/map` 国家/地区卡改为 columns；无合适封面时使用紧凑文字信息，不再撑出空白大图区域
- ✅ `/[lang]/browse` 建筑师区取消右侧高空白“按时期”面板，改为下方建筑师谱系入口，减少左右错位和空白
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3180 页面）
- ✅ 本地浏览器验证：`/zh/timeline`、`/zh/map`、`/zh/browse` 桌面和 390px 手机宽均无横向溢出；时间页可见 `叙事时间轴` 与 `年代索引`
- ✅ 部署验证：提交 `d4bd9d8` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-yt41h4o66-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/timeline` 可见 `叙事时间轴` 和 `年代索引`；`/zh/map` 可见 `国家与地区`；`/zh/browse` 可见 `建筑师谱系`

### 第三十一阶段：建筑师关系 overlay 第一版
- ✅ 新增 `src/lib/architect-knowledge-relations.ts`：以仓库 overlay 维护建筑师之间的师承、事务所脉络、教育、影响和合作关系
- ✅ 第一批关系覆盖柯布西耶 → 前川国男 / 坂仓准三、前川国男 → 丹下健三、丹下健三 → 槙文彦、布劳耶 → 芦原义信、赖特 → 劳特纳 / 阿尔托、柯布西耶 / 路易·康 → 安藤忠雄等高价值学习路径
- ✅ 建筑师详情页新增“知识网络 / 人物关系”面板，按当前建筑师自动显示 incoming / outgoing 关系，并链接到相关人物页
- ✅ 无关系数据的建筑师详情页不显示空 section，避免产生“这里应该有内容但没有”的失望感
- ✅ 文档同步：`DATA_SCHEMA.md` 记录 `Architect Relationship Overlay` 与未来 `entity_relations` 迁移方向；`PRODUCT_STRATEGY.md` 记录关系模型第一步已启动
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3180 页面）
- ✅ 本地页面验证：`/zh/architect/le-corbusier` 可见 `知识网络` 与 `人物关系`，`/zh/architect/kunio-maekawa`、`/zh/architect/kenzo-tange`、`/ja/architect/le-corbusier` 均返回 200
- ✅ 部署验证：提交 `7920387` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-nvx1awxfe-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/architect/le-corbusier`、`/zh/architect/kunio-maekawa`、`/zh/architect/tadao-ando` 可见 `知识网络`；`/ja/architect/le-corbusier` 可见 `知識ネットワーク`

### 第三十二阶段：前台文案与空白区域快速修正
- ✅ 建筑师关系模块文案改为面向读者的阅读提示，移除“已审校”“第一层”等内部产品/编辑口径
- ✅ 建筑师详情页桌面肖像限制最大宽度，避免右侧大图撑高 hero 后导致左侧出现大片空白
- ✅ 有精品关系 overlay 时隐藏旧版 `关联建筑师` 区块，避免与新关系模块重复且产生低信息密度卡片
- ✅ 建筑师详情页 `全部作品` 对缺图作品降级为紧凑文字索引，不再渲染大面积图片占位块
- ✅ 档案页 `建筑作品` 区去掉 sticky 右侧索引，类型与国家索引改为内容流下方双栏，减少桌面中段左右错位和空白
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3180 页面）
- ✅ 部署验证：提交 `bb9722f` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-4likvjhec-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/architect/le-corbusier` 已显示新读者文案与 `文字索引`，内部说明文案已移除

### 第三十三阶段：建筑页阅读路径第一版
- ✅ 建筑详情页新增 `知识网络 / 阅读路径` 面板，自动组织作者、时代、风格、地域和相近作品入口
- ✅ 阅读路径直接复用现有 `BuildingRelations` 数据，不新增数据库字段，避免先做重 schema 再验证体验
- ✅ 建筑页从“metadata + 图片 + 相关建筑”推进到“可继续阅读的知识节点”，为后续风格页、时代页和 `/graph` 铺路
- ✅ 文档同步：`DATA_SCHEMA.md` 记录 `Building Reading Paths` 自动关系来源；`PRODUCT_STRATEGY.md` 更新关系模型进展
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3180 页面）
- ✅ 本地页面验证：`/zh/building/8-house`、`/zh/building/apple-park` 可见 `知识网络 / 阅读路径`；`/ja/building/8-house` 可见 `知識ネットワーク / 読み進める経路`
- ✅ 部署验证：提交 `bac87b8` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-5knyh4i3n-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/building/8-house`、`/zh/building/apple-park` 可见 `知识网络 / 阅读路径`；`/ja/building/8-house` 可见 `知識ネットワーク / 読み進める経路`

### 第三十四阶段：风格页与时代页阅读路径第一版
- ✅ 风格详情页新增 `知识网络 / 阅读路径` 面板，自动组织上级风格、所属时代、子风格、代表人物和代表作品入口
- ✅ 时代详情页新增 `知识网络 / 阅读路径` 面板，自动组织上一时期、下一时期、关键风格、代表人物和代表作品入口
- ✅ 风格/时代页从“统计 + 列表”推进为可继续探索的知识节点，减少分类页面的孤立感和空白感
- ✅ 文档同步：`DATA_SCHEMA.md` 增加 `Style / Era Reading Paths`；`PRODUCT_STRATEGY.md` 更新关系模型当前进展
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3180 页面）
- ✅ 本地页面验证：`/zh/browse/style/modernism`、`/zh/browse/style/renaissance` 可见 `知识网络 / 阅读路径`；`/zh/browse/era/classical-era`、`/zh/browse/era/renaissance` 可见上一时期 / 下一时期 / 关键风格 / 代表人物 / 代表作品
- ✅ 部署验证：提交 `063595a` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-24uzgr6kw-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/browse/style/modernism`、`/zh/browse/style/renaissance`、`/zh/browse/era/classical-era`、`/zh/browse/era/renaissance` 可见 `知识网络 / 阅读路径`；`/ja/browse/style/modernism` 可见 `知識ネットワーク / 読み進める経路`

### 第三十五阶段：学习路径第一版
- ✅ 新增 `/[lang]/paths` 与 `/[lang]/paths/[slug]`，把建筑师、建筑、风格、时代串成可连续阅读的路线
- ✅ 第一批 3 条路径：从柯布西耶到日本现代主义、从文艺复兴到巴洛克、从赖特到有机现代主义
- ✅ 学习路径采用仓库 overlay：`src/lib/learning-paths.ts`，运行时解析现有实体并链接到详情页，不新增 Supabase 字段
- ✅ 导航接入：桌面导航、手机抽屉、首页知识导览、档案入口均增加 `路径`
- ✅ 文案全部面向读者，避免使用“已审校”“内部关系”等后台编辑口径
- ✅ 文档同步：`DATA_SCHEMA.md` 记录学习路径模型；`PRODUCT_STRATEGY.md` 标记三条学习路径进入第一版
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3192 页面）
- ✅ 本地响应验证：`/zh/paths`、`/zh/paths/corbusier-to-japanese-modernism`、`/ja/paths/corbusier-to-japanese-modernism` 均返回学习路径内容；`/zh/browse` 已显示 `路径 / 3 / 学习路线`
- ✅ 部署验证：提交 `fd2fba9` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-qqnb0d5u4-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/paths`、`/zh/paths/corbusier-to-japanese-modernism`、`/ja/paths/corbusier-to-japanese-modernism`、`/zh/browse` 均可见学习路径入口与内容

### 第三十六阶段：知识导航页密度与空白修复
- ✅ 时间轴年代索引从瀑布列改为稳定 responsive grid，减少卡片高度差造成的错位和不可预测空白
- ✅ 地图页国家/地区入口从展示型大图压缩为知识导航缩略图，移动端不再被单个国家卡片过度占据
- ✅ 分类详情页把缺少可信封面的建筑拆入 `文字索引`，避免用大面积浅色图片占位制造“这里应该有图但没有”的失望感
- ✅ `BrowseListing` 容器扩展到 `80rem`，让国家、风格、时代等列表页在桌面端更像档案页而不是窄栏清单
- ✅ 文档同步：`UI_RULES.md` 增加知识导航页 grid、侧栏高度、缺图文字索引与地图缩略图规则
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3192 页面）
- ✅ 本地页面验证：`/zh/map` 国家卡片高度从约 `526px` 降至约 `327px`；`/zh/browse/country/gb` 显示 `文字索引` 且无大图占位；`/zh/timeline` 年代索引继续可访问
- ✅ 部署验证：提交 `21df732` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-rn8pd4qmr-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/map`、`/zh/browse/country/gb`、`/zh/timeline` 均返回新版布局内容

### 第三十七阶段：建筑师页知识密度修复
- ✅ 建筑师详情页 `人物关系` 从大卡片改为紧凑关系表，保留关系类型、方向、目标人物、说明和来源
- ✅ `代表作` 区域在桌面端改为 `作品年表 + 全部作品` 双栏，减少年表与作品网格之间的大面积空白
- ✅ 全部作品中的无图作品继续进入文字索引，避免大面积占位图
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3192 页面）
- ✅ 本地页面验证：`/zh/architect/le-corbusier`、`/zh/architect/aalto`、`/ja/architect/le-corbusier` 均返回新版关系与作品区结构
- ✅ 部署验证：提交 `aaa80fc` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-quo8gxn0w-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/architect/le-corbusier` 可见新版 `作品年表 / 全部作品` 与紧凑人物关系结构

### 第三十八阶段：时间轴横向导航第一版
- ✅ 新增 `TimelineRail` 客户端组件，为时间轴页提供可拖动横向年代轨道
- ✅ 年代轨道支持鼠标拖动、左右翻页按钮和锚点跳转，补回用户喜欢的快速浏览时间功能
- ✅ 时间轴页形成三层结构：高密度年代入口、横向时间导航、叙事时间轴与年代索引
- ✅ 文档同步：`UI_RULES.md` 增加时间轴必须同时具备叙事层与快速定位层的规则
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3192 页面）
- ✅ 部署验证：提交 `988e51f` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-38epwlpc9-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/timeline`、`/ja/timeline` 均可见横向时间导航文案与年代锚点

### 第三十九阶段：时间轴时代关系层
- ✅ 时间轴 `TimelinePeriod` 模型新增 `question` 与 `transition`，把时代从静态分组改为建筑史问题链
- ✅ `/[lang]/timeline` 新增 `历史链条 / Historical chain / 歴史の連鎖` section，解释每个时代的核心问题与进入下一时代的转向
- ✅ 叙事时间轴卡片同步显示时代核心问题，用户在看建筑师与作品前先理解时代为什么变化
- ✅ 文档同步：`UI_RULES.md` 增加时间轴必须呈现“核心问题 + 历史转向”的规则
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3192 页面）
- ✅ 本地页面验证：`/zh/timeline`、`/ja/timeline`、`/en/timeline` 均可见历史链条与时代问题
- ✅ 部署验证：提交 `ccb46b6` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-irxalgrur-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/timeline`、`/ja/timeline`、`/en/timeline` 均可见历史链条与时代问题

### 第四十阶段：时代详情页接入历史问题模型
- ✅ 新增 `src/lib/timeline-periods.ts`，把时间轴大阶段、核心问题、历史解释、时代转向和关键词抽成可复用数据层
- ✅ `/[lang]/timeline` 改为引用统一时间轴模型，避免页面内重复维护历史解释
- ✅ `/[lang]/browse/era/[slug]` 新增 `历史问题 / Historical question / 歴史上の問い` 模块，展示该时代在建筑史中回应的问题、转向和关键词
- ✅ 时代详情页新增返回时间轴对应阶段的入口，让分类页从列表集合进一步变成知识节点
- ✅ 文档同步：`DATA_SCHEMA.md` 记录 `Timeline Period Model`，`UI_RULES.md` 要求时代详情页承接时间轴问题模型
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3192 页面）
- ✅ 本地页面验证：`/zh/browse/era/renaissance`、`/ja/browse/era/renaissance`、`/en/browse/era/renaissance` 均可见历史问题、时代转向和时间轴入口；`/zh/timeline` 继续可见历史链条
- ✅ 部署验证：提交 `b528cf5` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-n1mffkd76-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/browse/era/renaissance`、`/ja/browse/era/renaissance`、`/en/browse/era/renaissance` 均可见历史问题模块，`/zh/timeline` 继续可见历史链条

### 第四十一阶段：风格详情页接入时代背景
- ✅ `/[lang]/browse/style/[slug]` 在有关联时代时新增 `时代背景 / Period context / 時代背景` 模块
- ✅ 当 `Style` 自身没有 `era_slug` 时，前台会从关联作品的 `era_slug` 与 `year_start` 推断主时代，避免风格页继续停留在孤立列表
- ✅ 风格页显示该风格所在时间轴阶段的核心问题、历史解释和历史转向，并提供时代页与时间轴入口
- ✅ 文档同步：`DATA_SCHEMA.md` 与 `UI_RULES.md` 记录风格详情页必须连接时代问题模型
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3192 页面）
- ✅ 本地页面验证：`/zh/browse/style/modernism`、`/ja/browse/style/modernism`、`/en/browse/style/modernism` 均可见时代背景、时代页入口和时间轴入口
- ✅ 部署验证：提交 `d4398da` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-2eqisz4g9-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/browse/style/modernism`、`/ja/browse/style/modernism`、`/en/browse/style/modernism` 均可见时代背景、时代页入口和时间轴入口

### 第四十二阶段：建筑详情页接入历史背景
- ✅ `/[lang]/building/[slug]` 在图像与标题之后新增 `历史背景 / Historical context / 歴史背景` 模块
- ✅ 建筑页优先使用 `building.era_slug`，缺失时通过 `year_start/year_end` 推断时间轴阶段，显示作品所处的核心历史问题、时代解释和转向
- ✅ metadata 中的时代字段同步使用推断后的 `contextEra`，减少缺少 `era_slug` 时的空白
- ✅ 建筑页新增时代页与时间轴入口，让作品从孤立对象变成知识网络节点
- ✅ 文档同步：`DATA_SCHEMA.md` 与 `UI_RULES.md` 记录建筑详情页必须说明历史问题和时代转向
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3192 页面）
- ✅ 本地页面验证：`/zh/building/villa-savoye`、`/ja/building/villa-savoye`、`/en/building/villa-savoye` 均可见历史背景、时代页入口和时间轴入口
- ✅ 部署验证：提交 `091efa7` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-67t5v3fqg-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/building/villa-savoye` 可见历史背景、时代页入口和时间轴入口

### 第四十三阶段：建筑师关系图谱入口
- ✅ 新增 `/[lang]/graph`，作为第一版可读关系图谱入口
- ✅ 图谱页展示精选谱系路径：柯布西耶与日本现代主义、有机现代主义分支、安藤忠雄的现代主义远源
- ✅ 图谱页展示建筑师到建筑师的关系索引，包含关系类型、方向、说明和来源标题
- ✅ 桌面导航、移动抽屉与页脚新增 `图谱 / Graph / 関係図` 入口
- ✅ 文档同步：`DATA_SCHEMA.md` 记录 `Architect Relationship Graph` overlay，`UI_RULES.md` 规定图谱页第一版必须优先可读性
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）
- ✅ 本地页面验证：`/zh/graph`、`/ja/graph`、`/en/graph` 均可见知识图谱、谱系路径与关系索引；首页导航可见 `/zh/graph`
- ✅ 部署验证：提交 `6181a5f` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-hmgxii72k-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/graph`、`/ja/graph`、`/en/graph` 均可见知识图谱、谱系路径与关系索引；首页导航可见 `/zh/graph`

### 第四十四阶段：建筑作品研究模板第一版
- ✅ `/[lang]/building/[slug]` 新增 `作品研究 / Study map / 作品研究` 模块，把作品页组织为“历史背景 → 研究地图 → 空间/光线/动线 → 结构材料 → 来源 → 关联路径”
- ✅ 研究地图会标记各研究维度 `已整理 / 待补充`；待补充项不生成空锚点链接，避免用户点击后落入空 section
- ✅ 结构、材料、面积与来源从现有 `buildings` 字段读取，不新增数据库字段；日文页会避开未本地化的简体中文技术字段
- ✅ 文档同步：`DATA_SCHEMA.md` 记录建筑作品研究模板字段来源，`UI_RULES.md` 规定作品页研究顺序和待补充状态规则
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）
- ✅ 本地页面验证：`/zh/building/villa-savoye`、`/en/building/villa-savoye`、`/ja/building/villa-savoye` 均可见研究地图、历史背景、结构材料与来源文案
- ✅ 部署验证：提交 `1fea3eb` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-3kkyt9ox5-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/building/villa-savoye`、`/en/building/villa-savoye`、`/ja/building/villa-savoye` 均可见研究地图、历史背景、结构材料与来源文案

### 第四十五阶段：地图/时间/档案索引空白修复
- ✅ `/[lang]/map` 国家与地区索引改为 masonry columns，避免国家卡因有图/无图、高低不同被 CSS grid 拉出大面积空白
- ✅ `/[lang]/map` 城市线索拆成图片城市卡与文字城市索引；缺少可信本地图片的城市不再显示大图占位
- ✅ `/[lang]/timeline` 年代索引改为 masonry columns，保留双层时间轴结构，同时减少短年代卡造成的空白列
- ✅ `/[lang]/browse` 建筑师谱系与时代/风格索引改为 columns 布局，并把内部说明文案改为面向读者的阅读提示
- ✅ 文档同步：`UI_RULES.md` 增加索引型卡片必须使用 masonry/文字索引分层的规则
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）
- ✅ 本地页面验证：`/zh/map`、`/zh/timeline`、`/zh/browse` 可见新版索引文案；390px 与桌面宽度检查无横向溢出
- ✅ 部署验证：提交 `98540e5` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-bpzrq0xsd-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/map`、`/zh/timeline`、`/zh/browse` 均返回新版索引文案

### 第四十六阶段：地域总页与分类详情页索引统一
- ✅ `/[lang]/browse/country` 从旧纯文本列表升级为地域 archive index：总览指标、密度条、可信本地封面矩阵、城市文字线索和明确入口
- ✅ 国家/地区卡片使用 masonry columns，避免有图和无图国家被等高网格拉出大面积空白
- ✅ `BrowseListing` 的统计卡放回正常 section 节奏，减少 header 下方断层
- ✅ 分类详情页中的建筑师列表与有图作品列表改为 masonry columns，减少长标题和图片卡高度差造成的空洞
- ✅ 文档同步：`UI_RULES.md` 增加国家总页与分类详情页索引规则
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）
- ✅ 本地页面验证：`/zh/browse/country`、`/zh/browse/country/jp`、`/zh/browse/style/modernism` 可见新版结构；390px 与桌面宽度检查无横向溢出
- ✅ 部署验证：提交 `a53b6d5` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-5bgp4f055-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/browse/country` 与 `/zh/browse/country/jp` 均返回新版地域索引与分类详情结构

### 第四十七阶段：建筑类型详情页与分类兼容层
- ✅ `taxonomy.ts` 新增分类值规范化：兼容大小写、连字符/下划线/斜杠差异，以及英文 `architecture/building/type` 尾缀
- ✅ 相关作品匹配从直接比较 `type_slug` 改为使用规范化键，降低旧显示名或旧 slug 导致的漏关联
- ✅ `/[lang]/browse/type/[slug]` 改为复用 `BrowseListing`，和国家、风格、时代详情页共用有图/无图分层与 masonry 布局
- ✅ 文档同步：`DATA_SCHEMA.md` 记录分类兼容层与未来数据库迁移方向
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）
- ✅ 本地页面验证：`/zh/browse/type/religious`、`/zh/browse/type/cultural`、`/en/browse/type/religious` 均返回新版分类详情结构
- ✅ 部署验证：提交 `e10b28b` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-bzjxt2290-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh/browse/type/religious`、`/zh/browse/type/cultural`、`/en/browse/type/religious` 均返回新版分类详情结构

### 第四十八阶段：图片 override 重叠清理
- ✅ 清理 `image-overrides.json` 中被 `local-image-overrides.json` 完全覆盖的 22 个重复条目
- ✅ 保留本地缓存 override 作为唯一优先来源，前台图片选择逻辑不变：本地缓存优先，其次远程审核 override，再其次 Supabase primary image
- ✅ 重叠审计从 `22` 降为 `0`，远程 override 从 `42` 条降为 `20` 条
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）
- ✅ 部署验证：提交 `7111f35` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-gt69pn9lj-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app` 已指向该部署；本地重叠审计确认 `local 198 / remote 20 / overlap 0`

### 第四十九阶段：首页文案层整理
- ✅ `/[lang]` 首页新增 `HOME_COPY` 本页文案层，把 metadata、hero label、统计标签、section 描述和知识导览入口从组件 JSX 中集中出来
- ✅ 首页主体不再散落三语 UI 文案判断，后续调整 Archistory 品牌口吻、繁体显示和日文文案时可在单一结构中维护
- ✅ 保留日文页对未本地化简体数据的过滤逻辑，避免把数据库缺口误当成 UI 文案混入页面
- ✅ 英文首页新增 CJK 简介保护：当建筑描述缺少英文而回退到中文时，前台改显示地点/年份等结构化信息，避免英文页混入中文段落
- ✅ `formatDisplayLocation` 改为中文页保留原始中文地点，英文/日文页使用国家代码本地化国家名并隐藏未本地化中文城市名
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）
- ✅ 构建产物验证：`.next/server/app/zh.rsc`、`/en.rsc`、`/ja.rsc` 均可见对应首页 UI 文案；英文首页不再出现已知中文简介与中文地点片段
- ✅ 部署验证：提交 `12f549e` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-pqe037d08-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/zh`、`/en`、`/ja` 均返回新版首页 UI 文案；英文页显示 `China · 2019`，不再返回已知中文简介或中文地点片段

### 第五十阶段：本地大图体积压缩
- ✅ 压缩 3 张超过 1MB 的本地缓存 JPG：`asakusa-culture-center-1024.jpg`、`empire-state-building-1024.jpg`、`122-leadenhall-street-1024.jpg`
- ✅ 竖图最长边控制到 1600px；浅草文化观光中心图保持原始 914×1500 尺寸，避免无意义放大
- ✅ 3 张图片总量约从 3.4MB 降到 1.6MB；`public/images/curated` 中 1MB 以上 JPG 数量从 `3` 降为 `0`
- ✅ 人工抽样查看三张压缩后图片，未见明显压缩损伤或主题变暗问题
- ✅ 文档同步：`PERFORMANCE.md` 更新当前最大 JPG、curated 目录体积和后续图片入库阈值
- ✅ 部署验证：提交 `65dde75` 已推送 GitHub `main`，Vercel 生产部署 `architect-history-next-53ycroaq3-yrqx-95s-projects.vercel.app` Ready
- ✅ 正式域名验证：`https://archistory.app/images/curated/...` 三张图片返回压缩后的 `content-length`：392750、403580、893919 bytes

### 第五十一阶段：藤本壮介建筑师精品页
- ✅ `architect-content.ts` 新增 `fujimoto` 内容 overlay：中日英摘要、核心思想、三段长文、肖像、3 个代表作导读和文末来源
- ✅ 肖像使用 Wikimedia Commons 可追溯授权图片：`Sou_Fujimoto_2011.jpg`，作者 `Arturo.sanz`，许可 `CC BY-SA 4.0`
- ✅ 代表作导读覆盖 `musashino-art-museum`、`house-na`、`serpentine-pavilion-2013`，并自动接入站内藤本作品年表
- ✅ 来源列表包含藤本事务所官网、森美术馆、Serpentine、ArchDaily 和 Wikidata，继续遵循“来源驱动 + 改写 + 前台显示来源”的内容规则
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）
- ✅ 构建产物验证：`.next/server/app/zh/architect/fujimoto.rsc`、`/ja/architect/fujimoto.rsc`、`/en/architect/fujimoto.rsc` 均可见肖像、代表作和 Sources 区块

### 第五十二阶段：黑川纪章建筑师精品页与构建稳定性
- ✅ `architect-content.ts` 新增 `kurokawa` 内容 overlay：中日英摘要、核心思想、三段长文、肖像、3 个代表作导读和文末来源
- ✅ 肖像使用 Wikimedia Commons 可追溯授权图片：文部科学省公开肖像，许可 `CC BY 4.0`
- ✅ 代表作导读覆盖 `nakagin-capsule-tower`、`kuala-lumpur-airport`、`national-art-center-tokyo`，并自动接入黑川 4 个站内作品年表
- ✅ 来源列表包含黑川事务所、中银胶囊塔官方页、国立新美术馆建筑说明、MoMA 和 Wikidata
- ✅ `data.ts` 将 Supabase `fetchAll` 分页从 1000 条降为 500 条，并对 PostgREST JSON 解析类错误做短重试，修复静态生成时偶发/并发触发的 `Bad control character in JSON` 构建失败
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）
- ✅ 构建产物验证：`.next/server/app/zh/architect/kurokawa.rsc`、`/ja/architect/kurokawa.rsc`、`/en/architect/kurokawa.rsc` 均可见肖像、代表作和 Sources 区块

### 第五十三阶段：移动端菜单 UIUX 重做
- ✅ `MobileNav` 从右侧窄抽屉改为全屏移动菜单，避免露出背后首页、形成错位和双层关闭按钮
- ✅ 菜单顶部只保留 Archistory、当前菜单标题和一个关闭入口；打开时锁定页面滚动，避免底层内容跟随滚动
- ✅ 主导航改为 2 列触控卡片，覆盖首页、档案、路径、图谱、地图、时间六个知识入口，最小触控高度满足手机操作
- ✅ 搜索、导航、语言、阅读设置分区重排；中文简繁和主题切换统一收纳在阅读设置内，不再挤在页面顶部
- ✅ 移动端文案改为面向读者的“搜索 / 导航 / 语言 / 阅读设置”，不再使用“搜索档案”等拼接式标签
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）
- ✅ 手机视口验证：Playwright 390×844 打开 `/zh` 菜单，dialog 覆盖完整视口、仅 1 个关闭按钮、body scroll lock 生效，截图保存为 `/tmp/archistory-mobile-menu-final.png`

### 第五十四阶段：克里斯托弗·雷恩建筑师精品页
- ✅ `architect-content.ts` 新增 `wren` 内容 overlay：中日英摘要、核心思想、三段长文、肖像、3 个代表作导读和文末来源
- ✅ 肖像使用 Wikimedia Commons 可追溯公共领域图片：`Christopher_Wren_by_Godfrey_Kneller_1711.jpg`，作者 `Godfrey Kneller`，许可 `Public domain`
- ✅ 代表作导读覆盖 `st-pauls-cathedral`、`greenwich-hospital`、`hampton-court`，三者均已有本地可信作品图覆盖
- ✅ 内容重点从“科学/数学训练 → 伦敦大火后重建 → 英国巴洛克与城市天际线”建立阅读路径，符合 Architecture Knowledge Graph 的人物/时代/城市/作品关系方向
- ✅ 修复建筑师详情页日文 overlay 摘要被 `isProbablySimplifiedChinese` 误过滤的问题：人工 overlay 内容不再走数据库回退字段的简中防混入过滤
- ✅ 来源列表包含 Royal Society、St Paul’s Cathedral、Old Royal Naval College、Wikimedia Commons 和 Wikidata
- ✅ 本地验证：肖像 URL 与 Wikidata URL 返回 200；`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）
- ✅ 构建产物验证：`.next/server/app/zh/architect/wren.rsc`、`/ja/architect/wren.rsc` 均可见肖像、长文标题和参考资料

### 第五十五阶段：赫尔佐格与德梅隆建筑师精品页
- ✅ `architect-content.ts` 新增 `herzog-demeuron` 内容 overlay：中日英摘要、核心思想、三段长文、合伙人肖像、3 个代表作导读和文末来源
- ✅ 肖像使用 Wikimedia Commons 可追溯图片：`Jacques_Herzog_2025.jpg`，作者 `Quaenuncabibis`，许可 `CC BY-SA 4.0`；alt 明确为“合伙人雅克·赫尔佐格肖像”，不误称双人合照
- ✅ 代表作导读覆盖 `tate-modern`、`beijing-national-stadium`、`hamburg-elbphilharmonie`；站内四个 Herzog & de Meuron 作品归属已核对，均为 `architect_slug = herzog-demeuron`
- ✅ 内容重点从“表皮作为知识层 → 工业遗产转化为公共文化 → 当代地标的可读性”建立阅读路径，补强材料、城市记忆、公共文化建筑维度
- ✅ 来源列表包含 Pritzker、Tate、Herzog & de Meuron 官方项目页、Wikimedia Commons 和 Wikidata
- ✅ 内容筛选延续：`toyo-ito` 仍暂缓精品页，因为站内作品仍含 `todaiji-temple` 错误归属，需先修数据再写长文
- ✅ 本地验证：Pritzker、Tate、H&dM 国家体育场/易北爱乐厅、Wikimedia Commons、Wikidata 来源 URL 均已检查可访问；`npm run lint` 通过（剩余 2 个既有 `<img>` warning）

### 第五十六阶段：布鲁内莱斯基建筑师精品页
- ✅ `architect-content.ts` 新增 `brunelleschi` 内容 overlay：中日英摘要、核心思想、三段长文、肖像、3 个代表作导读和文末来源
- ✅ 肖像使用 Wikimedia Commons 可追溯公共领域图片：Masaccio 壁画细部中的 Filippo Brunelleschi 肖像，许可 `Public domain`
- ✅ 代表作导读覆盖 `florence-cathedral-dome`、`ospedale-innocenti`、`pazzi-chapel`；三者在站内均有可信图片记录，适合补强早期文艺复兴入口
- ✅ 内容重点从“工匠经验与线性透视 → 穹顶工程系统 → 公共建筑中的比例秩序”建立阅读路径，补强时间轴中中世纪晚期到文艺复兴的转折节点
- ✅ 来源列表包含 Encyclopaedia Britannica、Museo degli Innocenti、Opera di Santa Croce、Web Gallery of Art、Wikimedia Commons 和 Wikidata
- ✅ 内容筛选审计：本轮用 Supabase 只读查询对比覆盖层与作品数，优先选择“高作品数 + 有图 + 归属稳定”的缺口；`toyo-ito` 仍暂缓，等待 `todaiji-temple` 归属修正
- ✅ 本地验证：全部来源 URL 与肖像直链返回 200；`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）；构建产物中 `/zh/architect/brunelleschi` 与 `/ja/architect/brunelleschi` 均可见肖像、长文和参考资料

### 第五十七阶段：阿尔伯蒂建筑师精品页
- ✅ `architect-content.ts` 新增 `alberti` 内容 overlay：中日英摘要、核心思想、三段长文、肖像、3 个代表作导读和文末来源
- ✅ 肖像使用 Wikimedia Commons 可追溯 CC0 图片：`Leon_Battista_Alberti,_Self-Portrait,_c._1435,_NGA_43845.jpg`，作者为 Leon Battista Alberti
- ✅ 代表作导读覆盖 `palazzo-rucellai`、`santa-maria-novella`、`sant-andrea-mantua`，三者均为站内归属稳定且已有图片记录的文艺复兴作品
- ✅ 内容重点从“建筑师成为知识分子 → 《建筑十书》与古典秩序 → 立面作为城市秩序”建立阅读路径，承接 Brunelleschi 的工程/透视节点，补强文艺复兴理论链
- ✅ 来源列表包含 Encyclopaedia Britannica、Santa Maria Novella 官方页、Mantova 城市资料页、Wikimedia Commons 和 Wikidata；NGA 原页面脚本访问返回 403，因此前台使用 Commons 作为稳定肖像来源
- ✅ 本地验证：全部来源 URL 与肖像直链返回 200；`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）；构建产物中 `/zh/architect/alberti` 与 `/ja/architect/alberti` 均可见肖像、长文和参考资料
- ⚠️ 首次 Vercel 部署失败原因不是 Alberti 内容错误，而是构建期读取 Supabase `architects` 表时 Supabase/Cloudflare 返回 `522 Connection timed out`
- ✅ `data.ts` 加强 Supabase 分页读取重试：将 transient error 识别从 JSON 解析扩展到 `522`、`Connection timed out`、`Cloudflare`、`DOCTYPE`、network/timeout，并使用 6 次指数退避，降低生产构建被短时网络波动打断的概率

### 第五十八阶段：功能页密度与知识入口修复
- ✅ 全站 section 节奏收紧：降低地图、时间、档案和详情页在桌面端的纵向空白感，同时保留移动端呼吸感
- ✅ `/[lang]/timeline` 增加双层可拖动导航：先以“大历史时期”理解古典、中世纪、文艺复兴、工业现代和当代，再进入十年作品索引
- ✅ `/[lang]/timeline` 的十年索引继续使用 masonry columns，避免短年代卡被等高 grid 拉伸成大空白
- ✅ `/[lang]/map` 的国家/地区入口加入读者可理解的地域阅读路径，把地图从地名索引升级为建筑史地域线索
- ✅ `/[lang]/architect/[slug]` 的作品区改为“作品年表 + 阅读路径 + 全部作品”结构，减少左右列空洞，并把时代、风格、地域、时间入口并入同一研究路径
- ✅ 建筑师地域入口改为搜索入口，避免国籍字段不是国家代码时跳转到不存在的国家详情页
- ✅ 建筑作品研究地图文案移除“硬塞占位”等内部编辑口吻，改为面向读者的跳转说明
- ✅ `/api/image-proxy` 不再把本地宽度参数追加到 Wikimedia 原图 URL，减少远程原图被错误识别为非图片的概率
- ✅ `image-overrides.json` 新增 `paimio-sanatorium` 与 `vyborg-library` 有效 Wikimedia 覆盖图，替换注册表中两个 404 失效主图

### 第五十九阶段：体验审计补丁与破图回退
- ✅ 移动端导航从全屏平铺菜单改为底部抽屉：保留遮罩、清晰关闭按钮、搜索、主导航、语言、中文显示和主题设置，避免露出侧边旧页面造成“半打开”错觉
- ✅ `/[lang]/graph` 移除“第一版优先可读性”等内部产品口吻，改为面向读者的关系说明；`/graph` 与 `/paths` metadata 改为按语言生成
- ✅ `/[lang]/paths` 路线卡片高度从 `22rem` 收紧到 `16rem`，减少内容少时的大面积空白
- ✅ `/[lang]/architect/[slug]` 的 fallback 关联建筑师列表改为紧凑索引行，避免大卡片在关系数量少时制造空洞
- ✅ `/[lang]/map` 国家/地区卡片缩短：路径文案压为两行，代表图改成小图带，手机端一屏可看到更多入口
- ✅ `relations.ts` 过滤已确认 404 或不适合 Next 图片优化的外部 SVG/失效 Wikimedia 图；建筑详情页图库为空时回退到本地已治理 curated cover
- ✅ 本地验证：`npm run lint` 通过（剩余 2 个既有 `<img>` warning），`npm run build` 通过（3195 页面）；生产预览复扫 `/zh/map`、`/zh/building/villa-savoye`、`/zh/architect/aalto`、`/zh/graph`、`/zh/paths` 桌面/手机无横向溢出、当前视口无破图

### 当前 docs/ 结构（11 个文档）
```
docs/
├── PROJECT.md          — 项目定位与技术栈
├── STATUS.md           — 项目当前状态（本文件）
├── PRODUCT_STRATEGY.md — 产品路线与知识网络目标
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
1. 🟡 数据库中的 type_slug 已有前台兼容层，仍需长期迁移为稳定 slug
2. 🟢 首页 500 行，后续仍应拆分为 hero、featured、architect index、timeline preview 等子组件
3. 🟢 继续补全缺少 biography、portrait 和代表作图片的建筑师（下一批优先：Alberti、Bernini、Borromini、Michele De Lucchi、Riken Yamamoto；伊东丰雄需先修正作品归属）
4. 🟢 搜索 API 数据库全文索引待规划（短缓存与相关性排序已完成第一步）

## 下一步优先级

### 立即（本周）
1. 统一数据库中的 type_slug 为 slug
2. 继续补全缺少 biography、portrait 和代表作图片的建筑师
3. 拆分首页为子组件

### 短期（两周内）
4. 拆分 ImageGallery 过大组件
5. 新增图片入库前 1MB 阈值检查
6. 将高复用页面文案继续迁移到集中 copy/i18n 层

### 中期（一月内）
8. 执行 v3 迁移，创建 curated_images 表
9. 将 local-image-overrides.json 数据迁移入表
10. 补全缺少 biography 的建筑师
11. Ronchamp 本地缓存（等 IP 解封）
12. 继续补充 registry 中剩余 ~430 个建筑的本地缓存

### 长期
15. 2418 Unsplash 图片替换为 Wikimedia 可信图片
16. 对象存储迁移
17. 规划第二版地理可视化：仅在有足够经纬度与移动端性能预算时引入真实地图层
