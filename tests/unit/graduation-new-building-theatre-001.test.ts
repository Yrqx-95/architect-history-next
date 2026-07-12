import { describe, expect, it } from 'vitest'

import packet from '../../db/review-packets/graduation-new-building-theatre-001.json'
import sourceQueue from '../../db/review-packets/graduation-new-building-queue-001.json'

const expectedCaseIds = ['CASE-057', 'CASE-091', 'CASE-117', 'CASE-122', 'CASE-139']

describe('graduation new-building theatre batch 001 queue', () => {
  it('selects the five remaining explicit performing-arts candidates exactly once', () => {
    const ids = packet.items.map(item => item.case_id)
    expect(ids).toEqual(expectedCaseIds)
    expect(new Set(ids).size).toBe(5)
    expect(packet.counts).toEqual({
      candidates: 5,
      metadata_claim_present: 1,
      license_missing: 4,
    })

    const sourceById = new Map(sourceQueue.items.map(item => [item.case_id, item]))
    for (const item of packet.items) {
      expect(sourceById.get(item.case_id)?.priority).toBe('standard')
      expect(item.review_status).toBe('unreviewed')
      expect(item.review_scope).toContain('theatre_function')
      expect(item.review_scope).toContain('image_license')
    }
  })

  it('is read-only and records the keyword false positive', () => {
    expect(packet.write_policy).toContain('No database write')
    expect(packet.write_policy).toContain('image download')
    expect(packet.excluded_false_positives).toEqual([
      expect.objectContaining({ case_id: 'CASE-033' }),
    ])
  })
})
