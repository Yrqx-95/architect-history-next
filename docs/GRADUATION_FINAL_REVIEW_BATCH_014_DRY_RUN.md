# Graduation Final Review Batch 014 Dry Run

Date: 2026-07-13  
Scope: CASE-100 / CASE-126 / CASE-136  
Production write status: not yet authorized

## Pack

- 2 new canonical architect entities; existing `kengo-kuma` reused.
- 3 new buildings.
- 3 exact open-license primary images; the Metropol Parasol and Federation Square images were localized and reduced to 1600 px while retaining their reviewed sources.
- 3 published graduation profiles.
- 7 assignments: CASE-100 `public-space`; CASE-126 `mixed-use` primary plus `public-space`, `museum`, `retail`; CASE-136 `public-space` primary plus `mixed-use`.

## Verification

- Full-history isolated PostgreSQL 18.3 replay passed through fast batch 012.
- First forward inserted exactly 2 architects / 3 buildings / 3 images / 3 profiles / 7 assignments.
- Rollback refused an injected external curated-image relation.
- Exact rollback, second forward and second rollback passed.
- Production read-only preflight found zero building-name or CASE-profile conflicts; all required functions and broad types exist.
- Migration `20260713033609_graduation_final_review_batch_014.sql` is byte-identical to the reviewed apply SQL.

## Remaining gate

Run the proportional repository checks, merge through PR, repeat production conflicts, apply the migration, audit exact rows/RLS/policies/advisors, update the production baseline and complete one Reviewed production release.
