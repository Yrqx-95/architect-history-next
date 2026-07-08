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
const REPORT_JSON = path.join(REPORT_DIR, 'era-slug-year-unique-a.json')
const REPORT_MD = path.join(REPORT_DIR, 'era-slug-year-unique-a.md')
const ROLLBACK_SQL = path.join(REPORT_DIR, 'era-slug-year-unique-a-rollback.sql')
const MIGRATION_PATH = path.join(ROOT, 'db/migrations/v16-normalize-year-unique-a-era-slugs.sql')
const ARCHIVE_REPORT = path.join(ROOT, 'docs/archive/data-governance/ERA_SLUG_YEAR_UNIQUE_A_WRITE_REPORT.md')

const ALLOWED_ERA_SLUGS = new Set([
  'renaissance',
  'neoclassical',
  'industrial-revolution',
  'early-modern',
  'modern',
  'post-war',
])

const MANUAL_EXCLUSIONS: Record<string, string> = {
  'fondazione-querini-stampalia':
    'Original building year points to 1869, but this record is likely used as a Scarpa intervention reference; keep for manual review.',
  'cleveland-museum-of-art-building':
    'Likely duplicate or weaker companion record for cleveland-museum-of-art; keep one canonical target out of automatic writes until reviewed.',
  'swedish-centre-for-architecture-and':
    'Year and architect context look unstable for automatic period assignment; keep for manual review.',
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

function countByEra(decisions: PreparedDecision[]) {
  const counts = new Map<string, number>()
  for (const decision of decisions) counts.set(decision.era_slug, (counts.get(decision.era_slug) || 0) + 1)
  return [...counts.entries()]
    .map(([era_slug, count]) => ({ era_slug, count }))
    .sort((a, b) => b.count - a.count || a.era_slug.localeCompare(b.era_slug))
}

function decisionRows(decisions: PreparedDecision[]) {
  return decisions
    .map(
      decision =>
        `  (${sqlString(decision.slug)}, ${sqlString(decision.era_slug)}, 'year-unique-a', ${sqlString(decision.reason)})`
    )
    .join(',\n')
}

function rollbackRows(decisions: PreparedDecision[]) {
  return decisions.map(decision => `  (${sqlString(decision.slug)}, ${sqlString(decision.era_slug)})`).join(',\n')
}

function buildMigration(decisions: PreparedDecision[]) {
  return `-- ============================================================
-- V16: Normalize Year Unique A building era metadata
-- Source: docs/archive/data-governance/ERA_SLUG_YEAR_UNIQUE_A_WRITE_REPORT.md
-- Scope: ${decisions.length} reviewed pre-1980 year-unique records.
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
${decisionRows(decisions)};

DO $$
DECLARE
  expected_count integer := ${decisions.length};
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
`
}

function buildRollback(decisions: PreparedDecision[]) {
  return `-- Rollback for V16 Year Unique A era metadata.
-- Review before running; this only clears exact slug + era pairs from this batch.

BEGIN;

CREATE TEMP TABLE era_slug_year_unique_a_rollback (
  slug text PRIMARY KEY,
  era_slug text NOT NULL
) ON COMMIT DROP;

INSERT INTO era_slug_year_unique_a_rollback (slug, era_slug) VALUES
${rollbackRows(decisions)};

DELETE FROM public.building_eras AS relation
USING public.buildings AS building, era_slug_year_unique_a_rollback AS decision
WHERE relation.building_id = building.id
  AND building.slug = decision.slug
  AND relation.era_slug = decision.era_slug;

UPDATE public.buildings AS building
SET
  era_slug = NULL,
  updated_at = now()
FROM era_slug_year_unique_a_rollback AS decision
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
  const counts = countByEra(report.decisions)
  const lines = [
    '# Era Slug Year Unique A Write Report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Scope',
    '',
    '- This batch writes only unassigned buildings whose `year_start` fits exactly one current era range.',
    '- This batch is intentionally limited to pre-1980 eras: `renaissance`, `neoclassical`, `industrial-revolution`, `early-modern`, `modern`, and `post-war`.',
    '- It excludes weak identity records, known duplicate-like records, and records whose source year may describe an older host building rather than the architectural intervention.',
    '- It does not touch `year-overlap`, `missing-year`, `postmodern`, or `contemporary` candidates.',
    '',
    '## Summary',
    '',
    `- Writable decisions: ${report.decisions.length}`,
    `- Excluded from automatic write: ${report.excluded.length}`,
    `- Migration: \`db/migrations/v16-normalize-year-unique-a-era-slugs.sql\``,
    `- Rollback SQL: \`reports/era-slug-year-unique-a-rollback.sql\``,
    '',
    '## Distribution',
    '',
    '| era_slug | Count |',
    '|---|---:|',
  ]

  for (const item of counts) lines.push(`| ${item.era_slug} | ${item.count} |`)

  lines.push('', '## Manual Exclusions', '', '| Building | Year | Candidate era | Reason |', '|---|---:|---|---|')
  for (const item of report.excluded) {
    lines.push(`| ${item.slug} | ${item.year_start} | ${item.era_slug} | ${item.exclusion_reason.replaceAll('|', '\\|')} |`)
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
  lines.push('- Run `npm run data:audit`, `npm run typecheck`, `npm run lint`, and `git diff --check`.')
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
      if (candidateEras.length !== 1) return []
      const eraSlug = candidateEras[0]
      if (!ALLOWED_ERA_SLUGS.has(eraSlug)) return []
      return [
        {
          slug: building.slug,
          name: displayName(building),
          year_start: year,
          era_slug: eraSlug,
          reason: `year_start ${year} fits exactly one current era range: ${eraSlug}`,
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
      allowed_era_slugs: [...ALLOWED_ERA_SLUGS],
      manual_exclusions: MANUAL_EXCLUSIONS,
    },
    counts: {
      candidate_count: candidates.length,
      writable_decision_count: decisions.length,
      excluded_count: excluded.length,
      distribution: countByEra(decisions),
    },
    decisions,
    excluded,
  }

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))
  fs.writeFileSync(ARCHIVE_REPORT, markdownReport(report))
  fs.writeFileSync(MIGRATION_PATH, buildMigration(decisions))
  fs.writeFileSync(ROLLBACK_SQL, buildRollback(decisions))

  console.log('Era slug Year Unique A preparation complete')
  console.log(`- candidate rows: ${candidates.length}`)
  console.log(`- writable decisions: ${decisions.length}`)
  console.log(`- excluded rows: ${excluded.length}`)
  for (const item of countByEra(decisions)) console.log(`- ${item.era_slug}: ${item.count}`)
  console.log(`- migration: ${path.relative(ROOT, MIGRATION_PATH)}`)
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
  console.log(`- archive report: ${path.relative(ROOT, ARCHIVE_REPORT)}`)
  console.log(`- rollback: ${path.relative(ROOT, ROLLBACK_SQL)}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
