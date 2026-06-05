import type { ReactNode } from 'react'

type DiagramKind = 'core' | 'exam' | 'mistake'

type DiagramDefinition = {
  id: string
  kind: DiagramKind
  title: Record<string, string>
  description: Record<string, string>
  render: (id: string) => React.ReactNode
}

const DIAGRAM_KIND_LABELS: Record<string, Record<DiagramKind, string>> = {
  zh: {
    core: '核心概念图',
    exam: '考试解题图',
    mistake: '常见错误图',
  },
  en: {
    core: 'Core Concept',
    exam: 'Exam Solving',
    mistake: 'Common Mistake',
  },
  ja: {
    core: '基本図解',
    exam: '試験解法',
    mistake: 'よくある誤り',
  },
}

const topicDiagrams: Record<string, DiagramDefinition[]> = {
  'road-slant-restriction': [
    {
      id: 'road-slant-core',
      kind: 'core',
      title: {
        zh: '道路斜線制限：从道路反对侧边界线起算',
        en: 'Road Slant Restriction: Measure From the Opposite Road Boundary',
        ja: '道路斜線制限：反対側道路境界線から考える',
      },
      description: {
        zh: '高度 H 由前面道路反対側境界線到建筑物的水平距離 D 与勾配决定。',
        en: 'Height H is read from horizontal distance D and the applicable slope measured from the opposite road boundary.',
        ja: '高さ H は、反対側道路境界線からの水平距離 D と勾配で読む。',
      },
      render: RoadSlantCoreDiagram,
    },
    {
      id: 'road-slant-exam',
      kind: 'exam',
      title: {
        zh: '考试例：4m 道路 + 2m 後退',
        en: 'Exam Example: 4 m Road + 2 m Setback',
        ja: '試験例：4m道路 + 2m後退',
      },
      description: {
        zh: '住居系学习例：D = 4m + 2m，H = 6m × 1.25 = 7.5m。',
        en: 'Residential study example: D = 4 m + 2 m, so H = 6 m × 1.25 = 7.5 m.',
        ja: '住居系の学習例：D = 4m + 2m、H = 6m × 1.25 = 7.5m。',
      },
      render: RoadSlantExamDiagram,
    },
    {
      id: 'road-slant-mistake',
      kind: 'mistake',
      title: {
        zh: '常见错误：从自己道路边界起算',
        en: 'Common Mistake: Starting From the Site-Side Road Boundary',
        ja: 'よくある誤り：自己敷地側から起算する',
      },
      description: {
        zh: '道路斜線不是只从自己基地道路边界或後退距离开始读。',
        en: 'Do not start the road slant line only from the site-side boundary or from setback distance.',
        ja: '自己敷地側の道路境界線や後退距離だけで読まない。',
      },
      render: RoadSlantMistakeDiagram,
    },
  ],
  'north-side-slant-restriction': [
    {
      id: 'north-side-core',
      kind: 'core',
      title: {
        zh: '北側斜線制限：起算高さ + 水平距離 × 1.25',
        en: 'North-Side Slant Restriction: Base Height + Distance × 1.25',
        ja: '北側斜線制限：起算高さ + 水平距離 × 1.25',
      },
      description: {
        zh: '从北側隣地境界線读取水平距離 D，并加上用途地域对应的起算高さ。',
        en: 'Read horizontal distance D from the north-side boundary and add the applicable base height.',
        ja: '北側隣地境界線から水平距離 D を読み、用途地域に応じた起算高さを加える。',
      },
      render: NorthSideCoreDiagram,
    },
    {
      id: 'north-side-exam',
      kind: 'exam',
      title: {
        zh: '考试例：5m 起算与 10m 起算',
        en: 'Exam Example: 5 m and 10 m Base Heights',
        ja: '試験例：5m起算と10m起算',
      },
      description: {
        zh: '同样 D = 4m 时，5m 起算为 10m，10m 起算为 15m。',
        en: 'With D = 4 m, a 5 m base gives 10 m; a 10 m base gives 15 m.',
        ja: 'D = 4m のとき、5m起算は10m、10m起算は15m。',
      },
      render: NorthSideExamDiagram,
    },
    {
      id: 'north-side-mistake',
      kind: 'mistake',
      title: {
        zh: '常见错误：忘记起算高さ或混同日影規制',
        en: 'Common Mistake: Forgetting Base Height or Mixing With Shadow Rules',
        ja: 'よくある誤り：起算高さ忘れ・日影規制との混同',
      },
      description: {
        zh: '北側斜線是几何斜线限制；日影規制是一定时间内的影子影响判断。',
        en: 'North-side slant is a geometric height plane; shadow regulation evaluates time-based shadow impact.',
        ja: '北側斜線は幾何的な斜線制限。日影規制は一定時間の日影をみる規制。',
      },
      render: NorthSideMistakeDiagram,
    },
  ],
  'floor-area-ratio': [
    {
      id: 'floor-area-core',
      kind: 'core',
      title: {
        zh: '容積率：延べ面積与敷地面積的比例',
        en: 'Floor Area Ratio: Total Floor Area Over Site Area',
        ja: '容積率：延べ面積 ÷ 敷地面積',
      },
      description: {
        zh: '容積率看建筑总量，不是直接看建筑占地。',
        en: 'FAR controls total building volume, not the ground footprint.',
        ja: '容積率は建物の総量を見る。地面の占有だけを見る規定ではない。',
      },
      render: FloorAreaCoreDiagram,
    },
    {
      id: 'floor-area-exam',
      kind: 'exam',
      title: {
        zh: '考试例：指定容積率与道路幅員限制取小者',
        en: 'Exam Example: Use the Smaller of Designated FAR and Road-Width Limit',
        ja: '試験例：指定容積率と道路幅員制限の小さい方',
      },
      description: {
        zh: '150㎡ 基地，指定 300%，4m 住居系道路：使用可能容積率 160%，最大延べ面積 240㎡。',
        en: '150 m2 site, designated 300%, 4 m residential road: usable FAR 160%, max total floor area 240 m2.',
        ja: '150㎡敷地、指定300%、4m住居系道路：使用可能容積率160%、最大延べ面積240㎡。',
      },
      render: FloorAreaExamDiagram,
    },
    {
      id: 'floor-area-mistake',
      kind: 'mistake',
      title: {
        zh: '常见错误：只看指定容積率',
        en: 'Common Mistake: Looking Only at Designated FAR',
        ja: 'よくある誤り：指定容積率だけを見る',
      },
      description: {
        zh: '前面道路幅員限制可能把可用容積率压低。',
        en: 'The front road width limit may reduce the usable FAR.',
        ja: '前面道路幅員による制限で、使える容積率が下がることがある。',
      },
      render: FloorAreaMistakeDiagram,
    },
  ],
  'building-coverage-ratio': [
    {
      id: 'building-coverage-core',
      kind: 'core',
      title: {
        zh: '建蔽率：建築面積与敷地面積的比例',
        en: 'Building Coverage Ratio: Footprint Over Site Area',
        ja: '建蔽率：建築面積 ÷ 敷地面積',
      },
      description: {
        zh: '建蔽率看地面被建筑覆盖了多少。',
        en: 'BCR controls how much of the site is covered by the building footprint.',
        ja: '建蔽率は、敷地のうち建物が地面を覆う割合を見る。',
      },
      render: BuildingCoverageCoreDiagram,
    },
    {
      id: 'building-coverage-exam',
      kind: 'exam',
      title: {
        zh: '考试例：角地緩和 +10%',
        en: 'Exam Example: Corner Lot Relief +10%',
        ja: '試験例：角地緩和 +10%',
      },
      description: {
        zh: '150㎡ 基地，指定 60%，角地緩和 +10%：最大建築面積 105㎡。',
        en: '150 m2 site, designated 60%, corner relief +10%: max building footprint 105 m2.',
        ja: '150㎡敷地、指定60%、角地緩和+10%：最大建築面積105㎡。',
      },
      render: BuildingCoverageExamDiagram,
    },
    {
      id: 'building-coverage-mistake',
      kind: 'mistake',
      title: {
        zh: '常见错误：把建築面積看成延べ面積',
        en: 'Common Mistake: Confusing Footprint With Total Floor Area',
        ja: 'よくある誤り：建築面積と延べ面積の混同',
      },
      description: {
        zh: '建蔽率的分子是建築面積，不是各层面积总和。',
        en: 'The numerator of BCR is building footprint, not the sum of all floor areas.',
        ja: '建蔽率の分子は建築面積。各階の合計である延べ面積ではない。',
      },
      render: BuildingCoverageMistakeDiagram,
    },
  ],
}

