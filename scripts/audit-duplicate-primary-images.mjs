import fs from 'node:fs/promises'
import { createClient } from '@supabase/supabase-js'
import imageOverrides from '../src/lib/image-overrides.json' with { type: 'json' }
import localImageOverrides from '../src/lib/local-image-overrides.json' with { type: 'json' }

const PAGE_SIZE = 500
const LEGACY_PRIMARY_LIMIT = 1000
const JSON_OUTPUT = 'reports/duplicate-primary-image-audit.json'
const MARKDOWN_OUTPUT = 'docs/reports/DUPLICATE_PRIMARY_IMAGE_AUDIT_2026-07-13.md'
const REVIEW_QUEUE_OUTPUT = 'db/review-queues/duplicate-primary-image-review-001.json'

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

const supabase = createClient(
  requiredEnv('NEXT_PUBLIC_SUPABASE_URL'),
  requiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
)

async function fetchAll(table, select, configure = query => query) {
  const rows = []
  for (let from = 0; ; from += PAGE_SIZE) {
    const response = await configure(supabase.from(table).select(select))
      .range(from, from + PAGE_SIZE - 1)
    if (response.error) throw new Error(`${table}: ${response.error.message}`)
    rows.push(...(response.data || []))
    if ((response.data || []).length < PAGE_SIZE) return rows
  }
}

function sourceClass(image) {
  const sourceText = [image.source, image.source_url, image.url_original].filter(Boolean).join(' ')
  if (/commons|wikimedia/i.test(sourceText)) return 'commons'
  if (/unsplash/i.test(sourceText)) return 'unsplash'
  if (/official|institution/i.test(sourceText)) return 'institutional'
  return 'other'
}

function isAttributionComplete(image) {
  return Boolean(image.photographer && image.license && image.source_url)
}

function buildCurrentPrimarySelection(legacyRows, completeRows) {
  const selected = new Map()
  for (const image of legacyRows) selected.set(image.building_id, image)
  for (const image of completeRows) if (!selected.has(image.building_id)) selected.set(image.building_id, image)
  return selected
}

const imageSelect = 'id,building_id,url_original,url_thumb_400,photographer,source,license,source_url,img_type,is_primary'
const [legacyPrimaryResponse, primaryImages, buildings] = await Promise.all([
  supabase.from('images').select(imageSelect).eq('is_primary', true).range(0, LEGACY_PRIMARY_LIMIT - 1),
  fetchAll('images', imageSelect, query => query
    .eq('is_primary', true)
    .order('building_id', { ascending: true })
    .order('id', { ascending: true })),
  fetchAll('buildings', 'id,slug,name_zh,name_en,name_ja,architect_slug,year_start,city,country', query => query.order('id')),
])

if (legacyPrimaryResponse.error) throw new Error(`images legacy selection: ${legacyPrimaryResponse.error.message}`)

const buildingById = new Map(buildings.map(building => [building.id, building]))
const imagesByBuilding = new Map()
for (const image of primaryImages) {
  imagesByBuilding.set(image.building_id, [...(imagesByBuilding.get(image.building_id) || []), image])
}
const currentPrimaryByBuilding = buildCurrentPrimarySelection(legacyPrimaryResponse.data || [], primaryImages)

