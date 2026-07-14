-- Batch 003: visually reviewed Wikimedia Commons image replacements.
BEGIN;

CREATE TEMP TABLE image_fill_batch_002 (
  building_slug text PRIMARY KEY, building_id uuid NOT NULL, previous_primary_id uuid NOT NULL,
  url_original text NOT NULL, url_thumb_400 text, photographer text, source text NOT NULL,
  license text NOT NULL, source_url text NOT NULL, img_type text NOT NULL
) ON COMMIT DROP;

INSERT INTO image_fill_batch_002 VALUES
  ('alfred-lerner-hall', '196b190d-5eea-4f1b-9c44-3ef957eb8afb'::uuid, '5f340bdb-0296-5bfd-b1a9-73b7d1c9f571'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Alfred_Lerner_Hall%2C_Columbia_University.jpg', 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Alfred_Lerner_Hall%2C_Columbia_University.jpg', 'Wikipetia4', 'Wikimedia Commons', 'CC BY 2.5', 'https://commons.wikimedia.org/wiki/File:Alfred_Lerner_Hall,_Columbia_University.jpg', 'exterior'),
  ('haras-de-la-huderie', '29e904ff-ea4d-4724-98ff-050b5a7028b2'::uuid, '5ad6d6a8-6918-5037-99a1-cf819b783776'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Villa_Sayer_%28Glanville%2C_Calvados%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Villa_Sayer_%28Glanville%2C_Calvados%29.jpg/500px-Villa_Sayer_%28Glanville%2C_Calvados%29.jpg', 'AD14MLF', 'Wikimedia Commons', 'CC0', 'https://commons.wikimedia.org/wiki/File:Villa_Sayer_(Glanville,_Calvados).jpg', 'exterior'),
  ('ibaraki-prefectural-culture-center', '9cf2d0b1-6f13-44d2-94dc-651412f53b7e'::uuid, 'b559d655-27ef-54ff-86b4-d45e544d1f16'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/9/91/Ibaraki_Prefectural_Culture_Center.JPG', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Ibaraki_Prefectural_Culture_Center.JPG/500px-Ibaraki_Prefectural_Culture_Center.JPG', 'Abasaa', 'Wikimedia Commons', 'Public domain', 'https://commons.wikimedia.org/wiki/File:Ibaraki_Prefectural_Culture_Center.JPG', 'exterior'),
  ('john-and-mary-lautner-house', '68f11b12-2932-4f24-a43e-5f5f3a4d20d4'::uuid, 'd37c46f7-a814-5744-9124-0c2f7fc4c795'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Lautner_House%2C_Micheltorena.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Lautner_House%2C_Micheltorena.jpg/500px-Lautner_House%2C_Micheltorena.jpg', 'ikkoskinen', 'Wikimedia Commons', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Lautner_House,_Micheltorena.jpg', 'exterior'),
  ('kinokuniya-hall', '83b1e754-262a-4ef7-b9df-180d1cd1b221'::uuid, '514ad075-a5b9-5990-ab25-44e9e9d3571d'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/1/16/Shinjuku_KINOKUNIYA_COMPANY.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Shinjuku_KINOKUNIYA_COMPANY.jpg/500px-Shinjuku_KINOKUNIYA_COMPANY.jpg', 'Lover of Romance', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Shinjuku_KINOKUNIYA_COMPANY.jpg', 'exterior'),
  ('revere-quality-institute-house', 'a030f7d3-5371-4ffe-9609-d5ba8e16bdb7'::uuid, '6642abce-ae0d-5041-96ba-366cf0cc5478'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Sarasota_FL_Revere_Quality_House01.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Sarasota_FL_Revere_Quality_House01.jpg/500px-Sarasota_FL_Revere_Quality_House01.jpg', 'Ebyabe', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Sarasota_FL_Revere_Quality_House01.jpg', 'exterior'),
  ('reynolds-metals-company-international-headquarters', '862b704e-fde8-463a-8457-11064a4bc55b'::uuid, 'ed79524d-7adc-5d2f-bdbf-070723134a09'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Reynolds_Headquarters.JPG', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Reynolds_Headquarters.JPG/500px-Reynolds_Headquarters.JPG', 'Crazyale', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Reynolds_Headquarters.JPG', 'exterior'),
  ('sakai-city-semboku-suemura-archaeological', 'f389c0e1-619f-47b8-8d6b-1fc8c0347723'::uuid, '477ac59e-85cb-50cd-9009-c03ccc54b984'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/3/37/%E5%A4%A7%E9%98%AA%E5%BA%9C%E7%AB%8B%E6%B3%89%E5%8C%97%E8%80%83%E5%8F%A4%E8%B3%87%E6%96%99%E9%A4%A8.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/%E5%A4%A7%E9%98%AA%E5%BA%9C%E7%AB%8B%E6%B3%89%E5%8C%97%E8%80%83%E5%8F%A4%E8%B3%87%E6%96%99%E9%A4%A8.jpg/500px-%E5%A4%A7%E9%98%AA%E5%BA%9C%E7%AB%8B%E6%B3%89%E5%8C%97%E8%80%83%E5%8F%A4%E8%B3%87%E6%96%99%E9%A4%A8.jpg', 'Kazukiokumura', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:%E5%A4%A7%E9%98%AA%E5%BA%9C%E7%AB%8B%E6%B3%89%E5%8C%97%E8%80%83%E5%8F%A4%E8%B3%87%E6%96%99%E9%A4%A8.jpg', 'exterior'),
  ('sheats-apartments', '1659b941-69ab-4e86-af23-f46a3fd505af'::uuid, '215834be-e793-594b-b682-9c43e60b376f'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/7/70/Sheets_Apartments_%28Westwood%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Sheets_Apartments_%28Westwood%29.jpg/500px-Sheets_Apartments_%28Westwood%29.jpg', 'Los Angeles', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Sheets_Apartments_(Westwood).jpg', 'exterior');

DO $$
DECLARE expected integer := 9; matched integer; primaries integer; duplicates integer;
BEGIN
  SELECT count(*) INTO matched FROM image_fill_batch_002 d JOIN public.buildings b ON b.id=d.building_id AND b.slug=d.building_slug;
  SELECT count(*) INTO primaries FROM image_fill_batch_002 d JOIN public.images i ON i.id=d.previous_primary_id AND i.building_id=d.building_id AND i.is_primary=true;
  SELECT count(*) INTO duplicates FROM image_fill_batch_002 d JOIN public.images i ON i.building_id=d.building_id AND i.source_url=d.source_url;
  IF matched <> expected OR primaries <> expected OR duplicates <> 0 THEN
    RAISE EXCEPTION 'Batch 002 preflight failed: buildings %, primaries %, duplicates %', matched, primaries, duplicates;
  END IF;
END $$;

UPDATE public.images i SET is_primary=false FROM image_fill_batch_002 d WHERE i.id=d.previous_primary_id AND i.building_id=d.building_id;
INSERT INTO public.images (building_id,url_original,url_thumb_400,photographer,source,license,source_url,img_type,is_primary)
SELECT building_id,url_original,url_thumb_400,photographer,source,license,source_url,img_type,true FROM image_fill_batch_002;

COMMIT;
