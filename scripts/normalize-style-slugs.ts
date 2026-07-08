import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { ensureReportDir, fetchAll, getSupabaseClient, ROOT } from './supabase-script-utils'

type Style = {
  slug: string
}

type Building = {
  id: string
  slug: string
  name_zh: string | null
  name_en: string | null
  style_slugs: string[] | null
}

type BuildingChange = {
  id: string
  slug: string
  name: string
  before: string[]
  after: string[]
  replacements: Array<{ from: string; to: string }>
  duplicatesRemoved: string[]
}

type RemainingOrphan = {
  value: string
  count: number
  buildings: string[]
}

type InvalidAliasTarget = {
  alias: string
  target: string
}

type AuditResult = {
  status: number | null
  totalIssues?: number
  errorCount?: number
  errorByField?: Record<string, number>
}

type Report = {
  generatedAt: string
  mode: 'dry-run' | 'write'
  totalBuildings: number
  updatedBuildings: number
  updatedAssignments: number
  removedDuplicates: number
  invalidAliasTargets: InvalidAliasTarget[]
  remainingOrphanStyles: RemainingOrphan[]
  changes: BuildingChange[]
  auditAfterWrite?: AuditResult
}

const WRITE = process.argv.includes('--write')
const REPORT_DIR = ensureReportDir()
const REPORT_JSON = path.join(REPORT_DIR, 'style-slug-normalization.json')
const REPORT_MD = path.join(REPORT_DIR, 'style-slug-normalization.md')
const REPORT_SQL = path.join(REPORT_DIR, 'style-slug-normalization.sql')
const MIGRATION_SQL = path.join(ROOT, 'db/migrations/v6-normalize-remaining-style-slugs.sql')
const ALIASES_PATH = path.join(ROOT, 'scripts/style-slug-aliases.json')

function readAliases() {
  return JSON.parse(fs.readFileSync(ALIASES_PATH, 'utf8')) as Record<string, string>
}

function uniqueValues(values: string[]) {
  const seen = new Set<string>()
  const result: string[] = []
  const duplicates: string[] = []

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.push(value)
      continue
    }
    seen.add(value)
    result.push(value)
  }

  return { result, duplicates }
}

function arrayEquals(a: string[], b: string[]) {
  return a.length === b.length && a.every((value, index) => value === b[index])
}

function sqlString(value: string) {
  return `'${value.replaceAll("'", "''")}'`
}

function sqlArray(values: string[]) {
  return `ARRAY[${values.map(sqlString).join(', ')}]::text[]`
}

function generateSql(changes: BuildingChange[]) {
  const lines = [
    '-- ============================================================',
    '-- V6: Normalize remaining orphan style_slugs',
    '-- Generated from scripts/style-slug-aliases.json',
    '-- This data migration is idempotent and preserves unrelated assignments.',
    '-- ============================================================',
    '',
  ]

  if (!changes.length) {
    lines.push('-- No style_slug changes were required.')
  } else {
    for (const change of changes) {
      for (const replacement of change.replacements) {
        lines.push(
          `UPDATE buildings SET style_slugs = array_replace(style_slugs, ${sqlString(replacement.from)}, ${sqlString(replacement.to)}) WHERE slug = ${sqlString(change.slug)} AND ${sqlString(replacement.from)} = ANY(style_slugs);`
        )
      }
      if (change.duplicatesRemoved.length) {
        lines.push(`UPDATE buildings SET style_slugs = ${sqlArray(change.after)} WHERE slug = ${sqlString(change.slug)};`)
      }
    }
  }

  lines.push('')
  return lines.join('\n')
}

function markdownReport(report: Report) {
  const lines = [
    '# Style Slug Normalization',
    '',
    `Generated: ${report.generatedAt}`,
    `Mode: ${report.mode}`,
    '',
    '## Summary',
    '',
    `- Total buildings: ${report.totalBuildings}`,
    `- Updated buildings: ${report.updatedBuildings}`,
    `- Updated assignments: ${report.updatedAssignments}`,
    `- Removed duplicates: ${report.removedDuplicates}`,
    `- Invalid alias targets: ${report.invalidAliasTargets.length}`,
    `- Remaining orphan style values: ${report.remainingOrphanStyles.length}`,
    '',
  ]

  if (report.auditAfterWrite) {
    lines.push('## Audit After Write')
    lines.push('')
    lines.push(`- Exit status: ${report.auditAfterWrite.status}`)
    lines.push(`- Total issues: ${report.auditAfterWrite.totalIssues ?? 'unknown'}`)
    lines.push(`- Error count: ${report.auditAfterWrite.errorCount ?? 'unknown'}`)
    lines.push(`- Error by field: ${JSON.stringify(report.auditAfterWrite.errorByField ?? {})}`)
    lines.push('')
  }

  lines.push('## Invalid Alias Targets')
  lines.push('')
  if (!report.invalidAliasTargets.length) {
    lines.push('None.')
  } else {
    lines.push('| Alias | Target |')
    lines.push('|---|---|')
    for (const item of report.invalidAliasTargets) {
      lines.push(`| ${item.alias} | ${item.target} |`)
    }
  }

  lines.push('', '## Remaining Orphan Styles', '')
  if (!report.remainingOrphanStyles.length) {
    lines.push('None.')
  } else {
    lines.push('| Value | Count | Example buildings |')
    lines.push('|---|---:|---|')
    for (const item of report.remainingOrphanStyles) {
      lines.push(`| ${item.value} | ${item.count} | ${item.buildings.slice(0, 12).join(', ')} |`)
    }
  }

  lines.push('', '## Updated Buildings', '')
  if (!report.changes.length) {
    lines.push('None.')
  } else {
    lines.push('| Building | Name | Before | After | Replacements | Duplicates removed |')
    lines.push('|---|---|---|---|---|---|')
    for (const change of report.changes) {
      const replacements = change.replacements.map(item => `${item.from} -> ${item.to}`).join('; ')
      lines.push(`| ${change.slug} | ${change.name} | ${change.before.join(', ')} | ${change.after.join(', ')} | ${replacements} | ${change.duplicatesRemoved.join(', ') || 'None'} |`)
    }
  }

  lines.push('')
  return lines.join('\n')
}

