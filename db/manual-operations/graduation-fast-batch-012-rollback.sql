-- Rollback graduation fast batch 012 only.
-- Refuses to run if reviewed rows drifted or acquired external relations.

BEGIN;

CREATE TEMP TABLE architect_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO architect_rollback VALUES
  ('b684977c-b4f7-5770-9793-205fd676e725'::uuid, 'atelier-bow-wow-tsukamoto-lab'),
  ('764ac6cc-04c1-5249-be15-dbecb2a2c03f'::uuid, 'kono-designs'),
  ('8c177e90-4b08-53cb-90d1-24866e9a5aa9'::uuid, 'hof-van-cartesius-cooperative');
CREATE TEMP TABLE building_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO building_rollback VALUES
  ('fe73d607-773c-56b2-a2df-e10df13183a9'::uuid, 'miyashita-park-2011'),
  ('9f56bc37-7db9-5942-97df-db5e540e8f6c'::uuid, 'pasona-urban-farm'),
  ('b99e82b8-dfbe-5ada-8778-aa368b227f62'::uuid, 'het-hof-van-cartesius');
CREATE TEMP TABLE image_rollback (id uuid PRIMARY KEY, building_id uuid NOT NULL UNIQUE, source_url text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO image_rollback VALUES
  ('63c546bd-e863-5d63-9315-f97cbb5be93c'::uuid, 'fe73d607-773c-56b2-a2df-e10df13183a9'::uuid, 'https://commons.wikimedia.org/wiki/File:Miyashita_Park.jpg'),
  ('4050256b-e24a-50c2-82f2-5a8bf850f201'::uuid, '9f56bc37-7db9-5942-97df-db5e540e8f6c'::uuid, 'https://commons.wikimedia.org/wiki/File:Pasona_building.JPG'),
  ('52122937-b27f-55ba-a05d-5bc430ff6153'::uuid, 'b99e82b8-dfbe-5ada-8778-aa368b227f62'::uuid, 'https://www.flickr.com/photos/141420435@N08/52620631677');
CREATE TEMP TABLE profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL) ON COMMIT DROP;
INSERT INTO profile_rollback VALUES
  ('CASE-068', 'fe73d607-773c-56b2-a2df-e10df13183a9'::uuid),
  ('CASE-077', '9f56bc37-7db9-5942-97df-db5e540e8f6c'::uuid),
  ('CASE-089', 'b99e82b8-dfbe-5ada-8778-aa368b227f62'::uuid);
CREATE TEMP TABLE assignment_rollback (building_id uuid NOT NULL, function_slug text NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
INSERT INTO assignment_rollback VALUES
  ('fe73d607-773c-56b2-a2df-e10df13183a9'::uuid, 'public-space'),
  ('9f56bc37-7db9-5942-97df-db5e540e8f6c'::uuid, 'mixed-use'),
  ('b99e82b8-dfbe-5ada-8778-aa368b227f62'::uuid, 'mixed-use'),
  ('b99e82b8-dfbe-5ada-8778-aa368b227f62'::uuid, 'public-space');

DO $$
DECLARE
  external_relations integer;
BEGIN
  IF (SELECT count(*) FROM public.architects target JOIN architect_rollback seed USING (id, slug)) <> 3
    OR (SELECT count(*) FROM public.buildings target JOIN building_rollback seed USING (id, slug)) <> 3
    OR (SELECT count(*) FROM public.images target JOIN image_rollback seed USING (id, building_id, source_url)) <> 3
    OR (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_rollback seed USING (case_id, building_id)) <> 3
    OR (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_rollback seed USING (building_id, function_slug)) <> 4 THEN
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
    RAISE EXCEPTION 'Rollback refused: found % external relations added after graduation-fast-batch-012', external_relations;
  END IF;
END $$;

DELETE FROM public.building_function_assignments target USING assignment_rollback seed WHERE target.building_id = seed.building_id AND target.function_slug = seed.function_slug;
DELETE FROM public.graduation_case_profiles target USING profile_rollback seed WHERE target.case_id = seed.case_id AND target.building_id = seed.building_id;
DELETE FROM public.images target USING image_rollback seed WHERE target.id = seed.id AND target.building_id = seed.building_id AND target.source_url = seed.source_url;
DELETE FROM public.buildings target USING building_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;
DELETE FROM public.architects target USING architect_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;

COMMIT;
