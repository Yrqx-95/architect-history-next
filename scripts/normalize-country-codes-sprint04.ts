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
  city: string | null
  location: string | null
  wikipedia_url: string | null
  description: Record<string, unknown> | null
}

type PlannedChange = {
  id: string
  slug: string
  name: string
  to: string
  source: 'country' | 'location'
  evidence: string
}

type SafetyExclusion = PlannedChange & {
  reason: string
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
const REPORT_JSON = path.join(REPORT_DIR, 'country-code-sprint04-normalization.json')
const REPORT_MD = path.join(ROOT, 'COUNTRY_CODE_WRITE_REPORT.md')
const MIGRATION_SQL = path.join(ROOT, 'db/migrations/v9-normalize-country-codes-sprint04.sql')
const ROLLBACK_SQL = path.join(ROOT, 'db/migrations/v9-normalize-country-codes-sprint04-rollback.sql')

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

function countryFromLocation(location: string | null) {
  const point = parsePoint(location)
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
  return { code: match.code, evidence: `${point.lat.toFixed(4)}, ${point.lon.toFixed(4)}` }
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

  const locationCountry = countryFromLocation(building.location)
  if (!locationCountry) return null

  return {
    id: building.id,
    slug: building.slug,
    name: building.name_zh || building.name_en || '',
    to: locationCountry.code,
    source: 'location',
    evidence: locationCountry.evidence,
  }
}

function safetyCheck(change: PlannedChange, building: Building): string | null {
  const mappedCountry = countryNameMap.get(String(building.country || '').trim())
  const locationCountry = countryFromLocation(building.location)
  if (mappedCountry && locationCountry && mappedCountry !== locationCountry.code) {
    return `country field (${mappedCountry}) conflicts with location (${locationCountry.code})`
  }
  if (change.source !== 'country' && change.source !== 'location') {
    return 'only country and location are allowed for high-confidence writes'
  }
  return null
}

function sqlString(value: string) {
  return `'${value.replaceAll("'", "''")}'`
}

function distribution(values: string[]) {
  const counts = new Map<string, number>()
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1)
  return [...counts.entries()]
    .map(([countryCode, count]) => ({ countryCode, count }))
    .sort((a, b) => b.count - a.count || a.countryCode.localeCompare(b.countryCode))
}

function generateForward(changes: PlannedChange[]) {
  const lines = [
    '-- ============================================================',
    '-- V9: Sprint 04 country_code normalization',
    '-- Scope: high-confidence country_code only after current-state dry-run.',
    '-- Safety: no generic name-token or description-only country inference.',
    '-- Idempotent: updates only rows where country_code IS NULL.',
    '-- Rollback: db/migrations/v9-normalize-country-codes-sprint04-rollback.sql',
    '-- ============================================================',
    '',
  ]
  if (!changes.length) {
    lines.push('-- No high-confidence country_code changes were available in Sprint 04.')
  } else {
    lines.push('BEGIN;')
    for (const change of changes) {
      lines.push(`UPDATE buildings SET country_code = ${sqlString(change.to)} WHERE slug = ${sqlString(change.slug)} AND country_code IS NULL;`)
    }
    lines.push('COMMIT;')
  }
  lines.push('')
  return lines.join('\n')
}

