-- Guarded rollback for content_trust_product_core_batch_002.
DO $$
DECLARE
  matched_count integer;
BEGIN
  SELECT count(*) INTO matched_count
  FROM public.buildings
  WHERE slug IN ('apple-park', 'fallingwater', 'marsk-tower')
    AND official_url IN (
      'https://www.apple.com/newsroom/2017/02/apple-park-opens-to-employees-in-april/',
      'https://fallingwater.org/what-is-fallingwater/',
      'https://big.dk/projects/marsk-tower-4092'
    )
    AND description ?& array['zh', 'en', 'ja']
    AND significance ?& array['zh', 'en', 'ja'];

  IF matched_count <> 3 THEN
    RAISE EXCEPTION 'rollback precondition failed: expected 3, matched %', matched_count;
  END IF;
END $$;

UPDATE public.buildings
SET
  official_url = NULL,
  city = CASE slug
    WHEN 'fallingwater' THEN '宾夕法尼亚州'
    WHEN 'marsk-tower' THEN '斯科尔拜克'
    ELSE city
  END,
  description = NULL,
  significance = CASE slug
    WHEN 'apple-park' THEN '{"en":"世界上最大的曲面玻璃建筑——完美的圆环，科技与自然的共生"}'::jsonb
    WHEN 'fallingwater' THEN '{"en":"有机建筑的终极宣言——建筑与瀑布融为一体，悬臂看似违背重力"}'::jsonb
    WHEN 'marsk-tower' THEN '{"en":"DNA双螺旋的观景塔——一步一景的垂直景观之旅"}'::jsonb
  END,
  updated_at = CASE slug
    WHEN 'apple-park' THEN '2026-07-08T16:11:20.896254+00:00'::timestamptz
    WHEN 'fallingwater' THEN '2026-07-08T15:49:49.358174+00:00'::timestamptz
    WHEN 'marsk-tower' THEN '2026-07-08T16:11:20.896254+00:00'::timestamptz
  END
WHERE slug IN ('apple-park', 'fallingwater', 'marsk-tower');
