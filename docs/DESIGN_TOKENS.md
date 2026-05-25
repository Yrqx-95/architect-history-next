# DESIGN_TOKENS.md — 设计令牌系统

> 本文件是项目的**唯一设计权威**。所有 UI 开发必须基于此文件中的令牌。  
> 源文件：`src/app/globals.css`（Tailwind v4 @theme 指令）

## 色彩系统

### Neutral（主色系）

```
paper-50   #fefdfb  — 页面背景（亮）
paper-100  #faf9f6  — 卡片/容器背景（亮）
paper-200  #f5f3ef  — 次级背景，区域分隔（亮）
paper-300  #ebe7e0  — 边框（亮）

warm-50    #fafaf8  — 浅背景
warm-100   #f5f4f1  — 卡片背景备选
warm-200   #e8e5df  — 分隔线
warm-300   #d4cfc6  — 次级边框
warm-400   #b8b0a4  — disabled / decorative only，不用于正文信息
warm-500   #9c9385  — muted text 的最低档，仅用于大号或低优先级文字
warm-600   #7d7468  — metadata, labels, secondary body text
warm-700   #5f584f  — body text primary
warm-800   #3d3731  — headings
warm-900   #2a2520  — strong headings
warm-950   #1a1714  — 极端强调

charcoal-50~950     — 暗模式整套色阶（结构同上）
```

### Accent（强调色）

```
clay        #b8673c  — 主强调：链接 hover、活跃状态
clay-light  #d4926a  — 次强调：装饰元素
terracotta  #c17d5a  — 备选强调
ochre       #b8964a  — 备选强调（评级、标签）
```

### 使用规则

| 用途 | 亮模式 | 暗模式 |
|------|--------|--------|
| 页面背景 | paper-50 | charcoal-950 |
| 卡片背景 | paper-100 | charcoal-800 |
| 标题文字 | warm-800 | paper-100 |
| 正文 | warm-700 | warm-200 |
| 次要文字 | warm-600 | warm-300 |
| 边框/分隔 | warm-200 | charcoal-700 |
| 强调（交互） | clay | clay-light |

## Typography

### 字体家族

| Token | 值 | 用途 |
|-------|---|------|
| `--font-sans` | system-ui, -apple-system, 'Segoe UI', sans-serif | 正文、UI |
| `--font-serif` | 'Georgia', 'Times New Roman', 'Noto Serif SC', 'Hiragino Mincho Pro', serif | 标题、prose |
| `--font-serif-display` | 'Georgia', 'Times New Roman', serif | 大数字、装饰标题 |
| `--font-mono` | 'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace | 代码、年份、数据 |

### 排版层级

| Class | 字号 | 行高 | 字重 | 用途 |
|-------|------|------|------|------|
| `.heading-display` | text-3xl~5xl | 1.15 | bold, tracking-tight | 页面主标题 |
| `.heading-1` | text-3xl~4xl | 1.2 | bold, tracking-tight | 次要页面标题 |
| `.heading-2` | text-2xl~3xl | 1.25 | bold | section 标题 |
| `.heading-3` | text-xl | 1.3 | semibold | 子 section 标题 |
| `.heading-4` | text-lg | 1.35 | semibold | 小标题 |
| `.body-large` | text-base~lg | relaxed | — | 导语/引言 |
| `.body` | text-base | relaxed | — | 正文 |
| `.body-sm` | text-sm | relaxed | — | 次要内容 |
| `.caption` | text-xs | 1.5 | — | 图片 caption、脚注 |
| `.metadata` | text-xs | 1.4 | — | 标签、日期、属性 |
| `.eyebrow` | text-xs | 1.5 | medium, uppercase, tracking-widest | 分类标签 |
| `.pullquote` | text-base~lg | 1.6 | italic | 编辑引文 |
| `.label` | text-xs | 1.4 | medium | UI 标签 |

### Typography 规则

- 每个页面仅一个 heading-display 或 heading-1
- section 标题使用 heading-2
- 正文段落用 `.flow` 管理垂直节奏
- 署名信息必须用 `.metadata`，实际颜色为 warm-600 / warm-300，避免低对比
- 不使用自定义 font-size（用预定义 class）

## Spacing

### Section 间距

| Class | 移动端 | 桌面端 | 用途 |
|-------|--------|--------|------|
| `.section-sm` | mb-8 | mb-12 | 卡片组间、子 section |
| `.section` | mb-14 | mb-20 | 标准 section |
| `.section-lg` | mb-20 | mb-28 | 主要分隔 |

### 内间距

| Token | 值 | 用途 |
|-------|---|------|
| `--spacing-rhythm` | 1.625rem | 段落间垂直节奏（匹配 body line-height） |
| `--spacing-gutter` | 1.5rem | 卡片/容器内边距 |
| `--spacing-gutter-sm` | 1rem | 紧凑内边距 |
| `--spacing-breath` | 2.5rem | 内容块间呼吸间距 |

### Flow 容器

| Class | 行为 |
|-------|------|
| `.flow` | 子元素间距 = 1.625rem（rhythm） |
| `.flow-sm` | 子元素间距 = 1rem |
| `.flow-lg` | 子元素间距 = 2.5rem |

