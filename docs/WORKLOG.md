# Archistory Worklog

This file is the handoff log for future Codex/chat windows. Read it before continuing product work.

## 2026-07-08 - Grouped Cleanup Completion

### Intent

- Finish the repository cleanup as reviewable, grouped local commits.
- Leave a concise record of what changed, what passed, what remains local, and what should happen next.
- Keep the process simple enough for future maintainers to follow without reading every historical report.

### Changes

- Completed seven local cleanup commits covering operating docs, graduation library work, archived material, data/API updates, visible product surfaces, route/image tests, and obsolete file removal.
- Removed generated verification caches after checks: `.next/`, `tsconfig.tsbuildinfo`, and `test-results/`.
- Added `docs/reports/CLEANUP_COMPLETION_2026-07-08.md` as the final cleanup record.
- Updated `DOCUMENT_INDEX.md` and `STATUS.md` so a new maintainer can find the cleanup result from the current entry docs.

### Validation

- Passed before this docs-only report commit: `npm run typecheck`.
- Passed before this docs-only report commit: `npm run lint`.
- Passed before this docs-only report commit: `npm run test:unit`.
- Passed before this docs-only report commit: `npm run test:e2e`.
- Passed for this docs-only report commit: `git diff --check`.
- Not rerun for this entry yet: full app test suite, because the pending change is documentation only.

### Remaining Risk

- Local commits have not been pushed.
- Supabase migrations were organized and committed, but not applied to or verified against production in this cleanup pass.
- Production deployment was not run after the local cleanup.

### Rollback Scope

- `docs/reports/CLEANUP_COMPLETION_2026-07-08.md`
- `DOCUMENT_INDEX.md`
- `STATUS.md`
- this `docs/WORKLOG.md` entry

### Next Step

- Commit this final docs-only cleanup record, verify the worktree is clean, then push/deploy only when explicitly requested.

## 2026-07-08 - Simple Project Operating Rules And File Map

### Intent

- Make the repository easier to maintain without adding heavy process.
- Create one short operating entry point for file placement, validation, logs, and done criteria.
- Replace stale structure notes with a short current file map.

### Changes

- Added `docs/PROJECT_OPERATING_SYSTEM.md` as the simple maintenance protocol.
- Linked it from `README.md`, `DOCUMENT_INDEX.md`, `STATUS.md`, and `docs/AI_AGENT_RULES.md`.
- Simplified `docs/AI_AGENT_RULES.md` so normal work does not require reading every specialist document or deploying by default.
- Registered graduation scripts in `SCRIPT_REGISTRY.md`.
- Rewrote `docs/FILE_STRUCTURE.md` as a short current map of app routes, code zones, content, scripts, docs, and cleanup notes.
- Simplified README script and data-governance sections so they point to durable registries instead of stale migration lists.

### Validation

- Passed: `docs/PROJECT_OPERATING_SYSTEM.md` is linked from `README.md`, `DOCUMENT_INDEX.md`, `STATUS.md`, `docs/AI_AGENT_RULES.md`, and the worktree grouping report.
- Passed: graduation scripts are registered in `SCRIPT_REGISTRY.md`.
- Passed: old AI rule text requiring default production deploy was not found.
- Passed: `docs/FILE_STRUCTURE.md` referenced paths exist.
- Passed: stale file-structure phrases and old README migration-list entries were not found in current entry docs.
- Passed: Group 1 staging command in `docs/reports/WORKTREE_GROUPING_2026-07-08.md` was checked with `git add --dry-run`.
- Not run: `npm run typecheck` / `npm run lint`, because this pass only changed docs and script registry text.

### Remaining Risk

- Older historical worklog entries still mention past image-optimization behavior; they are retained as history, not current guidance.

### Rollback Scope

- `docs/PROJECT_OPERATING_SYSTEM.md`
- `README.md`
- `DOCUMENT_INDEX.md`
- `STATUS.md`
- `SCRIPT_REGISTRY.md`
- `docs/AI_AGENT_RULES.md`
- `docs/FILE_STRUCTURE.md`
- `docs/reports/WORKTREE_GROUPING_2026-07-08.md`
- this `docs/WORKLOG.md` entry

### Next Step

- Treat Group 1 as ready for human review or staged commit, then continue to Group 2.

## 2026-07-06 - Graduation Interaction Target Polish

### Intent

- Stop adding new graduation features and make the current surface feel reasonable, effective, and consistent.
- Polish interaction clarity, focus feedback, action affordance, and tap/click target size across the graduation flow.
- Keep the work scoped to existing UI and data; no new content categories or large feature surfaces were added.

### Changes

- Added a global `focus-visible` outline for links, buttons, form controls, and disclosure summaries.
- Expanded interactive hit areas in the desktop nav, language switcher, footer, graduation tabs, active filters, detail filters, source links, and homepage tag chips.
- Made card action labels more visible with a subtle action surface, arrow, and hover/focus affordance.
- Made the list-page workflow strip more compact so results sit higher while the workflow remains understandable.
- Clarified the direction-builder summary by showing `関連事例` as `3件` instead of a bare number.
- Added `aria-current="page"` to graduation subnavigation active links.

### Audit Evidence

- Initial polish screenshots and audit JSON:
  - `/tmp/archistory-polish-audit-2026-07-06`
- Final local screenshots and audit JSON:
  - `/tmp/archistory-polish-after-2026-07-06/final4`
- Production screenshots and audit JSON:
  - `/tmp/archistory-polish-production-2026-07-06`
- Final sampled routes:
  - `/ja/graduation/issues?tag=地域食`
  - `/ja/graduation/random`
  - `/ja/graduation/sites/SITE-001`
  - mobile 390px on `/ja/graduation/random`

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run graduation:audit` with `Problems: 0`.
- Passed: `npm run build`.
- Static route generation: `4165/4165`.
- Final local Playwright QA:
  - sampled console warnings/errors: `0`
  - sampled horizontal overflow: `0`
  - sampled visible interactive targets below 36px by 36px: `0`
- Production deploy passed:
  - Vercel deployment id: `dpl_F11H6vR77UnbNbGxKh6wKe3zsrLq`
  - deployment URL: `https://architect-history-next-lkqpjfwta-yrqx-95s-projects.vercel.app`
  - aliased production URL: `https://archistory.app`
- Production Playwright QA passed:
  - sampled console warnings/errors: `0`
  - sampled horizontal overflow: `0`
  - sampled visible interactive targets below 36px by 36px: `0`
  - `/ja/graduation/random` shows `方向生成` and `3件`.
  - `/ja/graduation/issues?tag=地域食` shows issue actions.
  - `/ja/graduation/sites/SITE-001` shows candidate examples.

### Remaining Known Risk

- This was a pragmatic interaction and visual consistency pass, not a full formal WCAG audit.
- Full-page screenshots can show below-fold lazy images as empty placeholders before scroll-triggered loading; data audit still confirms all public case image metadata is present.
- The protected `vercel.app` deployment URL may require Vercel SSO; public QA should use `https://archistory.app`.

### Rollback Scope

- `src/app/globals.css`
- `src/app/[lang]/layout.tsx`
- `src/components/LanguageSwitcher.tsx`
- `src/components/GraduationInspirationApp.tsx`
- this `docs/WORKLOG.md` entry
- matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Do not add more UI until a real student uses the flow; the next useful check is observation, not another speculative polish pass.

## 2026-07-06 - Graduation Existing UX Validity Audit

### Intent

- Stop adding new features and verify that the current graduation UI/UX is reasonable, effective, and internally consistent.
- Audit the existing public flow, visible actions, image/source readiness, and relationship data.
- Fix only validity problems, not add new UX surface.

### Audit Evidence

- Saved audit screenshots and result JSON to `/tmp/archistory-existing-audit-2026-07-06`.
- Production flow checked:
  - `/ja/graduation`
  - `/ja/graduation/issues?tag=地域食`
  - filter removal back to `/ja/graduation/issues`
  - `/ja/graduation/sites`
  - `/ja/graduation/cases`
  - `/ja/graduation/random`
  - checklist action to `/ja/graduation/brief`
  - mobile 390px on `/ja/graduation/random`
- Production deployment checked:
  - deployment id: `dpl_2GCmu5zTbCk2EuPpPjhBNe3af3X5`
  - deployment URL: `https://architect-history-next-g0ecqkqst-yrqx-95s-projects.vercel.app`
  - aliased production URL: `https://archistory.app`

### Findings

- Public UI behavior was healthy:
  - `方向生成` naming is consistent.
  - filtered issue state is visible and removable.
  - 100 issue cards expose `課題を開く`.
  - 20 site cards expose `候補地を見る` and candidate examples.
  - 100 case records render detail links and 100 images.
  - direction builder exposes the generated bundle, the current bundle summary, and 4 next-action links.
  - checklist action reaches `/ja/graduation/brief`.
  - issue detail `ISSUE-041` now shows only public mapped site types, not draft site text.
  - sampled site detail pages show candidate-location source links.
  - sampled case detail pages show image source and license text.
  - mobile 390px has no horizontal overflow.
  - sampled production console warnings/errors: `0`.
- Data validity problem found and fixed:
  - Public issues still referenced draft site IDs `SITE-021` through `SITE-050`.
  - Because the public site archive currently exposes 20 site types, those references were remapped to the closest existing public site types instead of publishing more site records.
  - Stale relation-note entries for cases no longer referenced by each issue were removed.

### Validation

- Data audit before fix:
  - public issues: `100`
  - public sites: `20`
  - public cases: `100`
  - public-case image metadata problems: `0`
  - public placeholder case images: `0`
  - public site candidate-location problems: `0`
  - public issue missing/draft case references: `0`
  - broken public site references: found and fixed
- Passed after fix: `npm run graduation:audit` with `Problems: 0`.
- Passed after fix: `npm run typecheck`.
- Passed after fix: `npm run lint`.
- Passed after fix: `npm run build`.
- Static route generation: `4165/4165`.
- Production deploy passed:
  - Vercel deployment id: `dpl_2GCmu5zTbCk2EuPpPjhBNe3af3X5`
  - production deployment URL: `https://architect-history-next-g0ecqkqst-yrqx-95s-projects.vercel.app`
  - aliased production URL: `https://archistory.app`
- Production Playwright QA passed:
  - `/ja/graduation`: `方向生成` naming is active; old `ランダム` links are absent.
  - `/ja/graduation/issues?tag=地域食`: shows `表示 7 · 公開済み`, active filters, and 7 `課題を開く` actions.
  - Removing `地域食` returns to `/ja/graduation/issues` and shows `表示 100 · 公開済み` with 100 `課題を開く` actions.
  - `/ja/graduation/sites`: shows `表示 20 · 公開済み`, 20 candidate examples, and 20 `候補地を見る` actions.
  - `/ja/graduation/cases`: shows `表示 100 · 公開済み` and 100 images.
  - `/ja/graduation/random`: shows `生成された組み合わせ`, `現在の組み合わせ`, `次の動き`, 4 action links, and JSON/CSV export buttons.
  - `/ja/graduation/issues/ISSUE-041`: shows 2 public site links and 2 candidate examples; draft `港湾岸` site text is absent.
  - `/ja/graduation/sites/SITE-001`: shows 2 candidate source links.
  - `/ja/graduation/cases/CASE-027`: shows image source and license text.
  - Mobile 390px on `/ja/graduation/random`: no horizontal overflow.
  - Console warnings/errors during sampled production QA: `0`.

### Remaining Known Risk

- The 30 draft site types still exist in the source library and public data export, but the UI only exposes 20 published site types. This is acceptable for the current user-facing scope, but future API consumers should respect `status`.
- The audit was screenshot and DOM based; it does not prove full WCAG compliance.

### Rollback Scope

- `src/content/graduation/issues.json`
- regenerated `content/issues.csv`
- regenerated `public/data/graduation/issues.json`
- regenerated `public/data/graduation/issues.csv`
- this `docs/WORKLOG.md` entry
- matching `docs/USER_SIMULATION_LOG.md` entry
- regenerated `docs/GRADUATION_CONTENT_QA.md`

### Next Recommended Step

- Treat the current graduation surface as valid enough to stop adding UX for now; the next useful step is a real-user observation pass or accessibility audit, not another feature.

## 2026-07-06 - Graduation UI/UX Interaction Clarity Pass

### Intent

- Continue optimizing the graduation inspiration area after the user said the interaction still felt hard to understand.
- Use plugin/open-source-informed product design instead of only local visual tweaks.
- Make the pre-click homepage, archive pages, and direction-generation page feel like one workflow.

### External Patterns Consulted

- Algolia InstantSearch current refinements and clear refinements: keep active filters visible and individually removable.
- OpenStatus data-table-filters: use a faceted-filter mental model with an explicit current state.
- Command-palette/search references such as react-cmdk: treat "generate direction" as an action that builds a structured result, not as a vague random page.

### Changes

- Renamed the `ランダム` feature to `方向生成` in Japanese, `Direction Builder` in English, and `方向生成` in Chinese.
- Added a homepage workflow strip: `課題 -> 敷地 -> 事例 -> 方向生成`.
- Added a list-page workflow strip that explains the archive sequence: search first, refine, open and compare.
- Replaced passive filter text with an active filter bar:
  - shows query, main category, tag, site type, and building type when active
  - lets each active condition be removed directly
  - includes a clear-all action
  - shows a no-filter helper state instead of leaving the user guessing
- Reworked the direction-generation page:
  - top result now has a clear `生成された組み合わせ` section
  - breaks the generated direction into issue, site, and case parts
  - each part has a direct action link
  - keeps the problem draft and recommended sites below as supporting material
- Continued interaction clarity after the first deployment:
  - turned the `使い方` text into a clickable `次の動き` action panel
  - added an explicit proposal-checklist action linking to `課題資料`
  - added visible card-level action labels for issue, site, and case cards
  - kept the action labels low-contrast so the archive still reads calmly

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Static route generation: `4165/4165`.
- Local Playwright QA passed:
  - `/ja/graduation/issues?tag=地域食`: active filters are visible and removable.
  - Removing `地域食` returns to `/ja/graduation/issues` and shows `表示 100 · 公開済み`.
  - `/ja/graduation/random`: page title is `方向生成`, generated bundle exists, and issue/site/case action links are present.
  - Mobile 390px on `/ja/graduation/random`: no horizontal overflow.
  - Console warnings/errors during sampled QA: `0`.
- Browser plugin QA was attempted, but the plugin kernel timed out/reset; local Playwright was used as the stable fallback.
- Production deploy passed:
  - Vercel deployment id: `dpl_495b9Ko22xBAJLKBLZ5W5LSMjB1Q`
  - production deployment URL: `https://architect-history-next-jb7ulnrtn-yrqx-95s-projects.vercel.app`
  - aliased production URL: `https://archistory.app`
- Production Playwright QA passed:
  - `/ja/graduation`: homepage button and workflow step both use `方向生成`; old `方向を生成` copy count is `0`.
  - `/ja/graduation/issues?tag=地域食`: active filters are visible and removable.
  - Removing `地域食` returns to `/ja/graduation/issues` and shows `表示 100 · 公開済み`.
  - `/ja/graduation/random`: page title is `方向生成`, generated bundle exists, and issue/site/case action links are present.
  - Mobile 390px on `/ja/graduation/random`: no horizontal overflow.
  - Console warnings/errors during sampled production QA: `0`.
- Second production deploy passed:
  - Vercel deployment id: `dpl_CFoUpCN6eukFuazPuAxqxvYGdsmY`
  - production deployment URL: `https://architect-history-next-32q9j6lm3-yrqx-95s-projects.vercel.app`
  - aliased production URL: `https://archistory.app`
- Second production Playwright QA passed:
  - `/ja/graduation/random`: `次の動き` panel is visible with 4 action links.
  - clicking the checklist action reaches `/ja/graduation/brief`.
  - issue archive exposes 100 `課題を開く` card actions.
  - random page exposes `戦略を読む` and `候補地を見る` actions.
  - Mobile 390px on `/ja/graduation/random`: no horizontal overflow.
  - Console warnings/errors during sampled production QA: `0`.

### Remaining Known Risk

- The visual language is now more consistent, but a future pass could add a lightweight command-search entry if users still need faster intent-based navigation.
- Candidate site examples are curated static examples, not live real-estate or municipal availability data.

### Rollback Scope

- `src/components/GraduationInspirationApp.tsx`
- this `docs/WORKLOG.md` entry
- matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Watch a real user try one path from `/ja/graduation` to `/ja/graduation/random`; if hesitation remains, add a compact guided wizard or command-search entry.

## 2026-07-05 - Graduation Issue Filters Become Real Category Navigation

### Intent

- Fix the graduation issue archive filter system after the user pointed out that `All 100` and the visible tag buttons did not form a believable classification.
- Turn the visible filters from a small hand-picked tag strip into a real locating system for 100 issues.
- Keep old `?tag=` links working while adding a clearer main-category layer.

### Changes

- Replaced the issue quick tag strip with mutually exclusive main categories:
  - `高齢・ケア`: 8
  - `子ども・学習`: 22
  - `住まい・生活`: 7
  - `地域再生`: 15
  - `文化・アート`: 18
  - `防災・環境`: 12
  - `交通・都市`: 11
  - `医療・福祉`: 7
- Added deterministic category inference from issue titles, summaries, keywords, and recommended programs.
- Added `category=` URL filtering for main categories.
- Preserved `tag=`, `siteType=`, and `buildingType=` for detailed filters.
- Made detailed filters dynamic: after choosing a main category, tag/site/program options and counts are recomputed inside that current scope.
- Added a current-scope row so users can see the active category and detailed filters as a positioning path.
- Added a clear-details action for detailed filters.

### Validation

- Main category counts add up to 100:
  - `8 + 22 + 7 + 15 + 18 + 12 + 11 + 7 = 100`
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Static route generation: `4165/4165`.
- Local Playwright QA passed:
  - `/ja/graduation/issues`: `すべて 100`, main category counts sum to 100, no console errors.
  - Clicking `文化・アート` navigates to `?category=culture-art` and shows `表示 18 · 公開済み`.
  - Detailed filter options under `文化・アート` are scoped to that category.
  - Old link `/ja/graduation/issues?tag=多文化` still shows `表示 4 · 公開済み` with the tag selected.
  - Mobile 390px on `?category=culture-art`: no horizontal overflow, no console errors.
- Production deploy passed:
  - Vercel deployment id: `dpl_2neDgcjurwc6KYdxQ6kSnebvdrvq`
  - production deployment URL: `https://architect-history-next-7jda6kyxh-yrqx-95s-projects.vercel.app`
  - aliased production URL: `https://archistory.app`
- Production Playwright QA passed:
  - `/ja/graduation/issues`: `すべて 100`, main category counts sum to 100, no console errors.
  - Clicking `文化・アート` navigates to `?category=culture-art` and shows `表示 18 · 公開済み`.
  - Detailed filter options under `文化・アート` are scoped to that category.
  - Old link `/ja/graduation/issues?tag=多文化` still shows `表示 4 · 公開済み` with the tag selected.

### Remaining Known Risk

- Category inference is deterministic and transparent, but still rule-based; if a future issue has ambiguous wording, it may need keyword tuning or an explicit category field.
- Detailed filter option labels now show counts, but the visual design can still be polished during the planned global UI/UX unification pass.

### Rollback Scope

- `src/components/GraduationInspirationApp.tsx`
- this `docs/WORKLOG.md` entry
- matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Continue into the broader global UI/UX unification work using the homepage hover/line interaction as the reference.

## 2026-07-05 - Graduation Library Reaches 100 Issues and 100 Public Cases

### Intent

- Continue the graduation inspiration expansion after the previous 60/71 pass.
- Raise the public content target to 100 published issues and 100 published cases.
- Preserve the current quality bar: no public placeholder case images, no broken direct issue-to-case references, no visible Chinese residue in Japanese issue/case/site fields, and rollbackable data-only changes.

### Changes

- Published the remaining graduation issues from `ISSUE-061` through `ISSUE-100`.
- Added 29 new public case records from `CASE-111` through `CASE-139`.
- Increased visible public case count from 71 to 100.
- Kept total case records at 139, with 100 public and the remaining records still drafts.
- Rewired issue references for `ISSUE-061` through `ISSUE-100` so direct related cases point to public case records.
- Cleaned Japanese fields across issues, cases, and site types to remove visible Chinese residue introduced through related site cards.
- Regenerated `content/*.csv` and `public/data/graduation/*`.

### Validation

- Content QA passed:
  - published issues: `100`
  - published cases: `100`
  - total case records: `139`
  - Japanese residue hits across public issue/case/site fields: `0`
  - broken direct issue-to-case references: `0`
  - public placeholder case images: `0`
  - public cases missing image/source/license/credit metadata: `0`
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Static route generation: `4165/4165`.
- Local Browser QA passed:
  - `/ja/graduation/issues`: 100 issue links, no overflow, no residue
  - `/ja/graduation/cases`: 100 case links, 100 images, no overflow, no residue
  - `/ja/graduation/issues/ISSUE-092`: no residue after fixing related site type text
  - `/ja/graduation/issues/ISSUE-100`: 8 case links, no overflow, no residue
  - `/ja/graduation/cases/CASE-139`: one image, source-backed case detail, no overflow
  - `/ja/graduation/cases/CASE-121`: one image, source-backed case detail, no overflow
  - mobile 390px on `/ja/graduation/issues/ISSUE-100`: no horizontal overflow
  - interaction proof: clicked `/ja/graduation/cases/CASE-117` from `/ja/graduation/issues/ISSUE-100` and reached `Oslo Opera House`
  - console warnings/errors during sampled QA: `0`
- Production deploy passed:
  - Vercel deployment id: `dpl_7AXyfNxHnyxo7RLsdJ876sSyZ7Vc`
  - production deployment URL: `https://architect-history-next-c6kqqvds3-yrqx-95s-projects.vercel.app`
  - aliased production URL: `https://archistory.app`
- Production Browser QA passed:
  - `/ja/graduation/issues`: 100 issue links, no overflow, no checked Chinese residue
  - `/ja/graduation/cases`: 100 case links, 100 images, no overflow, no checked Chinese residue
  - `/ja/graduation/issues/ISSUE-092`: 8 images, 8 related case links, no overflow, no checked Chinese residue
  - `/ja/graduation/issues/ISSUE-100`: 8 images, 8 related case links, no overflow, no checked Chinese residue
  - `/ja/graduation/cases/CASE-139`: `The Shed`, one image, no overflow, no checked Chinese residue
  - `/ja/graduation/cases/CASE-121`: `Elbphilharmonie`, one image, no overflow, no checked Chinese residue
  - mobile 390px on `/ja/graduation/issues/ISSUE-100`: no horizontal overflow
  - interaction proof: clicked `/ja/graduation/cases/CASE-117` from `/ja/graduation/issues/ISSUE-100` and reached `Oslo Opera House`
  - console warnings/errors during sampled production QA: `0`

### Remaining Known Risk

- Some newly added image records use Wikimedia Commons redirect/file source links with `See image source` where exact license metadata was not fetched before Commons API rate limiting.
- English fields are still secondary and may contain older generated wording; Japanese user-facing fields were prioritized for this pass.
- Related case selection is now clickable and public, but final hand-ranking can still improve relevance per issue.

### Rollback Scope

- `src/content/graduation/issues.json`
- `src/content/graduation/cases.json`
- `src/content/graduation/site-types.json`
- regenerated `content/*.csv`
- regenerated `public/data/graduation/*`
- this `docs/WORKLOG.md` entry
- matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Hand-rank the related case sets for the late-numbered issues and replace `See image source` license placeholders with exact Wikimedia license metadata where useful.

## 2026-07-05 — Japanese Language Residue Cleanup Pass

### User Direction

- Fix the mixed-language problem the user noticed on the Japanese site.
- Prioritize the current task before starting the larger global UI/UX unification pass.
- Keep the work logged and rollbackable.

### Implemented

- Normalized Chinese country aliases inside `src/lib/fallback-content.ts`, so fallback nationality/location values such as `瑞士`, `美国`, and `德国` render as localized Japanese labels instead of leaking Chinese text.
- Replaced raw `building.city || building.country` display in relation cards with `formatDisplayLocation()`:
  - `src/app/[lang]/browse/era/[slug]/page.tsx`
  - `src/app/[lang]/browse/style/[slug]/page.tsx`
- Kept `/ja/graduation` redirected to `/zh/graduation/`, because the graduation content is currently Chinese-first and showing it inside the Japanese shell creates a worse mixed-language experience.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`; production build generated 4000 static pages. Existing warning remains: Edge runtime disables static generation for that one edge route.
- Local curl scan found no checked Chinese residue terms on:
  - `/ja`
  - `/ja/browse`
  - `/ja/browse/architects`
  - `/ja/architect/le-corbusier`
  - `/ja/browse/era/modern`
  - `/ja/browse/style/modernism`
  - `/ja/graduation`
- Browser QA on local `/ja` returned meaningful content, no console errors, and no checked Chinese residue terms.
- Deployed to production:
  - Production URL: `https://architect-history-next-cqjwp3dol-yrqx-95s-projects.vercel.app`
  - Alias: `https://archistory.app`
- Production curl scan confirmed no checked Chinese residue terms on the same Japanese route set.
- Production `/ja/graduation` returns `307` with `location: /zh/graduation/`.
- Production `/ja` renders localized country labels including `アメリカ`, `イギリス`, `スイス`, `デンマーク`, `ドイツ`, and `フランス`.

### Rollback Scope

- Revert the localization alias change in `src/lib/fallback-content.ts`.
- Revert the `formatDisplayLocation()` changes in:
  - `src/app/[lang]/browse/era/[slug]/page.tsx`
  - `src/app/[lang]/browse/style/[slug]/page.tsx`
- If production needs rollback instead of source rollback, use Vercel rollback to the deployment before `architect-history-next-cqjwp3dol-yrqx-95s-projects.vercel.app`.

### Remaining Risk

- This pass targets visible navigation, list, relation-card, and metadata residue. It does not guarantee that every long-form article body has a full Japanese translation.
- Some deep pages may still fall back to Chinese if their Japanese content fields are missing. That needs a full Japanese route crawl and missing-translation report.

### Next Recommended Step

Run a deeper all-Japanese-route scan for Chinese tokens, rank the remaining offenders by public visibility, then start the global UI unification pass using the homepage line-separated hover/image-zoom interaction as the reference style.

## 2026-07-05 — Full Japanese Route Language Scan + Metadata Guards

### User Direction

- Continue from the first language cleanup pass.
- Do not stop at the obvious homepage/graduation issue; scan broader Japanese pages and fix remaining high-confidence mixed-language leaks.

### Implemented

- Scanned all 1331 static Japanese routes from the local production build.
- Added language guards so Chinese-only `architect.core_ideas` do not render on Japanese or English architect pages.
- Expanded country/nationality localization aliases in `src/lib/fallback-content.ts`, including Netherlands, Belgium, Greece, Turkey, Egypt, Australia, and Korea.
- Added known education translations for:
  - Frank Lloyd Wright: `威斯康星大学麦迪逊分校（未毕业）`
  - Herzog & de Meuron: `苏黎世联邦理工学院（ETH）`
- Added `formatDisplayCity()` in `src/lib/display.ts` and localized `巴西利亚` as `ブラジリア`/`Brasilia`.
- Routed direct city displays through the display helper in:
  - `src/app/[lang]/building/[slug]/page.tsx`
  - `src/app/[lang]/browse/country/page.tsx`
  - `src/app/[lang]/timeline/page.tsx`
- Reused localized nationality display in `src/app/[lang]/browse/architects/page.tsx`.
- Expanded Simplified Chinese detection for uncovered building fields such as `覆盖穹顶`, `希腊十字`, `每个胶囊`, and `预制胶囊`.
- Wrote scan report: `docs/reports/ja-language-residue-scan-2026-07-05.md`.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`; production build generated 4000 static pages.
- Local production scan:
  - Routes scanned: 1331 Japanese static routes.
  - Fetch failures: 0.
  - High-confidence Chinese leaks from core ideas, metadata, city labels, education labels, and sampled building fields were removed.
  - Final remaining scanner hits are low-confidence/accepted Japanese terms: `英国`, `再利用`, and `与` in phrases like `影響を与えた`.
- Deployed to production:
  - Deployment: `dpl_37CcEKJ8g8P6929hzr1iGm61Mvaz`
  - Production URL: `https://architect-history-next-qhetb9b06-yrqx-95s-projects.vercel.app`
  - Alias: `https://archistory.app`
- Production curl checks passed on high-risk routes:
  - `/ja/architect/aravena`
  - `/ja/architect/balkrishna-doshi`
  - `/ja/architect/koolhaas`
  - `/ja/browse/architects`
  - `/ja/browse/country`
  - `/ja/building/nakagin-capsule-tower`
  - `/ja/building/pazzi-chapel`
  - `/ja/timeline`
- Browser QA passed for:
  - `/ja/browse/country`: localized labels present; no high-confidence Chinese residue; console errors/warnings: 0.
  - `/ja/building/nakagin-capsule-tower`: high-risk Chinese fields absent; console errors/warnings: 0.
- Browser interaction recheck hit a tool timeout while clicking the nav link after the page checks. Treat as tooling instability, not a site failure; curl and page-level browser checks had already passed.

### Rollback Scope

- Revert the changes in:
  - `src/app/[lang]/architect/[slug]/page.tsx`
  - `src/app/[lang]/browse/architects/page.tsx`
  - `src/app/[lang]/browse/country/page.tsx`
  - `src/app/[lang]/building/[slug]/page.tsx`
  - `src/app/[lang]/timeline/page.tsx`
  - `src/lib/display.ts`
  - `src/lib/fallback-content.ts`
  - `src/lib/locale.ts`
  - `docs/reports/ja-language-residue-scan-2026-07-05.md`
- The work is display-layer and localization-guard focused; it does not mutate source data.

### Remaining Risk

- The scanner is heuristic. Kanji overlap means some terms can be valid Japanese and cannot be blindly removed.
- Future content imports can reintroduce Chinese-only fields if they bypass localized fields.

### Next Recommended Step

Deploy this pass, browser-check the fixed Japanese pages, then begin the global UI/UX unification pass using the homepage line-separated hover style.

## 2026-07-03 — Curated Glossary Candidate Pool Archived

### User Direction

- Continue the learning-material cleanup one folder at a time.
- Start with `src/content/curated-glossary/`, which was classified as future material but not wired into public routes.

### Implemented

- Confirmed `src/content/curated-glossary/` had no active imports from routes, components, API handlers, tests, or scripts.
- Archived all 9 TypeScript candidate-pool files as text, so they no longer participate in TypeScript compile/lint while remaining recoverable:
  - `docs/archive/learning-materials/src/content/curated-glossary/code/*.ts.txt`
