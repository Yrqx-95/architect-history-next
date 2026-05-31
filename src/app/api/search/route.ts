import { NextRequest, NextResponse } from 'next/server'
import { getArchitects, getBuildingsWithCovers } from '@/lib/data'
import type { Architect, BuildingWithCover } from '@/lib/types'

const QUERY_CACHE_TTL = 60_000
const queryCache = new Map<string, { ts: number; data: SearchResponse }>()

type SearchResponse = {
  architects: ReturnType<typeof toArchitectResult>[]
  buildings: ReturnType<typeof toBuildingResult>[]
}

type WeightedField = {
  value: unknown
  weight: number
  exactWeight?: number
  startsWithWeight?: number
}

function normalize(value: unknown) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function queryTokens(query: string) {
  const normalized = normalize(query)
  if (!normalized) return []
  return normalized
    .split(/[\s,.;:/|]+/)
    .map(token => token.trim())
    .filter(Boolean)
}

function scoreText(value: unknown, query: string, weight: number, exactWeight = weight * 1.8, startsWithWeight = weight * 1.35) {
  const text = normalize(value)
  if (!text) return 0
  const q = normalize(query)
  const tokens = queryTokens(query)

  if (text === q) return exactWeight
  if (text.startsWith(q)) return startsWithWeight
  if (text.includes(q)) return weight

  if (tokens.length > 1 && tokens.every(token => text.includes(token))) return weight * 0.75
  if (tokens.length === 1 && text.includes(tokens[0])) return weight * 0.65
  return 0
}

function scoreFields(fields: WeightedField[], query: string) {
  return fields.reduce((score, field) => {
    const values = Array.isArray(field.value) ? field.value : [field.value]
    const best = Math.max(
      0,
      ...values.map(value => scoreText(value, query, field.weight, field.exactWeight, field.startsWithWeight))
    )
    return score + best
  }, 0)
}

function sortByScore<T>(items: { item: T; score: number; tieBreaker: string }[]) {
  return items
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score || a.tieBreaker.localeCompare(b.tieBreaker))
    .map(result => result.item)
}

function toArchitectResult({ slug, name_zh, name_en, name_ja, birth_year, death_year, era_slug }: Architect) {
  return {
    slug,
    name_zh,
    name_en,
    name_ja,
    birth_year,
    death_year,
    era_slug,
  }
}

function toBuildingResult({
  slug, name_zh, name_en, name_ja, year_start, city, country, country_code, type_slug,
  architect_slug, cover_url, cover_photographer, cover_license, cover_source_url,
}: BuildingWithCover) {
  return {
    slug,
    name_zh,
    name_en,
    name_ja,
    year_start,
    city,
    country,
    country_code,
    type_slug,
    architect_slug,
    cover_url,
    cover_photographer,
    cover_license,
    cover_source_url,
  }
}

function cachedResponse(data: SearchResponse) {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim()
  if (!q) {
    return NextResponse.json({ architects: [], buildings: [] })
  }

  const cacheKey = normalize(q)
  const cached = queryCache.get(cacheKey)
  if (cached && Date.now() - cached.ts < QUERY_CACHE_TTL) {
    return cachedResponse(cached.data)
  }

  const [architects, buildings] = await Promise.all([
    getArchitects(),
    getBuildingsWithCovers(),
  ])
  const architectNames = new Map(architects.map(architect => [
    architect.slug,
    [architect.name_en, architect.name_zh, architect.name_ja, architect.slug].filter(Boolean),
  ]))

  const architectResults = sortByScore(architects.map(architect => ({
    item: architect,
    tieBreaker: architect.name_en || architect.slug,
    score: scoreFields([
      { value: [architect.name_en, architect.name_zh, architect.name_ja], weight: 90, exactWeight: 160, startsWithWeight: 125 },
      { value: architect.slug, weight: 70, exactWeight: 150, startsWithWeight: 105 },
      { value: architect.era_slug, weight: 36, exactWeight: 80 },
      { value: architect.nationalities, weight: 30, exactWeight: 72 },
      { value: architect.style_slugs, weight: 28, exactWeight: 70 },
      { value: [architect.birth_year, architect.death_year], weight: 24, exactWeight: 60 },
      { value: architect.core_ideas, weight: 14 },
    ], q),
  })))
    .slice(0, 12)
    .map(toArchitectResult)

  const buildingResults = sortByScore(buildings.map(building => {
    const baseScore = scoreFields([
      { value: [building.name_en, building.name_zh, building.name_ja], weight: 92, exactWeight: 165, startsWithWeight: 128 },
      { value: building.slug, weight: 58, exactWeight: 120, startsWithWeight: 86 },
      { value: architectNames.get(building.architect_slug || ''), weight: 54, exactWeight: 105, startsWithWeight: 78 },
      { value: [building.city, building.country, building.country_code], weight: 44, exactWeight: 95, startsWithWeight: 66 },
      { value: [building.year_start, building.year_end], weight: 34, exactWeight: 82 },
      { value: [building.type_slug, building.era_slug, building.architect_slug], weight: 30, exactWeight: 76 },
      { value: building.style_slugs, weight: 28, exactWeight: 72 },
      { value: [building.description?.zh, building.description?.en, building.description?.ja], weight: 14 },
      { value: [building.significance?.zh, building.significance?.en, building.significance?.ja], weight: 12 },
    ], q)

    return {
      item: building,
      tieBreaker: building.name_en || building.slug,
      score: baseScore > 0 ? baseScore + (building.cover_url ? 3 : 0) : 0,
    }
  }))
    .slice(0, 18)
    .map(toBuildingResult)

  const data = {
    architects: architectResults,
    buildings: buildingResults,
  }
  queryCache.set(cacheKey, { ts: Date.now(), data })

  return cachedResponse(data)
}
