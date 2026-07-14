-- Rollback for image fill batch 006.
BEGIN;

DO $$
DECLARE inserted integer; previous integer;
BEGIN
  SELECT count(*) INTO inserted FROM public.images WHERE building_id='be22ec30-079e-48ec-b5f0-fc7753015b13'::uuid AND source_url='https://commons.wikimedia.org/wiki/File:Willis_Harpel_House_(14).jpg' AND is_primary=true;
  SELECT count(*) INTO previous FROM public.images WHERE id='a81e0914-dbd2-5c5e-afc1-bae9f4988592'::uuid AND building_id='be22ec30-079e-48ec-b5f0-fc7753015b13'::uuid;
  IF inserted<>1 OR previous<>1 THEN RAISE EXCEPTION 'Batch 006 rollback preflight failed: inserted %, previous %', inserted, previous; END IF;
END $$;

DELETE FROM public.images WHERE building_id='be22ec30-079e-48ec-b5f0-fc7753015b13'::uuid AND source_url='https://commons.wikimedia.org/wiki/File:Willis_Harpel_House_(14).jpg';
UPDATE public.images SET is_primary=true WHERE id='a81e0914-dbd2-5c5e-afc1-bae9f4988592'::uuid;

COMMIT;
