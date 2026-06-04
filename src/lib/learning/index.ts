import type { Lang } from '@/lib/types'
import type { LearningCategory, LocalizedLearningTopic } from './types'
import { learningTopics } from './topics'
import { allLearningTopicTranslations } from './translations'
import { legalReferences } from './sources'

export * from './types'
export { learningTopics } from './topics'
export { learningTopicTranslations, allLearningTopicTranslations } from './translations'
export { legalReferences } from './sources'

export function getLearningTopics(category?: LearningCategory) {
  return learningTopics
    .filter(topic => !category || topic.category === category)
    .sort((a, b) => a.orderIndex - b.orderIndex)
}

export function getLearningTopic(slug: string) {
  return learningTopics.find(topic => topic.slug === slug)
}

export function getLocalizedLearningTopic(slug: string, lang: string): LocalizedLearningTopic | null {
  const topic = getLearningTopic(slug)
  if (!topic) return null
  const locale = (['zh', 'en', 'ja'].includes(lang) ? lang : 'zh') as Lang
  const translation =
    allLearningTopicTranslations.find(item => item.topicId === topic.id && item.locale === locale) ||
    allLearningTopicTranslations.find(item => item.topicId === topic.id && item.locale === 'zh')
  if (!translation) return null
  return {
    ...topic,
    ...translation,
    references: legalReferences.filter(ref => ref.topicId === topic.id),
  }
}

export function getLocalizedLearningTopics(lang: string, category?: LearningCategory) {
  return getLearningTopics(category)
    .map(topic => getLocalizedLearningTopic(topic.slug, lang))
    .filter((topic): topic is LocalizedLearningTopic => Boolean(topic))
}
