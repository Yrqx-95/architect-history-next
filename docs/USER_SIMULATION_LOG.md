# User Simulation Log

## Purpose

After meaningful product or design changes, simulate a real visitor using Archistory before deciding the next build step. This log is for user-view evidence, not only technical QA.

## Protocol

1. Pick one persona with one concrete goal.
2. Start from the public entry route a real visitor would use.
3. Judge the experience from the visitor side: what is clear, what is confusing, where the next action is obvious or not obvious.
4. Capture screenshot evidence outside the repo, usually under `/tmp`.
5. Record findings, remaining risk, rollback scope if edits were made, and the next recommended step.

## Standing Lens

- The product direction is an archive room, not a study planner.
- Avoid long text dumps, nested cards, and too many framed boxes.
- Prefer image-led hierarchy, clear primary actions, and fewer decisions.
- Do not invent visual taste from scratch; compare against mature public references when aesthetics are being changed.
- If a design choice is below about 90% confidence, ask before making expensive or hard-to-reverse changes.

## 2026-07-09 - Simulation 57: Graduation Image Retry And Core Flow QA

Status: local user-simulation QA passed after image retry localization.

Persona: Chinese architecture student entering the graduation inspiration section after new case images were localized.

Goal: verify that the graduation module still works as a research path after moving two remote Commons images to local assets.

Path simulated:

1. `/zh/graduation`
2. `/zh/graduation/issues`
3. open detailed filters and select `SITE-002`
4. `/zh/graduation/cases/CASE-044`
5. `/zh/graduation/cases/CASE-045`
6. `/zh/graduation/random`
7. click `再来一次`
8. mobile 390px on `/zh/graduation/random`

User-view findings:

1. The graduation home still presents the social-issue entry clearly.
2. Detailed filtering by site type updates the URL to `siteType=SITE-002` and shows the expected child-care issue.
3. `CASE-044` and `CASE-045` now render local case images with image attribution.
4. `CASE-044` is a shorter case detail page, but it is not blank: title, image, year, location, source, and related issue all render.
5. `CASE-045` renders the localized Teshima Art Museum image through the local graduation image path.
6. The random-entry page keeps the generated bundle after clicking `再来一次`, including issue/site/case links and JSON/CSV export buttons.
7. Mobile 390px has no horizontal overflow on the random-entry page.

Validation:

- Screenshot evidence:
  - `/tmp/archistory-graduation-qa-2026-07-09/desktop-home.png`
  - `/tmp/archistory-graduation-qa-2026-07-09/issues-filtered-site-002.png`
  - `/tmp/archistory-graduation-qa-2026-07-09/case-045-local-image.png`
  - `/tmp/archistory-graduation-qa-2026-07-09/random-after-reroll.png`
  - `/tmp/archistory-graduation-qa-2026-07-09/mobile-random-playwright.png`
- Browser QA:
  - page identity and nonblank checks passed for home, issue filtering, case details, and random entry.
  - `CASE-044` image natural size: 750 x 500.
  - `CASE-045` image rendered from the local graduation image path.
  - random page retained `浏览入口`, `社会问题`, and `JSON 出力` after reroll.
- Mobile fallback QA:
  - Used project Playwright for 390px because the in-app Browser viewport override did not apply reliably to the active tab.
  - `clientWidth: 390`, `scrollWidth: 390`, horizontal overflow: `false`.
  - console warnings/errors: `0`.

Remaining risk:

- This was a sampled path, not a full 139-case visual audit.
- The nine earlier re-optimized local images were not individually compared against their previous visual quality.
- The next 14 retry-queue images still depend on Wikimedia availability and should remain slow-batch work.

Rollback scope:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.*`
- `content/graduation_image_manifest.json`
- `content/graduation_image_retry_queue.json`
- `public/images/graduation/cases/case-044-nabeshima-shoto-park-toilet.jpg`
- `public/images/graduation/cases/case-045-teshima-art-museum.jpg`
- `scripts/optimize-graduation-case-images.mjs`
- graduation QA/status docs

Next recommended step: continue graduation quality mode with either `CASE-046` / `CASE-047` slow image retry or a focused review of whether the 30 draft site types should become public.

## 2026-07-06 - Simulation 56: Graduation Existing Interaction Polish

Status: production interaction polish passed after deploy.

Persona: Japanese architecture student who already understands the theme but still feels the UI has too many quiet controls.

Goal: verify that the current graduation interface is easier to operate without adding new feature complexity.

Path simulated:

1. `/ja/graduation/issues?tag=地域食`
2. `/ja/graduation/random`
3. `/ja/graduation/sites/SITE-001`
4. mobile 390px on `/ja/graduation/random`

User-view findings:

1. Archive cards now expose visible action labels instead of relying on the card title alone.
2. Direction generation reads as a structured bundle: issue, recommended site type, related case, next actions, and export buttons.
3. The `関連事例` metric is no longer a bare number; it reads as `3件`.
4. Filter and nav controls have larger hit areas and visible keyboard focus.
5. The list workflow strip remains useful but no longer dominates the archive page.
6. Footer and top-nav text links meet the same practical target-size rule as the main graduation controls.
7. Mobile direction generation has no horizontal overflow and all visible controls remain tappable.

Validation:

- Screenshot evidence and audit JSON:
  - `/tmp/archistory-polish-audit-2026-07-06`
  - `/tmp/archistory-polish-after-2026-07-06/final4`
  - `/tmp/archistory-polish-production-2026-07-06`
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run graduation:audit` with `Problems: 0`.
- Passed: `npm run build`.
- Static route generation: `4165/4165`.
- Final local Playwright QA:
  - sampled console warnings/errors: `0`
  - sampled horizontal overflow: `0`
  - sampled visible interactive targets below 36px by 36px: `0`
- Production deploy:
  - Vercel deployment id: `dpl_F11H6vR77UnbNbGxKh6wKe3zsrLq`
  - deployment URL: `https://architect-history-next-lkqpjfwta-yrqx-95s-projects.vercel.app`
  - production alias: `https://archistory.app`
- Production Playwright QA:
  - sampled console warnings/errors: `0`
  - sampled horizontal overflow: `0`
  - sampled visible interactive targets below 36px by 36px: `0`
  - `/ja/graduation/random` shows `方向生成` and `3件`.
  - `/ja/graduation/issues?tag=地域食` shows issue actions.
  - `/ja/graduation/sites/SITE-001` shows candidate examples.

Remaining risk:

- This is not a formal WCAG audit.
- Full-page screenshots can show lazy-loaded below-fold case images as blank before scroll-triggering, even though public case image metadata passes the content audit.
- The protected `vercel.app` deployment URL may require Vercel SSO; public QA should use `https://archistory.app`.

Rollback scope:

- `src/app/globals.css`
- `src/app/[lang]/layout.tsx`
- `src/components/LanguageSwitcher.tsx`
- `src/components/GraduationInspirationApp.tsx`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: stop adding speculative UI and watch one real student try the flow on `https://archistory.app`.

## 2026-07-06 - Simulation 55: Existing Graduation Flow Validity Audit

Status: production validity audit passed after data consistency fix and deploy.

Persona: Japanese architecture student using the current graduation inspiration UI as it exists now.

Goal: verify that existing visible controls and data relationships are effective, without adding new UI.

Path simulated:

1. `/ja/graduation`
2. `/ja/graduation/issues?tag=地域食`
3. remove the active `地域食` filter
4. `/ja/graduation/sites`
5. `/ja/graduation/cases`
6. `/ja/graduation/random`
7. click the checklist action to `/ja/graduation/brief`
8. mobile 390px on `/ja/graduation/random`

User-view findings:

1. Homepage naming and workflow are internally consistent.
2. Filtered issue state is visible, removable, and returns to the full 100 issue archive.
3. Issue, site, and case cards expose clear action labels.
4. Site cards all show candidate examples, so the site archive is not just abstract typology text.
5. Case cards all render images and action labels.
6. The direction builder exposes a generated bundle, 4 next actions, and a path to the course brief.
7. Mobile 390px has no horizontal overflow.

Data findings:

- Public issue/site/case counts are `100 / 20 / 100`.
- Public cases have image URL, image source URL, license, and credit.
- Public cases using placeholder images: `0`.
- Public site candidate-location problems: `0`.
- Broken public case references: `0`.
- Broken public site references were found and fixed by remapping draft site IDs to the closest 20 published site types.
- Stale case relation notes were removed.

Validation:

- Screenshot evidence and audit JSON:
  - `/tmp/archistory-existing-audit-2026-07-06`
- Passed after fix: `npm run graduation:audit` with `Problems: 0`.
- Passed after fix: `npm run typecheck`.
- Passed after fix: `npm run lint`.
- Passed after fix: `npm run build`.
- Static route generation: `4165/4165`.
- Production deploy:
  - Vercel deployment id: `dpl_2GCmu5zTbCk2EuPpPjhBNe3af3X5`
  - deployment URL: `https://architect-history-next-g0ecqkqst-yrqx-95s-projects.vercel.app`
  - production alias: `https://archistory.app`
- Production Playwright QA:
  - `/ja/graduation`: `方向生成` naming is active; old `ランダム` links are absent.
  - `tag=地域食` shows `表示 7 · 公開済み`, active filters, and 7 `課題を開く` actions.
  - removing `地域食` returns to `/ja/graduation/issues` and `表示 100 · 公開済み`.
  - `/ja/graduation/sites` shows 20 site cards, 20 candidate examples, and 20 `候補地を見る` actions.
  - `/ja/graduation/cases` shows 100 case images.
  - `/ja/graduation/random` shows the generated bundle, current bundle summary, next-action panel, 4 action links, and export buttons.
  - `/ja/graduation/issues/ISSUE-041` shows 2 public site links and no draft `港湾岸` site text.
  - `/ja/graduation/sites/SITE-001` shows candidate source links.
  - `/ja/graduation/cases/CASE-027` shows image source and license text.
  - mobile 390px: no horizontal overflow.
  - console warnings/errors: `0`.

Remaining risk:

- This audit proves the sampled flow is working and internally consistent, but not full accessibility compliance.
- The source library still contains 30 draft site types; the public UI intentionally exposes 20.

Next recommended step: pause feature additions and use a real-user observation pass or accessibility audit for the next decision.

## 2026-07-06 - Simulation 54: Japanese Student Understands the Graduation Workflow

Status: production QA passed after deploy.

Persona: Japanese architecture student who has found the graduation inspiration section but does not yet understand what each page is for.

Goal: confirm the experience explains the sequence from choosing a social issue to generating a project direction.

Path simulated:

1. `/ja/graduation`
2. `/ja/graduation/issues?tag=地域食`
3. remove the active `地域食` condition
4. `/ja/graduation/random`
5. mobile 390px on `/ja/graduation/random`

User-view findings:

1. The homepage now frames the section as a workflow: issue, site, case, and direction generation.
2. The archive pages no longer leave filters hidden in the URL; the current conditions are visible as removable controls.
3. A user can remove a single filter without clearing the whole page or guessing which select menu caused it.
4. The old random page is now named `方向生成`, which better explains that it creates a thesis direction.
5. The generated direction is broken into issue, site, and case parts, each with its own link, so the user can decide the next click.
6. Mobile 390px has no horizontal overflow.
7. After the second pass, the `次の動き` area works as a task panel instead of a passive instruction list.
8. Issue, site, and case cards now expose action labels, making the click target clearer without adding heavy visual framing.

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Static route generation: `4165/4165`.
- Local Playwright QA:
  - `tag=地域食` shows active filters and `表示 7 · 公開済み`.
  - removing `地域食` returns to `/ja/graduation/issues` and `表示 100 · 公開済み`.
  - `方向生成` page shows generated bundle, issue action, site action, and case action.
  - mobile 390px: no horizontal overflow.
  - console warnings/errors: `0`.
- Screenshot evidence:
  - `/tmp/archistory-uiux-random.png`
  - `/tmp/archistory-uiux-random-mobile.png`
- Deployed to Vercel:
  - deployment id: `dpl_495b9Ko22xBAJLKBLZ5W5LSMjB1Q`
  - deployment URL: `https://architect-history-next-jb7ulnrtn-yrqx-95s-projects.vercel.app`
  - production alias: `https://archistory.app`
- Production Playwright QA:
  - `/ja/graduation`: button text and workflow step use `方向生成`; old `方向を生成` text is absent.
  - `tag=地域食` shows active filters and `表示 7 · 公開済み`.
  - removing `地域食` returns to `/ja/graduation/issues` and `表示 100 · 公開済み`.
  - `方向生成` page shows generated bundle, issue action, site action, and case action.
  - mobile 390px: no horizontal overflow.
  - console warnings/errors: `0`.
- Second deploy:
  - deployment id: `dpl_CFoUpCN6eukFuazPuAxqxvYGdsmY`
  - deployment URL: `https://architect-history-next-32q9j6lm3-yrqx-95s-projects.vercel.app`
  - production alias: `https://archistory.app`
- Second production Playwright QA:
  - `方向生成` page shows a `次の動き` panel with 4 action links.
  - checklist action navigates to `/ja/graduation/brief`.
  - issue archive exposes 100 `課題を開く` actions.
  - random page exposes `戦略を読む` and `候補地を見る`.
  - mobile 390px: no horizontal overflow.
  - console warnings/errors: `0`.

Remaining risk:

- The direction-generation page is clearer, but still text-heavy below the first screen.
- A future command-search or guided wizard could reduce cognitive load further if user testing still shows confusion.

Next recommended step: watch one real user move from the homepage to direction generation; if they still hesitate, add a compact guided wizard or command-search entry.

## 2026-07-05 - Simulation 53: Japanese Student Uses Filters as a Thesis Locator

Status: production QA passed after deploy.

Persona: Japanese architecture student who has 100 graduation themes available but needs a fast way to narrow the archive.

Goal: confirm the issue filters are no longer decorative and can locate a usable subset.

Path simulated:

1. `/ja/graduation/issues`
2. Click `文化・アート`
3. Expand `詳細フィルター`
4. Open legacy deep link `/ja/graduation/issues?tag=多文化`
5. Mobile 390px on `/ja/graduation/issues?category=culture-art`

User-view findings:

1. The visible main categories now explain the archive at a high level instead of showing a few arbitrary tags.
2. Main category counts are visible and add up to the full 100 issues.
3. Clicking `文化・アート` narrows the list to 18 issues and updates the URL to `category=culture-art`.
4. The detailed filter area now explains that tags, sites, and programs narrow the current scope.
5. Under `文化・アート`, detailed options are scoped to the 18 matching issues instead of showing the entire archive as a loose list.
6. The old `tag=多文化` link still works and shows 4 issues.
7. Mobile 390px has no horizontal overflow.

Validation:

- Category count proof: `8 + 22 + 7 + 15 + 18 + 12 + 11 + 7 = 100`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Static route generation: `4165/4165`.
- Local Playwright console warnings/errors during sampled QA: `0`.
- Deployed to Vercel:
  - deployment id: `dpl_2neDgcjurwc6KYdxQ6kSnebvdrvq`
  - deployment URL: `https://architect-history-next-7jda6kyxh-yrqx-95s-projects.vercel.app`
  - production alias: `https://archistory.app`
- Production Playwright QA:
  - `/ja/graduation/issues`: category counts sum to 100.
  - `文化・アート`: `表示 18 · 公開済み`.
  - `tag=多文化`: `表示 4 · 公開済み`.
  - console warnings/errors: `0`.
- Screenshot evidence:
  - `/tmp/archistory-graduation-category-filter.png`
  - `/tmp/archistory-graduation-category-filter-mobile.png`

Remaining risk:

- Category assignment is rule-based and may need tuning as new issue wording is added.
- Detailed filter visual polish should be revisited in the broader UI/UX unification pass.

Next recommended step: continue with the planned global UI/UX pass.

## 2026-07-05 - Simulation 52: Japanese Student Checks the 100/100 Graduation Library

Status: production QA passed after deploy.

Persona: Japanese architecture student looking for a graduation project theme.

Goal: confirm the graduation submenu now feels like a real inspiration archive, not a tiny demo.

Path simulated:

1. `/ja/graduation/issues`
2. `/ja/graduation/cases`
3. `/ja/graduation/issues/ISSUE-092`
4. `/ja/graduation/issues/ISSUE-100`
5. `/ja/graduation/cases/CASE-139`
6. `/ja/graduation/cases/CASE-121`
7. mobile 390px on `/ja/graduation/issues/ISSUE-100`
8. clicked `/ja/graduation/cases/CASE-117` from `/ja/graduation/issues/ISSUE-100`

User-view findings:

1. The issue archive now exposes 100 issue links.
2. The case archive now exposes 100 case links and 100 images.
3. Late-numbered issues such as `ISSUE-092` and `ISSUE-100` render as Japanese pages without checked Chinese residue.
4. Late-numbered cases such as `CASE-121` and `CASE-139` render with one image each and source-backed metadata.
5. `ISSUE-100` shows 8 related case links on desktop and mobile.
6. Link interaction from `ISSUE-100` to `CASE-117` reached `Oslo Opera House`.
7. No horizontal overflow found in sampled desktop or 390px mobile QA.
8. Console warnings/errors during sampled QA: `0`.
9. Production alias `https://archistory.app` now serves this 100/100 pass.

Validation:

- Content script:
  - published issues: `100`
  - published cases: `100`
  - public placeholder images: `0`
  - broken direct issue-to-case references: `0`
  - checked Japanese residue hits across public issue/case/site fields: `0`
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Static route generation: `4165/4165`.
- Deployed to Vercel:
  - deployment id: `dpl_7AXyfNxHnyxo7RLsdJ876sSyZ7Vc`
  - deployment URL: `https://architect-history-next-c6kqqvds3-yrqx-95s-projects.vercel.app`
  - production alias: `https://archistory.app`
- Production Browser QA repeated the sampled local path:
  - issue archive: 100 links
  - case archive: 100 links and 100 images
  - `ISSUE-092` and `ISSUE-100`: no overflow, no checked Chinese residue
  - `CASE-121` and `CASE-139`: one image each, no overflow, no checked Chinese residue
  - mobile 390px `ISSUE-100`: no horizontal overflow
  - clicked `CASE-117` from `ISSUE-100` and reached `Oslo Opera House`
  - console warnings/errors: `0`

Remaining risk:

