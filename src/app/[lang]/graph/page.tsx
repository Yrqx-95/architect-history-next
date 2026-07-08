import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'
import type { Architect } from '@/lib/types'
import { getArchitects } from '@/lib/data'
import {
  architectKnowledgeRelations, relationText, ArchitectKnowledgeRelation, } from '@/lib/architect-knowledge-relations'
import { t } from '@/lib/i18n'
import { displayName } from '@/lib/display'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: relationMapLabel(lang),
    description: lang === 'en'
      ? 'Architect relationships and lineages in Archistory.'
      : lang === 'ja'
      ? 'Archistory の建築家関係と系譜。'
      : 'Archistory 的建筑师关系与谱系。',
  }
}

type Chain = {
  id: string
  title: Record<'zh' | 'en' | 'ja', string>
  description: Record<'zh' | 'en' | 'ja', string>
  slugs: string[]
}

const chains: Chain[] = [
  {
    id: 'corbusier-japan',
    title: {
      zh: '柯布西耶与日本现代主义',
      en: 'Le Corbusier and Japanese modernism',
      ja: 'ル・コルビュジエと日本モダニズム',
    },
    description: {
      zh: '从工作室经验、公共建筑实践到战后城市思想，观察现代主义如何被转译到日本。',
      en: 'Trace how atelier experience, public institutions, and postwar urbanism translated modernism into Japan.',
      ja: 'アトリエ経験、公共建築、戦後都市論を通して、モダニズムが日本へ翻訳される流れを読む。',
    },
    slugs: ['le-corbusier', 'kunio-maekawa', 'kenzo-tange', 'fumihiko-maki'],
  },
  {
    id: 'organic-modernism',
    title: {
      zh: '有机现代主义的两条分支',
      en: 'Two branches of organic modernism',
      ja: '有機的モダニズムの二つの分岐',
    },
    description: {
      zh: '赖特的有机建筑一方面进入加州住宅实验，另一方面成为阿尔托人文现代主义的重要参照。',
      en: 'Wright’s organic architecture leads both toward California experiments and Aalto’s humane modernism.',
      ja: 'ライトの有機的建築は、カリフォルニア住宅実験とアールトの人間的モダニズムへ分岐する。',
    },
    slugs: ['frank-lloyd-wright', 'john-lautner', 'alvar-aalto'],
  },
  {
    id: 'ando-modernism',
    title: {
      zh: '安藤忠雄的现代主义远源',
      en: 'Tadao Ando’s modernist references',
      ja: '安藤忠雄のモダニズム参照',
    },
    description: {
      zh: '从柯布西耶与路易斯·康的几何、光和纪念性，理解安藤清水混凝土空间的来源。',
      en: 'Read Ando through the geometry, light, and monumentality of Le Corbusier and Louis Kahn.',
      ja: 'ル・コルビュジエとルイス・カーンの幾何、光、記念性から安藤の空間を読む。',
    },
    slugs: ['le-corbusier', 'louis-kahn', 'tadao-ando'],
  },
]

function local<T>(value: Record<'zh' | 'en' | 'ja', T>, lang: string): T {
  return value[lang as 'zh' | 'en' | 'ja'] || value.en
}

function relationKindLabel(kind: ArchitectKnowledgeRelation['kind'], lang: string) {
  const labels: Record<ArchitectKnowledgeRelation['kind'], Record<'zh' | 'en' | 'ja', string>> = {
    studio_mentor: { zh: '工作室师承', en: 'Studio lineage', ja: 'アトリエの系譜' },
    studied_under: { zh: '教育关系', en: 'Educational relation', ja: '教育上の関係' },
    influenced_by: { zh: '影响来源', en: 'Influence', ja: '影響関係' },
    influenced: { zh: '影响对象', en: 'Influence', ja: '影響関係' },
    collaborated_with: { zh: '合作关系', en: 'Collaboration', ja: '協働関係' },
    same_circle: { zh: '同代圈层', en: 'Same circle', ja: '同時代の圏域' },
  }
  return local(labels[kind], lang)
}

