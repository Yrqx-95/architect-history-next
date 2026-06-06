export interface LearningSearchAlias {
  targetType: 'code-topic' | 'glossary-term' | 'exam-concept'
  targetSlug: string
  aliases: string[]
  boostReason: string
}

export const learningSearchAliases: LearningSearchAlias[] = [
  {
    targetType: 'code-topic',
    targetSlug: 'floor-area-ratio',
    aliases: ['FAR', '容積率', '容积率', 'ようせきりつ', 'floor area ratio', '指定容積率', '4/10', '6/10', '小さい方'],
    boostReason: 'FAR is commonly searched by abbreviation, Japanese term, Chinese term, reading, and road-width coefficients.',
  },
  {
    targetType: 'code-topic',
    targetSlug: 'building-coverage-ratio',
    aliases: ['BCR', '建蔽率', '建ぺい率', 'けんぺいりつ', 'building coverage ratio', '建築面積', '角地緩和'],
    boostReason: 'BCR is commonly searched by abbreviation, alternate Japanese spelling, and footprint terms.',
  },
  {
    targetType: 'code-topic',
    targetSlug: 'zoning-districts',
    aliases: ['用途地域', 'ようとちいき', 'zoning', 'zoning districts', 'land use zone', '13用途地域', '用途制限', '第48条'],
    boostReason: 'Zoning is the main prerequisite for most code learning paths.',
  },
  {
    targetType: 'code-topic',
    targetSlug: 'road-access-obligation',
    aliases: ['接道義務', 'せつどうぎむ', 'road access', '2m接道', '2m以上接道', '第42条道路', '第43条', '旗竿地'],
    boostReason: 'Road access questions often appear through 2m access, Article 42 roads, and flag-lot examples.',
  },
  {
    targetType: 'code-topic',
    targetSlug: 'road-slant-restriction',
    aliases: ['道路斜線制限', 'どうろしゃせんせいげん', 'road slant', '高さ制限', '1.25', '1.5', '反対側道路境界線', '後退緩和', '天空率'],
    boostReason: 'Road slant is searched by height-control keywords, slope values, and boundary-line traps.',
  },
  {
    targetType: 'code-topic',
    targetSlug: 'north-side-slant-restriction',
    aliases: ['北側斜線制限', 'きたがわしゃせんせいげん', 'north side slant', '北側斜線', '5m', '10m', '真北', '起算高さ', '日影規制'],
    boostReason: 'North-side slant is searched by starting heights, true north, and shadow-regulation confusion.',
  },
  {
    targetType: 'code-topic',
    targetSlug: 'fire-prevention-district',
    aliases: ['防火地域', 'ぼうかちいき', 'fire prevention district', '耐火建築物', '主要構造部', '延焼防止'],
    boostReason: 'Fire district learning depends on fire-performance terms and structural part keywords.',
  },
  {
    targetType: 'code-topic',
    targetSlug: 'quasi-fire-prevention-district',
    aliases: ['準防火地域', 'じゅんぼうかちいき', 'quasi fire prevention district', '準耐火建築物', '防火構造', '開口部', '外壁'],
    boostReason: 'Quasi-fire district searches often use intermediate fire-performance terms.',
  },
]

export const learningSearchAliasesByTarget = learningSearchAliases.reduce<Record<string, LearningSearchAlias[]>>(
  (acc, alias) => {
    const key = `${alias.targetType}:${alias.targetSlug}`
    acc[key] = [...(acc[key] || []), alias]
    return acc
  },
  {}
)