- English fields still need cleanup later.
- Some new cases use Wikimedia redirect/file pages because the Commons API rate-limited exact metadata fetching.
- Related cases are public and clickable, but hand-ranking per issue can still improve the archive feel.

Next recommended step: hand-rank related cases per issue and polish exact Wikimedia license metadata for records that currently say `See image source`.

## 2026-07-05 - Simulation 08: Japanese Reader Checks Archive Metadata

Status: completed.

Persona: Japanese-reading architecture student browsing Archistory as an archive.

Goal: open the Japanese site, scan common archive entry points, and confirm that country/location metadata no longer suddenly appears in Chinese.

Planned path:

1. Open `/ja`.
2. Open `/ja/browse`.
3. Open `/ja/browse/architects`.
4. Open `/ja/architect/le-corbusier`.
5. Check era and style relation pages: `/ja/browse/era/modern`, `/ja/browse/style/modernism`.
6. Open `/ja/graduation` and confirm it does not show Chinese-first graduation content inside the Japanese shell.

User-view findings:

1. The common Japanese archive routes no longer expose the checked Chinese country labels that previously appeared in metadata.
2. The home page now shows Japanese country labels such as `スイス`, `アメリカ`, `ドイツ`, `フランス`, `イギリス`, and `デンマーク`.
3. Era/style relation cards now use the same localized display path as other building metadata instead of raw data values.
4. `/ja/graduation` redirects to `/zh/graduation/`, which is preferable until the graduation subsystem has a proper Japanese content set.

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Local curl scan: no checked Chinese residue terms on `/ja`, `/ja/browse`, `/ja/browse/architects`, `/ja/architect/le-corbusier`, `/ja/browse/era/modern`, `/ja/browse/style/modernism`, and `/ja/graduation`.
- Local browser QA on `/ja`: meaningful content present, no console errors, no checked Chinese residue terms.
- Production curl scan on `https://archistory.app`: same checked route set passed.

Remaining risk:

- Deep long-form article bodies may still contain Chinese fallback text if the Japanese content fields are missing.
- This simulation focused on high-visibility metadata and common entry pages, not a full 4000-route crawl.

Rollback scope:

- `src/lib/fallback-content.ts`
- `src/app/[lang]/browse/era/[slug]/page.tsx`
- `src/app/[lang]/browse/style/[slug]/page.tsx`

Next recommended step:

Before the global UI/UX pass, generate a full Japanese route residue report so the design pass does not polish pages that still have content-language debt.

## 2026-07-05 - Simulation 09: Japanese Reader Deep Metadata Pass

Status: completed.

Persona: Japanese-reading architecture student moving beyond the homepage into architect and building detail pages.

Goal: confirm that common detail pages no longer mix Japanese chrome with Chinese-only metadata or concept cards.

Planned path:

1. Scan all static `/ja` routes from the local production build.
2. Open high-risk pages found by the scanner:
   - `/ja/architect/aravena`
   - `/ja/architect/koolhaas`
   - `/ja/browse/architects`
   - `/ja/browse/country`
   - `/ja/building/nakagin-capsule-tower`
   - `/ja/building/pazzi-chapel`
   - `/ja/timeline`
3. Judge whether the remaining hits are true mixed-language leaks or Japanese-valid kanji.

User-view findings:

1. Architect core idea cards were the main true leak: many Japanese architect pages displayed Chinese-only thought bullets. These are now hidden unless a usable Japanese or English value exists.
2. Country/nationality grouping now uses localized labels instead of leaking raw values such as `荷兰` or `比利时`.
3. Known education labels and `巴西利亚` city metadata no longer appear as Chinese on Japanese pages.
4. Building fields that were Chinese-only, such as selected Pazzi Chapel and Nakagin Capsule Tower analysis strings, are now blocked from Japanese display.
5. Final scanner hits are low-confidence terms that are valid Japanese in context: `英国`, `再利用`, and `与` inside phrases like `影響を与えた`.

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Local production scan: 1331 Japanese static routes, 0 fetch failures.
- Report: `docs/reports/ja-language-residue-scan-2026-07-05.md`.
- Production deployed: `dpl_37CcEKJ8g8P6929hzr1iGm61Mvaz`, aliased to `https://archistory.app`.
- Production curl spot checks passed for high-risk Japanese routes.
- Browser QA passed on `/ja/browse/country` and `/ja/building/nakagin-capsule-tower` with 0 console errors/warnings during page checks.
- Browser click recheck timed out in the browser tool after page-level validation; no site error was observed before the tool timeout.

Remaining risk:

- Because Japanese and Chinese share many kanji, automated scanning cannot perfectly separate real leaks from valid Japanese prose.
- Future imports still need a regression scan before deployment.

Rollback scope:

- `src/app/[lang]/architect/[slug]/page.tsx`
- `src/app/[lang]/browse/architects/page.tsx`
- `src/app/[lang]/browse/country/page.tsx`
- `src/app/[lang]/building/[slug]/page.tsx`
- `src/app/[lang]/timeline/page.tsx`
- `src/lib/display.ts`
- `src/lib/fallback-content.ts`
- `src/lib/locale.ts`
- `docs/reports/ja-language-residue-scan-2026-07-05.md`

Next recommended step:

Deploy and browser-check the fixed pages, then start the global UI unification pass from the homepage interaction model.

## 2026-07-02 - Simulation 01: First-Time Architecture Student

Status: completed.

Persona: first-time architecture student or casual architecture viewer.

Goal: land on the Chinese site, understand what Archistory is within a few seconds, find an archive item, and open one building or architect detail page.

Planned path:

1. Open `/zh`.
2. Identify the main purpose and the obvious next action.
3. Open the archive/browse surface.
4. Find or select a recognizable item such as Villa Savoye or Le Corbusier.
5. Open the detail page and judge whether the page feels like an archive exhibit rather than a lesson plan.

Evidence to capture:

- Home entry.
- Archive/browse view.
- Detail page.
- One mobile viewport pass if the desktop pass is healthy.

Actual path:

1. Opened `/zh`.
2. Checked first-screen purpose, top navigation, primary archive links, and image hierarchy.
3. Opened `/zh/browse`.
4. Opened `/zh/building/villa-savoye`.
5. Repeated the same surfaces on a 390px mobile viewport.

User-view findings:

1. Home is now image-led enough to understand that the site is an architecture archive, and the primary visual hierarchy is stronger than the previous text-heavy direction.
2. The main entry labels were still confusing before the fix: `资料馆` and `档案` looked like two similar destinations, and `资料馆` pointed to the old `/learn` route.
3. The building detail page felt closer to an archive exhibit because the image leads, but the phrase `学习桥 / 从这座建筑学习` still made the page feel like a course module.
4. `/zh/browse` is usable as an index, but a user looking for a specific famous building may need search or the building index rather than the general archive index.
5. Mobile first screens were readable. The home viewport showed a tiny horizontal overflow signal around the hero container, but it did not break the visible layout in this run.

Implemented after simulation:

- Routed the desktop `资料馆` navigation entry to `/browse`.
- Renamed the desktop browse dropdown label from `档案` to `索引` to reduce duplicate meaning.
- Routed the home `进入资料馆` card to `/browse/buildings` so the user lands on actual works first.
- Updated mobile primary navigation to `资料馆`, `建筑`, `时间`, `搜索`; removed the old `/learn` primary entry.
- Changed building detail copy from `学习桥 / 从这座建筑学习` to `阅读线索 / 继续阅读这座建筑`.
- Changed `Code` and `Glossary` back links from old `Learn` wording to archive wording.
- Updated the e2e expectation to the new building-detail heading.

Evidence:

- `/tmp/archistory-user-sim-01-home.png`
- `/tmp/archistory-user-sim-01-browse-stable.png`
- `/tmp/archistory-user-sim-01-villa-savoye-stable.png`
- `/tmp/archistory-user-sim-01-mobile-home.png`
- `/tmp/archistory-user-sim-01-mobile-browse.png`
- `/tmp/archistory-user-sim-01-mobile-villa-savoye.png`
- `/tmp/archistory-user-sim-01-home-after-entry-fix.png`
- `/tmp/archistory-user-sim-01-villa-after-reading-cues.png`

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed with dev server: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/e2e/core-routes.spec.ts`.
- Browser console: no relevant warnings or errors during the simulated path.

Rollback scope:

- `src/lib/i18n.ts`
- `src/app/[lang]/layout.tsx`
- `src/components/MobileNav.tsx`
- `src/app/[lang]/page.tsx`
- `src/app/[lang]/building/[slug]/page.tsx`
- `src/app/[lang]/glossary/page.tsx`
- `src/app/[lang]/code/page.tsx`
- `tests/e2e/core-routes.spec.ts`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: run Simulation 02 as a visitor who starts from mobile search and tries to find `勒·柯布西耶`, then fix any search/detail friction before doing more visual polish.

## 2026-07-02 - Simulation 02: Mobile Search To Architect Detail

Status: completed.

Persona: mobile visitor who knows the architect name and wants to find works quickly.

Goal: search for `勒·柯布西耶`, open the architect page, and identify where to continue to works.

Actual path:

1. Opened `/zh/search?q=勒·柯布西耶` at 390px width.
2. Checked whether the architect result appears before building results.
3. Opened `/zh/architect/le-corbusier`.
4. Checked whether the page starts with identity, portrait, summary, and visible work links.

User-view findings:

1. Search works well for this intent: the first result is the architect, followed by four building results.
2. The search page is compact on mobile and does not overflow.
3. The architect detail page is understandable from the first screen: name, English name, portrait, and summary are clear.
4. Works are discoverable after the relationship and idea sections, but users who arrive specifically looking for works may need a faster jump in a later pass.
5. The architect page showed small measured horizontal overflow in the DOM around the hero and idea sections, but the visible screenshot did not show a broken layout.

Implemented after simulation:

- Added `priority` support to `ArchitectPortraitFigure`.
- Marked the above-the-fold architect portrait as priority on both mobile and desktop placements.

Evidence:

- `/tmp/archistory-user-sim-02-mobile-search-le-corbusier.png`
- `/tmp/archistory-user-sim-02-mobile-le-corbusier.png`
- `/tmp/archistory-architect-priority-check.png`

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed with dev server: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3101 npx playwright test tests/e2e/core-routes.spec.ts`.
- Browser console: no relevant warnings or errors during search, architect detail, or architect priority check.

Rollback scope:

- `src/components/ArchitectPortraitFigure.tsx`
- `src/app/[lang]/architect/[slug]/page.tsx`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: make the architect detail mobile flow more direct by adding or surfacing a small first-screen jump to `代表作`, but only after comparing against real archive/profile references.

## 2026-07-03 - Simulation 03: Graduation Inspiration Submenu

Status: completed.

Persona: architecture student who enters Archistory and wants a graduation design topic direction without reading a long instruction document.

Goal: find the new graduation design inspiration submenu, open the issue library, inspect one issue, and try the random inspiration flow.

Actual path:

1. Opened `/zh/graduation` on desktop.
2. Clicked `去灵感库` and confirmed `/zh/graduation/issues` lists seed issues.
3. Opened `/zh/graduation/issues/ISSUE-001`.
4. Opened `/zh/graduation/random` and clicked `再来一次`.
5. Switched to 390px mobile viewport, opened the mobile menu, and checked the submenu entry.

User-view findings:

1. The new submenu is discoverable from desktop navigation as `毕设灵感`.
2. The mobile drawer places it under `资料工具`, which matches the current archive-tool grouping.
3. The first screen starts with one clear action and one random action, not a long text wall.
4. The issue detail page exposes title, summary, recommended building types, sources, and related site types without requiring login or AI.
5. The random flow changes/keeps a valid data bundle after clicking `再来一次`, and the export action remains visible.

Evidence:

- `/tmp/archistory-graduation-home-browser.png`
- `/tmp/archistory-graduation-issue-browser.png`
- `/tmp/archistory-graduation-random-browser.png`
- `/tmp/archistory-graduation-mobile-menu-browser.png`

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed with build-backed Playwright server: `PLAYWRIGHT_PORT=3104 npx playwright test tests/e2e/core-routes.spec.ts`.
- Result: 9 tests passed.
- Browser console: no relevant warnings or errors on home, issue detail, random, or mobile menu checks.

Rollback scope:

- `src/content/graduation/`
- `public/images/graduation/`
- `src/lib/graduation.ts`
- `src/components/GraduationInspirationApp.tsx`
- `src/app/[lang]/graduation/`
- `src/lib/i18n.ts`
- `src/app/[lang]/layout.tsx`
- `src/components/MobileNav.tsx`
- `tests/e2e/core-routes.spec.ts`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: do a source-quality pass for the graduation content, replacing placeholder or broad source URLs with official project pages and stronger case references before expanding the dataset.

## 2026-07-03 - Simulation 04: Graduation Case Images And Sources

Status: completed.

Persona: architecture student browsing the case library who needs visual cues, not only text cards.

Goal: open the graduation case library, confirm real case images appear where reliable sources exist, then inspect a case detail page for image/source attribution.

Actual path:

1. Opened `/zh/graduation/cases` on desktop width.
2. Confirmed mixed state: unresolved cases still use the neutral placeholder; source-checked cases show real project images.
3. Opened `/zh/graduation/cases/CASE-002`.
4. Opened `/zh/graduation/cases/CASE-016`.
5. Checked browser console and image natural sizes.

User-view findings:

1. The case library now has real visual hierarchy for source-checked cases instead of a fully placeholder-heavy wall.
2. Placeholder images remain only where a reliable image has not yet been accepted.
3. Case detail pages show image source and license text in the basic information block.
4. Local cached images avoid runtime Wikimedia rate-limit fallbacks.

Evidence:

- `/tmp/archistory-graduation-cases-real-images-desktop.png`
- `/tmp/archistory-graduation-case-002-real-image.png`
- `/tmp/archistory-graduation-case-016-real-image.png`

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with running production server: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3107 npx playwright test tests/e2e/core-routes.spec.ts`.
- Result: 9 tests passed.
- Browser console: no relevant warnings or errors on the case list or checked detail pages.

Rollback scope:

- `src/content/graduation/cases.json`
- `public/images/graduation/cases/`
- `src/lib/graduation.ts`
- `src/components/GraduationInspirationApp.tsx`
- `next.config.ts`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: continue the image/source pass for the remaining published cases, prioritizing Share Kanazawa, Fuji Kindergarten, Onagawa Station, and Naoshima Honmura Lounge because they appear early or are strong reference projects.

## 2026-07-03 - Simulation 05: Graduation Source-Checked Case Detail

Status: completed.

Persona: architecture student browsing for graduation design references who wants quick visual orientation, but also needs reliable sources for later research.

Goal: open a source-checked case, confirm the image is useful and attributed, then check that unresolved projects still avoid misleading imagery.

Actual path:

1. Opened `/zh/graduation/cases/CASE-012`.
2. Confirmed the local danchi image loads and the detail page shows image source, license, credit, and representative-image note.
3. Opened `/zh/graduation/cases`, then clicked the visible `Michi-no-Eki Community Hub` card to reach `/zh/graduation/cases/CASE-020`.
4. Confirmed the local Michi-no-Eki image loads and source/credit/license are readable.
5. Opened `/zh/graduation/cases/CASE-001` and confirmed it intentionally remains on the neutral placeholder while showing corrected year, architect, and source.
6. Switched to 390px mobile viewport and checked `CASE-020` for overflow, image loading, and source readability.

User-view findings:

1. Source-checked cases are now easier to scan because real images appear before the basic information block.
2. Representative images are labelled in detail pages, which reduces the chance that a student mistakes typology imagery for official project photos.
3. Placeholder-first cases still look deliberate rather than broken.
4. The mobile case detail screen keeps a clear hierarchy: title, concept, image, basic information, source metadata.
5. The case list can still feel dense, but the added images make the browsing task less text-heavy.

Evidence:

- `/tmp/archistory-graduation-case-012-source-image.png`
- `/tmp/archistory-graduation-case-020-source-image-desktop.png`
- `/tmp/archistory-graduation-case-020-source-image-mobile.png`
- `/tmp/archistory-graduation-case-001-placeholder.png`

Validation:

- Data consistency check: 20 cases total, 10 local real images, 10 placeholders, all local image metadata present.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with running production server: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3108 npx playwright test tests/e2e/core-routes.spec.ts`.
- Result: 9 tests passed.
- Browser console: no relevant warnings or errors on checked desktop and mobile case pages.

Rollback scope:

- `src/content/graduation/cases.json`
- `public/images/graduation/cases/`
- `src/lib/graduation.ts`
- `src/components/GraduationInspirationApp.tsx`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: run a relationship-quality pass over the graduation data, checking whether each issue actually points to helpful site types and cases before adding more entries.

## 2026-07-03 - Simulation 06: Graduation Relationship Quality

Status: completed.

Persona: architecture student who already has a rough theme and wants to inspect whether the site gives useful next objects to study, not random cards.

Goal: open several previously weak issue detail pages and check whether the recommended site types and related cases now support a coherent thesis direction.

Actual path:

1. Opened `/zh/graduation/issues/ISSUE-001`.
2. Checked that elderly isolation now links to danchi edge space, old danchi ground floor, Share Kanazawa, Kaze no Machi Miyabira, and Toyama Day Care Center.
3. Opened `/zh/graduation/issues/ISSUE-011`.
4. Checked that night safety now links to station-adjacent gaps, shopping street vacancies, Onagawa Station, and Kokubunji Cocobunji Plaza.
5. Opened `/zh/graduation/issues/ISSUE-015`.
6. Checked that regional food/community kitchen now links to shopping street vacancies, empty houses, Share Kanazawa, Michi-no-Eki, and Kamikatsu.

User-view findings:

1. The pages feel more like a directed archive: topic, site, and case now share a visible logic.
2. The elderly-isolation path no longer drifts into generic community/office references.
3. The night-safety path now gives station and public-node precedents instead of a broad roadside-station precedent.
4. The food/community-kitchen path is still not perfect, but it is now usable because the cases point to co-eating, local sales, environmental education, and community operation.
5. The next missing layer is an explicit one-sentence relation note under each related case.

Evidence:

- `/tmp/archistory-graduation-relation-issue-001.png`
- `/tmp/archistory-graduation-relation-issue-011.png`
- `/tmp/archistory-graduation-relation-issue-015.png`

Validation:

