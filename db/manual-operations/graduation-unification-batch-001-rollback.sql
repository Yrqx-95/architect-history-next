-- Rollback graduation unification batch 001 seed data only.
-- Does not drop the foundation schema or touch canonical buildings/images.

BEGIN;

CREATE TEMP TABLE graduation_profile_rollback (case_id text PRIMARY KEY, building_id uuid NOT NULL UNIQUE) ON COMMIT DROP;
INSERT INTO graduation_profile_rollback VALUES
  ('CASE-007', '582e9988-dfa5-4b9e-8498-b7a82b827c28'::uuid),
  ('CASE-046', 'fe4d501b-0cdb-4e50-94b8-d4e87af41cc0'::uuid),
  ('CASE-099', '7ae9d279-1d5c-4c28-801e-2ae38f6552b7'::uuid),
  ('CASE-103', 'c18e2e30-a728-49f5-ad19-503ead0ce1e0'::uuid),
  ('CASE-106', 'a1ca0778-8b46-4400-9b96-56996578c705'::uuid),
  ('CASE-119', '8cc3634e-9443-4c07-951c-f3c76ff20ecf'::uuid),
  ('CASE-123', 'f110abb5-d8ff-456c-a268-99a9fa403554'::uuid),
  ('CASE-125', 'd80be7f7-a8ab-46c3-97ee-a5c7fce26b21'::uuid),
  ('CASE-138', '7e7252fd-c528-435a-93e7-db2c7db85d82'::uuid),
  ('CASE-128', 'b1b8cb5d-1ad2-44e0-a791-e5d56fb20edd'::uuid),
  ('CASE-061', '49a21106-36cc-46ad-a50b-eae2ee7e5668'::uuid),
  ('CASE-104', '444deee7-5b62-43aa-8b2c-dbc46648e083'::uuid),
  ('CASE-108', '7ac209df-dd1c-4600-ac2b-b6f013a9bbff'::uuid),
  ('CASE-120', '1af2ea73-49d7-4e47-9146-cae45adaddeb'::uuid),
  ('CASE-127', 'e212bd81-0c29-417a-ab24-db4a93661b19'::uuid),
  ('CASE-129', '6c32f1bb-fdd4-40b4-8380-256f039b231a'::uuid),
  ('CASE-131', 'b06ab0b3-b06d-4965-b14d-dff4b53a6110'::uuid),
  ('CASE-135', '750ce23f-0a58-47eb-a898-762fe3c0cd0e'::uuid),
  ('CASE-102', 'e8a453f5-8c49-456c-a4c8-d72217357571'::uuid),
  ('CASE-107', 'e611522f-a42e-4915-b518-653bad66b8b3'::uuid),
  ('CASE-121', '4d89cb59-b2c1-40fe-89e8-35216f340a08'::uuid);

CREATE TEMP TABLE building_function_assignment_rollback (building_id uuid NOT NULL, function_slug text NOT NULL, PRIMARY KEY (building_id, function_slug)) ON COMMIT DROP;
INSERT INTO building_function_assignment_rollback VALUES
  ('45e768be-5423-4315-b982-c14ff6dcacda'::uuid, 'library'),
  ('d57bbedb-6ed6-49ec-aa9b-2698c4f50cf7'::uuid, 'library'),
  ('faa20fe8-e4be-4dde-a9b9-137c89c6e4cd'::uuid, 'library'),
  ('2f9e5b43-f509-4b50-aa6c-34ab79e0659d'::uuid, 'library'),
  ('b60c6ff1-0ddc-4c17-9aec-cf4cac8cd386'::uuid, 'library'),
  ('0a272df1-7d88-445a-8fa3-b084e937ce51'::uuid, 'library'),
  ('0e48c41e-53ae-41dd-bc7d-f6d508afe942'::uuid, 'library'),
  ('8bd1a441-71ca-4bcf-90df-f6d97eaee9b1'::uuid, 'library'),
  ('c7547211-daeb-477e-912c-6dab71109027'::uuid, 'library'),
  ('c7547211-daeb-477e-912c-6dab71109027'::uuid, 'museum'),
  ('2efb1ed3-23c9-47ab-b088-6932da4f8e23'::uuid, 'library'),
  ('63c9fd31-6ac6-49e0-b5e8-58a2eac5bbec'::uuid, 'library'),
  ('8e52c196-ae39-4bb0-9cca-2fedc1140d70'::uuid, 'library'),
  ('8e52c196-ae39-4bb0-9cca-2fedc1140d70'::uuid, 'museum'),
  ('5a412752-58bc-4fdd-9677-446e7b1375ae'::uuid, 'library'),
  ('5a412752-58bc-4fdd-9677-446e7b1375ae'::uuid, 'museum'),
  ('6253770b-bc9d-44b5-81c2-f7a97430c78f'::uuid, 'library'),
  ('505d64e1-35f7-4419-9f10-36c40af6607b'::uuid, 'library'),
  ('a52fc3e3-78a4-4be7-851b-163997e379b2'::uuid, 'library'),
  ('b3c550f7-67b9-4516-bd47-b6941cd46995'::uuid, 'library'),
  ('557b9c4c-8f0a-49bf-b489-b836aadbbd87'::uuid, 'library'),
  ('444deee7-5b62-43aa-8b2c-dbc46648e083'::uuid, 'library'),
  ('0ed33a5f-0285-419d-87a2-a8a7e313fd8e'::uuid, 'library');

