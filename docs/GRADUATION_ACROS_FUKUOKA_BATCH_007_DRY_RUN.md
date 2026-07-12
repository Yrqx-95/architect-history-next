# Graduation ACROS Fukuoka Batch 007 Dry Run

Date: 2026-07-13
Scope: CASE-016 ACROS Fukuoka canonical building migration
Production write status: not yet authorized

## Generated target

- Create one joint formal-design architect `baa3c8bf-786a-504c-9d19-55a9ec029db7` / `nihon-sekkei-takenaka-corporation`.
- Create one canonical `acros-fukuoka` building. The building evidence preserves Emilio Ambasz as a basic-concept contributor while the canonical architect represents the official Nihon Sekkei + Takenaka Corporation design role.
- Create one primary exterior image using the existing 1600×1071 local asset and exact Kenta Mabuchi / Wikimedia Commons / CC BY-SA 2.0 metadata.
- Create one published CASE-016 profile preserving its existing concept and multilingual keywords.
- Create four approved functions: `mixed-use` primary; `theatre`, `retail` and `public-space` secondary.

## Production read-only precheck

- Existing Takenaka architect exact match: 1; existing Nihon Sekkei and target joint architect matches: 0.
- Target building and profile conflicts: 0 each.
- Required active functions: 4/4; required `mixed-use` type: 1/1.
- Baseline: 77 profiles / 931 buildings / 7280 images / 129 assignments.
- Expected after write: 78 profiles / 932 buildings / 7281 images / 133 assignments.

## Isolated PostgreSQL verification

- Replayed the graduation foundation and every prior G6 pack through Shiroiya Hotel, including transport, public-space, public-toilet, retail and hotel taxonomies in production order.
- First forward wrote 1 architect / 1 building / 1 image / 1 profile / 4 assignments.
- Rollback refused after an external curated-image relation was injected.
- After removing the external relation, exact rollback, second forward and second rollback all returned to the original counts.
- Supabase migration `20260712153311_graduation_acros_fukuoka_batch_007.sql` was created with the repository-local CLI and is byte-identical to the reviewed apply SQL.
- Existing local image verified at 1600×1071 with SHA-256 `727d509be398b9d841055476dbd0c6ca9e59c637e0a6df37fe84f1cb8345666b`.
- Unit suite, graduation content QA, typecheck, ESLint, image audit and `git diff --check` passed. The complete E2E suite passed 18/19; the only failure is the pre-existing concurrent `src/lib/architect-content.ts` change that promotes Aldo Rossi beyond fallback while the protected test still expects the fallback maturity note. This batch neither modifies nor stages that file.

## Remaining gates

Merge by PR; repeat the production conflict precheck immediately before apply. After writing, verify exact rows/counts, orphans, architect relation, primary image/function uniqueness, CASE concept/keywords, RLS/policies, advisors, Reviewed production release and live CASE/building/image/API routes. The unrelated Aldo Rossi E2E baseline must remain owned by the concurrent architect-content lane.
