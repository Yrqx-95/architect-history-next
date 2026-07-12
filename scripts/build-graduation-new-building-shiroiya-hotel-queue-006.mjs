#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const source = JSON.parse(fs.readFileSync(path.join(root, 'db/review-packets/graduation-new-building-queue-001.json'), 'utf8'))
const item = source.items.find(candidate => candidate.case_id === 'CASE-028')
if (!item) throw new Error('Missing CASE-028 from canonical G6 queue')

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-shiroiya-hotel-006',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'Single bounded 2020 hotel complex combining a renovated main building and new Green Tower, with first-party identity evidence and an exact open-license exterior.',
  write_policy: 'Read-only identity, function and image review. No database write or migration is authorized until hotel taxonomy is reviewed.',
  counts: { candidates: 1 },
  known_risks: ['The project combines renovation and new construction but operates as one hotel complex.', 'Production has no hotel or hospitality function; mixed-use alone is not an adequate principal use.'],
  items: [{ ...item, review_scope: ['identity', 'renovation_and_new_building_scope', 'architect', 'year', 'location', 'hotel_function', 'image_content', 'image_author', 'image_license'], review_status: 'unreviewed' }],
}

const output = path.join(root, 'db/review-packets/graduation-new-building-shiroiya-hotel-006.json')
fs.writeFileSync(output, `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${path.relative(root, output)} with 1 candidate.`)
