import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageShell from '@/components/PageShell'
import GraduationInspirationApp from '@/components/GraduationInspirationApp'
import {
  getGraduationStaticSlugs,
  graduationBrief,
  graduationIssues,
  graduationPrograms,
  graduationSiteTypes,
  publicGraduationCases,
} from '@/lib/graduation'

const GRADUATION_SECTIONS = new Set([
  'issues',
  'programs',
  'sites',
  'cases',
  'random',
  'brief',
  'research',
])

const DETAIL_SECTIONS = new Set(['issues', 'programs', 'sites', 'cases'])

const META = {
  zh: {
    title: '毕业设计灵感库',
    description: '从社会课题、场地类型和建筑案例开始整理毕业设计方向。',
  },
  en: {
    title: 'Graduation Inspiration',
    description: 'Find thesis directions through social issues, site types, and reference projects.',
  },
  ja: {
    title: '卒業設計インスピレーション',
    description: '社会課題、敷地タイプ、参考事例から卒業設計の方向を探す。',
  },
}

function metaFor(lang: string) {
  return META[lang as keyof typeof META] || META.zh
}

export function generateStaticParams() {
  return getGraduationStaticSlugs().map(slug => ({ slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const meta = metaFor(lang)

  return {
    title: meta.title,
    description: meta.description,
  }
}

export default async function GraduationPage({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
  const { lang, slug = [] } = await params
  const [section, id, ...rest] = slug

  if (
    rest.length > 0 ||
    (section && !GRADUATION_SECTIONS.has(section)) ||
    (id && (!section || !DETAIL_SECTIONS.has(section))) ||
    (section === 'issues' && id && !graduationIssues.some(issue => issue.id === id && issue.status === 'published')) ||
    (section === 'programs' && id && !graduationPrograms.some(program => program.id === id)) ||
    (section === 'sites' && id && !graduationSiteTypes.some(site => site.id === id && site.status === 'published')) ||
    (section === 'cases' && id && !publicGraduationCases.some(item => item.id === id))
  ) {
    notFound()
  }

  return (
    <PageShell width="archive">
      <GraduationInspirationApp
        lang={lang}
        slug={slug}
        issues={graduationIssues}
        sites={graduationSiteTypes}
        cases={publicGraduationCases}
        programs={graduationPrograms}
        brief={graduationBrief}
      />
    </PageShell>
  )
}
