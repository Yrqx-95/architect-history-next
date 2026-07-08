import { NextRequest, NextResponse } from 'next/server'
import { findDerivedSourceById } from '@/lib/knowledge-os'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const lang = request.nextUrl.searchParams.get('lang') || 'zh'
  const source = await findDerivedSourceById({
    sourceId: id,
    lang,
    baseUrl: request.nextUrl.origin,
  })

  if (!source) {
    return NextResponse.json(
      { error: { code: 'source_not_found', message: 'Source not found.' } },
      { status: 404 }
    )
  }

  return NextResponse.json(source, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=1800',
    },
  })
}
