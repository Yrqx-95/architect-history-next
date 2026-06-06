import { learningGraphBySlug, learningGraphNodes } from './learning-graph'
import { learningPathById } from './learning-paths'
import type { DifficultyLevel, LearningStage, TopicDependency } from './types'

export function getLearningGraphNode(slug: string) {
  return learningGraphBySlug[slug] || null
}

export function getNextTopics(slug: string): TopicDependency[] {
  return getLearningGraphNode(slug)?.nextTopics || []
}

export function getPreviousTopics(slug: string): TopicDependency[] {
  return learningGraphNodes
    .filter(node => node.nextTopics.some(topic => topic.slug === slug))
    .map(node => ({
      slug: node.topicSlug,
      reason: `Leads into ${slug}.`,
    }))
}

export function getRequiredTerms(slug: string): string[] {
  return getLearningGraphNode(slug)?.requiredGlossaryTerms || []
}

export function getRelatedTopics(slug: string): TopicDependency[] {
  return getLearningGraphNode(slug)?.relatedTopics || []
}

export function getLearningPath(pathId: string) {
  return learningPathById[pathId] || null
}

export function getTopicDifficulty(slug: string): DifficultyLevel | null {
  return getLearningGraphNode(slug)?.difficulty || null
}

export function getTopicStage(slug: string): LearningStage | null {
  return getLearningGraphNode(slug)?.learningStage || null
}
