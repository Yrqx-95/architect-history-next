-- ============================================================
-- V16: Normalize Year Unique A building era metadata
-- Source: docs/archive/data-governance/ERA_SLUG_YEAR_UNIQUE_A_WRITE_REPORT.md
-- Scope: 170 reviewed pre-1980 year-unique records.
-- Idempotent: updates only rows where buildings.era_slug IS NULL and
-- inserts building_eras rows with ON CONFLICT DO NOTHING.
-- ============================================================

BEGIN;

CREATE TEMP TABLE era_slug_year_unique_a_decisions (
  slug text PRIMARY KEY,
  era_slug text NOT NULL,
  decision_source text NOT NULL,
  reason text NOT NULL
) ON COMMIT DROP;

INSERT INTO era_slug_year_unique_a_decisions (slug, era_slug, decision_source, reason) VALUES
  ('palazzo-abatellis', 'renaissance', 'year-unique-a', 'year_start 1495 fits exactly one current era range: renaissance'),
  ('santantonio-abate-parish-church', 'renaissance', 'year-unique-a', 'year_start 1502 fits exactly one current era range: renaissance'),
  ('palacio-pascual-de-riquelme', 'neoclassical', 'year-unique-a', 'year_start 1800 fits exactly one current era range: neoclassical'),
  ('palace-of-villahermosa', 'neoclassical', 'year-unique-a', 'year_start 1805 fits exactly one current era range: neoclassical'),
  ('gipsoteca-canoviana', 'neoclassical', 'year-unique-a', 'year_start 1832 fits exactly one current era range: neoclassical'),
  ('pylkonmaki-church', 'industrial-revolution', 'year-unique-a', 'year_start 1860 fits exactly one current era range: industrial-revolution'),
  ('saint-louis-art-museum', 'industrial-revolution', 'year-unique-a', 'year_start 1879 fits exactly one current era range: industrial-revolution'),
  ('minneapolis-institute-of-art', 'industrial-revolution', 'year-unique-a', 'year_start 1883 fits exactly one current era range: industrial-revolution'),
  ('auditorium-building', 'industrial-revolution', 'year-unique-a', 'year_start 1889 fits exactly one current era range: industrial-revolution'),
  ('fagus-factory', 'early-modern', 'year-unique-a', 'year_start 1911 fits exactly one current era range: early-modern'),
  ('cleveland-museum-of-art', 'early-modern', 'year-unique-a', 'year_start 1913 fits exactly one current era range: early-modern'),
  ('mendelsohn-house', 'early-modern', 'year-unique-a', 'year_start 1913 fits exactly one current era range: early-modern'),
  ('einstein-tower', 'early-modern', 'year-unique-a', 'year_start 1920 fits exactly one current era range: early-modern'),
  ('landhaus-bejach', 'early-modern', 'year-unique-a', 'year_start 1920 fits exactly one current era range: early-modern'),
  ('mendelsohn-housing-scheme-luckenwalde', 'early-modern', 'year-unique-a', 'year_start 1920 fits exactly one current era range: early-modern'),
  ('saitama-museum-of-natural-history', 'early-modern', 'year-unique-a', 'year_start 1921 fits exactly one current era range: early-modern'),
  ('plaza-de-toros-de-pamplona', 'early-modern', 'year-unique-a', 'year_start 1922 fits exactly one current era range: early-modern'),
  ('jyvaskyla-workers-club', 'early-modern', 'year-unique-a', 'year_start 1925 fits exactly one current era range: early-modern'),
  ('red-banner-textile-factory', 'early-modern', 'year-unique-a', 'year_start 1925 fits exactly one current era range: early-modern'),
  ('bauhaus-dessau', 'early-modern', 'year-unique-a', 'year_start 1926 fits exactly one current era range: early-modern'),
  ('tokyo-metropolitan-art-museum', 'early-modern', 'year-unique-a', 'year_start 1926 fits exactly one current era range: early-modern'),
  ('friedhof-der-synagogengemeinde-konigsberg', 'early-modern', 'year-unique-a', 'year_start 1927 fits exactly one current era range: early-modern'),
  ('maison-de-verre', 'early-modern', 'year-unique-a', 'year_start 1928 fits exactly one current era range: early-modern'),
  ('southwestern-finland-agricultural-cooperative-building', 'early-modern', 'year-unique-a', 'year_start 1928 fits exactly one current era range: early-modern'),
  ('standard-rental-house-by-alvar', 'early-modern', 'year-unique-a', 'year_start 1928 fits exactly one current era range: early-modern'),
  ('barcelona-pavilion', 'early-modern', 'year-unique-a', 'year_start 1929 fits exactly one current era range: early-modern'),
  ('muurame-church', 'early-modern', 'year-unique-a', 'year_start 1929 fits exactly one current era range: early-modern'),
  ('parroquia-maronita-de-nuestra-senora', 'early-modern', 'year-unique-a', 'year_start 1929 fits exactly one current era range: early-modern'),
  ('valtiontalo', 'early-modern', 'year-unique-a', 'year_start 1929 fits exactly one current era range: early-modern'),
  ('arne-jacobsen-s-own-house', 'modern', 'year-unique-a', 'year_start 1931 fits exactly one current era range: modern'),
  ('villa-savoye', 'modern', 'year-unique-a', 'year_start 1931 fits exactly one current era range: modern'),
  ('columbushaus', 'modern', 'year-unique-a', 'year_start 1932 fits exactly one current era range: modern'),
  ('neutra-vdl-studio-and-residences', 'modern', 'year-unique-a', 'year_start 1932 fits exactly one current era range: modern'),
  ('palazzo-terragni', 'modern', 'year-unique-a', 'year_start 1932 fits exactly one current era range: modern'),
  ('villa-tammekann', 'modern', 'year-unique-a', 'year_start 1932 fits exactly one current era range: modern'),
  ('paimio-sanatorium', 'modern', 'year-unique-a', 'year_start 1933 fits exactly one current era range: modern'),
  ('the-nelson-atkins-museum-of-art', 'modern', 'year-unique-a', 'year_start 1933 fits exactly one current era range: modern'),
  ('asilo-santelia', 'modern', 'year-unique-a', 'year_start 1934 fits exactly one current era range: modern'),
  ('bellavista-housing-estate', 'modern', 'year-unique-a', 'year_start 1934 fits exactly one current era range: modern'),
  ('de-la-warr-pavilion', 'modern', 'year-unique-a', 'year_start 1935 fits exactly one current era range: modern'),
  ('parque-revolucion', 'modern', 'year-unique-a', 'year_start 1935 fits exactly one current era range: modern'),
  ('salman-schocken-house', 'modern', 'year-unique-a', 'year_start 1935 fits exactly one current era range: modern'),
  ('schocken-library', 'modern', 'year-unique-a', 'year_start 1935 fits exactly one current era range: modern'),
  ('villa-aalto', 'modern', 'year-unique-a', 'year_start 1935 fits exactly one current era range: modern'),
  ('vyborg-library', 'modern', 'year-unique-a', 'year_start 1935 fits exactly one current era range: modern'),
  ('bellevue-teatret', 'modern', 'year-unique-a', 'year_start 1936 fits exactly one current era range: modern'),
  ('cohen-house', 'modern', 'year-unique-a', 'year_start 1936 fits exactly one current era range: modern'),
  ('skovshoved-petrol-station', 'modern', 'year-unique-a', 'year_start 1936 fits exactly one current era range: modern'),
  ('bank-leumi-building-jerusalem', 'modern', 'year-unique-a', 'year_start 1937 fits exactly one current era range: modern'),
  ('gilbey-house', 'modern', 'year-unique-a', 'year_start 1937 fits exactly one current era range: modern'),
  ('stelling-house', 'modern', 'year-unique-a', 'year_start 1937 fits exactly one current era range: modern'),
  ('taliesin-west', 'modern', 'year-unique-a', 'year_start 1937 fits exactly one current era range: modern'),
  ('tehtaanmaki', 'modern', 'year-unique-a', 'year_start 1937 fits exactly one current era range: modern'),
  ('villa-of-floriculturist', 'modern', 'year-unique-a', 'year_start 1937 fits exactly one current era range: modern'),
  ('weizmann-house', 'modern', 'year-unique-a', 'year_start 1937 fits exactly one current era range: modern'),
  ('gropius-house', 'modern', 'year-unique-a', 'year_start 1938 fits exactly one current era range: modern'),
  ('hadassah-university-hospital-mt-scopus', 'modern', 'year-unique-a', 'year_start 1938 fits exactly one current era range: modern'),
  ('terassitalo', 'modern', 'year-unique-a', 'year_start 1938 fits exactly one current era range: modern'),
  ('fallingwater', 'modern', 'year-unique-a', 'year_start 1939 fits exactly one current era range: modern'),
  ('villa-mairea', 'modern', 'year-unique-a', 'year_start 1939 fits exactly one current era range: modern'),
  ('henry-chamberlain-house', 'modern', 'year-unique-a', 'year_start 1940 fits exactly one current era range: modern'),
  ('the-alan-i-w-frank', 'modern', 'year-unique-a', 'year_start 1940 fits exactly one current era range: modern'),
  ('aarhus-city-hall', 'modern', 'year-unique-a', 'year_start 1941 fits exactly one current era range: modern'),
  ('kishi-memorial-gymnasium', 'modern', 'year-unique-a', 'year_start 1941 fits exactly one current era range: modern'),
  ('kunio-maekawa-house', 'modern', 'year-unique-a', 'year_start 1942 fits exactly one current era range: modern'),
  ('rudersdal-town-hall', 'modern', 'year-unique-a', 'year_start 1942 fits exactly one current era range: modern'),
  ('abele-residence', 'modern', 'year-unique-a', 'year_start 1943 fits exactly one current era range: modern'),
  ('chiesa-di-nostra-signora-del', 'post-war', 'year-unique-a', 'year_start 1961 fits exactly one current era range: post-war'),
  ('hayashibara-museum-of-art', 'post-war', 'year-unique-a', 'year_start 1961 fits exactly one current era range: post-war'),
  ('milam-residence', 'post-war', 'year-unique-a', 'year_start 1961 fits exactly one current era range: post-war'),
  ('palos-verdes-high-school', 'post-war', 'year-unique-a', 'year_start 1961 fits exactly one current era range: post-war'),
  ('tokyo-bunka-kaikan', 'post-war', 'year-unique-a', 'year_start 1961 fits exactly one current era range: post-war'),
  ('aalto-hochhaus', 'post-war', 'year-unique-a', 'year_start 1962 fits exactly one current era range: post-war'),
  ('cyclorama-building', 'post-war', 'year-unique-a', 'year_start 1962 fits exactly one current era range: post-war'),
  ('dulles-airport', 'post-war', 'year-unique-a', 'year_start 1962 fits exactly one current era range: post-war'),
  ('garcia-house', 'post-war', 'year-unique-a', 'year_start 1962 fits exactly one current era range: post-war'),
  ('los-angeles-county-hall-of', 'post-war', 'year-unique-a', 'year_start 1962 fits exactly one current era range: post-war'),
  ('the-marnix', 'post-war', 'year-unique-a', 'year_start 1962 fits exactly one current era range: post-war'),
  ('tour-telus', 'post-war', 'year-unique-a', 'year_start 1962 fits exactly one current era range: post-war'),
  ('twa-terminal', 'post-war', 'year-unique-a', 'year_start 1962 fits exactly one current era range: post-war'),
  ('beinecke-rare-book-manuscript-library', 'post-war', 'year-unique-a', 'year_start 1963 fits exactly one current era range: post-war'),
  ('chusanren-building-main-building', 'post-war', 'year-unique-a', 'year_start 1963 fits exactly one current era range: post-war'),
  ('fredensborg-houses', 'post-war', 'year-unique-a', 'year_start 1963 fits exactly one current era range: post-war'),
  ('national-museum-of-modern-art', 'post-war', 'year-unique-a', 'year_start 1963 fits exactly one current era range: post-war'),
  ('our-lady-of-the-annunciation', 'post-war', 'year-unique-a', 'year_start 1963 fits exactly one current era range: post-war'),
  ('casa-do-chame-chame', 'post-war', 'year-unique-a', 'year_start 1964 fits exactly one current era range: post-war'),
  ('flame-of-peace', 'post-war', 'year-unique-a', 'year_start 1964 fits exactly one current era range: post-war'),
  ('helsinki-university-of-technology-main', 'post-war', 'year-unique-a', 'year_start 1964 fits exactly one current era range: post-war'),
  ('hirosaki-civic-hall', 'post-war', 'year-unique-a', 'year_start 1964 fits exactly one current era range: post-war'),
  ('komazawa-gymnasium', 'post-war', 'year-unique-a', 'year_start 1964 fits exactly one current era range: post-war'),
  ('st-marys-cathedral', 'post-war', 'year-unique-a', 'year_start 1964 fits exactly one current era range: post-war'),
  ('yoyogi-national-gymnasium', 'post-war', 'year-unique-a', 'year_start 1964 fits exactly one current era range: post-war'),
  ('190-192-sloane-street', 'post-war', 'year-unique-a', 'year_start 1965 fits exactly one current era range: post-war'),
  ('gateway-arch', 'post-war', 'year-unique-a', 'year_start 1965 fits exactly one current era range: post-war'),
  ('hill-museum-manuscript-library', 'post-war', 'year-unique-a', 'year_start 1965 fits exactly one current era range: post-war'),
  ('new-york-public-library-for', 'post-war', 'year-unique-a', 'year_start 1965 fits exactly one current era range: post-war'),
  ('painted-desert-community-complex-historic', 'post-war', 'year-unique-a', 'year_start 1965 fits exactly one current era range: post-war'),
  ('salk-institute', 'post-war', 'year-unique-a', 'year_start 1965 fits exactly one current era range: post-war'),
  ('warren-mcguirk-alumni-stadium', 'post-war', 'year-unique-a', 'year_start 1965 fits exactly one current era range: post-war'),
  ('945-madison-avenue', 'post-war', 'year-unique-a', 'year_start 1966 fits exactly one current era range: post-war'),
  ('copan-building', 'post-war', 'year-unique-a', 'year_start 1966 fits exactly one current era range: post-war'),
  ('forum-castrop-rauxel', 'post-war', 'year-unique-a', 'year_start 1966 fits exactly one current era range: post-war'),
  ('saitama-hall', 'post-war', 'year-unique-a', 'year_start 1966 fits exactly one current era range: post-war'),
  ('shinjuku-station-west-concourse', 'post-war', 'year-unique-a', 'year_start 1966 fits exactly one current era range: post-war'),
  ('sony-building', 'post-war', 'year-unique-a', 'year_start 1966 fits exactly one current era range: post-war'),
  ('tidal-pools-of-leca-de', 'post-war', 'year-unique-a', 'year_start 1966 fits exactly one current era range: post-war'),
  ('yamanashi-broadcasting-and-press-centre', 'post-war', 'year-unique-a', 'year_start 1966 fits exactly one current era range: post-war'),
  ('church-of-nuestra-senora-de', 'post-war', 'year-unique-a', 'year_start 1967 fits exactly one current era range: post-war'),
  ('montreal-biosphere', 'post-war', 'year-unique-a', 'year_start 1967 fits exactly one current era range: post-war'),
  ('orange-county-government-center', 'post-war', 'year-unique-a', 'year_start 1967 fits exactly one current era range: post-war'),
  ('shizuoka-press-and-broadcasting-center', 'post-war', 'year-unique-a', 'year_start 1967 fits exactly one current era range: post-war'),
  ('cuadra-san-cristobal', 'post-war', 'year-unique-a', 'year_start 1968 fits exactly one current era range: post-war'),
  ('elrod-house', 'post-war', 'year-unique-a', 'year_start 1968 fits exactly one current era range: post-war'),
  ('japanese-sword-museum', 'post-war', 'year-unique-a', 'year_start 1968 fits exactly one current era range: post-war'),
  ('national-gallery-berlin', 'post-war', 'year-unique-a', 'year_start 1968 fits exactly one current era range: post-war'),
  ('nordic-house', 'post-war', 'year-unique-a', 'year_start 1968 fits exactly one current era range: post-war'),
  ('palacio-de-los-deportes', 'post-war', 'year-unique-a', 'year_start 1968 fits exactly one current era range: post-war'),
  ('robert-c-weaver-federal-building', 'post-war', 'year-unique-a', 'year_start 1968 fits exactly one current era range: post-war'),
  ('stephanuskirche-wolfsburg', 'post-war', 'year-unique-a', 'year_start 1968 fits exactly one current era range: post-war'),
  ('arne-jacobsen-bau-in-mainz-hartenberg-munchfeld', 'post-war', 'year-unique-a', 'year_start 1969 fits exactly one current era range: post-war'),
  ('burroughs-wellcome-company-corporate-headquarters', 'post-war', 'year-unique-a', 'year_start 1969 fits exactly one current era range: post-war'),
  ('kirjatalo', 'post-war', 'year-unique-a', 'year_start 1969 fits exactly one current era range: post-war'),
  ('picker-art-gallery', 'post-war', 'year-unique-a', 'year_start 1969 fits exactly one current era range: post-war'),
  ('uberseering-12', 'post-war', 'year-unique-a', 'year_start 1969 fits exactly one current era range: post-war'),
  ('big-roof', 'post-war', 'year-unique-a', 'year_start 1970 fits exactly one current era range: post-war'),
  ('brasilia-cathedral', 'post-war', 'year-unique-a', 'year_start 1970 fits exactly one current era range: post-war'),
  ('hotel-marcel', 'post-war', 'year-unique-a', 'year_start 1970 fits exactly one current era range: post-war'),
  ('murray-d-lincoln-campus-center', 'post-war', 'year-unique-a', 'year_start 1970 fits exactly one current era range: post-war'),
  ('r-dovre-library', 'post-war', 'year-unique-a', 'year_start 1970 fits exactly one current era range: post-war'),
  ('can-lis', 'post-war', 'year-unique-a', 'year_start 1971 fits exactly one current era range: post-war'),
  ('finlandia-hall', 'post-war', 'year-unique-a', 'year_start 1971 fits exactly one current era range: post-war'),
  ('lyndon-baines-johnson-library-and', 'post-war', 'year-unique-a', 'year_start 1971 fits exactly one current era range: post-war'),
  ('miyazaki-prefectural-museum-of-nature', 'post-war', 'year-unique-a', 'year_start 1971 fits exactly one current era range: post-war'),
  ('saitama-prefectural-museum-of-history', 'post-war', 'year-unique-a', 'year_start 1971 fits exactly one current era range: post-war'),
  ('carlton-hotel', 'post-war', 'year-unique-a', 'year_start 1972 fits exactly one current era range: post-war'),
  ('kimbell-art-museum', 'post-war', 'year-unique-a', 'year_start 1972 fits exactly one current era range: post-war'),
  ('kunsten-museum-of-modern-art', 'post-war', 'year-unique-a', 'year_start 1972 fits exactly one current era range: post-war'),
  ('louis-micheels-house', 'post-war', 'year-unique-a', 'year_start 1972 fits exactly one current era range: post-war'),
  ('nakagin-capsule-tower', 'post-war', 'year-unique-a', 'year_start 1972 fits exactly one current era range: post-war'),
  ('sahkotalo', 'post-war', 'year-unique-a', 'year_start 1972 fits exactly one current era range: post-war'),
  ('united-nations-university', 'post-war', 'year-unique-a', 'year_start 1972 fits exactly one current era range: post-war'),
  ('alvar-aalto-museum-jyvaskyla', 'post-war', 'year-unique-a', 'year_start 1973 fits exactly one current era range: post-war'),
  ('bianchi-house', 'post-war', 'year-unique-a', 'year_start 1973 fits exactly one current era range: post-war'),
  ('chapelle-cumenique-de-flaine', 'post-war', 'year-unique-a', 'year_start 1973 fits exactly one current era range: post-war'),
  ('edificio-urumea', 'post-war', 'year-unique-a', 'year_start 1973 fits exactly one current era range: post-war'),
  ('sydney-opera-house', 'post-war', 'year-unique-a', 'year_start 1973 fits exactly one current era range: post-war'),
  ('uris-hall', 'post-war', 'year-unique-a', 'year_start 1973 fits exactly one current era range: post-war'),
  ('casa-ottolenghi', 'post-war', 'year-unique-a', 'year_start 1974 fits exactly one current era range: post-war'),
  ('hirshhorn-museum-and-sculpture-garden', 'post-war', 'year-unique-a', 'year_start 1974 fits exactly one current era range: post-war'),
  ('parkeergarage-bijenkorf', 'post-war', 'year-unique-a', 'year_start 1974 fits exactly one current era range: post-war'),
  ('solow-building', 'post-war', 'year-unique-a', 'year_start 1974 fits exactly one current era range: post-war'),
  ('w-r-grace-building', 'post-war', 'year-unique-a', 'year_start 1974 fits exactly one current era range: post-war'),
  ('biblioteca-comunale-centrale-antonio-tiraboschi', 'post-war', 'year-unique-a', 'year_start 1975 fits exactly one current era range: post-war'),
  ('house-vi', 'post-war', 'year-unique-a', 'year_start 1975 fits exactly one current era range: post-war'),
  ('bagsv-rd-church', 'post-war', 'year-unique-a', 'year_start 1976 fits exactly one current era range: post-war'),
  ('kumamoto-prefectural-museum-of-art', 'post-war', 'year-unique-a', 'year_start 1976 fits exactly one current era range: post-war'),
  ('row-house-sumiyoshi', 'post-war', 'year-unique-a', 'year_start 1976 fits exactly one current era range: post-war'),
  ('bankinter-building', 'post-war', 'year-unique-a', 'year_start 1977 fits exactly one current era range: post-war'),
  ('centre-georges-pompidou', 'post-war', 'year-unique-a', 'year_start 1977 fits exactly one current era range: post-war'),
  ('centre-pompidou', 'post-war', 'year-unique-a', 'year_start 1977 fits exactly one current era range: post-war'),
  ('hirosaki-city-museum', 'post-war', 'year-unique-a', 'year_start 1977 fits exactly one current era range: post-war'),
  ('mlc-centre', 'post-war', 'year-unique-a', 'year_start 1977 fits exactly one current era range: post-war'),
  ('museum-of-east-asian-art', 'post-war', 'year-unique-a', 'year_start 1977 fits exactly one current era range: post-war'),
  ('brion-tomb', 'post-war', 'year-unique-a', 'year_start 1978 fits exactly one current era range: post-war'),
  ('danish-national-bank', 'post-war', 'year-unique-a', 'year_start 1978 fits exactly one current era range: post-war'),
  ('east-building-national-gallery', 'post-war', 'year-unique-a', 'year_start 1978 fits exactly one current era range: post-war'),
  ('ristinkirkko', 'post-war', 'year-unique-a', 'year_start 1978 fits exactly one current era range: post-war'),
  ('dar-al-islam', 'post-war', 'year-unique-a', 'year_start 1979 fits exactly one current era range: post-war'),
  ('fukuoka-art-museum', 'post-war', 'year-unique-a', 'year_start 1979 fits exactly one current era range: post-war'),
  ('parc-de-la-villette', 'post-war', 'year-unique-a', 'year_start 1979 fits exactly one current era range: post-war');

