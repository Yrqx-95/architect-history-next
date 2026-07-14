-- Rollback for image fill batch 005.
BEGIN;

CREATE TEMP TABLE image_fill_batch_005_rollback (building_id uuid PRIMARY KEY, previous_primary_id uuid NOT NULL, inserted_source_url text NOT NULL) ON COMMIT DROP;
INSERT INTO image_fill_batch_005_rollback VALUES
  ('5f4cca44-fd36-4128-9d34-74f211c22fcb'::uuid, '26a74c9f-8159-5fda-8d70-0fb342d683b0'::uuid, 'https://commons.wikimedia.org/wiki/File:Alvar_Aalto_Sunila_1.jpg'),
  ('0f546108-66aa-45e3-9bec-9aa33db346be'::uuid, 'a33a4c39-bf21-5001-a626-1777135131dc'::uuid, 'https://commons.wikimedia.org/wiki/File:Arena_Santa_Giulia_-_PalaItalia_illuminata_(11_gennaio_2026).jpg');

DO $$
DECLARE expected integer := 2; inserted integer; previous integer;
BEGIN
  SELECT count(*) INTO inserted FROM image_fill_batch_005_rollback d JOIN public.images i ON i.building_id=d.building_id AND i.source_url=d.inserted_source_url AND i.is_primary=true;
  SELECT count(*) INTO previous FROM image_fill_batch_005_rollback d JOIN public.images i ON i.id=d.previous_primary_id AND i.building_id=d.building_id;
  IF inserted <> expected OR previous <> expected THEN RAISE EXCEPTION 'Batch 005 rollback preflight failed: inserted %, previous %', inserted, previous; END IF;
END $$;

DELETE FROM public.images i USING image_fill_batch_005_rollback d WHERE i.building_id=d.building_id AND i.source_url=d.inserted_source_url;
UPDATE public.images i SET is_primary=true FROM image_fill_batch_005_rollback d WHERE i.id=d.previous_primary_id AND i.building_id=d.building_id;

COMMIT;
