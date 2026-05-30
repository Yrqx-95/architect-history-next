# 第五批候选建筑师 — 数据完整性验证结果

> 验证日期：2026-05-26 | 数据来源：`db/image-registry.generated.json` + `src/lib/local-image-overrides.json` + `src/lib/image-overrides.json`

---

## 验证汇总

| # | 建筑师 | registry 作品数 | 本地缓存 | 手动策展 | 综合评估 |
|---|--------|:---:|:---:|:---:|:---:|
| 1 | **antoni-gaudi** (高迪) | 5 | 3 | 0 | ✅ 优秀 |
| 2 | **walter-gropius** (格罗皮乌斯) | 3 | 2 | 0 | ✅ 良好 |
| 3 | **louis-sullivan** (沙利文) | 3 | 1 | 0 | ⚠️ 可接受 |
| 4 | **eero-saarinen** (沙里宁) | 4 | 2 | 0 | ✅ 良好 |
| 5 | **peter-zumthor** (卒姆托) | 4 | 0 | 0 | ⚠️ 无本地缓存 |

---

## 各建筑师详细数据

### 1. Antoni Gaudi (gaudi)

| 作品 slug | 类�型 | 本地缓存 | 许可 |
|-----------|------|:---:|------|
| sagrada-familia | primary | ✅ | CC BY-SA 3.0 |
| casa-batllo | primary | ✅ | CC BY-SA 3.0 |
| casa-mila | primary | ✅ | CC BY-SA 4.0 |
| park-guell | primary | ❌ | (Supabase 回退) |
| palau-guell | primary | ❌ | (Supabase 回退) |

**推荐代表作**: sagrada-familia, casa-batllo, casa-mila

### 2. Walter Gropius (gropius)

| 作品 slug | 类型 | 本地缓存 | 许可 |
|-----------|------|:---:|------|
| bauhaus-dessau | primary + elevation | ✅ | CC BY-SA 4.0 |
| gropius-house | primary | ✅ | CC BY-SA 3.0 |
| fagus-factory | primary | ❌ | (Supabase 回退) |

**推荐代表作**: bauhaus-dessau, gropius-house, fagus-factory

### 3. Louis Sullivan (sullivan)

| 作品 slug | 类型 | 本地缓存 | 许可 |
|-----------|------|:---:|------|
| auditorium-building | primary | ✅ | CC BY-SA 3.0 |
| carson-pirie-scott-building | primary | ❌ | (Supabase 回退) |
| wainwright-building | primary + floor_plan | ❌ | (Supabase 回退) |

**推荐代表作**: wainwright-building, auditorium-building, carson-pirie-scott-building

### 4. Eero Saarinen (eero-saarinen)

| 作品 slug | 类型 | 本地缓存 | 许可 |
|-----------|------|:---:|------|
| dulles-airport | primary + floor_plan | ✅ | CC BY-SA 3.0 |
| gateway-arch | primary | ✅ | CC BY-SA 4.0 |
| twa-flight-center | primary + floor_plan | ❌ | (Supabase 回退) |
| mit-chapel | primary | ❌ | (Supabase 回退) |

**推荐代表作**: twa-flight-center, gateway-arch, dulles-airport

### 5. Peter Zumthor (zumthor)

| 作品 slug | 类型 | 本地缓存 | 许可 |
|-----------|------|:---:|------|
| therme-vals | primary | ❌ | (Supabase 回退) |
| kolumba-museum | primary | ❌ | (Supabase 回退) |
| kunsthaus-bregenz | primary | ❌ | (Supabase 回退) |
| bruder-klaus-field-chapel | primary | ❌ | (Supabase 回退) |

**推荐代表作**: therme-vals, kolumba-museum, kunsthaus-bregenz

⚠️ **关键问题**：Zumthor 的 4 个作品虽然都在 image registry 中（Supabase 有图片），但没有任何本地缓存或手动策展条目。图片将回退到 Supabase 原始 URL（可能为 Wikimedia 远程 URL），这在访问性和可控性上不如本地缓存。但不影响功能——图片会通过 proxy 或 direct URL 加载。

---

## 仍需 Code 模式确认

1. **architect slug 确认**：registry 中 architect_slug 为 `gaudi`、`gropius`、`sullivan`、`eero-saarinen`、`zumthor`，需在 Supabase `architects` 表中确认一致
2. **architect 记录完整性**：确认 name_zh、name_ja、birth_year、death_year、nationalities 等字段是否有值
3. **building 记录完整性**：确认各建筑 slug 在 `buildings` 表中存在且 architect_slug 正确归�属

---

## 结论

5 位候选建筑师均有 ≥3 个作品在 image registry 中。Gaudi/Gropius/Saarinen 数据最完整，Sullivan 和 Zumthor 可以接受。**建议全部保留**，在 Code 模式中通过 Supabase 快速验证 slug 后即可开始写长文。
