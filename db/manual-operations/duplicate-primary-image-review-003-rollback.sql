-- Guarded rollback for production migration 20260713134754 duplicate_primary_image_review_003.

BEGIN;

CREATE TEMP TABLE reviewed_image_rollback_seed (
  id uuid PRIMARY KEY,
  building_id uuid NOT NULL,
  pre_thumb text,
  post_thumb text,
  post_primary boolean NOT NULL
) ON COMMIT DROP;

INSERT INTO reviewed_image_rollback_seed VALUES
  ('7bb70495-ff9e-51b8-843e-df87b3e045f3', 'a68816e0-5f82-4c9a-abee-41e227adedb5', 'https://images.unsplash.com/photo-1774516534097-76eb46de7229?w=400&q=60', 'https://images.unsplash.com/photo-1774516534097-76eb46de7229?w=400&q=60', false),
  ('9973f007-c3e6-5b1e-aeb3-bba1bff5bcce', 'a68816e0-5f82-4c9a-abee-41e227adedb5', 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Emerson_Middle_School.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Emerson_Middle_School.jpg/500px-Emerson_Middle_School.jpg', true),
  ('5aec24b1-5b0c-5454-b86a-dd55d71018b5', 'a10950a0-f33e-4899-98f1-e4c49efc28f2', 'https://images.unsplash.com/photo-1771033311800-04736883934b?w=400&q=60', 'https://images.unsplash.com/photo-1771033311800-04736883934b?w=400&q=60', false),
  ('9e2f8a93-189f-511a-b0f4-494aa18b8ff1', 'a10950a0-f33e-4899-98f1-e4c49efc28f2', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Esbjerg_-_Musikhaus.jpg/400px-Esbjerg_-_Musikhaus.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Esbjerg_-_Musikhaus.jpg/500px-Esbjerg_-_Musikhaus.jpg', true);

DO $$
BEGIN
  PERFORM 1 FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id = i.id FOR UPDATE;

  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id = i.id
      WHERE i.building_id = s.building_id
        AND i.url_thumb_400 IS NOT DISTINCT FROM s.post_thumb
        AND i.is_primary = s.post_primary) <> 4 THEN
    RAISE EXCEPTION 'Reviewed image state changed; refusing rollback';
  END IF;

  IF EXISTS (
    SELECT building_id FROM public.images
    WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_rollback_seed)
    GROUP BY building_id HAVING count(*) FILTER (WHERE is_primary) <> 1
  ) THEN
    RAISE EXCEPTION 'Reviewed primary state changed; refusing rollback';
  END IF;
END $$;

UPDATE public.images i
SET url_thumb_400 = s.pre_thumb,
    is_primary = true
FROM reviewed_image_rollback_seed s
WHERE i.id = s.id;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id = i.id
      WHERE i.url_thumb_400 IS NOT DISTINCT FROM s.pre_thumb
        AND i.is_primary = true) <> 4 THEN
    RAISE EXCEPTION 'Reviewed image rollback verification failed';
  END IF;

  IF (SELECT count(*) FROM public.images WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_rollback_seed) AND is_primary) <> 4 THEN
    RAISE EXCEPTION 'Reviewed primary rollback count mismatch';
  END IF;
END $$;

COMMIT;
