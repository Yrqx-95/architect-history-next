# Worktree Grouping 2026-07-08

Purpose: split the current dirty worktree into reviewable, commit-sized groups.

Do not run `git clean` on this repository. Many untracked paths are real product work.

## Current Snapshot

- Dirty worktree entries: 166
- Modified tracked files: 70
- Deleted tracked files: 10
- Untracked files/directories: 86
- Ignored local/generated directories still present: `.vercel/`, `node_modules/`, `public/images/curated/.vercel/`, `reports/`
- Removed generated cache during cleanup: `.next/`, `tsconfig.tsbuildinfo`
- Approximate repository working directory size after image cleanup: 728M
- Approximate `public/` size after image cleanup: 92M

## Recommended Review Order

1. Review Group 1 first so documentation and ignore rules are stable.
2. Review Group 7 with Group 5 because those deletions are archived copies, not lost material.
3. Review Group 8 only after `typecheck`, `lint`, and route smoke tests pass.
4. Review Groups 2, 3, 4, and 6 as separate product commits because they have different blast radii.

## Verification

- `npm run typecheck` passed.
- `npm run lint` passed.
- `npm run graduation:audit` passed with 0 integrity problems.
- `node scripts/optimize-graduation-case-images.mjs --apply` checked 45 current graduation image assets after manifest cleanup; latest run optimized 0 additional files and reported 0 missing files.
- `node scripts/localize-graduation-case-images.mjs --retry-queue --limit=1` dry-run reached the dedicated retry queue and reported the first queued download candidate.
- Route smoke test passed on local dev server: `/zh/graduation/issues` returned `200 text/html`, and compressed case images `case-005-3331-arts-chiyoda.jpg` and `case-018-kanazawa-umimirai-library.jpg` returned `200 image/jpeg`.
- Suggested staging commands were checked with `git add --dry-run`.
- Old bare graduation doc references were checked; remaining references use `docs/graduation/...`.
- Graduation case image folder was reduced to about 16M, and all 45 local image references in `content/cases.csv` resolve to existing files.
- Graduation image records are split into a 45-entry current manifest and a 16-entry retry queue.
- Current entry docs and `docs/FILE_STRUCTURE.md` were checked for stale structure phrases and old README migration-list entries.

## Group 1 - Repository Hygiene

Scope:

- `.gitignore`
- `DOCUMENT_INDEX.md`
- `STATUS.md`
- `ROADMAP.md`
- `PRODUCT_SURFACE.md`
- `FEATURE_STATUS.md`
- `SCRIPT_REGISTRY.md`
- `README.md`
- `docs/AI_AGENT_RULES.md`
- `docs/FILE_STRUCTURE.md`
- `docs/HANDOFF.md`
- `docs/PROJECT_OPERATING_SYSTEM.md`
- `docs/STATUS.md`
- `docs/TECH_DEBT.md`
- `docs/WORKLOG.md`
- `docs/USER_SIMULATION_LOG.md`
- `docs/archistory-codex-rules.md`
- `docs/reports/WORKTREE_GROUPING_2026-07-08.md`

Why:

- Root docs describe the current product state.
- `docs/PROJECT_OPERATING_SYSTEM.md` defines the simple maintenance protocol for file placement, validation, logs, and done criteria.
- Generated `reports/` is ignored to reduce status noise.
- File structure docs now point to `[lang]/not-found.tsx`, not the removed catch-all route.

Recommended commit label:

- `chore: consolidate repository docs and generated report hygiene`

Suggested staging command:

```bash
git add .gitignore DOCUMENT_INDEX.md STATUS.md ROADMAP.md PRODUCT_SURFACE.md FEATURE_STATUS.md SCRIPT_REGISTRY.md README.md docs/AI_AGENT_RULES.md docs/FILE_STRUCTURE.md docs/HANDOFF.md docs/PROJECT_OPERATING_SYSTEM.md docs/STATUS.md docs/TECH_DEBT.md docs/WORKLOG.md docs/USER_SIMULATION_LOG.md docs/archistory-codex-rules.md docs/reports/WORKTREE_GROUPING_2026-07-08.md
```

