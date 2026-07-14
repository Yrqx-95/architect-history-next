-- Batch 005: reviewed Sunila and Unipol Dome Commons replacements.
BEGIN;

CREATE TEMP TABLE image_fill_batch_005 (
  building_slug text PRIMARY KEY,
  building_id uuid NOT NULL,
  previous_primary_id uuid NOT NULL,
  url_original text NOT NULL,
  url_thumb_400 text,
  photographer text NOT NULL,
  source text NOT NULL,
  license text NOT NULL,
  source_url text NOT NULL,
  img_type text NOT NULL
) ON COMMIT DROP;

INSERT INTO image_fill_batch_005 VALUES
  ('sunila', '5f4cca44-fd36-4128-9d34-74f211c22fcb'::uuid, '26a74c9f-8159-5fda-8d70-0fb342d683b0'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/1/12/Alvar_Aalto_Sunila_1.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Alvar_Aalto_Sunila_1.jpg/500px-Alvar_Aalto_Sunila_1.jpg', 'Kymi', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Alvar_Aalto_Sunila_1.jpg', 'exterior'),
  ('unipol-dome', '0f546108-66aa-45e3-9bec-9aa33db346be'::uuid, 'a33a4c39-bf21-5001-a626-1777135131dc'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/7/76/Arena_Santa_Giulia_-_PalaItalia_illuminata_%2811_gennaio_2026%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Arena_Santa_Giulia_-_PalaItalia_illuminata_%2811_gennaio_2026%29.jpg/500px-Arena_Santa_Giulia_-_PalaItalia_illuminata_%2811_gennaio_2026%29.jpg', 'Marcuscalabresus', 'Wikimedia Commons', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Arena_Santa_Giulia_-_PalaItalia_illuminata_(11_gennaio_2026).jpg', 'exterior');

DO $$
DECLARE expected integer := 2; matched integer; primaries integer; duplicates integer;
BEGIN
  SELECT count(*) INTO matched FROM image_fill_batch_005 d JOIN public.buildings b ON b.id=d.building_id AND b.slug=d.building_slug;
  SELECT count(*) INTO primaries FROM image_fill_batch_005 d JOIN public.images i ON i.id=d.previous_primary_id AND i.building_id=d.building_id AND i.is_primary=true;
  SELECT count(*) INTO duplicates FROM image_fill_batch_005 d JOIN public.images i ON i.building_id=d.building_id AND i.source_url=d.source_url;
  IF matched <> expected OR primaries <> expected OR duplicates <> 0 THEN
    RAISE EXCEPTION 'Batch 005 preflight failed: buildings %, primaries %, duplicates %', matched, primaries, duplicates;
  END IF;
END $$;

UPDATE public.images i SET is_primary=false FROM image_fill_batch_005 d WHERE i.id=d.previous_primary_id AND i.building_id=d.building_id;
INSERT INTO public.images (building_id,url_original,url_thumb_400,photographer,source,license,source_url,img_type,is_primary)
SELECT building_id,url_original,url_thumb_400,photographer,source,license,source_url,img_type,true FROM image_fill_batch_005;

COMMIT;
