import { describe, expect, it } from 'vitest'

import packet from '../../db/review-packets/graduation-new-building-community-civic-001.json'
import sourceQueue from '../../db/review-packets/graduation-new-building-queue-001.json'

const expectedCaseIds = ['CASE-019', 'CASE-064', 'CASE-067', 'CASE-069', 'CASE-088', 'CASE-096']

describe('graduation new-building community/civic batch 001 queue', () => {
  it('selects the six explicit community/civic facility candidates exactly once', () => {
    const ids = packet.items.map(item => item.case_id)
    expect(ids).toEqual(expectedCaseIds)
    expect(new Set(ids).size).toBe(6)
    expect(packet.counts).toEqual({
      candidates: 6,
      metadata_claim_present: 2,
      license_missing: 4,
    })

    const sourceById = new Map(sourceQueue.items.map(item => [item.case_id, item]))
    for (const item of packet.items) {
      expect(sourceById.get(item.case_id)?.priority).toBe('standard')
      expect(item.review_status).toBe('unreviewed')
      expect(item.review_scope).toContain('community_center_function')
      expect(item.review_scope).toContain('civic_public_function')
      expect(item.review_scope).toContain('image_license')
    }
  })

  it('is read-only and records the known wrong-image risk and adjacent deferrals', () => {
    expect(packet.write_policy).toContain('No database write')
    expect(packet.write_policy).toContain('image download')
    expect(packet.write_policy).toContain('deletion')
    expect(packet.known_risks).toEqual([
      expect.objectContaining({ case_id: 'CASE-019' }),
    ])
    expect(packet.deferred_adjacent_cases.map(item => item.case_id)).toEqual([
      'CASE-001',
      'CASE-037',
      'CASE-136',
    ])
  })
})
