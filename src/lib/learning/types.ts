import type { Lang } from '@/lib/types'

export type LearningCategory = 'code' | 'glossary' | 'exam'
export type LearningLevel = 'foundation' | 'intermediate'
export type ContentStatus = 'draft' | 'reviewed' | 'verified'
export type SourceType = 'official_source' | 'government_guide' | 'editorial_explanation' | 'exam_reference'
export type QualityLevel = 'basic' | 'standard' | 'high'

export type LearningTopic = {
  id: string
  slug: string
  category: LearningCategory
  level: LearningLevel
  orderIndex: number
  japaneseTerm: string
  reading: string
  verificationStatus: ContentStatus
  qualityLevel: QualityLevel
  lastReviewed?: string
  reviewer?: string
  sourceNotes?: string[]
}

export type LearningTopicTranslation = {
  topicId: string
  locale: Lang
  title: string
  summary: string
  overview?: string
  whyItExists?: string
  formulas?: LearningFormula[]
  calculationSteps?: LearningStep[]
  workedExamples?: LearningWorkedExample[]
  comparisonTables?: LearningComparisonTable[]
  diagramNotes?: LearningDiagramNote[]
  memoryTips?: string[]
  definition: string
  keyConcepts: string[]
  rules: string[]
  examples: string[]
  commonMistakes: string[]
  examPreparation: string[]
  furtherReading: string[]
}

export type LearningFormula = {
  title: string
  expression: string
  variables: Array<{
    label: string
    description: string
  }>
  note?: string
}

export type LearningStep = {
  title: string
  description: string
}

export type LearningWorkedExample = {
  label: string
  title: string
  description: string
}

export type LearningComparisonTable = {
  title: string
  columns: [string, string]
  rows: Array<{
    label: string
    values: [string, string]
  }>
}

export type LearningDiagramNote = {
  title: string
  items: string[]
}

export type LearningTranslation = LearningTopicTranslation

export type LegalReference = {
  topicId: string
  sourceType: SourceType
  lawName: string
  articleNumber: string
  sourceUrl: string
  originalJapaneseTitle?: string
  quotedTextOriginal?: string
  originalLanguage: 'ja' | 'en' | 'zh'
  verificationStatus: ContentStatus
  lastReviewed?: string
  reviewer?: string
  note: string
}

export type LearningSource = LegalReference

export type LocalizedLearningTopic = LearningTopic & LearningTopicTranslation & {
  references: LegalReference[]
}
