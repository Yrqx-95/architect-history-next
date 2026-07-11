#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key. Run through npm run images:prepare-reviewed.')
  process.exit(1)
}

const queuePath = path.join('reports', 'image-fill-queue.json')
const reportJsonPath = path.join('reports', 'image-fill-reviewed.json')
const reportMarkdownPath = path.join('reports', 'image-fill-reviewed.md')
const insertDraftPath = path.join('reports', 'image-fill-reviewed-insert-draft.sql')
const rollbackDraftPath = path.join('reports', 'image-fill-reviewed-rollback-draft.sql')
const archiveReportPath = path.join('docs', 'archive', 'data-governance', 'IMAGE_FILL_REVIEWED_BATCH_001.md')

const trustedSources = new Set(['Wikimedia Commons', 'Museum Open Access', 'IIIF', 'Local Curated'])
const acceptedLicensePattern = /^(CC0|Public domain|CC BY(?:-SA)?)(?:$|\s)/i
const rejectedLicensePattern = /(?:\bNC\b|NonCommercial|NoDerivatives|\bND\b)/i
const nonImageExtensions = ['.ogg', '.oga', '.mp3', '.mp4', '.webm', '.pdf', '.svg']

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
})

function acceptedLicense(license) {
  return Boolean(license && acceptedLicensePattern.test(license) && !rejectedLicensePattern.test(license))
}

function isDisplayableImageUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false
  const clean = value.split('?')[0].toLowerCase()
  return !nonImageExtensions.some(extension => clean.endsWith(extension))
}

function hasTrustedImage(image) {
  return trustedSources.has(image.source) &&
    acceptedLicense(image.license) &&
    Boolean(image.source_url) &&
    isDisplayableImageUrl(image.url_original || image.url_thumb_400)
}

function normalize(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .toLowerCase()
    .trim()
}

function stripHtml(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function bestName(building) {
  return building.name_en || building.name_zh || building.name_ja || building.slug
}

function isPlaceholderIdentity(building) {
  const qid = String(building.wikidata_id || '')
  return /^q\d+$/i.test(building.slug) || normalize(bestName(building)) === normalize(qid)
}

function fileTitle(value) {
  return String(value || '').replace(/^File:/i, '').replaceAll('_', ' ').trim()
}

function representationWarning(candidate) {
  const text = `${candidate.object_name || ''} ${candidate.description || ''}`
  if (/\bmodel\b/i.test(text)) return 'model-or-exhibition-view-needs-context-review'
  if (/construction progress|under construction/i.test(text)) return 'construction-progress-view-needs-context-review'
  return null
}

function entityNames(entity) {
  const labels = Object.values(entity?.labels || {}).map(item => item.value)
  const sitelinks = Object.values(entity?.sitelinks || {}).map(item => item.title)
  return [...labels, ...sitelinks].filter(Boolean)
}

function entityNameMatches(building, entity) {
  const expected = normalize(bestName(building))
  if (!expected) return false
  return entityNames(entity).some(value => {
    const actual = normalize(value)
    if (!actual) return false
    if (actual === expected) return true
    return Math.min(actual.length, expected.length) >= 8 && (actual.includes(expected) || expected.includes(actual))
  })
}

function entityArchitectIds(entity) {
  return (entity?.claims?.P84 || [])
    .map(claim => claim?.mainsnak?.datavalue?.value?.id)
    .filter(Boolean)
}

function entityP18(entity) {
  return entity?.claims?.P18?.[0]?.mainsnak?.datavalue?.value || null
}

function entityYear(entity) {
  const time = entity?.claims?.P571?.[0]?.mainsnak?.datavalue?.value?.time
  const match = String(time || '').match(/^\+(-?\d{1,6})-/)
  return match ? Number(match[1]) : null
}

async function fetchWikidataEntities(ids) {
  if (!ids.length) return {}
  const params = new URLSearchParams({
    action: 'wbgetentities',
    ids: ids.join('|'),
    props: 'labels|descriptions|claims|sitelinks',
    languages: 'en|zh|ja',
    format: 'json',
    formatversion: '2',
  })
  const response = await fetch(`https://www.wikidata.org/w/api.php?${params}`, {
    headers: { 'User-Agent': 'ArchistoryImageReview/1.0 (local data quality script)' },
  })
  if (!response.ok) throw new Error(`Wikidata lookup failed: HTTP ${response.status}`)
  return (await response.json()).entities || {}
}

async function fetchCommonsFiles(filenames) {
  if (!filenames.length) return new Map()
  const params = new URLSearchParams({
    action: 'query',
    titles: filenames.map(filename => `File:${fileTitle(filename)}`).join('|'),
    prop: 'imageinfo',
    iiprop: 'url|extmetadata|mime|size',
    iiurlwidth: '400',
    redirects: '1',
    format: 'json',
    formatversion: '2',
    origin: '*',
  })
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers: { 'User-Agent': 'ArchistoryImageReview/1.0 (local data quality script)' },
  })
  if (!response.ok) throw new Error(`Commons lookup failed: HTTP ${response.status}`)
  const payload = await response.json()
  const files = new Map()
  for (const page of payload.query?.pages || []) {
    const info = page.imageinfo?.[0]
    if (!info) continue
    const metadata = info.extmetadata || {}
    const candidate = {
      page_title: page.title,
      url_original: info.url,
      url_thumb_400: info.thumburl || null,
      width: info.width || null,
      height: info.height || null,
      mime: info.mime || null,
      photographer: stripHtml(metadata.Artist?.value || metadata.Credit?.value || ''),
      source: 'Wikimedia Commons',
      license: metadata.LicenseShortName?.value || metadata.UsageTerms?.value || null,
      license_url: metadata.LicenseUrl?.value || null,
      source_url: info.descriptionurl,
      object_name: stripHtml(metadata.ObjectName?.value || ''),
      description: stripHtml(metadata.ImageDescription?.value || ''),
    }
    files.set(normalize(fileTitle(page.title)), candidate)
  }
  return files
}

