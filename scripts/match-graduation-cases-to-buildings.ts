import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import casesData from '../src/content/graduation/cases.json'
import { ensureReportDir, fetchAll, ROOT } from './supabase-script-utils'

export type MatchLane = 'exact-match' | 'probable-match' | 'new-building-candidate' | 'identity-review'

type GraduationCase = {
  id: string
  name: string
  name_ja?: string
  name_en?: string
  location?: string
  location_ja?: string
  location_en?: string
  year: number | null
  architect?: string
  source_url?: string
  status: 'draft' | 'published'
}

type Building = {
  id: string
  slug: string
  name_en: string | null
  name_zh: string | null
  name_ja: string | null
  architect_slug: string | null
  year_start: number | null
  city: string | null
  country: string | null
  country_code: string | null
  official_url: string | null
  wikipedia_url: string | null
  wikidata_id: string | null
}

type Architect = {
  slug: string
  name_en: string | null
  name_zh: string | null
  name_ja: string | null
  alt_names: string[] | null
}

export type MatchCandidate = {
  building_slug: string
  building_name: string
  score: number
  name_similarity: number
  evidence: string[]
  conflicts: string[]
}

type MatchItem = {
  case_id: string
  case_name: string
  status: GraduationCase['status']
  lane: MatchLane
  proposed_building_slug: string | null
  confidence: number
  source_url: string | null
  candidates: MatchCandidate[]
  review_instruction: string
}

const REPORT_DIR = ensureReportDir()
const REPORT_JSON = path.join(REPORT_DIR, 'graduation-building-match-report.json')
const REPORT_MD = path.join(REPORT_DIR, 'graduation-building-match-report.md')

export function normalizeIdentity(value: unknown) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\b(the|building|project)\b/g, ' ')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

