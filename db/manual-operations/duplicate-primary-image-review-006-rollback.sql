-- Guarded rollback for production migration 20260713153349_duplicate_primary_image_review_006.

BEGIN;
CREATE TEMP TABLE reviewed_image_rollback_seed (id uuid PRIMARY KEY, building_id uuid NOT NULL, pre_thumb text, pre_primary boolean NOT NULL, post_thumb text, post_primary boolean NOT NULL) ON COMMIT DROP;
INSERT INTO reviewed_image_rollback_seed VALUES
  ('56a1cb17-561e-5e8c-b1af-a84b244b8127','a49470cd-6dcc-4c9d-bd5a-ba88e810d02c','https://images.unsplash.com/photo-1518714049508-96a3054cdaef?w=400&q=60',true,'https://images.unsplash.com/photo-1518714049508-96a3054cdaef?w=400&q=60',false),
  ('bd0440a1-8b3f-54cb-b093-b65ac01cd01c','a49470cd-6dcc-4c9d-bd5a-ba88e810d02c','https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aalto_University_in_the_rain.jpg/400px-Aalto_University_in_the_rain.jpg',true,'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Aalto_University_in_the_rain.jpg/500px-Aalto_University_in_the_rain.jpg',true),
  ('1b6ae504-9176-5397-9865-b234d5da82a6','8c62c0c1-3ac0-41b4-bfdd-077e1ae62b9f','https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Christmas_illumination_in_Hirosaki_-_panoramio.jpg/400px-Christmas_illumination_in_Hirosaki_-_panoramio.jpg',true,'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Christmas_illumination_in_Hirosaki_-_panoramio.jpg/500px-Christmas_illumination_in_Hirosaki_-_panoramio.jpg',true),
  ('c474f432-5979-51e7-9273-4d514b011032','8c62c0c1-3ac0-41b4-bfdd-077e1ae62b9f','https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60',true,'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60',false),
  ('c2f23c2b-bd19-59cd-b413-0559214468af','f2a9f74e-8341-46ff-9d2f-e44a7e5c1eda','https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/191207_Hirosaki_City_Museum_Hirosaki_Aomori_pref_Japan01s.jpg/400px-191207_Hirosaki_City_Museum_Hirosaki_Aomori_pref_Japan01s.jpg',true,'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/191207_Hirosaki_City_Museum_Hirosaki_Aomori_pref_Japan01s.jpg/500px-191207_Hirosaki_City_Museum_Hirosaki_Aomori_pref_Japan01s.jpg',true),
  ('cebf0bf2-69a7-5180-8b20-e138fabd451f','f2a9f74e-8341-46ff-9d2f-e44a7e5c1eda','https://images.unsplash.com/photo-1569227997603-33b9f12af927?w=400&q=60',true,'https://images.unsplash.com/photo-1569227997603-33b9f12af927?w=400&q=60',false),
  ('7c583722-483b-5c1b-ad99-dc7e5935f61c','da27b65f-e726-4a34-8765-43e04145b2fa','https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60',true,'https://images.unsplash.com/photo-1508826882284-54625969a042?w=400&q=60',false),
  ('9f179db0-c6bd-56b8-b377-aa9a8f4037cf','da27b65f-e726-4a34-8765-43e04145b2fa','https://upload.wikimedia.org/wikipedia/commons/d/de/EpicenterHiroshima.JPG',true,'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/EpicenterHiroshima.JPG/500px-EpicenterHiroshima.JPG',true),
  ('c04a8847-db3a-52af-9b42-da503e426f99','773ad0c6-2006-496f-a365-8f81ad4d3cad','https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/1_Nakajimach%C5%8D%2C_Naka-ku%2C_Hiroshima-shi%2C_Hiroshima-ken_730-0811%2C_Japan_-_panoramio_%283%29.jpg/400px-1_Nakajimach%C5%8D%2C_Naka-ku%2C_Hiroshima-shi%2C_Hiroshima-ken_730-0811%2C_Japan_-_panoramio_%283%29.jpg',true,'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/1_Nakajimach%C5%8D%2C_Naka-ku%2C_Hiroshima-shi%2C_Hiroshima-ken_730-0811%2C_Japan_-_panoramio_%283%29.jpg/500px-1_Nakajimach%C5%8D%2C_Naka-ku%2C_Hiroshima-shi%2C_Hiroshima-ken_730-0811%2C_Japan_-_panoramio_%283%29.jpg',true),
  ('da2cae35-9fc1-56ed-b857-0d271c7f9688','773ad0c6-2006-496f-a365-8f81ad4d3cad','https://images.unsplash.com/photo-1768850489732-f29ee375f6bf?w=400&q=60',true,'https://images.unsplash.com/photo-1768850489732-f29ee375f6bf?w=400&q=60',false);
DO $$ BEGIN
  PERFORM 1 FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id=i.id FOR UPDATE;
  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id=i.id WHERE i.building_id=s.building_id AND i.url_thumb_400 IS NOT DISTINCT FROM s.post_thumb AND i.is_primary=s.post_primary) <> 10 THEN RAISE EXCEPTION 'Reviewed image state changed; refusing rollback'; END IF;
  IF (SELECT count(*) FROM public.images WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_rollback_seed) AND is_primary) <> 5 THEN RAISE EXCEPTION 'Reviewed primary state changed; refusing rollback'; END IF;
END $$;
UPDATE public.images i SET url_thumb_400=s.pre_thumb,is_primary=s.pre_primary FROM reviewed_image_rollback_seed s WHERE i.id=s.id;
DO $$ BEGIN
  IF (SELECT count(*) FROM public.images i JOIN reviewed_image_rollback_seed s ON s.id=i.id WHERE i.url_thumb_400 IS NOT DISTINCT FROM s.pre_thumb AND i.is_primary=s.pre_primary) <> 10 THEN RAISE EXCEPTION 'Reviewed image rollback verification failed'; END IF;
  IF (SELECT count(*) FROM public.images WHERE building_id IN (SELECT DISTINCT building_id FROM reviewed_image_rollback_seed) AND is_primary) <> 10 THEN RAISE EXCEPTION 'Reviewed primary rollback count mismatch'; END IF;
END $$;
COMMIT;
