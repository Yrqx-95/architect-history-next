import fs from 'node:fs'
import path from 'node:path'
import { ensureReportDir, fetchAll, ROOT } from './supabase-script-utils'

type Building = {
  id: string
  slug: string
  name_zh: string | null
  name_en: string | null
  name_ja: string | null
  year_start: number | null
  era_slug: string | null
  architect_slug: string | null
  type_slug: string | null
  style_slugs: string[] | null
}

type Era = {
  slug: string
  name_en: string | null
  year_start: number | null
  year_end: number | null
}

type PreparedDecision = {
  slug: string
  name: string
  year_start: number
  era_slug: string
  reason: string
  architect_slug: string | null
  type_slug: string | null
  style_slugs: string[]
}

type ExcludedDecision = PreparedDecision & {
  exclusion_reason: string
  exclusion_group: 'weak-identity' | 'style-hold-out'
}

const REPORT_DIR = ensureReportDir()
const REPORT_JSON = path.join(REPORT_DIR, 'era-slug-postmodern-reviewed.json')
const REPORT_MD = path.join(REPORT_DIR, 'era-slug-postmodern-reviewed.md')
const ROLLBACK_SQL = path.join(REPORT_DIR, 'era-slug-postmodern-reviewed-rollback.sql')
const MIGRATION_PATH = path.join(ROOT, 'db/migrations/v18-normalize-postmodern-reviewed-era-slugs.sql')
const ARCHIVE_REPORT = path.join(ROOT, 'docs/archive/data-governance/ERA_SLUG_POSTMODERN_REVIEWED_WRITE_REPORT.md')

const TARGET_ERA_SLUG = 'postmodern'

const WEAK_IDENTITY_EXCLUSIONS: Record<string, string> = {
  q116481414: 'Wikidata-style placeholder slug with no public-facing label; resolve identity before era assignment.',
  q125679109: 'Wikidata-style placeholder slug; review with related Siza/Castanheira Schilderswijk housing records before era assignment.',
  q125679110: 'Wikidata-style placeholder slug; review with related Siza/Castanheira Schilderswijk housing records before era assignment.',
  q125679342: 'Wikidata-style placeholder slug; research public-facing Steven Holl project name before era assignment.',
  q125679108: 'Wikidata-style placeholder slug with likely country-code conflict; resolve identity and country before era assignment.',
  untitled: 'Untitled public-art/infrastructure-like record with likely country-code conflict; resolve whether it belongs in the building archive before era assignment.',
}

const STYLE_HOLD_OUT_EXCLUSIONS: Record<string, string> = {
  'national-assembly-dhaka':
    'Late Kahn work with modernism/brutalism style slugs; completion year alone should not make it a postmodern write candidate.',
  'church-of-light':
    'Ando work better explained through minimalism, concrete, light, and Japanese modernity; hold out from first postmodern batch.',
  'water-temple':
    'Ando work with minimalism/exposed-concrete reading; hold out from first postmodern batch.',
  naoshima: 'Ando museum with minimalism/exposed-concrete reading; hold out from first postmodern batch.',
  'therme-vals':
    'Zumthor work better explained through material atmosphere, minimalism, and Swiss contemporary architecture.',
  'kunsthaus-bregenz':
    'Zumthor work better explained through material atmosphere, minimalism, and Swiss contemporary architecture.',
}

function preventReviewedOutputOverwrite() {
  if (process.env.ALLOW_REVIEW_OUTPUT_OVERWRITE === '1') return

  const reviewedOutputs = [MIGRATION_PATH, ARCHIVE_REPORT].filter(filePath => fs.existsSync(filePath))
  if (!reviewedOutputs.length) return

  const relativePaths = reviewedOutputs.map(filePath => path.relative(ROOT, filePath)).join(', ')
  throw new Error(
    `Refusing to overwrite reviewed output: ${relativePaths}. Set ALLOW_REVIEW_OUTPUT_OVERWRITE=1 only when intentionally regenerating this batch.`
  )
}

function displayName(building: Building) {
  return building.name_en || building.name_zh || building.name_ja || building.slug
}

