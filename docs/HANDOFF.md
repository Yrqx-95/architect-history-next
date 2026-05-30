# HANDOFF.md — Agent 交接文档

> 最后更新：2026-05-26 | 下次更新触发条件：完成任何重要修改后

---

## 项目速览

**世界建筑史档案 (World Architecture Archive)** — 三语（zh / en / ja）建筑知识平台，以"建筑杂志感"为设计语言。

| 项 | 值 |
|---|-----|
| 框架 | Next.js 16.2.6 (App Router) |
| 数据库 | Supabase PostgreSQL（公开 ANON_KEY，无认证） |
| 部署 | Vercel Production，ISR（首页 3600s / 详情页 86400s） |
| 数据规模 | ~780+ 建筑、~400+ 建筑师、~7276 图片、~3177 静态页面 |
| 当前阶段 | Phase 4 内容精品化 (75%)，Phase 5 未启动 |

---

## 快速开始

```bash
npm install
npm run dev          # 本地开发 → http://localhost:3000
npm run build        # 构建（TypeScript 检查 + 静态页面生成）
npm run lint         # ESLint 检查

# 图片治理脚本
npm run images:audit     # 审计图片许可证
npm run images:registry  # 构建图片注册表
npm run images:cache     # 缓存精选图片到本地
```

---

## 必读文档（开发前按此顺序阅读）

| # | 文档 | 内容 |
|---|------|------|
| 1 | [`PROJECT.md`](PROJECT.md) | 项目定位、设计哲学、禁止事项 |
| 2 | [`DESIGN_TOKENS.md`](DESIGN_TOKENS.md) | 颜色/字体/间距/动画令牌 |
| 3 | [`UI_RULES.md`](UI_RULES.md) | 组件结构、卡片规范、UX 规则 |
| 4 | [`STATUS.md`](STATUS.md) | 16 阶段开发历史、当前进度、待修复 |
| 5 | [`TECH_DEBT.md`](TECH_DEBT.md) | 28 条技术债清单 |
| 6 | [`DATA_SCHEMA.md`](DATA_SCHEMA.md) | ER 图、表字段、overlay 结构、slug 规则 |
| 7 | [`CONTENT_RULES.md`](CONTENT_RULES.md) | 内容写作规范、最低长度、翻译优先级 |
| 8 | [`FILE_STRUCTURE.md`](FILE_STRUCTURE.md) | 目录结构、已知重复/死代码 |
| 9 | [`PERFORMANCE.md`](PERFORMANCE.md) | 性能现状、缓存策略、优化建议 |

---

## 核心架构文件（修改需特别谨慎）

| 文件 | 职责 | 影响范围 |
|------|------|---------|
| [`src/lib/types.ts`](../src/lib/types.ts) | 所有实体类型、关系类型、displayName/displayText 工具 | 全站 |
| [`src/lib/data.ts`](../src/lib/data.ts) | Supabase 数据访问层、300s 内存缓存、图片覆盖合并 | 全站 |
| [`src/lib/i18n.ts`](../src/lib/i18n.ts) | 三语字典 (80+ key)、`t(lang, key)` | 全站 UI |
| [`src/lib/relations.ts`](../src/lib/relations.ts) | 知识图谱查询、React cache() 请求级缓存 | 全站详情页 |
| [`src/lib/image-policy.ts`](../src/lib/image-policy.ts) | 图片许可证校验、CC BY-NC 拦截 | 全站图片 |
| [`src/lib/quality.ts`](../src/lib/quality.ts) | 内容质量过滤、乱码/Wikidata ID 检测 | 精选/搜索 |

---

## 目录速查

| 目录 | 用途 | 状态 |
|------|------|:--:|
| `src/lib/` | 核心库（12 个 .ts + 2 个 .json） | ⚠️ 慎改 |
| `src/app/[lang]/` | 路由页面（10 个路由） | ✅ |
| `src/app/api/` | API 路由（image-proxy, search） | ✅ |
| `src/components/` | UI 组件（32 个，平铺无分类） | ⚠️ 待分类 |
| `src/components/search/` | 搜索子组件（7 个） | ✅ 已拆分 |
| `scripts/` | 图片治理脚本（3 个） | ✅ |
| `db/` | 数据库迁移 + 图片注册表 | ⚠️ |
| `public/images/curated/` | 本地缓存图片 (~90 张) | ⚠️ |
| `docs/` | 项目文档（11 篇，含本文件） | ✅ |

