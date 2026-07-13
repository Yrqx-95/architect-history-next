# Graduation 3331 Arts Chiyoda Batch 011 Dry Run

Date: 2026-07-13
Scope: CASE-005 canonical building migration
Production write status: not yet authorized

## Pack

- 1 new joint architect: `shinya-sato-mejiro-studio`.
- 1 canonical building: `3331-arts-chiyoda`, broad type `cultural`.
- 1 exact CC0 primary image by Ootahara.
- 1 published CASE-005 profile.
- 1 approved primary `art-center` assignment.
- Compatibility architect is aligned to `Shinya Sato + Mejiro Studio`; the profile text explicitly records that the art center closed in 2023 and is treated as a historical reuse case.

## Isolated PostgreSQL verification

- PostgreSQL 18.3 replayed all required production migrations through Roadside Station Mashiko batch 010 and the `art-center` taxonomy.
- First forward passed with exact counts.
- Rollback refused an injected external `curated_images` dependency.
- Exact rollback, second forward and second rollback all passed.
- Supabase migration `20260713024255_graduation_3331_arts_chiyoda_batch_011.sql` was created with the repository-local CLI and is byte-identical to the reviewed apply SQL.

## Production read-only preflight

- Architect conflicts: 0.
- Building conflicts: 0.
- Image conflicts: 0.
- CASE-005 profile conflicts: 0.
- Assignment conflicts: 0.
- Required active `art-center` function: 1/1.
- Required `cultural` type: 1/1.
- Baseline: 81 profiles / 935 buildings / 7284 images / 140 approved assignments.
- Expected after write: 82 / 936 / 7285 / 141.

## Remaining gate

Run full unit tests, graduation QA, typecheck, lint, image metadata checks and `git diff --check`. Merge the reviewed pack through one PR, repeat the production conflict preflight, and only then apply the migration. After the write, verify exact counts, relations, RLS/policies and advisors, then run one Reviewed production release and live CASE/building/API checks.