function matchingEras(year: number, eras: Era[]) {
  return eras
    .filter(era => {
      if (era.year_start === null || era.year_end === null) return false
      return year >= era.year_start && year <= era.year_end
    })
    .map(era => era.slug)
}

function sqlString(value: string) {
  return `'${value.replaceAll("'", "''")}'`
}

function toDecision(building: Building): PreparedDecision {
  return {
    slug: building.slug,
    name: displayName(building),
    year_start: building.year_start as number,
    era_slug: TARGET_ERA_SLUG,
    reason: `year_start ${building.year_start} fits exactly one current era range: ${TARGET_ERA_SLUG}; reviewed as chronological era bucket, not style label`,
    architect_slug: building.architect_slug,
    type_slug: building.type_slug,
    style_slugs: building.style_slugs || [],
  }
}

function classifyExclusion(decision: PreparedDecision): ExcludedDecision | null {
  const weakIdentityReason = WEAK_IDENTITY_EXCLUSIONS[decision.slug]
  if (weakIdentityReason) {
    return {
      ...decision,
      exclusion_group: 'weak-identity',
      exclusion_reason: weakIdentityReason,
    }
  }

  const styleHoldOutReason = STYLE_HOLD_OUT_EXCLUSIONS[decision.slug]
  if (styleHoldOutReason) {
    return {
      ...decision,
      exclusion_group: 'style-hold-out',
      exclusion_reason: styleHoldOutReason,
    }
  }

  return null
}

function decisionRows(decisions: PreparedDecision[]) {
  return decisions
    .map(
      decision =>
        `  (${sqlString(decision.slug)}, ${sqlString(decision.era_slug)}, 'postmodern-reviewed', ${sqlString(decision.reason)})`
    )
    .join(',\n')
}

function rollbackRows(decisions: PreparedDecision[]) {
  return decisions.map(decision => `  (${sqlString(decision.slug)}, ${sqlString(decision.era_slug)})`).join(',\n')
}

function buildMigration(decisions: PreparedDecision[]) {
  return `-- ============================================================
-- V18: Normalize reviewed postmodern building era metadata
-- Source: docs/archive/data-governance/ERA_SLUG_POSTMODERN_REVIEWED_WRITE_REPORT.md
-- Scope: ${decisions.length} reviewed postmodern chronological-era records.
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
${decisionRows(decisions)};

DO $$
DECLARE
  expected_count integer := ${decisions.length};
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
`
}

function buildRollback(decisions: PreparedDecision[]) {
  return `-- Rollback for V18 reviewed postmodern era metadata.
-- Review before running; this only clears exact slug + era pairs from this batch.

BEGIN;

CREATE TEMP TABLE era_slug_postmodern_reviewed_rollback (
  slug text PRIMARY KEY,
  era_slug text NOT NULL
) ON COMMIT DROP;

INSERT INTO era_slug_postmodern_reviewed_rollback (slug, era_slug) VALUES
${rollbackRows(decisions)};

DELETE FROM public.building_eras AS relation
USING public.buildings AS building, era_slug_postmodern_reviewed_rollback AS decision
WHERE relation.building_id = building.id
  AND building.slug = decision.slug
  AND relation.era_slug = decision.era_slug;

UPDATE public.buildings AS building
SET
  era_slug = NULL,
  updated_at = now()
FROM era_slug_postmodern_reviewed_rollback AS decision
WHERE building.slug = decision.slug
  AND building.era_slug = decision.era_slug;

COMMIT;
`
}

