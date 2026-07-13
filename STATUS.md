# Archistory Status

Last updated: 2026-07-13

## Current Product Identity

Archistory is an **Architecture Learning Navigator**.

It is not only a database and not yet a full study platform. The current product helps users move from buildings and architects toward concepts, comparisons, history, exam-adjacent knowledge, and design learning.

## Current Health

- App framework: Next.js App Router
- Database: Supabase
- Languages: zh / en / ja
- Current data audit: 0 errors, with remaining warnings/info mainly about content completeness
- Graduation runtime: Supabase-only compatibility/profile/building composition; 101 public CASE routes, 88 canonical profiles
- Search: zh / en / ja function aliases, graduation keywords, five composable filters, duplicate-free building results
- Test safety net: 66 unit files / 227 tests plus full Playwright production E2E
- Current data audit: 0 errors; graduation content QA: 0 problems
- Production deployment: reviewed Cloudflare release workflow
- Content trust P0 baseline: 927 warnings / 2624 info; 38 buildings missing source metadata, 806 missing database source text; versioned Top 50 queue prepared

## Current Focus

1. Keep the unified graduation/building/search contract stable.
2. Execute `docs/CONTENT_TRUST_NEXT_PHASE_P0.md` in controlled reviewed batches, beginning with the eight-record read-only candidate batch.
3. Resolve explicit `no_safe_image_yet` evidence gaps only when new rights-safe evidence appears.

## Paused

- New learning-layer experiments
- New metadata categories
- New taxonomy expansion
- Large redesign
- Large component reorganization
- Image storage migration before image authority is settled

## Canonical Docs

- Product surface: `PRODUCT_SURFACE.md`
- Feature status: `FEATURE_STATUS.md`
- Documentation index: `DOCUMENT_INDEX.md`
- Operating protocol: `docs/PROJECT_OPERATING_SYSTEM.md`
- Script lifecycle: `SCRIPT_REGISTRY.md`
- Roadmap: `ROADMAP.md`
- Content trust P0: `docs/CONTENT_TRUST_NEXT_PHASE_P0.md`
- Historical status log: `docs/STATUS.md`
