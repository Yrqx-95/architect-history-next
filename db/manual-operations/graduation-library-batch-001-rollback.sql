-- Rollback graduation library batch 001 only.
-- Refuses to run if reviewed rows drifted or acquired external relations.

BEGIN;

CREATE TEMP TABLE architect_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO architect_rollback VALUES
  ('8f156f56-c53f-56d3-a52a-569c592e9d08'::uuid, 'coelacanth-kh'),
  ('373cf2be-4c4d-5e22-9cd1-9413e3e77931'::uuid, 'kw-hg-architects'),
  ('87c54689-8de6-59c8-9c44-03d542987e84'::uuid, 'mari-ito-uao'),
  ('9795da73-a3ea-5f28-bf04-bdc31d2dfa02'::uuid, 'mikami-architects');
CREATE TEMP TABLE building_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO building_rollback VALUES
  ('6fef359f-7296-5e99-b1b7-7dc580fdfed2'::uuid, 'kanazawa-umimirai-library'),
  ('f53171cc-293c-579b-9425-1fc020b62542'::uuid, 'toyama-kirari'),
  ('38b54039-7e4e-5318-a0e9-ef02e199c561'::uuid, 'minna-no-mori-gifu-media-cosmos'),
  ('2f80a130-04e2-594a-abbe-10d7ab138cd0'::uuid, 'nakanoshima-childrens-book-forest'),
  ('e619eac8-d46f-5df5-b630-1d030850ee75'::uuid, 'yusuhara-community-library'),
  ('d5ad015d-93e2-5c1e-8cb3-174b5a6e098f'::uuid, 'musashino-place'),
  ('d77dfe51-52a0-552a-b617-c8007b994bea'::uuid, 'nasushiobara-city-library-miruru'),
  ('d801abfc-1290-5935-836d-9059ba4fedb5'::uuid, 'tonami-public-library');
