-- Guarded rollback for production migration 20260713132011 duplicate_primary_image_review_002.

BEGIN;

CREATE TEMP TABLE reviewed_image_rollback_seed (
  id uuid PRIMARY KEY,
  building_id uuid NOT NULL,
  pre_thumb text,
  pre_img_type text NOT NULL,
  post_thumb text,
  post_img_type text NOT NULL,
  post_primary boolean NOT NULL
) ON COMMIT DROP;

INSERT INTO reviewed_image_rollback_seed VALUES
  ('c2b42453-a8f3-52d1-b878-65147d52570f', 'a883ac20-0203-4acd-af98-2336613df9f3', 'https://upload.wikimedia.org/wikipedia/commons/4/40/64_Old_Church_St.jpg', 'exterior', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/64_Old_Church_St.jpg/500px-64_Old_Church_St.jpg', 'exterior', true),
  ('cdb2f6df-99c6-547d-a931-563c8f77dc5a', 'a883ac20-0203-4acd-af98-2336613df9f3', 'https://images.unsplash.com/photo-1616418534243-ab757ff8ce3a?w=400&q=60', 'exterior', 'https://images.unsplash.com/photo-1616418534243-ab757ff8ce3a?w=400&q=60', 'exterior', false),
  ('f96e311e-e567-5493-8e64-e6278acd4056', '1a5b36e0-571f-4b88-a26f-12eeb8482254', 'https://upload.wikimedia.org/wikipedia/commons/2/27/FWP_American_Guide_Series_city_1941_California_Los_Angeles_a_guide_to_the_city_and_its_environs_34.png', 'exterior', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/FWP_American_Guide_Series_city_1941_California_Los_Angeles_a_guide_to_the_city_and_its_environs_34.png/500px-FWP_American_Guide_Series_city_1941_California_Los_Angeles_a_guide_to_the_city_and_its_environs_34.png', 'exterior', true),
  ('fe8a9ddb-7443-5d05-9b00-a305066df046', '1a5b36e0-571f-4b88-a26f-12eeb8482254', 'https://images.unsplash.com/photo-1774516534097-76eb46de7229?w=400&q=60', 'interior', 'https://images.unsplash.com/photo-1774516534097-76eb46de7229?w=400&q=60', 'interior', false),
  ('b6ad1be6-7e6b-5a4a-8961-a57347fcd8fd', '5bfe38a7-dd36-40ff-bdff-8b6807cfbc09', 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Dymaxion_House_-_LOC_8c14943v.jpg', 'exterior', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Dymaxion_House_-_LOC_8c14943v.jpg/500px-Dymaxion_House_-_LOC_8c14943v.jpg', 'interior', true),
  ('0a33c904-6fdd-55ee-8df1-db43de5bb011', '5bfe38a7-dd36-40ff-bdff-8b6807cfbc09', 'https://images.unsplash.com/photo-1775315908342-e6bc9ff42d60?w=400&q=60', 'interior', 'https://images.unsplash.com/photo-1775315908342-e6bc9ff42d60?w=400&q=60', 'interior', false);

DO $$
BEGIN
  PERFORM 1 FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id = i.id FOR UPDATE;

  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id = i.id
      WHERE i.building_id = s.building_id
        AND i.url_thumb_400 IS NOT DISTINCT FROM s.post_thumb
        AND i.img_type = s.post_img_type
        AND i.is_primary = s.post_primary) <> 6 THEN
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
    img_type = s.pre_img_type,
    is_primary = true
FROM reviewed_image_rollback_seed s
WHERE i.id = s.id;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id = i.id
      WHERE i.url_thumb_400 IS NOT DISTINCT FROM s.pre_thumb
        AND i.img_type = s.pre_img_type
        AND i.is_primary = true) <> 6 THEN
    RAISE EXCEPTION 'Reviewed image rollback verification failed';
  END IF;

  IF (SELECT count(*) FROM public.images WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_rollback_seed) AND is_primary) <> 6 THEN
    RAISE EXCEPTION 'Reviewed primary rollback count mismatch';
  END IF;
END $$;

COMMIT;
