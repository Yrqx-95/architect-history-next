-- Rollback graduation transport batch 001 only.
-- Refuses to run if reviewed rows drifted or acquired external relations.

BEGIN;

CREATE TEMP TABLE architect_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO architect_rollback VALUES
  ('5d3c8548-eab2-5718-8f99-12743b0b9721'::uuid, 'foreign-office-architects');
CREATE TEMP TABLE building_rollback (id uuid PRIMARY KEY, slug text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO building_rollback VALUES
  ('9083a770-b66b-54b7-a553-89da21628820'::uuid, 'onagawa-station-yupoppo'),
  ('08ce470e-40f7-592d-806d-37b852eaafe1'::uuid, 'takanawa-gateway-station'),
  ('eda9faa2-e337-579d-a511-766ccee61d1c'::uuid, 'yokohama-international-passenger-terminal');
CREATE TEMP TABLE image_rollback (id uuid PRIMARY KEY, building_id uuid NOT NULL UNIQUE, source_url text NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO image_rollback VALUES
  ('136fa1ba-e4e3-52cc-a922-3b78f341aa5c'::uuid, '9083a770-b66b-54b7-a553-89da21628820'::uuid, 'https://commons.wikimedia.org/wiki/File:JR_East_Onagawa_Station_building%2C_Miyagi_Pref_20240420.jpg'),
  ('99e66f2c-d094-583f-a8ed-d93cd04a53e1'::uuid, '08ce470e-40f7-592d-806d-37b852eaafe1'::uuid, 'https://commons.wikimedia.org/wiki/File:Takanawa_Gateway_Station_200316a1.jpg'),
  ('4c917d6d-f3be-562d-8a15-3e7a53440666'::uuid, 'eda9faa2-e337-579d-a511-766ccee61d1c'::uuid, 'https://commons.wikimedia.org/wiki/File:Yokohama_International_Passenger_Terminal_11.jpg');
CREATE TEMP TABLE profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL) ON COMMIT DROP;
INSERT INTO profile_rollback VALUES
  ('CASE-008', '9083a770-b66b-54b7-a553-89da21628820'::uuid),
  ('CASE-094', '08ce470e-40f7-592d-806d-37b852eaafe1'::uuid),
  ('CASE-133', 'eda9faa2-e337-579d-a511-766ccee61d1c'::uuid);
CREATE TEMP TABLE assignment_rollback (building_id uuid NOT NULL, function_slug text NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
INSERT INTO assignment_rollback VALUES
  ('9083a770-b66b-54b7-a553-89da21628820'::uuid, 'transport-hub'),
  ('9083a770-b66b-54b7-a553-89da21628820'::uuid, 'mixed-use'),
  ('08ce470e-40f7-592d-806d-37b852eaafe1'::uuid, 'transport-hub'),
  ('eda9faa2-e337-579d-a511-766ccee61d1c'::uuid, 'transport-hub'),
  ('eda9faa2-e337-579d-a511-766ccee61d1c'::uuid, 'mixed-use');

DO $$
DECLARE
  external_relations integer;
BEGIN
  IF (SELECT count(*) FROM public.architects target JOIN architect_rollback seed USING (id, slug)) <> 1
    OR (SELECT count(*) FROM public.buildings target JOIN building_rollback seed USING (id, slug)) <> 3
    OR (SELECT count(*) FROM public.images target JOIN image_rollback seed USING (id, building_id, source_url)) <> 3
    OR (SELECT count(*) FROM public.graduation_case_profiles target JOIN profile_rollback seed USING (case_id, building_id)) <> 3
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
    RAISE EXCEPTION 'Rollback refused: found % external relations added after graduation-transport-batch-001', external_relations;
  END IF;
END $$;

DELETE FROM public.building_function_assignments target USING assignment_rollback seed WHERE target.building_id = seed.building_id AND target.function_slug = seed.function_slug;
DELETE FROM public.graduation_case_profiles target USING profile_rollback seed WHERE target.case_id = seed.case_id AND target.building_id = seed.building_id;
DELETE FROM public.images target USING image_rollback seed WHERE target.id = seed.id AND target.building_id = seed.building_id AND target.source_url = seed.source_url;
DELETE FROM public.buildings target USING building_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;
DELETE FROM public.architects target USING architect_rollback seed WHERE target.id = seed.id AND target.slug = seed.slug;

COMMIT;
