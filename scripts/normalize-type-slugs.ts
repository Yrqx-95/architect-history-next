import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { ensureReportDir, fetchAll, getSupabaseClient, normalizeKey, ROOT } from './supabase-script-utils'

type BuildingType = {
  slug: string
  name_zh: string | null
  name_en: string | null
  name_ja: string | null
}

type Building = {
  id: string
  slug: string
  name_zh: string | null
  name_en: string | null
  type_slug: string | null
}

type PlannedChange = {
  id: string
  slug: string
  name: string
  from: string
  to: string
}

const WRITE = process.argv.includes('--write')
const REPORT_JSON = path.join(ensureReportDir(), 'type-slug-normalization.json')
const REPORT_MD = path.join(ensureReportDir(), 'type-slug-normalization.md')

const explicitAliases: Record<string, string> = {
  '混合用途建筑': 'mixed-use',
  '多功能建筑': 'mixed-use',
}

function buildTypeMap(types: BuildingType[]) {
  const map = new Map<string, string>()
  for (const type of types) {
    for (const value of [type.slug, type.name_zh, type.name_en, type.name_ja]) {
      if (value) map.set(normalizeKey(value), type.slug)
    }
  }
  for (const [label, slug] of Object.entries(explicitAliases)) {
    if (types.some(type => type.slug === slug)) map.set(normalizeKey(label), slug)
  }
  return map
}

function markdownReport(report: {
  mode: 'dry-run' | 'write'
  generatedAt: string
  totalBuildings: number
  changedCount: number
  unmapped: Array<{ value: string; count: number; buildings: string[] }>
  changes: PlannedChange[]
}) {
  const lines = [
    '# Type Slug Normalization',
    '',
    `Generated: ${report.generatedAt}`,
    `Mode: ${report.mode}`,
    '',
    '## Summary',
    '',
    `- Total buildings: ${report.totalBuildings}`,
    `- Planned changes: ${report.changedCount}`,
    `- Unmapped type values: ${report.unmapped.length}`,
    '',
    '## Unmapped Values',
    '',
  ]

  if (!report.unmapped.length) {
    lines.push('None.')
  } else {
    lines.push('| Value | Count | Example buildings |')
    lines.push('|---|---:|---|')
    for (const item of report.unmapped) {
      lines.push(`| ${item.value} | ${item.count} | ${item.buildings.slice(0, 8).join(', ')} |`)
    }
  }

  lines.push('', '## Planned Changes', '')
  if (!report.changes.length) {
    lines.push('None.')
  } else {
    lines.push('| Building | Name | From | To |')
    lines.push('|---|---|---|---|')
    for (const change of report.changes) {
      lines.push(`| ${change.slug} | ${change.name || ''} | ${change.from} | ${change.to} |`)
    }
  }
  lines.push('')
  return lines.join('\n')
}

async function main() {
  const [types, buildings] = await Promise.all([
    fetchAll<BuildingType>('building_types'),
    fetchAll<Building>('buildings'),
  ])
  const validSlugs = new Set(types.map(type => type.slug))
  const typeMap = buildTypeMap(types)
  const changes: PlannedChange[] = []
  const unmappedByValue = new Map<string, string[]>()

  for (const building of buildings) {
    if (!building.type_slug || validSlugs.has(building.type_slug)) continue
    const mapped = typeMap.get(normalizeKey(building.type_slug))
    if (mapped) {
      changes.push({
        id: building.id,
        slug: building.slug,
        name: building.name_zh || building.name_en || '',
        from: building.type_slug,
        to: mapped,
      })
    } else {
      const list = unmappedByValue.get(building.type_slug) || []
      list.push(building.slug)
      unmappedByValue.set(building.type_slug, list)
    }
  }

  if (WRITE && changes.length) {
    const supabase = getSupabaseClient()
    for (const change of changes) {
      const { error } = await supabase
        .from('buildings')
        .update({ type_slug: change.to })
        .eq('id', change.id)
      if (error) throw new Error(`${change.slug}: ${error.message}`)
    }
  }

  const unmapped = [...unmappedByValue.entries()]
    .map(([value, buildingSlugs]) => ({ value, count: buildingSlugs.length, buildings: buildingSlugs }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))

  const report = {
    generatedAt: new Date().toISOString(),
    mode: WRITE ? 'write' as const : 'dry-run' as const,
    totalBuildings: buildings.length,
    changedCount: changes.length,
    unmapped,
    changes,
  }

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))

  console.log(`${WRITE ? 'Applied' : 'Dry-run'} type_slug normalization`)
  console.log(`- planned changes: ${changes.length}`)
  console.log(`- unmapped values: ${unmapped.length}`)
  console.log(`- ${path.relative(ROOT, REPORT_JSON)}`)
  console.log(`- ${path.relative(ROOT, REPORT_MD)}`)

  if (WRITE) {
    const result = spawnSync('npm', ['run', 'data:audit'], {
      cwd: ROOT,
      stdio: 'inherit',
      shell: false,
    })
    process.exitCode = result.status || 0
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
