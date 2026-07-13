-- Content trust repair for 3 World Trade Center.
-- Reviewed decision: db/review-decisions/content-trust-batch-001.json
-- The transaction aborts if building identity, prior metadata, or either primary image changed.

BEGIN;

DO $$
DECLARE
  building_count integer;
  primary_count integer;
  candidate_count integer;
BEGIN
  PERFORM 1
  FROM public.buildings
  WHERE id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
  FOR UPDATE;

  PERFORM 1
  FROM public.images
  WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
  FOR UPDATE;

  SELECT count(*) INTO building_count
  FROM public.buildings
  WHERE id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
    AND slug = '3-world-trade-center'
    AND name_en = '3 World Trade Center'
    AND name_zh = ''
    AND name_ja = ''
    AND architect_slug = 'richard-rogers'
    AND year_start = 2018
    AND country_code = 'US'
    AND era_slug = 'contemporary'
    AND city IS NULL
    AND country IS NULL
    AND type_slug IS NULL
    AND description IS NULL
    AND significance IS NULL
    AND official_url IS NULL
    AND updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz;

  IF building_count <> 1 THEN
    RAISE EXCEPTION '3 WTC building identity or prior metadata changed';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.building_types WHERE slug = 'office') THEN
    RAISE EXCEPTION 'Required office building type is missing';
  END IF;

  SELECT count(*) INTO primary_count
  FROM public.images
  WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
    AND is_primary = true
    AND id IN (
      'da5718d0-7a9b-5077-8680-0b9ee919596c'::uuid,
      'a01e8696-1a6c-56e6-9f86-a57e7bdef7b4'::uuid
    );

  IF primary_count <> 2 OR (
    SELECT count(*) FROM public.images
    WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
      AND is_primary = true
  ) <> 2 THEN
    RAISE EXCEPTION '3 WTC prior primary image state changed';
  END IF;

  SELECT count(*) INTO candidate_count
  FROM public.images
  WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
    AND source_url = 'https://commons.wikimedia.org/wiki/File:Three_World_Trade_Center,_New_York,_NY.jpg';

  IF candidate_count <> 0 THEN
    RAISE EXCEPTION '3 WTC reviewed image candidate already exists';
  END IF;
END $$;

UPDATE public.buildings
SET
  name_zh = '世界贸易中心三号楼',
  name_ja = '3 ワールドトレードセンター',
  city = '纽约',
  country = '美国',
  type_slug = 'office',
  description = '{
    "zh": "世界贸易中心三号楼位于纽约曼哈顿格林尼治街175号，由Rogers Stirk Harbour + Partners设计，并于2018年开放。80层塔楼将办公与交易楼层、五层商业空间及世贸中心交通枢纽的直接连接组织在同一座建筑中。",
    "en": "3 World Trade Center is an 80-storey commercial office tower at 175 Greenwich Street in Lower Manhattan, designed by Rogers Stirk Harbour + Partners and opened in 2018. The building combines office and trading floors with five retail levels and direct connections to the World Trade Center transportation hub.",
    "ja": "3 ワールドトレードセンターは、ニューヨーク・マンハッタンのグリニッジ・ストリート175番地に建つ、Rogers Stirk Harbour + Partners設計の80階建てオフィスタワーで、2018年に開業した。オフィスとトレーディングフロア、5層の商業空間、ワールドトレードセンター交通ハブへの直接接続を一体化している。"
  }'::jsonb,
  significance = '{
    "zh": "不锈钢包覆的外部框架与角部K形支撑共同稳定塔楼，同时让办公楼层的转角保持无柱，形成灵活空间和开阔视野。结构表达因此不只是外观语言，也直接服务于使用；项目获得LEED金级认证，并构成重建后世贸中心的商业核心。",
    "en": "Its stainless-steel exterior frame and K-shaped corner bracing stabilize the tower while keeping office corners column-free, creating flexible workspace and unobstructed views. Structural expression therefore serves use as well as identity; the LEED Gold project forms the commercial core of the rebuilt World Trade Center site.",
    "ja": "ステンレスで覆われた外部フレームと隅部のK字ブレースが塔を安定させながら、オフィス階のコーナーを無柱化し、柔軟な執務空間と遮られない眺望を生み出している。構造表現が外観だけでなく利用にも直結する点が重要で、LEED Gold認証を取得し、再建されたWTC地区の商業的中核を担う。"
  }'::jsonb,
  official_url = 'https://rshp.com/projects/office/3-world-trade-center/',
  updated_at = now()
WHERE id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
  AND slug = '3-world-trade-center';

UPDATE public.images
SET is_primary = false
WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
  AND id IN (
    'da5718d0-7a9b-5077-8680-0b9ee919596c'::uuid,
    'a01e8696-1a6c-56e6-9f86-a57e7bdef7b4'::uuid
  )
  AND is_primary = true;

INSERT INTO public.images (
  building_id,
  url_original,
  url_thumb_400,
  photographer,
  source,
  license,
  source_url,
  img_type,
  is_primary
) VALUES (
  'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid,
  'https://upload.wikimedia.org/wikipedia/commons/e/e4/Three_World_Trade_Center%2C_New_York%2C_NY.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Three_World_Trade_Center%2C_New_York%2C_NY.jpg/500px-Three_World_Trade_Center%2C_New_York%2C_NY.jpg',
  'JJBers',
  'Wikimedia Commons',
  'CC BY 4.0',
  'https://commons.wikimedia.org/wiki/File:Three_World_Trade_Center,_New_York,_NY.jpg',
  'exterior',
  true
);

DO $$
BEGIN
  IF (
    SELECT count(*)
    FROM public.buildings
    WHERE id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
      AND slug = '3-world-trade-center'
      AND name_zh = '世界贸易中心三号楼'
      AND name_ja = '3 ワールドトレードセンター'
      AND city = '纽约'
      AND country = '美国'
      AND country_code = 'US'
      AND type_slug = 'office'
      AND architect_slug = 'richard-rogers'
      AND year_start = 2018
      AND era_slug = 'contemporary'
      AND official_url = 'https://rshp.com/projects/office/3-world-trade-center/'
      AND description ?& ARRAY['zh', 'en', 'ja']
      AND significance ?& ARRAY['zh', 'en', 'ja']
  ) <> 1 THEN
    RAISE EXCEPTION '3 WTC building post-write verification failed';
  END IF;

  IF (
    SELECT count(*)
    FROM public.images
    WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
      AND is_primary = true
      AND source_url = 'https://commons.wikimedia.org/wiki/File:Three_World_Trade_Center,_New_York,_NY.jpg'
      AND photographer = 'JJBers'
      AND source = 'Wikimedia Commons'
      AND license = 'CC BY 4.0'
  ) <> 1 OR (
    SELECT count(*)
    FROM public.images
    WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
      AND is_primary = true
  ) <> 1 THEN
    RAISE EXCEPTION '3 WTC primary image post-write verification failed';
  END IF;
END $$;

COMMIT;
