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

type ReviewLane =
  | 'historical-date-review'
  | 'postmodern-style-holdout'
  | 'postmodern-weak-identity'
  | 'contemporary-identity-cleanup'
  | 'unexpected-year-unique'

type ReviewItem = {
  slug: string
  name: string
  year_start: number
  candidate_era: string
  review_lane: ReviewLane
  review_hint: string
  recommended_next_action: string
  architect_slug: string | null
  type_slug: string | null
  style_slugs: string[]
}

type HistoricalDateFinding = {
  slug: string
  finding: string
  source: string
  url: string
}

const REPORT_DIR = ensureReportDir()
const REPORT_JSON = path.join(REPORT_DIR, 'era-slug-remaining-year-unique-review.json')
const REPORT_MD = path.join(REPORT_DIR, 'era-slug-remaining-year-unique-review.md')
const ARCHIVE_REPORT = path.join(ROOT, 'docs/archive/data-governance/ERA_SLUG_REMAINING_YEAR_UNIQUE_REVIEW.md')

const HISTORICAL_DATE_REVIEW: Record<string, string> = {
  'fondazione-querini-stampalia':
    'Source-backed holdout: 1869 points to the foundation/institution chronology, while the Carlo Scarpa architectural intervention belongs to 1959-1963; do not assign industrial-revolution to the Scarpa reading.',
  'cleveland-museum-of-art-building':
    'Source-backed holdout: 1913 points to the institution/founding, while the Hubbell & Benes building opened in 1916 and the canonical cleveland-museum-of-art record already carries early-modern.',
  'swedish-centre-for-architecture-and':
    'Source-backed holdout: 1962 points to the museum institution, while Rafael Moneo belongs to the 1991 competition / 1998 Skeppsholmen museum complex; do not assign post-war from the mixed record.',
}

const HISTORICAL_DATE_FINDINGS: HistoricalDateFinding[] = [
  {
    slug: 'fondazione-querini-stampalia',
    finding:
      'The official Fondazione page says the foundation has promoted its mission since 1869, but its architecture page separately dates Carlo Scarpa redesigning the ground floor and garden to 1959-1963.',
    source: 'Fondazione Querini Stampalia, Architecture',
    url: 'https://www.querinistampalia.org/en/category-collection/architecture/',
  },
  {
    slug: 'cleveland-museum-of-art-building',
    finding:
      'The Cleveland Museum of Art article identifies Benjamin S. Hubbell and Dominick W. Benes as architects of the Cleveland Museum of Art (1916); the canonical cleveland-museum-of-art record already has early-modern.',
    source: 'Cleveland Museum of Art, Cultural Visionary',
    url: 'https://www.clevelandart.org/articles/cultural-visonary',
  },
  {
    slug: 'swedish-centre-for-architecture-and',
    finding:
      'ArkDes dates the museum founding to 1962, Rafael Moneo winning the international competition to 1991, and the new Skeppsholmen buildings to 1998.',
    source: 'ArkDes, The history of ArkDes',
    url: 'https://arkdes.se/en/about/the-history-of-arkdes/',
  },
]

const POSTMODERN_STYLE_HOLDOUT: Record<string, string> = {
  'national-assembly-dhaka':
    'Late Kahn work with modernism/brutalism style slugs; completion year alone should not make it a postmodern write candidate.',
  'church-of-light':
    'Ando work better explained through minimalism, concrete, light, and Japanese modernity; hold out from postmodern era assignment until taxonomy wording is settled.',
  'water-temple':
    'Ando work with minimalism/exposed-concrete reading; review with the Ando group before assigning postmodern.',
  naoshima:
    'Ando museum with minimalism/exposed-concrete reading; review with the Ando group before assigning postmodern.',
  'therme-vals':
    'Zumthor work better explained through material atmosphere, minimalism, and Swiss contemporary architecture.',
  'kunsthaus-bregenz':
    'Zumthor work better explained through material atmosphere, minimalism, and Swiss contemporary architecture.',
}

