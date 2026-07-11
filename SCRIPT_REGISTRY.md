# Script Registry

Last updated: 2026-07-08

Purpose: clarify which scripts support production, which govern data quality, which were one-off sprint tools, and which can be archived after confirmation.

## runtime-support

| Script | Purpose | Notes |
|---|---|---|
| `scripts/build-image-registry.mjs` | Generates image registry from available image sources | Runtime-adjacent until image authority is migrated |
| `scripts/build-image-fill-queue.mjs` | Builds a read-only queue for buildings missing policy-safe images and checks Wikidata P18 Commons candidates | Keep as the unattended image-fill entrypoint; `--advance` traverses later batches, retries rate limits once, and accumulates a local catalog |
| `scripts/cache-curated-images.mjs` | Caches curated images locally | Runtime-adjacent but should eventually move to object storage flow |
| `scripts/audit-images.mjs` | Checks image quality/source availability | Supports image reliability |
| `scripts/build-architect-portraits.mjs` | Builds architect portrait report/assets | Supports visible architect image quality |

## governance

| Script | Purpose | Notes |
|---|---|---|
| `scripts/audit-data.ts` | Main data quality audit | Keep as release/data gate |
| `scripts/report-orphan-style-slugs.ts` | Reports orphan style assignments | Keep until style taxonomy remains stable over time |
| `scripts/normalize-style-slugs.ts` | Dry-run/write style alias normalization | Keep for repeatability and rollback context |
| `scripts/plan-era-slugs.ts` | Read-only era_slug candidate planning | Keep until era completion ends; writes no database changes |
| `scripts/build-era-identity-cleanup-review.ts` | Builds a read-only Wikidata-backed identity cleanup review for weak era candidates | Keep until weak identity records are resolved; writes no database changes |
| `scripts/build-era-remaining-year-unique-review-queue.ts` | Builds a read-only review queue for remaining year-unique era exceptions | Keep until era completion ends; writes no database changes |
| `scripts/build-era-postmodern-review-queue.ts` | Builds a read-only postmodern era manual review queue | Keep until postmodern era completion ends; writes no database changes |
| `scripts/prepare-image-fill-reviewed.mjs` | Revalidates one image queue batch and generates guarded insert/rollback SQL drafts | Governance boundary between unattended discovery and any reviewed database write; does not apply SQL |
| `scripts/prepare-era-slug-postmodern-reviewed.ts` | Generates the reviewed postmodern chronological era write batch | Keep until era completion ends; refuses to overwrite reviewed migration/report unless explicitly overridden |
| `scripts/prepare-era-slug-year-unique-a.ts` | Generates the first reviewed year-unique era write batch | Keep until era completion ends; refuses to overwrite reviewed migration/report unless explicitly overridden |
| `scripts/prepare-era-slug-contemporary-year-unique.ts` | Generates the reviewed contemporary year-unique era write batch | Keep until era completion ends; refuses to overwrite reviewed migration/report unless explicitly overridden |
| `scripts/normalize-type-slugs.ts` | Dry-run/write legacy type normalization | Keep until old display-name compatibility is retired |
| `scripts/normalize-type-slugs-high-confidence.ts` | High-confidence type normalization | Keep as governance history until type completion ends |
| `scripts/normalize-type-slugs-medium-a.ts` | Medium-A type normalization | Keep as governance history until type completion ends |
| `scripts/normalize-country-codes.ts` | Country-code normalization | Keep until country completion ends |
| `scripts/normalize-country-codes-sprint04.ts` | Safer country-code sprint normalization | Keep because it documents stricter safety logic |
| `scripts/apply-type-slug-p0-decisions.ts` | Applies reviewed P0 type decisions | Keep if manual review process continues |
| `scripts/supabase-script-utils.ts` | Shared script helpers | Keep while TS governance scripts exist |
| `scripts/style-slug-aliases.json` | Explicit style alias map | Keep as data governance source |

## graduation

| Script | Purpose | Notes |
|---|---|---|
| `scripts/build-graduation-data.mjs` | Builds graduation JSON and public exports from source CSV | Keep as the source-to-runtime sync tool |
| `scripts/audit-graduation-content.mjs` | Audits graduation content relationships, image state, source state, and public readiness | Keep as the graduation release/data gate |
| `scripts/match-graduation-cases-to-buildings.ts` | Produces a read-only multilingual identity match between graduation cases and canonical Supabase buildings | Keep until graduation cases use canonical `building_id`; never treat its fuzzy candidates as approved links |
| `scripts/localize-graduation-case-images.mjs` | Links or downloads graduation case images from manifest records | Default uses current manifest; use `--retry-queue` only for future image candidates |
| `scripts/optimize-graduation-case-images.mjs` | Optimizes current local graduation case images | Skips writes when optimized output would be larger |

## one-off

| Script | Purpose | Notes |
|---|---|---|
| `scripts/audit-content-coverage.mjs` | Content coverage report | One-off or periodic depending on content workflow |
| `scripts/audit-display-coverage.mjs` | Display coverage report | One-off or periodic depending on content workflow |

## archived

These one-off scripts were removed from the active `scripts/` workspace on 2026-07-03 and preserved as text under `docs/archive/scripts/one-off/`.

- `docs/archive/scripts/one-off/review-type-slug-medium.ts.txt`
- `docs/archive/scripts/one-off/build-type-slug-manual-review-queue.ts.txt`
- `docs/archive/scripts/one-off/build-type-slug-p0-review-pack.ts.txt`
- `docs/archive/scripts/one-off/scan-learning-pdf-signals.swift.txt`

## npm Script Entry Points

From `package.json`:

- `data:audit` → governance
- `data:plan-eras` → governance / read-only planning
- `data:review-era-identity` → governance / read-only weak identity review
- `data:review-era-year-unique` → governance / read-only remaining year-unique review queue
- `data:review-era-postmodern` → governance / read-only manual review queue
- `data:prepare-era-postmodern` → governance / era write preparation
- `data:prepare-era-year-a` → governance / era write preparation
- `data:prepare-era-contemporary` → governance / era write preparation
- `data:normalize-types` → governance
- `data:normalize-styles` → governance
- `data:apply-type-p0-decisions` → governance / manual review workflow
- `data:orphan-styles` → governance
- `images:audit` → runtime-support
- `images:registry` → runtime-support
- `images:queue` → runtime-support / read-only image-fill queue
- `images:queue:advance` → runtime-support / advancing unattended image-fill queue
- `images:prepare-reviewed` → governance / reviewed image write preparation only
- `images:cache` → runtime-support
- `content:audit` → one-off or periodic governance
- `content:audit-display` → one-off or periodic governance
- `content:portraits` → runtime-support
- `graduation:data` → graduation
- `graduation:data:from-json` → graduation
- `graduation:audit` → graduation
- `graduation:match-buildings` → graduation / read-only identity audit
- `graduation:images:dry-run` → graduation
- `graduation:images:localize` → graduation
- `graduation:images:optimize` → graduation

## Rule For Future Scripts

Every new script should be registered here when added. If it is a sprint-only tool, mark it `one-off` immediately and define the condition for archiving it.
