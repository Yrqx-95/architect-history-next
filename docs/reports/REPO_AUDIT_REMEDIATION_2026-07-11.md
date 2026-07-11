# Repository Audit Remediation Tracker

Updated: 2026-07-11

This tracker maps the eight findings from the full repository audit to current verified evidence. A code diff alone is not treated as complete.

## Verified complete

1. Graduation route semantics
   - Unknown sections, unknown details, and unpublished content now terminate with Next.js `notFound()`.
   - Production E2E verifies four invalid route classes return HTTP 404.

2. Release test credibility
   - The fixed-pixel screenshot assertion was replaced with semantic visibility, image integrity, viewport containment, and element-bound checks.
   - `npm test`: 12/12 unit and 17/17 production E2E passed.

4. Unpromoted route boundary
   - `/learn` remains reachable as the intentional archive room.
   - `/map` and `/paths` remain accessible but are explicitly `noindex`; production E2E verifies the unpromoted boundary.

6. OpenAPI status
   - The document is explicitly labeled `planned-not-deployed` and warns consumers not to integrate against it.

8. Dead runtime surface and status drift
   - Unused `framer-motion`, `lenis`, and `@supabase/ssr` dependencies were removed.
   - Empty `PageTransition` and `SmoothScroll` wrappers were removed; `Reveal` remains as the stable visibility layer.
   - `docs/STATUS.md` now records the current verified baseline.

## Partially complete

7. Search and image risk
   - Image proxy now rejects untrusted hosts, enforces a 12 MiB streamed-response limit, checks image MIME, times out upstream fetches, and returns a controlled fallback.
   - Search now rejects oversized queries, caches results, and hydrates a compact search-only corpus instead of full building records and gallery data on a cache miss. It still ranks the current corpus in application memory; a future scale step is database-backed full-text search with measured indexes.
   - Image review is active: trusted replacements are reviewed before write and stale generic Unsplash rows are deleted only after a verified replacement exists.

## Open

3. Content truthfulness
   - Hard relational errors: 0.
   - Graduation QA problems: 0.
   - Still review-required: 860 warnings, 2,490 info findings, 875 buildings using fallback text, 106 architects using fallback text, and 739 buildings missing traceable source text.
   - Building and architect pages now disclose fallback copy as introductory guidance that has not completed claim-by-claim source review; records with formal editorial overlays do not show this notice.
   - E2E coverage verifies both disclosure paths and the formal-content exclusion path.
   - `npm run content:review-sources` now produces a read-only, ranked review queue with the current source entry points, identity risks, and a no-auto-prose rule. After source-review batches 001–003, the current queue has 589 reference-ready records, 109 identity-review records, and 38 evidence-gap records; it found no records with an existing official-site entry point.
   - Content review batch 001 manually added formal, visibly sourced reading layers for Yoyogi National Gymnasium, Finlandia Hall, Centre Georges Pompidou, Acropolis Museum, and Beinecke Rare Book & Manuscript Library. See `docs/reports/content-review-batch-001.md`.
   - Content review batch 002 added the same source-visible layer for Aarhus City Hall, Aga Khan Museum, Alvar Aalto Museum, and Bagsværd Church using responsible institutional sources. See `docs/reports/content-review-batch-002.md`.
   - Content review batch 003 added source-visible layers for the Cenotaph for the A-bomb Victims, Bordeaux Law Courts, Des Moines Public Library, and Bellevue Theatre. See `docs/reports/content-review-batch-003.md`.
   - This is a content-production and evidence problem, not a single code fix.

## Verified complete: release coupling

5. Data write to deployment coupling
   - Building and architect routes still use `dynamicParams = false`.
   - An ISR experiment was rejected because missing building and architect routes returned HTTP 200 instead of 404 under the current Next.js route structure.
   - `.github/workflows/production-release.yml` now provides one reviewed release path: encrypted GitHub environment input, quality gate, complete tests, Cloudflare Worker build/deploy, then live 200/404 checks.
   - The workflow supports both manual dispatch and the `archistory-reviewed-data` repository-dispatch event.
   - The required Cloudflare and Supabase values are stored as encrypted GitHub Secrets; Vercel is disconnected from GitHub and is no longer part of the release path.
   - The first verified Cloudflare release completed on 2026-07-12 after installing Playwright Chromium on the clean GitHub runner. Publication quality checks, 12 unit tests, 17 E2E tests, Worker deployment, and live 200/404 checks all passed.

## Next smallest verified step

Continue the ranked content-source review queue in small, evidence-backed batches. Keep `dynamicParams = false`; the rejected ISR experiment demonstrated that it breaks the required HTTP 404 contract in the current app. Every reviewed data write must continue through the verified Cloudflare release workflow.
