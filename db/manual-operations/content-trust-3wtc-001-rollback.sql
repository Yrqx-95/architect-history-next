-- Guarded rollback for content trust repair 3 WTC 001.
-- Restores the exact metadata and two-primary-image state observed before the repair.

BEGIN;

DO $$
BEGIN
  PERFORM 1
  FROM public.buildings
  WHERE id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
  FOR UPDATE;

  PERFORM 1
  FROM public.images
  WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
  FOR UPDATE;

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
    RAISE EXCEPTION '3 WTC repaired metadata changed; refusing rollback';
  END IF;

  IF (
    SELECT count(*)
    FROM public.images
    WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
      AND is_primary = true
      AND source_url = 'https://commons.wikimedia.org/wiki/File:Three_World_Trade_Center,_New_York,_NY.jpg'
      AND photographer = 'JJBers'
      AND license = 'CC BY 4.0'
  ) <> 1 OR (
    SELECT count(*)
    FROM public.images
    WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
      AND is_primary = true
  ) <> 1 THEN
    RAISE EXCEPTION '3 WTC repaired primary image state changed; refusing rollback';
  END IF;

  IF (
    SELECT count(*)
    FROM public.images
    WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
      AND id IN (
        'da5718d0-7a9b-5077-8680-0b9ee919596c'::uuid,
        'a01e8696-1a6c-56e6-9f86-a57e7bdef7b4'::uuid
      )
      AND is_primary = false
  ) <> 2 THEN
    RAISE EXCEPTION '3 WTC prior image rows changed; refusing rollback';
  END IF;
END $$;

DELETE FROM public.images
WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
  AND source_url = 'https://commons.wikimedia.org/wiki/File:Three_World_Trade_Center,_New_York,_NY.jpg'
  AND is_primary = true;

UPDATE public.images
SET is_primary = true
WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
  AND id IN (
    'da5718d0-7a9b-5077-8680-0b9ee919596c'::uuid,
    'a01e8696-1a6c-56e6-9f86-a57e7bdef7b4'::uuid
  )
  AND is_primary = false;

UPDATE public.buildings
SET
  name_zh = '',
  name_ja = '',
  city = NULL,
  country = NULL,
  type_slug = NULL,
  description = NULL,
  significance = NULL,
  official_url = NULL,
  updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz
WHERE id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
  AND slug = '3-world-trade-center';

DO $$
BEGIN
  IF (
    SELECT count(*)
    FROM public.buildings
    WHERE id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
      AND slug = '3-world-trade-center'
      AND name_zh = ''
      AND name_ja = ''
      AND city IS NULL
      AND country IS NULL
      AND type_slug IS NULL
      AND description IS NULL
      AND significance IS NULL
      AND official_url IS NULL
      AND updated_at = '2026-07-08T16:11:20.896254+00:00'::timestamptz
  ) <> 1 THEN
    RAISE EXCEPTION '3 WTC metadata rollback verification failed';
  END IF;

  IF (
    SELECT count(*)
    FROM public.images
    WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
      AND id IN (
        'da5718d0-7a9b-5077-8680-0b9ee919596c'::uuid,
        'a01e8696-1a6c-56e6-9f86-a57e7bdef7b4'::uuid
      )
      AND is_primary = true
  ) <> 2 OR EXISTS (
    SELECT 1
    FROM public.images
    WHERE building_id = 'ead4315f-9147-4813-b1bd-b21969da36ec'::uuid
      AND source_url = 'https://commons.wikimedia.org/wiki/File:Three_World_Trade_Center,_New_York,_NY.jpg'
  ) THEN
    RAISE EXCEPTION '3 WTC image rollback verification failed';
  END IF;
END $$;

COMMIT;
