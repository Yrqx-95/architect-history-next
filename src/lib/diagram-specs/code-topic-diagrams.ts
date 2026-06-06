export interface CodeTopicDiagramSpec {
  topicSlug: string
  diagramType: 'plan' | 'section' | 'comparison' | 'table-diagram' | 'flow'
  purpose: string
  mustShow: string[]
  labels: string[]
  commonMisreadings: string[]
  examUsage: string[]
}

export const codeTopicDiagramSpecs: CodeTopicDiagramSpec[] = [
  {
    topicSlug: 'zoning-districts',
    diagramType: 'table-diagram',
    purpose: 'Show the 13 zoning districts as residential, commercial, and industrial groups.',
    mustShow: ['住居系', '商業系', '工業系', '13用途地域', '用途制限 connection'],
    labels: ['用途地域', '住居系8種類', '商業系2種類', '工業系3種類', '第48条'],
    commonMisreadings: ['Treating zoning as a building type', 'Forgetting that zoning is checked before FAR/BCR'],
    examUsage: ['Use as the first decision frame before area, height, and fire controls.'],
  },
  {
    topicSlug: 'building-coverage-ratio',
    diagramType: 'plan',
    purpose: 'Explain that BCR is a footprint ratio on the site plan.',
    mustShow: ['敷地', '建築面積', '空地', '敷地境界線', '角地 condition'],
    labels: ['建築面積', '敷地面積', '建蔽率', '角地緩和', '最大建築面積'],
    commonMisreadings: ['Using total floor area instead of building area', 'Assuming all corner lots get +10%'],
    examUsage: ['Support maximum building-area calculation and BCR vs FAR comparison.'],
  },
  {
    topicSlug: 'floor-area-ratio',
    diagramType: 'section',
    purpose: 'Show FAR as total floor area compared with site area, plus road-width restriction logic.',
    mustShow: ['敷地', '各階床面積', '延べ面積', '敷地面積', '前面道路', '道路幅員'],
    labels: ['延べ面積', '敷地面積', '容積率', '指定容積率', '道路幅員による制限', '小さい方'],
    commonMisreadings: ['Treating FAR as floor count', 'Forgetting road-width FAR', 'Using building area as numerator'],
    examUsage: ['Support FAR formula and min(designated FAR, road-width FAR) examples.'],
  },
  {
    topicSlug: 'road-access-obligation',
    diagramType: 'plan',
    purpose: 'Show how a site connects to a legally recognized road.',
    mustShow: ['敷地', '前面道路', '接道部分', '2m以上', '旗竿地 example'],
    labels: ['接道義務', '第42条道路', '第43条', '2m以上接道', '避難・消防'],
    commonMisreadings: ['Judging by site size only', 'Ignoring whether the route is a Building Standards Act road'],
    examUsage: ['Support Article 42/43 recognition and 2m access traps.'],
  },
  {
    topicSlug: 'road-slant-restriction',
    diagramType: 'section',
    purpose: 'Make clear that road slant starts from the opposite road boundary and applies D × slope.',
    mustShow: ['前面道路', '敷地', '建築物', '反対側道路境界線', '水平距離 D', '道路斜線', '高さ H', '勾配 1.25 / 1.5'],
    labels: ['反対側道路境界線', '水平距離 D', '高さ H', '道路斜線', '勾配', '後退緩和'],
    commonMisreadings: ['Starting from the wrong boundary line', 'Confusing road slant with FAR', 'Treating sky factor as unlimited relaxation'],
    examUsage: ['Support height-limit calculation, setback questions, and road-slant vs north-side-slant comparison.'],
  },
  {
    topicSlug: 'north-side-slant-restriction',
    diagramType: 'section',
    purpose: 'Explain starting height plus horizontal distance from the north-side boundary.',
    mustShow: ['北側隣地境界線', '起算高さ', '水平距離', '斜線', '建築物', '屋根形状', '真北'],
    labels: ['起算高さ 5m/10m', '勾配 1.25', '北側境界線', '水平距離', '日影規制との違い'],
    commonMisreadings: ['Applying it to all zoning districts', 'Forgetting starting height', 'Confusing it with shadow regulation'],
    examUsage: ['Support 5m/10m starting-height examples and comparison with road slant and shadow regulation.'],
  },
  {
    topicSlug: 'fire-prevention-district',
    diagramType: 'comparison',
    purpose: 'Compare fire district requirements with quasi-fire district requirements.',
    mustShow: ['防火地域', '耐火建築物', '主要構造部', '開口部', '延焼リスク'],
    labels: ['防火地域', '耐火建築物', '主要構造部', '開口部', '防火性能'],
    commonMisreadings: ['Thinking fire district means no building is possible', 'Confusing district designation with zoning use control'],
    examUsage: ['Support structural keyword recognition and fire vs quasi-fire comparison.'],
  },
  {
    topicSlug: 'quasi-fire-prevention-district',
    diagramType: 'comparison',
    purpose: 'Show quasi-fire district as an intermediate fire-control layer.',
    mustShow: ['準防火地域', '準耐火建築物', '防火構造', '外壁', '開口部'],
    labels: ['準防火地域', '準耐火建築物', '防火構造', '外壁', '開口部'],
    commonMisreadings: ['Treating quasi-fire district as identical to fire prevention district', 'Missing opening and exterior-wall terms'],
    examUsage: ['Support comparison questions and building-part keyword review.'],
  },
]

export const codeTopicDiagramSpecBySlug = Object.fromEntries(
  codeTopicDiagramSpecs.map(spec => [spec.topicSlug, spec])
) as Record<string, CodeTopicDiagramSpec>
