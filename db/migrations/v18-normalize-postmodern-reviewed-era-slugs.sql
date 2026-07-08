-- ============================================================
-- V18: Normalize reviewed postmodern building era metadata
-- Source: docs/archive/data-governance/ERA_SLUG_POSTMODERN_REVIEWED_WRITE_REPORT.md
-- Scope: 87 reviewed postmodern chronological-era records.
-- Idempotent: updates only rows where buildings.era_slug IS NULL and
-- inserts building_eras rows with ON CONFLICT DO NOTHING.
-- ============================================================

BEGIN;

CREATE TEMP TABLE era_slug_postmodern_reviewed_decisions (
  slug text PRIMARY KEY,
  era_slug text NOT NULL,
  decision_source text NOT NULL,
  reason text NOT NULL
) ON COMMIT DROP;

INSERT INTO era_slug_postmodern_reviewed_decisions (slug, era_slug, decision_source, reason) VALUES
  ('miyagi-museum-of-art', 'postmodern', 'postmodern-reviewed', 'year_start 1981 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('national-museum-of-japanese-history', 'postmodern', 'postmodern-reviewed', 'year_start 1981 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('rotonda-house', 'postmodern', 'postmodern-reviewed', 'year_start 1981 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('kumamoto-prefectural-theater', 'postmodern', 'postmodern-reviewed', 'year_start 1982 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('kuwait-national-assembly-building', 'postmodern', 'postmodern-reviewed', 'year_start 1982 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('wells-fargo-tower', 'postmodern', 'postmodern-reviewed', 'year_start 1982 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('iwasaki-art-museum', 'postmodern', 'postmodern-reviewed', 'year_start 1983 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('paris-opera-ballet-school', 'postmodern', 'postmodern-reviewed', 'year_start 1983 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('michael-and-joan-lenihan-glazer', 'postmodern', 'postmodern-reviewed', 'year_start 1984 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('hongkong-bank', 'postmodern', 'postmodern-reviewed', 'year_start 1985 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('ishigaki-civic-hall', 'postmodern', 'postmodern-reviewed', 'year_start 1985 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('montevideo-shopping', 'postmodern', 'postmodern-reviewed', 'year_start 1985 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('niigata-city-art-museum', 'postmodern', 'postmodern-reviewed', 'year_start 1985 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('spiral', 'postmodern', 'postmodern-reviewed', 'year_start 1985 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('groninger-museum-building', 'postmodern', 'postmodern-reviewed', 'year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('intiland-tower', 'postmodern', 'postmodern-reviewed', 'year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('library-of-the-university-of', 'postmodern', 'postmodern-reviewed', 'year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('lloyds-building', 'postmodern', 'postmodern-reviewed', 'year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('makuhari-messe', 'postmodern', 'postmodern-reviewed', 'year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('national-museum-of-roman-art', 'postmodern', 'postmodern-reviewed', 'year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('one-raffles-place', 'postmodern', 'postmodern-reviewed', 'year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('riverside-centre-brisbane', 'postmodern', 'postmodern-reviewed', 'year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('rovaniemi-town-hall', 'postmodern', 'postmodern-reviewed', 'year_start 1986 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('1-cobham-mews-studios', 'postmodern', 'postmodern-reviewed', 'year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('menil-collection', 'postmodern', 'postmodern-reviewed', 'year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('museum-of-modern-and-contemporary', 'postmodern', 'postmodern-reviewed', 'year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('nippon-gaishi-hall', 'postmodern', 'postmodern-reviewed', 'year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('paustian-house', 'postmodern', 'postmodern-reviewed', 'year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('seinajoki-city-theatre', 'postmodern', 'postmodern-reviewed', 'year_start 1987 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('lippo-centre', 'postmodern', 'postmodern-reviewed', 'year_start 1988 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('la-fortezza', 'postmodern', 'postmodern-reviewed', 'year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('lake-biwa-otsu-prince-hotel', 'postmodern', 'postmodern-reviewed', 'year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('louvre-pyramid', 'postmodern', 'postmodern-reviewed', 'year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('serralves-museum-of-contemporary-art', 'postmodern', 'postmodern-reviewed', 'year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('toyama-shimin-plaza', 'postmodern', 'postmodern-reviewed', 'year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('wexner-center-for-the-arts', 'postmodern', 'postmodern-reviewed', 'year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('yokohama-museum-of-art', 'postmodern', 'postmodern-reviewed', 'year_start 1989 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('bank-of-china-tower', 'postmodern', 'postmodern-reviewed', 'year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('coaty-restaurante', 'postmodern', 'postmodern-reviewed', 'year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('italie-deux', 'postmodern', 'postmodern-reviewed', 'year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('j-m-teixeira-house', 'postmodern', 'postmodern-reviewed', 'year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('presidential-palace-damascus', 'postmodern', 'postmodern-reviewed', 'year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('tokyo-metropolitan-theatre', 'postmodern', 'postmodern-reviewed', 'year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('tschumi-pavilion', 'postmodern', 'postmodern-reviewed', 'year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('watari-museum-of-contemporary-art', 'postmodern', 'postmodern-reviewed', 'year_start 1990 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('okayama-symphony-hall', 'postmodern', 'postmodern-reviewed', 'year_start 1991 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('qv-1', 'postmodern', 'postmodern-reviewed', 'year_start 1991 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('tokyo-metropolitan-government', 'postmodern', 'postmodern-reviewed', 'year_start 1991 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('centro-commerciale-le-torri', 'postmodern', 'postmodern-reviewed', 'year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('evry-cathedral', 'postmodern', 'postmodern-reviewed', 'year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('kunsthal', 'postmodern', 'postmodern-reviewed', 'year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('saint-peter-church', 'postmodern', 'postmodern-reviewed', 'year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('san-francisco-museum-of-modern', 'postmodern', 'postmodern-reviewed', 'year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('thyssen-bornemisza-museum', 'postmodern', 'postmodern-reviewed', 'year_start 1992 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('apa-hotel-resort-tokyo-bay', 'postmodern', 'postmodern-reviewed', 'year_start 1993 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('teatro-oficina', 'postmodern', 'postmodern-reviewed', 'year_start 1993 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('european-court-of-human-rights', 'postmodern', 'postmodern-reviewed', 'year_start 1994 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('kansai-airport', 'postmodern', 'postmodern-reviewed', 'year_start 1994 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('shinjuku-park-tower', 'postmodern', 'postmodern-reviewed', 'year_start 1994 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('the-concourse', 'postmodern', 'postmodern-reviewed', 'year_start 1994 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('yokosuka-arts-theatre', 'postmodern', 'postmodern-reviewed', 'year_start 1994 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('museu-brasileiro-da-escultura', 'postmodern', 'postmodern-reviewed', 'year_start 1995 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('tour-de-lille', 'postmodern', 'postmodern-reviewed', 'year_start 1995 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('dancing-house', 'postmodern', 'postmodern-reviewed', 'year_start 1996 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('fcg-building', 'postmodern', 'postmodern-reviewed', 'year_start 1996 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('museum-tinguely', 'postmodern', 'postmodern-reviewed', 'year_start 1996 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('tokyo-fashion-town-building', 'postmodern', 'postmodern-reviewed', 'year_start 1996 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('esbjerg-performing-arts-centre', 'postmodern', 'postmodern-reviewed', 'year_start 1997 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('guggenheim-bilbao', 'postmodern', 'postmodern-reviewed', 'year_start 1997 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('miho-museum', 'postmodern', 'postmodern-reviewed', 'year_start 1997 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('88-wood-street', 'postmodern', 'postmodern-reviewed', 'year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('asian-arts-museum', 'postmodern', 'postmodern-reviewed', 'year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('bodmer-foundation', 'postmodern', 'postmodern-reviewed', 'year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('bordeaux-courthouse', 'postmodern', 'postmodern-reviewed', 'year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('cymbalista-synagogue-and-jewish-heritage', 'postmodern', 'postmodern-reviewed', 'year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('horizon-apartments', 'postmodern', 'postmodern-reviewed', 'year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('kiasma', 'postmodern', 'postmodern-reviewed', 'year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('kuala-lumpur-airport', 'postmodern', 'postmodern-reviewed', 'year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('luis-barragan-house-and-studio', 'postmodern', 'postmodern-reviewed', 'year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('pavilhao-de-portugal', 'postmodern', 'postmodern-reviewed', 'year_start 1998 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('alfred-lerner-hall', 'postmodern', 'postmodern-reviewed', 'year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('dortmund-city-and-state-library', 'postmodern', 'postmodern-reviewed', 'year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('kursaal-convention-centre', 'postmodern', 'postmodern-reviewed', 'year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('lauditori', 'postmodern', 'postmodern-reviewed', 'year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('reichstag-dome', 'postmodern', 'postmodern-reviewed', 'year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('tokyo-dome-hotel', 'postmodern', 'postmodern-reviewed', 'year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label'),
  ('toyama-international-conference-center', 'postmodern', 'postmodern-reviewed', 'year_start 1999 fits exactly one current era range: postmodern; reviewed as chronological era bucket, not style label');

DO $$
DECLARE
  expected_count integer := 87;
  writable_count integer;
  known_era_count integer;
BEGIN
  SELECT count(*) INTO writable_count
  FROM public.buildings AS building
  JOIN era_slug_postmodern_reviewed_decisions AS decision ON decision.slug = building.slug
  WHERE building.era_slug IS NULL;

  IF writable_count <> expected_count THEN
    RAISE EXCEPTION 'Expected % writable postmodern era rows, found %', expected_count, writable_count;
  END IF;

  SELECT count(*) INTO known_era_count
  FROM era_slug_postmodern_reviewed_decisions AS decision
  JOIN public.eras AS era ON era.slug = decision.era_slug;

  IF known_era_count <> expected_count THEN
    RAISE EXCEPTION 'Expected % known era slugs, found %', expected_count, known_era_count;
  END IF;
END $$;

UPDATE public.buildings AS building
SET
  era_slug = decision.era_slug,
  updated_at = now()
FROM era_slug_postmodern_reviewed_decisions AS decision
WHERE building.slug = decision.slug
  AND building.era_slug IS NULL;

INSERT INTO public.building_eras (building_id, era_slug)
SELECT building.id, decision.era_slug
FROM public.buildings AS building
JOIN era_slug_postmodern_reviewed_decisions AS decision ON decision.slug = building.slug
JOIN public.eras AS era ON era.slug = decision.era_slug
ON CONFLICT (building_id, era_slug) DO NOTHING;

COMMIT;