- Relationship audit: 20 issues, 10 site types, 20 cases; 0 weak issues; 0 missing references; 0 missing local image paths.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with running production server: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3109 npx playwright test tests/e2e/core-routes.spec.ts`.
- Result: 9 tests passed.
- Browser console: no relevant warnings or errors on the checked issue pages.

Rollback scope:

- `src/content/graduation/issues.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/cases.json`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: add relation notes for issue-case connections, so each case card can answer `为什么这个案例跟这个课题有关`.

## 2026-07-03 - Simulation 07: Issue-Case Relation Notes

Status: completed.

Persona: architecture student comparing thesis precedents who does not want to infer every connection from tags alone.

Goal: open an issue detail page and a random inspiration result, then check whether related case cards explain why they are worth studying.

Actual path:

1. Opened `/zh/graduation/issues/ISSUE-001`.
2. Scrolled to `关联案例`.
3. Confirmed each related case card now has a short relation note before the case concept.
4. Opened `/zh/graduation/random`.
5. Confirmed generated case cards also show relation notes for the selected issue.
6. Switched to 390px mobile viewport and checked the `ISSUE-001` related-case section.

User-view findings:

1. Related cases now answer the missing question: `为什么这个案例跟这个课题有关`.
2. The notes are short enough to add orientation without turning the card into a paragraph wall.
3. The general case library remains clean; notes only appear when the user is inside an issue or a random issue bundle.
4. Mobile cards still stack cleanly with no horizontal overflow.

Evidence:

- `/tmp/archistory-graduation-relation-notes-issue-001.png`
- `/tmp/archistory-graduation-relation-notes-random.png`
- `/tmp/archistory-graduation-relation-notes-issue-001-cases.png`
- `/tmp/archistory-graduation-relation-notes-issue-001-mobile.png`

Validation:

- Relation-note audit: 20 issues, 20 note maps, 0 missing notes, 0 extra notes.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with running production server: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3110 npx playwright test tests/e2e/core-routes.spec.ts`.
- Result: 9 tests passed.
- Browser console: no relevant warnings or errors on issue detail or random page checks.

Rollback scope:

- `src/content/graduation/issues.json`
- `src/lib/graduation.ts`
- `src/components/GraduationInspirationApp.tsx`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: make exported inspiration bundles include relation notes in a compact `cases_with_notes` section, so exported data is readable outside the website.

## 2026-07-03 - Simulation 08: Exported Bundles With Relation Notes

Status: completed.

Persona: architecture student who found a useful thesis direction and wants to save it locally for later editing in another tool.

Goal: export an issue bundle and a random inspiration bundle, then check whether the downloaded JSON still explains why each case is relevant.

Actual path:

1. Opened `/zh/graduation/issues/ISSUE-001`.
2. Clicked `导出当前方向 JSON`.
3. Read the downloaded `ISSUE-001-inspiration-bundle.json`.
4. Opened `/zh/graduation/random`.
5. Clicked `导出当前方向 JSON`.
6. Read the downloaded random issue bundle.

User-view findings:

1. Exported files now contain `cases_with_notes`, so the bundle remains understandable outside the site.
2. The original `cases` array is still present, so older code or future scripts can keep using it.
3. The export includes `exported_at`, which makes saved bundles easier to compare later.

Evidence:

- `/tmp/archistory-graduation-export-issue-001.png`
- `/tmp/archistory-graduation-export-random.png`
- `/tmp/ISSUE-001-inspiration-bundle.json`
- `/tmp/ISSUE-010-random-bundle.json`

Validation:

- Export-shape audit: all 20 issues can produce non-empty `cases_with_notes` rows.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with running production server: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3111 npx playwright test tests/e2e/core-routes.spec.ts`.
- Result: 9 tests passed.
- Download QA: issue detail and random page downloads both included `cases_with_notes`, matching `cases.length`, with non-empty first relation notes.

Rollback scope:

- `src/components/GraduationInspirationApp.tsx`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: add CSV export for the current inspiration bundle, so topic/site/case combinations can be opened directly in spreadsheet-style tools.

## 2026-07-03 - Simulation 09: CSV Bundle Export

Status: completed.

Persona: architecture student who wants to move a selected thesis direction into Excel, Notion, or another table tool.

Goal: export a current inspiration bundle as CSV and confirm it remains readable without knowing JSON.

Actual path:

1. Opened `/zh/graduation/issues/ISSUE-001`.
2. Clicked `导出当前方向 CSV`.
3. Read the downloaded `ISSUE-001-inspiration-bundle.csv`.
4. Opened `/zh/graduation/random`.
5. Clicked `导出当前方向 CSV`.
6. Read the downloaded random CSV bundle.
7. Checked `/zh/graduation/issues/ISSUE-001` at 390px mobile width.

User-view findings:

1. CSV gives one case per row, which fits spreadsheet review better than nested JSON.
2. Each row repeats the issue, building types, site ids/names, case, relation note, and source URL.
3. Chinese text is preserved for spreadsheet use through UTF-8 BOM.
4. On mobile, JSON and CSV export buttons wrap cleanly and do not overflow.

Evidence:

- `/tmp/archistory-graduation-export-csv-issue-001.png`
- `/tmp/archistory-graduation-export-csv-random.png`
- `/tmp/archistory-graduation-export-csv-mobile.png`
- `/tmp/ISSUE-001-inspiration-bundle.csv`
- `/tmp/ISSUE-004-random-bundle.csv`

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npm run build`.
- Passed with running production server: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3112 npx playwright test tests/e2e/core-routes.spec.ts`.
- Result: 9 tests passed.
- Download QA: issue detail and random page CSV downloads had expected headers, non-empty `relation_note`, and UTF-8 BOM.
- Browser mobile QA: no horizontal overflow and no relevant console warnings or errors.

Rollback scope:

- `src/components/GraduationInspirationApp.tsx`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: add a tiny export hint near the buttons explaining JSON vs CSV, while keeping the page free of tutorial-style text.

## 2026-07-04 - Simulation 10: Full 100/50/100 Student Flow QA

Status: completed.

Persona: a student who has no graduation thesis topic and wants to find one usable direction from the Graduation Inspiration Library.

Goal: run the full flow after reaching 100 issues / 50 site types / 100 cases: home -> issue list -> search -> issue detail -> site detail -> case detail -> random inspiration -> export -> mobile issue list.

Actual path:

1. Opened `/zh/graduation`.
2. Entered `/zh/graduation/issues` from the home CTA.
3. Searched `老龄化`.
4. Opened `ISSUE-001`.
5. Opened related site `SITE-001`.
6. Returned to `ISSUE-001` and opened related case `CASE-001`.
7. Opened `/zh/graduation/random`.
8. Clicked `再来一次`.
9. Exported current random bundle as JSON.
10. Checked `/zh/graduation/issues` at 390px mobile width.

User-view findings:

1. The core flow works end to end: a blank-slate student can start from the home page, filter an issue, open related site/case details, use random inspiration, and export a result.
2. Fixed during this pass: random inspiration previously produced a React hydration mismatch because its initial seed used client/server-changing time. The initial seed is now stable, and `再来一次` still changes the result on the client.
3. The issue list is functional but dense. The tag and building-type selects now contain many options; later polish should reduce decision load or replace long selects with grouped/high-value filters.
4. Case pages with placeholder images still feel less convincing. This is expected under the current image-source policy, but it lowers trust and visual motivation.
5. Mobile issue list has no obvious horizontal overflow.

Evidence:

- `/tmp/archistory-graduation-audit-20260704/01-home.png`
- `/tmp/archistory-graduation-audit-20260704/02-issues-list.png`
- `/tmp/archistory-graduation-audit-20260704/03-issues-filtered.png`
- `/tmp/archistory-graduation-audit-20260704/04-issue-detail.png`
- `/tmp/archistory-graduation-audit-20260704/05-site-detail.png`
- `/tmp/archistory-graduation-audit-20260704/06-case-detail.png`
- `/tmp/archistory-graduation-audit-20260704/07-random.png`
- `/tmp/archistory-graduation-audit-20260704/08-mobile-issues.png`
- `/tmp/archistory-graduation-audit-20260704/notes.md`

Validation:

- In-app Browser was attempted first, but timed out/reset during site-detail navigation. Fallback used: regular Playwright against localhost.
- Clean Playwright user-simulation run: 0 console errors/warnings after fixing random seed.
- Random `再来一次` changed the result title.
- JSON export download triggered successfully.
- Mobile scroll-width check: body 390px, viewport 390px.
- Full keyboard-only and screen-reader testing was not completed in this pass.

Rollback scope:

- `src/components/GraduationInspirationApp.tsx`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: stop raw content expansion and reduce user decision load on the issue list filters, especially the long tag/building-type selects.

## 2026-07-04 - Simulation 11: Simplified Issue Filters QA

Status: completed.

Persona: a student opening the issue library from a blank state and trying to narrow choices without reading every filter option.

Goal: reduce the first-screen decision load on `/zh/graduation/issues` while keeping the full filter power available.

Actual path:

1. Opened `/zh/graduation/issues` on desktop.
2. Confirmed the first screen shows search, export, quick topic filters, and a collapsed `更多筛选` control.
3. Clicked the `老龄化` quick filter.
4. Confirmed the URL updates to `?tag=老龄化` and the visible result count changes.
5. Opened `更多筛选`.
6. Confirmed the original tag, site type, and building type dropdowns remain available.
7. Checked the same page at 390px mobile width.
8. Updated the core route E2E to follow the new user path: open `更多筛选` before using advanced dropdowns.

User-view findings:

1. The list page is calmer: users now see a small set of high-value topic buttons before the long dropdowns.
2. The advanced filters are still present, so the change does not remove functionality.
3. Mobile layout stacks cleanly with no horizontal overflow in the tested viewport.
4. The quick-filter labels are currently Chinese because the seed data keywords are Chinese; this is acceptable for the current V1 content but should be revisited before full multilingual polish.

Evidence:

- `/tmp/archistory-graduation-filter-qa-20260704/01-issues-filter-simplified.png`
- `/tmp/archistory-graduation-filter-qa-20260704/02-quick-tag-active.png`
- `/tmp/archistory-graduation-filter-qa-20260704/03-more-filters-open.png`
- `/tmp/archistory-graduation-filter-qa-20260704/04-mobile-filter-simplified.png`

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run graduation:audit`.
- Passed: `npm run test:unit`.
- Passed after test-path update: `npx playwright test tests/e2e/core-routes.spec.ts`.
- Clean Playwright rendered check: 0 console errors/warnings.
- Quick tag interaction updated URL and result count.
- `更多筛选` revealed 3 advanced selects on the issue list.
- Mobile scroll-width check: body 390px, viewport 390px.

Rollback scope:

- `src/components/GraduationInspirationApp.tsx`
- `tests/e2e/core-routes.spec.ts`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: keep improving trust rather than adding more features; review safe cover images for the highest-value published cases first.

## 2026-07-04 - Simulation 12: High-Value Case Image Trust Pass

Status: completed.

Persona: a student opening a related case from an issue detail page and deciding whether the example feels trustworthy enough to study further.

Goal: improve visual/source trust for published cases without using unsafe or unclear image sources.

Actual path:

1. Ranked published cases by placeholder status and issue-reference count.
2. Reviewed the five published placeholder cases: `CASE-001`, `CASE-003`, `CASE-004`, `CASE-006`, and `CASE-008`.
3. Confirmed a safe exact Wikimedia Commons exterior image for `CASE-008` Onagawa Station and Yupo'po.
4. Kept placeholders for `CASE-001`, `CASE-003`, `CASE-004`, and `CASE-006` because no exact reusable cover image was confirmed.
5. Added short image-review notes to those retained placeholders so the same source check is not repeated blindly later.
6. Rebuilt graduation data from CSV to JSON/public exports.
7. Opened `/zh/graduation/cases/CASE-008` and verified the case image, source link, credit, and mobile layout.

User-view findings:

1. `CASE-008` now has a real exterior image instead of the generic placeholder.
2. The image source is visible as `图片来源 · CC BY-SA 4.0`, with credit to Mister0124 / Wikimedia Commons.
3. The case image now has an accessible alt value matching the case name.
4. The other four high-priority published placeholders are intentionally retained rather than filled with unsafe web images.

Evidence:

- `/tmp/archistory-graduation-case-image-qa-20260704/case-008-onagawa-image-alt-fixed.png`
- `/tmp/archistory-graduation-case-image-qa-20260704/case-008-onagawa-mobile.png`
- `/tmp/archistory-graduation-case-image-qa-20260704/notes-alt-fixed.json`

Validation:

- Passed: `npm run graduation:data`.
- Passed: `npm run graduation:audit`.
- Rendered QA against `http://localhost:3132/zh/graduation/cases/CASE-008`:
  - page status 200.
  - image loaded with natural size 828x552.
  - alt text: `Onagawa Station and Yupo'po`.
  - source link points to Wikimedia Commons.
  - 0 console errors/warnings after setting the detail image to eager loading.
  - mobile scroll-width check: body 390px, viewport 390px.
- Content status improved:
  - placeholder images: 60/100.
  - explicit image source URLs: 40/100.

Rollback scope:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `docs/GRADUATION_CONTENT_QA.md`
- `src/components/GraduationInspirationApp.tsx`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: continue the trust pass by reviewing draft cases with high future value, or make the case source panel visually quieter without hiding attribution.

## 2026-07-04 - Simulation 13: Bulk Placeholder Image Audit And Fallback QA

Status: completed.

Persona: a student opening draft and published case details while Wikimedia is temporarily rate-limiting remote image requests.

Goal: audit all remaining placeholder cases, add high-confidence source metadata where safe, and prevent upstream image failures from becoming blank page regions.

Actual path:

1. Ranked all 60 placeholder cases by publication status and issue-reference count.
2. Ran a batch Wikimedia Commons candidate search for all remaining placeholders.
3. Ran a second Japanese-name/alias search for high-value Japanese projects.
4. Accepted exact or same-facility Commons candidates for `CASE-008`, `CASE-027`, `CASE-033`, `CASE-063`, `CASE-092`, `CASE-094`, `CASE-098`, and `CASE-099`.
5. Rejected or deferred false-positive candidates such as Tokyo Fuji Kindergarten lookalikes, Home-for-All exhibition images, and the wrong Tainan Spring image.
6. Rebuilt CSV-derived JSON and public exports.
7. Opened selected case detail pages under Wikimedia 429 conditions.
8. Fixed the image proxy fallback so failed upstream image loads render a visible PNG placeholder instead of a blank 1x1 pixel.
9. Bypassed Next image optimization for proxied case images to avoid caching transient fallback pixels.

User-view findings:

1. The site no longer shows an empty white rectangle when Wikimedia rate-limits a source image; it shows the designed `REFERENCE CASE` placeholder.
2. `CASE-063` currently renders as a real image with visible source and license.
3. Several newly sourced Commons records have correct metadata but may render the fallback until upstream rate limits reset or the images are downloaded locally.
4. The conservative policy prevented multiple wrong-image matches from entering the site.

Evidence:

- `/tmp/archistory-commons-placeholder-audit-20260704/commons-candidates.md`
- `/tmp/archistory-graduation-bulk-image-qa-20260704/after-png-fallback/notes.json`
- `/tmp/archistory-graduation-bulk-image-qa-20260704/after-png-fallback/CASE-063.png`
- `/tmp/archistory-graduation-bulk-image-qa-20260704/after-png-fallback/CASE-092.png`
- `docs/GRADUATION_IMAGE_REVIEW.md`

Validation:

- Passed: `npm run graduation:data`.
- Passed: `npm run graduation:audit`.
- Content status after this pass:
  - placeholder images: 53/100.
  - explicit image source URLs: 47/100.
- Rendered QA against `http://localhost:3134/zh/graduation/cases/*`:
  - selected case pages returned 200.
  - image alt text matched case titles.
  - fallback images now render as visible PNG placeholders instead of transparent 1x1 pixels.
  - `CASE-063` rendered a real 1600x1200 Commons image.
  - mobile width check stayed within 390px viewport.

Rollback scope:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `src/app/api/image-proxy/route.ts`
- `src/components/GraduationInspirationApp.tsx`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: after Wikimedia rate limits reset, download the accepted Commons images into local `public/images/graduation/cases/` assets so the case pages do not depend on remote image availability.

## 2026-07-04 - Simulation 14: Localized Case Image Reliability Pass

Status: completed.

Persona: a student opening case detail pages during a weak or rate-limited network session.

Goal: make accepted case images independent from remote Wikimedia availability wherever possible, while keeping source and license attribution traceable.

Actual path:

1. Turned the accepted Commons image set into `content/graduation_image_manifest.json`.
2. Added `scripts/localize-graduation-case-images.mjs` so accepted images can be localized repeatedly instead of handled by one-off manual edits.
3. Added `npm run graduation:images:dry-run` and `npm run graduation:images:localize`.
4. Downloaded and linked local assets for `CASE-008`, `CASE-027`, `CASE-033`, `CASE-063`, and `CASE-092`.
5. Rebuilt graduation data so CSV, source JSON, and public exports agree.
6. Kept `CASE-094`, `CASE-098`, and `CASE-099` remote for now because Wikimedia returned 429 while downloading.

User-view findings:

1. Five accepted case pages no longer depend on remote image delivery for their main visual.
2. The image source panel still shows the Commons source, license, and credit after switching to local assets.
3. Remaining remote accepted images have a visible fallback if upstream delivery fails.

Evidence:

- `content/graduation_image_manifest.json`
- `scripts/localize-graduation-case-images.mjs`
- `public/images/graduation/cases/case-008-onagawa-station-yupopo.jpg`
- `public/images/graduation/cases/case-027-yusuhara-community-library.jpg`
- `public/images/graduation/cases/case-033-yu-no-eki-ohyu.jpg`
- `public/images/graduation/cases/case-063-roadside-station-aino-tsuchiyama.jpg`
- `public/images/graduation/cases/case-092-ishikawa-prefectural-library.jpg`

Validation:

- Passed: `npm run graduation:images:dry-run`.
- Passed: `npm run graduation:data`.
- Local files verified as JPEG images with real dimensions.
- Passed after follow-up QA: `npm run graduation:audit`.
- Passed after follow-up QA: `npm run typecheck`.
- Passed after follow-up QA: `npm run lint`.
- Passed after follow-up QA: `npm run test:unit`.
- Passed after follow-up QA: `npx playwright test tests/e2e/core-routes.spec.ts`.

Rollback scope:

