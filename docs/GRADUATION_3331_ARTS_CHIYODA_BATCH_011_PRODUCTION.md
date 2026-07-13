# Graduation 3331 Arts Chiyoda Batch 011 Production Record

Date: 2026-07-13
Migration: `graduation_3331_arts_chiyoda_batch_011`
Version: `20260713024654`

## Result

- Inserted 1 joint architect, 1 canonical building, 1 CC0 primary image, 1 published CASE-005 profile and 1 primary `art-center` assignment.
- Totals changed exactly from 81/935/7284/140 to 82 profiles / 936 buildings / 7285 images / 141 approved assignments.
- Target architect, building, image, profile and assignment each matched exactly.
- Orphan profiles and target architect mismatches remained 0.
- The canonical profile records the 2023 closure and treats the facility as a historical reuse case.

## Security verification

- RLS remained enabled on `graduation_case_profiles` and `building_function_assignments`.
- Their two established public-read policies remained present.
- Advisors remained at the pre-existing 13 security notices and 27 performance notices, with no new target-object finding.

## Release and live verification

- Reviewed production release `29220342065` succeeded in 10m18s; publication quality gate, complete tests, Cloudflare Worker deployment and production route semantics all passed.
- CASE-005 zh/en/ja routes and `3331-arts-chiyoda` zh/en/ja building routes returned HTTP 200 (6/6).
- The local CC0 image returned HTTP 200 as `image/jpeg`, 264036 bytes.
- Graduation API returned HTTP 200, `source=supabase+json`, 101 cases, 82 profiles, 0 missing fallback cases and 0 missing building relations.
- Live CASE-005 returned canonical architect `Shinya Sato + Mejiro Studio`, year 2010, Ootahara / Wikimedia Commons, CC0, and the explicit 2023 closure statement.

This batch is complete.
