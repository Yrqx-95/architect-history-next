import { describe, expect, it } from 'vitest'
import { classifyMatch, diceSimilarity, normalizeIdentity, scoreCandidate } from '../../scripts/match-graduation-cases-to-buildings'

const baseCase = {
  id: 'CASE-X',
  name: 'Seattle Central Library',
  name_en: 'Seattle Central Library',
  location: 'Seattle United States',
  year: 2004,
  architect: 'OMA',
  source_url: 'https://example.com',
  status: 'published' as const,
}

const baseBuilding = {
  id: 'building-x',
  slug: 'seattle-central-library',
  name_en: 'Seattle Central Library',
  name_zh: '西雅图中央图书馆',
  name_ja: null,
  architect_slug: 'oma',
  year_start: 2004,
  city: 'Seattle',
  country: 'United States',
  country_code: 'US',
  official_url: null,
  wikipedia_url: null,
  wikidata_id: null,
}

describe('graduation case matching', () => {
  it('normalizes punctuation, accents, and generic words', () => {
    expect(normalizeIdentity('The Muséum & Building')).toBe('museum and')
  })

  it('recognizes close project-name variants', () => {
    expect(diceSimilarity('Centre Pompidou Metz', 'Centre Pompidou-Metz')).toBe(1)
  })

  it('classifies corroborated identical names as exact matches', () => {
    const candidate = scoreCandidate(baseCase, baseBuilding, 'oma')
    expect(candidate.score).toBeGreaterThan(120)
    expect(classifyMatch(baseCase, [candidate])).toBe('exact-match')
  })

  it('does not auto-link a name when architect identity conflicts', () => {
    const candidate = scoreCandidate(baseCase, { ...baseBuilding, architect_slug: 'other-studio' }, 'oma')
    expect(candidate.conflicts).toHaveLength(1)
    expect(classifyMatch(baseCase, [candidate])).toBe('identity-review')
  })

  it('sends a sourced case without a credible candidate to the new-building lane', () => {
    expect(classifyMatch(baseCase, [])).toBe('new-building-candidate')
  })
})
