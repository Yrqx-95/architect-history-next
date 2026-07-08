import { NextRequest, NextResponse } from 'next/server'
import { getBuildingEvidenceBundle } from '@/lib/knowledge-os'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const lang = request.nextUrl.searchParams.get('lang') || 'zh'
  const bundle = await getBuildingEvidenceBundle({
    slug,
    lang,
    baseUrl: request.nextUrl.origin,
  })

  if (!bundle) {
    return NextResponse.json(
      { error: { code: 'building_not_found', message: 'Building not found.' } },
      { status: 404 }
    )
  }

  return NextResponse.json(bundle, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=1800',
    },
  })
}
