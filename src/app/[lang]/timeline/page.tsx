import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildings } from '@/lib/data'
import { displayName } from '@/lib/types'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return { title: t(lang, 'timeline'), description: t(lang, 'timelineTitle') }
}

type TimelinePeriod = {
  id: string
  label: Record<'zh' | 'en' | 'ja', string>
  range: [number, number]
  summary: Record<'zh' | 'en' | 'ja', string>
  movements: Record<'zh' | 'en' | 'ja', string[]>
}

const timelinePeriods: TimelinePeriod[] = [
  {
    id: 'classical',
    label: { zh: '古典世界', en: 'Classical World', ja: '古典世界' },
    range: [-800, 476],
    summary: {
      zh: '神庙、柱式、城市公共空间和帝国工程形成西方建筑语言的早期语法。',
      en: 'Temples, orders, civic space, and imperial engineering establish an early grammar for Western architecture.',
      ja: '神殿、オーダー、公共空間、帝国的な土木が西洋建築の初期文法を形づくる。',
    },
    movements: {
      zh: ['古希腊', '古罗马', '柱式系统'],
      en: ['Ancient Greece', 'Ancient Rome', 'Orders'],
      ja: ['古代ギリシア', '古代ローマ', 'オーダー'],
    },
  },
  {
    id: 'medieval',
    label: { zh: '中世纪', en: 'Medieval', ja: '中世' },
    range: [476, 1400],
    summary: {
      zh: '宗教建筑、结构实验和城市工匠体系推动罗曼式、哥特式与拜占庭传统分化。',
      en: 'Religious building, structural experiment, and craft guilds divide Romanesque, Gothic, and Byzantine traditions.',
      ja: '宗教建築、構造実験、職人組織がロマネスク、ゴシック、ビザンティンを分岐させる。',
    },
    movements: {
      zh: ['拜占庭', '罗曼式', '哥特'],
      en: ['Byzantine', 'Romanesque', 'Gothic'],
      ja: ['ビザンティン', 'ロマネスク', 'ゴシック'],
    },
  },
  {
    id: 'renaissance-baroque',
    label: { zh: '文艺复兴到巴洛克', en: 'Renaissance to Baroque', ja: 'ルネサンスからバロックへ' },
    range: [1400, 1750],
    summary: {
      zh: '古典秩序被重新发现，随后被巴洛克转化为戏剧化的空间、轴线与城市景观。',
      en: 'Classical order is rediscovered, then transformed by Baroque space, axis, and urban spectacle.',
      ja: '古典秩序が再発見され、やがてバロックの空間、軸線、都市的演出へ展開する。',
    },
    movements: {
      zh: ['文艺复兴', '帕拉迪奥主义', '巴洛克'],
      en: ['Renaissance', 'Palladianism', 'Baroque'],
      ja: ['ルネサンス', 'パラディオ主義', 'バロック'],
    },
  },
  {
    id: 'industrial-modern',
    label: { zh: '工业革命与现代主义', en: 'Industrial Revolution and Modernism', ja: '産業革命とモダニズム' },
    range: [1750, 1930],
    summary: {
      zh: '钢、玻璃、混凝土、铁路和城市扩张改变建筑问题，现代主义开始把形式、功能与工业生产重新绑定。',
      en: 'Steel, glass, concrete, railways, and urban expansion change the architectural problem and prepare modernism.',
      ja: '鉄、ガラス、コンクリート、鉄道、都市拡張が建築の問題を変え、モダニズムを準備する。',
    },
    movements: {
      zh: ['新古典主义', '工业建筑', '早期现代主义'],
      en: ['Neoclassicism', 'Industrial architecture', 'Early modernism'],
      ja: ['新古典主義', '産業建築', '初期モダニズム'],
    },
  },
  {
    id: 'high-modern',
    label: { zh: '20世纪现代主义', en: '20th-century Modernism', ja: '20世紀モダニズム' },
    range: [1930, 1980],
    summary: {
      zh: '国际风格、战后重建、粗野主义和区域现代主义把建筑变成社会制度、技术和生活方式的实验场。',
      en: 'International Style, reconstruction, Brutalism, and regional modernisms turn architecture into a social and technical laboratory.',
      ja: '国際様式、戦後復興、ブルータリズム、地域的モダニズムが建築を社会と技術の実験場にする。',
    },
    movements: {
      zh: ['国际风格', '粗野主义', '代谢派'],
      en: ['International Style', 'Brutalism', 'Metabolism'],
      ja: ['国際様式', 'ブルータリズム', 'メタボリズム'],
    },
  },
  {
    id: 'contemporary',
    label: { zh: '当代', en: 'Contemporary', ja: '現代' },
    range: [1980, 2030],
    summary: {
      zh: '全球化、数字工具、生态议题和文化身份重新塑造建筑的形式、生产方式与公共责任。',
      en: 'Globalization, digital tools, ecological pressure, and cultural identity reshape form, production, and public responsibility.',
      ja: 'グローバル化、デジタル技術、環境問題、文化的アイデンティティが建築の形と責任を再編する。',
    },
    movements: {
      zh: ['后现代', '高技派', '生态建筑'],
      en: ['Postmodernism', 'High-tech', 'Ecological architecture'],
      ja: ['ポストモダン', 'ハイテック', 'エコロジカル建築'],
    },
  },
]

