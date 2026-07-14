'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Children, createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { graduationIssueGuides, isPublicGraduationCase, type GraduationBrief, type GraduationCandidateLocation, type GraduationCase, type GraduationIssue, type GraduationIssueGuide, type GraduationLocalizedList, type GraduationLocalizedText, type GraduationProgram, type GraduationSiteType } from '@/lib/graduation'
import { proxySrc } from '@/lib/proxy-image'
import ContextualFeedbackLink from '@/components/ContextualFeedbackLink'

type Props = {
  lang: string
  slug: string[]
  issues: GraduationIssue[]
  sites: GraduationSiteType[]
  cases: GraduationCase[]
  programs: GraduationProgram[]
  brief: GraduationBrief
}

type Section = 'home' | 'issues' | 'programs' | 'sites' | 'cases' | 'random' | 'brief' | 'research'

type GraduationResearchState = {
  issueId: string | null
  siteId: string | null
  caseIds: string[]
  nextStep: string
}

type GraduationResearchContextValue = {
  state: GraduationResearchState
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  saveIssue: (id: string) => void
  saveSite: (id: string) => void
  toggleCase: (id: string) => void
  setNextStep: (value: string) => void
  clear: () => void
}

const emptyResearchState: GraduationResearchState = {
  issueId: null,
  siteId: null,
  caseIds: [],
  nextStep: '',
}

const researchStorageKey = 'archistory:graduation-research:v1'
const GraduationResearchContext = createContext<GraduationResearchContextValue | null>(null)

const labels = {
  zh: {
    title: '毕业设计灵感库',
    navIssues: '社会问题',
    navPrograms: '用途索引',
    navSites: '场地库',
    navCases: '案例库',
    navRandom: '随机入口',
    navBrief: '老师资料',
    homeTitle: '从课题、敷地和事例开始考虑毕业设计',
    homeBody: '这是决定方向之前的调查用档案。可以从感兴趣的入口比较资料。',
    goIssues: '看社会问题',
    goSites: '看场地库',
    goCases: '看案例库',
    tryRandom: '随便看看',
    scope: 'V1 范围',
    scopeBody: '不是自动替你生成企划书，而是把社会问题、敷地、用途和案例整理成可继续调查的线索。',
    filters: '筛选',
    keyword: '输入：老龄化、空屋、图书馆、车站前…',
    tag: '标签',
    siteId: '场地ID',
    buildingType: '建筑类型',
    apply: '应用筛选',
    exportJson: '导出 JSON',
    total: '当前',
    recommendedSites: '推荐场地类型',
    recommendedTypes: '推荐建筑类型',
    relatedCases: '关联案例',
    source: '来源',
    back: '返回',
    exportBundle: '导出当前线索 JSON',
    exportBundleCsv: '导出当前线索 CSV',
    again: '再来一次',
    noResult: '没有找到内容',
    publishedOnly: '公开内容',
  },
  en: {
    title: 'Graduation Inspiration',
    navIssues: 'Issues',
    navPrograms: 'Programs',
    navSites: 'Sites',
    navCases: 'Cases',
    navRandom: 'Random Entry',
    navBrief: 'Brief',
    homeTitle: 'Think about a graduation project through issues, sites, and cases',
    homeBody: 'An archive for research before choosing a direction. Compare sources through the entry point that interests you.',
    goIssues: 'Open issues',
    goSites: 'Open sites',
    goCases: 'Open cases',
    tryRandom: 'Browse randomly',
    scope: 'V1 scope',
    scopeBody: 'This does not make the proposal for you. It organizes issues, sites, programs, and cases into research clues.',
    filters: 'Filters',
    keyword: 'Keyword',
    tag: 'Tag',
    siteId: 'Site ID',
    buildingType: 'Building type',
    apply: 'Apply',
    exportJson: 'Export JSON',
    total: 'Showing',
    recommendedSites: 'Recommended site types',
    recommendedTypes: 'Recommended building types',
    relatedCases: 'Related cases',
    source: 'Sources',
    back: 'Back',
    exportBundle: 'Export clues JSON',
    exportBundleCsv: 'Export clues CSV',
    again: 'Again',
    noResult: 'Not found',
    publishedOnly: 'Published content',
  },
  ja: {
    title: '卒業設計インスピレーション',
    navIssues: '課題',
    navPrograms: '用途索引',
    navSites: '敷地',
    navCases: '事例',
    navRandom: 'ランダム入口',
    navBrief: '課題資料',
    homeTitle: '課題、敷地、事例から卒業設計を考える',
    homeBody: '方向を決める前の調査用アーカイブです。気になる入口から資料を比較できます。',
    goIssues: '課題を見る',
    goSites: '敷地を見る',
    goCases: '事例を見る',
    tryRandom: 'まず眺める',
    scope: 'V1 範囲',
    scopeBody: '企画書を自動で作るのではなく、課題、敷地、用途、事例を調査の手がかりとして整理します。',
    filters: '絞り込み',
    keyword: 'キーワード',
    tag: 'タグ',
    siteId: '敷地ID',
    buildingType: '建築用途',
    apply: '適用',
    exportJson: 'JSON 出力',
    total: '表示',
    recommendedSites: '推奨敷地タイプ',
    recommendedTypes: '推奨用途',
    relatedCases: '関連事例',
    source: '出典',
    back: '戻る',
    exportBundle: '現在の手がかりを JSON 出力',
    exportBundleCsv: '現在の手がかりを CSV 出力',
    again: 'もう一度',
    noResult: '見つかりません',
    publishedOnly: '公開済み',
  },
} as const

type Copy = Record<keyof typeof labels.zh, string>

type GraduationLanguage = 'zh' | 'ja' | 'en'
type DetailMeta = { label: string; value: string }
type IssueCategoryId =
  | 'care-aging'
  | 'children-learning'
  | 'housing-life'
  | 'local-regeneration'
  | 'culture-art'
  | 'environment-disaster'
  | 'mobility-urban'
  | 'health-welfare'

const issueCategories: Array<{
  id: IssueCategoryId
  label: Record<GraduationLanguage, string>
  hint: Record<GraduationLanguage, string>
  tokens: string[]
}> = [
  {
    id: 'care-aging',
    label: { zh: '高龄照护', en: 'Aging & Care', ja: '高齢・ケア' },
    hint: { zh: '高龄、独居、照护、见守', en: 'Aging, living alone, care, watching over', ja: '高齢、独居、ケア、見守り' },
    tokens: ['高齢', '高龄', '独居', '見守り', '介護', 'ケア者', '認知症', '日中リビング', 'respite', 'aging', 'caregiver'],
  },
  {
    id: 'children-learning',
    label: { zh: '儿童学习', en: 'Children & Learning', ja: '子ども・学習' },
    hint: { zh: '儿童、学校外学习、图书馆、制作', en: 'Children, learning, libraries, making', ja: '子ども、学習、図書館、制作' },
    tokens: ['子ども', '儿童', '親子', '子育て', '放課後', '不登校', '学習', '図書館', '読書', 'ものづくり', 'キャンパス', 'student', 'learning', 'library'],
  },
  {
    id: 'housing-life',
    label: { zh: '住居生活', en: 'Housing & Daily Life', ja: '住まい・生活' },
    hint: { zh: '住居、商店街、生活服务、共享居住', en: 'Housing, daily services, shared living', ja: '住まい、商店街、生活サービス' },
    tokens: ['住宅', '住まい', '居住', '住民生活', '生活サービス', '商店街', '店舗', 'シェアハウス', '共同居住', '公共トイレ', '公園サービス', 'housing', 'daily life'],
  },
  {
    id: 'local-regeneration',
    label: { zh: '地域再生', en: 'Local Regeneration', ja: '地域再生' },
    hint: { zh: '空屋、旧设施、产业、地方创生', en: 'Vacancy, reuse, local industry, regeneration', ja: '空き家、再利用、産業、地域再生' },
    tokens: ['空き家', '空屋', '廃校', '再利用', '地域再生', '地方创生', '旧工業地', '産業遺産', '市場', '道の駅', '山村', '島', '離島', 'リペア', '循環工房', 'regeneration', 'reuse'],
  },
  {
    id: 'culture-art',
    label: { zh: '文化艺术', en: 'Culture & Art', ja: '文化・アート' },
    hint: { zh: '美术馆、艺术、文化活动、档案', en: 'Museums, art, culture, archives', ja: '美術館、アート、文化、アーカイブ' },
    tokens: ['美術館', '美术馆', 'アート', '艺术', '文化', '祭礼', '公共記憶', '書店', 'コレクション', '展示', '劇場', 'ホール', 'アーカイブ', 'museum', 'art', 'culture'],
  },
  {
    id: 'environment-disaster',
    label: { zh: '防灾环境', en: 'Disaster & Environment', ja: '防災・環境' },
    hint: { zh: '防灾、水边、热环境、生态、循环', en: 'Disaster, water, heat, ecology, circularity', ja: '防災、水辺、暑熱、生態、循環' },
    tokens: ['防災', '防灾', '避難', '災害', '災後', '復興', '水辺', '小河川', '雨水', 'ヒートアイランド', '避暑', '環境', '生態', '食品ロス', 'disaster', 'ecology', 'water'],
  },
  {
    id: 'mobility-urban',
    label: { zh: '交通城市', en: 'Mobility & Urban Space', ja: '交通・都市' },
    hint: { zh: '车站、步行、港、高架、城市入口', en: 'Stations, walking, ports, under viaducts', ja: '駅、歩行、港、高架下、都市入口' },
    tokens: ['駅', '车站', '歩行', '交通', '移動', '港', '高架下', '高架', '線形公園', '旧鉄道', '都市入口', '夜間', '観光', 'tourism', 'mobility'],
  },
  {
    id: 'health-welfare',
    label: { zh: '医疗福祉', en: 'Health & Welfare', ja: '医療・福祉' },
    hint: { zh: '医疗、福祉、女性支援、多文化共生', en: 'Healthcare, welfare, women, multicultural support', ja: '医療、福祉、女性支援、多文化共生' },
    tokens: ['医療', '医疗', '福祉', '障がい', '障碍', '女性', '産後', '療養', '健康相談', '多文化', '外国人', '言語支援', '貧困', '低所得', '就労支援', 'health', 'welfare'],
  },
]

const starterIssueLinks = [
  {
    query: { zh: '老龄化', en: 'aging', ja: '高齢化' },
    label: { zh: '老龄化', en: 'aging', ja: '高齢化' },
  },
  {
    query: { zh: '人员流失', en: 'depopulation', ja: '地域再生' },
    label: { zh: '人员流失', en: 'depopulation', ja: '人口減少' },
  },
  {
    query: { zh: '防灾', en: 'disaster', ja: '防災' },
    label: { zh: '防灾', en: 'disaster', ja: '防災' },
  },
] as const

function getCopy(lang: string): Copy {
  return (labels[lang as keyof typeof labels] || labels.zh) as Copy
}

function langFromPrefix(prefix: string): GraduationLanguage {
  const lang = prefix.split('/')[1]
  return lang === 'ja' || lang === 'en' ? lang : 'zh'
}

function localizedText<T extends Record<string, unknown>>(item: T, key: string, lang: GraduationLanguage) {
  const localized = item[`${key}_${lang}`]
  if (typeof localized === 'string' && localized.trim()) return localized
  const raw = item[key]
  return typeof raw === 'string' ? raw : ''
}

function localizedList<T extends Record<string, unknown>>(item: T, key: string, lang: GraduationLanguage) {
  const localized = item[`${key}_${lang}`]
  if (Array.isArray(localized) && localized.length > 0) return localized.filter((value): value is string => typeof value === 'string' && Boolean(value))
  const raw = item[key]
  return Array.isArray(raw) ? raw.filter((value): value is string => typeof value === 'string' && Boolean(value)) : []
}

function guideText(text: GraduationLocalizedText, lang: GraduationLanguage) {
  return text[lang] || text.zh
}

function guideList(list: GraduationLocalizedList, lang: GraduationLanguage) {
  return list[lang] || list.zh
}

function issueGuide(issueId: string) {
  return graduationIssueGuides.find(guide => guide.issue_id === issueId) || null
}

function issueSearchHref(prefix: string, query: string) {
  return `${prefix}/issues?q=${encodeURIComponent(query)}`
}

function filterList<T extends Record<string, unknown>>(item: T, key: string, lang: GraduationLanguage) {
  return Array.from(new Set([...localizedList(item, key, lang), ...localizedList(item, key, 'zh')]))
}

function relationNotes(issue: GraduationIssue, lang: GraduationLanguage) {
  if (lang === 'ja' && issue.case_relation_notes_ja) return issue.case_relation_notes_ja
  if (lang === 'en' && issue.case_relation_notes_en) return issue.case_relation_notes_en
  return issue.case_relation_notes || {}
}

function issueTitle(issue: GraduationIssue, lang: GraduationLanguage) {
  return localizedText(issue, 'title', lang)
}

function issueSummary(issue: GraduationIssue, lang: GraduationLanguage) {
  return localizedText(issue, 'summary', lang)
}

function issueKeywords(issue: GraduationIssue, lang: GraduationLanguage) {
  return localizedList(issue, 'keywords', lang)
}

function issueBuildingTypes(issue: GraduationIssue, lang: GraduationLanguage) {
  return localizedList(issue, 'recommended_building_types', lang)
}

function programName(program: GraduationProgram, lang: GraduationLanguage) {
  return localizedText(program as unknown as Record<string, unknown>, 'name', lang)
}

function programSummary(program: GraduationProgram, lang: GraduationLanguage) {
  return localizedText(program as unknown as Record<string, unknown>, 'summary', lang)
}

function programKeywords(program: GraduationProgram, lang: GraduationLanguage) {
  return localizedList(program as unknown as Record<string, unknown>, 'keywords', lang)
}

function siteName(site: GraduationSiteType, lang: GraduationLanguage) {
  return localizedText(site, 'name', lang)
}

function siteReason(site: GraduationSiteType, lang: GraduationLanguage) {
  return localizedText(site, 'fit_reason', lang)
}

function siteAddress(site: GraduationSiteType, lang: GraduationLanguage) {
  return localizedText(site, 'address_example', lang)
}

function siteKeywords(site: GraduationSiteType, lang: GraduationLanguage) {
  return localizedList(site, 'keywords', lang)
}

function siteCandidateLocations(site: GraduationSiteType) {
  return site.candidate_locations || []
}

function candidateField(candidate: GraduationCandidateLocation, field: 'area' | 'name' | 'angle', lang: GraduationLanguage) {
  return localizedText(candidate as unknown as Record<string, unknown>, field, lang)
}

function caseName(item: GraduationCase, lang: GraduationLanguage) {
  return localizedText(item, 'name', lang)
}

function caseConcept(item: GraduationCase, lang: GraduationLanguage) {
  return localizedText(item, 'concept', lang)
}

function caseLocation(item: GraduationCase, lang: GraduationLanguage) {
  return localizedText(item, 'location', lang)
}

function caseKeywords(item: GraduationCase, lang: GraduationLanguage) {
  return localizedList(item, 'keywords', lang)
}

function briefMarkdown(brief: GraduationBrief, lang: GraduationLanguage) {
  return localizedText(brief as unknown as Record<string, unknown>, 'markdown', lang)
}

function localizedUiText(lang: GraduationLanguage, zh: string, en: string, ja: string) {
  if (lang === 'en') return en
  if (lang === 'ja') return ja
  return zh
}