const queue = []
for (const [buildingId, images] of imagesByBuilding) {
  if (images.length < 2) continue
  const building = buildingById.get(buildingId)
  if (!building) throw new Error(`Missing building for duplicate primary group ${buildingId}`)

  const classes = [...new Set(images.map(sourceClass))]
  const cachedOverride = localImageOverrides[building.slug] || null
  const curatedOverride = imageOverrides[building.slug] || null
  const runtimeOverride = cachedOverride || curatedOverride
  const runtimeOverrideSource = cachedOverride
    ? 'local-override'
    : curatedOverride
      ? 'curated-override'
      : null
  const selectedDatabaseImage = currentPrimaryByBuilding.get(buildingId) || null
  const selectedDatabaseClass = selectedDatabaseImage ? sourceClass(selectedDatabaseImage) : null
  const conflictType = classes.length === 1 && classes[0] === 'commons'
    ? 'commons-vs-commons'
    : classes.includes('commons') && classes.includes('unsplash')
      ? 'commons-vs-unsplash'
      : 'other-source-conflict'
  const priority = runtimeOverride
    ? 'P2-override-shielded'
    : selectedDatabaseClass === 'unsplash' && classes.includes('commons')
      ? 'P0-visible-unsplash-with-commons-candidate'
      : 'P1-primary-invariant-conflict'

  queue.push({
    building_id: buildingId,
    building_slug: building.slug,
    building: {
      name_zh: building.name_zh,
      name_en: building.name_en,
      name_ja: building.name_ja,
      architect_slug: building.architect_slug,
      year_start: building.year_start,
      city: building.city,
      country: building.country,
    },
    priority,
    conflict_type: conflictType,
    primary_count: images.length,
    source_classes: classes,
    runtime_cover_source: runtimeOverrideSource || 'supabase-primary-selection',
    selected_database_primary_id: selectedDatabaseImage?.id || null,
    selected_database_source_class: selectedDatabaseClass,
    runtime_override: runtimeOverride,
    candidates: images.map(image => ({
      ...image,
      source_class: sourceClass(image),
      attribution_complete: isAttributionComplete(image),
      selected_by_current_database_strategy: image.id === selectedDatabaseImage?.id,
    })),
    safe_auto_apply: false,
    review_status: 'needs-visual-identity-review',
    blocking_reasons: [
      'building identity and composition have not been compared visually',
      'a primary-image change must preserve photographer, source and open-license evidence',
    ],
    recommended_action: conflictType === 'commons-vs-commons'
      ? 'Compare both Commons files for building identity, composition and attribution before choosing one primary.'
      : 'Compare the Commons candidate with the current Unsplash candidate; do not demote either row until the Commons file is visually verified as the building.'
  })
}

const priorityOrder = new Map([
  ['P0-visible-unsplash-with-commons-candidate', 0],
  ['P1-primary-invariant-conflict', 1],
  ['P2-override-shielded', 2],
])
queue.sort((a, b) => priorityOrder.get(a.priority) - priorityOrder.get(b.priority)
  || a.building_slug.localeCompare(b.building_slug))

const countBy = (field, value) => queue.filter(item => item[field] === value).length
const summary = {
  primary_rows: primaryImages.length,
  buildings_with_primary: imagesByBuilding.size,
  duplicate_primary_buildings: queue.length,
  duplicate_primary_rows: queue.reduce((sum, item) => sum + item.primary_count, 0),
  three_primary_buildings: queue.filter(item => item.primary_count === 3).length,
  commons_vs_unsplash: countBy('conflict_type', 'commons-vs-unsplash'),
  commons_vs_commons: countBy('conflict_type', 'commons-vs-commons'),
  other_source_conflicts: countBy('conflict_type', 'other-source-conflict'),
  p0_visible_unsplash_with_commons_candidate: countBy('priority', 'P0-visible-unsplash-with-commons-candidate'),
  p1_primary_invariant_conflict: countBy('priority', 'P1-primary-invariant-conflict'),
  p2_override_shielded: countBy('priority', 'P2-override-shielded'),
  candidate_rows_missing_attribution: queue.flatMap(item => item.candidates).filter(image => !image.attribution_complete).length,
  safe_auto_apply: queue.filter(item => item.safe_auto_apply).length,
  formally_reviewed: queue.filter(item => item.review_status === 'reviewed').length,
}

