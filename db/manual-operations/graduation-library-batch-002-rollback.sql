-- Rollback graduation library batch 002 only.
-- Refuses to run if reviewed rows drifted or acquired external relations.

BEGIN;

CREATE TEMP TABLE architect_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO architect_rollback VALUES
  ('86ca23bf-5739-5281-974b-d90b06019106'::uuid, 'coelacanth-associates-nagoya'),
  ('4ec76862-cf0a-505f-82fc-e01b8fca9274'::uuid, 'unemori-architects'),
  ('47eb1eb9-882a-54c1-95e7-b89ef7661097'::uuid, 'mitsuru-senda-environment-design-institute'),
  ('38b07fbd-27a4-5950-adf5-b6e156b4c2f2'::uuid, 'ala-architects'),
  ('34c5e223-fe8a-548e-b784-f78aea76b68b'::uuid, 'schmidt-hammer-lassen'),
  ('b8c0aa1f-3beb-5c87-ba25-f129da4cd0ff'::uuid, 'lundhagem-atelier-oslo'),
  ('fd59bda6-b2df-541c-9471-3125c0d1fff7'::uuid, 'alsop-stormer'),
  ('5f42cdc6-66ef-5689-9cbb-87ff3c519534'::uuid, 'snohetta'),
  ('2dc0da5c-e404-5871-a5db-850d9c91609b'::uuid, 'civic-architects'),
  ('fe639daa-a3f3-5c6e-a15e-a0c5ac73c2d8'::uuid, 'adjaye-associates'),
  ('3233a12a-1620-5ee0-b655-e9e56edb9f81'::uuid, 'mecanoo');
