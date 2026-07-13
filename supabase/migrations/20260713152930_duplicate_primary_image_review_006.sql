-- Resolve five formally reviewed duplicate-primary image conflicts.
-- Reviewed decision: db/review-decisions/duplicate-primary-image-review-006.json

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
  ('56a1cb17-561e-5e8c-b1af-a84b244b8127', 'a49470cd-6dcc-4c9d-bd5a-ba88e810d02c', 'helsinki-university-of-technology-main', 'https://images.unsplash.com/photo-1518714049508-96a3054cdaef?w=1200&q=85', 'https://images.unsplash.com/photo-1518714049508-96a3054cdaef?w=400&q=60', 'Bernard Hermant', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/OjwQ9WywGsw', 'detail', true, 'https://images.unsplash.com/photo-1518714049508-96a3054cdaef?w=400&q=60', false),
  ('bd0440a1-8b3f-54cb-b093-b65ac01cd01c', 'a49470cd-6dcc-4c9d-bd5a-ba88e810d02c', 'helsinki-university-of-technology-main', 'https://upload.wikimedia.org/wikipedia/commons/6/60/Aalto_University_in_the_rain.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aalto_University_in_the_rain.jpg/400px-Aalto_University_in_the_rain.jpg', 'JIP', 'Wikimedia Commons', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:Aalto_University_in_the_rain.jpg', 'exterior', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aalto_University_in_the_rain.jpg/500px-Aalto_University_in_the_rain.jpg', true),
  ('1b6ae504-9176-5397-9865-b234d5da82a6', '8c62c0c1-3ac0-41b4-bfdd-077e1ae62b9f', 'hirosaki-city-hall', 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Christmas_illumination_in_Hirosaki_-_panoramio.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Christmas_illumination_in_Hirosaki_-_panoramio.jpg/400px-Christmas_illumination_in_Hirosaki_-_panoramio.jpg', 'Feri88', 'Wikimedia Commons', 'CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:Christmas_illumination_in_Hirosaki_-_panoramio.jpg', 'exterior', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Christmas_illumination_in_Hirosaki_-_panoramio.jpg/500px-Christmas_illumination_in_Hirosaki_-_panoramio.jpg', true),
  ('c474f432-5979-51e7-9273-4d514b011032', '8c62c0c1-3ac0-41b4-bfdd-077e1ae62b9f', 'hirosaki-city-hall', 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=1200&q=85', 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60', 'Casey Horner', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/KR03PvYv3Fs', 'exterior', true, 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60', false),
  ('c2f23c2b-bd19-59cd-b413-0559214468af', 'f2a9f74e-8341-46ff-9d2f-e44a7e5c1eda', 'hirosaki-city-museum', 'https://upload.wikimedia.org/wikipedia/commons/1/1d/191207_Hirosaki_City_Museum_Hirosaki_Aomori_pref_Japan01s.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/191207_Hirosaki_City_Museum_Hirosaki_Aomori_pref_Japan01s.jpg/400px-191207_Hirosaki_City_Museum_Hirosaki_Aomori_pref_Japan01s.jpg', '663highland', 'Wikimedia Commons', 'CC BY-SA 4.0', 'https://commons.wikimedia.org/wiki/File:191207_Hirosaki_City_Museum_Hirosaki_Aomori_pref_Japan01s.jpg', 'exterior', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/191207_Hirosaki_City_Museum_Hirosaki_Aomori_pref_Japan01s.jpg/500px-191207_Hirosaki_City_Museum_Hirosaki_Aomori_pref_Japan01s.jpg', true),
  ('cebf0bf2-69a7-5180-8b20-e138fabd451f', 'f2a9f74e-8341-46ff-9d2f-e44a7e5c1eda', 'hirosaki-city-museum', 'https://images.unsplash.com/photo-1569227997603-33b9f12af927?w=1200&q=85', 'https://images.unsplash.com/photo-1569227997603-33b9f12af927?w=400&q=60', 'Alexander Abero', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/OypnYfdiQgg', 'detail', true, 'https://images.unsplash.com/photo-1569227997603-33b9f12af927?w=400&q=60', false),
  ('7c583722-483b-5c1b-ad99-dc7e5935f61c', 'da27b65f-e726-4a34-8765-43e04145b2fa', 'hiroshima-national-peace-memorial-hall', 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=1200&q=85', 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60', 'Casey Horner', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/KR03PvYv3Fs', 'exterior', true, 'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60', false),
  ('9f179db0-c6bd-56b8-b377-aa9a8f4037cf', 'da27b65f-e726-4a34-8765-43e04145b2fa', 'hiroshima-national-peace-memorial-hall', 'https://upload.wikimedia.org/wikipedia/commons/d/de/EpicenterHiroshima.JPG', 'https://upload.wikimedia.org/wikipedia/commons/d/de/EpicenterHiroshima.JPG', 'Jennie Kondo (Jennie Valdivieso Kondo - Grialte)', 'Wikimedia Commons', 'CC BY-SA 3.0', 'https://commons.wikimedia.org/wiki/File:EpicenterHiroshima.JPG', 'exterior', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/EpicenterHiroshima.JPG/500px-EpicenterHiroshima.JPG', true),
  ('c04a8847-db3a-52af-9b42-da503e426f99', '773ad0c6-2006-496f-a365-8f81ad4d3cad', 'hiroshima-peace-memorial-museum', 'https://upload.wikimedia.org/wikipedia/commons/d/d1/1_Nakajimach%C5%8D%2C_Naka-ku%2C_Hiroshima-shi%2C_Hiroshima-ken_730-0811%2C_Japan_-_panoramio_%283%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/1_Nakajimach%C5%8D%2C_Naka-ku%2C_Hiroshima-shi%2C_Hiroshima-ken_730-0811%2C_Japan_-_panoramio_%283%29.jpg/400px-1_Nakajimach%C5%8D%2C_Naka-ku%2C_Hiroshima-shi%2C_Hiroshima-ken_730-0811%2C_Japan_-_panoramio_%283%29.jpg', 'warabi hatogaya', 'Wikimedia Commons', 'CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:1_Nakajimach%C5%8D,_Naka-ku,_Hiroshima-shi,_Hiroshima-ken_730-0811,_Japan_-_panoramio_(3).jpg', 'exterior', true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/1_Nakajimach%C5%8D%2C_Naka-ku%2C_Hiroshima-shi%2C_Hiroshima-ken_730-0811%2C_Japan_-_panoramio_%283%29.jpg/500px-1_Nakajimach%C5%8D%2C_Naka-ku%2C_Hiroshima-shi%2C_Hiroshima-ken_730-0811%2C_Japan_-_panoramio_%283%29.jpg', true),
  ('da2cae35-9fc1-56ed-b857-0d271c7f9688', '773ad0c6-2006-496f-a365-8f81ad4d3cad', 'hiroshima-peace-memorial-museum', 'https://images.unsplash.com/photo-1768850489732-f29ee375f6bf?w=1200&q=85', 'https://images.unsplash.com/photo-1768850489732-f29ee375f6bf?w=400&q=60', 'Matt Benson', 'Unsplash', 'Unsplash License', 'https://unsplash.com/photos/_lXKIZm2u7k', 'detail', true, 'https://images.unsplash.com/photo-1768850489732-f29ee375f6bf?w=400&q=60', false);

DO $$
BEGIN
  PERFORM 1 FROM public.buildings b WHERE b.id IN (SELECT building_id FROM reviewed_image_seed) FOR UPDATE;
  PERFORM 1 FROM public.images i JOIN reviewed_image_seed s ON s.id = i.id FOR UPDATE;
  IF (SELECT count(*) FROM public.buildings b JOIN (SELECT DISTINCT building_id, building_slug FROM reviewed_image_seed) s ON s.building_id = b.id AND s.building_slug = b.slug) <> 5 THEN RAISE EXCEPTION 'Reviewed building identity changed'; END IF;
  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_seed s ON s.id = i.id WHERE i.building_id=s.building_id AND i.url_original=s.url_original AND i.url_thumb_400 IS NOT DISTINCT FROM s.pre_thumb AND i.photographer=s.photographer AND i.source=s.source AND i.license=s.license AND i.source_url=s.source_url AND i.img_type=s.img_type AND i.is_primary=s.pre_primary) <> 10 THEN RAISE EXCEPTION 'Reviewed image rows changed'; END IF;
  IF (SELECT count(*) FROM public.images WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_seed) AND is_primary) <> 10 THEN RAISE EXCEPTION 'Unexpected primary image row exists in reviewed buildings'; END IF;
END $$;

UPDATE public.images i SET url_thumb_400=s.post_thumb, is_primary=s.post_primary FROM reviewed_image_seed s WHERE i.id=s.id;

DO $$
BEGIN
  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_seed s ON s.id=i.id WHERE i.url_thumb_400 IS NOT DISTINCT FROM s.post_thumb AND i.is_primary=s.post_primary) <> 10 THEN RAISE EXCEPTION 'Reviewed image post-write state mismatch'; END IF;
  IF EXISTS (SELECT building_id FROM public.images WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_seed) GROUP BY building_id HAVING count(*) FILTER (WHERE is_primary) <> 1) THEN RAISE EXCEPTION 'Reviewed building does not have exactly one primary image'; END IF;
END $$;

COMMIT;
