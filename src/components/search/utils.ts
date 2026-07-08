import type { SearchName } from './types'
import { formatCountryName, hasCjk, isProbablySimplifiedChinese } from '@/lib/locale'

export function displayName(obj: SearchName, lang: string) {
  return (lang === 'ja'
    ? (obj.name_ja && !isProbablySimplifiedChinese(obj.name_ja) ? obj.name_ja : obj.name_en)
    : lang === 'en'
      ? obj.name_en
      : (obj.name_zh || obj.name_en)) || ''
}

export function displayMetadataText(text: string | null | undefined, lang: string) {
  if (!text) return ''
  if (text === 'postmodern') {
    if (lang === 'zh') return '后现代时期'
    if (lang === 'ja') return 'ポストモダン期'
    return 'Postmodern period'
  }
  return lang === 'ja' && isProbablySimplifiedChinese(text) ? '' : text
}

export function displaySearchLocation({
  city,
  country,
  countryCode,
  lang,
}: {
  city?: string | null
  country?: string | null
  countryCode?: string | null
  lang: string
}) {
  if (lang === 'zh') return [city, country].filter(Boolean).join(', ')

  const localizedCountry = formatCountryName(countryCode, country, lang)
  if (lang === 'ja') {
    const safeCity = city && !isProbablySimplifiedChinese(city) ? city : ''
    return [safeCity, localizedCountry].filter(Boolean).join(', ')
  }

  const safeCity = city && !hasCjk(city) ? city : ''
  return [safeCity, localizedCountry].filter(Boolean).join(', ')
}