DO $$
DECLARE
  expected_count integer := 170;
  writable_count integer;
  known_era_count integer;
BEGIN
  SELECT count(*) INTO writable_count
  FROM public.buildings AS building
  JOIN era_slug_year_unique_a_decisions AS decision ON decision.slug = building.slug
  WHERE building.era_slug IS NULL;

  IF writable_count <> expected_count THEN
    RAISE EXCEPTION 'Expected % writable Year Unique A era rows, found %', expected_count, writable_count;
  END IF;

  SELECT count(*) INTO known_era_count
  FROM era_slug_year_unique_a_decisions AS decision
  JOIN public.eras AS era ON era.slug = decision.era_slug;

  IF known_era_count <> expected_count THEN
    RAISE EXCEPTION 'Expected % known era slugs, found %', expected_count, known_era_count;
  END IF;
END $$;

UPDATE public.buildings AS building
SET
  era_slug = decision.era_slug,
  updated_at = now()
FROM era_slug_year_unique_a_decisions AS decision
WHERE building.slug = decision.slug
  AND building.era_slug IS NULL;

INSERT INTO public.building_eras (building_id, era_slug)
SELECT building.id, decision.era_slug
FROM public.buildings AS building
JOIN era_slug_year_unique_a_decisions AS decision ON decision.slug = building.slug
JOIN public.eras AS era ON era.slug = decision.era_slug
ON CONFLICT (building_id, era_slug) DO NOTHING;

COMMIT;
