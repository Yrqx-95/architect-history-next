-- V20: Normalize reviewed Commons identity candidates and era metadata
--
-- Scope: three reviewed weak-identity records whose Commons category, Wikidata
-- instance type, architect, country, and year support a safe building record.
-- Idempotent: guarded by wikidata_id and inserts building_eras with ON CONFLICT DO NOTHING.

CREATE TEMP TABLE era_identity_commons_reviewed_decisions (
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

INSERT INTO era_identity_commons_reviewed_decisions (
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
    'Q125679342',
    'kantoorgebouw-het-oosten',
    'Kantoorgebouw Het Oosten',
    'Amsterdam',
    'Netherlands',
    'NL',
    'office',
    'postmodern',
    'commons-identity-review',
    'Commons category names Kantoorgebouw Het Oosten; Wikidata instance is office building in Amsterdam by Steven Holl, year_start 1998 fits postmodern'
  ),
  (
    'Q134893563',
    'terracos-de-braganca',
    'Terraços de Bragança',
    'Lisbon',
    'Portugal',
    'PT',
    'residential',
    'contemporary',
    'commons-identity-review',
    'Commons category names Terraços de Bragança; Wikidata instance is housing estate in Lisbon/Misericordia by Alvaro Siza, year_start 2004 fits contemporary'
  ),
  (
    'Q118539028',
    'capela-do-monte',
    'Capela do Monte',
    'Bensafrim e Barão de São João',
    'Portugal',
    'PT',
    'religious',
    'contemporary',
    'commons-identity-review',
    'Commons category names Capela do Monte; Wikidata instance is chapel in Bensafrim e Barao de Sao Joao by Alvaro Siza, year_start 2018 fits contemporary'
  );

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM public.buildings AS building
    JOIN era_identity_commons_reviewed_decisions AS decision ON decision.slug = building.slug
    WHERE building.wikidata_id <> decision.wikidata_id
  ) THEN
    RAISE EXCEPTION 'one or more reviewed Commons identity slugs are already used by another building';
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
FROM era_identity_commons_reviewed_decisions AS decision
WHERE building.wikidata_id = decision.wikidata_id
  AND (building.era_slug IS NULL OR building.era_slug = decision.era_slug);

INSERT INTO public.building_eras (building_id, era_slug)
SELECT building.id, decision.era_slug
FROM public.buildings AS building
JOIN era_identity_commons_reviewed_decisions AS decision ON decision.wikidata_id = building.wikidata_id
JOIN public.eras AS era ON era.slug = decision.era_slug
ON CONFLICT (building_id, era_slug) DO NOTHING;
