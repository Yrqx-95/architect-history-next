# File Structure

Last updated: 2026-07-08

Purpose: show where current code, content, docs, generated files, and archives belong. Keep this file short; detailed rules live in `docs/PROJECT_OPERATING_SYSTEM.md`.

## Top Level

| Path | Role | Notes |
|---|---|---|
| `README.md` | Setup and quick entry | Start here for local run commands. |
| `STATUS.md` | Current product state | Keep current constraints here, not in old reports. |
| `DOCUMENT_INDEX.md` | Document map | Update when adding or moving current docs. |
| `SCRIPT_REGISTRY.md` | Script lifecycle | Update when adding scripts. |
| `src/` | Next.js app, components, libraries, app-consumed content | Main product code. |
| `content/` | Source CSV and content manifests | Editable content source. |
| `public/` | Static runtime assets and public data exports | Optimize images before committing. |
| `scripts/` | Repeatable maintenance tools | No one-off scripts without registry notes. |
| `db/` | Database migrations and reports | Keep reviewed migrations here. |
| `docs/` | Current docs, logs, archive, and reports | Current docs stay shallow; history goes to `docs/archive/`. |
| `reports/` | Generated script output | Ignored by git. Regenerate when needed. |

## App Routes

| Path | Role |
|---|---|
| `src/app/[lang]/` | Localized public routes for `zh`, `en`, and `ja`. |
| `src/app/[lang]/browse/` | Archive browsing by architects, buildings, countries, eras, styles, and types. |
| `src/app/[lang]/architect/[slug]/` | Architect detail pages. |
| `src/app/[lang]/building/[slug]/` | Building detail pages. |
| `src/app/[lang]/code/` | Building-code learning pages. |
| `src/app/[lang]/graduation/[[...slug]]/` | Graduation Inspiration Library. |
| `src/app/[lang]/learn/`, `paths/`, `timeline/`, `map/`, `graph/`, `search/`, `feedback/` | Learning, navigation, discovery, and feedback surfaces. |
| `src/app/[lang]/not-found.tsx` | Localized not-found handling. |
| `src/app/api/` | Search, image proxy, and V1 API endpoints. |

Note: the old `src/app/[lang]/[...missing]/page.tsx` catch-all route is intentionally removed; localized not-found handling should use `src/app/[lang]/not-found.tsx`.

## Product Code

| Path | Role | Notes |
|---|---|---|
| `src/components/` | Shared React components | Mostly flat today; only split into subfolders when repeated complexity justifies it. |
| `src/components/search/` | Search-specific components | Keep search internals here. |
| `src/components/image-gallery/` | Image gallery internals | Keep gallery subcomponents here. |
| `src/lib/data.ts` | Main data access | Treat as core architecture. |
| `src/lib/types.ts` | Shared types | Keep type-focused. |
| `src/lib/i18n.ts` | UI translation dictionary | Add `zh`, `en`, and `ja` together. |
| `src/lib/display.ts`, `locale.ts`, `taxonomy-display.ts` | Display and localization helpers | Prefer these over inline locale logic. |
| `src/lib/image-domains.ts`, `proxy-image.ts` | Image domain policy and proxy helpers | Keep domain allowlist in one place. |
| `src/lib/graduation.ts` | Graduation data helpers | Keep paired with graduation content and audit scripts. |

## Content And Generated Data

| Path | Role | Rule |
|---|---|---|
| `content/issues.csv`, `site_types.csv`, `cases.csv` | Graduation source tables | Source of truth for editable graduation content. |
| `content/graduation_image_manifest.json` | Current local graduation image records | Only current visible local assets belong here. |
| `content/graduation_image_retry_queue.json` | Future image download candidates | Use with `--retry-queue`; do not mix with current manifest. |
| `src/content/graduation/` | App-consumed graduation JSON | Generated or synchronized from source content. |
| `public/data/graduation/` | Public graduation data exports | Keep synchronized through `npm run graduation:data`. |
| `public/images/graduation/` | Runtime graduation images | Optimize with `npm run graduation:images:optimize`. |

## Scripts

Current script ownership is tracked in `SCRIPT_REGISTRY.md`.

Important groups:

- data governance: `scripts/audit-data.ts`, `scripts/normalize-*.ts`, `scripts/report-orphan-style-slugs.ts`
- image governance: `scripts/audit-images.mjs`, `scripts/build-image-registry.mjs`, `scripts/cache-curated-images.mjs`
- graduation: `scripts/build-graduation-data.mjs`, `scripts/audit-graduation-content.mjs`, `scripts/localize-graduation-case-images.mjs`, `scripts/optimize-graduation-case-images.mjs`

## Docs

| Path | Role |
|---|---|
| `docs/PROJECT_OPERATING_SYSTEM.md` | Short maintenance protocol. |
| `docs/WORKLOG.md` | Engineering handoff log. |
| `docs/USER_SIMULATION_LOG.md` | User-view QA and product simulation log. |
| `docs/graduation/` | Current graduation feature handoff docs. |
| `docs/reports/` | Current human-readable audit or cleanup reports. |
| `docs/archive/` | Old plans, reports, one-off evidence, and historical material. |

## Current Cleanup Notes

- `.next/`, `tsconfig.tsbuildinfo`, `reports/`, `.vercel/`, and `node_modules/` are local/generated and should not be committed.
- `reports/` remains on disk for generated script output but is ignored.
- `plans/` markdown files were archived under `docs/archive/plans/`.
- Learning markdown reports formerly under `src/lib/` were archived under `docs/archive/learning-materials/`.
- Deletions of unused code files should stay in a separate review group until validation passes.
