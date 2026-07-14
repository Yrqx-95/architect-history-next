DO $$
BEGIN
  IF (SELECT count(*) FROM public.buildings WHERE slug='james-simon-gallery' AND official_url='https://davidchipperfield.com/projects/james-simon-galerie' AND description ?& array['zh','en','ja']) <> 1 THEN RAISE EXCEPTION 'rollback building precondition failed'; END IF;
  IF (SELECT count(*) FROM public.images WHERE id='a5953bc7-2c56-538f-8448-6ddfed17d25d'::uuid AND is_primary=false) <> 1 THEN RAISE EXCEPTION 'rollback image precondition failed'; END IF;
END $$;
UPDATE public.buildings SET name_zh='', name_ja='', city=NULL, country=NULL, official_url=NULL, description=NULL, significance=NULL, updated_at='2026-07-08T16:11:20.896254+00:00'::timestamptz WHERE slug='james-simon-gallery';
UPDATE public.images SET is_primary=true WHERE id='a5953bc7-2c56-538f-8448-6ddfed17d25d'::uuid;
