-- Batch 004: reviewed Carmen Wuerth Forum Commons replacement.
BEGIN;

DO $$
DECLARE
  matched_buildings integer;
  matched_primaries integer;
  duplicate_candidates integer;
BEGIN
  SELECT count(*) INTO matched_buildings
  FROM public.buildings
  WHERE id = 'afac1e48-46c2-4765-9776-664cb4ecf12f'::uuid
    AND slug = 'carmen-wurth-forum';

  SELECT count(*) INTO matched_primaries
  FROM public.images
  WHERE id = 'acbc7498-6951-5c87-b838-d724006b0f0c'::uuid
    AND building_id = 'afac1e48-46c2-4765-9776-664cb4ecf12f'::uuid
    AND is_primary = true;

  SELECT count(*) INTO duplicate_candidates
  FROM public.images
  WHERE building_id = 'afac1e48-46c2-4765-9776-664cb4ecf12f'::uuid
    AND source_url = 'https://commons.wikimedia.org/wiki/File:Landappbw_158839_1819_Veranstaltungshalle_Carmen-W%C3%BCrth-Forum_K%C3%BCnselsau-Gaisbach.jpg';

  IF matched_buildings <> 1 OR matched_primaries <> 1 OR duplicate_candidates <> 0 THEN
    RAISE EXCEPTION 'Batch 004 preflight failed: buildings %, primaries %, duplicates %', matched_buildings, matched_primaries, duplicate_candidates;
  END IF;
END $$;

UPDATE public.images
SET is_primary = false
WHERE id = 'acbc7498-6951-5c87-b838-d724006b0f0c'::uuid
  AND building_id = 'afac1e48-46c2-4765-9776-664cb4ecf12f'::uuid
  AND is_primary = true;

INSERT INTO public.images (
  building_id, url_original, url_thumb_400, photographer,
  source, license, source_url, img_type, is_primary
) VALUES (
  'afac1e48-46c2-4765-9776-664cb4ecf12f'::uuid,
  'https://upload.wikimedia.org/wikipedia/commons/d/dc/Landappbw_158839_1819_Veranstaltungshalle_Carmen-W%C3%BCrth-Forum_K%C3%BCnselsau-Gaisbach.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Landappbw_158839_1819_Veranstaltungshalle_Carmen-W%C3%BCrth-Forum_K%C3%BCnselsau-Gaisbach.jpg/500px-Landappbw_158839_1819_Veranstaltungshalle_Carmen-W%C3%BCrth-Forum_K%C3%BCnselsau-Gaisbach.jpg',
  'Martin Hahn', 'Wikimedia Commons', 'CC0',
  'https://commons.wikimedia.org/wiki/File:Landappbw_158839_1819_Veranstaltungshalle_Carmen-W%C3%BCrth-Forum_K%C3%BCnselsau-Gaisbach.jpg',
  'exterior', true
);

COMMIT;
