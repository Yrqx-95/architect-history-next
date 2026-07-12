#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const sourceQueue = readJson('db/review-packets/graduation-new-building-queue-001.json')

const museumCaseIds = [
  'CASE-041',
  'CASE-045',
  'CASE-047',
  'CASE-051',
  'CASE-052',
  'CASE-053',
  'CASE-054',
  'CASE-055',
  'CASE-058',
  'CASE-060',
  'CASE-109',
  'CASE-118',
  'CASE-124',
  'CASE-132',
]

const itemsByCaseId = new Map(sourceQueue.items.map(item => [item.case_id, item]))
const items = museumCaseIds.map(caseId => {
  const source = itemsByCaseId.get(caseId)
  if (!source) throw new Error(`Missing ${caseId} from the canonical new-building queue`)
  if (source.priority !== 'standard') throw new Error(`${caseId} is no longer an unreviewed standard candidate`)

  return {
    ...source,
    review_scope: ['identity', 'architect', 'year', 'location', 'official_source', 'museum_function', 'image_content', 'image_author', 'image_license'],
    review_status: 'unreviewed',
    image_claim_status: /^CC0$|^CC BY(?:-SA)?(?:\s|$)|^Public domain$/i.test(source.image_license || '')
      ? 'metadata-claim-present-needs-live-verification'
      : 'license-missing-needs-replacement-or-verification',
  }
})

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-museum-001',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'Museum and art-museum graduation references that remain unlinked after the approved canonical and library batches. Selection does not imply approval.',
  write_policy: 'Read-only triage queue. No database write, image replacement, or public-data change is authorized by this file.',
  counts: {
    candidates: items.length,
    metadata_claim_present: items.filter(item => item.image_claim_status === 'metadata-claim-present-needs-live-verification').length,
    license_missing: items.filter(item => item.image_claim_status === 'license-missing-needs-replacement-or-verification').length,
  },
  carried_blockers: [
    {
      case_id: 'CASE-079',
      status: 'no_safe_image_yet',
      reason: 'Only an openly licensed 2015 pre-renovation image is available for the 2021 renovation; official post-renovation images have no reusable license.',
    },
  ],
  items,
}

const output = 'db/review-packets/graduation-new-building-museum-001.json'
fs.writeFileSync(path.join(root, output), `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${output}: ${packet.counts.candidates} candidates, ${packet.counts.metadata_claim_present} with license claims, ${packet.counts.license_missing} missing exact license metadata.`)

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
}