---

## 开发铁律

### 必须做
- 开发前阅读 docs/ 全部文档（见上方清单）
- 组件使用 Server Component 优先，仅在交互时 `'use client'`
- UI 文本用 `t(lang, key)`，内容文本用 `displayText` / `displayName`
- 图片用 `SafeImage` 组件，外部图片必须带 `ImageAttribution`
- 完成后 `npm run build` → 本地验证 → 部署 → **更新本文件 + STATUS.md**

### 禁止做
- ❌ 跳过 docs 直接写代码
- ❌ 在组件中硬编码文本字符串
- ❌ 创建重复组件（先检查 `src/components/` 是否有可复用）
- ❌ 使用玻璃拟态、霓虹色、太空科技风
- ❌ 内联 `lang === 'en' ? '...' : '...'`
- ❌ 使用 CC BY-NC / CC BY-ND 许可图片
- ❌ Force push main
- ❌ 修改 Supabase 数据库 schema（迁移未执行）
- ❌ 大规模重写

---

## 变更日志

> 每次重要修改后，在顶部新增一条记录。包含：日期、修改内容、原因、影响文件、验证结果、遗留问题。

### [2026-05-28] Batch 12 建筑师内容精品化（第十二批）

- **内容**：新增 5 位精品建筑师 overlay — Richard Neutra、Marcel Breuer、Lina Bo Bardi、BIG、Norman Foster
- **原因**：按计划补齐第十二批建筑师深度内容，达到 55 位精品建筑师（12 批）
- **影响文件**：
  - [`src/lib/architect-content.ts`](../src/lib/architect-content.ts) — 新增 5 个 overlay，清理 4 个旧版简化 overlay 重复属性
  - [`docs/STATUS.md`](STATUS.md) — 新增第二十五阶段记录
  - [`docs/HANDOFF.md`](HANDOFF.md) — 本变更记录
- **新增 Overlay**：
  | Slug | 建筑师 | 代表作 |
  |------|--------|--------|
  | `richard-neutra` | Richard Neutra | lovell-health-house, kaufmann-desert-house, neutra-vdl-studio-and-residences |
  | `marcel-breuer` | Marcel Breuer | saint-johns-abbey, whitney-museum, 945-madison-avenue |
  | `lina-bo-bardi` | Lina Bo Bardi | sao-paulo-museum-of-art, sesc-pompeia, glass-house |
  | `big` | Bjarke Ingels Group | copenhill, 8-house, via-57-west |
  | `norman-foster` | Norman Foster | hongkong-bank, reichstag-dome, the-gherkin |
- **清理**：删除了 `richard-neutra`、`marcel-breuer`、`lina-bo-bardi`、`norman-foster` 的旧版简化 overlay（lines 198-271, 272-345, 1090-1164）——这些条目之前与精品 overlay 产生 TS 重复属性错误
- **数据验证**：通过 Supabase CLI 验证所有建筑 slug
- **验证**：`npm run build` 通过（55 位建筑师）
- **遗留**：
  - 日文内容需 native speaker 审核
  - 55 位建筑师已完成；`big` 仅 5 栋建筑（边缘情况）

### [2026-05-28] Batch 11 建筑师内容精品化（第十一批）

- **内容**：新增 5 位精品建筑师 overlay — Rem Koolhaas、Andrea Palladio、Paulo Mendes da Rocha、Félix Candela、SANAA
- **原因**：按计划补齐第十一批建筑师深度内容，达到 54 位精品建筑师（11 批）
- **影响文件**：
  - [`src/lib/architect-content.ts`](../src/lib/architect-content.ts) — 新增 5 个 overlay（~6000+ 行）
  - [`docs/STATUS.md`](STATUS.md) — 新增第二十四阶段记录
  - [`docs/HANDOFF.md`](HANDOFF.md) — 本变更记录