function sourceLabel(url: string, lang: GraduationLanguage) {
  let host = url
  try {
    host = new URL(url).hostname.replace(/^www\./, '')
  } catch {
    host = url.replace(/^https?:\/\//, '').split('/')[0]
  }
  if (host.includes('cao.go.jp')) return localizedUiText(lang, '日本内阁府', 'Cabinet Office, Japan', '内閣府')
  if (host.includes('mhlw.go.jp')) return localizedUiText(lang, '日本厚生劳动省', 'Ministry of Health, Labour and Welfare', '厚生労働省')
  if (host.includes('mlit.go.jp')) return localizedUiText(lang, '日本国土交通省', 'Ministry of Land, Infrastructure, Transport and Tourism', '国土交通省')
  if (host.includes('maff.go.jp')) return localizedUiText(lang, '日本农林水产省', 'Ministry of Agriculture, Forestry and Fisheries', '農林水産省')
  if (host.includes('bunka.go.jp')) return localizedUiText(lang, '日本文化厅', 'Agency for Cultural Affairs', '文化庁')
  if (host.includes('cfa.go.jp')) return localizedUiText(lang, '日本儿童家庭厅', 'Children and Families Agency', 'こども家庭庁')
  if (host.includes('stat.go.jp')) return localizedUiText(lang, '日本总务省统计局', 'Statistics Bureau of Japan', '総務省統計局')
  if (host.includes('e-stat.go.jp')) return localizedUiText(lang, '日本政府统计门户 e-Stat', 'e-Stat Government Statistics Portal', '政府統計 e-Stat')
  if (host.includes('chusho.meti.go.jp')) return localizedUiText(lang, '日本中小企业厅', 'Small and Medium Enterprise Agency', '中小企業庁')
  if (host.includes('meti.go.jp')) return localizedUiText(lang, '日本经济产业省', 'Ministry of Economy, Trade and Industry', '経済産業省')
  if (host.includes('mext.go.jp')) return localizedUiText(lang, '日本文部科学省', 'Ministry of Education, Culture, Sports, Science and Technology', '文部科学省')
  if (host.includes('nier.go.jp')) return localizedUiText(lang, '国立教育政策研究所', 'National Institute for Educational Policy Research', '国立教育政策研究所')
  if (host.includes('env.go.jp') || host.includes('wbgt.env.go.jp')) return localizedUiText(lang, '日本环境省', 'Ministry of the Environment', '環境省')
  if (host.includes('moj.go.jp')) return localizedUiText(lang, '日本出入国在留管理厅', 'Immigration Services Agency of Japan', '出入国在留管理庁')
  if (host.includes('bousai.go.jp')) return localizedUiText(lang, '日本内阁府防灾', 'Cabinet Office Disaster Management', '内閣府防災')
  if (host.includes('caa.go.jp')) return localizedUiText(lang, '日本消费者厅', 'Consumer Affairs Agency', '消費者庁')
  if (host.includes('1010.or.jp')) return localizedUiText(lang, '东京都浴场组合', 'Tokyo Sento Association', '東京都浴場組合')
  if (host.includes('scenic.ceri.go.jp')) return localizedUiText(lang, '寒地土木研究所', 'Civil Engineering Research Institute for Cold Region', '寒地土木研究所')
  return host
}

function categoryLabel(categoryId: IssueCategoryId, lang: GraduationLanguage) {
  return issueCategories.find(category => category.id === categoryId)?.label[lang] || categoryId
}

function categoryHint(categoryId: IssueCategoryId, lang: GraduationLanguage) {
  return issueCategories.find(category => category.id === categoryId)?.hint[lang] || ''
}

function issueSearchText(issue: GraduationIssue) {
  return [
    issue.title,
    issue.title_ja,
    issue.title_en,
    issue.summary,
    issue.summary_ja,
    issue.summary_en,
    ...(issue.keywords || []),
    ...(issue.keywords_ja || []),
    ...(issue.keywords_en || []),
    ...(issue.recommended_building_types || []),
    ...(issue.recommended_building_types_ja || []),
    ...(issue.recommended_building_types_en || []),
  ].filter(Boolean).join(' ')
}

function primaryIssueCategory(issue: GraduationIssue): IssueCategoryId {
  const text = issueSearchText(issue).toLowerCase()
  const scored = issueCategories.map(category => ({
    id: category.id,
    score: category.tokens.reduce((count, token) => text.includes(token.toLowerCase()) ? count + 1 : count, 0),
  }))
  scored.sort((a, b) => b.score - a.score || issueCategories.findIndex(category => category.id === a.id) - issueCategories.findIndex(category => category.id === b.id))
  return scored[0]?.score > 0 ? scored[0].id : 'local-regeneration'
}

function sharedCaseKeywords(issue: GraduationIssue, item: GraduationCase, lang: GraduationLanguage) {
  const issueTagSet = new Set(issueKeywords(issue, lang))
  return caseKeywords(item, lang).filter(keyword => issueTagSet.has(keyword))
}

function issueCaseRelationNote(issue: GraduationIssue, item: GraduationCase, lang: GraduationLanguage) {
  const directNote = relationNotes(issue, lang)[item.id]
  if (directNote) return directNote
  const shared = sharedCaseKeywords(issue, item, lang)
  if (shared.length > 0) {
    return localizedUiText(
      lang,
      `同主题参考：与本课题共享「${shared.slice(0, 3).join(' / ')}」等关键词，可用来比较公共性和运营方式。`,
      `Supplementary reference: shares ${shared.slice(0, 3).join(' / ')} with this issue, useful for comparing publicness and operation.`,
      `補助事例：この課題と「${shared.slice(0, 3).join(' / ')}」を共有し、公共性や運営の比較に使える。`
    )
  }
  return localizedUiText(
    lang,
    '补充案例：可作为相邻类型参考，比较用途复合、开放性和运营方式。',
    'Supplementary case for comparing mixed programs, openness, and operation.',
    '補助事例：用途の複合、開放性、運営を比較するための参考。'
  )
}

function issueDisplayCases(issue: GraduationIssue, directCases: GraduationCase[], cases: GraduationCase[], lang: GraduationLanguage) {
  const directIds = new Set(directCases.map(item => item.id))
  const issueTagSet = new Set(filterList(issue as unknown as Record<string, unknown>, 'keywords', lang))
  const supplemental = cases
    .filter(item => isPublicGraduationCase(item) && !directIds.has(item.id))
    .map(item => ({
      item,
      score: filterList(item as unknown as Record<string, unknown>, 'keywords', lang).filter(keyword => issueTagSet.has(keyword)).length,
    }))
    .filter(entry => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.item.id.localeCompare(b.item.id))
    .map(entry => entry.item)
  const usedIds = new Set([...directIds, ...supplemental.map(item => item.id)])
  const fallback = cases
    .filter(item => isPublicGraduationCase(item) && !usedIds.has(item.id))
    .sort((a, b) => a.id.localeCompare(b.id))

  return [...directCases, ...supplemental, ...fallback].slice(0, Math.max(8, directCases.length))
}

function useGraduationResearch() {
  const value = useContext(GraduationResearchContext)
  if (!value) throw new Error('Graduation research controls must be used inside the provider')
  return value
}

function GraduationResearchProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GraduationResearchState>(emptyResearchState)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    let active = true
    queueMicrotask(() => {
      if (!active) return
      try {
        const saved = window.localStorage.getItem(researchStorageKey)
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<GraduationResearchState>
          setState({
            issueId: typeof parsed.issueId === 'string' ? parsed.issueId : null,
            siteId: typeof parsed.siteId === 'string' ? parsed.siteId : null,
            caseIds: Array.isArray(parsed.caseIds) ? parsed.caseIds.filter((id): id is string => typeof id === 'string').slice(0, 6) : [],
            nextStep: typeof parsed.nextStep === 'string' ? parsed.nextStep : '',
          })
        }
      } catch {
        window.localStorage.removeItem(researchStorageKey)
      } finally {
        setHydrated(true)
      }
    })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(researchStorageKey, JSON.stringify(state))
  }, [hydrated, state])

  const value: GraduationResearchContextValue = {
    state,
    drawerOpen,
    setDrawerOpen,
    saveIssue: id => setState(current => ({ ...current, issueId: current.issueId === id ? null : id })),
    saveSite: id => setState(current => ({ ...current, siteId: current.siteId === id ? null : id })),
    toggleCase: id => setState(current => ({
      ...current,
      caseIds: current.caseIds.includes(id)
        ? current.caseIds.filter(caseId => caseId !== id)
        : [...current.caseIds, id].slice(-6),
    })),
    setNextStep: nextStep => setState(current => ({ ...current, nextStep })),
    clear: () => setState(emptyResearchState),
  }

  return <GraduationResearchContext.Provider value={value}>{children}</GraduationResearchContext.Provider>
}

export default function GraduationInspirationApp({ lang, slug, issues, sites, cases, programs, brief }: Props) {
  const copy = getCopy(lang)
  const contentLang = lang === 'ja' || lang === 'en' ? lang : 'zh'
  const section = (slug[0] || 'home') as Section
  const detailId = slug[1]
  const prefix = `/${lang}/graduation`
  const siteMap = useMemo(() => new Map(sites.map(site => [site.id, site])), [sites])
  const caseMap = useMemo(() => new Map(cases.map(item => [item.id, item])), [cases])
  const issueMap = useMemo(() => new Map(issues.map(issue => [issue.id, issue])), [issues])
  const frame = (node: ReactNode) => (
    <GraduationResearchProvider>
      <div className="graduation-system">
        <ResearchBar prefix={prefix} />
        {node}
        <ResearchDrawer prefix={prefix} issues={issues} sites={sites} cases={cases} />
      </div>
    </GraduationResearchProvider>
  )

  if (section === 'issues' && detailId) {
    const issue = issues.find(item => item.id === detailId)
    if (!issue || issue.status !== 'published') return frame(<NotFound copy={copy} prefix={prefix} />)
    return frame(<IssueDetail copy={copy} prefix={prefix} issue={issue} sites={sites} cases={cases} siteMap={siteMap} caseMap={caseMap} />)
  }
  if (section === 'programs' && detailId) {
    const program = programs.find(item => item.id === detailId)
    if (!program) return frame(<NotFound copy={copy} prefix={prefix} />)
    return frame(<ProgramDetail copy={copy} prefix={prefix} program={program} issueMap={issueMap} siteMap={siteMap} caseMap={caseMap} />)
  }
  if (section === 'sites' && detailId) {
    const site = sites.find(item => item.id === detailId)
    if (!site || site.status !== 'published') return frame(<NotFound copy={copy} prefix={prefix} />)
    return frame(<SiteDetail copy={copy} prefix={prefix} site={site} issues={issues} cases={cases} />)
  }
  if (section === 'cases' && detailId) {
    const item = cases.find(entry => entry.id === detailId)
    if (!item || !isPublicGraduationCase(item)) return frame(<NotFound copy={copy} prefix={prefix} />)
    return frame(<CaseDetail copy={copy} prefix={prefix} item={item} issues={issues} />)
  }
  if (section === 'issues') return frame(<ListPage copy={copy} prefix={prefix} type="issues" issues={issues} sites={sites} cases={cases} />)
  if (section === 'programs') return frame(<ProgramListPage copy={copy} prefix={prefix} programs={programs} issues={issues} sites={sites} cases={cases} />)
  if (section === 'sites') return frame(<ListPage copy={copy} prefix={prefix} type="sites" issues={issues} sites={sites} cases={cases} />)
  if (section === 'cases') return frame(<ListPage copy={copy} prefix={prefix} type="cases" issues={issues} sites={sites} cases={cases} />)
  if (section === 'random') return frame(<RandomPage copy={copy} prefix={prefix} issues={issues} sites={sites} cases={cases} siteMap={siteMap} caseMap={caseMap} />)
  if (section === 'brief') return frame(<BriefPage copy={copy} prefix={prefix} markdown={briefMarkdown(brief, contentLang)} />)
  if (section === 'research') return frame(<ResearchPage copy={copy} prefix={prefix} issueMap={issueMap} siteMap={siteMap} caseMap={caseMap} />)
  return frame(<HomePage copy={copy} prefix={prefix} issues={issues} programs={programs} cases={cases} />)
}

function ResearchBar({ prefix }: { prefix: string }) {
  const lang = langFromPrefix(prefix)
  const { state, drawerOpen, setDrawerOpen } = useGraduationResearch()
  const count = Number(Boolean(state.issueId)) + Number(Boolean(state.siteId)) + state.caseIds.length

  return (
    <div className="graduation-research-bar flex min-h-14 items-center justify-between gap-4 border-b border-subtle">
      <div className="flex min-w-0 items-center gap-4">
        <p className="hidden text-xs text-muted sm:block">
          {localizedUiText(lang, '把一个问题、一个场地和少量案例收在一起。', 'Keep one issue, one site, and a few cases together.', '一つの課題、一つの敷地、少数の事例をまとめます。')}
        </p>
        <ContextualFeedbackLink
          lang={lang}
          className="inline-flex min-h-10 shrink-0 items-center border-b border-default text-xs font-semibold text-secondary transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent"
        />
      </div>
      <button
        type="button"
        className="ml-auto inline-flex min-h-10 items-center gap-2 border-b border-default text-sm font-semibold text-primary transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent"
        onClick={() => setDrawerOpen(!drawerOpen)}
        aria-expanded={drawerOpen}
        aria-controls="graduation-research-drawer"
      >
        <span>{localizedUiText(lang, '研究清单', 'Research list', '研究リスト')}</span>
        <span className="font-mono text-xs text-muted">{count}</span>
      </button>
    </div>
  )
}

