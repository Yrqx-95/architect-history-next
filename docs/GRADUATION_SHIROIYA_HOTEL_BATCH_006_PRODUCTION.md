# Graduation Shiroiya Hotel Batch 006 Production Record

Date: 2026-07-12
Project: `usuqjsjluietcnudxwvz`
Migration: `graduation_shiroiya_hotel_batch_006`
Version: `20260712145447`

## Production write

- The immediately preceding precheck remained architect exact 1, with 0 building/image/profile/assignment conflicts, 2/2 active functions, and 1/1 `commercial` type.
- Reused existing `009373b5-61c8-4621-b128-9934f77d681c` / `fujimoto`; no architect row was inserted.
- Inserted one `shiroiya-hotel` canonical building, one primary image, one published CASE-028 profile, and two approved assignments (`hotel` primary, `retail` secondary).
- The canonical building represents the renovated main building and new Green Tower as one operating hotel complex, not duplicate buildings.

## Post-write verification

- Totals changed from 76/930/7279/127 to 77 profiles / 931 buildings / 7280 images / 129 assignments.
- Target architect, building, image, profile, and both function assignments each matched exactly.
- CASE-028 retained its original concept and keywords.
- Orphan profiles, architect mismatch, duplicate primary image, and duplicate primary function checks all returned 0.
- Graduation profile and function assignment RLS remained enabled with the expected published/approved public-read policies.
- Advisors remained at the pre-existing 13 security and 27 performance notices.

## Compatibility correction and release

- The first live read exposed a stale JSON compatibility architect label, `Sou Fujimoto Architects`, while canonical production used `Sou Fujimoto`.
- PR #88 aligned the authoritative CSV, generated JSON, 77-profile E2E baseline, and CASE-028 canonical regression assertion.
- Reviewed production release [`29197317708`](https://github.com/Yrqx-95/architect-history-next/actions/runs/29197317708) attempt 1 passed the publication gate and unit suite but was stopped before deploy by a transient malformed Supabase REST `buildings` response during Next.js prerender.
- A read-only scan found no control characters in any production building field. Attempt 2 then passed the complete suite, Cloudflare deployment, and route semantics in 9m55s, confirming the first failure was transient rather than stored-data corruption.

## Live verification

- CASE-028 routes in `zh`, `en`, and `ja`: 3/3 HTTP 200.
- `shiroiya-hotel` building routes in `zh`, `en`, and `ja`: 3/3 HTTP 200.
- Image: HTTP 200, 443708 bytes; repository source remains 1600×1200 with SHA-256 `31464c57312a8c2c1b477568591f5291998834c068e6d78d5f038fcabc5a148b`.
- API: `source=supabase+json`, 101 public cases, 77 profiles / 77 unified IDs, no missing fallback/building relations.
- CASE-028 API returns canonical names, Maebashi/Japan, 2020, Sou Fujimoto, CC BY 4.0, and こやまひろ credit.

## G6 state

- Migrated: 56/118.
- Not yet migrated: 62.
- Formally unreviewed queue: 39.
