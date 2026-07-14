-- Guarded content-trust write for the non-graduation Unité d'Habitation record.
DO $$
DECLARE matched_count integer;
BEGIN
  SELECT count(*) INTO matched_count
  FROM public.buildings
  WHERE slug = 'unite-habitation'
    AND official_url IS NULL
    AND description IS NULL
    AND updated_at = '2026-05-23T11:39:25.939222+00:00'::timestamptz;
  IF matched_count <> 1 THEN
    RAISE EXCEPTION 'unite habitation precondition failed: expected 1, found %', matched_count;
  END IF;
END $$;

UPDATE public.buildings
SET
  official_url = 'https://www.fondationlecorbusier.fr/en/work-architecture/achievements-unite-dhabitation-marseille-france-1945-1952/',
  description = jsonb_build_object(
    'zh', '马赛公寓是勒·柯布西耶于 1945—1952 年完成的集体住宅，位于法国马赛。建筑包含 330 套住宅和公共空间，架空于树木公园之上，并在内部组织了商业街、公共设施和屋顶活动空间。',
    'en', 'The Unité d’Habitation in Marseille is a collective housing project by Le Corbusier, completed between 1945 and 1952. It contains 330 apartments and collective spaces, stands on pilotis within a wooded park, and incorporates interior streets, shared facilities, and an active roof terrace.',
    'ja', 'マルセイユのユニテ・ダビタシオンは、ル・コルビュジエが1945年から1952年にかけて完成させた集合住宅です。330戸の住戸と共用空間を収め、樹木のある公園の中でピロティによって地上から持ち上げられ、内部の商店街、共有施設、活動的な屋上テラスを備えています.'
  ),
  significance = jsonb_build_object(
    'zh', '它把集体住宅、公共服务和城市生活压缩进一座“垂直城市”：住户通过内部街道连接商业与公共设施，屋顶则继续承载运动、剧场和教育等共同活动。',
    'en', 'The project compresses collective housing, public services, and urban life into a “vertical city.” Interior streets connect residents to commerce and shared facilities, while the roof extends communal life through recreation, theater, and education.',
    'ja', 'この建築は、集合住宅、公共サービス、都市生活を一つの「垂直都市」に凝縮しています。内部の街路が住民を商業や共有施設へ導き、屋上は運動、劇場、教育などの共同活動へと生活を広げます.'
  ),
  updated_at = now()
WHERE slug = 'unite-habitation'
  AND official_url IS NULL
  AND description IS NULL;

DO $$
DECLARE changed_count integer;
BEGIN
  SELECT count(*) INTO changed_count
  FROM public.buildings
  WHERE slug = 'unite-habitation'
    AND official_url = 'https://www.fondationlecorbusier.fr/en/work-architecture/achievements-unite-dhabitation-marseille-france-1945-1952/'
    AND description ?& array['zh','en','ja']
    AND significance ?& array['zh','en','ja'];
  IF changed_count <> 1 THEN
    RAISE EXCEPTION 'unite habitation postcondition failed: expected 1, found %', changed_count;
  END IF;
END $$;