function ResearchDrawer({ prefix, issues, sites, cases }: {
  prefix: string
  issues: GraduationIssue[]
  sites: GraduationSiteType[]
  cases: GraduationCase[]
}) {
  const lang = langFromPrefix(prefix)
  const { state, drawerOpen, setDrawerOpen } = useGraduationResearch()
  const issue = issues.find(item => item.id === state.issueId)
  const site = sites.find(item => item.id === state.siteId)
  const selectedCases = state.caseIds.map(id => cases.find(item => item.id === id)).filter(Boolean) as GraduationCase[]
  const count = Number(Boolean(issue)) + Number(Boolean(site)) + selectedCases.length
  const nextStep = state.nextStep.trim() || localizedUiText(
    lang,
    issue && !site ? '下一步：从推荐场地里选一个具体地点。' : site && selectedCases.length === 0 ? '下一步：选两个案例比较空间策略。' : '下一步：把问题、场地和案例整理成一页调查笔记。',
    issue && !site ? 'Next: choose one specific location from the suggested sites.' : site && selectedCases.length === 0 ? 'Next: choose two cases and compare their spatial strategies.' : 'Next: turn the issue, site, and cases into a one-page research note.',
    issue && !site ? '次：推奨敷地から具体的な場所を一つ選ぶ。' : site && selectedCases.length === 0 ? '次：二つの事例を選び、空間戦略を比較する。' : '次：課題、敷地、事例を一枚の調査メモにまとめる。'
  )

  useEffect(() => {
    if (!drawerOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.classList.add('graduation-drawer-open')
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('graduation-drawer-open')
    }
  }, [drawerOpen, setDrawerOpen])

  if (!drawerOpen) return null

  return createPortal(
    <>
      <button className="graduation-research-backdrop" type="button" aria-label={localizedUiText(lang, '关闭研究清单', 'Close research list', '研究リストを閉じる')} onClick={() => setDrawerOpen(false)} />
      <aside id="graduation-research-drawer" className="graduation-research-drawer graduation-research-theme" role="dialog" aria-modal="true" aria-labelledby="graduation-research-title">
        <header className="flex items-start justify-between gap-6 border-b border-subtle pb-5">
          <div>
            <p className="eyebrow">{localizedUiText(lang, '当前研究', 'Current research', '現在の研究')}</p>
            <h2 id="graduation-research-title" className="mt-2 text-2xl font-semibold text-primary">
              {localizedUiText(lang, '研究清单', 'Research list', '研究リスト')} · {count}
            </h2>
          </div>
          <button type="button" className="min-h-10 min-w-10 text-xl text-muted hover:text-primary" onClick={() => setDrawerOpen(false)} aria-label={localizedUiText(lang, '关闭', 'Close', '閉じる')}>x</button>
        </header>

        {count === 0 ? (
          <div className="py-8">
            <p className="text-base font-semibold text-primary">{localizedUiText(lang, '清单还是空的', 'Your list is empty', 'リストはまだ空です')}</p>
            <p className="mt-3 text-sm leading-7 text-secondary">{localizedUiText(lang, '打开问题、场地或案例详情，把真正有用的内容加入这里。', 'Open an issue, site, or case and save only what is useful.', '課題、敷地、事例の詳細から、必要なものだけ追加します。')}</p>
          </div>
        ) : (
          <div className="divide-y divide-[color:var(--ui-border-subtle)]">
            <section className="py-6">
              <h3 className="text-xs font-semibold text-muted">{localizedUiText(lang, '当前方向', 'Current direction', '現在の方向')}</h3>
              <div className="mt-4 space-y-4">
                {issue && <ResearchDrawerLink href={`${prefix}/issues/${issue.id}`} label={localizedUiText(lang, '问题', 'Issue', '課題')} value={issueTitle(issue, lang)} onClick={() => setDrawerOpen(false)} />}
                {site && <ResearchDrawerLink href={`${prefix}/sites/${site.id}`} label={localizedUiText(lang, '场地', 'Site', '敷地')} value={siteName(site, lang)} onClick={() => setDrawerOpen(false)} />}
              </div>
            </section>
            {selectedCases.length > 0 && (
              <section className="py-6">
                <h3 className="text-xs font-semibold text-muted">{localizedUiText(lang, '参考案例', 'Reference cases', '参考事例')}</h3>
                <div className="mt-4 divide-y divide-[color:var(--ui-border-subtle)]">
                  {selectedCases.slice(0, 2).map(item => (
                    <Link key={item.id} href={`${prefix}/cases/${item.id}`} className="block py-3 text-sm font-medium text-primary transition-colors hover:text-accent" onClick={() => setDrawerOpen(false)}>{caseName(item, lang)}</Link>
                  ))}
                </div>
                {selectedCases.length > 2 && <p className="mt-2 text-xs text-muted">{localizedUiText(lang, `另 ${selectedCases.length - 2} 个`, `${selectedCases.length - 2} more`, `ほか ${selectedCases.length - 2} 件`)}</p>}
              </section>
            )}
            <section className="py-6">
              <h3 className="text-xs font-semibold text-muted">{localizedUiText(lang, '下一步', 'Next step', '次の一歩')}</h3>
              <p className="mt-3 text-sm leading-7 text-secondary">{nextStep}</p>
            </section>
          </div>
        )}

        <Link href={`${prefix}/research`} className="mt-auto flex min-h-12 items-center justify-between border-t border-default pt-5 text-sm font-semibold text-primary transition-colors hover:text-accent" onClick={() => setDrawerOpen(false)}>
          <span>{localizedUiText(lang, '查看完整研究清单', 'Open full research list', '研究リストを開く')}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </aside>
    </>,
    document.body
  )
}

function ResearchDrawerLink({ href, label, value, onClick }: { href: string; label: string; value: string; onClick: () => void }) {
  return (
    <Link href={href} className="group grid grid-cols-[4rem_minmax(0,1fr)] gap-3" onClick={onClick}>
      <span className="text-xs text-muted">{label}</span>
      <span className="text-sm font-semibold leading-6 text-primary transition-colors group-hover:text-accent">{value}</span>
    </Link>
  )
}

function ResearchSaveButton({ kind, id, prefix }: { kind: 'issue' | 'site' | 'case'; id: string; prefix: string }) {
  const lang = langFromPrefix(prefix)
  const { state, saveIssue, saveSite, toggleCase } = useGraduationResearch()
  const selected = kind === 'issue' ? state.issueId === id : kind === 'site' ? state.siteId === id : state.caseIds.includes(id)
  const onClick = () => {
    if (kind === 'issue') saveIssue(id)
    else if (kind === 'site') saveSite(id)
    else toggleCase(id)
  }

  return (
    <button type="button" className={`inline-flex min-h-11 items-center border px-4 text-sm font-semibold transition-colors ${selected ? 'border-[color:var(--ui-text-primary)] bg-[color:var(--ui-text-primary)] text-[color:var(--ui-surface)]' : 'border-default text-primary hover:border-[color:var(--ui-accent)] hover:text-accent'}`} onClick={onClick} aria-pressed={selected}>
      {selected ? localizedUiText(lang, '已加入研究清单', 'Saved to research list', '研究リストに追加済み') : localizedUiText(lang, '加入研究清单', 'Save to research list', '研究リストに追加')}
    </button>
  )
}

function GraduationHero({ copy, prefix, title, body, actions, aside, media }: {
  copy: Copy
  prefix: string
  title: string
  body: string
  actions?: ReactNode
  aside?: ReactNode
  media?: ReactNode
}) {
  return (
    <section className="graduation-hero grid gap-8 border-b border-subtle pb-10 lg:grid-cols-[minmax(0,1.1fr)_24rem] lg:items-end">
      <div>
        <p className="eyebrow mb-4"><Link className="inline-flex min-h-9 items-center" href={prefix}>{copy.title}</Link></p>
        <h1 className="heading-display max-w-5xl">{title}</h1>
        <p className="body-large mt-5 max-w-3xl">{body}</p>
        {actions && <div className="mt-7 flex flex-wrap gap-3">{actions}</div>}
      </div>
      {aside && (
        <aside className="border-t border-subtle pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          {aside}
        </aside>
      )}
      {media && <div className="lg:col-span-2">{media}</div>}
    </section>
  )
}

function GraduationHeroMedia({ lang }: { lang: GraduationLanguage }) {
  return (
    <figure>
      <div className="relative aspect-[16/7] overflow-hidden bg-surface-muted">
        <Image
          src="/images/graduation/cases/case-002-kamikatsu-zero-waste-center.jpeg"
          alt={localizedUiText(lang, '上胜零废弃中心', 'Kamikatsu Zero Waste Center', '上勝ゼロ・ウェイストセンター')}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-2 text-xs leading-5 text-muted">
        {localizedUiText(lang, '案例图片：上胜零废弃中心', 'Reference image: Kamikatsu Zero Waste Center', '事例画像：上勝ゼロ・ウェイストセンター')} ·{' '}
        <a className="underline decoration-subtle underline-offset-4 hover:text-primary" href="https://commons.wikimedia.org/wiki/File:Kamikatsucho-zero-waste-center.jpeg" target="_blank" rel="noreferrer">Wikimedia Commons · CC0</a>
      </figcaption>
    </figure>
  )
}

