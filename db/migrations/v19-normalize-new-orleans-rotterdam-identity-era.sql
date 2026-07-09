-- V19: Normalize New Orleans (Rotterdam) identity and era metadata
--
-- Scope: one high-confidence weak-identity record from the era identity cleanup review.
-- Idempotent: guarded by wikidata_id and inserts building_eras with ON CONFLICT DO NOTHING.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM public.buildings
    WHERE slug = 'new-orleans-rotterdam'
      AND wikidata_id <> 'Q2522995'
  ) THEN
    RAISE EXCEPTION 'slug new-orleans-rotterdam is already used by another building';
  END IF;
END $$;

UPDATE public.buildings
SET
  slug = 'new-orleans-rotterdam',
  name_en = 'New Orleans (Rotterdam)',
  city = 'Rotterdam',
  country = 'Netherlands',
  country_code = 'NL',
  era_slug = 'contemporary',
  updated_at = now()
WHERE wikidata_id = 'Q2522995'
  AND (slug = 'new-orleans' OR slug = 'new-orleans-rotterdam')
  AND (era_slug IS NULL OR era_slug = 'contemporary');

INSERT INTO public.building_eras (building_id, era_slug)
SELECT building.id, 'contemporary'
FROM public.buildings AS building
JOIN public.eras AS era ON era.slug = 'contemporary'
WHERE building.wikidata_id = 'Q2522995'
ON CONFLICT (building_id, era_slug) DO NOTHING;
