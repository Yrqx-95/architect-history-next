-- Guarded rollback for content_trust_mt_fuji_001.
UPDATE public.buildings
SET
  official_url = NULL,
  description = NULL,
  significance = jsonb_build_object('en', '倒置的富士山——木格锥体在水池中的倒影构成完整的山形'),
  updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz
WHERE id = '0b67c6cf-d44c-4149-8331-6450dc580bdb'::uuid
  AND slug = 'mt-fuji-center'
  AND official_url = 'https://mtfuji-whc.jp/en/facility-overview/'
  AND description ?& ARRAY['zh', 'en', 'ja']
  AND significance ?& ARRAY['zh', 'en', 'ja'];

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.buildings
    WHERE id = '0b67c6cf-d44c-4149-8331-6450dc580bdb'::uuid
      AND slug = 'mt-fuji-center'
      AND official_url IS NULL
      AND description IS NULL
      AND significance = jsonb_build_object('en', '倒置的富士山——木格锥体在水池中的倒影构成完整的山形')
  ) THEN
    RAISE EXCEPTION 'Mt. Fuji World Heritage Centre rollback verification failed';
  END IF;
END $$;
