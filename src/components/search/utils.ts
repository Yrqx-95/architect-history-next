import type { SearchName } from './types'
import { isProbablySimplifiedChinese } from '@/lib/types'

export function displayName(obj: SearchName, lang: string) {
  return (lang === 'ja'
    ? (obj.name_ja && !isProbablySimplifiedChinese(obj.name_ja) ? obj.name_ja : obj.name_en)
    : lang === 'en'
      ? obj.name_en
      : (obj.name_zh || obj.name_en)) || ''
}

export function displayMetadataText(text: string | null | undefined, lang: string) {
  if (!text) return ''
  return lang === 'ja' && isProbablySimplifiedChinese(text) ? '' : text
}
