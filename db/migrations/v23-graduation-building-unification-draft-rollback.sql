-- ============================================================
-- V23 DRAFT rollback: Graduation case / building unification foundation
--
-- Drops only structures introduced by the V23 draft. It never deletes or
-- modifies canonical buildings, architects, images, or building_types.
-- ============================================================

BEGIN;

DROP TABLE IF EXISTS public.building_function_assignments;
DROP TABLE IF EXISTS public.building_function_aliases;
DROP TABLE IF EXISTS public.building_functions;
DROP TABLE IF EXISTS public.graduation_case_profiles;
DROP FUNCTION IF EXISTS public.set_archistory_updated_at();

COMMIT;