const POSTMODERN_WEAK_IDENTITY: Record<string, string> = {
  q116481414: 'Wikidata-style placeholder slug with no public-facing label; resolve identity before era assignment.',
  q125679109: 'Wikidata-style placeholder slug; review with related Siza/Castanheira Schilderswijk housing records before era assignment.',
  q125679110: 'Wikidata-style placeholder slug; review with related Siza/Castanheira Schilderswijk housing records before era assignment.',
  q125679342: 'Wikidata-style placeholder slug; research public-facing Steven Holl project name before era assignment.',
  q125679108: 'Wikidata-style placeholder slug with likely country-code conflict; resolve identity and country before era assignment.',
  untitled: 'Untitled public-art/infrastructure-like record with likely country-code conflict; resolve whether it belongs in the building archive before era assignment.',
}

const CONTEMPORARY_IDENTITY_CLEANUP: Record<string, string> = {
  q136394553: 'Wikidata-style placeholder slug; keep for identity cleanup before era assignment.',
  q134893563: 'Wikidata-style placeholder slug; keep for identity cleanup before era assignment.',
  q125679066: 'Wikidata-style placeholder slug; keep for identity cleanup before era assignment.',
  'new-orleans': 'Name/slug identifies a place rather than a clear building record; keep for identity cleanup before era assignment.',
  q3412221: 'Wikidata-style placeholder slug; keep for identity cleanup before era assignment.',
  q123517303: 'Wikidata-style placeholder slug; keep for identity cleanup before era assignment.',
  '': 'Missing slug; cannot safely write era metadata until the record has a stable slug.',
  q118539028: 'Wikidata-style placeholder slug; keep for identity cleanup before era assignment.',
}

const laneRank: Record<ReviewLane, number> = {
  'historical-date-review': 0,
  'postmodern-style-holdout': 1,
  'postmodern-weak-identity': 2,
  'contemporary-identity-cleanup': 3,
  'unexpected-year-unique': 4,
}

function displayName(building: Building) {
  return building.name_en || building.name_zh || building.name_ja || building.slug || '(missing slug)'
}

function matchingEras(year: number, eras: Era[]) {
  return eras
    .filter(era => {
      if (era.year_start === null || era.year_end === null) return false
      return year >= era.year_start && year <= era.year_end
    })
    .map(era => era.slug)
}

function classify(building: Building, candidateEra: string): Pick<ReviewItem, 'review_lane' | 'review_hint' | 'recommended_next_action'> {
  const historicalReason = HISTORICAL_DATE_REVIEW[building.slug]
  if (historicalReason) {
    return {
      review_lane: 'historical-date-review',
      review_hint: historicalReason,
      recommended_next_action: 'Verify the building phase/year semantics before preparing any era write.',
    }
  }

  const postmodernStyleReason = POSTMODERN_STYLE_HOLDOUT[building.slug]
  if (postmodernStyleReason) {
    return {
      review_lane: 'postmodern-style-holdout',
      review_hint: postmodernStyleReason,
      recommended_next_action: 'Resolve whether this should remain an era exception or receive a clearer period label with style caveats.',
    }
  }

  const postmodernIdentityReason = POSTMODERN_WEAK_IDENTITY[building.slug]
  if (postmodernIdentityReason) {
    return {
      review_lane: 'postmodern-weak-identity',
      review_hint: postmodernIdentityReason,
      recommended_next_action: 'Fix identity, country, type, and display label before assigning era metadata.',
    }
  }

  const contemporaryIdentityReason = CONTEMPORARY_IDENTITY_CLEANUP[building.slug]
  if (contemporaryIdentityReason) {
    return {
      review_lane: 'contemporary-identity-cleanup',
      review_hint: contemporaryIdentityReason,
      recommended_next_action: 'Fix identity/slug first; do not hide malformed records inside an era normalization batch.',
    }
  }

  return {
    review_lane: 'unexpected-year-unique',
    review_hint: `Candidate era is ${candidateEra}, but this record is not covered by the remaining review rules.`,
    recommended_next_action: 'Review manually before deciding whether a write batch is appropriate.',
  }
}

function buildReviewItem(building: Building, eras: Era[]): ReviewItem | null {
  if (building.era_slug || building.year_start === null) return null
  const candidateEras = matchingEras(building.year_start, eras)
  if (candidateEras.length !== 1) return null

  const candidateEra = candidateEras[0]
  const classification = classify(building, candidateEra)
  return {
    slug: building.slug,
    name: displayName(building),
    year_start: building.year_start,
    candidate_era: candidateEra,
    ...classification,
    architect_slug: building.architect_slug,
    type_slug: building.type_slug,
    style_slugs: building.style_slugs || [],
  }
}

