import fs from 'node:fs'
import path from 'node:path'

import { fetchAll } from './supabase-script-utils.ts'
import { buildAliasResolver, matchBuildingFunctionCandidates } from './lib/building-function-taxonomy.mjs'

const ROOT = process.cwd()
const TAXONOMY_PATH = path.join(ROOT, 'db/taxonomies/building-functions-v1.json')
const JSON_PATH = path.join(ROOT, 'db/review-queues/building-function-candidates-001.json')
const MD_PATH = path.join(ROOT, 'docs/BUILDING_FUNCTION_CANDIDATES.md')

const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'))
buildAliasResolver(taxonomy)

const buildings = await fetchAll('buildings')
const candidates = []

for (const building of buildings) {
  for (const match of matchBuildingFunctionCandidates(building, taxonomy)) {
    candidates.push({
      building_id: building.id,
      building_slug: building.slug,
      name_zh: building.name_zh || null,
      name_en: building.name_en,
      name_ja: building.name_ja || null,
      wikidata_id: building.wikidata_id || null,
      architect_slug: building.architect_slug || null,
      year_start: building.year_start ?? null,
      city: building.city || null,
      country_code: building.country_code || null,
      current_type_slug: building.type_slug || null,
      function_slug: match.function_slug,
      review_status: 'candidate',
      discovery_method: 'name-signal-only',
      evidence: match.evidence,
      source_url: building.official_url || building.wikipedia_url || null,
      warning: 'Name/type signals create a review candidate only; source evidence is required before approval.',
    })
  }
}

candidates.sort((a, b) =>
  a.function_slug.localeCompare(b.function_slug) || a.building_slug.localeCompare(b.building_slug),
)

const counts = Object.fromEntries(
  taxonomy.functions.map(item => [item.slug, candidates.filter(row => row.function_slug === item.slug).length]),
)
const payload = {
  schema_version: 1,
  taxonomy_version: taxonomy.version,
  generated_at: new Date().toISOString(),
  mode: 'read-only-candidate-generation',
  source_building_count: buildings.length,
  candidate_assignment_count: candidates.length,
  counts_by_function: counts,
  rules: [
    'No database write is performed.',
    'Name/type matches never become approved assignments automatically.',
    'Each approval requires project-function evidence from a traceable source.',
  ],
  candidates,
}

fs.mkdirSync(path.dirname(JSON_PATH), { recursive: true })
fs.writeFileSync(JSON_PATH, `${JSON.stringify(payload, null, 2)}\n`)

const lines = [
  '# Building Function Candidate Queue',
  '',
  `- Taxonomy: ${taxonomy.version}`,
  `- Source buildings: ${buildings.length}`,
  `- Candidate assignments: ${candidates.length}`,
  '- Mode: read-only; every row remains candidate',
  '',
  '## Counts',
  '',
  '| Function | Candidates |',
  '|---|---:|',
  ...Object.entries(counts).map(([slug, count]) => `| ${slug} | ${count} |`),
  '',
  '## Library First Review Batch',
  '',
  '| Building | Current type | Name signal | Source present |',
  '|---|---|---|---|',
  ...candidates
    .filter(row => row.function_slug === 'library')
    .map(row => `| ${row.building_slug} | ${row.current_type_slug || ''} | ${row.evidence.map(item => `${item.field}:${item.alias}`).join(', ')} | ${row.source_url ? 'yes' : 'no'} |`),
  '',
  'Names are discovery signals, not proof of function. G4 approval must inspect an official or otherwise traceable project source.',
  '',
]
fs.writeFileSync(MD_PATH, lines.join('\n'))

console.log(`Generated ${candidates.length} read-only function candidates from ${buildings.length} buildings.`)
console.log(`Library first-review batch: ${counts.library || 0}`)
console.log(JSON_PATH)
console.log(MD_PATH)
