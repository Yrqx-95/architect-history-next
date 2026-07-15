-- Guarded rollback for content-trust Parc.1 + NMWA package.
-- Refuses to overwrite post-apply content or image drift.

BEGIN;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.buildings
      WHERE id = '39a3d5b5-0308-47e3-b2fe-aebb164353bf'::uuid
        AND slug = 'parc1'
        AND name_zh = 'Parc.1' AND name_ja = 'Parc.1'
        AND city = 'Seoul' AND country = 'South Korea' AND type_slug = 'mixed-use'
        AND official_url = 'https://rshp.com/projects/mixed-use/parc-1/'
        AND description = jsonb_build_object(
          'zh', 'Parc.1 是位于韩国首尔汝矣岛的综合开发项目，包含两座办公塔楼、酒店与 The Hyundai Seoul 零售中心。RSHP 将项目描述为沿汉江发展的城市综合体。',
          'en', 'Parc.1 is a mixed-use scheme on Yeouido island in Seoul, South Korea. RSHP describes it as a development combining two office towers, a hotel, and The Hyundai Seoul retail centre.',
          'ja', 'Parc.1は、韓国・ソウルの汝矣島にある複合用途の計画です。RSHPは、二つのオフィスタワー、ホテル、The Hyundai Seoulの商業施設からなる開発として説明しています。'
        )
        AND significance = jsonb_build_object(
          'zh', '项目以沿江与城市公共空间的组织回应视线、城市肌理和步行流线；RSHP 还记录了广场、林荫大道和地下交通连接等公共领域策略。',
          'en', 'Its significance lies in treating a large mixed-use development as an urban sequence: RSHP highlights views, the existing city grain, pedestrian movement, public plazas, tree-lined boulevards, and direct access to the underground system.',
          'ja', 'この計画の意義は、大規模な複合用途開発を都市の連続した空間として組み立てた点にあります。RSHPは、眺望、既存の都市組織、歩行者動線、広場、並木道、地下交通への接続を重視したと説明しています。'
        )) <> 1 THEN
    RAISE EXCEPTION 'Parc.1 rollback refused: post-apply building content drifted';
  END IF;

  IF (SELECT count(*) FROM public.images
      WHERE building_id = '39a3d5b5-0308-47e3-b2fe-aebb164353bf'::uuid) <> 30
     OR (SELECT count(*) FROM public.images
         WHERE building_id = '39a3d5b5-0308-47e3-b2fe-aebb164353bf'::uuid AND is_primary) <> 0 THEN
    RAISE EXCEPTION 'Parc.1 rollback refused: image row count or suppressed-primary state drifted';
  END IF;

  IF (SELECT count(*) FROM public.buildings
      WHERE id = '17b396f4-6a4c-4e33-963d-dcc697879221'::uuid
        AND slug = 'national-museum-of-western-art'
        AND name_zh = '国立西洋美术馆' AND name_ja = '国立西洋美術館'
        AND architect_id = 'fbdda76b-fde9-4203-8b68-475d7e40e09a'::uuid
        AND architect_slug = 'le-corbusier' AND city = 'Tokyo' AND country = 'Japan'
        AND era_slug = 'modern'
        AND official_url = 'https://www.nmwa.go.jp/en/about/building.html'
        AND description = jsonb_build_object(
          'zh', '国立西洋美术馆本馆位于东京上野，由勒·柯布西耶设计，1959年3月竣工。馆方同时列出坂仓准三、前川国男与吉阪隆正为现场监督。',
          'en', 'The Main Building of the National Museum of Western Art is in Ueno, Tokyo. The museum identifies Le Corbusier as its designer; it was completed in March 1959, with Junzo Sakakura, Kunio Maekawa, and Takamasa Yoshizaka listed as supervisors.',
          'ja', '国立西洋美術館本館は東京・上野にあり、館によればル・コルビュジエが設計し、1959年3月に完成しました。坂倉準三、前川國男、吉阪隆正は監督者として挙げられています。'
        )
        AND significance = jsonb_build_object(
          'zh', '它是勒·柯布西耶现代建筑作品的一部分，将东京的博物馆功能与本馆的空间秩序、模度体系和战后日法关系的象征意义联系起来。',
          'en', 'The building is significant as Le Corbusier''s work in Tokyo and as part of the Architectural Work of Le Corbusier inscribed on the World Heritage List; the museum''s account also connects its 1959 completion with the resumption of diplomatic ties between Japan and France after World War II.',
          'ja', 'この建築は、東京におけるル・コルビュジエの作品であり、世界遺産「ル・コルビュジエの建築作品」の一部でもあります。館の説明は、1959年の完成を戦後の日仏国交回復の象徴としても位置付けています。'
        )) <> 1 THEN
    RAISE EXCEPTION 'NMWA rollback refused: post-apply building content drifted';
  END IF;

  IF (SELECT count(*) FROM public.images
      WHERE building_id = '17b396f4-6a4c-4e33-963d-dcc697879221'::uuid) <> 6
     OR (SELECT count(*) FROM public.images
         WHERE building_id = '17b396f4-6a4c-4e33-963d-dcc697879221'::uuid AND is_primary) <> 2 THEN
    RAISE EXCEPTION 'NMWA rollback refused: image rows changed unexpectedly';
  END IF;
