import type { Architect, Building, Era, Style } from '@/lib/types'
import { displayName, formatDisplayLocation } from '@/lib/display'
import type { BuildingWithCover } from '@/lib/types'

type ContentLang = 'zh' | 'en' | 'ja'

function locale(lang: string): ContentLang {
  if (lang === 'ja') return 'ja'
  if (lang === 'en') return 'en'
  return 'zh'
}

function joinParts(parts: Array<string | number | null | undefined>, separator: string) {
  return parts.filter(part => part !== null && part !== undefined && String(part).trim()).join(separator)
}

function localizedPresent(lang: ContentLang) {
  if (lang === 'ja') return '現在'
  if (lang === 'en') return 'present'
  return '至今'
}

export function localizedNationality(value: string, lang: string) {
  const l = locale(lang)
  const map: Record<string, Record<ContentLang, string>> = {
    Italy: { zh: '意大利', ja: 'イタリア', en: 'Italy' },
    Japan: { zh: '日本', ja: '日本', en: 'Japan' },
    Finland: { zh: '芬兰', ja: 'フィンランド', en: 'Finland' },
    France: { zh: '法国', ja: 'フランス', en: 'France' },
    Germany: { zh: '德国', ja: 'ドイツ', en: 'Germany' },
    Spain: { zh: '西班牙', ja: 'スペイン', en: 'Spain' },
    Portugal: { zh: '葡萄牙', ja: 'ポルトガル', en: 'Portugal' },
    Switzerland: { zh: '瑞士', ja: 'スイス', en: 'Switzerland' },
    'United States': { zh: '美国', ja: 'アメリカ', en: 'United States' },
    'United Kingdom': { zh: '英国', ja: 'イギリス', en: 'United Kingdom' },
    Austria: { zh: '奥地利', ja: 'オーストリア', en: 'Austria' },
    Denmark: { zh: '丹麦', ja: 'デンマーク', en: 'Denmark' },
    Netherlands: { zh: '荷兰', ja: 'オランダ', en: 'Netherlands' },
    Belgium: { zh: '比利时', ja: 'ベルギー', en: 'Belgium' },
    Greece: { zh: '希腊', ja: 'ギリシャ', en: 'Greece' },
    Turkey: { zh: '土耳其', ja: 'トルコ', en: 'Turkey' },
    Egypt: { zh: '埃及', ja: 'エジプト', en: 'Egypt' },
    Australia: { zh: '澳大利亚', ja: 'オーストラリア', en: 'Australia' },
    Korea: { zh: '韩国', ja: '韓国', en: 'Korea' },
    Mexico: { zh: '墨西哥', ja: 'メキシコ', en: 'Mexico' },
    Brazil: { zh: '巴西', ja: 'ブラジル', en: 'Brazil' },
    India: { zh: '印度', ja: 'インド', en: 'India' },
  }
  const aliases: Record<string, keyof typeof map> = {
    Italy: 'Italy',
    意大利: 'Italy',
    イタリア: 'Italy',
    Japan: 'Japan',
    日本: 'Japan',
    Finland: 'Finland',
    芬兰: 'Finland',
    フィンランド: 'Finland',
    France: 'France',
    法国: 'France',
    フランス: 'France',
    Germany: 'Germany',
    德国: 'Germany',
    ドイツ: 'Germany',
    Spain: 'Spain',
    西班牙: 'Spain',
    スペイン: 'Spain',
    Portugal: 'Portugal',
    葡萄牙: 'Portugal',
    ポルトガル: 'Portugal',
    Switzerland: 'Switzerland',
    瑞士: 'Switzerland',
    スイス: 'Switzerland',
    'United States': 'United States',
    USA: 'United States',
    US: 'United States',
    美国: 'United States',
    アメリカ: 'United States',
    アメリカ合衆国: 'United States',
    'United Kingdom': 'United Kingdom',
    UK: 'United Kingdom',
    英国: 'United Kingdom',
    イギリス: 'United Kingdom',
    Austria: 'Austria',
    奥地利: 'Austria',
    オーストリア: 'Austria',
    Denmark: 'Denmark',
    丹麦: 'Denmark',
    デンマーク: 'Denmark',
    Netherlands: 'Netherlands',
    Holland: 'Netherlands',
    荷兰: 'Netherlands',
    オランダ: 'Netherlands',
    Belgium: 'Belgium',
    比利时: 'Belgium',
    ベルギー: 'Belgium',
    Greece: 'Greece',
    希腊: 'Greece',
    ギリシャ: 'Greece',
    Turkey: 'Turkey',
    土耳其: 'Turkey',
    トルコ: 'Turkey',
    Egypt: 'Egypt',
    埃及: 'Egypt',
    エジプト: 'Egypt',
    Australia: 'Australia',
    澳大利亚: 'Australia',
    オーストラリア: 'Australia',
    Korea: 'Korea',
    'South Korea': 'Korea',
    韩国: 'Korea',
    韓国: 'Korea',
    Mexico: 'Mexico',
    墨西哥: 'Mexico',
    メキシコ: 'Mexico',
    Brazil: 'Brazil',
    巴西: 'Brazil',
    ブラジル: 'Brazil',
    India: 'India',
    印度: 'India',
    インド: 'India',
  }
  const key = aliases[value] || value
  return map[key]?.[l] || value
}

