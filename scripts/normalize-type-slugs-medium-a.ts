import fs from 'node:fs'
import path from 'node:path'
import { ensureReportDir, fetchAll, getSupabaseClient, ROOT } from './supabase-script-utils'

type Building = {
  id: string
  slug: string
  name_zh: string | null
  name_en: string | null
  type_slug: string | null
}

type BuildingType = {
  slug: string
}

type ReviewCandidate = {
  slug: string
  name: string
  candidate: string
  subtype: string
  evidence: string
  category: 'A' | 'B' | 'C'
  reason: string
  suggestedRule: string
}

type MediumReview = {
  totalBuildings: number
  missingTypeSlug: number
  mediumCandidates: ReviewCandidate[]
  manualCount: number
}

type PlannedWrite = {
  id: string
  slug: string
  name: string
  to: string
  subtype: string
  evidence: string
  reason: string
  suggestedRule: string
}

type ExcludedCandidate = Omit<PlannedWrite, 'id'> & {
  reason: string
}

const WRITE = process.argv.includes('--write')
const REPORT_DIR = ensureReportDir()
const REVIEW_JSON = path.join(REPORT_DIR, 'type-slug-medium-review.json')
const REPORT_JSON = path.join(REPORT_DIR, 'type-slug-medium-a-normalization.json')
const REPORT_MD = path.join(ROOT, 'TYPE_SLUG_MEDIUM_A_WRITE_REPORT.md')
const MIGRATION_SQL = path.join(ROOT, 'db/migrations/v10-normalize-medium-a-type-slugs.sql')
const ROLLBACK_SQL = path.join(ROOT, 'db/migrations/v10-normalize-medium-a-type-slugs-rollback.sql')

const sprint03SafetyExclusions = new Set([
  'asilo-santelia',
  'casa-das-historias-paula-rego',
  'casa-de-cha-da-boa',
  'casa-do-benin',
  'casa-roberto-ivens-casa',
  'cuadra-san-cristobal',
])

function sqlString(value: string) {
  return `'${value.replaceAll("'", "''")}'`
}

function formatPercent(numerator: number, denominator: number) {
  if (!denominator) return '0.00%'
  return `${((numerator / denominator) * 100).toFixed(2)}%`
}

function distribution(items: Array<{ typeSlug: string }>) {
  const counts = new Map<string, number>()
  for (const item of items) counts.set(item.typeSlug, (counts.get(item.typeSlug) || 0) + 1)
  return [...counts.entries()]
    .map(([typeSlug, count]) => ({ typeSlug, count }))
    .sort((a, b) => b.count - a.count || a.typeSlug.localeCompare(b.typeSlug))
}

function readReview() {
  if (!fs.existsSync(REVIEW_JSON)) {
    throw new Error(`Missing Sprint 05 review file: ${path.relative(ROOT, REVIEW_JSON)}`)
  }
  const parsed = JSON.parse(fs.readFileSync(REVIEW_JSON, 'utf8')) as MediumReview
  return parsed
}

function generateMigration(changes: PlannedWrite[]) {
  const lines = [
    '-- ============================================================',
    '-- V10: Normalize Sprint 05 medium-confidence A type_slug candidates',
    '-- Source: scripts/normalize-type-slugs-medium-a.ts',
    '-- Scope: Sprint 05 category A only; B/C/manual candidates excluded.',
    '-- Idempotent: updates only rows where type_slug IS NULL.',
    '-- Rollback: db/migrations/v10-normalize-medium-a-type-slugs-rollback.sql',
    '-- ============================================================',
    '',
  ]

  if (!changes.length) {
    lines.push('-- No type_slug changes were required.')
  } else {
    lines.push('BEGIN;')
    for (const change of changes) {
      lines.push(
        `UPDATE buildings SET type_slug = ${sqlString(change.to)} WHERE slug = ${sqlString(change.slug)} AND type_slug IS NULL;`
      )
    }
    lines.push('COMMIT;')
  }

  lines.push('')
  return lines.join('\n')
}

