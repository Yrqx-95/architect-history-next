# 第五批建筑师精品内容补充计划

> 基于 CONTENT_RULES.md、DATA_SCHEMA.md 规范及前四批 20 位精品长文范式

---

## 一、现有精品建筑师（20位，不重复）

| 批次 | 建筑师 slug | 中文名 |
|------|------------|--------|
| 1 | alvar-aalto | 阿尔瓦尔·阿尔托 |
| 1 | kenzo-tange | 丹下健三 |
| 1 | richard-neutra | 理查德·诺伊特拉 |
| 1 | marcel-breuer | 马塞尔·布劳耶 |
| 1 | alvaro-siza-vieira | 阿尔瓦罗·西扎 |
| 2 | le-corbusier | 勒·柯布西耶 |
| 2 | mies-van-der-rohe | 密斯·凡·德·罗 |
| 2 | frank-lloyd-wright | 弗兰克·劳埃德·赖特 |
| 2 | louis-kahn | 路易斯·康 |
| 2 | tadao-ando | 安藤忠雄 |
| 3 | zaha-hadid | 扎哈·哈迪德 |
| 3 | im-pei | 贝聿铭 |
| 3 | renzo-piano | 伦佐·皮亚诺 |
| 3 | frank-gehry | 弗兰克·盖里 |
| 3 | lina-bo-bardi | 丽娜·博·巴尔迪 |
| 4 | norman-foster | 诺曼·福斯特 |
| 4 | shigeru-ban | 坂茂 |
| 4 | carlo-scarpa | 卡洛·斯卡帕 |
| 4 | kengo-kuma | 隈研吾 |
| 4 | niemeyer | 奥斯卡·尼迈耶 |

---

## 二、第五批候选建筑师筛选

### 筛选标准（严格遵循 docs/ 规范）

1. **站内代表作充足**：在 Supabase `buildings` 表中有 ≥3 个归属作品
2. **作品图可信**：代表作在 image registry（local-image-overrides.json 或 image-overrides.json）中有可信图片
3. **肖像可追溯**：Wikimedia Commons 或官方机构有可用肖像（Public domain / CC BY / CC BY-SA）
4. **非已覆盖**：不在现有 20 位列表中

### 第五批推荐候选（5位）

按建筑史重要性与数据可用性排序：

| 优先级 | 建筑师 slug | 中文名 | 站内作品数估算 | 代表性作品 |
|--------|------------|--------|---------------|-----------|
| 1 | **antoni-gaudi** | 安东尼·高迪 | 5+ | sagrada-familia, casa-batllo, casa-mila, park-guell |
| 2 | **walter-gropius** | 瓦尔特·格罗皮乌斯 | 3+ | bauhaus-dessau, gropius-house, pan-am-building |
| 3 | **louis-sullivan** | 路易斯·沙利文 | 3+ | wainwright-building, guaranty-building, auditorium-building |
| 4 | **eero-saarinen** | 埃罗·沙里宁 | 3+ | twa-terminal, gateway-arch, dulles-airport |
| 5 | **peter-zumthor** | 彼得·卒姆托 | 3+ | therme-vals, kunsthaus-bregenz, kolumba-museum |

**备选（如上述候选作品数据不足）：**
- rem-koolhaas (雷姆·库哈斯) — CCTV headquarters, seattle-library, casa-da-musica
- philip-johnson (菲利普·约翰逊) — glass-house, seagram-building, at&t-building
- arata-isozaki (矶崎新) — museum-of-contemporary-art-la, palau-sant-jordi

---

## 三、实施步骤

### Step 1：验证候选建筑师数据（需 Supabase 查询）

对每个候选建筑师，执行以下查询确认：

```sql
-- 1. 确认建筑师存在及其 slug
SELECT slug, name_en, name_zh, name_ja, birth_year, death_year, nationalities, era_slug
FROM architects WHERE slug IN ('antoni-gaudi', 'walter-gropius', 'louis-sullivan', 'eero-saarinen', 'peter-zumthor');

-- 2. 确认站内作品数量
SELECT slug, name_en, year_start, city, country
FROM buildings WHERE architect_slug IN ('antoni-gaudi', 'walter-gropius', 'louis-sullivan', 'eero-saarinen', 'peter-zumthor');

-- 3. 确认作品图可用性（检查 image registry）
-- 在 local-image-overrides.json 和 image-overrides.json 中搜索对应 slug
```

### Step 2：确认肖像来源

每个建筑师必须在 Wikimedia Commons 找到可用肖像：

