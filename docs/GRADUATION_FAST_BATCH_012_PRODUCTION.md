# Graduation Fast Batch 012 Production Record

Date: 2026-07-13
Migration: `graduation_fast_batch_012`
Version: `20260713032152`

## Result

- Inserted 3 architects, 3 buildings, 3 primary images, 3 published profiles and 4 approved assignments.
- Totals changed exactly from 82/936/7285/141 to 85 profiles / 939 buildings / 7288 images / 145 assignments.
- Target architects/buildings/images/profiles/assignments matched 3/3/3/3/4; orphan profiles remained 0.
- RLS and the existing public-read policies remained enabled.
- Advisors remained at the existing 13 security / 27 performance baseline.

## Release and live verification

- Reviewed production release `29221674096` completed successfully after the publication quality gate, complete test suite, Cloudflare deployment and production route semantics check.
- CASE-068/077/089 routes, their canonical building routes and all three local images returned HTTP 200.
- The live API returned `source=supabase+json`, 101 public cases, 85 profiles, 0 missing fallback cases and 0 missing building relations.
