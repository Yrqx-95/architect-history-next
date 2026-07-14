-- Guarded content-trust write for the Miho Museum record.
-- Reviewed decision: db/review-decisions/content-trust-miho-001.json

DO $$
DECLARE matched_count integer;
BEGIN
  SELECT count(*) INTO matched_count
  FROM public.buildings
  WHERE id = '425a209f-944d-4acf-88e0-695653e3e451'::uuid
    AND slug = 'miho-museum'
    AND architect_slug = 'im-pei'
    AND year_start = 1997
    AND name_zh = ''
    AND name_ja = ''
    AND official_url IS NULL
    AND description IS NULL
    AND significance = jsonb_build_object('en', '桃花源记的建筑转译——隧道与桥的仪式性抵达')
    AND updated_at = '2026-07-08T23:13:38.866069+00:00'::timestamptz;
  IF matched_count <> 1 THEN
    RAISE EXCEPTION 'Miho Museum precondition failed: expected 1, found %', matched_count;
  END IF;

  IF (SELECT count(*) FROM public.images WHERE building_id = '425a209f-944d-4acf-88e0-695653e3e451'::uuid AND is_primary) <> 1 THEN
    RAISE EXCEPTION 'Miho Museum primary image precondition failed';
  END IF;
END $$;

UPDATE public.buildings
SET
  name_zh = '美秀美术馆',
  name_ja = 'MIHO MUSEUM',
  official_url = 'https://www.miho.jp/en/architecture/approach/',
  description = jsonb_build_object(
    'zh', '美秀美术馆位于日本滋贺县甲贺市信乐山区，由贝聿铭设计并于 1997 年开放。建筑约八成位于地下，以隧道、吊桥和山谷入口组织从自然景观到展厅的抵达过程，收藏日本及古代世界艺术。',
    'en', 'Miho Museum in the Shigaraki mountains of Koka, Shiga, Japan, was designed by I. M. Pei and opened in 1997. About 80 percent of the museum is underground; a tunnel, suspension bridge, and valley approach choreograph the arrival from the landscape into the galleries, which hold Japanese and ancient world art.',
    'ja', '滋賀県甲賀市信楽町の山中に建つMIHO MUSEUMは、I.M.ペイが設計し、1997年に開館しました。建物の約80パーセントを地下に収め、トンネル、吊り橋、谷を渡るアプローチによって、自然の景観から展示室へ向かう到達の体験を構成しています。日本美術と古代オリエントなどの世界の美術を収蔵しています。'
  ),
  significance = jsonb_build_object(
    'zh', '项目将陶渊明《桃花源记》中的理想之境转译为空间序列：樱花树道、隧道、跨越山谷的吊桥和远处显现的屋顶共同延迟并强化了抵达。大量埋入山体的体量，则让几何建筑与自然环境保持连续。',
    'en', 'The museum translates the utopian realm of Tao Yuanming’s Peach Blossom Spring into a spatial sequence: a cherry-tree path, tunnel, suspension bridge, and the gradually revealed roof delay and intensify arrival. By burying much of the building in the mountain, the project keeps its geometric architecture continuous with the natural setting.',
    'ja', 'この美術館は、陶淵明の「桃花源記」に描かれた理想郷を、空間の連続として翻訳しています。桜並木、トンネル、谷を越える吊り橋、そして遠くに現れる屋根が、到達を遅らせながら印象を深めます。建物の大部分を山中に埋めることで、幾何学的な建築と自然の環境を連続させています。'
  ),
  updated_at = now()
WHERE id = '425a209f-944d-4acf-88e0-695653e3e451'::uuid
  AND slug = 'miho-museum'
  AND official_url IS NULL
  AND description IS NULL;

DO $$
BEGIN
  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = '425a209f-944d-4acf-88e0-695653e3e451'::uuid
      AND slug = 'miho-museum'
      AND name_zh = '美秀美术馆'
      AND name_ja = 'MIHO MUSEUM'
      AND official_url = 'https://www.miho.jp/en/architecture/approach/'
      AND description ?& ARRAY['zh', 'en', 'ja']
      AND significance ?& ARRAY['zh', 'en', 'ja']
  ) <> 1 THEN
    RAISE EXCEPTION 'Miho Museum postcondition failed';
  END IF;
END $$;