function textFor(record: Record<string, string>, lang: string) {
  return record[lang] || record.en
}

function kindLabel(kind: DiagramKind, lang: string) {
  return (DIAGRAM_KIND_LABELS[lang] || DIAGRAM_KIND_LABELS.en)[kind]
}

export function hasCodeTopicDiagrams(topicSlug: string) {
  return Boolean(topicDiagrams[topicSlug]?.length)
}

export default function CodeTopicDiagrams({ topicSlug, lang }: { topicSlug: string; lang: string }) {
  const diagrams = topicDiagrams[topicSlug] || []
  if (diagrams.length === 0) return null

  return (
    <div className="space-y-5">
      {diagrams.map(diagram => (
        <figure key={diagram.id} className="diagram-light-theme rounded-md border border-subtle bg-surface-raised p-4 shadow-semantic-card">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="caption">{kindLabel(diagram.kind, lang)}</p>
              <figcaption className="mt-1 text-base font-medium text-primary">{textFor(diagram.title, lang)}</figcaption>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{textFor(diagram.description, lang)}</p>
            </div>
          </div>
          {diagram.render(diagram.id)}
        </figure>
      ))}
    </div>
  )
}

function DiagramSvg({ id, children, height = 260 }: { id: string; children: ReactNode; height?: number }) {
  return (
    <svg
      className="h-auto w-full"
      viewBox={`0 0 360 ${height}`}
      role="img"
      aria-labelledby={`${id}-title`}
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id={`${id}-title`}>{id}</title>
      <rect width="360" height={height} rx="14" fill="var(--ui-surface-muted)" />
      {children}
    </svg>
  )
}

