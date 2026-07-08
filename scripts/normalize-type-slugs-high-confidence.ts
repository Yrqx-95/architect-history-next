import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { ensureReportDir, fetchAll, getSupabaseClient, ROOT } from './supabase-script-utils'

type Building = {
  id: string
  slug: string
  name_zh: string | null
  name_en: string | null
  name_ja: string | null
  city: string | null
  country: string | null
  wikipedia_url: string | null
  type_slug: string | null
  description: Record<string, unknown> | null
  significance: Record<string, unknown> | null
  ai_tags: Record<string, unknown> | null
}

type BuildingType = {
  slug: string
}

type TypeRule = {
  target: string
  subtype: string
  pattern: RegExp
  confidence: 'high' | 'medium'
}

type PlannedChange = {
  id: string
  slug: string
  name: string
  to: string
  subtype: string
  evidence: string
}

type ExcludedCandidate = PlannedChange & {
  reason: string
}

type AuditResult = {
  status: number | null
  totalIssues?: number
  errorCount?: number
  warningCount?: number
  warningByField?: Record<string, number>
}

const WRITE = process.argv.includes('--write')
const REPORT_DIR = ensureReportDir()
const REPORT_JSON = path.join(REPORT_DIR, 'type-slug-high-confidence-normalization.json')
const REPORT_MD = path.join(ROOT, 'TYPE_SLUG_WRITE_REPORT.md')
const MIGRATION_SQL = path.join(ROOT, 'db/migrations/v8-normalize-high-confidence-type-slugs.sql')
const ROLLBACK_SQL = path.join(REPORT_DIR, 'type-slug-high-confidence-rollback.sql')

