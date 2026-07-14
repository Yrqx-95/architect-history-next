-- Rollback for image fill batch 004.
BEGIN;

DO $$
DECLARE inserted integer; previous integer;
BEGIN
  SELECT count(*) INTO inserted FROM public.images
  WHERE building_id = 'afac1e48-46c2-4765-9776-664cb4ecf12f'::uuid
    AND source_url = 'https://commons.wikimedia.org/wiki/File:Landappbw_158839_1819_Veranstaltungshalle_Carmen-W%C3%BCrth-Forum_K%C3%BCnselsau-Gaisbach.jpg'
    AND is_primary = true;
  SELECT count(*) INTO previous FROM public.images
  WHERE id = 'acbc7498-6951-5c87-b838-d724006b0f0c'::uuid
    AND building_id = 'afac1e48-46c2-4765-9776-664cb4ecf12f'::uuid;
  IF inserted <> 1 OR previous <> 1 THEN
    RAISE EXCEPTION 'Batch 004 rollback preflight failed: inserted %, previous %', inserted, previous;
  END IF;
END $$;

DELETE FROM public.images
WHERE building_id = 'afac1e48-46c2-4765-9776-664cb4ecf12f'::uuid
  AND source_url = 'https://commons.wikimedia.org/wiki/File:Landappbw_158839_1819_Veranstaltungshalle_Carmen-W%C3%BCrth-Forum_K%C3%BCnselsau-Gaisbach.jpg';

UPDATE public.images SET is_primary = true
WHERE id = 'acbc7498-6951-5c87-b838-d724006b0f0c'::uuid
  AND building_id = 'afac1e48-46c2-4765-9776-664cb4ecf12f'::uuid;

COMMIT;