const generatedAt = new Date().toISOString()
const audit = {
  generated_at: generatedAt,
  source: 'production Supabase read-only anon client',
  writes_database: false,
  selection_compatibility: 'Preserves the pre-pagination first-1000 database selection for already-visible buildings.',
  summary,
  items: queue,
}
const reviewQueue = {
  generated_at: generatedAt,
  batch: 'duplicate-primary-image-review-001',
  status: 'read-only-review-required',
  writes_database: false,
  policy: {
    auto_apply_allowed: false,
    required_before_write: [
      'visual building-identity verification',
      'source page and license recheck',
      'formal keep/demote decision for every primary row',
      'isolated PostgreSQL dry-run and guarded rollback',
    ],
  },
  summary,
  items: queue,
}

const p0Sample = queue.filter(item => item.priority.startsWith('P0')).slice(0, 25)
const commonsPairs = queue.filter(item => item.conflict_type === 'commons-vs-commons')
const markdown = `# Duplicate Primary Image Audit — 2026-07-13

Status: read-only review required

Production writes: none

Safe auto-apply candidates: **${summary.safe_auto_apply}**

## Result

- ${summary.primary_rows} rows currently have \`is_primary=true\` across ${summary.buildings_with_primary} buildings.
- ${summary.duplicate_primary_buildings} buildings have more than one primary row; ${summary.three_primary_buildings} have three.
- ${summary.commons_vs_unsplash} are Commons vs Unsplash conflicts.
- ${summary.commons_vs_commons} are Commons vs Commons conflicts.
- ${summary.candidate_rows_missing_attribution} candidate rows are missing photographer, license or source URL.
- ${summary.p0_visible_unsplash_with_commons_candidate} unshielded buildings currently resolve to Unsplash while a Commons candidate also exists.
- ${summary.p1_primary_invariant_conflict} unshielded buildings already resolve to Commons but still violate the one-primary invariant.
- ${summary.p2_override_shielded} buildings are currently shielded by a runtime cover override.

## Decision

No row is approved for automatic demotion. Different URLs are different editorial candidates, not mechanical duplicates. Every building requires visual identity and composition review before a guarded write batch can be prepared.

Priority order:

1. **P0** — visible Unsplash with a complete Commons candidate: review the user-visible choice first.
2. **P1** — unshielded invariant conflict: keep current display stable while deciding the canonical primary.
3. **P2** — runtime override shields the conflict: lower immediate product risk, but database cleanup is still required.

## First 25 P0 Review Items

| Building | Primary rows | Current DB choice | Conflict | Review status |
|---|---:|---|---|---|
${p0Sample.map(item => `| \`${item.building_slug}\` | ${item.primary_count} | ${item.selected_database_source_class} | ${item.conflict_type} | ${item.review_status} |`).join('\n')}

## Commons vs Commons

${commonsPairs.map(item => `- \`${item.building_slug}\`: ${item.candidates.map(candidate => `${candidate.photographer} (${candidate.license})`).join(' vs ')}`).join('\n')}

## Required Write Gate

Read-only inspection → formal keep/demote decision → source and license recheck → isolated PostgreSQL dry-run → conflict precheck → guarded production migration → write verification → PR → reviewed production release → live verification.

Machine-readable evidence:

- \`${JSON_OUTPUT}\`
- \`${REVIEW_QUEUE_OUTPUT}\`
`

await fs.mkdir('reports', { recursive: true })
await fs.mkdir('db/review-queues', { recursive: true })
await fs.mkdir('docs/reports', { recursive: true })
await Promise.all([
  fs.writeFile(JSON_OUTPUT, `${JSON.stringify(audit, null, 2)}\n`),
  fs.writeFile(REVIEW_QUEUE_OUTPUT, `${JSON.stringify(reviewQueue, null, 2)}\n`),
  fs.writeFile(MARKDOWN_OUTPUT, `${markdown.trim()}\n`),
])

console.log(JSON.stringify({
  outputs: [JSON_OUTPUT, MARKDOWN_OUTPUT, REVIEW_QUEUE_OUTPUT],
  summary,
}, null, 2))