- `content/graduation_image_manifest.json`
- `scripts/localize-graduation-case-images.mjs`
- `package.json`
- `package-lock.json` if dependency metadata changes are present from earlier work
- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `public/images/graduation/cases/`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: run the full validation stack plus rendered desktop/mobile QA against local-image and remaining-remote case pages.

## 2026-07-04 - Simulation 15: Case Detail First-Viewport Render QA

Status: completed.

Persona: a student opening a case detail page and deciding in the first few seconds whether the example is worth reading.

Goal: verify that localized case images and fallback images actually paint in the browser, not just pass data checks.

Actual path:

1. Started the site on `http://localhost:3135`.
2. Tried the in-app Browser plugin first. It could read page DOM and image state, but its screenshot surface showed a stale blank viewport.
3. Switched to Playwright screenshot QA to avoid trusting a mismatched browser capture.
4. Found a real first-viewport paint problem: detail content existed in the DOM but screenshot pixels were blank under `.page-enter`.
5. Fixed `.page-enter` and `.fade-in` in `src/app/globals.css` by adding animation fill mode `both`.
6. Re-tested desktop local image, desktop remote/fallback image, and mobile local image pages.

User-view findings:

1. `CASE-033` now paints its title, summary, real local image, and source panel in the first viewport.
2. `CASE-094` still uses the visible fallback while remote Wikimedia delivery is unavailable, instead of showing an empty area.
3. `CASE-092` mobile view paints title, image, and source content without horizontal overflow.

Evidence:

- `/tmp/archistory-graduation-local-image-qa-20260704-after-page-enter-fix/desktop-case-033-local.png`
- `/tmp/archistory-graduation-local-image-qa-20260704-after-page-enter-fix/desktop-case-094-remote-or-fallback.png`
- `/tmp/archistory-graduation-local-image-qa-20260704-after-page-enter-fix/mobile-case-092-local.png`

Validation:

- `CASE-033`: image natural size 828x466, alt `Yu no Eki Ohyu`, source link points to Wikimedia Commons.
- `CASE-094`: fallback natural size 120x72, alt `Takanawa Gateway Station`, source metadata remains visible.
- `CASE-092` mobile: body 390px, document scroll width 390px.
- Console health on `localhost`: 0 error/warn events.

Rollback scope:

- `src/app/globals.css`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: rerun `npm run graduation:images:localize` later to pick up `CASE-094`, `CASE-098`, and `CASE-099` after Wikimedia stops returning 429.

## 2026-07-04 - Simulation 16: Case Detail Render Regression Guard

Status: completed.

Persona: a student returning to a case detail page after future layout or animation edits.

Goal: prevent the case detail page from silently regressing into a DOM-visible but pixel-blank first viewport.

Actual path:

1. Added `tests/e2e/graduation-case-render.spec.ts`.
2. Covered `CASE-033` as a localized desktop image case.
3. Covered `CASE-092` as a localized mobile image case.
4. Added a small PNG decoder inside the test so the desktop title area can be checked for actual dark painted pixels without adding new dependencies.
5. Kept remote Wikimedia cases out of the default e2e path to avoid network-rate-limit flakiness.

User-view findings:

1. The test now verifies that title, image, and attribution render on a local-image case detail page.
2. The mobile test verifies that the detail page stays inside a 390px viewport.
3. The pixel check gives a stronger guard than DOM-only visibility checks for the first-viewport blank-screen issue.

Validation:

- Passed: `npx playwright test tests/e2e/graduation-case-render.spec.ts`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npx playwright test`.
- Full e2e status after this pass: 12/12 passed.

Rollback scope:

- `tests/e2e/graduation-case-render.spec.ts`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: continue reducing placeholder images, but keep the source-safe rule and localize only exact, license-clear images.

## 2026-07-04 - Simulation 17: Accepted Commons Images Fully Localized And Optimized

Status: completed.

Persona: a student opening a case page on a slower connection and expecting the reference image to load quickly without relying on Wikimedia.

Goal: finish the accepted Commons localization pass, reduce image weight, remove embedded camera metadata, and improve detail-page image inspectability.

Actual path:

1. Re-ran `npm run graduation:images:localize` after Wikimedia rate limits recovered.
2. Downloaded the remaining accepted Commons images for `CASE-094`, `CASE-098`, and `CASE-099`.
3. Rebuilt graduation data from CSV to JSON/public exports.
4. Added `scripts/optimize-graduation-case-images.mjs` and `npm run graduation:images:optimize`.
5. Optimized all eight accepted Commons local JPEGs to a maximum edge of 2000px.
6. Stripped EXIF/XMP/comment metadata from the optimized JPEGs.
7. Changed detail case images to use full-image containment while keeping card thumbnails cropped.
8. Re-rendered `CASE-094` and confirmed it uses the local image rather than proxy/fallback.

User-view findings:

1. All eight accepted Commons case images are now local site assets.
2. Large originals were reduced to roughly 0.5-0.96MB each.
3. Detail pages no longer crop portrait images into misleading fragments.
4. Source/license/credit attribution remains visible after localization and optimization.

Evidence:

- `/tmp/archistory-graduation-localized-final-qa-20260704/desktop-case-094-local-contain-fixed.png`
- `npm run graduation:images:dry-run` reports all eight manifest entries as `already-local`.

Validation:

- Passed: `npm run graduation:images:dry-run`.
- Passed: `npm run graduation:audit`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npx playwright test`.
- Full e2e status after this pass: 12/12 passed.

Rollback scope:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `public/images/graduation/cases/`
- `scripts/optimize-graduation-case-images.mjs`
- `package.json`
- `src/components/GraduationInspirationApp.tsx`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: rank the remaining 53 placeholder cases by issue-reference value and continue exact-source image replacement in small verified batches.

## 2026-07-04 - Simulation 18: Placeholder Priority And Two More Safe Images

Status: completed.

Persona: a student browsing draft/public-space references who needs images to be real, traceable, and not visually misleading.

Goal: continue replacing placeholders only where exact, license-clear sources exist, and leave a ranked continuation queue for the next image pass.

Actual path:

1. Ranked remaining placeholder cases by publication status and issue-reference count.
2. Checked high-value placeholders first and kept `CASE-001`, `CASE-004`, `CASE-006`, and `CASE-003` unresolved because exact reusable covers were not confirmed.
3. Accepted `CASE-035` from Wikimedia Commons file `KOIL_GARDEN.jpg` as a same-facility KOIL garden image with CC0 metadata.
4. Accepted `CASE-070` from Wikimedia Commons file `Tonami_City_Tonami_Library_01.jpg` as an exact Tonami City Tonami Library image with CC BY-SA 4.0 metadata.
5. Localized and optimized both new images, rebuilt graduation data, and updated the placeholder priority document.

User-view findings:

1. The case library now has 20 local graduation case images instead of 18.
2. `CASE-035` and `CASE-070` show real public-space/library visuals with visible source/license/credit fields.
3. The remaining 51 placeholders are not random leftovers; the highest-value unresolved cases are now explicitly ranked for future source-safe search.
4. The safest next move is still image trust work, not visual redesign.

Evidence:

- `public/images/graduation/cases/case-035-kashiwa-no-ha-open-innovation-lab.jpg`
- `public/images/graduation/cases/case-070-tonami-public-library.jpg`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- Source page: `https://commons.wikimedia.org/wiki/File:KOIL_GARDEN.jpg`
- Source page: `https://commons.wikimedia.org/wiki/File:Tonami_City_Tonami_Library_01.jpg`

Validation:

- Passed: `npm run graduation:images:dry-run`.
- Passed: `npm run graduation:audit`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run test:unit`.
- Passed: `npx playwright test`.
- Full e2e status after this pass: 12/12 passed.

Rollback scope:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `public/images/graduation/cases/case-035-kashiwa-no-ha-open-innovation-lab.jpg`
- `public/images/graduation/cases/case-070-tonami-public-library.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: take the top 5 to 8 records in `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`, search exact reusable images, and keep rejected candidates logged instead of forcing weak visuals into the site.

## 2026-07-04 - Simulation 19: Three More Exact Commons Case Images

Status: completed.

Persona: a student browsing public-service and library precedents who wants concrete visual references with traceable source information.

Goal: continue the source-safe image pass, add exact Commons images where available, and verify the new case detail pages render real images and attribution.

Actual path:

1. Searched the placeholder priority queue and adjacent library/community cases for exact Wikimedia Commons matches.
2. Accepted `CASE-076` Kozakai Kifukan Community Center from the Commons `Kozakai Kifukan` category.
3. Accepted `CASE-079` Ebina City Arima Library and Community Center from the Commons file `Ebina City Arima Library 201510.JPG`.
4. Accepted `CASE-095` Nakajima Library Akita International University from the Commons file `Inside Nakajima Library.jpg`.
5. Used the 1280px Wikimedia derivative for `CASE-095` localization because the original file returned upstream 429.
6. Downloaded, optimized, stripped metadata, rebuilt data, and checked all three pages in the in-app browser.

User-view findings:

1. The three case detail pages show real local images in the first viewport.
2. Each page keeps the visible image source, license, credit, and review note.
3. `CASE-095` is especially useful visually because the interior image clearly shows the library space, not just an exterior shell.
4. Placeholder count dropped from 51 to 48.

Evidence:

- `public/images/graduation/cases/case-076-kozakai-kifukan-community-center.jpg`
- `public/images/graduation/cases/case-079-ebina-city-arima-library.jpg`
- `public/images/graduation/cases/case-095-nakajima-library-akita-international-university.jpg`
- Source page: `https://commons.wikimedia.org/wiki/File:Kozakai_Kifukan_2021-05_ac_(1).jpg`
- Source page: `https://commons.wikimedia.org/wiki/File:Ebina_City_Arima_Library_201510.JPG`
- Source page: `https://commons.wikimedia.org/wiki/File:Inside_Nakajima_Library.jpg`

Rendered QA:

- `CASE-076`: title visible, image natural size 960x638, source/license text visible, no browser error/warn logs.
- `CASE-079`: title visible, image natural size 960x720, source/license text visible, no browser error/warn logs.
- `CASE-095`: title visible, image natural size 960x640, source/license text visible, no browser error/warn logs.
- Desktop document width stayed within the 1280px viewport for all three checked pages.

Validation:

- Passed before log entry: `npm run graduation:images:localize` with all 13 manifest records local.
- Passed before log entry: `npm run graduation:images:optimize` with 3 newly optimized files and no missing files.
- Passed before log entry: `npm run graduation:data`.
- Passed after documentation update: `npm run graduation:images:dry-run`.
- Passed after documentation update: `npm run graduation:audit`.
- Passed after documentation update: `npm run typecheck`.
- Passed after documentation update: `npm run lint`.
- Passed after documentation update: `npm run test:unit`.
- Passed after documentation update: `npx playwright test`.
- Full e2e status after this pass: 12/12 passed.

Rollback scope:

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
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: continue with `CASE-013`, `CASE-011`, `CASE-009`, `CASE-010`, and `CASE-024`, but first improve overly broad source URLs for `CASE-011` and `CASE-009` so image search does not drift.

## 2026-07-04 - Simulation 20: Source Trust Before More Images

Status: completed.

Persona: a student using the case library to choose a graduation-design direction, checking whether the source page actually matches the listed precedent.

Goal: prevent broad or vague sources from sending the student to generic government pages, and avoid adding visually tempting but rights-unclear images.

Actual path:

1. Opened the next placeholder-priority cases from the image queue.
2. Replaced the broad source for `CASE-009` with the official Taipei New Immigrants Hall page.
3. Replaced the broad source for `CASE-011` with Toyama Prefecture's Toyama-style day care explanation.
4. Deferred images for `CASE-009` and `CASE-011` because exact reusable facility/building images were not confirmed.
5. Recorded deferred searches for `CASE-010`, `CASE-013`, `CASE-024`, and `CASE-030`.
6. Rebuilt graduation JSON/public exports and reran graduation content audit.

User-view findings:

1. `CASE-009` now points to a concrete facility source instead of a generic city page.
2. `CASE-011` now honestly reads as a service-space model, not a single verified building with a forced image.
3. The library remains visually less complete than desired, but it is more trustworthy for actual school research.
4. The next useful work is still source trust and exact-image replacement, not decoration.

Evidence:

- Source page: `https://nit.taipei/Content_List.aspx?n=9A7B4A84568D136C`
- Source page: `https://www.pref.toyama.jp/1200/chiikikyosei/toyamagata/toyamagata2.html`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`

Validation:

- Passed before this log entry: `npm run graduation:data`.
- Passed before this log entry: `npm run graduation:audit`.

Rollback scope:

- `content/cases.csv`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: run the full verification suite, then continue the next source-safe batch from the placeholder queue without accepting rights-unclear official images.

## 2026-07-04 - Simulation 21: Bonus Track Image Accepted With License Check

Status: completed.

Persona: a student opening a street-regeneration precedent and expecting the image to show the real place without copyright guesswork.

Goal: add one useful visual precedent only if the source is exact and reuse rights are clear, while documenting why nearby attractive candidates remain placeholders.

Actual path:

1. Reviewed the next placeholder-priority cases after the previous source cleanup pass.
2. Found an exact `BONUS TRACK` figure in an MDPI open-access article.
3. Checked that the article labels the figure as Bonus Track and publishes the article under CC BY 4.0.
4. Rejected the Good Design Award image path because that page prohibits unauthorized copying of text and images.
5. Added `CASE-038` to the image manifest, localized the JPEG, and rebuilt graduation data.
6. Added placeholder review notes for `CASE-010`, `CASE-013`, `CASE-024`, `CASE-030`, and `CASE-064`.

User-view findings:

1. `CASE-038` now shows a real Bonus Track image instead of a generic placeholder.
2. The case detail has visible image source, license, credit, and review note.
3. Five neighboring draft cases still use placeholders, but their notes now explain that exact reusable images were not confirmed.
4. The library became slightly more visual without weakening source trust.

Evidence:

- Source page: `https://www.mdpi.com/2071-1050/17/17/7583`
- Local asset: `public/images/graduation/cases/case-038-bonus-track-shimokitazawa.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`

Validation:

- Passed before this log entry: `npm run graduation:images:localize`.
- Passed before this log entry: `npm run graduation:images:optimize`.
- Passed before this log entry: `npm run graduation:data`.
- Passed before this log entry: `npm run graduation:audit`.

Rollback scope:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `public/images/graduation/cases/case-038-bonus-track-shimokitazawa.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: run full verification, then continue the next exact-source batch from the placeholder queue.

## 2026-07-04 - Simulation 22: Miyashita Park Public-Space Image Check

Status: completed.

Persona: a student browsing public-space and youth-activity precedents, checking whether the case image is a real place rather than a generic Tokyo park photo.

Goal: add a source-safe visual for `CASE-068` while keeping rights-unclear child-care, disaster, art-center, and cancer-support examples as placeholders.

Actual path:

1. Reviewed `CASE-068`, `CASE-085`, `CASE-025`, `CASE-032`, and `CASE-048` from the placeholder queue.
2. Accepted a Wikimedia Commons image of Miyashita Park's dance plaza for `CASE-068`.
3. Localized and optimized the image, reducing it from 1,977,150 bytes to 685,444 bytes.
4. Rebuilt graduation data and confirmed the generated JSON points `CASE-068` to the local image.
5. Rejected or deferred the other four cases because their available images were official/ArchDaily/article media without clear reusable rights, or non-commercial/secondary-source material.

User-view findings:

1. `CASE-068` now has a real local image with visible `CC BY 3.0` source metadata.
2. The image shows the public dance/activity area of Miyashita Park, which fits the case's youth-activity and public-management theme.
3. `CASE-025`, `CASE-032`, `CASE-048`, and `CASE-085` remain placeholders, but now explain why.
4. The site gains one useful visual reference without lowering image trust standards.

Evidence:

- Source page: `https://commons.wikimedia.org/wiki/File:Miyashita_Park.jpg`
- Local asset: `public/images/graduation/cases/case-068-miyashita-park-atelier-bow-wow.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`

Validation:

- Passed before this log entry: `npm run graduation:images:localize`.
- Passed before this log entry: `npm run graduation:images:optimize`.
- Passed before this log entry: `npm run graduation:data`.
- Passed before this log entry: `npm run graduation:audit`.

Rollback scope:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- `src/content/graduation/cases.json`
- `public/data/graduation/cases.csv`
- `public/data/graduation/cases.json`
- `public/images/graduation/cases/case-068-miyashita-park-atelier-bow-wow.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: run the full verification suite, then continue with the next 5 placeholder cases only where source rights are clear.

## 2026-07-04 - Simulation 23: Five Placeholder Safety Check

Status: completed.

Persona: a student using the inspiration library to browse precedents quickly, expecting images to represent the actual case and not just a nearby place or attractive unrelated media.

Goal: check whether the next five placeholder cases can safely receive real images without weakening source trust.

Actual path:

1. Reviewed `CASE-059`, `CASE-072`, `CASE-073`, `CASE-075`, and `CASE-077`.
2. Checked available official, article, Commons, and search-result evidence.
3. Rejected all five image candidates because the evidence was either rights-unclear, non-exact, nearby context, wrong city, or a visualization instead of real project photography.
4. Wrote explicit rejection notes into `content/cases.csv`.
5. Updated image-review and placeholder-priority logs so the next pass can continue without repeating this same search.

User-view findings:

1. The site still has 46 generic placeholders, so the visual layer did not improve in this pass.
2. The data became more trustworthy because misleading images were blocked before entering the public UI.
3. `CASE-073` is a useful example of why visual caution matters: a station image is geographically relevant but not the AIR facility; another similarly named Commons image was from the wrong city.
4. `CASE-077` also stays placeholder because an open-license visualization is not the same as a real case photo.

Evidence:

- Koganecho official source: `https://koganecho.net/9616/4`
- AIR_J Koganecho source: `https://air-j.info/en/program/koganecho-air/`
- Nearby station image rejected as non-facility context: `https://commons.wikimedia.org/wiki/File:Koganecho_Station_Exit.JPG`
- Wrong-city Commons result rejected: `https://commons.wikimedia.org/wiki/File:Koganecho_-_panoramio_(8).jpg`
- Pasona visualization source rejected as non-photo: `https://www.mdpi.com/2071-1050/17/18/8155`

Validation:

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `content/cases.csv`
- generated graduation data files after rebuild
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: rebuild and verify the site, then continue the next placeholder batch with the same exact-source rule.