function HomePage({ copy, prefix, issues, programs, cases }: {
  copy: Copy
  prefix: string
  issues: GraduationIssue[]
  programs: GraduationProgram[]
  cases: GraduationCase[]
}) {
  const lang = langFromPrefix(prefix)
  const publishedIssues = issues.filter(item => item.status === 'published')
  const publishedCases = cases.filter(isPublicGraduationCase)
  const tags = Array.from(new Set(publishedIssues.flatMap(item => issueKeywords(item, lang)))).slice(0, 12)
  return (
    <div className="space-y-12">
      <GraduationHero
        copy={copy}
        prefix={prefix}
        title={copy.homeTitle}
        body={copy.homeBody}
        media={<GraduationHeroMedia lang={lang} />}
        aside={(
          <>
            <h2 className="text-xl font-semibold text-primary">{copy.scope}</h2>
            <p className="mt-4 text-sm leading-7 text-secondary">{copy.scopeBody}</p>
            <div className="mt-5">
              <NavButton href={`${prefix}/brief`}>{copy.navBrief}</NavButton>
            </div>
          </>
        )}
      />

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow">{langAware(copy, '三种入口', 'Three ways in', '三つの入口')}</p>
            <h2 className="mt-3 heading-section">
              {langAware(copy, '先选一个入口', 'Choose one starting point', '入口を一つ選ぶ')}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-secondary">
            {langAware(
              copy,
              '不用决定题目，只要选最接近你现在状态的一种。',
              'Do not decide the project yet. Pick the state closest to where you are now.',
              '題名を決めなくてよい。今の状態に一番近い入口を選びます。'
            )}
          </p>
        </div>
        <div className="grid border-y border-subtle lg:grid-cols-3">
          <StarterPath
            index={1}
            title={langAware(copy, '我还没想法', 'I just want to browse', 'まだ何も決まっていない')}
            body={langAware(copy, '先看日本有哪些社会、城市和生活问题，找到自己有反应的方向。', 'Browse social, urban, and daily-life issues first, then notice what attracts you.', '日本の社会、都市、生活課題を眺め、気になる方向を探す。')}
            primaryHref={`${prefix}/issues`}
            primaryLabel={langAware(copy, '进入社会问题页', 'Open social issues page', '社会課題ページへ')}
            links={[]}
          />
          <StarterPath
            index={2}
            title={langAware(copy, '我已有想解决的问题', 'I have an issue in mind', '扱いたい課題がある')}
            body={langAware(copy, '例如老龄化、人员流失、防灾。先找相近课题，再比较场地和案例。', 'For aging, depopulation, disaster, and similar themes, start with matching issues, then compare sites and cases.', '高齢化、人口減少、防災などから入り、敷地と事例を比較します。')}
            primaryHref={`${prefix}/issues#graduation-filters`}
            primaryLabel={langAware(copy, '打开筛选区', 'Open filtered search', '絞り込みへ')}
            links={starterIssueLinks.map(item => ({ label: item.label[lang], href: issueSearchHref(prefix, item.query[lang]) }))}
          />
          <StarterPath
            index={3}
            title={langAware(copy, '我已有想做的用途', 'I have a program in mind', 'やりたい用途がある')}
            body={langAware(copy, '例如图书馆、社区中心、公共浴场。反过来看它能回应哪些社会问题。', 'For a library, community center, or public bath, look backward to the issues it could address and what evidence is still needed.', '図書館、コミュニティセンター、公衆浴場から、それが応答できる課題を逆引きします。')}
            primaryHref={`${prefix}/programs`}
            primaryLabel={langAware(copy, '进入用途索引', 'Open program index', '用途索引へ')}
            links={programs.slice(0, 3).map(item => ({ label: programName(item, lang), href: `${prefix}/programs/${item.id}` }))}
          />
        </div>
      </section>

      <section className="space-y-5 border-b border-subtle pb-10">
        <h2 className="heading-section">{langAware(copy, '热门课题标签', 'Popular Tags', '主要タグ')}</h2>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {tags.map(tag => (
            <Link
              key={tag}
              className="inline-flex min-h-8 items-center border-b border-subtle text-xs font-medium text-muted transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent"
              href={`${prefix}/issues?tag=${encodeURIComponent(tag)}`}
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="heading-section">{langAware(copy, '今日推荐课题', 'Recommended Issues', 'おすすめ課題')}</h2>
          <NavButton href={`${prefix}/issues`}>{langAware(copy, '查看全部课题', 'View all issues', 'すべての課題')}</NavButton>
        </div>
        <div className="grid gap-x-6 gap-y-0 md:grid-cols-3">
          {publishedIssues.slice(0, 3).map(issue => <IssueCard key={issue.id} prefix={prefix} issue={issue} compact />)}
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="heading-section">{langAware(copy, '最近案例', 'Reference Cases', '参考事例')}</h2>
          <NavButton href={`${prefix}/cases`}>{langAware(copy, '查看全部案例', 'View all cases', 'すべての事例')}</NavButton>
        </div>
        <div className="grid gap-x-6 gap-y-0 md:grid-cols-3">
          {publishedCases.slice(0, 3).map((item, index) => <CaseCard key={item.id} prefix={prefix} item={item} eager={index === 0} />)}
        </div>
      </section>
    </div>
  )
}

function ListPage({ copy, prefix, type, issues, sites, cases }: {
  copy: Copy
  prefix: string
  type: 'issues' | 'sites' | 'cases'
  issues: GraduationIssue[]
  sites: GraduationSiteType[]
  cases: GraduationCase[]
}) {
  const lang = langFromPrefix(prefix)
  const title = type === 'issues' ? copy.navIssues : type === 'sites' ? copy.navSites : copy.navCases
  const publicIssues = useMemo(() => issues.filter(item => item.status === 'published'), [issues])
  const publicSites = useMemo(() => sites.filter(item => item.status === 'published'), [sites])
  const publicCases = useMemo(() => cases.filter(isPublicGraduationCase), [cases])
  const urlSearch = useSyncExternalStore(subscribeToUrlSearch, getUrlSearchSnapshot, getServerUrlSearchSnapshot)
  const urlParams = useMemo(() => new URLSearchParams(urlSearch), [urlSearch])
  const query = urlParams.get('q') || ''
  const category = type === 'issues' ? (urlParams.get('category') as IssueCategoryId | null) || '' : ''
  const tag = urlParams.get('tag') || ''
  const siteType = type === 'issues' ? urlParams.get('siteType') || '' : ''
  const buildingType = type === 'issues' ? urlParams.get('buildingType') || '' : ''
  const categoryOptions = useMemo(() => {
    if (type !== 'issues') return []
    return issueCategories.map(item => ({
      ...item,
      count: publicIssues.filter(issue => primaryIssueCategory(issue) === item.id).length,
    })).filter(item => item.count > 0)
  }, [publicIssues, type])
  const baseIssueItems = useMemo(() => {
    const q = query.toLowerCase().trim()
    const includes = (value: unknown) => JSON.stringify(value).toLowerCase().includes(q)
    return publicIssues.filter(item =>
      (!q || includes(item)) &&
      (!category || primaryIssueCategory(item) === category)
    )
  }, [category, publicIssues, query])
  const tagOptionSource = useMemo(() => {
    if (type !== 'issues') return type === 'sites' ? publicSites : publicCases
    return baseIssueItems.filter(item => issueMatchesDetailFilters(item, lang, { siteType, buildingType }))
  }, [baseIssueItems, buildingType, lang, publicCases, publicSites, siteType, type])
  const tagOptionCounts = useMemo(() => {
    return countOptions(tagOptionSource as Array<Record<string, unknown>>, item => filterList(item, 'keywords', lang))
  }, [lang, tagOptionSource])
  const tagOptions = useMemo(() => {
    const rawOptions = uniqueSorted(tagOptionSource.flatMap(item => localizedList(item as unknown as Record<string, unknown>, 'keywords', lang)))
    if (type !== 'issues') return rawOptions
    return compactRankedOptions(rawOptions, tagOptionCounts, tag, 2, 10)
  }, [lang, tag, tagOptionCounts, tagOptionSource, type])
  const quickTags = useMemo(() => tagOptions.slice(0, 8), [tagOptions])
  const siteTypeOptionSource = useMemo(() => {
    return baseIssueItems.filter(item => issueMatchesDetailFilters(item, lang, { tag, buildingType }))
  }, [baseIssueItems, buildingType, lang, tag])
  const buildingTypeOptionSource = useMemo(() => {
    return baseIssueItems.filter(item => issueMatchesDetailFilters(item, lang, { tag, siteType }))
  }, [baseIssueItems, lang, siteType, tag])
  const siteTypeOptionCounts = useMemo(() => countOptions(siteTypeOptionSource, item => item.recommended_site_types), [siteTypeOptionSource])
  const buildingTypeOptionCounts = useMemo(() => countOptions(buildingTypeOptionSource, item => issueBuildingTypes(item, lang)), [buildingTypeOptionSource, lang])
  const siteTypeOptions = useMemo(() => publicSites
    .filter(site => siteTypeOptionCounts.has(site.id) || site.id === siteType)
    .sort((a, b) => stableStringCompare(siteName(a, lang), siteName(b, lang)))
  , [lang, publicSites, siteType, siteTypeOptionCounts])
  const buildingTypeOptions = useMemo(() => compactRankedOptions(
    Array.from(buildingTypeOptionCounts.keys()),
    buildingTypeOptionCounts,
    buildingType,
    2,
    36
  ), [buildingType, buildingTypeOptionCounts])
  const isAdvancedFilterActive = Boolean(siteType || buildingType || tag)
  const items = useMemo(() => {
    const q = query.toLowerCase().trim()
    const includes = (value: unknown) => JSON.stringify(value).toLowerCase().includes(q)
    if (type === 'issues') {
      return publicIssues.filter(item =>
        (!q || includes(item)) &&
        (!category || primaryIssueCategory(item) === category) &&
        issueMatchesDetailFilters(item, lang, { tag, siteType, buildingType })
      )
    }
    if (type === 'sites') return publicSites.filter(item => (!q || includes(item)) && (!tag || filterList(item as unknown as Record<string, unknown>, 'keywords', lang).includes(tag)))
    return publicCases.filter(item => (!q || includes(item)) && (!tag || filterList(item as unknown as Record<string, unknown>, 'keywords', lang).includes(tag)))
  }, [buildingType, category, lang, publicCases, publicIssues, publicSites, query, siteType, tag, type])
  const exportName = type === 'issues' ? 'issues.json' : type === 'sites' ? 'site-types.json' : 'cases.json'
  const setFilterParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    const nextSearch = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}`)
    window.dispatchEvent(new Event('graduation-filter-change'))
  }
  const setDetailFilterParam = (key: 'tag' | 'siteType' | 'buildingType', value: string) => {
    const params = new URLSearchParams(window.location.search)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    if (key === 'tag') {
      params.delete('siteType')
      params.delete('buildingType')
    }
    if (key === 'siteType') {
      params.delete('buildingType')
    }
    const nextSearch = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}`)
    window.dispatchEvent(new Event('graduation-filter-change'))
  }
  const clearDetailFilters = () => {
    const params = new URLSearchParams(window.location.search)
    params.delete('tag')
    params.delete('siteType')
    params.delete('buildingType')
    const nextSearch = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}`)
    window.dispatchEvent(new Event('graduation-filter-change'))
  }
  const setIssueCategory = (value: IssueCategoryId | '') => {
    const params = new URLSearchParams(window.location.search)
    if (value) {
      params.set('category', value)
    } else {
      params.delete('category')
    }
    params.delete('tag')
    params.delete('siteType')
    params.delete('buildingType')
    const nextSearch = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}`)
    window.dispatchEvent(new Event('graduation-filter-change'))
  }
  const clearAllFilters = () => {
    const params = new URLSearchParams(window.location.search)
    params.delete('q')
    params.delete('category')
    params.delete('tag')
    params.delete('siteType')
    params.delete('buildingType')
    const nextSearch = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}`)
    window.dispatchEvent(new Event('graduation-filter-change'))
  }
  const activeFilterItems = [
    query ? { key: 'q', label: `${copy.keyword}: ${query}`, onRemove: () => setFilterParam('q', '') } : null,
    category ? { key: 'category', label: categoryLabel(category, lang), onRemove: () => setIssueCategory('') } : null,
    tag ? { key: 'tag', label: tag, onRemove: () => type === 'issues' ? setDetailFilterParam('tag', '') : setFilterParam('tag', '') } : null,
    siteType ? {
      key: 'siteType',
      label: siteName(publicSites.find(site => site.id === siteType) || ({ id: siteType, name: siteType } as GraduationSiteType), lang),
      onRemove: () => setDetailFilterParam('siteType', ''),
    } : null,
    buildingType ? { key: 'buildingType', label: buildingType, onRemove: () => setDetailFilterParam('buildingType', '') } : null,
  ].filter((item): item is { key: string; label: string; onRemove: () => void } => Boolean(item))
  const listBody = type === 'issues'
    ? langAware(copy, '先选分类或搜索关键词，找到你有反应的社会问题。', 'Choose a category or search a keyword, then find the social issues that resonate.', '分類を選ぶかキーワードで検索し、反応できる社会課題を見つけます。')
    : langAware(copy, '搜索、筛选、点开详情，再回到列表继续比较。', 'Search, filter, open detail pages, then compare.', '検索、絞り込み、詳細確認、比較。')
  const filterPlaceholder = type === 'issues'
    ? copy.keyword
    : langAware(copy, '输入关键词', 'Keyword', 'キーワード')

  return (
    <div className="space-y-8">
      <GraduationHero
        copy={copy}
        prefix={prefix}
        title={title}
        body={listBody}
        aside={(
          <>
            <h2 className="text-xl font-semibold text-primary">
              {type === 'issues'
                ? langAware(copy, '先做一件事', 'Do one thing first', 'まず一つだけ')
                : langAware(copy, '从哪里开始', 'Start Here', 'まず何を見る？')}
            </h2>
            <p className="mt-4 text-sm leading-7 text-secondary">
              {type === 'issues'
                ? langAware(copy, '从搜索框或主分类开始。点开任一问题后，再看适合的场地和案例。', 'Start with the search box or a main category. Open any issue, then compare suitable sites and cases.', '検索欄か主分類から始めます。課題を開いて、敷地と事例を比較します。')
                : langAware(copy, '先用关键词缩小列表，再打开条目比较适不适合你的课题。', 'Narrow the list with keywords, then open items to compare fit.', 'キーワードで絞り、詳細で自分の課題に合うか比較します。')}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a className="inline-flex min-h-10 items-center border-b border-[color:var(--ui-accent)] px-0 text-xs font-semibold text-primary transition-colors hover:text-accent" href="#graduation-filters">
                {langAware(copy, '去筛选', 'Use filters', '絞り込む')}
              </a>
            </div>
          </>
        )}
      />

      <SubNav copy={copy} prefix={prefix} active={type} />

      <section id="graduation-filters" className="scroll-mt-28 space-y-5 border-y border-subtle py-5">
        <div className="flex flex-col gap-3 border-b border-subtle pb-4 sm:flex-row sm:items-end">
          <div className="min-w-0 flex-1">
            <label className="mb-2 block text-xs font-semibold text-primary" htmlFor="graduation-filter-query">{copy.filters}</label>
            <input id="graduation-filter-query" className="min-h-10 w-full border-0 border-b border-default bg-transparent px-0 text-base font-medium text-primary outline-none transition-colors placeholder:text-soft focus:border-[color:var(--ui-accent)]" value={query} onChange={event => {
              setFilterParam('q', event.target.value)
            }} placeholder={filterPlaceholder} />
          </div>
          <button className="min-h-10 shrink-0 border-b border-default px-0 text-sm font-semibold text-primary transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent" onClick={() => downloadJson(exportName, items)}>{copy.exportJson}</button>
        </div>

        {type === 'issues' ? (
          <div className="grid gap-x-4 gap-y-1 border-b border-subtle pb-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6" aria-label={copy.filters}>
              <button
                className={`flex min-h-9 items-center justify-between gap-3 border-b px-0 text-left text-sm font-medium transition-colors ${category ? 'border-transparent text-secondary hover:border-default hover:text-primary' : 'border-[color:var(--ui-accent)] text-primary'}`}
                onClick={() => setIssueCategory('')}
              >
                <span>{langAware(copy, '全部', 'All', 'すべて')}</span> <span className="text-xs text-muted">{publicIssues.length}</span>
              </button>
              {categoryOptions.map(item => (
                <button
                  key={item.id}
                  className={`flex min-h-9 items-center justify-between gap-3 border-b px-0 text-left text-sm font-medium transition-colors ${category === item.id ? 'border-[color:var(--ui-accent)] text-primary' : 'border-transparent text-secondary hover:border-default hover:text-primary'}`}
                  onClick={() => setIssueCategory(category === item.id ? '' : item.id)}
                  title={categoryHint(item.id, lang)}
                >
                  <span>{categoryLabel(item.id, lang)}</span> <span className="text-xs text-muted">{item.count}</span>
                </button>
              ))}
          </div>
        ) : (
          <div className="grid gap-x-5 gap-y-2 border-b border-subtle pb-5 sm:grid-cols-2 lg:grid-cols-4" aria-label={copy.filters}>
            <button
              className={`min-h-10 border-b px-0 text-left text-sm font-medium transition-colors ${tag ? 'border-transparent text-secondary hover:border-default hover:text-primary' : 'border-[color:var(--ui-accent)] text-primary'}`}
              onClick={() => setFilterParam('tag', '')}
            >
              {langAware(copy, '全部', 'All', 'すべて')}
            </button>
            {quickTags.map(item => (
              <button
                key={item}
                className={`min-h-10 border-b px-0 text-left text-sm font-medium transition-colors ${tag === item ? 'border-[color:var(--ui-accent)] text-primary' : 'border-transparent text-secondary hover:border-default hover:text-primary'}`}
                onClick={() => setFilterParam('tag', tag === item ? '' : item)}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        <details className="group border-b border-subtle pb-5" open={isAdvancedFilterActive}>
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-primary transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
            <span className="flex min-w-0 flex-col gap-0.5">
              <span>{langAware(copy, '详细筛选', 'Detailed filters', '詳細フィルター')}</span>
              <span className="text-xs font-normal leading-5 text-muted">
                {langAware(copy, '只显示当前还能命中的标签、场地和用途', 'Only shows tags, sites, and programs that still have matches', '現在の条件で一致するタグ、敷地、用途だけを表示')}
              </span>
            </span>
            <span className="text-lg leading-none text-primary group-open:hidden" aria-hidden="true">+</span>
            <span className="hidden text-lg leading-none text-primary group-open:block" aria-hidden="true">-</span>
          </summary>
          {type === 'issues' && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs leading-5 text-muted">
                {category
                  ? langAware(
                    copy,
                    `当前先在「${categoryLabel(category, lang)}」的 ${baseIssueItems.length} 个课题里继续筛选。`,
                    `Narrowing within ${baseIssueItems.length} issues in ${categoryLabel(category, lang)}.`,
                    `現在は「${categoryLabel(category, lang)}」の ${baseIssueItems.length} 件からさらに絞り込みます。`
                  )
                  : langAware(copy, '未选择主分类时，详细筛选会在全部课题中查找。', 'Without a main category, detailed filters search all issues.', '主分類を選ばない場合、詳細フィルターは全課題から探します。')}
              </p>
              {isAdvancedFilterActive && (
                  <button className="min-h-9 border-b border-default px-0 text-xs font-medium text-primary transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent" onClick={clearDetailFilters}>
                  {langAware(copy, '清除详细筛选', 'Clear details', '詳細条件をクリア')}
                </button>
              )}
            </div>
          )}
          <div className={`mt-3 grid gap-3 ${type === 'issues' ? 'md:grid-cols-3' : 'md:grid-cols-1'}`}>
            <select className="min-h-12 border-0 border-b border-default bg-transparent px-0 text-sm text-primary outline-none transition-colors focus:border-[color:var(--ui-text-primary)]" value={tag} onChange={event => {
              if (type === 'issues') {
                setDetailFilterParam('tag', event.target.value)
              } else {
                setFilterParam('tag', event.target.value)
              }
            }} aria-label={copy.tag}>
              <option value="">{langAware(copy, '全部标签', 'All tags', 'すべてのタグ')}</option>
              {tagOptions.map(item => <option key={item} value={item}>{item} ({tagOptionCounts.get(item) || 0})</option>)}
              {tag && !tagOptions.includes(tag) && <option value={tag}>{tag} (0)</option>}
            </select>
            {type === 'issues' && (
              <>
                <select className="min-h-12 border-0 border-b border-default bg-transparent px-0 text-sm text-primary outline-none transition-colors focus:border-[color:var(--ui-text-primary)]" value={siteType} onChange={event => {
                  setDetailFilterParam('siteType', event.target.value)
                }} aria-label={copy.siteId}>
                  <option value="">{langAware(copy, '全部场地', 'All sites', 'すべての敷地')}</option>
                  {siteTypeOptions.map(site => <option key={site.id} value={site.id}>{siteName(site, lang)} ({siteTypeOptionCounts.get(site.id) || 0})</option>)}
                </select>
                <select className="min-h-12 border-0 border-b border-default bg-transparent px-0 text-sm text-primary outline-none transition-colors focus:border-[color:var(--ui-text-primary)]" value={buildingType} onChange={event => {
                  setDetailFilterParam('buildingType', event.target.value)
                }} aria-label={copy.buildingType}>
                  <option value="">{langAware(copy, '全部类型', 'All types', 'すべての用途')}</option>
                  {buildingTypeOptions.map(item => <option key={item} value={item}>{item} ({buildingTypeOptionCounts.get(item) || 0})</option>)}
                </select>
              </>
            )}
          </div>
        </details>

        <ActiveFilterBar
          copy={copy}
          lang={lang}
          items={activeFilterItems}
          total={items.length}
          onClear={clearAllFilters}
        />
      </section>
      {items.length === 0 ? (
        <div className="border-y border-subtle py-10">
          <p className="text-sm font-medium text-primary">{copy.noResult}</p>
          {type === 'issues' && isAdvancedFilterActive && (
            <button className="mt-4 min-h-9 border-b border-default px-0 text-sm font-medium text-primary" onClick={clearDetailFilters}>
              {langAware(copy, '清除详细筛选', 'Clear details', '詳細条件をクリア')}
            </button>
          )}
        </div>
      ) : (
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-subtle pb-3">
            <div>
              <p className="eyebrow">{langAware(copy, '结果列表', 'Results', '結果一覧')}</p>
              <h2 className="mt-2 text-2xl font-semibold leading-tight text-primary">
                {copy.total} {items.length}
              </h2>
            </div>
            <p className="max-w-xl text-xs leading-5 text-muted">
              {type === 'issues'
                ? langAware(copy, '每一行都是一个可打开的研究线索：问题、分类、关键词和下一步比较入口放在同一层。', 'Each row is a research clue: issue, category, tags, and next comparison step stay at the same level.', '各行は調査の手がかりです。課題、分類、タグ、次の比較入口を同じ階層で見ます。')
                : langAware(copy, '打开条目后再回到列表继续比较。', 'Open an item, then return to compare.', '項目を開き、一覧に戻って比較します。')}
            </p>
          </div>
          <div className={type === 'issues' ? 'graduation-result-list border-y border-subtle' : `grid gap-x-6 ${type === 'cases' ? 'gap-y-0 md:grid-cols-2 xl:grid-cols-3' : 'gap-y-5 md:grid-cols-2'}`}>
            {type === 'issues' && (items as GraduationIssue[]).map(item => <IssueCard key={item.id} prefix={prefix} issue={item} />)}
            {type === 'sites' && (items as GraduationSiteType[]).map(item => <SiteCard key={item.id} prefix={prefix} site={item} />)}
            {type === 'cases' && (items as GraduationCase[]).map((item, index) => <CaseCard key={item.id} prefix={prefix} item={item} eager={index === 0} />)}
          </div>
        </section>
      )}
    </div>
  )
}

function IssueDetail({ copy, prefix, issue, cases, siteMap, caseMap }: {
  copy: Copy
  prefix: string
  issue: GraduationIssue
  sites: GraduationSiteType[]
  cases: GraduationCase[]
  siteMap: Map<string, GraduationSiteType>
  caseMap: Map<string, GraduationCase>
}) {
  const lang = langFromPrefix(prefix)
  const relatedSites = issue.recommended_site_types.map(id => siteMap.get(id)).filter(Boolean) as GraduationSiteType[]
  const relatedCases = issue.reference_case_ids
    .map(id => caseMap.get(id))
    .filter(isPublicGraduationCase)
  const displayCases = issueDisplayCases(issue, relatedCases, cases, lang)
  const guide = issueGuide(issue.id)
  return (
    <DetailShell
      copy={copy}
      prefix={prefix}
      active="issues"
      title={issueTitle(issue, lang)}
      summary={issueSummary(issue, lang)}
      backHref={`${prefix}/issues`}
      actions={<ResearchSaveButton kind="issue" id={issue.id} prefix={prefix} />}
      meta={[
        { label: copy.recommendedSites, value: String(relatedSites.length) },
        { label: copy.relatedCases, value: String(displayCases.length) },
        { label: copy.source, value: String(issue.source_urls.length) },
      ]}
    >
      {guide && <IssueKnowledgeGuide guide={guide} lang={lang} />}
      <section className="grid gap-4 md:grid-cols-2">
        <InfoBlock title={copy.recommendedTypes}><ChipList items={issueBuildingTypes(issue, lang)} /></InfoBlock>
        <InfoBlock title={copy.source}>
          <div className="space-y-2">
            {issue.source_urls.map(url => (
              <a key={url} className="group block border-t border-subtle py-3 first:border-t-0" href={url} target="_blank" rel="noreferrer">
                <span className="block text-sm font-medium text-primary transition-colors group-hover:text-accent">{sourceLabel(url, lang)}</span>
                <span className="mt-1 block break-all text-xs leading-5 text-muted">{url}</span>
              </a>
            ))}
          </div>
        </InfoBlock>
      </section>
      <IssueArchiveNotes issue={issue} sites={relatedSites} cases={displayCases} lang={lang} />
      <SectionGrid title={copy.recommendedSites}>{relatedSites.map(site => <SiteCard key={site.id} prefix={prefix} site={site} />)}</SectionGrid>
      <CaseArchiveList title={copy.relatedCases}>
        {displayCases.map((item, index) => (
          <CaseArchiveRow
            key={item.id}
            prefix={prefix}
            item={item}
            eager={index === 0}
            relationNote={issueCaseRelationNote(issue, item, lang)}
          />
        ))}
      </CaseArchiveList>
      <div className="flex flex-wrap gap-2">
        <ActionButton onClick={() => downloadJson(`${issue.id}-inspiration-bundle.json`, buildInspirationBundle(issue, relatedSites, displayCases, lang))}>{copy.exportBundle}</ActionButton>
        <ActionButton onClick={() => downloadCsv(`${issue.id}-inspiration-bundle.csv`, buildInspirationCsvRows(issue, relatedSites, displayCases, lang))}>{copy.exportBundleCsv}</ActionButton>
      </div>
    </DetailShell>
  )
}

function ProgramListPage({ copy, prefix, programs, issues, sites, cases }: {
  copy: Copy
  prefix: string
  programs: GraduationProgram[]
  issues: GraduationIssue[]
  sites: GraduationSiteType[]
  cases: GraduationCase[]
}) {
  const publicIssues = useMemo(() => issues.filter(item => item.status === 'published'), [issues])
  const publicCases = useMemo(() => cases.filter(isPublicGraduationCase), [cases])
  const urlSearch = useSyncExternalStore(subscribeToUrlSearch, getUrlSearchSnapshot, getServerUrlSearchSnapshot)
  const urlParams = useMemo(() => new URLSearchParams(urlSearch), [urlSearch])
  const query = urlParams.get('q') || ''
  const items = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return programs
    return programs.filter(program => JSON.stringify(program).toLowerCase().includes(q))
  }, [programs, query])
  const setFilterParam = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search)
    if (value) params.set(key, value)
    else params.delete(key)
    const nextSearch = params.toString()
    window.history.replaceState(null, '', `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}`)
    window.dispatchEvent(new Event('graduation-filter-change'))
  }

  return (
    <div className="space-y-8">
      <GraduationHero
        copy={copy}
        prefix={prefix}
        title={copy.navPrograms}
        body={langAware(
          copy,
          '已经有想做的用途时，从这里反查它可能回应的社会问题、适合的敷地、参考案例和还缺的调查。',
          'When you already have a program in mind, search backward to issues, sites, references, and missing research.',
          'やりたい用途がある時、そこから応答できる社会課題、敷地、事例、必要な調査を逆引きします。'
        )}
        aside={(
          <>
            <h2 className="text-xl font-semibold text-primary">
              {langAware(copy, '用途不是答案', 'A program is not the answer', '用途は答えではない')}
            </h2>
            <p className="mt-4 text-sm leading-7 text-secondary">
              {langAware(
                copy,
                '图书馆、浴场、社区中心都只是工具。先看它能解决什么、不能解决什么，再判断是否适合你的问题。',
                'A library, bath, or community center is only a tool. First ask what it can and cannot solve.',
                '図書館、浴場、コミュニティセンターは道具です。何に応答でき、何には届かないかを先に読む。'
              )}
            </p>
          </>
        )}
      />
      <SubNav copy={copy} prefix={prefix} active="programs" />
      <section id="graduation-filters" className="scroll-mt-28 border-y border-subtle py-6">
        <input
          className="min-h-12 w-full border-0 border-b border-default bg-transparent px-0 text-base font-medium text-primary outline-none transition-colors placeholder:text-soft focus:border-[color:var(--ui-accent)]"
          value={query}
          onChange={event => setFilterParam('q', event.target.value)}
          placeholder={langAware(copy, '搜索用途，例如图书馆、浴场、厨房', 'Search programs, such as library, bath, kitchen', '用途を検索：図書館、浴場、キッチン')}
        />
        <p className="mt-4 text-sm text-secondary">
          {copy.total} {items.length} / {programs.length} · {langAware(copy, '精选用途', 'Curated programs', '選定用途')}
        </p>
      </section>
      <div className="border-y border-subtle">
        {items.map(program => (
          <ProgramCard
            key={program.id}
            prefix={prefix}
            program={program}
            issueCount={program.possible_issue_ids.filter(id => publicIssues.some(issue => issue.id === id)).length}
            siteCount={program.site_type_ids.filter(id => sites.some(site => site.id === id)).length}
            caseCount={program.reference_case_ids.filter(id => publicCases.some(item => item.id === id)).length}
          />
        ))}
      </div>
    </div>
  )
}

function ProgramDetail({ copy, prefix, program, issueMap, siteMap, caseMap }: {
  copy: Copy
  prefix: string
  program: GraduationProgram
  issueMap: Map<string, GraduationIssue>
  siteMap: Map<string, GraduationSiteType>
  caseMap: Map<string, GraduationCase>
}) {
  const lang = langFromPrefix(prefix)
  const relatedIssues = program.possible_issue_ids
    .map(id => issueMap.get(id))
    .filter((issue): issue is GraduationIssue => Boolean(issue && issue.status === 'published'))
  const relatedSites = program.site_type_ids
    .map(id => siteMap.get(id))
    .filter(Boolean) as GraduationSiteType[]
  const relatedCases = program.reference_case_ids
    .map(id => caseMap.get(id))
    .filter(isPublicGraduationCase)
  const canAddress = guideList(program.can_address, lang)
  const needsResearch = guideList(program.needs_research, lang)

  return (
    <DetailShell
      copy={copy}
      prefix={prefix}
      active="programs"
      title={programName(program, lang)}
      summary={programSummary(program, lang)}
      backHref={`${prefix}/programs`}
      meta={[
        { label: copy.navIssues, value: String(relatedIssues.length) },
        { label: copy.recommendedSites, value: String(relatedSites.length) },
        { label: copy.relatedCases, value: String(relatedCases.length) },
      ]}
    >
      <section className="grid border-y border-subtle md:grid-cols-2">
        <GuideColumn title={langAware(copy, '它能回应什么问题', 'What it can address', '応答できる課題')} items={canAddress} />
        <GuideColumn title={langAware(copy, '还需要查什么', 'What still needs research', 'さらに調べること')} items={needsResearch} />
      </section>
      <InfoBlock title={langAware(copy, '用途关键词', 'Program keywords', '用途キーワード')}>
        <ChipList items={programKeywords(program, lang)} />
      </InfoBlock>
      <SectionGrid title={copy.navIssues}>
        {relatedIssues.map(issue => <IssueCard key={issue.id} prefix={prefix} issue={issue} compact />)}
      </SectionGrid>
      <SectionGrid title={copy.recommendedSites}>
        {relatedSites.map(site => <SiteCard key={site.id} prefix={prefix} site={site} />)}
      </SectionGrid>
      <CaseArchiveList title={copy.relatedCases}>
        {relatedCases.map((item, index) => <CaseArchiveRow key={item.id} prefix={prefix} item={item} eager={index === 0} />)}
      </CaseArchiveList>
      <section className="border-b border-subtle pb-5">
        <h2 className="heading-section">{langAware(copy, '依据入口', 'Evidence entry points', '根拠への入口')}</h2>
        <div className="mt-4 grid gap-x-6 gap-y-2 md:grid-cols-2">
          {program.evidence_urls.map(url => (
            <a key={url} className="group border-b border-subtle pb-2 text-xs leading-5 text-muted transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent" href={url} target="_blank" rel="noreferrer">
              <span className="block font-medium text-secondary transition-colors group-hover:text-accent">{sourceLabel(url, lang)}</span>
              <span className="break-all">{url}</span>
            </a>
          ))}
        </div>
      </section>
    </DetailShell>
  )
}

function SiteDetail({ copy, prefix, site, issues, cases }: {
  copy: Copy
  prefix: string
  site: GraduationSiteType
  issues: GraduationIssue[]
  cases: GraduationCase[]
}) {
  const lang = langFromPrefix(prefix)
  const relatedIssues = issues.filter(issue => issue.status === 'published' && issue.recommended_site_types.includes(site.id))
  const caseIds = new Set(relatedIssues.flatMap(issue => issue.reference_case_ids))
  const relatedCases = cases.filter(item => isPublicGraduationCase(item) && caseIds.has(item.id)).slice(0, 6)
  return (
    <DetailShell
      copy={copy}
      prefix={prefix}
      active="sites"
      title={siteName(site, lang)}
      summary={siteReason(site, lang)}
      backHref={`${prefix}/sites`}
      actions={<ResearchSaveButton kind="site" id={site.id} prefix={prefix} />}
      meta={[
        { label: copy.navIssues, value: String(relatedIssues.length) },
        { label: copy.relatedCases, value: String(relatedCases.length) },
        { label: langAware(copy, '关键词', 'Keywords', 'キーワード'), value: String(siteKeywords(site, lang).length) },
      ]}
    >
      <InfoBlock title={langAware(copy, '典型地址', 'Typical address', '住所例')}><p className="text-secondary">{siteAddress(site, lang)}</p><ChipList items={siteKeywords(site, lang)} /></InfoBlock>
      <InfoBlock title={langAware(copy, '候选地点例', 'Candidate locations', '候補地例')}>
        <CandidateLocationList candidates={siteCandidateLocations(site)} lang={lang} />
      </InfoBlock>
      <SectionGrid title={copy.navIssues}>{relatedIssues.map(issue => <IssueCard key={issue.id} prefix={prefix} issue={issue} compact />)}</SectionGrid>
      <CaseArchiveList title={copy.relatedCases}>{relatedCases.map((item, index) => <CaseArchiveRow key={item.id} prefix={prefix} item={item} eager={index === 0} />)}</CaseArchiveList>
    </DetailShell>
  )
}

function CaseDetail({ copy, prefix, item, issues }: {
  copy: Copy
  prefix: string
  item: GraduationCase
  issues: GraduationIssue[]
}) {
  const lang = langFromPrefix(prefix)
  const relatedIssues = issues.filter(issue => issue.status === 'published' && issue.reference_case_ids.includes(item.id))
  return (
    <DetailShell
      copy={copy}
      prefix={prefix}
      active="cases"
      title={caseName(item, lang)}
      summary={caseConcept(item, lang)}
      backHref={`${prefix}/cases`}
      actions={<ResearchSaveButton kind="case" id={item.id} prefix={prefix} />}
      meta={[
        { label: langAware(copy, '年份', 'Year', '年'), value: item.year ? String(item.year) : '-' },
        { label: langAware(copy, '地点', 'Location', '所在地'), value: caseLocation(item, lang) || '-' },
        { label: copy.navIssues, value: String(relatedIssues.length) },
      ]}
    >
      <section className="grid gap-5 md:grid-cols-[1fr_0.7fr]">
        <CaseVisual lang={lang} item={item} />
        <InfoBlock title={langAware(copy, '基本信息', 'Basic info', '基本情報')}>
          <p className="text-secondary">{caseLocation(item, lang)}{item.year ? ` · ${item.year}` : ''}</p>
          <p className="text-secondary">{item.architect || langAware(copy, '建筑师待补充', 'Architect to confirm', '建築家未確認')}</p>
          <ChipList items={caseKeywords(item, lang)} />
          {item.building_slug && (
            <Link className="block text-sm font-semibold text-primary underline-offset-4 hover:text-accent hover:underline" href={`/${lang}/building/${item.building_slug}`}>
              {langAware(copy, '查看主体建筑的历史与资料', 'Open canonical building history and sources', '主体建築の歴史と資料を見る')} →
            </Link>
          )}
          <a className="text-sm text-secondary underline-offset-4 hover:text-primary hover:underline" href={item.source_url} target="_blank" rel="noreferrer">{copy.source}</a>
          {item.building_official_url && item.building_official_url !== item.source_url && (
            <a className="block text-sm text-secondary underline-offset-4 hover:text-primary hover:underline" href={item.building_official_url} target="_blank" rel="noreferrer">
              {langAware(copy, '建筑官方来源', 'Building official source', '建築公式出典')}
            </a>
          )}
          {item.building_wikipedia_url && (
            <a className="block text-sm text-secondary underline-offset-4 hover:text-primary hover:underline" href={item.building_wikipedia_url} target="_blank" rel="noreferrer">Wikipedia</a>
          )}
          {item.image_source_url && (
            <a className="block text-sm text-secondary underline-offset-4 hover:text-primary hover:underline" href={item.image_source_url} target="_blank" rel="noreferrer">
              {langAware(copy, '图片来源', 'Image source', '画像出典')}{item.image_license ? ` · ${item.image_license}` : ''}
            </a>
          )}
          {item.image_credit && <p className="text-xs leading-6 text-muted">{item.image_credit}</p>}
          {item.image_note && <p className="text-xs leading-6 text-muted">{item.image_note}</p>}
        </InfoBlock>
      </section>
      <SectionGrid title={copy.navIssues}>{relatedIssues.map(issue => <IssueCard key={issue.id} prefix={prefix} issue={issue} compact />)}</SectionGrid>
    </DetailShell>
  )
}

function RandomPage({ copy, prefix, issues, siteMap, caseMap }: {
  copy: Copy
  prefix: string
  issues: GraduationIssue[]
  sites: GraduationSiteType[]
  cases: GraduationCase[]
  siteMap: Map<string, GraduationSiteType>
  caseMap: Map<string, GraduationCase>
}) {
  const lang = langFromPrefix(prefix)
  const [seed, setSeed] = useState(0)
  const published = issues.filter(issue => issue.status === 'published')
  const issue = published[seed % published.length]
  const relatedSites = issue.recommended_site_types.map(id => siteMap.get(id)).filter(Boolean).slice(0, 2) as GraduationSiteType[]
  const relatedCases = issue.reference_case_ids
    .map(id => caseMap.get(id))
    .filter(isPublicGraduationCase)
    .slice(0, 3)
  const title = langAware(copy, `从「${issueTitle(issue, lang)}」开始看`, `Start from ${issueTitle(issue, lang)}`, `「${issueTitle(issue, lang)}」から見る`)
  const firstSite = relatedSites[0]
  const firstCase = relatedCases[0]
  return (
    <div className="space-y-8">
      <GraduationHero
        copy={copy}
        prefix={prefix}
        title={copy.navRandom}
        body={langAware(copy, '当你完全不知道想看什么时，随机给你一个“课题 + 敷地 + 参考案例”的入口，只用来打开思路。', 'When you do not know where to start, this gives one issue, site type, and reference case as a browsing entry.', '何から見ればよいか分からない時に、課題・敷地・事例を一つの入口として提示します。')}
        actions={(
          <>
            <ActionButton onClick={() => setSeed(Date.now())} primary>{copy.again}</ActionButton>
          </>
        )}
        aside={(
          <>
            <h2 className="text-xl font-semibold text-primary">{localizedUiText(lang, '这是做什么的？', 'What is this for?', 'これは何に使う？')}</h2>
            <p className="mt-4 text-sm leading-7 text-secondary">
              {localizedUiText(lang, '它不是替你决定毕业设计，只是把你带进一个可以继续调查的资料组。', 'It does not choose your thesis. It only opens a set of materials you can keep researching.', '卒業設計を決める機能ではなく、調査を続けるための資料セットへの入口です。')}
            </p>
            <ol className="mt-5 space-y-2 text-xs leading-6 text-muted">
              <li>{localizedUiText(lang, '1. 有兴趣就打开问题、敷地、案例', '1. Open the issue, site, and case if it feels useful', '1. 気になれば課題、敷地、事例を開く')}</li>
              <li>{localizedUiText(lang, '2. 没感觉就换一个入口', '2. Try another entry if it does not click', '2. 違うと思ったら別の入口を見る')}</li>
            </ol>
          </>
        )}
      />
      <SubNav copy={copy} prefix={prefix} active="random" />
      <section className="space-y-5 border-y border-subtle py-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{langAware(copy, '浏览入口', 'Browsing entry', '閲覧入口')}</p>
            <h2 className="mt-3 heading-section">{title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-secondary">
            {langAware(
              copy,
              '先判断这个问题有没有兴趣；有兴趣再打开下面三个依据继续看。',
              'First decide whether this issue is worth exploring. If it is, open the three references below.',
              'まずこの課題に興味があるか判断し、必要なら下の三つの根拠を開きます。'
            )}
          </p>
        </div>
        <div className="grid gap-0 border-t border-subtle md:grid-cols-3">
          <DirectionPart
            index={1}
            title={copy.navIssues}
            body={issueTitle(issue, lang)}
            description={issueSummary(issue, lang)}
            href={`${prefix}/issues/${issue.id}`}
          />
          <DirectionPart
            index={2}
            title={copy.recommendedSites}
            body={relatedSites.map(site => siteName(site, lang)).join(' / ')}
            description={firstSite ? siteReason(firstSite, lang) : ''}
            href={firstSite ? `${prefix}/sites/${firstSite.id}` : `${prefix}/sites`}
          />
          <DirectionPart
            index={3}
            title={copy.relatedCases}
            body={firstCase ? caseName(firstCase, lang) : `${relatedCases.length}`}
            description={firstCase ? caseConcept(firstCase, lang) : langAware(copy, '打开案例库继续找参考。', 'Open the case archive for references.', '事例一覧から参考を探します。')}
            href={firstCase ? `${prefix}/cases/${firstCase.id}` : `${prefix}/cases`}
          />
        </div>
        <div className="flex flex-wrap gap-2 border-t border-subtle pt-4">
          <ActionButton onClick={() => downloadJson(`${issue.id}-random-bundle.json`, buildInspirationBundle(issue, relatedSites, relatedCases, lang))}>
            {langAware(copy, 'JSON 出力', 'Export JSON', 'JSON 出力')}
          </ActionButton>
          <ActionButton onClick={() => downloadCsv(`${issue.id}-random-bundle.csv`, buildInspirationCsvRows(issue, relatedSites, relatedCases, lang))}>
            {langAware(copy, 'CSV 出力', 'Export CSV', 'CSV 出力')}
          </ActionButton>
        </div>
      </section>
    </div>
  )
}

function ResearchPage({ copy, prefix, issueMap, siteMap, caseMap }: {
  copy: Copy
  prefix: string
  issueMap: Map<string, GraduationIssue>
  siteMap: Map<string, GraduationSiteType>
  caseMap: Map<string, GraduationCase>
}) {
  const lang = langFromPrefix(prefix)
  const { state, saveIssue, saveSite, toggleCase, setNextStep, clear } = useGraduationResearch()
  const issue = state.issueId ? issueMap.get(state.issueId) : undefined
  const site = state.siteId ? siteMap.get(state.siteId) : undefined
  const selectedCases = state.caseIds.map(id => caseMap.get(id)).filter(Boolean) as GraduationCase[]
  const count = Number(Boolean(issue)) + Number(Boolean(site)) + selectedCases.length
  const exportResearch = () => {
    const lines = [
      `# ${localizedUiText(lang, '毕业设计研究清单', 'Graduation research list', '卒業設計研究リスト')}`,
      '',
      `## ${localizedUiText(lang, '当前方向', 'Current direction', '現在の方向')}`,
      issue ? `- ${localizedUiText(lang, '问题', 'Issue', '課題')}: ${issueTitle(issue, lang)}` : '',
      site ? `- ${localizedUiText(lang, '场地', 'Site', '敷地')}: ${siteName(site, lang)}` : '',
      '',
      `## ${localizedUiText(lang, '参考案例', 'Reference cases', '参考事例')}`,
      ...selectedCases.map(item => `- ${caseName(item, lang)}${item.year ? ` (${item.year})` : ''}`),
      '',
      `## ${localizedUiText(lang, '下一步', 'Next step', '次の一歩')}`,
      state.nextStep || '-',
    ].filter((line, index, all) => line !== '' || all[index - 1] !== '')
    downloadText('graduation-research.md', lines.join('\n'), 'text/markdown;charset=utf-8')
  }

  return (
    <div className="space-y-10">
      <GraduationHero
        copy={copy}
        prefix={prefix}
        title={localizedUiText(lang, '我的研究清单', 'My research list', '研究リスト')}
        body={localizedUiText(lang, '只保留一个问题、一个场地和少量案例，先把方向说清楚。', 'Keep one issue, one site, and a few cases so the direction stays clear.', '一つの課題、一つの敷地、少数の事例に絞り、方向を明確にします。')}
        aside={(
          <div>
            <p className="text-xs font-medium text-muted">{localizedUiText(lang, '已保存', 'Saved', '保存済み')}</p>
            <p className="mt-2 text-3xl font-semibold text-primary">{count}</p>
          </div>
        )}
      />

      {count === 0 ? (
        <section className="border-y border-subtle py-10">
          <h2 className="heading-section">{localizedUiText(lang, '还没有研究方向', 'No direction saved yet', '研究方向はまだありません')}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-secondary">{localizedUiText(lang, '先从社会问题开始，打开详情后加入研究清单。', 'Start with a social issue, open its detail page, and save it.', 'まず社会課題を開き、詳細ページから研究リストに追加します。')}</p>
          <div className="mt-6"><NavButton href={`${prefix}/issues`}>{copy.goIssues}</NavButton></div>
        </section>
      ) : (
        <>
          <section className="border-y border-subtle">
            <ResearchPageRow
              label={localizedUiText(lang, '问题', 'Issue', '課題')}
              value={issue ? issueTitle(issue, lang) : localizedUiText(lang, '尚未选择', 'Not selected', '未選択')}
              href={issue ? `${prefix}/issues/${issue.id}` : `${prefix}/issues`}
              onRemove={issue ? () => saveIssue(issue.id) : undefined}
              lang={lang}
            />
            <ResearchPageRow
              label={localizedUiText(lang, '场地', 'Site', '敷地')}
              value={site ? siteName(site, lang) : localizedUiText(lang, '尚未选择', 'Not selected', '未選択')}
              href={site ? `${prefix}/sites/${site.id}` : `${prefix}/sites`}
              onRemove={site ? () => saveSite(site.id) : undefined}
              lang={lang}
            />
          </section>

          <section>
            <div className="flex items-end justify-between gap-4 border-b border-subtle pb-3">
              <h2 className="heading-section">{localizedUiText(lang, '参考案例', 'Reference cases', '参考事例')}</h2>
              <Link href={`${prefix}/cases`} className="text-xs font-semibold text-muted hover:text-accent">{copy.navCases} →</Link>
            </div>
            {selectedCases.length === 0 ? (
              <p className="py-6 text-sm text-secondary">{localizedUiText(lang, '尚未选择案例。两个到三个就够了。', 'No cases selected. Two or three are enough.', '事例は未選択です。二、三件で十分です。')}</p>
            ) : selectedCases.map(item => (
              <ResearchPageRow key={item.id} label={item.id} value={caseName(item, lang)} href={`${prefix}/cases/${item.id}`} onRemove={() => toggleCase(item.id)} lang={lang} />
            ))}
          </section>

          <section className="border-y border-subtle py-6">
            <label className="block text-sm font-semibold text-primary" htmlFor="graduation-next-step">{localizedUiText(lang, '下一步', 'Next step', '次の一歩')}</label>
            <textarea
              id="graduation-next-step"
              className="mt-4 min-h-28 w-full resize-y border border-default bg-[color:var(--ui-surface-raised)] p-4 text-sm leading-7 text-primary outline-none focus:border-[color:var(--ui-accent)]"
              value={state.nextStep}
              onChange={event => setNextStep(event.target.value)}
              placeholder={localizedUiText(lang, '例如：周末去候选地点记录人流和空置空间。', 'For example: visit the candidate site and record movement and unused space.', '例：週末に候補地へ行き、人の流れと余白を記録する。')}
            />
          </section>

          <div className="flex flex-wrap gap-4">
            <ActionButton onClick={exportResearch}>{localizedUiText(lang, '下载研究笔记', 'Download research note', '研究メモをダウンロード')}</ActionButton>
            <button type="button" className="min-h-10 border-b border-subtle text-xs font-medium text-muted hover:border-[color:var(--ui-text-primary)] hover:text-primary" onClick={clear}>{localizedUiText(lang, '清空清单', 'Clear list', 'リストを空にする')}</button>
          </div>
        </>
      )}
    </div>
  )
}

