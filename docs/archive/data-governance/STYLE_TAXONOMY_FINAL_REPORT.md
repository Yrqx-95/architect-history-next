# Style Taxonomy Final Report

Date: 2026-06-08

## Objective

Resolve the remaining `data:audit` error-level issues. Before this pass, all remaining errors were `style_slugs` orphan values:

- 22 orphan style assignments
- 11 unique orphan style values

Final result:

- `data:audit` error count: 0
- orphan style assignments: 0
- orphan unique style values: 0

## Canonical Styles Added

The remaining values were not forced into unrelated existing styles. They were reviewed as taxonomy gaps and added through migration:

- `structural-expressionism`: 结构表现主义 / Structural Expressionism / 構造表現主義
- `sculptural-architecture`: 雕塑建筑 / Sculptural Architecture / 彫刻的建築
- `geometric-abstraction`: 几何抽象 / Geometric Abstraction / 幾何学的抽象
- `exposed-concrete`: 清水混凝土 / Exposed Concrete / 打放しコンクリート
- `natural-materials`: 自然材料 / Natural Materials / 自然素材
- `prairie-school`: 草原风格 / Prairie School / プレーリー派
- `expressionism`: 表现主义 / Expressionism / 表現主義
- `urban-design`: 城市设计 / Urban Design / 都市デザイン
- `adaptive-reuse`: 历史建筑改造 / Adaptive Reuse / 歴史的建築の再生
- `industrial-reuse`: 工业改造 / Industrial Reuse / 産業建築の再生
- `emergency-architecture`: 应急建筑 / Emergency Architecture / 応急建築

Migration:

- `db/migrations/v6-style-taxonomy-finalization.sql`

Because the local environment has no Supabase CLI or `psql` migration runner configured, the same canonical rows defined in the migration were applied to the current Supabase project via the Supabase client. The migration is the replayable record.

## Orphan Mappings Applied

Mappings were added to `scripts/style-slug-aliases.json` and applied with `npm run data:normalize-styles -- --write`.

| Orphan style_slug | Canonical styles.slug | Assignments |
|---|---|---:|
| 结构表现主义 | structural-expressionism | 4 |
| 雕塑建筑 | sculptural-architecture | 4 |
| 几何抽象 | geometric-abstraction | 3 |
| 城市设计 | urban-design | 2 |
| 清水混凝土 | exposed-concrete | 2 |
| 自然材料 | natural-materials | 2 |
| 历史建筑改造 | adaptive-reuse | 1 |
| 工业改造 | industrial-reuse | 1 |
| 应急建筑 | emergency-architecture | 1 |
| 草原风格 | prairie-school | 1 |
| 表现主义 | expressionism | 1 |

Data migration generated:

- `db/migrations/v6-normalize-remaining-style-slugs.sql`

## Buildings Updated

22 buildings were updated, one style assignment each:

- `bank-of-china-tower`: `几何抽象` -> `geometric-abstraction`
- `cardboard-cathedral`: `应急建筑` -> `emergency-architecture`
- `beijing-national-stadium`: `结构表现主义` -> `structural-expressionism`
- `dancing-house`: `雕塑建筑` -> `sculptural-architecture`
- `gateway-arch`: `结构表现主义` -> `structural-expressionism`
- `guggenheim-bilbao`: `雕塑建筑` -> `sculptural-architecture`
- `guggenheim-nyc`: `雕塑建筑` -> `sculptural-architecture`
- `louvre-pyramid`: `几何抽象` -> `geometric-abstraction`
- `miho-museum`: `几何抽象` -> `geometric-abstraction`
- `naoshima`: `清水混凝土` -> `exposed-concrete`
- `national-stadium-tokyo`: `自然材料` -> `natural-materials`
- `reichstag-dome`: `历史建筑改造` -> `adaptive-reuse`
- `robie-house`: `草原风格` -> `prairie-school`
- `st-peters-square`: `城市设计` -> `urban-design`
- `tate-modern`: `工业改造` -> `industrial-reuse`
- `v-and-a-dundee`: `自然材料` -> `natural-materials`
- `water-temple`: `清水混凝土` -> `exposed-concrete`
- `chapel-of-notre-dame-du-haut`: `表现主义` -> `expressionism`
- `hongkong-bank`: `结构表现主义` -> `structural-expressionism`
- `millau-viaduct`: `结构表现主义` -> `structural-expressionism`
- `piazza-del-campidoglio`: `城市设计` -> `urban-design`
- `walt-disney-concert-hall`: `雕塑建筑` -> `sculptural-architecture`

No duplicate style assignments were produced.

## Manual Confirmation

No orphan style was left unresolved.

The original C-class values were not blindly mapped to existing styles. They were manually reviewed and promoted into stable canonical taxonomy slugs:

- `城市设计` -> `urban-design`
- `历史建筑改造` -> `adaptive-reuse`
- `工业改造` -> `industrial-reuse`
- `应急建筑` -> `emergency-architecture`

## Audit Result

`npm run data:audit`:

```text
exit status: 0
total issues: 4953
errors: 0
warnings: 2463
info: 2490
```

`npm run data:orphan-styles`:

```text
orphan style assignments: 0
unique orphan style values: 0
```

Remaining audit items are warning/info-level data quality work, not blocking errors.

## Verification

Passed:

```bash
npm run data:audit
npm run lint
npm run typecheck
npm run build
npm test
```

Note: one parallel verification attempt ran `npm run build` and `npm test` at the same time, causing Playwright's Next web server to hit a Next build lock. It was rerun sequentially and passed.