- **新增 Overlay**：
  | Slug | 建筑师 | 代表作 |
  |------|--------|--------|
  | `koolhaas` | Rem Koolhaas | cctv-headquarters, seattle-central-library, casa-da-musica |
  | `palladio` | Andrea Palladio | villa-rotonda, teatro-olimpico, san-giorgio-maggiore |
  | `paulo-mendes-da-rocha` | Paulo Mendes da Rocha | museu-brasileiro-da-escultura, national-coach-museum, cais-das-artes |
  | `felix-candela` | Félix Candela | church-of-nuestra-senora-de, palacio-de-los-deportes, loceanografic |
  | `sanaa` | SANAA | kanazawa-museum, rolex-learning-center, new-museum-nyc |
- **数据验证**：通过 Supabase CLI 验证所有建筑 slug（Koolhaas 21栋, Palladio 11, Mendes da Rocha 14, Candela 6, SANAA 7）
- **验证**：`npm run build` 通过（54 位建筑师）
- **遗留**：
  - 日文内容需 native speaker 审核
  - 54 位建筑师已完成，超额完成 ~50 位目标

### [2026-05-28] Batch 10 建筑师内容精品化（第十批）

- **内容**：新增 5 位精品建筑师 overlay — Harry Seidler、Junzo Sakakura、Yoshinobu Ashihara、Buckminster Fuller、Eladio Dieste
- **原因**：按计划补齐第十批建筑师深度内容，达到 49 位精品建筑师（10 批）
- **影响文件**：
  - [`src/lib/architect-content.ts`](../src/lib/architect-content.ts) — 新增 5 个 overlay（4676 行）
  - [`docs/STATUS.md`](STATUS.md) — 新增第二十三阶段记录
  - [`docs/HANDOFF.md`](HANDOFF.md) — 本变更记录
- **新增 Overlay**：
  | Slug | 建筑师 | 代表作 |
  |------|--------|--------|
  | `harry-seidler` | Harry Seidler | australia-square, rose-seidler-house, mlc-centre |
  | `junzo-sakakura` | Junzo Sakakura | international-house-of-japan, museum-of-modern-art-kamakura, shinjuku-station-west-exit-square |
  | `yoshinobu-ashihara` | Yoshinobu Ashihara | sony-building-tokyo, komazawa-olympic-park-gymnasium, tokyo-metropolitan-art-museum |
  | `buckminster-fuller` | Buckminster Fuller | montreal-biosphere, dymaxion-house, flys-eye-dome |
  | `eladio-dieste` | Eladio Dieste | church-of-cristo-obrero-y, church-of-san-juan-de, parador-de-la-cerveza |
- **数据验证**：通过 Supabase CLI 验证所有建筑 slug（Seidler 13栋, Sakakura 10, Ashihara 9, Fuller 7, Dieste 6）
- **验证**：`npm run build` 通过（49 位建筑师）
- **遗留**：
  - 日文内容需 native speaker 审核
  - 49 位建筑师已完成，距离 ~50 位目标已达标

### [2026-05-28] Batch 9 建筑师内容精品化（第九批）

- **内容**：新增 5 位精品建筑师 overlay — Paul Rudolph、John Lautner、Kunio Maekawa、Eduardo Souto de Moura、Peter Eisenman
- **原因**：按计划补齐第九批建筑师深度内容，达到 44 位精品建筑师（9 批）
- **影响文件**：
  - [`src/lib/architect-content.ts`](../src/lib/architect-content.ts) — 新增 5 个 overlay
  - [`docs/STATUS.md`](STATUS.md) — 新增第二十二阶段记录
  - [`docs/HANDOFF.md`](HANDOFF.md) — 本变更记录
- **新增 Overlay**：
  | Slug | 建筑师 | 代表作 |
  |------|--------|--------|
  | `paul-rudolph` | Paul Rudolph | yale-art-and-architecture-building, milam-residence, creative-arts-center-colgate-university |
  | `john-lautner` | John Lautner | sheats-goldstein-residence, elrod-house, arango-house |
  | `kunio-maekawa` | Kunio Maekawa | tokyo-bunka-kaikan, national-museum-of-western-art, fukuoka-art-museum |
  | `eduardo-souto-de-moura` | Eduardo Souto de Moura | estadio-municipal-de-braga, casa-das-historias-paula-rego, serpentine-gallery-pavilion-2005 |
  | `peter-eisenman` | Peter Eisenman | memorial-to-the-murdered-jews, wexner-center-for-the-arts, house-vi |
