-- Rollback graduation public space batch 001 only.
-- Refuses to run if reviewed rows drifted or acquired external relations.

BEGIN;

CREATE TEMP TABLE architect_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO architect_rollback VALUES
  ('7b4d4634-ff08-5fed-a9ea-45c289384608'::uuid, 'taisei-design-nikken-sekkei'),
  ('6258c77f-1ef7-57e3-8917-22561599ae74'::uuid, 'field-operations-dsr-piet-oudolf'),
  ('c77e7b8f-52ab-531a-ab3f-ea79257ccf06'::uuid, 'big-topotek1-superflex');
CREATE TEMP TABLE building_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO building_rollback VALUES
  ('ecb4c07e-f79f-5cf2-9caf-634daf04e4fd'::uuid, 'hisaya-odori-park'),
  ('8c31e437-334d-5827-ad79-f7e033f7007e'::uuid, 'tainan-spring'),
  ('391ace91-3a5b-50be-9901-f93c94908241'::uuid, 'the-high-line'),
  ('0a9fb5da-a1ee-59a4-812a-1167e5dca6cd'::uuid, 'superkilen');
CREATE TEMP TABLE image_rollback (id uuid PRIMARY KEY, building_id uuid NOT NULL UNIQUE, source_url text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO image_rollback VALUES
  ('11f78fb4-75af-5ead-b872-d89bea246e17'::uuid, 'ecb4c07e-f79f-5cf2-9caf-634daf04e4fd'::uuid, 'https://commons.wikimedia.org/wiki/File:Media_Hiroba_of_Hisaya-odori_Park_and_Nagoya_TV_Tower_-_2.jpg'),
  ('8cc50323-2214-5e4e-b023-914703553849'::uuid, '8c31e437-334d-5827-ad79-f7e033f7007e'::uuid, 'https://commons.wikimedia.org/wiki/File:%E8%87%BA%E5%8D%97%E6%B2%B3%E6%A8%82%E5%BB%A3%E5%A0%B4.jpg'),
  ('505bb7d4-90a9-5805-9f28-7844cd7d1606'::uuid, '391ace91-3a5b-50be-9901-f93c94908241'::uuid, 'https://commons.wikimedia.org/wiki/File:High_Line_20th_Street_looking_downtown.jpg'),
  ('9381f97a-cb7f-527a-a9f3-74aa26945a6a'::uuid, '0a9fb5da-a1ee-59a4-812a-1167e5dca6cd'::uuid, 'https://commons.wikimedia.org/wiki/File:Superkilen_hill-top_view.jpg');
CREATE TEMP TABLE profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL) ON COMMIT DROP;
INSERT INTO profile_rollback VALUES
  ('CASE-050', 'ecb4c07e-f79f-5cf2-9caf-634daf04e4fd'::uuid),
  ('CASE-056', '8c31e437-334d-5827-ad79-f7e033f7007e'::uuid),
  ('CASE-110', '391ace91-3a5b-50be-9901-f93c94908241'::uuid),
  ('CASE-111', '0a9fb5da-a1ee-59a4-812a-1167e5dca6cd'::uuid);
CREATE TEMP TABLE assignment_rollback (building_id uuid NOT NULL, function_slug text NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
INSERT INTO assignment_rollback VALUES
  ('ecb4c07e-f79f-5cf2-9caf-634daf04e4fd'::uuid, 'public-space'),
  ('ecb4c07e-f79f-5cf2-9caf-634daf04e4fd'::uuid, 'mixed-use'),
  ('8c31e437-334d-5827-ad79-f7e033f7007e'::uuid, 'public-space'),
  ('391ace91-3a5b-50be-9901-f93c94908241'::uuid, 'public-space'),
  ('0a9fb5da-a1ee-59a4-812a-1167e5dca6cd'::uuid, 'public-space');

DO $$
DECLARE
  external_relations integer;
BEGIN
  IF (SELECT count(*) FROM public.architects target JOIN architect_rollback seed USING (id, slug)) <> 3
    OR (SELECT count(*) FROM public.buildings target JOIN building_rollback seed USING (id, slug)) <> 4
    OR (SELECT count(*) FROM public.images target JOIN image_rollback seed USING (id, building_id, source_url)) <> 4
    OR (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_rollback seed USING (case_id, building_id)) <> 4
    OR (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_rollback seed USING (building_id, function_slug)) <> 5 THEN
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
    RAISE EXCEPTION 'Rollback refused: found % external relations added after graduation-public-space-batch-001', external_relations;
  END IF;
END $$;

DELETE FROM public.building_function_assignments target USING assignment_rollback seed WHERE target.building_id = seed.building_id AND target.function_slug = seed.function_slug;
DELETE FROM public.graduation_case_profiles target USING profile_rollback seed WHERE target.case_id = seed.case_id AND target.building_id = seed.building_id;
DELETE FROM public.images target USING image_rollback seed WHERE target.id = seed.id AND target.building_id = seed.building_id AND target.source_url = seed.source_url;
DELETE FROM public.buildings target USING building_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;
DELETE FROM public.architects target USING architect_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;

COMMIT;
