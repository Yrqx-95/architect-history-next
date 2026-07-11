import { NextResponse } from 'next/server'

import { getUnifiedPublicGraduationCases } from '@/lib/graduation-unified'

export async function GET() {
  const result = await getUnifiedPublicGraduationCases()
  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
    },
  })
}
