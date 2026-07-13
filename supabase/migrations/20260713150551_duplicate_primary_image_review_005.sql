-- Resolve two formally reviewed duplicate-primary image conflicts.
-- Reviewed decision: db/review-decisions/duplicate-primary-image-review-005.json

BEGIN;

CREATE TEMP TABLE reviewed_image_seed (
  id uuid PRIMARY KEY,
  building_id uuid NOT NULL,
  building_slug text NOT NULL,
  url_original text NOT NULL,
  pre_thumb text,
  photographer text NOT NULL,
  source text NOT NULL,
  license text NOT NULL,
  source_url text NOT NULL,
  img_type text NOT NULL,
  pre_primary boolean NOT NULL,
  post_thumb text,
  post_primary boolean NOT NULL
) ON COMMIT DROP;

INSERT INTO reviewed_image_seed VALUES
  ('218b6c10-2c81-5b4a-8c33-6f5662074bed', '18004093-762b-47fc-ac62-ccf401774d1f', 'centro-commerciale-le-torri', 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Centro_Commerciale_Le_Torri_%28Florence%29_-_Fountain_01.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Centro_Commerciale_Le_Torri_%28Florence%29_-_Fountain_01.jpg', 'Cyberuly', 'Wikimedia Commons', 'CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:Centro_Commerciale_Le_Torri_(Florence)_-_Fountain_01.jpg', 'exterior', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Centro_Commerciale_Le_Torri_%28Florence%29_-_Fountain_01.jpg/500px-Centro_Commerciale_Le_Torri_%28Florence%29_-_Fountain_01.jpg', true),
  ('39dac153-dd14-5051-a731-c3230c693c59', '18004093-762b-47fc-ac62-ccf401774d1f', 'centro-commerciale-le-torri', 'https://images.unsplash.com/photo-1583338850703-bc602b103674?w=1200&q=85', 'https://images.unsplash.com/photo-1583338850703-bc602b103674?w=400&q=60', 'Patrick Robert Doyle', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/_8bM_EqmFgM', 'detail', true, 'https://images.unsplash.com/photo-1583338850703-bc602b103674?w=400&q=60', false),
  ('6a792d58-e85a-5ecd-984d-1eb6720b13e3', '5d61b2c0-5d44-448b-83bc-57e5a3e3c467', 'former-tokyo-metropolitan-government-building', 'https://upload.wikimedia.org/wikipedia/commons/d/d9/TANGE-old-Tokyo-city-hall-1957.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/d9/TANGE-old-Tokyo-city-hall-1957.jpg', 'Bigjap', 'Wikimedia Commons', 'CC0', 'https://commons.wikimedia.org/wiki/File:TANGE-old-Tokyo-city-hall-1957.jpg', 'exterior', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/TANGE-old-Tokyo-city-hall-1957.jpg/500px-TANGE-old-Tokyo-city-hall-1957.jpg', true),
  ('e0fb2489-e8ba-5ea7-a1c4-9bead8688466', '5d61b2c0-5d44-448b-83bc-57e5a3e3c467', 'former-tokyo-metropolitan-government-building', 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=1200&q=85', 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60', 'Casey Horner', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/KR03PvYv3Fs', 'exterior', true, 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60', false);

DO $$
BEGIN
  PERFORM 1 FROM public.buildings b WHERE b.id IN (SELECT building_id FROM reviewed_image_seed) FOR UPDATE;
  PERFORM 1 FROM public.images i JOIN reviewed_image_seed s ON s.id = i.id FOR UPDATE;

  IF (SELECT count(*) FROM public.buildings b JOIN (SELECT DISTINCT building_id, building_slug FROM reviewed_image_seed) s ON s.building_id = b.id AND s.building_slug = b.slug) <> 2 THEN
    RAISE EXCEPTION 'Reviewed building identity changed';
  END IF;

  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_seed s ON s.id = i.id
      WHERE i.building_id = s.building_id
        AND i.url_original = s.url_original
        AND i.url_thumb_400 IS NOT DISTINCT FROM s.pre_thumb
        AND i.photographer = s.photographer
        AND i.source = s.source
        AND i.license = s.license
        AND i.source_url = s.source_url
        AND i.img_type = s.img_type
        AND i.is_primary = s.pre_primary) <> 4 THEN
    RAISE EXCEPTION 'Reviewed image rows changed';
  END IF;

  IF (SELECT count(*) FROM public.images WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_seed) AND is_primary) <> 4 THEN
    RAISE EXCEPTION 'Unexpected primary image row exists in reviewed buildings';
  END IF;
END $$;

UPDATE public.images i
SET url_thumb_400 = s.post_thumb,
    is_primary = s.post_primary
FROM reviewed_image_seed s
WHERE i.id = s.id;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_seed s ON s.id = i.id
      WHERE i.url_thumb_400 IS NOT DISTINCT FROM s.post_thumb
        AND i.is_primary = s.post_primary) <> 4 THEN
    RAISE EXCEPTION 'Reviewed image post-write state mismatch';
  END IF;

  IF EXISTS (
    SELECT building_id FROM public.images
    WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_seed)
    GROUP BY building_id HAVING count(*) FILTER (WHERE is_primary) <> 1
  ) THEN
    RAISE EXCEPTION 'Reviewed building does not have exactly one primary image';
  END IF;
END $$;

COMMIT;
