-- ============================================================
-- V15: Normalize high-confidence building era metadata
-- Source: docs/archive/data-governance/ERA_ASSIGNMENT_STRATEGY.md
-- Scope: 32 reviewed records only.
-- Idempotent: updates only rows where buildings.era_slug IS NULL and
-- inserts building_eras rows with ON CONFLICT DO NOTHING.
-- ============================================================

BEGIN;

CREATE TEMP TABLE era_slug_decisions (
  slug text PRIMARY KEY,
  era_slug text NOT NULL,
  decision_source text NOT NULL,
  reason text NOT NULL
) ON COMMIT DROP;

INSERT INTO era_slug_decisions (slug, era_slug, decision_source, reason) VALUES
  ('basilica-fano', 'classical-era', 'style-rule', 'classical style'),
  ('todaiji-temple', 'classical-era', 'style-rule', 'classical style'),
  ('sheldonian-theatre', 'classical-era', 'style-rule', 'classical style'),
  ('hampton-court', 'classical-era', 'manual-review', 'reviewed classical-era decision despite english-baroque style tag'),
  ('st-pauls-cathedral', 'classical-era', 'manual-review', 'reviewed classical-era decision despite english-baroque style tag'),

  ('florence-cathedral-dome', 'renaissance', 'style-rule', 'renaissance style'),
  ('ospedale-innocenti', 'renaissance', 'style-rule', 'renaissance style'),
  ('palazzo-rucellai', 'renaissance', 'style-rule', 'renaissance style'),
  ('pazzi-chapel', 'renaissance', 'style-rule', 'renaissance style'),
  ('santa-maria-novella', 'renaissance', 'style-rule', 'renaissance style'),
  ('sant-andrea-mantua', 'renaissance', 'style-rule', 'renaissance style'),
  ('basilica-palladiana', 'renaissance', 'style-rule', 'palladian style'),
  ('piazza-del-campidoglio', 'renaissance', 'style-rule', 'mannerism style'),
  ('villa-rotonda', 'renaissance', 'style-rule', 'palladian and renaissance style'),
  ('laurentian-library', 'renaissance', 'style-rule', 'mannerism and renaissance style'),
  ('san-giorgio-maggiore', 'renaissance', 'style-rule', 'palladian style'),
  ('teatro-olimpico', 'renaissance', 'style-rule', 'palladian style'),
  ('st-peters-dome', 'renaissance', 'manual-review', 'reviewed renaissance decision despite baroque style tag'),

  ('palazzo-barberini', 'baroque', 'style-rule', 'baroque style'),
  ('oratorio-dei-filippini', 'baroque', 'style-rule', 'baroque style'),
  ('san-carlo-alle-quattro-fontane', 'baroque', 'style-rule', 'baroque style'),
  ('sant-ivo-alla-sapienza', 'baroque', 'style-rule', 'baroque style'),
  ('st-peters-square', 'baroque', 'style-rule', 'baroque style'),
  ('sant-andrea-al-quirinale', 'baroque', 'style-rule', 'baroque style'),
  ('greenwich-hospital', 'baroque', 'style-rule', 'english-baroque style'),

  ('sagrada-familia', 'art-nouveau', 'style-rule', 'art nouveau and catalan modernisme style'),
  ('palau-guell', 'art-nouveau', 'style-rule', 'catalan modernisme style'),
  ('carson-pirie-scott', 'art-nouveau', 'style-rule', 'art nouveau style'),
  ('casa-batllo', 'art-nouveau', 'style-rule', 'art nouveau and catalan modernisme style'),
  ('casa-mila', 'art-nouveau', 'style-rule', 'catalan modernisme style'),
  ('park-guell', 'art-nouveau', 'style-rule', 'catalan modernisme style'),

  ('hiroshima-city-museum', 'postmodern', 'style-rule', 'postmodern style');

UPDATE public.buildings AS building
SET
  era_slug = decision.era_slug,
  updated_at = now()
FROM era_slug_decisions AS decision
WHERE building.slug = decision.slug
  AND building.era_slug IS NULL;

INSERT INTO public.building_eras (building_id, era_slug)
SELECT building.id, decision.era_slug
FROM public.buildings AS building
JOIN era_slug_decisions AS decision ON decision.slug = building.slug
JOIN public.eras AS era ON era.slug = decision.era_slug
ON CONFLICT (building_id, era_slug) DO NOTHING;

COMMIT;
