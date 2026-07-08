import { NextRequest, NextResponse } from 'next/server'
import { findDerivedClaimById } from '@/lib/knowledge-os'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const lang = request.nextUrl.searchParams.get('lang') || 'zh'
  const claim = await findDerivedClaimById({
    claimId: id,
    lang,
    baseUrl: request.nextUrl.origin,
  })

  if (!claim) {
    return NextResponse.json(
      { error: { code: 'claim_not_found', message: 'Claim not found.' } },
      { status: 404 }
    )
  }

  return NextResponse.json(claim, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=1800',
    },
  })
}
