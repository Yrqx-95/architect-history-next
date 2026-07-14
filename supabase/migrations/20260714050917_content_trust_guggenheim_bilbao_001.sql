-- Guarded content-trust write for the non-graduation Guggenheim Museum Bilbao record.
DO $$
DECLARE matched_count integer;
BEGIN
  SELECT count(*) INTO matched_count
  FROM public.buildings b
  WHERE b.id = '9c2b367b-302d-4971-b5a5-5a5ea3ec7ec9'::uuid
    AND b.slug = 'guggenheim-bilbao'
    AND b.official_url IS NULL
    AND b.description IS NULL
    AND b.significance = jsonb_build_object('en', '毕尔巴鄂效应——一座建筑拯救一座城市')
    AND b.year_start = 1997
    AND b.type_slug = 'cultural'
    AND b.era_slug = 'postmodern'
    AND b.updated_at = '2026-07-08T23:13:38.866069+00:00'::timestamptz
    AND (SELECT count(*) FROM public.images i WHERE i.building_id = b.id AND i.is_primary) = 1;
  IF matched_count <> 1 THEN
    RAISE EXCEPTION 'guggenheim bilbao precondition failed: expected 1, found %', matched_count;
  END IF;
END $$;

UPDATE public.buildings
SET
  official_url = 'https://www.guggenheim-bilbao.eus/en/the-building',
  description = jsonb_build_object(
    'zh', '毕尔巴鄂古根海姆美术馆由弗兰克·盖里设计，1993年至1997年间建成。建筑以钛、石灰石和玻璃构成富有雕塑感的外壳，围绕中央中庭组织展览空间，并回应内尔维翁河沿岸的城市环境。',
    'en', 'Designed by Frank Gehry and built between 1993 and 1997, the Guggenheim Museum Bilbao combines titanium, limestone, and glass in a sculptural building organized around a central atrium. Its site on the Nervión riverfront connects the museum to Bilbao’s urban and industrial transformation.',
    'ja', 'フランク・ゲーリーが設計し、1993年から1997年にかけて建設されたビルバオ・グッゲンハイム美術館は、チタン、石灰岩、ガラスによる彫刻的な建築です。中央アトリウムを軸に展示空間を組織し、ネルビオン川沿いの都市と産業の再生に応答しています.'
  ),
  significance = jsonb_build_object(
    'zh', '它把大胆的形体、复杂的材料技术和河岸城市更新结合起来：建筑不仅成为当代艺术的容器，也成为毕尔巴鄂从工业港口转向文化城市的公共地标。',
    'en', 'The museum links bold form, complex material fabrication, and waterfront regeneration. It became both a container for contemporary art and a public landmark in Bilbao’s shift from an industrial port toward a cultural city.',
    'ja', '大胆な形態、複雑な材料技術、河岸の都市再生を結びつけた建築です。現代美術の容器であると同時に、工業港湾都市から文化都市へ移行するビルバオの公共的なランドマークとなりました.'
  ),
  updated_at = now()
WHERE id = '9c2b367b-302d-4971-b5a5-5a5ea3ec7ec9'::uuid
  AND slug = 'guggenheim-bilbao'
  AND official_url IS NULL
  AND description IS NULL;

DO $$
DECLARE changed_count integer;
BEGIN
  SELECT count(*) INTO changed_count
  FROM public.buildings b
  WHERE b.id = '9c2b367b-302d-4971-b5a5-5a5ea3ec7ec9'::uuid
    AND b.slug = 'guggenheim-bilbao'
    AND b.official_url = 'https://www.guggenheim-bilbao.eus/en/the-building'
    AND b.description ?& array['zh','en','ja']
    AND b.significance ?& array['zh','en','ja']
    AND b.year_start = 1997
    AND b.type_slug = 'cultural'
    AND b.era_slug = 'postmodern';
  IF changed_count <> 1 THEN
    RAISE EXCEPTION 'guggenheim bilbao postcondition failed: expected 1, found %', changed_count;
  END IF;
END $$;
