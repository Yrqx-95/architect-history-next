export type LearningPathKind = 'architect' | 'building' | 'style' | 'era'

type LocalizedText = {
  zh: string
  en: string
  ja: string
}

export interface LearningPathStep {
  kind: LearningPathKind
  slug: string
  note: LocalizedText
}

export interface LearningPath {
  slug: string
  title: LocalizedText
  subtitle: LocalizedText
  description: LocalizedText
  steps: LearningPathStep[]
}

export const learningPaths: LearningPath[] = [
  {
    slug: 'corbusier-to-japanese-modernism',
    title: {
      zh: '从柯布西耶到日本现代主义',
      en: 'From Le Corbusier to Japanese Modernism',
      ja: 'ル・コルビュジエから日本のモダニズムへ',
    },
    subtitle: {
      zh: '一条跨越师承、合作与国家现代化的路线。',
      en: 'A route through mentorship, collaboration, and national modernization.',
      ja: '師承、協働、国家の近代化をたどるルート。',
    },
    description: {
      zh: '这条路线从现代主义的空间语法开始，进入东京的美术馆、战后公共建筑与代谢派一代，帮助你理解日本现代建筑如何吸收并改写国际现代主义。',
      en: 'This route starts from modernist spatial grammar and moves through a Tokyo museum, postwar public architecture, and the Metabolist generation.',
      ja: 'このルートはモダニズムの空間文法から始まり、東京の美術館、戦後公共建築、メタボリズム世代へ進む。',
    },
    steps: [
      { kind: 'style', slug: 'modernism', note: { zh: '先理解现代主义如何把结构、功能与自由平面变成新的建筑语言。', en: 'Begin with modernism as a language of structure, function, and free plan.', ja: '構造、機能、自由な平面を新しい建築言語に変えたモダニズムから始める。' } },
      { kind: 'architect', slug: 'le-corbusier', note: { zh: '柯布西耶把城市、住宅、身体尺度和公共建筑放进同一套现代主义问题。', en: 'Le Corbusier connected city, housing, bodily scale, and public architecture.', ja: 'ル・コルビュジエは都市、住宅、身体尺度、公共建築を同じ近代の問題に結びつけた。' } },
      { kind: 'building', slug: 'national-museum-of-western-art', note: { zh: '东京国立西洋美术馆让现代主义在日本获得可见的制度空间。', en: 'The National Museum of Western Art made modernism institutionally visible in Japan.', ja: '国立西洋美術館は、日本におけるモダニズムを制度的な空間として可視化した。' } },
      { kind: 'architect', slug: 'kunio-maekawa', note: { zh: '前川国男把柯布西耶经验转译到日本的公共建筑实践中。', en: 'Kunio Maekawa translated Corbusian lessons into Japanese public architecture.', ja: '前川國男はコルビュジエの経験を日本の公共建築へ翻訳した。' } },
      { kind: 'architect', slug: 'kenzo-tange', note: { zh: '丹下健三将战后纪念性、结构表现与城市想象连接起来。', en: 'Kenzo Tange joined postwar monumentality, structural expression, and urban imagination.', ja: '丹下健三は戦後の記念性、構造表現、都市的想像力を結びつけた。' } },
      { kind: 'building', slug: 'yoyogi-national-gymnasium', note: { zh: '代代木体育馆把悬索结构、国家仪式与现代空间经验浓缩在一起。', en: 'Yoyogi National Gymnasium condenses cable structure, civic ceremony, and modern space.', ja: '代々木体育館は吊り構造、国家的儀礼、近代空間を凝縮している。' } },
      { kind: 'architect', slug: 'fumihiko-maki', note: { zh: '槙文彦把集群形式、都市片段与细腻公共性带入下一代日本现代建筑。', en: 'Fumihiko Maki carried collective form and refined publicness into the next generation.', ja: '槇文彦は群造形と繊細な公共性を次世代へ展開した。' } },
    ],
  },
  {
    slug: 'renaissance-to-baroque',
    title: {
      zh: '从文艺复兴到巴洛克',
      en: 'From Renaissance to Baroque',
      ja: 'ルネサンスからバロックへ',
    },
    subtitle: {
      zh: '从比例秩序走向城市戏剧与空间运动。',
      en: 'From proportional order to urban theatre and spatial movement.',
      ja: '比例の秩序から都市の劇場性と空間運動へ。',
    },
    description: {
      zh: '这条路线适合从古典语言入门：先看文艺复兴如何重新组织比例、立面和理想住宅，再看巴洛克如何把轴线、光线和城市舞台推向强烈的空间体验。',
      en: 'This route introduces classical language through Renaissance proportion and Palladian clarity, then follows Baroque space into axis, light, and urban theatre.',
      ja: 'このルートは、ルネサンスの比例とパッラーディオ的明晰さから入り、バロックの軸線、光、都市劇場へ進む。',
    },
    steps: [
      { kind: 'era', slug: 'renaissance', note: { zh: '先把文艺复兴理解为古典知识重新进入建筑实践的时期。', en: 'Start with the Renaissance as a return of classical knowledge into practice.', ja: 'ルネサンスを、古典知が建築実践へ戻る時代として読む。' } },
      { kind: 'style', slug: 'renaissance', note: { zh: '文艺复兴建筑用比例、柱式和几何秩序重建世界图像。', en: 'Renaissance architecture rebuilt the world through proportion, orders, and geometry.', ja: 'ルネサンス建築は比例、オーダー、幾何で世界像を再構成した。' } },
      { kind: 'architect', slug: 'palladio', note: { zh: '帕拉迪奥把古典语言变成可传播、可复制、可变体的建筑系统。', en: 'Palladio turned classical language into a transmissible and adaptable system.', ja: 'パッラーディオは古典語法を伝播可能で変奏可能な体系にした。' } },
      { kind: 'building', slug: 'villa-rotonda', note: { zh: '圆厅别墅展示了住宅、风景、对称和神庙语言如何被合成。', en: 'Villa Rotonda joins house, landscape, symmetry, and temple language.', ja: 'ヴィラ・ロトンダは住宅、風景、対称性、神殿語法を統合する。' } },
      { kind: 'style', slug: 'baroque', note: { zh: '巴洛克不只是装饰，而是光、轴线、曲面和城市序列的空间组织。', en: 'Baroque is not only ornament; it organizes light, axis, curve, and urban sequence.', ja: 'バロックは装飾だけでなく、光、軸線、曲面、都市の連続を組織する。' } },
    ],
  },
  {
    slug: 'wright-aalto-lautner-organic-modernism',
    title: {
      zh: '从赖特到有机现代主义',
      en: 'From Wright to Organic Modernism',
      ja: 'ライトから有機的モダニズムへ',
    },
    subtitle: {
      zh: '阅读住宅、地形、材料和身体经验如何进入现代建筑。',
      en: 'A route through house, terrain, material, and bodily experience.',
      ja: '住宅、地形、素材、身体経験から近代建築を読む。',
    },
    description: {
      zh: '这条路线把现代主义从冷静几何中拉回生活现场：赖特强调建筑与地形的连续，阿尔托把材料、光线和公共生活变得更柔软，劳特纳则在加州住宅中把有机建筑推向结构实验。',
      en: 'This route reads modernism through lived terrain: Wright’s continuity with landscape, Aalto’s softer material civic world, and Lautner’s California structural experiments.',
      ja: 'このルートは、生きられた地形からモダニズムを読む。ライトの風景との連続性、アアルトの素材と公共性、ロートナーの構造実験へ進む。',
    },
    steps: [
      { kind: 'architect', slug: 'frank-lloyd-wright', note: { zh: '赖特把住宅、壁炉、水平线和土地关系变成美国现代建筑的核心问题。', en: 'Wright made house, hearth, horizon, and land central to American modernity.', ja: 'ライトは住宅、炉、水平線、土地との関係をアメリカ近代の中心問題にした。' } },
      { kind: 'building', slug: 'fallingwater', note: { zh: '流水别墅让建筑、溪流、岩石和悬挑结构成为不可分割的整体。', en: 'Fallingwater makes house, stream, rock, and cantilever inseparable.', ja: '落水荘は住宅、渓流、岩、片持ち構造を不可分にする。' } },
      { kind: 'architect', slug: 'aalto', note: { zh: '阿尔托把现代主义转向气候、木材、光线、家具和公共生活。', en: 'Aalto redirected modernism toward climate, timber, light, furniture, and civic life.', ja: 'アアルトはモダニズムを気候、木材、光、家具、公共生活へ向け直した。' } },
      { kind: 'building', slug: 'villa-mairea', note: { zh: '玛丽亚别墅把森林意象、艺术收藏与现代住宅组织在同一个环境中。', en: 'Villa Mairea joins forest imagery, art, and modern domestic space.', ja: 'マイレア邸は森のイメージ、芸術、近代住宅を一つの環境に重ねる。' } },
      { kind: 'architect', slug: 'john-lautner', note: { zh: '劳特纳继承赖特的有机思想，又把它推向洛杉矶地形与工程实验。', en: 'Lautner inherited Wright’s organic ideas and pushed them into Los Angeles terrain and engineering.', ja: 'ロートナーはライトの有機的思想を受け継ぎ、ロサンゼルスの地形と構造実験へ押し広げた。' } },
    ],
  },
]

export function localizedPathText(text: LocalizedText, lang: string) {
  return text[lang as keyof LocalizedText] || text.en
}
