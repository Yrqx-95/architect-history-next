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
}

const REPORT_DIR = ensureReportDir()
const REPORT_JSON = path.join(REPORT_DIR, 'era-slug-contemporary-year-unique.json')
const REPORT_MD = path.join(REPORT_DIR, 'era-slug-contemporary-year-unique.md')
const ROLLBACK_SQL = path.join(REPORT_DIR, 'era-slug-contemporary-year-unique-rollback.sql')
const MIGRATION_PATH = path.join(ROOT, 'db/migrations/v17-normalize-contemporary-year-unique-era-slugs.sql')
const ARCHIVE_REPORT = path.join(ROOT, 'docs/archive/data-governance/ERA_SLUG_CONTEMPORARY_YEAR_UNIQUE_WRITE_REPORT.md')

const TARGET_ERA_SLUG = 'contemporary'

const MANUAL_EXCLUSIONS: Record<string, string> = {
  'new-orleans': 'Name/slug identifies a place rather than a clear building record; keep for identity cleanup before era assignment.',
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

function weakIdentityReason(slug: string) {
  if (!slug) return 'Missing slug.'
  if (/^q\d+$/i.test(slug)) return 'Wikidata-style placeholder slug; keep for identity cleanup before era assignment.'
  if (slug === 'untitled') return 'Untitled record; keep for identity cleanup before era assignment.'
  return null
}

function sqlString(value: string) {
  return `'${value.replaceAll("'", "''")}'`
}

function decisionRows(decisions: PreparedDecision[]) {
  return decisions
    .map(
      decision =>
        `  (${sqlString(decision.slug)}, ${sqlString(decision.era_slug)}, 'contemporary-year-unique', ${sqlString(decision.reason)})`
    )
    .join(',\n')
}

function rollbackRows(decisions: PreparedDecision[]) {
  return decisions.map(decision => `  (${sqlString(decision.slug)}, ${sqlString(decision.era_slug)})`).join(',\n')
}

function buildMigration(decisions: PreparedDecision[]) {
  return `-- ============================================================
-- V17: Normalize contemporary year-unique building era metadata
-- Source: docs/archive/data-governance/ERA_SLUG_CONTEMPORARY_YEAR_UNIQUE_WRITE_REPORT.md
-- Scope: ${decisions.length} reviewed contemporary year-unique records.
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
${decisionRows(decisions)};

DO $$
DECLARE
  expected_count integer := ${decisions.length};
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
`
}

function buildRollback(decisions: PreparedDecision[]) {
  return `-- Rollback for V17 contemporary year-unique era metadata.
-- Review before running; this only clears exact slug + era pairs from this batch.

BEGIN;

CREATE TEMP TABLE era_slug_contemporary_year_unique_rollback (
  slug text PRIMARY KEY,
  era_slug text NOT NULL
) ON COMMIT DROP;

INSERT INTO era_slug_contemporary_year_unique_rollback (slug, era_slug) VALUES
${rollbackRows(decisions)};

DELETE FROM public.building_eras AS relation
USING public.buildings AS building, era_slug_contemporary_year_unique_rollback AS decision
WHERE relation.building_id = building.id
  AND building.slug = decision.slug
  AND relation.era_slug = decision.era_slug;

UPDATE public.buildings AS building
SET
  era_slug = NULL,
  updated_at = now()
FROM era_slug_contemporary_year_unique_rollback AS decision
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
    '# Era Slug Contemporary Year Unique Write Report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Scope',
    '',
    '- This batch writes only unassigned buildings whose `year_start` fits exactly the `contemporary` era range.',
    '- It excludes weak identity records and known malformed records before writing.',
    '- It does not touch `postmodern`, `year-overlap`, `missing-year`, or any pre-2000 records.',
    '- `contemporary` is used here as a chronological era bucket, not as a style judgment.',
    '',
    '## Summary',
    '',
    `- Writable decisions: ${report.decisions.length}`,
    `- Excluded from automatic write: ${report.excluded.length}`,
    `- Migration: \`db/migrations/v17-normalize-contemporary-year-unique-era-slugs.sql\``,
    `- Rollback SQL: \`reports/era-slug-contemporary-year-unique-rollback.sql\``,
    '',
    '## Manual Exclusions',
    '',
    '| Building | Year | Candidate era | Reason |',
    '|---|---:|---|---|',
  ]

  for (const item of report.excluded) {
    lines.push(`| ${item.slug || '(missing slug)'} | ${item.year_start} | ${item.era_slug} | ${item.exclusion_reason.replaceAll('|', '\\|')} |`)
  }

  lines.push('', '## Decisions', '', '| Building | Name | Year | era_slug | Reason |', '|---|---|---:|---|---|')
  for (const item of report.decisions) {
    lines.push(
      `| ${item.slug} | ${item.name.replaceAll('|', '\\|')} | ${item.year_start} | ${item.era_slug} | ${item.reason.replaceAll('|', '\\|')} |`
    )
  }

  lines.push('', '## Verification Plan', '')
  lines.push('- Apply the generated migration to Supabase production.')
  lines.push('- Verify `buildings.era_slug` populated count increases by the writable decision count.')
  lines.push('- Verify `building_eras` receives the same relationship count for this batch.')
  lines.push('- Run `npm run data:audit`, `npm run data:plan-eras`, `npm run typecheck`, `npm run lint`, and `git diff --check`.')
  lines.push('')

  return lines.join('\n')
}

