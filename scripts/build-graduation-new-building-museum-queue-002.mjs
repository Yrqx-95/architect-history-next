#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const sourceQueue = readJson('db/review-packets/graduation-new-building-queue-001.json')
const source = sourceQueue.items.find(item => item.case_id === 'CASE-048')

if (!source) throw new Error('Missing CASE-048 from the canonical new-building queue')
if (source.priority !== 'standard') throw new Error('CASE-048 is no longer an unreviewed standard candidate')

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-museum-002',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'The only remaining unlinked case whose title and official institution description explicitly identify a museum or art-center function after museum batch 001. Selection does not imply approval.',
  write_policy: 'Read-only triage queue. No database write, image download, image replacement, or public-data change is authorized by this file.',
  counts: {
    candidates: 1,
    metadata_claim_present: 0,
    license_missing: 1,
  },
  carried_blockers: [
    {
      case_id: 'CASE-079',
      status: 'no_safe_image_yet',
      reason: 'Only an openly licensed 2015 pre-renovation image is available for the 2021 renovation; official post-renovation images have no reusable license.',
    },
  ],
  items: [
    {
      ...source,
      review_scope: ['identity', 'architect', 'year', 'location', 'official_source', 'museum_function', 'image_content', 'image_author', 'image_license'],
      review_status: 'unreviewed',
      image_claim_status: 'license-missing-needs-replacement-or-verification',
    },
  ],
}

const output = 'db/review-packets/graduation-new-building-museum-002.json'
fs.writeFileSync(path.join(root, output), `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${output}: 1 candidate with missing reusable image-license evidence.`)

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
}
