import { describe, expect, it } from 'vitest'
import { getHomeCopy } from '@/app/[lang]/home-copy'

describe('home archive statistics', () => {
  it('labels the filtered building count as a browsable subset in every language', () => {
    expect(getHomeCopy('zh').stats.buildings).toBe('可浏览建筑')
    expect(getHomeCopy('en').stats.buildings).toBe('Browsable buildings')
    expect(getHomeCopy('ja').stats.buildings).toBe('閲覧できる建築')
  })
})