CREATE TEMP TABLE building_function_alias_rollback (function_slug text NOT NULL, locale text NOT NULL, alias text NOT NULL, PRIMARY KEY (locale, alias)) ON COMMIT DROP;
INSERT INTO building_function_alias_rollback VALUES
  ('library', 'zh', '图书馆'),
  ('library', 'zh', '图书室'),
  ('library', 'zh-Hant', '圖書館'),
  ('library', 'zh-Hant', '圖書室'),
  ('library', 'en', 'library'),
  ('library', 'en', 'libraries'),
  ('library', 'en', 'biblioteca'),
  ('library', 'en', 'bibliothèque'),
  ('library', 'en', 'bibliothek'),
  ('library', 'ja', '図書館'),
  ('library', 'ja', '図書室'),
  ('museum', 'zh', '博物馆'),
  ('museum', 'zh', '美术馆'),
  ('museum', 'zh-Hant', '博物館'),
  ('museum', 'zh-Hant', '美術館'),
  ('museum', 'en', 'museum'),
  ('museum', 'en', 'art museum'),
  ('museum', 'en', 'kunsthaus'),
  ('museum', 'en', 'kunsthalle'),
  ('museum', 'ja', '博物館'),
  ('museum', 'ja', '美術館'),
  ('museum', 'ja', 'ミュージアム'),
  ('theatre', 'zh', '剧院'),
  ('theatre', 'zh', '剧场'),
  ('theatre', 'zh', '歌剧院'),
  ('theatre', 'zh-Hant', '劇院'),
  ('theatre', 'zh-Hant', '劇場'),
  ('theatre', 'zh-Hant', '歌劇院'),
  ('theatre', 'en', 'theatre'),
  ('theatre', 'en', 'theater'),
  ('theatre', 'en', 'opera house'),
  ('theatre', 'en', 'playhouse'),
  ('theatre', 'ja', '劇場'),
  ('theatre', 'ja', '歌劇場'),
  ('theatre', 'ja', 'シアター'),
  ('school', 'zh', '学校'),
  ('school', 'zh', '小学'),
  ('school', 'zh', '中学'),
  ('school', 'zh', '幼儿园'),
  ('school', 'zh-Hant', '學校'),
  ('school', 'zh-Hant', '小學'),
  ('school', 'zh-Hant', '中學'),
  ('school', 'zh-Hant', '幼兒園'),
  ('school', 'en', 'school'),
  ('school', 'en', 'primary school'),
  ('school', 'en', 'secondary school'),
  ('school', 'en', 'kindergarten'),
  ('school', 'ja', '学校'),
  ('school', 'ja', '小学校'),
  ('school', 'ja', '中学校'),
  ('school', 'ja', '幼稚園'),
  ('university', 'zh', '大学'),
  ('university', 'zh', '学院'),
  ('university', 'zh-Hant', '大學'),
  ('university', 'zh-Hant', '學院'),
  ('university', 'en', 'university'),
  ('university', 'en', 'college'),
  ('university', 'en', 'faculty building'),
  ('university', 'en', 'campus'),
  ('university', 'ja', '大学'),
  ('university', 'ja', '大学院'),
  ('university', 'ja', '学部棟'),
  ('university', 'ja', 'キャンパス'),
  ('community-center', 'zh', '社区中心'),
  ('community-center', 'zh', '社区活动中心'),
  ('community-center', 'zh', '市民中心'),
  ('community-center', 'zh-Hant', '社區中心'),
  ('community-center', 'zh-Hant', '社區活動中心'),
  ('community-center', 'zh-Hant', '市民中心'),
  ('community-center', 'en', 'community center'),
  ('community-center', 'en', 'community centre'),
  ('community-center', 'en', 'civic center'),
  ('community-center', 'en', 'civic centre'),
  ('community-center', 'ja', 'コミュニティセンター'),
  ('community-center', 'ja', '地域センター'),
  ('community-center', 'ja', '市民センター'),
  ('community-center', 'ja', '公民館'),
  ('elderly-care', 'zh', '养老院'),
  ('elderly-care', 'zh', '养老设施'),
  ('elderly-care', 'zh', '老年照护'),
  ('elderly-care', 'zh', '高龄者设施'),
  ('elderly-care', 'zh-Hant', '養老院'),
  ('elderly-care', 'zh-Hant', '養老設施'),
  ('elderly-care', 'zh-Hant', '老年照護'),
  ('elderly-care', 'zh-Hant', '高齡者設施'),
  ('elderly-care', 'en', 'elderly care'),
  ('elderly-care', 'en', 'senior care'),
  ('elderly-care', 'en', 'nursing home'),
  ('elderly-care', 'en', 'assisted living'),
  ('elderly-care', 'ja', '高齢者施設'),
  ('elderly-care', 'ja', '老人ホーム'),
  ('elderly-care', 'ja', '介護施設'),
  ('elderly-care', 'ja', '高齢者ケア'),
  ('social-housing', 'zh', '社会住宅'),
  ('social-housing', 'zh', '公共住宅'),
  ('social-housing', 'zh', '保障性住房'),
  ('social-housing', 'zh', '廉租房'),
  ('social-housing', 'zh-Hant', '社會住宅'),
  ('social-housing', 'zh-Hant', '公共住宅'),
  ('social-housing', 'zh-Hant', '保障性住房'),
  ('social-housing', 'zh-Hant', '廉租屋'),
  ('social-housing', 'en', 'social housing'),
  ('social-housing', 'en', 'public housing'),
  ('social-housing', 'en', 'affordable housing'),
  ('social-housing', 'en', 'council housing'),
  ('social-housing', 'ja', '社会住宅'),
  ('social-housing', 'ja', '公営住宅'),
  ('social-housing', 'ja', '公共住宅'),
  ('social-housing', 'ja', '低所得者住宅'),
  ('mixed-use', 'zh', '混合用途'),
  ('mixed-use', 'zh', '综合体'),
  ('mixed-use', 'zh', '复合设施'),
  ('mixed-use', 'zh-Hant', '混合用途'),
  ('mixed-use', 'zh-Hant', '綜合體'),
  ('mixed-use', 'zh-Hant', '複合設施'),
  ('mixed-use', 'en', 'mixed use'),
  ('mixed-use', 'en', 'mixed-use'),
  ('mixed-use', 'en', 'multi-use complex'),
  ('mixed-use', 'en', 'multipurpose complex'),
  ('mixed-use', 'ja', '複合用途'),
  ('mixed-use', 'ja', '複合施設'),
  ('mixed-use', 'ja', 'ミクストユース');

