# Archistory Status

Last updated: 2026-07-15

## Current Product Identity

Archistory is an **Architecture Learning Navigator**.

It is not only a database and not yet a full study platform. The current product helps users move from buildings and architects toward concepts, comparisons, history, exam-adjacent knowledge, and design learning.

## Current Production Baseline

- Production/main commit: `e89767356cb605424d22b26a831a95e91eccb345` (PR #168 merge commit; PR #167 content-trust code is included in the reviewed release).
- PR #167 and PR #168 are merged. PR #167 introduced the reviewed Parc.1 + NMWA package; PR #168 is the test-only Parc.1 browse locator and navigation-wait correction.
- Reviewed production release `29394373142` completed successfully from `e8976735`, including quality gate, complete tests, build/deploy, and route semantics.
- Cloudflare Worker: `architect-history-next`; current Version ID `f5a753ea-a798-4767-ac74-25227b1d0345`; routes are `archistory.app/*` and `www.archistory.app/*`.
- Homepage hierarchy is one semantic order at every breakpoint: Hero → entry → featured → stats → architects. The statistics section has one DOM block; E5 Chromium QA confirmed DOM, visual, and Tab order.
- Current release baseline is 74 unit files / 260 tests, 33 / 33 production E2E, and 4,446 generated static pages.
- Supabase migration `content_trust_parc1_nmwa_001` / remote version `20260715052644` appears exactly once in migration history and has been applied. E5 anon-only post-QA verification remained exact.
- Parc.1 is production-verified with the centralized no-safe-primary-image policy, no image fallback, `cover_url=null` in search, and no browse thumbnail. NMWA is production-verified with canonical Le Corbusier identity/content and its existing gallery attribution; its image-authority decision remains open.
- The 320 / 390 / 430 / 1440 homepage checks, zh / en / ja object routes, three primary entries, and specified production smoke routes passed. The bounded sample had no product page errors; expected 404 console output, two cancelled internal RSC prefetches, and release warnings remain documented.
- PR #160 remains Draft and is out of scope.
- Graduation G6–G10 are complete; do not reopen them without new evidence.
- Top 50 is already established as 25 `trust-repair` records plus 25 `product-core` records. The next action is a small reviewed batch, not a queue rebuild.

## Current Health

- App framework: Next.js App Router
- Database: Supabase
- Languages: zh / en / ja
- Current data audit: 0 errors, with remaining warnings/info mainly about content completeness
- Graduation runtime: Supabase-only compatibility/profile/building composition
- Search: zh / en / ja function aliases, graduation keywords, five composable filters, duplicate-free building results
- Production deployment: reviewed Cloudflare release workflow
- Versioned content-trust P0 snapshot (generated 2026-07-13T07:25:05.820Z at baseline commit `1e369888680245aa637dddabdf886cf9a7930af0`; not a live recount; source: `docs/CONTENT_TRUST_NEXT_PHASE_P0.md`): 0 errors / 927 warnings / 2624 info; 38 buildings missing source metadata; 806 missing database source text. The versioned Top 50 queue is prepared.

## Current Focus

Follow this order:

1. Close this E5 release documentation synchronization.
2. Govern worktrees through read-only inspection and explicit ownership before any writer lane.
3. Execute read-only candidate selection for the second small Top 50 batch; do not rebuild the queue.
4. Productize one learning path only after the preceding work is stable.

## Paused / Out of Scope

- New learning-layer experiments beyond the single prioritized path
- New metadata categories
- New taxonomy expansion
- Large redesign
- Large component reorganization
- Image storage migration before image authority is settled
- PR #160, database writes, and unrelated long-running queues

## Canonical Docs

- Product surface: `PRODUCT_SURFACE.md`
- Feature status: `FEATURE_STATUS.md`
- Documentation index: `DOCUMENT_INDEX.md`
- Operating protocol: `docs/PROJECT_OPERATING_SYSTEM.md`
- Script lifecycle: `SCRIPT_REGISTRY.md`
- Roadmap: `ROADMAP.md`
- Worklog: `docs/WORKLOG.md`
- User simulation log: `docs/USER_SIMULATION_LOG.md`
- Content trust P0: `docs/CONTENT_TRUST_NEXT_PHASE_P0.md`
- Historical status log: `docs/STATUS.md`
