# Graduation KAIT Workshop Batch 009 Dry Run

Date: 2026-07-13
Scope: CASE-034 KAIT Workshop canonical building migration
Production write status: not yet authorized

## Generated target

- Create one canonical architect `junya-ishigami`.
- Create one canonical `kait-workshop` educational building.
- Create one primary interior image using the existing 1600×1200 local asset and exact Epiq / Wikimedia Commons / CC BY-SA 3.0 metadata.
- Create one published CASE-034 profile preserving its existing concept and multilingual keywords.
- Create one approved `university` primary function assignment.

## Production read-only precheck

- Existing Junya Ishigami and target architect matches: 0.
- Target building and profile conflicts: 0 each.
- Required active `university` function: 1/1; required `educational` type: 1/1.
- Baseline: 79 profiles / 933 buildings / 7282 images / 137 assignments.
- Expected after write: 80 profiles / 934 buildings / 7283 images / 138 assignments.

## Isolated PostgreSQL verification

- Replayed the graduation foundation and every prior G6 pack through Yu no Eki Ohyu, including all required function taxonomies in production order.
- First forward wrote 1 architect / 1 building / 1 image / 1 profile / 1 assignment.
- Rollback refused after an external curated-image relation was injected.
- After removing the external relation, exact rollback, second forward and second rollback all returned to the original counts.
- Supabase migration `20260713002212_graduation_kait_workshop_batch_009.sql` was created with the repository-local CLI and is byte-identical to the reviewed apply SQL.
- Existing local image verified at 1600×1200 with SHA-256 `1c467d7fd42f96314f6b4bc6fcea859f1dc5e221e1ab5156bc118c52a50e03fb`.
- Unit suite passed 59 files / 206 tests; graduation content QA reported 0 problems; typecheck, ESLint, image audit and `git diff --check` passed.

## Remaining gates

Merge by PR; repeat the production conflict precheck immediately before apply. After writing, verify exact rows/counts, orphans, architect relation, primary image/function uniqueness, CASE concept/keywords, RLS/policies, advisors, Reviewed production release and live CASE/building/image/API routes.
