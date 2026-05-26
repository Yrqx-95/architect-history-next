type TaxonomyEntity = {
  slug: string
  name_en?: string | null
  name_zh?: string | null
  name_ja?: string | null
}

function clean(value?: string | null) {
  return value?.trim().toLowerCase() || ''
}

export function taxonomyKeys(entity: TaxonomyEntity): string[] {
  return [entity.slug, entity.name_en, entity.name_zh, entity.name_ja]
    .map(clean)
    .filter(Boolean)
}

export function matchesTaxonomy(value: string | null | undefined, entity: TaxonomyEntity): boolean {
  const target = clean(value)
  if (!target) return false
  return taxonomyKeys(entity).includes(target)
}

export function listMatchesTaxonomy(values: string[] | null | undefined, entity: TaxonomyEntity): boolean {
  if (!values?.length) return false
  return values.some(value => matchesTaxonomy(value, entity))
}