function localized<T>(value: Record<'zh' | 'en' | 'ja', T>, lang: string): T {
  return value[lang as 'zh' | 'en' | 'ja'] || value.en
}

export default async function TimelinePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const [architects, buildings] = await Promise.all([getArchitects(), getBuildings()])

  const datedBuildings = buildings.filter(building => building.year_start)
  const sortedBldgs = [...datedBuildings].sort((a, b) => (a.year_start || 0) - (b.year_start || 0))
  const architectMap = new Map(architects.map(architect => [architect.slug, architect]))

  const byDecade = new Map<number, typeof buildings>()
  sortedBldgs.forEach(b => {
    const decade = Math.floor((b.year_start || 0) / 10) * 10
    if (!byDecade.has(decade)) byDecade.set(decade, [])
    byDecade.get(decade)!.push(b)
  })

  const decades = [...byDecade.entries()].sort(([a], [b]) => a - b)
  const firstYear = sortedBldgs[0]?.year_start
  const latestYear = sortedBldgs[sortedBldgs.length - 1]?.year_start
  const featuredDecades = decades
    .filter(([, bldgs]) => bldgs.length >= 3)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 4)
  const periodSummaries = timelinePeriods.map(period => {
    const [start, end] = period.range
    const periodBuildings = sortedBldgs.filter(building => {
      const year = building.year_start || 0
      return year >= start && year <= end
    })
    const activeArchitects = architects.filter(architect => {
      const birth = architect.birth_year || 9999
      const death = architect.death_year || latestYear || 2030
      return birth <= end && death >= start
    })
    return {
      ...period,
      buildings: periodBuildings.slice(0, 4),
      buildingCount: periodBuildings.length,
      architects: activeArchitects.slice(0, 4),
      architectCount: activeArchitects.length,
    }
  }).filter(period => period.buildingCount > 0 || period.architectCount > 0)

  return (
    <PageShell className="!max-w-[86rem]">
      <header className="section grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(20rem,0.55fr)] lg:items-end">
        <div>
          <p className="eyebrow mb-4">{lang === 'en' ? 'Timeline system' : lang === 'ja' ? '時間システム' : '时间系统'}</p>
          <h1 className="heading-display mb-4">{t(lang, 'timeline')}</h1>
          <p className="body-large max-w-2xl">
            {lang === 'en'
              ? 'Read architectural history in two ways: a continuous historical narrative, and a dense decade-by-decade atlas.'
              : lang === 'ja'
              ? '連続する歴史の流れと、年代ごとの密度ある索引の二つから建築史を読む。'
              : '用两种方式阅读建筑史：连续的历史叙事，以及按十年组织的密集索引。'}
          </p>
        </div>
        <div className="grid grid-cols-3 overflow-hidden rounded-md border border-subtle bg-surface shadow-semantic-card">
          <TimelineMetric value={decades.length} label={lang === 'en' ? 'decades' : lang === 'ja' ? '年代' : '年代段'} />
          <TimelineMetric value={datedBuildings.length} label={t(lang, 'buildings')} />
          <TimelineMetric value={firstYear && latestYear ? `${firstYear}-${latestYear}` : '—'} label={lang === 'en' ? 'range' : lang === 'ja' ? '範囲' : '范围'} />
        </div>
      </header>

      {featuredDecades.length > 0 && (
        <Reveal>
          <section className="section pt-0">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {featuredDecades.map(([decade, bldgs]) => (
                <a key={decade} href={`#decade-${decade}`} className="group rounded-md border border-subtle bg-surface p-4 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted">
                  <p className="label">{lang === 'en' ? 'high-density decade' : lang === 'ja' ? '高密度の年代' : '高密度年代'}</p>
                  <p className="mt-4 font-serif-display text-4xl leading-none text-primary transition-colors group-hover:text-accent">{decade}s</p>
                  <p className="caption mt-2">{bldgs.length} {t(lang, 'buildings')}</p>
                </a>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <Reveal>
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2">{lang === 'en' ? 'Narrative timeline' : lang === 'ja' ? '叙述の時間軸' : '叙事时间轴'}</p>
              <h2 className="heading-3">{lang === 'en' ? 'How architectural history moves' : lang === 'ja' ? '建築史の流れ' : '建筑史如何推进'}</h2>
            </div>
            <p className="caption max-w-sm sm:text-right">
              {lang === 'en'
                ? 'Use this layer for historical continuity, then jump into the decade atlas below for exact works.'
                : lang === 'ja'
                ? 'まず歴史の連続性を読み、下の年代索引から具体的な作品へ入る。'
                : '先看历史连续性，再进入下方年代索引查具体作品。'}
            </p>
          </div>

          <div className="relative">
            <div className="absolute bottom-0 left-3 top-0 w-px bg-[color:var(--ui-border-subtle)] sm:left-4" />
            <div className="space-y-4">
              {periodSummaries.map(period => (
                <section key={period.id} className="relative grid gap-4 pl-10 sm:pl-14 lg:grid-cols-[minmax(12rem,0.42fr)_minmax(0,1fr)]">
                  <div className="absolute left-[0.45rem] top-2 h-4 w-4 rounded-full border-4 border-[color:var(--ui-bg)] bg-[color:var(--ui-accent)] sm:left-[0.7rem]" />
                  <div className="rounded-md border border-subtle bg-surface p-4 shadow-semantic-card">
                    <p className="metadata mb-3">{period.range[0]}-{period.range[1]}</p>
                    <h3 className="text-xl font-medium leading-snug text-primary">{localized(period.label, lang)}</h3>
                    <p className="body-sm mt-3 text-secondary">{localized(period.summary, lang)}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {localized(period.movements, lang).map(movement => (
                        <span key={movement} className="rounded-full bg-surface-muted px-2.5 py-1 text-[0.68rem] text-secondary">
                          {movement}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-md border border-subtle bg-surface p-4">
                      <p className="label mb-3">{t(lang, 'architects')} · {period.architectCount}</p>
                      <div className="space-y-2">
                        {period.architects.map(architect => (
                          <Link key={architect.id} href={`/${lang}/architect/${architect.slug}`} className="block text-sm font-medium text-primary transition-colors hover:text-accent">
                            {displayName(architect, lang)}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-md border border-subtle bg-surface p-4">
                      <p className="label mb-3">{t(lang, 'buildings')} · {period.buildingCount}</p>
                      <div className="space-y-2">
                        {period.buildings.map(building => (
                          <Link key={building.id} href={`/${lang}/building/${building.slug}`} className="grid grid-cols-[3.2rem_minmax(0,1fr)] gap-3 text-sm transition-colors hover:text-accent">
                            <span className="metadata tabular-nums">{building.year_start}</span>
                            <span className="truncate font-medium text-primary">{displayName(building, lang)}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">{lang === 'en' ? 'Chronology' : lang === 'ja' ? '年代順' : '年代序列'}</p>
              <h2 className="heading-3">{lang === 'en' ? 'Decade index' : lang === 'ja' ? '年代索引' : '年代索引'}</h2>
            </div>
            <p className="caption text-right">{decades.length} {lang === 'en' ? 'active periods' : lang === 'ja' ? '項目' : '有效年代'}</p>
          </div>

          <div className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
          {decades.map(([decade, bldgs], eraIdx) => (
            <Reveal key={decade} delay={eraIdx * 0.05}>
              <section id={`decade-${decade}`} className="w-full scroll-mt-28 rounded-md border border-subtle bg-surface p-4 shadow-semantic-card">
                <div className="mb-5 flex items-end justify-between gap-3 border-b border-subtle pb-4">
                  <h3 className="font-serif-display text-4xl leading-none text-primary">{decade}s</h3>
                  <p className="caption text-right">
                    {bldgs.length} {lang === 'en' ? 'buildings' : lang === 'ja' ? '作品' : '座建筑'}
                  </p>
                </div>

                <div className="divide-y divide-[color:var(--ui-border-subtle)]">
                  {bldgs.slice(0, 7).map(b => {
                    const arch = b.architect_slug ? architectMap.get(b.architect_slug) : null
                    return (
                      <Link key={b.id} href={`/${lang}/building/${b.slug}`}
                        className="group grid grid-cols-[3.25rem_minmax(0,1fr)] gap-3 py-3 transition-colors first:pt-0 last:pb-0 hover:text-accent">
                        <span className="metadata pt-0.5 tabular-nums">{b.year_start}</span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-primary transition-colors group-hover:text-accent">
                            {displayName(b, lang)}
                          </span>
                          <span className="caption mt-1 block truncate">
                            {[arch ? displayName(arch, lang) : '', b.city].filter(Boolean).join(' · ')}
                          </span>
                        </span>
                      </Link>
                    )
                  })}
                  {bldgs.length > 7 && (
                    <p className="caption py-3">+ {bldgs.length - 7} {lang === 'en' ? 'more works in this decade' : lang === 'ja' ? '件の作品' : '个更多作品'}</p>
                  )}
                </div>
              </section>
            </Reveal>
          ))}
        </div>
        </section>
      </Reveal>
    </PageShell>
  )
}

function TimelineMetric({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="border-r border-subtle px-3 py-4 last:border-r-0 sm:px-4">
      <p className="font-serif-display text-2xl leading-none text-primary sm:text-3xl">{value}</p>
      <p className="caption mt-2">{label}</p>
    </div>
  )
}
