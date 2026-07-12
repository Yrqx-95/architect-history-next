# Graduation Yu no Eki Ohyu Batch 008 Dry Run

Date: 2026-07-13
Scope: CASE-033 Yu no Eki Ohyu canonical building migration
Production write status: not yet authorized

## Generated target

- Reuse existing architect `51797239-be38-4dbd-9d7e-e413ddf3c78a` / `kengo-kuma`; insert no architect row.
- Create one canonical `yu-no-eki-ohyu` transportation building.
- Create one primary exterior image using the existing 1600×900 local asset and exact 掬茶 / Wikimedia Commons / CC BY-SA 4.0 metadata.
- Create one published CASE-033 profile preserving its existing concept and multilingual keywords.
- Create four approved functions: `transport-hub` primary; `community-center`, `retail` and `public-space` secondary.

## Production read-only precheck

- Existing Kengo Kuma UUID/slug exact match: 1.
- Target building and profile conflicts: 0 each.
- Required active functions: 4/4; required `transportation` type: 1/1.
- Baseline: 78 profiles / 932 buildings / 7281 images / 133 assignments.
- Expected after write: 79 profiles / 933 buildings / 7282 images / 137 assignments.

## Isolated PostgreSQL verification

- Replayed the graduation foundation and every prior G6 pack through ACROS Fukuoka, including transport, public-space, public-toilet, retail and hotel taxonomies in production order.
- First forward wrote 0 architects / 1 building / 1 image / 1 profile / 4 assignments.
- Rollback refused after an external curated-image relation was injected.
- After removing the external relation, exact rollback, second forward and second rollback all returned to the original counts.
- Supabase migration `20260712230644_graduation_yu_no_eki_ohyu_batch_008.sql` was created with the repository-local CLI and is byte-identical to the reviewed apply SQL.
- Existing local image verified at 1600×900 with SHA-256 `1c05cee4ba22b67887c9ba14c4640546f71a5fac1f95c0cb214ebfb7878d0a8d`.
- Unit suite passed 58 files / 203 tests; graduation content QA reported 0 problems; typecheck, ESLint, image audit and `git diff --check` passed.

## Remaining gates

Merge by PR; repeat the production conflict precheck immediately before apply. After writing, verify exact rows/counts, orphans, architect relation, primary image/function uniqueness, CASE concept/keywords, RLS/policies, advisors, Reviewed production release and live CASE/building/image/API routes.