async function fetchCurrentRows(candidates) {
  const ids = candidates.map(item => item.building.id)
  const [buildingResult, imageResult] = await Promise.all([
    supabase.from('buildings').select('id,slug,wikidata_id,name_en,name_zh,name_ja,architect_slug,year_start').in('id', ids),
    supabase.from('images').select('id,building_id,url_original,url_thumb_400,photographer,source,license,source_url,img_type,is_primary').in('building_id', ids),
  ])
  if (buildingResult.error) throw new Error(`buildings: ${buildingResult.error.message}`)
  if (imageResult.error) throw new Error(`images: ${imageResult.error.message}`)
  return {
    buildings: buildingResult.data || [],
    images: imageResult.data || [],
  }
}

function architectMatches(building, entity, architectEntities) {
  const expected = normalize(building.architect_slug)
  if (!expected) return false
  return entityArchitectIds(entity).some(id => {
    const labels = Object.values(architectEntities[id]?.labels || {})
      .map(item => normalize(item.value))
      .filter(Boolean)
    return labels.some(label => {
      if (label === expected) return true
      return Math.min(label.length, expected.length) >= 8 && (label.includes(expected) || expected.includes(label))
    })
  })
}

function sqlString(value) {
  return `'${String(value).replaceAll("'", "''")}'`
}

function sqlNullable(value) {
  return value === null || value === undefined || value === '' ? 'NULL' : sqlString(value)
}

function decisionRows(items) {
  return items.map(item => {
    const insert = item.proposed_insert
    return `  (${sqlString(item.building.slug)}, ${sqlString(item.building.id)}::uuid, ${sqlString(item.previous_primary.id)}::uuid, ${sqlString(insert.url_original)}, ${sqlNullable(insert.url_thumb_400)}, ${sqlNullable(insert.photographer)}, ${sqlString(insert.source)}, ${sqlString(insert.license)}, ${sqlString(insert.source_url)}, ${sqlString(insert.img_type)})`
  }).join(',\n')
}

