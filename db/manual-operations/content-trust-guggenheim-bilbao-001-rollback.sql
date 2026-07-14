-- Guarded rollback for content-trust-guggenheim-bilbao-001.
DO $$
DECLARE matched_count integer;
BEGIN
  SELECT count(*) INTO matched_count
  FROM public.buildings
  WHERE id = '9c2b367b-302d-4971-b5a5-5a5ea3ec7ec9'::uuid
    AND slug = 'guggenheim-bilbao'
    AND official_url = 'https://www.guggenheim-bilbao.eus/en/the-building'
    AND description ?& array['zh','en','ja']
    AND significance ?& array['zh','en','ja'];
  IF matched_count <> 1 THEN
    RAISE EXCEPTION 'rollback precondition failed: expected 1, found %', matched_count;
  END IF;
END $$;

UPDATE public.buildings
SET official_url = NULL,
    description = NULL,
    significance = jsonb_build_object('en', '毕尔巴鄂效应——一座建筑拯救一座城市'),
    updated_at = now()
WHERE id = '9c2b367b-302d-4971-b5a5-5a5ea3ec7ec9'::uuid
  AND slug = 'guggenheim-bilbao'
  AND official_url = 'https://www.guggenheim-bilbao.eus/en/the-building';
