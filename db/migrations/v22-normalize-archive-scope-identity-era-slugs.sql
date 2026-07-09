-- V22: Normalize reviewed archive-scope identity candidates and era metadata
--
-- Scope: two boundary built-environment records previously held out from
-- era assignment because they were public art / infrastructure rather than
-- conventional buildings.
-- Idempotent: guarded by wikidata_id and inserts building_eras with ON CONFLICT DO NOTHING.

CREATE TEMP TABLE era_identity_archive_scope_reviewed_decisions (
  wikidata_id text PRIMARY KEY,
  slug text NOT NULL,
  name_en text NOT NULL,
  city text,
  country text,
  country_code text,
  type_slug text,
  era_slug text NOT NULL,
  decision_source text NOT NULL,
  reason text NOT NULL
);

INSERT INTO era_identity_archive_scope_reviewed_decisions (
  wikidata_id,
  slug,
  name_en,
  city,
  country,
  country_code,
  type_slug,
  era_slug,
  decision_source,
  reason
) VALUES
  (
    'Q127587635',
    'jc-decaux-bus-shelter-aachen',
    'JC Decaux Bus Shelter, Aachen',
    'Aachen',
    'Germany',
    'DE',
    'transportation',
    'postmodern',
    'archive-scope-review',
    'Eisenman Architects identifies the Aachen work as JC Decaux Bus Shelter 1996; bus shelter / street furniture scope fits transportation and corrects country_code LU to DE'
  ),
  (
    'Q136394553',
    'fontana-di-piazzale-della-pace-parma',
    'Fontana di Piazzale della Pace (Parma)',
    'Parma',
    'Italy',
    'IT',
    'public-space',
    'contemporary',
    'archive-scope-review',
    'Wikimedia and Parma references identify the Mario Botta reflecting-pool / fountain in Piazzale della Pace; scope is public-space rather than conventional building'
  );

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM public.buildings AS building
    JOIN era_identity_archive_scope_reviewed_decisions AS decision ON decision.slug = building.slug
    WHERE building.wikidata_id <> decision.wikidata_id
  ) THEN
    RAISE EXCEPTION 'one or more archive-scope reviewed identity slugs are already used by another building';
  END IF;
END $$;

UPDATE public.buildings AS building
SET
  slug = decision.slug,
  name_en = decision.name_en,
  city = decision.city,
  country = decision.country,
  country_code = decision.country_code,
  type_slug = decision.type_slug,
  era_slug = decision.era_slug,
  updated_at = now()
FROM era_identity_archive_scope_reviewed_decisions AS decision
WHERE building.wikidata_id = decision.wikidata_id
  AND (building.era_slug IS NULL OR building.era_slug = decision.era_slug);

INSERT INTO public.building_eras (building_id, era_slug)
SELECT building.id, decision.era_slug
FROM public.buildings AS building
JOIN era_identity_archive_scope_reviewed_decisions AS decision ON decision.wikidata_id = building.wikidata_id
JOIN public.eras AS era ON era.slug = decision.era_slug
ON CONFLICT (building_id, era_slug) DO NOTHING;