function buildInsertDraft(items) {
  if (items.length === 0) return '-- No approved image-fill decisions were generated.\n'
  return `-- REVIEW DRAFT ONLY. Do not run before human review.
-- Batch 001: replace low-confidence primary images with reviewed Commons images.
-- The transaction aborts if building identity, prior primary state, or duplicate state changed.

BEGIN;

CREATE TEMP TABLE reviewed_image_fill_batch_001 (
  building_slug text PRIMARY KEY,
  building_id uuid NOT NULL,
  previous_primary_id uuid NOT NULL,
  url_original text NOT NULL,
  url_thumb_400 text,
  photographer text,
  source text NOT NULL,
  license text NOT NULL,
  source_url text NOT NULL,
  img_type text NOT NULL
) ON COMMIT DROP;

INSERT INTO reviewed_image_fill_batch_001 (
  building_slug, building_id, previous_primary_id, url_original, url_thumb_400,
  photographer, source, license, source_url, img_type
) VALUES
${decisionRows(items)};

DO $$
DECLARE
  expected_count integer := ${items.length};
  matched_buildings integer;
  matched_primaries integer;
  duplicate_candidates integer;
BEGIN
  SELECT count(*) INTO matched_buildings
  FROM reviewed_image_fill_batch_001 AS decision
  JOIN public.buildings AS building
    ON building.id = decision.building_id
   AND building.slug = decision.building_slug;

  IF matched_buildings <> expected_count THEN
    RAISE EXCEPTION 'Expected % matched buildings, found %', expected_count, matched_buildings;
  END IF;

  SELECT count(*) INTO matched_primaries
  FROM reviewed_image_fill_batch_001 AS decision
  JOIN public.images AS image
    ON image.id = decision.previous_primary_id
   AND image.building_id = decision.building_id
   AND image.is_primary = true;

  IF matched_primaries <> expected_count THEN
    RAISE EXCEPTION 'Expected % unchanged prior primary images, found %', expected_count, matched_primaries;
  END IF;

  SELECT count(*) INTO duplicate_candidates
  FROM reviewed_image_fill_batch_001 AS decision
  JOIN public.images AS image
    ON image.building_id = decision.building_id
   AND image.source_url = decision.source_url;

  IF duplicate_candidates <> 0 THEN
    RAISE EXCEPTION 'Expected no existing reviewed candidate images, found %', duplicate_candidates;
  END IF;
END $$;

UPDATE public.images AS image
SET is_primary = false
FROM reviewed_image_fill_batch_001 AS decision
WHERE image.id = decision.previous_primary_id
  AND image.building_id = decision.building_id
  AND image.is_primary = true;

INSERT INTO public.images (
  building_id, url_original, url_thumb_400, photographer,
  source, license, source_url, img_type, is_primary
)
SELECT
  building_id, url_original, url_thumb_400, photographer,
  source, license, source_url, img_type, true
FROM reviewed_image_fill_batch_001;

COMMIT;
`
}

function buildRollbackDraft(items) {
  if (items.length === 0) return '-- No approved image-fill decisions were generated; no rollback is needed.\n'
  const rows = items.map(item => `  (${sqlString(item.building.slug)}, ${sqlString(item.building.id)}::uuid, ${sqlString(item.previous_primary.id)}::uuid, ${sqlString(item.proposed_insert.source_url)})`).join(',\n')
  return `-- REVIEW DRAFT ONLY. Rollback for image fill batch 001.

BEGIN;

CREATE TEMP TABLE reviewed_image_fill_batch_001_rollback (
  building_slug text PRIMARY KEY,
  building_id uuid NOT NULL,
  previous_primary_id uuid NOT NULL,
  inserted_source_url text NOT NULL
) ON COMMIT DROP;

INSERT INTO reviewed_image_fill_batch_001_rollback (
  building_slug, building_id, previous_primary_id, inserted_source_url
) VALUES
${rows};

DO $$
DECLARE
  expected_count integer := ${items.length};
  inserted_count integer;
  previous_count integer;
  unexpected_primary_count integer;
BEGIN
  SELECT count(*) INTO inserted_count
  FROM reviewed_image_fill_batch_001_rollback AS decision
  JOIN public.images AS image
    ON image.building_id = decision.building_id
   AND image.source_url = decision.inserted_source_url
   AND image.is_primary = true;

  IF inserted_count <> expected_count THEN
    RAISE EXCEPTION 'Expected % inserted primary images, found %', expected_count, inserted_count;
  END IF;

  SELECT count(*) INTO previous_count
  FROM reviewed_image_fill_batch_001_rollback AS decision
  JOIN public.images AS image
    ON image.id = decision.previous_primary_id
   AND image.building_id = decision.building_id;

  IF previous_count <> expected_count THEN
    RAISE EXCEPTION 'Expected % previous primary rows, found %', expected_count, previous_count;
  END IF;

  SELECT count(*) INTO unexpected_primary_count
  FROM reviewed_image_fill_batch_001_rollback AS decision
  JOIN public.images AS image
    ON image.building_id = decision.building_id
   AND image.is_primary = true
   AND image.source_url <> decision.inserted_source_url;

  IF unexpected_primary_count <> 0 THEN
    RAISE EXCEPTION 'Found % unexpected primary images; review rollback manually', unexpected_primary_count;
  END IF;
END $$;

DELETE FROM public.images AS image
USING reviewed_image_fill_batch_001_rollback AS decision
WHERE image.building_id = decision.building_id
  AND image.source_url = decision.inserted_source_url;

UPDATE public.images AS image
SET is_primary = true
FROM reviewed_image_fill_batch_001_rollback AS decision
WHERE image.id = decision.previous_primary_id
  AND image.building_id = decision.building_id;

COMMIT;
`
}

