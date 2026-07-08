import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

type Severity = 'error' | 'warning' | 'info'
type Issue = {
  severity: Severity
  entity: 'building' | 'architect' | 'image'
  slug?: string
  id?: string
  field: string
  message: string
  value?: unknown
}

type Architect = {
  id: string
  slug: string
  name_en: string | null
  birth_year: number | null
  death_year: number | null
}

type Building = {
  id: string
  slug: string
  name_en: string | null
  name_ja: string | null
  architect_id: string | null
  architect_slug: string | null
  year_start: number | null
  country_code: string | null
  type_slug: string | null
  style_slugs: string[] | null
  era_slug: string | null
  description: Record<string, unknown> | null
  significance: Record<string, unknown> | null
}

type Taxonomy = {
  id: string
  slug: string
}

type ImageRecord = {
  id: string
  building_id: string | null
  url_original: string | null
  source_url: string | null
  license: string | null
  source: string | null
}

const ROOT = process.cwd()
const REPORT_DIR = path.join(ROOT, 'reports')
const JSON_REPORT = path.join(REPORT_DIR, 'data-audit.json')
const MD_REPORT = path.join(REPORT_DIR, 'data-audit.md')
const DEATH_YEAR_GRACE_PERIOD = 20
const MIN_DESCRIPTION_LENGTH = 40
const MIN_SIGNIFICANCE_LENGTH = 40

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return
  for (const rawLine of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    const value = line.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}

function textLength(value: unknown) {
  return typeof value === 'string' ? value.trim().length : 0
}

function localizedTextLength(value: Record<string, unknown> | null, key: 'zh' | 'en' | 'ja') {
  if (!value) return 0
  return textLength(value[key])
}

function addIssue(issues: Issue[], issue: Issue) {
  issues.push(issue)
}

async function fetchAll<T>(table: string): Promise<T[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key in environment')
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  })
  const pageSize = 1000
  const rows: T[] = []
  for (let from = 0; ; from += pageSize) {
    const to = from + pageSize - 1
    const { data, error } = await supabase.from(table).select('*').range(from, to)
    if (error) throw new Error(`${table}: ${error.message}`)
    if (!data?.length) break
    rows.push(...(data as T[]))
    if (data.length < pageSize) break
  }
  return rows
}

function summarize(issues: Issue[]) {
  return issues.reduce<Record<Severity, number>>((acc, issue) => {
    acc[issue.severity] += 1
    return acc
  }, { error: 0, warning: 0, info: 0 })
}

function markdownReport(report: {
  generatedAt: string
  counts: Record<string, number>
  summary: Record<Severity, number>
  issues: Issue[]
}) {
  const topIssues = report.issues.slice(0, 250)
  const lines = [
    '# Data Audit Report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Counts',
    '',
    '| Table | Rows |',
    '|---|---:|',
    ...Object.entries(report.counts).map(([name, count]) => `| ${name} | ${count} |`),
    '',
    '## Summary',
    '',
    '| Severity | Count |',
    '|---|---:|',
    `| error | ${report.summary.error} |`,
    `| warning | ${report.summary.warning} |`,
    `| info | ${report.summary.info} |`,
    '',
    '## Issues',
    '',
  ]

  if (!topIssues.length) {
    lines.push('No issues found.')
  } else {
    lines.push('| Severity | Entity | Slug / ID | Field | Message |')
    lines.push('|---|---|---|---|---|')
    for (const issue of topIssues) {
      const subject = issue.slug || issue.id || ''
      lines.push(`| ${issue.severity} | ${issue.entity} | ${subject} | ${issue.field} | ${issue.message.replaceAll('|', '\\|')} |`)
    }
    if (report.issues.length > topIssues.length) {
      lines.push('')
      lines.push(`Showing first ${topIssues.length} issues. See data-audit.json for all ${report.issues.length} issues.`)
    }
  }

  lines.push('')
  return lines.join('\n')
}

