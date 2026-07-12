-- Add the reviewed multilingual hotel function required by G6 Shiroiya Hotel batch 006.
-- No building or graduation profile rows are changed by this migration.

BEGIN;

DO $$
BEGIN
  IF to_regclass('public.building_functions') IS NULL
    OR to_regclass('public.building_function_aliases') IS NULL
    OR to_regclass('public.building_types') IS NULL THEN
    RAISE EXCEPTION 'Hotel taxonomy prerequisites are missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.building_types WHERE slug = 'commercial') THEN
    RAISE EXCEPTION 'Required commercial building type is missing';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_functions WHERE slug = 'hotel') THEN
    RAISE EXCEPTION 'hotel function already exists';
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.building_function_aliases
    WHERE (locale, normalized_alias) IN (
      ('zh', '酒店'), ('zh', '旅馆'), ('zh', '宾馆'), ('zh', '住宿设施'), ('zh', '精品酒店'),
      ('zh-Hant', '酒店'), ('zh-Hant', '旅館'), ('zh-Hant', '賓館'), ('zh-Hant', '住宿設施'), ('zh-Hant', '精品酒店'),
      ('en', 'hotel'), ('en', 'hotels'), ('en', 'hospitality'), ('en', 'lodging'), ('en', 'boutique hotel'),
      ('ja', 'ホテル'), ('ja', '宿泊施設'), ('ja', '旅館'), ('ja', 'ブティックホテル'), ('ja', 'デザインホテル')
    )
  ) THEN
    RAISE EXCEPTION 'hotel alias conflicts with existing taxonomy';
  END IF;
END $$;

INSERT INTO public.building_functions (
  slug, broad_type_slug, name_zh, name_zh_hant, name_en, name_ja, is_active
) VALUES (
  'hotel', 'commercial', '酒店', '酒店', 'Hotel', 'ホテル', true
);

INSERT INTO public.building_function_aliases (function_slug, locale, alias) VALUES
  ('hotel', 'zh', '酒店'),
  ('hotel', 'zh', '旅馆'),
  ('hotel', 'zh', '宾馆'),
  ('hotel', 'zh', '住宿设施'),
  ('hotel', 'zh', '精品酒店'),
  ('hotel', 'zh-Hant', '酒店'),
  ('hotel', 'zh-Hant', '旅館'),
  ('hotel', 'zh-Hant', '賓館'),
  ('hotel', 'zh-Hant', '住宿設施'),
  ('hotel', 'zh-Hant', '精品酒店'),
  ('hotel', 'en', 'hotel'),
  ('hotel', 'en', 'hotels'),
  ('hotel', 'en', 'hospitality'),
  ('hotel', 'en', 'lodging'),
  ('hotel', 'en', 'boutique hotel'),
  ('hotel', 'ja', 'ホテル'),
  ('hotel', 'ja', '宿泊施設'),
  ('hotel', 'ja', '旅館'),
  ('hotel', 'ja', 'ブティックホテル'),
  ('hotel', 'ja', 'デザインホテル');

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions WHERE slug = 'hotel' AND broad_type_slug = 'commercial' AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'hotel') <> 20
    OR (SELECT count(DISTINCT locale) FROM public.building_function_aliases WHERE function_slug = 'hotel') <> 4 THEN
    RAISE EXCEPTION 'hotel taxonomy post-write verification failed';
  END IF;
END $$;

COMMIT;
