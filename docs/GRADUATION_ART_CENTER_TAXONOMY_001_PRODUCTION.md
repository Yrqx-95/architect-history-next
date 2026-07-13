# Art Center Function Taxonomy 001 Production Record

Date: 2026-07-13
Migration: `building_function_art_center_001`
Version: `20260713022122`

## Result

- Inserted 1 active `art-center` function under `cultural` and 8 reviewed aliases across `zh`, `zh-Hant`, `en`, and `ja`.
- Totals changed exactly from 14 functions / 229 aliases / 140 assignments to 15 / 237 / 140.
- The target function, all 8 aliases, 4 locales and 0 assignments matched exactly.
- No architect, building, image, graduation profile or CASE compatibility data changed.

## Security and policy verification

- RLS remained enabled on `building_functions`, `building_function_aliases`, and `building_function_assignments`.
- The three established public-read policies remained present; anon Data API reads returned the new taxonomy rows.
- Advisors remained at the pre-existing 13 security notices and 27 performance notices, with no new `art-center` object finding.

## Release and live verification

- Reviewed production release `29219437596` succeeded in 9m27s; publication quality gate, complete tests, Cloudflare Worker deployment and production route semantics all passed.
- The production anon Data API returned the exact `art-center` row and all 8 reviewed aliases with HTTP 200.
- `https://archistory.app/zh` returned HTTP 200.
- `https://archistory.app/api/v1/graduation/cases` returned HTTP 200, `source=supabase+json`, 101 cases, 81 profiles, 0 missing fallback cases and 0 missing building relations.
- CASE-005 remains intentionally JSON-backed with an empty compatibility architect until its separate guarded building migration is reviewed.

The taxonomy prerequisite is complete. CASE-005 may now proceed to compatibility alignment and an isolated building migration dry-run; production building writes are still not authorized.
