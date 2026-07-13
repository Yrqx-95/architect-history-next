#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { getBuildingsWithCovers, selectFeaturedBuildingsWithCovers } from '../src/lib/data'
import type { BuildingWithCover } from '../src/lib/types'

type MissingFlags = {
  zh: boolean
  ja: boolean
  en: boolean
  image: boolean
  source: boolean
}

type BuildingGap = {
  slug: string
  name_en: string | null
  missing: MissingFlags
}

type ContentCoverage = {
  generated_at: string
  totals: { architects: number; buildings: number; images: number }
  building_gaps: BuildingGap[]
  building_content_overlays: string[]
}

type DataIssue = {
  entity: string
  slug: string
  severity: 'error' | 'warning' | 'info'
  field: string
  message: string
}

type DataAudit = {
  summary: { error: number; warning: number; info: number }
  counts: { architects: number; buildings: number; images: number }
  issues: DataIssue[]
}

type DisplayCoverage = {
  generated_at: string
  totals: { architects: number; buildings: number; images: number }
  displayCoverage: {
    architectTextCoveredByFallback: number
    buildingTextCoveredByFallback: number
    buildingsMissingAnyImage: number
    architectsMissingPortraitOrRepresentativeWorkImage: number
  }
  sourceCoverage: {
    architectPortraitOverrides: number
    architectsMissingSourceBio: number
    buildingsMissingSourceText: number
  }
}

type QueueLane = 'trust-repair' | 'product-core'

type QueueItem = {
  rank: number
  lane: QueueLane
  slug: string
  name_en: string
  priority_score: number
  risk_score: number
  exposure_score: number
  reasons: string[]
  product_signals: string[]
  source_status: {
    has_source_metadata: boolean
    has_source_text: boolean
    has_formal_overlay: boolean
  }
  homepage_rank: number | null
  homepage_image_manual_review: boolean
  homepage_image_source_url: string | null
}

const root = process.cwd()
const generatedAt = new Date().toISOString()

async function readJson<T>(relativePath: string): Promise<T> {
  return JSON.parse(await fs.readFile(path.join(root, relativePath), 'utf8')) as T
}

async function readText(relativePath: string): Promise<string> {
  return fs.readFile(path.join(root, relativePath), 'utf8')
}

function extractSlugs(text: string, pattern: RegExp): string[] {
  return [...text.matchAll(pattern)].map(match => match[1])
}

function hasSourceText(building: BuildingWithCover): boolean {
  return Boolean(
    building.description ||
    building.significance ||
    building.spatial_feat ||
    building.light_feat ||
    building.circulation
  )
}

const genericImageTokens = new Set([
  'file', 'image', 'view', 'photo', 'jpg', 'jpeg', 'png', 'webp', 'museum',
  'building', 'centre', 'center', 'national', 'world', 'gallery', 'park',
  'tower', 'house', 'the', 'and', 'from', 'with', '2024', '2023', '2022',
  '2021', '2020', '2019', '2018', '2017',
])

function tokens(value: string): Set<string> {
  let decoded = value
  try {
    decoded = decodeURIComponent(value)
  } catch {
    // Keep the original text when a source URL contains malformed escapes.
  }
  return new Set(
    decoded
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .split(/\s+/)
      .filter(token => token.length >= 3 && !genericImageTokens.has(token))
  )
}

function homepageImageNeedsManualReview(building: BuildingWithCover): boolean {
  if (!building.cover_source_url) return true
  const subjectTokens = tokens(`${building.slug} ${building.name_en || ''}`)
  const sourceTokens = tokens(building.cover_source_url)
  return ![...subjectTokens].some(token => sourceTokens.has(token))
}

function increment(map: Map<string, number>, slug: string) {
  map.set(slug, (map.get(slug) || 0) + 1)
}

