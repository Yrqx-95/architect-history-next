-- ============================================================
-- V24: Allow multiple graduation analyses per canonical building.
--
-- CASE IDs remain unique route identities. A building may be referenced by
-- more than one CASE profile when the graduation archive contains distinct
-- analyses of the same built project.
-- ============================================================

BEGIN;

DO $$
BEGIN
  IF to_regclass('public.graduation_case_profiles') IS NULL THEN
    RAISE EXCEPTION 'graduation_case_profiles is missing';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.graduation_case_profiles'::regclass
      AND conname = 'graduation_case_profiles_pkey'
      AND contype = 'p'
  ) THEN
    RAISE EXCEPTION 'CASE primary key is missing';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.graduation_case_profiles'::regclass
      AND conname = 'graduation_case_profiles_building_id_fkey'
      AND contype = 'f'
  ) THEN
    RAISE EXCEPTION 'Canonical building foreign key is missing';
  END IF;
END $$;

ALTER TABLE public.graduation_case_profiles
  DROP CONSTRAINT IF EXISTS graduation_case_profiles_building_id_key;

CREATE INDEX IF NOT EXISTS idx_graduation_case_profiles_building_id
  ON public.graduation_case_profiles(building_id);

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.graduation_case_profiles'::regclass
      AND conname = 'graduation_case_profiles_building_id_key'
  ) THEN
    RAISE EXCEPTION 'building_id unique constraint still exists';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND tablename = 'graduation_case_profiles'
      AND indexname = 'idx_graduation_case_profiles_building_id'
      AND indexdef NOT LIKE 'CREATE UNIQUE INDEX%'
  ) THEN
    RAISE EXCEPTION 'Non-unique building_id lookup index is missing';
  END IF;
END $$;

COMMIT;
