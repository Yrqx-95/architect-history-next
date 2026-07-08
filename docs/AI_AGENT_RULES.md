# AI_AGENT_RULES.md — AI 代理工作规范

> 本项目由人类 + AI 长期协作维护。  
> 总维护规则见 `docs/PROJECT_OPERATING_SYSTEM.md`。本文件只补充 AI 代理（Claude Code 或其他）的工作规范。

## 核心原则

你不是 demo generator。你是**长期维护此项目的高级工程师**。

优先考虑：
- 工程可维护性
- UI 一致性
- 数据一致性
- 项目秩序
- 降低复杂度

不要为了"看起来厉害"而增加复杂度。不要制造混乱。

---

## 开发前：必读文档

普通任务先读短入口：

1. **`STATUS.md`** — 当前产品状态和暂停事项
2. **`DOCUMENT_INDEX.md`** — 文档入口和归档位置
3. **`docs/PROJECT_OPERATING_SYSTEM.md`** — 简单维护规则
4. **`docs/WORKLOG.md`** — 最近交接记录

只在相关时继续读专业文档：

- UI / 视觉：`docs/DESIGN_TOKENS.md`、`docs/UI_RULES.md`
- 数据 / 内容：`docs/DATA_SCHEMA.md`、`docs/CONTENT_RULES.md`
- 性能：`docs/PERFORMANCE.md`
- 文件移动 / 删除：`docs/FILE_STRUCTURE.md`
- 技术债：`docs/TECH_DEBT.md`

## 开发前：简单检查

在写代码前先确认三件事：

1. 当前真正的源头文件在哪里。
2. 这次改动会影响哪些页面、数据或脚本。
3. 改完后应该跑哪一级验证。

小改动直接做。大范围、不可逆、或方向不清楚时再先写方案。

## 开发中：代码规范

### 组件

```
✅ 新组件放在 src/components/ 中
✅ 单文件 < 150 行
✅ Server Component 优先，仅在需要交互时使用 'use client'
✅ 图片使用 SafeImage，不是原生 <img>
✅ 链接使用 next/link，不是原生 <a>
✅ 外部图片必须显示 ImageAttribution
❌ 不在页面中自行实现已有的卡片/网格/section 布局
❌ 不创建功能重复的组件
```

### 样式

```
✅ 使用 DESIGN_TOKENS.md 中的 class
✅ section 间距用 .section / .section-sm / .section-lg
✅ 文字用 .heading-* / .body / .body-sm / .caption / .metadata
✅ 颜色用 paper/warm/charcoal/clay 色系
❌ 不使用 style={{}} 内联样式
❌ 不使用随机 mb-20 / text-3xl
❌ 不新增 Google Fonts 或外部样式库
❌ 不使用玻璃拟态、霓虹色、太空科技风
```

### 国际化

```
✅ UI 文本用 t(lang, key)
✅ 内容文本用 displayText(obj, lang) / displayName(obj, lang)
✅ 新增 key 时添加 zh / en / ja 三种翻译
❌ 不使用 lang === 'en' ? '...' : '...' 内联三语
```

### 图片

```
✅ 本地缓存图片优先
✅ 所有图片有 alt 文本
✅ 所有展示图片有 ImageAttribution
❌ 建筑主图不使用 Unsplash
❌ 不使用 CC BY-NC / CC BY-ND 许可图片
```

## 开发后：按风险验证

按 `docs/PROJECT_OPERATING_SYSTEM.md` 的验证表执行。

- 普通代码改动：`npm run typecheck` + `npm run lint`
- 数据改动：相关 audit script
- 路由或图片行为：本地 200 smoke test
- 发布候选：`npm run build` + browser / Playwright QA

不要默认部署生产。只有在任务明确包含发布时，才执行生产部署。

## 禁止行为

| 行为 | 原因 |
|------|------|
| 跳过 docs 直接写代码 | 破坏一致性 |
| 自行发明设计语言 | UI 漂移 |
| 创建重复组件 | 增加维护成本 |
| 内联三语字符串 | 违反 i18n 规范 |
| 使用 `as T` 绕过类型检查 | 掩盖运行时错误 |
| 新增不必要的 npm 依赖 | 增加 bundle size |
| 大规模重写 | 风险过高 |
| 提交 `.env.local` | 泄露密钥 |
| Force push main | 不可逆 |
| 修改核心架构文件 | 影响全项目 |

## 核心架构文件（修改需特别谨慎）

```
src/lib/types.ts          — 所有类型定义
src/lib/data.ts           — 数据访问层
src/lib/i18n.ts           — 国际化字典
src/lib/relations.ts      — 关系图谱
src/lib/image-domains.ts  — 图片域名白名单
src/lib/proxy-image.ts    — 图片代理辅助
src/lib/quality.ts        — 内容质量筛选
```

## 快速参考

```
总维护规则  → docs/PROJECT_OPERATING_SYSTEM.md
设计令牌    → docs/DESIGN_TOKENS.md
UI 规范     → docs/UI_RULES.md
数据模型    → docs/DATA_SCHEMA.md
内容规范    → docs/CONTENT_RULES.md
技术债      → docs/TECH_DEBT.md
性能        → docs/PERFORMANCE.md
当前状态    → docs/STATUS.md
项目定位    → docs/PROJECT.md
目录结构    → docs/FILE_STRUCTURE.md
```

## 已知陷阱（不要重复踩坑）

1. `CC BY-NC` ≠ `CC BY`（image-policy.ts 已修复）
2. 日语搜索需要 `name_ja`（search API 已修复）
3. 关系查询中 `style_slugs` 是 slug 不是 display name（relations.ts 已修复，新增逻辑仍需注意）
4. `year_start = 0` 会导致时间轴显示 "0年"
5. PNG 图片已转为 JPG；后续重点是压缩 1MB+ 本地缓存图
6. 本地缓存图需要 `next.config.ts` 的 `/images/curated/**` localPatterns
