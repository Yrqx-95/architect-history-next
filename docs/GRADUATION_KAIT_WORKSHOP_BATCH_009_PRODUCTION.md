# Graduation KAIT Workshop Batch 009 Production Record

Date: 2026-07-13
Project: `usuqjsjluietcnudxwvz`
Migration: `graduation_kait_workshop_batch_009`
Version: `20260713002530`

## Production write

- The repeated precheck remained 0 architect/building/image/profile/assignment conflicts, with the required `university` function and `educational` type each present exactly once.
- Inserted one canonical `junya-ishigami` architect, one `kait-workshop` building, one primary interior image, one published CASE-034 profile and one approved assignment.
- `university` is the sole primary function. The student makerspace character remains in the profile and evidence instead of being hidden under `mixed-use` or overstated as a community center.

## Post-write verification

- Totals changed exactly from 79/933/7282/137 to 80 profiles / 934 buildings / 7283 images / 138 assignments.
- Target architect, building, image, profile and function assignment matched exactly.
- The image remained `interior`, primary, credited to Epiq and licensed CC BY-SA 3.0.
- Orphan profiles and architect mismatch were 0; target primary image and primary approved function were exactly 1 each.
- Graduation profile and function assignment RLS remained enabled with the expected published/approved public-read policies.
- Advisors remained at the pre-existing 13 security and 27 performance notices.

## Release

- PR #100 merged the reviewed migration pack after full-history PostgreSQL 18.3 forward/guard/rollback/replay passed.
- PR #101 updated the production E2E baseline from 79 to 80 and added strict canonical CASE-034 assertions.
- Reviewed production release [`29215437762`](https://github.com/Yrqx-95/architect-history-next/actions/runs/29215437762) succeeded in 8m38s: publication gate, complete tests, Cloudflare deployment and production route semantics all passed.

## Live verification

- CASE-034 routes in `zh`, `en` and `ja`: 3/3 HTTP 200.
- `kait-workshop` building routes in `zh`, `en` and `ja`: 3/3 HTTP 200. The first independent Japanese request briefly received the previous edge state during deployment propagation; immediate header/body verification and three repeated requests returned the canonical page with HTTP 200.
- Image: HTTP 200, 364837 bytes; repository source remains 1600×1200 with SHA-256 `1c467d7fd42f96314f6b4bc6fcea859f1dc5e221e1ab5156bc118c52a50e03fb`.
- API: `source=supabase+json`, 101 public cases, 80 profiles / 80 unified IDs, no missing fallback/building relations.
- CASE-034 API returns canonical KAIT 工坊, 厚木 日本, 2008, Junya Ishigami, CC BY-SA 3.0 and Epiq.

## G6 state

- Migrated: 59/118.
- Not yet migrated: 59.
- Formally unreviewed queue: 36.
