import { NextRequest, NextResponse } from 'next/server'
import { isExternalImageHost } from '@/lib/image-domains'

// Keep the default Node.js runtime. OpenNext Cloudflare runs route handlers in
// its Node runtime; opting this route into Next's Edge runtime makes the
// generated Worker fail before GET executes.
export const revalidate = 86400 // Cache for 1 day

const FALLBACK_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAHgAAABICAIAAACyfKYoAAABKUlEQVR42u3cOwrCQBRGYSOuzGxAwcYNWLoYSzdgI+gGdAtiI7ZWugMLGwshjUZNJoHM8J0yDwiHO/+dy0Cy6+XUQ/v0KSCaaBBNNNEgmmgQTTTRIJpoEE000SA6HQYd/KbJbF7jrfVyQXRldttNpefz0Vh0gGiiiUZazbBgtduX3ZrmQxUNomOMjnqTRVyDRlcyuupkEd2gITqIRozbu5A9XCMtpKl2Mki7jgJbSIPtRHREGB3vU9xr4ZddJ9oIbtehoqPg4/ooVsb3uypadIBoojXDgHE5pJ8ks+NW0USLjnj5HkStxpSKFh1Eg+jukv3zB5rGz4TS4+cpl4oWHUSD6A5Phrf7g4VwfmrMDucjTaKDaBBNNNEgmmgQTTTRIJpoEE000WibJ3OoOkRatK+jAAAAAElFTkSuQmCC'
const MAX_IMAGE_BYTES = 12 * 1024 * 1024

async function readImageBody(response: Response) {
  const declaredSize = Number(response.headers.get('content-length') || 0)
  if (declaredSize > MAX_IMAGE_BYTES || !response.body) return null

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      total += value.byteLength
      if (total > MAX_IMAGE_BYTES) {
        await reader.cancel()
        return null
      }
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }

  const image = new Uint8Array(total)
  let offset = 0
  for (const chunk of chunks) {
    image.set(chunk, offset)
    offset += chunk.byteLength
  }
  return image
}

function fallbackImageResponse(reason: string) {
  const bytes = Uint8Array.from(atob(FALLBACK_PNG_BASE64), char => char.charCodeAt(0))

  return new NextResponse(bytes, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'Vercel-CDN-Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'X-Archistory-Image-Fallback': reason,
    },
  })
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
  }

  // Validate URL - only allow whitelisted domains
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return NextResponse.json({ error: 'Invalid url parameter' }, { status: 400 })
  }

  if (!isExternalImageHost(parsed.hostname)) {
    return NextResponse.json({ error: 'Domain not allowed' }, { status: 403 })
  }

  // Width is part of the local proxy cache key only. Wikimedia file URLs are
  // direct binary resources; appending arbitrary query params can make some
  // upstream responses non-image and break Next's image optimizer.
  const proxyUrl = url

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    let res: Response
    try {
      res = await fetch(proxyUrl, {
        headers: {
          'User-Agent': 'ArchitectHistoryNext/1.0 Image Proxy',
        },
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!res.ok) {
      return fallbackImageResponse(`upstream-${res.status}`)
    }

    const contentType = res.headers.get('content-type') || ''
    if (!contentType.toLowerCase().startsWith('image/')) {
      return fallbackImageResponse('non-image-response')
    }

    const body = await readImageBody(res)
    if (!body) {
      return fallbackImageResponse('image-too-large-or-empty')
    }
    const cacheControl = res.headers.get('cache-control') || 'public, max-age=86400, immutable'

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': cacheControl,
        'CDN-Cache-Control': 'public, max-age=86400, immutable',
        'Vercel-CDN-Cache-Control': 'public, max-age=86400, immutable',
      },
    })
  } catch {
    return fallbackImageResponse('fetch-failed')
  }
}
