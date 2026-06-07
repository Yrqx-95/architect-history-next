export type LearningPathLaunchReadiness = 'launchable-now' | 'partially-blocked' | 'blocked-by-review'

export type LearningPathSection = {
  id: string
  title: {
    zh: string
    ja: string
    en: string
  }
  targetUser: string
  whatUserWillLearn: string
  estimatedTime: string
  stages: Array<{
    id: string
    title: string
    topicOrder: string[]
    requiredGlossaryTerms: string[]
  }>
  nextAction: string
  missingContent: string[]
  launchReadiness: LearningPathLaunchReadiness
}

export const learningPathSections: LearningPathSection[] = [
  {
    "id": "absolute-beginner",
    "title": {
      "zh": "建筑入门",
      "ja": "建築入門",
      "en": "Absolute Beginner"
    },
    "targetUser": "Curious users and first-year students who need a map of architecture vocabulary.",
    "whatUserWillLearn": "How to read buildings through site, plan, section, structure, material, and historical context.",
    "estimatedTime": "6-8 hours",
    "stages": [
      {
        "id": "see",
        "title": "See the building",
        "topicOrder": [
          "building form",
          "site",
          "approach"
        ],
        "requiredGlossaryTerms": [
          "配置図",
          "平面図",
          "動線",
          "吹抜け"
        ]
      },
      {
        "id": "read",
        "title": "Read the drawing",
        "topicOrder": [
          "scale",
          "plan",
          "section"
        ],
        "requiredGlossaryTerms": [
          "縮尺",
          "平面図",
          "展開図"
        ]
      },
      {
        "id": "connect",
        "title": "Connect to history",
        "topicOrder": [
          "style",
          "period",
          "architect"
        ],
        "requiredGlossaryTerms": [
          "インターナショナルスタイル",
          "ゴシック建築"
        ]
      }
    ],
    "nextAction": "Launch as a text-only learning guide using existing archive links.",
    "missingContent": [
      "intro diagrams",
      "section/elevation glossary terms",
      "beginner checkpoints"
    ],
    "launchReadiness": "launchable-now"
  },
  {
    "id": "architecture-student",
    "title": {
      "zh": "建筑学生",
      "ja": "建築学生",
      "en": "Architecture Student"
    },
    "targetUser": "Architecture students who need reusable concepts for studio, history, and technical classes.",
    "whatUserWillLearn": "Core planning, drawing, structure, materials, and building-code concepts.",
    "estimatedTime": "20-30 hours",
    "stages": [
      {
        "id": "drawings",
        "title": "Drawing literacy",
        "topicOrder": [
          "scale",
          "site plan",
          "floor plan"
        ],
        "requiredGlossaryTerms": [
          "縮尺",
          "配置図",
          "平面図"
        ]
      },
      {
        "id": "space",
        "title": "Planning and spatial design",
        "topicOrder": [
          "zoning",
          "circulation",
          "core"
        ],
        "requiredGlossaryTerms": [
          "ゾーニング",
          "動線",
          "コアプラン"
        ]
      },
      {
        "id": "technical",
        "title": "Structure and materials",
        "topicOrder": [
          "slab",
          "moment",
          "cement",
          "aggregate"
        ],
        "requiredGlossaryTerms": [
          "スラブ",
          "曲げモーメント",
          "混合セメント"
        ]
      }
    ],
    "nextAction": "Use Core 100 as the required vocabulary spine.",
    "missingContent": [
      "detail drawing terms",
      "steel/timber systems",
      "environmental systems"
    ],
    "launchReadiness": "partially-blocked"
  },
  {
    "id": "second-class-architect-candidate",
    "title": {
      "zh": "二级建筑士备考",
      "ja": "二級建築士受験者",
      "en": "Second-Class Architect Candidate"
    },
    "targetUser": "Learners preparing for Japanese architecture licensing study.",
    "whatUserWillLearn": "How to read high-frequency code and planning concepts without reducing the product to a quiz site.",
    "estimatedTime": "30-40 hours",
    "stages": [
      {
        "id": "code-foundation",
        "title": "Code foundation",
        "topicOrder": [
          "zoning-districts",
          "building-coverage-ratio",
          "floor-area-ratio",
          "road-access-obligation",
          "road-slant-restriction",
          "north-side-slant-restriction",
          "fire-prevention-district",
          "quasi-fire-prevention-district"
        ],
        "requiredGlossaryTerms": [
          "用途地域",
          "建蔽率",
          "容積率",
          "接道義務"
        ]
      },
      {
        "id": "height-fire",
        "title": "Height and fire controls",
        "topicOrder": [
          "road-slant-restriction",
          "north-side-slant-restriction",
          "fire-prevention-district"
        ],
        "requiredGlossaryTerms": [
          "道路斜線制限",
          "北側斜線制限",
          "防火地域"
        ]
      }
    ],
    "nextAction": "Keep as internal structure until official-source review is stronger.",
    "missingContent": [
      "current official legal verification",
      "exam concept boundaries",
      "worked examples"
    ],
    "launchReadiness": "blocked-by-review"
  },
  {
    "id": "interior-design-student",
    "title": {
      "zh": "室内设计学生",
      "ja": "インテリア設計学生",
      "en": "Interior Design Student"
    },
    "targetUser": "Interior and architecture students learning human scale, furniture, lighting, and finishes.",
    "whatUserWillLearn": "Human dimensions, movement, furniture layout, lighting basics, and interior style vocabulary.",
    "estimatedTime": "12-18 hours",
    "stages": [
      {
        "id": "human-scale",
        "title": "Human scale",
        "topicOrder": [
          "human dimensions",
          "action dimensions"
        ],
        "requiredGlossaryTerms": [
          "人体寸法",
          "動作寸法"
        ]
      },
      {
        "id": "furniture-lighting",
        "title": "Furniture and lighting",
        "topicOrder": [
          "furniture layout",
          "built-in furniture",
          "downlight"
        ],
        "requiredGlossaryTerms": [
          "家具配置",
          "造作家具",
          "ダウンライト"
        ]
      }
    ],
    "nextAction": "Build after glossary review of furniture and lighting terms.",
    "missingContent": [
      "color theory",
      "finish schedules",
      "lighting fundamentals",
      "accessibility"
    ],
    "launchReadiness": "partially-blocked"
  },
  {
    "id": "architecture-history-explorer",
    "title": {
      "zh": "建筑史探索",
      "ja": "建築史探索",
      "en": "Architecture History Explorer"
    },
    "targetUser": "Users entering through architects, works, styles, and periods.",
    "whatUserWillLearn": "How styles, typologies, and historical movements connect to buildings in the archive.",
    "estimatedTime": "15-25 hours",
    "stages": [
      {
        "id": "ancient-to-medieval",
        "title": "Ancient to medieval",
        "topicOrder": [
          "orders",
          "temples",
          "vaults"
        ],
        "requiredGlossaryTerms": [
          "オーダー",
          "ゴシック建築",
          "ヴォールト"
        ]
      },
      {
        "id": "modern",
        "title": "Modern architecture",
        "topicOrder": [
          "international style",
          "metabolism"
        ],
        "requiredGlossaryTerms": [
          "インターナショナルスタイル",
          "メタボリズム"
        ]
      }
    ],
    "nextAction": "Launchable as a guided archive path with glossary support.",
    "missingContent": [
      "style criteria",
      "regional bridge essays",
      "entity/glossary separation"
    ],
    "launchReadiness": "launchable-now"
  }
]
