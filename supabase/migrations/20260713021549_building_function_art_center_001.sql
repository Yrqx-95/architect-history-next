-- Add the reviewed multilingual art-center function required by G6 CASE-005.
-- No building or graduation profile rows are changed by this migration.

BEGIN;

DO $$
BEGIN
  IF to_regclass('public.building_functions') IS NULL
    OR to_regclass('public.building_function_aliases') IS NULL
    OR to_regclass('public.building_types') IS NULL THEN
    RAISE EXCEPTION 'Art-center taxonomy prerequisites are missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.building_types WHERE slug = 'cultural') THEN
    RAISE EXCEPTION 'Required cultural building type is missing';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_functions WHERE slug = 'art-center') THEN
    RAISE EXCEPTION 'art-center function already exists';
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.building_function_aliases
    WHERE (locale, normalized_alias) IN (
      ('zh', '艺术中心'),
      ('zh-Hant', '藝術中心'),
      ('en', 'art center'), ('en', 'arts center'), ('en', 'art centre'), ('en', 'arts centre'),
      ('ja', 'アートセンター'), ('ja', '芸術センター')
    )
  ) THEN
    RAISE EXCEPTION 'art-center alias conflicts with existing taxonomy';
  END IF;
END $$;

INSERT INTO public.building_functions (
  slug, broad_type_slug, name_zh, name_zh_hant, name_en, name_ja, is_active
) VALUES (
  'art-center', 'cultural', '艺术中心', '藝術中心', 'Art Center', 'アートセンター', true
);

INSERT INTO public.building_function_aliases (function_slug, locale, alias) VALUES
  ('art-center', 'zh', '艺术中心'),
  ('art-center', 'zh-Hant', '藝術中心'),
  ('art-center', 'en', 'art center'),
  ('art-center', 'en', 'arts center'),
  ('art-center', 'en', 'art centre'),
  ('art-center', 'en', 'arts centre'),
  ('art-center', 'ja', 'アートセンター'),
  ('art-center', 'ja', '芸術センター');

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions WHERE slug = 'art-center' AND broad_type_slug = 'cultural' AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'art-center') <> 8
    OR (SELECT count(DISTINCT locale) FROM public.building_function_aliases WHERE function_slug = 'art-center') <> 4 THEN
    RAISE EXCEPTION 'art-center taxonomy post-write verification failed';
  END IF;
END $$;

COMMIT;
