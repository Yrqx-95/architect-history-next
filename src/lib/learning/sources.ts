import type { LegalReference } from './types'
import { learningTopics } from './topics'

export const legalReferences: LegalReference[] = learningTopics.flatMap(topic => {
  const isZoningDistricts = topic.id === 'zoning-districts'
  const isBuildingCoverageRatio = topic.id === 'building-coverage-ratio'
  const isFloorAreaRatio = topic.id === 'floor-area-ratio'
  const isRoadAccessObligation = topic.id === 'road-access-obligation'
  const isRoadSlantRestriction = topic.id === 'road-slant-restriction'
  const isNorthSideSlantRestriction = topic.id === 'north-side-slant-restriction'
  const isFirePreventionDistrict = topic.id === 'fire-prevention-district'
  const isQuasiFirePreventionDistrict = topic.id === 'quasi-fire-prevention-district'
  const articleNumber = (() => {
    if (isZoningDistricts) return '建築基準法 第48条（要最終確認）'
    if (isBuildingCoverageRatio) return '建築基準法 第53条（要最終確認）'
    if (isFloorAreaRatio) return '建築基準法 第52条（要最終確認）'
    if (isRoadAccessObligation) return '建築基準法 第43条（要最終確認）'
    if (isRoadSlantRestriction) return '建築基準法 第56条第1項第1号（要最終確認）'
    if (isNorthSideSlantRestriction) return '建築基準法 第56条第1項第3号（要最終確認）'
    if (isFirePreventionDistrict || isQuasiFirePreventionDistrict) return '建築基準法 第61条（要最終確認）'
    return 'Article pending verification'
  })()
  const guideSourceUrl = ((): string => {
    if (isZoningDistricts) return 'https://www.mlit.go.jp/common/000234474.pdf'
    if (isBuildingCoverageRatio || isFloorAreaRatio || isRoadSlantRestriction || isNorthSideSlantRestriction || isFirePreventionDistrict || isQuasiFirePreventionDistrict) return 'https://www.mlit.go.jp/jutakukentiku/house/content/001854167.pdf'
    return 'https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk_000083.html'
  })()
  const guideLawName = ((): string => {
    if (isZoningDistricts) return '国土交通省 用途地域資料'
    if (isBuildingCoverageRatio || isFloorAreaRatio || isRoadSlantRestriction || isNorthSideSlantRestriction || isFirePreventionDistrict || isQuasiFirePreventionDistrict) return '国土交通省 建築基準法集団規定資料'
    return '国土交通省 建築基準法制度資料'
  })()
  const officialNote = (() => {
    if (isZoningDistricts) return '用途地域ごとの用途制限を読むための学習用参照。都市計画法上の地域地区指定と合わせた最終確認が必要。'
    if (isBuildingCoverageRatio) return '建蔽率制限の根拠条文として扱う学習用参照。条文番号と適用条件は最終確認が必要。'
    if (isFloorAreaRatio) return '容積率制限の根拠条文として扱う学習用参照。条文番号と適用条件は最終確認が必要。'
    if (isRoadAccessObligation) return '接道義務の根拠条文として扱う学習用参照。第42条の道路定義と合わせた最終確認が必要。'
    if (isRoadSlantRestriction) return '道路斜線制限の根拠条文として扱う学習用参照。別表第3を含めた適用条件は最終確認が必要。'
    if (isNorthSideSlantRestriction) return '北側斜線制限の根拠条文として扱う学習用参照。用途地域、起算高さ、適用条件は最終確認が必要。'
    if (isFirePreventionDistrict) return '防火地域における建築物の防火性能を読むための学習用参照。規模、構造、適用条件は最終確認が必要。'
    if (isQuasiFirePreventionDistrict) return '準防火地域における建築物の防火性能を読むための学習用参照。規模、構造、適用条件は最終確認が必要。'
    return '日本の建築物に関する基準を定める基本法令。'
  })()
  const guideNote = (() => {
    if (isZoningDistricts) return '国土交通省が公開する用途地域の説明資料。13種類の用途地域を理解するための政府ガイドであり、条文そのものではない。'
    if (isBuildingCoverageRatio) return '国土交通省の集団規定に関する説明資料。建蔽率制限を理解するための政府ガイドであり、条文そのものではない。'
    if (isFloorAreaRatio) return '国土交通省の集団規定に関する説明資料。容積率制限を理解するための政府ガイドであり、条文そのものではない。'
    if (isRoadAccessObligation) return '国土交通省が公開する建築基準法関連の制度資料。接道義務と道路の学習補助資料として扱う。'
    if (isRoadSlantRestriction) return '国土交通省の集団規定に関する説明資料。道路斜線制限と天空率検討を理解するための政府ガイドであり、条文そのものではない。'
    if (isNorthSideSlantRestriction) return '国土交通省の集団規定に関する説明資料。北側斜線制限を理解するための政府ガイドであり、条文そのものではない。'
    if (isFirePreventionDistrict) return '国土交通省の集団規定に関する説明資料。防火地域を理解するための政府ガイドであり、条文そのものではない。'
    if (isQuasiFirePreventionDistrict) return '国土交通省の集団規定に関する説明資料。準防火地域を理解するための政府ガイドであり、条文そのものではない。'
    return '国土交通省が公開する建築基準法関連の制度資料。条文そのものではなく学習補助資料として扱う。'
  })()
  const references: LegalReference[] = [
    {
      topicId: topic.id,
      sourceType: 'official_source',
      lawName: '建築基準法',
      articleNumber,
      sourceUrl: 'https://elaws.e-gov.go.jp/document?lawid=325AC0000000201',
      originalJapaneseTitle: topic.japaneseTerm,
      originalLanguage: 'ja',
      verificationStatus: 'draft',
      lastReviewed: undefined,
      reviewer: undefined,
      note: officialNote,
    },
    {
      topicId: topic.id,
      sourceType: 'government_guide',
      lawName: guideLawName,
      articleNumber: 'Guide reference',
      sourceUrl: guideSourceUrl,
      originalJapaneseTitle: topic.japaneseTerm,
      originalLanguage: 'ja',
      verificationStatus: 'draft',
      lastReviewed: undefined,
      reviewer: undefined,
      note: guideNote,
    },
  ]
  if (isRoadAccessObligation) {
    references.push({
      topicId: topic.id,
      sourceType: 'official_source',
      lawName: '建築基準法',
      articleNumber: '建築基準法 第42条（道路定義・要最終確認）',
      sourceUrl: 'https://elaws.e-gov.go.jp/document?lawid=325AC0000000201',
      originalJapaneseTitle: '道路',
      originalLanguage: 'ja',
      verificationStatus: 'draft',
      lastReviewed: undefined,
      reviewer: undefined,
      note: '接道義務を判断する前提となる道路定義の学習用参照。道路種別と自治体の扱いは最終確認が必要。',
    })
  }
  if (isRoadSlantRestriction) {
    references.push({
      topicId: topic.id,
      sourceType: 'official_source',
      lawName: '建築基準法',
      articleNumber: '別表第3（要最終確認）',
      sourceUrl: 'https://elaws.e-gov.go.jp/document?lawid=325AC0000000201',
      originalJapaneseTitle: '別表第3',
      originalLanguage: 'ja',
      verificationStatus: 'draft',
      lastReviewed: undefined,
      reviewer: undefined,
      note: '道路斜線制限の適用距離や勾配を読むための学習用参照。表の読み方と用途地域別条件は最終確認が必要。',
    })
  }
  if (isZoningDistricts) {
    references.push({
      topicId: topic.id,
      sourceType: 'official_source',
      lawName: '都市計画法',
      articleNumber: '都市計画法 第8条・第9条（要最終確認）',
      sourceUrl: 'https://elaws.e-gov.go.jp/document?lawid=343AC0000000100',
      originalJapaneseTitle: '用途地域',
      originalLanguage: 'ja',
      verificationStatus: 'draft',
      lastReviewed: undefined,
      reviewer: undefined,
      note: '用途地域など地域地区の都市計画上の位置づけを読むための学習用参照。条文番号と適用条件は最終確認が必要。',
    })
  }
  return references
})
