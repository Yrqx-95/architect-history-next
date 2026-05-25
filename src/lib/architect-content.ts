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
  'richard-neutra': {
    slug: 'richard-neutra',
    summary: {
      zh: '理查德·诺伊特拉把欧洲现代主义带入南加州，并把住宅理解为身体、心理和气候共同作用的装置。他的玻璃、钢、悬挑和水平线条并非冷酷形式，而是为了让居住者与光、空气和景观建立连续关系。',
      ja: 'リチャード・ノイトラはヨーロッパの近代主義を南カリフォルニアへ移し、住宅を身体、心理、気候が交差する装置として考えた。ガラス、鉄、キャンチレバー、水平線は冷たい形式ではなく、住み手を光、空気、風景へ連続させる手段だった。',
      en: 'Richard Neutra connected modern domestic space with climate, psychology, and landscape.',
    },
    core_ideas: {
      zh: ['住宅作为身心调节装置', '南加州气候与玻璃现代主义', '室内外连续的生活场景', '轻质结构、悬挑和水平线条'],
      ja: ['住宅を心身の調整装置として考える', '南カリフォルニアの気候とガラスの近代主義', '内外が連続する生活場面', '軽い構造、キャンチレバー、水平線'],
      en: ['Biorealism', 'Indoor-outdoor continuity', 'Climate-sensitive modernism', 'Light structure and horizontal space'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Richard_J._Neutra_holding_photograph_of_Beard_House.jpg',
      author: 'Los Angeles Times',
      license: 'CC BY 4.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Richard_J._Neutra_holding_photograph_of_Beard_House.jpg',
      alt: { zh: '理查德·诺伊特拉肖像', ja: 'リチャード・ノイトラの肖像', en: 'Portrait of Richard Neutra' },
    },
    sections: [
      {
        title: { zh: '从维也纳到洛杉矶', ja: 'ウィーンからロサンゼルスへ', en: 'Vienna to Los Angeles' },
        paragraphs: {
          zh: [
            '诺伊特拉在维也纳接受教育，带着欧洲现代主义关于结构、卫生、标准化和社会改革的信念来到美国。洛杉矶给了他另一种实验条件：强烈日照、开阔地形、汽车城市、电影工业和新兴中产住宅市场。现代主义在这里不再只是白色城市的理想，而变成了关于气候、景观和心理舒适的居住技术。',
            '他提出的“生物现实主义”强调建筑要回应人的神经、感官和行为模式。这个概念有时代局限，但也解释了诺伊特拉住宅为什么总是在玻璃、平台、水面、绿植和远景之间寻找平衡。住宅不只是房间组合，而是让居住者在都市压力与自然感知之间重新定位自己的仪器。',
          ],
          ja: [
            'ノイトラはウィーンで教育を受け、構造、衛生、標準化、社会改革をめぐるヨーロッパ近代主義の信念をアメリカへ持ち込んだ。ロサンゼルスは彼に別の実験条件を与えた。強い日射、開いた地形、自動車都市、映画産業、新しい中産階級の住宅市場である。近代主義は白い都市の理想ではなく、気候、風景、心理的な快適さを扱う住まいの技術になった。',
            '彼の「バイオリアリズム」は、建築が人間の神経、感覚、行動に応答すべきだという考えである。時代的な限界はあるが、ノイトラの住宅がガラス、テラス、水面、植栽、遠景の均衡を探る理由を説明している。住宅は部屋の集合ではなく、都市の緊張と自然の知覚の間で住み手を調整する装置となる。',
          ],
          en: ['Neutra translated European modernism through Southern California climate and psychology.'],
        },
      },
      {
        title: { zh: '透明性与控制', ja: '透明性と制御', en: 'Transparency and control' },
        paragraphs: {
          zh: [
            '诺伊特拉作品中的透明性并不是完全开放。大玻璃面、细钢柱和滑动门制造室内外连续，但遮阳、屋檐、平台高差和视线方向同样精确。考夫曼沙漠住宅看似轻盈地漂浮在棕榈泉景观中，实际上通过十字形平面、屋顶板和外部活动平台控制炎热、眩光和私密性。',
            '这种“开放中的控制”也是他住宅现代性的关键。诺伊特拉希望房子把人带向自然，但不是浪漫地回到自然；自然被框取、调节、过滤，成为现代生活的一部分。正因如此，他的住宅既像机器，也像气候中的相机，持续校准人与环境的关系。',
          ],
          ja: [
            'ノイトラ作品の透明性は、完全な開放ではない。大きなガラス面、細い鉄柱、引き戸は内外を連続させるが、日除け、庇、テラスの段差、視線の向きも精密に制御される。カウフマン砂漠住宅はパームスプリングスの風景に軽く浮かぶように見えるが、十字形の平面、屋根スラブ、外部テラスによって暑さ、眩しさ、私密性を調整している。',
            'この「開放の中の制御」が彼の住宅の近代性である。自然へ人を向かわせるが、素朴に自然へ戻すのではない。自然は切り取られ、調整され、濾過され、近代生活の一部になる。彼の住宅は機械であると同時に、気候の中のカメラのように人と環境を測り続ける。',
          ],
          en: ['Neutra combined openness with exact environmental control.'],
        },
      },
      {
        title: { zh: '战后住宅文化的形象', ja: '戦後住宅文化のイメージ', en: 'Image of postwar living' },
        paragraphs: {
          zh: [
            '诺伊特拉的影响不仅来自建筑本身，也来自它们被摄影传播的方式。清晰的水平线、夜间发光的玻璃、泳池边的白色平台和沙漠背景，构成了战后美国西海岸现代生活的强烈图像。这种图像后来被大量复制，也被商业化消费，但其源头包含严肃的居住研究。',
            '今天回看诺伊特拉，重要的是同时看到两面：一面是光洁、优雅、近乎电影化的现代住宅形象；另一面是他对健康、气候、心理和日常行为的持续关注。前者让他成为现代主义偶像，后者让他的作品仍值得被细读。',
          ],
          ja: [
            'ノイトラの影響は建物そのものだけでなく、それらが写真によって流通した方法にもある。明快な水平線、夜に光るガラス、プール際の白いテラス、砂漠の背景は、戦後アメリカ西海岸の近代的生活の強いイメージをつくった。このイメージは後に大量に複製され、商業的にも消費されたが、その出発点には真剣な住環境の研究がある。',
            '現在ノイトラを見るときには、二つの面を同時に見る必要がある。一つは滑らかで優雅で映画的な近代住宅の像。もう一つは、健康、気候、心理、日常行動への継続的な関心である。前者は彼をアイコンにし、後者は作品を読み直す理由を与える。',
          ],
          en: ['Neutra shaped both the image and environmental intelligence of postwar modern living.'],
        },
      },
    ],
    representative_works: [
      { slug: 'neutra-vdl-studio-and-residences', note: { zh: '作为自宅和实验室，集中呈现诺伊特拉对光、通风、屋顶花园和紧凑城市居住的研究。', ja: '自邸であり実験室でもあり、光、通風、屋上庭園、都市的な小さな住まいへの研究が凝縮されている。', en: 'A compact urban laboratory.' } },
      { slug: 'kaufmann-desert-house', note: { zh: '以十字形平面、薄屋顶和外部平台调节沙漠环境，成为加州现代住宅的标志性图像。', ja: '十字形平面、薄い屋根、外部テラスで砂漠環境を調整し、カリフォルニア近代住宅の象徴的イメージとなった。', en: 'A desert icon of modern domestic space.' } },
      { slug: 'constance-perkins-house', note: { zh: '小尺度住宅中仍保持室内外连续和精确视线控制，显示诺伊特拉方法的日常性。', ja: '小さな住宅でも内外の連続と視線制御を保ち、ノイトラの方法の日常性を示す。', en: 'A modest house with precise environmental control.' } },
    ],
    sources: [
      { title: 'Neutra Institute', url: 'https://neutra.org/' },
      { title: 'Wikidata: Richard Neutra', url: 'https://www.wikidata.org/wiki/Q84312' },
      { title: 'UCLA Library / Commons portrait source', url: 'https://digital.library.ucla.edu/catalog/ark:/21198/zz002cwx90' },
    ],
  },
  'marcel-breuer': {
    slug: 'marcel-breuer',
    summary: {
      zh: '马塞尔·布劳耶从包豪斯家具实验出发，后来成为粗野主义与战后公共建筑的重要人物。他的路径横跨椅子、住宅、修道院、博物馆和政府建筑，核心始终是材料、结构和体量的清晰表达。',
      ja: 'マルセル・ブロイヤーはバウハウスの家具実験から出発し、戦後の公共建築とブルータリズムを代表する建築家となった。椅子、住宅、修道院、美術館、政府庁舎を横断し、素材、構造、量塊を明快に表現した。',
      en: 'Marcel Breuer moved from Bauhaus furniture to powerful postwar concrete architecture.',
    },
    core_ideas: {
      zh: ['从家具尺度理解结构', '材料诚实与构造清晰', '混凝土体量的雕塑性', '公共建筑中的重量、阴影和秩序'],
      ja: ['家具の尺度から構造を考える', '素材の正直さと構法の明快さ', 'コンクリート量塊の彫刻性', '公共建築における重さ、影、秩序'],
      en: ['Structure from furniture scale', 'Material honesty', 'Sculptural concrete mass', 'Weight and shadow in public architecture'],
    },
    portrait: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Marcel_Breuer_%28cropped%29.jpg',
      author: 'Herbert Behrens / Anefo',
      license: 'CC BY-SA 4.0',
      source_url: 'https://commons.wikimedia.org/wiki/File:Marcel_Breuer_(cropped).jpg',
      alt: { zh: '马塞尔·布劳耶肖像', ja: 'マルセル・ブロイヤーの肖像', en: 'Portrait of Marcel Breuer' },
    },
    sections: [
      {
        title: { zh: '从钢管椅到建筑结构', ja: '鋼管椅から建築構造へ', en: 'From tubular steel to architecture' },
        paragraphs: {
          zh: [
            '布劳耶在包豪斯时期以钢管家具闻名，这段经历不是建筑生涯之外的插曲，而是他理解现代结构的起点。家具要求材料轻、节点清楚、身体尺度精确；这些原则后来被他带入住宅和公共建筑，只是尺度从椅子扩展到房间、墙体和城市街区。',
            '他的早期住宅常在轻质结构、悬挑体量和开放平面之间寻找平衡。与密斯式的极端透明不同，布劳耶更关心构件之间的重量关系：什么被抬起，什么被压住，什么以阴影呈现。即使在小住宅中，他也把现代主义理解为构造秩序，而不只是平面自由。',
          ],
          ja: [
            'ブロイヤーはバウハウス時代に鋼管家具で知られたが、それは建築家としての仕事の外側にある挿話ではない。軽い素材、明快な接合、身体寸法への精度は、後の住宅や公共建築へ移され、椅子の尺度が部屋、壁、都市の尺度へ拡張された。',
            '初期住宅では、軽い構造、キャンチレバー、開いた平面の均衡が探られる。ミース的な透明性とは異なり、ブロイヤーは部材相互の重さに関心をもった。何が持ち上げられ、何が押さえられ、何が影として見えるのか。小住宅でも近代主義を単なる自由平面ではなく、構法の秩序として捉えた。',
          ],
          en: ['Breuer extended Bauhaus furniture logic into architectural structure.'],
        },
      },
      {
        title: { zh: '混凝土的重量与公共性', ja: 'コンクリートの重さと公共性', en: 'Concrete and public weight' },
        paragraphs: {
          zh: [
            '战后布劳耶逐渐转向大型公共建筑和宗教建筑，混凝土成为他最重要的媒介。圣约翰修道院、联合国教科文组织会议中心、惠特尼美术馆旧馆和联邦办公建筑都显示出厚重体量、深窗洞、斜切面和强烈阴影的语言。它们不追求轻盈，而是把建筑的重量变成公共存在感。',
            '这也是布劳耶与粗野主义相关的重要原因。不过他的混凝土并非简单粗糙；许多作品中，墙体比例、开口节奏、入口压缩和室内采光都经过细致控制。粗粝表面背后，是包豪斯训练留下的构造纪律。',
          ],
          ja: [
            '戦後のブロイヤーは大型の公共建築や宗教建築へ向かい、コンクリートが最も重要な媒体となった。セント・ジョンズ修道院、ユネスコ会議棟、旧ホイットニー美術館、連邦庁舎には、重い量塊、深い窓、斜めに切られた面、強い影が現れる。軽さを求めるのではなく、建築の重さを公共的な存在感へ変えた。',
            'このためブロイヤーはブルータリズムと結びつけられる。しかし彼のコンクリートは単に粗いだけではない。壁の比率、開口のリズム、入口の圧縮、内部採光は細かく制御されている。粗い表面の背後には、バウハウス的な構法の規律が残っている。',
          ],
          en: ['Breuer made concrete mass into a disciplined public language.'],
        },
      },
      {
        title: { zh: '在设计史中的双重身份', ja: 'デザイン史における二重の位置', en: 'A double identity' },
        paragraphs: {
          zh: [
            '布劳耶的特殊之处在于，他同时属于设计史和建筑史。瓦西里椅和一系列家具让他成为现代设计的代表人物；而战后混凝土建筑又让他进入纪念性公共建筑的谱系。两者看似相反，一个轻，一个重，一个接近身体，一个接近城市，却共享同一种思维：材料如何通过结构获得形式。',
            '今天重新阅读布劳耶，不能只把他看成“粗野主义建筑师”。他的作品提示我们，现代主义并不是单一审美，而是一套不断换尺度的构造方法。从椅子的弯曲钢管到博物馆的悬挑混凝土，布劳耶始终在问同一个问题：结构怎样成为可见的经验。',
          ],
          ja: [
            'ブロイヤーの特異性は、デザイン史と建築史の両方に属している点である。ワシリーチェアをはじめとする家具は彼を近代デザインの代表にし、戦後のコンクリート建築は彼を記念碑的公共建築の系譜へ置いた。軽いものと重いもの、身体に近いものと都市に近いものは対照的に見えるが、素材が構造を通じて形になるという同じ思考を共有している。',
            '現在ブロイヤーを読むとき、彼を単に「ブルータリズムの建築家」と見るだけでは足りない。近代主義は一つの美学ではなく、尺度を変えながら続く構法の方法であることを示している。曲げられた鋼管から美術館のコンクリートのキャンチレバーまで、構造がどう経験として見えるのかを問い続けた。',
          ],
          en: ['Breuer belongs equally to design history and architectural history.'],
        },
      },
    ],
    representative_works: [
      { slug: 'conference-center-unesco', note: { zh: '与国际团队合作的联合国教科文组织建筑群，显示布劳耶进入大型公共建筑后的空间组织能力。', ja: '国際チームによるユネスコ建築群で、大型公共建築における空間組織力を示す。', en: 'A major international public commission.' } },
      { slug: '945-madison-avenue', note: { zh: '旧惠特尼美术馆以倒置体量和深窗洞形成强烈街道形象，是战后博物馆建筑的重要案例。', ja: '旧ホイットニー美術館は反転した量塊と深い窓で強い街路像をつくり、戦後美術館建築の重要例となった。', en: 'A powerful postwar museum form.' } },
      { slug: 'saint-johns-abbey', note: { zh: '宗教建筑中使用混凝土、巨大开口和光线控制，把仪式空间转化为现代结构景观。', ja: 'コンクリート、大きな開口、光の制御によって、宗教空間を近代的な構造の風景へ変えた。', en: 'A modern concrete religious landscape.' } },
    ],
    sources: [
      { title: 'Digital Breuer', url: 'https://breuer.syr.edu/' },
      { title: 'Whitney Museum: History', url: 'https://whitney.org/about/history' },
      { title: 'Wikidata: Marcel Breuer', url: 'https://www.wikidata.org/wiki/Q57588' },
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
}

const overlayAliases: Record<string, string> = {
  aalto: 'alvar-aalto',
}

export function getArchitectContent(slug: string): ArchitectContentOverlay | null {
  return overlays[slug] || overlays[overlayAliases[slug]] || null
}

export const featuredArchitectContentSlugs = Object.keys(overlays)
