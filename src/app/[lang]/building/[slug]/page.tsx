import Link from 'next/link'
import { displayText, formatDisplayCity, formatDisplayLocation } from '@/lib/display'
import { formatCountryName, isProbablySimplifiedChinese } from '@/lib/locale'
import type { Architect, Building, Era, Style } from '@/lib/types'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getBuildings, getBuildingsWithCovers, getEras, getPublishedGraduationProfilesByBuildingId } from '@/lib/data'
import { getBuildingRelations } from '@/lib/relations'
import { displayName } from '@/lib/display'
import { findTimelinePeriodForEra, findTimelinePeriodForRange, localizedTimelineText, type TimelinePeriod } from '@/lib/timeline-periods'
import { getBuildingFallbackContent } from '@/lib/fallback-content'
import { getBuildingContent, localizedBuildingContent, type BuildingContentSource } from '@/lib/building-content'
import { buildingLearningMapBySlug, type BuildingLearningMapRecord } from '@/content/building-learning-map/building-learning-map'
import PageShell from '@/components/PageShell'
import Breadcrumb from '@/components/Breadcrumb'
import ImageGallery from '@/components/ImageGallery'
import ImageBreak from '@/components/ImageBreak'
import MetadataPanel from '@/components/MetadataPanel'
import PullQuote from '@/components/PullQuote'
import ArticleSection from '@/components/ArticleSection'
import Reveal from '@/components/Reveal'
import ContinueExploring from '@/components/ContinueExploring'
import BuildingCard from '@/components/BuildingCard'
import ContentMaturityNote from '@/components/ContentMaturityNote'

export const dynamicParams = false

type LocalizedText = {
  zh: string
  en: string
  ja: string
}

type HistoricalBuildingFactOverride = {
  designerLabel?: LocalizedText
  designer: LocalizedText
  yearLabel: LocalizedText
  year: LocalizedText
  facts: Array<{
    label: LocalizedText
    value: LocalizedText
  }>
}

