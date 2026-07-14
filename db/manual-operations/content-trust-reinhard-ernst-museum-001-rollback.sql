-- Guarded rollback for Museum Reinhard Ernst content trust batch 001.

BEGIN;

DO $$
BEGIN
  PERFORM 1 FROM public.buildings
  WHERE id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
  FOR UPDATE;

  PERFORM 1 FROM public.images
  WHERE building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
  FOR UPDATE;

  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
      AND slug = 'reinhard-ernst-museum'
      AND name_zh = '莱因哈德·恩斯特博物馆'
      AND name_ja = 'ラインハルト・エルンスト美術館'
      AND city = '威斯巴登'
      AND country = '德国'
      AND description ?& ARRAY['zh', 'en', 'ja']
      AND significance ?& ARRAY['zh', 'en', 'ja']
      AND official_url = 'https://www.museum-re.de/en/museum/architecture/'
  ) <> 1 THEN
    RAISE EXCEPTION 'Museum Reinhard Ernst repaired metadata changed; refusing rollback';
  END IF;

  IF (
    SELECT count(*) FROM public.images
    WHERE id = '47fa4a36-934a-53f4-9e85-957a4c6c6f0d'::uuid
      AND building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
      AND is_primary = true
      AND img_type = 'interior'
      AND source_url = 'https://commons.wikimedia.org/wiki/File:Ernst_Museum,_Wiesbaden,_atrium.jpg'
      AND license = 'CC0'
  ) <> 1 OR EXISTS (
    SELECT 1 FROM public.images
    WHERE id = '0e6b2f3b-9eab-5983-9b9c-772ba382bc96'::uuid
      AND is_primary = true
  ) THEN
    RAISE EXCEPTION 'Museum Reinhard Ernst repaired image state changed; refusing rollback';
  END IF;
END $$;

UPDATE public.images
SET img_type = 'exterior'
WHERE id = '47fa4a36-934a-53f4-9e85-957a4c6c6f0d'::uuid
  AND building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
  AND img_type = 'interior'
  AND is_primary = true;

UPDATE public.images
SET is_primary = true
WHERE id = '0e6b2f3b-9eab-5983-9b9c-772ba382bc96'::uuid
  AND building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
  AND is_primary = false;

UPDATE public.buildings
SET
  name_zh = '',
  name_ja = '',
  city = NULL,
  country = NULL,
  description = NULL,
  significance = NULL,
  official_url = NULL,
  updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz
WHERE id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
  AND slug = 'reinhard-ernst-museum';

DO $$
BEGIN
  IF (
    SELECT count(*) FROM public.buildings
    WHERE id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
      AND slug = 'reinhard-ernst-museum'
      AND name_zh = '' AND name_ja = ''
      AND city IS NULL AND country IS NULL
      AND description IS NULL AND significance IS NULL
      AND official_url IS NULL
      AND updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION 'Museum Reinhard Ernst metadata rollback verification failed';
  END IF;

  IF (
    SELECT count(*) FROM public.images
    WHERE building_id = 'c2991ac8-3dec-4033-9e81-70aab038c774'::uuid
      AND id IN (
        '0e6b2f3b-9eab-5983-9b9c-772ba382bc96'::uuid,
        '47fa4a36-934a-53f4-9e85-957a4c6c6f0d'::uuid
      )
      AND is_primary = true
  ) <> 2 OR NOT EXISTS (
    SELECT 1 FROM public.images
    WHERE id = '47fa4a36-934a-53f4-9e85-957a4c6c6f0d'::uuid
      AND img_type = 'exterior'
  ) THEN
    RAISE EXCEPTION 'Museum Reinhard Ernst image rollback verification failed';
  END IF;
END $$;

COMMIT;