function generateRollback(changes: PlannedChange[]) {
  const lines = [
    '-- ============================================================',
    '-- Rollback for V9 Sprint 04 country_code normalization',
    '-- This only clears values written by the matching forward migration.',
    '-- ============================================================',
    '',
  ]
  if (!changes.length) {
    lines.push('-- No Sprint 04 country_code writes occurred; rollback is a no-op.')
  } else {
    lines.push('BEGIN;')
    for (const change of changes) {
      lines.push(`UPDATE buildings SET country_code = NULL WHERE slug = ${sqlString(change.slug)} AND country_code = ${sqlString(change.to)};`)
    }
    lines.push('COMMIT;')
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
  const auditPath = path.join(ROOT, 'reports/data-audit.json')
  if (!fs.existsSync(auditPath)) return { status: result.status }
  const parsed = JSON.parse(fs.readFileSync(auditPath, 'utf8')) as {
    summary?: Record<'error' | 'warning' | 'info', number>
    issues?: Array<{ severity: string; field: string }>
  }
  const warningByField: Record<string, number> = {}
  for (const issue of parsed.issues || []) {
    if (issue.severity === 'warning') warningByField[issue.field] = (warningByField[issue.field] || 0) + 1
  }
  return {
    status: result.status,
    totalIssues: (parsed.summary?.error || 0) + (parsed.summary?.warning || 0) + (parsed.summary?.info || 0),
    errorCount: parsed.summary?.error || 0,
    warningCount: parsed.summary?.warning || 0,
    warningByField,
  }
}

function formatPercent(numerator: number, denominator: number) {
  if (!denominator) return '0.00%'
  return `${((numerator / denominator) * 100).toFixed(2)}%`
}

function markdownReport(report: {
  generatedAt: string
  mode: 'dry-run' | 'write'
  totalBuildings: number
  missingBefore: number
  dryRunHighConfidence: number
  actualWrites: number
  safetyExclusions: SafetyExclusion[]
  plannedDistribution: Array<{ countryCode: string; count: number }>
  missingAfter?: number
  coverageAfter?: string
  top20CountriesAfter?: Array<{ countryCode: string; count: number }>
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
    '- Sprint 04 re-ran dry-run against the current database state.',
    '- Only high-confidence candidates from `country` or parseable `location` were eligible.',
    '- Medium-confidence text-token candidates and unresolved records were not written.',
    '- Generic building-name tokens and description-only inference were not used.',
    '- Priority policy: `country` / `location` / `city` / `wikipedia_url` outrank `description`; this sprint only allowed `country` and `location` for writes.',
    '',
    '## Summary',
    '',
    `- Missing country_code before write: ${report.missingBefore}`,
    `- Dry-run high-confidence candidates: ${report.dryRunHighConfidence}`,
    `- Actual writes: ${report.actualWrites}`,
    `- Safety exclusions: ${report.safetyExclusions.length}`,
    '',
    '## Planned Country Distribution',
    '',
    '| Country code | Count |',
    '|---|---:|',
  ]
  if (!report.plannedDistribution.length) {
    lines.push('| None | 0 |')
  } else {
    for (const item of report.plannedDistribution) lines.push(`| ${item.countryCode} | ${item.count} |`)
  }

  if (report.mode === 'write') {
    lines.push('', '## Post-Write Summary', '')
    lines.push(`- Remaining missing country_code: ${report.missingAfter ?? 'unknown'}`)
    lines.push(`- New country_code coverage: ${report.coverageAfter ?? 'unknown'}`)
    if (report.auditAfterWrite) {
      lines.push(`- data:audit exit status: ${report.auditAfterWrite.status}`)
      lines.push(`- data:audit total issues: ${report.auditAfterWrite.totalIssues ?? 'unknown'}`)
      lines.push(`- data:audit errors: ${report.auditAfterWrite.errorCount ?? 'unknown'}`)
      lines.push(`- data:audit warnings: ${report.auditAfterWrite.warningCount ?? 'unknown'}`)
      lines.push(`- data:audit country_code warnings: ${report.auditAfterWrite.warningByField?.country_code ?? 0}`)
    }
  }

  if (report.top20CountriesAfter?.length) {
    lines.push('', '## Country Distribution Top 20 After Write', '', '| Country code | Count |', '|---|---:|')
    for (const item of report.top20CountriesAfter.slice(0, 20)) {
      lines.push(`| ${item.countryCode} | ${item.count} |`)
    }
  }

  lines.push('', '## Safety Exclusions', '')
  if (!report.safetyExclusions.length) {
    lines.push('None.')
  } else {
    lines.push('| Building | Name | Candidate | Source | Evidence | Reason |')
    lines.push('|---|---|---|---|---|---|')
    for (const item of report.safetyExclusions) {
      lines.push(`| ${item.slug} | ${item.name} | ${item.to} | ${item.source} | ${item.evidence} | ${item.reason} |`)
    }
  }

  lines.push('', '## Migration Files', '')
  lines.push('- Forward migration: `db/migrations/v9-normalize-country-codes-sprint04.sql`')
  lines.push('- Rollback migration: `db/migrations/v9-normalize-country-codes-sprint04-rollback.sql`')
  lines.push('- Forward migration updates only `country_code IS NULL` records.')
  lines.push('- Rollback migration only clears exact values written by this sprint.')
  lines.push('')
  return lines.join('\n')
}

async function main() {
  const buildings = await fetchAll<Building>('buildings')
  const missingBefore = buildings.filter(building => !building.country_code).length
  const rawCandidates = buildings.flatMap(building => {
    const change = inferCountryCode(building)
    return change ? [{ building, change }] : []
  })
  const safetyExclusions: SafetyExclusion[] = []
  const changes: PlannedChange[] = []
  for (const item of rawCandidates) {
    const reason = safetyCheck(item.change, item.building)
    if (reason) safetyExclusions.push({ ...item.change, reason })
    else changes.push(item.change)
  }

  fs.writeFileSync(MIGRATION_SQL, generateForward(changes))
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
  let top20CountriesAfter: Array<{ countryCode: string; count: number }> | undefined
  let auditAfterWrite: AuditResult | undefined
  if (WRITE) {
    const afterBuildings = await fetchAll<Building>('buildings')
    missingAfter = afterBuildings.filter(building => !building.country_code).length
    coverageAfter = formatPercent(afterBuildings.length - missingAfter, afterBuildings.length)
    top20CountriesAfter = distribution(afterBuildings.flatMap(building => (building.country_code ? [building.country_code] : [])))
    auditAfterWrite = runAudit()
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: WRITE ? ('write' as const) : ('dry-run' as const),
    totalBuildings: buildings.length,
    missingBefore,
    dryRunHighConfidence: rawCandidates.length,
    actualWrites: changes.length,
    safetyExclusions,
    plannedDistribution: distribution(changes.map(change => change.to)),
    missingAfter,
    coverageAfter,
    top20CountriesAfter,
    auditAfterWrite,
  }

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))

  console.log(`${WRITE ? 'Applied' : 'Dry-run'} Sprint 04 country_code normalization`)
  console.log(`- missing country_code before: ${missingBefore}`)
  console.log(`- dry-run high-confidence candidates: ${rawCandidates.length}`)
  console.log(`- actual writes: ${changes.length}`)
  console.log(`- safety exclusions: ${safetyExclusions.length}`)
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
  console.log(`- forward migration: ${path.relative(ROOT, MIGRATION_SQL)}`)
  console.log(`- rollback migration: ${path.relative(ROOT, ROLLBACK_SQL)}`)
  if (WRITE) {
    console.log(`- remaining missing country_code: ${missingAfter}`)
    console.log(`- new country_code coverage: ${coverageAfter}`)
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
