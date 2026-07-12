-- Add the reviewed multilingual public-space function required by G6 urban public-space batch 001.
-- No building or graduation profile rows are changed by this migration.

BEGIN;

DO $$
BEGIN
  IF to_regclass('public.building_functions') IS NULL
    OR to_regclass('public.building_function_aliases') IS NULL
    OR to_regclass('public.building_types') IS NULL THEN
    RAISE EXCEPTION 'Public-space taxonomy prerequisites are missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.building_types WHERE slug = 'public-space') THEN
    RAISE EXCEPTION 'Required public-space building type is missing';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_functions WHERE slug = 'public-space') THEN
    RAISE EXCEPTION 'public-space function already exists';
  END IF;
  IF EXISTS (
    SELECT 1
    FROM public.building_function_aliases
    WHERE (locale, normalized_alias) IN (
      ('zh', '公共空间'), ('zh', '城市公共空间'), ('zh', '公园'), ('zh', '广场'), ('zh', '滨水步道'), ('zh', '线性公园'),
      ('zh-Hant', '公共空間'), ('zh-Hant', '城市公共空間'), ('zh-Hant', '公園'), ('zh-Hant', '廣場'), ('zh-Hant', '濱水步道'), ('zh-Hant', '線性公園'),
      ('en', 'public space'), ('en', 'urban public space'), ('en', 'park'), ('en', 'plaza'), ('en', 'promenade'), ('en', 'waterfront promenade'), ('en', 'linear park'),
      ('ja', '公共空間'), ('ja', '都市公共空間'), ('ja', '公園'), ('ja', '広場'), ('ja', '水辺遊歩道'), ('ja', 'プロムナード'), ('ja', '線形公園')
    )
  ) THEN
    RAISE EXCEPTION 'public-space alias conflicts with existing taxonomy';
  END IF;
END $$;

INSERT INTO public.building_functions (
  slug, broad_type_slug, name_zh, name_zh_hant, name_en, name_ja, is_active
) VALUES (
  'public-space', 'public-space', '公共空间', '公共空間', 'Public Space', '公共空間', true
);

INSERT INTO public.building_function_aliases (function_slug, locale, alias) VALUES
  ('public-space', 'zh', '公共空间'),
  ('public-space', 'zh', '城市公共空间'),
  ('public-space', 'zh', '公园'),
  ('public-space', 'zh', '广场'),
  ('public-space', 'zh', '滨水步道'),
  ('public-space', 'zh', '线性公园'),
  ('public-space', 'zh-Hant', '公共空間'),
  ('public-space', 'zh-Hant', '城市公共空間'),
  ('public-space', 'zh-Hant', '公園'),
  ('public-space', 'zh-Hant', '廣場'),
  ('public-space', 'zh-Hant', '濱水步道'),
  ('public-space', 'zh-Hant', '線性公園'),
  ('public-space', 'en', 'public space'),
  ('public-space', 'en', 'urban public space'),
  ('public-space', 'en', 'park'),
  ('public-space', 'en', 'plaza'),
  ('public-space', 'en', 'promenade'),
  ('public-space', 'en', 'waterfront promenade'),
  ('public-space', 'en', 'linear park'),
  ('public-space', 'ja', '公共空間'),
  ('public-space', 'ja', '都市公共空間'),
  ('public-space', 'ja', '公園'),
  ('public-space', 'ja', '広場'),
  ('public-space', 'ja', '水辺遊歩道'),
  ('public-space', 'ja', 'プロムナード'),
  ('public-space', 'ja', '線形公園');

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions WHERE slug = 'public-space' AND broad_type_slug = 'public-space' AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'public-space') <> 26
    OR (SELECT count(DISTINCT locale) FROM public.building_function_aliases WHERE function_slug = 'public-space') <> 4 THEN
    RAISE EXCEPTION 'public-space taxonomy post-write verification failed';
  END IF;
END $$;

COMMIT;
