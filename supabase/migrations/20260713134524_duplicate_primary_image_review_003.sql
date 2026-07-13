-- Resolve two formally reviewed Commons-vs-Unsplash primary-image conflicts.
-- Reviewed decision: db/review-decisions/duplicate-primary-image-review-003.json

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
  post_thumb text,
  post_primary boolean NOT NULL
) ON COMMIT DROP;

INSERT INTO reviewed_image_seed VALUES
  ('7bb70495-ff9e-51b8-843e-df87b3e045f3', 'a68816e0-5f82-4c9a-abee-41e227adedb5', 'emerson-middle-school', 'https://images.unsplash.com/photo-1774516534097-76eb46de7229?w=1200&q=85', 'https://images.unsplash.com/photo-1774516534097-76eb46de7229?w=400&q=60', 'Neon Wang', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/fUsxJC1KVGQ', 'interior', 'https://images.unsplash.com/photo-1774516534097-76eb46de7229?w=400&q=60', false),
  ('9973f007-c3e6-5b1e-aeb3-bba1bff5bcce', 'a68816e0-5f82-4c9a-abee-41e227adedb5', 'emerson-middle-school', 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Emerson_Middle_School.jpg', 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Emerson_Middle_School.jpg', 'Ucla90024', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Emerson_Middle_School.jpg', 'exterior', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Emerson_Middle_School.jpg/500px-Emerson_Middle_School.jpg', true),
  ('5aec24b1-5b0c-5454-b86a-dd55d71018b5', 'a10950a0-f33e-4899-98f1-e4c49efc28f2', 'esbjerg-performing-arts-centre', 'https://images.unsplash.com/photo-1771033311800-04736883934b?w=1200&q=85', 'https://images.unsplash.com/photo-1771033311800-04736883934b?w=400&q=60', 'Daniel Miksha', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/iKXOhOU0pH0', 'exterior', 'https://images.unsplash.com/photo-1771033311800-04736883934b?w=400&q=60', false),
  ('9e2f8a93-189f-511a-b0f4-494aa18b8ff1', 'a10950a0-f33e-4899-98f1-e4c49efc28f2', 'esbjerg-performing-arts-centre', 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Esbjerg_-_Musikhaus.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Esbjerg_-_Musikhaus.jpg/400px-Esbjerg_-_Musikhaus.jpg', 'Taxiarchos228', 'Wikimedia Commons', 'FAL', 'https://commons.wikimedia.org/wiki/File:Esbjerg_-_Musikhaus.jpg', 'exterior', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Esbjerg_-_Musikhaus.jpg/500px-Esbjerg_-_Musikhaus.jpg', true);

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
        AND i.is_primary = true) <> 4 THEN
    RAISE EXCEPTION 'Reviewed primary image rows changed';
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
