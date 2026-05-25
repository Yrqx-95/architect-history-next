export interface SearchArchitect {
  slug: string
  name_zh: string | null
  name_en: string
  name_ja: string | null
  birth_year: number | null
  death_year: number | null
  era_slug: string | null
}

export interface SearchBuilding {
  slug: string
  name_zh: string | null
  name_en: string
  name_ja: string | null
  year_start: number | null
  city: string | null
  country: string | null
  type_slug: string | null
  architect_slug: string | null
  cover_url: string | null
  cover_photographer: string | null
  cover_license: string | null
  cover_source_url: string | null
}

export interface SearchData {
  architects: SearchArchitect[]
  buildings: SearchBuilding[]
}

export type SearchName = {
  name_zh?: string | null
  name_en?: string
  name_ja?: string | null
}