function markdownReport(report: {
  generatedAt: string
  decisions: PreparedDecision[]
  excluded: ExcludedDecision[]
}) {
  const lines = [
    '# Era Slug Postmodern Reviewed Write Report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Scope',
    '',
    '- This batch writes only unassigned buildings whose `year_start` fits exactly the `postmodern` era range.',
    '- `postmodern` is used here as a chronological era bucket, not as a style label.',
    '- The batch excludes weak identity records and style hold-outs identified in the postmodern review notes.',
    '- It does not touch `year-overlap`, `missing-year`, `contemporary`, or already assigned records.',
    '',
    '## Source Review Notes',
    '',
    '- `docs/archive/data-governance/ERA_SLUG_POSTMODERN_WEAK_IDENTITY_REVIEW.md`',
    '- `docs/archive/data-governance/ERA_SLUG_POSTMODERN_STYLE_CONFLICT_REVIEW.md`',
    '',
    '## Summary',
    '',
    `- Writable decisions: ${report.decisions.length}`,
    `- Excluded from automatic write: ${report.excluded.length}`,
    `- Migration: \`db/migrations/v18-normalize-postmodern-reviewed-era-slugs.sql\``,
    `- Rollback SQL: \`reports/era-slug-postmodern-reviewed-rollback.sql\``,
    '',
    '## Manual Exclusions',
    '',
    '| Group | Building | Name | Year | Current styles | Reason |',
    '|---|---|---|---:|---|---|',
  ]

  for (const item of report.excluded) {
    lines.push(
      `| ${item.exclusion_group} | ${item.slug} | ${item.name.replaceAll('|', '\\|')} | ${item.year_start} | ${item.style_slugs.join(', ')} | ${item.exclusion_reason.replaceAll('|', '\\|')} |`
    )
  }

  lines.push('', '## Decisions', '', '| Building | Name | Year | Architect | Type | Current styles | Reason |')
  lines.push('|---|---|---:|---|---|---|---|')
  for (const item of report.decisions) {
    lines.push(
      `| ${item.slug} | ${item.name.replaceAll('|', '\\|')} | ${item.year_start} | ${item.architect_slug || ''} | ${
        item.type_slug || ''
      } | ${item.style_slugs.join(', ')} | ${item.reason.replaceAll('|', '\\|')} |`
    )
  }

  lines.push('', '## Verification Plan', '')
  lines.push('- Apply the generated migration to Supabase production only after human review.')
  lines.push('- Verify `buildings.era_slug` populated count increases by the writable decision count.')
  lines.push('- Verify `building_eras` receives the same relationship count for this batch.')
  lines.push('- Run `npm run data:audit`, `npm run data:plan-eras`, `npm run typecheck`, `npm run lint`, and `git diff --check`.')
  lines.push('')

  return lines.join('\n')
}

async function main() {
  preventReviewedOutputOverwrite()

  const [buildings, eras] = await Promise.all([fetchAll<Building>('buildings'), fetchAll<Era>('eras')])
  const candidates = buildings
    .filter(building => !building.era_slug && building.year_start !== null)
    .filter(building => {
      const candidateEras = matchingEras(building.year_start as number, eras)
      return candidateEras.length === 1 && candidateEras[0] === TARGET_ERA_SLUG
    })
    .map(toDecision)
    .sort((a, b) => a.year_start - b.year_start || a.slug.localeCompare(b.slug))

  const excluded: ExcludedDecision[] = []
  const decisions: PreparedDecision[] = []
  for (const candidate of candidates) {
    const exclusion = classifyExclusion(candidate)
    if (exclusion) excluded.push(exclusion)
    else decisions.push(candidate)
  }

  const report = {
    generatedAt: new Date().toISOString(),
    decisions,
    excluded,
  }

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))
  fs.writeFileSync(ROLLBACK_SQL, buildRollback(decisions))
  fs.writeFileSync(MIGRATION_PATH, buildMigration(decisions))
  fs.writeFileSync(ARCHIVE_REPORT, markdownReport(report))

  console.log('Postmodern reviewed era write preparation complete')
  console.log(`- candidates: ${candidates.length}`)
  console.log(`- writable decisions: ${decisions.length}`)
  console.log(`- excluded: ${excluded.length}`)
  console.log(`- migration: ${path.relative(ROOT, MIGRATION_PATH)}`)
  console.log(`- archive report: ${path.relative(ROOT, ARCHIVE_REPORT)}`)
  console.log(`- rollback: ${path.relative(ROOT, ROLLBACK_SQL)}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
