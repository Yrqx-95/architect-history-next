import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import type { Architect, Building, Era, Style } from '@/lib/types'
import { getArchitects, getBuildings, getEras, getStyles } from '@/lib/data'
import { t } from '@/lib/i18n'
import { learningPaths, localizedPathText, LearningPathKind } from '@/lib/learning-paths'
import { displayName } from '@/lib/display'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: t(lang, 'paths'),
    description: lang === 'en'
      ? 'Curated archive routes through Archistory across architects, buildings, periods, and styles.'
      : lang === 'ja'
      ? '建築家、作品、時代、様式をつなぐ Archistory の資料ルート。'
      : '连接建筑师、作品、时代与风格的 Archistory 档案路线。',
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

export default async function LearningPathsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const prefix = `/${lang}`
  const [architects, buildings, styles, eras] = await Promise.all([getArchitects(), getBuildings(), getStyles(), getEras()])
  const entityMaps = {
    architect: new Map(architects.map(item => [item.slug, item] as const)),
    building: new Map(buildings.map(item => [item.slug, item] as const)),
    style: new Map(styles.map(item => [item.slug, item] as const)),
    era: new Map(eras.map(item => [item.slug, item] as const)),
  }

  const nameFor = (kind: LearningPathKind, slug: string) => {
    const item = entityMaps[kind].get(slug) as Architect | Building | Style | Era | undefined
    return item ? displayName(item, lang) : slug
  }

  return (
    <PageShell className="!max-w-[86rem]">
      <header className="section">
        <p className="eyebrow mb-4">{lang === 'en' ? 'Archive routes' : lang === 'ja' ? '資料ルート' : '档案路线'}</p>
        <h1 className="heading-display mb-4">{t(lang, 'paths')}</h1>
        <p className="body-large max-w-3xl">
          {lang === 'en'
            ? 'Open a curated sequence when you want the archive to suggest one possible order.'
            : lang === 'ja'
            ? 'アーカイブ側がひとつの閲覧順序を示す、補助的な資料ルートです。'
            : '当你希望资料馆给出一个参考顺序时，可以打开这些策划路线。'}
        </p>
      </header>

      <Reveal>
        <section className="section pt-0">
          <div className="grid gap-x-8 gap-y-0 md:grid-cols-3">
            {learningPaths.map(path => (
              <Link
                key={path.slug}
                href={`${prefix}/paths/${path.slug}`}
                className="interactive-row group flex min-h-[16rem] flex-col border-t border-subtle px-2 py-5"
              >
                <p className="label mb-4">{path.steps.length} {lang === 'en' ? 'steps' : lang === 'ja' ? 'ステップ' : '个节点'}</p>
                <h2 className="max-w-sm text-2xl font-semibold leading-tight text-primary group-hover:text-secondary">
                  {localizedPathText(path.title, lang)}
                </h2>
                <p className="mt-3 body-small text-secondary">{localizedPathText(path.subtitle, lang)}</p>
                <div className="mt-auto space-y-2 border-t border-subtle pt-5">
                  {path.steps.slice(0, 4).map(step => (
                    <div key={`${step.kind}-${step.slug}`} className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-primary">{nameFor(step.kind, step.slug)}</span>
                      <span className="caption shrink-0">{label(step.kind, lang)}</span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section border-t border-subtle">
          <SectionHeading
            title={lang === 'en' ? 'How to read' : lang === 'ja' ? '読み方' : '如何阅读'}
            description={lang === 'en'
              ? 'Each route is optional. Open any step to continue into its architect, building, style, or period page.'
              : lang === 'ja'
              ? '各ルートは任意の入口です。各ステップから建築家、作品、様式、時代のページへ進めます。'
              : '每条路线都只是可选入口。点开任意节点，就能继续进入对应的建筑师、建筑、风格或时代页面。'}
          />
        </section>
      </Reveal>
    </PageShell>
  )
}
