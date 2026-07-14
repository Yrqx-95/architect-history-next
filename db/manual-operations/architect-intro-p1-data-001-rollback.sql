-- Roll back architect introductory P1 data repair 001.
--
-- This operation refuses to overwrite any later edit to the reviewed fields.
-- It restores the exact pre-migration values and timestamps; it does not touch
-- slugs, images, types, architect_slug or architect_id.

BEGIN;

CREATE TEMP TABLE architect_intro_p1_architect_rollback_seed (
  id uuid PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  current_name_zh text NOT NULL,
  current_name_ja text NOT NULL,
  current_official_url text NOT NULL,
  original_name_zh text,
  original_name_ja text,
  original_official_url text,
  original_updated_at timestamptz NOT NULL
) ON COMMIT DROP;

INSERT INTO architect_intro_p1_architect_rollback_seed VALUES
  ('fdbf1205-9bb9-46b4-aef8-c58cc15d6cbb', 'anna-heringer', '安娜·赫林格', 'アンナ・ヘリンガー', 'https://www.anna-heringer.com/', '', '', NULL, '2026-05-24T00:40:28.647253+00:00'),
  ('6f935355-56b9-4d88-b71e-617fafaf4798', 'geoffrey-bawa', '杰弗里·巴瓦', 'ジェフリー・バワ', 'https://geoffreybawa.com/', '喬佛瑞·包瓦', 'ジェフリー・バワ', NULL, '2026-05-23T17:07:34.894891+00:00'),
  ('6f918395-d66d-45ba-b68f-85d161f947f0', 'pierre-chareau', '皮埃尔·夏洛', 'ピエール・シャロー', 'https://www.centrepompidou.fr/fr/ressources/personne/cjyyKbM', '', 'ピエール・シャロー', NULL, '2026-05-23T17:09:09.633822+00:00'),
  ('cdf50a7a-f6f3-4d65-b04e-51db2cc8a890', 'studio-mumbai', 'Studio Mumbai', 'スタジオ・ムンバイ', 'https://studiomumbai.com/', '', '', NULL, '2026-05-24T00:40:19.695417+00:00'),
  ('24686f23-fd8c-4c80-9977-4e8f2ea5c930', 'tod-williams-billie-tsien-architects', 'Tod Williams Billie Tsien Architects', 'トッド・ウィリアムズ・ビリー・ツィアン建築事務所', 'https://twbta.com/', '陶德·威廉斯·比利·簡建築事務所', 'ビリー・ツィン', NULL, '2026-05-23T15:38:00.915463+00:00'),
  ('6baf6323-e506-4691-8020-a3236b87806e', 'vo-trong-nghia', '武重义', 'ヴォ・チョン・ギア', 'http://vtnarchitects.net/', '武重義', 'ヴォ・チョン・ギア', NULL, '2026-05-24T01:10:11.244858+00:00');

CREATE TEMP TABLE architect_intro_p1_building_rollback_seed (
  id uuid PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  architect_slug text NOT NULL,
  current_name_zh text NOT NULL,
  current_name_ja text NOT NULL,
  current_year_start integer,
  current_year_end integer,
  current_city text NOT NULL,
  current_country text NOT NULL,
  current_country_code text NOT NULL,
  current_official_url text NOT NULL,
  original_name_zh text,
  original_name_ja text,
  original_year_start integer,
  original_year_end integer,
  original_city text,
  original_country text,
  original_country_code text,
  original_official_url text,
  original_updated_at timestamptz NOT NULL
) ON COMMIT DROP;