async function main() {
  preventReviewedOutputOverwrite()

  const [buildings, eras] = await Promise.all([fetchAll<Building>('buildings'), fetchAll<Era>('eras')])

  const candidates: PreparedDecision[] = buildings
    .filter(building => !building.era_slug && building.year_start !== null)
    .flatMap(building => {
      const year = building.year_start as number
      const candidateEras = matchingEras(year, eras)
      if (candidateEras.length !== 1 || candidateEras[0] !== TARGET_ERA_SLUG) return []
      return [
        {
          slug: building.slug,
          name: displayName(building),
          year_start: year,
          era_slug: TARGET_ERA_SLUG,
          reason: `year_start ${year} fits exactly one current era range: ${TARGET_ERA_SLUG}`,
          architect_slug: building.architect_slug,
          type_slug: building.type_slug,
          style_slugs: building.style_slugs || [],
        },
      ]
    })
    .sort((a, b) => a.year_start - b.year_start || a.slug.localeCompare(b.slug))

  const decisions: PreparedDecision[] = []
  const excluded: ExcludedDecision[] = []

  for (const candidate of candidates) {
    const exclusionReason = weakIdentityReason(candidate.slug) || MANUAL_EXCLUSIONS[candidate.slug]
    if (exclusionReason) {
      excluded.push({ ...candidate, exclusion_reason: exclusionReason })
    } else {
      decisions.push(candidate)
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    source: {
      target_era_slug: TARGET_ERA_SLUG,
      manual_exclusions: MANUAL_EXCLUSIONS,
    },
    counts: {
      candidate_count: candidates.length,
      writable_decision_count: decisions.length,
      excluded_count: excluded.length,
    },
    decisions,
    excluded,
  }

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))
  fs.writeFileSync(ARCHIVE_REPORT, markdownReport(report))
  fs.writeFileSync(MIGRATION_PATH, buildMigration(decisions))
  fs.writeFileSync(ROLLBACK_SQL, buildRollback(decisions))

  console.log('Era slug contemporary year-unique preparation complete')
  console.log(`- candidate rows: ${candidates.length}`)
  console.log(`- writable decisions: ${decisions.length}`)
  console.log(`- excluded rows: ${excluded.length}`)
  console.log(`- migration: ${path.relative(ROOT, MIGRATION_PATH)}`)
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
  console.log(`- archive report: ${path.relative(ROOT, ARCHIVE_REPORT)}`)
  console.log(`- rollback: ${path.relative(ROOT, ROLLBACK_SQL)}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
