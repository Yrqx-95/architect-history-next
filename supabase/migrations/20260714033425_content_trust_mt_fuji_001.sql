-- Guarded content-trust write for the Mt. Fuji World Heritage Centre record.
-- Reviewed decision: db/review-decisions/content-trust-mt-fuji-001.json

DO $$
DECLARE matched_count integer;
BEGIN
  SELECT count(*) INTO matched_count
  FROM public.buildings
  WHERE id = '0b67c6cf-d44c-4149-8331-6450dc580bdb'::uuid
    AND slug = 'mt-fuji-center'
    AND architect_slug = 'shigeru-ban'
    AND year_start = 2017
    AND official_url IS NULL
    AND description IS NULL
    AND significance = jsonb_build_object('en', '倒置的富士山——木格锥体在水池中的倒影构成完整的山形')
    AND updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz;
  IF matched_count <> 1 THEN
    RAISE EXCEPTION 'Mt. Fuji World Heritage Centre precondition failed: expected 1, found %', matched_count;
  END IF;

  IF (SELECT count(*) FROM public.images WHERE building_id = '0b67c6cf-d44c-4149-8331-6450dc580bdb'::uuid AND is_primary) <> 1 THEN
    RAISE EXCEPTION 'Mt. Fuji World Heritage Centre primary image precondition failed';
  END IF;
END $$;

UPDATE public.buildings
SET
  official_url = 'https://mtfuji-whc.jp/en/facility-overview/',
  description = jsonb_build_object(
    'zh', '富士山世界遗产中心位于日本静冈县富士宫，由坂茂设计并于 2017 年开放。建筑以倒置的富士山形木格锥体组织展览、教育与观景空间，入口前的水池倒影将建筑与真实富士山联系起来。',
    'en', 'The Mt. Fuji World Heritage Centre in Fujinomiya, Shizuoka, Japan, was designed by Shigeru Ban and opened in 2017. Its exhibition, education, and viewing spaces are organized around an inverted-Fuji timber lattice cone, while the reflecting pool links the building to the actual mountain.',
    'ja', '静岡県富士宮市の富士山世界遺産センターは、坂茂が設計し、2017年に開館しました。展示、教育、展望の空間を逆さ富士の木格子コーンがまとめ、入口前の水盤の反射によって建築と実際の富士山を結び付けています。'
  ),
  significance = jsonb_build_object(
    'zh', '建筑把富士山从远景转换为空间经验：访客沿着螺旋坡道从一层上升至五层，在木格锥体内部逐步获得关于富士山的展览叙事，并在顶部观景空间重新面对真实山景。',
    'en', 'The centre turns Mount Fuji from a distant image into a spatial experience. Visitors ascend from the first to the fifth floor along a spiral slope, moving through an exhibition narrative inside the timber cone before meeting the real mountain again from the upper viewing spaces.',
    'ja', 'このセンターは、遠景としての富士山を空間的な体験へと変換しています。来館者は1階から5階まで螺旋状のスロープを上り、木格子コーンの内部で富士山の物語をたどった後、上部の展望空間から実際の山と再び向き合います。'
  ),
  updated_at = now()
WHERE id = '0b67c6cf-d44c-4149-8331-6450dc580bdb'::uuid
  AND slug = 'mt-fuji-center'
  AND official_url IS NULL
  AND description IS NULL;

DO $$
BEGIN
  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = '0b67c6cf-d44c-4149-8331-6450dc580bdb'::uuid
      AND slug = 'mt-fuji-center'
      AND official_url = 'https://mtfuji-whc.jp/en/facility-overview/'
      AND description ?& ARRAY['zh', 'en', 'ja']
      AND significance ?& ARRAY['zh', 'en', 'ja']
  ) <> 1 THEN
    RAISE EXCEPTION 'Mt. Fuji World Heritage Centre postcondition failed';
  END IF;
END $$;
