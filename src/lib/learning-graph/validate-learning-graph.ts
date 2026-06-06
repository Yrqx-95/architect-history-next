import { glossaryTerms } from '../glossary'
import { learningTopics } from '../learning'
import { learningGraphNodes } from './learning-graph'
import { learningPaths } from './learning-paths'
import type { LearningGraphNode, LearningGraphValidationIssue, LearningGraphValidationReport } from './types'

const requiredArrayFields: Array<keyof LearningGraphNode> = [
  'requiredGlossaryTerms',
  'nextTopics',
  'examConcepts',
  'learningObjectives',
  'commonConfusions',
]

export function validateLearningGraph(): LearningGraphValidationReport {
  const topicSlugs = new Set(learningTopics.map(topic => topic.slug))
  const glossarySlugs = new Set(glossaryTerms.map(term => term.slug))
  const graphSlugs = new Set(learningGraphNodes.map(node => node.topicSlug))
  const issues: LearningGraphValidationIssue[] = []

  for (const topic of learningTopics) {
    if (!graphSlugs.has(topic.slug)) {
      issues.push({
        type: 'missing-node',
        slug: topic.slug,
        message: `Learning topic "${topic.slug}" is missing a learning graph node.`,
      })
    }
  }

  for (const node of learningGraphNodes) {
    if (!topicSlugs.has(node.topicSlug)) {
      issues.push({
        type: 'missing-topic',
        slug: node.topicSlug,
        message: `Learning graph node "${node.topicSlug}" does not match an existing learning topic.`,
      })
    }

    if (!node.difficulty) {
      issues.push({
        type: 'missing-required-field',
        slug: node.topicSlug,
        field: 'difficulty',
        message: `Learning graph node "${node.topicSlug}" is missing difficulty.`,
      })
    }

    if (!node.learningStage) {
      issues.push({
        type: 'missing-required-field',
        slug: node.topicSlug,
        field: 'learningStage',
        message: `Learning graph node "${node.topicSlug}" is missing learningStage.`,
      })
    }

    for (const field of requiredArrayFields) {
      const value = node[field]
      if (!Array.isArray(value) || value.length === 0) {
        issues.push({
          type: 'missing-required-field',
          slug: node.topicSlug,
          field,
          message: `Learning graph node "${node.topicSlug}" has no ${field}.`,
        })
      }
    }

    for (const termSlug of node.requiredGlossaryTerms) {
      if (!glossarySlugs.has(termSlug)) {
        issues.push({
          type: 'broken-glossary-reference',
          slug: node.topicSlug,
          field: 'requiredGlossaryTerms',
          reference: termSlug,
          message: `Learning graph node "${node.topicSlug}" references missing glossary term "${termSlug}".`,
        })
      }
    }

    for (const field of ['requiredTopics', 'nextTopics', 'relatedTopics'] as const) {
      for (const dependency of node[field]) {
        if (!topicSlugs.has(dependency.slug)) {
          issues.push({
            type: 'broken-topic-reference',
            slug: node.topicSlug,
            field,
            reference: dependency.slug,
            message: `Learning graph node "${node.topicSlug}" has broken ${field} reference "${dependency.slug}".`,
          })
        }
      }
    }
  }

  for (const path of learningPaths) {
    for (const topicSlug of path.topicOrder) {
      if (!topicSlugs.has(topicSlug)) {
        issues.push({
          type: 'broken-topic-reference',
          slug: path.id,
          reference: topicSlug,
          message: `Learning path "${path.id}" references missing topic "${topicSlug}".`,
        })
      }
    }
  }

  return {
    ok: issues.length === 0,
    topicCount: learningGraphNodes.length,
    pathCount: learningPaths.length,
    issues,
  }
}
