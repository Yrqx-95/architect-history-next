import { describe, expect, it } from 'vitest'
import { collectPagedRows, preserveExistingPrimarySelections } from '@/lib/data'

describe('Supabase row pagination', () => {
  it('continues past the default 1,000-row response ceiling', async () => {
    const rows = Array.from({ length: 1_448 }, (_, id) => ({ id }))
    const ranges: Array<[number, number]> = []

    const result = await collectPagedRows(async (from, to) => {
      ranges.push([from, to])
      return rows.slice(from, to + 1)
    })

    expect(result).toHaveLength(1_448)
    expect(ranges).toEqual([[0, 499], [500, 999], [1_000, 1_499]])
  })

  it('fills missing buildings without replacing previously visible primary choices', () => {
    const existing = [
      { id: 'old-a-1', building_id: 'a' },
      { id: 'old-a-2', building_id: 'a' },
      { id: 'old-b', building_id: 'b' },
    ]
    const complete = [
      { id: 'ordered-a', building_id: 'a' },
      { id: 'new-c', building_id: 'c' },
      { id: 'new-c-alternate', building_id: 'c' },
    ]

    expect(preserveExistingPrimarySelections(existing, complete)).toEqual([
      { id: 'old-a-2', building_id: 'a' },
      { id: 'old-b', building_id: 'b' },
      { id: 'new-c', building_id: 'c' },
    ])
  })
})