## Container（最大宽度）

| Class | 宽度 | 用途 |
|-------|------|------|
| `.container-wide` | 80rem (1280px) | 首页 hero、时间轴全宽 |
| `.container-content` | 64rem (1024px) | 标准页面内容 |
| `.container-read` | 42rem (672px) | 正文阅读列 |
| `.container-narrow` | 28rem (448px) | 侧栏、元数据面板 |

所有 container 都自带 `mx-auto px-3 sm:px-6`。

## Radius

| Token | 值 | 用途 |
|-------|---|------|
| `--radius-none` | 0 | 尖锐边缘 |
| `--radius-xs` | 0.25rem | 小标签 |
| `--radius-sm` | 0.375rem | 紧凑元素 |
| `--radius-md` | 0.5rem | **建筑卡片（默认）** |
| `--radius-lg` | 0.75rem | 大卡片 |
| `--radius-xl` | 1rem | 面板、对话框 |
| `--radius-full` | 9999px | 圆形元素、标签 |

## Shadow

| Token | 值 | 用途 |
|-------|---|------|
| `--shadow-none` | none | 平面元素 |
| `--shadow-subtle` | 0 1px 2px rgba(0,0,0,0.03) | 微弱分层 |
| `--shadow-card` | 0 1px 3px rgba(0,0,0,0.04) | **卡片默认** |
| `--shadow-card-hover` | 0 4px 16px rgba(0,0,0,0.06) | 卡片 hover |
| `--shadow-elevated` | 0 8px 32px rgba(0,0,0,0.07) | 浮层 |
| `--shadow-modal` | 0 16px 48px rgba(0,0,0,0.12) | 模态框 |

## Z-Index

| Token | 值 | 用途 |
|-------|---|------|
| `--z-base` | 0 | 默认 |
| `--z-dropdown` | 10 | 下拉菜单 |
| `--z-sticky` | 50 | 粘性导航 |
| `--z-overlay` | 80 | 覆盖层、灯箱 |
| `--z-modal` | 100 | 模态框 |
| `--z-toast` | 120 | 通知 |

## Animation

### Duration

| Token | 值 | 用途 |
|-------|---|------|
| `--duration-fast` | 150ms | 微交互（hover 色变） |
| `--duration-normal` | 250ms | 标准过渡 |
| `--duration-slow` | 400ms | 入场动画、页面切换 |
| `--duration-glacial` | 700ms | 大型元素变换 |

### Easing

| Token | 值 | 用途 |
|-------|---|------|
| `--ease-out` | cubic-bezier(0.16, 1, 0.3, 1) | 出场动画 |
| `--ease-in-out` | cubic-bezier(0.83, 0, 0.17, 1) | 对称过渡 |
| `--ease-spring` | cubic-bezier(0.34, 1.56, 0.64, 1) | 弹性（谨慎使用） |

### Motion Distance

| Token | 值 | 用途 |
|-------|---|------|
| `--motion-short` | 8px | 页面入场、微小偏移 |
| `--motion-medium` | 16px | section reveal |
| `--motion-long` | 24px | 大元素入场 |

### 动画 Class

| Class | 行为 |
|-------|------|
| `.page-enter` | opacity + translateY(8px) 入场，400ms |
| `.reveal-anim` | 滚动驱动：opacity + translateY(16px)，view-timeline |
| `.fade-in` | 仅 opacity 入场，400ms |

## Grid（响应式断点）

```
sm: ≥640px   — 手机横屏
md: ≥768px   — 平板
lg: ≥1024px  — 小型桌面
xl: ≥1280px  — 标准桌面
```

### 推荐列数

| 内容 | sm | md | lg | xl |
|------|----|----|----|-----|
| 建筑卡片 | 1 | 2 | 3 | 4 |
| 建筑师卡片 | 1 | 2 | 4 | 5 |
| 搜索卡片 | 1 | 2 | 3 | 4 |
| 文本区 | 1 | 1 | 1 | 1 (container-read) |

## 卡片标准

```
建筑卡片结构（BuildingCard.tsx 实际实现）：
┌──────────────┐
│   [image]    │  aspect-[4/3] sm:aspect-[3/2]
│              │  SafeImage fill + object-cover
│   architect  │  0.68rem uppercase tracking-[0.12em] (可选)
│   name       │  text-base sm:text-lg font-medium line-clamp-2
│   loc · year │  text-xs text-warm-600 / dark:text-warm-300
└──────────────┘

根部常量：
- border-radius: rounded-md (0.5rem)
- 图片 bg: warm-100 (亮) / charcoal-900 (暗)
- hover: scale-[1.015] on image, text color transition
- transition: 500ms ease-out (image), 200ms (text)
- 无边框，无阴影
```

## 使用规则

1. 所有间距使用 section/section-sm/section-lg，禁止随机 mb-20/mb-28
2. 所有文字使用预定义 typography class，禁止随机 font-size
3. 建筑卡片使用 BuildingCard 组件，不要页面内自行实现卡片布局
4. 容器使用 container-wide/content/read/narrow
5. 彩色元素仅使用 clay/terracotta/ochre，禁止其他强调色
6. 暗模式使用 .dark 前缀的 class，不要自己写 dark: 内联样式
