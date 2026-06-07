export type CoreLearningTermCategory =
  | 'drawing'
  | 'structure'
  | 'materials'
  | 'construction'
  | 'spatial-design'
  | 'planning'
  | 'building-code'
  | 'interior-design'
  | 'lighting'
  | 'architectural-history'
  | 'style'

export type CoreLearningTerm = {
  slug: string
  termJa: string
  reading: string
  termZh: string
  termEn: string
  category: CoreLearningTermCategory
  shortDefinition: {
    zh: string
    ja: string
    en: string
  }
  whyImportant: string
  relatedTerms: string[]
  relatedBuildings: string[]
  relatedCodeTopics: string[]
  sourceRefs: Array<{
    sourceId: string
    fileName: string
    page?: number
    pageRange?: string
    note: string
  }>
  status: 'draft'
  needsReview: boolean
  origin: 'public-glossary' | 'curated-glossary' | 'promotion-review-sprint' | 'b-grade-review'
}

export const core100Terms: CoreLearningTerm[] = [
  {
    "slug": "scale",
    "termJa": "縮尺",
    "reading": "しゅくしゃく",
    "termZh": "比例尺",
    "termEn": "Drawing Scale",
    "category": "drawing",
    "shortDefinition": {
      "zh": "图上尺寸与实际尺寸之间的比例，用于在有限图幅中准确表达建筑。",
      "ja": "図面上の寸法と実物寸法の比率で、限られた紙面に建築を正確に表すために用います。",
      "en": "The ratio between dimensions on a drawing and the actual building."
    },
    "whyImportant": "High-value architecture student term for drawing; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "配置図",
      "平面図",
      "展開図",
      "寸法"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-01",
        "fileName": "250416_第一回目.pdf",
        "page": 4,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      },
      {
        "sourceId": "planning-2025-02",
        "fileName": "250421_第二回目.pdf",
        "page": 8,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "interior-elevation",
    "termJa": "展開図",
    "reading": "てんかいず",
    "termZh": "室内立面展开图",
    "termEn": "Interior Elevation",
    "category": "drawing",
    "shortDefinition": {
      "zh": "把室内各面墙依次展开，表达门窗、家具、设备和饰面位置的图纸。",
      "ja": "室内の各壁面を展開し、建具、家具、設備、仕上げの位置を示す図面です。",
      "en": "A drawing unfolding interior wall faces to show openings, furniture, equipment, and finishes."
    },
    "whyImportant": "High-value architecture student term for drawing; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "平面図",
      "配置図",
      "造作家具",
      "壁仕上げ"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-02",
        "fileName": "250421_第二回目.pdf",
        "page": 8,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "site-plan",
    "termJa": "配置図",
    "reading": "はいちず",
    "termZh": "总平面图",
    "termEn": "Site Plan",
    "category": "drawing",
    "shortDefinition": {
      "zh": "表示建筑物在基地中的位置及其与道路、边界和外部空间关系的图纸。",
      "ja": "敷地内の建物位置と、道路、境界、外部空間との関係を示す図面です。",
      "en": "A drawing showing a building position and its relationship to site boundaries, roads, and exterior spaces."
    },
    "whyImportant": "High-value architecture student term for drawing; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "平面図",
      "縮尺",
      "敷地面積",
      "前面道路"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-02",
        "fileName": "250421_第二回目.pdf",
        "page": 8,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "floor-plan",
    "termJa": "平面図",
    "reading": "へいめんず",
    "termZh": "平面图",
    "termEn": "Floor Plan",
    "category": "drawing",
    "shortDefinition": {
      "zh": "以水平切面表达房间、墙体、开口和流线关系的建筑图纸。",
      "ja": "水平な切断面によって、室、壁、開口部、動線の関係を示す建築図面です。",
      "en": "A horizontal sectional drawing showing rooms, walls, openings, and circulation."
    },
    "whyImportant": "High-value architecture student term for drawing; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "配置図",
      "展開図",
      "縮尺",
      "動線"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-02",
        "fileName": "250421_第二回目.pdf",
        "page": 8,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "グリッドプランニング",
    "termJa": "グリッドプランニング",
    "reading": "",
    "termZh": "グリッドプランニング",
    "termEn": "グリッドプランニング (draft)",
    "category": "drawing",
    "shortDefinition": {
      "zh": "グリッドプランニング 是图纸表达学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "グリッドプランニングは図面表現を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "グリッドプランニング is a draft drawing learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important drawing gap for architecture students.",
    "relatedTerms": [
      "平面図",
      "配置図",
      "縮尺",
      "寸法"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-01",
        "fileName": "250416_第一回目.pdf",
        "page": 40,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "シングルグリッド",
    "termJa": "シングルグリッド",
    "reading": "",
    "termZh": "シングルグリッド",
    "termEn": "シングルグリッド (draft)",
    "category": "drawing",
    "shortDefinition": {
      "zh": "シングルグリッド 是图纸表达学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "シングルグリッドは図面表現を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "シングルグリッド is a draft drawing learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important drawing gap for architecture students.",
    "relatedTerms": [
      "平面図",
      "配置図",
      "縮尺",
      "寸法"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-01",
        "fileName": "250416_第一回目.pdf",
        "page": 40,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "柱スパン",
    "termJa": "柱スパン",
    "reading": "",
    "termZh": "柱スパン",
    "termEn": "柱スパン (draft)",
    "category": "drawing",
    "shortDefinition": {
      "zh": "柱スパン 是图纸表达学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "柱スパンは図面表現を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "柱スパン is a draft drawing learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important drawing gap for architecture students.",
    "relatedTerms": [
      "平面図",
      "配置図",
      "縮尺",
      "寸法"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-construction-2025",
        "fileName": "251006_鉄筋コンクリート造.pdf",
        "page": 22,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "配筋詳細図",
    "termJa": "配筋詳細図",
    "reading": "",
    "termZh": "配筋詳細図",
    "termEn": "配筋詳細図 (draft)",
    "category": "drawing",
    "shortDefinition": {
      "zh": "配筋詳細図 是图纸表达学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "配筋詳細図は図面表現を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "配筋詳細図 is a draft drawing learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important drawing gap for architecture students.",
    "relatedTerms": [
      "平面図",
      "配置図",
      "縮尺",
      "寸法"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-overview-2025",
        "fileName": "01_概要.pdf",
        "page": 10,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "部材規格化",
    "termJa": "部材規格化",
    "reading": "",
    "termZh": "部材規格化",
    "termEn": "部材規格化 (draft)",
    "category": "drawing",
    "shortDefinition": {
      "zh": "部材規格化 是图纸表达学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "部材規格化は図面表現を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "部材規格化 is a draft drawing learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important drawing gap for architecture students.",
    "relatedTerms": [
      "平面図",
      "配置図",
      "縮尺",
      "寸法"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-01",
        "fileName": "250416_第一回目.pdf",
        "page": 40,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "グリッドプランニング",
    "termJa": "グリッドプランニング",
    "reading": "",
    "termZh": "グリッドプランニング",
    "termEn": "グリッドプランニング (draft)",
    "category": "drawing",
    "shortDefinition": {
      "zh": "グリッドプランニング 是图纸表达学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "グリッドプランニングは図面表現を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "グリッドプランニング is a draft drawing learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a Core 100 review candidate because it fills an important drawing learning gap.",
    "relatedTerms": [
      "平面図",
      "配置図",
      "縮尺",
      "寸法"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-01",
        "fileName": "250416_第一回目.pdf",
        "page": 40,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "b-grade-review"
  },
  {
    "slug": "stirrup",
    "termJa": "あばら筋",
    "reading": "あばらきん",
    "termZh": "梁箍筋",
    "termEn": "Stirrup",
    "category": "structure",
    "shortDefinition": {
      "zh": "围绕梁主筋配置的横向钢筋，主要参与抵抗剪力并约束主筋。",
      "ja": "梁の主筋を囲む横方向の鉄筋で、主にせん断力への抵抗と主筋の拘束を担います。",
      "en": "Transverse reinforcement enclosing beam bars, primarily resisting shear and restraining longitudinal bars."
    },
    "whyImportant": "Core public glossary term for structure learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "concrete-cover",
    "termJa": "かぶり厚さ",
    "reading": "かぶりあつさ",
    "termZh": "混凝土保护层厚度",
    "termEn": "Concrete Cover",
    "category": "structure",
    "shortDefinition": {
      "zh": "钢筋外表面到混凝土表面的最短距离，关系到耐久、防火、粘结和施工。",
      "ja": "鉄筋表面からコンクリート表面までの最短距離で、耐久性、耐火性、付着、施工に関係します。",
      "en": "The shortest distance from reinforcement to the concrete surface, important to durability and fire resistance."
    },
    "whyImportant": "Core public glossary term for structure learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "shear-reinforcement",
    "termJa": "せん断補強筋",
    "reading": "せんだんほきょうきん",
    "termZh": "抗剪钢筋",
    "termEn": "Shear Reinforcement",
    "category": "structure",
    "shortDefinition": {
      "zh": "为抵抗构件中的剪力而设置的钢筋，包括梁箍筋和柱箍筋等。",
      "ja": "部材に生じるせん断力へ抵抗するための鉄筋で、梁のあばら筋や柱の帯筋などが含まれます。",
      "en": "Reinforcement provided to resist shear, including beam stirrups and column hoops."
    },
    "whyImportant": "Core public glossary term for structure learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "flat-slab-structure",
    "termJa": "フラットスラブ構造",
    "reading": "フラットスラブこうぞう",
    "termZh": "无梁楼盖结构",
    "termEn": "Flat-slab Structure",
    "category": "structure",
    "shortDefinition": {
      "zh": "楼板不经普通梁而直接支承在柱上的结构形式，可获得较平整的天花空间。",
      "ja": "床スラブを通常の梁を介さず柱で直接支持する構造形式で、天井面を平滑にしやすい特徴があります。",
      "en": "A structural system in which floor slabs bear directly on columns without conventional beams."
    },
    "whyImportant": "Core public glossary term for structure learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "rigid-frame-structure",
    "termJa": "ラーメン構造",
    "reading": "ラーメンこうぞう",
    "termZh": "刚架结构",
    "termEn": "Rigid-frame Structure",
    "category": "structure",
    "shortDefinition": {
      "zh": "通过柱梁刚接形成框架，由构件弯曲与节点共同抵抗水平和竖向荷载的结构形式。",
      "ja": "柱と梁を剛接合した骨組で、部材の曲げと接合部によって水平力・鉛直力に抵抗する構造形式です。",
      "en": "A frame whose rigidly connected beams and columns resist loads through member bending and joint action."
    },
    "whyImportant": "Core public glossary term for structure learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "deformed-bar",
    "termJa": "異形棒鋼",
    "reading": "いけいぼうこう",
    "termZh": "带肋钢筋",
    "termEn": "Deformed Reinforcing Bar",
    "category": "structure",
    "shortDefinition": {
      "zh": "表面带有节和肋、用于提高与混凝土机械咬合作用的钢筋。",
      "ja": "表面に節やリブを設け、コンクリートとの機械的なかみ合いを高めた鉄筋です。",
      "en": "Reinforcing steel with surface ribs that improve mechanical bond with concrete."
    },
    "whyImportant": "Core public glossary term for structure learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "design-strength",
    "termJa": "設計基準強度",
    "reading": "せっけいきじゅんきょうど",
    "termZh": "设计基准强度",
    "termEn": "Specified Design Strength",
    "category": "structure",
    "shortDefinition": {
      "zh": "结构设计中规定混凝土应满足的基准抗压强度，用作构件性能判断的基础。",
      "ja": "構造設計で構造体コンクリートが満たすべき基準として定める圧縮強度です。",
      "en": "The specified compressive strength that structural concrete is required to satisfy for design."
    },
    "whyImportant": "Core public glossary term for structure learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "hoop-reinforcement",
    "termJa": "帯筋",
    "reading": "おびきん",
    "termZh": "柱箍筋",
    "termEn": "Hoop Reinforcement",
    "category": "structure",
    "shortDefinition": {
      "zh": "围绕柱纵向钢筋设置的横向钢筋，用于抗剪、约束核心混凝土并固定主筋位置。",
      "ja": "柱の主筋を囲む横方向の鉄筋で、せん断抵抗、コンクリートの拘束、主筋位置の保持に役立ちます。",
      "en": "Transverse reinforcement around column bars that contributes to shear resistance and confinement."
    },
    "whyImportant": "Core public glossary term for structure learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "anchorage",
    "termJa": "定着",
    "reading": "ていちゃく",
    "termZh": "锚固",
    "termEn": "Reinforcement Anchorage",
    "category": "structure",
    "shortDefinition": {
      "zh": "通过足够埋入长度、弯钩或其他构造，使钢筋应力可靠传递到混凝土或相邻构件。",
      "ja": "必要な埋込み長さやフックなどにより、鉄筋の力をコンクリートや接続部材へ確実に伝えることです。",
      "en": "The transfer of reinforcing-bar force into concrete or adjoining members through embedment or hooks."
    },
    "whyImportant": "Core public glossary term for structure learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "reinforced-concrete",
    "termJa": "鉄筋コンクリート",
    "reading": "てっきんコンクリート",
    "termZh": "钢筋混凝土",
    "termEn": "Reinforced Concrete",
    "category": "structure",
    "shortDefinition": {
      "zh": "把擅长受压的混凝土与擅长受拉的钢筋组合，使两者共同工作的结构材料。",
      "ja": "圧縮に強いコンクリートと引張に強い鉄筋を組み合わせ、両者を一体として働かせる構造材料です。",
      "en": "A structural material combining concrete in compression with reinforcing steel in tension."
    },
    "whyImportant": "Core public glossary term for structure learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "wall-structure",
    "termJa": "壁式構造",
    "reading": "かべしきこうぞう",
    "termZh": "墙式结构",
    "termEn": "Wall Structure",
    "category": "structure",
    "shortDefinition": {
      "zh": "主要由承重墙和楼板组成，以墙体承担竖向力和水平力的结构形式。",
      "ja": "主に耐力壁と床で構成し、壁によって鉛直力と水平力を負担する構造形式です。",
      "en": "A system of load-bearing walls and floors in which walls carry vertical and lateral forces."
    },
    "whyImportant": "Core public glossary term for structure learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "shear-force",
    "termJa": "せん断力",
    "reading": "せんだんりょく",
    "termZh": "剪力",
    "termEn": "Shear Force",
    "category": "structure",
    "shortDefinition": {
      "zh": "使构件相邻截面产生相对滑移的内力。",
      "ja": "部材の隣り合う断面を相対的にずらそうとする内力です。",
      "en": "An internal force tending to make adjacent sections of a member slide relative to one another."
    },
    "whyImportant": "High-value architecture student term for structure; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "曲げモーメント",
      "せん断補強筋",
      "あばら筋",
      "帯筋"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-overview-2025",
        "fileName": "01_概要.pdf",
        "page": 9,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      },
      {
        "sourceId": "rc-worksheet-01",
        "fileName": "一般構造Ⅰ_RC_01.pdf",
        "page": 2,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "youngs-modulus",
    "termJa": "ヤング係数",
    "reading": "ヤングけいすう",
    "termZh": "杨氏模量",
    "termEn": "Young's Modulus",
    "category": "structure",
    "shortDefinition": {
      "zh": "弹性范围内应力与应变之比，用来表示材料抵抗变形的刚度。",
      "ja": "弾性範囲における応力度とひずみ度の比で、材料の変形しにくさを表します。",
      "en": "The ratio of stress to strain in the elastic range, expressing material stiffness."
    },
    "whyImportant": "High-value architecture student term for structure; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "応力ひずみ線図",
      "弾性領域",
      "剛性",
      "圧縮強度"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-mix-2025",
        "fileName": "04_コンクリート_調合.pdf",
        "page": 6,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      },
      {
        "sourceId": "rc-worksheet-05",
        "fileName": "一般構造Ⅰ_RC_05.pdf",
        "page": 1,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "bending-moment",
    "termJa": "曲げモーメント",
    "reading": "まげモーメント",
    "termZh": "弯矩",
    "termEn": "Bending Moment",
    "category": "structure",
    "shortDefinition": {
      "zh": "使构件发生弯曲的内力效应，其大小和方向决定受拉、受压区域。",
      "ja": "部材を曲げようとする内力効果で、その大きさと向きが引張側・圧縮側を決めます。",
      "en": "An internal force effect that bends a member and determines its tension and compression zones."
    },
    "whyImportant": "High-value architecture student term for structure; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "せん断力",
      "主筋",
      "単純梁",
      "片持ち梁"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-overview-2025",
        "fileName": "01_概要.pdf",
        "page": 7,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      },
      {
        "sourceId": "rc-worksheet-01",
        "fileName": "一般構造Ⅰ_RC_01.pdf",
        "page": 2,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "shear-wall",
    "termJa": "耐力壁",
    "reading": "たいりょくへき",
    "termZh": "承重抗侧力墙",
    "termEn": "Shear Wall",
    "category": "structure",
    "shortDefinition": {
      "zh": "承担地震、风等水平力，并提高建筑侧向刚度的墙体。",
      "ja": "地震や風などの水平力を負担し、建物の水平剛性を高める壁です。",
      "en": "A wall that resists lateral loads such as earthquake and wind forces and increases building stiffness."
    },
    "whyImportant": "High-value architecture student term for structure; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "ラーメン構造",
      "壁式構造",
      "水平力",
      "剛性"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-construction-2025",
        "fileName": "251006_鉄筋コンクリート造.pdf",
        "page": 10,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "air-entraining-agent",
    "termJa": "AE剤",
    "reading": "エーイーざい",
    "termZh": "引气剂",
    "termEn": "Air-entraining Agent",
    "category": "materials",
    "shortDefinition": {
      "zh": "在混凝土中形成许多微细、分散气泡的外加剂，用于改善和易性和抗冻融能力。",
      "ja": "コンクリート中に微細で独立した気泡を導入し、ワーカビリティーや耐凍害性を改善する混和剤です。",
      "en": "An admixture that introduces small dispersed air bubbles to improve workability and freeze-thaw resistance."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "creep",
    "termJa": "クリープ",
    "reading": "クリープ",
    "termZh": "徐变",
    "termEn": "Creep",
    "category": "materials",
    "shortDefinition": {
      "zh": "材料在持续应力作用下，随时间逐渐增加变形的现象。",
      "ja": "材料に一定の応力が長時間作用すると、時間の経過とともに変形が増加する現象です。",
      "en": "The gradual increase in material deformation over time under sustained stress."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "slump",
    "termJa": "スランプ",
    "reading": "スランプ",
    "termZh": "坍落度",
    "termEn": "Slump",
    "category": "materials",
    "shortDefinition": {
      "zh": "通过标准试验观察新拌混凝土下沉量，以表示其稠度和流动状态的指标。",
      "ja": "標準試験でフレッシュコンクリートの沈下量を測り、軟らかさや流動状態を表す指標です。",
      "en": "A measure of fresh-concrete consistency based on the vertical subsidence observed in a standard test."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "cement",
    "termJa": "セメント",
    "reading": "セメント",
    "termZh": "水泥",
    "termEn": "Cement",
    "category": "materials",
    "shortDefinition": {
      "zh": "与水反应后硬化并把骨料结合在一起的粉状胶结材料，是混凝土的重要组成。",
      "ja": "水と反応して硬化し、骨材を結び付ける粉体状の結合材で、コンクリートの主要材料です。",
      "en": "A powdered binder that reacts with water, hardens, and binds aggregate in concrete."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "fly-ash-cement",
    "termJa": "フライアッシュセメント",
    "reading": "フライアッシュセメント",
    "termZh": "粉煤灰水泥",
    "termEn": "Fly-ash Cement",
    "category": "materials",
    "shortDefinition": {
      "zh": "掺入粉煤灰的混合水泥，可改变新拌性能、水化热及长期强度发展。",
      "ja": "フライアッシュを混合したセメントで、流動性、水和熱、長期的な強度発現などに影響します。",
      "en": "A blended cement containing fly ash, affecting workability, heat evolution, and long-term strength development."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "bleeding",
    "termJa": "ブリーディング",
    "reading": "ブリーディング",
    "termZh": "泌水",
    "termEn": "Bleeding",
    "category": "materials",
    "shortDefinition": {
      "zh": "新拌混凝土中的固体颗粒沉降时，部分水分向表面上升的现象。",
      "ja": "フレッシュコンクリート中の固体粒子が沈降し、一部の水が表面へ上昇する現象です。",
      "en": "The upward movement of water in fresh concrete as solid particles settle."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "fresh-concrete",
    "termJa": "フレッシュコンクリート",
    "reading": "フレッシュコンクリート",
    "termZh": "新拌混凝土",
    "termEn": "Fresh Concrete",
    "category": "materials",
    "shortDefinition": {
      "zh": "从拌合到凝结前仍具有塑性、能够运输和浇筑的混凝土。",
      "ja": "練り混ぜ後から凝結前までの、運搬・打込みが可能な塑性状態のコンクリートです。",
      "en": "Concrete in its plastic state after mixing and before setting, while it can still be transported and placed."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "portland-cement",
    "termJa": "ポルトランドセメント",
    "reading": "ポルトランドセメント",
    "termZh": "硅酸盐水泥",
    "termEn": "Portland Cement",
    "category": "materials",
    "shortDefinition": {
      "zh": "以熟料和适量石膏等制成的常用水硬性水泥，是多种混凝土配合的基础胶结材料。",
      "ja": "クリンカーと適量のせっこうなどからつくられる代表的な水硬性セメントで、多くのコンクリートに用いられます。",
      "en": "A common hydraulic cement made primarily from clinker and gypsum, widely used as a concrete binder."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "mortar",
    "termJa": "モルタル",
    "reading": "モルタル",
    "termZh": "砂浆",
    "termEn": "Mortar",
    "category": "materials",
    "shortDefinition": {
      "zh": "通常由水泥、水和细骨料组成的材料，可用于砌筑、抹面，也构成混凝土中的基质部分。",
      "ja": "一般にセメント、水、細骨材からなる材料で、組積・仕上げやコンクリートの基質部分に用いられます。",
      "en": "A mix generally made from cement, water, and fine aggregate, used in masonry, finishes, and concrete matrix."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "workability",
    "termJa": "ワーカビリティー",
    "reading": "ワーカビリティー",
    "termZh": "和易性",
    "termEn": "Workability",
    "category": "materials",
    "shortDefinition": {
      "zh": "新拌混凝土在运输、浇筑、填充和密实时的操作难易程度，同时要避免明显离析。",
      "ja": "フレッシュコンクリートの運搬、打込み、充填、締固めのしやすさを、材料分離への抵抗も含めて表す性質です。",
      "en": "The ease of transporting, placing, filling, and compacting fresh concrete without harmful segregation."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "blast-furnace-cement",
    "termJa": "高炉セメント",
    "reading": "こうろセメント",
    "termZh": "高炉水泥",
    "termEn": "Blast-furnace Cement",
    "category": "materials",
    "shortDefinition": {
      "zh": "将高炉矿渣微粉与水泥组分结合使用的混合水泥，性能会随配比和等级而变化。",
      "ja": "高炉スラグ微粉末をセメント成分と組み合わせた混合セメントで、性能は混合割合や区分により異なります。",
      "en": "A blended cement incorporating ground granulated blast-furnace slag, with properties varying by blend."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "aggregate",
    "termJa": "骨材",
    "reading": "こつざい",
    "termZh": "骨料",
    "termEn": "Aggregate",
    "category": "materials",
    "shortDefinition": {
      "zh": "混凝土或砂浆中使用的砂、砾石、碎石等颗粒材料，形成主要体积和骨架。",
      "ja": "コンクリートやモルタルに用いる砂、砂利、砕石などの粒状材料で、主要な体積と骨格をつくります。",
      "en": "Granular material such as sand, gravel, or crushed stone forming much of concrete or mortar."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "fine-aggregate",
    "termJa": "細骨材",
    "reading": "さいこつざい",
    "termZh": "细骨料",
    "termEn": "Fine Aggregate",
    "category": "materials",
    "shortDefinition": {
      "zh": "粒径较小、主要用于填充粗骨料之间空隙的骨料，典型材料是砂。",
      "ja": "粒径が小さく、主に粗骨材間の空隙を満たす骨材で、砂が代表例です。",
      "en": "Smaller aggregate, typically sand, used to fill spaces between coarse aggregate particles."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "water-cement-ratio",
    "termJa": "水セメント比",
    "reading": "みずセメントひ",
    "termZh": "水灰比",
    "termEn": "Water-cement Ratio",
    "category": "materials",
    "shortDefinition": {
      "zh": "拌合水质量与水泥质量之比，是影响混凝土强度、耐久性和施工性的核心指标。",
      "ja": "練混ぜ水の質量をセメントの質量で割った比率で、強度、耐久性、施工性に大きく関係します。",
      "en": "The mass ratio of mixing water to cement, central to concrete strength, durability, and workability."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "hydration",
    "termJa": "水和",
    "reading": "すいわ",
    "termZh": "水化",
    "termEn": "Hydration",
    "category": "materials",
    "shortDefinition": {
      "zh": "水泥成分与水发生化学反应、生成水化物并使材料逐渐凝结硬化的过程。",
      "ja": "セメント成分が水と化学反応し、水和物を生成しながら凝結・硬化していく過程です。",
      "en": "The chemical reaction between cement and water that produces hydrates and leads to setting and hardening."
    },
    "whyImportant": "Core public glossary term for materials learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "cold-joint",
    "termJa": "コールドジョイント",
    "reading": "コールドジョイント",
    "termZh": "冷缝",
    "termEn": "Cold Joint",
    "category": "construction",
    "shortDefinition": {
      "zh": "前后两批混凝土未能充分一体化而形成的非预期接缝，可能影响防水和结构连续性。",
      "ja": "先に打ち込んだコンクリートと後続のコンクリートが十分に一体化せず生じる、意図しない継ぎ目です。",
      "en": "An unintended joint where successive concrete placements fail to integrate adequately."
    },
    "whyImportant": "Core public glossary term for construction learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "laitance",
    "termJa": "レイタンス",
    "reading": "レイタンス",
    "termZh": "浮浆层",
    "termEn": "Laitance",
    "category": "construction",
    "shortDefinition": {
      "zh": "泌水携带细颗粒上升后在混凝土表面形成的薄弱层，施工缝处理时通常需要清除。",
      "ja": "ブリーディング水とともに微粒子が上昇し、コンクリート表面に形成される脆弱な層です。",
      "en": "A weak surface layer of fine particles carried upward with bleed water."
    },
    "whyImportant": "Core public glossary term for construction learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "curing",
    "termJa": "養生",
    "reading": "ようじょう",
    "termZh": "养护",
    "termEn": "Curing",
    "category": "construction",
    "shortDefinition": {
      "zh": "在混凝土硬化初期控制水分、温度并避免有害振动或外力，以支持强度与耐久性形成。",
      "ja": "コンクリートの硬化初期に水分と温度を管理し、有害な振動や外力を避けて強度・耐久性の発現を支える作業です。",
      "en": "The control of moisture, temperature, and disturbance while concrete hardens to support strength and durability."
    },
    "whyImportant": "Core public glossary term for construction learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "formwork",
    "termJa": "型枠",
    "reading": "かたわく",
    "termZh": "模板",
    "termEn": "Formwork",
    "category": "construction",
    "shortDefinition": {
      "zh": "在混凝土浇筑和硬化期间，用来形成并支撑其形状的临时或永久模具系统。",
      "ja": "コンクリートの打込みと硬化中に、形状をつくり支持する仮設または残置型の型です。",
      "en": "A temporary or permanent mold system that shapes and supports concrete during placement and hardening."
    },
    "whyImportant": "High-value architecture student term for construction; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "せき板",
      "打設",
      "型枠解体",
      "配筋"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-construction-2025",
        "fileName": "251006_鉄筋コンクリート造.pdf",
        "page": 2,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "post-and-beam-timber-construction",
    "termJa": "在来軸組工法",
    "reading": "ざいらいじくぐみこうほう",
    "termZh": "传统木构架工法",
    "termEn": "Japanese Post-and-beam Construction",
    "category": "construction",
    "shortDefinition": {
      "zh": "以柱、梁和斜撑等线性木构件组成承重骨架的日本常见木结构工法。",
      "ja": "柱、梁、筋かいなどの線材で骨組をつくる、日本で一般的な木造工法です。",
      "en": "A common Japanese timber method using posts, beams, and braces to form the structural frame."
    },
    "whyImportant": "High-value architecture student term for construction; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "プレカット",
      "枠組壁工法",
      "継手",
      "仕口"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-05",
        "fileName": "250616_第五回目.pdf",
        "page": 48,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "moist-curing",
    "termJa": "湿潤養生",
    "reading": "しつじゅんようじょう",
    "termZh": "湿养护",
    "termEn": "Moist Curing",
    "category": "construction",
    "shortDefinition": {
      "zh": "在混凝土硬化初期保持适当水分，减少表面干燥并支持水化反应的养护方法。",
      "ja": "コンクリートの硬化初期に水分を保ち、表面乾燥を抑えて水和反応を支える養生方法です。",
      "en": "A curing method that maintains moisture during early hardening to support hydration and limit surface drying."
    },
    "whyImportant": "High-value architecture student term for construction; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "養生",
      "水和",
      "プラスチック収縮ひび割れ",
      "標準養生"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-mix-2025",
        "fileName": "04_コンクリート_調合.pdf",
        "page": 4,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      },
      {
        "sourceId": "rc-worksheet-04",
        "fileName": "一般構造Ⅰ_RC_04.pdf",
        "page": 1,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "concrete-placement",
    "termJa": "打設",
    "reading": "だせつ",
    "termZh": "混凝土浇筑",
    "termEn": "Concrete Placement",
    "category": "construction",
    "shortDefinition": {
      "zh": "把新拌混凝土输送、投入型枠并密实成形的施工过程。",
      "ja": "フレッシュコンクリートを運搬し、型枠内に投入して締め固める施工工程です。",
      "en": "The construction process of delivering, placing, and compacting fresh concrete in formwork."
    },
    "whyImportant": "High-value architecture student term for construction; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "型枠",
      "配筋",
      "締固め",
      "打ち継ぎ"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-construction-2025",
        "fileName": "251006_鉄筋コンクリート造.pdf",
        "page": 2,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "platform-frame-construction",
    "termJa": "枠組壁工法",
    "reading": "わくぐみかべこうほう",
    "termZh": "轻型木框架工法",
    "termEn": "Platform-frame Construction",
    "category": "construction",
    "shortDefinition": {
      "zh": "用规格木材组成墙体框架，并覆以面板形成承重墙和楼板的木结构工法。",
      "ja": "規格材で壁枠を組み、面材を張って耐力壁や床をつくる木造工法です。",
      "en": "A timber method using dimensional framing and structural sheathing to form load-bearing walls and floors."
    },
    "whyImportant": "High-value architecture student term for construction; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "在来軸組工法",
      "構造用合板",
      "耐力壁",
      "プレファブリケーション"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-05",
        "fileName": "250616_第五回目.pdf",
        "page": 48,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "せき板",
    "termJa": "せき板",
    "reading": "",
    "termZh": "せき板",
    "termEn": "せき板 (draft)",
    "category": "construction",
    "shortDefinition": {
      "zh": "せき板 是施工学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "せき板は施工を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "せき板 is a draft construction learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important construction gap for architecture students.",
    "relatedTerms": [
      "型枠",
      "打設",
      "養生",
      "施工"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-construction-2025",
        "fileName": "251006_鉄筋コンクリート造.pdf",
        "page": 6,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "タンピング",
    "termJa": "タンピング",
    "reading": "",
    "termZh": "タンピング",
    "termEn": "タンピング (draft)",
    "category": "construction",
    "shortDefinition": {
      "zh": "タンピング 是施工学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "タンピングは施工を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "タンピング is a draft construction learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important construction gap for architecture students.",
    "relatedTerms": [
      "型枠",
      "打設",
      "養生",
      "施工"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-mix-2025",
        "fileName": "04_コンクリート_調合.pdf",
        "page": 4,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "opening",
    "termJa": "開口部",
    "reading": "かいこうぶ",
    "termZh": "开口部",
    "termEn": "Opening",
    "category": "spatial-design",
    "shortDefinition": {
      "zh": "墙体或外皮上的窗、门等开口，是采光、通风和防火设计的关键部位。",
      "ja": "窓や扉など、壁や外皮に設けられる開口。採光、換気、防火に関係します。",
      "en": "Windows, doors, and other openings in walls or envelopes, important for light, air, and fire safety."
    },
    "whyImportant": "Core public glossary term for spatial design learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "quasi-fire-prevention-district"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "stairs",
    "termJa": "階段",
    "reading": "かいだん",
    "termZh": "楼梯",
    "termEn": "Stairs",
    "category": "spatial-design",
    "shortDefinition": {
      "zh": "连接不同楼层的竖向交通构件，也是避难路径设计的重要组成。",
      "ja": "階をつなぐ垂直動線。避難経路の計画でも重要な要素です。",
      "en": "Vertical circulation elements connecting floors, also important in evacuation planning."
    },
    "whyImportant": "Core public glossary term for spatial design learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "exterior-wall",
    "termJa": "外壁",
    "reading": "がいへき",
    "termZh": "外墙",
    "termEn": "Exterior Wall",
    "category": "spatial-design",
    "shortDefinition": {
      "zh": "建筑外部围护墙体，关系到结构、保温、防火、街道界面和立面表现。",
      "ja": "建築物の外側を構成する壁。構造、断熱、防火、街路景観に関係します。",
      "en": "The outer wall of a building, relevant to structure, insulation, fire safety, and facade expression."
    },
    "whyImportant": "Core public glossary term for spatial design learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "quasi-fire-prevention-district"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "major-structural-parts",
    "termJa": "主要構造部",
    "reading": "しゅようこうぞうぶ",
    "termZh": "主要结构部",
    "termEn": "Major Structural Parts",
    "category": "spatial-design",
    "shortDefinition": {
      "zh": "建筑中承担结构和防火判断的重要部分，如墙、柱、梁、楼板、屋顶、楼梯等。",
      "ja": "壁、柱、梁、床、屋根、階段など、構造と防火判断で重要になる部分です。",
      "en": "Key building parts such as walls, columns, beams, floors, roofs, and stairs used in structural and fire judgments."
    },
    "whyImportant": "Core public glossary term for spatial design learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "fire-prevention-district"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "fixed-window",
    "termJa": "FIX窓",
    "reading": "フィックスまど",
    "termZh": "固定窗",
    "termEn": "Fixed Window",
    "category": "spatial-design",
    "shortDefinition": {
      "zh": "不能开启、主要用于采光和视线联系的固定玻璃窗。",
      "ja": "開閉できず、主に採光や視線のつながりに用いる固定ガラス窓です。",
      "en": "A non-operable glazed window used mainly for daylight and views."
    },
    "whyImportant": "High-value architecture student term for spatial design; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "開き窓",
      "引き違い窓",
      "トップライト",
      "採光"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-03",
        "fileName": "250428_第三回目.pdf",
        "page": 25,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "toplight",
    "termJa": "トップライト",
    "reading": "トップライト",
    "termZh": "天窗",
    "termEn": "Skylight",
    "category": "spatial-design",
    "shortDefinition": {
      "zh": "设置在屋面或高处、从上方引入自然光的开口。",
      "ja": "屋根面や高所に設け、上方から自然光を取り入れる開口部です。",
      "en": "An opening in a roof or high surface that admits daylight from above."
    },
    "whyImportant": "High-value architecture student term for spatial design; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "採光",
      "FIX窓",
      "吹抜け",
      "屋根"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-03",
        "fileName": "250428_第三回目.pdf",
        "page": 25,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "hip-roof",
    "termJa": "寄棟屋根",
    "reading": "よせむねやね",
    "termZh": "四坡屋顶",
    "termEn": "Hip Roof",
    "category": "spatial-design",
    "shortDefinition": {
      "zh": "屋顶四周均设坡面，坡面向屋脊或顶部汇合的形式。",
      "ja": "建物の四周に屋根面を設け、それらが棟や頂部に集まる屋根形式です。",
      "en": "A roof with sloping planes on all sides meeting at ridges or a high point."
    },
    "whyImportant": "High-value architecture student term for spatial design; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "切妻屋根",
      "片流れ屋根",
      "陸屋根"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-03",
        "fileName": "250428_第三回目.pdf",
        "page": 42,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "gable-roof",
    "termJa": "切妻屋根",
    "reading": "きりづまやね",
    "termZh": "双坡屋顶",
    "termEn": "Gable Roof",
    "category": "spatial-design",
    "shortDefinition": {
      "zh": "由两个坡面在屋脊相交形成、端部呈山墙形的屋顶。",
      "ja": "二つの屋根面が棟で交わり、妻側が三角形となる屋根形式です。",
      "en": "A roof with two sloping planes meeting at a ridge and forming gable ends."
    },
    "whyImportant": "High-value architecture student term for spatial design; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "寄棟屋根",
      "片流れ屋根",
      "陸屋根",
      "妻入"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-03",
        "fileName": "250428_第三回目.pdf",
        "page": 42,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "landing",
    "termJa": "踊り場",
    "reading": "おどりば",
    "termZh": "楼梯平台",
    "termEn": "Stair Landing",
    "category": "spatial-design",
    "shortDefinition": {
      "zh": "楼梯梯段之间或出入口处设置的水平平台。",
      "ja": "階段の段部の途中や出入口部分に設ける水平な床です。",
      "en": "A level platform provided between stair flights or at stair access points."
    },
    "whyImportant": "High-value architecture student term for spatial design; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "直階段",
      "折返し階段",
      "らせん階段",
      "避難階段"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-03",
        "fileName": "250428_第三回目.pdf",
        "page": 54,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "flat-roof",
    "termJa": "陸屋根",
    "reading": "ろくやね",
    "termZh": "平屋顶",
    "termEn": "Flat Roof",
    "category": "spatial-design",
    "shortDefinition": {
      "zh": "外观接近平坦、以微小排水坡度处理雨水的屋顶。",
      "ja": "外観上は平らで、わずかな排水勾配によって雨水を処理する屋根です。",
      "en": "A visually flat roof formed with slight falls to drain rainwater."
    },
    "whyImportant": "High-value architecture student term for spatial design; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "パラペット",
      "防水",
      "切妻屋根",
      "屋上"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-03",
        "fileName": "250428_第三回目.pdf",
        "page": 42,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "habitable-room",
    "termJa": "居室",
    "reading": "きょしつ",
    "termZh": "居室",
    "termEn": "Habitable Room",
    "category": "planning",
    "shortDefinition": {
      "zh": "供居住、工作、学习等持续使用的房间，常与采光、通风和卫生条件相关。",
      "ja": "居住、作業、学習など継続的に使用される室。採光、換気、衛生条件に関係します。",
      "en": "A room used continuously for living, working, study, or similar activities, tied to light and ventilation rules."
    },
    "whyImportant": "Core public glossary term for planning learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "apartment-house",
    "termJa": "共同住宅",
    "reading": "きょうどうじゅうたく",
    "termZh": "共同住宅",
    "termEn": "Apartment House",
    "category": "planning",
    "shortDefinition": {
      "zh": "多个住户共同使用同一建筑的住宅类型，常与用途地域、避难、防火和共用部分相关。",
      "ja": "複数の住戸が一つの建築物に入る住宅形式。用途地域、避難、防火、共用部に関係します。",
      "en": "A residential building containing multiple dwelling units, relevant to zoning, evacuation, fire safety, and shared areas."
    },
    "whyImportant": "Core public glossary term for planning learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "zoning-districts"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "commercial-district",
    "termJa": "商業地域",
    "reading": "しょうぎょうちいき",
    "termZh": "商业地域",
    "termEn": "Commercial District",
    "category": "planning",
    "shortDefinition": {
      "zh": "以商业、办公和高密度城市活动为主的用途地域之一。",
      "ja": "商業、業務、高密度な都市活動を受け止める用途地域の一つです。",
      "en": "A zoning district intended for commerce, offices, and dense urban activity."
    },
    "whyImportant": "Core public glossary term for planning learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "zoning-districts"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "category-one-low-rise-residential-district",
    "termJa": "第一種低層住居専用地域",
    "reading": "だいいっしゅていそうじゅうきょせんようちいき",
    "termZh": "第一种低层住居专用地域",
    "termEn": "Category I Low-rise Exclusive Residential District",
    "category": "planning",
    "shortDefinition": {
      "zh": "强烈保护低层住宅环境的用途地域，常与高度、北侧斜线和低密度住宅相关。",
      "ja": "低層住宅の良好な住環境を守る性格が強い用途地域です。",
      "en": "A zoning district strongly focused on protecting low-rise residential environments."
    },
    "whyImportant": "Core public glossary term for planning learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "zoning-districts"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "zoning-districts",
    "termJa": "用途地域",
    "reading": "ようとちいき",
    "termZh": "用途地域",
    "termEn": "Zoning Districts",
    "category": "planning",
    "shortDefinition": {
      "zh": "按照居住、商业、工业等城市功能划分土地利用的日本都市计划制度。",
      "ja": "住居、商業、工業などの都市機能に応じて土地利用を区分する都市計画制度です。",
      "en": "Japanese land-use districts that organize urban areas by residential, commercial, and industrial functions."
    },
    "whyImportant": "Core public glossary term for planning learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "zoning-districts"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "ldk",
    "termJa": "LDK",
    "reading": "エルディーケー",
    "termZh": "客餐厨一体空间",
    "termEn": "Living-Dining-Kitchen",
    "category": "planning",
    "shortDefinition": {
      "zh": "把起居、用餐和厨房功能组织在连续空间中的住宅平面类型。",
      "ja": "居間、食事、台所の機能を連続した空間にまとめる住宅平面の形式です。",
      "en": "A housing-plan type combining living, dining, and kitchen functions in a continuous space."
    },
    "whyImportant": "High-value architecture student term for planning; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "DK",
      "LD",
      "リビングダイニング",
      "食寝分離"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-04",
        "fileName": "250609_第四回目.pdf",
        "page": 36,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "grouping",
    "termJa": "グルーピング",
    "reading": "グルーピング",
    "termZh": "功能分组",
    "termEn": "Functional Grouping",
    "category": "planning",
    "shortDefinition": {
      "zh": "按照功能、使用者或相互关系，把空间和需求归纳为若干组。",
      "ja": "機能、利用者、相互関係に応じて、空間や要求をいくつかのまとまりに整理することです。",
      "en": "The organization of spaces and requirements into groups by function, users, or relationships."
    },
    "whyImportant": "High-value architecture student term for planning; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "ゾーニング",
      "領域",
      "動線",
      "条件整理"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-02",
        "fileName": "250421_第二回目.pdf",
        "page": 16,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "cul-de-sac",
    "termJa": "クルドサック",
    "reading": "クルドサック",
    "termZh": "尽端式道路",
    "termEn": "Cul-de-sac",
    "category": "planning",
    "shortDefinition": {
      "zh": "车辆不能贯通、末端通常设回车空间的尽端道路。",
      "ja": "車両が通り抜けできず、終端に転回空間を設けることが多い行き止まり道路です。",
      "en": "A non-through street, often ending in a turning area for vehicles."
    },
    "whyImportant": "High-value architecture student term for planning; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "歩車分離",
      "近隣住区理論",
      "住宅地道路計画"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-housing-2025-02",
        "fileName": "251020_建築計画_第二回目_集合住宅2.pdf",
        "page": 26,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "core-plan",
    "termJa": "コアプラン",
    "reading": "コアプラン",
    "termZh": "核心筒平面",
    "termEn": "Core Plan",
    "category": "planning",
    "shortDefinition": {
      "zh": "组织楼梯、电梯、卫生间和设备竖井等核心功能的位置与形式。",
      "ja": "階段、エレベーター、便所、設備シャフトなどのコア機能の位置と形式を計画することです。",
      "en": "The arrangement of stairs, lifts, toilets, and service shafts within a building core."
    },
    "whyImportant": "High-value architecture student term for planning; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "センターコア",
      "ダブルコア",
      "分離コア",
      "基準階"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-office-2025",
        "fileName": "251027_建築計画_第三回目_事務所.pdf",
        "page": 14,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "courtyard-house",
    "termJa": "コートハウス",
    "reading": "コートハウス",
    "termZh": "庭院住宅",
    "termEn": "Courtyard House",
    "category": "planning",
    "shortDefinition": {
      "zh": "以建筑或围墙围合庭院，并围绕庭院组织室内空间的住宅类型。",
      "ja": "建物や塀で中庭を囲み、その庭を中心に室内空間を構成する住宅形式です。",
      "en": "A house organized around a courtyard enclosed by buildings or walls."
    },
    "whyImportant": "High-value architecture student term for planning; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "中庭",
      "坪庭",
      "プライバシー",
      "採光"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-05",
        "fileName": "250616_第五回目.pdf",
        "page": 9,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "total-floor-area",
    "termJa": "延べ面積",
    "reading": "のべめんせき",
    "termZh": "延べ面积",
    "termEn": "Total Floor Area",
    "category": "building-code",
    "shortDefinition": {
      "zh": "建筑各层楼面面积的合计，是理解容積率时最重要的面积概念之一。",
      "ja": "建築物の各階の床面積の合計。容積率を読むうえで重要な面積概念です。",
      "en": "The sum of floor areas across building stories, central to Floor Area Ratio calculations."
    },
    "whyImportant": "Core public glossary term for building code learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "floor-area-ratio"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "corner-lot-relaxation",
    "termJa": "角地緩和",
    "reading": "かどちかんわ",
    "termZh": "角地缓和",
    "termEn": "Corner Lot Relaxation",
    "category": "building-code",
    "shortDefinition": {
      "zh": "在满足角地等条件时，部分建蔽率等限制可能获得放宽的概念。",
      "ja": "角地など一定条件を満たす場合に、建蔽率などが緩和される考え方です。",
      "en": "A relaxation concept that may apply to coverage and other controls on qualifying corner lots."
    },
    "whyImportant": "Core public glossary term for building code learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "building-coverage-ratio"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "ventilation",
    "termJa": "換気",
    "reading": "かんき",
    "termZh": "通风",
    "termEn": "Ventilation",
    "category": "building-code",
    "shortDefinition": {
      "zh": "通过自然或机械方式交换室内外空气，维持卫生和舒适性的基本条件。",
      "ja": "自然または機械により室内外の空気を入れ替える、衛生と快適性の基本条件です。",
      "en": "The exchange of indoor and outdoor air by natural or mechanical means for health and comfort."
    },
    "whyImportant": "Core public glossary term for building code learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "building-area",
    "termJa": "建築面積",
    "reading": "けんちくめんせき",
    "termZh": "建筑面积",
    "termEn": "Building Area",
    "category": "building-code",
    "shortDefinition": {
      "zh": "用于计算建蔽率的建筑占地面积，具体算入范围需按法规判断。",
      "ja": "建蔽率の計算に用いる建築物の面積。算入範囲は法令上の扱いを確認します。",
      "en": "The building footprint area used for coverage calculations, with legal inclusion rules to be checked."
    },
    "whyImportant": "Core public glossary term for building code learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "building-coverage-ratio"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "building-coverage-ratio",
    "termJa": "建蔽率",
    "reading": "けんぺいりつ",
    "termZh": "建蔽率",
    "termEn": "Building Coverage Ratio",
    "category": "building-code",
    "shortDefinition": {
      "zh": "建筑面积相对于敷地面积的比例，主要控制建筑在平面上覆盖多少土地。",
      "ja": "建築面積の敷地面積に対する割合。建物が地面をどれだけ覆うかを示します。",
      "en": "The ratio of building footprint area to site area, controlling how much ground the building covers."
    },
    "whyImportant": "Core public glossary term for building code learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "building-coverage-ratio"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "daylighting",
    "termJa": "採光",
    "reading": "さいこう",
    "termZh": "采光",
    "termEn": "Daylighting",
    "category": "building-code",
    "shortDefinition": {
      "zh": "室内取得自然光的条件，是居室环境和开口部设计的重要概念。",
      "ja": "室内に自然光を取り入れる条件。居室環境や開口部設計に関わります。",
      "en": "The provision of natural light to interior spaces, important for habitable rooms and openings."
    },
    "whyImportant": "Core public glossary term for building code learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "quasi-fire-resistant-building",
    "termJa": "準耐火建築物",
    "reading": "じゅんたいかけんちくぶつ",
    "termZh": "准耐火建筑物",
    "termEn": "Quasi-fire-resistant Building",
    "category": "building-code",
    "shortDefinition": {
      "zh": "耐火性能低于耐火建筑物但满足一定防火要求的建筑类型。",
      "ja": "耐火建築物ほどではないが、一定の防火性能を満たす建築物です。",
      "en": "A building type that meets specified fire performance below full fire-resistant construction."
    },
    "whyImportant": "Core public glossary term for building code learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "quasi-fire-prevention-district"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "quasi-fire-prevention-district",
    "termJa": "準防火地域",
    "reading": "じゅんぼうかちいき",
    "termZh": "准防火地域",
    "termEn": "Quasi-fire Prevention District",
    "category": "building-code",
    "shortDefinition": {
      "zh": "介于一般区域和防火地域之间的防火控制区域，常见于密集市街地或防火地域周边。",
      "ja": "一般区域と防火地域の中間的な防火性能を求める地区指定です。",
      "en": "An intermediate fire-safety district often used around fire prevention districts or dense urban areas."
    },
    "whyImportant": "Core public glossary term for building code learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "quasi-fire-prevention-district"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "road-access-obligation",
    "termJa": "接道義務",
    "reading": "せつどうぎむ",
    "termZh": "接道义务",
    "termEn": "Road Access Obligation",
    "category": "building-code",
    "shortDefinition": {
      "zh": "建筑基地需要与法定道路保持必要连接的基本规则，关系到避难、消防和通行。",
      "ja": "建築物の敷地が法令上の道路に必要な形で接することを求める基本条件です。",
      "en": "A basic rule requiring a building site to connect properly to a legally recognized road."
    },
    "whyImportant": "Core public glossary term for building code learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "road-access-obligation"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "front-road",
    "termJa": "前面道路",
    "reading": "ぜんめんどうろ",
    "termZh": "前面道路",
    "termEn": "Front Road",
    "category": "building-code",
    "shortDefinition": {
      "zh": "基地所临接的道路，常影响接道、容積率道路宽度限制和道路斜线。",
      "ja": "敷地が接する道路。接道、容積率、道路斜線制限に関係します。",
      "en": "The road facing or adjoining a site, relevant to access, FAR limits, and road slant controls."
    },
    "whyImportant": "Core public glossary term for building code learning.",
    "relatedTerms": [],
    "relatedBuildings": [],
    "relatedCodeTopics": [
      "road-access-obligation"
    ],
    "sourceRefs": [],
    "status": "draft",
    "needsReview": false,
    "origin": "public-glossary"
  },
  {
    "slug": "インテリアコーディネーション",
    "termJa": "インテリアコーディネーション",
    "reading": "",
    "termZh": "インテリアコーディネーション",
    "termEn": "インテリアコーディネーション (draft)",
    "category": "interior-design",
    "shortDefinition": {
      "zh": "インテリアコーディネーション 是室内设计学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "インテリアコーディネーションはインテリア設計を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "インテリアコーディネーション is a draft interior design learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important interior design gap for architecture students.",
    "relatedTerms": [
      "家具配置",
      "造作家具",
      "人体寸法",
      "動作寸法"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "interior-coordination-2025",
        "fileName": "ICオリジナル2025まとめのコピー.pdf",
        "page": 1,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "ウインドウトリートメント",
    "termJa": "ウインドウトリートメント",
    "reading": "",
    "termZh": "ウインドウトリートメント",
    "termEn": "ウインドウトリートメント (draft)",
    "category": "interior-design",
    "shortDefinition": {
      "zh": "ウインドウトリートメント 是室内设计学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "ウインドウトリートメントはインテリア設計を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "ウインドウトリートメント is a draft interior design learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important interior design gap for architecture students.",
    "relatedTerms": [
      "家具配置",
      "造作家具",
      "人体寸法",
      "動作寸法"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "interior-coordination-2025",
        "fileName": "ICオリジナル2025まとめのコピー.pdf",
        "page": 1,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "ヒアリング",
    "termJa": "ヒアリング",
    "reading": "",
    "termZh": "ヒアリング",
    "termEn": "ヒアリング (draft)",
    "category": "interior-design",
    "shortDefinition": {
      "zh": "ヒアリング 是室内设计学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "ヒアリングはインテリア設計を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "ヒアリング is a draft interior design learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important interior design gap for architecture students.",
    "relatedTerms": [
      "家具配置",
      "造作家具",
      "人体寸法",
      "動作寸法"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "interior-zoning-workflow",
        "fileName": "実務におけるゾーニングの流れのコピー.pdf",
        "page": 1,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "下足箱",
    "termJa": "下足箱",
    "reading": "",
    "termZh": "下足箱",
    "termEn": "下足箱 (draft)",
    "category": "interior-design",
    "shortDefinition": {
      "zh": "下足箱 是家具学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "下足箱は家具を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "下足箱 is a draft furniture learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important interior design gap for architecture students.",
    "relatedTerms": [
      "人体寸法",
      "動作寸法",
      "家具配置",
      "造作家具"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-05",
        "fileName": "250616_第五回目.pdf",
        "page": 5,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "家具配置",
    "termJa": "家具配置",
    "reading": "",
    "termZh": "家具配置",
    "termEn": "家具配置 (draft)",
    "category": "interior-design",
    "shortDefinition": {
      "zh": "家具配置 是家具学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "家具配置は家具を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "家具配置 is a draft furniture learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important interior design gap for architecture students.",
    "relatedTerms": [
      "人体寸法",
      "動作寸法",
      "造作家具"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-2025-04",
        "fileName": "250609_第四回目.pdf",
        "page": 9,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      },
      {
        "sourceId": "interior-zoning-workflow",
        "fileName": "実務におけるゾーニングの流れのコピー.pdf",
        "page": 1,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "間仕切り家具",
    "termJa": "間仕切り家具",
    "reading": "",
    "termZh": "間仕切り家具",
    "termEn": "間仕切り家具 (draft)",
    "category": "interior-design",
    "shortDefinition": {
      "zh": "間仕切り家具 是家具学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "間仕切り家具は家具を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "間仕切り家具 is a draft furniture learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important interior design gap for architecture students.",
    "relatedTerms": [
      "人体寸法",
      "動作寸法",
      "家具配置",
      "造作家具"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "custom-fixtures-reference",
        "fileName": "造作について補足のコピー.pdf",
        "page": 3,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "自立テーブル",
    "termJa": "自立テーブル",
    "reading": "",
    "termZh": "自立テーブル",
    "termEn": "自立テーブル (draft)",
    "category": "interior-design",
    "shortDefinition": {
      "zh": "自立テーブル 是家具学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "自立テーブルは家具を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "自立テーブル is a draft furniture learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important interior design gap for architecture students.",
    "relatedTerms": [
      "人体寸法",
      "動作寸法",
      "家具配置",
      "造作家具"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "custom-fixtures-reference",
        "fileName": "造作について補足のコピー.pdf",
        "page": 2,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "条件整理",
    "termJa": "条件整理",
    "reading": "",
    "termZh": "条件整理",
    "termEn": "条件整理 (draft)",
    "category": "interior-design",
    "shortDefinition": {
      "zh": "条件整理 是室内设计学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "条件整理はインテリア設計を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "条件整理 is a draft interior design learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important interior design gap for architecture students.",
    "relatedTerms": [
      "家具配置",
      "造作家具",
      "人体寸法",
      "動作寸法"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "interior-zoning-workflow",
        "fileName": "実務におけるゾーニングの流れのコピー.pdf",
        "page": 1,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "エーライト",
    "termJa": "エーライト",
    "reading": "",
    "termZh": "エーライト",
    "termEn": "エーライト (draft)",
    "category": "lighting",
    "shortDefinition": {
      "zh": "エーライト 是照明学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "エーライトは照明を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "エーライト is a draft lighting learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important lighting gap for architecture students.",
    "relatedTerms": [
      "採光",
      "非常用照明",
      "トップライト",
      "照明計画"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-cement-2025",
        "fileName": "02_コンクリート_材料①セメント.pdf",
        "page": 5,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "キッチン照明",
    "termJa": "キッチン照明",
    "reading": "",
    "termZh": "キッチン照明",
    "termEn": "キッチン照明 (draft)",
    "category": "lighting",
    "shortDefinition": {
      "zh": "キッチン照明 是照明学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "キッチン照明は照明を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "キッチン照明 is a draft lighting learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important lighting gap for architecture students.",
    "relatedTerms": [
      "採光",
      "非常用照明",
      "トップライト",
      "照明計画"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "lighting-layout-reference",
        "fileName": "照明配置参考資料のコピー.pdf",
        "page": 2,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "ダイニング照明",
    "termJa": "ダイニング照明",
    "reading": "",
    "termZh": "ダイニング照明",
    "termEn": "ダイニング照明 (draft)",
    "category": "lighting",
    "shortDefinition": {
      "zh": "ダイニング照明 是照明学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "ダイニング照明は照明を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "ダイニング照明 is a draft lighting learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important lighting gap for architecture students.",
    "relatedTerms": [
      "採光",
      "非常用照明",
      "トップライト",
      "照明計画"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "lighting-layout-reference",
        "fileName": "照明配置参考資料のコピー.pdf",
        "page": 1,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "ダウンライト",
    "termJa": "ダウンライト",
    "reading": "",
    "termZh": "ダウンライト",
    "termEn": "ダウンライト (draft)",
    "category": "lighting",
    "shortDefinition": {
      "zh": "ダウンライト 是照明学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "ダウンライトは照明を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "ダウンライト is a draft lighting learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important lighting gap for architecture students.",
    "relatedTerms": [
      "採光",
      "非常用照明",
      "トップライト",
      "照明計画"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "lighting-layout-reference",
        "fileName": "照明配置参考資料のコピー.pdf",
        "page": 1,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "ビーライト",
    "termJa": "ビーライト",
    "reading": "",
    "termZh": "ビーライト",
    "termEn": "ビーライト (draft)",
    "category": "lighting",
    "shortDefinition": {
      "zh": "ビーライト 是照明学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "ビーライトは照明を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "ビーライト is a draft lighting learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important lighting gap for architecture students.",
    "relatedTerms": [
      "採光",
      "非常用照明",
      "トップライト",
      "照明計画"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "rc-cement-2025",
        "fileName": "02_コンクリート_材料①セメント.pdf",
        "page": 5,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "classical-order",
    "termJa": "オーダー",
    "reading": "オーダー",
    "termZh": "古典柱式",
    "termEn": "Classical Order",
    "category": "architectural-history",
    "shortDefinition": {
      "zh": "古希腊和罗马建筑中，柱、柱头、柱础及上部构件按比例组成的体系。",
      "ja": "古代ギリシア・ローマ建築で、柱、柱頭、柱礎、上部構造を比例的に組織する体系です。",
      "en": "A proportional system organizing columns, capitals, bases, and entablatures in classical architecture."
    },
    "whyImportant": "High-value architecture student term for architectural history; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "ドリス式",
      "イオニア式",
      "コリント式",
      "古典主義"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "history-western-2025-01",
        "fileName": "250623_第六回目.pdf",
        "page": 22,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "gothic-architecture",
    "termJa": "ゴシック建築",
    "reading": "ゴシックけんちく",
    "termZh": "哥特式建筑",
    "termEn": "Gothic Architecture",
    "category": "architectural-history",
    "shortDefinition": {
      "zh": "中世纪欧洲发展出的建筑体系，常以尖拱、肋拱顶和飞扶壁组织高耸明亮的空间。",
      "ja": "中世ヨーロッパに発達し、尖頭アーチ、リブ・ヴォールト、飛梁で高く明るい空間をつくる建築です。",
      "en": "A medieval European architecture using pointed arches, rib vaults, and flying buttresses to create tall, luminous spaces."
    },
    "whyImportant": "High-value architecture student term for architectural history; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "尖頭アーチ",
      "リブ・ヴォールト",
      "飛梁",
      "ロマネスク建築"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "history-western-2025-02",
        "fileName": "250630_第七回目.pdf",
        "page": 58,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "passage",
    "termJa": "パサージュ",
    "reading": "パサージュ",
    "termZh": "拱廊式商业街",
    "termEn": "Passage",
    "category": "architectural-history",
    "shortDefinition": {
      "zh": "近代欧洲城市中常见的有顶步行商业通道，两侧排列店铺。",
      "ja": "近代ヨーロッパ都市にみられる、両側に店舗を並べた屋根付き歩行商業通路です。",
      "en": "A covered pedestrian shopping passage lined with shops, characteristic of modern European cities."
    },
    "whyImportant": "High-value architecture student term for architectural history; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "アーケード",
      "百貨店",
      "商業空間",
      "ショーウインドウ"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "planning-commercial-2025",
        "fileName": "251201_建築計画_第四回目_商業建築.pdf",
        "page": 13,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "metabolism",
    "termJa": "メタボリズム",
    "reading": "メタボリズム",
    "termZh": "新陈代谢派",
    "termEn": "Metabolism",
    "category": "architectural-history",
    "shortDefinition": {
      "zh": "把城市和建筑理解为可生长、替换和更新系统的日本战后建筑运动。",
      "ja": "都市や建築を成長・交換・更新可能なシステムとして捉えた、日本の戦後建築運動です。",
      "en": "A postwar Japanese movement conceiving cities and buildings as systems capable of growth, replacement, and renewal."
    },
    "whyImportant": "High-value architecture student term for architectural history; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "丹下健三",
      "カプセル型",
      "日本モダニズム",
      "国家プロジェクト"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "history-modern-jp-cases-2025",
        "fileName": "250616_第五回目歴史.pdf",
        "page": 45,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "garan-layout",
    "termJa": "伽藍配置",
    "reading": "がらんはいち",
    "termZh": "寺院伽蓝布局",
    "termEn": "Temple Precinct Layout",
    "category": "architectural-history",
    "shortDefinition": {
      "zh": "寺院中金堂、塔、讲堂、回廊等主要建筑的组合与位置关系。",
      "ja": "寺院における金堂、塔、講堂、回廊など主要建物の組合せと位置関係です。",
      "en": "The spatial arrangement of principal temple buildings such as halls, pagodas, lecture halls, and cloisters."
    },
    "whyImportant": "High-value architecture student term for architectural history; already has trilingual draft definition and source references.",
    "relatedTerms": [
      "金堂",
      "五重塔",
      "中門",
      "回廊",
      "西院伽藍"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "history-jp-2025-01",
        "fileName": "250416_第一回目歴史.pdf",
        "page": 36,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "curated-glossary"
  },
  {
    "slug": "アジアンエスニック",
    "termJa": "アジアンエスニック",
    "reading": "",
    "termZh": "アジアンエスニック",
    "termEn": "アジアンエスニック (draft)",
    "category": "style",
    "shortDefinition": {
      "zh": "アジアンエスニック 是风格学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "アジアンエスニックは様式を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "アジアンエスニック is a draft style learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important style gap for architecture students.",
    "relatedTerms": [
      "近代建築",
      "インテリア",
      "素材",
      "色彩"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "interior-style-reference-2025",
        "fileName": "別冊表紙2025まとめのコピー.pdf",
        "page": 1,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  },
  {
    "slug": "イタリアモダン",
    "termJa": "イタリアモダン",
    "reading": "",
    "termZh": "イタリアモダン",
    "termEn": "イタリアモダン (draft)",
    "category": "style",
    "shortDefinition": {
      "zh": "イタリアモダン 是风格学习中的基础概念。本条目为草稿，需要后续校对读音、翻译和边界。",
      "ja": "イタリアモダンは様式を学ぶための基礎概念です。この項目は草稿で、読み、翻訳、範囲の確認が必要です。",
      "en": "イタリアモダン is a draft style learning term. Reading, translation, and scope should be reviewed before publication."
    },
    "whyImportant": "Selected as a core learning candidate because it fills an important style gap for architecture students.",
    "relatedTerms": [
      "近代建築",
      "インテリア",
      "素材",
      "色彩"
    ],
    "relatedBuildings": [],
    "relatedCodeTopics": [],
    "sourceRefs": [
      {
        "sourceId": "interior-style-reference-2025",
        "fileName": "別冊表紙2025まとめのコピー.pdf",
        "page": 1,
        "note": "Private editorial reference; wording and diagrams are not reproduced."
      }
    ],
    "status": "draft",
    "needsReview": true,
    "origin": "promotion-review-sprint"
  }
]

export const core100TermsBySlug = Object.fromEntries(core100Terms.map(term => [term.slug, term])) as Record<string, CoreLearningTerm>