## Group 2 - Graduation Inspiration Library

Scope:

- `src/app/[lang]/graduation/`
- `src/components/GraduationInspirationApp.tsx`
- `src/lib/graduation.ts`
- `src/content/graduation/`
- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `content/graduation_image_manifest.json`
- `content/graduation_image_retry_queue.json`
- `schemas/issue.schema.json`
- `schemas/issue-guide.schema.json`
- `schemas/site_type.schema.json`
- `schemas/case.schema.json`
- `api/openapi.yaml`
- `public/data/graduation/`
- `public/images/graduation/`
- `docs/graduation/`
- `docs/GRADUATION_*.md`
- `scripts/build-graduation-data.mjs`
- `scripts/audit-graduation-content.mjs`
- `scripts/localize-graduation-case-images.mjs`
- `scripts/optimize-graduation-case-images.mjs`

Why:

- This is one coherent product feature: route, UI, data, public exports, images, schemas, docs, and scripts.
- Image optimization now covers actual local case images referenced by content, not only manifest entries.
- Image QA now separates broken public image references from manifest retry/backlog items.
- Current image assets live in `content/graduation_image_manifest.json`; future download candidates live in `content/graduation_image_retry_queue.json`.

Recommended commit label:

- `feat: add graduation inspiration library`

Suggested staging command:

```bash
git add 'src/app/[lang]/graduation' src/components/GraduationInspirationApp.tsx src/lib/graduation.ts src/content/graduation content schemas api/openapi.yaml public/data/graduation public/images/graduation docs/graduation docs/GRADUATION_*.md scripts/build-graduation-data.mjs scripts/audit-graduation-content.mjs scripts/localize-graduation-case-images.mjs scripts/optimize-graduation-case-images.mjs
```

## Group 3 - Product Surface And UI Refactor

Scope:

- `src/app/[lang]/page.tsx`
- `src/app/[lang]/layout.tsx`
- `src/app/[lang]/loading.tsx`
- `src/app/[lang]/home-copy.ts`
- `src/app/[lang]/home-data.ts`
- `src/app/[lang]/learn/page.tsx`
- `src/app/[lang]/browse/**`
- `src/app/[lang]/architect/**`
- `src/app/[lang]/building/**`
- `src/app/[lang]/code/**`
- `src/app/[lang]/glossary/page.tsx`
- `src/app/[lang]/graph/page.tsx`
- `src/app/[lang]/map/page.tsx`
- `src/app/[lang]/paths/**`
- `src/app/[lang]/search/page.tsx`
- `src/app/[lang]/timeline/page.tsx`
- `src/app/[lang]/feedback/`
- `src/app/globals.css`
- `src/components/ArchitectCard.tsx`
- `src/components/ArchitectDeepArticle.tsx`
- `src/components/ArchitectExplorer.tsx`
- `src/components/ArchitectPortraitFigure.tsx`
- `src/components/ArchitectPortraitThumb.tsx`
- `src/components/BrowseListing.tsx`
- `src/components/BuildingCard.tsx`
- `src/components/BuildingCoverFrame.tsx`
- `src/components/BuildingExplorer.tsx`
- `src/components/CinematicHero.tsx`
- `src/components/CodeTopicDiagrams.tsx`
- `src/components/ContinueExploring.tsx`
- `src/components/EditorialImage.tsx`
- `src/components/GlossaryIndex.tsx`
- `src/components/HomeSectionReveal.tsx`
- `src/components/ImageBreak.tsx`
- `src/components/ImageGallery.tsx`
- `src/components/LanguageSwitcher.tsx`
- `src/components/LearningTopicCard.tsx`
- `src/components/MetadataPanel.tsx`
- `src/components/MobileNav.tsx`
- `src/components/PageTransition.tsx`
- `src/components/Reveal.tsx`
- `src/components/ScrollRevealProvider.tsx`
- `src/components/TimelineRail.tsx`
- `src/components/VerificationBlock.tsx`
- `src/components/image-gallery/`
- `src/components/search/utils.ts`
- `public/images/curated/villa-savoye-1024.jpg`
- `public/images/curated/villa-savoye-exterior-1024.jpg`