## 2026-07-04 - Simulation 24: Hof van Cartesius Source-Safe Image Check

Status: completed.

Persona: a student looking for circular-economy and repair-workshop precedents, expecting the case image to show a real built environment and not a generic event or official press image without reuse rights.

Goal: improve one placeholder image only if it is exact, reusable, and useful for understanding the case.

Actual path:

1. Reviewed `CASE-078`, `CASE-080`, `CASE-082`, `CASE-083`, and `CASE-089`.
2. Checked official project pages, ArchDaily/article sources, Wikimedia Commons API, Openverse, and Flickr metadata.
3. Rejected `CASE-078`, `CASE-080`, `CASE-082`, and `CASE-083` because their available images were rights-unclear even when visually strong.
4. Accepted a Flickr/Openverse `CASE-089` image with `CC BY-SA 2.0`, creator `nandasluijsmans`, and Hof/Cartesius/Utrecht tags.
5. Localized and optimized the accepted image, then recorded the source, license, credit, and review note in `content/cases.csv`.

User-view findings:

1. `CASE-089` now has a real local image showing the courtyard and circular facade character of Het Hof van Cartesius.
2. The image supports the case's reuse/cooperative/workshop theme better than an event photo would.
3. The library now has 45 generic placeholders instead of 46.
4. The accepted image is source-safe, but still not an official architectural photographer set.
5. Four visually attractive candidates stayed placeholders because using them would weaken the site's trust standard.

Evidence:

- Accepted Flickr source: `https://www.flickr.com/photos/141420435@N08/52620631677`
- Openverse metadata: `CC BY-SA 2.0`, creator `nandasluijsmans`, tags `hof`, `cartesius`, `utrecht`
- Official Hof source: `https://www.hofvancartesius.nl/blog/hof-van-cartesius-a-place-where-people-thrive`
- RHAW architecture source: `https://rhaw.nl/projecten/hof-van-cartesius-circulaire-gemeenschap`
- Local asset: `public/images/graduation/cases/case-089-het-hof-van-cartesius.jpg`

Validation:

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render check for `CASE-089` on desktop and mobile.

Rollback scope:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation data files after rebuild
- local files under `public/images/graduation/cases/` touched by the 1600px optimization pass
- `public/images/graduation/cases/case-089-het-hof-van-cartesius.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: rebuild and verify, then continue only after the rendered `CASE-089` detail page is confirmed readable on desktop and mobile.

## 2026-07-04 - Simulation 25: Taipei New Immigrants Hall Exact Image Check

Status: completed.

Persona: a student browsing multicultural community-service precedents, expecting the case image to show the actual facility rather than a generic Taipei city building.

Goal: improve a high-priority placeholder only if the image is exact, reusable, and useful for recognizing the facility.

Actual path:

1. Rechecked `CASE-001`, `CASE-003`, `CASE-004`, `CASE-006`, and `CASE-013` from the top of the placeholder queue.
2. Continued to `CASE-009`, `CASE-010`, `CASE-011`, `CASE-024`, and `CASE-030`.
3. Used Commons API, Openverse, official pages, and web search to separate exact reusable images from official or NC/ND media.
4. Accepted the Wikimedia Commons image of Wanhua New Immigrants' Hall for `CASE-009`.
5. Rejected exact `CASE-004` and `CASE-006` Flickr candidates because their licenses were non-commercial or no-derivatives.
6. Localized and optimized the accepted `CASE-009` image, then recorded source, license, credit, and note in `content/cases.csv`.

User-view findings:

1. `CASE-009` now has a real facility exterior with visible Taipei City New Immigrants' Hall signage.
2. The case image is not as polished as a professional architecture photograph, but it is exact and public-license safe.
3. The library now has 44 generic placeholders instead of 45.
4. Published/high-value examples such as Share Kanazawa and Fuji Kindergarten remain visually weaker, but this avoids NC/ND or non-exact image misuse.

Evidence:

- Accepted Commons source: `https://commons.wikimedia.org/wiki/File:Wanhua_New_Immigrants%27_Hall_20181117.jpg`
- Official Chinese source: `https://nit.taipei/Content_List.aspx?n=9A7B4A84568D136C`
- Official English source: `https://nite.taipei/Content_List.aspx?n=A0DD6AB43E7C5B5C`
- Local asset: `public/images/graduation/cases/case-009-wanhua-new-immigrants-hall.jpg`

Validation:

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render check for `CASE-009` on desktop and mobile.

Rollback scope:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation data files after rebuild
- `public/images/graduation/cases/case-009-wanhua-new-immigrants-hall.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: rebuild and verify, then continue only after the rendered `CASE-009` detail page is confirmed readable on desktop and mobile.

## 2026-07-04 - Simulation 26: MIKAN SHIMOKITA Exact Image Check

Status: completed.

Persona: a student looking for high-line, under-rail, and neighborhood commercial precedents, expecting the image to show the real street condition and not a generic Shimokitazawa scene.

Goal: add a useful visual for `CASE-039` only if it is exact, reusable, and not misleading.

Actual path:

1. Reviewed `CASE-037`, `CASE-064`, `CASE-085`, `CASE-090`, `CASE-025`, `CASE-032`, and `CASE-048`.
2. Rejected Home-for-All candidates because the Commons/Openverse results were exhibition or model photos instead of the built Rikuzentakata project.
3. Rejected the remaining reviewed cases because no exact reusable Commons/Openverse image was confirmed.
4. Searched `MIKAN SHIMOKITA` in English and Japanese; the Japanese query `ミカン下北` found an exact Wikimedia Commons image.
5. Accepted the `CC0` Commons image by `Souka Kinmei`, localized it, optimized it, and wrote source metadata into `content/cases.csv`.

User-view findings:

1. `CASE-039` now has a real image showing the under-rail commercial passage and storefront modules.
2. The image is exact and license-safe, though it is an everyday exterior shot rather than official architectural photography.
3. The library now has 43 generic placeholders instead of 44.
4. Rejected Home-for-All images remain valuable context but would mislead users if used as built-project covers.

Evidence:

- Accepted Commons source: `https://commons.wikimedia.org/wiki/File:%E5%95%86%E6%A5%AD%E6%96%BD%E8%A8%AD%E3%80%8C%E3%83%9F%E3%82%AB%E3%83%B3%E4%B8%8B%E5%8C%97%E3%80%8D.jpg`
- Official project source: `https://tjda.com/en/projects/mikan-shimokita/`
- Local asset: `public/images/graduation/cases/case-039-mikan-shimokita.jpg`

Validation:

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render check for `CASE-039` on desktop and mobile.

Rollback scope:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation data files after rebuild
- `public/images/graduation/cases/case-039-mikan-shimokita.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: rebuild and verify, then continue only after the rendered `CASE-039` detail page is confirmed readable on desktop and mobile.

## 2026-07-04 - Simulation 27: JACCC Public-Cultural Image Check

Status: completed.

Persona: a student browsing multicultural and community-memory precedents, expecting the image to show a real cultural facility rather than an unrelated Little Tokyo event or generic neighborhood photo.

Goal: add a source-safe visual to a remaining placeholder case where the facility is exact and public-license clear.

Actual path:

1. Reviewed public-facility candidates `CASE-057`, `CASE-067`, `CASE-088`, `CASE-091`, `CASE-096`, and `CASE-100`.
2. Found no exact reusable Commons/Openverse images for `CASE-057`, `CASE-067`, `CASE-088`, or `CASE-091`.
3. Rejected `CASE-100` because Openverse returned Portland Japanese Garden related images that were either NC-ND or not exact Cultural Village covers.
4. Found two exact Wikimedia Commons images for `CASE-096`.
5. Accepted the color JACCC + Frances Hashimoto Plaza image because it shows the cultural center and plaza context together under `CC BY-SA 4.0`.
6. Localized and optimized the accepted image, then wrote source, license, credit, and note in `content/cases.csv`.

User-view findings:

1. `CASE-096` now has a real exterior and plaza image, useful for understanding cultural-center public space.
2. The image is exact and license-safe, though broader than an architectural-detail shot.
3. The library now has 42 generic placeholders instead of 43.
4. The rejected Japan civic cases remain placeholders because exact open images were not confirmed.

Evidence:

- Accepted Commons source: `https://commons.wikimedia.org/wiki/File:Japanese_American_Cultural_and_Community_Center_%26_Frances_Hashimoto_Plaza.jpg`
- Backup Commons source reviewed but not selected: `https://commons.wikimedia.org/wiki/File:Noguchi_Plaza,_Japanese_American_Cultural_%26_Community_Center.JPG`
- Local asset: `public/images/graduation/cases/case-096-japanese-american-community-cultural-center.jpg`

Validation:

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render check for `CASE-096` on desktop and mobile.

Rollback scope:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation data files after rebuild
- `public/images/graduation/cases/case-096-japanese-american-community-cultural-center.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: rebuild and verify, then continue only after the rendered `CASE-096` detail page is confirmed readable on desktop and mobile.

## 2026-07-04 - Simulation 28: Tainan Spring And Pasona Image Recovery

Status: completed.

Persona: a student browsing urban renewal and workplace-agriculture precedents, expecting case images to show the real project or exact facility rather than a similar city park or a rendering.

Goal: recover two previously deferred placeholder cases only if the new candidates are exact, license-safe, and useful as public case covers.

Actual path:

1. Rechecked `CASE-056` after finding the Commons file `臺南河樂廣場.jpg`.
2. Matched the Commons description of the former Tainan China Town Mall site transformed into HeLe Plaza against MVRDV's Tainan Spring description.
3. Rechecked `CASE-077` after finding the Commons file `Pasona building.JPG`.
4. Matched the Commons Pasona building exterior against Kono Designs' Pasona Urban Farm / Pasona HQ renovation description.
5. Accepted both images, localized them, optimized them, and wrote source/license/credit fields in `content/cases.csv`.

User-view findings:

1. `CASE-056` now shows the actual Tainan Spring / HeLe Plaza public-space context instead of a generic placeholder.
2. `CASE-077` now shows the actual Pasona building exterior, making the urban-farm case visibly grounded in a real facility.
3. The library now has 40 generic placeholders instead of 42.
4. Both images are exact and license-safe, though neither is official architectural photography.

Evidence:

- Accepted Tainan Commons source: `https://commons.wikimedia.org/wiki/File:%E8%87%BA%E5%8D%97%E6%B2%B3%E6%A8%82%E5%BB%A3%E5%A0%B4.jpg`
- Tainan official project source: `https://www.mvrdv.com/projects/272/tainan-spring`
- Accepted Pasona Commons source: `https://commons.wikimedia.org/wiki/File:Pasona_building.JPG`
- Pasona official project source: `https://konodesigns.com/urban-farm/`
- Local assets:
  - `public/images/graduation/cases/case-056-tainan-spring.jpg`
  - `public/images/graduation/cases/case-077-pasona-urban-farm.jpg`

Validation:

- Passed after this log entry: `npm run graduation:images:dry-run`.
- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render check for `CASE-056` and `CASE-077` on desktop and mobile.
- Browser plugin note: in-app Browser connected but timed out during screenshot inspection, so validation fell back to standalone Playwright.

Rollback scope:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation data files after rebuild
- `public/images/graduation/cases/case-056-tainan-spring.jpg`
- `public/images/graduation/cases/case-077-pasona-urban-farm.jpg`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: rebuild and verify, then continue only after the rendered `CASE-056` and `CASE-077` detail pages are confirmed readable on desktop and mobile.

## 2026-07-04 - Simulation 29: Source Accuracy Before More Covers

Status: completed.

Persona: a student using the case library to click from a card into the original project source, expecting the project name and external link to be current.

Goal: continue improving the library even when a new reusable cover image is not available.

Actual path:

1. Reviewed remaining placeholders after the Tainan/Pasona pass.
2. Checked Openverse, Commons, and web search for `CASE-049`, `CASE-069`, `CASE-080`, `CASE-084`, `CASE-086`, `CASE-087`, `CASE-093`, and `CASE-097`.
3. Found no exact reusable images suitable for public covers.
4. Found that `CASE-080` should be represented as `Tainan Market` and linked to MVRDV's current project page.
5. Updated `CASE-080` name, source URL, concept, and image note while keeping its placeholder image.

User-view findings:

1. `CASE-080` now has a more accurate project title and source link.
2. The image count does not improve in this pass, but the case data becomes less misleading.
3. The library remains at 40 generic placeholders.
4. Rejected image candidates were not used because they were non-exact, all-rights-reserved, non-commercial, or absent from open image search.

Evidence:

- Corrected MVRDV source: `https://www.mvrdv.com/projects/391/tainan-market`
- Still-deferred image candidates include `CASE-049`, `CASE-069`, `CASE-080`, `CASE-084`, `CASE-086`, `CASE-087`, `CASE-093`, and `CASE-097`.

Validation:

- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin render check for `CASE-080` on desktop.
- Passed after this log entry: targeted Playwright mobile width check for `CASE-080`.

Rollback scope:

- `content/cases.csv`
- generated graduation data files after rebuild
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: rebuild and verify, then continue source-page cleanup for remaining placeholders before chasing weaker image leads.

## 2026-07-04 - Simulation 30: Clicking From Placeholder Cases To Sources

Status: completed.

Persona: a student who does not care whether every card already has a perfect image, but expects the source link to take them to the most authoritative project page available.

Goal: improve trust in placeholder cases without adding unsafe images.

Actual path:

1. Started from placeholder cases whose source links pointed to ArchDaily, Archidiaries, Architecture MasterPrize, or other secondary sources.
2. Searched for official studio/project pages before changing anything.
3. Confirmed official/current sources for `CASE-001`, `CASE-026`, `CASE-059`, `CASE-067`, `CASE-069`, `CASE-070`, `CASE-075`, `CASE-084`, and `CASE-088`.
4. Replaced the primary `source_url` for those nine cases.
5. Left images untouched because no exact reusable cover image was confirmed.

User-view findings:

1. A user clicking these nine source links now lands closer to the original project author.
2. The visible image count does not change, but the資料館 behavior improves: source links become more trustworthy.
3. The site still has 40 generic placeholders, so the next improvement should return to image-safe cover replacement.

Evidence:

- `CASE-001`: `https://www.goi.co.jp/building/share_kanazawa/`
- `CASE-026`: `https://www.td-ms.com/works/yoridoko/index.html#work`
- `CASE-059`: `https://www.narukuma.com/lt-josai/`
- `CASE-067`: `https://kkaa.co.jp/en/project/shibuya-scc-sendagaya-community-centerharajyuku-kindergarden/`
- `CASE-069`: `https://kkaa.co.jp/en/project/museum-of-kanayama-castle-ruin-kanayama-community-center/`
- `CASE-070`: `https://mikami-arc.co.jp/work/%E7%A0%BA%E6%B3%A2%E5%B8%82%E7%AB%8B%E7%A0%BA%E6%B3%A2%E5%9B%B3%E6%9B%B8%E9%A4%A8`
- `CASE-075`: `https://schemata.jp/komaeyu/`
- `CASE-084`: `https://architects.vuild.co.jp/en/2024/07/09/the-learning-architecture-for-learners/`
- `CASE-088`: `https://kkaa.co.jp/en/project/towada-city-plaza/`

Validation:

- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.
- Passed after this log entry: targeted Playwright render/source-link checks for all changed case detail pages on desktop and mobile.

Rollback scope:

- `content/cases.csv`
- generated graduation data files after rebuild
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: rebuild and verify these source-link changes, then continue reducing placeholders only when the image license is source-safe.

## 2026-07-04 - Simulation 31: Second Source Cleanup Pass

Status: completed.

Persona: a student who opens a case detail page and clicks the source link to judge whether the project is worth saving for a graduation proposal.

Goal: reduce reliance on secondary architecture media where a more authoritative official page exists.

Actual path:

1. Re-scanned remaining weak-source cases after Simulation 30.
2. Confirmed stronger sources for `CASE-025`, `CASE-034`, `CASE-043`, `CASE-066`, `CASE-072`, `CASE-086`, and `CASE-091`.
3. Replaced their primary `source_url` values.
4. Left `CASE-087` unchanged because no stronger official project page was confirmed.
5. Left all images untouched because this pass was about source reliability, not cover-image replacement.

User-view findings:

1. Seven more case detail pages now lead users to official or institution-owned sources.
2. `CASE-034`, `CASE-043`, and `CASE-070` already have source-safe covers, so this improves their research links rather than their visual appearance.
3. The placeholder count remains 40.

Evidence:

- `CASE-025`: `https://e-ensha.com/en-irh-child-development-support/`
- `CASE-034`: `https://en.kait.jp/facilities/kait-workshop.html`
- `CASE-043`: `https://www.fuji-studio.jp/index_E.html#section_works_Mashiko`
- `CASE-066`: `https://e-ensha.com/en-irh-child-development-support/`
- `CASE-072`: `https://hagiso.com/hanare-a/`
- `CASE-086`: `https://ykdw.org/works/long-house-with-an-engawa/`
- `CASE-091`: `https://ishinomaki-fukugo.net/makiart/`

Validation:

- Passed after this log entry: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin desktop source-link checks for all seven changed case detail pages.
- Passed after this log entry: Browser plugin mobile-width source-link and overflow checks for all seven changed case detail pages.
- Passed after this log entry: Browser plugin interaction check from `CASE-025` detail page back to the case library.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `content/cases.csv`
- generated graduation data files after rebuild
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: rebuild and verify these links in the rendered app, then continue with source-safe image replacement.

## 2026-07-04 - Simulation 32: CASE-100 Image Replacement Pass

Status: completed.

Persona: a student browsing the case archive for a calm, image-led cultural/community precedent instead of reading a dense text list.

Goal: make `CASE-100` Portland Japanese Garden Cultural Village feel like a real archive entry by replacing its generic placeholder with a source-safe project-context image.

Actual path:

1. Re-opened the remaining placeholder pool after the source cleanup pass.
2. Found a Wikimedia Commons file for `Tsubo-Niwa at Portland Japanese Garden`.
3. Checked that the Commons context ties the image to Portland Japanese Garden Cultural Village / Tateuchi courtyard.
4. Confirmed license, creator, and source metadata: `CC BY-SA 4.0`, `WLernerPJG`, Wikimedia Commons.
5. Localized and optimized the image into the Graduation case image folder.
6. Updated `CASE-100` metadata so the detail page can show image source, credit, license, and the official KKAA project source.

