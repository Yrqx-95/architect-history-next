#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const source = JSON.parse(fs.readFileSync(path.join(root, 'db/review-packets/graduation-new-building-queue-001.json'), 'utf8'))
const item = source.items.find(candidate => candidate.case_id === 'CASE-040')
if (!item) throw new Error('Missing CASE-040 from canonical G6 queue')

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-miyashita-park-005',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'Single completed 2020 PPP park, retail, parking and hotel complex with first-party design-role evidence and an exact replacement Commons image.',
  write_policy: 'Read-only identity, function and image review. No database write or migration is authorized until the wrong current image is replaced and verified.',
  counts: { candidates: 1 },
  known_risks: [
    'Takenaka Corporation is lead architect and Nikken Sekkei is project architect; neither role may be omitted.',
    'The current image shows Tower Records viewed from Miyashita Park rather than the project itself.',
  ],
  items: [{ ...item, review_scope: ['identity', 'joint_architect_roles', 'year', 'location', 'mixed_use_functions', 'current_image_content', 'replacement_image_author', 'replacement_image_license'], review_status: 'unreviewed' }],
}

const output = path.join(root, 'db/review-packets/graduation-new-building-miyashita-park-005.json')
fs.writeFileSync(output, `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${path.relative(root, output)} with 1 candidate.`)
