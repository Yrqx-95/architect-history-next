-- Rollback the reviewed art-center taxonomy only.
-- Refuses to run once any building assignment depends on the function.

BEGIN;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions
      WHERE slug = 'art-center'
        AND broad_type_slug = 'cultural'
        AND name_zh = '艺术中心'
        AND name_zh_hant = '藝術中心'
        AND name_en = 'Art Center'
        AND name_ja = 'アートセンター'
        AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'art-center') <> 8 THEN
    RAISE EXCEPTION 'Rollback refused: art-center taxonomy rows are missing or changed';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_function_assignments WHERE function_slug = 'art-center') THEN
    RAISE EXCEPTION 'Rollback refused: art-center has building assignments';
  END IF;
END $$;

DELETE FROM public.building_function_aliases WHERE function_slug = 'art-center';
DELETE FROM public.building_functions WHERE slug = 'art-center';

COMMIT;