Why:

- These files reshape visible product surfaces and shared UI behavior.
- This group should be reviewed separately from graduation-specific work.

Recommended commit label:

- `refactor: polish archive product surfaces`

Suggested staging command:

```bash
git add 'src/app/[lang]/page.tsx' 'src/app/[lang]/layout.tsx' 'src/app/[lang]/loading.tsx' 'src/app/[lang]/home-copy.ts' 'src/app/[lang]/home-data.ts' 'src/app/[lang]/learn/page.tsx' 'src/app/[lang]/browse' 'src/app/[lang]/architect' 'src/app/[lang]/building' 'src/app/[lang]/code' 'src/app/[lang]/glossary/page.tsx' 'src/app/[lang]/graph/page.tsx' 'src/app/[lang]/map/page.tsx' 'src/app/[lang]/paths' 'src/app/[lang]/search/page.tsx' 'src/app/[lang]/timeline/page.tsx' 'src/app/[lang]/feedback' src/app/globals.css src/components/ArchitectCard.tsx src/components/ArchitectDeepArticle.tsx src/components/ArchitectExplorer.tsx src/components/ArchitectPortraitFigure.tsx src/components/ArchitectPortraitThumb.tsx src/components/BrowseListing.tsx src/components/BuildingCard.tsx src/components/BuildingCoverFrame.tsx src/components/BuildingExplorer.tsx src/components/CinematicHero.tsx src/components/CodeTopicDiagrams.tsx src/components/ContinueExploring.tsx src/components/EditorialImage.tsx src/components/GlossaryIndex.tsx src/components/HomeSectionReveal.tsx src/components/ImageBreak.tsx src/components/ImageGallery.tsx src/components/LanguageSwitcher.tsx src/components/LearningTopicCard.tsx src/components/MetadataPanel.tsx src/components/MobileNav.tsx src/components/PageTransition.tsx src/components/Reveal.tsx src/components/ScrollRevealProvider.tsx src/components/TimelineRail.tsx src/components/VerificationBlock.tsx src/components/image-gallery src/components/search/utils.ts public/images/curated/villa-savoye-1024.jpg public/images/curated/villa-savoye-exterior-1024.jpg
```

## Group 4 - Data Governance And API

Scope:

- `db/migrations/`
- `db/content-coverage-report.json`
- `db/display-coverage-report.json`
- `scripts/audit-data.ts`
- `scripts/normalize-*.ts`
- `scripts/apply-type-slug-p0-decisions.ts`
- `scripts/report-orphan-style-slugs.ts`
- `scripts/supabase-script-utils.ts`
- `scripts/style-slug-aliases.json`
- `src/app/api/search/route.ts`
- `src/app/api/image-proxy/route.ts`
- `src/app/api/v1/`
- `src/lib/data.ts`
- `src/lib/display.ts`
- `src/lib/fallback-content.ts`
- `src/lib/image-domains.ts`
- `src/lib/i18n.ts`
- `src/lib/knowledge-os.ts`
- `src/lib/locale.ts`
- `src/lib/proxy-image.ts`
- `src/lib/quality.ts`
- `src/lib/relations.ts`
- `src/lib/supabase.ts`
- `src/lib/taxonomy-display.ts`
- `src/lib/types.ts`
- `src/lib/local-image-overrides.json`

Why:

- These paths affect data quality, API shape, image safety, and backend-facing logic.

Recommended commit label:

- `chore: add data governance and api reliability updates`

Suggested staging command:

```bash
git add db/migrations db/content-coverage-report.json db/display-coverage-report.json scripts/audit-data.ts scripts/normalize-*.ts scripts/apply-type-slug-p0-decisions.ts scripts/report-orphan-style-slugs.ts scripts/supabase-script-utils.ts scripts/style-slug-aliases.json src/app/api/search/route.ts src/app/api/image-proxy/route.ts src/app/api/v1 src/lib/data.ts src/lib/display.ts src/lib/fallback-content.ts src/lib/image-domains.ts src/lib/i18n.ts src/lib/knowledge-os.ts src/lib/locale.ts src/lib/proxy-image.ts src/lib/quality.ts src/lib/relations.ts src/lib/supabase.ts src/lib/taxonomy-display.ts src/lib/types.ts src/lib/local-image-overrides.json
```

