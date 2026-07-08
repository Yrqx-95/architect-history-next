import { formatCountryName, hasCjk, isProbablySimplifiedChinese } from '@/lib/locale'

export function displayName(
  obj: { name_zh?: string | null; name_en?: string; name_ja?: string | null },
  lang: string
): string {
  if (lang === 'ja' && obj.name_ja && !isProbablySimplifiedChinese(obj.name_ja)) return obj.name_ja
  if (lang === 'en' && obj.name_en) return obj.name_en
  if (lang === 'zh' && obj.name_zh) return obj.name_zh
  return obj.name_en || obj.name_zh || ''
}

export function displayText(
  obj: Record<string, string> | null | undefined,
  lang: string
): string {
  if (!obj) return ''
  if (lang === 'ja') {
    const ja = obj['ja']
    return ja && !isProbablySimplifiedChinese(ja) ? ja : obj['en'] || ''
  }
  if (lang === 'en') return obj['en'] || obj['zh'] || ''
  return obj['zh'] || obj['en'] || Object.values(obj)[0] || ''
}

export function lifeSpan(birth: number | null, death: number | null): string {
  if (!birth && !death) return ''
  return `${birth || '?'} – ${death || 'Present'}`
}

export function formatLocation(city?: string | null, country?: string | null): string {
  if (city && country) return `${city}, ${country}`
  return city || country || ''
}

export function formatDisplayCity(city: string | null | undefined, lang: string): string {
  if (!city) return ''
  const cityAliases: Record<string, Record<string, string>> = {
    巴西利亚: { zh: '巴西利亚', ja: 'ブラジリア', en: 'Brasilia' },
  }
  const localized = cityAliases[city]?.[lang]
  if (localized) return localized
  if (lang === 'zh') return city
  return hasCjk(city) ? '' : city
}

export function formatDisplayLocation({
  city,
  country,
  countryCode,
  lang,
}: {
  city?: string | null
  country?: string | null
  countryCode?: string | null
  lang: string
}): string {
  if (lang === 'zh') return formatLocation(city, country)

  const localizedCountry = formatCountryName(countryCode, country, lang)
  const safeCity = formatDisplayCity(city, lang)
  if (safeCity && localizedCountry) return `${safeCity}, ${localizedCountry}`
  return safeCity || localizedCountry || ''
}
