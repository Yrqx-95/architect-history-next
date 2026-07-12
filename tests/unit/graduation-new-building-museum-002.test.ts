import { describe, expect, it } from 'vitest'

import packet from '../../db/review-packets/graduation-new-building-museum-002.json'
import sourceQueue from '../../db/review-packets/graduation-new-building-queue-001.json'

describe('graduation new-building museum batch 002 queue', () => {
  it('contains only the final explicit museum candidate', () => {
    expect(packet.items.map(item => item.case_id)).toEqual(['CASE-048'])
    expect(packet.counts).toEqual({
      candidates: 1,
      metadata_claim_present: 0,
      license_missing: 1,
    })
    expect(sourceQueue.items.find(item => item.case_id === 'CASE-048')?.priority).toBe('standard')
  })

  it('remains read-only while the image license is unresolved', () => {
    expect(packet.write_policy).toContain('No database write')
    expect(packet.write_policy).toContain('image download')
    expect(packet.items[0]).toMatchObject({
      review_status: 'unreviewed',
      image_claim_status: 'license-missing-needs-replacement-or-verification',
    })
  })
})
