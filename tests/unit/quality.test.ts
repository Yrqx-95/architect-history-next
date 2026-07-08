import { describe, expect, it } from 'vitest'
import { hasProperName, hasValidName, isMinimallyComplete, safeDisplayName } from '@/lib/quality'

describe('quality name helpers', () => {
  it('accepts a clean fallback name when the first name field is unusable', () => {
    expect(hasProperName({ name_en: 'Q12345', name_zh: '萨伏伊别墅' })).toBe(true)
    expect(hasProperName({ name_en: 'Bad�Name', name_zh: '萨伏伊别墅' })).toBe(true)
    expect(hasValidName({ name_en: 'Q12345', name_zh: '萨伏伊别墅', name_ja: null })).toBe(true)
    expect(isMinimallyComplete({
      slug: 'villa-savoye',
      name_en: 'Q12345',
      name_zh: '萨伏伊别墅',
      city: 'Poissy',
    })).toBe(true)
  })

  it('rejects objects when every available name is empty, garbled, or a Wikidata id', () => {
    expect(hasProperName({ name_en: 'Q12345', name_zh: 'Bad�Name' })).toBe(false)
    expect(hasValidName({ name_en: 'Q12345', name_zh: 'Bad�Name', name_ja: '' })).toBe(false)
  })

  it('keeps Japanese display names from falling back to simplified Chinese', () => {
    expect(safeDisplayName({
      name_ja: '现代建筑',
      name_en: 'Villa Savoye',
      name_zh: '现代建筑',
    }, 'ja')).toBe('Villa Savoye')
  })
})
