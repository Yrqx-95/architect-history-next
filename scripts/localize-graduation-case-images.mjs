#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const useRetryQueue = process.argv.includes('--retry-queue')
const manifestPath = path.join(root, useRetryQueue ? 'content/graduation_image_retry_queue.json' : 'content/graduation_image_manifest.json')
const csvPath = path.join(root, 'content/cases.csv')
const applyChanges = process.argv.includes('--apply')
const downloadFiles = applyChanges || process.argv.includes('--download')
const maxCount = readNumberArg('--limit') ?? Number.POSITIVE_INFINITY
const delayMs = readNumberArg('--delay-ms') ?? 0
const retryCount = readNumberArg('--retry') ?? 0
const selectedIds = readListArg('--ids')
const stopOnRateLimit = !process.argv.includes('--continue-on-429')

const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
const csv = await fs.readFile(csvPath, 'utf8')
const parsed = parseCsv(csv.replace(/^\uFEFF/, ''))
const idIndex = parsed.headers.indexOf('id')
const imageUrlIndex = parsed.headers.indexOf('image_url')

if (idIndex < 0 || imageUrlIndex < 0) {
  throw new Error('content/cases.csv is missing id or image_url header')
}

const rowsById = new Map(parsed.rows.map(row => [row[idIndex], row]))
const results = []
let attempted = 0
let stoppedByRateLimit = false

for (const item of manifest) {
  if (selectedIds && !selectedIds.has(item.id)) continue
  if (attempted >= maxCount) break

  const row = rowsById.get(item.id)
  if (!row) {
    results.push({ id: item.id, status: 'missing-row' })
    continue
  }

  const localFilePath = path.join(root, 'public', item.localPath)
  const currentImageUrl = row[imageUrlIndex]
  const existing = await inspectExisting(localFilePath)

  if (existing.ok) {
    row[imageUrlIndex] = item.localPath
    results.push({ id: item.id, status: currentImageUrl === item.localPath ? 'already-local' : 'linked-existing', localPath: item.localPath, bytes: existing.bytes })
    continue
  }

  attempted += 1
  if (!downloadFiles) {
    results.push({ id: item.id, status: 'would-download', remoteUrl: item.remoteUrl, localPath: item.localPath })
    continue
  }

  if (!item.remoteUrl) {
    results.push({ id: item.id, status: 'missing-remote-url', localPath: item.localPath, sourceUrl: item.sourceUrl })
    continue
  }

  if (delayMs > 0 && attempted > 1) {
    await sleep(delayMs)
  }

  const downloaded = await downloadImageWithRetries(item.remoteUrl, localFilePath, retryCount, delayMs)
  if (downloaded.ok) {
    row[imageUrlIndex] = item.localPath
    results.push({ id: item.id, status: 'downloaded', localPath: item.localPath, bytes: downloaded.bytes, contentType: downloaded.contentType })
  } else {
    results.push({ id: item.id, status: 'skipped', reason: downloaded.reason, remoteUrl: item.remoteUrl })
    if (stopOnRateLimit && downloaded.reason === 'upstream-429') {
      stoppedByRateLimit = true
      break
    }
  }
}

if (applyChanges) {
  await fs.writeFile(csvPath, stringifyCsv(parsed.headers, parsed.rows))
}

console.log(JSON.stringify({
  mode: applyChanges ? 'apply' : 'dry-run',
  source: useRetryQueue ? 'retry-queue' : 'manifest',
  downloadsEnabled: downloadFiles,
  attempted,
  delayMs,
  retryCount,
  selectedIds: selectedIds ? Array.from(selectedIds) : null,
  stoppedByRateLimit,
  downloaded: results.filter(item => item.status === 'downloaded').length,
  linkedExisting: results.filter(item => item.status === 'linked-existing').length,
  skipped: results.filter(item => item.status === 'skipped').length,
  results,
}, null, 2))

function readNumberArg(name) {
  const raw = process.argv.find(arg => arg.startsWith(`${name}=`))
  if (!raw) return null
  const value = Number(raw.slice(name.length + 1))
  return Number.isFinite(value) && value > 0 ? value : null
}

function readListArg(name) {
  const raw = process.argv.find(arg => arg.startsWith(`${name}=`))
  if (!raw) return null
  const values = raw
    .slice(name.length + 1)
    .split(',')
    .map(value => value.trim())
    .filter(Boolean)
  return values.length > 0 ? new Set(values) : null
}

async function inspectExisting(filePath) {
  try {
    const buffer = await fs.readFile(filePath)
    return { ok: isImageBuffer(buffer), bytes: buffer.byteLength }
  } catch {
    return { ok: false, bytes: 0 }
  }
}

async function downloadImageWithRetries(remoteUrl, localFilePath, retries, waitMs) {
  let latest = await downloadImage(remoteUrl, localFilePath)
  for (let attempt = 0; !latest.ok && attempt < retries; attempt += 1) {
    if (latest.reason === 'upstream-429') {
      return latest
    }
    if (waitMs > 0) {
      await sleep(waitMs)
    }
    latest = await downloadImage(remoteUrl, localFilePath)
  }
  return latest
}

async function downloadImage(remoteUrl, localFilePath) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)

  try {
    const response = await fetch(remoteUrl, {
      headers: {
        'User-Agent': 'ArchistoryContentAudit/1.0 source-safe local image cache',
      },
      signal: controller.signal,
    })

    if (!response.ok) {
      return { ok: false, reason: `upstream-${response.status}` }
    }

    const contentType = response.headers.get('content-type') || ''
    if (!contentType.toLowerCase().startsWith('image/')) {
      return { ok: false, reason: `non-image-${contentType || 'unknown'}` }
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    if (!isImageBuffer(buffer)) {
      return { ok: false, reason: 'invalid-image-bytes' }
    }

    await fs.mkdir(path.dirname(localFilePath), { recursive: true })
    await fs.writeFile(localFilePath, buffer)
    return { ok: true, bytes: buffer.byteLength, contentType }
  } catch (error) {
    const message = error instanceof Error ? error.name || error.message : 'fetch-failed'
    return { ok: false, reason: message }
  } finally {
    clearTimeout(timeout)
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function isImageBuffer(buffer) {
  if (buffer.byteLength < 512) return false
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47
  const isGif = buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46
  const isWebp = buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP'
  return isJpeg || isPng || isGif || isWebp
}

function parseCsv(input) {
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index]
    const next = input[index + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') {
        cell += '"'
        index += 1
      } else if (char === '"') {
        inQuotes = false
      } else {
        cell += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      row.push(cell)
      cell = ''
    } else if (char === '\n') {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else if (char !== '\r') {
      cell += char
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell)
    rows.push(row)
  }

  const [headers, ...body] = rows.filter(candidate => candidate.some(value => value !== ''))
  return { headers, rows: body }
}

function stringifyCsv(headers, rows) {
  return `${[headers, ...rows].map(row => row.map(escapeCsvCell).join(',')).join('\n')}\n`
}

function escapeCsvCell(value) {
  const text = String(value ?? '')
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`
  }
  return text
}
