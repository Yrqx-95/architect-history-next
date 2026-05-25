# UI_RULES.md — 设计规范

> 本项目 UI 目标：**奢侈品极简 + 高可读建筑档案 + 专业 typography**
> 参考气质：Aesop / COS / 一流建筑设计事务所官网

## 色彩

### 主色系 (Neutral)

```
paper-50  (#fefdfb)  — 页面背景（亮）
paper-100 (#faf9f6)  — 卡片背景（亮）
paper-200 (#f5f3ef)  — 区域分隔（亮）
paper-300 (#ebe7e0)  — 边框（亮）

warm-50~950           — 文字色阶（亮模式主要使用 warm-700~950）
charcoal-50~950       — 暗模式色阶
```

### 强调色 (Accent)

```
clay       (#b8673c)  — 主强调（链接 hover、活跃状态）
clay-light (#d4926a)  — 次强调（标签、装饰元素）
terracotta (#c17d5a)  — 备选强调
ochre      (#b8964a)  — 备选强调（评级、标签）
```

### 规则

- 大面积背景仅用 paper/warm/charcoal 色系
- clay/terracotta/ochre 仅在交互元素（hover、active badge、decorative line）上使用
- 不要用纯黑 (#000) 或纯白 (#fff) 做大面积背景
- 主题默认跟随系统，用户可在 `系统 / 亮 / 暗` 三态中手动选择
- 暗模式必须同步改变页面背景、surface、输入框、边框、正文和辅助文字
- 正文、caption、metadata、eyebrow、年份、城市、搜索提示等信息文字必须使用语义层级：`text-primary` / `text-secondary` / `text-muted`
- 禁止用 `text-warm-400`、`dark:text-charcoal-400/500` 或任何接近背景色的浅灰承载信息；浅灰只可用于装饰线、占位骨架、非必要符号

## Typography

### 字体

```css
--font-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;
--font-serif: 'Georgia', 'Times New Roman', 'Noto Serif SC', 'Hiragino Mincho Pro', serif;
--font-serif-display: 'Georgia', 'Times New Roman', serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace;
```

- **标题**：serif（Georgia / Noto Serif SC 中文）
- **正文**：sans（system-ui）
- **元数据/caption**：sans, font-feature-settings: "tnum"
- **代码/技术数据**：mono（JetBrains Mono）
- **注意**：项目不使用 Google Fonts，全部使用系统字体 + fallback 链。这有利于性能和零外部依赖。

### 层级

```
.heading-display  — 3.25rem / 3.5rem   (页面主标题，首页hero内部标题为自定义尺寸)
.heading-1        — 2.5rem / 2.75rem   (次要页面标题，仅type页和BrowseListing使用)
.heading-2        — 1.875rem / 2.25rem (section 标题)
.heading-3        — 1.5rem / 1.875rem  (卡片内标题，但BuildingCard使用自定义 text-base/text-lg)
.heading-4        — 1.25rem / 1.75rem  (子标题)
.body-large       — 1.125rem / 1.75rem (导语/引言段落)
.body             — 1rem / 1.625rem    (正文)
.body-sm          — 0.875rem / 1.375rem (次要文字)
.caption          — 0.75rem / 1.125rem  (caption)
.metadata         — 0.75rem / 1rem      (技术参数、署名)
.eyebrow          — 0.75rem, uppercase, tracking-wider (分类标签)
```

### 规则

- 每个页面只有一个 heading-display 或 heading-1
- heading-2 之间间距 ≥ section-sm (3rem)
- 正文段落用 `.flow` 容器管理垂直节奏（margin-bottom: 1.625rem）
- 中文字体需要 `Noto Serif SC` fallback
- 日文字体需要 `Noto Serif JP` fallback
- 署名信息必须用 `.metadata`，不要额外降到 `text-warm-400`、`dark:text-charcoal-400` 或自定义低对比色

## Spacing

### Section 间距

```
.section-sm  — 3rem   (卡片组之间)
.section     — 5rem   (标准 section)
.section-lg  — 7rem   (主要 section 分隔)
.section-xl  — 10rem  (首页大区块)
```

### 内边距 / 流动间距

```
gutter     — 1.5rem   (卡片/容器内边距)
gutter-sm  — 1rem     (紧凑内边距)
rhythm     — 1.625rem (正文段落间距，与 body line-height 对齐)
breath     — 2.5rem   (内容块之前的大呼吸间距)
```

### 规则

- 页面上第一个 section 的顶部不额外加间距（由 layout 的 nav 高度自然分隔）
- section 之间用 section-lg，section 内部子模块用 section-sm
- 卡片内部 padding 统一用 gutter (1.5rem)
- 不要制造 > 10rem 的无内容空白区域

## Grid

### 响应式列数

```
sm (≥640px):  1-2 列
md (≥768px):  2-3 列
lg (≥1024px): 3-4 列
xl (≥1280px): 4-6 列
```

### 容器宽度

```
.container-wide    — 80rem (1280px)  (首页 hero、时间轴全宽)
.container-content — 64rem (1024px)  (标准页面内容)
.container-read    — 42rem (672px)   (正文阅读)
.container-narrow  — 28rem (448px)   (侧栏、元数据面板)
```

### 规则

- 建筑卡片网格：lg 时 3 列，xl 时 4 列
- 建筑师卡片网格：lg 时 4 列，xl 时 5 列
- 搜索结果网格：与建筑卡片一致
- 卡片之间间距用 `gap-6`（1.5rem）
- 详情页正文区必须用 container-read 限制行宽

## Card

### Building Card

```
实际结构 (src/components/BuildingCard.tsx)：
┌──────────────┐
│   [image]    │  aspect-[4/3] sm:aspect-[3/2]，SafeImage fill + object-cover
│   architect  │  0.68rem uppercase tracking-[0.12em] (仅当有architectName时显示)
│   name        │  text-base sm:text-lg font-medium line-clamp-2
│   location·year│ text-xs text-muted
└──────────────┘
```

- 背景：`bg-surface-muted`
- hover：scale-[1.015] on image, text color transition
- transition：500ms ease-out on image
- border-radius：rounded-md (0.5rem)
- 不使用 heading-3 类而是自定义 font-size/weight
- 卡片无边框、无阴影（区别于 UI_RULES 标准，这是实际实现）

### Architect Card（紧凑型）

```
┌──────────────────┐
│  name            │  .body, font-medium
│  years · era     │  .caption
└──────────────────┘
```

### 规则

- 卡片禁止内嵌动画（动画只在 hover 时触发）
- 不要用玻璃拟态或渐变边框
- 卡片阴影保持 subtle（shadow-card: 0 1px 3px rgba(0,0,0,0.04)）
- 图片加载失败时降级为 `.img-placeholder`（对角线渐变占位符）

## Section Hierarchy

### 首页结构

```
1. CinematicHero       — 占 ~60vh，大图 + 标题 + 署名
2. Archive Entry       — 计数统计 + 搜索入口
3. Featured Buildings  — 4列网格 + 侧栏署名
4. Featured Architects — 紧凑卡片索引
5. Timeline Preview    — 时代/时期快速导航
6. Style Tag Cloud     — 风格标签云
7. Knowledge Guides    — 三语声明 + 外部链接
```

### 详情页结构

```
1. Breadcrumb          — 面包屑
2. Image Gallery / Hero
3. Name + Significance — heading-1 + pullquote
4. Metadata Panel      — 技术参数表
5. Deep Analysis       — 空间/光线/动线 (ArticleSection + ImageBreak 交替)
6. Related Content     — ContinueExploring
```

### 规则

- Hero 区域：移动端 68vh，桌面端 74vh（max-h: 820px）
- Hero 内部标题使用自定义尺寸（text-4xl sm:text-6xl lg:text-7xl），不使用 heading-display 类
- 每个 section 必须有实质性内容（不是纯装饰）
- 不要在同一个页面内重复展示同一张图片
- "查看全部" 按钮在内容超过显示数量时必须存在

## Image

### 类型与处理

| 场景 | 组件 | 图片加载 |
|------|------|---------|
| 首页 hero | `<img>` 原生 | 直接加载，background |
| 建筑卡片 | SafeImage (next/image) | 通过 image-proxy 代理 |
| 建筑详情画廊 | SafeImage (next/image) | 通过 image-proxy 代理 |
| 文章内图片 | ImageBreak (SafeImage) | 全出血装饰图 |
| 编辑图片 | EditorialImage (`<img>`) | 外部图片，加载失败降级 |

### 规则

- 所有图片必须有 alt 文本
- 所有展示图片必须有 photographer + license + source（使用 ImageAttribution 组件）
- 图片比例：建筑卡片 16:10，画廊主图 16:9，文章插图 21:9
- 图片加载失败时有降级占位符（不允许空白区域）
- 本地缓存图片优先于远程 URL
- 不使用 Unsplash 作为建筑实体主图

## Search UX

### 目标

搜索页是档案入口，不只是一个表单。用户应能通过建筑名、建筑师、城市、国家、年代、类型、风格或时代进入内容。

### 规则

- 搜索页顶部必须说明可搜索的线索类型。
- 搜索框下方提供 3-5 个常用入口 chip，帮助用户从空状态开始。
- 有结果时显示结果数量，建筑结果优先展示封面缩略图、地点、年份、类型。
- 无结果页不能成为死路，必须提供替代搜索建议和分类浏览入口。
- 搜索结果可以是紧凑图文列表，不必复用完整 BuildingCard；目标是快速扫描和回到详情页。
- API 搜索应覆盖 name_zh / name_en / name_ja、城市、国家、类型、时代、风格与年份等常见查询类型。

### 参考来源

- Baymard “No Results Page” UX：无结果页需要引导用户回到可继续探索的路径。
- Baymard “Search Query Types” UX：搜索应支持用户自然输入的多种查询类型，而不是只匹配标题。
- Letterform Archive Online Archive：档案类网站适合按 country / designer / decade / format 等维度浏览，并在搜索/筛选时保持视觉结果。

## Animation

### 允许的动画

- **fade-in**：opacity 0→1, 400ms（元素入场）
- **reveal**：opacity + translateY(12px→0), 600ms（滚动触发，once）
- **page-enter**：opacity + translateY(8px→0), 500ms（页面切换）
- **card-hover**：scale(1.02) + shadow 过渡, 200ms
- **图片 fade-in**：加载完成后 opacity 过渡（300ms）

### 禁止的动画

- ❌ bounce / spring / elastic
- ❌ rotate / flip（除非是图片画廊的交互动效）
- ❌ 大型 parallax（简单的 sticky progress 可以）
- ❌ 连续循环动画（loading skeleton 除外）
- ❌ 入场 stagger 超过 100ms 间隔（列表项 stagger 控制在 50-80ms）

### 性能

- 滚动驱动动画使用 CSS `animation-timeline: view()`（GPU 加速，无 JS）
- framer-motion 动画使用 `whileInView` + `once: true`（不重复触发）
- `prefers-reduced-motion` 时禁用所有非必要动画
- 移动端自动降级为静态（检测 touch 设备）

## Responsive

### 断点策略

```
sm:  640px   — 手机横屏
md:  768px   — 平板
lg:  1024px  — 小型桌面
xl:  1280px  — 标准桌面
```

### 规则

- 移动端：单列布局，卡片全宽
- 平板端：2-3 列网格
- 桌面端：3-4 列网格
- 移动端导航使用 MobileNav 抽屉菜单：搜索、主导航、语言、中文简繁、主题分区展示
- 移动端首页 hero 的文字不得贴近装饰边框；正文内容与内框至少保留 16px 视觉安全距离，metadata 不直接用贴边的上边线
- 建筑师精品页的人物肖像放在档案 overview 上方，移动端出现在姓名后、正文前；长文章正文区不再重复大尺寸肖像
- 移动端所有可点控件最小触控高度 44px，语言/主题/简繁 segmented control 不得挤在 header 中造成换行
- 图片在移动端加载 640px 宽度，桌面端 1200px（通过 sizes 属性）
- 不要使用 `hidden` 来隐藏移动端的重要内容块——用重排替代隐藏

## 三语支持

### 语言代码

```
zh — 简体中文（默认回退语言）
en — 英文
ja — 日文
```

### 中文简繁

中文页面 `/zh` 支持页内 `简 / 繁` 切换，不新增 `/zh-tw` 路由。默认跟随浏览器语言，台湾/香港/澳门/繁体中文环境显示繁体，其余显示简体；用户选择后写入 `localStorage.chineseScript`。

繁体转换使用台湾繁体规则，第一版允许自动转换全站中文；精品内容后续可增加人工繁体覆盖。信息性文字禁止使用接近背景的浅灰，繁体模式下同样必须满足语义色层级。

### 规则

- 所有 UI 文本使用 `t(lang, key)` 函数（`@/lib/i18n`）
- 内容文本使用 `displayText(obj, lang)` 或 `displayName(obj, lang)`（`@/lib/types`）
- 图片类型标签使用 `tImageType(lang, type)`
- 不要在组件中硬编码文本字符串（除了纯开发/调试信息）
- 新增 key 时同步添加三种语言的翻译
- 回退链：指定语言 → zh（默认）→ key 原文
