# Hotel Function Taxonomy 001 Dry Run

Date: 2026-07-12
Scope: multilingual function prerequisite for CASE-028 Shiroiya Hotel
Production write status: not yet authorized

## Decision

- Add one narrow `hotel` function under the existing broad type `commercial`.
- Add 20 reviewed aliases across `zh`, `zh-Hant`, `en`, and `ja`.
- Cover explicit hotel, lodging, boutique-hotel, and Japanese ryokan search intent without treating generic tourism or housing as hotel intent.
- Do not create or modify any building, image, graduation profile, assignment, RLS policy, or exposed table in this taxonomy migration.

## Guards

- Forward SQL refuses missing prerequisite tables, a missing `commercial` type, an existing `hotel` function, or any locale-normalized alias collision.
- Post-write SQL requires exactly one active `hotel` function and 20 aliases across four locales.
- Rollback refuses changed taxonomy rows and refuses whenever any building assignment references `hotel`.

## Verification

- The isolated PostgreSQL dry-run replays the foundation, base taxonomy, `public-space`, `public-toilet`, and `retail` in production order.
- It verifies forward counts, a dependent-assignment rollback refusal, exact rollback, and a second forward/rollback replay.
- The Supabase migration was created with the repository-local CLI and must remain byte-identical to the reviewed apply SQL.
- Production read-only precheck returned 0 `hotel` function conflicts, 0 normalized alias conflicts, 0 `hotel` assignments, and exactly 1 `commercial` broad type.
- Production baseline before this migration is 13 functions / 209 aliases / 127 assignments.
- RLS remains enabled on `building_functions`, `building_function_aliases`, and `building_function_assignments`; their active/approved public-read policies remain present for `anon` and `authenticated`.
- Advisor baseline remains 13 security notices and 27 performance notices. None references a new `hotel` object because production has not yet been written. Existing notices are outside this data-only taxonomy batch; relevant remediation indexes include [RLS enabled without policy](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy), [RLS disabled in public](https://supabase.com/docs/guides/database/database-linter?lint=0013_rls_disabled_in_public), [extensions in public](https://supabase.com/docs/guides/database/database-linter?lint=0014_extension_in_public), [public SECURITY DEFINER execution](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable), [unindexed foreign keys](https://supabase.com/docs/guides/database/database-linter?lint=0001_unindexed_foreign_keys), and [unused indexes](https://supabase.com/docs/guides/database/database-linter?lint=0005_unused_index).
- Unit suite passed 55 files / 193 tests; typecheck, ESLint, migration byte comparison, and `git diff --check` passed.
- Full E2E reached 18/19 passing. The unrelated failure was the missing `content-maturity-note` on `/zh/architect/aldo-rossi`; that path depends on the concurrently modified and explicitly protected `src/lib/architect-content.ts`, so this batch did not alter or stage it.

## Remaining production gates

Before production apply: repeat function, alias, assignment, and `commercial` type conflict checks immediately before writing. After apply: verify exact rows and counts, rerun advisors and policy checks, then complete Reviewed production release and live search/API checks before CASE-028 migration.
