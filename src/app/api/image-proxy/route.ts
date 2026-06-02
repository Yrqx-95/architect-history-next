import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'
export const revalidate = 86400 // Cache for 1 day

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
  }

  // Validate URL - only allow whitelisted domains
  const parsed = new URL(url)
  const allowedHosts = [
    'images.unsplash.com',
    'upload.wikimedia.org',
    'commons.wikimedia.org',
    'plus.unsplash.com',
  ]
  if (!allowedHosts.some(h => parsed.hostname === h || parsed.hostname.endsWith('.' + h))) {
    return NextResponse.json({ error: 'Domain not allowed' }, { status: 403 })
  }

  // Width is part of the local proxy cache key only. Wikimedia file URLs are
  // direct binary resources; appending arbitrary query params can make some
  // upstream responses non-image and break Next's image optimizer.
  const proxyUrl = url

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000)

    const res = await fetch(proxyUrl, {
      headers: {
        'User-Agent': 'ArchitectHistoryNext/1.0 Image Proxy',
      },
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: 502 }
      )
    }

    const contentType = res.headers.get('content-type') || 'image/jpeg'
    const body = await res.arrayBuffer()
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
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 504 }
    )
  }
}