function FormulaPill({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <g>
      <rect x={x} y={y} width="280" height="34" rx="17" fill="var(--ui-surface-raised)" stroke="var(--ui-border)" />
      <text x={x + 140} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ui-text-primary)">{text}</text>
    </g>
  )
}

function RoadSlantCoreDiagram(id: string) {
  return (
    <DiagramSvg id={id} height={285}>
      <defs>
        <marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--ui-accent)" />
        </marker>
        <marker id={`${id}-dim`} markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0 4 L8 0 L8 8 Z" fill="var(--ui-text-secondary)" />
        </marker>
      </defs>
      <rect x="34" y="154" width="112" height="54" fill="#d8cec0" stroke="var(--ui-border)" />
      <rect x="146" y="154" width="178" height="54" fill="#eee9de" stroke="var(--ui-border)" />
      <rect x="146" y="78" width="178" height="76" fill="var(--ui-surface-raised)" stroke="var(--ui-border)" />
      <line x1="34" y1="208" x2="324" y2="208" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="34" y1="154" x2="324" y2="154" stroke="var(--ui-text-primary)" strokeWidth="1.5" />
      <line x1="34" y1="208" x2="34" y2="58" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="34" y1="208" x2="314" y2="74" stroke="var(--ui-accent)" strokeWidth="3" />
      <rect x="230" y="102" width="52" height="52" fill="#efe7dc" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="282" y1="154" x2="282" y2="88" stroke="var(--ui-text-secondary)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="34" y1="226" x2="282" y2="226" stroke="var(--ui-text-secondary)" strokeWidth="1.5" markerStart={`url(#${id}-dim)`} markerEnd={`url(#${id}-arrow)`} />
      <line x1="292" y1="154" x2="292" y2="88" stroke="var(--ui-text-secondary)" strokeWidth="1.5" markerStart={`url(#${id}-dim)`} markerEnd={`url(#${id}-arrow)`} />
      <rect x="40" y="42" width="118" height="20" rx="10" fill="var(--ui-surface-raised)" />
      <text x="99" y="56" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ui-text-primary)">反対側道路境界線</text>
      <rect x="162" y="136" width="42" height="18" rx="9" fill="var(--ui-surface-raised)" />
      <text x="183" y="149" textAnchor="middle" fontSize="12" fill="var(--ui-text-primary)">敷地</text>
      <rect x="54" y="172" width="66" height="18" rx="9" fill="var(--ui-surface-raised)" />
      <text x="87" y="185" textAnchor="middle" fontSize="12" fill="var(--ui-text-secondary)">前面道路</text>
      <text x="256" y="98" textAnchor="middle" fontSize="12" fill="var(--ui-text-primary)">建築物</text>
      <rect x="96" y="232" width="116" height="20" rx="10" fill="var(--ui-surface-raised)" />
      <text x="154" y="246" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ui-text-secondary)">水平距離 D</text>
      <rect x="298" y="108" width="42" height="20" rx="10" fill="var(--ui-surface-raised)" />
      <text x="319" y="122" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ui-text-secondary)">高さ H</text>
      <rect x="210" y="66" width="116" height="20" rx="10" fill="var(--ui-surface-raised)" />
      <text x="268" y="80" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ui-accent)">道路斜線 / 勾配 1.25・1.5</text>
      <FormulaPill x={40} y={18} text="H = D × 勾配" />
    </DiagramSvg>
  )
}

