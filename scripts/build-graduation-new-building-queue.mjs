#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const cases = readJson('src/content/graduation/cases.json')
const matchReport = readJson('reports/graduation-building-match-report.json')
const exactDecisions = readJson('db/review-decisions/graduation-building-links-001.json')
const fuzzyDecisions = readJson('db/review-decisions/graduation-building-links-002.json')

const approvedCaseIds = new Set([
  ...exactDecisions.decisions,
  ...fuzzyDecisions.decisions,
].filter(item => item.decision === 'approved').map(item => item.case_id))

const casesById = new Map(cases.map(item => [item.id, item]))
const remainingMatches = matchReport.items.filter(item => !approvedCaseIds.has(item.case_id))
const firstBatchIds = new Set([
  'CASE-018',
  'CASE-021',
  'CASE-022',
  'CASE-023',
  'CASE-027',
  'CASE-029',
  'CASE-042',
  'CASE-070',
])

const queue = remainingMatches.map(match => {
  const item = casesById.get(match.case_id)
  if (!item) throw new Error(`Missing graduation case ${match.case_id}`)
  const allKeywords = [
    ...(item.keywords || []),
    ...(item.keywords_ja || []),
    ...(item.keywords_en || []),
  ]
  const isLibrary = allKeywords.some(keyword => /图书馆|圖書館|図書館|library/i.test(keyword))
  const metadataGaps = []
  if (!item.year) metadataGaps.push('year')
  if (!item.architect) metadataGaps.push('architect')
  if (!item.source_url) metadataGaps.push('source_url')
  if (!item.image_source_url) metadataGaps.push('image_source_url')
  if (!item.image_license) metadataGaps.push('image_license')
  if (!item.image_credit) metadataGaps.push('image_credit')

  return {
    case_id: item.id,
    name: item.name,
    name_en: item.name_en || item.name,
    name_ja: item.name_ja || item.name,
    previous_lane: match.lane,
    priority: firstBatchIds.has(item.id) ? 'batch-001' : isLibrary ? 'library-next' : 'standard',
    priority_reason: firstBatchIds.has(item.id)
      ? 'High-value library query coverage with an official institution or architect source and a Commons image candidate.'
      : isLibrary
        ? 'Library function should be reviewed early to improve multilingual use-based search coverage.'
        : 'Review after the library-focused batches unless a stronger editorial need emerges.',
    source_url: item.source_url,
    source_domain: domain(item.source_url),
    image_source_url: item.image_source_url || null,
    image_source_domain: domain(item.image_source_url),
    image_license: item.image_license || null,
    image_credit: item.image_credit || null,
    year: item.year || null,
    architect: item.architect || null,
    metadata_gaps: metadataGaps,
  }
})

queue.sort((a, b) => {
  const order = { 'batch-001': 0, 'library-next': 1, standard: 2 }
  return order[a.priority] - order[b.priority] || a.case_id.localeCompare(b.case_id)
})

const packet = {
  version: 1,
  generated_at: new Date().toISOString(),
  source_report: 'reports/graduation-building-match-report.json',
  approved_case_count: approvedCaseIds.size,
  summary: {
    total_cases: cases.length,
    already_linked: approvedCaseIds.size,
    new_building_candidates: queue.length,
    library_candidates: queue.filter(item => item.priority === 'batch-001' || item.priority === 'library-next').length,
    batch_001: queue.filter(item => item.priority === 'batch-001').length,
  },
  count_reconciliation: '139 total cases - 21 approved canonical links = 118 new-building candidates. The earlier 101 count predated matcher recalibration and the routing of 16 identity-review records into this lane.',
  write_policy: 'Read-only review queue. No item authorizes a database insert until a versioned identity, source, function and image decision passes tests.',
  items: queue,
}

const output = 'db/review-packets/graduation-new-building-queue-001.json'
fs.writeFileSync(path.join(root, output), `${JSON.stringify(packet, null, 2)}\n`)
console.log(`Wrote ${output}: ${queue.length} candidates, ${packet.summary.library_candidates} library-related, ${packet.summary.batch_001} in batch 001.`)

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
}

function domain(value) {
  if (!value) return null
  try {
    return new URL(value).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}
