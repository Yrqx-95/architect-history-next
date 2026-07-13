-- Resolve the four formally reviewed Commons-vs-Commons primary-image conflicts.
-- Reviewed decision: db/review-decisions/duplicate-primary-image-review-001.json
-- Refuses to run if any reviewed building or image row changed after review.

BEGIN;

CREATE TEMP TABLE reviewed_image_seed (
  id uuid PRIMARY KEY,
  building_id uuid NOT NULL,
  building_slug text NOT NULL,
  url_original text NOT NULL,
  pre_thumb text,
  pre_photographer text NOT NULL,
  pre_license text NOT NULL,
  source_url text NOT NULL,
  post_thumb text,
  post_photographer text NOT NULL,
  post_license text NOT NULL,
  post_primary boolean NOT NULL
) ON COMMIT DROP;

INSERT INTO reviewed_image_seed VALUES
  ('515a36a0-6fca-4163-815e-19a665135f32', '3890ee1c-663e-4342-ae25-617449b455cd', 'paimio-sanatorium', 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Paimio_sanatorium_front.jpg', NULL, 'Jpatokal', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Paimio_sanatorium_front.jpg', NULL, 'Jpatokal', 'CC BY-SA 3.0', false),
  ('b0b9835c-3a65-50b4-88a9-b86268fa3820', '3890ee1c-663e-4342-ae25-617449b455cd', 'paimio-sanatorium', 'https://upload.wikimedia.org/wikipedia/commons/4/4c/-Paimio_Sanatorium_20230627-A7201681.JPG-_%2853006235979%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/-Paimio_Sanatorium_20230627-A7201681.JPG-_%2853006235979%29.jpg/400px--Paimio_Sanatorium_20230627-A7201681.JPG-_%2853006235979%29.jpg', 'Tero Karppinen from Finland', 'CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:-Paimio_Sanatorium_20230627-A7201681.JPG-_(53006235979).jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/-Paimio_Sanatorium_20230627-A7201681.JPG-_%2853006235979%29.jpg/500px--Paimio_Sanatorium_20230627-A7201681.JPG-_%2853006235979%29.jpg', 'Tero Karppinen from Finland', 'CC BY 2.0', true),
  ('bdb38b5e-4f2a-4ff6-8426-977efd06903c', '2f00f340-e359-4d5f-a1d5-e1ce73a4d0cc', 'saynatsalo-town-hall', 'https://upload.wikimedia.org/wikipedia/commons/a/a4/S%C3%A4yn%C3%A4tsalon_kunnantalo_2.jpg', NULL, 'Tiera', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:S%C3%A4yn%C3%A4tsalon_kunnantalo_2.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/S%C3%A4yn%C3%A4tsalon_kunnantalo_2.jpg/500px-S%C3%A4yn%C3%A4tsalon_kunnantalo_2.jpg', 'Tiia Monto', 'CC BY-SA 4.0', true),
  ('e490ac8e-516e-5c70-a031-9f4b258a3649', '2f00f340-e359-4d5f-a1d5-e1ce73a4d0cc', 'saynatsalo-town-hall', 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Kaipio_safe_S%C3%A4yn%C3%A4tsalo_Town_Hall.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Kaipio_safe_S%C3%A4yn%C3%A4tsalo_Town_Hall.jpg/400px-Kaipio_safe_S%C3%A4yn%C3%A4tsalo_Town_Hall.jpg', 'Antti Leppänen', 'CC BY 4.0', 'https://commons.wikimedia.org/wiki/File:Kaipio_safe_S%C3%A4yn%C3%A4tsalo_Town_Hall.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Kaipio_safe_S%C3%A4yn%C3%A4tsalo_Town_Hall.jpg/400px-Kaipio_safe_S%C3%A4yn%C3%A4tsalo_Town_Hall.jpg', 'Antti Leppänen', 'CC BY 4.0', false),
  ('418f6f8f-4081-4a68-8fb1-876ee5fa3576', '4a5208c5-0415-4929-8c8c-3e2810b072eb', 'yoyogi-national-gymnasium', 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Yoyogi-National-Gymnasium-01.jpg', NULL, 'Kakidai', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Yoyogi-National-Gymnasium-01.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Yoyogi-National-Gymnasium-01.jpg/500px-Yoyogi-National-Gymnasium-01.jpg', 'Rs1421', 'CC BY-SA 3.0', true),
  ('430b9484-4d33-535b-a280-803f3dc56876', '4a5208c5-0415-4929-8c8c-3e2810b072eb', 'yoyogi-national-gymnasium', 'https://upload.wikimedia.org/wikipedia/commons/4/4d/202401271354_IMG_1295.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/202401271354_IMG_1295.jpg/400px-202401271354_IMG_1295.jpg', 'ウィ貴公子', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:202401271354_IMG_1295.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/202401271354_IMG_1295.jpg/400px-202401271354_IMG_1295.jpg', 'ウィ貴公子', 'CC BY-SA 4.0', false),
  ('67ddf0af-bb47-4f30-9664-b7bbbbdc4a27', '66c4d9bc-5c68-45ec-b92b-b97f5016ba92', 'finlandia-hall', 'https://upload.wikimedia.org/wikipedia/commons/4/41/Finlandia_Wiki.jpg', NULL, 'Thermos', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:Finlandia_Wiki.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Finlandia_Wiki.jpg/500px-Finlandia_Wiki.jpg', 'Thermos', 'CC BY 2.5', true),
  ('c3aee188-e350-5fd8-8fd2-fb3ea5b861e3', '66c4d9bc-5c68-45ec-b92b-b97f5016ba92', 'finlandia-hall', 'https://upload.wikimedia.org/wikipedia/commons/4/47/%28Group_0%29-P1120442_P1120444-3_images_DxO-1.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/%28Group_0%29-P1120442_P1120444-3_images_DxO-1.jpg/400px-%28Group_0%29-P1120442_P1120444-3_images_DxO-1.jpg', 'Korandgen', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:(Group_0)-P1120442_P1120444-3_images_DxO-1.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/%28Group_0%29-P1120442_P1120444-3_images_DxO-1.jpg/400px-%28Group_0%29-P1120442_P1120444-3_images_DxO-1.jpg', 'Korandgen', 'CC BY-SA 4.0', false);

DO $$
BEGIN
  PERFORM 1 FROM public.buildings b
  WHERE b.id IN (SELECT building_id FROM reviewed_image_seed)
  FOR UPDATE;

  PERFORM 1 FROM public.images i
  JOIN reviewed_image_seed s ON s.id = i.id
  FOR UPDATE;

  IF (SELECT count(*) FROM public.buildings b JOIN (SELECT DISTINCT building_id, building_slug FROM reviewed_image_seed) s ON s.building_id = b.id AND s.building_slug = b.slug) <> 4 THEN
    RAISE EXCEPTION 'Reviewed building identity changed';
  END IF;

  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_seed s ON s.id = i.id
      WHERE i.building_id = s.building_id
        AND i.url_original = s.url_original
        AND i.url_thumb_400 IS NOT DISTINCT FROM s.pre_thumb
        AND i.photographer = s.pre_photographer
        AND i.source = 'Wikimedia Commons'
        AND i.license = s.pre_license
        AND i.source_url = s.source_url
        AND i.img_type = 'exterior'
        AND i.is_primary = true) <> 8 THEN
    RAISE EXCEPTION 'Reviewed primary image rows changed';
  END IF;

  IF (SELECT count(*) FROM public.images WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_seed) AND is_primary) <> 8 THEN
    RAISE EXCEPTION 'Unexpected primary image row exists in reviewed buildings';
  END IF;
END $$;

UPDATE public.images i
SET url_thumb_400 = s.post_thumb,
    photographer = s.post_photographer,
    license = s.post_license,
    is_primary = s.post_primary
FROM reviewed_image_seed s
WHERE i.id = s.id;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_seed s ON s.id = i.id
      WHERE i.url_thumb_400 IS NOT DISTINCT FROM s.post_thumb
        AND i.photographer = s.post_photographer
        AND i.license = s.post_license
        AND i.is_primary = s.post_primary) <> 8 THEN
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
