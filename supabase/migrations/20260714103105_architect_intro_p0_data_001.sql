-- Architect introductory P0 data repair 001.
--
-- Reviewed scope:
-- - repair Grafton Architects and UNEMORI ARCHITECTS localized identities;
-- - turn the raw Q135641257 import into Kingston University Town House;
-- - correct Toulouse School of Economics building metadata and year;
-- - replace every live Book Mountain truncated source URL atomically;
-- - delete three reviewed, mismatched Unsplash rows from Town House without
--   inserting a speculative replacement image.

BEGIN;

CREATE TEMP TABLE town_house_image_seed (
  id uuid PRIMARY KEY,
  url_thumb_400 text NOT NULL,
  url_original text NOT NULL,
  photographer text NOT NULL,
  source text NOT NULL,
  license text NOT NULL,
  source_url text NOT NULL,
  img_type text NOT NULL,
  is_primary boolean NOT NULL,
  created_at timestamptz NOT NULL
) ON COMMIT DROP;

INSERT INTO town_house_image_seed VALUES
  (
    'e4278dee-4a40-58b2-9b40-9c8cc04075d9'::uuid,
    'https://images.unsplash.com/photo-6pUdMJVGSOE?w=400&q=60',
    'https://images.unsplash.com/photo-6pUdMJVGSOE?w=1200&q=85',
    'James Lansbury',
    'Unsplash',
    'Unsplash License',
    'https://unsplash.com/photos/6pUdMJVGSOE',
    'exterior',
    true,
    '2026-05-24T10:40:37.189051+00:00'::timestamptz
  ),
  (
    'e49e961b-f159-56ca-9e1b-07726ed95cf7'::uuid,
    'https://images.unsplash.com/photo-1614595737683-1740e41bfaac?w=400&q=60',
    'https://images.unsplash.com/photo-1614595737683-1740e41bfaac?w=1200&q=85',
    'Paul Menz',
    'Unsplash',
    'Unsplash License',
    'https://unsplash.com/photos/jh_KHWamObU',
    'exterior',
    false,
    '2026-05-24T10:40:37.285368+00:00'::timestamptz
  ),
  (
    'f04ca9bc-34e1-5a43-9f48-c1c901e8ec6c'::uuid,
    'https://images.unsplash.com/photo-1453586857165-eb78d44460ca?w=400&q=60',
    'https://images.unsplash.com/photo-1453586857165-eb78d44460ca?w=1200&q=85',
    'Michael Seh',
    'Unsplash',
    'Unsplash License',
    'https://unsplash.com/photos/S66mTqg0nM8',
    'exterior',
    false,
    '2026-05-24T10:40:37.41342+00:00'::timestamptz
  );

DO $$
DECLARE
  changed_rows integer;