CREATE TEMP TABLE building_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO building_rollback VALUES
  ('2739a5c9-404f-50d7-bbe7-5cf17516cb98'::uuid, 'tama-art-university-hachioji-library'),
  ('bed234bc-94f7-57d1-8592-3ea05e6bbbb5'::uuid, 'kozakai-kifukan-community-center'),
  ('1ed15436-687d-5020-a0ef-b1e28a0f19e1'::uuid, 'sukagawa-community-center-tette'),
  ('f64260d6-2859-5735-b053-c74bafa46aed'::uuid, 'ishikawa-prefectural-library'),
  ('6b926e74-2b36-53d4-a5e2-7dae96b56904'::uuid, 'nakajima-library-akita-international-university'),
  ('5eb66d05-ac6b-5b59-8207-0be231f3706e'::uuid, 'helsinki-central-library-oodi'),
  ('06beedb1-fe15-5724-bc46-994a829e5ce1'::uuid, 'dokk1'),
  ('6901a4d1-0a4a-5833-b59d-01d2bcf1cc75'::uuid, 'deichman-bjorvika'),
  ('badd5949-61cf-5e7c-83c2-80415f8c7592'::uuid, 'peckham-library'),
  ('01f36d99-7beb-5310-acba-623b775ca9ca'::uuid, 'bibliotheca-alexandrina'),
  ('e6b45af1-459e-56d2-b8a7-e4efa60a3776'::uuid, 'lochal-public-library'),
  ('abd3201b-abdd-5acf-a52c-c9914f65698f'::uuid, 'idea-store-whitechapel'),
  ('7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid, 'book-mountain-spijkenisse'),
  ('6f349aa6-a2bc-58f0-be15-347f1c8aae62'::uuid, 'library-of-birmingham');
CREATE TEMP TABLE image_rollback (id uuid PRIMARY KEY, building_id uuid NOT NULL UNIQUE, source_url text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO image_rollback VALUES
  ('43d895d3-7cd6-518f-8e35-d5e7362c48c4'::uuid, '2739a5c9-404f-50d7-bbe7-5cf17516cb98'::uuid, 'https://commons.wikimedia.org/wiki/File:Tama_Art_University_Library.JPG'),
  ('dbdc9212-67d9-5c06-8992-dfea6f470791'::uuid, 'bed234bc-94f7-57d1-8592-3ea05e6bbbb5'::uuid, 'https://commons.wikimedia.org/wiki/File:Kozakai_Kifukan_2021-05_ac_(1).jpg'),
  ('367b2843-ca8b-5dc4-a16a-df9dffdf280f'::uuid, '1ed15436-687d-5020-a0ef-b1e28a0f19e1'::uuid, 'https://commons.wikimedia.org/wiki/File:Sukagawa_Citizen_Exchange_Center_Tette.jpg'),
  ('c5f883b5-df00-558f-879d-4d7a4adfb83f'::uuid, 'f64260d6-2859-5735-b053-c74bafa46aed'::uuid, 'https://commons.wikimedia.org/wiki/File:Ishikawa_Prefectural_Library_2022-07_ac_(1).jpg'),
  ('f2b48137-99c5-51f4-a47b-2ebd24bc8808'::uuid, '6b926e74-2b36-53d4-a5e2-7dae96b56904'::uuid, 'https://commons.wikimedia.org/wiki/File:Inside_Nakajima_Library.jpg'),
  ('64f156d7-fcb7-5219-bef3-b34ccc4fa8a2'::uuid, '5eb66d05-ac6b-5b59-8207-0be231f3706e'::uuid, 'https://commons.wikimedia.org/wiki/File:Helsinki_Central_Library_Oodi_from_north.jpg'),
  ('1903c53a-9d21-5548-9015-d55c5ce44c05'::uuid, '06beedb1-fe15-5724-bc46-994a829e5ce1'::uuid, 'https://commons.wikimedia.org/wiki/File:Dokk1_version_3.jpg'),
  ('14c61c3e-5666-5e49-b091-7efc643cba0d'::uuid, '6901a4d1-0a4a-5833-b59d-01d2bcf1cc75'::uuid, 'https://commons.wikimedia.org/wiki/File:Deichman_Bj%C3%B8rvika,_Oslo_-_53132063275.jpg'),
  ('33513367-283f-57f9-8b88-0ca205ba119a'::uuid, 'badd5949-61cf-5e7c-83c2-80415f8c7592'::uuid, 'https://commons.wikimedia.org/wiki/File:Peckham_library_exterior_1.jpg'),
  ('42741e78-8080-503b-b217-ac43f3ecd34a'::uuid, '01f36d99-7beb-5310-acba-623b775ca9ca'::uuid, 'https://commons.wikimedia.org/wiki/File:BA_outside_view.jpg'),
  ('e3446519-a9f1-599d-82ee-b7ac9d2adf32'::uuid, 'e6b45af1-459e-56d2-b8a7-e4efa60a3776'::uuid, 'https://commons.wikimedia.org/wiki/File:Exterieur_aanzicht_Bibliotheek_LocHal_Tilburg,_april_2019.jpg'),
  ('9f3d5569-1d00-5d8b-b2d5-87e870491041'::uuid, 'abd3201b-abdd-5acf-a52c-c9914f65698f'::uuid, 'https://commons.wikimedia.org/wiki/File:Idea_store_2.jpg'),
  ('b734edbb-6fc1-56e9-ab4b-1a700743fc2d'::uuid, '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid, 'https://commons.wikimedia.org/wiki/File:Boekenberg_DSCF1911.JPG'),
  ('5ef712a9-c2a1-5a5b-8c0c-7a614efe610b'::uuid, '6f349aa6-a2bc-58f0-be15-347f1c8aae62'::uuid, 'https://commons.wikimedia.org/wiki/File:Exterior_Library_of_Birmingham_England.jpg');
CREATE TEMP TABLE profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO profile_rollback VALUES
  ('CASE-036', '2739a5c9-404f-50d7-bbe7-5cf17516cb98'::uuid),
  ('CASE-076', 'bed234bc-94f7-57d1-8592-3ea05e6bbbb5'::uuid),
  ('CASE-081', '1ed15436-687d-5020-a0ef-b1e28a0f19e1'::uuid),
  ('CASE-092', 'f64260d6-2859-5735-b053-c74bafa46aed'::uuid),
  ('CASE-095', '6b926e74-2b36-53d4-a5e2-7dae96b56904'::uuid),
  ('CASE-098', '5eb66d05-ac6b-5b59-8207-0be231f3706e'::uuid),
  ('CASE-101', '06beedb1-fe15-5724-bc46-994a829e5ce1'::uuid),
  ('CASE-105', '6901a4d1-0a4a-5833-b59d-01d2bcf1cc75'::uuid),
  ('CASE-112', 'badd5949-61cf-5e7c-83c2-80415f8c7592'::uuid),
  ('CASE-113', '01f36d99-7beb-5310-acba-623b775ca9ca'::uuid),
  ('CASE-114', 'e6b45af1-459e-56d2-b8a7-e4efa60a3776'::uuid),
  ('CASE-115', 'abd3201b-abdd-5acf-a52c-c9914f65698f'::uuid),
  ('CASE-130', '7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid),
  ('CASE-137', '6f349aa6-a2bc-58f0-be15-347f1c8aae62'::uuid);
CREATE TEMP TABLE assignment_rollback (building_id uuid NOT NULL, function_slug text NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
INSERT INTO assignment_rollback VALUES
  ('2739a5c9-404f-50d7-bbe7-5cf17516cb98'::uuid, 'library'),
  ('2739a5c9-404f-50d7-bbe7-5cf17516cb98'::uuid, 'university'),
  ('bed234bc-94f7-57d1-8592-3ea05e6bbbb5'::uuid, 'library'),
  ('bed234bc-94f7-57d1-8592-3ea05e6bbbb5'::uuid, 'community-center'),
  ('bed234bc-94f7-57d1-8592-3ea05e6bbbb5'::uuid, 'mixed-use'),
  ('1ed15436-687d-5020-a0ef-b1e28a0f19e1'::uuid, 'library'),
  ('1ed15436-687d-5020-a0ef-b1e28a0f19e1'::uuid, 'community-center'),
  ('1ed15436-687d-5020-a0ef-b1e28a0f19e1'::uuid, 'mixed-use'),
  ('f64260d6-2859-5735-b053-c74bafa46aed'::uuid, 'library'),
  ('f64260d6-2859-5735-b053-c74bafa46aed'::uuid, 'community-center'),
  ('6b926e74-2b36-53d4-a5e2-7dae96b56904'::uuid, 'library'),
  ('6b926e74-2b36-53d4-a5e2-7dae96b56904'::uuid, 'university'),
  ('5eb66d05-ac6b-5b59-8207-0be231f3706e'::uuid, 'library'),
  ('5eb66d05-ac6b-5b59-8207-0be231f3706e'::uuid, 'community-center'),
  ('5eb66d05-ac6b-5b59-8207-0be231f3706e'::uuid, 'mixed-use'),
  ('06beedb1-fe15-5724-bc46-994a829e5ce1'::uuid, 'library'),
  ('06beedb1-fe15-5724-bc46-994a829e5ce1'::uuid, 'community-center'),
  ('06beedb1-fe15-5724-bc46-994a829e5ce1'::uuid, 'mixed-use'),
  ('6901a4d1-0a4a-5833-b59d-01d2bcf1cc75'::uuid, 'library'),
  ('badd5949-61cf-5e7c-83c2-80415f8c7592'::uuid, 'library'),
  ('badd5949-61cf-5e7c-83c2-80415f8c7592'::uuid, 'community-center'),
  ('01f36d99-7beb-5310-acba-623b775ca9ca'::uuid, 'library'),
  ('01f36d99-7beb-5310-acba-623b775ca9ca'::uuid, 'museum'),
  ('01f36d99-7beb-5310-acba-623b775ca9ca'::uuid, 'mixed-use'),
  ('e6b45af1-459e-56d2-b8a7-e4efa60a3776'::uuid, 'library'),
  ('e6b45af1-459e-56d2-b8a7-e4efa60a3776'::uuid, 'community-center'),
  ('e6b45af1-459e-56d2-b8a7-e4efa60a3776'::uuid, 'mixed-use'),
  ('abd3201b-abdd-5acf-a52c-c9914f65698f'::uuid, 'library'),
  ('abd3201b-abdd-5acf-a52c-c9914f65698f'::uuid, 'community-center'),
  ('abd3201b-abdd-5acf-a52c-c9914f65698f'::uuid, 'mixed-use'),
  ('7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid, 'library'),
  ('7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid, 'community-center'),
  ('7cdda9cd-7b2c-57b0-8b29-db78d2ff7248'::uuid, 'mixed-use'),
  ('6f349aa6-a2bc-58f0-be15-347f1c8aae62'::uuid, 'library'),
  ('6f349aa6-a2bc-58f0-be15-347f1c8aae62'::uuid, 'theatre'),
  ('6f349aa6-a2bc-58f0-be15-347f1c8aae62'::uuid, 'mixed-use');

DO $$
DECLARE
  external_relations integer;
BEGIN
  IF (SELECT count(*) FROM public.architects target JOIN architect_rollback seed USING (id, slug)) <> 11
    OR (SELECT count(*) FROM public.buildings target JOIN building_rollback seed USING (id, slug)) <> 14
    OR (SELECT count(*) FROM public.images target JOIN image_rollback seed USING (id, building_id, source_url)) <> 14
    OR (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_rollback seed USING (case_id, building_id)) <> 14
    OR (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_rollback seed USING (building_id, function_slug)) <> 36 THEN
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
    RAISE EXCEPTION 'Rollback refused: found % external relations added after batch 002', external_relations;
  END IF;
END $$;

DELETE FROM public.building_function_assignments target USING assignment_rollback seed WHERE target.building_id = seed.building_id AND target.function_slug = seed.function_slug;
DELETE FROM public.graduation_case_profiles target USING profile_rollback seed WHERE target.case_id = seed.case_id AND target.building_id = seed.building_id;
DELETE FROM public.images target USING image_rollback seed WHERE target.id = seed.id AND target.building_id = seed.building_id AND target.source_url = seed.source_url;
DELETE FROM public.buildings target USING building_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;
DELETE FROM public.architects target USING architect_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;

COMMIT;
