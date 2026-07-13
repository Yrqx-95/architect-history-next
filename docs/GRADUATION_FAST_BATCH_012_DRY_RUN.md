# Graduation Fast Batch 012 Dry Run

Date: 2026-07-13
Scope: CASE-068 / CASE-077 / CASE-089
Production write status: not yet authorized

## Pack

- 3 new canonical architects.
- 3 buildings: historical `miyashita-park-2011`, `pasona-urban-farm`, and `het-hof-van-cartesius`.
- 3 exact open-license primary images.
- 3 published graduation profiles.
- 4 assignments: CASE-068 `public-space` primary; CASE-077 `mixed-use` primary; CASE-089 `mixed-use` primary and `public-space` secondary.

## Verification

- Full-history isolated PostgreSQL 18.3 replay passed through CASE-005 and the art-center taxonomy.
- First forward, external curated-image rollback refusal, exact rollback, second forward and second rollback passed.
- The verifier now seeds broad building types used by the pack even when no function taxonomy row uses that broad type; this covers the existing production `office` type without inventing a function.
- Flickr is preserved as the CASE-089 image source and the photographer is normalized to `nandasluijsmans`, not incorrectly labeled MDPI.
- Production read-only preflight: architect/building/image/profile/assignment conflicts all 0; required functions 2/2 and types 2/2.
- Baseline: 82 profiles / 936 buildings / 7285 images / 141 assignments.
- Expected after write: 85 / 939 / 7288 / 145.
- Supabase migration `20260713031753_graduation_fast_batch_012.sql` is byte-identical to the reviewed apply SQL.

## Remaining gate

Run full unit tests, graduation QA, typecheck, lint, image checks and `git diff --check`; merge through one PR, repeat production conflicts, then apply. After production write, verify exact rows, relations, RLS/policies and advisors, update the production baseline once, and run one Reviewed production release.
