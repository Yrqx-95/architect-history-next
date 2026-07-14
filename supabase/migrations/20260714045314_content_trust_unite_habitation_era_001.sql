-- Guarded metadata write: classify the existing non-graduation Unité d'Habitation record.
DO $$
DECLARE matched_count integer;
BEGIN
  SELECT count(*) INTO matched_count
  FROM public.buildings b
  WHERE b.id = 'e3a966b9-e9d3-4389-97db-a8e4b07f4cad'::uuid
    AND b.slug = 'unite-habitation'
    AND b.official_url = 'https://www.fondationlecorbusier.fr/en/work-architecture/achievements-unite-dhabitation-marseille-france-1945-1952/'
    AND b.era_slug IS NULL
    AND b.description ?& array['zh','en','ja']
    AND b.significance ?& array['zh','en','ja']
    AND b.updated_at = '2026-07-14T02:38:13.137738+00:00'::timestamptz
    AND (SELECT count(*) FROM public.images i WHERE i.building_id = b.id AND i.is_primary) = 1;
  IF matched_count <> 1 THEN
    RAISE EXCEPTION 'unite habitation era precondition failed: expected 1, found %', matched_count;
  END IF;
END $$;

UPDATE public.buildings
SET era_slug = 'modern',
    updated_at = now()
WHERE id = 'e3a966b9-e9d3-4389-97db-a8e4b07f4cad'::uuid
  AND slug = 'unite-habitation'
  AND official_url = 'https://www.fondationlecorbusier.fr/en/work-architecture/achievements-unite-dhabitation-marseille-france-1945-1952/'
  AND era_slug IS NULL;

DO $$
DECLARE changed_count integer;
BEGIN
  SELECT count(*) INTO changed_count
  FROM public.buildings b
  WHERE b.id = 'e3a966b9-e9d3-4389-97db-a8e4b07f4cad'::uuid
    AND b.slug = 'unite-habitation'
    AND b.era_slug = 'modern'
    AND b.official_url = 'https://www.fondationlecorbusier.fr/en/work-architecture/achievements-unite-dhabitation-marseille-france-1945-1952/'
    AND b.description ?& array['zh','en','ja']
    AND b.significance ?& array['zh','en','ja'];
  IF changed_count <> 1 THEN
    RAISE EXCEPTION 'unite habitation era postcondition failed: expected 1, found %', changed_count;
  END IF;
END $$;
