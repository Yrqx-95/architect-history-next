import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ensureReportDir, fetchAll, ROOT } from './supabase-script-utils'

type Building = {
  id: string
  slug: string
  wikidata_id: string | null
  name_en: string | null
  name_zh: string | null
  name_ja: string | null
  year_start: number | null
  era_slug: string | null
  architect_slug: string | null
  type_slug: string | null
  style_slugs: string[] | null
  country_code: string | null
}

type WikidataSnapshot = {
  id: string
  label_en: string
  label_zh: string
  label_ja: string
  description_en: string
  commons_category: string
  instance_of_id: string
  instance_of_label_en: string
  country_id: string
  country_label_en: string
  country_code: string
  located_in_label_en: string
  architect_label_en: string
  inception: string
  coordinate: string
}

type ReviewLane = 'safe-metadata-cleanup' | 'commons-name-candidate' | 'manual-name-research' | 'archive-scope-review'
type Confidence = 'high' | 'medium' | 'low'

export type IdentityCleanupInput = {
  current_slug: string
  current_name_en: string
  current_country_code: string
  wikidata_id: string
  wikidata_label_en: string
  wikidata_description_en: string
  wikidata_country_label_en: string
  wikidata_country_code: string
  wikidata_instance_of_label_en?: string
  commons_category: string
}

export type IdentityCleanupReview = IdentityCleanupInput & {
  review_lane: ReviewLane
  confidence: Confidence
  suggested_name_en: string
  suggested_slug: string
  suggested_country_code: string
  review_note: string
}

const TARGET_SLUGS = new Set([
  'q136394553',
  'q134893563',
  'q125679066',
  'new-orleans',
  'q3412221',
  'q123517303',
  'q118539028',
  'q116481414',
  'q125679109',
  'q125679110',
  'q125679342',
  'q125679108',
  'untitled',
  '',
])

const COUNTRY_QID_TO_CODE: Record<string, string> = {
  Q29: 'ES',
  Q38: 'IT',
  Q45: 'PT',
  Q55: 'NL',
  Q142: 'FR',
  Q183: 'DE',
}

const REPORT_DIR = ensureReportDir()
const REPORT_JSON = path.join(REPORT_DIR, 'era-identity-cleanup-review.json')
const REPORT_MD = path.join(REPORT_DIR, 'era-identity-cleanup-review.md')
const ARCHIVE_REPORT = path.join(ROOT, 'docs/archive/data-governance/ERA_IDENTITY_CLEANUP_REVIEW.md')

