#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const source = JSON.parse(fs.readFileSync(path.join(root, 'db/review-packets/graduation-new-building-queue-001.json'), 'utf8'))
const sourceByCase = new Map(source.items.map(item => [item.case_id, item]))
const caseIds = ['CASE-037', 'CASE-090']
const items = caseIds.map(caseId => {
  const item = sourceByCase.get(caseId)
  if (!item) throw new Error(`Missing ${caseId} from canonical G6 queue`)
  return {
    ...item,
    review_scope: ['shared_identity', 'architect', 'year', 'location', 'official_source', 'community_function', 'image_content', 'image_author', 'image_license'],
    review_status: 'unreviewed',
  }
})

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  batch_id: 'graduation-new-building-disaster-community-001',
  stage: 'G6',
  source_queue: 'db/review-packets/graduation-new-building-queue-001.json',
  selection_policy: 'Exact-name disaster-recovery community-space pair for Rikuzentakata; intentionally excludes broader memorials, stations, welfare facilities and urban public-space cases.',
  write_policy: 'Read-only identity and image triage. No database write, image download, replacement or public-data change is authorized.',
  counts: { candidates: items.length },
  known_risks: [
    'The two CASE routes likely describe one built project and must never create duplicate canonical buildings.',
    'Prior Commons/Openverse results depict the Venice Biennale exhibition or models, not the completed Rikuzentakata building.',
    'The 2012 building was dismantled in 2016 and reconstructed near Rikuzentakata Station in 2022; canonical notes must preserve this history.',
  ],
  items,
}

const output = path.join(root, 'db/review-packets/graduation-new-building-disaster-community-001.json')
fs.writeFileSync(output, `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${path.relative(root, output)} with ${items.length} candidates.`)
