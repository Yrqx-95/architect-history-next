-- Content trust repair for Museum Reinhard Ernst.
-- Reviewed decision: db/review-decisions/content-trust-reinhard-ernst-museum-001.json
-- Refuses to run if the building row or exact two-primary-image state changed.

BEGIN;

DO $$
DECLARE
  building_count integer;
  primary_count integer;
BEGIN
  PERFORM 1 FROM public.buildings
  WHERE id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
  FOR UPDATE;

  PERFORM 1 FROM public.images
  WHERE building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
  FOR UPDATE;

  SELECT count(*) INTO building_count
  FROM public.buildings
  WHERE id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
    AND slug = 'reinhard-ernst-museum'
    AND name_en = 'Reinhard Ernst Museum'
    AND name_zh = ''
    AND name_ja = ''
    AND architect_slug = 'fumihiko-maki'
    AND year_start = 2024
    AND country_code = 'DE'
    AND type_slug = 'cultural'
    AND era_slug = 'contemporary'
    AND city IS NULL
    AND country IS NULL
    AND description IS NULL
    AND significance IS NULL
    AND official_url IS NULL
    AND updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz;

  IF building_count <> 1 THEN
    RAISE EXCEPTION 'Museum Reinhard Ernst building identity or prior metadata changed';
  END IF;

  SELECT count(*) INTO primary_count
  FROM public.images
  WHERE building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
    AND is_primary = true
    AND id IN (
      '0e6b2f3b-9eab-5983-9b9c-772ba382bc96'::uuid,
      '47fa4a36-934a-53f4-9e85-957a4c6c6f0d'::uuid
    );

  IF primary_count <> 2 OR (
    SELECT count(*) FROM public.images
    WHERE building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
      AND is_primary = true
  ) <> 2 THEN
    RAISE EXCEPTION 'Museum Reinhard Ernst prior primary image state changed';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.images
    WHERE id = '47fa4a36-934a-53f4-9e85-957a4c6c6f0d'::uuid
      AND building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
      AND source_url = 'https://commons.wikimedia.org/wiki/File:Ernst_Museum,_Wiesbaden,_atrium.jpg'
      AND photographer = 'Gerda Arendt'
      AND source = 'Wikimedia Commons'
      AND license = 'CC0'
      AND img_type = 'exterior'
      AND is_primary = true
  ) THEN
    RAISE EXCEPTION 'Museum Reinhard Ernst reviewed CC0 image changed';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.images
    WHERE id = '0e6b2f3b-9eab-5983-9b9c-772ba382bc96'::uuid
      AND building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
      AND source = 'Unsplash'
      AND source_url = 'https://unsplash.com/photos/KR03PvYv3Fs'
      AND is_primary = true
  ) THEN
    RAISE EXCEPTION 'Museum Reinhard Ernst ambiguous Unsplash primary changed';
  END IF;
END $$;

UPDATE public.buildings
SET
  name_zh = '莱因哈德·恩斯特博物馆',
  name_ja = 'ラインハルト・エルンスト美術館',
  city = '威斯巴登',
  country = '德国',
  description = '{
    "zh": "莱因哈德·恩斯特博物馆位于德国威斯巴登，由槙文彦设计，2024年建成。建筑以围绕中央庭院组织的简洁体量回应历史街区的檐口和街道界面；首层连接教育、餐饮、商店与活动空间，并作为无需门票即可进入的公共区域向城市开放。",
    "en": "Museum Reinhard Ernst in Wiesbaden, Germany, was designed by Fumihiko Maki and completed in 2024. Its simple volumes gather around a central courtyard and respond to the eaves and street lines of the historic surroundings. The ground floor combines education, dining, retail and event spaces in a public zone that can be entered without an admission ticket.",
    "ja": "ドイツ・ウィースバーデンのラインハルト・エルンスト美術館は槇文彦の設計で、2024年に完成した。中央の中庭を囲む簡潔なボリュームが歴史的な街並みの軒高と壁面線に呼応し、1階には教育、飲食、ショップ、イベントの機能をまとめ、入館料なしで立ち入れる公共空間として街に開いている。"
  }'::jsonb,
  significance = '{
    "zh": "白色花岗岩立面延伸至入口和内院，深绿色花岗岩地面也贯穿室内外，使城市、庭院与展览空间形成连续体验。不同尺度的展厅、最高约14米的层高、穿越庭院的视线以及展览区的无柱结构，共同兼顾大型抽象艺术的展示、清晰导向与亲近感。",
    "en": "The white granite facade continues into the entrance and courtyard, while dark green granite flooring runs across exterior and interior, making city, courtyard and galleries feel continuous. Varied gallery sizes, ceilings up to about 14 metres, views across the courtyard and a column-free museum area support large abstract works while preserving orientation and an approachable visitor experience.",
    "ja": "白い花崗岩の外装はエントランスと中庭まで連続し、濃緑色の花崗岩床も内外を貫くことで、街、中庭、展示空間を一続きの体験としている。大きさの異なる展示室、最大約14メートルの天井高、中庭を横切る視線、展示エリアの無柱構造が、大型の抽象作品への対応と分かりやすい動線、親しみやすさを両立させている。"
  }'::jsonb,
  official_url = 'https://www.museum-re.de/en/museum/architecture/',
  updated_at = now()
WHERE id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
  AND slug = 'reinhard-ernst-museum';

UPDATE public.images
SET is_primary = false
WHERE id = '0e6b2f3b-9eab-5983-9b9c-772ba382bc96'::uuid
  AND building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
  AND is_primary = true;

UPDATE public.images
SET img_type = 'interior'
WHERE id = '47fa4a36-934a-53f4-9e85-957a4c6c6f0d'::uuid
  AND building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
  AND img_type = 'exterior'
  AND is_primary = true;

DO $$
BEGIN
  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
      AND slug = 'reinhard-ernst-museum'
      AND name_zh = '莱因哈德·恩斯特博物馆'
      AND name_ja = 'ラインハルト・エルンスト美術館'
      AND city = '威斯巴登'
      AND country = '德国'
      AND country_code = 'DE'
      AND architect_slug = 'fumihiko-maki'
      AND year_start = 2024
      AND type_slug = 'cultural'
      AND era_slug = 'contemporary'
      AND description ?& ARRAY['zh', 'en', 'ja']
      AND significance ?& ARRAY['zh', 'en', 'ja']
      AND official_url = 'https://www.museum-re.de/en/museum/architecture/'
  ) <> 1 THEN
    RAISE EXCEPTION 'Museum Reinhard Ernst building post-write verification failed';
  END IF;

  IF (
    SELECT count(*) FROM public.images
    WHERE building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
      AND is_primary = true
      AND id = '47fa4a36-934a-53f4-9e85-957a4c6c6f0d'::uuid
      AND source_url = 'https://commons.wikimedia.org/wiki/File:Ernst_Museum,_Wiesbaden,_atrium.jpg'
      AND photographer = 'Gerda Arendt'
      AND license = 'CC0'
      AND img_type = 'interior'
  ) <> 1 OR (
    SELECT count(*) FROM public.images
    WHERE building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
      AND is_primary = true
  ) <> 1 THEN
    RAISE EXCEPTION 'Museum Reinhard Ernst primary image post-write verification failed';
  END IF;
END $$;

COMMIT;
