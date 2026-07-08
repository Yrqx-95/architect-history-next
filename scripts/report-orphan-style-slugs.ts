import fs from 'node:fs'
import path from 'node:path'
import { ensureReportDir, fetchAll, normalizeKey, ROOT } from './supabase-script-utils'

type Style = {
  slug: string
  name_zh: string | null
  name_en: string | null
  name_ja: string | null
  keywords: string[] | null
}

type Building = {
  slug: string
  name_zh: string | null
  name_en: string | null
  style_slugs: string[] | null
}

type OrphanRow = {
  buildingSlug: string
  buildingName: string
  currentStyleSlugs: string[]
  orphanStyle: string
  suggestions: Array<{ slug: string; label: string; score: number }>
}

type Classification = 'A' | 'B' | 'C'

type OrphanGroup = {
  orphanStyle: string
  count: number
  classification: Classification
  action: string
  rationale: string
  suggestions: OrphanRow['suggestions']
  rows: OrphanRow[]
}

const REPORT_MD = path.join(ensureReportDir(), 'orphan-style-slugs.md')
const REPORT_JSON = path.join(ensureReportDir(), 'orphan-style-slugs.json')

const exactAutoMappings: Record<string, string> = {
  '现代主义': 'modernism',
  '现代主义建筑': 'modernism',
  '早期现代主义': 'modernism',
  '古典主义': 'classical',
  '古典建筑': 'classical',
  '国际式': 'international-style',
  '国际风格': 'international-style',
  '巴洛克': 'baroque',
  '巴洛克建筑': 'baroque',
  '英国巴洛克': 'english-baroque',
  '文艺复兴': 'renaissance',
  '文艺复兴建筑': 'renaissance',
  '帕拉迪奥主义': 'palladian',
  '矫饰主义': 'mannerism',
  '新艺术运动': 'art-nouveau',
  '包豪斯': 'bauhaus',
  '功能主义': 'functionalism',
  '新陈代谢派': 'metabolism',
  '后现代建筑': 'postmodern',
  '当代建筑': 'contemporary-architecture',
  '当代日本建筑': 'contemporary-japanese',
  '现代日本': 'japanese-modern',
  '日本现代建筑': 'japanese-modern',
  '当代丹麦建筑': 'contemporary-danish',
  '当代瑞士建筑': 'contemporary-swiss',
  '北欧现代主义': 'nordic-modernism',
  '巴西现代主义': 'brazilian-modernism',
  '加泰罗尼亚现代主义': 'catalan-modernisme',
  '粗野主义': 'brutalism',
  '解构主义': 'deconstructivism',
  '极简主义': 'minimalism',
  '高技派': 'high-tech',
  '生态建筑': 'eco-architecture',
  '有机建筑': 'organic',
  '参数化设计': 'parametric',
  '芝加哥学派': 'chicago-school',
  '早期摩天楼': 'early-skyscraper',
  '未来主义': 'futurism',
}

const likelyNewStyles = new Set([
  '表现主义',
  '结构表现主义',
  '草原风格',
  '清水混凝土',
  '自然材料',
  '几何抽象',
  '雕塑建筑',
])

const needsEditorialReview = new Set([
  '城市设计',
  '历史建筑改造',
  '工业改造',
  '应急建筑',
])

const aliasHints: Record<string, string[]> = {
  '现代主义': ['modernism'],
  '古典主义': ['classical'],
  '国际式': ['international-style'],
  '巴洛克': ['baroque'],
  '文艺复兴': ['renaissance'],
  '后现代建筑': ['postmodern'],
  '早期现代主义': ['modernism'],
  '国际风格': ['international-style'],
  '现代日本': ['japanese-modern'],
}

function levenshtein(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0))
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      )
    }
  }
  return dp[a.length][b.length]
}

function similarity(a: string, b: string) {
  if (!a || !b) return 0
  if (a === b) return 1
  if (a.includes(b) || b.includes(a)) return 0.82
  const maxLength = Math.max(a.length, b.length)
  return maxLength ? 1 - levenshtein(a, b) / maxLength : 0
}

function candidatesFor(orphan: string, styles: Style[]) {
  const normalizedOrphan = normalizeKey(orphan)
  const aliasSlugs = aliasHints[orphan] || []
  const scored = styles.map(style => {
    const labels = [style.slug, style.name_zh, style.name_en, style.name_ja, ...(style.keywords || [])].filter(Boolean) as string[]
    const textScore = Math.max(...labels.map(label => similarity(normalizedOrphan, normalizeKey(label))))
    const aliasBoost = aliasSlugs.includes(style.slug) ? 1 : 0
    return {
      slug: style.slug,
      label: style.name_zh || style.name_en || style.slug,
      score: Math.max(textScore, aliasBoost),
    }
  })

  return scored
    .sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug))
    .slice(0, 5)
}

