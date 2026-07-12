-- Add the reviewed multilingual retail function required by G6 Shimokitazawa retail batch 001.
-- No building or graduation profile rows are changed by this migration.

BEGIN;

DO $$
BEGIN
  IF to_regclass('public.building_functions') IS NULL
    OR to_regclass('public.building_function_aliases') IS NULL
    OR to_regclass('public.building_types') IS NULL THEN
    RAISE EXCEPTION 'Retail taxonomy prerequisites are missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.building_types WHERE slug = 'commercial') THEN
    RAISE EXCEPTION 'Required commercial building type is missing';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_functions WHERE slug = 'retail') THEN
    RAISE EXCEPTION 'retail function already exists';
  END IF;
  IF EXISTS (
    SELECT 1
    FROM public.building_function_aliases
    WHERE (locale, normalized_alias) IN (
      ('zh', '零售商业'), ('zh', '零售设施'), ('zh', '商业设施'), ('zh', '购物中心'), ('zh', '商业街'),
      ('zh-Hant', '零售商業'), ('zh-Hant', '零售設施'), ('zh-Hant', '商業設施'), ('zh-Hant', '購物中心'), ('zh-Hant', '商業街'),
      ('en', 'retail'), ('en', 'retail facility'), ('en', 'retail complex'), ('en', 'shopping complex'), ('en', 'shopping street'),
      ('ja', '小売施設'), ('ja', '商業施設'), ('ja', 'ショッピングセンター'), ('ja', '商業複合施設'), ('ja', '商店街')
    )
  ) THEN
    RAISE EXCEPTION 'retail alias conflicts with existing taxonomy';
  END IF;
END $$;

INSERT INTO public.building_functions (
  slug, broad_type_slug, name_zh, name_zh_hant, name_en, name_ja, is_active
) VALUES (
  'retail', 'commercial', '零售商业', '零售商業', 'Retail', '小売施設', true
);

INSERT INTO public.building_function_aliases (function_slug, locale, alias) VALUES
  ('retail', 'zh', '零售商业'),
  ('retail', 'zh', '零售设施'),
  ('retail', 'zh', '商业设施'),
  ('retail', 'zh', '购物中心'),
  ('retail', 'zh', '商业街'),
  ('retail', 'zh-Hant', '零售商業'),
  ('retail', 'zh-Hant', '零售設施'),
  ('retail', 'zh-Hant', '商業設施'),
  ('retail', 'zh-Hant', '購物中心'),
  ('retail', 'zh-Hant', '商業街'),
  ('retail', 'en', 'retail'),
  ('retail', 'en', 'retail facility'),
  ('retail', 'en', 'retail complex'),
  ('retail', 'en', 'shopping complex'),
  ('retail', 'en', 'shopping street'),
  ('retail', 'ja', '小売施設'),
  ('retail', 'ja', '商業施設'),
  ('retail', 'ja', 'ショッピングセンター'),
  ('retail', 'ja', '商業複合施設'),
  ('retail', 'ja', '商店街');

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions WHERE slug = 'retail' AND broad_type_slug = 'commercial' AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'retail') <> 20
    OR (SELECT count(DISTINCT locale) FROM public.building_function_aliases WHERE function_slug = 'retail') <> 4 THEN
    RAISE EXCEPTION 'retail taxonomy post-write verification failed';
  END IF;
END $$;

COMMIT;
