import { describe, expect, it } from 'vitest'
import { collectPagedRows } from '@/lib/data'

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
})
