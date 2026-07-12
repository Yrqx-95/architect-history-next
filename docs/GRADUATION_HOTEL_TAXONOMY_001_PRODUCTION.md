# Hotel Function Taxonomy 001 Production Record

Date: 2026-07-12
Project: `usuqjsjluietcnudxwvz`
Migration: `building_function_hotel_001`
Version: `20260712143511`

## Production write

- The immediately preceding conflict check remained 0 function conflicts / 0 normalized alias conflicts / 0 assignments / exactly 1 `commercial` type.
- The guarded migration inserted one active `hotel` function under `commercial` and 20 aliases across four locales.
- No building, image, graduation profile, function assignment, table, policy, or RLS setting was changed.

## Post-write verification

- Exact target: 1 `hotel` function / 20 aliases / 4 locales / 0 assignments.
- Totals: 14 functions / 229 aliases / 127 assignments.
- RLS remains enabled on `building_functions`, `building_function_aliases`, and `building_function_assignments`; all three expected public-read policies remain present.
- Advisors remain at the pre-existing 13 security notices and 27 performance notices, with no new `hotel` object finding.
- Reviewed production release [`29196546583`](https://github.com/Yrqx-95/architect-history-next/actions/runs/29196546583) succeeded in 9m49s: publication gate, complete test suite, Cloudflare deploy, and production route semantics all passed.

## Live verification

- `https://archistory.app/zh` returns HTTP 200.
- Graduation API returns `source=supabase+json`, 101 public cases, 76 unified profiles, and no missing fallback/building relations.
- CASE-028 remains published but is intentionally absent from unified IDs until its canonical building migration passes review and dry-run.
- `/api/search?q=hotel` currently returns 9 name-matched hotel buildings. The current search route does not yet consume function aliases; multilingual alias-backed search remains G7 scope and is not claimed complete here.

## Next gate

Generate the guarded CASE-028 migration pack using the existing `fujimoto` architect, one canonical Shiroiya Hotel complex, one exact CC BY 4.0 image, one published profile, and `hotel` primary plus `retail` secondary assignments. Run production conflict precheck and full-history isolated PostgreSQL dry-run before any building write.