## Group 5 - Learning Materials And Research Archive

Scope:

- `src/content/building-learning-map/`
- `src/content/learning-sources/`
- `docs/LEARNING_MATERIAL_INVENTORY.md`
- `docs/LEARNING_OS_EXECUTION.md`
- `docs/learning-material-extraction-plan.md`
- `docs/learning-material-scan-report.md`
- `docs/glossary-style-guide.md`
- `docs/theme-system-simplification-plan.md`
- `docs/archive/`
- `docs/reports/PROJECT_RECOVERY_AUDIT_2026-06.md`
- `docs/reports/ja-language-residue-scan-2026-07-05.md`

Why:

- This group is knowledge/research material, not runtime feature code.
- Historical plans and audits should live under `docs/archive/`.

Recommended commit label:

- `docs: archive research and learning material`

Suggested staging command:

```bash
git add src/content/building-learning-map src/content/learning-sources docs/LEARNING_MATERIAL_INVENTORY.md docs/LEARNING_OS_EXECUTION.md docs/learning-material-extraction-plan.md docs/learning-material-scan-report.md docs/glossary-style-guide.md docs/theme-system-simplification-plan.md docs/archive docs/reports/PROJECT_RECOVERY_AUDIT_2026-06.md docs/reports/ja-language-residue-scan-2026-07-05.md
git add -A plans src/lib/learning-audit/phase-2-learning-audit.md src/lib/learning-graph/learning-graph-overview.md
```

## Group 6 - Tests And Tooling

Scope:

- `tests/`
- `playwright.config.ts`
- `vitest.config.ts`
- `package.json`
- `package-lock.json`
- `next.config.ts`

Why:

- Package and config changes should be reviewed with tests.

Recommended commit label:

- `test: add route and image quality coverage`

Suggested staging command:

```bash
git add tests playwright.config.ts vitest.config.ts package.json package-lock.json next.config.ts
```

## Group 7 - Confirmed Archived Deletions

Scope:

- deleted `plans/*.md`
- deleted `src/lib/learning-audit/phase-2-learning-audit.md`
- deleted `src/lib/learning-graph/learning-graph-overview.md`

Evidence:

- `plans/*.md` files are identical under `docs/archive/plans/`.
- Learning markdown files are identical under `docs/archive/learning-materials/src/lib/...`.

Recommended commit label:

- Include this with Group 5.

## Group 8 - Needs Human Review Before Final Commit

Scope:

- deleted `src/app/[lang]/[...missing]/page.tsx`
- deleted `src/app/not-found.tsx`
- deleted `src/components/LearnEntryCard.tsx`
- deleted `src/lib/image-loader.ts`

Current evidence:

- `[...missing]` has been replaced by `[lang]/not-found.tsx` and Next not-found handling.
- Root `src/app/not-found.tsx` was previously removed because localized not-found exists.
- `image-loader.ts` is no longer referenced by code search.
- `LearnEntryCard.tsx` is no longer referenced by code search.

Recommended action:

- Keep these deletions only after `typecheck`, `lint`, and route smoke tests pass.

Suggested staging command after verification:

```bash
git add -A 'src/app/[lang]/[...missing]/page.tsx' src/app/not-found.tsx src/components/LearnEntryCard.tsx src/lib/image-loader.ts
```

## Ignored / Regenerable

Ignored or safely regenerable:

- `.next/`
- `tsconfig.tsbuildinfo`
- `reports/`
- `node_modules/`

Notes:

- `.next/` and `tsconfig.tsbuildinfo` were removed during cleanup.
- `node_modules/` is intentionally kept for local verification, even though it is the largest directory.
- `reports/` remains on disk but is ignored because scripts regenerate it.
