-- Rollback graduation museum batch 001 only.
-- Refuses to run if reviewed rows drifted or acquired external relations.

BEGIN;

CREATE TEMP TABLE architect_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO architect_rollback VALUES
  ('45779757-de71-5295-b346-e2b7331388a2'::uuid, 'hiroshi-sambuichi'),
  ('70f5f170-6142-552e-acfa-9f12af2257bb'::uuid, 'ryue-nishizawa'),
  ('61138a5c-9829-5fca-9619-9872e84dbce5'::uuid, 'nikken-sekkei'),
  ('d6c1fb23-17e0-5256-a571-99d7dcf777bb'::uuid, 'jun-aoki-tezzo-nishizawa'),
  ('1be57c89-0007-56f8-a7d1-96b09e5b1bc5'::uuid, 'takenaka-corporation'),
  ('86de630c-8c9f-5ba3-b40a-278a70c29015'::uuid, 'yasuda-atelier'),
  ('af49165b-6ce2-5792-956a-dead0645df7f'::uuid, 'peter-cook-colin-fournier'),
  ('516ce1f7-20a5-5b7e-926c-7ee67ebc35b2'::uuid, 'henning-larsen'),
  ('45622cdd-8e07-5a72-9857-9cadf56ba3a3'::uuid, 'heatherwick-studio');
CREATE TEMP TABLE building_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO building_rollback VALUES
  ('9a7ada39-c60a-5805-ae54-e5df5b10a780'::uuid, 'inujima-seirensho-art-museum'),
  ('30aef487-cc52-5198-af18-59fee1add670'::uuid, 'teshima-art-museum'),
  ('053fb9eb-e536-5a1a-a070-5e1d23a865e7'::uuid, 'towada-art-center'),
  ('2f162c1a-4861-564e-ab0b-1080eaec389d'::uuid, 'kadokawa-culture-museum'),
  ('73f72808-e942-57e1-9e81-e7da0701323a'::uuid, 'hoki-museum'),
  ('745996bf-533b-56f3-a80b-4f0fc7b2d269'::uuid, 'oita-prefectural-art-museum'),
  ('abb72157-0dbf-549c-a378-3fe8ae013bd9'::uuid, 'kyoto-city-kyocera-museum-of-art'),
  ('bf88b372-42b0-532f-87bb-33077fa0b6da'::uuid, 'nagasaki-prefectural-art-museum'),
  ('22d7c427-87f9-5884-84f0-f6c88fc65bde'::uuid, 'sagawa-art-museum'),
  ('f0416e50-a744-5391-b680-5948f6636ae8'::uuid, 'fukuda-art-museum'),
  ('65cca6df-9211-5abc-8979-b0d618b42207'::uuid, 'kunsthaus-graz'),
  ('4a276826-cf33-57ac-80ea-ea7ea805f0ad'::uuid, 'maxxi-museum-of-xxi-century-arts'),
  ('436fc652-fae5-57e5-8907-47f2b496cc73'::uuid, 'moesgaard-museum'),
  ('37417806-10db-5418-a401-cfddbee92dff'::uuid, 'zeitz-mocaa');