END $$;

UPDATE public.buildings
SET
  name_zh = '',
  name_ja = '',
  city = NULL,
  country = NULL,
  type_slug = NULL,
  description = NULL,
  significance = NULL,
  official_url = NULL,
  updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz
WHERE id = '39a3d5b5-0308-47e3-b2fe-aebb164353bf'::uuid
  AND slug = 'parc1';

UPDATE public.buildings
SET
  name_zh = '',
  name_ja = '',
  architect_id = NULL,
  architect_slug = 'kunio-maekawa',
  city = NULL,
  country = NULL,
  era_slug = NULL,
  description = NULL,
  significance = NULL,
  official_url = NULL,
  updated_at = '2026-05-24T00:02:34.681443+00:00'::timestamptz
WHERE id = '17b396f4-6a4c-4e33-963d-dcc697879221'::uuid
  AND slug = 'national-museum-of-western-art';

UPDATE public.images
SET is_primary = true
WHERE building_id = '39a3d5b5-0308-47e3-b2fe-aebb164353bf'::uuid
  AND id IN (
    'e93d4cdd-cc96-5de1-94a9-f1f545ece711'::uuid,
    '648c05b4-77a9-58ec-b7b7-5e6969b4852c'::uuid,
    '06dfee2c-4c2f-5dd3-8d25-8e3c0c27f6c3'::uuid
  );

DO $$
BEGIN
  IF (SELECT count(*) FROM public.buildings
      WHERE id = '39a3d5b5-0308-47e3-b2fe-aebb164353bf'::uuid
        AND name_zh = '' AND name_ja = '' AND city IS NULL AND country IS NULL
        AND type_slug IS NULL AND description IS NULL AND significance IS NULL
        AND official_url IS NULL
        AND updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz) <> 1 THEN
    RAISE EXCEPTION 'Parc.1 rollback postcondition failed';
  END IF;

  IF (SELECT count(*) FROM public.images
      WHERE building_id = '39a3d5b5-0308-47e3-b2fe-aebb164353bf'::uuid AND is_primary) <> 3 THEN
    RAISE EXCEPTION 'Parc.1 primary restoration postcondition failed';
  END IF;

  IF (SELECT count(*) FROM public.buildings
      WHERE id = '17b396f4-6a4c-4e33-963d-dcc697879221'::uuid
        AND name_zh = '' AND name_ja = '' AND architect_id IS NULL AND architect_slug = 'kunio-maekawa'
        AND city IS NULL AND country IS NULL AND era_slug IS NULL
        AND description IS NULL AND significance IS NULL AND official_url IS NULL
        AND updated_at = '2026-05-24T00:02:34.681443+00:00'::timestamptz) <> 1 THEN
    RAISE EXCEPTION 'NMWA rollback postcondition failed';
  END IF;

  IF (SELECT count(*) FROM public.images
      WHERE building_id = '17b396f4-6a4c-4e33-963d-dcc697879221'::uuid AND is_primary) <> 2 THEN
    RAISE EXCEPTION 'NMWA image state changed during rollback';
  END IF;
END $$;

COMMIT;
