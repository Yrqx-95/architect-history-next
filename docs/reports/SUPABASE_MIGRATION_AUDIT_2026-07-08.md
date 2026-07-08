# Supabase Migration Audit 2026-07-08

Purpose: record the production Supabase migration and schema state after the repository cleanup.

## Project

- Project ref: `usuqjsjluietcnudxwvz`
- Production URL host: `usuqjsjluietcnudxwvz.supabase.co`
- Local CLI status: `supabase` CLI and `psql` were not installed locally.
- Audit method: Supabase MCP read-only SQL, advisors, runtime API checks, and project scripts.

## Migration History

Production migration history initially contained only:

- `20260612162851 lock_down_public_read_permissions_v2`
- `20260612164824 revoke_public_postgis_metadata_access`

The repository `db/migrations/v*.sql` files are therefore not a clean Supabase CLI migration chain. They are best treated as maintained reconstruction / operational SQL unless a matching production migration history entry exists.

After remediation, production migration history also contains:

- `20260708145719 reconcile_knowledge_os_persistence`
- `20260708145728 revoke_public_postgis_metadata_access_v2`

## Production Schema Findings

Core archive tables exist and are protected with RLS plus one public read policy each:

- `architects`
- `buildings`
- `images`
- `styles`
- `eras`
- `building_types`
- `architect_styles`
- `building_styles`
- `architect_eras`
- `building_eras`
- `style_eras`
- `architect_influences`
- `sources`
- `tags`

Missing before remediation:

- `claims`
- `claim_sources`
- `ai_citation_events`
- `user_events`
- `curated_images`

`curated_images` is not used by the current runtime. The current image workflow reads from `images` plus local image override files.

After `reconcile_knowledge_os_persistence`, these tables exist with RLS enabled:

- `sources`
- `claims`
- `claim_sources`
- `ai_citation_events`
- `user_events`

Public read policies exist only where needed:

- `sources`
- `claims`
- `claim_sources`

`ai_citation_events` and `user_events` intentionally have RLS enabled and no public policy.

## Data Health Snapshot

`npm run data:audit` completed and produced:

- errors: `0`
- warnings: `1297`
- info: `2490`
- total issues: `3787`

Important production counts:

- `architects`: `106`
- `buildings`: `875`
- `images`: `7276`
- `styles`: `43`
- `eras`: `12`
- `building_types`: `20`

Building metadata gaps:

- missing `country_code`: `52`
- missing `type_slug`: `352`
- missing `era_slug`: `875`
- missing architect reference: `17`

These are content-quality gaps, not deployment blockers.

## API Verification

Production API checks passed:

- `GET /api/v1/buildings/asakusa-culture-center` returned `200`.
- `POST /api/v1/grounding/query` returned `200` and generated derived evidence.
- `GET /api/v1/claims/test` returned expected `404`, not a server error.
- `GET /api/v1/sources/test` returned expected `404`, not a server error.

Current Knowledge OS API derives claims and sources from archive data at runtime. It does not require the persisted `claims` tables yet.

## Advisor Findings

Security advisor initially reported:

- `public.spatial_ref_sys` has RLS disabled.
- `cube`, `earthdistance`, `pg_trgm`, and `postgis` are installed in `public`.
- `public.st_estimatedextent(...)` was executable by `anon` and `authenticated`.

Performance advisor reported:

- 4 unindexed foreign-key notices.
- several unused-index notices.

The PostGIS-in-public warnings are not a small migration. Supabase docs recommend installing PostGIS into a separate schema for new projects. Existing projects may require a deliberate extension-move plan, so this audit does not move PostGIS.

## Remediation Added

Added two local SQL files:

- `db/migrations/v13-reconcile-knowledge-os-persistence.sql`
- `db/migrations/v14-revoke-public-postgis-metadata-access-v2.sql`

Applied to production through Supabase MCP as:

- `reconcile_knowledge_os_persistence`
- `revoke_public_postgis_metadata_access_v2`

Verified result:

- Knowledge OS persistence tables were created successfully.
- `sources` was reconciled in-place instead of being dropped or recreated.
- Data API with the anon key can read `claims` and `claim_sources`, currently returning empty arrays.
- Data API with the anon key is denied on `user_events` and `ai_citation_events`, returning `401 permission denied`.
- The second PostGIS revoke migration was recorded, but direct permission checks still show `anon` and `authenticated` can access `public.spatial_ref_sys` and execute `public.st_estimatedextent(...)`.

Interpretation:

- The PostGIS objects appear to be extension-owned by `supabase_admin`; the MCP migration role could record the migration but could not effectively remove those ACL entries.
- This matches current Supabase/PostGIS guidance: new projects should install PostGIS into a separate schema, while moving an existing extension is a larger operational task.

## Remaining Risk

- `curated_images` remains absent because the current runtime does not use it.
- PostGIS extension objects still live in `public`; moving them is a separate, higher-risk operation.
- `spatial_ref_sys` and `st_estimatedextent(...)` still appear in Supabase Advisor after the revoke attempt.
- Performance advisor now also reports unused indexes on the newly created empty Knowledge OS tables. This is expected until those tables receive real traffic.
- `era_slug`, `type_slug`, and country-code coverage still need controlled data batches.

## Recommended Next Step

Do not start by moving PostGIS. Treat that as a separate support-backed operation if it becomes necessary.

The next useful database batch is content metadata quality:

1. Fill `era_slug` in controlled batches.
2. Continue `type_slug` normalization for high-confidence records.
3. Add missing country codes only where source evidence is clear.
