import { describe, expect, it } from 'vitest'

import localImageOverrides from '@/lib/local-image-overrides.json'
import { displayText } from '@/lib/display'
import { isProbablySimplifiedChinese } from '@/lib/locale'

const museumSignificanceJa = '白い花崗岩の外装はエントランスと中庭まで連続し、濃緑色の花崗岩床も内外を貫くことで、街、中庭、展示空間を一続きの体験としている。大きさの異なる展示室、最大約14メートルの天井高、中庭を横切る視線、展示エリアの無柱構造が、大型の抽象作品への対応と分かりやすい動線、親しみやすさを両立させている。'

describe('building content localization', () => {
  it('does not reject valid Japanese text containing shared kanji', () => {
    expect(isProbablySimplifiedChinese(museumSignificanceJa)).toBe(false)
    expect(displayText({ ja: museumSignificanceJa, en: 'English fallback' }, 'ja')).toBe(museumSignificanceJa)
  })

  it('still rejects clearly simplified Chinese text on Japanese pages', () => {
    expect(isProbablySimplifiedChinese('现代建筑的空间组织与混凝土结构')).toBe(true)
    expect(displayText({ ja: '现代建筑的空间组织与混凝土结构', en: 'English fallback' }, 'ja')).toBe('English fallback')
  })

  it('classifies the reviewed Museum Reinhard Ernst cover as an interior', () => {
    expect(localImageOverrides['reinhard-ernst-museum'].cover_img_type).toBe('interior')
  })
})
