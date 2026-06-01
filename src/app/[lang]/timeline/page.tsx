import Link from 'next/link'
import type { Metadata } from 'next'
import { t } from '@/lib/i18n'
import { getArchitects, getBuildings } from '@/lib/data'
import { displayName } from '@/lib/types'
import PageShell from '@/components/PageShell'
import Reveal from '@/components/Reveal'
import TimelineRail from '@/components/TimelineRail'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return { title: t(lang, 'timeline'), description: t(lang, 'timelineTitle') }
}

type TimelinePeriod = {
  id: string
  label: Record<'zh' | 'en' | 'ja', string>
  range: [number, number]
  question: Record<'zh' | 'en' | 'ja', string>
  summary: Record<'zh' | 'en' | 'ja', string>
  transition: Record<'zh' | 'en' | 'ja', string>
  movements: Record<'zh' | 'en' | 'ja', string[]>
}

const timelinePeriods: TimelinePeriod[] = [
  {
    id: 'classical',
    label: { zh: '古典世界', en: 'Classical World', ja: '古典世界' },
    range: [-800, 476],
    question: {
      zh: '建筑如何把神、城邦和帝国秩序变成可建造的形式？',
      en: 'How can architecture turn gods, civic life, and empire into buildable form?',
      ja: '建築は神、都市国家、帝国秩序をどのように建てられる形式へ変えたのか。',
    },
    summary: {
      zh: '神庙、柱式、城市公共空间和帝国工程形成西方建筑语言的早期语法。',
      en: 'Temples, orders, civic space, and imperial engineering establish an early grammar for Western architecture.',
      ja: '神殿、オーダー、公共空間、帝国的な土木が西洋建築の初期文法を形づくる。',
    },
    transition: {
      zh: '罗马帝国瓦解后，建筑重心从帝国公共工程转向宗教共同体、修道院和城市工匠体系。',
      en: 'After Rome fragments, architectural energy shifts from imperial public works toward religious communities, monasteries, and urban craft.',
      ja: 'ローマ帝国の分裂後、建築の重心は帝国的公共事業から宗教共同体、修道院、都市の職人組織へ移る。',
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
    question: {
      zh: '建筑如何组织信仰、朝圣、结构高度与城市工匠协作？',
      en: 'How does architecture organize faith, pilgrimage, height, and craft collaboration?',
      ja: '建築は信仰、巡礼、高さ、職人の協働をどのように組織したのか。',
    },
    summary: {
      zh: '宗教建筑、结构实验和城市工匠体系推动罗曼式、哥特式与拜占庭传统分化。',
      en: 'Religious building, structural experiment, and craft guilds divide Romanesque, Gothic, and Byzantine traditions.',
      ja: '宗教建築、構造実験、職人組織がロマネスク、ゴシック、ビザンティンを分岐させる。',
    },
    transition: {
      zh: '古典文献、透视法和人文主义重新进入建筑训练，建筑师从匿名工匠逐渐变成有理论身份的作者。',
      en: 'Classical texts, perspective, and humanism re-enter architectural training, turning the architect from anonymous maker into theoretical author.',
      ja: '古典文献、遠近法、人文主義が建築教育へ戻り、建築家は匿名の職人から理論を持つ作者へ変わっていく。',
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
    question: {
      zh: '建筑如何在理性比例、权力展示和城市舞台之间取得平衡？',
      en: 'How does architecture balance rational proportion, power, and urban spectacle?',
      ja: '建築は合理的比例、権力の表象、都市的演出をどう調停したのか。',
    },
    summary: {
      zh: '古典秩序被重新发现，随后被巴洛克转化为戏剧化的空间、轴线与城市景观。',
      en: 'Classical order is rediscovered, then transformed by Baroque space, axis, and urban spectacle.',
      ja: '古典秩序が再発見され、やがてバロックの空間、軸線、都市的演出へ展開する。',
    },
    transition: {
      zh: '工业化、殖民贸易和新材料让建筑不再只服务宫廷与教会，也开始回应工厂、车站、博览会和现代城市。',
      en: 'Industrialization, colonial trade, and new materials move architecture beyond court and church toward factories, stations, exhibitions, and modern cities.',
      ja: '産業化、植民地貿易、新素材により、建築は宮廷と教会だけでなく工場、駅、博覧会、近代都市へ向かう。',
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
    question: {
      zh: '当钢、玻璃、混凝土和大众城市出现后，建筑还应不应该模仿历史？',
      en: 'When steel, glass, concrete, and mass cities arrive, should architecture still imitate history?',
      ja: '鉄、ガラス、コンクリート、大衆都市が現れたとき、建築はなお歴史を模倣すべきなのか。',
    },
    summary: {
      zh: '钢、玻璃、混凝土、铁路和城市扩张改变建筑问题，现代主义开始把形式、功能与工业生产重新绑定。',
      en: 'Steel, glass, concrete, railways, and urban expansion change the architectural problem and prepare modernism.',
      ja: '鉄、ガラス、コンクリート、鉄道、都市拡張が建築の問題を変え、モダニズムを準備する。',
    },
    transition: {
      zh: '两次世界大战、住房危机和国际交流使现代主义从少数实验变成全球制度性语言。',
      en: 'World wars, housing crises, and international exchange turn modernism from scattered experiment into a global institutional language.',
      ja: '世界大戦、住宅危機、国際交流により、モダニズムは個別の実験から世界的な制度言語へ変わる。',
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
    question: {
      zh: '建筑能否通过标准化、结构诚实和城市规划重建社会生活？',
      en: 'Can architecture rebuild social life through standardization, structural honesty, and planning?',
      ja: '建築は標準化、構造の誠実さ、都市計画によって社会生活を再建できるのか。',
    },
    summary: {
      zh: '国际风格、战后重建、粗野主义和区域现代主义把建筑变成社会制度、技术和生活方式的实验场。',
      en: 'International Style, reconstruction, Brutalism, and regional modernisms turn architecture into a social and technical laboratory.',
      ja: '国際様式、戦後復興、ブルータリズム、地域的モダニズムが建築を社会と技術の実験場にする。',
    },
    transition: {
      zh: '现代主义的普遍主义受到批评后，建筑转向历史记忆、地域身份、消费文化、数字技术和生态责任。',
      en: 'As modernism’s universal claims are challenged, architecture turns toward memory, local identity, consumer culture, digital tools, and ecology.',
      ja: 'モダニズムの普遍主義が批判され、建築は記憶、地域性、消費文化、デジタル技術、環境責任へ向かう。',
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
    question: {
      zh: '在全球化与气候危机中，建筑如何同时回应图像、数据、地方性和公共责任？',
      en: 'In globalization and climate crisis, how can architecture respond to image, data, locality, and public responsibility at once?',
      ja: 'グローバル化と気候危機の中で、建築はイメージ、データ、地域性、公共責任にどう同時に応えるのか。',
    },
    summary: {
      zh: '全球化、数字工具、生态议题和文化身份重新塑造建筑的形式、生产方式与公共责任。',
      en: 'Globalization, digital tools, ecological pressure, and cultural identity reshape form, production, and public responsibility.',
      ja: 'グローバル化、デジタル技術、環境問題、文化的アイデンティティが建築の形と責任を再編する。',
    },
    transition: {
      zh: '当代不是终点，而是知识网络持续增长的现场：建筑师、作品、地区和议题仍在互相改写。',
      en: 'The contemporary is not an endpoint but a living network where architects, works, regions, and problems keep rewriting one another.',
      ja: '現代は終点ではなく、建築家、作品、地域、課題が互いを書き換え続ける生きたネットワークである。',
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
  const railItems = decades.map(([decade, bldgs]) => ({
    id: `${decade}`,
    href: `#decade-${decade}`,
    label: `${decade}s`,
    meta: `${bldgs.length} ${lang === 'en' ? 'works' : lang === 'ja' ? '作品' : '作品'}`,
  }))
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

      {railItems.length > 0 && (
        <Reveal>
          <TimelineRail
            title={lang === 'en' ? 'Time navigator' : lang === 'ja' ? '時間ナビゲーター' : '时间导航'}
            description={
              lang === 'en'
                ? 'Drag the rail to scan active decades, then jump directly to the works in that period.'
                : lang === 'ja'
                ? '横にドラッグして年代を眺め、その時期の作品へ直接移動する。'
                : '横向拖动浏览有效年代，并直接跳到对应时期的作品。'
            }
            items={railItems}
          />
        </Reveal>
      )}

      <Reveal>
        <section className="section border-t border-subtle pt-10 sm:pt-12">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-2">{lang === 'en' ? 'Historical chain' : lang === 'ja' ? '歴史の連鎖' : '历史链条'}</p>
              <h2 className="heading-3">{lang === 'en' ? 'Why one period becomes the next' : lang === 'ja' ? '時代はなぜ次へ移るのか' : '时代为什么会进入下一段'}</h2>
            </div>
            <p className="caption max-w-sm sm:text-right">
              {lang === 'en'
                ? 'Each period is framed as a historical question and a transition, so the timeline reads as a chain of problems.'
                : lang === 'ja'
                ? '各時代を問いと移行として読み、時間軸を問題の連鎖として捉える。'
                : '把每个时代读成一个问题和一次转向，让时间轴成为问题链，而不是年份表。'}
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {periodSummaries.map((period, index) => (
              <a
                key={period.id}
                href={`#period-${period.id}`}
                className="group rounded-md border border-subtle bg-surface p-4 shadow-semantic-card transition-colors hover:border-default hover:bg-surface-muted"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="metadata mb-2">{period.range[0]}-{period.range[1]}</p>
                    <h3 className="text-lg font-medium leading-snug text-primary transition-colors group-hover:text-accent">
                      {localized(period.label, lang)}
                    </h3>
                  </div>
                  <span className="font-serif-display text-3xl leading-none text-soft">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="body-sm font-medium text-primary">{localized(period.question, lang)}</p>
                <p className="caption mt-3 border-t border-subtle pt-3">{localized(period.transition, lang)}</p>
              </a>
            ))}
          </div>
        </section>
      </Reveal>

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
                <section id={`period-${period.id}`} key={period.id} className="relative grid scroll-mt-28 gap-4 pl-10 sm:pl-14 lg:grid-cols-[minmax(12rem,0.42fr)_minmax(0,1fr)]">
                  <div className="absolute left-[0.45rem] top-2 h-4 w-4 rounded-full border-4 border-[color:var(--ui-bg)] bg-[color:var(--ui-accent)] sm:left-[0.7rem]" />
                  <div className="rounded-md border border-subtle bg-surface p-4 shadow-semantic-card">
                    <p className="metadata mb-3">{period.range[0]}-{period.range[1]}</p>
                    <h3 className="text-xl font-medium leading-snug text-primary">{localized(period.label, lang)}</h3>
                    <p className="body-sm mt-3 font-medium text-primary">{localized(period.question, lang)}</p>
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
