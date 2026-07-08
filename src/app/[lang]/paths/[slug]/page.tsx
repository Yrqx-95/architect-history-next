import type { Metadata } from 'next'
import Link from 'next/link'
import type { Architect, Building, Era, Style } from '@/lib/types'
import { notFound } from 'next/navigation'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'
import { getArchitects, getBuildings, getEras, getStyles } from '@/lib/data'
import { learningPaths, localizedPathText, LearningPathKind } from '@/lib/learning-paths'
import { displayName } from '@/lib/display'

const LANGS = ['zh', 'en', 'ja'] as const

export function generateStaticParams() {
  return LANGS.flatMap(lang => learningPaths.map(path => ({ lang, slug: path.slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  const path = learningPaths.find(item => item.slug === slug)
  if (!path) return { title: 'Archive route' }
  return {
    title: localizedPathText(path.title, lang),
    description: localizedPathText(path.subtitle, lang),
  }
}

const kindLabel = {
  architect: { zh: '建筑师', en: 'Architect', ja: '建築家' },
  building: { zh: '建筑', en: 'Building', ja: '建築' },
  style: { zh: '风格', en: 'Style', ja: '様式' },
  era: { zh: '时代', en: 'Period', ja: '時代' },
}

function label(kind: LearningPathKind, lang: string) {
  const item = kindLabel[kind]
  return item[lang as keyof typeof item] || item.en
}

function hrefFor(prefix: string, kind: LearningPathKind, slug: string) {
  if (kind === 'architect') return `${prefix}/architect/${slug}`
  if (kind === 'building') return `${prefix}/building/${slug}`
  if (kind === 'style') return `${prefix}/browse/style/${slug}`
  return `${prefix}/browse/era/${slug}`
}

export default async function LearningPathDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  const path = learningPaths.find(item => item.slug === slug)
  if (!path) notFound()

  const prefix = `/${lang}`
  const [architects, buildings, styles, eras] = await Promise.all([getArchitects(), getBuildings(), getStyles(), getEras()])
  const entityMaps = {
    architect: new Map(architects.map(item => [item.slug, item] as const)),
    building: new Map(buildings.map(item => [item.slug, item] as const)),
    style: new Map(styles.map(item => [item.slug, item] as const)),
    era: new Map(eras.map(item => [item.slug, item] as const)),
  }

  const resolvedSteps = path.steps.map((step, index) => {
    const entity = entityMaps[step.kind].get(step.slug) as Architect | Building | Style | Era | undefined
    return {
      ...step,
      index: index + 1,
      title: entity ? displayName(entity, lang) : step.slug,
      exists: Boolean(entity),
    }
  }).filter(step => step.exists)

  return (
    <PageShell>
      <header className="section">
        <Link href={`${prefix}/paths`} className="caption mb-6 inline-block text-secondary underline-offset-4 hover:text-primary hover:underline">
          {lang === 'en' ? 'All archive routes' : lang === 'ja' ? 'すべての資料ルート' : '全部档案路线'}
        </Link>
        <p className="eyebrow mb-4">{lang === 'en' ? 'Archive route' : lang === 'ja' ? '資料ルート' : '档案路线'}</p>
        <h1 className="heading-display mb-5 max-w-4xl">{localizedPathText(path.title, lang)}</h1>
        <p className="body-large max-w-3xl">{localizedPathText(path.description, lang)}</p>
      </header>

      <Reveal>
        <section className="section pt-0">
          <div className="border-y border-subtle">
            {resolvedSteps.map(step => (
              <Link
                key={`${step.kind}-${step.slug}`}
                href={hrefFor(prefix, step.kind, step.slug)}
                className="interactive-row group grid gap-4 border-b border-subtle px-2 py-5 last:border-b-0 sm:grid-cols-[5rem_minmax(0,1fr)_8rem] sm:items-start"
              >
                <div className="font-serif-display text-4xl leading-none text-primary/70">{String(step.index).padStart(2, '0')}</div>
                <div>
                  <p className="label mb-3">{label(step.kind, lang)}</p>
                  <h2 className="text-2xl font-semibold leading-tight text-primary group-hover:text-secondary">{step.title}</h2>
                  <p className="mt-4 body-small text-secondary">{localizedPathText(step.note, lang)}</p>
                </div>
                <span className="caption justify-self-start border-b border-subtle pb-1 text-secondary transition-colors group-hover:border-default group-hover:text-primary sm:justify-self-end">
                  {lang === 'en' ? 'Open' : lang === 'ja' ? '開く' : '打开'}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>
    </PageShell>
  )
}
