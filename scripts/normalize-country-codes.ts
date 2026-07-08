import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { ensureReportDir, fetchAll, getSupabaseClient, ROOT } from './supabase-script-utils'

type Building = {
  id: string
  slug: string
  name_zh: string | null
  name_en: string | null
  country: string | null
  country_code: string | null
  location: string | null
}

type PlannedChange = {
  id: string
  slug: string
  name: string
  to: string
  source: 'country' | 'location'
  evidence: string
}

type AuditResult = {
  status: number | null
  totalIssues?: number
  errorCount?: number
  warningCount?: number
  warningByField?: Record<string, number>
}

const WRITE = process.argv.includes('--write')
const REPORT_DIR = ensureReportDir()
const REPORT_JSON = path.join(REPORT_DIR, 'country-code-normalization.json')
const REPORT_MD = path.join(ROOT, 'COUNTRY_CODE_WRITE_REPORT.md')
const MIGRATION_SQL = path.join(ROOT, 'db/migrations/v7-normalize-country-codes.sql')
const ROLLBACK_SQL = path.join(REPORT_DIR, 'country-code-normalization-rollback.sql')

const countryNameMap = new Map<string, string>(
  Object.entries({
    日本: 'JP',
    美国: 'US',
    美國: 'US',
    法国: 'FR',
    法國: 'FR',
    英国: 'GB',
    英國: 'GB',
    意大利: 'IT',
    義大利: 'IT',
    德国: 'DE',
    德國: 'DE',
    西班牙: 'ES',
    中国: 'CN',
    中國: 'CN',
    中国香港特别行政区: 'HK',
    香港: 'HK',
    印度: 'IN',
    巴西: 'BR',
    瑞士: 'CH',
    芬兰: 'FI',
    芬蘭: 'FI',
    丹麦: 'DK',
    丹麥: 'DK',
    梵蒂冈: 'VA',
    梵蒂岡: 'VA',
    台湾: 'TW',
    台灣: 'TW',
    韩国: 'KR',
    韓國: 'KR',
    新西兰: 'NZ',
    新西蘭: 'NZ',
    阿塞拜疆: 'AZ',
    葡萄牙: 'PT',
    马来西亚: 'MY',
    馬來西亞: 'MY',
    奥地利: 'AT',
    奧地利: 'AT',
    捷克: 'CZ',
    荷兰: 'NL',
    荷蘭: 'NL',
    孟加拉国: 'BD',
    孟加拉國: 'BD',
    俄罗斯: 'RU',
    俄羅斯: 'RU',
    澳大利亚: 'AU',
    澳洲: 'AU',
    加拿大: 'CA',
    墨西哥: 'MX',
    希腊: 'GR',
    希臘: 'GR',
    摩纳哥: 'MC',
    摩納哥: 'MC',
    哥伦比亚: 'CO',
    哥倫比亞: 'CO',
    比利时: 'BE',
    比利時: 'BE',
    以色列: 'IL',
    格鲁吉亚: 'GE',
    喬治亞: 'GE',
    科威特: 'KW',
    伊朗: 'IR',
    乌拉圭: 'UY',
    烏拉圭: 'UY',
    新加坡: 'SG',
    叙利亚: 'SY',
    敘利亞: 'SY',
    埃及: 'EG',
    北马其顿: 'MK',
    北馬其頓: 'MK',
    巴基斯坦: 'PK',
    斯里兰卡: 'LK',
    斯里蘭卡: 'LK',
    波兰: 'PL',
    波蘭: 'PL',
    瑞典: 'SE',
    挪威: 'NO',
    爱尔兰: 'IE',
    愛爾蘭: 'IE',
    阿根廷: 'AR',
    秘鲁: 'PE',
    秘魯: 'PE',
    智利: 'CL',
    南非: 'ZA',
    泰国: 'TH',
    泰國: 'TH',
    菲律宾: 'PH',
    菲律賓: 'PH',
    印度尼西亚: 'ID',
    印尼: 'ID',
    卢森堡: 'LU',
    盧森堡: 'LU',
  })
)

