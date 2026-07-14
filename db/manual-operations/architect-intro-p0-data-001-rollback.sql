-- Guarded rollback for architect introductory P0 data repair 001.
--
-- The rollback refuses if a safe Town House image has been added after the
-- repair. It restores the three prior Unsplash rows only when the reviewed
-- post-write state is otherwise unchanged.

BEGIN;

DO $$
DECLARE
  changed_rows integer;
BEGIN
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
      AND name_zh = '格拉夫顿建筑事务所'
      AND name_en = 'Grafton Architects'
      AND name_ja = 'グラフトン・アーキテクツ'
      AND official_url = 'https://www.graftonarchitects.ie/'
  ) <> 1 OR (
    SELECT count(*) FROM public.architects
    WHERE id = '4ec76862-cf0a-505f-82fc-e01b8fca9274'::uuid
      AND slug = 'unemori-architects'
      AND name_zh = '畝森泰行建筑设计事务所'
      AND name_en = 'UNEMORI ARCHITECTS'
      AND name_ja = '畝森泰行建築設計事務所'
      AND official_url = 'https://unemori-archi.com/'
  ) <> 1 THEN
    RAISE EXCEPTION 'Repaired architect identity changed; refusing rollback';
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
    RAISE EXCEPTION 'Repaired Town House identity changed; refusing rollback';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.images
    WHERE building_id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
  ) THEN
    RAISE EXCEPTION 'Town House gained an image after repair; refusing rollback';
  END IF;

  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = 'dd094698-5762-467a-b967-c9651ddd8c1b'::uuid
      AND slug = 'toulouse-school-of-economics'
      AND name_zh = '图卢兹经济学院新楼'
      AND name_en = 'Toulouse School of Economics'
      AND name_ja = 'トゥールーズ経済学院新校舎'
      AND architect_id = 'a6c98656-452a-4fb5-98c3-01b371e3ee41'::uuid
      AND architect_slug = 'grafton-architects'
      AND year_start = 2019
      AND status = 'built'
      AND city = '图卢兹'
      AND country = '法国'
      AND country_code = 'FR'
      AND type_slug = 'educational'
      AND era_slug = 'contemporary'
      AND official_url = 'https://www.tse-fr.eu/tse-building'
  ) <> 1 THEN
    RAISE EXCEPTION 'Repaired Toulouse School of Economics changed; refusing rollback';
  END IF;

  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
      AND slug = 'book-mountain-spijkenisse'
      AND official_url = 'https://www.mvrdv.com/projects/126/book-mountain'
  ) <> 1 OR (
    SELECT count(*) FROM public.graduation_case_profiles
    WHERE case_id = 'CASE-130'
      AND building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
      AND source_url = 'https://www.mvrdv.com/projects/126/book-mountain'
  ) <> 1 OR (
    SELECT count(*) FROM public.building_function_assignments
    WHERE building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
      AND function_slug = ANY (ARRAY['library', 'community-center', 'mixed-use']::text[])
      AND evidence_url = 'https://www.mvrdv.com/projects/126/book-mountain'
  ) <> 3 OR (
    SELECT count(*) FROM public.graduation_case_compatibility
    WHERE case_id = 'CASE-130'
      AND payload ->> 'source_url' = 'https://www.mvrdv.com/projects/126/book-mountain'
  ) <> 1 THEN
    RAISE EXCEPTION 'Repaired Book Mountain source chain changed; refusing rollback';
  END IF;

  UPDATE public.graduation_case_compatibility
  SET
    payload = jsonb_set(
      payload,
      '{source_url}',
      to_jsonb('https://www.mvrdv.com/projects/126/book-'::text),
      false
    ),
    updated_at = '2026-07-13T04:30:11.314723+00:00'::timestamptz
  WHERE case_id = 'CASE-130';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Book Mountain compatibility rollback failed'; END IF;

  UPDATE public.building_function_assignments
  SET
    evidence_url = 'https://www.mvrdv.com/projects/126/book-',
    updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  WHERE building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
    AND function_slug = ANY (ARRAY['library', 'community-center', 'mixed-use']::text[]);
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 3 THEN RAISE EXCEPTION 'Book Mountain assignment rollback failed'; END IF;

  UPDATE public.graduation_case_profiles
  SET
    source_url = 'https://www.mvrdv.com/projects/126/book-',
    updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  WHERE case_id = 'CASE-130'
    AND building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid;
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Book Mountain profile rollback failed'; END IF;

  UPDATE public.buildings
  SET
    official_url = 'https://www.mvrdv.com/projects/126/book-',
    updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  WHERE id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
    AND slug = 'book-mountain-spijkenisse';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Book Mountain building rollback failed'; END IF;

  UPDATE public.buildings
  SET
    name_zh = '',
    name_ja = '',
    architect_id = NULL,
    year_start = 2006,
    city = NULL,
    country = NULL,
    country_code = 'ES',
    official_url = NULL,
    updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz
  WHERE id = 'dd094698-5762-467a-b967-c9651ddd8c1b'::uuid
    AND slug = 'toulouse-school-of-economics';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Toulouse School of Economics rollback failed'; END IF;

  UPDATE public.buildings
  SET
    slug = 'q135641257',
    name_zh = '',
    name_en = 'Q135641257',
    name_ja = '',
    architect_id = NULL,
    year_start = NULL,
    city = NULL,
    country = NULL,
    type_slug = NULL,
    official_url = NULL,
    updated_at = '2026-05-24T00:39:45.231234+00:00'::timestamptz
  WHERE id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
    AND slug = 'kingston-university-town-house';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Town House identity rollback failed'; END IF;

  UPDATE public.architects
  SET
    name_zh = '',
    official_url = NULL,
    updated_at = '2026-05-24T00:39:42.031873+00:00'::timestamptz
  WHERE id = 'a6c98656-452a-4fb5-98c3-01b371e3ee41'::uuid
    AND slug = 'grafton-architects';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'Grafton Architects rollback failed'; END IF;

  UPDATE public.architects
  SET
    name_zh = '畷森泰行建筑设计事务所',
    name_ja = '畷森泰行建築設計事務所',
    updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  WHERE id = '4ec76862-cf0a-505f-82fc-e01b8fca9274'::uuid
    AND slug = 'unemori-architects';
  GET DIAGNOSTICS changed_rows = ROW_COUNT;
  IF changed_rows <> 1 THEN RAISE EXCEPTION 'UNEMORI ARCHITECTS rollback failed'; END IF;
