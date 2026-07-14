-- Guarded rollback for architect_identity_aravena_001.
DO $$
DECLARE
  canonical_count integer;
  canonical_building_count integer;
  restored_building_count integer;
BEGIN
  SELECT count(*) INTO canonical_count
  FROM public.architects
  WHERE id = '5000f72e-c893-4df6-84fe-33617581cd24'::uuid
    AND slug = 'aravena'
    AND name_en = 'Alejandro Aravena'
    AND birth_year = 1967;

  IF canonical_count <> 1 THEN
    RAISE EXCEPTION 'Rollback canonical Aravena precondition failed: expected 1, found %', canonical_count;
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.architects
    WHERE id = '4a93c6b4-c020-4291-bbbf-cb2bd94f5257'::uuid
       OR slug IN ('alejandro-alavena', 'alejandro-aravena')
  ) THEN
    RAISE EXCEPTION 'Rollback refused: duplicate or conflicting Aravena record already exists';
  END IF;

  SELECT count(*) INTO canonical_building_count
  FROM public.buildings
  WHERE architect_slug = 'aravena'
    AND id IN (
      'b6762624-0430-4ab7-afe1-09c594ad8706'::uuid,
      'a064774d-bbc5-4a83-ae8e-41e866e8953b'::uuid
    );

  IF canonical_building_count <> 2 THEN
    RAISE EXCEPTION 'Rollback reviewed building precondition failed: expected 2, found %', canonical_building_count;
  END IF;

  INSERT INTO public.architects (
    id, slug, wikidata_id, name_zh, name_en, name_ja, alt_names,
    birth_year, death_year, nationalities, era_slug, style_slugs,
    bio_zh, bio_en, bio_ja, core_ideas, education, influences, influenced,
    wikipedia_url, archdaily_url, official_url, structurae_id,
    ai_tags, ai_quality, created_at, updated_at
  ) VALUES (
    '4a93c6b4-c020-4291-bbbf-cb2bd94f5257'::uuid,
    'alejandro-alavena',
    NULL,
    '亚历杭德罗·阿拉维纳',
    'Alejandro Alavena',
    'アレハンドロ・アラベナ',
    ARRAY[]::text[],
    1967,
    NULL,
    ARRAY['Chile']::text[],
    NULL,
    ARRAY[]::text[],
    NULL,
    'Chilean architect',
    NULL,
    '[]'::jsonb,
    NULL,
    ARRAY[]::text[],
    ARRAY[]::text[],
    NULL,
    NULL,
    NULL,
    NULL,
    '{}'::jsonb,
    0,
    '2026-05-24T01:10:19.80023+00:00'::timestamptz,
    '2026-05-24T01:10:19.80023+00:00'::timestamptz
  );

  UPDATE public.buildings
  SET architect_slug = 'alejandro-alavena', updated_at = now()
  WHERE id IN (
      'b6762624-0430-4ab7-afe1-09c594ad8706'::uuid,
      'a064774d-bbc5-4a83-ae8e-41e866e8953b'::uuid
    )
    AND architect_slug = 'aravena';

  GET DIAGNOSTICS restored_building_count = ROW_COUNT;
  IF restored_building_count <> 2 THEN
    RAISE EXCEPTION 'Rollback Aravena building restore failed: expected 2, changed %', restored_building_count;
  END IF;

  IF (SELECT count(*) FROM public.architects WHERE slug = 'alejandro-alavena') <> 1
    OR (SELECT count(*) FROM public.buildings WHERE architect_slug = 'alejandro-alavena') <> 2 THEN
    RAISE EXCEPTION 'Rollback Aravena identity postcondition failed';
  END IF;
END $$;