const countryBoxes = [
  ['MC', 43.72, 43.76, 7.4, 7.45],
  ['HK', 22.15, 22.6, 113.8, 114.4],
  ['SG', 1.15, 1.5, 103.6, 104.1],
  ['VA', 41.89, 41.91, 12.44, 12.46],
  ['JP', 24, 46, 122, 146],
  ['KR', 33, 39, 124, 132],
  ['CN', 18, 54, 73, 135],
  ['TW', 21.8, 25.4, 119, 122.5],
  ['MY', 0.5, 7.5, 99, 120],
  ['BD', 20, 27, 88, 93],
  ['IN', 6, 36, 68, 98],
  ['IR', 24, 40, 44, 64],
  ['IL', 29, 34, 34, 36],
  ['GE', 41, 44, 40, 47],
  ['AZ', 38, 42, 44, 51],
  ['KW', 28, 31, 46, 49],
  ['SY', 32, 38, 35, 43],
  ['LK', 5, 10, 79, 82],
  ['TH', 5, 21, 97, 106],
  ['ID', -11, 6, 95, 141],
  ['PH', 4, 21, 116, 127],
  ['GB', 49, 61, -8, 2.5],
  ['IE', 51, 56, -11, -5],
  ['FR', 41, 51, -5.5, 9.8],
  ['ES', 35, 44, -10, 4.5],
  ['PT', 36, 43, -10, -6],
  ['IT', 35, 48, 6, 19],
  ['DE', 47, 55, 5, 16],
  ['NL', 50, 54, 3, 8],
  ['BE', 49, 52, 2, 7],
  ['CH', 45, 48, 5, 11],
  ['AT', 46, 49.5, 9, 17.5],
  ['DK', 54, 58, 8, 15],
  ['FI', 59, 71, 19, 32],
  ['RU', 41, 82, 19, 180],
  ['CZ', 48, 51, 12, 19],
  ['GR', 34, 42, 19, 30],
  ['MK', 40, 43, 20, 24],
  ['PL', 49, 55, 14, 25],
  ['SE', 55, 70, 11, 25],
  ['NO', 57, 72, 4, 32],
  ['LU', 49, 51, 5, 7],
  ['US', 24, 50, -125, -66],
  ['CA', 42, 84, -141, -52],
  ['MX', 14, 33, -118, -86],
  ['BR', -34, 6, -74, -34],
  ['UY', -35, -30, -59, -53],
  ['AR', -56, -21, -74, -53],
  ['CL', -56, -17, -76, -66],
  ['CO', -5, 13, -82, -66],
  ['PE', -19, 1, -82, -68],
  ['AU', -44, -10, 112, 154],
  ['NZ', -48, -34, 165, 179],
  ['EG', 22, 32, 24, 37],
  ['ZA', -35, -22, 16, 33],
].map(([code, minLat, maxLat, minLon, maxLon]) => ({
  code: String(code),
  minLat: Number(minLat),
  maxLat: Number(maxLat),
  minLon: Number(minLon),
  maxLon: Number(maxLon),
  area: (Number(maxLat) - Number(minLat)) * (Number(maxLon) - Number(minLon)),
}))

function parsePoint(hex: string | null) {
  if (!hex || hex.length < 42) return null
  try {
    const buffer = Buffer.from(hex, 'hex')
    const littleEndian = buffer[0] === 1
    const type = littleEndian ? buffer.readUInt32LE(1) : buffer.readUInt32BE(1)
    const offset = (type & 0x20000000) !== 0 ? 9 : 5
    if (buffer.length < offset + 16) return null
    const lon = littleEndian ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset)
    const lat = littleEndian ? buffer.readDoubleLE(offset + 8) : buffer.readDoubleBE(offset + 8)
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null
    return { lat, lon }
  } catch {
    return null
  }
}

function inferCountryCode(building: Building): PlannedChange | null {
  if (building.country_code) return null

  const country = String(building.country || '').trim()
  const mappedCountry = countryNameMap.get(country)
  if (mappedCountry) {
    return {
      id: building.id,
      slug: building.slug,
      name: building.name_zh || building.name_en || '',
      to: mappedCountry,
      source: 'country',
      evidence: country,
    }
  }

  const point = parsePoint(building.location)
  if (!point) return null
  const match = countryBoxes
    .filter(
      box =>
        point.lat >= box.minLat &&
        point.lat <= box.maxLat &&
        point.lon >= box.minLon &&
        point.lon <= box.maxLon
    )
    .sort((a, b) => a.area - b.area)[0]
  if (!match) return null

  return {
    id: building.id,
    slug: building.slug,
    name: building.name_zh || building.name_en || '',
    to: match.code,
    source: 'location',
    evidence: `${point.lat.toFixed(4)}, ${point.lon.toFixed(4)}`,
  }
}

