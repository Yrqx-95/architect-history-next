-- Rollback the reviewed public-toilet taxonomy only.
-- Refuses to run once any building assignment depends on the function.

BEGIN;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions
      WHERE slug = 'public-toilet'
        AND broad_type_slug = 'civic-public'
        AND name_zh = '公共厕所'
        AND name_zh_hant = '公共廁所'
        AND name_en = 'Public Toilet'
        AND name_ja = '公共トイレ'
        AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'public-toilet') <> 24 THEN
    RAISE EXCEPTION 'Rollback refused: public-toilet taxonomy rows are missing or changed';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_function_assignments WHERE function_slug = 'public-toilet') THEN
    RAISE EXCEPTION 'Rollback refused: public-toilet has building assignments';
  END IF;
END $$;

DELETE FROM public.building_function_aliases WHERE function_slug = 'public-toilet';
DELETE FROM public.building_functions WHERE slug = 'public-toilet';

COMMIT;