BEGIN
  IF to_regclass('public.architects') IS NULL
    OR to_regclass('public.buildings') IS NULL
    OR to_regclass('public.images') IS NULL
    OR to_regclass('public.graduation_case_profiles') IS NULL
    OR to_regclass('public.building_function_assignments') IS NULL
    OR to_regclass('public.graduation_case_compatibility') IS NULL THEN
    RAISE EXCEPTION 'Architect introductory P0 data 001 prerequisites are missing';
  END IF;

  PERFORM 1 FROM public.architects
  WHERE id IN (
    'a6c98656-452a-4fb5-98c3-01b371e3ee41'::uuid,
    '4ec76862-cf0a-505f-82fc-e01b8fca9274'::uuid
  ) FOR UPDATE;

  PERFORM 1 FROM public.buildings
  WHERE id IN (
    'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid,
    'dd094698-5762-467a-b967-c9651ddd8c1b'::uuid,
    '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
  ) FOR UPDATE;

  PERFORM 1 FROM public.images
  WHERE building_id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
  FOR UPDATE;

  PERFORM 1 FROM public.graduation_case_profiles
  WHERE case_id = 'CASE-130' FOR UPDATE;

  PERFORM 1 FROM public.building_function_assignments
  WHERE building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
  FOR UPDATE;

  PERFORM 1 FROM public.graduation_case_compatibility
  WHERE case_id = 'CASE-130' FOR UPDATE;

  IF (
    SELECT count(*) FROM public.architects
    WHERE id = 'a6c98656-452a-4fb5-98c3-01b371e3ee41'::uuid
      AND slug = 'grafton-architects'
      AND name_zh = ''
      AND name_en = 'Grafton Architects'
      AND name_ja = 'グラフトン・アーキテクツ'
      AND official_url IS NULL
      AND updated_at = '2026-05-24T00:39:42.031873+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION 'Grafton Architects reviewed snapshot changed';
  END IF;

  IF (
    SELECT count(*) FROM public.architects
    WHERE id = '4ec76862-cf0a-505f-82fc-e01b8fca9274'::uuid
      AND slug = 'unemori-architects'
      AND name_zh = '畷森泰行建筑设计事务所'
      AND name_en = 'UNEMORI ARCHITECTS'
      AND name_ja = '畷森泰行建築設計事務所'
      AND official_url = 'https://unemori-archi.com/'
      AND updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION 'UNEMORI ARCHITECTS reviewed snapshot changed';
  END IF;

  IF EXISTS (SELECT 1 FROM public.buildings WHERE slug = 'kingston-university-town-house') THEN
    RAISE EXCEPTION 'Canonical Kingston University Town House slug already exists';
  END IF;

  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
      AND slug = 'q135641257'
      AND wikidata_id = 'Q135641257'
      AND name_zh = ''
      AND name_en = 'Q135641257'
      AND name_ja = ''
      AND architect_id IS NULL
      AND architect_slug = 'grafton-architects'
      AND year_start IS NULL
      AND status = 'built'
      AND city IS NULL
      AND country IS NULL
      AND country_code = 'GB'
      AND type_slug IS NULL
      AND official_url IS NULL
      AND updated_at = '2026-05-24T00:39:45.231234+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION 'Town House raw import reviewed snapshot changed';
  END IF;

  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = 'dd094698-5762-467a-b967-c9651ddd8c1b'::uuid
      AND slug = 'toulouse-school-of-economics'
      AND wikidata_id = 'Q3532921'
      AND name_zh = ''
      AND name_en = 'Toulouse School of Economics'
      AND name_ja = ''
      AND architect_id IS NULL
      AND architect_slug = 'grafton-architects'
      AND year_start = 2006
      AND status = 'built'
      AND city IS NULL
      AND country IS NULL
      AND country_code = 'ES'
      AND type_slug = 'educational'
      AND era_slug = 'contemporary'
      AND official_url IS NULL
      AND updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION 'Toulouse School of Economics reviewed snapshot changed';
  END IF;

  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
      AND slug = 'book-mountain-spijkenisse'
      AND official_url = 'https://www.mvrdv.com/projects/126/book-'
      AND updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION 'Book Mountain building reviewed snapshot changed';
  END IF;

  IF (
    SELECT count(*)
    FROM public.images image
    JOIN town_house_image_seed seed
      ON seed.id = image.id
      AND seed.url_thumb_400 = image.url_thumb_400
      AND seed.url_original = image.url_original
      AND seed.photographer = image.photographer
      AND seed.source = image.source
      AND seed.license = image.license
      AND seed.source_url = image.source_url
      AND seed.img_type = image.img_type
      AND seed.is_primary = image.is_primary
      AND seed.created_at = image.created_at
    WHERE image.building_id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
  ) <> 3 OR (
    SELECT count(*) FROM public.images
    WHERE building_id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
  ) <> 3 THEN
    RAISE EXCEPTION 'Town House reviewed image set changed';
  END IF;

  IF (
    SELECT count(*) FROM public.graduation_case_profiles
    WHERE case_id = 'CASE-130'
      AND building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
      AND source_url = 'https://www.mvrdv.com/projects/126/book-'
      AND updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION 'Book Mountain graduation profile reviewed snapshot changed';
  END IF;

  IF (
    SELECT count(*) FROM public.building_function_assignments
    WHERE building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
      AND function_slug = ANY (ARRAY['library', 'community-center', 'mixed-use']::text[])
      AND evidence_url = 'https://www.mvrdv.com/projects/126/book-'
      AND review_status = 'approved'
      AND assignment_method = 'source-derived'
      AND confidence = 1.000
      AND reviewed_at = '2026-07-12T00:00:00+00:00'::timestamptz
      AND updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  ) <> 3 OR (
    SELECT count(*) FROM public.building_function_assignments
    WHERE building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
  ) <> 3 THEN
    RAISE EXCEPTION 'Book Mountain function assignment reviewed set changed';
  END IF;

  IF (
    SELECT count(*) FROM public.graduation_case_compatibility
    WHERE case_id = 'CASE-130'
      AND payload ->> 'source_url' = 'https://www.mvrdv.com/projects/126/book-'
      AND publication_status = 'published'
      AND updated_at = '2026-07-13T04:30:11.314723+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION 'Book Mountain compatibility snapshot changed';
  END IF;

  UPDATE public.architects
  SET
    name_zh = '格拉夫顿建筑事务所',
    official_url = 'https://www.graftonarchitects.ie/',
    updated_at = now()
  WHERE id = 'a6c98656-452a-4fb5-98c3-01b371e3ee41'::uuid
    AND slug = 'grafton-architects';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Grafton Architects update failed'; END IF;

  UPDATE public.architects
  SET
    name_zh = '畝森泰行建筑设计事务所',
    name_ja = '畝森泰行建築設計事務所',
    updated_at = now()
  WHERE id = '4ec76862-cf0a-505f-82fc-e01b8fca9274'::uuid
    AND slug = 'unemori-architects';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'UNEMORI ARCHITECTS update failed'; END IF;

  UPDATE public.buildings
  SET
    slug = 'kingston-university-town-house',
    name_zh = '金斯顿大学 Town House',
    name_en = 'Kingston University Town House',
    name_ja = 'キングストン大学タウンハウス',
    architect_id = 'a6c98656-452a-4fb5-98c3-01b371e3ee41'::uuid,
    year_start = 2020,
    city = '金斯顿',
    country = '英国',
    type_slug = 'educational',
    official_url = 'https://www.kingston.ac.uk/about/news/kingston-universitys-flagship-town-house-building-wins-2021-riba-stirling-prize',
    updated_at = now()
  WHERE id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
    AND slug = 'q135641257';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Town House canonical identity update failed'; END IF;

  UPDATE public.buildings
  SET
    name_zh = '图卢兹经济学院新楼',
    name_ja = 'トゥールーズ経済学院新校舎',
    architect_id = 'a6c98656-452a-4fb5-98c3-01b371e3ee41'::uuid,
    year_start = 2019,
    city = '图卢兹',
    country = '法国',
    country_code = 'FR',
    official_url = 'https://www.tse-fr.eu/tse-building',
    updated_at = now()
  WHERE id = 'dd094698-5762-467a-b967-c9651ddd8c1b'::uuid
    AND slug = 'toulouse-school-of-economics';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Toulouse School of Economics update failed'; END IF;

  UPDATE public.buildings
  SET
    official_url = 'https://www.mvrdv.com/projects/126/book-mountain',
    updated_at = now()
  WHERE id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
    AND slug = 'book-mountain-spijkenisse';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Book Mountain building source update failed'; END IF;

  DELETE FROM public.images
  WHERE building_id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
    AND id IN (SELECT id FROM town_house_image_seed);
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 3 THEN RAISE EXCEPTION 'Town House mismatched image deletion failed'; END IF;

  UPDATE public.graduation_case_profiles
  SET
    source_url = 'https://www.mvrdv.com/projects/126/book-mountain',
    updated_at = now()
  WHERE case_id = 'CASE-130'
    AND building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid;
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Book Mountain profile source update failed'; END IF;

  UPDATE public.building_function_assignments
  SET
    evidence_url = 'https://www.mvrdv.com/projects/126/book-mountain',
    updated_at = now()
  WHERE building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
    AND function_slug = ANY (ARRAY['library', 'community-center', 'mixed-use']::text[]);
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 3 THEN RAISE EXCEPTION 'Book Mountain assignment source update failed'; END IF;

  UPDATE public.graduation_case_compatibility
  SET
    payload = jsonb_set(
      payload,
      '{source_url}',
      to_jsonb('https://www.mvrdv.com/projects/126/book-mountain'::text),
      false
    ),
    updated_at = now()
  WHERE case_id = 'CASE-130';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Book Mountain compatibility source update failed'; END IF;

  IF (
    SELECT count(*) FROM public.architects
    WHERE id = 'a6c98656-452a-4fb5-98c3-01b371e3ee41'::uuid
      AND slug = 'grafton-architects'
      AND name_zh = '格拉夫顿建筑事务所'
      AND official_url = 'https://www.graftonarchitects.ie/'
  ) <> 1 OR (
    SELECT count(*) FROM public.architects
    WHERE id = '4ec76862-cf0a-505f-82fc-e01b8fca9274'::uuid
      AND name_zh = '畝森泰行建筑设计事务所'
      AND name_ja = '畝森泰行建築設計事務所'
  ) <> 1 THEN
    RAISE EXCEPTION 'Architect introductory P0 architect postcondition failed';
  END IF;

  IF EXISTS (SELECT 1 FROM public.buildings WHERE slug = 'q135641257') OR (
    SELECT count(*) FROM public.buildings
    WHERE id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
      AND slug = 'kingston-university-town-house'
      AND name_zh = '金斯顿大学 Town House'
      AND name_en = 'Kingston University Town House'
      AND name_ja = 'キングストン大学タウンハウス'
      AND architect_id = 'a6c98656-452a-4fb5-98c3-01b371e3ee41'::uuid
      AND architect_slug = 'grafton-architects'
      AND year_start = 2020
      AND city = '金斯顿'
      AND country = '英国'
      AND country_code = 'GB'
      AND type_slug = 'educational'
      AND official_url = 'https://www.kingston.ac.uk/about/news/kingston-universitys-flagship-town-house-building-wins-2021-riba-stirling-prize'
  ) <> 1 THEN
    RAISE EXCEPTION 'Town House canonical identity postcondition failed';
  END IF;

  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = 'dd094698-5762-467a-b967-c9651ddd8c1b'::uuid
      AND slug = 'toulouse-school-of-economics'
      AND name_zh = '图卢兹经济学院新楼'
      AND name_ja = 'トゥールーズ経済学院新校舎'
      AND architect_id = 'a6c98656-452a-4fb5-98c3-01b371e3ee41'::uuid
      AND year_start = 2019
      AND city = '图卢兹'
      AND country = '法国'
      AND country_code = 'FR'
      AND official_url = 'https://www.tse-fr.eu/tse-building'
  ) <> 1 THEN
    RAISE EXCEPTION 'Toulouse School of Economics postcondition failed';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.images
    WHERE building_id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
  ) THEN
    RAISE EXCEPTION 'Town House mismatched images remain after repair';
  END IF;

  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
      AND official_url = 'https://www.mvrdv.com/projects/126/book-mountain'
  ) <> 1 OR (
    SELECT count(*) FROM public.graduation_case_profiles
    WHERE case_id = 'CASE-130'
      AND source_url = 'https://www.mvrdv.com/projects/126/book-mountain'
  ) <> 1 OR (
    SELECT count(*) FROM public.building_function_assignments
    WHERE building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
      AND evidence_url = 'https://www.mvrdv.com/projects/126/book-mountain'
  ) <> 3 OR (
    SELECT count(*) FROM public.graduation_case_compatibility
    WHERE case_id = 'CASE-130'
      AND payload ->> 'source_url' = 'https://www.mvrdv.com/projects/126/book-mountain'
  ) <> 1 THEN
    RAISE EXCEPTION 'Book Mountain source-chain postcondition failed';
  END IF;
END $$;

COMMIT;
