import type { LocalizedReason } from './types'

const reason = (en: string, ja: string, zh: string): LocalizedReason => ({ en, ja, zh })

interface TopicNavigationLink {
  slug: string
  reason: LocalizedReason
}

export interface TopicNavigationRecommendation {
  topicSlug: string
  previousTopic?: TopicNavigationLink
  recommendedNextTopic?: TopicNavigationLink
  alternativeNextTopic?: TopicNavigationLink
}

export const topicNavigationRecommendations: TopicNavigationRecommendation[] = [
  {
    topicSlug: 'zoning-districts',
    recommendedNextTopic: {
      slug: 'building-coverage-ratio',
      reason: reason(
        'BCR is the first area-control calculation normally read after zoning.',
        '用途地域を確認した後、最初に読む面積制限の計算テーマです。',
        '确认用途地域后，建蔽率通常是第一个要学习的面积控制计算。'
      ),
    },
    alternativeNextTopic: {
      slug: 'floor-area-ratio',
      reason: reason(
        'FAR also depends on zoning and is often paired with BCR.',
        '容積率も用途地域と関係し、建蔽率とセットで出題されやすいテーマです。',
        '容积率同样依赖用途地域，常与建蔽率一起理解。'
      ),
    },
  },
  {
    topicSlug: 'building-coverage-ratio',
    previousTopic: {
      slug: 'zoning-districts',
      reason: reason(
        'Zoning establishes the baseline planning context.',
        '用途地域は面積制限を読むための前提条件になります。',
        '用途地域是理解面积控制的基础条件。'
      ),
    },
    recommendedNextTopic: {
      slug: 'floor-area-ratio',
      reason: reason(
        'FAR is the paired area-control concept and is commonly compared with BCR.',
        '容積率は建蔽率と対になる面積制限で、比較して覚えると整理しやすいです。',
        '容积率与建蔽率是一组面积控制概念，适合放在一起比较。'
      ),
    },
    alternativeNextTopic: {
      slug: 'fire-prevention-district',
      reason: reason(
        'Fire district conditions can affect BCR relaxation questions.',
        '防火地域の条件は、建蔽率の緩和問題と関係することがあります。',
        '防火地域条件可能与建蔽率放宽题一起出现。'
      ),
    },
  },
  {
    topicSlug: 'floor-area-ratio',
    previousTopic: {
      slug: 'building-coverage-ratio',
      reason: reason(
        'BCR clarifies the difference between footprint and total floor area.',
        '建蔽率を先に理解すると、建築面積と延べ面積の違いが整理できます。',
        '先理解建蔽率，有助于区分建筑面积和总楼面面积。'
      ),
    },
    recommendedNextTopic: {
      slug: 'road-access-obligation',
      reason: reason(
        'Road conditions affect buildability and can affect FAR reading.',
        '前面道路の条件は敷地の成立性や容積率の読み方にも関わります。',
        '道路条件会影响基地能否建设，也会影响容积率的读取。'
      ),
    },
    alternativeNextTopic: {
      slug: 'road-slant-restriction',
      reason: reason(
        'Road-side logic continues into height-control questions.',
        '前面道路の考え方は、道路斜線制限の高さ検討にもつながります。',
        '前面道路的逻辑会继续进入道路斜线限制的高度判断。'
      ),
    },
  },
  {
    topicSlug: 'road-access-obligation',
    previousTopic: {
      slug: 'floor-area-ratio',
      reason: reason(
        'Both topics require reading front-road conditions.',
        'どちらも前面道路と道路幅員を読む力が必要です。',
        '这两个主题都需要读懂前面道路和道路宽度。'
      ),
    },
    recommendedNextTopic: {
      slug: 'road-slant-restriction',
      reason: reason(
        'Both require understanding road-side boundary and road-width logic.',
        '道路側の境界線と道路幅員の考え方が、道路斜線制限に直接つながります。',
        '道路侧边界和道路宽度的理解，会直接连接到道路斜线限制。'
      ),
    },
    alternativeNextTopic: {
      slug: 'zoning-districts',
      reason: reason(
        'Use zoning as a review loop when site buildability feels unclear.',
        '敷地が建てられるか迷う場合は、用途地域に戻って前提を確認します。',
        '如果对基地能否建设感到不清楚，可以回到用途地域确认前提。'
      ),
    },
  },
  {
    topicSlug: 'road-slant-restriction',
    previousTopic: {
      slug: 'road-access-obligation',
      reason: reason(
        'Road-side controls are easier after road access and road-width logic.',
        '接道義務と道路幅員を理解していると、道路側の高さ制限を読みやすくなります。',
        '先理解接道义务和道路宽度，能更容易进入道路侧高度限制。'
      ),
    },
    recommendedNextTopic: {
      slug: 'north-side-slant-restriction',
      reason: reason(
        'Both are height controls and are often confused in exams.',
        'どちらも高さ制限で、試験では混同しやすい組み合わせです。',
        '两者都是高度限制，考试中很容易混淆。'
      ),
    },
    alternativeNextTopic: {
      slug: 'floor-area-ratio',
      reason: reason(
        'FAR frequently appears with road-width conditions but controls a different thing.',
        '容積率も道路幅員と関係しますが、道路斜線とは制御する対象が違います。',
        '容积率也常与道路宽度有关，但它控制的是总面积，不是高度形体。'
      ),
    },
  },
  {
    topicSlug: 'north-side-slant-restriction',
    previousTopic: {
      slug: 'road-slant-restriction',
      reason: reason(
        'Road slant gives the comparison frame for slant-plane controls.',
        '道路斜線を先に読むと、斜線制限同士の違いを比較しやすくなります。',
        '先学习道路斜线，能更清楚比较不同斜线限制。'
      ),
    },
    recommendedNextTopic: {
      slug: 'fire-prevention-district',
      reason: reason(
        'After height controls, move into district-based fire-safety controls.',
        '高さ制限の後は、地域指定による防火規制に進むと学習の流れが自然です。',
        '高度限制之后，适合进入按地区指定的防火控制。'
      ),
    },
    alternativeNextTopic: {
      slug: 'zoning-districts',
      reason: reason(
        'Review residential zoning categories if applicability feels unclear.',
        '適用される住居系用途地域が曖昧な場合は、用途地域を復習します。',
        '如果不清楚适用哪些住居系用途地域，可以回到用途地域复习。'
      ),
    },
  },
  {
    topicSlug: 'fire-prevention-district',
    previousTopic: {
      slug: 'north-side-slant-restriction',
      reason: reason(
        'This follows the height-control group in the beginner sequence.',
        '初学者向けの順序では、高さ制限の後に防火地域へ進みます。',
        '在初学路径中，防火地域通常放在高度限制之后学习。'
      ),
    },
    recommendedNextTopic: {
      slug: 'quasi-fire-prevention-district',
      reason: reason(
        'The two fire district topics should be learned as a pair.',
        '防火地域と準防火地域は、強さの違いを比較しながら学ぶと理解しやすいです。',
        '防火地域和准防火地域适合成对比较学习。'
      ),
    },
    alternativeNextTopic: {
      slug: 'building-coverage-ratio',
      reason: reason(
        'Review BCR if fire-related relaxation questions appear.',
        '防火に関係する建蔽率緩和が出てくる場合は、建蔽率を復習します。',
        '遇到与防火相关的建蔽率放宽时，可以回到建蔽率复习。'
      ),
    },
  },
  {
    topicSlug: 'quasi-fire-prevention-district',
    previousTopic: {
      slug: 'fire-prevention-district',
      reason: reason(
        'Quasi-fire district is best understood by comparison with full fire prevention district.',
        '準防火地域は、防火地域との違いを比較すると理解しやすくなります。',
        '准防火地域最好与防火地域对比理解。'
      ),
    },
    recommendedNextTopic: {
      slug: 'road-slant-restriction',
      reason: reason(
        'Loop back to height controls for final exam review.',
        '試験前の総復習として、高さ制限に戻る流れです。',
        '作为考前复习，可以回到高度限制再巩固。'
      ),
    },
    alternativeNextTopic: {
      slug: 'building-coverage-ratio',
      reason: reason(
        'Loop back to area controls and relaxation questions.',
        '面積制限と緩和条件を復習したい場合は、建蔽率に戻ります。',
        '如果想复习面积控制和放宽条件，可以回到建蔽率。'
      ),
    },
  },
]

export const topicNavigationRecommendationBySlug = Object.fromEntries(
  topicNavigationRecommendations.map(recommendation => [recommendation.topicSlug, recommendation])
) as Record<string, TopicNavigationRecommendation>
