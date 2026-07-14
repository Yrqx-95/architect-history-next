-- Guarded rollback for content_trust_miho_001.
UPDATE public.buildings
SET
  name_zh = '',
  name_ja = '',
  official_url = NULL,
  description = NULL,
  significance = jsonb_build_object('en', '桃花源记的建筑转译——隧道与桥的仪式性抵达'),
  updated_at = '2026-07-08T23:13:38.866069+00:00'::timestamptz
WHERE id = '425a209f-944d-4acf-88e0-695653e3e451'::uuid
  AND slug = 'miho-museum'
  AND name_zh = '美秀美术馆'
  AND name_ja = 'MIHO MUSEUM'
  AND official_url = 'https://www.miho.jp/en/architecture/approach/'
  AND description ?& ARRAY['zh', 'en', 'ja']
  AND significance ?& ARRAY['zh', 'en', 'ja'];

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.buildings
    WHERE id = '425a209f-944d-4acf-88e0-695653e3e451'::uuid
      AND slug = 'miho-museum'
      AND name_zh = ''
      AND name_ja = ''
      AND official_url IS NULL
      AND description IS NULL
      AND significance = jsonb_build_object('en', '桃花源记的建筑转译——隧道与桥的仪式性抵达')
  ) THEN
    RAISE EXCEPTION 'Miho Museum rollback verification failed';
  END IF;
END $$;
