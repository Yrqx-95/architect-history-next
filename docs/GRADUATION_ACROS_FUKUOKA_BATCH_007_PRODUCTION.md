# Graduation ACROS Fukuoka Batch 007 Production Record

Date: 2026-07-13
Project: `usuqjsjluietcnudxwvz`
Migration: `graduation_acros_fukuoka_batch_007`
Version: `20260712153752`

## Production write

- The immediately preceding precheck remained 0 architect/building/image/profile/assignment conflicts, with existing Takenaka exact 1, required functions 4/4 and `mixed-use` type 1/1.
- Inserted one joint formal-design architect `nihon-sekkei-takenaka-corporation`, one `acros-fukuoka` building, one primary image, one published CASE-016 profile and four approved assignments.
- `mixed-use` is primary; `theatre`, `retail` and `public-space` are secondary.
- The canonical architect represents the official Nihon Sekkei + Takenaka Corporation formal design role. Every assignment evidence note retains Emilio Ambasz as a basic-concept contributor rather than incorrectly presenting him as the sole architect.

## Post-write verification

- Totals changed exactly from 77/931/7280/129 to 78 profiles / 932 buildings / 7281 images / 133 assignments.
- Target architect, building, image, profile and all four function assignments matched exactly.
- CASE-016 retained its concept and multilingual keywords.
- Orphan profiles and architect mismatch were 0; target primary image and primary approved function were exactly 1 each.
- Graduation profile and function assignment RLS remained enabled with the expected published/approved public-read policies.
- Advisors remained at the pre-existing 13 security and 27 performance notices.

## Release

- PR #91 merged the reviewed migration pack after the full-history PostgreSQL 18.3 forward/guard/rollback/replay passed.
- PR #92 updated the production E2E baseline from 77 to 78 and added canonical CASE-016 assertions.
- Reviewed production release [`29198674126`](https://github.com/Yrqx-95/architect-history-next/actions/runs/29198674126) succeeded in 8m11s: publication gate, complete tests, Cloudflare deployment and production route semantics all passed.

## Live verification

- CASE-016 routes in `zh`, `en` and `ja`: 3/3 HTTP 200.
- `acros-fukuoka` building routes in `zh`, `en` and `ja`: 3/3 HTTP 200.
- Image: HTTP 200, 346115 bytes; repository source remains 1600×1071 with SHA-256 `727d509be398b9d841055476dbd0c6ca9e59c637e0a6df37fe84f1cb8345666b`.
- API: `source=supabase+json`, 101 public cases, 78 profiles / 78 unified IDs, no missing fallback/building relations.
- CASE-016 API returns canonical ACROS福冈, 福冈 日本, 1995, Nihon Sekkei + Takenaka Corporation, CC BY-SA 2.0 and Kenta Mabuchi / Wikimedia Commons.

## G6 state

- Migrated: 57/118.
- Not yet migrated: 61.
- Formally unreviewed queue: 38.
