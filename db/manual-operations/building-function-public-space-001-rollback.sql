-- Rollback the reviewed public-space taxonomy only.
-- Refuses to run once any building assignment depends on the function.

BEGIN;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions
      WHERE slug = 'public-space'
        AND broad_type_slug = 'public-space'
        AND name_zh = '公共空间'
        AND name_zh_hant = '公共空間'
        AND name_en = 'Public Space'
        AND name_ja = '公共空間'
        AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'public-space') <> 26 THEN
    RAISE EXCEPTION 'Rollback refused: public-space taxonomy rows are missing or changed';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_function_assignments WHERE function_slug = 'public-space') THEN
    RAISE EXCEPTION 'Rollback refused: public-space has building assignments';
  END IF;
END $$;

DELETE FROM public.building_function_aliases WHERE function_slug = 'public-space';
DELETE FROM public.building_functions WHERE slug = 'public-space';

COMMIT;