CREATE TEMP TABLE building_function_rollback (slug text PRIMARY KEY) ON COMMIT DROP;
INSERT INTO building_function_rollback VALUES
  ('library'),
  ('museum'),
  ('theatre'),
  ('school'),
  ('university'),
  ('community-center'),
  ('elderly-care'),
  ('social-housing'),
  ('mixed-use');

DO $$
DECLARE
  unexpected_function_references integer;
BEGIN
  SELECT count(*) INTO unexpected_function_references
  FROM public.building_function_assignments assignment
  JOIN building_function_rollback function ON function.slug = assignment.function_slug
  LEFT JOIN building_function_assignment_rollback expected
    ON expected.building_id = assignment.building_id AND expected.function_slug = assignment.function_slug
  WHERE expected.building_id IS NULL;

  IF unexpected_function_references <> 0 THEN
    RAISE EXCEPTION 'Refusing function rollback: found % assignments outside batch 001', unexpected_function_references;
  END IF;
END $$;

DELETE FROM public.building_function_assignments target
USING building_function_assignment_rollback seed
WHERE target.building_id = seed.building_id
  AND target.function_slug = seed.function_slug
  AND target.review_status = 'approved';

DELETE FROM public.graduation_case_profiles target
USING graduation_profile_rollback seed
WHERE target.case_id = seed.case_id
  AND target.building_id = seed.building_id;

DELETE FROM public.building_function_aliases target
USING building_function_alias_rollback seed
WHERE target.function_slug = seed.function_slug
  AND target.locale = seed.locale
  AND target.alias = seed.alias;

DELETE FROM public.building_functions target
USING building_function_rollback seed
WHERE target.slug = seed.slug;

COMMIT;
