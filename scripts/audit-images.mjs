#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Run with: node --env-file=.env.local scripts/audit-images.mjs')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const trustedSources = new Set(['Wikimedia Commons', 'Museum Open Access', 'IIIF', 'Local Curated'])
const acceptedLicenses = ['CC0', 'Public domain', 'CC BY', 'CC BY-SA']
const lowConfidenceSources = new Set(['Unsplash', 'Pexels'])

function acceptedLicense(license) {
  return Boolean(license && acceptedLicenses.some(prefix => license.startsWith(prefix)))
}

function domainOf(url) {
  try {
    return new URL(url).hostname
  } catch {
    return '(invalid-url)'
  }
}

async function fetchAllImages() {
  const rows = []
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from('images')
      .select('id,building_id,url_original,url_thumb_400,photographer,source,license,source_url,img_type,is_primary')
      .range(from, from + 999)

    if (error) throw new Error(error.message)
    if (!data?.length) break
    rows.push(...data)
    if (data.length < 1000) break
  }
  return rows
}

const images = await fetchAllImages()
const summary = {
  total: images.length,
  domains: {},
  sources: {},
  licenses: {},
  missingLicense: 0,
  missingSourceUrl: 0,
  trustedOpen: 0,
  lowConfidence: 0,
  invalidUrl: 0,
}

const flags = []

for (const image of images) {
  const domain = domainOf(image.url_original)
  summary.domains[domain] = (summary.domains[domain] || 0) + 1
  summary.sources[image.source || '(missing)'] = (summary.sources[image.source || '(missing)'] || 0) + 1
  summary.licenses[image.license || '(missing)'] = (summary.licenses[image.license || '(missing)'] || 0) + 1

  if (domain === '(invalid-url)') summary.invalidUrl += 1
  if (!image.license) summary.missingLicense += 1
  if (!image.source_url) summary.missingSourceUrl += 1
  if (trustedSources.has(image.source) && acceptedLicense(image.license) && image.source_url) summary.trustedOpen += 1
  if (lowConfidenceSources.has(image.source)) summary.lowConfidence += 1

  if (!trustedSources.has(image.source)) {
    flags.push({ id: image.id, reason: 'low-confidence-source', source: image.source, license: image.license, url: image.url_original })
  } else if (!acceptedLicense(image.license)) {
    flags.push({ id: image.id, reason: 'unsupported-license', source: image.source, license: image.license, url: image.url_original })
  } else if (!image.source_url) {
    flags.push({ id: image.id, reason: 'missing-source-url', source: image.source, license: image.license, url: image.url_original })
  }
}

console.log(JSON.stringify({
  summary,
  firstFlags: flags.slice(0, 50),
  recommendations: [
    'Use trustedOpen images for building-specific hero/card/detail use.',
    'Demote Unsplash/Pexels to atmospheric editorial fragments only.',
    'Cache accepted images into project-owned storage before relying on them in production.',
    'Keep source_url, photographer, and license visible or recoverable for attribution.',
  ],
}, null, 2))