function ResearchPageRow({ label, value, href, onRemove, lang }: {
  label: string
  value: string
  href: string
  onRemove?: () => void
  lang: GraduationLanguage
}) {
  return (
    <div className="grid gap-3 border-b border-subtle py-5 last:border-b-0 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:items-center">
      <span className="text-xs font-medium text-muted">{label}</span>
      <Link href={href} className="text-base font-semibold leading-7 text-primary hover:text-accent">{value}</Link>
      {onRemove && <button type="button" className="justify-self-start text-xs font-medium text-muted hover:text-primary sm:justify-self-end" onClick={onRemove}>{localizedUiText(lang, '移除', 'Remove', '削除')}</button>}
    </div>
  )
}

function BriefPage({ copy, prefix, markdown }: { copy: Copy; prefix: string; markdown: string }) {
  return (
    <DetailShell copy={copy} prefix={prefix} active="brief" title={copy.navBrief} summary={langAware(copy, '把课程要求翻成可执行清单。', 'Course requirements as an actionable checklist.', '課題要件を実行可能なリストへ。')} backHref={prefix}>
      <article className="space-y-5 border-y border-subtle px-2 py-6">
        {markdown.split('\n').map((line, index) => {
          if (line.startsWith('# ')) return <h2 key={index} className="heading-section">{line.slice(2)}</h2>
          if (line.startsWith('## ')) return <h3 key={index} className="text-xl font-semibold text-primary">{line.slice(3)}</h3>
          if (line.trim()) return <p key={index} className="text-sm leading-7 text-secondary">{line}</p>
          return null
        })}
      </article>
    </DetailShell>
  )
}

