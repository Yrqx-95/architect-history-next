#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const reportsDir = path.join(root, 'reports')

async function readJson(relativePath) {
  const target = path.join(root, relativePath)
  try {
    return JSON.parse(await fs.readFile(target, 'utf8'))
  } catch (error) {
    throw new Error(`Missing or invalid ${relativePath}. Run the prerequisite audit first.`, { cause: error })
  }
}

function issueCountBySlug(issues) {
  const bySlug = new Map()
  for (const issue of issues) {
    if (!issue.slug) continue
    const fields = bySlug.get(issue.slug) || new Set()
    fields.add(issue.field)
    bySlug.set(issue.slug, fields)
  }
  return bySlug
}

function priorityForBuilding(gap, fields) {
  let score = 0
  const reasons = []

  if (gap.missing.source) {
    score += 5
    reasons.push('missing-source')
  }
  if (gap.missing.en) {
    score += 3
    reasons.push('missing-en-content')
  }
  if (gap.missing.zh) {
    score += 2
    reasons.push('missing-zh-content')
  }
  if (gap.missing.ja) {
    score += 2
    reasons.push('missing-ja-content')
  }
  if (fields.has('era_slug')) {
    score += 2
    reasons.push('missing-era')
  }
  if (fields.has('type_slug')) {
    score += 2
    reasons.push('missing-type')
  }
  if (fields.has('country_code')) {
    score += 1
    reasons.push('missing-country')
  }

  return { score, reasons }
}

const [dataAudit, contentCoverage, displayCoverage, graduationQa] = await Promise.all([
  readJson('reports/data-audit.json'),
  readJson('db/content-coverage-report.json'),
  readJson('db/display-coverage-report.json'),
  readJson('reports/graduation-content-audit.json'),
])

const dataSummary = dataAudit.summary || { error: 0, warning: 0, info: 0 }
const graduationProblemCount = Array.isArray(graduationQa.problems) ? graduationQa.problems.length : 0
const fieldsByBuilding = issueCountBySlug((dataAudit.issues || []).filter(issue => issue.entity === 'building'))
const buildingQueue = (contentCoverage.building_gaps || [])
  .map(gap => {
    const { score, reasons } = priorityForBuilding(gap, fieldsByBuilding.get(gap.slug) || new Set())
    return { slug: gap.slug, name_en: gap.name_en, score, reasons }
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score || a.slug.localeCompare(b.slug))

const blocked = dataSummary.error > 0 || graduationProblemCount > 0
const report = {
  generated_at: new Date().toISOString(),
  release: {
    status: blocked ? 'blocked' : 'review-required',
    blockers: {
      data_errors: dataSummary.error,
      graduation_problems: graduationProblemCount,
    },
    review_required: {
      data_warnings: dataSummary.warning,
      data_info: dataSummary.info,
      buildings_using_fallback_text: displayCoverage.displayCoverage?.buildingTextCoveredByFallback || 0,
      architects_using_fallback_text: displayCoverage.displayCoverage?.architectTextCoveredByFallback || 0,
      buildings_missing_source_text: displayCoverage.sourceCoverage?.buildingsMissingSourceText || 0,
    },
  },
  review_queue: {
    total: buildingQueue.length,
    top_100: buildingQueue.slice(0, 100),
  },
}

await fs.mkdir(reportsDir, { recursive: true })
await fs.writeFile(path.join(reportsDir, 'publication-readiness.json'), `${JSON.stringify(report, null, 2)}\n`)

const markdown = [
  '# Publication Readiness',
  '',
  `Generated: ${report.generated_at}`,
  '',
  `## Status: ${report.release.status}`,
  '',
  `- Data errors: ${report.release.blockers.data_errors}`,
  `- Graduation problems: ${report.release.blockers.graduation_problems}`,
  `- Data warnings: ${report.release.review_required.data_warnings}`,
  `- Buildings using fallback text: ${report.release.review_required.buildings_using_fallback_text}`,
  `- Buildings missing source text: ${report.release.review_required.buildings_missing_source_text}`,
  '',
  '## Top Review Queue',
  '',
  '| Score | Building | Reasons |',
  '|---:|---|---|',
  ...report.review_queue.top_100.map(item => `| ${item.score} | ${item.name_en || item.slug} | ${item.reasons.join(', ')} |`),
  '',
].join('\n')

await fs.writeFile(path.join(reportsDir, 'publication-readiness.md'), markdown)

console.log(JSON.stringify({
  status: report.release.status,
  blockers: report.release.blockers,
  queue: report.review_queue.total,
}, null, 2))

if (blocked) process.exitCode = 1