END $$;

INSERT INTO public.images (
  id,
  building_id,
  url_thumb_200,
  url_thumb_400,
  url_display,
  url_original,
  photographer,
  source,
  license,
  license_url,
  source_url,
  attribution,
  img_type,
  is_primary,
  width,
  height,
  blur_hash,
  created_at
) VALUES
  (
    'e4278dee-4a40-58b2-9b40-9c8cc04075d9'::uuid,
    'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid,
    NULL,
    'https://images.unsplash.com/photo-6pUdMJVGSOE?w=400&q=60',
    NULL,
    'https://images.unsplash.com/photo-6pUdMJVGSOE?w=1200&q=85',
    'James Lansbury',
    'Unsplash',
    'Unsplash License',
    NULL,
    'https://unsplash.com/photos/6pUdMJVGSOE',
    NULL,
    'exterior',
    true,
    NULL,
    NULL,
    NULL,
    '2026-05-24T10:40:37.189051+00:00'::timestamptz
  ),
  (
    'e49e961b-f159-56ca-9e1b-07726ed95cf7'::uuid,
    'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid,
    NULL,
    'https://images.unsplash.com/photo-1614595737683-1740e41bfaac?w=400&q=60',
    NULL,
    'https://images.unsplash.com/photo-1614595737683-1740e41bfaac?w=1200&q=85',
    'Paul Menz',
    'Unsplash',
    'Unsplash License',
    NULL,
    'https://unsplash.com/photos/jh_KHWamObU',
    NULL,
    'exterior',
    false,
    NULL,
    NULL,
    NULL,
    '2026-05-24T10:40:37.285368+00:00'::timestamptz
  ),
  (
    'f04ca9bc-34e1-5a43-9f48-c1c901e8ec6c'::uuid,
    'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid,
    NULL,
    'https://images.unsplash.com/photo-1453586857165-eb78d44460ca?w=400&q=60',
    NULL,
    'https://images.unsplash.com/photo-1453586857165-eb78d44460ca?w=1200&q=85',
    'Michael Seh',
    'Unsplash',
    'Unsplash License',
    NULL,
    'https://unsplash.com/photos/S66mTqg0nM8',
    NULL,
    'exterior',
    false,
    NULL,
    NULL,
    NULL,
    '2026-05-24T10:40:37.41342+00:00'::timestamptz
  );

