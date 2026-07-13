# Graduation CASE Compatibility 001 Dry Run

Date: 2026-07-13  
Production write status: not yet authorized

## Purpose

The public catalog has 101 published CASE routes: 88 already have canonical building profiles and 13 are explicit identity/image-evidence exceptions. G9 cannot stop runtime JSON reads by inventing buildings for those exceptions or deleting their routes. This migration therefore creates a read-only Supabase compatibility table containing the exact published payload for all 101 routes. Canonical profile/building/image data will continue to override that payload for the 88 unified records.

## Verification

- Exactly 101 unique published CASE payloads are seeded; draft records are excluded.
- Payload `id` must equal the row `case_id`.
- RLS is enabled with one published-only anon/authenticated read policy; writes are revoked.
- Isolated PostgreSQL forward produced 101 rows.
- An injected 102nd row caused guarded rollback refusal.
- After removing the injected row, exact rollback and a second forward/rollback passed.
- Migration `20260713042650_graduation_case_compatibility_001.sql` is byte-identical to reviewed apply SQL.

This migration does not change runtime reads by itself. Runtime cutover is a separate PR after the production table and exact payload audit succeed.
