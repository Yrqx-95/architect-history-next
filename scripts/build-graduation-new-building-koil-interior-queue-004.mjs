#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const source = JSON.parse(fs.readFileSync(path.join(root, 'db/review-packets/graduation-new-building-queue-001.json'), 'utf8'))
const item = source.items.find(candidate => candidate.case_id === 'CASE-035')
if (!item) throw new Error('Missing CASE-035 from canonical G6 queue')

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-koil-interior-004',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'Single KOIL record selected to distinguish the 2014 innovation-center interior project from later KOIL-branded garden facilities and the host building.',
  write_policy: 'Read-only identity and image-scope review. No database write, image replacement or migration is authorized.',
  counts: { candidates: 1 },
  known_risks: [
    'The reviewed design is a 2576 square metre interior project, not an independently authored host building.',
    'The current Commons image depicts KOIL GARDEN, a differently named exterior facility, not the reviewed KOIL innovation-center interior.',
  ],
  items: [{ ...item, review_scope: ['project_scope', 'designer', 'year', 'location', 'official_source', 'image_content', 'image_author', 'image_license'], review_status: 'unreviewed' }],
}

const output = path.join(root, 'db/review-packets/graduation-new-building-koil-interior-004.json')
fs.writeFileSync(output, `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${path.relative(root, output)} with 1 candidate.`)
