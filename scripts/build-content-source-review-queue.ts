import fs from 'node:fs'
import path from 'node:path'
import { buildingContentOverlays } from '../src/lib/building-content'
import { ensureReportDir, fetchAll, ROOT } from './supabase-script-utils'

type Building = {
  id: string
  slug: string
  name_en: string | null
  name_zh: string | null
  name_ja: string | null
  architect_slug: string | null
  city: string | null
  country: string | null
  year_start: number | null
  type_slug: string | null
  description: Record<string, string> | null
  significance: Record<string, string> | null
  spatial_feat: Record<string, string> | null
  light_feat: Record<string, string> | null
  circulation: Record<string, string> | null
  official_url: string | null
  wikipedia_url: string | null
  wikidata_id: string | null
}

type Image = { building_id: string; is_primary: boolean | null; source_url: string | null }
type Lane = 'first-party-ready' | 'reference-ready' | 'identity-review' | 'evidence-gap'

type QueueItem = {
  slug: string
  name: string
  review_lane: Lane
  priority_score: number
  architect_slug: string | null
  location: string | null
  year_start: number | null
  type_slug: string | null
  source_entry_points: Array<{ label: string; url: string }>
  has_primary_image: boolean
  review_hint: string
}

const REPORT_DIR = ensureReportDir()
const REPORT_JSON = path.join(REPORT_DIR, 'content-source-review-queue.json')
const REPORT_MD = path.join(REPORT_DIR, 'content-source-review-queue.md')
const FORMAL_OVERLAY_SLUGS = new Set(Object.keys(buildingContentOverlays))

function hasText(value: Record<string, string> | null) {
  return Boolean(value && Object.values(value).some(text => typeof text === 'string' && text.trim().length >= 60))
}

function displayName(building: Building) {
  return building.name_en || building.name_zh || building.name_ja || building.slug
}

function laneFor(building: Building): Lane {
  if (!building.slug || /^q\d+$/i.test(building.slug) || /^q\d+$/i.test(displayName(building))) return 'identity-review'
  if (building.official_url) return 'first-party-ready'
  if (building.wikipedia_url || building.wikidata_id) return 'reference-ready'
  return 'evidence-gap'
}

function sourceEntryPoints(building: Building) {
  return [
    building.official_url && { label: 'Official site', url: building.official_url },
    building.wikipedia_url && { label: 'Wikipedia', url: building.wikipedia_url },
    building.wikidata_id && { label: `Wikidata ${building.wikidata_id}`, url: `https://www.wikidata.org/wiki/${building.wikidata_id}` },
  ].filter(Boolean) as Array<{ label: string; url: string }>
}

function priority(building: Building, lane: Lane, hasPrimaryImage: boolean) {
  const sourceScore = (building.official_url ? 100 : 0) + (building.wikipedia_url ? 45 : 0) + (building.wikidata_id ? 25 : 0)
  const metadataScore = [building.architect_slug, building.city || building.country, building.year_start, building.type_slug].filter(Boolean).length * 4
  const imageScore = hasPrimaryImage ? 6 : 0
  const laneScore: Record<Lane, number> = {
    'first-party-ready': 300,
    'reference-ready': 200,
    'identity-review': 50,
    'evidence-gap': 0,
  }
  return laneScore[lane] + sourceScore + metadataScore + imageScore
}

function reviewHint(lane: Lane) {
  if (lane === 'first-party-ready') return 'Start from the official site, then add an independently corroborating reference before approving prose.'
  if (lane === 'reference-ready') return 'Use the listed reference entry points to locate a stable source; do not treat a database identifier alone as proof of an analytical claim.'
  if (lane === 'identity-review') return 'Resolve the building identity before researching or attaching sources.'
  return 'Find a reliable institutional, architect, archive, or scholarly entry point before drafting content.'
}

function markdownReport(report: { generatedAt: string; summary: Record<Lane, number>; items: QueueItem[] }) {
  const lanes: Lane[] = ['first-party-ready', 'reference-ready', 'identity-review', 'evidence-gap']
  const visibleItems = report.items.slice(0, 50)
  const nextLane = lanes.find(lane => report.summary[lane] > 0) || 'evidence-gap'
  const lines = [
    '# Content Source Review Queue',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Scope',
    '',
    '- Read-only queue: it does not write Supabase or generate prose.',
    '- It excludes records already covered by formal editorial overlays.',
    '- It ranks buildings that lack substantial database text by existing source entry points and identity quality.',
    '- A link is a research entry point, not proof for every claim. Every final paragraph still requires human source review.',
    '',
    '## Summary',
    '',
    '| Review lane | Count |',
    '|---|---:|',
    ...lanes.map(lane => `| ${lane} | ${report.summary[lane]} |`),
    '',
    '## First 50 by priority',
    '',
    '| Lane | Building | Score | Existing entry points | Review instruction |',
    '|---|---|---:|---|---|',
    ...visibleItems.map(item => `| ${item.review_lane} | ${item.slug} — ${item.name.replaceAll('|', '\\|')} | ${item.priority_score} | ${item.source_entry_points.map(source => `[${source.label}](${source.url})`).join('<br>') || 'None'} | ${item.review_hint} |`),
    '',
    '## Next verified step',
    '',
    `- Review a small ${nextLane} batch manually, preserve the exact sources used, and only then prepare a reversible database write batch.`,
    '- Do not turn this queue into automated claims or bulk-generated descriptions.',
    '',
  ]
  return lines.join('\n')
}

async function main() {
  const [buildings, images] = await Promise.all([
    fetchAll<Building>('buildings'),
    fetchAll<Image>('images'),
  ])
  const primaryImages = new Set(images.filter(image => image.is_primary && image.source_url).map(image => image.building_id))
  const items = buildings
    .filter(building => !FORMAL_OVERLAY_SLUGS.has(building.slug))
    .filter(building => !hasText(building.description) && !hasText(building.significance) && !hasText(building.spatial_feat) && !hasText(building.light_feat) && !hasText(building.circulation))
    .map(building => {
      const review_lane = laneFor(building)
      const has_primary_image = primaryImages.has(building.id)
      return {
        slug: building.slug,
        name: displayName(building),
        review_lane,
        priority_score: priority(building, review_lane, has_primary_image),
        architect_slug: building.architect_slug,
        location: [building.city, building.country].filter(Boolean).join(', ') || null,
        year_start: building.year_start,
        type_slug: building.type_slug,
        source_entry_points: sourceEntryPoints(building),
        has_primary_image,
        review_hint: reviewHint(review_lane),
      }
    })
    .sort((a, b) => b.priority_score - a.priority_score || a.slug.localeCompare(b.slug))

  const summary: Record<Lane, number> = {
    'first-party-ready': 0,
    'reference-ready': 0,
    'identity-review': 0,
    'evidence-gap': 0,
  }
  for (const item of items) summary[item.review_lane] += 1
  const report = { generatedAt: new Date().toISOString(), summary, items }
  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))
  console.log('Content source review queue complete')
  for (const [lane, count] of Object.entries(summary)) console.log(`- ${lane}: ${count}`)
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