function generateRollback(changes: PlannedWrite[]) {
  const lines = [
    '-- ============================================================',
    '-- Rollback for V10 medium-confidence A type_slug normalization',
    '-- This only clears values written by the matching forward migration.',
    '-- ============================================================',
    '',
  ]

  if (!changes.length) {
    lines.push('-- No rollback changes are required.')
  } else {
    lines.push('BEGIN;')
    for (const change of changes) {
      lines.push(
        `UPDATE buildings SET type_slug = NULL WHERE slug = ${sqlString(change.slug)} AND type_slug = ${sqlString(change.to)};`
      )
    }
    lines.push('COMMIT;')
  }

  lines.push('')
  return lines.join('\n')
}

function markdownReport(report: {
  generatedAt: string
  mode: 'dry-run' | 'write'
  totalBuildings: number
  missingBefore: number
  reviewACandidates: number
  plannedCount: number
  actualWriteCount?: number
  skippedCandidates: ExcludedCandidate[]
  plannedDistribution: Array<{ typeSlug: string; count: number }>
  changes: PlannedWrite[]
  missingAfter?: number
  coverageAfter?: string
  fullTypeDistributionAfter?: Array<{ typeSlug: string; count: number }>
}) {
  const lines = [
    '# Type Slug Medium A Write Report',
    '',
    `Generated: ${report.generatedAt}`,
    `Mode: ${report.mode}`,
    '',
    '## Scope',
    '',
    '- Only Sprint 05 category A candidates were eligible for write.',
    '- Sprint 05 category B, category C, and manual/no-rule candidates were not written.',
    '- No building_types were added.',
    '- No country_code or era_slug records were processed.',
    '',
    '## Pre-Write Summary',
    '',
    `- Total buildings: ${report.totalBuildings}`,
    `- Missing type_slug before: ${report.missingBefore}`,
    `- Sprint 05 A candidates: ${report.reviewACandidates}`,
    `- Planned writes after safety validation: ${report.plannedCount}`,
    `- Safety exclusions / skips: ${report.skippedCandidates.length}`,
  ]

  if (typeof report.actualWriteCount === 'number') {
    lines.push(`- Actual writes: ${report.actualWriteCount}`)
  }

  lines.push('', '## Planned Type Distribution', '', '| type_slug | Count |', '|---|---:|')
  for (const item of report.plannedDistribution) lines.push(`| ${item.typeSlug} | ${item.count} |`)

  if (report.mode === 'write') {
    lines.push('', '## Post-Write Summary', '')
    lines.push(`- Remaining missing type_slug: ${report.missingAfter ?? 'unknown'}`)
    lines.push(`- New type_slug coverage: ${report.coverageAfter ?? 'unknown'}`)
  }

  if (report.fullTypeDistributionAfter?.length) {
    lines.push('', '## Type Distribution Top 20 After Write', '', '| type_slug | Count |', '|---|---:|')
    for (const item of report.fullTypeDistributionAfter.slice(0, 20)) lines.push(`| ${item.typeSlug} | ${item.count} |`)
  }

  lines.push('', '## Safety Exclusions / Skips', '')
  if (!report.skippedCandidates.length) {
    lines.push('None.')
  } else {
    lines.push('| Building | Name | Candidate | Evidence | Reason |')
    lines.push('|---|---|---|---|---|')
    for (const item of report.skippedCandidates) {
      lines.push(`| ${item.slug} | ${item.name} | ${item.to} | ${item.evidence} | ${item.reason} |`)
    }
  }

  lines.push('', '## Migration Files', '')
  lines.push('- Forward migration: `db/migrations/v10-normalize-medium-a-type-slugs.sql`')
  lines.push('- Rollback migration: `db/migrations/v10-normalize-medium-a-type-slugs-rollback.sql`')
  lines.push('- Forward migration updates only `type_slug IS NULL` rows.')
  lines.push('- Rollback migration clears only exact slugs written by this sprint.')

  lines.push('', '## Written Records', '', '| Building | Name | type_slug | Subtype | Evidence | Reason |')
  lines.push('|---|---|---|---|---|---|')
  for (const change of report.changes) {
    lines.push(
      `| ${change.slug} | ${change.name} | ${change.to} | ${change.subtype} | ${change.evidence} | ${change.reason} |`
    )
  }

  lines.push('')
  return lines.join('\n')
}

