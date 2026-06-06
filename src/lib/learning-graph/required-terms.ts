export interface TopicTermSet {
  topicSlug: string
  requiredTerms: string[]
  mustKnowTerms: string[]
  relatedTerms: string[]
}

export const topicTermSets: TopicTermSet[] = [
  {
    topicSlug: 'zoning-districts',
    requiredTerms: ['zoning-districts'],
    mustKnowTerms: ['commercial-district', 'category-one-low-rise-residential-district', 'apartment-house'],
    relatedTerms: ['building-coverage-ratio', 'floor-area-ratio', 'fire-prevention-district'],
  },
  {
    topicSlug: 'building-coverage-ratio',
    requiredTerms: ['building-coverage-ratio', 'building-area', 'site-area'],
    mustKnowTerms: ['corner-lot-relaxation', 'fire-prevention-district', 'fire-resistant-building'],
    relatedTerms: ['floor-area-ratio', 'quasi-fire-prevention-district'],
  },
  {
    topicSlug: 'floor-area-ratio',
    requiredTerms: ['floor-area-ratio', 'total-floor-area', 'site-area'],
    mustKnowTerms: ['front-road', 'road-width', 'zoning-districts'],
    relatedTerms: ['building-coverage-ratio', 'road-slant-restriction'],
  },
  {
    topicSlug: 'road-access-obligation',
    requiredTerms: ['road-access-obligation', 'front-road', 'road-width'],
    mustKnowTerms: ['evacuation', 'site-area'],
    relatedTerms: ['floor-area-ratio', 'road-slant-restriction'],
  },
  {
    topicSlug: 'road-slant-restriction',
    requiredTerms: ['road-slant-restriction', 'front-road', 'road-width', 'zoning-districts'],
    mustKnowTerms: ['site-area', 'sky-factor'],
    relatedTerms: ['north-side-slant-restriction', 'floor-area-ratio'],
  },
  {
    topicSlug: 'north-side-slant-restriction',
    requiredTerms: ['north-side-slant-restriction', 'category-one-low-rise-residential-district'],
    mustKnowTerms: ['shadow-regulation', 'site-area'],
    relatedTerms: ['road-slant-restriction', 'sky-factor'],
  },
  {
    topicSlug: 'fire-prevention-district',
    requiredTerms: ['fire-prevention-district', 'fire-resistant-building'],
    mustKnowTerms: ['major-structural-parts', 'opening', 'exterior-wall'],
    relatedTerms: ['quasi-fire-prevention-district', 'building-coverage-ratio'],
  },
  {
    topicSlug: 'quasi-fire-prevention-district',
    requiredTerms: ['quasi-fire-prevention-district', 'quasi-fire-resistant-building'],
    mustKnowTerms: ['fire-protective-construction', 'opening', 'exterior-wall'],
    relatedTerms: ['fire-prevention-district', 'building-coverage-ratio'],
  },
]

export const topicTermSetBySlug = Object.fromEntries(
  topicTermSets.map(set => [set.topicSlug, set])
) as Record<string, TopicTermSet>