function summarizeAudit(status: number | null): AuditResult {
  const result: AuditResult = { status }
  const auditPath = path.join(REPORT_DIR, 'data-audit.json')
  if (!fs.existsSync(auditPath)) return result

  const audit = JSON.parse(fs.readFileSync(auditPath, 'utf8')) as { issues?: Array<{ severity: string; field: string }> }
  const issues = audit.issues || []
  result.totalIssues = issues.length
  result.errorByField = {}
  result.errorCount = 0

  for (const issue of issues) {
    if (issue.severity !== 'error') continue
    result.errorCount += 1
    result.errorByField[issue.field] = (result.errorByField[issue.field] || 0) + 1
  }

  return result
}

async function main() {
  const aliases = readAliases()
  const [styles, buildings] = await Promise.all([
    fetchAll<Style>('styles'),
    fetchAll<Building>('buildings'),
  ])
  const validStyles = new Set(styles.map(style => style.slug))
  const invalidAliasTargets = Object.entries(aliases)
    .filter(([, target]) => !validStyles.has(target))
    .map(([alias, target]) => ({ alias, target }))

  if (invalidAliasTargets.length) {
    const report: Report = {
      generatedAt: new Date().toISOString(),
      mode: WRITE ? 'write' : 'dry-run',
      totalBuildings: buildings.length,
      updatedBuildings: 0,
      updatedAssignments: 0,
      removedDuplicates: 0,
      invalidAliasTargets,
      remainingOrphanStyles: [],
      changes: [],
    }
    fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
    fs.writeFileSync(REPORT_MD, markdownReport(report))
    throw new Error(`Invalid style alias targets: ${invalidAliasTargets.map(item => `${item.alias}->${item.target}`).join(', ')}`)
  }

  const changes: BuildingChange[] = []
  const remainingOrphans = new Map<string, string[]>()
  let updatedAssignments = 0
  let removedDuplicates = 0

  for (const building of buildings) {
    const before = building.style_slugs || []
    const replacements: BuildingChange['replacements'] = []
    const mapped = before.map(style => {
      const target = aliases[style]
      if (!target) return style
      updatedAssignments += 1
      replacements.push({ from: style, to: target })
      return target
    })
    const { result: after, duplicates } = uniqueValues(mapped)
    removedDuplicates += duplicates.length

    for (const style of after) {
      if (validStyles.has(style)) continue
      const list = remainingOrphans.get(style) || []
      list.push(building.slug)
      remainingOrphans.set(style, list)
    }

    if (!replacements.length && !duplicates.length && arrayEquals(before, after)) continue

    changes.push({
      id: building.id,
      slug: building.slug,
      name: building.name_zh || building.name_en || '',
      before,
      after,
      replacements,
      duplicatesRemoved: duplicates,
    })
  }

  const remainingOrphanStyles = [...remainingOrphans.entries()]
    .map(([value, buildingSlugs]) => ({ value, count: buildingSlugs.length, buildings: buildingSlugs }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))

  if (WRITE && changes.length) {
    const supabase = getSupabaseClient()
    for (const change of changes) {
      const { error } = await supabase
        .from('buildings')
        .update({ style_slugs: change.after })
        .eq('id', change.id)
      if (error) throw new Error(`${change.slug}: ${error.message}`)
    }
  }

  const sql = generateSql(changes)
  fs.writeFileSync(REPORT_SQL, sql)
  if (WRITE && changes.length) fs.writeFileSync(MIGRATION_SQL, sql)

  let auditAfterWrite: AuditResult | undefined
  if (WRITE) {
    const result = spawnSync('npm', ['run', 'data:audit'], {
      cwd: ROOT,
      stdio: 'inherit',
      shell: false,
    })
    auditAfterWrite = summarizeAudit(result.status)
  }

  const report: Report = {
    generatedAt: new Date().toISOString(),
    mode: WRITE ? 'write' : 'dry-run',
    totalBuildings: buildings.length,
    updatedBuildings: changes.length,
    updatedAssignments,
    removedDuplicates,
    invalidAliasTargets,
    remainingOrphanStyles,
    changes,
    auditAfterWrite,
  }

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))

  console.log(`${WRITE ? 'Applied' : 'Dry-run'} style_slug normalization`)
  console.log(`- updated buildings: ${changes.length}`)
  console.log(`- updated assignments: ${updatedAssignments}`)
  console.log(`- removed duplicates: ${removedDuplicates}`)
  console.log(`- invalid alias targets: ${invalidAliasTargets.length}`)
  console.log(`- remaining orphan style values: ${remainingOrphanStyles.length}`)
  if (auditAfterWrite) {
    console.log(`- audit errors after write: ${auditAfterWrite.errorCount ?? 'unknown'}`)
  }
  console.log(`- ${path.relative(ROOT, REPORT_JSON)}`)
  console.log(`- ${path.relative(ROOT, REPORT_MD)}`)
  console.log(`- ${path.relative(ROOT, REPORT_SQL)}`)
  if (WRITE) console.log(`- ${path.relative(ROOT, MIGRATION_SQL)}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