function RoadSlantExamDiagram(id: string) {
  return (
    <DiagramSvg id={id} height={300}>
      <defs>
        <marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--ui-text-secondary)" />
        </marker>
      </defs>
      <rect x="34" y="162" width="90" height="44" fill="#d8cec0" stroke="var(--ui-border)" />
      <rect x="124" y="162" width="72" height="44" fill="#eee9de" stroke="var(--ui-border)" />
      <rect x="196" y="162" width="130" height="44" fill="var(--ui-surface-raised)" stroke="var(--ui-border)" />
      <line x1="34" y1="206" x2="326" y2="206" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="34" y1="162" x2="326" y2="162" stroke="var(--ui-text-primary)" strokeWidth="1.5" />
      <line x1="34" y1="206" x2="34" y2="66" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="34" y1="206" x2="326" y2="84" stroke="var(--ui-accent)" strokeWidth="3" />
      <rect x="196" y="110" width="58" height="52" fill="#efe7dc" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="196" y1="162" x2="196" y2="206" stroke="var(--ui-text-secondary)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="254" y1="162" x2="254" y2="108" stroke="var(--ui-text-secondary)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="34" y1="224" x2="124" y2="224" stroke="var(--ui-text-secondary)" strokeWidth="1.5" markerEnd={`url(#${id}-arrow)`} />
      <line x1="124" y1="242" x2="196" y2="242" stroke="var(--ui-text-secondary)" strokeWidth="1.5" markerEnd={`url(#${id}-arrow)`} />
      <line x1="34" y1="262" x2="196" y2="262" stroke="var(--ui-accent)" strokeWidth="2" markerEnd={`url(#${id}-arrow)`} />
      <text x="79" y="220" textAnchor="middle" fontSize="12" fill="var(--ui-text-secondary)">道路 4m</text>
      <text x="160" y="238" textAnchor="middle" fontSize="12" fill="var(--ui-text-secondary)">後退 2m</text>
      <text x="115" y="280" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ui-accent)">D = 4m + 2m = 6m</text>
      <text x="218" y="104" textAnchor="middle" fontSize="12" fill="var(--ui-text-primary)">建築物</text>
      <text x="264" y="120" fontSize="12" fill="var(--ui-text-secondary)">H = 7.5m</text>
      <text x="178" y="34" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ui-text-primary)">H = 6m × 1.25 = 7.5m</text>
      <text x="178" y="54" textAnchor="middle" fontSize="11" fill="var(--ui-text-muted)">学習例：住居系の簡略計算。正式判断は用途地域・別表第3を確認。</text>
      <text x="80" y="182" textAnchor="middle" fontSize="12" fill="var(--ui-text-secondary)">前面道路</text>
      <text x="224" y="182" textAnchor="middle" fontSize="12" fill="var(--ui-text-secondary)">敷地</text>
    </DiagramSvg>
  )
}

