# Repository State

Generated: 2026-06-10

Scope: current repository inventory for Archistory. This audit does not delete files, add features, add metadata, change taxonomy, or modify database state.

## Current Snapshot

- Repository root: `/Users/liquanxing/Downloads/archistory`
- Package: `architect-history-next`
- Framework: Next.js 16 App Router
- Current data audit: 3787 issues, 0 errors, 1297 warnings, 2490 info
- Git state: dirty working tree with many modified and untracked production files, reports, scripts, migrations, images, and evidence directories
- Repo size: about 2.9 GB
- Largest known generated/static assets:
  - `public/images/curated`: 221 files, about 74 MB
  - `db/image-registry.generated.json`: about 4.1 MB
  - `tmp`: about 9.1 MB
  - `reports`: about 2.1 MB
  - `docs/archive/product-audits/evidence/p1-review`: about 1.2 MB
  - `docs/archive/product-audits/evidence/p1a-sprint1`: about 1.3 MB

## Production

These are the areas currently used or intended to be used by the running product.

| Area | File Count | Main Responsibility | Still Referenced |
|---|---:|---|---|
| `src/app` | 33 | App Router pages, layouts, API routes, language routing, search, image proxy, browse/detail/learn pages | Yes |
| `src/components` | 55 | UI components for cards, navigation, image display, search, animation, learning/topic pages | Mostly yes |
| `src/lib` | 55 | Supabase access, types, display helpers, i18n, relations, taxonomy, search intelligence, image policy, learning graph/exam concepts | Mostly yes |
| `src/content` | 33 | Learning page content, curated glossary material, core learning terms, learning sources, building learning map | Partly yes |
| `db` | 18 | Baseline schema, migrations, generated image registry, audit reports | Partly yes |
| `scripts` | 21 | Data audit, taxonomy normalization, metadata dry-run/write reports, image registry/cache/audit, content audit | Yes for governance, not runtime |
| `public` | 227 | Static icons and curated local images | Yes, but curated images are storage debt |
| `tests` | 2 | Unit and e2e smoke tests | Yes |
| `docs` | 17 | Project docs, product strategy, status, schema, performance, content rules, agent rules | Yes as internal docs |

### Production Notes

- `src/app` is the actual product surface. It includes home, building details, architect details, browse pages, country/style/type pages, search, learn, timeline, graph, map, code, glossary, feedback, and API routes.
- `src/components` is mostly active. A rough reference check found active references for most components. It should not be reorganized until the product surface is frozen.
- `src/lib` contains both runtime product logic and concept modules. Runtime-critical files include `data.ts`, `relations.ts`, `supabase.ts`, `i18n.ts`, `locale.ts`, `display.ts`, `quality.ts`, `taxonomy.ts`, `taxonomy-display.ts`, `image-policy.ts`, `proxy-image.ts`, and search/image helpers.
- `src/content` is mixed. `core-learning-terms` and `learning-product/path-sections.ts` are referenced by the learn page. Some curated glossary and learning-source files are content pipeline material rather than direct product surface.
- `db/migrations` now contains baseline and normalization history. Execution state should remain documented in `docs/STATUS.md`.
- `scripts` is important for safety. Several scripts are not runtime code but are part of data governance and should be retained until the related data work is complete.

## Validated Concepts

These directions have been validated through reports or prototype content, but they are not yet fully productized as page components.

| Concept | Current Artifact | Current Status | Landed In Product | Dependencies | Next Recommendation |
|---|---|---|---|---|---|
| Why Study This | `LEARNING_LAYER_BUILDING_TEMPLATE.md` | Direction validated for building-page learning blocks | Not yet | Needs content model and page placement | Convert 5-10 canonical examples into a small static content map before DB work |
| Active Learning | `ACTIVE_LEARNING_EXAMPLES.md` | Validated as prompt-based student interaction | Not yet | Needs UI pattern for short tasks and user response area | Keep as V2 unless V1 learning value feels too passive |
| Learning Graph | `LEARNING_GRAPH_EXAMPLES.md` and `src/lib/learning-graph/*` | Concept exists both as report and code module | Partly | Needs relationship between buildings, concepts, exam/studio topics | Productize only after core building pages are stable |
| Learning Bridge | `LEARNING_BRIDGE_EXAMPLES.md` | Validated bridge from cases to exam/design/history | Not yet | Needs careful non-legal framing for exam topics | Use as editorial guidance, not legal/code explanation |
| Design Decision | `DESIGN_DECISION_EXAMPLES.md` | Validated as trade-off training model | Not yet | Needs interactive or structured critique UI | Pause until V1 has clear learning navigation |

## Experimental

These files are useful as evidence, history, or decision records, but should not keep accumulating in the project root.