function DetailShell({ copy, prefix, active, title, summary, backHref, meta, actions, children }: {
  copy: Copy
  prefix: string
  active: 'issues' | 'programs' | 'sites' | 'cases' | 'random' | 'brief'
  title: string
  summary: string
  backHref: string
  meta?: DetailMeta[]
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="space-y-8">
      <GraduationHero
        copy={copy}
        prefix={prefix}
        title={title}
        body={summary}
        actions={actions}
        aside={meta ? (
          <dl className="grid sm:grid-cols-3 lg:block">
            {meta.map((item, index) => (
              <div key={item.label} className={`py-3 ${index > 0 ? 'border-t border-subtle sm:border-t-0 sm:border-l sm:pl-4 lg:border-l-0 lg:border-t lg:pl-0' : ''}`}>
                <dt className="text-xs font-medium text-muted">{item.label}</dt>
                <dd className="mt-2 text-xl font-semibold text-primary">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : undefined}
      />
      <SubNav copy={copy} prefix={prefix} active={active} />
      <div className="space-y-8">{children}</div>
      <NavButton href={backHref}>{copy.back}</NavButton>
    </div>
  )
}

function SubNav({ copy, prefix, active }: {
  copy: Copy
  prefix: string
  active: 'issues' | 'programs' | 'sites' | 'cases' | 'random' | 'brief'
}) {
  const items = [
    { key: 'issues', href: `${prefix}/issues`, label: copy.navIssues },
    { key: 'programs', href: `${prefix}/programs`, label: copy.navPrograms },
    { key: 'sites', href: `${prefix}/sites`, label: copy.navSites },
    { key: 'cases', href: `${prefix}/cases`, label: copy.navCases },
    { key: 'random', href: `${prefix}/random`, label: copy.navRandom },
    { key: 'brief', href: `${prefix}/brief`, label: copy.navBrief },
  ] as const

  return (
    <nav className="grid grid-cols-2 border-y border-subtle sm:grid-cols-3 lg:grid-cols-6" aria-label={copy.title}>
      {items.map((item, index) => (
        <Link
          key={item.key}
          href={item.href}
          className={`group grid min-h-14 grid-cols-[minmax(0,1fr)_2rem] items-center gap-3 border-b border-r border-subtle px-3 py-2 text-sm font-semibold transition-colors last:border-r-0 lg:border-b-0 ${active === item.key ? 'text-primary shadow-[inset_0_-1px_0_var(--ui-text-primary)]' : 'text-muted hover:text-primary'}`}
          aria-current={active === item.key ? 'page' : undefined}
        >
          <span className="truncate">{item.label}</span>
          <span className={`font-mono text-[0.68rem] font-medium ${active === item.key ? 'text-primary' : 'text-muted group-hover:text-primary'}`} aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
        </Link>
      ))}
    </nav>
  )
}

function SectionGrid({ title, children }: { title: string; children: ReactNode }) {
  const count = Children.count(children)
  const columns = count <= 1 ? 'md:grid-cols-1' : count === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'
  return (
    <section className="graduation-section space-y-5">
      <h2 className="heading-section">{title}</h2>
      <div className={`grid gap-x-6 gap-y-0 ${columns}`}>{children}</div>
    </section>
  )
}

function StarterPath({ index, title, body, primaryHref, primaryLabel, links }: {
  index: number
  title: string
  body: string
  primaryHref: string
  primaryLabel: string
  links: Array<{ label: string; href: string }>
}) {
  return (
    <div className="graduation-soft-band border-b border-subtle px-4 py-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs font-semibold text-accent">{String(index).padStart(2, '0')}</span>
        <Link className="inline-flex items-center gap-1 border-b border-default pb-1 text-xs font-semibold text-primary transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent" href={primaryHref}>
          <span>{primaryLabel}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
      <h3 className="mt-5 text-xl font-semibold leading-snug text-primary">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-secondary">{body}</p>
      {links.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {links.map(item => (
            <Link key={item.href} className="min-h-8 border-b border-subtle text-xs font-medium leading-8 text-muted transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function DirectionPart({ index, title, body, description, href }: {
  index: number
  title: string
  body: string
  description: string
  href: string
}) {
  return (
    <Link className="interactive-row group block border-b border-subtle px-2 py-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0" href={href}>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <span className="w-8 font-mono text-xs font-semibold text-accent">{String(index).padStart(2, '0')}</span>
          <p className="text-xs font-medium text-muted">{title}</p>
        </span>
        <span aria-hidden="true" className="text-xs font-semibold text-muted transition-colors group-hover:text-accent">→</span>
      </div>
      <h3 className="mt-4 text-base font-semibold leading-7 text-primary transition-colors group-hover:text-accent">{body}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-secondary">{description}</p>
    </Link>
  )
}

function ActiveFilterBar({ copy, lang, items, total, onClear }: {
  copy: Copy
  lang: GraduationLanguage
  items: Array<{ key: string; label: string; onRemove: () => void }>
  total: number
  onClear: () => void
}) {
  if (items.length === 0) return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-secondary">{copy.total} {total} · {copy.publishedOnly}</p>
      <p className="text-xs leading-5 text-muted">
        {localizedUiText(lang, '还没有筛选条件。可以直接浏览，也可以先搜索关键词。', 'No filters yet. Browse directly or start with a keyword.', '条件は未設定です。そのまま見るか、キーワードから始められます。')}
      </p>
    </div>
  )

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-secondary">{copy.total} {total} · {copy.publishedOnly}</p>
        <button className="min-h-9 border-b border-default px-0 text-xs font-medium text-primary transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent" onClick={onClear}>
          {localizedUiText(lang, '全部清除', 'Clear all', 'すべて解除')}
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted">{localizedUiText(lang, '当前条件', 'Current filters', '現在の条件')}</span>
        {items.map(item => (
          <button
            key={item.key}
            className="inline-flex min-h-9 items-center gap-2 border-b border-default px-0 text-xs font-medium text-secondary transition-colors hover:border-[color:var(--ui-text-primary)] hover:text-primary"
            onClick={item.onRemove}
            aria-label={localizedUiText(lang, `移除 ${item.label}`, `Remove ${item.label}`, `${item.label} を解除`)}
          >
            <span>{item.label}</span>
            <span aria-hidden="true" className="text-muted">x</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function CaseArchiveList({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="heading-section">{title}</h2>
      <div className="border-y border-subtle">{children}</div>
    </section>
  )
}

function IssueKnowledgeGuide({ guide, lang }: { guide: GraduationIssueGuide; lang: GraduationLanguage }) {
  const canDo = guideList(guide.architecture_can_do, lang)
  const siteClues = guideList(guide.site_clues, lang)
  const questions = guideList(guide.starter_questions, lang)

  return (
    <section className="space-y-5">
      <div className="border-y border-subtle py-6">
        <p className="eyebrow">
          {localizedUiText(lang, '社会问题地图', 'Social issue map', '社会課題マップ')}
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div>
            <h2 className="heading-section">
              {localizedUiText(lang, '先理解问题，不急着决定方案', 'Understand the issue before choosing a project', 'まず問題を理解し、すぐ案にしない')}
            </h2>
            <p className="mt-4 text-sm leading-7 text-secondary">{guideText(guide.social_context, lang)}</p>
            <p className="mt-4 border-l-2 border-default pl-4 text-sm leading-7 text-secondary">{guideText(guide.spatial_problem, lang)}</p>
          </div>
          <div className="border-t border-subtle pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h3 className="text-base font-semibold text-primary">
              {localizedUiText(lang, '建筑能介入哪里', 'Where architecture can intervene', '建築が介入できるところ')}
            </h3>
            <p className="mt-3 text-sm leading-7 text-secondary">{guideText(guide.why_architecture, lang)}</p>
            <p className="mt-4 text-xs leading-6 text-muted">{guideText(guide.architecture_cannot_do, lang)}</p>
          </div>
        </div>
      </div>

      <div className="grid border-y border-subtle md:grid-cols-3">
        <GuideColumn
          title={localizedUiText(lang, '设计可以做什么', 'Design entry points', '設計でできること')}
          items={canDo}
        />
        <GuideColumn
          title={localizedUiText(lang, '在哪里找敷地', 'Site clues', '敷地の探し方')}
          items={siteClues}
        />
        <GuideColumn
          title={localizedUiText(lang, '继续追问', 'Questions to continue', '次に問うこと')}
          items={questions}
        />
      </div>

      <div className="border-b border-subtle pb-5">
        <h3 className="text-sm font-semibold text-primary">
          {localizedUiText(lang, '依据入口', 'Evidence entry points', '根拠への入口')}
        </h3>
        <div className="mt-3 grid gap-x-6 gap-y-2 md:grid-cols-2">
          {guide.evidence_urls.map(url => (
            <a key={url} className="group border-b border-subtle pb-2 text-xs leading-5 text-muted transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent" href={url} target="_blank" rel="noreferrer">
              <span className="block font-medium text-secondary transition-colors group-hover:text-accent">{sourceLabel(url, lang)}</span>
              <span className="break-all">{url}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function GuideColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="px-2 py-5 md:border-r md:last:border-r-0 border-subtle">
      <h3 className="text-sm font-semibold text-primary">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map(item => (
          <li key={item} className="grid grid-cols-[1.5rem_minmax(0,1fr)] text-sm leading-7 text-secondary">
            <span className="mt-3 h-px w-4 bg-[color:var(--ui-accent)]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function IssueArchiveNotes({ issue, sites, cases, lang }: {
  issue: GraduationIssue
  sites: GraduationSiteType[]
  cases: GraduationCase[]
  lang: GraduationLanguage
}) {
  const tags = issueKeywords(issue, lang).slice(0, 5)
  const programs = issueBuildingTypes(issue, lang).slice(0, 4)
  const siteNames = sites.map(site => siteName(site, lang)).slice(0, 3)
  const caseNames = cases.map(item => caseName(item, lang)).slice(0, 4)
  const notes = [
    {
      title: localizedUiText(lang, '问题轴', 'Issue Frame', '問題の軸'),
      body: localizedUiText(
        lang,
        `以「${tags.join(' / ')}」作为资料阅读的入口，把社会现象转成空间问题，而不是只停留在口号。`,
        `Use ${tags.join(' / ')} as the archive entry point and turn the social condition into a spatial problem.`,
        `「${tags.join(' / ')}」を資料読解の入口にし、社会状況を空間課題へ変換して読む。`
      ),
      meta: programs,
    },
    {
      title: localizedUiText(lang, '场地读法', 'Site Reading', '敷地の読み方'),
      body: localizedUiText(
        lang,
        `优先比较${siteNames.join('、')}等敷地类型，看现有居民、公共动线、闲置空间和运营主体之间的关系。`,
        `Compare site types such as ${siteNames.join(', ')} by existing users, public routes, idle space, and operators.`,
        `${siteNames.join('、')}などの敷地タイプを、既存利用者、公共動線、余白、運営主体から比較する。`
      ),
      meta: siteNames,
    },
    {
      title: localizedUiText(lang, '案例读法', 'Case Reading', '事例の見方'),
      body: localizedUiText(
        lang,
        `从${caseNames.join('、')}等案例中读取用途复合、公共性、停留方式和维护机制。`,
        `Read mixed programs, publicness, staying behavior, and maintenance logic from cases such as ${caseNames.join(', ')}.`,
        `${caseNames.join('、')}などから、用途の複合、公共性、滞在のつくり方、維持の仕組みを読む。`
      ),
      meta: caseNames,
    },
  ]

  return (
    <section className="space-y-4">
      <h2 className="heading-section">{localizedUiText(lang, '资料阅读', 'Archive Notes', '資料メモ')}</h2>
      <div className="grid border-y border-subtle md:grid-cols-3">
        {notes.map((note, index) => (
          <div key={note.title} className={`px-2 py-5 ${index < notes.length - 1 ? 'border-b border-subtle md:border-b-0 md:border-r' : ''}`}>
            <h3 className="text-lg font-semibold text-primary">{note.title}</h3>
            <p className="mt-3 text-sm leading-7 text-secondary">{note.body}</p>
            <div className="mt-4"><ChipList items={note.meta} /></div>
          </div>
        ))}
      </div>
    </section>
  )
}

function IssueCard({ prefix, issue, compact = false }: { prefix: string; issue: GraduationIssue; compact?: boolean }) {
  const lang = langFromPrefix(prefix)
  const category = primaryIssueCategory(issue)
  const keywords = issueKeywords(issue, lang).slice(0, 4)
  if (compact) {
    return (
      <Link className="interactive-row group block border-b border-subtle px-3 py-5 last:border-b-0" href={`${prefix}/issues/${issue.id}`}>
        <span className="flex items-start justify-between gap-4">
          <span>
            <span className="block font-mono text-xs font-semibold text-muted">{issue.id}</span>
            <span className="mt-2 block text-xs font-medium text-accent">{categoryLabel(category, lang)}</span>
          </span>
          <span className="shrink-0 border-b border-default pb-1 text-xs font-semibold text-primary transition-colors group-hover:border-[color:var(--ui-accent)] group-hover:text-accent">
            {localizedUiText(lang, '打开比较', 'Open', '開いて比較')} <span aria-hidden="true">→</span>
          </span>
        </span>
        <span className="mt-5 block text-xl font-semibold leading-snug text-primary transition-colors group-hover:text-accent">{issueTitle(issue, lang)}</span>
        <span className="mt-3 block text-sm leading-7 text-secondary">{issueSummary(issue, lang)}</span>
        {keywords.length > 0 && <span className="mt-4 block"><ChipList items={keywords} /></span>}
      </Link>
    )
  }

  return (
    <Link className="interactive-row group grid gap-4 border-b border-subtle px-3 py-5 last:border-b-0 md:grid-cols-[9.5rem_minmax(0,1fr)_8rem] md:items-start md:px-4" href={`${prefix}/issues/${issue.id}`}>
      <span className="flex items-baseline justify-between gap-3 md:block md:border-r md:border-subtle md:pr-4">
        <span className="block font-mono text-xs font-semibold text-muted">{issue.id}</span>
        <span className="block text-xs font-medium text-accent md:mt-3">{categoryLabel(category, lang)}</span>
      </span>
      <span className="min-w-0">
        <span className="block text-xl font-semibold leading-snug text-primary transition-colors group-hover:text-accent">{issueTitle(issue, lang)}</span>
        <span className="mt-3 block text-sm leading-7 text-secondary">{issueSummary(issue, lang)}</span>
        {keywords.length > 0 && <span className="mt-4 block"><ChipList items={keywords} /></span>}
      </span>
      <span className="self-start justify-self-start border-b border-default pb-1 text-xs font-semibold text-primary transition-colors group-hover:border-[color:var(--ui-accent)] group-hover:text-accent md:justify-self-end">
        {localizedUiText(lang, '打开比较', 'Open', '開いて比較')} <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}

function ProgramCard({ prefix, program, issueCount, siteCount, caseCount }: {
  prefix: string
  program: GraduationProgram
  issueCount: number
  siteCount: number
  caseCount: number
}) {
  const lang = langFromPrefix(prefix)
  const keywords = programKeywords(program, lang).slice(0, 5)
  const meta = [
    localizedUiText(lang, `${issueCount} 个课题`, `${issueCount} issues`, `${issueCount} 課題`),
    localizedUiText(lang, `${siteCount} 个敷地`, `${siteCount} sites`, `${siteCount} 敷地`),
    localizedUiText(lang, `${caseCount} 个案例`, `${caseCount} cases`, `${caseCount} 事例`),
  ]

  return (
    <Link className="interactive-row group grid gap-4 border-b border-subtle px-3 py-5 last:border-b-0 md:grid-cols-[9.5rem_minmax(0,1fr)_9rem] md:items-start md:px-4" href={`${prefix}/programs/${program.id}`}>
      <span className="flex items-baseline justify-between gap-3 md:block md:border-r md:border-subtle md:pr-4">
        <span className="block font-mono text-xs font-semibold text-muted">{program.id}</span>
        <span className="block text-xs font-medium text-accent md:mt-3">{localizedUiText(lang, '用途反查', 'Program first', '用途から')}</span>
      </span>
      <span className="min-w-0">
        <span className="block text-xl font-semibold leading-snug text-primary transition-colors group-hover:text-accent">{programName(program, lang)}</span>
        <span className="mt-3 block text-sm leading-7 text-secondary">{programSummary(program, lang)}</span>
        <span className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs leading-6 text-muted">
          {meta.map(item => <span key={item}>{item}</span>)}
        </span>
        {keywords.length > 0 && <span className="mt-4 block"><ChipList items={keywords} /></span>}
      </span>
      <span className="self-start justify-self-start border-b border-default pb-1 text-xs font-semibold text-primary transition-colors group-hover:border-[color:var(--ui-accent)] group-hover:text-accent md:justify-self-end">
        {localizedUiText(lang, '反查问题', 'Open', '逆引きする')} <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}

function SiteCard({ prefix, site }: { prefix: string; site: GraduationSiteType }) {
  const lang = langFromPrefix(prefix)
  const candidates = siteCandidateLocations(site).slice(0, 2)
  return (
    <Link className="interactive-row group block border-b border-subtle px-2 py-5 last:border-b-0" href={`${prefix}/sites/${site.id}`}>
      <span className="flex items-start justify-between gap-4">
        <span className="text-xs font-semibold text-accent">{localizedUiText(lang, '场地线索', 'Site clue', '敷地の手がかり')}</span>
        <span className="shrink-0 border-b border-default pb-1 text-xs font-semibold text-primary transition-colors group-hover:border-[color:var(--ui-accent)] group-hover:text-accent">
          {localizedUiText(lang, '查看候选地', 'View site type', '候補地を見る')} <span aria-hidden="true">→</span>
        </span>
      </span>
      <h3 className="mt-5 text-lg font-semibold leading-snug text-primary transition-colors group-hover:text-accent">{siteName(site, lang)}</h3>
      <p className="mt-3 text-sm leading-7 text-secondary">{siteReason(site, lang)}</p>
      {candidates.length > 0 ? (
        <span className="mt-5 block border-t border-subtle pt-4">
          <span className="block text-xs font-semibold text-primary">{localizedUiText(lang, '候选地点例', 'Candidate locations', '候補地例')}</span>
          <span className="mt-2 block space-y-2">
          {candidates.map(candidate => (
            <span key={`${candidate.area}-${candidate.name}`} className="block border-l border-subtle pl-3 text-xs leading-6 text-muted">
              <span className="font-medium text-secondary">{candidateField(candidate, 'area', lang)}</span>
              <span>{' / '}{candidateField(candidate, 'name', lang)}</span>
            </span>
          ))}
          </span>
        </span>
      ) : (
        <p className="mt-3 text-xs text-muted">{siteAddress(site, lang)}</p>
      )}
    </Link>
  )
}

function CandidateLocationList({ candidates, lang }: { candidates: GraduationCandidateLocation[]; lang: GraduationLanguage }) {
  if (candidates.length === 0) {
    return <p className="text-sm text-muted">{localizedUiText(lang, '候选地点还在整理中。', 'Candidate locations are under review.', '候補地は調査中です。')}</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {candidates.map(candidate => (
        <div key={`${candidate.area}-${candidate.name}`} className="border-l border-subtle pl-4">
          <p className="text-xs font-medium text-muted">{candidateField(candidate, 'area', lang)}</p>
          <h3 className="mt-1 text-base font-semibold text-primary">{candidateField(candidate, 'name', lang)}</h3>
          <p className="mt-2 text-sm leading-7 text-secondary">{candidateField(candidate, 'angle', lang)}</p>
          {candidate.source_url && (
            <a className="mt-3 inline-flex min-h-9 items-center text-xs font-medium text-accent hover:underline" href={candidate.source_url} target="_blank" rel="noreferrer">
              {localizedUiText(lang, '查看出处', 'View source', '出典を見る')}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

function CaseCard({ prefix, item, relationNote, eager = false }: { prefix: string; item: GraduationCase; relationNote?: string; eager?: boolean }) {
  const lang = langFromPrefix(prefix)
  const meta = [
    item.year ? String(item.year) : '',
    item.architect || '',
    item.image_license || '',
  ].filter(Boolean).join(' · ')

  return (
    <Link className="interactive-row group grid border-t border-subtle px-2 py-5 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-4" href={`${prefix}/cases/${item.id}`}>
      <CaseVisual compact lang={lang} item={item} eager={eager} />
      <span className="min-w-0 pt-4 sm:pt-0">
        <span className="block text-lg font-semibold leading-snug text-primary transition-colors group-hover:text-accent">{caseName(item, lang)}</span>
        {meta && <span className="mt-2 block text-xs leading-5 text-muted">{meta}</span>}
        {relationNote && <span className="mt-3 block border-l-2 border-default pl-3 text-xs leading-6 text-muted">{relationNote}</span>}
        <span className="mt-3 block text-sm leading-7 text-secondary">{caseConcept(item, lang)}</span>
        <span className="mt-4 flex flex-wrap items-end justify-between gap-3">
          <span className="text-xs text-muted">{caseLocation(item, lang)}</span>
          <span className="shrink-0 border-b border-default pb-1 text-xs font-semibold text-primary transition-colors group-hover:border-[color:var(--ui-accent)] group-hover:text-accent">
            {localizedUiText(lang, '读取策略', 'Read strategy', '戦略を読む')} <span aria-hidden="true">→</span>
          </span>
        </span>
      </span>
    </Link>
  )
}

function CaseArchiveRow({ prefix, item, relationNote, eager = false }: { prefix: string; item: GraduationCase; relationNote?: string; eager?: boolean }) {
  const lang = langFromPrefix(prefix)
  const meta = [
    item.year ? String(item.year) : '',
    item.architect || '',
    item.image_license || '',
  ].filter(Boolean).join(' · ')
  const keywords = caseKeywords(item, lang).slice(0, 4)

  return (
    <Link
      className="interactive-row group grid gap-5 border-b border-subtle px-2 py-5 last:border-b-0 md:grid-cols-[15rem_minmax(0,1fr)] lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-7 lg:items-start"
      href={`${prefix}/cases/${item.id}`}
    >
      <CaseVisual compact lang={lang} item={item} eager={eager} />
      <span className="min-w-0">
        <span className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <span className="block text-xl font-semibold leading-snug text-primary transition-colors group-hover:text-accent">{caseName(item, lang)}</span>
          {meta && <span className="block text-xs leading-5 text-muted lg:max-w-[18rem] lg:text-right">{meta}</span>}
        </span>
        {relationNote && <span className="mt-4 block border-l-2 border-default pl-4 text-sm leading-7 text-secondary">{relationNote}</span>}
        <span className="mt-4 block text-sm leading-7 text-secondary">{caseConcept(item, lang)}</span>
        {keywords.length > 0 && <span className="mt-4 block"><ChipList items={keywords} /></span>}
        <span className="mt-5 flex flex-wrap items-end justify-between gap-3">
          <span className="text-xs text-muted">{caseLocation(item, lang)}</span>
          <span className="shrink-0 border-b border-default pb-1 text-xs font-semibold text-primary transition-colors group-hover:border-[color:var(--ui-accent)] group-hover:text-accent">
            {localizedUiText(lang, '读取策略', 'Read strategy', '戦略を読む')} <span aria-hidden="true">→</span>
          </span>
        </span>
      </span>
    </Link>
  )
}

function CaseVisual({ compact = false, lang, item, eager = false }: { compact?: boolean; lang: GraduationLanguage; item?: GraduationCase; eager?: boolean }) {
  const rawSrc = item?.image_url && item.image_url !== '/images/graduation/case-placeholder.svg' ? item.image_url : ''

  if (!rawSrc) {
    const pendingLabel = item?.id === 'CASE-031'
      ? localizedUiText(lang, '项目包含多个地点，封面图待确认', 'Multiple locations; cover image pending review', '複数地点のプロジェクト。カバー画像は確認中')
      : localizedUiText(lang, '封面图待确认', 'Cover image pending review', 'カバー画像は確認中')

    return (
      <div className={`image-frame flex items-center justify-center rounded-sm bg-surface-muted px-4 text-center text-xs leading-5 text-muted ${compact ? 'aspect-[5/3]' : 'aspect-[5/3]'}`}>
        {pendingLabel}
      </div>
    )
  }

  const src = proxySrc(rawSrc, compact ? 900 : 1400)
  const isProxiedImage = src.startsWith('/api/image-proxy')

  return (
    <div className={`image-frame rounded-sm bg-surface-muted ${compact ? 'aspect-[5/3]' : 'aspect-[5/3]'}`}>
      <Image
        className="image-zoom h-full w-full"
        src={src}
        alt={item?.name ?? ''}
        width={800}
        height={480}
        loading={eager || !compact ? 'eager' : 'lazy'}
        unoptimized={isProxiedImage}
        style={{ height: '100%', objectFit: compact ? 'cover' : 'contain', width: '100%' }}
      />
    </div>
  )
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-y border-subtle px-2 py-5">
      <h2 className="mb-4 text-lg font-semibold text-primary">{title}</h2>
      {children}
    </div>
  )
}

function ChipList({ items }: { items: string[] }) {
  return <div className="flex flex-wrap gap-x-4 gap-y-1">{items.map(item => <Chip key={item}>{item}</Chip>)}</div>
}

function Chip({ children }: { children: ReactNode }) {
  return <span className="inline-flex min-h-7 items-center border-b border-subtle text-xs font-medium text-muted">{children}</span>
}

function NavButton({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  return (
    <Link className={`inline-flex min-h-11 items-center border-b px-0 text-sm font-semibold transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent ${primary ? 'border-[color:var(--ui-accent)] text-primary' : 'border-default text-secondary'}`} href={href}>
      {children}
    </Link>
  )
}

function ActionButton({ children, onClick, primary = false }: { children: ReactNode; onClick: () => void; primary?: boolean }) {
  return (
    <button
      className={`inline-flex min-h-10 items-center border-b px-0 text-sm font-semibold transition-colors hover:border-[color:var(--ui-accent)] hover:text-accent ${primary ? 'border-[color:var(--ui-accent)] text-primary' : 'border-default text-secondary'}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function NotFound({ copy, prefix }: { copy: Copy; prefix: string }) {
  return (
    <div className="space-y-5">
      <h1 className="heading-display">{copy.noResult}</h1>
      <NavButton href={prefix}>{copy.back}</NavButton>
    </div>
  )
}

function downloadJson(filename: string, data: unknown) {
  downloadText(filename, JSON.stringify(data, null, 2), 'application/json')
}

function downloadText(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function downloadCsv(filename: string, rows: Record<string, string | number | null | undefined>[]) {
  const headers = [
    'issue_id',
    'issue_title',
    'issue_summary',
    'building_types',
    'site_ids',
    'site_names',
    'site_candidate_locations',
    'case_id',
    'case_name',
    'relation_note',
    'case_location',
    'case_concept',
    'case_source_url',
  ]
  const csv = [
    headers.join(','),
    ...rows.map(row => headers.map(header => csvCell(row[header])).join(',')),
  ].join('\n')
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

function buildInspirationBundle(issue: GraduationIssue, sites: GraduationSiteType[], cases: GraduationCase[], lang: GraduationLanguage = 'zh') {
  const guide = issueGuide(issue.id)
  return {
    issue: {
      id: issue.id,
      title: issueTitle(issue, lang),
      summary: issueSummary(issue, lang),
      keywords: issueKeywords(issue, lang),
      recommended_building_types: issueBuildingTypes(issue, lang),
      source_urls: issue.source_urls,
    },
    issue_guide: guide ? {
      social_context: guideText(guide.social_context, lang),
      why_architecture: guideText(guide.why_architecture, lang),
      spatial_problem: guideText(guide.spatial_problem, lang),
      architecture_can_do: guideList(guide.architecture_can_do, lang),
      architecture_cannot_do: guideText(guide.architecture_cannot_do, lang),
      site_clues: guideList(guide.site_clues, lang),
      starter_questions: guideList(guide.starter_questions, lang),
      evidence_urls: guide.evidence_urls,
    } : null,
    site_types: sites.map(site => ({
      id: site.id,
      name: siteName(site, lang),
      address_example: siteAddress(site, lang),
      fit_reason: siteReason(site, lang),
      keywords: siteKeywords(site, lang),
      candidate_locations: siteCandidateLocations(site).map(candidate => ({
        area: candidateField(candidate, 'area', lang),
        name: candidateField(candidate, 'name', lang),
        angle: candidateField(candidate, 'angle', lang),
        source_url: candidate.source_url,
      })),
    })),
    cases: cases.map(item => ({
      id: item.id,
      name: caseName(item, lang),
      location: caseLocation(item, lang),
      concept: caseConcept(item, lang),
      keywords: caseKeywords(item, lang),
      source_url: item.source_url,
      year: item.year,
      architect: item.architect,
    })),
    cases_with_notes: cases.map(item => ({
      case_id: item.id,
      case_name: caseName(item, lang),
      relation_note: issueCaseRelationNote(issue, item, lang),
    })),
    exported_at: new Date().toISOString(),
  }
}

function buildInspirationCsvRows(issue: GraduationIssue, sites: GraduationSiteType[], cases: GraduationCase[], lang: GraduationLanguage = 'zh') {
  const siteIds = sites.map(site => site.id).join('|')
  const siteNames = sites.map(site => siteName(site, lang)).join('|')
  const siteCandidateLocationsText = sites
    .flatMap(site => siteCandidateLocations(site).map(candidate => `${candidateField(candidate, 'area', lang)} ${candidateField(candidate, 'name', lang)}`))
    .join('|')
  const buildingTypes = issueBuildingTypes(issue, lang).join('|')

  return cases.map(item => ({
    issue_id: issue.id,
    issue_title: issueTitle(issue, lang),
    issue_summary: issueSummary(issue, lang),
    building_types: buildingTypes,
    site_ids: siteIds,
    site_names: siteNames,
    site_candidate_locations: siteCandidateLocationsText,
    case_id: item.id,
    case_name: caseName(item, lang),
    relation_note: issueCaseRelationNote(issue, item, lang),
    case_location: caseLocation(item, lang),
    case_concept: caseConcept(item, lang),
    case_source_url: item.source_url,
  }))
}

function csvCell(value: string | number | null | undefined) {
  const text = String(value ?? '')
  const safeText = /^[=+\-@]/.test(text) ? `'${text}` : text
  return `"${safeText.replaceAll('"', '""')}"`
}

function langAware(copy: Copy, zh: string, en: string, ja: string) {
  if (copy.title === labels.en.title) return en
  if (copy.title === labels.ja.title) return ja
  return zh
}

function uniqueSorted(items: string[]) {
  return Array.from(new Set(items.filter(Boolean))).sort(stableStringCompare)
}

function stableStringCompare(a: string, b: string) {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

function compactRankedOptions(
  options: string[],
  counts: Map<string, number>,
  selected: string,
  minCount: number,
  maxOptions: number
) {
  const ranked = uniqueSorted(options)
    .filter(item => (counts.get(item) || 0) >= minCount || item === selected)
    .sort((a, b) => {
      const byCount = (counts.get(b) || 0) - (counts.get(a) || 0)
      return byCount || stableStringCompare(a, b)
    })
  if (selected && !ranked.includes(selected)) ranked.unshift(selected)
  const selectedIndex = ranked.indexOf(selected)
  const clipped = ranked.slice(0, maxOptions)
  if (selected && selectedIndex >= maxOptions) clipped[clipped.length - 1] = selected
  return uniqueSorted(clipped)
}

function countOptions<T>(items: T[], getValues: (item: T) => string[]) {
  const counts = new Map<string, number>()
  items.forEach(item => {
    Array.from(new Set(getValues(item).filter(Boolean))).forEach(value => {
      counts.set(value, (counts.get(value) || 0) + 1)
    })
  })
  return counts
}

function issueMatchesDetailFilters(
  item: GraduationIssue,
  lang: GraduationLanguage,
  filters: { tag?: string; siteType?: string; buildingType?: string }
) {
  return (!filters.tag || filterList(item as unknown as Record<string, unknown>, 'keywords', lang).includes(filters.tag)) &&
    (!filters.siteType || item.recommended_site_types.includes(filters.siteType)) &&
    (!filters.buildingType || issueBuildingTypes(item, lang).includes(filters.buildingType))
}

function subscribeToUrlSearch(onStoreChange: () => void) {
  window.addEventListener('popstate', onStoreChange)
  window.addEventListener('graduation-filter-change', onStoreChange)
  return () => {
    window.removeEventListener('popstate', onStoreChange)
    window.removeEventListener('graduation-filter-change', onStoreChange)
  }
}

function getUrlSearchSnapshot() {
  return window.location.search
}

function getServerUrlSearchSnapshot() {
  return ''
}