User-view findings:

1. A user opening `CASE-100` should now see a real courtyard/building-context photo instead of the generic placeholder.
2. The entry remains source-traceable: Commons is used for the image, KKAA remains the official project source.
3. The image is not official KKAA photography, so the license and credit must stay visible in the rendered page.

Evidence:

- image source: `https://commons.wikimedia.org/wiki/File:Tsubo-Niwa_at_Portland_Japanese_Garden.jpg`
- official project source: `https://kkaa.co.jp/en/project/portland-japanese-garden-cultural-village/`
- local asset: `/images/graduation/cases/case-100-portland-japanese-garden-cultural-village.jpg`

Validation:

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

Rollback scope:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- `public/images/graduation/cases/case-100-portland-japanese-garden-cultural-village.jpg`
- generated graduation data files after rebuild
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: run the full verification chain, then use the browser to confirm the rendered cover image, attribution, and source links on desktop and mobile.

## 2026-07-04 - Simulation 33: Official Source Link Cleanup

Status: completed.

Persona: a student who has already found an interesting case and clicks the source link to decide whether it is reliable enough for a graduation proposal reference list.

Goal: reduce weak media-dependency in the case archive by sending users to official or institution-owned source pages where possible.

Actual path:

1. Rechecked the two remaining weak-source candidates called out in the previous image pass.
2. Found the official SHOGIN TACT Tsuruoka facility overview page for `CASE-057`.
3. Found the official UNEMORI ARCHITECTS project page for `CASE-087`.
4. Replaced the old primary source links.
5. Kept both placeholders because the official/source-page photos are all-rights-reserved or reuse-unconfirmed.

User-view findings:

1. A user clicking `CASE-057` source should now land on the venue's official facility overview instead of a photographer portfolio.
2. A user clicking `CASE-087` source should now land on the official UNEMORI project page instead of ArchDaily.
3. The case cards do not look more visual yet, but their research trustworthiness improves.

Evidence:

- `CASE-057`: `https://tact-tsuruoka.jp/information`
- `CASE-087`: `https://unemori-archi.com/?works=kitakami-health-childcare-support-composition-facility`

Validation:

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin desktop checks for `CASE-057` and `CASE-087` confirmed correct official source links, placeholder status, review notes, no relevant console errors, no visible framework overlay, and no horizontal overflow.
- Passed after this log entry: Browser plugin mobile-width checks for `CASE-057` and `CASE-087` confirmed correct official source links, placeholder status, review notes, no relevant console errors, no visible framework overlay, and no horizontal overflow.
- Passed after this log entry: Browser plugin interaction check from `CASE-087` detail page back to `/zh/graduation/cases`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `content/cases.csv`
- generated graduation case data after rebuild
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: verify the rendered source links, then continue image replacement only where exact reusable media can be confirmed.

## 2026-07-04 - Simulation 34: CASE-079 Official Source Link Cleanup

Status: completed.

Persona: a student who likes the Ebina library/community-center precedent and wants the most official source to cite later.

Goal: keep the already accepted source-safe image while replacing the secondary project article with the facility's official site.

Actual path:

1. Audited remaining case source domains after Round 3.
2. Found that `CASE-079` still used Archello as the primary source.
3. Confirmed the official Arima Library / Kadosawabashi Community Center site.
4. Replaced only `source_url`; kept the Commons image, license, and credit unchanged.

User-view findings:

1. The case still has a real local cover image.
2. Clicking the source link should now send the user to the official facility site.
3. The image remains a 2015 exact-facility Commons image, not a post-renovation interior image.

Evidence:

- official facility source: `https://www.arimalib-kadokomi.com/`
- accepted image source: `https://commons.wikimedia.org/wiki/File:Ebina_City_Arima_Library_201510.JPG`

Validation:

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin desktop/mobile `CASE-079` checks confirmed the official facility source link, Commons image source link, local image, `CC BY-SA 4.0` license, Wikimedia credit, no relevant console errors, no visible framework overlay, and no horizontal overflow.
- Browser plugin interaction retry timed out twice while clicking the return link; fallback Playwright interaction check passed for `CASE-079` detail page back to `/zh/graduation/cases`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `content/cases.csv`
- generated graduation case data after rebuild
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: continue targeted source cleanup by scanning remaining case source domains for secondary media pages, then only return to image replacement when an exact reusable image can be confirmed without broad Commons API bursts.

## 2026-07-04 - Simulation 35: CASE-081 Official Source Link Cleanup

Status: completed.

Persona: a student who opens a published case and expects the source link to be as close as possible to the architect or facility, not a reposted profile page.

Goal: make the published `CASE-081` Sukagawa Community Center tette entry cite the official architect project page while keeping its existing open-license image.

Actual path:

1. Scanned remaining case source domains for tracked secondary-source sites.
2. Found `CASE-081` still used World-Architects as the primary source.
3. Confirmed the official UNEMORI ARCHITECTS project page.
4. Replaced only `source_url`; kept the Commons image, license, and credit unchanged.
5. Rebuilt generated graduation data and reran the weak-domain scan, which returned no tracked secondary-source domains.

User-view findings:

1. The published case should now lead users to the official UNEMORI project page.
2. The case still displays its existing Commons cover and attribution.
3. This improves trust without changing the visual layout.

Evidence:

- official project source: `https://unemori-archi.com/?works=sukagawa-civic-center-tentative-name`
- accepted image source: `https://commons.wikimedia.org/wiki/File:Sukagawa_Citizen_Exchange_Center_Tette.jpg`

Validation:

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: weak-domain scan returned no tracked secondary-source domains.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin desktop/mobile `CASE-081` checks confirmed the official UNEMORI source link, Commons image source link, remote image loading through the proxy, `CC BY-SA 4.0` license, `Suikotei` credit, no relevant console errors, no visible framework overlay, and no horizontal overflow.
- Passed after this log entry: Browser plugin interaction check from `CASE-081` detail page back to `/zh/graduation/cases`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `content/cases.csv`
- generated graduation case data after rebuild
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: switch from source cleanup to the next highest-value data QA pass: find cases with remote images that should be localized or cases whose image notes are too thin for future handoff.

## 2026-07-04 - Simulation 36: Localized Commons Case Covers

Status: in progress.

Persona: a student browsing published case details from a weak network, expecting case cover images to load consistently and source/license information to remain visible.

Goal: verify that newly localized case covers behave like the existing local images while keeping attribution intact.

Actual path:

1. Expanded the case image manifest for all remaining remote Wikimedia Commons images.
2. Ran the localization script and accepted the downloads Wikimedia allowed before upstream rate limiting.
3. Optimized the localized files to 1600px max edge.
4. Rebuilt generated graduation data.
5. Installed Open Design from the official release so later design passes can use a real design workspace instead of ad hoc visual guessing.
6. Registered Open Design as a Codex MCP server through a stable wrapper.
7. Created a reversible Open Design smoke-test project and artifact.

User-view findings to verify:

1. `CASE-015`, `CASE-021`, and `CASE-043` should show local `/images/graduation/cases/...jpg` covers.
2. Each detail page should still expose the Commons image source, license, and credit.
3. The 26 remote-image retry cases should continue using their remote URLs instead of broken local paths.
4. The pages should remain usable on desktop and mobile without console errors or layout overflow.

Evidence:

- localized files:
  - `/images/graduation/cases/case-015-minamisanriku-311-memorial.jpg`
  - `/images/graduation/cases/case-021-toyama-kirari.jpg`
  - `/images/graduation/cases/case-043-roadside-station-mashiko.jpg`
- Open Design install source: `https://github.com/nexu-io/open-design/releases/tag/open-design-v0.13.0`
- Open Design smoke-test project: `codex-smoke-test-2026-07-04`
- Open Design smoke-test preview: `http://127.0.0.1:7456/api/projects/codex-smoke-test-2026-07-04/raw/index.html`

Validation:

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: local image files are readable with `sips`.
- Passed after this log entry: Open Design CLI and MCP wrapper checks.
- Passed after this log entry: Open Design smoke-test project/artifact creation.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin desktop/mobile checks for `CASE-015`, `CASE-021`, and `CASE-043`.
- Passed after this log entry: Browser plugin return interaction from `CASE-015` detail page to `/zh/graduation/cases`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `content/cases.csv`
- `content/graduation_image_manifest.json`
- generated graduation case data after rebuild
- the 3 new localized image files under `public/images/graduation/cases/`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry
- Open Design integration rollback is separate: remove Codex MCP `open-design`, delete `/Users/liquanxing/.local/bin/open-design-mcp`, and delete the smoke-test Open Design project if unwanted.

Next recommended step: write a small reference-led design brief for the graduation submenu, then use Open Design to produce one restrained archive-style design artifact before touching the live site UI.

## 2026-07-04 - Simulation 37: Slow Retry Localized Commons Covers

Status: in progress.

Persona: a student opening case details from the case list, expecting cover images to load quickly without losing source/license trust signals.

Goal: verify that the second localization batch improves runtime reliability while avoiding broken local paths after upstream rate limiting.

Actual path:

1. Paused Open Design usage and continued website/data work.
2. Updated the localization script with ID targeting, request delay, retry, and stop-on-429 behavior.
3. Ran a dry-run against `CASE-022` and `CASE-023`.
4. Localized and optimized `CASE-022`, `CASE-023`, `CASE-028`, `CASE-029`, `CASE-031`, `CASE-034`, `CASE-036`, `CASE-040`, `CASE-041`, and `CASE-042`.
5. Stopped safely when `CASE-044` returned upstream `429`.
6. Rebuilt generated graduation data.

User-view findings to verify:

1. Newly localized case pages should use `/images/graduation/cases/...jpg` paths.
2. `CASE-044` and the remaining retry queue should still use remote URLs instead of broken local paths.
3. Source/license/credit metadata should remain visible.
4. Case detail pages should remain usable on desktop and mobile.

Evidence:

- new local image count after rebuild: 45
- remaining remote image count after rebuild: 16
- remaining retry queue: `CASE-044`, `CASE-045`, `CASE-046`, `CASE-047`, `CASE-050`, `CASE-051`, `CASE-052`, `CASE-053`, `CASE-054`, `CASE-055`, `CASE-058`, `CASE-060`, `CASE-061`, `CASE-071`, `CASE-074`, `CASE-081`

Validation:

- Passed before this log entry was finalized: `node --check scripts/localize-graduation-case-images.mjs`.
- Passed before this log entry was finalized: dry-run for targeted slow retry.
- Passed before this log entry was finalized: optimization and data rebuild.
- Passed after this log entry: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: Browser plugin checks for `CASE-022`, `CASE-041`, and `CASE-044`.
- Passed after this log entry: `CASE-022` and `CASE-041` use local image URLs and keep source/license metadata.
- Passed after this log entry: `CASE-044` still uses remote proxy rather than a broken local path, but remains remote-dependent.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `scripts/localize-graduation-case-images.mjs`
- `content/cases.csv`
- generated graduation case data after rebuild
- the 10 new localized image files under `public/images/graduation/cases/`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/GRADUATION_PLACEHOLDER_PRIORITY.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: leave the remaining 16 remote images for a later slow retry window, starting with only `CASE-044` and `CASE-045`.

## 2026-07-05 - Simulation 38: Retry Queue Is Visible In Audit

Status: in progress.

Persona: a future maintainer opening the project after a chat switch and needing to know whether the image queue is blocked, reduced, or safe to retry.

Goal: make the current image state visible from the normal audit command instead of relying on memory or manual Node snippets.

Actual path:

1. Kept Open Design paused.
2. Retried `CASE-044` and `CASE-045` with the slow retry workflow.
3. Stopped after `CASE-044` returned upstream `429`; `CASE-045` was not attempted.
4. Upgraded `scripts/audit-graduation-content.mjs` to report local images, remote images, placeholders, manifest count, missing local files, and the retry queue.
5. Regenerated `docs/GRADUATION_CONTENT_QA.md`.

User-view findings to verify:

1. The website data should remain at 45 local images, 16 remote images, and 39 placeholders.
2. `CASE-044` should not be changed to a broken local path.
3. A future maintainer should be able to run `npm run graduation:audit` and see the retry queue directly.

Evidence:

- `CASE-044` retry result: upstream `429`
- audit report path: `docs/GRADUATION_CONTENT_QA.md`
- remaining retry queue is listed in the audit report.

Validation:

- Passed before this log entry was finalized: `node --check scripts/localize-graduation-case-images.mjs`.
- Passed before this log entry was finalized: `node --check scripts/audit-graduation-content.mjs`.
- Passed before this log entry was finalized: `npm run graduation:audit`.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `scripts/audit-graduation-content.mjs`
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/GRADUATION_IMAGE_REVIEW.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: stop Wikimedia retries for now and continue non-network QA until the rate limit cools down.

## 2026-07-05 - Simulation 39: Published Cases Should Not Look Unfinished

Status: in progress.

Persona: a student browsing only the strongest case records and expecting published cases to have real images and visible attribution.

Goal: remove generic-placeholder records from the published set without reducing the number of published cases.

Actual path:

1. Extended the audit report with a `Published Readiness` section.
2. Found 4 published cases still used placeholders and lacked image metadata.
3. Demoted those 4 records to draft.
4. Promoted 4 source-safe, locally imaged draft records to published.
5. Rebuilt generated graduation data and reran the audit.

User-view findings to verify:

1. The published case set should still contain 39 cases.
2. Published cases should now have 0 placeholder images.
3. Published cases should now have 0 missing image source/license/credit records.
4. The demoted high-profile cases remain in the database and can be restored later after exact reusable images are found.

Evidence:

- demoted: `CASE-001`, `CASE-003`, `CASE-004`, `CASE-006`
- promoted: `CASE-027`, `CASE-033`, `CASE-035`, `CASE-038`
- audit report path: `docs/GRADUATION_CONTENT_QA.md`

Validation:

- Passed before this log entry was finalized: `node --check scripts/audit-graduation-content.mjs`.
- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: `npm run graduation:audit`.
- Passed before this log entry was finalized: generated JSON status spot check.
- Passed after this log entry: `npm run typecheck`.
- Passed after this log entry: `npm run lint`.
- Passed after this log entry: `npm run test:unit`.
- Passed after this log entry: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `scripts/audit-graduation-content.mjs`
- `content/cases.csv`
- generated graduation case data after rebuild
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: check published issues that reference the demoted cases and decide whether their related-case lists need source-safe replacements.

## 2026-07-05 - Simulation 40: Published Issue Pages Should Not Expose Draft Cases

Status: passed.

Persona: a student opens a published social issue page, expects the related cases to be useful immediately, and does not understand why an unfinished placeholder case would appear.

Goal: make every published issue page show at least one public-ready related case, while keeping draft records available in the source database for later improvement.

Actual path:

1. Audited published issues against case publish status.
2. Found 6 published issues that would have no published related cases if draft cases were filtered out.
3. Promoted 6 source-safe, locally imaged, frequently referenced cases to `published`.
4. Replaced `ISSUE-001` and `ISSUE-013` with published related-case examples.
5. Updated the frontend so related-case cards and exported inspiration bundles only include `published` cases.
6. Rebuilt generated data and reran the audit.

User-view findings:

1. Published issue pages no longer need to show draft case cards to feel complete.
2. Random inspiration and exported bundles now avoid draft case records.
3. The site still preserves draft case references in the CSV for future content improvement.

Evidence:

- promoted: `CASE-009`, `CASE-012`, `CASE-014`, `CASE-017`, `CASE-019`, `CASE-020`
- updated issues: `ISSUE-001`, `ISSUE-013`
- audit report path: `docs/GRADUATION_CONTENT_QA.md`
- current audit result: 30/30 published issues have at least one published related case.

Validation:

- Passed before this log entry was finalized: `node --check scripts/audit-graduation-content.mjs`.
- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: `npm run graduation:audit`.
- Passed before this log entry was finalized: relationship spot check.
- Passed before this log entry was finalized: `npm run typecheck`.
- Passed before this log entry was finalized: `npm run lint`.
- Passed before this log entry was finalized: `npm run test:unit`.
- Passed before this log entry was finalized: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `scripts/audit-graduation-content.mjs`
- `src/components/GraduationInspirationApp.tsx`
- `content/cases.csv`
- `content/issues.csv`
- generated graduation issue/case data after rebuild
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: continue relationship cleanup for the remaining 13 published issues that still retain draft-case references in source data.

## 2026-07-05 - Simulation 41: Published Issue Relations Should Be Fully Public-Ready

Status: passed.

Persona: a student browsing the first 30 published issue pages and expecting every related case link to open a finished-looking record with a usable image and attribution.

Goal: remove all draft-case references from currently published issues.

Actual path:

1. Used the new audit section to identify the remaining published issues with draft-case references.
2. Replaced draft references with existing published cases that already have source-backed images and metadata.
3. Updated relation notes so the reason for each replacement remains visible to the student.
4. Rebuilt generated graduation data and reran the audit.

User-view findings:

1. Published issue pages now only point to published cases.
2. Every published issue still has at least one related case, and most keep multiple examples.
3. The browsing flow is less likely to feel unfinished or internally inconsistent.

Evidence:

- updated issues: `ISSUE-002`, `ISSUE-003`, `ISSUE-006`, `ISSUE-015`, `ISSUE-017`, `ISSUE-018`, `ISSUE-019`, `ISSUE-021`, `ISSUE-022`, `ISSUE-023`, `ISSUE-027`, `ISSUE-028`, `ISSUE-030`
- audit report path: `docs/GRADUATION_CONTENT_QA.md`
- current audit result: 30/30 published issues have published related cases and 0 published issues reference draft cases.

Validation:

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: `node --check scripts/audit-graduation-content.mjs`.
- Passed before this log entry was finalized: `npm run graduation:audit`.
- Passed before this log entry was finalized: relationship spot check.
- Passed before this log entry was finalized: `npm run typecheck`.
- Passed before this log entry was finalized: `npm run lint`.
- Passed before this log entry was finalized: `npm run test:unit`.
- Passed before this log entry was finalized: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `content/issues.csv`
- generated graduation issue data after rebuild
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: wait before retrying Wikimedia image localization, or continue a source-quality pass on the 55 draft cases.

## 2026-07-05 - Simulation 42: The Archive Graph Should Not Have Orphan Cases

Status: passed.

Persona: a maintainer using the archive as a connected inspiration graph, expecting every case to be reachable from at least one issue.

