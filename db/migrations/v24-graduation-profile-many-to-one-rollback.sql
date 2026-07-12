-- Roll back V24 only while every building still has at most one profile.

BEGIN;

DO $$
BEGIN
  IF to_regclass('public.graduation_case_profiles') IS NULL THEN
    RAISE EXCEPTION 'graduation_case_profiles is missing';
  END IF;

  IF EXISTS (
    SELECT building_id
    FROM public.graduation_case_profiles
    GROUP BY building_id
    HAVING count(*) > 1
  ) THEN
    RAISE EXCEPTION 'Rollback refused: multiple CASE profiles already reference one building';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.graduation_case_profiles'::regclass
      AND conname = 'graduation_case_profiles_building_id_key'
  ) THEN
    RAISE EXCEPTION 'Rollback refused: legacy building_id unique constraint already exists';
  END IF;
END $$;

DROP INDEX IF EXISTS public.idx_graduation_case_profiles_building_id;

ALTER TABLE public.graduation_case_profiles
  ADD CONSTRAINT graduation_case_profiles_building_id_key UNIQUE (building_id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.graduation_case_profiles'::regclass
      AND conname = 'graduation_case_profiles_building_id_key'
      AND contype = 'u'
  ) THEN
    RAISE EXCEPTION 'Legacy building_id unique constraint was not restored';
  END IF;
END $$;

COMMIT;
