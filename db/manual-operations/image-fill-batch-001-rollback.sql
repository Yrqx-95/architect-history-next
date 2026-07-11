-- REVIEW DRAFT ONLY. Rollback for image fill batch 001.

BEGIN;

CREATE TEMP TABLE reviewed_image_fill_batch_001_rollback (
  building_slug text PRIMARY KEY,
  building_id uuid NOT NULL,
  previous_primary_id uuid NOT NULL,
  inserted_source_url text NOT NULL
) ON COMMIT DROP;

INSERT INTO reviewed_image_fill_batch_001_rollback (
  building_slug, building_id, previous_primary_id, inserted_source_url
) VALUES
  ('auerbacher-home', 'e6d2448e-a89b-4154-9de4-051534d2ed23'::uuid, '49590e75-7b9b-5836-a320-afb6cc7e4f65'::uuid, 'https://commons.wikimedia.org/wiki/File:Auerbacher_Home.jpg'),
  ('j-w-schaffer-house', 'd2292481-1005-4eb9-80e2-820a64c7b73c'::uuid, '94b2c3c4-c9c6-5e1b-a73f-0d303f216541'::uuid, 'https://commons.wikimedia.org/wiki/File:J.W._SCHAFFER_HOUSE_GLENDALE_LOS_ANGELES_COUNTY_CA.jpg'),
  ('iesu-church-san-sebastian', 'b737a228-859a-4505-9652-9a42e545217f'::uuid, '95a5a759-51bd-530c-aa09-f880a0b04bd7'::uuid, 'https://commons.wikimedia.org/wiki/File:Iglesia_de_Iesu-Donostia-R._Moneo_(5).JPG'),
  ('extension-of-museo-del-prado', '0498ae68-ef74-4eba-b202-6820b6083dc7'::uuid, '2190f265-9f3d-57c5-826f-0eda86629e0f'::uuid, 'https://commons.wikimedia.org/wiki/File:%C2%AE_MADRID_E.U.S._ARTECTURA_MUSEO_DEL_PRADO_-_panoramio_(1).jpg'),
  ('arne-jacobsen-s-own-house', '3d223edd-4c06-423d-abde-0d92372a4fed'::uuid, '47eb2e38-8d50-5901-ac54-4de7bc4ae299'::uuid, 'https://commons.wikimedia.org/wiki/File:Godfred_Rodesvej_2.JPG'),
  ('casa-ghiringhelli', '655d41c8-6add-462b-b789-03569bea94b8'::uuid, 'a90ad609-c1ed-5c90-a5c3-729971b9ed9f'::uuid, 'https://commons.wikimedia.org/wiki/File:Milano_-_Casa_Ghiringhelli_-_facciata.JPG'),
  ('friedhof-der-synagogengemeinde-konigsberg', 'd3a59685-a03d-4bb6-aaaa-fe0d42260b4f'::uuid, '16d2f048-2c77-5c21-b439-421fe446a8c1'::uuid, 'https://commons.wikimedia.org/wiki/File:K%C3%B6nigsberg,_Friedhof_der_Synagogengemeinde.jpg'),
  ('kirishima-international-concert-hall', 'fa9686a8-6be9-4700-ae0f-d2fd843fdf13'::uuid, '9b19cbb9-c922-5f44-8705-e55df0fcab4d'::uuid, 'https://commons.wikimedia.org/wiki/File:Miyama_Conceru.JPG'),
  ('institute-for-contemporary-art-richmond', '7ab04a6d-4e3e-4244-980d-5ce2e918ee88'::uuid, 'c90c9569-7f84-554b-adbb-dd67022019fe'::uuid, 'https://commons.wikimedia.org/wiki/File:Institute_for_Contemporary_Art,_Richmond_(night).jpg'),
  ('sports-hall-u2', '7b84dc94-e69c-44e1-8f16-228ed7def4cb'::uuid, 'd9014c5d-9712-5ba1-af84-16b4342007f7'::uuid, 'https://commons.wikimedia.org/wiki/File:University_of_Jyv%C3%A4skyl%C3%A4_-_U2.jpg'),
  ('grosse-pointe-public-library-central', '8bd1a441-71ca-4bcf-90df-f6d97eaee9b1'::uuid, '30546917-87ff-51f8-9832-5752ab437468'::uuid, 'https://commons.wikimedia.org/wiki/File:Grosse_Pointe_Public_Library_Central_Branch.jpg'),
  ('palazzo-abatellis', '3a9b8412-c218-48c6-8e99-3e1bdf2294ed'::uuid, 'b6edd431-d60a-510f-af8f-ed86ac81ab73'::uuid, 'https://commons.wikimedia.org/wiki/File:Palermo-Palazzo-Abatellis-bjs2007-01.jpg'),
  ('college-of-education-staff-dormitory', '4f3c1415-eba0-4951-814f-ad47a96ca8d5'::uuid, '54154e93-ac7d-5ef3-a6fc-2a68c2b1fda2'::uuid, 'https://commons.wikimedia.org/wiki/File:JYU_-_G.jpg');

DO $$
DECLARE
  expected_count integer := 13;
  inserted_count integer;
  previous_count integer;
  unexpected_primary_count integer;
BEGIN
  SELECT count(*) INTO inserted_count
  FROM reviewed_image_fill_batch_001_rollback AS decision
  JOIN public.images AS image
    ON image.building_id = decision.building_id
   AND image.source_url = decision.inserted_source_url
   AND image.is_primary = true;

  IF inserted_count <> expected_count THEN
    RAISE EXCEPTION 'Expected % inserted primary images, found %', expected_count, inserted_count;
  END IF;

  SELECT count(*) INTO previous_count
  FROM reviewed_image_fill_batch_001_rollback AS decision
  JOIN public.images AS image
    ON image.id = decision.previous_primary_id
   AND image.building_id = decision.building_id;

  IF previous_count <> expected_count THEN
    RAISE EXCEPTION 'Expected % previous primary rows, found %', expected_count, previous_count;
  END IF;

  SELECT count(*) INTO unexpected_primary_count
  FROM reviewed_image_fill_batch_001_rollback AS decision
  JOIN public.images AS image
    ON image.building_id = decision.building_id
   AND image.is_primary = true
   AND image.source_url <> decision.inserted_source_url;

  IF unexpected_primary_count <> 0 THEN
    RAISE EXCEPTION 'Found % unexpected primary images; review rollback manually', unexpected_primary_count;
  END IF;
END $$;

DELETE FROM public.images AS image
USING reviewed_image_fill_batch_001_rollback AS decision
WHERE image.building_id = decision.building_id
  AND image.source_url = decision.inserted_source_url;

UPDATE public.images AS image
SET is_primary = true
FROM reviewed_image_fill_batch_001_rollback AS decision
WHERE image.id = decision.previous_primary_id
  AND image.building_id = decision.building_id;

COMMIT;