- **数据验证**：通过 Supabase CLI 验证所有建筑 slug（Rudolph 28栋, Lautner 31, Maekawa 30, Souto de Moura 13, Eisenman 13）
- **验证**：`npm run build` 通过（44 位建筑师）
- **遗留**：
  - 日文内容需 native speaker 审核
  - 44 位建筑师已完成，距离 ~50 位目标还需约 6 位

### [2026-05-27] Batch 8 建筑师内容精品化（第八批）

- **内容**：新增 4 位精品建筑师 overlay — Fumihiko Maki、Christian de Portzamparc、Steven Holl、Bernard Tschumi
- **原因**：按计划补齐第八批建筑师深度内容，达到 39 位精品建筑师（8 批）
- **影响文件**：
  - [`src/lib/architect-content.ts`](../src/lib/architect-content.ts) — 新增 4 个 overlay，移除 carlo-scarpa 重复
  - [`docs/STATUS.md`](STATUS.md) — 新增第二十一阶段记录
  - [`docs/HANDOFF.md`](HANDOFF.md) — 本变更记录
- **新增 Overlay**：
  | Slug | 建筑师 | 代表作 |
  |------|--------|--------|
  | `fumihiko-maki` | Fumihiko Maki | 4-world-trade-center, aga-khan-museum, reinhard-ernst-museum |
  | `christian-de-portzamparc` | Christian de Portzamparc | philharmonie-de-paris, one57, cidade-das-artes-bibi-ferreira |
  | `steven-holl` | Steven Holl | kiasma, linked-hybrid, horizontal-skyscraper-vanke-center |
  | `bernard-tschumi` | Bernard Tschumi | acropolis-museum, parc-de-la-villette, blue-condominium |
- **已知问题修复**：
  - 修复 4 个 overlay 的 `alt` 字段格式（纯字符串 → `Record<ContentLang, string>`）
  - 移除 `carlo-scarpa` 重复项（已在第四批完成，保留早期简短版本）
- **验证**：`npm run build` 通过（39 位建筑师）
- **遗留**：
  - 日文内容需 native speaker 审核
  - 39 位建筑师已完成，距离 ~50 位目标还需约 11 位

### [2026-05-27] Batch 7 建筑师内容精品化（第七批）

- **内容**：新增 5 位精品建筑师 overlay — Mario Botta、Richard Rogers、Erich Mendelsohn、David Chipperfield、Gordon Bunshaft
- **原因**：按计划补齐第七批建筑师深度内容，达到 35 位精品建筑师（7 批 × 5 位）
- **影响文件**：
  - [`src/lib/architect-content.ts`](../src/lib/architect-content.ts) — 新增 5 个 overlay，文件从 ~2596 行增至 ~3136 行
  - [`docs/STATUS.md`](STATUS.md) — 新增第二十阶段记录，更新数据统计
  - [`docs/HANDOFF.md`](HANDOFF.md) — 本变更记录
- **新增 Overlay**：
  | Slug | 建筑师 | 代表作 |
  |------|--------|--------|
  | `mario-botta` | Mario Botta | san-francisco-museum-of-modern, evry-cathedral, museum-tinguely |
  | `richard-rogers` | Richard Rogers | lloyds-building, millennium-dome, 3-world-trade-center |
  | `erich-mendelsohn` | Erich Mendelsohn | einstein-tower, de-la-warr-pavilion, hadassah-university-hospital-mt-scopus |
  | `david-chipperfield` | David Chipperfield | james-simon-gallery, museum-of-modern-literature, coleccion-jumex |
  | `gordon-bunshaft` | Gordon Bunshaft | lever-house, beinecke-rare-book-manuscript-library, hirshhorn-museum-and-sculpture-garden |
- **数据验证**：通过 Supabase CLI 验证所有 15 个建筑 slug（Botta 44 栋, Rogers 29, Mendelsohn 24, Chipperfield 22, Bunshaft 15）
- **已知问题修复**：
  - 修复 212 个 TS 错误：Batch 7 overlays 最初被错误放置在 `overlays` 对象外部（模块级），通过 diff 修正
  - 修复 Chinese single quotes（U+2018/U+2019）在 JS 字符串字面量中被解析为 ASCII 单引号的问题，使用 `\u2018`/`\u2019` 转义
