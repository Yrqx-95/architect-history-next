type TaxonomyEntity = {
  slug: string
  name_en?: string | null
  name_zh?: string | null
  name_ja?: string | null
}

function clean(value?: string | null) {
  return value?.trim().toLowerCase() || ''
}

export function normalizeTaxonomyValue(value?: string | null) {
  const base = clean(value)
    .replace(/[_/]+/g, ' ')
    .replace(/-/g, ' ')
    .replace(/[()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  return base
    .replace(/\s+(architecture|architectural|building|buildings|type|types)$/g, '')
    .trim()
}

export function taxonomyKeys(entity: TaxonomyEntity): string[] {
  return [...new Set(
    [entity.slug, entity.name_en, entity.name_zh, entity.name_ja]
      .flatMap(value => [clean(value), normalizeTaxonomyValue(value)])
      .filter(Boolean)
  )]
}

export function matchesTaxonomy(value: string | null | undefined, entity: TaxonomyEntity): boolean {
  const target = clean(value)
  if (!target) return false
  const normalizedTarget = normalizeTaxonomyValue(value)
  const keys = taxonomyKeys(entity)
  return keys.includes(target) || keys.includes(normalizedTarget)
}

export function listMatchesTaxonomy(values: string[] | null | undefined, entity: TaxonomyEntity): boolean {
  if (!values?.length) return false
  return values.some(value => matchesTaxonomy(value, entity))
}
