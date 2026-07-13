-- Rollback graduation 3331 arts chiyoda batch 011 only.
-- Refuses to run if reviewed rows drifted or acquired external relations.

BEGIN;

CREATE TEMP TABLE architect_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO architect_rollback VALUES
  ('0a252441-1979-5f14-a374-2f47ec8bfdec'::uuid, 'shinya-sato-mejiro-studio');
CREATE TEMP TABLE building_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO building_rollback VALUES
  ('d5f896a2-53a8-5388-8d91-c31621248418'::uuid, '3331-arts-chiyoda');
CREATE TEMP TABLE image_rollback (id uuid PRIMARY KEY, building_id uuid NOT NULL UNIQUE, source_url text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO image_rollback VALUES
  ('0756b422-e9ef-5eca-bc3a-761e3ff48f61'::uuid, 'd5f896a2-53a8-5388-8d91-c31621248418'::uuid, 'https://commons.wikimedia.org/wiki/File:3331_Arts_Chiyoda.JPG');
CREATE TEMP TABLE profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL) ON COMMIT DROP;
INSERT INTO profile_rollback VALUES
  ('CASE-005', 'd5f896a2-53a8-5388-8d91-c31621248418'::uuid);
CREATE TEMP TABLE assignment_rollback (building_id uuid NOT NULL, function_slug text NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
INSERT INTO assignment_rollback VALUES
  ('d5f896a2-53a8-5388-8d91-c31621248418'::uuid, 'art-center');

DO $$
DECLARE
  external_relations integer;
BEGIN
  IF (SELECT count(*) FROM public.architects target JOIN architect_rollback seed USING (id, slug)) <> 1
    OR (SELECT count(*) FROM public.buildings target JOIN building_rollback seed USING (id, slug)) <> 1
    OR (SELECT count(*) FROM public.images target JOIN image_rollback seed USING (id, building_id, source_url)) <> 1
    OR (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_rollback seed USING (case_id, building_id)) <> 1
    OR (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_rollback seed USING (building_id, function_slug)) <> 1 THEN
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
    RAISE EXCEPTION 'Rollback refused: found % external relations added after graduation-3331-arts-chiyoda-batch-011', external_relations;
  END IF;
END $$;

DELETE FROM public.building_function_assignments target USING assignment_rollback seed WHERE target.building_id = seed.building_id AND target.function_slug = seed.function_slug;
DELETE FROM public.graduation_case_profiles target USING profile_rollback seed WHERE target.case_id = seed.case_id AND target.building_id = seed.building_id;
DELETE FROM public.images target USING image_rollback seed WHERE target.id = seed.id AND target.building_id = seed.building_id AND target.source_url = seed.source_url;
DELETE FROM public.buildings target USING building_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;
DELETE FROM public.architects target USING architect_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;

COMMIT;