Goal: remove the last unreferenced case without exposing unfinished content on published pages.

Actual path:

1. Ran the audit after published relation cleanup.
2. Found `CASE-026` was no longer referenced by any issue.
3. Attached `CASE-026` to draft issue `ISSUE-093`, where employment-support space is relevant to training and economic self-reliance.
4. Rebuilt generated data and reran validation.

User-view findings:

1. Published issue pages remain clean because `ISSUE-093` is draft.
2. The content graph is complete again: no orphan cases.
3. `CASE-026` can still be improved later with a reusable image before publication.

Evidence:

- reattached case: `CASE-026`
- receiving issue: `ISSUE-093`
- audit report path: `docs/GRADUATION_CONTENT_QA.md`
- current audit result: 0 unreferenced cases and 0 published issue draft-case references.

Validation:

- Passed before this log entry was finalized: `npm run graduation:data`.
- Passed before this log entry was finalized: `node --check scripts/audit-graduation-content.mjs`.
- Passed before this log entry was finalized: `npm run graduation:audit`.
- Passed before this log entry was finalized: spot check confirmed `ISSUE-093` references `CASE-026`.
- Passed before this log entry was finalized: `npm run typecheck`.
- Passed before this log entry was finalized: `npm run lint`.
- Passed before this log entry was finalized: `npm run test:unit`.
- Passed before this log entry was finalized: `npx playwright test` with 12/12 tests passing.

Rollback scope:

- `content/issues.csv`
- generated graduation issue data after rebuild
- `docs/GRADUATION_CONTENT_QA.md`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: continue with draft-case source quality or wait before retrying Wikimedia image localization.

## 2026-07-05 - Simulation 43: A Student Tries To Enter The Full Case Library

Status: passed after fixes.

Persona: a graduation-design student entering from the top navigation, expecting `卒業設計アイデア` / 毕设灵感 to behave like a real archive section rather than a dead preview page.

Goal: go from the graduation home page to all cases, filter by a main tag, and avoid seeing unfinished missing-image cards.

Actual path:

1. Opened the graduation home page.
2. Looked for the case library without clicking one of the three preview cases first.
3. Clicked a main tag and expected it to filter, not act like decorative text.
4. Opened the case library directly.
5. Checked the Japanese graduation URL because it previously mixed Japanese UI with Chinese content.

User-view findings:

1. The home page now has direct entry points for issue library, site library, case library, random inspiration, and teacher brief.
2. Main tags now link to filtered issue pages, for example `/zh/graduation/issues?tag=老龄化`.
3. Case library is directly reachable and exposes 45 public-ready case detail links.
4. Missing-image and draft cases are not shown as public cards.
5. JA/EN graduation paths now redirect to the Chinese graduation module until real translations are made, so users do not see a mixed-language page.
6. A hydration mismatch caused by locale-dependent tag sorting was found during local QA and fixed with deterministic sorting.

Evidence:

- production alias: `https://archistory.app`
- final deployment id: `dpl_EWCMgwRFE32ZtaijMgneRM9xYVzD`
- production browser check: `/zh/graduation/cases` heading `案例库`, 45 case links, 0 placeholder images, 0 console warnings/errors
- production redirect check: `/ja/graduation` returns `307` to `/zh/graduation/`
- production home check: `看案例库`, `查看全部案例`, and clickable tag links are present

Validation:

- Passed before final deploy: `npm run typecheck`.
- Passed before final deploy: `npm run lint`.
- Passed before final deploy: `npm run build`.
- Passed before final deploy: `npm run test:e2e -- tests/e2e/graduation-case-render.spec.ts`.
- Passed after deploy: production Playwright smoke check on `/zh/graduation/cases`.
- Passed after deploy: production curl checks for graduation redirects and clickable home links.

Rollback scope:

- `src/components/GraduationInspirationApp.tsx`
- `src/app/[lang]/graduation/[[...slug]]/page.tsx`
- `src/lib/graduation.ts`
- `src/lib/i18n.ts`
- `next.config.ts`
- `tests/e2e/graduation-case-render.spec.ts`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: run the global UI/UX unification pass using the current home page interaction style as the reference.

## 2026-07-05 - Simulation 44: A Student Browses Cases After The Visual Cleanup

Status: passed.

Persona: a student who likes the current Archistory home page because it feels like an archive: line-separated, image-led, calm, and responsive on hover.

Goal: enter the graduation case library and feel that it belongs to the same site instead of a separate card-heavy tool.

Actual path:

1. Opened `/zh/graduation/cases` locally and on production.
2. Checked that the subnav reads as lightweight section tabs rather than a row of boxed buttons.
3. Checked that cases are line-divided rows with constrained image frames.
4. Clicked the home page `老龄化` tag and verified the filtered issue page.
5. Checked the case library on a 390px mobile viewport.

User-view findings:

1. Graduation case, issue, and site entries now use line dividers and hover feedback instead of raised card boxes.
2. The case images use the same `image-frame` and `image-zoom` pattern as the home page.
3. The graduation subnav is now text tabs with an active underline, reducing the number of visible boxes.
4. Mobile layout has no horizontal overflow and keeps case rows inside the viewport.
5. The first visible case image is eager-loaded to avoid the local LCP warning.

Evidence:

- production alias: `https://archistory.app`
- final deployment id: `dpl_BP4zpUs9aKsEMaPntZA3VKY2XQdL`
- production check: `/zh/graduation/cases` heading `案例库`, 45 case links, 0 placeholder images, no console warnings/errors, no horizontal overflow
- local mobile check: 390px viewport, 0 placeholder images, no horizontal overflow
- tag interaction check: `/zh/graduation/issues?tag=老龄化` showed `当前 1 · 公开内容`

Validation:

- Passed before final deploy: `npm run typecheck`.
- Passed before final deploy: `npm run lint`.
- Passed before final deploy: `npm run build`.
- Passed before final deploy: `npm run test:e2e -- tests/e2e/graduation-case-render.spec.ts`.
- Passed after deploy: production Playwright smoke check on `/zh/graduation/cases`.
- Passed after deploy: production redirect check for `/ja/graduation`.

Rollback scope:

- `src/components/GraduationInspirationApp.tsx`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: apply the same line-based system to browse/category pages, then handle timeline/map/card-heavy pages.

## 2026-07-05 - Simulation 45: A Reader Moves From Archive Index To Timeline

Status: passed locally.

Persona: a reader who liked the Archistory home page because it feels like a calm archive, not a dashboard made of boxed cards.

Goal: open the building archive, switch the archive grouping, open the architect archive, then check the timeline on mobile without feeling trapped in nested cards.

Actual path:

1. Opened `/ja/browse/buildings`.
2. Checked the top featured works area and switched the grouping tab from `国` to `用途`.
3. Opened `/ja/browse/architects`.
4. Checked that the architect hero image is visible instead of looking like a missing-image block.
5. Opened `/ja/timeline` at a 390px mobile viewport.

User-view findings:

1. Building archive now reads as a large image-led entry plus line-divided related works, closer to the home page.
2. Architect archive now uses the same structure and no longer presents the top section as a grid of raised cards.
3. The grouping controls now behave like underline tabs instead of a pill-shaped control island.
4. Architect portraits are safer in the hero slot because the large portrait uses `object-contain` instead of aggressive cropping.
5. Timeline mobile now starts with metrics and open bordered period sections rather than stacked shadowed cards.

Evidence:

- production alias: `https://archistory.app`
- final deployment id: `dpl_EaPZ6QeyBn4Txur3fX6VbAPVuzmF`
- production smoke check:
  - `/ja/browse/buildings` active grouping changed from `国` to `用途`
  - `/ja/browse/architects` hero image natural width 1400
  - `/ja/timeline` mobile viewport had no horizontal overflow
  - console warnings/errors: 0
- local URL: `http://127.0.0.1:3017`
- Browser plugin screenshots were captured for `/ja/browse/buildings`, `/ja/browse/architects`, and `/ja/timeline`.
- Playwright fallback screenshots saved outside the repo:
  - `/tmp/archistory-ui-buildings-final.png`
  - `/tmp/archistory-ui-architects-final.png`
  - `/tmp/archistory-ui-timeline-mobile-final.png`
- interaction proof: active grouping changed from `国` to `用途`.
- no horizontal overflow on desktop archive pages or 390px timeline viewport.
- no console warnings/errors.

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Browser plugin page-load checks passed, but final click validation timed out due Browser runtime instability.
- Playwright fallback interaction and mobile checks passed.

Rollback scope:

- `src/components/BuildingExplorer.tsx`
- `src/components/ArchitectExplorer.tsx`
- `src/components/ArchitectCard.tsx`
- `src/components/TimelineRail.tsx`
- `src/app/[lang]/timeline/page.tsx`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: continue the line-based UI cleanup on `map`, `paths`, and `code` surfaces, then deploy the full UI pass once production smoke checks are clean.

## 2026-07-05 - Simulation 46: Japanese Classmate Opens Graduation Module

Status: passed locally and on production.

Persona: a Japanese architecture/interior design classmate who opens Archistory from the Japanese navigation and expects the graduation idea section to be readable in Japanese.

Goal: open the graduation module, browse issues directly, click a main tag, open a detail page, open cases directly, and read the assignment brief without being forced into Chinese.

Actual path:

1. Opened `/ja/graduation`.
2. Opened `/ja/graduation/issues`.
3. Clicked the visible `高齢化` tag from the Japanese home page.
4. Opened `/ja/graduation/issues/ISSUE-001`.
5. Opened `/ja/graduation/cases`.
6. Opened `/ja/graduation/brief` on desktop and mobile.

User-view findings:

1. The Japanese route no longer redirects to `/zh/graduation`.
2. The main navigation, CTA, tags, issue cards, case cards, detail page, and brief content are readable in Japanese.
3. Main tags now behave as filters instead of static decoration.
4. The cases list is directly reachable and exposes 45 direct case-detail links.
5. Mobile `/ja/graduation/brief` has no horizontal overflow at 390px width.

Evidence:

- production alias: `https://archistory.app`
- final deployment id: `dpl_96LwXauLnTzZo5fEbqdFyiG5QqYS`
- production smoke check:
  - `/ja/graduation`, `/ja/graduation/issues`, `/ja/graduation/issues/ISSUE-001`, `/ja/graduation/cases`, `/ja/graduation/brief` returned 200
  - no redirect to `/zh`
  - targeted Chinese-residue hits: 0
  - tag click produced `/ja/graduation/issues?tag=...`
  - case links count: 45
  - mobile brief overflow: false
  - console warnings/errors: 0
- screenshots saved outside the repo:
  - `/tmp/archistory-prod-ja-graduation.png`
  - `/tmp/archistory-prod-ja-graduation-mobile-brief.png`

Validation:

- Passed: `node scripts/build-graduation-data.mjs --from-json`.
- Passed: `node scripts/build-graduation-data.mjs`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed: local Playwright smoke check.
- Passed: production Playwright smoke check.

Rollback scope:

- `next.config.ts`
- `src/app/[lang]/graduation/[[...slug]]/page.tsx`
- `src/lib/graduation.ts`
- `src/components/GraduationInspirationApp.tsx`
- `scripts/build-graduation-data.mjs`
- `schemas/issue.schema.json`
- `schemas/site_type.schema.json`
- `schemas/case.schema.json`
- graduation content JSON/CSV/public data touched in this pass
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: polish the first 20 Japanese issue/case texts by hand, then resume the global UI unification pass on `map`, `paths`, and `code`.

## 2026-07-05 - Simulation 47: Reader Uses Map, Routes, and Code After UI Cleanup

Status: passed locally and on production.

Persona: a Japanese reader who liked the home page's calm line-based archive style and dislikes pages that feel like many boxed cards stacked together.

Goal: open the map, open archive routes, click into one route, and read a code topic without feeling that every section is a separate raised card.

Actual path:

1. Opened `/ja/map`.
2. Checked the country and city archive entries.
3. Opened `/ja/paths`.
4. Clicked `/ja/paths/corbusier-to-japanese-modernism`.
5. Opened `/ja/code/zoning-districts`.
6. Repeated the same three primary pages at 390px mobile width.

User-view findings:

1. Map entries now behave like line-divided archive rows instead of raised card blocks.
2. Map images now use the same contained hover zoom pattern as the home/archive surfaces.
3. Archive route overview now reads as three strong route entries, not three floating cards.
4. Route detail steps now form one continuous reading path.
5. Code topic support blocks now feel more like article sections and less like a grid of small cards.

Evidence:

- production alias: `https://archistory.app`
- final deployment id: `dpl_Fsq9eBCo2a2zRQ4rNKeHGBuJxBEm`
- production desktop smoke check:
  - `/ja/map`: h1 `建築地図`, `shadowCards=0`, `cardLikeBlocks=0`, no horizontal overflow
  - `/ja/paths`: h1 `資料ルート`, `shadowCards=0`, `cardLikeBlocks=0`, no horizontal overflow
  - `/ja/code/zoning-districts`: h1 `用途地域`, `shadowCards=0`, `cardLikeBlocks=0`, no horizontal overflow
  - route click landed on `/ja/paths/corbusier-to-japanese-modernism`
  - console warnings/errors: 0
- production mobile 390px smoke check:
  - `/ja/map`, `/ja/paths`, `/ja/code/zoning-districts` all had no horizontal overflow and `shadowCards=0`
- Browser plugin validation screenshot was emitted for `/ja/paths/corbusier-to-japanese-modernism`.

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed: Browser plugin desktop validation.
- Passed: Browser plugin mobile viewport validation.
- Passed: production Playwright desktop validation.
- Passed: production Playwright mobile validation.

Rollback scope:

- `src/app/[lang]/map/page.tsx`
- `src/app/[lang]/paths/page.tsx`
- `src/app/[lang]/paths/[slug]/page.tsx`
- `src/app/[lang]/code/[slug]/page.tsx`
- `src/components/VerificationBlock.tsx`
- `src/components/CodeTopicDiagrams.tsx`
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: continue the same line-based cleanup on architect detail, building detail, era detail, and mobile navigation/dropdown surfaces.

## 2026-07-05 - Simulation 48: Japanese Student Opens a Graduation Issue

Status: passed locally and on production.

Persona: a Japanese architecture student looking for a graduation design direction, entering from a social issue detail page and expecting enough material to continue research without hunting through hidden paths.

Goal: open `独居高齢者とコミュニティの断絶`, understand the issue, see what to research next, and jump directly to all available cases.

Actual path:

1. Opened `/ja/graduation/issues/ISSUE-001`.
2. Read the hero title and summary.
3. Checked the right-side detail counts.
4. Read recommended uses and sources.
5. Read the new `資料メモ`.
6. Scanned related sites and related cases.
7. Clicked `事例` from the local graduation navigation.
8. Repeated the issue detail page on 390px mobile width.

User-view findings:

1. The previous large empty right-side desktop area is now used for meaningful counts: recommended sites, related cases, and sources.
2. The detail page feels less thin because it now includes source labels and a `資料メモ` section explaining how to read the issue, site, and cases.
3. ISSUE-001 now shows 6 related case links, giving the reader enough material to continue browsing from the detail page.
4. The cases index is reachable directly from the issue detail navigation and shows 45 case entries.
5. The visible Japanese page no longer shows the checked Chinese residue terms.
6. Mobile layout stacks the same information without horizontal overflow.

Evidence:

- production alias: `https://archistory.app`
- production deployment: `https://architect-history-next-9fbwvgg1k-yrqx-95s-projects.vercel.app`
- production desktop smoke check:
  - `/ja/graduation/issues/ISSUE-001`: h1 `独居高齢者とコミュニティの断絶`
  - `caseLinkCount=6`
  - header meta present
  - archive notes present
  - visible Chinese residue check: false
  - horizontal overflow: false
  - console warnings/errors: 0
  - clicked `事例` and reached `/ja/graduation/cases`
  - `/ja/graduation/cases`: `caseRows=45`
- production mobile 390px smoke check:
  - `caseLinkCount=6`
  - header meta present
  - archive notes present
  - visible Chinese residue check: false
  - horizontal overflow: false
  - console warnings/errors: 0

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed: local browser desktop validation.
- Passed: local browser mobile validation.
- Passed: production Playwright desktop validation.
- Passed: production Playwright mobile validation.
- Passed: Vercel production deployment.

Rollback scope:

- `src/components/GraduationInspirationApp.tsx`
- `src/content/graduation/issues.json`
- `src/content/graduation/cases.json`
- `src/content/graduation/site-types.json`
- graduation content CSV/public data regenerated in this pass
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: hand-polish the first 20 Japanese issue-to-case relation notes, then continue the global line-based UI cleanup on architect detail, building detail, era detail, and mobile navigation surfaces.

## 2026-07-05 - Simulation 49: Reader Scans Related Cases on ISSUE-002

Status: passed locally and on production.

Persona: a Japanese architecture student reading the `空き家再生と地域創生` issue page and trying to compare reference cases quickly without fighting the layout.

Goal: scroll to related cases, read case images and text comfortably, click one case, and confirm the last related case does not leave a large empty area.

Actual path:

1. Opened `/ja/graduation/issues/ISSUE-002`.
2. Scrolled to `関連事例`.
3. Compared `3331 Arts Chiyoda`, `Shiroiya Hotel`, `Inujima Seirensho Art Museum`, and `Kamikatsu Zero Waste Center`.
4. Checked the last related case row near the page bottom.
5. Clicked `3331 Arts Chiyoda`.
6. Repeated the related case section at 390px mobile width.

User-view findings:

1. Related cases now read as full-width archive rows instead of narrow three-column cards.
2. The image, main text, and metadata have clearer roles: image on the left, explanation in the middle, year/location on the right.
3. The final related case now spans the full content width, removing the previous awkward right-side blank area.
4. On mobile, case rows stack vertically and keep the image large enough to inspect.
5. The visible `离島` residue on the Inujima case was corrected to `離島`.

Evidence:

- production alias: `https://archistory.app`
- production deployment: `https://architect-history-next-m0aru3ofq-yrqx-95s-projects.vercel.app`
- production deployment id: `dpl_AHUByroXuoPbWXmhFgrfBpFTGLzy`
- production desktop smoke check:
  - `/ja/graduation/issues/ISSUE-002`: h1 `空き家再生と地域創生`
  - `relatedCaseRows=4`
  - row widths: `1184, 1184, 1184, 1184`
  - last row width: `1184`
  - no horizontal overflow
  - visible residue check for `离島|足汤|資料館|餐厅|多代交流`: false
  - clicked `CASE-005` and reached `/ja/graduation/cases/CASE-005`
  - console warnings/errors: 0
