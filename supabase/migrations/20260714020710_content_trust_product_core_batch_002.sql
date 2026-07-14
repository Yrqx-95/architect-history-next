-- Content trust product-core batch 002.
-- Scope: three reviewed non-graduation buildings with official sources and identity-safe primary images.
-- Guarded: abort if any record changed since the review snapshot.

DO $$
DECLARE
  expected_count integer := 3;
  matched_count integer;
BEGIN
  SELECT count(*) INTO matched_count
  FROM public.buildings
  WHERE slug IN ('apple-park', 'fallingwater', 'marsk-tower')
    AND official_url IS NULL
    AND description IS NULL
    AND updated_at IN (
      '2026-07-08T16:11:20.896254+00:00'::timestamptz,
      '2026-07-08T15:49:49.358174+00:00'::timestamptz
    );

  IF matched_count <> expected_count THEN
    RAISE EXCEPTION 'content trust batch 002 precondition failed: expected %, matched %', expected_count, matched_count;
  END IF;
END $$;

UPDATE public.buildings
SET
  official_url = CASE slug
    WHEN 'apple-park' THEN 'https://www.apple.com/newsroom/2017/02/apple-park-opens-to-employees-in-april/'
    WHEN 'fallingwater' THEN 'https://fallingwater.org/what-is-fallingwater/'
    WHEN 'marsk-tower' THEN 'https://big.dk/projects/marsk-tower-4092'
  END,
  city = CASE slug
    WHEN 'fallingwater' THEN 'Mill Run'
    WHEN 'marsk-tower' THEN 'Skærbæk'
    ELSE city
  END,
  description = CASE slug
    WHEN 'apple-park' THEN jsonb_build_object(
      'zh', 'Apple Park 是位于美国加州库比蒂诺的环形企业园区。主楼以连续曲面玻璃围合内部公园，园区同时包含办公、剧院、访客中心、步行路径、果园与大面积绿地。',
      'en', 'Apple Park is a ring-shaped corporate campus in Cupertino, California. Its main building encloses an interior park with continuous curved glass, while the campus combines workplaces, a theater, a visitor center, walking paths, orchards, and extensive landscape.',
      'ja', 'アップル・パークは、米国カリフォルニア州クパチーノにあるリング状の企業キャンパスです。連続する曲面ガラスの主棟が中央の公園を囲み、ワークプレイス、劇場、ビジターセンター、歩道、果樹園、広い緑地が一体となっています.'
    )
    WHEN 'fallingwater' THEN jsonb_build_object(
      'zh', '流水别墅是弗兰克·劳埃德·赖特于 1935 年为考夫曼家族设计的住宅，位于美国宾夕法尼亚州米尔朗。建筑悬挑于瀑布之上，并以当地砂岩、混凝土和玻璃将住宅与自然环境连接起来。',
      'en', 'Fallingwater is a house designed by Frank Lloyd Wright in 1935 for the Kaufmann family in Mill Run, Pennsylvania. Rising above a waterfall, it connects the dwelling to its setting through cantilevered terraces, native sandstone, concrete, and glass.',
      'ja', '落水荘は、フランク・ロイド・ライトが1935年にカウフマン家のために設計した住宅で、米国ペンシルベニア州ミル・ランにあります。滝の上に張り出すテラスと、地元の砂岩、コンクリート、ガラスによって、住まいと自然環境を結び付けています.'
    )
    WHEN 'marsk-tower' THEN jsonb_build_object(
      'zh', 'Marsk Tower 是位于丹麦斯卡拜克的观景塔，于 2021 年完成。双螺旋结构把楼梯和观景平台组织成连续的上升路径，让游客从新的高度观看瓦登海国家公园及其周边景观。',
      'en', 'Marsk Tower is an observation tower in Skærbæk, Denmark, completed in 2021. Its double-helix structure turns stairs and viewing platforms into a continuous ascent, offering a new vantage point over the landscape of the Wadden Sea National Park.',
      'ja', 'マルスクタワーは、デンマークのスケルベックに建つ2021年完成の展望塔です。二重らせんの構造が階段と展望デッキを連続した上昇動線にまとめ、ワッデン海国立公園の風景を新たな高さから見渡せるようにしています.'
    )
  END,
  significance = CASE slug
    WHEN 'apple-park' THEN jsonb_build_object(
      'zh', '它把企业总部从单一办公楼扩展为由环形建筑、公共设施与生态景观共同构成的完整环境；连续玻璃表皮、中央公园和可再生能源系统共同塑造了项目的空间与环境策略。',
      'en', 'Apple Park expands the idea of a corporate headquarters into an integrated environment of ring-shaped architecture, shared facilities, and ecological landscape. Its continuous glass envelope, central park, and renewable-energy systems work together as a spatial and environmental strategy.',
      'ja', 'アップル・パークは、企業本社を単一のオフィス建築ではなく、リング状の建築、共有施設、環境景観からなる統合的な環境へと広げました。連続するガラス外皮、中央公園、再生可能エネルギーのシステムが、空間と環境の戦略を一体的に形づくっています.'
    )
    WHEN 'fallingwater' THEN jsonb_build_object(
      'zh', '流水别墅将“有机建筑”从抽象理念转化为可被行走和居住的空间经验：悬挑平台、低矮室内、自然石材与瀑布声共同模糊了建筑与场地的边界。',
      'en', 'Fallingwater turns the idea of organic architecture into an inhabitable and walkable experience. Cantilevered terraces, compressed interiors, native stone, and the sound of the waterfall blur the boundary between building and site.',
      'ja', '落水荘は、有機的建築という理念を、歩き住むことのできる空間体験へと変換しました。張り出すテラス、抑えられた室内、地元の石、そして滝の音が、建築と敷地の境界を曖昧にしています.'
    )
    WHEN 'marsk-tower' THEN jsonb_build_object(
      'zh', 'Marsk Tower 将观景功能转化为一段连续的空间旅程，而不是一次性的终点视野；结构、动线与瓦登海地景在上升过程中彼此叠合。',
      'en', 'Marsk Tower turns observation into a continuous spatial journey rather than a single final view. Structure, movement, and the Wadden Sea landscape overlap as visitors ascend through the tower.',
      'ja', 'マルスクタワーは、展望を一度きりの終点の眺めではなく、連続する空間の旅へと変えています。塔を上る過程で、構造、動線、ワッデン海の風景が重なり合います.'
    )
  END,
  updated_at = now()
WHERE slug IN ('apple-park', 'fallingwater', 'marsk-tower')
  AND official_url IS NULL
  AND description IS NULL;

DO $$
DECLARE
  changed_count integer;
BEGIN
  SELECT count(*) INTO changed_count
  FROM public.buildings
  WHERE slug IN ('apple-park', 'fallingwater', 'marsk-tower')
    AND official_url IS NOT NULL
    AND description ?& array['zh', 'en', 'ja']
    AND significance ?& array['zh', 'en', 'ja'];

  IF changed_count <> 3 THEN
    RAISE EXCEPTION 'content trust batch 002 postcondition failed: expected 3, found %', changed_count;
  END IF;
END $$;
