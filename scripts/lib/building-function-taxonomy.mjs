export const FUNCTION_LOCALES = ['zh', 'zh-Hant', 'en', 'ja']

export function normalizeFunctionTerm(value) {
  return String(value || '')
    .normalize('NFKC')
    .toLocaleLowerCase('und')
    .replace(/[‐‑‒–—―]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
}

export function flattenLocalizedAliases(taxonomy) {
  return taxonomy.functions.flatMap(item =>
    FUNCTION_LOCALES.flatMap(locale =>
      (item.aliases[locale] || []).map(alias => ({
        function_slug: item.slug,
        locale,
        alias,
        normalized_alias: normalizeFunctionTerm(alias),
      })),
    ),
  )
}

export function buildAliasResolver(taxonomy) {
  const resolver = new Map()
  for (const item of flattenLocalizedAliases(taxonomy)) {
    const key = `${item.locale}:${item.normalized_alias}`
    if (resolver.has(key) && resolver.get(key) !== item.function_slug) {
      throw new Error(`Ambiguous function alias: ${key}`)
    }
    resolver.set(key, item.function_slug)
  }
  return resolver
}

function containsAlias(text, alias) {
  if (!alias) return false
  if (/^[a-z0-9 -]+$/i.test(alias)) {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i').test(text)
  }
  return text.includes(alias)
}

export function matchBuildingFunctionCandidates(building, taxonomy) {
  const fields = [
    ['name_zh', building.name_zh],
    ['name_en', building.name_en],
    ['name_ja', building.name_ja],
    ...((building.alt_names || []).map((value, index) => [`alt_names[${index}]`, value])),
  ]
    .filter(([, value]) => typeof value === 'string' && value.trim())
    .map(([field, value]) => [field, normalizeFunctionTerm(value)])

  const matches = []
  for (const item of taxonomy.functions) {
    const aliases = flattenLocalizedAliases({ functions: [item] })
    const evidence = []
    for (const [field, text] of fields) {
      for (const alias of aliases) {
        if (containsAlias(text, alias.normalized_alias)) {
          evidence.push({ field, locale: alias.locale, alias: alias.alias })
        }
      }
    }

    if (item.slug === 'mixed-use' && building.type_slug === 'mixed-use') {
      evidence.push({ field: 'type_slug', locale: 'canonical', alias: 'mixed-use' })
    }

    if (evidence.length) {
      const uniqueEvidence = Array.from(
        new Map(evidence.map(value => [`${value.field}:${value.locale}:${value.alias}`, value])).values(),
      )
      matches.push({ function_slug: item.slug, evidence: uniqueEvidence })
    }
  }
  return matches
}
