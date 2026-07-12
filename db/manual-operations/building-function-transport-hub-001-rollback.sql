-- Rollback the reviewed transport-hub taxonomy only.
-- Refuses to run once any building assignment depends on the function.

BEGIN;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions
      WHERE slug = 'transport-hub'
        AND broad_type_slug = 'transportation'
        AND name_zh = '交通枢纽'
        AND name_zh_hant = '交通樞紐'
        AND name_en = 'Transport Hub'
        AND name_ja = '交通拠点'
        AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'transport-hub') <> 17 THEN
    RAISE EXCEPTION 'Rollback refused: transport-hub taxonomy rows are missing or changed';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_function_assignments WHERE function_slug = 'transport-hub') THEN
    RAISE EXCEPTION 'Rollback refused: transport-hub has building assignments';
  END IF;
END $$;

DELETE FROM public.building_function_aliases WHERE function_slug = 'transport-hub';
DELETE FROM public.building_functions WHERE slug = 'transport-hub';

COMMIT;