const typeRules: TypeRule[] = [
  {
    target: 'religious',
    subtype: 'cathedral',
    pattern:
      /\b(cathedral|basilica|church|chapel|temple|shrine|synagogue|mosque|abbey|parish|kirche|kirkko|sant\b|santa\b|san\b|notre dame|st\. mary|st mary|st peters|bagværd|bagsværd)\b|教堂|寺|神社/i,
    confidence: 'high',
  },
  {
    target: 'cultural',
    subtype: 'art-museum',
    pattern:
      /\b(art museum|museum of art|gallery|galleria|kunsthaus|kunsthal|pinakothek|museu de arte|museo.*arte|fine arts|modern art|contemporary art|collection|gipsoteca)\b/i,
    confidence: 'high',
  },
  {
    target: 'cultural',
    subtype: 'museum',
    pattern:
      /\b(museum|museo|museu|musée|centre pompidou|cultural centre|cultural center|culture center|civic hall|concert hall|philharmonie|opera house|theatre|theater|auditorium|performing arts|arts centre|arts center|cinema|library|biblioteca|bibliothèque|kiasma|hergé)\b/i,
    confidence: 'high',
  },
  {
    target: 'cultural',
    subtype: 'named-cultural',
    pattern:
      /\b(teatro|teatret|schaubühne|schaubuhne|z[eé]nith|institute of art|instituto de arte|colecci[oó]n|oceanogr[aà]fic|oc[eé]an et du surf|biosph[eè]re|biosphere|sesc pomp[eé]ia|kinokuniya hall|bunka kaikan|kulttuuritalo|kirjatalo|spiral|rocher de palmer|champs libres)\b/i,
    confidence: 'high',
  },
  {
    target: 'government',
    subtype: 'civic-government-intl',
    pattern: /\b(rathaus|valtiontalo|ciutat de la just[ií]cia|palace of justice|palacio de justicia|just[ií]cia)\b/i,
    confidence: 'high',
  },
  {
    target: 'leisure',
    subtype: 'leisure-named',
    pattern: /\b(the o2|arenas de barcelona|aquarium|oceanogr[aà]fic|tidal pools|pools of|skylight)\b/i,
    confidence: 'medium',
  },
  {
    target: 'residential',
    subtype: 'house',
    pattern:
      /\b(house|villa|residence|home|maison|casa\b|houses|housing|apartment|apartments|condominium|dormitory|mews|row house|townhouse|hotel marcel)\b/i,
    confidence: 'high',
  },
  {
    target: 'sports',
    subtype: 'stadium',
    pattern: /\b(stadium|gymnasium|sports hall|arena|dome|velodrome|sport|olympic|natatorium|performing? no)\b/i,
    confidence: 'high',
  },
  {
    target: 'transportation',
    subtype: 'airport-station',
    pattern: /\b(airport|terminal|station|railway|train station|metro|subway|concourse|transport|ferry|bridge of peace)\b/i,
    confidence: 'high',
  },
  {
    target: 'government',
    subtype: 'government',
    pattern:
      /\b(government|courthouse|court house|court of|city hall|town hall|parliament|assembly|congress|embassy|palace of justice|justice|prefectural government|county hall|federal building|presidential palace|bank of spain headquarters)\b/i,
    confidence: 'high',
  },
  {
    target: 'educational',
    subtype: 'school-university',
    pattern:
      /\b(school|university|college|campus|faculty|facultad|scuola|institute of technology|education|elementary|training school|academy|kindergarten)\b/i,
    confidence: 'high',
  },
  {
    target: 'healthcare',
    subtype: 'healthcare',
    pattern: /\b(hospital|sanatorium|clinic|medical|materno|health)\b/i,
    confidence: 'high',
  },
  {
    target: 'cultural',
    subtype: 'hall-cultural',
    pattern:
      /\b(teatret|auditori|ongakud[oō]|bunka hall|symphony hall|coliseu|cais das artes|cidade das artes|kunstzaal|moderna museet|centre georges pompidou|centro cultural|cultural centre|cultural center)\b/i,
    confidence: 'high',
  },
  {
    target: 'sports',
    subtype: 'stadium-intl',
    pattern: /\b(est[aá]dio|palacio de los deportes|sports center|sports centre|sports complex)\b/i,
    confidence: 'high',
  },
  {
    target: 'transportation',
    subtype: 'station-intl',
    pattern: /\b(atocha|cercan[ií]as|messe|puerta de atocha)\b/i,
    confidence: 'medium',
  },
  {
    target: 'office',
    subtype: 'tower-office',
    pattern:
      /\b(tower|towers|torre|torres|toren|tour\b|tours\b|hochhaus|centre|center|building|edificio|edifici|bau\b|head office|banca|bankinter|national bank|leumi|wood street|madison avenue|sloane street|spring street|astor place|fcg building|ibm studios|parc1|one57|mlc centre|capita centre|lippo centre|one raffles place|uob plaza|international towers|times square|qv\.?1|blue front shibaura|taipei twins|telehouse|baloise bellinzona|coolsingeltoren|lützowplatz|lutzowplatz|harting vertriebsgebäude|harting vertriebsgebaude|verona 203a|uberseering)\b/i,
    confidence: 'medium',
  },
  {
    target: 'civic-public',
    subtype: 'hall-center',
    pattern:
      /\b(hall|forum|foundation|foundazione|fondazione|center|centre|complex|palace|palacio|paleis|palazzo|paraninfo|col.?legi|club|community|service center|operations complex)\b/i,
    confidence: 'medium',
  },
  {
    target: 'residential',
    subtype: 'housing-general',
    pattern:
      /\b(haus|landhaus|case d|case-|bairro|conjunto habitacional|ilot|hautes-formes|felicit[eé]|manor|cabin|estate|malagueira|bou[cç]a|can lis|can feliz|utzon-huset|studio aalto|ypenhof|terassitalo|neutra vdl|studio and residences|bonjour tristesse|new orleans|lange voorhout|haras de la huderie)\b/i,
    confidence: 'medium',
  },
  {
    target: 'commercial',
    subtype: 'commercial-intl',
    pattern: /\b(commerciale|geschäftshaus|geschaftshaus|mercado|vinothek|coffee shop|restaurante|bijenkorf|gaumont|grand [eé]cran|designer outlet)\b/i,
    confidence: 'high',
  },
  {
    target: 'religious',
    subtype: 'religious-intl',
    pattern: /\b(chiesa|chapelle|friedhof|crematorium|parroquia|nuestra se[nñ]ora|dar-al-islam|santo papa)\b/i,
    confidence: 'medium',
  },
  {
    target: 'public-space',
    subtype: 'park-intl',
    pattern: /\b(parc\b|parque|villette|big roof|pavilh[aã]o de portugal)\b/i,
    confidence: 'medium',
  },
  {
    target: 'office',
    subtype: 'office-headquarters',
    pattern:
      /\b(headquarters|office|offices|bank building|bank of|corporate|company|business center|business centre|tower|skyscraper|world trade center|trade center|leadenhall|lloyd's|lever house|modulightor|dentsu|united nations university)\b/i,
    confidence: 'medium',
  },
  {
    target: 'commercial',
    subtype: 'commercial-retail',
    pattern:
      /\b(shopping|mall|outlet|store|department store|kaufhaus|market|commercial|casino|restaurant|retail|hotel|resort|mercure|shangri-la|discovery primea|one monte-carlo|negozio|galeria department store|italie deux)\b/i,
    confidence: 'high',
  },
  {
    target: 'industrial',
    subtype: 'industrial',
    pattern: /\b(factory|plant|industrial|warehouse|depot|dep[oó]sito|power station|refinery|works|fagus|red banner textile)\b/i,
    confidence: 'high',
  },
  {
    target: 'temporary',
    subtype: 'pavilion',
    pattern: /\b(pavilion|expo|exhibition room|exhibition centre|exhibition center|temporary)\b/i,
    confidence: 'medium',
  },
  {
    target: 'monument',
    subtype: 'monument-memorial',
    pattern: /\b(memorial|monument|cenotaph|tomb|arch\b|flame of peace|statue|mausoleum)\b/i,
    confidence: 'high',
  },
  {
    target: 'public-space',
    subtype: 'public-space',
    pattern: /\b(square|piazza|plaza|park\b|garden|public space|promenade|urban park)\b/i,
    confidence: 'medium',
  },
  {
    target: 'infrastructure',
    subtype: 'infrastructure',
    pattern: /\b(bridge|viaduct|dam|water tower|tower of|observation tower|footbridge|parking garage|garage|library? no)\b/i,
    confidence: 'medium',
  },
  {
    target: 'research-institute',
    subtype: 'research',
    pattern: /\b(research institute|laboratory|labs|science center|science centre|innovation center|innovation centre|salk|pats-center)\b/i,
    confidence: 'high',
  },
  {
    target: 'civic-public',
    subtype: 'civic-public',
    pattern: /\b(public library|community center|community centre|civic center|civic centre|service center|conference center|conference centre|convention centre|convention center)\b/i,
    confidence: 'medium',
  },
]

const safetyExclusions: Record<string, string> = {
  'asilo-santelia': "High rule matched only `sant`; this is a school/nursery, not a religious building.",
  'casa-das-historias-paula-rego': '`Casa` is ambiguous here; this is a cultural building, not residential.',
  'casa-de-cha-da-boa': '`Casa de Cha` is a tea house/restaurant, not residential.',
  'casa-do-benin': '`Casa` is ambiguous here; likely cultural rather than residential.',
  'casa-roberto-ivens-casa': '`Casa da Arquitetura` is a cultural/institutional use, not residential.',
  'cuadra-san-cristobal': "High rule matched only `san`; this work is not religious.",
}

function valueText(value: unknown) {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') return Object.values(value).filter(Boolean).join(' ')
  return String(value)
}

function textOf(building: Building) {
  return [
    building.slug,
    building.name_en,
    building.name_zh,
    building.name_ja,
    building.city,
    building.country,
    building.wikipedia_url,
    valueText(building.description),
    valueText(building.significance),
    JSON.stringify(building.ai_tags || {}),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function inferType(building: Building) {
  if (building.type_slug) return null
  const text = textOf(building)
  const hits = typeRules.flatMap(rule => {
    const match = text.match(rule.pattern)
    return match
      ? [
          {
            target: rule.target,
            subtype: rule.subtype,
            confidence: rule.confidence,
            evidence: match[0],
          },
        ]
      : []
  })

  if (!hits.length) return null

  const chosen = hits.find(hit => hit.confidence === 'high') || hits[0]
  let confidence = chosen.confidence
  if (hits.length > 1) {
    const distinctTargets = new Set(hits.map(hit => hit.target))
    if (distinctTargets.size > 1 && confidence === 'high') confidence = 'medium'
  }

  return { ...chosen, confidence }
}

function sqlString(value: string) {
  return `'${value.replaceAll("'", "''")}'`
}

function distribution(changes: Array<{ to: string }>) {
  const counts = new Map<string, number>()
  for (const change of changes) counts.set(change.to, (counts.get(change.to) || 0) + 1)
  return [...counts.entries()]
    .map(([typeSlug, count]) => ({ typeSlug, count }))
    .sort((a, b) => b.count - a.count || a.typeSlug.localeCompare(b.typeSlug))
}

function generateMigration(changes: PlannedChange[]) {
  const lines = [
    '-- ============================================================',
    '-- V8: Normalize high-confidence type_slug metadata',
    '-- Source: scripts/normalize-type-slugs-high-confidence.ts',
    '-- Scope: high-confidence records only; medium/manual candidates excluded.',
    '-- Idempotent: updates only rows where type_slug IS NULL.',
    '-- Rollback: reports/type-slug-high-confidence-rollback.sql',
    '-- ============================================================',
    '',
  ]

  if (!changes.length) {
    lines.push('-- No type_slug changes were required.')
  } else {
    lines.push('BEGIN;')
    for (const change of changes) {
      lines.push(
        `UPDATE buildings SET type_slug = ${sqlString(change.to)} WHERE slug = ${sqlString(change.slug)} AND type_slug IS NULL;`
      )
    }
    lines.push('COMMIT;')
  }

  lines.push('')
  return lines.join('\n')
}

function generateRollback(changes: PlannedChange[]) {
  const lines = [
    '-- ============================================================',
    '-- Rollback for V8 high-confidence type_slug normalization',
    '-- This only clears values written by the matching forward migration.',
    '-- ============================================================',
    '',
  ]

  if (!changes.length) {
    lines.push('-- No rollback changes are required.')
  } else {
    lines.push('BEGIN;')
    for (const change of changes) {
      lines.push(
        `UPDATE buildings SET type_slug = NULL WHERE slug = ${sqlString(change.slug)} AND type_slug = ${sqlString(change.to)};`
      )
    }
    lines.push('COMMIT;')
  }

  lines.push('')
  return lines.join('\n')
}

function runAudit(): AuditResult {
  const result = spawnSync('npm', ['run', 'data:audit'], {
    cwd: ROOT,
    stdio: 'inherit',
    env: process.env,
  })

  const auditPath = path.join(ROOT, 'reports/data-audit.json')
  if (!fs.existsSync(auditPath)) return { status: result.status }

  const parsed = JSON.parse(fs.readFileSync(auditPath, 'utf8')) as {
    summary?: Record<'error' | 'warning' | 'info', number>
    issues?: Array<{ severity: string; field: string }>
  }
  const warningByField: Record<string, number> = {}
  for (const issue of parsed.issues || []) {
    if (issue.severity === 'warning') warningByField[issue.field] = (warningByField[issue.field] || 0) + 1
  }

  return {
    status: result.status,
    totalIssues: (parsed.summary?.error || 0) + (parsed.summary?.warning || 0) + (parsed.summary?.info || 0),
    errorCount: parsed.summary?.error || 0,
    warningCount: parsed.summary?.warning || 0,
    warningByField,
  }
}

function formatPercent(numerator: number, denominator: number) {
  if (!denominator) return '0.00%'
  return `${((numerator / denominator) * 100).toFixed(2)}%`
}

function markdownReport(report: {
  generatedAt: string
  mode: 'dry-run' | 'write'
  totalBuildings: number
  missingBefore: number
  highCandidates: number
  plannedCount: number
  excludedCandidates: ExcludedCandidate[]
  typeDistribution: Array<{ typeSlug: string; count: number }>
  changes: PlannedChange[]
  missingAfter?: number
  coverageAfter?: string
  fullTypeDistributionAfter?: Array<{ typeSlug: string; count: number }>
  auditAfterWrite?: AuditResult
}) {
  const lines = [
    '# Type Slug Write Report',
    '',
    `Generated: ${report.generatedAt}`,
    `Mode: ${report.mode}`,
    '',
    '## Scope',
    '',
    '- Only high-confidence candidates were eligible for write.',
    '- Medium-confidence and manual-review candidates were not written.',
    '- A small safety exclusion list blocks high-rule matches that are visibly ambiguous or incorrect.',
    '',
    '## Pre-Write Summary',
    '',
    `- Total buildings: ${report.totalBuildings}`,
    `- Missing type_slug before: ${report.missingBefore}`,
    `- High-confidence candidates detected: ${report.highCandidates}`,
    `- Planned high-confidence writes: ${report.plannedCount}`,
    `- Safety exclusions from high set: ${report.excludedCandidates.length}`,
    '',
    '## Planned Type Distribution',
    '',
    '| type_slug | Count |',
    '|---|---:|',
  ]

  for (const item of report.typeDistribution) lines.push(`| ${item.typeSlug} | ${item.count} |`)

  if (report.mode === 'write') {
    lines.push('', '## Post-Write Summary', '')
    lines.push(`- Remaining missing type_slug: ${report.missingAfter ?? 'unknown'}`)
    lines.push(`- New type_slug coverage: ${report.coverageAfter ?? 'unknown'}`)
    if (report.auditAfterWrite) {
      lines.push(`- data:audit exit status: ${report.auditAfterWrite.status}`)
      lines.push(`- data:audit total issues: ${report.auditAfterWrite.totalIssues ?? 'unknown'}`)
      lines.push(`- data:audit errors: ${report.auditAfterWrite.errorCount ?? 'unknown'}`)
      lines.push(`- data:audit warnings: ${report.auditAfterWrite.warningCount ?? 'unknown'}`)
      lines.push(`- data:audit type_slug warnings: ${report.auditAfterWrite.warningByField?.type_slug ?? 0}`)
    }
  }

  if (report.fullTypeDistributionAfter?.length) {
    lines.push('', '## Full Type Distribution After Write', '', '| type_slug | Count |', '|---|---:|')
    for (const item of report.fullTypeDistributionAfter) lines.push(`| ${item.typeSlug} | ${item.count} |`)
  }

  lines.push('', '## Safety Exclusions', '')
  if (!report.excludedCandidates.length) {
    lines.push('None.')
  } else {
    lines.push('| Building | Name | Candidate | Evidence | Reason |')
    lines.push('|---|---|---|---|---|')
    for (const item of report.excludedCandidates) {
      lines.push(`| ${item.slug} | ${item.name} | ${item.to} | ${item.evidence} | ${item.reason} |`)
    }
  }

  lines.push('', '## Rollback', '')
  lines.push('- Forward migration: `db/migrations/v8-normalize-high-confidence-type-slugs.sql`')
  lines.push('- Rollback SQL: `reports/type-slug-high-confidence-rollback.sql`')
  lines.push('- Forward SQL is idempotent because it updates only `type_slug IS NULL` rows.')
  lines.push('- Rollback SQL clears only the exact type slugs written by this sprint.')

  lines.push('', '## Planned / Written Records', '', '| Building | Name | type_slug | Subtype | Evidence |', '|---|---|---|---|---|')
  for (const change of report.changes) {
    lines.push(`| ${change.slug} | ${change.name} | ${change.to} | ${change.subtype} | ${change.evidence} |`)
  }

  lines.push('')
  return lines.join('\n')
}

async function main() {
  const [buildings, buildingTypes] = await Promise.all([
    fetchAll<Building>('buildings'),
    fetchAll<BuildingType>('building_types'),
  ])
  const validTypes = new Set(buildingTypes.map(type => type.slug))
  const missingBefore = buildings.filter(building => !building.type_slug).length

  const highCandidates: PlannedChange[] = []
  const excludedCandidates: ExcludedCandidate[] = []
  for (const building of buildings) {
    const inferred = inferType(building)
    if (!inferred || inferred.confidence !== 'high') continue
    if (!validTypes.has(inferred.target)) {
      excludedCandidates.push({
        id: building.id,
        slug: building.slug,
        name: building.name_zh || building.name_en || '',
        to: inferred.target,
        subtype: inferred.subtype,
        evidence: inferred.evidence,
        reason: 'Target type_slug does not exist in building_types.',
      })
      continue
    }

    const change = {
      id: building.id,
      slug: building.slug,
      name: building.name_zh || building.name_en || '',
      to: inferred.target,
      subtype: inferred.subtype,
      evidence: inferred.evidence,
    }
    const exclusionReason = safetyExclusions[building.slug]
    if (exclusionReason) excludedCandidates.push({ ...change, reason: exclusionReason })
    else highCandidates.push(change)
  }

  fs.writeFileSync(MIGRATION_SQL, generateMigration(highCandidates))
  fs.writeFileSync(ROLLBACK_SQL, generateRollback(highCandidates))

  if (WRITE && highCandidates.length) {
    const supabase = getSupabaseClient()
    for (const change of highCandidates) {
      const { error } = await supabase
        .from('buildings')
        .update({ type_slug: change.to })
        .eq('id', change.id)
        .is('type_slug', null)
      if (error) throw new Error(`${change.slug}: ${error.message}`)
    }
  }

  let missingAfter: number | undefined
  let coverageAfter: string | undefined
  let fullTypeDistributionAfter: Array<{ typeSlug: string; count: number }> | undefined
  let auditAfterWrite: AuditResult | undefined
  if (WRITE) {
    const afterBuildings = await fetchAll<Building>('buildings')
    missingAfter = afterBuildings.filter(building => !building.type_slug).length
    coverageAfter = formatPercent(afterBuildings.length - missingAfter, afterBuildings.length)
    fullTypeDistributionAfter = distribution(
      afterBuildings
        .filter((building): building is Building & { type_slug: string } => Boolean(building.type_slug))
        .map(building => ({ to: building.type_slug }))
    )
    auditAfterWrite = runAudit()
  }

  const report = {
    generatedAt: new Date().toISOString(),
    mode: WRITE ? ('write' as const) : ('dry-run' as const),
    totalBuildings: buildings.length,
    missingBefore,
    highCandidates: highCandidates.length + excludedCandidates.length,
    plannedCount: highCandidates.length,
    excludedCandidates,
    typeDistribution: distribution(highCandidates),
    changes: highCandidates,
    missingAfter,
    coverageAfter,
    fullTypeDistributionAfter,
    auditAfterWrite,
  }

  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`)
  fs.writeFileSync(REPORT_MD, markdownReport(report))

  console.log(`${WRITE ? 'Applied' : 'Dry-run'} high-confidence type_slug normalization`)
  console.log(`- high-confidence candidates detected: ${report.highCandidates}`)
  console.log(`- planned writes: ${report.plannedCount}`)
  console.log(`- safety exclusions: ${excludedCandidates.length}`)
  console.log('- planned type distribution:')
  for (const item of report.typeDistribution) console.log(`  ${item.typeSlug}: ${item.count}`)
  console.log(`- migration: ${path.relative(ROOT, MIGRATION_SQL)}`)
  console.log(`- rollback: ${path.relative(ROOT, ROLLBACK_SQL)}`)
  console.log(`- report: ${path.relative(ROOT, REPORT_MD)}`)
  if (WRITE) {
    console.log(`- remaining missing type_slug: ${missingAfter}`)
    console.log(`- new type_slug coverage: ${coverageAfter}`)
  }
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
