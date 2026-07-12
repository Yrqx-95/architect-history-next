#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const source = readJson('db/review-packets/graduation-new-building-queue-001.json')
const caseId = 'CASE-006'
const item = source.items.find(candidate => candidate.case_id === caseId)
if (!item) throw new Error(`Missing ${caseId} from canonical G6 queue`)

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-education-001',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'The only remaining unreviewed G6 candidate whose identity explicitly represents a school, university, college, campus, kindergarten or nursery. Keyword-only education references are excluded.',
  write_policy: 'Read-only identity, function and image-rights triage. No database write, image download into the repository, public-data replacement or deployment is authorized.',
  counts: { candidates: 1 },
  known_risks: [
    'Exact Flickr images exist, but uploader identity and named original photographer differ, so the uploader right to grant CC BY 2.0 must not be assumed.',
    'Official Tezuka Architects photographs prove identity but do not state an open reuse license.',
  ],
  items: [{
    ...item,
    review_scope: ['identity', 'architect', 'year', 'location', 'official_source', 'school_function', 'image_content', 'image_author', 'uploader_authority', 'image_license'],
    review_status: 'unreviewed',
  }],
}

const output = 'db/review-packets/graduation-new-building-education-001.json'
fs.writeFileSync(path.join(root, output), `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${output} with 1 candidate.`)

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
}