INSERT INTO architect_intro_p1_building_rollback_seed VALUES
  (
    '46fbc372-2931-4001-b6fe-4d54ec4c1ec6', 'barack-obama-presidential-center', 'tod-williams-billie-tsien-architects',
    '奥巴马总统中心', 'オバマ大統領センター', 2026, NULL, '芝加哥', '美国', 'US',
    'https://twbta.com/work/cultural/the-obama-presidential-center/',
    '', '', NULL, NULL, NULL, NULL, 'US', NULL,
    '2026-05-23T15:38:16.112492+00:00'
  ),
  (
    'b60c6ff1-0ddc-4c17-9aec-cf4cac8cd386', 'c-v-starr-east-asian', 'tod-williams-billie-tsien-architects',
    'C. V. 斯塔尔东亚图书馆', 'C・V・スター東アジア図書館', 2008, NULL, '伯克利', '美国', 'US',
    'https://twbta.com/work/academic/c-v-starr-east-asian-library/',
    '', '', NULL, NULL, NULL, NULL, 'US', NULL,
    '2026-05-23T15:38:16.171567+00:00'
  ),
  (
    '6e14d3b4-56a0-4092-aceb-335c2cb86264', 'club-house-du-golf-de-beauvallon', 'pierre-chareau',
    '博瓦隆高尔夫俱乐部会所', 'ボーヴァロン・ゴルフクラブハウス', 1927, NULL, '格里莫', '法国', 'FR',
    'https://www.culture.gouv.fr/regions/drac-provence-alpes-cote-d-azur/politique-et-actions-culturelles/architecture-contemporaine-remarquable-en-provence-alpes-cote-d-azur/le-label-architecture-contemporaine-remarquable-en-provence-alpes-cote-d-azur/label-acr-var/grimaud/grimaud-club-house-du-golf-de-beauvallon',
    '', '', NULL, NULL, NULL, NULL, 'FR', NULL,
    '2026-05-23T17:09:12.62827+00:00'
  ),
  (
    '0f6093e0-d761-44de-9d72-9b2139b1820a', 'lunuganga-country-estate', 'geoffrey-bawa',
    '卢努甘加庄园', 'ルヌガンガ', 1948, NULL, '本托塔', '斯里兰卡', 'LK',
    'https://geoffreybawa.com/lunuganga',
    '', '', 1948, NULL, NULL, NULL, 'LK', NULL,
    '2026-05-23T17:07:37.470456+00:00'
  ),
  (
    'd5933764-c744-4e61-a862-241187129af6', 'maison-de-verre', 'pierre-chareau',
    '玻璃之家', 'ガラスの家', 1928, 1931, '巴黎', '法国', 'FR',
    'https://www.centrepompidou.fr/fr/ressources/oeuvre/cKxjGX8',
    '', '', 1928, NULL, NULL, NULL, 'FR', NULL,
    '2026-07-08T15:49:49.358174+00:00'
  ),
  (
    '1692e27b-8d94-4739-811e-f87ce1634805', 'meti-handmade-school', 'anna-heringer',
    'METI 手工学校', 'METIハンドメイド・スクール', 2005, NULL, '鲁德拉普尔', '孟加拉国', 'BD',
    'https://www.anna-heringer.com/projects/meti-school-bangladesh/',
    '', '', 2005, NULL, NULL, NULL, 'BD', NULL,
    '2026-07-08T16:11:20.896254+00:00'
  ),
  (
    '87bba6e1-ed94-4b53-b73e-fdac30586555', 'sri-lankan-parliament-building', 'geoffrey-bawa',
    '斯里兰卡议会大厦', 'スリランカ国会議事堂', 1982, NULL, '斯里贾亚瓦德纳普拉科特', '斯里兰卡', 'LK',
    'https://www.parliament.lk/en/learn/handbook-of-parliament/evolution-of-the-parliamentary-system',
    '', '', NULL, NULL, NULL, NULL, 'LK', NULL,
    '2026-05-23T17:07:37.533962+00:00'
  );

DO $$
DECLARE
  changed_rows integer;
  matched_rows integer;
