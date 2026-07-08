/**
 * Architecture Knowledge OS — Relation Query Layer
 *
 * Builds knowledge graph connections between entities.
 * All queries are cached at request level via React cache().
 */

import type { ArchitectRelations, Building, BuildingRelations, EraRelations, StyleRelations } from '@/lib/types'
import { cache } from 'react'
import {
  getArchitects, getBuildings, getBuildingsWithCovers, getStyles, getEras, getBuildingImages, getArchitectBySlug, getBuildingBySlug, isDisplayableImageUrl, } from '@/lib/data'
import { dedupeBuildings, isMinimallyComplete } from '@/lib/quality'
import { createClient } from '@/lib/supabase'
import { listMatchesTaxonomy, matchesTaxonomy } from '@/lib/taxonomy'

async function getRelatedBuildingsForBuilding(building: Building, limit = 6): Promise<Building[]> {
  const supabase = createClient()
  const queries: PromiseLike<Building[]>[] = []

  if (building.architect_slug) {
    queries.push(
      supabase
        .from('buildings')
        .select('*')
        .eq('architect_slug', building.architect_slug)
        .neq('id', building.id)
        .limit(limit)
        .then(({ data }) => (data || []) as Building[]),
    )
  }

  if (building.type_slug) {
    queries.push(
      supabase
        .from('buildings')
        .select('*')
        .eq('type_slug', building.type_slug)
        .neq('id', building.id)
        .limit(limit)
        .then(({ data }) => (data || []) as Building[]),
    )
  }

  for (const styleSlug of (building.style_slugs || []).slice(0, 3)) {
    queries.push(
      supabase
        .from('buildings')
        .select('*')
        .contains('style_slugs', [styleSlug])
        .neq('id', building.id)
        .limit(limit)
        .then(({ data }) => (data || []) as Building[]),
    )
  }

  const seen = new Set<string>()
  const rows = (await Promise.all(queries)).flat()
  return rows.filter(candidate => {
    if (seen.has(candidate.id)) return false
    seen.add(candidate.id)
    return true
  }).slice(0, limit)
}

// ============================================================
// Architect Relations
// ============================================================

export const getArchitectRelations = cache(async (slug: string): Promise<ArchitectRelations | null> => {
  const [architect, allArchs, allBuildings, allStyles, allEras] = await Promise.all([
    getArchitectBySlug(slug),
    getArchitects(),
    getBuildings(),
    getStyles(),
    getEras(),
  ])

  if (!architect) return null

  const buildings = allBuildings.filter(b => b.architect_slug === slug)
  const styles = allStyles.filter(s => listMatchesTaxonomy(architect.style_slugs, s))
  const era = allEras.find(e => matchesTaxonomy(architect.era_slug, e)) || null

  const influenceIds = new Set(architect.influences || [])
  const influencedIds = new Set(architect.influenced || [])
  const influencesList = allArchs.filter(a => influenceIds.has(a.slug))
  const influencedList = allArchs.filter(a => influencedIds.has(a.slug))

  const relatedIds = new Set([...influenceIds, ...influencedIds])
  const relatedArchitects = allArchs.filter(a =>
    a.slug !== slug && (
      relatedIds.has(a.slug) ||
      (era && matchesTaxonomy(a.era_slug, era)) ||
      architect.style_slugs?.some(s => a.style_slugs?.includes(s))
    )
  ).slice(0, 8)

  const relatedBuildings = allBuildings.filter(b =>
    b.architect_slug !== slug &&
    (b.architect_slug === slug ||
     b.style_slugs?.some(s => architect.style_slugs?.includes(s)))
  ).slice(0, 6)

  return { architect, styles, era, buildings, influencesList, influencedList, relatedArchitects, relatedBuildings }
})

// ============================================================
// Building Relations
// ============================================================

export const getBuildingRelations = cache(async (slug: string): Promise<BuildingRelations | null> => {
  const [building, allArchs, allStyles, allEras] = await Promise.all([
    getBuildingBySlug(slug),
    getArchitects(),
    getStyles(),
    getEras(),
  ])

  if (!building) return null

  const architect = allArchs.find(a => a.slug === building.architect_slug) || null
  const styles = allStyles.filter(s => listMatchesTaxonomy(building.style_slugs, s))
  const era = allEras.find(e => matchesTaxonomy(building.era_slug, e)) || null
  const [images, relatedBuildings] = await Promise.all([
    getBuildingImages(building.id).then(items => items.filter(image => isDisplayableImageUrl(image.url_original))),
    getRelatedBuildingsForBuilding(building, 6),
  ])

  return { building, architect, styles, era, relatedBuildings, images }
})

// ============================================================
// Style Relations
// ============================================================

export const getStyleRelations = cache(async (slug: string): Promise<StyleRelations | null> => {
  const [allStyles, allArchs, allBuildings, allEras] = await Promise.all([
    getStyles(), getArchitects(), getBuildingsWithCovers(), getEras(),
  ])

  const style = allStyles.find(s => s.slug === slug)
  if (!style) return null

  const architects = allArchs.filter(a => listMatchesTaxonomy(a.style_slugs, style))
  const buildings = dedupeBuildings(allBuildings.filter(b => isMinimallyComplete(b) && listMatchesTaxonomy(b.style_slugs, style)))
    .sort((a, b) => (a.year_start || 9999) - (b.year_start || 9999))
  const parentStyle = style.parent_slug ? allStyles.find(s => s.slug === style.parent_slug) || null : null
  const childStyles = allStyles.filter(s => s.parent_slug === slug)
  const era = style.era_slug ? allEras.find(e => e.slug === style.era_slug) || null : null

  return { style, architects, buildings, parentStyle, childStyles, era }
})

// ============================================================
// Era Relations
// ============================================================

export const getEraRelations = cache(async (slug: string): Promise<EraRelations | null> => {
  const [allEras, allStyles, allArchs, allBuildings] = await Promise.all([
    getEras(), getStyles(), getArchitects(), getBuildings(),
  ])

  const era = allEras.find(e => e.slug === slug)
  if (!era) return null

  const styles = allStyles.filter(s => s.era_slug === slug)
  const architects = allArchs.filter(a => matchesTaxonomy(a.era_slug, era))
  const buildings = allBuildings.filter(b => {
    const a = allArchs.find(x => x.slug === b.architect_slug)
    return matchesTaxonomy(b.era_slug, era) || matchesTaxonomy(a?.era_slug, era)
  })

  return { era, styles, architects, buildings }
})
