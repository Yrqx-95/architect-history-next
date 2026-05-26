# CONTENT_RULES.md — 内容系统规范

> 所有内容（文案、图片、metadata、标签）必须遵循此规范  
> 三语支持：zh（中文，支持简体/繁体显示）/ en（英文）/ ja（日文）

## 中文简繁规范

- `/zh` 页面提供 `简 / 繁` 页内切换，不新增独立 `/zh-tw` 内容源。
- 第一版繁体通过台湾繁体转换自动覆盖全站中文；用户选择后由 `localStorage.chineseScript` 记住。
- 精品长文后续可增加人工繁体覆盖字段；人工版本优先，缺失时从简体自动转换。
- 台湾繁体精品内容不能只做机械替换，需逐篇检查专名、语气和当地常用词，例如“搜尋”“資料”“使用者”等。
- 简繁转换不得影响英文、日文、代码、URL、来源标题和 license 文本。

## Biography 规范

### 最低长度

```
建筑师 biography: ≥ 100 字符（当前 quality.ts 仅检查 > 20 字符，过于宽松）
建筑 significance: ≥ 50 字符
风格 description: ≥ 30 字符
```

### 结构模板

**建筑师 bio（zh 示例）：**
```
{姓名}，{出生年份}-{逝世年份}，{国籍}建筑师。
{一句话定位/最重要的贡献}。
{2-3 句介绍核心设计思想、代表作、历史地位}。
```

**建筑 significance（zh 示例）：**
```
{建筑名}建于{年份}，位于{城市, 国家}，由{建筑师}设计。
{一句话说明为何重要——风格意义/技术创新/文化地位}。
```

### 禁止

- ❌ 单句或空洞 bio（如仅 "American architect"）
- ❌ 复制 Wikipedia 首段而不标注来源
- ❌ bio 中包含 HTML 标签
- ❌ 用 Wikidata ID 代替真实姓名

## 建筑师长文 Overlay 规范

第一阶段长文不直接写入 Supabase，而是使用仓库 overlay：`src/lib/architect-content.ts`。运行时按 `architect.slug` 合并到建筑师详情页；无 overlay 的建筑师保持原页面。

### 第一批对象

```
alvar-aalto
kenzo-tange
richard-neutra
marcel-breuer
alvaro-siza-vieira
```

`aalto` 是 `alvar-aalto` 的旧/短 slug alias，详情页必须同样显示 Aalto 精品内容。

### 第二批对象

```
le-corbusier
mies-van-der-rohe
frank-lloyd-wright
louis-kahn
tadao-ando
```

第二批沿用第一批结构，但要优先补足站内已有代表作，保证 3 个 `representative_works` 都能进入站内建筑详情页，并至少有 Supabase 主图或审核后的 override 图片。

### 第三批对象

```
zaha-hadid
im-pei
renzo-piano
frank-gehry
lina-bo-bardi
```

第三批优先选择站内已有 3 个以上代表作且 image registry 有可信作品图的建筑师。肖像必须记录 Wikimedia Commons、官方机构或博物馆/基金会等可追溯来源；若某位建筑师缺少明确授权肖像，不为赶进度使用无来源图片。

### 必填结构

每个 overlay 必须包含：
- `summary.zh` / `summary.ja`：页头摘要和 SEO 描述
- `sections[]`：至少 3 个长文 section；每个 section 中文和日文至少 2 段
- `core_ideas.zh` / `core_ideas.ja`：4 条左右核心思想
- `representative_works[]`：固定 3 个站内作品 slug，并提供中文/日文导读
- `portrait`：人物肖像 URL、作者、license、source_url、三语 alt
- `sources[]`：文末来源，至少 3 条可追溯资料

### 写作口径

- ✅ 来源驱动 + 原创改写：可参考官方基金会、Pritzker、博物馆/大学资料、Wikidata/Wikimedia
- ✅ 中文和日文优先，英文只作为最低回退
- ✅ 长文应解释建筑思想、场地/社会背景、代表作之间的关系
- ❌ 不直接复制 Wikipedia 段落
- ❌ 不编造奖项、年份、地点、影响关系
- ❌ 不把 1500 字长文塞入 `bio_*` 单字段

