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

type ReviewLane = 'likely-chronological-postmodern' | 'style-conflict-review' | 'weak-identity-review'

type ReviewItem = {
  slug: string
  name: string
  year_start: number
  candidate_era: 'postmodern'
  review_lane: ReviewLane
  review_hint: string
  architect_slug: string | null
  type_slug: string | null
  style_slugs: string[]
}

const REPORT_DIR = ensureReportDir()
const REPORT_JSON = path.join(REPORT_DIR, 'era-slug-postmodern-review-queue.json')
const REPORT_MD = path.join(REPORT_DIR, 'era-slug-postmodern-review-queue.md')

const STYLE_REVIEW_SLUGS = new Set([
  'adaptive-reuse',
  'brutalism',
  'contemporary-architecture',
  'contemporary-japanese',
  'contemporary-swiss',
  'deconstructivism',
  'exposed-concrete',
  'geometric-abstraction',
  'high-tech',
  'japanese-modern',
  'metabolism',
  'minimalism',
  'modernism',
  'sculptural-architecture',
  'structural-expressionism',
])

const laneRank: Record<ReviewLane, number> = {
  'weak-identity-review': 0,
  'style-conflict-review': 1,
  'likely-chronological-postmodern': 2,
}

function displayName(building: Building) {
  return building.name_en || building.name_zh || building.name_ja || building.slug || '(missing name)'
}

function matchingEras(year: number, eras: Era[]) {
  return eras
    .filter(era => {
      if (era.year_start === null || era.year_end === null) return false
      return year >= era.year_start && year <= era.year_end
    })
    .map(era => era.slug)
}

function weakIdentityReason(building: Building) {
  if (!building.slug) return 'Missing slug; resolve identity before assigning era metadata.'
  if (/^q\d+$/i.test(building.slug)) return 'Wikidata-style placeholder slug; resolve identity before assigning era metadata.'
  if (building.slug === 'untitled') return 'Untitled record; resolve identity before assigning era metadata.'
  if (/^q\d+$/i.test(displayName(building))) return 'Display name is still a Wikidata-style placeholder; review identity first.'
  return null
}

function styleReviewReason(styleSlugs: string[]) {
  const reviewStyles = styleSlugs.filter(style => STYLE_REVIEW_SLUGS.has(style))
  if (!reviewStyles.length) return null
  return `Style slugs (${reviewStyles.join(', ')}) can indicate late-modern, high-tech, minimalist, deconstructivist, or contemporary readings; review before treating postmodern as more than a chronological bucket.`
}

function buildReviewItem(building: Building, eras: Era[]): ReviewItem | null {
  if (building.era_slug || building.year_start === null) return null
  const candidateEras = matchingEras(building.year_start, eras)
  if (candidateEras.length !== 1 || candidateEras[0] !== 'postmodern') return null

  const styleSlugs = building.style_slugs || []
  const weakReason = weakIdentityReason(building)
  const styleReason = styleReviewReason(styleSlugs)
  const reviewLane: ReviewLane = weakReason
    ? 'weak-identity-review'
    : styleReason
      ? 'style-conflict-review'
      : 'likely-chronological-postmodern'

  return {
    slug: building.slug,
    name: displayName(building),
    year_start: building.year_start,
    candidate_era: 'postmodern',
    review_lane: reviewLane,
    review_hint:
      weakReason ||
      styleReason ||
      'Year fits only the postmodern era range and no known conflicting style slug was detected; still review as a chronological metadata decision.',
    architect_slug: building.architect_slug,
    type_slug: building.type_slug,
    style_slugs: styleSlugs,
  }
}

function countByLane(items: ReviewItem[]) {
  return (Object.keys(laneRank) as ReviewLane[]).map(lane => ({
    lane,
    count: items.filter(item => item.review_lane === lane).length,
  }))
}

function markdownReport(report: {
  generatedAt: string
  summary: Array<{ lane: ReviewLane; count: number }>
  items: ReviewItem[]
}) {
  const lines = [
    '# Era Slug Postmodern Review Queue',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Scope',
    '',
    '- This is a read-only manual review queue.',
    '- It does not write Supabase and does not generate a migration.',
    '- It includes unassigned buildings whose `year_start` fits exactly the `postmodern` era range.',
    '- The goal is to separate chronological postmodern candidates from style conflicts and weak identity records before any future write batch.',
    '',
    '## Summary',
    '',
    '| Review lane | Count |',
    '|---|---:|',
  ]

  for (const item of report.summary) lines.push(`| ${item.lane} | ${item.count} |`)

  lines.push('', '## Review Queue', '')
  lines.push('| Lane | Building | Name | Year | Architect | Type | Styles | Hint |')
  lines.push('|---|---|---|---:|---|---|---|---|')

  for (const item of report.items) {
    lines.push(
      `| ${item.review_lane} | ${item.slug || '(missing slug)'} | ${item.name.replaceAll('|', '\\|')} | ${item.year_start} | ${
        item.architect_slug || ''
      } | ${item.type_slug || ''} | ${item.style_slugs.join(', ')} | ${item.review_hint.replaceAll('|', '\\|')} |`
    )
  }

  lines.push('', '## Recommended Next Step', '')
  lines.push('- Review `weak-identity-review` records first; do not include them in an automatic write batch.')
  lines.push('- Then review `style-conflict-review` records and decide whether `postmodern` is acceptable as a chronological era bucket for each.')
  lines.push('- Only after that, turn the remaining reviewed records into a small write batch with rollback SQL.')
  lines.push('')

  return lines.join('\n')
}

async function main() {
  const [buildings, eras] = await Promise.all([fetchAll<Building>('buildings'), fetchAll<Era>('eras')])
  const items = buildings
    .map(building => buildReviewItem(building, eras))
    .filter((item): item is ReviewItem => Boolean(item))
    .sort(
      (a, b) =>
        laneRank[a.review_lane] - laneRank[b.review_lane] ||
        a.year_start - b.year_start ||
        a.slug.localeCompare(b.slug)
    )

  const report = {
    generatedAt: new Date().toISOString(),
    summary: countByLane(items),
    items,
  }

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))

  console.log('Postmodern era review queue complete')
  for (const item of report.summary) console.log(`- ${item.lane}: ${item.count}`)
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
  console.log(`- json: ${path.relative(ROOT, REPORT_JSON)}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