function RoadSlantMistakeDiagram(id: string) {
  return (
    <DiagramSvg id={id} height={285}>
      <rect x="34" y="156" width="112" height="50" fill="#d8cec0" stroke="var(--ui-border)" />
      <rect x="146" y="156" width="178" height="50" fill="var(--ui-surface-raised)" stroke="var(--ui-border)" />
      <line x1="34" y1="206" x2="324" y2="206" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="34" y1="156" x2="324" y2="156" stroke="var(--ui-text-primary)" strokeWidth="1.5" />
      <line x1="34" y1="206" x2="34" y2="62" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="34" y1="206" x2="320" y2="76" stroke="var(--ui-accent)" strokeWidth="3" />
      <line x1="146" y1="206" x2="318" y2="102" stroke="#b84b3a" strokeWidth="3" strokeDasharray="7 5" />
      <rect x="232" y="112" width="52" height="44" fill="#efe7dc" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <rect x="42" y="42" width="118" height="20" rx="10" fill="var(--ui-surface-raised)" />
      <text x="101" y="56" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ui-text-primary)">正：反対側境界線</text>
      <rect x="168" y="96" width="108" height="20" rx="10" fill="var(--ui-surface-raised)" />
      <text x="222" y="110" textAnchor="middle" fontSize="12" fontWeight="700" fill="#b84b3a">誤：自己側から起算</text>
      <text x="80" y="184" textAnchor="middle" fontSize="12" fill="var(--ui-text-secondary)">前面道路</text>
      <text x="218" y="184" textAnchor="middle" fontSize="12" fill="var(--ui-text-secondary)">敷地</text>
      <text x="64" y="232" fontSize="20" fontWeight="800" fill="var(--ui-accent)">OK</text>
      <text x="294" y="128" fontSize="24" fontWeight="800" fill="#b84b3a">×</text>
      <FormulaPill x={40} y={242} text="道路斜線は反対側道路境界線から読む" />
    </DiagramSvg>
  )
}

function NorthSideCoreDiagram(id: string) {
  return (
    <DiagramSvg id={id}>
      <rect x="44" y="54" width="272" height="150" fill="var(--ui-surface-raised)" stroke="var(--ui-border)" />
      <line x1="74" y1="204" x2="74" y2="54" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="74" y1="154" x2="300" y2="86" stroke="var(--ui-accent)" strokeWidth="3" />
      <line x1="74" y1="154" x2="74" y2="204" stroke="var(--ui-accent)" strokeWidth="3" />
      <rect x="198" y="116" width="62" height="88" fill="#efe7dc" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="74" y1="224" x2="198" y2="224" stroke="var(--ui-accent)" strokeWidth="2" />
      <text x="136" y="244" textAnchor="middle" fontSize="12" fill="var(--ui-text-secondary)">水平距離 D</text>
      <text x="84" y="181" fontSize="12" fill="var(--ui-accent)">起算高さ 5m / 10m</text>
      <text x="48" y="48" fontSize="12" fill="var(--ui-text-primary)">北側隣地境界線</text>
      <text x="288" y="72" textAnchor="middle" fontSize="12" fill="var(--ui-accent)">勾配 1.25</text>
      <text x="228" y="112" textAnchor="middle" fontSize="12" fill="var(--ui-text-primary)">建築物</text>
      <text x="296" y="226" fontSize="12" fill="var(--ui-text-primary)">真北</text>
      <path d="M310 210 L310 184 M310 184 L302 196 M310 184 L318 196" stroke="var(--ui-text-primary)" strokeWidth="2" fill="none" />
      <FormulaPill x={40} y={18} text="H = 起算高さ + D × 1.25" />
    </DiagramSvg>
  )
}

function NorthSideExamDiagram(id: string) {
  return (
    <DiagramSvg id={id} height={285}>
      <rect x="28" y="58" width="140" height="176" rx="10" fill="var(--ui-surface-raised)" stroke="var(--ui-border)" />
      <rect x="192" y="58" width="140" height="176" rx="10" fill="var(--ui-surface-raised)" stroke="var(--ui-border)" />
      <line x1="48" y1="202" x2="150" y2="120" stroke="var(--ui-accent)" strokeWidth="3" />
      <line x1="48" y1="202" x2="48" y2="82" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="212" y1="182" x2="314" y2="100" stroke="var(--ui-accent)" strokeWidth="3" />
      <line x1="212" y1="182" x2="212" y2="82" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <rect x="96" y="142" width="40" height="60" fill="#efe7dc" stroke="var(--ui-text-primary)" />
      <rect x="260" y="122" width="40" height="80" fill="#efe7dc" stroke="var(--ui-text-primary)" />
      <text x="98" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ui-text-primary)">低層系</text>
      <text x="262" y="84" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ui-text-primary)">中高層系</text>
      <text x="98" y="108" textAnchor="middle" fontSize="12" fill="var(--ui-accent)">5m + 4m×1.25</text>
      <text x="262" y="108" textAnchor="middle" fontSize="12" fill="var(--ui-accent)">10m + 4m×1.25</text>
      <text x="98" y="224" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ui-text-primary)">H = 10m</text>
      <text x="262" y="224" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ui-text-primary)">H = 15m</text>
      <text x="180" y="258" textAnchor="middle" fontSize="11" fill="var(--ui-text-muted)">D = 4m、勾配 1.25 の学習例。用途地域と現行法条を確認。</text>
    </DiagramSvg>
  )
}