### Product / UX / Benchmark Reports

- `01-linear-audit.md`
- `02-notion-audit.md`
- `03-khan-academy-audit.md`
- `04-google-arts-culture-audit.md`
- `05-arena-audit.md`
- `06-cross-product-patterns.md`
- `07-archistory-benchmark-report.md`
- `08-recommended-ux-direction.md`
- `PRODUCT_AUDIT.md`
- `p1-ux-review-report.md`
- `p1-priority-roadmap.md`
- `executive-summary.md`
- `reference-research-report.md`
- `information-architecture-audit.md`
- `visual-consistency-audit.md`
- `homepage-learning-entry-audit.md`
- `learn-discoverability-audit.md`

Value: still useful as product history.
Recommendation: move to `docs/archive/product-audits/`.

### Page Review Reports

- `architect-detail-review.md`
- `browse-review.md`
- `building-detail-review.md`
- `code-review.md`
- `glossary-review.md`
- `learn-review.md`
- `timeline-review.md`

Value: useful only if unresolved issues remain.
Recommendation: extract remaining actionable issues into one backlog, then archive.

### Data / Taxonomy / Metadata Reports

- `DATA_QUALITY_REPORT.md`
- `COUNTRY_CODE_DRY_RUN.md`
- `COUNTRY_CODE_WRITE_REPORT.md`
- `TYPE_SLUG_DRY_RUN.md`
- `TYPE_SLUG_WRITE_REPORT.md`
- `TYPE_SLUG_MEDIUM_REVIEW.md`
- `TYPE_SLUG_MEDIUM_A_WRITE_REPORT.md`
- `TYPE_SLUG_MANUAL_REVIEW_QUEUE.md`
- `TYPE_SLUG_P0_REVIEW_PACK.md`
- `ERA_ASSIGNMENT_STRATEGY.md`
- `METADATA_COMPLETION_MASTER_REPORT.md`
- `STYLE_TAXONOMY_FINAL_REPORT.md`
- `TAXONOMY_STABILITY_REVIEW.md`
- `reports/*.json`
- `reports/*.md`
- `reports/*.sql`

Value: important governance history.
Recommendation: keep machine-readable current reports in `reports/`, move narrative sprint reports to `docs/archive/data-governance/`.

### Learning Concept Reports

- `LEARNING_LAYER_BUILDING_TEMPLATE.md`
- `ACTIVE_LEARNING_EXAMPLES.md`
- `LEARNING_BRIDGE_EXAMPLES.md`
- `LEARNING_GRAPH_EXAMPLES.md`
- `DESIGN_DECISION_EXAMPLES.md`

Value: validated concept set.
Recommendation: move to `docs/product/learning-concepts/` and stop adding new learning experiments until one is productized.

### Evidence / Temporary Directories

- `evidence/benchmark/`
- `evidence/p1-review/`
- `evidence/p1a-sprint1/`
- `tmp/`
- `test-results/`

Value: screenshots/evidence are useful during review, but not as root-level long-term assets.
Recommendation: archive selected evidence only; delete or ignore temp/test outputs after confirmation.

## Delete Candidates

Do not delete automatically. These are candidates for later cleanup after confirmation.

### High Confidence Delete

- `.DS_Store` files: OS noise, no product value.
- `src/content/.DS_Store`: OS noise.
- `.vercel/` in repo root: local deployment linkage should not be committed.
- `public/images/curated/.vercel/`: misplaced Vercel metadata inside image assets.
- `test-results/`: generated Playwright output.
- `tmp/`: temporary working data.
- `src/lib/image-loader.ts`: rough reference check found no imports; verify once with typecheck before removal.
- `db/image-registry.generated.json`: generated registry; should be regenerated by script if deployment does not depend on committed copy.

### Medium Confidence Delete

- `evidence/benchmark/`: keep only if the benchmark report needs local screenshots.
- `evidence/p1-review/` and `evidence/p1a-sprint1/`: archive selected screenshots or move outside root.
- Root-level page review reports after actionable issues are extracted.
- Duplicate narrative taxonomy reports after `docs/STATUS.md` and migrations are confirmed.
- Old dry-run/write Markdown reports after current machine-readable `reports/*.json` and migration files are verified.
- `src/content/curated-glossary/*-report.md` and sprint notes: archive if not imported by product.
- `src/lib/learning-audit/phase-2-learning-audit.md`: archive with learning audit docs.

## Main Repository Risk

The product code is not the biggest source of disorder. The largest disorder is that production code, governance scripts, sprint reports, benchmark evidence, generated data, and product concept notes all live side by side. This makes it hard to tell what is product, what is proof, what is history, and what is safe to remove.