export function normalizeArchitectIdentity(value: unknown) {
  return normalizeIdentity(value)
    .replace(/\b(architects?|architecture|associates?|atelier|office|studio|corporation|company|co|group|and)\b/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

function architectIdentityCandidates(value: unknown) {
  const raw = String(value || '')
  return [raw, ...raw.split(/\s*[+/]\s*|,\s*/)]
    .map(normalizeArchitectIdentity)
    .filter(Boolean)
}

function normalizeVenueAlias(value: unknown) {
  return normalizeIdentity(value)
    .replace(/\b(national|metropolitan)\b/g, ' ')
    .replace(/\b(theatre|theater)\b/g, ' opera house ')
    .trim()
    .replace(/\s+/g, ' ')
}

const genericContainedNames = new Set(['museum', 'library', 'theater', 'theatre', 'opera', 'house', 'center', 'centre'])

function identityNameSimilarity(left: string, right: string) {
  if (left === right) return 1
  const venueLeft = normalizeVenueAlias(left)
  const venueRight = normalizeVenueAlias(right)
  if (venueLeft && venueLeft === venueRight) return 0.9

  const [shorter, longer] = left.length <= right.length ? [left, right] : [right, left]
  if (shorter.length >= 5 && !genericContainedNames.has(shorter) && (` ${longer} `).includes(` ${shorter} `)) return 0.9
  return diceSimilarity(left, right)
}

function characterBigrams(value: string) {
  const compact = value.replaceAll(' ', '')
  if (compact.length < 2) return compact ? [compact] : []
  return Array.from({ length: compact.length - 1 }, (_, index) => compact.slice(index, index + 2))
}

export function diceSimilarity(left: unknown, right: unknown) {
  const a = characterBigrams(normalizeIdentity(left))
  const b = characterBigrams(normalizeIdentity(right))
  if (a.length === 0 || b.length === 0) return 0
  const counts = new Map<string, number>()
  for (const item of a) counts.set(item, (counts.get(item) || 0) + 1)
  let overlap = 0
  for (const item of b) {
    const remaining = counts.get(item) || 0
    if (remaining <= 0) continue
    overlap += 1
    counts.set(item, remaining - 1)
  }
  return (2 * overlap) / (a.length + b.length)
}

function displayBuildingName(building: Building) {
  return building.name_en || building.name_zh || building.name_ja || building.slug
}

function caseNames(item: GraduationCase) {
  return [item.name, item.name_en, item.name_ja].map(normalizeIdentity).filter(Boolean)
}

function buildingNames(building: Building) {
  return [building.name_en, building.name_zh, building.name_ja].map(normalizeIdentity).filter(Boolean)
}

function bestNameSimilarity(item: GraduationCase, building: Building) {
  const slugIdentity = normalizeIdentity(building.slug)
  return Math.max(0, ...caseNames(item).flatMap(caseName => [
    ...buildingNames(building).map(buildingName => identityNameSimilarity(caseName, buildingName)),
    diceSimilarity(caseName, slugIdentity),
  ]))
}

function architectLookup(architects: Architect[]) {
  const lookup = new Map<string, string>()
  for (const architect of architects) {
    for (const name of [architect.slug, architect.name_en, architect.name_zh, architect.name_ja, ...(architect.alt_names || [])]) {
      const key = normalizeArchitectIdentity(name)
      if (key) lookup.set(key, architect.slug)
    }
  }
  return lookup
}

function resolveCaseArchitect(item: GraduationCase, lookup: Map<string, string>) {
  const identities = architectIdentityCandidates(item.architect)
  if (identities.length === 0) return null
  for (const identity of identities) {
    const direct = lookup.get(identity)
    if (direct) return direct
  }
  let best: { slug: string; similarity: number } | null = null
  for (const identity of identities) {
    for (const [name, slug] of lookup) {
      const similarity = diceSimilarity(identity, name)
      if (!best || similarity > best.similarity) best = { slug, similarity }
    }
  }
  return best && best.similarity >= 0.88 ? best.slug : null
}

function locationMatches(item: GraduationCase, building: Building) {
  const caseLocation = normalizeIdentity([item.location, item.location_en, item.location_ja].filter(Boolean).join(' '))
  if (!caseLocation) return false
  return [building.city, building.country, building.country_code]
    .map(normalizeIdentity)
    .filter(value => value.length >= 3)
    .some(value => caseLocation.includes(value))
}

export function scoreCandidate(item: GraduationCase, building: Building, resolvedArchitect: string | null): MatchCandidate {
  const similarity = bestNameSimilarity(item, building)
  const evidence: string[] = []
  const conflicts: string[] = []
  let score = Math.round(similarity * 100)

  if (similarity === 1) evidence.push('normalized multilingual name is identical')
  else if (similarity >= 0.78) evidence.push(`name similarity ${similarity.toFixed(2)}`)

  if (item.year && building.year_start) {
    const gap = Math.abs(item.year - building.year_start)
    if (gap === 0) { score += 10; evidence.push('year is identical') }
    else if (gap <= 2) { score += 6; evidence.push(`year differs by ${gap}`) }
    else if (gap >= 5) conflicts.push(`year differs by ${gap}`)
  }

  if (resolvedArchitect && building.architect_slug) {
    if (resolvedArchitect === building.architect_slug) { score += 12; evidence.push('architect is identical') }
    else conflicts.push(`architect differs: ${resolvedArchitect} vs ${building.architect_slug}`)
  }

  if (locationMatches(item, building)) { score += 5; evidence.push('location overlaps') }

  return {
    building_slug: building.slug,
    building_name: displayBuildingName(building),
    score,
    name_similarity: Number(similarity.toFixed(3)),
    evidence,
    conflicts,
  }
}

export function classifyMatch(item: GraduationCase, candidates: MatchCandidate[]): MatchLane {
  const top = candidates[0]
  if (!top) return item.source_url && item.name ? 'new-building-candidate' : 'identity-review'
  if (top.name_similarity === 1 && top.evidence.length >= 2 && top.conflicts.length === 0) return 'exact-match'
  if (top.name_similarity >= 0.78 && top.evidence.length >= 2 && top.conflicts.length === 0) return 'probable-match'
  if (top.name_similarity < 0.55 && item.source_url && item.name) return 'new-building-candidate'
  return 'identity-review'
}

function reviewInstruction(lane: MatchLane) {
  if (lane === 'exact-match') return 'Safe mapping candidate after checking the visible source and image identity; do not copy duplicate base fields.'
  if (lane === 'probable-match') return 'Confirm the project identity manually before assigning building_id.'
  if (lane === 'new-building-candidate') return 'Research and create one canonical building record before attaching the graduation profile.'
  return 'Resolve conflicting or weak identity evidence; do not create or link a building automatically.'
}

function markdownReport(report: { generatedAt: string; summary: Record<MatchLane, number>; items: MatchItem[] }) {
  const lanes: MatchLane[] = ['exact-match', 'probable-match', 'new-building-candidate', 'identity-review']
  const lines = [
    '# Graduation Case to Building Match Report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Safety boundary',
    '',
    '- Read-only: this report does not write Supabase or change graduation case data.',
    '- Name similarity alone never creates a database link.',
    '- An exact match still requires source and image identity review before migration.',
    '',
    '## Summary',
    '',
    '| Lane | Count |',
    '|---|---:|',
    ...lanes.map(lane => `| ${lane} | ${report.summary[lane]} |`),
    '',
    '## Review queue',
    '',
    '| Lane | Graduation case | Proposed building | Confidence | Evidence / conflicts |',
    '|---|---|---|---:|---|',
    ...report.items.map(item => {
      const top = item.candidates[0]
      const details = top ? [...top.evidence, ...top.conflicts.map(value => `CONFLICT: ${value}`)].join('; ') : 'No credible existing candidate'
      return `| ${item.lane} | ${item.case_id} — ${item.case_name.replaceAll('|', '\\|')} | ${item.proposed_building_slug || 'create/research'} | ${item.confidence} | ${details.replaceAll('|', '\\|')} |`
    }),
    '',
    '## Next verified step',
    '',
    '- Review exact matches first and record approved `case_id -> building_slug` decisions in a versioned decision file.',
    '- Do not design the database migration from fuzzy candidates or names alone.',
    '',
  ]
  return lines.join('\n')
}

async function main() {
  const [buildings, architects] = await Promise.all([
    fetchAll<Building>('buildings'),
    fetchAll<Architect>('architects'),
  ])
  const architectNames = architectLookup(architects)
  const items: MatchItem[] = (casesData as GraduationCase[]).map(item => {
    const resolvedArchitect = resolveCaseArchitect(item, architectNames)
    const candidates = buildings
      .map(building => scoreCandidate(item, building, resolvedArchitect))
      .filter(candidate => candidate.name_similarity >= 0.35)
      .sort((a, b) => b.score - a.score || a.building_slug.localeCompare(b.building_slug))
      .slice(0, 3)
    const lane = classifyMatch(item, candidates)
    const top = candidates[0]
    return {
      case_id: item.id,
      case_name: item.name_en || item.name || item.name_ja || item.id,
      status: item.status,
      lane,
      proposed_building_slug: lane === 'exact-match' || lane === 'probable-match' ? top?.building_slug || null : null,
      confidence: top?.score || 0,
      source_url: item.source_url || null,
      candidates,
      review_instruction: reviewInstruction(lane),
    }
  }).sort((a, b) => {
    const laneOrder: Record<MatchLane, number> = { 'exact-match': 0, 'probable-match': 1, 'new-building-candidate': 2, 'identity-review': 3 }
    return laneOrder[a.lane] - laneOrder[b.lane] || b.confidence - a.confidence || a.case_id.localeCompare(b.case_id)
  })

  const summary: Record<MatchLane, number> = { 'exact-match': 0, 'probable-match': 0, 'new-building-candidate': 0, 'identity-review': 0 }
  for (const item of items) summary[item.lane] += 1
  const report = { generatedAt: new Date().toISOString(), summary, items }
  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))
  console.log('Graduation building match audit complete')
  for (const [lane, count] of Object.entries(summary)) console.log(`- ${lane}: ${count}`)
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isDirectRun) main().catch(error => {
  console.error(error)
  process.exit(1)
})