const historicalBuildingFactOverrides: Record<string, HistoricalBuildingFactOverride> = {
  'todaiji-temple': {
    designerLabel: {
      zh: '设计者',
      en: 'Designer',
      ja: '設計者',
    },
    designer: {
      zh: '不明',
      en: 'Unknown',
      ja: '不明',
    },
    yearLabel: {
      zh: '历史年份',
      en: 'Historical date',
      ja: '歴史年',
    },
    year: {
      zh: '752（大佛开眼供养会）',
      en: '752 (Great Buddha eye-opening ceremony)',
      ja: '752（大仏開眼供養会）',
    },
    facts: [
      {
        label: { zh: '建立', en: 'Imperial founder', ja: '建立' },
        value: { zh: '圣武天皇', en: 'Emperor Shomu', ja: '聖武天皇' },
      },
      {
        label: { zh: '开山', en: 'Founding priest', ja: '開山' },
        value: { zh: '良弁', en: 'Roben', ja: '良弁' },
      },
      {
        label: { zh: '现大佛殿再建', en: 'Current Daibutsuden reconstruction', ja: '現在の大仏殿再建' },
        value: { zh: '公庆上人', en: 'Priest Kokei', ja: '公慶上人' },
      },
    ],
  },
  'museum-of-fine-arts-houston': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: '需人工确认', en: 'Pending confirmation', ja: '要確認' },
    yearLabel: { zh: '机构创立', en: 'Institution founded', ja: '機関創設' },
    year: { zh: '1900（非现代竣工年）', en: '1900 (institution date, not building completion)', ja: '1900（建物竣工年ではない）' },
    facts: [
      {
        label: { zh: '增建', en: 'Addition', ja: '増築' },
        value: { zh: 'Rafael Moneo：Audrey Jones Beck Building，2000', en: 'Rafael Moneo: Audrey Jones Beck Building, 2000', ja: 'Rafael Moneo：Audrey Jones Beck Building、2000' },
      },
    ],
  },
  'bank-of-spain-headquarters': {
    designerLabel: { zh: '原始设计者', en: 'Original designers', ja: '原設計' },
    designer: { zh: 'Eduardo de Adaro、Severiano Sainz de la Lastra', en: 'Eduardo de Adaro and Severiano Sainz de la Lastra', ja: 'Eduardo de Adaro、Severiano Sainz de la Lastra' },
    yearLabel: { zh: '迁入年份', en: 'Move-in date', ja: '入居年' },
    year: { zh: '1891', en: '1891', ja: '1891' },
    facts: [
      {
        label: { zh: '扩建', en: 'Extension', ja: '増築' },
        value: { zh: 'Rafael Moneo：最后阶段扩建项目，2006', en: 'Rafael Moneo: final extension phase, 2006', ja: 'Rafael Moneo：最終増築段階、2006' },
      },
    ],
  },
  'palazzo-abatellis': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: 'Matteo Carnilivari', en: 'Matteo Carnilivari', ja: 'Matteo Carnilivari' },
    yearLabel: { zh: '原始建成年份', en: 'Original completion', ja: '原建築年' },
    year: { zh: '1495', en: '1495', ja: '1495' },
    facts: [
      {
        label: { zh: '修复/展陈设计', en: 'Restoration / museum installation', ja: '修復・展示設計' },
        value: { zh: 'Carlo Scarpa，1953–1954', en: 'Carlo Scarpa, 1953–1954', ja: 'Carlo Scarpa、1953–1954' },
      },
    ],
  },
  'fondazione-querini-stampalia': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: '不明', en: 'Unknown', ja: '不明' },
    yearLabel: { zh: '基金会创立', en: 'Foundation established', ja: '財団設立' },
    year: { zh: '1869（非建筑竣工年）', en: '1869 (foundation date, not building completion)', ja: '1869（建物竣工年ではない）' },
    facts: [
      {
        label: { zh: '改修', en: 'Renovation', ja: '改修' },
        value: { zh: 'Carlo Scarpa：入口、水上通道、庭院等，1961–1963', en: 'Carlo Scarpa: entrance, water access, garden, 1961–1963', ja: 'Carlo Scarpa：入口、水路、庭園など、1961–1963' },
      },
    ],
  },
  'minneapolis-institute-of-art': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: 'McKim, Mead & White', en: 'McKim, Mead & White', ja: 'McKim, Mead & White' },
    yearLabel: { zh: '机构创立', en: 'Institution founded', ja: '機関創設' },
    year: { zh: '1883（非现建筑竣工年）', en: '1883 (institution date, not building completion)', ja: '1883（建物竣工年ではない）' },
    facts: [
      {
        label: { zh: '增建', en: 'Addition', ja: '増築' },
        value: { zh: '丹下健三，1974', en: 'Kenzo Tange, 1974', ja: '丹下健三、1974' },
      },
    ],
  },
  'saint-louis-art-museum': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: 'Cass Gilbert', en: 'Cass Gilbert', ja: 'Cass Gilbert' },
    yearLabel: { zh: '原始建筑', en: 'Original building', ja: '原建築' },
    year: { zh: '1904（1904年世博会美术宫）', en: '1904 (Palace of Fine Arts, World’s Fair)', ja: '1904（万国博覧会美術館）' },
    facts: [
      {
        label: { zh: '增建', en: 'Addition', ja: '増築' },
        value: { zh: 'David Chipperfield：East Building，2013', en: 'David Chipperfield: East Building, 2013', ja: 'David Chipperfield：East Building、2013' },
      },
    ],
  },
  'santantonio-abate-parish-church': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: '不明', en: 'Unknown', ja: '不明' },
    yearLabel: { zh: '历史建筑年份', en: 'Historical date', ja: '歴史年' },
    year: { zh: '1502（历史教堂年份）', en: '1502 (historical church date)', ja: '1502（歴史的教会の年）' },
    facts: [
      {
        label: { zh: '改修/新介入', en: 'Renovation / intervention', ja: '改修・介入' },
        value: { zh: 'Mario Botta：Genestrerio 教堂改修相关项目，需终审范围', en: 'Mario Botta: Genestrerio church intervention; scope pending final review', ja: 'Mario Botta：Genestrerio の教会改修関連、範囲は要確認' },
      },
    ],
  },
  'paris-opera-ballet-school': {
    designerLabel: { zh: '设计者', en: 'Designer', ja: '設計者' },
    designer: { zh: 'Christian de Portzamparc', en: 'Christian de Portzamparc', ja: 'Christian de Portzamparc' },
    yearLabel: { zh: '设计/建成', en: 'Design / completion', ja: '設計・竣工' },
    year: { zh: '1983–1987', en: '1983–1987', ja: '1983–1987' },
    facts: [
      {
        label: { zh: '说明', en: 'Note', ja: '注記' },
        value: { zh: '1713 是巴黎歌剧院芭蕾学校历史源流相关年份，不是 Portzamparc 这座学校建筑的竣工年。', en: '1713 belongs to the school’s historical lineage, not the completion date of Portzamparc’s school building.', ja: '1713年は学校の歴史的系譜に関わる年であり、Portzamparcによる校舎の竣工年ではない。' },
      },
    ],
  },
  'plaza-de-toros-de-pamplona': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: 'Francisco Urcola（需终审）', en: 'Francisco Urcola (pending final review)', ja: 'Francisco Urcola（要確認）' },
    yearLabel: { zh: '原始建成年份', en: 'Original completion', ja: '原建築年' },
    year: { zh: '1922', en: '1922', ja: '1922' },
    facts: [
      {
        label: { zh: '改修/扩建', en: 'Renovation / extension', ja: '改修・増築' },
        value: { zh: 'Rafael Moneo 仅作为后期改修/扩建相关建筑师保留，范围需人工终审。', en: 'Rafael Moneo is retained only as a later renovation / extension reference; scope needs final review.', ja: 'Rafael Moneo は後年の改修・増築に関わる参照として扱い、範囲は要確認。' },
      },
    ],
  },
  'palace-of-villahermosa': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: '不明', en: 'Unknown', ja: '不明' },
    yearLabel: { zh: '历史建筑年份', en: 'Historical building date', ja: '歴史年' },
    year: { zh: '1805（历史宫殿年份，非博物馆改造竣工年）', en: '1805 (historical palace date, not museum conversion completion)', ja: '1805（歴史的宮殿の年、博物館改修の竣工年ではない）' },
    facts: [
      {
        label: { zh: '改修/博物馆转用', en: 'Renovation / museum conversion', ja: '改修・美術館転用' },
        value: { zh: 'Rafael Moneo：Thyssen-Bornemisza Museum 改造，1989–1992', en: 'Rafael Moneo: Thyssen-Bornemisza Museum conversion, 1989–1992', ja: 'Rafael Moneo：Thyssen-Bornemisza Museum 改修、1989–1992' },
      },
    ],
  },
  'palacio-pascual-de-riquelme': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: '不明', en: 'Unknown', ja: '不明' },
    yearLabel: { zh: '历史建筑年份', en: 'Historical building date', ja: '歴史年' },
    year: { zh: '1800（需人工确认）', en: '1800 (pending confirmation)', ja: '1800（要確認）' },
    facts: [
      {
        label: { zh: '说明', en: 'Note', ja: '注記' },
        value: { zh: '当前资料不足以把现代建筑师显示为原始设计者，已移除误导性关联。', en: 'Current evidence is insufficient to show a modern architect as the original designer; the misleading link has been removed.', ja: '現時点の資料では現代建築家を原設計者として表示できないため、誤解を招く関連付けを外した。' },
      },
    ],
  },
  'the-nelson-atkins-museum-of-art': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: 'Wight & Wight', en: 'Wight & Wight', ja: 'Wight & Wight' },
    yearLabel: { zh: '原始建筑', en: 'Original building', ja: '原建築' },
    year: { zh: '1933', en: '1933', ja: '1933' },
    facts: [
      {
        label: { zh: '增建', en: 'Addition', ja: '増築' },
        value: { zh: 'Steven Holl：Bloch Building，2007', en: 'Steven Holl: Bloch Building, 2007', ja: 'Steven Holl：Bloch Building、2007' },
      },
    ],
  },
  'gipsoteca-canoviana': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: 'Francesco Lazzari / Giuseppe Segusini（需终审）', en: 'Francesco Lazzari / Giuseppe Segusini (pending final review)', ja: 'Francesco Lazzari / Giuseppe Segusini（要確認）' },
    yearLabel: { zh: '原始建筑', en: 'Original building', ja: '原建築' },
    year: { zh: '1832（需终审）', en: '1832 (pending final review)', ja: '1832（要確認）' },
    facts: [
      {
        label: { zh: '增建/展示设计', en: 'Addition / museum installation', ja: '増築・展示設計' },
        value: { zh: 'Carlo Scarpa：1955–1957 年扩建与展陈相关工作', en: 'Carlo Scarpa: 1955–1957 addition and museum installation work', ja: 'Carlo Scarpa：1955–1957 年の増築・展示設計' },
      },
    ],
  },
  'cleveland-museum-of-art-building': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: 'Hubbell & Benes', en: 'Hubbell & Benes', ja: 'Hubbell & Benes' },
    yearLabel: { zh: '原始建筑', en: 'Original building', ja: '原建築' },
    year: { zh: '1916（数据库年份仍需终审）', en: '1916 (database year pending final review)', ja: '1916（DB 年は要確認）' },
    facts: [
      {
        label: { zh: '增建', en: 'Addition', ja: '増築' },
        value: { zh: 'Marcel Breuer：1971 年增建', en: 'Marcel Breuer: 1971 addition', ja: 'Marcel Breuer：1971 年増築' },
      },
    ],
  },
  'cleveland-museum-of-art': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: 'Hubbell & Benes', en: 'Hubbell & Benes', ja: 'Hubbell & Benes' },
    yearLabel: { zh: '原始建筑', en: 'Original building', ja: '原建築' },
    year: { zh: '1916（数据库年份仍需终审）', en: '1916 (database year pending final review)', ja: '1916（DB 年は要確認）' },
    facts: [
      {
        label: { zh: '增建', en: 'Addition', ja: '増築' },
        value: { zh: 'Marcel Breuer：1971 年增建', en: 'Marcel Breuer: 1971 addition', ja: 'Marcel Breuer：1971 年増築' },
      },
    ],
  },
  'foundation-e-g-buhrle-collection': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: '不明', en: 'Unknown', ja: '不明' },
    yearLabel: { zh: '基金会/收藏相关年份', en: 'Foundation / collection date', ja: '財団・コレクション関連年' },
    year: { zh: '1960（非 Chipperfield 建筑竣工年）', en: '1960 (not Chipperfield building completion)', ja: '1960（Chipperfield による建物竣工年ではない）' },
    facts: [
      {
        label: { zh: '展示/新馆关联', en: 'Display / extension context', ja: '展示・新館関連' },
        value: { zh: 'David Chipperfield 关联主要属于 Kunsthaus Zürich 扩建后的收藏展示语境，非该基金会原始设计者。', en: 'David Chipperfield is mainly connected through the Kunsthaus Zürich extension display context, not as the foundation’s original designer.', ja: 'David Chipperfield との関連は主に Kunsthaus Zürich 増築後の展示文脈であり、財団の原設計者ではない。' },
      },
    ],
  },
  'gilbey-house': {
    designerLabel: { zh: '设计者', en: 'Designers', ja: '設計者' },
    designer: { zh: 'Serge Chermayeff、Erich Mendelsohn', en: 'Serge Chermayeff and Erich Mendelsohn', ja: 'Serge Chermayeff、Erich Mendelsohn' },
    yearLabel: { zh: '建成年份', en: 'Completion', ja: '竣工年' },
    year: { zh: '1937', en: '1937', ja: '1937' },
    facts: [],
  },
  'red-banner-textile-factory': {
    designerLabel: { zh: '设计者', en: 'Designer', ja: '設計者' },
    designer: { zh: 'Erich Mendelsohn', en: 'Erich Mendelsohn', ja: 'Erich Mendelsohn' },
    yearLabel: { zh: '设计/施工', en: 'Design / construction', ja: '設計・建設' },
    year: { zh: '1925–1926', en: '1925–1926', ja: '1925–1926' },
    facts: [],
  },
  'bellevue-arts-museum': {
    designerLabel: { zh: '设计者', en: 'Designer', ja: '設計者' },
    designer: { zh: 'Steven Holl', en: 'Steven Holl', ja: 'Steven Holl' },
    yearLabel: { zh: '建成年份', en: 'Completion', ja: '竣工年' },
    year: { zh: '2001', en: '2001', ja: '2001' },
    facts: [],
  },
  'saint-johns-abbey': {
    designerLabel: { zh: '设计者', en: 'Designer', ja: '設計者' },
    designer: { zh: 'Marcel Breuer', en: 'Marcel Breuer', ja: 'Marcel Breuer' },
    yearLabel: { zh: '教堂建造', en: 'Abbey church construction', ja: '修道院教会建設' },
    year: { zh: '1956–1961', en: '1956–1961', ja: '1956–1961' },
    facts: [
      {
        label: { zh: '说明', en: 'Note', ja: '注記' },
        value: { zh: '1856 属于修道院历史源流，不是 Breuer 教堂建筑竣工年。', en: '1856 belongs to the abbey’s institutional history, not Breuer’s church completion date.', ja: '1856年は修道院の歴史に関わる年であり、Breuer による教会建築の竣工年ではない。' },
      },
    ],
  },
  'museum-of-east-asian-art': {
    designerLabel: { zh: '设计者', en: 'Designer', ja: '設計者' },
    designer: { zh: '前川国男', en: 'Kunio Maekawa', ja: '前川国男' },
    yearLabel: { zh: '开馆/建筑年份', en: 'Opening / building date', ja: '開館・建築年' },
    year: { zh: '1977', en: '1977', ja: '1977' },
    facts: [],
  },
  'bodmer-foundation': {
    designerLabel: { zh: '设计者', en: 'Designer', ja: '設計者' },
    designer: { zh: 'Mario Botta', en: 'Mario Botta', ja: 'Mario Botta' },
    yearLabel: { zh: '设计/建成', en: 'Design / completion', ja: '設計・竣工' },
    year: { zh: '1998–2003', en: '1998–2003', ja: '1998–2003' },
    facts: [],
  },
  'dortmund-city-and-state-library': {
    designerLabel: { zh: '设计者', en: 'Designer', ja: '設計者' },
    designer: { zh: 'Mario Botta', en: 'Mario Botta', ja: 'Mario Botta' },
    yearLabel: { zh: '建成年份', en: 'Completion', ja: '竣工年' },
    year: { zh: '1999', en: '1999', ja: '1999' },
    facts: [],
  },
  'san-francisco-museum-of-modern': {
    designerLabel: { zh: '设计者', en: 'Designer', ja: '設計者' },
    designer: { zh: 'Mario Botta', en: 'Mario Botta', ja: 'Mario Botta' },
    yearLabel: { zh: '设计/建成', en: 'Design / completion', ja: '設計・竣工' },
    year: { zh: '1992–1995', en: '1992–1995', ja: '1992–1995' },
    facts: [
      {
        label: { zh: '说明', en: 'Note', ja: '注記' },
        value: { zh: '1935 属于 SFMOMA 机构创立史，不是 Mario Botta 建筑竣工年。', en: '1935 belongs to SFMOMA’s institutional history, not Mario Botta’s building completion date.', ja: '1935年は SFMOMA の機関史であり、Mario Botta による建物竣工年ではない。' },
      },
    ],
  },
  'pylkonmaki-church': {
    designerLabel: { zh: '原始设计者', en: 'Original designer', ja: '原設計' },
    designer: { zh: 'Jaakko Kuorikoski（需终审）', en: 'Jaakko Kuorikoski (pending final review)', ja: 'Jaakko Kuorikoski（要確認）' },
    yearLabel: { zh: '原始建筑', en: 'Original building', ja: '原建築' },
    year: { zh: '1860', en: '1860', ja: '1860' },
    facts: [
      {
        label: { zh: '改修图', en: 'Renovation drawings', ja: '改修図面' },
        value: { zh: 'Alvar Aalto：1926–1927 年改修相关图纸，不是 1860 年教堂原设计者。', en: 'Alvar Aalto: 1926–1927 renovation drawings, not the original 1860 church designer.', ja: 'Alvar Aalto：1926–1927 年の改修図面。1860 年教会の原設計者ではない。' },
      },
    ],
  },
  'carlton-hotel': {
    designerLabel: { zh: '设计者', en: 'Designer', ja: '設計者' },
    designer: { zh: 'Gordon Bunshaft / SOM（需终审项目范围）', en: 'Gordon Bunshaft / SOM (project scope pending final review)', ja: 'Gordon Bunshaft / SOM（範囲は要確認）' },
    yearLabel: { zh: '建成年份', en: 'Completion', ja: '竣工年' },
    year: { zh: '1972', en: '1972', ja: '1972' },
    facts: [
      {
        label: { zh: '说明', en: 'Note', ja: '注記' },
        value: { zh: '1906 与 Gordon Bunshaft 生年不符，已改为 Johannesburg 新 Carlton Hotel 相关的 1972 年项目口径。', en: '1906 conflicts with Gordon Bunshaft’s birth year; the record now follows the 1972 New Carlton Hotel / Johannesburg project context.', ja: '1906年は Gordon Bunshaft の生年と矛盾するため、Johannesburg の New Carlton Hotel に関わる 1972 年の文脈に修正。' },
      },
    ],
  },
}

