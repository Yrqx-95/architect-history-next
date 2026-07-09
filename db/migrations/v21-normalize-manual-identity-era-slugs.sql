-- V21: Normalize manually researched identity candidates and era metadata
--
-- Scope: eight weak-identity records whose public-facing names required
-- manual source review beyond Wikidata labels or Commons category names.
-- Idempotent: guarded by wikidata_id and inserts building_eras with ON CONFLICT DO NOTHING.

CREATE TEMP TABLE era_identity_manual_reviewed_decisions (
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

INSERT INTO era_identity_manual_reviewed_decisions (
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
    'Q116481414',
    'conservatoire-erik-satie',
    'Conservatoire Erik Satie',
    'Paris',
    'France',
    'FR',
    'educational',
    'postmodern',
    'manual-identity-review',
    'Ville de Paris and architecture references identify the 1984 Christian de Portzamparc project as Conservatoire Erik Satie; music school type supports educational'
  ),
  (
    'Q125679109',
    'punt-en-komma-social-housing',
    'Punt en Komma Social Housing',
    'The Hague',
    'Netherlands',
    'NL',
    'residential',
    'postmodern',
    'manual-identity-review',
    'CCA identifies Siza/Castanheira housing at Schilderswijk as Punt en Komma Social Housing; year_start 1985 fits the postmodern era bucket'
  ),
  (
    'Q125679110',
    'duas-habitacoes-e-duas-lojas',
    'Duas Habitações e Duas Lojas',
    'The Hague',
    'Netherlands',
    'NL',
    'mixed-use',
    'postmodern',
    'manual-identity-review',
    'CCA identifies the Van der Vennestraat project as two dwellings and two shops in Schilderswijk; mixed residential-retail program fits mixed-use'
  ),
  (
    'Q125679108',
    'ceramique-terrein-apartments-offices',
    'Céramique Terrein Apartments and Offices',
    'Maastricht',
    'Netherlands',
    'NL',
    'mixed-use',
    'postmodern',
    'manual-identity-review',
    'CCA identifies the Maastricht Céramique project as apartments and offices by Siza/Castanheira; corrects previous country_code LU to NL'
  ),
  (
    'Q125679066',
    'de-passage-the-hague',
    'De Passage',
    'The Hague',
    'Netherlands',
    'NL',
    'commercial',
    'contemporary',
    'manual-identity-review',
    'Bernard Tschumi Architects identifies De Passage as a Hague urban/commercial passage; year_start 2005 fits contemporary'
  ),
  (
    'Q3412221',
    'university-center-management-sciences-bordeaux',
    'University Center of Management Sciences, Bordeaux',
    'Bordeaux',
    'France',
    'FR',
    'educational',
    'contemporary',
    'manual-identity-review',
    'Architecture references identify the Lacaton and Vassal campus project in Bordeaux as University Center of Management Sciences; year_start 2007 fits contemporary'
  ),
  (
    'Q123517303',
    'centro-de-arte-contemporanea-graca-morais',
    'Centro de Arte Contemporânea Graça Morais',
    'Bragança',
    'Portugal',
    'PT',
    'cultural',
    'contemporary',
    'manual-identity-review',
    'Official municipal/Wikidata identity resolves the Eduardo Souto de Moura cultural center in Braganca as Centro de Arte Contemporanea Graca Morais'
  ),
  (
    'Q9006868',
    'iesu-church-san-sebastian',
    'Iesu Church in San Sebastián',
    'San Sebastián',
    'Spain',
    'ES',
    'religious',
    'contemporary',
    'manual-identity-review',
    'Rafael Moneo project sources identify the San Sebastian church as Iesu Church; year_start 2011 fits contemporary'
  );

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM public.buildings AS building
    JOIN era_identity_manual_reviewed_decisions AS decision ON decision.slug = building.slug
    WHERE building.wikidata_id <> decision.wikidata_id
  ) THEN
    RAISE EXCEPTION 'one or more manually reviewed identity slugs are already used by another building';
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
FROM era_identity_manual_reviewed_decisions AS decision
WHERE building.wikidata_id = decision.wikidata_id
  AND (building.era_slug IS NULL OR building.era_slug = decision.era_slug);

INSERT INTO public.building_eras (building_id, era_slug)
SELECT building.id, decision.era_slug
FROM public.buildings AS building
JOIN era_identity_manual_reviewed_decisions AS decision ON decision.wikidata_id = building.wikidata_id
JOIN public.eras AS era ON era.slug = decision.era_slug
ON CONFLICT (building_id, era_slug) DO NOTHING;