function NorthSideMistakeDiagram(id: string) {
  return (
    <DiagramSvg id={id}>
      <rect x="44" y="56" width="272" height="148" fill="var(--ui-surface-raised)" stroke="var(--ui-border)" />
      <line x1="82" y1="204" x2="82" y2="58" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="82" y1="156" x2="304" y2="86" stroke="var(--ui-accent)" strokeWidth="3" />
      <line x1="82" y1="204" x2="286" y2="122" stroke="#b84b3a" strokeWidth="3" strokeDasharray="7 5" />
      <text x="112" y="144" fontSize="12" fill="#b84b3a">誤：起算高さなし</text>
      <text x="100" y="181" fontSize="12" fill="var(--ui-accent)">正：5m / 10m を加える</text>
      <rect x="214" y="118" width="54" height="86" fill="#efe7dc" stroke="var(--ui-text-primary)" />
      <text x="212" y="76" fontSize="12" fill="var(--ui-text-primary)">北側斜線 = 幾何</text>
      <text x="212" y="94" fontSize="12" fill="var(--ui-text-muted)">日影規制 = 時間の影</text>
      <text x="238" y="136" fontSize="24" fontWeight="800" fill="#b84b3a">×</text>
      <FormulaPill x={40} y={20} text="正：H = 起算高さ + D × 1.25" />
    </DiagramSvg>
  )
}

function FloorAreaCoreDiagram(id: string) {
  return (
    <DiagramSvg id={id}>
      <rect x="48" y="162" width="260" height="54" fill="#d8cec0" stroke="var(--ui-border)" />
      <rect x="126" y="82" width="98" height="80" fill="#efe7dc" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <line x1="126" y1="108" x2="224" y2="108" stroke="var(--ui-text-primary)" />
      <line x1="126" y1="134" x2="224" y2="134" stroke="var(--ui-text-primary)" />
      <text x="175" y="101" textAnchor="middle" fontSize="11" fill="var(--ui-text-primary)">3F</text>
      <text x="175" y="127" textAnchor="middle" fontSize="11" fill="var(--ui-text-primary)">2F</text>
      <text x="175" y="153" textAnchor="middle" fontSize="11" fill="var(--ui-text-primary)">1F</text>
      <text x="260" y="102" fontSize="12" fill="var(--ui-text-secondary)">延べ面積</text>
      <text x="178" y="195" textAnchor="middle" fontSize="12" fill="var(--ui-text-secondary)">敷地面積</text>
      <FormulaPill x={40} y={24} text="容積率 = 延べ面積 ÷ 敷地面積 × 100%" />
    </DiagramSvg>
  )
}

function FloorAreaExamDiagram(id: string) {
  return (
    <DiagramSvg id={id} height={300}>
      <rect x="32" y="54" width="296" height="214" rx="12" fill="var(--ui-surface-raised)" stroke="var(--ui-border)" />
      <text x="54" y="88" fontSize="13" fontWeight="700" fill="var(--ui-text-primary)">1. 指定容積率</text>
      <text x="248" y="88" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ui-text-primary)">300%</text>
      <line x1="52" y1="104" x2="308" y2="104" stroke="var(--ui-border)" />
      <text x="54" y="132" fontSize="13" fontWeight="700" fill="var(--ui-text-primary)">2. 道路幅員制限</text>
      <text x="248" y="132" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ui-accent)">4m × 4/10 = 160%</text>
      <line x1="52" y1="148" x2="308" y2="148" stroke="var(--ui-border)" />
      <text x="54" y="176" fontSize="13" fontWeight="700" fill="var(--ui-text-primary)">3. 小さい方</text>
      <text x="248" y="176" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ui-accent)">min(300%,160%) = 160%</text>
      <line x1="52" y1="192" x2="308" y2="192" stroke="var(--ui-border)" />
      <text x="54" y="220" fontSize="13" fontWeight="700" fill="var(--ui-text-primary)">4. 最大延べ面積</text>
      <text x="248" y="220" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ui-text-primary)">150㎡ × 160% = 240㎡</text>
      <text x="180" y="252" textAnchor="middle" fontSize="11" fill="var(--ui-text-muted)">住居系の学習例。正式判断は用途地域・道路条件を確認。</text>
    </DiagramSvg>
  )
}

