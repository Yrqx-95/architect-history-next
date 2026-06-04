import type { LearningSourceMaterial, LearningSourceTopicNote } from './types'

const classMaterialCopyrightNote =
  'Do not reproduce full text or scanned pages. Use only for private study reference, short citation, page reference, and editorial paraphrase.'

export const classLearningSourceMaterials: LearningSourceMaterial[] = [
  {
    id: 'houki-ii-exercises-2026-first-term',
    slug: 'houki-ii-exercises-2026-first-term',
    title: '法規Ⅱ_演習_2026前期.pdf',
    sourceType: 'exam_material',
    language: 'ja',
    year: 2026,
    fileName: '法規Ⅱ_演習_2026前期.pdf',
    usageScope: 'reference_only',
    copyrightNote: classMaterialCopyrightNote,
    relatedTopicSlugs: [
      'road-slant-restriction',
      'north-side-slant-restriction',
    ],
    relatedGlossarySlugs: [
      'road-slant-restriction',
      'north-side-slant-restriction',
      'sky-factor',
      'shadow-regulation',
    ],
    coveredAreas: ['高さ制限', '避難施設', '内装制限', '確認申請'],
    extractionStatus: 'draft',
    reviewer: undefined,
    lastReviewed: undefined,
    notes:
      'Class exercise material used as a private study reference for identifying exam-style prompts, calculation patterns, and final-exam scope. Do not store full questions, answer text, or scanned pages in the repository.',
  },
  {
    id: 'houki-ii-underlined-law-book-2025',
    slug: 'houki-ii-underlined-law-book-2025',
    title: '法規Ⅱ_アンダーライン_法令集2025年版.pdf',
    sourceType: 'law_book',
    language: 'ja',
    year: 2025,
    fileName: '法規Ⅱ_アンダーライン_法令集2025年版.pdf',
    usageScope: 'reference_only',
    copyrightNote: classMaterialCopyrightNote,
    relatedTopicSlugs: [
      'road-slant-restriction',
      'north-side-slant-restriction',
    ],
    relatedGlossarySlugs: [
      'road-slant-restriction',
      'north-side-slant-restriction',
      'sky-factor',
      'shadow-regulation',
    ],
    coveredAreas: ['建築基準法', '高さ制限', '避難施設', '内装制限', '確認申請'],
    extractionStatus: 'draft',
    reviewer: undefined,
    lastReviewed: undefined,
    notes:
      'Underlined law-book material used only as a private reference for locating highlighted articles and confirming study emphasis. Official legal verification must still use public official sources such as e-Gov.',
  },
]

export const classLearningSourceTopicNotes: LearningSourceTopicNote[] = [
  {
    topicSlug: 'road-slant-restriction',
    sourceMaterialIds: [
      'houki-ii-exercises-2026-first-term',
      'houki-ii-underlined-law-book-2025',
    ],
    referenceScope: ['高さ制限 1〜5', '高さ制限５ 解答の穴埋めキーワード'],
    note:
      'Referenced only to strengthen exam focus, worked examples, and memory tips around road height restriction keywords. No full problem statements or scanned pages are reproduced.',
  },
  {
    topicSlug: 'north-side-slant-restriction',
    sourceMaterialIds: [
      'houki-ii-exercises-2026-first-term',
      'houki-ii-underlined-law-book-2025',
    ],
    referenceScope: ['高さ制限 1〜5', '高さ制限５ 解答の穴埋めキーワード'],
    note:
      'Referenced only to strengthen exam focus, worked examples, and memory tips around north-side height restriction keywords. No full problem statements or scanned pages are reproduced.',
  },
]
