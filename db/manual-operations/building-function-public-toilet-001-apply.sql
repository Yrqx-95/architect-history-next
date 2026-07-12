-- Add the reviewed multilingual public-toilet function required by G6 public-toilet batch 001.
-- No building or graduation profile rows are changed by this migration.

BEGIN;

DO $$
BEGIN
  IF to_regclass('public.building_functions') IS NULL
    OR to_regclass('public.building_function_aliases') IS NULL
    OR to_regclass('public.building_types') IS NULL THEN
    RAISE EXCEPTION 'Public-toilet taxonomy prerequisites are missing';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.building_types WHERE slug = 'civic-public') THEN
    RAISE EXCEPTION 'Required civic-public building type is missing';
  END IF;
  IF EXISTS (SELECT 1 FROM public.building_functions WHERE slug = 'public-toilet') THEN
    RAISE EXCEPTION 'public-toilet function already exists';
  END IF;
  IF EXISTS (
    SELECT 1
    FROM public.building_function_aliases
    WHERE (locale, normalized_alias) IN (
      ('zh', '公共厕所'), ('zh', '公厕'), ('zh', '公共卫生间'), ('zh', '公共洗手间'), ('zh', '公共便所'), ('zh', '城市公厕'),
      ('zh-Hant', '公共廁所'), ('zh-Hant', '公廁'), ('zh-Hant', '公共衛生間'), ('zh-Hant', '公共洗手間'), ('zh-Hant', '公共便所'), ('zh-Hant', '城市公廁'),
      ('en', 'public toilet'), ('en', 'public restroom'), ('en', 'restroom'), ('en', 'washroom'), ('en', 'public lavatory'), ('en', 'civic toilet'),
      ('ja', '公共トイレ'), ('ja', '公衆トイレ'), ('ja', '公衆便所'), ('ja', '公共便所'), ('ja', 'パブリックトイレ'), ('ja', '公園トイレ')
    )
  ) THEN
    RAISE EXCEPTION 'public-toilet alias conflicts with existing taxonomy';
  END IF;
END $$;

INSERT INTO public.building_functions (
  slug, broad_type_slug, name_zh, name_zh_hant, name_en, name_ja, is_active
) VALUES (
  'public-toilet', 'civic-public', '公共厕所', '公共廁所', 'Public Toilet', '公共トイレ', true
);

INSERT INTO public.building_function_aliases (function_slug, locale, alias) VALUES
  ('public-toilet', 'zh', '公共厕所'),
  ('public-toilet', 'zh', '公厕'),
  ('public-toilet', 'zh', '公共卫生间'),
  ('public-toilet', 'zh', '公共洗手间'),
  ('public-toilet', 'zh', '公共便所'),
  ('public-toilet', 'zh', '城市公厕'),
  ('public-toilet', 'zh-Hant', '公共廁所'),
  ('public-toilet', 'zh-Hant', '公廁'),
  ('public-toilet', 'zh-Hant', '公共衛生間'),
  ('public-toilet', 'zh-Hant', '公共洗手間'),
  ('public-toilet', 'zh-Hant', '公共便所'),
  ('public-toilet', 'zh-Hant', '城市公廁'),
  ('public-toilet', 'en', 'public toilet'),
  ('public-toilet', 'en', 'public restroom'),
  ('public-toilet', 'en', 'restroom'),
  ('public-toilet', 'en', 'washroom'),
  ('public-toilet', 'en', 'public lavatory'),
  ('public-toilet', 'en', 'civic toilet'),
  ('public-toilet', 'ja', '公共トイレ'),
  ('public-toilet', 'ja', '公衆トイレ'),
  ('public-toilet', 'ja', '公衆便所'),
  ('public-toilet', 'ja', '公共便所'),
  ('public-toilet', 'ja', 'パブリックトイレ'),
  ('public-toilet', 'ja', '公園トイレ');

DO $$
BEGIN
  IF (SELECT count(*) FROM public.building_functions WHERE slug = 'public-toilet' AND broad_type_slug = 'civic-public' AND is_active) <> 1
    OR (SELECT count(*) FROM public.building_function_aliases WHERE function_slug = 'public-toilet') <> 24
    OR (SELECT count(DISTINCT locale) FROM public.building_function_aliases WHERE function_slug = 'public-toilet') <> 4 THEN
    RAISE EXCEPTION 'public-toilet taxonomy post-write verification failed';
  END IF;
END $$;

COMMIT;