async function main() {
  loadEnvFile(path.join(ROOT, '.env.local'))

  const [architects, buildings, styles, eras, buildingTypes, images] = await Promise.all([
    fetchAll<Architect>('architects'),
    fetchAll<Building>('buildings'),
    fetchAll<Taxonomy>('styles'),
    fetchAll<Taxonomy>('eras'),
    fetchAll<Taxonomy>('building_types'),
    fetchAll<ImageRecord>('images'),
  ])

  const architectBySlug = new Map(architects.map(architect => [architect.slug, architect]))
  const architectById = new Map(architects.map(architect => [architect.id, architect]))
  const styleSlugs = new Set(styles.map(style => style.slug))
  const eraSlugs = new Set(eras.map(era => era.slug))
  const typeSlugs = new Set(buildingTypes.map(type => type.slug))
  const buildingIds = new Set(buildings.map(building => building.id))
  const issues: Issue[] = []

  for (const building of buildings) {
    const subject = { entity: 'building' as const, slug: building.slug, id: building.id }

    if (!building.type_slug) {
      addIssue(issues, { ...subject, severity: 'warning', field: 'type_slug', message: 'Missing type_slug' })
    } else if (!typeSlugs.has(building.type_slug)) {
      addIssue(issues, { ...subject, severity: 'error', field: 'type_slug', message: 'type_slug does not exist in building_types', value: building.type_slug })
    }

    for (const styleSlug of building.style_slugs || []) {
      if (!styleSlugs.has(styleSlug)) {
        addIssue(issues, { ...subject, severity: 'error', field: 'style_slugs', message: 'style_slug does not exist in styles', value: styleSlug })
      }
    }

    if (!building.era_slug) {
      addIssue(issues, { ...subject, severity: 'warning', field: 'era_slug', message: 'Missing era_slug' })
    } else if (!eraSlugs.has(building.era_slug)) {
      addIssue(issues, { ...subject, severity: 'error', field: 'era_slug', message: 'era_slug does not exist in eras', value: building.era_slug })
    }

    const architect = building.architect_slug
      ? architectBySlug.get(building.architect_slug)
      : building.architect_id
        ? architectById.get(building.architect_id)
        : undefined

    if (!building.architect_slug && !building.architect_id) {
      addIssue(issues, { ...subject, severity: 'warning', field: 'architect_slug', message: 'Missing architect reference' })
    } else if (!architect) {
      addIssue(issues, { ...subject, severity: 'error', field: 'architect_slug', message: 'Architect reference does not exist', value: building.architect_slug || building.architect_id })
    }

    if (building.year_start && architect?.birth_year && building.year_start < architect.birth_year) {
      addIssue(issues, {
        ...subject,
        severity: 'error',
        field: 'year_start',
        message: `Building year is earlier than architect birth year (${architect.birth_year})`,
        value: building.year_start,
      })
    }

    if (building.year_start && architect?.death_year && building.year_start > architect.death_year + DEATH_YEAR_GRACE_PERIOD) {
      addIssue(issues, {
        ...subject,
        severity: 'warning',
        field: 'year_start',
        message: `Building year is more than ${DEATH_YEAR_GRACE_PERIOD} years after architect death year (${architect.death_year})`,
        value: building.year_start,
      })
    }

    if (!building.country_code) {
      addIssue(issues, { ...subject, severity: 'warning', field: 'country_code', message: 'Missing country_code' })
    }

    if (!building.name_ja) {
      addIssue(issues, { ...subject, severity: 'info', field: 'name_ja', message: 'Missing Japanese name' })
    }

    if (localizedTextLength(building.description, 'zh') < MIN_DESCRIPTION_LENGTH && localizedTextLength(building.description, 'en') < MIN_DESCRIPTION_LENGTH) {
      addIssue(issues, { ...subject, severity: 'info', field: 'description', message: `Description is missing or shorter than ${MIN_DESCRIPTION_LENGTH} characters in zh/en` })
    }

    if (localizedTextLength(building.significance, 'zh') < MIN_SIGNIFICANCE_LENGTH && localizedTextLength(building.significance, 'en') < MIN_SIGNIFICANCE_LENGTH) {
      addIssue(issues, { ...subject, severity: 'info', field: 'significance', message: `Significance is missing or shorter than ${MIN_SIGNIFICANCE_LENGTH} characters in zh/en` })
    }
  }

  for (const image of images) {
    const subject = { entity: 'image' as const, id: image.id }
    if (image.building_id && !buildingIds.has(image.building_id)) {
      addIssue(issues, { ...subject, severity: 'error', field: 'building_id', message: 'Image building_id does not exist in buildings', value: image.building_id })
    }
    if (!image.source_url) {
      addIssue(issues, { ...subject, severity: 'warning', field: 'source_url', message: 'Missing source_url' })
    }
    if (!image.license) {
      addIssue(issues, { ...subject, severity: 'warning', field: 'license', message: 'Missing license' })
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    counts: {
      architects: architects.length,
      buildings: buildings.length,
      styles: styles.length,
      eras: eras.length,
      building_types: buildingTypes.length,
      images: images.length,
    },
    summary: summarize(issues),
    issues,
  }

  fs.mkdirSync(REPORT_DIR, { recursive: true })
  fs.writeFileSync(JSON_REPORT, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(MD_REPORT, markdownReport(report))

  console.log(`Data audit complete: ${issues.length} issues`)
  console.log(`- ${path.relative(ROOT, JSON_REPORT)}`)
  console.log(`- ${path.relative(ROOT, MD_REPORT)}`)
  if (report.summary.error > 0) {
    process.exitCode = 1
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
