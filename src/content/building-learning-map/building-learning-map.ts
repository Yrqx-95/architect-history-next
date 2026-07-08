export type BuildingLearningMapRecord = {
  buildingSlug: string
  learningConcepts: string[]
  glossaryTerms: string[]
  relatedCodeTopics: string[]
  spatialConcepts: string[]
  materialConcepts: string[]
  structureConcepts: string[]
  historyConcepts: string[]
  whyThisBuildingIsUsefulForLearning: string
  confidence: 'low' | 'medium' | 'high'
  needsReview: boolean
}

export const buildingLearningMap: BuildingLearningMapRecord[] = [
  {
    "buildingSlug": "church-of-light",
    "learningConcepts": [
      "light",
      "concrete",
      "sacred space",
      "minimal opening"
    ],
    "glossaryTerms": [
      "鉄筋コンクリート",
      "型枠",
      "光"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [
      "sacred space",
      "minimal opening"
    ],
    "materialConcepts": [
      "concrete"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for light, concrete, sacred space, minimal opening. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "villa-savoye",
    "learningConcepts": [
      "pilotis",
      "free plan",
      "roof garden",
      "modernism"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [
      "floor-area-ratio",
      "building-coverage-ratio"
    ],
    "spatialConcepts": [
      "free plan"
    ],
    "materialConcepts": [],
    "structureConcepts": [
      "pilotis"
    ],
    "historyConcepts": [
      "modernism"
    ],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for pilotis, free plan, roof garden, modernism. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "fallingwater",
    "learningConcepts": [
      "cantilever",
      "site planning",
      "natural topography",
      "stone and concrete"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [
      "building-coverage-ratio",
      "road-access-obligation"
    ],
    "spatialConcepts": [
      "site planning",
      "natural topography"
    ],
    "materialConcepts": [
      "stone and concrete"
    ],
    "structureConcepts": [
      "cantilever"
    ],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for cantilever, site planning, natural topography, stone and concrete. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "farnsworth-house",
    "learningConcepts": [
      "glass enclosure",
      "raised floor",
      "open plan",
      "minimal structure"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [
      "raised floor",
      "open plan"
    ],
    "materialConcepts": [
      "glass enclosure"
    ],
    "structureConcepts": [
      "raised floor",
      "minimal structure"
    ],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for glass enclosure, raised floor, open plan, minimal structure. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "centre-pompidou",
    "learningConcepts": [
      "exposed structure",
      "service core",
      "flexible floor",
      "high-tech"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [
      "flexible floor"
    ],
    "materialConcepts": [],
    "structureConcepts": [
      "exposed structure"
    ],
    "historyConcepts": [
      "high-tech"
    ],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for exposed structure, service core, flexible floor, high-tech. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "seagram-building",
    "learningConcepts": [
      "curtain wall",
      "plaza",
      "steel frame",
      "corporate modernism"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [
      "plaza"
    ],
    "materialConcepts": [
      "steel frame"
    ],
    "structureConcepts": [
      "steel frame"
    ],
    "historyConcepts": [
      "corporate modernism"
    ],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for curtain wall, plaza, steel frame, corporate modernism. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "todaiji-temple",
    "learningConcepts": [
      "timber structure",
      "temple typology",
      "scale",
      "buddhist architecture"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "timber structure"
    ],
    "structureConcepts": [
      "timber structure"
    ],
    "historyConcepts": [
      "temple typology",
      "buddhist architecture"
    ],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for timber structure, temple typology, scale, buddhist architecture. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "house-na",
    "learningConcepts": [
      "transparent house",
      "split levels",
      "domestic section",
      "steel frame"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [
      "domestic section"
    ],
    "materialConcepts": [
      "steel frame"
    ],
    "structureConcepts": [
      "steel frame"
    ],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for transparent house, split levels, domestic section, steel frame. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "sendai-mediatheque",
    "learningConcepts": [
      "tube structure",
      "public program",
      "open floor",
      "media library"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [
      "open floor"
    ],
    "materialConcepts": [],
    "structureConcepts": [
      "tube structure"
    ],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for tube structure, public program, open floor, media library. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "8-house",
    "learningConcepts": [
      "courtyard",
      "mixed use",
      "collective housing",
      "circulation loop"
    ],
    "glossaryTerms": [
      "中庭",
      "動線",
      "住戸"
    ],
    "relatedCodeTopics": [
      "floor-area-ratio",
      "building-coverage-ratio"
    ],
    "spatialConcepts": [
      "courtyard",
      "circulation loop"
    ],
    "materialConcepts": [],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for courtyard, mixed use, collective housing, circulation loop. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "apple-park",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [
      "building-coverage-ratio",
      "floor-area-ratio"
    ],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "asakusa-culture-center",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [
      "road-slant-restriction",
      "floor-area-ratio"
    ],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "rose-seidler-house",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [
      "building-coverage-ratio",
      "road-access-obligation"
    ],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "medium",
    "needsReview": true
  },
  {
    "buildingSlug": "barcelona-pavilion",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "glass-house",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "robie-house",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "guggenheim-bilbao",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "guggenheim-nyc",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "salk-institute",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "kimbell-art-museum",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "sydney-opera-house",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "nakagin-capsule-tower",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "hiroshima-peace-museum",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "kanazawa-museum",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "row-house-sumiyoshi",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "rolex-learning-center",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "vitra-haus",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "seattle-central-library",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "yoyogi-national-gymnasium",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  },
  {
    "buildingSlug": "naoshima-chichu-art-museum",
    "learningConcepts": [
      "spatial organization",
      "material expression",
      "structural idea",
      "historical context"
    ],
    "glossaryTerms": [
      "平面図",
      "動線",
      "構造",
      "材料"
    ],
    "relatedCodeTopics": [],
    "spatialConcepts": [],
    "materialConcepts": [
      "material expression"
    ],
    "structureConcepts": [],
    "historyConcepts": [],
    "whyThisBuildingIsUsefulForLearning": "Useful as a learning case for spatial organization, material expression, structural idea, historical context. Relationships are conceptual and should be reviewed before public display.",
    "confidence": "low",
    "needsReview": true
  }
]

export const buildingLearningMapBySlug = Object.fromEntries(buildingLearningMap.map(item => [item.buildingSlug, item])) as Record<string, BuildingLearningMapRecord>