function escapeMarkdown(value) {
  return String(value || '').replaceAll('|', '\\|').replaceAll('\n', ' ')
}

function buildMarkdown(report) {
  const lines = [
    '# Image Fill Reviewed Batch 001',
    '',
    `Generated: ${report.generated_at}`,
    '',
    '## Scope',
    '',
    '- Read-only preparation: no database rows were changed.',
    '- Every approved image was rechecked against the live building row, Wikidata P18, Wikimedia Commons metadata, and the current primary image state.',
    '- Q-ID placeholder identities, model/exhibition views, and construction-progress views stay out of the write draft.',
    '- The SQL draft replaces only the current low-confidence primary image and records photographer, license, and source URL for visible attribution.',
    '',
    '## Summary',
    '',
    `- Queue candidates reviewed: ${report.totals.reviewed}`,
    `- Approved for write draft: ${report.totals.approved}`,
    `- Held for manual review: ${report.totals.held}`,
    `- Insert draft: \`${insertDraftPath}\``,
    `- Rollback draft: \`${rollbackDraftPath}\``,
    '',
    '## Approved',
    '',
    '| Building | Wikidata | Evidence | License | Previous primary | Source |',
    '|---|---|---|---|---|---|',
  ]

  for (const item of report.approved) {
    lines.push(`| ${escapeMarkdown(item.building.slug)} | ${escapeMarkdown(item.building.wikidata_id)} | ${escapeMarkdown(item.identity_evidence.join(', '))} | ${escapeMarkdown(item.proposed_insert.license)} | ${escapeMarkdown(item.previous_primary.source)} | ${escapeMarkdown(item.proposed_insert.source_url)} |`)
  }

  if (report.approved.length === 0) lines.push('| None |  |  |  |  |  |')

  lines.push('', '## Held For Manual Review', '')
  lines.push('| Building | Wikidata | Reasons | Candidate |')
  lines.push('|---|---|---|---|')
  for (const item of report.held) {
    lines.push(`| ${escapeMarkdown(item.building.slug)} | ${escapeMarkdown(item.building.wikidata_id)} | ${escapeMarkdown(item.reasons.join(', '))} | ${escapeMarkdown(item.candidate?.source_url)} |`)
  }
  if (report.held.length === 0) lines.push('| None |  |  |  |')

  lines.push('', '## Verification Before Any Write', '')
  lines.push('- Human-check the approved source pages and confirm the image represents the named work, not merely its site or institution.')
  lines.push('- Run the SQL draft only after converting it to the project migration workflow; Supabase CLI is currently unavailable in this checkout.')
  lines.push('- After application, verify exactly one primary image per affected building, then run image audit, content audit, typecheck, and lint.')
  lines.push('')
  return lines.join('\n')
}

