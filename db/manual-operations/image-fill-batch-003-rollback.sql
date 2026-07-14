-- Rollback for image fill batch 003.
BEGIN;

CREATE TEMP TABLE image_fill_batch_002_rollback (building_slug text PRIMARY KEY, building_id uuid NOT NULL, previous_primary_id uuid NOT NULL, inserted_source_url text NOT NULL) ON COMMIT DROP;
INSERT INTO image_fill_batch_002_rollback VALUES
  ('alfred-lerner-hall', '196b190d-5eea-4f1b-9c44-3ef957eb8afb'::uuid, '5f340bdb-0296-5bfd-b1a9-73b7d1c9f571'::uuid, 'https://commons.wikimedia.org/wiki/File:Alfred_Lerner_Hall,_Columbia_University.jpg'),
  ('haras-de-la-huderie', '29e904ff-ea4d-4724-98ff-050b5a7028b2'::uuid, '5ad6d6a8-6918-5037-99a1-cf819b783776'::uuid, 'https://commons.wikimedia.org/wiki/File:Villa_Sayer_(Glanville,_Calvados).jpg'),
  ('ibaraki-prefectural-culture-center', '9cf2d0b1-6f13-44d2-94dc-651412f53b7e'::uuid, 'b559d655-27ef-54ff-86b4-d45e544d1f16'::uuid, 'https://commons.wikimedia.org/wiki/File:Ibaraki_Prefectural_Culture_Center.JPG'),
  ('john-and-mary-lautner-house', '68f11b12-2932-4f24-a43e-5f5f3a4d20d4'::uuid, 'd37c46f7-a814-5744-9124-0c2f7fc4c795'::uuid, 'https://commons.wikimedia.org/wiki/File:Lautner_House,_Micheltorena.jpg'),
  ('kinokuniya-hall', '83b1e754-262a-4ef7-b9df-180d1cd1b221'::uuid, '514ad075-a5b9-5990-ab25-44e9e9d3571d'::uuid, 'https://commons.wikimedia.org/wiki/File:Shinjuku_KINOKUNIYA_COMPANY.jpg'),
  ('revere-quality-institute-house', 'a030f7d3-5371-4ffe-9609-d5ba8e16bdb7'::uuid, '6642abce-ae0d-5041-96ba-366cf0cc5478'::uuid, 'https://commons.wikimedia.org/wiki/File:Sarasota_FL_Revere_Quality_House01.jpg'),
  ('reynolds-metals-company-international-headquarters', '862b704e-fde8-463a-8457-11064a4bc55b'::uuid, 'ed79524d-7adc-5d2f-bdbf-070723134a09'::uuid, 'https://commons.wikimedia.org/wiki/File:Reynolds_Headquarters.JPG'),
  ('sakai-city-semboku-suemura-archaeological', 'f389c0e1-619f-47b8-8d6b-1fc8c0347723'::uuid, '477ac59e-85cb-50cd-9009-c03ccc54b984'::uuid, 'https://commons.wikimedia.org/wiki/File:%E5%A4%A7%E9%98%AA%E5%BA%9C%E7%AB%8B%E6%B3%89%E5%8C%97%E8%80%83%E5%8F%A4%E8%B3%87%E6%96%99%E9%A4%A8.jpg'),
  ('sheats-apartments', '1659b941-69ab-4e86-af23-f46a3fd505af'::uuid, '215834be-e793-594b-b682-9c43e60b376f'::uuid, 'https://commons.wikimedia.org/wiki/File:Sheets_Apartments_(Westwood).jpg');

DO $$
DECLARE expected integer := 9; inserted integer; previous integer;
BEGIN
  SELECT count(*) INTO inserted FROM image_fill_batch_002_rollback d JOIN public.images i ON i.building_id=d.building_id AND i.source_url=d.inserted_source_url AND i.is_primary=true;
  SELECT count(*) INTO previous FROM image_fill_batch_002_rollback d JOIN public.images i ON i.id=d.previous_primary_id AND i.building_id=d.building_id;
  IF inserted <> expected OR previous <> expected THEN RAISE EXCEPTION 'Batch 002 rollback preflight failed: inserted %, previous %', inserted, previous; END IF;
END $$;

DELETE FROM public.images i USING image_fill_batch_002_rollback d WHERE i.building_id=d.building_id AND i.source_url=d.inserted_source_url;
UPDATE public.images i SET is_primary=true FROM image_fill_batch_002_rollback d WHERE i.id=d.previous_primary_id AND i.building_id=d.building_id;

COMMIT;
