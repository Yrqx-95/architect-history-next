#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const decisions = readJson('db/review-decisions/graduation-new-buildings-library-001.json')
const results = []

for (const item of decisions.decisions) {
  const sourceChecks = []
  for (const url of [...new Set([item.canonical_building.official_url, ...item.evidence_urls])]) {
    const response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20_000) })
    sourceChecks.push({ url, status: response.status, final_url: response.url, ok: response.ok })
  }

  const title = `File:${decodeURIComponent(new URL(item.image.source_url).pathname.split('/File:')[1])}`
  const api = new URL('https://commons.wikimedia.org/w/api.php')
  api.search = new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '2',
    prop: 'imageinfo',
    iiprop: 'url|size|sha1|extmetadata',
    titles: title,
  })
  const commonsResponse = await fetch(api, { signal: AbortSignal.timeout(20_000) })
  if (!commonsResponse.ok) throw new Error(`${item.case_id} Commons API returned ${commonsResponse.status}`)
  const commonsPayload = await commonsResponse.json()
  const page = commonsPayload.query.pages[0]
  if (page.missing || !page.imageinfo?.[0]) throw new Error(`${item.case_id} Commons file is missing`)
  const imageInfo = page.imageinfo[0]
  const metadata = imageInfo.extmetadata || {}
  const artist = clean(metadata.Artist?.value)
  const license = metadata.LicenseShortName?.value || ''
  const expectedArtist = item.image.credit.replace(/\s*\/ Wikimedia Commons$/, '').replace(/^Photo:\s*/, '')

  results.push({
    case_id: item.case_id,
    source_checks: sourceChecks,
    commons: {
      title: page.title,
      description_url: imageInfo.descriptionurl,
      artist,
      license,
      width: imageInfo.width,
      height: imageInfo.height,
      size: imageInfo.size,
      sha1: imageInfo.sha1,
      description: clean(metadata.ImageDescription?.value),
      author_matches: artist === expectedArtist,
      license_matches: license === item.image.license,
    },
  })
}

const failures = results.flatMap(item => [
  ...item.source_checks.filter(check => !check.ok).map(check => `${item.case_id} source ${check.status}: ${check.url}`),
  ...(!item.commons.author_matches ? [`${item.case_id} author mismatch`] : []),
  ...(!item.commons.license_matches ? [`${item.case_id} license mismatch`] : []),
])

const report = {
  generated_at: new Date().toISOString(),
  scope: decisions.scope,
  summary: {
    cases: results.length,
    source_urls: results.reduce((sum, item) => sum + item.source_checks.length, 0),
    source_failures: results.reduce((sum, item) => sum + item.source_checks.filter(check => !check.ok).length, 0),
    commons_files: results.length,
    commons_metadata_failures: results.filter(item => !item.commons.author_matches || !item.commons.license_matches).length,
  },
  failures,
  results,
}

const output = 'docs/reports/graduation-new-building-library-001-live-audit.json'
fs.writeFileSync(path.join(root, output), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report.summary, null, 2))
if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'))
}

function clean(value) {
  return String(value || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}
