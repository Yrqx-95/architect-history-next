/**
 * 集中式国际化标签管理
 *
 * 所有页面共用此文件，不再各自定义 t 字典。
 * 使用方式：import { t } from '@lib/i18n'
 *          t(lang, 'architects')
 */

type Lang = 'zh' | 'en' | 'ja'

const dict: Record<string, Record<Lang, string>> = {
  // --- 导航 ---
  home:        { zh: '首页',       en: 'Home',        ja: 'ホーム' },
  search:      { zh: '搜索',       en: 'Search',      ja: '検索' },
  map:         { zh: '地图',       en: 'Map',         ja: '地図' },
  browse:      { zh: '分类浏览',   en: 'Browse',      ja: '分類閲覧' },
  timeline:    { zh: '时间轴',     en: 'Timeline',    ja: '年表' },
  architects:  { zh: '建筑师',     en: 'Architects',  ja: '建築家' },
  buildings:   { zh: '建筑',       en: 'Buildings',   ja: '建築' },
  styles:      { zh: '风格流派',   en: 'Styles',      ja: '様式' },
  eras:        { zh: '历史时期',   en: 'Eras',        ja: '時代' },
  countries:   { zh: '国家地区',   en: 'Countries',   ja: '国・地域' },
  types:       { zh: '建筑类型',   en: 'Building Types', ja: '建築種別' },

  // --- 首页 ---
  hero:        { zh: '世界建筑史档案', en: 'World Architecture Archive', ja: '世界建築史アーカイブ' },
  heroSub:     { zh: '建筑师 · 建筑作品 · 三语深度分析', en: 'Architects · Buildings · Analysis in 3 Languages', ja: '建築家 · 建築 · 三言語による詳細分析' },
  featured:    { zh: '精选建筑',   en: 'Featured Buildings', ja: '注目の建築' },
  startExplore:{ zh: '开始探索',   en: 'Start Exploring', ja: '探索を始める' },

  // --- 详情页 ---
  overview:    { zh: '概览',       en: 'Overview',    ja: '概要' },
  deepAnalysis:{ zh: '深度分析',   en: 'Deep Analysis', ja: '詳細分析' },
  works:       { zh: '代表作',     en: 'Works',       ja: '作品' },
  related:     { zh: '相关',       en: 'Related',     ja: '関連' },
  relatedArchitects: { zh: '关联建筑师', en: 'Related Architects', ja: '関連建築家' },
  relatedBuildings:  { zh: '相关建筑',   en: 'Related Buildings',  ja: '関連建築' },
  influences:  { zh: '受谁影响',   en: 'Influenced by', ja: '影響を受けた' },
  influenced:  { zh: '影响了谁',   en: 'Influenced',  ja: '影響を与えた' },
  education:   { zh: '教育背景',   en: 'Education',   ja: '教育' },
  coreIdeas:   { zh: '核心思想',   en: 'Core Ideas',  ja: '核心思想' },
  keywords:    { zh: '关键词',     en: 'Keywords',    ja: 'キーワード' },
  viewAll:     { zh: '查看全部',   en: 'View All',    ja: 'すべて見る' },
  viewArchitect:{ zh: '查看建筑师', en: 'View Architect', ja: '建築家を見る' },
  viewDetails: { zh: '查看详情',   en: 'View Details', ja: '詳細を見る' },

  // --- 信息字段 ---
  location:    { zh: '位置',       en: 'Location',    ja: '場所' },
  year:        { zh: '建成年份',   en: 'Year',        ja: '竣工年' },
  lifeSpan:    { zh: '生卒年份',   en: 'Life span',   ja: '生没年' },
  nationality: { zh: '国籍 / 地区', en: 'Nationality / Region', ja: '国籍・地域' },
  type:        { zh: '类型',       en: 'Type',        ja: '類型' },
  style:       { zh: '风格',       en: 'Style',       ja: '様式' },
  area:        { zh: '面积',       en: 'Area',        ja: '面積' },
  materials:   { zh: '材料',       en: 'Materials',   ja: '素材' },
  structure:   { zh: '结构',       en: 'Structure',   ja: '構造' },
  significance:{ zh: '重要意义',   en: 'Significance', ja: '意義' },
  spatial:     { zh: '空间特点',   en: 'Spatial Features', ja: '空間特性' },
  lighting:    { zh: '光线特点',   en: 'Light Features',   ja: '光の設計' },
  circulation: { zh: '动线组织',   en: 'Circulation', ja: '動線' },

  // --- 搜索 / 筛选 ---
  filter:      { zh: '筛选',       en: 'Filter',      ja: '絞り込み' },
  all:         { zh: '全部',       en: 'All',         ja: 'すべて' },
  noResults:   { zh: '未找到匹配结果', en: 'No results found', ja: '該当結果がありません' },
  searchPlaceholder: { zh: '搜索建筑师或建筑...', en: 'Search architects or buildings...', ja: '建築家や建築を検索...' },
  searchResults: { zh: '搜索结果', en: 'Search Results', ja: '検索結果' },
  browseCategory: { zh: '按分类浏览', en: 'Browse by category', ja: '分類から探す' },
  searchIntro: {
    zh: '输入建筑、建筑师、城市、国家、年代、类型或风格关键词。',
    en: 'Search by building, architect, city, country, year, type, or style.',
    ja: '建築、建築家、都市、国、年代、種別、様式で検索できます。',
  },
  searchSuggestions: { zh: '常用入口', en: 'Common entries', ja: 'よく使う入口' },
  searchEmptyTitle: { zh: '从一个线索开始', en: 'Start with a clue', ja: '手がかりから始める' },
  searchEmptyBody: {
    zh: '可以输入城市、建筑类型、时代、风格或建筑师姓名。',
    en: 'Try a city, building type, era, style, or architect name.',
    ja: '都市、建築種別、時代、様式、建築家名を試してください。',
  },
  searchNoResultsHint: {
    zh: '换一个拼写、城市、年代或分类词，或者从分类浏览继续。',
    en: 'Try another spelling, city, year, or category term, or continue through browse.',
    ja: '別の綴り、都市、年代、カテゴリ語を試すか、分類閲覧へ進んでください。',
  },
  resultsFound: { zh: '条结果', en: 'results', ja: '件の結果' },
  countriesIntro: {
    zh: '从历史悠久的欧洲中心到现代全球城市，在地理脉络中探索建筑与建筑师。',
    en: 'Explore buildings and architects through their geographic context, from historic European centers to modern global cities.',
    ja: '歴史的なヨーロッパの中心地から現代のグローバル都市まで、地理的文脈から建築と建築家を探索します。',
  },
  countriesDescription: {
    zh: '按国家与地区浏览建筑。',
    en: 'Browse architecture by country and region.',
    ja: '国と地域別に建築を閲覧。',
  },
  countriesAndRegions: { zh: '个国家与地区', en: 'countries and regions', ja: 'の国・地域' },

  // --- 时间轴 ---
  timelineTitle: { zh: '建筑史时间轴', en: 'Architectural Timeline', ja: '建築史年表' },
  architectsTimeline: { zh: '建筑师编年', en: 'Architects Timeline', ja: '建築家年表' },
  buildingsTimeline: { zh: '建筑编年',   en: 'Buildings Timeline',  ja: '建築年表' },
  birth:       { zh: '生',         en: 'b.',          ja: '生' },
  present:     { zh: '至今',       en: 'Present',     ja: '現在' },

  // --- 地图 ---
  mapTitle:    { zh: '地图探索',   en: 'Map Explorer', ja: '地図探索' },
  mapSub:      { zh: '在世界地图上探索建筑分布', en: 'Explore building distribution on world map', ja: '世界地図で建築の分布を探る' },

  // --- 通用 ---
  dark:        { zh: '暗色',       en: 'Dark',        ja: 'ダーク' },
  light:       { zh: '亮色',       en: 'Light',       ja: 'ライト' },
  searchBtn:   { zh: '搜索',       en: 'Search',      ja: '検索' },
  siteName:    { zh: '建筑史档案', en: 'Architect History', ja: '建築史アーカイブ' },
  totalArchitects: { zh: '位建筑师', en: ' Architects', ja: '人の建築家' },
  totalBuildings:  { zh: '座建筑',   en: ' Buildings',  ja: 'の建築' },

  // --- 图片类型 ---
  imgExterior:  { zh: '外观',     en: 'Exterior',    ja: '外観' },
  imgInterior:  { zh: '室内',     en: 'Interior',    ja: '内観' },
  imgFloorPlan: { zh: '平面图',   en: 'Floor Plan',  ja: '平面図' },
  imgElevation: { zh: '立面图',   en: 'Elevation',   ja: '立面図' },
  imgSection:   { zh: '剖面图',   en: 'Section',     ja: '断面図' },
  imgDetail:    { zh: '细部',     en: 'Detail',      ja: '詳細' },
  imgAerial:    { zh: '鸟瞰',     en: 'Aerial',      ja: '鳥瞰' },
  imgOther:     { zh: '其他',     en: 'Other',       ja: 'その他' },
}

export function t(lang: string, key: string): string {
  return dict[key]?.[lang as Lang] || dict[key]?.zh || key
}

export function tImageType(lang: string, type: string): string {
  return t(lang, `img${type.charAt(0).toUpperCase() + type.slice(1)}`) || type
}
