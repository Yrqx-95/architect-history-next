import { describe, expect, it } from 'vitest'

import {
  featuredArchitectContentSlugs,
  getArchitectContent,
} from '../../src/lib/architect-content'

const languages = ['zh', 'ja', 'en'] as const

describe('architect content overlays', () => {
  it('keeps every registered overlay unique and resolvable', () => {
    expect(new Set(featuredArchitectContentSlugs).size).toBe(featuredArchitectContentSlugs.length)

    for (const slug of featuredArchitectContentSlugs) {
      expect(getArchitectContent(slug), slug).not.toBeNull()
    }
  })

  it('keeps multilingual content and source evidence structurally complete', () => {
    for (const slug of featuredArchitectContentSlugs) {
      const content = getArchitectContent(slug)
      expect(content, slug).not.toBeNull()
      if (!content) continue

      expect(content.slug, slug).toBe(slug)
      expect(content.sections.length, `${slug}: sections`).toBeGreaterThan(0)
      expect(content.sources.length, `${slug}: sources`).toBeGreaterThan(0)

      for (const language of languages) {
        expect(content.summary[language].trim(), `${slug}: summary.${language}`).not.toBe('')
        expect(content.core_ideas[language].length, `${slug}: core_ideas.${language}`).toBeGreaterThan(0)

        for (const section of content.sections) {
          expect(section.title[language].trim(), `${slug}: section title.${language}`).not.toBe('')
          expect(section.paragraphs[language].length, `${slug}: paragraphs.${language}`).toBeGreaterThan(0)
          expect(
            section.paragraphs[language].every(paragraph => paragraph.trim().length > 0),
            `${slug}: non-empty paragraphs.${language}`,
          ).toBe(true)
        }

        for (const work of content.representative_works) {
          expect(work.slug.trim(), `${slug}: representative work slug`).not.toBe('')
          expect(work.note[language].trim(), `${slug}: work note.${language}`).not.toBe('')
        }
      }

      for (const source of content.sources) {
        expect(source.title.trim(), `${slug}: source title`).not.toBe('')
        expect(source.url, `${slug}: source URL`).toMatch(/^https?:\/\//)
      }

      if (content.portrait) {
        expect(content.portrait.url, `${slug}: portrait URL`).toMatch(/^(https?:\/\/|\/)/)
        if (/^https?:\/\//.test(content.portrait.url)) {
          expect(content.portrait.source_url, `${slug}: portrait source URL`).toMatch(/^https?:\/\//)
          expect(content.portrait.author.trim(), `${slug}: portrait author`).not.toBe('')
          expect(content.portrait.license.trim(), `${slug}: portrait license`).not.toBe('')
        }
        for (const language of languages) {
          expect(content.portrait.alt[language].trim(), `${slug}: portrait alt.${language}`).not.toBe('')
        }
      }
    }
  })

  it('preserves public aliases', () => {
    expect(getArchitectContent('aalto')?.slug).toBe('alvar-aalto')
    expect(getArchitectContent('lacaton-vassal')?.slug).toBe('anne-lacaton')
  })

  it('uses the canonical Aravena identity directly', () => {
    expect(getArchitectContent('aravena')?.slug).toBe('aravena')
    expect(getArchitectContent('alejandro-alavena')).toBeNull()
  })
})
