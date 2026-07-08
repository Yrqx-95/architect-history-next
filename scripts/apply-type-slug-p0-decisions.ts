import fs from 'node:fs'
import path from 'node:path'
import { fetchAll, getSupabaseClient, ROOT } from './supabase-script-utils'

type Decision = '' | 'yes' | 'no' | 'choose_alternative' | 'needs_external_research'

type ReviewPackItem = {
  building_slug: string
  display_name: string
  recommended_type_slug: string | null
  alternative_type_slug: string | null
  selected_type_slug?: string | null
  final_decision: Decision | string
  confidence_for_human_review: 'high' | 'medium' | 'low'
  recommendation_reason: string
}

type ReviewPack = {
  generatedAt: string
  p0Count: number
  items: ReviewPackItem[]
}

type Building = {
  id: string
  slug: string
  type_slug: string | null
}

type BuildingType = {
  slug: string
}

type PlannedUpdate = {
  id: string
  slug: string
  name: string
  to: string
  decision: 'yes' | 'choose_alternative'
  confidence: 'high' | 'medium' | 'low'
  reason: string
}

type InvalidDecision = {
  slug: string
  name: string
  decision: string
  reason: string
}

type SkippedRecord = {
  slug: string
  name: string
  decision: 'no' | 'needs_external_research' | 'already_has_type_slug'
  reason: string
}

const WRITE = process.argv.includes('--write')
const ALLOW_PARTIAL = process.argv.includes('--allow-partial')
const PACK_JSON = path.join(ROOT, 'reports/type-slug-p0-review-pack.json')
const REPORT_JSON = path.join(ROOT, 'reports/type-slug-p0-decision-write-report.json')
const REPORT_MD = path.join(ROOT, 'TYPE_SLUG_P0_DECISION_WRITE_REPORT.md')
const MIGRATION_SQL = path.join(ROOT, 'db/migrations/v11-apply-p0-type-slug-decisions.sql')
const ROLLBACK_SQL = path.join(ROOT, 'db/migrations/v11-apply-p0-type-slug-decisions-rollback.sql')
const allowedDecisions = new Set(['yes', 'no', 'choose_alternative', 'needs_external_research'])

function sqlString(value: string) {
  return `'${value.replaceAll("'", "''")}'`
}

function readPack() {
  if (!fs.existsSync(PACK_JSON)) {
    throw new Error(`Missing P0 review pack: ${path.relative(ROOT, PACK_JSON)}`)
  }
  return JSON.parse(fs.readFileSync(PACK_JSON, 'utf8')) as ReviewPack
}

