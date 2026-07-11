-- REVIEW DRAFT ONLY. Do not run before human review.
-- Batch 001: replace low-confidence primary images with reviewed Commons images.
-- The transaction aborts if building identity, prior primary state, or duplicate state changed.

BEGIN;

CREATE TEMP TABLE reviewed_image_fill_batch_001 (
  building_slug text PRIMARY KEY,
  building_id uuid NOT NULL,
  previous_primary_id uuid NOT NULL,
  url_original text NOT NULL,
  url_thumb_400 text,
  photographer text,
  source text NOT NULL,
  license text NOT NULL,
  source_url text NOT NULL,
  img_type text NOT NULL
) ON COMMIT DROP;

INSERT INTO reviewed_image_fill_batch_001 (
  building_slug, building_id, previous_primary_id, url_original, url_thumb_400,
  photographer, source, license, source_url, img_type
) VALUES
  ('auerbacher-home', 'e6d2448e-a89b-4154-9de4-051534d2ed23'::uuid, '49590e75-7b9b-5836-a320-afb6cc7e4f65'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/5/52/Auerbacher_Home.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Auerbacher_Home.jpg/500px-Auerbacher_Home.jpg', 'Bruceherwig', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Auerbacher_Home.jpg', 'exterior'),
  ('j-w-schaffer-house', 'd2292481-1005-4eb9-80e2-820a64c7b73c'::uuid, '94b2c3c4-c9c6-5e1b-a73f-0d303f216541'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/1/1e/J.W._SCHAFFER_HOUSE_GLENDALE_LOS_ANGELES_COUNTY_CA.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/J.W._SCHAFFER_HOUSE_GLENDALE_LOS_ANGELES_COUNTY_CA.jpg/500px-J.W._SCHAFFER_HOUSE_GLENDALE_LOS_ANGELES_COUNTY_CA.jpg', 'JERRYE & ROY KLOTZ M.D.', 'Wikimedia Commons', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:J.W._SCHAFFER_HOUSE_GLENDALE_LOS_ANGELES_COUNTY_CA.jpg', 'exterior'),
  ('iesu-church-san-sebastian', 'b737a228-859a-4505-9652-9a42e545217f'::uuid, '95a5a759-51bd-530c-aa09-f880a0b04bd7'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/9/93/Iglesia_de_Iesu-Donostia-R._Moneo_%285%29.JPG', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Iglesia_de_Iesu-Donostia-R._Moneo_%285%29.JPG/500px-Iglesia_de_Iesu-Donostia-R._Moneo_%285%29.JPG', 'Simoncio', 'Wikimedia Commons', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Iglesia_de_Iesu-Donostia-R._Moneo_(5).JPG', 'exterior'),
  ('extension-of-museo-del-prado', '0498ae68-ef74-4eba-b202-6820b6083dc7'::uuid, '2190f265-9f3d-57c5-826f-0eda86629e0f'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/a/ad/%C2%AE_MADRID_E.U.S._ARTECTURA_MUSEO_DEL_PRADO_-_panoramio_%281%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/%C2%AE_MADRID_E.U.S._ARTECTURA_MUSEO_DEL_PRADO_-_panoramio_%281%29.jpg/500px-%C2%AE_MADRID_E.U.S._ARTECTURA_MUSEO_DEL_PRADO_-_panoramio_%281%29.jpg', 'Concepcion AMAT ORTA…', 'Wikimedia Commons', 'CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:%C2%AE_MADRID_E.U.S._ARTECTURA_MUSEO_DEL_PRADO_-_panoramio_(1).jpg', 'exterior'),
  ('arne-jacobsen-s-own-house', '3d223edd-4c06-423d-abde-0d92372a4fed'::uuid, '47eb2e38-8d50-5901-ac54-4de7bc4ae299'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Godfred_Rodesvej_2.JPG', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Godfred_Rodesvej_2.JPG/500px-Godfred_Rodesvej_2.JPG', 'Ramblersen', 'Wikimedia Commons', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Godfred_Rodesvej_2.JPG', 'exterior'),
  ('casa-ghiringhelli', '655d41c8-6add-462b-b789-03569bea94b8'::uuid, 'a90ad609-c1ed-5c90-a5c3-729971b9ed9f'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/6/64/Milano_-_Casa_Ghiringhelli_-_facciata.JPG', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Milano_-_Casa_Ghiringhelli_-_facciata.JPG/500px-Milano_-_Casa_Ghiringhelli_-_facciata.JPG', 'Arbalete', 'Wikimedia Commons', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Milano_-_Casa_Ghiringhelli_-_facciata.JPG', 'exterior'),
  ('friedhof-der-synagogengemeinde-konigsberg', 'd3a59685-a03d-4bb6-aaaa-fe0d42260b4f'::uuid, '16d2f048-2c77-5c21-b439-421fe446a8c1'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/9/90/K%C3%B6nigsberg%2C_Friedhof_der_Synagogengemeinde.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/K%C3%B6nigsberg%2C_Friedhof_der_Synagogengemeinde.jpg/500px-K%C3%B6nigsberg%2C_Friedhof_der_Synagogengemeinde.jpg', 'Bildarchiv Foto Marburg / Foto: unbekannt; Aufn.-Datum: um 1920/1939?; Fotokonvolut: Archiv Dr. Franz Stoedtner', 'Wikimedia Commons', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:K%C3%B6nigsberg,_Friedhof_der_Synagogengemeinde.jpg', 'exterior'),
  ('kirishima-international-concert-hall', 'fa9686a8-6be9-4700-ae0f-d2fd843fdf13'::uuid, '9b19cbb9-c922-5f44-8705-e55df0fcab4d'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Miyama_Conceru.JPG', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Miyama_Conceru.JPG/500px-Miyama_Conceru.JPG', 'hyolee2', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Miyama_Conceru.JPG', 'exterior'),
  ('institute-for-contemporary-art-richmond', '7ab04a6d-4e3e-4244-980d-5ce2e918ee88'::uuid, 'c90c9569-7f84-554b-adbb-dd67022019fe'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Institute_for_Contemporary_Art%2C_Richmond_%28night%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Institute_for_Contemporary_Art%2C_Richmond_%28night%29.jpg/500px-Institute_for_Contemporary_Art%2C_Richmond_%28night%29.jpg', 'Packer1028', 'Wikimedia Commons', 'CC0', 'https://commons.wikimedia.org/wiki/File:Institute_for_Contemporary_Art,_Richmond_(night).jpg', 'exterior'),
  ('sports-hall-u2', '7b84dc94-e69c-44e1-8f16-228ed7def4cb'::uuid, 'd9014c5d-9712-5ba1-af84-16b4342007f7'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/2/25/University_of_Jyv%C3%A4skyl%C3%A4_-_U2.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/University_of_Jyv%C3%A4skyl%C3%A4_-_U2.jpg/500px-University_of_Jyv%C3%A4skyl%C3%A4_-_U2.jpg', 'Tiia Monto', 'Wikimedia Commons', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:University_of_Jyv%C3%A4skyl%C3%A4_-_U2.jpg', 'exterior'),
  ('grosse-pointe-public-library-central', '8bd1a441-71ca-4bcf-90df-f6d97eaee9b1'::uuid, '30546917-87ff-51f8-9832-5752ab437468'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Grosse_Pointe_Public_Library_Central_Branch.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Grosse_Pointe_Public_Library_Central_Branch.jpg/500px-Grosse_Pointe_Public_Library_Central_Branch.jpg', 'Arbitrarily0', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Grosse_Pointe_Public_Library_Central_Branch.jpg', 'exterior'),
  ('palazzo-abatellis', '3a9b8412-c218-48c6-8e99-3e1bdf2294ed'::uuid, 'b6edd431-d60a-510f-af8f-ed86ac81ab73'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Palermo-Palazzo-Abatellis-bjs2007-01.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Palermo-Palazzo-Abatellis-bjs2007-01.jpg/500px-Palermo-Palazzo-Abatellis-bjs2007-01.jpg', 'Bjs', 'Wikimedia Commons', 'CC0', 'https://commons.wikimedia.org/wiki/File:Palermo-Palazzo-Abatellis-bjs2007-01.jpg', 'exterior'),
  ('college-of-education-staff-dormitory', '4f3c1415-eba0-4951-814f-ad47a96ca8d5'::uuid, '54154e93-ac7d-5ef3-a6fc-2a68c2b1fda2'::uuid, 'https://upload.wikimedia.org/wikipedia/commons/c/ce/JYU_-_G.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/JYU_-_G.jpg/500px-JYU_-_G.jpg', 'Tiia Monto', 'Wikimedia Commons', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:JYU_-_G.jpg', 'exterior');

DO $$
DECLARE
  expected_count integer := 13;
  matched_buildings integer;
  matched_primaries integer;
  duplicate_candidates integer;
BEGIN
  SELECT count(*) INTO matched_buildings
  FROM reviewed_image_fill_batch_001 AS decision
  JOIN public.buildings AS building
    ON building.id = decision.building_id
   AND building.slug = decision.building_slug;

  IF matched_buildings <> expected_count THEN
    RAISE EXCEPTION 'Expected % matched buildings, found %', expected_count, matched_buildings;
  END IF;

  SELECT count(*) INTO matched_primaries
  FROM reviewed_image_fill_batch_001 AS decision
  JOIN public.images AS image
    ON image.id = decision.previous_primary_id
   AND image.building_id = decision.building_id
   AND image.is_primary = true;

  IF matched_primaries <> expected_count THEN
    RAISE EXCEPTION 'Expected % unchanged prior primary images, found %', expected_count, matched_primaries;
  END IF;

  SELECT count(*) INTO duplicate_candidates
  FROM reviewed_image_fill_batch_001 AS decision
  JOIN public.images AS image
    ON image.building_id = decision.building_id
   AND image.source_url = decision.source_url;

  IF duplicate_candidates <> 0 THEN
    RAISE EXCEPTION 'Expected no existing reviewed candidate images, found %', duplicate_candidates;
  END IF;
END $$;

UPDATE public.images AS image
SET is_primary = false
FROM reviewed_image_fill_batch_001 AS decision
WHERE image.id = decision.previous_primary_id
  AND image.building_id = decision.building_id
  AND image.is_primary = true;

INSERT INTO public.images (
  building_id, url_original, url_thumb_400, photographer,
  source, license, source_url, img_type, is_primary
)
SELECT
  building_id, url_original, url_thumb_400, photographer,
  source, license, source_url, img_type, true
FROM reviewed_image_fill_batch_001;

COMMIT;