async function main() {
  const review = readReview()
  const [buildings, buildingTypes] = await Promise.all([
    fetchAll<Building>('buildings'),
    fetchAll<BuildingType>('building_types'),
  ])

  const buildingsBySlug = new Map(buildings.map(building => [building.slug, building]))
  const validTypes = new Set(buildingTypes.map(type => type.slug))
  const missingBefore = buildings.filter(building => !building.type_slug).length
  const reviewACandidates = review.mediumCandidates.filter(candidate => candidate.category === 'A')

  const plannedWrites: PlannedWrite[] = []
  const skippedCandidates: ExcludedCandidate[] = []

  for (const candidate of reviewACandidates) {
    const building = buildingsBySlug.get(candidate.slug)
    const skipBase = {
      slug: candidate.slug,
      name: candidate.name,
      to: candidate.candidate,
      subtype: candidate.subtype,
      evidence: candidate.evidence,
      suggestedRule: candidate.suggestedRule,
    }

    if (!building) {
      skippedCandidates.push({ ...skipBase, reason: 'Building no longer exists in database.' })
      continue
    }
    if (building.type_slug) {
      skippedCandidates.push({ ...skipBase, reason: `Building already has type_slug: ${building.type_slug}.` })
      continue
    }
    if (!validTypes.has(candidate.candidate)) {
      skippedCandidates.push({ ...skipBase, reason: 'Target type_slug does not exist in building_types.' })
      continue
    }
    if (sprint03SafetyExclusions.has(candidate.slug)) {
      skippedCandidates.push({ ...skipBase, reason: 'Blocked by Sprint 03 safety exclusion list.' })
      continue
    }

    plannedWrites.push({
      id: building.id,
      slug: building.slug,
      name: candidate.name || building.name_zh || building.name_en || building.slug,
      to: candidate.candidate,
      subtype: candidate.subtype,
      evidence: candidate.evidence,
      reason: candidate.reason,
      suggestedRule: candidate.suggestedRule,
    })
  }

  fs.writeFileSync(MIGRATION_SQL, generateMigration(plannedWrites))
  fs.writeFileSync(ROLLBACK_SQL, generateRollback(plannedWrites))

  let actualWriteCount: number | undefined
  if (WRITE) {
    actualWriteCount = 0
    const supabase = getSupabaseClient()
    for (const change of plannedWrites) {
      const { data, error } = await supabase
        .from('buildings')
        .update({ type_slug: change.to })
        .eq('id', change.id)
        .is('type_slug', null)
        .select('id')
      if (error) throw new Error(`${change.slug}: ${error.message}`)
      actualWriteCount += data?.length || 0
    }
  }

  let missingAfter: number | undefined
  let coverageAfter: string | undefined
  let fullTypeDistributionAfter: Array<{ typeSlug: string; count: number }> | undefined
  if (WRITE) {
    const afterBuildings = await fetchAll<Building>('buildings')
    missingAfter = afterBuildings.filter(building => !building.type_slug).length
    coverageAfter = formatPercent(afterBuildings.length - missingAfter, afterBuildings.length)
    fullTypeDistributionAfter = distribution(
      afterBuildings
        .filter((building): building is Building & { type_slug: string } => Boolean(building.type_slug))
        .map(building => ({ typeSlug: building.type_slug }))
    )
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: WRITE ? ('write' as const) : ('dry-run' as const),
    totalBuildings: buildings.length,
    missingBefore,
    reviewACandidates: reviewACandidates.length,
    plannedCount: plannedWrites.length,
    actualWriteCount,
    skippedCandidates,
    plannedDistribution: distribution(plannedWrites.map(change => ({ typeSlug: change.to }))),
    changes: plannedWrites,
    missingAfter,
    coverageAfter,
    fullTypeDistributionAfter,
  }

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))

  console.log(`${WRITE ? 'Applied' : 'Dry-run'} Sprint 05 A type_slug normalization`)
  console.log(`- missing before: ${missingBefore}`)
  console.log(`- Sprint 05 A candidates: ${reviewACandidates.length}`)
  console.log(`- planned writes: ${plannedWrites.length}`)
  console.log(`- safety exclusions / skips: ${skippedCandidates.length}`)
  if (WRITE) {
    console.log(`- actual writes: ${actualWriteCount}`)
    console.log(`- remaining missing type_slug: ${missingAfter}`)
    console.log(`- new type_slug coverage: ${coverageAfter}`)
  }
  console.log(`- migration: ${path.relative(ROOT, MIGRATION_SQL)}`)
  console.log(`- rollback: ${path.relative(ROOT, ROLLBACK_SQL)}`)
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
