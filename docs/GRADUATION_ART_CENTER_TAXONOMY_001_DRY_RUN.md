# Art Center Function Taxonomy 001 Dry Run

Date: 2026-07-13
Scope: multilingual function prerequisite for CASE-005 3331 Arts Chiyoda
Production write status: not yet authorized

## Decision

- Add one narrow `art-center` function under the existing broad type `cultural`.
- Add 8 reviewed aliases across `zh`, `zh-Hant`, `en`, and `ja`.
- Cover explicit art-center spelling variants without treating broader cultural centers, civic halls, museums or generic mixed-use facilities as the same search intent.
- Do not create or modify any architect, building, image, graduation profile, assignment, RLS policy or exposed table in this taxonomy migration.

## Guards

- Forward SQL refuses missing prerequisite tables, a missing `cultural` type, an existing `art-center` function, or any locale-normalized alias collision.
- Post-write SQL requires exactly one active `art-center` function and 8 aliases across four locales.
- Rollback refuses changed taxonomy rows and refuses whenever any building assignment references `art-center`.

## Verification

- The isolated PostgreSQL dry-run replays the foundation, base taxonomy, `public-space`, `public-toilet`, `retail`, and `hotel` in production order.
- It verifies forward counts, a dependent-assignment rollback refusal, exact rollback, and a second forward/rollback replay.
- PostgreSQL engine: 18.3.
- The Supabase migration `20260713021549_building_function_art_center_001.sql` was created with the repository-local CLI and is byte-identical to the reviewed apply SQL.
- Production read-only precheck returned 0 `art-center` function conflicts, 0 reviewed alias conflicts, and exactly 1 `cultural` broad type.
- Production baseline before this migration is 14 functions / 229 aliases / 140 assignments; expected post-write totals are 15 / 237 / 140.
- The current anon Data API can read all three existing taxonomy tables, consistent with their established public-read policy behavior. The migration does not alter RLS, grants or policies.
- Advisor baseline remains the established 13 security notices and 27 performance notices. It must be rechecked immediately after any production apply; no production write has occurred in this stage.
- Full unit suite passed 62 files / 214 tests; typecheck, ESLint, migration byte comparison and `git diff --check` passed.

## Remaining production gates

Before production apply: merge through PR, then repeat function, alias, assignment and `cultural` type conflict checks immediately before writing. After apply: verify exact rows and totals, RLS/policies and advisors, then complete Reviewed production release and live API checks before generating the CASE-005 building migration.