export function getArchitectFallbackSummary({
  architect,
  buildings,
  era,
  styles,
  lang,
}: {
  architect: Architect
  buildings: BuildingWithCover[] | Building[]
  era: Era | null
  styles: Style[]
  lang: string
}) {
  const l = locale(lang)
  const name = displayName(architect, lang)
  const years = architect.birth_year
    ? `${architect.birth_year}–${architect.death_year || localizedPresent(l)}`
    : ''
  const nationality = architect.nationalities?.length
    ? architect.nationalities.map(item => localizedNationality(item, l)).join(l === 'en' ? ', ' : '、')
    : ''
  const eraName = era ? displayName(era, lang) : ''
  const styleNames = styles.map(style => displayName(style, lang)).filter(Boolean).slice(0, 3)
  const sortedWorks = [...buildings].sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))
  const sampleWorks = sortedWorks.slice(0, 3).map(work => displayName(work, lang)).filter(Boolean)

  if (l === 'en') {
    if (buildings.length === 0) {
      return `${name}${years ? ` (${years})` : ''}${nationality ? ` is associated with ${nationality}` : ' is recorded in the archive'}. This dossier is currently a compact biographical entry; it can be expanded later with works, relationships, and reading paths once verified records are added.`
    }
    return `${name}${years ? ` (${years})` : ''}${nationality ? ` is associated with ${nationality}` : ' is an architect in the archive'}. This dossier connects ${buildings.length} recorded work${buildings.length === 1 ? '' : 's'}${eraName ? `, the ${eraName} period` : ''}${styleNames.length ? `, and themes such as ${styleNames.join(', ')}` : ''}. Start with ${sampleWorks.length ? sampleWorks.join(', ') : 'the works list'} to read the architect through chronology, place, and building type.`
  }

  if (l === 'ja') {
    if (buildings.length === 0) {
      return `${name}${years ? `（${years}）` : ''}は${nationality ? `${nationality}に関わる` : ''}建築家としてアーカイブに収録されています。現在は人物の基本情報を中心にしたコンパクトな項目で、作品記録と関係資料が確認でき次第、読み進める経路を追加します。`
    }
    return `${name}${years ? `（${years}）` : ''}は${nationality ? `${nationality}に関わる` : ''}建築家としてアーカイブに収録されています。このページでは、${buildings.length}件の作品${eraName ? `、${eraName}` : ''}${styleNames.length ? `、${styleNames.join('、')}` : ''}を手がかりに、年代、場所、建築タイプから人物像を読み進めます。まずは${sampleWorks.length ? sampleWorks.join('、') : '作品リスト'}を起点にしてください。`
  }

  if (buildings.length === 0) {
    return `${name}${years ? `（${years}）` : ''}${nationality ? `是与 ${nationality} 相关的` : '是档案中的'}建筑师。目前这个页面先提供人物基本档案；等作品记录、关系资料和可靠图片继续确认后，再补充完整阅读路径。`
  }

  return `${name}${years ? `（${years}）` : ''}${nationality ? `是与 ${nationality} 相关的` : '是档案中的'}建筑师。本页把 ${buildings.length} 个已收录作品${eraName ? `、${eraName}` : ''}${styleNames.length ? `、${styleNames.join('、')}` : ''}放在同一条阅读路径里，帮助你从年代、地点和建筑类型理解这位建筑师。可以先从${sampleWorks.length ? sampleWorks.join('、') : '作品列表'}开始。`
}

export function getBuildingFallbackContent({
  building,
  architect,
  styles,
  era,
  lang,
}: {
  building: Building
  architect: Architect | null
  styles: Style[]
  era: Era | null
  lang: string
}) {
  const l = locale(lang)
  const name = displayName(building, lang)
  const architectName = architect ? displayName(architect, lang) : ''
  const year = building.year_start
    ? `${building.year_start}${building.year_end ? `–${building.year_end}` : ''}`
    : ''
  const location = formatDisplayLocation({
    city: building.city,
    country: building.country,
    countryCode: building.country_code,
    lang,
  })
  const styleNames = styles.map(style => displayName(style, lang)).filter(Boolean).slice(0, 3)
  const eraName = era ? displayName(era, lang) : ''
  const type = building.type_slug && !(l === 'ja' && /[\u4e00-\u9fff]/.test(building.type_slug))
    ? building.type_slug
    : ''

  if (l === 'en') {
    const facts = joinParts([architectName && `designed by ${architectName}`, year && `dated ${year}`, location && `located in ${location}`], ', ')
    return {
      summary: `${name}${facts ? ` is ${facts}` : ' is part of the Archistory building archive'}. The entry can be read through ${joinParts([eraName, styleNames.join(', '), type], ', ') || 'its date, place, authorship, and building type'}.`,
      significance: `${name} is useful as a node in the architectural history network: it links an author, a period, a region, and a building category instead of standing as an isolated image.`,
    }
  }

  if (l === 'ja') {
    const facts = joinParts([architectName && `${architectName}による設計`, year && `${year}年`, location && location], '、')
    return {
      summary: `${name}は${facts || 'Archistory の建築アーカイブに収録された作品'}です。${joinParts([eraName, styleNames.join('、'), type], '、') || '年代、場所、設計者、用途'}を手がかりに読むことで、単独の写真ではなく建築史の中の位置が見えてきます。`,
      significance: `${name}は、設計者、時代、地域、建築タイプを結ぶ知識ネットワーク上のノードとして読むことができます。`,
    }
  }

  const facts = joinParts([architectName && `由 ${architectName} 设计`, year && `${year} 年`, location && `位于 ${location}`], '，')
  return {
    summary: `${name}${facts ? `是一座${facts}的建筑` : '是 Archistory 建筑档案中的一座作品'}。阅读时可以把它放在${joinParts([eraName, styleNames.join('、'), type], '、') || '年代、地点、作者和建筑类型'}之间，而不是只把它当成一张建筑照片。`,
    significance: `${name}的档案价值在于它把作者、时代、地域和建筑类型连接起来，让使用者能继续追踪同一建筑师、同一时期或相近用途的其他作品。`,
  }
}
