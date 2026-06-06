export type LearningStage =
  | 'orientation'
  | 'area-control'
  | 'height-control'
  | 'fire-safety'
  | 'exam-review'

export type DifficultyLevel =
  | 'beginner'
  | 'intermediate'
  | 'advanced'

export type LocalizedReason = string | {
  zh?: string
  ja?: string
  en?: string
}

export interface TopicDependency {
  slug: string
  reason: LocalizedReason
}

export interface LearningGraphNode {
  topicSlug: string
  learningStage: LearningStage
  difficulty: DifficultyLevel
  estimatedStudyMinutes?: number
  requiredGlossaryTerms: string[]
  requiredTopics: TopicDependency[]
  nextTopics: TopicDependency[]
  relatedTopics: TopicDependency[]
  examConcepts: string[]
  learningObjectives: string[]
  commonConfusions: string[]
}

export interface LearningPath {
  id: string
  title: string
  description: string
  estimatedStudyMinutes?: number
  topicOrder: string[]
  stages?: LearningPathStage[]
}

export interface LearningPathStage {
  id: string
  title: string
  learningGoals: string[]
  estimatedStudyMinutes: number
  topicOrder: string[]
}

export interface LearningGraphValidationIssue {
  type:
    | 'missing-topic'
    | 'missing-node'
    | 'broken-topic-reference'
    | 'broken-glossary-reference'
    | 'missing-required-field'
  slug: string
  field?: keyof LearningGraphNode
  reference?: string
  message: string
}

export interface LearningGraphValidationReport {
  ok: boolean
  topicCount: number
  pathCount: number
  issues: LearningGraphValidationIssue[]
}
