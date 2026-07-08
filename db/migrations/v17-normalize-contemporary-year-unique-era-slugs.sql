-- ============================================================
-- V17: Normalize contemporary year-unique building era metadata
-- Source: docs/archive/data-governance/ERA_SLUG_CONTEMPORARY_YEAR_UNIQUE_WRITE_REPORT.md
-- Scope: 119 reviewed contemporary year-unique records.
-- Idempotent: updates only rows where buildings.era_slug IS NULL and
-- inserts building_eras rows with ON CONFLICT DO NOTHING.
-- ============================================================

BEGIN;

CREATE TEMP TABLE era_slug_contemporary_year_unique_decisions (
  slug text PRIMARY KEY,
  era_slug text NOT NULL,
  decision_source text NOT NULL,
  reason text NOT NULL
) ON COMMIT DROP;

INSERT INTO era_slug_contemporary_year_unique_decisions (slug, era_slug, decision_source, reason) VALUES
  ('bellevue-arts-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2001 fits exactly one current era range: contemporary'),
  ('ishikawa-ongakudo', 'contemporary', 'contemporary-year-unique', 'year_start 2001 fits exactly one current era range: contemporary'),
  ('sendai-mediatheque', 'contemporary', 'contemporary-year-unique', 'year_start 2001 fits exactly one current era range: contemporary'),
  ('skylight', 'contemporary', 'contemporary-year-unique', 'year_start 2001 fits exactly one current era range: contemporary'),
  ('tower-of-siza', 'contemporary', 'contemporary-year-unique', 'year_start 2001 fits exactly one current era range: contemporary'),
  ('zenith-de-rouen', 'contemporary', 'contemporary-year-unique', 'year_start 2001 fits exactly one current era range: contemporary'),
  ('cathedral-of-our-lady-of', 'contemporary', 'contemporary-year-unique', 'year_start 2002 fits exactly one current era range: contemporary'),
  ('ciutat-de-la-justicia-de', 'contemporary', 'contemporary-year-unique', 'year_start 2002 fits exactly one current era range: contemporary'),
  ('french-embassy-building', 'contemporary', 'contemporary-year-unique', 'year_start 2002 fits exactly one current era range: contemporary'),
  ('hochhaus-neue-donau', 'contemporary', 'contemporary-year-unique', 'year_start 2002 fits exactly one current era range: contemporary'),
  ('oscar-niemeyer-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2002 fits exactly one current era range: contemporary'),
  ('teatro-degli-arcimboldi', 'contemporary', 'contemporary-year-unique', 'year_start 2002 fits exactly one current era range: contemporary'),
  ('estadio-municipal-de-braga', 'contemporary', 'contemporary-year-unique', 'year_start 2003 fits exactly one current era range: contemporary'),
  ('loceanografic', 'contemporary', 'contemporary-year-unique', 'year_start 2003 fits exactly one current era range: contemporary'),
  ('nittele-tower', 'contemporary', 'contemporary-year-unique', 'year_start 2003 fits exactly one current era range: contemporary'),
  ('the-gherkin', 'contemporary', 'contemporary-year-unique', 'year_start 2003 fits exactly one current era range: contemporary'),
  ('toki-messe', 'contemporary', 'contemporary-year-unique', 'year_start 2003 fits exactly one current era range: contemporary'),
  ('valladolid-science-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2003 fits exactly one current era range: contemporary'),
  ('walt-disney-concert-hall', 'contemporary', 'contemporary-year-unique', 'year_start 2003 fits exactly one current era range: contemporary'),
  ('chiesa-del-santo-volto', 'contemporary', 'contemporary-year-unique', 'year_start 2004 fits exactly one current era range: contemporary'),
  ('footbridge-of-the-science-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2004 fits exactly one current era range: contemporary'),
  ('kanazawa-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2004 fits exactly one current era range: contemporary'),
  ('millau-viaduct', 'contemporary', 'contemporary-year-unique', 'year_start 2004 fits exactly one current era range: contemporary'),
  ('naoshima-chichu-art-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2004 fits exactly one current era range: contemporary'),
  ('seattle-central-library', 'contemporary', 'contemporary-year-unique', 'year_start 2004 fits exactly one current era range: contemporary'),
  ('bank-of-shanghai-headquarters', 'contemporary', 'contemporary-year-unique', 'year_start 2005 fits exactly one current era range: contemporary'),
  ('casa-da-musica', 'contemporary', 'contemporary-year-unique', 'year_start 2005 fits exactly one current era range: contemporary'),
  ('memorial-to-the-murdered-jews', 'contemporary', 'contemporary-year-unique', 'year_start 2005 fits exactly one current era range: contemporary'),
  ('meti-handmade-school', 'contemporary', 'contemporary-year-unique', 'year_start 2005 fits exactly one current era range: contemporary'),
  ('riparian-plaza', 'contemporary', 'contemporary-year-unique', 'year_start 2005 fits exactly one current era range: contemporary'),
  ('verona-203a', 'contemporary', 'contemporary-year-unique', 'year_start 2005 fits exactly one current era range: contemporary'),
  ('americas-cup-building', 'contemporary', 'contemporary-year-unique', 'year_start 2006 fits exactly one current era range: contemporary'),
  ('de-citadel', 'contemporary', 'contemporary-year-unique', 'year_start 2006 fits exactly one current era range: contemporary'),
  ('hyatt-regency-barcelona-tower', 'contemporary', 'contemporary-year-unique', 'year_start 2006 fits exactly one current era range: contemporary'),
  ('museum-of-modern-literature', 'contemporary', 'contemporary-year-unique', 'year_start 2006 fits exactly one current era range: contemporary'),
  ('toulouse-school-of-economics', 'contemporary', 'contemporary-year-unique', 'year_start 2006 fits exactly one current era range: contemporary'),
  ('blue-condominium', 'contemporary', 'contemporary-year-unique', 'year_start 2007 fits exactly one current era range: contemporary'),
  ('bruder-klaus-chapel', 'contemporary', 'contemporary-year-unique', 'year_start 2007 fits exactly one current era range: contemporary'),
  ('campus-palmas-altas-sevilla', 'contemporary', 'contemporary-year-unique', 'year_start 2007 fits exactly one current era range: contemporary'),
  ('extension-of-museo-del-prado', 'contemporary', 'contemporary-year-unique', 'year_start 2007 fits exactly one current era range: contemporary'),
  ('kolumba-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2007 fits exactly one current era range: contemporary'),
  ('national-art-center-tokyo', 'contemporary', 'contemporary-year-unique', 'year_start 2007 fits exactly one current era range: contemporary'),
  ('new-museum-nyc', 'contemporary', 'contemporary-year-unique', 'year_start 2007 fits exactly one current era range: contemporary'),
  ('rena-lange-headquarters', 'contemporary', 'contemporary-year-unique', 'year_start 2007 fits exactly one current era range: contemporary'),
  ('shimane-museum-of-ancient-izumo', 'contemporary', 'contemporary-year-unique', 'year_start 2007 fits exactly one current era range: contemporary'),
  ('yokosuka-museum-of-art', 'contemporary', 'contemporary-year-unique', 'year_start 2007 fits exactly one current era range: contemporary'),
  ('zenith-limoges-metropole', 'contemporary', 'contemporary-year-unique', 'year_start 2007 fits exactly one current era range: contemporary'),
  ('beijing-national-stadium', 'contemporary', 'contemporary-year-unique', 'year_start 2008 fits exactly one current era range: contemporary'),
  ('museo-del-teatro-romano-de', 'contemporary', 'contemporary-year-unique', 'year_start 2008 fits exactly one current era range: contemporary'),
  ('ningbo-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2008 fits exactly one current era range: contemporary'),
  ('tour-granite', 'contemporary', 'contemporary-year-unique', 'year_start 2008 fits exactly one current era range: contemporary'),
  ('acropolis-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2009 fits exactly one current era range: contemporary'),
  ('ceremonial-palace-of-georgia', 'contemporary', 'contemporary-year-unique', 'year_start 2009 fits exactly one current era range: contemporary'),
  ('horizontal-skyscraper-vanke-center', 'contemporary', 'contemporary-year-unique', 'year_start 2009 fits exactly one current era range: contemporary'),
  ('linked-hybrid', 'contemporary', 'contemporary-year-unique', 'year_start 2009 fits exactly one current era range: contemporary'),
  ('musee-herge', 'contemporary', 'contemporary-year-unique', 'year_start 2009 fits exactly one current era range: contemporary'),
  ('8-house', 'contemporary', 'contemporary-year-unique', 'year_start 2010 fits exactly one current era range: contemporary'),
  ('guangzhou-opera-house', 'contemporary', 'contemporary-year-unique', 'year_start 2010 fits exactly one current era range: contemporary'),
  ('musashino-art-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2010 fits exactly one current era range: contemporary'),
  ('paraninfo-de-la-universidad-del', 'contemporary', 'contemporary-year-unique', 'year_start 2010 fits exactly one current era range: contemporary'),
  ('pompidou-metz', 'contemporary', 'contemporary-year-unique', 'year_start 2010 fits exactly one current era range: contemporary'),
  ('rolex-learning-center', 'contemporary', 'contemporary-year-unique', 'year_start 2010 fits exactly one current era range: contemporary'),
  ('vitra-haus', 'contemporary', 'contemporary-year-unique', 'year_start 2010 fits exactly one current era range: contemporary'),
  ('arenas-de-barcelona', 'contemporary', 'contemporary-year-unique', 'year_start 2011 fits exactly one current era range: contemporary'),
  ('cite-de-locean-et-du', 'contemporary', 'contemporary-year-unique', 'year_start 2011 fits exactly one current era range: contemporary'),
  ('house-na', 'contemporary', 'contemporary-year-unique', 'year_start 2011 fits exactly one current era range: contemporary'),
  ('asakusa-culture-center', 'contemporary', 'contemporary-year-unique', 'year_start 2012 fits exactly one current era range: contemporary'),
  ('campbell-sports-center', 'contemporary', 'contemporary-year-unique', 'year_start 2012 fits exactly one current era range: contemporary'),
  ('cctv-headquarters', 'contemporary', 'contemporary-year-unique', 'year_start 2012 fits exactly one current era range: contemporary'),
  ('central-library-des-moines', 'contemporary', 'contemporary-year-unique', 'year_start 2012 fits exactly one current era range: contemporary'),
  ('cidade-das-artes-bibi-ferreira', 'contemporary', 'contemporary-year-unique', 'year_start 2012 fits exactly one current era range: contemporary'),
  ('daeyang-gallery-and-house', 'contemporary', 'contemporary-year-unique', 'year_start 2012 fits exactly one current era range: contemporary'),
  ('heydar-aliyev-center', 'contemporary', 'contemporary-year-unique', 'year_start 2012 fits exactly one current era range: contemporary'),
  ('louvre-lens', 'contemporary', 'contemporary-year-unique', 'year_start 2012 fits exactly one current era range: contemporary'),
  ('shard', 'contemporary', 'contemporary-year-unique', 'year_start 2012 fits exactly one current era range: contemporary'),
  ('atelier-museu-julio-pomar', 'contemporary', 'contemporary-year-unique', 'year_start 2013 fits exactly one current era range: contemporary'),
  ('cardboard-cathedral', 'contemporary', 'contemporary-year-unique', 'year_start 2013 fits exactly one current era range: contemporary'),
  ('coleccion-jumex', 'contemporary', 'contemporary-year-unique', 'year_start 2013 fits exactly one current era range: contemporary'),
  ('coliseu-de-viana-do-castelo', 'contemporary', 'contemporary-year-unique', 'year_start 2013 fits exactly one current era range: contemporary'),
  ('discovery-primea', 'contemporary', 'contemporary-year-unique', 'year_start 2013 fits exactly one current era range: contemporary'),
  ('paris-la-defense-arena', 'contemporary', 'contemporary-year-unique', 'year_start 2013 fits exactly one current era range: contemporary'),
  ('serpentine-pavilion-2013', 'contemporary', 'contemporary-year-unique', 'year_start 2013 fits exactly one current era range: contemporary'),
  ('122-leadenhall-street', 'contemporary', 'contemporary-year-unique', 'year_start 2014 fits exactly one current era range: contemporary'),
  ('aga-khan-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2014 fits exactly one current era range: contemporary'),
  ('aspen-art-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2014 fits exactly one current era range: contemporary'),
  ('center-of-innovation-anacleto-angelini', 'contemporary', 'contemporary-year-unique', 'year_start 2014 fits exactly one current era range: contemporary'),
  ('dongdaemun-design-plaza', 'contemporary', 'contemporary-year-unique', 'year_start 2014 fits exactly one current era range: contemporary'),
  ('louis-vuitton-fondation', 'contemporary', 'contemporary-year-unique', 'year_start 2014 fits exactly one current era range: contemporary'),
  ('one57', 'contemporary', 'contemporary-year-unique', 'year_start 2014 fits exactly one current era range: contemporary'),
  ('gckeyaki-terrace', 'contemporary', 'contemporary-year-unique', 'year_start 2015 fits exactly one current era range: contemporary'),
  ('ibm-studios', 'contemporary', 'contemporary-year-unique', 'year_start 2015 fits exactly one current era range: contemporary'),
  ('philharmonie-de-paris', 'contemporary', 'contemporary-year-unique', 'year_start 2015 fits exactly one current era range: contemporary'),
  ('utec-campus', 'contemporary', 'contemporary-year-unique', 'year_start 2015 fits exactly one current era range: contemporary'),
  ('whitney-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2015 fits exactly one current era range: contemporary'),
  ('international-towers-sydney', 'contemporary', 'contemporary-year-unique', 'year_start 2016 fits exactly one current era range: contemporary'),
  ('museu-de-arte-contemporanea-nadir', 'contemporary', 'contemporary-year-unique', 'year_start 2016 fits exactly one current era range: contemporary'),
  ('taichung-metropolitan-opera', 'contemporary', 'contemporary-year-unique', 'year_start 2016 fits exactly one current era range: contemporary'),
  ('via-57-west', 'contemporary', 'contemporary-year-unique', 'year_start 2016 fits exactly one current era range: contemporary'),
  ('amorepacific-headquarters', 'contemporary', 'contemporary-year-unique', 'year_start 2017 fits exactly one current era range: contemporary'),
  ('apple-park', 'contemporary', 'contemporary-year-unique', 'year_start 2017 fits exactly one current era range: contemporary'),
  ('hamburg-elbphilharmonie', 'contemporary', 'contemporary-year-unique', 'year_start 2017 fits exactly one current era range: contemporary'),
  ('lego-house', 'contemporary', 'contemporary-year-unique', 'year_start 2017 fits exactly one current era range: contemporary'),
  ('mt-fuji-center', 'contemporary', 'contemporary-year-unique', 'year_start 2017 fits exactly one current era range: contemporary'),
  ('3-world-trade-center', 'contemporary', 'contemporary-year-unique', 'year_start 2018 fits exactly one current era range: contemporary'),
  ('institute-for-contemporary-art-richmond', 'contemporary', 'contemporary-year-unique', 'year_start 2018 fits exactly one current era range: contemporary'),
  ('v-and-a-dundee', 'contemporary', 'contemporary-year-unique', 'year_start 2018 fits exactly one current era range: contemporary'),
  ('beijing-daxing-airport', 'contemporary', 'contemporary-year-unique', 'year_start 2019 fits exactly one current era range: contemporary'),
  ('copenhill', 'contemporary', 'contemporary-year-unique', 'year_start 2019 fits exactly one current era range: contemporary'),
  ('james-simon-gallery', 'contemporary', 'contemporary-year-unique', 'year_start 2019 fits exactly one current era range: contemporary'),
  ('l-arbre-blanc', 'contemporary', 'contemporary-year-unique', 'year_start 2019 fits exactly one current era range: contemporary'),
  ('national-stadium-tokyo', 'contemporary', 'contemporary-year-unique', 'year_start 2019 fits exactly one current era range: contemporary'),
  ('new-national-stadium', 'contemporary', 'contemporary-year-unique', 'year_start 2019 fits exactly one current era range: contemporary'),
  ('one-monte-carlo', 'contemporary', 'contemporary-year-unique', 'year_start 2019 fits exactly one current era range: contemporary'),
  ('torres-atrio', 'contemporary', 'contemporary-year-unique', 'year_start 2019 fits exactly one current era range: contemporary'),
  ('parc1', 'contemporary', 'contemporary-year-unique', 'year_start 2020 fits exactly one current era range: contemporary'),
  ('marsk-tower', 'contemporary', 'contemporary-year-unique', 'year_start 2021 fits exactly one current era range: contemporary'),
  ('tour-eria', 'contemporary', 'contemporary-year-unique', 'year_start 2021 fits exactly one current era range: contemporary'),
  ('reinhard-ernst-museum', 'contemporary', 'contemporary-year-unique', 'year_start 2024 fits exactly one current era range: contemporary'),
  ('tours-sisters', 'contemporary', 'contemporary-year-unique', 'year_start 2025 fits exactly one current era range: contemporary');