BEGIN
  IF to_regclass('public.architects') IS NULL
    OR to_regclass('public.buildings') IS NULL THEN
    RAISE EXCEPTION 'Architect introductory P1 rollback prerequisites are missing';
  END IF;

  PERFORM 1
  FROM public.architects architect
  JOIN architect_intro_p1_architect_rollback_seed seed ON seed.id = architect.id
  FOR UPDATE OF architect;

  PERFORM 1
  FROM public.buildings building
  JOIN architect_intro_p1_building_rollback_seed seed ON seed.id = building.id
  FOR UPDATE OF building;

  SELECT count(*) INTO matched_rows
  FROM public.architects architect
  JOIN architect_intro_p1_architect_rollback_seed seed
    ON seed.id = architect.id
   AND seed.slug = architect.slug
   AND seed.current_name_zh = architect.name_zh
   AND seed.current_name_ja = architect.name_ja
   AND seed.current_official_url = architect.official_url;

  IF matched_rows <> 6 THEN
    RAISE EXCEPTION 'Architect introductory P1 rollback architect state changed: % of 6 matched', matched_rows;
  END IF;

  SELECT count(*) INTO matched_rows
  FROM public.buildings building
  JOIN architect_intro_p1_building_rollback_seed seed
    ON seed.id = building.id
   AND seed.slug = building.slug
   AND seed.architect_slug = building.architect_slug
   AND building.architect_id IS NULL
   AND seed.current_name_zh = building.name_zh
   AND seed.current_name_ja = building.name_ja
   AND seed.current_year_start IS NOT DISTINCT FROM building.year_start
   AND seed.current_year_end IS NOT DISTINCT FROM building.year_end
   AND seed.current_city = building.city
   AND seed.current_country = building.country
   AND seed.current_country_code = building.country_code
   AND seed.current_official_url = building.official_url;

  IF matched_rows <> 7 THEN
    RAISE EXCEPTION 'Architect introductory P1 rollback building state changed: % of 7 matched', matched_rows;
  END IF;

  UPDATE public.architects architect
  SET
    name_zh = seed.original_name_zh,
    name_ja = seed.original_name_ja,
    official_url = seed.original_official_url,
    updated_at = seed.original_updated_at
  FROM architect_intro_p1_architect_rollback_seed seed
  WHERE seed.id = architect.id
    AND seed.slug = architect.slug;

  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 6 THEN
    RAISE EXCEPTION 'Architect introductory P1 architect rollback failed: % of 6 changed', changed_rows;
  END IF;

  UPDATE public.buildings building
  SET
    name_zh = seed.original_name_zh,
    name_ja = seed.original_name_ja,
    year_start = seed.original_year_start,
    year_end = seed.original_year_end,
    city = seed.original_city,
    country = seed.original_country,
    country_code = seed.original_country_code,
    official_url = seed.original_official_url,
    updated_at = seed.original_updated_at
  FROM architect_intro_p1_building_rollback_seed seed
  WHERE seed.id = building.id
    AND seed.slug = building.slug;

  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 7 THEN
    RAISE EXCEPTION 'Architect introductory P1 building rollback failed: % of 7 changed', changed_rows;
  END IF;

  SELECT count(*) INTO matched_rows
  FROM public.architects architect
  JOIN architect_intro_p1_architect_rollback_seed seed
    ON seed.id = architect.id
   AND seed.slug = architect.slug
   AND seed.original_name_zh IS NOT DISTINCT FROM architect.name_zh
   AND seed.original_name_ja IS NOT DISTINCT FROM architect.name_ja
   AND seed.original_official_url IS NOT DISTINCT FROM architect.official_url
   AND seed.original_updated_at = architect.updated_at;

  IF matched_rows <> 6 THEN
    RAISE EXCEPTION 'Architect introductory P1 architect rollback postcondition failed';
  END IF;

  SELECT count(*) INTO matched_rows
  FROM public.buildings building
  JOIN architect_intro_p1_building_rollback_seed seed
    ON seed.id = building.id
   AND seed.slug = building.slug
   AND seed.architect_slug = building.architect_slug
   AND building.architect_id IS NULL
   AND seed.original_name_zh IS NOT DISTINCT FROM building.name_zh
   AND seed.original_name_ja IS NOT DISTINCT FROM building.name_ja
   AND seed.original_year_start IS NOT DISTINCT FROM building.year_start
   AND seed.original_year_end IS NOT DISTINCT FROM building.year_end
   AND seed.original_city IS NOT DISTINCT FROM building.city
   AND seed.original_country IS NOT DISTINCT FROM building.country
   AND seed.original_country_code IS NOT DISTINCT FROM building.country_code
   AND seed.original_official_url IS NOT DISTINCT FROM building.official_url
   AND seed.original_updated_at = building.updated_at;

  IF matched_rows <> 7 THEN
    RAISE EXCEPTION 'Architect introductory P1 building rollback postcondition failed';
  END IF;
END
$$;

COMMIT;