- **验证**：`npm run build` 通过
- **遗留**：
  - 日文内容需 native speaker 审核
  - 35 位建筑师已完成，距离 ~50 位目标还需约 15 位

### [2026-05-26] Batch 6 建筑师内容精品化（第六批）

- **内容**：新增 5 位精品建筑师 overlay — Jørn Utzon、Luis Barragán、Arne Jacobsen、Giuseppe Terragni、Rafael Moneo
- **原因**：按计划补齐第六批建筑师深度内容，达到 30 位精品建筑师（6 批 × 5 位）
- **影响文件**：
  - [`src/lib/architect-content.ts`](../src/lib/architect-content.ts) — 新增 5 个 overlay，文件从 ~2061 行增至 ~3500+ 行
  - [`docs/STATUS.md`](STATUS.md) — 新增第十九阶段记录，更新数据统计
  - [`docs/HANDOFF.md`](HANDOFF.md) — 本变更记录
- **新增 Overlay**：
  | Slug | 建筑师 | 代表作 |
  |------|--------|--------|
  | `j-rn-utzon` | Jørn Utzon | sydney-opera-house, bagsv-rd-church, can-lis |
  | `luis-barragan` | Luis Barragán | casa-gilardi, cuadra-san-cristobal, luis-barragan-house-and-studio |
  | `arne-jacobsen` | Arne Jacobsen | aarhus-city-hall, danish-national-bank, s-holm-row-houses |
  | `giuseppe-terragni` | Giuseppe Terragni | asilo-santelia, casa-comolli-rustici, palazzo-terragni |
  | `rafael-moneo` | Rafael Moneo | national-museum-of-roman-art, kursaal-convention-centre, cathedral-of-our-lady-of |
- **数据验证**：
  - 通过 Supabase CLI 验证所有 15 个建筑 slug
  - 修正 1 处 slug：`cathedral-of-our-lady-of-the-angels` → `cathedral-of-our-lady-of`
- **验证**：`npm run build` 通过，Vercel 生产部署
- **遗留**：
  - 日文内容需 native speaker 审核
  - 30 位建筑师已完成，距离 ~50 位目标还需约 20 位

### [2026-05-26] 建筑师详情页 UI 重构

- **内容**：完全重构建筑师详情页 Hero 区域、文章区域和整体布局，从 wiki 风格转向 curated editorial 设计
- **原因**：页面留白过多、信息密度不足、缺乏建筑感和高级视觉层级
- **影响文件**：
  - [`src/app/[lang]/architect/[slug]/page.tsx`](../src/app/[lang]/architect/[slug]/page.tsx) — Hero + 元数据 + 整体 grid 重构
  - [`src/components/ArchitectDeepArticle.tsx`](../src/components/ArchitectDeepArticle.tsx) — 文章区域、核心思想、代表作、来源重构
- **设计变更**：
  - Hero: 超大 serif 标题（clamp 2.5–4.5rem）、肖像 3:4 全宽、bio 左侧 accent 线、元数据 inline ribbon、标签 outline 样式
  - 核心思想: 2x2 grid + 序号 `01`–`04`
  - 文章: 8/12 列居中 grid、section 间 border-t 分割 + mt-16 间距、serif 标题
  - 代表作: 卡片 + 导读 + 链接三段式、gap-10 间距
  - 移除 MetadataPanel 依赖（内联替代），组件本身保留
- **验证**：`npm run build` 通过（3177 页面），TypeScript 0 错误，暗色模式兼容
- **遗留**：
  - 无 overlay 的普通建筑师页面 Hero 区域仍需验证
  - MetadataPanel 组件在其他页面（建筑详情等）仍在使用

### [2026-05-26] 项目接手 + 文档建设

- **内容**：完整阅读全部项目文档和核心代码，产出项目接手报告，建立本交接文档
- **原因**：新 Agent 接手项目，需全面理解上下文
- **影响文件**：无代码变更
- **新增文件**：
  - [`docs/HANDOFF.md`](HANDOFF.md) — 本文件
  - [`plans/handover-report.md`](../plans/handover-report.md) — 完整接手报告
  - [`plans/batch5-architect-content.md`](../plans/batch5-architect-content.md) — Batch 5 候选方案
  - [`plans/batch5-data-verification.md`](../plans/batch5-data-verification.md) — Batch 5 数据验证
  - [`plans/project-analysis.md`](../plans/project-analysis.md) — 项目架构分析
