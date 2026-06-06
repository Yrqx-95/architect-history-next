import type { TopicReviewCompression } from './types'

export const topicReviewCompressions: TopicReviewCompression[] = [
  {
    topicSlug: 'zoning-districts',
    quickReview: {
      keywords: ['13用途地域', '住居系', '商業系', '工業系', '用途制限', '第48条'],
      mostCommonTrap: '用途の可否を確認せず、先に面積や高さを計算する。',
      examFrequency: 'high',
    },
    conceptReview: {
      concept: '用途地域 is the land-use frame that decides what a site can generally contain before size and form checks begin.',
      logic: 'Read zoning first, then use restrictions, then overlay controls such as BCR, FAR, height, and fire districts.',
      decisionFlow: ['Identify the zoning district.', 'Group it as residential, commercial, or industrial.', 'Check whether the proposed use is allowed.', 'Continue to area, height, and fire controls.'],
    },
    fullLearningReview: {
      source: 'code-topic',
      recommendedMinutes: 10,
      focus: ['13 district groups', 'Article 48 use restrictions', 'Relationship to BCR, FAR, height, and fire controls'],
    },
  },
  {
    topicSlug: 'building-coverage-ratio',
    quickReview: {
      formula: '建蔽率 = 建築面積 ÷ 敷地面積 × 100%',
      keywords: ['建築面積', '敷地面積', '角地緩和', '防火地域内の緩和'],
      mostCommonTrap: '延べ面積を建築面積として使う。',
      examFrequency: 'high',
    },
    conceptReview: {
      concept: 'BCR controls how much of the site is covered on the ground plane.',
      logic: 'Use site area and building area, then check whether any relaxation conditions are explicitly given.',
      decisionFlow: ['Confirm site area.', 'Confirm designated BCR.', 'Check corner-lot relaxation.', 'Check fire district/fire-resistant conditions.', 'Calculate maximum building area.'],
    },
    fullLearningReview: {
      source: 'code-topic',
      recommendedMinutes: 10,
      focus: ['Formula', 'Building area vs total floor area', 'Relaxation conditions', 'BCR vs FAR'],
    },
  },
  {
    topicSlug: 'floor-area-ratio',
    quickReview: {
      formula: '容積率 = 延べ面積 ÷ 敷地面積 × 100%',
      keywords: ['4/10', '6/10', '指定容積率', '前面道路', '小さい方を採用'],
      mostCommonTrap: '指定容積率だけを見て、前面道路幅員による制限を忘れる。',
      examFrequency: 'high',
    },
    conceptReview: {
      concept: 'FAR controls total floor-area intensity, not simply number of stories.',
      logic: 'Compare designated FAR with road-width FAR and use the smaller value in study problems.',
      decisionFlow: ['Confirm site area.', 'Confirm designated FAR.', 'Confirm front road width.', 'Calculate road-width FAR.', 'Use the smaller FAR.', 'Calculate maximum total floor area.'],
    },
    fullLearningReview: {
      source: 'code-topic',
      recommendedMinutes: 10,
      focus: ['Formula', 'Road-width coefficients', 'Smallest value logic', 'FAR vs BCR'],
    },
  },
  {
    topicSlug: 'road-access-obligation',
    quickReview: {
      keywords: ['2m以上接道', '第42条道路', '第43条', '避難', '消防'],
      mostCommonTrap: '敷地面積だけを見て、建築基準法上の道路への接道を確認しない。',
      examFrequency: 'high',
    },
    conceptReview: {
      concept: 'Road access decides whether a site is legally connected to a road for evacuation, firefighting, and circulation.',
      logic: 'Confirm the road is a Building Standards Act road, then confirm the site has sufficient contact with it.',
      decisionFlow: ['Identify the adjoining route.', 'Check whether it is an Article 42 road.', 'Check Article 43 access.', 'Confirm 2m or other stated access condition.', 'Review exceptions only when stated.'],
    },
    fullLearningReview: {
      source: 'code-topic',
      recommendedMinutes: 10,
      focus: ['Article 42 roads', 'Article 43 access', '2m access logic', 'Flag-lot traps'],
    },
  },
  {
    topicSlug: 'road-slant-restriction',
    quickReview: {
      formula: '高さ制限 = 反対側道路境界線からの水平距離 × 勾配',
      keywords: ['1.25', '1.5', '反対側道路境界線', '後退緩和', '天空率'],
      mostCommonTrap: '斜線の起点を道路境界線の手前側だと誤解する。',
      examFrequency: 'high',
    },
    conceptReview: {
      concept: 'Road slant controls height and street openness from the road side.',
      logic: 'Start from the opposite road boundary, measure horizontal distance, apply the relevant slope, and check setback or sky-factor conditions only when given.',
      decisionFlow: ['Identify the front road.', 'Locate the opposite road boundary.', 'Measure horizontal distance D.', 'Select study slope 1.25 or 1.5.', 'Calculate height limit.', 'Check setback/sky-factor notes.'],
    },
    fullLearningReview: {
      source: 'code-topic',
      recommendedMinutes: 10,
      focus: ['Diagram', 'Formula', 'Setback relaxation', 'Road slant vs FAR', 'Road slant vs north-side slant'],
    },
  },
  {
    topicSlug: 'north-side-slant-restriction',
    quickReview: {
      formula: '高さ制限 = 起算高さ + 北側境界線からの水平距離 × 1.25',
      keywords: ['5m', '10m', '1.25', '真北', '起算高さ', '日影規制'],
      mostCommonTrap: '北側斜線と日影規制を同じ制限として扱う。',
      examFrequency: 'high',
    },
    conceptReview: {
      concept: 'North-side slant protects daylight and residential conditions on the north side of a site.',
      logic: 'Check applicable residential district, identify the north-side boundary, select starting height, then apply horizontal distance and slope.',
      decisionFlow: ['Confirm applicable zoning district.', 'Locate true north and north-side boundary.', 'Select 5m or 10m starting height for study.', 'Measure horizontal distance.', 'Apply 1.25 slope.', 'Compare with road slant and shadow regulation.'],
    },
    fullLearningReview: {
      source: 'code-topic',
      recommendedMinutes: 10,
      focus: ['Starting height', 'Applicable residential districts', 'North-side slant vs road slant', 'North-side slant vs shadow regulation'],
    },
  },
  {
    topicSlug: 'fire-prevention-district',
    quickReview: {
      keywords: ['防火地域', '耐火建築物', '主要構造部', '延焼防止', '開口部'],
      mostCommonTrap: '防火地域を「建てられない区域」と誤解する。',
      examFrequency: 'medium',
    },
    conceptReview: {
      concept: 'Fire prevention districts require stronger fire performance in dense or high-risk urban areas.',
      logic: 'Read the district designation, then connect building scale and parts to required fire performance.',
      decisionFlow: ['Confirm district designation.', 'Check building scale and use.', 'Identify required fire performance.', 'Check structural parts and openings.', 'Compare with quasi-fire district.'],
    },
    fullLearningReview: {
      source: 'code-topic',
      recommendedMinutes: 10,
      focus: ['Fire district vs quasi-fire district', 'Fire-resistant building', 'Building scale and part requirements'],
    },
  },
  {
    topicSlug: 'quasi-fire-prevention-district',
    quickReview: {
      keywords: ['準防火地域', '準耐火建築物', '防火構造', '外壁', '開口部'],
      mostCommonTrap: '防火地域と同じ強さの制限だと考える。',
      examFrequency: 'medium',
    },
    conceptReview: {
      concept: 'Quasi-fire prevention districts apply intermediate fire-safety controls around or outside stronger fire districts.',
      logic: 'Compare it with fire prevention district, then read building scale, exterior walls, openings, and structural requirements.',
      decisionFlow: ['Confirm quasi-fire district designation.', 'Check building scale.', 'Check structure category.', 'Review exterior walls and openings.', 'Compare with full fire prevention district.'],
    },
    fullLearningReview: {
      source: 'code-topic',
      recommendedMinutes: 10,
      focus: ['Quasi-fire vs fire prevention district', 'Quasi-fire-resistant building', 'Exterior walls and openings'],
    },
  },
]

export const topicReviewCompressionBySlug = Object.fromEntries(
  topicReviewCompressions.map(review => [review.topicSlug, review])
) as Record<string, TopicReviewCompression>
