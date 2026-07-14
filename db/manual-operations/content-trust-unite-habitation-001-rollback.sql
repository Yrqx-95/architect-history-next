DO $$
DECLARE matched_count integer;
BEGIN
  SELECT count(*) INTO matched_count
  FROM public.buildings
  WHERE slug = 'unite-habitation'
    AND official_url = 'https://www.fondationlecorbusier.fr/en/work-architecture/achievements-unite-dhabitation-marseille-france-1945-1952/'
    AND description ?& array['zh','en','ja']
    AND significance ?& array['zh','en','ja'];
  IF matched_count <> 1 THEN
    RAISE EXCEPTION 'rollback precondition failed: expected 1, found %', matched_count;
  END IF;
END $$;

UPDATE public.buildings
SET official_url = NULL,
    description = NULL,
    significance = jsonb_build_object('en', '柯布"垂直城市"理念的实体化——337户公寓+商业街+屋顶花园一体化的居住机器'),
    updated_at = '2026-05-23T11:39:25.939222+00:00'::timestamptz
WHERE slug = 'unite-habitation';
