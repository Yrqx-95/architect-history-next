import { describe, expect, it } from 'vitest'
import { classifyMatch, diceSimilarity, normalizeArchitectIdentity, normalizeIdentity, scoreCandidate } from '../../scripts/match-graduation-cases-to-buildings'

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

  it('normalizes common architecture-practice suffixes without project-specific aliases', () => {
    expect(normalizeArchitectIdentity('Toyo Ito & Associates')).toBe('toyo ito')
    expect(normalizeArchitectIdentity('Steven Holl Architects')).toBe('steven holl')
  })

  it('keeps distinctive short project names as probable aliases', () => {
    const candidate = scoreCandidate(
      { ...baseCase, name: 'Kiasma Museum of Contemporary Art', name_en: 'Kiasma Museum of Contemporary Art', year: 1998 },
      { ...baseBuilding, slug: 'kiasma', name_en: 'Kiasma', year_start: 1998, architect_slug: 'steven-holl' },
      'steven-holl',
    )
    expect(candidate.name_similarity).toBe(0.9)
    expect(classifyMatch(baseCase, [candidate])).toBe('probable-match')
  })

  it('recognizes theater and opera-house wording only as a review candidate', () => {
    const item = { ...baseCase, name: 'National Taichung Theater', name_en: 'National Taichung Theater', year: 2016 }
    const candidate = scoreCandidate(
      item,
      { ...baseBuilding, slug: 'taichung-metropolitan-opera', name_en: 'Taichung Metropolitan Opera House', year_start: 2016, architect_slug: 'toyo-ito' },
      'toyo-ito',
    )
    expect(candidate.name_similarity).toBe(0.9)
    expect(classifyMatch(item, [candidate])).toBe('probable-match')
  })

  it('does not treat a location-only slug as a distinctive project alias', () => {
    const candidate = scoreCandidate(
      { ...baseCase, name: 'Naoshima Honmura Lounge and Archive', name_en: 'Naoshima Honmura Lounge and Archive', year: null },
      { ...baseBuilding, slug: 'naoshima', name_en: 'Naoshima Contemporary Art Museum', year_start: null, architect_slug: null },
      null,
    )
    expect(candidate.name_similarity).toBeLessThan(0.9)
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
