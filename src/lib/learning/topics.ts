import type { LearningTopic } from './types'

const draftGovernance = {
  verificationStatus: 'draft' as const,
  qualityLevel: 'basic' as const,
  lastReviewed: undefined,
  reviewer: undefined,
}

export const learningTopics: LearningTopic[] = [
  { id: 'zoning-districts', slug: 'zoning-districts', category: 'code', level: 'foundation', orderIndex: 10, japaneseTerm: '用途地域', reading: 'ようとちいき', ...draftGovernance },
  { id: 'building-coverage-ratio', slug: 'building-coverage-ratio', category: 'code', level: 'foundation', orderIndex: 20, japaneseTerm: '建蔽率', reading: 'けんぺいりつ', ...draftGovernance },
  { id: 'floor-area-ratio', slug: 'floor-area-ratio', category: 'code', level: 'foundation', orderIndex: 30, japaneseTerm: '容積率', reading: 'ようせきりつ', ...draftGovernance },
  { id: 'road-access-obligation', slug: 'road-access-obligation', category: 'code', level: 'foundation', orderIndex: 40, japaneseTerm: '接道義務', reading: 'せつどうぎむ', ...draftGovernance },
  { id: 'road-slant-restriction', slug: 'road-slant-restriction', category: 'code', level: 'intermediate', orderIndex: 50, japaneseTerm: '道路斜線制限', reading: 'どうろしゃせんせいげん', ...draftGovernance },
  { id: 'north-side-slant-restriction', slug: 'north-side-slant-restriction', category: 'code', level: 'intermediate', orderIndex: 60, japaneseTerm: '北側斜線制限', reading: 'きたがわしゃせんせいげん', ...draftGovernance },
  { id: 'fire-prevention-district', slug: 'fire-prevention-district', category: 'code', level: 'foundation', orderIndex: 70, japaneseTerm: '防火地域', reading: 'ぼうかちいき', ...draftGovernance },
  { id: 'quasi-fire-prevention-district', slug: 'quasi-fire-prevention-district', category: 'code', level: 'foundation', orderIndex: 80, japaneseTerm: '準防火地域', reading: 'じゅんぼうかちいき', ...draftGovernance },
]
