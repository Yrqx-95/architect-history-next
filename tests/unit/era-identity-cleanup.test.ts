import { describe, expect, it } from 'vitest'
import { classifyIdentityCleanupCandidate, fetchWikidata, slugFromName } from '../../scripts/build-era-identity-cleanup-review'

describe('era identity cleanup review', () => {
  it('flags a named Wikidata record with wrong country code as safe metadata cleanup', () => {
    const item = classifyIdentityCleanupCandidate({
      current_slug: 'new-orleans',
      current_name_en: 'New Orleans',
      current_country_code: 'BE',
      wikidata_id: 'Q2522995',
      wikidata_label_en: 'New Orleans',
      wikidata_description_en: 'residential skyscraper in Rotterdam, Netherlands',
      wikidata_country_label_en: 'Netherlands',
      wikidata_country_code: 'NL',
      commons_category: 'Category:New Orleans building, Rotterdam',
    })

    expect(item.review_lane).toBe('safe-metadata-cleanup')
    expect(item.suggested_slug).toBe('new-orleans-rotterdam')
    expect(item.suggested_country_code).toBe('NL')
  })

  it('keeps unlabeled Q-id records in manual naming review', () => {
    const item = classifyIdentityCleanupCandidate({
      current_slug: 'q125679109',
      current_name_en: 'Q125679109',
      current_country_code: 'NL',
      wikidata_id: 'Q125679109',
      wikidata_label_en: '',
      wikidata_description_en: 'housing complex at Parallelweg, Schilderswijk, Den Haag, the Netherlands',
      wikidata_country_label_en: 'Netherlands',
      wikidata_country_code: 'NL',
      commons_category: '',
    })

    expect(item.review_lane).toBe('manual-name-research')
    expect(item.suggested_slug).toBe('')
    expect(item.confidence).toBe('medium')
  })

  it('sends reflecting pools to archive scope review even when Commons has a name', () => {
    const item = classifyIdentityCleanupCandidate({
      current_slug: 'q136394553',
      current_name_en: 'Q136394553',
      current_country_code: '',
      wikidata_id: 'Q136394553',
      wikidata_label_en: '',
      wikidata_description_en: '',
      wikidata_country_label_en: 'Italy',
      wikidata_country_code: 'IT',
      wikidata_instance_of_label_en: 'reflecting pool',
      commons_category: 'Category:Fontana di Piazzale della Pace (Parma)',
    })

    expect(item.review_lane).toBe('archive-scope-review')
    expect(item.suggested_slug).toBe('fontana-di-piazzale-della-pace-parma')
  })

  it('builds stable lowercase slugs from public names', () => {
    expect(slugFromName('Capela do Monte')).toBe('capela-do-monte')
    expect(slugFromName('Jesús Church (San Sebastián)')).toBe('jesus-church-san-sebastian')
  })

  it('handles an empty Wikidata queue after all identity candidates are resolved', async () => {
    await expect(fetchWikidata([])).resolves.toEqual({})
  })
})
