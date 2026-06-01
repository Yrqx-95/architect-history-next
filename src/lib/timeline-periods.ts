import type { Era } from './types'

type TimelineLocale = 'zh' | 'en' | 'ja'

export type TimelinePeriod = {
  id: string
  label: Record<TimelineLocale, string>
  range: [number, number]
  question: Record<TimelineLocale, string>
  summary: Record<TimelineLocale, string>
  transition: Record<TimelineLocale, string>
  movements: Record<TimelineLocale, string[]>
}

export const timelinePeriods: TimelinePeriod[] = [
  {
    id: 'classical',
    label: { zh: '古典世界', en: 'Classical World', ja: '古典世界' },
    range: [-800, 476],
    question: {
      zh: '建筑如何把神、城邦和帝国秩序变成可建造的形式？',
      en: 'How can architecture turn gods, civic life, and empire into buildable form?',
      ja: '建築は神、都市国家、帝国秩序をどのように建てられる形式へ変えたのか。',
    },
    summary: {
      zh: '神庙、柱式、城市公共空间和帝国工程形成西方建筑语言的早期语法。',
      en: 'Temples, orders, civic space, and imperial engineering establish an early grammar for Western architecture.',
      ja: '神殿、オーダー、公共空間、帝国的な土木が西洋建築の初期文法を形づくる。',
    },
    transition: {
      zh: '罗马帝国瓦解后，建筑重心从帝国公共工程转向宗教共同体、修道院和城市工匠体系。',
      en: 'After Rome fragments, architectural energy shifts from imperial public works toward religious communities, monasteries, and urban craft.',
      ja: 'ローマ帝国の分裂後、建築の重心は帝国的公共事業から宗教共同体、修道院、都市の職人組織へ移る。',
    },
    movements: {
      zh: ['古希腊', '古罗马', '柱式系统'],
      en: ['Ancient Greece', 'Ancient Rome', 'Orders'],
      ja: ['古代ギリシア', '古代ローマ', 'オーダー'],
    },
  },
  {
    id: 'medieval',
    label: { zh: '中世纪', en: 'Medieval', ja: '中世' },
    range: [476, 1400],
    question: {
      zh: '建筑如何组织信仰、朝圣、结构高度与城市工匠协作？',
      en: 'How does architecture organize faith, pilgrimage, height, and craft collaboration?',
      ja: '建築は信仰、巡礼、高さ、職人の協働をどのように組織したのか。',
    },
    summary: {
      zh: '宗教建筑、结构实验和城市工匠体系推动罗曼式、哥特式与拜占庭传统分化。',
      en: 'Religious building, structural experiment, and craft guilds divide Romanesque, Gothic, and Byzantine traditions.',
      ja: '宗教建築、構造実験、職人組織がロマネスク、ゴシック、ビザンティンを分岐させる。',
    },
    transition: {
      zh: '古典文献、透视法和人文主义重新进入建筑训练，建筑师从匿名工匠逐渐变成有理论身份的作者。',
      en: 'Classical texts, perspective, and humanism re-enter architectural training, turning the architect from anonymous maker into theoretical author.',
      ja: '古典文献、遠近法、人文主義が建築教育へ戻り、建築家は匿名の職人から理論を持つ作者へ変わっていく。',
    },
    movements: {
      zh: ['拜占庭', '罗曼式', '哥特'],
      en: ['Byzantine', 'Romanesque', 'Gothic'],
      ja: ['ビザンティン', 'ロマネスク', 'ゴシック'],
    },
  },
  {
    id: 'renaissance-baroque',
    label: { zh: '文艺复兴到巴洛克', en: 'Renaissance to Baroque', ja: 'ルネサンスからバロックへ' },
    range: [1400, 1750],
    question: {
      zh: '建筑如何在理性比例、权力展示和城市舞台之间取得平衡？',
      en: 'How does architecture balance rational proportion, power, and urban spectacle?',
      ja: '建築は合理的比例、権力の表象、都市的演出をどう調停したのか。',
    },
    summary: {
      zh: '古典秩序被重新发现，随后被巴洛克转化为戏剧化的空间、轴线与城市景观。',
      en: 'Classical order is rediscovered, then transformed by Baroque space, axis, and urban spectacle.',
      ja: '古典秩序が再発見され、やがてバロックの空間、軸線、都市的演出へ展開する。',
    },
    transition: {
      zh: '工业化、殖民贸易和新材料让建筑不再只服务宫廷与教会，也开始回应工厂、车站、博览会和现代城市。',
      en: 'Industrialization, colonial trade, and new materials move architecture beyond court and church toward factories, stations, exhibitions, and modern cities.',
      ja: '産業化、植民地貿易、新素材により、建築は宮廷と教会だけでなく工場、駅、博覧会、近代都市へ向かう。',
    },
    movements: {
      zh: ['文艺复兴', '帕拉迪奥主义', '巴洛克'],
      en: ['Renaissance', 'Palladianism', 'Baroque'],
      ja: ['ルネサンス', 'パラディオ主義', 'バロック'],
    },
  },
  {
    id: 'industrial-modern',
    label: { zh: '工业革命与现代主义', en: 'Industrial Revolution and Modernism', ja: '産業革命とモダニズム' },
    range: [1750, 1930],
    question: {
      zh: '当钢、玻璃、混凝土和大众城市出现后，建筑还应不应该模仿历史？',
      en: 'When steel, glass, concrete, and mass cities arrive, should architecture still imitate history?',
      ja: '鉄、ガラス、コンクリート、大衆都市が現れたとき、建築はなお歴史を模倣すべきなのか。',
    },
    summary: {
      zh: '钢、玻璃、混凝土、铁路和城市扩张改变建筑问题，现代主义开始把形式、功能与工业生产重新绑定。',
      en: 'Steel, glass, concrete, railways, and urban expansion change the architectural problem and prepare modernism.',
      ja: '鉄、ガラス、コンクリート、鉄道、都市拡張が建築の問題を変え、モダニズムを準備する。',
    },
    transition: {
      zh: '两次世界大战、住房危机和国际交流使现代主义从少数实验变成全球制度性语言。',
      en: 'World wars, housing crises, and international exchange turn modernism from scattered experiment into a global institutional language.',
      ja: '世界大戦、住宅危機、国際交流により、モダニズムは個別の実験から世界的な制度言語へ変わる。',
    },
    movements: {
      zh: ['新古典主义', '工业建筑', '早期现代主义'],
      en: ['Neoclassicism', 'Industrial architecture', 'Early modernism'],
      ja: ['新古典主義', '産業建築', '初期モダニズム'],
    },
  },
  {
    id: 'high-modern',
    label: { zh: '20世纪现代主义', en: '20th-century Modernism', ja: '20世紀モダニズム' },
    range: [1930, 1980],
    question: {
      zh: '建筑能否通过标准化、结构诚实和城市规划重建社会生活？',
      en: 'Can architecture rebuild social life through standardization, structural honesty, and planning?',
      ja: '建築は標準化、構造の誠実さ、都市計画によって社会生活を再建できるのか。',
    },
    summary: {
      zh: '国际风格、战后重建、粗野主义和区域现代主义把建筑变成社会制度、技术和生活方式的实验场。',
      en: 'International Style, reconstruction, Brutalism, and regional modernisms turn architecture into a social and technical laboratory.',
      ja: '国際様式、戦後復興、ブルータリズム、地域的モダニズムが建築を社会と技術の実験場にする。',
    },
    transition: {
      zh: '现代主义的普遍主义受到批评后，建筑转向历史记忆、地域身份、消费文化、数字技术和生态责任。',
      en: 'As modernism’s universal claims are challenged, architecture turns toward memory, local identity, consumer culture, digital tools, and ecology.',
      ja: 'モダニズムの普遍主義が批判され、建築は記憶、地域性、消費文化、デジタル技術、環境責任へ向かう。',
    },
    movements: {
      zh: ['国际风格', '粗野主义', '代谢派'],
      en: ['International Style', 'Brutalism', 'Metabolism'],
      ja: ['国際様式', 'ブルータリズム', 'メタボリズム'],
    },
  },
  {
    id: 'contemporary',
    label: { zh: '当代', en: 'Contemporary', ja: '現代' },
    range: [1980, 2030],
    question: {
      zh: '在全球化与气候危机中，建筑如何同时回应图像、数据、地方性和公共责任？',
      en: 'In globalization and climate crisis, how can architecture respond to image, data, locality, and public responsibility at once?',
      ja: 'グローバル化と気候危機の中で、建築はイメージ、データ、地域性、公共責任にどう同時に応えるのか。',
    },
    summary: {
      zh: '全球化、数字工具、生态议题和文化身份重新塑造建筑的形式、生产方式与公共责任。',
      en: 'Globalization, digital tools, ecological pressure, and cultural identity reshape form, production, and public responsibility.',
      ja: 'グローバル化、デジタル技術、環境問題、文化的アイデンティティが建築の形と責任を再編する。',
    },
    transition: {
      zh: '当代不是终点，而是知识网络持续增长的现场：建筑师、作品、地区和议题仍在互相改写。',
      en: 'The contemporary is not an endpoint but a living network where architects, works, regions, and problems keep rewriting one another.',
      ja: '現代は終点ではなく、建築家、作品、地域、課題が互いを書き換え続ける生きたネットワークである。',
    },
    movements: {
      zh: ['后现代', '高技派', '生态建筑'],
      en: ['Postmodernism', 'High-tech', 'Ecological architecture'],
      ja: ['ポストモダン', 'ハイテック', 'エコロジカル建築'],
    },
  },
]

export function localizedTimelineText<T>(value: Record<TimelineLocale, T>, lang: string): T {
  return value[lang as TimelineLocale] || value.en
}

export function findTimelinePeriodForRange(start?: number | null, end?: number | null): TimelinePeriod | null {
  if (start == null) return null
  const rangeStart = start
  const rangeEnd = end ?? start
  let bestPeriod: TimelinePeriod | null = null
  let bestOverlap = -1

  timelinePeriods.forEach(period => {
    const [periodStart, periodEnd] = period.range
    const overlap = Math.min(rangeEnd, periodEnd) - Math.max(rangeStart, periodStart)
    if (overlap < 0) return
    if (overlap > bestOverlap) {
      bestPeriod = period
      bestOverlap = overlap
    }
  })

  return bestPeriod
}

export function findTimelinePeriodForEra(era: Era): TimelinePeriod | null {
  return findTimelinePeriodForRange(era.year_start, era.year_end)
}
