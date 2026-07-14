-- Guarded rollback for content-trust-unite-habitation-era-001.
DO $$
DECLARE matched_count integer;
BEGIN
  SELECT count(*) INTO matched_count
  FROM public.buildings
  WHERE id = 'e3a966b9-e9d3-4389-97db-a8e4b07f4cad'::uuid
    AND slug = 'unite-habitation'
    AND era_slug = 'modern'
    AND official_url = 'https://www.fondationlecorbusier.fr/en/work-architecture/achievements-unite-dhabitation-marseille-france-1945-1952/'
    AND description ?& array['zh','en','ja']
    AND significance ?& array['zh','en','ja'];
  IF matched_count <> 1 THEN
    RAISE EXCEPTION 'rollback precondition failed: expected 1, found %', matched_count;
  END IF;
END $$;

UPDATE public.buildings
SET era_slug = NULL,
    updated_at = now()
WHERE id = 'e3a966b9-e9d3-4389-97db-a8e4b07f4cad'::uuid
  AND slug = 'unite-habitation'
  AND era_slug = 'modern';
