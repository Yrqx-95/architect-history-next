-- ============================================================
-- V14: Revoke public PostGIS metadata access, second pass
--
-- Intent:
-- - Remove anon/authenticated access to PostGIS-owned metadata tables in public.
-- - Remove anon/authenticated execute access to public.st_estimatedextent.
-- - Avoid moving the PostGIS extension, which is a larger operational change.
--
-- Applied to Supabase project usuqjsjluietcnudxwvz on 2026-07-08 as
-- migration `revoke_public_postgis_metadata_access_v2`.
--
-- Follow-up verification on 2026-07-08 showed these ACL entries still remain
-- executable/readable for anon/authenticated. The objects are extension-owned
-- by supabase_admin, so resolving this likely requires a dedicated PostGIS
-- extension migration or Supabase support rather than another simple REVOKE.
-- ============================================================

BEGIN;

REVOKE ALL PRIVILEGES ON TABLE public.geography_columns FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.geometry_columns FROM PUBLIC, anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.spatial_ref_sys FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.st_estimatedextent(text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.st_estimatedextent(text, text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.st_estimatedextent(text, text, text, boolean) FROM PUBLIC, anon, authenticated;

COMMIT;