function FloorAreaMistakeDiagram(id: string) {
  return (
    <DiagramSvg id={id}>
      <rect x="42" y="60" width="276" height="164" rx="12" fill="var(--ui-surface-raised)" stroke="var(--ui-border)" />
      <text x="62" y="94" fontSize="13" fontWeight="700" fill="#b84b3a">誤：指定容積率だけ</text>
      <text x="62" y="120" fontSize="18" fontWeight="800" fill="#b84b3a">150㎡ × 300% = 450㎡</text>
      <text x="290" y="118" textAnchor="middle" fontSize="28" fontWeight="800" fill="#b84b3a">×</text>
      <line x1="62" y1="146" x2="298" y2="146" stroke="var(--ui-border)" />
      <text x="62" y="174" fontSize="13" fontWeight="700" fill="var(--ui-text-primary)">正：道路幅員制限も比較</text>
      <text x="62" y="200" fontSize="17" fontWeight="800" fill="var(--ui-accent)">min(300%, 160%) → 240㎡</text>
      <text x="180" y="242" textAnchor="middle" fontSize="11" fill="var(--ui-text-muted)">容積率は「指定」だけでなく「前面道路幅員」も確認。</text>
    </DiagramSvg>
  )
}

function BuildingCoverageCoreDiagram(id: string) {
  return (
    <DiagramSvg id={id}>
      <rect x="54" y="62" width="252" height="164" fill="#d8cec0" stroke="var(--ui-border)" />
      <rect x="116" y="104" width="110" height="78" fill="#efe7dc" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <text x="171" y="146" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ui-text-primary)">建築面積</text>
      <text x="180" y="212" textAnchor="middle" fontSize="12" fill="var(--ui-text-secondary)">敷地面積</text>
      <text x="72" y="92" fontSize="12" fill="var(--ui-text-muted)">空地</text>
      <FormulaPill x={40} y={22} text="建蔽率 = 建築面積 ÷ 敷地面積 × 100%" />
    </DiagramSvg>
  )
}

function BuildingCoverageExamDiagram(id: string) {
  return (
    <DiagramSvg id={id} height={285}>
      <rect x="54" y="66" width="252" height="150" fill="#d8cec0" stroke="var(--ui-border)" />
      <rect x="54" y="66" width="48" height="38" fill="#cbbca9" stroke="var(--ui-border)" />
      <rect x="142" y="108" width="112" height="82" fill="#efe7dc" stroke="var(--ui-text-primary)" strokeWidth="2" />
      <text x="197" y="151" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ui-text-primary)">105㎡</text>
      <text x="72" y="54" fontSize="12" fill="var(--ui-text-primary)">角地</text>
      <text x="180" y="238" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ui-accent)">60% + 10% = 70%</text>
      <text x="180" y="260" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ui-text-primary)">150㎡ × 70% = 105㎡</text>
      <FormulaPill x={40} y={18} text="可用建蔽率 → 最大建築面積" />
    </DiagramSvg>
  )
}

function BuildingCoverageMistakeDiagram(id: string) {
  return (
    <DiagramSvg id={id}>
      <rect x="54" y="70" width="252" height="148" fill="#d8cec0" stroke="var(--ui-border)" />
      <rect x="100" y="106" width="72" height="64" fill="#efe7dc" stroke="var(--ui-text-primary)" />
      <rect x="196" y="92" width="72" height="92" fill="#efe7dc" stroke="#b84b3a" strokeWidth="2" />
      <line x1="196" y1="122" x2="268" y2="122" stroke="#b84b3a" />
      <line x1="196" y1="152" x2="268" y2="152" stroke="#b84b3a" />
      <text x="136" y="188" textAnchor="middle" fontSize="12" fill="var(--ui-text-primary)">建築面積</text>
      <text x="232" y="188" textAnchor="middle" fontSize="12" fill="#b84b3a">延べ面積</text>
      <text x="232" y="84" textAnchor="middle" fontSize="22" fontWeight="800" fill="#b84b3a">×</text>
      <text x="180" y="44" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ui-text-primary)">建蔽率の分子は建築面積</text>
      <text x="180" y="242" textAnchor="middle" fontSize="11" fill="var(--ui-text-muted)">延べ面積は容積率で使う。建蔽率では使わない。</text>
    </DiagramSvg>
  )
}
