export interface BuildingCodeMapping {
  buildingSlug: string
  relatedCodeTopics: Array<{
    topicSlug: string
    reason: string
  }>
  relatedConcepts: string[]
  learningUse: string
}

export const buildingCodeMappings: BuildingCodeMapping[] = [
  {
    buildingSlug: 'fallingwater',
    relatedCodeTopics: [
      { topicSlug: 'building-coverage-ratio', reason: 'Useful for discussing footprint, site occupation, and open space around a natural topography.' },
      { topicSlug: 'road-access-obligation', reason: 'Good future case for thinking about access, approach, and site buildability.' },
    ],
    relatedConcepts: ['site planning', 'natural topography', 'building footprint', 'approach sequence'],
    learningUse: 'Future archive-to-code bridge for site planning and footprint controls.',
  },
  {
    buildingSlug: 'villa-savoye',
    relatedCodeTopics: [
      { topicSlug: 'floor-area-ratio', reason: 'Useful for separating total floor area from perceived elevated mass.' },
      { topicSlug: 'building-coverage-ratio', reason: 'Pilotis make the distinction between footprint, ground plane, and upper mass easier to discuss.' },
    ],
    relatedConcepts: ['pilotis', 'building footprint', 'total floor area', 'ground plane'],
    learningUse: 'Future conceptual case for FAR vs BCR and modernist separation of ground and volume.',
  },
  {
    buildingSlug: '8-house',
    relatedCodeTopics: [
      { topicSlug: 'floor-area-ratio', reason: 'Large mixed-use housing is useful for discussing total development intensity.' },
      { topicSlug: 'building-coverage-ratio', reason: 'The courtyard and footprint relationship can help explain site coverage.' },
    ],
    relatedConcepts: ['mixed use', 'courtyard', 'total floor area', 'site coverage'],
    learningUse: 'Future design-oriented case for area controls in collective housing.',
  },
  {
    buildingSlug: 'apple-park',
    relatedCodeTopics: [
      { topicSlug: 'building-coverage-ratio', reason: 'Useful for understanding a large footprint in relation to landscape and open space.' },
      { topicSlug: 'floor-area-ratio', reason: 'Useful for contrasting horizontal campus massing with total floor-area intensity.' },
    ],
    relatedConcepts: ['campus planning', 'large footprint', 'landscape open space', 'total floor area'],
    learningUse: 'Future case for comparing footprint control and total development intensity.',
  },
  {
    buildingSlug: 'asakusa-culture-center',
    relatedCodeTopics: [
      { topicSlug: 'road-slant-restriction', reason: 'Urban street-facing massing can help explain height envelope effects.' },
      { topicSlug: 'floor-area-ratio', reason: 'Compact urban cultural buildings are useful for discussing density and total floor area.' },
    ],
    relatedConcepts: ['street frontage', 'stacked section', 'urban massing', 'height envelope'],
    learningUse: 'Future case for street-side envelope and compact urban code constraints.',
  },
  {
    buildingSlug: 'rose-seidler-house',
    relatedCodeTopics: [
      { topicSlug: 'building-coverage-ratio', reason: 'A clear residential footprint can support beginner-level site coverage explanation.' },
      { topicSlug: 'road-access-obligation', reason: 'Useful future case for approach, driveway, and site access discussion.' },
    ],
    relatedConcepts: ['residential footprint', 'site access', 'open ground', 'modern house planning'],
    learningUse: 'Future beginner case for residential site planning vocabulary.',
  },
]

export const buildingCodeMappingsBySlug = Object.fromEntries(
  buildingCodeMappings.map(mapping => [mapping.buildingSlug, mapping])
) as Record<string, BuildingCodeMapping>
