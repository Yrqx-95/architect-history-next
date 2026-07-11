import decisions from '../../db/review-decisions/building-function-library-001.json'
import queue from '../../db/review-queues/building-function-candidates-001.json'
import taxonomy from '../../db/taxonomies/building-functions-v1.json'
import { buildAliasResolver, normalizeFunctionTerm } from '../../scripts/lib/building-function-taxonomy.mjs'
import { describe, expect, it } from 'vitest'

const libraryCandidates = queue.candidates.filter(item => item.function_slug === 'library')
const approvedLibrarySlugs = decisions.decisions
  .filter(item => item.decision === 'approved' && item.approved_functions.includes('library'))
  .map(item => item.building_slug)
  .sort()

describe('library function review batch 001', () => {
  it('covers each library candidate exactly once', () => {
    expect(decisions.scope.candidate_count).toBe(20)
    expect(decisions.decisions).toHaveLength(20)
    expect(new Set(decisions.decisions.map(item => item.building_id)).size).toBe(20)
    expect(new Set(decisions.decisions.map(item => item.building_slug)).size).toBe(20)
    expect(approvedLibrarySlugs).toEqual(libraryCandidates.map(item => item.building_slug).sort())
  })

  it('requires traceable source evidence for every approval', () => {
    for (const item of decisions.decisions) {
      expect(item.decision).toBe('approved')
      expect(item.evidence.url).toMatch(/^https:\/\//)
      expect(item.evidence.source_type).toMatch(/^(official|wikidata)/)
      expect(item.evidence.claim.length).toBeGreaterThan(30)
    }
  })

  it('uses only functions defined by the taxonomy', () => {
    const knownFunctions = new Set(taxonomy.functions.map(item => item.slug))
    for (const item of decisions.decisions) {
      for (const functionSlug of item.approved_functions) {
        expect(knownFunctions.has(functionSlug)).toBe(true)
      }
    }
  })

  it('preserves three source-supported multi-use relationships', () => {
    const multiUse = decisions.decisions.filter(item => item.approved_functions.length > 1)
    expect(multiUse.map(item => item.building_slug).sort()).toEqual([
      'hill-museum-manuscript-library',
      'lyndon-baines-johnson-library-and',
      'musashino-art-museum',
    ])
    expect(multiUse.every(item => item.approved_functions.includes('museum'))).toBe(true)
  })

  it.each([
    ['zh', '图书馆'],
    ['zh-Hant', '圖書館'],
    ['en', 'library'],
    ['ja', '図書館'],
  ])('returns the same approved set for %s library lookup', (locale, query) => {
    const resolver = buildAliasResolver(taxonomy)
    const functionSlug = resolver.get(`${locale}:${normalizeFunctionTerm(query)}`)
    const result = decisions.decisions
      .filter(item => item.decision === 'approved' && item.approved_functions.includes(functionSlug || ''))
      .map(item => item.building_slug)
      .sort()

    expect(functionSlug).toBe('library')
    expect(result).toEqual(approvedLibrarySlugs)
  })

  it('routes metadata conflicts without mutating canonical fields', () => {
    const findings = decisions.decisions.flatMap(
      item => item.metadata_findings as Array<{ severity: string; action: string }>,
    )
    expect(findings.filter(item => item.severity === 'warning')).toHaveLength(5)
    expect(findings.every(item => item.action.length > 20)).toBe(true)
  })
})
