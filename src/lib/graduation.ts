import issuesData from '@/content/graduation/issues.json'
import issueGuidesData from '@/content/graduation/issue-guides.json'
import programsData from '@/content/graduation/programs.json'
import siteTypesData from '@/content/graduation/site-types.json'
import casesData from '@/content/graduation/cases.json'
import briefData from '@/content/graduation/brief.json'

export type GraduationIssue = {
  id: string
  title: string
  title_ja?: string
  title_en?: string
  summary: string
  summary_ja?: string
  summary_en?: string
  keywords: string[]
  keywords_ja?: string[]
  keywords_en?: string[]
  recommended_site_types: string[]
  recommended_building_types: string[]
  recommended_building_types_ja?: string[]
  recommended_building_types_en?: string[]
  reference_case_ids: string[]
  case_relation_notes?: Record<string, string>
  case_relation_notes_ja?: Record<string, string>
  case_relation_notes_en?: Record<string, string>
  source_urls: string[]
  status: 'draft' | 'published'
  updated_at?: string
}

export type GraduationSiteType = {
  id: string
  name: string
  name_ja?: string
  name_en?: string
  address_example: string
  address_example_ja?: string
  address_example_en?: string
  fit_reason: string
  fit_reason_ja?: string
  fit_reason_en?: string
  map_url?: string
  keywords: string[]
  keywords_ja?: string[]
  keywords_en?: string[]
  candidate_locations?: GraduationCandidateLocation[]
  status: 'draft' | 'published'
}

export type GraduationCandidateLocation = {
  area: string
  area_ja?: string
  area_en?: string
  name: string
  name_ja?: string
  name_en?: string
  angle: string
  angle_ja?: string
  angle_en?: string
  source_url?: string
}

export type GraduationCase = {
  id: string
  name: string
  name_ja?: string
  name_en?: string
  location: string
  location_ja?: string
  location_en?: string
  image_url: string
  image_source_url?: string
  image_license?: string
  image_credit?: string
  image_note?: string
  plan_url?: string
  section_url?: string
  concept: string
  concept_ja?: string
  concept_en?: string
  keywords: string[]
  keywords_ja?: string[]
  keywords_en?: string[]
  source_url: string
  year: number | null
  architect?: string
  status: 'draft' | 'published'
}

export type GraduationBrief = {
  markdown: string
  markdown_ja?: string
  markdown_en?: string
}

export type GraduationLocalizedText = {
  zh: string
  ja?: string
  en?: string
}

export type GraduationLocalizedList = {
  zh: string[]
  ja?: string[]
  en?: string[]
}

export type GraduationIssueGuide = {
  issue_id: string
  social_context: GraduationLocalizedText
  why_architecture: GraduationLocalizedText
  spatial_problem: GraduationLocalizedText
  architecture_can_do: GraduationLocalizedList
  architecture_cannot_do: GraduationLocalizedText
  site_clues: GraduationLocalizedList
  starter_questions: GraduationLocalizedList
  evidence_urls: string[]
}

export type GraduationProgram = {
  id: string
  name: string
  name_ja?: string
  name_en?: string
  summary: string
  summary_ja?: string
  summary_en?: string
  keywords: string[]
  keywords_ja?: string[]
  keywords_en?: string[]
  possible_issue_ids: string[]
  site_type_ids: string[]
  reference_case_ids: string[]
  can_address: GraduationLocalizedList
  needs_research: GraduationLocalizedList
  evidence_urls: string[]
}

export const graduationIssues = issuesData as unknown as GraduationIssue[]
export const graduationIssueGuides = issueGuidesData as GraduationIssueGuide[]
export const graduationPrograms = programsData as GraduationProgram[]
export const graduationSiteTypes = siteTypesData as GraduationSiteType[]
export const graduationCases = casesData as GraduationCase[]
export const publicGraduationCases = graduationCases.filter(isPublicGraduationCase)
export const graduationBrief = briefData as GraduationBrief

export function isPublicGraduationCase(item: GraduationCase | undefined): item is GraduationCase {
  return Boolean(
    item &&
    item.status === 'published' &&
    item.image_url &&
    (
      item.image_url === '/images/graduation/case-placeholder.svg' ||
      (item.image_source_url && item.image_license && item.image_credit)
    )
  )
}

export function getGraduationIssue(id: string) {
  return graduationIssues.find(issue => issue.id === id) || null
}

export function getGraduationIssueGuide(issueId: string) {
  return graduationIssueGuides.find(guide => guide.issue_id === issueId) || null
}

export function getGraduationProgram(id: string) {
  return graduationPrograms.find(program => program.id === id) || null
}

export function getGraduationSiteType(id: string) {
  return graduationSiteTypes.find(site => site.id === id) || null
}

export function getGraduationCase(id: string) {
  return graduationCases.find(item => item.id === id) || null
}

export function getGraduationStaticSlugs() {
  return [
    [] as string[],
    ['issues'],
    ['programs'],
    ['sites'],
    ['cases'],
    ['random'],
    ['brief'],
    ['research'],
    ...graduationIssues
      .filter(issue => issue.status === 'published')
      .map(issue => ['issues', issue.id]),
    ...graduationPrograms.map(program => ['programs', program.id]),
    ...graduationSiteTypes
      .filter(site => site.status === 'published')
      .map(site => ['sites', site.id]),
    ...publicGraduationCases.map(item => ['cases', item.id]),
  ]
}
