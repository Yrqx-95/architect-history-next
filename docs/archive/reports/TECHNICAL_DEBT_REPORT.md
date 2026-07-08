# Technical Debt Report

Generated: 2026-06-10

Scope: current technical debt audit for Archistory. No code changes, no migrations, no data writes.

## Current Health Signal

- `npm run data:audit` completed successfully.
- Current audit result: 3787 issues.
- Current severity distribution: 0 errors, 1297 warnings, 2490 info.
- Top remaining audit categories:
  - Missing `era_slug`: 875
  - Description missing or shorter than 40 characters in zh/en: 875
  - Significance missing or shorter than 40 characters in zh/en: 872
  - Missing Japanese name: 743
  - Missing `type_slug`: 352
  - Missing `country_code`: 52
  - Missing architect reference: 17
  - Building year more than 20 years after architect death year: 1

## Critical

### 1. Content Completeness Is Now The Main Product Risk

Impact: SEO, search quality, user trust, learning value.

The data audit has no error-level taxonomy failures, but warnings remain broad. Missing descriptions, significance, Japanese names, era, and type metadata mean many pages can render but still feel thin, inconsistent, or hard to discover.

Recommended fix: continue metadata/content completion in controlled batches, with reports and rollbackable migrations only for high-confidence updates.

### 2. Search Still Risks Scaling Poorly

Impact: search, performance, future learning navigation.

The current search system has improved scoring and API behavior, but the architecture still appears dependent on fetching broad datasets and ranking in application code. This is acceptable for current scale but risky as content and learning concepts grow.

Recommended fix: after data warnings are lower, add database-backed search indexes and keep the current JS scoring as fallback during migration.

### 3. Image Source Authority Is Fragmented

Impact: SEO, page quality, licensing trust, repository size.

Images currently involve Supabase image rows, local overrides, generated registry, local curated images, image proxy, and a pending `curated_images` migration. The project does not yet have a single authoritative image source.

Recommended fix: do not migrate blindly. First document current image resolution order, then execute `curated_images` only in staging, then migrate object storage.

### 4. Repository Contains Generated And Local Deployment Artifacts

Impact: data safety, repo hygiene, deployment confusion.

The repo includes generated registry data, curated image binaries, `.vercel` metadata in unexpected locations, `.DS_Store`, test output, and temporary directories. These do not necessarily break the app, but they increase accidental commit/deployment risk.

Recommended fix: move or ignore generated/local files after confirming deployment does not depend on them.

### 5. Dirty Working Tree Makes Safe Release Management Hard

Impact: rollback safety, deploy confidence.

The working tree contains many modified and untracked files across production code, docs, scripts, migrations, reports, and assets. Without a clean grouping strategy, it is difficult to tell which changes belong together.

Recommended fix: create explicit commit groups: production fixes, data governance scripts, migrations, reports/archive cleanup, and generated artifacts.

## Medium

### 1. `src/content` Mixes Product Content With Process Reports

Impact: maintainability, developer orientation.

The content directory contains imported product content, candidate pools, learning sources, reports, promotion notes, rejected candidates, and audit summaries. This makes it harder to identify what ships.

Recommended fix: split into `src/content/*` for imported runtime content and `docs/archive/content-pipeline/*` for reports and decision logs.

### 2. Learning Modules Exist In Multiple Layers

Impact: product clarity.

Learning content now exists in `src/lib/learning-*`, `src/content/*`, root-level learning reports, and product audit reports. The direction is promising, but without consolidation it can create parallel systems.

Recommended fix: choose one V1 learning layer and treat the others as archived validated concepts.

### 3. Relations And Search Need More Query Pushdown

Impact: performance and maintainability.

Some related-building queries were optimized, but broader relation/search paths still need review to avoid full-table fetch plus JS filtering.

Recommended fix: prioritize high-traffic pages first: building detail, architect detail, search API, country/type/style pages.

### 4. Migration Execution State Needs Stronger Source Of Truth

Impact: recoverability.

There are migrations with non-linear numbering and rollback files. This is manageable, but only if execution state is explicit.

Recommended fix: keep `docs/STATUS.md` updated with executed/pending migrations and add one migration ledger file if Supabase CLI is not the source of truth.

### 5. Scripts Need Clear Lifecycle Labels

Impact: developer efficiency.

Some scripts are permanent governance tools; others are one-off sprint scripts. Their purpose is not obvious from filenames alone.

Recommended fix: label scripts in README or `docs/STATUS.md` as `runtime-support`, `governance`, `one-off`, or `archive-ready`.

## Low

### 1. Root Directory Is Too Noisy

Impact: navigation and onboarding.

Many reports live at root. Important files are visually drowned out by sprint artifacts.

Recommended fix: keep root to app config, README, package files, and a small number of top-level docs. Move reports to `docs/archive/`.

### 2. Component Folder Is Still Broad

Impact: organization.

`src/components` has 55 files. Most are referenced, so this is not urgent, but future feature work will make the flat structure harder to navigate.

Recommended fix: postpone reorganization until V1 scope is frozen.

### 3. Public Assets Need Ownership Rules

Impact: repo size.

Local curated images are useful, but the repo should not become long-term object storage.

Recommended fix: keep short-term, migrate medium-term to R2/Supabase Storage/Vercel Blob after image authority is decided.

### 4. Reports Lack Consistent Naming And Archive Policy

Impact: documentation quality.

Some reports use sprint names, some page names, some audit names, some concepts. It is difficult to know which one supersedes another.

Recommended fix: add `docs/archive/README.md` with categories and superseded/current labels.

### 5. Tests Are Good Smoke Coverage, Not Full Safety

Impact: regression detection.

The current tests are a good safety net, but they do not yet cover learning content, search ranking details, data normalization scripts, or image source resolution.

Recommended fix: keep tests minimal but add targeted tests only when changing those systems.
