import { describe, expect, it } from 'vitest'

import packet from '../../db/review-packets/graduation-new-building-museum-001.json'
import sourceQueue from '../../db/review-packets/graduation-new-building-queue-001.json'

const expectedCaseIds = [
  'CASE-041', 'CASE-045', 'CASE-047', 'CASE-051', 'CASE-052', 'CASE-053', 'CASE-054',
  'CASE-055', 'CASE-058', 'CASE-060', 'CASE-109', 'CASE-118', 'CASE-124', 'CASE-132',
].sort()

describe('graduation new-building museum batch 001 queue', () => {
  it('selects the fourteen unlinked museum candidates exactly once', () => {
    const ids = packet.items.map(item => item.case_id)
    expect(ids.sort()).toEqual(expectedCaseIds)
    expect(new Set(ids).size).toBe(14)
    expect(packet.counts).toEqual({
      candidates: 14,
      metadata_claim_present: 12,
      license_missing: 2,
    })

    const sourceById = new Map(sourceQueue.items.map(item => [item.case_id, item]))
    for (const item of packet.items) {
      expect(sourceById.get(item.case_id)?.priority).toBe('standard')
      expect(item.review_status).toBe('unreviewed')
      expect(item.review_scope).toContain('museum_function')
      expect(item.review_scope).toContain('image_license')
    }
  })

  it('is read-only and carries the unresolved library image blocker', () => {
    expect(packet.write_policy).toContain('No database write')
    expect(packet.carried_blockers).toEqual([
      expect.objectContaining({ case_id: 'CASE-079', status: 'no_safe_image_yet' }),
    ])
  })
})
