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

## Remaining release gate

Merge the 82→85 production baseline and run one Reviewed production release. Verify all three CASE routes, building routes, local images, canonical architects and API diagnostics before marking the batch complete.