function localizedOverrideText(text: LocalizedText, lang: string) {
  return text[lang as keyof LocalizedText] || text.en
}

function findEraForBuildingYear(building: Building, eras: Era[]): Era | null {
  if (building.year_start == null) return null
  return eras.find(era => {
    if (era.year_start == null) return false
    const end = era.year_end ?? era.year_start
    return building.year_start! >= era.year_start && building.year_start! <= end
  }) || null
}

function BuildingPeriodContext({
  lang,
  prefix,
  building,
  era,
  period,
}: {
  lang: string
  prefix: string
  building: Building
  era: Era | null
  period: TimelinePeriod | null
}) {
  if (!period) return null

  const copy = {
    eyebrow: { zh: '历史背景', en: 'Historical context', ja: '歴史背景' },
    title: { zh: '这座建筑所在的问题', en: 'The question around this work', ja: 'この建築を囲む問い' },
    turn: { zh: '时代转向', en: 'Historical turn', ja: '時代の転換' },
    timeline: { zh: '在时间轴中查看', en: 'View in timeline', ja: '時間軸で見る' },
    era: { zh: '进入时代页', en: 'Open period page', ja: '時代ページへ' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
  const contextMeta = [
    building.year_start,
    era ? displayName(era, lang) : localizedTimelineText(period.label, lang),
  ].filter(Boolean).join(' · ')

  return (
    <Reveal>
      <section className="section-sm border-t border-subtle pt-8 sm:pt-10">
        <div className="grid gap-6 border-y border-subtle py-6 lg:grid-cols-[minmax(0,0.68fr)_minmax(16rem,0.32fr)]">
          <div>
            <p className="eyebrow mb-3">{l('eyebrow')}</p>
            {contextMeta && <p className="metadata mb-4">{contextMeta}</p>}
            <h2 className="heading-3 mb-4">{l('title')}</h2>
            <p className="text-xl font-medium leading-snug text-primary sm:text-2xl">
              {localizedTimelineText(period.question, lang)}
            </p>
            <p className="body-sm mt-4 max-w-3xl text-secondary">
              {localizedTimelineText(period.summary, lang)}
            </p>
          </div>
          <aside className="border-t border-subtle pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="label mb-3">{l('turn')}</p>
            <p className="caption">{localizedTimelineText(period.transition, lang)}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {era && (
                <Link href={`${prefix}/browse/era/${era.slug}`} className="text-sm font-medium text-accent underline underline-offset-4">
                  {l('era')}
                </Link>
              )}
              <Link href={`${prefix}/timeline#period-${period.id}`} className="text-sm font-medium text-accent underline underline-offset-4">
                {l('timeline')}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </Reveal>
  )
}

function BuildingKnowledgeNetwork({
  lang,
  prefix,
  architect,
  styles,
  era,
  building,
  related,
}: {
  lang: string
  prefix: string
  architect: Architect | null
  styles: Style[]
  era: Era | null
  building: Building
  related: Building[]
}) {
  const copy = {
    eyebrow: { zh: '知识网络', en: 'Knowledge network', ja: '知識ネットワーク' },
    title: { zh: '阅读路径', en: 'Reading paths', ja: '読み進める経路' },
    intro: {
      zh: '从作者、时代、风格、地点和相近作品继续理解这座建筑的位置。',
      en: 'Continue through authorship, period, style, place, and nearby works.',
      ja: '作者、時代、様式、場所、近い作品から、この建築の位置を読み進める。',
    },
    architect: { zh: '因为由其设计', en: 'Related because they designed it', ja: '設計者として関連' },
    period: { zh: '因为属于这一时代', en: 'Related through its period', ja: '同じ時代として関連' },
    style: { zh: '因为采用这一风格', en: 'Related through its style', ja: '同じ様式として関連' },
    region: { zh: '因为位于这一地区', en: 'Related through its location', ja: '同じ地域として関連' },
    sameArchitect: { zh: '因为建筑师相同', en: 'Related through the same architect', ja: '同じ建築家として関連' },
    sameStyle: { zh: '因为风格相同', en: 'Related through a shared style', ja: '共通する様式で関連' },
    sameType: { zh: '因为建筑类型相近', en: 'Related through the same building type', ja: '同じ建築類型として関連' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
  const countryCode = building.country_code?.toLowerCase()
  const countryName = countryCode && building.country
    ? formatCountryName(countryCode, building.country, lang) || building.country
    : ''
  const relatedLabel = (item: Building) => {
    if (architect && item.architect_slug === architect.slug) return l('sameArchitect')
    if (item.style_slugs?.some(style => building.style_slugs?.includes(style))) return l('sameStyle')
    return l('sameType')
  }
  const cards = [
    architect && {
      key: `architect-${architect.slug}`,
      href: `${prefix}/architect/${architect.slug}`,
      label: l('architect'),
      title: displayName(architect, lang),
      meta: architect.birth_year ? `${architect.birth_year}–${architect.death_year || (lang === 'en' ? 'present' : lang === 'ja' ? '現在' : '至今')}` : '',
    },
    era && {
      key: `era-${era.slug}`,
      href: `${prefix}/browse/era/${era.slug}`,
      label: l('period'),
      title: displayName(era, lang),
      meta: era.year_start ? `${era.year_start}${era.year_end ? `–${era.year_end}` : ''}` : '',
    },
    ...styles.slice(0, 2).map(style => ({
      key: `style-${style.slug}`,
      href: `${prefix}/browse/style/${style.slug}`,
      label: l('style'),
      title: displayName(style, lang),
      meta: style.era_slug || '',
    })),
    countryCode && countryName && {
      key: `country-${countryCode}`,
      href: `${prefix}/browse/country/${countryCode}`,
      label: l('region'),
      title: countryName,
      meta: formatDisplayCity(building.city, lang),
    },
    ...related.slice(0, 2).map(item => ({
      key: `building-${item.slug}`,
      href: `${prefix}/building/${item.slug}`,
      label: relatedLabel(item),
      title: displayName(item, lang),
      meta: [item.year_start, formatDisplayLocation({ city: item.city, country: item.country, countryCode: item.country_code, lang })].filter(Boolean).join(' · '),
    })),
  ].filter(Boolean) as Array<{ key: string; href: string; label: string; title: string; meta: string }>

  if (cards.length === 0) return null

  return (
    <Reveal>
      <section className="section-sm border-t border-subtle pt-8 sm:pt-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2">{l('eyebrow')}</p>
            <h2 className="heading-3">{l('title')}</h2>
          </div>
          <p className="caption max-w-lg sm:text-right">{l('intro')}</p>
        </div>
        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(card => (
            <Link
              key={card.key}
              href={card.href}
              className="interactive-row group border-y border-subtle px-2 py-4"
            >
              <p className="label mb-4">{card.label}</p>
              <h3 className="text-lg font-medium leading-snug text-primary transition-colors group-hover:text-accent">{card.title}</h3>
              {card.meta && <p className="caption mt-2">{card.meta}</p>}
            </Link>
          ))}
        </div>
      </section>
    </Reveal>
  )
}

function BuildingStudyMap({
  lang,
  building,
  hasSpatial,
  hasLight,
  hasCirculation,
  hasSources,
}: {
  lang: string
  building: Building
  hasSpatial: boolean
  hasLight: boolean
  hasCirculation: boolean
  hasSources: boolean
}) {
  const copy = {
    eyebrow: { zh: '作品研究', en: 'Study map', ja: '作品研究' },
    title: { zh: '从这些维度阅读', en: 'Read through these lenses', ja: 'この視点から読む' },
    intro: {
      zh: '先定位历史问题，再进入空间、光线、动线、结构与来源；已开放的维度可以直接跳转阅读。',
      en: 'Start with the historical question, then read space, light, circulation, structure, and sources.',
      ja: '歴史的な問いを確認し、空間、光、動線、構造、出典へ進む。',
    },
    spatial: { zh: '空间组织', en: 'Spatial organization', ja: '空間構成' },
    light: { zh: '光线', en: 'Light', ja: '光' },
    circulation: { zh: '动线', en: 'Circulation', ja: '動線' },
    structure: { zh: '结构 / 材料', en: 'Structure / materials', ja: '構造・素材' },
    sources: { zh: '来源', en: 'Sources', ja: '出典' },
    available: { zh: '已整理', en: 'Available', ja: '整理済み' },
    pending: { zh: '待补充', en: 'Pending', ja: '追加予定' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
  const hasLocalizedStructure = Boolean(
    building.structure && !(lang === 'ja' && isProbablySimplifiedChinese(building.structure))
  )
  const hasLocalizedMaterials = Boolean(building.materials?.length && lang !== 'ja')
  const structureReady = Boolean(hasLocalizedStructure || hasLocalizedMaterials || building.area_sqm)
  const sourcesReady = hasSources || Boolean(building.wikipedia_url || building.official_url)
  const items = [
    { href: '#spatial-analysis', title: l('spatial'), ready: hasSpatial },
    { href: '#light-analysis', title: l('light'), ready: hasLight },
    { href: '#circulation-analysis', title: l('circulation'), ready: hasCirculation },
    { href: '#technical-notes', title: l('structure'), ready: structureReady },
    { href: '#building-sources', title: l('sources'), ready: sourcesReady },
  ]

  return (
    <Reveal>
      <section className="section-sm border-t border-subtle pt-8 sm:pt-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-2">{l('eyebrow')}</p>
            <h2 className="heading-3">{l('title')}</h2>
          </div>
          <p className="caption max-w-lg sm:text-right">{l('intro')}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {items.map(item => {
            const className = item.ready
              ? 'interactive-row border-y border-subtle px-2 py-4'
              : 'border-y border-subtle px-2 py-4 opacity-65'
            const content = (
              <>
                <p className="text-sm font-medium leading-snug text-primary">{item.title}</p>
                <p className="caption mt-3">{item.ready ? l('available') : l('pending')}</p>
              </>
            )

            return item.ready ? (
              <a key={item.href} href={item.href} className={className}>
                {content}
              </a>
            ) : (
              <div key={item.href} className={className} aria-disabled="true">
                {content}
              </div>
            )
          })}
        </div>
      </section>
    </Reveal>
  )
}

function uniqueCompact(items: string[]) {
  return Array.from(new Set(items.map(item => item.trim()).filter(Boolean)))
}

function formatStudyLabel(value: string) {
  return value
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function BuildingLearningBridge({
  lang,
  prefix,
  record,
}: {
  lang: string
  prefix: string
  record: BuildingLearningMapRecord
}) {
  const copy = {
    eyebrow: { zh: '阅读线索', en: 'Reading cues', ja: '読解の手がかり' },
    title: { zh: '继续阅读这座建筑', en: 'Continue reading this building', ja: 'この建築を読み進める' },
    intro: {
      zh: '先抓住核心概念，再从空间、材料、结构与历史四个方向继续进入相关档案。',
      en: 'Start with the core concepts, then continue through related archive cues in space, material, structure, and history.',
      ja: '核となる概念を押さえ、空間、素材、構造、歴史の手がかりから関連資料へ進みます。',
    },
    coreConcepts: { zh: '核心概念', en: 'Core concepts', ja: '核となる概念' },
    studyQuestions: { zh: '阅读问题', en: 'Reading questions', ja: '読み解く問い' },
    glossary: { zh: '相关术语', en: 'Related glossary terms', ja: '関連用語' },
    codeTopics: { zh: '相关法规主题', en: 'Related code topics', ja: '関連する法規テーマ' },
    spatial: { zh: '空间', en: 'Space', ja: '空間' },
    material: { zh: '材料', en: 'Material', ja: '素材' },
    structure: { zh: '结构', en: 'Structure', ja: '構造' },
    history: { zh: '历史', en: 'History', ja: '歴史' },
    reviewNote: {
      zh: '这些是阅读提示，用来帮助进入作品；不是最终的资料来源结论。',
      en: 'These are reading prompts for entering the work, not final source claims.',
      ja: 'これは作品へ入るための読解プロンプトであり、最終的な出典上の結論ではありません。',
    },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
  const question = (label: string, terms: string[]) => {
    const joined = uniqueCompact(terms).slice(0, 3).join(', ')
    if (lang === 'en') return joined ? `How does this work make ${joined} readable?` : `What does this work reveal about ${label.toLowerCase()}?`
    if (lang === 'ja') return joined ? `${joined} は、この作品の中でどのように読めるか。` : `${label}の視点から、この作品は何を教えるか。`
    return joined ? `这座建筑如何让 ${joined} 变得可读？` : `从${label}角度看，这座建筑呈现了什么？`
  }
  const lensGroups = [
    { key: 'spatial', label: l('spatial'), terms: record.spatialConcepts },
    { key: 'material', label: l('material'), terms: record.materialConcepts },
    { key: 'structure', label: l('structure'), terms: record.structureConcepts },
    { key: 'history', label: l('history'), terms: record.historyConcepts },
  ].filter(group => group.terms.length)
  const fallbackLensGroups = lensGroups.length ? lensGroups : [
    { key: 'core', label: l('coreConcepts'), terms: record.learningConcepts },
  ]
  const concepts = uniqueCompact(record.learningConcepts)
  const glossaryTerms = uniqueCompact(record.glossaryTerms)
  const codeTopics = uniqueCompact(record.relatedCodeTopics)

  if (!concepts.length && !glossaryTerms.length && !codeTopics.length) return null

  return (
    <Reveal>
      <section id="learn-from-this-building" className="section-sm border-t border-subtle pt-8 sm:pt-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.62fr)_minmax(18rem,0.38fr)]">
          <div>
            <p className="eyebrow mb-2">{l('eyebrow')}</p>
            <h2 className="heading-3">{l('title')}</h2>
            <p className="body-sm mt-4 max-w-2xl text-secondary">{l('intro')}</p>
            {record.needsReview && <p className="caption mt-4 max-w-2xl">{l('reviewNote')}</p>}
          </div>
          {concepts.length > 0 && (
            <div className="border-t border-subtle pt-4">
              <p className="label mb-3">{l('coreConcepts')}</p>
              <div className="flex flex-wrap gap-2">
                {concepts.slice(0, 8).map(concept => (
                  <span key={concept} className="rounded-full border border-subtle bg-surface-muted px-3 py-1 text-xs font-medium leading-5 text-secondary">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {fallbackLensGroups.map(group => (
            <div key={group.key} className="border-y border-subtle px-2 py-4">
              <p className="label mb-3">{group.label}</p>
              <p className="body-sm text-primary">{question(group.label, group.terms)}</p>
            </div>
          ))}
        </div>

        {(glossaryTerms.length > 0 || codeTopics.length > 0) && (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {glossaryTerms.length > 0 && (
              <div className="border-t border-subtle pt-4">
                <p className="label mb-3">{l('glossary')}</p>
                <div className="flex flex-wrap gap-3">
                  {glossaryTerms.slice(0, 6).map(term => (
                    <Link key={term} href={`${prefix}/glossary?term=${encodeURIComponent(term)}`} className="text-sm font-medium text-accent underline underline-offset-4">
                      {term}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {codeTopics.length > 0 && (
              <div className="border-t border-subtle pt-4">
                <p className="label mb-3">{l('codeTopics')}</p>
                <div className="flex flex-wrap gap-3">
                  {codeTopics.map(topic => (
                    <Link key={topic} href={`${prefix}/code/${topic}`} className="text-sm font-medium text-accent underline underline-offset-4">
                      {formatStudyLabel(topic)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </Reveal>
  )
}

function BuildingTechnicalNotes({ lang, building }: { lang: string; building: Building }) {
  const copy = {
    title: { zh: '结构与材料', en: 'Structure and materials', ja: '構造と素材' },
    structure: { zh: '结构', en: 'Structure', ja: '構造' },
    materials: { zh: '材料', en: 'Materials', ja: '素材' },
    area: { zh: '面积', en: 'Area', ja: '面積' },
  }
  const l = (key: keyof typeof copy) => copy[key][lang as 'zh' | 'en' | 'ja'] || copy[key].en
  const structure =
    building.structure && !(lang === 'ja' && isProbablySimplifiedChinese(building.structure))
      ? building.structure
      : null
  const materials = building.materials?.length && lang !== 'ja' ? building.materials.join(', ') : null
  const rows = [
    structure && { label: l('structure'), value: structure },
    materials && { label: l('materials'), value: materials },
    building.area_sqm && { label: l('area'), value: `${building.area_sqm.toLocaleString()} m²` },
  ].filter(Boolean) as Array<{ label: string; value: string }>
  if (rows.length === 0) return null

  return (
    <Reveal>
      <ArticleSection id="technical-notes" title={l('title')}>
        <div className="divide-y divide-[color:var(--ui-border-subtle)] border-y border-subtle">
          {rows.map(row => (
            <div key={row.label} className="grid gap-2 px-2 py-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
              <p className="label">{row.label}</p>
              <p className="body-sm text-primary">{row.value}</p>
            </div>
          ))}
        </div>
      </ArticleSection>
    </Reveal>
  )
}

function BuildingSources({
  lang,
  building,
  galleryImages,
  overlaySources,
}: {
  lang: string
  building: Building
  galleryImages: Array<{ source_url: string; photographer: string | null; license: string | null }>
  overlaySources?: BuildingContentSource[]
}) {
  const imageSource = galleryImages.find(image => image.source_url)
  const rawSources = [
    ...(overlaySources || []).map(source => ({ label: source.title, href: source.url })),
    building.official_url && { label: lang === 'en' ? 'Official site' : lang === 'ja' ? '公式サイト' : '官方网站', href: building.official_url },
    building.wikipedia_url && { label: 'Wikipedia', href: building.wikipedia_url },
    building.wikidata_id && { label: 'Wikidata', href: `https://www.wikidata.org/wiki/${building.wikidata_id}` },
    !building.official_url && !building.wikipedia_url && imageSource && {
      label: lang === 'en' ? 'Image source' : lang === 'ja' ? '画像資料' : '图片来源',
      href: imageSource.source_url,
    },
  ].filter(Boolean) as Array<{ label: string; href: string }>
  const sources = Array.from(new Map(rawSources.map(source => [source.href, source])).values())

  if (sources.length === 0) return null

  return (
    <Reveal>
      <section id="building-sources" className="section-sm border-t border-subtle pt-8 sm:pt-10">
        <p className="eyebrow mb-3">{lang === 'en' ? 'Sources' : lang === 'ja' ? '出典' : '来源'}</p>
        <div className="flex flex-wrap gap-3">
          {sources.map(source => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm font-medium text-accent underline underline-offset-4">
              {source.label}
            </a>
          ))}
        </div>
      </section>
    </Reveal>
  )
}

export async function generateStaticParams() {
  const buildings = await getBuildings()
  return ['zh', 'en', 'ja'].flatMap(lang => buildings.map(b => ({ lang, slug: b.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const rels = await getBuildingRelations(slug)
  if (!rels) return { title: 'Not Found' }
  const name = displayName(rels.building, lang)
  const arch = rels.architect ? displayName(rels.architect, lang) : ''
  const contentOverlay = getBuildingContent(slug)
  const overlayDescription = contentOverlay ? localizedBuildingContent(contentOverlay.summary, lang) : ''
  const desc = overlayDescription || [name, rels.building.city, rels.building.country, rels.building.year_start, arch].filter(Boolean).join(' · ')
  return { title: name, description: desc }
}

export default async function BuildingPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const rels = await getBuildingRelations(slug)
  if (!rels) notFound()

  const { building, architect, relatedBuildings: related, images, styles: buildingStyles, era } = rels
  const prefix = `/${lang}`
  const contentOverlay = getBuildingContent(slug)
  const [allEras, buildingsWithCovers, graduationProfiles] = await Promise.all([
    getEras(),
    getBuildingsWithCovers(),
    getPublishedGraduationProfilesByBuildingId(building.id),
  ])
  const buildingWithCover = buildingsWithCovers.find(item => item.slug === building.slug)
  const curatedCoverImage = buildingWithCover?.cover_url
    ? {
        id: `${building.id}-curated-cover`,
        building_id: building.id,
        url_original: buildingWithCover.cover_url,
        url_thumb_400: buildingWithCover.cover_url,
        photographer: buildingWithCover.cover_photographer || null,
        source: 'curated',
        license: buildingWithCover.cover_license || null,
        source_url: buildingWithCover.cover_source_url || '',
        img_type: buildingWithCover.cover_img_type || 'exterior',
        is_primary: true,
      }
    : null
  const curatedCoverUrl = curatedCoverImage?.url_original
  const supportingImages = images
    .filter(image => image.url_original !== curatedCoverUrl)
    .filter(image => image.source !== 'Unsplash' || !curatedCoverImage)
  const galleryImages = curatedCoverImage ? [curatedCoverImage] : supportingImages.slice(0, 1)
  const contextEra = era || findEraForBuildingYear(building, allEras)
  const timelinePeriod = contextEra
    ? findTimelinePeriodForEra(contextEra)
    : findTimelinePeriodForRange(building.year_start, building.year_end)
  const learningMapRecord = buildingLearningMapBySlug[building.slug]

  const nameText = displayName(building, lang)
  const visibleBuildingStyles = buildingStyles.filter(style => {
    const styleName = displayName(style, lang)
    return lang === 'en' || /[\u3400-\u9fffぁ-ゟァ-ヿ]/.test(styleName)
  })
  const cleanText = (text: string) => {
    if (lang === 'en' && /[\u3400-\u9fffぁ-ゟァ-ヿ]/.test(text)) return ''
    if (lang === 'ja' && isProbablySimplifiedChinese(text)) return ''
    return text
  }
  const buildingLocation = formatDisplayLocation({
    city: building.city,
    country: building.country,
    countryCode: building.country_code,
    lang,
  })
  const fallbackContent = getBuildingFallbackContent({
    building,
    architect,
    styles: buildingStyles,
    era: contextEra,
    lang,
  })
  const overlaySummary = contentOverlay ? localizedBuildingContent(contentOverlay.summary, lang) : ''
  const hasLocalizedOverlay = Boolean(contentOverlay) && !(lang === 'en' && /[\u3400-\u9fff]/.test(overlaySummary))
  const localizedDatabaseDescription = cleanText(displayText(building.description, lang))
  const localizedDatabaseSignificance = cleanText(displayText(building.significance, lang))
  const usesFallbackContent = !hasLocalizedOverlay && (!localizedDatabaseDescription || !localizedDatabaseSignificance)
  const descriptionText = hasLocalizedOverlay && contentOverlay
    ? localizedBuildingContent(contentOverlay.summary, lang)
    : localizedDatabaseDescription || fallbackContent.summary
  const sigText = hasLocalizedOverlay && contentOverlay
    ? localizedBuildingContent(contentOverlay.significance, lang)
    : localizedDatabaseSignificance || fallbackContent.significance
  const spatialText = cleanText(displayText(building.spatial_feat, lang))
  const lightText = cleanText(displayText(building.light_feat, lang))
  const circulationText = cleanText(displayText(building.circulation, lang))
  const historicalOverride = historicalBuildingFactOverrides[building.slug]
  const designerValue = historicalOverride
    ? localizedOverrideText(historicalOverride.designer, lang)
    : architect
      ? <Link href={`${prefix}/architect/${architect.slug}`} className="underline decoration-[color:var(--ui-border)] underline-offset-2 transition-colors hover:text-accent">{displayName(architect, lang)}</Link>
      : null
  const yearValue = historicalOverride
    ? localizedOverrideText(historicalOverride.year, lang)
    : building.year_start
      ? `${building.year_start}${building.year_end ? ` – ${building.year_end}` : ''}`
      : null

  const metaRows = [
    { label: historicalOverride?.designerLabel ? localizedOverrideText(historicalOverride.designerLabel, lang) : t(lang, 'architects'), value: designerValue },
    { label: historicalOverride ? localizedOverrideText(historicalOverride.yearLabel, lang) : t(lang, 'year'), value: yearValue },
    ...(historicalOverride?.facts.map(fact => ({
      label: localizedOverrideText(fact.label, lang),
      value: localizedOverrideText(fact.value, lang),
    })) || []),
    { label: t(lang, 'location'), value: buildingLocation || null },
    { label: t(lang, 'type'), value: building.type_slug ? cleanText(building.type_slug) : null },
    { label: t(lang, 'structure'), value: building.structure ? cleanText(building.structure) : null },
    { label: t(lang, 'materials'), value: building.materials?.length && lang !== 'ja' ? building.materials.join(', ') : null },
    { label: t(lang, 'area'), value: building.area_sqm ? `${building.area_sqm.toLocaleString()} m²` : null },
    { label: t(lang, 'style'), value: visibleBuildingStyles.length ? visibleBuildingStyles.map(style => displayName(style, lang)).join(', ') : null },
    { label: t(lang, 'eras'), value: contextEra ? displayName(contextEra, lang) : null },
  ].filter(r => r.value)

  return (
    <PageShell>
      <Breadcrumb items={[
        { label: t(lang, 'home'), href: `/${lang}` },
        { label: t(lang, 'buildings'), href: `/${lang}/browse/buildings` },
        { label: nameText },
      ]} />

      {/* Hero: image gallery */}
      <div className="section-sm">
        <ImageGallery images={galleryImages} alt={nameText} lang={lang} />
      </div>

      {/* Title + metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 section">
        <div className="lg:col-span-2 flow">
          <h1 className="heading-display">{nameText}</h1>
          {building.name_en !== nameText && (
            <p className="text-sm leading-relaxed text-secondary">{building.name_en}</p>
          )}
          {descriptionText && (
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-secondary sm:text-lg">
              {descriptionText}
            </p>
          )}

          {usesFallbackContent && <ContentMaturityNote lang={lang} subject="building" />}

          {sigText && <PullQuote>{sigText}</PullQuote>}
        </div>

        {/* Sticky sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20">
            <p className="eyebrow mb-3">{t(lang, 'overview')}</p>
            <MetadataPanel rows={metaRows} />
          </div>
        </div>
      </div>

      <BuildingPeriodContext
        lang={lang}
        prefix={prefix}
        building={building}
        era={contextEra}
        period={timelinePeriod}
      />

      <BuildingStudyMap
        lang={lang}
        building={building}
        hasSpatial={Boolean(spatialText)}
        hasLight={Boolean(lightText)}
        hasCirculation={Boolean(circulationText)}
        hasSources={Boolean(contentOverlay?.sources.length)}
      />

      {learningMapRecord && (
        <BuildingLearningBridge
          lang={lang}
          prefix={prefix}
          record={learningMapRecord}
        />
      )}

      {/* Deep Analysis — layered content sections with reading anchors */}
      <div className="section-sm space-y-14 sm:space-y-16">
        {hasLocalizedOverlay && contentOverlay && (
          <Reveal>
            <ArticleSection id="building-research" title={lang === 'en' ? 'Research card' : lang === 'ja' ? '研究カード' : '研究卡'}>
              <div className="space-y-10">
                {contentOverlay.sections.map(section => (
                  <section key={localizedBuildingContent(section.title, lang)} className="border-t border-subtle pt-7 first:border-t-0 first:pt-0">
                    <h3 className="heading-4 mb-4">{localizedBuildingContent(section.title, lang)}</h3>
                    <div className="space-y-4">
                      {localizedBuildingContent(section.paragraphs, lang).map((paragraph, index) => (
                        <p key={index} className="body text-secondary">{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </ArticleSection>
          </Reveal>
        )}

        {spatialText && (
          <Reveal>
            <ArticleSection id="spatial-analysis" title={t(lang, 'spatial')}>
              <div className="prose prose-stone dark:prose-invert body max-w-none">{spatialText}</div>
            </ArticleSection>
          </Reveal>
        )}

        {spatialText && lightText && galleryImages.length > 1 && (
          <ImageBreak src={galleryImages[1]?.url_original || galleryImages[0].url_original} alt={nameText}
            photographer={galleryImages[1]?.photographer} license={galleryImages[1]?.license}
            sourceUrl={galleryImages[1]?.source_url} lang={lang} />
        )}

        {lightText && (
          <Reveal>
            <ArticleSection id="light-analysis" title={t(lang, 'lighting')}>
              <div className="prose prose-stone dark:prose-invert body max-w-none">{lightText}</div>
            </ArticleSection>
          </Reveal>
        )}

        {circulationText && (
          <Reveal>
            <ArticleSection id="circulation-analysis" title={t(lang, 'circulation')}>
              <div className="prose prose-stone dark:prose-invert body max-w-none">{circulationText}</div>
            </ArticleSection>
          </Reveal>
        )}

        <BuildingTechnicalNotes lang={lang} building={building} />
      </div>

      <BuildingKnowledgeNetwork
        lang={lang}
        prefix={prefix}
        architect={architect}
        styles={visibleBuildingStyles}
        era={contextEra}
        building={building}
        related={related}
      />

      <BuildingSources lang={lang} building={building} galleryImages={galleryImages} overlaySources={contentOverlay?.sources} />

      {/* Related buildings */}
      {related.length > 0 && (
        <Reveal>
          <section className="border-t border-subtle pt-10 sm:pt-12">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="heading-3">{t(lang, 'relatedBuildings')}</h2>
                <p className="caption mt-1">
                  {lang === 'en'
                    ? `${related.length} buildings selected by shared architect, style, or type`
                    : lang === 'ja'
                    ? `建築家、様式、建築類型が共通する ${related.length} 件`
                    : `按共同建筑师、风格或类型选出的 ${related.length} 座建筑`}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {related.slice(0, 6).map(b => {
                const relArch = architect && b.architect_slug === architect.slug ? displayName(architect, lang) : ''
                return <BuildingCard key={b.id} building={b} lang={lang} architectName={relArch} />
              })}
            </div>
          </section>
        </Reveal>
      )}

      {graduationProfiles.length > 0 && (
        <Reveal>
          <section className="section-sm border-t border-subtle pt-8 sm:pt-10" aria-labelledby="graduation-references-title">
            <p className="eyebrow mb-2">{lang === 'en' ? 'Graduation design' : lang === 'ja' ? '卒業設計' : '毕业设计'}</p>
            <h2 id="graduation-references-title" className="heading-3">
              {lang === 'en' ? 'Use this building as a research reference' : lang === 'ja' ? 'この建築を卒業設計の参考として読む' : '将这座建筑作为毕业设计参考'}
            </h2>
            <div className="mt-5 border-y border-subtle">
              {graduationProfiles.map(profile => (
                <Link key={profile.case_id} href={`${prefix}/graduation/cases/${profile.case_id}`} className="interactive-row flex min-h-12 items-center justify-between border-b border-subtle px-1 text-sm last:border-b-0">
                  <span>{profile.case_id}</span>
                  <span className="text-muted">{lang === 'en' ? 'Open analysis' : lang === 'ja' ? '分析を見る' : '查看分析'} →</span>
                </Link>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* Continue Exploring */}
      <ContinueExploring lang={lang} groups={[
        ...(architect ? [{
          label: lang === 'en' ? `More by ${displayName(architect, lang)}` : lang === 'ja' ? `${displayName(architect, lang)}の他の作品` : `${displayName(architect, lang)}的其他作品`,
          href: `/${lang}/architect/${architect.slug}`,
          items: related.filter(b => b.architect_slug === architect.slug).slice(0, 4).map(b => ({
            id: b.slug,
            href: `${prefix}/building/${b.slug}`,
            title: displayName(b, lang),
            subtitle: [formatDisplayLocation({ city: b.city, country: b.country, countryCode: b.country_code, lang }), b.year_start].filter(Boolean).join(', ') || undefined,
          }))
        }] : []),
        ...(related.filter(b => b.architect_slug !== architect?.slug).length > 0 ? [{
          label: lang === 'en' ? 'Similar Buildings' : lang === 'ja' ? '類似の建築' : '相似建筑',
          items: related.filter(b => b.architect_slug !== architect?.slug).slice(0, 4).map(b => ({
            id: b.slug,
            href: `${prefix}/building/${b.slug}`,
            title: displayName(b, lang),
            subtitle: [formatDisplayLocation({ city: b.city, country: b.country, countryCode: b.country_code, lang }), b.year_start].filter(Boolean).join(', '),
          }))
        }] : []),
        ...(visibleBuildingStyles.length > 0 ? [{
          label: lang === 'en' ? 'Explore This Style' : lang === 'ja' ? 'この様式を探索' : '探索此风格',
          items: visibleBuildingStyles.slice(0, 4).map(s => ({
            id: s.slug,
            href: `${prefix}/browse/style/${s.slug}`,
            title: displayName(s, lang),
          }))
        }] : []),
      ]} />
    </PageShell>
  )
}