function countByLane(items: ReviewItem[]) {
  return (Object.keys(laneRank) as ReviewLane[]).map(lane => ({
    lane,
    count: items.filter(item => item.review_lane === lane).length,
  }))
}

function countByEra(items: ReviewItem[]) {
  const counts = new Map<string, number>()
  for (const item of items) counts.set(item.candidate_era, (counts.get(item.candidate_era) || 0) + 1)
  return [...counts.entries()]
    .map(([era, count]) => ({ era, count }))
    .sort((a, b) => b.count - a.count || a.era.localeCompare(b.era))
}

function markdownReport(report: {
  generatedAt: string
  summary: Array<{ lane: ReviewLane; count: number }>
  eraSummary: Array<{ era: string; count: number }>
  items: ReviewItem[]
}) {
  const lines = [
    '# Era Slug Remaining Year-Unique Review',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Scope',
    '',
    '- This is a read-only review queue for the remaining `year-unique` era candidates.',
    '- It does not write Supabase and does not generate a migration.',
    '- These records stayed unassigned after the high-confidence, year-unique A, contemporary, and reviewed postmodern batches.',
    '- The goal is to make the remaining exceptions explicit before deciding whether any future write batch is justified.',
    '',
    '## Summary By Review Lane',
    '',
    '| Review lane | Count |',
    '|---|---:|',
  ]

  for (const item of report.summary) lines.push(`| ${item.lane} | ${item.count} |`)

  lines.push('', '## Summary By Candidate Era', '', '| Candidate era | Count |', '|---|---:|')
  for (const item of report.eraSummary) lines.push(`| ${item.era} | ${item.count} |`)

  lines.push('', '## Review Queue', '')
  lines.push('| Lane | Building | Name | Year | Candidate era | Architect | Type | Styles | Hint | Next action |')
  lines.push('|---|---|---|---:|---|---|---|---|---|---|')

  for (const item of report.items) {
    lines.push(
      `| ${item.review_lane} | ${item.slug || '(missing slug)'} | ${item.name.replaceAll('|', '\\|')} | ${item.year_start} | ${
        item.candidate_era
      } | ${item.architect_slug || ''} | ${item.type_slug || ''} | ${item.style_slugs.join(', ')} | ${
        item.review_hint.replaceAll('|', '\\|')
      } | ${item.recommended_next_action.replaceAll('|', '\\|')} |`
    )
  }

  const historicalFindings = HISTORICAL_DATE_FINDINGS.filter(finding =>
    report.items.some(item => item.slug === finding.slug)
  )
  if (historicalFindings.length > 0) {
    lines.push('', '## Source-Backed Historical Date Findings', '')
    lines.push('| Building | Finding | Source |')
    lines.push('|---|---|---|')
    for (const item of historicalFindings) {
      lines.push(
        `| ${item.slug} | ${item.finding.replaceAll('|', '\\|')} | [${item.source.replaceAll('|', '\\|')}](${item.url}) |`
      )
    }
  }

  lines.push('', '## Recommended Next Step', '')
  lines.push('- Do not auto-write this queue as one batch.')
  const identityCleanupCount =
    (report.summary.find(item => item.lane === 'contemporary-identity-cleanup')?.count || 0) +
    (report.summary.find(item => item.lane === 'postmodern-weak-identity')?.count || 0)
  if (identityCleanupCount > 0) {
    lines.push('- Resolve `contemporary-identity-cleanup` and `postmodern-weak-identity` as identity/taxonomy fixes first.')
  } else {
    lines.push('- No identity cleanup records remain in this review snapshot.')
  }
  lines.push('- Treat `historical-date-review` as source-backed holdouts, not as ready era writes.')
  lines.push('- Keep `postmodern-style-holdout` separate from chronological batch work until the era/style vocabulary is settled.')
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
    eraSummary: countByEra(items),
    items,
  }

  const markdown = markdownReport(report)
  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdown)
  fs.writeFileSync(ARCHIVE_REPORT, markdown)

  console.log('Remaining year-unique era review queue complete')
  console.log(`- candidates: ${items.length}`)
  for (const item of report.summary) console.log(`- ${item.lane}: ${item.count}`)
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
  console.log(`- archive: ${path.relative(ROOT, ARCHIVE_REPORT)}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
