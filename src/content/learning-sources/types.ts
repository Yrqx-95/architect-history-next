export type LearningSourceType = 'exam_material' | 'law_book'

export type LearningSourceLanguage = 'ja' | 'zh' | 'en' | 'multi'

export type LearningSourceUsageScope = 'reference_only'

export type LearningSourceStatus = 'draft' | 'reviewed' | 'verified'

export type LearningSourceMaterial = {
  id: string
  slug: string
  title: string
  sourceType: LearningSourceType
  language: LearningSourceLanguage
  year: number
  fileName: string
  usageScope: LearningSourceUsageScope
  copyrightNote: string
  relatedTopicSlugs: string[]
  relatedGlossarySlugs: string[]
  coveredAreas: string[]
  extractionStatus: LearningSourceStatus
  reviewer?: string
  lastReviewed?: string
  notes: string
}

export type LearningSourceTopicNote = {
  topicSlug: string
  sourceMaterialIds: string[]
  referenceScope: string[]
  note: string
}