CREATE TEMP TABLE image_rollback (id uuid PRIMARY KEY, building_id uuid NOT NULL UNIQUE, source_url text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO image_rollback VALUES
  ('9e040c03-8489-5f91-9ff5-2b66ede13666'::uuid, '6fef359f-7296-5e99-b1b7-7dc580fdfed2'::uuid, 'https://commons.wikimedia.org/wiki/File:Kanazawa_Umimirai_Library_exterior_ac_(4).jpg'),
  ('61a2c0d6-9476-5340-9aa6-9c43a7e9eb77'::uuid, 'f53171cc-293c-579b-9425-1fc020b62542'::uuid, 'https://commons.wikimedia.org/wiki/File:TOYAMA_KIRARI_exterior_in_the_morning_ac_(3).jpg'),
  ('00a43bf1-43b9-5208-b8b4-7df7040dcd72'::uuid, '38b54039-7e4e-5318-a0e9-ef02e199c561'::uuid, 'https://commons.wikimedia.org/wiki/File:Gifu_Media_Cosmos_exterior_ac_(1).jpg'),
  ('8756d9f9-7a88-53ad-95e5-ee23768484a2'::uuid, '2f80a130-04e2-594a-abbe-10d7ab138cd0'::uuid, 'https://commons.wikimedia.org/wiki/File:Nakanoshima_Children%60s_Book_Forest.jpg'),
  ('3f92811e-131d-529a-b974-f419c6cc1ccf'::uuid, 'e619eac8-d46f-5df5-b630-1d030850ee75'::uuid, 'https://commons.wikimedia.org/wiki/File:%E3%82%86%E3%81%99%E3%81%AF%E3%82%89%E9%9B%B2%E3%81%AE%E4%B8%8A%E3%81%AE%E5%9B%B3%E6%9B%B8%E9%A4%A8%EF%BC%88%E6%A2%BC%E5%8E%9F%E7%94%BA%E7%AB%8B%E5%9B%B3%E6%9B%B8%E9%A4%A8%EF%BC%89_02.jpg'),
  ('82e4073c-8163-5a23-8572-dfbf3333b0df'::uuid, 'd5ad015d-93e2-5c1e-8cb3-174b5a6e098f'::uuid, 'https://commons.wikimedia.org/wiki/File:Musashino_Place_exterior_ac_(1).jpg'),
  ('136a8b47-ecf3-5e41-b901-a86135c9ac35'::uuid, 'd77dfe51-52a0-552a-b617-c8007b994bea'::uuid, 'https://commons.wikimedia.org/wiki/File:Nasushiobara_Library_Miruru_1.jpg'),
  ('2f2e4851-8c76-5fbc-af0c-ee1916f53512'::uuid, 'd801abfc-1290-5935-836d-9059ba4fedb5'::uuid, 'https://commons.wikimedia.org/wiki/File:%E7%A0%BA%E6%B3%A2%E5%B8%82%E7%AB%8B%E7%A0%BA%E6%B3%A2%E5%9B%B3%E6%9B%B8%E9%A4%A8.jpg');
CREATE TEMP TABLE profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO profile_rollback VALUES
  ('CASE-018', '6fef359f-7296-5e99-b1b7-7dc580fdfed2'::uuid),
  ('CASE-021', 'f53171cc-293c-579b-9425-1fc020b62542'::uuid),
  ('CASE-022', '38b54039-7e4e-5318-a0e9-ef02e199c561'::uuid),
  ('CASE-023', '2f80a130-04e2-594a-abbe-10d7ab138cd0'::uuid),
  ('CASE-027', 'e619eac8-d46f-5df5-b630-1d030850ee75'::uuid),
  ('CASE-029', 'd5ad015d-93e2-5c1e-8cb3-174b5a6e098f'::uuid),
  ('CASE-042', 'd77dfe51-52a0-552a-b617-c8007b994bea'::uuid),
  ('CASE-070', 'd801abfc-1290-5935-836d-9059ba4fedb5'::uuid);
CREATE TEMP TABLE assignment_rollback (building_id uuid NOT NULL, function_slug text NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
INSERT INTO assignment_rollback VALUES
  ('6fef359f-7296-5e99-b1b7-7dc580fdfed2'::uuid, 'library'),
  ('6fef359f-7296-5e99-b1b7-7dc580fdfed2'::uuid, 'community-center'),
  ('f53171cc-293c-579b-9425-1fc020b62542'::uuid, 'library'),
  ('f53171cc-293c-579b-9425-1fc020b62542'::uuid, 'museum'),
  ('f53171cc-293c-579b-9425-1fc020b62542'::uuid, 'mixed-use'),
  ('38b54039-7e4e-5318-a0e9-ef02e199c561'::uuid, 'library'),
  ('38b54039-7e4e-5318-a0e9-ef02e199c561'::uuid, 'community-center'),
  ('38b54039-7e4e-5318-a0e9-ef02e199c561'::uuid, 'mixed-use'),
  ('2f80a130-04e2-594a-abbe-10d7ab138cd0'::uuid, 'library'),
  ('e619eac8-d46f-5df5-b630-1d030850ee75'::uuid, 'library'),
  ('e619eac8-d46f-5df5-b630-1d030850ee75'::uuid, 'community-center'),
  ('d5ad015d-93e2-5c1e-8cb3-174b5a6e098f'::uuid, 'library'),
  ('d5ad015d-93e2-5c1e-8cb3-174b5a6e098f'::uuid, 'community-center'),
  ('d5ad015d-93e2-5c1e-8cb3-174b5a6e098f'::uuid, 'mixed-use'),
  ('d77dfe51-52a0-552a-b617-c8007b994bea'::uuid, 'library'),
  ('d77dfe51-52a0-552a-b617-c8007b994bea'::uuid, 'community-center'),
  ('d801abfc-1290-5935-836d-9059ba4fedb5'::uuid, 'library');

DO $$
DECLARE
  external_relations integer;
BEGIN
  IF (SELECT count(*) FROM public.architects target JOIN architect_rollback seed USING (id, slug)) <> 4
    OR (SELECT count(*) FROM public.buildings target JOIN building_rollback seed USING (id, slug)) <> 8
    OR (SELECT count(*) FROM public.images target JOIN image_rollback seed USING (id, building_id, source_url)) <> 8
    OR (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_rollback seed USING (case_id, building_id)) <> 8
    OR (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_rollback seed USING (building_id, function_slug)) <> 17 THEN
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
    RAISE EXCEPTION 'Rollback refused: found % external relations added after batch 001', external_relations;
  END IF;
END $$;

DELETE FROM public.building_function_assignments target USING assignment_rollback seed WHERE target.building_id = seed.building_id AND target.function_slug = seed.function_slug;
DELETE FROM public.graduation_case_profiles target USING profile_rollback seed WHERE target.case_id = seed.case_id AND target.building_id = seed.building_id;
DELETE FROM public.images target USING image_rollback seed WHERE target.id = seed.id AND target.building_id = seed.building_id AND target.source_url = seed.source_url;
DELETE FROM public.buildings target USING building_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;
DELETE FROM public.architects target USING architect_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;

COMMIT;