function generateMigration(changes: PlannedUpdate[]) {
  const lines = [
    '-- ============================================================',
    '-- V11: Apply confirmed P0 type_slug decisions',
    '-- Source: scripts/apply-type-slug-p0-decisions.ts',
    '-- Scope: confirmed human decisions only.',
    '-- Idempotent: updates only rows where type_slug IS NULL.',
    '-- Rollback: db/migrations/v11-apply-p0-type-slug-decisions-rollback.sql',
    '-- ============================================================',
    '',
  ]

  if (!changes.length) {
    lines.push('-- No confirmed type_slug changes were present.')
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

function generateRollback(changes: PlannedUpdate[]) {
  const lines = [
    '-- ============================================================',
    '-- Rollback for V11 P0 type_slug decisions',
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

function markdownReport(report: ReturnType<typeof buildReport>) {
  const lines = [
    '# Type Slug P0 Decision Write Report',
    '',
    `Generated: ${report.generatedAt}`,
    `Mode: ${report.mode}`,
    '',
    '## Summary',
    '',
    `- Total records: ${report.totalRecords}`,
    `- Confirmed yes: ${report.confirmedYes}`,
    `- Confirmed choose_alternative: ${report.confirmedChooseAlternative}`,
    `- Skipped no: ${report.skippedNo}`,
    `- Skipped needs_external_research: ${report.skippedNeedsExternalResearch}`,
    `- Empty decisions: ${report.emptyDecisions}`,
    `- Invalid decisions: ${report.invalidDecisions.length}`,
    `- Planned updates: ${report.plannedUpdates.length}`,
    `- Actual writes: ${report.actualWrites ?? 'not run'}`,
    '',
    '## Migration Files',
    '',
    '- Forward migration: `db/migrations/v11-apply-p0-type-slug-decisions.sql`',
    '- Rollback migration: `db/migrations/v11-apply-p0-type-slug-decisions-rollback.sql`',
    '- Forward migration updates only `type_slug IS NULL` rows.',
    '- Rollback migration clears only exact slugs written by this sprint.',
    '',
    '## Planned / Written Updates',
    '',
    '| Building | Name | type_slug | Decision | Confidence | Reason |',
    '|---|---|---|---|---|---|',
  ]

  for (const item of report.plannedUpdates) {
    lines.push(
      `| ${item.slug} | ${item.name} | ${item.to} | ${item.decision} | ${item.confidence} | ${item.reason.replaceAll('|', '\\|')} |`
    )
  }

  lines.push('', '## Invalid Decisions', '')
  if (!report.invalidDecisions.length) {
    lines.push('None.')
  } else {
    lines.push('| Building | Name | Decision | Reason |')
    lines.push('|---|---|---|---|')
    for (const item of report.invalidDecisions) {
      lines.push(`| ${item.slug} | ${item.name} | ${item.decision} | ${item.reason.replaceAll('|', '\\|')} |`)
    }
  }

  lines.push('')
  return lines.join('\n')
}

function buildReport(input: {
  mode: 'dry-run' | 'write'
  totalRecords: number
  confirmedYes: number
  confirmedChooseAlternative: number
  skippedNo: number
  skippedNeedsExternalResearch: number
  emptyDecisions: number
  invalidDecisions: InvalidDecision[]
  plannedUpdates: PlannedUpdate[]
  skippedRecords: SkippedRecord[]
  actualWrites?: number
}) {
  return {
    generatedAt: new Date().toISOString(),
    ...input,
  }
}

async function main() {
  const pack = readPack()
  const [buildings, buildingTypes] = await Promise.all([
    fetchAll<Building>('buildings'),
    fetchAll<BuildingType>('building_types'),
  ])
  const buildingBySlug = new Map(buildings.map(building => [building.slug, building]))
  const validTypes = new Set(buildingTypes.map(type => type.slug))

  let confirmedYes = 0
  let confirmedChooseAlternative = 0
  let skippedNo = 0
  let skippedNeedsExternalResearch = 0
  let emptyDecisions = 0
  const invalidDecisions: InvalidDecision[] = []
  const skippedRecords: SkippedRecord[] = []
  const plannedUpdates: PlannedUpdate[] = []

  for (const item of pack.items) {
    const decision = String(item.final_decision || '').trim()
    const building = buildingBySlug.get(item.building_slug)

    if (!decision) {
      emptyDecisions += 1
      continue
    }

    if (!allowedDecisions.has(decision)) {
      invalidDecisions.push({
        slug: item.building_slug,
        name: item.display_name,
        decision,
        reason: 'final_decision must be yes, no, choose_alternative, or needs_external_research.',
      })
      continue
    }

    if (!building) {
      invalidDecisions.push({
        slug: item.building_slug,
        name: item.display_name,
        decision,
        reason: 'Building no longer exists in database.',
      })
      continue
    }

    if (decision === 'no') {
      skippedNo += 1
      skippedRecords.push({ slug: item.building_slug, name: item.display_name, decision: 'no', reason: 'Human rejected recommendation.' })
      continue
    }

    if (decision === 'needs_external_research') {
      skippedNeedsExternalResearch += 1
      skippedRecords.push({
        slug: item.building_slug,
        name: item.display_name,
        decision: 'needs_external_research',
        reason: 'Human deferred pending external research.',
      })
      continue
    }

    if (building.type_slug) {
      skippedRecords.push({
        slug: item.building_slug,
        name: item.display_name,
        decision: 'already_has_type_slug',
        reason: `Current database value is already ${building.type_slug}.`,
      })
      continue
    }

    let target: string | null = null
    if (decision === 'yes') {
      confirmedYes += 1
      target = item.recommended_type_slug
      if (!target) {
        invalidDecisions.push({
          slug: item.building_slug,
          name: item.display_name,
          decision,
          reason: 'yes requires recommended_type_slug.',
        })
        continue
      }
    }

    if (decision === 'choose_alternative') {
      confirmedChooseAlternative += 1
      target = item.selected_type_slug || null
      if (!target) {
        invalidDecisions.push({
          slug: item.building_slug,
          name: item.display_name,
          decision,
          reason: 'choose_alternative requires selected_type_slug.',
        })
        continue
      }
    }

    if (!target || !validTypes.has(target)) {
      invalidDecisions.push({
        slug: item.building_slug,
        name: item.display_name,
        decision,
        reason: `Target type_slug does not exist in building_types: ${target || 'none'}.`,
      })
      continue
    }

    plannedUpdates.push({
      id: building.id,
      slug: item.building_slug,
      name: item.display_name,
      to: target,
      decision: decision as 'yes' | 'choose_alternative',
      confidence: item.confidence_for_human_review,
      reason: item.recommendation_reason,
    })
  }

  if (WRITE && invalidDecisions.length) {
    throw new Error(`Refusing to write because ${invalidDecisions.length} invalid decisions exist.`)
  }
  if (WRITE && emptyDecisions > 0 && !ALLOW_PARTIAL) {
    throw new Error(`Refusing to write with ${emptyDecisions} empty decisions. Pass --allow-partial to write confirmed decisions only.`)
  }

  let actualWrites: number | undefined
  if (WRITE) {
    fs.writeFileSync(MIGRATION_SQL, generateMigration(plannedUpdates))
    fs.writeFileSync(ROLLBACK_SQL, generateRollback(plannedUpdates))

    actualWrites = 0
    const supabase = getSupabaseClient()
    for (const change of plannedUpdates) {
      const { data, error } = await supabase
        .from('buildings')
        .update({ type_slug: change.to })
        .eq('id', change.id)
        .is('type_slug', null)
        .select('id')
      if (error) throw new Error(`${change.slug}: ${error.message}`)
      actualWrites += data?.length || 0
    }
  }

  const report = buildReport({
    mode: WRITE ? 'write' : 'dry-run',
    totalRecords: pack.items.length,
    confirmedYes,
    confirmedChooseAlternative,
    skippedNo,
    skippedNeedsExternalResearch,
    emptyDecisions,
    invalidDecisions,
    plannedUpdates,
    skippedRecords,
    actualWrites,
  })

  if (WRITE) {
    fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
    fs.writeFileSync(REPORT_MD, markdownReport(report))
  }

  console.log(`${WRITE ? 'Applied' : 'Dry-run'} P0 type_slug decisions`)
  console.log(`- total records: ${report.totalRecords}`)
  console.log(`- confirmed yes: ${report.confirmedYes}`)
  console.log(`- confirmed choose_alternative: ${report.confirmedChooseAlternative}`)
  console.log(`- skipped no: ${report.skippedNo}`)
  console.log(`- skipped needs_external_research: ${report.skippedNeedsExternalResearch}`)
  console.log(`- empty decisions: ${report.emptyDecisions}`)
  console.log(`- invalid decisions: ${report.invalidDecisions.length}`)
  console.log(`- planned updates: ${report.plannedUpdates.length}`)
  if (WRITE) {
    console.log(`- actual writes: ${report.actualWrites}`)
    console.log(`- migration: ${path.relative(ROOT, MIGRATION_SQL)}`)
    console.log(`- rollback: ${path.relative(ROOT, ROLLBACK_SQL)}`)
    console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