- Removed the now-empty `src/content/curated-glossary/` directory.
- Updated `docs/LEARNING_MATERIAL_INVENTORY.md` so curated glossary is no longer listed as active/future source material in `src/`.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit` with 2 files and 6 tests.
- Passed: `npm run build`; production build generated 3397 static pages and listed the expected dynamic API routes.
- After build validation, `.next/` and `test-results/` were deleted again.

### Rollback Scope

- Move files back from `docs/archive/learning-materials/src/content/curated-glossary/code/*.ts.txt` to `src/content/curated-glossary/*.ts` and remove `.txt` suffix if the candidate pool needs to become active source again.
- Revert `docs/LEARNING_MATERIAL_INVENTORY.md` and this worklog entry if the classification is rejected.

### Remaining Risk

- `core-100-terms.ts` still contains `origin: 'curated-glossary'` values. This is only provenance text, not an import.
- The archived candidate pool may later need conversion into a proper ingestion/review format before product use.

### Next Recommended Step

Review `src/content/core-learning-terms/core-100-terms.ts`: decide whether it should stay as future structured data in `src/`, be promoted into active glossary/code-topic flows, or be archived like curated glossary.

## 2026-07-03 — Learning Material Inventory + Source Tree Cleanup

### User Direction

- Continue cleanup after duplicate-logic housekeeping.
- Inventory learning/research material before deleting anything.
- Keep useful future material, but remove report clutter from the active source tree.

### Implemented

- Created `docs/LEARNING_MATERIAL_INVENTORY.md` with four buckets:
  - `active`
  - `future`
  - `archived`
  - `delete candidates`
- Moved report/planning markdown files out of `src/` and into `docs/archive/learning-materials/`, preserving their original source path under the archive:
  - `src/content/building-learning-map/building-learning-map-report.md`
  - `src/content/core-learning-terms/core-100-report.md`
  - `src/content/curated-glossary/*.md`
  - `src/content/knowledge-roadmap/knowledge-gap-action-plan.md`
  - `src/content/learning-product/learning-path-product-plan.md`
  - `src/lib/learning-audit/phase-2-learning-audit.md`
  - `src/lib/learning-graph/learning-graph-overview.md`
- Removed now-empty directories:
  - `src/content/knowledge-roadmap/`
  - `src/lib/learning-audit/`
- Updated `DOCUMENT_INDEX.md`.

### Classification Summary

- Active: public code topics, glossary, learning graph, learning paths, building learning overlay, architect knowledge relations, Knowledge OS API layer.
- Future: curated glossary candidates, core learning terms, learning source registry, learning product sections, exam concepts, learning reviews, search intelligence, diagram specs, building-code bridge.
- Archived: report/planning markdown moved to `docs/archive/learning-materials/`.
- Delete candidates: none yet.

### Validation

- Confirmed no `.md` files remain under `src/`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit` with 2 files and 6 tests.
- Passed: `npm run build`; production build generated 3397 static pages and listed the expected dynamic API routes.
- After build validation, `.next/` and `test-results/` were deleted again.

### Rollback Scope

- Move archived markdown files back from `docs/archive/learning-materials/` to their mirrored `src/` paths if source-tree colocation is wanted again.
- Restore empty directories if a future workflow expects them.
- Revert `docs/LEARNING_MATERIAL_INVENTORY.md`, `DOCUMENT_INDEX.md`, and this worklog entry if this classification is rejected.

### Remaining Risk

- The `future` TypeScript material is still not product-decided. Keeping it is safer than deleting it, but it still creates conceptual clutter.
- Some future material may eventually belong in a content pipeline outside `src/` rather than runtime source folders.

### Next Recommended Step

Decide the fate of `future` TypeScript material by one folder at a time: start with `src/content/curated-glossary/`, because it is clearly marked as isolated from current public routes and has enough structure to either promote, archive, or delete safely.

## 2026-07-03 — Duplicate Logic Housekeeping Pass

### User Direction

- Continue cleanup after file-level and code-level housekeeping.
- Focus on duplicate helper logic instead of visual redesign or new product surfaces.
- Keep changes rollbackable and verify the website still works.

### Implemented

- Added unit coverage for name-quality helpers in `tests/unit/quality.test.ts`.
- Verified the new quality test failed first because `hasProperName()` rejected a good Chinese fallback name when `name_en` was a Wikidata id or garbled.
- Refactored `src/lib/quality.ts` so `hasProperName()` and `hasValidName()` share one clean-name helper.
- Removed unused relation exports from `src/lib/data.ts`:
  - `getBuildingsByArchitect`
  - `getRelatedArchitects`
  - `getRelatedBuildings`
- Moved the still-used building relation query into `src/lib/relations.ts` as an internal helper.
- Updated current documentation:
  - `docs/TECH_DEBT.md`
  - `docs/FILE_STRUCTURE.md`

### Validation

- Red test observed: `npx vitest run tests/unit/quality.test.ts` failed on `hasProperName()` fallback behavior before implementation.
- Passed after fix: `npx vitest run tests/unit/quality.test.ts`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit` with 2 test files and 6 tests.
- Passed: `PLAYWRIGHT_PORT=3102 npx playwright test tests/e2e/core-routes.spec.ts` with 8 tests passing.
- After e2e/build validation, `.next/` and `test-results/` were deleted again so generated cache does not remain in the cleaned project tree.

### Rollback Scope

- Restore removed exports in `src/lib/data.ts` if a future integration needs those old data-layer relation helpers.
- Move `getRelatedBuildingsForBuilding()` back to `data.ts` if the project later chooses to keep all Supabase query helpers in one file.
- Revert `src/lib/quality.ts` and `tests/unit/quality.test.ts` if the fallback-name behavior is rejected.
- Revert the documentation updates if this cleanup interpretation is rejected.

### Remaining Risk

- Several learning/research content modules still look unused to `knip`, but they may represent future product material and should not be deleted without a product decision.
- `relations.ts` still contains direct Supabase relation queries; a future data-access abstraction could make it cleaner, but that is not required for current stability.

### Next Recommended Step

Do a product-material inventory pass for the learning/research content folders: classify each as `active`, `future`, `archive`, or `delete candidate` before deleting any learning material.

## 2026-07-03 — Code-Level Housekeeping Pass

### User Direction

- Continue the house-cleaning work after the first file-level cleanup.
- Focus on code clutter before future website construction.
- Keep the site working and keep deleted/archived material recoverable.

### Scan Method

- Ran `npx --yes knip --reporter json` as an open-source unused-file/export scanner.
- Treated the scanner output as hints only, then manually checked references with `rg`.
- Confirmed that Next config does not use `loaderFile`, and active image handling uses `SafeImage` -> `proxy-image.ts` -> `image-domains.ts`.

### Implemented

- Removed unused active source files:
  - `src/components/LearnEntryCard.tsx`
  - `src/lib/image-loader.ts`
- Archived one-off scripts out of the active `scripts/` workspace while preserving contents as text:
  - `scripts/review-type-slug-medium.ts` -> `docs/archive/scripts/one-off/review-type-slug-medium.ts.txt`
  - `scripts/build-type-slug-manual-review-queue.ts` -> `docs/archive/scripts/one-off/build-type-slug-manual-review-queue.ts.txt`
  - `scripts/build-type-slug-p0-review-pack.ts` -> `docs/archive/scripts/one-off/build-type-slug-p0-review-pack.ts.txt`
  - `scripts/scan-learning-pdf-signals.swift` -> `docs/archive/scripts/one-off/scan-learning-pdf-signals.swift.txt`
- Updated:
  - `SCRIPT_REGISTRY.md`
  - `DOCUMENT_INDEX.md`
  - `docs/TECH_DEBT.md`
  - `docs/FILE_STRUCTURE.md`
  - `docs/HANDOFF.md`
  - `docs/STATUS.md`

### Validation

- Passed: active reference check found no source/config/package references to removed files.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`; production build generated 3397 static pages and listed the expected dynamic API routes.
- After build validation, `.next/` was deleted again so generated cache does not remain in the cleaned project tree.

### Rollback Scope

- Restore `src/components/LearnEntryCard.tsx` and `src/lib/image-loader.ts` from git history if needed.
- Move archived scripts back from `docs/archive/scripts/one-off/*.txt` to `scripts/` and remove the `.txt` suffix if any one-off workflow needs to be re-run.
- Revert the documentation updates above if this organization is rejected.

### Remaining Risk

- `knip` still reports several unused learning/content modules, but many look like research or future product material rather than obvious trash.
- `src/lib/data.ts` and `src/lib/relations.ts` still have overlapping relation helpers; this needs a separate behavior-aware refactor.
- `quality.ts` still has potentially duplicated name-validation helpers.

### Next Recommended Step

Do a third pass focused only on duplicate helper logic: consolidate relation helpers and quality/name validation, with unit tests before deleting any behavior.

## 2026-07-03 — Repository Housekeeping Before Next Build Phase

### User Direction

- User asked for a house-cleaning pass: remove useless or unfinished clutter before continuing website construction.
- User does not want old experiments and random files left around while future work continues.
- Cleanup must not break the running website and must remain understandable / rollbackable.

### Cleanup Decisions

- Deleted generated and temporary local outputs:
  - `.next/`
  - `tmp/`
  - `test-results/`
  - `.DS_Store` files under the repo
- Archived old screenshot evidence instead of deleting it, because archived product audit documents still reference those images:
  - `benchmark-evidence/` -> `docs/archive/product-audits/evidence/benchmark/`
  - `p1-review-evidence/` -> `docs/archive/product-audits/evidence/p1-review/`
  - `p1a-sprint1-evidence/` -> `docs/archive/product-audits/evidence/p1a-sprint1/`
- Archived old project-planning documents:
  - `plans/` -> `docs/archive/plans/`
- Updated markdown links that referenced the moved evidence/plans.
- Updated `DOCUMENT_INDEX.md` so future agents understand the new archive locations.

### Intentionally Not Deleted

- Root current docs such as `STATUS.md`, `ROADMAP.md`, `PRODUCT_SURFACE.md`, `FEATURE_STATUS.md`, and `SCRIPT_REGISTRY.md`; `DOCUMENT_INDEX.md` marks these as current.
- `reports/`; project rules define this as the place for generated machine reports.
- `public/images/curated/`; these are used by the site as local image assets.
- `node_modules/`; large, but required for local development and validation.
- Source code, migrations, and content directories.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`; production build generated 3397 static pages and listed the existing dynamic API routes.
- After build validation, `.next/` was deleted again so generated cache does not remain in the cleaned project tree.
- Final root directory check no longer shows `.next/`, `tmp/`, `test-results/`, `plans/`, `benchmark-evidence/`, `p1-review-evidence/`, or `p1a-sprint1-evidence/`.

### Rollback Scope

- Regenerate `.next/`, `tmp/`, and `test-results/` by running dev/build/test commands again.
- Move evidence directories back from `docs/archive/product-audits/evidence/` if root-level evidence folders are wanted again.
- Move `docs/archive/plans/` back to `plans/` if old planning docs need root-level visibility again.
- Revert this worklog entry and `DOCUMENT_INDEX.md` changes if this organization is rejected.

### Next Recommended Step

After validation, do a second cleanup pass focused on code-level clutter: identify unused components, dead exports, duplicate helper logic, and obsolete scripts before touching the visual design again.

## 2026-07-03 — Learning OS P0 Claim / Source API Slice

### User Direction

- User provided an engineering execution brief: Archistory should become an architecture learning operating system, not only a browsing archive.
- Priority order from the brief: fact layer first, then graph layer, then grounding API, then learning paths, then recommendation reinforcement.
- Minimum preserved unit: `Claim + Source + Permalink + Last Verified + Confidence`.
- Standing rules still apply: use plugins/open-source/references before custom work when relevant, avoid invented aesthetics, keep changes rollbackable, and log decisions for future windows.

### Implemented

- Added a derived Knowledge OS layer in `src/lib/knowledge-os.ts`.
- Added stable source ids and claim ids derived from existing archive records.
- Added building evidence bundles with entity metadata, sources, claims, citations, related entities, and schema metadata.
- Added initial grounding resolver for natural-language building queries.
- Added API endpoints:
  - `GET /api/v1/buildings/[slug]`
  - `POST /api/v1/grounding/query`
  - `GET /api/v1/claims/[id]`
  - `GET /api/v1/sources/[id]`
- Added durable SQL migration target for future persisted claims/sources:
  - `db/migrations/v12-knowledge-os-claims-sources.sql`
- Added an execution handoff note:
  - `docs/LEARNING_OS_EXECUTION.md`
- Added e2e coverage for the Knowledge OS API slice in `tests/e2e/core-routes.spec.ts`.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/e2e/core-routes.spec.ts` with 8 tests passing.
- Passed: `npm run build`.
- Manual API check:
  - `/api/v1/buildings/villa-savoye?lang=zh` returned slug `villa-savoye`, 8 claims, 3 sources, and first predicate `completion_year`.
  - `/api/v1/grounding/query` with `Villa Savoye` returned `answerable: true`, `support_score: 0.78`, first entity `villa-savoye`, and 8 evidence claims.

### Rollback Scope

If this slice is rejected, revert only these files from this pass:

- `src/lib/knowledge-os.ts`
- `src/app/api/v1/buildings/[slug]/route.ts`
- `src/app/api/v1/grounding/query/route.ts`
- `src/app/api/v1/claims/[id]/route.ts`
- `src/app/api/v1/sources/[id]/route.ts`
- `db/migrations/v12-knowledge-os-claims-sources.sql`
- `docs/LEARNING_OS_EXECUTION.md`
- `tests/e2e/core-routes.spec.ts`
- This `docs/WORKLOG.md` entry

Do not run broad git reset/checkout commands because the worktree contains unrelated previous changes.

### Remaining Risk

- Claims are currently derived from existing archive data at request time, not persisted or human-reviewed.
- Grounding is lexical and deterministic; it is good enough for P0 evidence plumbing, not for semantic search quality.
- Related graph entities are still simple local references, not a graph database projection.
- API schemas are stable enough for local integration but should be versioned formally before external use.

### Next Recommended Step

Build a tiny internal claim-review workflow: select one building, display its derived claims and citations, then approve/reject/store reviewed claims into the new `sources`, `claims`, and `claim_sources` tables.

## 2026-06-30 — Product Direction Reset + Project Page

### User Rejection / Correction

- User rejected the visual direction after seeing the desktop/mobile screenshots: "太丑了而且不知道要干嘛".
- Diagnosis: the page was a static explanation surface, not a product-quality interface with an obvious user job. It felt unclear and visually weak.
- New standing rule from user: for complex tasks, if there is an available plugin or open-source project, prioritize plugins and open-source projects instead of hand-rolling from scratch.
- New visual rule from user: do not invent aesthetic direction. For anything involving beauty, visual quality, interface style, brand feeling, "cool", or "高级", first reference real market examples such as major websites, brand official sites, mature products, open-source projects, or established design systems.
- Before future visual implementation, document the reference set, what is being borrowed, and what is intentionally not being copied.
- Future Archistory product/design work should first check available design/product plugins and relevant open-source references before coding.
- If the target is still vague, ask focused questions until there is roughly 90% confidence before implementation.
- All implementation passes must stay rollbackable.
- Action taken after rejection: reverted the `/project` page, its nav entries, its i18n label, and its dedicated e2e test. Kept this worklog so future chats understand the failed direction.
- Validation after rollback: `npm run lint` passed, `.next` was cleared because stale generated route types still referenced `/project`, `npm run typecheck` passed, and `npx playwright test tests/e2e/core-routes.spec.ts` passed with 7 tests.
- Available plugin direction discovered for next pass: Figma tools are available for editable design/capture workflows, and Canva tools are available for visual design candidates. Next pass should use plugin/design reference work before code.

### User Direction

- User gave Codex broad decision authority for Archistory construction and wants results over constant micro-decisions.
- Current product goal is closest to: personal brand / portfolio / application material.
- Product identity should converge on: architecture learning navigator, not only a database.
- Taste constraints: avoid generic AI-product feeling, avoid overly decorative visuals, keep it cool, restrained, and controlled.
- Reporting preference for this project: medium-length progress reports.
- User explicitly requested durable logging so another chat window can continue with the same context.
- User explicitly requires all changes to remain rollbackable, because they may reject a direction and ask for a restart.

### Decisions Made

- Add a visible `Project` surface to explain Archistory as a student-built architecture learning navigator.
- Use the page to re-anchor the site narrative before adding more features.
- Keep copy concrete and first-person-adjacent without over-marketing.
- Keep the visual language quiet: large typography, borders, sparse metadata, no decorative gradient/orb treatment.

### Implemented

- Added `/[lang]/project` route with zh/en/ja localized copy.
- Added `project` label to shared i18n.
- Added desktop nav, mobile nav, and footer links to the project page.
- Added Playwright smoke coverage for `/zh/project`.

### Files Changed In This Pass

- `src/app/[lang]/project/page.tsx`
- `src/app/[lang]/layout.tsx`
- `src/components/MobileNav.tsx`
- `src/lib/i18n.ts`
- `tests/e2e/core-routes.spec.ts`
- `docs/WORKLOG.md`

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts` with 8 tests passing.
- Visual QA completed for `/zh/project` at desktop 1440px and mobile 390px.
- Fixed after visual QA: primary CTA had low contrast because it used non-existing `bg-primary` / `bg-primary-hover` utilities; changed it to the project's existing semantic color pattern.

### Rollback Scope

If this direction is rejected, only revert the following changes from this pass:

- Delete `src/app/[lang]/project/page.tsx`.
- Remove the `project` key from `src/lib/i18n.ts`.
- Remove the `/project` desktop nav and footer links from `src/app/[lang]/layout.tsx`.
- Remove the `/project` item from `src/components/MobileNav.tsx`.
- Remove the Playwright test named `project page explains the current product direction` from `tests/e2e/core-routes.spec.ts`.
- Keep or archive this `docs/WORKLOG.md` entry unless the user explicitly wants the log removed.

Do not use broad git reset/checkout commands in this repository without checking unrelated user or agent changes first.

### Known Context

- Worktree already contains many pre-existing modified and untracked files. Do not revert unrelated changes.
- Existing e2e image-proxy test may log 502 warnings for trusted remote image domains; this is tolerated by the test and is not caused by the project page.
- Playwright Chromium was reinstalled after earlier disk cleanup removed the browser cache.

## 2026-06-30 — Reference-First Restart

### New Operating Rules Confirmed

- Do not invent visual direction from taste alone.
- For any visual/product/design work, use real references first: major websites, brand official sites, mature products, open-source projects, or design systems.
- Prefer plugins, connectors, skills, and open-source projects before hand-rolling.
- If the design/product target is below roughly 90% confidence, ask focused questions before implementing.
- Keep every pass rollbackable and log the scope.

### Plugin / Tooling Check

- Product Design plugin is applicable for UI/product direction work.
- Product Design saved user context was checked; no saved context file currently exists.
- Figma tools are available for editable design and web capture when a Figma file/target exists.
- Canva tools are available for generated design candidates, but should be used after the reference-backed brief is locked.
- No visual implementation should happen before the brief is confirmed and a visual target/reference direction is selected.

### Reference Set

- Google Arts & Culture / museum-style exploration: useful for image-led cultural discovery, but do not copy its entertainment-heavy browsing tone.
- MoMA Collection: useful for large archive filtering, object types, date filters, terms, and "collection + learning + magazine" structure. Do not copy commerce/membership/store surfaces.
- Are.na: useful for connected knowledge, collecting, paths, and personal research language. Do not copy its casual creator-community voice too strongly.
- Harvard GSD: useful for academic architecture authority, dense information architecture, programs/research/public discourse structure. Do not copy admissions/university bureaucracy.
- MIT Architecture: useful for architecture-school visual energy, studio/research/thesis feeds, and project-first browsing. Do not copy its raw institutional homepage wholesale.
- Vercel Geist: useful for disciplined components, grid, high-contrast system colors, search input, tabs, tables, and restrained product UI grammar. Do not make Archistory feel like a developer SaaS product.
- LearnHouse: useful as an open-source learning-platform reference for courses, collections, assignments, editor, discussions, and analytics; do not copy its full LMS scope.
- Once UI: useful as an open-source component/design-system starter for disciplined Next.js surfaces; do not wholesale migrate the existing design system.
- Openverse frontend: useful as an open-source search/archive reference for licensed media discovery; do not copy its broad media-search product model.

### Current Product Diagnosis

- The failed `/project` page was rejected because it explained the project but did not create an obvious user task.
- Next pass should not be another "about/project" page.
- The stronger move is to improve an existing primary surface where users actually do something.
- Best candidate: `/[lang]/learn`, because Archistory's current direction is "architecture learning navigator" and the learning page can become a real task hub instead of a static explanation.

### Proposed Next Design Brief

- Screen: `/[lang]/learn`.
- Job: help a visitor choose one learning route quickly: building case, concept/glossary, code topic, or archive exploration.
- Reference blend:
  - MoMA for archive/search/filter clarity.
  - Are.na for connected-knowledge pathways.
  - Harvard GSD / MIT Architecture for architecture-school credibility.
  - Geist / Once UI for restrained interface system and component discipline.
  - LearnHouse only for learning-platform structure, not full LMS scope.
- Interactivity level: production-level navigation links and selected/hover states; no fake controls.
- Implementation status: not started. Needs brief approval or a selected visual option first.

### Rollback / Safety

- No code changes were made in this restart pass.
- Only `docs/WORKLOG.md` was updated.
- The rejected `/project` implementation remains reverted.

## 2026-06-30 — `/learn` Visual Direction Candidates

### Brief Confirmed

- User confirmed the next target: redesign `/[lang]/learn` as the primary architecture learning navigator.
- No implementation is allowed until a visual direction is selected.

### References Actually Inspected

- Current `/zh/learn` screenshot captured locally.
- Are.na homepage captured.
- Harvard GSD homepage captured.
- MIT Architecture homepage captured.
- Vercel Geist design system captured.
- Once UI homepage captured.
- MoMA Collection attempted but was blocked by a verification / "Just a moment..." page, so it was not used as visual evidence.

### Generated Candidate Directions

- Option 1 — Museum Index: archive/search/table rhythm; draws from museum collection clarity and Geist-style product discipline.
- Option 2 — Studio Desk: image-led architecture-school workspace; draws from Harvard GSD and MIT Architecture.
- Option 3 — Knowledge Network: route-based knowledge graph and learning queue; draws from Are.na and Geist, with restrained MIT-like grayscale energy.

### Safety

- Generated images are preview-only and were not copied into the project.
- No production code changed in this pass.
- Local dev server was used only for screenshot capture.

### User Feedback On Candidates

- User prefers Option 2 because it has images, hierarchy, clear strong/weak emphasis, and primary/secondary structure.
- User explicitly warned not to stack too much text onto the page.
- Direction refined to: image-led architecture studio desk, one clear primary building-learning sample, compact secondary choices, compact route strip, minimal explanatory copy.

### Revised Candidate

- Generated Studio Desk v2.
- Changes requested in prompt: fewer paragraphs, stronger image anchor, one obvious primary action, three subordinate entries (`概念`, `法规`, `档案`), compact route strip (`看建筑 -> 抓概念 -> 查术语 -> 继续案例`), small/square geometry, restrained architecture-school accent.
- Still preview-only; no production code changed.

### Apple-Like Feedback

- User clarified that the page should not dump lots of text because that makes the next action unclear.
- User likes Apple-style product pages because they rely on product imagery, concise details, and a clear action button instead of many decisions or long copy.
- Apple official pages were captured and inspected as real references.
- Borrowed principles: one dominant visual object, ultra-short headline, one primary CTA, one secondary link, visual tiles for choices, and image-led explanation.
- Explicitly not copying: Apple branding, commercial purchase language, blue buy buttons, black consumer-electronics styling, or exact Apple layouts.
- Generated revised candidate: Apple-like Product Focus for `/learn`, using Villa Savoye as the dominant learning object, with concise CTA and visual route strip.
- Still preview-only; no production code changed.

### No-Card-Soup Correction

- User rejected the direction of replacing text with many nested boxes/cards. Apple does not rely on lots of framed cards.
- New visual constraint for `/learn`: avoid card soup, nested frames, heavy borders, and repeated boxed modules.
- Use large image-led sections, open whitespace, thin dividers, product-line style visual choices, and an unboxed route band.
- Generated revised candidate: Apple-like Product Focus v4, no card soup.
- This v4 direction is currently the strongest candidate: big architectural visual, short copy, one primary CTA, four lightweight visual entries, and an open route strip.
- Still preview-only; no production code changed.

## 2026-07-01 — Pivot To Archive Room

### User Direction

- User changed the product direction: "就做资料馆吧".
- Stop emphasizing learning paths, study plans, and route planning.
- Put the material in place and let viewers look by themselves.
- The right product metaphor is now "资料馆 / archive room", not "learning navigator".
- Reporting rule added after this pass: every progress report to the user should end with a concrete recommended next step.

### References And Constraints

- Keep the prior hard rules: real references first, no invented aesthetics, no card soup, no heavy nested frames.
- Apple remains a structure reference for directness: large visual, little copy, obvious action.
- Museum/archive references remain the product reference: objects, index, rooms, shelves, quiet browsing.
- Do not copy Apple branding or shopping/product language.

### Implemented First Pass

- Reworked `/[lang]/learn` into an archive-room front hall.
- Renamed shared nav label from `学习 / Learn / 学習` to `资料馆 / Archive Room / 資料館`.
- Updated mobile menu copy to match archive-room positioning.
- Removed learning-path-driven page structure from `/learn`; learning data remains in the repo and is not deleted.
- Page now shows:
  - One large featured architectural object.
  - Two primary actions: buildings and architects.
  - A visual collection row.
  - Open room links for buildings, architects, time, terms, code, archive.
  - A simple shelf index for eras, styles, and types.
- Updated e2e expectation for `/zh/learn` from learning cases to archive-room entry.
- Visual QA fix: removed excessive mobile hero blank space by making full-height hero behavior desktop-only.
- Visual QA fix: corrected escaped index arrows from `-&gt;` to readable arrows.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts` with 7 tests passing.
- Visual QA completed for `/zh/learn` at desktop 1440px and mobile 390px.
- Known existing warning: core e2e may log existing image-proxy / `NoFallbackError` messages on remote images, but tests pass and this pass did not modify the proxy.

### Rollback Scope

If rejected, revert only:

- `src/app/[lang]/learn/page.tsx`
- `src/lib/i18n.ts`
- `src/components/MobileNav.tsx`
- `tests/e2e/core-routes.spec.ts`
- this `docs/WORKLOG.md` entry

## 2026-07-01 — Front-Door Cleanup After Archive Pivot

### Scope

- User asked to clean previous mistakes and unused clutter without breaking the site.
- Cleanup was intentionally limited to front-facing labels, entry points, and unused homepage copy fields.
- No database changes, no content data deletion, and no route deletion.
- `/[lang]/paths` remains available for rollback/backward compatibility, but is no longer promoted from the main archive index.

### Implemented

- Replaced homepage section title from learning/exploration language to archive-entry language.
- Reworded the homepage archive card as `建筑资料馆 / Architecture Archive Room / 建築資料館`.
- Removed unused homepage copy fields for old learning-center, topic, exam, and guide placeholders.
- Removed the `/paths` learning-route card from `/[lang]/browse` and changed the grid from five entries to four archive entries.
- Removed the disabled `考试准备 / Coming Soon` item from the mobile menu.
- Reworded `/[lang]/paths` and `/[lang]/paths/[slug]` from "learning path" to optional "archive route" language, preserving the URLs.
- Updated the shared `paths` i18n label to `档案路线 / Archive Routes / 資料ルート`.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts` with 7 tests passing.
- Visual QA screenshots captured:
  - `/tmp/archistory-cleanup-home-desktop.png`
  - `/tmp/archistory-cleanup-home-mobile.png`
  - `/tmp/archistory-cleanup-learn-desktop.png`
  - `/tmp/archistory-cleanup-learn-mobile.png`
  - `/tmp/archistory-cleanup-browse-desktop.png`
  - `/tmp/archistory-cleanup-browse-mobile.png`
  - `/tmp/archistory-cleanup-home-entry-desktop-settled.png`
  - `/tmp/archistory-cleanup-mobile-menu.png`
- Confirmed by screenshot: homepage archive entry is visible and mobile menu no longer shows exam preparation.
- Known existing warning remains: Playwright/web server may log image-proxy / `NoFallbackError` noise for remote images, but the route tests pass.

### Remaining Known Residue

- Internal planning docs under `src/lib/learning-*` still mention learning paths and exam preparation.
- Building-code article pages still contain exam/reference wording where it belongs to the code-content layer.
- These were left untouched to avoid damaging non-front-door functionality.

### Rollback Scope

If rejected, revert only:

- `src/app/[lang]/home-copy.ts`
- `src/app/[lang]/page.tsx`
- `src/app/[lang]/browse/page.tsx`
- `src/app/[lang]/paths/page.tsx`
- `src/app/[lang]/paths/[slug]/page.tsx`
- `src/lib/i18n.ts`
- `src/components/MobileNav.tsx`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Run a second cleanup pass on visual density: reduce homepage/browse card feeling without deleting useful entry points.

## 2026-07-01 — Visual Density Cleanup Pass

### Scope

- Continued from the archive-room pivot.
- Goal: reduce the "many cards / boxed modules" feeling without removing useful archive entry points.
- Limited to homepage and browse/archive surfaces.
- No data deletion, no route deletion, no database changes.

### Reference Principle Used

- Keep prior reference direction: Apple-like direct hierarchy and archive/museum-like object rows.
- Borrowed behavior: open whitespace, image-led entries, thin dividers, fewer framed boxes.
- Avoided: nested cards, heavy borders, shadowed modules, and adding new decorative visuals.

### Implemented

- Homepage `/[lang]`:
  - Changed the two main archive entry cards into an open two-column exhibit row.
  - Removed card backgrounds and shadows from the archive/index entry area.
  - Changed homepage architect items from boxed cards into bordered rows.
- Browse `/[lang]/browse`:
  - Changed top archive stats from four cards into linear index entries.
  - Changed featured architect cards into open image records.
  - Changed "Open complete works index" from a card into a bordered row.
  - Changed "Other ways in" groups from boxed cards into open section lists.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- `npx playwright test tests/e2e/core-routes.spec.ts` timed out only when Playwright tried to run its configured `npm run build && npm run start` inside the 180s webServer timeout.
- Root cause: production build alone took longer than the Playwright webServer timeout; the build itself passed.
- Passed after using the completed production build:
  - `npm run start -- --hostname 127.0.0.1 --port 3101`
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 7 tests passed.
- Visual QA screenshots captured:
  - `/tmp/archistory-density-home-entry-desktop.png`
  - `/tmp/archistory-density-home-entry-mobile.png`
  - `/tmp/archistory-density-browse-desktop.png`
  - `/tmp/archistory-density-browse-mobile.png`

### Remaining Known Risk

- Existing image-proxy warnings and occasional remote image failures still appear during server/test logs.
- This pass did not address image fallback quality or LCP warnings.
- Browse mobile is now cleaner but still visually long because the stats are intentionally stacked as index rows.

### Rollback Scope

If rejected, revert only:

- `src/app/[lang]/page.tsx`
- `src/app/[lang]/browse/page.tsx`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Fix image reliability and fallback quality for archive/browse pages, because remote image failures now stand out more after removing card chrome.

## 2026-07-02 — Image Proxy Reliability And 404 Dev Fix

### Scope

- Continued from the visual density pass.
- Goal: stop remote image failures from surfacing as broken image optimizer errors and keep archive pages stable.
- Also fixed a dev-mode 404 failure uncovered during e2e.

### Implemented

- Updated `/api/image-proxy`:
  - Invalid `url` now returns `400` instead of throwing during `new URL`.
  - Untrusted domains still return `403`.
  - Trusted-domain upstream failures now return a valid tiny PNG fallback with `X-Archistory-Image-Fallback`.
  - Trusted-domain non-image responses now return the same valid PNG fallback instead of passing HTML/JSON to Next/Image.
- Updated e2e image-proxy expectation:
  - invalid URL -> `400`
  - untrusted domain -> `403`
  - trusted image URL -> `200` with `image/*` content type
- Added optional `priority` support to `ArchitectPortraitThumb`.
- Marked the first row of `/[lang]/browse` featured architect images as priority images to remove the browse-page LCP warning.
- Deleted root `src/app/not-found.tsx`.
  - Reason: the project already has `src/app/[lang]/not-found.tsx`.
  - The root-level not-found had no root layout and caused dev-mode 500s after a missing localized page was requested.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed with dev server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 7 tests passed.
- Manual proxy check:
  - bad trusted Wikimedia URL returned `200 image/png`
  - `X-Archistory-Image-Fallback: upstream-404`
- Visual/console QA:
  - `/zh/browse` screenshot saved to `/tmp/archistory-image-fallback-browse-priority.png`
  - Final Playwright console check for `/zh/browse` returned no warnings or errors.

### Remaining Known Risk

- Building detail pages can still emit LCP hints for local above-the-fold building images.
- This pass only fixed the browse-page LCP warning and proxy invalid-image noise.
- The image fallback is intentionally neutral; it prevents broken rendering but does not replace missing source curation.

### Rollback Scope

If rejected, revert only:

- `src/app/api/image-proxy/route.ts`
- `src/components/ArchitectPortraitThumb.tsx`
- `src/app/[lang]/browse/page.tsx`
- `tests/e2e/core-routes.spec.ts`
- deletion of `src/app/not-found.tsx`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Fix LCP hints on building detail pages by marking the primary local building image eager/priority where it is above the fold.

## 2026-07-02 — Building Detail LCP Priority Pass

### Scope

- Follow-up from image reliability work.
- Goal: remove the remaining LCP hint on building detail pages without changing gallery behavior.

### Implemented

- Added `priority` propagation through:
  - `ImageGallery`
  - `GalleryMainImage`
  - `SafeImage`
- The active initial gallery image now gets `priority` on building detail pages.
- Thumbnail strip and lightbox behavior were not changed.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed with dev server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 7 tests passed.
- Passed: `npm run build`.
- Visual/console QA:
  - `/zh/building/villa-savoye` screenshot saved to `/tmp/archistory-building-lcp-villa-savoye.png`
  - Playwright console check returned no warnings or errors for that page.

### Rollback Scope

If rejected, revert only:

- `src/components/ImageGallery.tsx`
- `src/components/image-gallery/GalleryMainImage.tsx`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Inspect remaining high-card-density areas on building detail pages: study bridge, technical notes, related entry cards, and continue-exploring modules.

## 2026-07-02 — Building Detail Study Module Density Pass

### Scope

- Continued the no-card-soup cleanup on building detail pages.
- Focused only on study-oriented modules that were visibly boxed.
- No content deletion and no route changes.

### Implemented

- Reworked `BuildingStudyMap` entries from shadowed cards into open bordered index rows.
- Reworked `BuildingLearningBridge`:
  - Core concepts container changed from a card to an open top-bordered block.
  - Study-question cards changed into open bordered items.
- Kept all existing links, labels, learning concepts, glossary links, and code-topic links.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed with dev server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 7 tests passed.
- Passed: `npm run build`.
- Visual QA screenshots:
  - `/tmp/archistory-building-density-mid-clean.png`
  - `/tmp/archistory-building-density-study-clean.png`

### Rollback Scope

If rejected, revert only:

- `src/app/[lang]/building/[slug]/page.tsx`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue the same treatment on building detail supporting modules: historical context card, technical notes table, and related/continue exploring cards.

## 2026-07-02 — Building Detail Supporting Modules Density Pass

### Scope

- Continued building detail no-card-soup cleanup.
- Focused on supporting modules that still looked like boxed cards.

### Implemented

- Reworked historical context block from a shadowed card into an open bordered context band.
- Reworked technical notes from a rounded boxed table into a plain bordered table.
- Reworked `BuildingKnowledgeNetwork` route cards into open bordered index rows.
- Reworked `ContinueExploring` item cards into open bordered rows.
- Kept all links, metadata, related-building content, and source links.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed with dev server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 7 tests passed.
- Passed: `npm run build`.
- Visual QA screenshots:
  - `/tmp/archistory-building-context-open.png`
  - `/tmp/archistory-building-technical-open.png`
  - `/tmp/archistory-building-continue-open.png`

### Remaining Known Risk

- Architect detail pages still emit an LCP hint for the above-the-fold architect portrait.

### Rollback Scope

If rejected, revert only:

- `src/app/[lang]/building/[slug]/page.tsx`
- `src/components/ContinueExploring.tsx`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Fix architect detail LCP by marking the primary architect portrait image priority/eager.

## 2026-07-02 — User Simulation Ritual + Archive Entry Cleanup

### Scope

- Added a durable user-simulation workflow and ran the first visitor-role audit.
- Focused on whether the site feels like an archive room from the user side, not only whether routes compile.
- Made only low-risk information-architecture and copy fixes discovered by the simulation.

### Implemented

- Added `docs/USER_SIMULATION_LOG.md` with a repeatable protocol.
- Ran Simulation 01 as a first-time architecture student/casual viewer on desktop and mobile.
- Repointed the visible `资料馆` entry to `/browse` instead of the old `/learn` route.
- Renamed the secondary desktop archive dropdown label to `索引`.
- Repointed the home `进入资料馆` card to `/browse/buildings`.
- Simplified mobile primary navigation around archive browsing.
- Reframed building detail copy from learning/course wording to archive reading wording:
  - `学习桥` -> `阅读线索`
  - `从这座建筑学习` -> `继续阅读这座建筑`
- Updated `Code` and `Glossary` back links from `Learn` wording to archive wording.
- Updated the e2e assertion for the new building-detail heading.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed with dev server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 7 tests passed.
- Browser user-simulation checks:
  - Desktop `/zh` -> `/zh/browse` -> `/zh/building/villa-savoye`.
  - Mobile `/zh`, `/zh/browse`, `/zh/building/villa-savoye`.
  - No relevant browser console warnings or errors.
- Screenshot evidence:
  - `/tmp/archistory-user-sim-01-home-after-entry-fix.png`
  - `/tmp/archistory-user-sim-01-villa-after-reading-cues.png`

### Remaining Known Risk

- The old `/learn` route still exists for compatibility and tests, but it is no longer a primary visible entry.
- Mobile home showed a small measured horizontal overflow around the hero container; it did not visibly break the layout, but it should be watched in a future mobile polish pass.
- Architect detail pages still have the known primary portrait LCP priority issue.

### Rollback Scope

If rejected, revert only:

- `docs/USER_SIMULATION_LOG.md`
- `src/lib/i18n.ts`
- `src/app/[lang]/layout.tsx`
- `src/components/MobileNav.tsx`
- `src/app/[lang]/page.tsx`
- `src/app/[lang]/building/[slug]/page.tsx`
- `src/app/[lang]/glossary/page.tsx`
- `src/app/[lang]/code/page.tsx`
- `tests/e2e/core-routes.spec.ts`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Run Simulation 02 from mobile search: user searches `勒·柯布西耶`, opens the architect detail, and tries to jump from person to works. Then fix the architect portrait LCP issue if the flow remains healthy.

## 2026-07-02 — Mobile Search Simulation + Architect Portrait Priority

### Scope

- Ran the next user-role simulation from mobile search into an architect detail page.
- Fixed the known architect portrait LCP warning without changing visual layout.

### Implemented

- Simulated a mobile visitor searching `勒·柯布西耶`.
- Verified the search result order: architect first, then related buildings.
- Verified the architect detail first screen includes identity, portrait, summary, and onward work links.
- Added optional `priority` support to `ArchitectPortraitFigure`.
- Marked the above-the-fold architect portrait priority on mobile and desktop placements.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed with dev server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 7 tests passed.
- Browser check on `/zh/architect/le-corbusier`:
  - No relevant console warnings or errors.
  - Previous architect portrait LCP priority warning did not reappear.
- Screenshot evidence:
  - `/tmp/archistory-user-sim-02-mobile-search-le-corbusier.png`
  - `/tmp/archistory-user-sim-02-mobile-le-corbusier.png`
  - `/tmp/archistory-architect-priority-check.png`

### Remaining Known Risk

- Architect detail mobile flow is readable, but a visitor looking only for works may need a faster first-screen jump to `代表作`.
- Minor measured horizontal overflow remains around some mobile architect sections, though it was not visibly broken in the screenshot.

### Rollback Scope

If rejected, revert only:

- `src/components/ArchitectPortraitFigure.tsx`
- `src/app/[lang]/architect/[slug]/page.tsx`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Compare architect/profile archive references before adding a small mobile jump link or compact works anchor; do not invent the placement from taste alone.

## 2026-07-03 — Graduation Inspiration Integrated As Archistory Submenu

### Scope

- Changed direction from a standalone V1 site to an Archistory submenu.
- Integrated the graduation design inspiration library as `/[lang]/graduation/[[...slug]]`.
- Kept the earlier standalone build as reference/rollback material outside this repo.

### Implemented

- Added graduation content JSON under `src/content/graduation/`.
- Added a local data access layer in `src/lib/graduation.ts`.
- Added `GraduationInspirationApp` for home, issue/site/case lists, details, random inspiration, and brief view.
- Added route `/zh/graduation`, plus `/issues`, `/sites`, `/cases`, `/random`, `/brief`, and detail paths.
- Added desktop navigation, mobile drawer, and footer entry through `毕设灵感`.
- Added core e2e coverage for the new submenu route and issue/random flows.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed with build-backed Playwright server:
  - `PLAYWRIGHT_PORT=3104 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 9 tests passed.
- Browser QA on `http://127.0.0.1:3105`:
  - `/zh/graduation` rendered the intended first screen.
  - `/zh/graduation/issues/ISSUE-001` rendered title, sources, building types, and related site types.
  - `/zh/graduation/random` kept a valid bundle after `再来一次`.
  - Mobile menu showed `毕设灵感` under `资料工具`.
  - No relevant browser console warnings or errors.
- Screenshot evidence:
  - `/tmp/archistory-graduation-home-browser.png`
  - `/tmp/archistory-graduation-issue-browser.png`
  - `/tmp/archistory-graduation-random-browser.png`
  - `/tmp/archistory-graduation-mobile-menu-browser.png`

### Remaining Known Risk

- Current case visuals use a local neutral placeholder rather than real project imagery.
- Source URLs are enough for seed data, but not yet a rigorous official-source pass.
- Graduation content is Chinese-first; English/Japanese UI exists, but content itself is not fully localized.

### Rollback Scope

If rejected, revert only:

- `src/content/graduation/`
- `public/images/graduation/`
- `src/lib/graduation.ts`
- `src/components/GraduationInspirationApp.tsx`
- `src/app/[lang]/graduation/`
- `src/lib/i18n.ts`
- `src/app/[lang]/layout.tsx`
- `src/components/MobileNav.tsx`
- `tests/e2e/core-routes.spec.ts`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Do a source-quality and imagery pass for the graduation library: replace broad/placeholder sources with official project pages, then decide which 20 cases deserve real cover images.

## 2026-07-03 — Graduation Case Source And Image Pass 01

### Scope

- Started the source-quality and imagery pass for the graduation case library.
- Kept a conservative rule: only replace placeholders when the image source and license are traceable.

### Implemented

- Added optional `image_source_url` and `image_license` fields to `GraduationCase`.
- Updated `GraduationInspirationApp` so case cards/details use each case's image when available.
- Added image source/license links to case detail pages.
- Cached six Wikimedia Commons images locally under `public/images/graduation/cases/`.
- Updated `next.config.ts` to allow `/images/graduation/**` through Next Image.
- Improved several case source URLs:
  - `CASE-002` to Hiroshi Nakamura & NAP project page.
  - `CASE-003` to Tetsuo Kobori Architects project page and corrected architect/year.
  - `CASE-004` to Benesse Art Site Naoshima Art House Project page.
  - `CASE-006` to Tezuka Architects Fuji Kindergarten page.
  - `CASE-008` to Shigeru Ban Architects Onagawa Station page and added year.

### Images Added

- `CASE-002` Kamikatsu Zero Waste Center — CC0.
- `CASE-005` 3331 Arts Chiyoda — CC0.
- `CASE-007` Sendai Mediatheque — CC BY-SA 3.0.
- `CASE-016` ACROS Fukuoka — CC BY-SA 2.0.
- `CASE-017` Yokohama Hammerhead — CC BY-SA 4.0.
- `CASE-018` Kanazawa Umimirai Library — CC BY-SA 4.0.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with production server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3107 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 9 tests passed.
- Browser QA on `http://127.0.0.1:3107`:
  - `/zh/graduation/cases` shows real images for source-checked cases and placeholders for unresolved cases.
  - `/zh/graduation/cases/CASE-002` shows real image plus image source/license.
  - `/zh/graduation/cases/CASE-016` shows real image plus image source/license.
  - No relevant browser console warnings or errors.
- Screenshot evidence:
  - `/tmp/archistory-graduation-cases-real-images-desktop.png`
  - `/tmp/archistory-graduation-case-002-real-image.png`
  - `/tmp/archistory-graduation-case-016-real-image.png`

### Remaining Known Risk

- Four important published cases still need accepted real images: Share Kanazawa, Fuji Kindergarten, Onagawa Station, and Naoshima Honmura Lounge.
- Some draft cases still use broad institutional sources; they should stay draft until source quality improves.
- Local Commons images require attribution discipline whenever the page design changes.

### Rollback Scope

If rejected, revert only:

- `src/content/graduation/cases.json`
- `public/images/graduation/cases/`
- `src/lib/graduation.ts`
- `src/components/GraduationInspirationApp.tsx`
- `next.config.ts`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue source/image pass 02 for early high-value cases: Share Kanazawa, Fuji Kindergarten, Onagawa Station, and Naoshima Honmura Lounge. Use official pages first; only cache images when license/source is explicit enough.

## 2026-07-03 — Graduation Case Source And Image Pass 02

### Scope

- Continued the source-quality and imagery pass for the graduation case library.
- Kept unresolved or visually risky project images as placeholders instead of forcing weak visuals into the site.
- Added credit/note metadata so representative images can be distinguished from official project imagery.

### Implemented

- Added optional `image_credit` and `image_note` fields to `GraduationCase`.
- Rendered image credit and representative-image notes in case detail pages.
- Added four more traceable local images under `public/images/graduation/cases/`.
- Removed the unused `case-020-michi-no-eki-kawage.jpg` file after replacing it with the accepted Oguni source image.
- Normalized unresolved case image paths to the real local placeholder `/images/graduation/case-placeholder.svg`.
- Improved case source metadata:
  - `CASE-001` Share Kanazawa now points to Shinkenchiku project data and keeps the placeholder.
  - `CASE-010` Kamiyama Valley Satellite Office Complex now points to Kosuke Bando's project page.
  - `CASE-012` UR/danchi regeneration now uses an UR source page plus a representative Commons image.
  - `CASE-013` corrected from Okinawa to Shobara and now points to the CAn project page.
  - `CASE-014` Sumida River Terrace now uses a Tokyo Updates source plus a Commons river-terrace image.
  - `CASE-015` changed to Minamisanriku 311 Memorial, points to Kengo Kuma and Associates, and is published.
  - `CASE-019` Cocobunji Plaza now uses the Kokubunji official facility page plus a representative Commons image.
  - `CASE-020` Michi-no-Eki now uses a Commons Oguni image as representative typology imagery.

### Images Added

- `CASE-012` UR Akabanedai danchi representative image — CC BY-SA 4.0, Tokyo Danchi / Wikimedia Commons.
- `CASE-014` Sumida River Terrace — CC BY-SA 3.0, e97h0017 / Wikimedia Commons.
- `CASE-019` Kokubunji civic representative image — CC BY-SA 3.0, Hykw-a4 / Wikimedia Commons.
- `CASE-020` Michi-no-Eki Oguni representative image — CC BY-SA 3.0, STA3816 / Wikimedia Commons.

### Validation

- Data consistency check:
  - 20 total cases.
  - 10 cases with real local images.
  - 10 cases still intentionally use the neutral placeholder.
  - All local image and placeholder paths exist.
  - Local images have source, license, and credit metadata.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with running production server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3108 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 9 tests passed.
- Browser QA on `http://127.0.0.1:3108`:
  - `/zh/graduation/cases/CASE-012` loads the local danchi image and shows source, license, credit, and representative-image note.
  - `/zh/graduation/cases/CASE-020` was reached by clicking from the case list and loads the local Michi-no-Eki image.
  - `/zh/graduation/cases/CASE-001` still uses the neutral placeholder while showing corrected year, architect, and source.
  - Mobile 390px viewport for `CASE-020` has no horizontal overflow and no framework overlay.
  - No relevant browser console warnings or errors.
- Screenshot evidence:
  - `/tmp/archistory-graduation-case-012-source-image.png`
  - `/tmp/archistory-graduation-case-020-source-image-desktop.png`
  - `/tmp/archistory-graduation-case-020-source-image-mobile.png`
  - `/tmp/archistory-graduation-case-001-placeholder.png`

### Remaining Known Risk

- `CASE-001`, `CASE-006`, `CASE-008`, and `CASE-004` still need accepted image sources or should intentionally remain placeholder-first.
- Representative images are useful for browsing but should remain clearly labelled whenever they are not official project photos.
- Content is still seed-level; the library needs more official-source review before expansion beyond V1.

### Rollback Scope

If rejected, revert only:

- `src/content/graduation/cases.json`
- `public/images/graduation/cases/`
- `src/lib/graduation.ts`
- `src/components/GraduationInspirationApp.tsx`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue with a non-visual content QA pass: check each graduation issue-to-site-to-case relationship from a student's point of view, then remove weak links before adding more data.

## 2026-07-03 — Graduation Relationship Quality Pass 01

### Scope

- Audited the graduation inspiration data as an actual browsing graph: social issue to site type to reference case.
- Focused on removing weak pairings that looked connected in data but did not help a student understand a thesis direction.

### Implemented

- Reworked weak issue-to-case links for high-risk entries including:
  - `ISSUE-001` now connects elderly isolation to danchi/service/care references instead of broad community examples.
  - `ISSUE-004` now connects commercial street decline to station/civic/public-service examples instead of unrelated waterfront logic.
  - `ISSUE-005` now connects school reuse and learning to 3331 Arts Chiyoda, library, and mediatheque references.
  - `ISSUE-011` now connects night safety to station and civic-node cases rather than Michi-no-Eki typology.
  - `ISSUE-015` now connects regional food/community kitchen to Share Kanazawa, Michi-no-Eki, and Kamikatsu.
  - `ISSUE-018` now connects tourism pressure to Naoshima, Michi-no-Eki, and waterfront public-space references.
  - `ISSUE-019` now connects mobility decline to Michi-no-Eki, Onagawa Station, and Share Kanazawa.
- Expanded site keywords so filtering and relation cards expose the actual use logic:
  - care, co-eating, public living room, consultation, night safety, third place, production display, disaster storage, and information support.
- Expanded case keywords so related cases explain why they are relevant to each issue.
- Kept this pass data-only: no layout or routing change.

### Validation

- Relationship audit passed:
  - 20 issues checked.
  - 10 site types checked.
  - 20 cases checked.
  - 0 missing issue-to-site or issue-to-case references.
  - 0 weak issues under the rule: each issue must have at least one keyword-aligned site and one keyword-aligned case.
  - 0 keyword arrays over the 8-keyword cap.
  - 0 missing local image paths.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with running production server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3109 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 9 tests passed.
- Browser QA on `http://127.0.0.1:3109`:
  - `/zh/graduation/issues/ISSUE-001` shows danchi/care sites and care-related cases.
  - `/zh/graduation/issues/ISSUE-011` shows station/commercial-street sites and night-safety adjacent cases.
  - `/zh/graduation/issues/ISSUE-015` shows commercial street/empty house sites and food/community-related cases.
  - No relevant browser console warnings or errors.
- Screenshot evidence:
  - `/tmp/archistory-graduation-relation-issue-001.png`
  - `/tmp/archistory-graduation-relation-issue-011.png`
  - `/tmp/archistory-graduation-relation-issue-015.png`

### Remaining Known Risk

- The keyword-alignment audit catches obvious weak links, but it cannot judge deeper research quality or whether the case is the best possible precedent.
- Several useful cases are still `draft` because images or source depth remain incomplete.
- The page still does not explicitly explain why each related case was chosen; that may be the next useful UI/data field.

### Rollback Scope

If rejected, revert only:

- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Add a small `fit_reason` or `relation_note` for each issue-case relation, so the detail page can explain in one sentence why a case belongs there instead of relying only on tags.

## 2026-07-03 — Graduation Relation Notes Pass 01

### Scope

- Made the issue-to-case relationship visible to users.
- Kept the change data-first and low-noise: one short note per related case, shown only where an issue context exists.

### Implemented

- Added optional `case_relation_notes` to `GraduationIssue`.
- Added relation notes for all 20 graduation issues.
- Updated issue detail pages so each related case card explains why that case is relevant.
- Updated random inspiration results so generated case cards also show relation notes for the selected issue.
- Left the general case library and site detail related-case lists unchanged, because those views do not have a single issue context.

### Validation

- Relation-note audit passed:
  - 20 issues checked.
  - 20 issues include `case_relation_notes`.
  - Every `reference_case_ids` entry has a matching note.
  - No extra notes point to unrelated cases.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with running production server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3110 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 9 tests passed.
- Browser QA on `http://127.0.0.1:3110`:
  - `/zh/graduation/issues/ISSUE-001` shows relation notes on all three related case cards.
  - `/zh/graduation/random` shows relation notes on generated case cards.
  - Mobile 390px viewport for `ISSUE-001` has no horizontal overflow and no framework overlay.
  - No relevant browser console warnings or errors.
- Screenshot evidence:
  - `/tmp/archistory-graduation-relation-notes-issue-001.png`
  - `/tmp/archistory-graduation-relation-notes-random.png`
  - `/tmp/archistory-graduation-relation-notes-issue-001-cases.png`
  - `/tmp/archistory-graduation-relation-notes-issue-001-mobile.png`

### Remaining Known Risk

- Notes are currently Chinese-only, matching the current graduation content.
- Notes improve explanation, but they are still manually written seed content and should be reviewed again when the case library expands.

### Rollback Scope

If rejected, revert only:

- `src/content/graduation/issues.json`
- `src/lib/graduation.ts`
- `src/components/GraduationInspirationApp.tsx`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Add the same relation-note logic to exported JSON bundles in a cleaner shape, so a downloaded inspiration bundle is readable without opening the site.

## 2026-07-03 — Graduation Export Bundle Notes Pass 01

### Scope

- Made exported inspiration bundles readable outside the website.
- Kept the existing `cases` array for compatibility and added a clearer `cases_with_notes` array for human use.

### Implemented

- Added `buildInspirationBundle()` inside `GraduationInspirationApp`.
- Updated issue detail export and random inspiration export to use the same bundle shape.
- Exported JSON now includes:
  - `issue`
  - `site_types`
  - `cases`
  - `cases_with_notes`
  - `exported_at`
- Each `cases_with_notes` item contains the full case object and its `relation_note`.

### Validation

- Export-shape audit passed:
  - 20 issues checked.
  - Every issue can produce `cases_with_notes` rows with non-empty notes.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with running production server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3111 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 9 tests passed.
- Download QA on `http://127.0.0.1:3111`:
  - `/zh/graduation/issues/ISSUE-001` exported `ISSUE-001-inspiration-bundle.json`.
  - `/zh/graduation/random` exported a random issue bundle.
  - Both downloaded JSON files include `cases_with_notes`.
  - `cases_with_notes.length` matched `cases.length`.
  - First relation note was non-empty in both files.
- Screenshot evidence:
  - `/tmp/archistory-graduation-export-issue-001.png`
  - `/tmp/archistory-graduation-export-random.png`

### Remaining Known Risk

- `cases_with_notes` duplicates case data already present in `cases`; this is intentional for readable standalone exports, but can be compacted later if file size becomes a concern.

### Rollback Scope

If rejected, revert only:

- `src/components/GraduationInspirationApp.tsx`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Add CSV export for issue bundles, because students may want to open topic/site/case combinations in Excel or Notion without touching JSON.

## 2026-07-03 — Graduation CSV Bundle Export Pass 01

### Scope

- Added spreadsheet-friendly CSV export for the current inspiration bundle.
- Kept JSON as the complete structured export and CSV as the quick editing/review format.

### Implemented

- Added `导出当前方向 CSV` / `Export bundle CSV` / `現在の方向を CSV 出力`.
- Added CSV export to issue detail pages and random inspiration results.
- Added `downloadCsv()` and `buildInspirationCsvRows()`.
- CSV format uses one related case per row and repeats the issue/site context:
  - `issue_id`
  - `issue_title`
  - `issue_summary`
  - `building_types`
  - `site_ids`
  - `site_names`
  - `case_id`
  - `case_name`
  - `relation_note`
  - `case_location`
  - `case_concept`
  - `case_source_url`
- Added UTF-8 BOM for spreadsheet compatibility with Chinese text.
- Added basic CSV formula-injection protection for cells beginning with `=`, `+`, `-`, or `@`.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with running production server:
  - `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3112 npx playwright test tests/e2e/core-routes.spec.ts`
  - Result: 9 tests passed.
- Download QA on `http://127.0.0.1:3112`:
  - `/zh/graduation/issues/ISSUE-001` exported `ISSUE-001-inspiration-bundle.csv`.
  - `/zh/graduation/random` exported a random issue CSV bundle.
  - Both CSV files had the expected headers.
  - First data rows included `issue_id`, `case_id`, and non-empty `relation_note`.
  - Both files included UTF-8 BOM.
- Browser mobile QA:
  - `/zh/graduation/issues/ISSUE-001` at 390px showed JSON and CSV buttons without horizontal overflow.
  - No relevant browser console warnings or errors.
- Screenshot evidence:
  - `/tmp/archistory-graduation-export-csv-issue-001.png`
  - `/tmp/archistory-graduation-export-csv-random.png`
  - `/tmp/archistory-graduation-export-csv-mobile.png`

### Remaining Known Risk

- CSV is intentionally flat and repeats issue/site fields per case row; this is better for spreadsheets but less compact than JSON.

### Rollback Scope

If rejected, revert only:

- `src/components/GraduationInspirationApp.tsx`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Add a small on-page `导出说明` line near the buttons, explaining JSON is complete data and CSV is spreadsheet-friendly, without adding a large help block.

## 2026-07-03 — Graduation Plan Priority Reset

### Scope

- Re-anchored future graduation submenu work to the user's V1 Graduation Inspiration Library plan.
- Clarified which recent work was plan-required and which was a small enhancement.

### Implemented

- Added `docs/GRADUATION_PLAN_COMPLIANCE.md`.
- Recorded the new priority rule: unfinished V1 plan items come before new enhancements.
- Classified current work:
  - In-plan or plan-aligned: pages, random inspiration, local JSON data, JSON export, CSV export, source traceability.
  - Enhancement: `case_relation_notes` and `cases_with_notes`.
- Identified missing plan deliverables:
  - `docs/graduation/wireframes.md`
  - `docs/graduation/random.md`
  - `docs/graduation/content-guide.md`
  - `docs/graduation/SOURCE_POLICY.md`
  - JSON Schemas
  - editable CSV source files
  - CSV to JSON build script
  - `api/openapi.yaml`
  - field-specific filters

### Validation

- Documentation-only change; no runtime validation required.
- Checked current file tree against the planned deliverables.

### Rollback Scope

If rejected, revert only:

- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Create the missing V1 handoff documents first: `docs/graduation/wireframes.md`, `docs/graduation/random.md`, `docs/graduation/content-guide.md`, and `docs/graduation/SOURCE_POLICY.md`.

## 2026-07-03 — Graduation Handoff Docs Pass 01

### Scope

- Filled the missing V1 handoff documents from the user's Graduation Inspiration Library plan.
- Kept this pass documentation-only so it does not affect the current running site.

### Implemented

- Added `docs/graduation/wireframes.md` for the planned graduation submenu page structure and low-fidelity layout rules.
- Added `docs/graduation/random.md` for the no-AI structured random inspiration algorithm.
- Added `docs/graduation/content-guide.md` for issue, site type, case, relation-note, and teacher-brief writing rules.
- Added `docs/graduation/SOURCE_POLICY.md` for case/image source priority, placeholder policy, and review rules.
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md` to mark these four handoff documents as done.
- Updated the plan-first next-task list so schema files are the next priority.

### Validation

- Documentation-only change; no runtime validation required.
- Verified the four graduation handoff documents exist.
- Verified `docs/GRADUATION_PLAN_COMPLIANCE.md` contains the updated done statuses and current recommendation.

### Remaining Known Risk

- These documents define the operating rules, but the planned JSON Schemas and editable CSV source workflow are still not implemented.

### Rollback Scope

If rejected, revert only:

- `docs/graduation/wireframes.md`
- `docs/graduation/random.md`
- `docs/graduation/content-guide.md`
- `docs/graduation/SOURCE_POLICY.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Create the planned JSON Schema files first: `schemas/issue.schema.json`, `schemas/site_type.schema.json`, and `schemas/case.schema.json`.

## 2026-07-03 — Graduation Schema Pass 01

### Scope

- Added the planned JSON Schema files from the user's V1 Graduation Inspiration Library plan.
- Kept the schemas aligned with the current content library so validation can pass before the CSV source workflow is added.

### Implemented

- Added `schemas/issue.schema.json`.
- Added `schemas/site_type.schema.json`.
- Added `schemas/case.schema.json`.
- Used draft-07 instead of draft 2020-12 because the project currently has Ajv 6.15.0 installed.
- Included current adopted extension fields:
  - issue `case_relation_notes`
  - issue `updated_at`
  - case image attribution fields: `image_source_url`, `image_license`, `image_credit`, `image_note`
- Allowed optional empty case `year` and `architect`, matching the plan's "可空" rule.
- Removed duplicated keywords from:
  - `CASE-019`: duplicated `车站`
  - `CASE-020`: duplicated `交通`
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md` so JSON Schemas are marked done.

### Validation

- Passed JSON syntax validation:
  - `jq empty schemas/issue.schema.json schemas/site_type.schema.json schemas/case.schema.json`
- Passed Ajv validation against current content:
  - `src/content/graduation/issues.json`: 20/20 passed
  - `src/content/graduation/site-types.json`: 10/10 passed
  - `src/content/graduation/cases.json`: 20/20 passed

### Remaining Known Risk

- The validation command is not yet packaged as an npm script; it was run as a direct Node command.
- The editable CSV source files and CSV-to-JSON build script are still not implemented.

### Rollback Scope

If rejected, revert only:

- `schemas/issue.schema.json`
- `schemas/site_type.schema.json`
- `schemas/case.schema.json`
- `src/content/graduation/cases.json`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Add the planned editable CSV source workflow: `content/issues.csv`, `content/site_types.csv`, `content/cases.csv`, plus a CSV-to-JSON build script that validates output with these schemas.

## 2026-07-03 — Graduation CSV Source Workflow Pass 01

### Scope

- Added the planned editable CSV source workflow from the user's V1 Graduation Inspiration Library plan.
- Made CSV the non-technical editing source and JSON the frontend runtime output.

### Implemented

- Added editable CSV source files:
  - `content/issues.csv`
  - `content/site_types.csv`
  - `content/cases.csv`
- Added `scripts/build-graduation-data.mjs`.
- Added npm scripts:
  - `npm run graduation:data`
  - `npm run graduation:data:from-json`
- CSV conventions:
  - Array fields use `|`.
  - Issue relation notes use `CASE-001::note text|CASE-002::note text`.
  - Empty optional case `year` becomes `null` in JSON.
  - Empty optional image attribution fields are omitted from JSON.
- The build script validates generated JSON against:
  - `schemas/issue.schema.json`
  - `schemas/site_type.schema.json`
  - `schemas/case.schema.json`
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md` so editable CSV source files and the CSV-to-JSON build script are marked done.

### Validation

- Passed CSV initialization from current JSON:
  - `npm run graduation:data:from-json`
  - Output: 20 issues, 10 site types, 20 cases.
- Passed CSV-to-JSON build and schema validation:
  - `npm run graduation:data`
  - Output: 20 issues, 10 site types, 20 cases.
- Passed JSON syntax validation:
  - `jq empty package.json src/content/graduation/issues.json src/content/graduation/site-types.json src/content/graduation/cases.json`
- Checked generated CSV headers and first rows.

### Remaining Known Risk

- CSV editing uses simple delimiter conventions; editors must avoid `|` inside list values and `::` inside relation-note IDs.
- The OpenAPI contract is still missing.
- Dedicated public list export files are still not implemented, though bundle CSV export and CSV sources now exist.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `scripts/build-graduation-data.mjs`
- `package.json`
- `src/content/graduation/cases.json`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Add the planned `api/openapi.yaml`, then use it as the contract for filter and export behavior.

## 2026-07-03 — Graduation OpenAPI Contract Pass 01

### Scope

- Added the planned API contract from the user's V1 Graduation Inspiration Library plan.
- Kept it as a contract document only; no runtime route behavior was changed in this pass.

### Implemented

- Added `api/openapi.yaml`.
- Covered planned endpoints:
  - `GET /api/home`
  - `GET /api/issues`
  - `GET /api/issues/{id}`
  - `GET /api/sites`
  - `GET /api/sites/{id}`
  - `GET /api/cases`
  - `GET /api/cases/{id}`
  - `POST /api/random`
  - `GET /api/brief`
  - `GET /api/export/issues.csv`
  - `GET /api/export/sites.csv`
  - `GET /api/export/cases.csv`
  - `POST /api/export/inspiration-bundle.json`
- Documented query parameters for search, tag, site type, building type, and pagination.
- Documented core response schemas for issues, site types, cases, random inspiration bundles, and teacher brief.
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md` so the OpenAPI draft is marked done.

### Validation

- Passed YAML parse check:
  - `ruby -e "require 'yaml'; data = YAML.load_file('api/openapi.yaml'); abort('missing paths') unless data['paths']; puts [data['openapi'], data['paths'].length, data['components']['schemas'].length].join(' ')"`
  - Output: `3.1.0 13 15`
- Checked endpoint coverage with `rg`.

### Remaining Known Risk

- This is a contract file, not implemented API route code.
- The current static UI still needs field-specific filters to fully match the contract.

### Rollback Scope

If rejected, revert only:

- `api/openapi.yaml`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Improve the planned filters in the graduation UI, especially filtering issues by site type and building type.

## 2026-07-03 — Graduation Planned Filters Pass 01

### Scope

- Completed the field-specific filters from the user's V1 Graduation Inspiration Library plan.
- Kept the UI compact: only the issue library gets site type and building type filters.

### Implemented

- Replaced free-text tag input with a tag dropdown generated from the current list data.
- Added issue-list filtering by recommended site type.
- Added issue-list filtering by recommended building type.
- Kept keyword search and JSON export behavior.
- Added e2e coverage for:
  - filtering issues by `SITE-002`
  - filtering issues by building type `社区食堂`
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md` so search/tag/site-type/building-type filtering is marked done.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
- Playwright result: 9 tests passed.

### Remaining Known Risk

- The filter state is local UI state only; it is not yet reflected in the URL query string.
- Dedicated public list export files are still missing.

### Rollback Scope

If rejected, revert only:

- `src/components/GraduationInspirationApp.tsx`
- `tests/e2e/core-routes.spec.ts`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Add dedicated public list exports for `issues`, `site_types`, and `cases` in CSV and JSON formats.

## 2026-07-03 — Graduation Public Exports Pass 01

### Scope

- Completed the planned public list exports for the three core graduation datasets.
- Kept the implementation static-first by generating files under `public/data/graduation/`.

### Implemented

- Extended `scripts/build-graduation-data.mjs` so `npm run graduation:data` writes public exports in addition to runtime JSON:
  - `public/data/graduation/issues.json`
  - `public/data/graduation/issues.csv`
  - `public/data/graduation/site_types.json`
  - `public/data/graduation/site_types.csv`
  - `public/data/graduation/cases.json`
  - `public/data/graduation/cases.csv`
- Added e2e coverage for public export reachability.
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md` so CSV export is marked done.

### Validation

- Passed: `npm run graduation:data`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
- Final Playwright result: 10 tests passed.
- Verified public JSON counts:
  - issues: 20
  - site types: 10
  - cases: 20
- Verified public CSV row counts:
  - `issues.csv`: 21 lines including header
  - `site_types.csv`: 11 lines including header
  - `cases.csv`: 21 lines including header
- Verified public CSV headers.

### Remaining Known Risk

- The public export files are static snapshots; editors must run `npm run graduation:data` after changing `content/*.csv`.
- Formal V1 content expansion is still incomplete.

### Rollback Scope

If rejected, revert only:

- `scripts/build-graduation-data.mjs`
- `public/data/graduation/issues.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/site_types.json`
- `public/data/graduation/site_types.csv`
- `public/data/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `tests/e2e/core-routes.spec.ts`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Expand the graduation content library toward the formal V1 target: 100 issues, 30-50 site types, and 100 cases.

## 2026-07-03 — Graduation Content Expansion Batch 01

### Scope

- Continued the user's V1 Graduation Inspiration Library plan by expanding the content library.
- Kept this batch source-backed and draft-heavy instead of rushing weak content into `published`.

### Implemented

- Expanded issue count from 20 to 30.
- Expanded site type count from 10 to 15.
- Expanded case count from 20 to 30.
- Added new issue themes:
  - postpartum care and parenting isolation
  - dementia-friendly communities
  - disability employment and street participation
  - food loss and circular food education
  - public bath decline and health exchange
  - under-elevated space and neighborhood repair
  - urban agriculture and food education
  - everyday health consultation in underserved areas
  - learning support for foreign children
  - local festivals and public memory
- Added new site types:
  - health center surroundings
  - peri-urban farmland edge
  - public bath district
  - welfare workshop surroundings
  - under-elevated / under-bridge space
- Added new cases:
  - Toyama Kirari
  - Minna no Mori Gifu Media Cosmos
  - Nakanoshima Children's Book Forest
  - AU Childcare Support
  - IRH Child Development Support
  - Yoridoko Employment Support Center
  - Yusuhara Community Library / Yururi Yusuhara
  - Shiroiya Hotel
  - Musashino Place
  - Mabi Reconstruction Disaster Prevention Park Bamboo Gate
- Updated e2e public export expectations from 20 issues to 30 issues.
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md` so formal content target is marked partial with current 30/15/30 counts.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 30 issues, 15 site types, 30 cases.
- Passed relationship integrity check:
  - all issue site references exist.
  - all issue case references exist.
  - all relation-note case IDs are referenced by their issue.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
- Final Playwright result: 10 tests passed.

### Remaining Known Risk

- New content is mostly `draft`; it still needs a future review pass before promotion to `published`.
- Several new cases use placeholder images. That is intentional until safe image sources are confirmed.
- Formal V1 content target is still incomplete: current 30/15/30 vs target 100/30-50/100.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/issues.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/site_types.json`
- `public/data/graduation/site_types.csv`
- `public/data/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `tests/e2e/core-routes.spec.ts`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue source-backed expansion to the next checkpoint: 40 issues, 20 site types, and 40 cases.

## 2026-07-03 — Graduation Content Expansion Batch 02

### Scope

- Continued source-backed content expansion toward the formal V1 target.
- Advanced the content library from 30/15/30 to 40/20/40.

### Implemented

- Expanded issue count from 30 to 40.
- Expanded site type count from 15 to 20.
- Expanded case count from 30 to 40.
- Added new issue themes:
  - public toilets and walking dignity
  - evacuation privacy and dignity
  - hot-spring town decline and health tourism
  - school non-attendance and alternative learning space
  - local entrepreneurship and co-working
  - rainwater management as everyday park infrastructure
  - walking rest networks for older adults
  - former railway land and small-shop incubation
  - student making and open workshops
  - post-disaster memory and shared living rooms
- Added new site types:
  - public toilet surroundings in parks
  - learning nodes near schools
  - hot-spring town entrances
  - vacant floors for co-working
  - stormwater basin / rainwater facility surroundings
- Added new cases:
  - The Tokyo Toilet
  - Paper Partition System / East Japan Earthquake
  - Yu no Eki Ohyu
  - KAIT Workshop
  - Kashiwa-no-ha Open Innovation Lab
  - Tama Art University Library
  - Home-for-All Rikuzentakata
  - BONUS TRACK Shimokitazawa
  - MIKAN SHIMOKITA
  - MIYASHITA PARK
- Updated e2e public export expectations from 30 issues to 40 issues.
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md` so formal content target remains partial with current 40/20/40 counts.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 40 issues, 20 site types, 40 cases.
- Passed relationship integrity check:
  - all issue site references exist.
  - all issue case references exist.
  - all relation-note case IDs are referenced by their issue.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
- Final Playwright result: 10 tests passed.

### Remaining Known Risk

- New content is mostly `draft`; it still needs a source and wording review pass before promotion to `published`.
- Many new cases use placeholder images by design until safe image sources are confirmed.
- Formal V1 content target is still incomplete: current 40/20/40 vs target 100/30-50/100.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/issues.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/site_types.json`
- `public/data/graduation/site_types.csv`
- `public/data/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `tests/e2e/core-routes.spec.ts`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue source-backed expansion to the next checkpoint: 50 issues, 25 site types, and 50 cases.

## 2026-07-03 — Graduation Multi-Task Push 01

### Scope

- Continued autonomous plan-first work while the user was away.
- Completed three connected tasks in one push:
  - source-backed content expansion to 50/25/50
  - shareable URL filters
  - content QA script and report

### Implemented

- Expanded issue count from 40 to 50.
- Expanded site type count from 20 to 25.
- Expanded case count from 40 to 50.
- Added new issue themes:
  - island port life-service decline
  - industrial heritage and environmental learning
  - station-front library and compact city
  - roadside stations as daily service hubs
  - art tourism and resident-life mediation
  - quiet healing spaces with natural light
  - park service facilities and urban safety
  - city-center linear park regeneration
  - local museums and children's learning
  - slow-life community and spiritual public space
- Added new site types:
  - island port surroundings
  - industrial heritage sites
  - station-front library districts
  - roadside station surroundings
  - low-density museum districts
- Added new cases:
  - Inujima Seirensho Art Museum
  - Nasushiobara City Library Miruru
  - Roadside Station Mashiko
  - Nabeshima Shoto Park Toilet
  - Teshima Art Museum
  - Chichu Art Museum
  - Towada Art Center
  - Aranya Art Center
  - Mokumoku Yuusui Toilet
  - Hisaya-odori Park
- Updated list filters so `q`, `tag`, `siteType`, and `buildingType` are reflected in the URL query string.
- Added e2e coverage for:
  - filter URL updates after selecting filters
  - direct loading of `/zh/graduation/issues?siteType=SITE-002`
  - public exports containing 50 issues and `CASE-050`
- Added `scripts/audit-graduation-content.mjs`.
- Added npm script `graduation:audit`.
- Generated `docs/GRADUATION_CONTENT_QA.md`.
- Linked the two previously unreferenced cases back into issue relationships:
  - `CASE-003` into `ISSUE-035`
  - `CASE-025` into `ISSUE-021`
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md` with 50/25/50 progress, shareable filter URLs, and QA report status.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 50 issues, 25 site types, 50 cases.
- Passed relationship integrity check:
  - all issue site references exist.
  - all issue case references exist.
  - all relation-note case IDs are referenced by their issue.
- Passed: `npm run graduation:audit`.
  - Output: 50 issues, 25 site types, 50 cases.
  - Problems: 0.
  - Unreferenced site types: 0.
  - Unreferenced cases: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
- Final Playwright result: 10 tests passed.

### Remaining Known Risk

- Most newly added records remain `draft` and need review before publication.
- Many new cases still use placeholder images until safe image sources are confirmed.
- Formal V1 content target is still incomplete: current 50/25/50 vs target 100/30-50/100.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/issues.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/site_types.json`
- `public/data/graduation/site_types.csv`
- `public/data/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `src/components/GraduationInspirationApp.tsx`
- `tests/e2e/core-routes.spec.ts`
- `scripts/audit-graduation-content.mjs`
- `package.json`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue source-backed expansion to 60/30/60, then pause content growth for a draft review and promotion pass.

## 2026-07-03 — Graduation Content Expansion Batch 04

### Scope

- Continued plan-first content expansion from 50/25/50 to 60/30/60.
- Reached the formal lower bound for site types in the V1 plan.

### Implemented

- Expanded issue count from 50 to 60.
- Expanded site type count from 25 to 30.
- Expanded case count from 50 to 60.
- Added new site types:
  - large cultural complex districts
  - waterfront museum surroundings
  - shared housing districts
  - former commercial complex sites
  - historical museum renewal districts
- Added new cases:
  - Kadokawa Culture Museum
  - Hoki Museum
  - Oita Prefectural Art Museum
  - Kyoto City KYOCERA Museum of Art
  - Nagasaki Prefectural Art Museum
  - Tainan Spring
  - Tsuruoka Cultural Hall
  - Sagawa Art Museum
  - LT Josai Shared House
  - Fukuda Art Museum
- Updated e2e public export expectations from 50 issues to 60 issues.
- Updated `scripts/audit-graduation-content.mjs` so the next recommendation changes after reaching 60/30/60.
- Regenerated `docs/GRADUATION_CONTENT_QA.md`.
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md` with 60/30/60 progress.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 60 issues, 30 site types, 60 cases.
- Passed: `npm run graduation:audit`.
  - Output: 60 issues, 30 site types, 60 cases.
  - Problems: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
- Final Playwright result: 10 tests passed.
- Passed image proxy spot-check on a local production server:
  - Toyama Kirari Wikimedia image returned `200 image/jpeg`.
  - Teshima Art Museum Wikimedia image returned `200 image/jpeg`.
  - Unreferenced site types: 0.
  - Unreferenced cases: 0.

### Remaining Known Risk

- Most newly added records remain `draft` and need review before publication.
- Placeholder images increased to 50/60 cases.
- Formal V1 content target is still incomplete for issues and cases: current 60/60 vs target 100/100.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/issues.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/site_types.json`
- `public/data/graduation/site_types.csv`
- `public/data/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `tests/e2e/core-routes.spec.ts`
- `scripts/audit-graduation-content.mjs`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Pause expansion and run a draft review pass, promoting only source-strong records to `published`.

## 2026-07-03 — Graduation Draft Review Pass 01

### Scope

- Paused content expansion after reaching 60/30/60.
- Ran a conservative publication review before any further growth.

### Implemented

- Promoted `ISSUE-017` through `ISSUE-030` from `draft` to `published`.
- Promoted `SITE-011` through `SITE-020` from `draft` to `published`.
- Did not bulk-promote cases because 50/60 cases still use placeholder images.
- Added `docs/GRADUATION_DRAFT_REVIEW.md`.
- Updated `scripts/audit-graduation-content.mjs` so the recommendation changes after the review pass.
- Regenerated `docs/GRADUATION_CONTENT_QA.md`.
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md` with draft review status.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 60 issues, 30 site types, 60 cases.
- Passed: `npm run graduation:audit`.
  - Output: 60 issues, 30 site types, 60 cases.
  - Problems: 0.
- Current publication counts:
  - issues: 30 published / 30 draft
  - site types: 20 published / 10 draft
  - cases: 11 published / 49 draft
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
- Final Playwright result: 10 tests passed.

### Remaining Known Risk

- Case library publication is still held back by placeholder images.
- The next quality bottleneck is image/source confidence for cases, not issue generation.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- `content/site_types.csv`
- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `public/data/graduation/issues.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/site_types.json`
- `public/data/graduation/site_types.csv`
- `scripts/audit-graduation-content.mjs`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_DRAFT_REVIEW.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Improve high-value case records before publishing more cases: add safe image sources where possible, then promote only image-safe/source-strong cases.

## 2026-07-03 — Graduation Case Image Review Pass 01

### Scope

- Improved high-value case records before publishing more cases.
- Followed the source policy: only used images with clear source, license, and credit fields.

### Implemented

- Added Wikimedia Commons image URLs, image source URLs, license fields, and credit fields for 10 case records:
  - `CASE-021` Toyama Kirari
  - `CASE-022` Minna no Mori Gifu Media Cosmos
  - `CASE-023` Nakanoshima Children's Book Forest
  - `CASE-036` Tama Art University Library
  - `CASE-040` MIYASHITA PARK
  - `CASE-041` Inujima Seirensho Art Museum
  - `CASE-045` Teshima Art Museum
  - `CASE-046` Chichu Art Museum
  - `CASE-047` Towada Art Center
  - `CASE-051` Kadokawa Culture Museum
- Promoted those 10 cases from `draft` to `published`.
- Updated `docs/GRADUATION_DRAFT_REVIEW.md`.
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md`.
- Regenerated `docs/GRADUATION_CONTENT_QA.md`.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 60 issues, 30 site types, 60 cases.
- Passed: `npm run graduation:audit`.
  - Output: 60 issues, 30 site types, 60 cases.
  - Problems: 0.
- Current publication counts:
  - issues: 30 published / 30 draft
  - site types: 20 published / 10 draft
  - cases: 21 published / 39 draft
- Case image status:
  - placeholder images: 40/60
  - explicit image source URLs: 20/60

### Remaining Known Risk

- 40 case records still use placeholders.
- Some useful cases should remain draft until safe images or stronger source details are available.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_DRAFT_REVIEW.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue a second case image review pass for official/Wikimedia-safe cases, then run visual QA on the case list page.

## 2026-07-03 — Graduation Case Image Review Pass 02

### Scope

- Continued the case-image confidence pass before expanding the dataset.
- Followed the same conservative rule: only publish cases with exact, traceable image source, license, and credit metadata.

### Implemented

- Added Wikimedia Commons image URLs, image source URLs, license fields, and credit fields for 12 additional case records:
  - `CASE-029` Musashino Place
  - `CASE-031` The Tokyo Toilet
  - `CASE-042` Nasushiobara City Library Miruru
  - `CASE-043` Roadside Station Mashiko
  - `CASE-044` Nabeshima Shoto Park Toilet
  - `CASE-050` Hisaya-odori Park
  - `CASE-052` Hoki Museum
  - `CASE-053` Oita Prefectural Art Museum
  - `CASE-054` Kyoto City KYOCERA Museum of Art
  - `CASE-055` Nagasaki Prefectural Art Museum
  - `CASE-058` Sagawa Art Museum
  - `CASE-060` Fukuda Art Museum
- Promoted those 12 cases from `draft` to `published`.
- Kept `CASE-049`, `CASE-056`, and `CASE-057` in `draft` because a safe exact cover image was not confirmed in this pass.
- Updated `docs/GRADUATION_DRAFT_REVIEW.md`.
- Updated `docs/GRADUATION_PLAN_COMPLIANCE.md`.
- Regenerated `docs/GRADUATION_CONTENT_QA.md`.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 60 issues, 30 site types, 60 cases.
- Passed: `npm run graduation:audit`.
  - Output: 60 issues, 30 site types, 60 cases.
  - Problems: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
  - Output: 2 test files, 6 tests passed.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
  - Output: 10 tests passed.
- Passed: `npm run build`.
  - Production build generated 3865 static pages.
- Browser QA on `http://127.0.0.1:3129/zh/graduation/cases`:
  - page title: `毕业设计灵感库 | Archistory`
  - no console warnings/errors from the rendered route.
  - case list rendered 60 records and search query `Musashino` narrowed the list to `CASE-029`.
- Browser QA on `http://127.0.0.1:3129/zh/graduation/cases/CASE-029`:
  - desktop detail page rendered the Wikimedia cover image, license `CC BY-SA 4.0`, and credit `Asturio Cantabrio`.
  - mobile viewport 390x844 had no horizontal overflow and rendered the same image/source block.
- Local image-proxy spot check:
  - all 12 newly added image URLs returned HTTP 200 through `/api/image-proxy`.
- Current publication counts:
  - issues: 30 published / 30 draft
  - site types: 20 published / 10 draft
  - cases: 33 published / 27 draft
- Case image status:
  - placeholder images: 28/60
  - explicit image source URLs: 32/60

### Remaining Known Risk

- 28 case records still use placeholders.
- Some strong cases still need official or open-license images before publication.
- More case details beyond `CASE-029` should still be spot-checked visually as the image set grows.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_DRAFT_REVIEW.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Expand content toward 70 issues / 35 site types / 70 cases, while keeping the same image-source promotion rule.

## 2026-07-03 — Graduation Content Expansion Checkpoint 70/35/70

### Scope

- Continued plan-first expansion of the Graduation Inspiration Library.
- Increased the dataset from 60 issues / 30 site types / 60 cases to 70 issues / 35 site types / 70 cases.
- Kept the new records as `draft` until a later source-quality and image-confidence publication pass.

### Implemented

- Added 10 new source-linked issue records:
  - `ISSUE-061` large-event legacy and daily use
  - `ISSUE-062` disaster temporary housing and long-term recovery
  - `ISSUE-063` roadside stations as local service centers
  - `ISSUE-064` rural public facilities and local identity
  - `ISSUE-065` childcare support as street-corner public support
  - `ISSUE-066` child development support and inclusive street edges
  - `ISSUE-067` open community centers in dense neighborhoods
  - `ISSUE-068` elevated parks and youth sport spaces
  - `ISSUE-069` heritage guidance and craft learning
  - `ISSUE-070` local libraries as all-weather civic living rooms
- Added 5 new site-type records:
  - `SITE-031` large sports park edge
  - `SITE-032` post-disaster temporary housing land
  - `SITE-033` childcare support street corner
  - `SITE-034` roadside station renewal belt
  - `SITE-035` elevated/pocket sports gaps
- Added 10 new draft case records:
  - `CASE-061` Japan National Stadium
  - `CASE-062` Onagawa Container House
  - `CASE-063` Roadside Station Aino Tsuchiyama
  - `CASE-064` Takayanagi Community Center
  - `CASE-065` AU Childcare Support
  - `CASE-066` IRH Child Development Support
  - `CASE-067` Sendagaya Community Center
  - `CASE-068` Miyashita Park Atelier Bow-Wow
  - `CASE-069` Kanayama Community Center
  - `CASE-070` Tonami Public Library
- Regenerated:
  - `src/content/graduation/issues.json`
  - `src/content/graduation/site-types.json`
  - `src/content/graduation/cases.json`
  - public CSV/JSON exports under `public/data/graduation/`
  - `docs/GRADUATION_CONTENT_QA.md`
- Updated:
  - `docs/GRADUATION_DRAFT_REVIEW.md`
  - `docs/GRADUATION_PLAN_COMPLIANCE.md`
- Updated `tests/e2e/core-routes.spec.ts` so the graduation export test checks the new 70-record checkpoint and `ISSUE-070` / `CASE-070`.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 70 issues, 35 site types, 70 cases.
- Passed: `npm run graduation:audit`.
  - Output: 70 issues, 35 site types, 70 cases.
  - Problems: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
  - Output: 2 test files, 6 tests passed.
- Passed after updating the export-count assertion: `npx playwright test tests/e2e/core-routes.spec.ts`.
  - Output: 10 tests passed.
- Current publication counts:
  - issues: 30 published / 40 draft
  - site types: 20 published / 15 draft
  - cases: 33 published / 37 draft
- Current source/image status:
  - issues with source URLs: 70/70
  - cases with source URLs: 70/70
  - placeholder images: 38/70
  - explicit image source URLs: 32/70

### Remaining Known Risk

- The 10 newly added cases use placeholders by design until safe cover images are confirmed.
- The new issue and site records are useful for browsing, but should stay draft until a publication review pass checks wording and source strength.
- A rendered QA pass is still needed after promoting any of the new draft records.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/issues.json`
- `public/data/graduation/site_types.csv`
- `public/data/graduation/site_types.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_DRAFT_REVIEW.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Review the new draft cases for safe cover images and source confidence, promote only source-strong records, then continue toward 80 issues / 40 site types / 80 cases.

## 2026-07-03 — Graduation New Draft Case Image Review Pass 01

### Scope

- Reviewed `CASE-061` through `CASE-070` for safe cover images before expanding further.
- Kept the conservative publication rule: exact project match, traceable source URL, license, and credit before replacing the placeholder.

### Implemented

- Added Wikimedia Commons image URL, image source URL, license field, credit field, and image note for:
  - `CASE-061` Japan National Stadium
- Promoted `CASE-061` from `draft` to `published`.
- Kept `CASE-062` through `CASE-070` as `draft` with placeholders because a safe exact image was not confirmed in this pass.
- Regenerated:
  - `src/content/graduation/cases.json`
  - `public/data/graduation/cases.json`
  - `public/data/graduation/cases.csv`
  - `docs/GRADUATION_CONTENT_QA.md`
- Updated:
  - `docs/GRADUATION_DRAFT_REVIEW.md`
  - `docs/GRADUATION_PLAN_COMPLIANCE.md`

### Search Notes

- `CASE-061` had an exact Wikimedia Commons cover candidate: `File:New national stadium tokyo 1.jpg`.
- `CASE-063` had Wikimedia results for Aino Tsuchiyama, but they appear to be older roadside-station imagery rather than a safe exact cover for the 2025 Kengo Kuma project; not used.
- `CASE-070` returned unrelated Wikimedia document results; not used.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 70 issues, 35 site types, 70 cases.
- Passed: `npm run graduation:audit`.
  - Output: 70 issues, 35 site types, 70 cases.
  - Problems: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
  - Output: 2 test files, 6 tests passed.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
  - Output: 10 tests passed.
- Local image-proxy spot check for `CASE-061`:
  - URL returned HTTP 200.
  - content type: `image/jpeg`.
- Current publication counts:
  - issues: 30 published / 40 draft
  - site types: 20 published / 15 draft
  - cases: 34 published / 36 draft
- Current source/image status:
  - issues with source URLs: 70/70
  - cases with source URLs: 70/70
  - placeholder images: 37/70
  - explicit image source URLs: 33/70

### Remaining Known Risk

- 37 case records still use placeholders.
- `CASE-062` through `CASE-070` still need better image-source investigation before publication.
- A rendered QA pass should be run after any larger batch of case promotions.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_DRAFT_REVIEW.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue safe-image review for high-value draft cases, especially official/Wikimedia-searchable public buildings, then continue toward 80 issues / 40 site types / 80 cases.

## 2026-07-03 — Graduation High-Value Case Image Review Pass 03

### Scope

- Continued safe-image review for high-value placeholder cases.
- Focused on public buildings and already-published cases that made the case library feel unfinished.
- Stopped broad Wikimedia querying when rate limiting appeared.

### Implemented

- Added Wikimedia Commons image URLs, image source URLs, license fields, credit fields, and image notes for:
  - `CASE-015` Minamisanriku 311 Memorial
  - `CASE-028` Shiroiya Hotel
  - `CASE-034` KAIT Workshop
- Promoted:
  - `CASE-028` from `draft` to `published`
  - `CASE-034` from `draft` to `published`
- Kept `CASE-015` as `published`, replacing only the placeholder image metadata.
- Regenerated:
  - `src/content/graduation/cases.json`
  - `public/data/graduation/cases.json`
  - `public/data/graduation/cases.csv`
  - `docs/GRADUATION_CONTENT_QA.md`
- Updated:
  - `docs/GRADUATION_DRAFT_REVIEW.md`
  - `docs/GRADUATION_PLAN_COMPLIANCE.md`

### Search Notes

- `CASE-015` exact Wikimedia result used: `File:Minamisanriku 311 Memorial.jpg`.
- `CASE-028` exact Wikimedia result used: `File:Shiroiya Hotel.jpg`.
- `CASE-034` exact Wikimedia result used: `File:KAIT Workshop Junya Ishigami internal view.JPG`.
- `CASE-001`, `CASE-006`, `CASE-008`, `CASE-027`, and `CASE-033` did not produce safe exact results.
- `CASE-038`, `CASE-039`, `CASE-057`, and `CASE-059` hit Wikimedia rate limits and should be retried later with slower requests.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 70 issues, 35 site types, 70 cases.
- Passed: `npm run graduation:audit`.
  - Output: 70 issues, 35 site types, 70 cases.
  - Problems: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
  - Output: 2 test files, 6 tests passed.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
  - Output: 10 tests passed.
- Local image-proxy spot check:
  - `CASE-015` returned HTTP 200, `image/jpeg`.
  - `CASE-028` returned HTTP 200, `image/jpeg`.
  - `CASE-034` returned HTTP 200, `image/png`.
- Current publication counts:
  - issues: 30 published / 40 draft
  - site types: 20 published / 15 draft
  - cases: 36 published / 34 draft
- Current source/image status:
  - issues with source URLs: 70/70
  - cases with source URLs: 70/70
  - placeholder images: 34/70
  - explicit image source URLs: 36/70

### Remaining Known Risk

- 34 case records still use placeholders.
- Some remaining candidates need slower Wikimedia retries because the first batch hit API rate limits.
- A rendered QA pass should be run after any larger batch of case promotions.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_DRAFT_REVIEW.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Retry safe-image review later with slower Wikimedia requests for `CASE-038`, `CASE-039`, `CASE-057`, and `CASE-059`; otherwise continue toward 80 issues / 40 site types / 80 cases.

## 2026-07-03 — Graduation Content Expansion Checkpoint 80/40/80

### Scope

- Retried the previously rate-limited Wikimedia searches slowly for `CASE-038`, `CASE-039`, `CASE-057`, and `CASE-059`.
- No safe exact Wikimedia results were found for those four cases.
- Continued plan-first expansion from 70 issues / 35 site types / 70 cases to 80 issues / 40 site types / 80 cases.

### Implemented

- Added 10 new source-linked issue records:
  - `ISSUE-071` port warehouses and waterfront activity
  - `ISSUE-072` wooden dense-neighborhood micro-renewal
  - `ISSUE-073` under-rail art residency and safety regeneration
  - `ISSUE-074` bookstore cultural complexes as third places
  - `ISSUE-075` public bathhouses as community health nodes
  - `ISSUE-076` one-stop community public centers
  - `ISSUE-077` urban farming and food education offices
  - `ISSUE-078` old bathhouse regeneration and youth return
  - `ISSUE-079` gentle renewal of existing libraries/community centers
  - `ISSUE-080` market and civic services as everyday public space
- Added 5 new site-type records:
  - `SITE-036` port warehouse renewal belt
  - `SITE-037` wooden dense-neighborhood micro-renewal area
  - `SITE-038` under-rail art residency belt
  - `SITE-039` public bathhouse surroundings
  - `SITE-040` urban agriculture and food education spaces
- Added 10 new draft case records:
  - `CASE-071` Yokohama Red Brick Warehouse
  - `CASE-072` HAGISO and HANARE
  - `CASE-073` Koganecho Artist-in-Residence
  - `CASE-074` Daikanyama T-SITE
  - `CASE-075` Komaeyu Public Bathhouse
  - `CASE-076` Kozakai Kifukan Community Center
  - `CASE-077` Pasona Urban Farm
  - `CASE-078` Koganeyu
  - `CASE-079` Ebina City Arima Library and Community Center
  - `CASE-080` Market and Civic Offices
- Updated `tests/e2e/core-routes.spec.ts` so the graduation export test checks the new 80-record checkpoint and `ISSUE-080` / `CASE-080`.
- Regenerated:
  - `src/content/graduation/issues.json`
  - `src/content/graduation/site-types.json`
  - `src/content/graduation/cases.json`
  - public CSV/JSON exports under `public/data/graduation/`
  - `docs/GRADUATION_CONTENT_QA.md`
- Updated:
  - `docs/GRADUATION_DRAFT_REVIEW.md`
  - `docs/GRADUATION_PLAN_COMPLIANCE.md`

### Validation

- Passed: `npm run graduation:data`.
  - Output: 80 issues, 40 site types, 80 cases.
- Passed: `npm run graduation:audit`.
  - Output: 80 issues, 40 site types, 80 cases.
  - Problems: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
  - Output: 2 test files, 6 tests passed.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
  - Output: 10 tests passed.
- Current publication counts:
  - issues: 30 published / 50 draft
  - site types: 20 published / 20 draft
  - cases: 36 published / 44 draft
- Current source/image status:
  - issues with source URLs: 80/80
  - cases with source URLs: 80/80
  - placeholder images: 44/80
  - explicit image source URLs: 36/80

### Remaining Known Risk

- The 10 newly added cases use placeholders by design until safe cover images are confirmed.
- The newly added issues and site types should remain draft until a publication review pass checks wording and source strength.
- A rendered QA pass is still needed after promoting any larger batch of new draft records.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/issues.json`
- `public/data/graduation/site_types.csv`
- `public/data/graduation/site_types.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_DRAFT_REVIEW.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- `tests/e2e/core-routes.spec.ts`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Review `CASE-071` through `CASE-080` for safe cover images and source confidence, then continue toward 90 issues / 45 site types / 90 cases.

## 2026-07-04 — Graduation New Draft Case Image Review Pass 02

### Scope

- Reviewed `CASE-071` through `CASE-080` for safe cover images and source confidence.
- Used Wikimedia Commons/open-license search first, following the source policy.

### Implemented

- Added Wikimedia Commons image URLs, image source URLs, license fields, credit fields, and image notes for:
  - `CASE-071` Yokohama Red Brick Warehouse
  - `CASE-074` Daikanyama T-SITE
- Promoted:
  - `CASE-071` from `draft` to `published`
  - `CASE-074` from `draft` to `published`
- Kept `CASE-072`, `CASE-073`, `CASE-075`, `CASE-076`, `CASE-077`, `CASE-078`, `CASE-079`, and `CASE-080` as `draft` with placeholders because no safe exact Wikimedia image was confirmed in this pass.
- Regenerated:
  - `src/content/graduation/cases.json`
  - `public/data/graduation/cases.json`
  - `public/data/graduation/cases.csv`
  - `docs/GRADUATION_CONTENT_QA.md`
- Updated:
  - `docs/GRADUATION_DRAFT_REVIEW.md`
  - `docs/GRADUATION_PLAN_COMPLIANCE.md`

### Search Notes

- `CASE-071` exact Wikimedia result used: `File:Yokohama Red Brick Warehouse 2012.JPG`.
- `CASE-074` exact Wikimedia result used: `File:Daikanyama T-SITE 2016-04-04.jpg`.
- Other `CASE-071` through `CASE-080` candidates returned no safe exact Wikimedia results.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 80 issues, 40 site types, 80 cases.
- Passed: `npm run graduation:audit`.
  - Output: 80 issues, 40 site types, 80 cases.
  - Problems: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
  - Output: 2 test files, 6 tests passed.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
  - Output: 10 tests passed.
- Local image-proxy spot check:
  - `CASE-071` returned HTTP 200, `image/jpeg`.
  - `CASE-074` returned HTTP 200, `image/jpeg`.
- Current publication counts:
  - issues: 30 published / 50 draft
  - site types: 20 published / 20 draft
  - cases: 38 published / 42 draft
- Current source/image status:
  - issues with source URLs: 80/80
  - cases with source URLs: 80/80
  - placeholder images: 42/80
  - explicit image source URLs: 38/80

### Remaining Known Risk

- 42 case records still use placeholders.
- The remaining `CASE-072` through `CASE-080` draft cases need official or open-license image alternatives before publication.
- A rendered QA pass should be run after any larger batch of case promotions.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_DRAFT_REVIEW.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue safe-image review for high-value draft cases, then continue toward 90 issues / 45 site types / 90 cases.

## 2026-07-04 — Graduation Content Expansion Checkpoint 90/45/90

### Scope

- Advanced the Graduation Inspiration Library toward the V1 formal content target.
- Added source-linked draft content only; no new records were promoted to `published`.
- Kept the work inside the static-first CSV -> JSON -> public export workflow.

### Implemented

- Added new issue records:
  - `ISSUE-081` through `ISSUE-090`
- Added new site-type records:
  - `SITE-041` through `SITE-045`
- Added new case records:
  - `CASE-081` through `CASE-090`
- New content themes:
  - disaster recovery civic centers
  - public kitchens and local food culture
  - island vacant-house regeneration
  - campus/community maker learning
  - non-hospital patient/family support
  - caregiver rest and senior day-care living rooms
  - child health consultation in reused city-center buildings
  - small-roof community plazas
  - circular repair workshops
  - post-disaster Home-for-All style common rooms
- Updated e2e export assertions from 80 records to 90 records.
- Regenerated:
  - `src/content/graduation/issues.json`
  - `src/content/graduation/site-types.json`
  - `src/content/graduation/cases.json`
  - `public/data/graduation/issues.csv`
  - `public/data/graduation/issues.json`
  - `public/data/graduation/site_types.csv`
  - `public/data/graduation/site_types.json`
  - `public/data/graduation/cases.csv`
  - `public/data/graduation/cases.json`
  - `docs/GRADUATION_CONTENT_QA.md`
- Updated:
  - `docs/GRADUATION_DRAFT_REVIEW.md`
  - `docs/GRADUATION_PLAN_COMPLIANCE.md`

### Source Notes

- New case/source pages include Sukagawa Community Center, YOKOTE-no-WAGAYA, Shima Kitchen, The Learning Architecture for Learners, Maggie's Tokyo, Long House with an Engawa, Kitakami Children Health and Support Center, Towada Community Plaza, Het Hof van Cartesius, and HOME-FOR-ALL in Rikuzentakata.
- New case records use placeholders intentionally until an open-license or otherwise safe cover-image review is completed.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 90 issues, 45 site types, 90 cases.
- Passed: `npm run graduation:audit`.
  - Output: 90 issues, 45 site types, 90 cases.
  - Problems: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
  - Output: 2 test files, 6 tests passed.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
  - Output: 10 tests passed.
- Current publication counts:
  - issues: 30 published / 60 draft
  - site types: 20 published / 25 draft
  - cases: 38 published / 52 draft
- Current source/image status:
  - issues with source URLs: 90/90
  - cases with source URLs: 90/90
  - placeholder images: 52/90
  - explicit image source URLs: 38/90

### Remaining Known Risk

- The 10 newly added cases use placeholders by design until safe cover images are confirmed.
- The newly added issues and site types should remain draft until a publication review pass checks wording and source strength.
- A rendered QA pass should be run after any larger batch of case promotions or visual changes.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/issues.json`
- `public/data/graduation/site_types.csv`
- `public/data/graduation/site_types.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_DRAFT_REVIEW.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- `tests/e2e/core-routes.spec.ts`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Review `CASE-081` through `CASE-090` for safe cover images/source strength, then finish the formal target at 100 issues / 50 site types / 100 cases.

## 2026-07-04 — Graduation New Draft Case Image Review Pass 03

### Scope

- Reviewed `CASE-081` through `CASE-090` for safe cover images and publication confidence.
- Used Wikimedia Commons/open-license search first, following the source policy.
- Avoided using merely adjacent images when they did not clearly show the project itself.

### Implemented

- Added Wikimedia Commons image URL, image source URL, license field, credit field, and image note for:
  - `CASE-081` Sukagawa Community Center tette
- Promoted:
  - `CASE-081` from `draft` to `published`
- Kept `CASE-082`, `CASE-083`, `CASE-084`, `CASE-085`, `CASE-086`, `CASE-087`, `CASE-088`, `CASE-089`, and `CASE-090` as `draft` with placeholders.
- Regenerated:
  - `src/content/graduation/cases.json`
  - `public/data/graduation/cases.json`
  - `public/data/graduation/cases.csv`
  - `docs/GRADUATION_CONTENT_QA.md`
- Updated:
  - `docs/GRADUATION_DRAFT_REVIEW.md`
  - `docs/GRADUATION_PLAN_COMPLIANCE.md`

### Search Notes

- `CASE-081` exact Wikimedia result used: `File:Sukagawa Citizen Exchange Center Tette.jpg`.
- `CASE-090` returned open Wikimedia images of the Venice Biennale Japan Pavilion exhibition about Home-for-All, but not a safe exact cover of the built Rikuzentakata project.
- `CASE-089` returned Commons event photos at Het Hof van Cartesius, but not a strong architectural cover of the circular workspace itself.
- Other `CASE-082` through `CASE-090` candidates returned no safe exact Wikimedia result in this pass.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 90 issues, 45 site types, 90 cases.
- Passed: `npm run graduation:audit`.
  - Output: 90 issues, 45 site types, 90 cases.
  - Problems: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
  - Output: 2 test files, 6 tests passed.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
  - Output: 10 tests passed.
- Local image-proxy spot check:
  - `CASE-081` returned HTTP 200, `image/jpeg`.
- Current publication counts:
  - issues: 30 published / 60 draft
  - site types: 20 published / 25 draft
  - cases: 39 published / 51 draft
- Current source/image status:
  - issues with source URLs: 90/90
  - cases with source URLs: 90/90
  - placeholder images: 51/90
  - explicit image source URLs: 39/90

### Remaining Known Risk

- 51 case records still use placeholders.
- `CASE-082` through `CASE-090` still need official/open-license image alternatives before publication, except `CASE-081`.
- A rendered QA pass should be run after any larger batch of case promotions or visual changes.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_DRAFT_REVIEW.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue safe-image review for remaining high-value draft cases, then finish expansion toward 100 issues / 50 site types / 100 cases.

## 2026-07-04 — Graduation Content Expansion Checkpoint 100/50/100

### Scope

- Completed the V1 formal content quantity target for the Graduation Inspiration Library.
- Added source-linked draft content only; no new records were promoted to `published`.
- Kept the work inside the static-first CSV -> JSON -> public export workflow.

### Implemented

- Added new issue records:
  - `ISSUE-091` through `ISSUE-100`
- Added new site-type records:
  - `SITE-046` through `SITE-050`
- Added new case records:
  - `CASE-091` through `CASE-100`
- New content themes:
  - multicultural resident support and civic belonging
  - night study and non-commercial safe learning spaces
  - women and youth safety/support spaces
  - hospitals and care facilities translated into neighborhood scale
  - stations as city gateways rather than only transit machines
  - industrial heritage reuse
  - next-generation libraries as civic living rooms
  - disaster recovery cultural centers
  - cross-cultural garden and nature education
  - public building entrances as open city rooms
- Updated e2e export assertions from 90 records to 100 records.
- Regenerated:
  - `src/content/graduation/issues.json`
  - `src/content/graduation/site-types.json`
  - `src/content/graduation/cases.json`
  - `public/data/graduation/issues.csv`
  - `public/data/graduation/issues.json`
  - `public/data/graduation/site_types.csv`
  - `public/data/graduation/site_types.json`
  - `public/data/graduation/cases.csv`
  - `public/data/graduation/cases.json`
  - `docs/GRADUATION_CONTENT_QA.md`
- Updated:
  - `docs/GRADUATION_DRAFT_REVIEW.md`
  - `docs/GRADUATION_PLAN_COMPLIANCE.md`
  - `tests/e2e/core-routes.spec.ts`

### Source Notes

- New case/source pages include Maruhon MakiArt Terrace Ishinomaki Cultural Center, Ishikawa Prefectural Library, Seijo Kinoshita Hospital, Takanawa Gateway Station, Nakajima Library, Japanese American Community and Cultural Center, Women's Opportunity Center Rwanda, Helsinki Central Library Oodi, Tate Modern, and Portland Japanese Garden Cultural Village.
- New case records use placeholders intentionally until an open-license or otherwise safe cover-image review is completed.

### Validation

- Passed: `npm run graduation:data`.
  - Output: 100 issues, 50 site types, 100 cases.
- Passed: `npm run graduation:audit`.
  - Output: 100 issues, 50 site types, 100 cases.
  - Problems: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
  - Output: 2 test files, 6 tests passed.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
  - Output: 10 tests passed.
- Current publication counts:
  - issues: 30 published / 70 draft
  - site types: 20 published / 30 draft
  - cases: 39 published / 61 draft
- Current source/image status:
  - issues with source URLs: 100/100
  - cases with source URLs: 100/100
  - placeholder images: 61/100
  - explicit image source URLs: 39/100

### Remaining Known Risk

- The 10 newly added cases use placeholders by design until safe cover images are confirmed.
- The newly added issues and site types should remain draft until a publication review pass checks wording and source strength.
- The V1 quantity target is complete, but publication quality still depends on case image review, wording review, and rendered user-simulation QA.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/issues.json`
- `public/data/graduation/site_types.csv`
- `public/data/graduation/site_types.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_DRAFT_REVIEW.md`
- `docs/GRADUATION_PLAN_COMPLIANCE.md`
- `tests/e2e/core-routes.spec.ts`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Stop raw content expansion and shift to quality: safe-image review, wording/source review, and user-simulation QA on the full 100/50/100 dataset.

## 2026-07-04 — Graduation Full User Simulation QA Pass 10

### Scope

- Simulated a blank-slate graduation-design student using the completed 100/50/100 Graduation Inspiration Library.
- Flow tested: home -> issue list -> search -> issue detail -> site detail -> case detail -> random inspiration -> JSON export -> mobile issue list.
- Saved audit screenshots and notes outside the repo at `/tmp/archistory-graduation-audit-20260704/`.

### Implemented

- Fixed a React hydration mismatch on `/zh/graduation/random`.
- Cause: the random page used a client/server-changing initial seed during render.
- Change: the random page now starts with a stable seed and only uses client time after the user clicks `再来一次`.
- Updated:
  - `src/components/GraduationInspirationApp.tsx`
  - `docs/USER_SIMULATION_LOG.md`

### Evidence

- `/tmp/archistory-graduation-audit-20260704/01-home.png`
- `/tmp/archistory-graduation-audit-20260704/02-issues-list.png`
- `/tmp/archistory-graduation-audit-20260704/03-issues-filtered.png`
- `/tmp/archistory-graduation-audit-20260704/04-issue-detail.png`
- `/tmp/archistory-graduation-audit-20260704/05-site-detail.png`
- `/tmp/archistory-graduation-audit-20260704/06-case-detail.png`
- `/tmp/archistory-graduation-audit-20260704/07-random.png`
- `/tmp/archistory-graduation-audit-20260704/08-mobile-issues.png`
- `/tmp/archistory-graduation-audit-20260704/notes.md`

### Validation

- In-app Browser was attempted first, but timed out/reset during site-detail navigation. Fallback used: regular Playwright against localhost.
- Clean Playwright user-simulation run after the fix:
  - 0 console errors/warnings.
  - `再来一次` changed the random result.
  - JSON export download triggered successfully.
  - mobile issue list had no horizontal overflow.
- Passed: `npm run graduation:audit`.
  - Output: 100 issues, 50 site types, 100 cases.
  - Problems: 0.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
  - Output: 2 test files, 6 tests passed.
- Passed: `npx playwright test tests/e2e/core-routes.spec.ts`.
  - Output: 10 tests passed.

### Findings

- No blocking route/runtime bug remains in the tested flow.
- The issue list is now functionally complete but dense: long tag and building-type select options create too much decision load.
- Placeholder case images remain the largest trust/visual-quality weakness.
- Random inspiration works, but the output could be made more clearly action-oriented.

### Rollback Scope

If rejected, revert only:

- `src/components/GraduationInspirationApp.tsx`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Reduce decision load on the issue list filters: replace the long raw tag/building-type dropdown experience with a smaller set of high-value grouped filters or visible quick filters.

## 2026-07-04 — Graduation Issue Filter Simplification

### Scope

- Continued the V1 Graduation Inspiration Library quality pass after the full 100/50/100 content target.
- Focused on the issue list decision-load problem found in Simulation 10.
- Target surface: `/zh/graduation/issues`.

### Implemented

- Added a curated quick-filter row for high-value issue tags such as `老龄化`, `空屋`, `儿童`, `防灾`, `多文化`, and `图书馆`.
- Kept search and JSON export visible on the first screen.
- Moved the long tag, site type, and building type dropdowns into a collapsed `更多筛选` section.
- Preserved advanced filter state by automatically opening `更多筛选` when an advanced filter is active.
- Updated the core route E2E to follow the rendered user path: open `更多筛选` before selecting advanced filters.
- Updated:
  - `src/components/GraduationInspirationApp.tsx`
  - `tests/e2e/core-routes.spec.ts`
  - `docs/USER_SIMULATION_LOG.md`

### Evidence

- `/tmp/archistory-graduation-filter-qa-20260704/01-issues-filter-simplified.png`
- `/tmp/archistory-graduation-filter-qa-20260704/02-quick-tag-active.png`
- `/tmp/archistory-graduation-filter-qa-20260704/03-more-filters-open.png`
- `/tmp/archistory-graduation-filter-qa-20260704/04-mobile-filter-simplified.png`

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run graduation:audit`.
- Passed: `npm run test:unit`.
- Passed after test-path update: `npx playwright test tests/e2e/core-routes.spec.ts`.
- Playwright rendered QA against `http://localhost:3131/zh/graduation/issues`:
  - 0 console errors/warnings.
  - Quick tag click updated URL to `?tag=老龄化`.
  - Advanced filters remained available under `更多筛选`.
  - Mobile issue filter view had no horizontal overflow.

### Remaining Known Risk

- Quick-filter labels come from Chinese seed keywords, so the UI is not yet fully localized for English/Japanese.
- This pass did not review keyboard-only or screen-reader behavior beyond keeping native controls.
- Placeholder case images remain the largest visual-trust issue.

### Rollback Scope

If rejected, revert only:

- `src/components/GraduationInspirationApp.tsx`
- `tests/e2e/core-routes.spec.ts`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Keep improving trust rather than adding more feature surface: review safe cover images for the highest-value published cases first, then run another user simulation from issue detail to case detail.

## 2026-07-04 — Graduation High-Value Case Image Trust Pass

### Scope

- Continued the Graduation Inspiration Library quality pass without adding new feature surface.
- Focused on high-reference published cases that still used the generic placeholder image.
- Target records:
  - `CASE-001` Share Kanazawa
  - `CASE-003` ROKI Global Innovation Center ROOG
  - `CASE-004` Naoshima Honmura Lounge and Archive
  - `CASE-006` Fuji Kindergarten
  - `CASE-008` Onagawa Station and Yupo'po

### Implemented

- Replaced `CASE-008` placeholder with an exact Wikimedia Commons exterior image of JR East Onagawa Station.
- Added image attribution fields for `CASE-008`:
  - `image_source_url`: Wikimedia Commons file page.
  - `image_license`: `CC BY-SA 4.0`.
  - `image_credit`: `Photo: Mister0124 / Wikimedia Commons`.
- Added short image-review notes to `CASE-001`, `CASE-003`, `CASE-004`, and `CASE-006` explaining that no exact reusable cover image was confirmed.
- Rebuilt graduation JSON and public exports from `content/cases.csv`.
- Improved case-image accessibility by changing the `CaseVisual` image alt text from empty to the case name.
- Added `loading={compact ? 'lazy' : 'eager'}` to case visuals so detail images load eagerly while list thumbnails stay lazy.
- Updated:
  - `content/cases.csv`
  - `src/content/graduation/cases.json`
  - `public/data/graduation/cases.csv`
  - `public/data/graduation/cases.json`
  - `docs/GRADUATION_CONTENT_QA.md`
  - `src/components/GraduationInspirationApp.tsx`
  - `docs/USER_SIMULATION_LOG.md`

### Evidence

- `/tmp/archistory-graduation-case-image-qa-20260704/case-008-onagawa-image-alt-fixed.png`
- `/tmp/archistory-graduation-case-image-qa-20260704/case-008-onagawa-mobile.png`
- `/tmp/archistory-graduation-case-image-qa-20260704/notes-alt-fixed.json`

### Validation

- Passed: `npm run graduation:data`.
- Passed: `npm run graduation:audit`.
- Rendered QA against `http://localhost:3132/zh/graduation/cases/CASE-008`:
  - page status 200.
  - image loaded with natural size 828x552.
  - image alt text is the case name.
  - source link renders as `图片来源 · CC BY-SA 4.0`.
  - 0 console errors/warnings after setting the detail image to eager loading.
  - mobile case detail has no horizontal overflow.
- Content QA now reports:
  - cases using placeholder image: 60/100.
  - cases with explicit image source URL: 40/100.

### Remaining Known Risk

- Four high-reference published cases still use placeholders because no exact reusable cover image was confirmed.
- The source/credit panel is accurate but visually heavy; it can be made quieter later.
- The pass used Commons/API and targeted web checks, not a full manual copyright review of all 100 cases.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `docs/GRADUATION_CONTENT_QA.md`
- `src/components/GraduationInspirationApp.tsx`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue the trust pass on draft cases with high future value, or make the case source panel visually quieter while keeping source attribution visible.

## 2026-07-04 — Graduation Bulk Placeholder Image Audit And Fallback Fix

### Scope

- Expanded the image trust pass from a short high-value sample to all remaining placeholder case records.
- Ranked 60 placeholder cases by status and issue-reference count.
- Ran batch Wikimedia Commons candidate search plus a second Japanese-name/alias search for high-value Japanese projects.
- Kept the project rule conservative: exact project/facility image and clear license metadata required before adding image fields.

### Implemented

- Added source-safe Commons metadata to:
  - `CASE-008` Onagawa Station and Yupo'po
  - `CASE-027` Yusuhara Community Library Yururi Yusuhara
  - `CASE-033` Yu no Eki Ohyu
  - `CASE-063` Roadside Station Aino Tsuchiyama
  - `CASE-092` Ishikawa Prefectural Library
  - `CASE-094` Takanawa Gateway Station
  - `CASE-098` Helsinki Central Library Oodi
  - `CASE-099` Tate Modern
- Added a rejection note to `CASE-056` because the Commons candidate described another Tainan park, not MVRDV Tainan Spring.
- Added `docs/GRADUATION_IMAGE_REVIEW.md` to preserve accepted/deferred/rejected image decisions.
- Changed `src/app/api/image-proxy/route.ts` fallback from a transparent 1x1 PNG to a visible PNG placeholder.
- Changed `CaseVisual` to bypass Next image optimization for proxied case images, preventing transient 1x1 fallback pixels from being cached by the optimizer.
- Confirmed `CASE-063` renders a real Commons image under current rate-limit conditions.

### Evidence

- Candidate search report: `/tmp/archistory-commons-placeholder-audit-20260704/commons-candidates.md`
- Rendered QA notes: `/tmp/archistory-graduation-bulk-image-qa-20260704/after-png-fallback/notes.json`
- Real rendered image example: `/tmp/archistory-graduation-bulk-image-qa-20260704/after-png-fallback/CASE-063.png`
- Fallback rendered example: `/tmp/archistory-graduation-bulk-image-qa-20260704/after-png-fallback/CASE-092.png`

### Validation

- Passed: `npm run graduation:data`.
- Passed: `npm run graduation:audit`.
- Content QA now reports:
  - cases using placeholder image: 53/100.
  - cases with explicit image source URL: 47/100.
- Rendered QA against `http://localhost:3134/zh/graduation/cases/*`:
  - selected case pages returned 200.
  - image alt text matched case titles.
  - proxy fallback now renders as a visible PNG placeholder rather than a blank 1x1 pixel.
  - `CASE-063` rendered a real 1600x1200 Commons image.
  - mobile width remained within the 390px viewport.

### Rejected Or Deferred

- `CASE-006` Fuji Kindergarten: Commons search returned similarly named kindergartens outside the target Tezuka Architects Tokyo project.
- `CASE-037` / `CASE-090` Home-for-All Rikuzentakata: Commons search returned Venice Biennale exhibition images, not a safe exact cover of the built project.
- `CASE-056` Tainan Spring: Commons image described Barclay Memorial Park, not MVRDV Tainan Spring.
- `CASE-097` Women's Opportunity Center Rwanda and `CASE-100` Portland Japanese Garden Cultural Village: Commons search returned unrelated PDFs/posters.

### Remaining Known Risk

- Several accepted Commons image URLs currently render the visible fallback because Wikimedia returned upstream 429 during QA.
- The most durable next step is to download accepted Commons images into local `public/images/graduation/cases/` assets after the rate limit resets.
- `CASE-063` is a same-facility image for Roadside Station Aino Tsuchiyama, not proof of the exact 2025 intervention.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `src/app/api/image-proxy/route.ts`
- `src/components/GraduationInspirationApp.tsx`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Wait for Wikimedia rate limits to reset, then localize the accepted Commons images into `public/images/graduation/cases/` so rendered case pages do not depend on remote image availability.

## 2026-07-04 — Graduation Accepted Commons Image Localization

### Scope

- Converted the accepted Commons case-image decisions into a repeatable local-asset workflow.
- Kept the conservative source policy: only already-accepted Commons records are eligible for download.
- Preserved source, license, and credit metadata in the dataset after switching image URLs to local paths.

### Implemented

- Added `content/graduation_image_manifest.json` for accepted Commons image localization.
- Added `scripts/localize-graduation-case-images.mjs` with dry-run and apply behavior.
- Added package scripts:
  - `npm run graduation:images:dry-run`
  - `npm run graduation:images:localize`
- Localized five accepted case images into `public/images/graduation/cases/`:
  - `CASE-008`
  - `CASE-027`
  - `CASE-033`
  - `CASE-063`
  - `CASE-092`
- Rebuilt CSV-derived source JSON and public data exports.

### Validation

- Passed: `npm run graduation:images:dry-run`.
- Passed: `npm run graduation:data`.
- Verified the five local files as real JPEGs with non-placeholder dimensions.

### Remaining Known Risk

- `CASE-094`, `CASE-098`, and `CASE-099` are still remote because Wikimedia returned upstream 429 during localization.
- Rendered desktop/mobile QA still needs to run after this data and script pass.

### Rollback Scope

If rejected, revert only:

- `content/graduation_image_manifest.json`
- `scripts/localize-graduation-case-images.mjs`
- `package.json`
- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `public/images/graduation/cases/`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Run full validation and rendered QA against both localized images and the remaining remote/fallback cases.

## 2026-07-04 — Graduation Case Detail Paint QA Fix

### Scope

- Verified the case detail pages from a real user viewport, not only from data and DOM checks.
- Focused on the Graduation Inspiration Library case pages touched by the image-localization work.

### Implemented

- Fixed first-viewport paint instability by changing `.page-enter` and `.fade-in` in `src/app/globals.css` to use `animation-fill-mode: both`.
- Confirmed `CASE-033` paints a local image and source panel on desktop.
- Confirmed `CASE-094` paints the visible fallback while its accepted Commons image remains remote.
- Confirmed `CASE-092` paints a local image on mobile without horizontal overflow.

### Evidence

- `/tmp/archistory-graduation-local-image-qa-20260704-after-page-enter-fix/desktop-case-033-local.png`
- `/tmp/archistory-graduation-local-image-qa-20260704-after-page-enter-fix/desktop-case-094-remote-or-fallback.png`
- `/tmp/archistory-graduation-local-image-qa-20260704-after-page-enter-fix/mobile-case-092-local.png`

### Validation

- Playwright desktop and mobile rendered QA passed on `http://localhost:3135`.
- Console health on `localhost`: 0 error/warn events.
- Desktop local image: `CASE-033`, natural size 828x466.
- Desktop remote/fallback image: `CASE-094`, visible fallback natural size 120x72.
- Mobile local image: `CASE-092`, body width 390px and document width 390px.
- Passed final stack after the paint fix:
  - `npm run graduation:images:dry-run`
  - `npm run graduation:data`
  - `npm run graduation:audit`
  - `npm run typecheck`
  - `npm run lint`
  - `npm run test:unit`
  - `npx playwright test tests/e2e/core-routes.spec.ts`

### Remaining Known Risk

- Browser plugin DOM checks worked, but its screenshot surface showed a stale blank viewport; Playwright screenshots were used as the reliable visual evidence for this pass.
- Three accepted Commons images are still remote until Wikimedia rate limits reset.

### Rollback Scope

If rejected, revert only:

- `src/app/globals.css`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rerun `npm run graduation:images:localize` later to pick up `CASE-094`, `CASE-098`, and `CASE-099` after Wikimedia stops returning 429.

## 2026-07-04 — Graduation Case Render Regression Test

### Scope

- Added an automated guard for the case detail paint issue found during rendered QA.
- Focused the test on local assets so the default e2e suite does not depend on Wikimedia availability.

### Implemented

- Added `tests/e2e/graduation-case-render.spec.ts`.
- Desktop coverage:
  - Opens `/zh/graduation/cases/CASE-033`.
  - Verifies title, local image URL, image dimensions, attribution link, and `.page-enter` animation fill mode.
  - Screenshots the title region and counts dark pixels with an in-test PNG decoder to catch blank first-viewport regressions.
- Mobile coverage:
  - Opens `/zh/graduation/cases/CASE-092` at 390x844.
  - Verifies title, attribution, image placement, and no horizontal overflow.

### Validation

- Passed: `npx playwright test tests/e2e/graduation-case-render.spec.ts`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npx playwright test`.
- Full e2e status: 12/12 passed.

### Remaining Known Risk

- The pixel check is intentionally narrow: it protects the first title region, not the entire page.
- Remote/fallback case rendering is still manually QA-covered, not in default e2e, to avoid network-rate-limit flakiness.

### Rollback Scope

If rejected, revert only:

- `tests/e2e/graduation-case-render.spec.ts`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue the source-safe image trust pass by searching for exact, license-clear images for the highest-value remaining placeholders.

## 2026-07-04 — Graduation Accepted Commons Images Completed And Optimized

### Scope

- Finished localizing the accepted Commons image set.
- Added a repeatable optimization step for public graduation case images.
- Improved detail-page image presentation for portrait images.

### Implemented

- Re-ran `npm run graduation:images:localize` and successfully downloaded:
  - `CASE-094` Takanawa Gateway Station
  - `CASE-098` Helsinki Central Library Oodi
  - `CASE-099` Tate Modern
- Added `scripts/optimize-graduation-case-images.mjs`.
- Added `npm run graduation:images:optimize`.
- Optimized eight accepted Commons JPEGs to max edge 2000px and quality 82.
- Stripped EXIF/XMP/comment metadata from optimized JPEGs.
- Updated `CaseVisual` so:
  - compact case cards keep `object-fit: cover`.
  - case detail images use `object-fit: contain`.
  - Next Image receives explicit `width: 100%` and `height: 100%` so contain/cover is applied inside the visual frame.

### Validation

- `npm run graduation:images:dry-run` now reports all eight accepted Commons images as `already-local`.
- `file` reports the optimized files as clean JFIF JPEGs without EXIF/GPS text.
- Passed: `npm run graduation:audit`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npx playwright test`.
- Full e2e status: 12/12 passed.
- Rendered QA: `CASE-094` uses local `_next/image?...case-094-takanawa-gateway-station.jpg`, has `object-fit: contain`, source text `图片来源 · CC BY 2.0`, no console warnings/errors.

### Evidence

- `/tmp/archistory-graduation-localized-final-qa-20260704/desktop-case-094-local-contain-fixed.png`

### Remaining Known Risk

- `CASE-094` is now visible as a complete portrait photo, but the building is still visually distant; it is source-safe, not ideal as a strong architectural hero.
- 53 case records still use the generic placeholder image.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `public/images/graduation/cases/`
- `scripts/optimize-graduation-case-images.mjs`
- `package.json`
- `src/components/GraduationInspirationApp.tsx`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rank the remaining 53 placeholders by issue-reference value and continue image replacement only where exact, license-clear sources can be verified.

## 2026-07-04 — Graduation Placeholder Priority Plus Two More Local Images

### Scope

- Continued the source-safe Graduation case image pass after the accepted Commons localization work.
- Prioritized cases by publication status and issue-reference count rather than browsing randomly.
- Added a durable continuation queue so a future chat window can continue without repeating the same source checks.

### Implemented

- Added two exact or same-facility Commons images to the accepted/localized set:
  - `CASE-035` Kashiwa-no-ha Open Innovation Lab: `KOIL_GARDEN.jpg`, CC0, Souka Kinmei / Wikimedia Commons.
  - `CASE-070` Tonami Public Library: `Tonami_City_Tonami_Library_01.jpg`, CC BY-SA 4.0, Suikotei / Wikimedia Commons.
- Updated `content/cases.csv` with local image paths, source URLs, license, credit, and image-review notes.
- Updated `content/graduation_image_manifest.json` so both images are repeatably localizable.
- Rebuilt `src/content/graduation/cases.json` and `public/data/graduation/*`.
- Optimized the new images through the existing image pipeline.
- Added `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`.
- Updated `docs/GRADUATION_IMAGE_REVIEW.md` and `docs/USER_SIMULATION_LOG.md`.

### Current Image Status

- total cases: 100
- local graduation case images: 20
- remote images: 29
- generic placeholders: 51
- records with explicit source/license/credit metadata: 49

### Validation

- Passed: `npm run graduation:images:dry-run`.
- Passed: `npm run graduation:audit`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npx playwright test`.
- Full e2e status: 12/12 passed.

### Remaining Known Risk

- The top published placeholders still lack safe exact images:
  - `CASE-001` Share Kanazawa
  - `CASE-004` Naoshima Honmura Lounge and Archive
  - `CASE-006` Fuji Kindergarten
  - `CASE-003` ROKI Global Innovation Center ROOG
- `CASE-035` is a same-facility KOIL garden image, not necessarily the strongest hero view of the lab interior.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `public/images/graduation/cases/case-035-kashiwa-no-ha-open-innovation-lab.jpg`
- `public/images/graduation/cases/case-070-tonami-public-library.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue with the top 5 to 8 items in `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`, but only accept exact, license-clear images; otherwise leave the placeholder and write the rejection reason.

## 2026-07-04 — Graduation Commons Image Pass For Three Library/Community Cases

### Scope

- Continued the source-safe case-image pass from the placeholder priority queue.
- Accepted only exact Commons project/facility matches with visible license, author, and source metadata.
- Verified the rendered detail pages in the in-app browser after data rebuild.

### Implemented

- Added three localized Commons images:
  - `CASE-076` Kozakai Kifukan Community Center: `Kozakai_Kifukan_2021-05_ac_(1).jpg`, CC BY-SA 4.0, Asturio Cantabrio / Wikimedia Commons.
  - `CASE-079` Ebina City Arima Library and Community Center: `Ebina_City_Arima_Library_201510.JPG`, CC BY-SA 4.0, Oos~commonswiki / Wikimedia Commons.
  - `CASE-095` Nakajima Library Akita International University: `Inside_Nakajima_Library.jpg`, CC BY-SA 4.0, Mariwlqs / Wikimedia Commons.
- Used the Wikimedia 1280px derivative for `CASE-095` in `content/graduation_image_manifest.json` because the original file returned upstream 429 during localization.
- Updated `content/cases.csv` with local image paths, source URLs, licenses, credits, and image-review notes.
- Rebuilt `src/content/graduation/cases.json` and `public/data/graduation/*`.
- Optimized the three new JPEGs to max edge 2000px and removed EXIF/XMP metadata markers.
- Updated:
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 23
- remote images: 29
- generic placeholders: 48
- records with explicit source/license/credit metadata: 52

### Rendered QA

- Local dev URL: `http://localhost:3137`.
- Browser plugin path worked for DOM checks and screenshots in this pass.
- `CASE-076`, `CASE-079`, and `CASE-095` each rendered:
  - visible title
  - complete local `_next/image?.../images/graduation/cases/...` image
  - visible `图片来源 · CC BY-SA 4.0`
  - visible photo credit and source-safe review note
  - no browser error/warn logs

### Validation

- Passed before log entry: `npm run graduation:images:localize`.
- Passed before log entry: `npm run graduation:images:optimize`.
- Passed before log entry: `npm run graduation:data`.
- Passed after documentation update: `npm run graduation:images:dry-run`.
- Passed after documentation update: `npm run graduation:audit`.
- Passed after documentation update: `npm run typecheck`.
- Passed after documentation update: `npm run lint`.
- Passed after documentation update: `npm run test:unit`.
- Passed after documentation update: `npx playwright test`.
- Full e2e status: 12/12 passed.
- Note: the first parallel `npm run lint` attempt hit `ENOENT: test-results` while Playwright was creating/cleaning that directory in another process; rerunning `npm run lint` after Playwright completed passed.

### Remaining Known Risk

- Top published placeholders still need safe exact images and should not be filled with unrelated area photos:
  - `CASE-001` Share Kanazawa
  - `CASE-004` Naoshima Honmura Lounge and Archive
  - `CASE-006` Fuji Kindergarten
  - `CASE-003` ROKI Global Innovation Center ROOG
- `CASE-011` and `CASE-009` still have overly broad source URLs; fix the source target before another image search pass.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `public/images/graduation/cases/case-076-kozakai-kifukan-community-center.jpg`
- `public/images/graduation/cases/case-079-ebina-city-arima-library.jpg`
- `public/images/graduation/cases/case-095-nakajima-library-akita-international-university.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Improve broad source URLs for `CASE-011` and `CASE-009`, then run the next exact-image search batch for `CASE-013`, `CASE-011`, `CASE-009`, `CASE-010`, and `CASE-024`.

## 2026-07-04 — Graduation Source Cleanup Before Next Image Batch

### Scope

- Continued the source-safe case review pass for the Graduation Inspiration Library.
- Prioritized the V1 plan's case/source trust over forcing more visuals into the page.
- Fixed two broad case sources that could mislead future image search and student reading.

### Implemented

- Updated `CASE-009` from a broad Taipei city source to `Taipei New Immigrants Hall`, using the official facility page.
- Updated `CASE-011` from a broad MHLW source to `Toyama-style Day Care Service Centers`, using Toyama Prefecture's explanation of the Toyama-style day care model.
- Kept both cases on the generic placeholder because no exact, reusable facility/building image was confirmed.
- Recorded failed/deferred exact-image searches for:
  - `CASE-010` Kamiyama Valley Satellite Office Complex
  - `CASE-013` Kaze no Machi Miyabira
  - `CASE-024` AU Childcare Support Sasebo
  - `CASE-030` Mabi Reconstruction Disaster Prevention Park Bamboo Gate
- Rebuilt graduation JSON/public data from the CSV sources.
- Updated:
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 23
- remote images: 29
- generic placeholders: 48
- records with explicit source/license/credit metadata: 52

### Source Evidence

- `CASE-009`: official Taipei New Immigrants Hall page lists the facility sections and service pages.
- `CASE-011`: Toyama Prefecture explains Toyama-style day care as a small, community-rooted, renovated-house service model beginning in 1993.

### Validation

- Passed before log entry: `npm run graduation:data`.
- Passed before log entry: `npm run graduation:audit`.

### Remaining Known Risk

- The source trust is improved, but `CASE-009` and `CASE-011` still do not have exact reusable images.
- The next image candidates may have attractive official images, but they should stay placeholders unless reuse rights are clear.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Run a full verification pass, then continue content trust work by replacing weak draft cases with stronger plan-aligned precedents only when the source and image rights are both clear.

## 2026-07-04 — Graduation Bonus Track Source-Safe Image Pass

### Scope

- Continued the placeholder-priority image pass without using rights-unclear official or award-page images.
- Accepted only one new image after verifying that the source page explicitly allowed reuse.
- Added visible placeholder notes for unresolved candidates so blank image metadata does not look accidental.

### Implemented

- Added `CASE-038` BONUS TRACK Shimokitazawa to `content/graduation_image_manifest.json`.
- Localized the exact Bonus Track figure from an MDPI open-access article to:
  - `public/images/graduation/cases/case-038-bonus-track-shimokitazawa.jpg`
- Updated `content/cases.csv` with:
  - local image path
  - MDPI article source URL
  - `CC BY 4.0`
  - credit: `Photo by morinakayasuaki via Hiroki Nakajima / MDPI Sustainability`
  - source-safe image review note
- Added placeholder review notes for unresolved cases:
  - `CASE-010`
  - `CASE-013`
  - `CASE-024`
  - `CASE-030`
  - `CASE-064`
- Recorded that the Good Design Award `BONUS TRACK` page was rejected for image use because the page prohibits unauthorized copying of site text and images.
- Rebuilt graduation JSON/public data from the CSV sources.
- Updated:
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 24
- remote images: 29
- generic placeholders: 47
- records with explicit source/license/credit metadata: 53

### Source Evidence

- The MDPI article identifies `Figure 3` as `Bonus Track (photo by morinakayasuaki)`.
- The same article states that it is distributed under the Creative Commons Attribution `CC BY` license.
- The Good Design Award page was not used because it says unauthorized copying and replication of site text and images are strictly prohibited.

### Validation

- Passed before log entry: `npm run graduation:images:localize`.
- Passed before log entry: `npm run graduation:images:optimize`.
- Passed before log entry: `npm run graduation:data`.
- Passed before log entry: `npm run graduation:audit`.

### Remaining Known Risk

- MDPI's source image is 550x369, good enough for a case card and detail reference but not a high-resolution hero.
- `CASE-010`, `CASE-013`, `CASE-024`, `CASE-030`, and `CASE-064` still have placeholders because exact reusable images were not confirmed.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `public/images/graduation/cases/case-038-bonus-track-shimokitazawa.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Run full verification, then continue with `CASE-068`, `CASE-085`, `CASE-025`, `CASE-032`, and `CASE-048`, accepting only exact reusable sources or writing explicit rejection notes.

## 2026-07-04 — Graduation Miyashita Park Image Pass

### Scope

- Continued the source-safe image pass from the placeholder priority queue.
- Reviewed `CASE-068`, `CASE-085`, `CASE-025`, `CASE-032`, and `CASE-048`.
- Accepted only one image where the project/facility match and reuse license were clear.

### Implemented

- Added `CASE-068` Miyashita Park Atelier Bow-Wow to `content/graduation_image_manifest.json`.
- Localized the exact Miyashita Park dance plaza image from Wikimedia Commons to:
  - `public/images/graduation/cases/case-068-miyashita-park-atelier-bow-wow.jpg`
- Optimized the image from 1,977,150 bytes to 685,444 bytes and removed embedded EXIF markers.
- Updated `content/cases.csv` with:
  - local image path
  - Commons source URL
  - `CC BY 3.0`
  - `Photo: Douglas P. Perkins / Wikimedia Commons`
  - source-safe image review note
- Added rejection notes for unresolved cases:
  - `CASE-025` IRH Child Development Support
  - `CASE-032` Paper Partition System East Japan Earthquake
  - `CASE-048` Aranya Art Center
  - `CASE-085` Maggie's Tokyo
- Rebuilt graduation JSON/public data from CSV sources.
- Updated:
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 25
- remote images: 29
- generic placeholders: 46
- records with explicit source/license/credit metadata: 54

### Source Evidence

- Wikimedia Commons identifies the accepted image as the Miyashita Park dance plaza, dated 2013, own work by Douglas P. Perkins, licensed under `CC BY 3.0`.
- Piyon's Paper Partition article was rejected because it uses non-commercial reuse terms and secondary image sources.
- ArchDaily, official, or article sources for `CASE-025`, `CASE-048`, and `CASE-085` did not provide a clearly reusable exact building image.

### Validation

- Passed before log entry: `npm run graduation:images:localize`.
- Passed before log entry: `npm run graduation:images:optimize`.
- Passed before log entry: `npm run graduation:data`.
- Passed before log entry: `npm run graduation:audit`.

### Remaining Known Risk

- `CASE-068` is an exact Miyashita Park public-space image after the Atelier Bow-Wow intervention period, but it is a dance plaza view rather than a complete project overview.
- Four reviewed cases remain placeholders because license clarity is weaker than visual usefulness.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `public/images/graduation/cases/case-068-miyashita-park-atelier-bow-wow.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue with `CASE-059`, `CASE-072`, `CASE-073`, `CASE-075`, and `CASE-077`, but prioritize stronger public/reusable sources over visually attractive official images.

## 2026-07-04 — Graduation Placeholder Rejection Notes Pass

### Scope

- Continued the source-safe placeholder image review.
- Reviewed `CASE-059`, `CASE-072`, `CASE-073`, `CASE-075`, and `CASE-077`.
- Chose not to accept any image in this pass because none met the exact-project plus clear-reuse standard.

### Implemented

- Added explicit `image_note` entries in `content/cases.csv` for:
  - `CASE-059` LT Josai Shared House
  - `CASE-072` HAGISO and HANARE
  - `CASE-073` Koganecho Artist-in-Residence
  - `CASE-075` Komaeyu Public Bathhouse
  - `CASE-077` Pasona Urban Farm
- Kept all five cases on `/images/graduation/case-placeholder.svg`.
- Kept all five image source/license/credit fields empty because no accepted image exists.
- Updated:
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 25
- remote images: 29
- generic placeholders: 46
- records with explicit source/license/credit metadata: 54

### Source Evidence

- `CASE-059`: ArchDaily project media found, but no clear reusable image license was confirmed.
- `CASE-072`: source page found, but no exact reusable building image license was confirmed.
- `CASE-073`: official Koganecho and AIR_J pages describe the artist-in-residence program but do not provide reusable image rights; a Commons station image was only nearby context; one Commons panoramio result was rejected as the wrong city.
- `CASE-075`: ArchDaily project media found, but no clear reusable image license was confirmed.
- `CASE-077`: an open article includes a Pasona visualization, but it is not a real project photo; official media license remains unclear.

### Validation

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- These five cases remain visually weaker because they still use placeholders.
- The benefit is source safety: the site avoids non-exact, rights-unclear, or misleading case imagery.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- generated graduation data files after the next data build
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rebuild and verify data, then continue with the next image queue only where exact reusable sources can be confirmed.

## 2026-07-04 — Graduation Hof van Cartesius Image Pass

### Scope

- Continued the source-safe placeholder image review.
- Reviewed `CASE-078`, `CASE-080`, `CASE-082`, `CASE-083`, and `CASE-089`.
- Accepted one exact reusable image and rejected four rights-unclear image sets.

### Implemented

- Added `CASE-089` Het Hof van Cartesius to `content/graduation_image_manifest.json`.
- Localized the accepted Flickr/Openverse image to:
  - `public/images/graduation/cases/case-089-het-hof-van-cartesius.jpg`
- Updated `content/cases.csv` with:
  - local image path
  - Flickr source URL
  - `CC BY-SA 2.0`
  - `Photo: nandasluijsmans / Flickr`
  - source-safe image review note
- Added rejection notes for:
  - `CASE-078` Koganeyu
  - `CASE-080` Market and Civic Offices
  - `CASE-082` YOKOTE-no-WAGAYA
  - `CASE-083` Shima Kitchen
- Re-encoded local manifest images with a lighter 1600px / quality 60 pass. This reduced most existing local image sizes and should be treated as part of this rollback batch.
- Updated:
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 26
- remote images: 29
- generic placeholders: 45
- records with explicit source/license/credit metadata: 55

### Source Evidence

- Openverse returned the accepted `CASE-089` image from Flickr with license `CC BY-SA 2.0`, creator `nandasluijsmans`, and `hof/cartesius/utrecht` tags.
- The image shows a courtyard and varied circular facade cladding, matching the Hof van Cartesius case theme.
- Official Hof and RHAW architecture pages describe the project as circular workspaces and collective courtyard development.
- `CASE-078`, `CASE-080`, `CASE-082`, and `CASE-083` had official or article images, but no clear reusable image license was confirmed.

### Validation

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render check for `CASE-089` on desktop and mobile.

### Remaining Known Risk

- `CASE-089` uses a Flickr/Openverse architectural view rather than an official photographer image.
- The lighter image optimization pass touched all local graduation manifest images, so visual quality should be checked on at least one desktop and one mobile detail view.
- Four reviewed cases remain placeholders because source clarity is weaker than visual usefulness.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation data files after the next data build
- local files under `public/images/graduation/cases/` touched by the 1600px optimization pass
- `public/images/graduation/cases/case-089-het-hof-van-cartesius.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rebuild, run full verification, and visually check `CASE-089` before continuing the next placeholder batch.

## 2026-07-04 — Graduation Wanhua New Immigrants Hall Image Pass

### Scope

- Rechecked high-priority placeholder cases from the front of the queue.
- Reviewed `CASE-001`, `CASE-003`, `CASE-004`, `CASE-006`, `CASE-013`, `CASE-009`, `CASE-010`, `CASE-011`, `CASE-024`, and `CASE-030`.
- Accepted one exact reusable image and refined rejection notes for the remaining cases.

### Implemented

- Added `CASE-009` Taipei New Immigrants Hall to `content/graduation_image_manifest.json`.
- Localized the exact Wanhua New Immigrants' Hall image from Wikimedia Commons to:
  - `public/images/graduation/cases/case-009-wanhua-new-immigrants-hall.jpg`
- Optimized the image from 1,476,919 bytes to 371,548 bytes with the existing 1600px / quality 60 pass.
- Updated `content/cases.csv` with:
  - local image path
  - Commons source URL
  - `CC BY-SA 4.0`
  - `Photo: Solomon203 / Wikimedia Commons`
  - source-safe image review note
- Refined rejection notes for:
  - `CASE-001` Share Kanazawa
  - `CASE-003` ROKI Global Innovation Center ROOG
  - `CASE-004` Naoshima Honmura Lounge and Archive
  - `CASE-006` Fuji Kindergarten
  - `CASE-010` Kamiyama Valley Satellite Office Complex
  - `CASE-013` Kaze no Machi Miyabira
  - `CASE-024` AU Childcare Support Sasebo
  - `CASE-030` Mabi Reconstruction Disaster Prevention Park Bamboo Gate
- Kept `CASE-011` placeholder because it is a service-space model without one confirmed building image.
- Updated:
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 27
- remote images: 29
- generic placeholders: 44
- records with explicit source/license/credit metadata: 56

### Source Evidence

- Wikimedia Commons metadata identifies the accepted image as Wanhua New Immigrants' Hall / Taipei City New Immigrants' Hall, own work by `Solomon203`, licensed under `CC BY-SA 4.0`.
- Taipei New Immigrants Hall official pages confirm this facility category belongs to Taipei's new-immigrant venue system.
- `CASE-004` and `CASE-006` had exact Openverse/Flickr images but only `NC` or `NC-ND` licenses, so they were not accepted.
- `CASE-001`, `CASE-003`, `CASE-010`, `CASE-013`, `CASE-024`, and `CASE-030` did not produce exact reusable Commons/Openverse images in this pass.

### Validation

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render check for `CASE-009` on desktop and mobile.

### Remaining Known Risk

- `CASE-009` is visually a general facility exterior, not an architect-shot project photo.
- High-value published cases still remain placeholders because available exact images are either missing or not reusable.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation data files after the next data build
- `public/images/graduation/cases/case-009-wanhua-new-immigrants-hall.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rebuild, run full verification, and visually check `CASE-009`; then continue with the remaining 44 placeholders from the priority queue.

## 2026-07-04 — Graduation MIKAN SHIMOKITA Image Pass

### Scope

- Continued the source-safe placeholder image review.
- Reviewed `CASE-037`, `CASE-064`, `CASE-085`, `CASE-090`, `CASE-025`, `CASE-032`, `CASE-048`, and `CASE-039`.
- Accepted one exact reusable image and refined rejection notes for the remaining cases.

### Implemented

- Added `CASE-039` MIKAN SHIMOKITA to `content/graduation_image_manifest.json`.
- Localized the exact Wikimedia Commons image to:
  - `public/images/graduation/cases/case-039-mikan-shimokita.jpg`
- Optimized the image from 655,521 bytes to 286,520 bytes with the existing 1600px / quality 60 pass.
- Updated `content/cases.csv` with:
  - local image path
  - Commons source URL
  - `CC0`
  - `Photo: Souka Kinmei / Wikimedia Commons`
  - source-safe image review note
- Refined rejection notes for:
  - `CASE-025` IRH Child Development Support
  - `CASE-032` Paper Partition System East Japan Earthquake
  - `CASE-037` Home-for-All Rikuzentakata
  - `CASE-048` Aranya Art Center
  - `CASE-064` Takayanagi Community Center
  - `CASE-085` Maggie's Tokyo
  - `CASE-090` HOME-FOR-ALL in Rikuzentakata
- Updated:
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 28
- remote images: 29
- generic placeholders: 43
- records with explicit source/license/credit metadata: 57

### Source Evidence

- Wikimedia Commons metadata identifies the accepted image as commercial facility `ミカン下北`, own work by `Souka Kinmei`, licensed under `CC0`.
- The image visually shows the high-line commercial passage and colorful storefront modules matching the MIKAN SHIMOKITA case theme.
- Home-for-All results were rejected because they are Venice Biennale exhibition or model photographs, not the built Rikuzentakata project.
- `CASE-025`, `CASE-032`, `CASE-048`, `CASE-064`, and `CASE-085` did not produce exact reusable Commons/Openverse images in this pass.

### Validation

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render check for `CASE-039` on desktop and mobile.

### Remaining Known Risk

- `CASE-039` is an everyday public exterior photo rather than an architectural photographer's official image.
- Several high-value social/disaster/health-care cases remain placeholders because available media is not reusable or not exact.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation data files after the next data build
- `public/images/graduation/cases/case-039-mikan-shimokita.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rebuild, run full verification, and visually check `CASE-039`; then continue with remaining placeholders that have a realistic chance of exact open images.

## 2026-07-04 — Graduation JACCC Image Pass

### Scope

- Continued the source-safe placeholder image review with public-facility candidates.
- Reviewed `CASE-057`, `CASE-067`, `CASE-088`, `CASE-091`, `CASE-096`, and `CASE-100`.
- Accepted one exact reusable image and added rejection notes for the rest.

### Implemented

- Added `CASE-096` Japanese American Community and Cultural Center to `content/graduation_image_manifest.json`.
- Localized the exact Wikimedia Commons image to:
  - `public/images/graduation/cases/case-096-japanese-american-community-cultural-center.jpg`
- Optimized the image from 2,536,761 bytes to 313,521 bytes with the existing 1600px / quality 60 pass.
- Updated `content/cases.csv` with:
  - local image path
  - Commons source URL
  - `CC BY-SA 4.0`
  - `Photo: Another Believer / Wikimedia Commons`
  - source-safe image review note
- Added rejection notes for:
  - `CASE-057` Tsuruoka Cultural Hall
  - `CASE-067` Sendagaya Community Center
  - `CASE-088` Towada Community Plaza
  - `CASE-091` Maruhon MakiArt Terrace Ishinomaki Cultural Center
  - `CASE-100` Portland Japanese Garden Cultural Village
- Updated:
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 29
- remote images: 29
- generic placeholders: 42
- records with explicit source/license/credit metadata: 58

### Source Evidence

- Wikimedia Commons metadata identifies the accepted image as Japanese American Cultural and Community Center & Frances Hashimoto Plaza, own work by `Another Believer`, licensed under `CC BY-SA 4.0`.
- The image shows both the cultural center building and plaza context, matching the case's public-cultural and community-memory theme.
- A second Noguchi Plaza Commons image was reviewed but not selected because the accepted color image better represents the building plus plaza.
- `CASE-057`, `CASE-067`, `CASE-088`, and `CASE-091` did not produce exact reusable Commons/Openverse images.
- `CASE-100` returned Portland Japanese Garden related Openverse results, but those were NC-ND or not exact Cultural Village covers.

### Validation

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render check for `CASE-096` on desktop and mobile.

### Remaining Known Risk

- `CASE-096` uses a broad building/plaza exterior rather than a focused architectural-detail image.
- Several Japan public-facility projects remain placeholders because open image results were not exact.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation data files after the next data build
- `public/images/graduation/cases/case-096-japanese-american-community-cultural-center.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rebuild, run full verification, and visually check `CASE-096`; then continue with remaining public/civic placeholders.

## 2026-07-04 — Graduation Tainan And Pasona Image Pass

### Scope

- Continued the source-safe placeholder image review.
- Rechecked `CASE-056` Tainan Spring and `CASE-077` Pasona Urban Farm after finding stronger Wikimedia Commons matches.
- Accepted two exact reusable images and corrected earlier placeholder decisions.

### Implemented

- Added `CASE-056` and `CASE-077` to `content/graduation_image_manifest.json`.
- Localized the exact Wikimedia Commons images to:
  - `public/images/graduation/cases/case-056-tainan-spring.jpg`
  - `public/images/graduation/cases/case-077-pasona-urban-farm.jpg`
- Optimized:
  - `CASE-056` from 10,627,072 bytes to 316,024 bytes
  - `CASE-077` from 4,264,890 bytes to 301,505 bytes
- Updated `content/cases.csv` with local image paths, source URLs, license labels, credits, and review notes.
- Updated:
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 31
- remote images: 29
- generic placeholders: 40
- records with explicit source/license/credit metadata: 60

### Source Evidence

- Wikimedia Commons metadata identifies `臺南河樂廣場.jpg` as the former Tainan China Town Mall site transformed into HeLe Plaza, own work by `Pbdragonwang`, licensed under `CC BY-SA 4.0`.
- MVRDV describes Tainan Spring as the transformation of a former city-centre shopping mall into an urban lagoon, confirming the Commons image is the same public-space project context.
- Wikimedia Commons metadata identifies `Pasona building.JPG` as the Pasona building in Tokyo, own work by `螺钉`, licensed under `CC BY-SA 3.0`.
- Kono Designs describes Pasona Urban Farm as the Pasona HQ renovation with green facade and urban farming facilities, confirming the Commons building image is an exact facility match.

### Validation

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render check for `CASE-056` and `CASE-077` on desktop and mobile.
- Browser plugin note: in-app Browser initialization succeeded, but the screenshot inspection call timed out and reset the kernel, so the same target flow was verified with standalone Playwright.

### Remaining Known Risk

- `CASE-056` uses a public plaza overview rather than official architectural photography.
- `CASE-077` uses an exterior building photo rather than the interior urban-farm spaces, but it is the exact Pasona facility and license-safe.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation data files after the next data build
- `public/images/graduation/cases/case-056-tainan-spring.jpg`
- `public/images/graduation/cases/case-077-pasona-urban-farm.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rebuild, run full verification, visually check both case detail pages on desktop and mobile, then continue with remaining high-value placeholders.

## 2026-07-04 — Graduation Open-License Candidate Sweep

### Scope

- Continued the placeholder-image cleanup after the Tainan/Pasona pass.
- Checked a next batch of visually valuable but still-placeholder cases.
- Made one data-source correction where the current project source was clear.

### Implemented

- Updated `CASE-080` from `Market and Civic Offices` to `Tainan Market`.
- Replaced the old MVRDV source path with the current MVRDV project page:
  - `https://www.mvrdv.com/projects/391/tainan-market`
- Updated `CASE-080` concept and image note so exported data no longer points users to the stale source label.
- Added rejection notes for `CASE-049`, `CASE-069`, `CASE-080`, `CASE-084`, `CASE-086`, `CASE-087`, `CASE-093`, and `CASE-097`.
- Updated:
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 31
- remote images: 29
- generic placeholders: 40
- records with explicit source/license/credit metadata: 60

### Source Evidence

- MVRDV's current project page names the project `Tainan Market`, locates it in Tainan, marks it realised, and describes the wholesale market with a publicly accessible green roof.
- The previous `CASE-080` source path was stale relative to the current MVRDV page.
- Openverse/Commons checks for the reviewed cases did not return exact reusable image candidates.
- `CASE-097` had exact-looking Flickr results, but the visible license state was all rights reserved or non-commercial, so it remains a placeholder.

### Validation

- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin render check for `CASE-080` on desktop.
- Passed after this log entry: targeted Playwright mobile width check for `CASE-080`.

### Remaining Known Risk

- `CASE-080` still lacks a reusable cover image despite having a corrected source page.
- Some rejected cases may have usable images in less indexed institutional repositories, but no source-safe candidate was confirmed in this pass.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- generated graduation data files after the next data build
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rebuild and verify the data correction, then continue with source-page cleanup for remaining placeholders before chasing weaker image leads.

## 2026-07-04 — Graduation Official Source Cleanup

### Scope

- Continued the source-page cleanup for placeholder cases.
- Focused on cases where a safe reusable image was still unavailable, but the primary project link could be upgraded to an official studio/project page.
- Kept the UI and visual design unchanged.

### Implemented

- Replaced weaker or secondary source URLs with official project pages for:
  - `CASE-001` Share Kanazawa: GOI Architecture & Associates
  - `CASE-026` Yoridoko Employment Support Center: td-Atelier
  - `CASE-059` LT Josai Shared House: Naruse/Inokuma Architects
  - `CASE-067` Sendagaya Community Center: Kengo Kuma and Associates
  - `CASE-069` Kanayama Community Center: Kengo Kuma and Associates
  - `CASE-070` Tonami Public Library: MIKAMI Architects
  - `CASE-075` Komaeyu Public Bathhouse: Schemata Architects / Jo Nagasaka
  - `CASE-084` The Learning Architecture for Learners: VUILD Architects
  - `CASE-088` Towada Community Plaza: Kengo Kuma and Associates
- Updated:
  - `content/cases.csv`
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 31
- remote images: 29
- generic placeholders: 40
- records with explicit source/license/credit metadata: 60

### Source Evidence

- GOI Architecture & Associates' official page is reachable and identifies Share Kanazawa as a welfare-facility work.
- td-Atelier's official page is reachable and contains `Employment support center YORIDOKO`.
- Naruse/Inokuma's official page lists `LT Josai`, Nagoya location, June 2013 date, and shared-space category.
- KKAA official pages identify Sendagaya Community Center, Museum of Kanayama Castle Ruin / Kanayama Community Center, and Towada City Plaza.
- MIKAMI Architects' official page is reachable and matches the Tonami City Tonami Library project.
- Schemata's official page describes Komaeyu's renovated bathhouse and neighborhood gathering logic.
- VUILD Architects' official page identifies The Learning Architecture for Learners and its Tokyo Gakugei University Explayground context.

### Validation

- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render/source-link checks for all changed case detail pages on desktop and mobile.

### Remaining Known Risk

- Eight of these source-improved cases still use placeholders because no exact reusable cover image was confirmed; `CASE-070` already has a source-safe Wikimedia Commons cover.
- `CASE-026` official page uses older encoding, but the page is reachable and the English project title is visible.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- generated graduation data files after the next data build
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rebuild data, run audit/type/lint/unit checks, visually verify a representative changed detail page, then continue with image-safe placeholder reduction.

## 2026-07-04 — Graduation Official Source Cleanup Round 2

### Scope

- Continued replacing secondary source links with official or institution-owned project/facility pages.
- Kept images, UI, and routing unchanged.

### Implemented

- Replaced weaker source URLs for:
  - `CASE-025` IRH Child Development Support: HIBINOSEKKEI / Youji no Shiro official page
  - `CASE-034` KAIT Workshop: Kanagawa Institute of Technology official facilities page
  - `CASE-043` Roadside Station Mashiko: MOUNT FUJI ARCHITECTS STUDIO official project section
  - `CASE-066` IRH Child Development Support: HIBINOSEKKEI / Youji no Shiro official page
  - `CASE-072` HAGISO and HANARE: HAGISO official hanare architecture page
  - `CASE-086` Long House with an Engawa Senior Daycare Center: Yamazaki Kentaro Design Workshop official project page
  - `CASE-091` Maruhon MakiArt Terrace Ishinomaki Cultural Center: official facility page
- Left `CASE-087` unchanged because no stronger official project page was confirmed in this pass.
- Updated:
  - `content/cases.csv`
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
  - `docs/USER_SIMULATION_LOG.md`

### Current Image Status

- total cases: 100
- local graduation case images: 31
- remote images: 29
- generic placeholders: 40
- records with explicit source/license/credit metadata: 60

### Source Evidence

- HIBINOSEKKEI / Youji no Shiro's official page identifies IRH child development support, Gunma location, and awards/media context.
- Kanagawa Institute of Technology's official facilities page identifies KAIT Workshop, Junya Ishigami, the open workshop concept, and the 305-pillar structure.
- MOUNT FUJI ARCHITECTS STUDIO's official page includes a Roadside Station in Mashiko section and project details.
- HAGISO's official hanare architecture page describes the first hanare accommodation building as a renovated 50-year-old wooden apartment.
- Yamazaki Kentaro Design Workshop's official page identifies Long House with an Engawa as a senior daycare center.
- The official Maruhon MakiArt Terrace page is the current public-facing facility source for the Ishinomaki cultural arts exchange facility.

### Validation

- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin desktop source-link checks for all seven changed case detail pages.
- Passed after this log entry: Browser plugin mobile-width source-link and overflow checks for all seven changed case detail pages.
- Passed after this log entry: Browser plugin interaction check from `CASE-025` detail page back to the case library.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- `CASE-025`, `CASE-066`, `CASE-072`, `CASE-086`, and `CASE-091` still use placeholders.
- `CASE-043` uses a single-page official studio site with a project-section anchor; the project content is present in the page HTML, but it is not a standalone route.
- `CASE-087` remains on ArchDaily until a stronger official project source is found.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- generated graduation data files after the next data build
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rebuild and verify this source cleanup, then return to image-safe placeholder reduction.

## 2026-07-04 — Graduation CASE-100 Source-Safe Image Pass

### Scope

- Continued placeholder reduction for the Graduation Inspiration Library case archive.
- Focused on one candidate where a newly confirmed reusable image matched the project context closely enough to show publicly.
- Kept UI, routes, and case text unchanged.

### Implemented

- Replaced the generic placeholder for `CASE-100` Portland Japanese Garden Cultural Village with a localized Wikimedia Commons image.
- Added explicit image metadata in `content/cases.csv`:
  - source: `https://commons.wikimedia.org/wiki/File:Tsubo-Niwa_at_Portland_Japanese_Garden.jpg`
  - license: `CC BY-SA 4.0`
  - credit: `Photo: WLernerPJG / Wikimedia Commons`
- Added `CASE-100` to `content/graduation_image_manifest.json`.
- Downloaded and optimized the image to:
  - `/images/graduation/cases/case-100-portland-japanese-garden-cultural-village.jpg`
- Updated image review and placeholder-priority logs.

### Current Image Status

- total cases: 100
- local graduation case images: 32
- remote images: 29
- generic placeholders: 39
- records with explicit source/license/credit metadata: 61

### Source Evidence

- Wikimedia Commons metadata describes the image as `Tsubo-Niwa at Portland Japanese Garden`, dated 2023-05-03, credited to `WLernerPJG`, and licensed `CC BY-SA 4.0`.
- The Commons page context includes Portland Japanese Garden Cultural Village / Tateuchi courtyard wording.
- KKAA's official project page remains the primary project source for Portland Japanese Garden Cultural Village.

### Validation

- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: generated data count check confirmed 100 cases, 32 local graduation case images, 29 remote images, 39 generic placeholders, and 61 records with explicit image metadata.
- Passed after this log entry: Browser plugin desktop `CASE-100` detail check confirmed the real local image, Commons source link, `CC BY-SA 4.0` text, Wikimedia credit, official KKAA source link, no relevant console errors, no visible framework overlay, and no horizontal overflow.
- Passed after this log entry: Browser plugin mobile-width `CASE-100` detail check at 390 x 844 confirmed the image, license, credit, no relevant console errors, no visible framework overlay, and no horizontal overflow.
- Passed after this log entry: Browser plugin interaction check from `CASE-100` detail page back to `/zh/graduation/cases`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- `CASE-100` now has a source-safe image, but it is a courtyard/context photograph rather than official KKAA photography; attribution and `CC BY-SA 4.0` license text must stay visible.
- 39 case records still use the generic placeholder.
- `CASE-057` and `CASE-087` remain weaker source-quality candidates until stronger official or institution-owned pages are confirmed.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- `public/images/graduation/cases/case-100-portland-japanese-garden-cultural-village.jpg`
- generated graduation data files after the next data build
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Rebuild data and run the full verification chain, then test the rendered `CASE-100` detail page on desktop and mobile before selecting another placeholder candidate.

## 2026-07-04 — Graduation Official Source Cleanup Round 3

### Scope

- Followed up on the two remaining weak primary-source candidates after the `CASE-100` image pass.
- Improved source reliability without changing images, routes, UI, or case concepts.

### Implemented

- Replaced `CASE-057` Tsuruoka Cultural Hall source from the Iwan Baan portfolio page to the official SHOGIN TACT Tsuruoka facility overview page.
- Replaced `CASE-087` Kitakami Children Health and Support Center source from ArchDaily to the official UNEMORI ARCHITECTS project page.
- Added source-review notes to both case records explaining why placeholders remain.
- Updated:
  - `content/cases.csv`
  - generated `src/content/graduation/cases.json`
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`

### Current Image Status

- total cases: 100
- local graduation case images: 32
- remote images: 29
- generic placeholders: 39
- records with explicit source/license/credit metadata: 61

### Source Evidence

- SHOGIN TACT Tsuruoka's official facility overview page identifies the facility name, use, design supervision team, area data, hall features, and address.
- UNEMORI ARCHITECTS' official project page identifies Kitakami Health & Childcare Support Complex, 2021, Kitakami city location, conversion use, area data, architects, and Kai Nakamura photography credit.
- Both official pages still have reuse-unconfirmed or all-rights-reserved media, so no new cover image was accepted.

### Validation

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin desktop checks for `CASE-057` and `CASE-087` confirmed correct official source links, placeholder status, review notes, no relevant console errors, no visible framework overlay, and no horizontal overflow.
- Passed after this log entry: Browser plugin mobile-width checks for `CASE-057` and `CASE-087` confirmed correct official source links, placeholder status, review notes, no relevant console errors, no visible framework overlay, and no horizontal overflow.
- Passed after this log entry: Browser plugin interaction check from `CASE-087` detail page back to `/zh/graduation/cases`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- `CASE-057` and `CASE-087` still use generic placeholders because the official/source page images are not reusable under a confirmed public license.
- The Commons batch scan hit API rate limits; further Commons work should be slower and targeted, not broad.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- generated graduation case data after rebuild
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Verify the two changed source links in the rendered app on desktop/mobile, then continue placeholder reduction using slower targeted searches rather than batch Commons queries.

## 2026-07-04 — Graduation Official Source Cleanup Round 4

### Scope

- Cleaned one remaining secondary-media source link on a case whose image was already source-safe.
- Kept the accepted local image and all UI unchanged.

### Implemented

- Replaced `CASE-079` Ebina City Arima Library and Community Center source from Archello to the official Arima Library / Kadosawabashi Community Center facility site.
- Kept its accepted Commons image, license, and credit unchanged.
- Updated:
  - `content/cases.csv`
  - generated graduation case data
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`

### Current Image Status

- total cases: 100
- local graduation case images: 32
- remote images: 29
- generic placeholders: 39
- records with explicit source/license/credit metadata: 61

### Source Evidence

- The official Arima Library / Kadosawabashi Community Center site identifies the facility and describes it as a multigenerational place for activity and learning.
- The existing Commons image remains accepted under `CC BY-SA 4.0`; no image field changed.

### Validation

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin desktop/mobile `CASE-079` checks confirmed the official facility source link, Commons image source link, local image, `CC BY-SA 4.0` license, Wikimedia credit, no relevant console errors, no visible framework overlay, and no horizontal overflow.
- Browser plugin interaction retry timed out twice while clicking the return link; fallback Playwright interaction check passed for `CASE-079` detail page back to `/zh/graduation/cases`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- `CASE-079` uses a source-safe Commons image from 2015, while the renovation is recorded as 2020; it remains acceptable as exact facility context, but it is not a post-renovation interior image.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- generated graduation case data after rebuild
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue targeted source cleanup by scanning remaining case source domains for secondary media pages, then only return to image replacement when an exact reusable image can be confirmed without broad Commons API bursts.

## 2026-07-04 — Graduation Official Source Cleanup Round 5

### Scope

- Cleaned one remaining secondary architect-profile source on a published case.
- Kept the accepted Commons image and all UI unchanged.

### Implemented

- Replaced `CASE-081` Sukagawa Community Center tette source from World-Architects to the official UNEMORI ARCHITECTS project page.
- Kept its accepted Commons image, license, and credit unchanged.
- Rebuilt generated graduation data.
- Ran a weak-domain scan after rebuild; no tracked secondary-source domains remained.
- Updated:
  - `content/cases.csv`
  - generated graduation case data
  - `docs/GRADUATION_IMAGE_REVIEW.md`
  - `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`

### Current Image Status

- total cases: 100
- local graduation case images: 32
- remote images: 29
- generic placeholders: 39
- records with explicit source/license/credit metadata: 61

### Source Evidence

- The official UNEMORI ARCHITECTS page identifies Sukagawa Community Center, 2019, major program uses, area data, design team, official tette link, and awards.
- The existing Commons image remains accepted under `CC BY-SA 4.0`; no image field changed.

### Validation

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: weak-domain scan returned no tracked secondary-source domains.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin desktop/mobile `CASE-081` checks confirmed the official UNEMORI source link, Commons image source link, remote image loading through the proxy, `CC BY-SA 4.0` license, `Suikotei` credit, no relevant console errors, no visible framework overlay, and no horizontal overflow.
- Passed after this log entry: Browser plugin interaction check from `CASE-081` detail page back to `/zh/graduation/cases`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- Weak-domain scan is a heuristic list, not proof that every source is ideal.
- `CASE-081` still uses a remote Commons image rather than a localized copy; this predates the current cleanup and was left unchanged to keep scope small.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- generated graduation case data after rebuild
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Switch from source cleanup to the next highest-value data QA pass: find cases with remote images that should be localized or cases whose image notes are too thin for future handoff.

## 2026-07-04 — Graduation Remote Image Localization Batch 1

### Scope

- Reduced external runtime image dependency for accepted Wikimedia Commons case covers.
- Expanded the image manifest so failed remote downloads can be retried deterministically later.
- Installed Open Design as a future design/reference workspace, using only the official GitHub Release.

### Implemented

- Added 29 remote Commons case images to `content/graduation_image_manifest.json`.
- Ran `npm run graduation:images:dry-run`.
- Ran `npm run graduation:images:localize`.
- Downloaded and localized 3 images before Wikimedia rate limiting:
  - `CASE-015` Minamisanriku 311 Memorial
  - `CASE-021` Toyama Kirari
  - `CASE-043` Roadside Station Mashiko
- Ran `npm run graduation:images:optimize -- --max-edge=1600 --quality=60`.
- Rebuilt generated graduation data with `npm run graduation:data`.
- Installed Open Design `0.13.0` from official `nexu-io/open-design` release:
  - downloaded `open-design-0.13.0-mac-arm64.dmg`
  - installed `/Applications/Open Design.app`
  - verified notarized Developer ID signature
  - launched app and confirmed running process
- Created `/Users/liquanxing/.local/bin/open-design-mcp` as a stable Codex MCP wrapper because the system `od` command name is unsafe/ambiguous on macOS.
- Registered Open Design globally in Codex with `codex mcp add open-design -- /Users/liquanxing/.local/bin/open-design-mcp`.
- Created an Open Design smoke-test project through MCP:
  - project id: `codex-smoke-test-2026-07-04`
  - entry file: `index.html`
  - preview URL: `http://127.0.0.1:7456/api/projects/codex-smoke-test-2026-07-04/raw/index.html`

### Current Image Status

- total cases: 100
- local graduation case images: 35
- remote images: 26
- generic placeholders: 39
- records with explicit source/license/credit metadata: 61
- image manifest entries: 51
- manifest entries queued for retry because the local file is still missing: 26

### Source Evidence

- The three localized images keep their existing Commons source URL, license, and credit metadata.
- Open Design source used for install:
  - official site: `https://open-design.ai/`
  - GitHub release: `https://github.com/nexu-io/open-design/releases/tag/open-design-v0.13.0`
  - downloaded asset: `open-design-0.13.0-mac-arm64.dmg`
  - SHA-256: `f7a7856b27db7c5757dc37297eff82369191288df3adfce6b650ba2a558d0635`

### Validation

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: `sips` confirmed the 3 localized images are readable at max edge 1600px.
- Passed before this log entry was finalized: copied Open Design app still passes `codesign` and `spctl --assess`.
- Passed after this log entry: Open Design CLI listed bundled design systems through `http://127.0.0.1:7456`.
- Passed after this log entry: Open Design MCP wrapper exposed 18 tools.
- Passed after this log entry: Open Design MCP created project `codex-smoke-test-2026-07-04` and wrote `index.html`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin desktop/mobile checks for `CASE-015`, `CASE-021`, and `CASE-043` confirmed local image URLs, image load completion, Commons source link presence, license/credit text, no relevant console errors, no framework overlay, no horizontal overflow, and a working return interaction to `/zh/graduation/cases`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- Wikimedia returned upstream `429` after 3 successful downloads, so 26 manifest entries are queued for a later retry.
- `npm run graduation:images:optimize` will continue reporting those 26 entries as `missing-local-file` until a later localization retry succeeds.
- Open Design is installed, launches, has a Codex MCP wrapper, and has a smoke-test artifact, but it has not yet been used to generate an Archistory-specific design artifact.
- The current Codex process may not expose the newly registered `open-design` MCP tools until a new Codex session/tool discovery refresh; the wrapper itself has been verified manually.

### Rollback Scope

If rejected, revert only:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation case data after rebuild
- `public/images/graduation/cases/case-015-minamisanriku-311-memorial.jpg`
- `public/images/graduation/cases/case-021-toyama-kirari.jpg`
- `public/images/graduation/cases/case-043-roadside-station-mashiko.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

Open Design rollback is separate from the website repo:

- run `codex mcp remove open-design`
- delete `/Users/liquanxing/.local/bin/open-design-mcp`
- delete `/Applications/Open Design.app`
- delete `/Users/liquanxing/Downloads/OpenDesign/open-design-0.13.0-mac-arm64.dmg`
- optionally delete the smoke-test project folder `/Users/liquanxing/Library/Application Support/Open Design/namespaces/release-stable/data/projects/codex-smoke-test-2026-07-04`

### Next Recommended Step

- Write a small reference-led design brief for the graduation submenu, then use Open Design to produce one restrained archive-style design artifact before touching the live site UI.

## 2026-07-04 — Graduation Remote Image Localization Batch 2

### Scope

- Paused Open Design usage per user direction.
- Improved the existing image localization script so Wikimedia retries are slower, targeted, and safer.
- Continued reducing external runtime image dependency for accepted Commons case covers.

### Implemented

- Updated `scripts/localize-graduation-case-images.mjs`:
  - added `--ids=...` for exact record selection
  - added `--delay-ms=...` for spacing requests
  - added `--retry=...` for transient non-429 retry
  - added default stop-on-429 behavior with optional `--continue-on-429`
- Ran a dry-run for `CASE-022` and `CASE-023`.
- Localized and optimized 10 more case images:
  - `CASE-022`, `CASE-023`, `CASE-028`, `CASE-029`, `CASE-031`
  - `CASE-034`, `CASE-036`, `CASE-040`, `CASE-041`, `CASE-042`
- Stopped when `CASE-044` returned upstream `429`.
- Rebuilt generated graduation data with `npm run graduation:data`.

### Current Image Status

- total cases: 100
- local graduation case images: 45
- remote images: 16
- generic placeholders: 39
- records with explicit source/license/credit metadata: 61
- image manifest entries: 51
- manifest entries queued for retry because the local file is still missing: 16

### Validation

- Passed before this log entry was finalized: `node --check scripts/localize-graduation-case-images.mjs`.
- Passed before this log entry was finalized: dry-run confirmed `--ids`, `--limit`, `--delay-ms`, and `--retry` behavior without file writes.
- Passed before this log entry was finalized: `npm run graduation:images:optimize -- --max-edge=1600 --quality=60`.
- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: `sips` confirmed representative localized images are readable at max edge 1600px.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin desktop/mobile checks for `CASE-022`, `CASE-041`, and `CASE-044`.
- Passed after this log entry: newly localized `CASE-022` and `CASE-041` confirmed local image URLs, source/license presence, no relevant console errors, no framework overlay, and no horizontal overflow.
- Passed after this log entry: `CASE-044` confirmed it still uses remote proxy instead of a broken local path, with source/license metadata present and no layout overflow.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- Wikimedia still returned upstream `429` at `CASE-044`; the script now stops safely, but the remaining 16 queued images should be retried later in smaller groups.
- `npm run graduation:images:optimize` will continue reporting the remaining 16 entries as `missing-local-file` until a later localization retry succeeds.
- `CASE-044` remains remote-dependent. Browser QA confirmed it does not use a broken local path, but the rendered image remains less reliable than localized cases while Wikimedia/proxy access is unstable.

### Rollback Scope

If rejected, revert only:

- `scripts/localize-graduation-case-images.mjs`
- `content/cases.csv`
- generated graduation case data after rebuild
- the 10 new localized image files under `public/images/graduation/cases/`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Wait before retrying `CASE-044` onward with a 1-2 image slow batch; keep Open Design paused until the site data cleanup pass is stable.

## 2026-07-05 — Graduation Image Retry And Audit Report Upgrade

### Scope

- Kept Open Design paused.
- Retried the first remaining Wikimedia image queue item conservatively.
- Improved the graduation content audit report so image state is visible without manual counting.

### Implemented

- Ran a slow dry-run for `CASE-044` and `CASE-045`.
- Ran a slow apply attempt for `CASE-044` and `CASE-045`; the script stopped immediately when `CASE-044` returned upstream `429`.
- Left `CASE-044` and `CASE-045` unchanged because no safe local file was downloaded.
- Updated `scripts/audit-graduation-content.mjs` to report:
  - local case image count
  - remote image count
  - placeholder count
  - graduation image manifest entry count
  - manifest entries missing local files
  - remaining manifest retry queue
- Regenerated `docs/GRADUATION_CONTENT_QA.md`.

### Current Image Status

- total cases: 100
- local graduation case images: 45
- remote images: 16
- generic placeholders: 39
- records with explicit source/license/credit metadata: 61
- remaining retry queue: `CASE-044`, `CASE-045`, `CASE-046`, `CASE-047`, `CASE-050`, `CASE-051`, `CASE-052`, `CASE-053`, `CASE-054`, `CASE-055`, `CASE-058`, `CASE-060`, `CASE-061`, `CASE-071`, `CASE-074`, `CASE-081`

### Validation

- Passed before this log entry was finalized: `node --check scripts/localize-graduation-case-images.mjs`.
- Passed before this log entry was finalized: `node --check scripts/audit-graduation-content.mjs`.
- Passed before this log entry was finalized: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- Wikimedia still returned upstream `429`; continuing image downloads in this moment would likely waste requests.
- The remaining 16 remote images still render through remote/proxy paths, not local files.

### Rollback Scope

If rejected, revert only:

- `scripts/audit-graduation-content.mjs`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Stop Wikimedia retries for now; use the upgraded audit report to continue non-network QA work, or retry only `CASE-044` later with a single-item slow batch after the rate limit cools down.

## 2026-07-05 — Graduation Published Readiness Pass

### Scope

- Kept Open Design paused.
- Avoided further Wikimedia download attempts after upstream `429`.
- Improved published/draft content quality without changing page UI code.

### Implemented

- Extended `scripts/audit-graduation-content.mjs` with a `Published Readiness` section:
  - published local/remote/placeholder image counts
  - published cases missing image source/license/credit
  - draft cases with source-safe non-placeholder images
- Rebuilt `docs/GRADUATION_CONTENT_QA.md`.
- Demoted published placeholder cases back to draft:
  - `CASE-001` Share Kanazawa
  - `CASE-003` ROKI Global Innovation Center ROOG
  - `CASE-004` Naoshima Honmura Lounge and Archive
  - `CASE-006` Fuji Kindergarten
- Promoted source-safe draft cases to published:
  - `CASE-027` Yusuhara Community Library Yururi Yusuhara
  - `CASE-033` Yu no Eki Ohyu
  - `CASE-035` Kashiwa-no-ha Open Innovation Lab
  - `CASE-038` BONUS TRACK Shimokitazawa
- Rebuilt generated graduation data.

### Current Published Readiness

- published cases: 39
- published cases using local images: 23/39
- published cases using remote images: 16/39
- published cases using placeholder images: 0/39
- published cases missing image source/license/credit: 0
- draft cases with source-safe non-placeholder images: 22

### Validation

- Passed before this log entry was finalized: `node --check scripts/audit-graduation-content.mjs`.
- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: `npm run graduation:audit`.
- Passed before this log entry was finalized: spot check confirmed `CASE-001`, `CASE-003`, `CASE-004`, `CASE-006` are draft and `CASE-027`, `CASE-033`, `CASE-035`, `CASE-038` are published in generated JSON.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- Published cases still include 16 remote images because Wikimedia rate limiting blocks localization.
- Demoted high-profile cases remain in draft until exact reusable images are found or a deliberate decision is made to publish source-strong placeholder cases.

### Rollback Scope

If rejected, revert only:

- `scripts/audit-graduation-content.mjs`
- `content/cases.csv`
- generated graduation case data after rebuild
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue non-network QA by checking whether published issues reference the now-draft placeholder cases, then either update relation notes or choose source-safe replacements.

## 2026-07-05 — Graduation Public Relationship Readiness Pass

### Scope

- Kept Open Design paused.
- Continued from the published-readiness cleanup and focused on the public browsing experience.
- Avoided guessing new external content; reused existing source-backed case records and existing CSV data.

### Implemented

- Extended `scripts/audit-graduation-content.mjs` with a `Public Relationship Readiness` section:
  - published issues with at least one published related case
  - published issues with no published related case
  - published issues that still retain draft-case references for future cleanup
- Promoted 6 already source-safe, locally imaged case records to `published` because they are repeatedly referenced by published issues:
  - `CASE-009` Taipei New Immigrants Hall
  - `CASE-012` Housing Complex Regeneration UR
  - `CASE-014` Sumida River Terrace
  - `CASE-017` Yokohama Hammerhead
  - `CASE-019` Kokubunji Cocobunji Plaza
  - `CASE-020` Michi-no-Eki Community Hub
- Replaced `ISSUE-001` and `ISSUE-013` related-case lists with published, source-safe case examples so no published issue is left without public-ready examples.
- Updated the frontend so issue details, site details, case details, random results, and bundle exports only surface `published` case records.
- Rebuilt generated graduation JSON and public CSV/JSON data.

### Current Public Relationship Status

- published issues: 30
- published cases: 45
- published issues with at least one published related case: 30/30
- published issues with no published related case: 0
- published issues still retaining draft-case references in source data: 13
- published cases using placeholder images: 0
- published cases missing image source/license/credit: 0

### Validation

- Passed before this log entry was finalized: `node --check scripts/audit-graduation-content.mjs`.
- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: `npm run graduation:audit`.
- Passed before this log entry was finalized: relationship spot check confirmed 30/30 published issues now have at least one published related case.
- Passed before this log entry was finalized: `npm run typecheck`.
- Passed before this log entry was finalized: `npm run lint`.
- Passed before this log entry was finalized: `npm run test:unit`.
- Passed before this log entry was finalized: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- 13 published issues still retain draft case references in the source CSV; the frontend now filters these out, but the content model should still be cleaned in later passes.
- 16 published cases still use remote image URLs because Wikimedia localization is rate-limited.
- `ISSUE-001` and `ISSUE-013` now use practical public-ready examples, but the more exact high-profile care/welfare cases remain draft until reusable images are found.

### Rollback Scope

If rejected, revert only:

- `scripts/audit-graduation-content.mjs`
- `src/components/GraduationInspirationApp.tsx`
- `content/cases.csv`
- `content/issues.csv`
- generated graduation issue/case data after rebuild
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue relationship cleanup for the remaining 13 published issues that still retain draft-case references in source data, starting with `ISSUE-002`, `ISSUE-003`, and `ISSUE-006`.

## 2026-07-05 — Graduation Published Issue Relation Cleanup

### Scope

- Finished the non-network relationship cleanup started in the previous pass.
- Kept all edits inside the graduation submenu content model and generated data.
- Used only existing published, source-backed case records as replacements.

### Implemented

- Removed draft-case references from all currently published issue records.
- Updated related-case IDs and relation notes for:
  - `ISSUE-002`
  - `ISSUE-003`
  - `ISSUE-006`
  - `ISSUE-015`
  - `ISSUE-017`
  - `ISSUE-018`
  - `ISSUE-019`
  - `ISSUE-021`
  - `ISSUE-022`
  - `ISSUE-023`
  - `ISSUE-027`
  - `ISSUE-028`
  - `ISSUE-030`
- Rebuilt generated graduation JSON and public CSV/JSON data.
- Regenerated `docs/GRADUATION_CONTENT_QA.md`.

### Current Public Relationship Status

- published issues: 30
- published cases: 45
- published issues with at least one published related case: 30/30
- published issues with no published related case: 0
- published issues still referencing draft cases: 0
- published cases using placeholder images: 0
- published cases missing image source/license/credit: 0

### Validation

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: `node --check scripts/audit-graduation-content.mjs`.
- Passed before this log entry was finalized: `npm run graduation:audit`.
- Passed before this log entry was finalized: relationship spot check confirmed 0 draft-case references from published issues.
- Passed before this log entry was finalized: `npm run typecheck`.
- Passed before this log entry was finalized: `npm run lint`.
- Passed before this log entry was finalized: `npm run test:unit`.
- Passed before this log entry was finalized: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- 16 published cases still use remote image URLs because Wikimedia localization is rate-limited.
- Several high-profile exact examples remain draft until reusable images are found, including `CASE-001`, `CASE-004`, and `CASE-006`.
- Some replacement case relations are practical public-ready analogies rather than exact one-to-one matches; they should be refined if exact reusable images become available.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- generated graduation issue data after rebuild
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Move from relationship cleanup to image localization again only after Wikimedia rate limits cool down; otherwise continue a source-quality pass on the 55 remaining draft cases.

## 2026-07-05 — Graduation Case Reference Completeness Patch

### Scope

- Fixed the small integrity gap found after the published relation cleanup.
- Kept the public issue surface unchanged.

### Implemented

- Reattached the one unreferenced draft case, `CASE-026` Yoridoko Employment Support Center, to draft issue `ISSUE-093`.
- Added a relation note explaining why an employment-support storefront case belongs in the economic self-reliance topic.
- Rebuilt generated graduation data and regenerated `docs/GRADUATION_CONTENT_QA.md`.

### Current Integrity Status

- missing or inconsistent references: 0
- unreferenced site types: 0
- unreferenced cases: 0
- published issues still referencing draft cases: 0

### Validation

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: `node --check scripts/audit-graduation-content.mjs`.
- Passed before this log entry was finalized: `npm run graduation:audit`.
- Passed before this log entry was finalized: spot check confirmed `CASE-026` is referenced by `ISSUE-093`.
- Passed before this log entry was finalized: `npm run typecheck`.
- Passed before this log entry was finalized: `npm run lint`.
- Passed before this log entry was finalized: `npm run test:unit`.
- Passed before this log entry was finalized: `npx playwright test` with 12/12 tests passing.

### Remaining Known Risk

- This does not solve the remaining image-localization queue; 16 published cases still use remote image URLs.
- `CASE-026` is still draft because it lacks a reusable confirmed image.

### Rollback Scope

If rejected, revert only:

- `content/issues.csv`
- generated graduation issue data after rebuild
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/USER_SIMULATION_LOG.md`
- this `docs/WORKLOG.md` entry

### Next Recommended Step

- Continue with source-quality work on draft cases, or retry the remote-image queue later when Wikimedia rate limits cool down.

## 2026-07-05 — Graduation Navigation And Public Case UX Fix

### Scope

- Fixed the user-reported graduation submenu and case-library access problems on production.
- Kept the graduation V1 as a Chinese-only content module until real JA/EN translations exist, to avoid mixed Japanese shell + Chinese content.

### Implemented

- Added direct entry buttons from the graduation home page to the issue, site, and case libraries.
- Converted the home page main tags into real links to filtered issue-list pages.
- Added a graduation subnav across list, detail, random, and brief pages so users can move directly between issue library, site library, case library, random inspiration, and teacher brief.
- Filtered case lists and related cases to public-ready cases only: published status, real image, image source URL, license, and credit are required.
- Moved the public-case rule into `src/lib/graduation.ts` so static route generation and UI rendering use the same rule.
- Reduced graduation static generation from 765 catch-all entries to 600 after draft and placeholder case detail pages stopped being generated.
- Added route-level redirects from `/ja/graduation/:path*` and `/en/graduation/:path*` to `/zh/graduation/:path*`.
- Replaced locale-dependent tag sorting with deterministic sorting to prevent hydration mismatch between server and browser.
- Updated the graduation nav label in Japanese from the shorter old label to `卒業設計アイデア`.

### Production Result

- Production deployment: `https://architect-history-next-e62f8q99j-yrqx-95s-projects.vercel.app`
- Production alias: `https://archistory.app`
- Public case library now exposes 45 case detail links.
- Production `/ja/graduation` returns `307` to `/zh/graduation/`.
- Production `/en/graduation/cases` returns `307` to `/zh/graduation/cases`.
- Production browser check on `/zh/graduation/cases`: heading `案例库`, 45 case links, 0 placeholder images, 0 console warnings/errors.

### Validation

- Passed before final deploy: `npm run typecheck`.
- Passed before final deploy: `npm run lint`.
- Passed before final deploy: `npm run build`.
- Passed before final deploy: `npm run test:e2e -- tests/e2e/graduation-case-render.spec.ts`.
- Passed after deploy: `curl -I https://archistory.app/ja/graduation` returned `307` to `/zh/graduation/`.
- Passed after deploy: production home HTML includes `看案例库`, `查看全部案例`, and clickable tag links.
- Passed after deploy: production case-library browser check found 45 public case links, 0 placeholder images, and no console errors.

### Remaining Known Risk

- Graduation content itself is still Chinese-only. The current fix redirects JA/EN graduation paths to Chinese instead of pretending the content is translated.
- A few draft case IDs can still appear inside issue reference arrays in the serialized data, but they are not rendered as case cards or placeholder images.
- The broader site still has inconsistent card-heavy UI on non-home pages; the next pass should unify the interaction style around the current home page line-divided hover pattern.

### Rollback Scope

If rejected, revert only:

- `src/components/GraduationInspirationApp.tsx`
- `src/app/[lang]/graduation/[[...slug]]/page.tsx`
- `src/lib/graduation.ts`
- `src/lib/i18n.ts`
- `next.config.ts`
- `tests/e2e/graduation-case-render.spec.ts`
- this `docs/WORKLOG.md` entry
- the matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Start a global UI/UX unification pass using the current home page as the reference: line-based layout, minimal card borders, hover-only emphasis, and image zoom constrained inside the image frame.

## 2026-07-05 — Graduation UI Line-Based Unification Pass

### Scope

- First pass of the global UI/UX unification requested after the user identified the current home page as the preferred reference.
- Applied the home page's visual rules to the graduation module first, because it was the most visibly card-heavy after the navigation/content fixes.

### Design Reference Used

- Existing home page reference, not a newly invented direction:
  - section-level line dividers instead of boxed panels
  - `interactive-row` hover background emphasis
  - text color change on hover
  - image zoom constrained inside `.image-frame`
  - minimal shadows and no nested cards for archive content

### Implemented

- Converted graduation issue, site, and case cards into line-divided `interactive-row` entries.
- Removed most raised surfaces and card shadows from graduation home recommendations, list items, info blocks, random result blocks, and brief content.
- Converted graduation subnav from boxed buttons into lightweight text tabs with active bottom border.
- Kept borders on search, filter, and export controls because they are functional controls rather than archive content.
- Updated case thumbnails to use `image-frame` and `image-zoom`, matching the home page image interaction pattern.
- Marked the first visible case-list image as `eager` to remove the local LCP warning.

### Production Result

- Production deployment: `https://architect-history-next-m1di54wml-yrqx-95s-projects.vercel.app`
- Production alias: `https://archistory.app`
- `/zh/graduation/cases` now uses a line-based archive layout with 45 public case links and no placeholder images.
- `/ja/graduation` still redirects to `/zh/graduation/`.

### Validation

- Passed before deploy: `npm run typecheck`.
- Passed before deploy: `npm run lint`.
- Passed before deploy: `npm run build`.
- Passed before deploy: `npm run test:e2e -- tests/e2e/graduation-case-render.spec.ts`.
- Browser local QA passed on `/zh/graduation`, `/zh/graduation/cases`, tag navigation, desktop viewport, and 390px mobile viewport.
- Production Playwright smoke check passed: `案例库`, 45 case links, 0 placeholder images, no horizontal overflow, no console warnings/errors, first case image loading `eager`.
- Production redirect check passed: `/ja/graduation` returns `307` to `/zh/graduation/`.

### Remaining Known Risk

- This is not yet a whole-site UI rewrite. Other surfaces still have card-heavy sections, especially timeline, map, paths, code topic pages, and some architect/detail support panels.
- Filter controls are still visibly boxed by design; they should stay more control-like unless a later tool-surface pass defines a different control language.

### Rollback Scope

If rejected, revert only:

- `src/components/GraduationInspirationApp.tsx`
- this `docs/WORKLOG.md` entry
- the matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Continue the UI unification pass on browse/category surfaces next: `src/app/[lang]/browse/page.tsx`, `src/components/BuildingExplorer.tsx`, `src/components/ArchitectExplorer.tsx`, and map/timeline cards after that.

## 2026-07-05 — Browse + Timeline UI Line-Based Unification Pass

### Scope

- Continued the global UI/UX unification using the current home page as the reference.
- Focused on archive category surfaces and timeline navigation after the graduation module cleanup.

### Design Reference Used

- Existing home page interaction model:
  - large visual entry on the left
  - line-divided supporting entries on the right
  - hover-only background emphasis through `interactive-row`
  - image zoom constrained inside `.image-frame`
  - minimal raised cards and minimal shadows

### Implemented

- Reworked `BuildingExplorer` featured area from raised cards into a large image entry plus right-side line list.
- Reworked `ArchitectExplorer` in the same structure for visual consistency.
- Changed building/architect mode controls from pill containers to underline tabs.
- Reworked reusable `ArchitectCard` from a boxed card into a line-divided row with portrait thumbnail.
- Reworked timeline period summaries, narrative period blocks, dense-decade entries, and decade index sections into open bordered sections.
- Reworked `TimelineRail` from a rounded shadowed carousel card into a line-divided horizontal rail.
- Fixed architect explorer hero images by using `object-contain` for the large portrait slot, avoiding blank-looking cropped portraits.

### Local Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Browser plugin QA partially passed:
  - `/ja/browse/buildings`, `/ja/browse/architects`, and `/ja/timeline` loaded with correct page titles, nonblank DOM, no framework overlay, no console warnings/errors, and no horizontal overflow.
  - screenshots confirmed the line-based visual direction.
  - Browser click validation became unstable and timed out during the final interaction step.
- Playwright fallback QA passed:
  - `/ja/browse/buildings` mode interaction changed active tab from `国` to `用途`.
  - `/ja/browse/architects` hero image loaded after animation with `object-contain`, natural width 640.
  - `/ja/timeline` at 390px mobile viewport had no horizontal overflow.
  - Console warnings/errors: 0.

### Production Result

- Production deployment: `https://architect-history-next-rhpimif7g-yrqx-95s-projects.vercel.app`
- Production alias: `https://archistory.app`
- Deployment id: `dpl_EaPZ6QeyBn4Txur3fX6VbAPVuzmF`
- Production smoke check passed:
  - `/ja/browse/buildings` active grouping changed from `国` to `用途`.
  - `/ja/browse/architects` hero image loaded with natural width 1400 and `object-contain`.
  - `/ja/timeline` at 390px mobile viewport had no horizontal overflow.
  - Console warnings/errors: 0.

### Remaining Known Risk

- This pass does not yet clean the remaining high-card-density surfaces: map, code detail pages, path pages, and parts of architect/building detail support panels.
- One `interactive-card`/shadow count can still appear on checked pages due shared layout/mobile navigation surfaces, but the main browse/timeline content no longer uses the previous card-heavy structure.
- The first Playwright screenshot can catch the page during the fade-in animation; validation used a short post-load wait for final screenshots.

### Rollback Scope

If rejected, revert only:

- `src/components/BuildingExplorer.tsx`
- `src/components/ArchitectExplorer.tsx`
- `src/components/ArchitectCard.tsx`
- `src/components/TimelineRail.tsx`
- `src/app/[lang]/timeline/page.tsx`
- this `docs/WORKLOG.md` entry
- the matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Continue the same UI cleanup on `map`, `paths`, `code` pages, then do a final detail-page support-panel pass.

## 2026-07-05 — Graduation Module Japanese Language Restore

### Scope

- Restored the graduation inspiration module as a real multilingual section instead of redirecting Japanese and English paths back to Chinese.
- Focused first on the user-reported problem: Japanese classmates must be able to read `/ja/graduation` without mixed Chinese content.

### Implemented

- Removed the graduation redirects from `next.config.ts`.
- Removed the `/ja` and `/en` redirect guard in `src/app/[lang]/graduation/[[...slug]]/page.tsx`.
- Added localized field support to `src/lib/graduation.ts`.
- Updated `src/components/GraduationInspirationApp.tsx` so home, lists, details, random export, CSV export, tags, site names, case concepts, and brief markdown read `*_ja` / `*_en` fields when the route language requires it.
- Added Japanese and English content fields to graduation issues, site types, cases, and brief data.
- Updated generated public data and editable CSV exports through `scripts/build-graduation-data.mjs`.
- Updated graduation schemas so localized fields survive future CSV/JSON validation.
- Cleaned obvious Chinese residue from Japanese fields, especially visible tags, site names, building types, and case keywords.

### Validation

- Passed: `node scripts/build-graduation-data.mjs --from-json`.
- Passed: `node scripts/build-graduation-data.mjs`.
- Passed: targeted Japanese-field scan for obvious Chinese residue.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Local Playwright smoke check passed:
  - `/ja/graduation`, `/ja/graduation/issues`, `/ja/graduation/issues/ISSUE-001`, `/ja/graduation/sites`, `/ja/graduation/cases`, `/ja/graduation/brief` returned 200 and did not redirect to `/zh`.
  - `/en/graduation` and `/zh/graduation` returned 200.
  - Japanese tag click produced `/ja/graduation/issues?tag=...`.
  - cases list exposed 45 direct case links.
  - 390px mobile checks had no horizontal overflow.

### Production Result

- Production deployment: `https://architect-history-next-n3mmx9psr-yrqx-95s-projects.vercel.app`
- Production alias: `https://archistory.app`
- Deployment id: `dpl_96LwXauLnTzZo5fEbqdFyiG5QqYS`
- Production Playwright smoke check passed:
  - `/ja/graduation`, `/ja/graduation/issues`, `/ja/graduation/issues/ISSUE-001`, `/ja/graduation/cases`, `/ja/graduation/brief` returned 200.
  - no redirect to `/zh`.
  - targeted Chinese-residue hits: 0.
  - Japanese tag click worked.
  - cases list exposed 45 direct case links.
  - mobile `/ja/graduation/brief` had no horizontal overflow.
  - console warnings/errors: 0.

### Remaining Known Risk

- Japanese copy is now usable and no longer visibly mixed with Chinese on checked routes, but it is still a first-pass content localization, not final human-polished Japanese.
- English fallback fields were also added, but this pass prioritized Japanese quality.
- Some case images are still placeholders from the earlier image-audit backlog; this task did not replace images.

### Rollback Scope

If rejected, revert only:

- `next.config.ts`
- `src/app/[lang]/graduation/[[...slug]]/page.tsx`
- `src/lib/graduation.ts`
- `src/components/GraduationInspirationApp.tsx`
- `scripts/build-graduation-data.mjs`
- `schemas/issue.schema.json`
- `schemas/site_type.schema.json`
- `schemas/case.schema.json`
- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`
- `src/content/graduation/brief.json`
- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `public/data/graduation/issues.json`
- `public/data/graduation/site_types.json`
- `public/data/graduation/cases.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/site_types.csv`
- `public/data/graduation/cases.csv`
- this `docs/WORKLOG.md` entry
- the matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Human-polish the top 20 Japanese issue titles/summaries and the first 20 case concepts, then continue the global line-based UI cleanup on `map`, `paths`, and `code` surfaces.

## 2026-07-05 — Map, Paths, and Code Line-Based UI Unification

### Scope

- Continued the global UI unification after the graduation language fix.
- Focused on high-card-density support surfaces:
  - `/[lang]/map`
  - `/[lang]/paths`
  - `/[lang]/paths/[slug]`
  - `/[lang]/code/[slug]`

### Design Reference Used

- Existing home page interaction model:
  - line-divided entries
  - hover-only background feedback through `interactive-row`
  - image zoom contained inside `.image-frame`
  - minimal shadows and minimal boxed cards

### Implemented

- Reworked the map statistics strip from a boxed shadow card into a line-divided metrics band.
- Reworked map country entries, featured region routes, city image entries, and text city entries from raised cards into line-divided interactive rows.
- Moved map thumbnails to the shared `image-frame` / `image-zoom` treatment so hover feedback stays inside the image bounds.
- Reworked archive route cards on `/paths` into line-based route entries.
- Reworked route detail steps on `/paths/[slug]` into one continuous line-divided list.
- Reworked code detail support blocks from small raised cards into bordered article sections:
  - exam snapshot
  - formulas
  - variables and terms
  - calculation steps
  - worked examples
  - comparison tables
  - diagram notes
  - official source blocks
  - disclaimer block
- Reworked `VerificationBlock` and `CodeTopicDiagrams` containers so code pages no longer carry shadow-card visual islands.

### Local Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Browser plugin QA passed on `http://127.0.0.1:3026`:
  - `/ja/map`: 200-equivalent render, h1 `建築地図`, no framework overlay, no console warnings/errors, no horizontal overflow, `shadowCards=0`, `cardLikeBlocks=0`.
  - `/ja/paths`: h1 `資料ルート`, no framework overlay, no console warnings/errors, no horizontal overflow, `shadowCards=0`, `cardLikeBlocks=0`.
  - `/ja/code/zoning-districts`: h1 `用途地域`, no framework overlay, no console warnings/errors, no horizontal overflow, `shadowCards=0`, `cardLikeBlocks=0`.
  - interaction proof: clicked the unique `/ja/paths/corbusier-to-japanese-modernism` route link and landed on the route detail page.
  - mobile viewport 390px: `/ja/map`, `/ja/paths`, and `/ja/code/zoning-districts` had no horizontal overflow and `shadowCards=0`.

### Production Result

- Production deployment: `https://architect-history-next-j1iujjvr5-yrqx-95s-projects.vercel.app`
- Production alias: `https://archistory.app`
- Deployment id: `dpl_Fsq9eBCo2a2zRQ4rNKeHGBuJxBEm`
- Production smoke check passed:
  - `/ja/map`, `/ja/paths`, `/ja/code/zoning-districts` returned 200.
  - desktop viewport: no horizontal overflow, no framework overlay, no console warnings/errors, `shadowCards=0`, `cardLikeBlocks=0`.
  - interaction proof: `/ja/paths` route link opened `/ja/paths/corbusier-to-japanese-modernism`.
  - mobile 390px: no horizontal overflow and `shadowCards=0` on all three checked pages.

### Remaining Known Risk

- This pass does not yet remove all card-heavy support panels on architect detail, building detail, era detail, layout dropdowns, mobile nav, feedback, search input, and gallery surfaces.
- Code pages still keep functional visual boundaries for tables, SVG diagrams, and badges; these are now line-based but still visually denser than map/paths.
- This pass did not redesign content hierarchy or rewrite text; it only unified the component style.

### Rollback Scope

If rejected, revert only:

- `src/app/[lang]/map/page.tsx`
- `src/app/[lang]/paths/page.tsx`
- `src/app/[lang]/paths/[slug]/page.tsx`
- `src/app/[lang]/code/[slug]/page.tsx`
- `src/components/VerificationBlock.tsx`
- `src/components/CodeTopicDiagrams.tsx`
- this `docs/WORKLOG.md` entry
- the matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Continue the same line-based cleanup on architect detail, building detail, era detail, and mobile navigation/dropdown surfaces, then do one visual regression pass across the main Japanese routes.

## 2026-07-05 - Graduation Detail Density and Archive Context Pass

### Status

- Passed locally and deployed to production.

### User Problem

- Graduation detail pages left a large empty right-side area on desktop.
- Issue detail pages felt too thin after click-through: related cases and source/material context were not enough.
- Japanese pages still needed visible-language cleanup.

### Design Reference Used

- Existing home page archive style:
  - line-divided layouts
  - hover feedback without heavy raised cards
  - contained image behavior
  - compact hierarchy with less boxed nesting

### Implemented

- Added a detail header meta rail for graduation detail pages, filling the desktop right side with useful counts instead of empty space.
- Added dynamic section grid columns so one- and two-item sections no longer reserve a blank third column.
- Expanded issue detail related cases from direct-only references to direct plus same-keyword supplemental references.
- ISSUE-001 now shows 6 related cases instead of 3.
- Added a `資料メモ` block to issue detail pages:
  - problem axis
  - site reading method
  - case reading method
- Added readable Japanese source labels such as `内閣府` and `厚生労働省` before raw source URLs.
- Cleaned remaining visible Japanese-field language residue in graduation content, including `足汤`, `多代交流`, `餐厅`, and `资料館`.
- Rebuilt graduation CSV and public JSON/CSV data from the cleaned JSON sources.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Local browser QA passed on `http://127.0.0.1:3027`:
  - `/ja/graduation/issues/ISSUE-001`: h1 `独居高齢者とコミュニティの断絶`, `caseLinkCount=6`, header meta present, archive notes present, no visible Chinese residue, no horizontal overflow, no console warnings/errors.
  - Clicked `事例` from the issue detail page and landed on `/ja/graduation/cases`.
  - `/ja/graduation/cases`: `caseRows=45`, no horizontal overflow.
  - Mobile 390px issue detail: `caseLinkCount=6`, header meta present, archive notes present, no visible Chinese residue, no horizontal overflow.
- Production QA passed on `https://archistory.app`:
  - `/ja/graduation/issues/ISSUE-001`: h1 `独居高齢者とコミュニティの断絶`, `caseLinkCount=6`, header meta present, archive notes present, no visible Chinese residue, no horizontal overflow, no console warnings/errors.
  - `/ja/graduation/cases`: `caseRows=45`, no horizontal overflow.
  - Mobile 390px issue detail: `caseLinkCount=6`, header meta present, archive notes present, no visible Chinese residue, no horizontal overflow.

### Production Result

- Production deployment: `https://architect-history-next-9fbwvgg1k-yrqx-95s-projects.vercel.app`
- Production alias: `https://archistory.app`
- Vercel output: ready in 7 minutes.

### Remaining Known Risk

- The new supplemental case relation notes are still systematic and keyword-based, not fully hand-edited for each issue.
- The overall graduation content base is larger than before, but still not at the final 100 issues / 100 cases target.
- Raw multilingual data can still contain Chinese fields inside embedded data payloads because the app ships all language variants; the checked Japanese visible UI does not show those Chinese residues.

### Rollback Scope

If rejected, revert only:

- `src/components/GraduationInspirationApp.tsx`
- `src/content/graduation/issues.json`
- `src/content/graduation/cases.json`
- `src/content/graduation/site-types.json`
- `content/issues.csv`
- `content/site_types.csv`
- `content/cases.csv`
- `public/data/graduation/issues.json`
- `public/data/graduation/site_types.json`
- `public/data/graduation/cases.json`
- `public/data/graduation/issues.csv`
- `public/data/graduation/site_types.csv`
- `public/data/graduation/cases.csv`
- this `docs/WORKLOG.md` entry
- the matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Hand-polish the first 20 Japanese issue-to-case relation notes so the added related cases feel chosen by an editor, then continue global UI unification on architect detail, building detail, era detail, and mobile navigation surfaces.

## 2026-07-05 - Graduation Related Case Row Layout Pass

### Status

- Passed locally and deployed to production.

### User Problem

- On `/ja/graduation/issues/ISSUE-002`, the related case area used a multi-column card grid.
- Text beside each image felt too narrow and compressed.
- The last row had only one case card on the left, leaving a large blank area on the right.
- One Japanese case text still showed the simplified Chinese term `离島`.

### Implemented

- Added a detail-page-specific `CaseArchiveList` and `CaseArchiveRow`.
- Replaced related case grids on issue, site, and random graduation detail surfaces with full-width archive rows.
- Each related case row now uses:
  - left image column
  - wide central title / relation note / concept area
  - right metadata rail on desktop
  - stacked full-width layout on mobile
- Kept the existing `CaseCard` for list and home surfaces where compact grid browsing is still useful.
- Cleaned Japanese graduation fields for the visible residue group:
  - `离島` -> `離島`
  - `島屿` -> `島嶼`
  - `身体体验` -> `身体体験`
  - `景观` -> `景観`
  - `港口` -> `港`
- Rebuilt graduation CSV and public JSON/CSV data from the cleaned JSON sources.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Local Browser QA passed on `http://127.0.0.1:3028/ja/graduation/issues/ISSUE-002`:
  - desktop: h1 `空き家再生と地域創生`
  - desktop: `relatedCaseRows=4`
  - desktop row widths: `1178, 1178, 1178, 1178`
  - desktop last row width: `1178`
  - desktop: no horizontal overflow
  - desktop: no visible `离島|足汤|资料館|餐厅|多代交流`
  - mobile 390px: `relatedCaseRows=4`, row widths `336, 336, 336, 336`, no horizontal overflow
  - interaction proof: clicked `CASE-005` and landed on `/ja/graduation/cases/CASE-005`
- Production QA passed on `https://archistory.app/ja/graduation/issues/ISSUE-002`:
  - desktop: h1 `空き家再生と地域創生`
  - desktop: `relatedCaseRows=4`
  - desktop row widths: `1184, 1184, 1184, 1184`
  - desktop last row width: `1184`
  - desktop: no horizontal overflow
  - desktop: no visible `离島|足汤|資料館|餐厅|多代交流`
  - mobile 390px: `relatedCaseRows=4`, row widths `342, 342, 342, 342`, no horizontal overflow
  - interaction proof: clicked `CASE-005` and landed on `/ja/graduation/cases/CASE-005`
  - console warnings/errors: 0

### Production Result

- Production deployment: `https://architect-history-next-m0aru3ofq-yrqx-95s-projects.vercel.app`
- Production alias: `https://archistory.app`
- Deployment id: `dpl_AHUByroXuoPbWXmhFgrfBpFTGLzy`

### Notes

- Browser plugin validation worked locally. Production Browser validation timed out twice while loading the production page, so production QA was completed with the project Playwright runtime.

### Remaining Known Risk

- This pass fixes related case layout only; other graduation sections may still need more editorial density and hand-written relation notes.
- Some draft Japanese content still contains rough machine-like terms outside the checked visible ISSUE-002 path; a broader Japanese content polish pass remains needed.

### Rollback Scope

If rejected, revert only:

- `src/components/GraduationInspirationApp.tsx`
- `src/content/graduation/issues.json`
- `src/content/graduation/cases.json`
- `src/content/graduation/site-types.json`
- regenerated `content/*.csv`
- regenerated `public/data/graduation/*`
- this `docs/WORKLOG.md` entry
- the matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Do a broader Japanese content QA pass for the first 20 published issues and their visible related cases, then continue applying the full-width archive-row pattern to any remaining detail-page sections that still create awkward empty columns.

## 2026-07-05 - First 20 Graduation Japanese Content QA and Case Density Pass

### Status

Completed locally and deployed to production.

### User Problem

- Japanese graduation detail pages still risked showing Chinese residue in visible text.
- Some issue pages did not have enough related case material, making the page feel thin.
- The related case layout was improved earlier, but `ISSUE-002` still only showed four direct cases in production.

### Implemented

- Hand-polished Japanese content for the first 20 published graduation issues:
  - `summary_ja`
  - `keywords_ja`
  - `recommended_building_types_ja`
  - direct `case_relation_notes_ja`
- Rewrote direct related case concepts for the first 20 issue set so they read less like repeated generated text.
- Added a controlled Japanese-field cleanup pass for `_ja` fields only, covering simplified Chinese residue such as `设计`, `建筑`, `空间`, `无障害`, `临時`, `广場`, `低层`, `桑拿`, and similar terms.
- Rebuilt `content/*.csv` and `public/data/graduation/*` from source JSON.
- Changed `issueDisplayCases` so each issue detail page shows at least 8 case rows:
  - direct reference cases first
  - keyword-matched supplemental cases second
  - public case fallback rows last
- Removed the separate desktop metadata rail from `CaseArchiveRow`; case rows now keep image and text in a simpler two-column archive layout with wider text.

### Validation

- Passed Japanese data audit:
  - checked `src/content/graduation/issues.json`
  - checked `src/content/graduation/site-types.json`
  - checked `src/content/graduation/cases.json`
  - failure count: `0`
  - first 20 issue IDs checked: `ISSUE-001` through `ISSUE-020`
  - direct related case count: `20`
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Local Browser QA on `http://127.0.0.1:3029/ja/graduation/issues/ISSUE-002`:
  - h1 `空き家再生と地域創生`
  - related case rows: `8`
  - no horizontal overflow
  - visible residue hits: `0`
  - first row text width approximately `846px`
  - updated concepts visible, including `旧学校の教室や廊下` and `旧精錬所の遺構`
- Local Browser QA on sample routes:
  - `/ja/graduation/issues/ISSUE-001`: 8 case rows, no overflow, residue hits 0
  - `/ja/graduation/issues/ISSUE-017`: 8 case rows, no overflow, residue hits 0
  - `/ja/graduation/issues/ISSUE-018`: 8 case rows, no overflow, residue hits 0
  - `/ja/graduation/issues/ISSUE-020`: 8 case rows, no overflow, residue hits 0
  - `/ja/graduation/issues/ISSUE-017` at 390px mobile: no horizontal overflow
- Interaction proof:
  - clicked `CASE-005` from `ISSUE-002`
  - reached `/ja/graduation/cases/CASE-005`
  - case detail title `3331 Arts Chiyoda`
  - source and related issue sections visible
- Console warnings/errors during sampled Browser QA: `0`.

### Production Result

- Production alias: `https://archistory.app`
- Production deployment: `https://architect-history-next-lf9fu6ciu-yrqx-95s-projects.vercel.app`
- Deployment id: `dpl_7WRafWoCrf5Nvc1xEqUwK6BrDC7e`
- Vercel ready state: `READY`

### Production QA

- Passed on `https://archistory.app/ja/graduation/issues/ISSUE-002`:
  - h1 `空き家再生と地域創生`
  - related case rows: `8`
  - row widths: `1178` for all 8 checked rows
  - no horizontal overflow
  - visible residue hits: `0`
  - updated concepts visible, including `旧学校の教室や廊下` and `旧精錬所の遺構`
- Passed on `https://archistory.app/ja/graduation/issues/ISSUE-017` at 390px mobile:
  - h1 `低所得家庭と生活スキル支援`
  - related case rows: `8`
  - no horizontal overflow
- Production interaction proof:
  - scrolled to `CASE-005` on `/ja/graduation/issues/ISSUE-002`
  - clicked the visible row
  - reached `/ja/graduation/cases/CASE-005`
  - title `3331 Arts Chiyoda`
  - source and related issue sections visible
- Production console warnings/errors during sampled QA: `0`.

### Remaining Known Risk

- The first 20 direct issue-to-case notes are polished, but fallback supplemental notes are still generic by design.
- Later issues (`ISSUE-021` onward) may still need hand-written Japanese summaries and relation notes.
- Related cases are now denser, but some fallback cases may be only broadly useful rather than tightly matched.

### Rollback Scope

If rejected, revert only:

- `src/components/GraduationInspirationApp.tsx`
- `src/content/graduation/issues.json`
- `src/content/graduation/cases.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/brief.json`
- regenerated `content/*.csv`
- regenerated `public/data/graduation/*`
- this `docs/WORKLOG.md` entry
- the matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Continue the same Japanese editorial pass for `ISSUE-021` through `ISSUE-040`, then replace generic fallback relation notes with tighter hand-written notes for the most visible supplemental cases.

## 2026-07-05 - Graduation Issues 021-040 Polish and Public Case Expansion

### Status

Completed locally and deployed to production.

### User Problem

- The next batch of graduation issues needed the same Japanese editorial quality as `ISSUE-001` through `ISSUE-020`.
- The site still felt thin because many case records existed only as drafts and did not appear in the public case archive.
- `ISSUE-031` through `ISSUE-040` were still draft-only, so polishing them without publishing would not help users.

### Implemented

- Polished Japanese fields for `ISSUE-021` through `ISSUE-040`:
  - `summary_ja`
  - `keywords_ja`
  - `recommended_building_types_ja`
  - direct `case_relation_notes_ja`
- Added tighter direct case references to the second issue batch, especially for:
  - postpartum and child care
  - dementia-friendly community
  - disability employment and small commerce
  - food loss and food education
  - under-rail spaces
  - urban agriculture
  - medical access and daily consultation
  - multicultural learning support
  - public toilets and walkability
  - evacuation privacy
  - student workshops
  - post-disaster memory
- Published `ISSUE-031` through `ISSUE-040`, increasing visible published issues from `30` to `40`.
- Promoted and polished 16 image-backed draft cases so they appear in the public case archive:
  - `CASE-039` MIKAN SHIMOKITA
  - `CASE-056` Tainan Spring
  - `CASE-063` Roadside Station Aino Tsuchiyama
  - `CASE-068` Miyashita Park Atelier Bow-Wow
  - `CASE-070` Tonami Public Library
  - `CASE-076` Kozakai Kifukan Community Center
  - `CASE-077` Pasona Urban Farm
  - `CASE-079` Ebina City Arima Library and Community Center
  - `CASE-089` Het Hof van Cartesius
  - `CASE-092` Ishikawa Prefectural Library
  - `CASE-094` Takanawa Gateway Station
  - `CASE-095` Nakajima Library Akita International University
  - `CASE-096` Japanese American Community and Cultural Center
  - `CASE-098` Helsinki Central Library Oodi
  - `CASE-099` Tate Modern
  - `CASE-100` Portland Japanese Garden Cultural Village
- Rebuilt `content/*.csv` and `public/data/graduation/*` from source JSON.

### Validation

- Japanese residue audit passed:
  - checked `ISSUE-021` through `ISSUE-040`
  - checked all case `_ja` fields
  - failure count: `0`
- Data count after this pass:
  - published issues: `40`
  - public visible cases: `61`
  - total case records: `100`
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Static route generation increased from the previous `4000` baseline to `4048`, consistent with more public graduation case routes.
- Local Browser QA passed:
  - `/ja/graduation/issues/ISSUE-021`: 8 case rows, no Not Found, no overflow, residue hits 0
  - `/ja/graduation/issues/ISSUE-029`: 8 case rows, no Not Found, no overflow, residue hits 0
  - `/ja/graduation/issues/ISSUE-040`: 8 case rows, no Not Found, no overflow, residue hits 0
  - `/ja/graduation/issues/ISSUE-040` at 390px: no horizontal overflow
  - `/ja/graduation/cases/CASE-098`: visible, one image, source visible, no overflow, residue hits 0
  - `/ja/graduation/cases/CASE-039`: visible, one image, source visible, no overflow, residue hits 0
  - `/ja/graduation/cases/CASE-056`: visible, one image, source visible, no overflow, residue hits 0
  - `/ja/graduation/cases`: 61 visible rows; Oodi, MIKAN SHIMOKITA, and Tainan Spring visible
  - clicked `CASE-098` from `/ja/graduation/issues/ISSUE-029` and reached `/ja/graduation/cases/CASE-098`
  - console warnings/errors during sampled QA: `0`

### Production Result

- Production alias: `https://archistory.app`
- Production deployment: `https://architect-history-next-q1gm1vexi-yrqx-95s-projects.vercel.app`
- Deployment id: `dpl_AkQD3z8TQ9HsoWuo34JCpXv59dbe`
- Vercel ready state: `READY`
- Note: an earlier deployment attempt `dpl_7EHpwUZoULEnxt3HNZ2JjeuyZTiJ` returned `Not authorized` from the CLI and remained stuck at `Building`; the second deployment completed successfully and was aliased to production.

### Production QA

- Passed on `https://archistory.app/ja/graduation/issues/ISSUE-021`:
  - h1 `産後ケアと子育ての孤立`
  - 8 case rows
  - no Not Found
  - no horizontal overflow
  - visible residue hits: `0`
  - image count: `8`
- Passed on `https://archistory.app/ja/graduation/issues/ISSUE-040`:
  - h1 `災後の地域記憶と共同リビング`
  - 8 case rows
  - no Not Found
  - no horizontal overflow
  - visible residue hits: `0`
  - image count: `8`
- Passed on `https://archistory.app/ja/graduation/issues/ISSUE-040` at 390px:
  - 8 case rows
  - no horizontal overflow
- Passed on `https://archistory.app/ja/graduation/cases/CASE-098`:
  - h1 `Helsinki Central Library Oodi`
  - source visible
  - image count: `1`
  - no horizontal overflow
- Passed on `https://archistory.app/ja/graduation/cases`:
  - 61 visible rows
  - Oodi, MIKAN SHIMOKITA, and Tainan Spring visible
  - no horizontal overflow
- Production interaction proof:
  - clicked `CASE-098` from `/ja/graduation/issues/ISSUE-029`
  - reached `/ja/graduation/cases/CASE-098`
  - source visible
  - no horizontal overflow
- Production console warnings/errors during sampled QA: `0`.

### Remaining Known Risk

- This pass increases visible cases by publishing already image-backed draft cases; it does not add brand-new `CASE-101+` records yet.
- Some newly public case English fields still use older machine-like wording; Japanese visible fields were prioritized because the current user-visible problem is Japanese pages.
- Some issue-to-case relationships are intentionally broad to enrich browsing; the next refinement should hand-rank the top related cases per issue.

### Rollback Scope

If rejected, revert only:

- `src/content/graduation/issues.json`
- `src/content/graduation/cases.json`
- regenerated `content/*.csv`
- regenerated `public/data/graduation/*`
- this `docs/WORKLOG.md` entry
- the matching `docs/USER_SIMULATION_LOG.md` entry

### Next Recommended Step

- Next content expansion should add new `CASE-101+` records from verified source/image pairs, then hand-rank the top 8 related cases per issue so fallback rows feel less broad.

## 2026-07-05 - Graduation Detailed Filter Pruning

### Intent

- Reduce the noisy detailed filters on `/ja/graduation/issues`.
- Prevent normal filter interactions from leading users into apparent valid combinations that show `表示 0`.
- Make direct zero-result URLs less confusing by showing a clear empty state and a clear-details action.

### Changes

- Updated `src/components/GraduationInspirationApp.tsx`.
- Detailed issue filters are now cascading:
  - tag options are counted against the currently selected site/program scope
  - site options are counted against the currently selected tag/program scope
  - program options are counted against the currently selected tag/site scope
- Reduced long-tail options:
  - tags now show repeated/high-signal options plus the current selected value
  - building program options now show only repeated options plus the current selected value
- Detail filter interactions now clear dependent filters:
  - changing tag clears selected site and program
  - changing site clears selected program
- Added a no-result empty state with `詳細条件をクリア`.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Local Browser QA on `http://127.0.0.1:3030/ja/graduation/issues`:
  - initial detailed options reduced to tag `49`, site `21`, program `4` including each `all` option
  - selecting `多文化` reduced site options to `4` including `all`, and program options to only `all`
  - selecting `多文化` + `SITE-002` showed `表示 2 · 公開済み`
  - changing visible tag from that scoped state cleared the selected site and showed a nonzero result count
  - direct old zero URL `tag=アーカイブ&siteType=SITE-019` showed `表示 0`, selected option counts `(0)`, no console errors, and clear-detail buttons
  - empty state text `見つかりません` appeared for the zero URL
  - console warnings/errors during sampled QA: `0`

### Remaining Known Risk

- Directly pasted incompatible URLs can still show `0` because the data genuinely has no intersection; the UI now exposes this clearly and offers clearing rather than silently rewriting the URL.
- Tags with count `1` are intentionally hidden from the default dropdown, so very specific one-off terms should be found by keyword search or by opening a detailed page.

### Next Recommended Step

- Add a small summary line near the detailed filters later if needed, such as "低频标签请用关键词搜索", but only if user testing shows hidden one-off tags are confusing.

### Production Result

- Production alias: `https://archistory.app`
- Production deployment: `https://architect-history-next-n6wr8tcyb-yrqx-95s-projects.vercel.app`
- Deployment id: `dpl_HHrACZFMZWTrMLARQWqVgtgsc7cd`
- Vercel ready state: `READY`

### Production QA

- Passed on `https://archistory.app/ja/graduation/issues`:
  - title `卒業設計インスピレーション | Archistory`
  - total `表示 100 · 公開済み`
  - detailed option counts: tag `49`, site `21`, program `4`
  - console warnings/errors: `0`
  - hydration mismatch after stable option sorting: `0`
- Passed interaction:
  - selecting `多文化` showed `表示 4 · 公開済み`
  - site options reduced to `コミュニティ公民館周辺 (1)`, `商店街空き店舗 (2)`, `駅周辺隙間地 (1)`
  - selecting `SITE-002` showed `表示 2 · 公開済み`
- Passed old zero-combination state:
  - URL `https://archistory.app/ja/graduation/issues?tag=アーカイブ&siteType=SITE-019`
  - total `表示 0 · 公開済み`
  - empty text `見つかりません`
  - selected counts shown as `(0)`
  - clear-detail buttons visible
  - console warnings/errors: `0`

## 2026-07-05 - Graduation Tag Filter Cap Reduced to 20

### Intent

- Respond to user feedback that the detailed tag dropdown was still too long after the first pruning pass.
- Reduce the issue tag dropdown from 49 options to about 20 visible tags while keeping cascading counts and no-zero-combination behavior.

### Changes

- Updated `src/components/GraduationInspirationApp.tsx`.
- Reduced the issue tag `compactRankedOptions` cap from `48` to `20`.
- Resulting dropdown size is `21` options including `すべてのタグ`, or `20` actual tag choices.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Local Browser QA on `http://127.0.0.1:3030/ja/graduation/issues`:
  - detailed option counts: tag `21`, site `21`, program `4`
  - total `表示 100 · 公開済み`
  - console warnings/errors: `0`
  - selecting `地域食` showed `表示 7 · 公開済み`
  - site options narrowed to matching sites only

### Next Recommended Step

- Deploy this smaller tag cap to production and verify the same option counts on `https://archistory.app`.

## 2026-07-05 - Graduation Site Candidate Locations, Random UI, Feedback Email

### Intent

- Increase the information density of `/ja/graduation/sites` by showing concrete candidate locations for each published site type.
- Make `/ja/graduation/random` easier to understand as a generated thesis-direction bundle.
- Verify public graduation case images for placeholder, source, license, credit, and missing local file issues.
- Change the feedback email to `2505168-1350042@aoyamaseizu-st.ac.jp`.

### Changes

- Extended `GraduationSiteType` with structured `candidate_locations`.
- Added `candidate_locations_json` support to the graduation data build script and site-type schema.
- Added 2 candidate location examples for each of the 20 published site types, including area, place/building name, research angle, and source URL.
- Updated site cards and site detail pages to show `候補地例`.
- Updated random page copy and layout:
  - clearer explanation of what the random page does
  - `ランダム方向` result block
  - issue/site/case summary metrics
  - `使い方` next-step list
- Added candidate locations to JSON/CSV exports.
- Replaced feedback email on all language feedback pages.

### Validation

- Passed: `npm run graduation:data:from-json`.
- Passed: `npm run graduation:data`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Public image metadata check:
  - published cases: `100`
  - published placeholder images: `0`
  - published cases missing image source/license/credit: `0`
  - published local images missing files: `0`
  - published remote images: `55`
- Local Playwright QA on `http://localhost:3000`:
  - `/ja/graduation/sites` contains `候補地例`, `高島平団地`, and `尾道空き家再生`
  - `/ja/graduation/random` contains `ランダム方向`, `使い方`, and `候補地例`
  - `/ja/feedback` contains `2505168-1350042@aoyamaseizu-st.ac.jp`
  - first 30 images on `/ja/graduation/cases` loaded with no broken images
  - console warnings/errors: `0`

### Remaining Risk

- `npm run graduation:audit` still exits non-zero because of existing relation-note inconsistencies unrelated to images. The public image readiness section is clean.
- Candidate locations are research starting points, not confirmed buildable parcels; source links are included so a student can continue field verification.

### Next Recommended Step

- Deploy to production and verify the same three surfaces on `https://archistory.app`: `/ja/graduation/sites`, `/ja/graduation/random`, and `/ja/feedback`.

### Production Result

- Production alias: `https://archistory.app`
- Production deployment: `https://architect-history-next-k09hpr6o7-yrqx-95s-projects.vercel.app`
- Deployment id: `dpl_E5FaL7FaMuF2fSuhK3LUHbTPbiHz`
- Vercel ready state: `READY`

### Production QA

- Passed on `https://archistory.app`:
  - `/ja/graduation/sites` contains `候補地例`, `高島平団地`, and `尾道空き家再生`
  - `/ja/graduation/random` contains `ランダム方向`, `使い方`, and `候補地例`
  - `/ja/feedback` contains `2505168-1350042@aoyamaseizu-st.ac.jp`
  - first 30 images on `/ja/graduation/cases` loaded with no broken images
  - console warnings/errors: `0`

### Production Result

- Production alias: `https://archistory.app`
- Production deployment: `https://architect-history-next-7iw6j6xli-yrqx-95s-projects.vercel.app`
- Deployment id: `dpl_DKXFK3xtsU2RA7FxiVsXAP7avbgs`
- Vercel ready state: `READY`

### Production QA

- Passed on `https://archistory.app/ja/graduation/issues`:
  - title `卒業設計インスピレーション | Archistory`
  - total `表示 100 · 公開済み`
  - detailed option counts: tag `11`, site `21`, program `4`
  - tag dropdown now contains `10` actual tags plus `すべてのタグ`
  - console warnings/errors: `0`

### Production Result

- Production alias: `https://archistory.app`
- Production deployment: `https://architect-history-next-l98a60e21-yrqx-95s-projects.vercel.app`
- Deployment id: `dpl_7Bi2GSRUEE4yaqRYr1JvvxaZ7hP4`
- Vercel ready state: `READY`

### Production QA

- Passed on `https://archistory.app/ja/graduation/issues`:
  - title `卒業設計インスピレーション | Archistory`
  - total `表示 100 · 公開済み`
  - detailed option counts: tag `21`, site `21`, program `4`
  - tag dropdown now contains `20` actual tags plus `すべてのタグ`
  - console warnings/errors: `0`
- Note: a follow-up Browser interaction check for `地域食` timed out twice after the production base check. Local Browser interaction QA for the same cap passed, and the production deployment is READY.

## 2026-07-05 - Graduation Tag Filter Cap Reduced to 10

### Intent

- Respond to user request to reduce the issue tag dropdown from about 20 actual tags to about 10 actual tags.

### Changes

- Updated `src/components/GraduationInspirationApp.tsx`.
- Reduced the issue tag `compactRankedOptions` cap from `20` to `10`.
- Resulting dropdown size is `11` options including `すべてのタグ`, or `10` actual tag choices.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Local Browser QA on `http://127.0.0.1:3030/ja/graduation/issues`:
  - detailed option counts: tag `11`, site `21`, program `4`
  - total `表示 100 · 公開済み`
  - console warnings/errors: `0`
  - selecting `地域食` showed `表示 7 · 公開済み`
  - site options narrowed to matching sites only

### Next Recommended Step

- Deploy this smaller tag cap to production and verify the same option counts on `https://archistory.app`.

## 2026-07-06 - Graduation UI System Unification

### Intent

- Respond to user feedback that the graduation landing page and clicked-in pages felt like different UI/UX systems.
- Unify the visible structure across the landing, list, random, brief, and detail surfaces.

### Changes

- Updated `src/components/GraduationInspirationApp.tsx`.
- Added a shared `GraduationHero` page header pattern with:
  - collection eyebrow
  - large title
  - supporting description
  - primary/secondary actions
  - right-side summary panel
- Switched the home, list, random, and detail shells to that shared header.
- Moved random export controls into the shared hero action area and removed the duplicate lower control group.

### Validation

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Local in-app browser QA passed on:
  - `/ja/graduation`
  - `/ja/graduation/random`
  - `/ja/graduation/issues/ISSUE-001`
- Local mobile Playwright QA passed on `/ja/graduation/random`:
  - viewport width `390`
  - document scroll width `390`
  - no horizontal overflow
  - hero actions visible: `もう一度`, JSON export, CSV export

### Next Recommended Step

- Deploy this UI unification to production and verify `/ja/graduation`, `/ja/graduation/random`, and `/ja/graduation/issues/ISSUE-001` on `https://archistory.app`.

### Production Result

- Production alias: `https://archistory.app`
- Production deployment: `https://architect-history-next-iu251vyww-yrqx-95s-projects.vercel.app`
- Deployment id: `dpl_4QVaLadgQ43YsUEun5erTwrzpBKL`
- Vercel ready state: `READY`

### Production QA

- Passed on `https://archistory.app`:
  - `/ja/graduation` hero class matches shared graduation hero
  - `/ja/graduation/random` hero class matches shared graduation hero
  - `/ja/graduation/issues/ISSUE-001` hero class matches shared graduation hero
  - `/ja/graduation/random` at `390x844` has no horizontal overflow
  - random hero actions visible: `もう一度`, JSON export, CSV export
  - console warnings/errors: `0`
