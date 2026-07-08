import { NextRequest, NextResponse } from 'next/server'
import { resolveGroundingQuery } from '@/lib/knowledge-os'

export async function POST(request: NextRequest) {
  let payload: { query?: unknown; lang?: unknown }

  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { error: { code: 'invalid_json', message: 'Request body must be valid JSON.' } },
      { status: 400 }
    )
  }

  const query = typeof payload.query === 'string' ? payload.query.trim() : ''
  if (!query) {
    return NextResponse.json(
      { error: { code: 'missing_query', message: '`query` is required.' } },
      { status: 400 }
    )
  }

  const lang = typeof payload.lang === 'string' ? payload.lang : 'zh'
  const result = await resolveGroundingQuery({
    query,
    lang,
    baseUrl: request.nextUrl.origin,
  })

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'private, max-age=0, no-store',
    },
  })
}