DO $$
DECLARE
  expected_count integer := 119;
  writable_count integer;
  known_era_count integer;
BEGIN
  SELECT count(*) INTO writable_count
  FROM public.buildings AS building
  JOIN era_slug_contemporary_year_unique_decisions AS decision ON decision.slug = building.slug
  WHERE building.era_slug IS NULL;

  IF writable_count <> expected_count THEN
    RAISE EXCEPTION 'Expected % writable contemporary year-unique era rows, found %', expected_count, writable_count;
  END IF;

  SELECT count(*) INTO known_era_count
  FROM era_slug_contemporary_year_unique_decisions AS decision
  JOIN public.eras AS era ON era.slug = decision.era_slug;

  IF known_era_count <> expected_count THEN
    RAISE EXCEPTION 'Expected % known era slugs, found %', expected_count, known_era_count;
  END IF;
END $$;

UPDATE public.buildings AS building
SET
  era_slug = decision.era_slug,
  updated_at = now()
FROM era_slug_contemporary_year_unique_decisions AS decision
WHERE building.slug = decision.slug
  AND building.era_slug IS NULL;

INSERT INTO public.building_eras (building_id, era_slug)
SELECT building.id, decision.era_slug
FROM public.buildings AS building
JOIN era_slug_contemporary_year_unique_decisions AS decision ON decision.slug = building.slug
JOIN public.eras AS era ON era.slug = decision.era_slug
ON CONFLICT (building_id, era_slug) DO NOTHING;

COMMIT;
