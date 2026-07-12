#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const source = JSON.parse(fs.readFileSync(path.join(root, 'db/review-packets/graduation-new-building-queue-001.json'), 'utf8'))
const item = source.items.find(candidate => candidate.case_id === 'CASE-002')
if (!item) throw new Error('Missing CASE-002 from canonical G6 queue')

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-zero-waste-003',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'Single bounded zero-waste complex with first-party architectural evidence and a Commons candidate; excludes municipality-wide policy references and unrelated environmental facilities.',
  write_policy: 'Read-only identity, function and image review. No database write, image replacement or migration is authorized.',
  counts: { candidates: 1 },
  known_risks: [
    'The Commons file declares own work and CC0 but explicitly lacks author information; uploader identity must not be silently converted into photographer identity.',
    'The current function taxonomy has no recycling or waste-management function; community-center alone does not represent the principal program.',
  ],
  items: [{
    ...item,
    review_scope: ['identity', 'architect', 'year', 'location', 'official_source', 'principal_function', 'image_content', 'image_author', 'image_license'],
    review_status: 'unreviewed',
  }],
}

const output = path.join(root, 'db/review-packets/graduation-new-building-zero-waste-003.json')
fs.writeFileSync(output, `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${path.relative(root, output)} with 1 candidate.`)