function classifyGroup(orphan: string, suggestions: OrphanRow['suggestions']): Pick<OrphanGroup, 'classification' | 'action' | 'rationale'> {
  const exactTarget = exactAutoMappings[orphan]
  const topSuggestion = suggestions[0]

  if (exactTarget && topSuggestion?.slug === exactTarget && topSuggestion.score >= 0.95) {
    return {
      classification: 'A',
      action: `Map to ${exactTarget}`,
      rationale: '明显同义词、旧显示名或中英文标签差异，可作为自动映射候选。',
    }
  }

  if (likelyNewStyles.has(orphan)) {
    return {
      classification: 'B',
      action: 'Consider adding a new style slug',
      rationale: '更像独立风格、材料取向或形式语言；直接映射到现有 style 可能会丢语义。',
    }
  }

  if (needsEditorialReview.has(orphan)) {
    return {
      classification: 'C',
      action: 'Manual editorial review',
      rationale: '更像用途、城市尺度、项目策略或临时状态，不一定应该进入 style taxonomy。',
    }
  }

  if (topSuggestion && topSuggestion.score >= 0.9) {
    return {
      classification: 'A',
      action: `Map to ${topSuggestion.slug}`,
      rationale: '最高候选相似度很高，可进入自动映射候选，但写库前仍应抽样确认。',
    }
  }

  return {
    classification: 'C',
    action: 'Manual editorial review',
    rationale: '候选相似度不足或语义可能跨分类，暂不建议自动处理。',
  }
}

function groupRows(rows: OrphanRow[]): OrphanGroup[] {
  const byOrphan = new Map<string, OrphanRow[]>()
  for (const row of rows) {
    const list = byOrphan.get(row.orphanStyle) || []
    list.push(row)
    byOrphan.set(row.orphanStyle, list)
  }

  return [...byOrphan.entries()]
    .map(([orphanStyle, group]) => {
      const suggestions = group[0].suggestions
      return {
        orphanStyle,
        count: group.length,
        suggestions,
        rows: group,
        ...classifyGroup(orphanStyle, suggestions),
      }
    })
    .sort((a, b) => b.count - a.count || a.orphanStyle.localeCompare(b.orphanStyle))
}

function markdown(groups: OrphanGroup[]) {
  const classificationCounts = groups.reduce<Record<Classification, number>>((counts, group) => {
    counts[group.classification] += 1
    return counts
  }, { A: 0, B: 0, C: 0 })
  const assignmentCounts = groups.reduce<Record<Classification, number>>((counts, group) => {
    counts[group.classification] += group.count
    return counts
  }, { A: 0, B: 0, C: 0 })
  const totalAssignments = groups.reduce((sum, group) => sum + group.count, 0)

  const lines = [
    '# Orphan Style Slugs',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    `Total orphan assignments: ${totalAssignments}`,
    `Unique orphan style values: ${groups.length}`,
    '',
    '## Classification Summary',
    '',
    '| Class | Meaning | Unique values | Assignments |',
    '|---|---|---:|---:|',
    `| A | 明显 typo / 同义词，可作为自动映射候选 | ${classificationCounts.A} | ${assignmentCounts.A} |`,
    `| B | 可能需要新增 style | ${classificationCounts.B} | ${assignmentCounts.B} |`,
    `| C | 需要人工判断，不应自动写库 | ${classificationCounts.C} | ${assignmentCounts.C} |`,
    '',
    '## Classification Table',
    '',
    '| Class | Orphan style | Count | Action | Rationale | Top candidates |',
    '|---|---|---:|---|---|---|',
  ]

  for (const group of groups) {
    const suggestions = group.suggestions
      .slice(0, 3)
      .map(item => `${item.slug} (${item.label}, ${item.score.toFixed(2)})`)
      .join('; ')
    lines.push(`| ${group.classification} | ${group.orphanStyle} | ${group.count} | ${group.action} | ${group.rationale} | ${suggestions || 'None'} |`)
  }

  lines.push('')
  lines.push('## Detail')
  lines.push('')

  for (const group of groups) {
    const suggestions = group.suggestions
      .map(item => `${item.slug} (${item.label}, ${item.score.toFixed(2)})`)
      .join('; ')
    lines.push(`## ${group.orphanStyle}`)
    lines.push('')
    lines.push(`- Class: ${group.classification}`)
    lines.push(`- Count: ${group.count}`)
    lines.push(`- Action: ${group.action}`)
    lines.push(`- Rationale: ${group.rationale}`)
    lines.push(`- Suggested candidates: ${suggestions || 'None'}`)
    lines.push('')
    lines.push('| Building | Name | Current style_slugs |')
    lines.push('|---|---|---|')
    for (const row of group.rows.slice(0, 50)) {
      lines.push(`| ${row.buildingSlug} | ${row.buildingName} | ${row.currentStyleSlugs.join(', ')} |`)
    }
    if (group.rows.length > 50) lines.push(`| ... | ${group.rows.length - 50} more | ... |`)
    lines.push('')
  }

  return lines.join('\n')
}

async function main() {
  const [styles, buildings] = await Promise.all([
    fetchAll<Style>('styles'),
    fetchAll<Building>('buildings'),
  ])
  const validStyles = new Set(styles.map(style => style.slug))
  const rows: OrphanRow[] = []

  for (const building of buildings) {
    for (const style of building.style_slugs || []) {
      if (validStyles.has(style)) continue
      rows.push({
        buildingSlug: building.slug,
        buildingName: building.name_zh || building.name_en || '',
        currentStyleSlugs: building.style_slugs || [],
        orphanStyle: style,
        suggestions: candidatesFor(style, styles),
      })
    }
  }

  const groups = groupRows(rows)

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify({ generatedAt: new Date().toISOString(), groups, rows }, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdown(groups))

  console.log(`Orphan style report complete: ${rows.length} assignments`)
  console.log(`- ${path.relative(ROOT, REPORT_JSON)}`)
  console.log(`- ${path.relative(ROOT, REPORT_MD)}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
