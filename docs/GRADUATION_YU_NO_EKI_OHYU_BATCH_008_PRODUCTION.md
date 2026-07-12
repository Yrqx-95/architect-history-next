# Graduation Yu no Eki Ohyu Batch 008 Production Record

Date: 2026-07-13
Project: `usuqjsjluietcnudxwvz`
Migration: `graduation_yu_no_eki_ohyu_batch_008`
Version: `20260712231018`

## Production write

- The immediately preceding precheck remained architect exact 1 with 0 building/image/profile/assignment conflicts, 4/4 active functions and 1/1 `transportation` type.
- Reused existing `51797239-be38-4dbd-9d7e-e413ddf3c78a` / `kengo-kuma`; no architect row was inserted.
- Inserted one `yu-no-eki-ohyu` building, one primary image, one published CASE-033 profile and four approved assignments.
- `transport-hub` is primary; `community-center`, `retail` and `public-space` are secondary. The attached open-air theater remains evidence of a secondary activity space and is not promoted to a `theatre` assignment.

## Post-write verification

- Totals changed exactly from 78/932/7281/133 to 79 profiles / 933 buildings / 7282 images / 137 assignments.
- Target building, image, profile and all four assignments matched exactly.
- CASE-033 retained its concept and multilingual keywords.
- Orphan profiles and architect mismatch were 0; target primary image and primary approved function were exactly 1 each.
- Graduation profile and function assignment RLS remained enabled with the expected published/approved public-read policies.
- Advisors remained at the pre-existing 13 security and 27 performance notices.

## Release

- PR #95 merged the reviewed migration pack after full-history PostgreSQL 18.3 forward/guard/rollback/replay passed.
- PR #96 updated the production E2E baseline from 78 to 79 and added canonical CASE-033 assertions.
- Reviewed production release [`29213008830`](https://github.com/Yrqx-95/architect-history-next/actions/runs/29213008830) passed publication and all 203 unit tests, then stopped before deployment because the separate render-layout E2E still hard-coded the old fallback title.
- PR #97 made that render test source-agnostic while retaining strict canonical assertions in the unified-read test. Both relevant E2E files passed 4/4 locally.
- Reviewed production release [`29213243381`](https://github.com/Yrqx-95/architect-history-next/actions/runs/29213243381) then succeeded in 8m11s: publication gate, complete tests, Cloudflare deployment and production route semantics all passed.

## Live verification

- CASE-033 routes in `zh`, `en` and `ja`: 3/3 HTTP 200.
- `yu-no-eki-ohyu` building routes in `zh`, `en` and `ja`: 3/3 HTTP 200.
- Image: HTTP 200, 199494 bytes; repository source remains 1600×900 with SHA-256 `1c05cee4ba22b67887c9ba14c4640546f71a5fac1f95c0cb214ebfb7878d0a8d`.
- API: `source=supabase+json`, 101 public cases, 79 profiles / 79 unified IDs, no missing fallback/building relations.
- CASE-033 API returns canonical 大湯道路休息站, 鹿角 日本, 2018, Kengo Kuma, CC BY-SA 4.0 and Photo: 掬茶 / Wikimedia Commons.

## G6 state

- Migrated: 58/118.
- Not yet migrated: 60.
- Formally unreviewed queue: 37.
