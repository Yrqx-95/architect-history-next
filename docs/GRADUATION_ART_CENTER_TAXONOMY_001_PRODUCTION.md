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

## Remaining release gate

- Run Reviewed production release after this database write.
- Verify the public API remains healthy and the 8 aliases are readable.
- Do not generate the CASE-005 building migration until the release and live checks succeed.
