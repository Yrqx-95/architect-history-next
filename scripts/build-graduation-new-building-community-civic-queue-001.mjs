#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const sourceQueue = readJson('db/review-packets/graduation-new-building-queue-001.json')
const communityCivicCaseIds = ['CASE-019', 'CASE-064', 'CASE-067', 'CASE-069', 'CASE-088', 'CASE-096']
const sourceByCaseId = new Map(sourceQueue.items.map(item => [item.case_id, item]))

const items = communityCivicCaseIds.map(caseId => {
  const source = sourceByCaseId.get(caseId)
  if (!source) throw new Error(`Missing ${caseId} from the canonical new-building queue`)
  if (source.priority !== 'standard') throw new Error(`${caseId} is no longer an unreviewed standard candidate`)

  return {
    ...source,
    review_scope: ['identity', 'architect', 'year', 'location', 'official_source', 'community_center_function', 'civic_public_function', 'secondary_functions', 'image_content', 'image_author', 'image_license'],
    review_status: 'unreviewed',
    image_claim_status: /^CC0$|^CC BY(?:-SA)?(?:\s|$)|^Public domain$/i.test(source.image_license || '')
      ? 'metadata-claim-present-needs-live-verification'
      : 'license-missing-needs-replacement-or-verification',
  }
})

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-community-civic-001',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'Small first pass over remaining unlinked cases whose project identity explicitly names a community center, community plaza, cultural community center, or municipal civic-service plaza. Broader urban public spaces and social-support buildings are deferred rather than inferred as community centers.',
  write_policy: 'Read-only triage queue. No database write, image download, image replacement, deletion, or public-data change is authorized by this file.',
  counts: {
    candidates: items.length,
    metadata_claim_present: items.filter(item => item.image_claim_status === 'metadata-claim-present-needs-live-verification').length,
    license_missing: items.filter(item => item.image_claim_status === 'license-missing-needs-replacement-or-verification').length,
  },
  known_risks: [
    {
      case_id: 'CASE-019',
      reason: 'The current licensed image is Kokubunji City Hall rather than Cocobunji Plaza; the project may not migrate until an exact reusable image is confirmed.',
    },
  ],
  deferred_adjacent_cases: [
    {
      case_id: 'CASE-001',
      reason: 'Share Kanazawa is a welfare, housing and care complex; community use is secondary and requires a separate social-care review.',
    },
    {
      case_id: 'CASE-037',
      reason: 'Home-for-All is a disaster-recovery common living room and should be reviewed with CASE-090 in a dedicated disaster/community batch.',
    },
    {
      case_id: 'CASE-136',
      reason: 'Federation Square is a civic public realm and cultural complex, not a community-center identity match; defer to an urban-public-space batch.',
    },
  ],
  items,
}

const output = 'db/review-packets/graduation-new-building-community-civic-001.json'
fs.writeFileSync(path.join(root, output), `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${output}: ${packet.counts.candidates} candidates, ${packet.counts.metadata_claim_present} with exact license claims, ${packet.counts.license_missing} requiring image-license research.`)

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
}