| 建筑师 | 预期 Wikimedia 肖像 | 预期 license |
|--------|-------------------|-------------|
| Gaudi | File:Antoni_Gaudi_1878.jpg | Public domain |
| Gropius | File:Walter_Gropius_1919.jpg | Public domain |
| Sullivan | File:Louis_Sullivan_circa_1895.jpg | Public domain |
| Saarinen | File:Eero_Saarinen_portrait.jpg | Public domain / CC BY |
| Zumthor | File:Peter_Zumthor_2018.jpg | CC BY-SA 4.0 |

### Step 3：编写精品长文 overlay

按照 [`src/lib/architect-content.ts`](src/lib/architect-content.ts) 现有格式，每个建筑师包含：

```typescript
'slug': {
  slug: 'slug',
  summary: { zh: '...', ja: '...', en: '...' },
  core_ideas: { zh: ['...', '...', '...', '...'], ja: ['...', ...], en: ['...', ...] },
  portrait: {
    url: 'https://upload.wikimedia.org/...',
    author: '...',
    license: '...',
    source_url: 'https://commons.wikimedia.org/...',
    alt: { zh: '...', ja: '...', en: '...' }
  },
  sections: [
    {
      title: { zh: '...', ja: '...', en: '...' },
      paragraphs: { zh: ['...', '...'], ja: ['...', '...'], en: ['...'] }
    },
    // 至少 3 个 section
  ],
  representative_works: [
    { slug: '...', note: { zh: '...', ja: '...', en: '...' } },
    // 恰好 3 个
  ],
  sources: [
    { title: '...', url: 'https://...' },
    // 至少 3 个
  ]
}
```

### Step 4：内容写作规范（严格遵循 CONTENT_RULES.md）

- ✅ 来源驱动 + 原创改写：参考 Pritzker 官网、MOMA、Britannica、博物馆基金会资料
- ✅ 中文和日文优先，英文作为最低回退
- ✅ 长文解释建筑思想、场地/社会背景、代表作之间的关系
- ✅ 每个 section 中文和日文至少 2 段（paragraphs.zh 和 paragraphs.ja 各 ≥2 条）
- ✅ 英文可 1 段（不作为主要阅读语言）
- ❌ 不直接复制 Wikipedia 段落
- ❌ 不编造奖项、年份、地点、影响关系
- ❌ 不使用 AI 生成的无意义填充文本

### Step 5：验证与部署

```bash
# 1. TypeScript 编译 + 静态页面生成验证
npm run build

# 2. Lint 检查
npm run lint

# 3. 本地验证关键路由
# /zh/architect/antoni-gaudi → 200，显示长文、肖像、代表作、来源
# /ja/architect/antoni-gaudi → 200，显示日文长文
# /zh/architect/adolf-loos → 200，不显示空精品区（未覆盖建筑师保持原样）

# 4. 部署
npx vercel --prod --yes

# 5. 生产环境验证
# 同上 3 个 URL 使用正式域名
```

### Step 6：更新文档

更新 [`docs/STATUS.md`](docs/STATUS.md)：
- 新增"第十七阶段：建筑师内容精品化第五批"
- 记录新增 5 位建筑师、数据确认情况、构建/部署验证结果
- 更新 CONTENT_RULES.md 记录第五批对象

---

## 四、注意事项

1. **架构师模式限制**：当前处于 Architect 模式，只能编写 .md 文件。实施阶段需切换到 Code 模式。
2. **Supabase 查询**：Step 1 的数据验证需要在 Code 模式下通过 Supabase 客户端或 SQL 编辑器执行。
3. **图片注册表检查**：需确认 local-image-overrides.json (198条) 和 image-overrides.json (39条) 中覆盖了候选建筑师的代表作 slug。
4. **slug 规则**：building slug 与 architect slug 均为 kebab-case 英文名。
5. **不修改核心架构**：仅追加 overlays 对象条目和更新 featuredArchitectContentSlugs，不修改类型定义和接口。

---

## 五、风险与回退

| 风险 | 缓解措施 |
|------|---------|
| 某建筑师站内作品 < 3 个 | 从备选列表替换 |
| 某作品 slug 在 DB 中不存在 | 调整 representative_works 中的 slug |
| 肖像无可用授权 | 从备选列表替换该建筑师 |
| build 失败 | 检查 TypeScript 类型和 import，回退修改 |
| 内容质量不达标 | 人工审核中/日文长文，必要时缩减批次 |
