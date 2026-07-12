#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const sourceQueue = readJson('db/review-packets/graduation-new-building-queue-001.json')
const socialCareCaseIds = ['CASE-001', 'CASE-011', 'CASE-024', 'CASE-026', 'CASE-065', 'CASE-086', 'CASE-087', 'CASE-097']
const sourceByCaseId = new Map(sourceQueue.items.map(item => [item.case_id, item]))

const items = socialCareCaseIds.map(caseId => {
  const source = sourceByCaseId.get(caseId)
  if (!source) throw new Error(`Missing ${caseId} from the canonical new-building queue`)
  if (source.priority !== 'standard') throw new Error(`${caseId} is no longer an unreviewed standard candidate`)

  return {
    ...source,
    review_scope: ['identity', 'duplicate_identity', 'architect', 'year', 'location', 'official_source', 'elderly_care_function', 'community_support_function', 'secondary_functions', 'image_content', 'image_author', 'image_license'],
    review_status: 'unreviewed',
    image_claim_status: /^CC0$|^CC BY(?:-SA)?(?:\s|$)|^Public domain$/i.test(source.image_license || '')
      ? 'metadata-claim-present-needs-live-verification'
      : 'license-missing-needs-replacement-or-verification',
  }
})

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-social-care-001',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'Remaining unlinked cases whose concept and source explicitly concern elderly care, childcare support, disability or employment support, women-focused social infrastructure, or an integrated welfare community.',
  write_policy: 'Read-only triage queue. No database write, image download, image replacement, deletion, duplicate merge, or public-data change is authorized by this file.',
  counts: {
    candidates: items.length,
    metadata_claim_present: items.filter(item => item.image_claim_status === 'metadata-claim-present-needs-live-verification').length,
    license_missing: items.filter(item => item.image_claim_status === 'license-missing-needs-replacement-or-verification').length,
  },
  known_identity_conflicts: [
    {
      case_ids: ['CASE-024', 'CASE-065'],
      reason: 'Both records currently have the same name, Sasebo location, architect, source URL and placeholder image. They must be reviewed as a likely duplicate before either can receive a unique canonical building relation.',
    },
    {
      case_id: 'CASE-011',
      reason: 'Toyama-style day care describes a prefecture-wide service model rather than one clearly identified building; a canonical building must not be invented from the programme name.',
    }
  ],
  items,
}

const output = 'db/review-packets/graduation-new-building-social-care-001.json'
fs.writeFileSync(path.join(root, output), `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${output}: ${packet.counts.candidates} candidates, ${packet.counts.metadata_claim_present} with license claims, ${packet.counts.license_missing} requiring image-license research.`)

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
}
