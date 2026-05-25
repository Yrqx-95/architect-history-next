import type { SearchName } from './types'

export function displayName(obj: SearchName, lang: string) {
  return (lang === 'ja'
    ? (obj.name_ja || obj.name_en)
    : lang === 'en'
      ? obj.name_en
      : (obj.name_zh || obj.name_en)) || ''
}