async function main() {
  const queue = JSON.parse(await fs.readFile(queuePath, 'utf8'))
  const queuedCandidates = Array.isArray(queue.safe_auto_candidates) ? queue.safe_auto_candidates : []
  if (queuedCandidates.length === 0) throw new Error('No safe_auto_candidates found in the current image fill queue')

  const { buildings, images } = await fetchCurrentRows(queuedCandidates)
  const buildingsById = new Map(buildings.map(building => [building.id, building]))
  const imagesByBuilding = new Map()
  for (const image of images) {
    if (!imagesByBuilding.has(image.building_id)) imagesByBuilding.set(image.building_id, [])
    imagesByBuilding.get(image.building_id).push(image)
  }

  const qids = [...new Set(queuedCandidates.map(item => item.building.wikidata_id).filter(Boolean))]
  const entities = await fetchWikidataEntities(qids)
  const architectIds = [...new Set(Object.values(entities).flatMap(entityArchitectIds))]
  const architectEntities = await fetchWikidataEntities(architectIds)
  const p18Filenames = [...new Set(Object.values(entities).map(entityP18).filter(Boolean))]
  const commonsFiles = await fetchCommonsFiles(p18Filenames)

  const approved = []
  const held = []

  for (const queued of queuedCandidates) {
    const building = buildingsById.get(queued.building.id) || queued.building
    const entity = entities[building.wikidata_id]
    const p18 = entityP18(entity)
    const candidate = commonsFiles.get(normalize(fileTitle(p18))) || queued.candidate
    const relatedImages = imagesByBuilding.get(building.id) || []
    const currentPrimaries = relatedImages.filter(image => image.is_primary)
    const trustedExisting = relatedImages.filter(hasTrustedImage)
    const duplicateCandidate = relatedImages.some(image => image.source_url === candidate?.source_url)
    const p18MatchesQueue = normalize(fileTitle(p18)) === normalize(fileTitle(queued.candidate?.page_title))
    const nameMatch = entityNameMatches(building, entity)
    const architectMatch = architectMatches(building, entity, architectEntities)
    const liveYear = entityYear(entity)
    const yearMatch = building.year_start && liveYear ? Number(building.year_start) === liveYear : false
    const warning = representationWarning(candidate || {})
    const reasons = []

    if (!buildingsById.has(queued.building.id)) reasons.push('building-row-no-longer-exists')
    if (building.wikidata_id !== queued.building.wikidata_id) reasons.push('wikidata-id-changed-since-queue')
    if (!entity || entity.missing) reasons.push('wikidata-entity-missing')
    if (!p18 || !p18MatchesQueue) reasons.push('wikidata-p18-changed-or-mismatched')
    if (isPlaceholderIdentity(building)) reasons.push('q-id-placeholder-identity')
    if (!nameMatch && !architectMatch) reasons.push('insufficient-entity-identity-evidence')
    if (!candidate?.source_url || !candidate?.url_original) reasons.push('commons-metadata-incomplete')
    if (!candidate?.mime?.startsWith('image/') || !isDisplayableImageUrl(candidate?.url_original)) reasons.push('candidate-is-not-displayable-image')
    if (!acceptedLicense(candidate?.license)) reasons.push('license-not-approved')
    if (!candidate?.license_url && !/^CC0|Public domain/i.test(candidate?.license || '')) reasons.push('license-url-missing')
    if (!candidate?.photographer && !/^CC0|Public domain/i.test(candidate?.license || '')) reasons.push('required-attribution-author-missing')
    if (trustedExisting.length > 0) reasons.push('trusted-image-now-exists')
    if (duplicateCandidate) reasons.push('candidate-already-present')
    if (currentPrimaries.length !== 1) reasons.push(`expected-one-current-primary-found-${currentPrimaries.length}`)
    if (warning) reasons.push(warning)

    const identityEvidence = []
    if (nameMatch) identityEvidence.push('wikidata-name-or-sitelink-match')
    if (architectMatch) identityEvidence.push('wikidata-architect-match')
    if (yearMatch) identityEvidence.push('wikidata-year-match')
    if (p18MatchesQueue) identityEvidence.push('wikidata-p18-stable')

    const reviewed = {
      building,
      entity: {
        labels: entity?.labels || {},
        descriptions: entity?.descriptions || {},
        sitelinks: entity?.sitelinks || {},
        p18,
        architect_ids: entityArchitectIds(entity),
        year: liveYear,
      },
      candidate,
      identity_evidence: identityEvidence,
      previous_primary: currentPrimaries[0] || null,
      proposed_insert: candidate ? {
        building_id: building.id,
        url_original: candidate.url_original,
        url_thumb_400: candidate.url_thumb_400,
        photographer: candidate.photographer || null,
        source: 'Wikimedia Commons',
        license: candidate.license,
        license_url: candidate.license_url,
        source_url: candidate.source_url,
        img_type: 'exterior',
        is_primary: true,
      } : null,
    }

    if (reasons.length > 0) held.push({ ...reviewed, reasons })
    else approved.push(reviewed)
  }

  const report = {
    generated_at: new Date().toISOString(),
    writes_database: false,
    source_queue_generated_at: queue.generated_at,
    policy: {
      approved_licenses: 'CC0, Public domain, CC BY, CC BY-SA; excludes NC and ND',
      identity_rule: 'Live building row plus stable Wikidata P18 and either entity-name/sitelink or architect evidence.',
      holdouts: 'Q-ID placeholder identities and context-sensitive model/construction views remain manual review.',
    },
    totals: {
      reviewed: queuedCandidates.length,
      approved: approved.length,
      held: held.length,
    },
    approved,
    held,
  }

  const markdown = buildMarkdown(report)
  await fs.mkdir(path.dirname(archiveReportPath), { recursive: true })
  await Promise.all([
    fs.writeFile(reportJsonPath, `${JSON.stringify(report, null, 2)}\n`),
    fs.writeFile(reportMarkdownPath, `${markdown}\n`),
    fs.writeFile(insertDraftPath, buildInsertDraft(approved)),
    fs.writeFile(rollbackDraftPath, buildRollbackDraft(approved)),
    fs.writeFile(archiveReportPath, `${markdown}\n`),
  ])

  console.log(JSON.stringify(report.totals, null, 2))
  console.log(`Wrote ${reportMarkdownPath}`)
  console.log(`Wrote ${insertDraftPath}`)
  console.log(`Wrote ${rollbackDraftPath}`)
  console.log(`Wrote ${archiveReportPath}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
