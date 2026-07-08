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
  style_slugs: string[] | null
}

type Era = {
  slug: string
  name_en: string | null
  year_start: number | null
  year_end: number | null
}

type CandidateStatus = 'year-unique' | 'year-overlap' | 'missing-year' | 'outside-taxonomy'

type EraCandidate = {
  slug: string
  name: string
  year_start: number | null
  status: CandidateStatus
  candidate_eras: string[]
  style_slugs: string[]
}

const REPORT_DIR = ensureReportDir()
const REPORT_JSON = path.join(REPORT_DIR, 'era-slug-dry-run.json')
const REPORT_MD = path.join(REPORT_DIR, 'era-slug-dry-run.md')
const PREVIEW_LIMIT = 250
const statusRank: Record<CandidateStatus, number> = {
  'year-unique': 0,
  'year-overlap': 1,
  'missing-year': 2,
  'outside-taxonomy': 3,
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

function buildCandidate(building: Building, eras: Era[]): EraCandidate {
  if (building.year_start === null) {
    return {
      slug: building.slug,
      name: displayName(building),
      year_start: null,
      status: 'missing-year',
      candidate_eras: [],
      style_slugs: building.style_slugs || [],
    }
  }

  const candidateEras = matchingEras(building.year_start, eras)
  const status: CandidateStatus =
    candidateEras.length === 1
      ? 'year-unique'
      : candidateEras.length > 1
        ? 'year-overlap'
        : 'outside-taxonomy'

  return {
    slug: building.slug,
    name: displayName(building),
    year_start: building.year_start,
    status,
    candidate_eras: candidateEras,
    style_slugs: building.style_slugs || [],
  }
}

function countBy<T extends string>(items: T[]) {
  const counts = new Map<T, number>()
  for (const item of items) counts.set(item, (counts.get(item) || 0) + 1)
  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
}

function markdownReport(report: {
  generatedAt: string
  counts: {
    buildings: number
    alreadyAssigned: number
    missingEra: number
  }
  statusCounts: Array<{ key: CandidateStatus; count: number }>
  uniqueDistribution: Array<{ key: string; count: number }>
  overlapDistribution: Array<{ key: string; count: number }>
  candidates: EraCandidate[]
}) {
  const lines = [
    '# Era Slug Dry-Run Report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Scope',
    '',
    '- This is a read-only planning report.',
    '- It does not write Supabase and does not generate a migration.',
    '- `year-unique` means `year_start` fits exactly one current era range.',
    '- `year-overlap` means `year_start` falls inside overlapping era ranges and needs review before writing.',
    '- Existing `era_slug` values are excluded from candidates.',
    '',
    '## Summary',
    '',
    `- Total buildings: ${report.counts.buildings}`,
    `- Already assigned era_slug: ${report.counts.alreadyAssigned}`,
    `- Missing era_slug before this dry run: ${report.counts.missingEra}`,
    '',
    '| Candidate status | Count |',
    '|---|---:|',
  ]

  for (const item of report.statusCounts) lines.push(`| ${item.key} | ${item.count} |`)

  lines.push('', '## Unique Year-Range Distribution', '', '| era_slug | Count |', '|---|---:|')
  for (const item of report.uniqueDistribution) lines.push(`| ${item.key} | ${item.count} |`)

  lines.push('', '## Overlap Groups', '', '| Candidate eras | Count |', '|---|---:|')
  if (report.overlapDistribution.length) {
    for (const item of report.overlapDistribution) lines.push(`| ${item.key} | ${item.count} |`)
  } else {
    lines.push('| none | 0 |')
  }

  const preview = report.candidates.slice(0, PREVIEW_LIMIT)
  lines.push('', '## Candidate Preview', '', '| Status | Building | Name | Year | Candidate eras | style_slugs |')
  lines.push('|---|---|---|---:|---|---|')
  for (const candidate of preview) {
    lines.push(
      `| ${candidate.status} | ${candidate.slug} | ${candidate.name.replaceAll('|', '\\|')} | ${
        candidate.year_start ?? ''
      } | ${candidate.candidate_eras.join(', ')} | ${candidate.style_slugs.join(', ')} |`
    )
  }

  if (report.candidates.length > preview.length) {
    lines.push('')
    lines.push(`Showing first ${preview.length} candidates. See \`reports/era-slug-dry-run.json\` for all ${report.candidates.length}.`)
  }

  lines.push('', '## Recommended Next Step', '')
  lines.push('- Turn only the `year-unique` group into a reviewed write batch after checking boundary cases and historically ambiguous works.')
  lines.push('- Keep `year-overlap`, `missing-year`, and `outside-taxonomy` out of automatic writes.')
  lines.push('')

  return lines.join('\n')
}

async function main() {
  const [buildings, eras] = await Promise.all([fetchAll<Building>('buildings'), fetchAll<Era>('eras')])
  const missingEraBuildings = buildings.filter(building => !building.era_slug)
  const candidates = missingEraBuildings
    .map(building => buildCandidate(building, eras))
    .sort((a, b) => statusRank[a.status] - statusRank[b.status] || (a.year_start ?? 99999) - (b.year_start ?? 99999) || a.slug.localeCompare(b.slug))

  const uniqueDistribution = countBy(
    candidates
      .filter(candidate => candidate.status === 'year-unique')
      .map(candidate => candidate.candidate_eras[0])
      .filter((era): era is string => Boolean(era))
  )
  const overlapDistribution = countBy(
    candidates
      .filter(candidate => candidate.status === 'year-overlap')
      .map(candidate => candidate.candidate_eras.join(' + '))
  )
  const statusCounts = countBy(candidates.map(candidate => candidate.status))

  const report = {
    generatedAt: new Date().toISOString(),
    counts: {
      buildings: buildings.length,
      alreadyAssigned: buildings.length - missingEraBuildings.length,
      missingEra: missingEraBuildings.length,
    },
    statusCounts,
    uniqueDistribution,
    overlapDistribution,
    candidates,
  }

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))

  console.log('Era slug dry run complete')
  console.log(`- total buildings: ${report.counts.buildings}`)
  console.log(`- already assigned era_slug: ${report.counts.alreadyAssigned}`)
  console.log(`- missing era_slug: ${report.counts.missingEra}`)
  for (const item of statusCounts) console.log(`- ${item.key}: ${item.count}`)
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
  console.log(`- json: ${path.relative(ROOT, REPORT_JSON)}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
