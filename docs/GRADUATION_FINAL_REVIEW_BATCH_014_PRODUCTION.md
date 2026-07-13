# Graduation Final Review Batch 014 Production Record

Date: 2026-07-13  
Migration: `graduation_final_review_batch_014`  
Version: `20260713034120`

## Result

- Inserted 2 architects, 3 buildings, 3 primary images, 3 published profiles and 7 approved assignments.
- Reused the existing `kengo-kuma` canonical architect for CASE-100.
- Totals changed exactly from 85/939/7288/145 to 88 profiles / 942 buildings / 7291 images / 152 assignments.
- Target profiles/buildings/images/assignments matched 3/3/3/7; orphan profiles remained 0.
- RLS remains enabled on `graduation_case_profiles` and `building_function_assignments`; each retains one public-read policy.
- Supabase advisors remained at the established 13 security / 27 performance baseline.

## Release and live verification

- Reviewed production release `29222694233` completed successfully in 10m13s; quality gate, complete tests, Cloudflare deploy and route-semantics verification passed.
- CASE-100/126/136, their canonical building routes and all three images returned HTTP 200.
- The live API returned `source=supabase+json`, 101 public cases, 88 profiles, 0 missing fallback cases and 0 missing building relations, with the exact reviewed architects, years and licenses.
