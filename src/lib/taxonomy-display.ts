import { displayName } from '@/lib/display'
import { isProbablySimplifiedChinese } from '@/lib/locale'

const localizedTaxonomyNameMap: Record<string, { zh?: string; ja?: string }> = {
  'classical': { zh: '古典建筑', ja: '古典建築' },
  'classical architecture': { zh: '古典建筑', ja: '古典建築' },
  'renaissance': { zh: '文艺复兴建筑', ja: 'ルネサンス建築' },
  'renaissance architecture': { zh: '文艺复兴建筑', ja: 'ルネサンス建築' },
  'baroque': { zh: '巴洛克建筑', ja: 'バロック建築' },
  'baroque architecture': { zh: '巴洛克建筑', ja: 'バロック建築' },
  'english-baroque': { zh: '英国巴洛克', ja: 'イングランド・バロック' },
  'english baroque': { zh: '英国巴洛克', ja: 'イングランド・バロック' },
  'modernism': { zh: '现代主义建筑', ja: '近代建築' },
  'modern architecture': { zh: '现代主义建筑', ja: '近代建築' },
  'organic': { zh: '有机建筑', ja: '有機的建築' },
  'organic architecture': { zh: '有机建筑', ja: '有機的建築' },
  'contemporary-architecture': { zh: '当代建筑', ja: '現代建築' },
  'contemporary architecture': { zh: '当代建筑', ja: '現代建築' },
  'contemporary-japanese': { zh: '当代日本建筑', ja: '現代日本建築' },
  'contemporary japanese': { zh: '当代日本建筑', ja: '現代日本建築' },
  'contemporary-swiss': { zh: '当代瑞士建筑', ja: '現代スイス建築' },
  'contemporary swiss': { zh: '当代瑞士建筑', ja: '現代スイス建築' },
  'high-tech': { zh: '高技派建筑', ja: 'ハイテック建築' },
  'high-tech architecture': { zh: '高技派建筑', ja: 'ハイテック建築' },
  'eco-architecture': { zh: '生态建筑', ja: 'エコロジカル建築' },
  'ecological architecture': { zh: '生态建筑', ja: 'エコロジカル建築' },
  'japanese-modern': { zh: '日本近代建筑', ja: '日本近代建築' },
  'japanese modern architecture': { zh: '日本近代建筑', ja: '日本近代建築' },
  'temporary': { zh: '临时建筑', ja: '仮設建築' },
}

export function displayTaxonomyName(
  obj: { slug?: string | null; name_zh?: string | null; name_en?: string; name_ja?: string | null },
  lang: string
): string {
  const localized = displayName(obj, lang)
  if (lang === 'en') return localized
  const key = (obj.slug || obj.name_en || '').toLowerCase()
  const mapped = localizedTaxonomyNameMap[key]?.[lang as 'zh' | 'ja']
  if (mapped) return mapped
  if (lang === 'ja' && obj.name_ja && !isProbablySimplifiedChinese(obj.name_ja)) return obj.name_ja
  if (lang === 'zh' && obj.name_zh) return obj.name_zh
  return ''
}
