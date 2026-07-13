# PROJECT.md — Archistory

## 网站定位

**Archistory / 建筑时间档案** —— 建筑、人物与时代的在线档案，一个长期可扩展、专业、具有建筑杂志感的知识平台。

覆盖维度：
- 建筑时间（时代与时期）
- 建筑风格
- 建筑师与事务所
- 建筑作品（单体与群体）
- 时间（年代编年）
- 深度分析（空间 / 光线 / 动线 / 结构 / 材料）

目标用户：建筑学生、从业者、研究者，以及对建筑史有兴趣的知识读者。

## 技术栈

| 层 | 技术 | 版本 |
|----|------|------|
| 框架 | Next.js (App Router) | 16.2.6 |
| 语言 | TypeScript | 5.x (strict) |
| 样式 | Tailwind CSS | v4 |
| 排版 | @tailwindcss/typography | 0.5 |
| 动画 | CSS + IntersectionObserver | — |
| 平滑滚动 | 浏览器原生滚动 | — |
| 数据库 | Supabase (PostgreSQL) | — |
| 部署 | Cloudflare Workers（Reviewed production release） | Production |
| 三语 | zh / en / ja | — |

## 当前功能

### 内容浏览
- 首页：精选建筑 hero + 风格入口 + 时代入口 + 建筑师索引
- 浏览页：按建筑师 / 建筑 / 时代 / 风格 / 类型 / 国家浏览
- 搜索：全站搜索；中英日用途同义词、毕业分析关键词、用途/年代/国家/建筑师/毕业课题筛选

### 详情页
- 建筑师详情：生平、教育、核心思想、代表作、影响关系图
- 建筑详情：图片画廊、深度分析三模块（空间/光线/动线）、技术参数面板
- 毕业案例与主体建筑：双向入口；基础事实/图片/版权统一，毕业分析层独立保留
- 时代详情：关联风格、建筑师、建筑
- 风格详情：父子风格关系、代表人物与建筑

### 时间轴
- 按年代分组展示建筑师与建筑

### 图片系统
- 远程图片代理 (api/image-proxy)
- 本地缓存图片 (public/images/curated/)
- 自动署名组件 (ImageAttribution)
- 图片策展策略 (image-policy.ts)

## 长期目标

1. 覆盖世界主要建筑史时期与风格
2. 每个建筑师有完整的 biography、代表作、影响关系
3. 每个建筑有图片画廊 + 三语深度分析
4. 建立图片治理体系：本地缓存 > Wikimedia > IIIF > Museum API
5. 将 Unsplash 图片逐步替换为可信授权图片
6. 迁移图片系统到对象存储（R2 / Supabase Storage）
7. 主体与毕业运行时数据统一由 Supabase 提供；JSON/CSV 仅保留兼容导出与历史证据

毕业制作案例与主体建筑的统一工作使用独立、可验收的主任务清单：
[GRADUATION_UNIFICATION_TASKS.md](GRADUATION_UNIFICATION_TASKS.md)。后续不得只依赖聊天记录推进。

## UI 风格方向

核心关键词：**建筑杂志感、高信息密度、强 typography、清晰 grid、专业感**

参考气质：ArchDaily / Dezeen / Aesop / MUJI

### 设计原则

- **内容优先**：让建筑本身说话，减少设计噪音
- **高信息密度**：每个模块承载有意义的信息，避免空洞装饰
- **强 typography**：标题/正文/元数据有清晰的层级和垂直节奏
- **克制色彩**：stone / warm / charcoal 中性色系，仅在强调时使用 terracotta / clay / ochre
- **清晰 grid**：响应式网格，列数随视口递增
- **专业署名**：所有图片显示 photographer + license + source

## 禁止事项

- ❌ 太空科技风（dark neon, gradient mesh, futuristic UI）
- ❌ Apple 官网式超大留白（hero 全屏空白）
- ❌ 重复大图（同一页面内同一图片多次出现）
- ❌ 低信息密度（一个 section 只有一个标题）
- ❌ 浮夸动画（bounce, spin, 过度 parallax）
- ❌ 玻璃拟态泛滥（glassmorphism）
- ❌ 霓虹色 / 渐变炫彩
- ❌ 无意义的装饰元素

## 开发原则

### 代码层面

1. **每次变更前先阅读 docs/***：理解项目状态、UI 规范、技术债
2. **保持 UI 风格统一**：参考 UI_RULES.md，新增组件必须符合设计系统
3. **不要随意修改核心架构**：data.ts 数据层、i18n.ts 国际化、types.ts 类型系统是核心
4. **修改完成后自动更新 STATUS.md**：记录新的完成项、新发现的问题
5. **所有新功能必须三语支持**：zh / en / ja

### 图片治理原则（来自前期工作总结）

- 优先级：本地缓存图 > 已审核 Wikimedia > Museum/IIIF > 远程 Wikimedia > Unsplash（仅氛围图）
- 所有图片必须保留 photographer / license / source_url
- CC BY-NC 不可接受（非商业限制与平台定位冲突）
- 不使用 Unsplash 作为建筑实体主图

### 提交与部署

- 每次功能或公共数据变更：通过 `.github/workflows/production-release.yml` 的 Reviewed production release 发布到 Cloudflare。
- 发布前必须通过质量门禁、完整测试和 Worker 构建；发布后验证关键路由、真实 404 与新内容来源。
- 只改文档或只读治理脚本时不触发全站生产部署。
