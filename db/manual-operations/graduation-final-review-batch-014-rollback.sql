-- Rollback graduation final review batch 014 only.
-- Refuses to run if reviewed rows drifted or acquired external relations.

BEGIN;

CREATE TEMP TABLE architect_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO architect_rollback VALUES
  ('47b27161-6976-5ecb-b05e-3f74538c44db'::uuid, 'j-mayer-h-architects'),
  ('cb364427-cc97-5696-88a1-22aaf2b07352'::uuid, 'lab-architecture-studio-bates-smart');
CREATE TEMP TABLE building_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO building_rollback VALUES
  ('be6b9af1-a699-5e5e-978a-eb1f17b2fbc4'::uuid, 'portland-japanese-garden-cultural-village'),
  ('87d4871f-1307-5d8a-b948-56f69a404e0f'::uuid, 'metropol-parasol'),
  ('a5d4f96c-ca21-57d9-9b38-b818a23540dd'::uuid, 'federation-square');
CREATE TEMP TABLE image_rollback (id uuid PRIMARY KEY, building_id uuid NOT NULL UNIQUE, source_url text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO image_rollback VALUES
  ('708879a7-7e39-5952-88ee-70bd181cbdc3'::uuid, 'be6b9af1-a699-5e5e-978a-eb1f17b2fbc4'::uuid, 'https://commons.wikimedia.org/wiki/File:Tsubo-Niwa_at_Portland_Japanese_Garden.jpg'),
  ('0e3f712d-732a-5bd3-a0a0-8d3f8ea2818f'::uuid, '87d4871f-1307-5d8a-b948-56f69a404e0f'::uuid, 'https://commons.wikimedia.org/wiki/File:Metropol_Parasol.JPG'),
  ('1cd70029-d1a2-56ad-8458-6869b205369c'::uuid, 'a5d4f96c-ca21-57d9-9b38-b818a23540dd'::uuid, 'https://commons.wikimedia.org/wiki/File:Federation_Square_Melbourne.jpg');
CREATE TEMP TABLE profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL) ON COMMIT DROP;
INSERT INTO profile_rollback VALUES
  ('CASE-100', 'be6b9af1-a699-5e5e-978a-eb1f17b2fbc4'::uuid),
  ('CASE-126', '87d4871f-1307-5d8a-b948-56f69a404e0f'::uuid),
  ('CASE-136', 'a5d4f96c-ca21-57d9-9b38-b818a23540dd'::uuid);
CREATE TEMP TABLE assignment_rollback (building_id uuid NOT NULL, function_slug text NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
INSERT INTO assignment_rollback VALUES
  ('be6b9af1-a699-5e5e-978a-eb1f17b2fbc4'::uuid, 'public-space'),
  ('87d4871f-1307-5d8a-b948-56f69a404e0f'::uuid, 'mixed-use'),
  ('87d4871f-1307-5d8a-b948-56f69a404e0f'::uuid, 'public-space'),
  ('87d4871f-1307-5d8a-b948-56f69a404e0f'::uuid, 'museum'),
  ('87d4871f-1307-5d8a-b948-56f69a404e0f'::uuid, 'retail'),
  ('a5d4f96c-ca21-57d9-9b38-b818a23540dd'::uuid, 'public-space'),
  ('a5d4f96c-ca21-57d9-9b38-b818a23540dd'::uuid, 'mixed-use');

DO $$
DECLARE
  external_relations integer;
BEGIN
  IF (SELECT count(*) FROM public.architects target JOIN architect_rollback seed USING (id, slug)) <> 2
    OR (SELECT count(*) FROM public.buildings target JOIN building_rollback seed USING (id, slug)) <> 3
    OR (SELECT count(*) FROM public.images target JOIN image_rollback seed USING (id, building_id, source_url)) <> 3
    OR (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_rollback seed USING (case_id, building_id)) <> 3
    OR (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_rollback seed USING (building_id, function_slug)) <> 7 THEN
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
    RAISE EXCEPTION 'Rollback refused: found % external relations added after graduation-final-review-batch-014', external_relations;
  END IF;
END $$;

DELETE FROM public.building_function_assignments target USING assignment_rollback seed WHERE target.building_id = seed.building_id AND target.function_slug = seed.function_slug;
DELETE FROM public.graduation_case_profiles target USING profile_rollback seed WHERE target.case_id = seed.case_id AND target.building_id = seed.building_id;
DELETE FROM public.images target USING image_rollback seed WHERE target.id = seed.id AND target.building_id = seed.building_id AND target.source_url = seed.source_url;
DELETE FROM public.buildings target USING building_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;
DELETE FROM public.architects target USING architect_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;

COMMIT;
