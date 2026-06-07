export type GlossaryCategory =
  | 'code'
  | 'drawing'
  | 'planning'
  | 'area'
  | 'road'
  | 'height'
  | 'fire'
  | 'environment'
  | 'building-part'
  | 'use'
  | 'structure'
  | 'concrete'
  | 'material'
  | 'construction'

export type GlossaryTerm = {
  id: string
  slug: string
  termJa: string
  reading: string
  termZh: string
  termEn: string
  category: GlossaryCategory
  shortDefinitionZh: string
  shortDefinitionJa: string
  shortDefinitionEn: string
  searchKeywords?: string[]
  relatedCodeTopicSlug?: string
  relatedCodeTopicLabel?: string
}