function sqlString(value: string) {
  return `'${value.replaceAll("'", "''")}'`
}

function distribution(changes: PlannedChange[]) {
  const counts = new Map<string, number>()
  for (const change of changes) counts.set(change.to, (counts.get(change.to) || 0) + 1)
  return [...counts.entries()]
    .map(([countryCode, count]) => ({ countryCode, count }))
    .sort((a, b) => b.count - a.count || a.countryCode.localeCompare(b.countryCode))
}

function generateMigration(changes: PlannedChange[]) {
  const lines = [
    '-- ============================================================',
    '-- V7: Normalize high-confidence country_code metadata',
    '-- Source: scripts/normalize-country-codes.ts',
    '-- Scope: high-confidence records only: mapped country label or location point.',
    '-- Idempotent: updates only rows where country_code IS NULL.',
    '-- Rollback: reports/country-code-normalization-rollback.sql',
    '-- ============================================================',
    '',
  ]

  if (!changes.length) {
    lines.push('-- No country_code changes were required.')
  } else {
    lines.push('BEGIN;')
    for (const change of changes) {
      lines.push(
        `UPDATE buildings SET country_code = ${sqlString(change.to)} WHERE slug = ${sqlString(change.slug)} AND country_code IS NULL;`
      )
    }
    lines.push('COMMIT;')
  }

  lines.push('')
  return lines.join('\n')
}

function generateRollback(changes: PlannedChange[]) {
  const lines = [
    '-- ============================================================',
    '-- Rollback for V7 high-confidence country_code normalization',
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
        `UPDATE buildings SET country_code = NULL WHERE slug = ${sqlString(change.slug)} AND country_code = ${sqlString(change.to)};`
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
  plannedCount: number
  sourceBreakdown: Array<{ source: string; count: number }>
  countryDistribution: Array<{ countryCode: string; count: number }>
  changes: PlannedChange[]
  missingAfter?: number
  coverageAfter?: string
  auditAfterWrite?: AuditResult
}) {
  const lines = [
    '# Country Code Write Report',
    '',
    `Generated: ${report.generatedAt}`,
    `Mode: ${report.mode}`,
    '',
    '## Scope',
    '',
    '- Only high-confidence candidates were included.',
    '- High-confidence means either an existing `country` label mapped directly to ISO country code, or a parseable `location` point inside a known country bounding box.',
    '- Medium-confidence text-token candidates and unresolved records were not written.',
    '',
    '## Pre-Write Summary',
    '',
    `- Total buildings: ${report.totalBuildings}`,
    `- Missing country_code before: ${report.missingBefore}`,
    `- Planned high-confidence writes: ${report.plannedCount}`,
    '',
    '## Source Breakdown',
    '',
    '| Source | Count |',
    '|---|---:|',
  ]

  for (const item of report.sourceBreakdown) {
    lines.push(`| ${item.source} | ${item.count} |`)
  }

  lines.push('', '## Country Distribution', '', '| Country code | Count |', '|---|---:|')
  for (const item of report.countryDistribution) {
    lines.push(`| ${item.countryCode} | ${item.count} |`)
  }

  if (report.mode === 'write') {
    lines.push('', '## Post-Write Summary', '')
    lines.push(`- Remaining missing country_code: ${report.missingAfter ?? 'unknown'}`)
    lines.push(`- New country_code coverage: ${report.coverageAfter ?? 'unknown'}`)
    if (report.auditAfterWrite) {
      lines.push(`- data:audit exit status: ${report.auditAfterWrite.status}`)
      if (typeof report.auditAfterWrite.totalIssues === 'number') {
        lines.push(`- data:audit total issues: ${report.auditAfterWrite.totalIssues}`)
      }
      if (typeof report.auditAfterWrite.errorCount === 'number') {
        lines.push(`- data:audit errors: ${report.auditAfterWrite.errorCount}`)
      }
    }
  }

  lines.push('', '## Rollback', '')
  lines.push('- Forward migration: `db/migrations/v7-normalize-country-codes.sql`')
  lines.push('- Rollback SQL: `reports/country-code-normalization-rollback.sql`')
  lines.push('- Forward SQL is idempotent because it updates only `country_code IS NULL` rows.')
  lines.push('- Rollback SQL clears only the exact country codes written by this sprint.')

  lines.push('', '## Planned / Written Records', '', '| Building | Name | Country code | Source | Evidence |', '|---|---|---|---|---|')
  for (const change of report.changes) {
    lines.push(`| ${change.slug} | ${change.name} | ${change.to} | ${change.source} | ${change.evidence} |`)
  }

  lines.push('')
  return lines.join('\n')
}