## 图片规范

### 命名

```
本地缓存文件：{building-slug}-{width}.jpg
  例：empire-state-building-1024.jpg
```

### 图片来源优先级

```
1. /images/curated/   (本地缓存，优先)
2. Wikimedia Commons  (审核后的远程 URL)
3. Museum Open Access / IIIF
4. 远程 Wikimedia 原图
5. Unsplash           (仅氛围图，不作为建筑实体主图)
```

### 必填元数据

每张展示图片必须包含：
- `photographer` — 摄影师姓名
- `license` — 许可类型（CC BY-SA 4.0 / CC0 / Public domain 等）
- `source_url` — 原始来源链接

使用 `ImageAttribution` 组件统一展示。

### 图片类型（img_type）

```
exterior    — 外观
interior    — 室内
floor_plan  — 平面图
elevation   — 立面图
section     — 剖面图
detail      — 细部
aerial      — 鸟瞰
other       — 其他
```

### 建筑师肖像

人物肖像只允许使用可追溯来源：
- Wikimedia Commons 且 license 为 Public domain、CC BY、CC BY-SA 等可用授权
- 官方基金会、事务所、大学、博物馆、档案馆开放图片
- 必须记录 author / license / source_url

禁用：
- ❌ 社交媒体、Pinterest、无来源转载图
- ❌ CC BY-NC / CC BY-ND
- ❌ 只有图片 URL、没有来源页和作者/机构信息

### 禁用

- ❌ Unsplash 作为建筑实体主图
- ❌ CC BY-NC / CC BY-ND 许可图片
- ❌ 无署名来源的图片
- ❌ 低分辨率 (< 800px) 作为建筑主图
- ❌ 非建筑相关图片（人物肖像除外，仅限建筑师页）

## Metadata 规范

### 年份格式

```
单一年份：    1929
年份范围：    1929 - 1931
进行中：      2005 - Present
未知：        （留空，不显示 "0" 或 "?"）
公元前：      447 BCE - 432 BCE
```

### 国家格式

```
显示：中文名（如 "法国"） / 英文名（如 "France"）
代码：ISO 3166-1 alpha-2（如 "fr"）
```

### 面积格式

```
面积（metric）：4,200 m²
不要：4200、4200平方米、4.2k m²
```

### 材料格式

```
逗号分隔列表：Steel, Glass, Concrete
不要：steel / glass / concrete
不要：all caps
```

## Tag 规范

### Style 标签

```
有效示例：Modernism, Baroque, Brutalism
无效：modernism（首字母未大写）、modern architecture（非标准名称）
```

### 关联原则

- 一个建筑可关联 1-3 个 style
- 一个建筑师可关联 1-5 个 style
- 一个 style 可有关联的 era
- style 之间可有 parent_slug 关系

### Era 标签

```
格式：{年代范围} {名称}
示例：1920s - 1930s Art Deco
示例：1400s - 1600s Renaissance
```

## 三语内容标准

### 翻译优先级

```
必填：name_en（所有实体）
高优：name_zh, name_ja, description_en, significance_en
中优：bio_en, description_zh, significance_zh
低优：bio_ja, description_ja, spatial_feat_*, light_feat_*, circulation_*
```

### 当前三语覆盖估算

| 内容 | zh | en | ja |
|------|----|----|-----|
| 建筑名称 | ~90% | ~95% | ~40% |
| 建筑师名称 | ~85% | ~95% | ~35% |
| 建筑描述 | ~30% | ~40% | ~10% |
| 深度分析 | ~15% | ~20% | ~5% |

目标：en 和 zh 覆盖率达到 90%，ja 覆盖率达到 60%。

## 禁止内容

- ❌ AI 生成的无意义填充文本
- ❌ Lorem ipsum
- ❌ 虚假年份/地点/建筑师数据
- ❌ 未标注来源的 Wikipedia 搬运内容
- ❌ 硬编码在组件中的文本（使用 i18n 系统）
- ❌ 图片无署名
- ❌ Wikidata Q-ID 作为显示名
