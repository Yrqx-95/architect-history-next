#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const sourceQueue = readJson('db/review-packets/graduation-new-building-queue-001.json')
const theatreCaseIds = ['CASE-057', 'CASE-091', 'CASE-117', 'CASE-122', 'CASE-139']
const sourceByCaseId = new Map(sourceQueue.items.map(item => [item.case_id, item]))

const items = theatreCaseIds.map(caseId => {
  const source = sourceByCaseId.get(caseId)
  if (!source) throw new Error(`Missing ${caseId} from the canonical new-building queue`)
  if (source.priority !== 'standard') throw new Error(`${caseId} is no longer an unreviewed standard candidate`)

  return {
    ...source,
    review_scope: ['identity', 'architect', 'year', 'location', 'official_source', 'theatre_function', 'secondary_functions', 'image_content', 'image_author', 'image_license'],
    review_status: 'unreviewed',
    image_claim_status: /^CC0$|^CC BY(?:-SA)?(?:\s|$)|^Public domain$/i.test(source.image_license || '')
      ? 'metadata-claim-present-needs-live-verification'
      : 'license-missing-needs-replacement-or-verification',
  }
})

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-theatre-001',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'Remaining unlinked cases whose title, keywords, and concept explicitly identify a theatre, opera house, concert hall, or performing-arts venue. Generic cultural buildings without performance evidence are excluded.',
  write_policy: 'Read-only triage queue. No database write, image download, image replacement, or public-data change is authorized by this file.',
  counts: {
    candidates: items.length,
    metadata_claim_present: items.filter(item => item.image_claim_status === 'metadata-claim-present-needs-live-verification').length,
    license_missing: items.filter(item => item.image_claim_status === 'license-missing-needs-replacement-or-verification').length,
  },
  excluded_false_positives: [
    {
      case_id: 'CASE-033',
      reason: 'The concept mentions a local cultural-event hub, but the building is a hot-spring station rather than a theatre or performing-arts venue.',
    },
  ],
  items,
}

const output = 'db/review-packets/graduation-new-building-theatre-001.json'
fs.writeFileSync(path.join(root, output), `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${output}: ${packet.counts.candidates} candidates, ${packet.counts.metadata_claim_present} with exact license claims, ${packet.counts.license_missing} requiring image-license research.`)

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
}
