-- Batch 006: reviewed Willis Harpel House Commons replacement.
BEGIN;

DO $$
DECLARE matched integer; primary_row integer; duplicate_row integer;
BEGIN
  SELECT count(*) INTO matched FROM public.buildings WHERE id='be22ec30-079e-48ec-b5f0-fc7753015b13'::uuid AND slug='willis-harpel-house';
  SELECT count(*) INTO primary_row FROM public.images WHERE id='a81e0914-dbd2-5c5e-afc1-bae9f4988592'::uuid AND building_id='be22ec30-079e-48ec-b5f0-fc7753015b13'::uuid AND is_primary=true;
  SELECT count(*) INTO duplicate_row FROM public.images WHERE building_id='be22ec30-079e-48ec-b5f0-fc7753015b13'::uuid AND source_url='https://commons.wikimedia.org/wiki/File:Willis_Harpel_House_(14).jpg';
  IF matched<>1 OR primary_row<>1 OR duplicate_row<>0 THEN RAISE EXCEPTION 'Batch 006 preflight failed: building %, primary %, duplicate %', matched, primary_row, duplicate_row; END IF;
END $$;

UPDATE public.images SET is_primary=false WHERE id='a81e0914-dbd2-5c5e-afc1-bae9f4988592'::uuid AND is_primary=true;
INSERT INTO public.images (building_id,url_original,url_thumb_400,photographer,source,license,source_url,img_type,is_primary)
VALUES ('be22ec30-079e-48ec-b5f0-fc7753015b13'::uuid,'https://upload.wikimedia.org/wikipedia/commons/3/35/Willis_Harpel_House_%2814%29.jpg','https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Willis_Harpel_House_%2814%29.jpg/500px-Willis_Harpel_House_%2814%29.jpg','JodiSummers','Wikimedia Commons','CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Willis_Harpel_House_(14).jpg','exterior',true);

COMMIT;
