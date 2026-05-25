# PERFORMANCE.md — 性能审计与优化

> 最后更新：2026-05-25

## 当前性能概况

| 指标 | 数值 | 评估 |
|------|------|------|
| 静态生成页面 | 3,177 | ✅ |
| Vercel 部署包 | 43.8MB | ⚠️ 偏大（主要为 curated images） |
| Client Components | 12 个 | ✅ 合理 |
| Dynamic imports | 0 | ⚠️ 无代码分割 |
| 最大单文件图片 | 1.2MB (JPG) | ⚠️ 偏大 |
| 首页 TSX 行数 | 358 | ❌ 过大 |

## 图片性能

### 问题

| 问题 | 详情 | 影响 |
|------|------|------|
| 首页无 lazy loading | 所有图片在首屏加载 | LCP 偏高 |
| curated 目录过大 | 218 文件 76MB，全部部署到 Vercel | 每次部署上传 43.8MB |
| 无响应式图片 | 部分组件使用原生 `<img>` 无 srcset | 移动端加载过大图片 |

### 建议

1. **响应式图片**：为原生 `<img>` 添加 srcset（或迁移到 SafeImage）
2. **Lazy loading**：建筑卡片图片使用 `loading="lazy"`
3. **压缩超大 JPG**：优先处理 1MB 以上本地缓存图片
4. **图片 CDN**：中期迁移到 Cloudflare R2 或 Supabase Storage + CDN

## Bundle 与路由

### 问题

| 问题 | 位置 | 影响 |
|------|------|------|
| 首页 358 行 | `src/app/[lang]/page.tsx` | 单体页面过大，难以维护 |
| 零 dynamic import | 全项目 | 首页加载全部组件代码 |
| 关系查询全表摄入 | `relations.ts` | 数据增长后响应变慢 |
| 搜索 API JS 端过滤 | `src/app/api/search/route.ts` | 数据增长后响应变慢，相关性排序有限 |
| 无 lazy loading 路由 | 全项目 | 所有页面在首次构建时全部生成 |

### 建议

1. **拆分首页**：将 FeaturedBuildings / FeaturedArchitects / TimelinePreview 拆为独立组件
2. **Dynamic import 非首屏组件**：时间轴预览、知识导览可用 `next/dynamic`
3. **关系查询优化**：改为 Supabase `.in()` 过滤，减少 JS 端计算
4. **SearchResults 可 lazy**：搜索组件仅在搜索页需要
5. **搜索 API 缓存与排序**：添加短 TTL 缓存，按精确命中、名称命中、地点/分类命中加权排序

## Client Components

### 当前 12 个 Client Components

```
CinematicHero    — 需要 useState (图片错误处理)
BuildingCard     — 需要 useState (图片错误处理)
EditorialImage   — 需要 useState (图片错误处理)
ImageGallery     — 需要 useState/useEffect/useRef (交互)
LanguageSwitcher — 需要 usePathname (保留当前路径切换语言)
MobileNav        — 需要 useState (开关)
PageTransition   — framer-motion
SearchResults    — 需要 useState/useEffect (搜索)
SmoothScroll     — lenis 初始化
ThemeToggle      — 需要 useState (主题切换)
SafeImage        — next/image 需要
Reveal           — framer-motion
```

### 建议

- SafeImage 可以保持 client（next/image 要求）
- 图片错误处理可考虑用 CSS fallback 替代 useState（减少 client boundary）
- BuildingCard 的 `imgError` 状态可改为纯 CSS `object-fit` fallback

## Rerender 问题

### 已知问题

| 组件 | 问题 | 修复 |
|------|------|------|
| SearchResults | 110 行 client shell，状态与请求仍集中 | 需要筛选/分页时抽 `useSearchResults()` |
| 首页 | `allBuildings` 在每次渲染时重新过滤 | 已用 ISR 缓存，影响小 |
| CinemaBero | 无 key 的 motion.div | 不影响（单实例） |

## Cache Strategy

### 当前

| 层 | 策略 | TTL |
|----|------|-----|
| Next.js ISR | 首页 3600s, 详情 86400s | ✅ |
| Vercel CDN | 静态资源 86400s | ✅ |
| data.ts 内存缓存 | Map, 请求级 | 300s |
| Supabase | 无查询缓存 | — |

### 建议

1. **跨请求缓存**：eras/styles 数据不常变，可用 `unstable_cache` 或全局缓存
2. **API Route 缓存**：搜索 API 可添加短 TTL 缓存
3. **service worker**：不必要（已用 ISR）

## 优化优先级

### 高（立即）
- 压缩 1MB 以上本地缓存 JPG

### 中（短期）
- 首页拆分为子组件（提升可维护性）
- 关系查询优化（预防数据增长后性能下降）
- 搜索 API 短缓存与相关性排序
- 首屏图片 lazy loading

### 低（长期）
- Dynamic import 非首屏组件
- 图片迁移到 CDN
- 跨请求数据缓存