DO $$
BEGIN
  IF (
    SELECT count(*) FROM public.architects
    WHERE id = 'a6c98656-452a-4fb5-98c3-01b371e3ee41'::uuid
      AND name_zh = ''
      AND official_url IS NULL
      AND updated_at = '2026-05-24T00:39:42.031873+00:00'::timestamptz
  ) <> 1 OR (
    SELECT count(*) FROM public.architects
    WHERE id = '4ec76862-cf0a-505f-82fc-e01b8fca9274'::uuid
      AND name_zh = '畷森泰行建筑设计事务所'
      AND name_ja = '畷森泰行建築設計事務所'
      AND updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION 'Architect introductory P0 architect rollback verification failed';
  END IF;

  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
      AND slug = 'q135641257'
      AND name_en = 'Q135641257'
      AND architect_id IS NULL
      AND year_start IS NULL
      AND city IS NULL
      AND country IS NULL
      AND type_slug IS NULL
      AND official_url IS NULL
      AND updated_at = '2026-05-24T00:39:45.231234+00:00'::timestamptz
  ) <> 1 OR (
    SELECT count(*) FROM public.buildings
    WHERE id = 'dd094698-5762-467a-b967-c9651ddd8c1b'::uuid
      AND name_zh = ''
      AND name_ja = ''
      AND architect_id IS NULL
      AND year_start = 2006
      AND city IS NULL
      AND country IS NULL
      AND country_code = 'ES'
      AND official_url IS NULL
      AND updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION 'Grafton building rollback verification failed';
  END IF;

  IF (
    SELECT count(*) FROM public.images
    WHERE building_id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
      AND id IN (
        'e4278dee-4a40-58b2-9b40-9c8cc04075d9'::uuid,
        'e49e961b-f159-56ca-9e1b-07726ed95cf7'::uuid,
        'f04ca9bc-34e1-5a43-9f48-c1c901e8ec6c'::uuid
      )
  ) <> 3 OR (
    SELECT count(*) FROM public.images
    WHERE building_id = 'f393a02c-4c5d-4683-9a32-fda4c04f185b'::uuid
      AND is_primary
  ) <> 1 THEN
    RAISE EXCEPTION 'Town House image rollback verification failed';
  END IF;

  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
      AND official_url = 'https://www.mvrdv.com/projects/126/book-'
      AND updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  ) <> 1 OR (
    SELECT count(*) FROM public.graduation_case_profiles
    WHERE case_id = 'CASE-130'
      AND source_url = 'https://www.mvrdv.com/projects/126/book-'
      AND updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  ) <> 1 OR (
    SELECT count(*) FROM public.building_function_assignments
    WHERE building_id = '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid
      AND evidence_url = 'https://www.mvrdv.com/projects/126/book-'
      AND updated_at = '2026-07-11T23:39:31.772406+00:00'::timestamptz
  ) <> 3 OR (
    SELECT count(*) FROM public.graduation_case_compatibility
    WHERE case_id = 'CASE-130'
      AND payload ->> 'source_url' = 'https://www.mvrdv.com/projects/126/book-'
      AND updated_at = '2026-07-13T04:30:11.314723+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION 'Book Mountain source-chain rollback verification failed';
  END IF;
END $$;

COMMIT;
