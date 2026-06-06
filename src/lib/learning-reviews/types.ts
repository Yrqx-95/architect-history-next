export type ExamFrequency = 'high' | 'medium' | 'low'

export interface QuickReview {
  formula?: string
  keywords: string[]
  mostCommonTrap: string
  examFrequency: ExamFrequency
}

export interface ConceptReview {
  concept: string
  logic: string
  decisionFlow: string[]
}

export interface FullLearningReview {
  source: 'code-topic'
  recommendedMinutes: number
  focus: string[]
}

export interface TopicReviewCompression {
  topicSlug: string
  quickReview: QuickReview
  conceptReview: ConceptReview
  fullLearningReview: FullLearningReview
}
