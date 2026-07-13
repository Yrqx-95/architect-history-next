import { NextRequest, NextResponse } from 'next/server'
import { getSearchIndex } from '@/lib/data'
import type { SearchArchitect, SearchBuilding } from '@/lib/data'

const QUERY_CACHE_TTL = 60_000
const MAX_QUERY_LENGTH = 120
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

function toArchitectResult({ slug, name_zh, name_en, name_ja, birth_year, death_year, era_slug }: SearchArchitect) {
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
  function_slugs, graduation_case_ids, graduation_issue_ids,
}: SearchBuilding) {
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
    function_slugs,
    graduation_case_ids,
    graduation_issue_ids,
    perspectives: graduation_case_ids.length ? ['building', 'graduation-reference'] : ['building'],
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
  const q = request.nextUrl.searchParams.get('q')?.trim() || ''
  const functionFilter = request.nextUrl.searchParams.get('function')?.trim() || ''
  const periodFilter = request.nextUrl.searchParams.get('period')?.trim() || ''
  const countryFilter = request.nextUrl.searchParams.get('country')?.trim() || ''
  const architectFilter = request.nextUrl.searchParams.get('architect')?.trim() || ''
  const issueFilter = request.nextUrl.searchParams.get('issue')?.trim() || ''
  if (!q && !functionFilter && !periodFilter && !countryFilter && !architectFilter && !issueFilter) {
    return NextResponse.json({ architects: [], buildings: [] })
  }
  if (q.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ error: 'Query is too long' }, { status: 400 })
  }

  const cacheKey = [q, functionFilter, periodFilter, countryFilter, architectFilter, issueFilter].map(normalize).join('|')
  const cached = queryCache.get(cacheKey)
  if (cached && Date.now() - cached.ts < QUERY_CACHE_TTL) {
    return cachedResponse(cached.data)
  }

  const { architects, buildings } = await getSearchIndex()
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

  const periodMatch = (year: number | null | undefined) => {
    if (!periodFilter) return true
    const decade = periodFilter.match(/^(\d{4})s$/)?.[1]
    if (decade) return Boolean(year && year >= Number(decade) && year < Number(decade) + 10)
    return String(year || '') === periodFilter
  }
  const isExactFunctionQuery = Boolean(q) && buildings.some(building =>
    building.function_slugs.some(slug => normalize(slug) === normalize(q))
    || building.function_aliases.some(alias => normalize(alias) === normalize(q)))
  const buildingResults = sortByScore(buildings.filter(building => {
    const normalizedFunction = normalize(functionFilter)
    const functionMatch = !normalizedFunction || building.function_slugs.some(slug => normalize(slug) === normalizedFunction)
      || building.function_aliases.some(alias => normalize(alias) === normalizedFunction)
    const countryMatch = !countryFilter || [building.country, building.country_code].some(value => normalize(value) === normalize(countryFilter))
    const architectMatch = !architectFilter || normalize(building.architect_slug) === normalize(architectFilter)
      || (architectNames.get(building.architect_slug || '') || []).some(value => normalize(value) === normalize(architectFilter))
    const issueMatch = !issueFilter || building.graduation_issue_ids.includes(issueFilter)
    const functionQueryMatch = !isExactFunctionQuery
      || building.function_slugs.some(slug => normalize(slug) === normalize(q))
      || building.function_aliases.some(alias => normalize(alias) === normalize(q))
    return functionMatch && functionQueryMatch && periodMatch(building.year_start) && countryMatch && architectMatch && issueMatch
  }).map(building => {
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
      { value: building.function_aliases, weight: 72, exactWeight: 140, startsWithWeight: 105 },
      { value: building.function_slugs, weight: 68, exactWeight: 136, startsWithWeight: 100 },
      { value: building.graduation_keywords, weight: 38, exactWeight: 86, startsWithWeight: 62 },
      { value: building.graduation_issue_ids, weight: 32, exactWeight: 76 },
    ], q)

    return {
      item: building,
      tieBreaker: building.name_en || building.slug,
      score: q ? (baseScore > 0 ? baseScore + (building.cover_url ? 3 : 0) : 0) : 1,
    }
  }))
    .slice(0, functionFilter || isExactFunctionQuery ? 100 : 18)
    .map(toBuildingResult)

  const data = {
    architects: architectResults,
    buildings: buildingResults,
  }
  queryCache.set(cacheKey, { ts: Date.now(), data })

  return cachedResponse(data)
}
