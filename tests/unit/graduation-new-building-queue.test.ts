import { describe, expect, it } from 'vitest'

import exactDecisions from '../../db/review-decisions/graduation-building-links-001.json'
import fuzzyDecisions from '../../db/review-decisions/graduation-building-links-002.json'
import queue from '../../db/review-packets/graduation-new-building-queue-001.json'
import cases from '../../src/content/graduation/cases.json'

const expectedBatch001 = [
  'CASE-018', 'CASE-021', 'CASE-022', 'CASE-023',
  'CASE-027', 'CASE-029', 'CASE-042', 'CASE-070',
].sort()

describe('graduation new-building review queue', () => {
  it('reconciles every case into linked or new-building exactly once', () => {
    const approved = [
      ...exactDecisions.decisions,
      ...fuzzyDecisions.decisions,
    ].filter(item => item.decision === 'approved')
    const linkedIds = approved.map(item => item.case_id)
    const queueIds = queue.items.map(item => item.case_id)

    expect(cases).toHaveLength(139)
    expect(linkedIds).toHaveLength(21)
    expect(queueIds).toHaveLength(118)
    expect(new Set([...linkedIds, ...queueIds]).size).toBe(139)
    expect(queue.summary).toEqual({
      total_cases: 139,
      already_linked: 21,
      new_building_candidates: 118,
      library_candidates: 23,
      batch_001: 8,
    })
  })

  it('defines the first library-focused batch without authorizing writes', () => {
    const batch = queue.items.filter(item => item.priority === 'batch-001')
    expect(batch.map(item => item.case_id).sort()).toEqual(expectedBatch001)
    expect(queue.write_policy).toContain('No item authorizes a database insert')

    for (const item of batch) {
      expect(item.source_url).toMatch(/^https:\/\//)
      expect(item.image_source_url).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
      expect(item.image_license).toMatch(/^(CC0|CC BY)/)
      expect(item.image_credit).not.toBe('Wikimedia Commons')
    }
  })
})
