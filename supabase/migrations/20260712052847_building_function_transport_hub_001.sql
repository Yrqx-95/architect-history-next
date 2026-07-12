-- Reviewed G6 transport taxonomy prerequisite.
-- Source pack: db/manual-operations/building-function-transport-hub-001-apply.sql

DO $$
BEGIN
  IF to_regclass('public.building_functions') IS NULL
    OR to_regclass('public.building_function_aliases') IS NULL
    OR to_regclass('public.building_types') IS NULL THEN
    RAISE EXCEPTION 'Transport-hub taxonomy prerequisites are missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.building_types WHERE slug = 'transportation') THEN
    RAISE EXCEPTION 'Required transportation building type is missing';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_functions WHERE slug = 'transport-hub') THEN
    RAISE EXCEPTION 'transport-hub function already exists';
  END IF;
  IF EXISTS (
    SELECT 1 FROM public.building_function_aliases
    WHERE (locale, normalized_alias) IN (
      ('zh', '交通枢纽'), ('zh', '车站'), ('zh', '客运站'), ('zh', '客运码头'),
      ('zh-Hant', '交通樞紐'), ('zh-Hant', '車站'), ('zh-Hant', '客運站'), ('zh-Hant', '客運碼頭'),
      ('en', 'transport hub'), ('en', 'transportation hub'), ('en', 'station'), ('en', 'passenger terminal'), ('en', 'cruise terminal'),
      ('ja', '交通拠点'), ('ja', '駅'), ('ja', '旅客ターミナル'), ('ja', '客船ターミナル')
    )
  ) THEN
    RAISE EXCEPTION 'transport-hub alias conflicts with existing taxonomy';
  END IF;
END $$;

INSERT INTO public.building_functions (
  slug, broad_type_slug, name_zh, name_zh_hant, name_en, name_ja, is_active
) VALUES (
  'transport-hub', 'transportation', '交通枢纽', '交通樞紐', 'Transport Hub', '交通拠点', true
);

INSERT INTO public.building_function_aliases (function_slug, locale, alias) VALUES
  ('transport-hub', 'zh', '交通枢纽'),
  ('transport-hub', 'zh', '车站'),
  ('transport-hub', 'zh', '客运站'),
  ('transport-hub', 'zh', '客运码头'),
  ('transport-hub', 'zh-Hant', '交通樞紐'),
  ('transport-hub', 'zh-Hant', '車站'),
  ('transport-hub', 'zh-Hant', '客運站'),
  ('transport-hub', 'zh-Hant', '客運碼頭'),
  ('transport-hub', 'en', 'transport hub'),
  ('transport-hub', 'en', 'transportation hub'),
  ('transport-hub', 'en', 'station'),
  ('transport-hub', 'en', 'passenger terminal'),
  ('transport-hub', 'en', 'cruise terminal'),
  ('transport-hub', 'ja', '交通拠点'),
  ('transport-hub', 'ja', '駅'),
  ('transport-hub', 'ja', '旅客ターミナル'),
  ('transport-hub', 'ja', '客船ターミナル');

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions WHERE slug = 'transport-hub' AND broad_type_slug = 'transportation' AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'transport-hub') <> 17
    OR (SELECT count(DISTINCT locale) FROM public.building_function_aliases WHERE function_slug = 'transport-hub') <> 4 THEN
    RAISE EXCEPTION 'transport-hub taxonomy post-write verification failed';
  END IF;
END $$;
