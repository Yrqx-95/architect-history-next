# Archistory Status

Last updated: 2026-07-15

## Current Product Identity

Archistory is an **Architecture Learning Navigator**.

It is not only a database and not yet a full study platform. The current product helps users move from buildings and architects toward concepts, comparisons, history, exam-adjacent knowledge, and design learning.

## Current Production Baseline

- Production/main commit: `fb9a6f17fe7fbc904ee122b0d8db9fff08290381` (PR #165 merge commit).
- PR #165 is merged; its final head is `e2c605a805b46f7d0824d377a10d44d3e3a121cd`.
- Reviewed production release `29349915435` completed successfully from the merge commit.
- Cloudflare Worker: `architect-history-next`; deployed Version ID `7a3b6b82-738e-47ba-8687-6d24be3329db`; routes are `archistory.app/*` and `www.archistory.app/*`.
- Homepage hierarchy is one semantic order at every breakpoint: Hero → entry → featured → stats → architects. The statistics section has one DOM block.
- The release baseline is 73 unit files / 250 tests, 29 / 29 production E2E, and 4,446 generated static pages.
- The 320 / 390 / 430 / 1440 homepage checks, zh / en / ja home routes, three primary entries, and the specified production smoke routes passed. No console or page errors were observed during that QA sample.
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

1. Keep the repository status documents synchronized with the production baseline.
2. Govern worktrees through read-only inspection and explicit ownership before any writer lane.
3. Execute the next small reviewed Top 50 batch.
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
