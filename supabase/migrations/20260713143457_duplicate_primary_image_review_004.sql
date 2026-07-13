-- Resolve four formally reviewed duplicate-primary image conflicts.
-- Reviewed decision: db/review-decisions/duplicate-primary-image-review-004.json

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
  ('6d785cfe-949e-53a6-bfcc-95fea936fb0b', 'b4e59c10-0d66-4a93-b1ed-4da536de95f3', 'foundation-e-g-buhrle-collection', 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Frans_Hals_-_portrait_of_a_man_with_a_tassle_collar.jpg', 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Frans_Hals_-_portrait_of_a_man_with_a_tassle_collar.jpg', 'Frans Hals', 'Wikimedia Commons', 'Public domain', 'https://commons.wikimedia.org/wiki/File:Frans_Hals_-_portrait_of_a_man_with_a_tassle_collar.jpg', 'exterior', true, 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Frans_Hals_-_portrait_of_a_man_with_a_tassle_collar.jpg', false),
  ('dca474e2-99e8-5069-b5cf-459a76bffd49', 'b4e59c10-0d66-4a93-b1ed-4da536de95f3', 'foundation-e-g-buhrle-collection', 'https://images.unsplash.com/photo-1508965199542-13e186cf8ba3?w=1200&q=85', 'https://images.unsplash.com/photo-1508965199542-13e186cf8ba3?w=400&q=60', 'Sam Poullain', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/w737molHzkw', 'exterior', true, 'https://images.unsplash.com/photo-1508965199542-13e186cf8ba3?w=400&q=60', false),
  ('274c52f0-c8f2-5c01-98db-04769e6899c1', 'b4e59c10-0d66-4a93-b1ed-4da536de95f3', 'foundation-e-g-buhrle-collection', 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Sammlung_E._G._B%C3%BChrle_-_Zollikerstrasse_2011-08-21_13-29-22_ShiftN.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Sammlung_E._G._B%C3%BChrle_-_Zollikerstrasse_2011-08-21_13-29-22_ShiftN.jpg/400px-Sammlung_E._G._B%C3%BChrle_-_Zollikerstrasse_2011-08-21_13-29-22_ShiftN.jpg', 'Roland zh', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Sammlung_E._G._B%C3%BChrle_-_Zollikerstrasse_2011-08-21_13-29-22_ShiftN.jpg', 'exterior', false, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Sammlung_E._G._B%C3%BChrle_-_Zollikerstrasse_2011-08-21_13-29-22_ShiftN.jpg/500px-Sammlung_E._G._B%C3%BChrle_-_Zollikerstrasse_2011-08-21_13-29-22_ShiftN.jpg', true),
  ('10db37df-7915-5a90-8d6c-7f9b9de53ff2', '8875314d-f153-4328-a1b1-31439eff8c50', 'gipsoteca-canoviana', 'https://images.unsplash.com/photo-1775315908342-e6bc9ff42d60?w=1200&q=85', 'https://images.unsplash.com/photo-1775315908342-e6bc9ff42d60?w=400&q=60', 'Paolo Chiabrando', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/olhJRxPo770', 'interior', true, 'https://images.unsplash.com/photo-1775315908342-e6bc9ff42d60?w=400&q=60', false),
  ('251eaf4d-79af-5737-84ac-17790db7c952', '8875314d-f153-4328-a1b1-31439eff8c50', 'gipsoteca-canoviana', 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Asolo-Museum_Canoviano.JPG', 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Asolo-Museum_Canoviano.JPG', 'No machine-readable author provided. Caracas1830 assumed (based on copyright claims).', 'Wikimedia Commons', 'CC BY-SA 2.5', 'https://commons.wikimedia.org/wiki/File:Asolo-Museum_Canoviano.JPG', 'exterior', true, 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Asolo-Museum_Canoviano.JPG', false),
  ('e4b877ee-9c4f-56b0-8f2e-b280eb1d360f', '8875314d-f153-4328-a1b1-31439eff8c50', 'gipsoteca-canoviana', 'https://upload.wikimedia.org/wikipedia/commons/d/de/Possagno%2C_Gipsoteca_Canoviana.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Possagno%2C_Gipsoteca_Canoviana.jpg/400px-Possagno%2C_Gipsoteca_Canoviana.jpg', 'seier+seier', 'Wikimedia Commons', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Possagno,_Gipsoteca_Canoviana.jpg', 'exterior', false, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Possagno%2C_Gipsoteca_Canoviana.jpg/500px-Possagno%2C_Gipsoteca_Canoviana.jpg', true),
  ('4ea4dc11-4b79-537b-94e4-77c5721d0845', 'c14255e0-1d48-4de9-94e7-dfecf34cbc19', 'government-service-center', 'https://upload.wikimedia.org/wikipedia/commons/f/f6/02_Rudolph_Boston_Government_Naquib_Hossain_A_2650195.jpg', 'https://upload.wikimedia.org/wikipedia/commons/f/f6/02_Rudolph_Boston_Government_Naquib_Hossain_A_2650195.jpg', 'Naquib Hossain', 'Wikimedia Commons', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:02_Rudolph_Boston_Government_Naquib_Hossain_A_2650195.jpg', 'exterior', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/02_Rudolph_Boston_Government_Naquib_Hossain_A_2650195.jpg/500px-02_Rudolph_Boston_Government_Naquib_Hossain_A_2650195.jpg', true),
  ('d4b33686-ac3d-5a77-8dd1-162b21a4cc22', 'c14255e0-1d48-4de9-94e7-dfecf34cbc19', 'government-service-center', 'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=1200&q=85', 'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=400&q=60', 'Kimon Maritz', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/mQiZnKwGXW0', 'exterior', true, 'https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=400&q=60', false),
  ('a43346b6-861f-551c-8c25-f6a28fc52dbd', 'f6d35c0f-fc8b-4ef9-b6ab-afad54c04072', 'hagi-uragami-museum', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Hagi_Uragami_Mus.JPG', 'https://upload.wikimedia.org/wikipedia/commons/6/65/Hagi_Uragami_Mus.JPG', 'Wiki708', 'Wikimedia Commons', 'CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:Hagi_Uragami_Mus.JPG', 'exterior', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Hagi_Uragami_Mus.JPG/500px-Hagi_Uragami_Mus.JPG', true),
  ('cd29901d-a74f-56e9-8705-56c1571883bf', 'f6d35c0f-fc8b-4ef9-b6ab-afad54c04072', 'hagi-uragami-museum', 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=1200&q=85', 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60', 'Casey Horner', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/KR03PvYv3Fs', 'exterior', true, 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60', false);

DO $$
BEGIN
  PERFORM 1 FROM public.buildings b WHERE b.id IN (SELECT building_id FROM reviewed_image_seed) FOR UPDATE;
  PERFORM 1 FROM public.images i JOIN reviewed_image_seed s ON s.id = i.id FOR UPDATE;

  IF (SELECT count(*) FROM public.buildings b JOIN (SELECT DISTINCT building_id, building_slug FROM reviewed_image_seed) s ON s.building_id = b.id AND s.building_slug = b.slug) <> 4 THEN
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
        AND i.is_primary = s.pre_primary) <> 10 THEN
    RAISE EXCEPTION 'Reviewed image rows changed';
  END IF;

  IF (SELECT count(*) FROM public.images WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_seed) AND is_primary) <> 8 THEN
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
        AND i.is_primary = s.post_primary) <> 10 THEN
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
