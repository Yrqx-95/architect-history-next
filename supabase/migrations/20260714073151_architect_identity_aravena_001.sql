-- Merge the misspelled Alejandro Alavena duplicate into the canonical
-- Alejandro Aravena record. This migration intentionally changes only the two
-- reviewed building relations and removes the empty duplicate architect row.

DO $$
DECLARE
  canonical_count integer;
  duplicate_count integer;
  duplicate_building_count integer;
  duplicate_building_slugs text[];
  duplicate_reference_count integer;
  changed_building_count integer;
  deleted_architect_count integer;
BEGIN
  SELECT count(*) INTO canonical_count
  FROM public.architects
  WHERE id = '5000f72e-c893-4df6-84fe-33617581cd24'::uuid
    AND slug = 'aravena'
    AND name_en = 'Alejandro Aravena'
    AND birth_year = 1967;

  IF canonical_count <> 1 THEN
    RAISE EXCEPTION 'Canonical Aravena precondition failed: expected 1, found %', canonical_count;
  END IF;

  SELECT count(*) INTO duplicate_count
  FROM public.architects
  WHERE id = '4a93c6b4-c020-4291-bbbf-cb2bd94f5257'::uuid
    AND slug = 'alejandro-alavena'
    AND name_en = 'Alejandro Alavena'
    AND name_zh = '亚历杭德罗·阿拉维纳'
    AND name_ja = 'アレハンドロ・アラベナ'
    AND bio_en = 'Chilean architect'
    AND birth_year = 1967
    AND created_at = '2026-05-24T01:10:19.80023+00:00'::timestamptz
    AND updated_at = '2026-05-24T01:10:19.80023+00:00'::timestamptz;

  IF duplicate_count <> 1 THEN
    RAISE EXCEPTION 'Misspelled Aravena duplicate precondition failed: expected 1, found %', duplicate_count;
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.architects
    WHERE slug = 'alejandro-aravena'
  ) THEN
    RAISE EXCEPTION 'Unexpected third Alejandro Aravena slug exists';
  END IF;

  SELECT count(*), array_agg(slug ORDER BY slug)
  INTO duplicate_building_count, duplicate_building_slugs
  FROM public.buildings
  WHERE architect_slug = 'alejandro-alavena';

  IF duplicate_building_count <> 2
    OR duplicate_building_slugs IS DISTINCT FROM ARRAY[
      'center-of-innovation-anacleto-angelini',
      'edp-headquarters-ii'
    ]::text[] THEN
    RAISE EXCEPTION 'Reviewed Aravena building set changed: count %, slugs %', duplicate_building_count, duplicate_building_slugs;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.buildings
    WHERE id = 'b6762624-0430-4ab7-afe1-09c594ad8706'::uuid
      AND slug = 'center-of-innovation-anacleto-angelini'
      AND architect_slug = 'alejandro-alavena'
      AND updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz
  ) OR NOT EXISTS (
    SELECT 1 FROM public.buildings
    WHERE id = 'a064774d-bbc5-4a83-ae8e-41e866e8953b'::uuid
      AND slug = 'edp-headquarters-ii'
      AND architect_slug = 'alejandro-alavena'
      AND updated_at = '2026-05-24T01:10:22.866879+00:00'::timestamptz
  ) THEN
    RAISE EXCEPTION 'Reviewed Aravena building snapshots changed';
  END IF;

  SELECT
    (SELECT count(*) FROM public.buildings WHERE architect_id = '4a93c6b4-c020-4291-bbbf-cb2bd94f5257'::uuid)
    + (SELECT count(*) FROM public.sources WHERE architect_id = '4a93c6b4-c020-4291-bbbf-cb2bd94f5257'::uuid)
    + (SELECT count(*) FROM public.architect_styles WHERE architect_id = '4a93c6b4-c020-4291-bbbf-cb2bd94f5257'::uuid)
    + (SELECT count(*) FROM public.architect_eras WHERE architect_id = '4a93c6b4-c020-4291-bbbf-cb2bd94f5257'::uuid)
    + (SELECT count(*) FROM public.architect_influences WHERE architect_id = '4a93c6b4-c020-4291-bbbf-cb2bd94f5257'::uuid OR influenced_id = '4a93c6b4-c020-4291-bbbf-cb2bd94f5257'::uuid)
  INTO duplicate_reference_count;

  IF duplicate_reference_count <> 0 THEN
    RAISE EXCEPTION 'Misspelled Aravena duplicate gained protected references: %', duplicate_reference_count;
  END IF;

  UPDATE public.buildings
  SET architect_slug = 'aravena', updated_at = now()
  WHERE id IN (
      'b6762624-0430-4ab7-afe1-09c594ad8706'::uuid,
      'a064774d-bbc5-4a83-ae8e-41e866e8953b'::uuid
    )
    AND architect_slug = 'alejandro-alavena';

  GET DIAGNOSTICS changed_building_count = ROW_COUNT;
  IF changed_building_count <> 2 THEN
    RAISE EXCEPTION 'Aravena building reassignment failed: expected 2, changed %', changed_building_count;
  END IF;

  DELETE FROM public.architects
  WHERE id = '4a93c6b4-c020-4291-bbbf-cb2bd94f5257'::uuid
    AND slug = 'alejandro-alavena';

  GET DIAGNOSTICS deleted_architect_count = ROW_COUNT;
  IF deleted_architect_count <> 1 THEN
    RAISE EXCEPTION 'Aravena duplicate deletion failed: expected 1, deleted %', deleted_architect_count;
  END IF;

  IF (SELECT count(*) FROM public.buildings WHERE architect_slug = 'aravena' AND id IN (
      'b6762624-0430-4ab7-afe1-09c594ad8706'::uuid,
      'a064774d-bbc5-4a83-ae8e-41e866e8953b'::uuid
    )) <> 2
    OR EXISTS (SELECT 1 FROM public.buildings WHERE architect_slug = 'alejandro-alavena')
    OR EXISTS (SELECT 1 FROM public.architects WHERE slug = 'alejandro-alavena') THEN
    RAISE EXCEPTION 'Aravena identity merge postcondition failed';
  END IF;
END $$;
