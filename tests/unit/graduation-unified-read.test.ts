import { describe, expect, it } from 'vitest'

import type { GraduationCase } from '../../src/lib/graduation'
import {
  mergeGraduationCases,
  type GraduationArchitectRow,
  type GraduationBuildingRow,
  type GraduationImageRow,
  type GraduationProfileRow,
} from '../../src/lib/graduation-unified'

const fallback: GraduationCase = {
  id: 'CASE-001',
  name: '旧名称',
  name_en: 'Old name',
  name_ja: '旧名称',
  location: '旧地点',
  location_en: 'Old place',
  location_ja: '旧所在地',
  image_url: 'https://fallback.example/image.jpg',
  image_source_url: 'https://fallback.example/source',
  image_license: 'CC BY 4.0',
  image_credit: 'Reviewed fallback photographer',
  concept: '旧概念内容，必须被 profile 内容替换。',
  concept_en: 'Old concept',
  concept_ja: '旧コンセプト',
  keywords: ['旧关键词'],
  keywords_en: ['old'],
  keywords_ja: ['旧'],
  source_url: 'https://fallback.example/project',
  year: 1900,
  architect: 'Old architect',
  status: 'published',
}

const profile: GraduationProfileRow = {
  case_id: 'CASE-001',
  building_id: 'building-1',
  concept_zh: '统一 profile 中的毕业研究概念内容。',
  concept_zh_hant: null,
  concept_en: 'Unified profile concept',
  concept_ja: '統合プロフィールのコンセプト',
  keywords_zh: ['图书馆'],
  keywords_zh_hant: [],
  keywords_en: ['library'],
  keywords_ja: ['図書館'],
  plan_url: null,
  section_url: null,
  source_url: 'https://profile.example/project',
  publication_status: 'published',
}

const building: GraduationBuildingRow = {
  id: 'building-1',
  slug: 'canonical-library',
  name_zh: '统一图书馆',
  name_en: 'Canonical Library',
  name_ja: '統合図書館',
  architect_id: 'architect-1',
  architect_slug: 'canonical-architect',
  year_start: 2020,
  city: '东京',
  country: '日本',
}

const architect: GraduationArchitectRow = {
  id: 'architect-1',
  slug: 'canonical-architect',
  name_en: 'Canonical Architect',
}

const safeImage: GraduationImageRow = {
  building_id: 'building-1',
  url_original: 'https://upload.wikimedia.org/canonical-library.jpg',
  photographer: 'Verified Photographer',
  source: 'Wikimedia Commons',
  license: 'CC BY-SA 4.0',
  source_url: 'https://commons.wikimedia.org/wiki/File:Canonical_Library.jpg',
  is_primary: true,
}

describe('graduation JSON + Supabase dual read', () => {
  it('replaces canonical facts and profile analysis while preserving CASE identity', () => {
    const result = mergeGraduationCases({
      fallbackCases: [fallback],
      profiles: [profile],
      buildings: [building],
      architects: [architect],
      images: [safeImage],
      approvedCanonicalImageSourceUrls: new Set([safeImage.source_url]),
    })
    const item = result.cases[0]

    expect(item.id).toBe('CASE-001')
    expect(item.name_en).toBe('Canonical Library')
    expect(item.architect).toBe('Old architect')
    expect(item.year).toBe(2020)
    expect(item.concept).toBe(profile.concept_zh)
    expect(item.source_url).toBe(profile.source_url)
    expect(item.image_url).toBe(safeImage.url_original)
    expect(item.image_credit).toContain('Verified Photographer')
    expect(result.diagnostics.unifiedCaseIds).toEqual(['CASE-001'])
    expect(result.diagnostics.canonicalImageCaseIds).toEqual(['CASE-001'])
  })

  it('keeps the reviewed JSON image when canonical primary images are ambiguous', () => {
    const result = mergeGraduationCases({
      fallbackCases: [fallback],
      profiles: [profile],
      buildings: [building],
      architects: [architect],
      images: [safeImage, { ...safeImage, url_original: 'https://upload.wikimedia.org/duplicate.jpg' }],
      approvedCanonicalImageSourceUrls: new Set([safeImage.source_url]),
    })

    expect(result.cases[0].image_url).toBe(fallback.image_url)
    expect(result.cases[0].image_credit).toBe(fallback.image_credit)
    expect(result.diagnostics.fallbackImageCaseIds).toEqual(['CASE-001'])
  })

  it('rejects incomplete or low-confidence canonical image provenance', () => {
    const result = mergeGraduationCases({
      fallbackCases: [fallback],
      profiles: [profile],
      buildings: [building],
      architects: [architect],
      images: [{
        ...safeImage,
        photographer: null,
        source_url: 'https://upload.wikimedia.org/direct-file.jpg',
      }],
      approvedCanonicalImageSourceUrls: new Set([safeImage.source_url]),
    })

    expect(result.cases[0].image_url).toBe(fallback.image_url)
    expect(result.diagnostics.canonicalImageCaseIds).toEqual([])
  })

  it('preserves non-migrated JSON cases and missing relations as fallback', () => {
    const second = { ...fallback, id: 'CASE-002', name_en: 'JSON-only case' }
    const result = mergeGraduationCases({
      fallbackCases: [fallback, second],
      profiles: [profile, { ...profile, case_id: 'CASE-003', building_id: 'missing' }],
      buildings: [building],
      architects: [architect],
      images: [safeImage],
      approvedCanonicalImageSourceUrls: new Set([safeImage.source_url]),
    })

    expect(result.cases.find(item => item.id === 'CASE-002')?.name_en).toBe('JSON-only case')
    expect(result.diagnostics.missingFallbackCaseIds).toEqual(['CASE-003'])
  })

  it('keeps two CASE analyses that reference the same canonical building', () => {
    const secondFallback: GraduationCase = {
      ...fallback,
      id: 'CASE-065',
      concept: '第二套旧分析',
      keywords: ['旧关键词二'],
    }
    const secondProfile: GraduationProfileRow = {
      ...profile,
      case_id: 'CASE-065',
      concept_zh: '同一建筑的第二套毕业研究分析。',
      keywords_zh: ['育儿', '土间'],
    }
    const result = mergeGraduationCases({
      fallbackCases: [fallback, secondFallback],
      profiles: [profile, secondProfile],
      buildings: [building],
      architects: [architect],
      images: [safeImage],
    })

    expect(result.cases.map(item => item.id)).toEqual(['CASE-001', 'CASE-065'])
    expect(result.cases.map(item => item.name_en)).toEqual(['Canonical Library', 'Canonical Library'])
    expect(result.cases[0].concept).toBe(profile.concept_zh)
    expect(result.cases[1].concept).toBe(secondProfile.concept_zh)
    expect(result.cases[1].keywords).toEqual(secondProfile.keywords_zh)
    expect(result.diagnostics.unifiedCaseIds).toEqual(['CASE-001', 'CASE-065'])
  })
})
