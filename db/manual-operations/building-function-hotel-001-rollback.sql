-- Rollback the reviewed hotel taxonomy only.
-- Refuses to run once any building assignment depends on the function.

BEGIN;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions
      WHERE slug = 'hotel'
        AND broad_type_slug = 'commercial'
        AND name_zh = '酒店'
        AND name_zh_hant = '酒店'
        AND name_en = 'Hotel'
        AND name_ja = 'ホテル'
        AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'hotel') <> 20 THEN
    RAISE EXCEPTION 'Rollback refused: hotel taxonomy rows are missing or changed';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_function_assignments WHERE function_slug = 'hotel') THEN
    RAISE EXCEPTION 'Rollback refused: hotel has building assignments';
  END IF;
END $$;

DELETE FROM public.building_function_aliases WHERE function_slug = 'hotel';
DELETE FROM public.building_functions WHERE slug = 'hotel';

COMMIT;
