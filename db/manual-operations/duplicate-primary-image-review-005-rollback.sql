-- Guarded rollback for production migration 20260713150845 duplicate_primary_image_review_005.

BEGIN;

CREATE TEMP TABLE reviewed_image_rollback_seed (
  id uuid PRIMARY KEY,
  building_id uuid NOT NULL,
  pre_thumb text,
  pre_primary boolean NOT NULL,
  post_thumb text,
  post_primary boolean NOT NULL
) ON COMMIT DROP;

INSERT INTO reviewed_image_rollback_seed VALUES
  ('218b6c10-2c81-5b4a-8c33-6f5662074bed', '18004093-762b-47fc-ac62-ccf401774d1f', 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Centro_Commerciale_Le_Torri_%28Florence%29_-_Fountain_01.jpg', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Centro_Commerciale_Le_Torri_%28Florence%29_-_Fountain_01.jpg/500px-Centro_Commerciale_Le_Torri_%28Florence%29_-_Fountain_01.jpg', true),
  ('39dac153-dd14-5051-a731-c3230c693c59', '18004093-762b-47fc-ac62-ccf401774d1f', 'https://images.unsplash.com/photo-1583338850703-bc602b103674?w=400&q=60', true, 'https://images.unsplash.com/photo-1583338850703-bc602b103674?w=400&q=60', false),
  ('6a792d58-e85a-5ecd-984d-1eb6720b13e3', '5d61b2c0-5d44-448b-83bc-57e5a3e3c467', 'https://upload.wikimedia.org/wikipedia/commons/d/d9/TANGE-old-Tokyo-city-hall-1957.jpg', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/TANGE-old-Tokyo-city-hall-1957.jpg/500px-TANGE-old-Tokyo-city-hall-1957.jpg', true),
  ('e0fb2489-e8ba-5ea7-a1c4-9bead8688466', '5d61b2c0-5d44-448b-83bc-57e5a3e3c467', 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60', true, 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60', false);

DO $$
BEGIN
  PERFORM 1 FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id = i.id FOR UPDATE;

  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id = i.id
      WHERE i.building_id = s.building_id
        AND i.url_thumb_400 IS NOT DISTINCT FROM s.post_thumb
        AND i.is_primary = s.post_primary) <> 4 THEN
    RAISE EXCEPTION 'Reviewed image state changed; refusing rollback';
  END IF;

  IF (SELECT count(*) FROM public.images WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_rollback_seed) AND is_primary) <> 2 THEN
    RAISE EXCEPTION 'Reviewed primary state changed; refusing rollback';
  END IF;
END $$;

UPDATE public.images i
SET url_thumb_400 = s.pre_thumb,
    is_primary = s.pre_primary
FROM reviewed_image_rollback_seed s
WHERE i.id = s.id;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id = i.id
      WHERE i.url_thumb_400 IS NOT DISTINCT FROM s.pre_thumb
        AND i.is_primary = s.pre_primary) <> 4 THEN
    RAISE EXCEPTION 'Reviewed image rollback verification failed';
  END IF;

  IF (SELECT count(*) FROM public.images WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_rollback_seed) AND is_primary) <> 4 THEN
    RAISE EXCEPTION 'Reviewed primary rollback count mismatch';
  END IF;
END $$;

COMMIT;
