import type { Architect, Lang } from '@/lib/types'

export type ArchitectRelationKind =
  | 'studio_mentor'
  | 'studied_under'
  | 'influenced_by'
  | 'influenced'
  | 'collaborated_with'
  | 'same_circle'

export type LocalizedString = Record<Lang, string>

export type ArchitectKnowledgeRelation = {
  from: string
  to: string
  kind: ArchitectRelationKind
  label: LocalizedString
  note: LocalizedString
  source: {
    title: string
    url?: string
  }
}

export type ResolvedArchitectKnowledgeRelation = ArchitectKnowledgeRelation & {
  direction: 'outgoing' | 'incoming'
  architect: Architect
}

export const architectKnowledgeRelations: ArchitectKnowledgeRelation[] = [
  {
    from: 'le-corbusier',
    to: 'kunio-maekawa',
    kind: 'studio_mentor',
    label: { zh: '工作室师承', en: 'Studio lineage', ja: 'アトリエの系譜' },
    note: {
      zh: '前川国男在柯布西耶工作室学习，成为日本现代主义接受与转译的重要中介。',
      en: 'Maekawa worked in Le Corbusier’s atelier, becoming a key mediator of modernism in Japan.',
      ja: '前川國男はル・コルビュジエのアトリエで学び、日本におけるモダニズム受容の重要な媒介となった。',
    },
    source: { title: 'National Museum of Western Art / Le Corbusier and Japanese modernism' },
  },
  {
    from: 'le-corbusier',
    to: 'junzo-sakakura',
    kind: 'studio_mentor',
    label: { zh: '工作室师承', en: 'Studio lineage', ja: 'アトリエの系譜' },
    note: {
      zh: '坂仓准三曾在柯布西耶事务所工作，把现代主义空间方法带回日本公共建筑实践。',
      en: 'Sakakura worked in Le Corbusier’s office and translated modernist spatial methods into Japanese public architecture.',
      ja: '坂倉準三はル・コルビュジエ事務所で働き、モダニズムの空間的方法を日本の公共建築へ翻訳した。',
    },
    source: { title: 'Architectural history consensus / office lineage' },
  },
  {
    from: 'kunio-maekawa',
    to: 'kenzo-tange',
    kind: 'studio_mentor',
    label: { zh: '师承与工作经历', en: 'Mentorship and office experience', ja: '師承と実務経験' },
    note: {
      zh: '丹下健三早年进入前川国男事务所，前川成为战后日本现代主义谱系中的关键前辈。',
      en: 'Tange’s early office experience with Maekawa made Maekawa a crucial predecessor in postwar Japanese modernism.',
      ja: '丹下健三は若い時期に前川國男の事務所に入り、前川は戦後日本モダニズムの重要な先行者となった。',
    },
    source: { title: 'Postwar Japanese modernism lineage' },
  },
  {
    from: 'kenzo-tange',
    to: 'fumihiko-maki',
    kind: 'influenced',
    label: { zh: '战后城市思想影响', en: 'Postwar urban influence', ja: '戦後都市思想の影響' },
    note: {
      zh: '槙文彦与丹下之后的日本城市建筑讨论相连，但他把巨构想象转化为更细腻的集合形态理论。',
      en: 'Maki belongs to the post-Tange debate on Japanese urbanism, redirecting megastructural thinking toward collective form.',
      ja: '槇文彦は丹下以後の日本都市論に連なり、メガストラクチャー的思考を集合形態へと展開した。',
    },
    source: { title: 'Metabolism 1960 and Collective Form discourse' },
  },
  {
    from: 'marcel-breuer',
    to: 'yoshinobu-ashihara',
    kind: 'studied_under',
    label: { zh: '教育关系', en: 'Educational relation', ja: '教育上の関係' },
    note: {
      zh: '芦原义信在哈佛学习期间受到布劳耶的现代主义训练，后来转向日本空间关系与城市界面的理论化。',
      en: 'Ashihara’s Harvard training under Breuer gave him a modernist basis that he later reworked through Japanese spatial theory.',
      ja: '芦原義信はハーバードでブロイヤーのモダニズム教育を受け、その後日本的な空間関係の理論へ展開した。',
    },
    source: { title: 'Harvard GSD / Ashihara biography' },
  },
  {
    from: 'frank-lloyd-wright',
    to: 'john-lautner',
    kind: 'studio_mentor',
    label: { zh: '塔里埃森谱系', en: 'Taliesin lineage', ja: 'タリアセンの系譜' },
    note: {
      zh: '劳特纳来自赖特的塔里埃森体系，并把有机建筑推向加州住宅的结构冒险。',
      en: 'Lautner emerged from Wright’s Taliesin circle and pushed organic architecture toward structural experiment in California houses.',
      ja: 'ラウトナーはライトのタリアセンから出発し、有機的建築をカリフォルニア住宅の構造的冒険へ押し広げた。',
    },
    source: { title: 'Taliesin Fellowship lineage' },
  },
  {
    from: 'frank-lloyd-wright',
    to: 'alvar-aalto',
    kind: 'influenced_by',
    label: { zh: '有机建筑影响', en: 'Organic architecture influence', ja: '有機的建築の影響' },
    note: {
      zh: '赖特的有机建筑为阿尔托的人文现代主义提供了重要参照，但阿尔托把它转化为北欧气候、材料与公共生活的语言。',
      en: 'Wright’s organic architecture offered Aalto a reference, which Aalto transformed through Nordic climate, material, and public life.',
      ja: 'ライトの有機的建築はアールトの参照点となり、北欧の気候、素材、公共生活の言語へ変換された。',
    },
    source: { title: 'Modern architecture historiography' },
  },
  {
    from: 'le-corbusier',
    to: 'tadao-ando',
    kind: 'influenced_by',
    label: { zh: '现代主义影响', en: 'Modernist influence', ja: 'モダニズムの影響' },
    note: {
      zh: '安藤忠雄自学现代主义经典，柯布西耶的几何、光与混凝土成为其建筑语言的重要远源。',
      en: 'Ando’s self-taught modernism drew from Le Corbusier’s geometry, light, and concrete as distant but crucial references.',
      ja: '安藤忠雄の独学によるモダニズムには、ル・コルビュジエの幾何、光、コンクリートが重要な遠い参照としてある。',
    },
    source: { title: 'Ando interviews and modernist reception' },
  },
  {
    from: 'louis-kahn',
    to: 'tadao-ando',
    kind: 'influenced_by',
    label: { zh: '光与沉默的影响', en: 'Light and silence influence', ja: '光と沈黙の影響' },
    note: {
      zh: '康对光、墙体厚度和纪念性的处理，是理解安藤清水混凝土空间精神性的关键参照。',
      en: 'Kahn’s handling of light, wall thickness, and monumentality helps explain the spiritual weight of Ando’s concrete spaces.',
      ja: 'カーンの光、壁の厚み、記念性は、安藤のコンクリート空間の精神性を読む重要な参照である。',
    },
    source: { title: 'Modern architecture historiography' },
  },
  {
    from: 'kazuyo-sejima',
    to: 'sanaa',
    kind: 'collaborated_with',
    label: { zh: '共同实践', en: 'Collaborative practice', ja: '共同実践' },
    note: {
      zh: '妹岛和世与西泽立卫共同组成 SANAA，形成以透明、轻薄边界和公共性为核心的协作实践。',
      en: 'Sejima and Nishizawa formed SANAA as a collaborative practice around transparency, thin boundaries, and publicness.',
      ja: '妹島和世と西沢立衛はSANAAを形成し、透明性、薄い境界、公共性をめぐる共同実践をつくった。',
    },
    source: { title: 'SANAA office history' },
  },
]

export function relationText(value: LocalizedString, lang: string) {
  return value[lang as Lang] || value.en || value.zh
}

export function getResolvedArchitectKnowledgeRelations(
  slug: string,
  architects: Architect[]
): ResolvedArchitectKnowledgeRelation[] {
  const bySlug = new Map(architects.map(architect => [architect.slug, architect]))
  const resolved: ResolvedArchitectKnowledgeRelation[] = []

  architectKnowledgeRelations.forEach(relation => {
    if (relation.from === slug) {
      const architect = bySlug.get(relation.to)
      if (architect) {
        resolved.push({ ...relation, direction: 'outgoing', architect })
      }
    }

    if (relation.to === slug) {
      const architect = bySlug.get(relation.from)
      if (architect) {
        resolved.push({ ...relation, direction: 'incoming', architect })
      }
    }
  })

  return resolved
}
