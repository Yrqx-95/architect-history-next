#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const source = readJson('db/review-packets/graduation-new-building-queue-001.json')
const caseIds = ['CASE-008', 'CASE-094', 'CASE-133']
const byCase = new Map(source.items.map(item => [item.case_id, item]))
const items = caseIds.map(caseId => {
  const item = byCase.get(caseId)
  if (!item) throw new Error(`Missing ${caseId} from canonical G6 queue`)
  return {
    ...item,
    review_scope: ['identity', 'architect', 'year', 'location', 'official_source', 'transport_hub_function', 'secondary_functions', 'image_content', 'image_author', 'image_license'],
    review_status: 'unreviewed',
  }
})

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-transport-001',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'A narrow first transport batch containing two completed railway stations and one completed international passenger terminal with official identity sources and exact Commons candidates. Parks, warehouses, roadside stations and generic infrastructure are excluded.',
  write_policy: 'Read-only review queue. No database write, public image replacement, migration or deployment is authorized.',
  counts: { candidates: items.length },
  known_risks: [
    'The current CASE-094 image is correctly categorized on Commons but visually shows a rail yard rather than a clear station building and must be replaced before migration.',
    'CASE-133 has an exact CC0 image but its current public metadata still says See image source and must be normalized before migration.',
    'The reviewed taxonomy has no transport-hub function yet; a multilingual function and aliases are required before these assignments can be migrated.',
  ],
  items,
}

const output = 'db/review-packets/graduation-new-building-transport-001.json'
fs.writeFileSync(path.join(root, output), `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${output} with ${items.length} candidates.`)

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
}