- production mobile 390px smoke check:
  - `relatedCaseRows=4`
  - row widths: `342, 342, 342, 342`
  - no horizontal overflow
  - visible residue check: false

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed: local Browser desktop validation.
- Passed: local Browser mobile validation.
- Passed: local Browser interaction validation.
- Passed: production Playwright desktop validation.
- Passed: production Playwright mobile validation.
- Passed: Vercel production deployment.

Notes:

- Browser plugin validation worked locally. Production Browser validation timed out twice while loading the production page, so production QA used the project Playwright runtime instead.

Rollback scope:

- `src/components/GraduationInspirationApp.tsx`
- `src/content/graduation/issues.json`
- `src/content/graduation/cases.json`
- `src/content/graduation/site-types.json`
- regenerated graduation CSV/public data
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: run a broader Japanese content QA pass for the first 20 published issues and their visible related cases, then continue removing detail-page layouts that still create awkward empty columns.

## 2026-07-05 - Simulation 50: Japanese Student Reads the First 20 Issue Set

Status: passed locally and on production.

Persona: a Japanese architecture student who opens the graduation inspiration section to find a thesis topic, then checks whether the issue page has enough Japanese explanation and enough reference cases to continue research.

Goal: open several Japanese issue detail pages, scan the summary and archive notes, compare related cases, click into a case, and confirm the layout does not create awkward empty right-side space.

Actual path:

1. Opened `/ja/graduation/issues/ISSUE-002`.
2. Read the issue title, summary, source block, archive notes, site types, and related cases.
3. Checked that related cases fill a full archive list rather than ending after a sparse last row.
4. Opened sample issue pages `/ISSUE-001`, `/ISSUE-017`, `/ISSUE-018`, and `/ISSUE-020`.
5. Repeated `/ISSUE-017` at 390px mobile width.
6. Clicked `3331 Arts Chiyoda` from `/ISSUE-002` and landed on the case detail page.

User-view findings:

1. The first 20 Japanese issue pages now read more like edited Japanese content instead of mixed Chinese/Japanese placeholders.
2. Each sampled issue page shows 8 related case rows, so the page feels more like an archive than a thin card list.
3. The revised related-case row gives the text enough width; the screenshot problem where text was squeezed beside an empty area is no longer present.
4. Mobile width stacks cleanly without horizontal scrolling.
5. Clicking from an issue to a related case works and keeps the user inside the graduation archive.

Evidence:

- local URL: `http://127.0.0.1:3029`
- sampled issue pages:
  - `/ja/graduation/issues/ISSUE-001`: 8 case rows, residue hits 0, no horizontal overflow
  - `/ja/graduation/issues/ISSUE-002`: 8 case rows, residue hits 0, no horizontal overflow
  - `/ja/graduation/issues/ISSUE-017`: 8 case rows, residue hits 0, no horizontal overflow
  - `/ja/graduation/issues/ISSUE-018`: 8 case rows, residue hits 0, no horizontal overflow
  - `/ja/graduation/issues/ISSUE-020`: 8 case rows, residue hits 0, no horizontal overflow
- mobile 390px:
  - `/ja/graduation/issues/ISSUE-017`: no horizontal overflow
- interaction proof:
  - clicked `CASE-005`
  - reached `/ja/graduation/cases/CASE-005`
  - title visible: `3331 Arts Chiyoda`
  - source and related issue sections visible
- console warnings/errors during Browser QA: 0
- production alias: `https://archistory.app`
- production deployment: `https://architect-history-next-lf9fu6ciu-yrqx-95s-projects.vercel.app`
- production deployment id: `dpl_7WRafWoCrf5Nvc1xEqUwK6BrDC7e`
- production desktop:
  - `/ja/graduation/issues/ISSUE-002`: 8 case rows, row widths `1178`, residue hits 0, no horizontal overflow
  - updated concepts visible: `旧学校の教室や廊下`, `旧精錬所の遺構`
- production mobile 390px:
  - `/ja/graduation/issues/ISSUE-017`: 8 case rows, no horizontal overflow
- production interaction:
  - clicked visible `CASE-005` row after scrolling
  - reached `/ja/graduation/cases/CASE-005`
  - title visible: `3331 Arts Chiyoda`
  - source and related issue sections visible

Validation:

- Passed Japanese `_ja` field residue audit with failure count `0`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed local Browser desktop validation.
- Passed local Browser mobile validation.
- Passed local Browser interaction validation.
- Passed Vercel production deployment.
- Passed production Browser desktop validation.
- Passed production Browser mobile validation.
- Passed production Browser interaction validation.

Remaining risk:

- The first 20 direct relation notes are improved, but fallback case notes remain generic.
- `ISSUE-021` onward still need the same level of Japanese editorial pass.
- Some fallback related cases may be broadly useful rather than perfectly matched; this is acceptable for density now, but should be refined later.

Rollback scope:

- `src/components/GraduationInspirationApp.tsx`
- `src/content/graduation/issues.json`
- `src/content/graduation/cases.json`
- `src/content/graduation/site-types.json`
- `src/content/graduation/brief.json`
- regenerated graduation CSV/public data
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: continue the same Japanese editorial pass for `ISSUE-021` through `ISSUE-040`, then replace generic fallback relation notes with tighter hand-written notes for the most visible supplemental cases.

## 2026-07-05 - Simulation 51: Japanese Student Finds More Issues and Cases

Status: passed locally and on production.

Persona: a Japanese architecture student who felt the graduation inspiration section was too small and wants to browse more thesis directions and more real reference cases without seeing mixed Chinese/Japanese text.

Goal: confirm that the next issue batch is visible, Japanese text is readable, related case rows are populated, and newly public cases can be opened from both the issue page and the case archive.

Actual path:

1. Opened `/ja/graduation/issues/ISSUE-021`.
2. Opened `/ja/graduation/issues/ISSUE-029`.
3. Opened `/ja/graduation/issues/ISSUE-040`.
4. Opened `/ja/graduation/issues/ISSUE-040` at 390px mobile width.
5. Opened newly public case details:
   - `/ja/graduation/cases/CASE-098`
   - `/ja/graduation/cases/CASE-039`
   - `/ja/graduation/cases/CASE-056`
6. Opened `/ja/graduation/cases` and checked whether newly public cases appear in the archive.
7. Clicked `Helsinki Central Library Oodi` from `/ja/graduation/issues/ISSUE-029`.

User-view findings:

1. `ISSUE-031` through `ISSUE-040` are no longer draft-only; the graduation archive now has 40 visible issue directions.
2. Sampled issue pages show 8 related case rows and no Not Found state.
3. The newly visible case archive feels denser: Oodi, MIKAN SHIMOKITA, Tainan Spring, and other image-backed cases now appear.
4. New case detail pages have at least one image and visible source information.
5. The Japanese text on sampled pages no longer exposes the checked Chinese residue terms.
6. Mobile reading on `ISSUE-040` keeps the archive-row layout without horizontal scrolling.

Evidence:

- local URL: `http://127.0.0.1:3030`
- data counts:
  - published issues: `40`
  - visible public cases: `61`
  - newly public image-backed cases in this pass: `16`
- sampled issue pages:
  - `/ja/graduation/issues/ISSUE-021`: 8 case rows, no Not Found, no horizontal overflow, residue hits 0
  - `/ja/graduation/issues/ISSUE-029`: 8 case rows, no Not Found, no horizontal overflow, residue hits 0
  - `/ja/graduation/issues/ISSUE-040`: 8 case rows, no Not Found, no horizontal overflow, residue hits 0
- mobile 390px:
  - `/ja/graduation/issues/ISSUE-040`: 8 case rows, no horizontal overflow
- sampled case detail pages:
  - `/ja/graduation/cases/CASE-098`: title `Helsinki Central Library Oodi`, image count 1, source visible
  - `/ja/graduation/cases/CASE-039`: title `MIKAN SHIMOKITA`, image count 1, source visible
  - `/ja/graduation/cases/CASE-056`: title `Tainan Spring`, image count 1, source visible
- case archive:
  - `/ja/graduation/cases`: 61 visible rows
  - visible names include `Helsinki Central Library Oodi`, `MIKAN SHIMOKITA`, and `Tainan Spring`
- interaction proof:
  - clicked `CASE-098` from `/ja/graduation/issues/ISSUE-029`
  - reached `/ja/graduation/cases/CASE-098`
  - title visible: `Helsinki Central Library Oodi`
  - source visible
- console warnings/errors during sampled Browser QA: 0
- production alias: `https://archistory.app`
- production deployment: `https://architect-history-next-q1gm1vexi-yrqx-95s-projects.vercel.app`
- production deployment id: `dpl_AkQD3z8TQ9HsoWuo34JCpXv59dbe`
- production sampled issue pages:
  - `/ja/graduation/issues/ISSUE-021`: 8 case rows, no Not Found, no horizontal overflow, residue hits 0, image count 8
  - `/ja/graduation/issues/ISSUE-040`: 8 case rows, no Not Found, no horizontal overflow, residue hits 0, image count 8
- production mobile 390px:
  - `/ja/graduation/issues/ISSUE-040`: 8 case rows, no horizontal overflow
- production case detail:
  - `/ja/graduation/cases/CASE-098`: title `Helsinki Central Library Oodi`, source visible, image count 1
- production case archive:
  - `/ja/graduation/cases`: 61 visible rows
  - visible names include `Helsinki Central Library Oodi`, `MIKAN SHIMOKITA`, and `Tainan Spring`
- production interaction:
  - clicked `CASE-098` from `/ja/graduation/issues/ISSUE-029`
  - reached `/ja/graduation/cases/CASE-098`
  - source visible
- production console warnings/errors during sampled QA: 0

Validation:

- Passed Japanese residue audit for `ISSUE-021` through `ISSUE-040` and all case `_ja` fields.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed local Browser desktop issue validation.
- Passed local Browser case detail validation.
- Passed local Browser case archive validation.
- Passed local Browser mobile validation.
- Passed local Browser interaction validation.
- Passed Vercel production deployment.
- Passed production Browser issue validation.
- Passed production Browser case detail validation.
- Passed production Browser case archive validation.
- Passed production Browser mobile validation.
- Passed production Browser interaction validation.

Remaining risk:

- The case count was increased by publishing cleaned image-backed draft cases, not by creating new `CASE-101+` records yet.
- Japanese visible fields were prioritized; some English support fields still need a later cleanup pass.
- Some related-case fallback rows are useful but broad, and should later be hand-ranked per issue.

Rollback scope:

- `src/content/graduation/issues.json`
- `src/content/graduation/cases.json`
- regenerated graduation CSV/public data
- `docs/WORKLOG.md`
- this `docs/USER_SIMULATION_LOG.md` entry

Next recommended step: add new `CASE-101+` records from verified source/image pairs, then hand-rank the top 8 related cases per issue so fallback rows feel less broad.

## Simulation - 2026-07-05 - Graduation Detailed Filter Pruning

User complaint:

- The issue filters were too numerous and messy.
- Combining values such as `アーカイブ` and `シェアオフィス空きフロア` produced `表示 0`, which made the feature feel broken.

Implemented behavior:

1. User opens `/ja/graduation/issues`.
2. Detailed filters show a reduced set:
   - tag dropdown: `49` options including `all`
   - site dropdown: `21` options including `all`
   - building program dropdown: `4` options including `all`
3. User selects tag `多文化`.
4. Site dropdown shrinks to only matching choices:
   - `コミュニティ公民館周辺 (1)`
   - `駅周辺隙間地 (1)`
   - `商店街空き店舗 (2)`
5. User selects `商店街空き店舗`.
6. The page shows `表示 2 · 公開済み` and two relevant issue cards.
7. User changes to another visible tag from the scoped state.
8. The site filter is cleared automatically and the page remains nonzero.
9. If user opens the old incompatible URL `tag=アーカイブ&siteType=SITE-019`, the page clearly shows:
   - `表示 0 · 公開済み`
   - selected option counts as `(0)`
   - empty text `見つかりません`
   - `詳細条件をクリア`

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed local Browser QA on `http://127.0.0.1:3030/ja/graduation/issues`.
- Console warnings/errors during sampled QA: 0.

Production evidence:

- Production alias: `https://archistory.app`
- Production deployment id: `dpl_DKXFK3xtsU2RA7FxiVsXAP7avbgs`
- Production detailed option counts on `/ja/graduation/issues`:
  - tag `11`
  - site `21`
  - building program `4`
- Tag dropdown now contains `10` actual tag choices plus `all`.
- Production console warnings/errors during base QA: 0.

Production evidence:

- Production alias: `https://archistory.app`
- Production deployment id: `dpl_7Bi2GSRUEE4yaqRYr1JvvxaZ7hP4`
- Production detailed option counts on `/ja/graduation/issues`:
  - tag `21`
  - site `21`
  - building program `4`
- Tag dropdown now contains `20` actual tag choices plus `all`.
- Production console warnings/errors during base QA: 0.
- Note: a follow-up Browser interaction check for `地域食` timed out twice after the production base check. Local interaction QA passed.

## Simulation - 2026-07-05 - Graduation Tag Dropdown Reduced to 10

User follow-up:

- Requested target: about 10 tags.

Implemented behavior:

1. User opens `/ja/graduation/issues`.
2. Detailed filters show:
   - tag dropdown: `11` options including `all`
   - site dropdown: `21` options including `all`
   - building program dropdown: `4` options including `all`
3. The tag dropdown now exposes `10` actual tag choices.
4. User selects `地域食`.
5. Page shows `表示 7 · 公開済み`.
6. Site dropdown narrows to matching sites only.

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed local Browser QA on `http://127.0.0.1:3030/ja/graduation/issues`.
- Console warnings/errors during sampled QA: 0.

Remaining risk:

- Direct incompatible URLs are still possible because they represent real no-intersection data. The UI now shows the state clearly and lets users clear it.
- One-off tags with count `1` are hidden from the default tag dropdown to keep the list usable.

## Simulation - 2026-07-05 - Site Candidates, Random Page Clarification, Feedback Email

User follow-up:

- The site list needs more information.
- Each site type should include concrete places such as prefecture/city/ward and building or district examples.
- After that, the random page should be made easier to understand.
- Check image resources; if public images are missing, supplement them only when copyright/source safety is clear.
- Change the feedback email to `2505168-1350042@aoyamaseizu-st.ac.jp`.

Implemented behavior:

1. User opens `/ja/graduation/sites`.
2. Each published site card shows `候補地例` with concrete candidate area/place examples.
3. User opens a site detail page.
4. Detail page shows a full `候補地例` section with source links and research angles.
5. User opens `/ja/graduation/random`.
6. The page explains that it generates a thesis direction from issue, site, and cases.
7. The random result now shows `ランダム方向`, summary metrics, and a `使い方` next-step list.
8. User opens `/ja/feedback`.
9. The feedback mail button displays and uses `2505168-1350042@aoyamaseizu-st.ac.jp`.

Validation:

- Passed: `npm run graduation:data:from-json`.
- Passed: `npm run graduation:data`.
- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Public case image check:
  - published cases `100`
  - placeholders `0`
  - missing image metadata `0`
  - missing local image files `0`
- Local Playwright QA passed for `/ja/graduation/sites`, `/ja/graduation/random`, `/ja/feedback`, and sampled case images.

Remaining risk:

- Candidate locations are real research leads with source links, not final site-survey proof.
- Some draft cases still use placeholders, but draft cases are not exposed on the public graduation case surface.

Production evidence:

- Production alias: `https://archistory.app`
- Production deployment id: `dpl_HHrACZFMZWTrMLARQWqVgtgsc7cd`
- Production detailed option counts on `/ja/graduation/issues`:
  - tag `49`
  - site `21`
  - building program `4`
- Production interaction:
  - `多文化` -> `表示 4 · 公開済み`
  - `多文化` + `SITE-002` -> `表示 2 · 公開済み`
- Production old incompatible URL:
  - `tag=アーカイブ&siteType=SITE-019` -> `表示 0 · 公開済み`
  - empty text `見つかりません`
  - clear-detail buttons visible
- Production console warnings/errors during sampled QA: 0.
- Production hydration mismatch after stable option sorting: 0.

## Simulation - 2026-07-05 - Graduation Tag Dropdown Reduced to 20

User follow-up:

- The filter no longer frequently becomes `0`.
- The tag dropdown is still too long.
- Requested target: about 20 tags.

Implemented behavior:

1. User opens `/ja/graduation/issues`.
2. Detailed filters show:
   - tag dropdown: `21` options including `all`
   - site dropdown: `21` options including `all`
   - building program dropdown: `4` options including `all`
3. The tag dropdown now exposes `20` actual tag choices instead of `48` actual choices.
4. User selects `地域食`.
5. Page shows `表示 7 · 公開済み`.
6. Site dropdown narrows to matching sites only.

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Passed local Browser QA on `http://127.0.0.1:3030/ja/graduation/issues`.
- Console warnings/errors during sampled QA: 0.

## Simulation - 2026-07-06 - Graduation UI Before/After Click Unified

User follow-up:

- The page before clicking and the page after clicking looked like different UI/UX systems.
- Requested the graduation feature to be unified across the whole section.

Implemented behavior:

1. User opens `/ja/graduation`.
2. The landing page shows the shared graduation hero: eyebrow, large title, description, action buttons, and right-side summary.
3. User opens `/ja/graduation/random`.
4. The random page uses the same shared hero structure and keeps all main actions in the hero area.
5. User opens `/ja/graduation/issues/ISSUE-001`.
6. The issue detail page uses the same shared hero structure and places metrics in the right-side summary panel.
7. Random page lower content now focuses on the generated direction and usage steps without duplicated export buttons.

Validation:

- Passed: `npm run typecheck`.
- Passed: `npm run lint`.
- Passed: `npm run build`.
- Local in-app browser QA verified matching hero classes on home, random, and issue detail.
- Mobile Playwright QA at `390x844` verified no horizontal overflow and visible random actions.
- Production QA on `https://archistory.app` verified matching hero classes on home, random, and issue detail.
- Production mobile QA at `390x844` verified no horizontal overflow and visible random actions.
- Production console warnings/errors during sampled QA: 0.
