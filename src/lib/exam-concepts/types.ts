export type ExamConceptKind = 'formula' | 'keyword' | 'condition' | 'trap' | 'process'

export interface ExamConcept {
  id: string
  kind: ExamConceptKind
  label: string
  topicSlugs: string[]
  glossarySlugs: string[]
  sourceRefs: string[]
  note: string
}