export function slugFromName(name: string) {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function isQidText(value: string) {
  return /^q\d+$/i.test(value.trim())
}

function cleanCommonsCategory(value: string) {
  return value.replace(/^Category:/, '').trim()
}

function nameFromWikidata(input: IdentityCleanupInput) {
  const label = input.wikidata_label_en.trim()
  if (label && !isQidText(label)) {
    if (label === 'New Orleans' && /Rotterdam/i.test(input.wikidata_description_en)) return 'New Orleans (Rotterdam)'
    return label
  }

  const commonsName = cleanCommonsCategory(input.commons_category)
  if (commonsName) return commonsName

  return ''
}

export function classifyIdentityCleanupCandidate(input: IdentityCleanupInput): IdentityCleanupReview {
  const suggestedName = nameFromWikidata(input)
  const suggestedSlug = suggestedName ? slugFromName(suggestedName) : ''
  const suggestedCountryCode = input.wikidata_country_code || input.current_country_code
  const currentLooksWeak = !input.current_slug || isQidText(input.current_slug) || isQidText(input.current_name_en)
  const countryMismatch = Boolean(input.wikidata_country_code && input.current_country_code && input.wikidata_country_code !== input.current_country_code)

  if (/artwork in public space|bus shelter/i.test(input.wikidata_description_en) || /reflecting pool|fountain/i.test(input.wikidata_instance_of_label_en || '')) {
    return {
      ...input,
      review_lane: 'archive-scope-review',
      confidence: 'medium',
      suggested_name_en: suggestedName,
      suggested_slug: suggestedSlug,
      suggested_country_code: suggestedCountryCode,
      review_note: 'Wikidata describes this as public artwork/infrastructure, not a clear building archive record.',
    }
  }

  if (suggestedName && (!currentLooksWeak || countryMismatch)) {
    return {
      ...input,
      review_lane: 'safe-metadata-cleanup',
      confidence: 'high',
      suggested_name_en: suggestedName,
      suggested_slug: suggestedSlug,
      suggested_country_code: suggestedCountryCode,
      review_note: countryMismatch
        ? 'Public name is available and country code differs from Wikidata; safe candidate for metadata correction.'
        : 'Public name is available; safe candidate for slug/display cleanup.',
    }
  }

  if (suggestedName) {
    return {
      ...input,
      review_lane: 'commons-name-candidate',
      confidence: 'medium',
      suggested_name_en: suggestedName,
      suggested_slug: suggestedSlug,
      suggested_country_code: suggestedCountryCode,
      review_note: 'No English Wikidata label, but Commons category gives a plausible public-facing name.',
    }
  }

  return {
    ...input,
    review_lane: 'manual-name-research',
    confidence: 'medium',
    suggested_name_en: '',
    suggested_slug: '',
    suggested_country_code: suggestedCountryCode,
    review_note: 'No public-facing English label or Commons category; derive name manually from description/address before writing.',
  }
}

function qidFromClaim(entity: WikidataEntity, property: string) {
  const value = entity.claims?.[property]?.[0]?.mainsnak?.datavalue?.value
  return typeof value === 'object' && value && 'id' in value ? String(value.id) : ''
}

function timeFromClaim(entity: WikidataEntity, property: string) {
  const value = entity.claims?.[property]?.[0]?.mainsnak?.datavalue?.value
  return typeof value === 'object' && value && 'time' in value ? String(value.time) : ''
}

function coordinateFromClaim(entity: WikidataEntity, property: string) {
  const value = entity.claims?.[property]?.[0]?.mainsnak?.datavalue?.value
  if (typeof value === 'object' && value && 'latitude' in value && 'longitude' in value) {
    return `${value.latitude},${value.longitude}`
  }
  return ''
}

type WikidataEntity = {
  labels?: Record<string, { value: string }>
  descriptions?: Record<string, { value: string }>
  sitelinks?: Record<string, { title: string }>
  claims?: Record<string, Array<{ mainsnak?: { datavalue?: { value?: unknown } } }>>
}

export async function fetchWikidata(ids: string[]) {
  const uniqueIds = [...new Set(ids.filter(Boolean))]
  if (uniqueIds.length === 0) return {}

  const entityUrl = new URL('https://www.wikidata.org/w/api.php')
  entityUrl.searchParams.set('action', 'wbgetentities')
  entityUrl.searchParams.set('ids', uniqueIds.join('|'))
  entityUrl.searchParams.set('props', 'labels|descriptions|claims|sitelinks')
  entityUrl.searchParams.set('languages', 'en|zh|ja')
  entityUrl.searchParams.set('format', 'json')
  entityUrl.searchParams.set('origin', '*')

  const response = await fetch(entityUrl, { headers: { 'user-agent': 'Archistory identity cleanup review/1.0 (https://archistory.app)' } })
  if (!response.ok) throw new Error(`Wikidata entity fetch failed: ${response.status} ${response.statusText}`)
  const data = (await response.json()) as { entities: Record<string, WikidataEntity> }

  const claimIds = new Set<string>()
  for (const entity of Object.values(data.entities)) {
    for (const property of ['P31', 'P17', 'P131', 'P84']) {
      const qid = qidFromClaim(entity, property)
      if (qid) claimIds.add(qid)
    }
  }

  const labelMap: Record<string, string> = {}
  if (claimIds.size) {
    const labelUrl = new URL('https://www.wikidata.org/w/api.php')
    labelUrl.searchParams.set('action', 'wbgetentities')
    labelUrl.searchParams.set('ids', [...claimIds].join('|'))
    labelUrl.searchParams.set('props', 'labels')
    labelUrl.searchParams.set('languages', 'en')
    labelUrl.searchParams.set('format', 'json')
    labelUrl.searchParams.set('origin', '*')
    const labelResponse = await fetch(labelUrl, { headers: { 'user-agent': 'Archistory identity cleanup review/1.0 (https://archistory.app)' } })
    if (!labelResponse.ok) throw new Error(`Wikidata label fetch failed: ${labelResponse.status} ${labelResponse.statusText}`)
    const labelData = (await labelResponse.json()) as { entities: Record<string, WikidataEntity> }
    for (const [id, entity] of Object.entries(labelData.entities)) labelMap[id] = entity.labels?.en?.value || ''
  }

  const snapshots: Record<string, WikidataSnapshot> = {}
  for (const [id, entity] of Object.entries(data.entities)) {
    const instanceOf = qidFromClaim(entity, 'P31')
    const country = qidFromClaim(entity, 'P17')
    const locatedIn = qidFromClaim(entity, 'P131')
    const architect = qidFromClaim(entity, 'P84')
    snapshots[id] = {
      id,
      label_en: entity.labels?.en?.value || '',
      label_zh: entity.labels?.zh?.value || '',
      label_ja: entity.labels?.ja?.value || '',
      description_en: entity.descriptions?.en?.value || '',
      commons_category: entity.sitelinks?.commonswiki?.title || '',
      instance_of_id: instanceOf,
      instance_of_label_en: labelMap[instanceOf] || '',
      country_id: country,
      country_label_en: labelMap[country] || '',
      country_code: COUNTRY_QID_TO_CODE[country] || '',
      located_in_label_en: labelMap[locatedIn] || '',
      architect_label_en: labelMap[architect] || '',
      inception: timeFromClaim(entity, 'P571'),
      coordinate: coordinateFromClaim(entity, 'P625'),
    }
  }
  return snapshots
}

function buildInput(building: Building, snapshot: WikidataSnapshot): IdentityCleanupInput {
  return {
    current_slug: building.slug || '',
    current_name_en: building.name_en || '',
    current_country_code: building.country_code || '',
    wikidata_id: building.wikidata_id || snapshot.id,
    wikidata_label_en: snapshot.label_en,
    wikidata_description_en: snapshot.description_en,
    wikidata_country_label_en: snapshot.country_label_en,
    wikidata_country_code: snapshot.country_code,
    wikidata_instance_of_label_en: snapshot.instance_of_label_en,
    commons_category: snapshot.commons_category,
  }
}

function markdownReport(report: {
  generatedAt: string
  items: Array<IdentityCleanupReview & { year_start: number | null; architect_slug: string | null; instance_of: string; located_in: string }>
}) {
  const laneCounts = new Map<ReviewLane, number>()
  for (const item of report.items) laneCounts.set(item.review_lane, (laneCounts.get(item.review_lane) || 0) + 1)

  const lines = [
    '# Era Identity Cleanup Review',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    '## Scope',
    '',
    '- This is a read-only identity cleanup review for weak `year-unique` era candidates.',
    '- It does not write Supabase and does not create a migration.',
    '- External facts are fetched from Wikidata using each row\'s `wikidata_id`.',
    '- Use this report before deciding which records are safe enough for a future metadata migration.',
    '',
    '## Summary By Review Lane',
    '',
    '| Review lane | Count |',
    '|---|---:|',
  ]

  for (const lane of ['safe-metadata-cleanup', 'commons-name-candidate', 'manual-name-research', 'archive-scope-review'] as ReviewLane[]) {
    lines.push(`| ${lane} | ${laneCounts.get(lane) || 0} |`)
  }

  lines.push('', '## Review Queue', '')
  lines.push('| Lane | Confidence | Current slug | Current name | Wikidata | Wikidata description | Suggested name | Suggested slug | Country | Architect | Type/location | Note |')
  lines.push('|---|---|---|---|---|---|---|---|---|---|---|---|')

  for (const item of report.items) {
    lines.push(
      `| ${item.review_lane} | ${item.confidence} | ${item.current_slug || '(missing slug)'} | ${item.current_name_en.replaceAll('|', '\\|')} | ${
        item.wikidata_id
      } | ${item.wikidata_description_en.replaceAll('|', '\\|')} | ${item.suggested_name_en.replaceAll('|', '\\|')} | ${
        item.suggested_slug
      } | ${item.current_country_code || '(blank)'} -> ${item.suggested_country_code || '(unknown)'} | ${
        item.architect_slug || ''
      } | ${[item.instance_of, item.located_in].filter(Boolean).join(' / ')} | ${item.review_note.replaceAll('|', '\\|')} |`
    )
  }

  lines.push('', '## Recommended Next Step', '')
  if ((laneCounts.get('safe-metadata-cleanup') || 0) > 0) {
    lines.push('- Prepare a tiny metadata migration only for `safe-metadata-cleanup` after reviewing slug collisions.')
  } else {
    lines.push('- No `safe-metadata-cleanup` records remain in this review snapshot.')
  }
  if ((laneCounts.get('commons-name-candidate') || 0) > 0) {
    lines.push('- Keep `commons-name-candidate` as review-first: Commons category names are useful but not always final display names.')
  } else {
    lines.push('- No `commons-name-candidate` records remain in this review snapshot.')
  }
  lines.push('- Do not assign era metadata to `archive-scope-review` records until deciding whether they belong in `buildings`.')
  lines.push('- Run `data:plan-eras` after any future metadata write to confirm the remaining queue changes as expected.')
  lines.push('')

  return lines.join('\n')
}

async function main() {
  const buildings = (await fetchAll<Building>('buildings'))
    .filter(building => TARGET_SLUGS.has(building.slug || ''))
    .filter(building => building.wikidata_id)
    .sort((a, b) => (a.year_start || 0) - (b.year_start || 0) || (a.slug || '').localeCompare(b.slug || ''))
  const snapshots = await fetchWikidata(buildings.map(building => building.wikidata_id || ''))

  const items = buildings.map(building => {
    const snapshot = snapshots[building.wikidata_id || '']
    const review = classifyIdentityCleanupCandidate(buildInput(building, snapshot))
    return {
      ...review,
      year_start: building.year_start,
      architect_slug: building.architect_slug,
      instance_of: snapshot.instance_of_label_en,
      located_in: snapshot.located_in_label_en,
    }
  })

  const report = {
    generatedAt: new Date().toISOString(),
    items,
  }

  const markdown = markdownReport(report)
  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdown)
  fs.writeFileSync(ARCHIVE_REPORT, markdown)

  console.log('Era identity cleanup review complete')
  console.log(`- candidates: ${items.length}`)
  for (const lane of ['safe-metadata-cleanup', 'commons-name-candidate', 'manual-name-research', 'archive-scope-review'] as ReviewLane[]) {
    console.log(`- ${lane}: ${items.filter(item => item.review_lane === lane).length}`)
  }
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
  console.log(`- archive: ${path.relative(ROOT, ARCHIVE_REPORT)}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(error)
    process.exit(1)
  })
}
