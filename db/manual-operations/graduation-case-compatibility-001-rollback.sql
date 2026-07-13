-- Guarded rollback for graduation CASE compatibility payload foundation.
BEGIN;

DO $$
BEGIN
  IF to_regclass('public.graduation_case_compatibility') IS NULL THEN
    RAISE EXCEPTION 'graduation_case_compatibility does not exist';
  END IF;
  IF (SELECT count(*) FROM public.graduation_case_compatibility) <> 101 THEN
    RAISE EXCEPTION 'refusing rollback: compatibility row count drifted from 101';
  END IF;
END $$;

DROP TABLE public.graduation_case_compatibility;
COMMIT;
