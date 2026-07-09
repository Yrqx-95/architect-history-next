#!/usr/bin/env node

import { execFile as execFileCallback } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'

const execFile = promisify(execFileCallback)
const root = process.cwd()
const manifestPath = path.join(root, 'content/graduation_image_manifest.json')
const retryQueuePath = path.join(root, 'content/graduation_image_retry_queue.json')
const casesPath = path.join(root, 'src/content/graduation/cases.json')
const applyChanges = process.argv.includes('--apply')
const useRetryQueue = process.argv.includes('--retry-queue')
const maxEdge = readNumberArg('--max-edge') ?? 2000
const quality = readNumberArg('--quality') ?? 82
const selectedIds = readListArg('--ids')

const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'))
const retryQueue = useRetryQueue ? JSON.parse(await fs.readFile(retryQueuePath, 'utf8')) : []
const cases = JSON.parse(await fs.readFile(casesPath, 'utf8'))
const imageItems = collectImageItems([...manifest, ...retryQueue], cases)
const results = []

for (const item of imageItems) {
  if (selectedIds && !selectedIds.has(item.id)) continue

  const filePath = path.join(root, 'public', item.localPath)
  const before = await inspectFile(filePath)

  if (!before.exists) {
    results.push({ id: item.id, status: 'missing-local-file', localPath: item.localPath, source: item.source })
    continue
  }

  if (!applyChanges) {
    results.push({ id: item.id, status: 'would-optimize', localPath: item.localPath, source: item.source, beforeBytes: before.bytes })
    continue
  }

  const optimized = await optimizeJpeg(filePath, maxEdge, quality)
  const after = await inspectFile(filePath)
  results.push({
    id: item.id,
    status: optimized ? 'optimized' : 'already-optimized',
    localPath: item.localPath,
    source: item.source,
    beforeBytes: before.bytes,
    afterBytes: after.bytes,
  })
}

console.log(JSON.stringify({
  mode: applyChanges ? 'apply' : 'dry-run',
  maxEdge,
  quality,
  source: useRetryQueue ? 'manifest+retry-queue' : 'manifest',
  selectedIds: selectedIds ? Array.from(selectedIds) : null,
  checked: results.length,
  optimized: results.filter(item => item.status === 'optimized').length,
  missing: results.filter(item => item.status === 'missing-local-file').length,
  contentOnly: imageItems.filter(item => item.source === 'content').length,
  results,
}, null, 2))

function collectImageItems(manifestItems, caseItems) {
  const items = []
  const seen = new Set()

  for (const item of manifestItems) {
    addItem({
      id: item.id,
      localPath: item.localPath,
      source: 'manifest',
    })
  }

  for (const item of caseItems) {
    if (!item.image_url?.startsWith('/images/graduation/cases/')) continue
    addItem({
      id: item.id,
      localPath: item.image_url,
      source: 'content',
    })
  }

  return items

  function addItem(item) {
    if (!item.localPath || seen.has(item.localPath)) return
    seen.add(item.localPath)
    items.push(item)
  }
}

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

async function inspectFile(filePath) {
  try {
    const stat = await fs.stat(filePath)
    return { exists: true, bytes: stat.size }
  } catch {
    return { exists: false, bytes: 0 }
  }
}

async function optimizeJpeg(filePath, edge, jpegQuality) {
  const source = await fs.readFile(filePath)
  if (!isJpeg(source)) return false
  const current = inspectJpeg(source)
  if (current && current.maxEdge <= edge && !current.hasMetadata) return false

  const tmpPath = path.join(os.tmpdir(), `archistory-graduation-${Date.now()}-${path.basename(filePath)}`)
  await execFile('sips', [
    '-Z',
    String(edge),
    '-s',
    'format',
    'jpeg',
    '-s',
    'formatOptions',
    String(jpegQuality),
    filePath,
    '--out',
    tmpPath,
  ])

  const resized = await fs.readFile(tmpPath)
  const stripped = stripJpegMetadata(resized)
  if (stripped.byteLength >= source.byteLength) {
    await fs.rm(tmpPath, { force: true })
    return false
  }

  await fs.writeFile(filePath, stripped)
  await fs.rm(tmpPath, { force: true })
  return true
}

function isJpeg(buffer) {
  return buffer.byteLength > 4 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
}

function inspectJpeg(buffer) {
  if (!isJpeg(buffer)) return null

  let offset = 2
  let width = 0
  let height = 0
  let hasMetadata = false

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break

    let markerOffset = offset
    while (buffer[markerOffset] === 0xff) markerOffset += 1
    const marker = buffer[markerOffset]
    offset = markerOffset + 1

    if (marker === 0xda) break
    if (marker >= 0xd0 && marker <= 0xd9) continue

    const length = buffer.readUInt16BE(offset)
    const segmentStart = markerOffset - 1
    const segmentEnd = offset + length
    if (marker === 0xe1 || marker === 0xed || marker === 0xfe) {
      hasMetadata = true
    }

    if (marker >= 0xc0 && marker <= 0xc3) {
      height = buffer.readUInt16BE(offset + 3)
      width = buffer.readUInt16BE(offset + 5)
    }

    offset = Math.max(segmentEnd, segmentStart + 2)
  }

  return { width, height, maxEdge: Math.max(width, height), hasMetadata }
}

function stripJpegMetadata(buffer) {
  if (!isJpeg(buffer)) return buffer

  const chunks = [buffer.subarray(0, 2)]
  let offset = 2

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      chunks.push(buffer.subarray(offset))
      break
    }

    let markerOffset = offset
    while (buffer[markerOffset] === 0xff) markerOffset += 1
    const marker = buffer[markerOffset]
    offset = markerOffset + 1

    if (marker === 0xda) {
      chunks.push(Buffer.from([0xff, marker]))
      chunks.push(buffer.subarray(offset))
      break
    }

    if (marker >= 0xd0 && marker <= 0xd9) {
      chunks.push(Buffer.from([0xff, marker]))
      continue
    }

    const length = buffer.readUInt16BE(offset)
    const segmentStart = markerOffset - 1
    const segmentEnd = offset + length
    const shouldStrip = marker === 0xe1 || marker === 0xed || marker === 0xfe
    if (!shouldStrip) {
      chunks.push(buffer.subarray(segmentStart, segmentEnd))
    }
    offset = segmentEnd
  }

  return Buffer.concat(chunks)
}