CREATE TEMP TABLE image_rollback (id uuid PRIMARY KEY, building_id uuid NOT NULL UNIQUE, source_url text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO image_rollback VALUES
  ('b384cf69-d339-5964-b0f2-ecc079528285'::uuid, '9a7ada39-c60a-5805-ae54-e5df5b10a780'::uuid, 'https://commons.wikimedia.org/wiki/File:Inujima_Seirensho_Art_Museum_(8918114910).jpg'),
  ('a42bf291-5e5b-5818-9662-76a59ba81368'::uuid, '30aef487-cc52-5198-af18-59fee1add670'::uuid, 'https://commons.wikimedia.org/wiki/File:Exterior_of_the_Teshima_Art_Museum.jpg'),
  ('bd027c34-d7c4-567d-ba7f-8007ed261ce0'::uuid, '053fb9eb-e536-5a1a-a070-5e1d23a865e7'::uuid, 'https://commons.wikimedia.org/wiki/File:Towada_art_center.JPG'),
  ('1d412ccb-f9a7-5e95-94cf-bdb9a9bf2e7b'::uuid, '2f162c1a-4861-564e-ab0b-1080eaec389d'::uuid, 'https://commons.wikimedia.org/wiki/File:本棟から角川武蔵野ミュージアムを写す.jpg'),
  ('fde3c638-5f6d-5b94-81bf-d3fe04339e9c'::uuid, '73f72808-e942-57e1-9e81-e7da0701323a'::uuid, 'https://commons.wikimedia.org/wiki/File:Hoki_museum_outside_rear_001.jpg'),
  ('0acfe2b7-dcd2-592e-94fc-53c8ddde350c'::uuid, '745996bf-533b-56f3-a80b-4f0fc7b2d269'::uuid, 'https://commons.wikimedia.org/wiki/File:Oita_OPAM_1.jpg'),
  ('86a984ab-ef44-5fd4-a273-05b44688cefe'::uuid, 'abb72157-0dbf-549c-a378-3fe8ae013bd9'::uuid, 'https://commons.wikimedia.org/wiki/File:Kyoto-City-KYOCERA-Museum-of-Art.jpg'),
  ('89c9be7a-a4ca-5fce-ba34-12275e527398'::uuid, 'bf88b372-42b0-532f-87bb-33077fa0b6da'::uuid, 'https://commons.wikimedia.org/wiki/File:Nagasaki_Prefectural_Art_Museum_(3611415894).jpg'),
  ('fdffea8a-efda-553e-9796-94d33458cab8'::uuid, '22d7c427-87f9-5884-84f0-f6c88fc65bde'::uuid, 'https://commons.wikimedia.org/wiki/File:Sagawa_art_museum01s3200.jpg'),
  ('ae7a2e7a-3958-5871-94c8-7aceb6374463'::uuid, 'f0416e50-a744-5391-b680-5948f6636ae8'::uuid, 'https://commons.wikimedia.org/wiki/File:Fukuda_art_museum.jpg'),
  ('d81b9f27-3f48-5d8e-b97b-d6b0e6b6994b'::uuid, '65cca6df-9211-5abc-8979-b0d618b42207'::uuid, 'https://commons.wikimedia.org/wiki/File:Graz_Kunsthaus-4476.jpg'),
  ('e165b59a-513e-5dd9-be17-4edfefe2e3e0'::uuid, '4a276826-cf33-57ac-80ea-ea7ea805f0ad'::uuid, 'https://commons.wikimedia.org/wiki/File:L%27int%C3%A9rieur_du_MAXXI_(Rome)_(34216328131).jpg'),
  ('16388114-8320-5fa5-a236-e35551a31eba'::uuid, '436fc652-fae5-57e5-8907-47f2b496cc73'::uuid, 'https://commons.wikimedia.org/wiki/File:Moesg%C3%A5rd_Museum%2C_New_building1.JPG'),
  ('c5a1fb98-34b2-5d7d-88ec-f8872f334b16'::uuid, '37417806-10db-5418-a401-cfddbee92dff'::uuid, 'https://commons.wikimedia.org/wiki/File:Exterior_Zeitz_MOCAA_-_Museum_of_Contermporary_Art_Africa.jpg');
CREATE TEMP TABLE profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO profile_rollback VALUES
  ('CASE-041', '9a7ada39-c60a-5805-ae54-e5df5b10a780'::uuid),
  ('CASE-045', '30aef487-cc52-5198-af18-59fee1add670'::uuid),
  ('CASE-047', '053fb9eb-e536-5a1a-a070-5e1d23a865e7'::uuid),
  ('CASE-051', '2f162c1a-4861-564e-ab0b-1080eaec389d'::uuid),
  ('CASE-052', '73f72808-e942-57e1-9e81-e7da0701323a'::uuid),
  ('CASE-053', '745996bf-533b-56f3-a80b-4f0fc7b2d269'::uuid),
  ('CASE-054', 'abb72157-0dbf-549c-a378-3fe8ae013bd9'::uuid),
  ('CASE-055', 'bf88b372-42b0-532f-87bb-33077fa0b6da'::uuid),
  ('CASE-058', '22d7c427-87f9-5884-84f0-f6c88fc65bde'::uuid),
  ('CASE-060', 'f0416e50-a744-5391-b680-5948f6636ae8'::uuid),
  ('CASE-109', '65cca6df-9211-5abc-8979-b0d618b42207'::uuid),
  ('CASE-118', '4a276826-cf33-57ac-80ea-ea7ea805f0ad'::uuid),
  ('CASE-124', '436fc652-fae5-57e5-8907-47f2b496cc73'::uuid),
  ('CASE-132', '37417806-10db-5418-a401-cfddbee92dff'::uuid);
CREATE TEMP TABLE assignment_rollback (building_id uuid NOT NULL, function_slug text NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
INSERT INTO assignment_rollback VALUES
  ('9a7ada39-c60a-5805-ae54-e5df5b10a780'::uuid, 'museum'),
  ('30aef487-cc52-5198-af18-59fee1add670'::uuid, 'museum'),
  ('053fb9eb-e536-5a1a-a070-5e1d23a865e7'::uuid, 'museum'),
  ('2f162c1a-4861-564e-ab0b-1080eaec389d'::uuid, 'museum'),
  ('2f162c1a-4861-564e-ab0b-1080eaec389d'::uuid, 'library'),
  ('2f162c1a-4861-564e-ab0b-1080eaec389d'::uuid, 'mixed-use'),
  ('73f72808-e942-57e1-9e81-e7da0701323a'::uuid, 'museum'),
  ('745996bf-533b-56f3-a80b-4f0fc7b2d269'::uuid, 'museum'),
  ('abb72157-0dbf-549c-a378-3fe8ae013bd9'::uuid, 'museum'),
  ('bf88b372-42b0-532f-87bb-33077fa0b6da'::uuid, 'museum'),
  ('22d7c427-87f9-5884-84f0-f6c88fc65bde'::uuid, 'museum'),
  ('f0416e50-a744-5391-b680-5948f6636ae8'::uuid, 'museum'),
  ('65cca6df-9211-5abc-8979-b0d618b42207'::uuid, 'museum'),
  ('4a276826-cf33-57ac-80ea-ea7ea805f0ad'::uuid, 'museum'),
  ('436fc652-fae5-57e5-8907-47f2b496cc73'::uuid, 'museum'),
  ('37417806-10db-5418-a401-cfddbee92dff'::uuid, 'museum');

DO $$
DECLARE
  external_relations integer;
BEGIN
  IF (SELECT count(*) FROM public.architects target JOIN architect_rollback seed USING (id, slug)) <> 9
    OR (SELECT count(*) FROM public.buildings target JOIN building_rollback seed USING (id, slug)) <> 14
    OR (SELECT count(*) FROM public.images target JOIN image_rollback seed USING (id, building_id, source_url)) <> 14
    OR (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_rollback seed USING (case_id, building_id)) <> 14
    OR (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_rollback seed USING (building_id, function_slug)) <> 16 THEN
    RAISE EXCEPTION 'Rollback refused: reviewed batch rows are missing or changed';
  END IF;

  SELECT
    (SELECT count(*) FROM public.images target JOIN building_rollback seed ON target.building_id = seed.id LEFT JOIN image_rollback expected ON target.id = expected.id WHERE expected.id IS NULL)
    + (SELECT count(*) FROM public.graduation_case_profiles target JOIN building_rollback seed ON target.building_id = seed.id LEFT JOIN profile_rollback expected ON target.case_id = expected.case_id WHERE expected.case_id IS NULL)
    + (SELECT count(*) FROM public.building_function_assignments target JOIN building_rollback seed ON target.building_id = seed.id LEFT JOIN assignment_rollback expected ON target.building_id = expected.building_id AND target.function_slug = expected.function_slug WHERE expected.building_id IS NULL)
    + (SELECT count(*) FROM public.building_styles target JOIN building_rollback seed ON target.building_id = seed.id)
    + (SELECT count(*) FROM public.building_eras target JOIN building_rollback seed ON target.building_id = seed.id)
    + (SELECT count(*) FROM public.curated_images target JOIN building_rollback seed ON target.building_id = seed.id)
    + (SELECT count(*) FROM public.architect_styles target JOIN architect_rollback seed ON target.architect_id = seed.id)
    + (SELECT count(*) FROM public.architect_eras target JOIN architect_rollback seed ON target.architect_id = seed.id)
    + (SELECT count(*) FROM public.architect_influences target JOIN architect_rollback seed ON target.architect_id = seed.id OR target.influenced_id = seed.id)
    + (SELECT count(*) FROM public.buildings target JOIN architect_rollback seed ON target.architect_id = seed.id LEFT JOIN building_rollback expected ON target.id = expected.id WHERE expected.id IS NULL)
  INTO external_relations;
  IF external_relations <> 0 THEN
    RAISE EXCEPTION 'Rollback refused: found % external relations added after graduation-museum-batch-001', external_relations;
  END IF;
END $$;

DELETE FROM public.building_function_assignments target USING assignment_rollback seed WHERE target.building_id = seed.building_id AND target.function_slug = seed.function_slug;
DELETE FROM public.graduation_case_profiles target USING profile_rollback seed WHERE target.case_id = seed.case_id AND target.building_id = seed.building_id;
DELETE FROM public.images target USING image_rollback seed WHERE target.id = seed.id AND target.building_id = seed.building_id AND target.source_url = seed.source_url;
DELETE FROM public.buildings target USING building_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;
DELETE FROM public.architects target USING architect_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;

COMMIT;
