# Graduation Shiroiya Hotel Batch 006 Dry Run

Date: 2026-07-12
Scope: CASE-028 Shiroiya Hotel canonical building migration
Production write status: not yet authorized

## Generated target

- Reuse existing architect `009373b5-61c8-4621-b128-9934f77d681c` / `fujimoto`; insert no architect row.
- Create one canonical `shiroiya-hotel` building representing the renovated main building and new Green Tower as one operating complex.
- Create one primary exterior image using the existing local asset and exact こやまひろ / Wikimedia Commons / CC BY 4.0 metadata.
- Create one published CASE-028 profile preserving its own concept and multilingual keywords.
- Create two approved functions: `hotel` primary and `retail` secondary.

## Production read-only precheck

- Existing architect UUID/slug exact match: 1.
- Target building, image, profile, and assignment conflicts: 0 each.
- Required active functions: 2/2; required `commercial` type: 1/1.
- Baseline: 76 profiles / 930 buildings / 7279 images / 127 assignments.

## Isolated PostgreSQL verification

- Replayed the graduation foundation and every prior G6 pack through Miyashita Park, including transport, public-space, public-toilet, retail, and hotel taxonomies in production order.
- First forward wrote 0 architects / 1 building / 1 image / 1 profile / 2 assignments.
- Rollback refused after an external curated-image relation was injected.
- After removing the external relation, exact rollback, second forward, and second rollback all returned to the original counts.
- Supabase migration `20260712145038_graduation_shiroiya_hotel_batch_006.sql` was created with the repository-local CLI and is byte-identical to the reviewed apply SQL.
- Unit suite passed 56 files / 197 tests; graduation content QA reported 0 problems; typecheck, ESLint, and `git diff --check` passed.
- Existing local image verified at 1600×1200 with SHA-256 `31464c57312a8c2c1b477568591f5291998834c068e6d78d5f038fcabc5a148b`.

## Remaining gates

Run unit tests, typecheck, lint, image QA, and `git diff --check`; merge by PR; repeat the production conflict precheck immediately before apply. After writing, verify exact rows/counts, orphans, architect relation, primary image/function uniqueness, CASE concept/keywords, RLS/policies, advisors, Reviewed production release, and live CASE/building/image/API routes.
