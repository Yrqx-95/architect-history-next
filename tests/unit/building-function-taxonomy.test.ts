import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import {
  buildAliasResolver,
  flattenLocalizedAliases,
  matchBuildingFunctionCandidates,
  normalizeFunctionTerm,
} from '../../scripts/lib/building-function-taxonomy.mjs'

const taxonomy = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'db/taxonomies/building-functions-v1.json'), 'utf8'),
)

describe('building function taxonomy', () => {
  it('contains complete four-language labels and unambiguous aliases', () => {
    expect(taxonomy.functions).toHaveLength(12)
    for (const item of taxonomy.functions) {
      expect(Object.keys(item.names).sort()).toEqual(['en', 'ja', 'zh', 'zh-Hant'].sort())
    }
    const aliases = flattenLocalizedAliases(taxonomy)
    expect(
      new Set(
        aliases.map((item: { locale: string; normalized_alias: string }) => `${item.locale}:${item.normalized_alias}`),
      ).size,
    ).toBe(aliases.length)
    expect(() => buildAliasResolver(taxonomy)).not.toThrow()
  })

  it.each([
    ['zh', '图书馆'],
    ['zh-Hant', '圖書館'],
    ['en', 'library'],
    ['ja', '図書館'],
  ])('resolves %s library terms to the same canonical slug', (locale, query) => {
    const resolver = buildAliasResolver(taxonomy)
    expect(resolver.get(`${locale}:${normalizeFunctionTerm(query)}`)).toBe('library')
  })

  it('creates candidates without approving name-only evidence', () => {
    const matches = matchBuildingFunctionCandidates(
      {
        name_zh: '西雅图中央图书馆',
        name_en: 'Seattle Central Library',
        name_ja: 'シアトル中央図書館',
        alt_names: [],
        type_slug: 'cultural',
      },
      taxonomy,
    )
    expect(matches.map(item => item.function_slug)).toContain('library')
    expect(matches.find(item => item.function_slug === 'library')?.evidence.length).toBeGreaterThan(0)
  })
})