export default async function GraphPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const prefix = `/${lang}`
  const architects = await getArchitects()
  const architectBySlug = new Map(architects.map(architect => [architect.slug, architect]))
  const relations = architectKnowledgeRelations
    .map(relation => ({
      relation,
      from: architectBySlug.get(relation.from),
      to: architectBySlug.get(relation.to),
    }))
    .filter(item => item.from && item.to) as Array<{
      relation: ArchitectKnowledgeRelation
      from: Architect
      to: Architect
    }>

  const connectedSlugs = new Set<string>()
  relations.forEach(({ relation }) => {
    connectedSlugs.add(relation.from)
    connectedSlugs.add(relation.to)
  })

  return (
    <PageShell className="!max-w-[86rem]">
      <header className="section border-b border-subtle pb-8 sm:pb-10">
        <div>
          <p className="eyebrow mb-4">{lang === 'en' ? 'Relationship map' : lang === 'ja' ? '関係図' : '关系图'}</p>
          <h1 className="heading-display mb-4">{relationMapLabel(lang)}</h1>
          <p className="body-large max-w-3xl">
            {lang === 'en'
              ? 'This page is not a movement taxonomy. It reads architecture through lineages, influence, collaboration, and shared historical problems.'
              : lang === 'ja'
              ? 'ここは「運動」の分類ではなく、師承、影響、協働、共有された歴史的課題から建築家の関係を読むページです。'
              : '这里不是“建筑运动”的分类，而是从师承、影响、合作和共同历史问题中阅读建筑师之间的关系。'}
          </p>
          <div className="mt-7 grid gap-3 border-y border-subtle py-4 sm:grid-cols-2">
            <GraphMetric value={connectedSlugs.size} label={t(lang, 'architects')} />
            <GraphMetric value={relations.length} label={lang === 'en' ? 'Relations' : lang === 'ja' ? '関係' : '关系'} />
          </div>
        </div>
      </header>

      <Reveal>
        <section className="section pt-8 sm:pt-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2">{lang === 'en' ? 'Lineage paths' : lang === 'ja' ? '系譜ルート' : '谱系路径'}</p>
              <h2 className="heading-3">{lang === 'en' ? 'Three ways through the network' : lang === 'ja' ? '関係をたどる三つの入口' : '进入关系网络的三条路径'}</h2>
            </div>
          </div>
          <div className="grid gap-x-8 gap-y-10 lg:grid-cols-3">
            {chains.map(chain => (
              <section key={chain.id} className="border-t border-subtle pt-4">
                <p className="label mb-3">{lang === 'en' ? 'Lineage path' : lang === 'ja' ? '系譜ルート' : '谱系路径'}</p>
                <h2 className="text-2xl font-medium leading-tight text-primary">{local(chain.title, lang)}</h2>
                <p className="body-sm mt-3 text-secondary">{local(chain.description, lang)}</p>
                <div className="mt-6 divide-y divide-[color:var(--ui-border-subtle)]">
                  {chain.slugs.map((slug, index) => {
                    const architect = architectBySlug.get(slug)
                    if (!architect) return null
                    return (
                      <div key={slug} className="grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-3 py-3">
                        <span className="caption tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                        <Link href={`${prefix}/architect/${slug}`} className="interactive-row text-sm font-medium text-primary transition-colors hover:text-accent">
                          {displayName(architect, lang)}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2">{lang === 'en' ? 'Relationship index' : lang === 'ja' ? '関係索引' : '关系索引'}</p>
              <h2 className="heading-3">{lang === 'en' ? 'Architect to architect' : lang === 'ja' ? '建築家から建築家へ' : '建筑师到建筑师'}</h2>
            </div>
            <p className="caption max-w-md sm:text-right">
              {lang === 'en'
                ? 'Each relation is shown with its direction, historical meaning, and source title.'
                : lang === 'ja'
                ? 'それぞれの関係を、方向、歴史的な意味、出典名とともに読む。'
                : '每条关系都标出方向、历史含义和来源标题。'}
            </p>
          </div>
          <div className="divide-y divide-[color:var(--ui-border-subtle)] border-t border-subtle">
            {relations.map(({ relation, from, to }) => (
              <div key={`${relation.from}-${relation.to}-${relation.kind}`} className="grid gap-4 py-4 lg:grid-cols-[minmax(10rem,0.35fr)_2rem_minmax(10rem,0.35fr)_minmax(0,0.8fr)] lg:items-center">
                <Link href={`${prefix}/architect/${from.slug}`} className="text-lg font-medium leading-snug text-primary hover:text-accent">
                  {displayName(from, lang)}
                </Link>
                <span className="hidden text-center text-soft lg:block">→</span>
                <Link href={`${prefix}/architect/${to.slug}`} className="text-lg font-medium leading-snug text-primary hover:text-accent">
                  {displayName(to, lang)}
                </Link>
                <div>
                  <p className="label mb-2">{relationKindLabel(relation.kind, lang)} · {relationText(relation.label, lang)}</p>
                  <p className="body-sm text-secondary">{relationText(relation.note, lang)}</p>
                  <p className="caption mt-3">{relation.source.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </PageShell>
  )
}

function GraphMetric({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="min-w-0">
      <p className="font-serif-display text-3xl leading-none text-primary">{value}</p>
      <p className="caption mt-2">{label}</p>
    </div>
  )
}

function relationMapLabel(lang: string) {
  if (lang === 'en') return 'Architect Relationships'
  if (lang === 'ja') return '建築家の関係図'
  return '建筑师关系图'
}