- **验证**：N/A（无代码变更）
- **遗留**：
  - git 状态未确认（Architect 模式无法执行 git）
  - Batch 5 建筑师待用户确认后进入 Code 模式实施

### [2026-05-26] Batch 5 建筑师内容精品化（第五批）

- **内容**：新增 5 位精品建筑师 overlay — Antoni Gaudí、Walter Gropius、Louis Sullivan、Eero Saarinen、Peter Zumthor
- **原因**：按计划补齐第五批建筑师深度内容，达到 25 位精品建筑师（5 批 × 5 位）
- **影响文件**：
  - [`src/lib/architect-content.ts`](../src/lib/architect-content.ts) — 新增 5 个 overlay，文件从 ~1548 行增至 ~2100+ 行
  - [`docs/STATUS.md`](STATUS.md) — 新增第十七阶段记录，更新数据统计和下一步优先级
  - [`docs/HANDOFF.md`](HANDOFF.md) — 本变更记录
- **新增 Overlay**：
  | Slug | 建筑师 | 代表作 |
  |------|--------|--------|
  | `gaudi` | Antoni Gaudí | sagrada-familia, casa-batllo, casa-mila |
  | `gropius` | Walter Gropius | bauhaus-dessau, gropius-house, fagus-factory |
  | `sullivan` | Louis Sullivan | wainwright-building, auditorium-building, carson-pirie-scott |
  | `eero-saarinen` | Eero Saarinen | twa-terminal, gateway-arch, dulles-airport |
  | `zumthor` | Peter Zumthor | therme-vals, kolumba-museum, kunsthaus-bregenz |
- **数据验证**：
  - 所有 5 位建筑师 slug 和 15 个建筑 slug 均通过 Supabase CLI 验证
  - 发现并修正 2 处计划阶段 slug 错误：`carson-pirie-scott`（非 `carson-pirie-scott-building`）、`twa-terminal`（非 `twa-flight-center`）
- **验证**：`npm run build` 通过（3177 页面），TypeScript 无错误，Vercel 生产部署
- **遗留**：
  - 第五批 5 位建筑师的日文内容需 native speaker 审核
  - 25 位建筑师已完成，距 CONTENT_RULES.md 规划的 ~50 位目标还有一半
  - 第六批候选待确定

---

## 当前状态

| 维度 | 状态 |
|------|------|
| Phase 4 内容精品化 | ✅ 100%（55/50+ 位建筑师长文完成） |
| 严重阻断项 | 无 |
| 中等影响 | type_slug 部分为显示名需迁移、overrides 重叠条目待清理 |
| 立即可做 | Phase 5 功能增强（搜索优化、首页拆分等）或继续 Phase 4 扩展至更多建筑师 |
| 短期目标 | 图片域名去重、首页拆分、组件分类 |
| 中期目标 | v3 迁移、搜索缓存 |
| 长期目标 | 自动化测试、TypeScript 严格模式、地图功能 |

---

## 已知陷阱

1. **CC BY-NC ≠ CC BY** — [`image-policy.ts`](../src/lib/image-policy.ts) 已修复，不要删除拦截逻辑
2. **style_slugs 是 slug 不是显示名** — 但旧数据可能混入了显示名，用 [`taxonomy.ts`](../src/lib/taxonomy.ts) 兼容匹配
3. **`year_start = 0`** 会导致时间轴显示 "0年"
4. **两个图片域名列表重复** — [`image-loader.ts`](../src/lib/image-loader.ts) 和 [`proxy-image.ts`](../src/lib/proxy-image.ts) 需统一
5. **`getBuildingsWithCovers()` 被重复调用** — 首页和精选共用时注意缓存
6. **Next.js 16 有破坏性变更** — 不要用旧版 Next.js API 知识直接写代码，查阅 `node_modules/next/dist/docs/`
7. **日语 `displayText` 不回退中文** — 回退链：ja → en，不允许 ja → zh
8. **暗色模式图片** — 不得整体压暗建筑照片，只允许文字覆盖区局部渐变

---

> **下次 Agent 接手时**：先读本文件 → 读 [`STATUS.md`](STATUS.md) 了解最新变更 → 读变更日志中"遗留"项 → 开始工作