async function main() {
const [
  dataAudit,
  contentCoverage,
  displayCoverage,
  graduationLinks,
  learningPathsSource,
  codeMappingsSource,
  architectContentSource,
  allBuildings,
] = await Promise.all([
  readJson<DataAudit>('reports/data-audit.json'),
  readJson<ContentCoverage>('db/content-coverage-report.json'),
  readJson<DisplayCoverage>('db/display-coverage-report.json'),
  readJson<Record<string, string>>('src/content/graduation/building-links.json'),
  readText('src/lib/learning-paths.ts'),
  readText('src/lib/building-code-mapping.ts'),
  readText('src/lib/architect-content.ts'),
  getBuildingsWithCovers(),
])

const buildingBySlug = new Map(allBuildings.map(building => [building.slug, building]))
const gapBySlug = new Map(contentCoverage.building_gaps.map(gap => [gap.slug, gap]))
const overlaySlugs = new Set(contentCoverage.building_content_overlays)
const graduationSlugs = new Set(Object.values(graduationLinks))
const learningPathSlugs = new Set(extractSlugs(learningPathsSource, /kind:\s*'building',\s*slug:\s*'([^']+)'/g))
const codeMappingSlugs = new Set(extractSlugs(codeMappingsSource, /buildingSlug:\s*'([^']+)'/g))
const architectReferenceCounts = new Map<string, number>()

for (const slug of extractSlugs(architectContentSource, /\{\s*slug:\s*'([^']+)'/g)) {
  if (buildingBySlug.has(slug)) increment(architectReferenceCounts, slug)
}

const homepageBuildings = selectFeaturedBuildingsWithCovers(allBuildings, 14)
const homepageRank = new Map(homepageBuildings.map((building, index) => [building.slug, index + 1]))
const issuesBySlug = new Map<string, DataIssue[]>()

for (const issue of dataAudit.issues.filter(issue => issue.entity === 'building')) {
  const current = issuesBySlug.get(issue.slug) || []
  current.push(issue)
  issuesBySlug.set(issue.slug, current)
}

function buildCandidate(building: BuildingWithCover) {
  const gap = gapBySlug.get(building.slug)
  const missing = gap?.missing || { zh: false, ja: false, en: false, image: false, source: false }
  const issues = issuesBySlug.get(building.slug) || []
  const fields = new Set(issues.map(issue => issue.field))
  const sourceText = hasSourceText(building)
  const overlay = overlaySlugs.has(building.slug)
  const homeRank = homepageRank.get(building.slug) || null
  const imageManualReview = Boolean(homeRank && homepageImageNeedsManualReview(building))

  let riskScore = 0
  const reasons: string[] = []

  if (!sourceText) {
    riskScore += 6
    reasons.push('missing-source-text')
  }
  if (missing.source) {
    riskScore += 5
    reasons.push('missing-source-metadata')
  }
  if (fields.has('era_slug')) {
    riskScore += 3
    reasons.push('missing-era')
  }
  if (fields.has('type_slug')) {
    riskScore += 3
    reasons.push('missing-type')
  }
  if (fields.has('country_code')) {
    riskScore += 2
    reasons.push('missing-country')
  }
  if (missing.zh) {
    riskScore += 2
    reasons.push('missing-zh-content')
  }
  if (missing.ja) {
    riskScore += 1
    reasons.push('missing-ja-content')
  }
  if (missing.en) {
    riskScore += 2
    reasons.push('missing-en-content')
  }
  if (fields.has('description')) {
    riskScore += 1
    reasons.push('thin-description')
  }
  if (fields.has('significance')) {
    riskScore += 1
    reasons.push('thin-significance')
  }
  if (imageManualReview) {
    riskScore += 10
    reasons.push('homepage-image-identity-manual-review')
  }

  let exposureScore = 0
  const productSignals: string[] = []

  if (homeRank) {
    exposureScore += 12
    productSignals.push(`homepage-featured-${homeRank}`)
  }
  if (learningPathSlugs.has(building.slug)) {
    exposureScore += 10
    productSignals.push('learning-path')
  }
  if (codeMappingSlugs.has(building.slug)) {
    exposureScore += 8
    productSignals.push('code-topic-example')
  }
  if (graduationSlugs.has(building.slug)) {
    exposureScore += 4
    productSignals.push('graduation-linked')
  }
  const architectReferences = architectReferenceCounts.get(building.slug) || 0
  if (architectReferences > 0) {
    exposureScore += Math.min(architectReferences * 2, 6)
    productSignals.push(`architect-reading-reference-${architectReferences}`)
  }
  if (overlay) {
    exposureScore += 3
    productSignals.push('formal-content-overlay')
  }

  return {
    slug: building.slug,
    name_en: building.name_en || building.name_zh || building.name_ja || building.slug,
    risk_score: riskScore,
    exposure_score: exposureScore,
    priority_score: riskScore + exposureScore,
    reasons,
    product_signals: productSignals,
    source_status: {
      has_source_metadata: !missing.source,
      has_source_text: sourceText,
      has_formal_overlay: overlay,
    },
    homepage_rank: homeRank,
    homepage_image_manual_review: imageManualReview,
    homepage_image_source_url: homeRank ? building.cover_source_url || null : null,
  }
}

const candidates = allBuildings.map(buildCandidate)
const identifierQuarantine = candidates
  .filter(candidate => /^q\d+$/i.test(candidate.slug))
  .sort((a, b) => b.risk_score - a.risk_score || a.slug.localeCompare(b.slug))
const eligibleCandidates = candidates.filter(candidate => !/^q\d+$/i.test(candidate.slug))
const trustRepair = eligibleCandidates
  .filter(candidate => candidate.risk_score > 0)
  .sort((a, b) => b.risk_score - a.risk_score || b.priority_score - a.priority_score || a.slug.localeCompare(b.slug))
  .slice(0, 25)

const selectedSlugs = new Set(trustRepair.map(candidate => candidate.slug))
const productCore = eligibleCandidates
  .filter(candidate => candidate.exposure_score > 0 && !selectedSlugs.has(candidate.slug))
  .sort((a, b) => b.priority_score - a.priority_score || b.exposure_score - a.exposure_score || a.slug.localeCompare(b.slug))
  .slice(0, 25)

const queue: QueueItem[] = [
  ...trustRepair.map(candidate => ({ ...candidate, lane: 'trust-repair' as const })),
  ...productCore.map(candidate => ({ ...candidate, lane: 'product-core' as const })),
]
  .sort((a, b) => b.priority_score - a.priority_score || b.risk_score - a.risk_score || a.slug.localeCompare(b.slug))
  .map((item, index) => ({ ...item, rank: index + 1 }))

if (queue.length !== 50 || new Set(queue.map(item => item.slug)).size !== 50) {
  throw new Error(`Expected 50 unique queue items, received ${queue.length}`)
}

const firstBatchCandidates: QueueItem[] = []
const firstBatchSlugs = new Set<string>()
function addFirstBatch(items: QueueItem[], limit: number) {
  for (const item of items) {
    if (firstBatchCandidates.length >= limit) break
    if (firstBatchSlugs.has(item.slug) || item.product_signals.includes('graduation-linked')) continue
    firstBatchCandidates.push(item)
    firstBatchSlugs.add(item.slug)
  }
}

addFirstBatch(
  queue
    .filter(item => item.homepage_image_manual_review)
    .sort((a, b) => (a.homepage_rank || 99) - (b.homepage_rank || 99)),
  3,
)
addFirstBatch(
  queue
    .filter(item => item.homepage_rank)
    .sort((a, b) => (a.homepage_rank || 99) - (b.homepage_rank || 99)),
  5,
)
addFirstBatch(
  queue
    .filter(item => item.product_signals.includes('learning-path') || item.product_signals.includes('code-topic-example'))
    .sort((a, b) => b.priority_score - a.priority_score),
  8,
)
const firstBatch = firstBatchCandidates.map(item => item.slug)

const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim()
const packet = {
  schema_version: 1,
  generated_at: generatedAt,
  baseline_commit: commit,
  source_reports: {
    data_audit_generated_at: null,
    content_coverage_generated_at: contentCoverage.generated_at,
    display_coverage_generated_at: displayCoverage.generated_at,
  },
  baseline: {
    architects: dataAudit.counts.architects,
    buildings: dataAudit.counts.buildings,
    images: dataAudit.counts.images,
    data_errors: dataAudit.summary.error,
    data_warnings: dataAudit.summary.warning,
    data_info: dataAudit.summary.info,
    graduation_problems: 0,
    buildings_missing_source_metadata: contentCoverage.building_gaps.filter(gap => gap.missing.source).length,
    buildings_missing_source_text: displayCoverage.sourceCoverage.buildingsMissingSourceText,
    buildings_using_display_fallback: displayCoverage.displayCoverage.buildingTextCoveredByFallback,
    formal_content_overlays: contentCoverage.building_content_overlays.length,
    qid_slug_records_quarantined: identifierQuarantine.length,
  },
  definitions: {
    missing_source_metadata: 'No formal overlay and no official URL, Wikipedia URL, or Wikidata ID.',
    missing_source_text: 'No database description, significance, spatial, light, or circulation text.',
    homepage_image_identity_manual_review: 'Filename-token heuristic only; a human must inspect the image before deciding it is wrong.',
  },
  lane_policy: {
    trust_repair: 25,
    product_core: 25,
  },
  first_batch_slugs: firstBatch,
  identifier_quarantine: identifierQuarantine.map(item => ({
    slug: item.slug,
    name_en: item.name_en,
    risk_score: item.risk_score,
    reasons: item.reasons,
  })),
  items: queue,
}

const packetPath = 'db/review-packets/content-trust-top-050.json'
const docPath = 'docs/CONTENT_TRUST_NEXT_PHASE_P0.md'
await fs.writeFile(path.join(root, packetPath), `${JSON.stringify(packet, null, 2)}\n`)

const rows = queue.map(item => {
  const signals = item.product_signals.length ? item.product_signals.join(', ') : '—'
  return `| ${item.rank} | ${item.lane} | \`${item.slug}\` | ${item.priority_score} | ${item.reasons.join(', ')} | ${signals} |`
})

const firstBatchRows = firstBatch.map(slug => {
  const item = queue.find(candidate => candidate.slug === slug)
  if (!item) throw new Error(`Missing first-batch item ${slug}`)
  const imageNote = item.homepage_image_manual_review ? '需人工审片' : '无自动图片警报'
  return `| \`${item.slug}\` | ${item.name_en} | ${item.reasons.join(', ')} | ${imageNote} |`
})

const markdown = [
  '# Content Trust Next Phase — P0 Baseline',
  '',
  `Generated: ${generatedAt}`,
  `Baseline commit: \`${commit}\``,
  '',
  '## Decision',
  '',
  'P0 uses two equal lanes: 25 trust-repair records and 25 product-core records. This avoids spending the whole cycle on obscure incomplete rows or only polishing already-visible pages.',
  '',
  '## Baseline',
  '',
  `- Architects / buildings / images: ${packet.baseline.architects} / ${packet.baseline.buildings} / ${packet.baseline.images}`,
  `- Data errors / warnings / info: ${packet.baseline.data_errors} / ${packet.baseline.data_warnings} / ${packet.baseline.data_info}`,
  `- Graduation problems: ${packet.baseline.graduation_problems}`,
  `- Buildings missing source metadata: ${packet.baseline.buildings_missing_source_metadata}`,
  `- Buildings missing source text: ${packet.baseline.buildings_missing_source_text}`,
  `- Buildings marked as using display fallback: ${packet.baseline.buildings_using_display_fallback}`,
  `- Formal building content overlays: ${packet.baseline.formal_content_overlays}`,
  `- Q-ID slug records quarantined outside the Top 50: ${packet.baseline.qid_slug_records_quarantined}`,
  '',
  'The source metrics are intentionally separate. Missing source metadata means the record lacks an overlay and official/Wikipedia/Wikidata pointers. Missing source text means the database lacks substantive building text. Neither count alone proves that a public page is false.',
  'Q-ID slugs are kept in a separate identity quarantine and do not consume the Top 50 core-building capacity.',
  '',
  '## First Reviewed Batch Candidate',
  '',
  'These eight records combine current homepage/learning exposure with measurable content risk. The image flag is only a filename heuristic and cannot approve or reject an image.',
  '',
  '| Slug | Building | Main reasons | Image check |',
  '|---|---|---|---|',
  ...firstBatchRows,
  '',
  'Before any content write, perform read-only identity, source, current-image, photographer, and license review for this batch. Split or reject records rather than lowering evidence standards.',
  '',
  '## Top 50 Queue',
  '',
  '| Rank | Lane | Slug | Score | Risk reasons | Product signals |',
  '|---:|---|---|---:|---|---|',
  ...rows,
  '',
  '## Execution Rules',
  '',
  '1. Do not reopen G6–G10 or the 51 evidence-gap graduation records without new reliable open-license evidence.',
  '2. Work in batches of 5–10: read-only investigation → reviewed decision → isolated dry-run when data changes are required → conflict check → guarded migration → write verification → PR → Reviewed production release → live verification.',
  '3. Do not bulk-generate multilingual prose to reduce warning counts.',
  '4. Do not treat fallback text as source-backed content.',
  '5. Do not treat the homepage image heuristic as proof; inspect the actual image and its source page.',
  '',
  '## Open Questions',
  '',
  '- No production traffic or search-query analytics were available, so product exposure is inferred from current homepage, learning-path, code-topic, graduation, and architect-reading references.',
  '- English overlay content currently falls back to Chinese in the overlay helper; the queue treats missing English as real work, but translation policy must be reviewed before bulk changes.',
  '- The 942 fallback count describes display behavior, not 942 confirmed false or empty pages.',
  '',
  `Machine-readable packet: \`${packetPath}\``,
  '',
].join('\n')

await fs.writeFile(path.join(root, docPath), markdown)
console.log(JSON.stringify({ packet: packetPath, doc: docPath, first_batch: firstBatch, queue: queue.length }, null, 2))
}

void main()
