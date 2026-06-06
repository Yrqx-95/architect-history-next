import type { LearningGraphNode, LocalizedReason } from './types'

const reason = (en: string, ja: string, zh: string): LocalizedReason => ({ en, ja, zh })

export const learningGraphNodes: LearningGraphNode[] = [
  {
    topicSlug: 'zoning-districts',
    learningStage: 'orientation',
    difficulty: 'beginner',
    estimatedStudyMinutes: 18,
    requiredGlossaryTerms: [
      'zoning-districts',
      'commercial-district',
      'category-one-low-rise-residential-district',
      'apartment-house',
      'site-area',
    ],
    requiredTopics: [],
    nextTopics: [
      { slug: 'building-coverage-ratio', reason: reason('Zoning districts define many baseline area-control limits.', '用途地域は多くの面積制限の前提になります。', '用途地域决定许多面积控制的基础条件。') },
      { slug: 'floor-area-ratio', reason: reason('FAR is usually read together with the district designation.', '容積率は用途地域の指定と一緒に読むことが多いです。', '容积率通常需要和用途地域一起读取。') },
    ],
    relatedTopics: [
      { slug: 'road-access-obligation', reason: reason('Permitted use and buildability both depend on site conditions.', '用途の可否と建築可能性は、どちらも敷地条件と関係します。', '用途是否允许和基地能否建设，都取决于基地条件。') },
      { slug: 'fire-prevention-district', reason: reason('Fire district designations often overlap with urban zoning contexts.', '防火地域の指定は、都市部の用途地域と重なることがあります。', '防火地域常与城市用途地域叠加出现。') },
    ],
    examConcepts: [
      '13用途地域',
      '用途制限',
      '住居系',
      '商業系',
      '工業系',
      '建築基準法第48条',
    ],
    learningObjectives: [
      'Understand zoning districts as the land-use frame for code reading.',
      'Recognize residential, commercial, and industrial district groups.',
      'Connect zoning districts to use restrictions, FAR, BCR, and height controls.',
    ],
    commonConfusions: [
      'Zoning district vs building type',
      'Permitted use vs actual existing use',
      'Land-use zoning vs fire district designation',
    ],
  },
  {
    topicSlug: 'building-coverage-ratio',
    learningStage: 'area-control',
    difficulty: 'beginner',
    estimatedStudyMinutes: 20,
    requiredGlossaryTerms: [
      'building-coverage-ratio',
      'building-area',
      'site-area',
      'corner-lot-relaxation',
      'fire-prevention-district',
      'fire-resistant-building',
    ],
    requiredTopics: [
      { slug: 'zoning-districts', reason: reason('The designated BCR is usually read from the zoning context.', '指定建蔽率は用途地域の文脈から読むことが多いです。', '指定建蔽率通常要从用途地域条件中读取。') },
    ],
    nextTopics: [
      { slug: 'floor-area-ratio', reason: reason('FAR is the paired area-control concept after BCR.', '容積率は建蔽率と対になる面積制限です。', '容积率是与建蔽率成对理解的面积控制。') },
      { slug: 'fire-prevention-district', reason: reason('Fire district conditions can affect coverage relaxations.', '防火地域の条件は建蔽率緩和に関係する場合があります。', '防火地域条件可能影响建蔽率放宽。') },
    ],
    relatedTopics: [
      { slug: 'floor-area-ratio', reason: reason('BCR controls footprint while FAR controls total floor area.', '建蔽率は建築面積、容積率は延べ面積を制御します。', '建蔽率控制占地，容积率控制总楼面面积。') },
      { slug: 'quasi-fire-prevention-district', reason: reason('Fire performance categories can affect code conditions.', '防火性能の区分は法規条件に影響することがあります。', '防火性能分类可能影响法规条件。') },
    ],
    examConcepts: [
      '建蔽率 = 建築面積 ÷ 敷地面積 × 100%',
      '建築面積',
      '敷地面積',
      '角地緩和',
      '防火地域内の緩和',
    ],
    learningObjectives: [
      'Calculate maximum building area from site area and BCR.',
      'Distinguish building area from total floor area.',
      'Identify typical relaxation concepts without treating them as automatic rules.',
    ],
    commonConfusions: [
      'BCR vs FAR',
      'Building area vs total floor area',
      'Corner-lot relaxation as automatic approval',
    ],
  },
  {
    topicSlug: 'floor-area-ratio',
    learningStage: 'area-control',
    difficulty: 'beginner',
    estimatedStudyMinutes: 24,
    requiredGlossaryTerms: [
      'floor-area-ratio',
      'total-floor-area',
      'site-area',
      'front-road',
      'road-width',
      'zoning-districts',
    ],
    requiredTopics: [
      { slug: 'zoning-districts', reason: reason('Designated FAR depends on the district and planning context.', '指定容積率は用途地域と都市計画の文脈に左右されます。', '指定容积率取决于用途地域和都市规划条件。') },
      { slug: 'building-coverage-ratio', reason: reason('BCR is the paired area-control concept students often confuse with FAR.', '建蔽率は容積率と混同しやすい対になる面積制限です。', '建蔽率是常与容积率混淆的配对概念。') },
    ],
    nextTopics: [
      { slug: 'road-slant-restriction', reason: reason('After total floor area, students should learn envelope and height controls.', '延べ面積の次は、建物の外形と高さの制限に進むと自然です。', '学习总楼面面积之后，适合进入建筑形体和高度控制。') },
      { slug: 'road-access-obligation', reason: reason('Road conditions also affect buildability and FAR reading.', '道路条件は建築可能性や容積率の読み方にも影響します。', '道路条件也会影响可建性和容积率读取。') },
    ],
    relatedTopics: [
      { slug: 'building-coverage-ratio', reason: reason('Both use site area but control different design dimensions.', 'どちらも敷地面積を使いますが、制御する設計寸法が違います。', '两者都使用基地面积，但控制的设计维度不同。') },
      { slug: 'zoning-districts', reason: reason('Zoning sets or contextualizes many FAR limits.', '用途地域は多くの容積率制限の前提になります。', '用途地域为许多容积率限制提供前提。') },
    ],
    examConcepts: [
      '4/10',
      '6/10',
      '指定容積率',
      '前面道路',
      '道路幅員による容積率',
      '小さい方を採用',
    ],
    learningObjectives: [
      'Calculate FAR from total floor area and site area.',
      'Apply the smaller value between designated FAR and road-width FAR in study examples.',
      'Distinguish FAR from building height and number of floors.',
    ],
    commonConfusions: [
      'FAR vs BCR',
      'Designated FAR vs road-width FAR',
      'FAR as direct number of stories',
    ],
  },
  {
    topicSlug: 'road-access-obligation',
    learningStage: 'orientation',
    difficulty: 'beginner',
    estimatedStudyMinutes: 18,
    requiredGlossaryTerms: [
      'road-access-obligation',
      'front-road',
      'road-width',
      'evacuation',
      'site-area',
    ],
    requiredTopics: [
      { slug: 'zoning-districts', reason: reason('Students should first know that site buildability is read through multiple planning layers.', '敷地の建築可能性は複数の都市計画条件から読むことを先に理解します。', '应先理解基地能否建设需要通过多层规划条件判断。') },
    ],
    nextTopics: [
      { slug: 'road-slant-restriction', reason: reason('Road-side conditions continue into road slant and envelope controls.', '道路側の条件は道路斜線や建物外形の制限につながります。', '道路侧条件会继续影响道路斜线和建筑形体控制。') },
      { slug: 'floor-area-ratio', reason: reason('Front road width can also affect usable FAR.', '前面道路幅員は使用できる容積率にも関係します。', '前面道路宽度也会影响可使用容积率。') },
    ],
    relatedTopics: [
      { slug: 'floor-area-ratio', reason: reason('Both depend on the front road and road width.', 'どちらも前面道路と道路幅員の読み取りが重要です。', '两者都依赖前面道路和道路宽度的判断。') },
      { slug: 'road-slant-restriction', reason: reason('Both require understanding road-side boundary logic.', 'どちらも道路側の境界の考え方を理解する必要があります。', '两者都需要理解道路侧边界逻辑。') },
    ],
    examConcepts: [
      '2m以上接道',
      '建築基準法第42条',
      '建築基準法第43条',
      '建築基準法上の道路',
      '避難',
      '消防',
    ],
    learningObjectives: [
      'Understand why a site must connect to a legally recognized road.',
      'Recognize the study relationship between Article 42 roads and Article 43 access.',
      'Avoid judging buildability by site area alone.',
    ],
    commonConfusions: [
      'Road access vs road width',
      'Private path vs Building Standards Act road',
      'Large site area as sufficient buildability',
    ],
  },
  {
    topicSlug: 'road-slant-restriction',
    learningStage: 'height-control',
    difficulty: 'intermediate',
    estimatedStudyMinutes: 30,
    requiredGlossaryTerms: [
      'road-slant-restriction',
      'front-road',
      'road-width',
      'zoning-districts',
      'site-area',
      'sky-factor',
    ],
    requiredTopics: [
      { slug: 'zoning-districts', reason: reason('Slope and applicability depend on the zoning and district context.', '勾配や適用条件は用途地域の文脈に左右されます。', '斜率和适用条件会受到用途地域影响。') },
      { slug: 'floor-area-ratio', reason: reason('Students should already distinguish floor-area controls from envelope controls.', '面積制限と建物外形の制限を区別できる状態で読むと理解しやすいです。', '先区分面积控制和形体控制后，会更容易理解道路斜线。') },
    ],
    nextTopics: [
      { slug: 'north-side-slant-restriction', reason: reason('North-side slant is the natural paired height-control topic.', '北側斜線制限は道路斜線と並べて学ぶ高さ制限です。', '北侧斜线限制是与道路斜线成对学习的高度控制。') },
      { slug: 'fire-prevention-district', reason: reason('After height controls, exam learners often move into fire-safety district controls.', '高さ制限の後は、防火地域のような地域指定の規制に進みます。', '高度限制之后，考生通常进入防火地域等地区控制。') },
    ],
    relatedTopics: [
      { slug: 'floor-area-ratio', reason: reason('FAR and road slant are often confused because both use road conditions.', '容積率と道路斜線はどちらも道路条件が出るため混同されやすいです。', '容积率和道路斜线都涉及道路条件，所以容易混淆。') },
      { slug: 'north-side-slant-restriction', reason: reason('Both are slant-plane height controls with different starting logic.', 'どちらも斜線による高さ制限ですが、起算の考え方が違います。', '两者都是斜线高度限制，但起算逻辑不同。') },
      { slug: 'road-access-obligation', reason: reason('Both require reading the front road correctly.', 'どちらも前面道路を正しく読むことが前提です。', '两者都需要正确读取前面道路。') },
    ],
    examConcepts: [
      '1.25',
      '1.5',
      '反対側道路境界線',
      '後退緩和',
      '適用距離',
      '天空率',
    ],
    learningObjectives: [
      'Understand the purpose of road slant restrictions.',
      'Calculate basic study height limits from horizontal distance and slope.',
      'Distinguish road slant from FAR and north-side slant.',
    ],
    commonConfusions: [
      'Road slant vs FAR',
      'Road slant vs north-side slant',
      'Road slant vs sky exposure ratio',
    ],
  },
  {
    topicSlug: 'north-side-slant-restriction',
    learningStage: 'height-control',
    difficulty: 'intermediate',
    estimatedStudyMinutes: 30,
    requiredGlossaryTerms: [
      'north-side-slant-restriction',
      'shadow-regulation',
      'sky-factor',
      'category-one-low-rise-residential-district',
      'site-area',
    ],
    requiredTopics: [
      { slug: 'zoning-districts', reason: reason('North-side slant is strongly tied to residential zoning categories.', '北側斜線は住居系用途地域との関係が強い制限です。', '北侧斜线与住居系用途地域关系很强。') },
      { slug: 'road-slant-restriction', reason: reason('Students should compare it with the road-side slant logic.', '道路側の斜線制限と比較すると違いが整理しやすくなります。', '与道路侧斜线限制比较后，更容易理解差异。') },
    ],
    nextTopics: [
      { slug: 'fire-prevention-district', reason: reason('After height controls, move into fire-safety urban controls.', '高さ制限の次は、防火に関する都市的な規制へ進みます。', '高度限制之后，可以进入城市防火控制。') },
      { slug: 'quasi-fire-prevention-district', reason: reason('Quasi-fire controls complete the first fire-safety district pair.', '準防火地域まで読むと、防火地域との比較が完成します。', '学习准防火地域后，可以完整比较防火地域体系。') },
    ],
    relatedTopics: [
      { slug: 'road-slant-restriction', reason: reason('Both use slope-based height envelopes but protect different urban conditions.', 'どちらも斜線で高さを制限しますが、守る都市環境が違います。', '两者都用斜线限制高度，但保护的城市条件不同。') },
      { slug: 'floor-area-ratio', reason: reason('Both affect building massing but through different mechanisms.', 'どちらも建物ボリュームに影響しますが、仕組みは異なります。', '两者都会影响建筑体量，但机制不同。') },
    ],
    examConcepts: [
      '5m',
      '10m',
      '1.25',
      '真北',
      '起算高さ',
      '日影規制',
    ],
    learningObjectives: [
      'Understand why north-side slant protects neighboring residential conditions.',
      'Read starting height, horizontal distance, and slope as separate exam variables.',
      'Distinguish north-side slant from road slant and shadow regulation.',
    ],
    commonConfusions: [
      'North-side slant vs shadow regulations',
      'North-side slant vs road slant',
      'Starting height vs total height',
    ],
  },
  {
    topicSlug: 'fire-prevention-district',
    learningStage: 'fire-safety',
    difficulty: 'intermediate',
    estimatedStudyMinutes: 20,
    requiredGlossaryTerms: [
      'fire-prevention-district',
      'fire-resistant-building',
      'major-structural-parts',
      'opening',
      'exterior-wall',
    ],
    requiredTopics: [
      { slug: 'zoning-districts', reason: reason('Fire districts are urban designations that can overlap zoning districts.', '防火地域は用途地域と重なる都市的な地域指定です。', '防火地域是可能与用途地域叠加的城市地区指定。') },
      { slug: 'building-coverage-ratio', reason: reason('Fire district conditions can relate to coverage relaxations and building form.', '防火地域の条件は建蔽率緩和や建物形態に関係する場合があります。', '防火地域条件可能关联建蔽率放宽和建筑形态。') },
    ],
    nextTopics: [
      { slug: 'quasi-fire-prevention-district', reason: reason('Quasi-fire district is the paired lower-intensity fire-control topic.', '準防火地域は防火地域と対になる、少し緩やかな防火制限です。', '准防火地域是与防火地域成对理解的较弱防火控制。') },
      { slug: 'building-coverage-ratio', reason: reason('Return to BCR to review fire-related relaxation concepts.', '防火に関係する緩和を復習する場合は建蔽率に戻ります。', '复习与防火相关的放宽时，可以回到建蔽率。') },
    ],
    relatedTopics: [
      { slug: 'quasi-fire-prevention-district', reason: reason('Both regulate fire performance through district designation.', 'どちらも地域指定によって防火性能を求める制限です。', '两者都是通过地区指定要求防火性能的限制。') },
      { slug: 'building-coverage-ratio', reason: reason('Coverage relaxations may involve fire-resistance conditions.', '建蔽率緩和には耐火性能の条件が関わることがあります。', '建蔽率放宽可能涉及耐火性能条件。') },
    ],
    examConcepts: [
      '防火地域',
      '耐火建築物',
      '延焼防止',
      '主要構造部',
      '開口部',
    ],
    learningObjectives: [
      'Understand fire prevention districts as performance requirements rather than no-build zones.',
      'Recognize common structural and scale-related exam keywords.',
      'Distinguish fire district designation from zoning district use control.',
    ],
    commonConfusions: [
      'Fire prevention district vs quasi-fire prevention district',
      'Fire district vs zoning district',
      'Fire-resistant building vs fire-protective construction',
    ],
  },
  {
    topicSlug: 'quasi-fire-prevention-district',
    learningStage: 'fire-safety',
    difficulty: 'intermediate',
    estimatedStudyMinutes: 20,
    requiredGlossaryTerms: [
      'quasi-fire-prevention-district',
      'quasi-fire-resistant-building',
      'fire-protective-construction',
      'opening',
      'exterior-wall',
    ],
    requiredTopics: [
      { slug: 'fire-prevention-district', reason: reason('Students should compare quasi-fire controls with the stronger fire district concept.', '準防火地域は、より強い防火地域と比較して理解します。', '准防火地域应与要求更强的防火地域对比理解。') },
      { slug: 'zoning-districts', reason: reason('District overlays should be understood as part of the planning context.', '地域指定の重なりは都市計画の文脈として理解します。', '地区叠加应作为都市规划条件来理解。') },
    ],
    nextTopics: [
      { slug: 'road-slant-restriction', reason: reason('Use this as a review loop back to height restrictions after fire-safety topics.', '防火系の学習後、高さ制限に戻って総復習します。', '完成防火主题后，可以回到高度限制做总复习。') },
      { slug: 'building-coverage-ratio', reason: reason('Use this as a review loop back to area controls and fire-related relaxations.', '面積制限と防火関連の緩和を復習する入口になります。', '这可以作为复习面积控制和防火相关放宽的入口。') },
    ],
    relatedTopics: [
      { slug: 'fire-prevention-district', reason: reason('The two topics are usually learned as a pair.', '防火地域と準防火地域はセットで学ぶと整理しやすいです。', '防火地域和准防火地域适合成对学习。') },
      { slug: 'building-coverage-ratio', reason: reason('Fire-safety conditions can appear alongside coverage calculations.', '防火条件は建蔽率の計算や緩和と一緒に出ることがあります。', '防火条件可能与建蔽率计算和放宽一起出现。') },
    ],
    examConcepts: [
      '準防火地域',
      '準耐火建築物',
      '防火構造',
      '外壁',
      '開口部',
    ],
    learningObjectives: [
      'Understand quasi-fire prevention districts as intermediate fire-control areas.',
      'Distinguish quasi-fire requirements from full fire prevention district requirements.',
      'Recognize common building-part keywords used in exam questions.',
    ],
    commonConfusions: [
      'Quasi-fire prevention district vs fire prevention district',
      'Quasi-fire-resistant building vs fire-resistant building',
      'Opening protection vs structural fire resistance',
    ],
  },
]

export const learningGraphBySlug = Object.fromEntries(
  learningGraphNodes.map(node => [node.topicSlug, node])
) as Record<string, LearningGraphNode>
