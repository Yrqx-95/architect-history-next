import { NextRequest, NextResponse } from 'next/server'
import { getArchitects, getBuildingsWithCovers } from '@/lib/data'

function normalize(value: unknown) {
  return String(value || '').toLowerCase()
}

function includesQuery(values: unknown[], query: string) {
  const q = normalize(query)
  return values.some(value => normalize(value).includes(q))
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim()
  if (!q) {
    return NextResponse.json({ architects: [], buildings: [] })
  }

  const [architects, buildings] = await Promise.all([
    getArchitects(),
    getBuildingsWithCovers(),
  ])

  const architectResults = architects
    .filter(architect => includesQuery([
      architect.name_zh,
      architect.name_en,
      architect.name_ja,
      architect.era_slug,
      ...(architect.nationalities || []),
      ...(architect.style_slugs || []),
    ], q))
    .slice(0, 12)
    .map(({ slug, name_zh, name_en, name_ja, birth_year, death_year, era_slug }) => ({
      slug,
      name_zh,
      name_en,
      name_ja,
      birth_year,
      death_year,
      era_slug,
    }))

  const buildingResults = buildings
    .filter(building => includesQuery([
      building.name_zh,
      building.name_en,
      building.name_ja,
      building.city,
      building.country,
      building.country_code,
      building.type_slug,
      building.era_slug,
      building.architect_slug,
      building.year_start,
      ...(building.style_slugs || []),
    ], q))
    .slice(0, 18)
    .map(({
      slug, name_zh, name_en, name_ja, year_start, city, country, type_slug,
      architect_slug, cover_url, cover_photographer, cover_license, cover_source_url,
    }) => ({
      slug,
      name_zh,
      name_en,
      name_ja,
      year_start,
      city,
      country,
      type_slug,
      architect_slug,
      cover_url,
      cover_photographer,
      cover_license,
      cover_source_url,
    }))

  return NextResponse.json({
    architects: architectResults,
    buildings: buildingResults,
  })
}
