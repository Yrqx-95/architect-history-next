#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const source = JSON.parse(fs.readFileSync(path.join(root, 'db/review-packets/graduation-new-building-queue-001.json'), 'utf8'))
const item = source.items.find(candidate => candidate.case_id === 'CASE-015')
if (!item) throw new Error('Missing CASE-015 from canonical G6 queue')

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-disaster-memorial-002',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'Single bounded disaster-memory facility with first-party identity evidence and an exact open-license built-project image; excludes broader recovery plans and projects without safe images.',
  write_policy: 'Read-only identity, function and image review. No database write or migration is authorized.',
  counts: { candidates: 1 },
  known_risks: [
    'The official Community category is an editorial project tag and must not be converted automatically into the specific community-center function.',
    'Official portfolio photography proves identity but is not the reusable image source.',
  ],
  items: [{
    ...item,
    review_scope: ['identity', 'architect', 'year', 'location', 'official_source', 'museum_function', 'image_content', 'image_author', 'image_license'],
    review_status: 'unreviewed',
  }],
}

const output = path.join(root, 'db/review-packets/graduation-new-building-disaster-memorial-002.json')
fs.writeFileSync(output, `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${path.relative(root, output)} with 1 candidate.`)
