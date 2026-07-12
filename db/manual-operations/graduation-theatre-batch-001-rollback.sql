-- Rollback graduation theatre batch 001 only.
-- Refuses to run if reviewed rows drifted or acquired external relations.

BEGIN;

CREATE TEMP TABLE architect_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO architect_rollback VALUES
  ('f6b78370-cbc3-5d34-9b0e-c6e1db2c6fef'::uuid, 'diller-scofidio-renfro-rockwell-group');
CREATE TEMP TABLE building_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO building_rollback VALUES
  ('59496d18-29b4-53e1-8158-dc29f8deba4e'::uuid, 'shogin-tact-tsuruoka'),
  ('c30fbe23-c030-563c-b67b-d083812ddbcc'::uuid, 'oslo-opera-house'),
  ('b2675a07-3187-515e-bcd3-97ab8e32db96'::uuid, 'harpa-concert-hall'),
  ('2f4194a7-3bba-55b2-af26-5952f483075d'::uuid, 'the-shed-hudson-yards');
CREATE TEMP TABLE image_rollback (id uuid PRIMARY KEY, building_id uuid NOT NULL UNIQUE, source_url text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO image_rollback VALUES
  ('c1b7eb6c-48ee-5bd8-a00a-29f133eec1a6'::uuid, '59496d18-29b4-53e1-8158-dc29f8deba4e'::uuid, 'https://commons.wikimedia.org/wiki/File:Tact-Tsuruoka_1.jpg'),
  ('8be0901e-f542-55c4-8e5e-b932ab086e84'::uuid, 'c30fbe23-c030-563c-b67b-d083812ddbcc'::uuid, 'https://commons.wikimedia.org/wiki/File:Oslo_Opera_House_(Den_Norske_Opera_%26_Ballett),_Norway.jpg'),
  ('d9082466-3764-57ce-8443-5da2a41d61ab'::uuid, 'b2675a07-3187-515e-bcd3-97ab8e32db96'::uuid, 'https://commons.wikimedia.org/wiki/File:Harpa_From_Arnarh%C3%B3ll_(33650129491).jpg'),
  ('0650b2be-99c9-58f2-88c4-09c1d2d04e52'::uuid, '2f4194a7-3bba-55b2-af26-5952f483075d'::uuid, 'https://commons.wikimedia.org/wiki/File:The_Shed_-_Complete_(48206488176).jpg');
CREATE TEMP TABLE profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO profile_rollback VALUES
  ('CASE-057', '59496d18-29b4-53e1-8158-dc29f8deba4e'::uuid),
  ('CASE-117', 'c30fbe23-c030-563c-b67b-d083812ddbcc'::uuid),
  ('CASE-122', 'b2675a07-3187-515e-bcd3-97ab8e32db96'::uuid),
  ('CASE-139', '2f4194a7-3bba-55b2-af26-5952f483075d'::uuid);
CREATE TEMP TABLE assignment_rollback (building_id uuid NOT NULL, function_slug text NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
INSERT INTO assignment_rollback VALUES
  ('59496d18-29b4-53e1-8158-dc29f8deba4e'::uuid, 'theatre'),
  ('c30fbe23-c030-563c-b67b-d083812ddbcc'::uuid, 'theatre'),
  ('b2675a07-3187-515e-bcd3-97ab8e32db96'::uuid, 'theatre'),
  ('b2675a07-3187-515e-bcd3-97ab8e32db96'::uuid, 'mixed-use'),
  ('2f4194a7-3bba-55b2-af26-5952f483075d'::uuid, 'theatre'),
  ('2f4194a7-3bba-55b2-af26-5952f483075d'::uuid, 'mixed-use');

DO $$
DECLARE
  external_relations integer;
BEGIN
  IF (SELECT count(*) FROM public.architects target JOIN architect_rollback seed USING (id, slug)) <> 1
    OR (SELECT count(*) FROM public.buildings target JOIN building_rollback seed USING (id, slug)) <> 4
    OR (SELECT count(*) FROM public.images target JOIN image_rollback seed USING (id, building_id, source_url)) <> 4
    OR (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_rollback seed USING (case_id, building_id)) <> 4
    OR (SELECT count(*) FROM public.building_function_assignments target JOIN assignment_rollback seed USING (building_id, function_slug)) <> 6 THEN
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
    RAISE EXCEPTION 'Rollback refused: found % external relations added after graduation-theatre-batch-001', external_relations;
  END IF;
END $$;

DELETE FROM public.building_function_assignments target USING assignment_rollback seed WHERE target.building_id = seed.building_id AND target.function_slug = seed.function_slug;
DELETE FROM public.graduation_case_profiles target USING profile_rollback seed WHERE target.case_id = seed.case_id AND target.building_id = seed.building_id;
DELETE FROM public.images target USING image_rollback seed WHERE target.id = seed.id AND target.building_id = seed.building_id AND target.source_url = seed.source_url;
DELETE FROM public.buildings target USING building_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;
DELETE FROM public.architects target USING architect_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;

COMMIT;