function runAudit(): AuditResult {
  const result = spawnSync('npm', ['run', 'data:audit'], {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env,
  })

  let auditJson: Partial<AuditResult> = {}
  const auditPath = path.join(ROOT, 'reports/data-audit.json')
  if (fs.existsSync(auditPath)) {
    const parsed = JSON.parse(fs.readFileSync(auditPath, 'utf8')) as {
      summary?: Record<'error' | 'warning' | 'info', number>
      issues?: Array<{ severity: string; field: string }>
    }
    const warningByField: Record<string, number> = {}
    for (const issue of parsed.issues || []) {
      if (issue.severity === 'warning') {
        warningByField[issue.field] = (warningByField[issue.field] || 0) + 1
      }
    }
    auditJson = {
      totalIssues:
        (parsed.summary?.error || 0) +
        (parsed.summary?.warning || 0) +
        (parsed.summary?.info || 0),
      errorCount: parsed.summary?.error || 0,
      warningCount: parsed.summary?.warning || 0,
      warningByField,
    }
  }

  return {
    status: result.status,
    totalIssues: auditJson.totalIssues,
    errorCount: auditJson.errorCount,
    warningCount: auditJson.warningCount,
    warningByField: auditJson.warningByField,
  }
}

function formatPercent(numerator: number, denominator: number) {
  if (!denominator) return '0.00%'
  return `${((numerator / denominator) * 100).toFixed(2)}%`
}

async function main() {
  const buildings = await fetchAll<Building>('buildings')
  const missingBefore = buildings.filter(building => !building.country_code).length
  const changes = buildings.flatMap(building => {
    const change = inferCountryCode(building)
    return change ? [change] : []
  })
  const countryDistribution = distribution(changes)
  const sourceBreakdown = distribution(changes.map(change => ({ ...change, to: change.source }))).map(item => ({
    source: item.countryCode,
    count: item.count,
  }))

  fs.writeFileSync(MIGRATION_SQL, generateMigration(changes))
  fs.writeFileSync(ROLLBACK_SQL, generateRollback(changes))

  if (WRITE && changes.length) {
    const supabase = getSupabaseClient()
    for (const change of changes) {
      const { error } = await supabase
        .from('buildings')
        .update({ country_code: change.to })
        .eq('id', change.id)
        .is('country_code', null)
      if (error) throw new Error(`${change.slug}: ${error.message}`)
    }
  }

  let missingAfter: number | undefined
  let coverageAfter: string | undefined
  let auditAfterWrite: AuditResult | undefined
  if (WRITE) {
    const afterBuildings = await fetchAll<Building>('buildings')
    missingAfter = afterBuildings.filter(building => !building.country_code).length
    coverageAfter = formatPercent(afterBuildings.length - missingAfter, afterBuildings.length)
    auditAfterWrite = runAudit()
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: WRITE ? ('write' as const) : ('dry-run' as const),
    totalBuildings: buildings.length,
    missingBefore,
    plannedCount: changes.length,
    sourceBreakdown,
    countryDistribution,
    changes,
    missingAfter,
    coverageAfter,
    auditAfterWrite,
  }

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))

  console.log(`${WRITE ? 'Applied' : 'Dry-run'} high-confidence country_code normalization`)
  console.log(`- building count: ${changes.length}`)
  console.log('- country distribution:')
  for (const item of countryDistribution) console.log(`  ${item.countryCode}: ${item.count}`)
  console.log(`- migration: ${path.relative(ROOT, MIGRATION_SQL)}`)
  console.log(`- rollback: ${path.relative(ROOT, ROLLBACK_SQL)}`)
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
  if (WRITE) {
    console.log(`- remaining missing country_code: ${missingAfter}`)
    console.log(`- new country_code coverage: ${coverageAfter}`)
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
