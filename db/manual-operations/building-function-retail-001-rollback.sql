-- Rollback the reviewed retail taxonomy only.
-- Refuses to run once any building assignment depends on the function.

BEGIN;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions
      WHERE slug = 'retail'
        AND broad_type_slug = 'commercial'
        AND name_zh = '零售商业'
        AND name_zh_hant = '零售商業'
        AND name_en = 'Retail'
        AND name_ja = '小売施設'
        AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'retail') <> 20 THEN
    RAISE EXCEPTION 'Rollback refused: retail taxonomy rows are missing or changed';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_function_assignments WHERE function_slug = 'retail') THEN
    RAISE EXCEPTION 'Rollback refused: retail has building assignments';
  END IF;
END $$;

DELETE FROM public.building_function_aliases WHERE function_slug = 'retail';
DELETE FROM public.building_functions WHERE slug = 'retail';

COMMIT;
