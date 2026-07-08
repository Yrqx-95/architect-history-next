import type { LearningSourceMaterial, LearningSourceType } from './types'

const copyrightNote =
  'Do not reproduce full text, questions, answers, tables, or scanned pages. Use only for private editorial review, terminology extraction, page reference, and original paraphrase.'

type SourceInput = {
  id: string
  fileName: string
  sourceType: LearningSourceType
  areas: string[]
  notes: string
}

function source(input: SourceInput): LearningSourceMaterial {
  return {
    id: input.id,
    slug: input.id,
    title: input.fileName,
    sourceType: input.sourceType,
    language: 'ja',
    year: 2025,
    fileName: input.fileName,
    usageScope: 'reference_only',
    copyrightNote,
    relatedTopicSlugs: [],
    relatedGlossarySlugs: [],
    coveredAreas: input.areas,
    extractionStatus: 'draft',
    notes: input.notes,
  }
}

export const remainingLearningSourceMaterials: LearningSourceMaterial[] = [
  source({
    id: 'planning-2025-01',
    fileName: '250416_第一回目.pdf',
    sourceType: 'course_deck',
    areas: ['建築計画', '単位と寸法', '人体寸法', 'モデュール'],
    notes: 'Page signals extracted. Dimensional recommendations remain contextual and must not be presented as universal requirements.',
  }),
  source({
    id: 'history-jp-2025-01',
    fileName: '250416_第一回目歴史.pdf',
    sourceType: 'course_deck',
    areas: ['竪穴式住居', '神社建築', '古代寺院', '法隆寺'],
    notes: 'Page signals extracted. Dates, reconstructions, and attributions require heritage or academic verification.',
  }),
  source({
    id: 'planning-2025-02',
    fileName: '250421_第二回目.pdf',
    sourceType: 'course_deck',
    areas: ['畳', '縮尺', 'グルーピング', 'ゾーニング', '動線'],
    notes: 'Mixed embedded text and OCR. Candidate terminology is retained with page references for review.',
  }),
  source({
    id: 'history-jp-2025-02',
    fileName: '250421_第二回目歴史.pdf',
    sourceType: 'course_deck',
    areas: ['古代都市', '浄土教建築', '中世寺院', '寝殿造', '書院造'],
    notes: 'OCR-derived page signals only. Historical claims remain draft.',
  }),
  source({
    id: 'planning-2025-03',
    fileName: '250428_第三回目.pdf',
    sourceType: 'course_deck',
    areas: ['動線', '扉', '窓', '屋根', '階段'],
    notes: 'Page signals extracted. Product examples and code-adjacent dimensions require separate review.',
  }),
  source({
    id: 'history-jp-2025-03',
    fileName: '250428_第三回目歴史.pdf',
    sourceType: 'course_deck',
    areas: ['城郭建築', '茶室', '数寄屋', '近世寺社', '民家'],
    notes: 'OCR-derived page signals only. Building dates and authorship require external verification.',
  }),
  source({
    id: 'history-jp-2025-035',
    fileName: '250512_第三.五回目.pdf',
    sourceType: 'course_deck',
    areas: ['町家', '格子', '虫籠窓', '合掌造り', '白川郷'],
    notes: 'Supplemental vernacular-housing deck scanned with page-targeted signals.',
  }),
  source({
    id: 'planning-2025-04',
    fileName: '250609_第四回目.pdf',
    sourceType: 'course_deck',
    areas: ['廊下', '単位空間', '住宅諸室', '食寝分離', '台所形式'],
    notes: 'Page signals extracted. Residential dimensions are examples rather than universal standards.',
  }),
  source({
    id: 'history-modern-jp-2025',
    fileName: '250609_第四回目歴史.pdf',
    sourceType: 'course_deck',
    areas: ['日本近代建築', '洋風建築', '辰野金吾', '歴史主義', 'モダニズム'],
    notes: 'Modern-history page signals extracted. Architect and building facts require primary or institutional sources.',
  }),
  source({
    id: 'planning-2025-05',
    fileName: '250616_第五回目.pdf',
    sourceType: 'course_deck',
    areas: ['住宅諸室', '住宅平面', 'コートハウス', '住宅事例', '住宅工法'],
    notes: 'Page signals extracted. Case-study relationships and dimensions remain draft.',
  }),
  source({
    id: 'history-modern-jp-cases-2025',
    fileName: '250616_第五回目歴史.pdf',
    sourceType: 'course_deck',
    areas: ['日本モダニズム', '戦災復興', '住宅政策', 'DK住宅', 'ポストモダニズム'],
    notes: 'OCR-derived page signals only. Public historical narratives require independent source review.',
  }),
  source({
    id: 'history-western-2025-01',
    fileName: '250623_第六回目.pdf',
    sourceType: 'course_deck',
    areas: ['エジプト建築', 'オリエント建築', 'ギリシア建築', 'ローマ建築'],
    notes: 'Western-history page signals extracted. Names, dates, and transliterations remain draft.',
  }),
  source({
    id: 'history-western-2025-02',
    fileName: '250630_第七回目.pdf',
    sourceType: 'course_deck',
    areas: ['初期キリスト教', 'ビザンティン', 'イスラム', 'ロマネスク', 'ゴシック'],
    notes: 'Western-history page signals extracted. Style boundaries and monuments require academic verification.',
  }),
  source({
    id: 'planning-housing-2025-01',
    fileName: '251006_建築計画_第一回目_集合住宅1.pdf',
    sourceType: 'course_deck',
    areas: ['集合住宅', 'アクセス形式', '住戸断面', 'メゾネット', 'スキップフロア'],
    notes: 'Housing-type page signals extracted. Code-related floor-area statements require official verification.',
  }),
  source({
    id: 'rc-construction-2025',
    fileName: '251006_鉄筋コンクリート造.pdf',
    sourceType: 'course_deck',
    areas: ['RC施工', '型枠', '配筋', 'ラーメン構造', '部材寸法'],
    notes: 'Construction sequence and drawing signals extracted. Detailing values remain draft.',
  }),
  source({
    id: 'planning-housing-2025-02',
    fileName: '251020_建築計画_第二回目_集合住宅2.pdf',
    sourceType: 'course_deck',
    areas: ['集合住宅事例', '雁行型', '近隣住区', '住宅地計画'],
    notes: 'Case-study page signals extracted. Architect, date, and project descriptions require verification.',
  }),
  source({
    id: 'exam-housing-2025',
    fileName: '251020_建築計画Ⅰ_後期_集合住宅の問題+解答.pdf',
    sourceType: 'answer_reference',
    areas: ['集合住宅形式', '住戸アクセス', '住宅地計画', '試験概念'],
    notes: 'Concept coverage only. No question wording, choices, or answer text may be republished.',
  }),
  source({
    id: 'planning-office-2025',
    fileName: '251027_建築計画_第三回目_事務所.pdf',
    sourceType: 'course_deck',
    areas: ['事務所', 'ゾーニング', 'レンタブル比', 'コアプラン', 'モジュラープランニング'],
    notes: 'Office-planning page signals extracted. Ratios and dimensional guidance remain contextual.',
  }),
  source({
    id: 'exam-office-2025',
    fileName: '251027_建築計画Ⅰ_後期_事務所の問題+解答.pdf',
    sourceType: 'answer_reference',
    areas: ['コアプラン', 'レンタブル比', '事務室計画', '試験概念'],
    notes: 'Concept coverage only. No question or answer structure is stored.',
  }),
  source({
    id: 'planning-commercial-2025',
    fileName: '251201_建築計画_第四回目_商業建築.pdf',
    sourceType: 'course_deck',
    areas: ['商業建築史', 'パサージュ', '百貨店', 'ショッピングセンター', '店舗計画'],
    notes: 'Commercial-planning page signals extracted. Case studies and industry definitions require verification.',
  }),
  source({
    id: 'exam-commercial-2025',
    fileName: '251201_建築計画Ⅰ_後期_商業建築の問題+解答.pdf',
    sourceType: 'answer_reference',
    areas: ['店舗計画', '飲食店計画', '動線', '試験概念'],
    notes: 'Concept coverage only. No questions, options, or answer text are retained.',
  }),
  source({
    id: 'rc-worksheet-01',
    fileName: '一般構造Ⅰ_RC_01.pdf',
    sourceType: 'worksheet',
    areas: ['RC構造', '構造形式', '曲げ', 'せん断'],
    notes: 'Worksheet terminology only. Fill-in prompts are not reproduced.',
  }),
  source({
    id: 'rc-worksheet-02',
    fileName: '一般構造Ⅰ_RC_02.pdf',
    sourceType: 'worksheet',
    areas: ['セメント', '水和', '混合セメント', '強度発現'],
    notes: 'Worksheet terminology only. Standards claims remain unverified.',
  }),
  source({
    id: 'rc-worksheet-03',
    fileName: '一般構造Ⅰ_RC_03.pdf',
    sourceType: 'worksheet',
    areas: ['骨材', '細骨材率', '軽量コンクリート', 'アルカリ骨材反応'],
    notes: 'Worksheet terminology only. Questions and inferred answers are excluded.',
  }),
  source({
    id: 'rc-worksheet-04',
    fileName: '一般構造Ⅰ_RC_04.pdf',
    sourceType: 'worksheet',
    areas: ['調合', '養生', '強度', '施工欠陥'],
    notes: 'Worksheet terminology only. Formulas and numerical limits require standards review.',
  }),
  source({
    id: 'rc-worksheet-05',
    fileName: '一般構造Ⅰ_RC_05.pdf',
    sourceType: 'worksheet',
    areas: ['鉄筋', '応力ひずみ', '定着', '配筋'],
    notes: 'Worksheet terminology only. Bar grades and detailing requirements remain draft.',
  }),
  source({
    id: 'rc-exam-answers-2025',
    fileName: '一般構造Ⅰ_RC_後期試験_解答例.pdf',
    sourceType: 'answer_reference',
    areas: ['RC材料', '強度', '調合', '配筋', '構造形式'],
    notes: 'Exam concepts only. No prompts, answer keys, or diagrams are reproduced.',
  }),
  source({
    id: 'lighting-pendants-2025',
    fileName: '名作ペンダント紹介のコピー.pdf',
    sourceType: 'product_reference',
    areas: ['ペンダント照明', '照明デザイナー', '照明メーカー'],
    notes: 'Product and designer names are candidates only and require official manufacturer verification.',
  }),
  source({
    id: 'interior-zoning-workflow',
    fileName: '実務におけるゾーニングの流れのコピー.pdf',
    sourceType: 'workflow_sheet',
    areas: ['ヒアリング', '条件整理', 'ゾーニング', 'インテリア計画'],
    notes: 'Single-page workflow summarized as concepts only; the original sequence is not reproduced.',
  }),
  source({
    id: 'lighting-layout-reference',
    fileName: '照明配置参考資料のコピー.pdf',
    sourceType: 'reference_booklet',
    areas: ['照明配置', 'ダウンライト', '玄関照明', '居室照明'],
    notes: 'Image-based reference scanned for terminology only. Diagrams must be independently recreated.',
  }),
  source({
    id: 'custom-fixtures-reference',
    fileName: '造作について補足のコピー.pdf',
    sourceType: 'reference_booklet',
    areas: ['造作家具', '収納家具', '自立家具', '背板'],
    notes: 'Practical concepts only. Project-specific advice is not treated as a universal rule.',
  }),
]
