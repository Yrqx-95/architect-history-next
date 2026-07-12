import { describe, expect, it } from 'vitest'

import packet from '../../db/review-packets/graduation-new-building-social-care-001.json'
import sourceQueue from '../../db/review-packets/graduation-new-building-queue-001.json'

const expectedCaseIds = ['CASE-001', 'CASE-011', 'CASE-024', 'CASE-026', 'CASE-065', 'CASE-086', 'CASE-087', 'CASE-097']

describe('graduation new-building social-care batch 001 queue', () => {
  it('selects the eight scoped candidates exactly once', () => {
    const ids = packet.items.map(item => item.case_id)
    expect(ids).toEqual(expectedCaseIds)
    expect(new Set(ids).size).toBe(8)
    expect(packet.counts).toEqual({
      candidates: 8,
      metadata_claim_present: 0,
      license_missing: 8,
    })

    const sourceById = new Map(sourceQueue.items.map(item => [item.case_id, item]))
    for (const item of packet.items) {
      expect(sourceById.get(item.case_id)?.priority).toBe('standard')
      expect(item.review_status).toBe('unreviewed')
      expect(item.review_scope).toContain('duplicate_identity')
      expect(item.review_scope).toContain('image_license')
    }
  })

  it('is read-only and prevents duplicate or programme-level identities from becoming buildings', () => {
    expect(packet.write_policy).toContain('No database write')
    expect(packet.write_policy).toContain('duplicate merge')
    expect(packet.known_identity_conflicts).toEqual(expect.arrayContaining([
      expect.objectContaining({ case_ids: ['CASE-024', 'CASE-065'] }),
      expect.objectContaining({ case_id: 'CASE-011' }),
    ]))
  })
})
