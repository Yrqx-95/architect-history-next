export type ContentLang = 'zh' | 'ja' | 'en'

export interface ArchitectPortrait {
  url: string
  author: string
  license: string
  source_url: string
  alt: Record<ContentLang, string>
}

export interface ArchitectArticleSection {
  title: Record<ContentLang, string>
  paragraphs: Record<ContentLang, string[]>
}

export interface ArchitectRepresentativeWork {
  slug: string
  note: Record<ContentLang, string>
}

export interface ArchitectSource {
  title: string
  url: string
}

export interface ArchitectContentOverlay {
  slug: string
  summary: Record<ContentLang, string>
  core_ideas: Record<ContentLang, string[]>
  portrait: ArchitectPortrait
  sections: ArchitectArticleSection[]
  representative_works: ArchitectRepresentativeWork[]
  sources: ArchitectSource[]
}

export function localizedContent<T>(value: Record<ContentLang, T>, lang: string): T {
  if (lang === 'ja') return value.ja
  if (lang === 'en') return value.en
  return value.zh
}

const overlays: Record<string, ArchitectContentOverlay> = {
  'alvar-aalto': {
    slug: 'alvar-aalto',
    summary: {
      zh: '阿尔瓦尔·阿尔托把现代主义从机器美学拉回到身体、地景与日常生活。他的建筑不以形式宣言取胜，而是在光、材料、家具、声学和公共制度之间建立温和却精确的整体。',
      ja: 'アルヴァ・アアルトは、機械的な近代主義を身体、風景、日常の経験へ引き戻した建築家である。光、素材、家具、音響、公共制度を結び、柔らかくも精密な全体をつくった。',
      en: 'Alvar Aalto humanized modernism through landscape, material, light, furniture, acoustics, and civic life.',
    },
    core_ideas: {
      zh: ['以人的感官修正现代主义', '把建筑、家具与地景作为一个整体', '用木材、砖、曲线和自然光组织公共生活', '在理性平面中保留偶然、触感和地方性'],
      ja: ['人間の感覚から近代主義を組み替える', '建築・家具・風景を一体で考える', '木、レンガ、曲線、自然光で公共空間を編む', '合理的な平面に触覚と地域性を残す'],
      en: ['Humanist modernism', 'Total design', 'Material and light as civic tools', 'Rational plans with tactile local nuance'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Alvar_Aalto1.jpg',
      author: 'Unknown author',
      license: 'Public domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Alvar_Aalto1.jpg',
      alt: {
        zh: '阿尔瓦尔·阿尔托肖像',
        ja: 'アルヴァ・アアルトの肖像',
        en: 'Portrait of Alvar Aalto',
      },
    },
    sections: [
      {
        title: { zh: '从北欧地方经验进入现代主义', ja: '北欧の経験から近代主義へ', en: 'Nordic modernism' },
        paragraphs: {
          zh: [
            '阿尔托的现代性不是从抽象几何开始，而是从芬兰的气候、森林、湖泊、工艺传统和公共机构开始。早期作品仍能看到古典秩序与民族浪漫主义的痕迹；到帕伊米奥疗养院时，他已经把国际现代主义的白色体量、横向窗带和功能分区转化为一种面向身体的设计方法。',
            '这使他与许多同时代现代主义者区分开来。阿尔托接受工业化与标准化，但他很少把建筑简化成冷静的技术图解。门把手、椅子、灯具、墙面反射、病房天花颜色、楼梯扶手的触感，都被纳入同一个设计问题：人在建筑中怎样呼吸、等待、疗养、交流与工作。',
          ],
          ja: [
            'アアルトの近代性は抽象的な幾何からではなく、フィンランドの気候、森、湖、工芸、公共制度から立ち上がる。初期には古典主義や民族ロマン主義の影響も見えるが、パイミオのサナトリウムでは、白い量塊、水平窓、機能分化を、身体のための設計へと変換した。',
            'そのため彼の建築は、同時代の機械的な近代主義とは異なる。工業化や標準化を受け入れながらも、建築を冷たい技術図式にはしない。把手、椅子、照明、壁の反射、病室の天井色、手すりの触感までが、人が呼吸し、待ち、癒やされ、語り合う環境として扱われる。',
          ],
          en: ['Aalto translated international modernism through Finnish climate, craft, and civic life.'],
        },
      },
      {
        title: { zh: '建筑作为完整环境', ja: '総合環境としての建築', en: 'Architecture as total environment' },
        paragraphs: {
          zh: [
            '阿尔托的代表性并不只在单栋建筑，而在“完整环境”的观念。他与阿伊诺·阿尔托共同推动家具、玻璃器皿和室内系统的设计，Artek 的成立也说明建筑被理解为生活方式与生产方式的交汇点。住宅、图书馆、市政厅和文化中心并不是孤立物，而是由家具尺度、光线方向、材料温度和公共行为共同构成。',
            '这种整体性在维拉·玛丽亚和珊纳察洛市政厅中尤其明显。前者把现代住宅、森林住宅和艺术收藏空间叠合在一起；后者用砖、庭院和台阶把一个小城镇的行政建筑变成公共仪式场所。阿尔托的建筑常显得亲切，是因为它把制度空间转译成可被身体理解的场景。',
          ],
          ja: [
            'アアルトの重要性は、個別の建物だけでなく「総合環境」という考え方にある。アイノ・アアルトとともに家具、ガラス器、室内システムを設計し、Artek の活動は建築が生活様式と生産の交点であることを示した。住宅、図書館、市庁舎、文化施設は、家具の寸法、光の向き、素材の温度、公共的なふるまいによって成り立つ。',
            'この総合性はヴィラ・マイレアとセイナッツァロ町役場で際立つ。前者は近代住宅、森の家、芸術のための空間を重ね、後者はレンガ、中庭、階段によって行政施設を市民の儀礼空間へ変えた。制度を身体で理解できる場面へ翻訳する点に、アアルトの親しみやすさがある。',
          ],
          en: ['Aalto treated architecture, interiors, furniture, and landscape as one continuous design field.'],
        },
      },
      {
        title: { zh: '光、声学与公共建筑的温度', ja: '光、音響、公共建築の温度', en: 'Light and civic warmth' },
        paragraphs: {
          zh: [
            '阿尔托特别擅长把技术问题变成空间经验。图书馆的顶光、礼堂的声学天花、教堂的间接采光、疗养院的病房朝向，都不是附加装饰，而是平面组织的核心。相比把现代建筑理解为透明盒子，他更关心光在木、砖、白墙和曲面上的漫反射，以及这种反射如何改变人的情绪。',
            '因此他的公共建筑往往有一种低声说话的力量。它们不是纪念碑式地压倒使用者，而是允许人在其中形成习惯：进入、停留、阅读、听讲、开会、休息。阿尔托让现代主义获得了日常尺度，也让北欧福利社会的公共理想有了具体的空间表情。',
          ],
          ja: [
            'アアルトは技術的課題を空間経験へ変えることに長けていた。図書館のトップライト、ホールの音響天井、教会の間接光、サナトリウムの病室方位は装飾ではなく、平面を組み立てる中心である。透明な箱としての近代建築よりも、木、レンガ、白壁、曲面に光が拡散し、人の気分をどう変えるかを重視した。',
            'そのため彼の公共建築には、静かに語りかける力がある。利用者を記念碑的に圧倒するのではなく、入る、留まる、読む、聴く、会議する、休むといった習慣を受け止める。アアルトは近代主義に日常の尺度を与え、北欧の福祉社会の理念を具体的な空間にした。',
          ],
          en: ['Aalto turned light, acoustics, and orientation into civic experience.'],
        },
      },
    ],
    representative_works: [
      { slug: 'paimio-sanatorium', note: { zh: '以疗养中的身体为设计中心，从病房朝向到家具角度都服务于呼吸、休息与光线控制。', ja: '療養する身体を中心に、病室の向きから家具の角度まで、呼吸、休息、光の制御を設計した。', en: 'A body-centered sanatorium design.' } },
      { slug: 'villa-mairea', note: { zh: '把现代住宅、森林意象、艺术收藏与手工材料结合，是阿尔托完整环境观念的住宅实验。', ja: '近代住宅、森のイメージ、芸術、手仕事の素材を重ねた、総合環境としての住宅実験。', en: 'A domestic experiment in total environment.' } },
      { slug: 'saynatsalo-town-hall', note: { zh: '以砖庭院和抬高的议事厅重塑小城公共仪式，使市政建筑获得亲密而庄重的尺度。', ja: 'レンガの中庭と持ち上げられた議場によって、小さな町の公共儀礼を親密かつ厳粛な尺度で形にした。', en: 'A civic building scaled to town life.' } },
    ],
    sources: [
      { title: 'Alvar Aalto Foundation: Alvar Aalto', url: 'https://www.alvaraalto.fi/tietoa/alvar-aalto/' },
      { title: 'Alvar Aalto Foundation: Paimio Sanatorium', url: 'https://www.alvaraalto.fi/en/architecture/paimio-sanatorium/' },
      { title: 'Alvar Aalto Foundation: Villa Mairea', url: 'https://www.alvaraalto.fi/en/architecture/villa-mairea/' },
      { title: 'Alvar Aalto Foundation: Säynätsalo Town Hall', url: 'https://www.alvaraalto.fi/en/architecture/saynatsalo-town-hall/' },
      { title: 'Wikidata: Alvar Aalto', url: 'https://www.wikidata.org/wiki/Q82840' },
    ],
  },
  'kenzo-tange': {
    slug: 'kenzo-tange',
    summary: {
      zh: '丹下健三把战后日本的国家重建、现代技术和都市想象连接起来。他的建筑从广岛和平纪念到代代木体育馆，再到东京新都厅，始终在纪念性、结构表现和城市尺度之间寻找平衡。',
      ja: '丹下健三は、戦後日本の復興、近代技術、都市への想像力を結びつけた。広島平和記念から代々木体育館、東京都庁舎まで、記念性、構造表現、都市尺度の均衡を探り続けた。',
      en: 'Kenzo Tange connected postwar reconstruction, structural expression, and metropolitan imagination.',
    },
    core_ideas: {
      zh: ['战后公共记忆的空间化', '传统构成与现代结构的结合', '从建筑单体转向城市系统', '以大屋顶、轴线和结构表达集体性'],
      ja: ['戦後の公共記憶を空間化する', '伝統的構成と近代構造を結びつける', '単体建築から都市システムへ向かう', '大屋根、軸線、構造で集合性を表す'],
      en: ['Postwar civic memory', 'Tradition with modern structure', 'Urban systems thinking', 'Collective monumentality'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Kenzo_Tange_1981.jpg',
      author: 'Hans van Dijk for Anefo',
      license: 'CC BY-SA 3.0 nl',
      source_url: 'https://commons.wikimedia.org/wiki/File:Kenzo_Tange_1981.jpg',
      alt: { zh: '丹下健三肖像', ja: '丹下健三の肖像', en: 'Portrait of Kenzo Tange' },
    },
    sections: [
      {
        title: { zh: '把废墟转化为公共记忆', ja: '廃墟を公共の記憶へ変える', en: 'Memory after ruin' },
        paragraphs: {
          zh: [
            '丹下健三的建筑生涯与战后日本的制度重建几乎同步展开。广岛和平纪念公园与和平纪念资料馆并不是单纯的纪念物，而是把废墟、轴线、架空体量和城市景观组织成一个公共记忆系统。资料馆的柱廊与水平体量既接近国际现代主义，也回应日本传统建筑中架空、屋顶和场地秩序的关系。',
            '这类作品使丹下成为战后日本最具象征性的建筑师之一。他没有把纪念性做成封闭的石碑，而是让市民穿过空间、看见遗址、进入展览、再回到城市。建筑在这里不是停止历史，而是让历史持续被观看、讨论和教育。',
          ],
          ja: [
            '丹下健三の仕事は、戦後日本の制度的な再建とほぼ同時に始まった。広島平和記念公園と資料館は単なる記念碑ではなく、廃墟、軸線、ピロティ状の量塊、都市景観を組み合わせた公共記憶のシステムである。資料館の水平な姿と柱列は国際的な近代主義に近い一方、架構、屋根、敷地秩序という日本建築の感覚にも応答している。',
            'この仕事によって丹下は、戦後日本を象徴する建築家となった。記念性を閉じた石碑にせず、市民が空間を通り、遺構を見て、展示に入り、都市へ戻る流れをつくる。建築は歴史を止めるのではなく、見続け、語り続けるための装置となる。',
          ],
          en: ['Tange translated postwar memory into civic space at Hiroshima.'],
        },
      },
      {
        title: { zh: '结构表现与国家舞台', ja: '構造表現と国家的な舞台', en: 'Structure as national stage' },
        paragraphs: {
          zh: [
            '1964 年东京奥运会的代代木国立体育馆是丹下最具辨识度的作品之一。悬索屋顶、流动的曲线和巨大的公共空间，把体育设施转化为国家现代化的舞台。它不是简单模仿传统屋顶，而是用现代结构重新组织屋顶的象征力量。',
            '丹下的结构表现常带有强烈的城市可见性。香川县厅舍、圣玛丽主教座堂、山梨文化会馆和后来的高层办公建筑，都把梁、柱、核心筒或屋顶变成可读的秩序。结构不仅支撑建筑，也向公众说明建筑如何站立、如何形成集体形象。',
          ],
          ja: [
            '1964年東京オリンピックの代々木国立競技場は、丹下の最も強いイメージをもつ作品の一つである。吊り構造の屋根、流れる曲線、大きな公共空間は、スポーツ施設を国家の近代化を示す舞台へ変えた。伝統的な屋根をそのまま模倣するのではなく、近代構造によって屋根の象徴性を組み替えている。',
            '丹下の構造表現には都市的な可視性がある。香川県庁舎、東京カテドラル、山梨文化会館、後年の高層庁舎では、梁、柱、コア、屋根が読み取れる秩序として現れる。構造は建物を支えるだけでなく、建築がどう立ち、どう集合的な像をつくるかを示す。',
          ],
          en: ['Tange made structure into a visible civic and national image.'],
        },
      },
      {
        title: { zh: '从建筑到都市模型', ja: '建築から都市モデルへ', en: 'From building to city' },
        paragraphs: {
          zh: [
            '丹下并不满足于设计单体建筑。东京计划 1960 和一系列城市研究显示，他把交通、基础设施、居住单元和海湾尺度放在同一个系统中思考。虽然许多城市方案没有完整实现，但它们影响了代谢派以及后来关于巨构城市、弹性增长和基础设施建筑化的讨论。',
            '晚期的东京新都厅把这种都市尺度转回高层公共建筑：对称塔楼、巨大中庭、可识别的天际线与行政功能合并在一起。它也暴露了丹下作品中始终存在的张力：公共纪念性能够形成城市身份，也可能显得过于宏大。正是这种张力，使丹下成为理解战后亚洲现代化的重要入口。',
          ],
          ja: [
            '丹下は単体の建築にとどまらなかった。東京計画1960をはじめとする都市研究では、交通、インフラ、住居単位、湾岸スケールを一つのシステムとして考えた。多くは実現しなかったが、メタボリズムやメガストラクチャー、成長する都市、インフラの建築化をめぐる議論に影響を与えた。',
            '晩年の東京都庁舎は、その都市的な思考を高層公共建築へ戻した作品である。対称的な塔、中庭、明確なスカイライン、行政機能が重ねられている。同時に、公共的な記念性が都市のアイデンティティをつくる一方で、過度に巨大に見えるという緊張もある。この緊張こそ、丹下を戦後アジアの近代化を考える入口にしている。',
          ],
          en: ['Tange expanded architecture toward infrastructure, megastructure, and metropolitan identity.'],
        },
      },
    ],
    representative_works: [
      { slug: 'hiroshima-peace-museum', note: { zh: '以架空体量、轴线和遗址视线组织战后记忆，是丹下公共建筑思想的起点。', ja: 'ピロティ状の量塊、軸線、遺構への視線で戦後の記憶を組織した、丹下の公共建築の出発点。', en: 'A civic framework for postwar memory.' } },
      { slug: 'yoyogi-national-gymnasium', note: { zh: '悬索屋顶把体育馆变成国家现代化的空间象征，也是结构表现主义的经典案例。', ja: '吊り屋根によって体育館を国家的な近代化の象徴へ変えた、構造表現の代表作。', en: 'A structural icon of modern Japan.' } },
      { slug: 'tokyo-metropolitan-government', note: { zh: '将行政、纪念性和天际线整合为都市尺度的公共建筑，体现丹下晚期的巨构思维。', ja: '行政、記念性、スカイラインを都市スケールで統合した、晩年のメガストラクチャー的思考を示す作品。', en: 'A metropolitan-scale public building.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: Kenzo Tange', url: 'https://www.pritzkerprize.com/laureates/1987' },
      { title: 'Japan Sport Council: Yoyogi National Stadium', url: 'https://www.jpnsport.go.jp/yoyogi/' },
      { title: 'Tokyo Metropolitan Government: Government Building', url: 'https://www.english.metro.tokyo.lg.jp/w/001-101-000054' },
      { title: 'Wikidata: Kenzō Tange', url: 'https://www.wikidata.org/wiki/Q151794' },
    ],
  },
  'alvaro-siza-vieira': {
    slug: 'alvaro-siza-vieira',
    summary: {
      zh: '阿尔瓦罗·西扎以极其克制的线条处理复杂场地、社会住房和公共机构。他的建筑看似安静，却总是在坡地、海岸、街巷、手工尺度和现代抽象之间进行精密协商。',
      ja: 'アルヴァロ・シザは、抑制された線で複雑な敷地、社会住宅、公共施設を扱う。静かに見える建築の中で、斜面、海岸、街路、手仕事の尺度、近代的抽象が精密に交渉されている。',
      en: 'Álvaro Siza works through restraint, site, social space, and precise abstraction.',
    },
    core_ideas: {
      zh: ['克制线条中的场地回应', '现代抽象与地方地形的协商', '社会住房和公共空间的日常尊严', '以白墙、阴影和路径组织经验'],
      ja: ['抑制された線による敷地への応答', '近代的抽象と地域地形の交渉', '社会住宅と公共空間の日常的な尊厳', '白い壁、影、経路で経験を組織する'],
      en: ['Restraint and site', 'Abstraction with local terrain', 'Dignity of social space', 'White walls, shadow, paths'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/54/Siza_Vieira_na_Exponor.JPG',
      author: 'Manuel de Sousa',
      license: 'CC BY-SA 3.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Siza_Vieira_na_Exponor.JPG',
      alt: { zh: '阿尔瓦罗·西扎肖像', ja: 'アルヴァロ・シザの肖像', en: 'Portrait of Álvaro Siza' },
    },
    sections: [
      {
        title: { zh: '慢速现代主义', ja: 'ゆっくりした近代主義', en: 'Slow modernism' },
        paragraphs: {
          zh: [
            '西扎的建筑常被误读为“白色、安静、简洁”。这些词并非错误，却不足以解释他的复杂性。真正重要的是，他的每一条线都像在与场地谈判：海岸的岩石、城市的转角、坡地的高差、旧街区的尺度、使用者的日常动作，都进入平面和剖面的推敲。',
            '这种现代主义不是迅速覆盖场地的国际风格，而是一种慢速的、不断校准的工作方式。西扎使用白墙、窄缝、转折、坡道和突出的檐口，但这些元素很少成为自我展示的符号。它们更像测量工具，帮助建筑在不稳定的城市和自然条件中找到准确位置。',
          ],
          ja: [
            'シザの建築は「白く、静かで、簡潔」と言われることが多い。間違いではないが、それだけでは複雑さを説明できない。重要なのは、彼の線が常に敷地と交渉していることだ。海岸の岩、都市の角、斜面の高低差、旧市街の尺度、利用者の日常動作が、平面と断面の検討に入ってくる。',
            'この近代主義は敷地を素早く覆う国際様式ではなく、ゆっくりと調整される作業である。白い壁、細い隙間、折れ曲がり、スロープ、突き出した庇は、自己主張の記号ではない。むしろ測量の道具のように、建築が不安定な都市や自然条件の中で正確な位置を見つける助けとなる。',
          ],
          en: ['Siza practices a slow, site-calibrated modernism.'],
        },
      },
      {
        title: { zh: '社会空间的尊严', ja: '社会空間の尊厳', en: 'Dignity of social space' },
        paragraphs: {
          zh: [
            '西扎的重要性也在于他并不只设计美术馆和住宅。他在葡萄牙革命后的社会住房项目中，面对预算、政治、居民参与和既有街区结构，把现代建筑的抽象能力用于日常生活的改善。布萨住宅和马拉盖拉住宅区都说明，社会住房不必降低空间尊严。',
            '在这些项目中，建筑师不是以英雄姿态从外部强加形式，而是在规则、地块、邻里和居民之间寻找可执行的秩序。西扎的克制因此有伦理含义：少做手势，多做关系；少制造奇观，多修复城市生活能够继续发生的条件。',
          ],
          ja: [
            'シザの重要性は、美術館や住宅だけを設計した点にはない。ポルトガル革命後の社会住宅では、予算、政治、住民参加、既存街区の構造に向き合い、近代建築の抽象力を日常生活の改善へ使った。ボウサ集合住宅やマラゲイラ地区は、社会住宅が空間の尊厳を失う必要がないことを示す。',
            'これらの計画では、建築家が外から英雄的に形を押しつけるのではない。規則、敷地、近隣、住民の間に実行可能な秩序を探す。シザの抑制には倫理的な意味がある。身振りを少なくし、関係を多くつくる。奇観を少なくし、都市生活が続く条件を修復する。',
          ],
          en: ['Siza uses restraint to give everyday and social space architectural dignity.'],
        },
      },
      {
        title: { zh: '场地中的抽象', ja: '敷地の中の抽象', en: 'Abstraction in place' },
        paragraphs: {
          zh: [
            '博阿诺瓦茶室、莱萨潮汐泳池和塞拉尔维斯当代艺术博物馆展示了西扎处理场地的不同方式。茶室嵌入岩石与海岸路径，泳池几乎让建筑退到地形之后，而塞拉尔维斯则用白色墙体、庭院和展厅序列在花园中建立平静的观看节奏。',
            '这些作品说明，西扎的抽象并不脱离地方。白墙不是空白，而是接收光线和阴影的表面；路径不是交通剩余，而是观看和迟疑的时间；转角不是几何游戏，而是身体重新定位的瞬间。西扎让现代建筑保持沉默，但这种沉默充满判断。',
          ],
          ja: [
            'ボア・ノヴァ茶室、レサの潮汐プール、セラルヴェス現代美術館は、シザが敷地を扱う異なる方法を示している。茶室は岩と海岸の道に入り込み、プールは建築を地形の後ろへ退かせ、美術館は白い壁、中庭、展示室の連なりによって庭園の中に静かな鑑賞のリズムをつくる。',
            'これらは、シザの抽象が場所から離れていないことを示す。白い壁は空白ではなく、光と影を受ける面である。経路は単なる移動ではなく、見ることとためらうことの時間である。角は幾何学遊びではなく、身体が位置を取り直す瞬間である。シザは近代建築を沈黙させるが、その沈黙には判断が満ちている。',
          ],
          en: ['Siza makes abstraction specific through path, light, and terrain.'],
        },
      },
    ],
    representative_works: [
      { slug: 'casa-de-cha-da-boa', note: { zh: '茶室嵌入海岸岩石和路径之中，用低矮屋顶、木构和转折回应地形。', ja: '茶室は海岸の岩と道に入り込み、低い屋根、木構造、折れ曲がる動線で地形に応答する。', en: 'A tea house embedded in coastal terrain.' } },
      { slug: 'tidal-pools-of-leca-de', note: { zh: '通过极少的墙体和平台组织天然岩池，使建筑几乎退入地形与潮汐。', ja: '最小限の壁とデッキで自然の岩場を整え、建築を地形と潮の中へ退かせる。', en: 'A minimal intervention in rock and tide.' } },
      { slug: 'serralves-museum-of-contemporary-art', note: { zh: '以白墙、庭院和展厅序列控制观看节奏，展示西扎在公共文化建筑中的克制力量。', ja: '白い壁、中庭、展示室の連なりで鑑賞のリズムを制御し、公共文化施設におけるシザの抑制を示す。', en: 'A restrained museum sequence in a garden.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: Álvaro Siza', url: 'https://www.pritzkerprize.com/laureates/1992' },
      { title: 'Wikidata: Álvaro Siza Vieira', url: 'https://www.wikidata.org/wiki/Q251365' },
      { title: 'Serralves Museum', url: 'https://www.serralves.pt/' },
    ],
  },
  'le-corbusier': {
    slug: 'le-corbusier',
    summary: {
      zh: '勒·柯布西耶把二十世纪建筑推向城市、住宅、身体尺度与标准化生产的争论中心。他既是现代主义的制度建造者，也是不断修正自我语言的实验者，从白色别墅到粗野混凝土，从私人住宅到新城规划，都留下难以绕开的参照。',
      ja: 'ル・コルビュジエは二十世紀建築を都市、住宅、身体尺度、標準化の議論の中心へ押し出した。白い住宅から粗いコンクリート、個人住宅から新都市計画まで、近代建築の基準そのものを問い直した建築家である。',
      en: 'Le Corbusier made modern architecture a debate about cities, housing, proportion, standardization, and concrete civic form.',
    },
    core_ideas: {
      zh: ['新建筑五点与自由平面', '住宅作为现代生活机器', '模度、身体尺度与比例秩序', '从白色现代主义转向粗粝的混凝土公共性'],
      ja: ['近代建築の五原則と自由な平面', '住居を近代生活の装置として考える', 'モデュロール、身体尺度、比例秩序', '白い近代主義から粗いコンクリートの公共性へ'],
      en: ['Five points', 'Housing and modern life', 'Modulor proportion', 'Concrete civic form'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Le_Corbusier_%281964%29.jpg',
      author: 'Joop van Bilsen / Anefo',
      license: 'CC0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Le_Corbusier_(1964).jpg',
      alt: { zh: '勒·柯布西耶肖像', ja: 'ル・コルビュジエの肖像', en: 'Portrait of Le Corbusier' },
    },
    sections: [
      {
        title: { zh: '把现代生活写成建筑语法', ja: '近代生活を建築文法へ', en: 'A grammar for modern life' },
        paragraphs: {
          zh: [
            '勒·柯布西耶的重要性首先在于，他把现代建筑从个别形式推进为一套可被讨论、复制和批判的语法。底层架空、自由平面、自由立面、横向长窗和屋顶花园并不只是造型清单，而是一次重新分配结构、围护、光线与生活方式的尝试。',
            '萨伏伊别墅最清楚地展示了这种语法：坡道把人的移动变成连续观看，柱网释放墙体，屋顶把自然重新带回住宅。它看似洁白、轻盈、理性，背后却是对汽车时代、卫生观念、休闲方式和家庭秩序的系统想象。',
          ],
          ja: [
            'ル・コルビュジエの重要性は、近代建築を個別の形ではなく、議論され、複製され、批判される文法へ押し広げた点にある。ピロティ、自由な平面、自由な立面、水平連続窓、屋上庭園は造形の一覧ではなく、構造、外皮、光、生活の再配分だった。',
            'サヴォア邸はその文法を明瞭に示す。スロープは移動を連続した視覚経験に変え、柱の秩序は壁を解放し、屋上は自然を住宅へ戻す。白く軽い理性の背後には、自動車時代、衛生観、余暇、家族生活への体系的な想像がある。',
          ],
          en: ['Le Corbusier turned modern architecture into a grammar of structure, movement, light, and lifestyle.'],
        },
      },
      {
        title: { zh: '从住宅机器到公共厚度', ja: '住居機械から公共の厚みへ', en: 'From house-machine to public mass' },
        paragraphs: {
          zh: [
            '柯布的语言并没有停留在白色别墅。战后，他在马赛公寓、朗香教堂和昌迪加尔中转向更厚重的体量、粗粝混凝土和强烈的光影。所谓“粗野”并非简单粗糙，而是把结构、表面、气候和公共制度压缩到可被身体感知的空间密度中。',
            '马赛公寓把住宅、街道、商业和屋顶公共生活垂直叠合，试图用单体建筑回应城市住房问题；朗香教堂则用弯曲厚墙和高处光缝改变现代主义的理性形象；昌迪加尔把纪念性、行政秩序和热带气候放到同一组巨大的混凝土构件里。',
          ],
          ja: [
            '彼の言語は白い住宅にとどまらなかった。戦後のユニテ・ダビタシオン、ロンシャン礼拝堂、チャンディーガルでは、より厚い量塊、粗いコンクリート、強い光と影へ向かった。「粗野」とは単なる荒さではなく、構造、表面、気候、公共制度を身体で感じられる密度へ圧縮することだった。',
            'マルセイユの集合住宅は住居、街路、商業、屋上の公共生活を垂直に重ねる。ロンシャンは曲面の厚い壁と高い光で近代主義の理性的な像を変えた。チャンディーガルでは記念性、行政秩序、熱帯気候が巨大なコンクリート部材に結びつく。',
          ],
          en: ['His postwar work thickened modernism into concrete, climate, monumentality, and collective life.'],
        },
      },
      {
        title: { zh: '影响与争议并存', ja: '影響と論争', en: 'Influence and argument' },
        paragraphs: {
          zh: [
            '今天阅读柯布，不能只把他当作现代主义英雄。他关于城市更新、高层住宅、标准化和交通秩序的设想影响巨大，也引发了对尺度、社会控制和历史街区破坏的长期批评。正是这种矛盾，使他的作品仍然具有现实性。',
            '在建筑史中，柯布像一个问题发生器：他提出的答案未必都可接受，但他改变了问题的尺寸。住宅能否被工业化？城市能否重新组织光、绿地和交通？纪念性是否仍可属于现代国家？这些问题穿过了二十世纪，也继续影响今天的建筑讨论。',
          ],
          ja: [
            '今日コルビュジエを読む時、単に近代主義の英雄として扱うことはできない。都市更新、高層住宅、標準化、交通秩序への構想は大きな影響を持つ一方、尺度、社会的管理、歴史的街区の破壊に関する批判も呼んだ。その矛盾こそ彼を現在的にしている。',
            '建築史の中で彼は問題を生み出す装置のようである。答えのすべてが受け入れられるわけではないが、問いの大きさを変えた。住宅は工業化できるのか。都市は光、緑、交通で再編できるのか。記念性は近代国家に属しうるのか。これらの問いは今も続いている。',
          ],
          en: ['Le Corbusier remains essential because his proposals are both influential and deeply contested.'],
        },
      },
    ],
    representative_works: [
      { slug: 'villa-savoye', note: { zh: '五点原则的经典演示：坡道、柱网、屋顶花园共同组织现代生活的连续场景。', ja: '五原則を示す代表作。スロープ、柱の秩序、屋上庭園が近代生活の連続した場面をつくる。', en: 'A canonical demonstration of the five points.' } },
      { slug: 'unite-habitation', note: { zh: '把住宅、内部街道和屋顶公共设施叠合为垂直社区，是战后集体住宅的重要原型。', ja: '住居、内部街路、屋上施設を重ねた垂直の共同体で、戦後集合住宅の重要な原型。', en: 'A vertical community and postwar housing prototype.' } },
      { slug: 'chapel-of-notre-dame-du-haut', note: { zh: '厚墙、曲面屋顶和高侧光让现代主义转向更具身体性与精神性的空间。', ja: '厚い壁、曲面屋根、高い採光により、近代主義が身体的で精神的な空間へ向かう。', en: 'A bodily and spiritual turn in modernism.' } },
    ],
    sources: [
      { title: 'Fondation Le Corbusier', url: 'https://www.fondationlecorbusier.fr/' },
      { title: 'UNESCO: The Architectural Work of Le Corbusier', url: 'https://whc.unesco.org/en/list/1321/' },
      { title: 'Wikidata: Le Corbusier', url: 'https://www.wikidata.org/wiki/Q4724' },
    ],
  },
  'mies-van-der-rohe': {
    slug: 'mies-van-der-rohe',
    summary: {
      zh: '路德维希·密斯·凡·德·罗以极端克制的结构、比例和材料精度，建立了现代建筑最有影响力的空间语言之一。他的“少即是多”并不是少做，而是把柱、梁、玻璃、石材与家具压缩到近乎不可再减少的秩序。',
      ja: 'ルートヴィヒ・ミース・ファン・デル・ローエは、構造、比例、素材の精度を極限まで抑制し、近代建築でもっとも影響力のある空間言語の一つをつくった。「より少ないことは、より豊かである」は、何もしないことではなく、要素をぎりぎりまで秩序化する態度である。',
      en: 'Mies van der Rohe built a modern language of structural clarity, proportion, glass, steel, stone, and disciplined reduction.',
    },
    core_ideas: {
      zh: ['少即是多的结构秩序', '通用空间与开放平面', '玻璃、钢、石材的精确连接', '以比例和细部控制纪念性'],
      ja: ['「少なさ」による構造秩序', 'ユニバーサル・スペースと開放平面', 'ガラス、鋼、石の精密な接合', '比例と細部で記念性を制御する'],
      en: ['Less is more', 'Universal space', 'Precise material joints', 'Monumentality through proportion'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Hugo_Erfurth_-_Portrait_Ludwig_Mies_van_der_Rohe%2C_1934.jpg',
      author: 'Hugo Erfurth',
      license: 'Public domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Hugo_Erfurth_-_Portrait_Ludwig_Mies_van_der_Rohe,_1934.jpg',
      alt: { zh: '路德维希·密斯·凡·德·罗肖像', ja: 'ルートヴィヒ・ミース・ファン・デル・ローエの肖像', en: 'Portrait of Ludwig Mies van der Rohe' },
    },
    sections: [
      {
        title: { zh: '克制不是空白', ja: '抑制は空白ではない', en: 'Reduction is not emptiness' },
        paragraphs: {
          zh: [
            '密斯的建筑常被概括为玻璃盒子，但真正关键的是他对结构和空间秩序的执着。巴塞罗那馆没有传统意义上的房间，墙体像石材屏风一样滑动，屋顶被细柱托起，水面、雕塑、反射和行走共同组成开放而严密的场域。',
            '这种克制并不等于贫乏。密斯减少的是叙事、装饰和不必要的形体，却把重量放在比例、材料接缝、柱距、家具位置和视线边界上。空间越少，细部越承担意义。',
          ],
          ja: [
            'ミースの建築はガラスの箱と要約されることが多いが、重要なのは構造と空間秩序への執着である。バルセロナ・パヴィリオンには伝統的な部屋がなく、石の壁がスクリーンのように滑り、薄い柱が屋根を支え、水面、彫刻、反射、歩行が開放的で厳密な場をつくる。',
            'この抑制は貧しさではない。彼が減らしたのは物語、装飾、余分な形であり、比例、材料の接合、柱間、家具、視線の境界に意味を集中させた。空間が少ないほど、細部が重くなる。',
          ],
          en: ['Mies reduced narrative and ornament so that proportion, joint, material, and structure could carry meaning.'],
        },
      },
      {
        title: { zh: '通用空间的理想', ja: 'ユニバーサル・スペース', en: 'Universal space' },
        paragraphs: {
          zh: [
            '在美国时期，密斯把开放平面的思想推进到住宅、校园和办公塔楼。范斯沃斯住宅让居住被置于几乎完全透明的钢与玻璃盒子中，风景成为室内经验的一部分；西格拉姆大厦则把企业办公楼提升为城市纪念物。',
            '所谓通用空间，是一种尽量减少内部固定限制、让结构退到清晰网格中的空间理想。它带来灵活性和视觉纯度，也带来关于居住隐私、环境控制和城市重复性的争议。密斯的力量恰恰在于，他把这些矛盾以极高完成度暴露出来。',
          ],
          ja: [
            'アメリカ時代のミースは、開放平面を住宅、キャンパス、オフィスタワーへ展開した。ファンズワース邸では居住が透明な鋼とガラスの箱に置かれ、風景が室内経験の一部になる。シーグラム・ビルは企業オフィスを都市の記念碑へ高めた。',
            'ユニバーサル・スペースとは、内部の固定的な制約を減らし、構造を明快なグリッドへ退かせる理想である。柔軟性と視覚的純度をもたらす一方、住居のプライバシー、環境制御、都市の反復性への批判も生む。ミースはその矛盾を高い完成度で露出させた。',
          ],
          en: ['Universal space promised flexibility and clarity while exposing tensions around privacy, climate, and repetition.'],
        },
      },
      {
        title: { zh: '城市中的沉默纪念性', ja: '都市の静かな記念性', en: 'Silent monumentality' },
        paragraphs: {
          zh: [
            '密斯的高层建筑并不依靠复杂轮廓取胜，而是通过后退广场、立面节奏、青铜色构件和清晰比例建立城市中的距离感。西格拉姆大厦的广场不是剩余空间，而是让建筑从街道噪声中抽身、成为被观看对象的舞台。',
            '柏林新国家美术馆则把这种纪念性压缩到一个巨大屋盖和透明大厅中。几乎没有墙的主层并不是功能空洞，而是公共文化空间的开放宣言。密斯让现代建筑学会安静，但这种安静有极强的制度感。',
          ],
          ja: [
            'ミースの高層建築は複雑な輪郭ではなく、セットバックした広場、立面のリズム、ブロンズ色の部材、明快な比例によって都市の距離をつくる。シーグラム・ビルの広場は余白ではなく、建物を街路の騒音から離し、見る対象へ変える舞台である。',
            'ベルリン新国立美術館では、この記念性が巨大な屋根と透明なホールへ圧縮される。壁の少ない主階は機能の空白ではなく、公共文化空間の開放性を示す。ミースは近代建築に静けさを与えたが、その静けさには強い制度性がある。',
          ],
          en: ['Mies found monumentality through setback, proportion, structure, and the quiet authority of detail.'],
        },
      },
    ],
    representative_works: [
      { slug: 'barcelona-pavilion', note: { zh: '以石材墙片、水面和细柱构成开放场域，是现代空间流动性的经典案例。', ja: '石の壁、水面、細い柱で開放的な場をつくる、近代空間の流動性を示す代表例。', en: 'A classic of flowing modern space.' } },
      { slug: 'farnsworth-house', note: { zh: '透明盒子把居住、风景和结构极限化，也暴露了现代住宅理想的矛盾。', ja: '透明な箱が居住、風景、構造を極限化し、近代住宅の理想の矛盾も示す。', en: 'A radical glass house and its contradictions.' } },
      { slug: 'seagram-building', note: { zh: '通过后退广场、立面节奏和材料控制，把办公楼塑造成现代城市纪念物。', ja: '後退広場、立面リズム、素材の制御により、オフィスビルを近代都市の記念碑にした。', en: 'An office tower as urban monument.' } },
    ],
    sources: [
      { title: 'MoMA: Ludwig Mies van der Rohe', url: 'https://www.moma.org/artists/7166' },
      { title: 'Fundació Mies van der Rohe: The Pavilion', url: 'https://miesbcn.com/the-pavilion/' },
      { title: 'Wikidata: Ludwig Mies van der Rohe', url: 'https://www.wikidata.org/wiki/Q157802' },
    ],
  },
  'frank-lloyd-wright': {
    slug: 'frank-lloyd-wright',
    summary: {
      zh: '弗兰克·劳埃德·赖特以“有机建筑”重新定义住宅、景观与美国现代性。他的作品不把建筑看作孤立物体，而是把结构、室内、家具、火炉、屋檐、路径和地形组织成连续生活世界。',
      ja: 'フランク・ロイド・ライトは「有機的建築」によって、住宅、風景、アメリカの近代性を再定義した。建築を孤立した物体ではなく、構造、室内、家具、炉、庇、経路、地形が連続する生活世界として考えた。',
      en: 'Frank Lloyd Wright redefined house, landscape, and American modernity through organic architecture.',
    },
    core_ideas: {
      zh: ['有机建筑与地形融合', '住宅作为完整生活环境', '水平屋檐、火炉与开放起居空间', '从草原住宅到公共文化建筑的美国现代性'],
      ja: ['有機的建築と地形の融合', '住宅を総合的な生活環境として考える', '水平の庇、炉、開放的な居間', 'プレーリー住宅から公共文化建築へのアメリカ近代性'],
      en: ['Organic architecture', 'Total domestic environment', 'Hearth and open living', 'American modernity'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Frank_Lloyd_Wright_LC-USZ62-36384.jpg',
      author: 'Unknown author / Library of Congress',
      license: 'Public domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Frank_Lloyd_Wright_LC-USZ62-36384.jpg',
      alt: { zh: '弗兰克·劳埃德·赖特肖像', ja: 'フランク・ロイド・ライトの肖像', en: 'Portrait of Frank Lloyd Wright' },
    },
    sections: [
      {
        title: { zh: '住宅作为世界观', ja: '世界観としての住宅', en: 'The house as worldview' },
        paragraphs: {
          zh: [
            '赖特最持久的贡献来自住宅。他反对把住宅分割成封闭房间的传统，把起居、用餐、火炉和外部景观组织为连续空间。草原住宅的低矮屋檐、水平线条和中央壁炉，使建筑像从地面展开，而不是被放置在地面上。',
            '罗比住宅是这种观念的高峰之一。长挑檐保护窗带，水平砖缝强化延展感，室内围绕壁炉展开。它既是家庭生活的机器，也是对美国中西部平坦地景的空间翻译。',
          ],
          ja: [
            'ライトのもっとも持続的な貢献は住宅にある。彼は住宅を閉じた部屋の集合として扱う伝統に反対し、居間、食事、炉、外部景観を連続する空間として組織した。プレーリー住宅の低い庇、水平線、中央の炉は、建築を地面に置くのではなく地面から広がるものにした。',
            'ロビー邸はその到達点の一つである。長い庇が窓帯を守り、水平なレンガ目地が伸びやかさを強め、内部は炉を中心に展開する。家庭生活の装置であると同時に、中西部の平坦な風景の空間的翻訳でもある。',
          ],
          en: ['Wright made the house a complete spatial worldview of hearth, horizon, movement, and landscape.'],
        },
      },
      {
        title: { zh: '与自然相互嵌入', ja: '自然との相互嵌入', en: 'Interlocking with nature' },
        paragraphs: {
          zh: [
            '流水别墅展示了赖特最著名的自然观：建筑不是观看瀑布的观景台，而是横跨溪流、嵌入岩石、让水声进入日常生活的居住装置。混凝土挑板、石墙和低矮室内共同制造了被地形包围的紧张感。',
            '这种有机并不等于模仿自然形态。赖特常用强烈几何、复杂结构和定制家具来建立秩序，但这些秩序必须与地形、材料、气候和人的身体动作相互校准。自然不是背景，而是建筑的共同作者。',
          ],
          ja: [
            '落水荘はライトの自然観をもっとも有名に示す。建築は滝を見る展望台ではなく、溪流をまたぎ、岩に入り込み、水音を日常へ引き込む住居装置である。コンクリートの片持ち床、石壁、低い室内が、地形に包まれる緊張をつくる。',
            'この有機性は自然形態の模倣ではない。ライトは強い幾何、複雑な構造、特注家具で秩序をつくるが、その秩序は地形、素材、気候、身体動作と調整されなければならない。自然は背景ではなく、建築の共同作者である。',
          ],
          en: ['For Wright, nature was not scenery but a co-author of structure, sound, material, and daily movement.'],
        },
      },
      {
        title: { zh: '晚期的公共螺旋', ja: '晩年の公共的な螺旋', en: 'Late public spirals' },
        paragraphs: {
          zh: [
            '赖特晚期并未停留在住宅神话中。古根海姆美术馆用连续坡道挑战了传统展厅的中性白盒，把观看变成环绕中庭的缓慢下降。它既是美术馆，也是一个关于现代公众如何移动、观看和聚集的建筑实验。',
            '这种强烈作者性也带来争议：展墙倾斜、动线支配展览、建筑形象压过艺术品。但正因为如此，赖特提醒后来的建筑师，公共建筑不只是容器，它会主动塑造制度、观看方式和城市记忆。',
          ],
          ja: [
            '晩年のライトは住宅の神話にとどまらなかった。グッゲンハイム美術館は連続するスロープで中性的な白い展示室を問い直し、鑑賞を中庭の周囲をゆっくり下る経験に変えた。美術館であると同時に、近代の公共がどう移動し、見るかを問う実験である。',
            'その強い作者性は批判も招いた。傾いた展示壁、動線による支配、建築イメージの強さである。しかしだからこそ、公共建築は単なる容器ではなく、制度、鑑賞方法、都市の記憶を能動的に形づくることを示した。',
          ],
          en: ['Wright’s late public work turned circulation itself into architectural form.'],
        },
      },
    ],
    representative_works: [
      { slug: 'robie-house', note: { zh: '草原住宅的代表：长挑檐、水平线和壁炉中心组织出现代家庭空间。', ja: 'プレーリー住宅の代表。長い庇、水平線、炉を中心に近代的な家庭空間をつくる。', en: 'A Prairie house organized by horizon and hearth.' } },
      { slug: 'fallingwater', note: { zh: '建筑跨越溪流并嵌入岩石，让居住与水声、地形和悬挑结构不可分割。', ja: '溪流をまたぎ岩に入り込み、住居、水音、地形、片持ち構造を不可分にする。', en: 'A house inseparable from stream, rock, and cantilever.' } },
      { slug: 'guggenheim', note: { zh: '以连续螺旋坡道重写美术馆动线，把观看变成公共空间事件。', ja: '連続する螺旋スロープで美術館の動線を書き換え、鑑賞を公共空間の出来事にした。', en: 'A museum remade as a continuous spiral promenade.' } },
    ],
    sources: [
      { title: 'Frank Lloyd Wright Foundation', url: 'https://franklloydwright.org/' },
      { title: 'Fallingwater', url: 'https://fallingwater.org/' },
      { title: 'Wikidata: Frank Lloyd Wright', url: 'https://www.wikidata.org/wiki/Q5604' },
    ],
  },
  'louis-kahn': {
    slug: 'louis-kahn',
    summary: {
      zh: '路易斯·康以厚重结构、几何秩序、自然光和“服务空间/被服务空间”的区分，赋予现代建筑一种近乎古典的庄严。他的建筑不是追求轻盈透明，而是在墙、拱、空洞和光线之间重新建立制度与精神的重量。',
      ja: 'ルイス・カーンは、重い構造、幾何学的秩序、自然光、「サービスする空間／サービスされる空間」の区分によって、近代建築に古典的ともいえる荘厳さを与えた。透明な軽さではなく、壁、ヴォイド、光の間に制度と精神の重さをつくった。',
      en: 'Louis Kahn gave modern architecture a monumental gravity through structure, geometry, natural light, and served/servant space.',
    },
    core_ideas: {
      zh: ['服务空间与被服务空间', '自然光作为建筑材料', '几何秩序与纪念性', '现代制度中的古典重量'],
      ja: ['サービスする空間とされる空間', '建築材料としての自然光', '幾何学秩序と記念性', '近代制度の中の古典的な重さ'],
      en: ['Served and servant spaces', 'Light as material', 'Geometric monumentality', 'Modern institutions with ancient gravity'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/LouisKahn.jpg',
      author: 'Francalb89',
      license: 'CC BY-SA 4.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:LouisKahn.jpg',
      alt: { zh: '路易斯·康肖像', ja: 'ルイス・カーンの肖像', en: 'Portrait of Louis Kahn' },
    },
    sections: [
      {
        title: { zh: '重新发现墙与房间', ja: '壁と部屋の再発見', en: 'Rediscovering wall and room' },
        paragraphs: {
          zh: [
            '康的现代性与玻璃盒子不同。他关心房间如何拥有重量、光线如何让结构显形、服务空间如何从平面中被明确组织出来。耶鲁大学美术馆的四面体楼板、楼梯和设备整合，已经显示出他把结构与使用秩序合并的倾向。',
            '后来康反复强调“房间”的原初意义。对他来说，房间并非功能分隔，而是光、结构、人的聚集和制度目的相遇的场所。墙不是消失的东西，而是制造厚度、边界和沉思的工具。',
          ],
          ja: [
            'カーンの近代性はガラスの箱とは異なる。彼は部屋がどのように重さを持つか、光がどのように構造を現すか、設備や動線の空間がどのように平面へ組み込まれるかを考えた。イェール大学美術館の立体トラス床、階段、設備の統合は、構造と使用秩序を結びつける姿勢を示す。',
            'その後カーンは「部屋」の根源的な意味を繰り返し語った。部屋は単なる機能分割ではなく、光、構造、人の集まり、制度の目的が出会う場所である。壁は消えるものではなく、厚み、境界、沈思をつくる道具であった。',
          ],
          en: ['Kahn rediscovered the room, wall, and structure as sources of institutional meaning.'],
        },
      },
      {
        title: { zh: '光的制度空间', ja: '光の制度空間', en: 'Institutional light' },
        paragraphs: {
          zh: [
            '索尔克研究所以两排实验室夹住朝向太平洋的空旷庭院，中间一条水渠把天空、海平线和石材地面连成沉默轴线。科学研究在这里不被包装成技术机器，而被提升为近乎修道院式的公共精神场景。',
            '金贝尔美术馆则用连续拱形顶和顶部反射器控制自然光。光不是照明设备的结果，而是决定展厅尺度、材料气质和观看节奏的核心材料。康让现代美术馆摆脱纯白盒子，恢复了顶光、房间和触感。',
          ],
          ja: [
            'ソーク研究所では、二列の研究棟が太平洋へ開く中庭を挟み、中央の水路が空、水平線、石の床を静かな軸へ結ぶ。科学研究は技術的な機械としてではなく、修道院にも似た公共精神の場として表れる。',
            'キンベル美術館では、連続するヴォールト屋根と反射板が自然光を制御する。光は照明設備の結果ではなく、展示室の尺度、素材感、鑑賞のリズムを決める中心的な材料である。カーンは近代美術館を白い箱から解放し、トップライト、部屋、触感を取り戻した。',
          ],
          en: ['Kahn used natural light to give laboratories and museums a civic and contemplative order.'],
        },
      },
      {
        title: { zh: '几何与国家纪念性', ja: '幾何学と国家の記念性', en: 'Geometry and state' },
        paragraphs: {
          zh: [
            '达卡国民议会大厦把康的几何秩序推向巨大城市尺度。圆、三角、矩形和深切开口不仅是形式符号，也回应热带气候、阴影、通风和国家政治的可见性。建筑像古代遗迹，又服务一个现代国家机构。',
            '康的晚期作品证明，现代建筑仍然可以承担纪念性，但这种纪念性不必依靠历史复制。它来自结构的诚实、光的层次、材料的重量和公共制度被空间化的方式。',
          ],
          ja: [
            'ダッカの国会議事堂は、カーンの幾何学秩序を巨大な都市スケールへ押し広げた。円、三角形、矩形、深い開口は単なる記号ではなく、熱帯気候、影、通風、国家政治の可視性に応答する。建築は古代遺跡のようでありながら、近代国家の機関である。',
            '晩年の作品は、近代建築がなお記念性を担えることを示す。ただしそれは歴史様式の複製ではない。構造の誠実さ、光の層、素材の重さ、公共制度が空間化される方法から生まれる。',
          ],
          en: ['Kahn made modern monumentality from geometry, climate, shadow, and public institutions.'],
        },
      },
    ],
    representative_works: [
      { slug: 'salk-institute', note: { zh: '两列研究楼与海向庭院构成沉静轴线，把科学机构转化为精神性公共空间。', ja: '二列の研究棟と海へ向かう中庭が静かな軸をつくり、科学機関を精神的な公共空間へ変える。', en: 'A scientific campus ordered as contemplative civic space.' } },
      { slug: 'kimbell-art-museum', note: { zh: '拱形屋顶与反射自然光塑造温柔展厅，是光作为材料的典型案例。', ja: 'ヴォールト屋根と反射された自然光が柔らかな展示室をつくる、光を材料とする代表例。', en: 'A museum shaped by vaulted light.' } },
      { slug: 'national-assembly-dhaka', note: { zh: '以巨大几何开口、深阴影和水面组织国家机构的纪念性与气候回应。', ja: '巨大な幾何学的開口、深い影、水面で国家機関の記念性と気候への応答を組織する。', en: 'A monumental civic complex of geometry and climate.' } },
    ],
    sources: [
      { title: 'Salk Institute: Architecture', url: 'https://www.salk.edu/about/history-of-salk/architecture/' },
      { title: 'Kimbell Art Museum: Louis I. Kahn Building', url: 'https://kimbellart.org/art-architecture/architecture/kahn-building' },
      { title: 'Wikidata: Louis Kahn', url: 'https://www.wikidata.org/wiki/Q310981' },
    ],
  },
  'tadao-ando': {
    slug: 'tadao-ando',
    summary: {
      zh: '安藤忠雄以清水混凝土、几何体、自然光和精确动线，把现代建筑转化为高度可感的身体经验。他的建筑常常很少材料，却并不空洞：墙、缝、坡道、水面和庭院共同组织一种缓慢、克制而强烈的进入仪式。',
      ja: '安藤忠雄は打放しコンクリート、幾何学、自然光、精密な動線によって、近代建築を強い身体経験へ変えた。素材は少ないが空虚ではない。壁、隙間、スロープ、水面、中庭が、ゆっくりと抑制された入場の儀式をつくる。',
      en: 'Tadao Ando turns concrete, geometry, light, water, and movement into a disciplined bodily experience.',
    },
    core_ideas: {
      zh: ['清水混凝土与光的对照', '几何体中的身体动线', '以墙组织城市中的静谧', '水、庭院与自然作为精神媒介'],
      ja: ['打放しコンクリートと光の対比', '幾何学の中の身体動線', '壁によって都市の静けさをつくる', '水、庭、自然を精神的な媒介にする'],
      en: ['Concrete and light', 'Embodied routes', 'Walls and urban quiet', 'Water and nature as spiritual media'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Tadao_Ando_2004_%284x5_cropped%29.jpg',
      author: 'Christopher Schriner',
      license: 'CC BY-SA 2.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Tadao_Ando_2004_(4x5_cropped).jpg',
      alt: { zh: '安藤忠雄肖像', ja: '安藤忠雄の肖像', en: 'Portrait of Tadao Ando' },
    },
    sections: [
      {
        title: { zh: '墙中的城市避难所', ja: '壁の中の都市的避難所', en: 'Urban refuge inside walls' },
        paragraphs: {
          zh: [
            '安藤早期的住吉长屋几乎像一份宣言：在拥挤城市中，用一块狭窄基地、一道混凝土墙和一个露天中庭，把日常居住重新组织成与风雨、光线和身体移动有关的经验。房子牺牲了便利，却获得强烈的内向秩序。',
            '这种做法不是简单的极简主义。安藤的墙既隔绝城市噪声，也迫使人重新感知时间、天气和距离。穿过院子去另一个房间，意味着居住者必须与自然发生关系；建筑在不舒适处恢复了感知。',
          ],
          ja: [
            '初期の住吉の長屋は宣言のようである。混み合う都市の狭い敷地に、コンクリートの壁と露天の中庭を置き、日常の住まいを雨、光、身体の移動と結びつく経験へ組み替えた。利便性は犠牲になるが、強い内向的秩序を得る。',
            'これは単なるミニマリズムではない。安藤の壁は都市の騒音を遮ると同時に、時間、天候、距離を感じ直させる。別の部屋へ行くために庭を通ることは、自然と関係を結ぶことである。不便さの中で感覚が回復される。',
          ],
          en: ['Ando’s walls make urban refuge by forcing renewed awareness of weather, distance, and light.'],
        },
      },
      {
        title: { zh: '光的几何仪式', ja: '光の幾何学的儀式', en: 'Geometric rituals of light' },
        paragraphs: {
          zh: [
            '光之教堂把安藤的核心语言压缩到极点：一个混凝土盒子、一条切入墙面的十字光缝、倾斜进入的路径。光不再只是照亮空间，而成为结构、图像和宗教经验本身。',
            '安藤常用简单几何制造复杂心理过程。人并不是直接抵达中心，而是被墙体引导、延迟、转折，再突然面对水面、天空或光。空间的戏剧性来自克制后的释放。',
          ],
          ja: [
            '光の教会は安藤の言語を極限まで圧縮する。コンクリートの箱、壁を切る十字の光、斜めに入る経路。光は空間を照らすだけでなく、構造、イメージ、宗教経験そのものになる。',
            '安藤は単純な幾何学で複雑な心理過程をつくる。人は中心へ直接到達せず、壁に導かれ、遅らされ、折れ曲がり、突然水面、空、光に向き合う。空間の劇性は、抑制された後の解放から生まれる。',
          ],
          en: ['Ando makes light a spatial event through concrete geometry and delayed movement.'],
        },
      },
      {
        title: { zh: '直岛与地景中的美术馆', ja: '直島と風景の中の美術館', en: 'Museums in landscape' },
        paragraphs: {
          zh: [
            '在直岛，安藤把美术馆、酒店、地形和海景组织成一系列半地下或低姿态的路径。地中美术馆尤其清楚：建筑尽量退入地面，让庭院、天光和路线承担观看节奏，艺术作品与自然光共同改变时间感。',
            '这类作品说明，安藤的混凝土并不只是冷峻表面，而是控制进入自然的装置。水面反射天空，墙体裁切视线，坡道延缓抵达。建筑不是覆盖风景，而是把风景变成可被身体阅读的序列。',
          ],
          ja: [
            '直島では、美術館、ホテル、地形、海景が半地下または低い姿勢の経路として組織される。地中美術館では建築が地中へ退き、中庭、天光、ルートが鑑賞のリズムを担い、作品と自然光が時間感覚を変える。',
            'これらの作品は、安藤のコンクリートが冷たい表面だけではなく、自然への入り方を制御する装置であることを示す。水面は空を映し、壁は視線を切り取り、スロープは到達を遅らせる。建築は風景を覆うのではなく、身体で読める連続へ変える。',
          ],
          en: ['Ando’s museums make landscape a slow sequence of light, wall, route, and art.'],
        },
      },
    ],
    representative_works: [
      { slug: 'row-house-sumiyoshi', note: { zh: '狭小住宅以中庭切开生活动线，让城市居住重新面对光、雨和身体距离。', ja: '狭小住宅を中庭で切り、都市の住まいを光、雨、身体的距離へ向き合わせる。', en: 'A narrow urban house cut open by an exposed court.' } },
      { slug: 'church-of-light', note: { zh: '混凝土墙上的十字光缝把最少元素转化为强烈精神空间。', ja: 'コンクリート壁の十字の光が、最小限の要素を強い精神的空間へ変える。', en: 'A concrete box transformed by a cross of light.' } },
      { slug: 'naoshima-chichu-art-museum', note: { zh: '半埋入地景的美术馆用天光、庭院和路径控制观看节奏。', ja: '地中に沈む美術館が天光、中庭、経路によって鑑賞のリズムを制御する。', en: 'A museum embedded in landscape and natural light.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: Tadao Ando', url: 'https://www.pritzkerprize.com/laureates/1995' },
      { title: 'Benesse Art Site Naoshima: Chichu Art Museum', url: 'https://benesse-artsite.jp/en/art/chichu.html' },
      { title: 'Wikidata: Tadao Ando', url: 'https://www.wikidata.org/wiki/Q293725' },
    ],
  },
  'zaha-hadid': {
    slug: 'zaha-hadid',
    summary: {
      zh: '扎哈·哈迪德把建筑从稳定盒子推向连续地形、流体结构和城市速度。她的作品并不只是曲线造型，而是把动线、结构、地面和屋顶压缩成一种具有方向感的空间场。',
      ja: 'ザハ・ハディドは、建築を安定した箱から連続する地形、流動的な構造、都市の速度へ押し出した。曲線の造形だけでなく、動線、構造、地面、屋根を方向性をもつ空間場として統合した。',
      en: 'Zaha Hadid transformed buildings into continuous fields of movement, structure, and urban energy.',
    },
    core_ideas: {
      zh: ['以流动地形组织建筑', '用结构表达速度与方向', '把城市动线转化为空间形态', '从绘画式构想到数字建造'],
      ja: ['流動する地形として建築を組織する', '構造で速度と方向を表す', '都市の動線を空間形態へ変える', '絵画的構想からデジタル建設へ'],
      en: ['Fluid fields', 'Movement as form', 'Urban circulation', 'Digital construction'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Zaha_Hadid_in_Heydar_Aliyev_Cultural_center_in_Baku_nov_2013.jpg',
      author: 'Dmitry Ternovoy',
      license: 'FAL',
      source_url: 'https://commons.wikimedia.org/wiki/File:Zaha_Hadid_in_Heydar_Aliyev_Cultural_center_in_Baku_nov_2013.jpg',
      alt: { zh: '扎哈·哈迪生肖像', ja: 'ザハ・ハディドの肖像', en: 'Portrait of Zaha Hadid' },
    },
    sections: [
      {
        title: { zh: '从纸上先锋到可建造的城市地形', ja: '紙上の前衛から建設可能な都市地形へ', en: 'From paper space to built terrain' },
        paragraphs: {
          zh: [
            '哈迪德早期以绘画、轴测图和解构式构图闻名。那些尖锐的视角和破碎的平面并不是单纯的视觉实验，而是在寻找一种摆脱正交房间的建筑语言：地面可以折叠，墙体可以成为坡道，屋顶可以延伸为城市中的连续表面。',
            '随着数字建模、结构计算和大型幕墙技术成熟，她的空间构想逐渐转化为可建造的公共建筑。广州大剧院、海达尔·阿利耶夫中心和北京大兴机场都显示出同一种野心：建筑不是静态对象，而是组织人流、视线和城市事件的连续场。',
          ],
          ja: [
            'ハディドは初期から絵画、アクソノメトリック、脱構築的な構図で知られた。鋭い視点と断片化した平面は視覚実験にとどまらず、直交する部屋から離れる建築言語の探求だった。地面は折れ、壁はスロープになり、屋根は都市へ伸びる連続面となる。',
            'デジタルモデリング、構造解析、大規模な外装技術が成熟すると、その構想は公共建築として実現し始めた。広州大劇院、ヘイダル・アリエフ・センター、北京大興国際空港はいずれも、建築を静止した物体ではなく、人流、視線、都市的出来事を組織する場として扱う。',
          ],
          en: ['Hadid moved from radical drawings to buildings that organize movement as continuous terrain.'],
        },
      },
      {
        title: { zh: '曲线不是装饰，而是动线', ja: '曲線は装飾ではなく動線である', en: 'Curves as circulation' },
        paragraphs: {
          zh: [
            '哈迪德作品中最容易被误解的是曲线。曲面、折板和流线形外壳并不只是品牌化外观，它们通常承担着导向、汇聚、分流和延迟抵达的功能。人在建筑中的移动，被转译成地面高差、天花曲率、柱网密度和光线变化。',
            '这种方法在机场、剧院、文化中心等大体量公共项目中尤其有效。建筑必须处理大量人群和复杂程序，哈迪德用连续表面降低空间割裂感，同时也制造强烈的方向性。她的建筑因此常像城市基础设施，而不只是一个可拍照的外形。',
          ],
          ja: [
            'ハディド作品で誤解されやすいのは曲線である。曲面、折板、流線形の外皮はブランド化された見た目だけではなく、誘導、集合、分流、到達の遅延を担う。人の移動は、床の高低差、天井の曲率、柱の密度、光の変化へ翻訳される。',
            'この方法は空港、劇場、文化センターのような大規模公共建築で力を発揮する。多くの人と複雑なプログラムを処理するため、連続面は空間の分断を弱め、同時に強い方向性をつくる。彼女の建築は、撮影される形態である以上に都市インフラに近い。',
          ],
          en: ['Hadid’s curves guide, gather, divide, and delay movement through large public programs.'],
        },
      },
      {
        title: { zh: '争议与影响', ja: '議論と影響', en: 'Debate and influence' },
        paragraphs: {
          zh: [
            '哈迪德的建筑也伴随争议：成本、施工难度、城市尺度和标志性建筑的政治经济都不断被讨论。但这些争议并未削弱她在建筑史中的位置，反而说明她的作品位于全球城市竞争、数字设计和公共地标生产的交汇点。',
            '她的重要性在于证明女性建筑师也可以主导超大尺度公共项目，并把先锋形式推入主流建造体系。今天许多机场、文化中心和商业综合体使用流线、连续地面和参数化表皮，其语言都绕不开哈迪德打开的路径。',
          ],
          ja: [
            'ハディドの建築には、コスト、施工の難しさ、都市スケール、アイコン建築の政治経済をめぐる議論がつきまとう。しかしその議論は彼女の位置を弱めるのではなく、作品がグローバル都市競争、デジタルデザイン、公共的ランドマークの生産の交点にあることを示している。',
            '彼女の重要性は、女性建築家が超大規模公共プロジェクトを率い、前衛的な形式を主流の建設システムへ押し込めることを証明した点にある。今日の空港、文化施設、複合開発に見られる流線、連続床、パラメトリックな外皮は、ハディドが開いた道を避けて通れない。',
          ],
          en: ['Hadid’s impact lies in bringing radical spatial language into global public construction.'],
        },
      },
    ],
    representative_works: [
      { slug: 'heydar-aliyev-center', note: { zh: '以连续白色表皮把广场、墙体和屋顶合并，形成几乎无缝的公共地形。', ja: '白い連続皮膜が広場、壁、屋根を一体化し、継ぎ目の少ない公共地形をつくる。', en: 'A seamless civic terrain of plaza, wall, and roof.' } },
      { slug: 'guangzhou-opera-house', note: { zh: '用河岸石块般的体量和折面动线组织剧场、城市景观与观演体验。', ja: '河岸の石のような量塊と折れた動線が、劇場、都市景観、鑑賞体験を組織する。', en: 'A fractured riverside opera house shaped by movement.' } },
      { slug: 'beijing-daxing-airport', note: { zh: '把巨型交通枢纽压缩为放射状流线，让航站楼成为可导航的连续内部城市。', ja: '巨大な交通結節点を放射状の流れへ圧縮し、ターミナルを読みやすい内部都市にした。', en: 'A radial terminal designed as an interior city.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: Zaha Hadid', url: 'https://www.pritzkerprize.com/laureates/2004' },
      { title: 'Zaha Hadid Architects: Heydar Aliyev Center', url: 'https://www.zaha-hadid.com/architecture/heydar-aliyev-centre/' },
      { title: 'Zaha Hadid Architects: Guangzhou Opera House', url: 'https://www.zaha-hadid.com/architecture/guangzhou-opera-house/' },
      { title: 'Wikidata: Zaha Hadid', url: 'https://www.wikidata.org/wiki/Q47780' },
    ],
  },
  'im-pei': {
    slug: 'im-pei',
    summary: {
      zh: '贝聿铭以清晰几何、精确比例和公共机构建筑闻名。他的作品常在现代主义抽象与历史场所之间保持克制张力，让玻璃、石材、金属和光线共同建立庄重而可亲近的公共空间。',
      ja: 'I・M・ペイは明快な幾何、精密な比例、公共機関の建築で知られる。近代主義の抽象性と歴史的な場所の間に抑制された緊張を保ち、ガラス、石、金属、光によって厳粛で近づきやすい公共空間をつくった。',
      en: 'I. M. Pei balanced geometric clarity, institutional dignity, and historic context.',
    },
    core_ideas: {
      zh: ['几何秩序与公共庄重', '在历史场所中插入现代结构', '光作为空间组织者', '以克制材料表达纪念性'],
      ja: ['幾何秩序と公共的な品格', '歴史的場所への近代構造の挿入', '空間を組織する光', '抑制された素材による記念性'],
      en: ['Geometric clarity', 'Modernity in historic settings', 'Light as organizer', 'Institutional monumentality'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Itzhak_Perlman_with_I.M._Pei%2C_architect%2C_looking_at_model_of_NYC_Convention_Center_%2803124v%29_%28cropped%29.jpg',
      author: 'Bernard Gotfryd',
      license: 'Public domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Itzhak_Perlman_with_I.M._Pei,_architect,_looking_at_model_of_NYC_Convention_Center_(03124v)_(cropped).jpg',
      alt: { zh: '贝聿铭肖像', ja: 'I・M・ペイの肖像', en: 'Portrait of I. M. Pei' },
    },
    sections: [
      {
        title: { zh: '现代主义的礼仪感', ja: '近代主義の礼節', en: 'Modernism with ceremony' },
        paragraphs: {
          zh: [
            '贝聿铭的现代主义很少追求激烈姿态。他更关心几何秩序如何给公共机构一种稳定、清晰、可信的形象。三角形、方形、中庭、轴线和光井在他的作品中反复出现，但这些元素并不冰冷；它们服务于参观、集会、教育和纪念。',
            '这种礼仪感来自他对比例和材料的控制。无论是美术馆、银行总部还是博物馆扩建，贝聿铭都倾向于让建筑在城市中保持端正的姿态，同时把最强的空间经验留给内部的光线、台阶、庭院或大厅。',
          ],
          ja: [
            'ペイの近代主義は、過激な姿勢を前面に出すことが少ない。彼が重視したのは、幾何秩序が公共機関に安定し、明快で信頼できる像を与える方法だった。三角形、正方形、中庭、軸線、光井戸は繰り返し現れるが、それらは冷たい記号ではなく、鑑賞、集会、教育、記念のために働く。',
            'この礼節は比例と素材の制御から生まれる。美術館、銀行本部、博物館の増築において、建築は都市に対して端正に立ち、最も強い体験は内部の光、階段、庭、中庭、ホールに託される。',
          ],
          en: ['Pei used geometry to give public institutions clarity, calm, and dignity.'],
        },
      },
      {
        title: { zh: '历史场所中的现代插入', ja: '歴史的場所への近代的挿入', en: 'Modern insertions' },
        paragraphs: {
          zh: [
            '卢浮宫金字塔是贝聿铭最具争议也最成功的作品之一。玻璃金字塔把地下入口、博物馆流线和宫殿庭院连接起来，以最抽象的几何回应最厚重的历史场所。它不仿古，也不逃避冲突，而是用透明度和比例降低新旧之间的对抗。',
            '这种策略也出现在华盛顿国家美术馆东馆。三角形基地被转化成清晰的结构与展览系统，尖锐几何最终服务于人的移动和艺术观看。贝聿铭的历史观不是复制过去，而是在历史边上建立一种可被当代使用的秩序。',
          ],
          ja: [
            'ルーヴルのピラミッドは、ペイの中でも最も議論を呼び、同時に最も成功した作品の一つである。ガラスのピラミッドは地下入口、博物館の動線、宮殿の中庭を結び、最も抽象的な幾何で最も重い歴史的場所に応答した。古典を模倣せず、衝突から逃げず、透明性と比例によって新旧の対立を和らげた。',
            '同じ姿勢はワシントンのナショナル・ギャラリー東館にも見られる。三角形の敷地は構造と展示の明快なシステムへ変えられ、鋭い幾何は人の移動と芸術鑑賞に奉仕する。ペイにとって歴史とは複製するものではなく、その横に現代が使える秩序をつくる対象だった。',
          ],
          en: ['Pei inserted modern geometry into historic sites without imitation.'],
        },
      },
      {
        title: { zh: '跨文化现代性', ja: '横断的な近代性', en: 'Cross-cultural modernity' },
        paragraphs: {
          zh: [
            '贝聿铭的职业轨迹跨越中国、美国、欧洲和中东。他的建筑没有简单使用地域符号，而是在抽象几何、材料质感和场所仪式之间寻找共同语言。香港中银大厦的三角结构把城市天际线、金融形象和结构效率叠合在一起。',
            '晚期的美秀美术馆和伊斯兰艺术博物馆进一步显示，他并不把文化理解为表面装饰，而是通过进入路径、光线控制、庭院关系和材料重量来组织经验。贝聿铭的现代性因此具有一种外交式的克制：明确、自信，但不喧哗。',
          ],
          ja: [
            'ペイの仕事は中国、アメリカ、ヨーロッパ、中東を横断した。地域的な記号を単純に貼り付けるのではなく、抽象幾何、素材の質感、場所の儀礼の間に共通言語を探した。香港の中国銀行タワーでは、三角形の構造が都市のスカイライン、金融機関のイメージ、構造効率を重ねている。',
            '晩年の美秀美術館やイスラム美術館では、文化を表面装飾ではなく、アプローチ、光の制御、中庭関係、素材の重さによって経験として構成した。ペイの近代性には外交的な抑制がある。明快で自信がありながら、過度に声高ではない。',
          ],
          en: ['Pei’s global work translated culture through route, light, geometry, and material weight.'],
        },
      },
    ],
    representative_works: [
      { slug: 'louvre-pyramid', note: { zh: '以透明几何重组卢浮宫入口和参观流线，是现代插入历史场所的经典案例。', ja: '透明な幾何によってルーヴルの入口と動線を再編した、歴史的場所への近代的挿入の代表例。', en: 'A transparent geometric entry within a historic court.' } },
      { slug: 'east-building-national-gallery', note: { zh: '把三角形基地转化为展览、结构和中庭系统，几何秩序服务于艺术观看。', ja: '三角形の敷地を展示、構造、中庭のシステムへ変え、幾何秩序を鑑賞体験に結びつけた。', en: 'A triangular plan turned into a museum system.' } },
      { slug: 'bank-of-china-tower', note: { zh: '以三角结构和锐利天际线塑造金融机构形象，也改变了香港高层建筑的视觉秩序。', ja: '三角形の構造と鋭いスカイラインで金融機関の像をつくり、香港の高層景観を変えた。', en: 'A structural skyline marker for Hong Kong.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: I. M. Pei', url: 'https://www.pritzkerprize.com/laureates/1983' },
      { title: 'Louvre: The Pyramid', url: 'https://www.louvre.fr/en/explore/the-palace/the-pyramid' },
      { title: 'National Gallery of Art: East Building', url: 'https://www.nga.gov/visit/east-building.html' },
      { title: 'Wikidata: I. M. Pei', url: 'https://www.wikidata.org/wiki/Q46868' },
    ],
  },
  'renzo-piano': {
    slug: 'renzo-piano',
    summary: {
      zh: '伦佐·皮亚诺把高技派的结构透明度转化为更细腻的城市修复和公共空间营造。他的建筑常以轻盈构造、精确细部和温和的城市尺度，连接技术、文化机构与日常使用。',
      ja: 'レンゾ・ピアノは、ハイテックの構造的透明性を、より繊細な都市修復と公共空間づくりへ変換した。軽やかな構法、精密な細部、穏やかな都市スケールによって、技術、文化施設、日常利用を結びつける。',
      en: 'Renzo Piano turns technical clarity into humane cultural and urban architecture.',
    },
    core_ideas: {
      zh: ['轻盈构造与精密细部', '文化建筑作为城市客厅', '技术可见但不过度炫耀', '用光线和剖面组织公共生活'],
      ja: ['軽い構法と精密な細部', '文化建築を都市の居間にする', '技術を見せながら誇示しすぎない', '光と断面で公共生活を組織する'],
      en: ['Light construction', 'Civic cultural rooms', 'Visible but restrained technology', 'Section and light'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Renzo_Piano%2C_portrait.jpg',
      author: 'Cirone-Musi / Festival della Scienza, Genova',
      license: 'CC BY-SA 2.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Renzo_Piano,_portrait.jpg',
      alt: { zh: '伦佐·皮亚诺肖像', ja: 'レンゾ・ピアノの肖像', en: 'Portrait of Renzo Piano' },
    },
    sections: [
      {
        title: { zh: '从蓬皮杜到城市修复', ja: 'ポンピドゥーから都市修復へ', en: 'From Pompidou to repair' },
        paragraphs: {
          zh: [
            '皮亚诺因与理查德·罗杰斯合作的蓬皮杜中心成名。那座建筑把结构、管线、交通和展厅关系翻到外部，使博物馆像一台面向城市开放的文化机器。它激进、明亮，也把公共广场重新带回巴黎中心。',
            '但皮亚诺后来的道路并没有停在高技派姿态上。他逐渐把技术透明度转化为更温和的城市修复方法：建筑可以很精密，却不必压倒城市；细部可以很先进，却应让人感到可进入、可停留、可使用。',
          ],
          ja: [
            'ピアノはリチャード・ロジャースとのポンピドゥー・センターで広く知られるようになった。構造、設備、交通、展示空間を外部へ反転させ、博物館を都市へ開かれた文化機械のようにした。急進的で明るく、パリ中心部に公共広場を取り戻した。',
            'しかしその後のピアノは、ハイテックの姿勢にとどまらない。技術的な透明性を、より穏やかな都市修復へ変えていった。建築は精密でありながら都市を圧倒せず、細部は先進的でありながら、人が入り、留まり、使える場所をつくる。',
          ],
          en: ['Piano transformed high-tech exposure into a gentler practice of civic repair.'],
        },
      },
      {
        title: { zh: '光线、剖面与文化机构', ja: '光、断面、文化施設', en: 'Light, section, institutions' },
        paragraphs: {
          zh: [
            '皮亚诺的美术馆和文化建筑往往从剖面开始。屋顶如何过滤天光，楼层如何形成连续公共路径，展厅如何在安静背景中服务艺术，都是他反复处理的问题。梅尼尔收藏馆、惠特尼美术馆和保罗·克利中心都体现了这种以光线和结构细部组织参观节奏的方法。',
            '他的技术不是为了让建筑显得复杂，而是为了让复杂性退后。屋顶构件、遮阳、结构节点和玻璃幕墙被精确调校，使使用者最终感受到的是稳定的光、可理解的方向和舒适的公共尺度。',
          ],
          ja: [
            'ピアノの美術館や文化施設は、しばしば断面から考えられる。屋根が天光をどう濾過するか、階がどのように連続する公共ルートをつくるか、展示室が静かな背景として芸術を支えるかが重要である。メニル・コレクション、ホイットニー美術館、パウル・クレー・センターには、光と構造細部で鑑賞のリズムを組み立てる方法が見える。',
            '技術は建築を複雑に見せるためではなく、複雑さを背後へ退かせるためにある。屋根部材、日射制御、構造ジョイント、ガラス外皮が精密に調整され、利用者は安定した光、分かりやすい方向、快適な公共スケールを感じる。',
          ],
          en: ['Piano uses section, roof, and detail to make cultural buildings calm and legible.'],
        },
      },
      {
        title: { zh: '轻盈不是轻薄', ja: '軽やかさは薄さではない', en: 'Lightness with substance' },
        paragraphs: {
          zh: [
            '皮亚诺常被描述为轻盈，但他的轻盈并不等于轻薄。它来自对重力、材料、接缝和城市边界的细致处理。建筑看似安静，是因为许多技术判断已经被隐藏在结构与构造秩序中。',
            '这种态度使他能够跨越机场、图书馆、高层、博物馆和城市更新。无论尺度大小，皮亚诺都倾向于让建筑成为城市生活的温和支架，而不是一次性的造型宣言。',
          ],
          ja: [
            'ピアノはしばしば軽やかだと言われるが、その軽さは薄さではない。重力、素材、接合部、都市との境界を丁寧に扱うことから生まれる。建築が静かに見えるのは、多くの技術的判断が構造と構法の秩序の中に収められているからである。',
            'この姿勢によって、彼は空港、図書館、高層、博物館、都市再生を横断できる。尺度に関わらず、建築を一度きりの造形宣言ではなく、都市生活を支える穏やかな骨組みにしようとする。',
          ],
          en: ['Piano’s lightness is a disciplined handling of gravity, detail, and city life.'],
        },
      },
    ],
    representative_works: [
      { slug: 'centre-pompidou', note: { zh: '把结构、设备和流线外露，创造面向城市的文化机器和公共广场。', ja: '構造、設備、動線を外部化し、都市へ開かれた文化機械と広場をつくった。', en: 'A cultural machine opened to the city.' } },
      { slug: 'menil-collection', note: { zh: '用轻柔屋顶过滤自然光，使美术馆成为安静而精确的观看环境。', ja: '柔らかな屋根で自然光を濾過し、静かで精密な鑑賞環境をつくる。', en: 'A calm museum shaped by filtered daylight.' } },
      { slug: 'shard', note: { zh: '以分裂玻璃表皮塑造伦敦天际线，同时容纳混合城市功能。', ja: '分節されたガラス外皮でロンドンのスカイラインをつくり、複合的な都市機能を収める。', en: 'A mixed-use tower cut into London’s skyline.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: Renzo Piano', url: 'https://www.pritzkerprize.com/laureates/1998' },
      { title: 'Renzo Piano Building Workshop: Centre Pompidou', url: 'https://www.rpbw.com/project/centre-georges-pompidou' },
      { title: 'Renzo Piano Building Workshop: The Menil Collection', url: 'https://www.rpbw.com/project/the-menil-collection' },
      { title: 'Wikidata: Renzo Piano', url: 'https://www.wikidata.org/wiki/Q190148' },
    ],
  },
  'frank-gehry': {
    slug: 'frank-gehry',
    summary: {
      zh: '弗兰克·盖里把日常材料、破碎体量和城市事件感转化为强烈的建筑语言。从洛杉矶住宅实验到毕尔巴鄂古根海姆，他不断挑战建筑如何在粗粝、流动与公共吸引力之间取得平衡。',
      ja: 'フランク・ゲーリーは、日常的な素材、断片化した量塊、都市的な出来事性を強い建築言語へ変えた。ロサンゼルスの住宅実験からビルバオ・グッゲンハイムまで、粗さ、流動性、公共的な吸引力の均衡を問い続けた。',
      en: 'Frank Gehry turns fragmentation, rough material, and civic spectacle into architectural events.',
    },
    core_ideas: {
      zh: ['破碎体量与城市事件', '从日常材料到钛金属表皮', '建筑作为公共吸引力', '用数字工具建造复杂曲面'],
      ja: ['断片化した量塊と都市的出来事', '日常素材からチタン外皮へ', '公共的な吸引力としての建築', 'デジタル工具による複雑曲面の建設'],
      en: ['Fragmented massing', 'Everyday to titanium materials', 'Civic spectacle', 'Digital fabrication'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Frank_Gehry%2C_Viljo_Revell_Centenary_reception%2C_2010_%28S2311_fl2969_it0089%29_%28cropped%29.jpg',
      author: 'City of Toronto / Jose San Juan',
      license: 'Attribution',
      source_url: 'https://commons.wikimedia.org/wiki/File:Frank_Gehry,_Viljo_Revell_Centenary_reception,_2010_(S2311_fl2969_it0089)_(cropped).jpg',
      alt: { zh: '弗兰克·盖生肖像', ja: 'フランク・ゲーリーの肖像', en: 'Portrait of Frank Gehry' },
    },
    sections: [
      {
        title: { zh: '从粗粝住宅到城市地标', ja: '粗い住宅から都市のランドマークへ', en: 'From rough houses to landmarks' },
        paragraphs: {
          zh: [
            '盖里的早期住宅和工作室实验常使用胶合板、链网、金属板等普通材料，把建筑从精致完成品拉回到正在被改造的状态。破碎、拼贴和临时性不是缺陷，而是洛杉矶城市日常的一部分。',
            '后来这些实验被放大到博物馆、音乐厅和基金会建筑中。体量仍然破碎，表皮变得更精密，城市影响也更强。盖里把建筑变成事件：它吸引人靠近、绕行、拍照、进入，也迫使城市重新组织自己的公共形象。',
          ],
          ja: [
            'ゲーリーの初期住宅やスタジオ実験は、合板、金網、金属板など普通の材料を使い、建築を完成した精密品ではなく、改造され続ける状態へ戻した。断片化、コラージュ、仮設性は欠点ではなく、ロサンゼルスの日常的な都市性の一部だった。',
            '後年、その実験は美術館、音楽ホール、財団施設へ拡大される。量塊はなお断片化し、外皮は精密になり、都市への影響は大きくなる。ゲーリーは建築を出来事に変えた。人は近づき、回り込み、撮影し、内部へ入り、都市は自らの公共的な像を組み替えられる。',
          ],
          en: ['Gehry scaled rough material experiments into civic landmarks.'],
        },
      },
      {
        title: { zh: '毕尔巴鄂效应与它的复杂性', ja: 'ビルバオ効果とその複雑さ', en: 'The Bilbao effect' },
        paragraphs: {
          zh: [
            '毕尔巴鄂古根海姆让盖里成为全球地标建筑的象征。钛金属表皮、河岸位置和雕塑化体量共同制造出强烈的城市转型叙事。所谓“毕尔巴鄂效应”让许多城市相信，一座文化建筑可以改变旅游、投资和城市身份。',
            '但盖里的价值并不只在经济效应。更重要的是，他展示了复杂曲面如何通过数字工具、造船式制造和精密施工转化为真实建筑。建筑的自由形态不再只是纸上幻想，而成为城市可运营的公共空间。',
          ],
          ja: [
            'ビルバオ・グッゲンハイムは、ゲーリーを世界的なランドマーク建築の象徴にした。チタンの外皮、川沿いの位置、彫刻的な量塊が、強い都市再生の物語を生んだ。「ビルバオ効果」は、多くの都市に文化建築が観光、投資、都市アイデンティティを変え得ると信じさせた。',
            'しかしゲーリーの価値は経済効果だけではない。複雑な曲面がデジタルツール、造船的な製作、精密な施工によって実建築へ変わることを示した点が重要である。自由な形態は紙上の夢ではなく、都市で運用される公共空間になった。',
          ],
          en: ['Bilbao showed how complex form, fabrication, and urban narrative could converge.'],
        },
      },
      {
        title: { zh: '音乐、运动与表皮', ja: '音楽、動き、外皮', en: 'Music, movement, skin' },
        paragraphs: {
          zh: [
            '迪士尼音乐厅和路易威登基金会说明盖里对表皮的兴趣并不只是图像。金属板、玻璃帆和层叠体量形成进入建筑前的运动经验，也影响内部声学、展览和公共大厅的组织。',
            '盖里的建筑常被批评为过度标志化，但它们也扩大了公众对建筑的期待：建筑可以粗糙、戏剧化、像雕塑一样可绕行，同时仍然承担音乐、艺术和城市聚会的实际功能。',
          ],
          ja: [
            'ウォルト・ディズニー・コンサートホールやルイ・ヴィトン財団は、ゲーリーの外皮への関心が単なる画像ではないことを示す。金属板、ガラスの帆、重なる量塊は、建物へ入る前から運動の経験をつくり、内部の音響、展示、公共ホールの組織にも関わる。',
            'ゲーリーの建築は過度にアイコン化していると批判されることもある。しかし同時に、建築への公共的な期待を広げた。建築は粗く、劇的で、彫刻のように回り込めるものでありながら、音楽、芸術、都市の集会という実際の機能を担える。',
          ],
          en: ['Gehry’s skins create movement before and within the building.'],
        },
      },
    ],
    representative_works: [
      { slug: 'guggenheim-bilbao', note: { zh: '钛金属曲面与河岸城市更新结合，成为二十世纪末地标建筑讨论的核心案例。', ja: 'チタンの曲面と川沿いの都市再生が結びつき、20世紀末のランドマーク建築を語る中心例となった。', en: 'A titanium landmark tied to urban transformation.' } },
      { slug: 'walt-disney-concert-hall', note: { zh: '以起伏金属表皮和复杂大厅组织音乐、城市广场与内部声学。', ja: 'うねる金属外皮と複雑なホール構成が、音楽、都市広場、内部音響を結びつける。', en: 'A concert hall where metal skin and acoustic space meet.' } },
      { slug: 'louis-vuitton-fondation', note: { zh: '玻璃帆片包裹展览空间，把基金会建筑变成公园中的移动景观。', ja: 'ガラスの帆が展示空間を包み、公園の中の動く風景として財団建築をつくる。', en: 'Glass sails around galleries in a park setting.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: Frank Gehry', url: 'https://www.pritzkerprize.com/laureates/1989' },
      { title: 'Guggenheim Bilbao: The Building', url: 'https://www.guggenheim-bilbao.eus/en/the-building' },
      { title: 'Walt Disney Concert Hall: Architecture', url: 'https://www.laphil.com/about/our-venues/about-the-walt-disney-concert-hall' },
      { title: 'Wikidata: Frank Gehry', url: 'https://www.wikidata.org/wiki/Q180374' },
    ],
  },
  'shigeru-ban': {
    slug: 'shigeru-ban',
    summary: {
      zh: '坂茂以纸管、木结构、临时建筑和灾后空间闻名。他把轻材料和快速建造转化为严肃建筑实践，证明建筑不仅服务纪念性和市场，也能回应避难、社区与可持续问题。',
      ja: '坂茂は紙管、木構造、仮設建築、災害後の空間で知られる。軽い素材と迅速な建設を本格的な建築実践へ変え、建築が記念性や市場だけでなく、避難、共同体、持続可能性に応答できることを示した。',
      en: 'Shigeru Ban uses paper, timber, and temporary systems to connect architecture with relief, community, and sustainability.',
    },
    core_ideas: {
      zh: ['纸管与轻质结构', '灾后空间与社会责任', '临时性也可以有尊严', '材料创新服务人的使用'],
      ja: ['紙管と軽量構造', '災害後の空間と社会的責任', '仮設にも尊厳を与える', '素材の革新を人の使用へ向ける'],
      en: ['Paper and lightweight structure', 'Disaster relief', 'Dignified temporariness', 'Material innovation for use'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Shigeru_Ban.jpg',
      author: '準建築人手札網站',
      license: 'CC BY 2.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Shigeru_Ban.jpg',
      alt: { zh: '坂茂肖像', ja: '坂茂の肖像', en: 'Portrait of Shigeru Ban' },
    },
    sections: [
      {
        title: { zh: '轻材料的严肃性', ja: '軽い素材の真剣さ', en: 'Serious lightness' },
        paragraphs: {
          zh: [
            '坂茂最具辨识度的材料是纸管。纸在建筑中通常被视为脆弱、临时、低成本，但坂茂通过结构计算、节点设计和防火处理，让纸管进入住宅、展厅、教堂和救灾建筑。材料的轻，并不意味着建筑的轻率。',
            '他的材料实验总是与使用方式相连。纸管便宜、可回收、易运输，也能快速组装，因此特别适合临时空间和灾后场景。坂茂的贡献在于把这种实用性提升为建筑伦理：临时建筑也应有空间质量和人的尊严。',
          ],
          ja: [
            '坂茂を特徴づける素材は紙管である。紙は建築では弱く、仮設的で、低コストなものと見なされがちだが、坂は構造計算、接合部、防火処理によって、紙管を住宅、展示、教会、救援建築へ導入した。素材の軽さは建築の軽率さを意味しない。',
            '彼の素材実験は常に使い方と結びつく。紙管は安価で、リサイクル可能で、運びやすく、素早く組み立てられるため、仮設空間や災害後の状況に適している。坂の貢献は、その実用性を建築倫理へ高めた点にある。仮設建築にも空間の質と人間の尊厳が必要である。',
          ],
          en: ['Ban turns lightweight, recyclable materials into serious architecture.'],
        },
      },
      {
        title: { zh: '灾后建筑不是次等建筑', ja: '災害後の建築は二級品ではない', en: 'Relief architecture with dignity' },
        paragraphs: {
          zh: [
            '从难民隔间到纸教堂、纸管住宅和基督城纸板教堂，坂茂持续参与灾后和临时建筑实践。他拒绝把临时空间当作最低标准的棚屋，而是尽可能提供秩序、隐私、采光和集体记忆。',
            '这种实践扩展了建筑师的社会角色。建筑不只是等待大型委托的专业服务，也可以介入紧急状态，用简单系统迅速改善人的处境。坂茂让“可建造、可运输、可负担”成为设计美学的一部分。',
          ],
          ja: [
            '避難所の間仕切り、紙の教会、紙管住宅、クライストチャーチの紙の大聖堂まで、坂は災害後と仮設建築に継続的に関わってきた。仮設空間を最低限の小屋として扱わず、秩序、プライバシー、採光、集団的記憶をできる限り与える。',
            'この実践は建築家の社会的役割を広げた。建築は大きな委託を待つ専門サービスだけでなく、緊急時に介入し、単純なシステムで人の状況を改善できる。坂は「建てやすい、運びやすい、負担できる」ことを設計美学の一部にした。',
          ],
          en: ['Ban treats emergency space as architecture deserving order, privacy, and care.'],
        },
      },
      {
        title: { zh: '木、纸与公共建筑', ja: '木、紙、公共建築', en: 'Timber, paper, public buildings' },
        paragraphs: {
          zh: [
            '坂茂并不只做临时建筑。蓬皮杜梅斯中心、阿斯彭美术馆和富士山世界遗产中心都显示他对木结构、编织表皮和公共动线的兴趣。轻材料在这些项目中不再只是应急手段，而是形成建筑形象和空间体验的主角。',
            '他的建筑常把结构做得清楚而亲近。木格、纸管和编织外皮让使用者意识到建筑如何被组装，也让技术带有手工温度。坂茂因此把可持续性从口号变成可触摸的空间经验。',
          ],
          ja: [
            '坂は仮設建築だけをつくるわけではない。ポンピドゥー・センター・メス、アスペン美術館、富士山世界遺産センターは、木構造、編まれた外皮、公共動線への関心を示す。軽い素材は応急手段ではなく、建築の像と空間体験をつくる主役になる。',
            '彼の建築は構造を分かりやすく、親しみやすく見せる。木格子、紙管、編み込まれた外皮は、建築がどのように組み立てられているかを利用者に伝え、技術に手仕事の温度を与える。持続可能性は標語ではなく、触れられる空間経験になる。',
          ],
          en: ['Ban’s public buildings make timber and light construction spatially legible.'],
        },
      },
    ],
    representative_works: [
      { slug: 'cardboard-cathedral', note: { zh: '以纸管结构回应地震后的礼拜和城市记忆，临时性中保留庄重感。', ja: '紙管構造で震災後の礼拝と都市の記憶に応答し、仮設性の中に厳粛さを保つ。', en: 'A paper-tube cathedral that gives dignity to temporary recovery.' } },
      { slug: 'pompidou-metz', note: { zh: '木质编织屋顶覆盖展览与城市公共空间，把轻结构变成文化地标。', ja: '木の編み込み屋根が展示と都市公共空間を覆い、軽い構造を文化的ランドマークにする。', en: 'A woven timber roof turned into a cultural landmark.' } },
      { slug: 'mt-fuji-center', note: { zh: '倒置锥体与水面反射共同组织富士山观看经验。', ja: '反転した円錐と水面の反射が、富士山を見る経験を構成する。', en: 'A timber cone and reflection frame the experience of Mount Fuji.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: Shigeru Ban', url: 'https://www.pritzkerprize.com/laureates/2014' },
      { title: 'Shigeru Ban Architects', url: 'https://www.shigerubanarchitects.com/' },
      { title: 'Centre Pompidou-Metz', url: 'https://www.centrepompidou-metz.fr/en' },
      { title: 'Wikidata: Shigeru Ban', url: 'https://www.wikidata.org/wiki/Q526725' },
    ],
  },
  'carlo-scarpa': {
    slug: 'carlo-scarpa',
    summary: {
      zh: '卡洛·斯卡帕以细部、材料接缝、展陈空间和历史建筑改造闻名。他的建筑不是宏大体量的宣言，而是在石、水、金属、混凝土和旧墙之间制造极其精确的观看与触摸经验。',
      ja: 'カルロ・スカルパは、細部、素材の接合、展示空間、歴史建築の改修で知られる。彼の建築は巨大な量塊の宣言ではなく、石、水、金属、コンクリート、古い壁の間に精密な見る経験と触れる経験をつくる。',
      en: 'Carlo Scarpa shaped architecture through detail, material joints, exhibition craft, and historic intervention.',
    },
    core_ideas: {
      zh: ['细部作为空间核心', '新旧材料的精确相遇', '展陈设计与建筑合一', '水、石、金属和光的触觉秩序'],
      ja: ['細部を空間の中心にする', '新旧素材の精密な出会い', '展示設計と建築の一体化', '水、石、金属、光の触覚的秩序'],
      en: ['Detail as space', 'Precise old-new joints', 'Exhibition architecture', 'Tactile order'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Carlo_Scarpa_1954.jpg',
      author: 'Mario De Biasi / Mondadori Publishers',
      license: 'Public domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Carlo_Scarpa_1954.jpg',
      alt: { zh: '卡洛·斯卡帕肖像', ja: 'カルロ・スカルパの肖像', en: 'Portrait of Carlo Scarpa' },
    },
    sections: [
      {
        title: { zh: '细部不是装饰', ja: '細部は装飾ではない', en: 'Detail is not decoration' },
        paragraphs: {
          zh: [
            '斯卡帕的建筑需要近距离阅读。台阶边缘、金属嵌条、石材转角、水槽厚度、门轴和玻璃固定件都被处理成空间事件。细部不是附属装饰，而是决定人如何停步、观看、触摸和转身的装置。',
            '这种细部意识来自威尼斯的工艺传统、现代主义构成和他对展览设计的长期经验。斯卡帕让材料之间保持可见缝隙，使新旧、轻重、粗细、湿干之间的差异变成建筑的节奏。',
          ],
          ja: [
            'スカルパの建築は近くで読む必要がある。階段の端、金属の埋め込み、石の角、水盤の厚み、扉の軸、ガラスの固定金物が空間的な出来事として扱われる。細部は付属的な装飾ではなく、人が立ち止まり、見て、触れ、向きを変えるための装置である。',
            'この細部への意識は、ヴェネツィアの工芸伝統、近代主義的な構成、展示設計の経験から生まれた。スカルパは素材の間に見える隙間を残し、新旧、軽重、粗密、湿乾の差異を建築のリズムに変える。',
          ],
          en: ['Scarpa makes joints, edges, and thresholds into spatial events.'],
        },
      },
      {
        title: { zh: '历史建筑中的插入', ja: '歴史建築への挿入', en: 'Intervening in history' },
        paragraphs: {
          zh: [
            '斯卡帕处理历史建筑时，很少假装新东西不存在。他会让新的混凝土、金属、木材和旧石墙保持距离，同时又通过比例和路径把它们联系起来。奎里尼·斯坦帕利亚基金会就是这种方法的典型：水、桥、入口和展厅被重新组织，旧建筑获得新的城市接口。',
            '他的历史观不是复原主义，而是一种精确的共存。新元素不模仿过去，也不粗暴覆盖过去，而是在相邻处清楚表明自己的时代。正因为这种克制，斯卡帕的改造常显得比完整新建更有张力。',
          ],
          ja: [
            'スカルパは歴史建築を扱うとき、新しいものが存在しないふりをしない。新しいコンクリート、金属、木、古い石壁の間に距離を残しながら、比例と経路によって結びつける。クェリーニ・スタンパリア財団はその典型で、水、橋、入口、展示室が再構成され、古い建物が新しい都市的接点を得る。',
            '彼の歴史観は復元主義ではなく、精密な共存である。新しい要素は過去を模倣せず、乱暴に覆いもしない。隣り合う場所で自らの時代を明確に示す。その抑制によって、スカルパの改修は完全な新築よりも強い緊張を持つことがある。',
          ],
          en: ['Scarpa inserts new work into old fabric through precise distance and proportion.'],
        },
      },
      {
        title: { zh: '墓园、展览与慢速动线', ja: '墓地、展示、遅い動線', en: 'Slow movement' },
        paragraphs: {
          zh: [
            '布里昂墓园把斯卡帕的主题推到极致：水池、混凝土、圆环、路径和植物共同形成缓慢的纪念空间。这里没有单一正面，只有一步步被安排的接近、转折和停留。',
            '他的展览空间也类似。作品不是被挂在中性背景上，而是与支架、墙面、光线和人的行走距离发生关系。斯卡帕让观看变慢，让建筑重新成为触觉和时间的艺术。',
          ],
          ja: [
            'ブリオン墓地はスカルパの主題を極限まで押し出す。水盤、コンクリート、円環、経路、植物が、ゆっくりとした記念空間をつくる。単一の正面はなく、一歩ずつ近づき、曲がり、留まる経験が組み立てられる。',
            '彼の展示空間も同様である。作品は中立的な背景に掛けられるだけではなく、支持体、壁面、光、人の歩く距離と関係する。スカルパは見る行為を遅くし、建築を触覚と時間の芸術へ戻した。',
          ],
          en: ['Scarpa slows movement so that viewing becomes tactile and temporal.'],
        },
      },
    ],
    representative_works: [
      { slug: 'brion-tomb', note: { zh: '水、混凝土、圆环和路径共同构成缓慢而精确的纪念空间。', ja: '水、コンクリート、円環、経路が、ゆっくりと精密な記念空間をつくる。', en: 'A slow memorial landscape of water, concrete, and path.' } },
      { slug: 'fondazione-querini-stampalia', note: { zh: '在威尼斯旧建筑中插入桥、水、入口和展陈系统，新旧共存而不互相伪装。', ja: 'ヴェネツィアの古い建物に橋、水、入口、展示システムを挿入し、新旧を偽装せず共存させる。', en: 'A precise old-new intervention in Venice.' } },
      { slug: 'olivetti-exhibition-centre-in-venice', note: { zh: '以楼梯、材料和展陈细部把小空间转化为可缓慢阅读的建筑。', ja: '階段、素材、展示細部によって小さな空間をゆっくり読める建築へ変える。', en: 'A small showroom transformed through stair, material, and detail.' } },
    ],
    sources: [
      { title: 'Fondazione Querini Stampalia: Carlo Scarpa Area', url: 'https://www.querinistampalia.org/en/museum/carlo-scarpa-area/' },
      { title: 'MAXXI: Carlo Scarpa', url: 'https://www.maxxi.art/en/focus-on/carlo-scarpa/' },
      { title: 'Wikidata: Carlo Scarpa', url: 'https://www.wikidata.org/wiki/Q315406' },
    ],
  },
  'kengo-kuma': {
    slug: 'kengo-kuma',
    summary: {
      zh: '隈研吾以木、竹、石、瓦、织物和细小构件重新思考建筑的“消隐”。他的作品不是让建筑消失，而是把体量分解为材料、阴影、缝隙和地方工艺，让建筑与街道和地景发生更柔和的关系。',
      ja: '隈研吾は木、竹、石、瓦、布、小さな部材によって建築の「消える」あり方を考え直した。建築をなくすのではなく、量塊を素材、影、隙間、地域の技術へ分解し、街路や風景との柔らかな関係をつくる。',
      en: 'Kengo Kuma dissolves mass through material, craft, shadow, and small-scale components.',
    },
    core_ideas: {
      zh: ['消隐建筑与弱化体量', '地方材料和工艺再组织', '细小构件形成大尺度空间', '街道、阴影与过滤性的立面'],
      ja: ['建築を消し量塊を弱める', '地域素材と工芸の再構成', '小さな部材で大きな空間をつくる', '街路、影、濾過する立面'],
      en: ['Anti-object architecture', 'Local materials', 'Small components', 'Filtered facades'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Kengo_Kuma_at_Strelka_Institute.jpg',
      author: 'Strelka Institute for Media, Architecture and Design',
      license: 'CC BY 2.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Kengo_Kuma_at_Strelka_Institute.jpg',
      alt: { zh: '隈研吾肖像', ja: '隈研吾の肖像', en: 'Portrait of Kengo Kuma' },
    },
    sections: [
      {
        title: { zh: '反对建筑成为孤立物', ja: '建築が孤立物になることへの抵抗', en: 'Against isolated objects' },
        paragraphs: {
          zh: [
            '隈研吾常把自己的方法描述为让建筑消隐。这里的消隐不是取消建筑，而是反对建筑以巨大、光滑、封闭的体量压倒场所。他更愿意把建筑拆解为许多可感知的小构件，让阴影、缝隙和材料纹理参与空间。',
            '这种态度与日本传统建筑、地方工艺和当代城市经验都有关。木格、竹编、石片、瓦片和金属网不只是表皮图案，而是调节光线、尺度和街道关系的工具。',
          ],
          ja: [
            '隈研吾は自らの方法を建築を消すこととして語ることが多い。ここでの「消える」は建築をなくすことではなく、巨大で滑らかで閉じた量塊が場所を圧倒することへの抵抗である。建築を多数の小さな部材へ分解し、影、隙間、素材の質感を空間に参加させる。',
            'この姿勢は日本の伝統建築、地域工芸、現代都市の経験と関係している。木格子、竹編み、石片、瓦、金属メッシュは単なる外皮の模様ではなく、光、尺度、街路との関係を調整する道具である。',
          ],
          en: ['Kuma dissolves building mass into small components, shadow, and texture.'],
        },
      },
      {
        title: { zh: '材料作为气候与城市过滤器', ja: '気候と都市を濾過する素材', en: 'Material as filter' },
        paragraphs: {
          zh: [
            '隈研吾的材料选择常带有地方性，但他并不只是复兴传统材料。材料被重新编码为当代建筑系统：木条可以形成遮阳立面，瓦片可以变成半透明屏障，石材可以被切薄、悬挂或叠合。',
            '因此他的建筑经常像过滤器。室内外、公共私密、建筑街道之间不是硬边界，而是通过层层材料过渡。浅草文化观光中心把竖向公共功能叠成街道尺度的木构表情，V&A Dundee 则用水平纹理回应海岸地景。',
          ],
          ja: [
            '隈の素材選択には地域性があるが、伝統素材を単に復興するわけではない。素材は現代建築のシステムとして再編される。木の小片は日射を調整する立面になり、瓦は半透明のスクリーンになり、石は薄く切られ、吊られ、重ねられる。',
            'そのため彼の建築はしばしばフィルターのように働く。内外、公私、建築と街路の間は硬い境界ではなく、素材の層を通じて移行する。浅草文化観光センターは垂直に重なる公共機能を街路スケールの木の表情にし、V&Aダンディーは水平のテクスチャで海岸の風景に応答する。',
          ],
          en: ['Kuma uses material layers to filter light, climate, street, and landscape.'],
        },
      },
      {
        title: { zh: '大尺度中的小构件', ja: '大きなスケールの中の小さな部材', en: 'Small parts, large scale' },
        paragraphs: {
          zh: [
            '隈研吾面对大型项目时，仍试图避免整块体量。新国立竞技场通过木檐、水平层叠和绿化弱化体育场的巨大尺度，使它更接近公园和城市边界的连续体。',
            '这种策略也会受到批评：材料语言容易成为可复制的品牌。但在最好的作品中，隈研吾确实把材料从装饰表皮推进到空间组织，让建筑在城市中显得更柔软、更可接近。',
          ],
          ja: [
            '隈は大規模プロジェクトでも、一枚岩の量塊を避けようとする。新国立競技場では、木の庇、水平に重なる層、緑化によってスタジアムの巨大さを弱め、公園と都市境界の連続体へ近づけた。',
            'この戦略には批判もある。素材の言語が再利用可能なブランドになりやすいからである。しかし優れた作品では、素材は装飾的な外皮を越えて空間を組織し、建築を都市の中でより柔らかく、近づきやすいものにしている。',
          ],
          en: ['Kuma scales small components up to civic buildings while trying to weaken mass.'],
        },
      },
    ],
    representative_works: [
      { slug: 'asakusa-culture-center', note: { zh: '以层叠木构表情回应浅草街道尺度，把垂直公共功能做成可亲近的城市界面。', ja: '重なる木の表情で浅草の街路尺度に応答し、垂直の公共機能を親しみやすい都市界面にする。', en: 'A stacked civic facade scaled to Asakusa’s street life.' } },
      { slug: 'v-and-a-dundee', note: { zh: '水平纹理和地景体量回应海岸环境，使博物馆像被风和水切削的岩层。', ja: '水平のテクスチャと地形的な量塊が海岸環境に応答し、風と水に削られた岩層のような美術館をつくる。', en: 'A coastal museum shaped like layered terrain.' } },
      { slug: 'national-stadium-tokyo', note: { zh: '以木檐、绿化和水平层叠减弱大型体育场的压迫感。', ja: '木の庇、緑化、水平の層によって大型スタジアムの圧迫感を弱める。', en: 'A large stadium softened by timber eaves and planted layers.' } },
    ],
    sources: [
      { title: 'Kengo Kuma & Associates', url: 'https://kkaa.co.jp/' },
      { title: 'V&A Dundee: Architecture', url: 'https://www.vam.ac.uk/dundee/info/architecture' },
      { title: 'Wikidata: Kengo Kuma', url: 'https://www.wikidata.org/wiki/Q717496' },
    ],
  },
  'niemeyer': {
    slug: 'niemeyer',
    summary: {
      zh: '奥斯卡·尼迈耶把钢筋混凝土的可塑性推向曲线、广场和国家想象。他的建筑从巴西利亚到圣保罗、尼泰罗伊，不断把现代主义从直线功能主义中释放出来，转向身体、天空和公共纪念性。',
      ja: 'オスカー・ニーマイヤーは、鉄筋コンクリートの可塑性を曲線、広場、国家的想像力へ押し広げた。ブラジリアからサンパウロ、ニテロイまで、近代主義を直線的な機能主義から解放し、身体、空、公共的記念性へ向けた。',
      en: 'Oscar Niemeyer used reinforced concrete to make modernism curvilinear, monumental, and civic.',
    },
    core_ideas: {
      zh: ['混凝土曲线与身体感', '现代主义中的公共纪念性', '建筑、广场和国家形象', '轻盈屋顶与雕塑化结构'],
      ja: ['コンクリート曲線と身体感覚', '近代主義の公共的記念性', '建築、広場、国家像', '軽い屋根と彫刻的構造'],
      en: ['Concrete curves', 'Civic monumentality', 'Architecture and national image', 'Sculptural structure'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Oscar_Niemeyer_1968b.jpg',
      author: 'Unknown / Mondadori Publishers',
      license: 'Public domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Oscar_Niemeyer_1968b.jpg',
      alt: { zh: '奥斯卡·尼迈耶肖像', ja: 'オスカー・ニーマイヤーの肖像', en: 'Portrait of Oscar Niemeyer' },
    },
    sections: [
      {
        title: { zh: '曲线中的现代主义', ja: '曲線の中の近代主義', en: 'Curvilinear modernism' },
        paragraphs: {
          zh: [
            '尼迈耶反对把现代建筑简化为直线、盒子和严格功能主义。他认为曲线更接近巴西地景、身体和自由的想象。钢筋混凝土使这种曲线得以成为屋顶、柱、壳体和广场中的巨大姿态。',
            '这种现代主义并不软弱。相反，它具有强烈纪念性和公共可见性。建筑通过大跨度、薄壳、悬挑和开阔平台，与天空、地平线和人群活动建立关系。',
          ],
          ja: [
            'ニーマイヤーは、近代建築を直線、箱、厳格な機能主義に限定することに反対した。曲線はブラジルの風景、身体、自由な想像力に近いと考えた。鉄筋コンクリートは、その曲線を屋根、柱、シェル、広場の大きな身振りにした。',
            'この近代主義は弱いものではない。むしろ強い記念性と公共的可視性を持つ。建築は大スパン、薄いシェル、キャンチレバー、開いたプラットフォームによって、空、地平線、人々の活動と関係する。',
          ],
          en: ['Niemeyer made modernism curvilinear through concrete, sky, and civic scale.'],
        },
      },
      {
        title: { zh: '巴西利亚：建筑与国家舞台', ja: 'ブラジリア：建築と国家の舞台', en: 'Brasília as stage' },
        paragraphs: {
          zh: [
            '巴西利亚是理解尼迈耶不可绕开的项目。与卢西奥·科斯塔的城市规划一起，尼迈耶的国会、教堂、宫殿和广场为新首都建立了视觉秩序。建筑不只是功能容器，而是国家现代化的舞台。',
            '这些建筑的力量来自清晰的形象：碗状议会、细柱宫殿、开放广场和壳体教堂。它们常被批评距离日常生活过远，但也确实塑造了二十世纪最完整的现代主义国家景观之一。',
          ],
          ja: [
            'ブラジリアはニーマイヤーを理解するうえで避けられないプロジェクトである。ルシオ・コスタの都市計画とともに、国会議事堂、大聖堂、宮殿、広場は新首都の視覚秩序をつくった。建築は機能の容器ではなく、国家の近代化を示す舞台となる。',
            'これらの建築の力は、明快な像にある。皿状の議会、細い柱の宮殿、開いた広場、シェル状の聖堂。日常生活から遠いと批判されることもあるが、20世紀で最も完全な近代主義的国家景観の一つを形づくったことは確かである。',
          ],
          en: ['Brasília made architecture a stage for national modernity.'],
        },
      },
      {
        title: { zh: '轻盈、政治与晚期生命力', ja: '軽やかさ、政治、晩年の生命力', en: 'Lightness and longevity' },
        paragraphs: {
          zh: [
            '尼迈耶的作品常同时具有轻盈和政治性。他长期保持左翼立场，也在流亡和回归之间继续实践。圣保罗的科潘大厦、尼泰罗伊当代艺术博物馆等作品显示，他的曲线并非只属于国家纪念物，也可以进入城市住宅、文化建筑和海湾地景。',
            '他的影响不在于让所有建筑都变成曲线，而在于证明现代主义可以有感性、欲望和公共戏剧性。混凝土不必沉重，它也可以像线条一样在天空中展开。',
          ],
          ja: [
            'ニーマイヤーの作品は、軽やかさと政治性を同時に持つ。彼は長く左派的立場を保ち、亡命と帰国の間でも実践を続けた。サンパウロのコパン、ニテロイ現代美術館などは、曲線が国家的記念物だけでなく、都市住宅、文化施設、湾岸の風景にも入り得ることを示す。',
            '彼の影響は、すべての建築を曲線にすることではない。近代主義が感性、欲望、公共的な劇性を持ち得ることを証明した点にある。コンクリートは重いだけではなく、線のように空へ伸びることもできる。',
          ],
          en: ['Niemeyer proved concrete modernism could be sensual, political, and light.'],
        },
      },
    ],
    representative_works: [
      { slug: 'brasilia-cathedral', note: { zh: '以混凝土肋架和玻璃组织向天展开的宗教空间，是巴西利亚最具诗性的建筑之一。', ja: 'コンクリートのリブとガラスによって空へ開く宗教空間をつくる、ブラジリアで最も詩的な建築の一つ。', en: 'A cathedral opening upward through concrete ribs and glass.' } },
      { slug: 'national-congress-brazil', note: { zh: '碗状体量、双塔和广场共同塑造新首都的国家政治图像。', ja: '皿状の量塊、双塔、広場が新首都の政治的イメージをつくる。', en: 'A civic image of towers, bowls, and open plaza.' } },
      { slug: 'copan-building', note: { zh: '波浪形住宅巨构把曲线带入高密度城市生活。', ja: '波打つ集合住宅が、曲線を高密度な都市生活へ持ち込む。', en: 'A wave-like housing megastructure in dense urban life.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Oscar Niemeyer', url: 'https://www.britannica.com/biography/Oscar-Niemeyer' },
      { title: 'Wikidata: Oscar Niemeyer', url: 'https://www.wikidata.org/wiki/Q155793' },
      { title: 'UNESCO: Brasília', url: 'https://whc.unesco.org/en/list/445/' },
    ],
  },

  // ============================================================
  // 第五批 — 5 位建筑师
  // ============================================================

  'gaudi': {
    slug: 'gaudi',
    summary: {
      zh: '安东尼·高迪（Antoni Gaudí, 1852–1926）是加泰罗尼亚现代主义最伟大的建筑师。他把结构逻辑与自然形态融为一体，用石材、陶瓷和铁艺创造出前所未有的建筑语言。巴塞罗那因他的七座世界遗产而成为建筑师的朝圣地，而未完成的圣家堂至今仍在施工——如同高迪所信，他的"雇主并不着急"。',
      ja: 'アントニ・ガウディ（Antoni Gaudí, 1852–1926）はカタルーニャ・モデルニスモを代表する建築家である。構造論理と自然形態を融合し、石、陶、鉄によって前代未聞の建築言語を生み出した。バルセロナは彼の7つの世界遺産によって建築家の巡礼地となり、未完成のサグラダ・ファミリアは今も建設が続く——「私の雇い主は急がない」というガウディの言葉どおりに。',
      en: 'Antoni Gaudí (1852–1926) fused structural logic with organic form to create an unprecedented architectural language. His seven World Heritage sites in Barcelona draw pilgrims of architecture, and the unfinished Sagrada Família still rises — as Gaudí believed, his "client is not in a hurry."',
    },
    core_ideas: {
      zh: [
        '自然是唯一的老师——从骨骼、洞穴、树干中提取结构法则，而非从历史风格中模仿',
        '建筑是整体艺术——从结构体系到门把手都由建筑师统合设计，不区分"大设计"与"小装饰"',
        '几何学的想象力——悬链线拱、双曲面、双曲抛物面等可展曲面构成空间，而非依赖传统哥特柱式',
        '材料与工艺的尊严——碎瓷拼贴（trencadís）、锻铁、石材砌筑，每一种材料都在讲述自己的语言',
      ],
      ja: [
        '自然こそ唯一の教師——骨格、洞窟、樹木から構造法則を抽出し、歴史様式から模倣しない',
        '建築は総合芸術——構造システムからドアハンドルまで、建築家が統合的に設計する',
        '幾何学の想像力——カテナリー曲線、双曲面、双曲放物面などの線織面が空間を構成し、伝統的ゴシック柱式に頼らない',
        '素材と工芸の尊厳——トゥランカディス（破砕陶片モザイク）、鍛鉄、石積み、それぞれの素材が自らの言語を語る',
      ],
      en: [
        'Nature as the only teacher — structural laws drawn from bones, caves, and trees, not from historical styles',
        'Architecture as total art — everything from structure to door handle is designed by the architect',
        'Geometric imagination — catenary arches, hyperboloids, and ruled surfaces shape space without relying on Gothic columns',
        'Dignity of material and craft — trencadís mosaics, wrought iron, and stone masonry each speak their own language',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Antoni_Gaud%C3%AD_1878.jpg',
      author: 'Pau Audouard',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Antoni_Gaud%C3%AD_1878.jpg',
      alt: { zh: '安东尼·高迪肖像，1878年', ja: 'アントニ・ガウディの肖像、1878年', en: 'Portrait of Antoni Gaudí, 1878' },
    },
    sections: [
      {
        title: { zh: '从自然中学习结构', ja: '自然から構造を学ぶ', en: 'Learning structure from nature' },
        paragraphs: {
          zh: [
            '高迪不是从建筑史教科书开始学习的。他观察树枝如何分叉、骨骼如何承重、洞穴如何悬挑。在圣家堂的工坊里，他搭建倒置的悬链线模型——用细绳和小沙袋模拟拱顶的受力，然后将其翻转，就得到了最优的受压曲线。这种方法绕过了繁复的数学计算，直接从重力中推导形式。',
            '这种"自然结构主义"在科洛尼亚古埃尔教堂的地下室里达到第一个高峰。倾斜的柱子像树干般分叉，砖石和玄武岩交替砌筑，整个空间既是结构实验场，也是虔诚的祈祷场所。高迪证明了一件事：结构效率和空间诗意并不矛盾，它们可以出自同一条自然法则。',
          ],
          ja: [
            'ガウディは建築史の教科書から学び始めたのではない。枝の分かれ方、骨格の荷重のかかり方、洞窟の張り出し方を観察した。サグラダ・ファミリアの工房では、逆さ吊りのカテナリー模型（細い紐と小さな砂袋でヴォールトの応力をシミュレートし、反転させれば最適な圧縮曲線が得られる）を作った。この方法は複雑な数学計算を迂回し、重力から直接形を導き出す。',
            'この「自然構造主義」は、コロニア・グエル教会の地下聖堂で最初の頂点に達する。傾いた柱が樹幹のように分岐し、レンガと玄武岩が交互に積まれ、空間全体が構造実験場であると同時に敬虔な祈りの場でもある。ガウディが証明したのは、構造効率と空間の詩は矛盾せず、同じ自然法則から生まれ得るということだ。',
          ],
          en: [
            'Gaudí did not start from architectural history textbooks. He observed how branches fork, how bones bear weight, how caves cantilever. In the Sagrada Família workshop, he built an inverted catenary model — strings and small sandbags simulating vault stresses, then flipped to reveal the optimal compression curve. The method bypassed complex mathematics, deriving form directly from gravity.',
            'This "natural structuralism" reached its first peak in the crypt of Colònia Güell. Slanted columns branch like tree trunks, brick alternates with basalt — the space is at once a structural laboratory and a place of prayer. Gaudí proved that structural efficiency and spatial poetry are not contradictory; they can emerge from the same natural law.',
          ],
        },
      },
      {
        title: { zh: '圣家堂：一生的事业', ja: 'サグラダ・ファミリア：生涯の事業', en: 'Sagrada Família: A life\'s work' },
        paragraphs: {
          zh: [
            '1883年，31岁的高迪接手圣家堂的设计。在此后的43年里，他将全部精力投入这座赎罪教堂，最后12年甚至住在工地上。高迪知道自己看不到完工的那一天，但他留下了详细的石膏模型和几何图纸，让后来者可以继续建造。',
            '圣家堂的设计从新哥特式起步，逐渐演化为高迪独有的"自然哥特式"。诞生立面的雕塑繁茂如生命之树，受难立面则像枯骨般冷峻。内部森林般的柱子在上方分叉为树枝状，中央穹顶将升至172.5米——比巴塞罗那的蒙特惠奇山略低，因为高迪相信"人的作品不应超越神的作品"。',
            '如今圣家堂仍在施工，预计2026年——高迪逝世百年之际——完成主体结构。这栋建筑已成为建筑史上最持久的创作行为，也是对"未完成"美学最动人的注解。',
          ],
          ja: [
            '1883年、31歳のガウディはサグラダ・ファミリアの設計を引き継いだ。その後の43年間、彼は全精力をこの贖罪教会に注ぎ、最後の12年は工房に住み込んだ。ガウディは自分が完成を見られないことを知っており、後続の建設者が引き継げるよう詳細な石膏模型と幾何学図面を残した。',
            'サグラダ・ファミリアの設計はネオ・ゴシックから出発し、徐々にガウディ独自の「自然ゴシック」へと進化した。生誕のファサードの彫刻は生命の樹のように繁茂し、受難のファサードは枯骨のように峻烈である。内部では森のような柱が上方で枝状に分岐し、中央ドームは172.5メートル——バルセロナのモンジュイックの丘よりわずかに低い。「人間の作品が神の作品を超えてはならない」とガウディは信じていたからだ。',
            '今日もサグラダ・ファミリアの工事は続き、ガウディ没後100年にあたる2026年に主要構造の完成が予定されている。この建物は建築史上最も持続的な創造行為となり、「未完」の美学について最も感動的な注釈となった。',
          ],
          en: [
            'In 1883, the 31-year-old Gaudí took over the Sagrada Família. For the next 43 years he poured himself into this expiatory church, living on-site for the final 12. Gaudí knew he wouldn\'t see it finished, so he left detailed plaster models and geometric drawings for successors to follow.',
            'The design evolved from neo-Gothic into Gaudí\'s own "natural Gothic." The Nativity façade teems like a tree of life; the Passion façade is stark as bare bone. Inside, forest-like columns branch overhead; the central tower will reach 172.5 meters — slightly lower than Barcelona\'s Montjuïc hill, because Gaudí believed "the work of man should not surpass the work of God."',
            'Construction continues today, with the main structure expected to be completed in 2026 — the centenary of Gaudí\'s death. The building has become architecture\'s most enduring creative act and its most moving testament to the aesthetics of the unfinished.',
          ],
        },
      },
      {
        title: { zh: '材料的诗学与城市住宅', ja: '素材の詩学と都市住宅', en: 'The poetics of material and the urban house' },
        paragraphs: {
          zh: [
            '高迪的才华同样体现在住宅和城市空间上。巴特罗公寓的外墙像龙鳞和骨骼，屋顶像龙的脊背——传说中加泰罗尼亚的守护圣人圣乔治屠龙的故事化为一栋建筑。米拉之家的波浪形石墙和雕塑般的烟囱群，则将一栋公寓楼变成了可居住的雕塑。古埃尔公园的色彩斑斓的马赛克长椅和姜饼屋般的门房，原本是花园城市开发项目，后来成为全世界最欢乐的公共空间之一。',
            '高迪的色调几乎完全来自材料本身：彩色陶瓷碎片（回收自工厂废料）、石灰石、玄武岩、铁。他让材料自己说话，不掩饰，不伪装。碎瓷拼贴trencadís既是对地中海马赛克传统的延续，也是资源再利用的早期实践。每一块碎片的位置都是工匠在现场决定的，这让高迪的建筑同时具有宏大的几何秩序和即兴的手工温暖。',
          ],
          ja: [
            'ガウディの才能は住宅と都市空間にも同様に発揮された。カサ・バトリョの外壁は龍の鱗と骨格のようであり、屋根は龍の背骨——カタルーニャの守護聖人サン・ジョルディ（聖ゲオルギオス）の龍退治伝説が一つの建築になる。カサ・ミラの波打つ石壁と彫刻のような煙突群は、集合住宅を居住可能な彫刻に変えた。グエル公園の色鮮やかなモザイク・ベンチとジンジャーブレッドのような門番小屋は、もともと田園都市開発プロジェクトだったが、世界で最も陽気な公共空間の一つとなった。',
            'ガウディの色彩はほぼ完全に素材そのものから来る。色ガラスや陶器の破片（工場の廃材からリサイクル）、石灰石、玄武岩、鉄。彼は素材に自ら語らせ、覆い隠さず、偽らない。トゥランカディスは地中海モザイクの伝統の延長であると同時に、資源再利用の初期の実践でもある。一つ一つの破片の位置は職人が現場で決めた。それによってガウディの建築は、壮大な幾何学的秩序と即興的な手仕事の温かさを同時に持つ。',
          ],
          en: [
            'Gaudí\'s genius is equally visible in housing and urban space. Casa Batlló\'s façade evokes dragon scales and bones, its roof a dragon\'s spine — the legend of Saint George and the dragon becomes architecture. Casa Milà\'s undulating stone walls and sculptural chimneys turn an apartment block into habitable sculpture. Park Güell\'s kaleidoscopic mosaic bench and gingerbread gatehouses, originally a garden-city project, became one of the world\'s most joyful public spaces.',
            'Gaudí\'s palette comes almost entirely from material itself: colored ceramic shards (recycled from factory waste), limestone, basalt, iron. He let materials speak, unadorned, unpretending. Trencadís is both a continuation of Mediterranean mosaic tradition and an early practice of resource reuse. Each shard\'s position was decided on-site by craftsmen, giving Gaudí\'s architecture both grand geometric order and improvisational handmade warmth.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'sagrada-familia', note: { zh: '未完成的杰作，高迪为此工作了43年，是哥特式与有机形式的终极融合。', ja: '未完の傑作。ガウディが43年を捧げた、ゴシックと有機的形態の究極の融合。', en: 'An unfinished masterpiece to which Gaudí devoted 43 years — the ultimate fusion of Gothic and organic form.' } },
      { slug: 'casa-batllo', note: { zh: '骨骼般的立面和龙脊屋顶，将加泰罗尼亚传说化为可居住的诗。', ja: '骨格のようなファサードと龍の背骨の屋根。カタルーニャの伝説を居住可能な詩に変える。', en: 'A skeletal façade and dragon-spine roof that turn Catalan legend into habitable poetry.' } },
      { slug: 'casa-mila', note: { zh: '波浪形石质立面与雕塑般的烟囱群，被称为"采石场"的公寓建筑。', ja: '波打つ石のファサードと彫刻のような煙突群。「採石場」と呼ばれる集合住宅。', en: 'Undulating stone façade and sculptural chimneys — the apartment building nicknamed "the quarry."' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Antoni Gaudí', url: 'https://www.britannica.com/biography/Antoni-Gaudi' },
      { title: 'Wikidata: Antoni Gaudí', url: 'https://www.wikidata.org/wiki/Q25328' },
      { title: 'UNESCO: Works of Antoni Gaudí', url: 'https://whc.unesco.org/en/list/320/' },
      { title: 'Sagrada Família Foundation', url: 'https://sagradafamilia.org/en/' },
    ],
  },

  'gropius': {
    slug: 'gropius',
    summary: {
      zh: '瓦尔特·格罗皮乌斯（Walter Gropius, 1883–1969）是现代建筑教育最具影响力的改革者。他于1919年创立包豪斯，将艺术、工艺与工业置于同一框架下，彻底改变了建筑师和设计师的培养方式。他的建筑实践从玻璃幕墙工厂到预制住宅系统，始终追问同一个问题：设计如何服务于更广泛的社会？',
      ja: 'ヴァルター・グロピウス（Walter Gropius, 1883–1969）は近代建築教育の最も影響力ある改革者である。1919年にバウハウスを創設し、芸術・工芸・工業を同一の枠組みに置くことで、建築家とデザイナーの養成方法を根本から変えた。彼の建築実践はガラスカーテンウォール工場からプレハブ住宅システムに至るまで、一貫して同じ問いを追う——デザインはいかにしてより広い社会に奉仕できるか。',
      en: 'Walter Gropius (1883–1969) was modern architectural education\'s most influential reformer. In founding the Bauhaus in 1919, he placed art, craft, and industry within a single framework, transforming how architects and designers are trained. His built work — from glass-curtain factories to prefabricated housing systems — kept asking: how can design serve the broader society?',
    },
    core_ideas: {
      zh: [
        '艺术与技术的新统一——打破艺术家与工匠的等级界限，让车间成为创造的共同场所',
        '建筑是总体艺术（Gesamtkunstwerk）——所有设计学科在建筑的统领下协作，从茶壶到城市',
        '为大众建造——标准化、预制化不是创造力的敌人，而是让好设计抵达更多人的途径',
        '教育即变革——包豪斯不只是一所学校，而是一种新的设计文化的孵化器',
      ],
      ja: [
        '芸術と技術の新しい統一——芸術家と職人の階級的境界を打ち破り、工房を創造の共同の場とする',
        '建築は総合芸術（Gesamtkunstwerk）——ティーポットから都市まで、すべてのデザイン分野が建築の統率のもとに協働する',
        '大衆のための建設——標準化・プレハブ化は創造性の敵ではなく、良いデザインをより多くの人に届ける方法である',
        '教育こそ変革——バウハウスは単なる学校ではなく、新しいデザイン文化の孵化器である',
      ],
      en: [
        'A new unity of art and technology — breaking the hierarchical boundary between artist and craftsman, making the workshop a shared creative space',
        'Architecture as Gesamtkunstwerk — all design disciplines collaborate under architecture\'s leadership, from teapot to city',
        'Building for the masses — standardization and prefabrication are not enemies of creativity but ways to bring good design to more people',
        'Education as transformation — the Bauhaus was not just a school but an incubator for a new design culture',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/97/WalterGropius-1919.jpg',
      author: 'Louis Held',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:WalterGropius-1919.jpg',
      alt: { zh: '瓦尔特·格罗皮乌斯肖像，约1919年', ja: 'ヴァルター・グロピウスの肖像、1919年頃', en: 'Portrait of Walter Gropius, c. 1919' },
    },
    sections: [
      {
        title: { zh: '包豪斯：一所改变世界的学校', ja: 'バウハウス：世界を変えた学校', en: 'The Bauhaus: A school that changed the world' },
        paragraphs: {
          zh: [
            '1919年，格罗皮乌斯在魏玛将萨克森大公艺术学院与工艺美术学校合并为"国立包豪斯"。这个决定本身就是一个宣言：艺术不是高于工艺的高雅活动，而是与手工和工业生产平等相通的创造性劳动。他在《包豪斯宣言》中写道："建筑师、雕塑家、画家，我们都必须回到手工艺。"',
            '包豪斯的教育体系以"初步课程"（Vorkurs）为起点，由伊顿、莫霍利-纳吉、阿尔伯斯等人授课，随后学生进入各工作坊——木工、金属、陶瓷、壁画、纺织、舞台。格罗皮乌斯的创举在于：每个工作坊由一位"形式大师"（艺术家）和一位"工艺大师"（匠人）共同指导，确保学生在材料和思想两个维度上都得到训练。',
            '1925年包豪斯迁至德绍，格罗皮乌斯设计的包豪斯校舍成为现代建筑史上的里程碑——三个功能体块（工作室翼楼、教学楼、宿舍）通过连廊组织在一起，玻璃幕墙首次作为主要建筑表皮大规模使用，钢铁框架清晰可读。这栋建筑本身就是包豪斯教学理念的物化：透明、理性、功能清晰、没有多余的装饰。',
          ],
          ja: [
            '1919年、グロピウスはヴァイマルでザクセン大公美術学校と工芸学校を合併し「国立バウハウス」とした。この決定自体が宣言である——芸術は工芸より高尚な営みではなく、手仕事や工業生産と平等に通じる創造的労働である。彼は『バウハウス宣言』に書いた：「建築家、彫刻家、画家、われわれはみな手工芸に立ち返らなければならない。」',
            'バウハウスの教育体系は「予備課程」（Vorkurs）を起点とし、イッテン、モホイ＝ナジ、アルバースらが教えた後、学生は各工房——木工、金属、陶芸、壁画、織物、舞台——に進む。グロピウスの独創は、各工房が「形態マイスター」（芸術家）と「工芸マイスター」（職人）の共同指導のもとに置かれ、学生が素材と思想の両方の次元で訓練される点にある。',
            '1925年にバウハウスはデッサウに移転し、グロピウス設計のバウハウス校舎は近代建築史の里程標となる——三つの機能ブロック（工作室棟、教室棟、宿舍）が渡り廊下で結ばれ、ガラスカーテンウォールが主要な建築外皮として初めて大規模に使用され、鉄骨フレームが明快に読み取れる。この建物自体がバウハウスの教育理念の体現である——透明、理性的、機能が明快で、余計な装飾がない。',
          ],
          en: [
            'In 1919, Gropius merged the Grand-Ducal Saxon Academy of Fine Art and the School of Arts and Crafts in Weimar into the "Staatliches Bauhaus." The decision was itself a manifesto: art is not an elevated activity above craft but creative labor continuous with handwork and industrial production. He wrote in the Bauhaus Manifesto: "Architects, sculptors, painters — we must all return to craftsmanship."',
            'The Bauhaus curriculum began with the Vorkurs (preliminary course), taught by Itten, Moholy-Nagy, Albers, and others, after which students entered workshops — wood, metal, ceramics, mural painting, weaving, stage. Gropius\'s innovation: each workshop was co-led by a "Form Master" (artist) and a "Craft Master" (craftsman), ensuring students were trained in both material and conceptual dimensions.',
            'In 1925 the Bauhaus moved to Dessau, and Gropius\'s Bauhaus Building became a milestone — three functional blocks (workshop wing, classroom block, dormitory) linked by bridges, with a glass curtain wall used at scale as primary building skin for the first time, the steel frame legible. The building itself embodies Bauhaus pedagogy: transparent, rational, functionally clear, without superfluous ornament.',
          ],
        },
      },
      {
        title: { zh: '从工厂到住宅：现代性的类型学', ja: '工場から住宅へ：近代性の類型学', en: 'From factory to dwelling: A typology of modernity' },
        paragraphs: {
          zh: [
            '在包豪斯成立之前，格罗皮乌斯已经完成了现代建筑史上的两个先例。1911年的法古斯工厂与阿道夫·迈耶合作，首次将玻璃幕墙从结构柱上悬挑出来——转角处没有柱子，只有玻璃，这一处理后来成为现代办公建筑的通用语汇。1914年的德意志制造联盟展览会模范工厂，进一步将钢铁、玻璃和砖的工业语言推向纪念碑性。',
            '包豪斯关闭后，格罗皮乌斯对住宅问题的关注更为系统性。他认为，标准化不是单调，而是让良好设计可复制的条件。他设计的铜板住宅（Kupferhaus）预制系统尝试将建筑变成可运输的工业产品。在德绍-特尔滕的包豪斯住宅区，他实践了低层高密度联排住宅的理性布局。',
          ],
          ja: [
            'バウハウス設立以前に、グロピウスはすでに近代建築史の二つの先例を完成させていた。1911年のファグス工場（アドルフ・マイヤーとの協働）では、初めてガラスカーテンウォールを構造柱から片持ちにした——角部に柱はなく、ガラスだけ。この処理は後に近代オフィス建築の共通語彙となった。1914年のドイツ工作連盟博覧会模範工場は、鉄・ガラス・レンガの工業言語をさらに記念碑性へと押し進めた。',
            'バウハウス閉鎖後、グロピウスの住宅問題への関心はより体系的になった。彼にとって標準化は単調さではなく、良質な設計を複製可能にする条件である。彼のクプファーハウス（銅板住宅）プレハブシステムは、建築を輸送可能な工業製品に変えようとする試みだった。デッサウ＝テルテンのバウハウス住宅団地では、低層高密度テラスハウスの合理的配置を実践した。',
          ],
          en: [
            'Before founding the Bauhaus, Gropius had already completed two precedents of modern architecture. The 1911 Fagus Factory, with Adolf Meyer, was the first building where the glass curtain wall cantilevered past structural columns — no column at the corner, only glass, a treatment that later became the lingua franca of modern office buildings. The 1914 model factory for the Deutscher Werkbund Exhibition further pushed the industrial language of steel, glass, and brick toward monumentality.',
            'After the Bauhaus closed, Gropius\'s engagement with housing became more systematic. He saw standardization not as monotony but as the condition for replicating good design. His Kupferhaus prefabricated system attempted to turn buildings into transportable industrial products. At the Törten estate in Dessau, he practiced the rational layout of low-rise, high-density row houses.',
          ],
        },
      },
      {
        title: { zh: '美国岁月与现代主义的全球化', ja: 'アメリカ時代とモダニズムのグローバル化', en: 'American years and the globalization of modernism' },
        paragraphs: {
          zh: [
            '1937年，格罗皮乌斯为躲避纳粹政权移居美国，出任哈佛大学设计研究生院建筑系主任。他在美国培养了一代现代主义建筑师，包括贝聿铭、菲利普·约翰逊等人。他于1946年创立的"建筑师协作组"（The Architects Collaborative, TAC）实践了一种民主化的建筑设计模式——没有明星建筑师，只有平等的合伙人。',
            '他在美国最个人化的作品是位于马萨诸塞州林肯市的格罗皮乌斯自宅（1938年）。这栋白墙平顶的房子将包豪斯的形式语言与新英格兰的地方传统——白漆木板、石墙基座、木格栅——融合在一起。格罗皮乌斯坚持住宅中使用美国本地材料和技术，没有简单复制欧洲的现代主义。哈佛大学研究生中心（1950年）和波士顿的肯尼迪联邦大楼则是他晚期公共建筑的代表。',
          ],
          ja: [
            '1937年、グロピウスはナチス政権を逃れてアメリカに移住し、ハーバード大学デザイン大学院の建築学科長に就任した。彼はアメリカで一世代の近代建築家——I・M・ペイ、フィリップ・ジョンソンら——を育てた。1946年に設立した「建築家コラボレーティブ」（TAC）は、民主的な建築設計モードを実践した——スタープレイヤーはおらず、平等なパートナーだけがいる。',
            'アメリカで最も個人的な作品は、マサチューセッツ州リンカンのグロピウス自邸（1938年）である。白壁と陸屋根のこの家は、バウハウスの形式言語とニューイングランドの地域伝統——白ペンキの板張り、石積みの基壇、木製ルーバー——を融合させた。グロピウスはアメリカの地場材料と技術の使用にこだわり、ヨーロッパのモダニズムを単純に複製しなかった。ハーバード大学大学院センター（1950年）とボストンのケネディ連邦ビルは、晩年の公共建築を代表する。',
          ],
          en: [
            'In 1937, fleeing the Nazi regime, Gropius moved to the United States and became chair of the architecture department at Harvard\'s Graduate School of Design. He educated a generation of modernist architects in America, including I. M. Pei and Philip Johnson. The Architects Collaborative (TAC), which he co-founded in 1946, practiced a democratic mode of architectural design — no star architect, only equal partners.',
            'His most personal American work is the Gropius House (1938) in Lincoln, Massachusetts. The white-walled, flat-roofed house merged Bauhaus formal language with New England vernacular traditions — white-painted clapboard, stone plinth, wooden trellis. Gropius insisted on using local American materials and techniques, refusing to simply replicate European modernism. The Harvard Graduate Center (1950) and Boston\'s Kennedy Federal Building represent his late public work.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'bauhaus-dessau', note: { zh: '包豪斯理念的建筑化身，玻璃幕墙工作室翼楼和清晰的体块组织定义了现代建筑教育空间。', ja: 'バウハウス理念の建築的体現。ガラスカーテンウォールの工作室棟と明快なヴォリューム構成が近代建築教育空間を定義した。', en: 'The architectural embodiment of Bauhaus ideals — a glass-curtain workshop wing that defined modern educational space.' } },
      { slug: 'gropius-house', note: { zh: '格罗皮乌斯在美国的自宅，将欧洲现代主义与新英格兰乡土传统融为一体。', ja: 'アメリカにおけるグロピウスの自邸。ヨーロッパのモダニズムとニューイングランドの郷土伝統を融合。', en: 'Gropius\'s own American home, merging European modernism with New England vernacular.' } },
      { slug: 'fagus-factory', note: { zh: '最早的现代工业建筑之一，玻璃转角开创了全新的建筑语言。', ja: '最初期の近代工業建築の一つ。ガラスのコーナーが新しい建築言語を切り開いた。', en: 'One of the earliest modern industrial buildings — the glass corner opened a new architectural language.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Walter Gropius', url: 'https://www.britannica.com/biography/Walter-Gropius' },
      { title: 'Wikidata: Walter Gropius', url: 'https://www.wikidata.org/wiki/Q61028' },
      { title: 'Bauhaus Dessau Foundation', url: 'https://www.bauhaus-dessau.de/en/' },
      { title: 'Historic New England: Gropius House', url: 'https://www.historicnewengland.org/property/gropius-house/' },
    ],
  },

  'sullivan': {
    slug: 'sullivan',
    summary: {
      zh: '路易斯·沙利文（Louis Sullivan, 1856–1924）常被称为"摩天楼之父"和现代美国建筑的第一位大师。他的著名口号"形式追随功能"影响了整个二十世纪的设计思想。但沙利文远不只是口号的提出者：他在芝加哥大火后的重建浪潮中定义了高层建筑的语言，他的铸铁装饰达到了植物学般的精密，而他晚年孤独的写作则为建筑赋予了哲学深度。',
      ja: 'ルイス・サリヴァン（Louis Sullivan, 1856–1924）はしばしば「超高層ビルの父」、近代アメリカ建築の最初の巨匠と呼ばれる。彼の有名な標語「形態は機能に従う」は20世紀デザイン思想全体に影響を与えた。しかしサリヴァンは標語の提唱者にとどまらない——彼はシカゴ大火後の再建の波のなかで高層建築の言語を定義し、彼の鋳鉄装飾は植物学のような精密さに達し、晩年の孤独な執筆は建築に哲学的深みを与えた。',
      en: 'Louis Sullivan (1856–1924) is often called the "father of the skyscraper" and the first master of modern American architecture. His famous dictum "form follows function" influenced an entire century of design thinking. But Sullivan was far more than a slogan-maker: he defined the language of the tall building in post-fire Chicago, his cast-iron ornament approached botanical precision, and his late, lonely writings gave architecture philosophical depth.',
    },
    core_ideas: {
      zh: [
        '形式追随功能——但不是功能主义。功能包括精神、情感和社会的需要，建筑应对此作出回应',
        '摩天楼的三段式法则——基座（商店/公共）、主干（重复办公层）、冠部（设备/收束），这一法则统治了百年高层建筑',
        '有机装饰——装饰不应是附加的图案，而应从建筑的结构和材料中自然生长，像植物的花叶一样',
        '民主建筑的理想——沙利文相信好的建筑不是精英的奢侈品，而应成为美国城市日常生活的基础',
      ],
      ja: [
        '形態は機能に従う——しかし機能主義ではない。機能には精神的、感情的、社会的な必要が含まれ、建築はこれらに応答すべきである',
        '超高層の三段構成——基部（商店・公共）、幹部（繰り返されるオフィス階）、冠部（設備・終結）。この法則は100年にわたり高層建築を支配した',
        '有機的装飾——装飾は付加的な図案ではなく、建築の構造と素材から自然に成長すべきであり、植物の花や葉のように',
        '民主的建築の理想——サリヴァンは良い建築がエリートの贅沢品ではなく、アメリカ都市の日常生活の基盤となるべきだと信じた',
      ],
      en: [
        'Form follows function — but not functionalism. Function includes spiritual, emotional, and social needs, to which architecture should respond',
        'The tripartite skyscraper — base (shops/public), shaft (repeating office floors), capital (mechanical/termination). This law governed tall buildings for a century',
        'Organic ornament — ornament should not be applied pattern but must grow naturally from the building\'s structure and materials, like a plant\'s flower and leaf',
        'Democratic architecture — Sullivan believed good architecture should not be an elite luxury but the foundation of everyday life in American cities',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Louis_Sullivan_circa_1895.jpg',
      author: 'Unknown',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Louis_Sullivan_circa_1895.jpg',
      alt: { zh: '路易斯·沙利文肖像，约1895年', ja: 'ルイス・サリヴァンの肖像、1895年頃', en: 'Portrait of Louis Sullivan, c. 1895' },
    },
    sections: [
      {
        title: { zh: '芝加哥：摩天楼的诞生地', ja: 'シカゴ：超高層ビルの誕生地', en: 'Chicago: Birthplace of the skyscraper' },
        paragraphs: {
          zh: [
            '1871年的芝加哥大火几乎摧毁了整个市中心，却为一代建筑师创造了前所未有的机会。钢铁框架结构、电梯和防火技术的成熟使建筑可以向上生长。年轻的沙利文在威廉·勒巴隆·詹尼的事务所工作后，与丹克马尔·阿德勒合伙，开始了定义摩天楼类型的十年。',
            '1891年的温赖特大楼是沙利文成熟的摩天楼语言的第一座完整表达。红砖与赤陶的外立面被清晰划分为三个水平区域：底层的商店橱窗、中间七层统一的办公窗带、顶层的装饰冠部及檐口。垂直的壁柱穿过中间楼层，强调建筑向上的运动。这种"基座—主干—冠部"的三段式构图成为此后数十年高层建筑的默认公式。',
          ],
          ja: [
            '1871年のシカゴ大火はダウンタウンのほぼ全体を破壊したが、一世代の建築家にかつてない機会をもたらした。鉄骨フレーム構造、エレベーター、防火技術の成熟により、建築は上方へ成長できるようになった。若きサリヴァンはウィリアム・ル・バロン・ジェニーの事務所で働いた後、ダンクマール・アドラーと共同事務所を開き、超高層ビルという類型を定義する10年が始まる。',
            '1891年のウェインライト・ビルは、サリヴァンの成熟した超高層言語の最初の完全な表現である。赤レンガとテラコッタのファサードは三つの水平領域にはっきりと分割される——最下部の店舗ショーウィンドウ、中間7層の統一されたオフィス窓帯、最上部の装飾コーニス。垂直のピラスターが中間層を貫き、建物の上方への運動を強調する。この「基部—幹部—冠部」の三段構成は、その後数十年にわたって高層建築のデフォルトの公式となった。',
          ],
          en: [
            'The Great Chicago Fire of 1871 destroyed nearly the entire downtown but created unprecedented opportunity for a generation of architects. Steel-frame construction, elevators, and fireproofing matured, enabling buildings to grow upward. Young Sullivan, after working in William Le Baron Jenney\'s office, partnered with Dankmar Adler and began the decade that would define the skyscraper type.',
            'The 1891 Wainwright Building is the first complete expression of Sullivan\'s mature skyscraper language. The red brick and terracotta façade is clearly divided into three horizontal zones: shop windows at the base, seven unified office window bands in the middle, and a decorative cornice at the top. Vertical pilasters pierce the middle floors, emphasizing upward movement. This "base—shaft—capital" tripartite composition became the default formula for tall buildings for decades.',
          ],
        },
      },
      {
        title: { zh: '"形式追随功能"的真意', ja: '「形態は機能に従う」の真意', en: 'The true meaning of "form follows function"' },
        paragraphs: {
          zh: [
            '这句口号常被简化为功能主义的信条，但沙利文的本意远比此复杂。他在1896年的文章《从艺术角度思考高层办公建筑》中写道："这是一条渗透在所有事物中的法则——有机的和无机的，物理的和形而上的，人的和超人的——形式永远追随功能，这是法则。"',
            '对于沙利文，"功能"不仅指实用功能，也包括精神表达。一座建筑需要满足其实际用途，同时也需要通过形式传达某种更高的秩序。这正是他坚持在摩天楼上使用装饰的原因——不是外加的修饰，而是结构逻辑在表面的自然开花。卡森·皮里·斯科特大楼转角入口处的铸铁装饰——卷曲的藤蔓、交织的几何图案——是沙利文装饰哲学的巅峰：它们标记着入口，引导着视线，使钢框架建筑拥有了面孔和表情。',
          ],
          ja: [
            'この標語はしばしば機能主義の教義に単純化されるが、サリヴァンの本来の意図ははるかに複雑である。彼は1896年の論文「芸術的観点から見た高層オフィス建築」にこう書いた：「これは万物に浸透する法則である——有機的および無機的なもの、物理的および形而上学的なもの、人間的および超人間的なもの——形態は永遠に機能に従う。これが法則だ。」',
            'サリヴァンにとって「機能」は実用的機能だけでなく、精神的表現をも含む。建築はその実際の用途を満たすと同時に、形式を通じて何らかのより高い秩序を伝えなければならない。これこそが彼が超高層ビルに装飾を用い続けた理由である——付加的な飾りではなく、構造論理が表面において自然に開花したもの。カーソン・ピリー・スコットの角入口の鋳鉄装飾——巻きつく蔓、織り交ざる幾何学模様——はサリヴァンの装飾哲学の頂点である。それらは入口を標示し、視線を導き、鉄骨フレームの建物に顔と表情を与えている。',
          ],
          en: [
            'The slogan is often reduced to a functionalist doctrine, but Sullivan\'s intent was far more complex. In his 1896 essay "The Tall Office Building Artistically Considered," he wrote: "It is the pervading law of all things organic and inorganic, of all things physical and metaphysical, of all things human and all things superhuman — that form ever follows function. This is the law."',
            'For Sullivan, "function" encompassed not only practical use but spiritual expression. A building must fulfill its practical purpose while also communicating a higher order through form. This is why he insisted on ornament on skyscrapers — not applied decoration but the natural flowering of structural logic at the surface. The cast-iron ornament at Carson Pirie Scott\'s corner entrance — curling tendrils, interwoven geometries — is the peak of Sullivan\'s ornamental philosophy: they mark the entrance, guide the eye, and give a steel-frame building a face.',
          ],
        },
      },
      {
        title: { zh: '晚期：孤独的天才与弗兰克·劳埃德·赖特', ja: '晩年：孤独な天才とフランク・ロイド・ライト', en: 'Late years: The lonely genius and Frank Lloyd Wright' },
        paragraphs: {
          zh: [
            '1900年之后，沙利文的事业急剧下滑。芝加哥的品味转向了新古典主义和历史风格，他的有机装饰和现代主义立场不再受客户青睐。他与阿德勒的合伙关系在1895年结束，此后大型项目越来越少。但正是在这段边缘时期，沙利文完成了两件小而精的杰作：中西部的系列小银行，以及一系列建筑哲学著作。',
            '沙利文对弗兰克·劳埃德·赖特的影响深远。赖特在沙利文的事务所工作了六年，称他为"大师"（Lieber Meister），终生承认自己在空间流动性和有机装饰上的理念来源于沙利文。然而两位建筑师的命运截然不同——赖特走向了漫长的辉煌，而沙利文在贫困和酒精中度过晚年。1924年他去世时几乎已被遗忘，直到现代主义史学家重新发现他的贡献，将他确立为现代建筑谱系中无可替代的源头。',
          ],
          ja: [
            '1900年以降、サリヴァンの仕事は急激に減少した。シカゴの趣味は新古典主義と歴史様式へと向かい、彼の有機的装飾と近代主義的立場はクライアントに好まれなくなった。アドラーとの共同事業は1895年に終了し、以後大きなプロジェクトはますます減っていった。しかしこの周縁期にこそ、サリヴァンは二つの小さく洗練された傑作——中西部の一連の小銀行と、一連の建築哲学の著作——を完成させた。',
            'サリヴァンのフランク・ロイド・ライトへの影響は深い。ライトはサリヴァンの事務所で6年間働き、彼を「リーベ・マイスター」（親愛なる巨匠）と呼び、空間の流動性と有機的装飾に関する理念がサリヴァンに由来することを生涯認めていた。しかし二人の建築家の運命はまったく異なった——ライトは長い栄光の道を歩み、サリヴァンは貧困とアルコールのうちに晩年を過ごした。1924年に亡くなった時、彼はほぼ忘れられていたが、後に近代主義の歴史家たちが彼の貢献を再発見し、近代建築の系譜において代替不可能な源泉として位置づけた。',
          ],
          en: [
            'After 1900, Sullivan\'s career declined sharply. Chicago\'s taste turned toward Neoclassicism and historical styles; his organic ornament and modernist stance ceased to attract clients. His partnership with Adler ended in 1895, and major commissions dwindled. Yet it was in this marginal period that Sullivan produced two kinds of small masterpieces: a series of jewel-like banks across the Midwest, and a body of architectural-philosophical writings.',
            'Sullivan\'s influence on Frank Lloyd Wright was profound. Wright worked in Sullivan\'s office for six years, called him "Lieber Meister" (Dear Master), and acknowledged throughout his life that his ideas on spatial flow and organic ornament came from Sullivan. Yet their fates diverged — Wright walked the long path of glory, while Sullivan spent his final years in poverty and alcohol. When he died in 1924 he was nearly forgotten, until modernist historians rediscovered his contribution and placed him as the irreplaceable origin in the genealogy of modern architecture.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'wainwright-building', note: { zh: '早期摩天楼美学的宣言，三段式立面的典范，定义了高层建筑的类型语言。', ja: '初期超高層美学の宣言。三段構成ファサードの模範が高層建築の類型言語を定義した。', en: 'A manifesto of early skyscraper aesthetics — the tripartite façade defined the language of the tall building.' } },
      { slug: 'auditorium-building', note: { zh: '巨型多功能建筑，结合剧院、酒店和办公，Sullivan & Adler的巅峰合作。', ja: '劇場、ホテル、オフィスを結合した巨大複合建築。サリヴァン＆アドラーの共同事業の頂点。', en: 'A colossal mixed-use building combining theater, hotel, and offices — the peak of Sullivan & Adler.' } },
      { slug: 'carson-pirie-scott', note: { zh: '转角入口的铸铁藤蔓装饰是 Sullivan 有机装饰理念的终极表达。', ja: '角入口の鋳鉄の蔓模様は、サリヴァンの有機的装飾理念の究極の表現。', en: 'Cast-iron tendrils at the corner entrance are the ultimate expression of Sullivan\'s organic ornament.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Louis Sullivan', url: 'https://www.britannica.com/biography/Louis-Sullivan' },
      { title: 'Wikidata: Louis Sullivan', url: 'https://www.wikidata.org/wiki/Q333354' },
      { title: 'The Art Institute of Chicago: Sullivan Collection', url: 'https://www.artic.edu/archival-collections/louis-sullivan' },
      { title: 'Sullivan, "The Tall Office Building Artistically Considered" (1896)', url: 'https://archive.org/details/tallofficebuildi00sull' },
    ],
  },

  'eero-saarinen': {
    slug: 'eero-saarinen',
    summary: {
      zh: '埃罗·沙里宁（Eero Saarinen, 1910–1961）是现代建筑中最具雕塑感的造型家。他拒绝为自己建立可辨识的"风格"，坚持每个项目都应根据其独特的功能和场所找到独一无二的形式。从TWA航站楼的混凝土飞翼到圣路易斯大拱门的不锈钢弧线，从麻省理工学院小教堂的砖砌圆柱到杜勒斯机场的悬索屋顶，他的每一座建筑都是一次形态的重新发明。他51岁因脑瘤早逝，留下的作品却成为美国世纪最具雄心的建筑宣言。',
      ja: 'エーロ・サーリネン（Eero Saarinen, 1910–1961）は近代建築において最も彫塑的な造形家である。彼は自らに識別可能な「様式」を確立することを拒否し、各プロジェクトがその固有の機能と場所に応じて唯一無二の形態を見出すべきだと主張した。TWAターミナルのコンクリートの翼、セントルイス大アーチのステンレス鋼の弧、MIT礼拝堂のレンガの円筒、ダレス空港の吊り屋根——そのひとつひとつが形態の再発明である。51歳で脳腫瘍により早世したが、残された作品群はアメリカの世紀で最も野心的な建築宣言となった。',
      en: 'Eero Saarinen (1910–1961) was modern architecture\'s most sculptural form-giver. He refused to establish a recognizable "style," insisting each project should find its one-of-a-kind form according to its unique function and place. From the concrete wings of the TWA Terminal to the stainless-steel arc of the Gateway Arch, from the brick cylinder of the MIT Chapel to the suspended roof of Dulles Airport — each building was a formal reinvention. He died of a brain tumor at 51, yet his works remain the American century\'s most ambitious architectural statements.',
    },
    core_ideas: {
      zh: [
        '每个项目都是新发明——拒绝重复自己，每次设计都从零开始寻找适合的形式',
        '结构即雕塑——薄壳混凝土、悬索屋顶、不锈钢拱，结构行为本身成为建筑的表现力',
        '技术为人服务——拥抱工程前沿不是为了炫耀技术，而是为了创造更具感染力的空间体验',
        '从父亲遗产中走出——作为埃利尔·沙里宁的儿子，他必须在现代主义的国际风格之外找到自己的语言',
      ],
      ja: [
        '各プロジェクトは新たな発明——自己反復を拒否し、毎回ゼロから適切な形態を探す',
        '構造が彫刻である——薄殻コンクリート、吊り屋根、ステンレス鋼アーチ、構造の振る舞い自体が建築の表現力となる',
        '技術は人のために——工学的フロンティアへの取り組みは技術誇示のためではなく、より感染力のある空間体験を生み出すため',
        '父の遺産からの脱却——エリエル・サーリネンの息子として、彼はモダニズムの国際様式の外側に自らの言語を見つけなければならなかった',
      ],
      en: [
        'Each project a new invention — refusing self-repetition, finding the right form from scratch each time',
        'Structure as sculpture — thin-shell concrete, suspended roofs, stainless-steel arches: structural behavior itself becomes architectural expression',
        'Technology in service of people — embracing engineering frontiers not for display but to create more emotionally powerful spatial experiences',
        'Stepping out of his father\'s shadow — as Eliel Saarinen\'s son, he had to find his own language beyond the International Style of modernism',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Eero_Saarinen.jpg',
      author: 'Unknown (work for hire, US government)',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Eero_Saarinen.jpg',
      alt: { zh: '埃罗·沙里宁肖像', ja: 'エーロ・サーリネンの肖像', en: 'Portrait of Eero Saarinen' },
    },
    sections: [
      {
        title: { zh: '拒绝重复：每个建筑都是新发明', ja: '反復の拒否：建築は毎回新しい発明', en: 'Refusing to repeat: Each building a new invention' },
        paragraphs: {
          zh: [
            '沙里宁的设计方法论与现代主义主流背道而驰。当密斯·凡·德·罗在追求可适用于任何场地的通用空间时，沙里宁在每一个项目简报面前都像第一次面对建筑问题。他曾说："我总是试图寻找属于这个特定问题的建筑。"这种态度让他的作品集看起来像是一群不同建筑师的合集，而不是一个人的产物。',
            '通用汽车技术中心（1956年）的低平玻璃幕墙和精确的模块化网格，麦格雷戈纪念会议中心（1958年）的曲面混凝土屋顶，耶鲁大学英格尔斯冰球场（1958年）的悬索拱脊——这些建筑之间唯一的共同点是它们都不可互换。沙里宁证明了：建筑的多样性不是弱点，而是一种哲学立场。',
          ],
          ja: [
            'サーリネンの設計方法論は近代主義の主流に逆行する。ミース・ファン・デル・ローエがあらゆる敷地に適用可能な普遍空間を追求した時、サーリネンは各プロジェクト概要の前に、まるで初めて建築問題に直面するかのように立った。「私はいつも、この特定の問題に属する建築を見つけようとしている」と彼は語った。この態度によって彼の作品集は、一人の産物というより異なる建築家たちの集合のように見える。',
            'GMテクニカルセンター（1956年）の低く水平なガラスカーテンウォールと正確なモジュラーグリッド、マクレガー記念会議センター（1958年）の曲線コンクリート屋根、エール大学インガルス・アイスリンク（1958年）の吊りケーブルのアーチ形の背——これらの建築に共通する唯一の点は、どれも交換不可能であることだ。サーリネンは証明した——建築の多様性は弱点ではなく、ひとつの哲学的立場である。',
          ],
          en: [
            'Saarinen\'s design methodology ran against the modernist mainstream. While Mies van der Rohe pursued the universal space applicable to any site, Saarinen approached each brief as if encountering architecture for the first time. "I always try to find the architecture that belongs to this particular problem," he said. This attitude makes his portfolio look like a collection of different architects rather than one person\'s output.',
            'The low glass curtain wall and precise modular grid of the GM Technical Center (1956), the curved concrete roof of the McGregor Memorial Conference Center (1958), the suspended-cable arch of Yale\'s Ingalls Rink (1958) — the only thing these buildings share is that none is interchangeable. Saarinen proved that architectural diversity is not a weakness but a philosophical stance.',
          ],
        },
      },
      {
        title: { zh: '飞行时代的建筑：TWA航站楼', ja: '飛行時代の建築：TWAターミナル', en: 'Architecture of the jet age: The TWA Terminal' },
        paragraphs: {
          zh: [
            '1962年落成的纽约肯尼迪机场TWA航站楼是沙里宁最具标志性的作品。四片薄壳混凝土壳体从中心点向外展开，像一只即将起飞的大鸟，内部空间在没有任何柱子的情况下自由流动。这不是在功能之外附加的雕塑——壳体本身就是屋顶、墙壁和结构，三者合一。',
            'TWA航站楼捕捉了喷气时代的乐观精神：飞行是奇迹，机场不应只是机器，而应是奇迹发生的场所。沙里宁将混凝土——一种通常被视为沉重的材料——塑造成仿佛失重般的形态。乘客从登机通道到候机室的流线被组织成一条连续的曲线，没有直角，没有断裂。这是功能主义与雕塑想象力的完美结合，也是沙里宁短暂生涯中最壮丽的乐章。',
          ],
          ja: [
            '1962年に完成したニューヨークJFK空港のTWAターミナルは、サーリネンの最も象徴的な作品である。四枚の薄殻コンクリートが中心点から外側へ展開し、今まさに飛び立とうとする大きな鳥のように、内部空間は柱を一本も使わずに自由に流動する。これは機能の上に付け加えられた彫刻ではない——殻そのものが屋根であり、壁であり、構造であり、三つが一体となっている。',
            'TWAターミナルはジェット時代の楽観的精神を捉えた。飛行は奇跡であり、空港は単なる機械ではなく奇跡が起こる場所であるべきだ。サーリネンはコンクリート——通常は重い素材とみなされるもの——を、まるで無重力であるかのような形に塑造した。搭乗通路から待合室までの乗客の流線は、直角も途切れもない一本の連続曲線として組織されている。これは機能主義と彫塑的想像力の完璧な結合であり、サーリネンの短い生涯で最も壮麗な楽章である。',
          ],
          en: [
            'The TWA Terminal at New York\'s JFK Airport, completed in 1962, is Saarinen\'s most iconic work. Four thin-shell concrete vaults spread outward from a central point like a bird about to take flight; the interior flows freely without a single column. This is not sculpture added to function — the shell is roof, wall, and structure, all in one.',
            'The TWA Terminal captured the optimism of the jet age: flight was miraculous, and airports should be places where miracles happen, not mere machines. Saarinen shaped concrete — normally associated with heaviness — into forms that appear weightless. The passenger flow from boarding corridor to waiting lounge is organized as a continuous curve, no right angles, no breaks. It is the perfect union of functionalism and sculptural imagination, and the most magnificent movement in Saarinen\'s brief career.',
          ],
        },
      },
      {
        title: { zh: '从大拱门到杜勒斯：公共尺度的雕塑', ja: '大アーチからダレスへ：公共スケールの彫刻', en: 'From the Arch to Dulles: Sculpture at public scale' },
        paragraphs: {
          zh: [
            '圣路易斯的杰斐逊国家扩张纪念碑——即"大拱门"（Gateway Arch, 1965年）——或许是沙里宁最纯粹的雕塑概念。一座630英尺（192米）高的不锈钢悬链线拱门矗立在密西西比河畔，没有内部功能（除了观景缆车），没有参照的历史样式，只有一道在地平线上切割天空的弧线。这座纪念碑提出了一种激进的可能性：建筑可以是纯粹的形式，而形式本身就足以承载意义。',
            '华盛顿杜勒斯国际机场（1962年）则展示了另一种野心：用技术重新定义大型公共建筑的类型。倾斜的柱子支撑起悬索混凝土屋顶，像吊桥一样向外拉开。沙里宁为杜勒斯设计了"移动休息室"——可在停机坪上行驶的大型客运车辆，将乘客从候机楼直接运送到飞机旁。这个想法虽然在商业上未能普及，但它反映了沙里宁一贯的追求：好的设计不仅关乎外观，也关乎它如何工作。',
          ],
          ja: [
            'セントルイスのジェファソン国立拡大記念碑——「ゲートウェイ・アーチ」（1965年）——はおそらくサーリネンの最も純粋な彫刻的コンセプトである。高さ630フィート（192メートル）のステンレス鋼カテナリーアーチがミシシッピ川のほとりに立ち、内部機能は（展望ゴンドラを除いて）なく、参照した歴史様式もなく、ただ地平線上の空を切り裂く弧があるだけだ。この記念碑はひとつの急進的な可能性を提起した——建築は純粋な形式であり得、形式それ自体が意味を担うに十分であると。',
            'ワシントン・ダレス国際空港（1962年）は別の野心を示す——技術によって大規模公共建築の類型を再定義すること。傾いた柱が吊りコンクリート屋根を支え、吊り橋のように外側へ引っ張られる。サーリネンはダレスのために「モバイル・ラウンジ」——エプロンを走行できる大型の客室車両で、旅客をターミナルから直接飛行機のそばまで運ぶ——を設計した。このアイデアは商業的には普及しなかったが、サーリネンの一貫した追求を反映している——良いデザインは外観だけでなく、それがどう働くかも問う。',
          ],
          en: [
            'The Gateway Arch (1965) in St. Louis — the Jefferson National Expansion Memorial — is perhaps Saarinen\'s purest sculptural concept. A 630-foot stainless-steel catenary arch stands on the bank of the Mississippi, with no interior program (save observation trams), no referenced historical style, just an arc cutting the sky at the horizon. The monument proposes a radical possibility: architecture can be pure form, and form alone can carry meaning.',
            'Washington Dulles International Airport (1962) shows another ambition: redefining a major public building type through technology. Slanted columns support a suspended concrete roof, pulled outward like a suspension bridge. Saarinen designed the "mobile lounge" for Dulles — large vehicles that could drive across the tarmac, carrying passengers directly from terminal to aircraft. The idea never caught on commercially, but it reflects Saarinen\'s persistent pursuit: good design is about how things work, not just how they look.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'twa-terminal', note: { zh: '混凝土薄壳塑造的飞鸟形态，喷气时代最壮丽的建筑宣言。', ja: 'コンクリート薄殻がつくる飛翔する鳥の形態。ジェット時代の最も壮麗な建築宣言。', en: 'A bird in flight shaped by thin-shell concrete — the jet age\'s most magnificent architectural statement.' } },
      { slug: 'gateway-arch', note: { zh: '630英尺高的不锈钢悬链线拱门，将建筑还原为一道地平线上的纯粹弧线。', ja: '高さ630フィートのステンレス鋼カテナリーアーチ。建築を地平線上の純粋な弧へと還元する。', en: 'A 630-foot stainless-steel catenary arch that reduces architecture to a pure arc on the horizon.' } },
      { slug: 'dulles-airport', note: { zh: '悬索屋顶与移动休息室的概念重新定义了机场的类型学。', ja: '吊り屋根とモバイルラウンジのコンセプトが空港の類型学を再定義した。', en: 'A suspended roof and mobile lounge concept that redefined airport typology.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Eero Saarinen', url: 'https://www.britannica.com/biography/Eero-Saarinen' },
      { title: 'Wikidata: Eero Saarinen', url: 'https://www.wikidata.org/wiki/Q167073' },
      { title: 'National Park Service: Gateway Arch', url: 'https://www.nps.gov/jeff/index.htm' },
      { title: 'TWA Hotel at JFK', url: 'https://www.twahotel.com/history' },
    ],
  },

  'zumthor': {
    slug: 'zumthor',
    summary: {
      zh: '彼得·卒姆托（Peter Zumthor, 1943– ）是当代建筑中最安静的革命者。他的作品数量极少——四十余年职业生涯中完成的建筑不过二十余座——但每一座都以极致的材料感知力和氛围营造著称。他的瓦尔斯温泉将沐浴变成仪式，克劳斯兄弟田野教堂将混凝土变成炭黑的祈祷室，科伦巴博物馆让光线像布料一样编织历史废墟。2009年普利兹克奖的颁奖词写道："他将建筑还原到最基本、最奢华的品质。"',
      ja: 'ペーター・ツムトール（Peter Zumthor, 1943– ）は、現代建築において最も静かな革命家である。作品数は極めて少なく——40年余りのキャリアで完成した建築は二十数棟に過ぎない——しかしその一つ一つが極限の素材感覚と雰囲気の創出で知られる。ヴァルスの温泉は入浴を儀式に変え、ブルーダー・クラウスの野の礼拝堂はコンクリートを炭化した祈りの部屋にし、コロンバ美術館は光を布のように歴史の廃墟に織り込む。2009年のプリツカー賞の審査評はこう記す：「彼は建築を、その最も基本的かつ最も贅沢な質へと還元する。」',
      en: 'Peter Zumthor (1943– ) is contemporary architecture\'s quietest revolutionary. His built oeuvre is tiny — barely twenty-some buildings over forty-plus years — but each is known for extreme material sensibility and atmosphere-making. His Therme Vals turns bathing into ritual, the Bruder Klaus Field Chapel turns concrete into a charred prayer room, and the Kolumba Museum weaves light through historical ruins like fabric. The 2009 Pritzker Prize citation reads: "He reduces architecture to its most basic and most luxurious qualities."',
    },
    core_ideas: {
      zh: [
        '氛围先于形式——光线、温度、声音、气味和触感组成建筑真正的体验，形式只是这些感知的载体',
        '材料的诚实与尊严——让木头是木头，石头是石头；不伪装，不混淆；每种材料都有其声音和记忆',
        '慢建筑——一个好的设计需要时间沉淀，卒姆托的每个项目平均耗时十年，他不与时代竞速',
        '场所的具体性——建筑不是从理念推导而来，而是从场地的土壤、光线、历史和空气中生长出来',
      ],
      ja: [
        '雰囲気は形式に先立つ——光、温度、音、匂い、触感が建築の真の体験を構成し、形式はそれらの知覚の器に過ぎない',
        '素材の誠実さと尊厳——木は木らしく、石は石らしく。偽装せず、混同しない。それぞれの素材にはその声と記憶がある',
        '遅い建築——良いデザインには時間の沈殿が必要であり、ツムトールの各プロジェクトは平均10年を要する。彼は時代と競走しない',
        '場の具体性——建築は理念から導かれるものではなく、敷地の土壌、光、歴史、空気から成長するもの',
      ],
      en: [
        'Atmosphere before form — light, temperature, sound, smell, and touch constitute the real experience of architecture; form is merely their vessel',
        'Honesty and dignity of materials — let wood be wood, stone be stone; no pretense, no confusion; each material has its own voice and memory',
        'Slow architecture — a good design needs time to settle; Zumthor\'s projects average ten years each; he does not race with the era',
        'Specificity of place — architecture grows from the soil, light, history, and air of the site, not deduced from abstract ideas',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Peter_Zumthor_2018.jpg',
      author: 'Elena Ternovaja',
      license: 'CC BY-SA 4.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Peter_Zumthor_2018.jpg',
      alt: { zh: '彼得·卒姆托肖像，2018年', ja: 'ペーター・ツムトールの肖像、2018年', en: 'Portrait of Peter Zumthor, 2018' },
    },
    sections: [
      {
        title: { zh: '氛围的建筑学', ja: '雰囲気の建築学', en: 'An architecture of atmosphere' },
        paragraphs: {
          zh: [
            '卒姆托在《思考建筑》和《氛围》中阐述了他的核心信念：建筑的首要任务不是制造图像，而是创造感知的条件。他说："当我进入一个空间，我首先感到的是温度。然后是气味。然后是光线落在材料上的方式。这些在几秒钟之内发生，早于我理解建筑的形状。"这种将感知置于智识之前的立场，使他的建筑学与以视觉为中心的主流话语拉开了距离。',
            '在瓦尔斯温泉（1996年）中，卒姆托将这种氛围理论推向了极致。建筑由当地的石英岩层叠砌筑，石材的纹理和温度随着与水的关系而变化——池边湿润的石面泛着深色光泽，远离水面的墙保持干燥的银灰色。水蒸汽在光线中飘移，声音被压低，每个泡池都成为一个独立的感官世界。这不是关于"看"建筑，而是关于"住在"建筑中。',
          ],
          ja: [
            'ツムトールは『建築を考える』と『雰囲気』で自らの核となる信念を述べている——建築の第一の任務はイメージを作ることではなく、知覚の条件を創り出すことである。「空間に入るとき、私が最初に感じるのは温度だ。それから匂い。それから素材に落ちる光の具合。これらは私が建築の形状を理解するより前に、数秒のうちに起こる」と彼は言う。知覚を知的把握の前に置くこの立場は、彼の建築学を視覚中心の主流の言説から引き離している。',
            'ヴァルスの温泉（1996年）では、ツムトールはこの雰囲気理論を極限まで推し進めた。建物は地元の珪岩（クォーツァイト）を層状に積み上げて作られ、石のテクスチャーと温度が水との関係に応じて変化する——プールサイドの濡れた石肌は深い光沢を帯び、水面から離れた壁は乾いた銀灰色を保つ。湯気が光のなかを漂い、音は抑えられ、各浴槽は独立した感覚的世界となる。これは建築を「見る」ことではなく建築の「なかに住む」ことについてである。',
          ],
          en: [
            'Zumthor laid out his core conviction in "Thinking Architecture" and "Atmospheres": architecture\'s first task is not to make images but to create conditions for perception. "When I enter a space," he says, "the first thing I feel is temperature. Then smell. Then the way light falls on materials. This happens in seconds, before I understand the shape of the building." This stance — placing perception before intellect — distances his architecture from the visually-centric mainstream.',
            'At Therme Vals (1996), Zumthor pushes this atmospheric theory to its extreme. The building is made of locally quarried quartzite, layered in strata. The stone\'s texture and temperature shift with its relationship to water — wet stone at the pool edge gleams dark; walls away from water stay dry silver-gray. Steam drifts through light; sound is dampened; each bathing chamber becomes its own sensory world. This is not about "looking at" architecture but about "dwelling in" it.',
          ],
        },
      },
      {
        title: { zh: '材料、记忆与场所', ja: '素材、記憶、そして場所', en: 'Material, memory, and place' },
        paragraphs: {
          zh: [
            '卒姆托对材料的态度近乎伦理。他认为每一种材料——木头、石头、混凝土、钢——都有其"内在本质"和理想的使用方式。建筑师的任务不是将材料强行塑形，而是倾听材料想要成为什么。在布雷根茨美术馆（1997年），他使用半透明玻璃板作为外皮，日光穿过玻璃之间的空腔在内部形成漫射光，整个建筑像一个捕光的盒子。玻璃在这里不是透明的窗户，而是发光的面。',
            '科伦巴博物馆（2007年）将材料的记忆维度推向了新高度。项目场地上有一座在二战中几乎被完全摧毁的哥特教堂废墟。卒姆托没有清除废墟，也没有简单地在其上重建。他用米色砖墙将残存石墙的轮廓包裹并向上延伸，新旧砖石之间留有狭窄缝隙，光线从中滤入。博物馆的室内拒绝传统展览空间的白色盒子模式，而是让光线和材料自己组织空间——穿孔砖墙透出的光斑、石灰石地板上的脚步声、新旧结构之间的沉默空隙。这座建筑证明了：材料可以携带记忆。',
          ],
          ja: [
            'ツムトールの素材に対する態度は倫理的とすら言える。彼はあらゆる素材——木、石、コンクリート、鋼——にはその「内的本質」と理想的な使用法があると考える。建築家の任務は素材を無理に造形することではなく、素材が何になりたいのかに耳を傾けることである。ブレゲンツ美術館（1997年）では、半透明のガラス板を外皮として用い、日光がガラス間の空隙を通って内部に拡散光を生み出す——建物全体が光を捕らえる箱となる。ここでガラスは透明な窓ではなく、発光する面である。',
            'コロンバ美術館（2007年）は素材の記憶の次元を新たな高みへと押し上げた。敷地には第二次世界大戦でほぼ完全に破壊されたゴシック教会の廃墟があった。ツムトールは廃墟を除去せず、かといって単純にその上に再建もしなかった。彼はベージュのレンガ壁で残存する石壁の輪郭を包み込み、上方へ延長し、新旧のレンガと石の間に細い隙間を残して、そこから光が濾過されるようにした。美術館の室内は伝統的なホワイトキューブの展示空間を拒否し、光と素材が自ら空間を組織する——穴あきレンガ壁を通して差し込む光斑、石灰石の床に響く足音、新旧構造の間の沈黙の隙間。この建物は証明している——素材は記憶を運ぶことができる。',
          ],
          en: [
            'Zumthor\'s attitude toward material approaches the ethical. He believes each material — wood, stone, concrete, steel — has its "inner essence" and ideal mode of use. The architect\'s task is not to force material into shape but to listen to what the material wants to become. At Kunsthaus Bregenz (1997), he used translucent glass panels as skin; daylight passes through cavities between glass layers to produce diffuse interior light — the entire building becomes a light-catching box. Here glass is not a transparent window but a luminous surface.',
            'The Kolumba Museum (2007) pushes material\'s dimension of memory to new heights. The site held the ruins of a Gothic church nearly destroyed in WWII. Zumthor neither cleared the ruins nor simply rebuilt on top of them. He wrapped the surviving stone walls\' silhouette in beige brick, extending upward, leaving narrow gaps between old and new masonry through which light filters. The interior refuses the traditional white-cube exhibition space: light and material organize the space themselves — light spots through perforated brick, footsteps on limestone floor, the silent gaps between old and new structures. This building proves that material can carry memory.',
          ],
        },
      },
      {
        title: { zh: '小即是多：卒姆托的工作方式', ja: '小さいことは多いこと：ツムトールの仕事のやり方', en: 'Small is much: Zumthor\'s way of working' },
        paragraphs: {
          zh: [
            '卒姆托的事务所位于瑞士格劳宾登州的哈尔登施泰因，一个只有约1000居民的山村。他刻意保持事务所的小规模——通常只有20人左右——以便亲自参与每个项目的关键决策。这种方式与全球化的建筑工业形成鲜明对比：卒姆托不追求规模、数量或国际扩张，他追求的是深度。',
            '他的项目周期极长。挪威的锌矿博物馆从第一个想法到落成用了约20年；洛杉矶LACMA扩建方案历经近十年仍在推进中。这种"慢"不是效率低下，而是卒姆托工作方法的必然结果——他用大量时间感受场地，制作全尺寸材料样品，在模型中反复测试光线，与工匠一起研究构造节点。在一个追求速度的时代，卒姆托证明了"慢"本身可以是一种抵抗，也是一种品质。',
            '2009年普利兹克奖将卒姆托带到了更广大的公众面前。但他并未因此改变工作方式。他的影响不体现在追随者的数量上——事实上没有人能真正模仿卒姆托而不显得做作——而在于他重新提醒了建筑界一件基本的事实：好的建筑是关于如何生活，如何感知，如何在世界中安放身体。',
          ],
          ja: [
            'ツムトールの事務所はスイスのグラウビュンデン州ハルデンシュタイン——人口約1000人の山村——にある。彼は意識的に事務所の規模を小さく保ち——通常20人前後——各プロジェクトの重要な決定に自ら関われるようにしている。このやり方はグローバル化した建築産業とは鮮やかに対照的である。ツムトールは規模、数量、国際展開を追求せず、深さを追求する。',
            '彼のプロジェクトの周期は極めて長い。ノルウェーの亜鉛鉱山博物館は最初のアイデアから完成まで約20年。ロサンゼルスのLACMA拡張案はほぼ10年を経てなお進行中である。この「遅さ」は非効率ではなく、ツムトールの仕事の方法の必然的結果である——彼は多くの時間をかけて敷地を感じ取り、実寸の素材サンプルを作り、模型で光を繰り返しテストし、職人とともに納まりを検討する。速度を追求する時代にあって、ツムトールは「遅さ」それ自体がひとつの抵抗であり、ひとつの質であり得ることを証明した。',
            '2009年のプリツカー賞はツムトールをより広い公衆の前に連れ出した。しかし彼はそれによって仕事のやり方を変えなかった。彼の影響は追随者の数には現れない——実際、誰もツムトールを真似てわざとらしくならずに済む者はいない——むしろ、彼が建築界に再び思い起こさせた基本的な事実にある。良い建築とは、いかに生きるか、いかに知覚するか、いかに世界のなかに身体を置くかについてである。',
          ],
          en: [
            'Zumthor\'s office is in Haldenstein, a Swiss mountain village of about 1,000 people in the canton of Graubünden. He deliberately keeps the office small — usually around twenty people — so he can personally engage in the key decisions of each project. This approach stands in stark contrast to the globalized architectural industry: Zumthor pursues not scale, quantity, or international expansion, but depth.',
            'His project timelines are extraordinarily long. The Zinc Mine Museum in Norway took about twenty years from first idea to completion; the LACMA expansion scheme in Los Angeles is still underway after nearly a decade. This "slowness" is not inefficiency but the inevitable result of his method — he spends huge amounts of time feeling the site, making full-scale material mockups, testing light repeatedly in models, studying construction details with craftsmen. In an era that worships speed, Zumthor proved that slowness itself can be a form of resistance, and a form of quality.',
            'The 2009 Pritzker Prize brought Zumthor to a wider public, but he did not change his working methods because of it. His influence is not measured in numbers of followers — indeed no one can really imitate Zumthor without appearing mannered — but in the basic fact he reminded the architectural world: good architecture is about how to live, how to perceive, how to place the body in the world.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'therme-vals', note: { zh: '层叠的石砌温泉，将沐浴变成与光、水、石的感官仪式。', ja: '層状に積まれた石造りの温泉。入浴を光・水・石との感覚的儀式に変える。', en: 'Layered stone-built thermal baths that turn bathing into a sensory ritual of light, water, and stone.' } },
      { slug: 'kolumba-museum', note: { zh: '在哥特教堂废墟上生长的博物馆，光线像布料一样编织新与旧。', ja: 'ゴシック教会の廃墟の上に成長する美術館。光が布のように新と旧を織り上げる。', en: 'A museum growing atop Gothic church ruins where light weaves old and new like fabric.' } },
      { slug: 'kunsthaus-bregenz', note: { zh: '半透明玻璃盒子，日光磨砂般均匀扩散，结构消隐在光的帷幔之后。', ja: '半透明ガラスの箱。日光がすりガラスのように均一に拡散し、構造が光の帷の背後に消える。', en: 'A translucent glass box where daylight diffuses evenly like frosted glass and structure dissolves behind curtains of light.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Peter Zumthor', url: 'https://www.britannica.com/biography/Peter-Zumthor' },
      { title: 'The Pritzker Architecture Prize: Peter Zumthor', url: 'https://www.pritzkerprize.com/laureates/2009' },
      { title: 'Wikidata: Peter Zumthor', url: 'https://www.wikidata.org/wiki/Q123166' },
      { title: 'Zumthor, "Thinking Architecture" (1998)', url: 'https://www.birkhauser.com/en/book/9783034605861' },
    ],
  },

  'j-rn-utzon': {
    slug: 'j-rn-utzon',
    summary: {
      zh: '约翰·伍重（Jørn Utzon, 1918–2008）是丹麦建筑师，因悉尼歌剧院而载入史册——一座改变了整个国家身份认同的建筑。但伍重远不止"歌剧院建筑师"。他的作品跨越丹麦、澳大利亚、科威特和马略卡岛，在平台与屋顶、自然与几何、地方传统与普遍形式之间建立了一种独特的建筑语法。他从自然中学习——云、贝壳、海岸线、森林——将有机形态转化为精确的结构逻辑。他与结构工程师奥韦·阿鲁普（Ove Arup）的合作重塑了20世纪的建造技术，但他一生低调，晚年隐居马略卡岛，在自己的两座房子里沉思建筑的本质。',
      ja: 'ヨーン・ウツソン（Jørn Utzon, 1918–2008）はデンマークの建築家であり、一国のアイデンティティを変えた建築——シドニー・オペラハウス——によって歴史に名を刻んだ。しかしウツソンは「オペラハウスの建築家」にとどまらない。彼の作品はデンマーク、オーストラリア、クウェート、マヨルカ島にまたがり、プラットフォームと屋根、自然と幾何学、地域の伝統と普遍的形式のあいだに独自の建築文法を築いた。彼は自然——雲、貝殻、海岸線、森——から学び、有機的形態を精密な構造論理へと変換した。構造エンジニアのオヴ・アラップとの協働は20世紀の建設技術を再形成したが、彼自身は生涯を通じて控えめであり、晩年はマヨルカ島に隠棲し、自ら設計した二軒の家で建築の本質を思索した。',
      en: 'Jørn Utzon (1918–2008) is the Danish architect who entered history through a single building that changed a nation\'s identity — the Sydney Opera House. But Utzon is far more than "the Opera House architect." His work spans Denmark, Australia, Kuwait, and Mallorca, building a unique architectural grammar between platform and roof, nature and geometry, local tradition and universal form. He learned from nature — clouds, shells, coastlines, forests — translating organic shapes into precise structural logic. His collaboration with structural engineer Ove Arup reshaped 20th-century construction technology, yet he remained personally modest, spending his final decades in quiet retreat on Mallorca, contemplating architecture\'s essence in two houses of his own design.',
    },
    core_ideas: {
      zh: [
        '加法建筑——建筑应由可清晰识别的独立元素组合而成，而非从单一整体中削减，这种"加法"逻辑源于对自然生长方式的观察',
        '平台与屋顶的二元性——将建筑视为大地之上的平台与天空之下的屋顶，二者之间的空间是人类活动的舞台',
        '从自然中学习而不模仿——贝壳的曲面、云朵的体量、森林的光影不是被复制的形式，而是激发结构原理的模型',
        '跨文化灵感——在摩洛哥看到夯土平台、在中国看到重檐屋顶、在日本看到水平延展，将这些转化为现代建筑语言',
      ],
      ja: [
        '加法的建築——建築は単一の全体から切り出すのではなく、明確に識別可能な独立要素の組み合わせであるべき。この「加法」論理は自然の成長の仕方の観察から生まれた',
        'プラットフォームと屋根の二元性——建築を大地の上のプラットフォームと空の下の屋根として捉え、その間の空間が人間活動の舞台となる',
        '模倣ではなく自然から学ぶ——貝殻の曲面、雲のボリューム、森の光と影は複製すべき形式ではなく、構造原理を触発するモデルである',
        '文化横断的霊感——モロッコで版築のプラットフォームを、中国で重層屋根を、日本で水平の広がりを見て、これらを現代建築の言語へと変換した',
      ],
      en: [
        'Additive architecture — buildings should be composed of clearly identifiable, independent elements rather than carved from a single mass; this "additive" logic derives from observing how nature grows',
        'The platform and roof duality — seeing architecture as a platform on the earth beneath a roof under the sky, the space between them being the stage for human activity',
        'Learning from nature without imitating it — shell curves, cloud volumes, forest light and shadow are not forms to copy but models that inspire structural principles',
        'Transcultural inspiration — seeing rammed-earth platforms in Morocco, layered roofs in China, horizontal extension in Japan, and translating these into a modern architectural language',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/J%C3%B8rn_Utzon_2000.jpg',
      author: 'Unknown',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:J%C3%B8rn_Utzon_2000.jpg',
      alt: { zh: '约翰·伍重肖像，约2000年', ja: 'ヨーン・ウツソンの肖像、2000年頃', en: 'Portrait of Jørn Utzon, circa 2000' },
    },
    sections: [
      {
        title: { zh: '悉尼歌剧院：一个国家的建筑', ja: 'シドニー・オペラハウス：一国家の建築', en: 'The Sydney Opera House: Architecture for a nation' },
        paragraphs: {
          zh: [
            '1957年，38岁的伍重在匿名国际竞赛中赢得了悉尼歌剧院的设计权，击败了超过200个方案。他的方案甚至不符合竞赛的技术要求——图纸更像是草图而非施工图——但评审团主席埃罗·沙里宁（Eero Saarinen）被其雕塑般的力量所征服："它必须是建成的。"',
            '然而从图纸到建成的路途长达16年（1957–1973），其间充满了工程上的几乎不可能。伍重提出的薄壳屋顶在当时没有先例：如何用混凝土浇筑出如此巨大的自由曲面？伍重和奥韦·阿鲁普的团队用了数年时间，最终发现所有壳体可以源自同一个球体的表面——这一几何洞察让预制化成为可能。但在1966年，由于政治压力和预算超支，伍重被迫退出项目，从未亲眼看到自己的杰作建成。他再也没有回到澳大利亚。',
            '悉尼歌剧院的悲剧性在于：它是20世纪最伟大的建筑之一，却是以建筑师被驱逐为代价完成的。2003年伍重获得普利兹克奖时，评委会特别表彰了这座建筑"改变了整个国家的形象"。2007年，歌剧院被列入世界遗产——伍重成为少数几位在有生之年看到自己作品获此殊荣的建筑师之一。',
          ],
          ja: [
            '1957年、38歳のウツソンは匿名の国際コンペでシドニー・オペラハウスの設計権を獲得し、200を超える応募案を打ち負かした。彼の案はコンペの技術要件すら満たしていなかった——図面は施工図というよりスケッチに近かった——しかし審査委員長のエーロ・サーリネンはその彫刻的な力に打たれた：「これは建てられねばならない。」',
            'しかし図面から完成までの道のりは16年（1957–1973）に及び、その間は工学的なほぼ不可能の連続だった。ウツソンが提案した薄殻屋根には当時前例がなかった：これほど巨大な自由曲面をコンクリートでどうやって打設するのか？ウツソンとオヴ・アラップのチームは数年を費やし、最終的にすべての殻が同一球体の表面から導き出せることを発見した——この幾何学的洞察がプレハブ化を可能にした。しかし1966年、政治的圧力と予算超過により、ウツソンはプロジェクトから追われ、自らの傑作の完成を決して目にすることはなかった。彼は二度とオーストラリアに戻らなかった。',
            'シドニー・オペラハウスの悲劇性はここにある——20世紀最高の建築のひとつが、建築家の追放を代償として完成した。2003年にウツソンがプリツカー賞を受賞したとき、審査委員会はこの建築が「一国のイメージを変えた」ことを特に称賛した。2007年、オペラハウスは世界遺産に登録された——ウツソンは存命中に自らの作品がこの栄誉を受ける数少ない建築家の一人となった。',
          ],
          en: [
            'In 1957, the 38-year-old Utzon won the commission for the Sydney Opera House in an anonymous international competition, defeating over 200 entries. His scheme did not even meet the competition\'s technical requirements — the drawings were more sketches than construction documents — but jury chair Eero Saarinen was won over by its sculptural power: "It must be built."',
            'Yet the journey from drawing to completion took 16 years (1957–1973), filled with near-engineering-impossibilities. The thin-shell roofs Utzon proposed had no precedent: how could concrete be cast into such enormous free-form surfaces? Utzon\'s team with Ove Arup spent years before discovering that all shells could be derived from the surface of a single sphere — a geometric insight that made prefabrication possible. But in 1966, under political pressure and budget overruns, Utzon was forced off the project and never saw his masterpiece complete. He never returned to Australia.',
            'The tragedy of the Sydney Opera House is this: it is one of the 20th century\'s greatest buildings, completed at the cost of its architect\'s expulsion. When Utzon received the Pritzker Prize in 2003, the jury specifically cited how the building "changed the image of an entire country." In 2007, the Opera House was inscribed as a World Heritage Site — Utzon became one of the very few architects to see their work receive this honor during their lifetime.',
          ],
        },
      },
      {
        title: { zh: '加法建筑：平台、屋顶与自然语法', ja: '加法の建築：プラットフォーム、屋根、自然の文法', en: 'Additive architecture: Platform, roof, and natural syntax' },
        paragraphs: {
          zh: [
            '伍重建筑思想的核心是"加法建筑"（Additive Architecture）——建筑应该由清晰可辨的独立元素组合而成，而非从单一整体中削减。这个概念在1970年代悉尼歌剧院之后的反思期得到了系统阐述。伍重认为，自然界中没有任何东西是从一个实体中削减而成的：树木由枝干组成，花由花瓣组成，鸟由羽毛组成。建筑应该遵循同样的逻辑。',
            '在加法逻辑之上，伍重发展了两个关键空间原型：平台（platform）与屋顶（roof）。平台将建筑从大地上抬起，创造了一个人造的、仪式性的表面。在悉尼歌剧院，巨大的台阶式平台将建筑群从港口中升起，人群在上面移动如同在舞台上表演。屋顶则是悬浮在平台上方的庇护所——它定义空间的高度和氛围，但不封闭空间。这一"平台+屋顶"模式在伍重几乎所有后续作品中反复出现。',
            '巴格斯瓦德教堂（Bagsværd Church, 1976）是加法建筑在宗教空间中的杰作：白色混凝土的有机曲线天花悬浮在严格的矩形平面之上，光线从两侧的高窗滑入，照亮了起伏的天花表面。这种形态——伍重说——灵感来自夏威夷海滩上被海浪卷起的云朵，但其建造逻辑却是完全理性的：曲线是通过一系列标准化的预制梁实现的。自然的形式，理性的建造。',
          ],
          ja: [
            'ウツソンの建築思想の核心は「加法の建築」（Additive Architecture）——建築は単一の塊から削り出すのではなく、明確に識別可能な独立要素の組み合わせであるべきだ——にある。この概念はシドニー・オペラハウス後の1970年代の内省期に体系的に述べられた。ウツソンは、自然界でひとつの実体から削り出されたものは何もないと考える：木は枝から、花は花弁から、鳥は羽から構成されている。建築も同じ論理に従うべきだ。',
            '加法の論理の上に、ウツソンは二つの鍵となる空間原型を発展させた——プラットフォームと屋根である。プラットフォームは建築を大地から持ち上げ、人工的で儀式的な表面を創り出す。シドニー・オペラハウスでは、巨大な階段状プラットフォームが建物群を港から立ち上がらせ、人々は舞台の上で動くようにその上を行き来する。屋根はプラットフォームの上方に浮かぶシェルターであり——空間の高さと雰囲気を定義するが、空間を閉じ込めはしない。この「プラットフォーム＋屋根」モデルはウツソンのその後のほぼすべての作品に繰り返し現れる。',
            'バウスベア教会（Bagsværd Church, 1976）は宗教空間における加法建築の傑作である——白いコンクリートの有機的曲線天井が厳格な矩形平面の上に浮かび、光が両側の高窓から滑り込み、波打つ天井面を照らし出す。この形態は——ウツソンが語ったところによれば——ハワイのビーチで波に巻き上げられた雲から霊感を得たが、その建設論理は完全に理性的である：曲線は一連の標準化されたプレキャスト梁によって実現されている。自然の形式、理性の構築。',
          ],
          en: [
            'The core of Utzon\'s architectural thinking is "Additive Architecture" — the idea that buildings should be composed of clearly identifiable, independent elements rather than carved from a single mass. This concept was systematically articulated during his reflective period in the 1970s, after the Opera House. Utzon observed that nothing in nature is carved from one entity: trees are composed of branches, flowers of petals, birds of feathers. Architecture should follow the same logic.',
            'On top of the additive logic, Utzon developed two key spatial archetypes: platform and roof. The platform lifts architecture off the earth, creating an artificial, ritualistic surface. At the Sydney Opera House, the great stepped platform raises the building complex from the harbor; people move across it as if performing on a stage. The roof is a shelter suspended above the platform — it defines spatial height and atmosphere without enclosing. This "platform + roof" model recurs through virtually all of Utzon\'s subsequent work.',
            'Bagsværd Church (1976) is additive architecture\'s masterpiece in a sacred space: an organic curved ceiling of white concrete floats above a strictly rectangular plan. Light slides in from high windows on both sides, illuminating the undulating ceiling surface. The form — Utzon said — was inspired by clouds rolling up from the sea on a Hawaiian beach, but its construction logic is entirely rational: the curves are achieved through a series of standardized precast beams. Natural form, rational construction.',
          ],
        },
      },
      {
        title: { zh: '马略卡岛上的两座房子：还原本质', ja: 'マヨルカ島の二軒の家：本質への還元', en: 'Two houses on Mallorca: Reducing to essence' },
        paragraphs: {
          zh: [
            '1971年，退出悉尼项目后第六年，伍重在马略卡岛的悬崖边为自己建造了第一座房子——Can Lis。这座房子是伍重建筑哲学的终极缩影：一个石砌的平台坐落在海岸悬崖上，五个独立的小亭子（卧室、客厅、厨房、餐厅、工作室）散布在平台上，每个亭子有独立的屋顶和朝向海洋的开口。没有走廊——你从平台上一个亭子走到另一个，始终被海风吹拂，被日光照亮。Can Lis不追求完成感：它看起来随时可以继续生长，正是加法建筑最纯粹的演示。',
            '二十年后，伍重和马略卡岛内陆建造了第二座房子——Can Feliz（1994）。如果说Can Lis是与大海的对话，Can Feliz则是与山的私语。厚实的当地石材墙体围合出一个内向的庭院序列，巨大的悬挑屋顶将视野框定在远处的山脉和近处的橄榄树之间。材料从不在表面上伪装：石墙是真正的承重石墙，木梁是真正受力的木梁。伍重晚年在这两座房子中不断调整——加一个窗口、改一个坐位——将建筑变成了持续数十年的生活实验。',
            '这两座房子或许比悉尼歌剧院更能体现伍重的真正价值：他证明了伟大的建筑不必然巨大。同样的加法原则、同样的平台-屋顶语法、同样的自然与几何的对话，可以在191平方米的私人住宅中与在歌剧院中同等有力地运作。2008年伍重去世，享年90岁，他的儿子在一间曾经是他父亲工作室的小亭子里为他守夜——在那个由五个小亭子组成的加法聚落中。',
          ],
          ja: [
            '1971年、シドニープロジェクトから離脱して6年後、ウツソンはマヨルカ島の崖っぷちに自身のための最初の家——カン・リス（Can Lis）——を建てた。この家はウツソンの建築哲学の究極の縮図である。海岸の崖の上に据えられた石造りのプラットフォーム、その上に五つの独立した小さなパビリオン（寝室、居間、台所、食堂、仕事場）が散りばめられ、それぞれが独立した屋根と海へ向かう開口部を持つ。廊下はない——プラットフォームの上をひとつのパビリオンから次へと歩き、常に潮風に吹かれ、日差しに照らされる。カン・リスは完結感を追求しない——いつでも成長し続けられそうに見える。これこそ加法の建築の最も純粋なデモンストレーションである。',
            '20年後、ウツソンはマヨルカ島の内陸部に二軒目の家——カン・フェリス（Can Feliz, 1994）——を建てた。カン・リスが海との対話なら、カン・フェリスは山との私語である。分厚い地元の石材の壁が内向きの中庭の連続を囲い込み、巨大な張り出し屋根が遠くの山脈と近くのオリーブの木のあいだに視線を枠取る。素材は決して表面上の偽装ではない——石壁は本当に荷重を負う石壁であり、木梁は本当に力を伝える木梁である。晩年のウツソンはこの二軒の家で絶えず調整を続けた——窓をひとつ加え、座る場所を変え——建築を数十年にわたる生活の実験へと変えた。',
            'この二軒の家は、おそらくシドニー・オペラハウス以上にウツソンの真の価値を体現している——偉大な建築は必ずしも巨大である必要はない。同じ加法の原理、同じプラットフォーム-屋根の文法、同じ自然と幾何学の対話が、191平方メートルの個人住宅においても、オペラハウスと同等の力で作動しうることを彼は証明した。2008年、ウツソンは90歳で亡くなった。彼の息子は、かつて父の仕事場だった小さなパビリオンで通夜をした——五つの小さなパビリオンからなる加法の集落のなかで。',
          ],
          en: [
            'In 1971, six years after withdrawing from the Sydney project, Utzon built his first house for himself on a cliff edge in Mallorca — Can Lis. This house is the ultimate distillation of Utzon\'s architectural philosophy: a stone platform set on the coastal cliff, five independent small pavilions (bedroom, living room, kitchen, dining, studio) scattered across the platform, each with its own roof and its own opening to the sea. There are no corridors — you walk from one pavilion to another on the platform, always brushed by sea breezes, always lit by sun. Can Lis does not pursue a sense of completion: it looks as if it could keep growing at any moment — the purest demonstration of additive architecture.',
            'Twenty years later, Utzon built a second house inland on Mallorca — Can Feliz (1994). If Can Lis is a dialogue with the sea, Can Feliz is a whisper with the mountain. Thick local stone walls enclose an introverted sequence of courtyards; enormous overhanging roofs frame views between distant mountain ranges and nearby olive trees. Materials never pretend on the surface: stone walls are genuinely load-bearing stone walls, timber beams are genuinely force-carrying timber beams. In his late years, Utzon continuously adjusted the two houses — adding a window, shifting a seat — turning architecture into a decades-long experiment in living.',
            'These two houses perhaps embody Utzon\'s true value more than the Sydney Opera House: he proved that great architecture need not be huge. The same additive principles, the same platform-roof grammar, the same dialogue between nature and geometry, can operate as powerfully in a 191-square-meter private house as in an opera house. Utzon died in 2008 at age 90. His son kept vigil for him in a small pavilion that had once been his father\'s studio — inside the additive settlement of five small pavilions.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'sydney-opera-house', note: { zh: '球面几何解决薄壳建造难题，使一座建筑成为整个国家的象征。', ja: '球面幾何学が薄殻建設の難題を解決し、一つの建築を国家全体の象徴とした。', en: 'Spherical geometry solved the thin-shell construction puzzle, making a single building the symbol of an entire nation.' } },
      { slug: 'bagsv-rd-church', note: { zh: '云朵般起伏的混凝土天花，光束从两侧高窗滑入，理性建造实现诗意空间。', ja: '雲のように波打つコンクリート天井。両側の高窓から光が滑り込み、理性的構築が詩的空間を実現する。', en: 'Cloud-like undulating concrete ceiling with light sliding in from high side windows — rational construction achieving poetic space.' } },
      { slug: 'can-lis', note: { zh: '马略卡悬崖上的五亭聚落，无走廊连接，建筑退让于风、光和海。', ja: 'マヨルカの崖の上の五亭集落。廊下なく、風と光と海に建築が譲る。', en: 'A five-pavilion settlement on a Mallorcan cliff with no corridors — architecture yielding to wind, light, and sea.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Jørn Utzon', url: 'https://www.britannica.com/biography/Jorn-Utzon' },
      { title: 'The Pritzker Architecture Prize: Jørn Utzon', url: 'https://www.pritzkerprize.com/laureates/2003' },
      { title: 'Wikidata: Jørn Utzon', url: 'https://www.wikidata.org/wiki/Q180398' },
      { title: 'Sydney Opera House Official Site', url: 'https://www.sydneyoperahouse.com/' },
    ],
  },

  'luis-barragan': {
    slug: 'luis-barragan',
    summary: {
      zh: '路易斯·巴拉干（Luis Barragán, 1902–1988）是20世纪最独特的建筑师之一。在功能主义和国际风格席卷全球的时代，他在墨西哥城用色彩、光、水和沉默建造了一种"情感的建筑"。他的房子和庭院不多发表宣言，却凭借粉红、橘黄、深紫色的高墙、精确控制的光柱、独自伫立的水面和静默如教的空间氛围，成为建筑学中无法归类却无处不在的参照。1980年，他成为第二位获得普利兹克奖的建筑师（第一位是菲利普·约翰逊），评审委员会称他的作品是"将现代与传统完美结合的崇高典范"。',
      ja: 'ルイス・バラガン（Luis Barragán, 1902–1988）は20世紀で最も特異な建築家の一人である。機能主義とインターナショナルスタイルが世界を席巻していた時代に、彼はメキシコシティで色彩、光、水、沈黙を用いて「感情の建築」を築いた。彼の家と庭は宣言を発しないが、ピンク、オレンジ、深紫の高い壁、精密に制御された光の柱、ただ独りで佇む水面、黙する教えのような空間の雰囲気によって、建築学のなかで分類不能でありながら遍在する参照点となった。1980年、彼はプリツカー賞を受賞した二人目の建築家（一人目はフィリップ・ジョンソン）となり、審査委員会は彼の作品を「近代と伝統を完璧に結びつけた崇高な模範」と称賛した。',
      en: 'Luis Barragán (1902–1988) is one of the 20th century\'s most singular architects. At a time when functionalism and the International Style were sweeping the globe, he built an "architecture of emotion" in Mexico City using color, light, water, and silence. His houses and courtyards make few declarations, yet through pink, orange, and deep-purple walls, precisely controlled shafts of light, solitary bodies of water, and an atmosphere of quiet as doctrine, they became an uncategorizable yet omnipresent reference in architecture. In 1980, he became the second architect to receive the Pritzker Prize (after Philip Johnson), with the jury calling his work "a sublime example of the perfect marriage between the modern and the traditional."',
    },
    core_ideas: {
      zh: [
        '情感的建筑——建筑的首要目的在于传达美与情感，而非履行功能或表达理念。巴拉干说："我相信情感的建筑。"',
        '色彩作为材料——色彩不是装饰或表面涂层，而是具有空间质量的结构性元素。一面粉红色的墙不是粉刷过的墙，而是"粉红色的面"',
        '光作为空间的雕塑者——光决定空间的氛围和深度，巴拉干对光的运用极其精确：一束光从高窗落下，像刀一样切过空间',
        '墙、花园与沉默——高墙创造出内向的花园世界，将城市的噪音挡在外面。巴拉干的空间追求一种"宗教般的沉默"',
      ],
      ja: [
        '感情の建築——建築の第一の目的は美と感情を伝えることであり、機能を果たしたり理念を表現したりすることではない。バラガンは言った：「私は感情の建築を信じている。」',
        '素材としての色彩——色彩は装飾や表面塗装ではなく、空間的性質を持つ構造的要素である。一枚のピンクの壁は、塗られた壁ではなく「ピンク色の面」である',
        '空間の彫刻家としての光——光は空間の雰囲気と深さを決定する。バラガンの光の使い方は極めて精緻である——高窓から落ちる一筋の光が、刀のように空間を切る',
        '壁、庭、そして沈黙——高い壁が内向きの庭の世界を創り出し、都市の騒音を外に閉め出す。バラガンの空間は「宗教的な沈黙」を追求する',
      ],
      en: [
        'An architecture of emotion — the first purpose of architecture is to convey beauty and emotion, not to fulfill function or express ideas. Barragán said: "I believe in an emotional architecture."',
        'Color as material — color is not decoration or surface coating but a structural element with spatial qualities. A pink wall is not a painted wall but a "pink plane"',
        'Light as sculptor of space — light determines atmosphere and depth; Barragán\'s use of light is exceptionally precise: a shaft of light falling from a high window cuts through space like a blade',
        'Wall, garden, and silence — high walls create an introverted garden world, shutting out the city\'s noise. Barragán\'s spaces pursue a "religious silence"',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Luis_Barrag%C3%A1n.jpg',
      author: 'Unknown',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Luis_Barrag%C3%A1n.jpg',
      alt: { zh: '路易斯·巴拉干肖像', ja: 'ルイス・バラガンの肖像', en: 'Portrait of Luis Barragán' },
    },
    sections: [
      {
        title: { zh: '情感的建筑：超越功能主义', ja: '感情の建築：機能主義を超えて', en: 'Architecture of emotion: Beyond functionalism' },
        paragraphs: {
          zh: [
            '巴拉干职业生涯的早期并不成功。1920年代他在瓜达拉哈拉学习工程而非建筑（当时墨西哥还没有正式的建筑教育），1931–1932年在巴黎和摩洛哥的旅行彻底改变了他的方向。他在巴黎遇见了勒·柯布西耶和费尔迪南·巴克（Ferdinand Bac），后者的地中海花园理论让他深受震动。但真正影响他的不是现代主义的形式语言，而是摩洛哥的传统庭院建筑——高墙、内向花园、光影戏剧——这些元素后来成为他所有作品的常数。',
            '回到墨西哥后，巴拉干经历了一个"商业时期"（1936–1940年代），在墨西哥城建造了许多理性主义风格的公寓楼。但他很快对这种纯粹的效率感到不满。"现代建筑已经成为了一个巨大的骗局，"他后来说，"它忘记了人也有灵魂。"1945年，他为自己建造了第一座真正意义上的巴拉干式建筑——他购买并改造了一座位于塔库巴亚区的旧宅（即后来的巴拉干住宅），在那里他开始了持续四十多年的空间实验。',
            '巴拉干拒绝勒·柯布西耶的"住宅是居住的机器"这一信条。对他来说，房子不是机器——它是庇护所，是静修的场所，是灵魂的容器。他将建筑的话语从功能、技术和效率重新引向情感、美和精神性。这种立场使他在现代主义的鼎盛时期被边缘化，但也让他在20世纪后期被重新发现——当新一代建筑师开始反思功能主义的局限时，巴拉干提供了一个已经成熟了的替代方案。',
          ],
          ja: [
            'バラガンの初期のキャリアは成功したとは言えない。1920年代、彼はグアダラハラで建築ではなく工学を学んだ（当時メキシコには正式な建築教育がなかった）。1931–1932年のパリとモロッコへの旅行が彼の方向性を決定的に変えた。パリでル・コルビュジエとフェルディナン・バックに出会い、バックの地中海庭園理論に深く揺さぶられた。しかし彼に真の影響を与えたのはモダニズムの形式言語ではなく、モロッコの伝統的中庭建築——高い壁、内向き庭園、光と影のドラマ——であった。これらの要素は後に彼のすべての作品の定数となる。',
            'メキシコに戻ったバラガンは「商業的時期」（1936–1940年代）を経て、メキシコシティで多くの合理主義スタイルのアパートを建設した。しかし彼はすぐにこの純粋な効率性に不満を抱いた。「近代建築は巨大なペテンになった」と彼は後に言った、「人間にも魂があることを忘れてしまった。」1945年、彼は自身のために最初の真の意味でのバラガン建築——タクバヤ地区の古い家を購入し改修したもの（後のバラガン邸）——をつくり、そこで40年以上にわたる空間実験を始めた。',
            'バラガンはル・コルビュジエの「住宅は住むための機械である」という教義を拒絶した。彼にとって家は機械ではなく——シェルターであり、静修の場であり、魂の容器である。彼は建築の言説を機能、技術、効率から感情、美、精神性へと再方向づけた。この立場はモダニズムの最盛期に彼を周縁化したが、20世紀後半に彼が再発見される理由ともなった——新世代の建築家たちが機能主義の限界を反省し始めたとき、バラガンはすでに成熟した代替案を提供していた。',
          ],
          en: [
            'Barragán\'s early career was not a success story. In the 1920s he studied engineering rather than architecture in Guadalajara (Mexico had no formal architectural education at the time). Travels to Paris and Morocco in 1931–1932 decisively changed his direction. In Paris he met Le Corbusier and Ferdinand Bac, whose Mediterranean garden theories deeply moved him. But what truly influenced him was not modernism\'s formal language but Morocco\'s traditional courtyard architecture — high walls, introverted gardens, dramas of light and shadow — elements that would become constants in all his later work.',
            'Returning to Mexico, Barragán went through a "commercial period" (1936–1940s), building many rationalist-style apartment blocks in Mexico City. But he soon grew dissatisfied with pure efficiency. "Modern architecture has become a huge fraud," he later said, "it forgot that man also has a soul." In 1945, he built his first truly Barragán-esque building for himself — he purchased and remodeled an old house in the Tacubaya district (later the Barragán House), beginning a spatial experiment that would last over forty years.',
            'Barragán rejected Le Corbusier\'s doctrine that "a house is a machine for living in." For him, a house is not a machine — it is a shelter, a place for retreat, a container for the soul. He redirected architectural discourse from function, technology, and efficiency toward emotion, beauty, and spirituality. This stance marginalized him during modernism\'s peak but also made him ripe for rediscovery in the late 20th century — when a new generation of architects began questioning functionalism\'s limits, Barragán provided an already-mature alternative.',
          ],
        },
      },
      {
        title: { zh: '光、水与墨西哥色彩', ja: '光、水、そしてメキシコの色彩', en: 'Light, water, and Mexican color' },
        paragraphs: {
          zh: [
            '走进一座巴拉干的建筑，最直接的感受不是空间布局——而是颜色和光。他的调色板源于墨西哥的传统涂料色系：沙漠般的橙红（rosa mexicano）、忧郁的深紫、明亮的粉红、温暖的黄。这些颜色不是装饰性的趣味，而是空间的定义者。在巴拉干住宅中，粉红色的餐厅墙壁将整个空间浸染在一种温暖的肉色光芒中——这不是你看到的颜色，而是你身处其中的颜色。',
            '巴拉干对水的使用同样独特。在他的庭院中，水很少以传统的喷泉或瀑布形式出现——它通常是一片静止的黑色水面，像一面镜子平铺在地面上，将天空和墙壁反射成抽象的色彩平面。在拉斯阿沃拉达斯（Las Arboledas, 1958–1961）中，一道长长的水渠穿过桉树林，骑马的马道沿着水渠延伸——水面映射着高墙和树影，将骑马穿行变成一种超现实的身体体验。水在这里不是景观的装饰，而是一种建筑元素，与墙壁、地面和光同等重要。',
            '最令人惊叹的是他对光的控制。巴拉干的光从不通透——它总是经过过滤、反射或限制。一道光可能穿过厚重的黄色玻璃窗变成温暖的琥珀色，或者从一个隐蔽的高窗落下，在暗色的石地板上投下一个锐利的矩形光斑。这种对光的精密度——光的颜色、方向、强度和落点——使他的空间具有一种近乎形而上的质量。在吉拉迪住宅（Casa Gilardi, 1976）中，一道光柱从顶部穿过中庭落入室内游泳池，将水和光变成空间的主角。',
          ],
          ja: [
            'バラガンの建物に入るとき、最初に感じるのは空間配置ではない——色と光である。彼のパレットはメキシコの伝統的な塗料の色調に根ざしている——砂漠のようなオレンジ-赤（ロサ・メヒカーノ）、憂鬱な深紫、鮮やかなピンク、暖かな黄色。これらの色は装飾的な趣向ではなく、空間の定義者である。バラガン邸では、ピンクの食堂の壁が空間全体を暖かな肉色の光に染める——これはあなたが見る色ではなく、あなたがその中にいる色である。',
            'バラガンの水の使い方も同様に独特である。彼の庭では、水は伝統的な噴水や滝の形で現れることはめったにない——通常は静止した黒い水面であり、地面の上に平らに置かれた鏡のように、空と壁を抽象的な色彩平面として反射する。ラス・アルボレダス（Las Arboledas, 1958–1961）では、長い水路がユーカリの森を貫き、馬道が水路に沿って延びる——水面が高い壁と木の影を映し、馬で通り抜けることを超現実的な身体体験へと変える。ここで水は景観の装飾ではなく、壁や床や光と同等に重要な建築的要素である。',
            '最も驚嘆すべきは彼の光の制御である。バラガンの光は決して透明ではない——つねに濾過され、反射され、制限されている。一筋の光が厚い黄色のガラス窓を通って暖かな琥珀色に変わり、あるいは隠された高窓から落ちて、暗い石の床の上に鋭い矩形の光斑を投げかける。この光の精密度——光の色、方向、強度、落ちる場所——が彼の空間にほとんど形而上学的な質を与えている。ジラルディ邸（Casa Gilardi, 1976）では、一本の光の柱が最上階から中庭を通って室内プールに落ち、水と光を空間の主役に変える。',
          ],
          en: [
            'Upon entering a Barragán building, the most immediate sensation is not spatial arrangement — it is color and light. His palette is rooted in Mexico\'s traditional paint colors: desert orange-red (rosa mexicano), melancholy deep purple, bright pink, warm yellow. These are not decorative whims but spatial definers. In the Barragán House, the pink dining-room walls bathe the entire space in a warm, flesh-toned glow — it is not a color you see but a color you inhabit.',
            'Barragán\'s use of water is equally singular. In his courtyards, water rarely appears as traditional fountains or waterfalls — more often it is a still, black sheet of water, lying flat on the ground like a mirror, reflecting sky and walls into abstract planes of color. At Las Arboledas (1958–1961), a long water channel cuts through a eucalyptus grove, with an equestrian path running alongside — the water surface mirrors high walls and tree shadows, turning horse riding into a surreal bodily experience. Here water is not landscape decoration but an architectural element as fundamental as walls, floors, and light.',
            'Most astonishing is his control of light. Barragán\'s light is never transparent — it is always filtered, reflected, or constrained. A shaft of light might pass through thick yellow glass panes to become warm amber, or fall from a hidden high window to cast a sharp rectangular spot on a dark stone floor. This precision with light — its color, direction, intensity, and point of landing — gives his spaces a nearly metaphysical quality. At Casa Gilardi (1976), a column of light drops from the upper floor through the atrium into an indoor swimming pool, turning water and light into the space\'s protagonists.',
          ],
        },
      },
      {
        title: { zh: '建筑作为庇护所：住宅与马厩', ja: 'シェルターとしての建築：住居と厩舎', en: 'Architecture as shelter: Houses and stables' },
        paragraphs: {
          zh: [
            '巴拉干建筑生涯的巅峰不在任何公共建筑中，而在住宅和私人委托中。他自己居住的巴拉干住宅（1948年建成，持续改造至去世）是世界上最完整地展现其建筑理念的作品：从街道几乎看不出这是一座房子——粗糙的石灰墙面高耸如堡垒，只有一扇不起眼的小门。但穿过入口后，空间逐层展开：前厅、书房、客厅、餐厅、屋顶露台、小花园——每个空间有各自的颜色、各自的光、各自的氛围，仿佛一部长篇小说中的不同章节。',
            '圣克里斯托巴尔马厩（Cuadra San Cristóbal, 1968）是巴拉干最不寻常的作品——它是为一座私人庄园设计的马厩。粉红色的高墙从草地上垂直升起，马匹在墙与墙之间穿行，一块巨大的深色水面铺在庭院中央，喷泉柱从中升起。这不是人们想象中"功能主义"的马厩，但巴拉干证明了：功能不是抽象的效率，而是具体的生活体验。马拉干在马厩，我们就为马厩创造一种尊严感——这种尊严本身就是最大的功能。',
            '巴拉干于1988年在墨西哥城去世，享年86岁。他的住宅于2004年被列为世界遗产。1980年普利兹克奖颁奖典礼上，巴拉干发表了一段简短却深刻的演讲。"在比例完美的花园中散步的时候，"他说，"在柱廊的阴影下休憩的时候，在教堂的安静中沉思的时候——我们体验到一种深层的平和与安宁。这就是建筑的目的。"这几句话也许是巴拉干所有作品和思想的最精确的总结。',
          ],
          ja: [
            'バラガンの建築人生の頂点は公共建築ではなく、住宅と個人からの依頼にある。彼自身が住んだバラガン邸（1948年完成、死ぬまで改造を続けた）は、彼の建築理念を最も完全に体現する作品である——通りからはほとんど家とは見えない。粗い漆喰壁が要塞のように高くそびえ、目立たない小さな扉があるだけだ。しかし入口を抜けると、空間が層をなして展開する——前室、書斎、居間、食堂、屋上テラス、小さな庭——各空間がそれぞれの色、それぞれの光、それぞれの雰囲気を持ち、まるで一編の長篇小説の異なる章のようである。',
            'クアドラ・サン・クリストバル厩舎（Cuadra San Cristóbal, 1968）はバラガンの最も異例な作品である——それは個人所有の荘園のために設計された厩舎だ。ピンクの高い壁が芝生の上から垂直に立ち上がり、馬が壁と壁のあいだを行き来し、中庭の中央には大きな暗色の水面が広がり、噴水柱がそこから立ち昇る。これは人々が想像する「機能主義的」な厩舎ではない。しかしバラガンは証明した——機能とは抽象的な効率ではなく、具体的な生活体験である。人が馬の世話をする場所なら、私たちはその場所に尊厳を創り出す——この尊厳それ自体が最大の機能である。',
            'バラガンは1988年、メキシコシティで86歳で亡くなった。彼の自邸は2004年に世界遺産に登録された。1980年のプリツカー賞授賞式で、バラガンは簡潔だが深いスピーチを行った。「完璧な比例をもつ庭園を散歩するとき、」と彼は言った、「柱廊の影で休息するとき、教会の静けさのなかで瞑想するとき——私たちは深い平和と安寧を体験する。これが建築の目的である。」この数行はおそらくバラガンのすべての作品と思想の最も正確な要約である。',
          ],
          en: [
            'The pinnacle of Barragán\'s architectural career lies not in public buildings but in houses and private commissions. The Barragán House (completed 1948, continuously remodeled until his death), where he himself lived, is the world\'s most complete manifestation of his architectural vision. From the street it scarcely reads as a house — rough plaster walls rise high like a fortress, with only an unobtrusive small door. But passing through the entrance, spaces unfold in layers: antechamber, library, living room, dining room, roof terrace, small garden — each space with its own color, its own light, its own atmosphere, like different chapters in a long novel.',
            'Cuadra San Cristóbal (1968) is Barragán\'s most unusual work — it is a stable designed for a private estate. Pink walls rise vertically from the grass; horses move between wall and wall; a large dark sheet of water lies at the courtyard\'s center, a fountain column rising from it. This is not what one imagines as a "functionalist" stable. But Barragán proved it: function is not abstract efficiency but concrete lived experience. If people groom horses here, we create dignity for that place — and that dignity is itself the greatest function.',
            'Barragán died in Mexico City in 1988 at age 86. His house was inscribed as a World Heritage site in 2004. At the 1980 Pritzker Prize ceremony, Barragán delivered a brief but profound speech. "When walking through a garden of perfect proportions," he said, "when resting in the shade of a colonnade, when meditating in the silence of a church — we experience a deep peace and serenity. This is the purpose of architecture." These few lines are perhaps the most precise summary of all of Barragán\'s work and thought.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'casa-gilardi', note: { zh: '光柱穿过多层空间落入泳池，将水和色彩变成建筑的主角。', ja: '光の柱が多層空間を通り抜けてプールに落ち、水と色彩を建築の主役に変える。', en: 'A column of light drops through multiple stories into the pool, making water and color the protagonists of architecture.' } },
      { slug: 'cuadra-san-cristobal', note: { zh: '粉红高墙与黑色水面，将马厩提升为具有雕塑尊严的场所。', ja: 'ピンクの高い壁と黒い水面が、厩舎を彫刻的尊厳を持つ場へと高める。', en: 'Pink walls and black water elevate a stable into a place of sculptural dignity.' } },
      { slug: 'luis-barragan-house-and-studio', note: { zh: '从街道上看接近堡垒，内部却是一部色彩和光的空间叙事。', ja: '通りからは要塞に近いが、内部は色彩と光の空間的物語である。', en: 'Almost a fortress from the street, the interior is a spatial narrative of color and light.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Luis Barragán', url: 'https://www.britannica.com/biography/Luis-Barragan' },
      { title: 'The Pritzker Architecture Prize: Luis Barragán', url: 'https://www.pritzkerprize.com/laureates/1980' },
      { title: 'Wikidata: Luis Barragán', url: 'https://www.wikidata.org/wiki/Q332246' },
      { title: 'Barragán Foundation', url: 'https://www.barragan-foundation.org/' },
    ],
  },

  'arne-jacobsen': {
    slug: 'arne-jacobsen',
    summary: {
      zh: '阿纳·雅各布森（Arne Jacobsen, 1902–1971）是丹麦现代主义最具代表性的人物——不仅作为建筑师，更作为设计师。他相信"总体艺术"（Gesamtkunstwerk）：一座建筑应该从门把手到沙发、从餐具到天花板的每一个细节都由同一只手设计。这种执念在他最著名的作品——哥本哈根的SAS皇家酒店（1960年）中达到极致，他为这座建筑设计了每一件家具（包括著名的蛋椅和天鹅椅）、织品、灯具甚至烟灰缸。他的建筑从严谨的现代主义网格中生长出来，但通过材料的温暖感和比例的优雅避免了现代主义的冰冷。',
      ja: 'アーネ・ヤコブセン（Arne Jacobsen, 1902–1971）はデンマーク・モダニズムの最も代表的な人物である——建築家としてのみならず、デザイナーとしても。彼は「総合芸術」（Gesamtkunstwerk）を信じた——ひとつの建物は、ドアの取っ手からソファまで、食器から天井まで、すべての細部が同じ手によってデザインされるべきである。この執念は彼の最も有名な作品——コペンハーゲンのSASロイヤルホテル（1960年）——で極致に達し、彼はこの建物のためにあらゆる家具（有名なエッグチェアとスワンチェアを含む）、織物、照明、さらには灰皿までもデザインした。彼の建築は厳格なモダニズムのグリッドから成長するが、素材の暖かさと比例の優雅さによってモダニズムの冷たさを回避する。',
      en: 'Arne Jacobsen (1902–1971) is the most representative figure of Danish modernism — not only as an architect but as a designer. He believed in the Gesamtkunstwerk (total work of art): a building should have every detail — from door handle to sofa, from cutlery to ceiling — designed by the same hand. This obsession reached its extreme in his most famous work, the SAS Royal Hotel in Copenhagen (1960), for which he designed every piece of furniture (including the iconic Egg and Swan chairs), textiles, lamps, and even ashtrays. His buildings grow from rigorous modernist grids but avoid modernism\'s coldness through material warmth and proportion\'s elegance.',
    },
    core_ideas: {
      zh: [
        '总体设计——建筑不是外壳，而是从结构到最细微细节的连续整体。好的建筑应该像"一个独立的世界"',
        '极简与温暖的平衡——减法美学不是目的，而是让光、材料和人的存在成为空间主角的手段',
        '现代主义的人性化——工业化的精确性不必以牺牲人的舒适为代价。丹麦现代证明：工厂可以生产温暖',
        '建筑师作为设计师——椅子、灯具、餐具不是建筑的附属品，而是建筑思想的延伸。建筑师的思考可以跨越尺度',
      ],
      ja: [
        '総合デザイン——建築は外殻ではなく、構造から最も細かなディテールまでの連続した全体である。良い建築は「ひとつの独立した世界」のようであるべきだ',
        'ミニマリズムと温かさのバランス——引き算の美学は目的ではなく、光、素材、人の存在を空間の主役にするための手段である',
        'モダニズムの人間化——工業化の精確さは人間の快適さを犠牲にする必要はない。デンマーク・モダンは証明する——工場は温かさを生産できる',
        'デザイナーとしての建築家——椅子、照明、食器は建築の付属品ではなく、建築的思考の延長である。建築家の思考はスケールを横断できる',
      ],
      en: [
        'Total design — architecture is not a shell but a continuous whole from structure to the finest detail. A good building should be like "a world of its own"',
        'Balance of minimalism and warmth — subtractive aesthetics are not the goal but the means of making light, material, and human presence the protagonists of space',
        'Humanizing modernism — industrial precision need not sacrifice human comfort. Danish modern proves: factories can produce warmth',
        'The architect as designer — chairs, lamps, cutlery are not appendages to architecture but extensions of architectural thinking. An architect\'s thought can cross scales',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Arne_Jacobsen_%281934%29.jpg',
      author: 'Unknown',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Arne_Jacobsen_(1934).jpg',
      alt: { zh: '阿纳·雅各布森肖像，1934年', ja: 'アーネ・ヤコブセンの肖像、1934年', en: 'Portrait of Arne Jacobsen, 1934' },
    },
    sections: [
      {
        title: { zh: '总体设计：从门把手到城市', ja: '総合デザイン：ドアノブから都市まで', en: 'Total design: From door handle to city' },
        paragraphs: {
          zh: [
            '雅各布森的"总体设计"理念在他1956–1960年设计的哥本哈根SAS皇家酒店中达到了最极致的表达。他不仅设计了这座22层高的玻璃幕墙建筑——丹麦的第一座摩天楼——还设计了内部的每一件物品。蛋椅（Egg Chair, 1958）和天鹅椅（Swan Chair, 1958）就是为这个项目诞生的。蛋椅的有机曲线外壳提供了一个半封闭的私人空间，在开放的酒店大堂中创造了一种"建筑中的建筑"。',
            '但这种总体控制并非控制狂——雅各布森相信一致性的力量。当建筑的外观（精确的铝和玻璃网格）与内部（温暖的有机家具形态）之间的张力被同一个大脑协调时，会产生一种特殊的和谐。酒店客房的织物图案、走廊的灯光节奏、前台的弧度——所有这些元素形成了一个不可分割的整体。即使在今天，进入SAS皇家酒店606房间（唯一保持原始设计的房间），你依然能感受到1960年代丹麦现代主义的完整性。',
            '雅各布森将同样的原则应用于更小的项目。索霍姆联排住宅（Søholm Row Houses, 1946–1950）展示了如何在住宅尺度上实现总体设计：三排阶梯状排列的黄砖住宅面向厄勒海峡，每户的窗户开口、室内楼梯、花园围墙都被精确地统一设计，但通过细微的变化避免重复感。这种"统一中的多样性"成为丹麦现代住宅设计的经典模式。',
          ],
          ja: [
            'ヤコブセンの「総合デザイン」理念は、1956–1960年に設計したコペンハーゲンのSASロイヤルホテルで最も極限的な表現に達した。彼はこの22階建てのガラスカーテンウォール建築——デンマーク初の超高層——を設計しただけでなく、内部のあらゆる物品もデザインした。エッグチェア（1958年）とスワンチェア（1958年）はこのプロジェクトのために生まれた。エッグチェアの有機的曲線シェルは半閉鎖的なプライベート空間を提供し、開放的なホテルロビーの中に「建築の中の建築」を創造する。',
            'しかしこの全体的コントロールはコントロール欲ではない——ヤコブセンは一貫性の力を信じていた。建築の外観（精緻なアルミとガラスのグリッド）と内部（暖かな有機的家具形態）のあいだの緊張が同じ頭脳によって調和されるとき、特別なハーモニーが生まれる。客室の織物パターン、廊下の光のリズム、フロントデスクの曲面——これらすべての要素が不可分な全体を形成する。今日でもSASロイヤルホテルの606号室（唯一オリジナルデザインを保つ部屋）に入ると、1960年代デンマーク・モダニズムの完全性を感じることができる。',
            'ヤコブセンは同じ原理をより小さなプロジェクトにも適用した。ソーホルム連棟住宅（Søholm Row Houses, 1946–1950）は住宅スケールでの総合デザインの実現を示す——三列の階段状に配置された黄レンガの住宅がエーレスンド海峡に面し、各戸の窓の開口、室内階段、庭の塀が精緻に統一的にデザインされながら、微妙な変化によって反復感を回避している。この「統一の中の多様性」はデンマークの現代住宅デザインの古典的モデルとなった。',
          ],
          en: [
            'Jacobsen\'s "total design" philosophy reached its most extreme expression in the SAS Royal Hotel in Copenhagen (1956–1960). He not only designed the 22-story glass-curtain-wall building — Denmark\'s first skyscraper — but every object inside it. The Egg Chair (1958) and Swan Chair (1958) were born for this project. The Egg Chair\'s organic curved shell provides a semi-enclosed private space, creating an "architecture within architecture" in the open hotel lobby.',
            'But this total control is not control-freakery — Jacobsen believed in the power of consistency. When the tension between the building\'s exterior (precise aluminum and glass grid) and interior (warm, organic furniture forms) is orchestrated by the same mind, a special harmony emerges. The fabric patterns in guest rooms, the rhythm of corridor lighting, the curve of the reception desk — all these elements form an indivisible whole. Even today, entering Room 606 of the SAS Royal Hotel (the only room preserving the original design), you can still feel the completeness of 1960s Danish modernism.',
            'Jacobsen applied the same principle to smaller projects. The Søholm Row Houses (1946–1950) demonstrate total design at residential scale: three rows of terraced yellow-brick houses face the Øresund strait, each unit\'s window openings, interior staircases, and garden walls precisely designed as a whole, yet nuanced variations prevent monotony. This "diversity within unity" became a classic model for Danish modern housing design.',
          ],
        },
      },
      {
        title: { zh: '丹麦现代主义：市政厅与国家银行', ja: 'デンマーク・モダニズム：市庁舎と国立銀行', en: 'Danish modernism: City Hall and the National Bank' },
        paragraphs: {
          zh: [
            '奥胡斯市政厅（Aarhus City Hall, 1941年，与Erik Møller合作）是雅各布森早期最重要的公共建筑。在纳粹占领丹麦的年代，这座建筑在保持现代主义清晰性的同时，微妙地引用了丹麦传统：深色大理石板覆盖的外墙使人联想到北欧的城堡传统，钟楼的简约白色体量则明确是现代主义的宣言。建筑在战争期间建成，它的存在本身就是文明抵抗的一种形式——它证明了另一种现代性是可能的：不是法西斯主义的纪念碑式古典主义，也不是冷峻的机器美学，而是民主的、人性的、扎根于地方的现代性。',
            '丹麦国家银行（Danish National Bank, 1978年完工，雅各布森去世后7年）是他最后的城市尺度作品。在哥本哈根历史中心的运河边，雅各布森以前所未有的克制设计了这座建筑：平直的挪威大理石外墙几乎没有任何装饰，只有精确的垂直石缝在光影中产生微分节奏。内部空间围绕着一条壮观的中轴线展开——一座20米高的中庭将日光引入地下交易大厅，访客在层层上升的楼梯上体验一种殿堂般的仪式感。这座建筑同时暗示着银行的神圣性与世俗性：金钱可以是一种信仰，但它发生在明亮、理性的空间中。',
          ],
          ja: [
            'オーフス市庁舎（Aarhus City Hall, 1941年、エーリク・ムラーとの協働）はヤコブセンの初期の最も重要な公共建築である。ナチス占領下のデンマークで、この建物はモダニズムの明晰さを保ちながら、デンマークの伝統を微妙に参照している——暗色の大理石パネルで覆われた外壁は北欧の城の伝統を連想させ、時計塔の簡素な白いヴォリュームは明確にモダニズムの宣言である。この建物は戦時中に完成し、その存在自体が文明的抵抗の一形態であった——別の近代性が可能であることを証明したのだ。ファシズムの記念碑的古典主義でもなく、冷たい機械美学でもなく、民主的で、人間的で、土地に根ざした近代性が。',
            'デンマーク国立銀行（Danish National Bank, 1978年完成、ヤコブセンの死後7年）は彼の最後の都市スケール作品である。コペンハーゲンの歴史的中心部の運河沿いに、ヤコブセンは前例のない抑制をもってこの建物を設計した——平坦なノルウェー産大理石の外壁にはほとんど装飾がなく、精緻な垂直の石目地が光と影のなかで微分リズムを生む。内部空間は壮麗な中軸線に沿って展開する——高さ20メートルのアトリウムが日光を地下のトレーディングフロアに導き入れ、訪問者は層をなして上昇する階段の上で殿堂のような儀式性を体験する。この建物は銀行の神聖性と世俗性を同時に示唆している——金銭は一種の信仰であり得るが、それは明るく理性的な空間のなかで起こる。',
          ],
          en: [
            'Aarhus City Hall (1941, in collaboration with Erik Møller) is Jacobsen\'s most important early public building. In Nazi-occupied Denmark, the building maintains modernist clarity while subtly referencing Danish tradition: dark marble-paneled exterior walls evoke Nordic castle traditions, while the clock tower\'s austere white volume is unmistakably a modernist statement. Completed during war, its very existence was a form of civilized resistance — it proved that another modernity was possible: not fascist monumental classicism, not cold machine aesthetics, but a democratic, humane, place-rooted modernity.',
            'The Danish National Bank (completed 1978, seven years after Jacobsen\'s death) is his final urban-scale work. On a canal in Copenhagen\'s historic center, Jacobsen designed this building with unprecedented restraint: flat Norwegian marble facades carry almost no ornament, only precise vertical stone joints generating micro-rhythms in light and shadow. The interior unfolds along a spectacular central axis — a 20-meter atrium brings daylight into the underground trading floor, and visitors ascending layered staircases experience a temple-like ritual. The building simultaneously suggests the sacred and the profane of banking: money can be a kind of faith, but it occurs in bright, rational space.',
          ],
        },
      },
      {
        title: { zh: '工厂生产的诗意：雅各布森的椅子', ja: '工場がつくる詩：ヤコブセンの椅子', en: 'Factory-made poetry: Jacobsen\'s chairs' },
        paragraphs: {
          zh: [
            '如果说雅各布森的建筑作品数量可观（50多座），他的工业设计输出则更为惊人。蛋椅、天鹅椅、蚂蚁椅（Ant Chair, 1952）、系列7椅（Series 7, 1955）——这些名字构成了现代设计的核心词汇。蚂蚁椅是雅各布森为诺和诺德制药公司员工食堂设计的，由九片胶合板和一个钢管底座组成，极其轻便且可堆叠。它至今仍在生产，全球已售出超过500万把——这也许是现代设计史上最民主的物件之一。',
            '雅各布森的工业设计不是建筑的附属——它是同一种思想在不同尺度的展开。蛋椅的有机曲面与SAS酒店立面的精确网格之间的张力，正是丹麦现代的核心辩证法：精确与柔软、工业与手工、理性与身体。一把雅各布森的椅子不仅是一件雕塑，也是一件工具——它支撑人的身体，适应人的姿势，在长时间的坐卧中保持舒适。这种对身体感受的关注——触感、重量、温度——使他的设计超越风格，成为一种持久的日常品质。',
            '1971年，雅各布森在哥本哈根去世，享年69岁。他一生中的大部分时间都是争议人物：一方面他被视为北欧现代主义的旗手，另一方面他的全面控制作风受到批评。但半个世纪后回看，他的"总体设计"不是控制欲的表现，而是一种已经失落的建筑学美德：在一个日益碎片化的世界中，仍有建筑师相信世界可以是完整的——从一只勺子到一个国家银行，可以用同一双手、同一种感觉来塑造。',
          ],
          ja: [
            'ヤコブセンの建築作品が相当数（50棟以上）あるとすれば、彼の工業デザインの産出はさらに驚異的である。エッグチェア、スワンチェア、アントチェア（1952年）、セブンチェア（シリーズ7, 1955年）——これらの名前はモダンデザインの核心的語彙を構成する。アントチェアはヤコブセンがノボ・ノルディスク製薬会社の社員食堂のためにデザインしたもので、9枚の合板と一本のスチールパイプベースから成り、極めて軽量でスタッキング可能である。現在も生産が続き、全世界で500万脚以上が販売された——これはおそらくモダンデザイン史上最も民主的なもののひとつである。',
            'ヤコブセンの工業デザインは建築の付属ではない——それは同じ思想の異なるスケールでの展開である。エッグチェアの有機曲面とSASホテル立面の精緻なグリッドのあいだの緊張こそが、デンマーク・モダンの核心的弁証法である——精確さと柔らかさ、工業と手工、理性と身体。ヤコブセンの椅子は彫刻であると同時に道具でもある——人の身体を支え、人の姿勢に適応し、長時間の坐臥でも快適さを保つ。この身体感覚への配慮——触感、重さ、温度——が彼のデザインをスタイルを超えた、持続的な日常の質へと高めている。',
            '1971年、ヤコブセンはコペンハーゲンで69歳で亡くなった。彼の生涯の大部分において、彼は論争の的となる人物だった——一方で北欧モダニズムの旗手と見なされ、他方でその全面的コントロールの姿勢が批判された。しかし半世紀後に振り返れば、彼の「総合デザイン」はコントロール欲の表れではなく、すでに失われた建築学の美徳であった——ますます断片化する世界のなかで、世界は完全であり得ると信じる建築家がまだいた。一つのスプーンから一つの国立銀行まで、同じ手で、同じ感覚で形づくることができるのだと。',
          ],
          en: [
            'If Jacobsen\'s architectural output is substantial (over fifty buildings), his industrial-design output is even more staggering. The Egg Chair, Swan Chair, Ant Chair (1952), Series 7 (1955) — these names form the core vocabulary of modern design. The Ant Chair, designed for the staff canteen of Novo Nordisk pharmaceutical company, consists of nine plywood pieces and a single steel-tube base, extremely lightweight and stackable. Still in production, over five million have been sold worldwide — perhaps one of modern design\'s most democratic objects.',
            'Jacobsen\'s industrial design is not subordinate to his architecture — it is the same thought unfolding at a different scale. The tension between the Egg Chair\'s organic curves and the SAS Hotel facade\'s precise grid is the core dialectic of Danish modern: precision and softness, industry and craft, reason and the body. A Jacobsen chair is both sculpture and tool — it supports the human body, adapts to posture, remains comfortable through long hours of sitting. This attention to bodily sensation — touch, weight, temperature — lifts his designs beyond style into an enduring everyday quality.',
            'Jacobsen died in Copenhagen in 1971 at age 69. For most of his life he was a controversial figure: on one hand celebrated as the standard-bearer of Nordic modernism, on the other criticized for his total-control approach. But looking back half a century later, his "total design" was not an expression of control-freakery but a now-lost architectural virtue: in an increasingly fragmented world, there was still an architect who believed the world could be whole — that from a spoon to a national bank, it could be shaped by the same hands, the same sensibility.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'aarhus-city-hall', note: { zh: '战争时期的民主宣言，大理石外墙与白色钟楼结合了北欧传统与现代形式。', ja: '戦時下の民主主義宣言。大理石の外壁と白い時計塔が北欧の伝統と近代的形式を結ぶ。', en: 'A wartime declaration of democracy, where marble facades and a white clock tower unite Nordic tradition with modern form.' } },
      { slug: 'danish-national-bank', note: { zh: '极简大理石立面与壮丽的中庭，将银行的庄严转化为光与空间的体验。', ja: '極限まで切り詰めた大理石の立面と壮麗なアトリウム。銀行の荘厳さを光と空間の体験に変える。', en: 'Reduced marble facades and a spectacular atrium, transforming banking solemnity into an experience of light and space.' } },
      { slug: 's-holm-row-houses', note: { zh: '梯状黄砖住宅面海而建，统一中求变化，定义了丹麦现代住宅的美学。', ja: '階段状の黄レンガ住宅が海に面して建つ。統一のなかの変化がデンマークの現代住宅美学を定義した。', en: 'Terraced yellow-brick houses facing the sea — variation within unity, defining the aesthetic of Danish modern housing.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Arne Jacobsen', url: 'https://www.britannica.com/biography/Arne-Jacobsen' },
      { title: 'Danish Architecture Center: Arne Jacobsen', url: 'https://www.dac.dk/en/knowledgebase/architecture/arne-jacobsen/' },
      { title: 'Wikidata: Arne Jacobsen', url: 'https://www.wikidata.org/wiki/Q273572' },
      { title: 'Fritz Hansen: The Egg Chair', url: 'https://www.fritzhansen.com/en/egg' },
    ],
  },

  'giuseppe-terragni': {
    slug: 'giuseppe-terragni',
    summary: {
      zh: '朱塞佩·泰拉尼（Giuseppe Terragni, 1904–1943）是意大利理性主义建筑最激进的灵魂。他只活了39岁——1943年从苏联前线返回后因血栓去世——但他的短暂生涯留下了现代建筑史上最精粹的作品群。泰拉尼将建筑视为一个严密的逻辑系统：平面、立面、剖面不是三个独立的图纸，而是同一空间概念在不同方向的"投影"。他的科莫法西斯宫（Casa del Fascio, 1936年）以一座白色几何网格建筑将透明性与权威性悖论般地结合，成为20世纪最受争议和研究的建筑之一。他在法西斯意大利的政治语境下工作——这是他无法逃避的历史矛盾——但他的建筑语言超越了当时的意识形态，成为一种纯粹的、几乎是伦理性的建筑学坚持。',
      ja: 'ジュゼッペ・テラーニ（Giuseppe Terragni, 1904–1943）はイタリア合理主義建築の最も急進的な魂である。彼はわずか39年の生涯——1943年、ソ連戦線から帰還後に血栓で死去——で、近代建築史上最も精粋な作品群を残した。テラーニは建築をひとつの厳密な論理体系と見なした——平面、立面、断面は三つの独立した図面ではなく、同一の空間概念の異なる方向への「投影」である。彼のコモのファシオ館（Casa del Fascio, 1936年）は、白い幾何学グリッドの建築によって透明性と権威性を逆説的に結合し、20世紀で最も論争され研究される建築のひとつとなった。彼はファシスト・イタリアの政治的文脈のなかで仕事をした——これは彼が逃れられなかった歴史的矛盾である——しかし彼の建築言語は当時のイデオロギーを超えて、純粋な、ほとんど倫理的な建築的堅持となった。',
      en: 'Giuseppe Terragni (1904–1943) is Italian Rationalist architecture\'s most radical soul. He lived only 39 years — dying of thrombosis after returning from the Russian front in 1943 — yet his brief career left one of the most distilled bodies of work in modern architectural history. Terragni viewed architecture as a rigorous logical system: plan, elevation, and section are not three independent drawings but "projections" of the same spatial concept in different directions. His Casa del Fascio in Como (1936) paradoxically combined transparency with authority in a white geometric grid building, becoming one of the 20th century\'s most contested and studied works. He worked within the political context of Fascist Italy — a historical contradiction he could not escape — but his architectural language transcended the ideology of its time, becoming a pure, almost ethical architectural conviction.',
    },
    core_ideas: {
      zh: [
        '建筑作为逻辑系统——平面、立面、剖面不是独立的图纸，而是同一空间概念的相互关联的投影。每一根线的位置都有空间必然性',
        '透明性与层叠——通过开窗、退让和玻璃面的策略，将建筑的内外关系变得暧昧而丰富。一座建筑不应是封闭的盒子，而是一个"开放的空间框架"',
        '古典构成与现代语言的对话——比例、对称、轴线等古典原则可以在完全现代的词汇中重生，不需要任何历史装饰',
        '立面作为空间的"面纱"——立面不是被动的皮，而是内部空间力量的外部显现。每一根线条都对应着内部的空间事件',
      ],
      ja: [
        '論理体系としての建築——平面、立面、断面は独立した図面ではなく、同一の空間概念の相互に関連する投影である。すべての線の位置には空間的必然性がある',
        '透明性と層状化——窓、後退、ガラス面の戦略を通じて、建築の内外関係を曖昧で豊かなものにする。建物は閉じた箱ではなく「開かれた空間の枠組」であるべきだ',
        '古典的構成と近代的言語の対話——比例、対称、軸線といった古典的原則は、いかなる歴史的装飾もなしに、完全に近代的な語彙のなかで再生できる',
        '空間の「ヴェール」としての立面——立面は受動的な皮ではなく、内部の空間的な力の外的な現れである。すべての線は内部の空間的出来事に対応している',
      ],
      en: [
        'Architecture as a logical system — plan, elevation, and section are not independent drawings but interrelated projections of the same spatial concept. Every line\'s position has spatial necessity',
        'Transparency and layering — through strategies of fenestration, recessing, and glass planes, the interior-exterior relationship becomes ambiguous and rich. A building should be not a closed box but an "open spatial framework"',
        'Dialogue between classical composition and modern language — classical principles of proportion, symmetry, and axis can be reborn in a completely modern vocabulary, without any historical ornament',
        'The facade as a spatial "veil" — the facade is not a passive skin but the outward manifestation of interior spatial forces. Every line corresponds to an interior spatial event',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Giuseppe_Terragni.jpg',
      author: 'Unknown',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Giuseppe_Terragni.jpg',
      alt: { zh: '朱塞佩·泰拉尼肖像', ja: 'ジュゼッペ・テラーニの肖像', en: 'Portrait of Giuseppe Terragni' },
    },
    sections: [
      {
        title: { zh: '科莫法西斯宫：透明性与权力的悖论', ja: 'コモのファシオ館：透明性と権力のパラドックス', en: 'Casa del Fascio: The paradox of transparency and power' },
        paragraphs: {
          zh: [
            '科莫法西斯宫（Casa del Fascio, 1932–1936）是泰拉尼最著名也是最复杂的作品。这是为墨索里尼的法西斯党科莫总部设计的建筑——这本身就是一个无法忽视的政治重量。但泰拉尼没有选择封闭的、堡垒般的权力形式。相反，他设计了一个精确的白色立方体（33.2米 x 33.2米 x 16.6米，接近5:5:2.5的比例），四面完全开放：钢筋混凝土的网格框架内填充了大面积的玻璃和通风的穿孔屏。法西斯党的集会空间直接面对广场，通过20扇通高玻璃门连接内外——任何路过的公民都能看到里面的活动。这是一种激进的建筑姿态：权力机关不是隐藏的，而是完全暴露在公共视野中。',
            '建筑内部的逻辑同样精妙。平面组织围绕一个中庭展开，各房间的高度、光线和通向中庭的视觉联系都经过精确校准。泰拉尼将勒·柯布西耶的"自由平面"概念与意大利宫殿的传统类型结合在一起：中庭不再是文艺复兴宫殿的封闭庭院，而是一个被玻璃屋顶覆盖的室内集会空间。立面的每一根划分线都对应着内部的空间分隔——这不是装饰性的网格，而是空间的真实投影。建筑历史学家彼得·埃森曼（Peter Eisenman）后来用整本书分析这座建筑，认为它的形式复杂性超越了当时任何意识形态框架。',
          ],
          ja: [
            'コモのファシオ館（Casa del Fascio, 1932–1936）はテラーニの最も有名かつ最も複雑な作品である。これはムッソリーニのファシスト党コモ本部のために設計された建築であり——それ自体が無視できない政治的重みを持つ。しかしテラーニは閉鎖的で要塞的な権力の形式を選ばなかった。代わりに彼は精密な白いキューブ（33.2m x 33.2m x 16.6m、約5:5:2.5の比例）を設計し、四面を完全に開放した——鉄筋コンクリートのグリッド枠組みの中に広大なガラスと通風の良い穿孔スクリーンを充填した。ファシスト党の集会空間は広場に直接面し、20枚の床から天井までのガラス扉を通じて内外が結ばれる——通りかかる市民なら誰でも内部の活動を見ることができる。これは急進的な建築的ポーズである——権力機関は隠されるのではなく、完全に公共の視線に曝される。',
            '建物内部の論理も同様に精巧である。平面は中庭を中心に組織され、各部屋の高さ、光、中庭への視覚的接続が精密に較正されている。テラーニはル・コルビュジエの「自由平面」の概念とイタリアの宮殿の伝統的類型を融合させた——中庭はもはやルネサンス宮殿の閉じたコートヤードではなく、ガラス屋根で覆われた屋内集会空間である。立面のすべての分割線は内部の空間分割に対応している——これは装飾的なグリッドではなく、空間の真実の投影である。建築史家のピーター・アイゼンマンは後にこの建築を分析するために一冊の本を費やし、その形式の複雑さが当時のいかなるイデオロギー的枠組みをも超えていると論じた。',
          ],
          en: [
            'The Casa del Fascio in Como (1932–1936) is Terragni\'s most famous and most complex work. It was designed as the Como headquarters for Mussolini\'s Fascist Party — a political weight that cannot be ignored. But Terragni did not choose a closed, fortress-like form of power. Instead, he designed a precise white cube (33.2m x 33.2m x 16.6m, a near-perfect 5:5:2.5 ratio), completely open on all four sides: a reinforced-concrete grid frame infilled with large areas of glass and airy perforated screens. The party assembly space faces the piazza directly, connected to the outside through twenty full-height glass doors — any passing citizen can see the activities inside. This is a radical architectural gesture: the apparatus of power is not hidden but fully exposed to the public gaze.',
            'The internal logic of the building is equally refined. The plan organizes around a central court, with each room\'s height, light, and visual connection to the court precisely calibrated. Terragni merged Le Corbusier\'s "free plan" concept with the traditional typology of the Italian palazzo: the court is no longer a closed Renaissance courtyard but an interior assembly space covered by a glass roof. Every dividing line on the facade corresponds to an interior spatial division — this is not decorative grid but the true projection of space. Architectural historian Peter Eisenman later devoted an entire book to analyzing this building, arguing that its formal complexity transcended any ideological framework of its time.',
          ],
        },
      },
      {
        title: { zh: '层叠与透明：从住宅到幼儿园', ja: '層状化と透明性：住宅から幼稚園まで', en: 'Layering and transparency: From houses to nursery schools' },
        paragraphs: {
          zh: [
            '泰拉尼的空间天赋不仅体现在公共建筑中，他在住宅项目中的实验同样深刻。科莫利-鲁斯蒂奇住宅（Casa Comolli-Rustici, 1935年）是一座小型公寓建筑，泰拉尼在这里将"层叠的透明性"概念推向了新高度。建筑沿街面的立面由一系列退让的平面组成——阳台、窗户、遮阳板、玻璃砖——每一层都部分蔽着后面的空间，创造出一种"猜不透明"的效果：你无法一眼确定建筑的内和外边界在哪里。这种手法后来被总结为"现象透明性"理论的核心案例。',
            '泰拉尼大厦（Palazzo Terragni, 1932年，原名Novocomum）是他在科莫的第一座重要建筑，也是他最早的"背叛"——原本设计为传统风格以取得批准，但实际建造时他完全替换为白色现代主义立面。业主愤怒地将泰拉尼告上法庭，但这座建筑因其纯粹的形式力量获得了建筑界的辩护，成为意大利理性主义的宣言式作品。五层高的弧面转角体量以精确的水平线划分，顶层退台创造了一个屋顶花园——这是"功能主义"的形式诉求与城市美学的完美协商。',
            '圣埃利亚幼儿园（Asilo Sant\'Elia, 1934–1937年）展示了泰拉尼在建筑类型上的灵活。在这个儿童空间中，他用明亮的色彩、通透的玻璃隔断和室内外园林的连接创造了一个"可以呼吸"的建筑。幼儿园的体量从一条水平的基座上生长出来——让儿童的视角能看到外面世界的活动。泰拉尼在这座建筑中减少了法西斯宫那样的几何严格性，增加了柔软和阳光，证明了理性主义不必冷峻。',
          ],
          ja: [
            'テラーニの空間的才能は公共建築だけでなく、住宅プロジェクトでの実験も同様に深い。コモリ-ルスティチ邸（Casa Comolli-Rustici, 1935年）は小さなアパート建築であり、テラーニはここで「層状の透明性」の概念を新たな高みへと押し上げた。通りに面する立面は一連の後退する平面——バルコニー、窓、日除け、ガラスブロック——から構成され、各層が後ろの空間を部分的に覆い隠すことで、「推測できない透明度」の効果を生み出す——建物の内と外の境界がどこにあるのか、一目では確定できない。この手法は後に「現象的透明性」理論の核心的事例としてまとめられた。',
            'テラーニ・パラッツォ（Palazzo Terragni, 1932年、旧称Novocomum）は彼のコモにおける最初の重要な建築であり、彼の最初の「裏切り」でもあった——許可を得るために伝統的スタイルとして当初設計されたが、実際の建設時に彼はそれを完全に白いモダニズムの立面に置き換えた。施主は激怒してテラーニを法廷に訴えたが、この建物はその純粋な形式の力によって建築界の弁護を受け、イタリア合理主義の宣言的作品となった。五階建ての弧を描くコーナーヴォリュームが精緻な水平線で分割され、最上階のセットバックが屋上庭園をつくり出す——これは「機能主義」の形式的要求と都市美学の完璧な交渉である。',
            'サンテリア幼稚園（Asilo Sant\'Elia, 1934–1937年）はテラーニの建築類型における柔軟さを示す。この子どもたちのための空間で、彼は明るい色彩、透過的なガラス間仕切り、室内外の庭の接続を用いて、「呼吸できる」建築を創造した。幼稚園のヴォリュームは水平の基壇から成長し——子どもの目の高さから外の世界の活動が見えるようになっている。テラーニはこの建築で、ファシオ館のような幾何学的厳格さを減らし、柔らかさと日差しを加え、合理主義が冷たくある必要はないことを証明した。',
          ],
          en: [
            'Terragni\'s spatial gifts manifest not only in public buildings but equally profoundly in residential projects. Casa Comolli-Rustici (1935), a small apartment building, is where Terragni pushed the concept of "layered transparency" to new heights. The street-facing facade is composed of a series of receding planes — balconies, windows, sunshades, glass blocks — each layer partially veiling the space behind, creating an effect of "indecipherable transparency": you cannot determine at a glance where the building\'s interior-exterior boundary lies. This technique was later codified as a core case study of "phenomenal transparency" theory.',
            'Palazzo Terragni (1932, originally Novocomum) was his first major building in Como and his first "betrayal" — originally designed in a traditional style to secure approval, he completely replaced it with a white modernist facade during construction. The furious owner sued Terragni, but the building was defended by the architectural community for its pure formal power, becoming a manifesto-work of Italian Rationalism. The five-story curved corner volume is divided by precise horizontal lines, with the top floor setback creating a roof garden — a perfect negotiation between "functionalist" formal demands and urban aesthetics.',
            'Asilo Sant\'Elia (1934–1937) demonstrates Terragni\'s flexibility across building types. In this space for children, he used bright colors, transparent glass partitions, and connections between indoor and outdoor gardens to create a "breathing" architecture. The nursery\'s volume grows from a horizontal base — allowing children\'s eye-level views of the outside world\'s activity. In this building, Terragni reduced the geometric strictness of the Casa del Fascio in favor of softness and sunlight, proving that Rationalism need not be cold.',
          ],
        },
      },
      {
        title: { zh: '未竟之路：短生涯，长回响', ja: '未完の道：短い生涯、長い残響', en: 'The unfinished road: A short life, a long echo' },
        paragraphs: {
          zh: [
            '泰拉尼的短促生涯（他去世时只有39岁）使他的作品集极其精炼——总共约15座完成建筑，其中真正的杰作不超过10座。但他留下的未建成项目更为震撼，尤其是但丁纪念馆（Danteum, 1938年），一座为但丁《神曲》设计的概念性纪念碑。但丁纪念馆从未建造，但它的图纸——将《地狱》、《炼狱》和《天堂》的空间旅程翻译为一系列建筑房间的序列——是建筑史上最伟大的纸上作品之一。每个房间的光线、比例、地面纹理都对应着但丁诗句中的精神氛围。它证明了泰拉尼追求的的"建筑的叙事能力"——空间可以像文字一样讲述一个故事。',
            '泰拉尼的建筑在战后的意大利长期被忽视。他的法西斯党身份——虽然在1940年代他实际上已经与政权疏远——使他的名字在战后建筑史中被冷落。直到1960年代，新一代建筑师（包括阿尔多·罗西和彼得·埃森曼）重新发现了他的作品，将其从意识形态的负担中解放出来。他们看到的是：泰拉尼的建筑形式具有独立于政治语境的数学精确性——它们是一套关于比例、透明、层叠和逻辑的通用语言。',
            '科莫法西斯宫今天仍然是建筑学讨论的焦点案例并非偶然。它提出了一个至今无法简单回答的问题：建筑形式是否可以独立于它服务的权力？泰拉尼用一生回答了这个问题——不是用语言，而是用线条、表面和光。他的建筑不是法西斯主义的建筑，而是"建筑的建筑"——这是最高的自律，也是最深的坚持。',
          ],
          ja: [
            'テラーニの短い生涯（彼が亡くなったときわずか39歳）は彼の作品集を極めて精選されたものにしている——合計約15の完成建築、そのうち真の傑作は10を超えない。しかし彼が残した未建成プロジェクトはさらに衝撃的であり、とりわけダンテウム（Danteum, 1938年）——ダンテ『神曲』のために設計された概念的記念碑——がそうだ。ダンテウムは決して建てられなかったが、その図面——『地獄』『煉獄』『天国』の空間的旅を一連の建築的部屋のシークエンスへと翻訳する——は建築史上最も偉大な紙上作品のひとつである。各部屋の光、比例、床の質感はダンテの詩句の精神的な雰囲気に対応している。それはテラーニが追求していた「建築の物語能力」——空間が文字のように物語を語ることができる——を証明している。',
            'テラーニの建築は戦後のイタリアで長らく無視された。彼のファシスト党員としての経歴——1940年代には実際に彼は政権から疎遠になっていたが——が戦後建築史のなかで彼の名を冷遇させた。1960年代になって、新世代の建築家（アルド・ロッシやピーター・アイゼンマンを含む）が彼の作品を再発見し、イデオロギーの重荷から解放した。彼らが見たのは——テラーニの建築形式は政治的文脈から独立した数学的精確さを持っている——それらは比例、透明性、層状化、論理についての普遍的言語のセットである。',
            'コモのファシオ館が今日もなお建築学の焦点的事例であり続けるのは偶然ではない。それは今も単純に答えられない問いを提起する——建築形式はそれが奉仕する権力から独立しうるか？テラーニは生涯をかけてこの問いに答えた——言葉ではなく、線と面と光によって。彼の建築はファシズムの建築ではなく「建築の建築」である——これは最高の自律であり、最も深い堅持である。',
          ],
          en: [
            'Terragni\'s brief career (he was only 39 when he died) makes his oeuvre extremely distilled — about fifteen completed buildings in total, no more than ten being true masterpieces. But his unbuilt projects are even more staggering, especially the Danteum (1938), a conceptual monument designed for Dante\'s "Divine Comedy." The Danteum was never built, but its drawings — translating the spatial journey of Inferno, Purgatorio, and Paradiso into a sequence of architectural rooms — are among the greatest paper works in architectural history. Each room\'s light, proportions, and floor texture correspond to the spiritual atmosphere of Dante\'s verses. It proves what Terragni was pursuing: "architecture\'s narrative capacity" — space can tell a story as words do.',
            'Terragni\'s architecture was long neglected in postwar Italy. His Fascist Party membership — although he had in fact distanced himself from the regime by the 1940s — left his name cold-shouldered in postwar architectural history. Not until the 1960s did a new generation of architects (including Aldo Rossi and Peter Eisenman) rediscover his work, liberating it from ideological baggage. What they saw: Terragni\'s architectural forms possess a mathematical precision independent of political context — they are a universal language about proportion, transparency, layering, and logic.',
            'It is no accident that the Casa del Fascio in Como remains a focal case study in architectural discourse today. It poses a question still not simply answered: can architectural form be independent of the power it serves? Terragni answered this question with his life — not with words, but with lines, surfaces, and light. His architecture is not the architecture of Fascism but the "architecture of architecture" — the highest autonomy, the deepest conviction.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'asilo-santelia', note: { zh: '为儿童设计的"呼吸的建筑"，明亮的色彩与透明隔断让理性主义变得柔软。', ja: '子どもたちのための「呼吸する建築」。明るい色彩と透明な間仕切りが合理主義を柔らかくする。', en: 'A "breathing building" for children, where bright colors and transparent partitions soften Rationalism.' } },
      { slug: 'casa-comolli-rustici', note: { zh: '层叠的立面创造"现象透明性"，内外边界在视觉上不断模糊与重建。', ja: '層状の立面が「現象的透明性」を創り出し、内外の境界が視覚的に絶えず曖昧化され再建される。', en: 'A layered facade creating "phenomenal transparency," where interior-exterior boundaries constantly blur and reconstruct visually.' } },
      { slug: 'palazzo-terragni', note: { zh: '意大利理性主义的宣言式作品，弧面转角与水平线条在古典城市中宣告现代。', ja: 'イタリア合理主義の宣言的作品。弧を描くコーナーと水平線が古典的都市のなかで近代を宣言する。', en: 'Italian Rationalism\'s manifesto-work, where a curved corner and horizontal lines declare modernity within a classical city.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Giuseppe Terragni', url: 'https://www.britannica.com/biography/Giuseppe-Terragni' },
      { title: 'Wikidata: Giuseppe Terragni', url: 'https://www.wikidata.org/wiki/Q458956' },
      { title: 'Eisenman, "Giuseppe Terragni: Transformations, Decompositions, Critiques" (2003)', url: 'https://www.monacellipress.com/book/giuseppe-terragni/' },
      { title: 'Centro Studi Giuseppe Terragni', url: 'https://www.centrostuditerragni.it/' },
    ],
  },

  'rafael-moneo': {
    slug: 'rafael-moneo',
    summary: {
      zh: '拉斐尔·莫内奥（Rafael Moneo, 1937– ）是西班牙当代建筑中最深刻的实践者-学者。1996年普利兹克奖得主，他在40多年的职业生涯中将建造与教学、历史与创新、地方性与普遍性编织成一条紧密的知识甬道。莫内奥的建筑不以标志性形体获胜——你很难把他的名字与某个特定的形式符号挂钩——但他在"如何在历史中建造"这一命题上提供了20世纪后期最成熟的答案。从梅里达的罗马艺术博物馆（在两千年前的遗址上叠合新与旧）到圣塞巴斯蒂安的库尔萨尔文化中心（两座向大海倾斜的玻璃立方体），莫内奥的每一座建筑都是一个关于时间、材料和公共生活的论题。',
      ja: 'ラファエル・モネオ（Rafael Moneo, 1937– ）はスペイン現代建築における最も深い実践者-学者である。1996年プリツカー賞受賞者であり、40年以上のキャリアのなかで、建設と教育、歴史と革新、地方性と普遍性を一本の緊密な知の通路へと織り上げた。モネオの建築は象徴的な形状で勝負しない——彼の名を特定の形式記号に結びつけるのは難しい——しかし彼は「歴史のなかでいかに建てるか」という命題に対して、20世紀後半で最も成熟した答えを提供した。メリダのローマ美術館（二千年の遺跡の上に新と旧を重ね合わせる）からサン・セバスティアンのクルサール文化センター（海に向かって傾く二つのガラスの立方体）まで、モネオのどの建物も、時間、素材、公共生活についてのひとつの論題である。',
      en: 'Rafael Moneo (1937– ) is the deepest practitioner-scholar in contemporary Spanish architecture. A 1996 Pritzker Prize laureate, he has woven building and teaching, history and innovation, locality and universality into a tight intellectual corridor over forty-plus years. Moneo\'s architecture does not win through iconic form — it is hard to pin his name to any particular formal signature — yet he has provided the most mature late-20th-century answer to the question of "how to build in history." From the National Museum of Roman Art in Mérida (layering new and old atop two-thousand-year-old ruins) to the Kursaal Cultural Centre in San Sebastián (two glass cubes tilting toward the sea), each of Moneo\'s buildings is a thesis on time, material, and public life.',
    },
    core_ideas: {
      zh: [
        '在历史中建造——新建筑不应要么模仿旧形式要么无视旧语境，而是应当与历史"对话"。好的建筑让过去的痕迹更清晰，而不是抹去它们',
        '砖的语言——莫内奥将砖发展成一种完整的空间语法：砖不仅决定建筑的表面，还决定它的结构、尺度、光线和与土地的关系',
        '类型学的延续与变形——建筑类型（博物馆、教堂、市政厅）有其内在逻辑和历史记忆，建筑师的任务是延续这种记忆的同时推进它的现代变形',
        '建筑作为知识学科——莫内奥相信建筑实践必须与教学和研究共生。他在哈佛设计研究生院担任系主任多年，将这种"实用智性"注入每一件作品中',
      ],
      ja: [
        '歴史のなかで建てる——新しい建築は古い形式を模倣するのでも、古い文脈を無視するのでもなく、歴史と「対話」すべきである。良い建築は過去の痕跡をより明確にし、消し去るのではない',
        'レンガの言語——モネオはレンガを完全な空間文法へと発展させた。レンガは建築の表面だけでなく、その構造、スケール、光、大地との関係を決定する',
        '類型学の持続と変形——建築類型（美術館、教会、市庁舎）には内在的論理と歴史的記憶があり、建築家の任務はその記憶を持続させつつ、その現代的変形を推進することである',
        '知の学問としての建築——モネオは建築実践が教育と研究と共生しなければならないと信じている。彼はハーバード大学デザイン大学院の学科長を長年務め、この「実践的知性」をすべての作品に注入した',
      ],
      en: [
        'Building in history — new architecture should neither imitate old forms nor ignore old contexts but engage history in "dialogue." Good architecture makes the traces of the past more legible, not erased',
        'The language of brick — Moneo developed brick into a complete spatial grammar: brick determines not only a building\'s surface but its structure, scale, light, and relationship to the land',
        'Typological continuity and transformation — building types (museum, church, city hall) carry inherent logic and historical memory; the architect\'s task is to sustain that memory while propelling its modern transformation',
        'Architecture as a discipline of knowledge — Moneo believes architectural practice must coexist with teaching and research. He chaired Harvard GSD for years, infusing every work with this "practical intellectuality"',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Rafael_Moneo.jpg',
      author: 'Unknown',
      license: 'CC BY-SA',
      source_url: 'https://commons.wikimedia.org/wiki/File:Rafael_Moneo.jpg',
      alt: { zh: '拉斐尔·莫内奥肖像', ja: 'ラファエル・モネオの肖像', en: 'Portrait of Rafael Moneo' },
    },
    sections: [
      {
        title: { zh: '在废墟上建造：梅里达罗马艺术博物馆', ja: '廃墟の上に建てる：メリダのローマ美術館', en: 'Building on ruins: Mérida\'s National Museum of Roman Art' },
        paragraphs: {
          zh: [
            '梅里达罗马艺术博物馆（1980–1986）是莫内奥的第一个大师级作品，也是理解他建筑哲学的最佳入口。项目基地位于西班牙梅里达——罗马帝国时期的路西塔尼亚行省首府，地下埋藏着完整的罗马城市遗址，包括一座圆形剧场和一座剧场。博物馆的任务不是展示"关于"罗马的文物，而是保护并展示罗马本身——这座建筑必须同时是考古遗址、博物馆和城市空间。',
            '莫内奥的解决方案是一套惊人的空间策略。他用一系列平行的砖拱墙——参照罗马建筑的比例但不复制任何具体形式——在遗址之上建立了一个"空中考古层"。参观者从入口上方的夹层进入，透过砖拱间的空隙向下俯瞰罗马墙基和铺地。随着步道逐渐下降，你从20世纪的建筑空间步入两千年前的街道，新与旧的物理边界在砖的连续性中消解。',
            '砖是这个项目的关键词。莫内奥使用了细长的罗马砖尺寸（24 x 11 x 4厘米），由当地工匠手工制作。砖不仅是面材——它是结构（承载拱顶和墙体）、是空间（定义房间的尺度）、是光（砖的表面吸收和扩散光线）、是时间（新砖与两千年前的罗马砖在同一块土地上有同样的颜色和纹理）。这座博物馆不是"新瓶装旧酒"——它让新和旧共享同一种物质，使两者之间的对话变得有形。',
          ],
          ja: [
            'メリダのローマ美術館（1980–1986）はモネオの最初のマスターピースであり、彼の建築哲学を理解するための最良の入口である。敷地はスペインのメリダ——ローマ帝国時代のルシタニア属州の首都で、地下には完全なローマ都市遺跡が埋まっており、円形闘技場と劇場を含む——にある。美術館の任務はローマ「について」の遺物を展示することではなく、ローマそのものを保存し展示することだった——この建物は考古学的遺跡、美術館、都市空間の三つを同時に果たさねばならなかった。',
            'モネオの解決策は驚異的な空間戦略である。彼は一連の平行するレンガアーチ壁——ローマ建築の比例を参照するが特定の形式を模倣しない——によって、遺跡の上に「空中の考古学的層」を確立した。来館者は入口上のメザニンから入り、レンガアーチの隙間を通して下のローマの壁基礎と舗床を見下ろす。歩道が徐々に下降するにつれて、あなたは20世紀の建築空間から二千年前の街路へと歩み入り、新と旧の物理的境界がレンガの連続性のなかで溶解する。',
            'レンガはこのプロジェクトの鍵語である。モネオは細長いローマレンガの寸法（24 x 11 x 4 cm）を用い、地元の職人によって手作りされた。レンガは表面材ではない——それは構造であり（アーチと壁を支える）、空間であり（部屋のスケールを定義する）、光であり（レンガの表面が光を吸収し拡散する）、時間である（新しいレンガは二千年前のローマレンガと同じ土地で同じ色と質感を持つ）。この美術館は「新しい瓶に古い酒」ではない——新と旧が同じ物質を共有し、両者の対話を触知可能なものにしている。',
          ],
          en: [
            'The National Museum of Roman Art in Mérida (1980–1986) is Moneo\'s first masterwork and the best entry point for understanding his architectural philosophy. The site is Mérida, Spain — capital of the Roman province of Lusitania — where a complete Roman city lies buried underground, including an amphitheater and a theater. The museum\'s task was not to display objects "about" Rome but to preserve and exhibit Rome itself — the building had to be simultaneously an archaeological site, a museum, and an urban space.',
            'Moneo\'s solution is a breathtaking spatial strategy. He established an "aerial archaeological layer" above the ruins through a series of parallel brick arch walls — referencing Roman proportions without imitating any specific form. Visitors enter at a mezzanine above the entrance; through gaps between brick arches they look down onto Roman wall foundations and paving. As the walkway gradually descends, you step from 20th-century architectural space into two-thousand-year-old streets — the physical boundary between new and old dissolves in brick\'s continuity.',
            'Brick is the keyword of this project. Moneo used slender Roman brick dimensions (24 x 11 x 4 cm), handmade by local craftsmen. Brick is not cladding — it is structure (carrying vaults and walls), space (defining room scale), light (brick surfaces absorb and diffuse light), time (new brick shares the same color and texture as two-thousand-year-old Roman brick on the same soil). This museum is not "old wine in new bottles" — it makes new and old share the same substance, rendering their dialogue tangible.',
          ],
        },
      },
      {
        title: { zh: '库尔萨尔与洛杉矶大教堂：从边缘到信仰', ja: 'クルサールとLA大聖堂：縁辺から信仰へ', en: 'Kursaal and LA Cathedral: From edge to faith' },
        paragraphs: {
          zh: [
            '圣塞巴斯蒂安的库尔萨尔文化中心（Kursaal Convention Centre, 1999年）展示了莫内奥的另一种天赋：在极简的几何中注入诗意的张力。两座巨大的半透明玻璃立方体倾斜地矗立在乌吕梅亚河入海口的沙滩上，像两块被海浪冲刷上岸的水晶。白天它们沉默而巨大，反射着坎塔布里亚海的灰色天空；夜晚它们变成两盏发光的灯笼，为这座巴斯克海岸城市创造了一个新的视觉地标。莫内奥将这两座"搁浅的石头"放置在河与海的交汇处——一种对边缘地带的建筑表达：文化中心正处于城市、河流和大西洋的三重边界上。',
            '洛杉矶天使之母大教堂（Cathedral of Our Lady of the Angels, 2002年）是莫内奥在信仰空间中的一次大胆尝试。在一个地震多发且缺乏欧洲石造传统的地域，莫内奥设计了一座完全由现浇混凝土构成的现代大教堂。其形式回避了传统哥特或巴洛克教堂的惯例——没有尖塔，没有飞扶壁，没有彩色玻璃窗——取而代之的是一个巨大的、不对称的庇护所空间，薄如羽毛的雪花石膏窗户将加利福尼亚的强烈日光过滤成柔和的琥珀色光芒。这座建筑引发了很多争议：一些人认为它太"冷"，太不像一座教堂。但莫内奥的赌注是：信仰可以在现代建筑语言中发声——它不需要伪装成中世纪的样子来证明自己的严肃性。',
          ],
          ja: [
            'サン・セバスティアンのクルサール文化センター（Kursaal, 1999年）はモネオのもうひとつの才能を示す——極限の幾何学に詩的緊張を注入すること。二つの巨大な半透明ガラスの立方体がウルメア川河口の砂浜に傾いて立ち、まるで二つの水晶が波に打ち上げられたかのようだ。昼間は黙して巨大に、カンタブリア海の灰色の空を反射し、夜には二つの発光するランタンとなって、このバスク海岸の都市に新たな視覚的ランドマークを創り出す。モネオはこの二つの「座礁した石」を川と海の合流点に置いた——縁辺地帯への建築的表現である。文化センターはまさに都市、川、大西洋の三重の境界上にある。',
            'ロサンゼルスの天使の聖母大聖堂（Cathedral of Our Lady of the Angels, 2002年）は、モネオの信仰空間における大胆な試みである。地震が多くヨーロッパの石造伝統を持たない土地で、モネオは完全に現場打ちコンクリートでできた現代的大聖堂を設計した。その形式は伝統的なゴシックやバロック教会の慣例を回避する——尖塔も、フライング・バットレスも、ステンドグラスもない——代わりに現れるのは、巨大で非対称な聖域空間であり、羽のように薄いアラバスターの窓がカリフォルニアの強い日差しを柔らかな琥珀色の光に濾過する。この建物は多くの論争を呼んだ——あまりに「冷たい」、あまりに教会らしくないという批判がある。しかしモネオの賭けはこうだ——信仰は現代建築の言語で声を発することができる——その真剣さを証明するために中世のふりをする必要はない。',
          ],
          en: [
            'The Kursaal Convention Centre in San Sebastián (1999) reveals another of Moneo\'s gifts: infusing poetic tension into extreme geometry. Two enormous translucent glass cubes stand tilted on the sand at the mouth of the Urumea River, like two crystals washed ashore by waves. By day they are silent and massive, reflecting the gray sky of the Cantabrian Sea; by night they become two glowing lanterns, creating a new visual landmark for this Basque coastal city. Moneo placed these two "beached stones" at the confluence of river and sea — an architectural expression of the edge condition: the cultural center sits precisely at the triple boundary of city, river, and Atlantic.',
            'The Cathedral of Our Lady of the Angels in Los Angeles (2002) is Moneo\'s bold experiment in a space of faith. In an earthquake-prone region without Europe\'s stone-building tradition, Moneo designed a contemporary cathedral entirely of cast-in-place concrete. Its form evades the conventions of Gothic or Baroque churches — no spires, no flying buttresses, no stained glass — replaced instead by a vast, asymmetrical sanctuary space, where wafer-thin alabaster windows filter California\'s harsh sunlight into a soft amber glow. The building stirred considerable controversy: some found it too "cold," not church-like enough. But Moneo\'s wager was this: faith can speak in a modern architectural language — it need not dress up as medieval to prove its seriousness.',
          ],
        },
      },
      {
        title: { zh: '建造与教学的共生', ja: '建設と教育の共生', en: 'The symbiosis of building and teaching' },
        paragraphs: {
          zh: [
            '莫内奥是当代建筑中罕见的"学者型建筑师"（architect-intellectual）。他从1970年代开始在巴塞罗那高等建筑技术学院（ETSAB）和后来的哈佛设计研究生院任教，并于1985–1990年担任哈佛GSD建筑系主任。对莫内奥来说，教学不是实践的休息站——它是实践的延伸。在课堂中分析一座帕拉第奥别墅的结构，与在梅里达设计一座博物馆——两者使用同一种智性能力。',
            '莫内奥的文章和讲座构成了理解他建筑的重要补充。他的论文《关于类型学》（On Typology, 1978年）是现代类型学理论的基础文本之一，影响了阿尔多·罗西和新理性主义运动。但不同于罗西对类型学近乎形而上的执着，莫内奥强调类型是"活着的"——它在每一次历史建造中都被修正、变形和更新。好的建筑师不是类型的奴仆，而是类型的再发明者。',
            '2000年代，莫内奥继续以平均每两到三年完成一座重要建筑的节奏工作——这种稳定的生产力在68岁之后的建筑师中并不常见。普林斯顿大学神经科学研究所（2014年）、休斯顿美术博物馆奥黛丽·琼斯·贝克楼（2000年）——这些晚期作品证明他的建筑语言在持续演化，但核心价值保持不变：每一座建筑都是对土地、历史和当代公共生活的一次思考。莫内奥证明了建筑可以同时是实践、研究和教学——三者不是分离的生涯阶段，而是同一种智性生活的不同面向。',
          ],
          ja: [
            'モネオは現代建築において稀な「学者型建築家」（architect-intellectual）である。彼は1970年代からバルセロナ高等建築技術学院（ETSAB）および後のハーバード大学デザイン大学院で教鞭を執り、1985–1990年にはハーバードGSDの建築学科長を務めた。モネオにとって、教育は実践の休憩所ではない——それは実践の延長である。教室でパラーディオの別荘の構造を分析することと、メリダで美術館を設計すること——両者は同じ知的能力を用いる。',
            'モネオの論文と講義は、彼の建築を理解するための重要な補完をなしている。彼の論文「類型学について」（On Typology, 1978年）は現代類型学理論の基礎テクストのひとつであり、アルド・ロッシと新合理主義運動に影響を与えた。しかしロッシの類型学に対するほとんど形而上学的な執着とは異なり、モネオは類型が「生きている」ことを強調する——それは歴史的な建設のたびごとに修正され、変形され、更新される。良い建築家は類型の僕ではなく、類型の再発明者である。',
            '2000年代、モネオはおおよそ二～三年に一つの重要な建築を完成させるペースで仕事を続けた——この安定した生産性は68歳を超えた建築家には珍しい。プリンストン大学神経科学研究所（2014年）、ヒューストン美術館オードリー・ジョーンズ・ベック棟（2000年）——これらの後期作品は彼の建築言語が持続的に進化していることを証明すると同時に、核心的価値が変わらないことも示す——どの建物も土地、歴史、現代の公共生活についてのひとつの思考である。モネオは証明した——建築は同時に実践、研究、教育であり得る。三つは分離したキャリア段階ではなく、同一の知的生活の異なる側面である。',
          ],
          en: [
            'Moneo is a rare "architect-intellectual" in contemporary architecture. He began teaching at ETSAB in Barcelona in the 1970s and later at the Harvard Graduate School of Design, chairing the architecture department from 1985 to 1990. For Moneo, teaching is not a rest stop from practice — it is practice\'s extension. Analyzing the structure of a Palladian villa in a classroom and designing a museum in Mérida — both draw on the same intellectual capacity.',
            'Moneo\'s essays and lectures form an essential complement to understanding his architecture. His paper "On Typology" (1978) is one of the foundational texts of modern typological theory, influencing Aldo Rossi and the Neo-Rationalist movement. But unlike Rossi\'s almost metaphysical fixation on typology, Moneo emphasizes that types are "alive" — they are corrected, deformed, and renewed in each historical act of building. The good architect is not the servant of types but their re-inventor.',
            'Through the 2000s, Moneo continued working at a pace of roughly one significant building every two to three years — a steady productivity uncommon for architects past sixty-eight. The Princeton Neuroscience Institute (2014), the Audrey Jones Beck Building at the Museum of Fine Arts, Houston (2000) — these late works prove his architectural language is continuously evolving while core values remain constant: each building is a meditation on land, history, and contemporary public life. Moneo proved that architecture can be simultaneously practice, research, and teaching — not separated career phases but different facets of the same intellectual life.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'national-museum-of-roman-art', note: { zh: '平行的砖拱墙在罗马遗址上方架起"空中考古层"，新砖与旧石使用同一种泥土语言。', ja: '平行するレンガアーチ壁がローマ遺跡の上に「空中の考古学的層」を架ける。新しいレンガと古い石が同じ土の言語を用いる。', en: 'Parallel brick arch walls erect an "aerial archaeological layer" above Roman ruins — new brick and old stone speak the same language of earth.' } },
      { slug: 'kursaal-convention-centre', note: { zh: '两座倾斜的半透明立方体，立于河海交汇处，如被海浪冲刷上岸的水晶。', ja: '二つの傾いた半透明の立方体が川と海の合流点に立つ。波に打ち上げられた水晶のように。', en: 'Two tilted translucent cubes at the confluence of river and sea, like crystals washed ashore by waves.' } },
      { slug: 'cathedral-of-our-lady-of', note: { zh: '现浇混凝土的现代大教堂，雪花石膏窗将加州日光滤为琥珀色，信仰无须伪装成中世纪。', ja: '現場打ちコンクリートの現代的大聖堂。アラバスターの窓がカリフォルニアの日差しを琥珀色に濾過する。信仰は中世のふりをする必要はない。', en: 'A cast-in-place concrete contemporary cathedral where alabaster windows filter California sunlight into amber — faith need not dress as medieval.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: Rafael Moneo', url: 'https://www.pritzkerprize.com/laureates/1996' },
      { title: 'Encyclopaedia Britannica: Rafael Moneo', url: 'https://www.britannica.com/biography/Rafael-Moneo' },
      { title: 'Wikidata: Rafael Moneo', url: 'https://www.wikidata.org/wiki/Q311165' },
      { title: 'Moneo, "Theoretical Anxiety and Design Strategies" (2004)', url: 'https://mitpress.mit.edu/9780262134439/' },
    ],
  },

  'mario-botta': {
    slug: 'mario-botta',
    summary: {
      zh: '马里奥·博塔（Mario Botta, 1943– ）是瑞士提契诺学派最具辨识度的建筑师。他的建筑以厚重的砖石墙体、精确的几何切割和"光之缝隙"而著称——每一座建筑都像一个从大地上凿出的庇护所，日光从天窗或墙体裂缝中像液体一样注入内部空间。博塔在勒·柯布西耶和路易·康的事务所工作过，但他将两位大师的影响转化为一种独特的"地中海-阿尔卑斯"方言：既现代又古老，既理性又感性。他的作品遍布全球，从瑞士山间的私人住宅到旧金山现代艺术博物馆（SFMOMA），每座建筑都是一次对"场所精神"的几何提炼。',
      ja: 'マリオ・ボッタ（Mario Botta, 1943– ）はスイス・ティチーノ派で最も識別しやすい建築家である。彼の建築は重厚なレンガと石の壁、精確な幾何学的切断、「光の裂け目」で知られ——どの建物も大地から穿たれたシェルターのようであり、日光がトップライトや壁の隙間から液体のように内部空間に注ぎ込まれる。ボッタはル・コルビュジエとルイス・カーンの事務所で働いたが、二人の巨匠の影響を独自の「地中海-アルプス」方言へと変換した——現代的でありながら古代的、理性的でありながら感覚的。彼の作品は世界中に広がり、スイス山中の個人住宅からサンフランシスコ近代美術館（SFMOMA）まで、どの建物も「場所の精神」の幾何学的抽出である。',
      en: 'Mario Botta (1943– ) is the most recognizable architect of the Swiss Ticino School. His architecture is known for massive brick-and-stone walls, precise geometric cuts, and "fissures of light" — each building like a shelter carved from the earth, where daylight pours into the interior through skylights or wall slits like liquid. Botta worked in the offices of Le Corbusier and Louis Kahn, but he transformed both masters\' influences into a unique "Mediterranean-Alpine" dialect: simultaneously modern and ancient, rational and sensual. His works span the globe, from private houses in the Swiss mountains to SFMOMA, each building a geometric distillation of the genius loci.',
    },
    core_ideas: {
      zh: [
        '建筑作为大地作品——建筑不是"放在"场地上的物体，而是从场地中雕刻和建造出来的。墙体的重量感让人意识到大地的存在',
        '光作为建造材料——光不是照明的附属品，而是与砖、石、混凝土同等地位的材料。天窗和光缝是博塔建筑最独特的签名',
        '几何学的纪念性——圆形、方形和对称轴不只是一种美学选择，而是一种将建筑锚定在古典传统中的方法。即使在最小的项目中，也保持这种几何尊严',
        '场所与现代性的结合——提契诺山区的石造传统与现代理性主义的空间逻辑之间没有矛盾。传统材料（砖、石）可以承载现代空间',
      ],
      ja: [
        '大地の作品としての建築——建築は敷地に「置かれる」物体ではなく、敷地から彫り出され建設されるものである。壁の重みの感覚が大地の存在を意識させる',
        '建設材料としての光——光は照明の付属品ではなく、レンガ、石、コンクリートと同等の地位を持つ素材である。トップライトと光の裂け目はボッタ建築の最も独特な署名である',
        '幾何学の記念碑性——円形、正方形、対称軸は単なる美的選択ではなく、建築を古典的伝統のなかに錨づける方法である。最も小さなプロジェクトにおいてもこの幾何学的尊厳を保つ',
        '場所と近代性の結合——ティチーノ山間部の石造伝統と近代合理主義の空間論理のあいだに矛盾はない。伝統的素材（レンガ、石）は近代的空間を担うことができる',
      ],
      en: [
        'Architecture as earthwork — buildings are not objects "placed on" a site but carved and constructed from it. The weight-sense of walls makes one aware of the earth\'s presence',
        'Light as a construction material — light is not an accessory to illumination but a material of equal standing to brick, stone, and concrete. Skylights and light-slits are Botta\'s most distinctive signature',
        'Geometric monumentality — the circle, square, and axis of symmetry are not merely aesthetic choices but a method of anchoring architecture in the classical tradition. Even the smallest projects maintain this geometric dignity',
        'Uniting place and modernity — there is no contradiction between the stone-building tradition of the Ticino mountains and the spatial logic of modern rationalism. Traditional materials (brick, stone) can carry modern space',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Mario_Botta.jpg',
      author: 'Unknown',
      license: 'CC BY-SA',
      source_url: 'https://commons.wikimedia.org/wiki/File:Mario_Botta.jpg',
      alt: { zh: '马里奥·博塔肖像', ja: 'マリオ・ボッタの肖像', en: 'Portrait of Mario Botta' },
    },
    sections: [
      {
        title: { zh: '从提契诺山谷到世界：地域的普适性', ja: 'ティチーノの谷から世界へ：地域の普遍性', en: 'From the Ticino valley to the world: The universal in the local' },
        paragraphs: {
          zh: [
            '博塔的建筑学根植于瑞士南部提契诺州的地理和文化——阿尔卑斯山南坡的山谷、石造的罗马式教堂、陡峭的山地景观。他在威尼斯大学师从卡洛·斯卡帕（Carlo Scarpa），并在勒·柯布西耶和路易·康的事务所短期工作过。这些经历在他的作品中产生了奇妙的化学反应：康的几何庄严、柯布西耶的粗野混凝土、斯卡帕的材料叙事——全都在博塔的提契诺方言中找到了新的归宿。',
            '他的第一座重要住宅作品——比安奇住宅（Casa Bianchi, 1973年在里瓦圣维塔莱）——已经包含了博塔全部建筑语法的种子。一座红色的砖砌塔楼以钢桥连接到山坡的公路，住宅本身是一个紧凑的矩形体量，顶部以天窗切开。所有的内部空间围绕着一个中央垂直轴线展开。从这座小房子开始，博塔确立了他一生的两个主题：几何的纯粹和场所的具体。',
            '1995年完成的旧金山现代艺术博物馆（SFMOMA）是博塔从"瑞士地区建筑师"转变为"国际建筑师"的标志性事件。一座五层高的条纹砖石体量矗立在旧金山市中心，中央是一个巨大的圆柱形天窗——博塔称之为"光之眼"——将加利福尼亚的日光引入中庭。外立面的黑白条纹砖面象征着这座城市的历史层次：西班牙殖民、淘金热、现代科技。SFMOMA在争议中成立，但它无可否认地赋予了一座缺乏建筑标志的城市一个强有力的文化焦点。',
          ],
          ja: [
            'ボッタの建築学はスイス南部ティチーノ州の地理と文化——アルプス南斜面の谷、石造りのロマネスク教会、急峻な山地景観——に根ざしている。彼はヴェネツィア大学でカルロ・スカルパに師事し、ル・コルビュジエとルイス・カーンの事務所で短期間働いた。これらの経験は彼の作品のなかで奇妙な化学反応を起こした——カーンの幾何学的荘厳さ、コルビュジエの打放しコンクリート、スカルパの素材の物語性——すべてがボッタのティチーノ方言のなかで新たな居場所を見つけた。',
            '彼の最初の重要な住宅作品——ビアンキ邸（Casa Bianchi, 1973年、リーヴァ・サン・ヴィターレ）——はすでにボッタの建築文法のすべての種子を含んでいた。赤いレンガの塔が鋼鉄の橋で山腹の道路と結ばれ、住宅自体はコンパクトな矩形のヴォリュームで、頂部はトップライトで切り裂かれている。すべての内部空間は中央の垂直軸の周りに展開する。この小さな家から、ボッタは生涯を貫く二つの主題を確立した——幾何学の純粋さと場所の具体性。',
            '1995年に完成したサンフランシスコ近代美術館（SFMOMA）は、ボッタが「スイスの地方建築家」から「国際的建築家」へと変貌した象徴的出来事である。五階建ての縞模様のレンガと石のヴォリュームがサンフランシスコのダウンタウンに立ち、中央には巨大な円筒形のトップライト——ボッタが「光の眼」と呼ぶもの——がカリフォルニアの日光をアトリウムに導き入れる。外壁の白黒の縞模様のレンガ面はこの都市の歴史的層を象徴している——スペイン植民地、ゴールドラッシュ、現代テクノロジー。SFMOMAは論争のなかに誕生したが、建築のアイコンに乏しかったこの都市に強力な文化的焦点を与えたことは否定できない。',
          ],
          en: [
            'Botta\'s architecture is rooted in the geography and culture of Ticino in southern Switzerland — Alpine south-slope valleys, stone-built Romanesque churches, steep mountain landscapes. He studied under Carlo Scarpa at the University of Venice and worked briefly in the offices of Le Corbusier and Louis Kahn. These experiences produced a curious alchemy in his work: Kahn\'s geometric solemnity, Le Corbusier\'s brute concrete, Scarpa\'s material storytelling — all found new habitation in Botta\'s Ticino dialect.',
            'His first important residential work — Casa Bianchi (1973, in Riva San Vitale) — already contained the seeds of Botta\'s entire architectural grammar. A red brick tower connected to the hillside road by a steel bridge, the house itself is a compact rectangular volume sliced open at the top by a skylight. All interior spaces unfold around a central vertical axis. From this small house onward, Botta established the two themes of his lifetime: geometric purity and site specificity.',
            'The San Francisco Museum of Modern Art (SFMOMA), completed in 1995, was the symbolic event of Botta\'s transformation from "Swiss regional architect" to "international architect." A five-story striped brick-and-stone volume stands in downtown San Francisco, with a massive cylindrical skylight at its center — what Botta calls the "eye of light" — drawing California daylight into the atrium. The facade\'s black-and-white striped brick face symbolizes the city\'s historical layers: Spanish colonization, the Gold Rush, modern technology. SFMOMA was born in controversy, but it undeniably gave a city short on architectural icons a powerful cultural focus.',
          ],
        },
      },
      {
        title: { zh: '神圣空间的几何学', ja: '聖なる空間の幾何学', en: 'The geometry of sacred space' },
        paragraphs: {
          zh: [
            '博塔的职业生涯中有一个独特且持续的线索：宗教建筑。从1990年代开始，他设计了超过20座教堂和小礼拜堂，其中许多成为当代宗教建筑的经典案例。埃夫里大教堂（Évry Cathedral, 1992–1995年，巴黎郊区）是博塔最雄心勃勃的宗教项目：一个截断的圆柱体，由浅色的砖砌筑，顶部以一圈倾斜的树木环绕。圆柱体的切面朝向天空开放——这是一个关于"向上"的空间宣告，将信徒的视线从地面引向不可见的无限。',
            '圣约翰二十三世教堂（Santo Papa Giovanni XXIII Church, 2004年在塞里亚泰）展示了博塔在宗教空间中的另一个关键主题：光的戏剧性。建筑的东立面被一道垂直的狭缝完全切开，日光从裂缝中涌入，在墙面和地面上投下移动的光斑。这不是装饰性的光——它是空间的主角。在一天的不同时间、一年的不同季节，这道光以不同的角度和长度进入，使教堂的空间与宇宙的节律同步。',
            '博塔的宗教建筑之所以独树一帜，在于他不依赖任何特定的教派符号。圣彼得、圣母、十字架——这些传统图像在他的空间中被"几何学"本身替代。圆代表完整与永恒，方形代表大地与秩序，三角形代表神圣的三位一体。博塔将宗教情绪转化为空间体验：当一个人站在高耸的圆柱形空间中，头顶的天窗将光柱投下——这不需要任何解释，身体的感受本身就是信仰的证明。',
          ],
          ja: [
            'ボッタのキャリアには一貫した独特の線がある——宗教建築である。1990年代から、彼は20以上の教会とチャペルを設計し、その多くが現代宗教建築の古典的事例となった。エヴリー大聖堂（Évry Cathedral, 1992–1995年、パリ近郊）はボッタの最も野心的な宗教プロジェクトである——切り詰められた円筒形で、明るい色のレンガで積まれ、頂部を傾斜した樹木の輪が取り囲む。円筒の切断面は空に向かって開かれている——これは「上へ」の空間的宣言であり、信者の視線を地面から不可視の無限へと導く。',
            '聖ヨハネ二十三世教会（Santo Papa Giovanni XXIII Church, 2004年、セリアーテ）はボッタの宗教空間におけるもう一つの鍵となる主題——光のドラマ——を示す。建物の東立面は一本の垂直な細い切れ目によって完全に切り裂かれ、日光が亀裂から流れ込み、壁面と床の上に動く光斑を投げかける。これは装飾的な光ではない——光が空間の主役である。一日の異なる時間、一年の異なる季節に、この光は異なる角度と長さで入り込み、教会の空間を宇宙のリズムと同期させる。',
            'ボッタの宗教建築が際立つのは、彼が特定の教派のシンボルに依存しない点にある。聖ペテロ、聖母、十字架——これらの伝統的図像は彼の空間では「幾何学」そのものに置き換えられる。円は完全性と永遠を、方形は大地と秩序を、三角形は聖なる三位一体を表す。ボッタは宗教的情緒を空間体験へと変換する——人が高くそびえる円筒形空間に立ち、頭上から光の柱が降り注ぐとき——これにはいかなる説明も必要ない。身体の感覚それ自体が信仰の証しである。',
          ],
          en: [
            'There is a singular and persistent thread in Botta\'s career: sacred architecture. From the 1990s onward, he has designed over twenty churches and chapels, many of them becoming classic examples of contemporary religious architecture. Évry Cathedral (1992–1995, outside Paris) is Botta\'s most ambitious religious project: a truncated cylinder built of pale brick, ringed at the top by a crown of tilted trees. The cylinder\'s cut face opens toward the sky — a spatial declaration of "upwardness," drawing the believer\'s gaze from the ground toward the invisible infinite.',
            'Santo Papa Giovanni XXIII Church (2004, in Seriate) demonstrates another key theme in Botta\'s sacred spaces: the drama of light. The building\'s east facade is completely sliced open by a single vertical slit; daylight pours through the fissure, casting moving spots of light on walls and floor. This is not decorative light — it is the protagonist of the space. At different times of day, different seasons of the year, this light enters at different angles and lengths, synchronizing the church\'s space with cosmic rhythms.',
            'What makes Botta\'s sacred architecture distinctive is that he does not rely on any denomination-specific symbols. Saint Peter, the Madonna, the cross — these traditional images are replaced in his spaces by "geometry" itself. The circle represents completeness and eternity; the square, earth and order; the triangle, the Holy Trinity. Botta transforms religious emotion into spatial experience: when a person stands in a soaring cylindrical space with a shaft of light falling from above — no explanation is needed. The body\'s sensation is itself proof of faith.',
          ],
        },
      },
      {
        title: { zh: '构造与地理：博塔的建筑哲学', ja: '構築と地理：ボッタの建築哲学', en: 'Tectonics and geography: Botta\'s architectural philosophy' },
        paragraphs: {
          zh: [
            '博塔的建筑学中有一种执念：墙。在他的语言中，墙不是空间的皮肤——墙是空间本身。一道50厘米厚的砖墙不仅是结构，也是热质（thermal mass）、是光的调节器、是室内外世界的界限、是与大地对话的界面。博塔曾引用路易·康的话："砖想成为什么？"他自己回答说："砖想成为墙。"这不是一句文字游戏——它概括了博塔整个设计生涯的伦理：让材料成为它真正想成为的东西。',
            '这一哲学在1990年代之后经历了有趣的演变。他早期的作品（包括SFMOMA和埃夫里大教堂）以砖为主要材料，砖的分量、色彩和模块化秩序构成了他的视觉身份。但2000年后，博塔越来越多地使用石材——灰色和白色的花岗岩、大理石和石灰石——以及裸露的混凝土。材料的变化并未改变核心的空间逻辑：对称、轴线、向心性和光隙。材料是方言，但语法保持不变。',
            '博塔从未停止教学和写作。他在瑞士门德里西奥建筑学院（Accademia di Architettura di Mendrisio）创立并主持了建筑学课程，将提契诺从一个地理概念转变为建筑学的一个思想中心。他认为建筑教育不应该发生在远离工地的象牙塔里，而应该与建造保持直接的联系。这一信念也反映在他自己的实践中——尽管他在全球设计，他的事务所始终留在提契诺的卢加诺，从未迁往苏黎世或日内瓦。博塔的生涯告诉我们：全球化不必然意味着无根；恰恰相反，在一个地方扎得越深，在世界中就越不可复制。',
          ],
          ja: [
            'ボッタの建築学にはひとつの執念がある——壁。彼の言語において、壁は空間の皮膚ではない——壁こそが空間そのものである。厚さ50センチのレンガの壁は構造であるだけでなく、熱質量（thermal mass）であり、光の調節器であり、内と外の世界の境界であり、大地と対話する界面である。ボッタはルイス・カーンの言葉を引用する——「レンガは何になりたいのか？」——そして自ら答える：「レンガは壁になりたい。」これは言葉遊びではない——ボッタの全設計人生の倫理を要約している。素材をそれが真になりたいものにさせること。',
            'この哲学は1990年代以降、興味深い進化を遂げた。彼の初期作品（SFMOMAとエヴリー大聖堂を含む）はレンガを主材料とし、レンガの重み、色彩、モジュール秩序が彼の視覚的アイデンティティを構成していた。しかし2000年以降、ボッタはますます石材——灰色と白色の花崗岩、大理石、石灰石——と打放しコンクリートを用いるようになった。素材の変化は核心の空間論理を変えていない——対称、軸線、求心性、光の裂け目。素材は方言だが、文法は変わらない。',
            'ボッタは教育と執筆を決して止めなかった。彼はスイスのメンドリジオ建築アカデミー（Accademia di Architettura di Mendrisio）で建築学課程を創設し主宰し、ティチーノを地理的概念から建築学の一つの思想中心へと変えた。彼は建築教育が建設現場から遠く離れた象牙の塔で行われるべきではなく、建造との直接的接触を保つべきだと信じている。この信念は彼自身の実践にも反映されている——世界中で設計しながらも、彼の事務所は一貫してティチーノのルガーノに留まり、チューリッヒやジュネーヴに移転することはなかった。ボッタのキャリアは私たちに教える——グローバル化は無根を意味しない。むしろ逆に——ひとつの場所に深く根を張るほど、世界のなかで複製不可能になる。',
          ],
          en: [
            'There is one obsession in Botta\'s architecture: the wall. In his language, the wall is not the skin of space — the wall is space itself. A 50-centimeter-thick brick wall is not only structure but also thermal mass, a light modulator, the boundary between interior and exterior worlds, the interface for dialogue with the earth. Botta has quoted Louis Kahn\'s question — "What does the brick want to be?" — and answered it himself: "The brick wants to be a wall." This is not wordplay — it encapsulates the ethic of Botta\'s entire design life: letting materials become what they truly want to be.',
            'This philosophy underwent an interesting evolution after the 1990s. His early work (including SFMOMA and Évry Cathedral) used brick as the primary material; brick\'s weight, color, and modular order constituted his visual identity. But after 2000, Botta increasingly deployed stone — gray and white granite, marble, limestone — and exposed concrete. The change in material has not altered the core spatial logic: symmetry, axis, centricity, and the light fissure. Materials are dialect, but the grammar remains unchanged.',
            'Botta never stopped teaching and writing. He founded and chaired the architecture program at the Accademia di Architettura di Mendrisio in Switzerland, transforming Ticino from a geographical concept into an intellectual center of architecture. He believes architectural education should not happen in an ivory tower far from the construction site but must maintain direct contact with building. This conviction is reflected in his own practice — though designing globally, his office has always stayed in Lugano, Ticino, never moving to Zurich or Geneva. Botta\'s career tells us: globalization does not mean rootlessness. On the contrary — the deeper you root in one place, the more irreproducible you become in the world.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'san-francisco-museum-of-modern', note: { zh: '条纹砖石体量与巨大"光之眼"中庭，为旧金山创造了一个强有力的文化地标。', ja: '縞模様のレンガと石のヴォリュームと巨大な「光の眼」のアトリウムがサンフランシスコに強力な文化的ランドマークを創り出した。', en: 'A striped brick-and-stone volume with a vast "eye of light" atrium, creating a powerful cultural landmark for San Francisco.' } },
      { slug: 'evry-cathedral', note: { zh: '截断的圆柱体向天空开放，以几何学替代宗教符号，将信仰转化为空间体验。', ja: '切り詰められた円筒が空に向かって開く。幾何学が宗教的シンボルを代替し、信仰を空間体験へと変換する。', en: 'A truncated cylinder open to the sky, where geometry replaces religious symbols, transforming faith into spatial experience.' } },
      { slug: 'museum-tinguely', note: { zh: '为动态雕塑艺术家让·丁格利设计的博物馆，建筑本身在莱茵河畔与艺术对话。', ja: 'キネティック・アート作家ジャン・ティンゲリーのために設計された美術館。建築自体がライン河畔で芸術と対話する。', en: 'A museum designed for kinetic sculptor Jean Tinguely, where the building itself converses with art on the Rhine riverbank.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Mario Botta', url: 'https://www.britannica.com/biography/Mario-Botta' },
      { title: 'Wikidata: Mario Botta', url: 'https://www.wikidata.org/wiki/Q123079' },
      { title: 'SFMOMA Official Site', url: 'https://www.sfmoma.org/' },
      { title: 'Mario Botta Architetto', url: 'https://www.botta.ch/' },
    ],
  },

  'richard-rogers': {
    slug: 'richard-rogers',
    summary: {
      zh: '理查德·罗杰斯（Richard Rogers, 1933–2021）是"高技派"建筑最具政治热情的灵魂。他与伦佐·皮亚诺合作的蓬皮杜中心（1977年）将一座文化机器从内到外翻转——管道、扶梯、结构框架全部裸露在外，把建筑变成了一场关于透明与民主的城市宣言。但罗杰斯远不止"把管线放外面"的建筑师：他将高技派的精密工程与强烈的社会关怀结合在一起，从伦敦劳埃德大厦到千年穹顶，从马德里机场到威尔士议会大厦——每座建筑都在追问同一个问题：技术如何为公共生活服务？',
      ja: 'リチャード・ロジャース（Richard Rogers, 1933–2021）は「ハイテク建築」の最も政治的情熱をもつ魂である。レンゾ・ピアノと協働したポンピドゥー・センター（1977年）は、文化の機械を内側から外側へひっくり返し——配管、エスカレーター、構造フレームのすべてが露出され——建築を透明性と民主主義についての都市宣言へと変えた。しかしロジャースは「配管を外に出す」建築家にとどまらない。彼はハイテクの精密工学を強い社会的関心と結びつけ、ロンドンのロイズ本社からミレニアム・ドーム、マドリード空港からウェールズ議会まで——どの建物も同じ問いを追求する——技術はいかに公共生活に奉仕できるか？',
      en: 'Richard Rogers (1933–2021) was the most politically passionate soul of High-Tech architecture. The Centre Pompidou (1977), his collaboration with Renzo Piano, turned a cultural machine inside out — pipes, escalators, structural frames all exposed — transforming architecture into an urban manifesto about transparency and democracy. But Rogers is far more than the "put the pipes outside" architect: he combined High-Tech precision engineering with strong social concern, from Lloyd\'s of London to the Millennium Dome, from Madrid Airport to the Welsh Assembly — every building asks the same question: how can technology serve public life?',
    },
    core_ideas: {
      zh: [
        '内外翻转——将建筑的服务空间（楼梯、电梯、管道）从内部核心移到外部，释放内部空间的灵活性和开放性。这不是风格的把戏，而是一种空间民主化的策略',
        '建筑作为城市催化剂——一座好建筑不应只是自身完整，还应激发周边城市空间的活力。广场、通道、公共景观与建筑本身同等重要',
        '可持续性与技术的结合——罗杰斯晚年将气候响应设计注入高技派语言：自然通风、遮阳、光伏——高科技不是为了炫技，而是为了地球',
        '紧凑城市（Compact City）——反对郊区扩张，主张高密度的、公共交通导向的城市生活。这是他作为建筑师的政治立场',
      ],
      ja: [
        '内と外の反転——建物のサービス空間（階段、エレベーター、配管）を内部コアから外部へ移動させ、内部空間の柔軟性と開放性を解放する。これはスタイルのトリックではなく、空間の民主化の戦略である',
        '都市の触媒としての建築——良い建築はそれ自体が完結するだけでなく、周辺の都市空間の活力をも触発すべきである。広場、通路、公共景観は建築本体と同等に重要である',
        '持続可能性と技術の結合——ロジャースは晩年に気候応答デザインをハイテク言語に注入した——自然換気、日射遮蔽、太陽光発電——ハイテクは見せびらかしのためではなく地球のためである',
        'コンパクト・シティ——郊外拡散に反対し、高密度で公共交通指向の都市生活を主張する。これは建築家としての彼の政治的立場である',
      ],
      en: [
        'Inside-out — moving a building\'s service spaces (stairs, elevators, pipes) from the internal core to the exterior, freeing interior space for flexibility and openness. This is not a stylistic trick but a strategy of spatial democratization',
        'Architecture as urban catalyst — a good building should not only be complete in itself but should also catalyze the vitality of surrounding urban space. Plazas, passages, public landscape are as important as the building body',
        'Sustainability married to technology — in his later years Rogers infused climate-responsive design into the High-Tech language: natural ventilation, solar shading, photovoltaics — high-tech not for spectacle but for the planet',
        'The Compact City — opposing suburban sprawl, advocating high-density, transit-oriented urban life. This is his political stance as an architect',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Richard_Rogers_2016.jpg',
      author: 'Unknown',
      license: 'CC BY-SA',
      source_url: 'https://commons.wikimedia.org/wiki/File:Richard_Rogers_2016.jpg',
      alt: { zh: '理查德·罗杰斯肖像，2016年', ja: 'リチャード・ロジャースの肖像、2016年', en: 'Portrait of Richard Rogers, 2016' },
    },
    sections: [
      {
        title: { zh: '蓬皮杜中心：一座城市的宣言', ja: 'ポンピドゥー・センター：都市の宣言', en: 'Centre Pompidou: An urban manifesto' },
        paragraphs: {
          zh: [
            '1971年，38岁的罗杰斯（与伦佐·皮亚诺合作）在681个国际竞赛方案中胜出，设计巴黎的蓬皮杜中心。他们提出的方案震惊了所有人：一座巨大的文化机器，所有通常被藏在建筑内部的"内脏"——彩色管道（蓝色=空调、绿色=水、黄色=电、红色=交通）、自动扶梯、钢桁架——全部裸露在外。建筑没有传统意义上的立面——它的立面就是它的横截面。',
            '蓬皮杜中心的激进不仅在于美学。它将占地一半的广场留给城市——在一个长期以来广场意味着权威和纪念碑的欧洲首都，一个完全向公众开放的倾斜广场是一个政治宣言。建筑本身是一个灵活的"loft"空间，没有任何内墙是固定的，每个楼层的布局可以根据展览需求重组。这是一座关于"不确定性"的建筑：它不预设使用方式，而是提供可能性。',
            '1977年开幕时，蓬皮杜中心遭到了猛烈批评。《费加罗报》称之为"巴黎的怪物"。但四十年后，它每年吸引超过500万访客，成为继卢浮宫和凡尔赛之后法国第三大受欢迎的博物馆。罗杰斯自己后来说："我不认为蓬皮杜是美的——我认为它是有活力的。美是古典的、静态的、完美的。活力是现代的、变化的、不完美的。"这个区分定义了他的整个建筑生涯。',
          ],
          ja: [
            '1971年、38歳のロジャースは（レンゾ・ピアノとの協働で）パリのポンピドゥー・センターの設計競技に681案のなかから勝利した。彼らが提案した案はすべての人を驚愕させた——巨大な文化の機械であり、通常は建物の内部に隠されるすべての「内臓」——色分けされた配管（青=空調、緑=水、黄=電気、赤=動線）、エスカレーター、鋼鉄トラス——がすべて露出されている。建物には伝統的な意味での立面がない——その立面はその断面である。',
            'ポンピドゥー・センターの急進性は美学だけにあるのではない。敷地の半分を広場として都市に開放した——長らく権威と記念碑を意味してきたヨーロッパの首都において、完全に公衆に開かれた傾斜広場は政治的宣言である。建物自体は柔軟な「ロフト」空間であり、内壁はひとつも固定されておらず、各階のレイアウトは展示の必要に応じて組み換え可能である。これは「不確定性」についての建築である——使用法をあらかじめ定めず、可能性を提供する。',
            '1977年の開館時、ポンピドゥー・センターは猛烈な批判を浴びた。『フィガロ』紙は「パリの怪物」と呼んだ。しかし四十年後、年間500万人以上の来館者を集め、ルーヴルとヴェルサイユに次ぐフランスで三番目に人気のある美術館となった。ロジャース自身は後に言った——「私はポンピドゥーが美しいとは思わない——活力があるとは思う。美は古典的、静的、完璧である。活力は現代的、変化的、不完全である。」この区別は彼の全建築人生を定義する。',
          ],
          en: [
            'In 1971, the 38-year-old Rogers (in collaboration with Renzo Piano) won the competition to design the Centre Pompidou in Paris, beating 681 entries. Their proposal shocked everyone: a vast cultural machine with all the "guts" normally hidden inside a building — color-coded pipes (blue = air, green = water, yellow = electricity, red = circulation), escalators, steel trusses — all exposed. The building has no facade in the traditional sense — its facade is its cross-section.',
            'The Centre Pompidou\'s radicalism goes beyond aesthetics. It gave half the site to the city as a public square — in a European capital where squares had long meant authority and monuments, a sloping piazza completely open to the public was a political statement. The building itself is a flexible "loft" space; no interior wall is fixed, and each floor\'s layout can be reconfigured for exhibition needs. It is architecture about "indeterminacy": it does not pre-determine use but offers possibility.',
            'At its opening in 1977, the Centre Pompidou drew fierce criticism. Le Figaro called it "the monster of Paris." But forty years later, it attracts over five million visitors annually, making it France\'s third most popular museum after the Louvre and Versailles. Rogers himself later said: "I don\'t think Pompidou is beautiful — I think it is energetic. Beauty is classical, static, perfect. Energy is modern, changing, imperfect." This distinction defines his entire architectural career.',
          ],
        },
      },
      {
        title: { zh: '劳埃德大厦与城市摩天楼', ja: 'ロイズ本社と都市の超高層', en: 'Lloyd\'s and the urban tower' },
        paragraphs: {
          zh: [
            '如果说蓬皮杜是水平的宣言，那么伦敦劳埃德大厦（Lloyd\'s Building, 1986年）就是垂直的。十二座不锈钢服务塔像外骨骼一样包围着中央的玻璃中庭——楼梯、电梯、厕所和管道全在塔内，将内部办公空间解放为完全开放、无柱的"交易大厅"。劳埃德大厦将"内外翻转"的逻辑推向了极致：一座12层高的建筑，其立面完全由服务设施定义。它既是对伦敦金融城保守主义的挑战，也是对机械时代的浪漫致敬。',
            '劳埃德大厦在城市历史文脉中的位置颇为微妙。它毗邻19世纪的莱顿霍尔市场（Leadenhall Market）和17世纪的圣玛丽斧教堂（St. Mary Axe）——传统的石造街景与现代不锈钢管道的对撞堪称激烈。罗杰斯并不试图让新建筑"适应"旧环境。相反，他相信最好的尊重不是模仿，而是诚实——一座1980年代的金融服务建筑就应该是1980年代的样子。这种态度在1980年代的伦敦引发了巨大的争议，但三十年后，劳埃德大厦被列为英国一级保护建筑（Grade I listed）——成为世界上最年轻的受保护建筑之一。',
            '3 World Trade Center（2018年，纽约）展示了一个更成熟、更克制的罗杰斯。这座80层的摩天楼放弃了劳埃德式的激进外骨骼，但保留了高技派的核心价值：结构的诚实表达。X形的外部支撑框架取代了传统的核心筒结构，为内部办公空间提供了前所未有的灵活性。建筑没有多余的"装饰"——结构本身就是装饰。这是罗杰斯一生的信念：最好的建筑学不是给结构穿衣服，而是让结构成为建筑学。',
          ],
          ja: [
            'ポンピドゥーが水平的宣言であるなら、ロンドンのロイズ本社ビル（Lloyd\'s Building, 1986年）は垂直的宣言である。12本のステンレス鋼のサービス塔が外骨格のように中央のガラス・アトリウムを取り囲み——階段、エレベーター、トイレ、配管がすべて塔のなかに収まり——内部のオフィス空間を完全にオープンで柱のない「トレーディング・フロア」へと解放した。ロイズは「内と外の反転」論理を極限まで推し進めた——12階建ての建物の立面が完全にサービス施設によって定義されている。これはロンドンのシティの保守主義への挑戦であると同時に、機械時代へのロマンチックなオマージュでもある。',
            'ロイズ本社の都市的歴史文脈における位置は微妙である。19世紀のレドンホール・マーケット（Leadenhall Market）と17世紀のセント・メアリー・アクス教会に隣接し——伝統的な石造の街並みと現代のステンレス管の衝突は激しい。ロジャースは新しい建築を古い環境に「適応」させようとはしない。むしろ彼は、最高の敬意は模倣ではなく誠実さだと信じる——1980年代の金融サービスの建物は、まさに1980年代の姿であるべきだ。この態度は1980年代のロンドンで巨大な論争を引き起こしたが、三十年後、ロイズ本社は英国の第一級指定建築物（Grade I listed）に登録された——世界で最も若い保護建築のひとつとして。',
            '3 ワールド・トレード・センター（2018年、ニューヨーク）は、より成熟し、より抑制されたロジャースを示す。この80階建ての超高層はロイズ的な急進的外骨格を放棄しているが、ハイテク派の核心的価値——構造の誠実な表現——を保っている。X字形の外部支持フレームが従来のコア壁構造に代わり、内部オフィス空間に前例のない柔軟性を提供する。建物には余分な「装飾」がない——構造それ自体が装飾である。これはロジャースの生涯の信念——最良の建築学は構造に服を着せることではなく、構造を建築学にすることである。',
          ],
          en: [
            'If the Pompidou is a horizontal manifesto, Lloyd\'s of London (1986) is a vertical one. Twelve stainless-steel service towers surround the central glass atrium like an exoskeleton — stairs, elevators, toilets, and ductwork all contained within the towers — liberating the interior office space as a completely open, column-free "trading floor." Lloyd\'s pushes the inside-out logic to its extreme: a twelve-story building whose facade is entirely defined by services. It is at once a challenge to the conservatism of the City of London and a romantic tribute to the machine age.',
            'Lloyd\'s sits in an ambiguous position within its urban historical context. It neighbors the 19th-century Leadenhall Market and the 17th-century St. Mary Axe church — the collision between traditional stone streetscape and modern stainless-steel pipework is intense. Rogers did not try to make the new building "fit" the old surroundings. Instead, he believed the best respect is not imitation but honesty — a 1980s financial-services building should look like the 1980s. This attitude sparked enormous controversy in 1980s London, but thirty years later, Lloyd\'s was listed as Grade I — becoming one of the world\'s youngest protected buildings.',
            '3 World Trade Center (2018, New York) shows a more mature, restrained Rogers. This 80-story tower relinquishes Lloyd\'s- style radical exoskeleton but retains the High-Tech core value: honest expression of structure. An X-shaped external bracing frame replaces the traditional core-wall structure, providing unprecedented flexibility for interior office space. The building has no extraneous "decoration" — structure itself is the decoration. This is Rogers\' lifelong conviction: the best architecture is not about dressing the structure but about making structure into architecture.',
          ],
        },
      },
      {
        title: { zh: '公共空间与政治：作为公民的建筑师', ja: '公共空間と政治：市民としての建築家', en: 'Public space and politics: The architect as citizen' },
        paragraphs: {
          zh: [
            '罗杰斯是建筑界少有的公共知识分子和政治参与者。1990年代，他被英国政府任命为"城市工作组"（Urban Task Force）主席，撰写了影响深远的《迈向城市复兴》报告。这份报告系统地批判了英国的郊区扩张和汽车依赖，呼吁回归紧凑的、步行友好的、混合功能的城市模式。罗杰斯将这种城市理念注入自己的建筑作品中：他设计的建筑几乎总是附带慷慨的公共空间——广场、通道、露台——因为对他来说，一座没有公共空间的建筑是不完整的。',
            '威尔士议会大厦（Senedd, 2006年，加的夫）是罗杰斯将技术、透明性和民主结合得最完美的作品。建筑位于加的夫湾的滨水地带，一个巨大的波浪形木结构屋顶悬浮在玻璃墙体之上，从外部可以透过玻璃看到议会大厅内正在进行的辩论。这是一个关于民主透明性的空间宣言：公民可以实际"看到"他们的代表在工作。内部的公共空间——一个开放的环形大厅，公众可以在任何时间进入——将建筑的政治功能转化为建筑的空间形式。',
            '千年穹顶（Millennium Dome, 2000年，伦敦格林威治）是罗杰斯最大胆的跨度实验。直径365米的圆顶（每天一米）由12根黄色斜拉桅杆支撑，覆盖着PTFE涂层玻璃纤维膜，是世界上最大的张力结构之一。千年穹顶的内容（一个千禧年主题展览）在开幕后饱受批评，但建筑本身——将空前规模的空间笼罩在一张织物天幕下的姿态——仍然令人敬畏。2007年它被改造为O2体育馆，成为伦敦最成功的娱乐场所之一。它证明了罗杰斯的一个核心信念：好的建筑比它最初被赋予的功能更持久。',
          ],
          ja: [
            'ロジャースは建築界では稀有な公的知識人であり政治的参加者である。1990年代、彼は英国政府によって「アーバン・タスクフォース」の議長に任命され、影響力の大きい報告書『都市再生に向けて』を執筆した。この報告書は英国の郊外拡散と自動車依存を体系的に批判し、コンパクトで歩行者に優しく複合機能をもつ都市モデルへの回帰を訴えた。ロジャースはこの都市理念を自らの建築作品に注入した——彼の設計する建物はほぼ常に惜しみない公共空間——広場、通路、テラス——を伴う。彼にとって、公共空間のない建築は不完全だからである。',
            'ウェールズ議会ビル（Senedd, 2006年、カーディフ）はロジャースが技術、透明性、民主主義を最も完璧に結合した作品である。建物はカーディフ湾のウォーターフロントに位置し、巨大な波形の木造屋根がガラスの壁体の上に浮かび、外部からガラス越しに議会ホール内で進行中の討論を見ることができる。これは民主的透明性についての空間宣言である——市民は自分たちの代表が働いているのを実際に「見る」ことができる。内部の公共空間——市民がいつでも入れるオープンな円形ホール——が建築の政治機能を建築の空間形式へと変換している。',
            'ミレニアム・ドーム（Millennium Dome, 2000年、ロンドン・グリニッジ）はロジャースの最も大胆なスパンの実験である。直径365メートルのドーム（一日一メートル）は12本の黄色い斜張マストに支えられ、PTFEコーティングされたガラス繊維膜で覆われた、世界最大級の張力構造のひとつである。ミレニアム・ドームの内容（ミレニアムをテーマにした展示）は開幕後に激しい批判を浴びたが、建築それ自体——前例のない規模の空間を一枚の布天幕の下に包み込むその身振り——はいまなお畏敬の念を引き起こす。2007年にはO2アリーナに改装され、ロンドンで最も成功した娯楽施設のひとつとなった。それはロジャースの核心的信念を証明する——良い建築はそれが最初に与えられた機能よりも長く生き続ける。',
          ],
          en: [
            'Rogers was a rare public intellectual and political participant within the architectural world. In the 1990s, he was appointed by the UK government to chair the Urban Task Force, producing the influential report "Towards an Urban Renaissance." The report systematically critiqued Britain\'s suburban sprawl and car dependency, calling for a return to compact, walkable, mixed-use urban patterns. Rogers infused this urban philosophy into his own buildings — his designs almost always come with generous public space: plazas, passages, terraces — because for him, a building without public space is incomplete.',
            'The Welsh Assembly (Senedd, 2006, Cardiff) is Rogers\' most perfect union of technology, transparency, and democracy. The building sits on the Cardiff Bay waterfront; a vast undulating timber roof floats above glass walls, through which the ongoing debates inside the chamber can be seen from outside. This is a spatial manifesto about democratic transparency: citizens can literally "see" their representatives at work. The interior public space — an open circular hall accessible to the public at all times — translates the building\'s political function into spatial form.',
            'The Millennium Dome (2000, Greenwich, London) is Rogers\' boldest experiment with span. The dome, 365 meters in diameter (one meter for each day of the year), is supported by twelve yellow cable-stayed masts and covered in PTFE-coated fiberglass membrane — one of the world\'s largest tensile structures. The Dome\'s content (a millennium-themed exhibition) drew heavy criticism after opening, but the building itself — the gesture of enclosing an unprecedented scale of space under a single fabric canopy — remains awe-inspiring. In 2007 it was converted into The O2 Arena, becoming one of London\'s most successful entertainment venues. It proved one of Rogers\' core convictions: good architecture outlasts the function it was first given.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'lloyds-building', note: { zh: '十二座不锈钢服务塔如外骨骼包裹中庭，"内外翻转"逻辑的垂直宣言。', ja: '12本のステンレス鋼のサービス塔が外骨格のようにアトリウムを包む——「内と外の反転」論理の垂直的宣言。', en: 'Twelve stainless-steel service towers wrap the atrium like an exoskeleton — the vertical manifesto of the inside-out logic.' } },
      { slug: 'millennium-dome', note: { zh: '直径365米的张力膜穹顶，将空前规模的空间笼罩在织物天幕下。', ja: '直径365メートルの張力膜ドーム。前例のない規模の空間を一枚の布天幕の下に包み込む。', en: 'A 365-meter-diameter tensile membrane dome, enclosing an unprecedented scale of space beneath a single fabric canopy.' } },
      { slug: '3-world-trade-center', note: { zh: 'X形钢结构外框架释放了内部空间，结构本身即是最诚实的装饰。', ja: 'X字形の鋼構造外フレームが内部空間を解放する。構造それ自体が最も誠実な装飾である。', en: 'An X-shaped steel external frame liberates interior space — the structure itself is the most honest decoration.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Richard Rogers', url: 'https://www.britannica.com/biography/Richard-Rogers' },
      { title: 'The Pritzker Architecture Prize: Richard Rogers', url: 'https://www.pritzkerprize.com/laureates/2007' },
      { title: 'Wikidata: Richard Rogers', url: 'https://www.wikidata.org/wiki/Q237412' },
      { title: 'Rogers Stirk Harbour + Partners', url: 'https://www.rsh-p.com/' },
    ],
  },

  'erich-mendelsohn': {
    slug: 'erich-mendelsohn',
    summary: {
      zh: '埃里希·门德尔松（Erich Mendelsohn, 1887–1953）是德国表现主义建筑最伟大的人。在第一次世界大战的战壕中，他画下了数百张小型建筑草图——不是用尺子和圆规，而是用手腕的流动线条——这些战后被转化为一系列流线型的商业建筑，其中最著名的是波茨坦的爱因斯坦塔（1920年）。他的建筑拒绝直线和直角，拥抱速度、流动和曲线的美学。纳粹上台后他被迫流亡——先到英国，后到巴勒斯坦，最后到美国——他的风格也随之从表现主义转向更功能性的现代主义，但从未失去对形态的敏感。',
      ja: 'エーリヒ・メンデルゾーン（Erich Mendelsohn, 1887–1953）はドイツ表現主義建築の最も偉大な人である。第一次世界大戦の塹壕のなかで、彼は数百枚の小さな建築スケッチを描いた——定規やコンパスではなく手首の流れるような線で——これらは戦後、一連の流線型商業建築へと結実し、その最も有名なものがポツダムのアインシュタイン塔（1920年）である。彼の建築は直線と直角を拒絶し、速度、流動、曲線の美学を抱擁する。ナチスが権力を握ると彼は亡命を余儀なくされ——最初に英国、次にパレスチナ、最後にアメリカへ——彼のスタイルも表現主義からより機能的なモダニズムへと移行したが、形態への感受性を失うことはなかった。',
      en: 'Erich Mendelsohn (1887–1953) was the greatest figure of German Expressionist architecture. In the trenches of World War I, he drew hundreds of small architectural sketches — not with rulers and compasses but with the flowing line of the wrist — which were later realized into a series of streamlined commercial buildings, the most famous being the Einstein Tower in Potsdam (1920). His architecture rejected straight lines and right angles, embracing an aesthetic of speed, flow, and curve. When the Nazis rose to power he was forced into exile — first to Britain, then Palestine, finally the United States — and his style evolved from Expressionism toward a more functional modernism, but never lost its sensitivity to form.',
    },
    core_ideas: {
      zh: [
        '动态的建筑——建筑不应是静止的，而应捕捉现代城市的速度、能量和流动性。曲线不是装饰，而是运动的轨迹',
        '从草图到建筑——建筑的形式应该诞生于直觉性的、手势性的素描，而非机械地推导。表现主义的自由线条是门德尔松的签名',
        '水平性与带状窗——连续的带状玻璃窗和水平线条定义了现代街道和商业建筑的"新立面"。这是对柯布西耶"横向长窗"的平行发现',
        '在流亡中变形——不同地域要求不同的建筑形式。门德尔松在巴勒斯坦的耶路撒冷石头建筑与他在柏林的钢铁玻璃商店是完全不同的语言，但共享同一种对流线的敏感',
      ],
      ja: [
        '動的な建築——建築は静的なものであってはならず、現代都市の速度、エネルギー、流動性を捉えるべきである。曲線は装飾ではなく、運動の軌跡である',
        'スケッチから建築へ——建築の形式は機械的に導出されるのではなく、直感的でジェスチャー的な素描から誕生すべきである。表現主義の自由な線はメンデルゾーンの署名である',
        '水平性とバンド窓——連続する帯状のガラス窓と水平線が、現代の街路と商業建築の「新しい立面」を定義する。これはコルビュジエの「水平連続窓」と並行する発見である',
        '亡命のなかでの変形——異なる地域は異なる建築形式を要求する。メンデルゾーンのエルサレムの石造建築とベルリンの鉄とガラスの商店はまったく異なる言語だが、流線への感受性という同一のDNAを共有している',
      ],
      en: [
        'Dynamic architecture — buildings should not be static but should capture the speed, energy, and fluidity of the modern city. Curves are not decoration but the trace of motion',
        'From sketch to building — architectural form should be born from intuitive, gestural drawing rather than mechanical derivation. The free line of Expressionism is Mendelsohn\'s signature',
        'Horizontality and the ribbon window — continuous bands of glass and horizontal lines define the "new facade" of modern streets and commercial buildings. This is a parallel discovery to Le Corbusier\'s horizontal strip window',
        'Transformation in exile — different geographies demand different architectural forms. Mendelsohn\'s Jerusalem stone buildings and his Berlin steel-and-glass stores are entirely different languages, yet share the same DNA of sensitivity to the flowing line',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Erich_Mendelsohn.jpg',
      author: 'Unknown',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Erich_Mendelsohn.jpg',
      alt: { zh: '埃里希·门德尔松肖像', ja: 'エーリヒ・メンデルゾーンの肖像', en: 'Portrait of Erich Mendelsohn' },
    },
    sections: [
      {
        title: { zh: '爱因斯坦塔：表现主义的纪念碑', ja: 'アインシュタイン塔：表現主義の記念碑', en: 'Einstein Tower: The monument of Expressionism' },
        paragraphs: {
          zh: [
            '爱因斯坦塔（Einstein Tower, 1920–1921年，波茨坦）是门德尔松的第一座建成建筑，也是德国表现主义建筑的不朽标志。这座为天体物理学家欧文·弗洛因德利希设计的天文台，最初计划用钢筋混凝土建造——一种可以浇铸成任何曲线的材料——但战后材料短缺迫使门德尔松将大部分结构改用砖砌，外部覆盖水泥灰泥以模仿混凝土的可塑性外观。结果却出人意料地成功：这是一座完全拒绝直线的建筑，每一个曲面、每一个窗洞、每一个檐口都像被风吹起的沙丘或被水流冲刷的岩石。',
            '爱因斯坦塔的功能——容纳一架垂直太阳望远镜——与形式之间没有传统意义上的"匹配"。望远镜需要从塔顶贯穿到地下实验室的一个垂直井道，而塔的形态不是从这一功能"推导"出来的，而是从对爱因斯坦相对论的某种直觉中"涌现"的。门德尔松想要一座"动态的建筑"——不是表现运动，而是本身就是运动被冻结的瞬间。爱因斯坦本人参观了这座塔，据说只评价了一个词："organisch"（有机的）。不管这是赞许还是困惑，它恰当地描述了这座建筑的品质：它像一个生物体，而不是一件人工制品。',
          ],
          ja: [
            'アインシュタイン塔（Einstein Tower, 1920–1921年、ポツダム）はメンデルゾーンの最初の実現した建築であり、ドイツ表現主義建築の不朽のアイコンである。天体物理学者エルヴィン・フロイントリッヒのために設計されたこの天文台は、当初は鉄筋コンクリート——あらゆる曲線に鋳造できる素材——で建設される予定だったが、戦後の資材不足によりメンデルゾーンは構造の大部分をレンガ造りに変更し、その外側をセメントモルタルで覆ってコンクリートの可塑的外観を模倣せざるを得なかった。結果は予想外に成功した——直線を完全に拒絶した建築であり、あらゆる曲面、あらゆる窓穴、あらゆる庇が、風に吹かれた砂丘か水流に洗われた岩のように見える。',
            'アインシュタイン塔の機能——垂直太陽望遠鏡を収容すること——と形式のあいだに、伝統的な意味での「一致」はない。望遠鏡は塔の頂上から地下実験室まで貫く垂直シャフトを必要とし、塔の形態はこの機能から「導出」されたのではなく、アインシュタインの相対性理論へのある種の直観から「出現」した。メンデルゾーンは「動的な建築」を望んだ——運動を表現するのではなく、それ自体が凍結された運動の瞬間であるような。アインシュタイン本人がこの塔を訪れ、ただ一言「organisch（有機的）」と評したと伝えられる。それが賛辞であれ困惑であれ、この言葉はこの建築の質を適切に言い当てている——生物のようであり、人工物のようではない。',
          ],
          en: [
            'The Einstein Tower (1920–1921, Potsdam) is Mendelsohn\'s first built work and the enduring icon of German Expressionist architecture. Designed as an observatory for the astrophysicist Erwin Freundlich, it was originally planned in reinforced concrete — a material that can be cast into any curve — but postwar material shortages forced Mendelsohn to build most of the structure in brick, clad in cement stucco to mimic concrete\'s plastic appearance. The result was unexpectedly successful: a building that completely refuses the straight line, every curve, every window opening, every cornice seeming like a sand dune shaped by wind or rock scoured by water.',
            'The Einstein Tower\'s function — housing a vertical solar telescope — has no traditional "fit" with its form. The telescope required a vertical shaft running from the tower crown down to an underground laboratory, but the tower\'s morphology was not "deduced" from this function; it "emerged" from an intuition about Einstein\'s theory of relativity. Mendelsohn wanted a "dynamic architecture" — not one that represents motion but one that is itself a frozen moment of motion. Einstein himself visited the tower and reportedly uttered a single word: "organisch" (organic). Whether this was praise or bemusement, it aptly describes this building\'s quality: it seems like an organism, not an artifact.',
          ],
        },
      },
      {
        title: { zh: '曲线与商业：表现主义改造现代都市', ja: '曲線と商業：表現主義が現代都市を改造する', en: 'Curves and commerce: Expressionism remakes the modern city' },
        paragraphs: {
          zh: [
            '门德尔松的天才不仅适用于纪念碑式的独立项目，也能在密集的城市语境中创造奇迹。1920年代末的柏林，他设计了一系列革命性的百货商店和商业建筑，其中以肖肯百货（Schocken Department Store, 1926–1930年，在斯图加特、开姆尼茨和纽伦堡各有分店）最为经典。这些大型零售建筑的外立面被连续的、动态弯曲的玻璃带状窗切割——白天反射街道和天空，夜晚变成发光的城市屏幕。商店不再是封闭的货物仓库，而是一个透明的、诱人的公共场所。',
            '肖肯百货在开姆尼茨的分店（1930年）将水平带状窗的美学推向了极限。整个建筑看起来像一艘搁浅的远洋客轮——长达百米的水平线条从街道的一端延伸到另一端，转角处以一个巨大的弧形玻璃塔收尾。这是对"功能主义"立面的反对：现代商业不需要假装中性或客观——它可以是有力的、自信的、甚至炫耀的。门德尔松证明了表现主义不是一种与城市无关的"雕塑风格"，而是可以直接参与现代都市景观的建造。',
            '但1933年纳粹上台后，这一切戛然而止。门德尔松是犹太人，他的建筑被第三帝国宣布为"堕落"。他在德国的最后一夜躲在朋友家——从窗口可以看到他设计的哥伦布大厦（Columbushaus, 1932年，波茨坦广场），一座已经在他眼皮底下被包豪斯取代的项目。第二天他离开了德国，再也没有回来。流亡中的门德尔松在巴勒斯坦设计了大量耶路撒冷石造建筑（包括希伯来大学和哈达萨医院），后来在美国西海岸以犹太教堂设计结束了他的生涯——从表现主义到地域现代主义，他的曲线始终在流动。',
          ],
          ja: [
            'メンデルゾーンの天才は記念碑的な単体プロジェクトだけでなく、密集した都市文脈のなかでも奇跡を起こすことができた。1920年代末のベルリンで、彼は一連の革命的な百貨店と商業建築を設計し、そのなかでもショッケン百貨店（Schocken Department Store, 1926–1930年、シュトゥットガルト、ケムニッツ、ニュルンベルクに各店舗）が最も古典的である。これらの大型小売建築の外壁は、連続し動的に曲がるガラスのバンド窓で切り裂かれ——昼間は街路と空を反射し、夜は発光する都市のスクリーンに変わる。商店はもはや閉じた貨物倉庫ではなく、透明で魅力的な公共の場である。',
            'ショッケン百貨店ケムニッツ店（1930年）は水平バンド窓の美学を極限まで推し進めた。建物全体が座礁した遠洋客船のように見える——長さ100メートルの水平線が街路の一端から他端まで延び、コーナーは巨大な弧を描くガラスタワーで締め括られる。これは「機能主義」立面への反論である——現代商業は中立的あるいは客観的を装う必要はない——力強く、自信に満ち、誇示的でさえあり得る。メンデルゾーンは表現主義が都市とは無関係な「彫刻スタイル」ではなく、直接的に現代都市景観の建設に参与できることを証明した。',
            'しかし1933年にナチスが政権を握ると、すべては突然終わった。メンデルゾーンはユダヤ人であり、彼の建築は第三帝国によって「退廃的」と宣告された。ドイツでの最後の夜を彼は友人の家で過ごした——窓からは彼が設計したコロンブスハウス（Columbushaus, 1932年、ポツダム広場）が見えた。それはすでに彼の目の前でバウハウスに取って代わられていたプロジェクトだ。翌日彼はドイツを去り、二度と戻らなかった。亡命中のメンデルゾーンはパレスチナで多数のエルサレム石造建築（ヘブライ大学とハダサ病院を含む）を設計し、後にアメリカ西海岸でシナゴーグの設計をもってキャリアを閉じた——表現主義から地域モダニズムへ、彼の曲線はつねに流動し続けた。',
          ],
          en: [
            'Mendelsohn\'s genius applied not only to monumental standalone projects but also worked miracles in dense urban contexts. In late-1920s Berlin, he designed a series of revolutionary department stores and commercial buildings, the most classic being the Schocken department stores (1926–1930, with branches in Stuttgart, Chemnitz, and Nuremberg). The facades of these large retail buildings were sliced open by continuous, dynamically curving glass bands — by day reflecting street and sky, by night turning into luminous urban screens. The store was no longer a closed warehouse of goods but a transparent, inviting public place.',
            'The Schocken Chemnitz branch (1930) pushed the aesthetic of the horizontal ribbon window to its extreme. The entire building looks like a beached ocean liner — a nearly hundred-meter-long horizontal line extends from one end of the street to the other, terminating at the corner in a vast curved glass tower. This was a rebuttal to the "functionalist" facade: modern commerce need not pretend to neutrality or objectivity — it can be forceful, confident, even showy. Mendelsohn proved that Expressionism is not a "sculptural style" irrelevant to the city but can directly participate in constructing the modern urban landscape.',
            'But when the Nazis came to power in 1933, everything stopped abruptly. Mendelsohn was Jewish; his architecture was declared "degenerate" by the Third Reich. He spent his last night in Germany at a friend\'s house — from the window he could see the Columbushaus (1932, Potsdamer Platz) he had designed, a project already supplanted by Bauhaus before his eyes. The next day he left Germany, never to return. In exile, Mendelsohn designed numerous Jerusalem stone buildings in Palestine (including the Hebrew University and Hadassah Hospital), and later ended his career on the American West Coast designing synagogues — from Expressionism to regional modernism, his curves never ceased to flow.',
          ],
        },
      },
      {
        title: { zh: '流亡生涯：三条道路', ja: '亡命のキャリア：三つの道', en: 'Career in exile: Three paths' },
        paragraphs: {
          zh: [
            '门德尔松的流亡是分阶段的，每一阶段都深刻改变了他的建筑语言。在英国（1933–1939年），他与谢尔盖·谢尔马耶夫（Serge Chermayeff）合作设计了滨海贝克斯希尔的德拉沃尔展亭（De La Warr Pavilion, 1935年）——这是英国现代主义建筑的里程碑。一座纯白的、带有巨大弧形玻璃楼梯塔的海滨文化中心，将欧洲大陆的现代主义语言转换为适应英国海岸气候和阶级文化的温和形式。德拉沃尔展亭中流畅的水平线和透明的幕墙体现了门德尔松对"民主空间"的持续关注——一个工人阶级度假小镇的文化设施应该像一座宫殿。',
            '在巴勒斯坦（1939–1941年），门德尔松面对着截然不同的条件：耶路撒冷传统的石材建造法规要求所有建筑必须使用当地的耶路撒冷石。他接受了这一约束，并在其中找到了新的表达可能。哈达萨大学医院（1938年，斯科普斯山）是他这一时期最重要的作品：延续的水平线条和圆角阳台仍然可辨认出门德尔松的签名，但材料从玻璃和钢完全转变为金色的耶路撒冷石。这座建筑的流亡感是双重的——既离开了他所习惯的欧洲城市，也离开了他的建筑赖以成名的材料。门德尔松的适应能力令人叹服：他在世界三个不同角落留下了三种风格各异的现代主义。',
            '在美国（1941–1953年），门德尔松的主要委托来自犹太社区——一系列分布在克利夫兰、圣路易斯和圣保罗的犹太教堂。这些作品被建筑史学家长期忽视，但近年来获得了重新发现。门德尔松将美国中西部的地域条件、现代主义的简化几何和犹太宗教的空间传统融合在一起，创造出一种独特的"流亡现代主义"。他在1953年去世，未能看到自己的遗产在战后的重新评估。但今天的建筑史已经确认：门德尔松是20世纪早期对曲线和动态最具掌控力的建筑师，他的作品桥接了表现主义的梦幻与现代城市的需求。',
          ],
          ja: [
            'メンデルゾーンの亡命は段階的であり、各段階が彼の建築言語を深く変えた。英国（1933–1939年）では、サージ・シェルマイエフとの協働でベクスヒル・オン・シーのデ・ラ・ウォール・パビリオン（De La Warr Pavilion, 1935年）を設計した——これは英国モダニズム建築のマイルストーンである。純白で巨大な弧を描くガラスの階段塔をもつ海辺の文化センターが、欧州大陸のモダニズム言語を英国の海岸気候と階級文化に適応した温和な形式へと変換した。デ・ラ・ウォール・パビリオンの流れるような水平線と透明なカーテンウォールは、メンデルゾーンの「民主的空間」への持続的関心を体現している——労働者階級のリゾートタウンの文化施設が、宮殿のようにあるべきだ。',
            'パレスチナ（1939–1941年）では、メンデルゾーンはまったく異なる条件に直面した——エルサレムの伝統的石造建築条例はすべての建物に地元のエルサレム石の使用を義務づけていた。彼はこの制約を受け入れ、そのなかに新たな表現の可能性を見出した。ハダサ大学病院（1938年、スコーパス山）はこの時期の彼の最も重要な作品である——連続する水平線と丸角のバルコニーにはまだメンデルゾーンの署名が認識できるが、素材はガラスと鋼から完全に金色のエルサレム石へと変わった。この建物の亡命感覚は二重である——彼が慣れ親しんだヨーロッパの都市からも、彼の建築を有名にした素材からも離れたのだ。メンデルゾーンの適応能力は驚嘆に値する——世界の三つの異なる隅で、三つのスタイルの異なるモダニズムを残した。',
            'アメリカ（1941–1953年）では、メンデルゾーンの主要な依頼はユダヤ人コミュニティから来た——クリーヴランド、セントルイス、セントポールに点在する一連のシナゴーグである。これらの作品は建築史家によって長く無視されてきたが、近年再発見の機運が高まっている。メンデルゾーンはアメリカ中西部の地域的条件、モダニズムの簡素化された幾何学、ユダヤ教の空間的伝統を融合し、独自の「亡命モダニズム」を創造した。彼は1953年に死去し、自らの遺産が戦後に再評価されるのを見ることはなかった。しかし今日の建築史は確認している——メンデルゾーンは20世紀初頭において曲線と動態を最も支配する建築家であり、彼の作品は表現主義の夢と現代都市の需要を橋渡しした。',
          ],
          en: [
            'Mendelsohn\'s exile was phased, and each phase profoundly altered his architectural language. In Britain (1933–1939), he collaborated with Serge Chermayeff on the De La Warr Pavilion in Bexhill-on-Sea (1935) — a milestone of British modernist architecture. A pure white seaside cultural center with a vast curved glass stair tower, translating Continental European modernist language into a gentler form adapted to the English coastal climate and class culture. The Pavilion\'s fluid horizontals and transparent curtain wall embody Mendelsohn\'s enduring concern with "democratic space" — a cultural facility for a working-class resort town should feel like a palace.',
            'In Palestine (1939–1941), Mendelsohn faced entirely different conditions: Jerusalem\'s traditional stone-building ordinance required all buildings to use local Jerusalem stone. He accepted this constraint and found new expressive possibilities within it. Hadassah University Hospital (1938, Mount Scopus) is his most important work of this period: the continuous horizontals and rounded-corner balconies still bear Mendelsohn\'s recognizable signature, but the material has completely transformed from glass and steel to golden Jerusalem stone. The building\'s sense of exile is double — distanced from both the European city he knew and the material that made his architecture famous. Mendelsohn\'s adaptability is breathtaking: he left three stylistically distinct modernisms in three different corners of the world.',
            'In the United States (1941–1953), Mendelsohn\'s primary commissions came from Jewish communities — a series of synagogues across Cleveland, St. Louis, and St. Paul. These works were long neglected by architectural historians but have been rediscovered in recent years. Mendelsohn fused Midwestern regional conditions, modernist simplified geometry, and Jewish religious spatial traditions to create a unique "exile modernism." He died in 1953, never seeing his legacy reassessed in the postwar era. But architectural history today confirms: Mendelsohn was the early 20th century\'s supreme master of the curve and the dynamic, and his work bridged the dream of Expressionism with the demands of the modern city.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'einstein-tower', note: { zh: '表现主义建筑的至高宣言，一座完全拒绝直线的天体物理天文台。', ja: '表現主義建築の至高の宣言。直線を完全に拒絶した天体物理学天文台。', en: 'Expressionist architecture\'s supreme manifesto — an astrophysical observatory that completely refuses the straight line.' } },
      { slug: 'de-la-warr-pavilion', note: { zh: '英国现代主义的里程碑，纯白弧形玻璃塔的民主海滨文化宫殿。', ja: '英国モダニズムのマイルストーン。純白の弧を描くガラスタワーをもつ民主的海辺の文化宮殿。', en: 'A milestone of British modernism — a democratic seaside cultural palace with a pure-white curved glass tower.' } },
      { slug: 'hadassah-university-hospital-mt-scopus', note: { zh: '流亡中的地域变形——耶路撒冷金色石墙上的水平曲线，他的签名在不同材料中重生。', ja: '亡命のなかの地域的変形——エルサレムの金色の石壁上の水平曲線。彼の署名が異なる素材のなかで再生する。', en: 'Regional transformation in exile — horizontals on golden Jerusalem stone walls, his signature reborn in a different material.' } },
    ],
    sources: [
      { title: 'Encyclopaedia Britannica: Erich Mendelsohn', url: 'https://www.britannica.com/biography/Erich-Mendelsohn' },
      { title: 'Wikidata: Erich Mendelsohn', url: 'https://www.wikidata.org/wiki/Q76730' },
      { title: 'De La Warr Pavilion Official Site', url: 'https://www.dlwp.com/' },
    ],
  },

  'david-chipperfield': {
    slug: 'david-chipperfield',
    summary: {
      zh: '大卫·奇普菲尔德（David Chipperfield, 1953– ）是英国当代最安静的大师。在明星建筑师竞相制造标志性形式的时代，他选择了一条相反的道路：减少、无声、让建筑退让于历史语境和日常体验之后。他在柏林新博物馆（2009年）的修复中确立了全球声誉——不是用"新"压倒"旧"，而是让战争的伤痕与原建筑的尊严共同讲述一个关于时间的故事。2023年普利兹克奖表彰了他"始终如一的、优雅的公共建筑"，但奇普菲尔德的真正独特之处在于：他的建筑总是为它所处的场所创造了尊严，而不是从场所中索取注意力。',
      ja: 'デイヴィッド・チッパーフィールド（David Chipperfield, 1953– ）は英国現代のもっとも静かな巨匠である。スター建築家たちが競ってアイコニックな形式をつくり出す時代に、彼は反対の道を選んだ——減らし、黙し、建築を歴史的文脈と日常の体験の背後に退かせる。彼はベルリン新博物館（2009年）の修復で世界的名声を確立した——「新しい」もので「古い」ものを圧倒するのではなく、戦争の傷跡と元の建築の尊厳が共に時間についての物語を語るように。2023年のプリツカー賞は彼の「一貫して優雅な公共建築」を表彰したが、チッパーフィールドの真の独自性はここにある——彼の建築は常にそれが置かれた場所に尊厳を創造し、場所から注意を奪い取らない。',
      en: 'David Chipperfield (1953– ) is the quietest master of contemporary British architecture. In an era when star architects compete to produce iconic forms, he chose the opposite path: reduction, silence, letting architecture step back behind historical context and everyday experience. He established his global reputation with the restoration of the Neues Museum in Berlin (2009) — not overwhelming the "old" with the "new" but letting war scars and the original building\'s dignity tell a shared story about time. The 2023 Pritzker Prize honored his "consistently elegant public buildings," but Chipperfield\'s true singularity is this: his architecture always creates dignity for the place it occupies, rather than demanding attention from it.',
    },
    core_ideas: {
      zh: [
        '减法而非加法——不是通过增加元素来创造意义，而是通过移除不必要的、简化到本质。奇普菲尔德的建筑常常让人感觉"它本来就应该在这里"',
        '修复作为创作——历史建筑的修复不是考古学还原，而是一种当代的创作行为。新旧之间必须保持诚实的分界，但也要形成有意义的对话',
        '日常性的尊严——好的建筑不需要震撼人心，它应该让日常生活变得更好。博物馆、图书馆、法院——这些公民建筑应该在日常中提供一种安静的崇高感',
        '欧洲传统的当代延续——奇普菲尔德的建筑中回响着古典比例、轴线、柱廊的基因，但这些被翻译成极其简化的现代语言，没有怀旧的装饰',
      ],
      ja: [
        '引き算であって足し算ではない——要素を増やすことで意味を創造するのではなく、不必要なものを取り除き、本質へと簡素化する。チッパーフィールドの建築はしばしば「ここに元々あったはずだ」と感じさせる',
        '創作としての修復——歴史的建築の修復は考古学的復元ではなく、現代の創作行為である。新と旧のあいだに誠実な境界を保つと同時に、意味のある対話を形成しなければならない',
        '日常性の尊厳——良い建築は人を震撼させる必要はない。それは日常生活をより良くすべきである。美術館、図書館、裁判所——これらの市民建築は日常のなかで静かな崇高さを提供すべきである',
        'ヨーロッパ的伝統の現代的延長——チッパーフィールドの建築には古典的比例、軸線、列柱廊の遺伝子が響いているが、これらは極限まで簡素化された近代的言語に翻訳され、懐古的装飾はない',
      ],
      en: [
        'Subtraction not addition — creating meaning not by adding elements but by removing the unnecessary, simplifying to essence. Chipperfield\'s buildings often feel as if "they should have always been here"',
        'Restoration as creation — the restoration of historic buildings is not archaeological reconstruction but a contemporary creative act. There must be an honest boundary between old and new, but also a meaningful dialogue',
        'The dignity of the everyday — good architecture need not overwhelm; it should make everyday life better. Museums, libraries, courthouses — these civic buildings should provide a quiet sublimity within the quotidian',
        'Contemporary continuation of European tradition — Chipperfield\'s buildings echo with the DNA of classical proportion, axis, and colonnade, but these are translated into an extremely simplified modern language, without nostalgic decoration',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/79/David_Chipperfield_2012.jpg',
      author: 'Unknown',
      license: 'CC BY-SA',
      source_url: 'https://commons.wikimedia.org/wiki/File:David_Chipperfield_2012.jpg',
      alt: { zh: '大卫·奇普菲尔德肖像，2012年', ja: 'デイヴィッド・チッパーフィールドの肖像、2012年', en: 'Portrait of David Chipperfield, 2012' },
    },
    sections: [
      {
        title: { zh: '柏林新博物馆：伤口上的建筑', ja: 'ベルリン新博物館：傷の上の建築', en: 'Neues Museum: Architecture on a wound' },
        paragraphs: {
          zh: [
            '柏林新博物馆（Neues Museum, 1843–1855年由弗里德里希·奥古斯特·施蒂勒设计）在二战期间被空袭摧毁了大半。其后半个多世纪里，它作为一座废墟矗立在柏林博物馆岛上——屋顶塌陷，楼梯间完全消失，壁画被水渍和霉菌覆盖。1997年，奇普菲尔德赢得了修复这座建筑的国际竞赛。这不是一个普通的"修复"项目：被炸毁的废墟不是要被抹去的错误，而是要成为新建筑的"共同作者"。',
            '奇普菲尔德的方法论被称为"整合性修复"（integrated repair）。他没有试图将建筑恢复到战前的状态（那将是一种伪造），也没有在废墟上加盖一个全新的结构（那将是傲慢）。他选择了第三条路：保留和稳定所有的历史材料——弹孔的砖墙、烟熏的天花板、褪色的壁画残片——然后在缺失的地方用精确但低调的新材料填补。新的与旧的从不混淆：新柱廊采用回收砖块和浅色水泥，与残留的历史砖墙形成朴素的对话。新楼梯间使用了白净的混凝土和石材——简洁到几乎消失，让弗雷德里希·威廉四世的壁画残片成为主角。',
            '2009年重新开放时，新博物馆引发了一种前所未有的体验：参观者在一个空间内同时看到了三个时代的层叠——19世纪的古典主义、20世纪的战争的暴力、21世纪的克制修补。这不再是"修复"，而是"编纂"——奇普菲尔德像一个编年史家，他允许时间在建筑中留下可读的痕迹。在这个意义上，新博物馆是20世纪以来对"如何在历史中建造"这一问题的最深刻回答之一。',
          ],
          ja: [
            'ベルリン新博物館（Neues Museum, 1843–1855年、フリードリヒ・アウグスト・シュテューラー設計）は第二次世界大戦中の空襲で大半が破壊された。その後半世紀以上にわたって、廃墟としてベルリンのムゼウムスインゼルに立ち続けた——屋根は崩れ、階段室は完全に消失し、壁画は水染みとカビで覆われていた。1997年、チッパーフィールドはこの建物を修復する国際コンペに勝利した。これは通常の「修復」プロジェクトではない——爆撃された廃墟は消し去るべき誤りではなく、新しい建築の「共著者」となるべきものだった。',
            'チッパーフィールドの方法論は「統合的修復」（integrated repair）と呼ばれる。彼は建物を戦前の状態に戻そうとはしなかった（それは偽造であろう）。また廃墟の上にまったく新しい構造を載せようともしなかった（それは傲慢であろう）。彼は第三の道を選んだ——すべての歴史的材料を保存し安定化させる——弾痕のあるレンガ壁、煤けた天井、褪色した壁画の断片——そして欠損のある場所を精确だが控えめな新材料で充填する。新しいものと古いものは決して混ざらない——新しい列柱廊は再生レンガと明るい色のセメントを用い、残存する歴史的なレンガ壁と素朴な対話を交わす。新しい階段室は白く清澄なコンクリートと石材を用い——フリードリヒ・ヴィルヘルム四世の壁画の断片が主役になるよう、簡素さがほとんど消失するまでに。',
            '2009年の再開館時、新博物館は前例のない体験を引き起こした——来館者はひとつの空間のなかで三つの時代の層を同時に見る——19世紀の古典主義、20世紀の戦争の暴力、21世紀の抑制された修繕。これはもはや「修復」ではなく「編纂」である——チッパーフィールドは編年史家のように振る舞い、時間が建築のなかに読み取り可能な痕跡を残すことを許した。この意味で、新博物館は20世紀以来の「歴史のなかでいかに建てるか」という問いへの最も深い回答のひとつである。',
          ],
          en: [
            'The Neues Museum in Berlin (1843–1855, designed by Friedrich August Stüler) was largely destroyed by aerial bombardment during WWII. For over half a century afterward, it stood as a ruin on Berlin\'s Museum Island — roof collapsed, stair hall completely vanished, murals covered in water stains and mold. In 1997, Chipperfield won the international competition to restore the building. This was no ordinary "restoration" project: the bombed-out ruin was not a mistake to erase but a "co-author" of the new architecture.',
            'Chipperfield\'s methodology was termed "integrated repair." He did not attempt to return the building to its pre-war state (that would be a forgery), nor did he cap the ruin with an entirely new structure (that would be arrogance). He chose a third path: preserving and stabilizing all historical material — bullet-pocked brick walls, smoke-stained ceilings, faded mural fragments — and then filling gaps with precise but understated new material. New and old never merge: new colonnades use recycled brick and pale cement, forming a sober dialogue with surviving historical brickwork. The new stair hall uses clean white concrete and stone — simplified nearly to disappearance, so that the surviving mural fragments of Friedrich Wilhelm IV become the protagonists.',
            'When it reopened in 2009, the Neues Museum triggered an unprecedented experience: a visitor sees simultaneously, within a single space, the layering of three eras — 19th-century classicism, the violence of 20th-century war, and the restrained repair of the 21st century. This is no longer "restoration" but "redaction" — Chipperfield behaved like a chronicler, allowing time to leave legible traces in the architecture. In this sense, the Neues Museum is one of the most profound answers to the question of "how to build in history" since the 20th century.',
          ],
        },
      },
      {
        title: { zh: '公民建筑：日常的崇高', ja: '市民建築：日常の崇高', en: 'Civic architecture: The sublime everyday' },
        paragraphs: {
          zh: [
            '如果说新博物馆确立了奇普菲尔德在修复领域的地位，那么他的新建筑作品则展示了另一种天赋：为公民生活创造尊严。巴塞罗那司法城（Ciutat de la Justícia, 2002–2009年）是一个庞大的法院综合体——在一个以高迪和加泰罗尼亚现代主义著称的城市，一座"冷酷"的混凝土法院似乎格格不入。但奇普菲尔德的策略不是与巴塞罗那的色彩和形式竞争，而是提供一种对比：巨大的悬挑体量、重复的方形窗户节奏、没有颜色的混凝土表面——司法需要看起来公正，而公正不需要装饰。',
            '爱荷华州得梅因市中心图书馆（Des Moines Central Library, 2006年）和德国马尔巴赫现代文学博物馆（Museum of Modern Literature, 2006年）代表了奇普菲尔德公民建筑的两个方向。得梅因图书馆是一座覆盖在铜色玻璃幕墙中的长方体，透明而内向，在爱荷华的广阔天空下反射着中西部平原的柔和光线。现代文学博物馆则是一座"无窗"的混凝土圣殿，内部光线完全来自天窗——进入其中的体验犹如从日常生活步入一个沉思的时空。两座建筑都拒绝为城市天际线提供"图标"，但它们各自为使用者——读者或参观者——创造了简单却尊严的空间体验。',
            '2023年普利兹克奖的评审词写道："我们并没有选择一位被认为是高技派、标志性、华丽或革命性的建筑师。我们选择了一位致力于让建筑对社会产生积极影响的建筑师。"这一评语精准地捕捉了奇普菲尔德的独特位置：在一个注意力经济的时代，他的建筑不求关注，却为公民空间确立了不可动摇的品质标准。他的影响体现在世界各地新建的公共建筑中——越来越多的博物馆、图书馆和法院选择简素、耐久的材料和清晰的空间序列，这是奇普菲尔德无形的遗产。',
          ],
          ja: [
            '新博物館が修復分野におけるチッパーフィールドの地位を確立したとすれば、彼の新建築作品は別の才能を示している——市民生活に尊厳を創造すること。バルセロナ司法都市（Ciutat de la Justícia, 2002–2009年）は巨大な裁判所複合体である——ガウディとカタルーニャ・モダニズムで知られる都市にあって、「冷たい」コンクリートの裁判所は場違いに見えるかもしれない。しかしチッパーフィールドの戦略はバルセロナの色彩や形式と競争することではなく、対比を提供することだ——巨大な張り出しヴォリューム、反復する正方形の窓のリズム、色のないコンクリート表面——司法は公正に見えるべきであり、公正は装飾を必要としない。',
            'アイオワ州デモイン中央図書館（2006年）とドイツ・マールバッハの現代文学博物館（2006年）はチッパーフィールドの市民建築の二つの方向を代表する。デモイン図書館は銅色のガラスカーテンウォールで覆われた直方体であり、透明でありながら内向的で、アイオワの広大な空の下で中西部平原の柔らかな光を反射する。現代文学博物館は「窓のない」コンクリートの聖殿であり、内部の光は完全にトップライトから来る——そこに入る体験は、日常からひとつの瞑想的時空へと歩み入るかのようだ。両方の建物は都市のスカイラインに「アイコン」を提供することを拒むが、それぞれが利用者——読者あるいは来館者——に簡素だが尊厳ある空間体験を創造する。',
            '2023年のプリツカー賞の審査評はこう記している——「私たちはハイテク、アイコニック、派手、あるいは革命的な建築家を選んだのではない。私たちは建築を社会に積極的な影響を与えるものにすることに献身した建築家を選んだ。」この評言はチッパーフィールドの独自の位置を精確に捉えている——注意経済の時代にあって、彼の建築は注目を求めないが、市民空間に揺るぎない品質基準を確立した。彼の影響は世界中の新築の公共建築に見られる——ますます多くの美術館、図書館、裁判所が簡素で耐久性のある素材と明快な空間シークエンスを選択している。これはチッパーフィールドの無形の遺産である。',
          ],
          en: [
            'If the Neues Museum established Chipperfield\'s position in the field of restoration, his new-build works demonstrate another gift: creating dignity for civic life. The Ciutat de la Justícia in Barcelona (2002–2009) is a vast courthouse complex — in a city known for Gaudí and Catalan Modernism, a "cold" concrete courthouse might seem out of place. But Chipperfield\'s strategy is not to compete with Barcelona\'s color and form but to offer contrast: massive cantilevered volumes, a repetitive square-window rhythm, colorless concrete surfaces — justice needs to look just, and justice needs no decoration.',
            'The Des Moines Central Library in Iowa (2006) and the Museum of Modern Literature in Marbach, Germany (2006) represent two directions of Chipperfield\'s civic architecture. The Des Moines Library is a rectangular volume clad in copper-tinted glass curtainwall — transparent yet introverted, reflecting the soft light of the Midwestern plains under Iowa\'s vast sky. The Museum of Modern Literature is a "windowless" concrete sanctuary, interior light coming entirely from skylights — the experience of entering it is like stepping from everyday life into a contemplative time-space. Both buildings refuse to provide "icons" for the city skyline, yet each creates a simple but dignified spatial experience for its users — readers or visitors.',
            'The 2023 Pritzker Prize citation reads: "We did not choose an architect who is considered high-tech, iconic, flamboyant, or revolutionary. We chose an architect who is committed to making architecture have a positive impact on society." This statement captures Chipperfield\'s unique position with precision: in an attention economy, his architecture does not seek attention, yet it has established an unshakeable quality standard for civic space. His influence is visible in newly built public buildings worldwide — more and more museums, libraries, and courthouses are choosing austere, durable materials and clear spatial sequences, Chipperfield\'s intangible legacy.',
          ],
        },
      },
      {
        title: { zh: '建筑的道德：为什么"不够"就够了', ja: '建築の道徳：なぜ「足りない」ことで十分なのか', en: 'The ethic of architecture: Why "not enough" is enough' },
        paragraphs: {
          zh: [
            '奇普菲尔德在2023年普利兹克奖获奖感言中提出了一个安静但尖锐的论点：当代建筑的问题不是"不够"，而是"太多"。太多的独特性、太多的表达欲、太多的建筑师自我。他的原话是："我们不需要另一座\u2018重要\u2019的建筑。我们需要一座\u2018好\u2019的建筑。"这句话可以被理解为一种对建筑伦理的呼唤——建筑师的ego不应该比建筑所服务的社区更大。',
            '他的詹姆斯·西蒙美术馆（James Simon Gallery, 2019年，柏林博物馆岛）是这一伦理的终极表达。作为博物馆岛的"入口建筑"，它的任务是迎接每年数百万访客，但它几乎没有可见的"外观"：建筑主体大半埋在地下，地面上只留下一排细长的白色柱廊——对19世纪古典博物馆柱廊的极简回响——和一片广阔的公共台阶。这不是谦逊，而是一种关于建筑正确尺度的信念：在一个拥有佩加蒙祭坛和大教堂的地方，新建筑的恰当角色是背景，而非主角。',
            '奇普菲尔德的影响也在生成一种"学派"：越来越多的年轻建筑师拒绝明星建筑师的模式，选择与历史、材料和日常经验建立更安静的关系。这也许是他最持久的遗产——不是一座特定的建筑，而是一种态度：建筑可以是一张白纸，让生活自己在上面书写。在一个图像无处不在的时代，这是一种近乎激进的美学立场。',
          ],
          ja: [
            'チッパーフィールドは2023年のプリツカー賞受賞スピーチで、静かだが鋭い論点を提起した——現代建築の問題は「足りない」ことではなく「多すぎる」ことである。多すぎる独自性、多すぎる表現欲、多すぎる建築家の自我。彼の言葉を借りれば——「私たちはもうひとつの『重要な』建築を必要としていない。私たちはひとつの『良い』建築を必要としている。」この言葉は建築倫理への呼びかけとして理解できる——建築家のエゴは建築が奉仕すべきコミュニティよりも大きくなってはならない。',
            '彼のジェームズ・サイモン・ギャラリー（James Simon Gallery, 2019年、ベルリン・ムゼウムスインゼル）はこの倫理の究極の表現である。ムゼウムスインゼルの「入口建築」として、その任務は毎年数百万人の来館者を迎えることだが、ほとんど可視的な「外観」を持たない——建物本体の大半は地下に埋められ、地上には一筋の細長い白い列柱廊——19世紀の古典的博物館列柱への極簡のこだま——と広大な公共階段だけが残る。これは謙遜ではない——建築の正しい尺度についての信念である——ペルガモン祭壇と大聖堂のある場所で、新しい建築の適切な役割は背景であり、主役ではない。',
            'チッパーフィールドの影響はひとつの「学派」を生成しつつある——ますます多くの若い建築家がスター建築家のモデルを拒否し、歴史、素材、日常の経験とより静かな関係を築くことを選んでいる。これはおそらく彼の最も持続的な遺産である——特定の建築ではなく、ひとつの態度——建築は白い紙であり得、生活がその上に自らを書く。イメージが遍在する時代にあって、これはほとんど急進的な美学上の立場である。',
          ],
          en: [
            'In his 2023 Pritzker Prize acceptance speech, Chipperfield made a quiet but sharp argument: the problem with contemporary architecture is not "not enough" but "too much." Too much uniqueness, too much expressive desire, too much architect ego. In his words: "We don\'t need another \'important\' building. We need a \'good\' building." This can be understood as a call for architectural ethics — the architect\'s ego should not be larger than the community the architecture serves.',
            'His James Simon Gallery (2019, Berlin Museum Island) is the ultimate expression of this ethic. As the "entrance building" for Museum Island, its task is to welcome millions of annual visitors, yet it has almost no visible "appearance": the building body is largely buried underground, leaving above ground only a slender row of white colonnades — a minimalist echo of the 19th-century classical museum colonnade — and a broad public stairway. This is not humility but a conviction about architecture\'s proper scale: in a place with the Pergamon Altar and the cathedral, the new building\'s appropriate role is background, not protagonist.',
            'Chipperfield\'s influence is also generating a "school": more and more young architects are rejecting the star-architect model, choosing quieter relationships with history, material, and everyday experience. This is perhaps his most lasting legacy — not a specific building but an attitude: architecture can be a blank sheet of paper on which life writes itself. In an era of ubiquitous images, this is a near-radical aesthetic position.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'james-simon-gallery', note: { zh: '博物馆岛入口建筑的极致克制，大半埋入地下，只留白色柱廊作为古典的回响。', ja: 'ムゼウムスインゼル入口建築の極限の克制。大半が地下に埋められ、白い列柱廊だけが古典のこだまとして残る。', en: 'The ultimate restraint for a Museum Island entrance building — largely buried, leaving only a white colonnade as a classical echo.' } },
      { slug: 'museum-of-modern-literature', note: { zh: '"无窗"的混凝土文学圣殿，内部光来自天窗，进入其中如步入沉思的时空。', ja: '「窓のない」コンクリートの文学の聖殿。内部の光はトップライトから。入ることは瞑想的時空へ歩み入るかのよう。', en: 'A "windowless" concrete literary sanctuary, interior lit only from skylights — entering it is like stepping into a contemplative time-space.' } },
      { slug: 'coleccion-jumex', note: { zh: '墨西哥城一座锯齿形屋顶的"白盒子"，当地石材铺地，为艺术而非建筑师存在。', ja: 'メキシコシティの鋸歯状屋根の「ホワイトボックス」。地元石材の床。建築家のためではなく芸術のために存在する。', en: 'A sawtooth-roofed "white box" in Mexico City with local stone floors — existing for art, not for the architect.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: David Chipperfield', url: 'https://www.pritzkerprize.com/laureates/2023' },
      { title: 'Encyclopaedia Britannica: David Chipperfield', url: 'https://www.britannica.com/biography/David-Chipperfield' },
      { title: 'Wikidata: David Chipperfield', url: 'https://www.wikidata.org/wiki/Q707020' },
      { title: 'David Chipperfield Architects', url: 'https://davidchipperfield.com/' },
    ],
  },

  'gordon-bunshaft': {
    slug: 'gordon-bunshaft',
    summary: {
      zh: '戈登·邦沙夫特（Gordon Bunshaft, 1909–1990）是现代企业建筑最伟大的塑造者。作为SOM（Skidmore, Owings & Merrill）纽约办公室的设计主管，他在1950–1970年代间将美国大企业的建筑从装饰艺术时代的折中主义带入了国际风格的清晰逻辑。他的利华大厦（1952年，纽约公园大道）是全世界第一座全玻璃幕墙的"纯净"高层建筑，一举定义了此后半个世纪的全球写字楼美学。1988年普利兹克奖——他与巴西的奥斯卡·尼迈耶共享——表彰了他"将现代建筑转化为大型企业机构的艺术"。',
      ja: 'ゴードン・バンシャフト（Gordon Bunshaft, 1909–1990）はモダンな企業建築の最も偉大な形成者である。SOM（スキッドモア・オーウィングス＆メリル）ニューヨーク事務所のデザイン責任者として、彼は1950–1970年代にかけてアメリカ大企業の建築をアール・デコ時代の折衷主義からインターナショナル・スタイルの明快な論理へと導いた。彼のリーバ・ハウス（1952年、ニューヨークのパーク・アベニュー）は世界初の全面ガラスカーテンウォールの「純粋な」高層建築であり、その後の半世紀にわたる世界のオフィス美学を一挙に定義した。1988年のプリツカー賞——ブラジルのオスカー・ニーマイヤーと共同受賞——は彼が「近代建築を大規模企業機構の芸術へと変換した」ことを表彰した。',
      en: 'Gordon Bunshaft (1909–1990) is the greatest shaper of modern corporate architecture. As design director of SOM\'s New York office, he led American big-business architecture from Art Deco eclecticism into the lucid logic of the International Style during the 1950s–1970s. His Lever House (1952, Park Avenue, New York) was the world\'s first "pure" all-glass curtain-wall tower, defining the global office aesthetic for the following half-century in a single stroke. The 1988 Pritzker Prize — shared with Brazil\'s Oscar Niemeyer — honored his "transformation of modern architecture into the art of the large corporate institution."',
    },
    core_ideas: {
      zh: [
        '玻璃与钢的纯净性——建筑的外墙应该是透明的、反射的，将城市的天光和街景吸收入建筑的存在中。玻璃幕墙不是风格，而是现代企业透明和高效的隐喻',
        '建筑作为公司艺术品——企业总部不只是一个工作场所，而是一个体现公司价值观和审美立场的空间宣言。利华大厦是利华兄弟公司的"立体品牌"',
        '广场与公共空间——每座企业塔楼都应该将一部分土地还给城市。邦沙夫特的高层通常后退于街道，创造一个人人可以使用的抬高式公共广场',
        '技术理性主义——建筑从结构到空调到窗框的每一个决定都应该基于技术和理性的分析，而非风格偏好',
      ],
      ja: [
        'ガラスと鋼の純粋性——建物の外壁は透明で反射的であるべきで、都市の天空光と街の景色を建物の存在へと吸い込む。ガラスカーテンウォールはスタイルではなく、現代企業の透明性と効率性のメタファーである',
        '企業芸術品としての建築——企業本社は単なる仕事場ではなく、企業の価値観と美学的立場を体現する空間的宣言である。リーバ・ハウスはリーバ・ブラザーズ社の「立体ブランド」である',
        '広場と公共空間——すべての企業タワーは土地の一部を都市に返還すべきである。バンシャフトの高層は通常街路から後退し、誰でも使える嵩上げされた公共広場をつくり出す',
        '技術合理主義——構造から空調、窓枠に至るまで、建築のあらゆる決定はスタイルの好みではなく技術的かつ合理的な分析に基づくべきである',
      ],
      en: [
        'Purity of glass and steel — the building envelope should be transparent and reflective, drawing urban skylight and streetscape into the building\'s presence. The glass curtain wall is not style but metaphor for modern corporate transparency and efficiency',
        'Building as corporate art — a corporate headquarters is not just a workplace but a spatial declaration embodying the company\'s values and aesthetic stance. Lever House was the "three-dimensional brand" of Lever Brothers',
        'Plaza and public space — every corporate tower should return part of its land to the city. Bunshaft\'s towers typically set back from the street, creating an elevated public plaza accessible to all',
        'Technological rationalism — every decision in the building, from structure to air conditioning to window frames, should be based on technical and rational analysis, not stylistic preference',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Gordon_Bunshaft_1988.jpg',
      author: 'Unknown',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Gordon_Bunshaft_1988.jpg',
      alt: { zh: '戈登·邦沙夫特肖像，1988年', ja: 'ゴードン・バンシャフトの肖像、1988年', en: 'Portrait of Gordon Bunshaft, 1988' },
    },
    sections: [
      {
        title: { zh: '利华大厦：一座建筑改写历史', ja: 'リーバ・ハウス：一つの建築が歴史を書き換える', en: 'Lever House: One building rewrites history' },
        paragraphs: {
          zh: [
            '1952年，当利华大厦在纽约公园大道落成时，没有人的眼睛准备好了。它不是当时纽约常见的逐层退台的"婚礼蛋糕"式摩天楼——它是一块纯净的蓝绿色玻璃板，24层高，只有18英尺（5.5米）厚，垂直于公园大道悬浮。建筑的主体被抬高在一个开放的广场之上，广场上只有一座低矮的水平裙房。空气、光线和行人可以在建筑下面自由流动——这在1952年的曼哈顿几乎是一种乌托邦式的姿态。',
            '利华大厦的玻璃幕墙不是附加的"皮"——它就是建筑。幕墙由不锈钢竖框和蓝绿色吸热玻璃板组成的，每一层只有两块玻璃。邦沙夫特和SOM团队与制造商合作开发了这种封闭式幕墙系统——它可以自动清洁（通过永久性窗户清洗平台系统），这在当时是革命性的。但利华大厦真正的影响力不在技术，而在"形象"：一座干净、透明、漂浮的建筑，用视觉语言宣称"这是现代企业的样子"。《纽约时报》的建筑评论家称其为"建筑史上最不妥协的建筑之一"，但不是作为批评——而是赞美。',
            '利华大厦直接改写了纽约市——乃至全世界的办公楼法律（zoning law）。纽约市1916年的分区条例要求高层建筑逐层后退以保证街道采光。邦沙夫特证明了：如果建筑足够薄并且建在一个公共广场上，你可以完全不合后退规范，同时为城市提供更好的公共空间。1961年纽约修改了分区法，引入了广场奖励机制——开发商如果提供公共广场，就可以建造更高的建筑而不需要后退。这一变化——几乎可以直接追溯到利华大厦——塑造了此后半个世纪的纽约天际线。',
          ],
          ja: [
            '1952年、リーバ・ハウスがニューヨークのパーク・アベニューに完成したとき、誰の目も準備ができていなかった。それは当時のニューヨークで一般的だった逐層セットバックの「ウェディングケーキ」式超高層ではなかった——純粋な青緑色のガラス板であり、24階建て、わずか18フィート（5.5メートル）の厚みで、パーク・アベニューに垂直に浮かんでいた。建物本体は開放的な広場の上に持ち上げられ、広場には低い水平のポディウムだけがある。空気、光、歩行者が建物の下を自由に流れる——1952年のマンハッタンでは、これはほとんどユートピア的な身振りだった。',
            'リーバ・ハウスのガラスカーテンウォールは付加された「皮」ではない——それが建築である。カーテンウォールはステンレス鋼の縦枠と青緑色の熱線吸収ガラスパネルで構成され、各階はわずか二枚のガラスである。バンシャフトとSOMチームはメーカーと協力してこの閉鎖型カーテンウォールシステムを開発した——恒久的な窓清掃プラットフォームシステムによって自動清掃が可能で、これは当時革命的だった。しかしリーバ・ハウスの真の影響力は技術ではなく「イメージ」にある——清潔で、透明で、浮遊する建物が、「これが現代企業の姿だ」と視覚言語で宣言する。『ニューヨーク・タイムズ』の建築評論家はそれを「建築史上最も妥協のない建築のひとつ」と呼んだ——批判としてではなく、賛辞として。',
            'リーバ・ハウスはニューヨーク市——さらには全世界の——オフィスビル法（ゾーニング法）を直接書き換えた。ニューヨーク市の1916年ゾーニング条例は、街路の採光を確保するために高層建築の逐層セットバックを要求していた。バンシャフトは証明した——もし建物が十分に薄く、公共広場の上に建てられれば、セットバック規制にまったく従わずに、同時により良い公共空間を都市に提供できる。1961年、ニューヨークはゾーニング法を改正し、広場ボーナス制度を導入した——開発者が公共広場を提供すれば、セットバックなしでより高い建物を建てられる。この変化——ほぼ直接にリーバ・ハウスに遡ることができる——はその後の半世紀のニューヨークのスカイラインを形成した。',
          ],
          en: [
            'When Lever House was completed on Park Avenue in 1952, no one\'s eyes were ready. It was not the familiar New York "wedding-cake" skyscraper with step-backs — it was a pure blue-green glass slab, 24 stories tall and a mere 18 feet (5.5 meters) thick, suspended perpendicular to Park Avenue. The building body was lifted above an open plaza, with only a low horizontal podium on the ground. Air, light, and pedestrians could flow freely beneath the building — in 1952 Manhattan, this was a near-utopian gesture.',
            'Lever House\'s glass curtain wall is not an applied "skin" — it is the architecture. The curtain wall consists of stainless-steel mullions and blue-green heat-absorbing glass panels, with only two panes of glass per floor. Bunshaft and the SOM team worked with manufacturers to develop this closed curtain-wall system — it could self-clean through a permanent window-washing platform system, revolutionary at the time. But Lever House\'s true influence was not technical but imagistic: a clean, transparent, floating building that declared, in visual language, "this is what the modern corporation looks like." The New York Times\' architecture critic called it "one of the most uncompromising buildings in the history of architecture" — not as criticism but as praise.',
            'Lever House directly rewrote New York City\'s — and the world\'s — office-building zoning. New York\'s 1916 Zoning Resolution required step-backs on tall buildings to ensure street light and air. Bunshaft proved: if the building is thin enough and set on a public plaza, you can entirely bypass the setback rules while providing better public space for the city. In 1961, New York amended its zoning law to introduce plaza bonuses — developers who provided public plazas could build taller without setbacks. This change — traceable almost directly to Lever House — shaped the New York skyline for the following half-century.',
          ],
        },
      },
      {
        title: { zh: '作为雕塑的建筑：从贝内克到赫什霍恩', ja: '彫刻としての建築：バイネキからハーシュホーンまで', en: 'Architecture as sculpture: From Beinecke to Hirshhorn' },
        paragraphs: {
          zh: [
            '邦沙夫特的建筑范围远不止办公楼。耶鲁大学贝内克珍本与手稿图书馆（Beinecke Rare Book & Manuscript Library, 1963年）是他最迷人的作品之一。一个28米见方的白色大理石立方体悬浮在耶鲁校园的哥特式建筑群中，像一块从另一个世界降临的陨石。但这座建筑的真正天才在于它的墙壁：它们不是普通的大理石——而是薄得半透明的白色佛蒙特大理石面板，厚度不到3厘米。日光透过这些面板进入内部，整个室内被一种温暖的琥珀色光辉浸透——这是世界上最珍贵的古籍（包括古腾堡圣经）的理想照明。在夜晚，内部灯光反过来将整个立方体变成一个通体发光的灯笼。',
            '华盛顿特区的赫什霍恩博物馆与雕塑花园（Hirshhorn Museum, 1974年）是邦沙夫特最具争议的作品——一座鼓形的、悬挑的混凝土建筑，坐落在国家广场上，与古典主义的新古典博物馆群和现代主义的东翼之间形成一种异质的存在。四根巨大的混凝土柱将圆环体高高举起，在建筑下方创造了一个有盖的公共广场。邦沙夫特的意图是将博物馆变成一座巨大的雕塑基座——上面的建筑是展品，下面的空间是城市生活。但批评者认为它像一个碉堡，与国家的纪念性中轴不协调。争议本身——四十年后仍在持续——证明了邦沙夫特建筑的力量：它们从来不寻求讨人喜欢，它们寻求的是存在的强度。',
          ],
          ja: [
            'バンシャフトの建築の範囲はオフィスビルにはるかにとどまらない。エール大学バイネキ稀覯書・手稿図書館（Beinecke Rare Book & Manuscript Library, 1963年）は彼の最も魅力的な作品のひとつである。28メートル四方の白い大理石の立方体がエールのゴシック建築群のなかに浮かび、まるで別の世界から降ってきた隕石のようだ。しかしこの建築の真の天才はその壁にある——それらは普通の大理石ではない——厚さ3センチ未満の、薄く半透明な白いバーモント産大理石のパネルである。日光がこれらのパネルを通り抜けて内部に入り、室内全体が暖かな琥珀色の輝きに浸される——これは世界で最も貴重な古籍（グーテンベルク聖書を含む）のための理想的な照明である。夜には、内部の照明が逆に立方体全体を全身発光するランタンに変える。',
            'ワシントンDCのハーシュホーン美術館と彫刻庭園（Hirshhorn Museum, 1974年）はバンシャフトの最も論争的な作品である——ドラム形で、片持ちで張り出したコンクリート建築がナショナル・モールに座り、古典主義の新古典主義美術館群とモダニズムの東棟のあいだで異質な存在を形成する。四本の巨大なコンクリート柱が円環体を高く持ち上げ、建物の下に屋根付きの公共広場を創り出す。バンシャフトの意図は美術館を巨大な彫刻の台座に変えることだった——上の建物は展示品であり、下の空間は都市の生活である。しかし批評家はそれをトーチカのようであり、国家の記念碑的中軸と調和しないと見なした。論争は——四十年後もなお続いており——バンシャフトの建築の力を証明している。それらは決して人に好かれることを求めず、存在の強度を求める。',
          ],
          en: [
            'Bunshaft\'s architectural range went far beyond office buildings. The Beinecke Rare Book & Manuscript Library at Yale (1963) is one of his most enchanting works. A 28-meter-square white marble cube floats among Yale\'s Gothic buildings like a meteorite from another world. But the building\'s true genius lies in its walls: they are not ordinary marble — they are wafer-thin, translucent white Vermont marble panels, less than 3 centimeters thick. Daylight passes through these panels into the interior, bathing the entire space in a warm amber glow — ideal illumination for some of the world\'s most precious manuscripts, including a Gutenberg Bible. At night, interior lighting turns the cube into a wholly luminous lantern.',
            'The Hirshhorn Museum and Sculpture Garden in Washington, D.C. (1974) is Bunshaft\'s most controversial work — a drum-shaped, cantilevered concrete building sitting on the National Mall, forming a heterogeneous presence between the classicist Neoclassical museums and the modernist East Wing. Four massive concrete piers lift the torus high, creating a covered public plaza beneath the building. Bunshaft\'s intention was to turn the museum into a giant sculpture pedestal — the building above is the exhibit, the space below is urban life. But critics saw it as bunker-like, discordant with the nation\'s monumental axis. The controversy — still ongoing forty years later — proves the power of Bunshaft\'s buildings: they never seek to be liked; they seek intensity of presence.',
          ],
        },
      },
      {
        title: { zh: 'SOM与匿名的大师', ja: 'SOMと匿名の巨匠', en: 'SOM and the anonymous master' },
        paragraphs: {
          zh: [
            '邦沙夫特的独特之处在于他几乎全部的职业生涯都在SOM——美国最大、最具影响力的企业化建筑设计公司——度过。这种"隐匿在品牌背后"的身份与战后兴起的"明星建筑师"（弗兰克·劳埃德·赖特、勒·柯布西耶）形成鲜明对比。邦沙夫特不是一个"作者"——他不将自己的名字刻在建筑上，不出版个人作品集，不为自己建立公众形象。他的建筑标注为"SOM"，而不是"Gordon Bunshaft"。这种匿名性本身就是一种建筑伦理：现代企业建筑不是个人的表达，而是集体的、理性的、制度的产物。',
            '但矛盾的是，正是这种匿名姿态最终为他赢得了建筑界的最高荣誉。1988年普利兹克奖授予邦沙夫特时，评委会的评语中特别提到："他将现代建筑的美学可能性带入了大型公司在美国经济中蓬勃发展的时代。"邦沙夫特证明了：你不需要成为"艺术天才"来创造伟大的建筑。理性、协作和技术精度——这些企业文化的核心价值观——本身就是强大的美学原则。SOM至今仍是全球最大的建筑设计公司，其设计方法直接继承了邦沙夫特的逻辑：集体创作、技术驱动、无名的品质。',
            '邦沙夫特于1990年去世，享年81岁。利华大厦在2000年被列为纽约市地标。邦沙夫特本人捐赠了自己的艺术收藏（包括毕加索和贾科梅蒂的作品）给纽约现代艺术博物馆。他曾经说过一句话，或许是他最好的墓志铭："我相信建筑的作用是解决问题，而不是制造问题。"在一个对形式主义越来越痴迷的建筑世界里，这句话中蕴含的专业伦理仍然是最清醒的声音。',
          ],
          ja: [
            'バンシャフトの独自性は、彼がキャリアのほぼすべてをSOM——アメリカ最大で最も影響力のある企業化された建築設計事務所——のなかで過ごしたことにある。この「ブランドの背後に隠れる」というアイデンティティは、戦後に台頭した「スター建築家」（フランク・ロイド・ライト、ル・コルビュジエ）とは鮮やかな対照をなす。バンシャフトは「作者」ではない——彼は自分の名を建築に刻まず、個人作品集を出版せず、公的イメージを構築しなかった。彼の建築は「SOM」とクレジットされ、「ゴードン・バンシャフト」とはクレジットされなかった。この匿名性はそれ自体がひとつの建築倫理である——近代企業建築は個人の表現ではなく、集団的で、理性的で、制度的な産物である。',
            'しかし逆説的なことに、まさにこの匿名の姿勢が最終的に彼に建築界の最高の栄誉をもたらした。1988年にプリツカー賞がバンシャフトに授与されたとき、審査評は特に次のように記した——「彼は近代建築の美学的可能性を、大企業がアメリカ経済のなかで繁栄していた時代へと持ち込んだ。」バンシャフトは証明した——偉大な建築を創造するために「芸術的天才」である必要はない。合理性、協働、技術的精確さ——これらの企業文化の核心的価値——がそれ自体、強力な美学原理である。SOMは今日もなお世界最大の建築設計事務所であり、その設計方法はバンシャフトの論理を直接継承している——集団創作、技術駆動、無名の品質。',
            'バンシャフトは1990年に81歳で死去した。リーバ・ハウスは2000年にニューヨーク市のランドマークに指定された。バンシャフト自身は自分のアートコレクション（ピカソやジャコメッティの作品を含む）をニューヨーク近代美術館に寄贈した。彼はかつてこう言った——これはおそらく彼の最高の墓碑銘である——「建築の役割は問題を解決することであり、問題をつくり出すことではないと私は信じている。」形式主義にますます夢中になる建築界にあって、この言葉に込められた専門的倫理は、いまなお最も醒めた声である。',
          ],
          en: [
            'What distinguishes Bunshaft is that he spent virtually his entire career within SOM — America\'s largest and most influential corporatized architecture firm. This identity of "hiding behind the brand" contrasts sharply with the postwar rise of the "starchitect" (Frank Lloyd Wright, Le Corbusier). Bunshaft was not an "author" — he did not inscribe his name on buildings, did not publish personal monographs, did not build a public persona. His buildings were credited to "SOM," not "Gordon Bunshaft." This anonymity is itself an architectural ethic: modern corporate architecture is not individual expression but collective, rational, institutional production.',
            'Yet paradoxically, this very anonymous posture ultimately earned him architecture\'s highest honor. When the Pritzker Prize was awarded to Bunshaft in 1988, the jury citation specifically noted: "He brought the aesthetic possibilities of modern architecture into the era of the large corporation flourishing in the American economy." Bunshaft proved: you do not need to be an "artistic genius" to create great architecture. Rationality, collaboration, and technical precision — these core values of corporate culture — are themselves powerful aesthetic principles. SOM remains the world\'s largest architecture firm today, and its design methodology directly inherits Bunshaft\'s logic: collective creation, technology-driven, nameless quality.',
            'Bunshaft died in 1990 at age 81. Lever House was designated a New York City landmark in 2000. Bunshaft himself donated his art collection (including works by Picasso and Giacometti) to the Museum of Modern Art in New York. He once said something that might serve as his best epitaph: "I believe the role of architecture is to solve problems, not to create them." In an architectural world increasingly obsessed with formalism, the professional ethic contained in that sentence remains the most sober voice.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'lever-house', note: { zh: '全世界第一座纯净玻璃幕墙塔楼，改写了纽约的分区法和全球写字楼美学。', ja: '世界初の純粋なガラスカーテンウォールタワー。ニューヨークのゾーニング法と世界のオフィス美学を書き換えた。', en: 'The world\'s first pure glass curtain-wall tower, rewriting New York\'s zoning law and global office aesthetics.' } },
      { slug: 'beinecke-rare-book-manuscript-library', note: { zh: '半透明大理石立方体，日光滤过石壁将古籍浸透在琥珀色光辉中。', ja: '半透明の大理石の立方体。日光が石壁を通り抜けて古籍を琥珀色の輝きに浸す。', en: 'A translucent marble cube where daylight filters through stone walls, bathing rare books in an amber glow.' } },
      { slug: 'hirshhorn-museum-and-sculpture-garden', note: { zh: '鼓形悬挑的混凝土环体，建筑本身就是国家广场上最大的一件雕塑。', ja: 'ドラム形で片持ちのコンクリート環体。建築それ自体がナショナル・モール最大の彫刻である。', en: 'A drum-shaped, cantilevered concrete torus — the building itself is the largest sculpture on the National Mall.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: Gordon Bunshaft', url: 'https://www.pritzkerprize.com/laureates/1988' },
      { title: 'Encyclopaedia Britannica: Gordon Bunshaft', url: 'https://www.britannica.com/biography/Gordon-Bunshaft' },
      { title: 'Wikidata: Gordon Bunshaft', url: 'https://www.wikidata.org/wiki/Q706922' },
      { title: 'SOM Official Site', url: 'https://www.som.com/' },
    ],
  },

  'fumihiko-maki': {
    slug: 'fumihiko-maki',
    summary: {
      zh: '槙文彦（Fumihiko Maki, 1928\u20132024）是日本现代建筑承前启后的关键人物。他是新陈代谢派成员中最终走得最远的一位\u2014\u2014从早期集体形式的大胆实验，到后来逐渐形成一种独特的\u201c安静现代主义\u201d。槙的建筑语言以精炼的几何形态、对表皮的极致考究和\u201c奥\u201d（oku）的空间纵深为特征。他的代表作包括东京螺旋大厦（Spiral）、京都国立近代美术馆和纽约世贸中心4号楼。1993年获得普利兹克奖，是第二位获此荣誉的日本建筑师（丹下健三未获奖）。槙的设计始终不追求标志性的视觉冲击，而是追求\u201c在时间中生长\u201d\u2014\u2014这一信念使他成为日本现代建筑伦理中最持久的声音之一。',
      ja: '槇文彦（Fumihiko Maki, 1928\u20132024）は日本近代建築の承前啓後の鍵となる人物である。彼はメタボリズムのメンバーのなかで最終的にもっとも遠くまで歩いた者であり\u2014\u2014初期の集団的形式の大胆な実験から、次第に独自の\u201c静かなモダニズム\u201dを形成するに至った。槇の建築言語は、精錬された幾何学的形態、表皮への極限のこだわり、そして\u201c奥\u201d（oku）の空間的深さを特徴とする。代表作には東京スパイラル（Spiral）、京都国立近代美術館、ニューヨーク4ワールドトレードセンターがある。1993年にプリツカー賞を受賞し、日本人として（丹下健三は未受賞）二人目の栄誉となった。槇の設計は常に象徴的な視覚的衝撃を追求せず、\u201c時間のなかで成長すること\u201dを追求した\u2014\u2014この信念こそが彼を日本近代建築倫理のもっとも持続的な声のひとりとした。',
      en: 'Fumihiko Maki (1928\u20132024) is a pivotal figure bridging generations in Japanese modern architecture. Among the Metabolist members, he ultimately traveled the farthest \u2014 from bold experiments in collective form in his early years to a distinctive "quiet modernism." Maki\u2019s architectural language is characterized by refined geometric forms, an extreme attentiveness to surfaces, and spatial depth (\u201coku\u201d). His signature works include Spiral in Tokyo, the National Museum of Modern Art, Kyoto, and 4 World Trade Center in New York. He received the Pritzker Prize in 1993, becoming the second Japanese architect so honored (Kenz\u014d Tange never won). Maki\u2019s design never chases iconic visual impact but rather pursuits "growing through time" \u2014 a conviction that makes him one of the most enduring voices in Japanese modern architectural ethics.',
    },
    core_ideas: {
      zh: [
        '集体形式与\u201c奥\u201d的空间\u2014\u2014建筑不是孤立的物体，而是群体中的一员。槙的早期代谢主义研究关注如何让许多相似的单元有机组合成更大的整体',
        '表皮的深度\u2014\u2014立面不仅仅是glass-and-steel的薄膜，而是一层有深度、有阴影、有质感的面纱。铝板、穿孔金属、陶瓷面板\u2014\u2014每种材料的反射率和透明度都被精确计算',
        '建筑的时间维度\u2014\u2014一个建筑应该能够容纳未来几十年内不可预知的变化。槙的设计常包含\u201c柔性框架\u201d\u2014\u2014允许内部功能转变而不破坏外部形式的完整性',
        '安静建筑学\u2014\u2014在20世纪末的建筑界，标新立异已经成为主流。槙选择了一条更加内敛的道路：他的建筑不喊叫，但它们在城市中持续存在',
      ],
      ja: [
        '集団形式と\u201c奥\u201dの空間\u2014\u2014建築は孤立した物体ではなく、群れのなかの一員である。槇の初期メタボリズム研究は、いかに多数の類似ユニットが有機的に大きな全体を構成するかに関心を寄せる',
        '表皮の深み\u2014\u2014ファサードは単なるガラスとスチールの薄膜ではなく、奥行き、陰影、質感をもつヴェールの層である。アルミ板、パンチングメタル、セラミックパネル\u2014\u2014それぞれの素材の反射率と透明度が精確に計算される',
        '建築の時間次元\u2014\u2014建築は数十年にわたる予測不能な変化を収容できるべきである。槇の設計はしばしば\u201c柔軟なフレーム\u201dを含み\u2014\u2014内部機能の変化を許しつつ外部形式の完全性を損なわない',
        '静かな建築学\u2014\u201420世紀末の建築界では、新奇性の追求が主流となった。槇はより内省的な道を選んだ\u2014\u2014彼の建築は叫ばないが、都市のなかで持続的に存在しつづける',
      ],
      en: [
        'Collective form and "oku" \u2014 architecture is not an isolated object but a member of a group. Maki\u2019s early Metabolist research concerned how numerous similar units can organically compose a larger whole',
        'Depth of surface \u2014 the fa\u00e7ade is not merely a glass-and-steel membrane but a layered veil with depth, shadow, and texture. Aluminum panels, perforated metal, ceramic panels \u2014 the reflectivity and transparency of each material is precisely calculated',
        'The time dimension of architecture \u2014 a building should accommodate unpredictable changes over coming decades. Maki\u2019s designs often contain "flexible frameworks" \u2014 allowing internal functional shifts without compromising external formal integrity',
        'Quiet architecture \u2014 by the late 20th century, novelty-seeking had become mainstream in the architectural world. Maki chose a more restrained path: his buildings do not shout, but they endure persistently in the city',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Fumihiko_Maki_2010.jpg/800px-Fumihiko_Maki_2010.jpg',
      author: 'Wikimedia Commons / Herbert Behrens',
      license: 'CC BY-SA 3.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Fumihiko_Maki_2010.jpg',
      alt: { zh: '槙文彦肖像', ja: '槇文彦の肖像', en: 'Portrait of Fumihiko Maki' },
    },
    sections: [
      {
        title: { zh: '从新陈代谢到安静现代主义', ja: 'メタボリズムから静かなモダニズムへ', en: 'From Metabolism to quiet modernism' },
        paragraphs: {
          zh: [
            '槙文彦1928年生于东京。1952年从东京大学建筑系毕业后，他前往美国深造：先在克兰布鲁克艺术学院（Cranbrook Academy of Art）学习，后在哈佛大学设计研究生院（GSD）获得硕士学位。1956\u20131958年，他在圣路易斯的华盛顿大学任教，随后加入SOM纽约办公室\u2014\u2014在这里他接触到了美国企业建筑的生产方式。但槙真正的思想形成是在1960年代回到日本之后。他加入新陈代谢运动，与菊竹清训、黑川纪章等人共同发表了\u201c新陈代谢1960\u201d（Metabolism 1960）宣言。但即便在那时，槙的声音也比他的同伴们更冷静。他提出的\u201c集体形式\u201d（Collective Form）概念\u2014\u2014一组单独的建筑如何通过空间的韵律关系构成更大的整体\u2014\u2014虽然属于代谢主义范畴，但已经比黑川的胶囊建筑和菊竹的空中城市更加务实和持久。',
            '1970年大阪世博会之后，新陈代谢运动逐渐衰落。槙没有停留在乌托邦幻想中。他回到了一个更安静但同样激进的问题：如何在一个已经被现代主义占据的世界里，继续做现代主义？他的回答是：让现代主义变得更加温柔。代官山Hillside Terrace（1969\u20131992）是这一转型时期的实验室\u2014\u2014一个分六期建成的复合开发项目，包含了住宅、商业、文化空间和公共庭院。每一期都反映了槙在当时对材料、尺度和公共空间的最新理解。这座建筑没有任何一张\u201c标志性照片\u201d，但它也许是东京最受喜爱的现代建筑群之一\u2014\u2014在一个以喧嚣和密度著称的城市里，Hillside Terrace提供了几乎不可思议的宁静。代官山证明了槙的信念：建筑可以不是宣言，而是对话。',
            '1980年代是槙的国际化阶段。螺旋大厦（Spiral Building, 1985年，东京青山）是他最为人熟知的建筑之一\u2014\u2014一座包含画廊、多功能厅、餐厅和办公空间的复合文化建筑。它的立面以铝板和玻璃的组合创造了复杂的反射与透明效果，内部的螺旋坡道暗示着运动与升腾。螺旋大厦的形式语言比代官山更加大胆，但仍保持槙式的克制：它与青山的街道尺度无缝融合，从不试图压倒周围环境。1986年，京都国立近代美术馆在西阵地区开放\u2014\u2014这座建筑用日本传统的格子（k\u014dshi）主题来解析现代展览需求，以一种深具京都气质的方式将国际现代主义本土化。',
          ],
          ja: [
            '槇文彦は1928年東京生まれ。1952年に東京大学建築学科を卒業した後、渡米した。クランブルック・アカデミー・オブ・アートで学び、ハーバード大学デザイン大学院（GSD）で修士号を取得した。1956\u20131958年、ワシントン大学（セントルイス）で教鞭を執ったのち、SOMニューヨーク事務所に加わり\u2014\u2014ここでアメリカの企業建築の生産方式に触れた。しかし槇の思想が真に形成されたのは1960年代に日本へ帰国した後である。彼はメタボリズム運動に参加し、菊竹清訓、黒川紀章らとともに\u201cMetabolism 1960\u201d宣言を発表した。しかしその時点ですでに、槇の声は仲間たちより冷静だった。彼の提唱した\u201c集団形式\u201d（Collective Form）概念\u2014\u2014個別の建築群がいかに空間のリズム関係を通じてより大きな全体を構成するか\u2014\u2014は、メタボリズムの範疇に属しながら、黒川のカプセル建築や菊竹の空中都市よりもはるかに実務的で持続的であった。',
            '1970年大阪万博後、メタボリズム運動はしだいに衰退した。槇はユートピア幻想に留まらなかった。彼はより静かだが同じくラディカルな問いに帰った\u2014\u2014すでにモダニズムに占拠された世界のなかで、いかにしてモダニズムを継続するのか？ 彼の回答は\u2014\u2014モダニズムをもっとやさしくすること\u2014\u2014だった。代官山ヒルサイドテラス（1969\u20131992）はこの転換期の実験場である\u2014\u20146期に分けて建設された複合開発で、住宅、商業、文化空間、公共の庭を含む。各期はその時点での槇の素材、スケール、公共空間に対する最新の理解を反映している。この建築には一枚の\u201cアイコン的写真\u201dは存在しないが、おそらく東京でもっとも愛される近代建築群のひとつである\u2014\u2014喧噪と密度で知られる都市のなかで、ヒルサイドテラスはほとんど信じがたい静けさを提供する。代官山は槇の信念を証明した\u2014\u2014建築は宣言ではなく対話でありうる。',
            '1980年代は槇の国際化の段階である。スパイラルビル（Spiral Building, 1985年、東京青山）は彼のもっともよく知られる建築のひとつ\u2014\u2014ギャラリー、多目的ホール、レストラン、オフィスを含む複合文化施設。そのファサードはアルミ板とガラスの組み合わせによって複雑な反射と透明の効果を生み、内部の螺旋スロープは運動と上昇を暗示する。スパイラルの形式言語は代官山より大胆だが、それでも槇式の抑制を保つ\u2014\u2014青山の街路スケールにシームレスに溶け込み、周囲環境を圧倒しようとは決してしない。1986年、京都国立近代美術館が西陣地区に開館\u2014\u2014この建築は日本の伝統的格子（k\u014dshi）テーマを用いて近代展示の要求を解析し、深い京都的な気質をもって国際モダニズムを在地化した。',
          ],
          en: [
            'Fumihiko Maki was born in Tokyo in 1928. After graduating from the University of Tokyo\u2019s Department of Architecture in 1952, he went to the United States for further study: first at Cranbrook Academy of Art, then earning a master\u2019s at the Harvard Graduate School of Design (GSD). From 1956 to 1958 he taught at Washington University in St. Louis, then joined SOM\u2019s New York office \u2014 where he encountered the production methods of American corporate architecture. But Maki\u2019s thinking truly crystallized after returning to Japan in the 1960s. He joined the Metabolist movement, co-authoring the "Metabolism 1960" manifesto with Kiyonori Kikutake, Kisho Kurokawa, and others. Yet even then, Maki\u2019s voice was calmer than his peers\u2019. His concept of "Collective Form" \u2014 how individual buildings can compose a larger whole through spatial rhythmic relationships \u2014 belonged to the Metabolist ambit but was already far more pragmatic and enduring than Kurokawa\u2019s capsule architecture or Kikutake\u2019s aerial cities.',
            'After the 1970 Osaka Expo, the Metabolist movement gradually declined. Maki did not linger in utopian fantasies. He returned to a quieter but equally radical question: how to continue doing modernism in a world already full of it? His answer: make modernism gentler. Hillside Terrace in Daikanyama (1969\u20131992) is the laboratory of this transitional period \u2014 a mixed-use development built in six phases, containing residences, commercial spaces, cultural venues, and public courtyards. Each phase reflects Maki\u2019s latest understanding at the time of materials, scale, and public space. This building has no single "iconic photograph," but it is perhaps one of Tokyo\u2019s most beloved modern architectural ensembles \u2014 in a city known for noise and density, Hillside Terrace offers an almost improbable serenity. Daikanyama proved Maki\u2019s conviction: architecture can be dialogue, not manifesto.',
            'The 1980s were Maki\u2019s phase of internationalization. The Spiral Building (1985, Aoyama, Tokyo) is among his best-known works \u2014 a mixed-use cultural complex containing a gallery, multipurpose hall, restaurant, and offices. Its fa\u00e7ade creates complex reflective and transparent effects through combinations of aluminum panels and glass, while the internal spiral ramp suggests movement and ascension. Spiral\u2019s formal language is bolder than Hillside Terrace, yet it retains Maki-esque restraint: it seamlessly integrates with Aoyama\u2019s street scale, never attempting to overwhelm its surroundings. In 1986, the National Museum of Modern Art, Kyoto opened in the Nishijin district \u2014 this building parses modern exhibition requirements through the traditional Japanese lattice (k\u014dshi) motif, localizing international modernism with a deeply Kyoto sensibility.',
          ],
        },
      },
      {
        title: { zh: '国际舞台：4WTC与普利兹克', ja: '国際舞台：4WTCとプリツカー賞', en: 'International stage: 4 WTC and the Pritzker' },
        paragraphs: {
          zh: [
            '1993年槙文彦获得普利兹克建筑奖，评审团的评语中说：\u201c他是极少主义的艺术家，但不是那种走向沉默的极少主义\u2014\u2014他的建筑有温度、有质感、有属于这座城市的具体记忆。\u201d槙是继1987年的丹下健三之后第二位获得该奖的日本建筑师。但与丹下不同的是，槙从未设计过任何一座政府建筑或国家级项目\u2014\u2014他的作品大多是私人委托，这一事实本身就是对战后日本建筑产业生态的有趣注脚：最受国际认可的日本建筑师之一，在国内却没有被委托任何一项国家工程。槙本人对此没有怨言。他在获奖演讲中说：\u201c建筑不需要宏大。在东京，最伟大的建筑可能是那些隐藏在狭窄街道中的小尺度的惊喜。\u201d',
            '2013年，槙文彦完成了纽约世界贸易中心4号楼（4 WTC）的设计。这是一座高297米（975英尺）的玻璃塔楼，位于世贸中心综合体的一角，由建筑师圣地亚哥·卡拉特拉瓦设计的PATH车站就在旁边。4 WTC的立面由一系列倾斜的玻璃面板构成，在天空的不同角度产生微妙的光影变化\u2014\u2014槙称之为\u201c光的细微差别\u201d（nuances of light）。这座建筑与周围其他世贸中心塔楼形成鲜明对比：它不追求高度纪录，不属于任何建筑风格，也没有可辨识的\u201c标志性\u201d轮廓。但在一个被悲剧与政治定义的地点上，槙的4 WTC提供了某种罕见的品质：尊严。',
            '2024年6月6日，槙文彦在东京去世，享年95岁。他的去世标志着新陈代谢一代最后一位重要人物的离去。但他的建筑并没有离去：代官山仍然在每个周末欢迎数百名居民和访客，螺旋大厦仍然是青山最具活力的文化中心之一，4 WTC的玻璃立面仍然在曼哈顿的天空中微妙地变化着。槙一直活到看到自己的建筑成为历史的一部分\u2014\u2014这对于建筑师来说，也许是最大的奢侈。',
          ],
          ja: [
            '1993年、槇文彦はプリツカー建築賞を受賞した。審査評はこう記す\u2014\u2014\u201c彼はミニマリズムの芸術家である。しかし沈黙へと向かうミニマリズムではない\u2014\u2014彼の建築には温度があり、質感があり、その都市に属する具体的な記憶がある。\u201d槇は1987年に丹下健三が受賞して以来、二人目の日本人受賞者である。しかし丹下と異なり、槇は一度も政府建築や国家的プロジェクトを設計したことがない\u2014\u2014彼の作品の多くは民間委託であり、この事実自体が戦後日本の建築産業生態に対する興味深い注釈である\u2014\u2014もっとも国際的に認知された日本人建築家のひとりが、国内ではいかなる国家事業も委託されなかった。槇本人はこれに不満を述べなかった。彼は受賞スピーチでこう語った\u2014\u2014\u201c建築は宏大である必要はない。東京において、もっとも偉大な建築はおそらく、狭い街路のなかに隠れた小さなスケールの驚きである。\u201d',
            '2013年、槇はニューヨーク・ワールドトレードセンター4号棟（4 WTC）の設計を完成させた。高さ297メートル（975フィート）のガラスタワーで、WTC複合施設の一角に位置し、サンティアゴ・カラトラバ設計のPATH駅が隣接する。4 WTCのファサードは一連の傾斜したガラスパネルで構成され、空のさまざまな角度で微妙な光の変化を生み出す\u2014\u2014槇はこれを\u201c光のニュアンス\u201d（nuances of light）と呼んだ。この建築は周囲の他のWTCタワーとは鮮やかな対照をなす\u2014\u2014高さ記録を追求せず、いかなる建築様式にも属さず、認識可能な\u201cアイコン的\u201d輪郭ももたない。しかし悲劇と政治によって定義された場所において、槇の4 WTCはある種の稀な品質を提供した\u2014\u2014尊厳である。',
            '2024年6月6日、槇文彦は東京で死去した。95歳。彼の死はメタボリズム世代の最後の重要人物の逝去を意味する。しかし彼の建築は去っていない\u2014\u2014代官山はいまなお週末ごとに数百人の住民と訪問者を迎え、スパイラルはいまなお青山でもっとも活気ある文化センターのひとつであり、4 WTCのガラスファサードはいまなおマンハッタンの空のなかで微妙に変化しつづけている。槇は自らの建築が歴史の一部となるのを見届けて生きた\u2014\u2014建築家にとって、これ以上ない贅沢かもしれない。',
          ],
          en: [
            'In 1993 Fumihiko Maki received the Pritzker Architecture Prize. The jury citation noted: "He is an artist of minimalism, but not a minimalism that tends toward silence \u2014 his architecture has warmth, texture, and concrete memories that belong to this city." Maki was the second Japanese architect to win the prize, after Kenz\u014d Tange in 1987. But unlike Tange, Maki never designed any government building or national project \u2014 his works are mostly private commissions, a fact that itself serves as an interesting footnote on postwar Japan\u2019s architectural industry ecology: one of the most internationally recognized Japanese architects was never entrusted with a single national project at home. Maki himself expressed no bitterness. In his acceptance speech he said: "Architecture does not need grandness. In Tokyo, the greatest architecture might be the small-scale surprises hidden in narrow streets."',
            'In 2013 Maki completed the design of 4 World Trade Center (4 WTC) in New York. Standing 297 meters (975 feet) tall, this glass tower occupies a corner of the WTC complex, adjacent to Santiago Calatrava\u2019s PATH station. 4 WTC\u2019s fa\u00e7ade is composed of a series of tilted glass panels that produce subtle variations of light at different angles of the sky \u2014 what Maki called "nuances of light." The building stands in sharp contrast to surrounding WTC towers: it pursues no height record, belongs to no architectural style, and has no recognizable "iconic" silhouette. Yet on a site defined by tragedy and politics, Maki\u2019s 4 WTC provides a certain rare quality: dignity.',
            'Fumihiko Maki died in Tokyo on June 6, 2024, at age 95. His passing marks the departure of the last major figure of the Metabolist generation. But his architecture has not departed: Hillside Terrace still welcomes hundreds of residents and visitors every weekend, Spiral remains one of Aoyama\u2019s most vibrant cultural centers, and the glass fa\u00e7ade of 4 WTC still shifts subtly in the Manhattan sky. Maki lived long enough to see his own buildings become part of history \u2014 for an architect, perhaps the greatest luxury.',
          ],
        },
      },
      {
        title: { zh: '教书与写作：一位建筑师的内心生活', ja: '教えることと書くこと：ひとりの建築家の内的生活', en: 'Teaching and writing: the inner life of an architect' },
        paragraphs: {
          zh: [
            '槙文彦可能是战后日本最重要的建筑教育者之一，但这一贡献常常被他的建筑实践所遮蔽。从1960年代起，槙先后在哈佛大学、东京大学和华盛顿大学任教。1987年他创立了自己的建筑事务所（Maki and Associates），但同时继续教学。对于槙，教学不是\u201c退休后的选择\u201d，而是建筑实践的一个平行维度。他在东京大学的研讨班成为了后来一代日本建筑师的思想摇篮。他出版的著作\u2014\u2014《记忆的形迹》（Nurturing Dreams）、《槙文彦建筑论》（Collected Essays）\u2014\u2014不是普通的作品集，而是关于建筑、城市和时间的哲学著作。槙使用文字的能力在建筑师中是稀有的：他的英文写作流畅、准确，不使用建筑术语的烟幕。',
            '槙对建筑教育的核心信念是：建筑不能只通过建筑来学习。他鼓励学生阅读文学、哲学和社会科学\u2014\u2014因为如果建筑师不理解建筑将要服务的世界，他们就无法设计有意义的建筑。他曾在一次讲座中说：\u201c当我设计一座博物馆时，我不是在设计一个容器。我是在设计一个光线与沉默的相遇点。而这个相遇点只有在理解了光线和沉默在人类生活中的含义之后，才能被设计出来。\u201d这种人文主义的方法使槙成为当今建筑界最受尊敬的思想家之一。他甚至影响了没有在他工作室工作过的建筑师：SANAA的妹岛和世曾表示槙的写作是她重要的灵感来源。',
            '槙的遗产超越了建筑本身。在一个越来越被社交媒体图像和15秒视频定义的文化中，槙的\u201c安静建筑学\u201d可能看起来不合时宜。但也许正因如此，它才更加珍贵。正如他在一次采访中所说：\u201c最快的建筑不一定是好的建筑。建筑需要时间\u2014\u2014不是建造的时间，而是被理解的时间。伟大的建筑可能需要一个世纪才会被真正理解。\u201d槙文彦用95年的生命证明了：建筑可以是快速世界中的一种慢速\u2014\u2014一种抵抗，也是一种礼物。',
          ],
          ja: [
            '槇文彦はおそらく戦後日本でもっとも重要な建築教育者のひとりだったが、この貢献はしばしば彼の建築実践によって覆い隠されている。1960年代から、槇はハーバード大学、東京大学、ワシントン大学で教鞭を執った。1987年に自身の建築事務所（Maki and Associates）を設立したが、同時に教育活動も継続した。槇にとって、教育は\u201c引退後の選択\u201dではなく、建築実践の並行次元だった。彼の東京大学のゼミは、後に一世代の日本人建築家の知的揺籃となった。彼の刊行した著作\u2014\u2014『記憶の形跡』（Nurturing Dreams）、『槇文彦建築論』（Collected Essays）\u2014\u2014は普通の作品集ではなく、建築、都市、時間についての哲学的著作である。槇の文章を扱う能力は建築家のなかでは稀である\u2014\u2014彼の英語は流暢かつ精確で、建築用語の煙幕に頼らない。',
            '槇の建築教育に対する核心的信念は\u2014\u2014建築は建築だけを通じて学ぶことはできない\u2014\u2014というものである。彼は学生に文学、哲学、社会科学を読むよう奨励した\u2014\u2014なぜなら、建築家が建築の奉仕すべき世界を理解しなければ、意味のある建築を設計できないからである。彼はある講義でこう語った\u2014\u2014\u201c私が美術館を設計するとき、私は容器を設計しているのではない。私は光と沈黙の出会いの場を設計している。そしてこの出会いの場は、光と沈黙が人間の生において意味するものを理解した後にしか設計できない。\u201dこの人文主義的アプローチこそが、槇を今日の建築界でもっとも尊敬される思想家のひとりにしている。彼は自分の事務所で働いたことのない建築家にも影響を与えた\u2014\u2014SANAAの妹島和世は槇の文章が重要なインスピレーション源であると述べたことがある。',
            '槇の遺産は建築そのものを超えている。ソーシャルメディアの画像と15秒の動画によってますます定義される文化のなかで、槇の\u201c静かな建築学\u201dは時代に合わないように見えるかもしれない。しかしおそらくだからこそ、それはより貴重である。彼があるインタビューで語ったように\u2014\u2014\u201cもっとも速い建築が良い建築とは限らない。建築には時間が必要だ\u2014\u2014建設の時間ではなく、理解される時間が。偉大な建築は、真に理解されるまでにおそらく一世紀を要する。\u201d槇文彦は95年の生命をもって証明した\u2014\u2014建築は速い世界のなかの遅さでありうる\u2014\u2014一つの抵抗であり、同時に一つの贈り物である。',
          ],
          en: [
            'Fumihiko Maki may have been one of postwar Japan\u2019s most important architectural educators, yet this contribution is often overshadowed by his practice. From the 1960s, Maki taught at Harvard, the University of Tokyo, and Washington University in St. Louis. In 1987 he founded his own firm (Maki and Associates) while continuing to teach. For Maki, teaching was not a "retirement option" but a parallel dimension of architectural practice. His seminar at the University of Tokyo became an intellectual cradle for a generation of Japanese architects. His published works \u2014 "Nurturing Dreams," "Collected Essays" \u2014 are not ordinary monographs but philosophical treatises on architecture, cities, and time. Maki\u2019s capacity to handle words is rare among architects: his English writing is fluent, precise, and never resorts to architectural-jargon smoke screens.',
            'Maki\u2019s core conviction about architectural education was this: architecture cannot be learned only through architecture. He encouraged students to read literature, philosophy, and social sciences \u2014 because if architects do not understand the world their buildings will serve, they cannot design meaningful architecture. He once said in a lecture: "When I design a museum, I am not designing a container. I am designing a meeting point of light and silence. And this meeting point can only be designed after understanding what light and silence mean in human life." This humanistic approach makes Maki one of the most respected thinkers in architecture today. He even influenced architects who never worked in his office: SANAA\u2019s Kazuyo Sejima once cited Maki\u2019s writings as an important source of inspiration.',
            'Maki\u2019s legacy extends beyond architecture itself. In a culture increasingly defined by social-media images and fifteen-second videos, Maki\u2019s "quiet architecture" may seem anachronistic. But perhaps that is precisely why it is more precious. As he once said in an interview: "The fastest architecture is not necessarily good architecture. Architecture needs time \u2014 not construction time, but time to be understood. Great architecture may take a century to be truly understood." Fumihiko Maki proved with ninety-five years of life: architecture can be a form of slowness in a fast world \u2014 a resistance, and simultaneously a gift.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: '4-world-trade-center', note: { zh: '世贸中心综合体中最安静的一座塔，倾斜玻璃面板在曼哈顿天空下持续变幻。', ja: 'WTC複合施設のなかでもっとも静かな塔。傾斜したガラスパネルがマンハッタンの空の下で絶えず変化する。', en: 'The quietest tower in the WTC complex, where tilted glass panels shift continuously beneath the Manhattan sky.' } },
      { slug: 'aga-khan-museum', note: { zh: '多伦多伊斯兰艺术殿堂，纯白几何体在水中反射，建筑本身就是光与寂静的精确计算。', ja: 'トロントのイスラム芸術殿堂。純白の幾何体が水面に反射し、建築それ自体が光と静寂の精確な計算である。', en: 'Toronto\u2019s temple of Islamic art \u2014 pure white geometries reflected in water, the building itself a precise calculation of light and silence.' } },
      { slug: 'reinhard-ernst-museum', note: { zh: '槙的绝笔之作，威斯巴登的抽象艺术博物馆，以极简的白色体块为抽象绘画提供沉思空间。', ja: '槇の絶筆。ヴィースバーデンの抽象芸術美術館。極限まで簡素化された白い塊が抽象絵画に沈思の空間を提供する。', en: "Maki\u2019s swan song \u2014 an abstract art museum in Wiesbaden whose minimalist white volumes provide contemplative spaces for abstract painting." } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: Fumihiko Maki', url: 'https://www.pritzkerprize.com/laureates/1993' },
      { title: 'Maki and Associates Official Site', url: 'https://www.maki-and-associates.co.jp/' },
      { title: 'Wikidata: Fumihiko Maki', url: 'https://www.wikidata.org/wiki/Q312270' },
    ],
  },

  'christian-de-portzamparc': {
    slug: 'christian-de-portzamparc',
    summary: {
      zh: '克里斯蒂安\u00b7德\u00b7波尔藏帕克（Christian de Portzamparc, 1944\u2013 ）是第一位获得普利兹克建筑奖的法国建筑师（1994年）。他的建筑以大胆的几何体量、对城市肌理的敏感介入和一种独特的\u201c开放性\u201d著称\u2014\u2014建筑不应该是封闭的雕塑，而应该是一种邀请。波尔藏帕克的语言是双重的：他对体积的操控（体块切割、旋转、穿透）同时具有雕塑感和都市性。他最重要的作品包括巴黎爱乐大厅（Philharmonie de Paris）、卢森堡爱乐音乐厅和里约热内卢的\u201c艺术之城\u201d（Cidade das Artes）。他同时也是一位重要的城市规划者，曾为巴黎左岸新区制定整体规划。对于波尔藏帕克，建筑的核心问题不是\u201c如何建造一栋房子\u201d，而是\u201c如何创造一种开放的生命环境\u201d。',
      ja: 'クリスチャン\u00b7ド\u00b7ポルザンパルク（Christian de Portzamparc, 1944\u2013 ）はプリツカー建築賞を受賞した最初のフランス人建築家である（1994年）。彼の建築は大胆な幾何学的ボリューム、都市のテクスチュアへの敏感な介入、そして独特の\u201c開放性\u201dで知られる\u2014\u2014建築は閉じた彫刻ではなく、招きであるべきだ。ポルザンパルクの言語は二重である\u2014\u2014彼のボリューム操作（塊の切断、回転、貫通）は同時に彫刻的でありかつ都市的である。彼の最も重要な作品には、パリ・フィルハーモニー（Philharmonie de Paris）、ルクセンブルク・フィルハーモニー、そしてリオデジャネイロの\u201c芸術の都市\u201d（Cidade das Artes）が含まれる。彼はまた重要な都市計画家でもあり、パリ左岸新区の全体計画を策定した。ポルザンパルクにとって、建築の中核的問題は\u201cいかに家を建てるか\u201dではなく\u201cいかに開かれた生の環境を創造するか\u201dである。',
      en: 'Christian de Portzamparc (1944\u2013 ) is the first French architect to receive the Pritzker Architecture Prize (1994). His architecture is known for bold geometric volumes, sensitive intervention into urban fabric, and a distinctive "openness" \u2014 buildings should not be closed sculptures but invitations. Portzamparc\u2019s language is dual: his manipulation of volumes (mass-cutting, rotation, penetration) is simultaneously sculptural and urban. His most important works include the Philharmonie de Paris, the Philharmonie Luxembourg, and the Cidade das Artes in Rio de Janeiro. He is also a significant urban planner, having formulated the master plan for the Paris Rive Gauche district. For Portzamparc, architecture\u2019s core question is not "how to build a house" but "how to create an open living environment."',
    },
    core_ideas: {
      zh: [
        '开放街区（\u00celot ouvert）\u2014\u2014传统的奥斯曼式封闭街区将城市生活囚禁在庭院中。波尔藏帕克的反提案是\u201c开放街区\u201d：建筑物不完全封闭街道，而是创造一系列局部开放的空间，让光线、空气和视线穿透街区',
        '建筑的听觉维度\u2014\u2014波尔藏帕克设计了多座音乐厅，但他认为\u201c听觉\u201d是所有建筑都应该考虑的维度。空间的声音反射、混响时间、背景噪音\u2014\u2014这些不是声学专家的专属领域，而是建筑的基本参数',
        '切割与穿透\u2014\u2014波尔藏帕克的建筑体积常常被\u201c切开\u201d和\u201c钻孔\u201d。这些开口不是装饰性空洞，而是功能性的：它们引入光线、连接不同的空间层级、将内部活动暴露给城市',
        '绘画作为设计方法\u2014\u2014波尔藏帕克是所有普利兹克奖得主中最强调绘画的建筑师。他坚持用手绘制建筑草图，认为线条与手的直接关系保留了思想与形式之间的原始联系',
      ],
      ja: [
        '開放街区（\u00eelot ouvert）\u2014\u2014伝統的なオスマン式閉鎖街区は都市生活を中庭に閉じ込める。ポルザンパルクの反提案は\u201c開放街区\u201dである\u2014\u2014建物が街路を完全に閉ざすのではなく、一連の部分的に開かれた空間を創造し、光、空気、視線が街区を貫通するのを許す',
        '建築の聴覚的次元\u2014\u2014ポルザンパルクは多数のコンサートホールを設計したが、彼は\u201c聴覚\u201dがすべての建築が考慮すべき次元であると考える。空間の音響反射、残響時間、背景騒音\u2014\u2014これらは音響専門家の専有領域ではなく、建築の基本的パラメータである',
        '切断と貫通\u2014\u2014ポルザンパルクの建築ボリュームはしばしば\u201c切開\u201dされ\u201c穿孔\u201dされる。これらの開口は装飾的空洞ではなく、機能的である\u2014\u2014光を取り入れ、異なる空間階層を接続し、内部活動を都市に露出させる',
        '設計方法としてのドローイング\u2014\u2014ポルザンパルクは全プリツカー賞受賞者のなかでもっともドローイングを重視する建築家である。彼は手で建築スケッチを描くことに固執し、線と手の直接的関係が思考と形式のあいだの原初的つながりを保持すると信じる',
      ],
      en: [
        'Open block (\u00eelot ouvert) \u2014 the traditional Haussmannian closed block imprisons urban life in courtyards. Portzamparc\u2019s counter-proposal is the "open block": buildings do not fully enclose streets but create a series of partially open spaces, allowing light, air, and sightlines to penetrate the block',
        'The aural dimension of architecture \u2014 Portzamparc has designed numerous concert halls, but he believes "hearing" is a dimension all architecture should consider. Spatial sound reflection, reverberation time, background noise \u2014 these are not the exclusive domain of acousticians but fundamental parameters of architecture',
        'Cutting and piercing \u2014 Portzamparc\u2019s architectural volumes are frequently "cut open" and "drilled through." These openings are not decorative voids but functional: they introduce light, connect different spatial levels, and expose internal activity to the city',
        'Drawing as design method \u2014 Portzamparc is among all Pritzker laureates the architect who most emphasizes drawing. He insists on hand-sketching architecture, believing that the direct relationship between line and hand preserves the primordial connection between thought and form',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Christian_de_Portzamparc.jpg/800px-Christian_de_Portzamparc.jpg',
      author: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Christian_de_Portzamparc.jpg',
      alt: { zh: '克里斯蒂安·德·波尔藏帕克肖像', ja: 'クリスチャン・ド・ポルザンパルクの肖像', en: 'Portrait of Christian de Portzamparc' },
    },
    sections: [
      {
        title: { zh: '从布列塔尼到巴黎左岸', ja: 'ブルターニュからパリ左岸へ', en: 'From Brittany to the Paris Rive Gauche' },
        paragraphs: {
          zh: [
            '克里斯蒂安\u00b7德\u00b7波尔藏帕克1944年出生于摩洛哥卡萨布兰卡（当时是法国保护国），童年在地中海与大西洋之间度过。他在法国雷恩长大，1962年前往巴黎进入国立高等美术学院（\u00c9cole des Beaux-Arts）学习建筑。但波尔藏帕克很快就对学院派的古典训练感到不满。1966年的学生抗议运动发生了\u2014\u2014这场运动不仅在政治上重塑了法国社会，也从根本上动摇了巴黎美术学院的教学体制。波尔藏帕克在这场运动中找到了自己的位置：他不赞成完全抛弃传统，但也拒绝将建筑简化为一种风格练习。他的毕业设计已经显示出了他后来职业生涯的核心主题\u2014\u2014一个包含画廊、剧场和公共广场的城市文化综合体，建筑体积在其中扮演的不是\u201c墙\u201d，而是\u201c节点\u201d的角色。',
            '波尔藏帕克职业生涯的第一个重要突破是巴黎13区高层公寓\u201cLes Hautes-Formes\u201d项目（1979年）。在1970年代的巴黎，高层住宅几乎完全等同于功能主义的混凝土塔楼\u2014\u2014单调、隔离、与街道彻底脱节。波尔藏帕克大胆地拒绝了这一模式。他用七座不同高度的塔楼替代了单一体块，用一条公共步行通道串联起几座建筑，在街道层创造了商店、幼儿园和公共设施。这个项目是\u201c开放街区\u201d理论的第一项实践，它对法国的社会住宅设计产生了深远影响。波尔藏帕克在此证明了：高密度不等于去人性化，高层不等于非城市。',
            '1980年代末至1990年代初，波尔藏帕克进入了国际视野。他的巴黎音乐城（Cit\u00e9 de la Musique, 1995年）是在拉维莱特公园（Parc de la Villette）的文化带中完成的\u2014\u2014这座建筑群包含了音乐厅、音乐学院和音乐博物馆。波尔藏帕克将不同的功能装进各具性格的建筑体中：一个波浪形穹顶覆盖着主音乐厅，一座金字塔形建筑容纳音乐学院，一个三角形的广场将它们串联。这种\u201c每部分有自己的身份，但整体是一个世界\u201d的逻辑，成为了波尔藏帕克日后所有大型文化项目的原型。同年（1994年），他在50岁时获得普利兹克建筑奖，是当时最年轻的获奖者之一。',
          ],
          ja: [
            'クリスチャン\u00b7ド\u00b7ポルザンパルクは1944年、モロッコのカサブランカ（当時フランス保護領）に生まれ、幼少期を地中海と大西洋のあいだで過ごした。フランスのレンヌで育ち、1962年にパリへ行き国立高等美術学院（\u00c9cole des Beaux-Arts）で建築を学んだ。しかしポルザンパルクはすぐに学院派の古典的訓練に不満を感じた。1966年の学生抗議運動が起こった\u2014\u2014この運動は政治的にフランス社会を再形成しただけでなく、パリ美術学院の教育体制を根本から揺るがした。ポルザンパルクはこの運動のなかで自らの位置を見出した\u2014\u2014彼は伝統の完全な放棄には賛成しなかったが、建築をスタイル演習に還元することも拒否した。彼の卒業設計はすでに彼の後のキャリアの中核テーマを示していた\u2014\u2014ギャラリー、劇場、公共広場を含む都市文化複合体で、建築ボリュームは\u201c壁\u201dではなく\u201cノード\u201dの役割を果たす。',
            'ポルザンパルクのキャリアにおける最初の重要な突破口はパリ13区の高層アパート「Les Hautes-Formes」プロジェクト（1979年）だった。1970年代のパリでは、高層住宅はほぼ完全に機能主義のコンクリートタワーと同一視されていた\u2014\u2014単調で、隔離され、街路と完全に断絶していた。ポルザンパルクは大胆にもこのモデルを拒否した。彼は単一の塊を7つの異なる高さのタワーに置き換え、一つの公共歩行者通路で複数の建物を連結し、街路レベルに商店、幼稚園、公共施設を設けた。このプロジェクトは\u201c開放街区\u201d理論の最初の実践であり、フランスの社会住宅設計に深い影響を与えた。ポルザンパルクはここで証明した\u2014\u2014高密度は非人間化と等しくなく、高層は非都市的ではない。',
            '1980年代末から1990年代初頭にかけて、ポルザンパルクは国際的視野に入った。彼のパリ音楽都市（Cit\u00e9 de la Musique, 1995年）はラ・ヴィレット公園（Parc de la Villette）の文化ベルトのなかで完成した\u2014\u2014この建築群はコンサートホール、音楽学院、音楽博物館を含む。ポルザンパルクは異なる機能をそれぞれの性格をもつ建築体に収めた\u2014\u2014波型ドームがメインホールを覆い、ピラミッド型の建物が音楽学院を収容し、三角形の広場がそれらを連結する。この\u201c各部分が独自のアイデンティティをもち、全体がひとつの世界である\u201dという論理は、ポルザンパルクのその後のすべての大規模文化プロジェクトの原型となった。同年（1994年）、彼は50歳でプリツカー建築賞を受賞し、当時もっとも若い受賞者のひとりとなった。',
          ],
          en: [
            'Christian de Portzamparc was born in 1944 in Casablanca, Morocco (then a French protectorate), spending his childhood between the Mediterranean and the Atlantic. He grew up in Rennes, France, and went to Paris in 1962 to study architecture at the \u00c9cole Nationale Sup\u00e9rieure des Beaux-Arts. But Portzamparc quickly grew dissatisfied with the academy\u2019s classical training. The 1966 student protest movement erupted \u2014 this movement not only politically reshaped French society but also fundamentally unsettled the Beaux-Arts pedagogical system. Portzamparc found his place within this movement: he did not support completely abandoning tradition, but he also refused to reduce architecture to a stylistic exercise. His graduation project already displayed the core themes of his later career \u2014 an urban cultural complex containing galleries, theaters, and public plazas, where architectural volumes played the role not of "walls" but of "nodes."',
            "Portzamparc\u2019s first major career breakthrough was the Les Hautes-Formes high-rise apartment project in Paris\u2019s 13th arrondissement (1979). In 1970s Paris, high-rise housing was almost entirely equated with functionalist concrete towers \u2014 monotonous, isolated, and completely disconnected from the street. Portzamparc boldly rejected this model. He replaced a single mass with seven towers of different heights, connected them with a public pedestrian passage, and placed shops, a kindergarten, and public facilities at street level. This project was the first implementation of the \"open block\" theory, and it profoundly influenced social housing design in France. Portzamparc proved here: high density does not equal dehumanization, and high-rise does not mean non-urban.",
            'The late 1980s through early 1990s brought Portzamparc into the international spotlight. His Cit\u00e9 de la Musique (1995) in Paris was completed within the cultural belt of Parc de la Villette \u2014 this complex contains a concert hall, music conservatory, and music museum. Portzamparc housed different functions in architecturally distinct volumes: a wave-shaped dome covers the main hall, a pyramidal building houses the conservatory, and a triangular plaza links them. This logic of "each part has its own identity, but the whole is a world" became the prototype for all Portzamparc\u2019s subsequent large-scale cultural projects. That same year (1994), he received the Pritzker Prize at age 50, one of the youngest laureates at the time.',
          ],
        },
      },
      {
        title: { zh: '音乐的建筑翻译', ja: '音楽の建築的翻訳', en: 'The architectural translation of music' },
        paragraphs: {
          zh: [
            '波尔藏帕克是当代建筑中与音乐关系最密切的建筑师之一。他设计过至少五座音乐厅：巴黎音乐城、卢森堡爱乐音乐厅（2005年）、里约热内卢\u201c艺术之城\u201d（包含音乐厅，2012年）、上音歌剧院（2019年）和巴黎爱乐大厅（Philharmonie de Paris, 2015年）。但波尔藏帕克的独特之处在于：他不将音乐厅视为\u201c好音质的容器\u201d，而是将音乐体验转化为空间形式。这是两种完全不同的问题意识。前者是声学工程，后者是空间诗学。',
            '以巴黎爱乐大厅为例。这座建筑的外壳由数千块铝合金板覆盖，这些板块的排列方式模仿了鸟翼的叠合\u2014\u2014波尔藏帕克称之为\u201c声波的可视化\u201d。内部主音乐厅的设计更加激进：观众席不是传统的\u201c乐池+楼座\u201d，而是一种\u201c葡萄园式\u201d布局\u2014\u2014听众座位环绕舞台，分层升起，创造了比传统鞋盒式音乐厅更加亲密的声学关系。波尔藏帕克在解释这一决定时说：\u201c在传统的音乐厅里，你只能看到指挥家的背影。在爱乐大厅里，你可以看到其他听众的脸\u2014\u2014音乐变成了一种集体仪式，而不是单向传播。\u201d这一设计在当时引起了争议：保守的声学专家质疑葡萄园式布局是否能提供足够好的音质。但开幕后的反响证明这些担忧是多余的\u2014\u2014巴黎爱乐大厅很快就被公认为21世纪最好的音乐厅之一。',
            '波尔藏帕克对音乐的关注也渗透到了非音乐建筑中。他常说：\u201c建筑应该像音乐一样被体验\u2014\u2014不是从一张固定的照片，而是通过穿过空间的时间性运动。\u201d这一思想在最明显的例证是里约热内卢的\u201c艺术之城\u201d（Cidade das Artes）。这座巨大的混凝土建筑悬挑在一片人工湖之上，包含音乐厅、剧院、画廊和花园。它的形态类似于一架被抬高的钢琴\u2014\u2014但波尔藏帕克强调，这只是一个偶然的联想。真正重要的是穿行其中的体验：你从地下停车场进入，上升穿过混凝土柱廊，来到悬挑的花园平台，然后进入被日光柔和照亮的音乐厅前厅\u2014\u2014整个过程就像一首交响曲的四个乐章。',
          ],
          ja: [
            'ポルザンパルクは現代建築のなかで音楽ともっとも密接な関係をもつ建築家のひとりである。彼は少なくとも5つのコンサートホールを設計している\u2014\u2014パリ音楽都市、ルクセンブルク・フィルハーモニー（2005年）、リオデジャネイロ\u201c芸術の都市\u201d（コンサートホールを含む、2012年）、上音歌劇院（2019年）、パリ・フィルハーモニー（Philharmonie de Paris, 2015年）。しかしポルザンパルクの独自性は\u2014\u2014彼がコンサートホールを\u201c良質な音響の容器\u201dと見なさず、音楽体験を空間的フォルムに翻訳すること\u2014\u2014にある。これらはまったく異なる二つの問題意識である。前者は音響工学であり、後者は空間の詩学である。',
            'パリ・フィルハーモニーを例にとろう。この建築の外殻は数千枚のアルミ合金板で覆われており、それらのプレートの配列は鳥の翼の重なりを模している\u2014\u2014ポルザンパルクはこれを\u201c音波の可視化\u201dと呼ぶ。内部のメインホールの設計はさらにラディカルである\u2014\u2014客席は伝統的な\u201cオーケストラピット＋バルコニー\u201dではなく、\u201cヴィンヤード式\u201d（ブドウ畑式）レイアウトを採用し\u2014\u2014聴衆席がステージを取り囲み、階層的にせり上がることで、伝統的なシューボックス型ホールよりも親密な音響関係を創り出す。ポルザンパルクはこの決断を説明してこう語った\u2014\u2014\u201c伝統的なコンサートホールでは、指揮者の背中しか見えない。フィルハーモニーでは、他の聴衆の顔が見える\u2014\u2014音楽は一方向的伝達ではなく、集団的儀式となる。\u201dこの設計は当時論争を呼んだ\u2014\u2014保守的な音響専門家たちはヴィンヤード式レイアウトが十分に良質な音響を提供できるか疑問視した。しかし開幕後の反響はこれらの懸念が杞憂だったことを証明した\u2014\u2014パリ・フィルハーモニーはすぐに21世紀最高のコンサートホールのひとつと認められた。',
            'ポルザンパルクの音楽への関心は非音楽建築にも浸透している。彼はよく言う\u2014\u2014\u201c建築は音楽のように体験されるべきだ\u2014\u2014一枚の固定された写真からではなく、空間を横切る時間的運動を通じて。\u201dこの思想のもっとも明らかな例証はリオデジャネイロの\u201c芸術の都市\u201d（Cidade das Artes）である。この巨大なコンクリート建築は人工湖の上に片持ちで張り出し、コンサートホール、劇場、ギャラリー、庭園を含む。その形態は持ち上げられたピアノに似ている\u2014\u2014しかしポルザンパルクはこれが単なる偶然の連想であることを強調する。本当に重要なのは内部を通過する体験である\u2014\u2014地下駐車場から入り、コンクリート柱廊を上昇し、片持ちの庭園テラスに出て、日光にやわらかく照らされたコンサートホール前室に入る\u2014\u2014その全過程はひとつの交響曲の四楽章のようだ。',
          ],
          en: [
            'Portzamparc is among the architects most closely associated with music in contemporary architecture. He has designed at least five concert halls: the Cit\u00e9 de la Musique in Paris, the Philharmonie Luxembourg (2005), the Cidade das Artes in Rio de Janeiro (including a concert hall, 2012), the Shangyin Opera House (2019), and the Philharmonie de Paris (2015). But what distinguishes Portzamparc is this: he does not view concert halls as "containers for good acoustics" but translates the musical experience into spatial form. These are two entirely different problematics. The former is acoustic engineering; the latter is spatial poetics.',
            "Take the Philharmonie de Paris as an example. The building\u2019s shell is covered with thousands of aluminum-alloy panels, arranged in a pattern mimicking the overlapping of bird wings \u2014 what Portzamparc calls \"the visualization of sound waves.\" The internal main hall\u2019s design is even more radical: the seating is not a traditional \"orchestra pit plus balconies\" but a \"vineyard-style\" layout \u2014 audience seats surround the stage in tiered risers, creating a more intimate acoustic relationship than in traditional shoebox-shaped halls. Portzamparc explained this decision: \"In a traditional concert hall, you only see the conductor\u2019s back. At the Philharmonie, you see the faces of other listeners \u2014 music becomes a collective ritual, not one-directional transmission.\" This design was controversial at the time: conservative acousticians questioned whether a vineyard layout could deliver sufficiently good sound quality. But the post-opening reception proved those worries unfounded \u2014 the Philharmonie de Paris was quickly recognized as one of the finest concert halls of the 21st century.",
            "Portzamparc\u2019s engagement with music also permeates non-musical buildings. He often says: \"Architecture should be experienced like music \u2014 not from a fixed photograph but through the temporal movement of passing through space.\" The most evident illustration of this idea is the Cidade das Artes in Rio de Janeiro. This enormous concrete structure cantilevers over an artificial lake, containing a concert hall, theater, galleries, and gardens. Its form resembles a lifted piano \u2014 but Portzamparc insists this is merely accidental association. What truly matters is the experiential passage through it: you enter from underground parking, ascend through a concrete colonnade, emerge onto the cantilevered garden terrace, then enter the concert hall foyer softly illuminated by daylight \u2014 the entire sequence resembles the four movements of a symphony.",
          ],
        },
      },
      {
        title: { zh: '城市主义作为建筑的自然延伸', ja: '建築の自然な延長としての都市主義', en: 'Urbanism as architecture\u2019s natural extension' },
        paragraphs: {
          zh: [
            '波尔藏帕克是普利兹克奖得主中少有的同时在建筑和城市规划两个尺度上都有重要贡献的人物。1994年普利兹克奖评审中，评审团特别认可了他的城市规划工作\u2014\u2014这在该奖的历史上极为罕见。波尔藏帕克的都市主义源于一个简单的观察：如果你只设计建筑，你实际上什么也没有控制。城市的品质不来自个体建筑的品质，而来自建筑之间的关系\u2014\u2014街道的宽窄、转角的发生方式、公共空间的序列。他的巴黎左岸新区（Paris Rive Gauche）总体规划就是这一思想的实践。',
            '巴黎左岸新区是巴黎自19世纪奥斯曼改造以来最大的城市规划项目之一。这一区域位于塞纳河左岸的奥斯特里茨（Austerlitz）车站以南，原本是废弃的铁路堆场和工业用地。波尔藏帕克的任务是将这片约130公顷的土地转化为一个混合使用的城市社区。他拒绝了两种极端的方案：一是复制奥斯曼式的封闭街区（他认为这已经不适应当代生活方式），二是采用现代主义的高塔在绿地中的模式（他认为这对城市街道生活的破坏性太大）。他提出的\u201c开放街区\u201d方案是一种\u201c第三条路\u201d：建筑物不完全封闭每条街道，但也不完全独立\u2014\u2014它们在三维空间中相互穿插、退让和回应，创造了比传统欧洲街区更丰富的空间层次。这个项目的部分区域至今仍在建设中，但已经成为了当代欧洲最受关注的都市实验室之一。',
            '波尔藏帕克的城市规划方法与他的建筑设计共享同一个核心信念：空间应该是开放的、可阅读的、包容不同活动的。他反对任何一种单一用途的城市分区（zoning）。在他的方案中，办公楼、住宅、学校、商店和文化设施被编织在一起\u2014\u2014不是为了制造混乱，而是为了确保城市在每一天的每一个时段都保持活跃。他说：\u201c最糟糕的城市是那些白天被办公室填满而夜晚空无一人的城市，或者相反。城市需要一种持续的呼吸。\u201d这种对时间维度的敏感\u2014\u2014不仅考虑静态的空间质量，也考虑动态的时间节奏\u2014\u2014使波尔藏帕克的都市主义超越了传统规划工程师的技术思维。',
          ],
          ja: [
            'ポルザンパルクはプリツカー賞受賞者のなかで稀な、建築と都市計画の両方のスケールで重要な貢献をした人物である。1994年のプリツカー賞審査では、審査団が特に彼の都市計画の仕事を評価した\u2014\u2014これは同賞の歴史においてきわめて稀なことである。ポルザンパルクの都市主義は単純な観察に由来する\u2014\u2014建築だけを設計していては、実は何もコントロールしていない。都市の品質は個別の建築の品質ではなく、建築同士の関係\u2014\u2014街路の幅、角のできかた、公共空間のシークエンス\u2014\u2014から生まれる。彼のパリ左岸新区（Paris Rive Gauche）全体計画はこの思想の実践である。',
            'パリ左岸新区は、パリでは19世紀のオスマン改造以来最大の都市計画プロジェクトのひとつである。この地区はセーヌ左岸のオステルリッツ（Austerlitz）駅の南に位置し、もともとは廃線の操車場と工業用地だった。ポルザンパルクの任務は約130ヘクタールの土地を混合利用の都市コミュニティに転換することだった。彼は二つの極端な案を拒否した\u2014\u2014ひとつはオスマン式の閉鎖街区の複製（これがすでに現代のライフスタイルに適合しないと考えた）、もうひとつはモダニズムの「緑地の中の高層タワー」モデル（これが都市の街路生活に破壊的すぎると考えた）である。彼の提案した\u201c開放街区\u201d案は\u201c第三の道\u201dである\u2014\u2014建物は各街路を完全に閉ざさず、しかし完全に独立もせず\u2014\u2014それらが三次元空間のなかで相互に貫入し、譲り合い、応答し、伝統的ヨーロッパ街区よりも豊かな空間的階層を創造する。このプロジェクトの一部は現在も建設中だが、すでに現代ヨーロッパでもっとも注目される都市実験場のひとつとなっている。',
            'ポルザンパルクの都市計画方法は彼の建築設計と同一の核心信念を共有する\u2014\u2014空間は開かれ、読み取り可能で、異なる活動を包摂すべきである。彼はあらゆる種類の単一用途の都市ゾーニングに反対する。彼の案では、オフィス、住宅、学校、商店、文化施設が織り合わされる\u2014\u2014混乱をつくるためではなく、都市が毎日のあらゆる時間帯において活発でありつづけることを保証するためである。彼は言う\u2014\u2014\u201c最悪の都市とは、昼間はオフィスで埋め尽くされ夜には誰もいなくなる都市、あるいはその逆\u2014\u2014である。都市には持続的な呼吸が必要だ。\u201dこの時間次元への敏感さ\u2014\u2014静的な空間の品質だけでなく、動的な時間のリズムも考慮すること\u2014\u2014が、ポルザンパルクの都市主義を伝統的な計画エンジニアの技術的思考を超えさせている。',
          ],
          en: [
            'Portzamparc is rare among Pritzker laureates in having made significant contributions at both the architectural and urban-planning scales. In the 1994 Pritzker jury deliberations, the jury specifically recognized his urban-planning work \u2014 an exceptional occurrence in the prize\u2019s history. Portzamparc\u2019s urbanism originates from a simple observation: if you only design buildings, you actually control nothing. Urban quality does not arise from individual buildings\u2019 quality but from the relationships between them \u2014 street widths, how corners occur, the sequence of public spaces. His master plan for the Paris Rive Gauche district is the practice of this idea.',
            "The Paris Rive Gauche district is one of the largest urban-planning projects in Paris since Haussmann\u2019s 19th-century transformation. Located south of the Gare d\u2019Austerlitz on the Left Bank, the area was originally disused railway yards and industrial land. Portzamparc\u2019s task was to transform roughly 130 hectares into a mixed-use urban neighborhood. He rejected two extreme approaches: first, replicating Haussmannian closed blocks (which he considered ill-suited to contemporary lifestyles); second, adopting the modernist model of towers in a park (which he deemed too destructive to urban street life). His proposed \"open block\" scheme is a \"third way\": buildings do not fully enclose every street but are also not fully independent \u2014 they interpenetrate, yield, and respond to one another in three dimensions, creating richer spatial hierarchies than traditional European blocks. Parts of this project are still under construction, but it has already become one of the most closely watched urban laboratories in contemporary Europe.",
            "Portzamparc\u2019s urban-planning approach shares the same core conviction as his architectural design: space should be open, legible, and inclusive of diverse activities. He opposes any kind of single-use zoning. In his schemes, offices, residences, schools, shops, and cultural facilities are woven together \u2014 not to create chaos but to ensure the city remains active at every hour of every day. He says: \"The worst cities are those filled with offices by day and empty at night, or the reverse. A city needs continuous respiration.\" This sensitivity to the time dimension \u2014 considering not only static spatial quality but also dynamic temporal rhythm \u2014 elevates Portzamparc\u2019s urbanism beyond the technical mindset of traditional planning engineers.",
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'philharmonie-de-paris', note: { zh: '数千块铝合金板拼合的未来主义鸟翼外壳，内部葡萄园式坐席将音乐变为集体仪式。', ja: '数千枚のアルミ合金板で構成された未来的な鳥の翼の外殻。内部のヴィンヤード式客席が音楽を集団的儀式に変える。', en: 'A futuristic bird-wing shell assembled from thousands of aluminum-alloy panels, with vineyard seating turning music into collective ritual.' } },
      { slug: 'one57', note: { zh: '纽约亿万富翁街的地标住宅塔楼，垂直褶皱在曼哈顿天际线上捕捉天空的光线。', ja: 'ニューヨーク・ビリオネアズ・ロウのランドマーク住宅タワー。垂直のひだがマンハッタンのスカイラインに空の光を捉える。', en: 'A landmark residential tower on Billionaires\u2019 Row, where vertical folds capture the sky\u2019s light against the Manhattan skyline.' } },
      { slug: 'cidade-das-artes-bibi-ferreira', note: { zh: '巨大混凝土板悬挑于湖面之上，穿行其中的空间序列如交响曲四个乐章。', ja: '巨大なコンクリート版が湖面の上に片持ちで張り出す。内部を通過する空間シークエンスは交響曲の四楽章のようだ。', en: 'Enormous concrete slabs cantilevering over a lake, where the spatial sequence of passing through resembles the four movements of a symphony.' } },
    ],
    sources: [
      { title: 'The Pritzker Architecture Prize: Christian de Portzamparc', url: 'https://www.pritzkerprize.com/laureates/1994' },
      { title: '2Portzamparc Official Site', url: 'https://www.2portzamparc.com/' },
      { title: 'Wikidata: Christian de Portzamparc', url: 'https://www.wikidata.org/wiki/Q557277' },
    ],
  },

  'steven-holl': {
    slug: 'steven-holl',
    summary: {
      zh: '斯蒂文\u00b7霍尔（Steven Holl, 1947\u2013 ）是美国当代最富诗人气质的建筑师。他的建筑以水彩草图设计方法、对光线的现象学关注以及将建筑与场所的独特\u201c锚固\u201d著称。霍尔的建筑语言不是一种风格标签\u2014\u2014每一个项目都从现场的特殊条件中生长出来：光线角度、主导风向、地下水脉、历史地层。他最著名的作品包括赫尔辛基奇亚斯玛当代艺术博物馆（Kiasma）、北京当代MOMA（Linked Hybrid）和深圳万科中心（Horizontal Skyscraper）。2012年获得美国建筑师协会金奖。霍尔的建筑哲学深受哲学家梅洛-庞蒂（Merleau-Ponty）现象学的影响：建筑不是看的东西，而是被身体穿过、被皮肤感知的东西。',
      ja: 'スティーヴン・ホール（Steven Holl, 1947\u2013 ）は現代アメリカでもっとも詩人的気質をもつ建築家である。彼の建築は水彩スケッチによる設計方法、光への現象学的関心、建築と場所の独特の\u201c錨づけ\u201dで知られる。ホールの建築言語はスタイルのラベルではない\u2014\u2014各プロジェクトは敷地の特殊条件から成長する\u2014\u2014光の角度、卓越風向、地下水脈、歴史的地層。彼の最も有名な作品には、ヘルシンキ現代美術館キアズマ（Kiasma）、北京当代MOMA（Linked Hybrid）、深圳万科中心（Horizontal Skyscraper）が含まれる。2012年にAIAゴールドメダル受賞。ホールの建築哲学は哲学者メルロ゠ポンティ（Merleau-Ponty）の現象学の深い影響を受ける\u2014\u2014建築は見るものではなく、身体が横切り、皮膚が知覚するものである。',
      en: 'Steven Holl (1947\u2013 ) is contemporary America\u2019s most poetically inclined architect. His architecture is known for watercolor-sketch design methodology, phenomenological attention to light, and a distinctive "anchoring" of building to site. Holl\u2019s architectural language is not a stylistic label \u2014 each project grows from the specific conditions of the site: light angles, prevailing winds, underground water veins, historical strata. His best-known works include Kiasma Museum of Contemporary Art in Helsinki, Linked Hybrid in Beijing, and the Horizontal Skyscraper (Vanke Center) in Shenzhen. He received the AIA Gold Medal in 2012. Holl\u2019s architectural philosophy is deeply influenced by the phenomenology of philosopher Maurice Merleau-Ponty: architecture is not something seen but something traversed by the body, perceived by the skin.',
    },
    core_ideas: {
      zh: [
        '现象学建筑\u2014\u2014建筑的本质体验不来自形式符号或图片，而来自身体在空间中移动时的触觉、嗅觉、听觉和视觉的综合。光不是照亮建筑的工具，光就是建筑的一种材料',
        '锚固（Anchoring）\u2014\u2014每一座建筑都应该与它的场所建立一种独特的关系，这种关系不应该是通用的（比如\u201c融入自然\u201d这种陈词），而应该是具体的、不可复制到其他场地的',
        '水彩作为思考工具\u2014\u2014霍尔几乎每天早晨画水彩草图。他强调：这种技术不是表现工具，而是思考工具。水的流动性和不可控性迫使大脑放弃对形式的控制，允许意外发生',
        '多孔性与开放城市\u2014\u2014在城市尺度上，建筑不应该是封闭的街区。公共空间应该穿越建筑底层，让建筑像海绵一样吸收城市的流动',
      ],
      ja: [
        '現象学的建築\u2014\u2014建築の本質的体験は形式シンボルや写真からではなく、身体が空間のなかを移動するときの触覚、嗅覚、聴覚、視覚の綜合から来る。光は建築を照らす道具ではなく、光そのものが建築のひとつの素材である',
        '錨づけ（Anchoring）\u2014\u2014すべての建築はその場所と独自の関係を築くべきである。この関係は汎用的であってはならず（たとえば\u201c自然に溶け込む\u201dというような決まり文句）、具体的で、他の敷地には複製不可能でなければならない',
        '思考ツールとしての水彩\u2014\u2014ホールはほとんど毎朝水彩スケッチを描く。彼は強調する\u2014\u2014この技術は表現ツールではなく思考ツールである。水の流動性と不可制御性が、脳に形式のコントロールを放棄させ、偶発を許容する',
        '多孔性と開かれた都市\u2014\u2014都市スケールでは、建築は閉じた街区であってはならない。公共空間は建築の低層部を横断し、建築がスポンジのように都市の流れを吸収するべきである',
      ],
      en: [
        'Phenomenological architecture \u2014 the essential experience of architecture comes not from formal symbols or photographs but from the synthesis of touch, smell, hearing, and sight as the body moves through space. Light is not a tool to illuminate architecture; light is itself a material of architecture',
        'Anchoring \u2014 every building should establish a unique relationship with its site. This relationship must not be generic (e.g., the clich\u00e9 of "blending with nature") but concrete, impossible to replicate on another site',
        'Watercolor as thinking tool \u2014 Holl paints watercolor sketches almost every morning. He emphasizes: this technique is not a representation tool but a thinking tool. The fluidity and uncontrollability of water forces the brain to relinquish control over form, allowing accidents to happen',
        'Porosity and open city \u2014 at the urban scale, architecture should not be closed blocks. Public space should traverse building ground floors, allowing buildings to absorb the city\u2019s flows like sponges',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Steven_Holl.jpg/800px-Steven_Holl.jpg',
      author: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Steven_Holl.jpg',
      alt: { zh: '斯蒂文·霍尔肖像', ja: 'スティーヴン・ホールの肖像', en: 'Portrait of Steven Holl' },
    },
    sections: [
      {
        title: { zh: '从西雅图到赫尔辛基：光之路', ja: 'シアトルからヘルシンキへ：光の道', en: 'From Seattle to Helsinki: the path of light' },
        paragraphs: {
          zh: [
            '斯蒂文·霍尔1947年出生于华盛顿州布雷默顿，一个毗邻普吉特湾的造船小镇。他日后对水、雾、灰色天空的痴迷也许可以追溯到这段西北太平洋的童年。1970年他从华盛顿大学建筑系毕业，随后前往罗马和伦敦深造。1976年在纽约成立自己的事务所。但与同时代的弗兰克·盖里或雷姆·库哈斯不同，霍尔在名气上上升得相对缓慢\u2014\u2014他在1990年代之前几乎没有大型建成作品。这给了霍尔一个他日后反复强调的珍贵礼物：时间去思考。在那二十年里，他绘制了数千张水彩草图，写了几本书（包括《锚固》和《现象学问题》），并发展出了一套独特的建筑哲学\u2014\u2014这套哲学在1990年代之前几乎没有被建筑界认真对待，但在之后的三十年里成为了最有影响力的当代建筑思想之一。',
            '1998年，51岁的霍尔完成了赫尔辛基奇亚斯玛当代艺术博物馆（Kiasma）。这是他的第一个重大国际委托，也是一举将他推向世界舞台的项目。博物馆的名字Kiasma来自希腊语chiasma，意为\u201c交叉\u201d\u2014\u2014指的是视神经在大脑中交叉的生物结构。霍尔将建筑本身设想为一种\u201c交错\u201d：建筑的主体是一条弯曲的\u201c身体\u201d，而光线从不同的方向\u201c交织\u201d进来。最惊人的是建筑内部的光线处理\u2014\u2014芬兰的冬季几乎永夜，夏季几乎永昼。霍尔利用弯曲的屋顶和精心定位的天窗，让自然光以几乎不可能的角度进入画廊，在墙壁上投下不断变化的阴影。Kiasma不是一座\u201c白盒子\u201d博物馆。它的空间本身就是一件不断变化的光的艺术品。',
            '2000年代之后，霍尔进入了高产期，项目遍布全球。北京当代MOMA（Linked Hybrid, 2009年）是他的城市主义思想的代表作\u2014\u2014一组八座塔楼通过空中的环形天桥相连，底层完全向公众开放，包含了商店、咖啡馆、电影院和幼儿园。深圳万科中心（Horizontal Skyscraper, 2009年）将\u201c摩天楼\u201d重新定义为水平的\u2014\u2014一座包含办公、酒店和住宅的综合体像一座\u201c浮动的山丘\u201d悬挑在一个人造热带景观之上。这些项目不是仅靠形式创新，而是靠一种根深蒂固的信念：建筑有责任让城市变得更宜居、更可渗透、更公共。',
          ],
          ja: [
            'スティーヴン・ホールは1947年、ワシントン州ブレマートン\u2014\u2014ピュージェット湾に隣接する造船の町\u2014\u2014に生まれた。彼の後に水、霧、灰色の空への執着は、おそらくこの北西太平洋の幼少期に遡ることができる。1970年にワシントン大学建築学科を卒業し、その後ローマとロンドンで研鑽を積んだ。1976年にニューヨークで自身の事務所を設立。しかし同時代のフランク・ゲーリーやレム・コールハースとは異なり、ホールは名声の上昇が比較的緩やかだった\u2014\u20141990年代以前には大型の実現作品がほとんどなかった。これがホールに、彼が後に繰り返し強調する貴重な贈り物を与えた\u2014\u2014考える時間である。その二十年間、彼は数千枚の水彩スケッチを描き、数冊の本（『錨づけ』『現象学の問題』を含む）を書き、独自の建築哲学の体系を発展させた\u2014\u2014この哲学は1990年代以前には建築界からほとんど真剣に受け取られなかったが、その後の三十年間でもっとも影響力のある現代建築思想のひとつとなった。',
            '1998年、51歳のホールはヘルシンキ現代美術館キアズマ（Kiasma）を完成させた。これは彼の最初の主要な国際的委託であり、彼を一挙に世界舞台へと押し上げたプロジェクトである。美術館の名Kiasmaはギリシア語のchiasmaに由来し\u2014\u2014視神経が脳内で交差する生物学的構造を指す。ホールは建築そのものを一種の\u201c交錯\u201dとして構想した\u2014\u2014建築の本体は湾曲する「身体」であり、光が異なる方向から「織り合わされる」。もっとも驚異的なのは建築内部の光の処理である\u2014\u2014フィンランドの冬はほとんど永夜、夏はほとんど永昼である。ホールは湾曲した屋根と精緻に配置されたトップライトを用いて、自然光をほとんど不可能な角度からギャラリーに入れ、壁の上に絶えず変化する影を投げかける。キアズマは\u201cホワイトボックス\u201dの美術館ではない。その空間それ自体が、絶えず変化する光の芸術作品である。',
            '2000年代以降、ホールは高生産期に入り、プロジェクトは世界中に広がった。北京当代MOMA（Linked Hybrid, 2009年）は彼の都市主義思想の代表作である\u2014\u20148つのタワーが空中の環状歩道橋で結ばれ、低層部は完全に公衆に開放され、商店、カフェ、映画館、幼稚園を含む。深圳万科中心（Horizontal Skyscraper, 2009年）は\u201c超高層\u201dを水平的に再定義した\u2014\u2014オフィス、ホテル、住宅を含む複合体が、人工の熱帯景観の上に「浮遊する丘」のように片持ちで張り出す。これらのプロジェクトは形式の革新のみに頼るのではなく、根深い信念に依拠している\u2014\u2014建築には都市をより住みやすく、より透過的に、より公共的にする責任がある。',
          ],
          en: [
            'Steven Holl was born in 1947 in Bremerton, Washington, a shipbuilding town abutting Puget Sound. His later obsession with water, fog, and gray skies can perhaps be traced to this Pacific Northwest childhood. He graduated from the University of Washington\u2019s architecture program in 1970, then pursued further study in Rome and London. In 1976 he founded his own office in New York. But unlike contemporaries Frank Gehry or Rem Koolhaas, Holl\u2019s rise to fame was relatively slow \u2014 he had few large built works before the 1990s. This gave Holl a precious gift he would later repeatedly emphasize: time to think. During those two decades, he painted thousands of watercolor sketches, wrote several books (including "Anchoring" and "Questions of Phenomenology"), and developed a distinctive architectural philosophy \u2014 a philosophy barely taken seriously by the architectural world before the 1990s but which became one of the most influential contemporary architectural ideas in the following three decades.',
            'In 1998, at age 51, Holl completed Kiasma, the Museum of Contemporary Art in Helsinki. This was his first major international commission and the project that thrust him onto the world stage. The name Kiasma derives from the Greek chiasma \u2014 the biological structure where optic nerves cross in the brain. Holl conceived the building itself as a kind of "chiasma": the body of the building is a curving "body," while light "interweaves" from different directions. Most astonishing is the treatment of light within the building \u2014 Finland\u2019s winters are nearly perpetual night, summers nearly perpetual day. Holl uses curved roofs and precisely positioned skylights to bring natural light into galleries at nearly impossible angles, casting ever-shifting shadows across walls. Kiasma is not a "white box" museum. Its space is itself an ever-changing artwork of light.',
            "After the 2000s, Holl entered a highly productive period, with projects spanning the globe. Beijing\u2019s Linked Hybrid (2009) is a signature work of his urbanistic thought \u2014 eight towers connected by aerial ring-shaped skybridges, with ground floors entirely open to the public, containing shops, caf\u00e9s, a cinema, and a kindergarten. Shenzhen\u2019s Horizontal Skyscraper (Vanke Center, 2009) redefines \"skyscraper\" as horizontal \u2014 a mixed-use complex containing offices, hotel, and residences cantilevering like a \"floating hill\" over a man-made tropical landscape. These projects rely not merely on formal innovation but on a deep-rooted conviction: architecture has a responsibility to make cities more livable, more permeable, more public.",
          ],
        },
      },
      {
        title: { zh: '现象学与建筑写作', ja: '現象学と建築のライティング', en: 'Phenomenology and architectural writing' },
        paragraphs: {
          zh: [
            '霍尔是当代建筑师中罕见的严肃写作者。他至今出版了超过20本书，其中《锚固》（Anchoring, 1989）、《视差》（Parallax, 2000）和《光之问》（Questions of Perception, 1994, 与Pallasmaa和P\u00e9rez-G\u00f3mez合著）是现象学建筑理论的核心文本。《锚固》中提出了一个极具影响力的概念：建筑不应该被视为一个自主的艺术品，而应该被理解为一种实验装置\u2014\u2014将场所中已有的潜在能量（光、风、水、地质）转化为可感知的空间体验。这与20世纪大部分建筑理论（从现代主义的功能主义到后现代的历史符号学）都形成了根本性的断裂。',
            '与Pallasmaa和P\u00e9rez-G\u00f3mez合著的《光之问》是1990年代建筑理论的一个转折点。这部简短的书在建筑学院中引发了广泛的讨论。它的核心论点是：现代主义的建筑过于依赖视觉（\u201c眼球的霸权\u201d），而忽略了其他感官\u2014\u2014触觉、嗅觉、听觉、对温度的感知。建筑应该是一种\u201c多感官的体验\u201d，而不仅仅是一幅视觉图像。霍尔在这一论点的基础上发展了自己的建筑语言：他设计的空间总是包含多种材料\u2014\u2014光洁的混凝土与粗糙的木材、冷金属与温暖的地灯\u2014\u2014创造出一种\u201c触觉对位\u201d。',
            '霍尔的写作与他的水彩画互为表里。文字提供概念框架，水彩提供直觉跳跃。他曾在一次演讲中展示一张水彩草图，画面上只有几笔灰色的涂抹和一个红色的小点。他解释说：\u201c这张画花了我两分钟。如果我用计算机制图，我需要两天才能表达同一个想法。但两分钟后，我已经知道这个建筑应该是什么了。计算机是完美的仆人，但也是暴君。它让你以为你在做决定，但实际上它在替你决定。\u201d这段话揭示了霍尔设计方法中最激进的维度：他试图保持思考过程中的不确定性和开放性，而把精确性留给后续的技术深化阶段。',
          ],
          ja: [
            'ホールは現代建築家のなかで稀有な真剣な書き手である。彼はこれまでに20冊以上の本を出版しており、そのなかで『錨づけ』（Anchoring, 1989）、『視差』（Parallax, 2000）、『知覚の問題』（Questions of Perception, 1994, パッラスマー、ペレス゠ゴメスとの共著）は現象学的建築理論の中核テクストである。『錨づけ』のなかで彼は極めて影響力のある概念を提起した\u2014\u2014建築は自律的な芸術品として見なされるべきではなく、一種の実験装置として理解されるべきである\u2014\u2014場所のなかにすでに存在する潜在的なエネルギー（光、風、水、地質）を、知覚可能な空間体験へと変換するものとして。これは20世紀の建築理論の大部分（モダニズムの機能主義からポストモダンの歴史的記号論まで）と根本的な断絶をなす。',
            'パッラスマーおよびペレス゠ゴメスとの共著『知覚の問題』は1990年代の建築理論の転換点だった。この短い本は建築学校で広範な議論を引き起こした。その核心的主張は\u2014\u2014モダニズム建築は視覚に過度に依存しており（\u201c眼球の覇権\u201d）、その他の感覚\u2014\u2014触覚、嗅覚、聴覚、温度の知覚\u2014\u2014を無視してきたというものである。建築は\u201c多感覚的体験\u201dであるべきで、単なる視覚イメージではない。ホールはこの主張の基盤の上に自身の建築言語を発展させた\u2014\u2014彼の設計する空間は常に多様な素材\u2014\u2014滑らかなコンクリートと粗い木材、冷たい金属と温かい間接照明\u2014\u2014を含み\u2014\u2014一種の\u201c触覚的対位法\u201dを創造する。',
            'ホールのライティングと彼の水彩画は表裏一体である。文字は概念的枠組みを提供し、水彩は直観的跳躍を提供する。彼はある講演で一枚の水彩スケッチを見せたことがある\u2014\u2014画面上には数本の灰色の筆致とひとつの赤い小さな点だけがあった。彼は説明した\u2014\u2014\u201cこの絵を描くのに2分かかった。コンピューター製図を使ったら、同じ考えを表現するのに2日かかるだろう。しかし2分後には、この建築がどうあるべきかすでにわかっていた。コンピューターは完璧な召使いだが、同時に暴君でもある。自分が決定を下していると思わせるが、実際にはコンピューターが代わりに決定しているのだ。\u201dこの言葉はホールの設計方法のもっともラディカルな次元を明らかにする\u2014\u2014彼は思考過程における不確定性と開放性を保持しようとし、精確性は後の技術深化段階に委ねる。',
          ],
          en: [
            "Holl is a rare serious writer among contemporary architects. He has published over twenty books to date, among which \"Anchoring\" (1989), \"Parallax\" (2000), and \"Questions of Perception\" (1994, co-authored with Pallasmaa and P\u00e9rez-G\u00f3mez) are core texts of phenomenological architectural theory. \"Anchoring\" introduced a profoundly influential concept: architecture should not be regarded as an autonomous artwork but understood as a kind of experimental apparatus \u2014 one that converts the potential energies already present in a site (light, wind, water, geology) into perceptible spatial experience. This constitutes a fundamental rupture with most 20th-century architectural theory, from modernist functionalism to postmodern historical semiotics.",
            "\"Questions of Perception,\" co-authored with Pallasmaa and P\u00e9rez-G\u00f3mez, was a turning point in 1990s architectural theory. This brief book sparked widespread debate in architecture schools. Its core argument: modernist architecture relied excessively on vision (\"the hegemony of the eye\") while neglecting other senses \u2014 touch, smell, hearing, temperature perception. Architecture should be a \"multi-sensory experience,\" not merely a visual image. On the foundation of this argument, Holl developed his own architectural language: his designed spaces always contain multiple materials \u2014 smooth concrete and rough wood, cold metal and warm indirect lighting \u2014 creating a kind of \"tactile counterpoint.\"",
            "Holl\u2019s writing and his watercolors are two sides of the same coin. Words provide the conceptual framework; watercolors provide the intuitive leap. He once showed a watercolor sketch in a lecture \u2014 just a few gray brushstrokes and a single small red dot on the paper. He explained: \"This painting took me two minutes. If I used computer drafting, I\u2019d need two days to express the same idea. But after two minutes, I already knew what this building should be. The computer is a perfect servant but also a tyrant. It makes you think you are making decisions, but in fact it is deciding for you.\" This statement reveals the most radical dimension of Holl\u2019s design method: he tries to preserve uncertainty and openness in the thinking process, deferring precision to the subsequent technical development phase.",
          ],
        },
      },
      {
        title: { zh: '光、水与多孔性', ja: '光、水、多孔性', en: 'Light, water, and porosity' },
        paragraphs: {
          zh: [
            '霍尔建筑中最容易识别的特征是光\u2014\u2014不是那种均匀的、经过精确计算的人工照明的光，而是一种具有明确方向和变化表情的日光。霍尔曾说他可以花几个小时在施工现场观察光如何穿过一个窗户的不同角度。这种对光的痴迷不是仪式性的\u2014\u2014它是一种工作方法。在他的每个项目设计中，霍尔都会制作一套太阳角度研究模型，记录日照在冬夏至、春秋分的不同时刻如何进入建筑空间。这些研究常常直接决定建筑的形态：一个屋顶可能会为了捕捉正午的日光而隆起，一面墙可能会为了引入傍晚的低角度光线而偏转。',
            '水是霍尔作品中另一个持续的母题。他的建筑不仅经常位于水边（赫尔辛基的海湾、北京的运河、尼科西亚的干涸河床），而且常常将水纳入建筑本身的构造中。尼尔森-阿特金斯艺术博物馆（The Nelson-Atkins Museum of Art, 2007年在堪萨斯城扩建设计）的地下画廊的天窗从水池中升起\u2014\u2014白天日光穿过水面折射进入画廊，在墙壁上投下闪烁的水波纹样。这个设计是霍尔式\u201c多感官体验\u201d的完美体现：访客看到的不仅是艺术品，还有光穿过水的效果\u2014\u2014两者在同一场景中交融，创造了绘画无法复制的一种环境经验。',
            '霍尔的全部作品可以用他自己创造的一个词来概括：\u201c多孔性\u201d（porosity）。这个概念来自他对城市空间的长期研究。多孔性意味着\u2014\u2014一个建筑对城市的外壳不是坚固的封闭膜，而是包含大量穿孔、裂缝和通道的结构。行人可以\u201c穿过\u201d建筑而不进入建筑内部；视线可以\u201c穿透\u201d建筑看到另一侧的街道；风可以\u201c穿过\u201d建筑在内部庭院中创造通风。深圳万科中心是这一思想最极端的表达\u2014\u2014整座建筑像一座巨大的桥梁一样被抬离地面，地面层变成一个连续的公共公园。霍尔没有仅仅建造一座\u201c与环境友好的建筑\u201d，而是让建筑本身成为环境的一部分。',
          ],
          ja: [
            'ホールの建築でもっとも識別しやすい特徴は光である\u2014\u2014均一で、精確に計算された人工照明の光ではなく、明確な方向性と変化する表情をもつ日光である。ホールはかつて、光が窓の異なる角度をどのように通過するかを、工事現場で何時間も観察できると語った。この光への執着は儀式的なものではない\u2014\u2014それはひとつの仕事の方法である。各プロジェクトの設計において、ホールは太陽角度の研究模型を一式制作し、夏至・冬至・春分・秋分の異なる時刻に日光がどのように建築空間に入るかを記録する。これらの研究はしばしば直接建築の形態を決定する\u2014\u2014屋根は真昼の日光を捉えるために隆起するかもしれず、壁は夕方の低角度の光を取り入れるために偏向するかもしれない。',
            '水はホールの作品のなかのもう一つの持続的モチーフである。彼の建築はしばしば水辺に位置するだけではなく（ヘルシンキの湾、北京の運河、ニコシアの涸れ川）、水を建築そのものの構成のなかに取り込む。ネルソン\u2013アトキンス美術館（The Nelson-Atkins Museum of Art, 2007年カンザスシティ増築）では、地下ギャラリーのトップライトが水面から立ち上がる\u2014\u2014日中、日光が水面を通過して屈折しながらギャラリーに入り、壁の上にきらめく水の波紋を投げかける。この設計はホール式\u201c多感覚的体験\u201dの完璧な具体化である\u2014\u2014訪問者が見るのは芸術品だけでなく、光が水を通過する効果\u2014\u2014両者が同一のシーンのなかで融合し、絵画では複製不可能な一種の環境的経験を創造する。',
            'ホールの全作品は彼自身の造語で要約できる\u2014\u2014\u201c多孔性\u201d（porosity）。この概念は彼の都市空間に対する長期研究に由来する。多孔性とは\u2014\u2014都市に対する建築の外殻が堅固な閉鎖膜ではなく、多数の穿孔、亀裂、通路を含む構造であることを意味する。歩行者は建築の内部に入らずに建築を\u201c通過\u201dできる。視線は建築を\u201c貫通\u201dして反対側の街路を見ることができる。風は建築を\u201c通過\u201dして内部の庭に通風をつくり出す。深圳万科中心はこの思想のもっとも極端な表現である\u2014\u2014建築全体が巨大な橋のように地面から持ち上げられ、地上面は連続した公共公園となる。ホールは単に\u201c環境にやさしい建築\u201dを建てたのではなく、建築そのものを環境の一部にしたのである。',
          ],
          en: [
            "The most recognizable feature of Holl\u2019s architecture is light \u2014 not the uniform, precisely calculated light of artificial illumination but daylight with clear directionality and changing expression. Holl once said he could spend hours on a construction site observing how light passes through a window at different angles. This obsession with light is not ritualistic \u2014 it is a working method. In the design of each project, Holl produces a set of sun-angle study models, recording how daylight enters the building\u2019s spaces at different moments on the summer and winter solstices and the spring and autumn equinoxes. These studies often directly determine the building\u2019s form: a roof might rise to capture noontime daylight; a wall might deflect to admit low-angle evening light.",
            "Water is another persistent motif in Holl\u2019s work. His buildings are not only often sited beside water (Helsinki\u2019s bay, Beijing\u2019s canal, Nicosia\u2019s dry riverbed) but frequently incorporate water into the building\u2019s very construction. At the Nelson-Atkins Museum of Art (2007 addition in Kansas City), the skylights of the underground galleries rise from pools of water \u2014 by day, daylight passes through the water, refracting into the galleries and casting shimmering water-ripple patterns across the walls. This design is a perfect embodiment of Holl-esque \"multi-sensory experience\": visitors see not only artworks but the effect of light passing through water \u2014 the two fuse within a single scene, creating an environmental experience that painting cannot replicate.",
            "Holl\u2019s entire oeuvre can be summarized by a word he coined himself: \"porosity.\" This concept derives from his long-term study of urban space. Porosity means \u2014 the building\u2019s outer shell toward the city is not a solid, closed membrane but a structure containing numerous perforations, fissures, and passages. Pedestrians can \"pass through\" the building without entering its interior; sightlines can \"penetrate\" the building to see the street on the other side; wind can \"pass through\" the building to create ventilation in inner courtyards. The Shenzhen Vanke Center is the most extreme expression of this idea \u2014 the entire building is lifted off the ground like a gigantic bridge, and the ground level becomes a continuous public park. Holl did not merely build an \"environmentally friendly building\"; he made the building itself part of the environment.",
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'kiasma', note: { zh: '光的交织：弯曲体量在芬兰极端日照下，让自然光以不可能的角度进入画廊。', ja: '光の交錯：湾曲したボリュームがフィンランドの極端な日照の下で、自然光を不可能な角度からギャラリーに入れる。', en: 'Interweaving light: a curving volume under Finland\u2019s extreme sunlight, admitting natural light into galleries at impossible angles.' } },
      { slug: 'linked-hybrid', note: { zh: '八座塔楼通过环形天桥相连，底层完全对市民开放\u2014\u2014建筑是一座微缩城市。', ja: '8つのタワーが環状の空中歩道で結ばれ、低層部は完全に市民に開放される\u2014\u2014建築はひとつの縮小都市である。', en: 'Eight towers linked by ring-shaped skybridges, with ground floors fully open to citizens \u2014 the building is a micro-city.' } },
      { slug: 'horizontal-skyscraper-vanke-center', note: { zh: '水平摩天楼：将垂直的逻辑颠倒，让建筑成为漂浮在公园之上的桥。', ja: '水平の超高層：垂直の論理を逆転させ、建築を公園の上に浮遊する橋とする。', en: 'The horizontal skyscraper: inverting vertical logic, making the building a bridge floating above a park.' } },
    ],
    sources: [
      { title: 'Steven Holl Architects Official Site', url: 'https://www.stevenholl.com/' },
      { title: 'AIA Gold Medal: Steven Holl', url: 'https://www.aia.org/showcases/6165293-steven-holl-faia' },
      { title: 'Wikidata: Steven Holl', url: 'https://www.wikidata.org/wiki/Q455544' },
    ],
  },

  'bernard-tschumi': {
    slug: 'bernard-tschumi',
    summary: {
      zh: '伯纳德\u00b7屈米（Bernard Tschumi, 1944\u2013 ）是解构主义建筑的理论旗手和最重要的实践者之一。他也许是同时代建筑师中最纯粹的\u201c概念主义者\u201d\u2014\u2014建筑对他而言是一种\u201c思考的形式\u201d（a form of knowledge），而不仅仅是建造的结果。屈米的代表作巴黎拉维莱特公园（Parc de la Villette, 1983\u20131998年）将135英亩的场地转化为一个巨大的建筑可能性系统\u2014\u2014点（红色Folly亭子）、线（路径）和面（绿地）三套独立系统的叠加。这座公园不仅改变了巴黎的文化地理，更根本地改变了建筑师思考公共空间的方式。屈米后来设计了雅典卫城博物馆（2009年）\u2014\u2014一座悬空在考古遗址之上的玻璃建筑\u2014\u2014为建筑如何回应历史提供了一个与斯卡帕\u201c礼貌距离\u201d不同但同样有力的答案。',
      ja: 'ベルナール\u00b7チュミ（Bernard Tschumi, 1944\u2013 ）は脱構築主義建築の理論的旗手であり、もっとも重要な実践者のひとりである。彼はおそらく同時代の建築家のなかでもっとも純粋な\u201cコンセプチュアリスト\u201dである\u2014\u2014建築は彼にとって\u201c思考の形式\u201d（a form of knowledge）であり、単なる建設の結果ではない。チュミの代表作パリ・ラ・ヴィレット公園（Parc de la Villette, 1983\u20131998年）は、135エーカーの敷地をひとつの巨大な建築的可能性のシステムに転換した\u2014\u2014点（赤いフォリーのパビリオン）、線（経路）、面（緑地）という三つの独立したシステムの重ね合わせ。この公園はパリの文化地理を変えただけでなく、建築家が公共空間を考える方法そのものを根本的に変えた。チュミは後にアクロポリス博物館（2009年）を設計した\u2014\u2014考古遺跡の上に浮遊するガラスの建築\u2014\u2014建築がいかに歴史に応答するかについて、スカルパの\u201c礼儀正しい距離\u201dとは異なるが同等に力強い答えを提供した。',
      en: 'Bernard Tschumi (1944\u2013 ) is the theoretical standard-bearer of deconstructivist architecture and one of its most important practitioners. He is perhaps the purest "conceptualist" among his generation of architects \u2014 architecture for him is "a form of knowledge," not merely the result of construction. Tschumi\u2019s signature work, the Parc de la Villette in Paris (1983\u20131998), transformed a 135-acre site into an enormous system of architectural possibilities \u2014 the superposition of three independent systems: points (red Folly pavilions), lines (paths), and surfaces (green spaces). This park not only altered Paris\u2019s cultural geography but fundamentally changed how architects think about public space. Tschumi later designed the Acropolis Museum (2009) \u2014 a glass building suspended above the archaeological excavation \u2014 providing an answer to how architecture responds to history that differs from Scarpa\u2019s "polite distance" but is equally powerful.',
    },
    core_ideas: {
      zh: [
        '事件建筑（Event Architecture）\u2014\u2014建筑的形式不应该只来自形式和功能，而应该来自发生在其中的事件\u2014\u2014运动、冲突、邂逅。在拉维莱特公园中，建筑不是终点，而是一个事件生成器',
        '解构的快乐\u2014\u2014与许多人对解构主义的阴郁认知不同，屈米的建筑充满了快乐。红色的Folly是被异化的古典亭子，它们在公园中像大玩具一样散落，邀请人们以不可预测的方式使用它们',
        '分离/叠加\u2014\u2014与其设计一个统一的、所有元素都协调一致的方案，不如设计独立的系统然后让它们相互碰撞。这种碰撞会产生不可预测的空间效果，而这种效果正是屈米想要的东西',
        '概念优先于形式\u2014\u2014屈米可能是当代建筑师中对文字和概念赋予最高重要性的人。他大多数项目开始于一段文字\u2014\u2014一个概念声明\u2014\u2014建筑形式是这个概念的物理展开',
      ],
      ja: [
        '出来事の建築（Event Architecture）\u2014\u2014建築の形式は形式と機能だけから来るべきではなく、そのなかで起こる出来事\u2014\u2014運動、衝突、遭遇\u2014\u2014から来るべきである。ラ・ヴィレット公園では、建築は終点ではなく、出来事の生成器である',
        '脱構築の喜び\u2014\u2014多くの人の脱構築主義に対する陰鬱な認識とは異なり、チュミの建築は喜びに満ちている。赤いフォリーは異化された古典的パビリオンであり、公園のなかに大きな玩具のように散在し、人々を予測不能な方法でそれらを使用するよう誘う',
        '分離／重ね合わせ\u2014\u2014すべての要素が調和した統一的方案を設計するよりも、独立したシステムを設計し、それらを相互に衝突させるほうがよい。この衝突が予測不能な空間的効果を生み出し、この効果こそがチュミの求めるものである',
        '形式に先立つ概念\u2014\u2014チュミはおそらく現代建築家のなかで文字と概念に最高の重要性を与える人物である。彼のほとんどのプロジェクトはひとつの文章\u2014\u2014概念声明\u2014\u2014から始まり、建築形式はこの概念の物理的展開である',
      ],
      en: [
        'Event Architecture \u2014 architectural form should derive not only from form and function but from the events that occur within it \u2014 movement, collision, encounter. At La Villette, architecture is not an endpoint but an event-generator',
        'The joy of deconstruction \u2014 contrary to many people\u2019s gloomy perception of deconstructivism, Tschumi\u2019s architecture is full of joy. The red Follies are estranged classical pavilions, scattered across the park like large toys, inviting people to use them in unpredictable ways',
        'Disjunction/superposition \u2014 rather than designing a unified scheme where all elements harmonize, it is better to design independent systems and let them collide with one another. This collision produces unpredictable spatial effects, and these effects are precisely what Tschumi seeks',
        'Concept precedes form \u2014 Tschumi may be the contemporary architect who assigns the highest importance to words and concepts. Most of his projects begin with a text \u2014 a conceptual statement \u2014 and the architectural form is the physical unfolding of this concept',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Bernard_Tschumi.jpg/800px-Bernard_Tschumi.jpg',
      author: 'Wikimedia Commons',
      license: 'CC BY-SA 3.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Bernard_Tschumi.jpg',
      alt: { zh: '伯纳德·屈米肖像', ja: 'ベルナール・チュミの肖像', en: 'Portrait of Bernard Tschumi' },
    },
    sections: [
      {
        title: { zh: '从广告到建筑：一个概念主义者的形成', ja: '広告から建築へ\u2014\u2014あるコンセプチュアリストの形成', en: 'From advertising to architecture: the making of a conceptualist' },
        paragraphs: {
          zh: [
            '伯纳德\u00b7屈米的职业生涯起点不同寻常：他1969年在苏黎士联邦理工学院（ETH Zurich）获得建筑学位，但毕业后并没有立即进入建筑设计，而是先在广告业工作了一段时间。这一经历可能比他自己意识到的更为重要。在广告业中，最重要的不是产品本身，而是产品在消费者心中激发的概念（concept）。一个瓶装水和一个运动鞋可以在广告中被赋予完全相同的情感价值。产品是次要的，概念是首要的。将这种广告业独有的思维方式带入建筑领域，屈米提出了一个在当时（以及现在仍然）极具挑衅性的观点：建筑的意义不在于它的材料、结构或形式，而在于它所激发的事件\u2014\u2014人们在其中做什么、感受什么、遇到谁。这一观点是屈米全部建筑哲学的核心。',
            '1970年代，屈米在美国和英国的建筑学院任教，同时在发展他的理论。他将自己的建筑系讲座变成了一场场表演\u2014\u2014不是传统的幻灯片展示，而是包含了电影剪辑、音乐、文字投影和现场行动的复杂多媒体事件。他写的《曼哈顿抄本》（The Manhattan Transcripts, 1981年）是建筑理论史上最奇特的书之一：这本书没有建筑设计图，只有一系列将照片、建筑绘图和运动符号（箭头、轨迹、速度线）叠加在一起的图像。屈米的观点是：传统的建筑表现（平面图、立面图、剖面图）无法捕捉建筑中最重要的事件\u2014\u2014人在空间中的运动。一个楼梯在平面图中可能看起来完全相同，但如果你记录人在其中行走的方式，每个楼梯都会变成一个独特的事件。',
            '1983年是屈米职业生涯的分水岭。他在巴黎拉维莱特公园的国际竞赛中获胜，击败了来自全球的472个参赛方案。屈米的方案与所有其他方案根本不同：它不是一座建筑物或一组景观，而是一个系统。他定义了三套独立的层：点层（一系列间隔120米的红色Folly亭子）、线层（笔直和弯曲的路径）和面层（大型绿色开放空间和大厅建筑）。这三层叠加在135英亩的场地上，彼此没有任何预设的关系。它们在哪里碰撞，哪里就会发生不可预测的事情。这个方案在当时引起了激烈的争议：一些人认为它根本不是建筑，而是一种拒绝设计的姿态。但拉维莱特公园花了15年建造，建成后成为了巴黎第三大最受欢迎的公共空间（仅次于卢浮宫和埃菲尔铁塔），也是当代景观都市主义最受研究的案例之一。',
          ],
          ja: [
            'ベルナール\u00b7チュミのキャリアの出発点は異例である\u2014\u2014彼は1969年にチューリヒ連邦工科大学（ETH Zurich）で建築学位を取得したが、卒業後すぐには建築設計に入らず、まず広告業界でしばらく働いた。この経験はおそらく彼自身が意識した以上に重要である。広告業界では、もっとも重要なのは製品そのものではなく、製品が消費者の心に喚起する概念（コンセプト）である。一本のボトルウォーターと一足のスニーカーは広告のなかでまったく同じ感情的価値を付与されることができる。製品は二次的であり、概念が一次的である。この広告業界独自の思考様式を建築分野に持ち込んで、チュミは当時（そして現在もなお）極めて挑発的な観点を提起した\u2014\u2014建築の意味はその材料、構造、形式にあるのではなく、それが引き起こす出来事にある\u2014\u2014人々がそのなかで何をし、何を感じ、誰と出会うか。この観点がチュミの全建築哲学の中核である。',
            '1970年代、チュミはアメリカとイギリスの建築学校で教鞭を執りながら、彼の理論を発展させていた。彼は自分の建築系講義をパフォーマンスに変えた\u2014\u2014伝統的なスライドショーではなく、映画クリップ、音楽、テキスト投影、ライブアクションを含む複雑なマルチメディアイベントである。彼の書いた『マンハッタン・トランスクリプト』（The Manhattan Transcripts, 1981年）は建築理論史上もっとも奇妙な本のひとつである\u2014\u2014この本には建築設計図はなく、写真、建築図面、運動記号（矢印、軌跡、速度線）を重ね合わせた一連のイメージだけがある。チュミの主張は\u2014\u2014伝統的な建築表現（平面図、立面図、断面図）は建築のなかでもっとも重要なこと\u2014\u2014空間のなかの人の運動\u2014\u2014を捉えられない。ひとつの階段は平面図のなかではまったく同じに見えるかもしれないが、もし人がそのなかを歩く様式を記録すれば、各階段は独自の出来事になる。',
            '1983年はチュミのキャリアの分水嶺だった。彼はパリ・ラ・ヴィレット公園の国際コンペティションで優勝し、世界中からの472の応募案を破った。チュミの案は他のすべての案と根本的に異なっていた\u2014\u2014それは一つの建築物でも景観群でもなく、一つのシステムだった。彼は三つの独立した層を定義した\u2014\u2014点層（120メートル間隔の赤いフォリーの系列）、線層（直線と曲線の経路）、面層（大規模な緑の開放空間と大ホール建築）。この三層が135エーカーの敷地の上に重ね合わされ、相互にいかなる予設の関係ももたない。それらが衝突する場所で、予測不能なことが起こる。この案は当時激しい論争を引き起こした\u2014\u2014ある人々はこれがまったく建築ではなく、設計を拒否するジェスチャーにすぎないと考えた。しかしラ・ヴィレット公園は建設に15年を要し、完成後はパリで三番目に人気のある公共空間（ルーヴルとエッフェル塔に次ぐ）となり、現代ランドスケープ・アーバニズムのもっとも研究された事例のひとつとなった。',
          ],
          en: [
            'Bernard Tschumi\u2019s career began unusually: he earned his architecture degree from ETH Zurich in 1969, but instead of immediately entering architectural design, he first spent time in the advertising industry. This experience was perhaps more important than he himself realized. In advertising, what matters most is not the product itself but the concept it provokes in the consumer\u2019s mind. A bottle of water and a sneaker can be assigned exactly the same emotional value in an advertisement. The product is secondary; the concept is primary. Bringing this advertising-industry-specific way of thinking into architecture, Tschumi advanced an argument that was (and remains) profoundly provocative: architecture\u2019s meaning resides not in its materials, structure, or form but in the events it provokes \u2014 what people do in it, feel in it, encounter in it. This argument is the core of Tschumi\u2019s entire architectural philosophy.',
            'During the 1970s, Tschumi taught at architecture schools in the United States and the United Kingdom while developing his theory. He turned his architecture lectures into performances \u2014 not traditional slide presentations but complex multimedia events incorporating film clips, music, text projections, and live actions. His book "The Manhattan Transcripts" (1981) is one of the strangest books in architectural theory history: this book contains no architectural drawings, only a series of images superimposing photographs, architectural notations, and movement symbols (arrows, trajectories, speed lines). Tschumi\u2019s argument: traditional architectural representation (plans, elevations, sections) cannot capture the most important thing in architecture \u2014 human movement through space. A staircase may look exactly the same in plan, but if you record the manner in which people walk through it, every staircase becomes a unique event.',
            '1983 was the watershed in Tschumi\u2019s career. He won the international competition for the Parc de la Villette in Paris, beating 472 entries from around the world. Tschumi\u2019s scheme was fundamentally different from all others: it was not a building or a set of landscapes but a system. He defined three independent layers: the point layer (a series of red Folly pavilions at 120-meter intervals), the line layer (straight and curved paths), and the surface layer (large green open spaces and hall buildings). These three layers were superimposed across the 135-acre site with no predetermined relationship to one another. Where they collide, unpredictable things happen. The scheme was fiercely controversial at the time: some considered it not architecture at all but a gesture of refusing to design. Yet the Parc de la Villette took fifteen years to build and, once completed, became the third most popular public space in Paris (after the Louvre and the Eiffel Tower) and one of the most studied cases in contemporary landscape urbanism.',
          ],
        },
      },
      {
        title: { zh: '雅典卫城博物馆：悬浮在历史之上', ja: 'アクロポリス美術館：歴史の上に浮遊する', en: 'Acropolis Museum: suspended above history' },
        paragraphs: {
          zh: [
            '2009年，屈米完成了雅典卫城博物馆（Acropolis Museum）。这座建筑位于雅典卫城山脚下，距离帕特农神庙仅300米。基地本身就是一个考古遗址\u2014\u2014在建设过程中发现了公元前4世纪至公元12世纪的多层遗迹。如何处理新建筑与这一考古层的关系，是设计中最核心的问题。屈米的解决方案是大胆的：他将整座博物馆抬升在巨大的混凝土柱上，让考古遗址完全暴露在一楼的玻璃地板下。参观者进入博物馆，首先看到的不是任何展品，而是脚下的古代雅典\u2014\u2014这是一次被倒置的博物馆体验：展示从你进入的那一刻就开始了。',
            '博物馆的顶层（帕特农展厅）是建筑中的另一个概念性高潮。这一层的平面与帕特农神庙完全相同尺寸、相同朝向的矩形玻璃厅，其中展示着帕特农神庙的大理石浮雕（包括原物和复制品）。透过全玻璃外墙，你可以看到300米外真正的帕特农神庙\u2014\u2014在这个空间中，展品与它们的原始建筑上下文产生了一种几乎触觉性的视觉联系。屈米称之为\u201c建筑既是语境也是物体\u201d。这个设计也是对大英博物馆一个尖锐的政治声明：帕特农大理石应当归还雅典\u2014\u2014因为只有当它们被展示在与帕特农神庙直接对视的位置时，它们才能被正确理解。',
            '雅典卫城博物馆不是一个完美的建筑（屈米本人承认它有弱点），但它是21世纪最重要的博物馆之一。它与弗兰克\u00b7盖里的毕尔巴鄂古根海姆形成鲜明对比：盖里的博物馆是一件壮观的艺术品，建筑自己是主角。而在屈米的卫城博物馆中，建筑是谦逊的\u2014\u2014但不是被动的。它通过精确的视觉轴线和巧妙的悬浮策略，将注意力从自身移开，指向远处的帕特农。这是一种罕见的建筑成就：一座明确存在的建筑，同时成功地让自己隐形。',
          ],
          ja: [
            '2009年、チュミはアクロポリス博物館（Acropolis Museum）を完成させた。この建築はアテネのアクロポリスの丘の麓に位置し、パルテノン神殿からわずか300メートルである。敷地そのものがひとつの考古遺跡である\u2014\u2014建設過程で紀元前4世紀から12世紀までの多層の遺構が発見された。新建築とこの考古学的層との関係をいかに処理するかが、設計のもっとも核心的な問題だった。チュミの解決策は大胆である\u2014\u2014彼は博物館全体を巨大なコンクリート柱の上に持ち上げ、考古遺跡を一階のガラス床の下に完全に露出させた。来館者は博物館に入ると、まず何の展示品も見ずに、足下の古代アテネを見る\u2014\u2014これは逆転された博物館体験である\u2014\u2014展示はあなたが入ったその瞬間から始まっている。',
            '博物館の最上階（パルテノン・ギャラリー）は建築のなかのもう一つの概念的クライマックスである。この階の平面はパルテノン神殿とまったく同じ寸法、同じ方位の矩形のガラスホールで、パルテノン神殿の大理石のフリーズ（原型と複製を含む）を展示している。全面ガラスの外壁を通して、300メートル先の本物のパルテノン神殿を見ることができる\u2014\u2014この空間のなかで、展示品はその本来の建築的文脈とほとんど触覚的な視覚的つながりを生み出す。チュミはこれを\u201c建築が文脈であると同時に物体でもある\u201dと呼ぶ。この設計はまた大英博物館に対する鋭い政治的声明でもある\u2014\u2014パルテノン大理石はアテネに返還されるべきである\u2014\u2014なぜならそれはパルテノン神殿と直接対視する位置に展示されて初めて正しく理解されうるからである。',
            'アクロポリス博物館は完璧な建築ではない（チュミ本人にも弱点があることを認めている）が、21世紀でもっとも重要な博物館のひとつである。それはフランク・ゲーリーのビルバオ・グッゲンハイムと鮮やかな対照をなす\u2014\u2014ゲーリーの美術館は壮観な芸術品であり、建築自体が主役である。一方チュミのアクロポリス博物館では、建築は謙虚である\u2014\u2014しかし受動的ではない。精確な視覚軸線と巧妙な浮遊戦略を通じて、注意を自身から逸らし、遠くのパルテノンへと向ける。これは稀な建築的達成である\u2014\u2014明確に存在しながら、同時に自身を不可視化することに成功した建築。',
          ],
          en: [
            'In 2009, Tschumi completed the Acropolis Museum. The building sits at the base of the Acropolis hill in Athens, just three hundred meters from the Parthenon. The site is itself an archaeological excavation \u2014 during construction, multiple layers of remains from the 4th century BCE to the 12th century CE were discovered. How to handle the relationship between the new building and this archaeological layer was the most central design question. Tschumi\u2019s solution was audacious: he raised the entire museum on massive concrete columns, leaving the archaeological excavation fully exposed beneath the glass floor of the ground level. Visitors entering the museum first see no exhibits at all but ancient Athens beneath their feet \u2014 this is an inverted museum experience: the display begins the moment you enter.',
            'The top floor (the Parthenon Gallery) is another conceptual climax within the building. This level\u2019s plan is a rectangular glass hall of exactly the same dimensions and orientation as the Parthenon, displaying the Parthenon\u2019s marble frieze (originals and casts). Through the fully glazed exterior walls, you can see the actual Parthenon three hundred meters away \u2014 in this space, exhibits generate an almost tactile visual connection with their original architectural context. Tschumi calls this "architecture as both context and object." The design is also a pointed political statement addressed to the British Museum: the Parthenon Marbles should be returned to Athens \u2014 because only when displayed in direct visual alignment with the Parthenon can they be properly understood.',
            'The Acropolis Museum is not a perfect building (Tschumi himself acknowledges its weaknesses), but it is one of the most important museums of the 21st century. It stands in stark contrast to Frank Gehry\u2019s Guggenheim Bilbao: Gehry\u2019s museum is a spectacular artwork, the building itself the protagonist. At Tschumi\u2019s Acropolis Museum, the architecture is humble \u2014 but not passive. Through precise visual axes and a clever suspension strategy, it diverts attention from itself toward the distant Parthenon. This is a rare architectural achievement: a building that is unmistakably present while simultaneously succeeding in making itself invisible.',
          ],
        },
      },
      {
        title: { zh: '事件、电影与建筑教育', ja: '出来事、映画と建築教育', en: 'Events, cinema, and architectural education' },
        paragraphs: {
          zh: [
            '屈米的建筑理论有一个出乎意料的来源：电影。他在1980年代的讲座中经常放映塞尔日\u00b7艾森斯坦（Sergei Eisenstein）的《战舰波将金号》中的奥德萨阶梯片段。艾森斯坦通过蒙太奇\u2014\u2014不同镜头的剪辑和碰撞\u2014\u2014创造出时间被拉伸或压缩的电影时间。屈米认为，建筑也应该这样工作：建筑空间不应该是一个中性的容器，而应该是一个积极的参与者\u2014\u2014通过空间的编排（sequencing），建筑可以加速或减速人的运动，制造意外和对峙。在拉维莱特公园中，红色的Folly亭子就是这种\u201c建筑蒙太奇\u201d的标点符号：它们每隔120米出现一次，打断步行的节奏，迫使人作出选择\u2014\u2014绕过去、穿过去、还是停下来进入。',
            '屈米的教学方法同样激进。1988\u20132003年，他担任哥伦比亚大学建筑规划与保护学院（GSAPP）的院长，将这座以保守著称的藤校建筑学院转变为全球最前卫的建筑教育中心之一。他废除了传统的studio体系（一个教授+一群学生在整个学期做一个项目），代之以\u201c论文周\u201d（Paperless Studios），鼓励学生探索计算机生成的形式和数字制造技术。这在1990年代初是极具争议的举措，但时间证明了屈米的远见：GSAPP至今仍是全球数字建筑研究的前沿阵地。屈米的教育哲学与他的建筑哲学是一贯的\u2014\u2014不是教学生\u201c如何设计\u201d，而是教他们\u201c如何思考设计\u201d。',
            '回顾屈米的全部生涯，他的最大贡献也许不是任何一座具体的建筑，而是一种智识态度：建筑不是形式的生产，而是概念的展开。在这一意义上，屈米改变了建筑的语言。他证明了：一个聪明的想法可以比一座漂亮的建筑更有力量。当然，最好的情况是两者兼备\u2014\u2014而这正是卫城博物馆和拉维莱特公园所实现的事情。屈米今年79岁（截至2023年），仍然活跃在教学中。他的最新项目继续将事件、运动和交流作为建筑的核心主题。在建筑界日益沉迷于Instagram友好图像的当下，屈米提醒我们：建筑的核心体验不是一张照片，而是一段穿越空间的时间。',
          ],
          ja: [
            'チュミの建築理論には意外な源がある\u2014\u2014映画である。彼は1980年代の講義でしばしばセルゲイ・エイゼンシュテイン（Sergei Eisenstein）の『戦艦ポチョムキン』のオデッサ階段シークエンスを放映した。エイゼンシュテインはモンタージュ\u2014\u2014異なるショットの編集と衝突\u2014\u2014を通じて、時間が引き伸ばされたり圧縮されたりする映画時間を創造する。チュミは、建築もまたこのように働くべきだと考えた\u2014\u2014建築空間は中立的容器であってはならず、積極的な参加者であるべきだ\u2014\u2014空間の編集（シークエンシング）を通じて、建築は人の運動を加速または減速させ、意外性と対峙を生み出すことができる。ラ・ヴィレット公園では、赤いフォリーのパビリオンがこの\u201c建築的モンタージュ\u201dの句読点である\u2014\u2014それらは120メートルごとに出現し、歩行のリズムを中断し、人に選択を迫る\u2014\u2014迂回するか、通過するか、立ち止まって入るか。',
            'チュミの教育方法も同様にラディカルである。1988年から2003年まで、彼はコロンビア大学建築・計画・保存大学院（GSAPP）の院長を務め、保守的で知られるこのアイビーリーグの建築学校を世界でもっとも前衛的な建築教育センターのひとつに転換した。彼は伝統的なスタジオ制度（一人の教授＋一群の学生が学期全体で一つのプロジェクトを行う）を廃止し、\u201cペーパーレス・スタジオ\u201d（Paperless Studios）に置き換え、学生がコンピューター生成のフォルムとデジタル製造技術を探求することを奨励した。これは1990年代初頭にはきわめて議論を呼ぶ措置だったが、時間がチュミの先見性を証明した\u2014\u2014GSAPPはいまもなお世界のデジタル建築研究の最前線である。チュミの教育哲学は彼の建築哲学と一貫している\u2014\u2014学生に\u201cどう設計するか\u201dを教えるのではなく、\u201c設計についてどう考えるか\u201dを教える。',
            'チュミの全キャリアを振り返ると、彼の最大の貢献はおそらく特定の建築ではなく、一つの知性的態度である\u2014\u2014建築はフォルムの生産ではなく、概念の展開である。この意味で、チュミは建築の言語を変えた。彼は証明した\u2014\u2014ひとつの賢いアイデアは、美しい建築よりも力をもちうる。もちろん、最善の状況は両方を兼ね備えることである\u2014\u2014そしてこれこそがアクロポリス博物館とラ・ヴィレット公園が実現したことである。チュミは現在79歳（2023年時点）、いまも教育活動に積極的である。彼の最新プロジェクトは引き続き、出来事、運動、交流を建築の核心テーマとしている。建築界がますますInstagramフレンドリーなイメージに夢中になるなか、チュミは私たちに思い出させる\u2014\u2014建築の核心体験は一枚の写真ではなく、空間を横切る時間の断片である。',
          ],
          en: [
            "Tschumi\u2019s architectural theory has an unexpected source: cinema. In his 1980s lectures he frequently screened the Odessa Steps sequence from Sergei Eisenstein\u2019s \"Battleship Potemkin.\" Eisenstein creates cinematic time \u2014 time stretched or compressed \u2014 through montage: the editing and collision of different shots. Tschumi argued that architecture should work this way too: architectural space should not be a neutral container but an active participant \u2014 through spatial sequencing, architecture can accelerate or decelerate human movement, produce surprise and confrontation. At La Villette, the red Folly pavilions are the punctuation marks of this \"architectural montage\": they appear every 120 meters, interrupting the rhythm of walking, forcing choices \u2014 go around, pass through, or stop and enter.",
            "Tschumi\u2019s teaching methods were equally radical. From 1988 to 2003 he served as dean of Columbia University\u2019s Graduate School of Architecture, Planning and Preservation (GSAPP), transforming this conservatively reputed Ivy League architecture school into one of the world\u2019s most avant-garde architectural education centers. He abolished the traditional studio system (one professor plus a group of students working on one project for an entire semester) and replaced it with \"Paperless Studios,\" encouraging students to explore computer-generated forms and digital fabrication techniques. This was a highly controversial move in the early 1990s, but time has vindicated Tschumi\u2019s foresight: GSAPP remains a global frontline of digital architecture research today. Tschumi\u2019s educational philosophy is consistent with his architectural philosophy \u2014 not teaching students \"how to design\" but teaching them \"how to think about design.\"",
            "Looking back across Tschumi\u2019s entire career, his greatest contribution may not be any specific building but an intellectual attitude: architecture is not the production of form but the unfolding of concepts. In this sense, Tschumi changed the language of architecture. He proved: a clever idea can be more powerful than a beautiful building. Of course, the best case is to have both \u2014 and this is precisely what the Acropolis Museum and the Parc de la Villette achieve. Tschumi is now seventy-nine (as of 2023) and remains active in teaching. His latest projects continue to treat event, movement, and exchange as core themes of architecture. In an architectural world increasingly obsessed with Instagram-friendly images, Tschumi reminds us: architecture\u2019s core experience is not a photograph but a fragment of time traversing space.",
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'acropolis-museum', note: { zh: '从卫城山脚下升起，玻璃地板下暴露千年考古遗址，顶层与帕特农神庙形成对视。', ja: 'アクロポリスの丘の麓から立ち上がり、ガラス床の下に千年の考古遺跡を露出する。最上階がパルテノン神殿との対視を形成する。', en: 'Rising from the base of the Acropolis hill, exposing millennia of archaeological excavation beneath glass floors, its top floor forming visual alignment with the Parthenon.' } },
      { slug: 'parc-de-la-villette', note: { zh: '点线面三套独立系统的碰撞生成的巨大城市实验室，26座红色Folly是建筑概念化的终极宣言。', ja: '点・線・面の三つの独立システムの衝突が生成する巨大都市実験室。26の赤いフォリーは建築的概念化の究極的宣言である。', en: 'An enormous urban laboratory generated by the collision of three independent systems of points, lines, and surfaces \u2014 26 red Follies as the ultimate manifesto of architectural conceptualization.' } },
      { slug: 'blue-condominium', note: { zh: '纽约下东区像素化蓝色立面住宅，将城市街区转化为垂直的发光体。', ja: 'ニューヨーク・ロウアーイーストサイドのピクセル化された青色ファサードの住宅。都市街区を垂直の発光体に転換する。', en: 'A pixelated blue-fa\u00e7aded residence on New York\u2019s Lower East Side, transforming the urban block into a vertical luminous body.' } },
    ],
    sources: [
      { title: 'Bernard Tschumi Architects Official Site', url: 'https://www.tschumi.com/' },
      { title: 'The Acropolis Museum Official Site', url: 'https://www.theacropolismuseum.gr/' },
      { title: 'Wikidata: Bernard Tschumi', url: 'https://www.wikidata.org/wiki/Q471916' },
    ],
  },

  'paul-rudolph': {
    slug: 'paul-rudolph',
    summary: {
      zh: '保罗·鲁道夫是美国粗野主义最具辨识度的面孔之一。他用混凝土画出锯齿状的轮廓、层叠的空间和戏剧性的光影，把建筑变成一种几乎巴洛克式的雕塑体验，却又始终服务于现代功能。他在耶鲁建筑系执掌期间深刻影响了一代建筑师。',
      ja: 'ポール・ルドルフはアメリカのブルータリズム建築を代表する存在である。鋸歯状の輪郭、層をなす空間、演劇的な光と影でコンクリートを描き、建物をほとんどバロック的な彫刻体験へと変えた。イェール大学建築学部長として一時代を築いた教育者でもある。',
      en: 'Paul Rudolph is among the most recognizable faces of American Brutalism. He drew jagged silhouettes, layered spaces and theatrical light with concrete, turning buildings into an almost Baroque sculptural experience while never losing sight of modern function. His tenure as chair of Yale\u2019s architecture department shaped a generation.',
    },
    core_ideas: {
      zh: [
        '混凝土不是冰冷无情的材料，而是可以像织物一样褶皱、折叠、编织的塑性媒介',
        '建筑的空间体验应该像电影一样具有叙事性——进入、穿越、停顿、释放',
        '粗野主义不是粗糙，而是对结构真实性和材料质感的诚实追求',
        '城市住宅可以同时是私密庇护所和垂直街道的连续体',
        '教育建筑应该成为建筑教育的活教材，耶鲁A&A大楼本身就是一堂课',
      ],
      ja: [
        'コンクリートは冷たく無機質な素材ではなく、布のようにプリーツを寄せ、折り畳み、織り込むことのできる可塑的媒体である',
        '建築の空間体験は映画のように物語的であるべき——進入、通過、間、解放',
        'ブルータリズムとは粗野さではなく、構造的真実と素材の質感への誠実な追求である',
        '都市住宅は私的シェルターであると同時に、垂直の街路としての連続体でもありうる',
        '教育建築は建築教育の生きた教科書であるべき——イェールA&Aビルはそれ自体が一つの授業である',
      ],
      en: [
        'Concrete is not a cold, soulless material but a plastic medium that can be pleated, folded, and woven like fabric',
        'The spatial experience of architecture should possess cinematic narrativity \u2014 entry, passage, pause, release',
        'Brutalism is not about roughness but about an honest pursuit of structural truth and material texture',
        'Urban housing can simultaneously be a private shelter and a continuation of the vertical street',
        'Educational architecture should be a living textbook of architectural education \u2014 the Yale A&A Building is itself a lesson',
      ],
    },
    portrait: {
      url: '/images/architects/paul-rudolph-portrait.jpg',
      author: '',
      license: '',
      source_url: '',
      alt: { zh: '保罗·鲁道夫的建筑肖像', ja: 'ポール・ルドルフの建築肖像', en: 'Portrait of architect Paul Rudolph' },
    },
    sections: [
      {
        title: { zh: '从萨拉索达到耶鲁：混凝土诗人的诞生', ja: 'サラソータからイェールへ：コンクリート詩人の誕生', en: 'From Sarasota to Yale: Birth of the Concrete Poet' },
        paragraphs: {
          zh: [
            '保罗·鲁道夫1918年生于肯塔基州，在哈佛设计研究生院师从格罗皮乌斯，毕业后短暂服役于美国海军。1940年代末，他来到佛罗里达州萨拉索塔，在这里开始了一系列轻型住宅实验——这就是后来被称为"萨拉索塔学派"的开端。这些早期作品以薄板屋顶、大面积玻璃和与亚热带气候的对话为特色，展现出一种轻盈的现代主义。',
            '然而真正让鲁道夫成名的，是他对粗野主义语言的激进发展。1958年，年仅40岁的他被任命为耶鲁大学建筑系主任，随即设计了耶鲁艺术与建筑大楼（Yale A&A Building, 1963）。这座建筑以其锯齿状混凝土体量、37个不同标高的楼层和内部空间的惊人复杂性震惊了建筑界。它既是鲁道夫职业生涯的巅峰之作，也成为粗野主义运动最具代表性和争议性的作品之一。',
            '耶鲁A&A大楼的内部像一座混凝土迷宫：高低错落的平台、悬挑的走道、透过缝隙倾泻而下的天光、粗糙的灯芯绒纹理混凝土表面。鲁道夫不是把空间简单分割，而是让空间在垂直维度上不断流动和交织。学生在此学习的同时，建筑本身就在教授他们什么是空间。这座建筑也因其激进性引发了巨大争议——1969年一场可疑的火灾严重损坏了建筑，许多批评者认为这是对鲁道夫美学理念的攻击。但无论如何，它至今仍是美国粗野主义最重要的纪念碑之一。',
          ],
          ja: [
            'ポール・ルドルフは1918年ケンタッキー州に生まれ、ハーバード大学デザイン大学院でグロピウスに師事した。卒業後、短期間アメリカ海軍に勤務し、1940年代末にフロリダ州サラソータに移った。そこで一連の軽量住宅の実験を始め——これが後に「サラソータ派」として知られるようになる。これらの初期作品は薄板屋根、大面積のガラス、亜熱帯気候との対話を特徴とし、軽快なモダニズムを示していた。',
            'しかしルドルフを真に有名にしたのは、ブルータリズム言語の急進的な展開である。1958年、わずか40歳でイェール大学建築学部長に任命され、ただちにイェールA&Aビル（1963年）を設計した。この建物は鋸歯状のコンクリートの量塊、37の異なるレベルの床面、内部空間の驚異的な複雑さで建築界に衝撃を与えた。それはルドルフのキャリアの頂点であると同時に、ブルータリズム運動の最も代表的かつ論争的な作品の一つとなった。',
            'イェールA&Aビルの内部はコンクリートの迷宮のようである——高低差のあるプラットフォーム、張り出した通路、隙間から注ぐ天光、粗いコーデュロイテクスチャのコンクリート表面。ルドルフは空間を単純に分割するのではなく、垂直次元で空間を絶えず流動・交錯させた。学生はここで学びながら、建物自体が空間とは何かを教えている。この建物はその急進性ゆえに大きな論争を引き起こした——1969年の不審火が建物に深刻な損傷を与え、多くの批評家はこれをルドルフの美学理念への攻撃と見なした。しかし何があろうと、この建物は今日なおアメリカのブルータリズムの最も重要な記念碑の一つである。',
          ],
          en: [
            'Paul Rudolph was born in Kentucky in 1918 and studied under Walter Gropius at the Harvard Graduate School of Design. After brief naval service, he arrived in Sarasota, Florida in the late 1940s and began a series of lightweight house experiments \u2014 what later became known as the Sarasota School. These early works featured thin slab roofs, expansive glass, and a dialogue with the subtropical climate, demonstrating a light-touch modernism.',
            'Yet what truly made Rudolph famous was his radical development of the Brutalist language. In 1958, at just 40, he was appointed chair of Yale\u2019s architecture department and immediately designed the Yale Art and Architecture Building (1963). The building shocked the architectural world with its jagged concrete massing, 37 different floor levels, and astonishing internal spatial complexity. It was both the pinnacle of Rudolph\u2019s career and one of the most iconic \u2014 and controversial \u2014 works of the Brutalist movement.',
            'Inside the Yale A&A Building is like a concrete labyrinth: staggered platforms, cantilevered walkways, daylight pouring through slits, rough corduroy-textured concrete surfaces. Rudolph did not simply divide space \u2014 he kept it flowing and interweaving across the vertical dimension. Students learned here while the building itself taught them what space is. The building also provoked enormous controversy for its radicalism \u2014 a suspicious fire in 1969 severely damaged it, seen by many critics as an attack on Rudolph\u2019s aesthetic philosophy. Whatever the case, it remains one of the most important monuments of American Brutalism.',
          ],
        },
      },
      {
        title: { zh: '混凝土的巴洛克：材料丶光线与空间戏剧', ja: 'コンクリートのバロック：素材·光·空間の演劇', en: 'Baroque in Concrete: Material, Light, and Spatial Drama' },
        paragraphs: {
          zh: [
            '鲁道夫的混凝土不是密斯式的精确光滑，也不是柯布西耶式的粗犷原始——它有自己的独特表情。他发明了"灯芯绒混凝土"技法：在模板内衬以竖条纹，脱模后混凝土表面留下深深的竖向凹槽纹理。这种处理既打破了混凝土体量的沉重感，又创造出丰富的光影变化——日光沿着凹槽滑动，在不同时间产生微妙的阴影渐变。',
            '在空间组织上，鲁道夫追求一种"连续剖面"的理念。他认为建筑不应被水平楼板机械地分割，而应该像地形一样起伏。他设计的室内空间中，你很少看到传统的"房间-走廊"格局；取而代之的是错层平台、通高空间和互望的视线联系。这种做法在当时极为前卫，预示了后来雷姆·库哈斯和SANAA等人对"连续空间"的探索。',
            '鲁道夫的光线控制同样炉火纯青。他大量使用天窗、高侧窗和凹入式开窗，让光线在混凝土表面漫射和折射。参观他的建筑时，你会感觉光线似乎是从混凝土内部发出的，而不是从外面照进来的。这种"光即材料"的理念使他的建筑即便在最阴郁的天气里也保持着某种内在的照明。不过，批评者也指出他的建筑存在功能性缺陷——采光不均、流线复杂、维护困难——这些问题在耶鲁A&A大楼中尤为突出，并随着时间推移引发了关于粗野主义建筑可持续性的更广泛讨论。',
          ],
          ja: [
            'ルドルフのコンクリートはミースの精確で平滑なものとも、コルビュジエの粗野で原初的なものとも異なる——独自の表情を持っている。彼は「コーデュロイコンクリート」技法を考案した。型枠に縦のストライプを施し、脱型後のコンクリート表面に深い縦溝のテクスチャを残す。この処理はコンクリートの量塊の重さを打ち破ると同時に、豊かな光影の変化を生み出す——日光が溝に沿って滑り、一日のうちに微妙な影のグラデーションを生む。',
            '空間構成については、ルドルフは「連続断面」の理念を追求した。建築は水平の床スラブによって機械的に分断されるべきではなく、地形のように起伏すべきだと考えた。彼の設計した室内空間では、従来の「部屋—廊下」のパターンはめったに見られない。代わりにスキップフロアのプラットフォーム、吹き抜け空間、相互に見通す視線のつながりが現れる。この手法は当時きわめて前衛的で、後にレム·コールハースやSANAAらによる「連続空間」の探求を先取りしていた。',
            'ルドルフの光の制御もまた熟練の域にある。彼はトップライト、ハイサイドライト、凹入式の窓を多用し、光をコンクリート表面で拡散·屈折させる。彼の建物を訪れると、光がコンクリートの内部から発しているかのように感じられる——外から差し込んでいるようには見えないのだ。この「光は素材である」という理念により、彼の建築は最も陰鬱な天候でもある種の内在的な照明を保っている。しかし批評家は彼の建築の機能的欠陥も指摘する——不均一な採光、複雑な動線、維持管理の困難さ——これらの問題はイェールA&Aビルで特に顕著であり、時間の経過とともにブルータリズム建築の持続可能性に関するより広い議論を引き起こした。',
          ],
          en: [
            'Rudolph\u2019s concrete is neither the precise smoothness of Mies nor the raw primality of Le Corbusier \u2014 it has its own distinct expression. He invented the \u201ccorduroy concrete\u201d technique: lining formwork with vertical striations so that, after stripping, the concrete surface retains deep vertical groove textures. This treatment both breaks up the heaviness of concrete mass and creates rich light-and-shadow variation \u2014 daylight sliding along the grooves, producing subtle shadow gradients across the day.',
            'In spatial organization, Rudolph pursued the idea of a \u201ccontinuous section.\u201d He believed architecture should not be mechanically sliced by horizontal floor slabs but should undulate like topography. In his interiors, one rarely finds the conventional room-and-corridor pattern; instead, split-level platforms, double-height voids, and interlocking sightlines appear. This approach was extremely avant-garde at the time, anticipating later explorations of \u201ccontinuous space\u201d by Rem Koolhaas and SANAA.',
            'Rudolph\u2019s control of light was equally masterful. He used skylights, clerestory windows, and recessed fenestration extensively, letting light diffuse and refract across concrete surfaces. Visiting his buildings, one feels that light emanates from within the concrete rather than entering from outside. This \u201clight as material\u201d philosophy ensures his buildings retain a certain inner illumination even in the gloomiest weather. Critics, however, point to functional shortcomings \u2014 uneven daylight distribution, complex circulation, maintenance difficulties \u2014 problems especially pronounced in the Yale A&A Building, which over time fueled broader debates about the sustainability of Brutalist architecture.',
          ],
        },
      },
      {
        title: { zh: '从高峰到被遗忘：鲁道夫的浮沉与遗产', ja: '頂点から忘却へ：ルドルフの浮沈と遺産', en: 'From Peak to Obscurity: Rudolph\u2019s Rise, Fall, and Legacy' },
        paragraphs: {
          zh: [
            '鲁道夫是建筑史上最戏剧性的"从神坛跌落"的案例之一。1960年代，他是美国最炙手可热的建筑师：耶鲁系主任、无数委托、媒体宠儿。《纽约时报》称他为"美国建筑界的杰出年轻人"。然而到了1970年代，随着后现代主义的兴起和粗野主义的退潮，鲁道夫的星辰迅速暗淡。批评界转而认为他的建筑过于沉重、阴暗、不人性化。耶鲁A&A大楼的火灾虽非他的过错，却似乎象征了他美学世界的破碎。',
            '1970年代后期，鲁道夫将事业重心转向东南亚，在香港、新加坡和印度尼西亚完成了大量高层建筑和城市设计项目。这些作品虽然商业上成功，但在西方主流建筑话语中几乎被完全忽视。他晚年低调地在纽约经营着一个小事务所，直到1997年因间皮瘤去世——据信与他年轻时期在布鲁克林海军船坞接触石棉有关。',
            '近年来，随着粗野主义在全球范围内的重估和重新流行，鲁道夫的作品正经历一场重要的复兴。耶鲁A&A大楼于2008年经过精心修复后重新开放（现更名为鲁道夫大楼），新一代建筑师和学者开始重新发现他作品中蕴含的空间智慧和材料诗意。他的灯芯绒混凝土、连续剖面和光雕塑理念，正在被赋予新的评价。鲁道夫的故事提醒我们：建筑史上的评价从来不是一成不变的，今天的被遗忘者可能是明天的被重新发现者。',
          ],
          ja: [
            'ルドルフは建築史上もっとも劇的な「神壇からの転落」事例の一つである。1960年代、彼はアメリカで最も注目される建築家だった——イェール学部長、無数の依頼、メディアの寵児。ニューヨーク·タイムズは彼を「アメリカ建築界の卓越した若者」と呼んだ。しかし1970年代に入ると、ポストモダニズムの台頭とブルータリズムの退潮に伴い、ルドルフの星は急速に暗くなった。批評界は一転して彼の建築はあまりに重く、暗く、非人間的だと考えた。イェールA&Aビルの火災は彼の過失ではなかったが、彼の美学世界の破砕を象徴するかのようだった。',
            '1970年代後半、ルドルフは活動の重心を東南アジアに移した。香港、シンガポール、インドネシアで多数の高層建築と都市デザインプロジェクトを完成させた。これらの作品は商業的には成功したが、西洋の主流建築言説からはほぼ完全に無視された。晩年はニューヨークで小さな事務所をひっそりと営み、1997年に中皮腫で死去した——若い頃ブルックリン海軍工廠でアスベストに接触したことによると信じられている。',
            '近年、ブルータリズムのグローバルな再評価と再流行にともない、ルドルフの作品は重要なルネサンスを経験している。イェールA&Aビルは2008年に慎重な修復を経て再オープンし（現在はルドルフ·ホールに改名）、新世代の建築家や研究者が彼の作品に秘められた空間の知恵と素材の詩情を再発見しつつある。彼のコーデュロイコンクリート、連続断面、光彫刻の理念は新たな評価を受けている。ルドルフの物語は私たちに思い出させる——建築史の評価は決して固定的ではない。今日の忘れられた者は明日の再発見者かもしれない。',
          ],
          en: [
            'Rudolph represents one of the most dramatic \u201cfall from grace\u201d cases in architectural history. In the 1960s, he was America\u2019s hottest architect: Yale department chair, countless commissions, media darling. The New York Times called him \u201cthe brilliant young man of American architecture.\u201d But by the 1970s, with the rise of Postmodernism and the retreat of Brutalism, Rudolph\u2019s star dimmed rapidly. Critics turned, considering his buildings too heavy, dark, and inhumane. The Yale A&A fire, though not his fault, seemed to symbolize the shattering of his aesthetic world.',
            'From the late 1970s, Rudolph shifted his practice to Southeast Asia, completing numerous high-rise and urban design projects in Hong Kong, Singapore, and Indonesia. Though commercially successful, these works were almost entirely ignored by mainstream Western architectural discourse. In his later years, he quietly ran a small office in New York, dying of mesothelioma in 1997 \u2014 believed to result from asbestos exposure at the Brooklyn Navy Yard in his youth.',
            'In recent years, with the global reassessment and resurgence of Brutalism, Rudolph\u2019s oeuvre is experiencing a significant revival. The Yale A&A Building reopened in 2008 after meticulous restoration (now renamed Rudolph Hall), and a new generation of architects and scholars is rediscovering the spatial intelligence and material poetry embedded in his work. His corduroy concrete, continuous section, and light-sculpture ideas are being re-evaluated. Rudolph\u2019s story reminds us: judgments in architectural history are never fixed; today\u2019s forgotten may be tomorrow\u2019s rediscovered.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'yale-art-and-architecture-building', note: { zh: '美国粗野主义的终极宣言：37个标高、灯芯绒混凝土、一场空间交响乐，也是鲁道夫职业生涯的最大赌注。', ja: 'アメリカ·ブルータリズムの究極の宣言。37のレベル、コーデュロイコンクリート、空間交響楽——ルドルフのキャリア最大の賭け。', en: 'The ultimate manifesto of American Brutalism: 37 levels, corduroy concrete, a spatial symphony, and the biggest gamble of Rudolph\u2019s career.' } },
      { slug: 'milam-residence', note: { zh: '弗罗里达海滨的混凝土雕塑住宅，用层叠的遮阳板和戏剧性剖面定义现代海岸生活。', ja: 'フロリダ海岸のコンクリート彫刻住宅。積層した遮光板と演劇的な断面が、モダンな海岸生活を定義する。', en: 'A concrete sculptural residence on the Florida coast, defining modern beachside living through layered sunscreens and dramatic section.' } },
      { slug: 'creative-arts-center-colgate-university', note: { zh: '纽约州北部校园中的混凝土堡垒，天窗和错层创造出令人难忘的教学空间。', ja: 'ニューヨーク州北部キャンパスのコンクリート要塞。トップライトとスキップフロアが忘れがたい教育空間をつくる。', en: 'A concrete fortress on an upstate New York campus, where skylights and split-levels create unforgettable teaching spaces.' } },
    ],
    sources: [
      { title: 'Paul Rudolph Heritage Foundation', url: 'https://www.paulrudolph.org/' },
      { title: 'Yale University \u2014 Rudolph Hall', url: 'https://www.architecture.yale.edu/about/building' },
      { title: 'Wikidata: Paul Rudolph', url: 'https://www.wikidata.org/wiki/Q1353846' },
    ],
  },

  'john-lautner': {
    slug: 'john-lautner',
    summary: {
      zh: '约翰·劳特纳是好莱坞最疯狂的建筑梦想家。他在陡峭山坡、沙漠岩石和城市天际线上建造出仿佛来自科幻电影的住宅——巨大的混凝土穹顶、悬挑在悬崖边的玻璃盒子、仿佛即将起飞的飞碟屋顶。他是弗兰克·劳埃德·赖特的弟子，却走出了比师父更大胆的道路。',
      ja: 'ジョン·ロートナーはハリウッドのもっとも奔放な建築夢想家である。急峻な斜面、砂漠の岩山、都市のスカイラインに、SF映画から抜け出たかのような住宅を建てた——巨大なコンクリートドーム、崖から張り出すガラスの箱、今にも飛び立ちそうな空飛ぶ円盤の屋根。フランク·ロイド·ライトの弟子だが、師よりさらに大胆な道を歩んだ。',
      en: 'John Lautner was Hollywood\u2019s wildest architectural dreamer. On steep hillsides, desert rocks, and urban skylines, he built houses that seem to emerge from science fiction films \u2014 enormous concrete domes, glass boxes cantilevering off cliffs, flying-saucer roofs poised for takeoff. He was Frank Lloyd Wright\u2019s disciple but walked an even bolder path than his master.',
    },
    core_ideas: {
      zh: [
        '建筑不应只是方盒子，而应该是关于重力、视野和梦想的工程奇迹',
        '每一座住宅都是对特定场地、特定业主和特定景观的独一无二的回应',
        '混凝土不是沉重的材料——当它被塑造成薄壳和拱形时，它可以像帐篷一样轻盈',
        '好莱坞的娱乐文化与严肃建筑学之间不存在真正的边界',
        '赖特教会我如何思考，但我必须找到自己的声音',
      ],
      ja: [
        '建築はただの箱であるべきではない——重力、眺望、夢についての工学的奇跡であるべきだ',
        'あらゆる住宅は、特定の敷地、特定の施主、特定のランドスケープへの唯一無二の応答である',
        'コンクリートは重い素材ではない——薄殻やヴォールトに成形されれば、テントのように軽やかになりうる',
        'ハリウッドのエンターテインメント文化と真摯な建築学のあいだに真の境界はない',
        'ライトは思考の仕方を教えてくれた——しかし私は自分の声を見つけなければならなかった',
      ],
      en: [
        'Architecture should not be just boxes \u2014 it should be an engineering marvel about gravity, views, and dreams',
        'Every house is a unique response to a specific site, a specific client, and a specific landscape',
        'Concrete is not a heavy material \u2014 when shaped into thin shells and arches, it can feel as light as a tent',
        'There is no real boundary between Hollywood entertainment culture and serious architecture',
        'Wright taught me how to think \u2014 but I had to find my own voice',
      ],
    },
    portrait: {
      url: '/images/architects/john-lautner-portrait.jpg',
      author: '',
      license: '',
      source_url: '',
      alt: { zh: '约翰·劳特纳的建筑肖像', ja: 'ジョン·ロートナーの建築肖像', en: 'Portrait of architect John Lautner' },
    },
    sections: [
      {
        title: { zh: '从塔里埃森到洛杉矶：赖特学徒的独立宣言', ja: 'タリアセンからロサンゼルスへ：ライト弟子の独立宣言', en: 'From Taliesin to Los Angeles: A Wright Apprentice\u2019s Declaration of Independence' },
        paragraphs: {
          zh: [
            '约翰·劳特纳1911年生于密歇根州，1933年加入弗兰克·劳埃德·赖特的塔里埃森学徒计划，在这里度过了六年。赖特的"有机建筑"理念——建筑应与自然融合，形式应源自场地和功能——深刻塑造了劳特纳的思维基础。但劳特纳的性格与赖特截然不同：赖特是19世纪浪漫主义者的后代，而劳特纳是20世纪技术乐观主义者的代表。他对工程和结构的兴趣超过了对手工艺和装饰的关注。',
            '1940年代，劳特纳移居洛杉矶，开始了独立执业。当时的洛杉矶正处于战后繁荣期，一批电影界人士、航空工程师和科技企业家——他们渴望的不是传统豪宅，而是能反映他们对未来想象的家。劳特纳找到了完美的主顾。他将赖特的有机原则与洛杉矶的地形、气候和文化结合，创造出一种全新的住宅类型：建筑不再是地上的物体，而是地形本身的延伸。',
            '劳特纳的职业生涯几乎完全围绕住宅展开——他在40多年里设计了超过100座住宅，几乎都在加州。这种"不追求大项目"的姿态使他在建筑史上长期处于边缘地位——他不是医院、博物馆或摩天楼的设计者，而"只是"一个住宅建筑师。但正是这种聚焦，让他得以将住宅这一类型推向了技术和诗意的极致。',
          ],
          ja: [
            'ジョン·ロートナーは1911年ミシガン州に生まれ、1933年にフランク·ロイド·ライトのタリアセン·フェローシップに参加し、ここで六年を過ごした。ライトの「有機的建築」理念——建築は自然と融合すべきであり、形式は敷地と機能から生まれるべきだ——はロートナーの思考の基礎を深く形成した。しかしロートナーの性格はライトとはまったく異なっていた。ライトは19世紀ロマン主義者の末裔であり、ロートナーは20世紀テクノロジー楽観主義者の代表だった。彼の関心は工芸や装飾よりも工学と構造にあった。',
            '1940年代、ロートナーはロサンゼルスに移り、独立して活動を始めた。当時のLAは戦後ブームの真っただ中にあり、映画関係者、航空エンジニア、テクノロジー起業家たちが——伝統的な豪邸ではなく、彼らの未来への想像を映し出す家を求めていた。ロートナーは完璧なパトロンを見つけた。彼はライトの有機的原則をロサンゼルスの地形、気候、文化と結びつけ、まったく新しい住宅類型を創造した——建築はもはや地上の物体ではなく、地形そのものの延長なのである。',
            'ロートナーのキャリアはほぼ完全に住宅を中心に展開した——彼は40年以上にわたり100以上の住宅を設計し、そのほとんどがカリフォルニアにある。この「大規模プロジェクトを追わない」姿勢は、彼を建築史の周縁に長くとどめた——彼は病院や美術館や超高層の設計者ではなく、「ただの」住宅建築家だった。しかしこの集中こそが、彼に住宅という類型を技術と詩情の極限にまで推し進めることを可能にした。',
          ],
          en: [
            'John Lautner was born in Michigan in 1911 and joined Frank Lloyd Wright\u2019s Taliesin Fellowship in 1933, spending six years there. Wright\u2019s philosophy of \u201corganic architecture\u201d \u2014 that buildings should merge with nature and form should arise from site and function \u2014 deeply shaped Lautner\u2019s intellectual foundation. Yet Lautner\u2019s personality was entirely different from Wright\u2019s: Wright was a descendant of 19th-century Romantics, while Lautner represented 20th-century technological optimism. His interest in engineering and structure exceeded his concern for craft and ornament.',
            'In the 1940s, Lautner moved to Los Angeles and began independent practice. Postwar LA was booming, and a clientele of film industry figures, aerospace engineers, and tech entrepreneurs sought not traditional mansions but homes that reflected their imagination of the future. Lautner found his perfect patrons. He combined Wright\u2019s organic principles with Los Angeles topography, climate, and culture, creating an entirely new housing type: architecture was no longer an object on the land but an extension of the topography itself.',
            'Lautner\u2019s career unfolded almost entirely around houses \u2014 he designed over 100 residences across 40-plus years, nearly all in California. This avoidance of \u201cbig projects\u201d long kept him at the margins of architectural history \u2014 he was not a designer of hospitals, museums, or skyscrapers but \u201conly\u201d a residential architect. Yet precisely this focus allowed him to push the house as a type to its technical and poetic extremes.',
          ],
        },
      },
      {
        title: { zh: '飞碟丶穹顶与悬崖：不可思议的工程诗意', ja: '空飛ぶ円盤·ドーム·崖：ありえない工学の詩情', en: 'Flying Saucers, Domes, and Cliffs: The Impossible Poetry of Engineering' },
        paragraphs: {
          zh: [
            '劳特纳最著名的作品——Sheats-Goldstein住宅（1963）——是好莱坞山上一座半嵌入岩石的混凝土住宅，室内天花板上开凿出数百个小玻璃窗像星空一样分布，起居室的玻璃墙俯瞰整个洛杉矶盆地。这座住宅因为频繁出现在电影、MV和时尚广告中而获得了流行文化标志的地位。它既是建筑，也是一种生活方式宣言。',
            'Elrod住宅（1968）建在棕榈泉沙漠的一片岩石山坡上，巨大的圆形混凝土穹顶客厅以一道弧形玻璃墙向峡谷敞开，室内一块天然岩石从地板突出——劳特纳拒绝移除它，让它成为室内空间的中心元素。这座住宅最令人难忘的场景出现在1971年詹姆斯·邦德电影《金刚钻》中。穹顶下的圆形沙发、下沉式对话池和环抱式景观构成了一幅1960年代未来主义奢华生活的完美画面。',
            'Arango住宅（1973）又名"Marbrisa"，坐落在阿卡普尔科的山顶，以一个巨大的开放式混凝土穹顶覆盖主起居空间，穹顶下是一个无边泳池和水槽系统，视野横跨整个海湾。这座住宅没有"墙"——只有结构、流水和风景。劳特纳经常被批评为"形式大于功能"，但事实上他的每一座住宅都是对气候、景观和业主日常生活的精确响应。穹顶不是为了炫技，而是为了在没有空调的时代创造自然通风；悬挑不是为了冲击力，而是为了将视野最大化。',
          ],
          ja: [
            'ロートナーが最もよく知られる作品——シーツ·ゴールドスタイン邸（1963年）——はハリウッド·ヒルズにあり、岩盤に半ば埋め込まれたコンクリート住宅である。室内天井には数百の小さなガラス窓が星空のように散りばめられ、リビングのガラス壁はロサンゼルス盆地全体を見下ろす。この住宅は映画やMV、ファッション広告に頻繁に登場することでポップカルチャーのアイコンとなった。それは建築であると同時に、ライフスタイル宣言でもある。',
            'エルロッド邸（1968年）はパームスプリングスの砂漠の岩山の斜面に建ち、巨大な円形コンクリートドームのリビングが弧状のガラス壁で渓谷に向かって開かれる。室内には天然の岩が床から突き出ている——ロートナーはそれを取り除くことを拒否し、室内空間の中心要素とした。この住宅のもっとも忘れがたい光景は、1971年のジェームズ·ボンド映画『007/ダイヤモンドは永遠に』に登場した場面である。ドームの下の円形ソファ、サンケン·カンバセーション·ピット、包み込むような眺望が、1960年代未来主義的ラグジュアリーライフの完璧な絵をつくりだした。',
            'アランゴ邸（1973年）——別名「マールブリーサ」——はアカプルコの山頂に位置し、巨大なオープンコンクリートドームがメインのリビング空間を覆う。ドームの下にはインフィニティプールと水路システムが配置され、眺望は湾全体にわたる。この住宅には「壁」がない——あるのは構造と流水と風景だけだ。ロートナーはしばしば「機能よりも形式が優先」と批判されたが、実際には彼のあらゆる住宅は気候、ランドスケープ、施主の日常生活への精確な応答である。ドームは誇示のためではなく、エアコンのない時代に自然換気をつくるため。張り出しは衝撃のためではなく、眺望を最大化するため。',
          ],
          en: [
            'Lautner\u2019s best-known work \u2014 the Sheats-Goldstein Residence (1963) \u2014 is a concrete house semi-embedded in the rock of the Hollywood Hills, with hundreds of small glass apertures dotting the ceiling like a starfield, and a living-room glass wall overlooking the entire Los Angeles basin. The house has achieved pop-culture icon status through frequent appearances in films, music videos, and fashion shoots. It is architecture and a lifestyle manifesto at once.',
            'The Elrod House (1968) sits on a rocky hillside in Palm Springs, its enormous circular concrete-dome living room opening to the canyon through a curved glass wall, with a natural boulder protruding from the floor inside \u2014 Lautner refused to remove it, making it the centerpiece of the interior. The house\u2019s most unforgettable moment came in the 1971 James Bond film Diamonds Are Forever. The circular sofa beneath the dome, the sunken conversation pit, and the embracing panorama created the perfect image of 1960s futuristic luxury living.',
            'The Arango House (1973), also known as \u201cMarbrisa,\u201d crowns a hilltop in Acapulco with an enormous open concrete dome sheltering the main living space, beneath which an infinity pool and water-channel system unfold across an entire bay vista. This house has no \u201cwalls\u201d \u2014 only structure, flowing water, and landscape. Lautner was often criticized for valuing form over function, but in truth every one of his houses was a precise response to climate, landscape, and the daily life of its client. The dome was not for show but for natural ventilation in an era without air conditioning; the cantilever was not for impact but to maximize the view.',
          ],
        },
      },
      {
        title: { zh: '好莱坞的边缘天才：流行文化与建筑学的交汇', ja: 'ハリウッドの周縁的天才：ポップカルチャーと建築学の交差点', en: 'Hollywood\u2019s Marginal Genius: Where Pop Culture Meets Architecture' },
        paragraphs: {
          zh: [
            '劳特纳在建筑学正统中的地位一直尴尬。他在世时从未获得AIA金奖或普利兹克奖，极少被邀请在建筑学院演讲，他的作品也很少出现在主流建筑杂志上。建筑评论界倾向于将他视为一个怪才——太商业化、太娱乐化、太"好莱坞"。但他的住宅却成了无数电影、广告和音乐视频的背景，塑造了全球对"未来之家"的想象。',
            '这种"学术忽略、流行追捧"的矛盾本身就说明了很多问题。劳特纳的作品证明：严肃的建筑学创新不一定发生在美术馆和音乐厅里，它也可以发生在一座住宅的穹顶下。他对混凝土薄壳结构、大跨度玻璃和陡坡施工技术的贡献，实际上远超许多在书斋里写作理论的人。',
            '近年来，随着"太空时代设计"（Space Age Design）美学的复兴，劳特纳的作品受到越来越多年轻建筑师和设计师的关注。他的Sheats-Goldstein住宅现在由LACMA（洛杉矶郡艺术博物馆）管理并有限度对公众开放。劳特纳证明了：建筑可以是奇观，而奇观不必是肤浅的。他于1994年去世，但他留下的那些仿佛不属于这个星球的住宅，至今仍在提醒我们：建筑可以超越重力——不仅是物理上的，还有想象力的重力。',
          ],
          ja: [
            'ロートナーの建築学正統における位置づけは常に気まずいものだった。存命中、AIAゴールドメダルもプリツカー賞も受賞せず、建築学校で講演に招かれることも稀で、彼の作品が主要な建築雑誌に掲載されることもめったになかった。建築批評界は彼を奇才と見なす傾向があった——商業的すぎ、娯楽的すぎ、「ハリウッド的」すぎる。しかし彼の住宅は無数の映画、広告、ミュージックビデオの舞台となり、世界中の「未来の家」の想像を形作った。',
            'この「学術的無視、大衆的熱狂」の矛盾そのものが多くを語っている。ロートナーの作品が証明する——真摯な建築学的革新は美術館やコンサートホールで起こるとは限らない。それは一軒の住宅のドームの下でも起こりうるのだ。コンクリート薄殻構造、大スパングラス、急傾斜地施工技術への彼の貢献は、実際には書斎で理論を書く多くの人々をはるかに超えている。',
            '近年、「スペースエイジデザイン」美学の復興にともない、ロートナーの作品はますます多くの若手建築家やデザイナーの注目を集めている。彼のシーツ·ゴールドスタイン邸は現在LACMA（ロサンゼルス郡美術館）が管理し、限定的に一般公開されている。ロートナーは証明した——建築はスペクタクルでありうる、そしてスペクタクルは浅薄である必要はない。彼は1994年に死去したが、彼が残したこの惑星に属さないかのような住宅群は、今なお私たちに思い出させる——建築は重力を超えうる。物理的な重力だけでなく、想像力の重力をも。',
          ],
          en: [
            'Lautner\u2019s position within architectural orthodoxy was always awkward. He never received the AIA Gold Medal or the Pritzker Prize in his lifetime, was rarely invited to lecture at architecture schools, and his work seldom appeared in mainstream architecture magazines. The architectural critical establishment tended to view him as an eccentric \u2014 too commercial, too entertaining, too \u201cHollywood.\u201d Yet his houses became backdrops for countless films, advertisements, and music videos, shaping the global imagination of the \u201chome of the future.\u201d',
            'This contradiction \u2014 scholarly neglect and popular embrace \u2014 speaks volumes. Lautner\u2019s work proves that serious architectural innovation does not have to happen in museums and concert halls; it can happen beneath the dome of a private house. His contributions to thin-shell concrete structures, large-span glazing, and steep-slope construction technology actually surpass those of many who merely write theory from the study.',
            'In recent years, with the revival of Space Age Design aesthetics, Lautner\u2019s work has drawn increasing attention from younger architects and designers. His Sheats-Goldstein Residence is now managed by LACMA (Los Angeles County Museum of Art) with limited public access. Lautner proved: architecture can be spectacle, and spectacle need not be shallow. He died in 1994, but the houses he left behind \u2014 seeming not to belong to this planet \u2014 continue to remind us: architecture can transcend gravity \u2014 not just physical gravity, but the gravity of imagination.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'sheats-goldstein-residence', note: { zh: '好莱坞山中的混凝土星空洞穴，玻璃天花板下数百个小窗像星座一样闪烁，洛杉矶在脚下展开。', ja: 'ハリウッドヒルズのコンクリート星空洞窟。ガラス天井の数百の小さな窓が星座のように瞬き、ロサンゼルスが足下に広がる。', en: 'A concrete star-cave in the Hollywood Hills, where hundreds of tiny ceiling windows twinkle like constellations and Los Angeles spreads below.' } },
      { slug: 'elrod-house', note: { zh: '沙漠岩石上的圆形穹顶客厅，詹姆斯·邦德的银幕之家，室内天然岩石成为空间的中心纪念碑。', ja: '砂漠の岩山に立つ円形ドームのリビング。ジェームズ·ボンドの映画の家。室内の天然の岩が空間の中心的記念碑となる。', en: 'A circular-domed living room on desert rock, James Bond\u2019s screen home, with a natural boulder serving as the spatial centerpiece.' } },
      { slug: 'arango-house', note: { zh: '阿卡普尔科山顶的无墙之家，穹顶+无边泳池+海湾全景，展现了建筑如何消解在风景和流水中。', ja: 'アカプルコ山頂の壁なき家。ドーム＋インフィニティプール＋湾のパノラマ。建築が風景と流水に溶けていくさまを示す。', en: 'A wall-less house atop an Acapulco hill, dome + infinity pool + bay panorama, demonstrating how architecture dissolves into landscape and water.' } },
    ],
    sources: [
      { title: 'The John Lautner Foundation', url: 'https://www.johnlautner.org/' },
      { title: 'LACMA \u2014 Sheats-Goldstein House', url: 'https://www.lacma.org/sheatsgoldstein' },
      { title: 'Wikidata: John Lautner', url: 'https://www.wikidata.org/wiki/Q363656' },
    ],
  },

  'kunio-maekawa': {
    slug: 'kunio-maekawa',
    summary: {
      zh: '前川国男是日本现代建筑从模仿到自信的转折点。他是柯布西耶在巴黎工作室的首位日本弟子，回国后不仅带来了现代主义的语言，更催化了日本战后建筑从丹下健三到槙文彦的整条谱系。他的东京文化会馆是日本现代主义的里程碑。',
      ja: '前川国男は日本の近代建築が模倣から自信へと転換する転換点である。パリのコルビュジエ事務所で最初の日本人弟子となり、帰国後はモダニズムの言語をもたらしただけでなく、丹下健三から槇文彦に至る戦後日本建築の全系譜を触媒した。東京文化会館は日本モダニズムの金字塔である。',
      en: 'Kunio Maekawa marks the turning point where Japanese modern architecture moved from imitation to confidence. As Le Corbusier\u2019s first Japanese apprentice in Paris, he not only brought the language of modernism back to Japan but catalyzed the entire lineage of postwar Japanese architecture from Kenzo Tange to Fumihiko Maki. His Tokyo Bunka Kaikan is a milestone of Japanese modernism.',
    },
    core_ideas: {
      zh: [
        '现代主义不是欧洲的专利——它可以也应该被转化以适应日本的气候丶材料和文化',
        '建筑是社会责任的实践，尤其是公共文化建筑应该向市民慷慨开放',
        '混凝土不是对传统的否定，而是可以与传统日本木构的空间逻辑结合',
        '技术与人情不是对立物——好的建筑应该同时满足工程理性和人的感性需求',
        '建筑师必须关注城市整体而不仅仅是单个建筑——前川是日本最早实践综合城市设计的人之一',
      ],
      ja: [
        'モダニズムはヨーロッパの専売特許ではない——日本の気候、素材、文化に適応するよう転換されうるし、されるべきである',
        '建築は社会的責任の実践であり、とりわけ公共文化建築は市民に寛大に開かれるべきである',
        'コンクリートは伝統の否定ではなく、むしろ伝統的日本木造の空間論理と結びつきうる',
        '技術と人間性は対立物ではない——優れた建築は工学的合理性と人の感性的欲求を同時に満たすべきである',
        '建築家は単体の建築だけでなく都市全体を注視しなければならない——前川は日本で最初に総合都市デザインを実践した一人である',
      ],
      en: [
        'Modernism is not a European monopoly \u2014 it can and should be adapted to suit Japan\u2019s climate, materials, and culture',
        'Architecture is the practice of social responsibility; public cultural buildings especially should be generously open to citizens',
        'Concrete is not a negation of tradition but can be combined with the spatial logic of traditional Japanese timber construction',
        'Technology and humanity are not opposites \u2014 good architecture should satisfy both engineering rationality and human sensibility',
        'Architects must attend to the whole city, not just individual buildings \u2014 Maekawa was among the first in Japan to practice comprehensive urban design',
      ],
    },
    portrait: {
      url: '/images/architects/kunio-maekawa-portrait.jpg',
      author: '',
      license: '',
      source_url: '',
      alt: { zh: '前川国男的建筑肖像', ja: '前川国男の建築肖像', en: 'Portrait of architect Kunio Maekawa' },
    },
    sections: [
      {
        title: { zh: '柯布的日本传人：从巴黎到东京的现代主义接力', ja: 'コルビュジエの日本伝承者：パリから東京へのモダニズムリレー', en: 'Corbusier\u2019s Japanese Disciple: The Modernist Relay from Paris to Tokyo' },
        paragraphs: {
          zh: [
            '前川国男1905年生于新潟，1928年从东京帝国大学建筑学科毕业后前往巴黎，成为勒·柯布西耶工作室的首位日本弟子。他在柯布西耶的事务所工作了两年（1928-1930），参与了萨伏伊别墅等经典项目的部分工作。这段经历深刻地决定了他的一生——他不仅学会了现代建筑的"语言"，更理解了现代建筑背后关于社会、技术和城市的完整思想体系。',
            '1930年回国后，前川在安东尼·雷蒙德事务所工作，1935年独立开业。他的早期作品——如前川国男自邸（1942）——尝试将柯布西耶的现代主义语法与日本传统空间概念结合。战争期间，日本建筑活动基本停滞，但这反而给了前川和他的同代人一个反思和吸收的机会。1945年战败后，日本进入了重建时代，前川迎来了他职业生涯的黄金时期。',
            '前川不仅自身是一位杰出的建筑师，还是日本现代建筑谱系的关键节点。丹下健三曾在东京帝国大学参加过前川的回演讲，后来在前川事务所工作了四年（1938-1941）。可以说，从柯布西耶→前川国男→丹下健三→矶崎新/槙文彦这条线，构成了日本战后建筑最重要的师承脉络之一。前川的角色是这个链条中第一个"日本化"的环节。',
          ],
          ja: [
            '前川国男は1905年新潟に生まれ、1928年東京帝国大学建築学科卒業後パリに渡り、ル·コルビュジエ事務所の最初の日本人弟子となった。彼はコルビュジエの事務所に二年間（1928-1930）留まり、サヴォア邸などの古典的プロジェクトの一部に参加した。この経験は彼の生涯を深く決定づけた——近代建築の「言語」を学んだだけでなく、近代建築の背後にある社会、技術、都市についての完全な思想体系を理解したのである。',
            '1930年帰国後、前川はアントニン·レーモンド事務所に勤務し、1935年に独立した。彼の初期作品——前川国男自邸（1942年）など——はコルビュジエのモダニズム文法と日本の伝統的空間概念の結合を試みている。戦時中、日本の建築活動はほぼ停滞したが、これはかえって前川と同世代の人々に反省と吸収の機会を与えた。1945年の敗戦後、日本は再建時代に入り、前川はキャリアの黄金期を迎えた。',
            '前川は自ら優れた建築家であるだけでなく、日本近代建築の系譜の鍵となる結節点でもある。丹下健三は東京帝国大学で前川の帰国講演に参加し、後に前川事務所で四年間（1938-1941）働いた。コルビュジエ→前川国男→丹下健三→磯崎新／槇文彦という線は、戦後日本建築のもっとも重要な師弟系譜の一つを構成している。前川の役割はこの連鎖における最初の「日本化」の環である。',
          ],
          en: [
            'Kunio Maekawa was born in Niigata in 1905 and, after graduating from Tokyo Imperial University\u2019s architecture department in 1928, traveled to Paris to become Le Corbusier\u2019s first Japanese apprentice. He worked in Corbusier\u2019s office for two years (1928\u20131930), participating in parts of classic projects such as the Villa Savoye. This experience decisively shaped his life \u2014 he not only learned the \u201clanguage\u201d of modern architecture but grasped the entire intellectual system behind it concerning society, technology, and the city.',
            'After returning to Japan in 1930, Maekawa worked in Antonin Raymond\u2019s office before establishing his own practice in 1935. Early works \u2014 such as the Maekawa House (1942) \u2014 attempted to combine Corbusier\u2019s modernist grammar with traditional Japanese spatial concepts. During the war, architectural activity in Japan largely halted, but this paradoxically gave Maekawa and his generation a period for reflection and absorption. After the defeat of 1945, Japan entered an era of reconstruction, and Maekawa\u2019s golden period began.',
            'Maekawa was not only an outstanding architect himself but a key node in the genealogy of Japanese modern architecture. Kenzo Tange attended Maekawa\u2019s return lecture at Tokyo Imperial University and later worked in Maekawa\u2019s office for four years (1938\u20131941). One could say the line Corbusier \u2192 Maekawa \u2192 Tange \u2192 Isozaki/Maki constitutes one of postwar Japanese architecture\u2019s most important lineages of transmission. Maekawa\u2019s role was the first \u201cJapanization\u201d link in this chain.',
          ],
        },
      },
      {
        title: { zh: '东京文化会馆与混凝土的日本表情', ja: '東京文化会館とコンクリートの日本的表情', en: 'Tokyo Bunka Kaikan and the Japanese Expression of Concrete' },
        paragraphs: {
          zh: [
            '东京文化会馆（1961）是前川国男的巅峰之作，也是日本现代主义建筑史上的一座里程碑。这座位于上野公园的表演艺术中心，以其巨大的悬挑屋顶、锯齿形外立面和精湛的混凝土工艺展现了前川的成熟语言。它不是柯布西耶的简单复制——前川在混凝土表面引入了日本传统木构的比例感和细腻肌理，创造出一种独特的"日式粗野主义"。',
            '前川的混凝土处理方式非常特别。他不追求柯布西耶式的粗犷原始（béton brut），而是在模板和脱模剂上做了许多实验，让混凝土表面呈现出一种温润的质感。配合精确的比例控制和水平/垂直构件的节奏感，他的建筑在粗野主义的外表下隐藏了日式建筑特有的节制和平静。',
            '在空间组织上，前川也展现了日本传统空间的智慧。东京文化会馆的大厅不是一个被动的过渡空间，而是一个多层次的社交场所，层叠的阳台、楼梯和连廊让空间充满了纵向流动性和人与人之间的视线联系。主音乐厅则体现了对声学性能的极致追求——前川邀请当时最优秀的声学专家合作，使其至今仍是东京最好的古典音乐演出场所之一。',
          ],
          ja: [
            '東京文化会館（1961年）は前川国男の頂点的作品であり、日本モダニズム建築史上の一里程標である。この上野公園に位置する舞台芸術センターは、巨大な張り出し屋根、鋸歯状のファサード、精妙なコンクリート工芸によって前川の成熟した言語を示している。それはコルビュジエの単純な複製ではない——前川はコンクリート表面に日本の伝統的木造の比例感覚と細やかなテクスチャを導入し、独自の「日本的ブルータリズム」を創造した。',
            '前川のコンクリート処理方法はきわめて独特である。彼はコルビュジエ式の粗野な原初（ベトン·ブリュット）を追求せず、むしろ型枠と離型剤に多くの実験を施し、コンクリート表面に温かみのある質感をもたせた。精確なプロポーション制御と水平／垂直部材のリズム感と相まって、彼の建築はブルータリズムの外観の下に日本建築特有の節制と静けさを隠している。',
            '空間構成においても、前川は日本の伝統的空間の知恵を示した。東京文化会館のホワイエは受動的な通過空間ではなく、多層的な社交の場である。層をなすバルコニー、階段、連絡通路が空間に縦の流動性と人と人のあいだの視線のつながりを満たしている。主ホールは音響性能の極限的な追求を示す——前川は当時もっとも優れた音響専門家を招いて協働し、このホールは今日なお東京で最高のクラシック音楽公演会場の一つである。',
          ],
          en: [
            'Tokyo Bunka Kaikan (1961) is Maekawa\u2019s culminating work and a milestone in the history of Japanese modernist architecture. This performing arts center in Ueno Park demonstrates Maekawa\u2019s mature language through its enormous cantilevered roof, zigzag fa\u00e7ade, and superb concrete craftsmanship. It is no simple copy of Corbusier \u2014 Maekawa introduced the proportional sensibility and delicate texture of traditional Japanese timber construction into concrete surfaces, creating a distinctive \u201cJapanese Brutalism.\u201d',
            'Maekawa\u2019s approach to concrete is highly distinctive. Rather than pursuing Corbusier\u2019s raw beton brut, he experimented extensively with formwork and release agents so that the concrete surface acquired a warm, tactile quality. Combined with precise proportional control and the rhythmic articulation of horizontal and vertical members, his buildings conceal the restraint and tranquility characteristic of Japanese architecture beneath a Brutalist exterior.',
            'In spatial organization too, Maekawa displayed the wisdom of traditional Japanese space. The foyer of Tokyo Bunka Kaikan is not a passive transitional space but a multi-layered social arena where cascading balconies, stairs, and bridges fill the space with vertical fluidity and visual connections between people. The main concert hall embodies an extreme pursuit of acoustic performance \u2014 Maekawa invited the finest acoustical experts of the day to collaborate, and the hall remains one of Tokyo\u2019s best venues for classical music.',
          ],
        },
      },
      {
        title: { zh: '广岛与和平：公共建筑师的公民责任', ja: '広島と平和：公共建築家の市民的責任', en: 'Hiroshima and Peace: The Civic Responsibility of a Public Architect' },
        paragraphs: {
          zh: [
            '广岛和平纪念资料馆竞赛（1951-1955）是前川国男职业生涯中最具象征意义的项目。虽然最终实施的设计由丹下健三主导，但前川作为评审和早期方案的参与者，对这个具有国际意义的地标做出了重要贡献。此后，前川在广岛完成了一系列和平相关的公共建筑——广岛和平纪念教堂（1954，已不存）、广岛市公会堂（1955）等——这些作品将现代建筑语言与对和平的呼吁融合在一起。',
            '前川国男是一位坚定的"公共建筑师"。他的大部分重要作品都是公共文化设施：博物馆、音乐厅、图书馆、政府大楼。他认为建筑师的首要责任不是为私人资本服务，而是为市民创造更好的共享空间。这种公共导向的精神在日本战后民主化进程中具有特殊意义——新的公共建筑象征着新的市民社会。',
            '在方法论上，前川是日本最早实践"综合设计"的建筑师之一。他不仅设计建筑本身，还深度参与家具、标识、景观乃至城市规划的设计。埼玉会馆（1966）、国立西洋美术馆（与柯布西耶合作，1959年完成）等项目都展现了他对"整体环境"的控制力。他于1986年去世，享年81岁。他的一生跨越了日本从战前帝国主义到战后经济奇迹的整个转变，而他的建筑忠实地记录了这段历史。',
          ],
          ja: [
            '広島平和記念資料館コンペ（1951-1955）は前川国男のキャリアでもっとも象徴的なプロジェクトである。最終的に実施されたデザインは丹下健三が主導したが、前川は審査員および初期案の参加者として、この国際的意義をもつランドマークに重要な貢献をした。その後、前川は広島で一連の平和関連公共建築——広島平和記念聖堂（1954年、現在は現存せず）、広島市公会堂（1955年）など——を完成させた。これらの作品は近代建築言語と平和への呼びかけを融合させている。',
            '前川国男は確固たる「公共建築家」だった。彼の重要な作品のほとんどは公共文化施設——美術館、コンサートホール、図書館、庁舎——である。彼は建築家の第一の責任は民間資本に奉仕することではなく、市民のためにより良い共有空間を創造することだと考えた。この公共志向の精神は日本の戦後民主化プロセスにおいて特別な意味をもつ——新しい公共建築は新しい市民社会を象徴するものだった。',
            '方法論において、前川は日本で最初に「総合デザイン」を実践した建築家の一人である。彼は建築本体だけでなく、家具、サイン、ランドスケープ、さらには都市計画のデザインにも深く関与した。埼玉会館（1966年）、国立西洋美術館（コルビュジエとの協働、1959年完成）などのプロジェクトは、「総合的環境」への彼のコントロール力を示している。彼は1986年に81歳で死去した。彼の生涯は日本の戦前帝国主義から戦後経済奇跡までの全変貌にわたり、彼の建築はその歴史を忠実に記録している。',
          ],
          en: [
            'The Hiroshima Peace Memorial Museum competition (1951\u20131955) was the most symbolically charged project of Maekawa\u2019s career. Though the final built design was led by Kenzo Tange, Maekawa, as a juror and participant in early proposals, made important contributions to this landmark of international significance. Subsequently, Maekawa completed a series of peace-related public buildings in Hiroshima \u2014 the Hiroshima Peace Memorial Cathedral (1954, no longer extant), Hiroshima City Auditorium (1955), and others \u2014 works that fused the language of modern architecture with an appeal for peace.',
            'Kunio Maekawa was a resolutely \u201cpublic\u201d architect. Most of his significant works are public cultural facilities: museums, concert halls, libraries, government buildings. He believed the architect\u2019s primary responsibility was not to serve private capital but to create better shared spaces for citizens. This public-oriented ethos held particular significance in Japan\u2019s postwar democratization process \u2014 new public buildings symbolized a new civil society.',
            'Methodologically, Maekawa was among the first Japanese architects to practice \u201cintegrated design.\u201d He was deeply involved not only in the building itself but also in the design of furniture, signage, landscape, and even urban planning. Projects such as Saitama Hall (1966) and the National Museum of Western Art (realized in collaboration with Le Corbusier, completed 1959) demonstrate his control over the \u201ctotal environment.\u201d He died in 1986 at 81. His life spanned Japan\u2019s entire transformation from prewar imperialism to postwar economic miracle, and his architecture faithfully records that history.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'tokyo-bunka-kaikan', note: { zh: '上野公园的混凝土杰作，巨大的悬挑屋顶像飞鸟展翅，是日本现代主义最具纪念性的公共建筑之一。', ja: '上野公園のコンクリート傑作。巨大な張り出し屋根が飛鳥の翼のように展開する、日本モダニズムのもっとも記念碑的公共建築の一つ。', en: 'A concrete masterpiece in Ueno Park, its enormous cantilevered roof spreading like a bird in flight \u2014 one of Japanese modernism\u2019s most monumental public buildings.' } },
      { slug: 'national-museum-of-western-art', note: { zh: '与柯布西耶合作完成的东京美术馆，是师徒关系的建筑结晶，也是日本理解西方现代主义的窗口。', ja: 'コルビュジエと協働して完成した東京の美術館。師弟関係の建築的結晶であり、日本が西洋モダニズムを理解する窓口でもある。', en: 'A Tokyo museum completed in collaboration with Le Corbusier, the architectural crystallization of the master-disciple relationship and a window through which Japan understood Western modernism.' } },
      { slug: 'fukuoka-art-museum', note: { zh: '晚年代表作，以水平延展的体量和内向庭院展现了前川对"日本式现代"的最终理解。', ja: '晩年の代表作。水平に展開するボリュームと内向きの中庭が、「日本的モダン」への前川の最終的理解を示す。', en: 'A late-career masterwork, with horizontally extending volumes and an inward-facing courtyard revealing Maekawa\u2019s final understanding of \u201cJapanese modern.\u201d' } },
    ],
    sources: [
      { title: 'Tokyo Bunka Kaikan Official Site', url: 'https://www.t-bunka.jp/' },
      { title: 'Maekawa Kunio \u2014 Docomomo Japan', url: 'https://www.docomomojapan.com/architect/maekawa-kunio/' },
      { title: 'Wikidata: Kunio Maekawa', url: 'https://www.wikidata.org/wiki/Q1365670' },
    ],
  },

  'eduardo-souto-de-moura': {
    slug: 'eduardo-souto-de-moura',
    summary: {
      zh: '艾德瓦尔多·苏托·德·莫拉是葡萄牙建筑低调而坚定的代言人。在阿尔瓦罗·西塞·维埃拉的影响和密斯·凡·德·罗的精神之间，他找到了属于自己的路径：一种既根植于葡萄牙大地和工艺传统、又在抽象和精确性上达到国际水准的建筑。他于2011年获得普利兹克奖。',
      ja: 'エドゥアルド·ソウト·デ·モウラはポルトガル建築の控えめで確固たる代弁者である。アルヴァロ·シザ·ヴィエイラの影響とミース·ファン·デル·ローエの精神のあいだで、彼は自らの道を見出した——ポルトガルの大地と工芸の伝統に根ざしながら、抽象性と精確性において国際的水準に達する建築である。2011年プリツカー賞受賞。',
      en: 'Eduardo Souto de Moura is the understated yet resolute voice of Portuguese architecture. Between the influence of Álvaro Siza Vieira and the spirit of Mies van der Rohe, he found his own path: an architecture rooted in Portuguese land and craft tradition while achieving abstraction and precision at an international level. He received the Pritzker Prize in 2011.',
    },
    core_ideas: {
      zh: [
        '建筑不是发明新形式，而是对已存在的事物——场地丶材料丶历史——做出精确的回应',
        '沉默是一种建筑品质：好的建筑不需要大声喊叫',
        '密斯教会我精确，西塞教会我自由，葡萄牙教会我材料',
        '废墟和未完成状态比完整的建筑更能揭示建筑的本质',
        '普利兹克奖不是终点——它只是提醒你，你做的事情被人看到了',
      ],
      ja: [
        '建築は新しい形式の発明ではなく、すでに存在するもの——敷地、素材、歴史——への精確な応答である',
        '沈黙は建築的品質である——優れた建築は大声で叫ぶ必要がない',
        'ミースは精確さを教え、シザは自由を教え、ポルトガルは素材を教えた',
        '廃墟と未完成の状態は、完成した建築よりも建築の本質を明らかにすることがある',
        'プリツカー賞は終点ではない——自分のやっていることが誰かに見られたと気づかせるだけだ',
      ],
      en: [
        'Architecture is not the invention of new forms but the precise response to what already exists \u2014 site, material, history',
        'Silence is an architectural quality: good architecture need not shout',
        'Mies taught me precision, Siza taught me freedom, Portugal taught me materials',
        'Ruins and incompleteness can reveal the essence of architecture more than finished buildings',
        'The Pritzker is not the endpoint \u2014 it merely reminds you that someone noticed what you are doing',
      ],
    },
    portrait: {
      url: '/images/architects/eduardo-souto-de-moura-portrait.jpg',
      author: '',
      license: '',
      source_url: '',
      alt: { zh: '艾德瓦尔多·苏托·德·莫拉的建筑肖像', ja: 'エドゥアルド·ソウト·デ·モウラの建築肖像', en: 'Portrait of architect Eduardo Souto de Moura' },
    },
    sections: [
      {
        title: { zh: '在西塞与密斯之间：波尔图学派的传人', ja: 'シザとミースのあいだ：ポルト学派の継承者', en: 'Between Siza and Mies: Heir of the Porto School' },
        paragraphs: {
          zh: [
            '苏托·德·莫拉1952年生于波尔图，在波尔图美术学院学习建筑，期间在阿尔瓦罗·西塞·维埃拉的事务所工作（1974-1979）。这段师从经历至关重要：他从西塞那里学到了对场地和地形的敏感性、对材料质感的关注、以及如何让建筑看起来"本来就属于那里"。但苏托·德·莫拉不是西塞的复制品——他的性格更加古典，更接近于密斯式的抽象和精确。',
            '1980年独立开业后，苏托·德·莫拉完成了一系列引人注目的私人住宅——这些作品通常使用当地石材和混凝土，以极其克制的方式回应葡萄牙北部的地形和气候。其中，位于布拉加的Bom Jesus住宅（1994）和Moledo住宅（1998）展现了他在"古典比例+现代抽象+乡土材料"三者之间寻找平衡的能力。',
            '苏托·德·莫拉的一个重要方法论是他对"边界"（boundary）的持续关注。他的建筑经常坐落在城市与乡村、人工与自然的交界处，而他对建筑边缘的处理——墙体如何终止、屋顶如何收边、建筑如何触碰地面——展现出一种近乎执念的精确性。这种精确性来自密斯，但运用的语境完全是葡萄牙的。',
          ],
          ja: [
            'ソウト·デ·モウラは1952年ポルトに生まれ、ポルト美術学校で建築を学ぶかたわら、アルヴァロ·シザ·ヴィエイラの事務所で働いた（1974-1979）。この師弟経験は決定的だった——彼はシザから敷地と地形への感受性、素材の質感への注意、建築を「もともとそこにあったかのように」見せる方法を学んだ。しかしソウト·デ·モウラはシザの複製ではない——彼の性格はより古典的で、ミース的な抽象と精確さに近い。',
            '1980年に独立した後、ソウト·デ·モウラは注目すべき一連の個人住宅を完成させた——これらの作品は通常地元の石材とコンクリートを使用し、きわめて抑制された方法でポルトガル北部の地形と気候に応答している。なかでもブラガのボン·ジェズス邸（1994年）とモレド邸（1998年）は、「古典的比例＋現代的抽象＋土着的素材」のあいだにバランスを見出す彼の能力を示している。',
            'ソウト·デ·モウラの重要な方法論の一つは「境界」への持続的関心である。彼の建築はしばしば都市と田園、人工と自然の接点に位置し、建築の縁の処理——壁がいかに終わるか、屋根がいかに縁取られるか、建築がいかに地面に触れるか——はほとんど執念に近い精確さを示す。この精確さはミースに由来するが、運用される文脈は完全にポルトガルのものである。',
          ],
          en: [
            'Souto de Moura was born in Porto in 1952 and studied architecture at the Porto School of Fine Arts while working in Álvaro Siza Vieira\u2019s office (1974\u20131979). This apprenticeship was decisive: from Siza he learned sensitivity to site and topography, attention to material texture, and how to make a building appear as though it \u201chad always been there.\u201d But Souto de Moura is no replica of Siza \u2014 his temperament is more classical, closer to Miesian abstraction and precision.',
            'After establishing his own practice in 1980, Souto de Moura completed a striking series of private houses \u2014 works typically employing local stone and concrete, responding with extreme restraint to the topography and climate of northern Portugal. Among them, the Bom Jesus House in Braga (1994) and the Moledo House (1998) demonstrate his capacity to find balance among \u201cclassical proportion + modern abstraction + vernacular materials.\u201d',
            'A key methodological concern for Souto de Moura is his sustained attention to boundaries. His buildings often sit at the juncture of city and countryside, artificial and natural, and his treatment of architectural edges \u2014 how walls terminate, how roofs finish, how buildings touch the ground \u2014 exhibits an almost obsessive precision. This precision comes from Mies, but the context in which it operates is entirely Portuguese.',
          ],
        },
      },
      {
        title: { zh: '布拉加球场与地貌建筑学', ja: 'ブラガ競技場と地形建築学', en: 'Braga Stadium and Topographic Architecture' },
        paragraphs: {
          zh: [
            '布拉加市政体育场（Estádio Municipal de Braga, 2003）是苏托·德·莫拉最具野心的作品，为2004年欧洲杯而建。这座体育场最惊人的决定是：苏托·德·莫拉把场地选在一个废弃的采石场中，将球场嵌入山体的切口——看台只有两侧，两端直接面对裸露的岩石崖壁。这一"减法"策略使体育场成为地形本身的延续，而不是一个强加于风景之上的外来物体。',
            '体育场的两片看台由巨大的混凝土悬挑顶盖遮蔽，顶盖下方悬挂着钢索拉起的薄膜结构。这些顶盖像两只翅膀从山坡上伸出，既提供了遮阳遮雨的功能，又赋予建筑一种轻与重、固态与张力之间的戏剧性对比。在工程层面，将一座可容纳3万人的体育场嵌入花岗岩山体，本身就是一项惊人的技术成就。',
            '布拉加体育场让苏托·德·莫拉在国际上获得了广泛认可。评审团称赞这座建筑"与场地的力量感和原始感对话，同时保持了建筑学的纪律和优雅"。这个项目也清晰地表达了他的核心信念：最有力的建筑姿态不是添加，而是揭示——揭示场地已经存在的潜能。',
          ],
          ja: [
            'ブラガ市営競技場（2003年）はソウト·デ·モウラのもっとも野心的な作品であり、EURO 2004のために建設された。このスタジアムのもっとも驚くべき決定は——ソウト·デ·モウラは敷地を廃採石場に選び、ピッチを山体の切込みに埋め込んだ。観客席は二面のみで、両端はむき出しの岩壁に直接向かい合う。この「減法」戦略により、スタジアムは地形そのものの延長となり、風景に押し付けられた外来物ではなくなった。',
            'スタジアムの二つの観客席は巨大なコンクリート張り出し屋根に覆われ、屋根の下には鋼索で張られた膜構造が吊られている。これらの屋根は二枚の翼が山腹から伸びるかのようであり、日除け·雨除けの機能を果たすと同時に、軽と重、固体と張力のあいだの演劇的対比を建築に与えている。工学的レベルでは、3万人収容のスタジアムを花崗岩の山体に埋め込むこと自体が驚異的な技術的達成である。',
            'ブラガ競技場はソウト·デ·モウラに国際的な認知をもたらした。審査員はこの建築を「敷地の力感と原初感との対話を保ちつつ、建築学の規律と優雅さを維持している」と称賛した。このプロジェクトは彼の核心的信条を明確に表現している——もっとも力強い建築的所作は付加ではなく、開示であること——敷地にすでに存在する潜在力を開示すること。',
          ],
          en: [
            'The Estádio Municipal de Braga (2003) is Souto de Moura\u2019s most ambitious work, built for Euro 2004. The most astonishing decision: Souto de Moura sited the stadium in a disused quarry, embedding the pitch into a cut in the mountain \u2014 stands on only two sides, with the ends facing directly onto exposed rock cliffs. This \u201csubtractive\u201d strategy made the stadium an extension of the topography itself, not a foreign object imposed on the landscape.',
            'The two stands are sheltered by enormous cantilevered concrete canopies, beneath which steel-cable-tensioned membrane structures are suspended. These canopies extend like two wings from the hillside, providing sun and rain protection while lending the building a dramatic contrast between lightness and weight, solidity and tension. At the engineering level, embedding a 30,000-capacity stadium into a granite mountain is itself a remarkable technical achievement.',
            'Braga Stadium earned Souto de Moura wide international recognition. The jury praised the building for \u201cengaging in dialogue with the power and rawness of the site while maintaining architectural discipline and elegance.\u201d The project clearly articulates his core belief: the most powerful architectural gesture is not addition but revelation \u2014 revealing the potential already present in the site.',
          ],
        },
      },
      {
        title: { zh: '普利兹克之后：建筑师的沉默宣言', ja: 'プリツカー以後：建築家の沈黙宣言', en: 'After the Pritzker: An Architect\u2019s Manifesto of Silence' },
        paragraphs: {
          zh: [
            '2011年普利兹克奖颁给苏托·德·莫拉时，很多人感到意外——在这个奖项越来越倾向于颁发给"明星建筑师"的时代，苏托·德·莫拉的安静、谨慎和区域性显得格格不入。但评审团的引文精准地捕捉了他的价值："他的建筑具有一种独特的能力，能够同时传达看似冲突的特征——力量与谦逊、粗犷与细腻、公开的公共性又私密的亲密感。"',
            '获奖后，苏托·德·莫拉没有像许多普利兹克得主那样走向全球化和大规模项目。他继续在波尔图经营一个小型事务所，继续做他一直在做的事情——住宅、小型公共建筑、修复项目。他的Casa das Histórias Paula Rego（2009）是一个博物馆，却像一座低调的雕塑，用红色的混凝土体量来回应画家的作品世界。这种"不扩张"的选择本身就是一种宣言。',
            '苏托·德·莫拉的职业生涯告诉我们：建筑学的价值不一定由规模和数量来衡量。在一个追求速度和奇观的时代，他选择慢下来，选择精确，选择让建筑看起来"毫不费力"——尽管这种毫不费力的背后是巨大的努力。他是葡萄牙建筑"波尔图学派"的第二代核心，证明了在全球化浪潮中，根植于地域的建筑仍然可以具有普适的说服力。',
          ],
          ja: [
            '2011年のプリツカー賞がソウト·デ·モウラに授与されたとき、多くの人が意外に思った——この賞がますます「スター建築家」に授与される傾向にある時代にあって、ソウト·デ·モウラの静けさ、慎重さ、地域性は異質に見えた。しかし審査員の引用文は彼の価値を精確に捉えている：「彼の建築は、一見衝突するように見える特性——力と謙遜、粗野と繊細、公的な公共性と私的な親密さ——を同時に伝える独特の能力をもつ。」',
            '受賞後、ソウト·デ·モウラは多くのプリツカー受賞者のようにグローバル化と大規模プロジェクトへ向かわなかった。彼はポルトで小規模な事務所を続け、これまでずっとやってきたこと——住宅、小規模公共建築、修復プロジェクト——を続けた。彼のカーザ·ダス·ヒストリアス·パウラ·レゴ（2009年）は美術館でありながら、控えめな彫刻のようであり、赤いコンクリートのボリュームで画家の作品世界に応答している。この「拡張しない」選択はそれ自体が一つの宣言である。',
            'ソウト·デ·モウラのキャリアは私たちに教える——建築学の価値は必ずしも規模と数量で測られるものではない。速度とスペクタクルを追求する時代にあって、彼はスローダウンし、精確を選び、建築を「努力の跡が見えない」ように見せることを選んだ——この努力の跡の見えなさの背後には巨大な努力があるのだが。彼はポルトガル建築「ポルト学派」の第二世代の核心であり、グローバル化の波のなかで地域に根ざした建築がなお普遍的な説得力をもちうることを証明している。',
          ],
          en: [
            'When the 2011 Pritzker Prize was awarded to Souto de Moura, many were surprised \u2014 in an era when the prize increasingly favored \u201cstarchitects,\u201d Souto de Moura\u2019s quietness, caution, and regionalism seemed out of place. But the jury citation captured his value precisely: \u201cHis architecture possesses a unique ability to convey seemingly conflicting characteristics \u2014 power and modesty, bravado and subtlety, bold public authority and a sense of intimacy \u2014 at the same time.\u201d',
            'After the prize, Souto de Moura did not, like many Pritzker laureates, pivot toward globalization and large-scale projects. He continued running a small office in Porto, doing what he had always done \u2014 houses, small public buildings, restoration projects. His Casa das Histórias Paula Rego (2009) is a museum but like an understated sculpture, responding to the painter\u2019s world with red concrete volumes. This choice not to expand is itself a manifesto.',
            'Souto de Moura\u2019s career teaches us: the value of architecture is not necessarily measured by scale and quantity. In an era that pursues speed and spectacle, he chose to slow down, chose precision, chose to make architecture look \u201ceffortless\u201d \u2014 though behind this apparent effortlessness lies enormous effort. He is the second-generation core of Portuguese architecture\u2019s \u201cPorto School,\u201d proving that in the tide of globalization, architecture rooted in the regional can still possess universal persuasiveness.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'estadio-municipal-de-braga', note: { zh: '嵌入采石场的足球圣殿，两面看台对望岩壁，建筑不是建造而是揭示。为2004年欧洲杯建造。', ja: '採石場に埋め込まれたサッカー聖殿。二面の観客席が岩壁に向き合い、建築は建造ではなく開示である。EURO2004のために建設。', en: 'A football temple embedded in a quarry, two stands facing rock walls \u2014 architecture not as construction but as revelation. Built for Euro 2004.' } },
      { slug: 'casa-das-historias-paula-rego', note: { zh: '红色混凝土构成的两座金字塔形塔楼，为葡萄牙最重要的当代画家而建的低调美术馆。', ja: '赤いコンクリートが構成する二つのピラミッド型の塔。ポルトガルのもっとも重要な現代画家のための控えめな美術館。', en: 'Two pyramidal towers of red concrete, an understated museum for Portugal\u2019s most important contemporary painter.' } },
      { slug: 'serpentine-gallery-pavilion-2005', note: { zh: '与西塞合作设计，以木格栅构造的临时展馆，展现师徒二人共享的克制美学。', ja: 'シザと協働設計。木格子で構成された仮設パビリオン。師弟が共有する抑制の美学を示す。', en: 'Designed in collaboration with Siza, a temporary pavilion of timber latticework, demonstrating the aesthetics of restraint shared by master and disciple.' } },
    ],
    sources: [
      { title: 'Eduardo Souto de Moura \u2014 Pritzker Prize', url: 'https://www.pritzkerprize.com/laureates/eduardo-souto-de-moura' },
      { title: 'Estádio Municipal de Braga', url: 'https://www.scbraga.pt/clube/estadio/' },
      { title: 'Wikidata: Eduardo Souto de Moura', url: 'https://www.wikidata.org/wiki/Q312957' },
    ],
  },

  'peter-eisenman': {
    slug: 'peter-eisenman',
    summary: {
      zh: '彼得·艾森曼是当代建筑界最重要的理论激进派。他从解构主义哲学出发，将建筑视为一种能够进行抽象思考和自我批判的语言系统。他的作品——从House系列到柏林犹太人大屠杀纪念碑——从来不是关于舒适或美，而是关于建筑本身的可能性和极限。',
      ja: 'ピーター·アイゼンマンは現代建築界のもっとも重要な理論的急進派である。彼は脱構築主義哲学から出発し、建築を抽象的思考と自己批判を行うことのできる言語体系と見なした。彼の作品——ハウスシリーズからベルリン·ホロコースト記念碑まで——は、快適さや美についてではなく、建築そのものの可能性と限界についてである。',
      en: 'Peter Eisenman is the most important theoretical radical in contemporary architecture. Starting from deconstructivist philosophy, he regards architecture as a linguistic system capable of abstract thought and self-critique. His work \u2014 from the House series to the Berlin Holocaust Memorial \u2014 is never about comfort or beauty but about the very possibilities and limits of architecture itself.',
    },
    core_ideas: {
      zh: [
        '建筑不是庇护所——它是一种书写形式，一种可以被阅读和重写的文本',
        '传统建筑学的舒适丶功能和美学都是应该被质疑的假设，不是不证自明的真理',
        '网格的错位丶旋转和叠加可以揭示隐藏的空间秩序',
        '不在场（absence）和虚空（void）与在场和实体同等重要',
        '大屠杀的恐怖不能被再现——建筑只能创造一种"缺失感"来逼近它',
      ],
      ja: [
        '建築はシェルターではない——それは書法の一形式であり、読まれ、書き直されることのできるテクストである',
        '伝統的建築学の快適さ、機能、美学は疑われるべき仮定であり、自明の真理ではない',
        'グリッドのずらし、回転、重ね合わせは隠された空間秩序を露わにしうる',
        '不在と虚空は、存在と実体と同等に重要である',
        'ホロコーストの恐怖は表象できない——建築は「喪失感」をつくりだすことによってのみそれに近づきうる',
      ],
      en: [
        'Architecture is not shelter \u2014 it is a form of writing, a text that can be read and rewritten',
        'The traditional architectural assumptions of comfort, function, and beauty are all premises to be questioned, not self-evident truths',
        'The displacement, rotation, and superimposition of grids can reveal hidden spatial orders',
        'Absence and void are as important as presence and solidity',
        'The horror of the Holocaust cannot be represented \u2014 architecture can only approach it by creating a sense of loss',
      ],
    },
    portrait: {
      url: '/images/architects/peter-eisenman-portrait.jpg',
      author: '',
      license: '',
      source_url: '',
      alt: { zh: '彼得·艾森曼的建筑肖像', ja: 'ピーター·アイゼンマンの建築肖像', en: 'Portrait of architect Peter Eisenman' },
    },
    sections: [
      {
        title: { zh: '纸上的建筑：House系列与建筑自主性', ja: '紙の上の建築：ハウスシリーズと建築の自律性', en: 'Architecture on Paper: The House Series and Architectural Autonomy' },
        paragraphs: {
          zh: [
            '彼得·艾森曼1932年生于新泽西，在康奈尔大学、哥伦比亚大学和剑桥大学接受教育。1970年代，他因"House系列"（House I-X）而成为建筑理论界的焦点。这十座编号住宅（其中四座实际上建成）不是为居住而设计的——它们是建筑语法实验。House VI（1975）是最著名的例子：一条虚拟的网格线插入建筑，打破了楼板、柱子和墙体的正常逻辑，楼梯在空中中断、柱子不落地、卧室中间有一条无法逾越的缝隙。',
            'House系列的激进性在于：它宣称建筑可以是一个完全自洽的形式系统，独立于功能、气候、经济甚至重力的要求。艾森曼将乔姆斯基的语言学、德里达的解构哲学引入建筑学，认为建筑形式也像语言一样具有深层结构和转换规则。这些住宅不是用来"住"的——它们是被"阅读"的文本。',
            '毫不意外，这些住宅的实际使用者（包括House VI的业主，一位建筑摄影师）与建筑之间的关系极其紧张。House VI的业主夫妇后来专门写了一本书讲述他们在其中生活的困难：床必须跨过缝隙放置、楼梯不能使用、餐桌被柱子穿透。但艾森曼对此毫不在意——对他来说，使用者的不适恰恰证明了建筑自主性的存在。建筑可以像一篇难读的哲学论文一样"困难"。',
          ],
          ja: [
            'ピーター·アイゼンマンは1932年ニュージャージー州に生まれ、コーネル大学、コロンビア大学、ケンブリッジ大学で教育を受けた。1970年代、彼は「ハウスシリーズ」（House I-X）によって建築理論界の焦点となった。この十の番号付き住宅（うち四つは実際に建設された）は居住のために設計されたのではない——それらは建築文法の実験である。House VI（1975年）は最も有名な例だ——一筋の仮想的なグリッド線が建築に挿入され、床スラブ、柱、壁の正常な論理を破壊する。階段は空中で途切れ、柱は地面に着かず、寝室の中央には越えられない隙間が走る。',
            'ハウスシリーズの急進性はここにある——建築は完全に自己完結的な形式体系でありうると宣言し、機能、気候、経済、さらには重力の要求からも独立していると宣言したのだ。アイゼンマンはチョムスキーの言語学、デリダの脱構築哲学を建築学に導入し、建築形式もまた言語のように深層構造と変換規則をもつと主張した。これらの住宅は「住む」ためのものではない——それらは「読まれる」テクストなのだ。',
            '当然のことながら、これらの住宅の実際の使用者（House VIの施主はある建築写真家だった）と建築との関係はきわめて緊張に満ちたものだった。House VIの施主夫妻は後に一冊の本を書いてその中での生活の困難を綴った——ベッドは間隙をまたいで配置しなければならず、階段は使用できず、食卓は柱に貫通されている。だがアイゼンマンはまったく気にしなかった——彼にとって使用者の不快感は、まさに建築の自律性の存在を証明するものだったのだ。建築は難解な哲学論文のように「困難」でありうる。',
          ],
          en: [
            'Peter Eisenman was born in New Jersey in 1932 and educated at Cornell, Columbia, and Cambridge. In the 1970s, he became the focus of architectural theory with the \u201cHouse series\u201d (House I\u2013X). These ten numbered houses (four actually built) were not designed for living \u2014 they are experiments in architectural grammar. House VI (1975) is the most famous example: a virtual grid line inserted into the building disrupts the normal logic of floor slabs, columns, and walls \u2014 stairs interrupt in mid-air, columns fail to touch the ground, an impassable fissure runs through the middle of the bedroom.',
            'The radicalism of the House series lies in its claim: architecture can be a completely self-consistent formal system, independent of the demands of function, climate, economy, even gravity. Eisenman introduced Chomsky\u2019s linguistics and Derrida\u2019s deconstruction into architecture, arguing that architectural form also possesses deep structures and transformational rules like language. These houses are not for \u201cliving in\u201d \u2014 they are texts to be \u201cread.\u201d',
            'Unsurprisingly, the actual relationships between these houses and their users (including the owner of House VI, an architectural photographer) were intensely fraught. The couple who owned House VI later wrote a book recounting the difficulties of living there: the bed had to straddle the fissure, the stairs were unusable, the dining table was pierced by a column. Eisenman was utterly unconcerned \u2014 for him, the discomfort of the users was precisely proof of architecture\u2019s autonomy. Architecture could be as \u201cdifficult\u201d as an abstruse philosophical essay.',
          ],
        },
      },
      {
        title: { zh: '柏林纪念碑群：如何建造"不在场"', ja: 'ベルリン記念碑群：いかに「不在」を建造するか', en: 'The Berlin Memorial: How to Build Absence' },
        paragraphs: {
          zh: [
            '如果说House系列是艾森曼的理论实验室，那么柏林犹太人大屠杀纪念碑（Memorial to the Murdered Jews of Europe, 2005）就是他的理论进入公共领域的最重大考验。这个占地19,000平方米的场地上，2711块不同高度的混凝土碑体排列成一个起伏的网格。没有名字、没有文字、没有叙事——只有抽象的体量、倾斜的地面和逐渐将人淹没的灰色。',
            '这个项目最强大之处在于它拒绝提供任何解释或安慰。你走进去，混凝土碑体从脚踝高度逐渐升至头顶以上，地面开始倾斜，方向感消失，周围只剩下灰色的重力和自身的脚步声。它不是一个"纪念"传统意义上的纪念碑——它更像一种空间装置，让你在身体层面体验到"迷失"和"不安"。这正是艾森曼想要的效果：大屠杀的恐怖无法被再现，但某种"不在场的沉重感"可以在空间中构建。',
            '纪念碑引发了激烈的争论：有人认为它太抽象、太冷漠、缺少教育功能；也有人认为它恰恰因为拒绝说教而成为最有力的纪念形式之一。无论如何，它标志着一个重要时刻——解构主义建筑不是仅仅在学院和画廊中有效，它也可以在最具道德重量的公共领域发挥作用。',
          ],
          ja: [
            'ハウスシリーズがアイゼンマンの理論的実験室だとすれば、ベルリン·ホロコースト記念碑（2005年）は彼の理論が公共領域に入る最大の試金石である。19,000平方メートルの敷地に、2,711基の異なる高さのコンクリート碑体が起伏するグリッドに配列される。名前も文字も物語もない——あるのは抽象的な量塊、傾斜する地面、そして徐々に人を飲み込む灰色だけだ。',
            'このプロジェクトのもっとも力強い点は、いかなる説明も慰めも提供することを拒否していることだ。中に入ると、コンクリート碑体は足首の高さから徐々に頭上を超えるまで立ち上がり、地面は傾き始め、方向感覚は消え失せ、周囲には灰色の重力と自分の足音だけが残る。それは伝統的意味での「記念碑」ではない——むしろ空間装置であり、「喪失」と「不安」を身体レベルで体験させる。これこそアイゼンマンが狙った効果だ——ホロコーストの恐怖は表象できないが、ある種の「不在の重み」は空間のなかに構築できる。',
            '記念碑は激しい論争を引き起こした——抽象的すぎる、冷たすぎる、教育的機能に欠けるという批判がある一方で、まさに説教を拒否するからこそもっとも力強い記念形式の一つだという評価もある。いずれにせよ、これは重要な瞬間を画した——脱構築主義建築は学院とギャラリーの中でのみ有効なのではなく、もっとも道徳的重みのある公共領域でも機能しうるのだ。',
          ],
          en: [
            'If the House series was Eisenman\u2019s theoretical laboratory, the Berlin Memorial to the Murdered Jews of Europe (2005) was his theory\u2019s greatest test in the public realm. Across a 19,000-square-meter site, 2,711 concrete stelae of varying heights are arranged in an undulating grid. No names, no text, no narrative \u2014 only abstract volumes, sloping ground, and grayness gradually engulfing the visitor.',
            'The memorial\u2019s greatest power lies in its refusal to provide any explanation or consolation. You walk in; the stelae rise from ankle height to above your head; the ground begins to tilt; orientation vanishes; all that remains is gray gravity and the sound of your own footsteps. It is not a \u201cmemorial\u201d in the traditional sense \u2014 more a spatial device that lets you bodily experience \u201cdisorientation\u201d and \u201cunease.\u201d This is precisely the effect Eisenman intended: the horror of the Holocaust cannot be represented, but a kind of \u201cheaviness of absence\u201d can be constructed in space.',
            'The memorial sparked fierce debate: some found it too abstract, too cold, lacking educational function; others saw it as one of the most powerful forms of commemoration precisely because it refuses to lecture. Whatever the case, it marks an important moment \u2014 deconstructivist architecture is not only valid in academies and galleries; it can function in the public realm of greatest moral weight.',
          ],
        },
      },
      {
        title: { zh: '理论丶教学与建筑的边界', ja: '理論·教育·建築の境界', en: 'Theory, Pedagogy, and the Boundaries of Architecture' },
        paragraphs: {
          zh: [
            '艾森曼的影响力远超出他建成的建筑。作为"纽约五人组"（New York Five）的核心成员（与理查德·迈耶、迈克尔·格雷夫斯等人一起），他在1970年代推动了建筑学向理论化的转向。他创办的"建筑与城市研究所"（Institute for Architecture and Urban Studies, IAUS）成为当时国际建筑理论交流的中心。《反对派》（Oppositions）杂志重新定义了建筑写作的标准。',
            '在教学上，艾森曼在普林斯顿大学、哈佛大学、耶鲁大学和库珀联盟等多所院校任教数十年。他的教学方式不是传授"如何做设计"，而是不断追问"什么是建筑""建筑能做什么""建筑的极限在哪里"。这种苏格拉底式的方法影响了一代又一代建筑师，包括后来的格雷格·林恩和许多数字建筑领域的前沿人物。',
            '2000年代以后，艾森曼的建成作品数量逐渐减少，但他的文化地位依然稳固。他以公共知识分子的身份持续写作、演讲和评论，是建筑界少数能够同时在学术界和大众媒体中产生影响的"跨界"人物。他的思想遗产——建筑可以是文本、可以自我批判、可以不服务于任何外在功能——至今仍在学院中激荡。尽管他的建筑可能不那么"宜人"，但他的问题仍然是所有严肃建筑师必须面对的。',
          ],
          ja: [
            'アイゼンマンの影響力は彼が建てた建築をはるかに超えている。「ニューヨーク·ファイブ」の核心メンバーとして（リチャード·マイヤー、マイケル·グレイヴスらとともに）、彼は1970年代に建築学の理論化への転換を推進した。彼が設立した「建築と都市研究所」（IAUS）は当時の国際建築理論交流の中心となった。雑誌『オポジションズ』は建築批評の基準を再定義した。',
            '教育面では、アイゼンマンはプリンストン大学、ハーバード大学、イェール大学、クーパー·ユニオンなど多くの大学で数十年にわたり教鞭をとった。彼の教育方法は「デザインのやり方」を伝授することではなく、「建築とは何か」「建築は何ができるか」「建築の限界はどこか」を不断に問い続けることだった。このソクラテス的方法は世代を超えて建築家に影響を与え、グレッグ·リンやデジタル建築分野の多くの最先端人物を生んだ。',
            '2000年代以降、アイゼンマンの建作品の数は徐々に減少したが、彼の文化的地位は依然として揺るがない。彼は公共知識人として執筆、講演、評論を続け、建築界で学界と大衆メディアの両方に同時に影響を与えることのできる数少ない「越境的」人物である。彼の思想的遺産——建築はテクストであり、自己批判的でありえ、いかなる外在的機能にも奉仕しないことができる——は今なお学院のなかで鳴り響いている。彼の建築はそれほど「心地よく」ないかもしれないが、彼の投げかけた問いはすべての真摯な建築家が直面しなければならないものである。',
          ],
          en: [
            'Eisenman\u2019s influence extends far beyond his built works. As a core member of the New York Five (alongside Richard Meier, Michael Graves, and others), he drove the turn toward theorization in architecture during the 1970s. The Institute for Architecture and Urban Studies (IAUS), which he founded, became the center of international architectural theory exchange. The journal Oppositions redefined the standard of architectural writing.',
            'In teaching, Eisenman taught for decades at Princeton, Harvard, Yale, Cooper Union, and other institutions. His pedagogical approach was not to impart \u201chow to design\u201d but to continually ask \u201cWhat is architecture?\u201d \u201cWhat can architecture do?\u201d \u201cWhere lie the limits of architecture?\u201d This Socratic method influenced generation after generation of architects, including later figures like Greg Lynn and many pioneers of the digital architecture field.',
            'After the 2000s, Eisenman\u2019s output of built works gradually declined, but his cultural stature remains secure. He continues to write, lecture, and comment as a public intellectual \u2014 one of the few \u201ccrossover\u201d figures in architecture capable of exerting influence in both academia and mass media simultaneously. His intellectual legacy \u2014 that architecture can be text, can be self-critical, can serve no external function \u2014 still reverberates through the academy. His buildings may not be particularly \u201clivable,\u201d but the questions he raised remain ones that all serious architects must confront.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'memorial-to-the-murdered-jews', note: { zh: '2711块灰色混凝土碑体构成的抽象场域，没有文字和解释，只有倾斜的地面和慢慢将人淹没的灰色。解构主义在公共领域中最大胆的实践。', ja: '2,711基の灰色コンクリート碑体が構成する抽象的場。文字も説明もなく、あるのは傾斜する地面と徐々に人を飲み込む灰色だけ。公共領域における脱構築主義のもっとも大胆な実践。', en: 'An abstract field of 2,711 gray concrete stelae with no text or explanation \u2014 only sloping ground and grayness slowly engulfing the visitor. Deconstructivism\u2019s boldest practice in the public realm.' } },
      { slug: 'wexner-center-for-the-arts', note: { zh: '白色格架与仿古红砖堡垒的碰撞，网格系统的不稳定和错位创造了一个"不安的建筑"。', ja: '白いグリッド架構と古風な赤煉瓦要塞の衝突。グリッドシステムの不安定性とずらしが「不安な建築」を創造する。', en: 'A collision of white scaffolding grids and a pseudo-historical red-brick fortress, where grid-system instability and displacement create an \u201cuneasy architecture.\u201d' } },
      { slug: 'house-vi', note: { zh: '一张被切割的三维绘图，楼梯在空间中消失、柱子不落地、裂缝贯穿卧室。建筑不是为了居住，而是为了被思考。', ja: '切り裂かれた三次元製図。階段は空間のなかで消え、柱は地面に着かず、亀裂が寝室を貫く。建築は住むためではなく、思考されるためにある。', en: 'A three-dimensional drawing sliced apart: stairs that vanish in space, columns that never reach the ground, a fissure running through the bedroom. Architecture not for living but for being thought.' } },
    ],
    sources: [
      { title: 'Eisenman Architects Official Site', url: 'https://eisenmanarchitects.com/' },
      { title: 'Stiftung Denkmal \u2014 Holocaust Memorial', url: 'https://www.stiftung-denkmal.de/' },
      { title: 'Wikidata: Peter Eisenman', url: 'https://www.wikidata.org/wiki/Q312390' },
    ],
  },

  'harry-seidler': {
    slug: 'harry-seidler',
    summary: {
      zh: '哈里·塞德勒是澳大利亚现代建筑之父。他在格罗皮乌斯和布劳耶门下学习，在尼迈耶事务所工作，最终将包豪斯理性主义丶南美雕塑感和澳大利亚阳光融合成一种独特的"南半球现代主义"。他是20世纪在南半球实践现代建筑最重要的人物之一。',
      ja: 'ハリー·サイドラーはオーストラリア近代建築の父である。グロピウスとブロイヤーに師事し、ニーマイヤー事務所で働き、最終的にバウハウスの合理主義、南米の彫刻感覚、オーストラリアの陽光を独自の「南半球モダニズム」へと融合させた。南半球で近代建築を実践した20世紀最重要人物の一人である。',
      en: 'Harry Seidler is the father of Australian modern architecture. He studied under Gropius and Breuer, worked in Niemeyer\u2019s office, and ultimately fused Bauhaus rationalism, South American sculptural sensibility, and Australian sunlight into a distinctive \u201cSouthern Hemisphere modernism.\u201d He was one of the most important figures to practice modern architecture in the Southern Hemisphere during the 20th century.',
    },
    core_ideas: {
      zh: [
        '现代主义不是欧洲的专属——它必须在澳大利亚的阳光丶气候和生活方式中找到自己的表达',
        '建筑与艺术的整合不是装饰，而是空间丶光和结构之间的根本对话',
        '高层住宅可以是"垂直花园城市"，而不只是密度的堆积',
        '几何秩序和建造精度是对居住者尊严的基本尊重',
        '好的建筑必须与视觉艺术家合作——这不仅仅是业主的特权，也是建筑师的',
      ],
      ja: [
        'モダニズムはヨーロッパの専有物ではない——オーストラリアの陽光、気候、ライフスタイルのなかで自らの表現を見出さねばならない',
        '建築と芸術の統合は装飾ではなく、空間、光、構造のあいだの根源的対話である',
        '高層住宅は「垂直庭園都市」でありうる——単なる密度の積み重ねではない',
        '幾何学的秩序と建設精度は、居住者の尊厳への基本的敬意である',
        '優れた建築は視覚芸術家との協働を必要とする——これは施主の特権であるだけでなく、建築家の特権でもある',
      ],
      en: [
        'Modernism is not Europe\u2019s exclusive property \u2014 it must find its own expression in Australia\u2019s sunlight, climate, and lifestyle',
        'The integration of architecture and art is not decoration but a fundamental dialogue between space, light, and structure',
        'High-rise housing can be a \u201cvertical garden city,\u201d not merely an accumulation of density',
        'Geometric order and construction precision are a basic respect for the dignity of inhabitants',
        'Good architecture requires collaboration with visual artists \u2014 this is not just the client\u2019s privilege but the architect\u2019s as well',
      ],
    },
    portrait: {
      url: '/images/architects/harry-seidler-portrait.jpg',
      author: '',
      license: '',
      source_url: '',
      alt: { zh: '哈里·塞德勒的建筑肖像', ja: 'ハリー·サイドラーの建築肖像', en: 'Portrait of architect Harry Seidler' },
    },
    sections: [
      {
        title: { zh: '从维也纳到悉尼：一个难民的建筑使命', ja: 'ウィーンからシドニーへ：難民の建築的使命', en: 'From Vienna to Sydney: A Refugee\u2019s Architectural Mission' },
        paragraphs: {
          zh: [
            '哈里·塞德勒1923年生于维也纳的一个犹太家庭。1938年德奥合并后，15岁的他被迫逃离奥地利，经由英国辗转，最终与家人团聚。这个被迫流亡的经历深刻塑造了他的一生——他后来将建筑视为一种重新扎根的方式。1940年代，他在哈佛设计研究生院师从瓦尔特·格罗皮乌斯和马塞尔·布劳耶，学习了包豪斯的功能主义传统。随后在巴西奥斯卡·尼迈耶的事务所短暂工作，接触了南美现代主义的雕塑性语言。',
            '1948年，塞德勒受母亲邀请来到悉尼（他的父母已先行移民澳大利亚），并接受委托设计他们的住宅——这就是著名的Rose Seidler House（1950）。这座位于悉尼北郊的住宅是澳大利亚第一座完全符合包豪斯原则的现代住宅：平屋顶、开放式平面、大面积玻璃、钢柱结构。它在当时的悉尼郊区引起轰动——邻居们称之为"箱子"或"棚屋"。',
            '塞德勒原计划在澳大利亚待一年就返回美国，但Rose Seidler House的成功为他带来了大量委托，他最终决定留下。在接下来的50多年里，他设计了超过180个项目，从私人住宅到高层塔楼，从市民广场到使馆建筑，几乎凭借一己之力将现代主义建筑引入澳大利亚的主流。他是澳大利亚唯一一位直接师从包豪斯大师的执业建筑师。',
          ],
          ja: [
            'ハリー·サイドラーは1923年ウィーンのユダヤ系家庭に生まれた。1938年のアンシュルス（独墺合邦）後、15歳でオーストリアからの脱出を余儀なくされ、イギリスを経由してようやく家族と再会した。この強制移住の経験が彼の生涯を深く形成した——彼は後に建築を再び根を下ろす方法と見なした。1940年代、ハーバード大学デザイン大学院でヴァルター·グロピウスとマルセル·ブロイヤーに師事し、バウハウスの機能主義の伝統を学んだ。その後ブラジルのオスカー·ニーマイヤー事務所で短期間働き、南米モダニズムの彫刻的言語に触れた。',
            '1948年、サイドラーは母の招きでシドニーに到着し（両親はすでにオーストラリアに移住していた）、彼らの住宅の設計を依頼された——これが有名なローズ·サイドラー邸（1950年）である。シドニー北郊にあるこの住宅は、オーストラリアで初めて完全にバウハウスの原則に則った近代住宅だった——陸屋根、オープンプラン、大面積のガラス、鉄骨柱構造。それは当時のシドニー郊外で騒動を巻き起こした——近隣住民はそれを「箱」または「小屋」と呼んだ。',
            'サイドラーは本来一年でアメリカに戻る予定だったが、ローズ·サイドラー邸の成功が大量の委託をもたらし、彼は最終的にオーストラリアに残る決断をした。その後の50年以上にわたり、彼は180以上のプロジェクトを設計した——個人住宅から高層タワー、市民広場から大使館建築まで——ほとんど単独で近代建築をオーストラリアの主流に導入した。彼はバウハウスの巨匠たちに直接師事したオーストラリアで唯一の実務建築家である。',
          ],
          en: [
            'Harry Seidler was born in Vienna in 1923 to a Jewish family. After the Anschluss of 1938, the 15-year-old was forced to flee Austria, reaching his family via England. This experience of forced displacement profoundly shaped his life \u2014 he later saw architecture as a way of re-rooting. In the 1940s, he studied under Walter Gropius and Marcel Breuer at the Harvard Graduate School of Design, absorbing the functionalist tradition of the Bauhaus. He then worked briefly in Oscar Niemeyer\u2019s office in Brazil, encountering the sculptural language of South American modernism.',
            'In 1948, Seidler arrived in Sydney at his mother\u2019s invitation (his parents had already emigrated to Australia) and was commissioned to design their house \u2014 the famous Rose Seidler House (1950). This residence in Sydney\u2019s northern suburbs was Australia\u2019s first fully Bauhaus-principled modern house: flat roof, open plan, extensive glazing, steel-column structure. It caused a sensation in the Sydney suburbs of the time \u2014 neighbors called it a \u201cbox\u201d or a \u201cshed.\u201d',
            'Seidler had planned to return to the United States after a year, but the success of Rose Seidler House brought a flood of commissions, and he ultimately decided to stay. Over the next 50-plus years, he designed more than 180 projects \u2014 from private houses to high-rise towers, from civic plazas to embassy buildings \u2014 almost single-handedly introducing modernist architecture into Australia\u2019s mainstream. He was Australia\u2019s only practicing architect to have studied directly under Bauhaus masters.',
          ],
        },
      },
      {
        title: { zh: '澳大利亚广场与垂直城市理想', ja: 'オーストラリアスクエアと垂直都市の理想', en: 'Australia Square and the Vertical City Ideal' },
        paragraphs: {
          zh: [
            'Australia Square（1967）是塞德勒职业生涯的转折点——从住宅建筑师跃升为城市地标设计师。这座位于悉尼CBD的50层圆柱形办公塔楼是当时澳大利亚最高的建筑，其圆形平面和预制混凝土外墙在当时的全球高層建筑中属于开创性设计。塞德勒拒绝将塔楼视为孤立的物体，而是在底部创造了一系列公共广场、花园和零售空间，将建筑与城市肌理缝合。',
            '这座塔楼的结构创新同样值得注意：它采用了当时最先进的滑模施工技术，核心筒先于楼层建造，使施工速度大大加快。圆形平面不仅具有雕塑美感，还最大化了对港口和城市的视野，同时减少了风荷载。澳大利亚广场在工程和美学上的成功，使塞德勒成为澳大利亚高层建筑的领军人物。',
            '在后续的高层住宅项目中——如Blues Point Tower（1962）和Horizon Apartments（1998）——塞德勒持续探索"垂直社区"的概念。他不把高层住宅看成"鸽子笼"，而是试图在垂直维度上创造一种与水平街道相似的社会互动可能性。Horizon Apartments以起伏的阳台曲线和雕塑般的体量成为达令赫斯特天际线的标志性存在。尽管他的高层作品在公众中褒贬不一（Blues Point Tower至今仍是悉尼最具争议的建筑之一），但它们在建筑学上的严谨性得到了专家的持续认可。',
          ],
          ja: [
            'オーストラリアスクエア（1967年）はサイドラーのキャリアの転換点である——住宅建築家から都市ランドマークの設計者への飛躍。このシドニーCBDに位置する50階建ての円筒形オフィスタワーは当時オーストラリアで最も高い建築物であり、円形平面とプレキャストコンクリート外壁は当時の世界的高層建築において先駆的デザインだった。サイドラーはタワーを孤立した物体として扱うことを拒否し、底部に一連の公共広場、庭園、小売空間を創造し、建築を都市の織物に縫合した。',
            'このタワーの構造革新も注目に値する——当時最先端のスリップフォーム工法を採用し、コアを先行して建設することで施工速度を大幅に加速させた。円形平面は彫刻的美を有するだけでなく、港と都市への眺望を最大化し、同時に風荷重を低減した。オーストラリアスクエアの工学的かつ美学的成功により、サイドラーはオーストラリアの高層建築のリーダー的存在となった。',
            'その後の高層住宅プロジェクト——ブルースポイントタワー（1962年）やホライゾンアパートメンツ（1998年）など——において、サイドラーは「垂直コミュニティ」の概念を探求し続けた。彼は高層住宅を「鳩の巣箱」とは見なさず、垂直次元において水平の街路に似た社会的交流の可能性を創造しようと試みた。ホライゾンアパートメンツは起伏するバルコニーの曲線と彫刻的量塊によってダーリングハーストのスカイラインの象徴的存在となった。彼の高層作品は一般大衆のあいだで賛否両論（ブルースポイントタワーは今なおシドニーで最も論争的な建築の一つ）だが、建築学的な厳密さは専門家から持続的な評価を受けている。',
          ],
          en: [
            'Australia Square (1967) marked a turning point in Seidler\u2019s career \u2014 the leap from residential architect to urban landmark designer. This 50-story cylindrical office tower in Sydney\u2019s CBD was Australia\u2019s tallest building at the time, and its circular plan with precast concrete fa\u00e7ade was pioneering in global high-rise design. Seidler refused to treat the tower as an isolated object, instead creating a series of public plazas, gardens, and retail spaces at its base, stitching the building into the urban fabric.',
            'The tower\u2019s structural innovation is equally noteworthy: it employed the most advanced slip-form construction technique of the time, with the core built ahead of the floors, greatly accelerating construction speed. The circular plan not only possessed sculptural beauty but maximized views of the harbor and city while reducing wind loads. The engineering and aesthetic success of Australia Square established Seidler as the leading figure of Australian high-rise architecture.',
            'In subsequent high-rise residential projects \u2014 such as Blues Point Tower (1962) and Horizon Apartments (1998) \u2014 Seidler continued exploring the concept of the \u201cvertical community.\u201d He did not see high-rise housing as \u201cpigeonholes\u201d but sought to create possibilities for social interaction comparable to a horizontal street in the vertical dimension. Horizon Apartments, with its undulating balcony curves and sculptural massing, became an iconic presence on the Darlinghurst skyline. Though his high-rise works divided public opinion (Blues Point Tower remains one of Sydney\u2019s most controversial buildings), their architectural rigor has earned sustained recognition from experts.',
          ],
        },
      },
      {
        title: { zh: '艺术丶几何与澳大利亚之光', ja: '芸術·幾何学·オーストラリアの光', en: 'Art, Geometry, and Australian Light' },
        paragraphs: {
          zh: [
            '塞德勒可能是20世纪最热衷于与艺术家合作的建筑师之一。他与数十位艺术家——包括Josef Albers、Alexander Calder、Frank Stella、Sol LeWitt、Norman Carlberg等——合作，将他们的作品直接整合进建筑中。在塞德勒看来，艺术不是建筑的装饰，而是建筑的有机组成部分。他的许多大堂和公共空间中都有定制的壁画、雕塑和装置，这些作品与空间的结构逻辑形成对话。',
            '几何学是塞德勒设计的另一个核心关注。他从1960年代开始探索曲线几何——这不是出于形式追风，而是基于空间和功能的分析。扇形和圆形平面可以优化视野、改善风环境、创造更灵活的室内布局。他的后期作品——如Berman House（1999）——展现了近乎巴洛克式的曲线丰富性，但始终保持了严密的几何逻辑。',
            '塞德勒对澳大利亚"光"的回应也是他作品的一大特色。欧洲现代主义在灰色天空下诞生，但澳大利亚的阳光强烈而通透。塞德勒发展出一套独特的遮阳语言：深挑檐、垂直遮阳板、可调节的百叶——这些元素既是气候回应，也成为立面的强烈几何构成。他于2006年去世，享年82岁。他的一生是现代主义全球传播的故事——从维也纳到哈佛，从巴西到澳大利亚——但他最终证明的是：好的建筑永远需要植根于特定的地点和光线。',
          ],
          ja: [
            'サイドラーはおそらく20世紀で最も芸術家との協働に熱心だった建築家の一人である。彼は数十人の芸術家——ジョセフ·アルバース、アレクサンダー·カルダー、フランク·ステラ、ソル·ルウィット、ノーマン·カールバーグらを含む——と協働し、彼らの作品を直接建築に統合した。サイドラーにとって芸術は建築の装飾ではなく、建築の有機的構成部分である。彼の多くのロビーや公共空間にはオーダーメイドの壁画、彫刻、インスタレーションがあり、これらの作品は空間の構造論理と対話を形成している。',
            '幾何学はサイドラーのデザインのもう一つの核心的関心である。彼は1960年代から曲線幾何学を探求し始めた——これは形式の流行のためではなく、空間と機能の分析に基づいている。扇形や円形平面は眺望を最適化し、風環境を改善し、より柔軟な室内レイアウトを創造できる。彼の後期作品——バーマン邸（1999年）など——はほとんどバロック的な曲線の豊かさを示すが、常に厳密な幾何学的論理を保持している。',
            'サイドラーのオーストラリアの「光」への応答もまた彼の作品の大きな特色である。ヨーロッパのモダニズムは灰色の空の下で生まれたが、オーストラリアの陽光は強く透き通っている。サイドラーは独自の日射遮蔽言語を発展させた——深い庇、垂直ルーバー、可動式ブラインド——これらの要素は気候への応答であると同時に、ファサードの力強い幾何学的構成にもなっている。彼は2006年に82歳で死去した。彼の生涯はモダニズムのグローバルな伝播の物語である——ウィーンからハーバードへ、ブラジルからオーストラリアへ——しかし彼が最終的に証明したのは、優れた建築は常に特定の場所と光に根ざす必要があるということだ。',
          ],
          en: [
            'Seidler may have been one of the 20th century\u2019s most enthusiastic architects about collaborating with artists. He worked with dozens of artists \u2014 including Josef Albers, Alexander Calder, Frank Stella, Sol LeWitt, and Norman Carlberg \u2014 integrating their work directly into architecture. For Seidler, art was not decoration for architecture but an organic component of it. Many of his lobbies and public spaces feature custom murals, sculptures, and installations that enter into dialogue with the spatial structural logic.',
            'Geometry is another core concern of Seidler\u2019s design. Starting in the 1960s, he explored curvilinear geometry \u2014 not from formal trend-chasing but based on spatial and functional analysis. Fan-shaped and circular plans can optimize views, improve wind environments, and create more flexible interior layouts. His later works \u2014 such as Berman House (1999) \u2014 display an almost Baroque richness of curves while maintaining rigorous geometric logic.',
            'Seidler\u2019s response to Australian \u201clight\u201d is also a hallmark of his work. European modernism was born under gray skies, but Australian sunlight is intense and clear. Seidler developed a distinctive shading vocabulary: deep eaves, vertical sun-breakers, adjustable blinds \u2014 these elements are both climatic responses and powerful geometric compositions on the fa\u00e7ade. He died in 2006 at 82. His life is a story of modernism\u2019s global diffusion \u2014 from Vienna to Harvard, from Brazil to Australia \u2014 but what he ultimately proved is: good architecture must always be rooted in a specific place and light.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'australia-square', note: { zh: '悉尼第一座真正的摩天楼，圆形塔楼底部与城市公共空间缝合，定义了澳大利亚现代高层建筑的标准。', ja: 'シドニー初の真の超高層ビル。円形タワーの底部が都市公共空間と縫合され、オーストラリアの近代高層建築の基準を定義した。', en: 'Sydney\u2019s first true skyscraper, a circular tower whose base stitches into urban public space, defining the standard for Australian modern high-rise architecture.' } },
      { slug: 'rose-seidler-house', note: { zh: '澳大利亚第一座包豪斯住宅，塞德勒为母亲设计的宣言，开放平面+平屋顶+玻璃墙，在郊区引爆了现代主义革命。', ja: 'オーストラリア初のバウハウス住宅。サイドラーが母のために設計した宣言——オープンプラン＋陸屋根＋ガラスの壁——郊外にモダニズム革命を爆発させた。', en: 'Australia\u2019s first Bauhaus house, a manifesto Seidler designed for his mother \u2014 open plan + flat roof + glass walls \u2014 detonating a modernist revolution in the suburbs.' } },
      { slug: 'horizon-apartments', note: { zh: '晚年杰作，波浪形阳台立面如雕塑般起伏，是塞德勒"垂直社区"理念的最完美表达。', ja: '晩年の傑作。波打つバルコニーのファサードが彫刻のように起伏し、サイドラーの「垂直コミュニティ」理念のもっとも完璧な表現である。', en: 'A late-career masterpiece with undulating balcony fa\u00e7ades like sculpture, the most perfect expression of Seidler\u2019s \u201cvertical community\u201d concept.' } },
    ],
    sources: [
      { title: 'Harry Seidler & Associates', url: 'https://seidler.net.au/' },
      { title: 'Rose Seidler House \u2014 Sydney Living Museums', url: 'https://sydneylivingmuseums.com.au/rose-seidler-house' },
      { title: 'Wikidata: Harry Seidler', url: 'https://www.wikidata.org/wiki/Q241301' },
    ],
  },

  'junzo-sakakura': {
    slug: 'junzo-sakakura',
    summary: {
      zh: '坂仓准三是日本现代主义谱系中不可或缺却经常被低估的名字。他是柯布西耶在巴黎工作室的首位日本弟子（比前川国男更早），参与了柯布西耶自宅等重要项目。回国后，他将柯布西耶的"新建筑五点"与日本战后重建需求结合，创造了一种更温暖、更人情的现代主义。',
      ja: '坂倉準三は日本モダニズムの系譜において不可欠でありながらしばしば過小評価される名前である。彼はパリのコルビュジエ事務所で最初の日本人弟子であり（前川国男よりも早く）、コルビュジエ自邸などの重要プロジェクトに参加した。帰国後、コルビュジエの「新しい建築の五点」を日本の戦後復興の要求と結びつけ、より温かく、より人間的なモダニズムを創造した。',
      en: 'Junzo Sakakura is an indispensable yet often underrated name in the lineage of Japanese modernism. He was Le Corbusier\u2019s first Japanese apprentice in Paris (before Kunio Maekawa), participating in key projects including Corbusier\u2019s own home. Returning to Japan, he fused Corbusier\u2019s \u201cFive Points of a New Architecture\u201d with Japan\u2019s postwar reconstruction needs, creating a warmer, more humane modernism.',
    },
    core_ideas: {
      zh: [
        '现代建筑的原则是普遍的，但它的表达必须适应当地的气候丶技艺和人的感受',
        '建筑与城市的关系不是孤立的——一个建筑必须成为城市公共领域的贡献者',
        '柯布西耶教会我理性的方法，但日本教会我感性的温度',
        '公共文化建筑应该像市民的"第二客厅"一样开放和亲和',
        '设计师不能只关注建筑本身——家具丶灯具丶标识都是空间整体的一部分',
      ],
      ja: [
        '近代建築の原則は普遍的だが、その表現は現地の気候、技術、人の感覚に適応しなければならない',
        '建築と都市の関係は孤立したものではない——一つの建築は都市の公共領域への貢献者とならねばならない',
        'コルビュジエは理性的方法を教え、日本は感性的温度を教えた',
        '公共文化建築は市民の「第二の居間」のように開放的で親和的であるべきだ',
        '設計者は建築本体だけに注目してはならない——家具、照明、サイン、すべてが空間全体の一部である',
      ],
      en: [
        'The principles of modern architecture are universal, but their expression must adapt to local climate, craft, and human sensibility',
        'The relationship between architecture and the city is not isolated \u2014 a building must become a contributor to the urban public realm',
        'Corbusier taught me rational method; Japan taught me emotional warmth',
        'Public cultural buildings should be as open and welcoming as citizens\u2019 \u201csecond living room\u201d',
        'The designer cannot focus only on the building itself \u2014 furniture, lighting, signage, all are part of the spatial whole',
      ],
    },
    portrait: {
      url: '/images/architects/junzo-sakakura-portrait.jpg',
      author: '',
      license: '',
      source_url: '',
      alt: { zh: '坂仓准三的建筑肖像', ja: '坂倉準三の建築肖像', en: 'Portrait of architect Junzo Sakakura' },
    },
    sections: [
      {
        title: { zh: '柯布西耶的日本影子：巴黎岁月', ja: 'コルビュジエの日本の影：パリ時代', en: 'Corbusier\u2019s Japanese Shadow: The Paris Years' },
        paragraphs: {
          zh: [
            '坂仓准三1901年生于岐阜县，1927年毕业于东京帝国大学文学部美学美术史学科——他的教育背景在当时的日本建筑师中极为罕见，大部分建筑师出身工学部。这种人文训练使他对现代艺术运动和欧洲先锋文化有着比同时代日本建筑师更深刻的理解。1929年，他来到巴黎，直接敲开了柯布西耶事务所的门。',
            '坂仓在柯布西耶事务所的工作时间（1929-1936）是所有日本弟子中最长的——七年。他深度参与了柯布西耶自宅（Appartement-atelier de Le Corbusier, 1933）等核心项目，甚至担任了1937年巴黎世博会日本馆的设计主理。这座日本馆把传统日本木构造与现代钢铁玻璃语言结合，获得世博会大奖。坂仓因此成为当时国际建筑界最受瞩目的日本面孔之一。',
            '1936年回国后，坂仓开设了自己的事务所。与同期从柯布西耶事务所回国的前川国男不同，坂仓的风格从一开始就更倾向于感性的人文主义。他的作品保留了柯布西耶的形式纪律，但材料和细节中注入了更多日本传统美学的温度——木材、和纸、间接照明、庭院渗透——这些元素使他的现代主义少了教条，多了呼吸。',
          ],
          ja: [
            '坂倉準三は1901年岐阜県に生まれ、1927年東京帝国大学文学部美学美術史学科を卒業した——この教育背景は当時の日本人建築家のあいだでは極めて異例で、ほとんどの建築家は工学部出身である。この人文的訓練によって、彼は同時代の日本人建築家よりも現代芸術運動とヨーロッパ前衛文化について深い理解をもつに至った。1929年、彼はパリに到着し、コルビュジエ事務所の扉を直接叩いた。',
            '坂倉のコルビュジエ事務所での勤務期間（1929-1936）はすべての日本人弟子のなかで最長の七年間である。彼はコルビュジエ自邸（1933年）など核心的プロジェクトに深く関与し、1937年パリ万博日本館の設計責任者も務めた。この日本館は伝統的日本木造と近代的スチール·ガラスの言語を結びつけ、万博大賞を受賞した。坂倉はこれにより、当時の国際建築界でもっとも注目される日本人の顔の一人となった。',
            '1936年帰国後、坂倉は自身の事務所を開設した。同時期にコルビュジエ事務所から帰国した前川国男とは異なり、坂倉のスタイルは最初からより感性的なヒューマニズムへ傾いていた。彼の作品はコルビュジエの形式規律を保ちながらも、素材とディテールにより多くの日本伝統美学の温度を注入した——木、和紙、間接照明、庭の浸透——これらの要素が彼のモダニズムから教条を減らし、呼吸を与えている。',
          ],
          en: [
            'Junzo Sakakura was born in Gifu Prefecture in 1901 and graduated from Tokyo Imperial University\u2019s Department of Aesthetics and Art History in 1927 \u2014 his educational background was extremely unusual among Japanese architects of the time, most of whom came from engineering faculties. This humanistic training gave him a deeper understanding of modern art movements and European avant-garde culture than his Japanese contemporaries. In 1929, he arrived in Paris and knocked directly on the door of Le Corbusier\u2019s office.',
            'Sakakura\u2019s tenure in Corbusier\u2019s office (1929\u20131936) was the longest of all Japanese apprentices \u2014 seven years. He was deeply involved in core projects including Corbusier\u2019s own apartment-atelier (1933) and even served as design lead for the Japanese Pavilion at the 1937 Paris Expo. This pavilion combined traditional Japanese timber construction with modern steel-and-glass language, winning the Expo Grand Prix. Sakakura thus became one of the most prominent Japanese faces in international architecture at the time.',
            'After returning to Japan in 1936, Sakakura opened his own office. Unlike Kunio Maekawa, who also returned from Corbusier\u2019s office around the same time, Sakakura\u2019s style inclined from the outset toward a more sensuous humanism. His works retained Corbusier\u2019s formal discipline but infused material and detail with more of the warmth of traditional Japanese aesthetics \u2014 wood, washi paper, indirect lighting, garden penetration \u2014 elements that reduced dogmatism in his modernism and added room to breathe.',
          ],
        },
      },
      {
        title: { zh: '战后日本的文化容器', ja: '戦後日本の文化容器', en: 'Cultural Vessels of Postwar Japan' },
        paragraphs: {
          zh: [
            '二战结束后，坂仓准三迎来了他职业生涯中最多产的时期。日本的重建不仅需要住房和基础设施，更需要文化机构来重新定义国家的身份和价值观。坂仓在这一时期设计了一系列重要的公共文化建筑——神奈川县立近代美术馆（1951）、国际文化会馆（1955，与前川国男、吉村顺三合作）、东京新宿站西口广场（1967）等——这些作品在柯布西耶的现代主义框架下注入了日本公共精神。',
            '神奈川县立近代美术馆是坂仓在战后完成的第一座重要公共建筑，也是日本最早的公立现代美术馆之一。建筑以简洁的白色混凝土体量和水平延展的比例坐落在镰仓的公园中，面对着一片池塘。它的低调和克制——不像纪念碑而更像一座展亭——定义了一种日本式公共建筑的典范：不自大、不喧哗、与环境共生。',
            '国际文化会馆（International House of Japan）是坂仓对"日本如何与世界对话"这一命题的建筑回答。这座位于东京六本木的复合设施融合了日式庭院、茶室、图书馆和会议空间，旨在为日本和国际知识分子提供一个交流场所。建筑在混凝土结构外套上了日本传统木构造的比例和节奏，庭院借景和檐下空间（engawa）的设计使现代建筑具有了日本式的内外渗透关系。这座建筑至今仍是东京最重要的国际文化交流场所之一。',
          ],
          ja: [
            '第二次世界大戦終結後、坂倉準三はキャリアでもっとも多産な時期を迎えた。日本の復興は住宅とインフラだけでなく、国家のアイデンティティと価値観を再定義する文化施設を必要としていた。坂倉はこの時期に一連の重要な公共文化建築を設計した——神奈川県立近代美術館（1951年）、国際文化会館（1955年、前川国男·吉村順三との協働）、新宿駅西口広場（1967年）など——これらの作品はコルビュジエのモダニズム枠組のなかに日本の公共精神を注入している。',
            '神奈川県立近代美術館は坂倉が戦後に完成させた最初の重要公共建築であり、日本最古の公立現代美術館の一つでもある。簡潔な白いコンクリートのボリュームと水平に延びるプロポーションをもって鎌倉の公園に座し、池に面している。その控えめさと抑制——記念碑というよりもパビリオンのように——は日本式公共建築の模範を定義した。自大にならず、騒がず、環境と共生する。',
            '国際文化会館は坂倉による「日本はいかに世界と対話するか」という命題への建築的回答である。この東京六本木に位置する複合施設は日本庭園、茶室、図書館、会議空間を融合し、日本人と国際的知識人に交流の場を提供することを目的とする。建築はコンクリート構造の上に日本伝統木造の比例とリズムをまとわせ、庭の借景と縁側空間のデザインが近代建築に日本的な内と外の浸透関係をもたせている。この建物は今日なお東京のもっとも重要な国際文化交流の場の一つである。',
          ],
          en: [
            'After World War II ended, Junzo Sakakura entered the most prolific period of his career. Japan\u2019s reconstruction required not just housing and infrastructure but cultural institutions to redefine the nation\u2019s identity and values. During this period, Sakakura designed a series of significant public cultural buildings \u2014 the Museum of Modern Art, Kamakura (1951), International House of Japan (1955, in collaboration with Kunio Maekawa and Junzo Yoshimura), Shinjuku Station West Concourse (1967), and others \u2014 works that infused Corbusier\u2019s modernist framework with a Japanese public spirit.',
            'The Museum of Modern Art, Kamakura was Sakakura\u2019s first major public building completed after the war, and one of Japan\u2019s earliest public modern art museums. The building sits in a Kamakura park with simple white concrete volumes and horizontally extended proportions, facing a pond. Its modesty and restraint \u2014 more pavilion than monument \u2014 defined a paradigm of Japanese public architecture: not self-aggrandizing, not noisy, coexisting with the environment.',
            'International House of Japan is Sakakura\u2019s architectural answer to the question \u201cHow should Japan converse with the world?\u201d This complex facility in Tokyo\u2019s Roppongi district fuses a Japanese garden, tea house, library, and conference spaces, aiming to provide a venue for exchange between Japanese and international intellectuals. The building superimposes the proportions and rhythms of traditional Japanese timber construction onto a concrete structure, while borrowed-scenery and engawa (veranda) design give modern architecture a Japanese-quality relationship of interior-exterior permeability. The building remains one of Tokyo\u2019s most important venues for international cultural exchange.',
          ],
        },
      },
      {
        title: { zh: '温和的现代主义者：遗产与局限', ja: '穏健なモダニスト：遺産と限界', en: 'The Gentle Modernist: Legacy and Limits' },
        paragraphs: {
          zh: [
            '坂仓准三在建筑史上的地位有些尴尬——他既不像前川国男那样具有明确的"师承"叙事（虽然实际上他是柯布西耶最早的日本弟子），也不像丹下健三那样拥有国际巨星的光芒。他是一个"建筑师中的建筑师"——他的作品不刻意追求标志性，而是追求一种温和的完美。这种特质使他在日本建筑界备受尊敬，但在国际叙事中相对沉寂。',
            '坂仓的设计方法论强调"综合"（synthesis）。他认为建筑设计不仅是形式和空间的决策，还应该包含对家具、灯具、纺织品、标识甚至景观的全面控制。这种"整体设计"的理念比战后意大利的"Bel Design"运动更为前瞻，可惜在日本未能获得同样的国际关注。他的设计事务所至今仍以这种综合方法论运营。',
            '1969年，坂仓准三去世，享年68岁。他留下了一批品质极高的公共文化建筑，这些作品至今仍在安静地服务着。近年来，随着日本现代建筑史研究的深化，坂仓的重要性和独特性正在被新一代学者重新发现。他不是革命者，而是一个调停者——在柯布西耶的激进和日本传统的保守之间，在西方现代主义的普适性和日本地域的特殊性之间，他找到了一条温和而持久的道路。',
          ],
          ja: [
            '坂倉準三の建築史における位置づけはやや気まずい——彼は前川国男のように明確な「師弟」物語をもたず（実際にはコルビュジエのもっとも初期の日本人弟子だが）、丹下健三のように国際的スーパースターの輝きももたない。彼は「建築家のなかの建築家」である——彼の作品は意識的に象徴性を追求せず、むしろ穏やかな完璧さを追求する。この特質が彼を日本建築界で広く尊敬される存在にしたが、国際的物語のなかでは相対的に静かなままだった。',
            '坂倉のデザイン方法論は「総合」を強調する。彼は建築デザインが形式と空間の決定だけでなく、家具、照明、テキスタイル、サイン、さらにはランドスケープの全体的制御を含むべきだと考えた。この「トータルデザイン」の理念は戦後イタリアの「ベル·デザイン」運動よりも先駆的だったが、残念ながら日本では同等の国際的注目を得られなかった。彼のデザイン事務所は今日なおこの総合的方法論で運営されている。',
            '1969年、坂倉準三は68歳で死去した。彼は質のきわめて高い公共文化建築の一群を残し、これらの作品は今日なお静かに奉仕を続けている。近年、日本近代建築史研究の深化にともない、坂倉の重要性と独自性が新世代の研究者によって再発見されつつある。彼は革命家ではなく、調停者だった——コルビュジエの急進性と日本伝統の保守性のあいだで、西洋モダニズムの普遍性と日本地域の特殊性のあいだで、彼は穏やかで持続的な道を見出した。',
          ],
          en: [
            'Junzo Sakakura\u2019s position in architectural history is somewhat awkward \u2014 he lacks the clear \u201cmaster-disciple\u201d narrative of Kunio Maekawa (though he was in fact Corbusier\u2019s earliest Japanese apprentice) and lacks the international superstar radiance of Kenzo Tange. He is an \u201carchitect\u2019s architect\u201d \u2014 his works do not deliberately pursue iconicity but pursue a gentle perfection. This quality earned him deep respect within Japanese architectural circles while leaving him relatively quiet in international narratives.',
            'Sakakura\u2019s design methodology emphasizes \u201csynthesis.\u201d He believed architectural design involved not only decisions about form and space but should include comprehensive control over furniture, lighting, textiles, signage, and even landscape. This \u201ctotal design\u201d philosophy predated postwar Italy\u2019s \u201cBel Design\u201d movement, though it unfortunately did not gain the same international attention in Japan. His design office continues to operate with this integrated methodology today.',
            'Junzo Sakakura died in 1969 at age 68. He left behind a body of public cultural buildings of extremely high quality, works that continue to serve quietly today. In recent years, with the deepening of research into Japanese modern architectural history, Sakakura\u2019s importance and uniqueness are being rediscovered by a new generation of scholars. He was not a revolutionary but a mediator \u2014 between Corbusier\u2019s radicalism and Japanese tradition\u2019s conservatism, between Western modernism\u2019s universality and Japanese regional particularity, he found a gentle and enduring path.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'international-house-of-japan', note: { zh: '东京六本木的一座文化绿洲，混凝土结构穿着日本木构的比例外衣，庭院和缘侧定义了内外渗透的日本现代主义。', ja: '東京六本木の文化的オアシス。コンクリート構造が日本木造の比例の外衣をまとい、庭と縁側が内外の浸透する日本的モダニズムを定義する。', en: 'A cultural oasis in Tokyo\u2019s Roppongi, a concrete structure wearing the proportional skin of Japanese timber construction, where garden and engawa define a Japanese modernism of interior-exterior permeability.' } },
      { slug: 'shinjuku-station-west-concourse', note: { zh: '新宿站西口的城市基础设施，将交通枢纽转化为市民广场，展现了公共空间的民主化。', ja: '新宿駅西口の都市インフラストラクチャー。交通結節点を市民広場に転換し、公共空間の民主化を示す。', en: 'Urban infrastructure at Shinjuku Station\u2019s west entrance, transforming a transit hub into a civic plaza, demonstrating the democratization of public space.' } },
      { slug: 'taro-okamoto-memorial-museum', note: { zh: '为日本最具代表性的前卫艺术家设计的纪念馆，建筑以半地下姿态埋入川崎的公园，像一座混凝土洞穴。', ja: '日本でもっとも代表的な前衛芸術家のために設計された記念館。半地下の姿勢で川崎の公園に埋め込まれ、コンクリートの洞窟のようである。', en: 'A memorial museum designed for Japan\u2019s most iconic avant-garde artist, semi-submerged into a Kawasaki park like a concrete cave.' } },
    ],
    sources: [
      { title: 'Sakakura Associates', url: 'https://www.sakakura.co.jp/' },
      { title: 'International House of Japan', url: 'https://www.i-house.or.jp/' },
      { title: 'Wikidata: Junzo Sakakura', url: 'https://www.wikidata.org/wiki/Q1364822' },
    ],
  },

  'yoshinobu-ashihara': {
    slug: 'yoshinobu-ashihara',
    summary: {
      zh: '芦原义信是日本战后最具思辨力的建筑理论家之一，也是将"外部空间"概念系统化的先驱。他最重要的著作《外部空间的设计》和《街道的美学》影响了不止一代建筑学人。作为建筑师，他设计的东京艺术剧场、索尼大厦等作品将理论与持续的实践完美结合。',
      ja: '芦原義信は日本戦後もっとも思索力のある建築理論家の一人であり、「外部空間」の概念を体系化した先駆者である。彼の最も重要な著作『外部空間の設計』と『街並みの美学』は一世代にとどまらず建築を学ぶ者たちに影響を与えた。建築家としては、東京芸術劇場、ソニービルなどの作品が理論と持続的実践を完璧に結合している。',
      en: 'Yoshinobu Ashihara is one of postwar Japan\u2019s most intellectually rigorous architectural theorists and the pioneer who systematized the concept of \u201cexterior space.\u201d His most important books, Exterior Design in Architecture and The Aesthetic Townscape, influenced more than one generation of architecture students. As a practitioner, works such as the Tokyo Metropolitan Theatre and the Sony Building perfectly fused theory with sustained practice.',
    },
    core_ideas: {
      zh: [
        '建筑空间不是只存在于墙内——建筑之间的空间（外部空间）同样需要被设计和思考',
        '街道不是交通的通道，而是城市生活的舞台——建筑师必须从行人的视角思考城市',
        '日本的"间"（ma）概念是思考空间的另一种方式——它不是实体，而是实体之间的关系',
        '好的城市空间需要"阴翳"——不是完全的暴露，而是明暗的层次和深度',
        '现代建筑不应抛弃传统美学，而是应该将其转化和重构',
      ],
      ja: [
        '建築空間は壁の内側だけに存在するのではない——建築と建築のあいだの空間（外部空間）も同様に設計され、思考される必要がある',
        '街路は交通の通路ではなく、都市生活の舞台である——建築家は歩行者の視点から都市を考えなければならない',
        '日本の「間」の概念は空間を思考するもう一つの方法である——それは実体ではなく、実体と実体のあいだの関係である',
        '良い都市空間には「陰翳」が必要である——完全な露出ではなく、明暗の層と深さが',
        '近代建築は伝統美学を捨てるべきではなく、それを転換し再構築すべきである',
      ],
      en: [
        'Architectural space does not exist only within walls \u2014 the space between buildings (exterior space) must also be designed and thought about',
        'Streets are not traffic conduits but stages for urban life \u2014 architects must think about cities from the pedestrian\u2019s perspective',
        'The Japanese concept of ma is another way of thinking about space \u2014 it is not substance but the relationship between substances',
        'Good urban space requires in\u2019ei (shadows) \u2014 not total exposure but layers and depth of light and dark',
        'Modern architecture should not discard traditional aesthetics but should transform and reconstruct them',
      ],
    },
    portrait: {
      url: '/images/architects/yoshinobu-ashihara-portrait.jpg',
      author: '',
      license: '',
      source_url: '',
      alt: { zh: '芦原义信的建筑肖像', ja: '芦原義信の建築肖像', en: 'Portrait of architect Yoshinobu Ashihara' },
    },
    sections: [
      {
        title: { zh: '从哈佛到东京：东西方空间的碰撞', ja: 'ハーバードから東京へ：東西空間の衝突', en: 'From Harvard to Tokyo: The Collision of Eastern and Western Space' },
        paragraphs: {
          zh: [
            '芦原义信1918年生于东京，1942年毕业于东京帝国大学建筑学科，随后在海军服役。战后他前往哈佛大学设计研究生院深造，1953年获得建筑硕士学位——师从马塞尔·布劳耶。哈佛的经历让他系统掌握了西方现代建筑的理论和方法论，但也让他意识到一个重要的问题：西方现代主义关于空间的理解（以实体和内部空间为核心）与东亚传统（以虚空、间隙和关系为核心）存在根本性差异。',
            '1956年，芦原在东京开设事务所。他早期的作品——如中央公论社大楼（1962）——已经展现出他对建筑之间关系的关注。但真正让他找到自己独特声音的，是他将设计实践与理论写作并行的决心。他意识到，日本建筑界缺少一种能够用现代语言描述传统空间智慧的词汇——这正是他想要创造的。',
            '芦原的理论工作始于对日本传统城市空间（尤其是京都）的深入研究。他发现，京都的街道、院落和神社参道中存在一种精妙的"阴翳"逻辑——光与影不是对立物，而是空间连续体上不同的层次。这种观察后来成为他"外部空间"理论的核心基础之一。',
          ],
          ja: [
            '芦原義信は1918年東京に生まれ、1942年東京帝国大学建築学科を卒業後、海軍に勤務した。戦後ハーバード大学デザイン大学院に進学し、1953年に建築修士号を取得した——マルセル·ブロイヤーに師事。ハーバードでの経験は彼に西洋近代建築の理論と方法論を体系的に習得させたが、同時に重要な問題を意識させた——西洋モダニズムの空間理解（実体と内部空間を核心とする）は東アジアの伝統（虚空、隙間、関係を核心とする）と根本的に異なるのである。',
            '1956年、芦原は東京に事務所を開設した。彼の初期作品——中央公論社ビル（1962年）など——はすでに建築間の関係への関心を示している。しかし彼が真に独自の声を見出したのは、デザイン実践と理論的著述を並行させる決心においてだった。彼は日本建築界に伝統的空間の知恵を近代的言語で記述する語彙が欠けていることを認識した——これこそ彼が創造しようとしたものだった。',
            '芦原の理論的仕事は日本の伝統的都市空間（とりわけ京都）の深い研究から始まった。彼は京都の街路、院落、神社の参道に精妙な「陰翳」の論理が存在することを発見した——光と影は対立物ではなく、空間連続体上の異なる層なのである。この観察は後に彼の「外部空間」理論の核心的基礎の一つとなった。',
          ],
          en: [
            'Yoshinobu Ashihara was born in Tokyo in 1918, graduated from Tokyo Imperial University\u2019s architecture department in 1942, then served in the navy. After the war, he pursued further study at the Harvard Graduate School of Design, earning a Master of Architecture in 1953 \u2014 studying under Marcel Breuer. The Harvard experience gave him systematic command of Western modern architectural theory and methodology, but it also made him aware of an important issue: Western modernism\u2019s understanding of space (centered on substance and interior space) fundamentally differs from the East Asian tradition (centered on void, interval, and relationship).',
            'In 1956, Ashihara opened his office in Tokyo. His early works \u2014 such as the Chuo Koron Building (1962) \u2014 already showed his concern for relationships between buildings. But what truly allowed him to find his unique voice was his determination to pursue design practice and theoretical writing in parallel. He recognized that Japanese architectural discourse lacked a vocabulary capable of describing traditional spatial wisdom in modern language \u2014 and this was precisely what he set out to create.',
            'Ashihara\u2019s theoretical work began with deep study of traditional Japanese urban spaces, especially Kyoto. He discovered that a subtle logic of in\u2019ei (shadow and shade) exists in Kyoto\u2019s streets, courtyard compounds, and shrine approach paths \u2014 light and shadow are not opposites but different layers on a spatial continuum. This observation later became one of the core foundations of his \u201cexterior space\u201d theory.',
          ],
        },
      },
      {
        title: { zh: '《外部空间的设计》：一本改变城市思维的书', ja: '『外部空間の設計』：都市思考を変えた一冊', en: 'Exterior Design in Architecture: A Book That Changed Urban Thinking' },
        paragraphs: {
          zh: [
            '1970年出版的《外部空间的设计》是芦原义信最广为人知的著作，也是建筑学教育中少数被东西方同时广泛引用的日本理论文本之一。这本书的核心论点是简洁而有力的：建筑之间的空间——广场、街道、庭院、公园——不是建筑的"剩余"，而是一个需要同样严肃对待的设计对象。芦原将这种空间命名为"外部空间"（exterior space），并将其定义为"没有屋顶的建筑"。',
            '芦原在书中提出了一系列精确的分析工具。其中最著名的是"宽高比"（D/H ratio）：街道或广场的宽度（D）与两侧建筑高度（H）的比例决定了空间给人的感受——D/H=1时，空间感觉匀称；D/H<1时，空间产生围合感和亲密感（如欧洲中世纪街道）；D/H>1时，空间开始感到疏离（如现代主义新城）。这一指标至今仍是城市设计教学和实践中使用最广泛的工具之一。',
            '芦原还提出了"阴角空间"（内凹空间）和"阳角空间"（外凸空间）的概念。他指出，好的城市空间总是由"阴角"构成的——建筑物围合出的内向空间，而不是建筑物占据后剩下的外向空间。他批评现代主义城市规划过度关注建筑物体本身（阳角），忽视了建筑之间"负形"——即人们实际生活和交往的空间——的设计。这一批评在今天的城市设计话语中已经变得近乎常识。',
          ],
          ja: [
            '1970年に出版された『外部空間の設計』は芦原義信のもっとも広く知られる著作であり、建築教育のなかで東西両方で同時に広く引用される数少ない日本的理論テクストの一つである。この本の核心的主張は簡潔で力強い——建築と建築のあいだの空間——広場、街路、中庭、公園——は建築の「残余」ではなく、同等に真剣に扱われるべきデザイン対象である。芦原はこの空間を「外部空間」と名付け、「屋根のない建築」と定義した。',
            '芦原は本書で一連の精確な分析ツールを提出した。もっとも有名なのは「幅高比」（D/H比）である——街路や広場の幅（D）と両側建築の高さ（H）の比が空間の感じを決定する。D/H=1のとき空間は均整がとれて感じられ、D/H<1のとき空間は囲まれ感と親密さを生み（ヨーロッパ中世の街路のように）、D/H>1のとき空間は疎遠に感じられ始める（モダニズムのニュータウンのように）。この指標は今日なお都市デザイン教育と実践でもっとも広く使用されるツールの一つである。',
            '芦原はさらに「陰角空間」（内側に凹んだ空間）と「陽角空間」（外側に凸の空間）の概念を提出した。彼は良い都市空間は常に「陰角」によって構成されると指摘する——建物が囲い込む内向きの空間であり、建物が占めた後に残る外向きの空間ではない。彼はモダニズム都市計画が建築物体そのもの（陽角）に過度に注目し、建築間の「負の形」——すなわち人々が実際に生活し交流する空間——のデザインを無視していると批判した。この批判は今日の都市デザイン言説のなかでほとんど常識に近いものとなっている。',
          ],
          en: [
            'Published in 1970, Exterior Design in Architecture is Yoshinobu Ashihara\u2019s best-known work and one of the few Japanese theoretical texts widely cited across both East and West in architectural education. The book\u2019s core argument is simple yet powerful: the spaces between buildings \u2014 plazas, streets, courtyards, parks \u2014 are not the \u201cleftover\u201d of architecture but a design subject requiring equally serious treatment. Ashihara named this space \u201cexterior space\u201d and defined it as \u201carchitecture without a roof.\u201d',
            'Ashihara proposed a series of precise analytical tools in the book. The most famous is the D/H ratio: the ratio of the width (D) of a street or plaza to the height (H) of bordering buildings determines the spatial feeling \u2014 at D/H=1, the space feels balanced; at D/H<1, it generates enclosure and intimacy (like European medieval streets); at D/H>1, it begins to feel alienating (like modernist new towns). This metric remains one of the most widely used tools in urban design teaching and practice.',
            'Ashihara also proposed the concepts of \u201cnegative corner space\u201d (inwardly recessed space) and \u201cpositive corner space\u201d (outwardly projecting space). He pointed out that good urban space is always composed of \u201cnegative corners\u201d \u2014 inward spaces enclosed by buildings, not outward spaces left over after buildings occupy a site. He criticized modernist urban planning for excessively focusing on building objects themselves (positive corners) and neglecting the design of the \u201cnegative form\u201d between buildings \u2014 the spaces where people actually live and interact. This criticism has become almost common sense in today\u2019s urban design discourse.',
          ],
        },
      },
      {
        title: { zh: '索尼大厦与理论家的实践', ja: 'ソニービルと理論家の実践', en: 'The Sony Building and the Theorist\u2019s Practice' },
        paragraphs: {
          zh: [
            '芦原义信不只是一位理论家——他的建成作品同样值得认真对待。1966年竣工的东京索尼大厦（银座）是他最具象征意义的作品。这座建筑位于银座最显眼的十字路口（数寄屋桥交叉口），以独特的"花瓣形"平面展开——立面被划分为多个垂直区块，每个区块向外微微倾斜，像一朵正在开放的花。这种设计既是空间宣言（将角落转化为向城市开放的"flower petal"），也是对银座极度紧凑用地的巧妙回应。',
            '索尼大厦的另一个创新是它的"竖向街道"概念。芦原将建筑内部的垂直交通——自动扶梯和楼梯——视为城市人行道的延续。他创造了"错层中庭"（split-level atrium），让每一层都有一部分空间可以从中庭看到，鼓励人们在建筑中漫步和停留，而不仅仅是高效地到达目的地。这种将"外部空间"理念延伸至建筑内部的做法，在当时的全球商业建筑中极为前卫。',
            '芦原的其他重要作品包括金泽文化厅（1977）——一座将传统日本"数寄屋"美学转化为现代混凝土语言的公共文化建筑；东京艺术剧场（1990）——池袋的大型综合文化设施；以及冈山交响乐厅（1991）。这些作品在形式上可能不如索尼大厦那样激进，但它们始终如一地贯穿着芦原的理论关注：空间之间的关系、人的视角、以及建筑与城市之间的温柔界面。他于2003年去世，享年85岁。',
          ],
          ja: [
            '芦原義信は単なる理論家ではなかった——彼の建作品もまた真剣に扱う価値がある。1966年に竣工した東京ソニービル（銀座）は彼のもっとも象徴的な作品である。この建築は銀座でもっとも目立つ交差点（数寄屋橋交差点）に位置し、独特の「花びら形」平面で展開する——ファサードは複数の垂直ブロックに分割され、各ブロックが外側にわずかに傾き、花が開くかのようである。このデザインは空間宣言（角を都市に向かって開く「花びら」に変換する）であると同時に、銀座の極度にコンパクトな敷地への巧妙な応答でもある。',
            'ソニービルのもう一つの革新はその「縦の街路」概念である。芦原は建築内部の垂直動線——エスカレーターと階段——を都市の歩道の延長と見なした。彼は「スキップフロア·アトリウム」（段差のある吹き抜け）を創造し、各階の一部がアトリウムから見えるようにして、人々がただ効率的に目的地に到達するのではなく、建築のなかを散策し滞留することを促した。この「外部空間」の理念を建築内部に延長する手法は、当時の世界の商業建築においてきわめて前衛的だった。',
            '芦原の他の重要な作品には金沢文化庁（1977年）——伝統的日本の「数寄屋」美学を近代的コンクリート言語に転換した公共文化建築——、東京芸術劇場（1990年）——池袋の大規模複合文化施設——、岡山シンフォニーホール（1991年）などがある。これらの作品は形式的にはソニービルほど急進的ではないかもしれないが、一貫して芦原の理論的関心を貫いている——空間同士の関係、人間の視点、建築と都市のあいだのやさしい界面。彼は2003年に85歳で死去した。',
          ],
          en: [
            'Yoshinobu Ashihara was not just a theorist \u2014 his built works deserve equally serious consideration. The Tokyo Sony Building in Ginza, completed in 1966, is his most iconic work. Located at Ginza\u2019s most prominent intersection (Sukiyabashi Crossing), the building unfolds with a distinctive \u201cflower-petal\u201d plan \u2014 the fa\u00e7ade is divided into multiple vertical blocks, each tilting slightly outward like a blooming flower. This design is at once a spatial manifesto (transforming a corner into a \u201cflower petal\u201d opening toward the city) and a clever response to Ginza\u2019s extremely compact sites.',
            'Another innovation of the Sony Building is its \u201cvertical street\u201d concept. Ashihara viewed the building\u2019s internal vertical circulation \u2014 escalators and stairs \u2014 as an extension of the city sidewalk. He created a split-level atrium so that a portion of every floor is visible from the atrium, encouraging people to wander and linger within the building rather than merely reach destinations efficiently. This approach of extending \u201cexterior space\u201d ideas into the building interior was extremely avant-garde in global commercial architecture at the time.',
            'Ashihara\u2019s other significant works include the Kanazawa Bunka Hall (1977) \u2014 a public cultural building translating traditional Japanese sukiya aesthetics into modern concrete language; the Tokyo Metropolitan Theatre (1990) \u2014 a large-scale cultural complex in Ikebukuro; and the Okayama Symphony Hall (1991). These works may not be as formally radical as the Sony Building, but they consistently embody Ashihara\u2019s theoretical concerns: relationships between spaces, human perspective, and the gentle interface between architecture and city. He died in 2003 at 85.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'sony-building', note: { zh: '银座十字路口的花瓣形建筑，竖向街道理念的宣言，将城市人行道延伸到建筑的每一层。', ja: '銀座交差点の花びら形建築。縦の街路理念の宣言——都市の歩道を建築の各階に延長する。', en: 'A flower-petal-shaped building at the Ginza crossroads, a manifesto of the vertical-street concept, extending the city sidewalk into every floor of the building.' } },
      { slug: 'tokyo-metropolitan-theatre', note: { zh: '池袋的文化巨舰，容纳四个表演厅的复合体，外部空间和内部空间在此形成交响。', ja: '池袋の文化巨艦。四つの公演ホールを収容する複合体——外部空間と内部空間がここで交響を形成する。', en: 'A cultural flagship in Ikebukuro, a complex housing four performance halls where exterior and interior space form a symphony.' } },
      { slug: 'national-museum-of-japanese-history', note: { zh: '千叶县佐仓市的宏大历史博物馆，建筑以低矮姿态融入坡地景观，展现对"负形"空间的成熟运用。', ja: '千葉県佐倉市の宏大な歴史博物館。建築は低い姿勢で斜面のランドスケープに溶け込み、「負の形」空間への成熟した運用を示す。', en: 'A grand history museum in Sakura City, Chiba, where the building merges into the sloped landscape at a low profile, demonstrating mature deployment of \u201cnegative form\u201d space.' } },
    ],
    sources: [
      { title: 'Ashihara Yoshinobu \u2014 Exterior Design in Architecture (Archive)', url: 'https://archive.org/details/exteriordesignin0000ashi' },
      { title: 'Tokyo Metropolitan Theatre', url: 'https://www.geigeki.jp/' },
      { title: 'Wikidata: Yoshinobu Ashihara', url: 'https://www.wikidata.org/wiki/Q11474617' },
    ],
  },

  'buckminster-fuller': {
    slug: 'buckminster-fuller',
    summary: {
      zh: '巴克敏斯特·富勒不是传统意义上的建筑师——他是发明家、哲学家、未来学家和结构天才的混合体。他提出的"测地线穹顶"（Geodesic Dome）是20世纪最具原创性的结构发明之一，以最轻的重量覆盖最大的空间。他的"Dymaxion"概念重新思考人类居住的根本问题，至今仍是可持续设计的精神先驱。',
      ja: 'バックミンスター·フラーは伝統的意味での建築家ではない——発明家、哲学者、未来学者、構造の天才の混合体である。彼の提唱した「ジオデシック·ドーム」は20世紀でもっとも独創的な構造発明の一つであり、最小の重量で最大の空間を覆う。彼の「ダイマクション」概念は人間居住の根本問題を再考し、今日なおサステナブルデザインの精神的先駆である。',
      en: 'Buckminster Fuller was not an architect in the traditional sense \u2014 he was a hybrid of inventor, philosopher, futurist, and structural genius. The geodesic dome he proposed is one of the 20th century\u2019s most original structural inventions, enclosing the largest space with the lightest weight. His \u201cDymaxion\u201d concept rethought the fundamental questions of human habitation and remains a spiritual forerunner of sustainable design today.',
    },
    core_ideas: {
      zh: [
        '"少费多用"——用最少的资源实现最多的功能，不是道德劝诫而是工程目标',
        '所有真正的发现都始于打破陈规——建筑师的想象力不应该被直角限制',
        '地球是一艘资源有限的"太空船"——我们应该以这种意识来设计一切',
        '张力（tension）和压缩（compression）不是对立的力，而是同一结构系统中的互补伙伴',
        '专业化导致狭隘——真正的创新者必须跨越学科边界',
      ],
      ja: [
        '「最小のインプットで最大のアウトプットを」——最小の資源で最大の機能を実現することは、道徳的勧告ではなく工学的目標である',
        'すべての真の発見は既成概念を破ることから始まる——建築家の想像力は直角に制限されるべきではない',
        '地球は資源の有限な「宇宙船」である——私たちはこの意識をもってすべてをデザインすべきだ',
        '張力と圧縮は対立する力ではなく、同一の構造体系における補完的パートナーである',
        '専門化は狭隘さを導く——真の革新者は学問の境界を越えなければならない',
      ],
      en: [
        '\u201cDoing more with less\u201d \u2014 achieving maximum function with minimum resources is not a moral exhortation but an engineering goal',
        'All true discovery begins by breaking established patterns \u2014 the architect\u2019s imagination should not be limited by the right angle',
        'Earth is a \u201cspaceship\u201d with finite resources \u2014 we should design everything with this awareness',
        'Tension and compression are not opposing forces but complementary partners in a single structural system',
        'Specialization leads to narrowness \u2014 true innovators must cross disciplinary boundaries',
      ],
    },
    portrait: {
      url: '/images/architects/buckminster-fuller-portrait.jpg',
      author: '',
      license: '',
      source_url: '',
      alt: { zh: '巴克敏斯特·富勒的建筑肖像', ja: 'バックミンスター·フラーの建築肖像', en: 'Portrait of Buckminster Fuller' },
    },
    sections: [
      {
        title: { zh: 'Dymaxion世界：重新发明住宅', ja: 'ダイマクション世界：住宅の再発明', en: 'The Dymaxion World: Reinventing the House' },
        paragraphs: {
          zh: [
            '巴克敏斯特·富勒1895年生于马萨诸塞州，两度被哈佛大学开除——这个看似失败的开端恰恰是他的思想的隐喻：他不属于任何既有体系。1920年代，他开始了被称为"Dymaxion"（动态最大化）的一系列发明——Dymaxion住宅（1929）、Dymaxion汽车（1933）、Dymaxion浴室（1936）——这些概念都以"用最少的材料完成最大的功能"为核心目标。',
            'Dymaxion住宅是富勒最激进的居住提案。这座六角形平面的预制住宅悬挂在一根中央桅杆上，重量不到3吨（传统住宅约150吨），可以用直升机运输到任何地点。它包含雨水收集、自然通风、以及一个完整的"技术核心"（厨房和浴室集成在一个预制单元中）。虽然只建造了两个原型，Dymaxion住宅的思想——预制化、轻量化、自给自足——直到今天仍是可持续住宅设计的核心议题。',
            'Dymaxion汽车是另一项疯狂但超前的发明：一辆11座的三轮汽车，后轮驱动，前轮转向，能够以当时汽车两倍的燃油效率行驶，可以原地旋转180度。虽然只生产了三辆原型，它的气动外形和空间效率概念比今天的MPV早了几十年。富勒的Dymaxion系列发明有一个共同特点：它们都不是对现有产品的改良，而是对基本问题的重新定义——"住宅必须是什么？""汽车必须是什么？"这种根性思维使他成为一个设计哲学家而不仅仅是发明家。',
          ],
          ja: [
            'バックミンスター·フラーは1895年マサチューセッツ州に生まれ、ハーバード大学を二度放校された——この一見失敗に見えるスタートは、彼の思考のメタファーでもある——彼はいかなる既存の体系にも属さなかった。1920年代、彼は「ダイマクション」（動的最大化）と呼ばれる一連の発明を開始した——ダイマクション住宅（1929年）、ダイマクション自動車（1933年）、ダイマクション浴室（1936年）——これらの概念はすべて「最小の材料で最大の機能を達成する」ことを核心目標としている。',
            'ダイマクション住宅はフラーのもっとも急進的な居住提案である。この六角形平面のプレハブ住宅は一本の中央マストに吊り下げられ、重量は3トン未満（伝統的住宅は約150トン）、ヘリコプターで任意の地点に輸送できる。雨水収集、自然換気、そして完全な「技術的コア」（キッチンと浴室が一つのプレハブユニットに統合）を含む。二つの試作しか建設されなかったが、ダイマクション住宅の思想——プレハブ化、軽量化、自給自足——は今日なおサステナブル住宅デザインの核心的テーマである。',
            'ダイマクション自動車はもう一つの狂気じみたが先駆的な発明である——11人乗りの三輪自動車、後輪駆動、前輪操舵。当時の自動車の二倍の燃料効率で走行でき、その場で180度回転できる。三台の試作しか生産されなかったが、その空気力学的形状と空間効率の概念は今日のMPVより数十年先行している。フラーのダイマクションシリーズ発明に共通する特徴——それらは既存製品の改良ではなく、基本的問いの再定義である——「住宅とは何でなければならないか」「自動車とは何でなければならないか」。この根源的思考が彼を単なる発明家ではなく、デザイン哲学者にしている。',
          ],
          en: [
            'Buckminster Fuller was born in Massachusetts in 1895 and was expelled from Harvard twice \u2014 a seemingly failed start that is also a metaphor for his thinking: he belonged to no existing system. In the 1920s, he launched a series of inventions called \u201cDymaxion\u201d (dynamic maximum) \u2014 the Dymaxion House (1929), the Dymaxion Car (1933), the Dymaxion Bathroom (1936) \u2014 all centered on the goal of \u201cachieving maximum function with minimum material.\u201d',
            'The Dymaxion House was Fuller\u2019s most radical housing proposal. This hexagonal-plan prefabricated house hung from a central mast, weighed under 3 tons (a traditional house roughly 150 tons), and could be transported by helicopter to any location. It included rainwater collection, natural ventilation, and a complete \u201ctechnological core\u201d (kitchen and bathroom integrated into a single prefabricated unit). Though only two prototypes were built, the ideas of the Dymaxion House \u2014 prefabrication, lightweighting, self-sufficiency \u2014 remain core themes of sustainable housing design today.',
            'The Dymaxion Car was another insane yet ahead-of-its-time invention: an 11-passenger, three-wheeled vehicle, rear-wheel drive, front-wheel steering, capable of twice the fuel efficiency of contemporary cars and able to pivot 180 degrees on the spot. Only three prototypes were produced, but its aerodynamic form and spatial efficiency concepts preceded today\u2019s MPVs by decades. Fuller\u2019s Dymaxion inventions share a common trait: they are not improvements on existing products but redefinitions of fundamental questions \u2014 \u201cWhat must a house be?\u201d \u201cWhat must a car be?\u201d This radical thinking made him a design philosopher, not merely an inventor.',
          ],
        },
      },
      {
        title: { zh: '测地线穹顶：用最轻的重量覆盖世界', ja: 'ジオデシック·ドーム：最軽量で世界を覆う', en: 'The Geodesic Dome: Covering the World with the Lightest Weight' },
        paragraphs: {
          zh: [
            '测地线穹顶（Geodesic Dome）是富勒最具影响力的发明。其基本原理是将一个球体表面分成大量的三角形——这些三角形共同构成一个自支撑的空间格架（space frame）。因为三角形是不可变形的几何单元，整个结构的强度来自几何形状本身，而非材料的厚度。这意味着：穹顶越大，其重量与覆盖面积的比例越低。',
            '1950年代至1960年代是测地线穹顶的黄金时期。1954年，富勒为美国海军设计了"雷达穹顶"（radome）——覆盖北极圈雷达站的巨大测地线穹顶，能够承受极端风雪载荷。此后，穹顶被用于工厂、体育馆、展览空间和温室。1967年蒙特利尔世博会的美国馆——一座直径76米的透明测地线穹顶（后来成为蒙特利尔生物圈博物馆）——成为富勒思想最壮观的展示。这座穹顶以钢管制成的三角形网格覆盖着丙烯酸面板，内部是一个完整的生态系统。',
            '1990年代，富勒的测地线穹顶以一种出人意料的方式获得了新生——C60碳分子（"巴克敏斯特富勒烯"）的结构被发现为截角二十面体，与测地线穹顶的几何学同构。这一发现让富勒的几何理念从建筑学进入了化学和材料科学的前沿。他于1983年去世，但他在结构工程、可持续设计和系统思维方面的遗产正在被新一代科学家和设计师重新发现。',
          ],
          ja: [
            'ジオデシック·ドームはフラーのもっとも影響力のある発明である。その基本原理は、球体の表面を大量の三角形に分割すること——これらの三角形が共に自己支持型のスペースフレームを構成する。三角形は変形不可能な幾何学的単位であるため、構造全体の強度は素材の厚みではなく幾何学的形状そのものに由来する。これはつまり、ドームが大きければ大きいほど、その重量と覆う面積との比率は低くなる。',
            '1950年代から1960年代にかけてはジオデシック·ドームの黄金時代だった。1954年、フラーはアメリカ海軍のために「レドーム」を設計した——北極圏のレーダー基地を覆う巨大なジオデシック·ドームで、極端な風雪荷重に耐えることができる。その後、ドームは工場、体育館、展示空間、温室に利用された。1967年モントリオール万博のアメリカ館——直径76メートルの透明なジオデシック·ドーム（後にモントリオール·バイオスフィアとなる）——はフラーの思想のもっとも壮観な展示となった。このドームは鋼管でできた三角形のグリッドがアクリルパネルを覆っており、内部は完全な生態系である。',
            '1990年代、フラーのジオデシック·ドームは意外な方法で新たな生命を得た——C60炭素分子（「バックミンスターフラーレン」）の構造が切頂二十面体であることが発見され、ジオデシック·ドームの幾何学と同型だったのである。この発見によりフラーの幾何学理念は建築学から化学·材料科学の最先端へと足を踏み入れた。彼は1983年に死去したが、構造工学、サステナブルデザイン、システム思考における彼の遺産は新世代の科学者やデザイナーによって再発見されつつある。',
          ],
          en: [
            'The geodesic dome is Fuller\u2019s most influential invention. Its basic principle is dividing a sphere\u2019s surface into a large number of triangles \u2014 together these triangles form a self-supporting space frame. Because the triangle is a geometrically undeformable unit, the entire structure\u2019s strength comes from the geometry itself, not the thickness of the material. This means: the larger the dome, the lower the ratio of its weight to the area it covers.',
            'The 1950s and 1960s were the golden age of the geodesic dome. In 1954, Fuller designed \u201cradomes\u201d for the U.S. Navy \u2014 enormous geodesic domes covering Arctic Circle radar stations, capable of withstanding extreme wind and snow loads. Thereafter, domes were used for factories, sports halls, exhibition spaces, and greenhouses. The United States Pavilion at Expo 67 in Montreal \u2014 a 76-meter-diameter transparent geodesic dome (later the Montreal Biosphere) \u2014 became the most spectacular display of Fuller\u2019s ideas. This dome featured a triangular grid of steel tubes clad with acrylic panels, enclosing a complete ecosystem.',
            'In the 1990s, Fuller\u2019s geodesic dome gained new life in an unexpected way \u2014 the structure of the C60 carbon molecule (\u201cBuckminsterfullerene\u201d) was discovered as a truncated icosahedron, isomorphic with geodesic dome geometry. This discovery brought Fuller\u2019s geometric ideas from architecture into the frontier of chemistry and materials science. He died in 1983, but his legacy in structural engineering, sustainable design, and systems thinking is being rediscovered by a new generation of scientists and designers.',
          ],
        },
      },
      {
        title: { zh: '太空船地球：一个建筑师的环境哲学', ja: '宇宙船地球号：一人の建築家の環境哲学', en: 'Spaceship Earth: An Architect\u2019s Environmental Philosophy' },
        paragraphs: {
          zh: [
            '"太空船地球"（Spaceship Earth）是富勒最具影响力的隐喻，也是他留给21世纪最重要的思想遗产。这个概念的核心理念是：地球是一艘在宇宙中航行的有限资源飞船——没有无限的供应，也没有"外部"可以丢弃废物。因此，人类文明的唯一出路是学习如何以最少的资源实现最多人的最大福祉。',
            '这一思想直接催生了富勒的"世界游戏"（World Game）——一种大规模协作模拟，旨在用全球资源数据找到让"每个人都赢"的方案。虽然技术上远超当时的能力，但它预示了今天的大数据、系统分析和可持续发展目标（SDGs）。富勒也因此被视为现代可持续运动的知识先驱之一。',
            '富勒作为"建筑师"的身份一直存在争议。他从未获得正式的执业资格，他的"建筑"更多是结构原型和思想实验。但从21世纪的视角看，他的边缘地位恰恰是他最大的力量——正因为他不被建筑学正统约束，他才能提出那些正统不敢问的问题：为什么房子一定要那么重？为什么城市一定要是方形的？为什么我们不能设计一个能让全人类都住得起的系统？这些问题也许是富勒留给建筑师最好的礼物。',
          ],
          ja: [
            '「宇宙船地球号」はフラーのもっとも影響力のあるメタファーであり、彼が21世紀に残したもっとも重要な思想的遺産である。この概念の核心的理念——地球は宇宙を航行する有限資源の宇宙船である——無限の供給はなく、廃棄物を捨てる「外部」も存在しない。したがって人類文明の唯一の活路は、最小の資源で最大多数の最大幸福を実現する方法を学ぶことである。',
            'この思想は直接フラーの「ワールドゲーム」を生み出した——大規模協調シミュレーションで、世界の資源データを用いて「全員が勝つ」解決策を見出すことを目的とする。技術的には当時の能力をはるかに超えていたが、今日のビッグデータ、システム分析、持続可能な開発目標（SDGs）を先取りするものだった。フラーはそれゆえ現代サステナブル運動の知的先駆者の一人と見なされている。',
            'フラーの「建築家」としての身分は一貫して議論の的だった。彼は正式な資格を取得したことはなく、彼の「建築」はより多く構造プロトタイプと思考実験だった。しかし21世紀の視点からすれば、彼の周縁的地位こそが彼の最大の力だった——建築学の正統に拘束されないからこそ、彼はその正統が問う勇気をもたない問いを提起できたのだ。なぜ家はそんなに重くなければならないのか。なぜ都市は方形でなければならないのか。なぜ全人類が住めるシステムを設計できないのか。これらの問いはおそらくフラーが建築家に残した最高の贈り物である。',
          ],
          en: [
            '\u201cSpaceship Earth\u201d is Fuller\u2019s most influential metaphor and the most important intellectual legacy he left to the 21st century. The core idea: Earth is a spaceship of finite resources traveling through the cosmos \u2014 there is no unlimited supply and no \u201coutside\u201d to discard waste. Therefore, humanity\u2019s only way forward is to learn how to achieve the greatest welfare for the greatest number with the least resources.',
            'This idea directly spawned Fuller\u2019s \u201cWorld Game\u201d \u2014 a large-scale collaborative simulation aimed at using global resource data to find solutions where \u201ceveryone wins.\u201d Though technically far beyond the capabilities of the time, it anticipated today\u2019s big data, systems analysis, and Sustainable Development Goals (SDGs). Fuller is thus regarded as one of the intellectual forerunners of the modern sustainability movement.',
            'Fuller\u2019s status as an \u201carchitect\u201d has always been contentious. He never obtained formal licensure, and his \u201cbuildings\u201d were more structural prototypes and thought experiments. But from a 21st-century perspective, his marginal position was precisely his greatest strength \u2014 precisely because he was unconstrained by architectural orthodoxy, he could ask the questions orthodoxy dared not ask: Why must houses be so heavy? Why must cities be rectangular? Why can\u2019t we design a system that allows all of humanity to live? These questions may be the best gift Fuller left to architects.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'montreal-biosphere', note: { zh: '1967年世博会美国馆，直径76米的透明穹顶，测地线结构最壮观的实现，现在是一个环境博物馆。', ja: '1967年万博アメリカ館。直径76メートルの透明なドーム。ジオデシック構造のもっとも壮観な実現であり、現在は環境博物館。', en: 'The U.S. Pavilion at Expo 67, a 76-meter transparent dome, the most spectacular realization of geodesic structure, now an environmental museum.' } },
      { slug: 'dymaxion-house', note: { zh: '不是一栋建筑而是一个宣言——悬挂式六角形住宅，总重不到3吨，可以空运到任何地点。', ja: '一棟の建築ではなく一つの宣言——吊り下げ式六角形住宅、総重量3トン未満、任意の地点に空輸可能。', en: 'Not a building but a manifesto \u2014 a suspended hexagonal house weighing under 3 tons, air-transportable to any location.' } },
      { slug: 'dome-over-manhattan', note: { zh: '未实现的概念：用一公里宽的穹顶覆盖曼哈顿中城。疯狂的尺度和想象力定义了富勒的方法论。', ja: '未実現の概念——幅1キロメートルのドームでマンハッタン·ミッドタウンを覆う。狂気のスケールと想像力がフラーの方法論を定義する。', en: 'An unrealized concept: covering Midtown Manhattan with a kilometer-wide dome. The insane scale and imagination define Fuller\u2019s methodology.' } },
    ],
    sources: [
      { title: 'The Buckminster Fuller Institute', url: 'https://www.bfi.org/' },
      { title: 'Montreal Biosphere \u2014 Espace pour la vie', url: 'https://espacepourlavie.ca/en/biosphere' },
      { title: 'Wikidata: Buckminster Fuller', url: 'https://www.wikidata.org/wiki/Q102269' },
    ],
  },

  'eladio-dieste': {
    slug: 'eladio-dieste',
    summary: {
      zh: '埃拉蒂奥·迪埃斯特是乌拉圭的天才工程师-建筑师。他在南美默默建造了一系列优雅的砖砌薄壳结构——波浪形屋顶丶自承重拱墙丶高斯穹顶——用最朴素的材料（砖）实现了最惊人的结构跨度。他的作品证明了"低技"材料和"高技"思维可以创造出任何钢筋混凝土都无法复制的诗意。',
      ja: 'エラディオ·ディエステはウルグアイの天才エンジニア-建築家である。南米でひっそりと一連の優雅な煉瓦造薄殻構造を建てた——波形屋根、自立アーチ壁、ガウス·ヴォールト——最も素朴な素材（煉瓦）で最も驚異的な構造スパンを実現した。彼の作品は「ローテク」素材と「ハイテク」思考がいかなる鉄筋コンクリートにも複製できない詩情を創造しうることを証明している。',
      en: 'Eladio Dieste was Uruguay\u2019s genius engineer-architect. Quietly in South America, he built a series of elegant brick thin-shell structures \u2014 undulating roofs, self-supporting arch walls, Gaussian vaults \u2014 achieving the most astonishing structural spans with the humblest of materials: brick. His work proves that \u201clow-tech\u201d materials and \u201chigh-tech\u201d thinking can create a poetry no reinforced concrete can replicate.',
    },
    core_ideas: {
      zh: [
        '砖不仅仅是一种填充材料——它可以成为承受大跨度荷载的结构主角',
        '抵抗重力不一定要靠质量——形状和几何本身可以产生力量',
        '结构的经济性不是偷工减料，而是对材料丶形式和施工过程的深度理解',
        '建筑应该对穷人也慷慨——好的空间不是富人的特权',
        '强化砖石（reinforced ceramic）是一种被严重低估的结构可能性',
      ],
      ja: [
        '煉瓦は単なる充填材ではない——大スパン荷重を担う構造的主役になりうる',
        '重力への抵抗は必ずしも質量による必要はない——形状と幾何学そのものが力を生み出しうる',
        '構造の経済性は手抜きではなく、材料·形式·施工プロセスへの深い理解である',
        '建築は貧しい人々にも寛大であるべきだ——良い空間は富者の特権ではない',
        '強化セラミック（reinforced ceramic）は深刻に過小評価された構造的可能性である',
      ],
      en: [
        'Brick is not just a filler material \u2014 it can become the structural protagonist capable of bearing large-span loads',
        'Resisting gravity does not necessarily require mass \u2014 shape and geometry themselves can generate strength',
        'Structural economy is not cutting corners but deep understanding of materials, form, and construction process',
        'Architecture should be generous even to the poor \u2014 good space is not the privilege of the rich',
        'Reinforced ceramic is a seriously underestimated structural possibility',
      ],
    },
    portrait: {
      url: '/images/architects/eladio-dieste-portrait.jpg',
      author: '',
      license: '',
      source_url: '',
      alt: { zh: '埃拉蒂奥·迪埃斯特的建筑肖像', ja: 'エラディオ·ディエステの建築肖像', en: 'Portrait of architect Eladio Dieste' },
    },
    sections: [
      {
        title: { zh: '乌拉圭的砖石诗人：一种"可能的"建筑', ja: 'ウルグアイの煉瓦詩人：「可能な」建築', en: 'Uruguay\u2019s Masonry Poet: An Architecture of the Possible' },
        paragraphs: {
          zh: [
            '埃拉蒂奥·迪埃斯特1917年生于乌拉圭的Artigas，1943年毕业于蒙得维的亚大学工程学院。他的职业生涯完全在乌拉圭展开——这个南美小国既没有发达国家的高技资源，也没有大项目预算。但正是这种"匮乏"激发了迪埃斯特的创造力：他必须用当地最便宜的材料（砖）和最普通的劳动力（当地泥瓦匠）来创造非凡的空间。',
            '迪埃斯特的核心创新在于"强化砖石"（reinforced ceramic）：在砖砌体中嵌入细钢筋，将砖从一种纯压缩材料转变为能够承受弯曲和拉伸的结构材料。结合他独特的形状设计——高斯穹顶（Gaussian vault，即双曲率薄壳）、自承重拱墙（自平衡的超长砖墙）和波浪形屋顶——他实现了一系列在结构上惊人优雅的工业建筑、教堂和市场。',
            '从1960年代到1990年代，迪埃斯特设计和建造了超过200座建筑，几乎全部在乌拉圭。这些作品从未出现在主流建筑杂志的封面，但每一个实地拜访过的人都为它们的力量所震撼。他不是一名追求自我表达的"明星建筑师"——他是一名工程师，一个解决问题的工匠，一个相信"宇宙的秩序可以从砖块的秩序中显现"的人。',
          ],
          ja: [
            'エラディオ·ディエステは1917年ウルグアイのアルティガスに生まれ、1943年モンテビデオ大学工学部を卒業した。彼のキャリアは完全にウルグアイで展開した——この南米の小国には先進国のハイテク資源も大規模プロジェクト予算もない。しかしこの「欠乏」こそがディエステの創造力を触発した——彼は地元でもっとも安価な素材（煉瓦）ともっとも普通の労働力（地元の左官職人）で非凡な空間を創造しなければならなかったのだ。',
            'ディエステの核心的革新は「強化セラミック」にある——煉瓦組積のなかに細い鉄筋を埋め込むことで、煉瓦を純粋な圧縮材から曲げと引張に耐える構造材へと転換する。彼独特の形状設計——ガウス·ヴォールト（二重曲率の薄殻）、自立アーチ壁（自己平衡する極長の煉瓦壁）、波形屋根——と結びつけて、彼は構造的に驚くほど優雅な一連の工業建築、教会、市場を実現した。',
            '1960年代から1990年代にかけて、ディエステは200以上の建築を設計·建設し、ほとんどすべてがウルグアイに位置する。これらの作品は主流建築雑誌の表紙を飾ったことはないが、実際に訪れた者はすべてその力に打たれた。彼は自己表現を追求する「スター建築家」ではない——彼はエンジニアであり、問題解決の職人であり、「宇宙の秩序は煉瓦の秩序から現れうる」と信じた人だった。',
          ],
          en: [
            'Eladio Dieste was born in Artigas, Uruguay in 1917 and graduated from the University of the Republic\u2019s Faculty of Engineering in Montevideo in 1943. His career unfolded entirely within Uruguay \u2014 a small South American nation with neither the high-tech resources of developed countries nor big-project budgets. But precisely this \u201cscarcity\u201d catalyzed Dieste\u2019s creativity: he had to use the cheapest local material (brick) and the most ordinary labor (local masons) to create extraordinary spaces.',
            'Dieste\u2019s core innovation lay in \u201creinforced ceramic\u201d: embedding thin steel bars within brick masonry, transforming brick from a purely compressive material into one capable of resisting bending and tension. Combined with his unique shape designs \u2014 Gaussian vaults (double-curvature thin shells), self-supporting arch walls (self-balancing extra-long brick walls), and undulating roofs \u2014 he realized a series of structurally astonishing and elegant industrial buildings, churches, and markets.',
            'From the 1960s through the 1990s, Dieste designed and built over 200 buildings, almost all in Uruguay. These works never appeared on the covers of mainstream architecture magazines, but everyone who has visited them in person has been awed by their power. He was not a \u201cstarchitect\u201d pursuing self-expression \u2014 he was an engineer, a problem-solving craftsman, someone who believed that \u201cthe order of the universe can manifest from the order of bricks.\u201d',
          ],
        },
      },
      {
        title: { zh: '教堂丶仓库与高斯穹顶', ja: '教会·倉庫·ガウス·ヴォールト', en: 'Churches, Warehouses, and Gaussian Vaults' },
        paragraphs: {
          zh: [
            '迪埃斯特的建筑语言在教堂设计中达到了最高的精神境界。Atlántida教堂（Church of Cristo Obrero y Nuestra Señora de Lourdes, 1960）是他最早也最著名的作品：一座由波浪形砖墙和波浪形屋顶构成的简朴礼拜空间。墙体在两个方向上弯曲——既是承重墙又是屋顶——形成一个连续的、几乎无厚度的壳。阳光通过砖块之间的细微缝隙和顶部的带状天窗渗入，光斑在内壁上缓缓移动。这座教堂在2021年被列入联合国教科文组织世界遗产。',
            '高斯穹顶（Gaussian vault）是迪埃斯特另一个结构杰作。这种形式基于卡尔·弗里德里希·高斯对曲面的数学研究，利用砖层的双曲率（在两个方向上同时弯曲）来获得刚性。迪埃斯特在蒙得维的亚市场（Montevideo Shopping, 1985）中使用了极长跨度的高斯穹顶——巨大的砖壳屋顶在没有任何中间支撑的情况下覆盖了整个市场空间，波浪形的顶部序列像翻涌的海洋凝固在头顶。',
            '迪埃斯特将工业建筑提升到了近乎神圣的高度。他的仓库、工厂和公交总站——这些通常是建筑学最不被关注的类型——在他的手中变成了光的容器。Julio Herrera y Obes仓库（1979）的内部是一系列自承重砖拱，日光从拱顶之间的天窗落下。他证明了一个当时几乎无人相信的命题：砖——人类最古老的建筑材料之一——可以与钢和混凝土在结构效率和美学品质上竞争。',
          ],
          ja: [
            'ディエステの建築言語は教会設計において最高の精神的境地に達した。アトランティダ教会（クリスト·オブレロ教会、1960年）は彼の最も初期かつ最も有名な作品である——波形の煉瓦壁と波形の屋根からなる簡素な礼拝空間。壁は二方向に湾曲し——耐力壁であると同時に屋根でもあり——連続的でほとんど厚みのない殻を形成する。陽光は煉瓦のあいだの微細な隙間と頂部の帯状トップライトから浸透し、光の斑点が内壁をゆっくりと移動する。この教会は2021年にユネスコ世界遺産に登録された。',
            'ガウス·ヴォールトはディエステのもう一つの構造傑作である。この形式はカール·フリードリヒ·ガウスの曲面の数学的研究に基づき、煉瓦層の二重曲率（二方向に同時に湾曲すること）を利用して剛性を得る。ディエステはモンテビデオ·ショッピング（1985年）で極長スパンのガウス·ヴォールトを使用した——巨大な煉瓦殻屋根が一切の中間支持なしに市場空間全体を覆い、波打つ頂部のシークエンスが翻弄する海洋が頭上に凝固したかのようである。',
            'ディエステは工業建築をほとんど神聖な高みへと引き上げた。彼の倉庫、工場、バスターミナル——通常建築学がもっとも注目しない類型——は彼の手のなかで光の容器となった。フリオ·エレーラ·イ·オベス倉庫（1979年）の内部は一連の自立煉瓦アーチで、アーチ頂部間のトップライトから日光が落ちる。彼は当時ほとんど誰も信じなかった命題を証明した——煉瓦、人類最古の建築材料の一つは、鉄とコンクリートに構造効率と美学的品質において競争できる。',
          ],
          en: [
            'Dieste\u2019s architectural language reached its highest spiritual realm in church design. The Church of Cristo Obrero y Nuestra Señora de Lourdes in Atlántida (1960) is his earliest and most famous work: a humble worship space composed of undulating brick walls and an undulating roof. The walls curve in two directions \u2014 simultaneously load-bearing walls and roof \u2014 forming a continuous, almost thickness-less shell. Sunlight seeps through subtle gaps between the bricks and a band of clerestory at the top, with patches of light slowly migrating across the interior walls. The church was inscribed as a UNESCO World Heritage site in 2021.',
            'The Gaussian vault is another of Dieste\u2019s structural masterpieces. This form is based on Carl Friedrich Gauss\u2019s mathematical study of curved surfaces, using the double curvature of brick courses (curving simultaneously in two directions) to obtain rigidity. Dieste used extremely long-span Gaussian vaults in Montevideo Shopping (1985) \u2014 enormous brick shell roofs covering the entire market space without any intermediate support, the sequence of undulating crests like a churning ocean frozen overhead.',
            'Dieste elevated industrial architecture to almost sacred heights. His warehouses, factories, and bus terminals \u2014 building types usually receiving the least architectural attention \u2014 became vessels of light in his hands. The interior of the Julio Herrera y Obes warehouse (1979) is a series of self-supporting brick arches, with daylight falling through skylights between the arch crests. He proved a proposition almost no one believed at the time: brick \u2014 one of humanity\u2019s oldest building materials \u2014 can compete with steel and concrete in structural efficiency and aesthetic quality.',
          ],
        },
      },
      {
        title: { zh: '抵抗的宇宙观：材料丶信仰与社会', ja: '抵抗の宇宙観：素材·信仰·社会', en: 'A Cosmology of Resistance: Material, Faith, and Society' },
        paragraphs: {
          zh: [
            '迪埃斯特的建筑实践与他深厚的天主教信仰密不可分。对他而言，结构的美不是装饰性的迷思，而是"宇宙秩序的显现"——一个按照数学和物理规律优雅地站立的结构，是对造物主理性的见证。这种思维方式不应被误解为宗教神秘主义——它更像是爱因斯坦"宇宙宗教感"在土木工程中的对应：自然规律的美本身就是神圣的。',
            '迪埃斯特是一位坚定的"第三世界"建筑师。他拒绝了来自发达国家的项目和教职邀请，选择留在乌拉圭，用自己的方式"建设自己的国家"。他的建筑不是为跨国资本或高端市场服务的——教堂是为乡村社区而建，仓库是为本地工商业使用。他的"强化砖石"技术使贫穷的国家也能负担得起高质量的大跨度公共空间。',
            '2000年，迪埃斯特在蒙得维的亚去世，享年82岁。他的作品在他生前几乎没有离开过乌拉圭的国界。但21世纪以来，随着建筑学对"现代主义的多种可能性"和"低技高想"（low-tech high-thought）的重新关注，迪埃斯特的声誉正在全球范围内迅速上升。他的建筑被建筑史学家Kenneth Frampton纳入"批判性地域主义"的经典案例，2021年联合国教科文组织的认可则标志着他的作品从地域进入世界遗产的殿堂。迪埃斯特证明了：建筑师的伟大不在于国家的大小、预算的多少或媒体的关注，而在于能否从最朴素的条件中提炼出宇宙般的诗意。',
          ],
          ja: [
            'ディエステの建築実践は彼の深いカトリック信仰と不可分である。彼にとって構造の美は装飾的迷夢ではなく、「宇宙的秩序の顕現」だった——数学的·物理的法則に従って優雅に立ち上がる構造は、創造主の理性への証しである。この思考様式を宗教的神秘主義と誤解してはならない——それはむしろアインシュタインの「宇宙的宗教感情」が土木工学のなかに対応物を見出したものに近い。自然法則の美それ自体が神聖なのだ。',
            'ディエステは確固たる「第三世界」建築家だった。彼は先進国からのプロジェクトや教職の招待を断り、ウルグアイに留まり、自分なりの方法で「自国を建設する」ことを選んだ。彼の建築は多国籍資本やハイエンド市場のために奉仕するものではない——教会は農村コミュニティのために建てられ、倉庫は地元の商工業のために使われた。彼の「強化セラミック」技術は貧しい国々にも高品質の大スパン公共空間を手の届くものにした。',
            '2000年、ディエステはモンテビデオで82年の生涯を閉じた。彼の作品は生前ほとんどウルグアイの国境を出ることはなかった。しかし21世紀に入り、建築学が「モダニズムの複数の可能性」と「ローテク·ハイソート」を再注目するにつれて、ディエステの評価は世界的に急速に上昇している。彼の建築は建築史家ケネス·フランプトンによって「批判的地域主義」の古典的事例に組み込まれ、2021年のユネスコ認定は彼の作品が地域から世界遺産の殿堂へと入ったことを示す。ディエステは証明した——建築家の偉大さは国の大小、予算の多寡、メディアの注目度にあるのではなく、もっとも素朴な条件から宇宙的な詩情を抽出できるかどうかにある。',
          ],
          en: [
            'Dieste\u2019s architectural practice was inseparable from his deep Catholic faith. For him, the beauty of structure was not a decorative myth but the \u201cmanifestation of cosmic order\u201d \u2014 a structure standing elegantly according to mathematical and physical laws is a testimony to the rationality of the Creator. This mode of thinking should not be misunderstood as religious mysticism \u2014 it is closer to Einstein\u2019s \u201ccosmic religious feeling\u201d finding its counterpart in civil engineering: the beauty of natural law is itself sacred.',
            'Dieste was a resolute \u201cThird World\u201d architect. He declined project offers and teaching positions from developed countries, choosing to stay in Uruguay and \u201cbuild his own country\u201d in his own way. His buildings did not serve multinational capital or high-end markets \u2014 churches were built for rural communities, warehouses for local commerce and industry. His \u201creinforced ceramic\u201d technology made high-quality large-span public spaces affordable even for poor nations.',
            'Dieste died in Montevideo in 2000 at age 82. His works barely crossed Uruguay\u2019s borders during his lifetime. But since the 21st century, as architecture has renewed its attention to \u201cmodernism\u2019s multiple possibilities\u201d and \u201clow-tech high-thought,\u201d Dieste\u2019s reputation has been rising rapidly worldwide. His architecture was incorporated by architectural historian Kenneth Frampton into the classic cases of \u201cCritical Regionalism,\u201d and the UNESCO recognition in 2021 marks his works\u2019 entry from the regional into the pantheon of World Heritage. Dieste proved: an architect\u2019s greatness lies not in the size of their country, the scale of their budget, or the attention of the media, but in the capacity to extract cosmic poetry from the humblest of conditions.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'church-of-cristo-obrero-y', note: { zh: '联合国教科文组织世界遗产，波浪形砖墙既是承重墙又是屋顶，光从砖缝和天窗渗入，朴素材料的神圣转化。', ja: 'ユネスコ世界遺産。波形の煉瓦壁が耐力壁であると同時に屋根でもあり、光が煉瓦の隙間とトップライトから浸透する——素朴な素材の神聖なる転換。', en: 'A UNESCO World Heritage site, where undulating brick walls are simultaneously load-bearing and roof, light seeping through brick gaps and skylights \u2014 the sacred transfiguration of humble material.' } },
      { slug: 'church-of-san-juan-de', note: { zh: '圣胡安教堂的内部是一个砖的海洋——双曲率拱顶像展开的翅膀，橙色砖面在阳光中燃烧。', ja: 'サン·フアン教会の内部は煉瓦の海洋——二重曲率のヴォールトが広げられた翼のように、オレンジ色の煉瓦面が陽光のなかで燃える。', en: 'The interior of San Juan de Ávila Church is an ocean of brick \u2014 double-curvature vaults like spread wings, orange brick surfaces burning in sunlight.' } },
      { slug: 'montevideo-shopping', note: { zh: '商业建筑的诗意意外：巨大砖壳屋顶下，购物中心成了光的容器，证明了日常建筑也可以有灵魂。', ja: '商業建築の詩的意外——巨大な煉瓦殻屋根の下で、ショッピングセンターが光の容器となる。日常建築にも魂がありうることの証明。', en: 'The poetic surprise of commercial architecture: beneath enormous brick shell roofs, a shopping center becomes a vessel of light, proving that everyday architecture can also have a soul.' } },
    ],
    sources: [
      { title: 'Eladio Dieste \u2014 UNESCO World Heritage', url: 'https://whc.unesco.org/en/list/1612/' },
      { title: 'Fundación Eladio Dieste', url: 'http://www.fundacioneladiodieste.org/' },
      { title: 'Wikidata: Eladio Dieste', url: 'https://www.wikidata.org/wiki/Q1323824' },
    ],
  },

  'koolhaas': {
    slug: 'koolhaas',
    summary: {
      zh: '雷姆·库哈斯，1944年生于鹿特丹。记者出身的他转行建筑，是当代最具影响力的建筑思想家之一，创立OMA并获2000年普利兹克奖。他以书《疯狂的纽约》和对城市密度、功能混杂的激进思考著称，代表作包括CCTV总部大楼、西雅图中央图书馆和波尔图音乐厅。',
      ja: 'レム・コールハース、1944年ロッテルダム生まれ。ジャーナリストから建築家に転身し、現代で最も影響力のある建築思想家の一人。OMAを設立し2000年にプリツカー賞受賞。著書『錯乱のニューヨーク』と、都市密度や機能混交へのラディカルな思考で知られる。代表作にCCTV本部、シアトル中央図書館、カーザ・ダ・ムジカ。',
      en: 'Rem Koolhaas, born 1944 in Rotterdam. A former journalist turned architect, he is one of the most influential architectural thinkers alive, founder of OMA and recipient of the 2000 Pritzker Prize. Known for his book Delirious New York and radical thinking about urban density and programmatic mix, his iconic works include the CCTV Headquarters, Seattle Central Library, and Casa da Música.'
    },
    core_ideas: {
      zh: [
        '程序混合：不同功能不应被隔离，而应在垂直方向上叠加、碰撞、产生新的社会关系',
        '大（Bigness）：超大尺度建筑不再是传统的立面美学问题，而是内部世界自治的城市片段',
        '记者式田野调查：用记者的眼睛观察城市，将社会、经济、政治因素纳入建筑思考',
        '功能的不稳定性：建筑的功能应当是开放和不确定的，空间应容纳不可预知的用途',
        '亚洲城市化研究：通过《大跃进》《日本计划》等书，将全球城市化作为建筑理论的实验室',
      ],
      ja: [
        'プログラムの混合：異なる機能を分離すべきではなく、垂直方向に重ね、衝突させ、新たな社会的関係を生み出す',
        'ビッグネス：超大規模建築はもはや伝統的なファサード美学の問題ではなく、内部の世界が自律する都市の断片である',
        'ジャーナリスティックなフィールドワーク：記者の目で都市を観察し、社会的·経済的·政治的要因を建築的思考に組み込む',
        '機能の不安定性：建築の機能は開放的で不確定であるべきで、空間は予測不可能な用途を収容する',
        'アジア都市化研究：『大躍進』『日本計画』などの著書を通じて、グローバルな都市化を建築理論の実験室とする',
      ],
      en: [
        'Programmatic mix: different functions should not be isolated but stacked, colliding, and generating new social relationships in the vertical dimension',
        'Bigness: super-large-scale architecture is no longer a question of traditional façade aesthetics but an autonomous urban fragment with its own internal world',
        'Journalistic fieldwork: observing cities with a journalist\u2019s eye, integrating social, economic, and political factors into architectural thinking',
        'Instability of function: architectural program should be open and indeterminate, space should accommodate unforeseeable uses',
        'Asian urbanization studies: through books like Great Leap Forward and Project Japan, treating global urbanization as a laboratory for architectural theory',
      ],
    },
    portrait: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Rem_Koolhaas_2013.jpg',
      author: 'Gerardus',
      license: 'CC BY-SA 4.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Rem_Koolhaas_2013.jpg',
      alt: { zh: '雷姆·库哈斯肖像', ja: 'レム・コールハースの肖像', en: 'Portrait of Rem Koolhaas' },
    },
    sections: [
      {
        title: { zh: '从记者到建筑师', ja: 'ジャーナリストから建築家へ', en: 'From Journalist to Architect' },
        paragraphs: {
          zh: [
            '库哈斯的建筑之路始于文字而非图纸。他在阿姆斯特丹自由大学学习电影和剧本写作，之后成为《海牙邮报》的记者和电影编剧。这段经历深刻塑造了他的建筑观：不是从形式出发，而是从社会情境、人类行为和信息流出发。他在《疯狂的纽约》（1978）中写道，曼哈顿是一座\u201c没有宣言的现代主义城市\u201d，其摩天大楼是\u201c每一层都在上演不同剧情\u201d的垂直戏剧场。这种记者式的田野观察能力，让他的建筑理论始终与混沌的真实世界保持关联。',
            '1975年，库哈斯与Elia Zenghelis、Madelon Vriesendorp和Zoe Zenghelis在伦敦创立了OMA（大都会建筑事务所）。《疯狂的纽约》成为20世纪最重要的建筑著作之一，他在书中提出了\u201c拥挤文化\u201d（Culture of Congestion）理论，认为城市的本质不是秩序而是密集与混乱的创造性叠加。1988年，他在纽约MoMA策划了具有里程碑意义的\u201c解构主义建筑\u201d展，正式将新一代建筑师推向前台。',
            'OMA的双重结构——鹿特丹总部负责实践，AMO（1999年设立的姊妹机构）负责研究——让库哈斯同时保持实践者和思想者的身份。AMO的研究范围远远超出建筑，包括奢侈品牌战略（为Prada提供顾问）、欧盟旗帜重新设计、尼日利亚城市研究等。这种将建筑知识应用于非建筑领域的做法，使他成为少数能在大众媒体和学术圈之间自由穿行的建筑师。',
          ],
          ja: [
            'コールハースの建築への道は図面ではなく言葉から始まった。アムステルダム自由大学で映画と脚本を学んだ後、『ハーグセ·ポスト』紙の記者および映画脚本家として活動した。この経験は彼の建築観を深く形成した——形態から出発するのではなく、社会的状況、人間の行動、情報の流れから出発するのだ。『錯乱のニューヨーク』（1978）で彼は、マンハッタンは「マニフェストなきモダニズムの都市」であり、その高層ビルは「各階で異なるドラマが上演される」垂直劇場であると書いた。',
            '1975年、コールハースはElia Zenghelis、Madelon Vriesendorp、Zoe ZenghelisとともにロンドンでOMA（Office for Metropolitan Architecture）を設立。『錯乱のニューヨーク』は20世紀で最も重要な建築書の一つとなり、彼はその中で「混雑の文化」理論を提唱——都市の本質は秩序ではなく、密集と混乱の創造的重ね合わせにあると論じた。1988年、ニューヨークMoMAで画期的な「脱構築主義建築」展を企画し、新世代の建築家を正式に前面に押し出した。',
            'OMAの二重構造——ロッテルダム本部が実務を担当し、AMO（1999年設立の姉妹機関）が研究を担当——により、コールハースは実践者と思想家の両方のアイデンティティを同時に保つことができた。AMOの研究範囲は建築をはるかに超え、ラグジュアリーブランド戦略（プラダの顧問）、EU旗の再デザイン、ナイジェリア都市研究などを含む。この建築知識を非建築分野に応用するアプローチにより、彼は大衆メディアと学術界の間を自由に行き来できる数少ない建築家となった。',
          ],
          en: [
            'Koolhaas\u2019s path to architecture began with words, not drawings. He studied film and scriptwriting at the Free University of Amsterdam, then worked as a journalist for the Haagse Post and as a film screenwriter. This experience deeply shaped his architectural outlook: not starting from form, but from social situations, human behavior, and information flows. In Delirious New York (1978), he wrote that Manhattan is \u201ca modernist city without a manifesto,\u201d its skyscrapers vertical theaters where \u201ceach floor stages a different drama.\u201d This journalistic capacity for field observation keeps his architectural theory perpetually connected to the messy real world.',
            'In 1975, Koolhaas founded OMA (Office for Metropolitan Architecture) in London with Elia Zenghelis, Madelon Vriesendorp, and Zoe Zenghelis. Delirious New York became one of the most important architectural books of the 20th century; in it he proposed the theory of the \u201cCulture of Congestion,\u201d arguing that the essence of the city is not order but the creative superposition of density and chaos. In 1988, he curated the landmark \u201cDeconstructivist Architecture\u201d exhibition at MoMA in New York, officially launching a new generation of architects onto the stage.',
            'OMA\u2019s dual structure \u2014 the Rotterdam headquarters handling practice, and AMO (established in 1999 as a sister entity) handling research \u2014 allows Koolhaas to maintain simultaneous identities as practitioner and thinker. AMO\u2019s research scope extends far beyond architecture, including luxury brand strategy (consulting for Prada), redesigning the EU flag, Nigerian urban studies, and more. This application of architectural knowledge to non-architectural fields makes him one of the few architects who moves freely between mass media and academic circles.',
          ],
        },
      },
      {
        title: { zh: '从波尔多住宅到CCTV', ja: 'ボルドーの家からCCTVへ', en: 'From Maison à Bordeaux to CCTV' },
        paragraphs: {
          zh: [
            '波尔多住宅（1998）是库哈斯最具人性的作品之一。业主因车祸瘫痪，库哈斯设计了一个可移动的房间大小的升降平台——既是电梯，也是书房和卧室——让轮椅上的业主可以在垂直方向上自由穿行整座房子。这座建筑证明了库哈斯的设计不仅能处理全球城市级的巨大尺度，也能在最私密的家庭尺度上做出深刻回应。建筑不是一个静止的容器，而是一个随着使用者需求变化而变化的动态装置。',
            'CCTV总部大楼（2012）是库哈斯\u201c大\u201d理论的终极宣言。这座54层、234米高的环形建筑打破了摩天大楼必须是垂直塔的惯例，将建筑折弯成一个三维的连续环。它的真正创新不在外观，而在于内部：建筑内所有的制作、编辑、管理、播送功能在环中连续流转，形成一个\u201c垂直城市\u201d。库哈斯认为，CCTV不是一座大楼，而是一个微缩的社会——两万人在其中工作，建筑本身就是一个功能生态系统。批评者称其为\u201c大裤衩\u201d，但它在结构工程和建筑类型学上的突破无可否认。',
            '西雅图中央图书馆（2004）则在另一维度展示了库哈斯的空间哲学。图书馆不再是安静的藏书空间，而是一个城市客厅。建筑被分解为五个\u201c平台\u201d——停车、办公、书籍、混合社交、管理——每个平台之间是开放的\u201c交易区\u201d，允许意外的邂逅和功能漂移。这座建筑在开放后第一年访客量增加了三倍。库哈斯将图书馆重新定义为\u201c信息时代的大教堂\u201d，一个平等获取知识的民主空间。',
          ],
          ja: [
            'ボルドーの家（1998）はコールハースの最も人間的な作品の一つである。クライアントは交通事故で半身不随となり、コールハースは可動式の部屋サイズの昇降プラットフォームを設計——エレベーターであると同時に書斎であり寝室でもある——車椅子のクライアントが垂直方向に家全体を自由に移動できるようにした。この建築は、コールハースのデザインがグローバル都市レベルの巨大スケールだけでなく、最も私的な家庭のスケールでも深い応答ができることを証明している。',
            'CCTV本部ビル（2012）はコールハースの「ビッグネス」理論の究極の宣言である。54階建て、高さ234メートルの環状建築は、超高層ビルは垂直な塔でなければならないという慣例を打ち破り、建物を三次元の連続する環へと折り曲げた。その真の革新は外観ではなく内部にある——建物内のすべての制作、編集、管理、放送機能が環のなかで連続的に流れ、「垂直都市」を形成する。コールハースは、CCTVは単なるビルではなく、縮小された社会——2万人がその中で働き、建物自体が機能の生態系であると考える。',
            'シアトル中央図書館（2004）は別の次元でコールハースの空間哲学を示している。図書館はもはや静かな蔵書空間ではなく、都市のリビングルームである。建物は五つの「プラットフォーム」——駐車、オフィス、書籍、混合ソーシャル、管理——に分解され、各プラットフォーム間には開かれた「取引区域」があり、予期せぬ出会いや機能の漂流を可能にする。この建物は開館後1年で来館者数が3倍に増加した。コールハースは図書館を「情報時代の大聖堂」、知識への平等なアクセスのための民主的空間として再定義した。',
          ],
          en: [
            'The Maison à Bordeaux (1998) is one of Koolhaas\u2019s most humane works. The client was paralyzed in a car accident; Koolhaas designed a movable room-sized lifting platform \u2014 simultaneously elevator, study, and bedroom \u2014 allowing the wheelchair-bound client to move freely through the entire house vertically. This building proves that Koolhaas\u2019s design can respond profoundly not only at the gigantic scale of global cities but also at the most intimate domestic scale. Architecture is not a static container but a dynamic apparatus that changes with the user\u2019s needs.',
            'The CCTV Headquarters (2012) is the ultimate manifesto of Koolhaas\u2019s theory of Bigness. This 54-story, 234-meter-tall looped building breaks the convention that a skyscraper must be a vertical tower, bending the building into a three-dimensional continuous ring. Its true innovation lies not in the exterior but within: all production, editing, management, and broadcasting functions inside the building flow continuously through the loop, forming a \u201cvertical city.\u201d Koolhaas contends that CCTV is not a building but a microcosmic society \u2014 20,000 people work within it, and the building itself is a functional ecosystem.',
            'The Seattle Central Library (2004) demonstrates Koolhaas\u2019s spatial philosophy in yet another dimension. The library is no longer a quiet repository of books but an urban living room. The building is decomposed into five \u201cplatforms\u201d \u2014 parking, office, books, mixed social, management \u2014 with open \u201ctrading zones\u201d between each platform, allowing for unexpected encounters and programmatic drift. Visits tripled in the first year after opening. Koolhaas redefined the library as \u201cthe cathedral of the information age,\u201d a democratic space for equal access to knowledge.',
          ],
        },
      },
      {
        title: { zh: '\u201c城市项目\u201d与OMA的遗产', ja: '「都市のプロジェクト」とOMAの遺産', en: 'The Urban Project and OMA\u2019s Legacy' },
        paragraphs: {
          zh: [
            '库哈斯的建筑不能脱离他的城市研究来理解。从1978年《疯狂的纽约》开始，他始终将城市——而非单体建筑——作为思考的基本单位。他在哈佛设计学院的教学（1995-2002）围绕\u201c城市项目\u201d展开，研究拉各斯、深圳、珠江三角洲等地的爆炸性城市化。他的学生（包括Bjarke Ingels和Winy Maas）将OMA的方法论扩散为21世纪最具影响力的建筑网络之一。',
            'OMA的实践模式也别具一格。库哈斯刻意避免建立\u201c库哈斯风格\u201d，而是让建筑师新秀在OMA工作数年后带着方法论独立出去——这就是为什么OMA的\u201c校友\u201d包括MVRDV、BIG、RCR Arquitectes、WORKac、大都会建筑等一大批当代重要事务所。这不是个人英雄主义的建筑观，而是一种知识生产的生态：一个不断分裂、繁殖、变异的设计方法论基因库。',
            '批评者认为库哈斯过于拥抱全球资本，他的标志性建筑往往是威权或资本主义权力的象征（CCTV是中国国家媒体，Prada旗舰店是奢侈消费）。但支持者则认为，这正是库哈斯的诚实之处——他不假装建筑可以脱离权力运作，而是在权力内部寻找批判的空间。2020年他因\u201c对世界的悲观看法\u201d宣布退出大型建筑项目，转而专注于研究和写作。他在古根海姆策划的\u201c乡村：未来\u201d（Countryside: The Future, 2020）展，再次证明了他的思想永不枯竭。',
          ],
          ja: [
            'コールハースの建築は彼の都市研究なしには理解できない。1978年の『錯乱のニューヨーク』以来、彼は常に都市を——単体の建築ではなく——思考の基本単位としてきた。ハーバード·デザイン·スクールでの教育（1995-2002）は「都市のプロジェクト」を中心に展開し、ラゴス、深セン、珠江デルタなどでの爆発的都市化を研究した。彼の学生（ビャルケ·インゲルスやヴィニー·マースを含む）はOMAの方法論を21世紀で最も影響力のある建築ネットワークの一つへと拡散させた。',
            'OMAの実践モデルも独特である。コールハースは意図的に「コールハース·スタイル」の確立を避け、若手建築家がOMAで数年働いた後に方法論を携えて独立していくことを促す——これがOMAの「同窓生」にMVRDV、BIG、RCR Arquitectes、WORKac、大都会建築など多数の現代的重要事務所が含まれる理由である。これは個人英雄主義の建築観ではなく、知識生産のエコロジー——分裂し、増殖し、変異し続けるデザイン方法論の遺伝子プール——なのだ。',
            '批評家はコールハースがグローバル資本を受け入れすぎていると指摘する——彼のアイコン的建築はしばしば権威主義的または資本主義的権力の象徴である（CCTVは中国国営メディア、プラダ旗艦店は奢侈消費）。しかし支持者は、これこそがコールハースの誠実さだと主張する——彼は建築が権力の作用から逃れられるふりをせず、権力の内部で批判的空間を探すのだ。2020年、彼は「世界に対する悲観的見解」を理由に大型建築プロジェクトから撤退し、研究と執筆に専念すると発表。グッゲンハイムで企画した「カントリーサイド：未来」（2020）展は、彼の思想が決して枯渇しないことを改めて証明した。',
          ],
          en: [
            'Koolhaas\u2019s architecture cannot be understood apart from his urban research. Since Delirious New York in 1978, he has consistently taken the city \u2014 not the individual building \u2014 as the fundamental unit of thought. His teaching at the Harvard Graduate School of Design (1995-2002) centered on \u201cThe Urban Project,\u201d studying explosive urbanization in Lagos, Shenzhen, the Pearl River Delta, and beyond. His students (including Bjarke Ingels and Winy Maas) diffused OMA\u2019s methodology into one of the most influential architectural networks of the 21st century.',
            'OMA\u2019s practice model is also distinctive. Koolhaas deliberately avoids establishing a \u201cKoolhaas style,\u201d instead encouraging young architects to work at OMA for a few years and then spin off with the methodology \u2014 which is why OMA\u2019s \u201calumni\u201d include MVRDV, BIG, RCR Arquitectes, WORKac, and many other important contemporary practices. This is not a heroic-individualist view of architecture but an ecology of knowledge production: a gene pool of design methodology that continually splits, proliferates, and mutates.',
            'Critics argue that Koolhaas embraces global capital too readily, and that his iconic buildings are often symbols of authoritarian or capitalist power (CCTV is Chinese state media, Prada flagship stores are luxury consumption). But supporters contend that this is precisely Koolhaas\u2019s honesty \u2014 he does not pretend that architecture can escape the operations of power, but instead seeks critical space from within power. In 2020, citing \u201ca pessimistic view of the world,\u201d he announced his withdrawal from large-scale building projects to focus on research and writing. His Guggenheim exhibition \u201cCountryside: The Future\u201d (2020) proved once again that his thinking is inexhaustible.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'cctv-headquarters', note: { zh: '\u201c大\u201d理论的终极建筑宣言，三维修环挑战摩天大楼类型学，将两万人的工作生态压缩进一个建筑体内。', ja: '「ビッグネス」理論の究極の建築宣言。三次元連続環が超高層タイポロジーを挑戦し、2万人の労働生態を一つの建築体に圧縮する。', en: 'The ultimate architectural manifesto of Bigness theory: a 3D continuous loop challenging skyscraper typology, compressing the work ecology of 20,000 people into a single building body.' } },
      { slug: 'seattle-central-library', note: { zh: '信息时代的大教堂，五个平台与交易区的空间组织，重新定义了图书馆作为城市客厅的公共功能。', ja: '情報時代の大聖堂。五つのプラットフォームと取引区域の空間組織が、都市のリビングルームとしての図書館の公共的機能を再定義する。', en: 'The cathedral of the information age: spatial organization of five platforms and trading zones, redefining the library\u2019s public function as an urban living room.' } },
      { slug: 'casa-da-musica', note: { zh: '波尔图的白色多面体音乐厅，不规则几何体内包裹着完美的声学空间，城市与音乐的化学反应。', ja: 'ポルトの白い多面体コンサートホール。不規則な幾何学体の内部に完璧な音響空間が包まれ、都市と音楽の化学反応。', en: 'Porto\u2019s white polyhedral concert hall: perfect acoustic space wrapped within an irregular geometry, a chemical reaction between city and music.' } },
    ],
    sources: [
      { title: 'OMA \u2014 Office for Metropolitan Architecture', url: 'https://www.oma.com/' },
      { title: 'Rem Koolhaas \u2014 Pritzker Prize', url: 'https://www.pritzkerprize.com/laureates/2000' },
      { title: 'Wikidata: Rem Koolhaas', url: 'https://www.wikidata.org/wiki/Q232364' },
    ],
  },

  'palladio': {
    slug: 'palladio',
    summary: {
      zh: '安德烈亚·帕拉迪奥（1508-1580），意大利文艺复兴时期最重要的建筑师，也是有史以来被模仿最多的建筑师。他的《建筑四书》和威尼斯地区的别墅设计塑造了从欧洲到美洲的建筑语言，其影响通过\u201c帕拉迪奥主义\u201d持续了四个多世纪。圆厅别墅、圣乔治马焦雷教堂、奥林匹克剧院是其经典之作。',
      ja: 'アンドレア・パッラーディオ（1508-1580）、イタリア・ルネサンス期で最も重要な建築家であり、歴史上最も模倣された建築家。『建築四書』とヴェネト地方のヴィラ設計は、ヨーロッパからアメリカに至る建築言語を形成し、その影響は「パッラーディオ主義」として四世紀以上にわたって続いている。ヴィラ・ロトンダ、サン・ジョルジョ・マッジョーレ聖堂、テアトロ・オリンピコが代表傑作。',
      en: 'Andrea Palladio (1508-1580), the most important architect of the Italian Renaissance and the most imitated architect in history. His Four Books of Architecture and villa designs in the Veneto region shaped the architectural language from Europe to America, his influence persisting for over four centuries through \u201cPalladianism.\u201d The Villa Rotonda, San Giorgio Maggiore, and Teatro Olimpico are his masterpieces.'
    },
    core_ideas: {
      zh: [
        '比例与和谐：将古典柱式转化为通用的住宅设计语法，基于音乐的和谐比例建立房间尺寸体系',
        '别墅作为景观框架：住宅不是孤立物体，而是单向景框——四个立面完全相同，每面都望向不同的田园风景',
        '从石匠到知识分子：通过与Gian Giorgio Trissino的人文学者圈交往，自学维特鲁威和古罗马遗址，实现社会阶层跃迁',
        '《建筑四书》的全球传播：通过印刷术将设计知识民主化，使维琴察的地方实践成为全球建筑通用语言',
        '神庙立面住宅化：将古典神庙的柱廊门廊应用于普通住宅，赋予世俗生活以尊严和庄严感',
      ],
      ja: [
        '比例と調和：古典オーダーを普遍的な住宅デザインの文法へと変換し、音楽の調和比例に基づいて部屋の寸法体系を構築',
        '景観の枠組みとしてのヴィラ：住宅は孤立した物体ではなく、四方向の景観フレーム——四面が同一のファサードを持ち、それぞれが異なる田園風景を望む',
        '石工から知識人へ：ジャン・ジョルジョ・トリッシーノの人文学者サークルとの交流を通じて、ウィトルウィウスと古代ローマ遺跡を独学し、社会階層を飛躍',
        '『建築四書』のグローバルな伝播：印刷技術を通じてデザイン知識を民主化し、ヴィチェンツァの地方的実践をグローバルな建築共通語へと変えた',
        '神殿ファサードの住宅化：古典神殿の柱廊ポルティコを一般住宅に適用し、世俗的日常生活に尊厳と荘厳さを付与',
      ],
      en: [
        'Proportion and harmony: transforming classical orders into a universal grammar of residential design, establishing a room-dimension system based on the harmonic proportions of music',
        'Villa as landscape frame: the house is not an isolated object but a four-directional scenic frame \u2014 four identical façades, each looking onto a different pastoral vista',
        'From stonemason to intellectual: through association with Gian Giorgio Trissino\u2019s humanist circle, self-taught in Vitruvius and Roman ruins, achieving social-class transcendence',
        'Global dissemination of the Four Books: democratizing design knowledge through the printing press, transforming Vicenza\u2019s local practice into a global architectural lingua franca',
        'Temple-front domesticity: applying the portico of classical temples to ordinary houses, imbuing secular daily life with dignity and monumentality',
      ],
    },
    portrait: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Palladio.jpg',
      author: 'Public Domain',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Palladio.jpg',
      alt: { zh: '安德烈亚·帕拉迪奥肖像', ja: 'アンドレア・パッラーディオの肖像', en: 'Portrait of Andrea Palladio' },
    },
    sections: [
      {
        title: { zh: '从石匠到文艺复兴建筑大师', ja: '石工からルネサンス建築の巨匠へ', en: 'From Stonemason to Renaissance Master' },
        paragraphs: {
          zh: [
            '帕拉迪奥生于帕多瓦，原名Andrea di Pietro della Gondola，13岁开始在石匠行当学徒。16岁时他逃到维琴察，加入当地最优秀的石匠工坊。30岁那年，他的人生被一位人文主义者彻底改变——伯爵Gian Giorgio Trissino发现了他的才华，将他带入古典文化的世界。Trissino给他取名\u201c帕拉迪奥\u201d（源自希腊智慧女神Pallas Athena的天使信使），并带他多次前往罗马，让他亲手测量和研究古罗马遗址。',
            '帕拉迪奥不是一个受过正规大学教育的建筑师，而是一个在实践中自学成才的石匠。但正是这种出身让他与同时代的建筑师截然不同：他不追求华丽的矫饰，而是追求清晰、可复制、经济实用的设计系统。他把在罗马测绘的古罗马浴场、万神庙和巴西利卡的平面转化为可量产的住宅类型——这就是为什么一个维琴察省的地方建筑师最终影响了世界。',
            '他的第一个重大突破是维琴察的巴西利卡（Palazzo della Ragione，1549），他用两层拱廊\u201c包裹\u201d了原有的哥特式大厅，创造了后来被称为\u201c帕拉迪奥母题\u201d（Palladian Motif）的经典构图——中央大拱两侧各开一个小矩形开口。这个母题在此后四个世纪里被反复使用，从英国乡村别墅到美国国会大厦。',
          ],
          ja: [
            'パッラーディオはパドヴァに生まれ、本名をAndrea di Pietro della Gondolaといい、13歳で石工の徒弟となった。16歳でヴィチェンツァに逃れ、地元で最も優れた石工工房に加わる。30歳のとき、一人の人文主義者によって彼の人生は根本から変えられた——ジャン・ジョルジョ・トリッシーノ伯爵が彼の才能を見出し、古典文化の世界へと導いたのだ。トリッシーノは彼に「パッラーディオ」（ギリシャの知恵の女神パラス·アテナの天使の使者に由来）という名を与え、何度もローマに連れて行き、古代ローマ遺跡を自ら測定·研究させた。',
            'パッラーディオは正規の大学教育を受けた建築家ではなく、実践の中で独学した石工であった。しかし、まさにこの出自が彼を同時代の建築家たちと根本的に異なるものにした——華麗なマニエリスムを追求するのではなく、明晰で、再現可能で、経済的で実用的なデザインシステムを追求した。ローマで測量した古代浴場、パンテオン、バシリカの平面を、量産可能な住宅タイプへと変換した——これこそが、ヴィチェンツァ県の一地方建築家が最終的に世界に影響を与えた理由である。',
            '最初の大きな突破口はヴィチェンツァのバシリカ（Palazzo della Ragione、1549）で、彼は二層のアーケードで既存のゴシック様式の大ホールを「包み込」、後に「パッラーディオ·モティーフ」と呼ばれる古典的構図——中央の大きなアーチの両側に小さな矩形開口——を創造した。このモティーフはその後四世紀にわたって繰り返し使用され、イギリスのカントリー·ハウスからアメリカ合衆国議事堂に至るまで影響を与えた。',
          ],
          en: [
            'Palladio was born in Padua, originally named Andrea di Pietro della Gondola, and began his apprenticeship as a stonemason at 13. At 16 he fled to Vicenza and joined the finest local stonemason\u2019s workshop. At age 30, his life was utterly transformed by a humanist \u2014 Count Gian Giorgio Trissino discovered his talent and led him into the world of classical culture. Trissino gave him the name \u201cPalladio\u201d (from Pallas Athena\u2019s angelic messenger in Greek wisdom) and took him repeatedly to Rome, where he measured and studied Roman ruins with his own hands.',
            'Palladio was not an architect educated at a formal university but a self-taught stonemason who learned through practice. Yet it was precisely this origin that set him apart from his contemporaries: he did not pursue ornate Mannerism but a clear, replicable, economical, and practical design system. He transformed the plans of Roman baths, the Pantheon, and basilicas that he had surveyed in Rome into mass-producible residential types — which is why a provincial architect from Vicenza ultimately influenced the world.',
            'His first major breakthrough was the Basilica in Vicenza (Palazzo della Ragione, 1549), where he \u201cwrapped\u201d the existing Gothic hall with two stories of arcades, creating the classic composition later called the \u201cPalladian Motif\u201d \u2014 a large central arch flanked by two small rectangular openings on each side. This motif was reused for the next four centuries, from English country houses to the United States Capitol.',
          ],
        },
      },
      {
        title: { zh: '圆厅别墅与景观中的建筑', ja: 'ヴィラ・ロトンダと景観のなかの建築', en: 'Villa Rotonda and Architecture in the Landscape' },
        paragraphs: {
          zh: [
            '圆厅别墅（Villa Almerico Capra, 1566-1591）是帕拉迪奥最著名的作品，也是世界建筑史上复制次数最多的私人住宅。它坐落于维琴察郊外的一座小山丘上，四个立面完全相同——每面都有一个六柱的爱奥尼式门廊和宽阔的台阶。建筑的核心是一个圆形大厅，顶部覆盖穹顶，光线从穹顶的顶部开口洒落。这是第一个将神庙的穹顶应用于普通住宅的建筑，也是对\u201c住宅可以是神圣的\u201d这一理念的最纯粹表达。',
            '圆厅别墅的关键创新不在于单个房间的设计，而在于建筑与景观的关系。帕拉迪奥将别墅放在山顶——不是像城堡那样防御性地占据制高点，而是像一个四面的景框，每个门廊都望向不同的田园风景。在这个设计中，建筑成为一座\u201c看风景的机器\u201d，居住者可以在一天中随着太阳的移动，选择不同的门廊来享受不同的光线和视野。这种建筑-景观关系后来被18世纪英国风景园林运动（如Chiswick House）和美国建国者们（如Thomas Jefferson的Monticello）狂热地吸收。',
            '实际上，帕拉迪奥在威尼斯共和国的内陆地区设计了约20座乡村别墅。这些别墅不只是贵族的度假屋，而是农业生产的管理中心——两侧的柱廊连接着谷仓、马厩和农具间。帕拉迪奥的天才在于将功能性农庄提升为古典诗意的景观构筑。他的威尼斯教堂——尤其是圣乔治马焦雷教堂（1565）和救主堂（1577）——则将神庙母题置于水面上，创造了威尼斯天际线中最宁静的剪影。',
          ],
          ja: [
            'ヴィラ・ロトンダ（Villa Almerico Capra, 1566-1591）はパッラーディオの最も有名な作品であり、世界建築史上最も多く複製された個人住宅である。ヴィチェンツァ郊外の小高い丘に位置し、四面がまったく同一——それぞれ六柱のイオニア式ポルティコと幅広い階段を持つ。建物の中心は円形ホールで、ドームで覆われ、光がドーム頂部の開口から降り注ぐ。これは神殿のドームを一般住宅に適用した最初の建築であり、「住宅は神聖でありうる」という理念の最も純粋な表現である。',
            'ヴィラ・ロトンダの鍵となる革新は、個々の部屋のデザインではなく、建築と景観の関係にある。パッラーディオはヴィラを丘の頂上に置いた——城塞のように防御的に高所を占めるのではなく、四方向の景観フレームとして、各ポルティコが異なる田園風景を望む。このデザインにおいて、建築は「風景を見る機械」となり、居住者は一日の太陽の動きに合わせて異なるポルティコを選び、異なる光と眺望を楽しむことができる。この建築-景観関係は後に18世紀イギリスの風景式庭園運動（チジック·ハウスなど）やアメリカ建国者たち（トマス·ジェファーソンのモンティチェロなど）によって熱狂的に吸収された。',
            '実際には、パッラーディオはヴェネツィア共和国の内陸部に約20の田園ヴィラを設計した。これらのヴィラは単なる貴族の別荘ではなく、農業生産の管理センターであった——両側のコロネードが穀物倉、馬小屋、農具室へと接続する。パッラーディオの天才は、機能的な農場を古典的で詩的な景観構築物へと昇華させたことにある。彼のヴェネツィアの教会——特にサン・ジョルジョ・マッジョーレ聖堂（1565）とレデントーレ教会（1577）——は神殿モティーフを水上に置き、ヴェネツィアのスカイラインに最も静寂なシルエットを創り出した。',
          ],
          en: [
            'The Villa Rotonda (Villa Almerico Capra, 1566-1591) is Palladio\u2019s most famous work and the most copied private residence in architectural history. It sits on a small hill outside Vicenza, with four identical façades \u2014 each with a six-column Ionic portico and broad steps. The core of the building is a circular hall covered by a dome, with light falling from the oculus at its top. This is the first building to apply a temple dome to an ordinary house, and the purest expression of the idea that a dwelling can be sacred.',
            'The key innovation of the Villa Rotonda lies not in the design of individual rooms but in the relationship between building and landscape. Palladio placed the villa on a hilltop \u2014 not defensively occupying high ground like a castle, but as a four-directional scenic frame, each portico looking onto a different pastoral vista. In this design, the building becomes a \u201cmachine for viewing the landscape,\u201d allowing inhabitants to choose different porticos throughout the day as the sun moves, enjoying different light and views. This building-landscape relationship was later absorbed enthusiastically by the 18th-century English landscape garden movement (e.g., Chiswick House) and the American founders (e.g., Thomas Jefferson\u2019s Monticello).',
            'In practice, Palladio designed about 20 rural villas in the inland territory of the Venetian Republic. These villas were not merely aristocratic retreats but management centers for agricultural production \u2014 flanking colonnades connected to granaries, stables, and tool sheds. Palladio\u2019s genius lay in elevating a functional farm into a classical, poetic landscape artifact. His Venetian churches \u2014 especially San Giorgio Maggiore (1565) and Il Redentore (1577) \u2014 placed temple motifs on water, creating the most serene silhouettes in the Venetian skyline.',
          ],
        },
      },
      {
        title: { zh: '《建筑四书》与帕拉迪奥主义的全球传播', ja: '『建築四書』とパッラーディオ主義の世界的伝播', en: 'The Four Books and the Global Diffusion of Palladianism' },
        paragraphs: {
          zh: [
            '《建筑四书》（I Quattro Libri dell\u2019Architettura, 1570）是帕拉迪奥写给所有建筑师的\u201c使用手册\u201d。第一书讲材料与柱式，第二书讲住宅设计，第三书讲市政工程与桥梁，第四书讲古罗马神庙。书中附有大量木刻版画，精确测量标注尺寸——这在16世纪是革命性的，因为它意味着任何有这本书的木匠或石匠都可以\u201c复制\u201d帕拉迪奥的设计，而无需亲自去过维琴察或罗马。这是建筑知识民主化的里程碑。',
            '通过《四书》的传播，帕拉迪奥主义（Palladianism）成为第一个真正全球化的建筑风格。17世纪，英国建筑师Inigo Jones在意大利发现帕拉迪奥，将其带回英国，由此催生了英国乔治亚式建筑（Georgian architecture）。18世纪，英国贵族将帕拉迪奥式别墅带到爱尔兰、苏格兰和美洲殖民地。美国建国者们——尤其是Thomas Jefferson——将帕拉迪奥视为共和主义建筑的象征：清晰、理性、比例和谐、拒绝贵族式的过度装饰。Jefferson设计的Monticello和弗吉尼亚大学校园都是帕拉迪奥主义的美国变体。',
            '帕拉迪奥的遗产不仅在于被复制，更在于他创造了一种\u201c设计的代数\u201d——一种可以用有限元组合生成无限变体的系统。从18世纪英国巴斯（Bath）的Royal Crescent到20世纪美国郊区的McMansion，帕拉迪奥的柱廊、山花和对称平面在四个世纪里已经成为西方建筑基因的一部分。极少有建筑师能声称自己的设计语言在被反复使用了400年后仍然有效——帕拉迪奥做到了。',
          ],
          ja: [
            '『建築四書』（I Quattro Libri dell\u2019Architettura, 1570）は、パッラーディオがあらゆる建築家に向けて書いた「取扱説明書」である。第一書は材料とオーダー、第二書は住宅設計、第三書は土木工事と橋、第四書は古代ローマの神殿を扱う。書中には多数の木版画が付され、正確な寸法が記入されている——これは16世紀において革命的だった。なぜなら、この本を持っている大工や石工なら誰でも、ヴィチェンツァやローマを訪れたことがなくても、パッラーディオのデザインを「複製」できることを意味したからだ。建築知識の民主化のマイルストーンである。',
            '『四書』の伝播を通じて、パッラーディオ主義は最初の真にグローバル化された建築様式となった。17世紀、イギリスの建築家イニゴー·ジョーンズがイタリアでパッラーディオを発見し、イギリスに持ち帰り、これがジョージアン建築を生み出す触媒となった。18世紀、イギリス貴族はパッラーディオ式ヴィラをアイルランド、スコットランド、アメリカ植民地へと持ち込んだ。アメリカ建国者たち——特にトマス·ジェファーソン——はパッラーディオを共和主義建築の象徴と見なした：明晰、理性的、比例が調和し、貴族的な過剰装飾を拒否する。ジェファーソンのモンティチェロやヴァージニア大学キャンパスは、いずれもパッラーディオ主義のアメリカ的変種である。',
            'パッラーディオの遺産は模倣されたことだけにあるのではない——彼は「デザインの代数」を創造したのである。限られた要素の組み合わせから無限のバリエーションを生成できるシステムだ。18世紀のバースのロイヤル·クレセントから20世紀のアメリカ郊外のマクマンションに至るまで、パッラーディオのポルティコ、ペディメント、対称平面は四世紀にわたって西洋建築の遺伝子の一部となっている。400年繰り返し使用された後もなお有効なデザイン言語を持つと主張できる建築家は極めて少ない——パッラーディオはそれを成し遂げた。',
          ],
          en: [
            'The Four Books of Architecture (I Quattro Libri dell\u2019Architettura, 1570) is Palladio\u2019s \u201cinstruction manual\u201d written for all architects. Book I covers materials and orders, Book II residential design, Book III public works and bridges, and Book IV ancient Roman temples. The book is accompanied by numerous woodcut prints with precise measurements \u2014 revolutionary in the 16th century because it meant that any carpenter or stonemason who owned this book could \u201creplicate\u201d Palladio\u2019s designs without ever having visited Vicenza or Rome. It is a milestone in the democratization of architectural knowledge.',
            'Through the dissemination of the Four Books, Palladianism became the first truly global architectural style. In the 17th century, English architect Inigo Jones discovered Palladio in Italy and brought him back to England, catalyzing Georgian architecture. In the 18th century, British aristocrats carried Palladian villas to Ireland, Scotland, and the American colonies. The American founders \u2014 especially Thomas Jefferson \u2014 saw Palladio as the symbol of republican architecture: clear, rational, proportionally harmonious, rejecting aristocratic excess. Jefferson\u2019s Monticello and the University of Virginia campus are both American variants of Palladianism.',
            'Palladio\u2019s legacy lies not only in being copied but in having created a \u201cdesign algebra\u201d \u2014 a system capable of generating infinite variations from a finite set of elements. From the Royal Crescent in 18th-century Bath to the McMansions of 20th-century American suburbs, Palladio\u2019s porticos, pediments, and symmetrical plans have become part of the genetic code of Western architecture over four centuries. Very few architects can claim that their design language remains valid after being used repeatedly for 400 years — Palladio did it.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'villa-rotonda', note: { zh: '四个完全相同的门廊，圆厅和穹顶，世界建筑史上复制最多的私人住宅，建筑与田园风光的完美结合。', ja: '四面が完全同一のポルティコ、円形ホールとドーム。世界建築史上最も模倣された個人住宅であり、建築と田園風景の完璧な結合。', en: 'Four identical porticos, circular hall and dome: the most copied private residence in architectural history, the perfect union of architecture and pastoral landscape.' } },
      { slug: 'teatro-olimpico', note: { zh: '帕拉迪奥的最后作品，也是现存最古老的室内剧院，透视舞台布景以强迫透视手法创造了永不消逝的城市幻境。', ja: 'パッラーディオの遺作であり、現存最古の屋内劇場。遠近法を用いた舞台装置が、決して消えない都市の幻影を創り出す。', en: 'Palladio\u2019s final work and the oldest surviving indoor theater: its perspective stage set uses forced perspective to create an eternal urban illusion.' } },
      { slug: 'san-giorgio-maggiore', note: { zh: '威尼斯水上的神庙立面，两个重叠的山花创造光影交错的节奏，伫立在圣马可广场对面的永恒剪影。', ja: 'ヴェネツィアの水上に立つ神殿ファサード。二つの重なるペディメントが光と影の交錯するリズムを創り、サン・マルコ広場の対岸に永遠のシルエットとして佇む。', en: 'A temple façade on Venetian waters: two overlapping pediments create a rhythm of interlocking light and shadow, an eternal silhouette standing across from Piazza San Marco.' } },
    ],
    sources: [
      { title: 'Andrea Palladio \u2014 The Four Books of Architecture', url: 'https://www.wikidata.org/wiki/Q177323' },
      { title: 'Palladio Museum, Vicenza', url: 'https://www.palladiomuseum.org/' },
      { title: 'Wikidata: Andrea Palladio', url: 'https://www.wikidata.org/wiki/Q177323' },
    ],
  },

  'paulo-mendes-da-rocha': {
    slug: 'paulo-mendes-da-rocha',
    summary: {
      zh: '保罗·门德斯·达·罗查（1928-2021），巴西粗野主义的巅峰代表，2006年普利兹克奖得主。他被称为\u201c混凝土诗人\u201d，以厚重的混凝土结构、巨大的悬挑和无柱的公共空间著称。他的建筑扎根于圣保罗的工业化城市语境，将工程理性与空间诗意融为一体。代表作包括巴西雕塑博物馆和国家马车博物馆。',
      ja: 'パウロ・メンデス・ダ・ロシャ（1928-2021）、ブラジル・ブルータリズムの頂点を代表し、2006年プリツカー賞受賞。「コンクリートの詩人」と称され、重厚なコンクリート構造、巨大なキャンティレバー、無柱の公共空間で知られる。彼の建築はサンパウロの工業化された都市文脈に根ざし、工学的理性と空間の詩を融合させる。代表作にブラジル彫刻美術館、国立馬車博物館。',
      en: 'Paulo Mendes da Rocha (1928-2021), the peak representative of Brazilian Brutalism and recipient of the 2006 Pritzker Prize. Known as \u201cthe poet of concrete,\u201d he is renowned for massive concrete structures, enormous cantilevers, and column-free public spaces. His architecture is rooted in the industrialized urban context of São Paulo, merging engineering rationality with spatial poetry. Key works include the Brazilian Sculpture Museum and the National Coach Museum.'
    },
    core_ideas: {
      zh: [
        '混凝土的诗学：将混凝土视为\u201c液态石头\u201d，不是冷峻的工业材料，而是可以承载文化记忆和大地的重量',
        '大地与天空之间：建筑是在地面上创造人工地形的行为——屋顶是一个新的地面，人同时居于大地和建筑之上',
        '大跨度无柱空间：用预应力混凝土实现惊人的悬挑长度，为公共空间提供不受柱子干扰的完整平面',
        '城市基础设施即建筑：博物馆、体育馆不仅是一座房子，而是城市基础设施的延伸——桥、广场、遮蔽物',
        '形式的经济性：最少的形式表达最大的空间效果，拒绝一切装饰，让结构本身成为美学',
      ],
      ja: [
        'コンクリートの詩学：コンクリートを「液体の石」と捉え、冷たい工業材料ではなく、文化的記憶と大地の重みを担うものとして扱う',
        '大地と空のあいだ：建築は地上に人工の地形を創造する行為——屋根は新たな地面であり、人は大地と建築の両方に同時に住む',
        '大スパン無柱空間：プレストレスト·コンクリートによって驚異的なキャンティレバー長を実現し、柱に妨げられない完全な公共平面を提供する',
        '都市インフラとしての建築：美術館やスタジアムは単なる建物ではなく、都市インフラの延長——橋であり、広場であり、シェルターである',
        '形式の経済性：最小限の形式的表現で最大の空間効果を達成し、一切の装飾を拒否し、構造そのものを美学とする',
      ],
      en: [
        'The poetics of concrete: treating concrete as \u201cliquid stone,\u201d not a cold industrial material but one that can carry cultural memory and the weight of the earth',
        'Between earth and sky: architecture is the act of creating artificial topography on the ground \u2014 the roof is a new ground, and humans inhabit both the earth and the building simultaneously',
        'Large-span column-free space: using prestressed concrete to achieve astonishing cantilever lengths, providing complete public planes undisturbed by columns',
        'Urban infrastructure as architecture: museums and stadiums are not merely buildings but extensions of urban infrastructure \u2014 bridges, plazas, shelters',
        'Economy of form: achieving maximum spatial effect with minimum formal expression, rejecting all ornament, letting structure itself become aesthetics',
      ],
    },
    portrait: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Paulo_Mendes_da_Rocha.jpg',
      author: 'Victor Vucetic',
      license: 'CC BY-SA 4.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Paulo_Mendes_da_Rocha.jpg',
      alt: { zh: '保罗·门德斯·达·罗查肖像', ja: 'パウロ・メンデス・ダ・ロシャの肖像', en: 'Portrait of Paulo Mendes da Rocha' },
    },
    sections: [
      {
        title: { zh: '圣保罗的混凝土诗人', ja: 'サンパウロのコンクリート詩人', en: 'São Paulo\u2019s Poet of Concrete' },
        paragraphs: {
          zh: [
            '门德斯·达·罗查1954年毕业于圣保罗大学麦肯齐建筑学院。他所属的\u201c圣保罗学派\u201d（Paulista School）与里约的奥斯卡·尼迈耶所代表的\u201c卡里奥卡学派\u201d形成了巴西现代建筑的两极。如果说尼迈耶的建筑是感性的曲线和白色的未来主义诗篇，那么圣保罗学派则是粗粝、厚重、扎根于大地的。门德斯·达·罗查称之为\u201c地理的建筑学\u201d——建筑就像从地面生长出来的石头。',
            '他早期的成名作圣保罗竞技场（1958）展示了他毕生的核心主题：将一个巨大的混凝土屋顶悬浮在一个无柱的空间上方。屋顶边缘的悬挑长达数米，结构系统暴露在外，没有粉饰也没有隐藏。这种诚实的美学——让材料的重量和结构的力学直接可见——是他的建筑信仰的核心。他认为，隐藏结构的建筑就像一个人不敢直视自己的身体。',
            '尽管在巴西享有盛誉，门德斯·达·罗查在国际上被认知得较晚。60年代巴西军政府执政期间，他的政治立场（他是巴西共产党党员）导致他被大学开除，公共项目资源被切断。他一度只能在私人住宅项目中延续自己的建筑探索。直到90年代巴西民主化后，他才重新获得大型公共项目的设计机会。',
          ],
          ja: [
            'メンデス・ダ・ロシャは1954年にサンパウロ大学マッケンジー建築学部を卒業。彼の属する「パウリスタ学派」は、リオのオスカー·ニーマイヤーに代表される「カリオカ学派」とブラジル近代建築の両極を形成した。ニーマイヤーの建築が官能的な曲線と白い未来主義の詩だとすれば、パウリスタ学派は粗野で、重厚で、大地に根ざしている。メンデス・ダ・ロシャはこれを「地理の建築学」と呼ぶ——建築は地面から生えてきた石のようなものだ。',
            '初期の出世作であるサンパウロ体育館（1958）は、彼の生涯にわたる核心的テーマを示している——巨大なコンクリート屋根を無柱の空間の上に浮遊させる。屋根の縁のキャンティレバーは数メートルに及び、構造システムは露出し、粉飾も隠蔽もされない。この誠実な美学——材料の重量と構造の力学を直接見せること——が彼の建築的信条の核心である。彼は、構造を隠す建築は自分の身体を直視しようとしない人間のようなものだと考えている。',
            'ブラジル国内で名声を得ていたにもかかわらず、メンデス・ダ・ロシャが国際的に認知されるのは遅かった。1960年代のブラジル軍事政権下で、彼の政治的立場（ブラジル共産党員）が原因で大学を追放され、公共プロジェクトの資源が断たれた。一時期は個人住宅プロジェクトでのみ建築的探求を続けることを余儀なくされた。ブラジルの民主化後の1990年代になって初めて、彼は大規模公共プロジェクトの設計機会を再び得ることになる。',
          ],
          en: [
            'Mendes da Rocha graduated from the Mackenzie School of Architecture at the University of São Paulo in 1954. The \u201cPaulista School\u201d to which he belonged and the \u201cCarioca School\u201d represented by Oscar Niemeyer in Rio formed the two poles of Brazilian modern architecture. If Niemeyer\u2019s architecture is sensual curves and white futuristic poetry, then the Paulista School is rough, heavy, rooted in the earth. Mendes da Rocha calls it \u201cthe architecture of geography\u201d \u2014 architecture is like stone that has grown out of the ground.',
            'His early breakthrough, the São Paulo Gymnasium (1958), demonstrates his lifelong core theme: suspending a massive concrete roof above a column-free space. The cantilever at the roof\u2019s edge extends several meters, the structural system exposed, neither whitewashed nor hidden. This honest aesthetic \u2014 making the weight of materials and the mechanics of structure directly visible \u2014 is at the heart of his architectural belief. He thinks that architecture that hides its structure is like a person who dares not look directly at their own body.',
            'Although renowned in Brazil, Mendes da Rocha was recognized internationally rather late. During the Brazilian military dictatorship in the 1960s, his political stance (he was a member of the Brazilian Communist Party) led to his expulsion from the university and the cutting off of resources for public projects. For a time he could only continue his architectural explorations through private residential projects. Only after Brazil\u2019s democratization in the 1990s did he regain opportunities to design large-scale public projects.',
          ],
        },
      },
      {
        title: { zh: '巴西雕塑博物馆：看不见的建筑', ja: 'ブラジル彫刻美術館——見えない建築', en: 'Brazilian Sculpture Museum: The Invisible Building' },
        paragraphs: {
          zh: [
            '巴西雕塑博物馆（MuBE, 1988）是门德斯·达·罗查最具哲学深度的作品。它的设计师绝不寻常：建筑主体埋在地下，地面上只见一个巨大的混凝土梁——长达60米，悬挑在广场上方。这个裸露的混凝土梁唯一的\u201c功能\u201d是制造一片阴影、划定一个空间的边界、宣告一座建筑的存在——而不急着展示建筑本身。这是\u201c建筑作为大地艺术\u201d的宣言。',
            '参观者想要进入博物馆，必须走下阶梯、穿越埋在地下的展厅。这种动线设计颠覆了传统的\u201c宏伟入口\u201d观念——不是一座辉煌的大厅欢迎你，而是一段向下的旅程，仿佛进入考古挖掘现场。门德斯·达·罗查说，博物馆不是一座纪念碑，而是大地上的一道切口。所有展厅都由天窗采光，地面上的人只能看到梁、水景和植被——建筑消失在景观之中。',
            'MuBE的设计也体现了他对城市的态度。在圣保罗这个混凝土丛林中，开放空间本身就是一种奢侈。他将博物馆的大部分空间贡献给了城市——地上的广场是任何市民都可以自由使用的公共空间，展览空间谦逊地退入地下。这种\u201c把土地还给城市\u201d的姿态是他所有公共建筑的核心伦理：建筑不是占用城市，而是回馈城市。',
          ],
          ja: [
            'ブラジル彫刻美術館（MuBE, 1988）は、メンデス・ダ・ロシャの最も哲学的な深みを持つ作品である。そのデザインは決して通常ではない——建物の本体は地下に埋められ、地上には長さ60メートルの巨大なコンクリート梁が広場の上空にキャンティレバーで架かるのみ。この露出したコンクリート梁の唯一の「機能」は、一片の影をつくり、空間の境界を定め、建物の存在を宣言すること——建物自体を見せることを急がない。これは「大地の芸術としての建築」のマニフェストである。',
            '来館者が美術館に入りたい場合、階段を下り、地下に埋められた展示室を通過しなければならない。この動線デザインは伝統的な「壮麗なエントランス」の概念を覆す——華麗なホールがあなたを迎えるのではなく、下方への旅であり、あたかも考古学的発掘現場に入っていくかのようだ。メンデス·ダ·ロシャは言う、美術館はモニュメントではなく、大地に刻まれた一道の切れ目であると。すべての展示室はトップライトで採光され、地上の人々には梁と水景と植栽しか見えない——建築は景観のなかに消えていく。',
            'MuBEのデザインは、彼の都市に対する態度をも体現している。サンパウロというコンクリート·ジャングルにおいて、開かれた空間それ自体が贅沢である。彼は美術館の空間の大部分を都市に捧げた——地上の広場はすべての市民が自由に使える公共空間であり、展示空間は謙虚に地下へと退く。この「土地を都市に返す」姿勢は、彼のすべての公共建築の中核的倫理である——建築は都市を占有するのではなく、都市に還元するのだ。',
          ],
          en: [
            'The Brazilian Sculpture Museum (MuBE, 1988) is Mendes da Rocha\u2019s most philosophically profound work. Its design is anything but conventional: the main building body is buried underground, and above ground only a giant concrete beam \u2014 60 meters long, cantilevered above the plaza \u2014 is visible. The sole \u201cfunction\u201d of this exposed concrete beam is to create a patch of shadow, delineate the boundary of a space, declare the presence of a building \u2014 without rushing to show the building itself. This is a manifesto for \u201carchitecture as land art.\u201d',
            'Visitors wishing to enter the museum must descend stairs and pass through exhibition halls buried underground. This circulation design inverts the traditional notion of the \u201cgrand entrance\u201d \u2014 not a magnificent hall welcoming you, but a downward journey, as if entering an archaeological dig. Mendes da Rocha says that a museum is not a monument but an incision in the earth. All exhibition halls are lit by skylights; people on the ground can see only the beam, water features, and vegetation \u2014 architecture disappears into the landscape.',
            'MuBE\u2019s design also embodies his attitude toward the city. In São Paulo, a concrete jungle, open space itself is a luxury. He donated the majority of the museum\u2019s space to the city \u2014 the above-ground plaza is a public space any citizen can freely use, while the exhibition space humbly retreats underground. This gesture of \u201creturning land to the city\u201d is the core ethic of all his public buildings: architecture does not occupy the city but gives back to it.',
          ],
        },
      },
      {
        title: { zh: '普利兹克奖与晚期公共建筑', ja: 'プリツカー賞と後期の公共建築', en: 'Pritzker Prize and Late Public Works' },
        paragraphs: {
          zh: [
            '2006年，78岁的门德斯·达·罗查获得普利兹克建筑奖，成为巴西第二位获奖者（继尼迈耶之后）。评审团评价他的建筑\u201c既是工程奇迹，又闪耀着深刻的空间理解\u201d。尽管获奖时他已近八旬，但获奖为他的实践带来了新的活力——他开始在葡萄牙、西班牙等地设计大型公共建筑。',
            '国家马车博物馆（2015）是他在葡萄牙里斯本的重要作品。建筑悬浮在旧博物馆之上，由两个巨大的混凝土梁支撑，中间是一个完全开放的公共广场。这个设计再次体现了他\u201c建筑作为城市基础设施\u201d的理念——博物馆不是一座封闭的殿堂，而是一个市民可以自由穿越的遮蔽物。悬挑的混凝土体量在视觉上轻盈得让人难以置信，仿佛在挑战重力法则。',
            '2021年5月，门德斯·达·罗查因肺癌在圣保罗去世，享年92岁。他的建筑遗产不仅是一批标志性建筑，更是一种设计态度——粗野不是粗鲁，而是诚实地面对材料、结构、重力和城市的真实。在一个追求光滑、无缝、完美的建筑年代，他的混凝土裂缝和模板痕迹提醒我们：建筑最终属于大地，而非属于图像。',
          ],
          ja: [
            '2006年、78歳のメンデス·ダ·ロシャはプリツカー建築賞を受賞し、ブラジル人として二人目の受賞者となった（ニーマイヤーに次ぐ）。審査員は彼の建築を「工学的驚異であると同時に、深遠な空間理解がきらめくもの」と評した。受賞時にはすでに八十歳近かったが、受賞は彼の実務に新たな活力をもたらした——ポルトガルやスペインなどで大規模な公共建築の設計を始めることになる。',
            '国立馬車博物館（2015）はポルトガル·リスボンにおける彼の重要な作品である。建物は旧博物館の上空に浮遊し、二本の巨大なコンクリート梁によって支持され、その下は完全に開かれた公共広場となっている。このデザインは再び彼の「都市インフラとしての建築」理念を体現する——美術館は閉ざされた殿堂ではなく、市民が自由に通り抜けられるシェルターなのだ。キャンティレバーするコンクリートのボリュームは視覚的に信じがたいほど軽やかで、重力の法則に挑戦しているかのようだ。',
            '2021年5月、メンデス·ダ·ロシャは肺がんのためサンパウロで死去、享年92歳。彼の建築的遺産は一連のアイコン的作品だけでなく、一つのデザイン態度でもある——ブルータルは粗暴ではなく、材料、構造、重力、そして都市の真実に誠実に向き合うことだ。滑らかで、継ぎ目なく、完璧を追求する建築の時代にあって、彼のコンクリートのひび割れや型枠の痕跡は私たちに思い出させる——建築は最終的に大地に属するのであり、イメージに属するのではない。',
          ],
          en: [
            'In 2006, at age 78, Mendes da Rocha received the Pritzker Architecture Prize, becoming the second Brazilian laureate (after Niemeyer). The jury described his architecture as \u201cboth an engineering marvel and sparkling with profound spatial understanding.\u201d Although he was nearly eighty at the time of the award, the prize brought new vitality to his practice \u2014 he began designing large public buildings in Portugal, Spain, and elsewhere.',
            'The National Coach Museum (2015) is his major work in Lisbon, Portugal. The building floats above the old museum, supported by two enormous concrete beams, with a completely open public plaza beneath. This design again embodies his idea of \u201carchitecture as urban infrastructure\u201d \u2014 the museum is not a sealed temple but a shelter through which citizens can freely pass. The cantilevered concrete volume is visually unbelievable in its lightness, as if challenging the laws of gravity.',
            'In May 2021, Mendes da Rocha died of lung cancer in São Paulo at the age of 92. His architectural legacy is not only a collection of iconic buildings but also a design attitude \u2014 Brutalism is not brutality, but an honest confrontation with materials, structure, gravity, and the truth of the city. In an era that pursues smooth, seamless, perfect architecture, the cracks and formwork marks in his concrete remind us: architecture ultimately belongs to the earth, not to the image.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'museu-brasileiro-da-escultura', note: { zh: '埋在地下的博物馆，地面只有一道60米的混凝土梁——建筑作为大地艺术，广场作为城市赠礼。', ja: '地下に埋められた美術館、地上には60メートルのコンクリート梁のみ——大地の芸術としての建築、都市への贈り物としての広場。', en: 'A museum buried underground, with only a 60-meter concrete beam above ground \u2014 architecture as land art, the plaza as a gift to the city.' } },
      { slug: 'national-coach-museum', note: { zh: '悬浮于旧馆之上的混凝土体量，两梁支撑下是完全开放的广场，里斯本滨水区的新地标。', ja: '旧館の上空に浮遊するコンクリートのボリューム、二本の梁で支えられた完全開放の広場、リスボン·ウォーターフロントの新たなランドマーク。', en: 'A concrete volume suspended above the old museum, supported by two beams over a completely open plaza, a new landmark on Lisbon\u2019s waterfront.' } },
      { slug: 'cais-das-artes', note: { zh: '维托里亚港的艺术码头，悬挑的混凝土屋檐遮蔽大海和城市之间的过渡空间，建筑即是地平线。', ja: 'ヴィトリア港の芸術埠頭。キャンティレバーするコンクリートの庇が海と都市のあいだの移行空間を覆い、建築そのものが地平線となる。', en: 'The Arts Dock in Vitória: cantilevered concrete eaves shelter the transitional space between sea and city, architecture as horizon itself.' } },
    ],
    sources: [
      { title: 'Paulo Mendes da Rocha \u2014 Pritzker Prize', url: 'https://www.pritzkerprize.com/laureates/2006' },
      { title: 'Wikidata: Paulo Mendes da Rocha', url: 'https://www.wikidata.org/wiki/Q467339' },
      { title: 'ArchDaily: Paulo Mendes da Rocha', url: 'https://www.archdaily.com/office/paulo-mendes-da-rocha' },
    ],
  },

  'felix-candela': {
    slug: 'felix-candela',
    summary: {
      zh: '費利克斯·坎德拉（1910-1997），生于西班牙、成名于墨西哥的结构诗人。他是20世纪薄壳混凝土建筑的先驱，以双曲抛物面（Hypar）薄壳屋顶著称——厚度仅4厘米却能跨越数十米。他将极致的计算能力与优雅的雕塑感融为一体，把教堂、餐厅、工业厂房变成了混凝土的波浪与花朵。',
      ja: 'フェリックス・キャンデラ（1910-1997）、スペイン生まれ、メキシコで名を成した構造の詩人。20世紀薄殻コンクリート建築の先駆者で、二重放物面（ハイパー）薄殻屋根で知られる——厚さわずか4cmで数十メートルをスパンする。極限の計算能力と優雅な彫刻感覚を融合させ、教会、レストラン、工業施設をコンクリートの波と花に変えた。',
      en: 'Félix Candela (1910-1997), a poet of structure born in Spain and celebrated in Mexico. He was a pioneer of 20th-century thin-shell concrete architecture, renowned for hyperbolic paraboloid (hypar) shells \u2014 only 4 cm thick yet spanning dozens of meters. He fused supreme computational skill with elegant sculptural sensibility, transforming churches, restaurants, and industrial buildings into waves and flowers of concrete.'
    },
    core_ideas: {
      zh: [
        '薄壳作为诗意工具：混凝土壳不是技术炫技，而是用最少材料创造最大空间和最美形式的途径',
        '双曲抛物面的魔力：双曲面既是结构最优解（双重弯曲增加刚度），也是几何最美的形状——单一的直纹曲面',
        '建筑师-工程师合一：坎德拉同时是建筑师、结构工程师和承包商，可以自己计算、自己画图、自己造',
        '低成本的诗意：薄壳技术最大的意义是经济——用极少材料覆盖巨大空间，适合战后发展中国家',
        '自然形态的结构逻辑：贝壳、花瓣、波浪不是装饰灵感，而是力的最优路径的可视化',
      ],
      ja: [
        '薄殻の詩的ツール：コンクリート·シェルは技術の誇示ではなく、最小の材料で最大の空間と最も美しい形式を創り出す方法である',
        'ハイパーの魔術：双曲放物面は構造的最適解（二重曲率が剛性を高める）であると同時に、幾何学的に最も美しい形状——単一の線織面',
        '建築家-エンジニアの合一：キャンデラは同時に建築家、構造エンジニア、施工者であり、自ら計算し、図面を描き、自ら建設した',
        '低コストの詩学：薄殻技術の最大の意義は経済性——極少材料で巨大空間を覆い、戦後発展途上国に適合',
        '自然形態の構造論理：貝殻、花びら、波は装飾的インスピレーションではなく、力の最適経路の可視化である',
      ],
      en: [
        'Thin shell as a poetic tool: concrete shells are not technical showing-off but a way to create maximum space and the most beautiful form with minimum material',
        'The magic of the hypar: the hyperbolic paraboloid is simultaneously the structural optimum (double curvature increases stiffness) and the most beautiful geometric form \u2014 a single ruled surface',
        'Architect-engineer united: Candela was simultaneously architect, structural engineer, and contractor, capable of calculating, drawing, and building himself',
        'Low-cost poetry: the greatest significance of thin-shell technology is economy \u2014 covering enormous spaces with very little material, suited to post-war developing countries',
        'Structural logic of natural forms: shells, petals, waves are not decorative inspiration but the visualization of optimal force paths',
      ],
    },
    portrait: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/F%C3%A9lix_Candela_1978.jpg',
      author: 'Unknown',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:F%C3%A9lix_Candela_1978.jpg',
      alt: { zh: '費利克斯·坎德拉肖像', ja: 'フェリックス・キャンデラの肖像', en: 'Portrait of Félix Candela' },
    },
    sections: [
      {
        title: { zh: '从西班牙到墨西哥：流亡者的结构革命', ja: 'スペインからメキシコへ——亡命者の構造革命', en: 'From Spain to Mexico: An Exile\u2019s Structural Revolution' },
        paragraphs: {
          zh: [
            '坎德拉出生在马德里的建筑世家，1935年获得建筑学位。然而西班牙内战（1936-1939）打断了他的建筑师生涯——他加入了共和军一方，担任工程兵上尉。佛朗哥获胜后，坎德拉被关入集中营，1939年通过国际红十字会获释后流亡墨西哥。他在墨西哥城的船票上写道：\u201c西班牙失去了一个建筑师，墨西哥获得了一个诗人。\u201d',
            '在墨西哥，坎德拉发现了一个建筑实验室。战后墨西哥经济蓬勃发展，需要大量低成本的大跨度公共建筑——市场、仓库、教堂和工厂。混凝土便宜但钢材昂贵，传统建筑方式在墨西哥不合适。坎德拉决定将博士论文中研究的薄壳理论付诸实践。1949年，他设计并建造了墨西哥国立自治大学宇宙射线实验室（Pabellón de Rayos Cósmicos），这是世界上第一座双曲抛物面混凝土薄壳建筑，厚度仅为1.6厘米。',
            '坎德拉的独特之处在于他同时控制设计、计算和施工三个环节。他创办了自己的建筑公司Cubiertas Ala（\u201c翼形屋顶\u201d），既是建筑师又是承包商。这意味着他可以实验——如果壳太薄开裂了，他可以在下一个项目中调整。他总共设计建造了超过800座薄壳结构，其中约300座在墨西哥城。他说，这些壳不是\u201c设计\u201d出来的，而是\u201c计算\u201d出来然后\u201c生长\u201d出来的。',
          ],
          ja: [
            'キャンデラはマドリードの建築家一家に生まれ、1935年に建築学位を取得。しかしスペイン内戦（1936-1939）が彼の建築家キャリアを中断させた——彼は共和国側に加わり、工兵大尉として従軍。フランコの勝利後、キャンデラは強制収容所に収監され、1939年に国際赤十字を通じて釈放されるとメキシコに亡命。メキシコ·シティ行きの船の切符に彼はこう書いた——「スペインは建築家を失い、メキシコは詩人を得た」。',
            'メキシコで、キャンデラは建築の実験室を見出した。戦後メキシコ経済は急成長し、低コストで大スパンの公共建築——市場、倉庫、教会、工場——が大量に必要とされていた。コンクリートは安価だが鉄鋼は高価で、伝統的な建築方法はメキシコでは不向きだった。キャンデラは博士論文で研究していた薄殻理論を実践に移すことを決意。1949年、メキシコ国立自治大学の宇宙線研究所（Pabellón de Rayos Cósmicos）を設計·建設——これは世界初の双曲放物面コンクリート薄殻建築で、厚さはわずか1.6cmだった。',
            'キャンデラの独自性は、設計·計算·施工の三つの段階を同時にコントロールした点にある。彼は自らの建設会社Cubiertas Ala（「翼形屋根」）を設立し、建築家であると同時に施工者でもあった。これは実験が可能であることを意味する——もしシェルが薄すぎてひび割れたら、次のプロジェクトで調整すればよい。彼は合計800以上の薄殻構造を設計·建設し、そのうち約300がメキシコ·シティにある。彼は言う、これらのシェルは「設計」されたのではなく、「計算」され、そして「成長」したのだと。',
          ],
          en: [
            'Candela was born into an architectural family in Madrid and earned his architecture degree in 1935. But the Spanish Civil War (1936-1939) interrupted his architectural career \u2014 he joined the Republican side, serving as a captain of engineers. After Franco\u2019s victory, Candela was imprisoned in a concentration camp; released in 1939 through the International Red Cross, he went into exile in Mexico. On his ticket to Mexico City he wrote: \u201cSpain lost an architect, Mexico gained a poet.\u201d',
            'In Mexico, Candela found an architectural laboratory. Post-war Mexico\u2019s economy was booming, demanding large numbers of low-cost, large-span public buildings \u2014 markets, warehouses, churches, and factories. Concrete was cheap but steel was expensive; traditional building methods were unsuitable in Mexico. Candela decided to put into practice the thin-shell theories he had studied in his doctoral dissertation. In 1949, he designed and built the Cosmic Rays Pavilion (Pabellón de Rayos Cósmicos) at the National Autonomous University of Mexico, the world\u2019s first hyperbolic paraboloid concrete thin-shell building, just 1.6 cm thick.',
            'What made Candela unique was his simultaneous control of design, calculation, and construction. He founded his own construction company, Cubiertas Ala (\u201cWing Roofs\u201d), acting as both architect and contractor. This meant he could experiment \u2014 if a shell was too thin and cracked, he could adjust in the next project. He designed and built over 800 thin-shell structures in total, about 300 of them in Mexico City. These shells, he said, were not \u201cdesigned\u201d but \u201ccalculated\u201d and then \u201cgrown.\u201d',
          ],
        },
      },
      {
        title: { zh: '洛斯马纳蒂亚莱斯：薄壳的顶峰', ja: 'ロス·マナンティアレス——薄殻の頂点', en: 'Los Manantiales: The Apex of Thin Shells' },
        paragraphs: {
          zh: [
            '洛斯马纳蒂亚莱斯餐厅（Los Manantiales, 1958）位于墨西哥城Xochimilco区，是坎德拉最著名的作品。建筑由一个完整的双曲抛物面薄壳构成——从中心一个点辐射出八个拱形翼片，像一个巨大的八瓣莲花盛开在水边。整个壳体的厚度仅为4厘米，覆盖面积却有42米直径。从内部看，结构几乎消失——只有光线在曲面上滑动的渐变，和混凝土边缘那不可思议的薄。',
            '这座餐厅是坎德拉薄壳系统最完美的施展。双曲抛物面（Hypar）的几何特性意味着它可以用直线模板建造——虽然曲面是三维的，但它的\u201c母线\u201d是直线。这对施工来说是革命性的：工人们只需要用直的木板搭建模板，混凝土浇筑干燥后就自然形成了三维曲面。不需要昂贵的曲面模板或3D计算机（那时根本没有），只需要坎德拉手算的坐标。',
            '洛斯马纳蒂亚莱斯也是坎德拉\u201c自由边缘\u201d（Free Edge）理论的极致演示——壳体的边缘没有横梁加固，而是依靠曲面自身的折叠刚度来保持稳定。壳的边缘最薄处像纸一样，越靠近中心越厚。这不仅仅是结构理性，也是一种美学：边缘的薄暗示着轻盈和失重，中心的柱则暗示着力量向下垂入大地。坎德拉称这是\u201c力的可视化\u201d。',
          ],
          ja: [
            'ロス·マナンティアレス·レストラン（Los Manantiales, 1958）はメキシコ·シティのソチミルコ地区に位置し、キャンデラの最も有名な作品である。建物は一つの完全な双曲放物面薄殻から構成され——中心の一点から八つのアーチ状の翼片が放射状に広がり、巨大な八弁の蓮の花が水辺に咲いたようだ。殻全体の厚さはわずか4cmでありながら、覆う範囲の直径は42メートル。内部から見ると、構造はほとんど消えている——曲面上を滑る光のグラデーションと、コンクリートの縁の信じがたい薄さのみ。',
            'このレストランはキャンデラの薄殻システムの最も完璧な展開である。双曲放物面（ハイパー）の幾何学的特性は、直線の型枠で建設できることを意味する——曲面は三次元的だが、その「母線」は直線なのだ。これは施工にとって革命的だった——作業員はまっすぐな木板で型枠を組むだけでよく、コンクリートを流し込んで乾燥させれば自然と三次元曲面が形成される。高価な曲面型枠も3Dコンピューターも（当時は存在しなかった）不要で、必要なのはキャンデラが手計算した座標だけだった。',
            'ロス·マナンティアレスはキャンデラの「自由縁」（Free Edge）理論の極致のデモンストレーションでもある——殻の縁には梁による補強がなく、曲面自体の折り畳み剛性だけで安定を保つ。殻の縁の最も薄い部分は紙のようで、中心に近づくほど厚くなる。これは単なる構造的合理性ではなく、美学でもある——縁の薄さは軽さと無重力を暗示し、中心の柱は力が大地へと降りていくことを暗示する。キャンデラはこれを「力の可視化」と呼んだ。',
          ],
          en: [
            'The Los Manantiales restaurant (1958), located in the Xochimilco district of Mexico City, is Candela\u2019s most famous work. The building consists of a single continuous hyperbolic paraboloid shell \u2014 from a central point, eight arched petals radiate outward like an enormous eight-petaled lotus blooming by the water. The entire shell is just 4 cm thick, yet covers a diameter of 42 meters. From within, the structure nearly disappears \u2014 only the gradient of light sliding across the curved surface and the unbelievable thinness of the concrete edge.',
            'This restaurant is the most perfect deployment of Candela\u2019s thin-shell system. The geometric property of the hyperbolic paraboloid (hypar) means it can be built with straight formwork \u2014 although the surface is three-dimensional, its \u201cgeneratrices\u201d are straight lines. This was revolutionary for construction: workers only needed to assemble straight wooden planks for formwork, and once concrete was poured and dried, it naturally formed the three-dimensional curve. No expensive curved formwork or 3D computers (nonexistent at the time) were needed, only the coordinates Candela calculated by hand.',
            'Los Manantiales is also the ultimate demonstration of Candela\u2019s \u201cFree Edge\u201d theory \u2014 the shell\u2019s edges have no beam reinforcement, relying solely on the folding stiffness of the curved surface itself for stability. The shell\u2019s thinnest edges are paper-like, growing thicker toward the center. This is not just structural rationality but also an aesthetic: the thinness of the edge suggests lightness and weightlessness, while the central column suggests force descending into the earth. Candela called this \u201cthe visualization of forces.\u201d',
          ],
        },
      },
      {
        title: { zh: '坎德拉的全球遗产', ja: 'キャンデラのグローバルな遺産', en: 'Candela\u2019s Global Legacy' },
        paragraphs: {
          zh: [
            '坎德拉的薄壳建筑在1950-60年代达到全盛，但随着现代主义向晚期资本主义转型，他的技术被边缘化。原因之一是薄壳施工需要大量廉价劳动力——在墨西哥经济升级后，劳动力成本上升，预制钢结构和幕墙系统比手工建造薄壳更便宜。另一个原因是薄壳的\u201c手工计算\u201d时代结束了，但新的计算机辅助设计尚未普及——薄壳落入了技术过渡的缝隙中。',
            '1971年，坎德拉离开墨西哥，前往美国伊利诺伊大学任教。他的晚期作品在西班牙完成，包括瓦伦西亚海洋公园（L\u2019Oceanogràfic, 2003，在他去世后完成）的入口建筑——再次使用了双曲抛物面的主题，但这次屋顶不再覆盖整个空间，而是成为水面上的白色花朵。这是薄壳的黄昏挽歌，也是坎德拉结构诗学的最后绽放。',
            '今天，随着数字建造技术（3D打印混凝土、参数化设计）的兴起，坎德拉的薄壳理念正在经历一次复兴。Zaha Hadid、Santiago Calatrava和Fuksas等当代建筑师都在不同程度上继承了他的形式探索。但坎德拉与他们的根本区别在于：他的薄壳不是奢侈品，而是经济工具。他证明了最美丽的建筑可以用最少的金钱和最朴素的劳动力实现——在一个被Sky-High Project成本和明星建筑师签名溢价支配的时代，这一信息比以往任何时候都更有价值。',
          ],
          ja: [
            'キャンデラの薄殻建築は1950-60年代に全盛を迎えたが、モダニズムが後期資本主義へと移行するにつれて、彼の技術は周縁化されていった。一つの理由は、薄殻施工が大量の安価な労働力を必要とすること——メキシコ経済が高度化するにつれて人件費が上昇し、プレハブ鉄骨構造やカーテンウォール·システムが手作業の薄殻建設よりも安価になった。もう一つの理由は、薄殻の「手計算」時代が終わった一方で、新しいコンピュータ支援設計がまだ普及していなかったこと——薄殻は技術移行の隙間に落ちたのだ。',
            '1971年、キャンデラはメキシコを離れ、アメリカのイリノイ大学で教鞭を執る。彼の後期作品はスペインで完成した——バレンシア海洋公園（L\u2019Oceanogràfic, 2003、彼の死後に完成）のエントランス建築は、再び双曲放物面のテーマを用いたが、今度は屋根が空間全体を覆うのではなく、水面に浮かぶ白い花となった。これは薄殻の黄昏の哀歌であり、キャンデラの構造詩学の最後の開花である。',
            '今日、デジタル·ファブリケーション技術（3Dプリント·コンクリート、パラメトリック·デザイン）の台頭とともに、キャンデラの薄殻思想はルネサンスを経験しつつある。ザハ·ハディド、サンティアゴ·カラトラバ、フクサスらの現代建築家は、さまざまな程度で彼の形式探求を受け継いでいる。しかしキャンデラと彼らの根本的な違いは——彼の薄殻は贅沢品ではなく、経済的ツールだったことだ。彼は最も美しい建築が最小の費用と最も素朴な労働力で実現できることを証明した——天文学的プロジェクト費用とスター建築家の署名プレミアムに支配された時代にあって、このメッセージはかつてないほど価値がある。',
          ],
          en: [
            'Candela\u2019s thin-shell architecture reached its zenith in the 1950s-60s, but as modernism transitioned into late capitalism, his technology was marginalized. One reason is that thin-shell construction requires large amounts of cheap labor \u2014 as Mexico\u2019s economy upgraded and labor costs rose, prefabricated steel structures and curtain-wall systems became cheaper than hand-built thin shells. Another reason is that the era of \u201chand calculation\u201d for thin shells ended, but new computer-aided design had not yet become widespread \u2014 thin shells fell into the gap of technological transition.',
            'In 1971, Candela left Mexico to teach at the University of Illinois in the United States. His late works were completed in Spain, including the entrance building of L\u2019Oceanogràfic in Valencia (2003, completed posthumously) \u2014 again using the hyperbolic paraboloid theme, but this time the roof no longer covered the entire space but became white flowers floating on water. This is the twilight elegy of thin shells, and the final blossoming of Candela\u2019s structural poetics.',
            'Today, with the rise of digital fabrication technologies (3D-printed concrete, parametric design), Candela\u2019s thin-shell philosophy is undergoing a renaissance. Contemporary architects like Zaha Hadid, Santiago Calatrava, and Fuksas have inherited his formal exploration to varying degrees. But the fundamental difference between Candela and them is this: his thin shells were not luxury goods but economic tools. He proved that the most beautiful architecture can be achieved with the least money and the humblest labor \u2014 in an era dominated by sky-high project costs and star-architect signature premiums, this message is more valuable than ever.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'church-of-nuestra-senora-de', note: { zh: '瓜达卢佩圣母教堂的双曲薄壳屋顶像祈祷的双手合拢，4cm厚的混凝土覆盖了整个教堂的中殿。', ja: 'グアダルーペ教会の双曲薄殻屋根は祈りの手が合わさるように、わずか4cmのコンクリートが教会の身廊全体を覆う。', en: 'The hypar shells of the church of Nuestra Señora de Guadalupe fold like hands in prayer, 4 cm of concrete covering the entire nave.' } },
      { slug: 'palacio-de-los-deportes', note: { zh: '1968年墨西哥奥运会场馆，铜包覆的双曲抛物面穹顶，几何理性与纪念性的完美融合。', ja: '1968年メキシコ·オリンピックの会場。銅板で覆われた双曲放物面のドーム、幾何学的理性と記念碑性の完璧な融合。', en: 'Venue of the 1968 Mexico Olympics: a copper-clad hypar dome, the perfect fusion of geometric rationality and monumentality.' } },
      { slug: 'loceanografic', note: { zh: '坎德拉的遗作，瓦伦西亚海洋公园入口的白色花瓣薄壳——结构诗学的最后绽放。', ja: 'キャンデラの遺作。バレンシア海洋公園エントランスの白い花弁薄殻——構造詩学の最後の開花。', en: 'Candela\u2019s posthumous work: the white-petal thin shells of the Valencia Oceanogràfic entrance — the final blossoming of structural poetics.' } },
    ],
    sources: [
      { title: 'Félix Candela \u2014 Thin-Shell Structures', url: 'https://www.wikidata.org/wiki/Q704445' },
      { title: 'Felix Candela: Engineer, Builder, Structural Artist (Princeton)', url: 'https://press.princeton.edu/books/paperback/9780691121291/felix-candela' },
      { title: 'Wikidata: Félix Candela', url: 'https://www.wikidata.org/wiki/Q704445' },
    ],
  },

  'sanaa': {
    slug: 'sanaa',
    summary: {
      zh: 'SANAA（Sejima And Nishizawa And Associates），由妹岛和世（1956-）与西泽立卫（1966-）于1995年在东京创立。2010年获得普利兹克奖，是继扎哈·哈迪德之后第二位获此殊荣的女性建筑师（妹岛）和当时最年轻的获奖者之一。SANAA的建筑以极致的白色、透明的边界和模糊的内外关系著称——建筑仿佛溶解在光中。代表作包括金泽21世纪美术馆和劳力士学习中心。',
      ja: 'SANAA（セジマ·アンド·ニシザワ·アンド·アソシエイツ）、妹島和世（1956-）と西沢立衛（1966-）が1995年に東京で設立。2010年プリツカー賞受賞、ザハ·ハディドに次ぐ二人目の女性建築家（妹島）の受賞であり、当時最年少受賞者の一人。SANAAの建築は極限の白さ、透明な境界、曖昧な内外関係で知られる——建築が光のなかに溶けていくかのようだ。代表作に金沢21世紀美術館、ロレックス·ラーニング·センター。',
      en: 'SANAA (Sejima And Nishizawa And Associates), founded in Tokyo in 1995 by Kazuyo Sejima (b. 1956) and Ryue Nishizawa (b. 1966). They received the Pritzker Prize in 2010, the second female architect (Sejima) to win after Zaha Hadid and among the youngest laureates ever. SANAA\u2019s architecture is known for extreme whiteness, transparent boundaries, and ambiguous relationships between inside and outside \u2014 buildings that seem to dissolve into light. Landmarks include the 21st Century Museum Kanazawa and the Rolex Learning Center.'
    },
    core_ideas: {
      zh: [
        '透明的边界：墙壁不再是分割空间的硬质屏障，而是不同程度的透明层——透明度取代了墙体',
        '场域而非物体：建筑不应作为孤立的\u201c物\u201d存在，而应该创造一种\u201c场\u201d——让\u200b\u200b在其中自由流动',
        '公园般的建筑：将建筑的内部空间组织得像一个公园——没有固定的路径，没有强制性的体验顺序',
        '超平（Superflat）美学：继承日本传统绘画的平面性，用板、柱、玻璃构成极薄的建筑皮层',
        '建筑即氛围：空间的力量不在于形式造型，而在于光线、材料反射和人与人之间的视觉关系',
      ],
      ja: [
        '透明な境界：壁はもはや空間を区切る硬い障壁ではなく、さまざまな程度の透明の層——透明度が壁に取って代わる',
        'オブジェクトではなく場：建築は孤立した「物」として存在すべきではなく、自由に流動できる「場」を創出すべきである',
        '公園のような建築：建築の内部空間を公園のように組織する——固定された経路はなく、強制的な体験順序もない',
        'スーパーフラットの美学：日本伝統絵画の平面性を受け継ぎ、板·柱·ガラスで極限まで薄い建築表皮を構成する',
        '建築は雰囲気である：空間の力は形態の造形にあるのではなく、光、素材の反射、人と人との視覚的関係にある',
      ],
      en: [
        'Transparent boundaries: walls are no longer hard barriers dividing space but layers of varying degrees of transparency — transparency replaces the wall',
        'Field rather than object: architecture should not exist as an isolated \u201cthing\u201d but should create a \u201cfield\u201d where people can flow freely',
        'Park-like architecture: organizing the interior space of a building like a park — no fixed paths, no compulsory sequence of experience',
        'Superflat aesthetics: inheriting the flatness of traditional Japanese painting, composing an extremely thin architectural skin from slabs, columns, and glass',
        'Architecture as atmosphere: the power of space does not lie in formal sculpting but in light, material reflections, and the visual relationships between people',
      ],
    },
    portrait: {
      url: 'https://commons.wikimedia.org/wiki/Special:FilePath/SANAA_at_MIT_March_2016.jpg',
      author: 'John D. and Catherine T. MacArthur Foundation',
      license: 'CC BY 4.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:SANAA_at_MIT_March_2016.jpg',
      alt: { zh: '妹岛和世与西泽立卫合影', ja: '妹島和世と西沢立衛の写真', en: 'Kazuyo Sejima and Ryue Nishizawa' },
    },
    sections: [
      {
        title: { zh: '妹岛与西泽：东京极简主义的诞生', ja: '妹島と西沢——東京ミニマリズムの誕生', en: 'Sejima and Nishizawa: The Birth of Tokyo Minimalism' },
        paragraphs: {
          zh: [
            '妹岛和世1981年从日本女子大学毕业后加入了伊东丰雄事务所。在伊东的指导下，她发展出了一种\u201c轻\u201d的美学——建筑不再是厚重、永恒的纪念碑，而是像半透明窗帘一样飘浮在城市的瞬间。她1987年独立，早期的作品如\u201c平台I\u201d（1988）展示了日本年轻女性建筑师的独特视角：不追求宏大叙事，而是关注日常生活中的微小空间品质。',
            '西泽立卫1990年从横滨国立大学毕业，也加入了妹岛的事务所。两人发现他们在设计理念上的高度契合——都着迷于空间如何溶解、边界如何消失、材料如何在光线下非物质化。1995年，他们共同成立了SANAA。这种合作关系非常独特：不是一位\u201c大师\u201d带一位\u201c学徒\u201d，而是真正的平等共创。他们各自也维持着独立的建筑实践（妹岛有妹岛和世建筑事务所，西泽有西泽立卫建筑事务所），SANAA是所有理念的交汇点。',
            'SANAA的早期国际突破是1999年的\u201c少女城市\u201d（Almere）和2000年的\u201cPrada Beauty\u201d青山店。但真正让他们登上世界舞台的，是2004年竣工的金泽21世纪美术馆。这座建筑的平面是一个直径112.5米的完美圆形，外墙是完全透明的玻璃。内部的展览空间像一个个独立的小房子散布在圆形平面中——参观者不是沿着固定路径游览，而是像在公园里漫步一样自由选择方向。',
          ],
          ja: [
            '妹島和世は1981年日本女子大学卒業後、伊東豊雄事務所に入所。伊東の指導のもと、彼女は「軽さ」の美学を発展させた——建築はもはや重厚で永遠の記念碑ではなく、半透明のカーテンのように都市の瞬間に漂うもの。1987年に独立し、初期作品の「プラットフォームI」（1988）は日本の若い女性建築家の独自の視点を示す——壮大なナラティブを追求せず、日常生活の微細な空間の質に注目する。',
            '西沢立衛は1990年横浜国立大学を卒業後、妹島の事務所に入所。二人はデザイン理念の高度な一致を発見した——共に、空間がいかに溶解するか、境界がいかに消失するか、素材がいかに光のもとで非物質化するかに魅了されていた。1995年、二人は共同でSANAAを設立。この協力関係は極めてユニークである——「巨匠」が「弟子」を指導するのではなく、真の平等な共創。それぞれが独立した建築実践も維持しており（妹島は妹島和世建築事務所、西沢は西沢立衛建築設計事務所）、SANAAはすべての理念の交差点である。',
            'SANAAの初期の国際的ブレイクスルーは1999年の「少女都市」（アルメレ）と2000年の「プラダ·ビューティ」青山店。しかし彼らを真に世界の舞台に押し上げたのは、2004年竣工の金沢21世紀美術館である。この建物の平面は直径112.5メートルの完全な円形で、外壁は完全透明のガラス。内部の展示空間は独立した小さな家のように円形平面のなかに散在し——来館者は固定された経路で回遊するのではなく、公園を散歩するように自由に方向を選ぶ。',
          ],
          en: [
            'Kazuyo Sejima joined Toyo Ito\u2019s office after graduating from Japan Women\u2019s University in 1981. Under Ito\u2019s guidance, she developed an aesthetics of \u201clightness\u201d \u2014 architecture is no longer a heavy, eternal monument but something that floats in the city\u2019s moment like a translucent curtain. She became independent in 1987; early works like \u201cPlatform I\u201d (1988) demonstrated the unique perspective of a young Japanese female architect: not pursuing grand narratives but attending to the subtle spatial qualities of everyday life.',
            'Ryue Nishizawa graduated from Yokohama National University in 1990 and joined Sejima\u2019s office. The two discovered a high degree of alignment in their design philosophy \u2014 both were fascinated by how space dissolves, how boundaries disappear, how materials dematerialize under light. In 1995, they co-founded SANAA. This collaborative relationship is remarkably unique: not one \u201cmaster\u201d guiding one \u201capprentice,\u201d but truly equal co-creation. Each also maintains an independent architectural practice (Sejima has Kazuyo Sejima & Associates, Nishizawa has Office of Ryue Nishizawa), with SANAA as the intersection of all their ideas.',
            'SANAA\u2019s early international breakthroughs were the \u201cCity of Girls\u201d in Almere (1999) and the Prada Beauty Aoyama store (2000). But what truly launched them onto the world stage was the 21st Century Museum of Contemporary Art, Kanazawa, completed in 2004. The building\u2019s plan is a perfect circle of 112.5 meters in diameter, with completely transparent glass exterior walls. Inside, the exhibition spaces are scattered like independent little houses within the circular plan — visitors do not follow a fixed path but choose their direction freely, as if strolling through a park.',
          ],
        },
      },
      {
        title: { zh: '劳力士学习中心：一座建筑即一个景观', ja: 'ロレックス·ラーニング·センター——建築がすなわち景観', en: 'Rolex Learning Center: A Building as a Landscape' },
        paragraphs: {
          zh: [
            '劳力士学习中心（2010）位于瑞士洛桑联邦理工学院（EPFL）校园内，是SANAA在最大尺度上实现其理念的作品。这个建筑没有内墙——20,000平方米的连续空间被一个起伏的混凝土板覆盖，地面的波浪形成了庭院、缓坡、凹陷和抬升。人不是在建筑内行走，而是在建筑的地形上游走——有些地方地面隆起变为休息区，有些地方下沉成为安静的阅读角落。',
            '这个\u201c无墙\u201d的奇迹是如何实现的？建筑由两个巨大的预应力混凝土拱壳构成（上层和下层），在14个点上接触地面。这14个支点需要极其精确的荷载计算——拱壳的厚度只有60厘米，在20米跨度上悬挑。SANAA与结构工程师SAPS（佐佐木睦朗）合作，将设计推向了材料和数学的极限。光线从拱壳下的曲面扩散进入内部，室内既看不到柱子也看不到墙壁——只有人、倾斜的地面和透明玻璃。',
            '劳力士学习中心是图书馆，也是社交空间、教室、咖啡馆和景观。它拒绝将建筑功能分区——你看书的同一个缓坡上，可能有学生正在吃午餐、有人正躺在草地上晒太阳。这种\u201c功能的漂浮\u201d是SANAA的空间政治：不是设计一种专制性的空间使用方式，而是提供一个足够柔和的背景，让人们自己发明空间的使用方式。建筑退场了，让位给了生活本身。',
          ],
          ja: [
            'ロレックス·ラーニング·センター（2010）はスイス連邦工科大学ローザンヌ校（EPFL）のキャンパス内に位置し、SANAAが最大スケールでその理念を実現した作品である。この建物に内壁はない——20,000平方メートルの連続空間が起伏するコンクリート·スラブで覆われ、地面の波が中庭、緩やかな坂、くぼみ、隆起を形成する。人は建物のなかを「歩く」のではなく、建築の地形の上を「さまよう」——ある場所では地面が盛り上がって休憩エリアとなり、別の場所では沈み込んで静かな読書コーナーとなる。',
            'この「壁なし」の奇跡はどのように実現されたのか？ 建物は二枚の巨大なプレストレスト·コンクリート·アーチ·シェル（上層と下層）で構成され、14点で地面に接している。この14の支点には極めて精密な荷重計算が必要だった——アーチ·シェルの厚さはわずか60cmで、20メートルのスパンでキャンティレバーする。SANAAは構造エンジニアのSAPS（佐々木睦朗）と協働し、デザインを材料と数学の限界まで推し進めた。光はアーチ·シェルの下から曲面に沿って拡散し、室内には柱も壁も見えない——ただ人と、傾斜する地面と、透明ガラスのみ。',
            'ロレックス·ラーニング·センターは図書館であり、社交空間であり、教室であり、カフェであり、景観である。それは建築の機能をゾーニングすることを拒否する——あなたが本を読んでいる同じ緩斜面で、学生が昼食をとっているかもしれず、誰かが芝生に寝転んで日光浴をしているかもしれない。この「機能の浮遊」こそがSANAAの空間政治である——専制的な空間の使い方を設計するのではなく、人々が自ら空間の使い方を発明できるような、十分に柔らかな背景を提供すること。建築は退場し、生そのものに席を譲る。',
          ],
          en: [
            'The Rolex Learning Center (2010), located on the EPFL campus in Lausanne, Switzerland, is the work in which SANAA realized its philosophy at the largest scale. This building has no interior walls \u2014 20,000 square meters of continuous space are covered by an undulating concrete slab, whose ground waves form courtyards, gentle slopes, depressions, and rises. One does not \u201cwalk\u201d inside the building but \u201cwanders\u201d over its topography \u2014 in some places the ground swells into a lounge area, in others it sinks into a quiet reading nook.',
            'How was this \u201cwall-less\u201d miracle achieved? The building consists of two enormous prestressed concrete arch shells (upper and lower), touching the ground at 14 points. These 14 support points required extremely precise load calculations \u2014 the arch shells are only 60 cm thick, cantilevering over spans of 20 meters. SANAA collaborated with structural engineer Mutsuro Sasaki (SAPS) to push the design to the limits of material and mathematics. Light diffuses from beneath the arch shells along the curved surfaces; inside, neither columns nor walls are visible \u2014 only people, the sloping ground, and transparent glass.',
            'The Rolex Learning Center is a library, social space, classroom, café, and landscape all at once. It refuses to zone architectural functions \u2014 on the same gentle slope where you are reading, a student might be eating lunch, and someone else might be lying on the grass sunbathing. This \u201cfloating of function\u201d is SANAA\u2019s spatial politics: not designing a dictatorial mode of using space, but providing a background gentle enough that people can invent their own ways of using space. Architecture steps aside, ceding place to life itself.',
          ],
        },
      },
      {
        title: { zh: '\u201c白的能量\u201d与日本当代建筑的新方向', ja: '「白のエネルギー」と日本現代建築の新たな方向', en: 'The Energy of White and New Directions in Japanese Contemporary Architecture' },
        paragraphs: {
          zh: [
            'SANAA的白色不是一种颜色选择，而是一种哲学立场。在过度饱和的视觉文化中——广告牌、屏幕、艳丽的消费空间——白色不是\u201c空无一物\u201d，而是\u201c让注意力回归\u201d。妹岛曾说，她在设计中使用白色，是因为白色可以让光影的变化本身成为空间的主角——在白色表面上，上午的光和下午的光是不同的颜色，阴天的光和晴天的光是不同的温度。建筑在不断变化的光线中拥有了时间维度。',
            'SANAA的建筑与他们的导师伊东丰雄一脉相承但又截然不同。伊东的建筑更\u201c液态\u201d——形式的流动和连续变形是他的签名。而SANAA更\u201c扁平\u201d——他们的形式更接近日本美学中的\u201c间\u201d（Ma）概念：不是物体本身，而是物体之间的空隙和间隙才是意义所在。在金泽美术馆中，意义不在于那些白色的圆形展厅，而在于展厅之间那些无法定义的、让阳光洒落的\u201c之间\u201d区域。',
            '2010年普利兹克奖的获奖评语写道：\u201cSANAA的建筑与周围环境同时进行着溶解与共生。\u201d他们的作品影响了一批更年轻的建筑师——如石上纯也和藤本壮介——形成了日本当代建筑的\u201c轻量化\u201d谱系。在气候危机和资源紧缩的时代，SANAA的建筑提供了一种具有远见的范式：不是建造更多，而是建造更少；不是占据空间，而是释放空间；不是争当主角，而是成为背景。',
          ],
          ja: [
            'SANAAの白は色彩の選択ではなく、哲学的立場である。過剰に飽和した視覚文化——看板、スクリーン、けばけばしい消費空間——のなかで、白は「何もない」ことではなく、「注意を呼び戻す」ことである。妹島はかつて、デザインに白を使うのは、白によって光と影の変化そのものが空間の主役になれるからだと語った——白い表面の上では、午前の光と午後の光は異なる色であり、曇りの日の光と晴れの日の光は異なる温度である。建築は絶えず変化する光のなかで時間の次元を獲得する。',
            'SANAAの建築は師である伊東豊雄と一脈相通じながらも決定的に異なる。伊東の建築はより「液体的」——形態の流動と連続的変形が彼の署名である。それに対しSANAAはより「フラット」——彼らの形式は日本美学の「間」の概念により近い。物体そのものではなく、物体と物体のあいだの空隙や隙間こそが意味の所在なのである。金沢美術館において、意味はそれらの白い円形展示室にあるのではなく、展示室のあいだの、定義不可能で、陽光が降り注ぐ「あいだ」の領域にある。',
            '2010年プリツカー賞の受賞評はこう述べている——「SANAAの建築は周囲の環境と同時に溶解し共生している」。彼らの作品は石上純也や藤本壮介といったより若い建築家たちに影響を与え、日本現代建築の「軽量化」の系譜を形成した。気候危機と資源逼迫の時代にあって、SANAAの建築は先見的なパラダイムを提供する——より多くを建設するのではなく、より少なく建設すること。空間を占有するのではなく、空間を解放すること。主役を争うのではなく、背景となること。',
          ],
          en: [
            'SANAA\u2019s white is not a color choice but a philosophical stance. In an oversaturated visual culture \u2014 billboards, screens, garish consumer spaces \u2014 white is not \u201cnothingness\u201d but \u201cbringing attention back.\u201d Sejima has said that she uses white in design because white allows the changes of light and shadow themselves to become the protagonist of the space \u2014 on a white surface, morning light and afternoon light are different colors, cloudy-day light and sunny-day light are different temperatures. Architecture acquires a temporal dimension in ever-changing light.',
            'SANAA\u2019s architecture shares lineage with their mentor Toyo Ito but is decisively different. Ito\u2019s architecture is more \u201cliquid\u201d \u2014 the flow and continuous deformation of form is his signature. SANAA, by contrast, is more \u201cflat\u201d \u2014 their form is closer to the Japanese aesthetic concept of Ma: it is not the objects themselves but the voids and intervals between them that carry meaning. In the Kanazawa Museum, meaning lies not in those white circular galleries but in the indefinable \u201cin-between\u201d zones between them, where sunlight falls.',
            'The 2010 Pritzker Prize citation reads: \u201cSANAA\u2019s architecture is simultaneously dissolving into and coexisting with its surroundings.\u201d Their work has influenced a younger generation of architects \u2014 such as Junya Ishigami and Sou Fujimoto \u2014 forming the \u201clightweight\u201d lineage of Japanese contemporary architecture. In an era of climate crisis and resource scarcity, SANAA\u2019s architecture offers a visionary paradigm: not building more but building less; not occupying space but liberating space; not competing to be the protagonist but becoming the background.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'kanazawa-museum', note: { zh: '完美的圆形平面，透明的玻璃幕墙，展室如公园中的凉亭自由散布——建筑变成了公园。', ja: '完璧な円形平面、透明なガラスのカーテンウォール、展示室が公園のなかのパビリオンのように自由に散在——建築が公園に変わる。', en: 'A perfect circular plan, transparent glass curtain wall, exhibition rooms freely scattered like pavilions in a park — architecture becomes a park.' } },
      { slug: 'rolex-learning-center', note: { zh: '无内墙的连续起伏地面，建筑作为景观——人在建筑的地形上漫游而非在房间之间穿行。', ja: '内壁なき連続起伏床、景観としての建築——人は部屋のあいだを移動するのではなく、建築の地形の上をさまよう。', en: 'Continuously undulating ground with no interior walls, architecture as landscape — one wanders over the building\u2019s topography rather than moving between rooms.' } },
      { slug: 'new-museum-nyc', note: { zh: '七层堆叠的白色盒子如摇摇欲坠的积木，曼哈顿Bowery区的一线白光，当代艺术的新圣殿。', ja: '七層に積み上げられた白い箱が今にも崩れそうな積み木のように、マンハッタン·バワリー地区の一筋の白光、現代美術の新たな聖殿。', en: 'Seven stacked white boxes like precariously balanced blocks, a sliver of white light on Manhattan\u2019s Bowery, a new sanctuary for contemporary art.' } },
    ],
    sources: [
      { title: 'SANAA \u2014 Pritzker Prize', url: 'https://www.pritzkerprize.com/laureates/2010' },
      { title: 'SANAA \u2014 Official Website', url: 'https://www.sanaa.co.jp/' },
      { title: 'Wikidata: SANAA', url: 'https://www.wikidata.org/wiki/Q267408' },
    ],
  },

  'richard-neutra': {
    slug: 'richard-neutra',
    summary: {
      zh: '奥地利出生的美国现代主义建筑师，将欧洲国际风格带入南加州，以轻盈的钢结构、悬挑平面和室内外空间的流动融合著称。',
      ja: 'オーストリア生まれのアメリカ人モダニズム建築家。ヨーロッパの国際様式を南カリフォルニアにもたらし、軽量鉄骨構造、キャンティレバー平面、室内外空間の流動的融合で知られる。',
      en: 'Austrian-born American modernist architect who brought European International Style to Southern California, known for lightweight steel framing, cantilevered planes, and fluid integration of indoor and outdoor space.',
    },
    core_ideas: {
      zh: [
        '生物现实主义（Biorealism）：建筑应满足居住者的生理和心理需求，设计根植于对人类感官体验的科学理解。',
        '室内外连续性：大面玻璃、滑动门和悬挑楼板消解建筑边界，将花园、风景和阳光引入室内。',
        '骨架结构：使用细钢柱和轻质框架取代承重墙，实现自由平面和灵活空间。',
        '蜘蛛腿（Spider Legs）悬挑：极细的钢柱支撑深远出挑，使建筑看似漂浮于地面之上。',
        '以客户为中心的定制设计：每一栋住宅都围绕具体客户的生活习惯、需求和场地条件精心量身打造。',
      ],
      ja: [
        'バイオリアリズム（Biorealism）：建築は居住者の生理的・心理的ニーズを満たすべきであり、設計は人間の感覚体験の科学的理解に根差す。',
        '室内外の連続性：大きなガラス面、引き戸、キャンティレバー床が建築の境界を溶解し、庭、風景、陽光を室内に取り込む。',
        '骨格構造：耐力壁に代わる細い鋼柱と軽量フレームにより、自由平面と柔軟な空間を実現。',
        'スパイダーレッグ（Spider Legs）キャンティレバー：極細の鋼柱が深い張り出しを支え、建築が地面の上に浮遊しているように見える。',
        'クライアント中心のカスタムデザイン：各住宅は、具体的なクライアントの生活習慣、ニーズ、敷地条件に合わせて丹念に作り込まれている。',
      ],
      en: [
        'Biorealism: Architecture should satisfy the physiological and psychological needs of occupants, with design rooted in a scientific understanding of human sensory experience.',
        'Indoor-outdoor continuity: Large expanses of glass, sliding doors, and cantilevered floor slabs dissolve the boundary of the building, bringing garden, landscape, and sunlight inside.',
        'Skeleton framing: Slender steel columns and lightweight frames replace load-bearing walls, enabling free plan and flexible space.',
        '"Spider Legs" cantilevers: Extremely thin steel columns support deep overhangs, making the architecture appear to float above the ground.',
        'Client-centered custom design: Each house is meticulously tailored to the specific client\u2019s living habits, needs, and site conditions.',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Richard_Neutra_1935.jpg',
      author: 'Unknown',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Richard_Neutra_1935.jpg',
      alt: { zh: 'Richard Neutra 肖像，1935年', ja: 'リチャード・ノイトラの肖像、1935年', en: 'Portrait of Richard Neutra, 1935' },
    },
    sections: [
      {
        title: { zh: '从维也纳到南加州：一颗欧洲现代主义种子在沙漠中生根', ja: 'ウィーンから南カリフォルニアへ——ヨーロッパ·モダニズムの種が砂漠に根を下ろす', en: 'From Vienna to Southern California: A European Modernist Seed Takes Root in the Desert' },
        paragraphs: {
          zh: [
            'Richard Neutra（1892\u20131970）生于维也纳一个犹太家庭，一战的阴影和奥匈帝国的崩溃塑造了他对现代世界的最初认知。在维也纳工业大学师从Adolf Loos期间，他吸收了Loos关于装饰即罪恶的激进思想，也接触到Otto Wagner的现代城市理念。然而真正改变他人生轨迹的，是1923年移居美国后与Frank Lloyd Wright的相遇——他在Taliesin短暂工作，吸收了赖特关于建筑与景观融合的理念，但他不满足于赖特的浪漫主义有机观，而是寻求一种更精确、更科学的现代性表达。',
            '1925年Neutra迁居洛杉矶，这片阳光充沛、气候温和、文化开放的土地为他提供了理想的实验场。他很快成为南加州现代主义住宅运动的核心人物。他的第一座重要建筑Lovell Health House（1929）是美国最早采用全钢框架的住宅之一，也是国际风格在美国落地的里程碑。这座建筑的轻质钢骨架、悬挑阳台和连续玻璃带在当时极为激进，相当于将欧洲先锋派的工业美学注入了加州休闲生活的方式。',
            'Neutra的建筑哲学核心是\u201c生物现实主义\u201d——他相信好的建筑应当如同有机体适应其环境一样，精确地服务于人类感官、生理和情感的完整需求。他不是在建造抽象的几何体，而是在创造\u201c为人类神经系统而设计的容器\u201d。这种跨学科思维使他与心理学家、医生频繁合作，将建筑设计提升到环境健康学的高度。在他漫长的职业生涯中，他设计了300余座建筑，其中大多数是独栋住宅，每一座都是对一个具体家庭生活方式的深入剖析。',
          ],
          ja: [
            'リチャード·ノイトラ（1892\u20131970）はウィーンのユダヤ系家庭に生まれ、第一次世界大戦の影とオーストリア＝ハンガリー帝国の崩壊が、彼の近代世界に対する最初の認識を形成した。ウィーン工科大学でアドルフ·ロースに師事するなかで、装飾は罪悪であるとするロースの急進的思想を吸収し、またオットー·ワーグナーの近代都市理念にも触れた。しかし彼の人生の軌道を真に変えたのは、1923年のアメリカ移住後にフランク·ロイド·ライトと出会ったことだった——タリアセンで短期間働き、建築と景観の融合というライトの理念を吸収したが、ノイトラはライトのロマン主義的な有機観に満足せず、より精確で科学的なモダニティの表現を追求した。',
            '1925年、ノイトラはロサンゼルスに移り住んだ。陽光が豊かで気候が穏やか、文化的にも開かれたこの土地は、彼に理想的な実験場を提供した。彼はたちまち南カリフォルニア·モダニズム住宅運動の中心人物となった。最初の重要な建築であるLovell Health House（1929）は、アメリカにおける全鉄骨造住宅の先駆的事例の一つであり、国際様式のアメリカ上陸を告げる里程標でもあった。この建築の軽量鉄骨骨格、キャンティレバーによるバルコニー、連続するガラス帯は当時きわめて急進的で、ヨーロッパ前衛派の工業美学をカリフォルニアの余暇生活様式に注入することに等しかった。',
            'ノイトラの建築哲学の中核は「バイオリアリズム」である——彼は優れた建築は有機体が環境に適応するように、人間の感覚、生理、感情の総体的なニーズに精密に奉仕すべきだと信じた。彼は抽象的な幾何学体を建設するのではなく、「人間の神経系のために設計された容器」を創造していた。この学際的思考により、心理学者や医師と頻繁に協働し、建築設計を環境健康学の域にまで高めた。彼の長いキャリアのなかで300以上の建築を設計し、その大半は戸建住宅であり、一つひとつが具体的な家族の生活様式への深い分析であった。',
          ],
          en: [
            'Richard Neutra (1892\u20131970) was born into a Jewish family in Vienna, where the shadow of World War I and the collapse of the Austro-Hungarian Empire shaped his earliest perception of the modern world. At the Vienna University of Technology, studying under Adolf Loos, he absorbed Loos\u2019s radical idea that ornament is crime, and was also exposed to Otto Wagner\u2019s modern urban concepts. But what truly altered the trajectory of his life was his encounter with Frank Lloyd Wright after emigrating to America in 1923 \u2014 he briefly worked at Taliesin, absorbing Wright\u2019s ideas about integrating architecture with landscape, but he was not satisfied with Wright\u2019s romantic organicism and sought a more precise, scientific expression of modernity.',
            'In 1925 Neutra moved to Los Angeles, where abundant sunshine, a mild climate, and an open culture provided an ideal testing ground. He quickly became a central figure in the Southern California modernist residential movement. His first major building, the Lovell Health House (1929), was among the first fully steel-framed residences in the United States and a milestone in the arrival of the International Style on American soil. The building\u2019s lightweight steel skeleton, cantilevered balconies, and continuous bands of glass were extremely radical at the time \u2014 tantamount to infusing the industrial aesthetics of the European avant-garde into the California lifestyle of leisure.',
            'The core of Neutra\u2019s architectural philosophy is \u201cbiorealism\u201d \u2014 he believed that good architecture should, like an organism adapting to its environment, precisely serve the complete sensory, physiological, and emotional needs of human beings. He was not building abstract geometric volumes but creating \u201ccontainers designed for the human nervous system.\u201d This transdisciplinary thinking led him to collaborate frequently with psychologists and physicians, elevating architectural design to the level of environmental health science. Over his long career, he designed more than 300 buildings, most of them single-family houses, each one a deep analysis of a specific family\u2019s way of living.',
          ],
        },
      },
      {
        title: { zh: 'Kaufmann Desert House：沙漠中的玻璃亭阁', ja: 'カウフマン砂漠の家——砂漠のなかのガラスのパヴィリオン', en: 'Kaufmann Desert House: A Glass Pavilion in the Desert' },
        paragraphs: {
          zh: [
            '如果说Lovell Health House确立了Neutra的声誉，那么1946年的Kaufmann Desert House则将他推向了巅峰。这座为百货业巨头Edgar Kaufmann Sr.设计的度假住宅坐落于棕榈泉附近的沙漠中，以十字形平面、大片玻璃幕墙和极为纤细的钢柱支撑的悬挑屋盖著称。很难想象这是一座建于1946年的建筑——其工业精确度和审美纯粹性在今天看来仍然超前。',
            'Desert House体现的是室内外完全连续的理想：每一间主要房间都由通高玻璃墙面向沙漠或庭院敞开。滑动玻璃门消失在墙壁中，使起居室与泳池甲板融为一体。Neutra的\u201c蜘蛛腿\u201d在这里发挥到极致——支撑深远悬挑的钢柱细到几乎消失，让巨大的平屋顶仿佛悬停在空气中。这种反重力的轻盈感在沙漠的强烈日光下变得超现实——一座漂浮在岩石和仙人掌之间的玻璃亭阁。',
            '在沙漠环境中，Desert House还是一个精确的气候调节器：深远的悬挑屋顶在夏天阻挡烈日直射，而冬日低角度的阳光则可以穿透玻璃深入室内。游泳池不仅用于娱乐，更是一个被动冷却系统——当沙漠风吹过水面，携带着凉意穿过起居空间。这是一个机器、有机体和景观的三位一体。1970年代Desert House曾一度荒废，经历了多次转手，直到1990年代才由Marmol Radziner事务所精心修复，恢复至原始设计的精确状态。',
          ],
          ja: [
            'Lovell Health Houseがノイトラの名声を確立したとすれば、1946年のカウフマン砂漠の家は彼を頂点へと押し上げた。百貨店王エドガー·カウフマン·シニアのために設計されたこの別荘は、パームスプリングス近郊の砂漠のなかに位置し、十字形平面、大面積のガラスカーテンウォール、極細の鋼柱で支えられたキャンティレバー屋根で知られる。これが1946年に建てられたとは信じがたい——その工業的精確性と審美的純粋性は今日の目から見てもなお前衛的である。',
            'Desert Houseが体現するのは、室内外の完全な連続性という理念である。主要な各部屋はすべて、天井までのガラス壁が砂漠または中庭に向けて開かれている。引き込み戸は壁のなかに消え、居間はプールデッキと一体化する。ノイトラの「スパイダーレッグ」はここで極致に達する——深い張り出しを支える鋼柱はあまりに細く、ほとんど消えてしまい、巨大な平らな屋根が空気のなかに浮遊しているかのようだ。この反重力的な軽やかさは砂漠の強烈な陽光の下で超現実的となる——岩とサボテンのあいだに浮かぶガラスのパヴィリオン。',
            '砂漠環境において、Desert Houseは精確な気候調節器でもある。深い張り出し屋根は夏には直射日光を遮り、冬の低角度の陽光はガラスを通して室内深くまで差し込む。プールは娯楽のためだけでなく、受動的冷却システムとしても機能する——砂漠の風が水面を渡り、涼気を帯びて居住空間を通過する。これは機械、有機体、景観の三位一体である。1970年代、Desert Houseは一時荒廃し、所有者を転々とした後、1990年代になってMarmol Radziner事務所により丹念に修復され、元の設計の精確な状態が取り戻された。',
          ],
          en: [
            'If the Lovell Health House established Neutra\u2019s reputation, the 1946 Kaufmann Desert House propelled him to the summit. Designed as a vacation residence for department store magnate Edgar Kaufmann Sr. and located in the desert near Palm Springs, it is known for its cruciform plan, large expanses of glass curtain wall, and cantilevered roof supported by extremely slender steel columns. It is hard to believe this was built in 1946 \u2014 its industrial precision and aesthetic purity still seem futuristic today.',
            'What Desert House embodies is the ideal of complete indoor-outdoor continuity: every major room opens through floor-to-ceiling glass walls onto the desert or courtyard. Sliding glass doors disappear into the walls, merging the living room with the pool deck. Neutra\u2019s \u201cspider legs\u201d are taken to their extreme here \u2014 the steel columns supporting the deep overhangs are so thin they nearly vanish, making the vast flat roof appear to hover in midair. This anti-gravity lightness becomes surreal under the intense desert sunlight \u2014 a glass pavilion floating among rock and cactus.',
            'In the desert environment, Desert House is also a precise climate modulator: deep roof overhangs block direct summer sun, while low-angle winter sunlight penetrates deeply through the glass. The pool is not only for recreation but functions as a passive cooling system \u2014 as the desert wind passes over the water surface, it carries coolness through the living spaces. This is a trinity of machine, organism, and landscape. Desert House fell into disrepair in the 1970s and passed through multiple owners before being meticulously restored in the 1990s by the firm Marmol Radziner to the exacting precision of the original design.',
          ],
        },
      },
      {
        title: { zh: '现代主义作为疗愈工具：建筑即医疗', ja: '癒しの手段としてのモダニズム——医療としての建築', en: 'Modernism as Therapy: Architecture as Medicine' },
        paragraphs: {
          zh: [
            'Neutra对现代主义最独特的贡献，是将建筑理解为一种治疗环境。他大量阅读神经科学和行为心理学的研究成果，坚信空间设计直接影响人体的内分泌系统和自主神经系统。他在《Survival Through Design》（1954）一书中写道：\u201c设计师的首要责任是保护人类神经系统免受过度刺激的伤害，同时提供恰到好处的感官滋养。\u201d这种观点在当时激进，在今天则被环境心理学和神经建筑学所证实。',
            'Neutra设计的学校建筑——如Corona Avenue School（1935）和Emerson Middle School（1938）——采用了巨大的推拉玻璃墙、绿化庭院和蒸汽辐射采暖地板，旨在创造一个减少焦虑、提升专注力的学习环境。这在今天看来是基础教育建筑的常识，但在1930年代，大多数教室是没有窗户的封闭盒子。Neutra和他的医生朋友们甚至测量过学生在不同光照条件下的心率变化，以科学地论证设计决策。',
            '这种\u201c以人为中心的科学现代主义\u201d是Neutra区别于其同时代纯粹形式主义者（如Philip Johnson或早期Mies）的关键。对Neutra而言，现代主义不是一种风格，而是一种改善人类生存质量的工具。他的建筑不是要让人惊叹，而是要让人放松；不是纪念碑式的宣言，而是精密的生物医学仪器。这使得他的作品即使在今天也保持着惊人的新鲜感——因为我们的身体和神经系统并未改变，而他的建筑仍然在为这些永恒的需求而工作。',
          ],
          ja: [
            'ノイトラのモダニズムへの最もユニークな貢献は、建築を治療環境として理解したことにある。彼は神経科学や行動心理学の研究成果を大量に渉猟し、空間デザインが直接的に内分泌系や自律神経系に影響を与えると信じた。彼は『Survival Through Design』（1954）のなかで次のように書いた——「デザイナーの第一の責任は、過剰な刺激から人間の神経系を守りつつ、適切な感覚的滋養を提供することである」。この見解は当時急進的だったが、今日では環境心理学と神経建築学によって実証されている。',
            'ノイトラが設計した学校建築——Corona Avenue School（1935）やEmerson Middle School（1938）など——は、巨大な引き戸ガラス壁、緑化された中庭、温水輻射暖房床を採用し、不安を軽減し集中力を高める学習環境を創り出すことを目指した。これは今日、基礎教育建築の常識に思えるが、1930年代にはほとんどの教室は窓のない閉鎖的な箱だった。ノイトラと彼の医師の友人たちは、異なる光条件下での生徒の心拍数の変化まで測定し、設計判断を科学的に論証した。',
            'この「人間中心の科学的モダニズム」こそが、ノイトラを同時代の純粋形式主義者——フィリップ·ジョンソンや初期ミース——から区別する鍵である。ノイトラにとってモダニズムはスタイルではなく、人間の生存の質を改善するための道具だった。彼の建築は人を驚嘆させるためではなく、リラックスさせるためであり、モニュメンタルな宣言ではなく、精確な生体医療機器である。このことが、彼の作品が今日でも驚くほど新鮮である理由だ——私たちの身体と神経系は変わっておらず、彼の建築は今もそれらの不変のニーズのために働き続けているからだ。',
          ],
          en: [
            'Neutra\u2019s most unique contribution to modernism is understanding architecture as a therapeutic environment. He voraciously read research in neuroscience and behavioral psychology, convinced that spatial design directly affects the endocrine system and autonomic nervous system. In his book Survival Through Design (1954), he wrote: \u201cThe designer\u2019s primary responsibility is to protect the human nervous system from excessive stimulation while providing just the right amount of sensory nourishment.\u201d This view, radical at the time, is today corroborated by environmental psychology and neuroarchitecture.',
            'Neutra\u2019s school buildings \u2014 such as Corona Avenue School (1935) and Emerson Middle School (1938) \u2014 employed enormous sliding glass walls, landscaped courtyards, and hydronic radiant-heated floors, aiming to create a learning environment that reduced anxiety and enhanced concentration. This seems like common sense for elementary school architecture today, but in the 1930s most classrooms were windowless sealed boxes. Neutra and his physician friends even measured students\u2019 heart rate variations under different lighting conditions to scientifically justify design decisions.',
            'This \u201chuman-centered scientific modernism\u201d is the key that distinguishes Neutra from his purely formalist contemporaries \u2014 like Philip Johnson or the early Mies. For Neutra, modernism was not a style but a tool for improving the quality of human existence. His architecture was not meant to astonish but to relax; not a monumental declaration but a precise biomedical instrument. This is why his work retains astonishing freshness today \u2014 because our bodies and nervous systems have not changed, and his architecture is still working for those timeless needs.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'kaufmann-desert-house', note: { zh: '沙漠中的玻璃亭阁，十字形平面和漂浮屋顶的极致表达，现代主义度假住宅的范本。', ja: '砂漠のなかのガラスのパヴィリオン。十字形平面と浮遊する屋根の究極的表現、モダニズム別荘の手本。', en: 'A glass pavilion in the desert, the ultimate expression of cruciform plan and floating roof, the paradigm of the modernist vacation house.' } },
      { slug: 'neutra-vdl-studio-and-residences', note: { zh: 'Neutra的自家住宅兼工作室，两度焚毁两度重建，浓缩了他一生设计思想演变的活体实验。', ja: 'ノイトラの自邸兼スタジオ。二度の火災と二度の再建を経た、彼の生涯の設計思想の変遷を凝縮する生きた実験。', en: 'Neutra\u2019s own home and studio, twice burned down and twice rebuilt, a living experiment condensing the evolution of his lifelong design thinking.' } },
      { slug: 'tremaine-house', note: { zh: '悬挑的白色盒子浮于缓坡草地之上，玻璃走廊连接两个体量——室内外边界的彻底消融。', ja: 'キャンティレバーの白い箱がなだらかな芝生の斜面の上に浮かび、ガラスの廊下が二つのボリュームをつなぐ——室内外境界の徹底的な溶解。', en: 'Cantilevered white boxes floating above a gently sloping lawn, with a glass corridor connecting two volumes \u2014 the complete dissolution of the indoor-outdoor boundary.' } },
    ],
    sources: [
      { title: 'Neutra VDL Studio and Residences Official Site', url: 'https://www.neutra-vdl.org/' },
      { title: 'Kaufmann Desert House \u2014 Wikipedia', url: 'https://en.wikipedia.org/wiki/Kaufmann_Desert_House' },
      { title: 'Wikidata: Richard Neutra', url: 'https://www.wikidata.org/wiki/Q84312' },
    ],
  },

  'marcel-breuer': {
    slug: 'marcel-breuer',
    summary: {
      zh: '匈牙利出生的现代主义建筑师与家具设计师，包豪斯大师，将钢管家具和粗野主义的雕塑性混凝土形式带入20世纪建筑主流。',
      ja: 'ハンガリー生まれのモダニズム建築家·家具デザイナー。バウハウスの巨匠であり、スチールパイプ家具とブルータリズムの彫刻的コンクリート造形を20世紀建築の主流にもたらした。',
      en: 'Hungarian-born modernist architect and furniture designer, a Bauhaus master who brought tubular steel furniture and Brutalist sculptural concrete forms into the mainstream of 20th-century architecture.',
    },
    core_ideas: {
      zh: [
        '材料诚实性：从Wassily Club Chair的钢管框架到混凝土的粗犷肌理，材料以其本真状态呈现。',
        '雕塑性的结构表达：混凝土不只是结构材料，更是可塑性极强的造型材料，建筑本身就是大型抽象雕塑。',
        '双重尺度：建筑在城市尺度上是强有力的体量宣言，在近人尺度上则通过温暖的木材和精细节点呈现人性关怀。',
        '模块化与标准化：在家具和建筑中追求模块化系统，实现灵活性和批量生产的优雅平衡。',
        '包豪斯精神：跨越家具、建筑、室内设计的界限，将工业美学注入一切人造物。',
      ],
      ja: [
        '素材の誠実さ：ヴァシリー·クラブチェアのスチールパイプフレームからコンクリートの粗いテクスチャまで、素材は本真の状態で提示される。',
        '彫刻的構造表現：コンクリートは単なる構造材ではなく、可塑性にきわめて富む造形材であり、建築自体が巨大な抽象彫刻である。',
        '二重スケール：建築は都市スケールでは力強いマスの宣言であり、人間スケールでは温かな木材と精緻なディテールによる人間性の表出。',
        'モジュール化と標準化：家具と建築においてモジュールシステムを追求し、柔軟性と量産の優雅なバランスを実現。',
        'バウハウス精神：家具、建築、インテリアの境界を越え、工業美学をあらゆる人工物に注入する。',
      ],
      en: [
        'Material honesty: From the tubular steel frame of the Wassily Club Chair to the rugged texture of concrete, materials are presented in their authentic state.',
        'Sculptural structural expression: Concrete is not merely a structural material but an extremely plastic sculpting material; the building itself is a large abstract sculpture.',
        'Dual scale: At the urban scale architecture is a powerful mass declaration; at the human scale it exhibits humanity through warm wood and refined detailing.',
        'Modularity and standardization: A pursuit of modular systems in both furniture and architecture, achieving an elegant balance of flexibility and mass production.',
        'Bauhaus spirit: Transcending the boundaries between furniture, architecture, and interior design, infusing industrial aesthetics into all human-made objects.',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Marcel_Breuer.jpg',
      author: 'Unknown',
      license: 'Public Domain',
      source_url: 'https://commons.wikimedia.org/wiki/File:Marcel_Breuer.jpg',
      alt: { zh: 'Marcel Breuer 肖像', ja: 'マルセル・ブロイヤーの肖像', en: 'Portrait of Marcel Breuer' },
    },
    sections: [
      {
        title: { zh: '从钢管到混凝土：包豪斯全才的蜕变之路', ja: 'スチールパイプからコンクリートへ——バウハウス全能者の変貌', en: 'From Tubular Steel to Concrete: The Metamorphosis of a Bauhaus Polymath' },
        paragraphs: {
          zh: [
            'Marcel Breuer（1902\u20131981）的人生起点极为戏剧化：18岁的他获得维也纳美术学院的奖学金，但仅几周后就退学了，因为他发现那是一个保守的体制。他转而去了一家木匠作坊工作，随后直接申请包豪斯——在那里，他成为Gropius最年轻的学生之一，不久后又成为包豪斯最年轻的\u201c大师\u201d之一，负责管理家具工作室。这种反叛体制、亲自动手的精神贯穿了他的一生。',
            'Breuer的第一项世界级成就是家具设计。1925年，年仅23岁的他设计了Wassily Club Chair（最初名为Model B3——以他的首字母得名）。传说灵感来自他自行车的Adler牌钢管车架——那种轻盈、强度和工业美学的结合使他立刻意识到：钢管可以取代弯曲木材成为现代家具的基本语言。Wassily Chair不仅是20世纪最经典的椅子之一，更标志着工业材料正式进入日常生活的美学领域。',
            '然而Breuer并不满足于仅仅成为一个家具设计师。1930年代他将重心转向建筑，先后在Gropius的事务所工作、在哈佛大学任教（他的学生包括Philip Johnson和Paul Rudolph），并开始了自己独立的建筑实践。他的建筑语言经历了一个根本性的转变：从早期受国际风格影响的白墙钢框，逐渐走向雕塑性的、重量感强烈的混凝土形式——这最终使他成为粗野主义最重要的代表人物之一。',
          ],
          ja: [
            'マルセル·ブロイヤー（1902\u20131981）の人生の出発点はきわめて劇的である。18歳でウィーン美術アカデミーの奨学金を得たが、それが保守的な体制であることを見抜くと、わずか数週間で退学した。彼は代わりに家具工房に働きに出て、そのまま包豪斯に直接応募した——そこで彼はグロピウスの最も若い学生の一人となり、ほどなく包豪ス最年少の「マイスター」の一人となって、家具工房を管理した。この体制への反逆と自ら手を動かす精神は、彼の生涯を貫いた。',
            'ブロイヤーの最初の世界的業績は家具デザインである。1925年、わずか23歳にして彼はワシリー·クラブチェア（当初の名称はModel B3——彼のイニシャルに由来）を設計した。伝説によれば、着想源は彼の自転車のアドラー社製スチールパイプフレームだった——その軽さ、強さ、工業美学の結合に、彼は即座に気づいた。スチールパイプは曲げ木材に代わって現代家具の基本言語になりうると。ワシリーチェアは20世紀で最も古典的な椅子の一つであるのみならず、工業材料が日常生活の美学領域に正式に参入したことを告げるものであった。',
            'しかしブロイヤーは単なる家具デザイナーにとどまることをよしとしなかった。1930年代、彼は重心を建築に移し、グロピウスの事務所で働き、ハーバード大学で教鞭を執り（学生にはフィリップ·ジョンソンやポール·ルドルフがいた）、独立した設計活動を開始した。彼の建築言語は根本的な移行を遂げた——初期の国際様式の影響を受けた白壁·鉄骨フレームから、次第に彫刻的で重量感あふれるコンクリート造形へと向かい——これが最終的に彼をブルータリズムのもっとも重要な代表者の一人とした。',
          ],
          en: [
            'The starting point of Marcel Breuer\u2019s life (1902\u20131981) was remarkably dramatic: at 18 he won a scholarship to the Vienna Academy of Fine Arts, but withdrew after just a few weeks upon realizing it was a conservative institution. He went to work in a carpentry workshop instead, then applied directly to the Bauhaus \u2014 where he became one of Gropius\u2019s youngest students and soon one of the Bauhaus\u2019s youngest \u201cMasters,\u201d in charge of the furniture workshop. This spirit of rebelling against institutions and working with his own hands defined his entire life.',
            'Breuer\u2019s first world-class achievement was in furniture design. In 1925, at only 23, he designed the Wassily Club Chair (originally called Model B3, after his initials). The legend goes that the inspiration came from the Adler tubular steel frame of his bicycle \u2014 that combination of lightness, strength, and industrial aesthetics made him immediately realize that tubular steel could replace bent wood as the fundamental language of modern furniture. The Wassily Chair is not only one of the most iconic chairs of the 20th century; it also marked the formal entry of industrial materials into the aesthetic domain of everyday life.',
            'But Breuer was not content to remain merely a furniture designer. In the 1930s he shifted his focus to architecture, working in Gropius\u2019s office, teaching at Harvard (his students included Philip Johnson and Paul Rudolph), and launching his independent architectural practice. His architectural language underwent a fundamental transition: from the white-walled steel frames influenced by the early International Style, he moved progressively toward sculptural, weighty concrete forms \u2014 which ultimately made him one of the most important representatives of Brutalism.',
          ],
        },
      },
      {
        title: { zh: 'Saint John\u2019s Abbey：为上帝建造的混凝土堡垒', ja: 'セント·ジョンズ·アビー——神のために築かれたコンクリートの要塞', en: 'Saint John\u2019s Abbey: A Concrete Fortress for God' },
        paragraphs: {
          zh: [
            '1953年，位于明尼苏达州的圣约翰修道院委托Breuer设计一座新教堂。这对Breuer而言不只是一个建筑项目——作为一个曾在二战期间流亡的犹太人，接受一座本笃会修道院的委托意味着深刻的信任和精神对话。他的回应是一座无与伦比的混凝土杰作：巨大的蜂窝状混凝土立面，由212块预制菱形面板组成，每一块都嵌入了彩色玻璃，将日光分解为万花筒般的神圣光辉。',
            '教堂内部是一个巨大的梯形空间，前宽后窄，将信众视线汇聚于祭坛。自支撑的混凝土折板屋顶——Breuer将他在家具设计中发展出来的折叠金属板原理放大到建筑尺度——在祭坛上方投下戏剧性的光影。最惊人的元素也许是圣水盆：一块巨大的花岗岩通过一个悬挑的混凝土臂悬挂在入口上方，仿佛违反重力法则——这是结构工程的诗意。',
            'Breuer的设计在当时引发了争议：一些修士认为混凝土过于冷酷，与修道院肃穆的灵修氛围不够契合。但时间给出了最好的答案——半个多世纪后，这座建筑已成为美国现代主义教会建筑最杰出的代表之一，被列入国家历史地标。它的蜂窝状立面不仅是一个实用的采光系统，更成为一种建筑图腾：信仰的多面性，光的散逸与聚焦，人与神圣之间的透明的屏障。',
          ],
          ja: [
            '1953年、ミネソタ州のセント·ジョンズ修道院から新教会堂の設計依頼を受けた。ブロイヤーにとってこれは単なる建築プロジェクトではなかった——第二次世界大戦中に亡命を経験したユダヤ人として、ベネディクト会修道院からの依頼を受けることは、深い信頼と精神的対話を意味していた。彼の応答は他に類を見ないコンクリートの傑作であった。巨大なハニカム状のコンクリートファサードは212枚のプレキャスト菱形パネルで構成され、各パネルに埋め込まれたステンドグラスが、日光を万華鏡のような聖なる輝きへと分解する。',
            '教会堂内部は巨大な台形空間で、前方が広く後方が狭く、信徒の視線を祭壇に収斂させる。自立式のコンクリート折板屋根——ブロイヤーが家具デザインで発展させた折り畳み金属板の原理を建築スケールに拡大したもの——が祭壇の上に劇的な光と影を投げかける。おそらく最も驚くべき要素は聖水盤だ——巨大な花崗岩の塊が、キャンティレバーのコンクリートアームによって入口の上に吊り下げられ、まるで重力の法則を犯しているかのようだ——構造工学の詩である。',
            'ブロイヤーの設計は当時論争を呼び起こした。一部の修道士はコンクリートが冷たすぎ、修道院の静謐な霊的雰囲気にそぐわないと感じた。しかし時が最良の答えを与えた——半世紀以上を経て、この建築はアメリカ·モダニズム教会建築の最も卓越した事例の一つとなり、国家歴史建造物に指定された。そのハニカムファサードは実用的な採光システムであるのみならず、建築のトーテムとなった——信仰の多面性、光の散逸と収斂、人と聖なるものとのあいだの透明な障壁。',
          ],
          en: [
            'In 1953, Saint John\u2019s Abbey in Minnesota commissioned Breuer to design a new church. For Breuer this was more than an architectural project \u2014 as a Jew who had experienced exile during World War II, receiving a commission from a Benedictine monastery signified profound trust and spiritual dialogue. His response was an incomparable concrete masterpiece: a vast honeycomb concrete fa\u00e7ade composed of 212 precast rhomboid panels, each embedded with stained glass, decomposing daylight into a kaleidoscopic sacred radiance.',
            'The interior of the church is an enormous trapezoidal space, wider at the front and narrower at the rear, converging the congregation\u2019s gaze upon the altar. The self-supporting concrete folded-plate roof \u2014 Breuer scaled up the principle of folded sheet metal he had developed in furniture design to the architectural scale \u2014 casts dramatic light and shadow above the altar. Perhaps the most astonishing element is the holy water font: an immense block of granite suspended above the entrance by a cantilevered concrete arm, as if defying the laws of gravity \u2014 poetry in structural engineering.',
            'Breuer\u2019s design stirred controversy at the time: some monks felt the concrete was too cold and ill-suited to the monastery\u2019s serene spiritual atmosphere. But time provided the best answer \u2014 over half a century later, this building has become one of the most outstanding examples of American modernist ecclesiastical architecture and has been designated a National Historic Landmark. Its honeycomb fa\u00e7ade is not only a functional daylighting system but a built totem: the multifaceted nature of faith, the diffusion and concentration of light, the transparent barrier between the human and the sacred.',
          ],
        },
      },
      {
        title: { zh: 'Whitney Museum：颠倒的金字塔与城市宣言', ja: 'ホイットニー美術館——逆さまのピラミッドと都市宣言', en: 'Whitney Museum: An Inverted Pyramid and Urban Declaration' },
        paragraphs: {
          zh: [
            '如果说圣约翰教堂是Breuer在旷野中对神圣的探寻，那么1966年的纽约惠特尼美国艺术博物馆则是他在稠密的城市环境中对文化权力的宣言。这座建筑的外观令人过目不忘：一个颠倒的阶梯形花岗岩体量，上部向外悬挑，下部向内退缩——一个反重力的姿态，一种对曼哈顿垂直网格的挑战。这不是一座请求你进入的博物馆，而是一座宣称自身存在的堡垒。',
            '有意思的是，Breuer将博物馆的主入口做成了桥的形式——一条混凝土桥从街面向建筑延伸，将参观者从城市喧嚣引渡至艺术圣所。内部空间同样戏剧性：开放灵活的大型展厅以步道和悬梯相互连接，使参观者的移动本身成为一种立体的空间体验。花岗岩外墙上的窄窗提供经过精确编辑的城市视野，确保外部世界只能以片断的方式进入艺术体验之中。',
            '然而Whitney Museum也未能逃脱功能超越形式的命运：2015年博物馆搬迁至Renzo Piano设计的新馆，Breuer的建筑随后由大都会艺术博物馆（The Met Breuer）和后来的苏富比拍卖行使用。但建筑作为一种宣言的力量丝毫不减：在Madison Avenue那些彬彬有礼的玻璃幕墙建筑中间，Breuer的这座混凝土堡垒就像一个闯入客厅的陌生人——粗鲁、沉重、不容忽视——而这正是它的力量所在。',
          ],
          ja: [
            'セント·ジョンズ教会がブレイヤーの荒野における聖なるものへの探求であるとすれば、1966年のニューヨーク·ホイットニー米国美術館は、稠密な都市環境における文化的権力の宣言であった。この建築の外観は一目で忘れがたい——逆さまの階段状花崗岩の質量が、上部は外側に張り出し、下部は内側に退行する。反重力的な身振りであり、マンハッタンの垂直グリッドへの挑戦である。これはあなたに入館をお願いする美術館ではなく、みずからの存在を宣言する要塞なのだ。',
            '興味深いことに、ブレイヤーは美術館の主入口を橋の形式にした——コンクリートの橋が通りから建築へと延び、来館者を都市の喧騒から芸術の聖域へと引き渡す。内部空間も同様に劇的である——開放的で柔軟な大規模展示室が歩道と吊り階段で相互に接続され、来館者の移動そのものが立体的な空間体験となる。花崗岩の外壁に穿たれた細長い窓は、精確に編集された都市の眺めを提供し、外部世界は断片としてのみ芸術体験のなかに入り込むことを許される。',
            'しかしホイットニー美術館もまた、機能が形式を凌駕する運命を逃れられなかった——2015年、美術館はレンゾ·ピアノ設計の新館へ移転し、ブレイヤーの建築はその後メトロポリタン美術館分館（The Met Breuer）へ、さらにのちにサザビーズへと使用が移った。しかし宣言としての建築の力は寸毫も衰えない——マディソン·アヴェニューの行儀のよいガラス·カーテンウォールのビル群のあいだで、ブレイヤーのこのコンクリートの要塞は客間に闖入した見知らぬ人のようだ——粗野で、重く、無視しようがない——そしてそれこそがこの建築の力なのである。',
          ],
          en: [
            'If Saint John\u2019s Abbey is Breuer\u2019s quest for the sacred in open landscape, the 1966 Whitney Museum of American Art in New York is his declaration of cultural power in the dense urban environment. The building\u2019s exterior is unforgettable: an inverted stepped granite mass, cantilevering outward at the top and stepping inward at the bottom \u2014 an anti-gravity gesture, a challenge to the Manhattan vertical grid. This is not a museum that asks you to enter; it is a fortress that declares its own existence.',
            'Interestingly, Breuer designed the museum\u2019s main entrance as a bridge \u2014 a concrete bridge extending from the street to the building, ferrying the visitor from urban cacophony into the sanctuary of art. The interior space is equally dramatic: open, flexible large-scale galleries interconnected by walkways and suspended stairs, making the visitor\u2019s circulation itself a three-dimensional spatial experience. Narrow windows punched into the granite fa\u00e7ade offer precisely edited views of the city, ensuring the outside world enters the art experience only in fragments.',
            'Yet the Whitney Museum could not escape the fate of function overtaking form: in 2015 the museum relocated to a new Renzo Piano\u2013designed building, and Breuer\u2019s building was subsequently used by the Metropolitan Museum of Art (The Met Breuer) and later by Sotheby\u2019s. But the building\u2019s power as declaration remains undiminished \u2014 among the well-mannered glass-curtain-wall buildings of Madison Avenue, Breuer\u2019s concrete fortress is like a stranger who has barged into the drawing room: rude, heavy, impossible to ignore \u2014 and that is precisely its power.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'marcel-breuer-house-and-studio', note: { zh: 'Breuer为自己和家人设计的住宅，玻璃和木材与混凝土的对话，展示了他最人性化的一面。', ja: 'ブロイヤーが自身と家族のために設計した住宅。ガラスと木材のコンクリートとの対話が、彼の最も人間的な一面を示す。', en: 'The house Breuer designed for himself and his family, a dialogue of glass and wood with concrete, revealing his most human side.' } },
      { slug: 'atlanta-fulton-county-central-library', note: { zh: '一座水平展开的混凝土图书馆，大胆的内凹入口和深挑飞檐，公共建筑雕塑化的力作。', ja: '水平に展開するコンクリートの図書館。大胆な抉り込み入口と深い張り出し庇、公共建築を彫刻化した力作。', en: 'A horizontally unfolding concrete library, with a bold recessed entrance and deep overhanging eaves, a tour de force of sculptural public architecture.' } },
      { slug: 'robert-c-weaver-federal-building', note: { zh: '华盛顿的曲线混凝土政府大楼，巨型H形体量上的弧形窗带，官僚建筑也可以是好建筑。', ja: 'ワシントンの曲線コンクリート合同庁舎。巨大なH形ボリューム上の弧状窓帯——官僚建築も良質な建築たりうる。', en: 'A curvilinear concrete federal building in Washington, with arcing window bands on a giant H-shaped volume \u2014 bureaucratic architecture can also be good architecture.' } },
    ],
    sources: [
      { title: 'Marcel Breuer Digital Archive', url: 'https://breuer.syr.edu/' },
      { title: 'Whitney Museum (Breuer Building) \u2014 Wikipedia', url: 'https://en.wikipedia.org/wiki/945_Madison_Avenue' },
      { title: 'Wikidata: Marcel Breuer', url: 'https://www.wikidata.org/wiki/Q57588' },
    ],
  },

  'lina-bo-bardi': {
    slug: 'lina-bo-bardi',
    summary: {
      zh: '意大利裔巴西现代主义建筑师，以粗犷的混凝土、适应性再利用和深刻的社会民主信念重塑了巴西建筑的身份。',
      ja: 'イタリア生まれのブラジル人モダニズム建築家。粗々しいコンクリート、適応的再利用、深い社会的民主主義の信念によって、ブラジル建築のアイデンティティを刷新した。',
      en: 'Italian-born Brazilian modernist architect who reshaped Brazilian architectural identity through raw concrete, adaptive reuse, and deeply held social-democratic convictions.',
    },
    core_ideas: {
      zh: [
        '建筑作为社会行动：设计不是为了美学游戏，而是为了服务弱势群体和公共生活。',
        '粗犷的诗意（Poor Architecture）：使用廉价、本土、粗犷的材料，将贫乏转化为力量而非局限。',
        '适应性再利用：尊重历史结构，将旧工厂、老建筑改造为新的文化容器。',
        '人与物的平等：建筑空间中所有元素——人、艺术品、家具、材料——拥有同等的尊严。',
        '现代主义的南方转译：将欧洲现代主义的原则与巴西的热带现实、工匠传统和物质条件深度融合。',
      ],
      ja: [
        '社会行動としての建築：デザインは美的ゲームのためではなく、弱い立場の人々と公共生活に奉仕するためにある。',
        '荒々しい詩情（ポア·アーキテクチャ）：安価で地場産の粗い材料を用い、貧しさを限界ではなく力に変える。',
        '適応的再利用：歴史的構造を尊重し、古い工場や建築を新しい文化の容器へと転換する。',
        '人とモノの平等：建築空間におけるすべての要素——人、芸術作品、家具、素材——は同等の尊厳をもつ。',
        'モダニズムの南方的転訳：ヨーロッパ·モダニズムの原則を、ブラジルの熱帯的現実、職人の伝統、物的条件と深く融合させる。',
      ],
      en: [
        'Architecture as social action: Design is not for aesthetic play but for serving disadvantaged populations and public life.',
        'Rough poetry (Poor Architecture): Using cheap, local, raw materials, transforming poverty into strength rather than limitation.',
        'Adaptive reuse: Respecting historical structures, converting old factories and buildings into new cultural containers.',
        'Equality of people and things: In architectural space all elements \u2014 people, artworks, furniture, materials \u2014 possess equal dignity.',
        'Southern translation of modernism: Deeply fusing European modernist principles with Brazil\u2019s tropical reality, artisanal traditions, and material conditions.',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Lina_Bo_Bardi.jpg',
      author: 'Unknown',
      license: 'CC BY-SA 4.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Lina_Bo_Bardi.jpg',
      alt: { zh: 'Lina Bo Bardi 肖像', ja: 'リナ・ボ・バルディの肖像', en: 'Portrait of Lina Bo Bardi' },
    },
    sections: [
      {
        title: { zh: '从罗马到圣保罗：一位女性建筑师在南半球的革命', ja: 'ローマからサンパウロへ——南半球における女性建築家の革命', en: 'From Rome to S\u00e3o Paulo: A Woman Architect\u2019s Revolution in the Southern Hemisphere' },
        paragraphs: {
          zh: [
            'Lina Bo Bardi（1914\u20131992）是建筑史上最具传奇色彩的人物之一。她于1939年从罗马大学建筑系毕业，正值法西斯意大利的黑暗年代。战后，她与丈夫、艺术评论家Pietro Maria Bardi一起于1946年移居巴西——她将这次迁徙描述为\u201c从旧世界的废墟来到新世界的无限可能\u201d。在巴西，她找到了欧洲所无法提供的自由：一片可以彻底重建现代建筑与社会关系的土地。',
            '圣保罗艺术博物馆（MASP，1968）是她最具标志性的作品。这个项目最激进的特征不是建筑设计本身，而是她的策展理念和展陈方式：她发明了玻璃支架展示系统，画作悬挂在透明的玻璃板上，悬浮于空间之中，打破了传统的墙面挂画模式。参观者在画作之间穿行，从任何角度都可以看到画作的背面、侧面和正面——一种彻底民主化的观看体验，拒绝将任何单一视点强加于人。建筑本身同样激进：一对红色的巨型混凝土梁跨越74米的跨度将建筑体量悬挂于空中，释放出底层的公共广场。',
            'SESC Pompéia（1977\u20131986）进一步深化了她的社会建筑理想。这座由旧油桶工厂改造的社区文化中心保留原始的粗犷混凝土结构，而非将其粉饰一新——裂纹、污渍和被岁月雕琢的表面都被保留为建筑故事的一部分。她将一条蜿蜒的混凝土\u201c河流\u201d引入其中，连接游泳池、剧场、餐厅和工坊，创造了并非消费场所而是公民聚会的\u201c第三空间\u201d。这座建筑至今仍然是圣保罗最具活力的市民中心之一，每周吸引数千名来自不同社会阶层的人在此交汇。',
          ],
          ja: [
            'リナ·ボ·バルディ（1914\u20131992）は建築史上最も伝説的な人物の一人である。1939年にローマ大学建築学科を卒業したが、それはファシスト·イタリアの暗黒時代だった。戦後、彼女は夫である美術批評家のピエトロ·マリア·バルディとともに1946年にブラジルへ移住した——彼女はこの移住を「旧世界の廃墟から新世界の無限の可能性へ」と描写した。ブラジルで彼女は、ヨーロッパが提供しえないものを見出した——近代建築と社会関係を根底から再構築できる土地を。',
            'サンパウロ美術館（MASP, 1968）は彼女の最も象徴的な作品である。このプロジェクトの最も急進的な特徴は建築デザインそのものではなく、彼女の展示理念と展示方式にあった。彼女はガラスの支持台システムを発明し、絵画を透明なガラス板に掛けて空間に浮遊させ、伝統的な壁掛け展示様式を打破した。来館者は絵画のあいだを縫うように歩き、あらゆる角度から絵画の裏面、側面、正面を見ることができる——単一の視点を誰にも強制しない、徹底的に民主化された鑑賞体験。建築自体も同様に急進的である——一対の赤い巨大なコンクリート梁が74メートルの径間を跨ぎ、建築ヴォリュームを空中に吊り下げ、その下の公共広場を解放する。',
            'SESCポンペイア（1977\u20131986）は彼女の社会的建築理想をさらに深化させた。旧石油ドラム缶工場を改修したこのコミュニティ文化センターは、荒々しい素のコンクリート躯体を保持し、きれいに塗り替えられない——ひび割れ、しみ、歳月に彫琢された表面が建築の物語の一部として保存されている。彼女はそのなかに蛇行するコンクリートの「河」を導入し、プール、劇場、レストラン、工房をつなぎ、消費の場ではなく市民が集う「第三の場所」を創出した。この建築は今日でもサンパウロで最も活気にあふれた市民センターの一つであり、毎週何千人もの異なる社会階層の人々がここで交錯している。',
          ],
          en: [
            'Lina Bo Bardi (1914\u20131992) is one of the most legendary figures in architectural history. She graduated from the University of Rome\u2019s architecture program in 1939, during the dark years of Fascist Italy. After the war, together with her husband, art critic Pietro Maria Bardi, she emigrated to Brazil in 1946 \u2014 a migration she described as \u201cfrom the ruins of the Old World to the infinite possibilities of the New.\u201d In Brazil she found what Europe could not offer: a land where modern architecture and social relations could be rebuilt from the ground up.',
            'The S\u00e3o Paulo Museum of Art (MASP, 1968) is her most iconic work. The project\u2019s most radical feature was not the architectural design per se but her curatorial philosophy and display method: she invented the glass easel display system, where paintings are hung on transparent glass panels suspended in space, breaking the traditional wall-hung model. Visitors walk among the paintings and can see the back, sides, and front of each work from any angle \u2014 a thoroughly democratized viewing experience that refuses to impose any single vantage point. The building itself is equally radical: a pair of red, enormous concrete beams spanning 74 meters suspends the building volume in the air, freeing the ground-level public plaza beneath.',
            'SESC Pomp\u00e9ia (1977\u20131986) further deepened her social architecture ideals. This community cultural center, adapted from a former oil drum factory, retains the raw, unfinished concrete structure rather than painting it over \u2014 cracks, stains, and surfaces sculpted by time are preserved as part of the building\u2019s story. She introduced a winding concrete \u201criver\u201d into the space, connecting swimming pools, theaters, restaurants, and workshops, creating not a consumption space but a \u201cthird place\u201d for civic gathering. This building remains one of S\u00e3o Paulo\u2019s most vibrant civic centers today, where thousands of people from different social strata converge every week.',
          ],
        },
      },
      {
        title: { zh: '粗犷的诗意：Lina Bo Bardi的材料政治学', ja: '荒々しい詩情——リナ·ボ·バルディの素材政治学', en: 'The Poetics of Roughness: Lina Bo Bardi\u2019s Material Politics' },
        paragraphs: {
          zh: [
            '如果要用一个词概括Bo Bardi的材料美学，那将是\u201c粗犷\u201d——但这不是西方粗野主义的冰冷纪念碑式粗犷，而是一种温暖的、触觉性的、几乎具有手工品质的粗犷。她深爱混凝土的原始状态：未打磨的表面、可见的模板印记、不完美的手工涂抹痕迹。对她而言，这些不是工程缺陷，而是时间、劳动和记忆的记录。在SESC Pompéia中，她甚至坚持保留了旧工厂墙面上工人们留下的涂鸦。',
            '她的材料立场带有明确的政治意涵。在巴西——一个存在巨大贫富差距的社会——选择粗糙的混凝土而非光亮的大理石，不是审美偏好，而是一种政治声明：建筑应该为社会中的多数人服务，而不是取悦精英。她曾说：\u201c真正的奢华不是黄金和大理石，而是空间和阳光。\u201d这解释了为什么她的建筑在视觉上如此朴素，却在空间感受上如此慷慨：宽敞的公共空间、充沛的自然光、自由的流动动线——这些是所有人都能享有的奢侈。',
            '她的家具设计也体现了同样的理念。她为SESC Pompéia设计的皮革吊床椅、粗木长桌和折叠椅，材料本身粗犷直接，但比例和人体工学经过了精密推敲。这些不是精致的奢侈品，而是日常仪式感的载体——邀请你坐下、对话、阅读或仅仅凝视窗外的城市风景。在Bo Bardi的世界里，粗糙的表面不是物质的终点，而是人与物之间持续对话的起点。',
          ],
          ja: [
            'ボ·バルディの素材美学を一言で表すならば「粗々しさ」である——しかしこれは西洋ブルータリズムの冷たいモニュメンタルな粗さではなく、温かみがあり、触覚的であり、ほとんど手工芸的な質を帯びた粗さである。彼女はコンクリートの原初状態を深く愛した——磨かれていない表面、見える型枠痕、不完全な手塗りの跡。彼女にとってこれらは工学的欠陥ではなく、時間、労働、記憶の記録なのだ。SESCポンペイアでは、彼女は旧工場の壁に労働者たちが残した落書きさえも保存することを主張した。',
            '彼女の素材に対する立場は明確な政治的含意を帯びている。ブラジル——巨大な貧富の格差が存在する社会——において、光沢のある大理石ではなく粗いコンクリートを選ぶことは、審美的嗜好ではなく、一つの政治的声明である。建築は社会の多数者のために奉仕すべきであり、エリートを喜ばせるためではない。彼女はかつて言った——「真の贅沢とは金や大理石ではなく、空間と陽光である」。これが、彼女の建築が視覚的にはきわめて素朴でありながら、空間感覚においてこれほど寛大である理由を説明する——広々とした公共空間、豊かな自然光、自由な動線——これらはすべての人が享受できる贅沢なのである。',
            '彼女の家具デザインも同じ理念を体現する。SESCポンペイアのためにデザインした革のハンモックチェア、粗い木の長テーブル、折り畳み椅子——素材自体は粗く直接的でありながら、プロポーションと人間工学は精密に追究されている。これらは精緻な贅沢品ではなく、日常の儀式感の媒体である——座り、対話し、読書し、あるいは単に窓の外の都市風景を凝視するように誘う。ボ·バルディの世界では、粗い表面は物質の終点ではなく、人とモノとの継続的な対話の起点なのである。',
          ],
          en: [
            'If one word could summarize Bo Bardi\u2019s material aesthetic, it would be \u201croughness\u201d \u2014 but this is not the cold, monumental roughness of Western Brutalism; rather, it is a warm, tactile, almost artisanal roughness. She deeply loved concrete in its raw state: unpolished surfaces, visible formwork marks, the imperfect traces of hand plastering. For her these were not engineering defects but records of time, labor, and memory. At SESC Pomp\u00e9ia, she even insisted on preserving the graffiti left by workers on the old factory walls.',
            'Her material stance carries explicit political implications. In Brazil \u2014 a society of enormous wealth disparity \u2014 choosing rough concrete over polished marble is not an aesthetic preference but a political statement: architecture should serve the majority in society, not please the elite. She once said: \u201cTrue luxury is not gold and marble, but space and sunlight.\u201d This explains why her buildings are visually so austere yet spatially so generous: ample public space, abundant natural light, free-flowing circulation \u2014 these are luxuries accessible to all.',
            'Her furniture design embodies the same philosophy. The leather hammock chair, rough-wood long tables, and folding chairs she designed for SESC Pomp\u00e9ia use materials that are raw and direct, yet the proportions and ergonomics are precisely calibrated. These are not refined luxury goods but carriers of everyday ritual \u2014 inviting you to sit, converse, read, or simply gaze at the cityscape beyond the window. In Bo Bardi\u2019s world, a rough surface is not the terminus of material but the starting point of an ongoing dialogue between people and things.',
          ],
        },
      },
      {
        title: { zh: '迟到的正典化：从被忽视到建筑史核心', ja: '遅れてきた正典化——無視から建築史の中核へ', en: 'Belated Canonization: From Overlooked to Central in Architectural History' },
        paragraphs: {
          zh: [
            'Bo Bardi在世时，她的作品在很大程度上被国际建筑界忽视。原因复杂：地理边缘性（巴西在主流水准视线的边缘）、性别偏见（在男性主导的建筑圈中，她从未获得同辈男性建筑师享有的同等关注），以及她作品本身的不可归类型——既非纯粹的现代主义也非后现代主义，既非欧洲也非拉丁美洲原生的语言，而是一种独特的合成物。',
            '她于1992年去世时，仍然相对无名。然而在21世纪，一场静默的革命发生了：新一代建筑史学者和策展人开始重新发掘她的作品。2012年MASP的全面修复、2014年威尼斯建筑双年展上的大规模个展、以及2018年出版的权威专著，将她的地位从\u201c被遗忘的现代主义先驱\u201d提升到\u201c20世纪最具原创性的建筑思想家之一\u201d。她在女性建筑师中的地位尤为突出：在Zaha Hadid于2004年获得普利兹克奖之前，Bo Bardi是20世纪为数不多的、在建筑史上留下不可磨灭印记的女性之一。',
            '她的当代相关性不仅仅在于身份政治。在一个日益关注可持续性、社区参与和适应性再利用的时代，Bo Bardi上世纪六七十年代的思想和实践看起来像是预言。她的\u201c保持原始的、少做干预\u201d的改造哲学——远早于今天的适应性再利用潮流——以及她将建筑作为社会基础设施的观念，与当代关于建筑师社会责任和城市更新方式的讨论产生了深刻共鸣。她证明了：一个建筑师不需要宏大的预算和标志性的造型来产生深远影响，有时恰好相反——需要的是一颗关注日常生活的慈悲之心。',
          ],
          ja: [
            'ボ·バルディが存命中、彼女の作品は大部分において国際建築界から無視されていた。理由は複雑である。地理的な周縁性（ブラジルは主流の視線の端にある）、ジェンダー·バイアス（男性優位の建築界で彼女が同輩の男性建築家たちと同じ注目を浴びることは決してなかった）、そして彼女の作品それ自体の分類不能性——純粋なモダニズムでもポストモダンでもなく、ヨーロッパ的でもラテンアメリカ土着でもない、独自の合成物という性格。',
            '彼女が1992年に死去したとき、まだ比較的無名だった。しかし21世紀に入り、静かな革命が起こった。新世代の建築史家とキュレーターたちが彼女の作品を再発見しはじめたのだ。2012年のMASP全面修復、2014年ヴェネツィア·ビエンナーレ建築展における大規模個展、2018年の権威あるモノグラフの出版により、彼女の地位は「忘れられたモダニズムの先駆者」から「20世紀で最も独創的な建築思想家の一人」へと引き上げられた。女性建築家のなかでの彼女の地位はとりわけ突出している——2004年にザハ·ハディドがプリツカー賞を受賞する以前において、ボ·バルディは建築史に消しがたい刻印を残した数少ない20世紀の女性の一人だった。',
            '彼女の今日的関連性はアイデンティティ政治にとどまらない。持続可能性、コミュニティ参加、適応的再利用への関心が高まる時代にあって、ボ·バルディが1960\u201370年代に展開した思想と実践は予言のように見える。彼女の「原状を保ち、介入は最小限に」という改修の理念——今日の適応的再利用の潮流よりはるかに早い——そして建築を社会インフラストラクチャと見なす観念は、建築家の社会的責任や都市再生のあり方をめぐる今日の議論と深く共鳴する。彼女は証明した——建築家は大きな予算と象徴的な造形を必要とせずに深い影響を及ぼしうる。ときに正反対のことが求められる——日常の生活を見つめる慈悲深いまなざしを。',
          ],
          en: [
            'During her lifetime, Bo Bardi\u2019s work was largely overlooked by the international architectural community. The reasons are complex: geographical marginality (Brazil lies at the edge of mainstream attention), gender bias (in a male-dominated architectural world she never received the same attention as her male peers), and the unclassifiability of her work itself \u2014 neither pure modernism nor postmodernism, neither European nor indigenously Latin American, but a unique synthesis.',
            'When she died in 1992, she was still relatively unknown. Yet in the 21st century a quiet revolution occurred: a new generation of architectural historians and curators began to rediscover her work. The comprehensive restoration of MASP in 2012, a major solo exhibition at the 2014 Venice Architecture Biennale, and the publication of the authoritative monograph in 2018 elevated her status from \u201cforgotten modernist pioneer\u201d to \u201cone of the 20th century\u2019s most original architectural thinkers.\u201d Her place among women architects is especially significant: before Zaha Hadid won the Pritzker Prize in 2004, Bo Bardi was one of the few women of the 20th century to leave an indelible mark on architectural history.',
            'Her contemporary relevance goes beyond identity politics. In an era increasingly concerned with sustainability, community engagement, and adaptive reuse, Bo Bardi\u2019s ideas and practices from the 1960s and 70s look prophetic. Her renovation philosophy of \u201ckeeping things raw, intervening minimally\u201d \u2014 far ahead of today\u2019s adaptive-reuse trends \u2014 and her conception of architecture as social infrastructure resonate deeply with contemporary debates about architects\u2019 social responsibility and approaches to urban regeneration. She proved that an architect does not need a grand budget and iconic forms to make a profound impact; sometimes the opposite is needed \u2014 a compassionate eye focused on everyday life.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'sesc-pompeia', note: { zh: '旧油桶工厂改造的市民文化中心，粗混凝土的温暖拥抱，建筑师社会关怀的最高表达。', ja: '旧ドラム缶工場を改修した市民文化センター。粗いコンクリートの温かな抱擁、建築家の社会的ケアの最高表現。', en: 'A civic cultural center adapted from a former oil drum factory, the warm embrace of rough concrete, the highest expression of an architect\u2019s social care.' } },
      { slug: 'sao-paulo-museum-of-art', note: { zh: '悬浮的玻璃与混凝土盒子，悬浮画架颠覆了美术馆的观看秩序，公共广场属于城市。', ja: '浮遊するガラスとコンクリートの箱。浮遊するイーゼルが美術館の鑑賞秩序を覆し、公共広場は都市に属する。', en: 'A suspended glass-and-concrete box, floating easels subverting the viewing order of the museum, and a public plaza that belongs to the city.' } },
      { slug: 'glass-house', note: { zh: 'Bo Bardi的自宅，钢架玻璃亭阁栖于热带雨林斜坡之上，一座俯瞰丛林的透明居所。', ja: 'ボ·バルディの自邸。鉄骨ガラスのパヴィリオンが熱帯雨林の斜面に棲み、ジャングルを見下ろす透明な住まい。', en: 'Bo Bardi\u2019s own home, a steel-framed glass pavilion perched on a rainforest slope, a transparent dwelling overlooking the jungle.' } },
    ],
    sources: [
      { title: 'Instituto Lina Bo e P. M. Bardi', url: 'https://www.institutobardi.org/' },
      { title: 'Lina Bo Bardi \u2014 Wikipedia', url: 'https://en.wikipedia.org/wiki/Lina_Bo_Bardi' },
      { title: 'Wikidata: Lina Bo Bardi', url: 'https://www.wikidata.org/wiki/Q272402' },
    ],
  },

  'big': {
    slug: 'big',
    summary: {
      zh: '丹麦建筑师Bjarke Ingels创立的BIG事务所，以\u201c享乐主义的可持续性\u201d、大胆的图解式建筑形式和兼收并蓄的乐观主义重新定义了21世纪的建筑设计。',
      ja: 'デンマークの建築家ビャルケ·インゲルスが創設したBIG。\u201c快楽主義的持続可能性\u201d、大胆なダイアグラム的建築形態、折衷的な楽天主義によって、21世紀の建築デザインを再定義した。',
      en: 'The firm BIG, founded by Danish architect Bjarke Ingels, has redefined 21st-century architectural design through \u201chedonistic sustainability,\u201d boldly diagrammatic architectural forms, and eclectic optimism.',
    },
    core_ideas: {
      zh: [
        '享乐主义可持续性（Hedonistic Sustainability）：可持续设计不应是牺牲和苦行，而应是让生活更美好的方式。',
        '是即是多（Yes Is More）：对约束条件说\u201c是\u201d而非\u201c不\u201d，通过拥抱复杂性而非拒绝限制来创造前所未有的解决方案。',
        '图表主义（Diagrammatic Architecture）：将建筑的生成逻辑简化为清晰的图解叙事，让复杂的想法被大众理解。',
        '实用乌托邦（Pragmatic Utopia）：在现实条件与理想愿景之间寻找平衡，不放弃理想但尊重现实的复杂性。',
        '进化而非革命：建筑的发展应如生物进化般一步步累积改进，而非突然的彻底断裂。',
      ],
      ja: [
        '快楽主義的持続可能性（Hedonistic Sustainability）：持続可能なデザインは犠牲や苦行ではなく、生活をより良くする方法であるべきだ。',
        'イエス·イズ·モア（Yes Is More）：制約条件に「ノー」ではなく「イエス」と言い、制限を拒絶するのではなく複雑性を受け入れることで、前例のない解決策を創り出す。',
        'ダイアグラム的建築（Diagrammatic Architecture）：建築の生成論理を明快な図解的物語へと単純化し、複雑な思考を大衆に理解可能にする。',
        '実用主義的ユートピア（Pragmatic Utopia）：現実の条件と理想のヴィジョンのあいだで均衡を探り、理想を放棄せずに現実の複雑性を尊重する。',
        '革命ではなく進化：建築の発展は生物進化のように段階的に改善を積み重ねるべきであり、突然の根本的断絶ではない。',
      ],
      en: [
        'Hedonistic Sustainability: Sustainable design should not be about sacrifice and austerity but about making life better and more enjoyable.',
        'Yes Is More: Saying \u201cyes\u201d to constraints rather than \u201cno\u201d, creating unprecedented solutions by embracing complexity rather than refusing limitations.',
        'Diagrammatic Architecture: Simplifying a building\u2019s generative logic into clear diagrammatic narratives, making complex ideas comprehensible to the public.',
        'Pragmatic Utopia: Seeking a balance between real-world conditions and ideal visions, not abandoning ideals but respecting the complexity of reality.',
        'Evolution not Revolution: Architectural development should accumulate gradual improvements like biological evolution, not sudden total ruptures.',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Bjarke_Ingels_2015.jpg',
      author: 'NRK P3',
      license: 'CC BY-SA 2.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Bjarke_Ingels_2015.jpg',
      alt: { zh: 'Bjarke Ingels 肖像，2015年', ja: 'ビャルケ・インゲルスの肖像、2015年', en: 'Portrait of Bjarke Ingels, 2015' },
    },
    sections: [
      {
        title: { zh: '漫画宣言：Bjarke Ingels与众不同的崛起之路', ja: 'コミック宣言——ビャルケ·インゲルスの異色の台頭', en: 'The Comic Manifesto: Bjarke Ingels\u2019s Unconventional Rise' },
        paragraphs: {
          zh: [
            'Bjarke Ingels（1974\u2013）的崛起之路与传统建筑大师截然不同。他未曾在任何著名事务所长期学徒（仅在Rem Koolhaas的OMA短暂工作过），从未赢得普利兹克奖（虽然被广泛认为在候选名单前列），也从未追求建筑界的严肃正统。相反，他在2009年出版了一本漫画书——\u201cYes Is More\u201d——作为自己的建筑宣言。这不是一本传统的理论著作，而是一部以连环漫画形式讲述BIG事务所理念和项目演进的作品。这个选择本身就是他建筑哲学的体现：让复杂的建筑思想变得易懂、可分享、甚至有趣。',
            'BIG的核心设计方法是将项目的约束条件（功能需求、场地限制、预算、规范）转译为一个简单的形式图解——这种方法被称为\u201c建筑炼金术\u201d。举例来说，8 House（哥本哈根，2010）的生成逻辑是将一个传统庭院街区\u201c弯折\u201d成一个8字形，从而创造出一条从地面到屋顶的连续步道和坡道——居民可以骑自行车从地面直达顶层。这一简单的形式操作同时解决了庭院、日照、景观、可达性和社区互动的多重问题。',
            '在Ingels看来，建筑师不应该是对客户说\u201c不\u201d的守门人，而应该是对一切可能性说\u201c是\u201d的赋能者。这种乐观的姿态在当代建筑文化中是稀缺品——在一个以批判和怀疑为主流的世界里，Ingels的\u201c是即是多\u201d听起来天真，但他的建成作品证明这不是天真的乐观主义，而是构建复杂利益的实用技能。他特别擅长在政府、开发商和公众之间斡旋，将矛盾转化为共同的愿景。',
          ],
          ja: [
            'ビャルケ·インゲルス（1974\u2013）の台頭の道筋は、伝統的な建築巨匠とはまったく異なる。彼は有名事務所での長期間の徒弟修業を経験せず（OMAでの短期間の勤務のみ）、プリツカー賞を受賞したこともなく（広く候補者リストの上位にいると見なされているが）、建築界の厳粛な正統性を追求したこともない。その代わりに彼は2009年、一冊の漫画本——"Yes Is More"——を出版し、それを自らの建築宣言とした。これは伝統的な理論書ではなく、BIGの理念とプロジェクトの展開を連続漫画の形式で語る作品である。この選択それ自体が彼の建築哲学の体現である——複雑な建築思想を理解しやすく、共有可能で、面白くさえあるものにする。',
            'BIGの中核的設計手法は、プロジェクトの制約条件（機能要件、敷地制限、予算、法規）を一つの単純な形式図解に翻訳することであり、この方法は「建築錬金術」と呼ばれる。例を挙げれば、8ハウス（コペンハーゲン、2010年）の生成論理は、伝統的な中庭街区を「折り曲げ」て8の字形にし、それによって地面から屋上までの連続した歩道と傾斜路を創り出すことだった——住民は自転車で地面から最上階まで到達できるのだ。この一つの単純な形式操作が、中庭、日照、景観、アクセシビリティ、コミュニティ交流という複数の問題を同時に解決する。',
            'インゲルスの見解では、建築家はクライアントに「ノー」と言う門番であるべきではなく、あらゆる可能性に「イエス」と言うイネーブラー（可能にする者）であるべきだ。この楽天的な姿勢は、現代の建築文化においては稀少品である——批判と懐疑が主流の世界で、インゲルスの「イエス·イズ·モア」は素朴に響くが、彼の実作はこれが素朴な楽天主義ではなく、複雑な利害を構築する実践的スキルであることを証明している。彼はとりわけ、行政、デベロッパー、一般市民のあいだで調停し、対立を共有のヴィジョンへと転換することに長けている。',
          ],
          en: [
            'The rise of Bjarke Ingels (1974\u2013) is utterly unlike the path of a traditional architectural master. He never long-apprenticed in any famous office (only a brief stint at Rem Koolhaas\u2019s OMA), has never won the Pritzker Prize (though widely regarded as on the short list), and has never pursued the serious orthodoxy of the architectural establishment. Instead, in 2009 he published a comic book \u2014 \u201cYes Is More\u201d \u2014 as his architectural manifesto. This is not a traditional theoretical treatise but a work narrating BIG\u2019s philosophy and project evolution in the format of a graphic novel. The choice itself is an embodiment of his architectural philosophy: making complex architectural ideas understandable, shareable, and even fun.',
            'BIG\u2019s core design method is to translate a project\u2019s constraints (programmatic requirements, site limitations, budget, codes) into a simple formal diagram \u2014 an approach referred to as \u201carchitectural alchemy.\u201d For example, the generative logic of 8 House (Copenhagen, 2010) was to \u201cbend\u201d a traditional courtyard block into a figure-eight, thereby creating a continuous path and ramp from ground to roof \u2014 residents can bicycle directly from the ground floor to the penthouse. This single formal operation simultaneously resolved the multiple issues of courtyard, sunlight, views, accessibility, and community interaction.',
            'For Ingels, the architect should not be the gatekeeper saying \u201cno\u201d to the client, but the enabler saying \u201cyes\u201d to all possibilities. This optimistic stance is a scarce commodity in contemporary architectural culture \u2014 in a world where critique and skepticism are the mainstream, Ingels\u2019s \u201cYes Is More\u201d sounds naive, but his built works prove it is not naive optimism but a practical skill for constructing complex interests. He is especially adept at mediating among government, developers, and the public, transforming conflicts into shared visions.',
          ],
        },
      },
      {
        title: { zh: 'CopenHill：当发电厂成为滑雪场', ja: 'コペンヒル——発電所がスキー場になるとき', en: 'CopenHill: When a Power Plant Becomes a Ski Slope' },
        paragraphs: {
          zh: [
            'CopenHill（2019年），正式名称为Amager Resource Center，是BIG最具代表性的\u201c享乐主义可持续性\u201d宣言。这座位于哥本哈根的废弃物发电厂——通常是最丑陋、最不受欢迎的市政基础设施——通过BIG的设计变成了世界上唯一一座拥有屋顶滑雪场的发电厂。一条450米长的倾斜屋顶覆盖着绿色人造草皮，设有四条不同难度的滑雪道、一条徒步小径和一面85米高的攀岩墙。',
            '这个设计的巧妙之处在于它没有回避发电厂作为工业设施的现实——烟囱依然在那里，但他将烟囱设计成了一个每当1吨二氧化碳被排放时就会吐出蒸汽烟圈的城市图腾。在BIG的眼中，污染不再是可以隐藏的羞耻，而是一个被转化为公共教育媒介的可视化过程。当地居民在工作日结束时，不是避开这片区域，而是主动来到这里喝咖啡、滑雪、欣赏海港景色。',
            '从工程方面看，CopenHill的屋顶坡道是一个巨大的混凝土壳结构，下面容纳着复杂的热回收和废物处理系统。将如此巨大的异形混凝土壳体整合到一个运作的工业设施之上是巨大的技术挑战，但最终的结果超越了一切的预期——它象征性地回答了当代城市的根本问题：如何让那些我们无法回避的不美好之物（垃圾、废气、基础设施）成为我们日常生活的一部分，甚至成为城市的骄傲？',
          ],
          ja: [
            'コペンヒル（2019年）、正式名称アマー·リソース·センターは、BIGの「快楽主義的持続可能性」のもっとも代表性の高い宣言である。コペンハーゲンに位置するこの廃棄物発電所——通常はもっとも醜く、もっとも歓迎されない市政基盤施設——がBIGの設計によって、屋上スキー場を備えた世界唯一の発電所へと姿を変えた。450メートルの傾斜屋根は緑色の人工芝で覆われ、4本の難易度別スキーコース、歩道、85メートルのクライミングウォールを備える。',
            'このデザインの巧妙さは、発電所という産業施設としての現実を回避していない点にある——煙突は依然としてそこにあり、しかし彼はその煙突を、1トンの二酸化炭素が排出されるたびに蒸気のスモークリングを吹き出す都市のトーテムとして設計した。BIGの目には、公害はもはや隠蔽すべき恥辱ではなく、公共教育メディアへと転換された可視化プロセスなのだ。地元住民は仕事の終わりにこのエリアを避けるのではなく、自らここに来てコーヒーを飲み、スキーをし、港の景色を楽しむ。',
            '工学的側面から見ると、コペンヒルの屋上傾斜路は巨大なコンクリート·シェル構造であり、その下には複雑な熱回収·廃棄物処理システムが収められている。これほど巨大な異形コンクリートシェルを作動中の産業施設の上に統合することは巨大な技術的挑戦であるが、その結果はあらゆる予想を超えた——この建築は象徴的に、現代都市の根本的な問いに答えている——ごみや廃ガスや基盤施設といった、私たちが回避できない「美しくないもの」を、どのようにして私たちの日常生活の一部にし、さらには都市の誇りに変えうるのか、という問いに。',
          ],
          en: [
            'CopenHill (2019), officially the Amager Resource Center, is BIG\u2019s most iconic manifesto of \u201chedonistic sustainability.\u201d This waste-to-energy plant in Copenhagen \u2014 typically the ugliest and least welcome of municipal infrastructures \u2014 was transformed through BIG\u2019s design into the world\u2019s only power plant with a rooftop ski slope. A 450-meter sloping roof clad in green artificial turf features four ski runs of varying difficulty, a hiking trail, and an 85-meter climbing wall.',
            'The ingenuity of this design lies in its refusal to deny the power plant\u2019s reality as an industrial facility \u2014 the smokestack is still there, but he designed the chimney as an urban totem that puffs a steam smoke ring each time one ton of CO\u2082 is emitted. In BIG\u2019s eyes, pollution is no longer a shame to hide but a visualized process transformed into a public education medium. At the end of the workday, local residents do not avoid this area but come here willingly to have coffee, ski, and enjoy the harbor views.',
            'From an engineering standpoint, CopenHill\u2019s rooftop slope is an enormous concrete shell structure housing complex heat recovery and waste treatment systems below. Integrating such a massive irregular concrete shell atop an operating industrial facility was a formidable technical challenge, but the result surpasses all expectations \u2014 it symbolically answers the fundamental question for contemporary cities: How can we make the unavoidably non-beautiful things (trash, exhaust, infrastructure) part of our everyday lives, even a source of civic pride?',
          ],
        },
      },
      {
        title: { zh: 'BIG的悖论：批评者的靶心与公众的热爱', ja: 'BIGのパラドックス——批評家の標的と大衆の愛', en: 'The BIG Paradox: Critics\u2019 Bullseye and Public Adoration' },
        paragraphs: {
          zh: [
            '没有哪个当代建筑事务所像BIG这样引发两极评价。在学术界和批评圈中，BIG经常被描述为肤浅的乐观主义、市场驱动的形式主义，或者是将复杂的社会和环境问题简化为过分精巧的图表。一个常见的批评是：BIG的建筑在图像的层面上太成功了——它们的Instagram友好度和传播力如此之强，以至于显得不够\u201c严肃\u201d。这等于是说：因为一个想法被太多人理解和喜欢，所以它必然是低价值的。',
            '然而在公众、客户和市政当局看来，BIG恰恰是他们想要的建筑师：有能力将最困难的问题（气候变化、住房危机、公共空间退化）转化为令人振奋的、具体的、可建造的提案。在纽约的VIA 57 West（2016）——一座将哥本哈根庭院和曼哈顿摩天楼合二为一的\u201cCourtscraper\u201d——BIG展示了如何在极端受限的市场条件下，仍然创造出一种全新的住宅类型：内凹的斜切庭院既提供私密绿洲，又保持了曼哈顿天际线上的存在感。',
            'BIG现象提出了一个深层问题：建筑师的公共角色究竟是什么？如果建筑应该为社会服务，那么当一个事务所通过赢得广泛的公众欢迎来影响城市和政治决策时——无论学术界如何评价——这不应该被认为是建筑的一种成功吗？Ingels在TED演讲中的一句话可能最好地概括了他的立场：\u201c与其批判我们不想要的世界，不如专注于建设我们想要的世界。\u201d在一个后批判和后真理的时代，这种建设性的乐观主义——不论你对它的审美品味如何——提供了一种罕见的、具体的希望。',
          ],
          ja: [
            'BIGほど両極端の評価を引き起こす現代建築事務所はない。学界と批評界では、BIGはしばしば浅薄な楽天主義、市場駆動の形式主義、あるいは複雑な社会·環境問題を過剰に洗練されたダイアグラムへと単純化するものとして描写される。よくある批判は——BIGの建築はイメージのレベルであまりに成功しすぎている。そのインスタグラム適合性と拡散力はきわめて強力で、あまりに「シリアス」でないように見える。これはつまり、「あるアイデアが多くの人に理解され好まれたがゆえに、それは必然的に低価値である」と言うに等しい。',
            'しかし公衆、クライアント、自治体から見れば、BIGはまさに彼らが欲する建築家である——最も困難な問題（気候変動、住宅危機、公共空間の劣化）を、心躍らせる具体的で建設可能な提案へと転換する能力をもつ。ニューヨークのVIA 57 West（2016）——コペンハーゲンの中庭とマンハッタンの高層ビルを一つに融合させた「コートスクレイパー」——において、BIGは極度に制約された市場条件のもとで、まったく新しい住宅類型を創り出せることを示した。抉り込まれた斜めの中庭は、プライベートなオアシスを提供しつつ、マンハッタンのスカイライン上の存在感を保つ。',
            'BIG現象は深い問いを投げかける——建築家の公共的役割とはいったい何なのか？ 建築が社会に奉仕すべきであるならば、ある事務所が広範な公衆の支持を勝ち取ることで都市と政治の意思決定に影響を与えているとき——学界がどう評価しようと——それは建築の一つの成功と見なされるべきではないのか？ TEDトークでのインゲルスの言葉は、おそらく彼の立場を最もよく要約している——「私たちが望まない世界を批判することに専念するよりも、私たちが望む世界を建設することに集中しよう」。ポスト批判とポスト真実の時代にあって、この建設的な楽天主義は——あなたがその審美的趣味をどう思おうと——希少な、具体的な希望を提供している。',
          ],
          en: [
            'No contemporary architectural firm provokes such polarized assessments as BIG. In academic and critical circles, BIG is often described as superficial optimism, market-driven formalism, or the reduction of complex social and environmental issues to overly slick diagrams. A common critique: BIG\u2019s buildings are too successful at the level of the image \u2014 their Instagram-friendliness and shareability are so potent that they appear insufficiently \u201cserious.\u201d This is tantamount to saying: because an idea is understood and liked by too many people, it must be of low value.',
            'Yet from the perspective of the public, clients, and municipalities, BIG is exactly the architect they want: capable of transforming the most difficult problems (climate change, housing crisis, public space degradation) into exhilarating, concrete, buildable proposals. In VIA 57 West (2016) in New York \u2014 a \u201cCourtscraper\u201d fusing the Copenhagen courtyard and the Manhattan skyscraper into one \u2014 BIG demonstrated how, under extremely constrained market conditions, an entirely new housing typology could be created: the scooped, chamfered courtyard provides a private oasis while maintaining presence on the Manhattan skyline.',
            'The BIG phenomenon poses a deep question: What exactly is the architect\u2019s public role? If architecture is meant to serve society, then when a firm influences urban and political decision-making by winning broad public appeal \u2014 whatever the academy may think \u2014 should this not be regarded as a form of architectural success? A line from Ingels\u2019s TED Talk perhaps best summarizes his position: \u201cRather than dedicating ourselves to criticizing the world we don\u2019t want, let\u2019s focus on building the world we do want.\u201d In a post-critical and post-truth era, this constructive optimism \u2014 regardless of your aesthetic taste for it \u2014 provides a rare, concrete hope.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'copenhill', note: { zh: '垃圾焚烧发电厂屋顶上的滑雪场，享乐主义可持续性的纪念碑，工业基础设施的公共化革命。', ja: 'ゴミ焼却発電所の屋上にのったスキー場。快楽主義的持続可能性の記念碑、産業基盤施設の公共化革命。', en: 'A ski slope atop a waste-to-energy plant, a monument to hedonistic sustainability, a revolution in the public-ization of industrial infrastructure.' } },
      { slug: '8-house', note: { zh: '8字形社区，从地面到屋顶的连续坡道，让自行车和邻里交往垂直流动。', ja: '8の字形コミュニティ。地面から屋上まで連続する傾斜路が、自転車と近隣交流を垂直に流動させる。', en: 'A figure-eight community, a continuous ramp from ground to roof, allowing bicycles and neighborly interaction to flow vertically.' } },
      { slug: 'lego-house', note: { zh: '比例精确如同放大的乐高积木，在比隆的故乡，一座献给创造力本身的建筑。', ja: 'プロポーションが拡大されたレゴブロックのように精確。ビルンのふるさとで、創造力そのものに捧げられた建築。', en: 'Proportioned precisely like an enlarged Lego brick, in the hometown of Billund, a building dedicated to creativity itself.' } },
    ],
    sources: [
      { title: 'BIG \u2014 Official Website', url: 'https://big.dk/' },
      { title: 'Yes Is More (2009) \u2014 Bjarke Ingels', url: 'https://big.dk/#books-yes-is-more' },
      { title: 'Wikidata: Bjarke Ingels', url: 'https://www.wikidata.org/wiki/Q346929' },
    ],
  },

  'norman-foster': {
    slug: 'norman-foster',
    summary: {
      zh: '英国高科技建筑先驱，全球最重要的建筑实践者之一，以精密工程、结构表现主义和生态敏感性重新定义了21世纪的摩天楼和大型公共建筑。',
      ja: 'イギリスのハイテク建築の先駆者。世界で最も重要な建築実践者の一人であり、精密工学、構造表現主義、生態学的感受性によって、21世紀の超高層ビルと大規模公共建築を再定義した。',
      en: 'British high-tech architecture pioneer, one of the world\u2019s most important architectural practitioners, who has redefined the 21st-century skyscraper and large public building through precision engineering, structural expressionism, and ecological sensitivity.',
    },
    core_ideas: {
      zh: [
        '技术作为解放的力量：精密工程技术不是冷冰冰的工具，而是创造更优雅、更人性化空间的手段。',
        '高性能表皮：建筑立面不仅是被动围护结构，而是主动调节气候、能量和光线的智能皮肤。',
        '结构即建筑：结构力学的逻辑直接表现为建筑的形式，取消装饰与结构的二分。',
        '适应性通用空间：大型灵活的通用空间可以随时代需求演变，建筑应为其未来的未知用途预留弹性。',
        '生态与技术的融合：高技术不等于高能耗，超级建筑可以通过精密的节能策略实现超出常规的环境表现。',
      ],
      ja: [
        '解放の力としてのテクノロジー：精密工学は冷たいツールではなく、より優雅で人間的な空間を創りだす手段である。',
        '高性能表皮：建築のファサードは受動的な囲いではなく、気候、エネルギー、光を能動的に調整する知的皮膚である。',
        '構造が建築である：構造力学の論理が直接に建築の形式としてあらわれ、装飾と構造の二分法が解消される。',
        '適応的ユニバーサルスペース：大規模で柔軟な汎用空間は時代のニーズにともなって進化でき、建築はその未来の未知の用途のために弾力性を留保すべきである。',
        'エコロジーとテクノロジーの融合：ハイテクは高エネルギー消費を意味せず、超高層建築は精密な省エネルギー戦略によって、通常を超える環境性能を達成できる。',
      ],
      en: [
        'Technology as a liberating force: Precision engineering is not a cold tool but a means to create more elegant, more humane spaces.',
        'High-performance skin: The building fa\u00e7ade is not a passive enclosure but an intelligent skin that actively regulates climate, energy, and light.',
        'Structure is architecture: The logic of structural mechanics manifests directly as architectural form, dissolving the dichotomy of decoration and structure.',
        'Adaptive universal space: Large, flexible universal spaces can evolve with the needs of the times; buildings should reserve elasticity for unknown future uses.',
        'Fusion of ecology and technology: High-tech does not mean high energy consumption; super-buildings can achieve environmental performance exceeding the norm through precise energy-saving strategies.',
      ],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Norman_Foster_2018.jpg',
      author: 'Jorge Figueroa',
      license: 'CC BY 2.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Norman_Foster_2018.jpg',
      alt: { zh: 'Norman Foster 肖像，2018年', ja: 'ノーマン・フォスターの肖像、2018年', en: 'Portrait of Norman Foster, 2018' },
    },
    sections: [
      {
        title: { zh: '从曼彻斯特到世界：一个工科男孩的全球建筑帝国', ja: 'マンチェスターから世界へ——工学少年のグローバル建築帝国', en: 'From Manchester to the World: An Engineer Boy\u2019s Global Architectural Empire' },
        paragraphs: {
          zh: [
            'Norman Foster（1935\u2013）的成长故事是一部勤奋胜利的传奇。他出生在曼彻斯特的一个工薪家庭，父亲是工厂油漆工。16岁时他辍学进入曼彻斯特市政厅财务部做职员，但利用业余时间自学绘画和建筑。服役于皇家空军期间，他获得了工程学的实际训练。当他最终进入曼彻斯特大学建筑系时，他已经是一个经历过真实世界磨砺的成年人——这与那些直接从学校到学校的建筑精英截然不同。',
            '1963年，Foster与Richard Rogers、Su Rogers和Wendy Cheesman共同创立了Team 4——英国高科技建筑运动的一个胚胎。虽然Team 4仅维持了四年，但在这短暂的时间里，它孕育了影响深远的理念：建筑可以像机器一样优雅，空间可以像飞机机库一样自由，骨架结构应当诚实表达而非包裹隐藏。1967年Foster成立了自己的事务所Foster Associates（后改名Foster + Partners），开始了长达半个多世纪的建筑生产。',
            'Foster的真正突破来自1970年代的Willis Faber and Dumas Headquarters（伊普斯维奇，1975）。这座建筑引入了他后来反复使用的标志性元素：深色反光玻璃幕墙（在夜间变成一个镜面）、自由曲线的平面（追随中世纪街道线的有机弧线）、屋顶花园和游泳池（将郊区的舒适引入城市办公环境）。它也确立了一个Foster模式：一座建筑改变了他的客户对他的认知，使他获得了下一座更大更好的建筑。',
          ],
          ja: [
            'ノーマン·フォスター（1935\u2013）の成長物語は、勤勉の勝利の伝説である。マンチェスターの労働者階級の家庭に生まれ、父は工場の塗装工だった。16歳で学校を中退し、マンチェスター市庁舎財務部で事務員として働いたが、余暇に独学でデッサンと建築を学んだ。英国空軍での服務中に実際の工学訓練を積んだ。彼が最終的にマンチェスター大学建築学科に入学したときには、すでに現実の世界で鍛えられた一人の大人だった——学校から学校へと進む建築エリートとはまったく異なる存在である。',
            '1963年、フォスターはリチャード·ロジャース、スー·ロジャース、ウェンディ·チーズマンとともにチーム4を共同設立した——英国ハイテク建築運動の胎芽である。チーム4はわずか4年しか存続しなかったが、その短い期間に深遠な影響をもつ理念が育まれた——建築は機械のように優雅たりうる、空間は航空機格納庫のように自由たりうる、骨格構造は包み隠すのではなく誠実に表現されるべきだ。1967年、フォスターは自身の事務所フォスター·アソシエイツ（後のフォスター·アンド·パートナーズ）を設立し、半世紀以上にわたる建築生産を開始した。',
            'フォスターの真の突破口は1970年代のウィリス·フェイバー·アンド·デュマ本社（イプスウィッチ、1975年）だった。この建築は彼が後に反復的に用いることになる象徴的要素を導入した——濃色の反射ガラス·カーテンウォール（夜間には鏡面と化す）、自由曲線の平面（中世の街路ラインに沿った有機的弧線）、屋上庭園とプール（郊外の快適さを都市のオフィス環境に持ち込む）。これもまた一つのフォスターモデルを確立した——一つの建築がクライアントの彼に対する認識を変え、次のより大きくより優れた建築へとつながる。',
          ],
          en: [
            'The growth story of Norman Foster (1935\u2013) is a legend of hard work\u2019s triumph. He was born into a working-class family in Manchester, his father a factory painter. At 16 he left school to work as a clerk in the Manchester Town Hall treasury but used his spare time to teach himself drawing and architecture. During his service in the Royal Air Force he gained hands-on engineering training. By the time he finally entered the Manchester University School of Architecture, he was already an adult tempered by the real world \u2014 utterly unlike the architectural elite who go from school to school.',
            'In 1963, Foster co-founded Team 4 with Richard Rogers, Su Rogers, and Wendy Cheesman \u2014 an embryo of the British high-tech architecture movement. Though Team 4 lasted only four years, in that brief time it incubated ideas of profound influence: architecture can be as elegant as a machine, space as free as an aircraft hangar, and the skeletal structure should be honestly expressed rather than wrapped and hidden. In 1967 Foster founded his own firm Foster Associates (later renamed Foster + Partners), beginning more than half a century of architectural production.',
            'Foster\u2019s true breakthrough came with the Willis Faber and Dumas Headquarters (Ipswich, 1975). This building introduced signature elements he would repeatedly use: a dark reflective glass curtain wall (turning into a mirror at night), a free-curve plan (an organic arc following the medieval street line), and rooftop gardens with a swimming pool (bringing suburban comfort into an urban office environment). It also established a Foster pattern: one building changing his client\u2019s perception of him, leading to the next bigger and better building.',
          ],
        },
      },
      {
        title: { zh: '香港汇丰银行大厦：一座被拆开来看的建筑', ja: '香港上海銀行ビル——ばらばらにして見る建築', en: 'HSBC Hong Kong Headquarters: A Building Meant to Be Taken Apart' },
        paragraphs: {
          zh: [
            '1986年完成的香港汇丰银行大厦是Foster最重要的作品之一，也是他建筑哲学最纯粹的体现。这座47层的大楼是当时世界上最昂贵的建筑（约折合今天的20亿美元），但它不是一座典型的摩天楼：它没有中央核心筒，而是将所有的垂直交通和服务空间推到建筑的两端，释放出一个52米高的、无柱的、自由平面的银行大厅——这也许是世界上最为壮观的室内公共空间之一。',
            '这座建筑的结构系统是其革命性的核心：由8组巨型钢桅杆（每两根桅杆一组）通过悬吊系统支撑楼板，就像桥梁的结构逻辑被翻转为垂直。每一层楼板被从上方悬吊，而非从下方支撑——这意味着结构构件可以更纤细、更少。但最引人注目的是Foster将整个结构完全暴露的理念：客梯电梯、自动扶梯、空调管道和结构连接节点全部可见，像一个巨大的透明手表内部机械。建筑不再是传统意义上\u201c遮蔽结构\u201d的盒子，而是一个展示结构之美的展示柜。',
            '最前瞻的设计也许是它的模块化适应性：所有的楼板和设备都是预制的模块化单元，可以在周末更换而不影响其他楼层的正常运营。建筑的地板也是可拆卸的底板，方便随时维护和升级管线系统。在1980年代，这已经是对未来建筑弹性的惊人远见。香港汇丰银行大厦不是一座静态的纪念碑，而是一台持续运转的、为变化而设计的机器。',
          ],
          ja: [
            '1986年に完成した香港上海銀行本店ビルは、フォスターの最も重要な作品の一つであり、彼の建築哲学の最も純粋な体現である。この47階建てのビルは当時世界で最も高価な建築だった（今日の換算で約20億ドル相当）が、それは典型的な摩天楼ではない。中央のコアがなく、すべての垂直動線とサービス空間を建築の両端に押し出し、52メートルの高さをもつ、柱のない、自由平面の銀行ホール——おそらく世界で最も壮観な屋内公共空間の一つ——を解放している。',
            'この建築の構造システムこそが革命的核である。8組の巨大な鉄骨マスト（2本ずつ一組）が吊り下げシステムによって床版を支えており、あたかも橋梁の構造論理が垂直に反転されたかのようだ。各階の床版は下から支えられるのではなく、上から吊り下げられる——これは構造部材がより細く、より少なくてよいことを意味する。しかし最も人目を引くのは、フォスターが構造全体を完全に露出させるという理念である。乗用エレベーター、エスカレーター、空調ダクト、構造接合部のすべてが可視化され、巨大な透明時計の内部機構のようだ。建築はもはや伝統的な意味で「構造を覆い隠す」箱ではなく、構造の美しさを展示するショーケースなのである。',
            'おそらく最も先見的な設計は、そのモジュール化された適応性である。すべての床版と設備はプレファブリケーションされたモジュール化ユニットであり、週末のあいだに交換することができ、他の階の通常業務に影響を与えない。建築の床も取り外し可能な底板で、いつでも配管·配線システムの維持·更新が容易である。1980年代において、これはすでに未来の建築弾力性に対する驚くべき先見の明だった。香港上海銀行本店ビルは静的な記念碑ではなく、変化のために設計された、継続的に稼働する機械なのだ。',
          ],
          en: [
            'The HSBC Hong Kong Headquarters, completed in 1986, is one of Foster\u2019s most important works and the purest embodiment of his architectural philosophy. This 47-story building was the most expensive building in the world at the time (roughly equivalent to $2 billion today), but it is not a typical skyscraper: it has no central core, instead pushing all vertical circulation and service spaces to the two ends of the building, freeing a 52-meter-high, column-free, free-plan banking hall \u2014 perhaps one of the most spectacular interior public spaces in the world.',
            'The building\u2019s structural system is its revolutionary core: eight sets of enormous steel masts (two per set) support the floor slabs through a suspension system, as if the structural logic of a bridge had been flipped vertically. Each floor slab is hung from above rather than supported from below \u2014 meaning the structural members can be slimmer and fewer. But what is most striking is Foster\u2019s philosophy of exposing the entire structure: passenger elevators, escalators, air-conditioning ducts, and structural connection joints are all visible, like the interior mechanism of a giant transparent watch. Architecture is no longer a box that \u201cconceals structure\u201d in the traditional sense but a display case that showcases the beauty of structure.',
            'Perhaps the most prescient design is its modular adaptability: all floor slabs and services are prefabricated modular units that can be replaced over a weekend without affecting the normal operations of other floors. The building\u2019s floor panels are also removable access floors, facilitating the easy maintenance and upgrade of piping and cabling systems at any time. In the 1980s, this was already astonishing foresight into the resilience of future buildings. The HSBC Hong Kong Headquarters is not a static monument but a continuously operating machine designed for change.',
          ],
        },
      },
      {
        title: { zh: '从Gherkin到Apple Park：高科技建筑的进化', ja: 'ガーキンからアップルパークへ——ハイテク建築の進化', en: 'From the Gherkin to Apple Park: The Evolution of High-Tech Architecture' },
        paragraphs: {
          zh: [
            '30 St Mary Axe（伦敦，2004），俗称\u201c小黄瓜\u201d（The Gherkin），标志着Foster事务所从工业表现主义向生态性能的转向。这座41层塔楼的子弹形轮廓不仅是美学选择，更是精密空气动力学计算的结果：曲线形态减少了风荷载和下沉气流，底部的收缩让街道水平的风环境更舒适。每六层的螺旋中庭提供自然通风，使能耗比同等规模的常规办公塔楼低约50%。一个看似纯粹形式的标志物，实际上是精密性能工程的产物——这正是Foster的建筑学精髓所在。',
            'Apple Park（库比蒂诺，2017）代表了Foster设计方法的另一面向：极致的纯粹性。巨大的环形建筑（直径461米）被一个连续的弧形玻璃幕墙包裹——世界最大的弧形玻璃面板（每块面积约45平方米）。屋顶覆盖完全由太阳能板组成。80%的场地被恢复为本土景观，包含9000多棵树木。与汇丰银行或Gherkin不同，Apple Park几乎没有可见的结构表达——它的目标是成为极简主义的终极宣言：一个如此纯粹、如此安静的环形空间，以至于技术本身消失于无形。',
            '在长达60年的实践中，Foster完成了一条从技术表达到技术隐退的弧线：从汇丰银行的壮观结构交响曲到Gherkin的生态流线形再到Apple Park的极致抽象。但他的底层逻辑从未改变：对精准的崇拜，对工程与建筑之间边界的瓦解，以及对\u201c好的建筑可以使人们的生活更好\u201d这一信念的不懈坚持。他可能是英国历史上最具影响力的建筑师——不是因为他创造了一种特定的风格，而是因为他重新定义了建筑师在世界中的角色：不是形式的诗人，而是问题的解决者。',
          ],
          ja: [
            '30 St Mary Axe（ロンドン、2004年）——通称「ガーキン」（きゅうり）——は、フォスター事務所が産業表現主義から生態学的性能へと旋回する転機を告げる。この41階建てのタワーの砲弾形の輪郭は美学上の選択にとどまらず、精密な空気力学的計算の結果である。曲線形状は風荷重とダウンウォッシュ（下降気流）を軽減し、底部の絞り込みが街路レベルの風環境をより快適にする。6階ごとの螺旋状のアトリウムが自然換気を提供し、同等規模の通常のオフィスタワーよりエネルギー消費を約50パーセント低減する。一見すると純粋に形式的なアイコンが、実は精密な性能工学の産物である——これこそフォスター建築学の精髄である。',
            'アップルパーク（クパチーノ、2017年）はフォスターの設計手法のもう一つの側面を代表する——究極の純粋性。巨大なリング状の建築（直径461メートル）は、連続する弧状のガラス·カーテンウォールで包まれている——世界最大の弧状ガラスパネル（一枚あたり約45平方メートル）。屋根は全面的にソーラーパネルで覆われている。敷地の80パーセントは在来種の景観に回復され、9000本以上の樹木を含む。香港上海銀行やガーキンとは異なり、アップルパークにはほとんど可視的な構造表現がない——その目標はミニマリズムの究極の宣言であることだ。技術そのものが不可視となるほど純粋で、静かなリング状の空間。',
            '60年にわたる実践のなかで、フォスターは技術の表現から技術の退隠へという弧を描ききった——香港上海銀行の壮観な構造交響曲から、ガーキンの生態流線形へ、そしてアップルパークの究極の抽象へ。しかし彼の底流の論理はいささかも変わらなかった——精度への崇拝、工学と建築の境界線の瓦解、そして「優れた建築は人々の生活をより良くすることができる」という信念への不屈の堅持。彼はおそらくイギリス史上最も影響力のある建築家である——それは彼が特定のスタイルを創造したからではなく、世界における建築家の役割を再定義したからだ——形式の詩人ではなく、問題の解決者として。',
          ],
          en: [
            '30 St Mary Axe (London, 2004), popularly known as \u201cThe Gherkin,\u201d marks Foster\u2019s shift from industrial expressionism toward ecological performance. The bullet-shaped profile of this 41-story tower is not only an aesthetic choice but the result of precise aerodynamic calculations: the curved form reduces wind loads and downwash, while the narrowing at the base makes the wind environment at street level more comfortable. Spiral atria at every six floors provide natural ventilation, reducing energy consumption by roughly 50 percent compared to a conventional office tower of equivalent scale. An icon that appears to be pure form is in fact the product of precise performance engineering \u2014 this is the essence of Foster\u2019s architecture.',
            'Apple Park (Cupertino, 2017) represents another facet of Foster\u2019s design approach: extreme purity. The enormous ring-shaped building (461 meters in diameter) is wrapped in a continuous curved glass curtain wall \u2014 the world\u2019s largest curved glass panels (each approximately 45 square meters). The roof is entirely covered with solar panels. Eighty percent of the site has been restored to native landscape, containing over 9,000 trees. Unlike HSBC or the Gherkin, Apple Park has almost no visible structural expression \u2014 its goal is to be the ultimate statement of minimalism: a ring so pure, so quiet, that technology itself disappears into invisibility.',
            'Over a practice spanning six decades, Foster has traced an arc from the expression of technology to its retreat: from the spectacular structural symphony of HSBC to the ecological streamlining of the Gherkin to the ultimate abstraction of Apple Park. Yet his underlying logic has never changed: the worship of precision, the dissolution of the boundary between engineering and architecture, and the unflagging conviction that \u201cgood architecture can make people\u2019s lives better.\u201d He may be the most influential architect in British history \u2014 not because he created a particular style but because he redefined the architect\u2019s role in the world: not a poet of form, but a solver of problems.',
          ],
        },
      },
    ],
    representative_works: [
      { slug: 'the-gherkin', note: { zh: '伦敦天空线上的子弹形生态塔楼，空气动力学形状与自然通风系统使能耗降低50%。', ja: 'ロンドンのスカイラインの砲弾形エコロジカルタワー。空気力学的形状と自然換気システムがエネルギー消費を50%低減する。', en: 'A bullet-shaped ecological tower on the London skyline, where aerodynamic shape and natural ventilation systems reduce energy consumption by 50%.' } },
      { slug: 'apple-park', note: { zh: '世界最大弧形玻璃面板包裹的环形建筑，极简主义的终极表达，技术隐退于完美的几何之中。', ja: '世界最大の弧状ガラスパネルで包まれたリング状建築。ミニマリズムの究極的表現——技術が完璧な幾何学のなかに退隠する。', en: 'A ring-shaped building wrapped in the world\u2019s largest curved glass panels, the ultimate expression of minimalism, where technology retreats into perfect geometry.' } },
      { slug: 'hongkong-bank', note: { zh: '悬吊楼板的金融殿堂，一座展示骨骼之美的透明机器，可更换的器官设计远见未来。', ja: '吊り下げ床版の金融殿堂。骨格の美しさを見せる透明な機械、交換可能な臓器設計が未来を見据える。', en: 'A financial hall of suspended floor slabs, a transparent machine displaying the beauty of its skeleton, with replaceable organ design that foresees the future.' } },
    ],
    sources: [
      { title: 'Foster + Partners', url: 'https://www.fosterandpartners.com/' },
      { title: 'Norman Foster \u2014 Pritzker Prize', url: 'https://www.pritzkerprize.com/laureates/1999' },
      { title: 'Wikidata: Norman Foster', url: 'https://www.wikidata.org/wiki/Q104898' },
    ],
  },

}

const overlayAliases: Record<string, string> = {
  aalto: 'alvar-aalto',
}

export function getArchitectContent(slug: string): ArchitectContentOverlay | null {
  return overlays[slug] || overlays[overlayAliases[slug]] || null
}

export const featuredArchitectContentSlugs = Object.keys(overlays)
