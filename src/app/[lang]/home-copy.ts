import type { Lang } from '@/lib/types'

export type HomeCopy = {
  metaDescription: string
  featuredWork: string
  architect: string
  year: string
  location: string
  stats: {
    buildings: string
    architects: string
    styles: string
    countries: string
  }
  featuredDescription: string
  featuredBuilding: string
  architectsDescription: string
  timelineDescription: string
  stylesDescription: string
}

export type HomeLearningCopy = {
  freeTitle: string
  freeBody: string
  freeMeta: string
  latestDescription: string
}

export const HOME_ARCHITECT_SLUGS = [
  'le-corbusier',
  'frank-lloyd-wright',
  'mies-van-der-rohe',
  'kenzo-tange',
  'tadao-ando',
  'zaha-hadid',
]

export const HOME_LEARNING_COPY: Record<Lang, HomeLearningCopy> = {
  zh: {
    freeTitle: '建筑资料馆',
    freeBody: '先看一件建筑，再进入相关人物、时代、术语和法规。没有固定课程，也没有固定顺序。',
    freeMeta: '进入资料馆',
    latestDescription: '继续从建筑师、建筑作品、风格与时代进入 Archistory 的资料馆。',
  },
  en: {
    freeTitle: 'Architecture Archive Room',
    freeBody: 'Start with one building, then open the related people, periods, terms, and code notes. No fixed course order.',
    freeMeta: 'Enter the archive room',
    latestDescription: 'Continue into Archistory through architects, buildings, styles, and periods.',
  },
  ja: {
    freeTitle: '建築資料館',
    freeBody: 'ひとつの建築から入り、関連する人物、時代、用語、法規へ進みます。固定された順序はありません。',
    freeMeta: '資料館へ入る',
    latestDescription: '建築家、作品、様式、時代から Archistory の資料館へ進みます。',
  },
}

export const HOME_COPY: Record<Lang, HomeCopy> = {
  zh: {
    metaDescription: 'Archistory 是建筑、人物与时代的在线档案。',
    featuredWork: '本期作品',
    architect: '建筑师',
    year: '年份',
    location: '地点',
    stats: {
      buildings: '建筑',
      architects: '建筑师',
      styles: '风格',
      countries: '国家 / 地区',
    },
    featuredDescription: '从图像、年代与地点进入建筑档案的编辑精选。',
    featuredBuilding: '精选建筑',
    architectsDescription: '以作者、年代与空间立场组织的建筑师索引。',
    timelineDescription: '以可浏览的年代线索进入建筑史。',
    stylesDescription: '风格、倾向与形式语言。',
  },
  en: {
    metaDescription: 'Archistory is an online archive of architecture, people, and time.',
    featuredWork: 'Featured work',
    architect: 'Architect',
    year: 'Year',
    location: 'Location',
    stats: {
      buildings: 'Buildings',
      architects: 'Architects',
      styles: 'Styles',
      countries: 'Countries',
    },
    featuredDescription: 'A current edit of buildings with distinct visual and historical entry points.',
    featuredBuilding: 'Featured building',
    architectsDescription: 'A compact index of authorship, chronology, and recurring spatial positions.',
    timelineDescription: 'A preview of architectural history as a browsable chronology.',
    stylesDescription: 'Styles, tendencies, and formal languages.',
  },
  ja: {
    metaDescription: 'Archistory は、建築、人物、時代を読むオンライン・アーカイブです。',
    featuredWork: '特集作品',
    architect: '建築家',
    year: '竣工年',
    location: '所在地',
    stats: {
      buildings: '建築',
      architects: '建築家',
      styles: '様式',
      countries: '地域',
    },
    featuredDescription: '視覚的・歴史的な入口をもつ建築の編集セレクション。',
    featuredBuilding: '特集建築',
    architectsDescription: '作者性、年代、空間的立場を横断するコンパクトな索引。',
    timelineDescription: '閲覧できる年代記としての建築史。',
    stylesDescription: '様式、傾向、形式言語。',
  },
}

export function getHomeCopy(lang: string): HomeCopy {
  return HOME_COPY[lang as Lang] || HOME_COPY.zh
}

export function getHomeLearningCopy(lang: string): HomeLearningCopy {
  return HOME_LEARNING_COPY[lang as Lang] || HOME_LEARNING_COPY.zh
}
